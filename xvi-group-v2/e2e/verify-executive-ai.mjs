import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';
const DOCK = 'div[style*="bottom: 100px"]';
const RESP = '[data-testid="xvi-dock-ai-response"]';

const results = [];
function report(ok, msg) {
  results.push(ok);
  console.log(`  [${ok ? 'ok' : 'FAIL'}] ${msg}`);
}

async function init(page, lang) {
  await page.addInitScript(([l]) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', String(Date.now()));
    localStorage.setItem('xviConciergeSeen', 'true');
    sessionStorage.removeItem('xvi-executive-memory');
    sessionStorage.removeItem('xvi-journey');
  }, [lang]);
}

async function openDock(page, lang) {
  const label = lang === 'ar' ? 'المستشار التنفيذي الذكي' : 'Executive AI Concierge';
  await page.locator(`[aria-label="${label}"]`).waitFor({ state: 'visible', timeout: 20000 });
  await page.locator(`[aria-label="${label}"]`).click();
  await page.locator(DOCK).waitFor({ state: 'visible', timeout: 10000 });
}

async function submitText(page, text) {
  await page.locator(DOCK + ' input').fill(text);
  await page.locator(DOCK + ' input').press('Enter');
}

// Submit and wait for the latest AI reply to differ from prevText.
async function getReply(page, text, prevText) {
  await submitText(page, text);
  const resp = page.locator(RESP);
  const start = Date.now();
  let last = prevText;
  while (Date.now() - start < 12000) {
    if (await resp.isVisible().catch(() => false)) {
      const t = ((await resp.textContent()) || '').trim();
      if (t && t !== prevText) return t;
      last = t;
    }
    await page.waitForTimeout(200);
  }
  return last;
}

async function assertNoContactFallback(page, label) {
  const scope = page.locator(RESP);
  const whatsapp = await scope.getByText('Send via WhatsApp', { exact: false }).count();
  const contact = await scope.getByText('Contact Us →', { exact: false }).count();
  report(whatsapp === 0 && contact === 0, `${label}: no contact/WhatsApp fallback (${whatsapp}/${contact})`);
}

async function assertNoContactFallbackAr(page, label) {
  const scope = page.locator(RESP);
  const whatsapp = await scope.getByText('أرسل عبر واتساب', { exact: false }).count();
  const contact = await scope.getByText('تواصل معنا', { exact: false }).count();
  report(whatsapp === 0 && contact === 0, `${label}: no contact/WhatsApp fallback (${whatsapp}/${contact})`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // ============ T06 — Natural greetings (EN) ============
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');

    const cases = [
      ['Hi', 'Executive AI Consultant'],
      ['Hello', 'Executive AI Consultant'],
      ['Hey', 'Executive AI Consultant'],
      ['Good morning', 'Good morning'],
      ['Good evening', 'Good evening'],
    ];
    let prev = '';
    for (const [text, expect] of cases) {
      const body = await getReply(page, text, prev);
      prev = body;
      report(body.includes(expect), `EN greeting "${text}" answered naturally (got "${body.slice(0, 50)}...")`);
      await assertNoContactFallback(page, `EN greeting "${text}"`);
    }
    await ctx.close();
  }

  // ============ T06 — Natural greetings (AR) ============
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'ar');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');

    const cases = [
      ['هاي', 'مستشارك التنفيذي الذكي'],
      ['اهلا', 'مستشارك التنفيذي الذكي'],
      ['ازيك', 'أنا بخير والحمد لله'],
      ['السلام عليكم', 'وعليكم السلام'],
      ['صباح الخير', 'صباح الخير'],
      ['الو', 'المستشار التنفيذي لـ XVI'],
    ];
    let prev = '';
    for (const [text, expect] of cases) {
      const body = await getReply(page, text, prev);
      prev = body;
      report(body.includes(expect), `AR greeting "${text}" answered naturally (got "${body.slice(0, 50)}...")`);
      await assertNoContactFallbackAr(page, `AR greeting "${text}"`);
    }
    await ctx.close();
  }

  // ============ T07 — Intent detection (no keyword search, no contact) ============
  {
    const cases = [
      ['I need an app', 'mobile app', 'recommend', 'Mobile App Development'],
      ['I need AI', 'AI system', 'recommend', 'AI Strategy & Consulting'],
      ['I need automation', 'automation system', 'recommend', 'Automation Architecture'],
      ['I have a project', 'project', 'recommend', null],
    ];
    for (const [text, labelExpect, recIntro, recService] of cases) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await init(page, 'en');
      await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
      await openDock(page, 'en');

      const body = await getReply(page, text, '');
      report(body.includes(labelExpect), `Intent "${text}" classified (${labelExpect})`);
      report(body.includes(recIntro), `Intent "${text}" recommends services`);
      if (recService) report(body.includes(recService), `Intent "${text}" lists ${recService}`);
      report(/industry/i.test(body), `Intent "${text}" then asks a question (industry)`);
      await assertNoContactFallback(page, `Intent "${text}"`);
      await ctx.close();
    }
  }

  // ============ T08 — Consultant flow (industry -> goal -> timeline -> size -> recommend) ============
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');

    let prev = '';
    let body = await getReply(page, 'I have a project', prev);
    report(/industry/i.test(body), 'T08: step 1 asks Industry');
    prev = body;

    body = await getReply(page, 'Healthcare', prev);
    report(/goal/i.test(body), 'T08: step 2 asks Goal');
    prev = body;

    body = await getReply(page, 'reduce operating costs', prev);
    report(/timeline/i.test(body), 'T08: step 3 asks Timeline');
    prev = body;

    body = await getReply(page, '6 months', prev);
    report(/company or team/i.test(body), 'T08: step 4 asks Company size');
    prev = body;

    body = await getReply(page, '50 people', prev);
    report(/tailored recommendation/i.test(body), 'T08: recommends after the four answers');
    report(body.includes('Healthcare') && body.includes('50 people'), 'T08: recommendation reflects collected context');
    report(body.includes('Business Consulting') && body.includes('AI Integration'), 'T08: recommendation lists concrete services');
    await assertNoContactFallback(page, 'T08');
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
