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

```markdown
---
name: skill-name
description: One-line description of when to use this skill
type: operational|technical|foundation|meta
last_verified: YYYY-MM-DD
verified_against: commit-hash-or-"current"
owner: name
confidence: high
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

## Evolution History
- 2025-01-04: Initial creation. Self-modifying meta-skill with safeguards.
- 2025-01-04: Compressed to pure operational format based on usage feedback. Philosophy moved to SKILL-FULL.md.
- 2025-01-04: Added authority hierarchy, staleness detection, kill rule, and auto-update prohibition based on critical feedback about scaling failure modes.
- 2025-01-04: Added skill hierarchy framework and technical vs operational distinction. Preparing for dual testing tracks but not forcing structure prematurely.

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
