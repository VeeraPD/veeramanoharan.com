# Earlier case-study draft: reference prose

This is the existing working draft, copied with local links rebased. The current source pack adds more precise metrics, role/classification language and media history. Use the pack's numbered PM documents for the current writing brief.

# TicketPilot: from process friction to a gated AI product decision

**Portfolio case | AI product management, forward-deployed engineering and applied value engineering**  
**Status:** working prototype; discovery and offline evidence available; customer validation and value realization still proposed.  
**Scope of my work:** problem framing, public-data analysis, product scope, experience design, prototype implementation, evaluation, unit economics and pilot design. This was an individual portfolio project supported by AI development tools, not a customer engagement or a cross-functional production launch.

## Executive narrative

I explored whether resolution history could help a service desk reduce misrouting and give support engineers relevant fixes. I paired a real incident process log with a separate synthetic-text experiment: the former establishes observable process patterns; the latter tests a possible intervention without claiming access to private ticket descriptions.

The public log contained 7,554 incidents and 9,454 team changes. About 15.6% of cases included a direct A–B–A bounce. That created a discovery hypothesis, not proof that those transfers were avoidable. My first lexical router then failed its deployment gates: 10% first-time-right versus a 90% keyword baseline, with 90% of tickets sent for review. I retained the failed result, narrowed scope and designed a gated research and pilot plan.

The product demonstration lets a visitor follow an employee request, an evidence-backed recommendation, human approval, a simulated technician action and employee confirmation. A React frontend now calls the same Python reasoning code used by the analysis workbench. Enterprise connections and actual fixes remain simulated.

My investment recommendation is bounded discovery, not production deployment. The lesson is that a usable demonstration, a credible process problem and a passing intervention are three different achievements.

## 1. Discovery and ideation: understand the work before choosing AI

### Opportunity and evidence

The initial hypothesis was that tickets bounce because language-based categories differ from actual resolution ownership. Support engineers also repeat investigations because previous fixes are difficult to find. These were starting assumptions from the product brief, not findings from interviews I conducted.

I selected Ward Steeman's BPI Challenge 2013 incident log because the original process-owner questions explicitly include team ping-pong. I mapped each trace to an incident, event `org:group` to team and `time:timestamp` to event time. Consecutive equal teams form an ownership segment; changes create handoffs. I kept single-event incidents and checked missing fields and event ordering. The downloaded mirror matched the publisher checksum.

| Observed process evidence | Interpretation | What it does not establish |
|---|---|---|
| 9,454 team changes across 7,554 cases | Ownership transitions are a material feature of the process | Every transition is wrong or avoidable |
| 50.6% of cases involve multiple teams | Multi-team work deserves investigation | A single-team path is always desirable |
| 15.6% include A–B–A | Direct returns offer a focused discovery cohort | The first assignment caused the return |
| 64.9-hour mean pre-transfer ownership interval | Work and waiting accumulate between ownership changes | Active staff effort or recoverable labor hours |

The log is historical public Volvo IT data. It does not describe current Volvo performance or validate Northstar, the fictional demo organization. I did not attach invented ticket descriptions to real case IDs.

### Research that remains to be done

Interview five resolvers, two service owners and two requesters in a prospective pilot organization. Observe triage and resolution of at least ten cases. Ask for a recent bounced case, the reason for each transfer, evidence needed to accept ownership, source trust, and the effort required to investigate. Avoid asking only whether users like an AI assistant.

Recruitment and counts are research-plan assumptions, not completed activity. Outcomes to seek: distinguish legitimate escalation from avoidable bouncing, measure active effort, identify a repeatable issue family and determine which tools must remain the system of record.

### Ideas considered

Better queue rules and ownership documentation; retrieval-based routing; source-backed fix suggestions; duplicate grouping; product alerts; multilingual voice. I kept non-AI improvements as credible alternatives. If ownership is undocumented or queue configuration is broken, fixing that may create value faster than a model.

## 2. Validation and research: separate the riskiest assumptions

| Assumption | Validation method | Current status | Decision consequence |
|---|---|---|---|
| Process friction exists | Reproduce public event-log patterns | Demonstrated observationally | Investigate in the target company |
| Many transfers are avoidable | Annotate bounced cases with service owners | Not tested | No savings claim yet |
| Prior final ownership predicts new ownership | Frozen keyword comparison on held-out descriptions | Lexical prototype fails | Block deployment; evaluate alternatives |
| Retrieved fixes help engineers | Blind relevance/actionability ratings and source-validity checks | Not tested | Do not claim resolver time savings |
| Buyers understand the product | Unmoderated comprehension test after the tour | Direct user feedback found confusion; no formal study | Redesign around real work and test comprehension |
| Integration is acceptable | Data/identity review and workflow observation | Simulated only | Prototype before expanding access |

Early feedback in this project said the app felt like a report about a test rather than a product. I first introduced a sequential buyer journey. Further feedback showed that role changes, the recommendation rationale and the transition from suggested instructions to completed work were still unclear. I moved toward a service workspace with an optional anchored tour, explicit roles and distinct completion states. I have functional test evidence, not proof that this redesign improved buyer comprehension.

For the next usability study, ask five unfamiliar participants to explain what TicketPilot does, what humans approve, where it fits, and how improvement would be measured. A proposed progression criterion is four of five answering all four without presenter coaching. This is a directional discovery threshold, not statistical proof of market demand.

## 3. Strategy and vision: improve resolution outcomes, not recommendation volume

**Vision:** employees get the right help through familiar channels; support has the process and resolution context to act; service owners can validate whether the intervention improves outcomes.

**Initial segment:** an enterprise internal service desk with usable event history, known resolving teams, approved help content and a service owner willing to run a controlled pilot. Start with one recurring issue family and one support organization. Do not imply a validated market size or signed design partner.

**Users and buyer:** employee requester; support resolver; service owner as champion; CIO/COO as executive sponsor; Finance as value validator. Security and knowledge owners influence implementation. The employee's job is to resume work; the resolver's job is to fix the issue without unnecessary handoffs; the sponsor needs a defensible improvement case.

**Positioning:** an assistive layer for the existing service desk, using actual resolution outcomes and inspectable evidence. The public prototype is not a Celonis application or a functioning ServiceNow/Teams connector.

### Proposed North Star metric

**Weekly confirmed first-owner resolution rate within the agreed service-level objective, without reopening within seven days.**

For each weekly submission cohort, numerator = eligible cases resolved by the first accountable team, within that case's agreed SLO, with employee confirmation and no reopening during the following seven days. Denominator = all eligible submitted cases in that cohort. Publish the cohort after every included case has reached its SLO deadline plus the seven-day follow-up window. Pending, missing-confirmation and failed cases do not count as successes. Report cohort size and confirmation coverage alongside the rate.

Register eligible issue families and exclusions before the pilot. Eligibility must not change after seeing a model prediction. Escalations and manual-review cases remain in the denominator; legitimate multi-team work can be reported as a separate predeclared segment. The first accountable team is the accepted owner, not an incidental intake queue.

This metric connects adoption to a durable employee outcome. It is deliberately stricter than a model recommendation being accepted. It is proposed and not instrumented end to end in this prototype.

| Metric layer | Measures | Why it matters |
|---|---|---|
| North Star | Confirmed first-owner resolution rate; weekly cohort size | Reliable employee outcome at useful volume |
| Process | Handoffs per case, A–B–A returns, median/p90 cycle time | Intervention should change actual work |
| Model | First-time-right, review rate, wrong auto-assignment, relevance | Diagnose quality, coverage and risk separately |
| Adoption | Eligible resolvers active weekly, evidence viewed, acceptance/override reasons | Detect abandonment and automation bias |
| Value | Active effort saved, operating cost, realized capacity and payback | Distinguish technical output from funded value |
| Guardrails | Reopens, p90 degradation, unsafe advice, subgroup failures | Prevent gaming through premature closure or easy-case selection |

## 4. Roadmapping and prioritization: five P0s

I used MoSCoW because realistic reach and impact estimates were unavailable; inventing precise RICE scores would disguise uncertainty.

| Priority | Scope | Decision rationale |
|---|---|---|
| Must | Real-data Process X-Ray | Establish process context before proposing automation |
| Must | Routing with human fallback | Test the ownership hypothesis with controlled exposure |
| Must | Suggested fixes with sources | Make advice inspectable and useful to resolvers |
| Must | Baseline comparison | Show incremental quality and preserve failures |
| Must | Executive pack | Connect feasibility to cost, adoption and a funding decision |
| Should | Buyer walkthrough and coherent role-based UI | Necessary for visitors to understand the proposed workflow |
| Could | Product issue alerts, knowledge-gap drafts | Extend support-to-product value only after core quality |
| Won't in this pilot | Voice, automatic fixes/closure, live enterprise connectors | Protect evaluation focus and implementation scope |

The walkthrough became a prerequisite for a self-serve portfolio release after comprehension feedback, while remaining outside claims of model performance. The roadmap is theme-based: establish context, prove decision quality, enable controlled use, validate value, then consider expansion. No calendar commitment overrides a failed gate.

## 5. Design and development: build an inspectable intervention

**Employee story:** describe an issue without selecting a team; get a readable update and a way to say it still fails.  
**Resolver story:** inspect why a team is proposed, approve/change ownership, inspect sources, complete the work and record verified notes.  
**Leader story:** inspect process friction and understand the distinction between sample outcomes, real process findings and conditional value.

Key acceptance decisions: weak evidence must abstain; suggested instructions are not completed work; employee updates differ from internal technical notes; unresolved issues stay with the approved owner; no externally executed fix is implied by a demo click.

### Implemented architecture

The designed React/TanStack UI is the customer frontend. Real request submission calls a same-origin API proxy to the Python retrieval/voting engine. Its returned decision is carried through the browser's shared persona state. The Python API is stateless with respect to visitors and does not write their workflow to the analysis memory. Streamlit is retained as the separate evidence workbench, not embedded as a second customer interface.

Local JSON/CSV holds synthetic historical cases and public process aggregates. The UI also includes seeded scenarios and presenter jumps: those use browser sample rules and are labeled accordingly. New submissions call Python; an unavailable API produces a retry message rather than a silent sample result. No paid LLM, real enterprise integration or production identity system is implemented.

This is a working retrieval/rules prototype, not proof of a production generative agent. Semantic retrieval is an optional unverified path. Browser-only workflow state is appropriate for visitor demonstrations, not organizational record-keeping or audit.

### AI-specific product choices

Use actual resolving-team labels instead of the first queue; retrieve evidence instead of inventing fixes; use explicit abstention; keep human acceptance visible; distinguish heuristic confidence from calibrated probability; keep evaluation data outside memory updates; preserve the version and reason behind each recommendation. A production feedback loop would accept only reviewed resolutions and apply source permissions and freshness checks.

## 6. Go-to-market and launch: a portfolio release and a customer pilot are different

For portfolio visitors, publish the integrated demo with synthetic content, short entry instructions and a case-study link. No login or real company data is needed. Offer a guided story and free exploration; label the fictional organization and simulated actions. Test on a fresh browser and on mobile before promoting the link. The recorded assets now include a 60-second trailer and a 3:43 walkthrough with actual app footage, role introductions, synthetic narration and original music. It has not been published.

This is a portfolio distribution plan, not evidence of willingness to pay. The visitor conversion funnel would be landing → tour start → first submitted case → recommendation inspected → completion → case-study/portfolio contact. Use privacy-respecting aggregate events only if implemented and disclosed. This telemetry is currently proposed.

For a real customer, run a sponsor/service-owner discovery workshop, validate data access and ownership definitions, agree an eligible cohort and freeze the baseline. Begin in shadow mode. Release a one-team human-approved pilot only after the offline gates pass. Expansion requires demonstrated adoption, process improvement and Finance validation. The service owner owns rollback; the engineer owns technical quality; Finance owns monetization assumptions; the sponsor approves investment.

The 90-day plan separates discovery, controlled use and value validation. It is a gated proposal, not an executed rollout.

## 7. Evaluation, analytics and iteration: keep the failed result

| Offline result | Value | Interpretation |
|---|---:|---|
| Keyword first-time-right | 90% | Same 50 synthetic held-out descriptions |
| Python lexical first-time-right | 10% | Review counts as unassigned, not correct |
| Recommendation accuracy including review | 88% | A recommendation is not an accepted assignment |
| Human-review rate | 90% | Fails the <=40% gate |
| Wrong automatic assignments | 0 of 5 | Too few assignments to establish safety |

Templates repeat and the set is correlated, so this is limited engineering evidence. The public process analysis is a different dataset and cannot establish routing uplift. The enhanced UI's sample rules must not be scored as though they were the evaluated Python engine.

The original +10-percentage-point gain gate is demanding against a 90% baseline: it requires 100%. I would examine whether that is a sensible business requirement before the next independently held-out evaluation, documenting and approving any revision in advance. I would not change the criterion after seeing results just to make this experiment pass.

### Next experiment and decision gates

Obtain de-identified, representative ticket text with service-owner-validated final ownership. Split by time and issue family to reduce near-duplicate leakage; use a development set to calibrate thresholds and a separate frozen holdout. Compare existing rules, improved non-AI rules and semantic retrieval under identical eligibility. Report accuracy, coverage, confidence intervals and failure segments. Rate at least 50 fixes blindly, including outdated and unsupported cases.

Before expansion, wrong auto-assignment must be <=5%, with a one-sided 95% binomial upper bound <=5%. Even zero errors needs at least 59 independent auto-assigned cases to meet that bound; five does not suffice. This safety sample is separate from the process-outcome experiment's power calculation.

For controlled use, pre-register a handoff-reduction hypothesis and compare randomized eligible cases where feasible. If using matched cohorts, disclose case-mix and time confounding. Measure active effort separately from elapsed delay. Review subgroup outcomes and corrections weekly. Stop/rollback on safety breaches; block expansion for failed quality, review, adoption or value gates.

### Instrumentation specification, not implemented production analytics

Events: request_submitted, recommendation_generated (engine/version/evidence IDs), owner_approved/overridden, technician_completed, employee_notified, employee_confirmed/reopened, evidence_viewed, tour_started/skipped/completed. Required links: case ID, pseudonymous actor role, timestamps, eligibility, cohort, final resolving team, SLO deadline and source version. Keep operational analytics and portfolio visit analytics separate. The current browser activity log demonstrates transitions but is not an immutable audit trail or complete NSM measurement pipeline.

## Value model and investment recommendation

The illustrative base case takes 1.2515 observed historical handoffs/case and assumes 20,000 annual tickets, a 25% reduction, 10 active minutes/handoff, $45/hour and 20% review at five minutes each. This releases about 710 net capacity hours. Build is $12,000; annual run cost is $6,600; year-one TCO is $18,600. Conditional annual net capacity value is $25,332, with simple payback 5.7 months after go-live.

Only the historical handoff rate is observed. Volume, avoidable share, effort, review and prices are assumptions. The current failing router does not qualify for the forecast. No delay hours are monetized as labor, no unmeasured fix savings are added, and Finance must validate whether capacity becomes cash. The executive pack includes these limitations and a stop decision.

## Why this case fits applied value engineering

The Celonis Senior Applied Value Engineer posting emphasizes business-critical prototyping, executive demonstration, adoption and value realization. I structured the case around that chain rather than treating model output as the final deliverable. The work demonstrates a discovery hypothesis, process evidence, a working intervention, a failed gate, a buyer experience and a bounded investment recommendation. It does not claim Celonis platform implementation experience from this prototype.

For core finance/supply-chain transfer, apply the same discovery pattern to invoice disputes moving between AP, procurement and suppliers. Validate actual resolution ownership, repeated touches, reopening and cash outcomes; do not assume an IT routing label model transfers unchanged.

**What I can defend today:** the analysis method and provenance, implementation boundaries, observed failed evaluation, scope decisions and value arithmetic.  
**What I must still earn:** validated customer pain, willingness to adopt/pay, independent model quality, production integration and realized business impact.

## Evidence and sources

- [Original BPI challenge and process-owner questions](https://ais.win.tue.nl/bpi/2013/challenge.html).
- [Ward Steeman (2013), incident dataset DOI](https://doi.org/10.4121/uuid:500573e6-accc-4b0c-9576-aa5468b10cee); [local provenance](../evidence/process-data-provenance.md).
- [Celonis Senior Applied Value Engineer role](https://careers.celonis.com/join-us/open-positions/job-detail?jobId=7996959003), consulted October 23, 2026. Target-role interpretation, not affiliation or endorsement.
- [Per-case Python evaluation](../evidence/evaluation-lexical.json); [business-case inputs/results](../evidence/business-case.json).
- [CFO one-pager](../executive/cfo-one-pager.pdf), [90-day plan](../executive/90-day-rollout.pdf), [scorecard](../executive/value-scorecard.pdf).
