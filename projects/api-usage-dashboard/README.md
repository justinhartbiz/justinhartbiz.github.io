# API Usage & Cost Monitor Dashboard

## Overview

A comprehensive dashboard to track API usage, costs, and optimization opportunities across multiple AI providers (Claude, GPT, Gemini, MiniMax). The dashboard provides deep visibility into spending patterns, usage distribution, and ROI analysis for AI investments.

## Key Features

- **Provider Cost Breakdown**: Track spending across Anthropic (Claude), OpenAI (GPT), Google (Gemini), and MiniMax
- **Token Usage Analysis**: Monitor input and output token consumption with historical trends
- **Project-Level ROI Tracking**: See which AI-powered projects deliver the highest return on investment
- **Model Efficiency Comparison**: Compare $/1K tokens costs across different models to identify optimization opportunities
- **Cost Optimization Recommendations**: Actionable insights to reduce API costs without sacrificing capabilities
- **Daily Budget Tracking**: Track spending against daily and monthly budgets with visual alerts for overages

## Current Stats (as of Feb 15, 2026)

- **Total Monthly Spend**: $231.67 (50.6% of monthly budget)
- **Total Tokens**: 12.86M (9.37M input, 3.49M output)
- **API Calls**: 6,542 (5,281 completion, 1,261 function)
- **Provider Breakdown**:
  - Claude: $169.48 (73.2%)
  - GPT: $42.57 (18.4%)
  - Gemini: $12.94 (5.6%)
  - MiniMax: $6.68 (2.9%)
- **Potential Monthly Savings**: $176.92

## Key Insights

1. **Autonomous Builds are Token-Heavy**: Each autonomous build consumes ~42K tokens, primarily on Claude Opus
2. **MiniMax Value Proposition**: MiniMax M2.5 delivers comparable results at 1/3 the cost of Claude Opus for routine tasks
3. **Right-Sizing Opportunity**: 62% of Claude Opus usage could be downgraded to Sonnet or MiniMax for substantial savings
4. **Usage Pattern Change**: Token usage jumped 41.5% in February (vs. January) driven by dashboard creation and What If Machine
5. **Project ROI Varies**: Baker's Dozen dashboards cost $112.34 but created ~$3,750 in value (33.4x ROI)

## Optimization Recommendations

1. **Model Right-Sizing**: Use Claude Opus only for strategic creative projects. Switch routine tasks to Sonnet/MiniMax.
   - *Estimated savings: $87.40/month*

2. **Autonomous Build Optimization**: Each autonomous build averages 42.1K tokens. Reduce by using cached data and structured outputs.
   - *Estimated savings: $45.92/month*

3. **Context Optimization**: Reduce token waste by trimming context on What If Machine and TLH Lead Analysis.
   - *Estimated savings: $28.70/month*

4. **Move Routine Tasks to Local Models**: Use ollama/qwen2.5:7b for file management, document generation, and code formatting.
   - *Estimated savings: $14.90/month*

## Implementation Details

- **Single-File HTML Application**: Self-contained dashboard with embedded JavaScript and CSS
- **Chart.js Visualizations**: Interactive charts for usage, cost, and budget tracking
- **Responsive Design**: Works on desktop and mobile devices
- **No External Dependencies**: All data is embedded in the HTML file for privacy and security

## Future Enhancements

- **Live Data Integration**: Connect to provider APIs for real-time usage data
- **Automated Budget Alerts**: Set up Telegram notifications for budget thresholds
- **Token Waste Detection**: Analyze API calls to identify and eliminate redundant requests
- **Bulk Insights**: Compare token efficiency across similar tasks to establish benchmarks
- **Predictive Spending**: Use historical patterns to forecast monthly costs

## Usage

1. Open `index.html` in any modern web browser
2. Navigate through tabs to explore different aspects of API usage
3. Review optimization recommendations and their potential savings

---

*Built by Railstote | Last updated: February 15, 2026*