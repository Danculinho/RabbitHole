// Phone layout (iPhone size): bottom tab bar, and the first match visible without scrolling.
// Needs the local server (python -m http.server 8765 in the repo root) and Node 22+.
// Usage: node tools/test_mobile.mjs [baseUrl]
import { pathToFileURL } from 'node:url';
import { homedir } from 'node:os';
import { join } from 'node:path';

const CDP = process.env.CDP_LIB || join(homedir(), '.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs');
const { Browser, sleep } = await import(pathToFileURL(CDP).href);
const base = process.argv[2] || 'http://127.0.0.1:8765/';
const STU = '#/s/slovak-university-of-technology-in-bratislava';

let failed = 0;
function check(name, ok, detail) {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' ' + detail : ''}`);
}

const browser = await Browser.launch();
try {
  for (const [w, h] of [[390, 844], [375, 667]]) {
    const page = await browser.newPage({ width: w, height: h, dsf: 2, mobile: true, reducedMotion: true });
    await page.goto(base + '?now=2026-11-05T08:30' + STU, { settleMs: 800 });
    const r = await page.eval(() => {
      const bar = document.querySelector('.tabbar');
      const rect = bar && bar.getBoundingClientRect();
      const tabs = bar ? [...bar.querySelectorAll('a, button')] : [];
      const firstRow = document.querySelector('#list .ev');
      const fr = firstRow && firstRow.getBoundingClientRect();
      const chips = document.querySelector('.chips');
      return {
        bar: !!bar && getComputedStyle(bar).display !== 'none',
        barAtBottom: !!rect && Math.abs(rect.bottom - innerHeight) < 2,
        barH: rect ? rect.height : 0,
        tabs: tabs.length,
        small: tabs.filter((t) => t.getBoundingClientRect().height < 44).length,
        active: (bar && bar.querySelector('.on') || {}).textContent || '',
        menuBtn: getComputedStyle(document.getElementById('menuBtn')).display,
        firstTop: fr ? fr.top : 9999,
        chipsH: chips ? chips.getBoundingClientRect().height : 0,
        overflowX: document.documentElement.scrollWidth > innerWidth,
      };
    });
    const tag = `${w}x${h}`;
    check(`${tag} bottom tab bar shown at the bottom`, r.bar && r.barAtBottom);
    check(`${tag} 5 tabs, none smaller than 44px`, r.tabs === 5 && r.small === 0, `(${r.tabs} tabs, ${r.small} small)`);
    check(`${tag} current view is marked`, /Moje|My/.test(r.active), `("${r.active.trim()}")`);
    check(`${tag} no menu button in the header`, r.menuBtn === 'none');
    check(`${tag} sports fit in one row`, r.chipsH > 0 && r.chipsH < 60, `(${Math.round(r.chipsH)}px)`);
    check(`${tag} first match visible without scrolling`, r.firstTop < h - r.barH - 40, `(top ${Math.round(r.firstTop)}px)`);
    check(`${tag} nothing wider than the screen`, !r.overflowX);

    // the end of the page is not hidden under the bar
    const end = await page.eval(() => {
      scrollTo(0, document.documentElement.scrollHeight);
      const last = [...document.querySelectorAll('.foot p')].pop();
      const bar = document.querySelector('.tabbar').getBoundingClientRect();
      return last ? last.getBoundingClientRect().bottom <= bar.top + 1 : false;
    });
    check(`${tag} last line clears the tab bar`, end);

    // "More" opens the side menu with the rest of the pages
    const more = await page.eval(async () => {
      document.querySelector('.tabbar [data-more]').click();
      await new Promise((r) => setTimeout(r, 350));
      return { open: document.body.classList.contains('menu-open'), links: document.querySelectorAll('#menu a').length };
    });
    check(`${tag} "More" opens the menu`, more.open && more.links >= 6, `(${more.links} links)`);

    // a tab navigates
    await page.eval(() => { document.body.classList.remove('menu-open'); document.querySelector('.tabbar a[href="#/tables"]').click(); });
    await sleep(400);
    const hash = await page.eval(() => location.hash);
    check(`${tag} tab opens its page`, hash === '#/tables', hash);
    await page.close();
  }
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
