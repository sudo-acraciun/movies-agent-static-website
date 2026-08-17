// Copy for the /vs/ comparison pages and the blocks they share.
//
// Same contract as site.ts: one source of truth, because every FAQ here is
// rendered twice, once as visible <details> markup and once inside FAQPage
// JSON-LD, and the two copies must never drift apart.
//
// Editorial rules specific to comparison content, on top of the site-wide
// copy rules (no em dashes, only claims true of the shipped build):
//
//   - The developer-conflict disclosure renders at the top of every page,
//     before any claim. In the GEO baseline, roundups where a developer
//     ranked their own product first were flagged and discounted by the
//     models reading them. A page that wins every row earns the same
//     discount, so these pages do not try to win every row.
//   - Every page has a "where <competitor> is better" section rendered with
//     the same visual weight as everything else, not greyed down.
//   - JSON-LD is Article + FAQPage only. Never Review or aggregateRating:
//     a developer scoring his own product is a lie a parser can read.
//   - Competitor claims stay factual and generous. A hostile framing gets
//     quoted just as readily as a helpful one, and reads worse.

import { SITE } from './site';

export type Faq = { q: string; a: string[] };

export type TableRow = {
  feature: string;
  /** What I Like Movies does. Plain statement, "Yes"/"No" allowed. */
  ilm: string;
  /** What the competitor does. Same register, no loaded phrasing. */
  other: string;
};

export type Point = { title: string; body: string };

export type Comparison = {
  /** URL segment under /vs/. */
  slug: string;
  competitor: string;
  /** <title> tag. */
  title: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  /** Where the competitor is the better choice. Equal visual weight. */
  betterThere: Point[];
  /** What is genuinely different here, not "what we do better". */
  differences: Point[];
  table: TableRow[];
  /** How an existing library moves across, or plainly that it cannot. */
  migration: string[];
  verdict: string[];
  faqs: Faq[];
};

// Rendered before any claim on every comparison page and both guides.
export const DISCLOSURE =
  'This page is written by the developer of I Like Movies. A comparison written by one side is not neutral, so it names where the other app is the better choice and does not score anything.';

// Shared across all comparison pages. Saying plainly what the app does not
// do is what makes the rest of the page believable, and it heads off the
// worst outcome a comparison page can produce: a disappointed install.
export const NOT_DO: string[] = [
  'There is no iPhone app yet. I Like Movies is Android only today; an iOS version is in development.',
  'There is no automatic tracking. Nothing scrobbles from a media server, a browser or a streaming app; you mark things watched yourself.',
  'There are no public reviews. Notes are private, and there is no feed of strangers to read.',
  'There is no web app. The library lives on the server, but you reach it from the phone app.',
  'There is no offline mode. The app needs an internet connection.',
  'Imports read a Letterboxd .zip or an IMDb .csv only. There is no importer for Trakt, Simkl or TV Time exports.',
];

export const COMPARISONS: Comparison[] = [
  {
    slug: 'letterboxd',
    competitor: 'Letterboxd',
    title: 'I Like Movies vs Letterboxd, compared by the developer',
    metaDescription:
      'An honest comparison of I Like Movies and Letterboxd: TV episode tracking, private notes vs public reviews, households, imports, and where Letterboxd is simply better.',
    h1: 'I Like Movies vs Letterboxd',
    intro: [
      'Letterboxd is the social network for film lovers. It is where film culture happens online: reviews, lists, diaries, and the pleasure of reading what someone sharper than you thought of the film you just finished.',
      'I Like Movies is a different kind of app. It is built for deciding what to watch tonight and keeping the record afterwards, for films and TV together, privately, with the people you live with. This page lays out where each one fits.',
    ],
    betterThere: [
      {
        title: 'The community',
        body: 'Letterboxd has the largest film community on the internet. If you want your reviews read, want to follow critics and friends, or discover films through other people’s lists, nothing else comes close. I Like Movies has following and taste comparison between friends, not a public town square.',
      },
      {
        title: 'Reviews and film writing',
        body: 'Writing and reading reviews is the product on Letterboxd, and the culture around it is genuinely good. Here, notes are private by default and there is no public review at all.',
      },
      {
        title: 'iPhone, Android and the web',
        body: 'Letterboxd runs everywhere. I Like Movies is Android only today, with an iOS version in development. If you are on an iPhone, Letterboxd is the one you can actually install.',
      },
      {
        title: 'Years of diary culture',
        body: 'The Letterboxd diary, the year-in-review stats and the list ecosystem have had a decade to mature. A younger app does not have that depth of ritual around it.',
      },
    ],
    differences: [
      {
        title: 'TV is in the same library',
        body: 'Letterboxd tracks films. I Like Movies tracks films and TV series in one library, down to individual episodes, and can tell a series that has ended from one between seasons.',
      },
      {
        title: 'Private by default',
        body: 'Ratings and notes are yours. Nothing you write is published, and there is no audience to perform for. Some people find that freeing; some people are on Letterboxd precisely for the audience.',
      },
      {
        title: 'A household shares one library',
        body: 'The people you live with can share a single watchlist and watched history, so a film added on one phone is on the other before you sit down.',
      },
      {
        title: 'An AI assistant you can ask in plain language',
        body: 'Ask for something short and funny for a Tuesday, or the film with the submarine and the cook, and it answers with real titles, filtered against what you have already seen and what streams in your country.',
      },
      {
        title: 'Streaming availability up front',
        body: 'Every title shows which services carry it in your country. Deciding and finding out you can actually watch it are the same step.',
      },
    ],
    table: [
      { feature: 'Platforms', ilm: 'Android (iOS in development)', other: 'iOS, Android, web' },
      { feature: 'TV and episode tracking', ilm: 'Yes, per episode', other: 'No, films only' },
      { feature: 'Public reviews', ilm: 'No, notes are private', other: 'Yes, the core of the app' },
      { feature: 'Community and lists culture', ilm: 'Friends and taste comparison', other: 'The largest film community online' },
      { feature: 'Shared household library', ilm: 'Yes', other: 'No' },
      { feature: 'AI recommendations', ilm: 'Yes, from your own ratings', other: 'No' },
      { feature: 'Streaming availability', ilm: 'Yes, per country', other: 'Yes, on film pages' },
      { feature: 'Import', ilm: 'Letterboxd .zip, IMDb .csv', other: 'Letterboxd is the source here' },
      { feature: 'Price', ilm: 'Free, no ads', other: 'Free with ads; Pro and Patron tiers' },
    ],
    migration: [
      'Moving is direct: request your data export from Letterboxd, which arrives as a .zip file, and upload it in I Like Movies under Imports. Ratings, watched films and your watchlist come across together.',
      'Nothing is sent back to Letterboxd and your account there is untouched, so trying the app costs nothing but the upload.',
    ],
    verdict: [
      'If film reviews and the community around them are why you track films, stay on Letterboxd. It is the best at that, and this page will not pretend otherwise.',
      'If you want films and TV in one private library, a watchlist your household shares, and help deciding what to watch tonight on Android, that is the problem I Like Movies is built for, and the Letterboxd import means you do not start from zero.',
    ],
    faqs: [
      {
        q: 'Can I import my Letterboxd history into I Like Movies?',
        a: [
          'Yes. Request a data export from Letterboxd, which arrives as a .zip file, then upload that file in the app under Imports. Ratings, watched films and your watchlist are read from the export and matched against the film database.',
        ],
      },
      {
        q: 'Does Letterboxd track TV shows?',
        a: [
          'No. Letterboxd is built for films and does not track TV series. I Like Movies tracks films and TV in one library, at episode level.',
        ],
      },
      {
        q: 'Is I Like Movies a social network like Letterboxd?',
        a: [
          'Not in the same sense. You can follow friends, see what they watch and rate, and compare taste, but there are no public reviews and no feed of strangers. Letterboxd is a public community; I Like Movies is closer to a private library with friends attached.',
        ],
      },
      {
        q: 'Is I Like Movies free?',
        a: [
          'Yes, free with no advertising. Letterboxd is also free to use, with ads, and sells Pro and Patron subscriptions that remove ads and add statistics.',
        ],
      },
    ],
  },
  {
    slug: 'trakt',
    competitor: 'Trakt',
    title: 'I Like Movies vs Trakt, compared by the developer',
    metaDescription:
      'An honest comparison of I Like Movies and Trakt: automatic scrobbling vs a phone-first app, ecosystems, households, AI recommendations, and where Trakt is simply better.',
    h1: 'I Like Movies vs Trakt',
    intro: [
      'Trakt is the tracking backbone of the home-media world. It records what you watch automatically from media servers and players, and a whole ecosystem of apps is built on top of it.',
      'I Like Movies is a phone app with no setup, aimed at the moment before you press play rather than the record of having pressed it. Which one fits depends almost entirely on how you watch.',
    ],
    betterThere: [
      {
        title: 'Automatic tracking',
        body: 'This is the reason Trakt exists. Plex, Kodi, Infuse and a long list of players scrobble to it, so your history writes itself. I Like Movies has no scrobbling at all; you mark things watched yourself. If you run a media server, Trakt is the right tool and this page will save you the install.',
      },
      {
        title: 'The ecosystem',
        body: 'Trakt’s API powers dozens of third-party apps, and your Trakt account follows you across all of them. I Like Movies is one app, not a platform.',
      },
      {
        title: 'Cross-platform reach',
        body: 'Trakt has a full web app and clients on effectively everything. I Like Movies is Android only today, with iOS in development.',
      },
      {
        title: 'Depth of history features',
        body: 'Years of check-ins, comments, lists and VIP statistics. A mature product with a decade of accumulated features for people who love the record itself.',
      },
    ],
    differences: [
      {
        title: 'Nothing to set up',
        body: 'No media server, no connections, no player integrations. Install the app, import from Letterboxd or IMDb if you have a history there, and it works.',
      },
      {
        title: 'Built for deciding, not just recording',
        body: 'AI collections rebuilt monthly from your own ratings, an assistant you can ask in plain language, and streaming availability per country. Trakt records what you watched; this is mostly about what you watch next.',
      },
      {
        title: 'A household shares one library',
        body: 'One watchlist and one watched history for the people you live with. Trakt accounts are personal; lists can be shared, but there is no shared household library.',
      },
      {
        title: 'No ads at any tier',
        body: 'I Like Movies has no advertising. Trakt is free with ads and sells VIP to remove them and unlock extras.',
      },
    ],
    table: [
      { feature: 'Platforms', ilm: 'Android (iOS in development)', other: 'Web, iOS, Android, many third-party apps' },
      { feature: 'Automatic scrobbling', ilm: 'No', other: 'Yes, from media servers and players' },
      { feature: 'TV and episode tracking', ilm: 'Yes, per episode', other: 'Yes, per episode' },
      { feature: 'AI recommendations', ilm: 'Yes, from your own ratings', other: 'No' },
      { feature: 'Shared household library', ilm: 'Yes', other: 'No, personal accounts' },
      { feature: 'Streaming availability', ilm: 'Yes, per country', other: 'Yes' },
      { feature: 'Third-party app ecosystem', ilm: 'No', other: 'Yes, a large one' },
      { feature: 'Import', ilm: 'Letterboxd .zip, IMDb .csv', other: 'Several importers' },
      { feature: 'Price', ilm: 'Free, no ads', other: 'Free with ads; VIP subscription' },
    ],
    migration: [
      'There is no Trakt import, and it is better you know that before installing. Imports read a Letterboxd .zip or an IMDb .csv, and a Trakt export is neither, so a Trakt library starts fresh here and rebuilds as you use the app. Marking a season watched takes a tap.',
    ],
    verdict: [
      'If your watching flows through Plex, Kodi or anything that scrobbles, stay on Trakt. Manual tracking after years of automatic tracking feels like a downgrade because it is one.',
      'If you watch on streaming apps, track by hand anyway, and want the deciding half of the problem solved on your phone, with your household on one list, I Like Movies is built for exactly that.',
    ],
    faqs: [
      {
        q: 'Can I import my Trakt history into I Like Movies?',
        a: [
          'No. Imports read a Letterboxd .zip or an IMDb .csv export, and a Trakt export is a different format. A Trakt library starts fresh here. If your ratings also live on Letterboxd or IMDb, importing from there recovers most of it.',
        ],
      },
      {
        q: 'Does I Like Movies scrobble from Plex or Kodi?',
        a: [
          'No. There is no automatic tracking of any kind. You mark films and episodes watched yourself. If scrobbling is essential to you, Trakt is the better choice.',
        ],
      },
      {
        q: 'Does I Like Movies track episodes like Trakt does?',
        a: [
          'Yes. TV series are tracked at episode level, with season progress, and the app distinguishes a series that has ended from one between seasons.',
        ],
      },
      {
        q: 'Is I Like Movies free?',
        a: [
          'Yes, free with no advertising. Trakt is free with ads and offers a VIP subscription that removes them and adds features.',
        ],
      },
    ],
  },
  {
    slug: 'simkl',
    competitor: 'Simkl',
    title: 'I Like Movies vs Simkl, compared by the developer',
    metaDescription:
      'An honest comparison of I Like Movies and Simkl: anime tracking, auto-tracking extensions, households, AI recommendations, and where Simkl is simply better.',
    h1: 'I Like Movies vs Simkl',
    intro: [
      'Simkl tracks TV, anime and films across the web and mobile, with browser extensions that can record what you watch on streaming sites automatically. It is especially strong for anime.',
      'I Like Movies is a phone-first app for films and TV, built around deciding what to watch next and sharing one library with the people you live with. The overlap is real, and so are the differences.',
    ],
    betterThere: [
      {
        title: 'Anime as a first-class citizen',
        body: 'Simkl treats anime as its own medium, with the season structures, statuses and community that anime tracking needs. I Like Movies carries anime as ordinary TV series and films, which works, but an anime-first tracker it is not.',
      },
      {
        title: 'Automatic tracking',
        body: 'Simkl’s browser extensions can log what you watch on streaming sites by themselves. I Like Movies has no automatic tracking; you mark things watched yourself.',
      },
      {
        title: 'A web app',
        body: 'Simkl works in a browser on any machine. I Like Movies is a phone app only, Android today with iOS in development.',
      },
      {
        title: 'Import breadth',
        body: 'Simkl imports from a long list of other services. I Like Movies reads a Letterboxd .zip or an IMDb .csv and nothing else.',
      },
    ],
    differences: [
      {
        title: 'Built for the decision',
        body: 'AI collections rebuilt monthly from your own ratings, an assistant you can ask in plain language, and streaming availability per country, all pointed at the question of what to watch tonight.',
      },
      {
        title: 'A household shares one library',
        body: 'One watchlist and one watched history for the people you live with, so nobody has to remember whose list the film is on.',
      },
      {
        title: 'Private notes, no public profile pressure',
        body: 'Ratings and notes are private by default. Friends you follow see activity, strangers see nothing.',
      },
      {
        title: 'No ads',
        body: 'No advertising at any point. Simkl is free with ads and premium tiers.',
      },
    ],
    table: [
      { feature: 'Platforms', ilm: 'Android (iOS in development)', other: 'Web, iOS, Android' },
      { feature: 'Anime-specific tracking', ilm: 'As ordinary TV and films', other: 'Yes, first-class' },
      { feature: 'Automatic tracking', ilm: 'No', other: 'Yes, via browser extensions' },
      { feature: 'TV and episode tracking', ilm: 'Yes, per episode', other: 'Yes, per episode' },
      { feature: 'AI recommendations', ilm: 'Yes, from your own ratings', other: 'Limited suggestions' },
      { feature: 'Shared household library', ilm: 'Yes', other: 'No' },
      { feature: 'Streaming availability', ilm: 'Yes, per country', other: 'Yes' },
      { feature: 'Import', ilm: 'Letterboxd .zip, IMDb .csv', other: 'Many sources' },
      { feature: 'Price', ilm: 'Free, no ads', other: 'Free with ads; premium tiers' },
    ],
    migration: [
      'There is no Simkl import. Imports read a Letterboxd .zip or an IMDb .csv, so a Simkl library starts fresh here. If your film ratings also live on Letterboxd or IMDb, importing from there carries those across; TV progress is set as you go, and marking a season watched takes a tap.',
    ],
    verdict: [
      'If anime is a big part of what you watch, or you want your streaming automatically logged from a browser, Simkl is the better fit and you should use it.',
      'If your watching is films and TV on a phone, you want help deciding what is next, and the people you live with should see one list instead of three, that is what I Like Movies is for.',
    ],
    faqs: [
      {
        q: 'Can I import my Simkl history into I Like Movies?',
        a: [
          'No. Imports read a Letterboxd .zip or an IMDb .csv export only. A Simkl library starts fresh here, though film ratings that also exist on Letterboxd or IMDb can come across from those exports.',
        ],
      },
      {
        q: 'Does I Like Movies track anime?',
        a: [
          'Yes, as ordinary TV series and films, at episode level. What it does not have is anime-specific structure: no separate anime lists, statuses or seasonal charts. If anime tracking is the main event, Simkl or a dedicated anime tracker serves it better.',
        ],
      },
      {
        q: 'Does I Like Movies track automatically like Simkl extensions do?',
        a: [
          'No. There is no automatic tracking. You mark films and episodes watched yourself, and marking a whole season takes a tap.',
        ],
      },
      {
        q: 'Is I Like Movies free?',
        a: [
          'Yes, free with no advertising. Simkl is free with ads and sells premium tiers.',
        ],
      },
    ],
  },
];

// Feeds getStaticPaths and the guides' cross-links.
export const COMPARISON_PATHS = COMPARISONS.map((c) => `/vs/${c.slug}`);

export { SITE };
