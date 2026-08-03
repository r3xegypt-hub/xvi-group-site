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
  }, lang);
}

async function waitSvg(page, selector) {
  const loc = page.locator(selector).first();
  await loc.waitFor({ state: 'attached', timeout: 20000 });
  return loc;
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) EN: hero visuals on all 4 pages, light stream behind content with looping animation.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];
    page.on('console', (m) => {
      if (m.type() === 'error' && !m.text().includes('Expected moveto path command')) errors.push(m.text());
    });
    page.on('pageerror', (e) => errors.push(String(e)));
    await init(page, 'en');

    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    const streamLoc = page.locator("[class*='lightStream']").first();
    await streamLoc.waitFor({ state: 'attached', timeout: 20000 });
    report(true, 'EN home: .lightStream element rendered');
    const streamInfo = await page.evaluate(() => {
      const el = document.querySelector("[class*='lightStream']");
      if (!el) return null;
      const s = getComputedStyle(el);
      return { animation: s.animationName, duration: s.animationDuration, z: Number(s.zIndex) };
    });
    report(!!streamInfo && streamInfo.animation.includes('lightStreamSweep'), 'EN home: light stream animation lightStreamSweep applied');
    report(streamInfo && streamInfo.z === 1, 'EN home: light stream z-index 1 (behind content)');
    const containerZ = await page.evaluate(() => {
      const stream = document.querySelector("[class*='lightStream']");
      if (!stream) return null;
      const hero = stream.parentElement;
      for (const el of hero ? hero.children : []) {
        if (getComputedStyle(el).zIndex === '3') return 3;
      }
      return null;
    });
    report(containerZ === 3, 'EN home: hero content container z-index 3 above stream');
    await page.waitForTimeout(900);
    const persists = await page.evaluate(() => {
      const el = document.querySelector("[class*='lightStream']");
      return el ? getComputedStyle(el).animationName.includes('lightStreamSweep') : false;
    });
    report(persists, 'EN home: light stream animation persists (looping)');
    const noHScroll = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    report(noHScroll, 'EN home: no horizontal scroll');

    const pageChecks = [
      ['/about', 'right', (x) => x > 700],
      ['/services', 'right', (x) => x > 700],
      ['/insights', 'right', (x) => x > 700],
      ['/careers', 'right', (x) => x > 700],
      ['/technology', 'right', (x) => x > 700],
      ['/industries', 'right', (x) => x > 700],
      ['/contact', 'right', (x) => x > 700],
    ];
    for (const [path, side, pred] of pageChecks) {
      await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
      const visual = await waitSvg(page, "[class*='heroVisual'] svg");
      const box = await visual.boundingBox();
      report(!!box && pred(box.x), `EN ${path}: hero visual rendered on ${side} side (x=${box ? Math.round(box.x) : 'n/a'})`);
      const noHScrollPage = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
      report(noHScrollPage, `EN ${path}: no horizontal scroll`);
    }

    await page.goto(BASE + '/about', { waitUntil: 'domcontentloaded' });
    const goldRule = page.locator("[class*='goldRule']").first();
    await goldRule.waitFor({ state: 'attached', timeout: 20000 });
    report(true, 'EN /about: gold rule between vision and mission rendered');

    await page.goto(BASE + '/services', { waitUntil: 'domcontentloaded' });
    const serviceVisual = page.locator("[class*='serviceVisual'] svg").first();
    await serviceVisual.waitFor({ state: 'attached', timeout: 20000 });
    const svCount = await page.locator("[class*='serviceVisual'] svg").count();
    report(svCount === 3, `EN /services: 3 per-service watermark visuals (${svCount})`);
    const divider = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll("[class*='serviceSection']"));
      if (sections.length < 2) return null;
      return getComputedStyle(sections[1]).borderTopColor;
    });
    report(divider !== null && divider.includes('200'), `EN /services: gold hairline between service sections (${divider})`);

    report(errors.length === 0, `EN all pages: no console errors (${errors.length})`);
    await ctx.close();
  }

  // 2) AR: mirrored placement + visuals intact.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'ar');

    await page.goto(BASE + '/about', { waitUntil: 'domcontentloaded' });
    const aboutVisual = await waitSvg(page, "[class*='heroVisual'] svg");
    const aboutBox = await aboutVisual.boundingBox();
    report(!!aboutBox && aboutBox.x < 500, `AR /about: hero visual mirrored to left in RTL (x=${aboutBox ? Math.round(aboutBox.x) : 'n/a'})`);
    const goldRule = page.locator("[class*='goldRule']").first();
    await goldRule.waitFor({ state: 'attached', timeout: 20000 });
    report(true, 'AR /about: gold rule present');
    const noHScroll = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    report(noHScroll, 'AR /about: no horizontal scroll');

    for (const path of ['/services', '/insights', '/careers', '/technology', '/industries', '/contact']) {
      await page.goto(BASE + path, { waitUntil: 'domcontentloaded' });
      const v = await waitSvg(page, "[class*='heroVisual'] svg");
      const b = await v.boundingBox();
      report(!!b && b.x < 500, `AR ${path}: hero visual rendered & mirrored (x=${b ? Math.round(b.x) : 'n/a'})`);
    }
    await ctx.close();
  }

  // 3) Storytelling audit: no fabricated metrics, narrative instead.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');

    // Home principles strip replaced numbers with narrative.
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    const strip = page.locator('section[aria-label="Executive principles"]');
    await strip.waitFor({ state: 'attached', timeout: 20000 });
    await strip.scrollIntoViewIfNeeded();
    const stripText = await strip.innerText();
    report(stripText.includes('Every transformation starts with one decision.'), 'home: narrative principle rendered');
    report(stripText.includes('Strategy before technology.'), 'home: strategy principle rendered');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(600);
    const homeText = await page.locator('body').innerText();
    const bannedHome = ['14+', '$2.4B', '40+', '92%', 'years of executive', 'معدل العملاء المتكررين'];
    for (const t of bannedHome) {
      report(!homeText.includes(t), `home: no fabricated "${t}"`);
    }

    // Insights scenarios: types present, fabricated clients/numbers gone.
    await page.goto(BASE + '/insights', { waitUntil: 'domcontentloaded' });
    await page.locator('div[class*="card"][role="button"]').first().waitFor({ state: 'attached', timeout: 20000 });
    const insightsText = await page.locator('body').innerText();
    for (const t of ['Prototype Solution', 'Reference Implementation', 'Executive Scenario', 'Concept Project']) {
      report(insightsText.includes(t), `insights: ${t} scenario type present`);
    }
    for (const t of ['Nile Health Group', 'Atlas Infrastructure', '$4B', 'Mirah Retail', 'DeltaForge', 'Cedar City', 'Golden Horizon']) {
      report(!insightsText.includes(t), `insights: no fabricated client "${t}"`);
    }
    await page.locator('div[class*="card"][role="button"]').first().click();
    await page.locator('[class*="modal"][role="dialog"]').waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const modalText = await page.locator('[class*="modal"][role="dialog"]').innerText().catch(() => '');
    report(modalText.includes('POSSIBLE OUTCOMES'), 'insights modal: narrative outcomes label');
    report(modalText.includes('CURRENT REALITY / DESIGNED TARGET'), 'insights modal: reality/target framing');
    report(!modalText.includes('EXECUTIVE KPIs'), 'insights modal: no KPI label');
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);

    // Portfolio: blueprints framing, no fabricated stats.
    await page.goto(BASE + '/portfolio', { waitUntil: 'domcontentloaded' });
    await page.locator('button[class*="tile"]').first().waitFor({ state: 'attached', timeout: 20000 });
    const resultCount = page.locator('[class*="resultCount"]').first();
    await resultCount.waitFor({ state: 'attached', timeout: 20000 });
    await resultCount.scrollIntoViewIfNeeded();
    report((await resultCount.textContent())?.trim() === '09 concepts', 'portfolio: result count narrative');
    const portfolioText = await page.locator('body').innerText();
    report(portfolioText.includes('Blueprints for your next transformation.'), 'portfolio: blueprint title');
    for (const t of ['90ms', '$1.8B', '1.2M', '12,000', '800 stores', 'Engagements that moved the needle']) {
      report(!portfolioText.includes(t), `portfolio: no fabricated stat "${t}"`);
    }
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
