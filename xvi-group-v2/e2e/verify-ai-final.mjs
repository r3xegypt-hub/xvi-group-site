import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

const robotSel = '[aria-label="Executive AI Concierge"]';
const heroSceneSel = 'div[class*="scene"]:has([class*="holoBase"])';

(async () => {
  const browser = await chromium.launch({ headless: true });

  // ============ FIRST VISIT: single robot entry on the hero ============
  // No xviConciergeSeen -> the cinematic greeting plays and the floating
  // concierge arrives at the hero position while the Hero robot yields.
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(() => {
      localStorage.setItem('xvi-language', 'en');
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
      sessionStorage.removeItem('xvi-concierge-session');
      localStorage.removeItem('xviConciergeSeen');
      localStorage.removeItem('xvi-executive-memory');
    });

    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    const robot = page.locator(robotSel);
    await robot.first().waitFor({ state: 'visible', timeout: 25000 });

    // Single AI entry: no large greeting/journey panel on first visit
    report((await page.getByText('Welcome.').first().isVisible().catch(() => false)) === false, 'first visit: no large greeting panel');
    report(await page.locator('[data-testid="journey-selector"]').count() === 0, 'first visit: no journey selector panel');

    // Floating concierge arrives at the hero position (left side), not the corner
    const deadline = Date.now() + 4000;
    let arrived = false;
    while (Date.now() < deadline) {
      const box = await robot.boundingBox().catch(() => null);
      if (box && box.x > 120 && box.x < 260) { arrived = true; break; }
      await page.waitForTimeout(150);
    }
    report(arrived, 'single entry: floating concierge arrives at hero position (not corner)');

    // First visit: the greeting tooltip auto-shows on the floating robot
    const tip = robot.locator('[class*="tooltip"]');
    const tipDeadline = Date.now() + 10000;
    let tipShown = false;
    while (Date.now() < tipDeadline) {
      const o = await tip.evaluate((el) => parseFloat(getComputedStyle(el).opacity)).catch(() => 0);
      if (o > 0.5) { tipShown = true; break; }
      await page.waitForTimeout(150);
    }
    report(tipShown, 'first visit: greeting tooltip auto-shown on the robot');

    // Hero robot yields: its wrapper fades out so exactly one robot represents the AI
    const heroScene = page.locator(heroSceneSel);
    const yieldDeadline = Date.now() + 5000;
    let heroGone = false;
    while (Date.now() < yieldDeadline) {
      const op = await heroScene
        .first()
        .evaluate((el) => {
          let cur = el.parentElement;
          while (cur) {
            const o = parseFloat(getComputedStyle(cur).opacity);
            if (o < 0.9) return o;
            cur = cur.parentElement;
          }
          return 1;
        })
        .catch(() => 1);
      if (op < 0.35) { heroGone = true; break; }
      await page.waitForTimeout(150);
    }
    report(heroGone, 'single entry: Hero robot yields while concierge is on the hero');

    report(errors.length === 0, `first visit: zero console errors (${errors.length})`);
    await page.close();
  }

  // ============ DOCK MEMORY: robot tooltip greets by name ============
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.addInitScript(() => {
      localStorage.setItem('xvi-language', 'en');
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
      localStorage.setItem('xviConciergeSeen', 'true');
      sessionStorage.setItem(
        'xvi-executive-memory',
        JSON.stringify({ name: 'Sarah', company: 'Meridian Bank', industry: 'banking', questions: [], recommendations: [] })
      );
    });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    const robot = page.locator(robotSel);
    await robot.first().waitFor({ state: 'visible', timeout: 25000 });

    const tooltip = robot.locator('[class*="tooltip"]');
    report((await tooltip.innerText()).trim() === 'Welcome back, Sarah', `dock memory: tooltip greets by name (${(await tooltip.innerText()).trim()})`);

    // Tooltip reveals on hover (JS-driven, poll past the CSS transition)
    const box = await robot.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    const revealDeadline = Date.now() + 3000;
    let revealed = false;
    while (Date.now() < revealDeadline) {
      const o = await tooltip.evaluate((el) => parseFloat(getComputedStyle(el).opacity)).catch(() => 0);
      if (o > 0.5) { revealed = true; break; }
      await page.waitForTimeout(100);
    }
    report(revealed, 'dock memory: tooltip reveals on hover');
    await page.close();

    // AR variant greets in Arabic by name
    const arPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await arPage.addInitScript(() => {
      localStorage.setItem('xvi-language', 'ar');
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
      localStorage.setItem('xviConciergeSeen', 'true');
      sessionStorage.setItem(
        'xvi-executive-memory',
        JSON.stringify({ name: 'سارة', company: 'بنك ميريديان', industry: 'banking', questions: [], recommendations: [] })
      );
    });
    await arPage.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    const arRobot = arPage.locator('[aria-label="المستشار التنفيذي الذكي"]');
    await arRobot.first().waitFor({ state: 'visible', timeout: 25000 });
    report((await arRobot.locator('[class*="tooltip"]').innerText()).trim() === 'مرحباً بعودتك، سارة', 'dock memory: AR tooltip greets by name');
    await arPage.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
