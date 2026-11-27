import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, '..');
const publicClientsDir = path.join(clientRoot, 'public', 'images', 'clients');
const publicPortfolioDir = path.join(clientRoot, 'public', 'images', 'portfolio');

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  sharp = (await import(path.join(clientRoot, 'node_modules', 'sharp', 'dist', 'index.mjs'))).default;
}

const svg = `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg_grad" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0B132B"/>
      <stop offset="50%" stop-color="#080E1C"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="gold_grad" x1="80" y1="60" x2="320" y2="340" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FDE047"/>
      <stop offset="35%" stop-color="#F59E0B"/>
      <stop offset="70%\" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
    <linearGradient id="gold_light" x1="150" y1="50" x2="250" y2="250" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FEF08A"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </linearGradient>
  </defs>

  <!-- Luxurious Rounded Frame -->
  <rect width="400" height="400" rx="48" fill="url(#bg_grad)"/>
  <rect x="14" y="14" width="372" height="372" rx="40" stroke="url(#gold_grad)" stroke-width="2.5" stroke-dasharray="6 4" opacity="0.6"/>
  <circle cx="200" cy="200" r="168" stroke="url(#gold_grad)" stroke-width="1.5" opacity="0.4"/>

  <!-- Top Crown / Diamond Motif matching their official Instagram Reels badge -->
  <g transform="translate(200, 82)">
    <path d="M-28 -8 L0 -24 L28 -8 L18 12 L-18 12 Z" fill="none" stroke="url(#gold_light)" stroke-width="2.5"/>
    <path d="M-28 -8 L-10 12 L0 -24 L10 12 L28 -8" fill="none" stroke="url(#gold_light)" stroke-width="1.5" opacity="0.8"/>
    <circle cx="0" cy="-28" r="3.5" fill="#FEF08A"/>
    <circle cx="-32" cy="-10" r="2.5" fill="#FEF08A"/>
    <circle cx="32" cy="-10" r="2.5" fill="#FEF08A"/>
  </g>

  <!-- Brand Monogram Zzj -->
  <text x="200" y="175" text-anchor="middle" font-family="Georgia, serif" font-size="64" font-weight="bold" font-style="italic" fill="url(#gold_grad)" letter-spacing="4">Zzj</text>

  <!-- Horizontal Divider with Diamond -->
  <line x1="75" y1="202" x2="170" y2="202" stroke="url(#gold_grad)" stroke-width="1.5" opacity="0.7"/>
  <polygon points="200,196 206,202 200,208 194,202" fill="url(#gold_light)"/>
  <line x1="230" y1="202" x2="325" y2="202" stroke="url(#gold_grad)" stroke-width="1.5" opacity="0.7"/>

  <!-- Brand Name -->
  <text x="200" y="244" text-anchor="middle" font-family="'Poppins', 'Montserrat', Arial, sans-serif" font-size="28" font-weight="800" fill="#FFFFFF" letter-spacing="4">ZAM ZAM</text>
  <text x="200" y="280" text-anchor="middle" font-family="'Poppins', 'Montserrat', Arial, sans-serif" font-size="20" font-weight="600" fill="url(#gold_grad)" letter-spacing="7">JEWELLERS</text>

  <!-- Category & Location Badge -->
  <rect x="90" y="310" width="220" height="26" rx="13" fill="#F59E0B" fill-opacity="0.12" stroke="#F59E0B" stroke-width="1" stroke-opacity="0.35"/>
  <text x="200" y="327" text-anchor="middle" font-family="'Inter', Arial, sans-serif" font-size="11" font-weight="700" fill="#FDE047" letter-spacing="1.5">SARKHEJ • GOLD &amp; SILVER</text>
</svg>`;

fs.mkdirSync(publicClientsDir, { recursive: true });
fs.mkdirSync(publicPortfolioDir, { recursive: true });

const targetFile = path.join(publicClientsDir, 'zam-zam-jewellers.png');
const portfolioTargetFile = path.join(publicPortfolioDir, 'zam-zam-jewellers.png');

await sharp(Buffer.from(svg))
  .resize(400, 400)
  .png({ compressionLevel: 9 })
  .toFile(targetFile);

fs.copyFileSync(targetFile, portfolioTargetFile);

console.log(`✅ Successfully generated ${targetFile}`);
console.log(`✅ Copied to ${portfolioTargetFile}`);
