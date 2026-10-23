# Product decisions, alternatives and tradeoffs

| Choice | Product rationale | Tradeoff / limit |
|---|---|---|
| One lead with cheaper implementation workers | Match model capability and cost to different parts of the job | Lead context, review and repairs can dominate spending |
| Parallel work on separate files | Let independent tasks move together | Dependencies and integration can erase the speed benefit |
| Lead-owned shared rules | Give workers exact interfaces and import paths before work begins | More preparation; unclear rules cause rework |
| File ownership enforced in code | Make boundaries inspectable instead of relying on a model's promise | Workers can still write poor code inside their allowed area |
| Focused briefs and selected context | Keep unrelated conversation history out of worker requests | Missing information can cause incompatible assumptions |
| No execution of model-returned code inside the server | Keep the tool's responsibility narrow: validate and write outputs | Lead must run checks and review the result |
| Roles and providers in configuration | Fit into an existing coding workflow and allow provider choice | Provider compatibility and prices still need verification |
| Default cheaper worker, stronger option after failure | Avoid paying the stronger rate for every task | Escalation and retries must be counted |
| Small product surface | Prioritize delegation, ownership, reviewability and audit logs | Multi-model debate/voting and extra channels were not retained |

The historical drafts discuss a single agent, separate workspaces per agent and multi-model debate as alternatives. Present these as design considerations, not comparative benchmarks that were run.

## Lessons supported by the material

**Exact handoffs matter.** In an earlier four-part experiment, the test worker guessed an import path because the brief named types without their module locations. This supports specifying interfaces and exact paths; it does not prove a weak model could never solve the task.

**Refusal and enforcement are different evidence.** An earlier worker refused an out-of-scope request. That did not exercise the file check. Local automated tests, including ownership and symlink cases, provide the relevant implementation evidence. The repository's 20 tests cover several areas; they are not 20 security audits.

**Count the lead.** The initial worker-only cost story overstated the economics. Later comparisons included the lead and found modest savings on a tiny app. About 88% of Sonnet team API spending still came from the lead. That includes all Claude usage, not just an isolated planning or review measure.

**A shared finish line matters.** Generated tests differed. A later common acceptance suite found one interpretation-sensitive ID behavior difference. Future experiments should define acceptance before generation and include repairs in the total.

## Scope and positioning

This is a focused tool for model delegation with role-based file ownership. Avoid claims that it invented multi-agent coding or is a new market category. Any business model discussion—such as team policies, project-level costs or shared audit trails—is a future option, not shipped revenue or validated demand.
