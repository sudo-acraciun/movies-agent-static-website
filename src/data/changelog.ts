// Copy for the /changelog page.
//
// Grouped by week, not by release. Heavy days ship several pushes; a per-push
// log would clutter the page and leak internals. One block per week that
// shipped anything, newest first.
//
// Copy rules, on top of the site-wide ones (no em dashes, only true claims):
//   - No ticket numbers, no version internals, no implementation detail. The
//     page exists mainly as a freshness signal for crawlers; a reader who
//     lands on it should understand roughly what improved, no more. Curation
//     into vague benefit lines is the point, not a shortcut.
//   - Prepend a new ChangelogWeek to add a week. Nothing else changes.

export type ChangelogWeek = {
  /**
   * Human label, e.g. "12 August 2026". Also the visible <h2>. The date is
   * the start of the week the block covers, stated bare: "Week of" was cut
   * as noise.
   */
  week: string;
  /** Benefit lines, one per <li>. Vague on purpose. */
  entries: string[];
};

export const CHANGELOG: ChangelogWeek[] = [
  {
    week: '31 August 2026',
    entries: [
      'Get a heads-up when a show you are watching has a new episode, one alert a day at most, with an off switch in Settings',
      'You can now choose who sees what you log, with separate settings for watched titles and ratings, and for your watchlist',
      'Anything you log while set to Only me stays off your friends feed, and your own posts are marked so you can tell at a glance',
      'Settings is now a short list of sections, and your streaming services moved to a page of their own',
      'Title pages now show the IMDb, Rotten Tomatoes and Metacritic marks next to each score',
      'You can now sort your library by Metascore',
      'After you have used the app for a while, it may invite you once to rate it on Google Play',
      'Filmmaker pages with several roles now show their role tabs cleanly, and you can swipe across them when there are many',
      'Your watchlist can now be filtered down to the titles you already own, and your collection to the ones you also plan to watch',
      "Households now see everyone's owned titles in one collection, with a filter to show just one person's",
      'A list emptied by your own filters now says so, instead of suggesting you add titles',
      'Your library now opens with a few titles you have seen but never rated, so your first ratings are one tap away',
      'The assistant now works from what you have seen and saved until you have rated a few titles',
      "New members get a nudge toward the week's collection a day after joining, and a reminder to rate a few titles later that week",
      "If you have been away for a week, one reminder points you back to the week's collection",
    ],
  },
  {
    week: '24 August 2026',
    entries: [
      'Sign-up steps now scroll on tablets and the continue button always stays within reach',
      'A flaky connection can no longer get you stuck partway through sign-up',
      'The sign-in screen got a fresh look with a wall of movie posters',
      'Notifications about posts that no longer exist now tidy themselves up instead of opening a broken page',
      'A brief connection hiccup no longer tells you your session expired',
      'The assistant now speaks stars, so asking for your 5-star movies gets your real favorites',
      'A friendly pointer now helps new users discover the assistant',
      'Signing up is now three quick steps, and moving between them is instant',
      'A one-time tip on your profile shows where to import your Letterboxd or IMDb history',
      'Marking a movie as watched now shows the year you watched it, and you can change it any time',
      'Tips you dismiss now stay dismissed',
      'You can now delete your own feed posts, and they disappear for everyone right away',
      'The Friends page now leads with inviting a friend, and one search box both filters your friends and finds anyone on the app',
      'Friend requests you sent now sit next to the ones you received, and you can withdraw them',
      'Invite links now open a proper page with the store button, so friends without the app can install it first',
      'An invite link tapped before signing up now still brings you to the invite once you are in',
      'Title pages now open with a Synopsis section, followed by a Details section with awards, Metascore, budget, revenue and spoken languages',
      'Collections and franchises a title belongs to now have their own Tracks section',
      'Episode pages got the same Synopsis and Details layout',
    ],
  },
  {
    week: '19 August 2026',
    entries: [
      'TV shows now list the right cast, even for series where it changes each season',
      'Age ratings for your country, like PG-13, now appear on every title page',
      'Actor and director pages gained photo galleries',
      'The assistant now double checks filmographies against the movie database before answering',
      'Profile photos now show up reliably across the app',
    ],
  },
  {
    week: '12 August 2026',
    entries: [
      'The assistant now understands "recent" and "latest" and replies more reliably',
      'Households get a per-member watchlist selector',
      'Real IMDb scores now appear across more of your lists',
      'Cleaner onboarding, plus polished cast and crew pages',
    ],
  },
];
