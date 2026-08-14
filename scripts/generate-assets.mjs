// Rasterises the brand SVGs into the PNG assets that have to be PNGs.
//
// Why not just reference the SVG: link-preview scrapers (WhatsApp, Discord,
// Slack, iMessage, X) do not render SVG for og:image, and neither does iOS for
// apple-touch-icon. Those two surfaces need real bitmaps or they fall back to
// a blank grey card, which is exactly the moment the link is being shared.
//
// Run with: npm run assets
// Output is committed, so this script does not run in CI.

import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

// Logo geometry copied from the mobile app's src/components/brand/logo-mark.svg.
const MARK = `
  <path d="M 70 64 L 186 64 L 240 224 L 16 224 Z" fill="#C8372D"/>
  <path d="M 82 64 L 174 64 L 212 224 L 44 224 Z" fill="#E8833A"/>
  <path d="M 96 64 L 160 64 L 184 224 L 72 224 Z" fill="#F5C518"/>
  <path d="M 110 64 L 146 64 L 156 224 L 100 224 Z" fill="#FFF8E7"/>
  <rect x="64" y="48" width="128" height="22" rx="3" fill="#F5C518"/>
  <rect x="64" y="48" width="128" height="6" fill="#FFF8E7"/>
  <circle cx="128" cy="206" r="14" fill="#0A0D14"/>
`;

const iconSvg = (radius) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <rect width="256" height="256" rx="${radius}" fill="#0A0D14"/>
  ${MARK}
</svg>`;

// 1200x630 is the size every major scraper crops to. Text is set generously
// large because the card is usually rendered at a third of this width.
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="warm" cx="18%" cy="22%" r="70%">
      <stop offset="0%" stop-color="#C8372D" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0A0D14" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="gold" cx="82%" cy="12%" r="60%">
      <stop offset="0%" stop-color="#F5C518" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0A0D14" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F5C518"/>
      <stop offset="50%" stop-color="#E8833A"/>
      <stop offset="100%" stop-color="#C8372D"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#0A0D14"/>
  <rect width="1200" height="630" fill="url(#warm)"/>
  <rect width="1200" height="630" fill="url(#gold)"/>

  <g transform="translate(84 74) scale(0.42)">${MARK}</g>
  <text x="204" y="146" fill="#FFF8E7" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="40" font-weight="700" letter-spacing="-0.5">I Like Movies</text>

  <text x="84" y="330" fill="#FFFFFF" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="74" font-weight="800" letter-spacing="-2.5">Everything you have watched.</text>
  <text x="84" y="418" fill="#F5C518" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="74" font-weight="800" letter-spacing="-2.5">Everything you are going to.</text>

  <rect x="84" y="466" width="180" height="6" rx="3" fill="url(#rule)"/>

  <text x="84" y="546" fill="#94A3B8" font-family="Segoe UI, Helvetica, Arial, sans-serif"
        font-size="31" font-weight="500">Find what to watch, together. Free on Android.</text>
</svg>`;

async function main() {
  await mkdir(publicDir, { recursive: true });

  await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, 'og-image.png'));

  // apple-touch-icon is composited onto a rounded rect by iOS itself, so the
  // source is drawn square. The 512 is the generic large icon.
  await sharp(Buffer.from(iconSvg(0))).resize(180, 180).png().toFile(join(publicDir, 'icon-180.png'));
  await sharp(Buffer.from(iconSvg(56))).resize(512, 512).png().toFile(join(publicDir, 'icon-512.png'));

  await writeFile(
    join(publicDir, 'site.webmanifest'),
    JSON.stringify(
      {
        name: 'I Like Movies',
        short_name: 'I Like Movies',
        description:
          'Free movie and TV app for Android. Discover what to watch with an AI assistant, share one library with your household, and track everything you have seen.',
        start_url: '/',
        display: 'browser',
        background_color: '#0A0D14',
        theme_color: '#0A0D14',
        icons: [{ src: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
      },
      null,
      2,
    ) + '\n',
  );

  console.log('assets written to public/');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
