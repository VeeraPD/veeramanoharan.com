# TicketPilot: case-study source pack

Prepared 23 October 2026. This folder is the working material for writing the portfolio case study, rather than a claim that a customer pilot has happened. It brings together the PM approach, decisions, metrics, evidence, executive documents and current videos.

**Working story:** I investigated ownership friction in a real incident log, built an inspectable routing and fix-assistance prototype, retained a failed offline evaluation, redesigned the experience after comprehension feedback, and proposed a gated investment decision.

**Current recommendation:** HOLD deployment of the lexical router; continue bounded discovery and validation. A convincing demonstration does not overturn a failed quality gate.

## Read in this order

| File | Use it to write |
| --- | --- |
| [Product brief](01-product-brief.md) | Problem, audience, personas, value proposition and scope |
| [Full PM process](02-pm-process.md) | Discovery through evaluation, with work completed and work still proposed |
| [Decision log](03-key-decisions.md) | Alternatives, reasoning, tradeoffs and consequences |
| [NSM and metric system](04-nsm-and-metrics.md) | North Star definition, supporting metrics, instrumentation and gaming risks |
| [Research and validation](05-research-and-validation.md) | Hypotheses, research plan, usability tests and next experiments |
| [AI and implementation](06-ai-and-implementation.md) | What the product actually does, evaluation results and production gaps |
| [Value case and rollout](07-value-case-and-rollout.md) | Economics, sensitivity, funding gates and a 90-day proposal |
| [Experience and demo evolution](08-experience-and-demo-evolution.md) | Feedback, tutorial design, persona clarity and video decisions |
| [Writing brief](09-case-study-writing-brief.md) | Case-study outline, defensible claims, interview prompts and unfinished work |
| [Evidence index](evidence/README.md) | Source files, definitions, claim status and provenance |
| [Executive pack](executive/README.md) | CFO one-pager, rollout and steering scorecard PDFs |
| [Media library](media/README.md) | Trailer, full walkthrough, transcripts, screenshots and earlier cuts |

## Start with the product

- [Watch the 60-second trailer](media/watch-trailer.html).
- [Watch the full 3:43 walkthrough](media/watch-demo.html).
- [Download the trailer](media/ticketpilot-trailer-60s.mp4) or [full walkthrough](media/ticketpilot-product-demo.mp4).

TicketPilot classifies the issue and proposes a team. Daniel, the support engineer, reviews evidence and approves or overrides routing. Maya is the sales employee seeking help; Elena is the IT service manager reviewing service health. Fix execution and enterprise connections are simulated.

## Keep these evidence types separate

| Evidence type | What exists | What can be claimed |
| --- | --- | --- |
| Observed process analysis | 7,554 public incidents, 9,454 team changes, 15.6% direct A-B-A bounces | Historical ownership patterns exist; avoidability and causality are unproven |
| Offline engineering evaluation | 50 authored synthetic test descriptions; lexical first-time-right 10% vs keyword 90% | This implementation failed the frozen comparison |
| Working demonstration | Integrated React frontend and Python service; role-based browser workflow; recorded footage | The prototype demonstrates the intended interaction and evidence flow |
| User feedback | Direct project feedback about comprehension, pacing, personas and classification | These issues informed design changes; no formal usability uplift measured |
| Conditional value model | About 710 net capacity hours/year and $25,332 annual net value under assumptions | A scenario to validate, not realized savings or a current-router forecast |
| Proposed research/pilot | Interviews, representative real-text evaluation, controlled pilot, adoption and NSM telemetry | A next-step plan, not completed customer validation |

This was an individual portfolio project supported by AI development tools. Do not turn proposed interviews into completed research, fictional Northstar into a customer, or the target Celonis role into an affiliation. The original brief's one-day build is a planning constraint, not a verified record of total effort.

## Folder maintenance

The copied evidence and videos are a dated snapshot. `scripts/package_case_study.py` refreshes copied assets, transcripts and the file/hash inventory; the narrative files are edited deliberately. Read [the source index](evidence/README.md) before refreshing facts. The runnable application remains in the repository root.

`pack-manifest.json` lists packaged sources and hashes. `validation-report.json` records local-link and asset checks. The folder includes no raw public XES log, runtime, credentials, dependency folders or personal browser data. Earlier video cuts are reference material; use the current videos for visitors.
