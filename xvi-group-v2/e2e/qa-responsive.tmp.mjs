import { chromium, devices } from 'playwright';

const BASE = 'http://localhost:4173/xvi-group-site';

const ROUTES = [
  '/', '/about', '/services', '/technology', '/industries', '/insights',
  '/portfolio', '/contact', '/careers', '/privacy', '/terms',
  '/services/ai-transformation', '/services/business-consulting',
  '/services/technology-consulting', '/services/executive-training',
];

const devicesList = [
  { name: 'small-mobile-320', ...devices['iPhone SE'] },
  { name: 'small-mobile-360', viewport: { width: 360, height: 640 }, userAgent: devices['Pixel 5'].userAgent, isMobile: true, hasTouch: true },
  { name: 'android-pixel7', ...devices['Pixel 7'] },
  { name: 'android-galaxy', ...devices['Galaxy S9+'] },
  { name: 'iphone-13', ...devices['iPhone 13'] },
  { name: 'iphone-15-pro-max', ...devices['iPhone 15 Pro Max'] },
  { name: 'ipad-portrait', ...devices['iPad Pro 11'] },
  { name: 'tablet-portrait', viewport: { width: 768, height: 1024 }, userAgent: devices['iPad Pro 11'].userAgent, isMobile: true, hasTouch: true },
  { name: 'tablet-landscape', viewport: { width: 1024, height: 768 }, userAgent: devices['iPad Pro 11'].userAgent, isMobile: true, hasTouch: true },
  { name: 'laptop-1280', viewport: { width: 1280, height: 800 } },
  { name: 'laptop-1440', viewport: { width: 1440, height: 900 } },
  { name: 'pc-1920', viewport: { width: 1920, height: 1080 } },
];

const results = [];
const report = (ok, msg) => { results.push(ok); console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`); };

(async () => {
  const browser = await chromium.launch({ headless: true });
  const summary = [];

  for (const dev of devicesList) {
    for (const lang of ['en', 'ar']) {
      let devicePass = 0, deviceTotal = 0;
      const ctx = await browser.newContext({
        viewport: dev.viewport,
        isMobile: dev.isMobile ?? false,
        hasTouch: dev.hasTouch ?? false,
        deviceScaleFactor: dev.deviceScaleFactor ?? 1,
        userAgent: dev.userAgent,
        locale: lang === 'ar' ? 'ar-EG' : 'en-US',
      });
      const page = await ctx.newPage();
      await page.addInitScript((l) => {
        localStorage.setItem('xvi-language', l);
        localStorage.setItem('xviIntroDone', 'true');
        localStorage.setItem('xviCinematicDate', String(Date.now()));
        localStorage.setItem('xviConciergeSeen', 'true');
      }, lang);

      for (const route of ROUTES) {
        const consoleErrors = [];
        const pageErrors = [];
        const failedReqs = [];
        const onConsole = (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); };
        const onPageError = (e) => pageErrors.push(String(e));
        const onReqFail = (r) => failedReqs.push(`${r.url()} :: ${r.failure()?.errorText}`);
        const onResp = (r) => { if (r.status() >= 400) failedReqs.push(`${r.status()} ${r.url()}`); };
        page.on('console', onConsole);
        page.on('pageerror', onPageError);
        page.on('requestfailed', onReqFail);
        page.on('response', onResp);

        let ok = true;
        const issues = [];
        try {
          await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await page.waitForFunction(() => {
            const el = document.querySelector('.xvi-site');
            return !el || !el.hasAttribute('inert');
          }, null, { timeout: 15000 }).catch(() => {});
          await page.waitForTimeout(500);

          const dims = await page.evaluate(() => {
            const de = document.documentElement;
            return {
              scrollW: de.scrollWidth,
              clientW: de.clientWidth,
              compat: document.compatMode,
              bodyScrollW: document.body.scrollWidth,
              bodyOverflowX: getComputedStyle(document.body).overflowX,
            };
          });
          if (dims.compat !== 'CSS1Compat') { ok = false; issues.push(`compatMode=${dims.compat}`); }
          if (dims.scrollW > dims.clientW + 1) { ok = false; issues.push(`html overflow: scrollW=${dims.scrollW} clientW=${dims.clientW}`); }
          if (dims.bodyScrollW > dims.clientW + 1) { ok = false; issues.push(`body overflow: bodyScrollW=${dims.bodyScrollW}`); }

          const contentVisible = await page.evaluate(() => {
            const main = document.getElementById('main-content');
            return main ? main.getBoundingClientRect().height > 50 : false;
          });
          if (!contentVisible) { ok = false; issues.push('main content empty'); }

          const hasNav = await page.locator('header nav, nav, [role="navigation"]').count();
          if (hasNav === 0) { ok = false; issues.push('no navigation'); }

          if (consoleErrors.length) { ok = false; issues.push(`console errors: ${consoleErrors.slice(0, 2).join(' | ')}`); }
          if (pageErrors.length) { ok = false; issues.push(`page errors: ${pageErrors.slice(0, 2).join(' | ')}`); }
          if (failedReqs.length) {
            const real = failedReqs.filter(f => !f.includes('googleapis') && !f.includes('gstatic') && !f.includes('google.com'));
            if (real.length) { ok = false; issues.push(`failed reqs: ${real.slice(0, 2).join(' | ')}`); }
          }
        } catch (e) {
          ok = false; issues.push(`exception: ${String(e).slice(0, 120)}`);
        }

        page.removeListener('console', onConsole);
        page.removeListener('pageerror', onPageError);
        page.removeListener('requestfailed', onReqFail);
        page.removeListener('response', onResp);
        deviceTotal++;
        if (ok) devicePass++;
        else console.log(`\nFAIL ${dev.name} ${lang} ${route}\n      ${issues.join('\n      ')}`);
      }
      summary.push({ device: dev.name, lang, pass: devicePass, total: deviceTotal });
      await ctx.close();
    }
  }

  await browser.close();
  console.log('\n===== SUMMARY =====');
  for (const s of summary) {
    const pct = Math.round((s.pass / s.total) * 100);
    console.log(`${s.device.padEnd(20)} ${s.lang.toUpperCase()}  ${s.pass}/${s.total} (${pct}%)`);
  }
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
