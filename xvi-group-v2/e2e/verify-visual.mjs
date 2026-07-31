import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

async function init(page, lang) {
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xvi-conciergeSeen', 'true');
  }, lang);
}

async function openDock(page, lang) {
  const label = lang === 'ar' ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge';
  await page.locator(`[aria-label="${label}"]`).waitFor({ state: 'visible', timeout: 20000 });
  await page.locator(`[aria-label="${label}"]`).click();
  await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 10000 });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) EN: premium ambient background applied, dock gold corner ornaments present.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.locator('[aria-label="Executive AI Concierge"]').waitFor({ state: 'visible', timeout: 20000 });
    const bg = await page.evaluate(() => getComputedStyle(document.querySelector('.xvi-app')).backgroundImage);
    report(bg.includes('radial-gradient'), 'EN: premium ambient gradient applied to app background');
    const noHScroll = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    report(noHScroll, 'EN: no horizontal scroll on home');
    await openDock(page, 'en');
    await page.getByTestId('xvi-dock-corner-tl').waitFor({ state: 'visible', timeout: 5000 });
    await page.getByTestId('xvi-dock-corner-br').waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'EN: gold corner ornaments rendered on the AI dock');
    await ctx.close();
  }

  // 2) AR: same premium surface + corners.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'ar');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');
    await page.getByTestId('xvi-dock-corner-tl').waitFor({ state: 'visible', timeout: 5000 });
    await page.getByTestId('xvi-dock-corner-br').waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'AR: gold corner ornaments rendered on the AI dock');
    const noHScroll = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    report(noHScroll, 'AR: no horizontal scroll on home');
    await ctx.close();
  }

  // 3) Sub-pages render with premium surface intact.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    for (const path of ['/about', '/services', '/insights', '/contact']) {
      await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1200);
      const bg = await page.evaluate(() => getComputedStyle(document.querySelector('.xvi-app')).backgroundImage);
      const noHScroll = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
      report(bg.includes('radial-gradient') && noHScroll, `page ${path}: premium surface + no horizontal scroll`);
    }
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
