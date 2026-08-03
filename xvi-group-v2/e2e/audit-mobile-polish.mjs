import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const VPS = [320, 375, 390, 430, 768, 1024];
const PAGES = ['/', '/about', '/services', '/technology', '/industries', '/insights', '/portfolio', '/careers', '/contact'];

let checks = 0;
let failures = 0;
const report = (cond, msg) => {
  checks += 1;
  if (!cond) failures += 1;
  console.log(`  [${cond ? 'ok' : 'FAIL'}] ${msg}`);
};

async function init(page, lang) {
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
  }, lang);
}

async function overflowInfo(page) {
  return page.evaluate(() => {
    const d = document.documentElement;
    return { scrollW: d.scrollWidth, iw: window.innerWidth, hScroll: d.scrollWidth > window.innerWidth + 1 };
  });
}

async function fullScroll(page, passes = 1) {
  for (let pass = 0; pass < passes; pass++) {
    const maxScroll = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    for (let y = 0; y < maxScroll; y += 400) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(20);
    }
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(250);
  }
}

async function auditStats(page, lang, w) {
  const res = await page.evaluate(() => {
    const out = {};
    const boxesOf = (els) => els.map((el) => {
      const r = el.getBoundingClientRect();
      return { l: r.left, r: r.right, t: r.top, b: r.bottom };
    });
    const overlaps = (boxes) => {
      let n = 0;
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i], b = boxes[j];
          if (a.r > b.l + 2 && b.r > a.l + 2 && a.b > b.t + 2 && b.b > a.t + 2) n += 1;
        }
      }
      return n;
    };
    const strip = document.querySelector('section[aria-label="Executive principles"], section[aria-label="المبادئ التنفيذية"]');
    if (strip) {
      const cells = boxesOf([...strip.querySelectorAll('[class*="metric"]')]);
      out.strip = { count: cells.length, overlaps: overlaps(cells) };
    }
    const grid = [...document.querySelectorAll('div')].find((el) => {
      const cs = getComputedStyle(el);
      return cs.display === 'grid' && el.children.length === 5 && getComputedStyle(el.firstElementChild).display === 'flex';
    });
    if (grid) {
      const r = grid.getBoundingClientRect();
      out.dash = { gridW: Math.round(r.width), vw: window.innerWidth, clipped: r.right > window.innerWidth + 1 || r.left < -1 };
    }
    return out;
  });

  if (res.strip) report(res.strip.count === 4 && res.strip.overlaps === 0, `${lang} ${w}px: metrics strip ${res.strip.count} cells, 0 overlaps`);
  if (res.dash) report(!res.dash.clipped && res.dash.gridW <= res.dash.vw, `${lang} ${w}px: AI dashboard grid fits (${res.dash.gridW}px <= ${res.dash.vw}px)`);
}

async function run(browser, lang) {
  for (const w of VPS) {
    for (const route of PAGES) {
      const ctx = await browser.newContext({ viewport: { width: w, height: w >= 768 ? 1024 : 700 } });
      const page = await ctx.newPage();
      await init(page, lang);
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1900);
      const statsRoutes = ['/', '/technology'];
      const passes = statsRoutes.includes(route) ? 2 : 1;
      await fullScroll(page, passes);
      const botOv = await overflowInfo(page);
      if (botOv.hScroll) {
        report(false, `${lang} ${w}px ${route}: horizontal overflow (bottom ${botOv.scrollW}/${botOv.iw})`);
      } else {
        report(true, `${lang} ${w}px ${route}: no horizontal overflow`);
      }
      if (statsRoutes.includes(route)) await auditStats(page, lang, w);
      await ctx.close();
    }
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const only = process.env.AUDIT_LANG;
  if (!only || only === 'en') {
    console.log('=== ENGLISH ===');
    await run(browser, 'en');
  }
  if (!only || only === 'ar') {
    console.log('=== ARABIC ===');
    await run(browser, 'ar');
  }
  console.log(`=== ${checks - failures}/${checks} CHECKS PASSED ===`);
  await browser.close();
  process.exit(failures ? 1 : 0);
})();
