import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  const report = (ok, msg) => { results.push(ok); console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`); };

  async function init(page) {
    await page.addInitScript(() => {
      localStorage.setItem('xvi-language', 'en');
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
      localStorage.setItem('xviConciergeSeen', 'true');
    });
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await init(page);

  await page.goto(BASE + '/insights', { waitUntil: 'domcontentloaded' });
  await page.locator('div[class*="card"][role="button"]').first().waitFor({ state: 'attached', timeout: 20000 }).catch(() => {});

  const cards = page.locator('div[class*="card"][role="button"]');
  report(await cards.count() === 6, `six case cards present (${await cards.count()})`);
  report((await cards.first().locator('h3').innerText()).length > 0, 'card shows client name');
  report(await cards.first().locator('[class*="cardKpiValue"]').count() === 2, 'card shows 2 animated KPIs');
  report(await cards.first().locator('[class*="cardText"]').count() === 2, 'card shows challenge + AI solution');
  report(await cards.first().locator('[class*="cardImpact"]').count() === 1, 'card shows business impact');
  report(await cards.first().locator('[class*="cardCta"]').count() === 1, 'card has CTA');
  report(await page.locator('div[class*="grid"]').first().isVisible(), 'card grid visible');

  // hover spotlight (set CSS vars)
  await cards.first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const box = await cards.first().boundingBox();
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(150);
    const vars = await cards.first().evaluate((el) => ({ mx: el.style.getPropertyValue('--mx'), my: el.style.getPropertyValue('--my') }));
    report(vars.mx !== '' && vars.my !== '', `cursor spotlight vars set (${vars.mx},${vars.my})`);
  } else {
    report(false, 'cursor spotlight vars set (no bounding box)');
  }

  // open modal
  await cards.first().click();
  await page.locator('[class*="modal"][role="dialog"]').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  const modal = page.locator('[class*="modal"][role="dialog"]');
  report(await modal.count() === 1, 'modal opens on card click');
  report(await modal.locator('[class*="timeline"] li').count() === 4, 'modal timeline has 4 steps');
  report(await modal.locator('span[class*="techChip"]').count() === 4, 'modal technologies shown');
  report(await modal.locator('[class*="kpiGrid"] > [class*="kpi"]').count() === 4, 'modal results KPIs (4)');
  report(await modal.locator('[class*="baGrid"]').count() === 1, 'modal before/after results shown');
  report(await modal.locator('aside[class*="recommend"]').count() === 1, 'modal recommendation shown');
  report(await modal.locator('a[class*="ctaPrimary"]').count() === 1, 'modal related service link');
  report(await modal.locator('button[class*="ctaGold"]').count() === 1, 'modal contact expert button');

  // keyboard close (Escape)
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
  report(await modal.count() === 0, 'Escape closes modal');

  // body scroll lock while open
  await cards.first().click();
  await page.locator('[class*="modal"][role="dialog"]').waitFor({ state: 'visible', timeout: 5000 });
  const locked = await page.evaluate(() => document.body.style.overflow === 'hidden');
  report(locked, 'body scroll locked while modal open');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);

  const hscroll = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  report(hscroll <= 0, `no horizontal overflow on insights (${hscroll})`);
  report(errors.length === 0, `zero console errors (${errors.length})`);

  // RTL
  const arPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const arErrors = [];
  arPage.on('console', (m) => { if (m.type() === 'error') arErrors.push(m.text()); });
  await arPage.addInitScript(() => {
    localStorage.setItem('xvi-language', 'ar');
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
  });
  await arPage.goto(BASE + '/insights', { waitUntil: 'domcontentloaded' });
  await arPage.locator('div[class*="card"][role="button"]').first().waitFor({ state: 'attached', timeout: 20000 }).catch(() => {});
  report(await arPage.locator('div[class*="card"][role="button"]').count() === 6, 'AR mobile: six cards render');
  report(await arPage.locator('[class*="cardClient"]').first().innerText() !== '', 'AR: card client localized');
  await arPage.locator('div[class*="card"][role="button"]').first().click();
  await arPage.locator('[class*="modal"][role="dialog"]').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  report(await arPage.locator('[class*="modal"][role="dialog"]').count() === 1, 'AR mobile: modal opens');
  const arH = await arPage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  report(arH <= 0, `AR mobile: no overflow (${arH})`);
  report(arErrors.length === 0, `AR mobile: zero console errors (${arErrors.length})`);
  await arPage.close();

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
