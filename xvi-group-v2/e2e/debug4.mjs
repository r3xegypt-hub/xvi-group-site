import { chromium } from 'playwright';

const BASE = 'http://localhost:5173/xvi-group-site';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const showLinks = async (label) => {
    const links = await page.locator('a').evaluateAll(els => els.map(el => ({
      text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
      href: el.getAttribute('href')
    })));
    console.log(`\n--- ${label} (${links.length} links) ---`);
    links.filter(l => l.text && !l.href?.startsWith('http')).forEach(l => console.log(`  "${l.text}" → ${l.href}`));
  };

  page.on('pageerror', e => console.log('PAGE ERROR:', e.message));

  // Test each page with goto
  for (const p of ['/', '/services', '/industries', '/about', '/contact', '/careers']) {
    await page.goto(`${BASE}${p}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    console.log(`\n${p} → ${page.url()}`);
    await showLinks(p);
  }

  await browser.close();
})();
