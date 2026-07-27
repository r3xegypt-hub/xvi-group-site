// XVI GROUP — Design Review Screenshot Capture
// Captures all device/theme/language combinations

import { chromium, type Browser, type Page } from 'playwright';
import { mkdir } from 'fs/promises';
import { join } from 'path';

const BASE_URL = 'http://localhost:5173/preview';
const OUTPUT_DIR = join(process.cwd(), 'design-review');

// Device configurations
const DEVICES = {
  'desktop': { width: 1920, height: 1080 },
  'laptop': { width: 1366, height: 768 },
  'tablet-landscape': { width: 1024, height: 768 },
  'tablet-portrait': { width: 768, height: 1024 },
  'large-mobile': { width: 429, height: 926 },
  'medium-mobile': { width: 375, height: 812 },
  'small-mobile': { width: 320, height: 568 },
} as const;

// Sections to capture
const SECTIONS = [
  'navigation',
  'hero',
  'cards',
  'footer',
] as const;

async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

async function waitForPreview(page: Page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Wait for fonts + animations
}

async function clickDeviceButton(page: Page, device: string) {
  // Click the device button in the control panel
  const btn = page.locator(`button.deviceBtnActive, button`).filter({ hasText: device }).first();
  if (await btn.isVisible()) {
    await btn.click();
    await page.waitForTimeout(500);
  }
}

async function captureFullPage(page: Page, filename: string) {
  await page.screenshot({
    path: join(OUTPUT_DIR, filename),
    fullPage: true,
  });
  console.log(`  ✅ ${filename}`);
}

async function captureSection(page: Page, sectionId: string, filename: string) {
  const section = page.locator(`#${sectionId}`);
  if (await section.isVisible()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await section.screenshot({
      path: join(OUTPUT_DIR, filename),
    });
    console.log(`  ✅ ${filename}`);
  }
}

async function switchLanguage(page: Page, lang: 'en' | 'ar') {
  // Find the language toggle — use the first visible one
  const toggle = page.locator('button[role="switch"]').first();
  try {
    await toggle.waitFor({ state: 'visible', timeout: 3000 });
    const currentLang = await toggle.getAttribute('aria-checked');
    const shouldClick = (lang === 'ar' && currentLang === 'false') ||
                        (lang === 'en' && currentLang === 'true');
    if (shouldClick) {
      await toggle.click();
      await page.waitForTimeout(800);
    }
  } catch {
    console.log(`    ⚠️ Language toggle not found, skipping`);
  }
}

async function captureAllDevicesForLang(page: Page, lang: string) {
  console.log(`\n📸 Capturing ${lang.toUpperCase()} screenshots...`);

  for (const [device, size] of Object.entries(DEVICES)) {
    console.log(`\n  Device: ${device} (${size.width}×${size.height})`);

    // Set viewport
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.waitForTimeout(300);

    // Click device button in preview panel
    await clickDeviceButton(page, device);

    // Full page screenshot
    await captureFullPage(page, `${lang}/${device}-fullpage.png`);

    // Section screenshots
    for (const section of SECTIONS) {
      await captureSection(page, section, `${lang}/${device}-${section}.png`);
    }
  }
}

async function captureVideoRecording(page: Page) {
  console.log('\n🎬 Recording screen capture...');

  const videoDir = join(OUTPUT_DIR, 'video');
  await ensureDir(videoDir);

  // Start a new context for video recording
  const context = await page.context();
  const videoPage = await context.newPage();

  // Set desktop viewport
  await videoPage.setViewportSize({ width: 1920, height: 1080 });
  await videoPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await videoPage.waitForTimeout(1000);

  // Start screen recording via CDP
  const cdp = await context.newCDPSession(videoPage);

  // Record for 45 seconds with interactions
  const chunks: Buffer[] = [];
  let recording = true;

  // Use page.screenshot repeatedly to create frames
  console.log('  Recording frames...');

  const frames: Buffer[] = [];
  const startTime = Date.now();
  const duration = 45000; // 45 seconds

  while (Date.now() - startTime < duration && recording) {
    const elapsed = Date.now() - startTime;

    // Interact based on time
    if (elapsed < 5000) {
      // Show navigation
      await videoPage.locator('#navigation').scrollIntoViewIfNeeded();
    } else if (elapsed < 10000) {
      // Show hero
      await videoPage.locator('#hero').scrollIntoViewIfNeeded();
    } else if (elapsed < 15000) {
      // Show cards
      await videoPage.locator('#cards').scrollIntoViewIfNeeded();
    } else if (elapsed < 20000) {
      // Switch to laptop view
      await videoPage.setViewportSize({ width: 1366, height: 768 });
      await videoPage.waitForTimeout(300);
    } else if (elapsed < 25000) {
      // Switch to tablet
      await videoPage.setViewportSize({ width: 768, height: 1024 });
      await videoPage.waitForTimeout(300);
    } else if (elapsed < 30000) {
      // Switch to mobile
      await videoPage.setViewportSize({ width: 375, height: 812 });
      await videoPage.waitForTimeout(300);
    } else if (elapsed < 35000) {
      // Switch language to Arabic
      await switchLanguage(videoPage, 'ar');
      await videoPage.waitForTimeout(500);
    } else if (elapsed < 40000) {
      // Show navigation in Arabic
      await videoPage.locator('#navigation').scrollIntoViewIfNeeded();
    } else {
      // Switch back to desktop English
      await switchLanguage(videoPage, 'en');
      await videoPage.setViewportSize({ width: 1920, height: 1080 });
      await videoPage.waitForTimeout(500);
    }

    // Capture frame
    const screenshot = await videoPage.screenshot({ type: 'png' });
    frames.push(screenshot);

    // Wait ~200ms between frames (5fps is enough for demo)
    await videoPage.waitForTimeout(200);
  }

  // Save frames as individual PNGs (user can convert to video)
  console.log(`  Captured ${frames.length} frames`);
  const { writeFile } = await import('fs/promises');

  for (let i = 0; i < Math.min(frames.length, 50); i++) {
    const frameNum = String(i).padStart(3, '0');
    await writeFile(join(videoDir, `frame-${frameNum}.png`), frames[i]);
  }
  console.log(`  ✅ Saved ${Math.min(frames.length, 50)} frames to video/`);

  await videoPage.close();
}

async function main() {
  console.log('🏦 XVI GROUP — Design Review Screenshot Capture\n');

  // Create output directory
  await ensureDir(OUTPUT_DIR);

  // Launch browser with system Chrome
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  // Wait for dev server
  console.log('⏳ Waiting for dev server...');
  await waitForPreview(page);
  console.log('✅ Dev server ready\n');

  // === CAPTURE ENGLISH ===
  await switchLanguage(page, 'en');
  await captureAllDevicesForLang(page, 'en');

  // === CAPTURE ARABIC ===
  await switchLanguage(page, 'ar');
  await captureAllDevicesForLang(page, 'ar');

  // === CAPTURE VIDEO FRAMES ===
  await captureVideoRecording(page);

  // Close browser
  await browser.close();

  console.log('\n✅ All screenshots captured!');
  console.log(`📁 Output: ${OUTPUT_DIR}`);
  console.log('\nTo create a video from frames:');
  console.log('  ffmpeg -framerate 5 -i video/frame-%03d.png -c:v libx264 -pix_fmt yuv420p video/design-review.mp4');
}

main().catch(console.error);
