# Decision Journal CLI Tool

A comprehensive command-line tool for tracking decisions and their outcomes over time.

## What It Does

The Decision Journal helps you:

1. **Document decisions** as they're made
2. **Capture reasoning** behind choices
3. **Track assumptions** that informed decisions
4. **Set review dates** to evaluate outcomes
5. **Build a knowledge base** of decision patterns

## Why It Matters

Decision journaling improves decision quality by:

- Creating accountability for outcomes
- Reducing hindsight bias ("I knew it all along")
- Capturing emotional state at decision time
- Identifying personal decision patterns
- Building an institutional memory of choices and outcomes

## Installation

```bash
cd projects/decision-journal
npm install
npm link
```

This will install the tool globally as `decision-journal`.

## Commands

- `decision-journal new` - Create a new decision entry
- `decision-journal list` - List all decision entries
- `decision-journal view <id>` - View a specific decision entry
- `decision-journal search <term>` - Search entries for a term
- `decision-journal review` - Show entries due for review
- `decision-journal stats` - Show statistics about your decisions
- `decision-journal domains` - Show decisions grouped by domain
- `decision-journal template list` - List available templates
- `decision-journal template view <name>` - View template details
- `decision-journal template create <name>` - Create a new template
- `decision-journal help` - Show help

## Standard Template Fields

The default template captures:

- **Title** - Brief description of the decision
- **Domain** - DonorBureau, TLH, Rational Ground, Personal, AI, Other
- **Decision Type** - Strategic, Tactical, Creative, Financial, Technical, People, Process
- **Context** - Situation requiring a decision
- **Options** - Alternatives considered
- **Choice** - What you decided to do
- **Rationale** - Why you chose this option
- **Assumptions** - What must be true for success
- **Risks** - What could go wrong and mitigations
- **Success Criteria** - How you'll know it worked
- **Review Date** - When to evaluate the outcome
- **Stakeholders** - Who's affected
- **Emotional State** - Your mood when deciding (1-10)
- **Confidence** - How sure you were (1-10)
- **Notes** - Additional context

## Creating Custom Templates

Custom templates can be created for different decision types:

```bash
decision-journal template create quick.yaml
```

Then edit the template file in `~/.openclaw/workspace/projects/decision-journal/templates/quick.yaml`.

## Decision Review Process

Set a review date for each decision. The tool will:

1. Track approaching review dates
2. Flag overdue reviews with `decision-journal review`
3. Show you what needs attention first

When reviewing, compare outcomes to your original:
- Expectations
- Assumptions
- Success criteria

## Stats and Insights

Use `decision-journal stats` to see patterns in your decision-making:
- Decision volume over time
- Domain distribution
- Confidence levels
- Emotional state correlation
- Success rate by domain/type

## Example Workflow

```bash
# Make a new entry
decision-journal new

# Check what needs review
decision-journal review

# See decision patterns
decision-journal stats

# Find related decisions
decision-journal search "revenue"

# View decisions by domain
decision-journal domains
```

## Data Storage

All entries are stored as JSON files in `~/.openclaw/workspace/projects/decision-journal/data`.
Templates are stored in `~/.openclaw/workspace/projects/decision-journal/templates`.

## Use Cases

- **Strategic Decisions** - Major investments, new initiatives, project approvals
- **Creative Choices** - Design directions, messaging approaches, content strategies
- **Technical Decisions** - Architecture choices, platform selections, build vs. buy
- **People Decisions** - Hiring, role changes, team structures
- **Process Decisions** - Workflow changes, policy updates, operational shifts

---

*"We are our choices." - Jean-Paul Sartre*