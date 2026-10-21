// Hand-drawn SVG diagrams for the case pages. Each one shows a mechanism the prose
// would otherwise make the reader assemble: a journey, a boundary, a pipeline, an org.
// Colours come from the page through currentColor and CSS classes (see case.css "diagrams").

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
let N = 0, CUR = '';

/* ---------- primitives ---------- */
function svg(w, h, aria, draw, cls = '') {
  CUR = 'd' + (++N);
  const mk = (id, hot) => `<marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="mk${hot ? ' hot' : ''}" d="M0,0L10,5L0,10z"/></marker>`;
  return `<svg class="dg ${cls}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(aria)}"><defs>${mk(CUR + 'a', false)}${mk(CUR + 'h', true)}</defs>${draw()}</svg>`;
}
/* box with a serif title and optional sub lines, all centred */
function box(x, y, w, h, title, sub = [], cls = '') {
  sub = [].concat(sub);
  const block = 17 + 15 * sub.length, top = y + h / 2 - block / 2 + 12, cx = x + w / 2;
  return `<rect class="bx ${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/>`
    + (title ? `<text class="t" x="${cx}" y="${top}" text-anchor="middle">${title}</text>` : '')
    + sub.map((s, i) => `<text class="s" x="${cx}" y="${top + 17 + 15 * i}" text-anchor="middle">${s}</text>`).join('');
}
const lab = (x, y, t, anchor = 'start', cls = 'lb') => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;
const txt = (x, y, t, cls = 's', anchor = 'start') => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${t}</text>`;
/* arrow along a path; cls: '', 'hot', 'dash', 'hot dash'; end=false for a plain connector */
function arr(d, cls = '', end = true) {
  const hot = cls.includes('hot');
  return `<path class="ln ${cls}" d="${d}"${end ? ` marker-end="url(#${CUR}${hot ? 'h' : 'a'})"` : ''}/>`;
}
const row = (xs, y, w, h, items) => items.map((it, i) => box(xs[i], y, w, h, it[0], it[1] || [], it[2] || '')).join('');
const chain = (xs, w, y, cls = '') => xs.slice(0, -1).map((x, i) => arr(`M${x + w} ${y}H${xs[i + 1] - 2}`, cls)).join('');

/* ======================= ATÉLIER ======================= */
export const atelierJourney = () => svg(800, 264,
  'Journey of the primary persona, an MBA student before a quiz. Today: remembers the idea, tries a keyword, gets no match, scrolls notebooks. With Atélier: remembers the idea, asks in her own words, gets the matched page and a one-tap gist from her own notes.',
  () => {
    const xs = [180, 336, 492, 648], w = 130;
    return box(0, 22, 150, 230, '', [], 'soft')
      + lab(14, 46, 'PRIMARY PERSONA') + txt(14, 72, 'MBA student', 't')
      + txt(14, 94, 'Writes by hand on iPad') + txt(14, 110, 'A quiz most weeks')
      + lab(14, 146, 'JOB TO BE DONE') + txt(14, 168, 'Find what the professor') + txt(14, 184, 'said about pricing in') + txt(14, 200, 'week 3, and get the gist') + txt(14, 216, 'before the quiz.')
      + lab(180, 16, 'TODAY')
      + row(xs, 24, w, 74, [['Remembers', ['the idea, not', 'the exact words']], ['Keyword search', ['types one word']], ['No match', ['she wrote it', 'differently'], 'ghost'], ['Scrolls', ['notebook by', 'notebook']]])
      + chain(xs, w, 61)
      + lab(180, 160, 'WITH ATÉLIER', 'start', 'lb hot')
      + row(xs, 168, w, 74, [['Remembers', ['the idea, not', 'the exact words']], ['Asks', ['in her own words', 'search by meaning'], 'hot'], ['Matched page', ['in the top', 'results']], ['One-tap gist', ['from her own', 'notes only'], 'hot']])
      + chain(xs, w, 205, 'hot');
  });

export const atelierBoundary = () => svg(800, 250,
  'How a question becomes an answer in Atélier. Handwritten pages are understood by meaning, which powers search (matched pages for any wording) and summaries (a one-tap gist citing the user\'s pages). Everything sits inside a boundary of the user\'s own notes; outside knowledge is never used.',
  () => box(0, 94, 140, 66, 'Outside', ['knowledge, the', 'internet'], 'ghost')
    + arr('M142 127H190', 'dash', false) + `<path class="ln" d="M160 119l12 16M172 119l-12 16"/>` + txt(166, 156, 'never used', 'al', 'middle')
    + `<rect class="zone" x="196" y="10" width="600" height="230" rx="16"/>` + lab(214, 32, 'ONLY YOUR OWN NOTES ARE USED', 'start', 'lb hot')
    + box(214, 94, 150, 66, 'Your pages', ['handwritten with', 'Apple Pencil'])
    + arr('M364 127H400') + box(402, 94, 150, 66, 'Understood', ['by meaning, not', 'only by words'])
    + arr('M552 127H574V77H606') + arr('M574 127V177H606', 'hot')
    + box(608, 46, 172, 62, 'Matched pages', ['for any wording'])
    + box(608, 146, 172, 62, 'One-tap gist', ['cites your own pages'], 'hot')
    + txt(568, 100, 'search', 'al', 'end') + txt(568, 162, 'summary', 'al hot', 'end'));

export const atelierMatrix = () => svg(600, 420,
  'Value to students against effort for each candidate feature. In v1: pen and paper feel, search by meaning, grounded summaries, echoes of past notes. Later: chat assistant, auto-flashcards. Not planned: sharing.',
  () => {
    const pts = [
      [255, 70, 'Pen and paper feel', 'hot', 'r'], [470, 86, 'Search by meaning', 'hot', 'l'], [330, 122, 'Grounded summaries', 'hot', 'r'],
      [150, 168, 'Echoes of past notes', 'hot', 'r'], [455, 214, 'Chat assistant', '', 'l'], [300, 246, 'Auto-flashcards', '', 'r'], [480, 306, 'Sharing', 'ghost', 'l'],
    ];
    return `<path class="ax" d="M70 340H560M70 340V20"/>` + `<path class="grid" d="M315 24V336M74 180H556"/>`
      + txt(80, 40, 'Do first', 'q') + txt(552, 40, 'Big bets', 'q', 'end') + txt(80, 326, 'Quick wins', 'q') + txt(552, 326, 'Skip', 'q', 'end')
      + lab(560, 362, 'EFFORT →', 'end') + `<text class="lb" transform="translate(44 340) rotate(-90)">VALUE TO STUDENTS →</text>`
      + pts.map(([x, y, t, c, side]) => `<circle class="pt ${c}" cx="${x}" cy="${y}" r="7"/>` + txt(side === 'r' ? x + 13 : x - 13, y + 4, t, c === 'hot' ? 't' : 's', side === 'r' ? 'start' : 'end')).join('')
      + `<circle class="pt hot" cx="80" cy="398" r="6"/>` + txt(92, 402, 'In v1') + `<circle class="pt" cx="160" cy="398" r="6"/>` + txt(172, 402, 'Later') + `<circle class="pt ghost" cx="232" cy="398" r="6"/>` + txt(244, 402, 'Not planned');
  }, 'narrow');

/* ======================= ALPINE SKIES ======================= */
export const alpineJourney = () => svg(800, 250,
  'Player journey. Opens the tab, guest start with no sign-up, first flight in seconds, first mission, comes back. Two needs: players who want a quick flight are served at first flight; players who want to learn are served at first mission through Flight School. Returning is a stage both groups reach, not a separate group. The Daily Challenge loops them back into missions. Each step has its funnel metric.',
  () => {
    const xs = [0, 165, 330, 495, 660], w = 140;
    const chip = (cx, t, wd) => `<rect class="chip" x="${cx - wd / 2}" y="6" width="${wd}" height="32" rx="16"/>` + txt(cx, 26, t, 's', 'middle');
    return chip(400, 'Need: a quick flight', 150) + chip(565, 'Need: to learn', 120)
      + arr('M400 38V94', 'dash') + arr('M565 38V94', 'dash')
      + [['LANDING', 0], ['', 1], ['FIRST FLIGHT', 2], ['FIRST MISSION', 3], ['7-DAY RETURN', 4]].map(([t, i]) => t ? lab(xs[i] + 82, 86, t, 'middle', i === 4 ? 'lb hot' : 'lb') : '').join('')
      + row(xs, 96, w, 70, [['Opens the tab', ['from a shared link']], ['Guest start', ['no sign-up wall'], 'hot'], ['First flight', ['in the air', 'in seconds']], ['First mission', ['Flight School', 'or Campaign']], ['Comes back', ['Daily Challenge,', 'leaderboard'], 'hot']])
      + chain(xs, w, 131)
      + arr('M740 166V206H575V170', 'hot') + txt(658, 224, 'a reason to return every day', 'al hot', 'middle');
  });

export const alpineExperiment = () => svg(800, 196,
  'The onboarding A/B test. Control: open the tab, pick from the mode menu, the mode loads, then the first mission. Variant: open the tab, a 60-second guided flight, then the first mission. The variant removes the menu step. Metric: share of new players completing a mission in session 1.',
  () => {
    const w = 150;
    return lab(0, 16, 'CONTROL')
      + row([0, 180, 360, 540], 24, w, 58, [['Opens the tab'], ['Mode menu', ['picks one of five']], ['Mode loads'], ['First mission']])
      + chain([0, 180, 360, 540], w, 53)
      + lab(0, 116, 'VARIANT', 'start', 'lb hot')
      + box(0, 124, w, 58, 'Opens the tab') + box(180, 124, 330, 58, '60-second guided flight', ['straight into the air'], 'hot') + box(540, 124, w, 58, 'First mission')
      + arr('M150 153H178', 'hot') + arr('M510 153H538', 'hot')
      + lab(706, 90, 'MEASURED', 'start') + txt(706, 108, 'mission done') + txt(706, 124, 'in session 1') + `<path class="ln" d="M694 53V153" />`;
  });

/* ======================= VOICE CAPTURE ======================= */
export const voiceSegments = () => svg(600, 400,
  'Segments by ease of reach and willingness to pay. Students are easy to reach with low to medium willingness to pay, so they are the test group. Sales and client-facing professionals are harder to reach but pay the most. Field workers and SMB owners are hard to reach with medium willingness to pay. Students can show whether the transcripts are accurate; only sales professionals can show whether they would pay, so they are interviewed directly.',
  () => `<path class="ax" d="M70 340H560M70 340V20"/>` + `<path class="grid" d="M315 24V336M74 180H556"/>`
    + txt(80, 40, 'Sell here', 'q') + txt(552, 40, 'Ideal', 'q', 'end') + txt(80, 326, 'Avoid', 'q') + txt(552, 326, 'Test here', 'q', 'end')
    + lab(560, 362, 'EASE OF REACH →', 'end') + `<text class="lb" transform="translate(44 340) rotate(-90)">WILLINGNESS TO PAY →</text>`
    + `<circle class="pt hot" cx="460" cy="250" r="8"/>` + txt(448, 278, 'Students', 't', 'end') + txt(448, 294, 'primary for testing', 's', 'end')
    + `<circle class="pt" cx="190" cy="78" r="8"/>` + txt(204, 74, 'Sales and', 't') + txt(204, 92, 'client-facing pros', 't')
    + `<circle class="pt" cx="140" cy="196" r="8"/>` + txt(154, 200, 'Field workers, SMBs', 's')
    + arr('M452 242C426 176 300 122 202 108', 'hot dash') + txt(372, 140, 'accuracy: test with students', 'al hot') + txt(372, 155, 'willingness to pay: ask sales', 'al hot')
    + lab(70, 384, 'POSITIONS ARE QUALITATIVE, FROM DESK RESEARCH'), 'narrow');

export const voicePipeline = () => svg(800, 262,
  'The study pipeline. Real clips and the open Svarah set go through four engines: Sarvam, OpenAI mini, Deepgram Nova-3 and Apple built-in as the free baseline. Each is scored on word error rate by accent and by language mix, speed and cost per hour. A decision rule set in advance turns the scores into build, pivot or kill.',
  () => box(0, 36, 170, 84, 'Real clips', ['20 to 30 lectures,', 'calls, Hinglish'])
    + box(0, 144, 170, 70, 'Svarah set', ['open Indian-accent', 'speech'])
    + arr('M170 78H200', '', false) + arr('M170 179H200', '', false) + `<path class="ln" d="M200 36V214"/>`
    + [['Sarvam', 'India-first'], ['OpenAI mini', 'general'], ['Deepgram Nova-3', 'Hinglish mode'], ['Apple built-in', 'free baseline']].map(([t, s], i) =>
      arr(`M200 ${43 + 58 * i}H228`) + box(230, 18 + 58 * i, 170, 50, t, s, i === 3 ? 'ghost' : '')).join('')
    + [0, 1, 2, 3].map((i) => arr(`M400 ${43 + 58 * i}H430`, '', false)).join('') + `<path class="ln" d="M430 43V217"/>` + arr('M430 130H458')
    + box(460, 64, 160, 132, 'Scored', ['WER by accent', 'WER by language mix', 'speed', 'cost per hour'])
    + arr('M620 130H632V48H646') + box(648, 18, 152, 60, 'Decision rule', ['set before testing'], 'hot')
    + arr('M724 78V96', 'hot', false) + `<path class="ln hot" d="M664 96H784"/>`
    + ['Build', 'Pivot', 'Kill'].map((t, i) => arr(`M${664 + 60 * i} 96V138`, 'hot') + box(640 + 60 * i, 140, 50, 40, '', []) + txt(665 + 60 * i, 165, t, 't', 'middle')).join('')
    + txt(724, 210, 'one number', 'al', 'middle') + txt(724, 225, 'drives the call', 'al', 'middle'));

export const voiceShape = () => svg(800, 250,
  'If built, the product shape. Capture from a phone recorder. Audio goes to the accent-test winning cloud engine, with Apple on-device as the offline backup. Both produce a transcript, which phone makers give away. The product competes above the transcript, on summaries, action items and exports for one user group.',
  () => lab(0, 16, 'CAPTURE') + box(0, 28, 150, 60, 'Phone recorder', ['lectures, calls'])
    + arr('M150 58H206') + arr('M178 58V158H206', 'dash')
    + lab(208, 16, 'ENGINE') + box(208, 28, 170, 60, 'Test winner', ['cloud, accent-tuned']) + box(208, 128, 170, 60, 'Apple on-device', ['offline backup'], 'ghost')
    + arr('M378 58H404V96H430') + arr('M378 158H404V120H430', 'dash')
    + box(432, 78, 140, 60, 'Transcript', ['a commodity']) + txt(502, 160, 'phone makers', 'al', 'middle') + txt(502, 175, 'give this away', 'al', 'middle')
    + arr('M572 108H596', '', false) + `<path class="ln hot" d="M596 46V182"/>`
    + `<rect class="zone" x="612" y="8" width="188" height="214" rx="14"/>` + lab(626, 28, 'WHERE WE COMPETE', 'start', 'lb hot')
    + [['Summaries', 40], ['Action items', 100], ['Exports', 160]].map(([t, y]) => arr(`M596 ${y + 22}H624`, 'hot') + box(626, y, 160, 44, t, [], 'hot')).join('')
    + txt(706, 240, 'for one user group', 'al hot', 'middle'));

/* ======================= ROUTER (multi-layer, multi-agent org) ======================= */
export const routerOrg = () => svg(800, 446,
  'The router as an org with three layers and dedicated roles. Layer 1: a Director (Claude) plans and signs off. Layer 2: Engineering, Content and Research leads break work down and review their stream. Layer 3: low-cost worker models act as coder, tester, writer, editor, researcher and summariser. Staff roles serve every layer: Dispatcher, QA reviewer, Budget keeper and Escalation.',
  () => {
    const lead = [30, 310, 590], lc = lead.map((x) => x + 90);
    const workers = [['Coder', 'Tester'], ['Writer', 'Editor'], ['Researcher', 'Summariser']];
    return lab(0, 22, 'LAYER 1 · FRONTIER MODEL') + box(310, 32, 180, 62, 'Director', ['Claude · plans, signs off'], 'hot')
      + arr(`M400 94V118H${lc[0]}V142`) + arr('M400 118V142', '') + arr(`M400 118H${lc[2]}V142`)
      + lab(0, 134, 'LAYER 2 · LEADS') + lead.map((x, i) => box(x, 144, 180, 60, ['Engineering lead', 'Content lead', 'Research lead'][i], ['breaks down, reviews'])).join('')
      + lab(0, 338, 'LAYER 3 · WORKERS')
      + lc.map((c, i) => arr(`M${c} 204V230H${c - 60}V262`) + arr(`M${c} 230H${c + 60}V262`)
        + box(c - 115, 264, 110, 54, workers[i][0], ['low-cost model']) + box(c + 5, 264, 110, 54, workers[i][1], ['low-cost model'])).join('')
      + lab(0, 378, 'STAFF ROLES · SERVE EVERY LAYER', 'start', 'lb hot')
      + row([0, 205, 410, 615], 386, 185, 56, [['Dispatcher', ['cheapest capable model']], ['QA reviewer', ['checks every output'], 'hot'], ['Budget keeper', ['cost cap per task']], ['Escalation', ['one retry, then up']]]);
  });

export const routerLifecycle = () => svg(800, 268,
  'Lifecycle of a task. The task arrives, the Director plans streams, a Lead breaks each stream into steps, the Dispatcher assigns each step to the cheapest capable model, workers run in parallel, QA reviews every output. On pass, the Lead merges and the Director signs off. On fail, the worker retries once; if it fails again the step escalates up a layer.',
  () => {
    const xs = [0, 213, 427, 640], w = 160;
    return row(xs, 28, w, 62, [['Task arrives', ['a goal, not steps']], ['Director plans', ['splits into streams'], 'hot'], ['Lead breaks down', ['steps per stream']], ['Dispatcher', ['cheapest capable model']]])
      + chain(xs, w, 59)
      + `<rect class="bx" x="652" y="140" width="148" height="62" rx="10"/><rect class="bx" x="646" y="144" width="154" height="62" rx="10"/>` + box(640, 148, w, 62, 'Workers run', ['in parallel'])
      + arr('M700 90V137')
      + box(427, 148, w, 62, 'QA review', ['against the task'], 'hot') + box(213, 148, w, 62, 'Lead merges', ['stream complete']) + box(0, 148, w, 62, 'Director signs off', ['final check'], 'hot')
      + arr('M640 179H589') + arr('M427 179H375', 'hot') + arr('M213 179H162', 'hot')
      + txt(401, 170, 'pass', 'al hot', 'middle')
      + arr('M480 210V244H720V212') + txt(600, 262, 'fail · retry once', 'al', 'middle')
      + arr('M540 148V92', 'dash') + txt(548, 124, 'fails again · escalate', 'al');
  });
