---
name: skill-manager-full
description: Complete reference for skill lifecycle management. Consult when making complex decisions about the skill ecosystem, updating skill-manager itself, or resolving conflicts.
---

# Skill Manager - Meta-Skill for Self-Aware Repository

## Purpose
Manages the complete lifecycle of skills in this repository: creation, evolution, deprecation, and conflict resolution. This skill is self-modifying but includes safeguards to prevent recursive instability.

## 1. Skill Update Criteria & Process

### When to Update an Existing Skill

Update a skill when:
- **Pattern refinement**: User interactions reveal more precise patterns than originally captured
- **Scope clarification**: Boundaries between this skill and others become clearer
- **Efficiency improvements**: Better ways to achieve the skill's purpose emerge
- **Error correction**: The skill produces suboptimal results that need refinement
- **Context compression**: Accumulated learnings can be distilled into more concise form

### How to Update Skills

**Compression principles:**
1. Preserve the **core intent** - what problem does this solve?
2. Preserve **critical constraints** - what must never be violated?
3. Preserve **key patterns** - what are the essential decision rules?
4. Remove **redundant examples** - keep only the most illustrative ones
5. Remove **outdated context** - information that no longer applies

**Update process:**
1. Read current skill file
2. Identify what needs updating and why
3. Create updated version preserving essence while compacting
4. Show user: "I want to update [skill-name] because [reason]. Changes: [summary]. Proceed?"
5. Only update after explicit approval
6. Log update in skill's evolution history section

**Evolution history format:**
```markdown
## Evolution History
- [Date]: [Compact description of change and why]
```

### Self-Modification Safeguards

When updating THIS skill (skill-manager.md):
1. **Never remove safeguards** - the self-modification protection mechanisms must remain
2. **Require explicit reasoning** - explain why the meta-skill itself needs changing
3. **Higher bar for approval** - ask user to confirm they understand implications
4. **Preserve core principles** - the fundamental approach to skill management must remain stable
5. **Version control note** - remind user that git history preserves previous versions

## 2. New Skill Creation Criteria

### When to Create a New Skill

Create a new skill when you observe:

**Repetitive patterns** (3+ occurrences):
- User repeatedly asks for same type of analysis/transformation
- Similar architectural decisions keep arising
- Consistent formatting/structure preferences emerge
- Recurring debugging or troubleshooting workflows

**Domain-specific knowledge** emerges:
- Deep context about a specific system/component accumulates
- Specialized terminology or conventions become clear
- Complex domain rules crystallize through conversation

**Cross-cutting concerns** appear:
- Pattern applies across multiple files/components
- Architectural principle that should guide many decisions
- Quality standard that should be consistently applied

**Productivity multipliers** are discovered:
- Workflow that saves significant time when codified
- Complex task that can be simplified through standardization
- Error-prone process that benefits from guardrails

**DO NOT create skills for:**
- One-off requests or unique situations
- Preferences already captured in Claude.md
- Patterns that might not recur
- Overly narrow contexts (too specific to be reusable)

### Skill Creation Process

When criteria are met:
1. **Detect the pattern** - identify what's becoming repetitive/valuable
2. **Draft skill content** - create concise, actionable instructions
3. **Propose to user**:
   ```
   I notice we've [pattern description] [X times/in Y contexts].

   This suggests a new skill: [skill-name]
   Purpose: [what it does]
   Benefit: [why it's valuable]
   Scope: [when it applies]

   Would you like me to create this skill?
   Reasoning: [why this meets creation criteria]
   ```
4. **Create only after approval**
5. **Add to skills directory** with proper naming

### Skill Naming Convention
- Use kebab-case: `skill-name.md`
- Descriptive: name should indicate purpose
- Unique: avoid collisions with existing skills
- Examples: `event-sourcing-patterns.md`, `microservice-boundaries.md`, `parallel-execution.md`

## 3. Skill Deprecation

### When to Deprecate a Skill

Deprecate when:
- **Superseded**: Another skill now covers this better
- **Unused**: Not referenced or applied in [timeframe TBD]
- **Obsolete**: Architecture changes make it irrelevant
- **Merged**: Combined with related skill for better coherence

### Deprecation Process

1. Propose: "Skill [name] appears [reason]. Should we deprecate?"
2. If approved, move to `/deprecated/` folder (don't delete)
3. Add deprecation notice at top:
   ```markdown
   # [Skill Name] - DEPRECATED
   **Deprecated**: [Date]
   **Reason**: [Why deprecated]
   **Replacement**: [What to use instead, if applicable]
   ```
4. Update any skills that referenced this one

## 4. Skill Conflict Detection

### Types of Conflicts

**Direct contradiction:**
- Two skills give opposing instructions for same situation
- Example: One skill says "always parallelize", another says "never parallelize X"

**Overlap/redundancy:**
- Multiple skills cover same ground with slight variations
- Creates confusion about which to follow

**Boundary ambiguity:**
- Unclear which skill applies in specific situation
- Two skills both seem relevant but suggest different approaches

### Conflict Resolution Process

When conflict detected:
1. **Alert user immediately**: "I see a conflict between [skill A] and [skill B]: [description]"
2. **Analyze**: Explain the nature of the conflict
3. **Propose resolution**:
   - Merge into single coherent skill?
   - Clarify boundaries/precedence?
   - Deprecate one in favor of other?
4. **Implement only after approval**

## 5. Skill Composition Patterns

### Skill References

Skills can reference other skills:
```markdown
See also: [parallel-execution.md] for performance optimization
Prerequisite: [investigate-before-answering.md]
Conflicts with: [deprecated/old-pattern.md]
```

### Skill Hierarchies

Organize by:
- **Foundation skills** - apply broadly (e.g., investigation, parallelization)
- **Domain skills** - specific to architecture areas (e.g., event-sourcing, microservices)
- **Workflow skills** - end-to-end processes (e.g., deployment, debugging)
- **Meta skills** - skill management (this file)

## 6. Success Metrics & Evolution

### Tracking Skill Effectiveness

Monitor:
- **Application frequency** - is the skill actually being used?
- **User corrections** - do users frequently override the skill's guidance?
- **Outcome quality** - does following the skill produce good results?
- **Efficiency gains** - does the skill measurably save time?

### Proactive Skill Suggestions

When patterns emerge, proactively suggest:
```
I notice we've [pattern] in the last [N] interactions.
This might benefit from a skill. Would you like me to draft one?
```

**Trigger thresholds:**
- 3+ repetitions of similar requests
- 2+ instances where lacking a skill caused inefficiency
- User explicitly mentions "we should standardize this"

### Continuous Improvement

This skill itself should evolve based on:
- How well the skill ecosystem serves the repository
- Feedback from skill usage patterns
- Emergence of better organizational principles
- User experience with skill management

## 7. Implementation Notes

### File Structure
```
.claude/
  skills/
    skill-manager/
      SKILL.md           # Compressed version for daily use
      SKILL-FULL.md      # This complete reference
    ohme-data-updater/
      SKILL.md
    [other-skills]/
      SKILL.md
  deprecated/
    [old-skills]/
      SKILL.md
```

### Integration with Claude.md

Claude.md contains:
- General behavioral instructions
- Repository-wide context
- Tool usage optimization

Skills contain:
- Specific, reusable patterns
- Domain knowledge
- Workflow processes

**Relationship**: Claude.md = constitution, Skills = case law

## 8. Bootstrap Process

This skill is created as part of establishing the self-aware repository pattern. Initial skills to consider:
1. ✅ Parallel execution (already defined)
2. ✅ Investigate before answering (already defined)
3. ✅ Do not act before instructions (already defined)
4. ✅ This skill manager (created)
5. ✅ Ohme data updater (domain-specific)

## Evolution History
- 2025-01-04: Initial creation as meta-skill for self-aware repository pattern. Includes self-modification with safeguards, creation/update/deprecation workflows, and emergence-based skill discovery. Created both compressed (SKILL.md) and full (SKILL-FULL.md) versions.

---

**Meta-note**: This skill embodies the "emergence cultivation" philosophy - create conditions for capabilities to crystallize, observe what patterns emerge, and feed learnings back into the system. The skill ecosystem should grow organically based on actual needs, not preconceived structures.
