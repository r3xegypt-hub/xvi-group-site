import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const failures = [];

async function run(browser, lang) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => document.documentElement.scrollHeight > 2000, { timeout: 20000 });
  await page.waitForFunction(() => {
    const header = document.querySelector('header');
    if (!header) return false;
    const cs = getComputedStyle(header);
    return cs.opacity === '1' && Math.round(header.getBoundingClientRect().top) === 20;
  }, { timeout: 8000 });
  await page.waitForTimeout(200);

  const before = await page.evaluate(() => {
    const header = document.querySelector('header');
    const wrapper = header?.parentElement;
    const cs = wrapper ? getComputedStyle(wrapper) : null;
    return {
      wrapperTransform: cs?.transform,
      wrapperFilter: cs?.filter,
      wrapperWillChange: cs?.willChange,
      headerTop: header ? Math.round(header.getBoundingClientRect().top) : null,
    };
  });

  await page.evaluate(() => document.scrollingElement.scrollTo({ top: 800, behavior: 'instant' }));
  await page.waitForFunction(() => document.scrollingElement.scrollTop >= 500, { timeout: 5000 });
  await page.waitForFunction(() => {
    const header = document.querySelector('header');
    return header && Math.round(header.getBoundingClientRect().top) === 12;
  }, { timeout: 5000 });
  const after = await page.evaluate(() => {
    const header = document.querySelector('header');
    return { headerTop: header ? Math.round(header.getBoundingClientRect().top) : null };
  });

  const ok = after.headerTop === 12 && before.headerTop === 20;
  if (!ok) failures.push(lang);
  console.log(`[${ok ? 'ok' : 'FAIL'}] sticky-header ${lang}: wrapper(transform=${before.wrapperTransform} filter=${before.wrapperFilter} willChange=${before.wrapperWillChange}) headerTop@0=${before.headerTop} headerTop@scroll800=${after.headerTop}`);
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  await run(browser, 'en');
  await run(browser, 'ar');
  await browser.close();
  if (failures.length) {
    console.log(`=== ${failures.length} FAILURES: ${failures.join(', ')} ===`);
    process.exit(1);
  }
  console.log('=== STICKY HEADER OK (en + ar) ===');
})();
