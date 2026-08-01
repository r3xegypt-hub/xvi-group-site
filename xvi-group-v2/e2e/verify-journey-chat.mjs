import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

async function init(page, lang, journey) {
  await page.addInitScript(([l, j]) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
    sessionStorage.removeItem('xvi-executive-memory');
    if (j) sessionStorage.setItem('xvi-journey', j);
    else sessionStorage.removeItem('xvi-journey');
  }, [lang, journey]);
}

async function openDock(page, lang) {
  const label = lang === 'ar' ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge';
  await page.locator(`[aria-label="${label}"]`).waitFor({ state: 'visible', timeout: 20000 });
  await page.locator(`[aria-label="${label}"]`).click();
  await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 10000 });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) EN + healthcare journey: journey focus quick action leads, status line shows prompt,
  //    clicking it renders the journey card with service + case + CTA.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en', 'healthcare');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await page.locator('div[style*="bottom: 100px"]').getByText('AI Transformation', { exact: false }).first().waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'EN: journey focus quick action leads with service label');
    await page.locator('div[style*="bottom: 100px"]').getByText('Clinical intelligence, patient outcomes', { exact: false }).first().waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'EN: ready-state line reflects the journey prompt');
    await page.locator('div[style*="bottom: 100px"]').getByText('AI Transformation', { exact: false }).first().click();
    await page.locator('div[style*="bottom: 100px"]').getByText('Clinical Command Center', { exact: false }).waitFor({ state: 'visible', timeout: 8000 });
    report(true, 'EN: journey focus card shows case title');
    await page.locator('div[style*="bottom: 100px"]').getByText('Healthcare', { exact: false }).first().waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'EN: journey focus card shows journey label');
    await ctx.close();
  }

  // 2) AR + government journey: Arabic labels and prompt.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'ar', 'government');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');
    await page.locator('div[style*="bottom: 100px"]').getByText('الاستشارات الاستراتيجية', { exact: false }).first().waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'AR: journey focus quick action uses Arabic service label');
    await page.locator('div[style*="bottom: 100px"]').getByText('حوكمة آمنة مبنية على البيانات', { exact: false }).first().waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'AR: ready-state line reflects the journey prompt');
    await page.locator('div[style*="bottom: 100px"]').getByText('الاستشارات الاستراتيجية', { exact: false }).first().click();
    await page.locator('div[style*="bottom: 100px"]').getByText('برج التحكم اللوجستي الوطني', { exact: false }).waitFor({ state: 'visible', timeout: 8000 });
    report(true, 'AR: journey focus card shows Arabic case title');
    await ctx.close();
  }

  // 3) No journey: journey focus action absent, default quick actions present.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en', null);
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await page.locator('div[style*="bottom: 100px"]').getByText('Explore Solutions', { exact: false }).first().waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'EN: default quick actions still render');
    const focusCount = await page.locator('div[style*="bottom: 100px"]').getByText('AI Transformation', { exact: false }).count();
    report(focusCount === 0, `EN: no journey focus chip when no journey selected (count ${focusCount})`);
    await page.locator('div[style*="bottom: 100px"]').getByText('A visual companion for complex decisions', { exact: false }).first().waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'EN: default ready-state line shown');
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
