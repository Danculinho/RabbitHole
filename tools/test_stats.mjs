// Anonymous visit counting (GoatCounter): one count per page load and per view change,
// with the view in the path, and nothing counted on the local server.
// Needs the local server (python -m http.server 8765 in the repo root) and Node 22+.
// Usage: node tools/test_stats.mjs [baseUrl]
import { pathToFileURL } from 'node:url';
import { homedir } from 'node:os';
import { join } from 'node:path';

const CDP = process.env.CDP_LIB || join(homedir(), '.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs');
const { Browser, sleep } = await import(pathToFileURL(CDP).href);
const base = process.argv[2] || 'http://127.0.0.1:8765/';

let failed = 0;
function check(name, ok, detail) {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${detail ? ' ' + detail : ''}`);
}

const browser = await Browser.launch();
try {
  const page = await browser.newPage({ width: 1440, height: 900, reducedMotion: true });
  await page.goto(base + '#/tables', { settleMs: 800 });
  const tag = await page.eval(() => {
    const s = document.querySelector('script[data-goatcounter]');
    return s ? { url: s.getAttribute('data-goatcounter'), settings: s.getAttribute('data-goatcounter-settings') || '' } : null;
  });
  check('GoatCounter script is on the page', !!tag && /wiuc2026\.goatcounter\.com\/count$/.test(tag.url), tag ? tag.url : '');
  check('automatic count is off (the page counts views itself)', !!tag && /no_onload/.test(tag.settings));

  // stand in for count.js and walk through a few views
  const paths = await page.eval(async () => {
    const seen = [];
    window.goatcounter = { count: (o) => seen.push(o.path) };
    window.wiucTrack();
    location.hash = '#/party';
    await new Promise((r) => setTimeout(r, 200));
    location.hash = '#/s/slovak-university-of-technology-in-bratislava';
    await new Promise((r) => setTimeout(r, 200));
    return seen;
  });
  check('each view is counted with its own path', JSON.stringify(paths) === JSON.stringify(['/tables', '/party', '/s/slovak-university-of-technology-in-bratislava']), JSON.stringify(paths));
} finally {
  await browser.close();
}
process.exit(failed ? 1 : 0);
