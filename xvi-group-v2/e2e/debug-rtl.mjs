import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const sizes = [
  { name: 'Mobile', w: 390, h: 844 },
  { name: 'Tablet', w: 820, h: 1180 },
  { name: 'Desktop', w: 1440, h: 900 },
];

async function measure(page, label) {
  await page.mouse.move(400, 300);
  await page.waitForTimeout(900);

  const result = await page.evaluate(() => {
    const out = { label: document.documentElement.dir, mouse: { x: 400, y: 300 } };
    // Premium cursor dot + ring
    const dot = document.querySelector('.premium-cursor-dot');
    const ring = document.querySelector('.premium-cursor-ring');
    if (dot) {
      const r = dot.getBoundingClientRect();
      out.dot = { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }
    if (ring) {
      const r = ring.getBoundingClientRect();
      out.ring = { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }
    // MouseGlow inner radial element (golden spotlight)
    const glow = document.querySelector('div[style*="100vw"]');
    if (glow) {
      const inner = glow.firstElementChild;
      if (inner) {
        const r = inner.getBoundingClientRect();
        out.glow = { x: r.x + r.width / 2, y: r.y + r.height / 2, width: r.width };
      }
    }
    // Scrollbar position check
    out.scrollbarX = window.innerWidth - document.documentElement.clientWidth;
    return out;
  });
  console.log(`--- ${label} (dir=${result.label}) ---`);
  for (const key of ['dot', 'ring', 'glow']) {
    if (result[key]) {
      const dx = Math.round(result[key].x - 400);
      const dy = Math.round(result[key].y - 300);
      console.log(`  ${key}: actual=(${Math.round(result[key].x)},${Math.round(result[key].y)}) offset=(${dx},${dy})px`);
    }
  }
  console.log(`  scrollbar width: ${result.scrollbarX}`);
  return result;
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // English LTR
  await page.addInitScript(() => {
    localStorage.setItem('xviLanguage', 'en');
    localStorage.setItem('xviIntroDone', 'true');
  });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await measure(page, 'EN Desktop (LTR)');

  // Switch to Arabic RTL
  await page.evaluate(() => { localStorage.setItem('xvi-language', 'ar'); });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  await measure(page, 'AR Desktop (RTL)');

  // Tablet RTL
  const tab = await browser.newPage({ viewport: { width: 820, height: 1180 } });
  await tab.addInitScript(() => {
    localStorage.setItem('xvi-language', 'ar');
    localStorage.setItem('xviIntroDone', 'true');
  });
  await tab.goto(BASE + '/', { waitUntil: 'networkidle' });
  await tab.waitForTimeout(2500);
  await tab.mouse.move(400, 300);
  await tab.waitForTimeout(900);
  const t = await tab.evaluate(() => {
    const out = { label: document.documentElement.dir };
    const dot = document.querySelector('.premium-cursor-dot');
    const ring = document.querySelector('.premium-cursor-ring');
    const glow = document.querySelector('div[style*="100vw"]');
    if (dot) { const r = dot.getBoundingClientRect(); out.dot = { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }
    if (ring) { const r = ring.getBoundingClientRect(); out.ring = { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }
    if (glow) { const inner = glow.firstElementChild; if (inner) { const r = inner.getBoundingClientRect(); out.glow = { x: r.x + r.width / 2, y: r.y + r.height / 2 }; } }
    out.scrollbarX = window.innerWidth - document.documentElement.clientWidth;
    return out;
  });
  console.log(`--- AR Tablet (RTL, ${t.label}) ---`);
  for (const key of ['dot', 'ring', 'glow']) {
    if (t[key]) {
      const dx = Math.round(t[key].x - 400);
      const dy = Math.round(t[key].y - 300);
      console.log(`  ${key}: actual=(${Math.round(t[key].x)},${Math.round(t[key].y)}) offset=(${dx},${dy})px`);
    }
  }
  console.log(`  scrollbar width: ${t.scrollbarX}`);

  await browser.close();
})();
