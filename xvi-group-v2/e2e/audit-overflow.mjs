import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const ROUTES = ['/', '/services', '/industries', '/insights', '/about', '/contact', '/careers', '/technology'];
const VIEWPORTS = [
  { name: 'Mobile 320', w: 320, h: 568 },
  { name: 'Mobile 390', w: 390, h: 844 },
  { name: 'Tablet 820', w: 820, h: 1180 },
  { name: 'Laptop 1440', w: 1440, h: 900 },
];

async function checkPage(page, route, lang, vp) {
  const result = await page.evaluate(() => {
    const vw = window.innerWidth;
    const issues = [];
    const scrollW = document.documentElement.scrollWidth;
    if (scrollW > vw + 1) issues.push(`DOC-HSCROLL ${scrollW} > ${vw}`);

    const textTags = 'a,p,h1,h2,h3,h4,button,li,span,label';
    for (const el of document.querySelectorAll(textTags)) {
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.left > -5 && r.right < vw + 5) continue;
      const text = (el.textContent || '').trim();
      if (!text) continue;
      let anc = el.parentElement, clipped = false;
      while (anc && anc !== document.body) {
        const acs = getComputedStyle(anc);
        if ((acs.overflow === 'hidden' || acs.overflowX === 'hidden') && anc.getBoundingClientRect().width <= vw) { clipped = true; break; }
        anc = anc.parentElement;
      }
      if (!clipped) issues.push(`TEXT <${el.tagName}> "${text.slice(0, 30)}" L=${Math.round(r.left)} R=${Math.round(r.right)}`);
    }
    return issues;
  });
  return result;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  let total = 0;
  for (const lang of ['en', 'ar']) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.addInitScript((l) => {
      localStorage.setItem('xvi-language', l);
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
    }, lang);
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.w, height: vp.h });
      for (const route of ROUTES) {
        await page.goto(BASE + route, { waitUntil: 'networkidle' });
        await page.evaluate(async () => {
          const step = window.innerHeight * 0.8;
          for (let y = 0; y <= document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 20));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(800);
        const issues = await checkPage(page, route, lang, vp);
        for (const i of issues) {
          console.log(`❌ ${route} [${lang} ${vp.name}] ${i}`);
          total++;
        }
      }
    }
    await ctx.close();
  }
  console.log(`\n=== TOTAL ISSUES: ${total} ===`);
  await browser.close();
})();
