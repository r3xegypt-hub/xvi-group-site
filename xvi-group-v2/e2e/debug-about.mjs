import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 320, height: 568 } });
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, 'en');
  await page.goto(BASE + '/about', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 20));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);

  const data = await page.evaluate(() => {
    const spans = [...document.querySelectorAll('span')].filter(s => /^0\d$/.test((s.textContent || '').trim()));
    const out = [];
    for (const s of spans) {
      const chain = [];
      let el = s;
      while (el && chain.length < 6) {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        chain.push({
          tag: el.tagName,
          cls: (el.className || '').toString().slice(0, 50),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          pos: cs.position,
          transform: cs.transform !== 'none' ? 'T' : '',
          mx: cs.marginLeft,
          mr: cs.marginRight,
          padL: cs.paddingLeft,
          padR: cs.paddingRight,
        });
        el = el.parentElement;
      }
      out.push({ text: s.textContent.trim(), chain });
    }
    return out;
  });
  for (const d of data) {
    console.log(`\nSpan "${d.text}":`);
    for (const c of d.chain) {
      console.log(`  <${c.tag}> ${c.cls} L=${c.left} R=${c.right} W=${c.width} pos=${c.pos} ${c.transform} ml=${c.mx} mr=${c.mr} pl=${c.padL} pr=${c.padR}`);
    }
  }
  await browser.close();
})();
