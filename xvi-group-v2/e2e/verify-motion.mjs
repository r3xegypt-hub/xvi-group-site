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
    localStorage.setItem('xviConciergeSeen', 'true');
  }, lang);
}

async function openDock(page, lang) {
  const label = lang === 'ar' ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge';
  await page.locator(`[aria-label="${label}"]`).waitFor({ state: 'visible', timeout: 20000 });
  await page.locator(`[aria-label="${label}"]`).click();
  await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 10000 });
}

async function submitText(page, text) {
  await page.locator('div[style*="bottom: 100px"] input').fill(text);
  await page.locator('div[style*="bottom: 100px"] input').press('Enter');
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) Normal motion: data-motion=full, dock functional, quick actions rendered.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.locator('[aria-label="Executive AI Concierge"]').waitFor({ state: 'visible', timeout: 20000 });
    const dm = await page.evaluate(() => document.documentElement.dataset.motion);
    report(dm === 'full', `motion mode registered as full (got ${dm})`);
    await openDock(page, 'en');
    await page.locator('div[style*="bottom: 100px"]').getByText('Show me the strategic paths', { exact: false }).waitFor({ state: 'visible', timeout: 6000 });
    report(true, 'EN: quick actions render (stagger container)');
    await submitText(page, 'services');
    await page.locator('div[style*="bottom: 100px"]').getByText('We offer four core services', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    report(true, 'EN: dock fully functional with motion enabled');
    await ctx.close();
  }

  // 2) Reduced motion: data-motion=reduced, concierge CSS animations off, dock still functional.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.locator('[aria-label="Executive AI Concierge"]').waitFor({ state: 'visible', timeout: 20000 });
    const dm = await page.evaluate(() => document.documentElement.dataset.motion);
    report(dm === 'reduced', `motion mode honours prefers-reduced-motion (got ${dm})`);
    const animName = await page.evaluate(() => {
      const robot = document.querySelector('[aria-label="Executive AI Concierge"]');
      if (!robot) return 'no-robot';
      const mag = robot.querySelector('div');
      return mag ? getComputedStyle(mag).animationName : 'no-mag';
    });
    report(animName === 'none', `concierge CSS animations disabled under reduced motion (got ${animName})`);
    await openDock(page, 'en');
    await submitText(page, 'services');
    await page.locator('div[style*="bottom: 100px"]').getByText('We offer four core services', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    report(true, 'EN: dock still fully functional under reduced motion');
    await ctx.close();
  }

  // 3) AR reduced-motion smoke.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await init(page, 'ar');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');
    await submitText(page, 'خدمات');
    await page.locator('div[style*="bottom: 100px"]').getByText('نقدم أربع خدمات رئيسية', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    report(true, 'AR: dock functional under reduced motion');
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
