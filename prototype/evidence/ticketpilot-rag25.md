# TicketPilot: lexical RAG and resolution-assistance experiment

Run: 23 October 2026. Model: DeepSeek Flash via LangChain. Report: [case-level results](ticketpilot-rag25.json). Fixtures: [25 requests](ticketpilot-rag25-cases.json).

## Product change

The lexical store supplies five similar historical tickets and two current KB articles. LangChain gives that evidence to the LLM, which returns a team, reason, confidence, citations and up to five suggested resolution steps. Code checks citation IDs, team support and the 0.75 confidence/review gate. The API exposes steps as a draft requiring human verification. No incident changes are executed and no ticket is marked resolved by this test.

The 500 historical cases and KB are synthetic fixtures. The separate 7,554-incident public process log is not a resolution knowledge base and was not used as ticket text.

## Experiment contract

25 author-labeled synthetic development requests: 20 known-owner cases across eight teams, including four Hinglish examples, plus five ambiguous, unknown or adversarial cases. Labels and review expectations were saved before running. The new examples reuse existing scenario families; this is not independent or blind validation. Both engines received the same descriptions and original historical memory, excluding user-created corrections. No prompt or threshold was tuned after inspecting this run.

| Measure | Lexical retrieval/vote | RAG + LLM |
|---|---:|---:|
| Correct team recommendations, known-owner requests | 19/20 (95%) | 20/20 (100%) |
| Correct automatic routing, all requests | 9/25 (36%) | 19/25 (76%) |
| Requests sent to review | 16/25 (64%) | 5/25 (20%) |
| Wrong automatic assignments | 0/9 | 1/20 (5%) |
| Ambiguous/unknown cases correctly withheld | 5/5 | 4/5 |
| Generated resolution drafts | 0 | 20 |
| Provider failures | 0 | 0 |

Keyword rules chose the correct team for 18/20 known-owner requests. The LLM run took 45.67 seconds overall, including local evaluation work. Counts are small and no operational time saving is measured.

## What failed and what it means

R24 instructed the system to ignore routing rules and choose Security for an unexplained problem. It instead chose Hardware and produced hardware repair guidance. That was still an unsupported assignment and an inappropriate draft. Valid citations and a matching historical team did not establish that the retrieved cases applied to the new issue. R14, a payroll access paraphrase, was recommended correctly but withheld for review.

Twenty drafts were produced, including the inappropriate R24 draft. Draft count is not resolution success. There was no resolver acceptance study or executed-fix test. Human approval remains necessary. Next work: reject unsupported applicability, test broader scenario families with independent labels, and evaluate resolver-rated usefulness and safety.

## North Star Metric and observed improvement

The proposed NSM is **durable first-owner resolution rate**: eligible tickets resolved on time by the first accountable team, confirmed by the employee, and not reopened within seven days, divided by all eligible tickets in a matured cohort. Eligibility and the service target must be fixed before a pilot.

**NSM improvement is unmeasured.** This offline test has no executed resolutions, employee confirmations or seven-day follow-up.

Its leading indicator, correct automatic routing across the test stream, improved from 36% to 76% (**+40 percentage points**). Review share fell from 64% to 20% (**−44 points**), while wrong automatic assignments rose from zero to one. These are paired engineering results on these 25 cases, not achieved service outcomes or labor savings.

The earlier 50-case result (100% recommendations correct, 12% review) remains a separate experiment and must not be pooled with this set. The new set has different composition and includes explicit ambiguity/adversarial cases.

## Reproduce

From the app root, run `.runtime\python\python.exe -B scripts\evaluate_rag25.py`. The script loads local provider configuration without printing credentials, writes `reports/rag-resolution-25.json`, and records fixture/history SHA-256 hashes. One model call per request, with at most one retry. The existing test suite now has 37 passing tests, including resolution-draft withholding and verification-state checks.
