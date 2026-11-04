// "Next match" card and public-transport routes.
// Needs the local server (python -m http.server 8765 in the repo root) and Node 22+.
// Usage: node tools/test_next.mjs [baseUrl]
import { pathToFileURL } from 'node:url';
import { homedir } from 'node:os';
import { join } from 'node:path';

const CDP = process.env.CDP_LIB || join(homedir(), '.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs');
const { Browser } = await import(pathToFileURL(CDP).href);
const base = process.argv[2] || 'http://127.0.0.1:8765/';
const STU = '#/s/slovak-university-of-technology-in-bratislava';

let failed = 0;
function check(name, ok, detail) {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' ' + detail : ''}`);
}

const browser = await Browser.launch();
try {
  const page = await browser.newPage({ width: 1440, height: 900, reducedMotion: true });
  const card = () => page.eval(() => {
    const c = document.querySelector('.next-card');
    return c ? { text: c.textContent.replace(/\s+/g, ' ').trim(), route: (c.querySelector('a.route') || {}).href || '' } : null;
  });

  // 08:30 on Thursday: STU plays at 09:00, so the card says "in 30 min"
  await page.goto(base + '?now=2026-11-05T08:30' + STU, { settleMs: 700 });
  let c = await card();
  check('next-match card is shown', !!c, c ? `"${c.text.slice(0, 80)}"` : '');
  check('countdown in minutes', !!c && /30 min/.test(c.text));
  check('card shows the start time', !!c && c.text.includes('09:00'));
  check('card has a public-transport route', !!c && /travelmode=transit/.test(c.route), c ? c.route.slice(0, 90) : '');

  // during a match the card says it is on now
  await page.goto(base + '?now=2026-11-05T09:10' + STU, { settleMs: 700 });
  c = await card();
  check('live match is shown as on now', !!c && /(Prebieha|Live)/.test(c.text), c ? `"${c.text.slice(0, 60)}"` : '');

  // the evening before: tomorrow's first match
  await page.goto(base + '?now=2026-11-04T23:00' + STU, { settleMs: 700 });
  c = await card();
  check('evening before shows tomorrow', !!c && /(zajtra|tomorrow)/i.test(c.text), c ? `"${c.text.slice(0, 60)}"` : '');

  // after the championship: no card
  await page.goto(base + '?now=2026-11-09T12:00' + STU, { settleMs: 700 });
  c = await card();
  check('no card after the championship', !c);

  // every map link in the rows opens a transit route
  await page.goto(base + '?now=2026-11-05T08:30' + STU, { settleMs: 700 });
  const links = await page.eval(() => [...document.querySelectorAll('#list .ev a.plate, #list .ev .meta a')].map((a) => a.href));
  check('map links open transit routes', links.length > 0 && links.every((h) => /travelmode=transit/.test(h)), `(${links.length})`);
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
