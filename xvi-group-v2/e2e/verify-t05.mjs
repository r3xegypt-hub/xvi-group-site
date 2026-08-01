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
    localStorage.setItem('xvi-conciergeSeen', 'true');
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await init(page);

  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const homeImgs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('img'))
      .map((e) => e.getAttribute('src') || '')
      .filter((s) => s.startsWith('http'))
  );
  report(homeImgs.length === 0, `Home: no external imgs (got ${JSON.stringify(homeImgs)})`);
  report(await page.locator('div[class*="visualField"]').count() > 0, 'Home: Technology SVG visual field present');
  const techDiamond = await page.locator('svg[class*="visualDiamond"] polygon').count();
  report(techDiamond >= 2, `Home: Technology diamond geometry present (${techDiamond} polygons)`);

  await page.goto(BASE + '/about', { waitUntil: 'domcontentloaded' });
  const aboutImgs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('img'))
      .map((e) => e.getAttribute('src') || '')
      .filter((s) => s.startsWith('http'))
  );
  report(aboutImgs.length === 0, `About: no external imgs (got ${JSON.stringify(aboutImgs)})`);
  const aboutBgImgs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('*')).filter((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg.includes('url(');
    }).length
  );
  report(aboutBgImgs === 0, `About: no background-image url() refs (${aboutBgImgs})`);
  const aboutHscroll = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  report(aboutHscroll <= 0, `About: no horizontal scroll (${aboutHscroll})`);

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
