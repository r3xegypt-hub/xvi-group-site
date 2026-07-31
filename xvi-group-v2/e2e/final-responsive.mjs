import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const PAGES = [
  { route: '/', label: 'home' },
  { route: '/services', label: 'services' },
  { route: '/about', label: 'about' },
  { route: '/technology', label: 'technology' },
  { route: '/industries', label: 'industries' },
  { route: '/insights', label: 'insights' },
  { route: '/contact', label: 'contact' },
  { route: '/careers', label: 'careers' },
  { route: '/privacy', label: 'privacy' },
  { route: '/terms', label: 'terms' },
];
const VPS = [
  { w: 320, h: 568, label: '320' },
  { w: 390, h: 844, label: '390' },
  { w: 820, h: 1180, label: '820' },
  { w: 1440, h: 900, label: '1440' },
];

async function checkPage(page, lang, vp, label) {
  const result = await page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const doc = document.documentElement;
    const out = {
      vw,
      vh,
      scrollW: doc.scrollWidth,
      hScroll: doc.scrollWidth > vw + 1,
      footer: null,
      nav: null,
      dockBar: null,
    };
    const rectOf = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), bottom: Math.round(r.bottom), w: Math.round(r.width) };
    };
    const footer = document.querySelector('footer');
    if (footer) {
      const r = footer.getBoundingClientRect();
      out.footer = { left: Math.round(r.left), right: Math.round(r.right), bottom: Math.round(r.bottom) };
    }
    const nav = document.querySelector('header');
    if (nav) {
      const r = nav.getBoundingClientRect();
      out.nav = { left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) };
    }
    const bar = document.querySelector('div[style*="bottom: 24px"]');
    if (bar) out.dockBar = rectOf(bar);
    return out;
  });

  const issues = [];
  if (result.hScroll) issues.push(`H-SCROLL scrollW=${result.scrollW} > vw=${result.vw}`);
  if (result.footer) {
    if (result.footer.left < -1 || result.footer.right > result.vw + 1) issues.push(`footer horizontal overflow (${result.footer.left}..${result.footer.right})`);
  }
  if (result.nav) {
    if (result.nav.left < -1 || result.nav.right > result.vw + 1) issues.push(`nav overflow (${result.nav.left}..${result.nav.right} w=${result.nav.w})`);
  }
  if (result.dockBar) {
    if (result.dockBar.left < -1 || result.dockBar.right > result.vw + 1) issues.push(`dockBar overflow (${result.dockBar.left}..${result.dockBar.right})`);
  }
  const status = issues.length ? 'FAIL' : 'ok';
  console.log(`  [${status}] ${label} ${lang} ${vp.w}x${vp.h}${issues.length ? ' -> ' + issues.join('; ') : ''}`);
  return issues;
}

async function run(browser, lang) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);

  for (const vp of VPS) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    for (const pg of PAGES) {
      await page.goto(BASE + pg.route, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(700);
      // slow scroll to trigger all whileInView reveals, then settle
      const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
      for (let y = 0; y < maxScroll; y += 300) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(60);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(700);
      await checkPage(page, lang, vp, pg.label);
    }
  }
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  let total = 0;
  const origLog = console.log;
  console.log = (...args) => { if (typeof args[0] === 'string' && args[0].startsWith('  [')) total += 1; origLog(...args); };
  console.log('=== ENGLISH ===');
  await run(browser, 'en');
  console.log('=== ARABIC ===');
  await run(browser, 'ar');
  console.log('=== DONE ===');
  await browser.close();
})();
