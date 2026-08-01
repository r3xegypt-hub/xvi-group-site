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
  await p.waitForTimeout(300);
}

{
  console.log('DESKTOP');
  const { c, p } = await ctx({ width: 1440, height: 900 });
  const errors = [];
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', e => errors.push(String(e)));
  await p.goto(BASE + '/industries', { waitUntil: 'domcontentloaded' });
  await waitLoaded(p);
  await p.waitForTimeout(1500);
  const globe = p.locator('svg[role="group"]');
  report(await globe.isVisible(), 'globe svg visible');
  const nodes = globe.locator('[role="button"][aria-label]');
  report((await nodes.count()) === 7, `7 industry nodes present (got ${await nodes.count()})`);
  report(await p.getByText('RECOMMENDED XVI SOLUTION', { exact: true }).isVisible(), 'panel label visible');
  report(await p.getByRole('heading', { name: 'Healthcare' }).isVisible(), 'default panel = Healthcare');
  await p.evaluate(() => {
    const svg = document.querySelector('svg[role="group"]');
    svg?.scrollIntoView({ block: 'center' });
  });
  await p.waitForTimeout(700);
  await nodes.nth(3).hover({ force: true });
  await p.waitForTimeout(600);
  report(await p.getByRole('heading', { name: 'Manufacturing' }).isVisible(), 'hover Manufacturing -> panel updates');
  report(await p.getByText('Technology Consulting', { exact: true }).isVisible(), 'solution shown (Technology Consulting)');
  const learn = p.locator('a:has-text("Learn More")');
  report(await learn.isVisible(), 'Learn More CTA revealed');
  await nodes.nth(0).click({ force: true });
  await p.waitForTimeout(1600);
  report(p.url().includes('/services/ai-transformation'), `click Healthcare -> ${p.url()}`);
  await p.goto(BASE + '/industries', { waitUntil: 'domcontentloaded' });
  await waitLoaded(p);
  await p.waitForTimeout(1200);
  await p.locator('button:has-text("Government")').first().click();
  await p.waitForTimeout(500);
  report(await p.getByRole('heading', { name: 'Government' }).isVisible(), 'chip click -> panel updates');
  report(errors.length === 0, `zero console errors (got ${errors.length})`);
  await c.close();
}

{
  console.log('REDUCED MOTION');
  const { c, p } = await ctx({ width: 1280, height: 800 }, true);
  const errors = [];
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  p.on('pageerror', e => errors.push(String(e)));
  await p.goto(BASE + '/industries', { waitUntil: 'domcontentloaded' });
  await waitLoaded(p);
  await p.waitForTimeout(1000);
  report(await p.locator('svg[role="group"]').isVisible(), 'globe visible under reduced motion');
  report((await p.locator('svg[role="group"] [role="button"][aria-label]').count()) === 7, '7 nodes under reduced motion');
  report(errors.length === 0, `zero console errors reduced (got ${errors.length})`);
  await c.close();
}

{
  console.log('MOBILE (AR)');
  const { c, p } = await ctx({ width: 390, height: 844 }, false, 'ar');
  const errors = [];
  p.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await p.goto(BASE + '/industries', { waitUntil: 'domcontentloaded' });
  await waitLoaded(p);
  await p.waitForTimeout(1200);
  report(await p.locator('svg[role="group"]').isVisible(), 'globe visible on mobile');
  const secRect = await p.evaluate(() => {
    const s = document.querySelector('section:has(svg[role="group"])');
    if (!s) return null;
    const r = s.getBoundingClientRect();
    return { left: r.left, right: r.right };
  });
  report(!!secRect && secRect.right <= 390.5 && secRect.left >= -0.5, 'globe section within viewport (no overflow)');
  report(await p.getByText('الحل الموصى به', { exact: true }).isVisible(), 'AR panel label visible');
  await p.evaluate(() => {
    const svg = document.querySelector('svg[role="group"]');
    svg?.scrollIntoView({ block: 'center' });
  });
  await p.waitForTimeout(700);
  await p.getByRole('button', { name: /Manufacturing/ }).first().click({ force: true });
  await p.waitForTimeout(1600);
  report(p.url().includes('/services/technology-consulting'), `AR tap Manufacturing node -> ${p.url()}`);
  report(errors.length === 0, `zero console errors mobile (got ${errors.length})`);
  await c.close();
}

console.log(`\n=== ${pass}/${pass + fail} CHECKS PASSED ===`);
await b.close();
process.exit(fail ? 1 : 0);
