import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

const robotSel = (lang) => `[aria-label="${lang === 'ar' ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge'}"]`;
const TITLE = (lang) => (lang === 'ar' ? 'مرحباً.' : 'Welcome.');
const SUB = (lang) => (lang === 'ar' ? 'أنا المستشار التنفيذي الذكي.' : "I'm your Executive AI Consultant.");
const ASK = (lang) => (lang === 'ar' ? 'كيف تود استكشاف XVI اليوم؟' : 'How would you like to explore XVI today?');
const CONFIRM = (lang) =>
  lang === 'ar' ? 'رحلة الاستراتيجية التنفيذية.' : 'Continuing your Executive Strategy journey.';
const JOURNEY_LABELS = (lang) =>
  lang === 'ar'
    ? ['الاستراتيجية التنفيذية', 'الرعاية الصحية', 'الحكومة', 'استكشف كل شيء']
    : ['Executive Strategy', 'Healthcare', 'Government', 'Explore Everything'];

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

async function waitText(page, text) {
  const loc = page.getByText(text).first();
  await loc.waitFor({ state: 'visible', timeout: 20000 });
  await page.waitForTimeout(600);
  return loc.boundingBox();
}

async function expectGreeting(page, lang, vw, label) {
  const title = TITLE(lang);
  const box = await waitText(page, title);
  const within = box.x >= 0 && box.x + box.width <= vw && box.y >= 0;
  report(within, `greeting card inside viewport (${label})`);
  const side = lang === 'ar' ? vw - (box.x + box.width) < 240 : box.x < 240;
  report(side, `greeting card near ${lang === 'ar' ? 'RIGHT' : 'LEFT'} side (${label})`);
  const vh = await page.evaluate(() => window.innerHeight);
  report(box.y < vh * 0.5, `greeting card near hero region (top=${Math.round(box.y)}) (${label})`);

  report(await page.getByText(title).first().isVisible().catch(() => false), `greeting title correct (${label})`);
  report(await page.getByText(SUB(lang)).first().isVisible().catch(() => false), `greeting subtitle correct (${label})`);
  report(await page.getByText(ASK(lang)).first().isVisible().catch(() => false), `greeting prompt correct (${label})`);
  report(
    await page.locator('[data-testid="arrival-waveform"]').isVisible().catch(() => false),
    `arrival waveform present (${label})`,
  );

  const selector = page.locator('[data-testid="journey-selector"]');
  report(await selector.isVisible().catch(() => false), `journey selector present (${label})`);
  const cards = page.locator('[data-journey]');
  report((await cards.count()) === 4, `four journey cards rendered (${label})`);
  const labels = JOURNEY_LABELS(lang);
  for (let i = 0; i < 4; i++) {
    report(
      await page.getByText(labels[i], { exact: true }).first().isVisible().catch(() => false),
      `journey card "${labels[i]}" visible (${label})`,
    );
  }
}

async function expectRobot(page, lang, w, h, label, corner) {
  const sel = robotSel(lang);
  await page.locator(sel).waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(700);
  const box = await page.locator(sel).boundingBox();
  const vw = await page.evaluate(() => window.innerWidth);
  const vh = await page.evaluate(() => window.innerHeight);
  const inViewport = box.x >= -1 && box.x + box.width <= vw + 1 && box.y >= -1 && box.y + box.height <= vh + 1;
  report(inViewport, `robot inside viewport (${label})`);
  if (corner === 'bl') {
    report(box.x < 90 && vh - box.y - box.height < 96, `robot at bottom-LEFT corner (${label})`);
  } else if (corner === 'br') {
    report(box.x + box.width > vw - 90 && vh - box.y - box.height < 96, `robot at bottom-RIGHT corner (${label})`);
  }
  const opacity = await page.evaluate((s) => parseFloat(getComputedStyle(document.querySelector(s)).opacity), sel);
  report(opacity > 0.9, `robot visible (opacity=${opacity}) (${label})`);
  return box;
}

async function runFirstVisit(browser, lang, w, h, label) {
  const { ctx, page } = await initContext(browser, lang, w, h);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const vw = w;

  await expectGreeting(page, lang, vw, `${lang} ${label}`);

  // no horizontal scroll while greeting shows
  const hScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  report(!hScroll, `no horizontal scroll during greeting (${lang} ${label})`);

  // choose the Executive journey -> confirmation -> auto-minimize to corner robot
  await page.locator('[data-journey="executive"]').click();
  await page.waitForTimeout(900);
  report(await page.getByText(CONFIRM(lang)).first().isVisible().catch(() => false), `confirmation shown (${lang} ${label})`);
  await page.waitForTimeout(2800);

  const cardGone = await page.getByText(TITLE(lang)).first().isVisible().catch(() => false);
  report(!cardGone, `greeting card minimized after journey selection (${lang} ${label})`);

  const corner = lang === 'ar' ? 'br' : 'bl';
  await expectRobot(page, lang, w, h, `${lang} ${label}`, corner);

  // click robot -> opens dock; robot fades away (poll, animation is ~0.6s)
  const sel = robotSel(lang);
  const rb = await page.locator(sel).boundingBox();
  await page.mouse.click(rb.x + rb.width / 2, rb.y + rb.height / 2);
  await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 8000 });
  const dockVisible = await page.locator('div[style*="bottom: 100px"]').isVisible().catch(() => false);
  report(dockVisible, `clicking robot opens the AI Dock (${lang} ${label})`);
  const robotOpacity = async () =>
    parseFloat(await page.evaluate((s) => getComputedStyle(document.querySelector(s)).opacity, sel));
  let op = 1;
  for (let i = 0; i < 20; i++) {
    op = await robotOpacity();
    if (op < 0.2) break;
    await page.waitForTimeout(100);
  }
  report(op < 0.2, `robot hides while dock open (opacity=${op.toFixed(3)}) (${lang} ${label})`);

  // close dock via its toggle button -> robot fades back
  await page.locator('div[style*="bottom: 100px"] button').first().click();
  let op2 = 0;
  for (let i = 0; i < 20; i++) {
    op2 = await robotOpacity();
    if (op2 > 0.9) break;
    await page.waitForTimeout(100);
  }
  report(op2 > 0.9, `robot returns after dock closes (opacity=${op2.toFixed(3)}) (${lang} ${label})`);

  // drag robot toward the screen center
  const r0 = await page.locator(sel).boundingBox();
  const dx = corner === 'bl' ? 130 : -130;
  const dy = -80;
  await page.mouse.move(r0.x + r0.width / 2, r0.y + r0.height / 2);
  await page.mouse.down();
  await page.mouse.move(r0.x + r0.width / 2 + dx, r0.y + r0.height / 2 + dy, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(400);
  const r1 = await page.locator(sel).boundingBox();
  const dist = Math.hypot(r1.x - r0.x, r1.y - r0.y);
  report(dist > 60, `robot is draggable (moved ${Math.round(dist)}px) (${lang} ${label})`);
  const vw2 = await page.evaluate(() => window.innerWidth);
  const vh2 = await page.evaluate(() => window.innerHeight);
  report(r1.x >= -1 && r1.x + r1.width <= vw2 + 1 && r1.y >= -1 && r1.y + r1.height <= vh2 + 1, `robot stays in viewport after drag (${lang} ${label})`);

  await ctx.close();
}

async function runSeenVisit(browser, lang, label) {
  const { ctx, page } = await initContext(browser, lang, 1440, 900, { seen: true });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const cardShown = await page.getByText(TITLE('en')).first().isVisible().catch(() => false)
    || await page.getByText(TITLE('ar')).first().isVisible().catch(() => false);
  report(!cardShown, `no greeting on repeat visit (${label})`);
  const sel = robotSel(lang);
  await page.locator(sel).waitFor({ state: 'visible', timeout: 15000 });
  report(true, `robot present on repeat visit (${label})`);
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
})();
