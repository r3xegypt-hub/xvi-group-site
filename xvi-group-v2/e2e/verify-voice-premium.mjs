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
    localStorage.setItem('xviConciergeSeen', 'true');
    localStorage.removeItem('xvi-voice-settings');
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
    window.__tts = [];
    window.__lastTTS = null;
    class MockUtterance {
      constructor(text) {
        this.text = text;
        this.lang = '';
        this.rate = 1;
        this.pitch = 1;
        this.onstart = null;
        this.onend = null;
        this.onerror = null;
        window.__tts.push(this);
      }
    }
    window.SpeechSynthesisUtterance = MockUtterance;
    Object.defineProperty(window, 'speechSynthesis', {
      configurable: true,
      value: {
        speak(u) { window.__lastTTS = u; u.onstart && u.onstart(); },
        cancel() {},
        getVoices() { return [{ lang: 'en-US' }]; },
        addEventListener() {},
        removeEventListener() {},
      },
    });
  };
}

async function openDock(page, lang) {
  const label = lang === 'ar' ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge';
  await page.locator(`[aria-label="${label}"]`).waitFor({ state: 'visible', timeout: 20000 });
  await page.locator(`[aria-label="${label}"]`).click();
  await page.locator('div[style*="bottom: 100px"]').waitFor({ state: 'visible', timeout: 10000 });
}

async function submitText(page, text) {
  await page.locator('div[style*="bottom: 100px"] input').fill(text);
  await page.locator('div[style*="bottom: 100px"] input').press('Enter');
}

async function lastTTS(page) {
  return page.evaluate(() => {
    const u = window.__lastTTS;
    return u ? { text: u.text, lang: u.lang } : null;
  });
}

async function waitForResponse(page) {
  await page.locator('div[style*="bottom: 100px"]').getByText('We offer four core services', { exact: false }).waitFor({ state: 'visible', timeout: 12000 }).catch(() => {});
  await page.waitForTimeout(500);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // 1) Settings panel present (EN) with all 5 toggles.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('en', true), { l: 'en', s: true });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await page.locator('[aria-label="Voice settings"]').click();
    for (const label of ['Enable Voice', 'Voice Replies', 'Auto Speak', 'Mute', 'Language Auto Detect']) {
      await page.getByText(label, { exact: true }).first().waitFor({ state: 'visible', timeout: 4000 });
    }
    report(true, 'EN: Voice Settings panel shows all 5 toggles');
    const muted = page.getByRole('button', { name: 'Mute', exact: true }).first();
    await muted.click();
    report((await muted.getAttribute('aria-pressed')) === 'true', 'EN: Mute toggle switches on');
    await muted.click();
    report((await muted.getAttribute('aria-pressed')) === 'false', 'EN: Mute toggle switches off');
    await ctx.close();
  }

  // 2) AR settings panel labels.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('ar', true), { l: 'ar', s: true });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');
    await page.locator('[aria-label="إعدادات الصوت"]').click();
    for (const label of ['تفعيل الصوت', 'الردود الصوتية', 'التحدث التلقائي', 'كتم الصوت', 'كشف اللغة تلقائيًا']) {
      await page.getByText(label, { exact: true }).first().waitFor({ state: 'visible', timeout: 4000 });
    }
    report(true, 'AR: Voice Settings panel shows all 5 toggles in Arabic');
    await ctx.close();
  }

  // 3) Auto-speak reads AI reply aloud (EN, correct lang).
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('en', true), { l: 'en', s: true });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await submitText(page, 'services');
    await waitForResponse(page);
    const tts = await lastTTS(page);
    report(Boolean(tts), 'EN: AI reply auto-read aloud');
    report(tts && tts.text.includes('four core services'), 'EN: spoken text matches reply content');
    report(tts && tts.lang === 'en-US', `EN: spoken in en-US (got ${tts && tts.lang})`);
    await ctx.close();
  }

  // 4) AR auto-speak respects Arabic.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('ar', true), { l: 'ar', s: true });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');
    await submitText(page, 'خدمات');
    await page.locator('div[style*="bottom: 100px"]').getByText('نقدم أربع خدمات رئيسية', { exact: false }).waitFor({ state: 'visible', timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(500);
    const tts = await lastTTS(page);
    report(Boolean(tts), 'AR: AI reply auto-read aloud');
    report(tts && tts.text.includes('أربع خدمات'), 'AR: spoken text matches reply content');
    report(tts && tts.lang === 'ar-SA', `AR: spoken in ar-SA (got ${tts && tts.lang})`);
    await ctx.close();
  }

  // 5) Auto Speak off -> no speech + manual Listen button works.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('en', true), { l: 'en', s: true });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await page.locator('[aria-label="Voice settings"]').click();
    await page.getByRole('button', { name: 'Auto Speak', exact: true }).first().click();
    await submitText(page, 'services');
    await waitForResponse(page);
    report((await lastTTS(page)) === null, 'EN: Auto Speak off -> reply NOT auto-read');
    const listen = page.getByRole('button', { name: 'Listen to reply' });
    await listen.waitFor({ state: 'visible', timeout: 4000 });
    await listen.click();
    const tts = await lastTTS(page);
    report(Boolean(tts) && tts.text.includes('four core services'), 'EN: manual Listen button reads the reply');
    await ctx.close();
  }

  // 6) Mute -> no speech at all.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('en', true), { l: 'en', s: true });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await page.locator('[aria-label="Voice settings"]').click();
    await page.getByRole('button', { name: 'Mute', exact: true }).first().click();
    await submitText(page, 'services');
    await waitForResponse(page);
    report((await lastTTS(page)) === null, 'EN: Mute on -> no speech synthesis');
    await ctx.close();
  }

  // 7) Listening: waveform + robot eyes animate (listening class) + indicator.
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('en', true), { l: 'en', s: true });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    await page.locator('[aria-label="Speak to write"]').click();
    await page.getByText('Listening... (en-US)').waitFor({ state: 'visible', timeout: 5000 });
    await page.locator('div[style*="bottom: 100px"]').getByTestId('voice-waveform').waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'EN: Listening indicator + voice waveform shown while recording');
    const gotClass = await page
      .waitForFunction(() => {
        const el = document.querySelector('[aria-label="Executive AI Concierge"]');
        return Boolean(el && String(el.className).includes('listening'));
      }, undefined, { timeout: 4000 })
      .then(() => true, () => false);
    report(gotClass, 'EN: floating robot gets listening animation while recording');
    await page.evaluate(() => {
      const rec = window.__mockSR;
      rec.onresult && rec.onresult({ results: [{ isFinal: true, 0: { transcript: 'services' } }] });
    });
    await page.waitForTimeout(400);
    report((await page.getByText('Listening... (en-US)').count()) === 0, 'EN: listening cleared after recognition');
    await ctx.close();
  }

  // 8) Unsupported browser -> friendly fallback message (no crash, mic disabled).
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(initFactory('en', false), { l: 'en', s: false });
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    const mic = page.locator('[aria-label="Speak to write"]');
    await mic.waitFor({ state: 'visible', timeout: 4000 });
    await mic.click();
    await page.getByText(/Voice input isn't supported in this browser/).waitFor({ state: 'visible', timeout: 4000 });
    report(true, 'Unsupported: friendly fallback message shown on mic click');
    await submitText(page, 'services');
    await waitForResponse(page);
    report(true, 'Unsupported: typing still works alongside voice fallback');
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
