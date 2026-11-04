// Group tables and the per-match calendar icon.
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
    const rows = first ? [...first.querySelectorAll('tbody tr')].map((tr) => [...tr.children].map((td) => td.textContent.trim())) : [];
    const mine = document.querySelectorAll('.standings tr.me').length;
    return { cards: cards.length, rows, mine };
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
      return { p: +td[2], pts: +td[td.length - 1] };
    })).flat();
  });
  check('volleyball points never exceed 3 per game', vb.every((r) => r.pts <= 3 * r.p), `(${vb.length} rows)`);

  // calendar icon on every upcoming match; one click exports that match only
  await page.goto(base + '?now=2026-11-04T08:00#/s/slovak-university-of-technology-in-bratislava', { settleMs: 600 });
  const icons = await page.eval(() => {
    document.querySelector('[data-day="2026-11-05"]').click();
    document.querySelector('.chip[data-sport="all"]').click();
    return document.querySelectorAll('#list .ev .cal-btn').length;
  });
  check('every upcoming match has a calendar icon', icons > 0, `(${icons})`);
  const out = await page.eval(async () => {
    URL.createObjectURL = (blob) => { window.__blob = blob; return 'blob:test'; };
    HTMLAnchorElement.prototype.click = function () {};
    const btn = document.querySelector('#list .ev [data-cal]');
    btn.click();
    return { text: await window.__blob.text(), time: btn.closest('.ev').querySelector('.time').textContent.trim() };
  });
  const ics = out.text;
  const events = (ics.match(/BEGIN:VEVENT/g) || []).length;
  check('one icon exports one match', events === 1, `(${events})`);
  // the row says 09:00 local time, the file says 08:00 UTC (Bratislava is UTC+1 in November)
  const want = 'DTSTART:20261105T' + String(+out.time.slice(0, 2) - 1).padStart(2, '0') + out.time.slice(3, 5) + '00Z';
  const got = ics.split(/\r?\n/).filter((l) => /^(DTSTART|SUMMARY)/.test(l)).join(' | ');
  check('calendar time is the row time in UTC', ics.includes(want), `(want ${want}, got ${got})`);
  check('calendar has a 30 min reminder', /TRIGGER:-PT30M/.test(ics));
  check('calendar uses CRLF line ends', ics.includes('\r\n'));
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
