# AI behavior, evaluation and implementation boundaries

## The product responsibility split

| Responsibility | Current behavior |
| --- | --- |
| Classification | TicketPilot automatically retrieves similar historical descriptions, votes on their resolving teams and proposes a team |
| Low-confidence handling | Withholds an assignment and routes the decision to human review |
| Routing approval | Daniel reviews the evidence and approves or overrides the proposed team |
| Fix assistance | Retrieves relevant resolution notes and current KB material with sources |
| Work execution | An authorized resolver would perform and verify the work; enterprise changes are simulated here |
| Employee outcome | Maya confirms success or says she still needs help |
| Management | Elena, the IT service manager, reviews illustrative service health and the proposed evidence/value system |

Automatic classification does not mean automatic external assignment, access changes or ticket closure. The offline evaluator's `assigned` field is a non-abstained prediction, not evidence that a real helpdesk was changed.

## Current architecture

```text
Visitor -> React/TanStack frontend -> same-origin API proxy -> Python service
                  |                                      |
           browser-local workflow                 lexical retrieval + voting
           and persona state                      synthetic history + KB

Streamlit workbench -> process analysis / evaluation / conditional value model
Public BPI event log -> ownership aggregates (separate from synthetic text)
```

The designed UI is the customer frontend. Python exposes routing, health and process endpoints. New request submission uses Python; seeded presenter scenarios use browser sample rules and are labeled. An unavailable API should produce a retry state rather than silently substituting a seeded success.

The visitor's decision is retained across employee, support and manager views in that browser. This state is neither shared organizational ticket storage nor authenticated identity. The visitor-facing API does not write a shared learning memory. The older local Python workbench has separate JSON closure/correction machinery; do not conflate those paths.

## Implemented method

Default retrieval uses token counts and cosine similarity, selects five historical cases, and weights resolving-team votes by similarity. A conservative heuristic combines vote concentration and best-match similarity. The threshold is 0.75. The confidence score is not a calibrated probability.

Fix material is extractive retrieval. Retired KB articles are excluded, but historical notes are not fully release-aware. The system does not generate novel remediation with an LLM. Urgency/deadline extraction is heuristic. Optional sentence embeddings exist as an unverified path.

No Claude API, LangGraph, LangChain, Chroma, pydantic or LangSmith integration has been delivered. The original brief proposed those tools; using those names in a delivered-stack claim would be inaccurate. See [code snapshots](references/code/README.md).

## Actual offline result

| Metric | Result | Meaning |
| --- | --- | --- |
| Test cases | 50 | Five variants of ten authored scenarios; correlated synthetic data |
| Keyword first-time-right | 45/50 = 90% | Frozen baseline on the same descriptions |
| Lexical first-time-right | 5/50 = 10% | Abstentions count as unassigned |
| Recommendation accuracy | 44/50 = 88% | Includes proposed teams for abstained cases |
| Human review | 45/50 = 90% | Low deployment coverage and substantial possible review cost |
| Wrong non-abstained predictions | 0/5 | Too small and correlated to establish a <=5% error rate |

**Decision: FAIL current quality/review gates; HOLD deployment.** The same engine can demonstrate a plausible dashboard case while performing poorly across the held-out set. A successful filmed example is not a representative evaluation.

Do not present the evaluation JSON's zero modeled pilot handoffs as an observed improvement. That proxy counts only wrong non-abstained predictions and gives no transfer cost to review cases. It is not an operational handoff measurement and cannot override the 90% abstention rate.

The real event-log analysis and synthetic text test have different case identities and purposes. There is no experiment showing TicketPilot changed the public BPI process.

## What would change the decision

Validate resolving-team labels and current ownership rules; acquire representative approved descriptions; use a development set and frozen time/family-separated holdout. Compare better non-AI rules and semantic retrieval. Evaluate error/coverage tradeoffs and fix usefulness. Predeclare any revised baseline-gain requirement before running a new independent evaluation.

Possible explanations for failure include conservative confidence gating, lexical mismatch, label ambiguity and correlated templates. These are diagnostic hypotheses, not completed ablations. Do not write that a particular change fixes the failure until tested.

## Engineering verification versus product validation

Prior project checks recorded TypeScript compilation, nine React tests, 25 Python tests, a production Node build and live same-origin HTTP routing. Actual headless Chrome capture verified a Python response before recording the journey. The latest video players passed metadata/playback/seeking and mobile-overflow checks.

This packaging task does not rerun those application tests. The capture also retained two recoverable React hydration warnings; do not claim a warning-free production audit. Media checks cover decode, captions, sample frames, audio levels and players, not every app path, security property or cloud runtime. Docker runtime, public hosting and live enterprise integration remain unverified/unimplemented.

## Production work still needed

Authenticated identities and source permissions; durable concurrent workflow storage; system-of-record connectors; validated team taxonomy; source/version freshness; measured confidence calibration; protected evaluation datasets; observable errors/latency/cost; reviewed feedback ingestion; auditability and rollback ownership. These are adoption and value constraints as much as engineering tasks.
