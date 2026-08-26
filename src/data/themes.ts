// Copy for the /themes/ pages: one entry per /themes/<slug> page, rendered by
// ThemePage.astro via src/pages/themes/[slug].astro, listed on the
// /themes archive index, and surfaced (latest few) on /guides.
//
// Same contract as listicles.ts: one source of truth, FAQs render twice
// (visible markup + FAQPage JSON-LD) and must never drift, and the visible
// list order IS the ItemList order.
//
// Source of truth for the curation itself is the app: every entry republishes
// a weekly themed collection that ran in the I Like Movies Discover tab
// (hand-curated in the backend's docs/weekly_themes_2026.md and seeded from
// there). The movie lists are copied verbatim in their curated order, always
// 21 films, featured film first. Only themes whose week has already started
// are published here; upcoming weeks stay unspoiled until they air, so this
// file grows by one entry per site update.

export type ThemeMovie = {
  title: string;
  year: number;
  /** Director surname(s) as curated, rendered as a muted note after the year. */
  director: string;
  /**
   * One very short sentence: premise and tone, enough to know whether you
   * would enjoy it. Same rule as the /list blurbs: what the film is, never
   * that it is good.
   */
  blurb: string;
  /**
   * Top-3 billed cast from the TMDB API, never written from memory. Absent
   * for the documentaries TMDB lists without a cast.
   */
  cast?: string;
};

export type WeeklyTheme = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  /** ISO date of the Friday the theme went live in the app. */
  weekOf: string;
  /**
   * The featured film's TMDB backdrop, the same hero image the app shows for
   * the week (weekly_themes.hero_backdrop_url in the backend DB). Rendered
   * full-bleed above the page heading.
   */
  heroBackdropUrl: string;
  intro: string[];
  /** Curated order from the app, featured film first. Always 21 films. */
  items: ThemeMovie[];
  /** One paragraph on where the app genuinely helps, rendered before the FAQ. */
  appNote: string;
  faqs: { q: string; a: string[] }[];
};

/** "2026-04-24" rendered the way the pages talk about it: "April 24, 2026". */
export function formatWeek(weekOf: string): string {
  return new Date(`${weekOf}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

// Newest first: the archive index and the /guides hub both read this order.
export const WEEKLY_THEMES: WeeklyTheme[] = [
  {
    slug: 'female-auteurs',
    title: '21 essential films by female directors, from The Piano to Jeanne Dielman',
    metaDescription:
      '21 essential films by female directors, from The Piano and Jeanne Dielman to Beau Travail, Lost in Translation and Toni Erdmann, curated as a weekly collection.',
    h1: '21 essential films by female directors',
    weekOf: '2026-08-21',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/hAp5WU9fYv7NEzTDXyhYOWhxCR1.jpg',
    intro: [
      'Auteur theory was never about gender, and these directors proved it: Chantal Akerman making three hours of housework the most radical film of its decade, Varda wandering with her camera, Campion\'s pianos, Ramsay filming grief like a wound that will not close. In 2022, Sight and Sound\'s critics\' poll crowned Jeanne Dielman the greatest film ever made.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of August 21, 2026, featuring The Piano. It carries two films each from Campion, Ramsay and Bigelow, who was the only woman to win the Best Director Oscar until Chloé Zhao in 2021.',
    ],
    items: [
      { title: 'The Piano', year: 1993, director: 'Campion', cast: 'Holly Hunter, Harvey Keitel, Sam Neill', blurb: 'A mute bride in colonial New Zealand bargains for her piano, key by key.' },
      { title: 'The Power of the Dog', year: 2021, director: 'Campion', cast: 'Benedict Cumberbatch, Kodi Smit-McPhee, Kirsten Dunst', blurb: "A charismatic rancher torments his brother's new family; menace in slow motion." },
      { title: 'Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles', year: 1975, director: 'Akerman', cast: 'Delphine Seyrig, Jan Decorte, Henri Storck', blurb: 'Three days of housework in near real time, until the routine cracks.' },
      { title: 'Vagabond', year: 1985, director: 'Varda', cast: 'Sandrine Bonnaire, Macha Méril, Yolande Moreau', blurb: 'A young drifter is found frozen; the film walks her road backwards.' },
      { title: 'We Need to Talk About Kevin', year: 2011, director: 'Ramsay', cast: 'Tilda Swinton, John C. Reilly, Ezra Miller', blurb: "A mother sifts her son's childhood for the seeds of an atrocity." },
      { title: 'You Were Never Really Here', year: 2017, director: 'Ramsay', cast: 'Joaquin Phoenix, Judith Roberts, Ekaterina Samsonov', blurb: 'A hired hammer rescues trafficked girls; a thriller stripped to nerves.' },
      { title: 'The Hurt Locker', year: 2008, director: 'Bigelow', cast: 'Jeremy Renner, Anthony Mackie, Brian Geraghty', blurb: 'A bomb-disposal addict in Baghdad; tension measured by the wire.' },
      { title: 'Zero Dark Thirty', year: 2012, director: 'Bigelow', cast: 'Jessica Chastain, Jason Clarke, Joel Edgerton', blurb: 'The decade-long hunt for bin Laden, told procedural-cold.' },
      { title: 'Lost in Translation', year: 2003, director: 'Sofia Coppola', cast: 'Bill Murray, Scarlett Johansson, Giovanni Ribisi', blurb: 'Two jet-lagged strangers drift through Tokyo nights together.' },
      { title: 'Lady Bird', year: 2017, director: 'Gerwig', cast: 'Saoirse Ronan, Laurie Metcalf, Tracy Letts', blurb: 'A Sacramento senior wars with her mother and her own pretensions.' },
      { title: 'Beau Travail', year: 1999, director: 'Denis', cast: 'Denis Lavant, Michel Subor, Grégoire Colin', blurb: 'Foreign Legion drills as ballet, jealousy as tragedy; that final dance.' },
      { title: 'Toni Erdmann', year: 2016, director: 'Ade', cast: 'Sandra Hüller, Peter Simonischek, Michael Wittenborn', blurb: "A prankster father invades his consultant daughter's life in a false-teeth disguise." },
      { title: 'Fish Tank', year: 2009, director: 'Arnold', cast: 'Katie Jarvis, Michael Fassbender, Kierston Wareing', blurb: "An Essex teenager, a dance audition, and her mother's dangerous boyfriend." },
      { title: 'Daughters of the Dust', year: 1991, director: 'Dash', cast: 'Cora Lee Day, Alva Rogers, Barbara O. Jones', blurb: "A Gullah family's last day on their island in 1902, told like memory." },
      { title: 'Salaam Bombay!', year: 1988, director: 'Nair', cast: 'Shafiq Syed, Hansa Vithal, Chanda Sharma', blurb: "A street kid's Bombay, shot with real children of the streets." },
      { title: 'Wendy and Lucy', year: 2008, director: 'Reichardt', cast: 'Michelle Williams, Wally Dalton, Larry Fessenden', blurb: 'A woman, her dog, a broken-down car, and no margin for error.' },
      { title: 'Orlando', year: 1992, director: 'Potter', cast: 'Tilda Swinton, Billy Zane, Lothaire Bluteau', blurb: 'Tilda Swinton lives four centuries and changes sex halfway; Woolf, playful.' },
      { title: 'Seven Beauties', year: 1975, director: 'Wertmüller', cast: 'Giancarlo Giannini, Fernando Rey, Shirley Stoler', blurb: 'A Neapolitan dandy survives a concentration camp by any means; comedy that curdles.' },
      { title: "Boys Don't Cry", year: 1999, director: 'Peirce', cast: 'Hilary Swank, Chloë Sevigny, Peter Sarsgaard', blurb: "Brandon Teena's real life and murder in small-town Nebraska." },
      { title: 'La Ciénaga', year: 2001, director: 'Martel', cast: 'Mercedes Morán, Graciela Borges, Martín Adjemián', blurb: 'An Argentine family rots beside a swampy pool; dread in the humidity.' },
      { title: 'Selma', year: 2014, director: 'DuVernay', cast: 'David Oyelowo, Carmen Ejogo, Tom Wilkinson', blurb: 'King and the 1965 voting-rights marches, politics played scene by scene.' },
    ],
    appNote:
      'Add the films you have not seen to your watchlist in I Like Movies and mark the ones you have; the app keeps your place as you work through the collection. A new themed collection lands in the Discover tab every Friday.',
    faqs: [
      {
        q: 'What is Jeanne Dielman and why is it famous?',
        a: [
          "Chantal Akerman's 1975 film watches three days of a widow's domestic routine in near real time, until the routine fractures. In 2022 it topped Sight and Sound's once-a-decade critics' poll of the greatest films ever made.",
        ],
      },
      {
        q: 'Where should I start with this list?',
        a: [
          'The Piano for sweep, Lost in Translation or Lady Bird for ease, Beau Travail for the ending alone, and We Need to Talk About Kevin when you are ready to be wrecked.',
        ],
      },
    ],
  },
  {
    slug: 'true-crime-from-the-80s',
    title: "True crime through '80s film grammar: 21 films from Manhunter to Pixote",
    metaDescription:
      '21 true-crime films told through 1980s film grammar, from Manhunter and Henry: Portrait of a Serial Killer to Mississippi Burning, Christiane F. and Pixote.',
    h1: "True crime, eighties style: 21 films",
    weekOf: '2026-08-14',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/ctVBNBxOtFGIjyVFzUQZoM8vUQR.jpg',
    intro: [
      "Before streaming turned true crime into wallpaper, the eighties turned real cases into cinema: Michael Mann's FBI profiler lit in neon, Lumet's police corruption epics, a Berlin station kid shooting up in Christiane F., Brazil's street children in Pixote, cast from the streets and returned to them.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of August 14, 2026, featuring Manhunter, the first Hannibal Lecktor film and the stylistic blueprint for two decades of serial-killer cinema.',
    ],
    items: [
      { title: 'Manhunter', year: 1986, director: 'Mann', cast: 'William L. Petersen, Tom Noonan, Dennis Farina', blurb: 'An FBI profiler thinks like killers to catch one; neon-cool dread.' },
      { title: 'Henry: Portrait of a Serial Killer', year: 1986, director: 'McNaughton', cast: 'Michael Rooker, Tracy Arnold, Tom Towles', blurb: "A serial killer's flat daily routine; the least sensational, most disturbing take." },
      { title: 'At Close Range', year: 1986, director: 'Foley', cast: 'Sean Penn, Christopher Walken, Mary Stuart Masterson', blurb: 'A rural father recruits his sons into his crime ring; from the Johnston gang case.' },
      { title: "River's Edge", year: 1986, director: 'Hunter', cast: 'Crispin Glover, Keanu Reeves, Ione Skye', blurb: 'Teenagers know where the body is and do nothing.' },
      { title: 'Sid and Nancy', year: 1986, director: 'Cox', cast: 'Gary Oldman, Chloe Webb, David Hayman', blurb: "The Sex Pistols' bassist and the romance that ended in the Chelsea Hotel." },
      { title: 'Mississippi Burning', year: 1988, director: 'Parker', cast: 'Gene Hackman, Willem Dafoe, Frances McDormand', blurb: 'Two FBI men work the 1964 murders of civil-rights workers.' },
      { title: 'The Accused', year: 1988, director: 'Kaplan', cast: 'Jodie Foster, Kelly McGillis, Bernie Coulson', blurb: "A waitress fights to prosecute her own rape; Foster's first Oscar." },
      { title: 'To Live and Die in L.A.', year: 1985, director: 'Friedkin', cast: 'William L. Petersen, Willem Dafoe, John Pankow', blurb: 'A Secret Service agent breaks every rule chasing a counterfeiter; that car chase.' },
      { title: 'Prince of the City', year: 1981, director: 'Lumet', cast: 'Treat Williams, Jerry Orbach, Richard Foronjy', blurb: 'A narcotics cop informs on his own; three hours of moral quicksand.' },
      { title: 'The Falcon and the Snowman', year: 1985, director: 'Schlesinger', cast: 'Timothy Hutton, Sean Penn, Pat Hingle', blurb: 'Two suburban kids sell secrets to the Soviets.' },
      { title: 'Salvador', year: 1986, director: 'Stone', cast: 'James Woods, Jim Belushi, Michael Murphy', blurb: "A burnout journalist stumbles into El Salvador's civil war." },
      { title: 'Cry Freedom', year: 1987, director: 'Attenborough', cast: 'Kevin Kline, Denzel Washington, Penelope Wilton', blurb: "Steve Biko's death and the editor who fled apartheid to tell it." },
      { title: 'Christiane F.', year: 1981, director: 'Edel', cast: 'Natja Brunckhorst, Thomas Haustein, Jens Kuphal', blurb: "A thirteen-year-old's heroin slide at a Berlin train station; Bowie on the soundtrack." },
      { title: 'The Killing Fields', year: 1984, director: 'Joffé', cast: 'Sam Waterston, Haing S. Ngor, John Malkovich', blurb: 'A journalist and his translator under the Khmer Rouge.' },
      { title: 'Star 80', year: 1983, director: 'Fosse', cast: 'Mariel Hemingway, Eric Roberts, Cliff Robertson', blurb: "Playmate Dorothy Stratten and the husband who killed her; Fosse's coldest film." },
      { title: 'Dance with a Stranger', year: 1985, director: 'Newell', cast: 'Miranda Richardson, Rupert Everett, Ian Holm', blurb: 'Ruth Ellis, the last woman hanged in Britain.' },
      { title: 'Marianne and Juliane', year: 1981, director: 'von Trotta', cast: 'Jutta Lampe, Barbara Sukowa, Ina Robinski', blurb: "Two sisters, one a terrorist; Germany's armed decade from inside a family." },
      { title: 'Pixote', year: 1981, director: 'Babenco', cast: 'Fernando Ramos da Silva, Jorge Julião, Gilberto Moura', blurb: 'Brazilian street children in and out of a brutal reformatory; cast from the streets.' },
      { title: 'A Cry in the Dark', year: 1988, director: 'Schepisi', cast: 'Meryl Streep, Sam Neill, Bruce Myles', blurb: 'A dingo took her baby; the trial by media that followed.' },
      { title: 'Buster', year: 1988, director: 'Green', cast: 'Phil Collins, Julie Walters, Larry Lamb', blurb: 'The Great Train Robbery played as cockney romance.' },
      { title: 'Prick Up Your Ears', year: 1987, director: 'Frears', cast: 'Gary Oldman, Alfred Molina, Vanessa Redgrave', blurb: "Playwright Joe Orton's rise and murder by his lover." },
    ],
    appNote:
      'Track which of these you have seen in I Like Movies and keep the rest on your watchlist; the app remembers your place in the collection. Every Friday a new themed collection arrives in the Discover tab.',
    faqs: [
      {
        q: 'Is Manhunter better than The Silence of the Lambs?',
        a: [
          "A real minority holds that view. Manhunter is colder and more formally daring; Silence is the more complete thriller. Watching Mann's version first makes Demme's choices visible.",
        ],
      },
      {
        q: 'Are all these films based on real cases?',
        a: [
          "Most are direct tellings, like Mississippi Burning, The Killing Fields, Star 80 and A Cry in the Dark. A few filter real phenomena through fiction: River's Edge grew out of a real 1981 murder, and Henry draws loosely on Henry Lee Lucas's confessions.",
        ],
      },
    ],
  },
  {
    slug: 'japanese-masters',
    title: 'Japanese cinema: 21 films from the masters, Seven Samurai to Drive My Car',
    metaDescription:
      '21 essential Japanese films, from Seven Samurai and Tokyo Story to Harakiri, Perfect Blue and Drive My Car, curated as a weekly collection.',
    h1: 'Japanese cinema: 21 films from the masters',
    weekOf: '2026-08-07',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/qvZ91FwMq6O47VViAr8vZNQz3WI.jpg',
    intro: [
      "Half of world cinema's grammar was written in Japan: Kurosawa's weather and motion, Ozu's still rooms and family seasons, Mizoguchi's ghosts gliding through long takes. Then come the inheritors, Kore-eda's makeshift families, Hamaguchi's conversations, and the anime masters Kon and Otomo.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of August 7, 2026, featuring Seven Samurai. It pairs each master's peaks where the two-per-director cap allows and makes room for the disreputable geniuses: Suzuki's hitman pop art, Kitano's deadpan gangsters, Imamura's pigs.",
    ],
    items: [
      { title: 'Seven Samurai', year: 1954, director: 'Kurosawa', cast: 'Toshirō Mifune, Takashi Shimura, Yoshio Inaba', blurb: 'Seven hired swords defend a village; the template for every team-up since.' },
      { title: 'Rashomon', year: 1950, director: 'Kurosawa', cast: 'Toshirō Mifune, Machiko Kyō, Takashi Shimura', blurb: 'One crime, four tellings, no truth; the film that named the effect.' },
      { title: 'Tokyo Story', year: 1953, director: 'Ozu', cast: 'Chishū Ryū, Chieko Higashiyama, Setsuko Hara', blurb: 'Aging parents visit children too busy for them; quietly devastating.' },
      { title: 'Late Spring', year: 1949, director: 'Ozu', cast: 'Chishū Ryū, Setsuko Hara, Yumeji Tsukioka', blurb: 'A daughter should marry; a father lets her go. Ozu distilled.' },
      { title: 'Ugetsu', year: 1953, director: 'Mizoguchi', cast: 'Machiko Kyō, Mitsuko Mito, Kinuyo Tanaka', blurb: 'Potters chase profit through civil war into a ghost story.' },
      { title: 'Sansho the Bailiff', year: 1954, director: 'Mizoguchi', cast: 'Kinuyo Tanaka, Yoshiaki Hanayagi, Kyōko Kagawa', blurb: 'A family sold into slavery; sorrow shaped into legend.' },
      { title: 'Harakiri', year: 1962, director: 'Kobayashi', cast: 'Tatsuya Nakadai, Akira Ishihama, Shima Iwashita', blurb: "A ronin's revenge dismantles the samurai code piece by piece." },
      { title: 'Woman in the Dunes', year: 1964, director: 'Teshigahara', cast: 'Eiji Okada, Kyôko Kishida, Kōji Mitsui', blurb: 'A man trapped in a sandpit with a widow; erotic and existential.' },
      { title: 'Floating Clouds', year: 1955, director: 'Naruse', cast: 'Hideko Takamine, Masayuki Mori, Mariko Okada', blurb: "A doomed affair drags through postwar ruin; Naruse's bleak peak." },
      { title: 'The Burmese Harp', year: 1956, director: 'Ichikawa', cast: 'Rentaro Mikuni, Shōji Yasui, Jun Hamamura', blurb: "A soldier stays behind to bury the war's dead." },
      { title: 'In the Realm of the Senses', year: 1976, director: 'Oshima', cast: 'Eiko Matsuda, Tatsuya Fuji, Aoi Nakajima', blurb: 'An obsessive affair past the point of no return; still shocking.' },
      { title: 'Spirited Away', year: 2001, director: 'Miyazaki', cast: 'Rumi Hiiragi, Miyu Irino, Mari Natsuki', blurb: 'A girl works in a bathhouse for gods to free her parents.' },
      { title: 'Shoplifters', year: 2018, director: 'Kore-eda', cast: 'Lily Franky, Sakura Ando, Mayu Matsuoka', blurb: 'A makeshift family survives on petty theft and tenderness.' },
      { title: 'Drive My Car', year: 2021, director: 'Hamaguchi', cast: 'Hidetoshi Nishijima, Toko Miura, Masaki Okada', blurb: 'A widowed actor, his young driver, and three hours that earn it.' },
      { title: 'Onibaba', year: 1964, director: 'Shindô', cast: 'Nobuko Otowa, Jitsuko Yoshimura, Kei Satō', blurb: 'Two women kill samurai in the reeds; a demon mask waits.' },
      { title: 'Branded to Kill', year: 1967, director: 'Suzuki', cast: 'Joe Shishido, Kōji Nanbara, Isao Tamagawa', blurb: 'A hitman ranked No. 3 unravels; the yakuza film as pop art.' },
      { title: 'Sonatine', year: 1993, director: 'Kitano', cast: 'Takeshi Kitano, Aya Kokumai, Tetsu Watanabe', blurb: 'Gangsters wait on an Okinawa beach; deadpan play, sudden violence.' },
      { title: 'Perfect Blue', year: 1997, director: 'Kon', cast: 'Junko Iwao, Rica Matsumoto, Shiho Niiyama', blurb: "A pop idol's identity dissolves; the anime thriller Aronofsky studied." },
      { title: 'Akira', year: 1988, director: 'Otomo', cast: 'Mitsuo Iwata, Nozomu Sasaki, Mami Koyama', blurb: 'Neo-Tokyo, biker gangs, a psychic child; the anime that broke through worldwide.' },
      { title: 'Pigs and Battleships', year: 1961, director: 'Imamura', cast: 'Hiroyuki Nagato, Jitsuko Yoshimura, Masao Mishima', blurb: "Small-time hoods around the American bases; Imamura's scavenging Japan." },
      { title: 'Tampopo', year: 1985, director: 'Itami', cast: 'Tsutomu Yamazaki, Nobuko Miyamoto, Ken Watanabe', blurb: 'A ramen western: one perfect noodle shop, many food digressions.' },
    ],
    appNote:
      'Working through a canon takes months, and that is what I Like Movies is for: keep the collection on your watchlist, mark films as you watch them, and rate them so your recommendations learn your taste. New themed collections arrive in the Discover tab every Friday.',
    faqs: [
      {
        q: 'Should I start with Kurosawa or Ozu?',
        a: [
          'Kurosawa if you want momentum: Seven Samurai and Rashomon carry you. Ozu if you want to be quietly rearranged: Tokyo Story and Late Spring. There is no wrong door; they are opposite masters of the same golden decade.',
        ],
      },
      {
        q: 'Why is Harakiri rated so highly?',
        a: [
          "Kobayashi's 1962 film is regularly among the top-rated samurai films on TMDB and Letterboxd alike: a formal revenge tragedy that dismantles the samurai code scene by scene until the genre's myth collapses with it.",
        ],
      },
    ],
  },
  {
    slug: 'documentary-greats',
    title: 'The greatest documentaries: 21 essential films from Hoop Dreams to Shoah',
    metaDescription:
      'The 21 essential documentaries, from Hoop Dreams and Shoah to The Act of Killing, Grey Gardens, Man with a Movie Camera and Stop Making Sense.',
    h1: 'The greatest documentaries: 21 essential films',
    weekOf: '2026-07-31',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/pYeiEm55NySzK9ksKlQGlFQNapz.jpg',
    intro: [
      'Non-fiction cinema has its own canon: Wiseman walking his camera into American institutions, Chris Marker writing essays in images, the Maysles brothers finding Beckett in a Long Island mansion, Joshua Oppenheimer asking killers to re-stage their crimes for the camera.',
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 31, 2026, featuring Hoop Dreams, five years in the lives of two Chicago basketball hopefuls and still the bar for longitudinal documentary. Vertov's Man with a Movie Camera, from 1929, is the oldest film in any of these weekly collections.",
    ],
    items: [
      { title: 'Hoop Dreams', year: 1994, director: 'James', cast: 'William Gates, Arthur Agee, Gene Pingatore', blurb: 'Five years with two Chicago kids chasing basketball out of poverty.' },
      { title: 'The Act of Killing', year: 2012, director: 'Oppenheimer', cast: 'Anwar Congo, Herman Koto, Syamsul Arifin', blurb: 'Indonesian death-squad leaders re-enact their murders as movie scenes.' },
      { title: 'The Look of Silence', year: 2014, director: 'Oppenheimer', cast: 'Adi Rukun, M.Y. Basrun, Amir Hasan', blurb: "An optometrist quietly confronts his brother's killers." },
      { title: 'Sans Soleil', year: 1983, director: 'Marker', cast: 'Florence Delay, Amílcar Cabral, Arielle Dombasle', blurb: 'A globe-hopping essay on memory; unlike anything else on this list.' },
      { title: 'Grey Gardens', year: 1975, director: 'Maysles', cast: 'Edith Bouvier Beale, Edith Ewing Bouvier Beale, Brooks Hyers', blurb: 'A mother and daughter, ex-high-society, in a collapsing mansion.' },
      { title: 'Salesman', year: 1968, director: 'Maysles', cast: 'Paul Brennan, Charles McDevitt, James Baker', blurb: 'Four door-to-door Bible salesmen grind through America.' },
      { title: 'Titicut Follies', year: 1967, director: 'Wiseman', blurb: 'Inside a hospital for the criminally insane; suppressed for decades.' },
      { title: 'High School', year: 1968, director: 'Wiseman', blurb: 'An ordinary American high school, observed without narration.' },
      { title: 'Shoah', year: 1985, director: 'Lanzmann', cast: 'Claude Lanzmann, Simon Srebnik, Michael Podchlebnik', blurb: 'Nine hours of Holocaust testimony, no archive footage; a monument.' },
      { title: 'The Sorrow and the Pity', year: 1969, director: 'Ophüls', blurb: 'Occupied France remembers collaboration; the myth-breaker.' },
      { title: 'The Thin Blue Line', year: 1988, director: 'Morris', cast: 'Randall Adams, David Harris, Gus Rose', blurb: 'The documentary that overturned a murder conviction.' },
      { title: 'F for Fake', year: 1973, director: 'Welles', cast: 'Orson Welles, Oja Kodar, Elmyr de Hory', blurb: 'Welles on forgery and fakery, itself a magic trick.' },
      { title: 'Stop Making Sense', year: 1984, director: 'Demme', cast: 'David Byrne, Chris Frantz, Jerry Harrison', blurb: 'Talking Heads build a show, and the big suit, song by song.' },
      { title: 'Man with a Movie Camera', year: 1929, director: 'Vertov', cast: 'Mikhail Kaufman', blurb: 'A city symphony of pure film technique, from 1929.' },
      { title: "Hearts of Darkness: A Filmmaker's Apocalypse", year: 1991, director: 'Bahr & Hickenlooper', cast: 'Francis Ford Coppola, Eleanor Coppola, John Milius', blurb: 'Apocalypse Now nearly destroys everyone making it.' },
      { title: 'Crumb', year: 1994, director: 'Zwigoff', cast: 'Robert Crumb, Aline Kominsky, Charles Crumb', blurb: 'Cartoonist Robert Crumb and his unbearable, illuminating family.' },
      { title: 'Faces Places', year: 2017, director: 'Varda & JR', cast: 'Agnès Varda, JR, Patricia Mercier', blurb: 'Varda and JR paste giant portraits across rural France.' },
      { title: 'Searching for Sugar Man', year: 2012, director: 'Bendjelloul', cast: 'Stephen Segerman, Rodriguez, Regan Rodriguez', blurb: 'A forgotten Detroit songwriter, unknowingly famous in South Africa.' },
      { title: "Don't Look Back", year: 1967, director: 'Pennebaker', cast: 'Bob Dylan, Albert Grossman, Bob Neuwirth', blurb: "Dylan's 1965 England tour, prickly and myth-making." },
      { title: 'Capturing the Friedmans', year: 2003, director: 'Jarecki', cast: 'Arnold Friedman, Elaine Friedman, David Friedman', blurb: 'A family films its own disintegration under abuse charges.' },
      { title: 'Hearts and Minds', year: 1974, director: 'Davis', cast: 'Clark Clifford, John Foster Dulles, Georges Bidault', blurb: 'Vietnam, argued in the words of the people who ran it.' },
    ],
    appNote:
      'I Like Movies tracks documentaries the same as everything else: watchlist the ones you have not seen, rate the ones you have, and the app keeps the collection sorted by what is left. A new themed collection lands in the Discover tab every Friday.',
    faqs: [
      {
        q: 'What is the greatest documentary ever made?',
        a: [
          "Sight and Sound's documentary poll crowned Man with a Movie Camera; the popular vote tends toward Hoop Dreams; Shoah stands apart as a nine-hour monument of testimony. All three are in this collection.",
        ],
      },
      {
        q: 'Is Stop Making Sense really a documentary?',
        a: [
          'It is a concert film, which is non-fiction cinema at its most joyful, and it is widely rated the best ever staged: Demme shoots Talking Heads as theater, building the band on stage member by member.',
        ],
      },
    ],
  },
  {
    slug: 'heat-and-madness',
    title: 'Heat on film: 21 movies where the temperature breaks people',
    metaDescription:
      '21 films where heat drives people over the edge, from Do the Right Thing and Dog Day Afternoon to Burning, La piscine and Wake in Fright.',
    h1: 'Heat on film: 21 movies where the temperature breaks people',
    weekOf: '2026-07-24',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/oYOZay9hyW3uI5paKWLIYkWZlzv.jpg',
    intro: [
      'Cinema has a subgenre nobody names: the heatwave film, where the temperature climbs until people crack. Spike Lee turned the hottest day in Bed-Stuy into American cinema\'s great pressure cooker; Australia contributed an outback nightmare; the French contributed a swimming pool.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 24, 2026, at peak summer, featuring Do the Right Thing. Noir (Body Heat, Chinatown), war (Apocalypse Now) and slow-burn Korean menace (Burning) all sweat together here.',
    ],
    items: [
      { title: 'Do the Right Thing', year: 1989, director: 'Spike Lee', cast: 'Danny Aiello, Ossie Davis, Ruby Dee', blurb: 'The hottest day in Bed-Stuy boils toward a riot.' },
      { title: 'Apocalypse Now', year: 1979, director: 'Coppola', cast: 'Martin Sheen, Marlon Brando, Frederic Forrest', blurb: "A river journey into Vietnam's heart of darkness." },
      { title: 'Dog Day Afternoon', year: 1975, director: 'Lumet', cast: 'Al Pacino, John Cazale, Charles Durning', blurb: 'A Brooklyn bank robbery cooks into a hostage circus.' },
      { title: 'Chinatown', year: 1974, director: 'Polanski', cast: 'Jack Nicholson, Faye Dunaway, John Huston', blurb: 'A private eye, a water scandal, and dry Los Angeles rot.' },
      { title: 'Body Heat', year: 1981, director: 'Kasdan', cast: 'William Hurt, Kathleen Turner, Richard Crenna', blurb: 'A sweaty Florida lawyer, a married woman, a plan.' },
      { title: 'Lawrence of Arabia', year: 1962, director: 'Lean', cast: "Peter O'Toole, Alec Guinness, Omar Sharif", blurb: 'The desert war epic; the sun as antagonist.' },
      { title: 'The Wages of Fear', year: 1953, director: 'Clouzot', cast: 'Yves Montand, Charles Vanel, Peter van Eyck', blurb: 'Trucks of nitroglycerin over mountain roads; unbearable suspense.' },
      { title: 'In the Heat of the Night', year: 1967, director: 'Jewison', cast: 'Sidney Poitier, Rod Steiger, Warren Oates', blurb: 'A Black Philadelphia detective in a Mississippi murder town.' },
      { title: 'La piscine', year: 1969, director: 'Deray', cast: 'Alain Delon, Romy Schneider, Maurice Ronet', blurb: 'Old lovers by a Riviera pool; envy warming toward murder.' },
      { title: 'Y tu mamá también', year: 2001, director: 'Cuarón', cast: 'Maribel Verdú, Gael García Bernal, Diego Luna', blurb: 'Two teenagers, an older woman, a road trip to a beach.' },
      { title: 'Burning', year: 2018, director: 'Lee Chang-dong', cast: 'Yoo Ah-in, Steven Yeun, Jeon Jong-seo', blurb: 'A vanished woman, a rich rival, a rumor about greenhouses.' },
      { title: 'A Bigger Splash', year: 2015, director: 'Guadagnino', cast: 'Tilda Swinton, Matthias Schoenaerts, Ralph Fiennes', blurb: "A rock star's island retreat invaded by an old flame." },
      { title: 'The Talented Mr. Ripley', year: 1999, director: 'Minghella', cast: 'Matt Damon, Gwyneth Paltrow, Jude Law', blurb: 'A nobody borrows a golden life and kills to keep it.' },
      { title: 'Spring Breakers', year: 2012, director: 'Korine', cast: 'James Franco, Selena Gomez, Vanessa Hudgens', blurb: 'Neon spring break curdles into crime; a fever dream.' },
      { title: 'Wake in Fright', year: 1971, director: 'Kotcheff', cast: 'Donald Pleasence, Gary Bond, Chips Rafferty', blurb: 'A teacher stranded in outback hospitality; horror without monsters.' },
      { title: 'The Swimmer', year: 1968, director: 'Perry', cast: 'Burt Lancaster, Janet Landgard, Janice Rule', blurb: 'A man swims home pool by pool as his life unravels.' },
      { title: 'Sexy Beast', year: 2000, director: 'Glazer', cast: 'Ray Winstone, Ben Kingsley, Ian McShane', blurb: "A retired thug's Spanish idyll broken by Ben Kingsley's Don Logan." },
      { title: 'Stranger by the Lake', year: 2013, director: 'Guiraudie', cast: "Pierre Deladonchamps, Christophe Paou, Patrick d'Assumçao", blurb: 'A cruising spot, a drowning, and a lover who did it.' },
      { title: "L'Avventura", year: 1960, director: 'Antonioni', cast: 'Monica Vitti, Gabriele Ferzetti, Lea Massari', blurb: 'A woman vanishes on an island; the search forgets her.' },
      { title: 'Stromboli', year: 1950, director: 'Rossellini', cast: 'Ingrid Bergman, Mario Vitale, Renzo Cesana', blurb: 'A refugee bride on a volcano island; Rossellini and Ingrid Bergman.' },
      { title: 'Killer of Sheep', year: 1978, director: 'Burnett', cast: 'Henry G. Sanders, Kaycee Moore, Charles Bracy', blurb: "Watts in the seventies, a slaughterhouse worker's tender everyday." },
    ],
    appNote:
      'Save the ones that fit your mood to your watchlist in I Like Movies; when the next heatwave hits, the list is waiting. A new themed collection arrives in the Discover tab every Friday.',
    faqs: [
      {
        q: 'Why is Do the Right Thing the featured film?',
        a: [
          'No film has ever tied weather to story tighter: one block, one day, the hottest of the year, and the heat is the fuse for everything that happens. It stays uncomfortably current decades later.',
        ],
      },
      {
        q: 'What is the scariest film on this list?',
        a: [
          'Wake in Fright (1971). Nothing supernatural: a schoolteacher stranded in an outback mining town, where beer, gambling and male hospitality curdle into horror. Scorsese championed its restoration.',
        ],
      },
    ],
  },
  {
    slug: 'the-wild-frame',
    title: 'Nature as protagonist: 21 films about the wild frame',
    metaDescription:
      '21 films where the natural world is the main character, from The Tree of Life and Fitzcarraldo to Princess Mononoke, Dersu Uzala and Honeyland.',
    h1: 'Nature as protagonist: 21 films about the wild',
    weekOf: '2026-07-17',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/xq1HIwZq9VbuvMQELAua1nqEkH.jpg',
    intro: [
      "Some directors film landscapes as backdrops; these film them as protagonists. Malick's prairies at magic hour, Herzog dragging a real steamship over a hill because the jungle demanded it, Reichardt's Oregon rivers, the Macedonian mountains where one woman keeps wild bees.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 17, 2026, featuring The Tree of Life. Documentary and fiction mix freely: Honeyland and Free Solo sit beside the forest gods of Princess Mononoke and Kurosawa\'s Siberian taiga.',
    ],
    items: [
      { title: 'The Tree of Life', year: 2011, director: 'Malick', cast: 'Brad Pitt, Jessica Chastain, Hunter McCracken', blurb: 'A Texas childhood set against the birth of the universe.' },
      { title: 'Days of Heaven', year: 1978, director: 'Malick', cast: 'Richard Gere, Brooke Adams, Sam Shepard', blurb: 'Migrant workers, a dying farmer, wheat fields at magic hour.' },
      { title: 'First Cow', year: 2019, director: 'Reichardt', cast: 'John Magaro, Orion Lee, Toby Jones', blurb: 'Two friends steal milk on the frontier; gentleness as suspense.' },
      { title: 'Embrace of the Serpent', year: 2015, director: 'Guerra', cast: 'Nilbio Torres, Antonio Bolívar, Jan Bijvoet', blurb: 'An Amazonian shaman guides two explorers, decades apart.' },
      { title: 'Aguirre, the Wrath of God', year: 1972, director: 'Herzog', cast: 'Klaus Kinski, Helena Rojo, Del Negro', blurb: "Conquistadors raft into jungle madness; Kinski's stare." },
      { title: 'Fitzcarraldo', year: 1982, director: 'Herzog', cast: 'Klaus Kinski, Claudia Cardinale, José Lewgoy', blurb: 'An opera obsessive hauls a real steamship over a hill.' },
      { title: 'Walkabout', year: 1971, director: 'Roeg', cast: 'Jenny Agutter, Luc Roeg, David Gulpilil', blurb: 'Two city children cross the outback with an Aboriginal guide.' },
      { title: 'Picnic at Hanging Rock', year: 1975, director: 'Weir', cast: 'Rachel Roberts, Vivean Gray, Helen Morse', blurb: 'Schoolgirls vanish at a rock; an unsolved dream.' },
      { title: 'The Revenant', year: 2015, director: 'Iñárritu', cast: 'Leonardo DiCaprio, Tom Hardy, Domhnall Gleeson', blurb: 'A mauled frontiersman crawls back for revenge; brutal and beautiful.' },
      { title: 'Into the Wild', year: 2007, director: 'Penn', cast: 'Emile Hirsch, Marcia Gay Harden, William Hurt', blurb: 'A graduate burns his money and walks into Alaska.' },
      { title: 'Dersu Uzala', year: 1975, director: 'Kurosawa', cast: 'Yuriy Solomin, Maksim Munzuk, Mikhail Bychkov', blurb: 'A Russian surveyor and a Goldi hunter; friendship in the taiga.' },
      { title: 'Princess Mononoke', year: 1997, director: 'Miyazaki', cast: 'Yoji Matsuda, Yuriko Ishida, Yuko Tanaka', blurb: 'A war between iron town and forest gods; nobody is the villain.' },
      { title: 'Spring, Summer, Fall, Winter… and Spring', year: 2003, director: 'Kim Ki-duk', cast: 'Oh Young-soo, Kim Ki-duk, Kim Young-min', blurb: 'A floating monastery through the seasons of one life.' },
      { title: 'Honeyland', year: 2019, director: 'Stefanov & Kotevska', cast: 'Hatidzhe Muratova, Nazife Muratova, Hussein Sam', blurb: 'The last wild beekeeper of Macedonia, and the neighbors who break the rule.' },
      { title: 'Close to Eden / Urga', year: 1991, director: 'Mikhalkov', cast: 'Badema, Bayaertu, Vladimir Gostyukhin', blurb: "A Mongolian herdsman's steppe life brushes against the modern city." },
      { title: 'Tulpan', year: 2008, director: 'Dvortsevoy', cast: 'Askhat Kuchencherekov, Samal Yeslyamova, Tulepbergen Baisakalov', blurb: 'A sailor returns to the Kazakh steppe wanting a yurt, a wife, sheep.' },
      { title: 'The Story of the Weeping Camel', year: 2003, director: 'Davaa & Falorni', cast: 'Janchiv Ayurzana, Chimed Ohin, Amgaabazar Gonson', blurb: 'A Gobi family plays music to make a camel accept her calf.' },
      { title: 'Microcosmos', year: 1996, director: 'Nuridsany & Pérennou', cast: 'Jacques Perrin', blurb: 'Insects at ground level, filmed like an epic.' },
      { title: 'Free Solo', year: 2018, director: 'Chin & Vasarhelyi', cast: 'Alex Honnold, Tommy Caldwell, Jimmy Chin', blurb: 'Alex Honnold climbs El Capitan with no rope. Palms sweat.' },
      { title: "Meek's Cutoff", year: 2010, director: 'Reichardt', cast: 'Michelle Williams, Bruce Greenwood, Will Patton', blurb: 'An Oregon Trail party, lost and thirsty, trust running out.' },
      { title: 'The Bear', year: 1988, director: 'Annaud', cast: 'Tchéky Karyo, Bart the Bear, Douce the Bear', blurb: 'An orphaned cub and a wounded male; almost wordless.' },
    ],
    appNote:
      'Keep the collection on your I Like Movies watchlist and work through it at your own pace; the app tracks what is left. Every Friday a new themed collection lands in the Discover tab.',
    faqs: [
      {
        q: 'What is the best film about nature?',
        a: [
          'It depends what you mean by about. As spectacle, The Revenant and Free Solo; as elegy, Honeyland and Dersu Uzala; as philosophy, The Tree of Life; as war between people and forest, Princess Mononoke.',
        ],
      },
      {
        q: 'Are the documentaries here nature documentaries?',
        a: [
          'Not in the TV sense. Honeyland, Microcosmos, The Story of the Weeping Camel and Free Solo are theatrical films about people, or insects, inside landscapes, with no narrator explaining migration patterns.',
        ],
      },
    ],
  },
  {
    slug: 'sixties-french-cinema',
    title: 'French New Wave and beyond: 21 films from sixties France',
    metaDescription:
      '21 essential films of 1960s French cinema, from Breathless and Cléo from 5 to 7 to Playtime, Belle de Jour and The Umbrellas of Cherbourg.',
    h1: 'French New Wave and beyond: 21 films from sixties France',
    weekOf: '2026-07-10',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/4WGuyWf1f94CsEeVIIqDKGw5rmO.jpg',
    intro: [
      "In 1960s Paris, Godard, Truffaut and Varda ripped the camera off the dolly and ran into the street, and world cinema never recovered. Around the New Wave proper stood giants who were never quite in it: Bresson's asceticism, Tati's choreographed modernity, Demy's candy-colored heartbreak.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 10, 2026, around Bastille Day, featuring Breathless. Two films each from Godard, Truffaut, Varda, Resnais, Demy, Bresson and Chabrol map the decade\'s range.',
    ],
    items: [
      { title: 'Breathless', year: 1960, director: 'Godard', cast: 'Jean-Paul Belmondo, Jean Seberg, Daniel Boulanger', blurb: 'A car thief, an American girl, jump cuts; the manifesto.' },
      { title: 'Pierrot le Fou', year: 1965, director: 'Godard', cast: 'Jean-Paul Belmondo, Anna Karina, Graziella Galvani', blurb: 'Lovers on the run in primary colors; Godard unchained.' },
      { title: 'Jules and Jim', year: 1962, director: 'Truffaut', cast: 'Jeanne Moreau, Oskar Werner, Henri Serre', blurb: 'Two friends love the same impossible woman across decades.' },
      { title: 'Shoot the Piano Player', year: 1960, director: 'Truffaut', cast: 'Charles Aznavour, Marie Dubois, Nicole Berger', blurb: 'A bar pianist with a past; noir played light.' },
      { title: 'Cléo from 5 to 7', year: 1962, director: 'Varda', cast: 'Corinne Marchand, Antoine Bourseiller, Dominique Davray', blurb: 'A singer awaits a diagnosis in near real time in Paris.' },
      { title: 'Le Bonheur', year: 1965, director: 'Varda', cast: 'Jean-Claude Drouot, Claire Drouot, Olivier Drouot', blurb: 'A happy husband adds a mistress; sunlit and merciless.' },
      { title: 'Last Year at Marienbad', year: 1961, director: 'Resnais', cast: 'Delphine Seyrig, Giorgio Albertazzi, Sacha Pitoëff', blurb: 'A hotel, a memory that may be invented; a beautiful puzzle.' },
      { title: 'Hiroshima mon amour', year: 1959, director: 'Resnais', cast: 'Emmanuelle Riva, Eiji Okada, Stella Dassas', blurb: 'A French actress, a Japanese architect, two catastrophes of memory.' },
      { title: 'The Umbrellas of Cherbourg', year: 1964, director: 'Demy', cast: 'Catherine Deneuve, Nino Castelnuovo, Anne Vernon', blurb: 'Every word sung; heartbreak in candy colors.' },
      { title: 'The Young Girls of Rochefort', year: 1967, director: 'Demy', cast: 'Catherine Deneuve, Françoise Dorléac, Jacques Perrin', blurb: 'Twin sisters, a port town, one weekend of musical near-misses.' },
      { title: 'Au Hasard Balthazar', year: 1966, director: 'Bresson', cast: 'Anne Wiazemsky, Walter Green, François Lafarge', blurb: "A donkey's life among human cruelty; saintly and shattering." },
      { title: 'Belle de Jour', year: 1967, director: 'Buñuel', cast: 'Catherine Deneuve, Jean Sorel, Michel Piccoli', blurb: "A bourgeois wife's secret afternoons; Buñuel's coolest scandal." },
      { title: "My Night at Maud's", year: 1969, director: 'Rohmer', cast: 'Jean-Louis Trintignant, Françoise Fabian, Marie-Christine Barrault', blurb: 'A snowed-in night of talk about faith, chance and desire.' },
      { title: 'Playtime', year: 1967, director: 'Tati', cast: 'Jacques Tati, Barbara Dennek, Rita Maiden', blurb: "Tati's glass-and-steel Paris; comedy staged across the whole frame." },
      { title: 'Mouchette', year: 1967, director: 'Bresson', cast: 'Nadine Nortier, Jean-Claude Guilbert, Marie Cardinal', blurb: "A rural girl's short, unpitied life; Bresson at his sternest." },
      { title: 'Z', year: 1969, director: 'Costa-Gavras', cast: 'Yves Montand, Irene Papas, Jean-Louis Trintignant', blurb: 'A political assassination and the investigation the state fears.' },
      { title: 'Les Bonnes Femmes', year: 1960, director: 'Chabrol', cast: 'Bernadette Lafont, Clotilde Joano, Stéphane Audran', blurb: "Four shopgirls' hopes against a predatory Paris." },
      { title: 'Les Biches', year: 1968, director: 'Chabrol', cast: 'Stéphane Audran, Jacqueline Sassard, Jean-Louis Trintignant', blurb: 'A wealthy woman, her protégée, and a slow triangle.' },
      { title: 'Le Feu Follet', year: 1963, director: 'Malle', cast: 'Maurice Ronet, Léna Skerla, Yvonne Clech', blurb: "A man's last two days in Paris; lucid and unbearable." },
      { title: 'The Suitor', year: 1962, director: 'Étaix', cast: 'France Arnel, Laurence Lignières, Claude Massot', blurb: 'A silent-style comedy of a man told to find a wife.' },
      { title: 'A Man and a Woman', year: 1966, director: 'Lelouch', cast: 'Anouk Aimée, Jean-Louis Trintignant, Pierre Barouh', blurb: 'A widow and a widower circle each other; that theme tune.' },
    ],
    appNote:
      'Twenty-one films is a season of evenings: keep them on your I Like Movies watchlist, tick them off as you go, and rate them so the app learns which side of the Wave you prefer. New themed collections arrive in the Discover tab every Friday.',
    faqs: [
      {
        q: 'What was the French New Wave?',
        a: [
          'A late-1950s movement of critics turned directors: jump cuts, location shooting, small crews, cinema about cinema. Breathless (1960) is its manifesto, and Cléo from 5 to 7 shows the Left Bank branch that history undersold.',
        ],
      },
      {
        q: 'Is Belle de Jour a New Wave film?',
        a: [
          'No. Buñuel was a Spanish surrealist working in France, and Bresson, Tati and Costa-Gavras stood apart from the movement too. The collection covers sixties French cinema broadly, with the Wave at its center.',
        ],
      },
    ],
  },
  {
    slug: 'time-travel',
    title: 'Time travel movies: 21 essential films from Back to the Future to Tenet',
    metaDescription:
      'The 21 essential time travel films, from Back to the Future, Primer and Groundhog Day to Your Name, Hi, Mom and Tenet, curated as a weekly collection.',
    h1: 'Time travel movies: 21 essential films',
    weekOf: '2026-07-03',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/5bzPWQ2dFUl2aZKkp7ILJVVkRed.jpg',
    intro: [
      "Time travel is the genre where cinema invents its own physics: paradoxes, butterfly effects, second chances. It fits every budget, with Zemeckis's DeLorean and Nolan's wormholes at one end and Shane Carruth's garage experiment, famously made for around seven thousand dollars, at the other.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 3, 2026, featuring Back to the Future. Anime carries two of the best entries (Your Name, The Girl Who Leapt Through Time), and Hi, Mom, a Chinese box-office phenomenon, is the deep cut most Western viewers miss.',
    ],
    items: [
      { title: 'Back to the Future', year: 1985, director: 'Zemeckis', cast: 'Michael J. Fox, Christopher Lloyd, Crispin Glover', blurb: "A teenager strands himself in 1955 and must engineer his own parents' romance." },
      { title: 'The Terminator', year: 1984, director: 'Cameron', cast: 'Arnold Schwarzenegger, Michael Biehn, Linda Hamilton', blurb: 'A machine sent back to kill the mother of the future.' },
      { title: 'Terminator 2: Judgment Day', year: 1991, director: 'Cameron', cast: 'Arnold Schwarzenegger, Linda Hamilton, Edward Furlong', blurb: 'The machine returns as protector; the sequel that outgrew the original.' },
      { title: '12 Monkeys', year: 1995, director: 'Gilliam', cast: 'Bruce Willis, Madeleine Stowe, Brad Pitt', blurb: 'A convict sent back to trace a plague; memory as a trap.' },
      { title: 'Primer', year: 2004, director: 'Carruth', cast: 'Shane Carruth, David Sullivan, Casey Gooden', blurb: 'Engineers build a box in a garage; the consequences outpace them.' },
      { title: 'Donnie Darko', year: 2001, director: 'Kelly', cast: 'Jake Gyllenhaal, Jena Malone, James Duval', blurb: 'A sleepwalking teenager, a rabbit named Frank, a countdown.' },
      { title: 'Looper', year: 2012, director: 'Johnson', cast: 'Joseph Gordon-Levitt, Bruce Willis, Emily Blunt', blurb: 'Hitmen kill targets sent from the future, until one meets himself.' },
      { title: 'Edge of Tomorrow', year: 2014, director: 'Liman', cast: 'Tom Cruise, Emily Blunt, Brendan Gleeson', blurb: 'Die, repeat, improve: an alien war on a loop.' },
      { title: 'Groundhog Day', year: 1993, director: 'Ramis', cast: 'Bill Murray, Andie MacDowell, Chris Elliott', blurb: 'One weatherman, one day, forever; the loop film all others cite.' },
      { title: 'Interstellar', year: 2014, director: 'Nolan', cast: 'Matthew McConaughey, Anne Hathaway, Michael Caine', blurb: "A dying Earth; a pilot trades years for his children's future." },
      { title: 'Source Code', year: 2011, director: 'Jones', cast: 'Jake Gyllenhaal, Michelle Monaghan, Vera Farmiga', blurb: 'Eight minutes on a doomed train, over and over.' },
      { title: 'About Time', year: 2013, director: 'Curtis', cast: 'Domhnall Gleeson, Rachel McAdams, Bill Nighy', blurb: 'A man who can rewind uses it mostly to love better.' },
      { title: 'Midnight in Paris', year: 2011, director: 'Allen', cast: 'Owen Wilson, Rachel McAdams, Kathy Bates', blurb: 'A nostalgic writer walks into the 1920s each midnight.' },
      { title: 'Time Bandits', year: 1981, director: 'Gilliam', cast: 'Craig Warnock, David Rappaport, Kenny Baker', blurb: 'A boy and six dwarves loot history through holes in time.' },
      { title: 'Your Name', year: 2016, director: 'Shinkai', cast: 'Ryunosuke Kamiki, Mone Kamishiraishi, Ryo Narita', blurb: 'Two strangers swap bodies across time; a comet approaches.' },
      { title: 'The Girl Who Leapt Through Time', year: 2006, director: 'Hosoda', cast: 'Riisa Naka, Takuya Ishida, Mitsutaka Itakura', blurb: 'A schoolgirl spends her leaps carelessly, then learns their price.' },
      { title: 'Timecrimes', year: 2007, director: 'Vigalondo', cast: 'Karra Elejalde, Candela Fernández, Bárbara Goenaga', blurb: 'One man, one hour back, three of himself; a tight Spanish loop.' },
      { title: 'Hi, Mom', year: 2021, director: 'Jia Ling', cast: 'Jia Ling, Zhang Xiaofei, Shen Teng', blurb: 'A grieving daughter lands in 1981 and befriends her young mother.' },
      { title: 'Predestination', year: 2014, director: 'Spierig', cast: 'Ethan Hawke, Sarah Snook, Noah Taylor', blurb: "A temporal agent's final assignment folds in on itself." },
      { title: 'Time After Time', year: 1979, director: 'Meyer', cast: 'Malcolm McDowell, David Warner, Mary Steenburgen', blurb: 'H.G. Wells chases Jack the Ripper into 1979 San Francisco.' },
      { title: 'Tenet', year: 2020, director: 'Nolan', cast: 'John David Washington, Robert Pattinson, Elizabeth Debicki', blurb: 'Objects and people run backwards through a cold-war plot; Nolan at maximum.' },
    ],
    appNote:
      'Watchlist the ones you have missed in I Like Movies and mark the rewatches; the app keeps the collection sorted by what is left. A new themed collection lands in the Discover tab every Friday.',
    faqs: [
      {
        q: 'What is the most scientifically rigorous time travel film?',
        a: [
          'Primer (2004) is the fan consensus: engineers stumble into time travel and the film refuses to simplify the consequences. People still draw diagrams of its timeline. Predestination is the tightest paradox plot.',
        ],
      },
      {
        q: 'Which time travel movie should I start with?',
        a: [
          'Back to the Future remains the perfect machine: clear rules, real stakes, and a script with no wasted scene. Groundhog Day if you prefer the loop to the machine.',
        ],
      },
    ],
  },
  {
    slug: 'autobiographies',
    title: 'Directors filming their own lives: 21 autobiographical films',
    metaDescription:
      '21 autobiographical films where directors filmed their own childhoods and wounds, from Roma and The 400 Blows to Amarcord, Persepolis and Aftersun.',
    h1: 'Directors filming their own lives: 21 autobiographical films',
    weekOf: '2026-06-26',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/zl9uqCl5iUSb50sTk2BPzw6bJnU.jpg',
    intro: [
      'When a director turns the camera on their own life, the result carries a rawness no biopic reaches: Cuarón rebuilding his childhood home tile by tile, Truffaut sending his delinquent double running to the sea, Fellini turning memory into a circus.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of June 26, 2026, featuring Roma. It stretches the form from straight memoir (Belfast, The Fabelmans) to essay (The Beaches of Agnès) to fiction one heartbeat away from confession (Aftersun, The Souvenir).',
    ],
    items: [
      { title: 'Roma', year: 2018, director: 'Cuarón', cast: 'Yalitza Aparicio, Marina de Tavira, Diego Cortina Autrey', blurb: 'A year with a Mexico City family and the woman who holds it together.' },
      { title: 'Amarcord', year: 1973, director: 'Fellini', cast: 'Pupella Maggio, Armando Brancia, Magali Noël', blurb: 'A Rimini boyhood under fascism, remembered as carnival.' },
      { title: '8½', year: 1963, director: 'Fellini', cast: 'Marcello Mastroianni, Claudia Cardinale, Anouk Aimée', blurb: 'A director who cannot start his film; the great artist-block movie.' },
      { title: 'The 400 Blows', year: 1959, director: 'Truffaut', cast: 'Jean-Pierre Léaud, Claire Maurier, Albert Rémy', blurb: "A neglected Paris kid slides toward reform school; Truffaut's own youth." },
      { title: 'Mirror', year: 1975, director: 'Tarkovsky', cast: 'Margarita Terekhova, Ignat Daniltsev, Larisa Tarkovskaya', blurb: "Memory, dream and newsreel braided; Tarkovsky's most personal film." },
      { title: 'Wild Strawberries', year: 1957, director: 'Bergman', cast: 'Victor Sjöström, Bibi Andersson, Ingrid Thulin', blurb: "An old professor's road trip through his regrets." },
      { title: 'All That Jazz', year: 1979, director: 'Fosse', cast: 'Roy Scheider, Jessica Lange, Ann Reinking', blurb: 'A director-choreographer stages his own death as a musical.' },
      { title: 'Cinema Paradiso', year: 1988, director: 'Tornatore', cast: 'Philippe Noiret, Jacques Perrin, Marco Leonardi', blurb: "A boy, a projectionist, and a town's cinema; pure movie love." },
      { title: 'Annie Hall', year: 1977, director: 'Allen', cast: 'Diane Keaton, Woody Allen, Tony Roberts', blurb: 'A comedian autopsies his best relationship.' },
      { title: 'Pain and Glory', year: 2019, director: 'Almodóvar', cast: 'Antonio Banderas, Asier Etxeandia, Leonardo Sbaraglia', blurb: 'An ailing director reconciles with his past; Banderas as Almodóvar.' },
      { title: 'The Hand of God', year: 2021, director: 'Sorrentino', cast: 'Filippo Scotti, Toni Servillo, Teresa Saponangelo', blurb: 'Naples, Maradona, and the accident that made Sorrentino a filmmaker.' },
      { title: 'Belfast', year: 2021, director: 'Branagh', cast: 'Jude Hill, Jamie Dornan, Caitríona Balfe', blurb: "A child's Troubles, in black and white and pop songs." },
      { title: 'The Fabelmans', year: 2022, director: 'Spielberg', cast: 'Michelle Williams, Paul Dano, Seth Rogen', blurb: "Spielberg's childhood: a camera, and a family secret it catches." },
      { title: 'Persepolis', year: 2007, director: 'Satrapi & Paronnaud', cast: 'Chiara Mastroianni, Danielle Darrieux, Catherine Deneuve', blurb: 'Growing up through the Iranian revolution, in ink.' },
      { title: 'Distant Voices, Still Lives', year: 1988, director: 'Davies', cast: 'Freda Dowie, Pete Postlethwaite, Angela Walsh', blurb: 'A Liverpool family album sung in pub songs and bruises.' },
      { title: 'A Time to Live and a Time to Die', year: 1985, director: 'Hou Hsiao-hsien', cast: 'Yu An-shun, Tien Feng, Mei Fang', blurb: "A Taiwanese childhood between a grandmother's lost homeland and new ground." },
      { title: 'The Spirit of the Beehive', year: 1973, director: 'Erice', cast: 'Ana Torrent, Fernando Fernán Gómez, Teresa Gimpera', blurb: "A girl in post-war Spain meets Frankenstein's ghost." },
      { title: 'The Beaches of Agnès', year: 2008, director: 'Varda', cast: 'Agnès Varda, André Lubrano, Blaise Fournier', blurb: 'Varda walks her own life backwards at eighty, with mirrors on a beach.' },
      { title: 'The Souvenir', year: 2019, director: 'Hogg', cast: 'Honor Swinton Byrne, Tom Burke, Tilda Swinton', blurb: "A film student's ruinous first love, told from inside it." },
      { title: 'Aftersun', year: 2022, director: 'Wells', cast: 'Paul Mescal, Frankie Corio, Brooklyn Toulson', blurb: 'A Turkish package holiday with a father slipping out of reach.' },
      { title: 'The Diving Bell and the Butterfly', year: 2007, director: 'Schnabel', cast: 'Mathieu Amalric, Emmanuelle Seigner, Marie-Josée Croze', blurb: 'A paralyzed editor writes a book with one blinking eye.' },
    ],
    appNote:
      'These are films people mean to get to for years; a watchlist fixes that. Keep the collection in I Like Movies, mark what you watch, and the app holds your place. New themed collections arrive in the Discover tab every Friday.',
    faqs: [
      {
        q: 'Is Roma really autobiographical?',
        a: [
          "Yes. Cuarón rebuilt his 1970s Mexico City street, cast a first-time actress as the family's nanny, based on the woman who raised him, and shot the film himself in black and white. It is memory reconstructed, not documented.",
        ],
      },
      {
        q: 'What separates these films from biopics?',
        a: [
          "A biopic is someone else's life researched; these are the filmmaker's own life remembered, with all the distortion and tenderness that brings. That is why 8½ and Mirror feel dreamed rather than told.",
        ],
      },
    ],
  },
  {
    slug: 'behind-the-iron-curtain',
    title: 'Behind the Iron Curtain: 21 films that defied the censors',
    metaDescription:
      '21 films from Cold War Eastern Europe, from Closely Watched Trains and Daisies to Come and See, Andrei Rublev and Sátántangó, curated as a weekly collection.',
    h1: 'Behind the Iron Curtain: 21 films that defied the censors',
    weekOf: '2026-06-19',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/pe2APM7NsJXfNRfq2cUWdc0dRbQ.jpg',
    intro: [
      "Under state censorship, Eastern Europe's young filmmakers smuggled absurdism, sexuality and open dissent into cinemas, and some paid for it in banned films and broken careers. The Czechoslovak New Wave laughs, the Polish school mourns, and the Soviets built cathedrals of the image.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of June 19, 2026, featuring Menzel's Closely Watched Trains. Romania (The Forest of the Hanged, Silent Wedding), Bulgaria (The Tied Up Balloon, Iconostasis) and Yugoslavia widen it past the usual suspects.",
    ],
    items: [
      { title: 'Closely Watched Trains', year: 1966, director: 'Menzel', cast: 'Václav Neckář, Jitka Scoffin, Vladimír Valenta', blurb: "A young station guard's first love becomes quiet resistance." },
      { title: 'Loves of a Blonde', year: 1965, director: 'Forman', cast: 'Hana Brejchová, Vladimír Pucholt, Vladimír Menšík', blurb: 'A factory-town romance that goes home to meet the parents.' },
      { title: 'Daisies', year: 1966, director: 'Chytilová', cast: 'Jitka Cerhová, Ivana Karbanová, Helena Anýžová', blurb: 'Two Maries wreck everything, gleefully; banned anarchy.' },
      { title: 'The Shop on Main Street', year: 1965, director: 'Kadár & Klos', cast: 'Ida Kamińska, Jozef Kroner, František Zvarík', blurb: "A carpenter is handed an old woman's shop; comedy tips into tragedy." },
      { title: 'Ashes and Diamonds', year: 1958, director: 'Wajda', cast: 'Zbigniew Cybulski, Ewa Krzyżewska, Wacław Zastrzeżynski', blurb: "A resistance assassin's last night as the war ends." },
      { title: 'Knife in the Water', year: 1962, director: 'Polanski', cast: 'Leon Niemczyk, Jolanta Umecka, Zygmunt Malanowicz', blurb: "A couple, a hitchhiker, a yacht; Polanski's three-hander debut." },
      { title: 'A Short Film About Killing', year: 1988, director: 'Kieślowski', cast: 'Mirosław Baka, Krzysztof Globisz, Jan Tesarz', blurb: 'A murder and an execution, filmed with equal horror.' },
      { title: 'The Round-Up', year: 1966, director: 'Jancsó', cast: 'Zoltán Latinovits, János Görbe, Tibor Molnár', blurb: 'Prisoners broken by geometry on the Hungarian plain.' },
      { title: 'Mephisto', year: 1981, director: 'Szabó', cast: 'Klaus Maria Brandauer, Krystyna Janda, Ildikó Bánsági', blurb: 'An actor sells himself to the Nazi state, role by role.' },
      { title: 'Sátántangó', year: 1994, director: 'Tarr', cast: 'Mihály Víg, Putyi Horváth, Székely B. Miklós', blurb: 'Seven hours of mud, rain and con men; the cult monolith.' },
      { title: 'Andrei Rublev', year: 1966, director: 'Tarkovsky', cast: 'Anatoliy Solonitsyn, Ivan Lapikov, Mykola Hrynko', blurb: "An icon painter through medieval Russia's cruelty; faith tested." },
      { title: 'Come and See', year: 1985, director: 'Klimov', cast: 'Aleksei Kravchenko, Olga Mironova, Liubomiras Laucevičius', blurb: "A Belarusian boy walks into the war's absolute horror." },
      { title: 'The Cranes Are Flying', year: 1957, director: 'Kalatozov', cast: 'Tatyana Samoylova, Aleksey Batalov, Vasili Merkuryev', blurb: 'A Moscow love severed by the war; the camera soars.' },
      { title: 'The Color of Pomegranates', year: 1969, director: 'Parajanov', cast: 'Spartak Bagashvili, Sofiko Chiaureli, Medea Japaridze', blurb: "A poet's life told in living icons; nothing else looks like it." },
      { title: 'The Forest of the Hanged', year: 1965, director: 'Ciulei', cast: 'Victor Rebengiuc, Anna Széles, Ștefan Ciubotărașu', blurb: 'A Romanian officer ordered to fight his own; a conscience drama of the First World War.' },
      { title: 'Silent Wedding', year: 2008, director: 'Mălăele', cast: 'Meda Andreea Victor, Alexandru Potocean, Valentin Teodosiu', blurb: 'A village wedding held in silence the night Stalin dies.' },
      { title: 'The Tied Up Balloon', year: 1967, director: 'Zhelyazkova', cast: 'Grigor Vachkov, Georgi Kaloyanchev, Georgi Partsalev', blurb: 'A stray balloon bewitches a Bulgarian village; a banned parable.' },
      { title: 'Iconostasis', year: 1969, director: 'Hristov', blurb: 'An icon carver torn between art and church.' },
      { title: 'Time of the Gypsies', year: 1988, director: 'Kusturica', cast: 'Davor Dujmović, Borivoje Todorović, Ljubica Adžović', blurb: "A Romani boy with telekinesis sold into crime; Kusturica's sprawl." },
      { title: 'W.R.: Mysteries of the Organism', year: 1971, director: 'Makavejev', cast: 'Milena Dravić, Ivica Vidović, Jagoda Kaloper', blurb: 'Reich, sexuality and socialism in one collage; banned at home.' },
      { title: "The Firemen's Ball", year: 1967, director: 'Forman', cast: 'Jan Vostrčil, Josef Šebánek, František Debelka', blurb: 'A small-town ball where everything fails; the satire that exiled Forman.' },
    ],
    appNote:
      'Half of these are hard to stumble onto and easy to lose track of, which is what a watchlist is for. Keep the collection in I Like Movies and mark films as you find them. A new themed collection lands in the Discover tab every Friday.',
    faqs: [
      {
        q: 'Where do I start with the Czechoslovak New Wave?',
        a: [
          "Closely Watched Trains (1966), an Academy Award winner and completely approachable: a station guard's coming of age that turns into resistance. Then Daisies for the anarchic end of the movement and The Firemen's Ball for the satire that helped get Forman exiled.",
        ],
      },
      {
        q: 'Which of these films were banned?',
        a: [
          "Several. Daisies was banned with food wastage among the official complaints, The Firemen's Ball was banned in Czechoslovakia after 1968, W.R.: Mysteries of the Organism was banned in Yugoslavia, and Andrei Rublev sat shelved for years in the USSR.",
        ],
      },
    ],
  },
  {
    slug: 'sports-on-film',
    title: 'Sports movies: 21 films beyond the final score',
    metaDescription:
      '21 great sports films timed to the World Cup, from Bend It Like Beckham and Offside to Raging Bull, Senna, I, Tonya and Lagaan.',
    h1: 'Sports movies: 21 films beyond the final score',
    weekOf: '2026-06-12',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/vUe5v3l6ul7coxMv2oLwINeVgFi.jpg',
    intro: [
      "Sport on film is never really about the game; it is drama with a scoreboard. This collection ran the week the 2026 World Cup kicked off, so football leads: Loach's Cantona fable, Panahi's women locked out of a Tehran stadium, Chow's Shaolin strikers, an Allied XI escaping through a Paris crowd.",
      "It ran as the weekly theme in the I Like Movies Discover tab for the week of June 12, 2026, featuring Bend It Like Beckham. Beyond the pitch: Scorsese's ring, Kapadia's cockpit, Tonya on the ice and Lagaan's cricket match against the Raj.",
    ],
    items: [
      { title: 'Bend It Like Beckham', year: 2002, director: 'Chadha', cast: 'Parminder Nagra, Keira Knightley, Jonathan Rhys Meyers', blurb: "A Sikh girl in London plays on against her parents' plans." },
      { title: 'Looking for Eric', year: 2009, director: 'Loach', cast: 'Steve Evets, Éric Cantona, Stephanie Bishop', blurb: 'A depressed postman coached by an imaginary Eric Cantona.' },
      { title: 'Offside', year: 2006, director: 'Panahi', cast: 'Sima Mobarak-Shahi, Shayesteh Irani, Ayda Sadeqi', blurb: 'Iranian women sneak into a World Cup qualifier; shot at the real match.' },
      { title: 'Escape to Victory', year: 1981, director: 'Huston', cast: 'Sylvester Stallone, Michael Caine, Max von Sydow', blurb: 'POWs versus Nazis, with Pelé; preposterous and beloved.' },
      { title: 'The Damned United', year: 2009, director: 'Hooper', cast: 'Michael Sheen, Timothy Spall, Colm Meaney', blurb: "Brian Clough's 44 catastrophic days at Leeds." },
      { title: 'Diego Maradona', year: 2019, director: 'Kapadia', cast: 'Diego Maradona, Pelé, Dalma Maradona', blurb: "Naples, genius and ruin, from Kapadia's archive method." },
      { title: 'The Miracle of Bern', year: 2003, director: 'Wortmann', cast: 'Louis Klamroth, Peter Lohmeyer, Johanna Gastdorf', blurb: "West Germany's 1954 World Cup and a POW's homecoming." },
      { title: 'Shaolin Soccer', year: 2001, director: 'Chow', cast: 'Stephen Chow, Richard Ng Man-Tat, Zhao Wei', blurb: 'Kung fu monks play football; cartoon physics, pure joy.' },
      { title: 'The Two Escobars', year: 2010, director: 'Zimbalist', cast: 'Andrés Escobar, Pablo Escobar, María Ester Escobar', blurb: 'Pablo, Andrés, and how the cartels owned Colombian football.' },
      { title: 'Raging Bull', year: 1980, director: 'Scorsese', cast: 'Robert De Niro, Cathy Moriarty, Joe Pesci', blurb: "Jake LaMotta's rage, in and out of the ring." },
      { title: 'Rocky', year: 1976, director: 'Avildsen', cast: 'Sylvester Stallone, Talia Shire, Burt Young', blurb: 'A club fighter gets one shot; the underdog original.' },
      { title: 'When We Were Kings', year: 1996, director: 'Gast', cast: 'Muhammad Ali, George Foreman, Don King', blurb: 'Ali and Foreman in Zaire; the Rumble, documented.' },
      { title: 'Senna', year: 2010, director: 'Kapadia', cast: 'Ayrton Senna, Alain Prost, Frank Williams', blurb: 'Grand-prix footage cut into Greek tragedy.' },
      { title: 'Rush', year: 2013, director: 'Howard', cast: 'Chris Hemsworth, Daniel Brühl, Olivia Wilde', blurb: 'Hunt versus Lauda, 1976; rivalry at 300 km/h.' },
      { title: 'The Wrestler', year: 2008, director: 'Aronofsky', cast: 'Mickey Rourke, Marisa Tomei, Evan Rachel Wood', blurb: 'A broken-down wrestler with nothing outside the ropes.' },
      { title: 'Moneyball', year: 2011, director: 'Miller', cast: 'Brad Pitt, Jonah Hill, Philip Seymour Hoffman', blurb: 'Baseball rebuilt from a spreadsheet.' },
      { title: 'Hoosiers', year: 1986, director: 'Anspaugh', cast: 'Gene Hackman, Barbara Hershey, Dennis Hopper', blurb: "A small Indiana school's improbable title run." },
      { title: 'I, Tonya', year: 2017, director: 'Gillespie', cast: 'Margot Robbie, Sebastian Stan, Allison Janney', blurb: "Tonya Harding's side, told through unreliable interviews." },
      { title: 'Borg vs. McEnroe', year: 2017, director: 'Metz', cast: 'Sverrir Gudnason, Shia LaBeouf, Stellan Skarsgård', blurb: 'Fire and ice at Wimbledon 1980.' },
      { title: 'Lagaan', year: 2001, director: 'Gowariker', cast: 'Aamir Khan, Gracy Singh, Rachel Shelley', blurb: 'Villagers stake their tax on a cricket match against the Raj; a musical epic.' },
      { title: 'Million Dollar Baby', year: 2004, director: 'Eastwood', cast: 'Clint Eastwood, Hilary Swank, Morgan Freeman', blurb: 'A waitress becomes a boxer; the last act breaks you.' },
    ],
    appNote:
      'Tournament summers are when these get rewatched: keep the collection on your I Like Movies watchlist and mark what you have seen between matches. New themed collections arrive in the Discover tab every Friday.',
    faqs: [
      {
        q: 'What is the best football movie?',
        a: [
          'Bend It Like Beckham for joy, The Damned United for the sport\'s inner politics, Offside for what a stadium means when you are banned from it, and Diego Maradona with The Two Escobars for the documentary heights.',
        ],
      },
      {
        q: 'Do I need to like sports to watch these?',
        a: [
          'No. Raging Bull, I, Tonya, The Wrestler and Senna are regularly loved by people who never watch a match; the sport is the stage, not the subject.',
        ],
      },
    ],
  },
  {
    slug: 'pride-queer-classics',
    title: 'Queer classics: 21 essential LGBTQ films from Orpheus to Moonlight',
    metaDescription:
      '21 essential LGBTQ films, from Cocteau\'s Orpheus and Paris Is Burning to Moonlight, Carol, Happy Together and Portrait of a Lady on Fire.',
    h1: 'Queer classics: 21 essential LGBTQ films',
    weekOf: '2026-06-05',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/tqLjEqOELHek2zfZ1d3vknG7Dfu.jpg',
    intro: [
      "Queer cinema spent half a century in code, Cocteau's poetry and Visconti's glances, then burst into the open and built a canon: Wong Kar-wai's Buenos Aires exiles, Sciamma's painters, Jenkins' Miami moonlight.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of June 5, 2026, opening Pride month, featuring Matthew Warchus's Pride, the true story of London activists funding striking Welsh miners. Documentary (Paris Is Burning), melodrama (Carol), comedy (The Birdcage) and Almodóvar all get seats.",
    ],
    items: [
      { title: 'Pride', year: 2014, director: 'Warchus', cast: 'George MacKay, Ben Schnetzer, Freddie Fox', blurb: 'London activists fund striking Welsh miners in 1984; joyous and true.' },
      { title: 'Orpheus', year: 1950, director: 'Cocteau', cast: 'Jean Marais, François Périer, María Casares', blurb: 'The myth in postwar Paris; death drives a Rolls.' },
      { title: 'Portrait of a Lady on Fire', year: 2019, director: 'Sciamma', cast: 'Noémie Merlant, Adèle Haenel, Luàna Bajrami', blurb: 'A painter and her subject on a Brittany island; the gaze returned.' },
      { title: 'Brokeback Mountain', year: 2005, director: 'Lee', cast: 'Heath Ledger, Jake Gyllenhaal, Michelle Williams', blurb: 'Two ranch hands across twenty hidden years.' },
      { title: 'Carol', year: 2015, director: 'Haynes', cast: 'Cate Blanchett, Rooney Mara, Kyle Chandler', blurb: 'A shopgirl and a married woman in 1952 New York; glances as plot.' },
      { title: 'Moonlight', year: 2016, director: 'Jenkins', cast: 'Trevante Rhodes, André Holland, Janelle Monáe', blurb: 'One Miami life in three acts, each under a different name.' },
      { title: 'Call Me by Your Name', year: 2017, director: 'Guadagnino', cast: 'Timothée Chalamet, Armie Hammer, Michael Stuhlbarg', blurb: "An Italian summer, a first love, a father's speech." },
      { title: 'My Own Private Idaho', year: 1991, director: 'Van Sant', cast: 'River Phoenix, Keanu Reeves, James Russo', blurb: 'Two hustlers on the road; narcolepsy, Shakespeare, River Phoenix.' },
      { title: 'Milk', year: 2008, director: 'Van Sant', cast: 'Sean Penn, Emile Hirsch, Josh Brolin', blurb: "Harvey Milk's campaigns and assassination." },
      { title: 'Paris Is Burning', year: 1990, director: 'Livingston', cast: 'Pepper LaBeija, Octavia St. Laurent, Venus Xtravaganza', blurb: "Harlem's ballroom scene: houses, categories, dreams." },
      { title: 'Happy Together', year: 1997, director: 'Wong Kar-wai', cast: 'Leslie Cheung, Tony Leung Chiu-wai, Chang Chen', blurb: 'Two men from Hong Kong wear each other out in Buenos Aires.' },
      { title: 'The Handmaiden', year: 2016, director: 'Park Chan-wook', cast: 'Kim Min-hee, Kim Tae-ri, Ha Jung-woo', blurb: 'A con inside a con inside a Korean gothic romance.' },
      { title: 'Maurice', year: 1987, director: 'Ivory', cast: 'James Wilby, Hugh Grant, Rupert Graves', blurb: "Forster's forbidden love story, given the ending he hid." },
      { title: 'A Single Man', year: 2009, director: 'Ford', cast: 'Colin Firth, Julianne Moore, Nicholas Hoult', blurb: 'One meticulous day of a grieving professor, 1962.' },
      { title: 'The Birdcage', year: 1996, director: 'Nichols', cast: 'Robin Williams, Gene Hackman, Nathan Lane', blurb: 'A drag-club owner plays straight for the in-laws; farce perfected.' },
      { title: 'Fox and His Friends', year: 1975, director: 'Fassbinder', cast: 'Rainer Werner Fassbinder, Peter Chatel, Karlheinz Böhm', blurb: 'A working-class lottery winner devoured by polite society.' },
      { title: 'Sebastiane', year: 1976, director: 'Jarman', cast: 'Leonardo Treviglio, Barney James, Neil Kennedy', blurb: "The saint's martyrdom, in Latin; Jarman's radical debut." },
      { title: 'Death in Venice', year: 1971, director: 'Visconti', cast: 'Dirk Bogarde, Björn Andrésen, Romolo Valli', blurb: "A composer's fatal obsession with beauty on the Lido." },
      { title: 'The Way He Looks', year: 2014, director: 'Ribeiro', cast: 'Ghilherme Lobo, Fábio Audi, Tess Amorim', blurb: 'A blind Brazilian teenager falls for the new boy; gentle first love.' },
      { title: 'Tomboy', year: 2011, director: 'Sciamma', cast: 'Zoé Héran, Malonn Lévana, Jeanne Disson', blurb: 'A ten-year-old spends a summer as Mikael; small and precise.' },
      { title: 'All About My Mother', year: 1999, director: 'Almodóvar', cast: 'Cecilia Roth, Marisa Paredes, Candela Peña', blurb: "A grieving mother among Barcelona's actresses and saints." },
    ],
    appNote:
      'Keep the canon on your I Like Movies watchlist, mark what you have seen, and rate as you go so the app learns what to recommend next. A new themed collection lands in the Discover tab every Friday.',
    faqs: [
      {
        q: 'What is the best LGBTQ movie of all time?',
        a: [
          "Critics' polls usually put Moonlight, Carol, Portrait of a Lady on Fire and Happy Together near the top, and all four are in this collection. Where you start depends on whether you want tenderness (Moonlight) or fire (Portrait).",
        ],
      },
      {
        q: 'Why is Pride the featured film?',
        a: [
          'It is the collection\'s most joyful entry and a true story: London activists raised money for striking Welsh miners in 1984, and the unions marched at Pride the following year.',
        ],
      },
    ],
  },
  {
    slug: 'the-long-take',
    title: 'The long take: 21 films built on unbroken shots',
    metaDescription:
      '21 films famous for their long takes, from Rope and Russian Ark to Children of Men, Goodfellas, Oldboy and Victoria, curated as a weekly collection.',
    h1: 'The long take: 21 films built on unbroken shots',
    weekOf: '2026-05-29',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/gFGLwUBhVrq0bq4j9DU08xQDRU2.jpg',
    intro: [
      "A cut is a blink, and some directors refuse to blink. The long take is cinema's highest-wire act: Hitchcock hiding reel changes in Rope, Sokurov gliding through the Hermitage in one real ninety-six-minute shot, Cuarón's camera inside a refugee bus while the world ends outside it.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of May 29, 2026, featuring Children of Men. Some entries are single takes, real (Russian Ark, Victoria) or stitched (1917, Birdman); the rest deploy the unbroken shot as a signature scene, from the Copacabana entrance in Goodfellas to the corridor fight in Oldboy.",
    ],
    items: [
      { title: 'Children of Men', year: 2006, director: 'Cuarón', cast: 'Clive Owen, Clare-Hope Ashitey, Chiwetel Ejiofor', blurb: 'A world without births, one pregnant refugee; the war-zone takes rewrote action cinema.' },
      { title: 'Rope', year: 1948, director: 'Hitchcock', cast: 'James Stewart, John Dall, Farley Granger', blurb: 'A murder before the party, the body in the chest; staged as one take.' },
      { title: 'Russian Ark', year: 2002, director: 'Sokurov', cast: 'Sergey Dreyden, Mariya Kuznetsova, Leonid Mozgovoy', blurb: '300 years of Russia in one real, unbroken Hermitage glide.' },
      { title: '1917', year: 2019, director: 'Mendes', cast: 'George MacKay, Dean-Charles Chapman, Mark Strong', blurb: "Two soldiers, one message, across No Man's Land in one seamless shot." },
      { title: 'Birdman', year: 2014, director: 'Iñárritu', cast: 'Michael Keaton, Emma Stone, Zach Galifianakis', blurb: 'A washed-up movie star mounts a Broadway play; the camera never rests.' },
      { title: 'Touch of Evil', year: 1958, director: 'Welles', cast: 'Charlton Heston, Janet Leigh, Orson Welles', blurb: 'A border-town noir; the crane opening every film school studies.' },
      { title: 'Goodfellas', year: 1990, director: 'Scorsese', cast: 'Robert De Niro, Ray Liotta, Joe Pesci', blurb: 'Thirty years in the mob; the Copacabana walk is the sales pitch.' },
      { title: 'The Player', year: 1992, director: 'Altman', cast: 'Tim Robbins, Greta Scacchi, Fred Ward', blurb: 'A studio executive kills a writer; Hollywood satire with an eight-minute opener.' },
      { title: 'Boogie Nights', year: 1997, director: 'P.T. Anderson', cast: 'Mark Wahlberg, Burt Reynolds, Julianne Moore', blurb: "The porn industry's seventies family, entered poolside in one take." },
      { title: 'Magnolia', year: 1999, director: 'P.T. Anderson', cast: 'Tom Cruise, Philip Baker Hall, Philip Seymour Hoffman', blurb: 'Nine San Fernando lives converge; frogs.' },
      { title: 'Atonement', year: 2007, director: 'Joe Wright', cast: 'James McAvoy, Keira Knightley, Saoirse Ronan', blurb: 'A lie ruins two lovers; Dunkirk crossed in one five-minute shot.' },
      { title: 'Police, Adjective', year: 2009, director: 'Porumboiu', cast: 'Dragoș Bucur, Vlad Ivanov, Ion Stoica', blurb: 'A cop tails a teenage hash smoker and questions the word law.' },
      { title: 'The Sacrifice', year: 1986, director: 'Tarkovsky', cast: 'Erland Josephson, Susan Fleetwood, Allan Edwall', blurb: 'A bargain with God to undo nuclear war; the burning house, one take.' },
      { title: 'Oldboy', year: 2003, director: 'Park Chan-wook', cast: 'Choi Min-sik, Yoo Ji-tae, Kang Hye-jung', blurb: 'Fifteen years imprisoned, five days for revenge; the corridor hammer fight.' },
      { title: 'Elephant', year: 2003, director: 'Van Sant', cast: 'Alex Frost, Eric Deulen, John Robinson', blurb: 'A school day drifting toward a shooting, hallway by hallway.' },
      { title: 'Hard Boiled', year: 1992, director: 'Woo', cast: 'Chow Yun-Fat, Tony Leung Chiu-wai, Anthony Wong', blurb: 'A cop, a hospital siege, a legendary cut-free shootout.' },
      { title: 'Werckmeister Harmonies', year: 2000, director: 'Tarr', cast: 'Lars Rudolph, Peter Fitz, Hanna Schygulla', blurb: 'A whale arrives in a Hungarian town; unrest follows, in 39 shots.' },
      { title: 'The Passenger', year: 1975, director: 'Antonioni', cast: 'Jack Nicholson, Maria Schneider, Jenny Runacre', blurb: "A reporter takes a dead man's identity; the penultimate shot is the legend." },
      { title: 'Weekend', year: 1967, director: 'Godard', cast: 'Mireille Darc, Jean Yanne, Jean-Pierre Kalfon', blurb: "A bourgeois couple's road trip into apocalypse; the traffic-jam tracking shot." },
      { title: 'Le Trou', year: 1960, director: 'Becker', cast: 'Michel Constantin, Jean Keraudy, Philippe Leroy', blurb: 'Four cellmates dig out of a Paris prison; hypnotic process.' },
      { title: 'Victoria', year: 2015, director: 'Schipper', cast: 'Laia Costa, Frederick Lau, Franz Rogowski', blurb: 'One Berlin night, one real 138-minute take, one bank robbery.' },
    ],
    appNote:
      'Keep the collection on your I Like Movies watchlist and cross films off as you watch; the app tracks what is left. Every Friday a new themed collection arrives in the Discover tab.',
    faqs: [
      {
        q: 'Which films are really one single take?',
        a: [
          'Russian Ark (2002) and Victoria (2015) genuinely are: one camera, one take, no hidden cuts. Rope, Birdman and 1917 simulate the effect with concealed edits.',
        ],
      },
      {
        q: 'Why do directors use long takes?',
        a: [
          'Unbroken time builds tension no montage can fake, because the audience knows nothing was fixed later. It is also among the hardest things to pull off on a set, which is part of the appeal.',
        ],
      },
    ],
  },
  {
    slug: 'african-cinema',
    title: 'African cinema: 21 essential films from Black Girl to Atlantics',
    metaDescription:
      "21 essential films of African cinema, from Sembène's Black Girl and Touki Bouki to Timbuktu, Atlantics and The Battle of Algiers.",
    h1: 'African cinema: 21 essential films',
    weekOf: '2026-05-22',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/kWkAWQQrlI5Rq2CtC5aYac9dx9V.jpg',
    intro: [
      'From Ousmane Sembène\'s pioneering Senegalese realism to Mati Diop\'s ghosts drifting back across the Atlantic, African cinema built one of the richest bodies of work in film history while most festivals looked elsewhere. They are catching up.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of May 22, 2026, featuring Atlantics. It spans the continent: Senegal, Mali, Chad, Egypt, Ethiopia, Morocco, South Africa, Burkina Faso, Tunisia, and Algeria through The Battle of Algiers.',
    ],
    items: [
      { title: 'Atlantics', year: 2019, director: 'Mati Diop', cast: 'Mame Bineta Sane, Amadou Mbow, Ibrahima Traore', blurb: 'Dakar construction workers lost at sea return as spirits.' },
      { title: 'Black Girl', year: 1966, director: 'Sembène', cast: 'Mbissine Thérèse Diop, Anne-Marie Jelinek, Robert Fontaine', blurb: "A Senegalese nanny's life shrinks inside a French flat." },
      { title: 'Xala', year: 1975, director: 'Sembène', cast: 'Thierno Leye, Myriam Niang, Seune Samb', blurb: 'A businessman cursed with impotence on his third wedding; satire.' },
      { title: 'Touki Bouki', year: 1973, director: 'Mambéty', cast: 'Magaye Niang, Myriam Niang, Christoph Colomb', blurb: 'Two Dakar lovers scheme toward Paris; an avant-garde road movie.' },
      { title: 'Hyenas', year: 1992, director: 'Mambéty', cast: 'Djibril Diop Mambéty, Mansour Diouf, Ami Diakhate', blurb: "A rich woman returns to buy her old town's justice." },
      { title: 'Yeelen', year: 1987, director: 'Cissé', cast: 'Issiaka Kane, Balla Moussa Keita, Aoua Sangare', blurb: 'A Malian son flees his sorcerer father; myth on screen.' },
      { title: 'Timbuktu', year: 2014, director: 'Sissako', cast: 'Ibrahim Ahmed, Toulou Kiki, Layla Walet Mohamed', blurb: "A cattle herder's family under jihadist occupation; grief with grace." },
      { title: 'Bamako', year: 2006, director: 'Sissako', cast: 'Aïssa Maïga, Tiécoura Traoré, Maimouna Hélène Diarra', blurb: 'A courtyard puts the World Bank on trial.' },
      { title: 'Tilai', year: 1990, director: 'Ouedraogo', cast: 'Rasmané Ouédraogo, Ina Cissé, Roukietou Barry', blurb: "A forbidden love breaks a village's moral law." },
      { title: 'A Screaming Man', year: 2010, director: 'Haroun', cast: "Youssouf Djaoro, Diouc Koma, Emile Abossolo M'bo", blurb: "A pool attendant's pride costs his son; Chad's civil war." },
      { title: 'Lingui', year: 2021, director: 'Haroun', cast: 'Achouackh Abakar Souleymane, Rihane Khalil Alio, Youssouf Djaoro', blurb: 'A mother seeks a forbidden abortion for her daughter in Chad.' },
      { title: 'Chronicle of the Years of Fire', year: 1975, director: 'Lakhdar-Hamina', cast: 'Yorgo Voyagis, Leila Shenna, Mohammed Lakhdar-Hamina', blurb: "Algeria's road to revolution; a Palme d'Or winner." },
      { title: 'Tsotsi', year: 2005, director: 'Hood', cast: 'Presley Chweneyagae, Jerry Mofokeng, Terry Pheto', blurb: 'A Johannesburg gang leader finds a baby in a stolen car.' },
      { title: 'Cairo Station', year: 1958, director: 'Chahine', cast: 'Farid Shawqy, Hind Rostom, Youssef Chahine', blurb: "A newspaper seller's obsession in Cairo's main station." },
      { title: 'Buud Yam', year: 1997, director: 'Kaboré', cast: 'Serge Yanogo, Amssatou Maïga, Colette Kaboré', blurb: "A young man's quest to heal his sister; a Burkinabè classic." },
      { title: 'Ali Zaoua', year: 2000, director: 'Ayouch', cast: 'Mounïm Kbab, Abdelhak Zhayra, Hicham Moussoune', blurb: 'Casablanca street kids bury their friend like a prince.' },
      { title: 'Faya Dayi', year: 2021, director: 'Beshir', cast: 'Mohammed Arif, Hashim Abdi, Biniam Yonas', blurb: "Ethiopia's khat harvest in hypnotic black and white." },
      { title: 'Difret', year: 2014, director: 'Mehari', cast: 'Meron Getnet, Tizita Hagere, Haregewine Assefa', blurb: 'A lawyer defends a girl who shot her abductor-husband.' },
      { title: 'Lamb', year: 2015, director: 'Zeleke', cast: 'Rediat Amare, Kidist Siyum, Wolela Assefa', blurb: 'An Ethiopian boy and the sheep he refuses to sacrifice.' },
      { title: 'The Man Who Sold His Skin', year: 2020, director: 'Ben Hania', cast: 'Yahya Mahayni, Dea Liane, Koen De Bouw', blurb: 'A Syrian refugee becomes a living artwork.' },
      { title: 'The Battle of Algiers', year: 1966, director: 'Pontecorvo', cast: 'Brahim Hadjadj, Mohamed Ben Kassen, Yacef Saâdi', blurb: 'The Casbah uprising, shot like newsreel; still studied as a manual.' },
    ],
    appNote:
      'Many of these take some finding, which makes a watchlist the difference between meaning to and watching. Keep the collection in I Like Movies and mark films as you track them down. New themed collections arrive in the Discover tab every Friday.',
    faqs: [
      {
        q: 'Where do I start with African cinema?',
        a: [
          'Black Girl (1966), the film that effectively founded Sub-Saharan African feature filmmaking, then Touki Bouki (1973) and Atlantics (2019) to see how far the language traveled.',
        ],
      },
      {
        q: 'Is The Battle of Algiers an African film?',
        a: [
          'It is an Italian-Algerian co-production directed by an Italian, Gillo Pontecorvo, but it was made at Algeria\'s invitation, shot in the Casbah with Algerian non-professionals, and remains the defining film of the continent\'s anti-colonial struggle. It closes the collection for that reason.',
        ],
      },
    ],
  },
  {
    slug: 'y2k-romcoms',
    title: "Y2K romcoms: 21 films from the genre's last golden age",
    metaDescription:
      "21 romantic comedies from the flip-phone era, from Bridget Jones's Diary and Notting Hill to Amélie, Hitch and The Proposal, curated as a weekly collection.",
    h1: "Y2K romcoms: 21 films from the genre's last golden age",
    weekOf: '2026-05-15',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/9rSpxsMhG1FnFtUDdvSAXdtLtb3.jpg',
    intro: [
      'Somewhere between 1999 and 2009, Hollywood remembered how to write a meet-cute: Hugh Grant stammered, Sandra Bullock fell over furniture, Renée Zellweger kept a diary. The era\'s romcoms were formula, but formula executed by stars and scripts that knew exactly what they were doing.',
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of May 15, 2026, featuring Bridget Jones's Diary. Amélie and My Sassy Girl keep it from being a purely Hollywood list.",
    ],
    items: [
      { title: "Bridget Jones's Diary", year: 2001, director: 'Maguire', cast: 'Renée Zellweger, Colin Firth, Hugh Grant', blurb: "A thirtysomething's diary, two unsuitable men." },
      { title: 'Notting Hill', year: 1999, director: 'Michell', cast: 'Julia Roberts, Hugh Grant, Gina McKee', blurb: "A bookseller dates the world's most famous actress." },
      { title: 'Love Actually', year: 2003, director: 'Curtis', cast: 'Hugh Grant, Alan Rickman, Emma Thompson', blurb: 'Nine London love stories collide at Christmas.' },
      { title: 'Amélie', year: 2001, director: 'Jeunet', cast: 'Audrey Tautou, Mathieu Kassovitz, Rufus', blurb: "A Montmartre waitress engineers strangers' happiness." },
      { title: 'Legally Blonde', year: 2001, director: 'Luketic', cast: 'Reese Witherspoon, Luke Wilson, Selma Blair', blurb: 'A sorority queen conquers Harvard Law, first out of spite, then merit.' },
      { title: 'The Holiday', year: 2006, director: 'Meyers', cast: 'Cameron Diaz, Kate Winslet, Jude Law', blurb: 'Two women swap houses, and lives, for Christmas.' },
      { title: "Something's Gotta Give", year: 2003, director: 'Meyers', cast: 'Jack Nicholson, Diane Keaton, Keanu Reeves', blurb: "A playboy falls for his young girlfriend's mother." },
      { title: 'The Devil Wears Prada', year: 2006, director: 'Frankel', cast: 'Meryl Streep, Anne Hathaway, Emily Blunt', blurb: "An assistant survives fashion's most terrifying editor." },
      { title: 'Miss Congeniality', year: 2000, director: 'Petrie', cast: 'Sandra Bullock, Benjamin Bratt, Heather Burns', blurb: 'An FBI agent goes undercover in a beauty pageant.' },
      { title: 'How to Lose a Guy in 10 Days', year: 2003, director: 'Petrie', cast: 'Kate Hudson, Matthew McConaughey, Adam Goldberg', blurb: 'She needs him to dump her; he bet he can keep her.' },
      { title: 'Two Weeks Notice', year: 2002, director: 'Lawrence', cast: 'Sandra Bullock, Hugh Grant, Dana Ivey', blurb: 'A counsel quits her billionaire boss; he cannot function without her.' },
      { title: 'Music and Lyrics', year: 2007, director: 'Lawrence', cast: 'Drew Barrymore, Hugh Grant, Brad Garrett', blurb: 'A washed-up popstar needs a hit lyric in days.' },
      { title: 'Hitch', year: 2005, director: 'Tennant', cast: 'Will Smith, Eva Mendes, Kevin James', blurb: 'A date doctor cannot follow his own advice.' },
      { title: 'Sweet Home Alabama', year: 2002, director: 'Tennant', cast: 'Reese Witherspoon, Josh Lucas, Patrick Dempsey', blurb: 'A New York designer must first divorce the husband back home.' },
      { title: '13 Going on 30', year: 2004, director: 'Waters', cast: 'Jennifer Garner, Mark Ruffalo, Judy Greer', blurb: 'A thirteen-year-old wakes up thirty, with everything but her own history.' },
      { title: 'About a Boy', year: 2002, director: 'Weitz', cast: 'Hugh Grant, Nicholas Hoult, Toni Collette', blurb: 'A rich idler adopts a fake son and grows up.' },
      { title: 'My Sassy Girl', year: 2001, director: 'Kwak', cast: 'Gianna Jun, Cha Tae-hyun, Kim In-mun', blurb: "A hapless student and a chaotic girl; Korea's beloved romcom." },
      { title: 'The Wedding Planner', year: 2001, director: 'Shankman', cast: 'Jennifer Lopez, Matthew McConaughey, Justin Chambers', blurb: 'She plans weddings; the groom is the problem.' },
      { title: 'Definitely, Maybe', year: 2008, director: 'Brooks', cast: 'Ryan Reynolds, Abigail Breslin, Elizabeth Banks', blurb: 'A father tells his daughter three love stories; guess the mother.' },
      { title: 'The Proposal', year: 2009, director: 'Fletcher', cast: 'Sandra Bullock, Ryan Reynolds, Malin Akerman', blurb: 'A boss fakes an engagement with her assistant to dodge deportation.' },
      { title: 'Bridget Jones: The Edge of Reason', year: 2004, director: 'Kidron', cast: 'Renée Zellweger, Colin Firth, Hugh Grant', blurb: 'Bridget, round two: jealousy and a Thai prison.' },
    ],
    appNote:
      'Comfort rewatches deserve tracking too: rate these in I Like Movies and the app learns what an easy evening looks like for you. A new themed collection lands in the Discover tab every Friday.',
    faqs: [
      {
        q: 'What is the best 2000s romcom?',
        a: [
          "By reputation, Bridget Jones's Diary and Love Actually for the British school, How to Lose a Guy in 10 Days and The Proposal for the Hollywood one. Amélie, if you allow France in.",
        ],
      },
      {
        q: 'Why did romcoms fade after this era?',
        a: [
          'The mid-budget star vehicle stopped making theatrical money in the 2010s, and the genre moved to streaming with smaller casts and smaller scripts. This list covers roughly the last decade when romcoms were event cinema.',
        ],
      },
    ],
  },
  {
    slug: 'classical-books',
    title: 'Classic literature on screen: 21 great adaptations',
    metaDescription:
      '21 film adaptations of the literary canon, from Pride & Prejudice and Sense and Sensibility to Barry Lyndon, The Trial and Frankenstein.',
    h1: 'Classic literature on screen: 21 great adaptations',
    weekOf: '2026-05-08',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/1Onam6oWyFAUCcoxtdWkACtEiNr.jpg',
    intro: [
      'When the source is the canon itself, Austen, the Brontës, Dickens, Dumas, Shelley, the question stops being whether the film is faithful and becomes whose reading burns brightest on screen. This collection gathers 21 answers, from David Lean\'s Dickens to Kubrick\'s Thackeray.',
      "It ran as the weekly theme in the I Like Movies Discover tab for the week of May 8, 2026, featuring Joe Wright's Pride & Prejudice. The list deliberately mixes eras: a 1939 Wuthering Heights sits next to del Toro's 2025 Frankenstein.",
    ],
    items: [
      { title: 'Pride & Prejudice', year: 2005, director: 'Joe Wright', cast: 'Keira Knightley, Matthew Macfadyen, Brenda Blethyn', blurb: 'Austen at dawn light; the hand-flex adaptation.' },
      { title: 'Sense and Sensibility', year: 1995, director: 'Lee', cast: 'Emma Thompson, Kate Winslet, Alan Rickman', blurb: "Two sisters, opposite hearts; Emma Thompson's script, Lee's restraint." },
      { title: 'Anna Karenina', year: 2012, director: 'Joe Wright', cast: 'Keira Knightley, Jude Law, Aaron Taylor-Johnson', blurb: 'Tolstoy staged inside a theatre; doomed love as choreography.' },
      { title: 'Wuthering Heights', year: 1939, director: 'Wyler', cast: 'Merle Oberon, Laurence Olivier, David Niven', blurb: 'Heathcliff and Cathy, Hollywood-gothic.' },
      { title: 'Jane Eyre', year: 2011, director: 'Fukunaga', cast: 'Mia Wasikowska, Michael Fassbender, Jamie Bell', blurb: 'The governess and her haunted employer; moors and candlelight.' },
      { title: 'Great Expectations', year: 1946, director: 'Lean', cast: 'John Mills, Valerie Hobson, Tony Wager', blurb: "Pip, Estella, Miss Havisham; Lean's definitive Dickens." },
      { title: 'Oliver Twist', year: 1948, director: 'Lean', cast: 'John Howard Davies, Robert Newton, Alec Guinness', blurb: 'The workhouse orphan among thieves; Lean again.' },
      { title: 'The Three Musketeers', year: 1973, director: 'Lester', cast: 'Michael York, Oliver Reed, Richard Chamberlain', blurb: 'Dumas as swashbuckling slapstick, played straight.' },
      { title: 'The Count of Monte Cristo', year: 2002, director: 'Reynolds', cast: 'Jim Caviezel, Guy Pearce, Richard Harris', blurb: 'Wrongful prison, patient revenge, a fortune.' },
      { title: 'Frankenstein', year: 2025, director: 'del Toro', cast: 'Oscar Isaac, Jacob Elordi, Christoph Waltz', blurb: "del Toro's creature, gothic and grieving." },
      { title: 'Lady Macbeth', year: 2016, director: 'Oldroyd', cast: 'Florence Pugh, Cosmo Jarvis, Paul Hilton', blurb: 'A bought bride turns lethal in a cold northern house.' },
      { title: 'The Trial', year: 1962, director: 'Welles', cast: 'Anthony Perkins, Romy Schneider, Orson Welles', blurb: "Kafka's arrest without charge, in Welles' nightmare spaces." },
      { title: 'A Room with a View', year: 1985, director: 'Ivory', cast: 'Helena Bonham Carter, Julian Sands, Maggie Smith', blurb: 'An English rose kisses the wrong man in Florence.' },
      { title: 'Howards End', year: 1992, director: 'Ivory', cast: 'Emma Thompson, Helena Bonham Carter, Anthony Hopkins', blurb: "Two families and a house; Forster's England changing hands." },
      { title: 'The Age of Innocence', year: 1993, director: 'Scorsese', cast: 'Daniel Day-Lewis, Michelle Pfeiffer, Winona Ryder', blurb: 'Desire strangled by Gilded Age manners; Scorsese called it his most violent film.' },
      { title: 'Tess', year: 1979, director: 'Polanski', cast: 'Nastassja Kinski, Peter Firth, Leigh Lawson', blurb: "Hardy's wronged heroine across an indifferent countryside." },
      { title: 'White Nights', year: 1957, director: 'Visconti', cast: 'Maria Schell, Marcello Mastroianni, Jean Marais', blurb: "Dostoevsky's dreamer over four studio-fog nights." },
      { title: 'Madame Bovary', year: 1991, director: 'Chabrol', cast: 'Isabelle Huppert, Jean-François Balmer, Christophe Malavoy', blurb: "Emma's debts and adulteries, coolly observed by Chabrol." },
      { title: 'The Hunchback of Notre Dame', year: 1956, director: 'Delannoy', cast: 'Gina Lollobrigida, Anthony Quinn, Alain Cuny', blurb: "Quinn's Quasimodo and Lollobrigida's Esmeralda." },
      { title: 'Barry Lyndon', year: 1975, director: 'Kubrick', cast: "Ryan O'Neal, Marisa Berenson, Patrick Magee", blurb: "An Irish chancer's rise and fall in candlelit tableaux." },
      { title: 'Hamlet', year: 1996, director: 'Branagh', cast: 'Kenneth Branagh, Derek Jacobi, Kate Winslet', blurb: 'The full text, four hours, 70mm.' },
    ],
    appNote:
      'Read the book, watchlist the film, or the other way round: I Like Movies keeps the screen half of the pairing tracked and rated. New themed collections arrive in the Discover tab every Friday.',
    faqs: [
      {
        q: 'What is the best Jane Austen film adaptation?',
        a: [
          "Pride & Prejudice (2005) and Sense and Sensibility (1995) lead most polls, and both are here. Wright's film is the more cinematic reading; Lee's, written by Emma Thompson, has the sharper script.",
        ],
      },
      {
        q: 'Do these films follow the books?',
        a: [
          "Loosely to freely. Welles moved The Trial into nightmare architecture, Visconti's White Nights repaints Dostoevsky in studio fog, and Lady Macbeth strips its Leskov novella to the bone. Fidelity is not the point; interpretation is.",
        ],
      },
    ],
  },
  {
    slug: 'workers-cinema',
    title: "Workers' cinema: 21 films about labor and dignity",
    metaDescription:
      '21 films about labor, strikes and the dignity of work, from Norma Rae and Modern Times to Office Space, I, Daniel Blake and Two Days, One Night.',
    h1: "Workers' cinema: 21 films about labor and dignity",
    weekOf: '2026-05-01',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/5l58tPlYA1JaacBvcojq3YMQyL5.jpg',
    intro: [
      "Films about work rarely get called a genre, but they form one: strikes and picket lines, factory floors and call centers, the people history books forget. This collection gathers 21 of them, from Chaplin's assembly line to the Dardennes' weekend of door-knocking.",
      "It ran as the weekly theme in the I Like Movies Discover tab for the week of May 1, 2026, timed to May Day, featuring Norma Rae, Martin Ritt's story of a textile-mill union drive. The list crosses continents: Monicelli's Turin, Loach's Newcastle, Cantet's France, Boots Riley's Oakland.",
    ],
    items: [
      { title: 'Norma Rae', year: 1979, director: 'Martin Ritt', cast: 'Sally Field, Ron Leibman, Beau Bridges', blurb: 'A mill worker climbs on the table with a UNION sign.' },
      { title: 'Modern Times', year: 1936, director: 'Chaplin', cast: 'Charlie Chaplin, Paulette Goddard, Henry Bergman', blurb: 'Chaplin swallowed by the assembly line.' },
      { title: 'The Grapes of Wrath', year: 1940, director: 'Ford', cast: 'Henry Fonda, Jane Darwell, John Carradine', blurb: 'The Joads driven west by the Dust Bowl.' },
      { title: 'On the Waterfront', year: 1954, director: 'Kazan', cast: 'Marlon Brando, Eva Marie Saint, Karl Malden', blurb: 'A dockworker testifies against the mob; the contender speech.' },
      { title: 'Salt of the Earth', year: 1954, director: 'Biberman', cast: 'Rosaura Revueltas, Juan Chacón, Will Geer', blurb: 'A zinc-mine strike where the wives take the picket; made by blacklistees.' },
      { title: 'The Organizer', year: 1963, director: 'Monicelli', cast: 'Marcello Mastroianni, Renato Salvatori, Gabriella Giorgelli', blurb: 'A professor helps Turin mill workers strike, around 1900.' },
      { title: 'Blue Collar', year: 1978, director: 'Schrader', cast: 'Richard Pryor, Harvey Keitel, Yaphet Kotto', blurb: 'Three Detroit auto workers rob their own union.' },
      { title: '9 to 5', year: 1980, director: 'Higgins', cast: 'Jane Fonda, Lily Tomlin, Dolly Parton', blurb: 'Three secretaries kidnap their sexist boss.' },
      { title: 'Matewan', year: 1987, director: 'Sayles', cast: 'Chris Cooper, James Earl Jones, Mary McDonnell', blurb: 'A 1920 West Virginia coal strike heads for a gunfight.' },
      { title: 'Roger & Me', year: 1989, director: 'Moore', cast: 'Michael Moore, Rhonda Britton, Fred Ross', blurb: "Michael Moore chases GM's chairman as Flint dies." },
      { title: 'The Full Monty', year: 1997, director: 'Cattaneo', cast: 'Robert Carlyle, Mark Addy, Wim Snape', blurb: 'Unemployed Sheffield steelworkers become strippers.' },
      { title: 'Office Space', year: 1999, director: 'Judge', cast: 'Ron Livingston, Jennifer Aniston, David Herman', blurb: 'Cubicle rebellion, a red stapler, TPS reports.' },
      { title: 'I, Daniel Blake', year: 2016, director: 'Loach', cast: 'Dave Johns, Hayley Squires, Briana Shann', blurb: 'A sick carpenter against the benefits bureaucracy.' },
      { title: 'Sorry to Bother You', year: 2018, director: 'Riley', cast: 'LaKeith Stanfield, Tessa Thompson, Jermaine Fowler', blurb: "A telemarketer's white voice ascends into corporate horror." },
      { title: 'Harlan County U.S.A.', year: 1976, director: 'Kopple', cast: 'Norman Yarborough, Houston Elmore, Phil Sparks', blurb: "Inside a Kentucky miners' strike, guns and all." },
      { title: 'Daens', year: 1992, director: 'Coninx', cast: 'Jan Decleir, Gérard Desarthe, Antje De Boeck', blurb: 'A priest defies the mill owners in 1890s Flanders.' },
      { title: 'Brassed Off', year: 1996, director: 'Herman', cast: 'Ewan McGregor, Tara Fitzgerald, Pete Postlethwaite', blurb: 'A colliery brass band plays on as the pit closes.' },
      { title: 'Human Resources', year: 1999, director: 'Cantet', cast: 'Jalil Lespert, Jean-Claude Vallod, Didier Emile-Woldemard', blurb: "A business student's downsizing plan targets his own father." },
      { title: 'Made in Dagenham', year: 2010, director: 'Cole', cast: 'Sally Hawkins, Bob Hoskins, Miranda Richardson', blurb: 'Ford machinists strike for equal pay, 1968.' },
      { title: 'Two Days, One Night', year: 2014, director: 'Dardenne', cast: 'Marion Cotillard, Fabrizio Rongione, Catherine Salée', blurb: 'One weekend to convince colleagues to give up their bonuses so she keeps her job.' },
      { title: 'Tout va bien', year: 1972, director: 'Godard', cast: 'Yves Montand, Jane Fonda, Vittorio Caprioli', blurb: 'A strike occupies a sausage factory; Godard dissects it.' },
    ],
    appNote:
      'Keep the collection on your I Like Movies watchlist and work through it one evening at a time; the app remembers where you stopped. A new themed collection lands in the Discover tab every Friday.',
    faqs: [
      {
        q: 'What is the best movie about unions?',
        a: [
          "Norma Rae (1979) is the classic union-drive drama, and Harlan County U.S.A. (1976) is its documentary counterpart, filmed inside a real Kentucky miners' strike. Matewan (1987) covers the same coalfield history as fiction.",
        ],
      },
      {
        q: 'Are there comedies on this list?',
        a: [
          'Yes. 9 to 5, The Full Monty, Office Space and Sorry to Bother You all play work for laughs without dropping the argument.',
        ],
      },
    ],
  },
  {
    slug: 'italian-neorealism',
    title: 'Italian Neorealism: 21 essential films from Bicycle Thieves onward',
    metaDescription:
      'The 21 essential Italian neorealist films, from Bicycle Thieves and Rome, Open City to Umberto D., La Strada and Hands Over the City.',
    h1: 'Italian Neorealism: 21 essential films',
    weekOf: '2026-04-24',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/kcirw5ZVgSvsG59ESoiCvoAyK4b.jpg',
    intro: [
      "After the Second World War, Italian directors took cameras out of the studios and onto broken streets, casting real people and filming the poverty around them. The movement they built, neorealism, became the school almost every modern director studied, openly or not: De Sica's fathers and sons, Rossellini's occupied Rome, Visconti's fishermen.",
      "This collection of 21 films was the first weekly theme in the I Like Movies Discover tab, for the week of April 24, 2026, featuring Bicycle Thieves. It runs from the movement's core (Rome, Open City; Umberto D.) to its edges and heirs (Il Posto, Hands Over the City).",
    ],
    items: [
      { title: 'Bicycle Thieves', year: 1948, director: 'De Sica', cast: 'Lamberto Maggiorani, Enzo Staiola, Lianella Carell', blurb: 'A father and son hunt the stolen bicycle his job depends on.' },
      { title: 'Rome, Open City', year: 1945, director: 'Rossellini', cast: 'Aldo Fabrizi, Marcello Pagliero, Harry Feist', blurb: 'Resistance and betrayal in occupied Rome, filmed in its rubble.' },
      { title: 'Paisan', year: 1946, director: 'Rossellini', cast: 'Carmela Sazio, Robert Van Loon, Benjamin Emanuel', blurb: 'Six stories up the boot of liberated Italy.' },
      { title: 'Umberto D.', year: 1952, director: 'De Sica', cast: 'Carlo Battisti, Napoleone the Dog, Maria Pia Casilio', blurb: 'A pensioner, his dog, and dignity on the edge.' },
      { title: 'Ossessione', year: 1943, director: 'Visconti', cast: 'Clara Calamai, Massimo Girotti, Dhia Cristiani', blurb: "The Postman Always Rings Twice on the Po delta; the movement's dark seed." },
      { title: 'La Terra Trema', year: 1948, director: 'Visconti', cast: 'Antonio Arcidiacono, Giuseppe Arcidiacono, Venera Bonaccorso', blurb: 'Sicilian fishermen against the wholesalers, cast from the village.' },
      { title: 'La Strada', year: 1954, director: 'Fellini', cast: 'Giulietta Masina, Anthony Quinn, Richard Basehart', blurb: "A waif sold to a traveling strongman; Fellini's heartbreaker." },
      { title: 'Nights of Cabiria', year: 1957, director: 'Fellini', cast: 'Giulietta Masina, François Périer, Franca Marzi', blurb: 'A Roman streetwalker keeps hoping; that final smile.' },
      { title: 'Bitter Rice', year: 1949, director: 'De Santis', cast: 'Doris Dowling, Silvana Mangano, Vittorio Gassman', blurb: 'Rice-field workers, a theft, melodrama in the paddies.' },
      { title: 'Il Posto', year: 1961, director: 'Olmi', cast: 'Loredana Detto, Sandro Panseri, Corrado Aprile', blurb: "A boy's first office job, and the desk waiting at the end." },
      { title: 'The Tree of Wooden Clogs', year: 1978, director: 'Olmi', cast: 'Luigi Ornaghi, Francesca Moriggi, Omar Brignoli', blurb: 'A year of peasant life in Lombardy, patient and immense.' },
      { title: 'Accattone', year: 1961, director: 'Pasolini', cast: 'Franco Citti, Franca Pasut, Silvana Corsini', blurb: "A Roman pimp's doomed streets; Pasolini's debut." },
      { title: 'Mamma Roma', year: 1962, director: 'Pasolini', cast: 'Anna Magnani, Ettore Garofolo, Franco Citti', blurb: 'Anna Magnani as a mother clawing toward respectability.' },
      { title: 'Salvatore Giuliano', year: 1962, director: 'Rosi', cast: 'Salvo Randone, Frank Wolff, Pippo Agusta', blurb: "A bandit's corpse, and Sicily reconstructed around it." },
      { title: 'Il Grido', year: 1957, director: 'Antonioni', cast: 'Steve Cochran, Alida Valli, Dorian Gray', blurb: 'A jilted worker drifts the Po valley; neorealism turning inward.' },
      { title: 'In the Name of the Law', year: 1949, director: 'Germi', cast: 'Massimo Girotti, Jone Salinas, Camillo Mastrocinque', blurb: 'A young judge against the Mafia in Sicily.' },
      { title: 'Without Pity', year: 1948, director: 'Lattuada', cast: 'Carla Del Poggio, John Kitzmiller, Pierre Claudé', blurb: 'A Black GI and an Italian woman in postwar Livorno.' },
      { title: 'To Live in Peace', year: 1947, director: 'Zampa', cast: 'Aldo Fabrizi, Gar Moore, Mirella Monti', blurb: 'A village hides two escaped POWs as the war ends.' },
      { title: 'Two Pennyworth of Hope', year: 1952, director: 'Castellani', cast: 'Maria Fiore, Vincenzo Musolino, Filomena Russo', blurb: 'Young love against poverty in the shadow of Vesuvius.' },
      { title: 'Banditi a Orgosolo', year: 1961, director: 'De Seta', cast: 'Michele Cossu, Peppeddu Cuccu, Vittorina Pisano', blurb: 'A Sardinian shepherd turned outlaw by suspicion.' },
      { title: 'Hands Over the City', year: 1963, director: 'Rosi', cast: 'Rod Steiger, Salvo Randone, Guido Alberti', blurb: 'A property speculator and a council inquiry; civic anger as thriller.' },
    ],
    appNote:
      'Open I Like Movies, add the films you have not seen to your watchlist, and mark the ones you have; the app keeps the collection sorted by what is left. A new themed collection lands in the Discover tab every Friday.',
    faqs: [
      {
        q: 'Where do I start with Italian neorealism?',
        a: [
          "Bicycle Thieves (1948): one father, one stolen bicycle, and the whole movement's method in ninety minutes. Rome, Open City and Umberto D. are the natural next two.",
        ],
      },
      {
        q: 'What makes a film neorealist?',
        a: [
          'Location shooting, non-professional actors, working-class subjects, and stories about survival in post-war Italy. The style faded by the late 1950s, but films like Il Posto (1961) and Hands Over the City (1963) carried its methods forward.',
        ],
      },
    ],
  },
];
