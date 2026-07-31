import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

async function findOverflow(browser, route, w, h, lang) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  // Scroll through the page to trigger all whileInView animations, then settle
  await page.mouse.move(w / 2, h / 2);
  for (let y = 0; y < 12000; y += 400) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const vw = window.innerWidth;
    const sw = document.documentElement.scrollWidth;
    const out = { sw, vw, dir: document.documentElement.dir, wide: [] };
    // elements that extend beyond right edge
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.right > vw + 1 || r.left < -1) {
        const text = (el.textContent || '').trim().slice(0, 30);
        out.wide.push({
          tag: el.tagName,
          cls: (el.className || '').slice(0, 60),
          text,
          left: Math.round(r.left), right: Math.round(r.right),
          pos: cs.position, overflow: cs.overflowX,
        });
      }
    }
    out.wide = out.wide.slice(0, 15);
    return out;
  });
  console.log(`--- ${route} ${lang} ${w}x${h} dir=${data.dir} scrollWidth=${data.sw} vw=${data.vw} ---`);
  for (const o of data.wide) {
    console.log(`  <${o.tag}> ${o.cls} "${o.text}" left=${o.left} right=${o.right} pos=${o.pos} ox=${o.overflow}`);
  }
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  await findOverflow(browser, '/about', 320, 568, 'ar');
  await findOverflow(browser, '/about', 390, 844, 'ar');
  await findOverflow(browser, '/about', 320, 568, 'en');
  await findOverflow(browser, '/industries', 320, 568, 'ar');
  await browser.close();
})();
