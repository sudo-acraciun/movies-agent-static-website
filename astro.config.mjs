// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// `site` is not cosmetic here: @astrojs/sitemap refuses to emit without it,
// and every canonical / Open Graph URL on the page is resolved against it.
// It must stay the apex domain the CNAME file points at, or the canonical
// tags will advertise a host that does not serve the page.
export default defineConfig({
  site: 'https://ilikemovies.app',
  // /share and /invite are the deep-link redirectors, for shared titles and
  // for friend / household invites: utility pages, noindex'd in their own
  // markup and excluded here so the sitemap only advertises pages meant to be
  // found.
  integrations: [
    sitemap({ filter: (page) => !page.includes('/share') && !page.includes('/invite') }),
  ],
  build: {
    // Emit /faq.html rather than /faq/index.html. GitHub Pages serves both,
    // but flat files keep the crawlable URL identical to the one in the
    // sitemap, with no trailing-slash redirect hop for a crawler to follow.
    format: 'file',
  },
});
