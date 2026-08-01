import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

const ROUTES = ['/', '/services', '/industries', '/insights', '/about', '/technology', '/careers'];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('xvi-language', 'en');
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
  });

  let bad = [];
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const found = await page.evaluate(() => {
      const out = [];
      for (const a of Array.from(document.querySelectorAll('a[href]'))) {
        const href = a.getAttribute('href') || '';
        if (/^\/[^/]/.test(href) && !href.startsWith('/xvi-group-site')) out.push({ text: (a.textContent || '').trim().slice(0, 30), href });
      }
      return out;
    });
    if (found.length) {
      bad.push({ route, found });
      report(false, `${route}: ${found.length} raw root-relative href(s) → ${JSON.stringify(found.slice(0, 4))}`);
    } else {
      report(true, `${route}: no raw root-relative hrefs`);
    }
  }

  // Interactive check: every internal Link carries the basename so it resolves on GitHub Pages.
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const internal = await page.evaluate(() => {
    const out = [];
    for (const a of Array.from(document.querySelectorAll('a[href]'))) {
      const href = a.getAttribute('href') || '';
      if (href.startsWith('/') && !href.startsWith('/xvi-group-site')) out.push(href);
    }
    return out;
  });
  report(internal.length === 0, `Home: all internal anchors use basename (raw: ${JSON.stringify(internal.slice(0, 5))})`);

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 1 : 0);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
