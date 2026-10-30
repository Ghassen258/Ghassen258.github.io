import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { projects, categories } from '../data.js';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
test('the portfolio contains exactly the four selected projects, documented for future expansion', () => {
  assert.deepEqual(projects.map(p => p.id), ['linkfall', 'echovault', 'diff-detective', 'forked-futures']);
  assert.equal(projects.length, 4);
  assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
  for (const p of projects) {
    for (const field of ['name','summary','challenge','solution','architecture','tradeoff','role','status']) assert.ok(typeof p[field] === 'string' && p[field].length >= (field === 'name' || field === 'status' ? 3 : 9), `${p.id} missing ${field}`);
    assert.ok(p.technologies.length >= 3, `${p.id} has too few technology labels`);
    assert.equal(p.highlights.length, 3);
    assert.ok(p.category.every(id => categories.some(c => c.id === id)), `${p.id} includes an unknown category`);
  }
});
test('the three browser demos have valid demo links', () => {
  const demos = projects.filter(p => p.demo);
  assert.equal(demos.length, 3);
  assert.ok(demos.every(p => p.demo.startsWith('https://ghassen258.github.io/')));
});
test('project links point to real repository identifiers or are explicitly private', () => {
  for (const p of projects) if (p.source) assert.ok(p.source.startsWith('https://github.com/Ghassen258/'));
  assert.ok(projects.every(p => p.source), 'every selected project has a public source repository');
});
test('the interactive UI has all required elements', () => {
  for (const id of ['project-grid','project-search','technology-filter','category-filters','results-count','clear-filters','empty-results','empty-reset','case-dialog','case-close','case-title','case-summary','case-visual','case-challenge','case-solution','case-architecture','case-tradeoff','case-role','case-tech','case-highlights','case-links','year']) assert.ok(html.includes(`id="${id}"`), `missing ${id}`);
  assert.ok(script.includes('showModal()'));
  assert.ok(script.includes('aria-pressed'));
});
test('the site includes navigation, SEO and contact information', () => {
  for (const phrase of ['name="description"','property="og:title"','href="#work"','href="#about"','href="#contact"','ghassenbenjaber0@gmail.com','assets/mark.svg']) assert.ok(html.includes(phrase), `missing ${phrase}`);
});

test('the public site mentions no unrelated projects or old portfolio categories', () => {
  const content = [html, script, readFileSync(new URL('../data.js', import.meta.url), 'utf8')].join('\n');
  for (const excluded of ['GClinique', 'react-flow-ws', 'Connected Ideas', "id: 'ai'"]) assert.ok(!content.includes(excluded), `Unexpected project or category: ${excluded}`);
});
