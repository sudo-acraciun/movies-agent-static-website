// IndexNow for a site with no server. Before a deploy, `diff` lists the sitemap
// pages whose built bytes differ from what the live site serves; after it,
// `submit` sends exactly those. Byte equality is a sound test only because the
// build is deterministic: an unchanged page rebuilds to the bytes already live.
//
//   node scripts/indexnow.mjs diff             "<url> <sha256>" per changed page, "<url> -" per deleted one
//   node scripts/indexnow.mjs submit < list    waits until each serves its new bytes, then submits
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const SITE = 'https://ilikemovies.app';
// Must equal the name and the content of public/<KEY>.txt, or IndexNow answers 403.
const KEY = '1e13a1c96f725261920289de9c647fb2';

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

// A hung request must not hang the deploy job, which waits on this step.
async function fetchBytes(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    return { status: res.status, bytes: Buffer.from(await res.arrayBuffer()) };
  } catch {
    return { status: 0, bytes: null };
  }
}

// build.format 'file' (astro.config.mjs): /x/y is served from x/y.html, / from index.html.
function distFile(url) {
  const path = new URL(url).pathname;
  return path === '/' ? 'dist/index.html' : `dist${decodeURIComponent(path)}.html`;
}

async function distPages() {
  const pages = [];
  for (const sitemap of locs(await readFile('dist/sitemap-index.xml', 'utf8'))) {
    pages.push(...locs(await readFile(`dist${new URL(sitemap).pathname}`, 'utf8')));
  }
  return pages;
}

// The live sitemap adds pages this build deleted; unreadable means none known.
async function livePages() {
  const index = await fetchBytes(`${SITE}/sitemap-index.xml`);
  if (index.status !== 200) return [];
  const pages = [];
  for (const sitemap of locs(index.bytes.toString('utf8'))) {
    const res = await fetchBytes(sitemap);
    if (res.status === 200) pages.push(...locs(res.bytes.toString('utf8')));
  }
  return pages;
}

// One flaky fetch must not mark an unchanged page as changed, so anything but
// a clean answer is asked again. A 404 is final: the page is new.
async function liveMatches(url, built) {
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 1_000));
    const live = await fetchBytes(url);
    if (live.status === 404) return false;
    if (live.status === 200 && built.equals(live.bytes)) return true;
  }
  return false;
}

// When the live answer stays unclear, the page counts as changed: an extra
// submission costs nothing, a missed one leaves the engine on the old page.
async function diff() {
  for (const url of new Set([...(await distPages()), ...(await livePages())])) {
    const built = await readFile(distFile(url)).catch(() => null);
    if (built === null) {
      if ((await fetchBytes(url)).status !== 404) console.log(`${url} -`);
    } else if (!(await liveMatches(url, built))) {
      console.log(`${url} ${sha256(built)}`);
    }
  }
}

async function submit() {
  let input = '';
  for await (const chunk of process.stdin) input += chunk;
  const pending = new Map(
    input
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.split(' ')),
  );
  if (pending.size === 0) return console.log('IndexNow: nothing changed.');
  const urlList = [...pending.keys()];

  // GitHub Pages answers with max-age=600, so a page can serve its old bytes
  // for a while after the deploy. Submit once each serves the new ones, so the
  // engine's fetch reads the new page.
  const deadline = Date.now() + 10 * 60_000;
  while (pending.size > 0 && Date.now() < deadline) {
    for (const [url, expected] of pending) {
      const live = await fetchBytes(url);
      const fresh =
        expected === '-' ? live.status === 404 : live.status === 200 && sha256(live.bytes) === expected;
      if (fresh) pending.delete(url);
    }
    if (pending.size > 0) await new Promise((resolve) => setTimeout(resolve, 15_000));
  }
  if (pending.size > 0) {
    console.warn(`IndexNow: still stale after 10 minutes, submitting anyway: ${[...pending.keys()].join(' ')}`);
  }

  const keyLocation = `${SITE}/${KEY}.txt`;
  const keyFile = await fetchBytes(keyLocation);
  if (keyFile.status !== 200 || keyFile.bytes.toString('utf8') !== KEY) {
    throw new Error(`IndexNow: ${keyLocation} does not serve the key (HTTP ${keyFile.status})`);
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation, urlList }),
    signal: AbortSignal.timeout(30_000),
  });
  if (res.status !== 200 && res.status !== 202) {
    throw new Error(`IndexNow: HTTP ${res.status} ${await res.text()}`);
  }
  console.log(`IndexNow: HTTP ${res.status}, ${urlList.length} URLs: ${urlList.join(' ')}`);
}

const mode = process.argv[2];
if (mode === 'diff') await diff();
else if (mode === 'submit') await submit();
else {
  console.error('usage: node scripts/indexnow.mjs diff | submit');
  process.exit(2);
}
