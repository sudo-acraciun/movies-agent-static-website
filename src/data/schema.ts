// Shared schema.org entity nodes.
//
// Every page used to emit its own anonymous Organization (and the app entity
// lived only on the homepage). Search engines and AI answer engines merge
// nodes that share an @id across a site, so defining the app, the organization
// and the website ONCE here, each with a stable @id, is what lets a small brand
// build a single Knowledge Graph entity instead of a scatter of look-alikes.
// This is the on-site half of the entity signal; the off-site half is sameAs.
//
// Same rules as site.ts and comparisons.ts: only claims true of the shipped
// build, and never Review or aggregateRating, which with no real reviews reads
// as spam a parser can catch.

import { SITE } from './site';

// sameAs is the corroboration a Knowledge Graph node is built from: it tells an
// engine that the Play listing, the directory pages, the Wikidata item and the
// social profiles all describe ONE thing. Only pages we control or have
// verified live belong here; a dead or wrong URL teaches the wrong entity,
// which is worse than teaching nothing.
//
// The Play URL is the bare listing, not SITE.playUrl: the referrer parameter
// attributes installs, and an identity claim should point at the canonical page
// rather than a tracked variant of it.
export const SAME_AS = [
  'https://play.google.com/store/apps/details?id=com.moviesagent.app',
  'https://theresanaiforthat.com/ai/i-like-movies/',
  'https://alternativeto.net/software/i-like-movies/',
  'https://www.saashub.com/ilikemovies-app',
  'https://www.wikidata.org/wiki/Q141150329',
  'https://x.com/ilikemoviesapp',
  'https://www.tiktok.com/@ilikemoviesapp',
  'https://www.instagram.com/ilikemoviesapp',
  'https://www.youtube.com/@ilikemoviesapp',
  'https://www.facebook.com/profile.php?id=61593335430358',
];

// Stable entity identifiers. Fragment ids on the canonical origin, so the URI
// is global and byte-identical on every page that references the node, which is
// the property that lets an engine merge them.
export const ENTITY_IDS = {
  app: `${SITE.url}/#app`,
  org: `${SITE.url}/#org`,
  website: `${SITE.url}/#website`,
} as const;

const LOGO = new URL('/icon-512.png', SITE.url).href;

// The one Organization node, referenced by @id everywhere else. Carries the
// full sameAs and a logo, so any single page corroborates the entity on its own.
export const organizationNode = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ENTITY_IDS.org,
  name: SITE.name,
  url: SITE.url,
  logo: LOGO,
  email: SITE.supportEmail,
  address: {
    '@type': 'PostalAddress',
    addressCountry: SITE.operatorCountry,
  },
  sameAs: SAME_AS,
};

// A bare {@id} pointer to the Organization, for author/publisher fields that
// must resolve to the node above rather than mint a new anonymous one.
export const organizationRef = { '@id': ENTITY_IDS.org };

// The one MobileApplication node. MobileApplication rather than the broader
// SoftwareApplication because the product is a phone app and the subtype says
// so directly. This full node is emitted on the homepage.
export const mobileApplicationNode = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  '@id': ENTITY_IDS.app,
  name: SITE.name,
  applicationCategory: 'EntertainmentApplication',
  applicationSubCategory: 'Movie and TV discovery and tracking',
  operatingSystem: 'Android',
  url: SITE.url,
  downloadUrl: SITE.playUrl,
  installUrl: SITE.playUrl,
  description: SITE.definition,
  inLanguage: 'en',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  },
  featureList: [
    'AI movie and TV recommendations generated from your own ratings',
    'AI chat assistant for recommendations in plain language',
    'Follow friends and compare taste',
    'Shared household watchlist and watched history',
    'Streaming availability by country',
    'TV episode level progress tracking',
    'Viewing statistics by genre and country of origin',
    'Import from Letterboxd and IMDb',
  ],
  author: {
    '@type': 'Person',
    name: 'Alexandru Craciun',
  },
  publisher: organizationRef,
  sameAs: SAME_AS,
};

// A compact MobileApplication node for pages OTHER than the homepage: the same
// @id as the full node, so an engine merges the two, without repeating the
// feature list on every page. Emitting it on the /vs pages puts the app entity
// directly on the exact pages that surface for non-brand comparison queries.
export const appStubNode = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  '@id': ENTITY_IDS.app,
  name: SITE.name,
  applicationCategory: 'EntertainmentApplication',
  operatingSystem: 'Android',
  url: SITE.url,
};

// A bare {@id} pointer to the app, for an Article's `about` field.
export const appRef = { '@id': ENTITY_IDS.app };

// The WebSite node, publisher resolved to the shared Organization by @id.
export const webSiteNode = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': ENTITY_IDS.website,
  name: SITE.name,
  url: SITE.url,
  description: SITE.definition,
  publisher: organizationRef,
};

// A bare {@id} pointer to the WebSite, for an Article's `isPartOf` field.
export const webSiteRef = { '@id': ENTITY_IDS.website };

export type Crumb = { label: string; href?: string };

// Builds a BreadcrumbList node from an ordered trail. The last crumb is the
// current page and carries no href. One source feeds both the visible
// breadcrumb nav and this structured-data node (see ArticleLayout), so the two
// cannot drift apart.
export function breadcrumbList(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: new URL(item.href, SITE.url).href } : {}),
    })),
  };
}
