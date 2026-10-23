// Builds the case pages (case-*.html) from the CASES data below.
// Every case follows one skimmable shape: a one-line problem statement, a four-box TL;DR (Problem, Product,
// North Star, Result), then sections whose titles are claims, so the titles read in order tell the whole story.
// Sources: "PM Case Studies - Veera Manoharan" (21 Oct 2026); TicketPilot and Ensemble from the packs in "Case full data/"
// (23 Oct 2026). Interpretations and drafts are listed in WIPlist.md.
// Run: node prototype/build-cases.mjs
import { writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from './diagrams.mjs';

const OUT = dirname(fileURLToPath(import.meta.url));

/* ----------------------------------------------------------------------------
   CONTENT
   ---------------------------------------------------------------------------- */
const CASES = [
  /* ===================== 01 ATÉLIER ===================== */
  {
    file: 'case-atelier.html', short: 'Atélier', num: '01',
    title: 'Atélier: search your handwritten notes by meaning',
    kicker: 'Case 01 · B2C · AI · Built · 2026',
    stand: 'MBA students write their notes by hand on iPad, but search only finds a page if they remember the exact words they wrote.',
    desc: 'Atélier, an iPad notes app that searches handwriting by meaning: the problem, what classmates said, the bets, the scope calls and how success is measured.',
    lead: { img: 'images/atelier-cover.webp', w: 1600, h: 1200, ratio: '4/3', alt: 'Atélier on two iPads: the note library with "Search your handwriting", and a handwritten page with an "echo of past notes" hint' },
    tldr: [
      ['Problem', 'Students cannot find their own handwritten notes. They remember the idea, not the words, so keyword search comes back empty.'],
      ['Product', 'An iPad notes app that finds handwritten pages by meaning and gives a one-tap summary drawn only from your own notes.'],
      ['North Star', 'Notes found per weekly active user: it moves only when "I asked, and I found it" works.'],
      ['Status', 'Feature-complete and demoed to IIM Lucknow faculty in October 2026. No user results yet: a 20-query search eval and a 10 to 15 student beta come next.'],
    ],
    snapshot: [
      ['Role', 'Product, user research, design and build (Swift)'],
      ['Platform', 'iPad with Apple Pencil'],
      ['Timeline', 'July to October 2026'],
      ['Users', 'MBA and grad students'],
      ['Skills', 'Discovery, AI product judgment, 0-to-1 execution'],
    ],
    sections: [
      { label: 'Problem', title: 'Students remember the idea, not the words, so their notes go unfound', type: 'bullets',
        intro: 'At IIM Lucknow most of my cohort writes notes by hand on an iPad. Classes move fast, quizzes come often and the notes pile up. I started by talking to classmates before quizzes and case discussions. Three frustrations came up each time.',
        items: [
          '<b>Search fails on memory.</b> People remember the idea from class, not the exact words they wrote, so keyword search comes back empty.',
          '<b>Review is manual.</b> Preparing for a quiz means scrolling notebook by notebook, page by page.',
          '<b>The workaround costs thinking.</b> Typing makes search easy but loses the sketches, arrows and structure that come with writing by hand.',
        ],
        outro: 'Why now: handwriting recognition on iPad became good enough to trust, and language models made it practical to search a person\'s own notes by meaning.' },
      { label: 'Users', title: 'One user and one job: find it by meaning before the quiz', type: 'table',
        fig: { svg: D.atelierJourney, cap: 'The primary user\'s moment before a quiz, today and with Atélier.', read: 'Read each row left to right. The top row is what happens today; the bottom row is the same moment with Atélier. The only step that changes is the second one: asking in her own words instead of guessing the exact word.' },
        head: ['Segment', 'Job to be done', 'Call'],
        rows: [
          ['<b>MBA and grad students</b>', '"Find what the professor said about pricing in week 3, and give me the gist before the quiz."', '<b>Primary.</b> Heavy iPad note-takers, high review pressure, and I can reach and test with them directly'],
          ['Working professionals', 'Recall decisions from meeting notes', 'Later. Strong need, but notes live in many tools'],
          ['Designers and visual thinkers', 'Sketch and annotate', 'Served by the core tools. They value the canvas more than search'],
        ] },
      { label: 'Competition', title: 'Apple Notes, GoodNotes and Notability all stop at keyword search', type: 'table',
        head: ['Product', 'What it does well', 'Where it stops'],
        rows: [
          ['<b>Apple Notes</b>', 'Free, built in, searches handwriting', 'Matches words, not meaning'],
          ['<b>GoodNotes</b>', 'Best-in-class notebooks and handwriting search', 'Finding still depends on remembering the right word'],
          ['<b>Notability</b>', 'Handwriting plus audio, searchable', 'Same keyword limit; review is still scrolling'],
          ['<b>Typed AI notes</b> (e.g. Notion)', 'AI search and summaries', 'You have to type, which loses the handwritten thinking'],
        ],
        outro: 'When I tried the three handwriting apps in July 2026, search in each matched the words on the page, not their meaning. That is the open space Atélier goes after.' },
      { label: 'Strategy', title: 'The wedge is exam-season review; incumbents can copy search, so the review workflow has to be the moat', type: 'bullets',
        items: [
          '<b>Wedge:</b> grad students under heavy review pressure. They feel the pain weekly and I can test with them directly.',
          '<b>Why it could hold:</b> summaries grounded only in your own pages, and echoes that connect today\'s note to older ones, make the product more useful the more you write. This is a hypothesis, not yet shown.',
          '<b>Risk:</b> Apple Notes or GoodNotes could add search by meaning. If they do, search alone stops being the difference, and review is what is left.',
        ] },
      { label: 'Key insight', type: 'quote',
        text: 'People remember the idea, not the words.',
        note: 'A student searching for "price discrimination" may have written "charging different customers differently". So search had to work on meaning, and summaries had to stay inside the user\'s own notes.' },
      { label: 'Goals and metrics', title: 'North Star: notes found per weekly active user', type: 'tree',
        ns: ['Notes found per weekly active user', 'It moves only when the core promise works: you asked, and you found it.'],
        l1: [
          ['Searches per active user', 'Do students reach for search at all?'],
          ['Search success rate', 'Share of searches where the user opens a result'],
          ['Summaries used per week', 'Is the one-tap gist part of review?'],
        ],
        guard: '<b>Guardrail:</b> share of summaries users rate as accurate. <b>Health:</b> week-4 retention.' },
      { label: 'Hypotheses', title: 'Three bets, with targets written down before building', type: 'bullets',
        items: [
          '<b>H1. Meaning beats keywords.</b> Search by meaning puts the right note in the top 3 for most real student queries. Target: 16 of 20.',
          '<b>H2. Summaries earn a place in review.</b> Students use a summary at least once in a week with a quiz.',
          '<b>H3. Writing feel is the price of entry.</b> If the pen feels worse than their current app, they never stay long enough to try search.',
        ] },
      { label: 'Scope', title: 'Two AI features made v1; chat, flashcards and sharing waited', type: 'table',
        head: ['Feature', 'Value to students', 'Effort', 'Call'],
        rows: [
          ['<b>Pen and paper feel</b>', 'Table stakes', 'Medium', '<b>v1, first</b>'],
          ['<b>Search by meaning</b>', 'High: the core promise', 'High', '<b>v1</b>'],
          ['<b>Grounded summaries</b>', 'High: review before quizzes', 'Medium', '<b>v1</b>'],
          ['<b>Echoes of past notes</b>', 'Medium', 'Low: reuses search on the page being written', '<b>v1</b>'],
          ['Chat assistant, auto-flashcards', 'Medium', 'High, medium', 'Later'],
          ['Sharing and collaboration', 'Low for this user', 'High', 'Not planned'],
        ],
        outro: 'Echoes are not a third AI feature; they run the same search on the page you are writing. Two features are also two things I can evaluate honestly.' },
      { label: 'Solution', title: 'The product: write, search in your own words, get the gist', type: 'video',
        frame: 'plain', src: 'videos/atelier-demo.mp4', poster: 'images/atelier-cover.webp', ratio: '4/3',
        alt: 'Atélier demo: writing a note, searching handwriting by meaning, and an echo of past notes',
        cap: 'Demo: write, search by meaning, get the gist.',
        fig: { after: true, svg: D.atelierBoundary, cap: 'How a question becomes an answer.', read: 'Read left to right. Your handwritten pages are understood by meaning, and that powers both search (top path) and summaries (bottom path). Everything sits inside the dashed boundary: outside knowledge is never used. Design is not proof, so the eval checks that summaries add no claims and miss no points.' },
        tiles: [
          ['Search your handwriting', 'Type what you remember, in your own words. Atélier finds the page even if you wrote it differently.'],
          ['Echoes of past notes', 'While you write, a quiet hint points to related notes from earlier classes.'],
          ['Pen and paper feel', 'A pen, eraser, colours, lasso and ruler that feel right before any AI shows up.'],
        ] },
      { label: 'Decisions and trade-offs', title: 'Three calls: pen first, summaries grounded in your notes, only two AI features', type: 'decisions', id: 'decisions',
        items: [
          { q: 'Writing experience first', chose: 'A solid pen, eraser, colour, lasso and ruler toolkit before any AI', gave: 'Weeks of delay before the riskiest bet, search by meaning, could be tested', why: 'If writing feels bad, nobody stays long enough to need search. In hindsight I would have tested search on classmates\' existing notes first.' },
          { q: 'Grounded summaries', chose: 'Summaries draw only from the user\'s own notes', gave: '"Smarter" summaries that add outside knowledge', why: 'Students need the summary to reflect their class, not the internet. The eval checks whether it does.' },
          { q: 'Scope', chose: 'Search and summaries only; no chat assistant or auto-flashcards in v1', gave: 'Feature-list appeal', why: 'Fewer AI features, each one tested properly.' },
        ] },
      { label: 'Status and next', title: 'Built, not yet proven: the eval and a classmate beta decide', type: 'table',
        head: ['Measure', 'Target', 'Status'],
        rows: [
          ['Feature-complete app, faculty demo', 'Ship v1', '<b>Done</b>, October 2026'],
          ['Right note in top 3 results', '16 of 20 real queries', 'Next: run the eval'],
          ['Summaries rated accurate', '8 in 10 or better', 'Next'],
          ['Week-4 retention', '4 in 10 beta users', 'Next: 10 to 15 classmates'],
        ],
        outro: '<b>Lesson:</b> I built the writing core before testing search by meaning, the bet the whole product rests on. A cheaper order is to test the riskiest bet first. Targets are not results; this table will show the eval score, misses included.' },
    ],
  },

  /* ===================== 02 TICKETPILOT ===================== */
  {
    file: 'case-ticketpilot.html', short: 'TicketPilot', num: '02',
    title: 'TicketPilot: an AI router that failed its own test',
    kicker: 'Case 02 · B2B · AI · Prototype · 2026',
    stand: 'In IT support, tickets get passed between teams and employees wait while each team repeats the investigation.',
    desc: 'TicketPilot, an AI ticket-routing prototype: process evidence from 7,554 incidents, a failed baseline test, and a recommendation to hold deployment.',
    lead: { img: 'images/ticketpilot-cover.webp', w: 1920, h: 1080, ratio: '16/9', alt: 'TicketPilot title card: Less ticket bouncing, a clearer path to resolution. Classify, explain, resolve.' },
    tldr: [
      ['Problem', 'In a real public IT-support log, half of incidents pass through more than one team and 15.6% bounce straight back to a team that already had them.'],
      ['Product', 'Reads a new ticket, proposes the resolving team and shows matched past fixes with sources. An engineer approves the route; the employee confirms the outcome.'],
      ['North Star', 'Durable first-owner resolution rate (proposed): resolved on time by the first owner, confirmed by the employee, not reopened in 7 days.'],
      ['Result', 'The prototype failed its test: 10% first-time-right against a keyword rule\'s 90%. Recommendation: hold deployment, fund bounded discovery.'],
    ],
    snapshot: [
      ['Role', 'Product owner and builder, with AI development tools'],
      ['Type', 'Enterprise AI prototype (portfolio project)'],
      ['Data', 'Public BPI 2013 incident log, plus synthetic ticket text'],
      ['Status', 'Recommendation: HOLD (Oct 2026)'],
      ['Skills', 'Problem framing, AI evaluation, metrics, business case'],
    ],
    sections: [
      { label: 'Problem', title: 'Half of IT incidents change teams, and about 1 in 6 bounce straight back', type: 'bullets',
        intro: 'The pattern comes from one public incident log (BPI Challenge 2013). It shows where friction exists. It does not show why, or that it can be removed.',
        items: [
          '<b>7,554 incidents and 9,454 handoffs</b> between support teams: 1.25 handoffs per incident on average.',
          '<b>50.6%</b> of incidents touch more than one team.',
          '<b>15.6%</b> bounce directly from team A to B and back to A.',
          '<b>Hypothesis:</b> some bounces happen because the ticket\'s wording points to a different team than the one that ends up resolving it, and past resolutions could predict the right owner.',
        ],
        outro: 'Many transfers may be legitimate specialist escalations. Finding out how many is the first job of any real pilot.' },
      { label: 'Users', title: 'Three people share one request: the employee, the engineer and the manager', type: 'table',
        fig: { svg: D.ticketpilotFlow, cap: 'One request from report to confirmed outcome.', read: 'Read the top row left to right: an employee reports, the AI proposes a team, an engineer decides, the work is done, the employee confirms. Only the second box is AI; a person approves the route and the employee confirms the result. The bottom box is the manager, who watches the whole flow.' },
        head: ['Persona', 'Job to be done', 'Role in the product'],
        rows: [
          ['<b>Maya Rao</b>, sales employee', 'Get dashboard access back before a meeting', 'Describes the issue once, then confirms the outcome'],
          ['<b>Daniel Chen</b>, support engineer', 'Resolve the right work without repeating an investigation', 'Inspects the evidence, approves or overrides the route'],
          ['<b>Elena Park</b>, IT service manager', 'Improve service quality and plan support capacity', 'Sees handoffs, outcomes and review load'],
        ],
        outro: 'The personas and the company, Northstar, are fictional. They are not research participants or customers.' },
      { label: 'Key insight', type: 'quote',
        text: 'A convincing demo does not overturn a failed quality gate.',
        note: 'The prototype looks good on a hand-picked ticket. Across 50 held-out descriptions it did not beat a simple keyword rule. I kept the failed result and built the recommendation around it.' },
      { label: 'Hypotheses', title: 'Four things had to be true, and none is proven yet', type: 'table',
        head: ['Hypothesis', 'Evidence today', 'Next test'],
        rows: [
          ['A meaningful share of transfers is avoidable', 'Historical handoff patterns only', 'Service owners annotate a sample of real handoffs'],
          ['Ownership is predictable from ticket text', 'Failed on the synthetic test', 'Frozen holdout on real ticket text'],
          ['Retrieved fixes cut repeat investigation', 'Prototype shows sources; usefulness not rated', 'Blind rating of 50 or more suggestions'],
          ['A sponsor would fund a bounded pilot', 'A conditional cost model only', 'Sponsor and Finance workshop'],
        ] },
      { label: 'Goals and metrics', title: 'North Star: tickets resolved by the first owner, confirmed and not reopened', type: 'tree',
        ns: ['Durable first-owner resolution rate', 'Proposed, not yet instrumented. Share of cases the first accountable team resolved on time, the employee confirmed, and nobody reopened within 7 days.'],
        l1: [
          ['Handoffs per case', 'Historical baseline 1.25; the effect of the product is unmeasured'],
          ['Confirmation coverage', 'Share of cases where the employee\'s outcome is known'],
          ['Reopen rate', 'Guards against closing a ticket too early'],
        ],
        guard: '<b>Guardrails:</b> confident routing error and the human-review rate. <b>Rejected as North Star:</b> recommendations accepted (rewards trusting the AI) and tickets closed (rewards closing early).' },
      { label: 'Scope', title: 'I cut eight must-haves to five, keeping only what tests the core idea', type: 'table',
        head: ['Item', 'Call', 'Why'],
        rows: [
          ['Process analysis on the real incident log', '<b>Kept</b>', 'Grounds the problem in evidence'],
          ['Classification, with abstention and human approval', '<b>Kept</b>', 'The core of the product'],
          ['Fix suggestions with inspectable sources', '<b>Kept</b>', 'Retrieved, not generated, so each can be checked'],
          ['Frozen baseline comparison, failures reported', '<b>Kept</b>', 'AI has to beat a cheap alternative'],
          ['Executive pack: value model, rollout, scorecard', '<b>Kept</b>', 'Turns the result into a decision'],
          ['Voice input, alerts, learning dashboard, automatic fixes', 'Cut', 'Extensions before the core was proven'],
        ],
        outro: 'I used MoSCoW rather than RICE: the evidence did not support honest reach and impact numbers.' },
      { label: 'Solution', title: 'The product: AI proposes the owner, a person approves, the employee confirms', type: 'video',
        frame: 'plain', src: 'videos/ticketpilot-trailer.mp4', poster: 'images/ticketpilot-cover.webp', ratio: '16/9',
        alt: 'TicketPilot 60-second trailer: a sales employee reports an issue, the AI proposes a team, a support engineer approves, the employee confirms',
        cap: 'The 60-second trailer. Sample organisation; integrations and fixes are simulated.',
        still: { img: 'images/ticketpilot-routing.webp', alt: 'Daniel, the support engineer, approving the route TicketPilot proposed: Recommended team Applications, with similar resolved cases', cap: 'Daniel approves the proposed route. TicketPilot recommends; a person decides.' },
        tiles: [
          ['AI classifies, a person decides', 'TicketPilot proposes a team from matched past resolutions. Weak evidence abstains. The engineer approves or overrides.'],
          ['Fixes come with sources', 'Suggestions are retrieved from past resolution notes and current articles, not generated, so each can be inspected.'],
          ['Suggested is not done', 'A suggested fix, recorded work and the employee\'s confirmation are three separate steps.'],
        ],
        outro: 'Early feedback said it felt like a test summary and that people could not tell who does what. I changed it to lead with one request journey, named roles and a guided tour. That was feedback on the project, not customer interviews.' },
      { label: 'Decisions and trade-offs', title: 'Four calls that kept the AI honest', type: 'decisions', id: 'decisions',
        items: [
          { q: 'Inspectable retrieval, not an agent stack', chose: 'Direct retrieval and voting over similar past tickets', gave: 'The LLM agent stack in my original plan', why: 'Behaviour I can inspect, at low setup cost. It also means I cannot claim an LLM agent was built: it was not.' },
          { q: 'A person approves the route', chose: 'TicketPilot classifies; the engineer approves or overrides', gave: 'Fully automatic assignment', why: 'A wrong confident route costs more than a slower right one. Weak evidence abstains to a person.' },
          { q: 'Keep the failed result', chose: 'Report 10% against 90% and recommend HOLD', gave: 'A cleaner headline', why: 'Hiding the abstentions or the baseline would make the demo look better and the decision worse.' },
          { q: 'Count effort, not waiting', chose: 'Value only hands-on minutes, and count review as a cost', gave: 'The bigger number from elapsed delay', why: 'Hours a ticket waits are not hours someone worked. My first formula multiplied delay by volume; I replaced it.' },
        ] },
      { label: 'Evaluation', title: 'The test failed: 10% first-time-right against a 90% keyword baseline', type: 'table',
        head: ['Measure', 'Result', 'How to read it'],
        rows: [
          ['Keyword baseline, first-time-right', '<b>45 of 50 (90%)</b>', 'Frozen rules on the same descriptions'],
          ['TicketPilot, first-time-right', '<b>5 of 50 (10%)</b>', 'Abstentions count as not assigned'],
          ['Recommendation accuracy', '44 of 50 (88%)', 'Includes the team proposed on cases it held back'],
          ['Sent to human review', '45 of 50 (90%)', 'Little coverage, and a real review cost'],
          ['Wrong confident assignments', '0 of 5', 'Too few to show a low error rate: zero errors in 5 still allows about 45% at 95% confidence'],
        ],
        outro: 'The 50 test cases are five variants of ten authored scenarios, so they are synthetic and correlated. This is a failed comparison against a baseline, not a measure of real-world accuracy. The gate also needs review: beating a 90% baseline by 10 points requires 100%. That review has to happen before the next experiment, not after seeing its results.' },
      { label: 'Value case', title: 'Even if it worked, review effort decides whether the economics hold', type: 'table',
        intro: 'Base case, with every input assumed: 20,000 tickets a year, 25% fewer handoffs, 10 hands-on minutes per handoff, $45 an hour, 20% of tickets reviewed for 5 minutes, $12,000 to build and $6,600 a year to run. That gives about 710 net hours and $25,332 a year, with payback in 5.7 months.',
        head: ['Handoff reduction', 'Review share', 'Annual net value', 'Payback'],
        rows: [
          ['10%', '20%', '-$2,827', 'None'],
          ['<b>25% (base)</b>', '<b>20%</b>', '<b>$25,332</b>', '<b>5.7 months</b>'],
          ['50%', '20%', '$72,264', '2.0 months'],
          ['25%', '40%', '$10,332', '13.9 months'],
          ['25%', '90%', '-$27,168', 'None'],
        ],
        outro: 'The 90% row uses the review share the offline test actually showed. Even if the 25% reduction held, net value would be negative. None of this is realised saving, and the reduction has not been demonstrated.' },
      { label: 'Recommendation', title: 'So: hold the router and fund 90 days of gated discovery', type: 'table',
        intro: 'Authorise bounded discovery within an illustrative $12,000 build budget and hold deployment of the current router. Each stage is released only when its gate passes. These are my proposals, not approvals from anyone.',
        head: ['Stage', 'Work', 'Exit gate'],
        rows: [
          ['<b>Days 1 to 30</b>: discovery and offline quality', 'Validate the transfers and labels, interview users, measure effort, test on approved real ticket text', 'No live assignment. Pass the quality, review and safety gates, or rework or stop'],
          ['<b>Days 31 to 60</b>: one team, controlled', 'Shadow mode first, then human-approved routing on one registered cohort', 'Fewer handoffs, no worse p90 time, 60% of resolvers active weekly for two weeks'],
          ['<b>Days 61 to 90</b>: value validation', 'Mature the outcome cohorts; Finance validates effort and cost', 'Expand only with passing quality, adoption and safety, and payback within 12 months'],
        ],
        outro: '<b>What I would do differently:</b> compare against the cheap alternative first, get real ticket text earlier, and set the gate and the baseline together. I wrote a gate that demands 100% before I knew the baseline.' },
    ],
  },

  /* ===================== 03 ENSEMBLE (blog structure) ===================== */
  {
    file: 'case-ensemble.html', short: 'Ensemble', num: '03',
    title: 'Ensemble: an AI lead that directs cheaper AI workers',
    kicker: 'Case 03 · Developer tool · AI · Open source · 2026',
    stand: 'Developers pay a strong AI model\'s price for routine coding, and independent pieces of work wait in line behind each other.',
    desc: 'Ensemble, an open-source tool where a lead AI delegates coding to cheaper workers: why I built it, the cost ratio I use as the North Star, and a small study that found no clear saving at this size.',
    links: [{ label: 'GitHub repo ↗', href: 'https://github.com/VeeraPD/ensemble-mcp', primary: true }],
    lead: { art: 'a05', mesh: 'g-sky', alt: 'Abstract diagram of one lead routed to three workers' },
    tldr: [
      ['Problem', 'A strong model is used for routine implementation as well as hard decisions, and every helper pays for a long conversation it does not need.'],
      ['Product', 'An open-source tool: a lead model in Claude Code sets shared rules and splits the work; cheaper workers build in parallel and may only change their assigned files.'],
      ['North Star', 'Cost ratio per accepted task: team cost divided by solo cost, on work that passes the same frozen tests. Below 0.8 means a saving of at least 20%.'],
      ['Result', 'Small test: team 13.9% cheaper but 18.1% slower, so no clear saving at that size. A larger test with a frozen acceptance suite is next.'],
    ],
    snapshot: [
      ['Role', 'Product owner and builder; directed AI coding agents and reviewed the work'],
      ['Type', 'Open-source developer tool (MIT, version 0.1.0)'],
      ['Stack', 'Python standard library; works through MCP with compatible model providers'],
      ['Code', '<a href="https://github.com/VeeraPD/ensemble-mcp" rel="noopener">github.com/VeeraPD/ensemble-mcp</a>'],
      ['Skills', 'Workflow design, evaluation, cost against quality'],
    ],
    sections: [
      { label: 'Origin', title: 'It started with my iOS app, where API costs fell by more than half', type: 'prose',
        paras: [
          'While building an iOS app with AI coding agents, I let a strong model plan and review and handed routine pieces to a cheaper model. My API costs fell by more than 50%, and the parallel work finished faster than my solo runs.',
          'That is my own observation, not an audited result: I have no invoices or matched baseline. But it raised a question worth testing. When does splitting the work among models pay for the coordination it costs?',
        ] },
      { label: 'Problem', title: 'Strong models do the hard thinking and the routine typing, at the same price', type: 'bullets',
        items: [
          'Planning and review need a strong model. Writing routine code does not.',
          'Independent pieces of work run one after another, not together.',
          'Every helper that sees the whole long conversation pays for context it does not need.',
        ],
        outro: 'My audience hypothesis: solo builders and small teams on an API budget, who may later want cost attribution and limits on what an agent can change. There are no customers or revenue to report.' },
      { label: 'The idea', title: 'The idea: a strong lead plans and reviews, cheaper workers build in parallel', type: 'prose',
        fig: { svg: D.ensembleFlow, cap: 'How Ensemble splits a coding task.', read: 'Read left to right. The lead on the left sets the rules and hands each worker a focused brief. The three workers in the dashed box build in parallel, and the tool refuses any write outside a worker\'s own files. The lead on the right reviews and combines the result. In the benchmark the three parts were the data model, the command line and the tests.' },
        paras: [
          'In Ensemble the lead sets shared rules, such as interfaces and exact import paths, and divides the work. Each worker gets a short brief and only the files it needs. The tool checks that a worker writes only to its assigned files. The lead then reviews, combines and verifies, fixing small issues or delegating again.',
          'MCP is the connection that makes this delegation available inside the coding assistant people already use.',
        ] },
      { label: 'Decisions and trade-offs', title: 'Every decision is about where delegation earns back its coordination cost', type: 'decisions', id: 'decisions',
        items: [
          { q: 'One lead, cheaper workers', chose: 'A strong model plans and reviews; cheaper models implement', gave: 'The simplicity of one model', why: 'It matches capability and cost to the job. The lead\'s context, review and repairs can dominate spend, as the results show.' },
          { q: 'File ownership enforced in code', chose: 'Each worker may write only its assigned files, and the tool checks', gave: 'Letting workers roam', why: 'A boundary I can inspect beats a model\'s promise. It controls where writes go, not whether the code inside is right.' },
          { q: 'The lead owns the shared rules', chose: 'Exact interfaces and import paths before any work starts', gave: 'Less preparation', why: 'An early experiment failed when a worker guessed an import path the brief had not named.' },
          { q: 'A small surface', chose: 'Delegation, ownership, review and audit logs only', gave: 'Multi-model debate and voting, extra channels', why: 'Keeping the tool narrow keeps it reviewable. It never runs model-returned code: the lead runs the checks.' },
        ] },
      { label: 'Goals and metrics', title: 'North Star: what a task costs with the team, divided by what it costs solo, at the same quality', type: 'tree',
        ns: ['Cost ratio per accepted task', 'Team all-in cost (lead, workers and repairs) divided by solo all-in cost, both on work that passes the same frozen acceptance tests. Below 0.8 means at least a 20% saving.'],
        l1: [
          ['Time ratio', 'Team wall time divided by solo, verification included'],
          ['First-pass acceptance', 'Worker outputs the lead accepts unchanged'],
          ['Rejected-write rate', 'Writes refused by the ownership check'],
        ],
        guard: '<b>Why this number:</b> cheap output that fails review is not a saving, and a saving on code that fails the tests is not a saving either. Fixing the tests first makes the ratio comparable. <b>Rule:</b> claim a saving only if the ratio is 0.8 or lower across at least three matched pairs.' },
      { label: 'Tracking', title: 'How I track it: one usage record per model call, plus a frozen test suite', type: 'table',
        head: ['Metric', 'Definition', 'Data source', 'Status'],
        rows: [
          ['<b>Cost ratio (North Star)</b>', 'Team all-in cost / solo all-in cost on the same accepted task', 'Per-request usage records and the acceptance result', 'Cost recorded in the small study; ratio on a frozen suite is next'],
          ['Time ratio', 'Team wall time / solo wall time', 'Harness timer', 'Measured in the small study'],
          ['Lead share of spend', 'Lead cost / team cost', 'Usage records by model', 'Measured: about 88%'],
          ['First-pass acceptance', 'Worker outputs accepted unchanged / all outputs', 'Lead review log', 'To instrument'],
          ['Rejected-write rate', 'Refused writes / write attempts', 'Tool audit log', 'To instrument'],
          ['Repair share', 'Repair cost / total cost', 'Usage records tagged by phase', 'To instrument'],
        ],
        outro: 'Only cost, time and the lead\'s share of spend are measured so far. The rest are proposed instrumentation, and I will say so until they are logged.' },
      { label: 'Evidence', title: 'The first test: a small app, three runs each, and no clear saving', type: 'table',
        intro: 'I ran Claude Sonnet 4.5 on the same small to-do app, three solo runs and three with a lead plus workers, in alternating order.',
        head: ['Same small to-do app', 'Solo', 'Lead plus workers'],
        rows: [
          ['Mean API cost', '$0.245', '<b>$0.211</b> (13.9% lower)'],
          ['Cost range', '$0.240 to $0.254', '$0.195 to $0.237'],
          ['Mean time', '103 s', '<b>122 s</b> (18.1% longer)'],
          ['Share of team cost from the lead', 'Not applicable', 'About 88%'],
        ],
        outro: 'I set the rule before running: at least 20% lower cost with ranges that do not overlap. The saving is under 20% and the ranges overlap, so the verdict is <b>no clear cost saving at this size</b>. This is why the case is about counting the lead: my first worker-only story overstated the saving. All six runs passed their own tests, but the suites differ, so that is not a common quality check.' },
      { label: 'What each number can support', title: 'Not every number means the same thing: observation, measurement or hypothesis', type: 'table',
        head: ['Claim', 'What it rests on'],
        rows: [
          ['More than 50% lower API cost on my iOS app', 'My own observation. No invoices or matched baseline'],
          ['13.9% lower cost, 18.1% slower', '<b>Measured:</b> 3 solo and 3 team runs on one small app, lead included'],
          ['12.5% lower team cost with Opus 5.5', 'One interrupted pair of runs. Not a clean comparison'],
          ['Worker execution about 3.6 times faster', 'One earlier trial, workers only, a different task. Raw logs not found'],
          ['Bigger gains on larger, well-divided projects', 'A hypothesis. Untested'],
        ],
        outro: 'The 50% figure is not a result of the six-run study, and the 3.6 times figure is not delivery speed. Mixing them up is the easiest way to overclaim.' },
      { label: 'What I learned', title: 'Three lessons: exact handoffs, a frozen finish line, and count the lead', type: 'bullets',
        items: [
          '<b>Exact handoffs matter.</b> A worker guessed an import path the brief had not named. Specify interfaces and paths, not just types.',
          '<b>Agree the finish line before generating.</b> A shared acceptance suite, written afterwards, split the runs on one edge case: all three Sonnet solo runs reused task IDs after everything was deleted, while the team and Opus runs did not. The contract was ambiguous on it. Next time the suite is frozen first.',
          '<b>Count the lead.</b> About 88% of team spend still came from the lead. Benefit depends on how well the task divides, not on its size.',
        ] },
      { label: 'Next', title: 'Next: a larger task, a frozen test and three matched pairs, with the repo open to try', type: 'prose',
        paras: [
          'The next experiment is a larger task with clearly independent parts. I will freeze the acceptance suite before any code is generated, run three matched pairs with the same model, tool version and permissions, and count review and repair in cost and time. Team-level cost attribution and policies come later, only if demand shows up.',
          'The tool is open source under the MIT licence. Code and issues: <a href="https://github.com/VeeraPD/ensemble-mcp" rel="noopener">github.com/VeeraPD/ensemble-mcp</a>.',
        ] },
    ],
  },

  /* ===================== 04 VOICE CAPTURE ===================== */
  {
    file: 'case-voice-capture.html', short: 'Voice capture', num: '04',
    title: 'Voice capture for Hinglish: testing whether to build',
    kicker: 'Case 04 · Discovery · In progress · 2026',
    stand: 'Phone speech-to-text works for American English but breaks on Indian accents and on Hinglish, the Hindi-English mix many Indians speak every day.',
    desc: 'A discovery study on speech-to-text for Hinglish and Indian accents: hypotheses, an engine comparison, unit economics and a build, pivot or kill rule. In progress.',
    lead: { art: 'a03', mesh: 'g-rose', alt: 'Abstract sound wave' },
    tldr: [
      ['Problem', 'Built-in recognition gets regional accents and Hinglish wrong. I saw it first-hand transcribing my own long Hindi-English recordings.'],
      ['Product', 'Not built yet. A pre-build study of four speech engines, scored on real recordings, to decide whether a paid product is worth building.'],
      ['Decision metric', 'Hinglish word error rate against Apple\'s free engine: build only if the best engine cuts it by 25% or more and the heavy-user cost stays under 40% of the plan price.'],
      ['Status', 'In progress. No engine winner, willingness to pay or build decision yet. Findings will be published here, a kill included if that is what the data says.'],
    ],
    snapshot: [
      ['Role', 'Framing, research, model evaluation, business case'],
      ['Type', 'Discovery and evaluation study (pre-build)'],
      ['Status', 'In progress, October 2026'],
      ['Skills', 'User research, AI evaluation, unit economics, build-or-kill judgment'],
    ],
    sections: [
      { label: 'Problem', title: 'Phone speech-to-text is built for American English and breaks for many Indian speakers', type: 'bullets',
        items: [
          'Regional accents and dialects produce wrong words and broken sentences.',
          'Indians often mix Hindi and English in one sentence. Built-in engines handle this badly.',
          'I saw this first-hand: built-in phone recognition struggled with local accents, and transcribing my own long Hindi-English recordings took real effort.',
        ] },
      { label: 'Users', title: 'Students are easy to test with, but sales and client-facing professionals are who would pay', type: 'table',
        fig: { svg: D.voiceSegments, cap: 'Who to test with, and who to ask about paying.', read: 'The horizontal axis is how easy a group is for me to reach; the vertical axis is how much they would pay. Students sit bottom right: easy to reach, so they test transcript accuracy. Sales professionals sit top left: harder to reach but most willing to pay, so I interview them directly. The dashed arrow shows the split: accuracy from students, willingness to pay from sales.' },
        head: ['Segment', 'Use case', 'Willingness to pay'],
        rows: [
          ['<b>Students (for testing)</b>', 'Record lectures, get notes and summaries', 'Low to medium; easy to reach'],
          ['<b>Sales and client-facing professionals</b>', 'Calls and meetings in mixed language', 'High. Globally, sales teams bring most AI notetaker revenue (Sacra on Otter.ai)'],
          ['Field workers and SMB owners', 'Voice notes instead of typing', 'Medium; large but harder to reach'],
        ] },
      { label: 'Hypotheses', title: 'Three hypotheses decide whether this gets built', type: 'bullets',
        items: [
          '<b>H1. The gap is in Hinglish and regional accents,</b> not Indian English overall. A general engine can look fine on average and still fail the users who need it most.',
          '<b>H2. An India-first engine closes the gap.</b> At least one engine cuts Hinglish word errors by 25% or more against Apple\'s free baseline.',
          '<b>H3. The economics work for one paying segment.</b> A heavy user\'s monthly audio cost is under 40% of a plan price that segment says it would pay.',
        ] },
      { label: 'Research plan', title: 'The plan: interview buyers, and run four engines on the same real clips', type: 'steps',
        fig: { svg: D.voicePipeline, cap: 'The technical test as a pipeline.', read: 'Read left to right. Real clips and an open Indian-accent dataset feed all four engines, including Apple\'s free engine as the baseline. Every engine is scored the same way: word error rate by accent and by language mix, plus speed and cost per hour. The decision rule on the right was written before any clip was tested, so one number drives the call: build, pivot or kill.' },
        items: [
          ['Buyer interviews', 'Sales and client-facing professionals, the segment most likely to pay: how they capture calls today, where voice fails them, and what they pay for now. Students answer the same workflow questions, but their answers are not evidence of willingness to pay.'],
          ['Accent test', '20 to 30 real clips (lectures, client calls, Hindi-English mixes) from speakers across India, plus open Indian-accent data such as AI4Bharat\'s Svarah set.'],
          ['Engines compared', 'Sarvam (built for Indian languages), OpenAI\'s mini transcription model, Deepgram Nova-3 (Hinglish mode), and Apple\'s built-in engine as the free baseline.'],
          ['Metric', 'Word error rate (WER) by accent and by language mix, plus speed and cost per hour.'],
        ] },
      { label: 'Decision rule', title: 'The rule, set before the first clip: build, pivot or kill on one number', type: 'table',
        head: ['If the data shows', 'Then'],
        rows: [
          ['The best engine cuts Hinglish WER by 25% or more against Apple\'s baseline, <i>and</i> its heavy-user cost is under 40% of a plan price the paying segment accepts', '<b>Build</b> a narrow pilot for that segment'],
          ['The best engine improves Hinglish WER by less than 25%', '<b>Pivot</b>: compete on output (summaries, action items) on top of free transcripts'],
          ['Every engine, including the best, gets more than 1 word in 4 wrong on Hinglish', '<b>Kill</b> for now: correcting the transcript takes longer than typing notes. Revisit when models improve'],
        ],
        outro: 'If the accuracy bar is met but the cost bar is not, the answer is a pivot to capped plans, not a build.' },
      { label: 'Engines', title: 'Four engines, priced per hour of audio', type: 'table',
        head: ['Engine', 'Built for', 'Cost per hour (list, Oct 2026)', 'WER'],
        rows: [
          ['Sarvam', 'Indian languages', 'Rs 30', 'In testing'],
          ['OpenAI mini transcribe', 'General, multilingual', 'About $0.18 ($0.003 a minute)', 'In testing'],
          ['Deepgram Nova-3', 'General, with a Hinglish mode', 'About $0.46 ($0.0077 a minute)', 'In testing'],
          ['Apple built-in', 'On-device baseline', 'Free', 'In testing'],
        ] },
      { label: 'Unit economics', title: 'A heavy student costs about Rs 660 a month, which points the price at sales teams', type: 'prose',
        paras: [
          'One 1-hour lecture a day for a month (about 22 hours) costs about <b>Rs 660</b> on Sarvam or about <b>$4</b> on OpenAI\'s mini model at list prices.',
          'To keep audio under 40% of revenue, that heavy user\'s plan would need to cost about <b>Rs 1,650 a month on Sarvam</b>, or about <b>$10 on OpenAI\'s mini model</b>. Students rate their willingness to pay low to medium, so heavy student use cannot be profitable without an hours cap. Prices at that level point to sales and client-facing professionals, which is why the buyer interviews go to them.',
        ] },
      { label: 'Decisions and trade-offs', title: 'Four calls: test first, pick the accent winner, price by hours, compete above the transcript', type: 'decisions', id: 'decisions',
        fig: { after: true, svg: D.voiceShape, cap: 'The product shape if the study says build.', read: 'Read left to right. Audio is captured on a phone, sent to the engine that won the accent test (Apple on-device is the offline backup), and becomes a transcript. The transcript is a commodity that phone makers give away, so the product competes in the dashed area on the right: summaries, action items and exports for one user group.' },
        items: [
          { q: 'Test before build', chose: '1 to 2 weeks of evaluation first', gave: 'Speed to a demo', why: 'Choosing an engine by assumption risks building on the wrong base.' },
          { q: 'Cloud engine over on-device', chose: 'Pick the winner of the accent test; keep Apple\'s engine as an offline backup', gave: 'Free, private, offline-first', why: 'Accuracy on local accents is the whole product.' },
          { q: 'Pricing model', chose: 'Monthly plans with an hours allowance', gave: 'A simple one-time price', why: 'Every hour of audio costs money. A one-time price loses money on heavy users.' },
          { q: 'Differentiation', chose: 'Win on output: summaries, action items, exports for one user group', gave: 'Competing on raw transcription', why: 'Phone makers keep improving free recorders. Raw transcripts will become a commodity.' },
        ] },
      { label: 'Status and next', title: 'Next: finish the accent test, make the call, and publish the number', type: 'road',
        cols: [
          ['Now', ['Finish the accent test', 'Fill the WER table']],
          ['Next', ['Make the build, pivot or kill call', 'Publish it here, with the number']],
          ['Later', ['If build: a pilot with one student cohort', 'If pivot: summaries on top of free transcripts']],
        ],
        outro: '<b>So far I have learned:</b> writing the build, pivot or kill rule before testing keeps the study honest, and averages hide the problem, so the test is built around the users a general engine fails.' },
    ],
  },

  /* ===================== FUN: ALPINE SKIES (blog structure) ===================== */
  {
    file: 'case-alpine-skies.html', short: 'Alpine Skies', num: 'Fun', lab: true, tag: 'Fun project',
    title: 'Alpine Skies: a flight sim that starts in under a minute',
    kicker: 'Fun project · B2C · Live · 2026',
    stand: 'Casual plane fans choose between heavy simulators that take hours to learn and web games that feel cheap. Nothing good starts in a browser tab in under a minute.',
    desc: 'Alpine Skies, a free browser flight sim: why every early decision optimised for time to first flight, and how it is measured.',
    links: [{ label: 'Play it ↗', href: 'https://alpine-skies.vercel.app', primary: true }],
    lead: { img: 'images/alpine-cover.webp', w: 1600, h: 900, ratio: '16/9', alt: 'Alpine Skies key art: a jet flying down a green Swiss valley toward a ring. Fly the Swiss Alps.' },
    tldr: [
      ['Problem', 'Serious sims need a strong PC and hours to learn. Quick web games load fast but feel cheap and give no reason to return.'],
      ['Product', 'A free flight sim over the Swiss Alps that runs in a browser tab: guest play, missions by length, a difficulty ladder and a daily challenge.'],
      ['North Star', 'Missions completed per weekly player: it captures both engagement and progress.'],
      ['Result', 'Live. A performance pass cut cold load from 8.4 s to about 4.6 s. Player numbers are not published yet; the first-mission funnel comes next.'],
    ],
    snapshot: [
      ['Role', 'Product, design and build with AI coding tools'],
      ['Platform', 'Web browser (WebGL), no install'],
      ['Status', 'Live, version 1.23 (Oct 2026)'],
      ['Skills', 'Execution, engagement design, metrics, AI-assisted building'],
    ],
    sections: [
      { label: 'Problem', title: 'Casual pilots have no middle ground between a heavy sim and a cheap web game', type: 'prose',
        paras: [
          'Casual players who like planes have two bad options. Serious sims such as Microsoft Flight Simulator need a strong PC, a big download and hours to learn. Quick web games load fast but feel cheap and give no reason to come back.',
          'There was no middle ground: a good-looking flight you can start in a browser tab in under a minute.',
        ] },
      { label: 'Users', title: 'Two needs, one loop: players who want a quick flight and players who want to learn', type: 'prose',
        fig: { svg: D.alpineJourney, cap: 'One player journey, two needs.', read: 'Read left to right: open the tab, start as a guest, first flight, first mission, come back. The two chips on top show which need each step serves: a quick flight is met at the first flight, learning is met at the first mission through Flight School. Each step has its own funnel metric, and the arrow at the bottom is the Daily Challenge pulling players back into missions.' },
        paras: [
          'A quick, good-looking flight is the primary need, for casual aviation fans on a laptop with no setup. Learning to fly without feeling lost is the second, for people curious about flying but new to sims.',
          'Returning is a stage, not a third kind of player: a beginner can also be a returning player. So return is measured as a funnel step for both needs, and the Daily Challenge, leaderboard and stars serve both.',
        ] },
      { label: 'Key insight', type: 'quote',
        text: 'The first 60 seconds decide everything.',
        note: 'A browser game competes with every other tab. If a player hits a sign-up form or a confusing cockpit, they close the tab. So every early decision optimised for time to first flight. Depth comes later, once the player cares.' },
      { label: 'Goals and metrics', title: 'North Star: missions completed per weekly player', type: 'tree',
        ns: ['Missions completed per weekly player', 'It captures both engagement and progress.'],
        l1: [
          ['First flight started', 'Share of visitors in the air within a minute'],
          ['First mission completed', 'Share of new players who finish a mission in session 1'],
          ['Return within 7 days', 'Share of new players who come back'],
        ],
        guard: '<b>Health:</b> frame rate on low-end laptops, and load time.' },
      { label: 'Decisions and trade-offs', title: 'Four calls, one of which I would undo', type: 'decisions', id: 'decisions',
        items: [
          { q: 'Guest start', chose: 'Play instantly as a guest; save codes move progress across devices', gave: 'Early email capture for growth', why: 'Sign-up friction kills first sessions.' },
          { q: 'Visual quality vs speed', chose: 'Balanced visuals against frame rate on average laptops', gave: 'Peak graphics', why: 'A beautiful game that stutters loses players anyway. This is the call behind the 8.4 s to 4.6 s load cut.' },
          { q: 'Retention loop', chose: 'Daily Challenge, achievements, leaderboard, stars and coins', gave: 'Build time on new aircraft and maps', why: 'New content is expensive to build; reasons to return are cheap. A bet, not yet measured: the 7-day return rate will test it.' },
          { q: 'Five modes', chose: 'Flight School, Campaign, Free Flight, Quick Challenges, Daily Challenge', gave: 'A single polished mode', why: 'Each mode served a different need. But it broke my own rule about the first 60 seconds: play-testing found the menus confusing. For new players this was a mistake.' },
        ] },
      { label: 'Solution', title: 'The product: from tab to cockpit in seconds', type: 'video',
        frame: 'browser', url: 'alpine-skies.vercel.app', src: 'videos/alpine-skies-demo.mp4', poster: 'images/alpine-flight.webp', ratio: '2/1',
        alt: 'Alpine Skies demo: home screen, picking a mission, and flying through rings over the Meiringen valley',
        cap: 'Demo: open the tab, pick a mission, fly.',
        still: { img: 'images/alpine-flight.webp', alt: 'In flight: the objective, distance to the next ring and the keys to press', cap: 'In flight: the objective, the next ring and the keys, on screen.' } },
      { label: 'What shipped', title: 'What shipped: logins, missions on a map and a leaderboard', type: 'shots',
        shots: [
          { img: 'images/alpine-home.webp', w: 1400, h: 700, alt: 'Home screen: the next mission, missions, free flight, a daily challenge and the flying style', cap: 'Home: the next mission first, then the other modes and the flying style.' },
          { img: 'images/alpine-missions.webp', w: 1366, h: 768, alt: 'Missions on a terrain map, filtered by length, with star goals', cap: 'Missions on a map, sorted by length, with clear star goals.' },
        ] },
      { label: 'Execution', title: 'Play-test feedback drove versions 1.15 to 1.23', type: 'prose',
        paras: [
          'I rebuilt the game on real terrain, the Bernese Oberland from swisstopo open data, tuned to run on laptop graphics. Play-testing then showed the menus and levels were confusing, there was not enough to do, and progress was not saved.',
          'Versions 1.15 to 1.23 answered that with missions sorted by length, Flight School, a daily challenge, guest saves, a leaderboard and clearer in-flight guidance. I then added product analytics on the web build, and accounts, progress saves and the leaderboard in Supabase, so the next round is judged on what players do.',
        ] },
      { label: 'Experiment', title: 'Planned: an A/B test on whether a guided first flight beats the mode menu', planned: true, type: 'bullets',
        fig: { after: true, svg: D.alpineExperiment, cap: 'The onboarding test.', read: 'Two rows, same start and same finish. The top row is today: open the tab, pick one of five modes, wait for it to load, reach the first mission. The bottom row is the variant, which removes the mode menu and drops the player into a 60-second guided flight. Both are measured at the same point on the right: a mission completed in session 1.' },
        items: [
          '<b>Hypothesis:</b> dropping players straight into a 60-second guided flight raises first-mission completion.',
          '<b>Primary metric:</b> share of new players who complete a mission in session 1. <b>Guardrail:</b> 7-day return rate must not fall.',
          '<b>Decision rule:</b> ship the guided start if completion rises with no drop in return; otherwise keep the menu and test a shorter Flight School.',
          '<b>Traffic check first:</b> if there are too few new players each week for an A/B test, compare the funnel before and after and run moderated play sessions instead. The result will say which method was used.',
        ] },
      { label: 'Results', title: 'Results so far: live and faster, with player numbers still to come', type: 'table',
        head: ['Measure', 'Result'],
        rows: [
          ['Status', '<b>Live</b> with logins, missions, a leaderboard and a cloud backend'],
          ['Cold load, Intel Iris Xe laptop', '<b>8.4 s to about 4.6 s</b> after a performance pass (version 1.15)'],
          ['Feedback that changed the product', '"Menus and levels are confusing; not enough to do." Led to missions by length, Flight School and the daily challenge'],
          ['Player funnel', 'Not published yet: visitors, first flight, first mission, 7-day return'],
        ] },
      { label: 'What I learned', title: 'The tools built it, the calls stayed mine, and my own rule caught my mistake', type: 'prose',
        paras: [
          'AI coding tools sped up the build. The product decisions, scope and quality bar stayed mine.',
          'My first-60-seconds rule was right, and I broke it with five modes. Writing the rule down is what made the mistake visible. Next: publish the player funnel, run the onboarding test, and try a fake-door test for cosmetic aircraft before building any.',
        ] },
    ],
  },
];

/* ----------------------------------------------------------------------------
   TEMPLATE
   ---------------------------------------------------------------------------- */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const SYMBOLS = {
  a03: '<symbol id="a03" viewBox="0 0 200 150"><g transform="translate(100 75) scale(.95)" fill="currentColor"><rect x="-72" y="-5" width="8" height="10" rx="4"/><rect x="-56" y="-13" width="8" height="26" rx="4"/><rect x="-40" y="-22" width="8" height="44" rx="4"/><rect x="-24" y="-15" width="8" height="30" rx="4"/><rect x="-8" y="-29" width="8" height="58" rx="4"/><rect x="8" y="-18" width="8" height="36" rx="4"/><rect x="24" y="-9" width="8" height="18" rx="4"/><rect x="40" y="-24" width="8" height="48" rx="4"/><rect x="56" y="-12" width="8" height="24" rx="4"/></g></symbol>',
  a05: '<symbol id="a05" viewBox="0 0 200 150"><g transform="translate(100 75) scale(.95)" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M-52 0H-6M-6 0L40 -44M-6 0H40M-6 0L40 44"/><circle cx="-58" cy="0" r="13" fill="currentColor" stroke="none"/><circle cx="-6" cy="0" r="8"/><rect x="40" y="-60" width="34" height="32" rx="7" fill="currentColor" opacity=".45" stroke="none"/><rect x="40" y="-16" width="34" height="32" rx="7" fill="currentColor" opacity=".45" stroke="none"/><rect x="40" y="28" width="34" height="32" rx="7" fill="currentColor" opacity=".45" stroke="none"/></g></symbol>',
};

function section(s, i) {
  const id = `s${i}`;
  const planned = s.planned ? '<span class="tag-planned">Planned</span>' : '';
  const h2 = s.title ? `<h2 id="${id}">${s.title}${planned}</h2>` : `<h2 id="${id}" class="vh">${s.label}</h2>`;
  const intro = s.intro ? `<p class="intro">${s.intro}</p>` : '';
  const outro = s.outro ? `<p class="outro">${s.outro}</p>` : '';
  let body = '';
  switch (s.type) {
    case 'bullets': body = `<ul class="blist">${s.items.map((t) => `<li>${t}</li>`).join('')}</ul>`; break;
    case 'prose': body = `<div class="prose">${s.paras.map((p) => `<p>${p}</p>`).join('')}</div>`; break;
    case 'table': body = `<div class="tblwrap"><table class="tbl"><thead><tr>${s.head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${s.rows.map((r) => `<tr>${r.map((c, k) => `<td data-label="${esc(s.head[k].replace(/<[^>]+>/g, ''))}">${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; break;
    case 'steps': body = `<ol class="steps">${s.items.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join('')}</ol>`; break;
    case 'quote': body = `<p class="quote">${s.text}</p>${s.note ? `<p class="note">${s.note}</p>` : ''}`; break;
    case 'shots': body = `<div class="shots">${s.shots.map((x) => `<figure><div class="frame"><img src="${x.img}" width="${x.w}" height="${x.h}" alt="${esc(x.alt)}" loading="lazy" decoding="async"></div><figcaption>${x.cap}</figcaption></figure>`).join('')}</div>`; break;
    case 'tree': body = `<div class="tree"><div class="ns"><span class="label">North Star</span><b>${s.ns[0]}</b><span>${s.ns[1]}</span></div><div class="ls" style="--n:${s.l1.length}">${s.l1.map(([b, t]) => `<div class="l1"><b>${b}</b><span>${t}</span></div>`).join('')}</div>${s.guard ? `<p class="guard">${s.guard}</p>` : ''}</div>`; break;
    case 'road': body = `<div class="road">${s.cols.map(([h, items]) => `<div><p class="label">${h}</p><ul>${items.map((t) => `<li>${t}</li>`).join('')}</ul></div>`).join('')}</div>`; break;
    /* video: shown only once the file exists in prototype/videos. Until then: the still (s.still) if given, otherwise nothing. Never "coming soon". */
    case 'video': {
      const has = existsSync(join(OUT, s.src));
      const frame = (media, cap) => `<figure><div class="vframe ${s.frame === 'browser' ? 'browser' : ''}">${s.url ? `<span class="url">${s.url}</span>` : ''}${media}</div><figcaption class="vcap">${cap}</figcaption></figure>`;
      const fig = has
        ? frame(`<video controls muted loop playsinline preload="metadata" poster="${s.poster}" style="--vr:${s.ratio}" aria-label="${esc(s.alt)}"><source src="${s.src}" type="video/mp4"></video>`, s.cap)
        : s.still ? frame(`<img src="${s.still.img}" style="display:block;width:100%;height:auto;aspect-ratio:${s.ratio};object-fit:cover" alt="${esc(s.still.alt)}" loading="lazy" decoding="async">`, s.still.cap) : '';
      body = `${fig}${s.tiles ? `<div class="tiles">${s.tiles.map(([b, t]) => `<div><b>${b}</b><span>${t}</span></div>`).join('')}</div>` : ''}`;
      break;
    }
    case 'decisions': body = `<div class="decs">${s.items.map((d, k) => `
          <article class="dec">
            <h3><span>${String(k + 1).padStart(2, '0')}</span>${d.q}</h3>
            <div class="opts">
              <div class="opt chosen"><p class="label">What I chose <span class="tick">Chosen</span></p><p>${d.chose}</p></div>
              <div class="opt"><p class="label">What I gave up</p><p>${d.gave}</p></div>
            </div>
            <p class="why"><b>Why.</b> ${d.why}</p>
          </article>`).join('')}</div>`; break;
  }
  /* figures: s.fig = { svg, cap, after } or an array of them; drawn before the body unless after:true */
  const figs = [].concat(s.fig || []);
  const fig = (f) => `<figure class="fig${f.after ? ' after' : ''}"><div class="dgwrap">${f.svg()}</div><p class="swipe" aria-hidden="true">Scroll sideways for the full diagram →</p><figcaption>${f.cap}${f.read ? ` <span class="how"><b>How to read it.</b> ${f.read}</span>` : ''}</figcaption></figure>`;
  const before = figs.filter((f) => !f.after).map(fig).join('');
  const after = figs.filter((f) => f.after).map(fig).join('');
  return `
    <section class="sec"${s.id ? ` id="${s.id}"` : ''} aria-labelledby="${id}">
      <p class="label">${s.label}</p>
      <div>
        ${h2}
        ${intro}${before}${body}${outro}${after}
      </div>
    </section>`;
}

/* the section titles in order: read alone they tell the whole case */
function story(c) {
  const items = c.sections.map((s, i) => (s.title ? `<li><a href="#s${i}">${s.title}</a></li>` : '')).join('');
  return `<nav class="story" aria-label="The case in headlines"><p class="label">The case in headlines</p><ol>${items}</ol></nav>`;
}

function page(c, prev, next) {
  const lead = c.lead.img
    ? `<figure class="lead-img"><img src="${c.lead.img}" width="${c.lead.w}" height="${c.lead.h}" style="aspect-ratio:${c.lead.ratio}" alt="${esc(c.lead.alt)}" decoding="async"></figure>`
    : `<div class="lead-img art grain mesh ${c.lead.mesh}" role="img" aria-label="${esc(c.lead.alt)}"><svg aria-hidden="true"><use href="#${c.lead.art}"/></svg></div>`;
  const links = [...(c.links || []), { label: 'Skip to the decisions', href: '#decisions' }]
    .map((l) => `<a class="pill${l.primary ? '' : ' ghost'}" href="${l.href}"${l.href.startsWith('http') ? ' rel="noopener"' : ''}>${l.label}</a>`).join('');
  const sym = c.lead.art ? `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">${SYMBOLS[c.lead.art]}</svg>\n` : '';
  const tldr = `<div class="tldr" aria-label="TL;DR">${c.tldr.map(([k, v]) => `<div><p class="label">${k}</p><p>${v}</p></div>`).join('')}</div>`;
  const snap = c.snapshot.map(([k, v]) => `<div><dt class="label">${k}</dt><dd>${v}</dd></div>`).join('\n      ');
  const tag = c.lab ? (c.tag || 'AI Lab') : `Case ${c.num}`;
  const home = c.lab ? 'index.html#fun' : 'index.html#work', homeTxt = c.lab ? 'Fun projects' : 'All work';
  const pn = `
    <nav class="pn" aria-label="More cases">
      ${prev ? `<a href="${prev.file}"><span class="label">← Case ${prev.num}</span><b>${prev.short}</b></a>` : `<a href="${home}"><span class="label">← ${homeTxt}</span><b>Back to the index</b></a>`}
      ${next ? `<a href="${next.file}"><span class="label">Case ${next.num} →</span><b>${next.short}</b></a>` : `<a href="${home}"><span class="label">${homeTxt} →</span><b>Back to the index</b></a>`}
    </nav>`;
  return `<!doctype html>
<html lang="en" data-mode="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${c.short} · ${tag} · R. Veera Manoharan</title>
<script>(function(){var r=document.documentElement,m=null,mo=null;try{m=localStorage.getItem('mode');mo=localStorage.getItem('motion')}catch(e){}r.setAttribute('data-mode',m==='cream'?'cream':'dark');if(mo==='off')r.setAttribute('data-paused','true')})();</script>
<meta name="description" content="${esc(c.desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;1,6..72,300&display=swap">
<link rel="stylesheet" href="case.css">
</head>
<body>
${sym}<a class="skip" href="#main">Skip to content</a>
<div class="page">
  <header class="top">
    <a class="logo" href="index.html" aria-label="Veera, home">
      <svg viewBox="0 0 30 30" aria-hidden="true"><path class="dot" d="M15 2.5C22 2 28 7 27.5 15 27 23 21 28 14 27.5 7 27 2.5 21 3 14 3.5 7.5 9 3 15 2.5Z"/><path class="mk" d="M9 11l6 10 6-10" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Veera</a>
    <div class="hright">
      <a class="back" href="${home}">← <span>${homeTxt}</span></a>
      <button class="iconbtn" id="mode" type="button" aria-label="Switch to light theme">
        <svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>
        <svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 14.6A8 8 0 0 1 9.4 4.5a8 8 0 1 0 10.1 10.1Z"/></svg>
      </button>
    </div>
  </header>

  <main id="main">
    <header class="open">
      <p class="label">${c.kicker} · ${readTime(c)}</p>
      <h1>${c.title}</h1>
      <p class="label ps">Problem statement</p>
      <p class="stand">${c.stand}</p>
      <p class="links">${links}</p>
      ${lead}
      ${tldr}
    </header>

    ${story(c)}
    <dl class="summary" style="--cols:${c.snapshot.length}">
      ${snap}
    </dl>
${c.sections.map(section).join('\n')}
${pn}
  </main>
  <footer class="legal"><span>© R. Veera Manoharan</span><span>${tag}</span></footer>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="case.js"></script>
</body>
</html>
`;
}

/* read time from the words a reader actually sees (about 230 words a minute, figures count as a little) */
function readTime(c) {
  const text = JSON.stringify(c, (k, v) => (['file', 'img', 'src', 'poster', 'svg', 'alt', 'desc', 'href', 'mesh', 'art'].includes(k) ? undefined : v)).replace(/<[^>]+>/g, ' ');
  const words = text.split(/[^A-Za-z0-9À-ÿ']+/).filter(Boolean).length;
  return `${Math.max(2, Math.round(words / 230))} min read`;
}

/* lab pages sit outside the numbered case chain: no prev/next to or from them */
const chain = CASES.filter((c) => !c.lab);
CASES.forEach((c) => {
  const i = chain.indexOf(c);
  writeFileSync(join(OUT, c.file), page(c, i > 0 ? chain[i - 1] : null, i >= 0 ? chain[i + 1] : null));
  console.log(`${c.file}  ${c.sections.length} sections  ${readTime(c)}`);
});
