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

`public/screenshots/*.svg` are **placeholders**, not real captures. They render
a labelled panel so a missing asset is obvious rather than silently ugly.

To replace them:

1. Capture the eight store screenshots from the launch build.
2. Drop the five used here into `public/screenshots/` as PNGs.
3. Update the `screenshot` paths in `src/data/site.ts` from `.svg` to `.png`.
4. Confirm the intrinsic size in `PhoneFrame.astro` still matches the capture
   aspect ratio. The `width`/`height` attributes reserve layout space before
   the image loads; a mismatch reintroduces layout shift.

## Design tokens

Colours in `Layout.astro` mirror the mobile app's `src/constants/brand.ts` and
`src/constants/colors.ts`, and the logo geometry is copied from
`src/components/brand/logo-mark.svg`. There is no build-time link between the
repositories, so a palette change in the app has to be carried over here by
hand.
