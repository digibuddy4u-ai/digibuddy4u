import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, '..');
const publicDir = path.join(clientRoot, 'public');
const distDir = path.join(clientRoot, 'dist');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  sharp = (await import(path.join(clientRoot, 'node_modules', 'sharp', 'dist', 'index.mjs'))).default;
}

/**
 * Packs multiple PNG image buffers into a valid binary ICO format.
 * Structure per Microsoft ICO specs:
 * - 6-byte ICONDIR header
 * - 16-byte ICONDIRENTRY per image
 * - Raw PNG byte payloads
 */
function createIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved. Must always be 0.
  header.writeUInt16LE(1, 2); // Image type: 1 for icon (.ICO)
  header.writeUInt16LE(images.length, 4); // Number of images

  let offset = 6 + (16 * images.length);
  const dirEntries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0); // Width: 0 means 256
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1); // Height: 0 means 256
    entry.writeUInt8(0, 2); // Color count: 0 if no palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes: 1
    entry.writeUInt16LE(32, 6); // Bits per pixel: 32 (RGBA)
    entry.writeUInt32LE(img.data.length, 8); // Size of image data in bytes
    entry.writeUInt32LE(offset, 12); // Offset of image data from beginning of file
    dirEntries.push(entry);
    offset += img.data.length;
  }

  return Buffer.concat([header, ...dirEntries, ...images.map((img) => img.data)]);
}

export async function generateFaviconAssets() {
  const svgPath = path.join(publicDir, 'favicon.svg');
  if (!fs.existsSync(svgPath)) {
    throw new Error(`Source favicon.svg not found at ${svgPath}`);
  }

  const svgBuffer = fs.readFileSync(svgPath);
  console.log(`🔍 Read original vector logo symbol: ${svgPath} (${svgBuffer.length} bytes)`);

  // Target dimensions specified by user and Google Search Central guidelines:
  // Google Search requires multiples of 48px square (48x48, 96x96, 192x192).
  // Standard desktop and mobile require 32x32, 180x180 (Apple), 192x192 & 512x512 (PWA/Android).
  const targets = [
    { filename: 'favicon-32x32.png', size: 32 },
    { filename: 'favicon-48x48.png', size: 48 }, // Primary Google Search requirement
    { filename: 'favicon-96x96.png', size: 96 }, // Google Search 2x
    { filename: 'favicon-192x192.png', size: 192 }, // Google Search 4x / Android Chrome
    { filename: 'favicon-512x512.png', size: 512 }, // Android PWA splash
    { filename: 'apple-touch-icon.png', size: 180 }, // iOS Safari home screen
    { filename: 'favicon.png', size: 96 }, // Generic modern fallback
  ];

  const generatedFiles = [];

  for (const target of targets) {
    const pngBuffer = await sharp(svgBuffer)
      .resize(target.size, target.size)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();

    const targetPath = path.join(publicDir, target.filename);
    fs.writeFileSync(targetPath, pngBuffer);
    generatedFiles.push({ filename: target.filename, size: `${target.size}x${target.size}`, bytes: pngBuffer.length });
    console.log(`  ✓ Generated ${target.filename} (${target.size}×${target.size}px, ${pngBuffer.length} bytes)`);
  }

  // Generate multi-resolution favicon.ico containing 16x16, 32x32, and 48x48 icons
  const ico16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const ico32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const ico48 = await sharp(svgBuffer).resize(48, 48).png().toBuffer();

  const icoBuffer = createIco([
    { width: 16, height: 16, data: ico16 },
    { width: 32, height: 32, data: ico32 },
    { width: 48, height: 48, data: ico48 },
  ]);

  const icoPath = path.join(publicDir, 'favicon.ico');
  fs.writeFileSync(icoPath, icoBuffer);
  generatedFiles.push({ filename: 'favicon.ico', size: '16x16, 32x32, 48x48 (multi-res)', bytes: icoBuffer.length });
  console.log(`  ✓ Generated favicon.ico (multi-res 16, 32, 48px, ${icoBuffer.length} bytes)`);

  // Generate / update site.webmanifest
  const webManifest = {
    name: 'DigiBuddy4U',
    short_name: 'DigiBuddy4U',
    description: 'Digital Marketing & Growth Agency in Ahmedabad, Gujarat',
    start_url: '/',
    display: 'standalone',
    background_color: '#071A38',
    theme_color: '#071A38',
    icons: [
      {
        src: '/favicon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/favicon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };

  const manifestPath = path.join(publicDir, 'site.webmanifest');
  fs.writeFileSync(manifestPath, JSON.stringify(webManifest, null, 2), 'utf8');
  console.log(`  ✓ Generated site.webmanifest`);

  // Also sync to dist if dist exists
  if (fs.existsSync(distDir)) {
    for (const item of [...targets, { filename: 'favicon.ico' }, { filename: 'site.webmanifest' }]) {
      const src = path.join(publicDir, item.filename);
      const dst = path.join(distDir, item.filename);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dst);
      }
    }
    console.log(`  ✓ Synced favicon assets directly into dist/ directory`);
  }

  return generatedFiles;
}

// Allow direct CLI execution: `node scripts/generateFavicons.mjs`
if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  try {
    const assets = await generateFaviconAssets();
    console.log(`\n🎉 Successfully generated ${assets.length} favicon assets for Google Search Central!`);
  } catch (err) {
    console.error('❌ Failed to generate favicon assets:', err);
    process.exit(1);
  }
}
