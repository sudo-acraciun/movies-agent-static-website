// Copy for the watch-order pages: one entry per /<slug> page, each rendered
// by WatchOrderPage.astro from a tiny src/pages/<slug>.astro stub, and all of
// them listed automatically on /guides.
//
// Same contract as comparisons.ts: one source of truth, FAQs render twice
// (visible markup + FAQPage JSON-LD) and must never drift.
//
// Provenance: every list mirrors the app's curated franchise tracks
// (movies-agent-be cmd/seed_franchises, every TMDB id verified there), so the
// site and the app answer with the same catalogue, including the curatorial
// exclusions (anime recap films, non-canon crossovers). The page's
// hasAppTrack flag exists for any future franchise page that lacks a track.
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
  {
    slug: 'harry-potter-watch-order',
    franchise: 'Wizarding World',
    title: 'Harry Potter watch order: all 11 films in release and story order',
    metaDescription:
      'The full Harry Potter watch order: all eight Harry Potter films plus the three Fantastic Beasts prequels, in release order and in story (chronological) order.',
    h1: 'Harry Potter watch order',
    intro: [
      'The Wizarding World is eleven films: eight Harry Potter films and three Fantastic Beasts prequels. Release order starts with Harry and is the right choice for a first watch; the prequels assume you already know the world they are foreshadowing. Story order puts the Fantastic Beasts films first, which suits a rewatch.',
      'Both orders are below, complete.',
    ],
    sections: [
      {
        heading: 'Release order',
        blurb: 'The default. Start where the world starts working.',
        items: [
          {
            title: "Harry Potter and the Sorcerer's Stone",
            year: 2001,
            kind: 'film',
            note: "released as Philosopher's Stone outside the US",
          },
          { title: 'Harry Potter and the Chamber of Secrets', year: 2002, kind: 'film' },
          { title: 'Harry Potter and the Prisoner of Azkaban', year: 2004, kind: 'film' },
          { title: 'Harry Potter and the Goblet of Fire', year: 2005, kind: 'film' },
          { title: 'Harry Potter and the Order of the Phoenix', year: 2007, kind: 'film' },
          { title: 'Harry Potter and the Half-Blood Prince', year: 2009, kind: 'film' },
          { title: 'Harry Potter and the Deathly Hallows: Part 1', year: 2010, kind: 'film' },
          { title: 'Harry Potter and the Deathly Hallows: Part 2', year: 2011, kind: 'film' },
          { title: 'Fantastic Beasts and Where to Find Them', year: 2016, kind: 'film' },
          { title: 'Fantastic Beasts: The Crimes of Grindelwald', year: 2018, kind: 'film' },
          { title: 'Fantastic Beasts: The Secrets of Dumbledore', year: 2022, kind: 'film' },
        ],
      },
      {
        heading: 'Story (chronological) order',
        blurb: 'The in-universe timeline, from the 1920s to the 1990s. For a rewatch.',
        items: [
          {
            title: 'Fantastic Beasts and Where to Find Them',
            year: 2016,
            kind: 'film',
            note: 'set in 1926',
          },
          {
            title: 'Fantastic Beasts: The Crimes of Grindelwald',
            year: 2018,
            kind: 'film',
            note: 'set in 1927',
          },
          {
            title: 'Fantastic Beasts: The Secrets of Dumbledore',
            year: 2022,
            kind: 'film',
            note: 'set in the early 1930s',
          },
          {
            title: "Harry Potter and the Sorcerer's Stone",
            year: 2001,
            kind: 'film',
            note: 'the main story runs 1991 to 1998 from here',
          },
          { title: 'Harry Potter and the Chamber of Secrets', year: 2002, kind: 'film' },
          { title: 'Harry Potter and the Prisoner of Azkaban', year: 2004, kind: 'film' },
          { title: 'Harry Potter and the Goblet of Fire', year: 2005, kind: 'film' },
          { title: 'Harry Potter and the Order of the Phoenix', year: 2007, kind: 'film' },
          { title: 'Harry Potter and the Half-Blood Prince', year: 2009, kind: 'film' },
          { title: 'Harry Potter and the Deathly Hallows: Part 1', year: 2010, kind: 'film' },
          { title: 'Harry Potter and the Deathly Hallows: Part 2', year: 2011, kind: 'film' },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'Should I watch Fantastic Beasts before Harry Potter?',
        a: [
          'No. The Fantastic Beasts films are prequels made for people who already know the Harry Potter story; their reveals only land if you recognise what they are setting up. Watch the eight Harry Potter films first, then the prequels.',
        ],
      },
      {
        q: 'Is Harry Potter and the Cursed Child a film?',
        a: [
          'No. The Cursed Child is a stage play, published as a script book. There is no film of it, so it does not appear in any watch order.',
        ],
      },
      {
        q: 'Will there be a fourth Fantastic Beasts film?',
        a: [
          'A fourth and fifth film were once planned, but nothing is in production and the series is on hold. The three released films tell a story that pauses rather than ends; The Secrets of Dumbledore closes its main conflict.',
        ],
      },
      {
        q: 'Is there a Harry Potter TV series?',
        a: [
          'HBO has a television adaptation of the novels in production, planned as one season per book. It is a retelling of the same story rather than a continuation, so it will not change the film order above. This page will pick it up when it airs.',
        ],
      },
    ],
  },
  {
    slug: 'fast-and-furious-watch-order',
    franchise: 'Fast & Furious',
    title: 'Fast & Furious movies in order: release and chronological, Tokyo Drift explained',
    metaDescription:
      'All 11 Fast & Furious films in order: release order, the chronological timeline that moves Tokyo Drift to ninth, and where the Hobbs & Shaw spinoff fits.',
    h1: 'Fast & Furious movies in order',
    intro: [
      'Eleven films: ten mainline entries plus the Hobbs & Shaw spinoff. The only real question in this franchise is Tokyo Drift, which was released third but happens ninth; its story catches up with the main saga at the end of Fast & Furious 6.',
      'Release order works fine for a first watch, because the saga itself circles back and explains Tokyo Drift when the timelines merge. The chronological order below is for anyone who wants the story straight.',
    ],
    sections: [
      {
        heading: 'Release order',
        blurb: 'How the films came out. The saga explains the Tokyo Drift detour itself when it gets there.',
        items: [
          { title: 'The Fast and the Furious', year: 2001, kind: 'film' },
          { title: '2 Fast 2 Furious', year: 2003, kind: 'film' },
          {
            title: 'The Fast and the Furious: Tokyo Drift',
            year: 2006,
            kind: 'film',
            note: 'chronologically ninth; see the timeline order below',
          },
          { title: 'Fast & Furious', year: 2009, kind: 'film' },
          { title: 'Fast Five', year: 2011, kind: 'film' },
          { title: 'Fast & Furious 6', year: 2013, kind: 'film' },
          { title: 'Furious 7', year: 2015, kind: 'film' },
          { title: 'The Fate of the Furious', year: 2017, kind: 'film' },
          {
            title: 'Fast & Furious Presents: Hobbs & Shaw',
            year: 2019,
            kind: 'film',
            note: 'spinoff; skippable for the main story',
          },
          { title: 'F9', year: 2021, kind: 'film' },
          { title: 'Fast X', year: 2023, kind: 'film' },
        ],
      },
      {
        heading: 'Chronological (story) order',
        blurb: 'The in-universe timeline. Tokyo Drift slots in after Fast & Furious 6, whose ending overlaps it.',
        items: [
          { title: 'The Fast and the Furious', year: 2001, kind: 'film' },
          { title: '2 Fast 2 Furious', year: 2003, kind: 'film' },
          { title: 'Fast & Furious', year: 2009, kind: 'film' },
          { title: 'Fast Five', year: 2011, kind: 'film' },
          {
            title: 'Fast & Furious 6',
            year: 2013,
            kind: 'film',
            note: 'its final scene replays a moment from Tokyo Drift',
          },
          {
            title: 'The Fast and the Furious: Tokyo Drift',
            year: 2006,
            kind: 'film',
            note: "Han's Tokyo story, now in its right place",
          },
          { title: 'Furious 7', year: 2015, kind: 'film' },
          { title: 'The Fate of the Furious', year: 2017, kind: 'film' },
          { title: 'Fast & Furious Presents: Hobbs & Shaw', year: 2019, kind: 'film' },
          { title: 'F9', year: 2021, kind: 'film' },
          { title: 'Fast X', year: 2023, kind: 'film' },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'Where does Tokyo Drift fit in the Fast and Furious timeline?',
        a: [
          'Ninth: after Fast & Furious 6 and before Furious 7. It was released third, but its story happens years later, and the ending of Fast & Furious 6 replays a scene from it to stitch the timelines together. If you watch chronologically, slot it between those two films.',
        ],
      },
      {
        q: 'Do I need to watch Hobbs & Shaw?',
        a: [
          'No. It is a spinoff about two supporting characters and the main saga does not depend on it. Watch it if you like the pair; skip it and you miss nothing the numbered films need.',
        ],
      },
      {
        q: 'What order should a first-timer watch Fast and Furious in?',
        a: [
          'Release order. The saga was written knowing Tokyo Drift sat out of sequence, and it lands the explanation itself in Fast & Furious 6. Chronological order is best saved for a rewatch.',
        ],
      },
      {
        q: 'Is Fast X the last film?',
        a: [
          'No. Fast X ends on a cliffhanger and a concluding film has been announced. It has no confirmed release date; this page will add it when it arrives.',
        ],
      },
    ],
  },
  {
    slug: 'alien-watch-order',
    franchise: 'Alien',
    title: 'Alien movies in order: release order and timeline order',
    metaDescription:
      'Every Alien film and series in order: the four original films, the Prometheus prequels, Alien: Romulus and the Alien: Earth series, in release and timeline order.',
    h1: 'Alien movies in order',
    intro: [
      'The Alien saga is seven films and one series, and the two sensible orders disagree completely. Release order starts with Alien (1979), which is the right first experience: the prequels answer questions the original works hard to keep mysterious. Timeline order starts eighty years earlier with Prometheus, and is the rewatch route.',
      'The Alien vs. Predator crossovers are not part of this timeline and are left out, matching the app\'s curated track.',
    ],
    sections: [
      {
        heading: 'Release order',
        blurb: 'The order the saga was made in, and the right first watch.',
        items: [
          { title: 'Alien', year: 1979, kind: 'film' },
          { title: 'Aliens', year: 1986, kind: 'film' },
          { title: 'Alien 3', year: 1992, kind: 'film' },
          { title: 'Alien Resurrection', year: 1997, kind: 'film' },
          {
            title: 'Prometheus',
            year: 2012,
            kind: 'film',
            note: 'prequel era starts here',
          },
          { title: 'Alien: Covenant', year: 2017, kind: 'film' },
          { title: 'Alien: Romulus', year: 2024, kind: 'film' },
          { title: 'Alien: Earth', year: 2025, kind: 'series' },
        ],
      },
      {
        heading: 'Timeline (chronological) order',
        blurb: 'The in-universe order, from the Prometheus expedition to the far future.',
        items: [
          { title: 'Prometheus', year: 2012, kind: 'film', note: 'set in 2089 to 2093' },
          { title: 'Alien: Covenant', year: 2017, kind: 'film', note: 'set in 2104' },
          {
            title: 'Alien: Earth',
            year: 2025,
            kind: 'series',
            note: 'set in 2120, two years before Alien',
          },
          { title: 'Alien', year: 1979, kind: 'film', note: 'set in 2122' },
          {
            title: 'Alien: Romulus',
            year: 2024,
            kind: 'film',
            note: 'set in 2142, between Alien and Aliens',
          },
          { title: 'Aliens', year: 1986, kind: 'film', note: 'set in 2179' },
          { title: 'Alien 3', year: 1992, kind: 'film', note: 'follows Aliens directly' },
          { title: 'Alien Resurrection', year: 1997, kind: 'film', note: 'set around 2381' },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'Should I watch Alien or Prometheus first?',
        a: [
          'Alien first. Prometheus is a prequel that explains things Alien deliberately leaves unexplained, and the original film is stronger when the mystery is intact. Timeline order, with Prometheus first, is a rewatch order.',
        ],
      },
      {
        q: 'Where does Alien: Romulus fit in the timeline?',
        a: [
          'Between Alien and Aliens: it is set in 2142, twenty years after the Nostromo and decades before Ripley is found. It was made as a standalone, so it also works with only Alien behind you.',
        ],
      },
      {
        q: 'Where does the Alien: Earth series fit?',
        a: [
          'Two years before Alien, in 2120, and on Earth rather than deep space. It stands alone as an entry point, but it plays best knowing the original film.',
        ],
      },
      {
        q: 'Do the Alien vs. Predator films count?',
        a: [
          'They sit outside this continuity: the prequel films and Alien: Earth tell a history the crossovers contradict. They are omitted here, and from the app\'s Alien track, for that reason.',
        ],
      },
    ],
  },
  {
    slug: 'dragon-ball-watch-order',
    franchise: 'Dragon Ball',
    title: 'Dragon Ball watch order: every series and movie in order, canon explained',
    metaDescription:
      'The full Dragon Ball watch order: Dragon Ball, Z, Super, Daima and GT in order, the four canon films, and where the classic movies fit as side stories.',
    h1: 'Dragon Ball watch order',
    intro: [
      'Dragon Ball is five TV series and around twenty films, and the order is simpler than it looks: the story is Dragon Ball, then Z, then Super, with Daima as a late side chapter and GT as an alternate ending that Super quietly replaced. Only four films are part of the story; the rest are self-contained side stories.',
      'Both lists below are complete, and the film list marks what is canon and what is a detour.',
    ],
    sections: [
      {
        heading: 'The series, in watch order',
        blurb: 'The spine of the saga. Watch top to bottom; the notes explain the two odd ones out.',
        items: [
          { title: 'Dragon Ball', year: 1986, kind: 'series', note: "Goku's childhood; 153 episodes" },
          { title: 'Dragon Ball Z', year: 1989, kind: 'series' },
          {
            title: 'Dragon Ball Super',
            year: 2015,
            kind: 'series',
            note: "set in the gap before Z's ten-years-later epilogue",
          },
          {
            title: 'Dragon Ball DAIMA',
            year: 2024,
            kind: 'series',
            note: 'a side story set just after the Buu arc; made after Super, best watched after it',
          },
          {
            title: 'Dragon Ball GT',
            year: 1996,
            kind: 'series',
            note: 'alternate continuation of Z, not based on the manga; skippable',
          },
        ],
      },
      {
        heading: 'The films: four canon, the rest side stories',
        blurb:
          'Battle of Gods onward is part of the story. Everything earlier is a self-contained side story, listed by era for completists.',
        items: [
          {
            title: 'Dragon Ball Z: Battle of Gods',
            year: 2013,
            kind: 'film',
            note: 'canon; retold as the opening arc of Super',
          },
          {
            title: "Dragon Ball Z: Resurrection 'F'",
            year: 2015,
            kind: 'film',
            note: 'canon; also retold in Super',
          },
          { title: 'Dragon Ball Super: Broly', year: 2018, kind: 'film', note: 'canon, after the Super series' },
          { title: 'Dragon Ball Super: Super Hero', year: 2022, kind: 'film', note: 'canon, the latest chapter' },
          {
            title: 'Curse of the Blood Rubies',
            year: 1986,
            kind: 'film',
            note: 'original Dragon Ball era side stories start here',
          },
          { title: 'Sleeping Princess in Devil\'s Castle', year: 1987, kind: 'film' },
          { title: 'Mystical Adventure', year: 1988, kind: 'film' },
          { title: 'The Path to Power', year: 1996, kind: 'film' },
          { title: 'Dragon Ball Z: Dead Zone', year: 1989, kind: 'film', note: 'Z era side stories start here' },
          { title: "Dragon Ball Z: The World's Strongest", year: 1990, kind: 'film' },
          { title: 'Dragon Ball Z: The Tree of Might', year: 1990, kind: 'film' },
          { title: 'Dragon Ball Z: Lord Slug', year: 1991, kind: 'film' },
          { title: "Dragon Ball Z: Cooler's Revenge", year: 1991, kind: 'film' },
          { title: 'Dragon Ball Z: The Return of Cooler', year: 1992, kind: 'film' },
          { title: 'Dragon Ball Z: Super Android 13!', year: 1992, kind: 'film' },
          { title: 'Dragon Ball Z: Broly, the Legendary Super Saiyan', year: 1993, kind: 'film' },
          { title: 'Dragon Ball Z: Bojack Unbound', year: 1993, kind: 'film' },
          { title: 'Dragon Ball Z: Broly, Second Coming', year: 1994, kind: 'film' },
          { title: 'Dragon Ball Z: Bio-Broly', year: 1994, kind: 'film' },
          { title: 'Dragon Ball Z: Fusion Reborn', year: 1995, kind: 'film' },
          { title: 'Dragon Ball Z: Wrath of the Dragon', year: 1995, kind: 'film' },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'Can I skip Dragon Ball and start with Z?',
        a: [
          'Yes, and many people did: Z reintroduces enough that starting there works. The original series is still worth it, because the adult cast of Z lands harder when you knew them as kids, but it is a richer-experience choice rather than a requirement.',
        ],
      },
      {
        q: 'Is Dragon Ball GT canon?',
        a: [
          'No. GT is an anime-only continuation made after Z with no manga behind it, and Super, which came later, tells a different continuation of the same period. Treat GT as an optional alternate ending.',
        ],
      },
      {
        q: 'Which Dragon Ball movies are canon?',
        a: [
          "Four: Battle of Gods, Resurrection 'F', Broly (2018) and Super Hero (2022). The first two are retold within Super, so you can watch either version. Every earlier film is a self-contained side story that no series arc depends on.",
        ],
      },
      {
        q: 'What about Dragon Ball Z Kai?',
        a: [
          'Kai is a recut of Z: the same story trimmed of filler and repaced. It is a valid substitute if the length of Z puts you off. This page lists the original, which is what the app\'s track carries.',
        ],
      },
      {
        q: 'Should I watch DAIMA before Super?',
        a: [
          'No, watch it after. DAIMA is set earlier on the timeline, but it was made a decade after Super and leans on ideas Super established. Release order is the intended experience.',
        ],
      },
    ],
  },
  {
    slug: 'naruto-watch-order',
    franchise: 'Naruto',
    title: 'Naruto watch order: Naruto, Shippuden, Boruto and all 11 movies',
    metaDescription:
      'The full Naruto watch order: the original series, Shippuden and Boruto in order, all eleven films with where each one fits, and which two movies are canon.',
    h1: 'Naruto watch order',
    intro: [
      'The series order is simple: Naruto, then Naruto: Shippuden, then Boruto. The films are where people get lost, so the list below places each of the eleven where it belongs, and marks the only two that are canon: The Last and Boruto: Naruto the Movie.',
      'Everything here mirrors the curated Naruto track in the app, so the two answer with the same catalogue.',
    ],
    sections: [
      {
        heading: 'The series, in watch order',
        blurb: 'The whole story runs through these three, in this order.',
        items: [
          { title: 'Naruto', year: 2002, kind: 'series' },
          { title: 'Naruto: Shippuden', year: 2007, kind: 'series' },
          { title: 'Boruto: Naruto Next Generations', year: 2017, kind: 'series' },
        ],
      },
      {
        heading: 'The films, in order, with placement',
        blurb:
          'The first nine are self-contained side stories: watch them near their place in the series, or skip them freely. The last two are canon.',
        items: [
          {
            title: 'Ninja Clash in the Land of Snow',
            year: 2004,
            kind: 'film',
            note: 'original series era',
          },
          { title: 'Legend of the Stone of Gelel', year: 2005, kind: 'film', note: 'original series era' },
          {
            title: 'Guardians of the Crescent Moon Kingdom',
            year: 2006,
            kind: 'film',
            note: 'original series era',
          },
          { title: 'Naruto Shippuden the Movie', year: 2007, kind: 'film', note: 'Shippuden era' },
          { title: 'Bonds', year: 2008, kind: 'film', note: 'Shippuden era' },
          { title: 'The Will of Fire', year: 2009, kind: 'film', note: 'Shippuden era' },
          { title: 'The Lost Tower', year: 2010, kind: 'film', note: 'Shippuden era' },
          { title: 'Blood Prison', year: 2011, kind: 'film', note: 'Shippuden era' },
          { title: 'Road to Ninja', year: 2012, kind: 'film', note: 'Shippuden era' },
          {
            title: 'The Last: Naruto the Movie',
            year: 2014,
            kind: 'film',
            note: 'canon; after the war arc, before the Shippuden finale',
          },
          {
            title: 'Boruto: Naruto the Movie',
            year: 2015,
            kind: 'film',
            note: 'canon; its story is retold early in the Boruto series',
          },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'Which Naruto movies are canon?',
        a: [
          'Two: The Last: Naruto the Movie, which sits between the end of the war arc and the Shippuden finale, and Boruto: Naruto the Movie, which starts the next generation\'s story. The other nine films are side stories no series arc depends on.',
        ],
      },
      {
        q: 'Can I skip the Naruto filler episodes?',
        a: [
          'Yes. Both series carry long stretches of anime-only filler, and skipping it changes nothing in the main story. Filler guides listing the exact episode ranges are easy to find; the honest summary is that the manga-canon episodes are the spine and everything else is optional.',
        ],
      },
      {
        q: 'Should I watch Boruto the movie or the Boruto series first?',
        a: [
          'Either works. The series retells the film\'s story in its early arcs with more detail, so pick one telling and do not feel obliged to watch both. The film is the tighter version.',
        ],
      },
      {
        q: 'When should I watch The Last?',
        a: [
          'After the Fourth Great Ninja War arc and before the final episodes of Shippuden: it is the bridge between the war and the epilogue, and the finale assumes it happened.',
        ],
      },
    ],
  },
  {
    slug: 'evangelion-watch-order',
    franchise: 'Neon Genesis Evangelion',
    title: 'Evangelion watch order: the series, The End of Evangelion and the Rebuild films',
    metaDescription:
      'The Evangelion watch order explained: the 1995 series, The End of Evangelion, and the four Rebuild films, with the two valid routes through them.',
    h1: 'Evangelion watch order',
    intro: [
      'Evangelion is one series, its theatrical ending, and a four-film remake, and the confusion comes from the remake being also, arguably, a sequel. There are two honest routes. The classic route: the 1995 series, then The End of Evangelion, then the Rebuild films. The fast route: the four Rebuild films alone.',
      'The classic route is the recommendation. The Rebuild films quote, invert and answer the original; every one of their choices lands harder when you know what they are choosing against.',
    ],
    sections: [
      {
        heading: 'The classic route, recommended',
        blurb: 'The original work first, then the ending it was always missing, then the remake that talks back to it.',
        items: [
          {
            title: 'Neon Genesis Evangelion',
            year: 1995,
            kind: 'series',
            note: '26 episodes',
          },
          {
            title: 'Neon Genesis Evangelion: The End of Evangelion',
            year: 1997,
            kind: 'film',
            note: 'the theatrical ending, replacing episodes 25 and 26',
          },
          { title: 'Evangelion: 1.0 You Are (Not) Alone', year: 2007, kind: 'film' },
          { title: 'Evangelion: 2.0 You Can (Not) Advance', year: 2009, kind: 'film' },
          { title: 'Evangelion: 3.0 You Can (Not) Redo', year: 2012, kind: 'film' },
          {
            title: 'Evangelion: 3.0+1.0 Thrice Upon a Time',
            year: 2021,
            kind: 'film',
            note: 'the conclusion',
          },
        ],
      },
      {
        heading: 'The Rebuild-only route',
        blurb: 'A complete story in four films for someone who will not commit to the series. It works; it just carries less weight.',
        items: [
          { title: 'Evangelion: 1.0 You Are (Not) Alone', year: 2007, kind: 'film' },
          { title: 'Evangelion: 2.0 You Can (Not) Advance', year: 2009, kind: 'film' },
          { title: 'Evangelion: 3.0 You Can (Not) Redo', year: 2012, kind: 'film' },
          { title: 'Evangelion: 3.0+1.0 Thrice Upon a Time', year: 2021, kind: 'film' },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'Should I watch the Evangelion series or the Rebuild movies first?',
        a: [
          'The series first, if you can. The Rebuild films begin as a retelling and become something that comments on the original; watched first, they play as a stylish story, and watched second, they play as an answer. The Rebuild-only route is legitimate when 26 episodes is a dealbreaker.',
        ],
      },
      {
        q: 'Is The End of Evangelion a sequel or a replacement ending?',
        a: [
          'A replacement, and watch it as one: it retells episodes 25 and 26 as the theatrical ending the TV production could not deliver. Watch the full series first, including the original two final episodes, then The End of Evangelion. The two endings are meant to be held together.',
        ],
      },
      {
        q: 'Do I need Evangelion: Death and Rebirth?',
        a: [
          'No. It is a recap compilation of the series with an early cut of End of Evangelion material attached, made for 1997 cinema audiences. It adds nothing today and is left out here, and out of the app\'s track, for that reason.',
        ],
      },
      {
        q: 'Is 3.0+1.0 really the end?',
        a: [
          'Yes. Thrice Upon a Time concludes the Rebuild story, and its creator has called the Evangelion story finished. Nothing further is in production.',
        ],
      },
    ],
  },
];
