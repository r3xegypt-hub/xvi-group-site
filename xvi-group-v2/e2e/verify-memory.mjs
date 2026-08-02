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
    sessionStorage.removeItem('xvi-executive-memory');
    localStorage.removeItem('xvi-executive-memory');
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

async function storedMemory(page) {
  return page.evaluate(() => {
    const raw = sessionStorage.getItem('xvi-executive-memory');
    return raw ? JSON.parse(raw) : null;
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) EN: intro extracts name/company/industry/goal, confirms, persists to sessionStorage only.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await submitText(page, 'My name is Ahmed and I work at Al Noor Group in banking. My goal is to automate our customer service.');
    await page.locator('div[style*="bottom: 100px"]').getByText('Nice to meet you, Ahmed', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    report(true, 'EN: intro acknowledged by name');
    const mem = await storedMemory(page);
    report(Boolean(mem && mem.name === 'Ahmed'), 'EN: name stored in session memory');
    report(Boolean(mem && mem.company === 'Al Noor Group'), 'EN: company stored in session memory');
    report(Boolean(mem && mem.industry === 'banking'), 'EN: industry stored in session memory');
    report(Boolean(mem && mem.goal === 'automate our customer service'), 'EN: goal stored in session memory');
    const persistedLocally = await page.evaluate(() => localStorage.getItem('xvi-executive-memory'));
    report(persistedLocally === null, 'EN: memory lives in sessionStorage only (not localStorage)');
    for (const label of ['Ahmed', 'Al Noor Group', 'banking']) {
      await page.locator('div[style*="bottom: 100px"]').getByText(label, { exact: false }).first().waitFor({ state: 'visible', timeout: 4000 });
    }
    report(true, 'EN: memory chips visible (name / company / industry)');
    await ctx.close();
  }

  // 2) EN: memory ask recalls details + question/recommendation counts.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await submitText(page, 'My name is Sara and my company is Gulf Retail.');
    await page.locator('div[style*="bottom: 100px"]').getByText('Nice to meet you, Sara', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    await submitText(page, 'services');
    await page.locator('div[style*="bottom: 100px"]').getByText('We offer four core services', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    await submitText(page, 'what do you remember?');
    await page.locator('div[style*="bottom: 100px"]').getByText('Name: Sara', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    await page.locator('div[style*="bottom: 100px"]').getByText('Company: Gulf Retail', { exact: false }).waitFor({ state: 'visible', timeout: 4000 });
    await page.locator('div[style*="bottom: 100px"]').getByText(/\d+ questions and 1 recommendation/).waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'EN: memory ask recalls details + tracked question & recommendation counts');
    await ctx.close();
  }

  // 3) EN: reopen dock greets returning visitor by name.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await submitText(page, 'My name is Omar.');
    await page.locator('div[style*="bottom: 100px"]').getByText('Nice to meet you, Omar', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    await page.locator('div[style*="bottom: 100px"] button', { has: page.locator('svg.lucide-x') }).first().click();
    await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'hidden', timeout: 6000 }).catch(() => {});
    await page.locator(`[aria-label="Executive AI Concierge"]`).click();
    await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 10000 });
    await page.locator('div[style*="bottom: 100px"]').getByText('Welcome back, Omar', { exact: false }).waitFor({ state: 'visible', timeout: 6000 });
    report(true, 'EN: dock reopens with name-based greeting');
    await ctx.close();
  }

  // 4) AR: Arabic intro + memory ask.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'ar');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');
    await submitText(page, 'اسمي أحمد، أعمل في بنك الخليج، هدفي أتمتة خدمة العملاء');
    await page.locator('div[style*="bottom: 100px"]').getByText('سعدت بلقائك، أحمد', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    report(true, 'AR: intro acknowledged by name');
    const mem = await storedMemory(page);
    report(Boolean(mem && mem.name === 'أحمد'), 'AR: Arabic name stored');
    report(Boolean(mem && mem.company === 'بنك الخليج'), 'AR: Arabic company stored');
    report(Boolean(mem && mem.goal === 'أتمتة خدمة العملاء'), 'AR: Arabic goal stored');
    await submitText(page, 'ماذا تتذكر؟');
    await page.locator('div[style*="bottom: 100px"]').getByText('الاسم: أحمد', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    await page.locator('div[style*="bottom: 100px"]').getByText('الشركة: بنك الخليج', { exact: false }).waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'AR: memory ask recalls details in Arabic');
    await ctx.close();
  }

  // 5) Clear memory removes chips and resets stored state.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await submitText(page, 'My name is Layla.');
    await page.locator('div[style*="bottom: 100px"]').getByText('Nice to meet you, Layla', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    await page.locator('[aria-label="Clear session memory"]').click();
    await page.waitForTimeout(400);
    const mem = await storedMemory(page);
    report(Boolean(mem && !mem.name && mem.questions.length === 0), 'EN: clear resets stored memory');
    await submitText(page, 'what do you remember?');
    await page.locator('div[style*="bottom: 100px"]').getByText(/I don't have any session details saved yet/).waitFor({ state: 'visible', timeout: 12000 });
    report(true, 'EN: after clear, memory ask reports empty memory');
    await ctx.close();
  }

  // 6) EN: a seeded journey records it in memory + shows the journey chip.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      localStorage.setItem('xvi-language', 'en');
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
      localStorage.setItem('xviConciergeSeen', 'true');
      sessionStorage.setItem('xvi-journey', 'healthcare');
      sessionStorage.removeItem('xvi-executive-memory');
    });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1200);
    const mem = await storedMemory(page);
    report(Boolean(mem && mem.journey === 'healthcare'), `EN: journey recorded in memory (got ${mem?.journey})`);
    await openDock(page, 'en');
    await page.locator('div[style*="bottom: 100px"]').getByText('Healthcare', { exact: false }).first().waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'EN: journey chip shown in the dock');
    await ctx.close();
  }

  // 7) AR: seeded journey persists to memory with Arabic chip label.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      localStorage.setItem('xvi-language', 'ar');
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
      localStorage.setItem('xviConciergeSeen', 'true');
      sessionStorage.setItem('xvi-journey', 'government');
      sessionStorage.removeItem('xvi-executive-memory');
    });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');
    await page.locator('div[style*="bottom: 100px"]').getByText('الحكومة', { exact: false }).first().waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'AR: journey chip shown with Arabic label');
    const mem = await storedMemory(page);
    report(Boolean(mem && mem.journey === 'government'), `AR: journey recorded in memory (got ${mem?.journey})`);
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
