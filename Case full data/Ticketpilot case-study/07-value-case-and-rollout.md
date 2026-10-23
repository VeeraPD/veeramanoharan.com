# Value case, distribution and rollout

## Investment recommendation

Authorize bounded discovery within the illustrative $12,000 build envelope; HOLD deployment of the current lexical router. Release pilot and expansion funding only after their gates pass. These are proposed investment decisions, not money already spent or approved by a customer.

The observed process provides a reason to investigate. It does not establish how much friction is avoidable, what intervention will work, or how much cash an organization can realize.

## Base-case economics: illustrative USD scenario

| Input | Value | Evidence status |
| --- | --- | --- |
| Historical handoffs/case | 1.251522 | Observed public process aggregate; not target-company baseline |
| Annual eligible volume | 20,000 tickets | Assumption |
| Handoff reduction | 25% | Assumption about a future passing intervention |
| Active effort per handoff | 10 minutes | Assumption; elapsed delay is not a substitute |
| Loaded hourly cost | $45 | Assumption requiring Finance validation |
| Incremental review load | 20% of tickets x 5 minutes | Assumption; current offline abstention is 90% |
| Build | 160 hours x $75 = $12,000 | Budget assumption; not recorded project timesheets |
| Monthly run | $150 platform + $100 model + $300 operations | Budget assumptions; not vendor quotes or current measured spend |

```text
Avoided handoffs/year = volume x handoffs/case x assumed reduction
Gross capacity hours = avoided handoffs x active minutes / 60
Review hours = volume x assumed review share x review minutes / 60
Net capacity hours = gross capacity hours - review hours
Annual run cost = 12 x (platform + model + operations)
Annual net value = net capacity hours x hourly cost - annual run cost
Year-one TCO = build cost + annual run cost
Year-one net value = annual net value - build cost
Simple payback months = build cost / (annual net value / 12), if positive
```

| Derived output | Base case |
| --- | ---: |
| Modeled current annual handoff labor cost | $187,728 |
| Avoided handoffs/year | 6,258 |
| Gross capacity hours | 1,043 |
| Review hours | 333 |
| Net annual capacity | 710 hours |
| Annual run cost | $6,600 |
| Year-one TCO | $18,600 |
| Annual net capacity value after run cost | $25,332 |
| Year-one net value after build and run | $13,332 |
| Simple payback after go-live | 5.7 months |

Calculations use unrounded values from [business-case.json](evidence/business-case.json). Payback excludes the pre-go-live calendar and does not discount cash flows. There is no resolver fix-time benefit, outage/revenue benefit or elapsed-delay monetization in this model. Released capacity becomes cash only through a Finance-validated realization mechanism; it may instead support additional work without reducing spend.

## Sensitivity: why review effort matters

All rows keep volume, unit effort, loaded rate and costs fixed. These are scenario calculations, not measured performance or forecasts of the failing router.

| Assumed handoff reduction | Assumed review share | Net hours/year | Annual net value | Payback |
| --- | --- | ---: | ---: | --- |
| 10% | 20% | 84 | -$2,827 | No positive payback |
| 25% | 20% | 710 | $25,332 | 5.7 months |
| 50% | 20% | 1,753 | $72,264 | 2.0 months |
| 25% | 40% | 376 | $10,332 | 13.9 months |
| 25% | 90% | -457 | -$27,168 | No positive payback |

The 90% review row changes only that input to illustrate burden. It still assumes a 25% reduction that has not been demonstrated. The product's mandatory approval step and low-confidence investigation are also different activities: measure both, account for existing baseline effort, and avoid either double-counting or omitting incremental work.

The executive scorecard currently asks for 50% fewer handoffs, while this financial base case uses 25%. A conservative financial scenario can be intentional, but that rationale has not been validated. Resolve it with the sponsor before using both as one coherent pilot contract.

## Portfolio distribution versus enterprise go-to-market

For portfolio visitors, use the integrated React/Python demo, a one-minute trailer, the detailed walkthrough and an evidence-linked case. Offer guided exploration and clearly label sample organization/data and simulated actions. Measure comprehension and meaningful demo completion if telemetry is later implemented and disclosed.

For an enterprise, the route to adoption begins with a service-owner/sponsor discovery workshop, data access and ownership definitions, not a public link. Position the product around a narrow process outcome and an agreed decision to continue or stop. Do not invent market size, competitor benchmarking, paying customers or sales conversion results.

## Proposed 90-day gated rollout

| Stage | Work | Proposed owner | Exit decision |
| --- | --- | --- | --- |
| Days 1-30: discovery and offline quality | Validate transfers/labels, interview users, measure effort, obtain approved representative text, freeze development/holdout, review fix sources | Service owner, analyst, engineer; Finance validates unit costs | No production assignment; pass agreed quality, review, safety and usefulness gates or rework/stop within the cap |
| Days 31-60: one-team controlled use | Shadow first; then human-approved routing in one registered cohort; train resolvers, log overrides, evaluate comparable cases | Service owner owns exposure/rollback; product owner owns adoption | Demonstrated process improvement, no p90 degradation, >=60% weekly resolver adoption for two weeks, safety maintained |
| Days 61-90: value validation | Mature outcome cohorts, validate cost/effort, test attribution, review segments and operational readiness | Finance, analyst, sponsor | Expand only with passing quality/adoption/safety and positive net value / <=12-month payback; otherwise capped measurement extension or stop |

Current lexical results block moving into controlled use. The original >=80% first-time-right AND >=10-point baseline-gain gate is unresolved against a 90% baseline; revise only before a new independent experiment. Proposed sample counts are not substitutes for a power calculation.

## Operating ownership and rollback

The service owner disables intervention assignments and restores the existing queue on a severe safety breach. Keep recommendation/evidence versions, approval history and failure examples for diagnosis. Review corrections and a random sample of accepted suggestions weekly. Suspend expansion when quality, review burden, adoption or value gates fail or remain unmeasured.

Finance validates capacity realization and costs; knowledge owners validate sources; engineering owns technical reliability; the sponsor approves funding. These are proposed role assignments, not evidence that a project steering committee exists.

See the [executive PDFs](executive/README.md) for the earlier one-page funding materials. Their figures are scenarios; this document explains their assumptions and open alignment questions.
