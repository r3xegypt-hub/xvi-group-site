import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

async function init(page) {
  await page.addInitScript(() => {
    localStorage.setItem('xvi-language', 'en');
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
  });
}

async function voice(page, speaking, listening) {
  await page.evaluate(({ speaking, listening }) => {
    window.dispatchEvent(new CustomEvent('xvi:voice-state', { detail: { listening, speaking } }));
  }, { speaking, listening });
}

async function settleOpacity(page, locator, targetAboveHalf) {
  const deadline = Date.now() + 2500;
  let last = '';
  while (Date.now() < deadline) {
    last = await locator.evaluate((el) => getComputedStyle(el).opacity);
    const ok = parseFloat(last) > 0.5;
    if (ok === targetAboveHalf) return last;
    await page.waitForTimeout(150);
  }
  return last;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));
  await init(page);

  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });

  const scene = page.locator('div[class*="scene"]:has([class*="holoBase"])');
  report(await scene.count() === 1, 'hero robot scene present');
  report(await scene.locator('[class*="holoBase"]').count() === 1, 'hologram base present');
  report(await scene.locator('svg[class*="head"]').count() === 1, 'robot face present');
  report(await scene.locator('[class*="holoScan"]').count() === 1, 'hologram scanline present');
  report(await scene.locator('[class*="holoParticles"] span').count() >= 4, 'hologram particles present');
  report(await scene.locator('[class*="mouthBars"] rect').count() === 4, 'speaking mouth bars present');
  report(await scene.locator('[class*="antennaTip"]').count() === 1, 'antenna present');
  report(await scene.locator('[class*="brows"]').count() === 1, 'brows present');

  report((await scene.getAttribute('data-state')) === 'idle', 'default state = idle');
  const smileOpacity = await scene.locator('[class*="mouthIdle"]').evaluate((el) => getComputedStyle(el).opacity);
  const barsOpacityIdle = await scene.locator('[class*="mouthBars"]').evaluate((el) => getComputedStyle(el).opacity);
  report(parseFloat(smileOpacity) > 0.5 && parseFloat(barsOpacityIdle) < 0.5, 'idle: smile shown, bars hidden');

  await voice(page, true, false);
  await page.waitForTimeout(400);
  report((await scene.getAttribute('data-state')) === 'speaking', 'speaking: data-state updated');
  const barsOpacity = await settleOpacity(page, scene.locator('[class*="mouthBars"]'), true);
  const smileSpeaking = await settleOpacity(page, scene.locator('[class*="mouthIdle"]'), false);
  report(parseFloat(barsOpacity) > 0.5 && parseFloat(smileSpeaking) < 0.5, `speaking: mouth bars shown, smile hidden (${barsOpacity}/${smileSpeaking})`);

  await voice(page, false, true);
  await page.waitForTimeout(400);
  report((await scene.getAttribute('data-state')) === 'listening', 'listening: data-state updated');
  const deadline = Date.now() + 2500;
  let earFill = '';
  while (Date.now() < deadline) {
    earFill = await scene.locator('[class*="ear"]').first().evaluate((el) => getComputedStyle(el).fill);
    if (earFill === 'rgb(227, 194, 122)') break;
    await page.waitForTimeout(150);
  }
  report(earFill === 'rgb(227, 194, 122)', `listening: ears glow gold (${earFill})`);

  await voice(page, false, false);
  await page.waitForTimeout(500);
  report((await scene.getAttribute('data-state')) === 'idle', 'returns to idle');

  const eyeAnim = await scene.locator('[class*="eyes"]').evaluate((el) => getComputedStyle(el).animationName);
  report(eyeAnim !== 'none' && eyeAnim.length > 0, `eyes animated in normal mode (${eyeAnim})`);

  report(errors.length === 0, `zero console errors (got ${errors.length})`);

  // Reduced motion
  const rPage = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const rErrors = [];
  rPage.on('console', (m) => { if (m.type() === 'error') rErrors.push(m.text()); });
  rPage.on('pageerror', (e) => rErrors.push(String(e)));
  await init(rPage);
  await rPage.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const rScene = rPage.locator('div[class*="scene"]:has([class*="holoBase"])');
  report(await rScene.count() === 1, 'reduced motion: robot present');
  const rEyeAnim = await rScene.locator('[class*="eyes"]').evaluate((el) => getComputedStyle(el).animationName);
  report(rEyeAnim === 'none', `reduced motion: eye animation disabled (${rEyeAnim})`);
  const rBarAnim = await rScene.locator('[class*="mouthBars"] rect').first().evaluate((el) => getComputedStyle(el).animationName);
  report(rBarAnim === 'none', `reduced motion: mouth bar animation disabled (${rBarAnim})`);
  await voice(rPage, true, false);
  await rPage.waitForTimeout(400);
  report((await rScene.getAttribute('data-state')) === 'speaking', 'reduced motion: state still switches');
  report(rErrors.length === 0, `reduced motion: zero errors (got ${rErrors.length})`);
  await rPage.close();

  // Mobile
  const mPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const mErrors = [];
  mPage.on('console', (m) => { if (m.type() === 'error') mErrors.push(m.text()); });
  mPage.on('pageerror', (e) => mErrors.push(String(e)));
  await init(mPage);
  await mPage.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const mScene = mPage.locator('div[class*="scene"]:has([class*="holoBase"])');
  report(await mScene.count() === 1, 'mobile: robot present');
  report(await mScene.locator('svg[class*="head"]').count() === 1, 'mobile: face present');
  const mOverflow = await mPage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  report(mOverflow <= 0, `mobile: no horizontal scroll (${mOverflow})`);
  report(mErrors.length === 0, `mobile: zero errors (got ${mErrors.length})`);
  await mPage.close();

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
