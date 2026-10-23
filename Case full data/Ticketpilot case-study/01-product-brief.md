# Product brief

## Problem and opportunity

Employees should not have to understand internal support ownership to get help. Resolvers need enough context to accept the right work and avoid repeating an investigation. Managers need to know whether the intervention improves service outcomes, rather than simply generating recommendations.

The discovery hypothesis is that some avoidable transfers arise when a ticket's wording points to an intake category that differs from the team that resolves the problem. Previous resolutions may provide useful ownership and fix evidence. The public incident log supports investigating handoff patterns; it does not validate this cause or prove the transfers can be removed.

## Product vision and value proposition

**A clearer path from a reported issue to a confirmed outcome.** TicketPilot automatically classifies an issue using resolution history, proposes a resolving team, and surfaces relevant fix material with sources. A support engineer approves or overrides routing and verifies the work. The employee confirms whether the issue is solved.

The value hypothesis is fewer avoidable handoffs and less repeated investigation. Both require a controlled pilot. Recommendation volume, attractive dashboards and a fast edited demonstration are not proof of that value.

## Intended segment and buying group

Start with one internal IT service organization and one recurring issue family. Preconditions: usable event history, validated resolving-team labels, current approved knowledge, enough eligible volume to measure outcomes, and an accountable service owner. This segment is a selection hypothesis, not a validated market or a signed design partner.

| Persona / stakeholder | Job to be done | Product role | Evidence needed |
| --- | --- | --- | --- |
| Maya Rao, sales employee | Restore dashboard access before a meeting | Describe issue once, track progress, confirm or request more help | Recent requester interviews; comprehension and completion observations |
| Daniel Chen, support engineer | Resolve appropriate work with trustworthy context | Inspect classification, approve/override routing, review fix, record work | Observed triage; source relevance and active effort measurements |
| Elena Park, IT service manager | Improve service quality and allocate support capacity | Review handoffs, outcomes, adoption and exceptions | Baseline definition, controlled cohort results, operating ownership |
| CIO/COO sponsor | Fund a defensible operational improvement | Approve discovery, pilot and expansion separately | Benefits, risk, TCO and business-case sensitivities |
| Finance | Validate whether released capacity has economic value | Validate cost inputs and realized benefits | Active effort, loaded rates, cost records, realization mechanism |
| Security / knowledge owners | Preserve permissions and trusted operating guidance | Approve data access, sources and permitted actions | Access controls, source freshness, retention and audit design |

Maya, Daniel, Elena and Northstar are fictional demonstration personas and organization. They are not research participants or customers.

## Current five P0s

1. Process X-Ray on the real BPI 2013 incident log.
2. Classification/routing recommendations with abstention and human routing approval.
3. Extractive fix suggestions with inspectable sources.
4. Frozen baseline comparison and explicit failure reporting.
5. Executive pack: value model, TCO, rollout and scorecard.

The guided experience and videos became necessary for a self-serve portfolio release after comprehension feedback. They communicate the product; they do not improve the evaluated classifier by themselves.

Deferred: voice/vernacular input, product alerts, knowledge-gap drafts, a continuous-learning dashboard, stress-test generation, automatic fixes/closure and live enterprise connectors. Some earlier backend experiments remain in the repository; retained code does not make them current P0 functionality.

## What the visitor sees versus an organizational rollout

The current React frontend calls the Python engine for a new request, then retains its decision across browser-local persona views. An organization would need a real system of record, authenticated users, approved data access, durable workflow storage and operational controls. Those connections are simulated in this prototype.

The portfolio release should let visitors try the integrated experience and read the evidence. A frontend-only publish that omits Python cannot demonstrate the implemented engine. A public deployment has not been established by this source pack.

## Transfer beyond ITSM

An invoice dispute bouncing among AP, procurement and a supplier has a similar ownership-discovery pattern. Investigate repeated touches, retrieve verified resolution evidence and evaluate whether ownership improves. This is a transfer hypothesis, not implemented ERP functionality; cash outcomes, cycle time and labor savings need separate attribution.
