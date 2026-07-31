import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

async function run(browser, lang, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1600);

  const data = await page.evaluate(() => {
    const out = { vw: window.innerWidth, scrollW: document.documentElement.scrollWidth };
    const logo = document.querySelector('[class*="logo"]');
    out.logoHref = logo ? logo.getAttribute('href') : null;
    const links = document.querySelector('[class*="links"]');
    if (links) {
      out.anchors = Array.from(links.querySelectorAll('a')).map((a) => ({
        text: a.textContent.trim(),
        href: a.getAttribute('href'),
        w: Math.round(a.getBoundingClientRect().width),
        left: Math.round(a.getBoundingClientRect().left),
        right: Math.round(a.getBoundingClientRect().right),
      }));
      const r = links.getBoundingClientRect();
      out.linksRect = { left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) };
    }
    const nav = document.querySelector('nav');
    if (nav) {
      const r = nav.getBoundingClientRect();
      out.navRect = { left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) };
    }
    const overflowing = [];
    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1)) {
        const cls = typeof el.className === 'string' ? el.className : '';
        overflowing.push({ tag: el.tagName, cls: cls.slice(0, 60), left: Math.round(r.left), right: Math.round(r.right) });
      }
    });
    out.overflowing = overflowing.slice(0, 8);
    return out;
  });
  console.log(`--- ${lang} ${vp} ---`);
  console.log(JSON.stringify(data, null, 1));
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  await run(browser, 'en', 820);
  await run(browser, 'en', 768);
  await browser.close();
})();
