import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

async function dockMeasure(browser, w, h, lang) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  // Open dock
  const toggle = page.locator('button').filter({ hasText: lang === 'ar' ? 'المستشار التنفيذي' : 'Executive AI' }).first();
  await toggle.click({ force: true });
  await page.waitForTimeout(1200);

  const data = await page.evaluate(() => {
    const vw = window.innerWidth;
    const bar = document.querySelector('div[style*="bottom: 24px"]');
    const panel = document.querySelector('div[style*="bottom: 100px"]');
    const out = { vw, vh: window.innerHeight };
    const rectOf = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), bottom: Math.round(r.bottom), w: Math.round(r.width), h: Math.round(r.height), centerX: Math.round(r.left + r.width / 2) };
    };
    out.bar = rectOf(bar);
    out.panel = rectOf(panel);
    return out;
  });

  console.log(`--- Dock ${lang} ${w}x${h} ---`);
  console.log(`  bar:   ${JSON.stringify(data.bar)}  (viewport center = ${Math.round(data.vw / 2)})`);
  console.log(`  panel: ${JSON.stringify(data.panel)}  (viewport center = ${Math.round(data.vw / 2)})`);
  if (data.bar) {
    const inside = data.bar.left >= 0 && data.bar.right <= data.vw;
    console.log(`  bar inside viewport: ${inside}`);
  }
  if (data.panel) {
    const inside = data.panel.left >= 0 && data.panel.right <= data.vw && data.panel.top >= 0 && data.panel.bottom <= data.vh;
    console.log(`  panel inside viewport: ${inside}`);
  }
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  await dockMeasure(browser, 1440, 900, 'en');
  await dockMeasure(browser, 390, 844, 'en');
  await dockMeasure(browser, 320, 568, 'en');
  await dockMeasure(browser, 390, 844, 'ar');
  await dockMeasure(browser, 320, 568, 'ar');
  await browser.close();
})();
