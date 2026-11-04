// Navigation test: clicking the "WIUC 2026 Bratislava" logo opens the home page
// (the picker with the Bratislava photo) from every view.
// Needs the local server (python -m http.server 8765 in the repo root) and Node 22+.
// Usage: node tools/test_nav.mjs [baseUrl]
import { pathToFileURL } from 'node:url';
import { homedir } from 'node:os';
import { join } from 'node:path';

const CDP = process.env.CDP_LIB || join(homedir(), '.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs');
const { Browser, sleep } = await import(pathToFileURL(CDP).href);

const base = process.argv[2] || 'http://127.0.0.1:8765/';
const from = ['#/s/slovak-university-of-technology-in-bratislava', '#/all', '#/venues', '#/rules', '#/party'];

const browser = await Browser.launch();
let failed = 0;
try {
  const page = await browser.newPage({ width: 1440, height: 900, reducedMotion: true });
  for (const r of from) {
    await page.goto(base + r, { settleMs: 600 });
    await page.eval(() => document.querySelector('.brand').click());
    await sleep(400);
    const res = await page.eval(() => ({ hash: location.hash, home: !!document.querySelector('.pick-head'), y: scrollY }));
    const ok = res.home && res.y === 0;
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'} logo from ${r} -> ${res.hash} (home page shown: ${res.home})`);
  }
  // empty state names the selected sport and day, and offers a way out
  await page.goto(base + '?now=2026-11-04T10:00#/s/slovak-university-of-technology-in-bratislava', { settleMs: 600 });
  for (const [lang, sport, day] of [['sk', 'Futbal', 'v stredu'], ['en', 'Football', 'on Wednesday']]) {
    const res = await page.eval((lang) => {
      localStorage.setItem('wiuc.lang', lang);
      return null;
    }, lang);
    await page.goto(base + '?now=2026-11-04T10:00&l=' + lang + '#/s/slovak-university-of-technology-in-bratislava', { settleMs: 600 });
    const out = await page.eval(() => {
      document.querySelector('[data-day="2026-11-04"]').click();
      document.querySelector('.chip[data-sport="football"]').click();
      const e = document.querySelector('#list .empty');
      return { text: e ? e.textContent : '', reset: !!document.querySelector('#list .empty [data-sport="all"]') };
    });
    const ok = out.text.includes(sport) && out.text.includes(day) && out.reset;
    if (!ok) failed++;
    console.log(`${ok ? 'PASS' : 'FAIL'} empty state (${lang}) names sport and day: "${out.text.trim()}" reset button: ${out.reset}`);
  }
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
