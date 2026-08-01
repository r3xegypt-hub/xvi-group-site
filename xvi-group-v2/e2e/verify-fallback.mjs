import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const CLICK = { force: true, timeout: 8000 };

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xvi-language', 'en');
    localStorage.setItem('xviConciergeSeen', 'true');
  });

  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  console.log('=== FALLBACK TEST: AI Dock unavailable ===');

  // Signal the dock is unavailable through the DEV-only window hook
  // (Vite appends an HMR query to module URLs, so a dynamic import from the
  // test would be a separate module instance and could not affect the app).
  const signalResult = await page.evaluate(async () => {
    await new Promise((r) => setTimeout(r, 800));
    const setter = window.__xviSetAIDockAvailable;
    if (typeof setter === 'function') {
      setter(false);
      return { ok: true };
    }
    return { ok: false };
  });

  if (!signalResult.ok) {
    console.log('⚠️ Could not access __xviSetAIDockAvailable — fallback cannot be simulated');
  } else {
    console.log('✅ Set aiDockAvailable = false via window hook');
  }

  // Wait a tick for state to propagate
  await page.waitForTimeout(500);

  // Click "Talk to the Executive AI" (hero AI CTA) — should redirect to /contact since dock is unavailable
  const aiCta = page.locator('button').filter({ hasText: 'Talk to the Executive AI' }).first();
  if (await aiCta.isVisible()) {
    const urlBefore = page.url();
    await aiCta.click(CLICK);
    await page.waitForTimeout(2000);
    const urlAfter = page.url();
    if (urlAfter.includes('/contact')) {
      console.log('✅ Fallback works: AI CTA redirected to /contact when dock unavailable');
      console.log(`   ${urlBefore} → ${urlAfter}`);
    } else {
      console.log(`❌ Fallback FAILED: ${urlBefore} → ${urlAfter}`);
    }
  } else {
    console.log('❌ "Talk to the Executive AI" not found');
  }

  await browser.close();
})();
