import { chromium } from 'playwright';
const BASE = 'http://localhost:5173/xvi-group-site';
const b = await chromium.launch({ headless: true });
let pass = 0, fail = 0;
const report = (ok, msg) => { ok ? pass++ : fail++; console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`); };

async function ctx(view, reduced = false, lang = 'en') {
  const c = await b.newContext({ viewport: view, reducedMotion: reduced ? 'reduce' : 'no-preference' });
  const p = await c.newPage();
  await p.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
  }, lang);
  return { c, p };
}

async function waitLoaded(p) {
  await p.waitForSelector('.luxury-loader', { state: 'detached', timeout: 9000 }).catch(() => {});
  await p.waitForTimeout(400);
}

async function scrollToSection(p) {
  await p.evaluate(() => {
    const sec = document.querySelector('section[aria-label*="case"]') ?? document.querySelector('section[aria-label]');
    sec?.scrollIntoView({ block: 'start' });
  });
  await p.waitForTimeout(600);
}

{
  console.log('DESKTOP');
  const { c, p } = await ctx({ width: 1440, height: 900 });
  const errors = [];
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', e => errors.push(String(e)));
  await p.goto(BASE + '/insights', { waitUntil: 'domcontentloaded' });
  await waitLoaded(p);
  await scrollToSection(p);
  const section = p.locator('section[aria-label="Executive case studies"]');
  report(await section.isVisible(), 'case studies section visible');
  const rail = section.locator('nav button');
  report((await rail.count()) === 6, `6 case studies in rail (got ${await rail.count()})`);
  report(await p.getByRole('heading', { name: 'Nile Health Group' }).isVisible(), 'default case = Nile Health Group');
  report(await section.getByText('THE CHALLENGE', { exact: true }).isVisible(), 'challenge block visible');
  report(await section.getByText('THE XVI SOLUTION', { exact: true }).isVisible(), 'solution block visible');
  report((await section.locator('.xvi-mono, ol').count()) > 0 || (await section.locator('ol').count()) === 1, 'timeline present');
  report(await section.getByText('BEFORE / AFTER', { exact: true }).isVisible(), 'before/after visible');
  report(await section.getByText('Before', { exact: true }).isVisible(), 'Before panel');
  report(await section.getByText('After', { exact: true }).isVisible(), 'After panel');
  report((await section.locator('ol li').count()) === 4, '4 timeline steps');
  report(await section.getByText('RESULTS · EXECUTIVE KPIs', { exact: true }).isVisible(), 'KPI section visible');
  report(await section.getByText('EXECUTIVE RECOMMENDATION', { exact: true }).isVisible(), 'recommendation panel');
  report(await section.getByText('Related Solution', { exact: true }).isVisible(), 'Related Solution CTA');
  report(await section.getByText('Learn More', { exact: true }).isVisible(), 'Learn More CTA');
  report(await section.getByText('Contact Expert', { exact: true }).isVisible(), 'Contact Expert CTA');

  // KPI counters animate from 0 to value
  const kpiVal = section.locator('[class*="kpiValue"]').first();
  await kpiVal.scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  const before = (await kpiVal.textContent()).trim();
  await p.waitForTimeout(1900);
  const after = (await kpiVal.textContent()).trim();
  const afterNum = parseInt(after.replace(/[^0-9]/g, ''), 10);
  report(afterNum > 0 && after !== before, `KPI counter animated (${before} -> ${after})`);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(300);
  const rail2 = section.locator('nav button').nth(1);
  await rail2.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(400);
  await rail2.click({ force: true });
  await p.waitForTimeout(1100);
  report(await p.getByRole('heading', { name: 'Atlas Infrastructure Group' }).isVisible(), 'click case 2 -> detail switches');
  const rel2 = await section.locator('a:has-text("Related Solution")').getAttribute('href');
  report(rel2.endsWith('/services/business-consulting'), `case 2 related solution href (${rel2})`);
  const rail5 = section.locator('nav button').nth(4);
  await rail5.evaluate((el) => el.scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(400);
  await rail5.click({ force: true });
  await p.waitForTimeout(1100);
  report(await p.getByRole('heading', { name: 'Cedar City Municipality' }).isVisible(), 'click case 5 -> detail switches');

  // Related Solution href correctness for active (government -> business-consulting)
  const relHref = await section.locator('a:has-text("Related Solution")').getAttribute('href');
  report(relHref.endsWith('/services/business-consulting'), `related solution href correct (${relHref})`);
  // Learn More -> /industries
  const lmHref = await section.locator('a:has-text("Learn More")').getAttribute('href');
  report(lmHref.endsWith('/industries'), `Learn More href correct (${lmHref})`);

  report(errors.length === 0, `zero console errors (got ${errors.length})`);
  await c.close();
}

{
  console.log('DESKTOP · CONTACT EXPERT');
  const { c, p } = await ctx({ width: 1440, height: 900 });
  const errors = [];
  p.on('pageerror', e => errors.push(String(e)));
  await p.goto(BASE + '/insights', { waitUntil: 'domcontentloaded' });
  await waitLoaded(p);
  await scrollToSection(p);
  await p.getByText('Contact Expert', { exact: true }).first().click({ force: true });
  await p.waitForTimeout(900);
  let dockOpen = false;
  try { await p.locator('button[aria-label="Open Executive AI"]').first().waitFor({ state: 'visible', timeout: 3500 }); dockOpen = true; } catch {}
  report(dockOpen, 'Contact Expert opens the Executive AI');
  report(errors.length === 0, `zero page errors (got ${errors.length})`);
  await c.close();
}

{
  console.log('REDUCED MOTION');
  const { c, p } = await ctx({ width: 1280, height: 800 }, true);
  const errors = [];
  p.on('pageerror', e => errors.push(String(e)));
  await p.goto(BASE + '/insights', { waitUntil: 'domcontentloaded' });
  await waitLoaded(p);
  await scrollToSection(p);
  report(await p.getByRole('heading', { name: 'Nile Health Group' }).isVisible(), 'detail visible under reduced motion');
  report(await p.getByText('EXECUTIVE RECOMMENDATION', { exact: true }).isVisible(), 'recommendation visible');
  report(errors.length === 0, `zero page errors reduced (got ${errors.length})`);
  await c.close();
}

{
  console.log('MOBILE (AR)');
  const { c, p } = await ctx({ width: 390, height: 844 }, false, 'ar');
  const errors = [];
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', e => errors.push(String(e)));
  await p.goto(BASE + '/insights', { waitUntil: 'domcontentloaded' });
  await waitLoaded(p);
  const section = p.locator('section[aria-label="تجارب دراسة الحالة"]');
  report(await section.isVisible(), 'AR section visible');
  await p.evaluate(() => {
    const sec = document.querySelector('section[aria-label="تجارب دراسة الحالة"]');
    sec?.scrollIntoView({ block: 'start' });
  });
  await p.waitForTimeout(600);
  const rect = await p.evaluate(() => {
    const sec = document.querySelector('section[aria-label="تجارب دراسة الحالة"]');
    if (!sec) return null;
    const r = sec.getBoundingClientRect();
    return { left: r.left, right: r.right };
  });
  report(!!rect && rect.right <= 390.5 && rect.left >= -0.5, 'AR section within viewport (no overflow)');
  report(await p.getByText('التوصية التنفيذية', { exact: true }).isVisible(), 'AR recommendation label');
  report(await p.getByText('الحل ذو الصلة', { exact: true }).isVisible(), 'AR Related Solution CTA');
  await p.getByText('التصنيع', { exact: true }).first().click();
  await p.waitForTimeout(600);
  report(await p.getByRole('heading', { name: 'صناعات دلتا فورج' }).isVisible(), 'AR tap case -> detail switches');
  report(errors.length === 0, `zero console errors mobile (got ${errors.length})`);
  await c.close();
}

console.log(`\n=== ${pass}/${pass + fail} CHECKS PASSED ===`);
await b.close();
process.exit(fail ? 1 : 0);
