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
    week: '24 August 2026',
    entries: [
      'Sign-up steps now scroll on tablets and the continue button always stays within reach',
      'A flaky connection can no longer get you stuck partway through sign-up',
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
