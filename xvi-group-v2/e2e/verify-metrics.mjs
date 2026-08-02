import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

async function setupPage(browser, lang, errors) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.addInitScript((language) => {
    localStorage.setItem('xvi-language', language);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
  }, lang);
  return page;
}

const stripSel = 'section[aria-label="Performance metrics"], section[aria-label="مؤشرات الأداء"]';

(async () => {
  const browser = await chromium.launch({ headless: true });

  // ============ ENGLISH ============
  const errors = [];
  const page = await setupPage(browser, 'en', errors);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const strip = page.locator(stripSel);
  await strip.first().waitFor({ state: 'attached', timeout: 20000 });

  report(await strip.count() === 1, 'metrics strip present on home');
  const metrics = strip.locator('[class*="metric"]');
  report(await metrics.count() === 4, 'strip shows 4 metrics');
  report((await strip.locator('[class*="eyebrow"]').innerText()).trim() === 'IMPACT IN NUMBERS', 'EN eyebrow correct');

  // Counters animate on scroll into view
  await strip.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const firstValue = metrics.first().locator('[class*="value"]');
  const mid = (await firstValue.innerText()).replace(/\s+/g, '');
  await page.waitForTimeout(2500);
  const final = (await firstValue.innerText()).replace(/\s+/g, '');
  report(final === '14+', `counter lands on 14+ (got ${final})`);
  report(mid !== final && mid !== '' && mid !== '14+', `counter animated through ${mid}`);

  const values = await metrics.evaluateAll((els) => els.map((el) => el.querySelector('[class*="value"]')?.textContent.replace(/\s+/g, '')));
  report(JSON.stringify(values) === JSON.stringify(['14+', '$2.4B', '40+', '92%']), `all counter values correct (${values.join(', ')})`);
  report((await metrics.nth(1).locator('[class*="label"]').innerText()).trim() === 'Client value created', 'EN labels localized');

  const hscroll = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  report(hscroll <= 0, `no horizontal overflow on home (${hscroll})`);
  report(errors.length === 0, `en: zero console errors (${errors.length})`);
  await page.close();

  // ============ REDUCED MOTION ============
  const rErrors = [];
  const rPage = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  rPage.on('console', (m) => { if (m.type() === 'error') rErrors.push(m.text()); });
  await rPage.addInitScript(() => {
    localStorage.setItem('xvi-language', 'en');
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
  });
  await rPage.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const rStrip = rPage.locator(stripSel);
  await rStrip.first().waitFor({ state: 'attached', timeout: 20000 });
  await rPage.waitForTimeout(400);
  const rFinal = (await rStrip.locator('[class*="metric"]').first().locator('[class*="value"]').innerText()).replace(/\s+/g, '');
  report(rFinal === '14+', `reduced motion shows final value immediately (got ${rFinal})`);
  await rPage.close();

  // ============ ARABIC / RTL ============
  const aErrors = [];
  const aPage = await setupPage(browser, 'ar', aErrors);
  await aPage.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const aStrip = aPage.locator(stripSel);
  await aStrip.first().waitFor({ state: 'attached', timeout: 20000 });
  report((await aStrip.locator('[class*="eyebrow"]').innerText()).trim() === 'الأثر بالأرقام', 'AR eyebrow localized');
  report((await aStrip.locator('[class*="metric"]').nth(3).locator('[class*="label"]').innerText()).trim() === 'معدل العملاء المتكررين', 'AR labels localized');
  report((await aPage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)) <= 0, 'AR: no horizontal overflow');
  report(aErrors.length === 0, `ar: zero console errors (${aErrors.length})`);

  // AR mobile compact
  await aPage.setViewportSize({ width: 390, height: 844 });
  await aPage.waitForTimeout(400);
  report((await aPage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)) <= 0, 'AR mobile: no horizontal overflow');
  await aPage.close();

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
