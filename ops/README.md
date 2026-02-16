# Leverage Analytics Suite

A comprehensive analytics dashboard that unifies metrics across all domains (DonorBureau, TLH, Content, Personal) to identify high-ROI opportunities and optimize performance.

## Purpose

The Leverage Analytics Suite provides a holistic view of all operations and surfaces the highest-impact opportunities for improvement. It answers the critical question: "Where should I focus my time for maximum leverage?"

## Key Features

- **Cross-Domain Intelligence**: Combines metrics from DonorBureau, TLH, Rational Ground, and operations into a unified view
- **Opportunity Prioritization**: Ranks action items by potential impact and implementation effort
- **Value Attribution**: Tracks time allocation, value creation, and ROI across domains and activities
- **AI System Analysis**: Monitors model performance, token usage, and optimization opportunities
- **Baker's Dozen Tracker**: Tracks the status and performance of all Baker's Dozen builds

## Data Sources

- DonorBureau API (campaign performance, creative analytics)
- Salesforce (TLH leads, opportunities, conversion metrics)
- RingCentral API (call analytics, queue performance)
- Substack (subscriber metrics, revenue trends)
- API Usage Monitoring (token consumption, cost tracking)

## Key Insights

### Highest Impact Opportunities

1. **RingCentral Answer Rate**: 52.2% of inbound calls go to voicemail or are missed (~$75K/yr impact)
2. **TLH Response Time SLA**: Implement 60-min SLA for first contact response (~$52K/yr impact)
3. **Substack Revenue Crash**: Revenue down from $6.5K (Oct) → $420 (Feb) (~$40K/yr impact)
4. **DonorBureau Creative Genome Implementation**: Apply DNA findings to all campaigns (~$38K/yr impact)
5. **API Right-Sizing**: Implement model right-sizing to save $87.40/month (~$1K/yr impact)

### Domain Performance

- **DonorBureau**: 30.6 hours, $8,420 value, 27.5x ROI
- **TLH**: 26.8 hours, $7,950 value, 29.7x ROI
- **Rational Ground**: 11.5 hours, $2,310 value, 20.1x ROI
- **Operations**: 7.6 hours, $1,170 value, 15.4x ROI

### AI System Performance

- Total token usage up 41.5% in February vs. January
- MiniMax M2.5 most cost-effective at $0.59/hr vs. Claude Opus at $5.32/hr
- Potential monthly savings of $86.60 through model right-sizing

## Next Steps

1. Implement automation phase - convert dashboards to automated data pipelines
2. Build API integrations for real-time data
3. Develop notification system for metric threshold alerts
4. Create cross-dashboard connectors for deeper insights

## Usage

Open `index.html` in any modern web browser. The dashboard is fully self-contained with no external dependencies.

---

Built by Railstote 🦉 | February 15, 2026