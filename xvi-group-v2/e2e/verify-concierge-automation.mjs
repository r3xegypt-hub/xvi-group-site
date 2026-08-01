import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

const TITLE = (lang) => (lang === 'ar' ? 'مرحباً.' : 'Welcome.');
const robotSel = (lang) => `[aria-label="${lang === 'ar' ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge'}"]`;

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

  // 1) Auto-minimize without interaction: the selector dismisses itself (~22s) and the robot settles at the corner.
  {
    const { ctx, page } = await newPage(browser, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.getByText(TITLE('en')).first().waitFor({ state: 'visible', timeout: 20000 });
    const t0 = Date.now();
    await page.locator(robotSel('en')).waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForFunction(() => {
      const el = document.querySelector('[aria-label="Executive AI Concierge"]');
      return el && getComputedStyle(el).opacity === '1';
    }, { timeout: 15000 });
    // wait for the greeting card to auto-dismiss without any interaction
    await page.getByText(TITLE('en')).first().waitFor({ state: 'hidden', timeout: 32000 }).catch(() => {});
    const elapsed = (Date.now() - t0) / 1000;
    const cardGone = !(await page.getByText(TITLE('en')).first().isVisible().catch(() => false));
    report(cardGone, `card auto-minimized without interaction`);
    report(elapsed >= 18 && elapsed <= 30, `auto-minimize happened after ~${elapsed.toFixed(1)}s (22s window)`);
    await page.waitForTimeout(1500);
    const box = await page.locator(robotSel('en')).boundingBox();
    const vh = await page.evaluate(() => window.innerHeight);
    report(box.x < 90 && vh - box.y - box.height < 96, `robot settled at bottom-left corner after auto-minimize`);
    await ctx.close();
  }

  // 2) Journey choice persists to sessionStorage and suppresses the greeting on reload within the session.
  {
    const { ctx, page } = await newPage(browser, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.locator('[data-testid="journey-selector"]').waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForTimeout(1000);
    await page.locator('[data-journey="executive"]').click();
    await page.waitForTimeout(900);
    const confirmShown = await page.getByText('Continuing your Executive Strategy journey.').first().isVisible().catch(() => false);
    report(confirmShown, `confirmation shown after journey choice`);
    await page.waitForTimeout(2600);
    const stored = await page.evaluate(() => sessionStorage.getItem('xvi-journey'));
    report(stored === 'executive', `journey persisted to sessionStorage (got ${stored})`);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1200);
    const greetingAgain = await page.getByText(TITLE('en')).first().isVisible().catch(() => false);
    report(!greetingAgain, `greeting suppressed on reload within the same session`);
    await page.locator(robotSel('en')).waitFor({ state: 'visible', timeout: 15000 });
    report(true, `corner robot present after reload`);
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
