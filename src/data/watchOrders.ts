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
  /** TMDB id, provenance for the baked poster (resolved out-of-band). */
  tmdbId?: number;
  /** Baked TMDB poster URL (w342); TV entries carry their series poster. */
  posterPath?: string;
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
  /** Flagship film's TMDB backdrop (w1280), rendered as the page hero. */
  heroBackdrop?: string;
  /** CSS object-position for the hero crop (e.g. 'center 30%'). */
  heroPosition?: string;
  /** True only where the app actually ships a curated track. */
  hasAppTrack: boolean;
  faqs: { q: string; a: string[] }[];
};

export const WATCH_ORDERS: WatchOrder[] = [
  {
    slug: 'marvel-watch-order',
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
    heroPosition: 'center 35%',
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
          { title: 'Iron Man', year: 2008, tmdbId: 1726, posterPath: 'https://image.tmdb.org/t/p/w342/78lPtwv72eTNqFW9COBYI0dWDJa.jpg', kind: 'film' },
          { title: 'The Incredible Hulk', year: 2008, tmdbId: 1724, posterPath: 'https://image.tmdb.org/t/p/w342/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg', kind: 'film' },
          { title: 'Iron Man 2', year: 2010, tmdbId: 10138, posterPath: 'https://image.tmdb.org/t/p/w342/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg', kind: 'film' },
          { title: 'Thor', year: 2011, tmdbId: 10195, posterPath: 'https://image.tmdb.org/t/p/w342/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg', kind: 'film' },
          { title: 'Captain America: The First Avenger', year: 2011, tmdbId: 1771, posterPath: 'https://image.tmdb.org/t/p/w342/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg', kind: 'film' },
          { title: 'The Avengers', year: 2012, tmdbId: 24428, posterPath: 'https://image.tmdb.org/t/p/w342/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg', kind: 'film' },
          { title: 'Iron Man 3', year: 2013, tmdbId: 68721, posterPath: 'https://image.tmdb.org/t/p/w342/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg', kind: 'film' },
          { title: 'Thor: The Dark World', year: 2013, tmdbId: 76338, posterPath: 'https://image.tmdb.org/t/p/w342/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg', kind: 'film' },
          { title: 'Captain America: The Winter Soldier', year: 2014, tmdbId: 100402, posterPath: 'https://image.tmdb.org/t/p/w342/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg', kind: 'film' },
          { title: 'Guardians of the Galaxy', year: 2014, tmdbId: 118340, posterPath: 'https://image.tmdb.org/t/p/w342/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg', kind: 'film' },
          { title: 'Avengers: Age of Ultron', year: 2015, tmdbId: 99861, posterPath: 'https://image.tmdb.org/t/p/w342/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg', kind: 'film' },
          { title: 'Ant-Man', year: 2015, tmdbId: 102899, posterPath: 'https://image.tmdb.org/t/p/w342/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg', kind: 'film' },
          { title: 'Captain America: Civil War', year: 2016, tmdbId: 271110, posterPath: 'https://image.tmdb.org/t/p/w342/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg', kind: 'film' },
          { title: 'Doctor Strange', year: 2016, tmdbId: 284052, posterPath: 'https://image.tmdb.org/t/p/w342/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg', kind: 'film' },
          { title: 'Guardians of the Galaxy Vol. 2', year: 2017, tmdbId: 283995, posterPath: 'https://image.tmdb.org/t/p/w342/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg', kind: 'film' },
          { title: 'Spider-Man: Homecoming', year: 2017, tmdbId: 315635, posterPath: 'https://image.tmdb.org/t/p/w342/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', kind: 'film' },
          { title: 'Thor: Ragnarok', year: 2017, tmdbId: 284053, posterPath: 'https://image.tmdb.org/t/p/w342/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg', kind: 'film' },
          { title: 'Black Panther', year: 2018, tmdbId: 284054, posterPath: 'https://image.tmdb.org/t/p/w342/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', kind: 'film' },
          { title: 'Avengers: Infinity War', year: 2018, tmdbId: 299536, posterPath: 'https://image.tmdb.org/t/p/w342/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', kind: 'film' },
          { title: 'Ant-Man and the Wasp', year: 2018, tmdbId: 363088, posterPath: 'https://image.tmdb.org/t/p/w342/cFQEO687n1K6umXbInzocxcnAQz.jpg', kind: 'film' },
          { title: 'Captain Marvel', year: 2019, tmdbId: 299537, posterPath: 'https://image.tmdb.org/t/p/w342/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg', kind: 'film' },
          { title: 'Avengers: Endgame', year: 2019, tmdbId: 299534, posterPath: 'https://image.tmdb.org/t/p/w342/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg', kind: 'film' },
          { title: 'Spider-Man: Far From Home', year: 2019, tmdbId: 429617, posterPath: 'https://image.tmdb.org/t/p/w342/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg', kind: 'film' },
          { title: 'WandaVision', year: 2021, tmdbId: 85271, posterPath: 'https://image.tmdb.org/t/p/w342/ijWWwINc8h71NQ8j1LTJMFSj5wr.jpg', kind: 'series' },
          { title: 'The Falcon and the Winter Soldier', year: 2021, tmdbId: 88396, posterPath: 'https://image.tmdb.org/t/p/w342/6kbAMLteGO8yyewYau6bJ683sw7.jpg', kind: 'series' },
          { title: 'Loki', year: 2021, tmdbId: 84958, posterPath: 'https://image.tmdb.org/t/p/w342/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg', kind: 'series' },
          { title: 'Black Widow', year: 2021, tmdbId: 497698, posterPath: 'https://image.tmdb.org/t/p/w342/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg', kind: 'film' },
          { title: 'What If...?', year: 2021, tmdbId: 91363, posterPath: 'https://image.tmdb.org/t/p/w342/lztz5XBMG1x6Y5ubz7CxfPFsAcW.jpg', kind: 'series', note: 'animated anthology, alternate universes' },
          { title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, tmdbId: 566525, posterPath: 'https://image.tmdb.org/t/p/w342/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg', kind: 'film' },
          { title: 'Eternals', year: 2021, tmdbId: 524434, posterPath: 'https://image.tmdb.org/t/p/w342/lFByFSLV5WDJEv3KabbdAF959F2.jpg', kind: 'film' },
          { title: 'Hawkeye', year: 2021, tmdbId: 88329, posterPath: 'https://image.tmdb.org/t/p/w342/ct5pNE5dDHryHLDnxyZPYcqO1sz.jpg', kind: 'series' },
          { title: 'Spider-Man: No Way Home', year: 2021, tmdbId: 634649, posterPath: 'https://image.tmdb.org/t/p/w342/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', kind: 'film' },
          { title: 'Moon Knight', year: 2022, tmdbId: 92749, posterPath: 'https://image.tmdb.org/t/p/w342/x6FsYvt33846IQnDSFxla9j0RX8.jpg', kind: 'series' },
          { title: 'Doctor Strange in the Multiverse of Madness', year: 2022, tmdbId: 453395, posterPath: 'https://image.tmdb.org/t/p/w342/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg', kind: 'film' },
          { title: 'Ms. Marvel', year: 2022, tmdbId: 92782, posterPath: 'https://image.tmdb.org/t/p/w342/3HWWh92kZbD7odwJX7nKmXNZsYo.jpg', kind: 'series' },
          { title: 'Thor: Love and Thunder', year: 2022, tmdbId: 616037, posterPath: 'https://image.tmdb.org/t/p/w342/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg', kind: 'film' },
          { title: 'She-Hulk: Attorney at Law', year: 2022, tmdbId: 92783, posterPath: 'https://image.tmdb.org/t/p/w342/5xz2orV8f0usyrfGNshcoXHmiaV.jpg', kind: 'series' },
          { title: 'Werewolf by Night', year: 2022, tmdbId: 894205, posterPath: 'https://image.tmdb.org/t/p/w342/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg', kind: 'special' },
          { title: 'Black Panther: Wakanda Forever', year: 2022, tmdbId: 505642, posterPath: 'https://image.tmdb.org/t/p/w342/sv1xJUazXeYqALzczSZ3O6nkH75.jpg', kind: 'film' },
          { title: 'The Guardians of the Galaxy Holiday Special', year: 2022, tmdbId: 774752, posterPath: 'https://image.tmdb.org/t/p/w342/8dqXyslZ2hv49Oiob9UjlGSHSTR.jpg', kind: 'special' },
          { title: 'Ant-Man and the Wasp: Quantumania', year: 2023, tmdbId: 640146, posterPath: 'https://image.tmdb.org/t/p/w342/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg', kind: 'film' },
          { title: 'Guardians of the Galaxy Vol. 3', year: 2023, tmdbId: 447365, posterPath: 'https://image.tmdb.org/t/p/w342/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', kind: 'film' },
          { title: 'Secret Invasion', year: 2023, tmdbId: 114472, posterPath: 'https://image.tmdb.org/t/p/w342/3rINdUPSy9AklJg74jWHOyUXuZd.jpg', kind: 'series' },
          { title: 'The Marvels', year: 2023, tmdbId: 609681, posterPath: 'https://image.tmdb.org/t/p/w342/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg', kind: 'film' },
          { title: 'Echo', year: 2024, tmdbId: 122226, posterPath: 'https://image.tmdb.org/t/p/w342/vFyJH630cF68LohVYjQW49074Sy.jpg', kind: 'series' },
          { title: 'Deadpool & Wolverine', year: 2024, tmdbId: 533535, posterPath: 'https://image.tmdb.org/t/p/w342/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', kind: 'film' },
          { title: 'Agatha All Along', year: 2024, tmdbId: 138501, posterPath: 'https://image.tmdb.org/t/p/w342/mGsxKwXUjojitRv2E9qMTbxbBRd.jpg', kind: 'series' },
          { title: 'Captain America: Brave New World', year: 2025, tmdbId: 822119, posterPath: 'https://image.tmdb.org/t/p/w342/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', kind: 'film' },
          { title: 'Daredevil: Born Again', year: 2025, tmdbId: 202555, posterPath: 'https://image.tmdb.org/t/p/w342/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg', kind: 'series' },
          { title: 'Thunderbolts*', year: 2025, tmdbId: 986056, posterPath: 'https://image.tmdb.org/t/p/w342/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg', kind: 'film' },
          { title: 'Ironheart', year: 2025, tmdbId: 114471, posterPath: 'https://image.tmdb.org/t/p/w342/dOh6MJpdlQhYpLBhzhNQeYGKTZ5.jpg', kind: 'series' },
          { title: 'The Fantastic Four: First Steps', year: 2025, tmdbId: 617126, posterPath: 'https://image.tmdb.org/t/p/w342/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg', kind: 'film', note: 'set on a separate Earth' },
          { title: 'Eyes of Wakanda', year: 2025, tmdbId: 241388, posterPath: 'https://image.tmdb.org/t/p/w342/yuOfb1MgnaGPa4guzV0n1IFYVGN.jpg', kind: 'series' },
          { title: 'Marvel Zombies', year: 2025, tmdbId: 138505, posterPath: 'https://image.tmdb.org/t/p/w342/mwKj9ERGFXsWot0nXgQ5yMQf9I7.jpg', kind: 'series', note: 'animated, alternate universe' },
          { title: 'Wonder Man', year: 2026, tmdbId: 198178, posterPath: 'https://image.tmdb.org/t/p/w342/6yy9nQlFt2l6UVWzrfhszFCaZ5C.jpg', kind: 'series' },
          { title: 'Spider-Man: Brand New Day', year: 2026, tmdbId: 969681, posterPath: 'https://image.tmdb.org/t/p/w342/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg', kind: 'film' },
        ],
      },
      {
        heading: 'Story order, films',
        blurb:
          'The films arranged by their in-universe timeline, for a rewatch. Alternate-universe entries and anthology series sit outside a single timeline, so this list keeps to the mainline films and specials.',
        items: [
          { title: 'Captain America: The First Avenger', year: 2011, tmdbId: 1771, posterPath: 'https://image.tmdb.org/t/p/w342/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg', kind: 'film', note: 'set in the 1940s' },
          { title: 'Captain Marvel', year: 2019, tmdbId: 299537, posterPath: 'https://image.tmdb.org/t/p/w342/AtsgWhDnHTq68L0lLsUrCnM7TjG.jpg', kind: 'film', note: 'set in 1995' },
          { title: 'Iron Man', year: 2008, tmdbId: 1726, posterPath: 'https://image.tmdb.org/t/p/w342/78lPtwv72eTNqFW9COBYI0dWDJa.jpg', kind: 'film' },
          { title: 'Iron Man 2', year: 2010, tmdbId: 10138, posterPath: 'https://image.tmdb.org/t/p/w342/6WBeq4fCfn7AN0o21W9qNcRF2l9.jpg', kind: 'film' },
          { title: 'The Incredible Hulk', year: 2008, tmdbId: 1724, posterPath: 'https://image.tmdb.org/t/p/w342/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg', kind: 'film' },
          { title: 'Thor', year: 2011, tmdbId: 10195, posterPath: 'https://image.tmdb.org/t/p/w342/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg', kind: 'film' },
          { title: 'The Avengers', year: 2012, tmdbId: 24428, posterPath: 'https://image.tmdb.org/t/p/w342/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg', kind: 'film' },
          { title: 'Iron Man 3', year: 2013, tmdbId: 68721, posterPath: 'https://image.tmdb.org/t/p/w342/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg', kind: 'film' },
          { title: 'Thor: The Dark World', year: 2013, tmdbId: 76338, posterPath: 'https://image.tmdb.org/t/p/w342/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg', kind: 'film' },
          { title: 'Captain America: The Winter Soldier', year: 2014, tmdbId: 100402, posterPath: 'https://image.tmdb.org/t/p/w342/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg', kind: 'film' },
          { title: 'Guardians of the Galaxy', year: 2014, tmdbId: 118340, posterPath: 'https://image.tmdb.org/t/p/w342/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg', kind: 'film' },
          { title: 'Guardians of the Galaxy Vol. 2', year: 2017, tmdbId: 283995, posterPath: 'https://image.tmdb.org/t/p/w342/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg', kind: 'film' },
          { title: 'Avengers: Age of Ultron', year: 2015, tmdbId: 99861, posterPath: 'https://image.tmdb.org/t/p/w342/4ssDuvEDkSArWEdyBl2X5EHvYKU.jpg', kind: 'film' },
          { title: 'Ant-Man', year: 2015, tmdbId: 102899, posterPath: 'https://image.tmdb.org/t/p/w342/rQRnQfUl3kfp78nCWq8Ks04vnq1.jpg', kind: 'film' },
          { title: 'Captain America: Civil War', year: 2016, tmdbId: 271110, posterPath: 'https://image.tmdb.org/t/p/w342/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg', kind: 'film' },
          { title: 'Black Widow', year: 2021, tmdbId: 497698, posterPath: 'https://image.tmdb.org/t/p/w342/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg', kind: 'film' },
          { title: 'Black Panther', year: 2018, tmdbId: 284054, posterPath: 'https://image.tmdb.org/t/p/w342/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', kind: 'film' },
          { title: 'Spider-Man: Homecoming', year: 2017, tmdbId: 315635, posterPath: 'https://image.tmdb.org/t/p/w342/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg', kind: 'film' },
          { title: 'Doctor Strange', year: 2016, tmdbId: 284052, posterPath: 'https://image.tmdb.org/t/p/w342/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg', kind: 'film' },
          { title: 'Thor: Ragnarok', year: 2017, tmdbId: 284053, posterPath: 'https://image.tmdb.org/t/p/w342/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg', kind: 'film' },
          { title: 'Ant-Man and the Wasp', year: 2018, tmdbId: 363088, posterPath: 'https://image.tmdb.org/t/p/w342/cFQEO687n1K6umXbInzocxcnAQz.jpg', kind: 'film' },
          { title: 'Avengers: Infinity War', year: 2018, tmdbId: 299536, posterPath: 'https://image.tmdb.org/t/p/w342/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', kind: 'film' },
          { title: 'Avengers: Endgame', year: 2019, tmdbId: 299534, posterPath: 'https://image.tmdb.org/t/p/w342/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg', kind: 'film' },
          { title: 'Spider-Man: Far From Home', year: 2019, tmdbId: 429617, posterPath: 'https://image.tmdb.org/t/p/w342/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg', kind: 'film' },
          { title: 'Eternals', year: 2021, tmdbId: 524434, posterPath: 'https://image.tmdb.org/t/p/w342/lFByFSLV5WDJEv3KabbdAF959F2.jpg', kind: 'film' },
          { title: 'Shang-Chi and the Legend of the Ten Rings', year: 2021, tmdbId: 566525, posterPath: 'https://image.tmdb.org/t/p/w342/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg', kind: 'film' },
          { title: 'Spider-Man: No Way Home', year: 2021, tmdbId: 634649, posterPath: 'https://image.tmdb.org/t/p/w342/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', kind: 'film' },
          { title: 'Doctor Strange in the Multiverse of Madness', year: 2022, tmdbId: 453395, posterPath: 'https://image.tmdb.org/t/p/w342/ddJcSKbcp4rKZTmuyWaMhuwcfMz.jpg', kind: 'film' },
          { title: 'Thor: Love and Thunder', year: 2022, tmdbId: 616037, posterPath: 'https://image.tmdb.org/t/p/w342/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg', kind: 'film' },
          { title: 'Werewolf by Night', year: 2022, tmdbId: 894205, posterPath: 'https://image.tmdb.org/t/p/w342/mvIvNKRIJPPS7WSFarFhOAGIVnU.jpg', kind: 'special' },
          { title: 'Black Panther: Wakanda Forever', year: 2022, tmdbId: 505642, posterPath: 'https://image.tmdb.org/t/p/w342/sv1xJUazXeYqALzczSZ3O6nkH75.jpg', kind: 'film' },
          { title: 'The Guardians of the Galaxy Holiday Special', year: 2022, tmdbId: 774752, posterPath: 'https://image.tmdb.org/t/p/w342/8dqXyslZ2hv49Oiob9UjlGSHSTR.jpg', kind: 'special' },
          { title: 'Ant-Man and the Wasp: Quantumania', year: 2023, tmdbId: 640146, posterPath: 'https://image.tmdb.org/t/p/w342/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg', kind: 'film' },
          { title: 'Guardians of the Galaxy Vol. 3', year: 2023, tmdbId: 447365, posterPath: 'https://image.tmdb.org/t/p/w342/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg', kind: 'film' },
          { title: 'The Marvels', year: 2023, tmdbId: 609681, posterPath: 'https://image.tmdb.org/t/p/w342/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg', kind: 'film' },
          { title: 'Deadpool & Wolverine', year: 2024, tmdbId: 533535, posterPath: 'https://image.tmdb.org/t/p/w342/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg', kind: 'film' },
          { title: 'Captain America: Brave New World', year: 2025, tmdbId: 822119, posterPath: 'https://image.tmdb.org/t/p/w342/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg', kind: 'film' },
          { title: 'Thunderbolts*', year: 2025, tmdbId: 986056, posterPath: 'https://image.tmdb.org/t/p/w342/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg', kind: 'film' },
          { title: 'Spider-Man: Brand New Day', year: 2026, tmdbId: 969681, posterPath: 'https://image.tmdb.org/t/p/w342/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg', kind: 'film' },
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/8BTsTfln4jlQrLXUBquXJ0ASQy9.jpg',
    heroPosition: 'center 40%',
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
          { title: 'Star Wars: A New Hope', year: 1977, tmdbId: 11, posterPath: 'https://image.tmdb.org/t/p/w342/fai0rspsNeJCS69wHNjOdWxcI7P.jpg', kind: 'film' },
          { title: 'The Empire Strikes Back', year: 1980, tmdbId: 1891, posterPath: 'https://image.tmdb.org/t/p/w342/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg', kind: 'film' },
          { title: 'Return of the Jedi', year: 1983, tmdbId: 1892, posterPath: 'https://image.tmdb.org/t/p/w342/jQYlydvHm3kUix1f8prMucrplhm.jpg', kind: 'film' },
          { title: 'The Phantom Menace', year: 1999, tmdbId: 1893, posterPath: 'https://image.tmdb.org/t/p/w342/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg', kind: 'film' },
          { title: 'Attack of the Clones', year: 2002, tmdbId: 1894, posterPath: 'https://image.tmdb.org/t/p/w342/oZNPzxqM2s5DyVWab09NTQScDQt.jpg', kind: 'film' },
          { title: 'Revenge of the Sith', year: 2005, tmdbId: 1895, posterPath: 'https://image.tmdb.org/t/p/w342/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg', kind: 'film' },
          { title: 'The Clone Wars', year: 2008, tmdbId: 4194, posterPath: 'https://image.tmdb.org/t/p/w342/e1nWfnnCVqxS2LeTO3dwGyAsG2V.jpg', kind: 'series' },
          { title: 'Rebels', year: 2014, tmdbId: 60554, posterPath: 'https://image.tmdb.org/t/p/w342/eLrScs6Bs26JMcS8hiZhf7YRROr.jpg', kind: 'series' },
          { title: 'The Force Awakens', year: 2015, tmdbId: 140607, posterPath: 'https://image.tmdb.org/t/p/w342/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg', kind: 'film' },
          { title: 'Rogue One', year: 2016, tmdbId: 330459, posterPath: 'https://image.tmdb.org/t/p/w342/i0yw1mFbB7sNGHCs7EXZPzFkdA1.jpg', kind: 'film' },
          { title: 'The Last Jedi', year: 2017, tmdbId: 181808, posterPath: 'https://image.tmdb.org/t/p/w342/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg', kind: 'film' },
          { title: 'Solo: A Star Wars Story', year: 2018, tmdbId: 348350, posterPath: 'https://image.tmdb.org/t/p/w342/4oD6VEccFkorEBTEDXtpLAaz0Rl.jpg', kind: 'film' },
          { title: 'Star Wars Resistance', year: 2018, tmdbId: 79093, posterPath: 'https://image.tmdb.org/t/p/w342/xul6SG8rar3wkHPY8YusUtxcdlZ.jpg', kind: 'series' },
          { title: 'The Rise of Skywalker', year: 2019, tmdbId: 181812, posterPath: 'https://image.tmdb.org/t/p/w342/db32LaOibwEliAmSL2jjDF6oDdj.jpg', kind: 'film' },
          { title: 'The Mandalorian', year: 2019, tmdbId: 82856, posterPath: 'https://image.tmdb.org/t/p/w342/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg', kind: 'series' },
          { title: 'The Bad Batch', year: 2021, tmdbId: 105971, posterPath: 'https://image.tmdb.org/t/p/w342/5mHus672nuinyaE0FtqvD0AddcY.jpg', kind: 'series' },
          { title: 'Star Wars: Visions', year: 2021, tmdbId: 114478, posterPath: 'https://image.tmdb.org/t/p/w342/lG9ltUP4FwvsQBcwOJYceDbP48E.jpg', kind: 'series', note: 'anthology, outside the timeline' },
          { title: 'The Book of Boba Fett', year: 2021, tmdbId: 115036, posterPath: 'https://image.tmdb.org/t/p/w342/gNbdjDi1HamTCrfvM9JeA94bNi2.jpg', kind: 'series' },
          { title: 'Obi-Wan Kenobi', year: 2022, tmdbId: 92830, posterPath: 'https://image.tmdb.org/t/p/w342/qJRB789ceLryrLvOKrZqLKr2CGf.jpg', kind: 'series' },
          { title: 'Andor', year: 2022, tmdbId: 83867, posterPath: 'https://image.tmdb.org/t/p/w342/khZqmwHQicTYoS7Flreb9EddFZC.jpg', kind: 'series' },
          { title: 'Star Wars: Tales of the Jedi', year: 2022, tmdbId: 203085, posterPath: 'https://image.tmdb.org/t/p/w342/k3nWQb0E8mLSR8acSkJP78VRVMv.jpg', kind: 'series', note: 'anthology, spans eras' },
          { title: 'Star Wars: Young Jedi Adventures', year: 2023, tmdbId: 202998, posterPath: 'https://image.tmdb.org/t/p/w342/bC2Mix1WPUiY6pldh77oiFl1MvI.jpg', kind: 'series' },
          { title: 'Ahsoka', year: 2023, tmdbId: 114461, posterPath: 'https://image.tmdb.org/t/p/w342/eiJeWeCAEZAmRppnXHiTWDcCd3Q.jpg', kind: 'series' },
          { title: 'The Acolyte', year: 2024, tmdbId: 114479, posterPath: 'https://image.tmdb.org/t/p/w342/mztdt3y6GBsJR69zHtszFezTCLT.jpg', kind: 'series' },
          { title: 'Star Wars: Tales of the Empire', year: 2024, tmdbId: 251091, posterPath: 'https://image.tmdb.org/t/p/w342/qA28nLteurVboSSzltuyYt1lvlC.jpg', kind: 'series', note: 'anthology, spans eras' },
          { title: 'Skeleton Crew', year: 2024, tmdbId: 202879, posterPath: 'https://image.tmdb.org/t/p/w342/srQbJhLRKoAwRrNN5ga7webPHbC.jpg', kind: 'series' },
          { title: 'Star Wars: Tales of the Underworld', year: 2025, tmdbId: 288055, posterPath: 'https://image.tmdb.org/t/p/w342/qv1hagzp08cDJF6C04LyJVhcI1x.jpg', kind: 'series', note: 'anthology, spans eras' },
          { title: 'The Mandalorian and Grogu', year: 2026, tmdbId: 1228710, posterPath: 'https://image.tmdb.org/t/p/w342/uwMKWjcNID0D9jjplsjkQS2OrB4.jpg', kind: 'film' },
        ],
      },
      {
        heading: 'Timeline order, films and series',
        blurb:
          'The story front to back. Anthology collections (Visions and the Tales entries) sit outside a single timeline and are listed in the release order above instead.',
        items: [
          { title: 'Star Wars: Young Jedi Adventures', year: 2023, tmdbId: 202998, posterPath: 'https://image.tmdb.org/t/p/w342/bC2Mix1WPUiY6pldh77oiFl1MvI.jpg', kind: 'series', note: 'High Republic era' },
          { title: 'The Acolyte', year: 2024, tmdbId: 114479, posterPath: 'https://image.tmdb.org/t/p/w342/mztdt3y6GBsJR69zHtszFezTCLT.jpg', kind: 'series' },
          { title: 'The Phantom Menace', year: 1999, tmdbId: 1893, posterPath: 'https://image.tmdb.org/t/p/w342/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg', kind: 'film' },
          { title: 'Attack of the Clones', year: 2002, tmdbId: 1894, posterPath: 'https://image.tmdb.org/t/p/w342/oZNPzxqM2s5DyVWab09NTQScDQt.jpg', kind: 'film' },
          { title: 'The Clone Wars', year: 2008, tmdbId: 4194, posterPath: 'https://image.tmdb.org/t/p/w342/e1nWfnnCVqxS2LeTO3dwGyAsG2V.jpg', kind: 'series', note: 'runs between Episodes II and III' },
          { title: 'Revenge of the Sith', year: 2005, tmdbId: 1895, posterPath: 'https://image.tmdb.org/t/p/w342/xfSAoBEm9MNBjmlNcDYLvLSMlnq.jpg', kind: 'film' },
          { title: 'The Bad Batch', year: 2021, tmdbId: 105971, posterPath: 'https://image.tmdb.org/t/p/w342/5mHus672nuinyaE0FtqvD0AddcY.jpg', kind: 'series' },
          { title: 'Solo: A Star Wars Story', year: 2018, tmdbId: 348350, posterPath: 'https://image.tmdb.org/t/p/w342/4oD6VEccFkorEBTEDXtpLAaz0Rl.jpg', kind: 'film' },
          { title: 'Obi-Wan Kenobi', year: 2022, tmdbId: 92830, posterPath: 'https://image.tmdb.org/t/p/w342/qJRB789ceLryrLvOKrZqLKr2CGf.jpg', kind: 'series' },
          { title: 'Andor', year: 2022, tmdbId: 83867, posterPath: 'https://image.tmdb.org/t/p/w342/khZqmwHQicTYoS7Flreb9EddFZC.jpg', kind: 'series' },
          { title: 'Rebels', year: 2014, tmdbId: 60554, posterPath: 'https://image.tmdb.org/t/p/w342/eLrScs6Bs26JMcS8hiZhf7YRROr.jpg', kind: 'series' },
          { title: 'Rogue One', year: 2016, tmdbId: 330459, posterPath: 'https://image.tmdb.org/t/p/w342/i0yw1mFbB7sNGHCs7EXZPzFkdA1.jpg', kind: 'film' },
          { title: 'Star Wars: A New Hope', year: 1977, tmdbId: 11, posterPath: 'https://image.tmdb.org/t/p/w342/fai0rspsNeJCS69wHNjOdWxcI7P.jpg', kind: 'film' },
          { title: 'The Empire Strikes Back', year: 1980, tmdbId: 1891, posterPath: 'https://image.tmdb.org/t/p/w342/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg', kind: 'film' },
          { title: 'Return of the Jedi', year: 1983, tmdbId: 1892, posterPath: 'https://image.tmdb.org/t/p/w342/jQYlydvHm3kUix1f8prMucrplhm.jpg', kind: 'film' },
          { title: 'The Mandalorian', year: 2019, tmdbId: 82856, posterPath: 'https://image.tmdb.org/t/p/w342/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg', kind: 'series' },
          { title: 'The Book of Boba Fett', year: 2021, tmdbId: 115036, posterPath: 'https://image.tmdb.org/t/p/w342/gNbdjDi1HamTCrfvM9JeA94bNi2.jpg', kind: 'series' },
          { title: 'Ahsoka', year: 2023, tmdbId: 114461, posterPath: 'https://image.tmdb.org/t/p/w342/eiJeWeCAEZAmRppnXHiTWDcCd3Q.jpg', kind: 'series' },
          { title: 'Skeleton Crew', year: 2024, tmdbId: 202879, posterPath: 'https://image.tmdb.org/t/p/w342/srQbJhLRKoAwRrNN5ga7webPHbC.jpg', kind: 'series' },
          { title: 'The Mandalorian and Grogu', year: 2026, tmdbId: 1228710, posterPath: 'https://image.tmdb.org/t/p/w342/uwMKWjcNID0D9jjplsjkQS2OrB4.jpg', kind: 'film' },
          { title: 'Star Wars Resistance', year: 2018, tmdbId: 79093, posterPath: 'https://image.tmdb.org/t/p/w342/xul6SG8rar3wkHPY8YusUtxcdlZ.jpg', kind: 'series', note: 'leads into the sequel films' },
          { title: 'The Force Awakens', year: 2015, tmdbId: 140607, posterPath: 'https://image.tmdb.org/t/p/w342/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg', kind: 'film' },
          { title: 'The Last Jedi', year: 2017, tmdbId: 181808, posterPath: 'https://image.tmdb.org/t/p/w342/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg', kind: 'film' },
          { title: 'The Rise of Skywalker', year: 2019, tmdbId: 181812, posterPath: 'https://image.tmdb.org/t/p/w342/db32LaOibwEliAmSL2jjDF6oDdj.jpg', kind: 'film' },
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/oiwc338EoBgS4sEI2ixAny4KQKg.jpg',
    heroPosition: 'center 60%',
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
          { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, tmdbId: 120, posterPath: 'https://image.tmdb.org/t/p/w342/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', kind: 'film' },
          { title: 'The Lord of the Rings: The Two Towers', year: 2002, tmdbId: 121, posterPath: 'https://image.tmdb.org/t/p/w342/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg', kind: 'film' },
          { title: 'The Lord of the Rings: The Return of the King', year: 2003, tmdbId: 122, posterPath: 'https://image.tmdb.org/t/p/w342/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', kind: 'film' },
          { title: 'The Hobbit: An Unexpected Journey', year: 2012, tmdbId: 49051, posterPath: 'https://image.tmdb.org/t/p/w342/yHA9Fc37VmpUA5UncTxxo3rTGVA.jpg', kind: 'film' },
          { title: 'The Hobbit: The Desolation of Smaug', year: 2013, tmdbId: 57158, posterPath: 'https://image.tmdb.org/t/p/w342/xQYiXsheRCDBA39DOrmaw1aSpbk.jpg', kind: 'film' },
          { title: 'The Hobbit: The Battle of the Five Armies', year: 2014, tmdbId: 122917, posterPath: 'https://image.tmdb.org/t/p/w342/xT98tLqatZPQApyRmlPL12LtiWp.jpg', kind: 'film' },
          { title: 'The Lord of the Rings: The Rings of Power', year: 2022, tmdbId: 84773, posterPath: 'https://image.tmdb.org/t/p/w342/kf5Hz70tjNAHg4swGDzOr9BfoZ1.jpg', kind: 'series' },
          { title: 'The Lord of the Rings: The War of the Rohirrim', year: 2024, tmdbId: 839033, posterPath: 'https://image.tmdb.org/t/p/w342/23WCoDo6wzBfzbX7BGTNwVUqZfi.jpg', kind: 'film', note: 'animated' },
        ],
      },
      {
        heading: 'Timeline order',
        blurb: 'Middle-earth history front to back, for a rewatch.',
        items: [
          {
            title: 'The Lord of the Rings: The Rings of Power',
            year: 2022, tmdbId: 84773, posterPath: 'https://image.tmdb.org/t/p/w342/kf5Hz70tjNAHg4swGDzOr9BfoZ1.jpg',
            kind: 'series',
            note: 'the Second Age, thousands of years before the films',
          },
          {
            title: 'The Lord of the Rings: The War of the Rohirrim',
            year: 2024, tmdbId: 839033, posterPath: 'https://image.tmdb.org/t/p/w342/23WCoDo6wzBfzbX7BGTNwVUqZfi.jpg',
            kind: 'film',
            note: 'animated, about two centuries before The Hobbit',
          },
          { title: 'The Hobbit: An Unexpected Journey', year: 2012, tmdbId: 49051, posterPath: 'https://image.tmdb.org/t/p/w342/yHA9Fc37VmpUA5UncTxxo3rTGVA.jpg', kind: 'film' },
          { title: 'The Hobbit: The Desolation of Smaug', year: 2013, tmdbId: 57158, posterPath: 'https://image.tmdb.org/t/p/w342/xQYiXsheRCDBA39DOrmaw1aSpbk.jpg', kind: 'film' },
          { title: 'The Hobbit: The Battle of the Five Armies', year: 2014, tmdbId: 122917, posterPath: 'https://image.tmdb.org/t/p/w342/xT98tLqatZPQApyRmlPL12LtiWp.jpg', kind: 'film' },
          { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, tmdbId: 120, posterPath: 'https://image.tmdb.org/t/p/w342/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', kind: 'film' },
          { title: 'The Lord of the Rings: The Two Towers', year: 2002, tmdbId: 121, posterPath: 'https://image.tmdb.org/t/p/w342/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg', kind: 'film' },
          { title: 'The Lord of the Rings: The Return of the King', year: 2003, tmdbId: 122, posterPath: 'https://image.tmdb.org/t/p/w342/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', kind: 'film' },
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/zRKQW58MBEY078AxkHxEJzUskCl.jpg',
    heroPosition: 'center 30%',
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
          { title: 'Dune', year: 2021, tmdbId: 438631, posterPath: 'https://image.tmdb.org/t/p/w342/v1tRXZ4JtD2Iv6fjkPvT4GiwslV.jpg', kind: 'film', note: 'Part One, covers the first half of the novel' },
          { title: 'Dune: Part Two', year: 2024, tmdbId: 693134, posterPath: 'https://image.tmdb.org/t/p/w342/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg', kind: 'film' },
          {
            title: 'Dune: Prophecy',
            year: 2024, tmdbId: 90228, posterPath: 'https://image.tmdb.org/t/p/w342/oWVohNsxkxA3u92EzRo8fTuXIS0.jpg',
            kind: 'series',
            note: 'set around ten thousand years earlier; standalone, best enjoyed after the films',
          },
          { title: 'Dune: Part Three', year: 2026, tmdbId: 1170608, posterPath: 'https://image.tmdb.org/t/p/w342/d43fvHQsIMa4kpyhKXw0haEJIvI.jpg', kind: 'film', note: 'in cinemas December 2026' },
        ],
      },
      {
        heading: 'The earlier adaptations, optional',
        blurb: 'Not required for the Villeneuve films. Listed for the curious and the completist.',
        items: [
          { title: 'Dune', year: 1984, tmdbId: 841, posterPath: 'https://image.tmdb.org/t/p/w342/4kJmUCE7mkVJjXa7A0g2rY4IGTm.jpg', kind: 'film', note: 'David Lynch\'s adaptation of the full novel' },
          { title: 'Frank Herbert\'s Dune', year: 2000, tmdbId: 19566, posterPath: 'https://image.tmdb.org/t/p/w342/iIf5XeuuBKPtG6H7MfWLirbJGrQ.jpg', kind: 'series', note: 'three-part miniseries' },
          {
            title: 'Frank Herbert\'s Children of Dune',
            year: 2003, tmdbId: 9156, posterPath: 'https://image.tmdb.org/t/p/w342/yCP8lKXBMtcG1CU9K3NsWlu1RgF.jpg',
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/cbcpDn6XJaIGoOil1bKuskU8ds4.jpg',
    heroPosition: 'center 30%',
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
            year: 2001, tmdbId: 671, posterPath: 'https://image.tmdb.org/t/p/w342/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
            kind: 'film',
            note: "released as Philosopher's Stone outside the US",
          },
          { title: 'Harry Potter and the Chamber of Secrets', year: 2002, tmdbId: 672, posterPath: 'https://image.tmdb.org/t/p/w342/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg', kind: 'film' },
          { title: 'Harry Potter and the Prisoner of Azkaban', year: 2004, tmdbId: 673, posterPath: 'https://image.tmdb.org/t/p/w342/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg', kind: 'film' },
          { title: 'Harry Potter and the Goblet of Fire', year: 2005, tmdbId: 674, posterPath: 'https://image.tmdb.org/t/p/w342/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg', kind: 'film' },
          { title: 'Harry Potter and the Order of the Phoenix', year: 2007, tmdbId: 675, posterPath: 'https://image.tmdb.org/t/p/w342/5aOyriWkPec0zUDxmHFP9qMmBaj.jpg', kind: 'film' },
          { title: 'Harry Potter and the Half-Blood Prince', year: 2009, tmdbId: 767, posterPath: 'https://image.tmdb.org/t/p/w342/z7uo9zmQdQwU5ZJHFpv2Upl30i1.jpg', kind: 'film' },
          { title: 'Harry Potter and the Deathly Hallows: Part 1', year: 2010, tmdbId: 12444, posterPath: 'https://image.tmdb.org/t/p/w342/iGoXIpQb7Pot00EEdwpwPajheZ5.jpg', kind: 'film' },
          { title: 'Harry Potter and the Deathly Hallows: Part 2', year: 2011, tmdbId: 12445, posterPath: 'https://image.tmdb.org/t/p/w342/c54HpQmuwXjHq2C9wmoACjxoom3.jpg', kind: 'film' },
          { title: 'Fantastic Beasts and Where to Find Them', year: 2016, tmdbId: 259316, posterPath: 'https://image.tmdb.org/t/p/w342/h6NYfVUyM6CDURtZSnBpz647Ldd.jpg', kind: 'film' },
          { title: 'Fantastic Beasts: The Crimes of Grindelwald', year: 2018, tmdbId: 338952, posterPath: 'https://image.tmdb.org/t/p/w342/fMMrl8fD9gRCFJvsx0SuFwkEOop.jpg', kind: 'film' },
          { title: 'Fantastic Beasts: The Secrets of Dumbledore', year: 2022, tmdbId: 338953, posterPath: 'https://image.tmdb.org/t/p/w342/3c5GNLB4yRSLBby0trHoA1DSQxQ.jpg', kind: 'film' },
        ],
      },
      {
        heading: 'Story (chronological) order',
        blurb: 'The in-universe timeline, from the 1920s to the 1990s. For a rewatch.',
        items: [
          {
            title: 'Fantastic Beasts and Where to Find Them',
            year: 2016, tmdbId: 259316, posterPath: 'https://image.tmdb.org/t/p/w342/h6NYfVUyM6CDURtZSnBpz647Ldd.jpg',
            kind: 'film',
            note: 'set in 1926',
          },
          {
            title: 'Fantastic Beasts: The Crimes of Grindelwald',
            year: 2018, tmdbId: 338952, posterPath: 'https://image.tmdb.org/t/p/w342/fMMrl8fD9gRCFJvsx0SuFwkEOop.jpg',
            kind: 'film',
            note: 'set in 1927',
          },
          {
            title: 'Fantastic Beasts: The Secrets of Dumbledore',
            year: 2022, tmdbId: 338953, posterPath: 'https://image.tmdb.org/t/p/w342/3c5GNLB4yRSLBby0trHoA1DSQxQ.jpg',
            kind: 'film',
            note: 'set in the early 1930s',
          },
          {
            title: "Harry Potter and the Sorcerer's Stone",
            year: 2001, tmdbId: 671, posterPath: 'https://image.tmdb.org/t/p/w342/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
            kind: 'film',
            note: 'the main story runs 1991 to 1998 from here',
          },
          { title: 'Harry Potter and the Chamber of Secrets', year: 2002, tmdbId: 672, posterPath: 'https://image.tmdb.org/t/p/w342/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg', kind: 'film' },
          { title: 'Harry Potter and the Prisoner of Azkaban', year: 2004, tmdbId: 673, posterPath: 'https://image.tmdb.org/t/p/w342/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg', kind: 'film' },
          { title: 'Harry Potter and the Goblet of Fire', year: 2005, tmdbId: 674, posterPath: 'https://image.tmdb.org/t/p/w342/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg', kind: 'film' },
          { title: 'Harry Potter and the Order of the Phoenix', year: 2007, tmdbId: 675, posterPath: 'https://image.tmdb.org/t/p/w342/5aOyriWkPec0zUDxmHFP9qMmBaj.jpg', kind: 'film' },
          { title: 'Harry Potter and the Half-Blood Prince', year: 2009, tmdbId: 767, posterPath: 'https://image.tmdb.org/t/p/w342/z7uo9zmQdQwU5ZJHFpv2Upl30i1.jpg', kind: 'film' },
          { title: 'Harry Potter and the Deathly Hallows: Part 1', year: 2010, tmdbId: 12444, posterPath: 'https://image.tmdb.org/t/p/w342/iGoXIpQb7Pot00EEdwpwPajheZ5.jpg', kind: 'film' },
          { title: 'Harry Potter and the Deathly Hallows: Part 2', year: 2011, tmdbId: 12445, posterPath: 'https://image.tmdb.org/t/p/w342/c54HpQmuwXjHq2C9wmoACjxoom3.jpg', kind: 'film' },
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/c1Q8jLoaruQ9m5lCrVlXOaJJtu7.jpg',
    heroPosition: 'center 25%',
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
          { title: 'The Fast and the Furious', year: 2001, tmdbId: 9799, posterPath: 'https://image.tmdb.org/t/p/w342/gqY0ITBgT7A82poL9jv851qdnIb.jpg', kind: 'film' },
          { title: '2 Fast 2 Furious', year: 2003, tmdbId: 584, posterPath: 'https://image.tmdb.org/t/p/w342/6nDZExrDKIXvSAghsFKVFRVJuSf.jpg', kind: 'film' },
          {
            title: 'The Fast and the Furious: Tokyo Drift',
            year: 2006, tmdbId: 9615, posterPath: 'https://image.tmdb.org/t/p/w342/46xqGOwHbh2TH2avWSw3SMXph4E.jpg',
            kind: 'film',
            note: 'chronologically ninth; see the timeline order below',
          },
          { title: 'Fast & Furious', year: 2009, tmdbId: 13804, posterPath: 'https://image.tmdb.org/t/p/w342/lUtVoRukW7WNtUySwd8hWlByBds.jpg', kind: 'film' },
          { title: 'Fast Five', year: 2011, tmdbId: 51497, posterPath: 'https://image.tmdb.org/t/p/w342/gEfQjjQwY7fh5bI4GlG0RrBu7Pz.jpg', kind: 'film' },
          { title: 'Fast & Furious 6', year: 2013, tmdbId: 82992, posterPath: 'https://image.tmdb.org/t/p/w342/thSmnRdrzPBBospIOJjLZBReqzo.jpg', kind: 'film' },
          { title: 'Furious 7', year: 2015, tmdbId: 168259, posterPath: 'https://image.tmdb.org/t/p/w342/ktofZ9Htrjiy0P6LEowsDaxd3Ri.jpg', kind: 'film' },
          { title: 'The Fate of the Furious', year: 2017, tmdbId: 337339, posterPath: 'https://image.tmdb.org/t/p/w342/dImWM7GJqryWJO9LHa3XQ8DD5NH.jpg', kind: 'film' },
          {
            title: 'Fast & Furious Presents: Hobbs & Shaw',
            year: 2019, tmdbId: 384018, posterPath: 'https://image.tmdb.org/t/p/w342/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg',
            kind: 'film',
            note: 'spinoff; skippable for the main story',
          },
          { title: 'F9', year: 2021, tmdbId: 385128, posterPath: 'https://image.tmdb.org/t/p/w342/deEmLILTPejEb6OGsXRJ5MCvyDW.jpg', kind: 'film' },
          { title: 'Fast X', year: 2023, tmdbId: 385687, posterPath: 'https://image.tmdb.org/t/p/w342/fiVW06jE7z9YnO4trhaMEdclSiC.jpg', kind: 'film' },
        ],
      },
      {
        heading: 'Chronological (story) order',
        blurb: 'The in-universe timeline. Tokyo Drift slots in after Fast & Furious 6, whose ending overlaps it.',
        items: [
          { title: 'The Fast and the Furious', year: 2001, tmdbId: 9799, posterPath: 'https://image.tmdb.org/t/p/w342/gqY0ITBgT7A82poL9jv851qdnIb.jpg', kind: 'film' },
          { title: '2 Fast 2 Furious', year: 2003, tmdbId: 584, posterPath: 'https://image.tmdb.org/t/p/w342/6nDZExrDKIXvSAghsFKVFRVJuSf.jpg', kind: 'film' },
          { title: 'Fast & Furious', year: 2009, tmdbId: 13804, posterPath: 'https://image.tmdb.org/t/p/w342/lUtVoRukW7WNtUySwd8hWlByBds.jpg', kind: 'film' },
          { title: 'Fast Five', year: 2011, tmdbId: 51497, posterPath: 'https://image.tmdb.org/t/p/w342/gEfQjjQwY7fh5bI4GlG0RrBu7Pz.jpg', kind: 'film' },
          {
            title: 'Fast & Furious 6',
            year: 2013, tmdbId: 82992, posterPath: 'https://image.tmdb.org/t/p/w342/thSmnRdrzPBBospIOJjLZBReqzo.jpg',
            kind: 'film',
            note: 'its final scene replays a moment from Tokyo Drift',
          },
          {
            title: 'The Fast and the Furious: Tokyo Drift',
            year: 2006, tmdbId: 9615, posterPath: 'https://image.tmdb.org/t/p/w342/46xqGOwHbh2TH2avWSw3SMXph4E.jpg',
            kind: 'film',
            note: "Han's Tokyo story, now in its right place",
          },
          { title: 'Furious 7', year: 2015, tmdbId: 168259, posterPath: 'https://image.tmdb.org/t/p/w342/ktofZ9Htrjiy0P6LEowsDaxd3Ri.jpg', kind: 'film' },
          { title: 'The Fate of the Furious', year: 2017, tmdbId: 337339, posterPath: 'https://image.tmdb.org/t/p/w342/dImWM7GJqryWJO9LHa3XQ8DD5NH.jpg', kind: 'film' },
          { title: 'Fast & Furious Presents: Hobbs & Shaw', year: 2019, tmdbId: 384018, posterPath: 'https://image.tmdb.org/t/p/w342/qRyy2UmjC5ur9bDi3kpNNRCc5nc.jpg', kind: 'film' },
          { title: 'F9', year: 2021, tmdbId: 385128, posterPath: 'https://image.tmdb.org/t/p/w342/deEmLILTPejEb6OGsXRJ5MCvyDW.jpg', kind: 'film' },
          { title: 'Fast X', year: 2023, tmdbId: 385687, posterPath: 'https://image.tmdb.org/t/p/w342/fiVW06jE7z9YnO4trhaMEdclSiC.jpg', kind: 'film' },
        ],
      },
    ],
    hasAppTrack: true,
    faqs: [
      {
        q: 'What is the order of the Fast and Furious movies?',
        a: [
          'In release order: The Fast and the Furious (2001), 2 Fast 2 Furious (2003), Tokyo Drift (2006), Fast & Furious (2009), Fast Five (2011), Fast & Furious 6 (2013), Furious 7 (2015), The Fate of the Furious (2017), Hobbs & Shaw (2019), F9 (2021) and Fast X (2023). That is the order to watch for a first time. The chronological timeline runs the same, except Tokyo Drift moves to ninth, after Fast & Furious 6, whose ending overlaps it.',
        ],
      },
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/AmR3JG1VQVxU8TfAvljUhfSFUOx.jpg',
    heroPosition: 'center 35%',
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
          { title: 'Alien', year: 1979, tmdbId: 348, posterPath: 'https://image.tmdb.org/t/p/w342/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg', kind: 'film' },
          { title: 'Aliens', year: 1986, tmdbId: 679, posterPath: 'https://image.tmdb.org/t/p/w342/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg', kind: 'film' },
          { title: 'Alien 3', year: 1992, tmdbId: 8077, posterPath: 'https://image.tmdb.org/t/p/w342/xh5wI0UoW7DfS1IyLy3d2CgrCEP.jpg', kind: 'film' },
          { title: 'Alien Resurrection', year: 1997, tmdbId: 8078, posterPath: 'https://image.tmdb.org/t/p/w342/9aRDMlU5Zwpysilm0WCWzU2PCFv.jpg', kind: 'film' },
          {
            title: 'Prometheus',
            year: 2012, tmdbId: 70981, posterPath: 'https://image.tmdb.org/t/p/w342/qsYQflQhOuhDpQ0W2aOcwqgDAeI.jpg',
            kind: 'film',
            note: 'prequel era starts here',
          },
          { title: 'Alien: Covenant', year: 2017, tmdbId: 126889, posterPath: 'https://image.tmdb.org/t/p/w342/zecMELPbU5YMQpC81Z8ImaaXuf9.jpg', kind: 'film' },
          { title: 'Alien: Romulus', year: 2024, tmdbId: 945961, posterPath: 'https://image.tmdb.org/t/p/w342/2uSWRTtCG336nuBiG8jOTEUKSy8.jpg', kind: 'film' },
          { title: 'Alien: Earth', year: 2025, tmdbId: 157239, posterPath: 'https://image.tmdb.org/t/p/w342/yueXS3q8BtoWekcHOATFHicLl3e.jpg', kind: 'series' },
        ],
      },
      {
        heading: 'Timeline (chronological) order',
        blurb: 'The in-universe order, from the Prometheus expedition to the far future.',
        items: [
          { title: 'Prometheus', year: 2012, tmdbId: 70981, posterPath: 'https://image.tmdb.org/t/p/w342/qsYQflQhOuhDpQ0W2aOcwqgDAeI.jpg', kind: 'film', note: 'set in 2089 to 2093' },
          { title: 'Alien: Covenant', year: 2017, tmdbId: 126889, posterPath: 'https://image.tmdb.org/t/p/w342/zecMELPbU5YMQpC81Z8ImaaXuf9.jpg', kind: 'film', note: 'set in 2104' },
          {
            title: 'Alien: Earth',
            year: 2025, tmdbId: 157239, posterPath: 'https://image.tmdb.org/t/p/w342/yueXS3q8BtoWekcHOATFHicLl3e.jpg',
            kind: 'series',
            note: 'set in 2120, two years before Alien',
          },
          { title: 'Alien', year: 1979, tmdbId: 348, posterPath: 'https://image.tmdb.org/t/p/w342/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg', kind: 'film', note: 'set in 2122' },
          {
            title: 'Alien: Romulus',
            year: 2024, tmdbId: 945961, posterPath: 'https://image.tmdb.org/t/p/w342/2uSWRTtCG336nuBiG8jOTEUKSy8.jpg',
            kind: 'film',
            note: 'set in 2142, between Alien and Aliens',
          },
          { title: 'Aliens', year: 1986, tmdbId: 679, posterPath: 'https://image.tmdb.org/t/p/w342/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg', kind: 'film', note: 'set in 2179' },
          { title: 'Alien 3', year: 1992, tmdbId: 8077, posterPath: 'https://image.tmdb.org/t/p/w342/xh5wI0UoW7DfS1IyLy3d2CgrCEP.jpg', kind: 'film', note: 'follows Aliens directly' },
          { title: 'Alien Resurrection', year: 1997, tmdbId: 8078, posterPath: 'https://image.tmdb.org/t/p/w342/9aRDMlU5Zwpysilm0WCWzU2PCFv.jpg', kind: 'film', note: 'set around 2381' },
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/felXFRjJXF40NPzK1IPib8ojF2X.jpg',
    heroPosition: 'center 30%',
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
          { title: 'Dragon Ball', year: 1986, tmdbId: 12609, posterPath: 'https://image.tmdb.org/t/p/w342/onCLyCOgszTIyyVs2XKYSkKPOPG.jpg', kind: 'series', note: "Goku's childhood; 153 episodes" },
          { title: 'Dragon Ball Z', year: 1989, tmdbId: 12971, posterPath: 'https://image.tmdb.org/t/p/w342/oQ5CnVj3TRifXl2bIOri6H6rfNe.jpg', kind: 'series' },
          {
            title: 'Dragon Ball Super',
            year: 2015, tmdbId: 62715, posterPath: 'https://image.tmdb.org/t/p/w342/qEUrbXJ2qt4Rg84Btlx4STOhgte.jpg',
            kind: 'series',
            note: "set in the gap before Z's ten-years-later epilogue",
          },
          {
            title: 'Dragon Ball DAIMA',
            year: 2024, tmdbId: 236994, posterPath: 'https://image.tmdb.org/t/p/w342/lMULbSFZNXUC87MqOZQ4SSV9DXI.jpg',
            kind: 'series',
            note: 'a side story set just after the Buu arc; made after Super, best watched after it',
          },
          {
            title: 'Dragon Ball GT',
            year: 1996, tmdbId: 12697, posterPath: 'https://image.tmdb.org/t/p/w342/rLHhDpv6rrhuzBjNzaMRNv2fng.jpg',
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
            year: 2013, tmdbId: 126963, posterPath: 'https://image.tmdb.org/t/p/w342/nxZEdYcHMuD8SSuwusDnK9CD2H1.jpg',
            kind: 'film',
            note: 'canon; retold as the opening arc of Super',
          },
          {
            title: "Dragon Ball Z: Resurrection 'F'",
            year: 2015, tmdbId: 303857, posterPath: 'https://image.tmdb.org/t/p/w342/soq3AxjALdBfdPAm8H7yuMmNL5Y.jpg',
            kind: 'film',
            note: 'canon; also retold in Super',
          },
          { title: 'Dragon Ball Super: Broly', year: 2018, tmdbId: 503314, posterPath: 'https://image.tmdb.org/t/p/w342/uMEgkyiPznZP5AiMSWAk2jsj5gC.jpg', kind: 'film', note: 'canon, after the Super series' },
          { title: 'Dragon Ball Super: Super Hero', year: 2022, tmdbId: 610150, posterPath: 'https://image.tmdb.org/t/p/w342/pi0iZOEHeA3ih4p1IwAG4x2DZNH.jpg', kind: 'film', note: 'canon, the latest chapter' },
          {
            title: 'Curse of the Blood Rubies',
            year: 1986, tmdbId: 39144, posterPath: 'https://image.tmdb.org/t/p/w342/dZCWRFJnwyxYOhzAhf7Xyru4moB.jpg',
            kind: 'film',
            note: 'original Dragon Ball era side stories start here',
          },
          { title: 'Sleeping Princess in Devil\'s Castle', year: 1987, tmdbId: 39145, posterPath: 'https://image.tmdb.org/t/p/w342/9BMFoAqU4DadJajmL3BX0CgJXfe.jpg', kind: 'film' },
          { title: 'Mystical Adventure', year: 1988, tmdbId: 116776, posterPath: 'https://image.tmdb.org/t/p/w342/4uPs9rjKkGWOmc5QO4VV08YdLpV.jpg', kind: 'film' },
          { title: 'The Path to Power', year: 1996, tmdbId: 39148, posterPath: 'https://image.tmdb.org/t/p/w342/wPkoqtFhDoIbzt61oOYwmLOZdAg.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: Dead Zone', year: 1989, tmdbId: 28609, posterPath: 'https://image.tmdb.org/t/p/w342/ywtyEDTM2YO7qod7USNNwhrAfvA.jpg', kind: 'film', note: 'Z era side stories start here' },
          { title: "Dragon Ball Z: The World's Strongest", year: 1990, tmdbId: 39100, posterPath: 'https://image.tmdb.org/t/p/w342/5elbm3iLgGQ6nA5vqUmi9vIojbF.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: The Tree of Might', year: 1990, tmdbId: 39101, posterPath: 'https://image.tmdb.org/t/p/w342/fDX4Dp8IKvjBAaEb5MOJrGkxWX0.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: Lord Slug', year: 1991, tmdbId: 39102, posterPath: 'https://image.tmdb.org/t/p/w342/1lmwZTsqwTtvd3m60pyQfhGM2Ut.jpg', kind: 'film' },
          { title: "Dragon Ball Z: Cooler's Revenge", year: 1991, tmdbId: 24752, posterPath: 'https://image.tmdb.org/t/p/w342/uqTSXqjaSgSAT2lCv3GyZeodQPG.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: The Return of Cooler', year: 1992, tmdbId: 39103, posterPath: 'https://image.tmdb.org/t/p/w342/ipfeRIqcBj5NfCLkTtg39enfJV2.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: Super Android 13!', year: 1992, tmdbId: 39104, posterPath: 'https://image.tmdb.org/t/p/w342/uVJqC187rKxQ1sJsWlKjNfAzeTk.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: Broly, the Legendary Super Saiyan', year: 1993, tmdbId: 34433, posterPath: 'https://image.tmdb.org/t/p/w342/6iO8TJCyLI4BiPYOvdwzPV2bhoV.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: Bojack Unbound', year: 1993, tmdbId: 39105, posterPath: 'https://image.tmdb.org/t/p/w342/iihTK9Af8G1ZzBjkIIAV4qQMkzF.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: Broly, Second Coming', year: 1994, tmdbId: 44251, posterPath: 'https://image.tmdb.org/t/p/w342/Apnw8FWoPOIsu14d5dvaNZzFSJE.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: Bio-Broly', year: 1994, tmdbId: 39106, posterPath: 'https://image.tmdb.org/t/p/w342/A0VKJ6eRIubW6wH4eAwcpQfjoRD.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: Fusion Reborn', year: 1995, tmdbId: 39107, posterPath: 'https://image.tmdb.org/t/p/w342/rCU5ddP3FVSDJy81UldUsBuf3ag.jpg', kind: 'film' },
          { title: 'Dragon Ball Z: Wrath of the Dragon', year: 1995, tmdbId: 39108, posterPath: 'https://image.tmdb.org/t/p/w342/7uRu9EA3nie0n2mlVDDLlTI3IzC.jpg', kind: 'film' },
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/z0YhJvomqedHF85bplUJEotkN5l.jpg',
    heroPosition: 'center 25%',
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
          { title: 'Naruto', year: 2002, tmdbId: 46260, posterPath: 'https://image.tmdb.org/t/p/w342/xppeysfvDKVx775MFuH8Z9BlpMk.jpg', kind: 'series' },
          { title: 'Naruto: Shippuden', year: 2007, tmdbId: 31910, posterPath: 'https://image.tmdb.org/t/p/w342/kV27j3Nz4d5z8u6mN3EJw9RiLg2.jpg', kind: 'series' },
          { title: 'Boruto: Naruto Next Generations', year: 2017, tmdbId: 70881, posterPath: 'https://image.tmdb.org/t/p/w342/e0B6i48kxdRkMcK4tR4YNfXGWOc.jpg', kind: 'series' },
        ],
      },
      {
        heading: 'The films, in order, with placement',
        blurb:
          'The first nine are self-contained side stories: watch them near their place in the series, or skip them freely. The last two are canon.',
        items: [
          {
            title: 'Ninja Clash in the Land of Snow',
            year: 2004, tmdbId: 16907, posterPath: 'https://image.tmdb.org/t/p/w342/eUNRUeSNzm8LktH4HRaYiAReB6R.jpg',
            kind: 'film',
            note: 'original series era',
          },
          { title: 'Legend of the Stone of Gelel', year: 2005, tmdbId: 16910, posterPath: 'https://image.tmdb.org/t/p/w342/itKMldwL6uhUZYO3X78NOFU4zzO.jpg', kind: 'film', note: 'original series era' },
          {
            title: 'Guardians of the Crescent Moon Kingdom',
            year: 2006, tmdbId: 18861, posterPath: 'https://image.tmdb.org/t/p/w342/mmKiJ93x6uhTwJlrxCoY38R4qo6.jpg',
            kind: 'film',
            note: 'original series era',
          },
          { title: 'Naruto Shippuden the Movie', year: 2007, tmdbId: 20982, posterPath: 'https://image.tmdb.org/t/p/w342/vDkct38sSFSWJIATlfJw0l3QOIR.jpg', kind: 'film', note: 'Shippuden era' },
          { title: 'Bonds', year: 2008, tmdbId: 17581, posterPath: 'https://image.tmdb.org/t/p/w342/bBqEiQbbfyt4MWR3NhDZMbS4Wp8.jpg', kind: 'film', note: 'Shippuden era' },
          { title: 'The Will of Fire', year: 2009, tmdbId: 36728, posterPath: 'https://image.tmdb.org/t/p/w342/pZzdFmztwmg0FUOVCMa7vReHhQN.jpg', kind: 'film', note: 'Shippuden era' },
          { title: 'The Lost Tower', year: 2010, tmdbId: 50723, posterPath: 'https://image.tmdb.org/t/p/w342/6e2YvN1tQK4xQHlmy7GJTuXOt2u.jpg', kind: 'film', note: 'Shippuden era' },
          { title: 'Blood Prison', year: 2011, tmdbId: 75624, posterPath: 'https://image.tmdb.org/t/p/w342/4WT7zYFpe0fsbg6TitppiHddWAh.jpg', kind: 'film', note: 'Shippuden era' },
          { title: 'Road to Ninja', year: 2012, tmdbId: 118406, posterPath: 'https://image.tmdb.org/t/p/w342/xLal6fXNtiJN6Zw6qk21xAtdOeN.jpg', kind: 'film', note: 'Shippuden era' },
          {
            title: 'The Last: Naruto the Movie',
            year: 2014, tmdbId: 317442, posterPath: 'https://image.tmdb.org/t/p/w342/bAQ8O5Uw6FedtlCbJTutenzPVKd.jpg',
            kind: 'film',
            note: 'canon; after the war arc, before the Shippuden finale',
          },
          {
            title: 'Boruto: Naruto the Movie',
            year: 2015, tmdbId: 347201, posterPath: 'https://image.tmdb.org/t/p/w342/1k6iwC4KaPvTBt1JuaqXy3noZRY.jpg',
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/1EAxNqdkVnp48a7NUuNBHGflowM.jpg',
    heroPosition: 'center 35%',
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
            year: 1995, tmdbId: 890, posterPath: 'https://image.tmdb.org/t/p/w342/y2ah9t0navXyIvoHg1uIbIHO3tt.jpg',
            kind: 'series',
            note: '26 episodes',
          },
          {
            title: 'Neon Genesis Evangelion: The End of Evangelion',
            year: 1997, tmdbId: 18491, posterPath: 'https://image.tmdb.org/t/p/w342/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg',
            kind: 'film',
            note: 'the theatrical ending, replacing episodes 25 and 26',
          },
          { title: 'Evangelion: 1.0 You Are (Not) Alone', year: 2007, tmdbId: 15137, posterPath: 'https://image.tmdb.org/t/p/w342/pETU4GurpeEjBOM8oytMH0yNBHx.jpg', kind: 'film' },
          { title: 'Evangelion: 2.0 You Can (Not) Advance', year: 2009, tmdbId: 22843, posterPath: 'https://image.tmdb.org/t/p/w342/7VLYN2CfJpB6PrcuzDKKqdGSUi6.jpg', kind: 'film' },
          { title: 'Evangelion: 3.0 You Can (Not) Redo', year: 2012, tmdbId: 75629, posterPath: 'https://image.tmdb.org/t/p/w342/d0s1xvykzl0kz7fP5S2ROYqphdz.jpg', kind: 'film' },
          {
            title: 'Evangelion: 3.0+1.0 Thrice Upon a Time',
            year: 2021, tmdbId: 283566, posterPath: 'https://image.tmdb.org/t/p/w342/md5wZRRj8biHrGtyitgBZo7674t.jpg',
            kind: 'film',
            note: 'the conclusion',
          },
        ],
      },
      {
        heading: 'The Rebuild-only route',
        blurb: 'A complete story in four films for someone who will not commit to the series. It works; it just carries less weight.',
        items: [
          { title: 'Evangelion: 1.0 You Are (Not) Alone', year: 2007, tmdbId: 15137, posterPath: 'https://image.tmdb.org/t/p/w342/pETU4GurpeEjBOM8oytMH0yNBHx.jpg', kind: 'film' },
          { title: 'Evangelion: 2.0 You Can (Not) Advance', year: 2009, tmdbId: 22843, posterPath: 'https://image.tmdb.org/t/p/w342/7VLYN2CfJpB6PrcuzDKKqdGSUi6.jpg', kind: 'film' },
          { title: 'Evangelion: 3.0 You Can (Not) Redo', year: 2012, tmdbId: 75629, posterPath: 'https://image.tmdb.org/t/p/w342/d0s1xvykzl0kz7fP5S2ROYqphdz.jpg', kind: 'film' },
          { title: 'Evangelion: 3.0+1.0 Thrice Upon a Time', year: 2021, tmdbId: 283566, posterPath: 'https://image.tmdb.org/t/p/w342/md5wZRRj8biHrGtyitgBZo7674t.jpg', kind: 'film' },
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
