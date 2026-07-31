import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const HOME_HREF = '/xvi-group-site';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

async function checkDesktop(browser, lang, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1600);

  const homeLabel = lang === 'ar' ? 'الرئيسية' : 'Home';
  const servicesLabel = lang === 'ar' ? 'الحلول' : 'Solutions';

  const data = await page.evaluate(({ homeLabel, servicesLabel }) => {
    const links = document.querySelector('[class*="links"]');
    const anchors = Array.from(links.querySelectorAll('a'));
    const byText = (t) => anchors.find((a) => a.textContent.trim() === t);
    const home = byText(homeLabel);
    const services = byText(servicesLabel);
    const header = document.querySelector('header');
    const logo = document.querySelector('[class*="logo"]');
    const cta = document.querySelector('[class*="ctaButton"]');
    return {
      vw: window.innerWidth,
      first: anchors[0] ? anchors[0].textContent.trim() : null,
      homeHref: home ? home.getAttribute('href') : null,
      homeActive: home ? home.className.includes('activeLink') : false,
      servicesActive: services ? services.className.includes('activeLink') : false,
      logoHref: logo ? logo.getAttribute('href') : null,
      headerScroll: header ? header.scrollWidth : null,
      headerClient: header ? header.clientWidth : null,
      ctaRight: cta ? Math.round(cta.getBoundingClientRect().right) : null,
      linksShown: links ? getComputedStyle(links).display !== 'none' : false,
    };
  }, { homeLabel, servicesLabel });

  const label = `${lang} ${vp}px`;
  report(data.linksShown, `desktop links visible (${label})`);
  report(data.first === homeLabel, `first item = ${homeLabel} (${label})`);
  report(data.homeHref === HOME_HREF, `home href = ${HOME_HREF} (${label})`);
  report(data.logoHref === HOME_HREF, `logo href = ${HOME_HREF} (${label})`);
  report(data.homeActive && !data.servicesActive, `home highlighted on homepage (${label})`);
  report(data.headerScroll !== null && data.headerScroll <= data.headerClient, `nav content fits pill (scrollW ${data.headerScroll} <= clientW ${data.headerClient}) (${label})`);
  report(data.ctaRight <= data.vw || data.ctaRight === null, `CTA within viewport (right=${data.ctaRight}) (${label})`);

  await page.goto(BASE + '/services', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1600);
  const offHome = await page.evaluate(({ homeLabel, servicesLabel }) => {
    const anchors = Array.from(document.querySelector('[class*="links"]').querySelectorAll('a'));
    const home = anchors.find((a) => a.textContent.trim() === homeLabel);
    const services = anchors.find((a) => a.textContent.trim() === servicesLabel);
    return { homeActive: home.className.includes('activeLink'), servicesActive: services.className.includes('activeLink') };
  }, { homeLabel, servicesLabel });
  report(!offHome.homeActive && offHome.servicesActive, `on /services: home not active, services active (${label})`);

  await ctx.close();
}

async function checkMobile(browser, lang, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1600);

  const homeLabel = lang === 'ar' ? 'الرئيسية' : 'Home';
  const linksHidden = await page.evaluate(() => {
    const links = document.querySelector('[class*="links"]');
    return links ? getComputedStyle(links).display === 'none' : true;
  });
  report(linksHidden, `desktop links hidden, burger used (${lang} ${vp}px)`);

  await page.locator('button[aria-label="Open menu"]').click({ force: true });
  await page.waitForTimeout(700);
  const mobile = await page.evaluate((homeLabel) => {
    const menu = document.querySelector('[class*="mobileMenu"]');
    const anchors = Array.from(menu.querySelectorAll('a'));
    const home = anchors.find((a) => a.textContent.trim() === homeLabel);
    return {
      first: anchors[0] ? anchors[0].textContent.trim() : null,
      homeHref: home ? home.getAttribute('href') : null,
      homeActive: home ? home.className.includes('activeLink') : false,
      count: anchors.length,
    };
  }, homeLabel);
  const label = `${lang} ${vp}px`;
  report(mobile.first === homeLabel, `mobile menu first item = ${homeLabel} (${label})`);
  report(mobile.homeHref === HOME_HREF, `mobile home href = ${HOME_HREF} (${label})`);
  report(mobile.homeActive, `mobile home highlighted (${label})`);

  await ctx.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const lang of ['en', 'ar']) {
    for (const vp of [1440, 1024]) await checkDesktop(browser, lang, vp);
    for (const vp of [820, 768, 390]) await checkMobile(browser, lang, vp);
  }
  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})();
