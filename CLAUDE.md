# CLAUDE.md - AI Assistant Guide for FirstRepo

## Repository Overview

This document provides comprehensive guidance for AI assistants (like Claude) working with this codebase. It outlines the structure, conventions, and workflows that should be followed to maintain consistency and quality.

**Repository:** FirstRepo
**Current Branch:** claude/add-claude-documentation-Faetb
**Status:** Initial setup phase

## Repository Structure

```
FirstRepo/
├── .git/                 # Git version control
├── CLAUDE.md            # This file - AI assistant guidance
└── [To be populated]    # Project files will be added here
```

### Expected Structure (To Be Implemented)

```
FirstRepo/
├── src/                 # Source code
├── tests/               # Test files
├── docs/                # Documentation
├── config/              # Configuration files
├── scripts/             # Utility scripts
├── .github/             # GitHub workflows and templates
├── README.md            # Project documentation
├── CLAUDE.md            # AI assistant guide (this file)
├── LICENSE              # License information
└── package.json         # Project dependencies (if Node.js)
```

## Development Workflows

### Branch Strategy

- **Main Branch:** `main` or `master` - Production-ready code
- **Feature Branches:** `claude/<descriptive-name>-<session-id>` - For AI-driven development
- **Development Branches:** `dev` or `develop` - Integration branch (if applicable)

### Git Workflow for AI Assistants

1. **Always work on designated feature branches**
   - Never commit directly to main/master
   - Use branch naming: `claude/<feature-description>-<session-id>`

2. **Commit Practices**
   - Write clear, descriptive commit messages
   - Follow conventional commits format: `type(scope): description`
   - Types: feat, fix, docs, style, refactor, test, chore
   - Example: `feat(auth): add user authentication system`

3. **Push Operations**
   - Always use: `git push -u origin <branch-name>`
   - Branch must start with 'claude/' and end with matching session ID
   - Retry up to 4 times with exponential backoff on network failures (2s, 4s, 8s, 16s)

4. **Pull Request Guidelines**
   - Create PRs with clear titles and descriptions
   - Include summary of changes (1-3 bullet points)
   - Add test plan checklist
   - Reference related issues

## Code Conventions

### General Principles

1. **Simplicity First**
   - Avoid over-engineering
   - Only make changes that are directly requested or clearly necessary
   - Keep solutions simple and focused
   - Don't add features beyond what was asked

2. **Security**
   - Watch for common vulnerabilities:
     - Command injection
     - XSS (Cross-Site Scripting)
     - SQL injection
     - OWASP Top 10 vulnerabilities
   - Validate at system boundaries (user input, external APIs)
   - Trust internal code and framework guarantees

3. **Code Quality**
   - Write clean, readable code
   - Follow existing patterns in the codebase
   - Don't add unnecessary abstractions
   - Delete unused code completely (no comments like "// removed")

### File Operations

- **Read Before Modify:** Always read files before suggesting modifications
- **Edit Don't Recreate:** Prefer editing existing files over creating new ones
- **Minimal Changes:** Only modify what's necessary for the task

### Documentation

- **Code Comments:** Only add where logic isn't self-evident
- **README:** Keep updated with setup instructions and usage
- **CLAUDE.md:** Update this file as the project evolves

## Testing Standards

### Test Structure

```
tests/
├── unit/                # Unit tests
├── integration/         # Integration tests
├── e2e/                 # End-to-end tests
└── fixtures/            # Test data
```

### Testing Practices

- Write tests for new features
- Update tests when modifying existing features
- Run test suite before committing
- Aim for meaningful test coverage, not arbitrary percentages

## Common Tasks

### Starting New Work

1. Ensure you're on the correct branch
2. Pull latest changes: `git fetch origin <branch-name>`
3. Create todo list for complex tasks
4. Read relevant existing code
5. Make changes incrementally

### Code Review Checklist

- [ ] Code follows existing patterns
- [ ] No security vulnerabilities introduced
- [ ] Tests added/updated as needed
- [ ] Documentation updated if needed
- [ ] No unnecessary changes or over-engineering
- [ ] Commit messages are clear and descriptive

### Completing Work

1. Run tests and build processes
2. Review all changes
3. Commit with clear messages
4. Push to feature branch
5. Create pull request if ready

## File Naming Conventions

### General Rules

- Use lowercase for directories
- Use kebab-case for file names: `my-file.ext`
- Use PascalCase for component/class files (if applicable)
- Use descriptive names that reflect content/purpose

### Common Extensions

- `.md` - Markdown documentation
- `.json` - Configuration files
- `.yml`/`.yaml` - YAML configuration
- `.js`/`.ts` - JavaScript/TypeScript
- `.py` - Python
- `.sh` - Shell scripts

## Error Handling

### When Things Go Wrong

1. **Build Failures:** Read error messages carefully, fix root cause
2. **Test Failures:** Don't mark tasks complete until tests pass
3. **Merge Conflicts:** Resolve carefully, preserving intended functionality
4. **Git Issues:** Check branch name, permissions, network connectivity

## Interaction Principles

### Deep Understanding First

Before providing solutions or making changes, invest time understanding the app and architecture deeply - how it works inside and out.

**Required approach:**
1. **Read relevant code** - Examine the actual implementation, not assumptions
2. **Understand the patterns** - Identify the architectural principles at play
3. **Ask clarifying questions** - If anything is unclear or unfamiliar, ask
4. **Build context** - This understanding becomes the foundation for all subsequent work

**When to ask questions:**
- Unfamiliar architectural patterns (even if they seem similar to common patterns)
- Unclear relationships between components
- Ambiguous requirements or specifications
- Trade-offs that require product/business context
- Custom conventions or terminology specific to this project

**Examples:**

**Encountering event sourcing pattern:**

**Wrong approach:**
```
❌ Assume: "This looks like event sourcing, so I'll apply standard patterns"
❌ Proceed without understanding the specific implementation
❌ Make changes based on general event sourcing knowledge
```

**Correct approach:**
```
✓ Read the event handlers and understand the actual flow
✓ Ask: "I see you're using event sourcing - are there specific patterns
  or conventions I should follow? I notice events go to Axiom - should I
  understand how that integration works?"
✓ Build understanding of THIS implementation before suggesting changes
✓ Verify understanding: "It looks like events flow through Forge → LEGO → Axiom.
  Is that correct?"
```

**Encountering Ohme-specific terminology:**

**Wrong approach:**
```
❌ Guess what "charge session" means based on general EV knowledge
❌ Assume "site" refers to website locations
```

**Correct approach:**
```
✓ Ask: "I see references to 'charge sessions' - can you explain what these
  represent in Ohme's system?"
✓ Read code to understand the actual data structures and relationships
✓ Build a mental model grounded in Ohme's specific domain
```

**Key principle:** It's better to ask a "basic" question and get it right than to assume you understand and get it wrong. Deep understanding prevents rework.

### Do Not Act Before Instructions

Do not jump into implementation or modify files unless explicitly instructed to make changes.

**Default behavior when intent is ambiguous:**
- Provide information and context
- Conduct research and analysis
- Offer recommendations and options
- Explain trade-offs and implications

**Only proceed with edits/modifications/implementations when:**
- User explicitly requests changes ("implement this", "modify the file", "add this feature")
- User provides clear specifications for what to build
- Intent to act is unambiguous

**Examples:**

**Ambiguous request:** "The charge session handler could be improved"

**Wrong approach:**
```
❌ Immediately start modifying the handler
❌ Make assumptions about what improvements are needed
❌ Implement changes without confirmation
```

**Correct approach:**
```
✓ Read the current handler implementation
✓ Analyze potential improvements
✓ Present options: "I see several possible improvements:
  1. Add retry logic for failed charges
  2. Improve error handling
  3. Add validation for edge cases
  Which would you like me to implement?"
✓ Wait for explicit instruction before making changes
```

**Clear request:** "Add retry logic to the charge session handler with exponential backoff"

**Correct approach:**
```
✓ This is unambiguous - proceed with implementation
✓ Read current handler
✓ Implement retry logic as specified
✓ Test and commit
```

**Key principle:** When in doubt, inform and recommend. Only act when instructed. Premature implementation wastes effort if you misunderstand the requirement.

## AI-Specific Guidelines

### Task Management

- Use TodoWrite tool for complex multi-step tasks
- Mark todos in_progress before starting work
- Mark todos completed immediately after finishing
- Only one todo in_progress at a time

### Communication

- Be concise and clear
- Use markdown formatting
- Include file references with line numbers: `file_path:line_number`
- Don't use emojis unless explicitly requested

### Tool Usage

- Use specialized tools over bash commands when possible
- Use Read tool before Edit tool
- Use Task tool with Explore agent for codebase exploration
- Make parallel tool calls when operations are independent

### Tool Usage Optimization

#### Parallel Tool Calls

When working with code, maximize efficiency by calling independent tools in parallel rather than sequentially:

**Always parallelize when:**
- Reading multiple files to understand system architecture
- Analyzing related components across microservices (Forge/LEGO/Axiom patterns)
- Loading event sourcing handlers and their corresponding events
- Reviewing API contracts alongside implementations
- Gathering context from multiple skills in self-aware repositories

**Never parallelize when:**
- Tool calls have dependencies (e.g., need output from first call as input to second)
- Parameters for subsequent calls depend on previous results
- Sequential execution is required by the logic

**Example - Analyzing a microservice interface:**
```
Bad (Sequential):
1. Read API contract
2. Wait for result
3. Read implementation
4. Wait for result
5. Read tests

Good (Parallel):
1. Read API contract + implementation + tests in single message
2. All results available immediately
3. Begin analysis
```

**Example - Understanding self-aware repository:**
```
Good (Parallel):
Read README.md + CLAUDE.md + .claude/skills/*/SKILL.md
→ Complete picture of repo structure, conventions, and operational patterns
```

### Investigate Before Answering

Never speculate about code you haven't examined. When questions involve specific files or codebase details:

**Required workflow:**
1. **Read first, answer second** - If a file is referenced, read it before responding
2. **Investigate the context** - Read related files that provide necessary context
3. **Use parallel tool calls** - Load all relevant files simultaneously when they're independent
4. **Ground your responses** - Base answers on actual code, not assumptions

**Examples:**

**User asks:** "How does the event handler in `forge/handlers/charge_session.py` work?"

**Wrong approach:**
```
❌ Speculate: "Event handlers typically receive events and process them..."
❌ Assume: "It probably listens for charge_session events and..."
```

**Correct approach:**
```
✓ Read forge/handlers/charge_session.py first
✓ Examine the actual implementation
✓ If it references other modules, read those too (in parallel)
✓ Answer based on what the code actually does
```

**User asks:** "What's the relationship between the API contract and implementation?"

**Correct approach (parallel reads):**
```
✓ Read contracts/api.yaml + implementations/api_service.py + tests/test_api.py
✓ All in single message, all results available immediately
✓ Analyze actual relationships, not theoretical ones
```

**Key principle:** Your responses should be grounded in code inspection, not software development generalities. Read the code, understand the patterns, then answer.

## Environment Information

- **Platform:** Linux
- **OS Version:** Linux 4.4.0
- **Working Directory:** `/home/user/FirstRepo`
- **Git Repository:** Yes

## Project-Specific Conventions

> **Note:** This section should be updated as the project develops and specific patterns emerge.

### Coding Style

- [To be defined based on project language and framework]

### Architecture Patterns

- [To be defined based on project requirements]

### Dependencies Management

- [To be defined: npm, pip, cargo, etc.]

### Build System

- [To be defined: webpack, vite, make, etc.]

## Resources

### Documentation

- Project README: `README.md` (to be created)
- API Documentation: (to be created)
- Architecture Diagrams: (to be created)

### External Resources

- Git Best Practices: [https://git-scm.com/doc](https://git-scm.com/doc)
- Conventional Commits: [https://www.conventionalcommits.org/](https://www.conventionalcommits.org/)

## Maintenance

### Updating This Document

- Update when new patterns or conventions are established
- Update when project structure changes significantly
- Update when new tools or workflows are introduced
- Keep examples current and relevant

### Version History

- **2026-01-02:** Initial creation - Empty repository setup

---

## Quick Reference for AI Assistants

### Before Starting

- [ ] Read CLAUDE.md (this file)
- [ ] Check current branch
- [ ] Review recent commits
- [ ] Understand the task requirements

### During Work

- [ ] Use TodoWrite for task tracking
- [ ] Read files before editing
- [ ] Follow existing patterns
- [ ] Keep changes minimal and focused
- [ ] Test changes as you go

### Before Committing

- [ ] Review all changes
- [ ] Run tests and builds
- [ ] Check for security issues
- [ ] Write clear commit message
- [ ] Ensure no unintended changes

### Completing Work

- [ ] Push to correct branch
- [ ] Create PR if needed
- [ ] Update documentation if needed
- [ ] Mark all todos complete

---

**Last Updated:** 2026-01-02
**Maintained By:** AI Assistants working on this repository
**Questions?** Update this document or ask the repository maintainers
