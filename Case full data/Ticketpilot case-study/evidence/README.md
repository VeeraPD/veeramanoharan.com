# Evidence ledger and source index

Use this page to audit claims while writing. The source snapshots were collected from the project, not newly obtained customer research. `verified-facts.json` is generated from the copied process, evaluation and business-case JSON and cross-checks the case counts and arithmetic.

| Claim / artifact | Status | Source | Limit |
| --- | --- | --- | --- |
| 7,554 cases / 65,533 events / 9,454 team changes | Observed, historical | [Process aggregate](process-summary.json) | Public BPI 2013 log; not Northstar or current Volvo performance |
| 15.58% A-B-A / 16.65% any prior-team revisit | Observed, historical | [Process aggregate](process-summary.json) | Does not establish cause or avoidability |
| Mean 64.89-hour pre-transfer interval | Observed elapsed time | [Provenance and definitions](process-data-provenance.md) | Work plus waiting, not active effort or recoverable labor |
| Keyword 45/50 vs lexical 5/50 first-time-right | Offline synthetic | [Per-case evaluation](evaluation-lexical.json) | Repeated authored templates; not independent customer evidence |
| Recommendation 44/50; review 45/50; 0 wrong among 5 non-abstained | Offline synthetic | [Per-case evaluation](evaluation-lexical.json) | Recommendations include abstentions; tiny confident sample |
| 500 historical tickets, 50 test tickets, 30 help articles | Authored synthetic inputs | [History](synthetic-history.csv), [test](synthetic-test.csv), [articles](synthetic-articles.csv) | Not Claude-generated private customer data |
| About 710 net capacity hours, $25,332 annual net value, 5.7-month payback | Conditional scenario | [Model snapshot](business-case.json), [sensitivity scenarios](value-sensitivities.json) | Assumed effort, volume, reduction, review and costs; not earned by current router |
| 60-second trailer; 222.67-second full film | Media output | [Trailer QA](trailer-media-qa.json), [walkthrough QA](walkthrough-media-qa.json) | Runtime is edited, not resolution speed |
| Playback, captions and audio checked | Media QA | Media QA and [capture warnings](capture-warnings.json) | Not a full production/security audit; recoverable hydration warnings recorded |
| Direct feedback informed UX and film changes | Project feedback | [Experience evolution](../08-experience-and-demo-evolution.md) | Not a completed formal customer usability study |
| NSM, live adoption, handoff reduction, fix usefulness | Proposed / unmeasured | [Metric contract](../04-nsm-and-metrics.md) | No production baseline, telemetry pipeline or intervention result |

## Dataset separation and lineage

The BPI log is used to analyze ownership sequences. The synthetic corpus tests description-to-team routing and sourced fixes. They are not joined. Fictional Northstar statistics are a third, illustrative layer. The value model uses one observed historical rate plus explicit assumptions, not a treatment effect from either dataset.

The raw public XES file is deliberately not included. [Source provenance](process-data-provenance.md) records DOI, publisher checksum, mirror and source terms. The repository fetch script and process code support reproduction. Aggregates and synthetic text are included here; no claim is made that source dataset terms are the same as the code's terms.

`original-catalogue.json` contains the publisher metadata saved earlier in the project. External primary-source URLs in these materials are retained citations, not a claim of re-verification during packaging.

## Evidence status vocabulary

- **Observed:** directly calculated from the identified source under stated definitions.
- **Offline synthetic:** measured engineering behavior on authored examples.
- **Demonstrated:** a local workflow or artifact works under the recorded conditions.
- **Illustrative/sample:** a UI scenario, persona or organization supplied to explain behavior.
- **Conditional scenario:** arithmetic based on explicit unvalidated assumptions.
- **Proposed/unmeasured:** research, targets, rollout or outcomes not yet performed or established.

There is no evidence of paying customers, customer adoption, realized savings, a public deployment, Celonis platform implementation or a live enterprise connector in this pack.
