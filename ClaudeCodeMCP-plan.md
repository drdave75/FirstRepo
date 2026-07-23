# ClaudeCodeMCP — Implementation Plan

Minimal MCP server (~150 lines) that lets an orchestrator AI drive Claude Code
sessions as a tool: `run_claude_sync`, `run_claude_async`, `resume_claude`.

---

## 0. Gotchas / spec corrections (read first)

1. **No `--cwd` flag exists.** Working directory is controlled by the spawning
   process's cwd, not an argv flag. Fix: pass `cwd: workdir` in the `spawn()`
   options object.
2. **`--allowedTools` / `--disallowedTools` take multiple separate argv tokens.**
   Push `'--allowedTools', 'Bash(git log *)', 'Read'` as separate array
   elements — do NOT join them with commas.
3. **Space before `*` matters.** `Bash(git diff *)` is valid; `Bash(git diff*)`
   is not the same pattern.
4. **Permission prompts block headless runs.** Always pass
   `--permission-mode acceptEdits` alongside allow/deny lists so nothing hangs
   waiting for a TTY prompt.
5. **`session_id` is only known after a run completes.** Generate your own
   tracking id (`crypto.randomUUID()`) at spawn time as the Map key and log
   filename. Store Claude's real `session_id` once the JSON result is parsed.
   `resume_claude` resumes using Claude's session_id, not the tracking id.
6. **`--resume` is compatible with `-p` + `--output-format json`** — no special
   handling needed.
7. **Auth:** inherit `process.env` into `spawn()` — don't reconstruct a minimal
   env or you'll drop `ANTHROPIC_API_KEY`.
8. **Recursion risk:** spawned `claude` processes auto-discover MCP config /
   CLAUDE.md / hooks. Cap concurrent sessions and consider `--bare` on child
   spawns to skip auto-discovery.
9. **Large prompts:** argv has OS-level length limits. For very large prompts,
   write to child stdin rather than passing positionally.
10. **`--model` accepts short aliases** (`sonnet`, `opus`) directly.
11. **Exit code 143 = SIGTERM** (external kill). Treat separately from generic
    errors. This server never sends SIGTERM itself (sync timeout leaves the
    process running).

---

## 1. Package setup

- `package.json`:
  - `"type": "module"`
  - `"dependencies": { "@modelcontextprotocol/sdk": "^<latest>" }` — single dep
  - `"bin"` entry for direct launch via MCP config
  - `"engines": { "node": ">=18" }` (uses `crypto.randomUUID()`)
- **Avoid `zod`.** Use the low-level `Server` class with plain JSON Schema
  `inputSchema` objects, not `McpServer.tool()` which requires zod. Keeps
  dependencies at exactly one.

## 2. Server skeleton

```js
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
```

- `new Server({ name: 'claude-code-mcp', version: '0.1.0' }, { capabilities: { tools: {} } })`
- One `ListToolsRequestSchema` handler returning three tool definitions
- One `CallToolRequestSchema` handler switch-dispatching on `request.params.name`,
  wrapped in try/catch to return `{ isError: true, content: [...] }` on error
- `await server.connect(new StdioServerTransport())` at the bottom

## 3. Constants

```js
const MODE_MAP = {
  full:        { allow: [], deny: [] },
  'read-only': { allow: ['Read', 'Grep', 'Glob', 'WebFetch', 'WebSearch'],
                 deny: ['Edit', 'Write', 'Bash', 'NotebookEdit'] },
  'edit-only': { allow: ['Read', 'Edit', 'Write', 'Grep', 'Glob'],
                 deny: ['Bash'] },
  'git-only':  { allow: ['Read', 'Grep', 'Glob', 'Bash(git *)'],
                 deny: ['Bash'] },
  test:        { allow: ['Read', 'Grep', 'Glob', 'Edit',
                          'Bash(npm test *)', 'Bash(npm run test *)', 'Bash(pytest *)'],
                 deny: ['Bash'] },
  build:       { allow: ['Read', 'Grep', 'Glob',
                          'Bash(npm run build *)', 'Bash(make *)'],
                 deny: ['Bash'] },
  implement:   { allow: ['Read', 'Edit', 'Write', 'Grep', 'Glob',
                          'Bash(git *)', 'Bash(npm *)'],
                 deny: ['Bash'] },
  research:    { allow: ['Read', 'Grep', 'Glob', 'WebFetch', 'WebSearch'],
                 deny: ['Edit', 'Write', 'Bash', 'NotebookEdit'] },
};

const MODEL_MAP = { fast: 'sonnet', thorough: 'opus' };

const ALWAYS_DENY = ['Bash(rm -rf *)', 'Bash(sudo *)'];
```

**Highest-risk assumption:** `deny: ['Bash']` broad-denies while `allow`
carves out subpatterns (e.g. `Bash(git *)`). Validate CLI's allow/deny
precedence in smoke tests before wiring all modes — if disallowedTools
wins outright, the deny list for scoped modes must be only `ALWAYS_DENY`.

## 4. `buildClaudeArgs(options)`

```js
function buildClaudeArgs({ mode, model, prompt, maxTurns, resumeSessionId }) {
  const modeConf = MODE_MAP[mode];
  if (!modeConf) throw new Error(`Unknown mode: ${mode}`);

  const args = ['-p', '--output-format', 'json', '--permission-mode', 'acceptEdits'];

  if (resumeSessionId) args.push('--resume', resumeSessionId);

  if (modeConf.allow.length) args.push('--allowedTools', ...modeConf.allow);
  args.push('--disallowedTools', ...modeConf.deny, ...ALWAYS_DENY);

  if (maxTurns) args.push('--max-turns', String(maxTurns));
  if (model) args.push('--model', MODEL_MAP[model] ?? model);

  args.push(prompt); // positional last; cwd via spawn() options not argv

  return args;
}
```

## 5. `spawnClaude(args, cwd)`

```js
function spawnClaude(args, cwd) {
  return spawn('claude', args, {
    cwd,
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}
```

Returns raw `ChildProcess`. No JSON parsing here — keeps it a pure spawn
helper. Callers attach `data` listeners and a `close` listener.

## 6. Session tracking

```js
const sessions = new Map(); // trackingId -> record
```

Record shape:
```js
{
  pid, status,          // 'running' | 'completed' | 'failed'
  start_time,
  log_file,             // null for sync
  mode, model,          // stored for resume inheritance
  claude_session_id,    // null until JSON result parsed
  exit_code, result,
}
```

Tracking id (`crypto.randomUUID()`) generated before spawn — used as Map
key and async log filename stem. Claude's `session_id` stored after
completion. `resume_claude` looks up the record and uses `claude_session_id`
for `--resume`.

No automatic garbage collection — document as known limitation.

## 7. Tool handler: `run_claude_sync`

Input: `{ prompt, mode, model?, max_turns?, cwd?, timeout_seconds? }`

1. Validate mode
2. Generate tracking id, build args, spawn
3. Accumulate stdout/stderr buffers
4. Race `close` event vs `setTimeout(timeout_seconds * 1000)`:
   - **Process finishes first:** parse JSON, mark completed, return result
   - **Timeout fires first:** do NOT kill — return `{ status: 'running', session_id: trackingId }`,
     keep `close` listener attached so record still finalizes
5. Non-zero exit with no parseable JSON → mark failed, surface stderr

## 8. Tool handler: `run_claude_async`

Input: `{ prompt, mode, model?, max_turns?, cwd? }`

1. Validate mode, generate tracking id
2. Ensure `~/.claude/mcp-sessions/` exists (`fs.mkdir(..., { recursive: true })`)
3. Open write stream to `~/.claude/mcp-sessions/<trackingId>.log`
4. Pipe child stdout/stderr into log file
5. Attach `close` listener to finalize session record
6. Return immediately: `{ session_id: trackingId, log_file, pid, status: 'running' }`
7. Do NOT `child.unref()` — server needs to stay alive to finalize the record

## 9. Tool handler: `resume_claude`

Input: `{ session_id, prompt, mode?, model?, max_turns?, timeout_seconds? }`

1. Look up `session_id` in Map; error if missing or `claude_session_id` is null
2. Inherit `mode`/`model` from original record if not overridden
3. Build args with `resumeSessionId: record.claude_session_id`
4. Same sync-style timeout race as `run_claude_sync`
5. Update same Map record in place (continuation, not new entry)

## 10. Error handling

Single try/catch at the `CallToolRequestSchema` dispatch level. Three classes:

- **Validation errors** — fail fast before spawning
- **Spawn errors** — catch child `error` event (bad spawn may never fire `close`)
- **Non-zero exit / unparseable JSON** — include raw stderr + exit code

## 11. Smoke tests

1. `run_claude_sync`, mode `read-only`, prompt that tries an Edit → confirm
   blocked without hanging (validates gotcha #4 + allow/deny precedence)
2. `run_claude_sync` with short `timeout_seconds` on slow task → confirm
   `{status:'running'}` returns and record finalizes later
3. `run_claude_async` → confirm log file appears and is parseable
4. `resume_claude` after completed sync run → confirm context carries through
5. `Bash(rm -rf *)` and `Bash(sudo *)` blocked under `mode: 'full'`

## 12. File layout

Single file (`src/index.js`). Constants, `buildClaudeArgs`, `spawnClaude`,
three handlers, and `Server` wiring all fit in ~150 lines. Do not split.
