# Cost test results — 23 October 2026

Model: Claude Sonnet 4.5 (`claude-sonnet-4-5-20250929`) in both arms; DeepSeek Flash workers in arm B. Six fresh sessions in A/B/A/B/A/B order.

| Run | Arm | Wall time (s) | Claude USD | Worker USD | Total USD | Tests pass | Manual interventions |
|---|---|---:|---:|---:|---:|---|---:|
| 1 | A | 96.39 | 0.253891 | 0.000000 | 0.253891 | Yes (30) | 0 |
| 2 | B | 95.64 | 0.219694 | 0.017262 | 0.236956 | Yes (34) | 0 |
| 3 | A | 103.95 | 0.241840 | 0.000000 | 0.241840 | Yes (26) | 0 |
| 4 | B | 167.52 | 0.152240 | 0.042414 | 0.194655 | Yes (29) | 0 |
| 5 | A | 110.14 | 0.240327 | 0.000000 | 0.240327 | Yes (33) | 0 |
| 6 | B | 103.56 | 0.183344 | 0.018662 | 0.202006 | Yes (41) | 0 |

| Arm | Mean total USD | Cost range USD | Mean seconds | Time range seconds |
|---|---:|---|---:|---|
| A | 0.245353 | 0.240327–0.253891 | 103.49 | 96.39–110.14 |
| B | 0.211205 | 0.194655–0.236956 | 122.24 | 95.64–167.52 |

Team cost change: 13.9% lower. Team time change: 18.1% longer.

**Decision: no clear cost saving at this size.** The protocol requires at least about 20% separation and nonoverlapping cost ranges.

Benchmark cost: $1.369675. Separate model-check cost: $0.05579025. Combined recorded API cost: $1.425465.

## Method and limits

- Used Claude Code print mode with fresh session IDs and JSON-reported total_cost_usd instead of interactive /cost; this permits automated execution and preserves token and cache accounting. Raw CLI outputs are stored with every run.
- Each session used the protocol prompt verbatim. MCP was disabled in arm A and only ensemble-val was configured in arm B. Worker costs include reasoning output and cached input from audit logs, priced at the UTC timestamp of each call.
- The harness independently ran the specified unittest discovery command after each session; wall time includes this verification. No manual code fixes or prompt interventions occurred.
- Generated files were moved to per-run backups instead of deleted during resets. Artifacts and tests for each run are retained.
- All generated test suites passed, but their coverage differs; this is not a common hidden-test quality evaluation.
- Live API pricing was checked before execution. rates.json was populated after execution; worker costs were calculated directly from the verified rates throughout.
- The $3 budget threshold was checked between runs, not enforced as a provider-side hard cap.
- This total excludes Codex orchestration usage, for which no dollar meter is available here. It includes the Claude manager cost required by the protocol.

Sources: [DeepSeek pricing](https://api-docs.deepseek.com/quick_start/pricing/), [Anthropic Sonnet 4.5 pricing](https://www.anthropic.com/news/claude-sonnet-4-5).
