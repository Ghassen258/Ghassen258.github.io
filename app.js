import { projects, categories } from './data.js';

const $ = selector => document.querySelector(selector);
const grid = $('#project-grid');
const dialog = $('#case-dialog');
const selection = { category: 'all', technology: 'all', query: '' };

/** Static illustrations: each project gets its own visual language. */
const artwork = {
  linkfall: `<svg viewBox="0 0 540 300" role="img" aria-label="Illustration of a network topology with rerouting paths" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="netgrid" width="27" height="27" patternUnits="userSpaceOnUse"><path d="M27 0H0V27" fill="none" stroke="#315e69" stroke-opacity=".25"/></pattern></defs><rect width="540" height="300" fill="#102c3c"/><rect width="540" height="300" fill="url(#netgrid)"/><text x="31" y="44" fill="#7dccdf" font-size="11" font-family="monospace" letter-spacing="3">ROUTING / LIVE TOPOLOGY</text><g fill="none" stroke="#5c8190" stroke-width="2"><path d="M72 151 164 151 264 79 389 109 468 150"/><path d="M164 151 263 218 389 190 468 150"/><path d="M264 79 389 190M263 218 389 109"/></g><path d="M72 151 164 151 264 79 389 109 468 150" stroke="#8be5c8" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M263 218 389 190" stroke="#ef8565" stroke-width="4" stroke-dasharray="8 8" fill="none"/><g fill="#102c3c" stroke="#b4d8d3" stroke-width="3"><circle cx="72" cy="151" r="14"/><circle cx="164" cy="151" r="13"/><circle cx="264" cy="79" r="14"/><circle cx="264" cy="218" r="14"/><circle cx="389" cy="109" r="14"/><circle cx="389" cy="190" r="14"/><circle cx="468" cy="150" r="15"/></g><g font-family="monospace" font-size="10" fill="#b2d0d8"><text x="50" y="180">CLIENT</text><text x="144" y="182">EDGE</text><text x="235" y="56">CORE-A</text><text x="235" y="247">CORE-B</text><text x="372" y="88">EAST</text><text x="368" y="222">WEST</text><text x="455" y="182">DB</text></g><circle cx="321" cy="89" r="6" fill="#fff"/><text x="31" y="272" fill="#8be5c8" font-family="monospace" font-size="12">● PATH RECOVERED</text><text x="486" y="272" fill="#b6cad0" font-family="monospace" font-size="12">08 NODES</text></svg>`,
  echovault: `<svg viewBox="0 0 540 300" role="img" aria-label="Illustrated puzzle room showing an echo opening a gate" xmlns="http://www.w3.org/2000/svg"><rect width="540" height="300" fill="#e5b74a"/><path d="M0 0h540v24H0zM0 276h540v24H0z" fill="#1e2f34"/><g stroke="#c69937" stroke-width="1"><path d="M28 40v220M68 40v220M108 40v220M148 40v220M188 40v220M228 40v220M268 40v220M308 40v220M348 40v220M388 40v220M428 40v220M468 40v220M508 40v220"/><path d="M30 50h480M30 90h480M30 130h480M30 170h480M30 210h480M30 250h480"/></g><g fill="#22363b"><path d="M30 50h39v39H30zm40 0h39v39H70zm40 0h39v39h-39zm160 0h39v39h-39zm0 40h39v39h-39zm0 80h39v39h-39zm0 40h39v39h-39zM430 210h39v39h-39z"/></g><rect x="271" y="132" width="36" height="36" rx="2" fill="#9ed7a2" stroke="#203e37" stroke-width="4"/><path d="M282 149l7 7 10-15" stroke="#203e37" stroke-width="4" fill="none"/><path d="M108 208h55v-16h-55z" fill="#d8a37e" stroke="#203e37" stroke-width="3"/><circle cx="133" cy="201" r="22" fill="#ac86c7" stroke="#25333b" stroke-width="5"/><circle cx="187" cy="149" r="22" fill="#22363b" stroke="#f5f0d7" stroke-width="4"/><path d="M178 149h18M187 140v18" stroke="#f5f0d7" stroke-width="4"/><path d="M231 149h28" stroke="#22363b" stroke-width="5" stroke-linecap="round" stroke-dasharray="5 8"/><path d="M327 149h36" stroke="#22363b" stroke-width="4" stroke-dasharray="5 6"/><circle cx="398" cy="150" r="23" fill="none" stroke="#203e37" stroke-width="6"/><path d="M390 151l6 6 13-16" fill="none" stroke="#203e37" stroke-width="5"/><text x="32" y="37" font-family="monospace" font-size="12" fill="#293337" letter-spacing="3">ROOM 01 / TIME-LOOP PUZZLE</text><text x="386" y="266" font-family="monospace" font-size="11" fill="#263439">ECHO_01 →</text></svg>`,
  'diff-detective': `<svg viewBox="0 0 540 300" role="img" aria-label="Terminal illustration of a Python dependency impact report" xmlns="http://www.w3.org/2000/svg"><rect width="540" height="300" fill="#29293c"/><rect x="35" y="25" width="470" height="252" rx="11" fill="#11131e" stroke="#575467"/><path d="M35 60h470" stroke="#575467"/><circle cx="58" cy="43" r="5" fill="#e98081"/><circle cx="75" cy="43" r="5" fill="#e7c078"/><circle cx="92" cy="43" r="5" fill="#7bc1a8"/><text x="115" y="46" fill="#9894aa" font-size="11" font-family="monospace">impact-analysis.sh</text><g font-size="13" font-family="monospace"><text x="55" y="100" fill="#b5b1cf">$ diff-detective --changed core.py</text><text x="55" y="136" fill="#8bc8b5">✓ Scanned  12 Python modules</text><text x="55" y="165" fill="#c9c6d9">  Changed       core.py</text><text x="55" y="195" fill="#e3bd82">! Indirectly impacted: 2</text><text x="73" y="223" fill="#c9c6d9">↳ service.py</text><text x="73" y="249" fill="#c9c6d9">↳ web.py</text></g></svg>`,
  'forked-futures': `<svg viewBox="0 0 540 300" role="img" aria-label="Editorial page illustration of branching story timelines" xmlns="http://www.w3.org/2000/svg"><rect width="540" height="300" fill="#ebdfcb"/><rect x="20" y="19" width="500" height="262" fill="none" stroke="#aa9b86"/><text x="40" y="49" fill="#86674f" font-family="Georgia,serif" font-size="13" letter-spacing="2">THE ELSEWHERE REVIEW</text><path d="M40 61h460" stroke="#b6a794"/><text x="39" y="116" font-family="Georgia,serif" font-size="42" fill="#42362f">The road</text><text x="39" y="167" font-family="Georgia,serif" font-style="italic" font-size="49" fill="#953c41">not taken.</text><text x="41" y="217" fill="#766e61" font-size="12" font-family="Georgia,serif">Seven endings. One decision at a time.</text><path d="M318 227V78m0 72 90-57m-90 57 105 42M318 200 390 252" fill="none" stroke="#a35b52" stroke-width="2"/><g fill="#ebdfcb" stroke="#a35b52" stroke-width="3"><circle cx="318" cy="150" r="10"/><circle cx="408" cy="93" r="8"/><circle cx="423" cy="192" r="8"/><circle cx="390" cy="252" r="8"/></g><text x="468" y="265" fill="#86674f" font-size="12" font-family="monospace">14 / 07</text></svg>`,
  minidb: `<svg viewBox="0 0 540 300" role="img" aria-label="MiniDB database workbench with a SQL query and B+ tree index" xmlns="http://www.w3.org/2000/svg"><rect width="540" height="300" fill="#e9ece1"/><rect x="22" y="21" width="496" height="258" rx="8" fill="#f9faf4" stroke="#b2beab"/><rect x="22" y="21" width="496" height="35" rx="8" fill="#293a30"/><text x="39" y="44" fill="#c6dd85" font-family="monospace" font-size="13">▤  MINIDB / SQL WORKBENCH</text><rect x="39" y="75" width="292" height="132" fill="#1e2b24" rx="3"/><g font-family="monospace" font-size="13"><text x="56" y="104" fill="#aec58e">SELECT</text><text x="116" y="104" fill="#f7f9ec">* FROM engineers</text><text x="56" y="129" fill="#aec58e">WHERE</text><text x="112" y="129" fill="#f7f9ec">id = 50;</text><text x="56" y="176" fill="#adbbac">→ B+ TREE LOOKUP</text><text x="56" y="194" fill="#95b187">→ 1 ROW MATCHED</text></g><rect x="344" y="75" width="154" height="132" fill="#d4dfbe" rx="3"/><rect x="372" y="94" width="98" height="29" fill="#2b4030" rx="2"/><text x="421" y="113" fill="#f7faed" font-family="monospace" font-size="14" text-anchor="middle">30 | 50</text><path d="M421 124v17m0 0h-39m39 0h39" fill="none" stroke="#627759" stroke-width="2"/><rect x="355" y="148" width="51" height="27" fill="#eef2e4" stroke="#a9b59e"/><rect x="433" y="148" width="51" height="27" fill="#b9d275" stroke="#91a359"/><g text-anchor="middle" font-family="monospace" font-size="10" fill="#27372c"><text x="380" y="166">30 40</text><text x="458" y="166">50 60</text></g><text x="421" y="194" font-family="monospace" font-size="10" text-anchor="middle" fill="#6f8166">INDEX KEYS</text><path d="M39 227h459" stroke="#b9c3ae"/><text x="40" y="252" fill="#65725b" font-family="monospace" font-size="11">C++20 · PERSISTENT STORAGE · WASM</text><text x="459" y="252" fill="#65725b" font-family="monospace" font-size="11">05</text></svg>`,

};

function preview(project) {
  return `<div class="project-preview project-preview--${project.id}"><span class="project-no">BUILD / ${project.number}</span>${artwork[project.id]}<span class="preview-caption">${project.id === 'echovault' ? 'TICK 006 / REWIND' : project.id === 'forked-futures' ? 'AN INTERACTIVE STORY' : project.id === 'linkfall' ? 'PACKET DELIVERY / ACTIVE' : 'ENGINEERING NOTES / ' + project.number}</span></div>`;
}

function tag(text) {
  const span = document.createElement('span');
  span.className = 'tag';
  span.textContent = text;
  return span;
}
function projectCard(p) {
  const article = document.createElement('article');
  article.className = 'project-card' + (p.featured ? ' is-featured' : '');
  article.dataset.project = p.id;
  article.innerHTML = preview(p);
  const body = document.createElement('div');
  body.className = 'project-info';
  const kick = document.createElement('p'); kick.className = 'project-kicker'; kick.textContent = p.kicker;
  const name = document.createElement('h3'); name.textContent = p.name;
  const tagline = document.createElement('p'); tagline.className = 'project-tagline'; tagline.textContent = p.tagline;
  const summary = document.createElement('p'); summary.className = 'project-summary'; summary.textContent = p.summary;
  const tags = document.createElement('div'); tags.className = 'tag-list'; p.technologies.slice(0, 5).forEach(t => tags.append(tag(t)));
  const bottom = document.createElement('div'); bottom.className = 'project-bottom';
  const status = document.createElement('span'); status.className = 'project-status' + (p.status.includes('Private') || p.status.includes('Exploration') ? ' project-status--private' : ''); status.textContent = p.status;
  const actions = document.createElement('div'); actions.className = 'project-card-actions';
  const details = document.createElement('button'); details.type = 'button'; details.textContent = 'Case study ↗'; details.setAttribute('aria-label', `Read ${p.name} case study`); details.addEventListener('click', () => openCase(p)); actions.append(details);
  if (p.demo) { const link = document.createElement('a'); link.href = p.demo; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Live demo ↗'; link.setAttribute('aria-label', `Open ${p.name} live demo in a new tab`); actions.append(link); }
  bottom.append(status, actions);
  body.append(kick, name, tagline, summary, tags, bottom); article.append(body);
  return article;
}

const filterRoot = $('#category-filters');
for (const c of categories) {
  const count = c.id === 'all' ? projects.length : projects.filter(p => p.category.includes(c.id)).length;
  const button = document.createElement('button'); button.type = 'button'; button.className = 'filter-button'; button.dataset.category = c.id; button.setAttribute('aria-pressed', String(c.id === selection.category));
  button.append(document.createTextNode(c.label));
  const number = document.createElement('span'); number.className = 'filter-count'; number.textContent = String(count); button.append(number);
  button.addEventListener('click', () => { selection.category = c.id; render(); }); filterRoot.append(button);
}
const techNames = [...new Set(projects.flatMap(p => p.technologies))].sort((a, b) => a.localeCompare(b));
const techSelector = $('#technology-filter');
for (const t of techNames) { const opt = document.createElement('option'); opt.value = t; opt.textContent = t; techSelector.append(opt); }
function reset() { selection.category = 'all'; selection.technology = 'all'; selection.query = ''; $('#project-search').value = ''; techSelector.value = 'all'; render(); }
$('#clear-filters').addEventListener('click', reset); $('#empty-reset').addEventListener('click', reset);
$('#project-search').addEventListener('input', event => { selection.query = event.target.value.trim().toLowerCase(); render(); });
techSelector.addEventListener('change', event => { selection.technology = event.target.value; render(); });
function render() {
  filterRoot.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.category === selection.category)));
  const visible = projects.filter(p => (selection.category === 'all' || p.category.includes(selection.category)) && (selection.technology === 'all' || p.technologies.includes(selection.technology)) && (!selection.query || [p.name, p.kicker, p.tagline, p.summary, ...p.technologies].join(' ').toLowerCase().includes(selection.query)));
  grid.replaceChildren(...visible.map(projectCard));
  $('#results-count').textContent = `${visible.length} ${visible.length === 1 ? 'project' : 'projects'} / ${projects.length} in the archive`;
  $('#empty-results').hidden = visible.length !== 0;
  $('#clear-filters').hidden = selection.category === 'all' && selection.technology === 'all' && !selection.query;
}

function openCase(p) {
  $('#case-kicker').textContent = `CASE STUDY / ${p.number}`;
  $('#case-status').textContent = p.kicker + ' · ' + p.status;
  $('#case-title').textContent = p.name;
  $('#case-summary').textContent = p.summary;
  $('#case-visual').innerHTML = artwork[p.id];
  $('#case-challenge').textContent = p.challenge;
  $('#case-solution').textContent = p.solution;
  $('#case-architecture').textContent = p.architecture;
  $('#case-tradeoff').textContent = p.tradeoff;
  $('#case-role').textContent = p.role;
  $('#case-tech').replaceChildren(...p.technologies.map(tag));
  const list = $('#case-highlights'); list.replaceChildren();
  p.highlights.forEach(h => { const li = document.createElement('li'); li.textContent = h; list.append(li); });
  const links = $('#case-links'); links.replaceChildren();
  for (const [label, href] of [['Explore live demo', p.demo], ['Read the source code', p.source]]) {
    if (!href) continue;
    const a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = label + ' ↗'; links.append(a);
  }
  if (!p.demo && !p.source) { const text = document.createElement('span'); text.className = 'no-demo'; text.textContent = 'No public demo or code available for this prototype.'; links.append(text); }
  dialog.showModal();
}
$('#case-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
$('#year').textContent = String(new Date().getFullYear());
document.addEventListener('keydown', event => { if (event.key === '/' && !dialog.open && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) { event.preventDefault(); $('#project-search').focus(); } });
render();
