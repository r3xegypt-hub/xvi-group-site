import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:5173/xvi-group-site';
const OUT = 'C:/Users/stone/AppData/Local/Temp/opencode/responsive-shots';
mkdirSync(OUT, { recursive: true });

const shots = [
  { route: '/', lang: 'en', w: 390, h: 844, name: 'home-390' },
  { route: '/', lang: 'ar', w: 390, h: 844, name: 'home-390-ar' },
  { route: '/', lang: 'en', w: 820, h: 1180, name: 'home-820' },
  { route: '/', lang: 'en', w: 1440, h: 900, name: 'home-1440' },
  { route: '/services', lang: 'en', w: 390, h: 844, name: 'services-390' },
  { route: '/about', lang: 'en', w: 390, h: 844, name: 'about-390' },
  { route: '/industries', lang: 'ar', w: 390, h: 844, name: 'industries-390-ar' },
  { route: '/careers', lang: 'en', w: 390, h: 844, name: 'careers-390' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const lang of ['en', 'ar']) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript((l) => {
      localStorage.setItem('xvi-language', l);
      localStorage.setItem('xviIntroDone', 'true');
      localStorage.setItem('xviCinematicDate', String(Date.now()));
    }, lang);
    for (const s of shots.filter(x => x.lang === lang)) {
      await page.setViewportSize({ width: s.w, height: s.h });
      await page.goto(BASE + s.route, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.7;
        for (let y = 0; y <= document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise(r => setTimeout(r, 25));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `${OUT}/${s.name}-top.png`, fullPage: false });
      console.log(`saved ${s.name}-top.png`);
    }
    await ctx.close();
  }
  await browser.close();
})();
