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

async function getReply(page, text, prevText = '') {
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

async function allIn(body, items, label) {
  for (const item of items) report(body.includes(item), `${label}: contains "${item}"`);
}

async function noContactMention(body, label) {
  const forbidden = ['Send via WhatsApp', 'Contact Us →', 'تواصل معنا ←', 'أرسل عبر واتساب'];
  const hits = forbidden.filter((f) => body.includes(f));
  report(hits.length === 0, `${label}: no contact/WhatsApp mention (${hits.join(', ') || 'none'})`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // ============ T09 — Smart recommendations with WHY ============
  {
    const cases = [
      {
        text: 'I need an ecommerce website',
        checks: [
          ['Website / E-commerce Development', 'T09 ecommerce: Website service'],
          ['UI/UX Design', 'T09 ecommerce: UI/UX service'],
          ['AI Integration', 'T09 ecommerce: AI Integration service'],
          ['Analytics', 'T09 ecommerce: Analytics service'],
          ['Automation', 'T09 ecommerce: Automation service'],
          ['storefront', 'T09 ecommerce: each recommendation explains WHY'],
        ],
      },
      {
        text: 'I need a mobile app',
        checks: [
          ['Mobile App Development', 'T09 mobile: Mobile App Development service'],
          ['UI/UX Design', 'T09 mobile: UI/UX service'],
          ['Backend & API Architecture', 'T09 mobile: Backend & API service'],
          ['abandon confusing apps', 'T09 mobile: recommendation explains WHY'],
        ],
      },
    ];
    for (const c of cases) {
      const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await ctx.newPage();
      await init(page, 'en');
      await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
      await openDock(page, 'en');
      const body = await getReply(page, c.text, '');
      for (const [needle, label] of c.checks) report(body.includes(needle), `${label} (got "${body.slice(0, 60)}...")`);
      await noContactMention(body, c.text);
      await ctx.close();
    }
  }

  // ============ T10 — Unknown project handling ============
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');

    let prev = '';
    let body = await getReply(page, 'quantum teleportation machine', prev);
    prev = body;
    report(body.includes('Business Consulting'), 'T10: closest service #1 suggested');
    report(body.includes('Technology Consulting'), 'T10: closest service #2 suggested');
    report(body.includes('AI Integration'), 'T10: closest service #3 suggested');
    report(/why each one matters|closest matching/i.test(body), 'T10: explains WHY for closest services');
    report(/outcome/i.test(body), 'T10: asks a follow-up question');
    await noContactMention(body, 'T10 first exchange');

    body = await getReply(page, 'semantic lattice engine', prev);
    prev = body;
    report(/outcome/i.test(body), 'T10: still asks follow-up (no contact yet)');
    await noContactMention(body, 'T10 second exchange');

    body = await getReply(page, 'biofeedback crystal array', prev);
    prev = body;
    report(/formal consultation request/i.test(body), 'T10: offers contact after several exchanges');
    const btn = page.locator(RESP).locator('button').filter({ hasText: 'Request a Formal Consultation' });
    report(await btn.count() > 0, 'T10: "Request a Formal Consultation" button present');
    if (await btn.count() > 0) {
      await btn.first().click({ force: true });
      await page.waitForTimeout(2000);
      report(page.url().includes('/contact'), 'T10: formal consultation button opens /contact');
    }
    await ctx.close();
  }

  // ============ T12 — Executive Project Estimation ============
  const cases = [
    {
      text: 'How much would an ecommerce website cost?',
      label: 'T12 ecommerce',
      services: ['Website / E-commerce Development', 'UI/UX Design'],
      phases: ['Discovery', 'Development'],
      team: ['Business Consultant', 'UI/UX Designer', 'Frontend Developer', 'Backend Developer', 'QA Engineer'],
      duration: '8–12 weeks',
      tech: ['React', 'Next.js', 'Node.js', 'Cloud Infrastructure'],
      understanding: 'e-commerce',
    },
    {
      text: 'How much for a mobile app?',
      label: 'T12 mobile',
      services: ['Mobile App Development'],
      phases: ['Discovery', 'App development'],
      team: ['Mobile Developer', 'Backend Developer', 'QA Engineer'],
      duration: '8–12 weeks',
      tech: ['React Native', 'Flutter', 'Cloud Infrastructure'],
      understanding: 'mobile app',
    },
    {
      text: 'estimate for an AI chatbot',
      label: 'T12 chatbot',
      services: ['Conversational AI'],
      phases: ['Discovery', 'Bot development'],
      team: ['AI Engineer', 'UI/UX Designer'],
      duration: '6–8 weeks',
      tech: ['Python', 'LLM / GenAI'],
      understanding: 'conversational',
    },
    {
      text: 'how much does an ERP system cost',
      label: 'T12 erp',
      services: ['ERP'],
      phases: ['Process discovery', 'Solution architecture'],
      team: ['ERP Consultant', 'Business Consultant'],
      duration: '8–12 weeks',
      tech: ['PostgreSQL', 'Cloud Infrastructure'],
      understanding: 'business system',
    },
    {
      text: 'give me an estimate',
      label: 'T12 unknown',
      services: ['Business Consulting', 'Technology Consulting', 'AI Integration'],
      phases: ['Discovery', 'Solution design'],
      team: ['Business Consultant', 'Frontend Developer'],
      duration: '4–12 weeks',
      tech: ['React', 'Cloud Infrastructure'],
      understanding: 'discovery',
    },
  ];
  for (const c of cases) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');
    const body = await getReply(page, c.text, '');
    report(body.includes('Preliminary Executive Estimation'), `${c.label}: estimation card rendered`);
    report(body.includes('Project Understanding'), `${c.label}: section 1 understanding`);
    report(body.includes('Suggested Implementation Phases'), `${c.label}: section 2 phases`);
    report(body.includes('Recommended XVI GROUP Services'), `${c.label}: section 3 services`);
    report(body.includes('Suggested Implementation Team'), `${c.label}: section 4 team`);
    report(body.includes('Estimated Duration'), `${c.label}: section 5 duration`);
    report(body.includes('Suggested Technologies'), `${c.label}: section 6 technologies`);
    await allIn(body, c.services, c.label + ' services');
    await allIn(body, c.phases, c.label + ' phases');
    await allIn(body, c.team, c.label + ' team');
    await allIn(body, [c.duration], c.label + ' duration');
    await allIn(body, c.tech, c.label + ' tech');
    report(body.includes(c.understanding), `${c.label}: understanding reflects project (${c.understanding})`);
    report(/formal consultation request/i.test(body), `${c.label}: finishes with OFFER_LINE`);
    await noContactMention(body, c.label);
    await ctx.close();
  }

  // ============ T12 — Estimation via project intake path ============
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'en');

    let prev = '';
    let body = await getReply(page, 'I need a website', prev);
    prev = body;
    body = await getReply(page, 'Real Estate', prev);
    prev = body;
    body = await getReply(page, 'increase leads', prev);
    prev = body;
    body = await getReply(page, '3 months', prev);
    prev = body;
    body = await getReply(page, '20 people', prev);
    report(body.includes('Preliminary Executive Estimation'), 'T12 intake path: estimation delivered after intake');
    report(body.includes('4–6 weeks'), 'T12 intake path: website duration shown');
    report(/formal consultation request/i.test(body), 'T12 intake path: finishes with OFFER_LINE');
    await noContactMention(body, 'T12 intake path');
    await ctx.close();
  }

  // ============ T12 — Arabic estimation ============
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'ar');
    await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
    await openDock(page, 'ar');

    const body = await getReply(page, 'كم تكلفة تطبيق جوال؟', '');
    report(body.includes('التقدير المبدئي الاستشاري'), 'T12 AR: estimation card header (AR)');
    report(body.includes('مطور تطبيقات جوال'), 'T12 AR: team includes Mobile Developer (AR)');
    report(body.includes('8–12 أسابيع'), 'T12 AR: duration (AR)');
    report(body.includes('طلب استشارة رسمي'), 'T12 AR: OFFER_LINE (AR)');
    await ctx.close();
  }

  // ============ T11 — Contact vs AI separation (site-level) ============
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await init(page, 'en');
    await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);

    const aiCta = page.locator('button').filter({ hasText: 'Talk to the Executive AI' }).first();
    report(await aiCta.isVisible().catch(() => false), 'T11: "Talk to the Executive AI" CTA present');
    if (await aiCta.isVisible().catch(() => false)) {
      await aiCta.click({ force: true });
      await page.waitForTimeout(1000);
      const dockOpen = await page.locator(DOCK).isVisible().catch(() => false);
      report(dockOpen, 'T11: AI CTA opens the AI Concierge (dock)');
      report(page.url().includes('/contact'), 'T11: AI CTA did NOT navigate away from /contact');
      const closeBtn = page.locator(DOCK + ' button', { has: page.locator('svg.lucide-x') }).first();
      if (await closeBtn.isVisible().catch(() => false)) { await closeBtn.click({ force: true }); await page.waitForTimeout(600); }
    }

    const contactCta = page.locator('a').filter({ hasText: 'Contact Us' }).first();
    report(await contactCta.isVisible().catch(() => false), 'T11: "Contact Us" CTA present');
    if (await contactCta.isVisible().catch(() => false)) {
      await contactCta.click({ force: true });
      await page.waitForTimeout(1500);
      report(page.url().includes('/contact'), 'T11: "Contact Us" opens /contact');
      const dockOpen2 = await page.locator(DOCK).isVisible().catch(() => false);
      report(!dockOpen2, 'T11: "Contact Us" does NOT open the dock');
    }
    await ctx.close();
  }

  await browser.close();
  const passed = results.filter(Boolean).length;
  console.log(`\n=== ${passed}/${results.length} CHECKS PASSED ===`);
  process.exit(passed === results.length ? 0 : 1);
})().catch((e) => { console.error('Fatal:', e); process.exit(1); });
