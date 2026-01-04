---
name: skill-manager
description: Meta-skill for managing skill lifecycle in self-aware repository. Handles skill creation, updates, deprecation, and conflict detection. Self-modifying with safeguards.
---

# Skill Manager

Meta-skill for managing skill lifecycle in self-aware repository. Self-modifying with safeguards.

**📖 Full Reference**: For complex decisions, consult [SKILL-FULL.md](./SKILL-FULL.md)

## When to Use Each Version

**This compressed version (daily use):**
- Regular skill creation/update decisions
- Quick reference during conversations
- Pattern detection triggers
- Routine conflict checks

**Full version (deep work):**
- Updating skill-manager itself (higher stakes)
- Complex conflict resolution
- Ecosystem health reviews
- Major architectural decisions about skills
- When compressed version doesn't cover edge case

## Update Existing Skills

**When**: Pattern refinement, scope clarification, efficiency improvements, error correction, context compression (3+ similar updates suggest need)

**How**:
1. Read current skill
2. Compress while preserving: core intent, critical constraints, key patterns
3. Remove: redundant examples, outdated context
4. Ask: "Update [skill] because [reason]. Changes: [summary]. Proceed?"
5. Add to evolution history: `- [Date]: [change description]`

**Self-modification safeguards**:
- Never remove safeguards from this skill
- Require explicit reasoning for changes to skill-manager itself
- Higher approval bar - confirm user understands implications
- Preserve core principles

## Create New Skills

**When** (one or more):
- Repetitive patterns (3+ occurrences)
- Domain-specific knowledge accumulates
- Cross-cutting concerns emerge
- Productivity multipliers discovered

**Don't create for**: One-offs, preferences in CLAUDE.md, might-not-recur patterns, overly narrow contexts

**Process**:
1. Detect pattern
2. Draft skill
3. Propose: "Pattern: [X]. New skill: [name]. Purpose: [Y]. Benefit: [Z]. Create? Reasoning: [criteria met]"
4. Create only after approval
5. Name: kebab-case, descriptive, unique (e.g., `event-sourcing-patterns.md`)

## Deprecate Skills

**When**: Superseded, unused, obsolete, merged with another

**Process**:
1. Propose with reason
2. Move to `/deprecated/` (don't delete)
3. Add header: `# [Name] - DEPRECATED | Date: [X] | Reason: [Y] | Replacement: [Z]`

## Detect Conflicts

**Types**: Direct contradiction, overlap/redundancy, boundary ambiguity

**Process**: Alert immediately → Analyze → Propose resolution (merge/clarify/deprecate) → Implement after approval

## Proactive Suggestions

**When**: 3+ repetitions, 2+ inefficiencies from lacking skill, user mentions standardization

**Format**: "Pattern: [X] in last [N] interactions. Draft skill? [benefit]"

## Success Monitoring

Track: application frequency, user corrections, outcome quality, efficiency gains

## Repository Structure

```
.claude/
  skills/
    skill-manager/
      SKILL.md           # This compressed version
      SKILL-FULL.md      # Complete reference
    ohme-data-updater/
      SKILL.md           # Existing skills
    [other-skills]/
      SKILL.md
  deprecated/
    [old-skills]/
      SKILL.md
```

**Relationship**: CLAUDE.md = constitution (behavior), Skills = case law (patterns)

**See Full Version**: [SKILL-FULL.md](./SKILL-FULL.md) for detailed guidance on all aspects of skill management.

## Evolution History
- 2025-01-04: Initial creation. Self-modifying meta-skill with safeguards for emergence-based skill ecosystem. Created both compressed (SKILL.md) and full (SKILL-FULL.md) versions for context efficiency.
