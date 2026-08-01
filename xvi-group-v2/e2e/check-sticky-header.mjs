import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

async function run(browser, lang) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
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

  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);
  const after = await page.evaluate(() => {
    const header = document.querySelector('header');
    return { headerTop: header ? Math.round(header.getBoundingClientRect().top) : null };
  });

  const ok = after.headerTop === 12 && before.headerTop === 20;
  console.log(`[${ok ? 'ok' : 'FAIL'}] sticky-header ${lang}: wrapper(transform=${before.wrapperTransform} filter=${before.wrapperFilter} willChange=${before.wrapperWillChange}) headerTop@0=${before.headerTop} headerTop@scroll800=${after.headerTop}`);
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  await run(browser, 'en');
  await run(browser, 'ar');
  await browser.close();
})();
