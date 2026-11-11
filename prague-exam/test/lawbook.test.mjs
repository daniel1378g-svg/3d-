// The lawbook is read by a learner on the result sheet, so these tests guard its shape: every
// fault code of the architecture document has a complete entry, and the texts keep the agreed
// style. Whether a citation is correct cannot be tested here; that is what docs/rules-notes.md
// is for.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import {
  MINOR_LIMIT, LAWBOOK, PHRASES, CHECKLIST, SIGN_NAMES,
} from '../src/js/sim/lawbook.js';

const architecture = readFileSync(
  fileURLToPath(new URL('../docs/ARCHITECTURE.md', import.meta.url)),
  'utf8',
);

// The codes come from the document itself, so the test fails when the document gains a code that
// the lawbook does not know yet.
function codesFromArchitecture(label) {
  const section = architecture.split('## Fault codes')[1].split('\n## ')[0];
  const paragraph = section.split(/\n\s*\n/).find((p) => p.trimStart().startsWith(`${label}:`));
  assert.ok(paragraph, `no "${label}:" paragraph under "## Fault codes"`);
  return [...paragraph.matchAll(/`([A-Z][A-Z0-9_]+)`/g)].map((m) => m[1]);
}

const SERIOUS = codesFromArchitecture('Serious');
const MINOR = codesFromArchitecture('Minor');

// Codes whose severity deliberately differs from the architecture document: { CODE: 'minor' }.
// Empty today. Add a code here only together with a reason in docs/rules-notes.md.
const SEVERITY_CHANGES = {};

const PHRASE_KEYS = [
  'intro', 'turnLeft', 'turnRight', 'straight', 'turnLeftAtLights', 'turnRightAtLights',
  'secondLeft', 'secondRight', 'roundaboutExit1', 'roundaboutExit2', 'roundaboutExit3',
  'roundaboutExit4', 'followRoad', 'uturn', 'pullOver', 'park', 'continue', 'finish', 'passed',
  'failed', 'intervention', 'slowDown', 'checkBelt', 'checkLights',
];

const CHECKLIST_IDS = [
  'seat', 'mirrors', 'belt', 'engine', 'lights', 'gear', 'handbrake', 'signal', 'observe',
];

const SIGN_CODES = [
  'P1', 'P2', 'P3', 'P4', 'P6', 'P7', 'P8',
  'B1', 'B2', 'B20a', 'B24a', 'B24b', 'B25', 'B28', 'B29',
  'C1', 'C2a', 'C2b', 'C2c', 'C2d', 'C2e', 'C2f', 'C4a', 'C4b',
  'IP4b', 'IP6', 'IP10a', 'IP11a', 'IZ5a', 'IZ5b', 'IZ8a', 'IZ8b', 'IJ4b', 'IJ4c',
  'A11', 'A12b', 'A25', 'A29', 'A30', 'A32a', 'A7a',
];

const isText = (value) => typeof value === 'string' && value.trim().length > 0;

test('the architecture document lists both groups of fault codes', () => {
  assert.ok(SERIOUS.length >= 10, 'serious codes were not parsed');
  assert.ok(MINOR.length >= 10, 'minor codes were not parsed');
  const all = [...SERIOUS, ...MINOR];
  assert.equal(new Set(all).size, all.length, 'a code appears twice in the document');
});

test('LAWBOOK has exactly the fault codes of the architecture document', () => {
  assert.deepEqual(Object.keys(LAWBOOK).sort(), [...SERIOUS, ...MINOR].sort());
});

test('every LAWBOOK entry is complete', () => {
  for (const [code, entry] of Object.entries(LAWBOOK)) {
    assert.deepEqual(
      Object.keys(entry).sort(),
      ['cz', 'law', 'rule', 'severity', 'title', 'what'],
      `${code}: unexpected set of fields`,
    );
    assert.ok(['minor', 'serious'].includes(entry.severity), `${code}: severity`);
    for (const field of ['title', 'what', 'rule', 'law', 'cz']) {
      assert.ok(isText(entry[field]), `${code}: ${field} is empty`);
      assert.equal(entry[field], entry[field].trim(), `${code}: ${field} has stray whitespace`);
      assert.ok(!/\s{2,}/.test(entry[field]), `${code}: ${field} has a double space`);
    }
  }
});

test('severities follow the architecture document', () => {
  for (const code of SERIOUS) {
    assert.equal(LAWBOOK[code].severity, SEVERITY_CHANGES[code] ?? 'serious', code);
  }
  for (const code of MINOR) {
    assert.equal(LAWBOOK[code].severity, SEVERITY_CHANGES[code] ?? 'minor', code);
  }
});

test('LAWBOOK texts keep the agreed style', () => {
  for (const [code, entry] of Object.entries(LAWBOOK)) {
    // Titles sit in a narrow list on a phone.
    assert.ok(entry.title.split(/\s+/).length <= 7, `${code}: title has too many words`);
    assert.ok(entry.title.length <= 36, `${code}: title is too long`);
    assert.ok(!/[.!?]$/.test(entry.title), `${code}: title ends with punctuation`);

    // The game appends a detail after `what`, so it has to be a finished sentence.
    assert.ok(entry.what.endsWith('.'), `${code}: what must end with a full stop`);
    assert.ok(entry.rule.endsWith('.'), `${code}: rule must end with a full stop`);
    assert.ok(/^You\b/.test(entry.what), `${code}: what addresses the driver as "you"`);

    for (const field of ['title', 'what', 'rule']) {
      assert.ok(!entry[field].includes('!'), `${code}: ${field} has an exclamation mark`);
    }

    // A citation names its source in the Sbírka zákonů.
    assert.match(entry.law, /č\. \d+\/\d{4} Sb\./, `${code}: law names no act or decree`);
    assert.match(entry.law, /§ \d+/, `${code}: law names no section`);
  }
});

test('MINOR_LIMIT is a usable count', () => {
  assert.ok(Number.isInteger(MINOR_LIMIT), 'MINOR_LIMIT must be an integer');
  assert.ok(MINOR_LIMIT >= 2 && MINOR_LIMIT <= 10, 'MINOR_LIMIT is out of a sensible range');
});

test('PHRASES has every examiner line in Czech and English', () => {
  for (const key of PHRASE_KEYS) {
    assert.ok(PHRASES[key], `missing phrase ${key}`);
    assert.ok(isText(PHRASES[key].cz), `${key}: cz is empty`);
    assert.ok(isText(PHRASES[key].en), `${key}: en is empty`);
    assert.ok(!PHRASES[key].en.includes('!'), `${key}: en has an exclamation mark`);
    assert.ok(/[.?]$/.test(PHRASES[key].cz), `${key}: cz must end a sentence`);
    assert.ok(/[.?]$/.test(PHRASES[key].en), `${key}: en must end a sentence`);
  }
  assert.deepEqual(Object.keys(PHRASES).sort(), [...PHRASE_KEYS].sort());
});

test('roundabout phrases name four different exits', () => {
  const lines = [1, 2, 3, 4].map((n) => PHRASES[`roundaboutExit${n}`]);
  assert.equal(new Set(lines.map((line) => line.cz)).size, 4);
  assert.equal(new Set(lines.map((line) => line.en)).size, 4);
});

test('CHECKLIST lists the pre-drive items in order', () => {
  assert.deepEqual(CHECKLIST.map((item) => item.id), CHECKLIST_IDS);
  for (const item of CHECKLIST) {
    for (const field of ['cz', 'en', 'why']) {
      assert.ok(isText(item[field]), `${item.id}: ${field} is empty`);
    }
    assert.ok(item.why.endsWith('.'), `${item.id}: why must be a sentence`);
    assert.ok(!item.why.includes('!') && !item.en.includes('!'), `${item.id}: exclamation mark`);
  }
});

test('SIGN_NAMES names every sign code the map uses', () => {
  for (const code of SIGN_CODES) {
    assert.ok(SIGN_NAMES[code], `missing sign ${code}`);
  }
  for (const [code, name] of Object.entries(SIGN_NAMES)) {
    assert.ok(isText(name.cz), `${code}: cz is empty`);
    assert.ok(isText(name.en), `${code}: en is empty`);
    assert.ok(!name.en.includes('!'), `${code}: en has an exclamation mark`);
  }
});

test('the module is plain data that survives JSON', () => {
  // The result sheet and tests may serialise entries; functions or cycles would break that.
  for (const value of [LAWBOOK, PHRASES, CHECKLIST, SIGN_NAMES]) {
    assert.deepEqual(JSON.parse(JSON.stringify(value)), value);
  }
});
