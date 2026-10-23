# Claims: what the blog can say

| Finding | Evidence type | Source / scope |
|---|---|---|
| More than 50% lower API costs building my iOS app | My reported anecdotal experience | Author observation; no matched billing baseline, period or invoices supplied |
| Parallel work finished faster than solo iOS runs | My reported anecdotal experience | Qualitative observation; no project speed multiplier supplied |
| Greater benefits may be possible on larger well-divided work | Conditional hypothesis | Requires independent tasks, good interfaces and restrained coordination/rework |
| Sonnet team averaged 13.9% lower total API cost | Small measured study | 3 solo + 3 team runs, same small to-do app; lead included |
| Sonnet team averaged 18.1% longer duration | Same study | Whole session plus independent generated-suite check |
| About 88% of Sonnet team API spending came from the lead | Derived metric | Approximately 87.6%, rounded; not an isolated measure of review labor |
| Opus pilot showed 12.5% lower team cost | Interrupted exploratory pilot | One pair, multiple resumptions and response-limit changes |
| Earlier worker execution went from 73.1s to 20.4s, about 3.6x faster | Historical single-trial report | Four-worker TaskPulse experiment, sequential vs parallel; different task/model; raw original logs not located |
| Approximately 575 input tokens per worker | Same historical report | 2,301 input tokens across four workers; no matched context-cost baseline |
| Eight implementations passed 23 common acceptance checks | Post-hoc audit | Suite added after generation; repair cost to that standard was not measured |
| One additional ID-persistence check differed | Interpretation-sensitive audit | Sonnet solo reused IDs after deleting all tasks and reopening; team and Opus kept them increasing. Requirement was ambiguous |

## Key numbers

Sonnet averages: solo **$0.245353**, team **$0.211205**. Cost ranges: solo $0.240327-$0.253891; team $0.194655-$0.236956. Average time: 103.49s solo; 122.24s team. No manual interventions in these six runs.

The observed savings were below the protocol's illustrative 20% threshold. Its decision remains **no clear cost saving at this size**. It is fair to describe the observed direction as encouraging, but not as statistically established superiority.

Opus costs: solo **$0.398314**, team **$0.348508**. Total pilot cost **$0.746822**, within $1. It required one solo continuation and three team continuations. Its active timing excludes pauses, so it is not a clean speed comparison or proof that Opus is a better lead.

## Keep these distinctions visible

The 50%+ claim is personal project experience, not the result of the six-run study. The 3.6x claim is earlier worker-only execution, not iOS delivery speed or the later end-to-end comparison. Larger-project gains are a hypothesis, not an observed scaling law.

Reported cost includes Claude and DeepSeek usage, including caches and reasoning output where recorded. Codex orchestration cost was unavailable and excluded. Price rates describe the study date, not a current pricing recommendation.

The earlier case-study drafts also contained modeled 65%/37%/2% scenarios, a worker-only 93% saving and a simulated 2,500-run benchmark. These are not measured findings to repeat in the blog. They have deliberately not been included as headline evidence.

## Source map

- `02-evidence/sonnet-study-report.md`: main cost study and its procedure.
- `02-evidence/opus-pilot-report.md`: budget pilot and confounds.
- `02-evidence/shared-acceptance-report.md`: common checks and the ambiguous ID edge case.
- `02-evidence/consolidated-study-report.md`: combined narrative before the latest iOS anecdote was added.
- `02-evidence/study-results.csv`: eight final run-level records; continuation segments are not extra runs.
- `02-evidence/source-index.md`: original document locations, historical context and public product link.
