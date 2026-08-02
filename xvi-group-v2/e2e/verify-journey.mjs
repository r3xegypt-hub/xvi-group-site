import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

async function pickJourney(page, _id) {
  // Journey is seeded via sessionStorage in the page's addInitScript (single AI entry — no selector).
  await page.waitForTimeout(900);
}

async function h3Order(page, sectionSel) {
  return page.locator(`${sectionSel} h3`).allTextContents();
}

async function runGovernment(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('xvi-language', 'en');
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    sessionStorage.setItem('xvi-journey', 'government');
  });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  await pickJourney(page, 'government');
  await page.locator('[aria-label="Executive AI Concierge"]').waitFor({ state: 'visible', timeout: 15000 });
  const cardGone = !(await page.getByText('Welcome.').first().isVisible().catch(() => false));
  report(cardGone, `single AI entry: no greeting panel after journey seed`);

  const banner = page.getByTestId('journey-focus-banner');
  await banner.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
  report(await banner.isVisible().catch(() => false), `focus banner visible`);
  report(await banner.getByText('Curated for your Government journey').isVisible().catch(() => false), `banner copy correct (EN)`);

  // Services: Government focus (index 2 = Executive Adoption) reorders to first with tag.
  await page.locator('#solutions').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const svcOrder = await h3Order(page, '#solutions');
  report(svcOrder[0] === 'Executive Adoption', `services reordered — "${svcOrder[0]}" first (got ${JSON.stringify(svcOrder)})`);
  report(await page.locator('#solutions').getByText('Your journey').first().isVisible().catch(() => false), `services focus tag present`);

  // Industries: Government focus (Public Sector) reorders to first with tag.
  await page.locator('#industries').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const indOrder = await h3Order(page, '#industries');
  report(indOrder[0] === 'Public Sector', `industries reordered — "${indOrder[0]}" first (got ${JSON.stringify(indOrder)})`);
  report(await page.locator('#industries').getByText('Your journey').first().isVisible().catch(() => false), `industries focus tag present`);

  // Contact: journey-tailored CTA text.
  await page.locator('#contact-cta').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  report(await page.locator('#contact-cta').getByText('Talk to a government consultant').first().isVisible().catch(() => false), `contact CTA tailored to Government journey`);

  // Clear journey -> banner disappears, default ordering restored.
  await banner.scrollIntoViewIfNeeded();
  await banner.locator('button').first().click();
  await page.waitForTimeout(700);
  report(!(await banner.isVisible().catch(() => false)), `banner dismissed after clear`);
  await page.locator('#solutions').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const svcDefault = await h3Order(page, '#solutions');
  report(svcDefault[0] === 'Strategic AI', `services restored to default order after clear (got ${JSON.stringify(svcDefault)})`);
  report(!(await page.locator('#solutions').getByText('Your journey').first().isVisible().catch(() => false)), `focus tag removed after clear`);

  await ctx.close();
}

async function runHealthcareAR(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('xvi-language', 'ar');
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    sessionStorage.setItem('xvi-journey', 'healthcare');
  });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  await pickJourney(page, 'healthcare');

  const banner = page.getByTestId('journey-focus-banner');
  await banner.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
  report(await banner.isVisible().catch(() => false), `focus banner visible (AR)`);
  report(await banner.getByText('تجربة مخصصة لمسار الرعاية الصحية').isVisible().catch(() => false), `banner copy correct (AR)`);

  await page.locator('#solutions').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const svcOrder = await h3Order(page, '#solutions');
  report(svcOrder[0] === 'هندسة الأتمتة', `services reordered (AR) — "${svcOrder[0]}" first`);
  report(await page.locator('#solutions').getByText('مسارك المختار').first().isVisible().catch(() => false), `services focus tag present (AR)`);

  await page.locator('#industries').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const indOrder = await h3Order(page, '#industries');
  report(indOrder[0] === 'المؤسسات المعقدة', `industries reordered (AR) — "${indOrder[0]}" first`);

  await page.locator('#contact-cta').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  report(await page.locator('#contact-cta').getByText('تحدث مع مستشار رعاية صحية').first().isVisible().catch(() => false), `contact CTA tailored (AR)`);

  await ctx.close();
}

async function runNoJourney(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    localStorage.setItem('xvi-language', 'en');
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
  });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);
  report(!(await page.getByTestId('journey-focus-banner').isVisible().catch(() => false)), `no banner without a journey`);
  await page.locator('#solutions').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const svcOrder = await h3Order(page, '#solutions');
  report(svcOrder[0] === 'Strategic AI' && svcOrder.length === 3, `default services order without journey (got ${JSON.stringify(svcOrder)})`);
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  console.log('=== GOVERNMENT JOURNEY (EN) ===');
  await runGovernment(browser);
  console.log('=== HEALTHCARE JOURNEY (AR) ===');
  await runHealthcareAR(browser);
  console.log('=== NO JOURNEY ===');
  await runNoJourney(browser);
  await browser.close();

  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
