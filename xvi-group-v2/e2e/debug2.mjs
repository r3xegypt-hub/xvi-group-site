import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Debug services page
  console.log('=== SERVICES PAGE ===');
  await page.goto(`${BASE}/services`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const svcLinks = await page.locator('a').evaluateAll(els =>
    els.map(el => ({ text: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 60), href: el.getAttribute('href') }))
  );
  svcLinks.forEach(l => console.log(`  a: "${l.text}" → ${l.href}`));

  // Debug industries page
  console.log('\n=== INDUSTRIES PAGE ===');
  await page.goto(`${BASE}/industries`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const indLinks = await page.locator('a').evaluateAll(els =>
    els.map(el => ({ text: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 60), href: el.getAttribute('href') }))
  );
  indLinks.forEach(l => console.log(`  a: "${l.text}" → ${l.href}`));

  // Debug about page
  console.log('\n=== ABOUT PAGE ===');
  await page.goto(`${BASE}/about`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const abtLinks = await page.locator('a').evaluateAll(els =>
    els.map(el => ({ text: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 80), href: el.getAttribute('href') }))
  );
  abtLinks.forEach(l => console.log(`  a: "${l.text}" → ${l.href}`));

  // Debug careers page
  console.log('\n=== CAREERS PAGE ===');
  await page.goto(`${BASE}/careers`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  const carLinks = await page.locator('a').evaluateAll(els =>
    els.map(el => ({ text: el.textContent.replace(/\s+/g, ' ').trim().slice(0, 80), href: el.getAttribute('href') }))
  );
  carLinks.forEach(l => console.log(`  a: "${l.text}" → ${l.href}`));

  // Debug mobile menu
  console.log('\n=== MOBILE MENU ===');
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(500);

  const mt = page.locator('button[class*="mobileToggle"]');
  console.log(`Mobile toggle visible: ${await mt.isVisible()}`);
  await mt.click({ force: true });
  await page.waitForTimeout(500);

  const mobileALinks = await page.locator('a').evaluateAll(els =>
    els.map(el => ({ text: el.textContent.replace(/\s+/g, ' ').trim(), href: el.getAttribute('href'), visible: el.offsetParent !== null }))
  );
  console.log('Mobile menu links:');
  mobileALinks.filter(l => l.visible).forEach(l => console.log(`  a: "${l.text}" → ${l.href}`));

  await browser.close();
})();
