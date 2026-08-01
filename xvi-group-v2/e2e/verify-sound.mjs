import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

const SVG_ATTR_WARN = /attribute (rx|ry|cx|cy|r): Expected length/;

async function init(page, sound = '') {
  await page.addInitScript((sound) => {
    localStorage.setItem('xvi-language', 'en');
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xvi-conciergeSeen', 'true');
    if (sound) localStorage.setItem('xvi-sound', sound);
    window.__ambient = [];
    window.addEventListener('xvi:sound-ambient', (e) => {
      window.__ambient.push(e.detail && e.detail.started);
    });
  }, sound);
}

async function setupPage(browser, plays, errors) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('console', (m) => {
    if (m.type() === 'error' && !SVG_ATTR_WARN.test(m.text())) errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.exposeFunction('recordPlay', (name) => plays.push(name));
  await page.addInitScript(() => {
    window.addEventListener('xvi:sound-play', (e) => {
      window.recordPlay(e.detail && e.detail.name);
    });
  });
  return page;
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // ============ SOUNDS ENABLED ============
  const plays = [];
  const errors = [];
  const page = await setupPage(browser, plays, errors);
  await init(page);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  report((await page.locator('button:has-text("Explore our solutions")').count()) > 0, 'hero CTA present');

  // Hover the hero CTA -> ctaHover
  await page.locator('button:has-text("Explore our solutions")').hover();
  await page.waitForTimeout(300);
  report(plays.includes('ctaHover'), `hover plays ctaHover (${JSON.stringify(plays)})`);

  // Click the ghost CTA -> ctaClick + dockOpen (dock opens)
  plays.length = 0;
  await page.locator('button:has-text("Talk to the Executive AI")').click();
  await page.waitForTimeout(500);
  report(plays.includes('ctaClick'), `CTA click plays ctaClick (${JSON.stringify(plays)})`);
  report(plays.includes('dockOpen'), `dock open plays dockOpen (${JSON.stringify(plays)})`);

  // Close dock by clicking the backdrop -> dockClose
  plays.length = 0;
  await page.mouse.click(700, 200);
  await page.waitForTimeout(600);
  report(plays.includes('dockClose'), `dock close plays dockClose (${JSON.stringify(plays)})`);

  // Ambient starts on the very first user gesture
  const ambientEvents = await page.evaluate(() => window.__ambient || []);
  report(ambientEvents.includes(true), `ambient starts on first gesture (${JSON.stringify(ambientEvents)})`);

  report(errors.length === 0, `zero console/page errors (got ${errors.length})`);
  await page.close();

  // ============ SOUNDS MUTED ============
  const mPlays = [];
  const mErrors = [];
  const mPage = await setupPage(browser, mPlays, mErrors);
  await init(mPage, 'off');
  await mPage.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await mPage.locator('button:has-text("Talk to the Executive AI")').hover();
  await mPage.waitForTimeout(200);
  await mPage.locator('button:has-text("Talk to the Executive AI")').click();
  await mPage.waitForTimeout(600);
  report(mPlays.length === 0, `muted: no sound events (got ${JSON.stringify(mPlays)})`);
  report(mErrors.length === 0, `muted: zero console/page errors (got ${mErrors.length})`);
  await mPage.close();

  // ============ GLOBE (industries) ============
  const gPlays = [];
  const gErrors = [];
  const gPage = await setupPage(browser, gPlays, gErrors);
  await init(gPage);
  await gPage.goto(BASE + '/industries', { waitUntil: 'domcontentloaded' });
  await gPage.waitForTimeout(1200);
  const nodes = gPage.locator('svg[role="group"] [role="button"][aria-label]');
  const nodeCount = await nodes.count();
  report(nodeCount === 7, `industries: globe nodes present (${nodeCount})`);

  // DOM events exercise the same React handlers -> sound chain deterministically
  // (the rotating sphere + fixed concierge robot make physical hovers position-flaky).
  await nodes.nth(2).dispatchEvent('mouseover');
  await gPage.waitForTimeout(300);
  report(gPlays.includes('ctaHover'), `globe node hover plays ctaHover (${JSON.stringify(gPlays)})`);

  gPlays.length = 0;
  await nodes.nth(0).dispatchEvent('click');
  await gPage.waitForTimeout(1200);
  report(gPlays.includes('hologram'), `globe node click plays hologram (${JSON.stringify(gPlays)})`);
  report(gPage.url().includes('/services/'), `globe node click navigated (${gPage.url()})`);
  report(gErrors.length === 0, `industries: zero console/page errors (got ${gErrors.length})`);
  await gPage.close();

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
