# North Star and the metric system

Everything in the proposed product-outcome system below needs real instrumentation and baseline validation. The only measured results today are the public process aggregates and the separate offline synthetic evaluation. Sample dashboard statistics are illustrations.

## Proposed North Star: durable first-owner resolution rate

**Weekly confirmed first-owner resolution rate within the agreed resolution SLO, with no reopening for seven days.**

```text
NSM = successful eligible cases in a matured weekly submission cohort
      -------------------------------------------------------------- x 100
                  all eligible cases in that cohort
```

A successful case must satisfy all of these conditions:

1. It was eligible under rules registered before prediction or assignment.
2. The first accountable resolving team resolved it without a transfer to another accountable team.
3. Resolution occurred by the case's agreed resolution deadline.
4. The employee explicitly confirmed the outcome by cohort publication.
5. It was not reopened in the seven days following the qualifying resolution.

The first accountable team is the first accepted owner, not an incidental intake queue. Define this identically in control and intervention arms. Human-review cases, overrides, pending cases and missing confirmations remain in the eligible denominator; they are not automatically successes or silently removed. If the first approved owner resolves the issue, a case can succeed even when an engineer overrode TicketPilot: this is a product outcome metric, not model attribution.

Group cases by submission week, not closure week. Publish only after every included case's resolution deadline plus seven days has elapsed. Under this proposed contract, confirmation must be received by that publication cutoff. Report the cutoff, cohort size, missing confirmations and late-arriving events. A late correction restates the cohort transparently; it does not silently change history.

The UI's **respond-by** time is not a resolution SLO. The prototype does not currently have the durable timestamps, follow-up coverage and validated ownership semantics needed to calculate this NSM end to end.

## Why this North Star

It combines an employee outcome, ownership quality, timeliness and durability. It prevents a recommendation being accepted or a ticket being closed from becoming the definition of success. It also gives the PM a reason to design confirmation and recovery paths, not only model output.

| Alternative | Strength | Why it is not the chosen North Star |
| --- | --- | --- |
| Tickets classified / recommendations generated | Easy activity signal | Can increase while employees remain blocked |
| Recommendation acceptance | Indicates workflow fit | Can reward automation bias; accepted advice can be wrong |
| Raw ticket closure count | Measures throughput | Can reward premature closure or easy-case selection |
| Resolution time alone | Familiar operational outcome | Can improve by changing case mix or closing before confirmation |
| Estimated dollars saved | Executive relevance | Too assumption-sensitive for the everyday product steering metric |
| Count of durable first-owner resolutions | Captures scale | Volume changes can mask declining quality; retain as a companion count |

The rate can also be gamed. Always report eligible case volume, successful case count, confirmation coverage and cohort composition. Do not average team percentages without weighting by eligible case counts. Report severity/issue-family segments, rather than allowing an aggregate improvement to hide harm to difficult cases.

No credible absolute NSM target has been established. Establish the target-company baseline and minimum meaningful improvement before preregistering a pilot. Do not substitute the 90% synthetic keyword accuracy as an employee-outcome baseline.

## Metric dictionary

| Layer / metric | Operational definition | Status / decision use |
| --- | --- | --- |
| NSM rate + count | Definition above; report numerator, denominator and maturity cutoff | Proposed; no current value |
| Confirmation coverage | Eligible cohort cases with an explicit employee response / all eligible cases | Proposed; expose missing outcome evidence |
| Handoffs per case | Accountable team changes after collapsing consecutive equal-team segments / eligible cases | Historical mean 1.2515; intervention effect unmeasured |
| Direct bounce rate | Cases with at least one A-B-A ownership sequence / eligible cases | Historical 15.58%; avoidability unknown |
| Median / p90 cycle time | Submission to verified resolution; use an agreed clock, severity and pause policy | Proposed pilot measure; public first-to-last event span is not equivalent |
| Time to confirmed outcome | Submission to employee confirmation; report censoring and missingness | Proposed; distinguishes system closure from employee outcome |
| Reopen rate | Resolved eligible cases reopened within seven days / cases with full follow-up | Proposed durability guardrail |
| Offline first-time-right | Correct non-abstained assignments / all held-out descriptions | Lexical 5/50 = 10%; keyword 45/50 = 90% |
| Recommendation accuracy | Correct proposed team, including predictions later withheld / all held-out descriptions | Lexical 44/50 = 88%; not deployment coverage or NSM |
| Coverage / abstention | Non-abstained / all eligible; abstentions / all eligible | Offline coverage 10%, abstention 90% |
| Confident routing error | Wrong non-abstained predictions / non-abstained predictions | Offline 0/5, insufficient sample; not actual production auto-assignment |
| Fix usefulness | Independently rated relevant AND actionable suggestions / reviewed suggestions | Unmeasured; source validity and reviewer agreement also required |
| Source validity | Inspected suggestions whose sources are current, accessible and appropriate / inspected suggestions | Unmeasured; permissions and release applicability matter |
| Resolver weekly adoption | Eligible resolvers performing a meaningful review/approval/override on eligible work / eligible resolvers | Proposed; a login is not adoption |
| Assisted opportunity coverage | Eligible cases where a resolver actually used the assistance / all eligible cases | Proposed; detects selective use and abandonment |
| Acceptance / override | Approved unchanged or overridden proposals / reviewed proposals; capture reasons | Diagnostic, not a success target |
| Active effort per case | Observed hands-on triage/investigation/review minutes under a consistent measurement protocol | Unmeasured; needed for a labor value claim |
| Cost per successful outcome | Attributable operating cost / durable successful eligible cases | Proposed; denominator zero means undefined, not free service |
| Visitor comprehension / activation | Can explain AI vs human roles; completes a meaningful demo task | Proposed UX/distribution measures, separate from enterprise NSM |
| Data completeness | Cases with required ownership, deadline, confirmation and follow-up fields / eligible cases | Proposed measurement-readiness gate |

Recommendation accuracy and first-time-right deliberately differ: the former includes a team hypothesis for review cases; the latter gives no success credit for abstaining. Report both so neither low coverage nor risky automation is hidden.

## Existing gates versus new targets

| Gate from the executive pack | Current evidence | Treatment |
| --- | --- | --- |
| First-time-right >=80% AND >=10 percentage points above frozen baseline | 10% vs 90% | FAIL; review the ceiling issue before the next frozen experiment |
| Human-review rate <=40% | 90% | FAIL; include review effort in economics |
| Confident assignment error <=5%; one-sided 95% upper bound <=5% | 0 wrong / 5 non-abstained predictions | INSUFFICIENT; zero errors needs at least 59 independent predictions for that bound |
| >=70% useful fixes, blind review of >=50 suggestions | Not measured | Block quality approval until measured |
| >=50% fewer observed handoffs vs control; p90 time no worse | Not measured | Proposed pilot gate; not implied by offline error proxies |
| >=60% eligible resolvers active weekly for two consecutive weeks | No live-user study | Proposed adoption gate |
| Positive annual net value; payback <=12 months | Conditional scenario only | Finance validation required |

With zero errors among five independent trials, the one-sided 95% error upper bound is about 45.1%, not 5%. The current test's repeated templates further weaken independence. A nominal 200-case pilot is a planning minimum from the existing rollout, not a statistical power calculation for the handoff or NSM effect.

## Proposed event contract

| Event | Required fields / interpretation |
| --- | --- |
| request_submitted | case ID, submitted_at, predeclared eligibility/version, issue family, severity, cohort/control arm, resolution deadline |
| classification_generated | case ID, engine/version, proposed team or abstain, heuristic score, evidence IDs/versions, latency |
| owner_approved / owner_overridden | case ID, accountable team, actor role, timestamp, override reason; preserve original proposal |
| evidence_viewed | case ID, source ID/version, actor role, timestamp; no inference of usefulness from a click |
| technician_completed | case ID, actual resolving team, verified work record, timestamp; separate from suggestion generation |
| employee_notified | case ID, message type, timestamp |
| employee_confirmed / case_reopened | case ID, actor role, event timestamp, linked resolution version |
| tour_started / skipped / completed | Visitor interaction only; do not mix with customer process analytics |

A production event store needs idempotency, consistent clocks, access controls, pseudonymous actors, immutable history and a versioned team taxonomy. Reconcile case counts to the system of record. Audit eligibility before computing cohorts. The browser activity log is a demonstration of transitions, not this measurement pipeline.

## Attribution and failure diagnostics

Use randomized eligible cases where feasible. Otherwise use a predeclared matched-cohort design and disclose case-mix/time confounding. Analyze intention-to-treat outcomes and assistance usage separately. Track whether improvements came from better rules, clearer ownership, training or AI; a combined product improvement does not establish model-only lift.

Inspect review burden, confirmation missingness, severe incidents, source failures and subgroup degradation every week. Stop unsafe exposure; block expansion on failed or missing gates. Keep process elapsed time, active labor, released capacity and realized cash as different measures.
