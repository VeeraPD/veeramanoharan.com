# Portfolio brief: one builder, an AI coding team

## The main story

I built Ensemble to explore a practical idea: put a capable AI in charge of planning and review, while lower-cost AI helpers build clearly defined pieces in parallel.

In my experience building an iOS app, API costs fell by more than 50%, and parallel work finished faster than solo runs. Those are anecdotal project observations. They motivated a larger question: could the benefits become greater when a project contains more substantial, independent work?

The small-app comparison provides separate measured support: the team averaged 13.9% lower API cost, including the lead, but took 18.1% longer. The opportunity is conditional: more useful worker output per round of planning and review, with limited coordination and rework.

## Product in plain language

Ensemble, published as ensemble-mcp, connects a lead AI in Claude Code to cheaper coding workers. The lead sets shared rules and divides the work. Each worker receives a focused brief and relevant files, and may change only its assigned files. Ensemble checks those file permissions. The lead then reviews, combines and verifies the result, fixing small issues or delegating further work.

MCP is the connection that makes this delegation available inside the existing coding assistant. Explain the workflow before introducing the acronym.

For example, an app can be divided into storage, search and checks. The shared rules define how those parts fit together. Independent workers build the parts, while one lead remains responsible for integration. This is an illustrative workflow, not a description of the small to-do benchmark's exact roles, which were data model, command-line interface and tests.

## Problem and audience

The product addresses spending premium-model prices on routine implementation, waiting for independent tasks to happen sequentially, and repeatedly exposing every worker to a long conversation.

Initial audience hypothesis: solo builders and small engineering teams using coding assistants with API budgets. Potential team needs include understandable cost attribution and enforceable boundaries on what agents may change. These are target segments, not evidence of customer adoption.

Job to be done: complete a multi-part coding task with clear ownership, manageable review and an understandable total cost.

## Benefits and conditions

- **Deliberate spending:** use stronger reasoning for planning, integration and review; use cheaper models for well-specified implementation.
- **Parallel progress:** independent pieces can move together, subject to dependencies, available concurrency and integration time.
- **Focused context:** each worker receives a short task brief and relevant files rather than the lead's whole chat.
- **Controlled changes:** code enforces file ownership and protects certain paths. This controls where writes go; it does not guarantee correct code within allowed files.
- **Review ownership:** the lead brings the result together and checks it. Human review remains part of responsible use.

Larger projects can offer more room to delegate when shared planning supports more good implementation work. Project size alone does not ensure savings. Poor interfaces, conflicting changes, extensive rewrites and repeated broad reviews can consume the benefit.

## My role

I am a solo builder who directed AI coding agents and reviewed the work. The portfolio can emphasize problem framing, workflow design, shared contracts, role boundaries, scope choices and evaluation. The retained project material supports these decisions; avoid inventing human collaborators, customer counts, revenue or production outcomes.

The iOS project used a project-specific DeepSeek MCP bridge. It is context for the delegation pattern, not an audited performance result for a particular packaged Ensemble release. The author has not supplied comparable invoices, a billing period or a matched project timing study.

## What makes this a PM case study

The interesting decision is where delegation earns its coordination cost. The portfolio should explain the user problem, what was built, why those boundaries were chosen, what was cut, what was learned and what evidence would change the next decision.

Use **cost per accepted task** as a proposed north-star metric: total model spending to reach a reviewed, verified result. Supporting metrics could include completion time, repair effort, first-pass acceptance and rejected writes. These are proposed evaluation metrics; do not claim all were measured already.

## Current status and next step

The working product is open source, MIT licensed, version 0.1.0 in the captured source materials. Its runtime uses Python's standard library and supports compatible model providers through configuration. Repository: https://github.com/VeeraPD/ensemble-mcp

Next: evaluate a larger task with independent parts, shared acceptance criteria fixed before generation, consistent model/CLI/permission settings, three matched pairs, and full review/repair accounting. The small study warrants further testing, not a universal savings claim.
