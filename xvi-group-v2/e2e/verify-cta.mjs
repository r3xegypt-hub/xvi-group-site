import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const CLICK = { force: true, timeout: 8000 };

const errors = [];
const results = [];
const pass = m => results.push(`  ✅ ${m}`);
const fail = m => { results.push(`  ❌ ${m}`); errors.push(m); };

async function waitStable(page) {
  // Wait for loader to finish and app to render
  await page.waitForTimeout(4000);
}
async function dockVisible(page) {
  try { await page.locator('div[style*="bottom: 100px"]').first().waitFor({ state: 'visible', timeout: 3000 }); return true; } catch { return false; }
}
async function closeDock(page) {
  const closeBtn = page.locator('div[style*="bottom: 100px"] button', { has: page.locator('svg.lucide-x') }).first();
  if (await closeBtn.isVisible().catch(() => false)) { await closeBtn.click({ force: true }); await page.waitForTimeout(600); }
}
async function openDockHome(page) {
  await page.locator('[aria-label="Executive AI Concierge"]').first().click({ force: true });
  await page.locator('div[style*="bottom: 100px"]').first().waitFor({ state: 'visible', timeout: 8000 });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const desktop = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  const mobile = await (await browser.newContext({ viewport: { width: 375, height: 812 } })).newPage();
  const errs = [];
  desktop.on('pageerror', e => errs.push(`[D] ${e.message}`));
  mobile.on('pageerror', e => errs.push(`[M] ${e.message}`));

  // Set localStorage BEFORE any navigation to skip intro
  const skipIntro = async (page) => {
    await page.addInitScript(() => {
      try {
        localStorage.setItem('xviIntroDone', 'true');
        localStorage.setItem('xviConciergeSeen', 'true');
      } catch {}
    });
  };
  await skipIntro(desktop);
  await skipIntro(mobile);

  // 1. HOME — Executive AI CTA opens Dock (unified single AI entry point)
  console.log('\n📄 HOME PAGE');
  await desktop.goto(BASE + '/', { waitUntil: 'networkidle' });
  await waitStable(desktop);

  const dockToggle = () => desktop.locator('button[aria-label="Open Executive AI"]').first();
  if (await dockToggle().isVisible()) pass('Dock toggle present');

  const heroAi = desktop.locator('button').filter({ hasText: 'Talk to the Executive AI' }).first();
  if (await heroAi.isVisible()) {
    pass('Hero "Talk to the Executive AI" visible');
    await heroAi.click(CLICK); await desktop.waitForTimeout(800);
    (await dockVisible(desktop)) ? pass('Hero AI CTA → Dock opened (unified)') : fail('Hero AI CTA → Dock NOT opened');
  } else fail('Hero "Talk to the Executive AI" not found');
  await closeDock(desktop);

  // 2. "Start a conversation" (home industries section)
  console.log('\n📄 "Start a conversation" (home)');
  await desktop.goto(BASE + '/', { waitUntil: 'networkidle' });
  await waitStable(desktop);
  const indCta = desktop.locator('a').filter({ hasText: 'Start a conversation' }).first();
  if (await indCta.isVisible()) {
    pass('"Start a conversation" visible');
    await indCta.click(CLICK); await desktop.waitForTimeout(800);
    (await dockVisible(desktop)) ? pass('"Start a conversation" → Dock opened') : fail('"Start a conversation" → Dock NOT opened');
  } else fail('"Start a conversation" not found');
  await closeDock(desktop);

  // 3. Services page
  console.log('\n📄 SERVICES');
  await desktop.goto(`${BASE}/services`, { waitUntil: 'networkidle' });
  await waitStable(desktop);
  const svcCta = desktop.locator('a').filter({ hasText: 'Start a conversation' }).first();
  if (await svcCta.isVisible()) {
    pass('"Start a conversation" on Services');
    await svcCta.click(CLICK); await desktop.waitForTimeout(800);
    (await dockVisible(desktop)) ? pass('→ Dock opened') : fail('→ Dock NOT opened');
  } else fail('"Start a conversation" not found on Services');
  await closeDock(desktop);

  // 4. Industries page
  console.log('\n📄 INDUSTRIES');
  await desktop.goto(`${BASE}/industries`, { waitUntil: 'networkidle' });
  await waitStable(desktop);
  const indPgCta = desktop.locator('a').filter({ hasText: 'Start a conversation' }).first();
  if (await indPgCta.isVisible()) {
    pass('"Start a conversation" on Industries');
    await indPgCta.click(CLICK); await desktop.waitForTimeout(800);
    (await dockVisible(desktop)) ? pass('→ Dock opened') : fail('→ Dock NOT opened');
  } else fail('"Start a conversation" not found on Industries');
  await closeDock(desktop);

  // 5. About — "Book your consultation" navigates to /contact
  console.log('\n📄 ABOUT');
  await desktop.goto(`${BASE}/about`, { waitUntil: 'networkidle' });
  await waitStable(desktop);
  const bookC = desktop.locator('a').filter({ hasText: 'Book your consultation' }).first();
  if (await bookC.isVisible()) {
    pass('"Book your consultation" visible');
    await bookC.click(CLICK); await desktop.waitForTimeout(2000);
    desktop.url().includes('/contact') ? pass('→ navigates to /contact') : fail(`→ ${desktop.url()}`);
  } else fail('"Book your consultation" not found');

  // 6. Contact page loads
  console.log('\n📄 CONTACT');
  await desktop.goto(`${BASE}/contact`, { waitUntil: 'networkidle' });
  await waitStable(desktop);
  desktop.url().includes('/contact') ? pass('Contact page loads') : fail('Contact page failed');

  // 7. "Begin a conversation" on Contact/Careers page -> opens Dock
  console.log('\n📄 "Begin a conversation"');
  // On Contact page via CTA component
  const beginC = desktop.locator('a').filter({ hasText: 'Begin a conversation' }).first();
  if (await beginC.isVisible()) {
    pass('"Begin a conversation" visible on Contact page');
    await beginC.click(CLICK); await desktop.waitForTimeout(800);
    (await dockVisible(desktop)) ? pass('→ Dock opened') : fail('→ Dock NOT opened');
  } else fail('"Begin a conversation" not found on Contact');
  await closeDock(desktop);

  // Also test on Careers page
  await desktop.goto(`${BASE}/careers`, { waitUntil: 'networkidle' });
  await waitStable(desktop);
  const beginC2 = desktop.locator('a').filter({ hasText: 'Begin a conversation' }).first();
  if (await beginC2.isVisible()) {
    pass('"Begin a conversation" visible on Careers');
    await beginC2.click(CLICK); await desktop.waitForTimeout(800);
    (await dockVisible(desktop)) ? pass('→ Dock opened') : fail('→ Dock NOT opened');
  } else fail('"Begin a conversation" not found on Careers');
  await closeDock(desktop);

  // 8. AI Dock internal "Contact Expert" -> journey-aware recommendation card
  console.log('\n🔍 AI DOCK → "Contact Expert"');
  await desktop.goto(BASE + '/', { waitUntil: 'networkidle' });
  await waitStable(desktop);

  await openDockHome(desktop);
  pass('AI Dock opened');

  // The dock has quick action buttons inside. Target the one in the dock panel.
    const dockPane = desktop.locator('div[style*="border-radius: 28px"]');
    const dockExpert = dockPane.locator('button').filter({ hasText: 'Contact Expert' }).first();
    if (await dockExpert.isVisible()) {
      pass('"Contact Expert" found inside dock');
      await dockExpert.click(CLICK); await desktop.waitForTimeout(3200);
      const recCard = dockPane.getByText('Recommended Next Step', { exact: true });
      (await recCard.isVisible().catch(() => false)) ? pass('→ recommendation card rendered') : fail('→ recommendation card NOT rendered');
      // The consultant CTA inside the card navigates to /contact
      const consultant = dockPane.locator('button').filter({ hasText: 'Talk to a consultant' }).first();
      if (await consultant.isVisible().catch(() => false)) {
        await consultant.click(CLICK); await desktop.waitForTimeout(2000);
        desktop.url().includes('/contact') ? pass('→ "Talk to a consultant" navigates to /contact') : fail(`→ ${desktop.url()}`);
      } else {
        fail('"Talk to a consultant" not found in card');
      }
    } else {
      // Fallback: try finding any button with that text that's newly visible after opening
      const allButtonsAfterOpen = desktop.locator('button').filter({ hasText: 'Contact Expert' });
      const count = await allButtonsAfterOpen.count();
      pass(`Found ${count} 'Contact Expert' buttons after opening dock`);
      if (count > 0) {
        await allButtonsAfterOpen.nth(count - 1).click(CLICK);
        await desktop.waitForTimeout(3200);
        const recCard = dockPane.getByText('Recommended Next Step', { exact: true });
        (await recCard.isVisible().catch(() => false)) ? pass('→ recommendation card rendered') : fail('→ recommendation card NOT rendered');
      } else fail('No "Contact Expert" button found after dock open');
    }

  // 9. Route verification
  console.log('\n🔗 ROUTES');
  for (const p of ['/', '/services', '/industries', '/insights', '/about', '/contact', '/careers']) {
    try {
      await desktop.goto(`${BASE}${p}`, { waitUntil: 'networkidle', timeout: 12000 });
      await desktop.waitForTimeout(600);
      pass(`${p} loads`);
    } catch (e) { fail(`${p} failed: ${e.message}`); }
  }

  // 10. Mobile
  console.log('\n📱 MOBILE');
  await mobile.goto(BASE + '/', { waitUntil: 'networkidle' });
  await waitStable(mobile);
  const mc = mobile.locator('button').filter({ hasText: 'Talk to the Executive AI' });
  (await mc.isVisible()) ? pass('Hero AI CTA present on mobile') : fail('Hero AI CTA missing on mobile');

  const mt = mobile.locator('button[class*="mobileToggle"]');
  if (await mt.isVisible()) {
    pass('Mobile toggle visible');
    await mt.click(CLICK); await mobile.waitForTimeout(1200);
    const mcLink = mobile.locator('[class*="mobileMenu"] a').filter({ hasText: 'Contact' }).first();
    try {
      await mcLink.waitFor({ state: 'visible', timeout: 3000 });
      pass('Mobile "Contact" link visible');
      const href = await mcLink.getAttribute('href');
      (href && href.includes('contact')) ? pass('→ links to /contact') : fail(`href: ${href}`);
    } catch { fail('Mobile "Contact" not found in menu'); }
  } else fail('Mobile toggle not found');

  // 11. Console errors
  console.log('\n🔍 ERRORS');
  (errs.length === 0) ? pass('No errors') : fail(`Errors: ${errs.join(' | ')}`);

  // 12. Navigation with AI dock open (C1 regression: nav must stay clickable above the dock backdrop)
  console.log('\n🔍 NAV WITH DOCK OPEN');
  await desktop.goto(BASE + '/', { waitUntil: 'networkidle' });
  await waitStable(desktop);
  await openDockHome(desktop);
  const svcLink = desktop.locator('header a').filter({ hasText: /^Solutions$/ }).first();
  if (await svcLink.isVisible()) {
    await svcLink.click(CLICK); await desktop.waitForTimeout(1500);
    desktop.url().includes('/services') ? pass('Nav while dock open → /services ✅') : fail(`→ ${desktop.url()}`);
  } else {
    const svcLink2 = desktop.locator('header a').filter({ hasText: /^Services$/ }).first();
    if (await svcLink2.isVisible()) {
      await svcLink2.click(CLICK); await desktop.waitForTimeout(1500);
      desktop.url().includes('/services') ? pass('Nav while dock open → /services ✅') : fail(`→ ${desktop.url()}`);
    } else fail('No nav link found');
  }

  // Summary
  console.log('\n' + '='.repeat(58));
  console.log('📊 CTA VERIFICATION REPORT');
  console.log('='.repeat(58));
  results.forEach(r => console.log(r));
  (errors.length === 0) ? console.log('\n🎉 ALL CHECKS PASSED') : console.log(`\n❌ ${errors.length} FAILURE(S)`);

  await browser.close();
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error('Fatal:', e); process.exit(1); });
