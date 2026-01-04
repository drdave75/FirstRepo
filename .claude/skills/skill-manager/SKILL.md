---
name: skill-manager
description: Meta-skill for managing skill lifecycle in self-aware repository. Handles skill creation, updates, deprecation, and conflict detection. Self-modifying with safeguards.
---

# Skill Manager

Manages skill lifecycle. Self-modifying with safeguards.

**📖 Full Reference**: For complex decisions, consult [SKILL-FULL.md](./SKILL-FULL.md)

## Create New Skill

**Decision rule**: Create if ANY apply:
- 3+ occurrences of same pattern
- 2+ bugs from lacking documentation
- User says "we should standardize this"

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

**Self-modification safeguard**: When updating THIS skill, confirm user understands implications

## Deprecate Skill

**When**: Superseded, unused, obsolete, merged

**Checklist**:
- [ ] Propose: "Deprecate [skill] because [reason]?"
- [ ] Wait for approval
- [ ] Move to `.claude/deprecated/` (don't delete)
- [ ] Add header: `# [Name] - DEPRECATED | Date | Reason | Replacement`

## Skill Structure Template

```markdown
---
name: skill-name
description: One-line description of when to use this skill
---

# Skill Name

## Overview
Brief explanation of what this skill does

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

## Evolution History
- 2025-01-04: Initial creation. Self-modifying meta-skill with safeguards.
- 2025-01-04: Compressed to pure operational format based on usage feedback. Philosophy moved to SKILL-FULL.md.
