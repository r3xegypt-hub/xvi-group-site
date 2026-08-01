import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

async function init(page, lang, journey, goal) {
  await page.addInitScript(([l, j, g]) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
    sessionStorage.removeItem('xvi-executive-memory');
    if (j) sessionStorage.setItem('xvi-journey', j);
    else sessionStorage.removeItem('xvi-journey');
    if (g) {
      sessionStorage.setItem('xvi-executive-memory', JSON.stringify({ goal: g, journey: j || undefined, questions: [], recommendations: [] }));
    }
  }, [lang, journey, goal]);
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

async function storedMemory(page) {
  return page.evaluate(() => {
    const raw = sessionStorage.getItem('xvi-executive-memory');
    return raw ? JSON.parse(raw) : null;
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) EN + healthcare journey + goal: quick action renders journey-aware recommendation.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en', 'healthcare', 'automate patient triage');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await page.locator('div[style*="bottom: 100px"]').getByText('Contact Expert', { exact: false }).first().waitFor({ state: 'visible', timeout: 6000 });
    await page.locator('div[style*="bottom: 100px"]').getByText('Contact Expert', { exact: false }).first().click();
    await page.locator('div[style*="bottom: 100px"]').getByText('Recommended Next Step', { exact: true }).waitFor({ state: 'visible', timeout: 8000 });
    report(true, 'EN: quick action renders recommendation card');
    await page.locator('div[style*="bottom: 100px"]').getByText(/Given your goal/, { exact: false }).waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'EN: recommendation personalized from memory goal');
    await page.locator('div[style*="bottom: 100px"]').getByText('Clinical Command Center', { exact: false }).waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'EN: journey service case shown');
    const mem = await storedMemory(page);
    report(Boolean(mem && mem.recommendations[mem.recommendations.length - 1] === 'AI Transformation'), `EN: recommendation logged in memory (got ${mem?.recommendations.at(-1)})`);
    await ctx.close();
  }

  // 2) EN free-text "what do you recommend" (no journey) falls back gracefully.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en', null, 'expand into healthcare');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await submitText(page, 'what do you recommend?');
    await page.locator('div[style*="bottom: 100px"]').getByText('Recommended Next Step', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    report(true, 'EN: free-text recommend intent renders card');
    await page.locator('div[style*="bottom: 100px"]').getByText('Executive Consultation', { exact: true }).first().waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'EN: generic recommendation when no journey');
    await ctx.close();
  }

  // 3) AR free-text recommendation follows the journey.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'ar', 'government', null);
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');
    await submitText(page, 'ماذا تنصح؟');
    await page.locator('div[style*="bottom: 100px"]').getByText('الخطوة الموصى بها', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    report(true, 'AR: free-text recommend intent renders card');
    await page.locator('div[style*="bottom: 100px"]').getByText('الاستشارات الاستراتيجية', { exact: true }).first().waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'AR: recommendation follows government journey');
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
