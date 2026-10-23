# Opus 5.5 budget pilot — 23 October 2026

Installed Claude Code upgraded globally from 1.0.120 to 2.1.280. Two distinct Opus 5.5 sessions only: solo (A) and manager plus DeepSeek Flash workers (B). Both sessions were resumed after conservative spending guards interrupted them. No additional fresh benchmark runs were started.

| Arm | Claude cost USD | Worker cost USD | Total USD | Active wall seconds | Tests | Resume interventions |
|---|---:|---:|---:|---:|---|---:|
| A | 0.398314 | 0.000000 | 0.398314 | 63.71 | 11 passed | 1 |
| B | 0.335130 | 0.013378 | 0.348508 | 72.47 | 24 passed | 3 |

Recorded total API spending: **$0.746822**, below the user’s $1 limit. Team cost was **12.5% lower** than solo in this pilot.

Both sessions ended successfully. Independent verification used `python3 -m unittest discover -s tests -t .`. Test coverage differs between the generated suites.

This is not the full COST_PROTOCOL.md experiment: there is one observation per arm rather than three. The observed saving is below its illustrative 20% threshold, and there is no within-arm variance estimate. It does not establish Opus as a better manager than Sonnet 4.5.

## Budget and execution details

- The first attempted Opus request using Claude Code 1.0.120 was rejected as unsupported, with no billed usage; its separate artifacts are in `../opus-pilot-20261023T034524Z/`.
- A compatible temporary 2.1.280 CLI started the two pilot sessions, then the global CLI was upgraded to the same version at the user’s request. Global upgrade verified with `claude --version`.
- A local proxy forwarded standard Anthropic and DeepSeek message requests and preserved usage counters. It checked cost before each billable request: exact Anthropic prompt token count plus worst-case cache-write and capped output cost; a conservative UTF-8-based prompt bound plus maximum output for Flash. Simultaneous reservations were counted. Token-count requests are not billed.
- Claude responses were limited to 4,096 tokens initially. The conservative original $0.49-per-arm reservation rule stopped both arms before tests passed. Solo also encountered a shell-tool permission denial. These were execution constraints, not evidence that the app could not be implemented.
- Both existing sessions were resumed with a shared total guard that included all prior spending. Bash was authorized for the benchmark, allowing shell-based file creation. Resumption prompts requested continuation and test verification; no app code was manually edited by the orchestrator.
- Later team-review responses were capped to 1,024 and then 256 tokens to fit worst-case reservations. The final total guard was $0.99, leaving a buffer below the user’s $1 ceiling. No further billable runs are planned.
- Active wall seconds sum each arm’s running segments and independent test checks, excluding paused intervals between resumptions. Because interventions and response limits differed, do not treat the timing as a clean performance comparison.
- Costs include all successful Opus calls, initial interrupted attempts, and Flash reasoning and cache usage. Raw per-request usage and cost are in `meter.json`; no credentials were logged. Claude CLI totals agree with the independently calculated Opus usage cost.
- Opus was priced at $4/M ordinary input, $5/M five-minute cache writes, $8/M one-hour cache writes, $0.20/M cache reads and $20/M output. Flash rates use the official peak/off-peak schedule at request time.
- Spending excludes Codex orchestration usage, whose dollar cost is unavailable in this session.

Pricing sources: [Opus 5.5 official documentation](https://platform.claude.com/docs/en/models/opus-5-5/overview), [DeepSeek official pricing](https://api-docs.deepseek.com/quick_start/pricing/).
