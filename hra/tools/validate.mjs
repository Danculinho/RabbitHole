// Content check for data/puzzles.js — run: node tools/validate.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'data', 'puzzles.js'), 'utf8');

const start = src.indexOf('{');
const end = src.lastIndexOf('}');
let data;
try {
  data = JSON.parse(src.slice(start, end + 1));
} catch (err) {
  console.error('FAIL: data/puzzles.js does not contain a parseable JSON literal.');
  console.error(err.message);
  process.exit(1);
}

const LANGS = ['en', 'sk'];
const QUESTIONS_PER_CHAIN = 7;
const errors = [];
const warnings = [];

// Mirrors RH.answers.normalize in js/answers.js — keep the two in sync.
const normalize = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(the|fc|ac|as|sk|ss|ssc)\s+/, '');

const localized = (obj, path, required = true) => {
  if (!obj || typeof obj !== 'object') {
    if (required) errors.push(`${path}: missing localized object`);
    return;
  }
  for (const lang of LANGS) {
    if (typeof obj[lang] !== 'string' || !obj[lang].trim()) {
      errors.push(`${path}.${lang}: missing or empty`);
    }
  }
};

if (!Array.isArray(data.chains) || data.chains.length === 0) {
  errors.push('chains: must be a non-empty array');
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(data.epoch || '')) {
  errors.push('epoch: must be a YYYY-MM-DD string');
}

const seenIds = new Set();

for (const [ci, chain] of (data.chains || []).entries()) {
  const cp = `chains[${ci}]`;
  if (!chain.id) errors.push(`${cp}.id: missing`);
  if (seenIds.has(chain.id)) errors.push(`${cp}.id: duplicate "${chain.id}"`);
  seenIds.add(chain.id);
  localized(chain.title, `${cp}.title`);

  const qs = chain.questions;
  if (!Array.isArray(qs) || qs.length !== QUESTIONS_PER_CHAIN) {
    errors.push(`${cp}.questions: expected ${QUESTIONS_PER_CHAIN}, got ${qs?.length ?? 0}`);
    continue;
  }

  const chainAnswers = new Set();

  for (const [qi, q] of qs.entries()) {
    const qp = `${chain.id}[q${qi + 1}]`;
    localized(q.topic, `${qp}.topic`);
    localized(q.question, `${qp}.question`);
    localized(q.hint, `${qp}.hint`);
    localized(q.answer?.display, `${qp}.answer.display`);

    // Accept lists must be present, pre-normalized and free of duplicates.
    const accepted = new Set();
    for (const lang of LANGS) {
      const list = q.answer?.accept?.[lang];
      if (!Array.isArray(list) || list.length === 0) {
        errors.push(`${qp}.answer.accept.${lang}: missing or empty`);
        continue;
      }
      for (const raw of list) {
        if (normalize(raw) !== raw) {
          errors.push(`${qp}.answer.accept.${lang}: "${raw}" is not normalized (expected "${normalize(raw)}")`);
        }
        accepted.add(normalize(raw));
      }
      accepted.add(normalize(q.answer?.display?.[lang] ?? ''));
    }

    // The display form must itself be an accepted answer, or players who type
    // exactly what the game shows them would be marked wrong.
    for (const lang of LANGS) {
      const display = normalize(q.answer?.display?.[lang] ?? '');
      if (display && !accepted.has(display)) {
        errors.push(`${qp}: display "${q.answer.display[lang]}" not covered by accept lists`);
      }
    }

    for (const lang of LANGS) {
      const ds = q.distractors?.[lang];
      if (!Array.isArray(ds) || ds.length !== 3) {
        errors.push(`${qp}.distractors.${lang}: expected 3, got ${ds?.length ?? 0}`);
        continue;
      }
      if (new Set(ds.map(normalize)).size !== 3) {
        errors.push(`${qp}.distractors.${lang}: contains duplicates`);
      }
      for (const d of ds) {
        if (accepted.has(normalize(d))) {
          errors.push(`${qp}.distractors.${lang}: "${d}" is also a correct answer`);
        }
      }
    }

    const answerKey = normalize(q.answer?.display?.en ?? '');
    if (chainAnswers.has(answerKey)) {
      errors.push(`${qp}: answer "${q.answer.display.en}" repeats earlier in the same chain`);
    }
    chainAnswers.add(answerKey);

    // Chain link: the next question's topic should echo the previous answer.
    // Judgement call for the author, so this only warns.
    if (qi > 0) {
      const prev = normalize(qs[qi - 1].answer?.display?.en ?? '');
      const topic = normalize(q.topic?.en ?? '');
      const overlap = prev && topic && (topic.includes(prev) || prev.includes(topic));
      if (!overlap) {
        warnings.push(`${qp}: topic "${q.topic?.en}" does not echo previous answer "${qs[qi - 1].answer?.display?.en}"`);
      }
    }
  }
}

const chainCount = data.chains?.length ?? 0;
console.log(`Checked ${chainCount} chain(s), ${chainCount * QUESTIONS_PER_CHAIN} question(s).`);
for (const w of warnings) console.log(`  WARN  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`  FAIL  ${e}`);
  console.error(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log(warnings.length ? `\nPASS with ${warnings.length} warning(s).` : '\nPASS');
