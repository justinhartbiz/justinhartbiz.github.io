# Decision Journal - Usage Examples

## Example 1: Strategic Decision

```
$ decision-journal new

┌─────────────────────┐
│                     │
│  New Decision Entry │
│                     │
└─────────────────────┘

Decision title: Expansion of SemperK9 Wreaths Across America campaign
Domain (DB, TLH, RG, Personal, AI, Other): 
1. DonorBureau
2. TLH
3. Rational Ground
4. Personal
5. AI
6. Other
Enter number: 1
Type of decision: 
1. Strategic
2. Tactical
3. Creative
4. Financial
5. Technical
6. People
7. Process
Enter number: 1
Situation context (what's happening that requires a decision?)
(Type your response, then press Ctrl+D on a new line to finish)
> The SemperK9 Wreaths Across America campaign has been our highest-performing
> creative of the year with a yield of $0.657 per 1,000 sends. Given this success,
> we need to decide whether to expand this campaign approach to more segments, or
> keep it exclusive to maintain its premium feeling.
> 
> Current segments: Top 10% of donors (D10)
> Potential segments: D9, D8, D7, and external acquisition lists
> .done
Options considered (list all alternatives)
(Type your response, then press Ctrl+D on a new line to finish)
> 1. Keep as-is: D10 only (preserve exclusivity)
> 2. Modest expansion: D10 + D9 (maintain quality while increasing reach)
> 3. Full expansion: D10 through D7 (maximize revenue opportunity)
> 4. Aggressive expansion: All segments + external acquisition (maximum reach)
> 5. Targeted expansion: D10-D9 plus targeted external lists with military/veteran affinity
> .done
Decision made (what you're actually doing)
(Type your response, then press Ctrl+D on a new line to finish)
> Option 2: Modest expansion to D10 + D9 only.
> 
> We will extend the Wreaths Across America campaign to the D9 segment, but maintain exclusivity by not going beyond that. The message will be slightly modified for D9 to acknowledge their support level appropriately.
> .done
Reasoning (why this choice over others)
(Type your response, then press Ctrl+D on a new line to finish)
> Primary factors:
> 
> 1. Previous D8-D7 tests of premium campaigns showed sharp falloff in yield (typically 70-80% reduction)
> 2. External lists have consistently failed with this type of emotional/patriotic campaign
> 3. D9 historically performs at 60-65% of D10 yield, which would still make this profitable
> 4. Maintaining exclusivity for higher segments has shown to increase long-term value
> 5. If we get positive results from D9, we can always expand further later
> 
> The modest expansion balances revenue opportunity against diluting the campaign's effectiveness.
> .done
Key assumptions (what must be true for this to work)
(Type your response, then press Ctrl+D on a new line to finish)
> 1. D9 segment will maintain at least 50% of the yield rate seen in D10 ($0.328+ per 1K)
> 2. Expanding to D9 won't cannibalize D10 performance through loss of exclusivity
> 3. The creative approach will resonate similarly with slightly lower-value donors
> 4. We have sufficient capacity to fulfill additional wreaths if donation volume increases
> 5. The Wreaths Across America partnership can scale to accommodate more volume
> .done
Risks and mitigations
(Type your response, then press Ctrl+D on a new line to finish)
> Risks:
> 
> 1. D9 performance falls below profitability threshold
>    - Mitigation: Start with small test segment (20%) before full D9 rollout
> 
> 2. Increased volume causes fulfillment issues
>    - Mitigation: Coordinate with SemperK9 operations team in advance
> 
> 3. Campaign performance decreases across all segments
>    - Mitigation: Implement tracking to isolate segment performance
> 
> 4. Donor fatigue if campaign is overused
>    - Mitigation: Plan reduced frequency for 2027 campaign season
> .done
How will you know if this worked? (measurable outcomes)
(Type your response, then press Ctrl+D on a new line to finish)
> Success metrics:
> 
> 1. D9 yield exceeds $0.328 per 1K sends (50% of D10 performance)
> 2. D10 maintains at least 90% of original yield rate
> 3. Combined revenue increases by at least 30% over D10-only approach
> 4. Unsubscribe rate remains below 0.5%
> 5. Donor complaints remain at normal levels
> 
> We'll evaluate these metrics 7 days after campaign completion.
> .done
When to review this decision (YYYY-MM-DD) (default: 2026-05-15)
2026-03-01
Who's affected by this decision?
(Type your response, then press Ctrl+D on a new line to finish)
> - SemperK9 leadership team
> - Wreaths Across America coordinators
> - Donor segments D10 and D9
> - DonorBureau creative and operations teams
> - Campaign analysts
> .done
Your emotional state while making this decision (1-10)
7
Confidence level (1-10)
8
Additional notes or context
(Type your response, then press Ctrl+D on a new line to finish)
> This decision follows our "test and expand" framework, where we start with high-value segments and carefully expand when we have proven performance.
> 
> The Wreaths campaign has historic significance as our best performer of 2025, so we're being more conservative than we might with a typical campaign.
> 
> Chris Baity (SemperK9 founder) is personally invested in this campaign's success, which adds both opportunity and risk.
> .done

Decision "Expansion of SemperK9 Wreaths Across America campaign" saved successfully!
ID: 3f7a9b12
```

## Example 2: Reviewing Decision Stats

```
$ decision-journal stats

┌────────────────────────────┐
│                            │
│  Decision Journal Statistics │
│                            │
└────────────────────────────┘
┌─────────────────┬───────────┐
│ Total Entries   │ 17        │
├─────────────────┼───────────┤
│ Due for Review  │ 2         │
├─────────────────┼───────────┤
│ Avg. Confidence │ 7.2       │
├─────────────────┼───────────┤
│ Avg. Emotional  │ 6.8       │
│ State           │           │
└─────────────────┴───────────┘

Decisions by Domain
┌────────────────────┬──────────┬──────────┐
│ Domain             │ Count    │ %        │
├────────────────────┼──────────┼──────────┤
│ DonorBureau        │ 7        │ 41.2%    │
├────────────────────┼──────────┼──────────┤
│ TLH                │ 5        │ 29.4%    │
├────────────────────┼──────────┼──────────┤
│ Rational Ground    │ 2        │ 11.8%    │
├────────────────────┼──────────┼──────────┤
│ Personal           │ 2        │ 11.8%    │
├────────────────────┼──────────┼──────────┤
│ AI                 │ 1        │ 5.9%     │
└────────────────────┴──────────┴──────────┘

Decisions by Type
┌────────────────────┬──────────┬──────────┐
│ Type               │ Count    │ %        │
├────────────────────┼──────────┼──────────┤
│ Strategic          │ 6        │ 35.3%    │
├────────────────────┼──────────┼──────────┤
│ Tactical           │ 5        │ 29.4%    │
├────────────────────┼──────────┼──────────┤
│ Creative           │ 4        │ 23.5%    │
├────────────────────┼──────────┼──────────┤
│ Financial          │ 1        │ 5.9%     │
├────────────────────┼──────────┼──────────┤
│ Technical          │ 1        │ 5.9%     │
└────────────────────┴──────────┴──────────┘

Decisions by Confidence
┌────────────────────┬──────────┬──────────┐
│ Level              │ Count    │ %        │
├────────────────────┼──────────┼──────────┤
│ Low (1-3)          │ 1        │ 5.9%     │
├────────────────────┼──────────┼──────────┤
│ Medium (4-7)       │ 8        │ 47.1%    │
├────────────────────┼──────────┼──────────┤
│ High (8-10)        │ 8        │ 47.1%    │
└────────────────────┴──────────┴──────────┘

Decision Trend by Month
┌────────────────────┬──────────┐
│ Month              │ Count    │
├────────────────────┼──────────┤
│ 2026-01            │ 5        │
├────────────────────┼──────────┤
│ 2026-02            │ 12       │
└────────────────────┴──────────┘
```

## Example 3: Decisions Due for Review

```
$ decision-journal review

┌───────────────────────────────┐
│                               │
│  Decisions Due for Review (2)  │
│                               │
└───────────────────────────────┘
┌────────┬────────────────────────────┬────────────┬────────────┬────────────┬────────────┐
│ ID     │ Title                      │ Domain     │ Type       │ Review Date│ Days Overdue│
├────────┼────────────────────────────┼────────────┼────────────┼────────────┼────────────┤
│ 4b72f9 │ TLH Lead Response Time SLA │ TLH        │ Process    │ 2026-02-10 │ 5          │
├────────┼────────────────────────────┼────────────┼────────────┼────────────┼────────────┤
│ 1a8e7f │ RG Content Calendar        │ Rational G │ Tactical   │ 2026-02-01 │ 14         │
└────────┴────────────────────────────┴────────────┴────────────┴────────────┴────────────┘

Use "view [ID]" to see details and review an entry
```

## Example 4: Viewing Decisions by Domain

```
$ decision-journal domains

┌─────────────────────┐
│                     │
│  Decision Domains   │
│                     │
└─────────────────────┘

=== DonorBureau (7 decisions) ===
┌────────┬────────────────────────────────────────┬────────────┬────────────┐
│ ID     │ Title                                  │ Created    │ Confidence │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 3f7a9b │ Expansion of SemperK9 Wreaths Across A │ 2026-02-15 │ 8          │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 8c1d5e │ NCPD D9 Campaign Expansion             │ 2026-02-12 │ 9          │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 6b4a7d │ Switch to MMS for SoldierStrong        │ 2026-02-05 │ 7          │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 2e9f3c │ Donor Segment Rebalancing              │ 2026-02-01 │ 6          │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 5a2b8c │ Test New Creative Format               │ 2026-01-28 │ 4          │
└────────┴────────────────────────────────────────┴────────────┴────────────┘
... and 2 more

=== TLH (5 decisions) ===
┌────────┬────────────────────────────────────────┬────────────┬────────────┐
│ ID     │ Title                                  │ Created    │ Confidence │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 9d2e4f │ RingCentral Queue Configuration        │ 2026-02-14 │ 9          │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 4b72f9 │ TLH Lead Response Time SLA             │ 2026-02-10 │ 8          │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 7a3b9c │ OC Lead Source Reallocation            │ 2026-02-03 │ 5          │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 1c5e8f │ Extend Business Hours to 8am           │ 2026-01-25 │ 7          │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 3g7h2j │ Salesforce Lead Assignment Rules       │ 2026-01-18 │ 8          │
└────────┴────────────────────────────────────────┴────────────┴────────────┘

=== Rational Ground (2 decisions) ===
┌────────┬────────────────────────────────────────┬────────────┬────────────┐
│ ID     │ Title                                  │ Created    │ Confidence │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 1a8e7f │ RG Content Calendar                    │ 2026-02-01 │ 6          │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 0f4e7d │ Screwtape Launch Timeline              │ 2026-01-15 │ 8          │
└────────┴────────────────────────────────────────┴────────────┴────────────┘

=== Personal (2 decisions) ===
┌────────┬────────────────────────────────────────┬────────────┬────────────┐
│ ID     │ Title                                  │ Created    │ Confidence │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 2c5f9a │ INBOUND 2026 Submission Topics         │ 2026-02-12 │ 7          │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 8e2d6f │ MacBook Purchase Timing                │ 2026-01-30 │ 9          │
└────────┴────────────────────────────────────────┴────────────┴────────────┘

=== AI (1 decisions) ===
┌────────┬────────────────────────────────────────┬────────────┬────────────┐
│ ID     │ Title                                  │ Created    │ Confidence │
├────────┼────────────────────────────────────────┼────────────┼────────────┤
│ 7b3e2a │ Model Selection Framework              │ 2026-02-08 │ 8          │
└────────┴────────────────────────────────────────┴────────────┴────────────┘
```