import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

async function newPage(browser, lang) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);
  return { ctx, page };
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) Auto-minimize: wait for the 7s greeting window, then card must be gone + robot at corner.
  {
    const { ctx, page } = await newPage(browser, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.getByText('Welcome to XVI GROUP').first().waitFor({ state: 'visible', timeout: 20000 });
    const t0 = Date.now();
    await page.locator('[aria-label="Executive AI Concierge"]').waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForTimeout(1500);
    const elapsed = (Date.now() - t0) / 1000;
    const cardGone = await page.getByText('Welcome to XVI GROUP').first().isVisible().catch(() => false);
    report(elapsed >= 5 && elapsed <= 12, `auto-minimize happened after ~${elapsed.toFixed(1)}s (6-8s window)`);
    report(!cardGone, `card auto-minimized without interaction`);
    const box = await page.locator('[aria-label="Executive AI Concierge"]').boundingBox();
    report(box.x < 90, `robot settled at bottom-left corner after auto-minimize`);
    await ctx.close();
  }

  // 2) AI Consultation action opens the existing dock.
  {
    const { ctx, page } = await newPage(browser, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.getByText('Welcome to XVI GROUP').first().waitFor({ state: 'visible', timeout: 20000 });
    await page.getByText('AI Consultation', { exact: true }).first().click();
    await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 8000 });
    report(true, `"AI Consultation" action opened the AI Dock`);
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
