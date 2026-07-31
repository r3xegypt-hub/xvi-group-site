import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

const robotSel = (lang) => `[aria-label="${lang === 'ar' ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge'}"]`;

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

async function waitCard(page, title) {
  const loc = page.getByText(title).first();
  await loc.waitFor({ state: 'visible', timeout: 20000 });
  await page.waitForTimeout(700);
  const box = await loc.boundingBox();
  return box;
}

async function expectCardOnSide(page, lang, vw, label) {
  const title = lang === 'ar' ? 'مرحبًا بك في XVI GROUP' : 'Welcome to XVI GROUP';
  const box = await waitCard(page, title);
  const within = box.x >= 0 && box.x + box.width <= vw && box.y >= 0;
  report(within, `greeting card inside viewport (${label})`);
  const side = lang === 'ar' ? box.x + box.width > vw - 100 : box.x < 100;
  report(side, `greeting card near ${lang === 'ar' ? 'RIGHT' : 'LEFT'} side (${label})`);
  const vh = await page.evaluate(() => window.innerHeight);
  report(box.y < vh * 0.5, `greeting card near hero region (top=${Math.round(box.y)}) (${label})`);

  const titleOk = await page.getByText(title).isVisible();
  report(titleOk, `greeting title correct (${label})`);

  const sub = lang === 'ar' ? 'أنا المستشار التنفيذي الذكي.' : "I'm your Executive AI Consultant.";
  report(await page.getByText(sub).first().isVisible().catch(() => false), `greeting subtitle correct (${label})`);

  const labels = lang === 'ar'
    ? ['ابدأ مشروعًا', 'استشارة ذكاء اصطناعي', 'تواصل مع خبير']
    : ['Start a Project', 'AI Consultation', 'Contact an Expert'];
  for (const l of labels) {
    report(await page.getByText(l, { exact: true }).first().isVisible().catch(() => false), `action "${l}" present (${label})`);
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

  await expectCardOnSide(page, lang, vw, `${lang} ${label} card`);

  // no horizontal scroll while greeting shows
  const hScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  report(!hScroll, `no horizontal scroll during greeting (${lang} ${label})`);

  // trigger minimize via first action (routes to /contact)
  const firstAction = lang === 'ar' ? 'ابدأ مشروعًا' : 'Start a Project';
  await page.getByText(firstAction, { exact: true }).first().click();
  await page.waitForTimeout(1800);

  const cardGone = await page.getByText(lang === 'ar' ? 'مرحبًا بك في XVI GROUP' : 'Welcome to XVI GROUP').first().isVisible().catch(() => false);
  report(!cardGone, `greeting card minimized after action (${lang} ${label})`);

  const corner = lang === 'ar' ? 'br' : 'bl';
  await expectRobot(page, lang, w, h, `${lang} ${label}`, corner);

  // click robot -> opens dock; robot hides
  const sel = robotSel(lang);
  const rb = await page.locator(sel).boundingBox();
  await page.mouse.click(rb.x + rb.width / 2, rb.y + rb.height / 2);
  await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 8000 });
  await page.waitForTimeout(700);
  const dockVisible = await page.locator('div[style*="bottom: 100px"]').isVisible().catch(() => false);
  report(dockVisible, `clicking robot opens the AI Dock (${lang} ${label})`);
  const robotOpacity = await page.evaluate((s) => parseFloat(getComputedStyle(document.querySelector(s)).opacity), sel);
  report(robotOpacity < 0.2, `robot hides while dock open (opacity=${robotOpacity}) (${lang} ${label})`);

  // close dock via the panel's close button -> robot returns
  await page.locator('div[style*="bottom: 100px"] button').first().click();
  await page.waitForTimeout(800);
  const robotOpacity2 = await page.evaluate((s) => parseFloat(getComputedStyle(document.querySelector(s)).opacity), sel);
  report(robotOpacity2 > 0.9, `robot returns after dock closes (opacity=${robotOpacity2}) (${lang} ${label})`);

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
  const cardShown = await page.getByText('Welcome to XVI GROUP').first().isVisible().catch(() => false)
    || await page.getByText('مرحبًا بك في XVI GROUP').first().isVisible().catch(() => false);
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
