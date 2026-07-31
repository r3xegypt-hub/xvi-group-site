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
    sessionStorage.removeItem('xvi-executive-memory');
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

  // 1) EN: persona signature appears on knowledge responses.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await page.locator('div[style*="bottom: 100px"]').getByText(/quietly capable/).waitFor({ state: 'visible', timeout: 6000 });
    report(true, 'EN: ready-state persona intro present');
    await submitText(page, 'services');
    await page.locator('div[style*="bottom: 100px"]').getByText('We offer four core services', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    await page.locator('div[style*="bottom: 100px"]').getByText('precision over speculation', { exact: false }).waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'EN: persona signature on knowledge response');
    await ctx.close();
  }

  // 2) AR: persona signature in Arabic.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'ar');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');
    await page.locator('div[style*="bottom: 100px"]').getByText(/هادئاً ودقيقاً/).waitFor({ state: 'visible', timeout: 6000 });
    report(true, 'AR: ready-state persona intro present');
    await submitText(page, 'خدمات');
    await page.locator('div[style*="bottom: 100px"]').getByText('نقدم أربع خدمات رئيسية', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    await page.locator('div[style*="bottom: 100px"]').getByText('الدقة قبل التكهن', { exact: false }).waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'AR: persona signature on knowledge response');
    await ctx.close();
  }

  // 3) EN: memory acknowledgment also carries the persona signature.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await submitText(page, 'My name is John.');
    await page.locator('div[style*="bottom: 100px"]').getByText('Nice to meet you, John', { exact: false }).waitFor({ state: 'visible', timeout: 12000 });
    await page.locator('div[style*="bottom: 100px"]').getByText('precision over speculation', { exact: false }).waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'EN: persona signature on memory acknowledgment');
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
