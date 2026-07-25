// Prepares a raw phone capture for use on the site.
//
//   node scripts/prep-screenshot.mjs inspect <file>
//   node scripts/prep-screenshot.mjs clean <in> <out> <cropHeight> '<eraseJSON>'
//
// Why this exists as a script rather than an eyeballed crop in an image
// editor: the two things it does both need pixel certainty.
//
//   inspect  reports the image's real geometry, the column ranges of the
//            status-bar icons, and a row-level ink profile of the bottom of
//            the frame. That profile is what identifies the empty band
//            between the app's own tab bar and the Android navigation bar,
//            so the crop lands in the gap instead of clipping app UI.
//
//   clean    erases OS chrome (notification badges, VPN, Do Not Disturb,
//            picture-in-picture bubbles) and crops the nav bar off.
//
// The erase is a FILL, never a reconstruction. Before filling, it samples a
// one-pixel ring around each box and refuses if the surrounding pixels are
// not flat, because a flat fill over texture leaves a visible rectangle. In
// practice the app's background is #0A0D14 (INK in the mobile app's
// brand.ts) and the sampled median has come back as exactly that every time.
//
// Nothing here alters app UI. If an overlay ever lands on top of a poster or
// text, this refuses and the answer is to re-shoot.

import sharp from 'sharp';

const INK_THRESHOLD = 190; // sum of R+G+B above which a pixel counts as "lit"
const FLATNESS_LIMIT = 14; // max per-channel spread tolerated in the sample ring

async function raw(file) {
  const { data, info } = await sharp(file).raw().toBuffer({ resolveWithObject: true });
  return { data, ...info };
}

async function inspect(file, y0 = 40, y1 = 110) {
  const meta = await sharp(file).metadata();
  console.log(
    'format:', meta.format,
    '| size:', meta.width + 'x' + meta.height,
    '| ratio:', (meta.width / meta.height).toFixed(4),
    '| chroma:', meta.chromaSubsampling ?? 'n/a',
  );
  if (meta.format === 'jpeg') {
    console.log('  NOTE: JPEG source. A device screenshot is PNG, so this has been');
    console.log('        recompressed in transit (WhatsApp as Photo does this).');
  }

  const { data, width, height, channels } = await raw(file);
  const lit = (x, y) => {
    const i = (y * width + x) * channels;
    return data[i] + data[i + 1] + data[i + 2] > INK_THRESHOLD;
  };

  const cols = [];
  for (let x = 0; x < width; x++) {
    let hit = false;
    for (let y = y0; y < y1 && !hit; y++) if (lit(x, y)) hit = true;
    cols.push(hit);
  }
  const groups = [];
  let start = -1;
  for (let x = 0; x <= width; x++) {
    if (cols[x] && start < 0) start = x;
    if ((!cols[x] || x === width) && start >= 0) {
      if (x - start > 2) groups.push([start, x - 1]);
      start = -1;
    }
  }
  console.log(`\ncolumn clusters (y ${y0}-${y1}):`);
  for (const [a, b] of groups) console.log('  x', a + '-' + b, '(w ' + (b - a + 1) + ')');

  console.log('\nbottom ink profile (find the gap between tab bar and nav bar):');
  for (let y = height - 220; y < height; y += 4) {
    let n = 0;
    for (let x = 0; x < width; x++) if (lit(x, y)) n++;
    console.log(' ', y, '|'.repeat(Math.min(56, Math.round(n / 6))) || '.');
  }
}

async function clean(src, out, cropHeight, erase) {
  const { data, width, channels } = await raw(src);
  const px = (x, y) => {
    const i = (y * width + x) * channels;
    return [data[i], data[i + 1], data[i + 2]];
  };

  const composites = [];
  for (const box of erase) {
    const ring = [];
    for (let x = box.left - 3; x < box.left + box.width + 3; x++) {
      ring.push(px(x, box.top - 3), px(x, box.top + box.height + 2));
    }
    for (let y = box.top - 3; y < box.top + box.height + 3; y++) {
      ring.push(px(box.left - 3, y), px(box.left + box.width + 2, y));
    }
    const med = (a) => a.slice().sort((m, n) => m - n)[Math.floor(a.length / 2)];
    const fill = [0, 1, 2].map((c) => med(ring.map((p) => p[c])));
    const spread = [0, 1, 2].map((c) => {
      const v = ring.map((p) => p[c]);
      return Math.max(...v) - Math.min(...v);
    });
    console.log(box.what, '| fill', fill, '| spread', spread);
    if (Math.max(...spread) > FLATNESS_LIMIT) {
      console.error('REFUSING to fill "' + box.what + '": surroundings are not flat.');
      console.error('A fill would leave a visible rectangle. Re-shoot without the overlay.');
      process.exit(1);
    }
    composites.push({
      input: await sharp({
        create: {
          width: box.width,
          height: box.height,
          channels: 3,
          background: { r: fill[0], g: fill[1], b: fill[2] },
        },
      }).png().toBuffer(),
      left: box.left,
      top: box.top,
    });
  }

  const patched = await sharp(src).composite(composites).png().toBuffer();
  const info = await sharp(patched)
    .extract({ left: 0, top: 0, width, height: cropHeight })
    .png({ compressionLevel: 9 })
    .toFile(out);

  console.log(
    'written', out,
    info.width + 'x' + info.height,
    'ratio', (info.width / info.height).toFixed(4),
    Math.round(info.size / 1024) + 'KB',
  );
}

// Row-level ink profile over an arbitrary band. Used to find the first row of
// the app's OWN content below the status bar, so a top crop cannot clip UI.
async function rows(file, y0, y1) {
  const { data, width, channels } = await raw(file);
  for (let y = y0; y < y1; y++) {
    let n = 0;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      if (data[i] + data[i + 1] + data[i + 2] > INK_THRESHOLD) n++;
    }
    console.log(String(y).padStart(5), '|'.repeat(Math.min(56, Math.round(n / 6))) || '.');
  }
}

// Crop only, no erasing. For taking the status bar off an already-cleaned file.
async function crop(src, out, top) {
  const meta = await sharp(src).metadata();
  const info = await sharp(src)
    .extract({ left: 0, top, width: meta.width, height: meta.height - top })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(
    src, '->', info.width + 'x' + info.height,
    'ratio', (info.width / info.height).toFixed(4),
    Math.round(info.size / 1024) + 'KB',
  );
}

const [mode, ...rest] = process.argv.slice(2);
if (mode === 'rows') await rows(rest[0], Number(rest[1]), Number(rest[2]));
else if (mode === 'crop') await crop(rest[0], rest[1], Number(rest[2]));
else if (mode === 'inspect') await inspect(rest[0], rest[1] ? Number(rest[1]) : undefined, rest[2] ? Number(rest[2]) : undefined);
else if (mode === 'clean') await clean(rest[0], rest[1], Number(rest[2]), JSON.parse(rest[3]));
else {
  console.error('usage: prep-screenshot.mjs inspect <file>');
  console.error('       prep-screenshot.mjs clean <in> <out> <cropHeight> \'<eraseJSON>\'');
  process.exit(1);
}
