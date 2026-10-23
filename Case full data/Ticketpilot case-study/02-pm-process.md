# The full PM approach

This is a reconstruction of the work and decisions supported by project artifacts. It does not imply that a formal seven-stage company process, Scrum team or customer launch took place. The stages overlap: user feedback returned the project to problem framing and experience design after implementation.

## 1. Discovery and ideation

**Question:** where does support work become unnecessarily difficult, and why might resolution context help?

Started with ownership bouncing, repeated investigation, late product signals and language barriers from the original brief. Selected the BPI Challenge 2013 incident log because its process-owner questions include team ping-pong. Defined team-level ownership segments, handoffs, direct bounces and elapsed intervals, then reproduced their aggregates.

Considered non-AI ownership documentation and better queue rules alongside retrieval routing, sourced fixes, alerts and voice. The output is an observable process pattern and a hypothesis to investigate, not a verified customer cause.

**Decision:** open with process friction; validate avoidability and active effort in a target organization before claiming savings. See [research plan](05-research-and-validation.md).

## 2. Validation and research

**Question:** which assumptions can invalidate the concept before more features are built?

Built a frozen synthetic-text baseline comparison. The lexical intervention failed quality and review-rate gates. Direct project feedback also found that the demo felt like a test summary and was hard to follow as an end user. These are two different validation signals: weak classifier performance and weak product comprehension.

**Decision:** retain the failed result; improve the experience; propose representative real-text evaluation and formal comprehension testing. There are no completed customer interviews, willingness-to-pay results or measured usability improvements to report.

## 3. Strategy and vision definition

**Question:** whose outcome should the product optimize, and what would justify continued investment?

Framed a resolution outcome spanning requester, engineer and manager. Chose a proposed North Star based on confirmed, timely, durable resolution by the first accountable team. Defined a narrow initial segment and a buying group including the service owner, sponsor, Finance, Security and knowledge owners.

**Decision:** optimize reliable outcomes at meaningful volume; inspect acceptance, review effort and safety alongside the North Star. See [metric system](04-nsm-and-metrics.md).

## 4. Roadmapping and prioritization

**Question:** what is the smallest coherent test of the product and investment hypotheses?

Reduced the original eight P0s to five: process analysis, routing/fallback, sourced fixes, baseline comparison and executive deliverables. Used MoSCoW because evidence did not support precise RICE reach/impact estimates. Cut voice and product alerts from the core story; kept an invoice-dispute transfer hypothesis for discussion.

**Decision:** sequence themes as process understanding -> decision quality -> controlled use -> value validation -> expansion. Calendar pressure does not override a failed gate. After feedback, a comprehensible guided experience became a portfolio-release prerequisite.

## 5. Design and development

**Question:** can the workflow make the recommendation inspectable, actionable and understandable?

Built the Python retrieval/voting prototype, process analysis, evaluation and value model. Integrated the designed React frontend through a same-origin Python API; retained Streamlit as an evidence workbench. Designed requester, engineer and manager views around the same request. Distinguished suggested instructions, recorded work, notification and employee confirmation.

**Decision:** TicketPilot performs classification; the engineer approves/overrides assignment and verifies the work. Weak evidence abstains. No external fix is executed by the demonstration. See [implementation boundaries](06-ai-and-implementation.md).

## 6. Go-to-market and launch

**Question:** how should a visitor understand the product, and how would a real organization adopt it safely?

Prepared a guided tour, a 60-second trailer, a 3:43 walkthrough and executive PDFs. Revised the film after feedback on pace, framing, personas, value and classification ownership. Prepared a hosting layout for the integrated frontend and Python service.

**Decision:** portfolio distribution and enterprise rollout have separate success criteria. The former needs a working public experience and understandable case; the latter needs validated data, quality, safety, adoption and economics. Neither public deployment nor enterprise launch is claimed here.

## 7. Evaluation, analytics and iteration

**Question:** is this intervention worth adopting, and what should happen next?

Preserved per-case evaluation, source provenance, cost assumptions and gate failures. Defined a proposed event contract and cohort-based NSM. Added explicit human approval, employee confirmation and a value-validation plan. Video/media checks demonstrate playback and readability, not business impact.

**Decision:** HOLD current-router deployment. Next work should resolve problem avoidability, real-text quality and fix usefulness, then test outcomes in a bounded pilot. See [value and rollout](07-value-case-and-rollout.md).

## Evidence maturity at the end of this cycle

| Area | Current maturity | Next decision-enabling artifact |
| --- | --- | --- |
| Process problem | Reproducible historical observation | Target-company handoff reason annotations |
| Customer problem | Hypothesis plus direct product feedback | Interview/observation synthesis with anonymized evidence |
| Solution feasibility | Integrated local prototype and recorded workflow | Representative evaluation and integration spike |
| Model quality | Failed synthetic test | Frozen independent real-text comparison |
| Adoption / outcome | Proposed metrics and pilot | Instrumented cohort results and resolver feedback |
| Economics | Conditional arithmetic | Finance-validated effort, costs and realization |
| Distribution | Local media and hosting preparation | Verified hosted demo and a comprehensible visitor journey |
