import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const CLICK = { force: true, timeout: 8000 };

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => { localStorage.setItem('xviIntroDone', 'true'); });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Test header nav links
  const headerLinks = await page.locator('header a').evaluateAll(els => els.map(el => ({
    text: (el.textContent || '').trim(),
    href: el.getAttribute('href')
  })));
  console.log('=== HEADER LINKS ===');
  headerLinks.forEach(l => console.log(`  "${l.text}" → ${l.href}`));

  // Try clicking "Solutions" in header
  const solLink = page.locator('header a').filter({ hasText: 'Solutions' }).first();
  console.log(`\nSolutions link visible: ${await solLink.isVisible()}`);
  await solLink.click(CLICK);
  await page.waitForTimeout(2000);
  console.log(`After click URL: ${page.url()}`);

  // Now debug mobile
  const mobile = await (await browser.newContext({ viewport: { width: 375, height: 812 } })).newPage();
  await mobile.addInitScript(() => { localStorage.setItem('xviIntroDone', 'true'); });
  await mobile.goto(BASE + '/', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(3000);

  const mt = mobile.locator('button[class*="mobileToggle"]');
  console.log(`\nMobile toggle visible: ${await mt.isVisible()}`);
  await mt.click(CLICK);
  await mobile.waitForTimeout(1000);

  const menuLinks = await mobile.locator('a').evaluateAll(els => els.map(el => ({
    text: (el.textContent || '').trim(),
    href: el.getAttribute('href'),
    visible: el.offsetParent !== null,
    inMenu: el.closest('[class*="mobileMenu"]') !== null
  })));
  console.log('\n=== MOBILE LINKS AFTER TOGGLE ===');
  menuLinks.filter(l => l.visible && l.inMenu).forEach(l => console.log(`  "${l.text}" → ${l.href}`));

  await browser.close();
})();
