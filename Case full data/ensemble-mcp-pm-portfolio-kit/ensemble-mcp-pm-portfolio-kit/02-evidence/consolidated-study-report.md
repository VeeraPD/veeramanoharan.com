# MCP delegation study: encouraging early cost savings

**23 October 2026 · Exploratory study of a Python to-do application**

The study provides an encouraging early signal: a Claude manager coordinating DeepSeek Flash workers through ensemble-mcp reduced recorded API cost in both tested model configurations, including the manager’s planning and review. The measured savings were modest—13.9% with Sonnet 4.5 and 12.5% in an Opus 5.5 pilot—but support a focused follow-up on a more substantial task.

## What we compared

Both approaches implemented the same contract for a small, standard-library Python application: a persistent task store, a command-line interface, and unit tests.

- **Solo:** Claude wrote the implementation and tests itself, without MCP tools.
- **Team:** Claude delegated the model, CLI, and test roles to DeepSeek Flash workers through ensemble-mcp, then reviewed and repaired the result.

The primary study used Sonnet 4.5 in six fresh Claude Code sessions, alternating solo and team three times each. A follow-up used Opus 5.5 in one session per approach, under a $1 total API budget. Independent unittest discovery checked every saved implementation after execution.

## Cost results

All figures are USD and include the Claude manager’s API cost and any worker API cost.

| Configuration | Runs per approach | Solo average | Team average | Observed team saving |
|---|---:|---:|---:|---:|
| Sonnet 4.5 | 3 | $0.2454 | $0.2112 | 13.9% |
| Opus 5.5 pilot | 1 | $0.3983 | $0.3485 | 12.5% |

Sonnet solo costs ranged from **$0.2403 to $0.2539**; team costs ranged from **$0.1947 to $0.2370**. Every observed Sonnet team run cost less than every observed solo run, although the gap between the ranges was small. Three observations per approach are insufficient to establish reliability across tasks or operating conditions.

### Run-level evidence

| Study | Run | Approach | Claude cost | Worker cost | Total cost | Generated tests passed |
|---|---:|---|---:|---:|---:|---:|
| Sonnet | 1 | Solo | $0.253891 | $0 | $0.253891 | 30 |
| Sonnet | 2 | Team | $0.219694 | $0.017262 | $0.236956 | 34 |
| Sonnet | 3 | Solo | $0.241840 | $0 | $0.241840 | 26 |
| Sonnet | 4 | Team | $0.152240 | $0.042414 | $0.194655 | 29 |
| Sonnet | 5 | Solo | $0.240327 | $0 | $0.240327 | 33 |
| Sonnet | 6 | Team | $0.183344 | $0.018662 | $0.202006 | 41 |
| Opus pilot | 1 | Solo | $0.398314 | $0 | $0.398314 | 11 |
| Opus pilot | 2 | Team | $0.335130 | $0.013378 | $0.348508 | 24 |

The Sonnet benchmark cost **$1.369675**, plus **$0.055790** for a separate model check. The complete Opus pilot, including interrupted attempts and resumptions, cost **$0.746822**, within its $1 budget. Combined recorded API spending was approximately **$2.17**. Codex orchestration usage is excluded because its dollar cost was unavailable.

## Time and execution

Sonnet solo runs averaged **103.49 seconds**; team runs averaged **122.24 seconds**. The team was **18.1% slower** on this task. No manual code interventions were needed in those six runs.

The Opus sessions required budget-related resumptions: one continuation intervention for solo and three for the team. The solo session also encountered an initial shell-tool permission denial. Output allowances were reduced during team review to fit conservative request reservations. Both sessions ultimately ended successfully and their generated test suites passed.

Opus active execution time was 63.71 seconds solo and 72.47 seconds for the team, excluding pauses between resumptions. Those figures are descriptive only: differing interruptions and response limits prevent a clean timing comparison. Claude Code was upgraded from 1.0.120 to 2.1.280 for Opus compatibility. Comparisons between the Sonnet and Opus studies therefore do not isolate the effect of manager model choice.

## Independent quality check

A fixed, independent 24-check acceptance suite was subsequently run against all eight saved implementations at **no additional API cost**. It covered API behavior, persistence, exact CLI output, error streams, filtering, file layout, and ID handling.

| Saved implementations | Other 23 checks | IDs keep increasing after deleting all tasks and reopening |
|---|---|---|
| Sonnet solo: all 3 | Passed | Reused ID 1 |
| Sonnet team: all 3 | Passed | Preserved increasing IDs |
| Opus solo and team | Passed | Preserved increasing IDs |

This is a promising quality signal worth investigating. However, the contract said IDs “start at 1 and increase” without explicitly defining behavior after deletion and reopening. The independent check interprets that as never reusing deleted IDs. Clarify the intended policy before treating the difference as a confirmed violation or quality advantage.

The shared suite was created after generation. It was not the original stopping criterion, and the recorded costs do not include repairs to satisfy it. Passing model-generated tests alone did not establish equivalent coverage. The protocol now includes shared acceptance verification for future runs.

## Interpretation and next step

**Delegation showed modest cost savings in both tested configurations, with a possible quality benefit that deserves a clearer test.** This is sufficient motivation to continue investigating the approach.

The primary protocol’s illustrative decision rule requires approximately 20% cost separation and nonoverlapping ranges for a clear saving. The observed reductions fall below that threshold. The appropriate conclusion remains **“no clear cost saving at this size,”** rather than a general claim of superiority. This study also does not establish Opus as a better manager than Sonnet.

A small, controlled follow-up is the next useful investment; large-scale testing is premature. Choose a realistic task with naturally separable components, clarify the contract, freeze the same acceptance suite before generation, and run three matched solo/team pairs. Keep the CLI, permissions, output limits, and model settings consistent. Include all review, repair, and verification costs, and report both cost and time ranges.

The opportunity is concrete: determine whether a larger, well-divided task provides enough useful worker output to outweigh coordination overhead. The present results make that question worth pursuing without assuming its answer.

## Accounting and reproducibility

Claude session costs came from CLI JSON usage reports. Worker costs were calculated from audit-log token usage, including reasoning output and cache hits, using the official peak/off-peak schedule. The Opus pilot used a local proxy that reserved a conservative maximum cost before each billable request and tracked simultaneous reservations. Its final guard remained below $1 and included prior spending.

The underlying records are retained in `ensemble-validation/runs/cost-20261023T032855Z/`, `ensemble-validation/runs/opus-pilot-20261023T034713Z/`, and `ensemble-validation/acceptance/results/`. This document consolidates the results without requiring those files to understand the findings.

Pricing sources verified during execution: [DeepSeek API pricing](https://api-docs.deepseek.com/quick_start/pricing/), [Sonnet 4.5 pricing](https://www.anthropic.com/news/claude-sonnet-4-5), and [Opus 5.5 pricing](https://platform.claude.com/docs/en/models/opus-5-5/overview).
