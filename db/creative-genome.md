# Creative Genome 🧬
> Extracted DNA from top-performing creatives across all DonorBureau clients

**Generated:** 2026-02-13  
**Data Sources:** 4,257+ political creatives (NRSC, RNC, NRCC) | 1,324+ nonprofit creatives (HeroBox, SemperK9, SoldierStrong, NCPD)  
**Analysis Methods:** V2 Forensics (correlation-first, cross-client validated)

---

## 1. Winning Sentence Structures 📝

### Universal Power Patterns (Work Everywhere)

| Pattern | Formula | Example | Avg Lift |
|---------|---------|---------|----------|
| **Personalized Hook** | `[firstname\|Friend], [specific statement]` | "There's something we haven't told you yet, [firstname\|Friend]." | +8.7% r=0.041 |
| **Direct Declarative** | No question mark, immediate statement | "We trusted you, [firstname\|Friend]. Prove us right." | +12% vs questions |
| **Two-Part Teaser** | "Two things, [firstname]:" | "Two things, [firstname\|Friend]: First, thank you..." | 155 polls (NRSC) |
| **Specific Date Anchor** | "On [exact date], we'll..." | "On December 14, we'll lay wreaths beside our fallen heroes..." | $0.657/send |
| **Personal Intro + Credential** | "Hi, this is [Name] from [Org]..." | "Hi, this is Chris and Amanda Baity from Semper K9." | 47 polls (SK9) |

### Client-Specific Power Structures

**NRSC (Political Senate):**
```
SECRET MESSAGE: "The [Org] has sent you a secret message, please review within 15 minutes: [link]"
→ YI 14.42 (highest single creative)

GUILT/SHAME: "We trusted you, [firstname|Friend]. Prove us right—[action] IMMEDIATELY: [link]"
→ YI 8.06, 3.8x average

COUNTDOWN: "*Alert* Message from [Person] will be gone in 13 minutes. See it before permanent removal > [link]"
→ YI 1.51, 47 polls, $58K
```

**SemperK9 (Nonprofit Veteran Service Dogs):**
```
FOUNDER STORY: "Hi, this is Chris and Amanda Baity from Semper K9. [brief mission] $25 today → [link]"
→ $0.064/send, 47 polls

DOG VOICE: "Hey, it's Hank from Semper K9. Pleaze excuse any typos, I have to paws a lot..."
→ $0.092/send, top 10 creative

EVENT ANCHOR: "[firstname|Friend], on December 14, we'll lay wreaths beside our fallen heroes..."
→ $0.657/send (BEST IN DATASET)
```

**HeroBox (Nonprofit Troop Support):**
```
DEADLINE URGENCY: "We need to mail these out by the end of the week!"
→ 46 polls, top creative

HOLIDAY VISION: "[firstname|Friend], imagine a soldier's smile opening YOUR gift on Christmas!"
→ 36 polls, #2 creative
```

**SoldierStrong (Nonprofit Exoskeletons):**
```
CELEBRITY LEAD: "🦃 Urgent: A Thanksgiving Plea from Dana Perino"
→ 30 polls, r=0.281 (strongest signal in ANY client)

CELEBRITY PERSONAL: "Hi [firstname], it's Dana Perino."
→ 23 polls, authentic voice
```

### Loser Patterns (Avoid)

| Pattern | Why It Fails | Negative Signal |
|---------|--------------|-----------------|
| "Picture this:" | Fiction voice, not personal | r=-0.014 |
| "At [Org], our mission is rooted in..." | Corporate brochure, not human | $0.011/send |
| Question openers | Can be answered "no" without guilt | r=-0.026 |
| "Will you join us in..." | Passive, assumes choice | $-0.013/send |
| "We urgently need $X to reach our goal" | About you, not them | $-0.019/send |

---

## 2. Optimal Word Counts by Client 📊

### Political Clients (SMS-Heavy)

| Client | Sweet Spot | Peak Performance | Danger Zone |
|--------|-----------|------------------|-------------|
| **NRSC** | 50-150 chars | 101-150 chars (z=+0.077) | >150 chars (z=-0.178) |
| **RNC** | 70-150 chars | Longer helps (r=+0.077) | <30 chars |
| **NRCC** | 70-150 chars | Longer helps (r=+0.070) | <30 chars |

**Political Summary:** Short-medium wins. Under 30 chars = too brief. Over 150 = loses them.

### Nonprofit Clients (MMS-Heavy)

| Client | Sweet Spot | Peak Performance | Danger Zone |
|--------|-----------|------------------|-------------|
| **SemperK9** | 250-500 chars | Longer helps (r=+0.205) | >1200 chars (avg $0.009/send) |
| **HeroBox** | Under 250 chars | Ultra-short + strong image | Long-form essays |
| **SoldierStrong** | Any (celebrity effect dominates) | Celebrity name present | No name drop |
| **NCPD** | 300-600 chars | Personal victim stories | Generic mission copy |

**Nonprofit Summary:** MMS allows longer copy, but the image does heavy lifting. 250-500 is the sweet spot. 1000+ chars = guaranteed failure (see Cr-91 series: 6 variants, all failed).

### The 1000+ Char Death Zone

**Evidence:** SemperK9's Cr-91 series (Rona story variants)
- Cr-91b: 1000+ chars → $0.008/send
- Cr-91c: 1000+ chars → $0.011/send  
- Cr-91d: 1000+ chars → $0.019/send
- Cr-91e: 1200+ chars → $0.003/send
- Cr-91f: 1200+ chars → $0.004/send

**Combined:** 193K sends, $1.4K donated = avg $0.007/send (essentially zero)

---

## 3. Emotional Beat Patterns 💓

### The Universal Arc: Hook → Story → Bridge → Ask → CTA

```
┌─────────────────────────────────────────────────────────────────┐
│  HOOK (0-30 chars)                                              │
│  → Personalization + emotional trigger or curiosity gap         │
│  → "There's something we haven't told you yet, [firstname]"     │
├─────────────────────────────────────────────────────────────────┤
│  STORY (30-150 chars)                                           │
│  → 1-2 sentences of specific detail                             │
│  → Named person/dog, specific date, concrete image              │
├─────────────────────────────────────────────────────────────────┤
│  BRIDGE (emotional pivot)                                       │
│  → Connect story to donor's ability to act                      │
│  → "Your $25 today isn't just a donation—it's a way to say..."  │
├─────────────────────────────────────────────────────────────────┤
│  ASK (single amount)                                            │
│  → $25 for nonprofit, verification/action for political         │
│  → Keep it simple, keep it specific                             │
├─────────────────────────────────────────────────────────────────┤
│  CTA (with arrows)                                              │
│  → ">> [link]" or "[action] >> [link]"                          │
│  → One link only                                                │
└─────────────────────────────────────────────────────────────────┘
```

### Emotional Trigger Hierarchy (Ranked by Performance)

| Rank | Emotion | Political Example | Nonprofit Example | Signal Strength |
|------|---------|-------------------|-------------------|-----------------|
| 1 | **Guilt/Shame** | "We trusted you..." | N/A | YI 5.38 (3.8x avg) |
| 2 | **Mystery/Curiosity** | "Secret message..." | N/A | YI 14.42 |
| 3 | **Celebrity Endorsement** | N/A | "Dana Perino here..." | r=0.281 |
| 4 | **Personal Connection** | "This is [Name]..." | "Hi, this is Chris..." | +40% vs org voice |
| 5 | **Specific Urgency** | "13 minutes..." | "December 14..." | YI 1.51-3.91 |
| 6 | **Social Proof** | "Other patriots in [zipcode]..." | N/A | YI 4.09 |
| 7 | **Despair → Hope** | N/A | "17 vets/day... but service dogs reduce by 82%" | $0.084/send |

### The Despair → Hope → Action Arc (Nonprofit-Specific)

**Best example (Cr-173, SemperK9):**
```
DESPAIR: "I wish I had better news, but the latest numbers just came in."
         "17 veterans per day. 20% suffer from PTSD. 6,407 suicides in 2022."

HOPE:    "But service dogs reduce symptoms by 82%."

ACTION:  "Your $25 today trains another dog."

CTA:     "[link]"
```

**Why it works:** Stats create urgency, solution creates pathway, donation becomes the bridge. Pure despair without hope = failure.

---

## 4. Ask String Performance 💰

### Political: Verification > Donation

Top political creatives don't ask for money directly—they ask for action:
- "Verify your voter profile" → YI 8.06
- "Complete our survey" → 272 polls, $819K
- "Who are you voting for?" → 174 polls, $197K

**The meta-pattern:** Political asks work best when disguised as engagement (polls, surveys, verification).

### Nonprofit: Single Ask Amounts

| Amount | Performance | Best Use Case |
|--------|-------------|---------------|
| **$25** | Top performer across nonprofit clients | SemperK9, SoldierStrong, NCPD |
| **$20** | Works for playful/light copy | HeroBox, fun campaigns |
| **$35** | Premium positioning | Founder-signed messages |
| **No amount** | Let LP handle | When image is strong enough |

**Key insight:** $25 is the nonprofit sweet spot. It appears in 8 of top 20 winners.

### The $7,500 Paradox

**Counterintuitive finding:** Asking for $7,500 for one dog's ACL surgery outperforms asking for $2,000 for "the organization."

- Cr-04 "Donut needs ACL surgery costing $7,500" → $0.066/send ✓
- Cr-83 "We urgently need $2,000" → -$0.019/send ✗

**Why:** Specificity creates reality. Round numbers feel made up. Named needs > organizational needs.

### Ask Ladder Format (When Used)

```
Single-line: $10 / $25 / $50 / $100

✓ Works when:
  - On its own line with breathing room
  - Not tied to unconfirmed deliverables

✗ Fails when:
  - Buried in text
  - With complicated "If you give X, we can Y" framing
```

---

## 5. Voice/Persona Effectiveness 🎭

### Persona Performance Ranking

| Persona Type | Political Performance | Nonprofit Performance | Cross-Client? |
|--------------|----------------------|----------------------|---------------|
| **Celebrity/Authority** | Ted Cruz YI 3.31 (55 polls) | Dana Perino r=0.281 | ✓ Universal |
| **Personal Founder** | Don Jr. YI 3.98 | Chris Baity $0.064/send | ✓ Universal |
| **Character Voice** | N/A | Hank the dog $0.092/send | Nonprofit only |
| **Anonymous Org** | Low performer | $0.011/send (Cr-91c) | ✗ Always weak |
| **Generic Trump** | YI 0.93 (below baseline!) | N/A | ✗ Underperforms |

### Key Persona Insights

**1. A person asks. An organization gets ignored.**
- ✓ "I'm Chris Baity, a Marine Corps veteran and founder..."
- ✗ "At Semper K9, our mission is rooted in loyalty..."

**2. Specific celebrity > generic authority**
- ✓ "Dirty Jobs Host MIKE ROWE:" → $0.091/send
- ✓ "This is Ted Cruz & I'm in the fight of my life" → YI 3.31
- ✗ "President Trump needs your help" → YI 0.93 (below average!)

**3. Don Jr. beats Trump Sr. (when personal voice is authentic)**
- Don Jr. with personal "I'm leveling with you" voice → YI 3.98
- Generic "Trump" branding without personal voice → underperforms

**4. Dog voice is a secret weapon (nonprofit)**
- Hank's letter with personality and typos → $0.092/send, top 10
- Donors to animal orgs LOVE animals speaking

### Voice Combinations That Win

```
CELEBRITY QUOTE + PERSONAL ASK:
"Dirty Jobs Host MIKE ROWE: [quote about mission]"
"This is why I support Semper K9. Will you join me?"
→ $0.091/send

FOUNDER INTRO + VULNERABILITY:
"I wish I had better news, but the latest numbers just came in..."
[stats]
"That's why Amanda and I started Semper K9."
→ $0.084/send

DOG CHARACTER + HUMOR:
"Hey, it's Hank from Semper K9. Pleaze excuse any typos, I have to paws a lot because I don't have thumbs."
→ $0.092/send
```

---

## 6. Format & Technical Patterns 📐

### MMS vs SMS

| Metric | MMS | SMS | Winner |
|--------|-----|-----|--------|
| Yield/Send (SemperK9) | $0.093 | $0.022 | **MMS (4.2x)** |
| CPM (NRSC) | $29.96 | $12.86 | **MMS (2.3x)** |
| Yield Index (NRSC) | 1.35 | 1.57 | **SMS (efficiency)** |
| Click-Through Rate | 2.75% | 4.68% | **SMS (clicks)** |

**Verdict:** MMS for absolute revenue, SMS for efficiency. MMS image establishes emotional context before text loads.

### Emoji Usage

| Pattern | Correlation | Notes |
|---------|-------------|-------|
| Any emoji (NRSC) | +16% YI lift | 🚨 💔 work; walls of emoji fail |
| Emoji (RNC) | r=+0.037 | Slight positive |
| Emoji (NRCC) | r=-0.040 | Slight negative |
| Emoji (SemperK9) | r=-0.084 | Hurts |
| Emoji (SoldierStrong) | r=+0.152 | Helps (Dana Perino effect) |

**Rule:** Emoji is client-specific. Use sparingly at hook or CTA, never scattered throughout.

### Punctuation Signals

| Element | Effect | Evidence |
|---------|--------|----------|
| Exclamation marks | Generally negative | r=-0.037 (political), winners use 2.5x fewer |
| Question marks | Negative | r=-0.027, questions underperform statements |
| Ellipsis | Slightly negative | r=-0.016 |
| Colons | NRSC positive, others mixed | "Two things:" format works for NRSC only |
| >> Arrows | Positive for CTA | Universal best practice |

---

## 7. Power Words & Poison Words 🔤

### 🔥 Power Phrases (Use These)

| Phrase | Yield Index | Context |
|--------|-------------|---------|
| "dead serious" | 24.94 | NRSC |
| "reclaim your place" | 23.47 | NRSC |
| "your silence it" | 22.85 | NRSC |
| "complete this now" | 24.88 | NRSC |
| "secret message" | 14.42 | NRSC |
| "we trusted you" | 8.06 | NRSC |
| "fight of my life" | 3.31 | NRSC (Ted Cruz) |
| "December 14" | $0.657/send | SemperK9 (event anchor) |
| "Dana Perino" | r=0.281 | SoldierStrong |

### ☠️ Poison Phrases (Avoid)

| Phrase | Yield Index | Why |
|--------|-------------|-----|
| "with trump" | -16.72 | Generic, not personal |
| "to stand with" | -10.18 | Passive, no action |
| "we should" | -8.64 | Weak, uncertain |
| "america s" (possessive) | -5.18 | Abstract patriotism |
| "first 100 days" | -4.73 | Time-bound, stale |
| "Our mission is rooted in" | $0.011/send | Corporate brochure |
| "Picture this:" | $0.008/send | Fiction voice |

---

## 8. Cross-Client Universal Laws 📜

### What Works EVERYWHERE

1. **Personalization tokens help** (r=0.041-0.089)
   - [firstname], [zipcode], [statename]
   - Small but consistent lift across all clients

2. **Questions hurt** (negative in all 7 clients analyzed)
   - Statements outperform questions
   - "Did you know?" format underperforms

3. **A person beats an organization**
   - Named sender > organizational voice
   - Celebrity/founder > anonymous

4. **Specific beats generic**
   - "December 14" > "this holiday season"
   - "Donut's $7,500 surgery" > "We need $2,000"
   - Named dog > "our dogs"

5. **Short-medium beats long**
   - 50-150 chars for political
   - 250-500 chars for nonprofit MMS
   - 1000+ chars = death zone

### What's Client-Specific (Don't Transfer)

| Pattern | Works For | Doesn't Work For |
|---------|-----------|-----------------|
| Curiosity gap | NRSC only | RNC, NRCC (r≈0) |
| Celebrity names | SoldierStrong (Dana Perino) | Most others |
| Exclamation marks | HeroBox | Everyone else |
| Founder story | SemperK9 | Political clients |
| Dog voice | SemperK9 | Non-animal orgs |
| ALL CAPS | NRSC (slight +) | RNC, NRCC (negative) |

---

## 9. The Home-Run Reality 🏟️

### Power Law Distribution

| Metric | Top 10% | Top 1% | Bottom 75% |
|--------|---------|--------|------------|
| Revenue Share (NRSC) | 95.1% | 54.6% | <5% |
| Creatives That Scale | 24.1% | 6.7% | 75.9% tested once |

**Implication:** This is a home-run game. Optimize for finding monsters, not incrementally improving average creatives.

### The Expansion Funnel

| Stage | % of Creatives | Revenue | Avg YI |
|-------|----------------|---------|--------|
| Tested (1 poll) | 75.9% | $47K | -0.88 |
| Repeat (2-4 polls) | 11.9% | $104K | 3.56 |
| Scaled (5-9 polls) | 5.5% | $228K | 3.81 |
| Evergreen (10+ polls) | 6.7% | $3.27M | 2.35 |

**Key insight:** The jump from Tested → Repeat has massive YI improvement (from -0.88 to 3.56). First repeat = signal that creative works.

### Underexploited Winners

| Creative | Polls | YI | Why Underexploited |
|----------|-------|----|--------------------|
| Cr-1658SMS (Secret Message) | 15 | 14.42 | Should have 5x more variants |
| Guilt/Shame hooks | 37 | 5.38 | Used 33x less than Trump hooks |

---

## 10. Seasonal Patterns 📅

### Political Calendar

| Period | YI | Notes |
|--------|----|----|
| Off-Year (2023, 2025) | 1.82-1.84 | 50% higher efficiency |
| Election Year (2024) | 1.20 | Volume masks efficiency loss |

### Nonprofit Calendar

| Month | Best Yield | Revenue Driver |
|-------|------------|----------------|
| December | $0.243 | Wreaths + Christmas + Year-End |
| January | $0.910 | New Year motivation (sleeper!) |
| February | $0.599 | Valentine's Day |
| October | $1.364 | Small Client Donor sends |

**Seasonal hooks that work:**
- Wreaths Across America (December)
- Valentine's Day (February)
- Independence Day (July)
- Veterans Day (November)
- Memorial Day (May)

---

## Appendix: Client Quick Reference

### Political Clients
| Client | Best Pattern | Avoid |
|--------|-------------|-------|
| NRSC | Curiosity gap, guilt/shame, Ted Cruz | Generic Trump branding |
| RNC | Personalization, longer openers | Heavy punctuation |
| NRCC | Personalization, longer openers | ALL CAPS |

### Nonprofit Clients
| Client | Best Pattern | Avoid |
|--------|-------------|-------|
| SemperK9 | Founder story, event anchor, $25 | 1000+ char essays |
| HeroBox | Deadline urgency, exclamation marks | Generic mission |
| SoldierStrong | Dana Perino lead, celebrity endorsement | No name drop |
| NCPD | Personal victim stories | Organizational voice |

---

*Creative Genome v1.0 — Extracted from 5,581+ creatives across 7 clients*
*Analysis: Correlation-first, cross-client validated, negative analysis included*
