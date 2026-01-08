---
name: skill-manager
description: Meta-skill for managing skill lifecycle in self-aware repository. Handles skill creation, updates, deprecation, and conflict detection. Self-modifying with safeguards.
type: meta
last_verified: 2025-01-04
verified_against: current
owner: repository-owner
confidence: high
---

# Skill Manager

Manages skill lifecycle. Self-modifying with safeguards.

**📖 Full Reference**: For complex decisions, consult [SKILL-FULL.md](./SKILL-FULL.md)

## Create New Skill

**Decision rule**: Create if ANY apply:
- **Prevented measurable harm**: Bug, rollback, production incident, or compliance issue
- **3+ occurrences of confusion**: Same question/mistake repeated
- **High-cost operation**: Task is expensive/risky and standardization reduces risk

**Additional considerations**:
- **Operational skill**: Does this help anyone (technical or not) execute a workflow correctly?
- **Technical/Domain skill**: Does this capture architectural principle or design pattern that technical users reference repeatedly?

Both types are valuable. Operational skills emerge first (lower barrier, immediate value). Technical skills emerge later (require architectural maturity, repeated patterns).

**Kill rule**: If skill hasn't prevented harm OR resolved repeated confusion, deprecate it. Skills must earn their existence.

**Checklist**:
- [ ] Confirm pattern meets criteria above
- [ ] Draft skill content (see Structure below)
- [ ] Propose: "Pattern: [X]. Create skill: [name]? Value: [Y]"
- [ ] Wait for approval
- [ ] Create in `.claude/skills/[skill-name]/SKILL.md`
- [ ] Use kebab-case naming

**Don't create for**: One-off requests, already in CLAUDE.md, unique situations

## Update Existing Skill

**When**: Pattern refines, efficiency improves, errors need fixing, context can compress

**Checklist**:
- [ ] Read current skill file
- [ ] Identify what needs updating and why
- [ ] Preserve: core intent, critical constraints, key patterns
- [ ] Remove: redundant examples, outdated context
- [ ] Propose: "Update [skill] because [reason]. Changes: [summary]. Proceed?"
- [ ] Wait for approval
- [ ] Add to evolution history: `- [Date]: [change]`

**CRITICAL - AI Auto-Update Rules**:
- ❌ **NEVER auto-update skills without human approval**
- Skills encode institutional truth - auto-modification creates drift
- Always propose changes, show diff, wait for explicit approval
- This applies even to obvious improvements or corrections
- Exception: Metadata updates (last_verified, confidence) can be flagged but require approval

**Why**: Confidently outdated instructions are worse than no instructions. Trust collapses if skills drift from reality.

**Self-modification safeguard**:
- When updating THIS skill (skill-manager), require explicit reasoning for changes
- Confirm user understands implications of meta-skill modification
- Never remove authority hierarchy, staleness rules, or kill criteria
- Higher approval bar than other skills - this is infrastructure

## Deprecate Skill

**When**: Superseded, unused, obsolete, merged

**Checklist**:
- [ ] Propose: "Deprecate [skill] because [reason]?"
- [ ] Wait for approval
- [ ] Move to `.claude/deprecated/` (don't delete)
- [ ] Add header: `# [Name] - DEPRECATED | Date | Reason | Replacement`

## Skill Structure Template

### For Draft Skills:

```markdown
---
name: skill-name
description: One-line description of when to use this skill
type: operational|technical|foundation|meta
confidence: draft
proposed_by: name
proposed_date: YYYY-MM-DD
review_after: YYYY-MM-DD (suggested 1-3 months out)
---

> ⚠️ **DRAFT SKILL** - Created YYYY-MM-DD by [name]
> Not yet validated through usage. Treat as hypothesis, not truth.
> Feedback welcome. Will be reviewed for ratification after [timeframe].

# Skill Name

## Overview
Brief explanation of what this skill does

## Model Notes
**Known risks**:
- [List AI failure modes specific to this skill]
- [e.g., "Overgeneralizing to other similar files"]
- [e.g., "Missing secondary update locations"]

**Required behavior**:
- [Critical safeguards AI must follow]
- [e.g., "Complete entire checklist before any edit"]
- [e.g., "Verify all N locations updated, not just one"]

## When to Use
Bullet list of triggers

## Process/Checklist
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Common Pitfalls
❌ Don't: [anti-pattern]
✅ Do: [correct pattern]

## Related Files
- file1.ext - what it does
- file2.ext - what it does
```

### For Ratified Skills:

```markdown
---
name: skill-name
description: One-line description of when to use this skill
type: operational|technical|foundation|meta
confidence: high
last_verified: YYYY-MM-DD
verified_against: commit-hash-or-"current"
owner: name
proposed_by: name
proposed_date: YYYY-MM-DD
ratified_by: name
ratified_date: YYYY-MM-DD
---

# Skill Name

## Overview
Brief explanation of what this skill does

## Model Notes
**Known risks**:
- [List AI failure modes specific to this skill]
- [e.g., "Overgeneralizing to other similar files"]
- [e.g., "Missing secondary update locations"]

**Required behavior**:
- [Critical safeguards AI must follow]
- [e.g., "Complete entire checklist before any edit"]
- [e.g., "Verify all N locations updated, not just one"]

## When to Use
Bullet list of triggers

## Process/Checklist
- [ ] Step 1
- [ ] Step 2
- [ ] Step 3

## Common Pitfalls
❌ Don't: [anti-pattern]
✅ Do: [correct pattern]

## Related Files
- file1.ext - what it does
- file2.ext - what it does
```

### For Temporary Workarounds:

Add these additional metadata fields:
```yaml
temporary: true
expires: YYYY-MM-DD
proper_solution: "Description of what should replace this"
created_because: "Reason workaround was needed"
```

**Skill type guidance**:
- `operational`: Workflow-focused, any team member can use
- `technical`: Architecture-focused, requires technical expertise
- `foundation`: Broadly applicable across all work (investigation, parallelization, etc.)
- `meta`: Skill system governance (skill-manager, repo conventions)

## Authority & Trust

**Authority hierarchy** (when conflicts arise):
1. **Code** - Source of truth, always wins
2. **Skills** - Operational memory, must stay synchronized with code
3. **CLAUDE.md** - Behavioral rules and conventions
4. **Model knowledge** - Fallback only, lowest priority

**Skill metadata** (required in every skill header):
```yaml
---
name: skill-name
description: One-line description
type: operational|technical|foundation|meta
last_verified: YYYY-MM-DD
verified_against: commit-hash-or-"current"
owner: name
confidence: high|medium|legacy
---
```

**Confidence levels**:
- `high`: Recently verified, actively maintained
- `medium`: Somewhat outdated but still generally applicable
- `legacy`: Not verified recently, use with caution

**Staleness rules**:
- When referenced files change significantly, skill should be reviewed
- Skills not verified in [6 months] automatically downgrade to `legacy`
- Legacy skills display warning when referenced
- AI should flag when it detects skill-code mismatch

**Who declares truth** (governance):
- **System skills** (skill-manager, CLAUDE.md): Repository owner only
- **Domain skills**: Domain lead approval required
- **Team skills**: Team lead approval required
- **Personal skills**: Individual creates, but flagged as personal scope

## Two-Lane Governance System

Skills operate in two lanes with different authority levels:

### Lane 1: Draft Skills (Low Barrier, Low Authority)

**Purpose**: Rapid capture of emerging patterns without bureaucracy

**Creation criteria**: ANY of:
- Pattern observed 2+ times
- Could prevent waste/rework if documented
- Individual believes it's worth trying

**Process**:
1. Create skill with `confidence: draft` in metadata
2. Add creation date and proposer
3. No approval needed - just create it
4. Include warning banner at top

**Authority level**:
- AI should mention when relevant but prefix with "Draft skill [name] suggests..."
- User can ignore without friction
- Lower priority than ratified skills if conflict

**Warning banner** (required):
```markdown
> ⚠️ **DRAFT SKILL** - Created [date] by [name]
> Not yet validated through usage. Treat as hypothesis, not truth.
> Feedback welcome. Will be reviewed for ratification after [X weeks/months].
```

**Epistemic Anchoring Prevention**:
- AI must never treat draft skills as authoritative
- Always qualify references: "Draft skill X suggests..." not "Skill X says..."
- Visual distinction in skill list (draft badge/color)
- Draft skills excluded from "must follow" behavior

### Lane 2: Ratified Skills (High Barrier, High Authority)

**Purpose**: Encode validated institutional truth

**Ratification criteria**: ALL of:
- Prevented measurable harm OR resolved 3+ confusion events (original creation threshold)
- Used successfully 3+ times across 2+ people/sessions
- No contradictions with existing ratified skills
- Verified against current code within last 30 days
- Approved by appropriate authority (per "Who declares truth" rules)

**Process**:
1. Draft skill must exist first (can't jump straight to ratified)
2. Gather evidence of effectiveness
3. Propose ratification with evidence
4. Get approval from appropriate authority
5. Update metadata: `confidence: high`, add ratification date/approver
6. Remove draft warning banner

**Authority level**:
- AI should follow unless explicitly overridden
- Higher priority than CLAUDE.md for domain-specific patterns
- Conflicts with other ratified skills trigger immediate alert

### Confidence Decay Curves

**Draft → High (Ratification)**:
- Requires evidence gathering + approval
- Manual promotion only

**High → Medium (6 months)**:
- Automatic if not re-verified within 6 months
- Triggers: "Skill [name] has been downgraded to medium confidence due to age. Review recommended."

**Medium → Legacy (12 months total)**:
- Automatic if not re-verified
- Triggers warning banner when referenced

**Legacy → Deprecated (18 months total OR evidence of incorrectness)**:
- Automatic if still not re-verified
- OR immediate if proven incorrect
- Move to deprecated folder

**Draft → Deprecated (6 months if unused)**:
- If draft skill created but never used in 6 months, flag for deletion
- Exception: Explicitly marked as "seasonal" or "waiting for X"

## File Structure

```
.claude/
  skills/
    skill-manager/
      SKILL.md              # This file
      SKILL-FULL.md         # Reference docs
    [other-skills]/
      SKILL.md
  deprecated/
    [old-skills]/
```

## Conflict Detection

If two skills contradict: Alert user → Propose resolution (merge/clarify/deprecate) → Wait for approval

### Belief Scaffolds for Conflicts

When skills genuinely conflict (both valid in different contexts), create meta-skill explaining the tradeoff:

**Example structure:**
```markdown
---
name: parallelization-vs-simplicity
description: When to parallelize operations vs keep sequential for clarity
type: meta
confidence: high
---

# Parallelization vs Simplicity Tradeoff

## The Conflict
- [parallel-execution] says: "Always parallelize independent operations"
- [sequential-clarity] says: "Keep related operations sequential for readability"

## Resolution Framework
Use parallel when:
- Operations are truly independent
- Performance matters
- No debugging needed

Use sequential when:
- Operations tell a story
- Debugging likely
- Performance acceptable

## Context Matters
Not a contradiction - different contexts favor different approaches.
```

This preserves both patterns while providing decision framework.

## Anti-Pattern: Skills Laundering Bad Practices

**Warning signs** that workarounds are becoming permanent:
- Skill documents a hack or temporary fix without expiration date
- "Until we refactor X" appears in multiple skills
- Workaround has been in place for 6+ months without review
- New team members learn the workaround before learning the proper pattern

**Guardrail process for temporary workarounds:**

If documenting a temporary workaround:
- [ ] Add `temporary: true` to skill metadata
- [ ] Add `expires: YYYY-MM-DD` (explicit expiration date)
- [ ] Add `proper_solution: [description]` (what should replace this)
- [ ] Add `created_because: [reason]` (why workaround was needed)
- [ ] Set reminder to review before expiration

**Example:**
```markdown
---
name: cache-invalidation-workaround
type: operational
confidence: medium
temporary: true
expires: 2025-06-01
proper_solution: "Implement event-driven cache invalidation via Redis pub/sub"
created_because: "Redis infrastructure not yet deployed"
---
```

**Pattern drift detection:**
When you notice a workaround skill still active past expiration, flag it:
```
Alert: Skill [name] marked temporary (expires [date]) is still active.
Either:
1. Proper solution was implemented → Deprecate this skill
2. Proper solution delayed → Update expiration and add note explaining why
3. Workaround became permanent → Remove temporary markers and document as standard pattern
```

**Kill rule for temporary skills**: If temporary skill reaches 2x original expiration without proper solution implementation or explicit extension with reasoning, automatically flag for deprecation.

## Staleness Detection

**Manual process** (until automation exists):
- When code files referenced in skill change significantly, review skill
- Update `last_verified` date and `verified_against` after review
- If skill is incorrect, update it immediately
- If skill hasn't been verified in 6 months, downgrade confidence to `legacy`

**Future automation** (not yet implemented):
- CI checks that flag when referenced files change
- Automatic confidence downgrade based on time
- Warning displayed when legacy skills are referenced

**When you detect stale skill**:
Alert: "Skill [name] references [file] which has changed since last verification. Skill may be outdated. Review needed?"

## Measurement Infrastructure

**Lightweight PR template hook** (add to `.github/pull_request_template.md`):
```markdown
## Skill Impact (optional)
- [ ] Used existing skill: [skill-name] - Helped / Didn't help / Modified
- [ ] Discovered pattern worth capturing (describe below)
- [ ] Found skill contradiction or outdated guidance
```

**Core metrics to track** (manual initially, automate later):

1. **Displacement Detection**: Did skill prevent rediscovering known pattern?
   - Measure: "Would you have made this mistake without the skill?"
   - Signal: Skills that score low on displacement should be deprecated

2. **Compression Ratio**: How much context did skill save?
   - Measure: Character count of skill vs conversation that would have been needed
   - Signal: High compression = valuable skill

3. **Interrupt Load**: How often do skills interrupt with false positives?
   - Measure: Times AI references skill but user says "not applicable"
   - Signal: High interrupt load = skill too broad or poorly scoped

4. **Cycle Time**: Time from pattern identification to skill creation
   - Measure: Days between "we should standardize this" and ratified skill
   - Signal: Long cycle time = process too heavy

5. **New Hire Trust**: Do new team members trust skills enough to follow them?
   - Measure: Survey or observation during onboarding
   - Signal: Low trust = skills feel outdated or theoretical

6. **Dependency Graph Density**: How many skills reference other skills?
   - Measure: Count of skill cross-references
   - Signal: High density = mature ecosystem; too high = tangled complexity

7. **Rework Rate**: How often do skills get updated post-ratification?
   - Measure: Edits per skill per month
   - Signal: High rework = premature ratification

**What NOT to measure** (avoid poisoning adoption):
- ❌ Number of skills created (encourages skill spam)
- ❌ Skill usage count (encourages over-referencing)
- ❌ Lines of code in skills (encourages verbosity)
- ❌ Team members who contributed skills (encourages vanity skills)

**Measurement cadence**: Review metrics quarterly, not continuously. Let patterns emerge.

## Skill Hierarchy & Organization

**Skill categories** (organize as they emerge, don't force structure prematurely):

1. **Foundation Skills** (apply broadly across all work)
   - Investigation principles (investigate-before-answering)
   - Execution optimization (parallel-execution)
   - Interaction rules (do-not-act-before-instructions)
   - Examples: `/skills/foundation/`

2. **Domain Skills** (specific to architecture/technology areas)
   - Architectural patterns (event-sourcing, microservices)
   - Design principles (API design, service boundaries)
   - Technical standards (testing, deployment)
   - Examples: `/skills/domain/`

3. **Operational Skills** (end-to-end workflows and processes)
   - Dashboard maintenance (ohme-data-updater)
   - Data management processes
   - Deployment procedures
   - Examples: `/skills/operational/`

4. **Meta Skills** (skill system governance)
   - Skill management (skill-manager)
   - Repository conventions
   - Examples: `/skills/meta/`

**Organization principles**:
- Start flat: All skills in `/skills/` initially
- Introduce hierarchy only when:
  - 5+ skills exist
  - Clear categories emerge naturally
  - Organization reduces confusion rather than adds it
- Skills can reference other skills: `See also: [skill-name.md]`
- Skills can declare prerequisites: `Prerequisite: [skill-name.md]`

**Current structure** (as of last update):
```
/skills/
  skill-manager/          # Meta skill
  ohme-data-updater/      # Operational skill
```

**Future structure** (when hierarchy emerges):
```
/skills/
  foundation/
    investigate-before-answering.md
    parallel-execution.md
    do-not-act-before-instructions.md
  domain/
    [architectural patterns as they crystallize]
  operational/
    ohme-data-updater/
    [other workflow skills]
  meta/
    skill-manager/
```

**When to introduce hierarchy**:
When flat structure causes confusion (skills hard to find) or when categories naturally separate (clear distinction between technical/operational/meta concerns).

Don't reorganize until the pain of flat structure justifies the cost of hierarchy.

### Technical vs Operational Skills

**Two parallel testing tracks** (both valuable, different purposes):

**Operational Skills:**
- Target: Any team member (technical or non-technical)
- Focus: "How not to break it" - procedural truth
- Format: Checklists, file locations, known pitfalls
- Examples: Dashboard updates, data management, deployment procedures
- Test with: Non-technical users performing operational tasks

**Technical/Domain Skills:**
- Target: Engineers, architects, technical decision-makers
- Focus: "How to design it well" - architectural principles
- Format: Patterns, design principles, trade-off analysis
- Examples: Event sourcing patterns, service boundaries, API design
- Test with: Technical users making architectural decisions

**Both are needed**:
- Operational skills enable anyone to maintain systems
- Technical skills enable engineers to evolve systems correctly

**Current status**: We have operational skills. Technical/domain skills will emerge when:
- Engineers make repetitive architectural decisions
- Design patterns crystallize through usage
- Architectural mistakes create measurable harm
- Junior engineers repeatedly rediscover known patterns

**Don't prematurely create technical skills**. Let them emerge from actual technical work pressure.

## System Maturity Signals

How to know if the skill system is working as you scale:

### Early Signals (0-3 months)

**Green flags** (system is healthy):
- Draft skills created freely without friction
- Some draft skills used, some ignored (healthy experimentation)
- At least 1 skill prevented a bug or saved time (displacement detected)
- Users reference skills conversationally: "Oh right, the data updater skill"

**Yellow flags** (needs attention):
- No skills created OR flood of skills (too cautious OR too enthusiastic)
- All drafts used equally (not learning what works)
- Skills referenced mechanically, not conversationally (cargo cult behavior)

**Red flags** (system failing):
- Skills ignored completely (not trusted)
- Skills block work more than enable it (too restrictive)
- Users say "ignore the skill" frequently (accuracy problem)

### Intermediate Signals (3-6 months)

**Green flags**:
- Multiple skills ratified based on evidence
- Some draft skills deprecated (healthy pruning)
- Skills compress onboarding: new hires reference them
- Cross-references between skills emerge naturally

**Yellow flags**:
- No ratifications OR all drafts ratified (standards too high OR too low)
- Skills growing in size (not compressing learning)
- Only one person creates skills (not collaborative)

**Red flags**:
- Skills conflict frequently without resolution
- Skills feel like bureaucracy, not memory
- People work around skills instead of updating them

### Strong Signals (6-12 months)

**Green flags**:
- Skills prevent entire classes of mistakes
- Displacement detection shows clear value (multiple "would have made this mistake" events)
- Skills evolve faster than code (knowledge extraction working)
- New hires contribute skills after onboarding (system is learnable)
- Skills become part of code reviews: "Did you check the X skill?"

**Yellow flags**:
- Skills lag code evolution significantly
- Skill updates require extensive meetings (governance too heavy)
- Skills optimized for AI, not humans (losing institutional value)

**Red flags**:
- Skills frozen (afraid to update)
- Skills contradictory but no one notices (not actually used)
- "That skill is outdated" said without fixing it (trust collapsed)

### Infrastructure Achievement (12+ months)

If you achieve these, the system has become institutional infrastructure:
- ✅ New hire onboarding explicitly includes skill review
- ✅ Skills referenced in incident post-mortems ("we had a skill for this")
- ✅ Skills exported to other teams/projects
- ✅ Skill metrics inform architecture decisions
- ✅ Skills survive team turnover (institutional memory, not personal)
- ✅ Non-technical stakeholders reference operational skills
- ✅ Skills prevent repeat architectural mistakes across projects

**Most important signal**: People miss the skills when they're not available. If you remove the skill system and no one notices, it wasn't working.

## Evolution History
- 2025-01-04: Initial creation. Self-modifying meta-skill with safeguards.
- 2025-01-04: Compressed to pure operational format based on usage feedback. Philosophy moved to SKILL-FULL.md.
- 2025-01-04: Added authority hierarchy, staleness detection, kill rule, and auto-update prohibition based on critical feedback about scaling failure modes.
- 2025-01-04: Added skill hierarchy framework and technical vs operational distinction. Preparing for dual testing tracks but not forcing structure prematurely.
- 2025-01-04: Round 3 updates incorporating dual ChatGPT analysis - added two-lane governance (draft vs ratified), measurement infrastructure with 7 core metrics, anti-patterns (skills laundering, epistemic anchoring), belief scaffolds for conflicts, system maturity signals, and updated skill structure templates with new metadata fields.

## Technical Testing Track (Pending)

**Status**: Operational skills proven valuable (ohme-data-updater). Technical/domain skills not yet needed.

**Next experiment**: Have senior engineer use Claude Code for architectural work:
- Add new event type to Axiom
- Create new LEGO microservice
- Refactor complex component

**Observe**:
- What architectural questions arise?
- What patterns get referenced repeatedly?
- What mistakes could a skill prevent?
- Is skill structure different for technical vs operational?

**Hypothesis**: Technical skills will need:
- Pattern libraries (not just checklists)
- Trade-off analysis frameworks
- Design principle references
- Architectural decision records

But don't build this until pain emerges from actual technical work.

**Parallel tracks**:
- ✅ Operational track: Dashboard maintenance skills working well
- ⏳ Technical track: Awaiting real architectural work to test
