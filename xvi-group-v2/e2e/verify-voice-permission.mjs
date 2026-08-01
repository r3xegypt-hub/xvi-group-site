import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) No recognition instance / listening before the user presses the mic (EN)
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      localStorage.setItem('xvi-language', 'en');
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
      localStorage.setItem('xviConciergeSeen', 'true');
      window.__mockSR = null;
      class MockSR {
        constructor() {
          this.lang = '';
          this.continuous = false;
          this.interimResults = false;
          this.onstart = null;
          this.onend = null;
          this.onresult = null;
          this.onerror = null;
          window.__mockSR = this;
        }
        start() { this.onstart && this.onstart(); }
        stop() { this.onend && this.onend(); }
        abort() { this.onend && this.onend(); }
      }
      window.SpeechRecognition = MockSR;
      window.webkitSpeechRecognition = MockSR;
    });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

    const robot = page.locator('[aria-label="Executive AI Concierge"]');
    await robot.waitFor({ state: 'visible', timeout: 20000 });
    await robot.click();
    await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(600);

    const before = await page.evaluate(() => window.__mockSR);
    report(before === null, 'EN: no recognition instance created before mic press');

    const listeningBefore = await page.getByText('Listening... (en-US)').count();
    report(listeningBefore === 0, 'EN: no listening indicator before mic press');

    const mic = page.locator('[aria-label="Speak to write"]');
    await mic.click();
    await page.getByText('Listening... (en-US)').waitFor({ state: 'visible', timeout: 5000 });
    const after = await page.evaluate(() => window.__mockSR);
    report(after !== null, 'EN: recognition instance created only after mic press');
    await ctx.close();
  }

  // 2) Same guarantee in Arabic after a navigation, still not auto-listening.
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 812 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      localStorage.setItem('xvi-language', 'ar');
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
      localStorage.setItem('xviConciergeSeen', 'true');
      window.__mockSR = null;
      class MockSR {
        constructor() {
          this.lang = '';
          this.continuous = false;
          this.interimResults = false;
          this.onstart = null;
          this.onend = null;
          this.onresult = null;
          this.onerror = null;
          window.__mockSR = this;
        }
        start() { this.onstart && this.onstart(); }
        stop() { this.onend && this.onend(); }
        abort() { this.onend && this.onend(); }
      }
      window.SpeechRecognition = MockSR;
      window.webkitSpeechRecognition = MockSR;
    });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

    // Navigate to services then back — recognition must still not auto-start.
    await page.locator('a').filter({ hasText: 'Solutions' }).first().click().catch(() => {});
    await page.waitForTimeout(1500);
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

    const robot = page.locator('[aria-label="المستشار التنفيذي الذكي"]');
    await robot.waitFor({ state: 'visible', timeout: 20000 });
    await robot.click();
    await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(600);

    const sr = await page.evaluate(() => window.__mockSR);
    report(sr === null, 'AR mobile: still no recognition activity before mic press');

    const listeningAr = await page.getByText('الاستماع... (ar-SA)').count();
    report(listeningAr === 0, 'AR mobile: no listening indicator before mic press');
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
