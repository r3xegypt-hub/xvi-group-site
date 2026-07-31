import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const VPS = [
  { w: 320, h: 568 },
  { w: 390, h: 844 },
];

async function checkMenu(browser, w, h, lang) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);

  await page.locator('button[aria-label="Open menu"]').click({ force: true });
  await page.waitForTimeout(900);

  const data = await page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const menu = document.querySelector('[class*="mobileMenu"]');
    if (!menu) return { vw, vh, found: false };
    const r = menu.getBoundingClientRect();
    const inner = menu.querySelector('[class*="mobileMenuInner"]');
    const links = Array.from(menu.querySelectorAll('a'));
    const visibleLinks = links.filter((a) => {
      const rr = a.getBoundingClientRect();
      return rr.width > 0 && rr.height > 0 && rr.bottom > 0 && rr.top < vh && rr.right > 0 && rr.left < vw;
    });
    return {
      vw, vh, found: true,
      menu: { left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), bottom: Math.round(r.bottom) },
      inner: inner ? { scrollH: inner.scrollHeight, clientH: inner.clientHeight, scrollTop: inner.scrollTop } : null,
      totalLinks: links.length,
      visibleLinks: visibleLinks.length,
    };
  });

  // scroll inner to bottom and check last link reachable
  const last = await page.evaluate(() => {
    const inner = document.querySelector('[class*="mobileMenuInner"]');
    const links = Array.from(document.querySelector('[class*="mobileMenu"]').querySelectorAll('a'));
    inner.scrollTop = inner.scrollHeight;
    const lastLink = links[links.length - 1].getBoundingClientRect();
    const firstLink = links[0].getBoundingClientRect();
    return {
      scrollTop: inner.scrollTop,
      scrollH: inner.scrollHeight,
      clientH: inner.clientHeight,
      lastVisible: lastLink.top < window.innerHeight && lastLink.bottom > 0,
      firstAfterBottom: firstLink.bottom >= -1 && firstLink.top <= window.innerHeight + 1,
    };
  });

  console.log(`  [${last.lastVisible && last.firstAfterBottom ? 'ok' : 'FAIL'}] mobileMenu ${lang} ${w}x${h} -> menu=${JSON.stringify(data.menu)} links=${data.visibleLinks}/${data.totalLinks} inner(scroll=${last.scrollH}/${last.clientH} top=${Math.round(last.scrollTop)}) firstReachable=${last.firstAfterBottom} lastReachable=${last.lastVisible}`);
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  console.log('=== MOBILE MENU ===');
  for (const lang of ['en', 'ar']) {
    for (const vp of VPS) {
      await checkMenu(browser, vp.w, vp.h, lang);
    }
  }
  await browser.close();
})();
