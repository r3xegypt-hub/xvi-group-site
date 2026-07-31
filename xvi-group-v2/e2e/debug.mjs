import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Home page - debug CTA text
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Find all buttons and their text
  const allButtons = await page.locator('button').evaluateAll(els =>
    els.map(el => ({ tag: el.tagName, text: el.textContent.trim(), class: el.className.slice(0, 60) }))
  );
  console.log('=== BUTTONS ===');
  allButtons.forEach(b => console.log(`  button: "${b.text}"`));

  // Find all <a> tags with their text and href
  const allLinks = await page.locator('a').evaluateAll(els =>
    els.map(el => ({ text: el.textContent.trim().slice(0, 80), href: el.getAttribute('href') }))
  );
  console.log('\n=== ALL <a> TAGS ===');
  allLinks.forEach(l => {
    if (l.href && l.href.includes('contact')) console.log(`  a: "${l.text}" href="${l.href}"`);
  });

  // Find elements containing "Begin", "Start", "Book"
  const ctaTexts = await page.locator('text=/Begin|Start|Book|Conversation|consultation|Consultation/i').evaluateAll(els =>
    els.map(el => ({ tag: el.tagName, text: el.textContent.trim().slice(0, 80), href: el.getAttribute('href') || '' }))
  );
  console.log('\n=== CTA-RELATED ELEMENTS ===');
  ctaTexts.forEach(el => console.log(`  <${el.tag}>: "${el.text}" href="${el.href}"`));

  // Debug mobile menu toggle
  const toggleBtns = await page.locator('button').evaluateAll(els =>
    els.map(el => ({ text: el.textContent.trim().slice(0, 40), aria: el.getAttribute('aria-label'), class: el.className.slice(0, 60) }))
  );
  console.log('\n=== ALL BUTTONS WITH ATTRS ===');
  toggleBtns.forEach(b => console.log(`  text:"${b.text}" aria:"${b.aria}" class:"${b.class}"`));

  // Open Dock and check internal buttons
  const dockBtn = page.locator('button').filter({ hasText: /Executive AI|المستشار التنفيذي/ }).first();
  await dockBtn.click({ force: true });
  await page.waitForTimeout(1000);

  const dockButtons = await page.locator('button').evaluateAll(els =>
    els.map(el => ({ text: el.textContent.trim().slice(0, 60), visible: el.offsetParent !== null }))
  );
  console.log('\n=== DOCK OPENED - ALL BUTTONS ===');
  dockButtons.forEach(b => console.log(`  "${b.text}" visible=${b.visible}`));

  await browser.close();
})();
