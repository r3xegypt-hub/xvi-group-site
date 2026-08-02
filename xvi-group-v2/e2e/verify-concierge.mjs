import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

const robotSel = (lang) => `[aria-label="${lang === 'ar' ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge'}"]`;
const TIP = (lang) => (lang === 'ar' ? 'كيف يمكنني مساعدتك؟' : 'Need help?');

async function initContext(browser, lang, w, h, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.addInitScript(({ l, seen }) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    if (seen) localStorage.setItem('xviConciergeSeen', 'true');
  }, { l: lang, seen: !!opts.seen });
  return { ctx, page };
}

// Opacity of the smallest text-only element matching exactly.
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

const exactTextCount = (page, text) =>
  page.evaluate((t) => {
    let n = 0;
    for (const e of document.querySelectorAll('div, span, h1, h2, h3, h4, p')) {
      if (e.children.length === 0 && e.textContent && e.textContent.trim() === t) n++;
    }
    return n;
  }, text);

async function runFirstVisit(browser, lang, w, h, label) {
  const { ctx, page } = await initContext(browser, lang, w, h);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const vw = w;
  const vh = await page.evaluate(() => window.innerHeight);

  const sel = robotSel(lang);
  await page.locator(sel).waitFor({ state: 'visible', timeout: 20000 });

  // Single AI entry: no large greeting/journey panel anywhere.
  report((await page.locator('[data-testid="journey-selector"]').count()) === 0, `no journey selector panel (${label})`);
  report((await page.locator('[data-testid="arrival-waveform"]').count()) === 0, `no arrival waveform panel (${label})`);
  report(
    (await exactTextCount(page, lang === 'ar' ? 'مرحباً.' : 'Welcome.')) === 0,
    `no large greeting panel (${label})`,
  );
  report(
    (await exactTextCount(page, lang === 'ar' ? 'كيف تود استكشاف XVI اليوم؟' : 'How would you like to explore XVI today?')) === 0,
    `no journey prompt panel (${label})`,
  );

  // no horizontal scroll while the robot greets
  const hScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  report(!hScroll, `no horizontal scroll during greeting (${label})`);

  // Robot greets from the hero region on first visit.
  await page.waitForTimeout(1200);
  let rb = await page.locator(sel).boundingBox();
  report(rb.y < vh * 0.5, `robot greets from hero region (y=${Math.round(rb.y)}) (${label})`);

  // Greeting tooltip auto-shows on first visit.
  const tipText = TIP(lang);
  const t0 = Date.now();
  let tipOp = 0;
  while (Date.now() - t0 < 15000) {
    tipOp = await tipOpacity(page, tipText);
    if (tipOp > 0.5) break;
    await page.waitForTimeout(150);
  }
  report(tipOp > 0.5, `greeting tooltip auto-shown (opacity=${tipOp.toFixed(2)}) (${label})`);

  // Greeting auto-dismisses: robot settles to the corner, tooltip fades.
  const corner = lang === 'ar' ? 'br' : 'bl';
  const t1 = Date.now();
  let cornerOk = false;
  while (Date.now() - t1 < 15000) {
    rb = await page.locator(sel).boundingBox();
    if (!rb) { await page.waitForTimeout(150); continue; }
    cornerOk = corner === 'bl'
      ? rb.x < 90 && vh - rb.y - rb.height < 96
      : rb.x + rb.width > vw - 90 && vh - rb.y - rb.height < 96;
    if (cornerOk) break;
    await page.waitForTimeout(150);
  }
  report(cornerOk, `robot auto-settles to bottom-${corner === 'bl' ? 'LEFT' : 'RIGHT'} corner (${label})`);
  await page.waitForTimeout(500);
  report((await tipOpacity(page, tipText)) < 0.5, `greeting dismissed after settle (${label})`);

  const opacity = await page.evaluate((s) => parseFloat(getComputedStyle(document.querySelector(s)).opacity), sel);
  report(opacity > 0.9, `robot fully visible (opacity=${opacity}) (${label})`);

  // robot is draggable
  const r0 = rb;
  const dx = corner === 'bl' ? 130 : -130;
  await page.mouse.move(r0.x + r0.width / 2, r0.y + r0.height / 2);
  await page.mouse.down();
  await page.mouse.move(r0.x + r0.width / 2 + dx, r0.y + r0.height / 2 - 80, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(400);
  const r1 = await page.locator(sel).boundingBox();
  const dist = Math.hypot(r1.x - r0.x, r1.y - r0.y);
  report(dist > 60, `robot is draggable (moved ${Math.round(dist)}px) (${label})`);
  const vw2 = await page.evaluate(() => window.innerWidth);
  const vh2 = await page.evaluate(() => window.innerHeight);
  report(r1.x >= -1 && r1.x + r1.width <= vw2 + 1 && r1.y >= -1 && r1.y + r1.height <= vh2 + 1, `robot stays in viewport after drag (${label})`);

  // click robot -> opens dock; robot hides while dock open
  await page.mouse.click(r1.x + r1.width / 2, r1.y + r1.height / 2);
  await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 8000 });
  const dockVisible = await page.locator('div[style*="bottom: 100px"]').isVisible().catch(() => false);
  report(dockVisible, `clicking robot opens the AI Dock (${label})`);
  let op = 1;
  for (let i = 0; i < 20; i++) {
    op = await page.evaluate((s) => parseFloat(getComputedStyle(document.querySelector(s)).opacity), sel);
    if (op < 0.2) break;
    await page.waitForTimeout(100);
  }
  report(op < 0.2, `robot hides while dock open (opacity=${op.toFixed(3)}) (${label})`);

  // close dock -> robot fades back
  await page.locator('div[style*="bottom: 100px"] button').first().click();
  let op2 = 0;
  for (let i = 0; i < 20; i++) {
    op2 = await page.evaluate((s) => parseFloat(getComputedStyle(document.querySelector(s)).opacity), sel);
    if (op2 > 0.9) break;
    await page.waitForTimeout(100);
  }
  report(op2 > 0.9, `robot returns after dock closes (opacity=${op2.toFixed(3)}) (${label})`);

  await ctx.close();
}

async function runSeenVisit(browser, lang, label) {
  const { ctx, page } = await initContext(browser, lang, 1440, 900, { seen: true });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const sel = robotSel(lang);
  await page.locator(sel).waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(1200);
  report((await tipOpacity(page, TIP(lang))) < 0.5, `no greeting tooltip on repeat visit (${label})`);
  report(
    (await exactTextCount(page, lang === 'ar' ? 'مرحباً.' : 'Welcome.')) === 0,
    `no greeting panel on repeat visit (${label})`,
  );
  const box = await page.locator(sel).boundingBox();
  const vw = await page.evaluate(() => window.innerWidth);
  const vh = await page.evaluate(() => window.innerHeight);
  const corner = lang === 'ar' ? 'br' : 'bl';
  const atCorner = corner === 'bl'
    ? box.x < 90 && vh - box.y - box.height < 96
    : box.x + box.width > vw - 90 && vh - box.y - box.height < 96;
  report(atCorner, `robot at bottom corner on repeat visit (${label})`);
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  console.log('=== DESKTOP ===');
  await runFirstVisit(browser, 'en', 1440, 900, 'desktop');
  await runFirstVisit(browser, 'ar', 1440, 900, 'desktop');
  console.log('=== TABLET ===');
  await runFirstVisit(browser, 'en', 820, 1180, 'tablet');
  await runFirstVisit(browser, 'ar', 820, 1180, 'tablet');
  console.log('=== MOBILE ===');
  await runFirstVisit(browser, 'en', 390, 844, 'mobile');
  await runFirstVisit(browser, 'ar', 390, 844, 'mobile');
  console.log('=== REPEAT VISITS ===');
  await runSeenVisit(browser, 'en', 'en');
  await runSeenVisit(browser, 'ar', 'ar');
  await browser.close();

  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
