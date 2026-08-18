// Copy for the watch-order pages: /marvel-watch-order, /star-wars-watch-order,
// /dune-watch-order.
//
// Same contract as comparisons.ts: one source of truth, FAQs render twice
// (visible markup + FAQPage JSON-LD) and must never drift.
//
// Provenance: the Marvel and Star Wars lists mirror the app's curated
// franchise tracks (movies-agent-be cmd/seed_franchises, every TMDB id
// verified there), so the site and the app answer with the same catalogue.
// Dune's track was seeded 2026-08-18 (Villeneuve saga + Prophecy); the page's
// hasAppTrack flag exists for any future franchise page that lacks one.
//
// Editorial rules on top of the site-wide ones (no em dashes, only true
// claims): series sit in release order at their FIRST season's date, stated
// once; alternate-universe and anthology entries carry a note rather than a
// forced timeline slot; upcoming titles carry their year and no promise.

export type OrderItem = {
  title: string;
  year: number;
  /** 'film' | 'series' | 'special' — rendered as a small tag. */
  kind: 'film' | 'series' | 'special';
  /** Optional caveat: anthology, alternate universe, spans eras, etc. */
  note?: string;
};

export type OrderSection = {
  heading: string;
  /** One short paragraph under the heading: what this order is FOR. */
  blurb: string;
  items: OrderItem[];
};

export type WatchOrder = {
  slug: string;
  franchise: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  sections: OrderSection[];
  /** True only where the app actually ships a curated track. */
  hasAppTrack: boolean;
  faqs: { q: string; a: string[] }[];
};

export const WATCH_ORDERS: WatchOrder[] = [
  {
    slug: 'marvel-watch-order',
    franchise: 'Marvel Cinematic Universe',
    title: 'Marvel watch order: MCU films and series, release and story order',
    metaDescription:
      'The full MCU watch order: every film and Disney+ series in release order, plus the films in story (chronological) order. Updated as new titles arrive.',
    h1: 'Marvel watch order',
    intro: [
      'Two orders matter for the Marvel Cinematic Universe. Release order is how the saga was written to be seen: jokes, reveals and post-credit scenes assume it, and it is the right choice for a first watch. Story order rearranges the films by their in-universe timeline, which suits a rewatch.',
      'The lists below carry every MCU film and Disney+ series, updated as new titles arrive. Series appear at the date their first season aired.',
    ],
    sections: [
      {
        heading: 'Release order, films and series',
        blurb: 'The default. Watch top to bottom and every reveal lands the way it was built to.',
        items: [
          { title: 'Iron Man', year: 2008, kind: 'film' },
          { title: 'The Incredible Hulk', year: 2008, kind: 'film' },
          { title: 'Iron Man 2', year: 2010, kind: 'film' },
          { title: 'Thor', year: 2011, kind: 'film' },
          { title: 'Captain America: The First Avenger', year: 2011, kind: 'film' },
          { title: 'The Avengers', year: 2012, kind: 'film' },
          { title: 'Iron Man 3', year: 2013, kind: 'film' },
          { title: 'Thor: The Dark World', year: 2013, kind: 'film' },
          { title: 'Captain America: The Winter Soldier', year: 2014, kind: 'film' },
          { title: 'Guardians of the Galaxy', year: 2014, kind: 'film' },
          { title: 'Avengers: Age of Ultron', year: 2015, kind: 'film' },
          { title: 'Ant-Man', year: 2015, kind: 'film' },
          { title: 'Captain America: Civil War', year: 2016, kind: 'film' },
          { title: 'Doctor Strange', year: 2016, kind: 'film' },
          { title: 'Guardians of the Galaxy Vol. 2', year: 2017, kind: 'film' },
          { title: 'Spider-Man: Homecoming', year: 2017, kind: 'film' },
          { title: 'Thor: Ragnarok', year: 2017, kind: 'film' },
          { title: 'Black Panther', year: 2018, kind: 'film' },
          { title: 'Avengers: Infinity War', year: 2018, kind: 'film' },
          { title: 'Ant-Man and the Wasp', year: 2018, kind: 'film' },
          { title: 'Captain Marvel', year: 2019, kind: 'film' },
          { title: 'Avengers: Endgame', year: 2019, kind: 'film' },
          { title: 'Spider-Man: Far From Home', year: 2019, kind: 'film' },
          { title: 'WandaVision', year: 2021, kind: 'series' },
          { title: 'The Falcon and the Winter Soldier', year: 2021, kind: 'series' },
          { title: 'Loki', year: 2021, kind: 'series' },
          { title: 'Black Widow', year: 2021, kind: 'film' },
          { title: 'What If...?', year: 2021, kind: 'series', note: 'animated anthology, alternate universes' },
          { title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, kind: 'film' },
          { title: 'Eternals', year: 2021, kind: 'film' },
          { title: 'Hawkeye', year: 2021, kind: 'series' },
          { title: 'Spider-Man: No Way Home', year: 2021, kind: 'film' },
          { title: 'Moon Knight', year: 2022, kind: 'series' },
          { title: 'Doctor Strange in the Multiverse of Madness', year: 2022, kind: 'film' },
          { title: 'Ms. Marvel', year: 2022, kind: 'series' },
          { title: 'Thor: Love and Thunder', year: 2022, kind: 'film' },
          { title: 'She-Hulk: Attorney at Law', year: 2022, kind: 'series' },
          { title: 'Werewolf by Night', year: 2022, kind: 'special' },
          { title: 'Black Panther: Wakanda Forever', year: 2022, kind: 'film' },
          { title: 'The Guardians of the Galaxy Holiday Special', year: 2022, kind: 'special' },
          { title: 'Ant-Man and the Wasp: Quantumania', year: 2023, kind: 'film' },
          { title: 'Guardians of the Galaxy Vol. 3', year: 2023, kind: 'film' },
          { title: 'Secret Invasion', year: 2023, kind: 'series' },
          { title: 'The Marvels', year: 2023, kind: 'film' },
          { title: 'Echo', year: 2024, kind: 'series' },
          { title: 'Deadpool & Wolverine', year: 2024, kind: 'film' },
          { title: 'Agatha All Along', year: 2024, kind: 'series' },
          { title: 'Captain America: Brave New World', year: 2025, kind: 'film' },
          { title: 'Daredevil: Born Again', year: 2025, kind: 'series' },
          { title: 'Thunderbolts*', year: 2025, kind: 'film' },
          { title: 'Ironheart', year: 2025, kind: 'series' },
          { title: 'The Fantastic Four: First Steps', year: 2025, kind: 'film', note: 'set on a separate Earth' },
          { title: 'Eyes of Wakanda', year: 2025, kind: 'series' },
          { title: 'Marvel Zombies', year: 2025, kind: 'series', note: 'animated, alternate universe' },
          { title: 'Wonder Man', year: 2026, kind: 'series' },
          { title: 'Spider-Man: Brand New Day', year: 2026, kind: 'film' },
        ],
      },
      {
        heading: 'Story order, films',
        blurb:
          'The films arranged by their in-universe timeline, for a rewatch. Alternate-universe entries and anthology series sit outside a single timeline, so this list keeps to the mainline films and specials.',
        items: [
          { title: 'Captain America: The First Avenger', year: 2011, kind: 'film', note: 'set in the 1940s' },
          { title: 'Captain Marvel', year: 2019, kind: 'film', note: 'set in 1995' },
          { title: 'Iron Man', year: 2008, kind: 'film' },
          { title: 'Iron Man 2', year: 2010, kind: 'film' },
          { title: 'The Incredible Hulk', year: 2008, kind: 'film' },
          { title: 'Thor', year: 2011, kind: 'film' },
          { title: 'The Avengers', year: 2012, kind: 'film' },
          { title: 'Iron Man 3', year: 2013, kind: 'film' },
          { title: 'Thor: The Dark World', year: 2013, kind: 'film' },
          { title: 'Captain America: The Winter Soldier', year: 2014, kind: 'film' },
          { title: 'Guardians of the Galaxy', year: 2014, kind: 'film' },
          { title: 'Guardians of the Galaxy Vol. 2', year: 2017, kind: 'film' },
          { title: 'Avengers: Age of Ultron', year: 2015, kind: 'film' },
          { title: 'Ant-Man', year: 2015, kind: 'film' },
          { title: 'Captain America: Civil War', year: 2016, kind: 'film' },
          { title: 'Black Widow', year: 2021, kind: 'film' },
          { title: 'Black Panther', year: 2018, kind: 'film' },
          { title: 'Spider-Man: Homecoming', year: 2017, kind: 'film' },
          { title: 'Doctor Strange', year: 2016, kind: 'film' },
          { title: 'Thor: Ragnarok', year: 2017, kind: 'film' },
          { title: 'Ant-Man and the Wasp', year: 2018, kind: 'film' },
          { title: 'Avengers: Infinity War', year: 2018, kind: 'film' },
          { title: 'Avengers: Endgame', year: 2019, kind: 'film' },
          { title: 'Spider-Man: Far From Home', year: 2019, kind: 'film' },
          { title: 'Eternals', year: 2021, kind: 'film' },
          { title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, kind: 'film' },
          { title: 'Spider-Man: No Way Home', year: 2021, kind: 'film' },
          { title: 'Doctor Strange in the Multiverse of Madness', year: 2022, kind: 'film' },
          { title: 'Thor: Love and Thunder', year: 2022, kind: 'film' },
          { title: 'Werewolf by Night', year: 2022, kind: 'special' },
          { title: 'Black Panther: Wakanda Forever', year: 2022, kind: 'film' },
          { title: 'The Guardians of the Galaxy Holiday Special', year: 2022, kind: 'special' },
          { title: 'Ant-Man and the Wasp: Quantumania', year: 2023, kind: 'film' },
          { title: 'Guardians of the Galaxy Vol. 3', year: 2023, kind: 'film' },
          { title: 'The Marvels', year: 2023, kind: 'film' },
          { title: 'Deadpool & Wolverine', year: 2024, kind: 'film' },
          { title: 'Captain America: Brave New World', year: 2025, kind: 'film' },
          { title: 'Thunderbolts*', year: 2025, kind: 'film' },
          { title: 'Spider-Man: Brand New Day', year: 2026, kind: 'film' },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'What is the best order to watch the Marvel movies?',
        a: [
          'Release order, starting with Iron Man (2008). The saga was written to be seen in the order it came out: reveals, running jokes and post-credit scenes all assume it. Story order, which rearranges the films by their in-universe timeline, is better saved for a rewatch.',
        ],
      },
      {
        q: 'Do I need to watch the Disney+ series to follow the MCU films?',
        a: [
          'Mostly no, with exceptions. WandaVision sets up Doctor Strange in the Multiverse of Madness, Loki underpins the multiverse arc, and Ms. Marvel leads into The Marvels. The other series enrich the films rather than gate them, so a films-first watch works fine.',
        ],
      },
      {
        q: 'How many MCU movies and series are there?',
        a: [
          'As of 2026 the list above carries around forty films and specials and close to twenty Disney+ series, and it keeps growing. The count is exactly what renders on this page, which is updated as new titles arrive.',
        ],
      },
    ],
  },
  {
    slug: 'star-wars-watch-order',
    franchise: 'Star Wars',
    title: 'Star Wars watch order: films and series, release and timeline order',
    metaDescription:
      'The full Star Wars watch order: every film and series in release order, plus the complete in-universe timeline order from The Acolyte to The Rise of Skywalker.',
    h1: 'Star Wars watch order',
    intro: [
      'Star Wars is the franchise where the watch-order argument started: the films came out in a different order than the story happens. Release order preserves the big reveals and is the right first watch. Timeline order tells the story front to back and is the better rewatch, especially with the series woven in.',
      'Both complete orders are below, films and series together, updated as new titles arrive. Series appear at the date their first season aired.',
    ],
    sections: [
      {
        heading: 'Release order, films and series',
        blurb: 'How the world met Star Wars. The Empire reveal stays a reveal this way.',
        items: [
          { title: 'Star Wars: A New Hope', year: 1977, kind: 'film' },
          { title: 'The Empire Strikes Back', year: 1980, kind: 'film' },
          { title: 'Return of the Jedi', year: 1983, kind: 'film' },
          { title: 'The Phantom Menace', year: 1999, kind: 'film' },
          { title: 'Attack of the Clones', year: 2002, kind: 'film' },
          { title: 'Revenge of the Sith', year: 2005, kind: 'film' },
          { title: 'The Clone Wars', year: 2008, kind: 'series' },
          { title: 'Rebels', year: 2014, kind: 'series' },
          { title: 'The Force Awakens', year: 2015, kind: 'film' },
          { title: 'Rogue One', year: 2016, kind: 'film' },
          { title: 'The Last Jedi', year: 2017, kind: 'film' },
          { title: 'Solo: A Star Wars Story', year: 2018, kind: 'film' },
          { title: 'Star Wars Resistance', year: 2018, kind: 'series' },
          { title: 'The Rise of Skywalker', year: 2019, kind: 'film' },
          { title: 'The Mandalorian', year: 2019, kind: 'series' },
          { title: 'The Bad Batch', year: 2021, kind: 'series' },
          { title: 'Star Wars: Visions', year: 2021, kind: 'series', note: 'anthology, outside the timeline' },
          { title: 'The Book of Boba Fett', year: 2021, kind: 'series' },
          { title: 'Obi-Wan Kenobi', year: 2022, kind: 'series' },
          { title: 'Andor', year: 2022, kind: 'series' },
          { title: 'Star Wars: Tales of the Jedi', year: 2022, kind: 'series', note: 'anthology, spans eras' },
          { title: 'Star Wars: Young Jedi Adventures', year: 2023, kind: 'series' },
          { title: 'Ahsoka', year: 2023, kind: 'series' },
          { title: 'The Acolyte', year: 2024, kind: 'series' },
          { title: 'Star Wars: Tales of the Empire', year: 2024, kind: 'series', note: 'anthology, spans eras' },
          { title: 'Skeleton Crew', year: 2024, kind: 'series' },
          { title: 'Star Wars: Tales of the Underworld', year: 2025, kind: 'series', note: 'anthology, spans eras' },
          { title: 'The Mandalorian and Grogu', year: 2026, kind: 'film' },
        ],
      },
      {
        heading: 'Timeline order, films and series',
        blurb:
          'The story front to back. Anthology collections (Visions and the Tales entries) sit outside a single timeline and are listed in the release order above instead.',
        items: [
          { title: 'Star Wars: Young Jedi Adventures', year: 2023, kind: 'series', note: 'High Republic era' },
          { title: 'The Acolyte', year: 2024, kind: 'series' },
          { title: 'The Phantom Menace', year: 1999, kind: 'film' },
          { title: 'Attack of the Clones', year: 2002, kind: 'film' },
          { title: 'The Clone Wars', year: 2008, kind: 'series', note: 'runs between Episodes II and III' },
          { title: 'Revenge of the Sith', year: 2005, kind: 'film' },
          { title: 'The Bad Batch', year: 2021, kind: 'series' },
          { title: 'Solo: A Star Wars Story', year: 2018, kind: 'film' },
          { title: 'Obi-Wan Kenobi', year: 2022, kind: 'series' },
          { title: 'Andor', year: 2022, kind: 'series' },
          { title: 'Rebels', year: 2014, kind: 'series' },
          { title: 'Rogue One', year: 2016, kind: 'film' },
          { title: 'Star Wars: A New Hope', year: 1977, kind: 'film' },
          { title: 'The Empire Strikes Back', year: 1980, kind: 'film' },
          { title: 'Return of the Jedi', year: 1983, kind: 'film' },
          { title: 'The Mandalorian', year: 2019, kind: 'series' },
          { title: 'The Book of Boba Fett', year: 2021, kind: 'series' },
          { title: 'Ahsoka', year: 2023, kind: 'series' },
          { title: 'Skeleton Crew', year: 2024, kind: 'series' },
          { title: 'The Mandalorian and Grogu', year: 2026, kind: 'film' },
          { title: 'Star Wars Resistance', year: 2018, kind: 'series', note: 'leads into the sequel films' },
          { title: 'The Force Awakens', year: 2015, kind: 'film' },
          { title: 'The Last Jedi', year: 2017, kind: 'film' },
          { title: 'The Rise of Skywalker', year: 2019, kind: 'film' },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'What order should I watch Star Wars in for the first time?',
        a: [
          'Release order: the original trilogy, then the prequels, then the sequels, with Rogue One and Solo slotted where they came out. It preserves the reveals the saga is famous for. The full timeline order is the better second pass, when spoilers no longer matter and the series can be woven in where they belong.',
        ],
      },
      {
        q: 'Where does Andor fit in the Star Wars timeline?',
        a: [
          'Before Rogue One, which it leads directly into, and both sit just before A New Hope. In the timeline list above the stretch runs Obi-Wan Kenobi, Andor, Rebels, Rogue One, A New Hope.',
        ],
      },
      {
        q: 'Do I need to watch The Clone Wars before the newer series?',
        a: [
          'It helps more than any other single series. Ahsoka, the Mandalorian era and The Bad Batch all draw characters and history from it. It is long, so a first watch survives skipping it, but the rewatch with it included is a different and richer story.',
        ],
      },
    ],
  },
  {
    slug: 'lord-of-the-rings-watch-order',
    franchise: 'Middle-earth',
    title: 'Lord of the Rings watch order: films and series in the right order',
    metaDescription:
      'The Lord of the Rings watch order: both trilogies, The War of the Rohirrim and The Rings of Power, in release order and in Middle-earth timeline order.',
    h1: 'Lord of the Rings watch order',
    intro: [
      'The Middle-earth question is really one choice: The Lord of the Rings first, or The Hobbit first because it happens earlier. The answer for a first watch is The Lord of the Rings trilogy, in order. It is the stronger work, it was made first, and The Hobbit films lean on it rather than the other way around.',
      'Both complete orders are below: release order for a first watch, timeline order for a rewatch of the whole saga from the Second Age forward.',
    ],
    sections: [
      {
        heading: 'Release order',
        blurb: 'The default, and the order the films were built to be seen in.',
        items: [
          { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, kind: 'film' },
          { title: 'The Lord of the Rings: The Two Towers', year: 2002, kind: 'film' },
          { title: 'The Lord of the Rings: The Return of the King', year: 2003, kind: 'film' },
          { title: 'The Hobbit: An Unexpected Journey', year: 2012, kind: 'film' },
          { title: 'The Hobbit: The Desolation of Smaug', year: 2013, kind: 'film' },
          { title: 'The Hobbit: The Battle of the Five Armies', year: 2014, kind: 'film' },
          { title: 'The Lord of the Rings: The Rings of Power', year: 2022, kind: 'series' },
          { title: 'The Lord of the Rings: The War of the Rohirrim', year: 2024, kind: 'film', note: 'animated' },
        ],
      },
      {
        heading: 'Timeline order',
        blurb: 'Middle-earth history front to back, for a rewatch.',
        items: [
          {
            title: 'The Lord of the Rings: The Rings of Power',
            year: 2022,
            kind: 'series',
            note: 'the Second Age, thousands of years before the films',
          },
          {
            title: 'The Lord of the Rings: The War of the Rohirrim',
            year: 2024,
            kind: 'film',
            note: 'animated, about two centuries before The Hobbit',
          },
          { title: 'The Hobbit: An Unexpected Journey', year: 2012, kind: 'film' },
          { title: 'The Hobbit: The Desolation of Smaug', year: 2013, kind: 'film' },
          { title: 'The Hobbit: The Battle of the Five Armies', year: 2014, kind: 'film' },
          { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, kind: 'film' },
          { title: 'The Lord of the Rings: The Two Towers', year: 2002, kind: 'film' },
          { title: 'The Lord of the Rings: The Return of the King', year: 2003, kind: 'film' },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'Should I watch The Hobbit or The Lord of the Rings first?',
        a: [
          'The Lord of the Rings first, even though The Hobbit happens earlier in the story. The trilogy stands entirely on its own and is the saga at its best; The Hobbit films work better afterwards, as a return to a world you already care about.',
        ],
      },
      {
        q: 'Do I need to watch The Rings of Power before the films?',
        a: [
          'No. It is set thousands of years before the films and assumes you already know them. Watch it after the trilogies, or alongside a timeline rewatch as the opening chapter.',
        ],
      },
      {
        q: 'Are the extended editions worth it?',
        a: [
          'For The Lord of the Rings, yes, and many consider them the definitive versions once you know the films. For a first watch the theatrical cuts are tighter. Either way the order above does not change.',
        ],
      },
      {
        q: 'Are more Middle-earth films coming?',
        a: [
          'The Hunt for Gollum, a live-action film with Andy Serkis, has been announced for December 2027. This page will pick it up when it arrives.',
        ],
      },
    ],
  },
  {
    slug: 'dune-watch-order',
    franchise: 'Dune',
    title: 'Dune watch order: the films and series in the right order',
    metaDescription:
      'The Dune watch order: Denis Villeneuve\'s films, the Dune: Prophecy series, the earlier adaptations, and where each one fits. Updated as Dune: Part Three arrives.',
    h1: 'Dune watch order',
    intro: [
      'Dune is short enough to order in one paragraph and confusing enough that people still ask. The answer: start with Denis Villeneuve\'s two films in order, add the Dune: Prophecy series when you want more of the universe, and treat the earlier adaptations as optional history.',
      'The list below is the recommended path, with the older adaptations at the end for completists.',
    ],
    sections: [
      {
        heading: 'Recommended order',
        blurb: 'The modern saga, in the order it rewards.',
        items: [
          { title: 'Dune', year: 2021, kind: 'film', note: 'Part One, covers the first half of the novel' },
          { title: 'Dune: Part Two', year: 2024, kind: 'film' },
          {
            title: 'Dune: Prophecy',
            year: 2024,
            kind: 'series',
            note: 'set around ten thousand years earlier; standalone, best enjoyed after the films',
          },
          { title: 'Dune: Part Three', year: 2026, kind: 'film', note: 'in cinemas December 2026' },
        ],
      },
      {
        heading: 'The earlier adaptations, optional',
        blurb: 'Not required for the Villeneuve films. Listed for the curious and the completist.',
        items: [
          { title: 'Dune', year: 1984, kind: 'film', note: 'David Lynch\'s adaptation of the full novel' },
          { title: 'Frank Herbert\'s Dune', year: 2000, kind: 'series', note: 'three-part miniseries' },
          {
            title: 'Frank Herbert\'s Children of Dune',
            year: 2003,
            kind: 'series',
            note: 'miniseries sequel, adapts the second and third novels',
          },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'Do I need to watch the 1984 Dune before the new movies?',
        a: [
          'No. Denis Villeneuve\'s Dune (2021) starts the story from the beginning and assumes nothing. The 1984 film and the 2000s miniseries are alternative tellings of the same novel, not prequels.',
        ],
      },
      {
        q: 'Should I watch Dune: Prophecy before or after the films?',
        a: [
          'After. It is set around ten thousand years before the films and stands alone, but it explains orders and institutions whose weight lands better once you have seen the films. Watching it first spoils nothing; it is simply more rewarding second.',
        ],
      },
      {
        q: 'When does Dune: Part Three come out?',
        a: [
          'December 2026 in cinemas. It continues directly from Dune: Part Two.',
        ],
      },
    ],
  },
];
