import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', e => console.error('PAGE ERROR:', e.message));

  // First navigate to home, then SPA-navigate to services
  console.log('=== SPA NAVIGATION TEST ===');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Check page title
  console.log('Title:', await page.title());
  console.log('URL:', page.url());

  // Count all links on home page
  let links = await page.locator('a').evaluateAll(els => els.map(el => ({
    text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50),
    href: el.getAttribute('href')
  })));
  console.log(`Home page has ${links.length} <a> tags`);
  links.filter(l => l.href && (l.href.includes('contact') || l.href.includes('service'))).forEach(l => console.log(`  "${l.text}" → ${l.href}`));

  // Click on Services nav link (SPA navigation)
  const servicesNav = page.locator('header a').filter({ hasText: /^Solutions$/ }).first();
  console.log(`Services nav visible: ${await servicesNav.isVisible()}`);
  await servicesNav.click({ force: true });
  await page.waitForTimeout(2000);

  console.log('\nAfter SPA nav to Services:');
  console.log('URL:', page.url());
  links = await page.locator('a').evaluateAll(els => els.map(el => ({
    text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50),
    href: el.getAttribute('href')
  })));
  console.log(`Services page has ${links.length} <a> tags`);
  links.forEach(l => console.log(`  "${l.text}" → ${l.href}`));

  // Now click Industries nav
  const industriesNav = page.locator('header a').filter({ hasText: /^Industries$/ }).first();
  console.log(`\nIndustries nav visible: ${await industriesNav.isVisible()}`);
  await industriesNav.click({ force: true });
  await page.waitForTimeout(2000);

  console.log('URL:', page.url());
  links = await page.locator('a').evaluateAll(els => els.map(el => ({
    text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50),
    href: el.getAttribute('href')
  })));
  console.log(`Industries page has ${links.length} <a> tags`);
  links.forEach(l => console.log(`  "${l.text}" → ${l.href}`));

  await browser.close();
})();
