import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

function initFactory(lang, mockSpeech) {
  return (opts) => {
    const { l, s } = opts;
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xvi-conciergeSeen', 'true');
    if (s) {
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
    } else {
      Object.defineProperty(window, 'SpeechRecognition', { value: undefined, configurable: true });
      Object.defineProperty(window, 'webkitSpeechRecognition', { value: undefined, configurable: true });
    }
  };
}

async function openDock(page, lang) {
  const label = lang === 'ar' ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge';
  await page.locator(`[aria-label="${label}"]`).waitFor({ state: 'visible', timeout: 20000 });
  await page.locator(`[aria-label="${label}"]`).click();
  await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 10000 });
}

async function emitTranscript(page, text) {
  await page.evaluate((t) => {
    const rec = window.__mockSR;
    rec.onresult && rec.onresult({ results: [{ isFinal: true, 0: { transcript: t } }] });
  }, text);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) EN voice flow: click mic -> listening -> correct lang -> transcript submits exactly as typed.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('en', true), { l: 'en', s: true });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');

    const mic = page.locator('[aria-label="Speak to write"]');
    report(await mic.isVisible(), 'EN: mic button rendered in the dock');
    await mic.click();

    await page.getByText('Listening... (en-US)').waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'EN: "Listening... (en-US)" indicator shown while recording');

    const lang = await page.evaluate(() => window.__mockSR.lang);
    report(lang === 'en-US', `EN: recognition language auto-detected as "en-US" (got "${lang}")`);

    await emitTranscript(page, 'services');
    await page.getByText('We offer four core services').waitFor({ state: 'visible', timeout: 10000 });
    report(true, 'EN: spoken text inserted + submitted as if typed (AI response shown)');

    await page.waitForTimeout(500);
    report((await page.getByText('Listening... (en-US)').count()) === 0, 'EN: listening indicator cleared after result');
    report((await page.locator('div[style*="bottom: 100px"] input[placeholder="ask me anything..."]').inputValue()) === '', 'EN: input cleared after submission');
    await ctx.close();
  }

  // 2) AR voice flow: same pipeline with Arabic.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('ar', true), { l: 'ar', s: true });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');

    const mic = page.locator('[aria-label="تحدث للكتابة"]');
    report(await mic.isVisible(), 'AR: mic button rendered with Arabic label');
    await mic.click();

    await page.getByText('الاستماع... (ar-SA)').waitFor({ state: 'visible', timeout: 5000 });
    report(true, 'AR: "الاستماع... (ar-SA)" indicator shown while recording');

    const lang = await page.evaluate(() => window.__mockSR.lang);
    report(lang === 'ar-SA', `AR: recognition language auto-detected as "ar-SA" (got "${lang}")`);

    await emitTranscript(page, 'خدمات');
    await page.getByText('نقدم أربع خدمات رئيسية').waitFor({ state: 'visible', timeout: 10000 });
    report(true, 'AR: spoken Arabic text inserted + submitted (AI response shown)');

    await page.waitForTimeout(500);
    report((await page.getByText('الاستماع... (ar-SA)').count()) === 0, 'AR: listening indicator cleared after result');
    await ctx.close();
  }

  // 3) Clicking mic while listening stops recognition.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('en', true), { l: 'en', s: true });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');

    const mic = page.locator('[aria-label="Speak to write"]');
    await mic.click();
    await page.getByText('Listening... (en-US)').waitFor({ state: 'visible', timeout: 5000 });
    await mic.click();
    await page.waitForTimeout(400);
    report((await page.getByText('Listening... (en-US)').count()) === 0, 'EN: clicking mic again stops listening');
    await ctx.close();
  }

  // 4) Unsupported browser: mic shown but disabled, friendly notice on click, typing still works.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('en', false), { l: 'en', s: false });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');

    const mic = page.locator('[aria-label="Speak to write"]');
    report((await mic.count()) === 1, 'Unsupported: mic button still rendered');
    await mic.click();
    await page.getByText(/Voice input isn't supported in this browser/).waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'Unsupported: friendly fallback notice shown on mic click');
    report((await page.getByText('Listening... (en-US)').count()) === 0, 'Unsupported: no listening state entered');

    const input = page.locator('div[style*="bottom: 100px"] input[placeholder="ask me anything..."]');
    await input.fill('services');
    await input.press('Enter');
    await page.getByText('We offer four core services').waitFor({ state: 'visible', timeout: 10000 });
    report(true, 'Unsupported: manual typing still works');
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
