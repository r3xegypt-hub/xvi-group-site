import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:5173/xvi-group-site/';

const initStorage = async (page, lang) => {
  await page.addInitScript((l) => {
    localStorage.setItem('xvi-language', l);
    localStorage.setItem('xviIntroDone', 'true');
    localStorage.setItem('xviCinematicDate', 'true');
    localStorage.setItem('xviConciergeSeen', 'true');
  }, lang);
};

const report = [];
const expect = (cond, msg) => {
  report.push({ ok: cond, msg });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);
};

const browser = await chromium.launch();
for (const lang of ['en', 'ar']) {
  const page = await browser.newPage();
  await initStorage(page, lang);

  const requests404 = [];
  page.on('requestfailed', (r) => requests404.push(`failed: ${r.url()}`));
  page.on('response', (r) => {
    if (r.status() >= 400) requests404.push(`${r.status()} ${r.url()}`);
  });

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Force-load each family; load() resolves to the matching fontfaces
  const fontsCheck = await page.evaluate(async () => {
    const names = {
      Manrope: '14px Manrope, sans-serif',
      'Space Grotesk': '14px "Space Grotesk", sans-serif',
      Alexandria: '14px Alexandria, sans-serif',
      'IBM Plex Sans Arabic': '14px "IBM Plex Sans Arabic", sans-serif',
      'Noto Naskh Arabic': '14px "Noto Naskh Arabic", sans-serif',
      'Noto Sans Arabic': '14px "Noto Sans Arabic", sans-serif',
      Cinzel: '14px Cinzel, serif',
    };
    const out = {};
    for (const [k, v] of Object.entries(names)) {
      const faces = await document.fonts.load(v, '1'); // fulfil against a digit
      out[k] = faces.length > 0;
    }
    return out;
  });

  console.log(`\n=== ${lang.toUpperCase()} fonts loaded ===`);
  for (const [name, ok] of Object.entries(fontsCheck)) {
    expect(ok, `${name} registered`);
  }

  // Verify <html> lang/dir + --font-heading var
  const vars = await page.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    return {
      lang: document.documentElement.lang,
      dir: document.documentElement.dir,
      fontHeading: s.getPropertyValue('--font-heading').trim(),
      fontBody: s.getPropertyValue('--font-body').trim(),
    };
  });
  expect(vars.lang === lang, `html lang=${lang} (got ${vars.lang})`);
  expect(vars.dir === (lang === 'ar' ? 'rtl' : 'ltr'), `html dir correct (${vars.dir})`);
  if (lang === 'ar') {
    expect(/Noto Kufi Arabic/.test(vars.fontHeading), `--font-heading is Arabic-aware (${vars.fontHeading})`);
    expect(/Alexandria/.test(vars.fontBody), `--font-body is Arabic (${vars.fontBody})`);
  } else {
    expect(/Space Grotesk/.test(vars.fontHeading), `--font-heading English (${vars.fontHeading})`);
    expect(/Manrope/.test(vars.fontBody), `--font-body English (${vars.fontBody})`);
  }

  // Actual rendered font of a heading element
  const rendered = await page.evaluate(() => {
    const h = document.querySelector('h1, h2');
    if (!h) return null;
    return getComputedStyle(h).fontFamily;
  });
  console.log(`heading h1/h2 rendered family: ${rendered}`);

  expect(requests404.filter((r) => r.includes('fonts.')).length === 0, `no font network errors (failures: ${requests404.length})`);
  console.log(`network failures: ${JSON.stringify(requests404)}`);

  await page.close();
}

await browser.close();
const fails = report.filter((r) => !r.ok).length;
console.log(`\n${report.length - fails} passed, ${fails} failed`);
process.exitCode = fails ? 1 : 0;