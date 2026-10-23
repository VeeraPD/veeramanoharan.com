# Key decisions and tradeoffs

The entries below document observed project choices. They are not invented meeting minutes, stakeholder approvals or dated customer decisions.

| ID | Decision and alternative | Reasoning / consequence | Supporting material |
| --- | --- | --- | --- |
| D01 | Begin with a process problem rather than a router feature list | Real ownership paths explain why classification might matter; avoid claiming all handoffs are waste | [Process evidence](evidence/process-summary.json) |
| D02 | Use real event logs and separate synthetic ticket text | Real descriptions were unavailable. Keeping datasets separate avoids fabricating a join or proving patterns planted in text | [Provenance](evidence/process-data-provenance.md) |
| D03 | Learn ownership from final resolving-team labels in synthetic history | First intake queue can differ from the resolving team. This is a testable hypothesis, not a universal criticism of other classifiers | [Core implementation](references/code/core.py) |
| D04 | Compare against frozen keyword rules | AI needs incremental value over a low-cost alternative; a working demo alone cannot establish that | [Per-case evaluation](evidence/evaluation-lexical.json) |
| D05 | Retain the failed evaluation and recommend HOLD | Lexical first-time-right is 10% vs 90%; review rate is 90%. Hide neither abstentions nor the baseline | [Evaluation discussion](06-ai-and-implementation.md) |
| D06 | Use direct Python retrieval/rules before a larger agent stack | Provides inspectable behavior and low setup cost. Does not deliver the original brief's Claude/LangChain/LangGraph/Chroma stack | [Implementation](06-ai-and-implementation.md) |
| D07 | Retrieve fixes and show sources | Makes suggestions inspectable and avoids inventing generative capabilities. Source validity still needs review | [Evidence screenshot](media/screenshots/source-case.png) |
| D08 | Keep a confidence gate and explicit fallback | Coverage has a cost, but wrong confident routing also has a cost. Heuristic confidence is not a calibrated probability | [Metrics](04-nsm-and-metrics.md) |
| D09 | Separate machine classification from human assignment approval | TicketPilot selects the proposed team. Daniel approves or overrides routing; he is not manually creating the initial classification | [Current trailer](media/watch-trailer.html) |
| D10 | Separate suggested fix, recorded work and employee confirmation | A useful suggestion does not mean work happened or access was restored | [Full walkthrough](media/watch-demo.html) |
| D11 | Cut eight P0s to five using MoSCoW | Reach and impact evidence was insufficient for honest numeric RICE scores. Cut voice, alerts and other extensions to focus the test | [Original brief](references/original-product-spec.txt) |
| D12 | Promote guided onboarding after comprehension feedback | A self-serve portfolio demo must explain users, actions and value without a presenter. Comprehension uplift remains unmeasured | [Experience history](08-experience-and-demo-evolution.md) |
| D13 | Use the designed React UI as the frontend and Python as its reasoning service | One coherent visitor experience; Streamlit remains the evidence workbench. A frontend-only publish is insufficient | [Deployment notes](references/deployment.md) |
| D14 | Keep visitor workflow state browser-local | Enables isolated sample exploration; cannot stand in for organizational records, identity or a durable audit log | [Architecture](06-ai-and-implementation.md) |
| D15 | Use a durable resolution NSM instead of recommendation count | Acceptance can reward automation bias and ticket closures can reward premature closure; the employee outcome must survive reopening | [NSM contract](04-nsm-and-metrics.md) |
| D16 | Monetize active effort, not elapsed ownership delay | The original ROI formula multiplied delay by volume. Waiting hours are not labor. Cost review effort and operating TCO explicitly | [Value model](07-value-case-and-rollout.md) |
| D17 | Present bounded discovery funding rather than a production rollout | Current quality does not qualify for the financial scenario. Funding gates protect both users and the investment case | [Executive pack](executive/README.md) |
| D18 | Produce two media lengths with explicit personas and original music | Trailer helps visitors orient; the full film explains the workflow. Edited speed is not time-saved evidence | [Media index](media/README.md) |

## Corrections to the original brief

| Original proposal | Current position |
| --- | --- |
| All data synthetic and Claude-generated | Real public process log plus separate deterministic authored synthetic text |
| Claude, LangGraph, LangChain, Chroma, pydantic and LangSmith delivered | These are not integrated; describe the actual retrieval/rules implementation |
| Eight must-haves including voice, alerts and learning dashboard | Five P0s; extensions deferred; retained experiments distinguished from product scope |
| Tune the threshold on the test set | Use development data for tuning and keep a separate frozen holdout |
| Hours saved from average delay per handoff | Use validated active minutes; elapsed intervals are a separate process measure |
| Closed tickets automatically improve organizational memory | Some local Python state machinery exists; the visitor API does not create a shared learning loop |
| Strong claims about alternatives and superiority | Treat comparative advantages as hypotheses until measured on representative work |
| Human decides classification | TicketPilot classifies; support approves or overrides assignment |

## Decisions still to make before a pilot

The original scorecard requires >=10 percentage points over a 90% baseline, which demands 100%. Review that requirement before a new evaluation rather than moving a gate after seeing results. The scorecard's 50% handoff-reduction target and value model's 25% assumption also need an explicit rationale. Neither is an achieved outcome. Agree eligibility, legitimate escalations, review economics, confirmation coverage and sampling before exposure.
