import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

async function detailed(page, label, mx, my) {
  await page.mouse.move(mx, my);
  await page.waitForTimeout(3500); // let spring settle
  const data = await page.evaluate(() => {
    const glowOuter = document.querySelector('div[style*="100vw"]');
    const glowInner = glowOuter ? glowOuter.firstElementChild : null;
    let out = { dir: document.documentElement.dir };
    if (glowOuter) {
      const r = glowOuter.getBoundingClientRect();
      out.outerRect = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
    }
    if (glowInner) {
      const r = glowInner.getBoundingClientRect();
      out.innerRect = { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width) };
      out.innerTransform = getComputedStyle(glowInner).transform;
    }
    return out;
  });
  console.log(`--- ${label} (mouse ${mx},${my}) ---`);
  console.log(JSON.stringify(data, null, 1));
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  const mk = (lang, w, h) => {
    const ctx = browser.newContext({ viewport: { width: w, height: h } });
    return ctx;
  };

  // EN LTR desktop
  let ctx = await mk('en', 1440, 900);
  let page = await ctx.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('xvi-language', 'en');
    localStorage.setItem('xviIntroDone', 'true');
  });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await detailed(page, 'EN Desktop LTR', 600, 400);
  await ctx.close();

  // AR RTL desktop
  ctx = await mk('ar', 1440, 900);
  page = await ctx.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('xvi-language', 'ar');
    localStorage.setItem('xviIntroDone', 'true');
  });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await detailed(page, 'AR Desktop RTL', 600, 400);
  await detailed(page, 'AR Desktop RTL (right side)', 1200, 400);
  await ctx.close();

  // AR RTL tablet
  ctx = await mk('ar', 820, 1180);
  page = await ctx.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('xvi-language', 'ar');
    localStorage.setItem('xviIntroDone', 'true');
  });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await detailed(page, 'AR Tablet RTL', 400, 300);
  await ctx.close();

  await browser.close();
})();
