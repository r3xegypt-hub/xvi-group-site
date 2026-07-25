import sharp from 'sharp';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public', 'assets');

// Ensure directories exist
const imagesDir = join(publicDir, 'images');
const iconsDir = join(publicDir, 'icons');
if (!existsSync(imagesDir)) mkdirSync(imagesDir, { recursive: true });
if (!existsSync(iconsDir)) mkdirSync(iconsDir, { recursive: true });

// SVG to PNG conversion
async function svgToPng(svgPath, pngPath, width, height) {
  const svg = readFileSync(svgPath, 'utf-8');
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100 })
    .toFile(pngPath);
  console.log(`✓ Created ${pngPath.split('\\').pop()}`);
}

// OG Image - create JPG with dark background
async function createOgImageJpg() {
  const svgPath = join(imagesDir, 'og-image.svg');
  const jpgPath = join(imagesDir, 'og-image.jpg');
  const svg = readFileSync(svgPath, 'utf-8');
  await sharp(Buffer.from(svg))
    .resize(1200, 630, { fit: 'contain', background: { r: 6, g: 10, b: 16, alpha: 1 } })
    .jpeg({ quality: 95 })
    .toFile(jpgPath);
  console.log('✓ Created og-image.jpg');
}

// Generate all exports
async function generateExports() {
  console.log('Generating PNG exports...\n');

  // Logo PNGs (transparent background)
  await svgToPng(join(imagesDir, 'logo.svg'), join(imagesDir, 'logo.png'), 600, 200);
  await svgToPng(join(imagesDir, 'logo.svg'), join(imagesDir, 'logo@2x.png'), 1200, 400);
  await svgToPng(join(imagesDir, 'logo.svg'), join(imagesDir, 'logo@4x.png'), 2400, 800);

  // Favicon PNGs
  await svgToPng(join(iconsDir, 'favicon.svg'), join(iconsDir, 'favicon-16.png'), 16, 16);
  await svgToPng(join(iconsDir, 'favicon.svg'), join(iconsDir, 'favicon-32.png'), 32, 32);
  await svgToPng(join(iconsDir, 'favicon.svg'), join(iconsDir, 'apple-touch-icon.png'), 180, 180);

  // OG Image JPG
  await createOgImageJpg();

  console.log('\n✓ All exports generated');
}

generateExports().catch(console.error);
