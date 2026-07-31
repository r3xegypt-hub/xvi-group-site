import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const CLICK = { force: true, timeout: 8000 };

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => { localStorage.setItem('xviIntroDone', 'true'); });

  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  console.log('=== FALLBACK TEST: AI Dock unavailable ===');

  // Access the useCTA module in dev mode and signal the dock is unavailable
  const signalResult = await page.evaluate(async () => {
    for (const path of ['/xvi-group-site/src/hooks/useCTA.ts', '/src/hooks/useCTA.ts']) {
      try {
        const mod = await import(path);
        if (typeof mod.signalAIDockAvailable === 'function') {
          mod.signalAIDockAvailable(false);
          return { ok: true, path };
        }
      } catch { /* try next */ }
    }
    return { ok: false };
  });

  if (!signalResult.ok) {
    console.log(`⚠️ Could not access module directly (${signalResult.err}) — will simulate by hiding dock instead`);
    // Fallback: simulate by hiding the dock AND clicking (event will have no listener to open it,
    // but aiDockAvailable is still true so it will just re-dispatch. Not a real test.)
  } else {
    console.log('✅ Set aiDockAvailable = false via module import');
  }

  // Wait a tick for state to propagate
  await page.waitForTimeout(500);

  // Click "Talk to AI" — should redirect to /contact since dock is unavailable
  const talkAI = page.locator('button').filter({ hasText: 'Talk to AI' }).first();
  if (await talkAI.isVisible()) {
    const urlBefore = page.url();
    await talkAI.click(CLICK);
    await page.waitForTimeout(2000);
    const urlAfter = page.url();
    if (urlAfter.includes('/contact')) {
      console.log('✅ Fallback works: "Talk to AI" redirected to /contact when dock unavailable');
      console.log(`   ${urlBefore} → ${urlAfter}`);
    } else {
      console.log(`❌ Fallback FAILED: ${urlBefore} → ${urlAfter}`);
    }
  } else {
    console.log('❌ "Talk to AI" not found');
  }

  await browser.close();
})();
