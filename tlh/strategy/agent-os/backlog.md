# TLH Agent OS — Implementation Backlog (Ticket-Ready)

## P0 — Reliability + Measurement (Weeks 1-2)

### TICKET-001: Inside Sales Answer Rate Baseline
- **Owner:** Concierge + StackOps
- **Definition of Done:** Daily answer-rate dashboard by queue + line-level filter
- **Acceptance:** 14 consecutive days captured; baseline published
- **Dependencies:** RingCentral/smrtPhone reporting access

### TICKET-002: Circuit Breaker Policy Automation
- **Owner:** Ledger
- **Definition of Done:** Alert + paid-spend pause recommendation when 7-day rolling answer rate breaches threshold
- **Acceptance:** Test alert fired in sandbox and logged
- **Dependencies:** TICKET-001

### TICKET-003: CRM Flow Audit Kickoff
- **Owner:** Grace
- **Definition of Done:** Full inventory of active flows with active/inactive labels
- **Acceptance:** Flow map published and signed off
- **Dependencies:** Salesforce admin access

### TICKET-004: Core Conversion Fields in Salesforce
- **Owner:** Grace
- **Definition of Done:** Fields added for Two-Checks delivered, handoff status, partner VIP flag, referral source
- **Acceptance:** Visible on lead/opportunity layouts + reportable

## P1 — Acquisition Engine (Weeks 3-6)

### TICKET-005: Beacon Probate Unlock
- **Owner:** Beacon
- **Definition of Done:** Probate source integrated into lead-hunting workflow
- **Acceptance:** 20+ probate leads surfaced in first 2 weeks

### TICKET-006: Scout Partner Sprint (Top 20)
- **Owner:** Scout
- **Definition of Done:** Top 20 partner targets loaded + outreach sequences launched
- **Acceptance:** 10+ meetings booked

### TICKET-007: Alumni Engine Launch
- **Owner:** Piper
- **Definition of Done:** 3-part sequence live to past-client segment
- **Acceptance:** First 1000 sends complete + referral tracking active

### TICKET-008: Direct Mail Matchback Framework
- **Owner:** Postman + Ledger
- **Definition of Done:** Mail campaign IDs mapped to consults/opps
- **Acceptance:** Matchback report generated for first campaign

## P2 — Conversion System (Weeks 6-10)

### TICKET-009: Inside Sales Script Engine
- **Owner:** Echo
- **Definition of Done:** Script library + objection matrix + QA rubric
- **Acceptance:** 10 call reviews scored with rubric

### TICKET-010: Outside Sales Conversion Playbook
- **Owner:** Ranger
- **Definition of Done:** Consult framework + Two-Checks protocol script + follow-up templates
- **Acceptance:** Adopted by closers and logged in CRM

### TICKET-011: Inside→Outside Handoff SLA
- **Owner:** Bridge
- **Definition of Done:** Automated handoff timer + breach alerts
- **Acceptance:** Handoff breach rate dashboard live

### TICKET-012: Website Chatbot Qualification Flow
- **Owner:** Pulse
- **Definition of Done:** Chatbot asks qualifying questions, routes hot leads to booking
- **Acceptance:** First 20 qualified bot leads tracked

## P3 — Brand, Distribution, Authority (Weeks 8-12)

### TICKET-013: Content Operating Cadence
- **Owner:** Penny
- **Definition of Done:** 6-week calendar + publish SOP
- **Acceptance:** 2-3 weekly publishes sustained for 4 weeks

### TICKET-014: Social Distribution Engine
- **Owner:** Lark
- **Definition of Done:** SocialPilot queue with campaign tagging
- **Acceptance:** Weekly channel report with assisted leads

### TICKET-015: Local SEO/GBP Flywheel
- **Owner:** Harbor
- **Definition of Done:** GBP posting SOP + review response SOP + local page backlog
- **Acceptance:** 30-day uplift in GBP actions

### TICKET-016: PR/Media Pipeline
- **Owner:** Herald
- **Definition of Done:** Media target list + pitch templates + monthly outreach plan
- **Acceptance:** First 3 placements secured or in negotiation

## P4 — Hardening

### TICKET-017: Toolchain Uptime Monitor
- **Owner:** StackOps
- **Definition of Done:** Health checks for SF/CallRail/RC/GA/Ads/GBP/SocialPilot
- **Acceptance:** Daily status digest auto-sent

### TICKET-018: Compliance Guardrails
- **Owner:** Sentinel
- **Definition of Done:** Channel/script compliance checklist before launch
- **Acceptance:** Checklist used in 100% of new campaigns

### TICKET-019: Data Integrity QA
- **Owner:** Forge
- **Definition of Done:** Weekly duplicate + source-completeness scan
- **Acceptance:** Monthly QA scorecard published

---

## Weekly Operating Meeting Template
1. KPI deltas (Ledger)
2. Pipeline + handoff health (Grace/Bridge)
3. Channel performance (Atlas/Harbor/Lark/Postman)
4. Partner/referral status (Scout/Piper)
5. Risks/blockers + decisions (Maestro)

