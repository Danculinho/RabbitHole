// Group tables and calendar export.
// Needs the local server (python -m http.server 8765 in the repo root) and Node 22+.
// Usage: node tools/test_tables.mjs [baseUrl]
import { pathToFileURL } from 'node:url';
import { homedir } from 'node:os';
import { join } from 'node:path';

const CDP = process.env.CDP_LIB || join(homedir(), '.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs');
const { Browser } = await import(pathToFileURL(CDP).href);
const base = process.argv[2] || 'http://127.0.0.1:8765/';

let failed = 0;
function check(name, ok, detail) {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' ' + detail : ''}`);
}

const browser = await Browser.launch();
try {
  const page = await browser.newPage({ width: 1440, height: 900, reducedMotion: true });
  await page.goto(base + '#/s/slovak-university-of-technology-in-bratislava', { settleMs: 600 });
  await page.goto(base + '#/tables', { settleMs: 600 });

  // every played match adds one game to each side; points follow the sport's rules
  const res = await page.eval(() => {
    const cards = [...document.querySelectorAll('.table-card')];
    const first = cards[0];
    const head = first && [...first.querySelectorAll('th')].map((th) => th.textContent.trim());
    const rows = first ? [...first.querySelectorAll('tbody tr')].map((tr) => [...tr.children].map((td) => td.textContent.trim())) : [];
    const mine = document.querySelectorAll('.standings tr.me').length;
    return { cards: cards.length, head, rows, mine, title: first && first.querySelector('h2').textContent };
  });
  check('tables page lists pools', res.cards > 0, `(${res.cards} pools)`);
  check('my university is highlighted', res.mine > 0);
  const sorted = res.rows.every((r, i, a) => i === 0 || +a[i - 1][a[i - 1].length - 1] >= +r[r.length - 1]);
  check('rows sorted by points', sorted, JSON.stringify(res.rows.map((r) => r[r.length - 1])));

  // volleyball: 3 / 2 / 1 / 0 points for 2:0 / 2:1 / 1:2 / 0:2
  const vb = await page.eval(() => {
    document.querySelector('.chip[data-sport="volleyball"]').click();
    const t = [...document.querySelectorAll('.table-card')];
    return t.map((c) => [...c.querySelectorAll('tbody tr')].map((tr) => {
      const td = [...tr.children].map((x) => x.textContent.trim());
      return { p: +td[2], w: +td[3], l: +td[4], pts: +td[td.length - 1] };
    })).flat();
  });
  check('volleyball points never exceed 3 per game', vb.every((r) => r.pts <= 3 * r.p && r.pts >= r.l * 0), `(${vb.length} rows)`);

  // calendar: build the .ics text the button downloads
  await page.goto(base + '#/s/slovak-university-of-technology-in-bratislava', { settleMs: 600 });
  const ics = await page.eval(async () => {
    let text = '';
    const orig = URL.createObjectURL;
    URL.createObjectURL = (blob) => { window.__blob = blob; return 'blob:test'; };
    HTMLAnchorElement.prototype.click = function () {};
    document.querySelector('[data-day="all"]').click();
    document.querySelector('.chip[data-sport="all"]').click();
    document.querySelector('[data-cal]').click();
    text = await window.__blob.text();
    URL.createObjectURL = orig;
    return text;
  });
  const events = (ics.match(/BEGIN:VEVENT/g) || []).length;
  check('calendar has events', events > 5, `(${events})`);
  check('calendar times are UTC (CET-1h)', /DTSTART:20261104T\d{6}Z/.test(ics));
  check('calendar has 30 min reminders', /TRIGGER:-PT30M/.test(ics));
  check('calendar uses CRLF line ends', ics.includes('\r\n'));
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
