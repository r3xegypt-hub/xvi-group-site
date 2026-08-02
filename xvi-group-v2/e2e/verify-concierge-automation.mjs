import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

const TIP = (lang) => (lang === 'ar' ? 'كيف يمكنني مساعدتك؟' : 'Need help?');
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

async function tipOpacity(page, text) {
  return page.evaluate((t) => {
    const el = [...document.querySelectorAll('div')].find(
      (e) => e.children.length === 0 && e.textContent && e.textContent.trim() === t,
    );
    if (!el) return 0;
    const p = parseFloat(getComputedStyle(el).opacity);
    return Number.isFinite(p) ? p : 0;
  }, text);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) First visit: greeting auto-shows then auto-dismisses; the robot settles at the corner without interaction.
  {
    const { ctx, page } = await newPage(browser, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.locator(robotSel('en')).waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForFunction(() => {
      const el = document.querySelector('[aria-label="Executive AI Concierge"]');
      return el && getComputedStyle(el).opacity === '1';
    }, { timeout: 15000 });
    const t0 = Date.now();
    let shown = false;
    while (Date.now() - t0 < 10000) {
      if ((await tipOpacity(page, TIP('en'))) > 0.5) { shown = true; break; }
      await page.waitForTimeout(150);
    }
    report(shown, `greeting auto-shown without interaction`);
    const vh = await page.evaluate(() => window.innerHeight);
    const t1 = Date.now();
    let settled = false;
    while (Date.now() - t1 < 15000) {
      const box = await page.locator(robotSel('en')).boundingBox().catch(() => null);
      if (box && box.x < 90 && vh - box.y - box.height < 96) { settled = true; break; }
      await page.waitForTimeout(150);
    }
    report(settled, `robot auto-settled at bottom-left corner without interaction`);
    await page.waitForTimeout(600);
    report((await tipOpacity(page, TIP('en'))) < 0.5, `greeting dismissed after settle`);
    await ctx.close();
  }

  // 2) A journey choice persists to sessionStorage and suppresses the greeting on reload within the same session.
  {
    const { ctx, page } = await newPage(browser, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.locator(robotSel('en')).waitFor({ state: 'visible', timeout: 20000 });
    await page.evaluate(() => sessionStorage.setItem('xvi-journey', 'executive'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1200);
    const stored = await page.evaluate(() => sessionStorage.getItem('xvi-journey'));
    report(stored === 'executive', `journey persisted to sessionStorage (got ${stored})`);
    report((await tipOpacity(page, TIP('en'))) < 0.5, `greeting suppressed on reload within the same session`);
    const box = await page.locator(robotSel('en')).boundingBox();
    const vh = await page.evaluate(() => window.innerHeight);
    report(box.x < 90 && vh - box.y - box.height < 96, `corner robot present after reload`);
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
