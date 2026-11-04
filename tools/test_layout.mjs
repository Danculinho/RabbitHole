// Layout regression test: the sticky side panel must never overlap other content,
// and every side-panel control must be reachable on screen at some scroll position.
// Needs the local server (python -m http.server 8765 in the repo root) and Node 22+.
// Usage: node tools/test_layout.mjs [baseUrl]
import { pathToFileURL } from 'node:url';
import { homedir } from 'node:os';
import { join } from 'node:path';

const CDP = process.env.CDP_LIB || join(homedir(), '.claude/skills/design-taste-frontend/scripts/lib/cdp.mjs');
const { Browser, sleep } = await import(pathToFileURL(CDP).href);

const base = process.argv[2] || 'http://127.0.0.1:8765/';
const routes = ['#/s/slovak-university-of-technology-in-bratislava', '#/s/comenius-university-bratislava'];
const sizes = [[2000, 1000], [1440, 900], [1280, 720], [1024, 700]];

function check() {
  const side = document.querySelector('.side');
  const others = [...document.querySelectorAll('.pdf-block, #list > *')];
  const links = [...document.querySelectorAll('.side a, .side button')];
  const H = innerHeight, total = document.documentElement.scrollHeight;
  const seen = new Set(), overlaps = [];
  for (let y = 0; y <= total; y += 120) {
    scrollTo(0, y);
    const s = side.getBoundingClientRect();
    for (const el of others) {
      if (side.contains(el)) continue;
      const r = el.getBoundingClientRect();
      const ix = Math.min(s.right, r.right) - Math.max(s.left, r.left);
      const iy = Math.min(s.bottom, r.bottom, H) - Math.max(s.top, r.top, 0);
      if (ix > 2 && iy > 2) overlaps.push(`y=${y} ${el.className || el.tagName}`);
    }
    links.forEach((a, i) => { const r = a.getBoundingClientRect(); if (r.top >= 0 && r.bottom <= H) seen.add(i); });
  }
  const unreachable = links.filter((_, i) => !seen.has(i)).map((a) => a.textContent.trim());
  return { overlaps: [...new Set(overlaps)].slice(0, 5), unreachable };
}

const browser = await Browser.launch();
let failed = 0;
try {
  for (const [w, h] of sizes) {
    const page = await browser.newPage({ width: w, height: h, reducedMotion: true });
    for (const r of routes) {
      await page.goto(base + '?now=2026-11-04T13:10' + r, { settleMs: 800 });
      const res = await page.eval(check);
      const ok = !res.overlaps.length && !res.unreachable.length;
      if (!ok) failed++;
      console.log(`${ok ? 'PASS' : 'FAIL'} ${w}x${h} ${r}` +
        (res.overlaps.length ? `\n   overlaps: ${res.overlaps.join(' | ')}` : '') +
        (res.unreachable.length ? `\n   unreachable: ${res.unreachable.join(' | ')}` : ''));
    }
    await page.close();
  }
} finally {
  await browser.close();
}
await sleep(0);
process.exit(failed ? 1 : 0);
