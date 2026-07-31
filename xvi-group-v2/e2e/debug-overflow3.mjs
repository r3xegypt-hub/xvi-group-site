import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const route of ['/about', '/industries']) {
    const ctx = await browser.newContext({ viewport: { width: 320, height: 568 } });
    const page = await ctx.newPage();
    await page.addInitScript((l) => {
      localStorage.setItem('xvi-language', l);
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
    }, 'ar');
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    // Slow deliberate scroll to trigger reveals
    const total = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= total; y += 250) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1500);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    const data = await page.evaluate(() => {
      const sw = document.documentElement.scrollWidth;
      const vw = window.innerWidth;
      const out = { sw, vw };
      let maxRight = 0;
      const candidates = [];
      for (const el of document.querySelectorAll('body *')) {
        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden') continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.right > maxRight) maxRight = r.right;
        if (r.right > vw + 1) {
          const isFixed = cs.position === 'fixed';
          candidates.push({
            tag: el.tagName, cls: (el.className || '').toString().slice(0, 50),
            text: (el.textContent || '').trim().slice(0, 20),
            right: Math.round(r.right), left: Math.round(r.left),
            pos: cs.position, ox: cs.overflowX,
            transform: cs.transform !== 'none' ? 'T' : '',
          });
        }
      }
      return { ...out, maxRight: Math.round(maxRight), candidates: candidates.slice(0, 12) };
    });
    console.log(`\n=== ${route} AR 320 dir=rtl scrollWidth=${data.sw} vw=${data.vw} maxRight=${data.maxRight} ===`);
    for (const c of data.candidates) {
      console.log(`  <${c.tag}> ${c.cls} "${c.text}" L=${c.left} R=${c.right} pos=${c.pos} ox=${c.ox} ${c.transform}`);
    }
    await ctx.close();
  }
  await browser.close();
})();
