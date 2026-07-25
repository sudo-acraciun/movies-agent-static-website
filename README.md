# ilikemovies.app

Presentation website for **I Like Movies**, the movie and TV tracking app.
Static site, built with Astro, deployed to GitHub Pages at
[ilikemovies.app](https://ilikemovies.app).

Related repositories:

- `movies-agent-be` — Go backend (gqlgen, Postgres)
- `movies-agent-app` — React Native / Expo mobile client
- `movienight` — legal pages and share deep-link redirector, hosted separately
  at `sudo-acraciun.github.io/movienight/`. Those URLs are referenced by
  published Play Console fields and by shipped app builds, so they must keep
  working at their current addresses and are **not** migrating here.

## Commands

```bash
npm install
npm run dev      # local dev server on :4321
npm run build    # static build into dist/
npm run preview  # serve dist/ locally
npm run check    # astro check (types + template diagnostics)
npm run assets   # regenerate og-image.png and app icons from the brand SVGs
```

Deployment is automatic: any push to `main` runs `.github/workflows/deploy.yml`,
which builds and publishes to GitHub Pages.

## Why the site is built the way it is

The site has two jobs. One is to be a link you can paste anywhere that works on
both platforms. The other is to be readable by generative search, which is why
several decisions below look stricter than a marketing page normally warrants.

**No client-side JavaScript.** The build emits zero JS files. AI crawlers
execute little or no JavaScript, so anything rendered on the client does not
exist to them. The FAQ accordion uses native `<details>` for the same reason:
the answers stay in the HTML source whether or not a section is open.

**One source for all copy.** `src/data/site.ts` holds every user-facing string.
The FAQ in particular is rendered twice, once as visible markup and once as
`FAQPage` JSON-LD, and a mismatch between them is a structured-data violation.
Rendering both from one array makes drift impossible.

**Only true claims.** Copy describes what the shipped build does. Premium
pricing is absent because the freemium entitlement is gated behind
`HAS_FREEMIUM_ENABLED`, unset in production, so nothing is purchasable yet.
`aggregateRating` is absent from the JSON-LD because there is no real Play
rating yet, and inventing one is a Google spam signal.

**The iOS button is disabled, not linked.** `SITE.appStoreUrl` is `null`. When
the App Store listing exists, setting that one constant turns the "Coming soon"
badge into a live link everywhere it appears.

**`robots.txt` names AI crawlers explicitly.** Being read is the point of this
site, so `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`,
`Google-Extended`, `Applebot-Extended` and others are allowed by name rather
than left to a catch-all. Re-check those user-agent strings periodically;
vendors rename and add agents.

## Screenshots

Six captures live in `src/assets/screenshots/`, each from a real screen:

| File | App screen | Used by |
| --- | --- | --- |
| `library.png` | `app/(tabs)/library.tsx` | hero, back frame |
| `movie-detail.png` | `app/movies/[id]` | hero, front frame |
| `discover.png` | `app/(tabs)/discover.tsx` | Discover block |
| `assistant.png` | `app/chat.tsx` | Assistant block |
| `feed.png` | `app/(tabs)/feed.tsx` | Friends block |
| `household.png` | `app/(tabs)/library.tsx`, grouped view | Household block |

The hero uses `library` and `movie-detail` specifically because no section
below repeats them, so the first thing a visitor scrolls into is new rather
than a second look at the hero.

They live in `src/assets/`, **not** `public/`. That is what routes them
through `astro:assets`, which emits AVIF and WebP with a raster fallback at
two widths and builds a `srcset`. Anything in `public/` ships byte-for-byte at
one size in one format. Feature blocks are matched to a capture by `Feature.id`
via the `SHOTS` map in `src/pages/index.astro`.

### Replacing or adding a capture

Raw phone screenshots are not usable as-is: they carry notification badges,
VPN and Do Not Disturb icons, and the Android navigation bar.
`scripts/prep-screenshot.mjs` handles both steps.

```bash
# 1. Find the status-bar icon columns and the gap above the nav bar
node scripts/prep-screenshot.mjs inspect <raw.png>

# 2. Erase OS chrome and crop, using boxes from step 1
node scripts/prep-screenshot.mjs clean <raw.png> <out.png> <cropHeight> \
  '[{"left":186,"top":34,"width":50,"height":82,"what":"notification badge"}]'
```

The erase is a fill, never a reconstruction. It samples a ring around each box
and **refuses** if the surroundings are not flat, because a flat fill over
texture leaves a visible rectangle. In practice the sampled median comes back
as `#0A0D14`, which is `INK` in the mobile app's `brand.ts`.

Send captures as PNG. A screenshot forwarded through a chat app as a *photo*
arrives as a recompressed 4:2:0 JPEG, which mangles coloured text on dark
backgrounds and cannot be recovered. `inspect` warns when the source is a JPEG.

## Design tokens

Colours in `Layout.astro` mirror the mobile app's `src/constants/brand.ts` and
`src/constants/colors.ts`, and the logo geometry is copied from
`src/components/brand/logo-mark.svg`. There is no build-time link between the
repositories, so a palette change in the app has to be carried over here by
hand.
