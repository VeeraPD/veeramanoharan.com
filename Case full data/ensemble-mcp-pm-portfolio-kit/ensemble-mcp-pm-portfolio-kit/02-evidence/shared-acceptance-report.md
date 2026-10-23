# Shared acceptance check — 23 October 2026

One fixed independent suite derived from CONTRACT.md was run against all eight saved implementations. This is a post-hoc audit: the suite was created after generation and was not shown to the models. It does not retroactively change the original stopping rule or include any repair cost. No paid model calls were made.

Suite SHA-256: `73c04cf8cdc8344a2241f5daa8eef80c31b33af623677cc43d9e4677ccdc6f23`.

| Model | Run | Checks | Result | Failed checks |
|---|---|---:|---|---|
| Sonnet 4.5 | 1-A | 24 | FAIL | test_ids_increase_after_deleting_all_and_reopening |
| Sonnet 4.5 | 2-B | 24 | PASS | — |
| Sonnet 4.5 | 3-A | 24 | FAIL | test_ids_increase_after_deleting_all_and_reopening |
| Sonnet 4.5 | 4-B | 24 | PASS | — |
| Sonnet 4.5 | 5-A | 24 | FAIL | test_ids_increase_after_deleting_all_and_reopening |
| Sonnet 4.5 | 6-B | 24 | PASS | — |
| Opus 5.5 | A | 24 | PASS | — |
| Opus 5.5 | B | 24 | PASS | — |

The suite checks shared API behavior, persistence after each mutation, exact CLI output and error streams, filtering, required file layout, and monotonic IDs after deletions and reopening. It interprets the contract’s “ids start at 1 and increase” as never reusing deleted IDs, including after reopening. If a different policy is intended, clarify the contract before any new experiment.

This audit does not establish identical quality beyond the checked contract behavior. It does not measure production complexity or static compliance with every source-code rule.

For future runs, freeze this acceptance suite before generation and require both arms to pass it. Count all repair attempts and manager review toward cost and time. Keep the suite outside the app workspace and independently verify it. Preserve the same CLI version, permissions, output cap, and task across both arms; label interrupted pilots separately.

All eight implementations pass the other 23 checks. All three Sonnet solo failures are the interpretation-sensitive case of deleting every task, reopening the store, and adding another task: they return ID 1; the check expects ID 2. Clarify this policy before treating the result as a contract violation or comparing cost to a common quality target.
