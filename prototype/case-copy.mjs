// Concise editorial copy shared by the generated case pages.
export function editCases(cases) {
  const openings = [
    ['TicketPilot: AI-powered IT support', 'Describe the issue. Find the right team. Learn from every exception.', ['Unclear requests create manual triage and unnecessary handoffs.', 'AI-assisted routing, human review and a continuous improvement loop.', 'Simpler requests, faster routing and clearer improvement priorities.', 'LLM benchmark: 50/50 recommendations correct; 6 requests sent to review.']],
    [null, 'A local AI assistant helps engineers draft usability analyses, with human approval at every step.', ['Usability analysis involves hours of repetitive documentation.', 'A local Llama assistant drafts analyses in batches of five tasks.', 'Drafting time, with mandatory engineer approval.', 'About 50% less analysis and drafting time in a 4–5 engineer pilot.']],
    [null, 'Find handwritten notes by meaning, even when you forget the exact words.', ['Keyword search misses the idea you remember.', 'Handwritten notes, semantic search and summaries on iPad.', 'Useful notes found per weekly active user.', 'Built and demoed. Search evaluation and a classmate beta are next.']],
    [null, 'A lead model plans and reviews. Lower-cost models build in parallel.', ['Routine coding uses expensive models and unnecessary context.', 'A shared plan, bounded worker tasks and parallel implementation.', 'Cost per accepted task at the same quality.', 'Small benchmark: 13.9% lower cost, 18.1% longer runtime.']],
    ['Voice capture for Hinglish', 'Testing speech recognition for Indian accents and Hindi-English conversations.', ['Mixed-language recordings are difficult to transcribe reliably.', 'A pre-build comparison of four speech engines.', 'Accuracy and willingness to pay determine the build decision.', 'Research planned; recordings and engine tests come next.']],
    [null, 'A browser flight simulator for quick sessions over the Swiss Alps.', ['Casual players want a quick flight without a complex setup.', 'Guest play, timed missions and daily challenges.', 'Missions completed per weekly player.', 'Live. Cold load improved from 8.4 to about 4.6 seconds.']],
    ['Resume Fit Copilot: evidence-backed resume checks', 'Check whether your experience supports each resume claim.', ['AI-written resume claims can be hard to defend.', 'An evidence bank and a line-by-line claim checker.', 'Useful, defensible bullets ready to send.', 'Six AI test users identified four blockers and favored the checker.']],
  ];
  const headings = [
    ['The triage problem', 'Five-step workflow', 'Three sources of value', 'From exceptions to improvements', 'The MVP in action', 'Who uses it', null, 'What to validate', 'MVP scope', 'Architecture', 'Success metrics', 'Key decisions', 'Routing benchmark', 'Value and review costs', 'Next: integrate and validate'],
    ['Repetitive work, accountable engineers', 'Built for usability engineers', null, 'Measure time saved', 'Draft, review, approve', 'Key decisions', 'What the pilot revealed', 'Pilot results', 'The next version', 'Lessons learned'],
    ['Find the idea, not the keyword', 'The student workflow', 'Alternatives', 'Start with exam review', 'Success metrics', 'Product hypotheses', 'Version-one scope', 'Write, search, summarize', 'Key decisions', 'Next: evaluation and beta'],
    ['Where it started', 'The cost of routine work', 'Lead, delegate, review', 'Key decisions', 'Success metrics', 'Measurement approach', 'Benchmark results', 'Evidence and assumptions', 'Lessons learned', 'Next benchmark'],
    ['The transcription gap', 'Users and buyers', 'Product hypotheses', 'Research plan', 'Build decision', 'Engine comparison', 'Unit economics', 'Key decisions', 'Next steps'],
    ['Quick flights, less setup', 'Two player needs', null, 'Success metrics', 'Key decisions', 'From tab to cockpit', 'What shipped', 'Iteration', 'First-flight experiment', 'Results so far', 'Lessons learned'],
    ['Claims need evidence', 'Three job-seeker needs', 'Check every claim', 'Pilot method', 'Pilot results', 'Four usability blockers', 'Key decisions', 'Test willingness to pay', 'Feedback workflow', 'Lessons learned'],
  ];
  const previews = [
    [
      ['IT support starts with a guessing game', 'Employees know what is wrong, but often do not know which service category or support team to choose. They need a simple way to ask for help.'],
      ['Unclear requests create extra work', 'Support teams manually interpret and reassign tickets. Ambiguous descriptions need human judgment, while recurring confusion needs a clear path back to product development.'],
      ['Describe it. Route it. Learn from it.', 'TicketPilot uses retrieved service knowledge to recommend the right team, with human review for ambiguity. The product combines LLM-powered triage with a planned feedback loop that turns recurring exceptions into improvements.'],
    ],
    [
      ['Engineers spend hours drafting analyses', 'Medical-device usability work involves documenting hundreds of tasks. Preparing initial analyses and reports consumes time that engineers could spend evaluating the device.'],
      ['Every draft still needs expert judgment', 'Device context matters, and plausible AI output can be wrong. Faster drafting is useful only when engineers can check, correct and approve the result.'],
      ['AI drafts; engineers approve', 'A local Llama assistant prepares usability analyses five tasks at a time. Engineers review every output. A pilot with four to five engineers reduced analysis and drafting time by about 50%.'],
    ],
    [
      ['The right note is hard to find', 'Students accumulate handwritten notes across classes and notebooks. Before a quiz, they need to retrieve an idea quickly without remembering where they wrote it.'],
      ['Memory works differently from keywords', 'A student remembers the concept, not necessarily the exact phrase on the page. Finding it can mean scrolling through notebooks instead of reviewing the material.'],
      ['Search handwriting by meaning', 'Atélier combines an iPad writing experience with semantic search and summaries grounded in the user’s own notes. Ask in your own words, find the relevant page and get the gist.'],
    ],
    [
      ['Routine coding uses expensive reasoning', 'Developers use strong AI models for both difficult decisions and routine implementation. Independent tasks often wait for one model to finish the previous task.'],
      ['Delegation has its own overhead', 'Parallel workers can save money, but repeated context, unclear ownership and coordination add cost. The comparison must include planning, review and the same acceptance criteria.'],
      ['One lead, focused parallel workers', 'Ensemble gives a lead model responsibility for planning and review, while lower-cost workers implement bounded tasks in parallel. Shared rules and file ownership keep the work coordinated.'],
    ],
    [
      ['Capture ideas in the language you speak', 'Indian speakers often switch between Hindi and English in the same recording. They need transcripts that preserve the meaning without a long manual correction pass.'],
      ['Mixed-language accuracy is the key question', 'Accents and language switching can introduce transcription errors. Before building another recording app, the study must establish whether a different engine delivers a meaningful improvement.'],
      ['Compare engines before building', 'The proposed product starts with a four-engine comparison on the same real recordings. Accuracy, correction effort and willingness to pay will guide whether to build a dedicated voice-capture experience.'],
    ],
    [
      ['A quick flight should be easy to start', 'Casual aviation fans want a satisfying flight without a large download, specialist hardware or hours spent learning controls before they can enjoy a session.'],
      ['Accessibility needs a reason to return', 'Fast loading alone does not create a compelling game. Players also need clear goals, manageable challenges and a progression path that fits short sessions.'],
      ['Open a tab and take off', 'Alpine Skies brings Swiss Alps flying to the browser with guest play, missions by length, a difficulty ladder and a daily challenge. Cold load improved from 8.4 to about 4.6 seconds.'],
    ],
    [
      ['Resume claims need real evidence', 'Job seekers want clear, relevant resume bullets that represent their experience accurately and remain defensible when an interviewer asks how the work was done.'],
      ['Polished wording can overstate the work', 'AI rewrites can introduce unsupported responsibilities or numbers. A passing technical test also does not establish that users can complete the resume workflow successfully.'],
      ['Check each claim against experience', 'Resume Fit Copilot connects an evidence bank to a line-by-line claim checker. A pilot with six AI test users identified four blockers and pointed the product toward a checker-first workflow.'],
    ],
  ];
  cases.forEach((c, i) => {
    const [title, stand, cards] = openings[i];
    if (title) c.title = title;
    c.stand = stand;
    c.tldr = c.tldr.map(([label], k) => [i === 0 ? ['Problem', 'Product', 'Value', 'Progress'][k] : label, cards[k]]);
    c.preview = previews[i].map(([title, text], k) => ({label: ['Problem', 'Issue', 'Solution'][k], title, text}));
    c.previewStatus = cards[3];
    c.sections.forEach((section, k) => {
      if (headings[i][k]) section.title = headings[i][k];
      section.compact = ['Hypotheses', 'Scope', 'Architecture', 'Goals and metrics', 'Tracking', 'What each number can support', 'Pilot method', 'Engines', 'Unit economics'].includes(section.label);
    });
  });
  const c = cases[0];
  c.snapshot = [['Role', 'Product, prototype and evaluation'], ['Stage', 'MVP; LLM path added'], ['Stack', 'React, Python, LangChain'], ['Data', 'Public process log + synthetic ticket text']];
  const get = label => c.sections.find(s => s.label === label);
  Object.assign(get('Problem'), {intro: 'Employees know their problem, not the support taxonomy. Teams need enough context to route it correctly.', items: ['Unclear descriptions add manual classification and reassignment.', 'Regional language and unfamiliar terminology can make routing harder.', 'Recurring confusion needs a route back to the product team.'], outro: 'Process context: 7,554 public incidents; 50.6% touched multiple teams and 15.6% bounced A–B–A. The log does not establish which transfers were avoidable.'});
  Object.assign(get('Workflow'), {intro: '', items: ['<b>Submit:</b> describe the issue naturally.', '<b>Interpret:</b> identify the issue and team using an LLM with retrieved service knowledge.', '<b>Route or escalate:</b> assign clear requests; send ambiguity to a reviewer.', '<b>Capture:</b> record reviewer decisions and recurring confusion.', '<b>Improve:</b> turn repeated patterns into development requests.'], outro: 'Target workflow. The MVP supports human-approved routing; the LangChain + LLM path has completed a 50-case synthetic benchmark. Shared improvement reporting remains planned. Support teams resolve incidents.'});
  get('Business value').outro = 'Benefits to validate in a workflow pilot.';
  get('Feedback loop').paras = ['Review decisions should reveal missing knowledge, unclear ownership and language gaps. Recurring patterns become prioritized feature requests.', 'The MVP retains decisions in the browser; shared reporting and feature-request creation are next-stage capabilities.'];
  get('Solution').outro = '';
  get('Solution').tiles = [['Describe it naturally', 'No team selection required.'], ['Review the evidence', 'Inspect similar cases, approve or override the route.'], ['Confirm the outcome', 'Keep the employee involved after support acts.']];
  get('Evaluation').intro = 'DeepSeek Flash via LangChain was compared with the lexical MVP and keyword rules on the same 50 synthetic requests. Dataset hashes match. All 35 Python/workbench tests pass.';
  get('Evaluation').head = ['Measure', 'LLM + LangChain', 'Lexical MVP', 'Keyword rules'];
  get('Evaluation').rows = [
    ['Correct team recommendations', '<b>50/50 (100%)</b>', '44/50 (88%)', '45/50 (90%)'],
    ['Correct automatic routing (all requests)', '<b>44/50 (88%)</b>', '5/50 (10%)', '45/50 (90%)'],
    ['Human review', '<b>6/50 (12%)</b>', '45/50 (90%)', '0/50'],
    ['Wrong automatic assignments', '0/44', '0/5', '5/50'],
  ];
  get('Evaluation').outro = 'The LLM improves recommendation accuracy and reduces review versus the lexical MVP. Correct automatic routing remains two points below keyword rules, so the original gain gate is not met. These are five variants of ten synthetic scenarios; real-text quality and operational value still need validation.';
  Object.assign(get('Architecture'), {fig: undefined, rows: [
    ['Experience', 'React + TypeScript', 'Employee, support and manager views', 'Working MVP'],
    ['Routing', 'Python + LangChain + provider API', 'Retrieve past cases and current KB articles; return a structured team decision', 'DeepSeek Flash tested on 50 synthetic cases'],
    ['Safeguards', 'Schema, cited evidence and review gate', 'Uncertainty and provider errors require human review', '35 Python/workbench tests pass'],
    ['Baseline', 'Lexical retrieval and keyword rules', 'Preserve a reproducible comparison', '50-case lexical benchmark reproduced'],
  ], outro: 'Provider credentials stay on the server. Enterprise connectors, shared storage and external assignment remain future work.'});
  get('Recommendation').intro = 'Use the improved routing path to validate representative requests, language coverage and reviewer effort before live assignment.';
  get('Recommendation').rows = [
    ['Offline comparison: complete', '50 synthetic cases; no provider failures', '100% recommendations correct; 12% review; original gain gate not met'],
    ['Representative validation', 'Approved real requests and independently agreed gates', 'Check language coverage, evidence quality and review effort'],
    ['Workflow pilot', 'One team, human-approved routing', 'Measure submission effort, routing time and net capacity value'],
  ];
  get('Recommendation').outro = 'Current release decision: keep the lexical router out of live assignment while the next version is validated.';
  get('Key insight').text = 'Simple requests. Clear ownership. Better service over time.';
  get('Key insight').note = 'Measure the routing component and the employee workflow separately.';
  c.sections = c.sections.filter(s => !['Users', 'Key insight', 'Hypotheses', 'Scope', 'Goals and metrics'].includes(s.label));
  get('Decisions and trade-offs').items = [
    {q: 'Make routing reviewable', chose: 'Show similar cases and let engineers override.', gave: 'Immediate automatic assignment in the MVP.', why: 'Review makes uncertain decisions visible and correctable.'},
    {q: 'Compare before scaling', chose: 'Benchmark against simple keyword rules.', gave: 'A deployment decision based on the demo alone.', why: 'Coverage, accuracy and review effort all affect value.'},
    {q: 'Model the work saved', chose: 'Count hands-on effort and deduct review costs.', gave: 'Treating elapsed waiting time as labor saved.', why: 'The business case needs measurable capacity benefits.'},
  ];
  const edits = [
    {},
    {
      Problem: {intro: 'Usability engineers document hundreds of device tasks. Repetitive drafting takes time away from analysis.', items: ['Use AI to prepare initial analyses.', 'Keep engineers responsible for review and approval.'], outro: ''},
      Users: {items: ['<b>User:</b> usability engineers preparing device analyses and reports.', '<b>Need:</b> accurate drafts they can check and approve.', '<b>Adoption:</b> working examples, then a small engineering pilot.']},
      'Key insight': {text: 'Less drafting. More engineering judgment.', note: 'Small batches and mandatory review shaped the workflow.'},
      Solution: {paras: ['A local Llama model drafted usability analyses five tasks at a time, guided by IEC 62366. Engineers corrected and approved every output.']},
      'Pilot findings': {items: ['<b>Speed:</b> local inference introduced delays.', '<b>Context:</b> missing device information reduced relevance.', '<b>Accuracy:</b> plausible text still required verification.'], outro: ''},
      Results: {outro: 'The reduction applies to analysis and drafting, not the full development timeline.'},
      Successor: {intro: 'The pilot informed a separate successor using RAG and enterprise-protected AI.', items: ['Retrieve relevant device context.', 'Use appropriate enterprise safeguards.', 'Retain engineer approval.'], outro: 'Additional accuracy and time gains have not been measured.'},
      'What I learned': {items: ['Choose a repetitive task with a clear review step.', 'Supply the context needed for reliable output.', 'Use the pilot to learn where the model needs support.'], outro: ''},
    },
    {
      Problem: {intro: 'Classmates at IIM Lucknow described three recurring frustrations before quizzes.', items: ['They remember concepts, not exact keywords.', 'Review means scrolling through notebooks.', 'Typing sacrifices the sketches and structure of handwriting.'], outro: ''},
      Strategy: {items: ['<b>Start:</b> graduate students preparing for quizzes.', '<b>Value:</b> search and summaries grounded in their own notes.', '<b>Risk:</b> competitors can add semantic search; the review experience must earn repeat use.'], outro: ''},
      'Status and next': {outro: 'Next time, test semantic search on existing notes before building the writing toolkit.'},
    },
    {
      Problem: {items: ['Routine implementation uses the same expensive model as planning.', 'Long conversation histories add cost to narrow tasks.', 'Independent tasks wait instead of running in parallel.']},
      'The idea': {paras: ['A strong lead plans and reviews. Lower-cost workers handle bounded tasks in parallel, using shared rules and explicit file ownership.']},
      'What I learned': {items: ['Make task boundaries and handoffs explicit.', 'Freeze acceptance tests before comparing runs.', 'Include planning and review in total cost.']},
    },
    {
      Problem: {items: ['Indian accents and Hindi-English switching can reduce transcription quality.', 'My own long recordings exposed frequent corrections.', 'The study will test whether a dedicated product offers enough improvement.'], outro: ''},
    },
    {
      Problem: {paras: ['Casual players need an accessible middle ground: a convincing flight experience that starts quickly in a browser.']},
      Users: {paras: ['Quick-session players want an immediate flight. Learners want progressively harder missions. Both need a simple path into the cockpit.']},
    },
    {
      Problem: {items: ['Job seekers need to know which resume claims their experience supports.', 'A polished AI rewrite can introduce unsupported scope or numbers.', 'The checker ties each claim to evidence before it is used.'], outro: ''},
      'What I learned': {items: ['Test the real user journey, beyond a passing build.', 'Use AI personas to find usability issues, then validate demand with people.', 'Retest the checker-first flow before testing willingness to pay.']},
    },
  ];
  cases.forEach((entry, i) => {
    entry.sections.forEach(section => {
      if (edits[i][section.label]) Object.assign(section, edits[i][section.label]);
      if (section.label === 'Decisions and trade-offs') section.compact = true;
    });
    entry.desc = `${entry.title}. ${entry.stand}`;
  });
}
