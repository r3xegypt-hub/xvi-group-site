import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site/';
const results = [];
const report = (ok, name) => { results.push({ ok, name }); console.log(`${ok ? '[PASS]' : '[FAIL]'} ${name}`); };

const launch = async (opts = {}) => {
  const ctx = await chromium.launchPersistentContext('', {
    headless: true,
    viewport: { width: 1280, height: 800 },
    reducedMotion: opts.reducedMotion ? 'reduce' : null,
  });
  const page = ctx.pages()[0] || await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'domcontentloaded' });
  return { ctx, page };
};

// ---- 1. First visit (no storage): cinematic shows ----
{
  const { ctx, page } = await launch();
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'domcontentloaded' });
  const dialog = page.locator('[role="dialog"][aria-label="XVI GROUP cinematic launch"]');
  await dialog.waitFor({ state: 'visible', timeout: 6000 });
  report(true, 'first visit: cinematic launch shown');

  // skip button is focused on mount
  const focused = await page.evaluate(() => document.activeElement?.textContent?.trim() === 'Skip');
  report(focused, 'a11y: skip control receives focus on mount');

  // Escape skips
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  const gone = (await dialog.count()) === 0 || !(await dialog.isVisible().catch(() => false));
  report(gone, 'a11y: Escape dismisses the launch');

  // session gate: after finish, reload goes to light loader (not cinematic)
  const seen = await page.evaluate(() => sessionStorage.getItem('xviIntroSeen'));
  report(seen === 'true', 'session gate: xviIntroSeen persisted after finish');
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);
  const dialog2 = page.locator('[role="dialog"][aria-label="XVI GROUP cinematic launch"]');
  const stillCinematic = (await dialog2.count()) > 0 && await dialog2.isVisible().catch(() => false);
  report(!stillCinematic, 'session gate: same-session reload skips cinematic');
  await ctx.close();
}

// ---- 2. Reduced motion (no storage): static launch, quick finish ----
{
  const { ctx, page } = await launch({ reducedMotion: true });
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.reload({ waitUntil: 'domcontentloaded' });
  const dialog = page.locator('[role="dialog"][aria-label="XVI GROUP cinematic launch"]');
  await dialog.waitFor({ state: 'visible', timeout: 6000 });

  // No animated particles/pulse under reduced motion: count motion.circle-like nodes with animate... simplest: check that the phase never advances to 'hero' sweep is absent. Instead verify fast finish (<4s, vs 10.6s full).
  const t0 = Date.now();
  await page.waitForSelector('[role="dialog"][aria-label="XVI GROUP cinematic launch"]', { state: 'detached', timeout: 6000 }).catch(() => {});
  const elapsed = Date.now() - t0;
  report(elapsed < 4000, `reduced motion: launch auto-finishes quickly (${Math.round(elapsed)}ms)`);

  // site revealed behind
  const mainVisible = await page.locator('#main-content').isVisible().catch(() => false);
  report(mainVisible, 'reduced motion: site revealed after finish');
  await ctx.close();
}

// ---- 3. Full cinematic timeline still intact (no storage, motion allowed) ----
{
  const { ctx, page } = await launch();
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.reload({ waitUntil: 'domcontentloaded' });
  const dialog = page.locator('[role="dialog"][aria-label="XVI GROUP cinematic launch"]');
  await dialog.waitFor({ state: 'visible', timeout: 6000 });
  // mute button present (full experience)
  const mute = page.locator('button[aria-label="Mute"]');
  report((await mute.count()) > 0, 'full launch: mute control present');
  // still showing at ~5s (timeline running, not auto-skipped)
  await page.waitForTimeout(5200);
  const still = await dialog.isVisible().catch(() => false);
  report(still, 'full launch: cinematic runs past 5s');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  report(!(await dialog.isVisible().catch(() => false)), 'full launch: Escape works here too');
  await ctx.close();
}

const failed = results.filter(r => !r.ok);
console.log(`\n=== ${results.length - failed.length}/${results.length} CHECKS PASSED ===`);
process.exit(failed.length ? 1 : 0);
