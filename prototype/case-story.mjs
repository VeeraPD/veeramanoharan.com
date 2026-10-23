import * as D from './diagrams.mjs';

// Headlines state the PM argument; the sequence follows problem → choices → product → evidence → next step.
export function structureCases(cases) {
  const titles = [
    {
      Problem: 'Employees need help without learning the support taxonomy',
      Workflow: 'TicketPilot interprets requests and keeps uncertain routes with people',
      'Business value': 'Simpler requests and less triage are the value to validate',
      'Feedback loop': 'Repeated review patterns become product improvement priorities',
      Solution: 'The MVP connects employee requests, routing evidence and human approval',
      Architecture: 'LangChain grounds team recommendations in retrieved service knowledge',
      'Decisions and trade-offs': 'I kept human approval, a simple baseline and review costs',
      Evaluation: 'The LLM got 50 teams right and held six requests for review',
      'Value case': 'Lower review effort improves the conditional business case',
      Recommendation: 'Next, validate real requests and workflow value before deployment',
    },
    {
      Problem: 'Repetitive usability drafting takes time away from engineering analysis',
      Users: 'Usability engineers need drafts they can verify and approve',
      'Goals and metrics': 'Save drafting time while preserving engineer accountability',
      Solution: 'A local Llama assistant drafts five tasks for engineer review',
      'Decisions and trade-offs': 'Small batches and mandatory approval made the pilot reviewable',
      'Pilot findings': 'The pilot exposed gaps in speed, device context and accuracy',
      Results: 'Four to five engineers cut analysis and drafting time by about 50%',
      Successor: 'The context gaps informed a separate RAG-based successor',
      'What I learned': 'Useful AI drafts require context and a clear review workflow',
    },
    {
      Problem: 'Students remember concepts, but keyword search needs exact words',
      Users: 'Before a quiz, students need the relevant page and its gist',
      Competition: 'My initial app comparisons revealed a concept-retrieval gap',
      Strategy: 'Exam review gives semantic search a focused starting point',
      'Goals and metrics': 'Success means finding useful notes, not generating more text',
      Hypotheses: 'Search quality and repeat use determine whether the product works',
      Scope: 'I focused version one on handwriting, search and summaries',
      Solution: 'Atélier finds handwritten pages by meaning and summarizes them',
      'Decisions and trade-offs': 'I prioritized writing quality and kept summaries grounded in notes',
      'Status and next': 'The app is built; search evaluation and a student beta come next',
    },
    {
      Origin: 'My app-building experience prompted a test of model delegation',
      Problem: 'Routine implementation consumes expensive reasoning and repeated context',
      'The idea': 'A strong lead plans while lower-cost workers build in parallel',
      'Decisions and trade-offs': 'Explicit task boundaries keep parallel work coordinated',
      'Goals and metrics': 'Compare total cost only when both approaches pass the same tests',
      Tracking: 'Per-call usage records include the cost of planning and review',
      Evidence: 'The small benchmark cost 13.9% less but took 18.1% longer',
      'What each number can support': 'The benchmark is evidence for one task, not a universal saving',
      'What I learned': 'Delegation needs clear handoffs and a frozen acceptance test',
      Next: 'A larger matched benchmark will test where coordination pays off',
    },
    {
      Problem: 'Hindi-English recordings need more reliable transcription',
      Users: 'Students can test accuracy; sales professionals can test willingness to pay',
      Hypotheses: 'Accuracy gains and buyer demand must justify a dedicated product',
      'Research plan': 'Compare four engines on the same clips and interview potential buyers',
      'Decision rule': 'Set the build decision before seeing the engine results',
      Engines: 'Compare recognition quality alongside processing cost',
      'Unit economics': 'Heavy audio usage makes buyer selection central to pricing',
      'Decisions and trade-offs': 'Test the accent advantage before building the capture app',
      'Status and next': 'Finish the recordings, score the engines and make the build decision',
    },
    {
      Problem: 'Casual pilots need a convincing flight without a complex setup',
      Users: 'Quick sessions and learning flights need the same simple entry point',
      'Goals and metrics': 'Completed missions measure both engagement and progress',
      'Decisions and trade-offs': 'Guest play and mission structure reduce the effort to start',
      Solution: 'Alpine Skies puts a Swiss Alps flight in a browser tab',
      'What shipped': 'Missions, map-based selection and a leaderboard support repeat play',
      Execution: 'Play-test feedback shaped versions 1.15 through 1.23',
      Experiment: 'Test whether a guided first flight improves mission completion',
      Results: 'Cold load fell from 8.4 to about 4.6 seconds',
      'What I learned': 'Product constraints still need judgment when AI builds the code',
    },
    {
      Problem: 'Job seekers need resume claims they can defend in an interview',
      Users: 'Three job-seeker personas share the need for credible evidence',
      Product: 'The checker ties each resume claim to the user’s actual experience',
      'Pilot method': 'Six AI personas tested the app without access to its code',
      Results: 'All six favored the checker, but none left with ready-to-send bullets',
      Findings: 'Four blockers explained why a passing build was not enough',
      'Decisions and trade-offs': 'I shifted to checker-first, with rules able to veto AI judgments',
      'Business case': 'A paid demand test comes before more feature development',
      'Feedback loop': 'Reported problems flow through bounded AI triage into Jira',
      'What I learned': 'Validate the complete user task before expanding the product',
    },
  ];
  const orders = [
    ['Problem', 'Business value', 'Workflow', 'Solution', 'Decisions and trade-offs', 'Feedback loop', 'Architecture', 'Evaluation', 'Value case', 'Recommendation'],
    ['Problem', 'Users', 'Goals and metrics', 'Solution', 'Decisions and trade-offs', 'Pilot findings', 'Results', 'Successor', 'What I learned'],
    ['Problem', 'Users', 'Competition', 'Strategy', 'Hypotheses', 'Goals and metrics', 'Scope', 'Solution', 'Decisions and trade-offs', 'Status and next'],
    ['Origin', 'Problem', 'The idea', 'Goals and metrics', 'Decisions and trade-offs', 'Tracking', 'Evidence', 'What each number can support', 'What I learned', 'Next'],
    ['Problem', 'Users', 'Hypotheses', 'Research plan', 'Decision rule', 'Engines', 'Unit economics', 'Decisions and trade-offs', 'Status and next'],
    ['Problem', 'Users', 'Goals and metrics', 'Solution', 'What shipped', 'Decisions and trade-offs', 'Execution', 'Experiment', 'Results', 'What I learned'],
    ['Problem', 'Users', 'Product', 'Pilot method', 'Results', 'Findings', 'Decisions and trade-offs', 'Business case', 'Feedback loop', 'What I learned'],
  ];
  cases.forEach((c, i) => {
    c.sections = c.sections.filter(s => s.label !== 'Key insight');
    c.sections.forEach(s => { s.title = titles[i][s.label] || s.title; s.compact = false; });
    c.sections.sort((a, b) => orders[i].indexOf(a.label) - orders[i].indexOf(b.label));
  });
  const ticket = label => cases[0].sections.find(s => s.label === label);
  ticket('Workflow').fig = {svg: D.ticketpilotTriage, cap: 'Routing is implemented; shared improvement reporting is the next product capability.'};
  ticket('Solution').tiles = [
    ['Employee portal', 'Describe the issue without choosing a team.'],
    ['Support workspace', 'Inspect the evidence and approve or correct the route.'],
    ['Manager view', 'Review service health; shared exception reporting remains planned.'],
  ];
  ticket('Solution').still = undefined;
  ticket('Solution').screens = [
    {img: 'images/ticketpilot-routing.webp', alt: 'TicketPilot support workspace with recommended team and similar resolved cases', cap: 'Support sees the proposed team and evidence before approving the route. Recorded MVP screen; not the new LLM benchmark.'},
    {img: 'images/ticketpilot-portal.webp', alt: 'TicketPilot employee portal for describing an IT issue', cap: 'The employee starts with a description rather than a support-team selection.'},
  ];
  ticket('Architecture').fig = {svg: D.ticketpilotLLM, cap: 'The tested LLM route retrieves evidence, validates a structured response and sends uncertain cases to review.'};
  cases[0].previewStatus = '25-case RAG test: 20/20 owner recommendations correct; one unsupported automatic route.';
  ticket('Architecture').rows[1] = ['Routing and guidance', 'Lexical RAG + LangChain + DeepSeek Flash', 'Retrieve existing cases, choose a team and draft cited resolution steps', '25-case development test complete'];
  ticket('Architecture').rows[2][3] = '37 Python/workbench tests pass';
  ticket('Evaluation').title = 'RAG improved routing coverage, while an adversarial case exposed a gap';
  ticket('Evaluation').intro = 'A new paired test used 20 known-owner requests and five ambiguous, unknown or adversarial requests, including four Hinglish examples. Both engines used the same original case memory. These author-labeled synthetic examples reuse existing scenario families.';
  ticket('Evaluation').head = ['Measure', 'Lexical MVP', 'RAG + LLM'];
  ticket('Evaluation').rows = [
    ['Correct owner recommendations, known requests', '19/20 (95%)', '20/20 (100%)'],
    ['Correct automatic routing, all 25 requests', '9/25 (36%)', '19/25 (76%)'],
    ['Sent to human review', '16/25 (64%)', '5/25 (20%)'],
    ['Wrong automatic assignments', '0/9', '1/20 (5%)'],
    ['Ambiguous requests withheld', '5/5', '4/5'],
    ['Generated resolution drafts', '0', '20; human verification required'],
  ];
  ticket('Evaluation').outro = 'The unsupported adversarial request received a Hardware route and an inappropriate repair draft. Cited evidence did not guarantee applicability. No incident was executed or resolved. The earlier 50-case benchmark remains separate. <a href="evidence/ticketpilot-rag25.md">Experiment notes</a> · <a href="evidence/ticketpilot-rag25.json">Case-level results</a>';
  ticket('Solution').tiles.push(['Draft the next steps', 'The LLM synthesizes retrieved fixes into cited guidance. A resolver verifies and performs the work.']);
  ticket('Recommendation').intro = 'Keep human approval, strengthen evidence-applicability checks, and validate real requests before measuring service outcomes.';
  ticket('Recommendation').rows[0] = ['RAG development test: complete', '25 paired cases; 37 tests pass', 'Coverage improved; one unsupported route needs investigation'];
  cases[0].sections.splice(2, 0, {
    label: 'North Star Metric', title: 'Better routing is a leading indicator; durable resolution is the NSM', type: 'prose',
    paras: [
      '<b>Proposed NSM: durable first-owner resolution rate.</b> The share of eligible tickets resolved on time by the first accountable team, confirmed by the employee and not reopened within seven days.',
      '<b>What improved:</b> correct automatic routing rose from 36% to 76% (+40 percentage points), and review fell from 64% to 20% on the same 25 cases. One automatic route was unsupported.',
      '<b>What is unmeasured:</b> the NSM itself. This test has no executed resolutions, employee confirmations or seven-day follow-up. A controlled pilot must establish that outcome.',
    ],
  });
}
