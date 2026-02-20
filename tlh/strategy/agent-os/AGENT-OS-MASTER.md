# TLH Agent OS — Master Structure, Workflows, and Accountability

_Last updated: 2026-02-19_

## 1) Agent Structure

## Command & Governance
- **Maestro** — **Owner:** Paul  
  **Mission:** Set priorities, sequence initiatives, run weekly operating cadence.  
  **Core systems:** Cron, Telegram, executive dashboard.

- **Ledger** — **Owners:** Justin, Peter, Brett  
  **Mission:** Own CAC truth, attribution truth, and budget controls.  
  **Core systems:** Google Ads API, GA4, CallRail, RingCentral, Clarity, Salesforce.

## Brand & Demand
- **Penny** — **Owner:** Brett  
  **Mission:** Content engine for SEO, nurture, and authority.
- **Lark** — **Owner:** Debbie  
  **Mission:** Listings/social distribution and review velocity.
- **Atlas** — **Owner:** Jason  
  **Mission:** Paid digital execution and CPQL optimization.
- **Harbor** — **Owners:** Debbie, Brett  
  **Mission:** Local SEO + GBP flywheel.
- **Herald** — **Owners:** Justin, Tanya  
  **Mission:** Thought leadership + earned media.

## Acquisition Inputs
- **Beacon** — **Owner:** Justin  
  **Mission:** Hunt obit/probate/property-intent leads.
- **Scout** — **Owner:** BD owner  
  **Mission:** Partner/referral hunting (attorneys, fiduciaries, facilities).
- **Postman** — **Owner:** Ops  
  **Mission:** Direct mail execution + matchback.
- **Piper** — **Owners:** Justin, Jonathan, James  
  **Mission:** Nurture + alumni/referral conversion.

## Conversion & Ops
- **Grace** — **Owners:** Justin, Tran  
  **Mission:** CRM intelligence, routing quality, stale-lead recovery.
- **Echo** — **Owners:** Justin, Jonathan, James  
  **Mission:** ISR quality + set-rate improvement loop.
- **Ranger** — **Owners:** Tanya, Jaelynn, Jonathan  
  **Mission:** In-home conversion + Two Checks discipline.
- **Bridge** — **Owners:** Justin, Jonathan, Tanya, Jaelynn  
  **Mission:** Prevent handoff drops and SLA breaches.
- **Concierge** — **Owner:** Justin  
  **Mission:** Improve inbound answer and booking reliability.
- **Pulse** — **Owners:** Justin, Brett  
  **Mission:** Chatbot qualification to booked consults.
- **StackOps** — **Owners:** Justin, Tran  
  **Mission:** Integration reliability + observability.

---

## 2) Channel Coverage (Who Covers What)

- **Obituary hunting:** Beacon (support: Scout, Grace)
- **Probate/trust/high-equity hunting:** Beacon (support: Scout, Grace)
- **Partner hunting:** Scout (support: Maestro, Ranger)
- **Earned media/podcasts/PR:** Herald (support: Penny, Lark)
- **Google Search paid:** Atlas (support: Ledger, Concierge)
- **Retargeting:** Atlas (support: Ledger)
- **Paid social:** Atlas (support: Ledger, Penny)
- **Radio/OTT:** Atlas (support: Ledger, Herald)
- **Direct mail:** Postman (support: Beacon, Ledger, Grace)
- **SEO/GBP/content:** Penny + Harbor (support: Lark, Ledger)
- **Website/CRO:** Ledger (support: Pulse, Atlas)
- **Email nurture:** Piper (support: Grace, Penny)
- **Alumni/referrals:** Piper (support: Maestro, Ledger)
- **Listings/social distribution:** Lark (support: Penny, Piper)
- **Inbound phone conversion:** Concierge (support: Echo, Grace)

---

## 3) Core Workflows (High-Level)

1. **Obit Lead-to-Mail**  
   Beacon hunt → Grace verify/suppress → Postman send (Lob) → Ledger matchback.

2. **Partner Referral Sprint**  
   Scout target list → outreach cadence → meeting booked → Bridge handoff → Ranger consult.

3. **Paid Search Control Loop**  
   Atlas optimize → Concierge answer-rate gate → Ledger budget/campaign decisions.

4. **Nurture + Alumni Conversion**  
   Piper sequence → Grace list hygiene → Ledger conversion reporting.

5. **Inbound-to-Consult Conversion**  
   Concierge inbound routing/callbacks → Echo script QA → Bridge SLA handoff → Ranger consult.

6. **Thought Leadership Engine**  
   Penny content assets → Herald podcast/PR pitching → Lark distribution.

7. **Integration Health**  
   StackOps daily connector health checks + incident alerts.

---

## 4) Accountability (What Each Role Is Accountable For)

## Command
- **Maestro (Paul):** Weekly priorities published; blocker list closed.
- **Ledger (Justin/Peter/Brett):** Daily scorecard accuracy; weekly budget move recommendations.

## Brand & Demand
- **Atlas:** Paid channel quality (CPQL/CAC thresholds).
- **Penny/Harbor/Lark:** Weekly output cadence (content, GBP, distribution).
- **Herald:** Weekly thought leadership/podcast/PR cadence.

## Acquisition Inputs
- **Beacon:** Qualified hunted lead volume + quality threshold.
- **Scout:** Partner meetings + referral pipeline growth.
- **Postman:** Verified sends + matchback tracking.
- **Piper:** Nurture/referral conversion consistency.

## Conversion & Ops
- **Grace:** Routing accuracy + stale-lead recovery performance.
- **Echo/Concierge:** Answer-rate and set-rate improvement.
- **Bridge/Ranger:** Handoff SLA compliance + consult conversion quality.
- **StackOps:** Daily integration uptime and incident response timeliness.

---

## 5) Operating Cadence

- **Daily:** Hunt queue health, paid guardrails, answer-rate, stale-lead alerts, integration health.
- **Weekly:** Priority review, partner sprint review, channel performance review, workflow blockers.
- **Monthly:** Channel mix reset, thought-leadership performance, referral engine audit.

---

## 6) Current Gaps to Close First

1. Retargeting + paid social workflows not fully operationalized.
2. Earned media cadence not fully live.
3. Direct mail verification/matchback rigor needs hardening.
4. ISR coaching and handoff SLA tooling needs consistency.
5. Integration monitoring should be unified under StackOps dashboard.
