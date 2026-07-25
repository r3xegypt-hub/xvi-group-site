import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ 
  headless: true,
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 3000));
await page.screenshot({ path: 'screenshot-homepage.png', fullPage: false });
await browser.close();
console.log('Screenshot saved: screenshot-homepage.png');