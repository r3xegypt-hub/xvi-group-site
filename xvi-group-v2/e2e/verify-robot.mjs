import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

const coreSel = '[data-testid="executive-ai-core"]';

async function init(page) {
  await page.addInitScript(() => {
    localStorage.setItem('xvi-language', 'en');
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // ============ NORMAL MODE ============
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await init(page);

  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  const core = page.locator(coreSel);
  await core.first().waitFor({ state: 'attached', timeout: 20000 }).catch(() => {});
  report(await core.count() === 1, 'hero AI core present');
  report(await core.locator('[data-part="sphere"]').count() === 1, 'glass sphere present');
  report(await core.locator('[data-part="neural"]').count() === 1, 'neural network present');
  report(await core.locator('[data-part="neural"] line').count() >= 8, `golden connections present (${await core.locator('[data-part="neural"] line').count()})`);
  report(await core.locator('[data-part="neural"] circle').count() >= 10, `neural particles present (${await core.locator('[data-part="neural"] circle').count()})`);
  report(await core.locator('[data-part="nucleus"]').count() === 1, 'golden nucleus present');
  report(await core.locator('[data-part="glow"]').count() === 1, 'ambient glow present');

  const animOf = (sel) => core.locator(sel).first().evaluate((el) => getComputedStyle(el).animationName).catch(() => 'none');
  const sphereAnim = await animOf('[data-part="sphere"]');
  report(sphereAnim !== 'none' && sphereAnim.length > 0, `glass sphere animated in normal mode (${sphereAnim})`);
  const glowAnim = await animOf('[data-part="glow"]');
  report(glowAnim !== 'none' && glowAnim.length > 0, `ambient glow animated in normal mode (${glowAnim})`);
  const orbitAnim = await animOf('[class*="orbitRing"]');
  report(orbitAnim !== 'none' && orbitAnim.length > 0, `orbit ring animated in normal mode (${orbitAnim})`);
  const particleAnim = await core.locator('[class*="particles"] span').first().evaluate((el) => getComputedStyle(el).animationName).catch(() => 'none');
  report(particleAnim !== 'none' && particleAnim.length > 0, `neural dust animated in normal mode (${particleAnim})`);
  const nodeAnim = await core.locator('[data-part="neural"] circle').first().evaluate((el) => getComputedStyle(el).animationName).catch(() => 'none');
  report(nodeAnim !== 'none' && nodeAnim.length > 0, `neural nodes animated in normal mode (${nodeAnim})`);

  report(errors.length === 0, `zero console errors (got ${errors.length})`);
  await page.close();

  // ============ REDUCED MOTION ============
  const rPage = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const rErrors = [];
  rPage.on('console', (m) => { if (m.type() === 'error') rErrors.push(m.text()); });
  rPage.on('pageerror', (e) => rErrors.push(String(e)));
  await init(rPage);
  await rPage.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const rCore = rPage.locator(coreSel);
  await rCore.first().waitFor({ state: 'attached', timeout: 20000 }).catch(() => {});
  report(await rCore.count() === 1, 'reduced motion: AI core present');
  const rSphere = await rCore.locator('[data-part="sphere"]').first().evaluate((el) => getComputedStyle(el).animationName).catch(() => '');
  report(rSphere === 'none', `reduced motion: glass sphere animation disabled (${rSphere})`);
  const rGlow = await rCore.locator('[data-part="glow"]').first().evaluate((el) => getComputedStyle(el).animationName).catch(() => '');
  report(rGlow === 'none', `reduced motion: ambient glow animation disabled (${rGlow})`);
  const rOrbit = await rCore.locator('[class*="orbitRing"]').first().evaluate((el) => getComputedStyle(el).animationName).catch(() => '');
  report(rOrbit === 'none', `reduced motion: orbit ring animation disabled (${rOrbit})`);
  const rNode = await rCore.locator('[data-part="neural"] circle').first().evaluate((el) => getComputedStyle(el).animationName).catch(() => '');
  report(rNode === 'none', `reduced motion: neural node animation disabled (${rNode})`);
  const rParticle = await rCore.locator('[class*="particles"] span').first().evaluate((el) => getComputedStyle(el).animationName).catch(() => '');
  report(rParticle === 'none', `reduced motion: neural dust animation disabled (${rParticle})`);
  report(rErrors.length === 0, `reduced motion: zero errors (got ${rErrors.length})`);
  await rPage.close();

  // ============ MOBILE ============
  const mPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const mErrors = [];
  mPage.on('console', (m) => { if (m.type() === 'error') mErrors.push(m.text()); });
  mPage.on('pageerror', (e) => mErrors.push(String(e)));
  await init(mPage);
  await mPage.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const mCore = mPage.locator(coreSel);
  await mCore.first().waitFor({ state: 'attached', timeout: 20000 }).catch(() => {});
  report(await mCore.count() === 1, 'mobile: AI core present');
  report(await mCore.locator('[data-part="sphere"]').count() === 1, 'mobile: glass sphere present');
  report(await mCore.locator('[data-part="neural"]').count() === 1, 'mobile: neural network present');
  const mOverflow = await mPage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  report(mOverflow <= 0, `mobile: no horizontal scroll (${mOverflow})`);
  report(mErrors.length === 0, `mobile: zero errors (got ${mErrors.length})`);
  await mPage.close();

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
