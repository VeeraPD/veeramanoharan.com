// Builds the case pages (case-*.html) from the CASES data below.
// Structure: a PM case (TL;DR → context → evidence → users → goals and metrics → options and
// prioritisation → solution → decisions → execution → risks → results vs targets → learnings → roadmap).
// Source: "PM Case Studies - Veera Manoharan" (21 Oct 2026). Where that doc had a gap, this file uses
// reasonable draft content; every such item is listed in WIPlist.md for Veera to confirm or fix.
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
  /* ===================== 01 ATÉLIER (hero case, most depth) ===================== */
  {
    file: 'case-atelier.html', short: 'Atélier', num: '01',
    title: 'Atélier: an AI notes app for iPad',
    kicker: 'Case 01 · B2C · AI · Built · 2026',
    stand: 'Handwriting-first notes you can search by meaning and summarise in one tap. I took it from a problem I lived as an MBA student to a feature-complete iPad app, solo.',
    desc: 'Atélier, a handwriting-first notes app for iPad: the problem, the bets, the scope calls and how success is measured.',
    lead: { img: 'images/atelier-cover.webp', w: 1600, h: 1200, ratio: '4/3', alt: 'Atélier on two iPads: the note library with "Search your handwriting", and a handwritten page with an "echo of past notes" hint' },
    tldr: [
      ['Problem', 'Students write pages of notes on iPad and cannot find them again. Keyword search fails when you do not remember the exact words you wrote.'],
      ['What I did', 'Ran discovery with classmates, bet on search by meaning, cut v1 to two AI features, and designed and built the app in Swift.'],
      ['Status', 'Feature-complete and demoed to IIM Lucknow faculty in October 2026. No user results yet: a 20-query search eval and a 10 to 15 student beta come next, with targets set below.'],
    ],
    snapshot: [
      ['Role', 'Solo: research, product, design, build (Swift)'],
      ['Platform', 'iPad with Apple Pencil'],
      ['Timeline', 'July to October 2026'],
      ['Status', 'Feature-complete; faculty demo, Oct 2026'],
      ['Skills', 'Product sense, AI product judgment, 0-to-1 execution'],
    ],
    sections: [
      { label: 'Context', title: 'Why this, why now', type: 'prose',
        paras: [
          'At IIM Lucknow most of my cohort takes notes by hand on an iPad. Classes move fast, quizzes come often, and the notes pile up across subjects and weeks.',
          'Two things changed recently. Handwriting recognition on iPad became good enough to trust, and language models made it practical to search a person\'s own notes by meaning, not just by matching words. That opened a gap: handwritten notes are still treated as pictures you scroll, not knowledge you can ask.',
        ] },
      { label: 'Problem', title: 'Pages of notes, never found again', type: 'bullets',
        intro: 'In conversations with classmates before quizzes and case discussions, the same three frustrations came up.',
        items: [
          '<b>Search fails on memory.</b> People remember the idea from class, not the exact words they wrote, so keyword search comes back empty.',
          '<b>Review is manual.</b> Preparing for a quiz means scrolling notebook by notebook, page by page.',
          '<b>The workaround costs thinking.</b> Switching to typed notes makes search easy but loses the sketches, arrows and structure that come with writing by hand.',
        ] },
      { label: 'Users', title: 'Who it is for, and who it is not', type: 'table',
        fig: { svg: D.atelierJourney, cap: 'The primary persona\'s moment before a quiz, today and with Atélier. The whole difference is one step: asking by meaning instead of guessing the exact word.' },
        head: ['Segment', 'Job to be done', 'Call'],
        rows: [
          ['<b>MBA and grad students (primary)</b>', '"Find what the professor said about pricing in week 3, and give me the gist before the quiz."', 'Primary. Heavy iPad note-takers, high review pressure, easy for me to reach and test with'],
          ['Working professionals', 'Recall decisions from meeting notes', 'Phase 2. Strong need, but notes are spread across many tools'],
          ['Designers and visual thinkers', 'Sketch and annotate', 'Served by the core tools only. They value the canvas more than search'],
        ] },
      { label: 'Competition', title: 'Where the existing apps stop', type: 'table',
        head: ['Product', 'What it does well', 'Where it stops'],
        rows: [
          ['<b>Apple Notes</b>', 'Free, built in, searches handwriting', 'Search matches words, not meaning'],
          ['<b>GoodNotes</b>', 'Best-in-class notebooks and handwriting search', 'Finding still depends on remembering the right word'],
          ['<b>Notability</b>', 'Handwriting plus audio recording, searchable', 'Same keyword limit; review is still scrolling'],
          ['<b>Typed AI notes</b> (e.g. Notion)', 'AI search and summaries', 'You have to type, which loses the handwritten thinking'],
        ],
        outro: 'What I found when I tried these apps in July 2026: handwriting search in all three matched the words on the page, not their meaning. Atélier tests whether search by meaning on handwritten notes is worth building.' },
      { label: 'Key insight', type: 'quote',
        text: 'People remember the idea, not the words.',
        note: 'A student searching for "price discrimination" may have written "charging different customers differently". So search had to work on meaning, not exact keywords. That one insight shaped the product: search by meaning, and summaries grounded only in the user\'s own notes.' },
      { label: 'Goals and metrics', title: 'What success means', type: 'tree',
        ns: ['Notes found per weekly active user', 'North Star. It moves only when the core promise works: you asked, and you found it.'],
        l1: [
          ['Searches per active user', 'Do students reach for search at all?'],
          ['Search success rate', 'Share of searches where the user opens a result'],
          ['Summaries used per week', 'Is the one-tap gist part of review?'],
        ],
        guard: '<b>Guardrail:</b> share of summaries users rate as accurate. <b>Health:</b> week-4 retention.' },
      { label: 'Hypotheses', title: 'The bets, written down before building', type: 'bullets',
        items: [
          '<b>H1. Meaning beats keywords.</b> Search by meaning finds the right note in the top 3 for most real student queries. Target: 16 of 20.',
          '<b>H2. Summaries earn a place in review.</b> Students use a summary at least once in a week with a quiz.',
          '<b>H3. Writing feel is the price of entry.</b> If the pen feels worse than their current app, students never stay long enough to try search.',
        ] },
      { label: 'Prioritisation', title: 'What made v1, and what did not', type: 'table',
        head: ['Feature', 'Value to students', 'Effort', 'Call'],
        rows: [
          ['<b>Pen and paper feel</b> (pen, eraser, colour, lasso, ruler)', 'Table stakes', 'Medium', '<b>v1, first</b>'],
          ['<b>Search by meaning</b>', 'High: the core promise', 'High', '<b>v1</b>'],
          ['<b>Grounded summaries</b>', 'High: review before quizzes', 'Medium', '<b>v1</b>'],
          ['<b>Echoes of past notes</b>', 'Medium: connects today\'s note to older ones', 'Low: it reuses search by meaning on the page being written', '<b>v1</b>'],
          ['Chat assistant', 'Medium', 'High', 'Later'],
          ['Auto-flashcards', 'Medium', 'Medium', 'Later'],
          ['Sharing and collaboration', 'Low for the primary user', 'High', 'Not planned'],
        ],
        outro: 'v1 has two AI capabilities: search by meaning and grounded summaries. Echoes are not a third; they run the same search on the page you are writing. Two capabilities are also two things I can evaluate honestly.' },
      { label: 'Solution', title: 'What a student sees', type: 'video',
        frame: 'plain', src: 'videos/atelier-demo.mp4', poster: 'images/atelier-cover.webp', ratio: '4/3',
        alt: 'Atélier demo: writing a note, searching handwriting by meaning, and an echo of past notes',
        cap: 'Demo: write, search by meaning, get the gist.',
        fig: { after: true, svg: D.atelierBoundary, cap: 'How a question becomes an answer. Search and summaries are designed to use only the user\'s own pages. Design is not proof: the eval checks whether summaries stay faithful, with no missing points and no added claims.' },
        tiles: [
          ['Search your handwriting', 'Type what you remember, in your own words. Atélier finds the page, even if you wrote it differently.'],
          ['Echoes of past notes', 'While you write, a quiet hint points to related notes from earlier classes.'],
          ['Pen and paper feel', 'A pen, eraser, colours, lasso and ruler that feel right before any AI shows up.'],
        ] },
      { label: 'Decisions and trade-offs', title: 'Three calls, and what each one cost', type: 'decisions', id: 'decisions',
        items: [
          { q: 'Writing experience first', chose: 'Built a solid pen, eraser, colour, lasso and ruler toolkit before any AI', gave: 'Weeks of delay before the riskiest bet, search by meaning, could be tested', why: 'If writing feels bad, nobody stays long enough to need search. In hindsight, I would have tested search on classmates\' existing notes first (see What I learned).' },
          { q: 'Grounded summaries', chose: 'Summaries draw only from the user\'s notes', gave: '"Smarter" summaries that add outside knowledge', why: 'Students need the summary to reflect their class, not the internet. The eval checks whether it does.' },
          { q: 'Scope', chose: 'Search and summaries only. No chat assistant, no auto-flashcards in v1', gave: 'Feature-list appeal', why: 'Fewer AI features, each one tested properly.' },
        ] },
      { label: 'Status vs targets', title: 'Built; the next test decides if it works', type: 'table',
        head: ['Measure', 'Target', 'Status'],
        rows: [
          ['Feature-complete app, solo', 'Ship v1', '<b>Done</b>, October 2026'],
          ['Faculty demo', 'Show to IIM Lucknow faculty', '<b>Done</b>, October 2026'],
          ['Right note in top 3 results', '16 of 20 real queries', 'Not yet measured'],
          ['Summaries rated accurate', '8 in 10 or better', 'Not yet measured'],
          ['Week-4 retention', '4 in 10 beta users', 'Not yet measured'],
        ],
        outro: 'Targets are not results. This table will show the eval score, including the misses, when it is run.' },
      { label: 'What I learned', title: 'Test the riskiest bet first', type: 'bullets',
        items: [
          'I built the writing core before testing search by meaning, the bet the whole product rests on. A cheaper order: run search on classmates\' existing notes first, then build the notebook only if search works.',
          'Writing the targets down before the eval keeps the result honest, whatever it turns out to be.',
        ] },
      { label: 'Roadmap', title: 'Now, next, later', type: 'road',
        cols: [
          ['Now', ['Run the 20-query eval for search and summaries', 'Fix whatever the eval exposes first']],
          ['Next', ['Beta with 10 to 15 classmates', 'Track notes found per user and week-4 retention']],
          ['Later', ['Working professionals as a second segment', 'Chat assistant, only if search proves itself']],
        ] },
    ],
  },

  /* ===================== 02 ALPINE SKIES ===================== */
  {
    file: 'case-alpine-skies.html', short: 'Alpine Skies', num: '02',
    title: 'Alpine Skies: a browser flight sim, shipped and live',
    kicker: 'Case 02 · B2C · Live · 2026',
    stand: 'A free flight simulator over the Swiss Alps that anyone can play in seconds, with no install and no sign-up wall. Every early decision optimised for time to first flight.',
    desc: 'Alpine Skies, a free browser flight sim: why every early decision optimised for time to first flight, and how it is measured.',
    links: [{ label: 'Play it ↗', href: 'https://alpine-skies.vercel.app', primary: true }],
    lead: { img: 'images/alpine-cover.webp', w: 1600, h: 900, ratio: '16/9', alt: 'Alpine Skies key art: a jet flying down a green Swiss valley toward a ring. Fly the Swiss Alps.' },
    tldr: [
      ['Problem', 'Casual plane fans choose between heavy sims that take hours to learn and web games that feel cheap. Nothing good starts in a browser tab in under a minute.'],
      ['What I did', 'Built and shipped a browser flight sim with guest play, a difficulty ladder and a retention loop, using AI coding tools for the build.'],
      ['Result', 'Live at alpine-skies.vercel.app. A performance pass cut cold load from 8.4 s to about 4.6 s (Intel Iris Xe laptop). Player numbers are not published yet; the first-mission funnel comes next.'],
    ],
    snapshot: [
      ['Role', 'Solo: product, design, build with AI coding tools'],
      ['Platform', 'Web browser (WebGL), no install'],
      ['Status', 'Live, version 1.23 (Oct 2026)'],
      ['Skills', 'Execution, engagement design, metrics, AI-assisted building'],
    ],
    sections: [
      { label: 'Problem', title: 'No middle ground for casual pilots', type: 'bullets',
        intro: 'Casual players who like planes have two bad options.',
        items: [
          '<b>Serious sims</b> (e.g. Microsoft Flight Simulator) need a strong PC, a big download and hours to learn.',
          '<b>Quick web games</b> load fast but feel cheap and give no reason to come back.',
        ],
        outro: 'There was no middle ground: a good-looking flight you can start in a browser tab in under a minute.' },
      { label: 'Users', title: 'Two needs, one return loop', type: 'table',
        fig: { svg: D.alpineJourney, cap: 'One journey, two needs. Each need is met at a different step, every step has a funnel metric, and the Daily Challenge brings players of both kinds back into missions.' },
        head: ['Need', 'Who has it', 'How the product serves it'],
        rows: [
          ['<b>A quick, good-looking flight (primary)</b>', 'Casual aviation fans on a laptop, no setup', 'Guest start, missions sorted by length'],
          ['Learning to fly without feeling lost', 'People curious about flying, new to sims', 'Flight School and the difficulty ladder'],
        ],
        outro: 'Returning is a stage, not a third kind of player: a beginner can also be a returning player. So return is measured as a funnel step for both needs, and the Daily Challenge, leaderboard and stars serve both.' },
      { label: 'Key insight', type: 'quote',
        text: 'The first 60 seconds decide everything.',
        note: 'A browser game competes with every other tab. If a player hits a sign-up form or a confusing cockpit, they close the tab. So every early decision optimised for time to first flight. Depth comes later, once the player cares.' },
      { label: 'Goals and metrics', title: 'What success means', type: 'tree',
        ns: ['Missions completed per weekly player', 'North Star. It captures both engagement and progress.'],
        l1: [
          ['First flight started', 'Share of visitors in the air within a minute'],
          ['First mission completed', 'Share of new players who finish a mission in session 1'],
          ['Return within 7 days', 'Share of new players who come back'],
        ],
        guard: '<b>Health:</b> frame rate on low-end laptops, and load time.' },
      { label: 'Decisions and trade-offs', title: 'Four calls, one I would undo', type: 'decisions', id: 'decisions',
        items: [
          { q: 'Guest start', chose: 'Play instantly as a guest; save codes move progress across devices', gave: 'Early email capture for growth', why: 'Sign-up friction kills first sessions.' },
          { q: 'Visual quality vs speed', chose: 'Balanced visuals against frame rate on average laptops', gave: 'Peak graphics', why: 'A beautiful game that stutters loses players anyway. This is the call behind the 8.4 s to 4.6 s load cut.' },
          { q: 'Retention loop', chose: 'Daily Challenge, achievements, leaderboard, stars and coins', gave: 'Build time on new aircraft and maps', why: 'New content is expensive to build; reasons to return are cheap. A bet, not yet measured: the 7-day return rate will test it.' },
          { q: 'Five modes', chose: 'Flight School, Campaign, Free Flight, Quick Challenges, Daily Challenge', gave: 'A single polished mode', why: 'Each mode served a different need. But it broke my own rule about the first 60 seconds: play-testing found the menus confusing. For new players this was a mistake, and the onboarding test below checks whether skipping the mode menu fixes it.' },
        ] },
      { label: 'Solution', title: 'From tab to cockpit in seconds', type: 'video',
        frame: 'browser', url: 'alpine-skies.vercel.app', src: 'videos/alpine-skies-demo.mp4', poster: 'images/alpine-flight.webp', ratio: '2/1',
        alt: 'Alpine Skies demo: home screen, picking a mission, and flying through rings over the Meiringen valley',
        cap: 'Demo: open the tab, pick a mission, fly.',
        still: { img: 'images/alpine-flight.webp', alt: 'In flight: the objective, distance to the next ring and the keys to press', cap: 'In flight: the objective, the next ring and the keys, on screen.' } },
      { label: 'What shipped', title: 'Live, with logins, missions and a leaderboard', type: 'shots',
        shots: [
          { img: 'images/alpine-home.webp', w: 1400, h: 700, alt: 'Home screen: the next mission, missions, free flight, a daily challenge and the flying style', cap: 'Home: the next mission first, then the other modes and the flying style.' },
          { img: 'images/alpine-missions.webp', w: 1366, h: 768, alt: 'Missions on a terrain map, filtered by length, with star goals', cap: 'Missions on a map, sorted by length, with clear star goals.' },
        ] },
      { label: 'Execution', title: 'Ship, play-test, fix, repeat', type: 'steps',
        items: [
          ['Rebuild on real terrain', 'The Bernese Oberland from swisstopo open data, tuned to run on laptop graphics.'],
          ['Play-test feedback', 'Menus and levels were confusing, there was not enough to do, and progress was not saved.'],
          ['Revamp, versions 1.15 to 1.23', 'Missions sorted by length, Flight School, a daily challenge, guest saves, a leaderboard and clearer in-flight guidance.'],
          ['Measure', 'Product analytics added on the web build, and accounts, progress saves and the leaderboard in Supabase, so the next round is judged on what players do.'],
        ] },
      { label: 'Experiment', title: 'A/B test on onboarding', planned: true, type: 'bullets',
        fig: { after: true, svg: D.alpineExperiment, cap: 'The variant removes one step, the mode menu, and replaces it with a 60-second guided flight. Both arms are measured at the same point: a mission completed in session 1.' },
        items: [
          '<b>Hypothesis:</b> dropping players straight into a 60-second guided flight (vs the mode menu) raises first-mission completion.',
          '<b>Primary metric:</b> share of new players who complete a mission in session 1.',
          '<b>Guardrail:</b> 7-day return rate must not fall.',
          '<b>Decision rule:</b> ship the guided start if completion rises with no drop in return rate; otherwise keep the menu and test a shorter Flight School.',
          '<b>Traffic check first:</b> if there are too few new players each week for an A/B test to detect a real change, compare the funnel before and after the change and run moderated play sessions instead. The result will say which method was used.',
        ] },
      { label: 'Results', title: 'Live and faster; player numbers next', type: 'table',
        head: ['Measure', 'Result'],
        rows: [
          ['Status', '<b>Live</b> with logins, missions, a leaderboard and a cloud backend'],
          ['Cold load, Intel Iris Xe laptop', '<b>8.4 s to about 4.6 s</b> after a performance pass (version 1.15)'],
          ['Feedback that changed the product', '"Menus and levels are confusing; not enough to do." Led to missions by length, Flight School and the daily challenge'],
          ['Player funnel', 'Not published yet: visitors, first flight, first mission, 7-day return'],
        ] },
      { label: 'What I learned', title: 'The tools built it; the calls stayed mine', type: 'bullets',
        items: [
          'AI coding tools speed up the build. The product decisions, scope and quality bar stayed mine.',
          'My own first-60-seconds rule was right, and I broke it with five modes. Writing the rule down is what made the mistake visible.',
        ] },
      { label: 'Roadmap', title: 'Now, next, later', type: 'road',
        cols: [
          ['Now', ['Publish the player funnel: visitors, first flight, first mission, 7-day return', 'Run the onboarding test (A/B if traffic allows) and publish the result here']],
          ['Next', ['Fake-door test for cosmetic aircraft before building any', 'Watch the first-mission funnel weekly']],
          ['Later', ['New mission types if return rate holds', 'Finish cross-device sign-in']],
        ] },
    ],
  },

  /* ===================== 03 VOICE CAPTURE ===================== */
  {
    file: 'case-voice-capture.html', short: 'Voice capture', num: '03',
    title: 'Voice capture for Hinglish: testing whether to build',
    kicker: 'Case 03 · Discovery · In progress · 2026',
    stand: 'My own difficulty transcribing Hindi-English recordings prompted this study. I am testing whether existing engines are meaningfully better than built-in recognition, and whether that improvement supports a paid product.',
    desc: 'A discovery study on speech-to-text for Hinglish and Indian accents: hypotheses, an engine comparison, unit economics and a build, pivot or kill rule. In progress.',
    lead: { art: 'a03', mesh: 'g-rose', alt: 'Abstract sound wave' },
    tldr: [
      ['Problem', 'Phone speech-to-text breaks on regional accents and on Hinglish, the Hindi-English mix many Indians speak every day.'],
      ['What I did', 'Designed a comparison of four engines on real recordings and Indian-accent speech data, scored on transcription errors, speed and cost, with numeric decision thresholds set before testing.'],
      ['Status', 'In progress. No engine winner, validated willingness to pay or build decision yet. The findings will be published here, including a kill if that is what the data says.'],
    ],
    snapshot: [
      ['Role', 'Solo: framing, research, model evaluation, business case'],
      ['Type', 'Discovery and evaluation study (pre-build)'],
      ['Status', 'In progress, October 2026'],
      ['Skills', 'User research, AI evaluation, unit economics, build-or-kill judgment'],
    ],
    sections: [
      { label: 'Problem', title: 'Built for American English', type: 'bullets',
        intro: 'Phone speech-to-text works well for American English. It breaks for many Indian speakers.',
        items: [
          'Regional accents and dialects produce wrong words and broken sentences.',
          'Indians often mix Hindi and English in one sentence (Hinglish). Built-in engines handle this badly.',
          'I saw this first-hand: built-in phone recognition struggled with local accents, and transcribing my own long Hindi-English recordings took real effort.',
        ] },
      { label: 'Users', title: 'Who feels it, and who would pay', type: 'table',
        fig: { svg: D.voiceSegments, cap: 'Two different questions, two different groups. Students are cheap to reach for testing transcript accuracy. They cannot show whether sales teams would pay, so buyer interviews go to sales and client-facing professionals directly.' },
        head: ['Segment', 'Use case', 'Willingness to pay'],
        rows: [
          ['<b>Students (primary for testing)</b>', 'Record lectures, get notes and summaries', 'Low to medium; easy to reach'],
          ['<b>Sales and client-facing professionals</b>', 'Calls and meetings in mixed language', 'High. Globally, sales teams bring most AI notetaker revenue (Sacra on Otter.ai)'],
          ['Field workers and SMB owners', 'Voice notes instead of typing', 'Medium; large but harder to reach'],
        ] },
      { label: 'Hypotheses', title: 'What the study must prove or kill', type: 'bullets',
        items: [
          '<b>H1. The gap is in Hinglish and regional accents, not Indian English overall.</b> A general engine can look fine on average and still fail the users who need it most.',
          '<b>H2. An India-first engine closes the gap.</b> At least one engine cuts Hinglish word errors by 25% or more against Apple\'s free baseline.',
          '<b>H3. The economics work for one paying segment.</b> A heavy user\'s monthly audio cost is under 40% of a plan price that segment says it would pay.',
        ] },
      { label: 'Research plan', title: 'Two kinds of validation before any build', type: 'steps',
        fig: { svg: D.voicePipeline, cap: 'The technical test as a pipeline. Same clips, four engines, the same scores, and a decision rule written before the first clip is tested.' },
        items: [
          ['Buyer interviews', 'Sales and client-facing professionals, the segment most likely to pay: how they capture calls today, where voice fails them, and what they pay for now. Students are interviewed on the same workflow questions, but their answers are not used as evidence of willingness to pay.'],
          ['Accent test', '20 to 30 real clips (lectures, client calls, Hindi-English mixes) from speakers across north, south, east and west India, plus open Indian-accent data such as AI4Bharat\'s Svarah set.'],
          ['Engines compared', 'Sarvam (built for Indian languages), OpenAI\'s mini transcription model, Deepgram Nova-3 (Hinglish mode), and Apple\'s built-in engine as the free baseline.'],
          ['Metric', 'Word error rate (WER) by accent and by language mix, plus speed and cost per hour.'],
        ] },
      { label: 'Decision rule', title: 'Set before the first clip is tested', type: 'table',
        head: ['If the data shows', 'Then'],
        rows: [
          ['The best engine cuts Hinglish WER by 25% or more against Apple\'s baseline, <i>and</i> its heavy-user cost is under 40% of a plan price the paying segment accepts in interviews', '<b>Build</b> a narrow pilot for that segment'],
          ['The best engine improves Hinglish WER by less than 25%', '<b>Pivot</b>: compete on output (summaries, action items) on top of free transcripts'],
          ['Every engine, including the best, gets more than 1 word in 4 wrong on Hinglish (WER above 25%)', '<b>Kill</b> for now: at that error rate, correcting the transcript takes longer than typing notes. Revisit when models improve'],
        ],
        outro: 'If the accuracy bar is met but the cost bar is not, the answer is a pivot to capped plans, not a build.' },
      { label: 'Engines', title: 'Engines and list prices', type: 'table',
        head: ['Engine', 'Built for', 'Cost per hour (list, Oct 2026)', 'WER'],
        rows: [
          ['Sarvam', 'Indian languages', 'Rs 30', 'In testing'],
          ['OpenAI mini transcribe', 'General, multilingual', 'About $0.18 ($0.003 a minute)', 'In testing'],
          ['Deepgram Nova-3', 'General, with a Hinglish mode', 'About $0.46 ($0.0077 a minute)', 'In testing'],
          ['Apple built-in', 'On-device baseline', 'Free', 'In testing'],
        ] },
      { label: 'Decisions and trade-offs', title: 'Four calls, and what each one cost', type: 'decisions', id: 'decisions',
        items: [
          { q: 'Test before build', chose: '1 to 2 weeks of evaluation first', gave: 'Speed to a demo', why: 'Choosing an engine by assumption risks building on the wrong base.' },
          { q: 'Cloud engine over on-device', chose: 'Pick the winner of the accent test; keep Apple\'s engine as an offline backup', gave: 'Free, private, offline-first', why: 'Accuracy on local accents is the whole product.' },
          { q: 'Pricing model', chose: 'Monthly plans with an hours allowance', gave: 'A simple one-time price', why: 'Every hour of audio costs money. A one-time price loses money on heavy users.' },
          { q: 'Differentiation', chose: 'Win on output: summaries, action items, exports for one user group', gave: 'Competing on raw transcription', why: 'Phone makers keep improving free recorders. Raw transcripts will become a commodity.' },
        ] },
      { label: 'Product shape', title: 'If we build: compete above the transcript', type: 'prose',
        paras: ['The transcript itself is becoming free: phone makers keep improving their built-in recorders. So the engine layer is a cost to manage, and the product is what sits on top of it.'],
        fig: { after: true, svg: D.voiceShape, cap: 'The architecture if the study says build. Capture and transcription are swappable and commoditising; the value, and the reason to pay, sits in the output layer for one user group.' } },
      { label: 'Unit economics', title: 'What one heavy user costs', type: 'prose',
        paras: [
          'One 1-hour lecture a day for a month (about 22 hours) costs about <b>Rs 660</b> on Sarvam or about <b>$4</b> on OpenAI\'s mini model at list prices.',
          'To keep audio under 40% of revenue, that heavy user\'s plan would need to cost about <b>Rs 1,650 a month on Sarvam</b>, or about <b>$10 on OpenAI\'s mini model</b>. Students rate their willingness to pay low to medium, so Sarvam cannot serve heavy student use profitably without an hours cap. Prices at that level point to sales and client-facing professionals, which is why the buyer interviews go to them.',
        ] },
      { label: 'What I learned', title: 'So far', type: 'bullets',
        items: [
          'Writing the build, pivot or kill rule before testing keeps the study honest.',
          'Averages hide the problem. The test is designed around the users a general engine fails, not the typical case.',
        ] },
      { label: 'Roadmap', title: 'Now, next, later', type: 'road',
        cols: [
          ['Now', ['Finish the accent test', 'Fill the WER table']],
          ['Next', ['Make the build, pivot or kill call', 'Publish it here, with the number']],
          ['Later', ['If build: a pilot with one student cohort', 'If pivot: summaries on top of free transcripts']],
        ] },
    ],
  },

  /* ===================== 05 ROUTER ===================== */
  {
    file: 'case-router.html', short: 'Multi-agent router', num: 'Lab', lab: true,
    title: 'Multi-agent router',
    kicker: 'AI Lab · Technical experiment · 2026',
    stand: 'Can low-cost models do most of the work if a frontier model only plans and reviews? A personal tool, and an experiment in trading cost against quality.',
    desc: 'An AI Lab experiment: a frontier model plans and reviews, low-cost models do the work. A benchmark against a Claude-only setup on cost, quality and time is running.',
    lead: { art: 'a05', mesh: 'g-sky', alt: 'Abstract diagram of one input routed to three workers' },
    tldr: [
      ['Problem', 'Using a frontier model for every step is expensive and slow. Most steps are routine and do not need it.'],
      ['What I did', 'Built a three-layer agent setup: frontier models only plan, review and sign off; low-cost models do the work in parallel.'],
      ['Status', 'Working on my own projects. No benchmark result yet: the comparison against a Claude-only setup is running.'],
    ],
    snapshot: [
      ['Role', 'Solo: framing, build, evaluation'],
      ['Type', 'Technical experiment'],
      ['Models', 'Claude directs; lead models own streams; DeepSeek and Gemini Flash work'],
      ['Status', 'Working (Oct 2026)'],
      ['Skills', 'AI evals, cost vs quality vs latency'],
    ],
    sections: [
      { label: 'Problem', title: 'One model for everything is expensive', type: 'bullets',
        intro: 'I was using a frontier model for every step of my AI work. Most of those steps did not need it.',
        items: [
          'Drafting boilerplate code, reformatting text and summarising files are routine tasks.',
          'Planning, judging quality and fixing hard bugs need the strongest model.',
          'Paying top price for both meant costs grew with every project.',
        ] },
      { label: 'How it works', title: 'Plan at the top, work at the bottom', type: 'bullets',
        fig: { svg: D.routerOrg, cap: 'Three layers. Frontier capacity sits only where judgment is needed; the volume of work happens in Layer 3 at low-cost prices.' },
        items: [
          '<b>Layer 1, Director (Claude):</b> owns the goal, splits it into streams, gives the final sign-off.',
          '<b>Layer 2, Leads:</b> one per stream. Each breaks its stream into steps and reviews the result.',
          '<b>Layer 3, Workers:</b> low-cost models with one job each, run in parallel.',
          '<b>Every output is reviewed.</b> A failed step gets one retry, then moves up a layer.',
        ] },
      { label: 'Key insight', type: 'quote',
        text: 'The cheap model doesn\'t need to be right every time. The system does.',
        note: 'A low-cost worker that is right most of the time, inside an org that reviews every output and escalates misses, can match a frontier-only setup at a fraction of the cost. The structure, and especially the reviewer, is the product.' },
      { label: 'Goals and metrics', title: 'Cost, quality and time, as one decision', type: 'tree',
        ns: ['Cost per accepted task', 'North Star. Cheap output that fails review is not a saving.'],
        l1: [
          ['Quality pass rate', 'Share of tasks that pass a simple rubric'],
          ['Time per task', 'Wall-clock time, with parallel steps'],
          ['Escalation rate', 'Share of steps that end up back with Claude'],
        ],
        guard: '<b>Guardrail:</b> pass rate no more than 5 points below the Claude-only baseline. That is the trade I accept for at least 40% lower cost: a failed step is caught in review and retried, so a small quality drop costs little. Past 5 points, rework eats the savings.' },
      { label: 'Decisions and trade-offs', title: 'Three calls, and what each one cost', type: 'decisions', id: 'decisions',
        items: [
          { q: 'Orchestrator', chose: 'A frontier model plans and reviews', gave: 'The lowest possible cost', why: 'Planning and judging are where cheap models fail most.' },
          { q: 'Review every output', chose: 'Claude checks worker results', gave: 'Some of the savings', why: 'Unchecked cheap output creates rework, which costs more.' },
          { q: 'Escalation cap', chose: 'One retry, then escalate', gave: 'Maximum savings on hard tasks', why: 'Endless retries waste time and money.' },
        ] },
      { label: 'Proof', title: 'Benchmark against a Claude-only baseline', type: 'table',
        head: ['Metric', 'Target vs Claude only', 'Status'],
        rows: [
          ['Cost per task', 'At least 40% lower', 'Benchmark running'],
          ['Quality pass rate', 'No more than 5 points lower', 'Benchmark running'],
          ['Time per task', 'Faster on multi-step tasks', 'Benchmark running'],
          ['Escalation rate', 'Under 20% of steps', 'Benchmark running'],
        ],
        outro: '<b>How it runs:</b> 20 to 30 real tasks across code, writing and summaries, each through both setups, scored with a simple pass or fail rubric, noting where the router failed.' },
      { label: 'Where it breaks', title: 'Known failure modes', type: 'bullets',
        items: [
          '<b>Data privacy:</b> sending work to some third-party providers may break company policy. Fix: an approved-provider list per team.',
          '<b>Reviewer cost:</b> if Claude has to redo too much, savings disappear. Watch the escalation rate.',
          '<b>Silent errors:</b> a confident wrong answer can pass review. Fix: stricter checks on high-risk tasks, such as code that touches data.',
        ] },
      { label: 'What I learned', title: 'Evaluation is the real work', type: 'bullets',
        items: [
          'Routing logic is easy to write and hard to trust without a benchmark.',
        ] },
      { label: 'Next', title: 'What happens next', type: 'bullets',
        items: [
          'Finish the 20 to 30 task benchmark and publish the table above with real numbers, including one real failure and its fix.',
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
  const fig = (f) => `<figure class="fig${f.after ? ' after' : ''}"><div class="dgwrap">${f.svg()}</div><p class="swipe" aria-hidden="true">Scroll sideways for the full diagram →</p><figcaption>${f.cap}</figcaption></figure>`;
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

function page(c, prev, next) {
  const lead = c.lead.img
    ? `<figure class="lead-img"><img src="${c.lead.img}" width="${c.lead.w}" height="${c.lead.h}" style="aspect-ratio:${c.lead.ratio}" alt="${esc(c.lead.alt)}" decoding="async"></figure>`
    : `<div class="lead-img art grain mesh ${c.lead.mesh}" role="img" aria-label="${esc(c.lead.alt)}"><svg aria-hidden="true"><use href="#${c.lead.art}"/></svg></div>`;
  const links = [...(c.links || []), { label: 'Skip to the decisions', href: '#decisions' }]
    .map((l) => `<a class="pill${l.primary ? '' : ' ghost'}" href="${l.href}"${l.href.startsWith('http') ? ' rel="noopener"' : ''}>${l.label}</a>`).join('');
  const sym = c.lead.art ? `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">${SYMBOLS[c.lead.art]}</svg>\n` : '';
  const tldr = `<div class="tldr" aria-label="TL;DR">${c.tldr.map(([k, v]) => `<div><p class="label">${k}</p><p>${v}</p></div>`).join('')}</div>`;
  const snap = c.snapshot.map(([k, v]) => `<div><dt class="label">${k}</dt><dd>${v}</dd></div>`).join('\n      ');
  const home = c.lab ? 'index.html#labs' : 'index.html#work', homeTxt = c.lab ? 'AI Labs' : 'All work';
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
<title>${c.short} · ${c.lab ? 'AI Lab' : `Case ${c.num}`} · R. Veera Manoharan</title>
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
      <p class="stand">${c.stand}</p>
      <p class="links">${links}</p>
      ${lead}
      ${tldr}
    </header>

    <dl class="summary" style="--cols:${c.snapshot.length}">
      ${snap}
    </dl>
${c.sections.map(section).join('\n')}
${pn}
  </main>
  <footer class="legal"><span>© R. Veera Manoharan</span><span>${c.lab ? 'AI Lab' : `Case ${c.num}`}</span></footer>
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
