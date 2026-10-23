# Research and validation plan

The original brief supplies hypotheses, not completed customer research. Direct project feedback supplies concrete comprehension issues, not evidence of willingness to pay. The next research should discriminate between an attractive story and a fundable intervention.

## Assumptions to test

| Hypothesis | Current evidence | Disconfirming evidence | Next method |
| --- | --- | --- | --- |
| A meaningful share of transfers is avoidable | Historical handoff/bounce patterns | Most transfers are necessary specialist work or policy-required escalation | Service-owner annotation of a sampled target-company cohort |
| Resolution ownership is predictable from available context | Synthetic experiment; current lexical method fails | Ownership depends on missing permissions, systems or changing responsibilities | Time/family-separated real-text holdout with validated final owners |
| Retrieved fixes reduce repeated investigation | Source-backed prototype exists | Stale, inaccessible or irrelevant sources create extra work | Blind usefulness review and observed resolver tasks |
| The recommendation fits existing work | Coherent local workflow | Copying, approval overhead or tool switching offsets the benefit | Observe current triage; compare task effort with prototype |
| Buyers understand the product without coaching | Feedback identified confusion | Visitors still cannot distinguish classification, approval and execution | Unmoderated comprehension tasks with unfamiliar participants |
| A sponsor will fund a bounded pilot | Conditional cost model and executive pack | Benefit too small, integration too costly, ownership unclear | Sponsor/Finance discovery workshop with explicit decision options |

## Discovery protocol: proposed, not completed

Recruit five resolvers, two service owners/managers and two requesters in a prospective organization. Observe at least ten recent triage/resolution cases. Use purposive sampling across bounced and single-owner cases, issue families and severity; record selection limits rather than implying representativeness.

Ask participants to walk through a recent actual case:

1. What prevented work, and how was the request filed?
2. Who first accepted ownership, who resolved it, and why did each transfer occur?
3. Which information changed the ownership decision? Was that available at submission?
4. Which steps were active effort versus waiting? What evidence supports the estimate?
5. What source would the resolver trust, and what would make it stale or unusable?
6. What authority is needed to assign work, change access or close the case?
7. How is the employee's outcome confirmed, and how are reopens recorded?

Capture anonymized workflow notes, handoff reasons, source trust conditions and effort measurements. Obtain appropriate permission for real-company materials. Do not collect identifiable content into this fictional demo.

Synthesize a problem statement, ownership taxonomy, system-of-record boundary, eligible issue family and a ranked assumption list. Seek counterexamples to the routing hypothesis. If unclear ownership or broken queue rules explains most friction, test that non-AI change first.

## Comprehension study

Use five unfamiliar participants for directional usability discovery. Show the trailer, then ask them to explain: what TicketPilot does, what Daniel approves, where actual work happens, and what Elena uses the manager view for. Ask them to submit a request, inspect a source, explain an override and recover an unresolved issue without coaching.

A proposed progression criterion is four of five correctly explaining all four concepts. Record task errors, assistance, hesitation and exact misunderstandings; do not claim statistical market validation from five people. Compare against a documented earlier design if claiming a comprehension improvement. Views or watch time alone do not demonstrate understanding.

## Representative AI evaluation

Obtain approved, de-identified ticket descriptions with service-owner-validated resolving-team labels. Define eligibility and label disagreements first. Split by time and issue family to reduce near-duplicate leakage. Tune on development data only; freeze an independent test before running model comparisons.

Compare current queue rules, improved non-AI rules and retrieval alternatives under the same inputs. Measure quality, abstention, confident error, source usefulness, latency and cost. Report counts, uncertainty and failure segments. Keep engineer corrections and test resolution notes out of evaluation memory. Semantic retrieval is a candidate experiment, not an established improvement.

For fixes, blind-rate at least 50 suggestions with resolver/knowledge-owner review. Include stale, permission-restricted, irrelevant and insufficient-evidence cases. Record relevance, actionability, source correctness and disagreements. A generated judge may assist triage later but cannot substitute for an independent human validity study here.

## Controlled use and adoption

Start in shadow mode. After passing agreed offline gates, use one-team, human-approved routing on a narrow registered cohort. Randomize eligible cases if feasible; otherwise explain the limitations of a matched comparison. Predefine the NSM maturity window, stopping rules and rollback owner.

The existing plan's 200 eligible cases is a planning floor, not proof of adequate power. Estimate the sample from the observed baseline, meaningful effect, clustering and follow-up losses. Safety needs enough independent non-abstained predictions for its separate upper-bound criterion.

## Deliverables to add when research happens

- An anonymized participant/observation log and permission record.
- Evidence-linked synthesis, including counterexamples and rejected hypotheses.
- Predeclared eligibility, labels, holdout and outcome definitions.
- Experiment plan, baseline, sample justification and decision gates.
- Results with missingness, uncertainty, failures and a documented continue/change/stop decision.

Until these exist, keep discovery counts, adoption results, willingness to pay and realized value marked as proposed or unmeasured.
