// Single source of truth for every user-facing string on the site.
//
// Why one file: the FAQ text has to appear in TWO places, the visible
// <details> markup and the FAQPage JSON-LD. Google treats a mismatch between
// structured data and rendered text as a structured-data violation, and it is
// the exact kind of drift that survives review because both copies look fine
// in isolation. Rendering both from one array makes the mismatch impossible.
//
// Copy rules that apply to everything in here:
//   - No em dashes. Brand voice rule, applies to all marketing surfaces.
//   - Only claims that are true of the SHIPPED build. A store listing that
//     over-promises is a Play policy problem, not just a credibility one.
//   - Premium is deliberately absent. The freemium entitlement exists in the
//     backend but ships behind HAS_FREEMIUM_ENABLED, which is unset in
//     production, so nothing is purchasable today. Advertising a price nobody
//     can pay would be a misrepresentation. Add it here when the flag flips.

export const SITE = {
  name: 'I Like Movies',
  domain: 'ilikemovies.app',
  url: 'https://ilikemovies.app',
  // Must match the contact address published in the privacy policy and terms,
  // and must be a mailbox that actually receives mail. support@ilikemovies.app
  // would look better but does not exist yet: the domain has no mail routing,
  // so a branded address here would silently drop every support request. Swap
  // it once Porkbun email forwarding is set up AND the legal pages are updated
  // to match, not before, since an inconsistent contact address splits the
  // entity across surfaces.
  supportEmail: 'alexcraciun10@gmail.com',

  // Operator jurisdiction, kept identical to the governing-law clause in the
  // published terms. Stating it is an entity signal that search engines and
  // AI answers use to disambiguate a small brand from similarly named ones.
  operatorCountry: 'Romania',

  // The definitional sentence. This exact shape (name, category, platforms,
  // price, differentiators, all in one sentence) is what generative search
  // engines lift verbatim when asked "what is X". It is duplicated as the
  // meta description on purpose.
  definition:
    'I Like Movies is a free movie and TV tracking app for Android and iOS that helps you discover what to watch next, share one library with the people you live with, and keep a record of everything you have seen.',

  tagline: 'Everything you have watched. Everything you are going to.',

  // Both store URLs. The Android one is correct and permanent; it 404s only
  // until the production listing is approved. The iOS one is null rather than
  // a guessed URL, because the app does not exist on the App Store yet and a
  // fabricated link is worse than a disabled button.
  playUrl: 'https://play.google.com/store/apps/details?id=com.moviesagent.app',
  appStoreUrl: null as string | null,

  legal: {
    privacy: 'https://sudo-acraciun.github.io/movienight/privacy-policy.html',
    terms: 'https://sudo-acraciun.github.io/movienight/terms.html',
    deleteAccount: 'https://sudo-acraciun.github.io/movienight/delete-account.html',
  },
} as const;

export type Feature = {
  id: string;
  eyebrow: string;
  title: string;
  body: string[];
  bullets: string[];
  screenshot: string;
  screenshotAlt: string;
};

// The three pillars, in the order the positioning puts them: discovery first,
// the assistant second, the social layer third. Tracking is the fourth block
// rather than the first because "another tracker" is the commodity framing we
// are deliberately not leading with.
export const FEATURES: Feature[] = [
  {
    id: 'discover',
    eyebrow: 'Discover',
    title: 'Stop scrolling. Start watching.',
    body: [
      'The hard part was never finding a film. It is deciding on one before the evening is gone.',
      'I Like Movies learns what you actually finish, not what you claim to like, and builds the shortlist from there. Curated collections group films the way you would talk about them, by franchise, by run of a series, by mood.',
    ],
    bullets: [
      'Recommendations that read your ratings, not a generic popularity chart',
      'Curated tracks for franchises and long-running series, in watch order',
      'See exactly where a title is streaming in your country before you commit',
    ],
    screenshot: '/screenshots/discover.svg',
    screenshotAlt:
      'The I Like Movies discover screen showing personalised film recommendations and curated collections',
  },
  {
    id: 'assistant',
    eyebrow: 'Ask',
    title: 'Describe the night. Get the film.',
    body: [
      'Search needs a title. Conversation does not.',
      'Ask for something short and funny for a Tuesday, or the one with the submarine and the cook, or a follow-up to what you finished last night. The assistant answers with real titles from your region, and it can see what you have already watched, so it will not send you back to it.',
    ],
    bullets: [
      'Ask in plain language, by mood, plot fragment, or half-remembered scene',
      'Answers know your history, so nothing you have already seen comes back',
      'Send a voice message or a photo of a list and it reads the titles for you',
    ],
    screenshot: '/screenshots/assistant.svg',
    screenshotAlt:
      'The I Like Movies chat assistant answering a request for a film recommendation with real titles',
  },
  {
    id: 'together',
    eyebrow: 'Together',
    title: 'One shelf for the whole sofa.',
    body: [
      'Two people, two watchlists, and a half-finished series nobody can agree on. Households fix that.',
      'Everyone you live with shares one library. What you add, they see. What they finish, you know about. Follow friends outside the house to compare taste and steal from their lists.',
    ],
    bullets: [
      'A household shares one watchlist and one watched history',
      'Follow friends, compare taste, and see what they are watching now',
      'Share any title straight into a chat, and it opens in their app',
    ],
    screenshot: '/screenshots/together.svg',
    screenshotAlt:
      'The I Like Movies household screen showing a shared watchlist between members of the same home',
  },
  {
    id: 'track',
    eyebrow: 'Track',
    title: 'A record that is actually yours.',
    body: [
      'Rate what you have seen, keep the note you wrote at midnight, and let the series you are three episodes into stop being a mystery.',
      'Bring your history with you. Letterboxd and IMDb exports import in a few taps, so you are not starting from an empty shelf.',
    ],
    bullets: [
      'Ratings, private notes, and rewatches for films and TV alike',
      'Episode-level progress, so you know exactly where you stopped',
      'Import your existing history from Letterboxd or IMDb',
    ],
    screenshot: '/screenshots/track.svg',
    screenshotAlt:
      'The I Like Movies profile screen showing watched films, ratings and viewing statistics',
  },
];

// Secondary features. Small cards, no screenshots, kept factual. These exist
// mostly for long-tail search: someone querying "movie tracker with episode
// tracking" needs those words present in the HTML.
export const CAPABILITIES = [
  {
    title: 'Streaming availability',
    body: 'See which services carry a title in your country, checked per region rather than assumed from a US catalogue.',
  },
  {
    title: 'Episode tracking',
    body: 'Mark individual episodes, see how far into a season you are, and get told when a series has actually ended.',
  },
  {
    title: 'Your own lists',
    body: 'Build lists for a marathon, a genre, a director, or an evening. No fixed categories to fight against.',
  },
  {
    title: 'Ratings and notes',
    body: 'Rate out of five stars and keep a private note on anything. The note is yours, not a public review.',
  },
  {
    title: 'Import your history',
    body: 'A Letterboxd .zip export or an IMDb .csv export uploads directly, ratings and watchlist included.',
  },
  {
    title: 'No ads, ever',
    body: 'No advertising, no sponsored rows, no engagement feed. The recommendations answer to you.',
  },
];

export type Faq = { q: string; a: string };

// The single highest-value block for generative search, because AI answers are
// assembled from question-shaped content. Answers are written flat and factual
// on purpose. Marketing voice here actively hurts: it makes a paragraph less
// quotable, and a paraphrased answer is a lost citation.
export const FAQS: Faq[] = [
  {
    q: 'Is I Like Movies free?',
    a: 'Yes. I Like Movies is free to download and free to use, with no advertising and no sponsored recommendations.',
  },
  {
    q: 'Which platforms does I Like Movies run on?',
    a: 'I Like Movies is available for Android on Google Play. An iOS version for iPhone is in development and is not on the App Store yet.',
  },
  {
    q: 'Can I import my Letterboxd history into I Like Movies?',
    a: 'Yes. Request a data export from Letterboxd, which arrives as a .zip file, then upload that file in the app under Imports. Your ratings, watched films and watchlist are matched and added to your library.',
  },
  {
    q: 'Can I import my IMDb ratings and watchlist?',
    a: 'Yes. Export your ratings or a list from IMDb as a .csv file and upload it in the app under Imports. The app detects whether the file is a watchlist or a custom list.',
  },
  {
    q: 'Can two people share one watchlist?',
    a: 'Yes. A household in I Like Movies is a shared library for the people you live with. Everyone in the household sees the same watchlist and the same watched history, so a film added by one person shows up for everyone.',
  },
  {
    q: 'Does I Like Movies track TV shows and individual episodes?',
    a: 'Yes. TV series are tracked at episode level, so the app records exactly which episodes you have watched and how far into a season you are, alongside films in the same library.',
  },
  {
    q: 'Does I Like Movies show where a film is streaming?',
    a: 'Yes. Each title lists the streaming services that carry it in your country. Availability is region specific rather than taken from a single global catalogue.',
  },
  {
    q: 'How is I Like Movies different from Letterboxd?',
    a: 'Letterboxd is built around public reviews and film criticism as a social activity. I Like Movies is built around deciding what to watch tonight and keeping a private record, with a shared household library, streaming availability by country, TV episode tracking, and an assistant you can ask in plain language.',
  },
  {
    q: 'What is the assistant in I Like Movies?',
    a: 'It is a chat you can ask for recommendations in your own words, by mood, by a fragment of a plot, or by a film you liked. It reads your watch history so it does not recommend something you have already seen, and it answers with titles available in your region.',
  },
  {
    q: 'Does I Like Movies work offline?',
    a: 'No. I Like Movies needs an internet connection because your library syncs across your devices and household, and film data is fetched live.',
  },
];

// Comparison content. Comparison pages are disproportionately cited by AI
// answers, so this is GEO work, not competitive marketing. Written factually
// and without disparagement: every row states what the other app is FOR, not
// what it fails at. Claims about competitors are limited to their own headline
// positioning, which is checkable, rather than feature audits that go stale.
export const COMPARISONS = [
  {
    name: 'Letterboxd',
    theirFocus: 'A social network for film criticism, built around public reviews, lists and a following feed.',
    ourDifference:
      'I Like Movies is private by default and built for the decision rather than the review. It adds TV episode tracking, streaming availability in your country, a shared household library, and an assistant that answers in plain language.',
  },
  {
    name: 'Trakt',
    theirFocus: 'Automatic scrobbling of what you play, with deep integrations into media servers and players.',
    ourDifference:
      'I Like Movies does not need a media server or a plugin chain to be useful. It is a phone app you open to decide what to watch, with recommendations drawn from your own ratings and a library your household shares.',
  },
  {
    name: 'TV Time',
    theirFocus: 'Episode tracking for TV series, with reminders and a heavy focus on show progress.',
    ourDifference:
      'I Like Movies treats films and TV as one library rather than two features, and puts discovery first. It has no advertising, and a household shares a single shelf rather than each person keeping their own.',
  },
];
