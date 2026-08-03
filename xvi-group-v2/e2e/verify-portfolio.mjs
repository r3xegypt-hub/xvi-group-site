import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

const SVG_ATTR_WARN = /attribute (rx|ry|cx|cy|r): Expected length/;

async function setupPage(browser, lang, plays, errors) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (m) => {
    if (m.type() === 'error' && !SVG_ATTR_WARN.test(m.text())) errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.exposeFunction('recordPlay', (name) => plays.push(name));
  await page.addInitScript((language) => {
    localStorage.setItem('xvi-language', language);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
    window.addEventListener('xvi:sound-play', (e) => {
      window.recordPlay(e.detail && e.detail.name);
    });
  }, lang);
  return page;
}

const tileSel = 'button[class*="tile"]';

(async () => {
  const browser = await chromium.launch({ headless: true });

  // ============ ENGLISH ============
  const plays = [];
  const errors = [];
  const page = await setupPage(browser, 'en', plays, errors);
  await page.goto(BASE + '/portfolio', { waitUntil: 'domcontentloaded' });
  await page.locator('section').first().waitFor({ state: 'attached', timeout: 20000 });
  await page.waitForTimeout(400);

  report((await page.locator('text=BLUEPRINTS').count()) > 0, 'eyebrow present');
  report((await page.locator('text=Blueprints for your next transformation').count()) > 0, 'hero title present');

  const filters = page.locator('[role="tablist"] [role="tab"]');
  const filterCount = await filters.count();
  report(filterCount === 10, `filter tabs = 10 (got ${filterCount})`);
  report(await filters.first().getAttribute('aria-selected') === 'true', 'All Work tab selected by default');

  let tiles = page.locator(tileSel);
  let tileCount = await tiles.count();
  report(tileCount === 9, `grid shows 9 tiles on All (got ${tileCount})`);

  const firstLabel = await tiles.first().getAttribute('aria-label');
  report(firstLabel === 'Sovereign Banking Core', `first tile labelled (${firstLabel})`);
  report((await tiles.first().locator('svg[data-variant]').count()) === 1, 'tile renders generated SVG art');

  report((await page.locator('[class*="resultCount"]').first().textContent())?.trim() === '09 concepts', 'result count shows 09 concepts');
  report((await tiles.nth(8).locator('svg[data-variant]').count()) === 0, 'tile 9 defers art (lazy, skeleton only)');

  // Lazy loading: scrolling tile 9 into view mounts its SVG art
  await tiles.nth(8).scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  report((await tiles.nth(8).locator('svg[data-variant]').count()) === 1, 'tile 9 mounts SVG art after scroll');

  // Sound wiring: tile hover -> ctaHover, filter click -> ctaClick
  plays.length = 0;
  await tiles.first().dispatchEvent('mouseover');
  await page.waitForTimeout(250);
  report(plays.includes('ctaHover'), `tile hover plays ctaHover (${JSON.stringify(plays)})`);

  plays.length = 0;
  await filters.nth(1).click(); // Finance
  await page.waitForTimeout(600);
  report(plays.includes('ctaClick'), `filter click plays ctaClick (${JSON.stringify(plays)})`);

  tiles = page.locator(tileSel);
  tileCount = await tiles.count();
  report(tileCount === 1, `Finance filter narrows to 1 tile (got ${tileCount})`);
  report((await tiles.first().getAttribute('aria-label')) === 'Sovereign Banking Core', 'finance tile = Sovereign Banking Core');

  // Re-select All Work
  await filters.first().click();
  await page.waitForTimeout(600);
  tiles = page.locator(tileSel);
  report((await tiles.count()) === 9, 'All Work restores 9 tiles');

  // Open lightbox on first tile -> hologram
  plays.length = 0;
  await tiles.first().click();
  await page.waitForTimeout(600);
  report(plays.includes('hologram'), `tile click plays hologram (${JSON.stringify(plays)})`);

  const dialog = page.locator('[role="dialog"]');
  report((await dialog.count()) === 1, 'lightbox dialog open');
  report((await dialog.getAttribute('aria-modal')) === 'true', 'dialog aria-modal=true');
  report((await dialog.locator('text=Sovereign Banking Core').count()) > 0, 'dialog shows selected title');
  report((await dialog.locator('[class*="lightboxStats"] > div').count()) === 0, 'dialog shows no fabricated stats');
  report((await dialog.locator('[class*="lightboxOutcome"]').count()) === 1, 'dialog shows narrative outcome');
  report((await dialog.locator('text=Explore AI Transformation').count()) > 0, 'dialog shows related link');
  report((await dialog.locator('a[href$="/services/ai-transformation"]').count()) === 1, 'related link href correct');

  const counter = dialog.locator('[class*="lightboxCounter"]');
  report((await counter.textContent())?.trim() === '01 / 09', `counter starts 01/09 (got ${(await counter.textContent())?.trim()})`);

  // Close button receives focus on open
  const activeLabel = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  report(activeLabel === 'Close', `close button focused on open (got ${activeLabel})`);

  // Keyboard: ArrowRight -> next, ArrowLeft -> back, Escape -> close
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(400);
  report((await counter.textContent())?.trim() === '02 / 09', `ArrowRight advances to 02/09 (got ${(await counter.textContent())?.trim()})`);
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(400);
  report((await counter.textContent())?.trim() === '01 / 09', 'ArrowLeft returns to 01/09');

  // Swipe gestures: drag left -> next, drag right -> previous
  plays.length = 0;
  const swipe = page.locator('[class*="lightboxSwipe"]');
  const sb = await swipe.boundingBox();
  const cx = sb.x + sb.width / 2;
  const cy = sb.y + sb.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  for (let i = 1; i <= 8; i++) {
    await page.mouse.move(cx - i * 14, cy, { steps: 2 });
  }
  await page.mouse.up();
  await page.waitForTimeout(500);
  report((await counter.textContent())?.trim() === '02 / 09', `swipe left advances to 02/09 (got ${(await counter.textContent())?.trim()})`);
  report(plays.includes('ctaClick'), `swipe plays ctaClick (${JSON.stringify(plays)})`);

  await page.mouse.move(cx, cy);
  await page.mouse.down();
  for (let i = 1; i <= 8; i++) {
    await page.mouse.move(cx + i * 14, cy, { steps: 2 });
  }
  await page.mouse.up();
  await page.waitForTimeout(500);
  report((await counter.textContent())?.trim() === '01 / 09', 'swipe right returns to 01/09');

  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'detached', timeout: 4000 });
  report(true, 'Escape closes lightbox');
  const restored = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
  report(restored === 'Sovereign Banking Core', `focus restored to opened tile (got ${restored})`);
  const dialogGone = await page.locator('[role="dialog"]').count();
  report(dialogGone === 0, `lightbox fully removed (count ${dialogGone})`);

  report(errors.length === 0, `en: zero console/page errors (got ${errors.length})`);
  await page.close();

  // ============ ARABIC ============
  const aPlays = [];
  const aErrors = [];
  const aPage = await setupPage(browser, 'ar', aPlays, aErrors);
  await aPage.goto(BASE + '/portfolio', { waitUntil: 'domcontentloaded' });
  await aPage.locator('section').first().waitFor({ state: 'attached', timeout: 20000 });
  await aPage.waitForTimeout(400);

  const aTiles = aPage.locator(tileSel);
  report((await aTiles.count()) === 9, `ar: 9 tiles shown (got ${await aTiles.count()})`);
  const arLabel = await aTiles.first().getAttribute('aria-label');
  report(arLabel === 'نواة مصرفية سيادية', `ar: tile labelled in Arabic (${arLabel})`);
  const aFilters = aPage.locator('[role="tablist"] [role="tab"]');
  report((await aFilters.first().textContent())?.trim() === 'كل الأعمال', 'ar: All tab in Arabic');

  await aTiles.first().click();
  await aPage.waitForTimeout(500);
  const aDialog = aPage.locator('[role="dialog"]');
  report((await aDialog.locator('text=استكشف التحول بالذكاء الاصطناعي').count()) > 0, 'ar: related link in Arabic');
  report(aErrors.length === 0, `ar: zero console/page errors (got ${aErrors.length})`);
  await aPage.close();

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
