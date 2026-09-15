# SEO / GEO Content Expansion — Plan of Action

Grow the indexable + LLM-citable footprint on `ilikemovies.app` without touching
the mobile app, and without diluting the homepage conversion funnel.

## Principles (decided)

- **Public + indexable only.** Logged-in features earn zero SEO/GEO. The
  web chatbot idea is parked — it is a product/web-access decision, not a
  footprint one, and does nothing for crawlers or answer engines.
- **Unique curated value, never a TMDB clone.** Movie/person info pages are a
  thin clone of data everyone holds; Google's Helpful-Content system demotes
  mass auto-generated pages, so they carry downside, not just "no gain." Every
  page here has to say something that exists nowhere else — a curated order, a
  taste-driven list, an honest comparison.
- **Evergreen beats recurring.** Evergreen pages (comparisons, watch-orders,
  ranked lists) are curated once and keep earning. Recurring pages (weekly
  themes, festivals) tax maintenance forever. Weight the roadmap toward
  evergreen.

## Baseline — what already ships (do not rebuild)

- **Comparisons** — `/vs/[slug]`, data-driven from `src/data/comparisons.ts`,
  plus `/from-tv-time`. Already the best-built asset.
- **Franchise watch-orders** — 4 pages (Marvel / Star Wars / Dune / LOTR),
  data-driven from `src/data/watchOrders.ts` + `WatchOrderPage.astro`.
- **Mood/occasion** — seeded by `/what-to-watch-together`.
- **Blog** — `ArticleLayout.astro` + one post.
- **SEO plumbing (mature).** `Layout.astro` injects canonical, OG/Twitter,
  JSON-LD (via `jsonLd` prop), and the sitemap link. Pages already emit
  `Article` + `FAQPage` + `ItemList` schema. No schema work needed — reuse it.

## Integration model — the load-bearing decision

The site has two proven **scale patterns**: a data module (`watchOrders.ts`,
`comparisons.ts`) + a page/layout that generates every page from it. New content
follows that pattern. It does **not** get new nav.

- **Appbar stays untouched.** `Header.astro` is three homepage anchors plus the
  "Get the app" CTA — a conversion funnel. Adding SEO links dilutes it.
- **Footer gains exactly one link.** Today the standalone pages are
  sitemap-only, sibling-cross-linked orphans (`WatchOrderPage.astro` links the
  other watch-orders precisely because "these pages have no footer or header
  slot"). That means no internal front door and almost no internal PageRank
  flow into the network. Fix: a single hub page, linked once from the footer.
- **New content = new data-module entry + auto-generated page.** Never an
  appbar edit.

## Phase 0 — Wiring (FIRST; unblocks everything)

Publishing more content into an orphan network wastes it. Wire the front door
before adding rooms.

- **Build the hub** `/guides` (or `/explore`): one page listing every guide,
  list, watch-order and comparison, grouped by type. Data-driven — iterate the
  existing data modules so new entries appear automatically. Emit
  `CollectionPage` + `ItemList` schema.
- **Footer:** add one "Guides" link in the Explore column of `Footer.astro`.
- **Satellite pages:** add a "More guides" / back-to-hub cross-link on
  `WatchOrderPage.astro`, `vs/[slug].astro`, and the new listicle layout, so
  cross-type paths exist (a comparison can reach a watch-order via the hub).
- **Homepage:** one contextual inline link from the "curated tracks" bullet into
  the hub, for PageRank flow — no nav item added.
- **Acceptance:** every satellite page reachable in ≤2 clicks from `/`; sitemap
  still auto-includes all pages (`@astrojs/sitemap` emits every page except the
  `/share` redirector — new pages need no manual entry); `astro build` green.

## Phase 1 — Evergreen expansion (highest ROI)

- **Extend `watchOrders.ts`** with more franchises drawn from the mobile app's
  seeded tracks (anime universes, Harry Potter, etc.). Reuse the pattern —
  effectively zero new code, one data entry per page.
- **New listicles route:** `src/data/listicles.ts` + `/list/[slug]` +
  `ListicleLayout.astro`, generalizing `what-to-watch-together`. Seed 3-5 pages
  (best-X, ranked filmographies, mood/occasion). **Differentiator = the app's
  own user-taste data** — the one angle competitors cannot copy.
- **Expand `/vs`:** add comparison entries for Trakt, IMDb, Letterboxd, Simkl,
  Serializd as capacity allows. Data-only additions.
- **Acceptance:** each page emits `ItemList` + `FAQPage`; developer-authored
  comparisons keep the `DISCLOSURE` block and a "where the competitor is better"
  section; every page carries the app-install CTA.

## Phase 2 — Recurring + profiles

- **Weekly themes:** `src/data/themes.ts` + `/themes` archive index +
  `/themes/[slug]`. Reuse the mobile weekly-themes curation so the content is
  authored once. The archive index is required (unlike the evergreen types)
  because weekly rotation needs a listing page.
- **Mood/occasion** folds into the Phase 1 listicles route.
- **Public profiles** `/u/[handle]` — the separate O6 track (design Sep, build
  Oct-Nov, backend-driven). Once live, link profiles into `/guides`.

## Phase 3 — Content engine (ongoing)

- Batch new listicles monthly.
- **Festivals — backlog only.** Lowest ROI: off-core, maintenance-heavy,
  out-authoritied by official festival sites and trade press, weak install
  conversion. Do only with spare capacity.

## Guardrails

- No movie-info clone pages (penalty risk).
- No em dashes in copy (brand voice).
- "AI" never in an H1 or short description.
- Every developer-authored comparison keeps `DISCLOSURE` + the "better there"
  section — the GEO baseline showed models discount roundups where the author
  ranks themselves first.
- Match the existing data-module + layout convention. New content should look
  like it was always there.

## Per-new-page checklist

- schema.org: `Article` / `ItemList` / `FAQPage` as fits
- canonical + OG via `Layout` (`path` + `jsonLd` props)
- app-install CTA present
- GEO phrasing — headers written as the literal question a user asks an LLM
- cross-link: hub + 1-2 siblings
- appears in sitemap (automatic)
