# LinkedIn document post

**Attach:** ensemble-mcp-carousel.pdf (4 image pages)
**Document title:** More room to delegate: the idea behind Ensemble

## Post

More than 50% lower API costs while building my iOS app. I also found parallel AI helpers got work done faster than solo runs.

That’s my anecdotal project experience. It made me interested in a bigger question: could AI delegation become more valuable as the work grows?

The opportunity is in projects that divide well.

One capable AI sets the direction and reviews the result. Cheaper AI helpers build separate pieces at the same time.

A clear plan can guide a larger batch of work. Independent tasks can move together. And the lead can focus on decisions and review, while helpers handle well-defined implementation.

The benefit can grow when useful work grows faster than coordination and rework.

I built ensemble-mcp to make this possible inside Claude Code:

• The lead defines the shared rules and divides the work.
• Helpers receive focused briefs and assigned files.
• The tool enforces where each helper can write.
• The lead brings the pieces together and checks the result.

I also ran a smaller comparison: three solo builds and three team builds of the same app.

The team averaged 13.9% lower API cost, including the lead. It took 18.1% longer overall. About 88% of the team’s API bill still came from the lead.

That makes coordination the opportunity to investigate: how much good work can each round of planning and review support?

My iOS experience is encouraging. The small comparison shows why task structure matters.

My next step: larger, clearly divided tasks, measuring the whole job—including review and repairs.

What part of your work could you split into independent jobs for an AI team?

#ArtificialIntelligence #FutureOfWork #BuildInPublic

## First comment

Explore ensemble-mcp: https://github.com/VeeraPD/ensemble-mcp

The carousel explains why the benefits could grow on well-divided projects, how Ensemble works, and what I’ve observed so far.

The 50%+ cost reduction and faster completion are my anecdotal iOS project observations. The 13.9% cost reduction and 18.1% longer duration come from a separate small-app comparison, including the AI lead and workers. These are different projects and different kinds of evidence.

## Evidence and publishing notes (not part of the post)

- The iOS API cost saving above 50% is the user's reported project experience. It has not been independently audited in this study; the baseline, scope, period and cost-accounting method were not supplied. Present it as anecdotal, not as a measured result of the six-run study or a general performance claim.


- The concept and its mechanisms lead the story. The studies are early supporting evidence, not a general guarantee of savings, speed or quality.
- Earlier TaskPulse evaluation: four workers using Gemini Flash through a local bridge; sequential 73.1s, parallel 20.4s; 2,301 total worker input tokens, about 575 each. These figures are reported in the existing case study. Original raw execution logs were not located in the reviewed directories. This measured worker execution on a different task, not end-to-end speed against a strong solo model.
- Primary cost study: three Sonnet 4.5 solo runs and three Sonnet-managed DeepSeek Flash runs. Average total API cost $0.245353 solo vs $0.211205 team, including manager cost. Average wall time 103.49s vs 122.24s. Observed 13.9% savings were below the protocol's illustrative 20% threshold for a clear cost advantage.
- Opus 5.5 pilot: one pair, resumed after budget stops. $0.398314 solo vs $0.348508 team; 12.5% lower cost. Interruptions and response-limit changes prevent a clean model or timing comparison.
- Cost accounting includes Claude and DeepSeek usage. Codex orchestration usage was unavailable and excluded.
- All 20 local repository tests passed when rerun, including ownership enforcement, protected files, symlink checks, parsing, configuration and MCP behavior. The end-to-end tests use a local fake API; they are not 20 model trials or a production security audit.
- Independent acceptance audit: all eight implementations passed the same 23 common checks. A further ID-persistence check differentiated Sonnet solo from team, but the contract was ambiguous. Do not claim proven quality superiority from this difference.
- The smaller contexts and parallel architecture are supported design mechanisms. Their overall cost and speed advantage on larger projects remains a hypothesis to evaluate.

- Faster completion on the iOS app is also the user's anecdotal observation; no project timing comparison was supplied. Do not attach the earlier 3.6x worker-speed figure to the iOS app.
- Larger-project savings are a conditional hypothesis: better division of work and lower coordination/rework per unit of output could improve economics. Project size alone does not establish this.
- Sonnet lead share of team API cost: sum of Claude cost divided by sum of total team cost, approximately 87.6%, rounded to 88%. It includes all Claude session usage, not an isolated measure of planning or review labor.
