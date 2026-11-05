// tools/live.gs (the Google Apps Script behind the live match log), run in Node with the
// Google services stubbed: PIN check, add without duplicates, soft delete, roster, input limits.
// Usage: node tools/test_live_gs.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import vm from 'node:vm';

const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'live.gs'), 'utf8');
let failed = 0;
function check(name, ok, detail) {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' ' + detail : ''}`);
}

function sheetStub() {
  const sheets = {};
  function sheet(name) {
    const data = [];
    return {
      getName: () => name,
      getLastRow: () => data.length,
      getLastColumn: () => (data[0] || []).length,
      appendRow: (r) => { data.push(r.slice()); },
      getRange: (row, col, nr, nc) => ({
        getValues: () => data.slice(row - 1, row - 1 + nr).map((r) => r.slice(col - 1, col - 1 + nc)),
        setValue: (v) => { data[row - 1][col - 1] = v; },
        setValues: (vals) => { vals.forEach((v, i) => { data[row - 1 + i] = data[row - 1 + i] || []; v.forEach((x, j) => { data[row - 1 + i][col - 1 + j] = x; }); }); },
      }),
      clearContents: () => { data.length = 0; },
      _data: data,
    };
  }
  const book = {
    getSheetByName: (n) => sheets[n] || null,
    insertSheet: (n) => (sheets[n] = sheet(n)),
    getId: () => 'sheet-1', getUrl: () => 'https://docs.google.com/spreadsheets/d/sheet-1',
  };
  return {
    getActiveSpreadsheet: () => null,          // a standalone script has no Sheet of its own
    create: () => book,
    openById: (id) => (id === 'sheet-1' ? book : null),
    _sheets: sheets,
  };
}

const SS = sheetStub();
const props = {};
const ctx = {
  SpreadsheetApp: SS,
  PropertiesService: { getScriptProperties: () => ({ getProperty: (k) => props[k] || null, setProperty: (k, v) => { props[k] = v; } }) },
  LockService: { getScriptLock: () => ({ waitLock: () => {}, releaseLock: () => {} }) },
  ContentService: {
    MimeType: { JSON: 'json' },
    createTextOutput: (s) => ({ _s: s, setMimeType() { return this; } }),
  },
  Date, JSON, Math, String, Number, Array, Object,
};
vm.createContext(ctx);
vm.runInContext(src, ctx);

// setup(): creates the Sheet and a PIN, and keeps a PIN that was set by hand
props.PIN = '1234';
const url = ctx.setup();
check('setup creates the Sheet', url === 'https://docs.google.com/spreadsheets/d/sheet-1' && props.SHEET_ID === 'sheet-1');
check('setup keeps a chosen PIN', props.PIN === '1234');
check('setup writes the PIN for the owner', SS._sheets.nastavenia._data[0][1] === '1234');
ctx.setup();
check('setup can run twice', SS._sheets.nastavenia._data.length === 2 && SS._sheets.log._data.length === 1);
delete props.PIN; ctx.setup();
check('setup makes a 6-digit PIN when none is set', /^\d{6}$/.test(props.PIN), `(${String(props.PIN).length} digits)`);
props.PIN = '1234';

const get = () => JSON.parse(ctx.doGet({ parameter: {} })._s);
const post = (body) => JSON.parse(ctx.doPost({ postData: { contents: JSON.stringify(body) } })._s);
const row = (id, type, extra) => Object.assign({ id, ts: 1762419600000, match: 'football|2026-11-06|09:00', type, minute: '12', a: '9', b: '10', note: '' }, extra);

check('empty log', get().ok === true && get().rows.length === 0);
check('wrong PIN refused', post({ pin: '0000', op: 'add', rows: [row('x1', 'goal')] }).error === 'pin' && get().rows.length === 0);
check('missing PIN refused', post({ op: 'add', rows: [row('x1', 'goal')] }).ok === false);
check('PIN check op', post({ pin: '1234', op: 'check' }).ok === true);
post({ pin: '1234', op: 'add', rows: [row('x1', 'goal'), row('x2', 'sub')] });
post({ pin: '1234', op: 'add', rows: [row('x1', 'goal')] });
let g = get();
check('rows added once each', g.rows.length === 2, `(${g.rows.length})`);
check('row fields come back', g.rows[0].id === 'x1' && g.rows[0].type === 'goal' && g.rows[0].a === '9' && g.rows[0].ts === 1762419600000 && g.rows[0].deleted === 0);
post({ pin: '1234', op: 'add', rows: [row('x3', 'drop table'), row('x4', 'yellow', { a: 'A'.repeat(500) })] });
g = get();
check('unknown event type rejected', !g.rows.some((r) => r.id === 'x3'));
check('long text trimmed', g.rows.find((r) => r.id === 'x4').a.length <= 80);
post({ pin: '1234', op: 'del', ids: ['x2'] });
g = get();
check('delete is soft', g.rows.length === 3 && g.rows.find((r) => r.id === 'x2').deleted === 1);
post({ pin: '1234', op: 'roster', roster: [{ n: '9', name: 'Drobný' }, { n: '10', name: 'Komora' }] });
g = get();
check('roster saved', Array.isArray(g.roster) && g.roster.length === 2 && g.roster[0].name === 'Drobný');
check('bad JSON answered, not thrown', JSON.parse(ctx.doPost({ postData: { contents: '{nope' } })._s).ok === false);

// attached to a Sheet: uses that Sheet, never creates or opens another
const own = sheetStub();
let created = 0;
const ctx2 = Object.assign({}, ctx, {
  SpreadsheetApp: { getActiveSpreadsheet: () => own.create(), create: () => { created++; return own.create(); }, openById: () => { throw new Error('openById needs full access'); } },
  PropertiesService: { getScriptProperties: () => ({ getProperty: () => null, setProperty: () => {} }) },
});
vm.createContext(ctx2);
vm.runInContext(src, ctx2);
ctx2.setup();
check('attached script: setup uses its own Sheet', created === 0 && !!own._sheets.log);
check('attached script: reads its own Sheet', JSON.parse(ctx2.doGet({})._s).ok === true);
check('access limited to the current Sheet', /@OnlyCurrentDoc/.test(src));

process.exit(failed ? 1 : 0);
