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
      { title: 'The Piano', year: 1993, director: 'Campion', cast: 'Holly Hunter, Harvey Keitel, Sam Neill', blurb: 'A mute Scottish bride arrives in colonial New Zealand with her daughter and her piano, and starts a dangerous bargain to win the instrument back, key by key.' },
      { title: 'The Power of the Dog', year: 2021, director: 'Campion', cast: 'Benedict Cumberbatch, Kodi Smit-McPhee, Kirsten Dunst', blurb: "On a 1920s Montana ranch, a brilliant, cruel cattleman wages psychological war on his brother's new wife and her gentle son, until the film reveals who is really hunting whom." },
      { title: 'Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles', year: 1975, director: 'Akerman', cast: 'Delphine Seyrig, Jan Decorte, Henri Storck', blurb: 'Three days in the life of a widowed mother, shown in near real time: cooking, errands, and quiet routine, filmed so precisely that the smallest crack in it lands like a thunderclap.' },
      { title: 'Vagabond', year: 1985, director: 'Varda', cast: 'Sandrine Bonnaire, Macha Méril, Yolande Moreau', blurb: 'A young woman is found frozen in a ditch in the south of France, and the film traces her last weeks on the road through the people who met her and mostly failed her.' },
      { title: 'We Need to Talk About Kevin', year: 2011, director: 'Ramsay', cast: 'Tilda Swinton, John C. Reilly, Ezra Miller', blurb: 'After her son commits a school massacre, a mother replays his childhood in fragments, asking whether he was born wrong or whether she failed to love him.' },
      { title: 'You Were Never Really Here', year: 2017, director: 'Ramsay', cast: 'Joaquin Phoenix, Judith Roberts, Ekaterina Samsonov', blurb: 'A traumatized veteran who rescues trafficked children with a hammer takes a job that goes wrong; a hitman thriller compressed into pure nerves and almost no violence shown on screen.' },
      { title: 'The Hurt Locker', year: 2008, director: 'Bigelow', cast: 'Jeremy Renner, Anthony Mackie, Brian Geraghty', blurb: 'An American bomb-disposal technician in Baghdad takes risks his teammates cannot understand, because defusing bombs is the only thing that makes him feel alive.' },
      { title: 'Zero Dark Thirty', year: 2012, director: 'Bigelow', cast: 'Jessica Chastain, Jason Clarke, Joel Edgerton', blurb: 'A young CIA analyst spends a decade obsessively tracking Osama bin Laden, through torture rooms, dead ends and bureaucracy, to a night-vision raid told with documentary cool.' },
      { title: 'Lost in Translation', year: 2003, director: 'Sofia Coppola', cast: 'Bill Murray, Scarlett Johansson, Giovanni Ribisi', blurb: 'A fading movie star and a newlywed young woman, both stranded in a Tokyo hotel, strike up a short friendship that hovers just short of romance.' },
      { title: 'Lady Bird', year: 2017, director: 'Gerwig', cast: 'Saoirse Ronan, Laurie Metcalf, Tracy Letts', blurb: 'A restless Catholic-school senior in Sacramento fights with her mother, tries on identities and dreams of escaping to New York; funny, specific and forgiving to everyone.' },
      { title: 'Beau Travail', year: 1999, director: 'Denis', cast: 'Denis Lavant, Michel Subor, Grégoire Colin', blurb: 'A French Foreign Legion sergeant in Djibouti is consumed by jealousy of a beautiful young recruit; military drills become choreography, and the final dance scene is legendary.' },
      { title: 'Toni Erdmann', year: 2016, director: 'Ade', cast: 'Sandra Hüller, Peter Simonischek, Michael Wittenborn', blurb: 'A retired prankster father, worried his corporate-consultant daughter has forgotten how to live, invades her Bucharest work life wearing false teeth and a wig; a nearly three-hour German comedy that earns it.' },
      { title: 'Fish Tank', year: 2009, director: 'Arnold', cast: 'Katie Jarvis, Michael Fassbender, Kierston Wareing', blurb: "A volatile fifteen-year-old on an Essex council estate dreams of dancing, then gets dangerously entangled with her mother's charming new boyfriend." },
      { title: 'Daughters of the Dust', year: 1991, director: 'Dash', cast: 'Cora Lee Day, Alva Rogers, Barbara O. Jones', blurb: 'In 1902, a Gullah family on a South Carolina sea island gathers before migrating north, weighing the old ways against the new; told in images that move like memory rather than plot.' },
      { title: 'Salaam Bombay!', year: 1988, director: 'Nair', cast: 'Shafiq Syed, Hansa Vithal, Chanda Sharma', blurb: "A boy abandoned by his family survives among Bombay's street children, tea stalls and brothels, played by real street kids the production trained." },
      { title: 'Wendy and Lucy', year: 2008, director: 'Reichardt', cast: 'Michelle Williams, Wally Dalton, Larry Fessenden', blurb: 'A young woman driving to Alaska for work is stranded in Oregon when her car dies and her dog disappears; a small, devastating film about being one setback from the edge.' },
      { title: 'Orlando', year: 1992, director: 'Potter', cast: 'Tilda Swinton, Billy Zane, Lothaire Bluteau', blurb: "Tilda Swinton plays a nobleman who lives four hundred years and wakes up one morning as a woman; Virginia Woolf's gender-hopping fantasy made playful and gorgeous." },
      { title: 'Seven Beauties', year: 1975, director: 'Wertmüller', cast: 'Giancarlo Giannini, Fernando Rey, Shirley Stoler', blurb: 'A preening Neapolitan small-timer survives the war and a concentration camp by selling off every scrap of his dignity; a comedy that turns pitch black.' },
      { title: "Boys Don't Cry", year: 1999, director: 'Peirce', cast: 'Hilary Swank, Chloë Sevigny, Peter Sarsgaard', blurb: 'The true story of Brandon Teena, a young trans man building a new life in small-town Nebraska, and the friends and lovers who embraced and then betrayed him.' },
      { title: 'La Ciénaga', year: 2001, director: 'Martel', cast: 'Mercedes Morán, Graciela Borges, Martín Adjemián', blurb: 'Two middle-class Argentine families drift through a sweltering summer of gin, minor injuries and a filthy swimming pool, while dread gathers like the humidity.' },
      { title: 'Selma', year: 2014, director: 'DuVernay', cast: 'David Oyelowo, Carmen Ejogo, Tom Wilkinson', blurb: 'Martin Luther King Jr. plans the 1965 Selma-to-Montgomery voting-rights marches, negotiating with presidents, rivals and his own exhausted movement scene by scene.' },
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
      { title: 'Manhunter', year: 1986, director: 'Mann', cast: 'William L. Petersen, Tom Noonan, Dennis Farina', blurb: 'An FBI profiler who catches serial killers by learning to think like them is pulled back for one last case, consulting the imprisoned Dr. Lecktor; the first Hannibal film, all neon and dread.' },
      { title: 'Henry: Portrait of a Serial Killer', year: 1986, director: 'McNaughton', cast: 'Michael Rooker, Tracy Arnold, Tom Towles', blurb: 'A drifter kills without pattern or remorse while his roommate tags along; shot flat and matter-of-fact, which is exactly what makes it the most disturbing film of its kind.' },
      { title: 'At Close Range', year: 1986, director: 'Foley', cast: 'Sean Penn, Christopher Walken, Mary Stuart Masterson', blurb: 'In rural Pennsylvania, a teenager falls under the spell of his estranged father, a charming career criminal who recruits his own sons and then turns on them; based on the Johnston gang murders.' },
      { title: "River's Edge", year: 1986, director: 'Hunter', cast: 'Crispin Glover, Keanu Reeves, Ione Skye', blurb: 'A high schooler strangles his girlfriend and shows friends the body; nobody calls the police. A portrait of teenage numbness drawn from a real 1981 California murder.' },
      { title: 'Sid and Nancy', year: 1986, director: 'Cox', cast: 'Gary Oldman, Chloe Webb, David Hayman', blurb: 'Sex Pistols bassist Sid Vicious and Nancy Spungen fall into a heroin-soaked love story that ends with her dead in the Chelsea Hotel and him charged with murder.' },
      { title: 'Mississippi Burning', year: 1988, director: 'Parker', cast: 'Gene Hackman, Willem Dafoe, Frances McDormand', blurb: 'Two mismatched FBI agents investigate the 1964 disappearance of three civil-rights workers in a Mississippi town where everyone knows and no one talks.' },
      { title: 'The Accused', year: 1988, director: 'Kaplan', cast: 'Jodie Foster, Kelly McGillis, Bernie Coulson', blurb: 'After a gang rape in a bar, a working-class woman insists on prosecuting not just the rapists but the men who cheered; Jodie Foster won her first Oscar for it.' },
      { title: 'To Live and Die in L.A.', year: 1985, director: 'Friedkin', cast: 'William L. Petersen, Willem Dafoe, John Pankow', blurb: 'A reckless Secret Service agent will break any law to take down the counterfeiter who killed his partner; sun-bleached eighties L.A., a wrong-way freeway chase, and no heroes.' },
      { title: 'Prince of the City', year: 1981, director: 'Lumet', cast: 'Treat Williams, Jerry Orbach, Richard Foronjy', blurb: 'A New York narcotics detective agrees to expose corruption and swears he will never give up his partners; three hours of moral quicksand as that promise collapses.' },
      { title: 'The Falcon and the Snowman', year: 1985, director: 'Schlesinger', cast: 'Timothy Hutton, Sean Penn, Pat Hingle', blurb: 'Two childhood friends from comfortable California suburbs, an idealist and a drug dealer, end up selling classified satellite secrets to the Soviets; a true story.' },
      { title: 'Salvador', year: 1986, director: 'Stone', cast: 'James Woods, Jim Belushi, Michael Murphy', blurb: "A burned-out American photojournalist talks his way into El Salvador's civil war looking for a paycheck and finds death squads, a massacre, and the limits of his own cynicism." },
      { title: 'Cry Freedom', year: 1987, director: 'Attenborough', cast: 'Kevin Kline, Denzel Washington, Penelope Wilton', blurb: 'A liberal South African editor befriends activist Steve Biko, and after Biko dies in police custody must smuggle his family out of the country to publish the truth.' },
      { title: 'Christiane F.', year: 1981, director: 'Edel', cast: 'Natja Brunckhorst, Thomas Haustein, Jens Kuphal', blurb: 'A thirteen-year-old girl in a bleak Berlin housing estate slides from discos into heroin addiction and prostitution around the Zoo station; based on her real taped testimony, with Bowie on the soundtrack.' },
      { title: 'The Killing Fields', year: 1984, director: 'Joffé', cast: 'Sam Waterston, Haing S. Ngor, John Malkovich', blurb: 'An American reporter and his Cambodian translator cover the Khmer Rouge takeover; when the Americans evacuate, the translator is left behind in the genocide.' },
      { title: 'Star 80', year: 1983, director: 'Fosse', cast: 'Mariel Hemingway, Eric Roberts, Cliff Robertson', blurb: "The short life of Playmate Dorothy Stratten and the controlling, small-time hustler husband who murdered her when she outgrew him; Bob Fosse's coldest, final film." },
      { title: 'Dance with a Stranger', year: 1985, director: 'Newell', cast: 'Miranda Richardson, Rupert Everett, Ian Holm', blurb: 'The affair between nightclub hostess Ruth Ellis and a careless upper-class racing driver, and the shooting that made her the last woman hanged in Britain.' },
      { title: 'Marianne and Juliane', year: 1981, director: 'von Trotta', cast: 'Jutta Lampe, Barbara Sukowa, Ina Robinski', blurb: "Two German sisters fight for change, one as a journalist, one as an imprisoned terrorist; West Germany's armed decade seen from inside one family." },
      { title: 'Pixote', year: 1981, director: 'Babenco', cast: 'Fernando Ramos da Silva, Jorge Julião, Gilberto Moura', blurb: "A ten-year-old drifts through Brazil's reformatories and streets into robbery and worse, played by a real street kid; one of the most harrowing films ever made about childhood." },
      { title: 'A Cry in the Dark', year: 1988, director: 'Schepisi', cast: 'Meryl Streep, Sam Neill, Bruce Myles', blurb: 'A dingo takes a baby from a campsite, and Australia decides the mother did it; Meryl Streep in a true story about how media and public opinion convict before courts do.' },
      { title: 'Buster', year: 1988, director: 'Green', cast: 'Phil Collins, Julie Walters, Larry Lamb', blurb: 'Small-time London crook Buster Edwards helps pull off the 1963 Great Train Robbery, then finds life on the run with his wife harder than the crime; Phil Collins plays the lead.' },
      { title: 'Prick Up Your Ears', year: 1987, director: 'Frears', cast: 'Gary Oldman, Alfred Molina, Vanessa Redgrave', blurb: 'The rise of playwright Joe Orton through 1960s London, and the lover and collaborator who, eclipsed and humiliated, finally murdered him.' },
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
      { title: 'Seven Samurai', year: 1954, director: 'Kurosawa', cast: 'Toshirō Mifune, Takashi Shimura, Yoshio Inaba', blurb: 'A poor village hires seven masterless samurai to defend it from bandits; three and a half hours of recruitment, preparation and battle that invented the team-up movie.' },
      { title: 'Rashomon', year: 1950, director: 'Kurosawa', cast: 'Toshirō Mifune, Machiko Kyō, Takashi Shimura', blurb: 'A samurai is dead in a forest; the bandit, the wife, a woodcutter and the dead man himself all tell contradictory versions. The film that made unreliable narration a structure.' },
      { title: 'Tokyo Story', year: 1953, director: 'Ozu', cast: 'Chishū Ryū, Chieko Higashiyama, Setsuko Hara', blurb: 'An elderly couple travel to Tokyo to visit their grown children, who are too busy for them; almost nothing happens, and it is regularly voted one of the greatest films ever made.' },
      { title: 'Late Spring', year: 1949, director: 'Ozu', cast: 'Chishū Ryū, Setsuko Hara, Yumeji Tsukioka', blurb: "A devoted daughter lives happily with her widowed father until everyone insists she must marry; Ozu's gentlest, saddest study of letting go." },
      { title: 'Ugetsu', year: 1953, director: 'Mizoguchi', cast: 'Machiko Kyō, Mitsuko Mito, Kinuyo Tanaka', blurb: 'In civil-war Japan, two potters chase profit and glory across the lines, and one is seduced by a ghost; a ghost story told with heartbreaking calm.' },
      { title: 'Sansho the Bailiff', year: 1954, director: 'Mizoguchi', cast: 'Kinuyo Tanaka, Yoshiaki Hanayagi, Kyōko Kagawa', blurb: "A governor's family is torn apart and sold, the children into slavery under a brutal bailiff; a medieval tale of endurance shaped into pure sorrow." },
      { title: 'Harakiri', year: 1962, director: 'Kobayashi', cast: 'Tatsuya Nakadai, Akira Ishihama, Shima Iwashita', blurb: "A ronin requests permission to commit ritual suicide in a clan's courtyard, then tells the story that explains why; a revenge tragedy that dismantles the samurai code piece by piece." },
      { title: 'Woman in the Dunes', year: 1964, director: 'Teshigahara', cast: 'Eiji Okada, Kyôko Kishida, Kōji Mitsui', blurb: 'An entomologist misses his bus and is trapped by villagers in a sandpit with a widow, shoveling sand to survive; an erotic, existential parable that feels like no other film.' },
      { title: 'Floating Clouds', year: 1955, director: 'Naruse', cast: 'Hideko Takamine, Masayuki Mori, Mariko Okada', blurb: "A woman and a married man who had an affair in wartime Indochina keep finding and failing each other in ruined postwar Tokyo; Naruse's bleak masterpiece of attachment." },
      { title: 'The Burmese Harp', year: 1956, director: 'Ichikawa', cast: 'Rentaro Mikuni, Shōji Yasui, Jun Hamamura', blurb: "After Japan's surrender, a soldier-musician stays behind in Burma, disguised as a monk, to bury the countless dead his army left; a war film about mourning rather than battle." },
      { title: 'In the Realm of the Senses', year: 1976, director: 'Oshima', cast: 'Eiko Matsuda, Tatsuya Fuji, Aoi Nakajima', blurb: 'The true 1936 case of Sada Abe: an affair between a maid and her employer spirals into total erotic obsession; explicit, notorious, and dead serious about where desire ends.' },
      { title: 'Spirited Away', year: 2001, director: 'Miyazaki', cast: 'Rumi Hiiragi, Miyu Irino, Mari Natsuki', blurb: "A ten-year-old girl must work in a bathhouse for gods and spirits to free her parents, who have been turned into pigs; Miyazaki's Oscar winner and the studio's most beloved film." },
      { title: 'Shoplifters', year: 2018, director: 'Kore-eda', cast: 'Lily Franky, Sakura Ando, Mayu Matsuoka', blurb: "A Tokyo family that survives on petty theft takes in a neglected little girl, and the film slowly reveals what actually binds them; a Palme d'Or winner about chosen family." },
      { title: 'Drive My Car', year: 2021, director: 'Hamaguchi', cast: 'Hidetoshi Nishijima, Toko Miura, Masaki Okada', blurb: "A widowed theater actor directing Uncle Vanya is assigned a quiet young chauffeur, and their long drives unspool grief, guilt and his wife's secrets; three hours that fly." },
      { title: 'Onibaba', year: 1964, director: 'Shindô', cast: 'Nobuko Otowa, Jitsuko Yoshimura, Kei Satō', blurb: 'In war-torn medieval Japan, a mother and daughter-in-law survive by killing stray samurai and selling their armor, until a demon mask enters the reeds; primal horror.' },
      { title: 'Branded to Kill', year: 1967, director: 'Suzuki', cast: 'Joe Shishido, Kōji Nanbara, Isao Tamagawa', blurb: "Japan's No. 3 hitman, aroused by the smell of boiling rice, botches a job and becomes the target of the mysterious No. 1; a yakuza thriller as deranged pop art. It got its director fired." },
      { title: 'Sonatine', year: 1993, director: 'Kitano', cast: 'Takeshi Kitano, Aya Kokumai, Tetsu Watanabe', blurb: "A weary Tokyo yakuza sent to Okinawa on a suspicious errand waits out a gang war on a beach, playing children's games between sudden bursts of violence; deadpan and fatalistic." },
      { title: 'Perfect Blue', year: 1997, director: 'Kon', cast: 'Junko Iwao, Rica Matsumoto, Shiho Niiyama', blurb: 'A pop idol quits music for acting and is stalked, as her sense of self splinters between roles, fans and a double; the anime psycho-thriller Aronofsky openly borrowed from.' },
      { title: 'Akira', year: 1988, director: 'Otomo', cast: 'Mitsuo Iwata, Nozomu Sasaki, Mami Koyama', blurb: 'In Neo-Tokyo, a biker gang member develops uncontrollable psychic powers while his friend tries to stop him and the state that made him; the film that broke anime worldwide.' },
      { title: 'Pigs and Battleships', year: 1961, director: 'Imamura', cast: 'Hiroyuki Nagato, Jitsuko Yoshimura, Masao Mishima', blurb: "Around a U.S. naval base in Yokosuka, small-time hoods run a pig-farming racket; Imamura's raucous, unsentimental portrait of Japan scavenging in America's shadow." },
      { title: 'Tampopo', year: 1985, director: 'Itami', cast: 'Tsutomu Yamazaki, Nobuko Miyamoto, Ken Watanabe', blurb: 'A truck driver helps a widow turn her failing noodle shop into the perfect ramen joint, in a comedy that keeps wandering off into sketches about food, sex and death; a self-declared ramen western.' },
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
      { title: 'Hoop Dreams', year: 1994, director: 'James', cast: 'William Gates, Arthur Agee, Gene Pingatore', blurb: 'Five years in the lives of two Black teenagers from Chicago recruited into a white suburban basketball powerhouse; about sport, class, race and family, and still the bar for longitudinal documentary.' },
      { title: 'The Act of Killing', year: 2012, director: 'Oppenheimer', cast: 'Anwar Congo, Herman Koto, Syamsul Arifin', blurb: "Aging leaders of Indonesia's 1965 death squads, still celebrated at home, happily re-enact their murders in the styles of their favorite Hollywood genres, until one of them begins to break." },
      { title: 'The Look of Silence', year: 2014, director: 'Oppenheimer', cast: 'Adi Rukun, M.Y. Basrun, Amir Hasan', blurb: "An optometrist whose brother was murdered in Indonesia's massacres fits the killers with glasses and quietly asks them to describe what they did; the companion to The Act of Killing." },
      { title: 'Sans Soleil', year: 1983, director: 'Marker', cast: 'Florence Delay, Amílcar Cabral, Arielle Dombasle', blurb: "A fictional cameraman's letters read over footage from Japan, Guinea-Bissau and San Francisco become an essay on memory, images and time; the peak of the essay film." },
      { title: 'Grey Gardens', year: 1975, director: 'Maysles', cast: 'Edith Bouvier Beale, Edith Ewing Bouvier Beale, Brooks Hyers', blurb: 'A reclusive mother and daughter, aunt and cousin of Jackie Onassis, bicker and perform for the camera in their decaying Long Island mansion; endlessly quotable and quietly tragic.' },
      { title: 'Salesman', year: 1968, director: 'Maysles', cast: 'Paul Brennan, Charles McDevitt, James Baker', blurb: 'Four door-to-door Bible salesmen work New England and Florida, and one of them slowly comes apart as the pitches stop landing; the Maysles brothers finding Death of a Salesman in real life.' },
      { title: 'Titicut Follies', year: 1967, director: 'Wiseman', blurb: 'Inside a Massachusetts hospital for the criminally insane: force-feedings, taunting guards, an annual talent show; suppressed by the state for decades.' },
      { title: 'High School', year: 1968, director: 'Wiseman', blurb: "Wiseman's camera sits in a Philadelphia high school's classrooms and offices, no narration, no interviews, and lets the institution reveal how it manufactures obedience." },
      { title: 'Shoah', year: 1985, director: 'Lanzmann', cast: 'Claude Lanzmann, Simon Srebnik, Michael Podchlebnik', blurb: 'Nine and a half hours of testimony about the Holocaust, from survivors, bystanders and perpetrators, with no archive footage at all; a monument built entirely from memory.' },
      { title: 'The Sorrow and the Pity', year: 1969, director: 'Ophüls', blurb: 'Four hours on one French town under the Occupation that demolished the myth that everyone resisted; interviews with collaborators, resisters and those in between.' },
      { title: 'The Thin Blue Line', year: 1988, director: 'Morris', cast: 'Randall Adams, David Harris, Gus Rose', blurb: 'A re-investigation of a Dallas cop killing, with stylized re-enactments and a Philip Glass score, that actually got an innocent man off death row.' },
      { title: 'F for Fake', year: 1973, director: 'Welles', cast: 'Orson Welles, Oja Kodar, Elmyr de Hory', blurb: 'Orson Welles spins the stories of an art forger and his fraudulent biographer into a playful essay about authorship and lies, and pulls one final trick on the audience.' },
      { title: 'Stop Making Sense', year: 1984, director: 'Demme', cast: 'David Byrne, Chris Frantz, Jerry Harrison', blurb: 'A Talking Heads concert that begins with David Byrne alone with a boombox and builds the band member by member, up to the giant suit; widely rated the best concert film ever staged.' },
      { title: 'Man with a Movie Camera', year: 1929, director: 'Vertov', cast: 'Mikhail Kaufman', blurb: 'A day in the Soviet city assembled from every technique the camera had in 1929: split screens, superimpositions, freeze frames; a silent film that still feels fast.' },
      { title: "Hearts of Darkness: A Filmmaker's Apocalypse", year: 1991, director: 'Bahr & Hickenlooper', cast: 'Francis Ford Coppola, Eleanor Coppola, John Milius', blurb: "The making of Apocalypse Now, from typhoons and a lead actor's heart attack to Coppola gambling his sanity and fortune; the definitive film about filmmaking as madness." },
      { title: 'Crumb', year: 1994, director: 'Zwigoff', cast: 'Robert Crumb, Aline Kominsky, Charles Crumb', blurb: 'A portrait of underground cartoonist Robert Crumb, his obsessions, and the brilliant, damaged brothers who never escaped the family he did; uncomfortable and unforgettable.' },
      { title: 'Faces Places', year: 2017, director: 'Varda & JR', cast: 'Agnès Varda, JR, Patricia Mercier', blurb: 'Agnès Varda, in her late eighties, road-trips through rural France with the young photographer JR, pasting giant portraits of the people they meet onto barns and trains.' },
      { title: 'Searching for Sugar Man', year: 2012, director: 'Bendjelloul', cast: 'Stephen Segerman, Rodriguez, Regan Rodriguez', blurb: 'Two South Africans hunt for the fate of Rodriguez, a forgotten Detroit singer who, unknown to himself, had become bigger than Elvis in apartheid-era South Africa.' },
      { title: "Don't Look Back", year: 1967, director: 'Pennebaker', cast: 'Bob Dylan, Albert Grossman, Bob Neuwirth', blurb: "Bob Dylan's 1965 tour of England, caught backstage being brilliant and cruel in equal measure, opening with the famous cue-card scene for Subterranean Homesick Blues." },
      { title: 'Capturing the Friedmans', year: 2003, director: 'Jarecki', cast: 'Arnold Friedman, Elaine Friedman, David Friedman', blurb: 'A Long Island family films its own disintegration as the father and youngest son face child-abuse charges; the home videos leave you genuinely unsure what happened.' },
      { title: 'Hearts and Minds', year: 1974, director: 'Davis', cast: 'Clark Clifford, John Foster Dulles, Georges Bidault', blurb: 'The Vietnam War argued through the words of the generals, politicians and soldiers who ran it, cut against what the cameras actually saw; it won the Oscar and caused a scandal.' },
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
      { title: 'Do the Right Thing', year: 1989, director: 'Spike Lee', cast: 'Danny Aiello, Ossie Davis, Ruby Dee', blurb: "On the hottest day of the summer, tensions on one Brooklyn block between an Italian-American pizzeria and its Black neighborhood build hour by hour toward explosion; Spike Lee's masterpiece." },
      { title: 'Apocalypse Now', year: 1979, director: 'Coppola', cast: 'Martin Sheen, Marlon Brando, Frederic Forrest', blurb: 'An army captain is sent up a Vietnamese river to assassinate a decorated colonel who has gone insane and built his own kingdom in the jungle; war film as fever dream.' },
      { title: 'Dog Day Afternoon', year: 1975, director: 'Lumet', cast: 'Al Pacino, John Cazale, Charles Durning', blurb: 'A Brooklyn bank robbery goes wrong in the first five minutes and becomes a sweltering all-day hostage standoff and media circus; Pacino at his most desperate and human, from a true story.' },
      { title: 'Chinatown', year: 1974, director: 'Polanski', cast: 'Jack Nicholson, Faye Dunaway, John Huston', blurb: "A 1930s Los Angeles private eye takes a routine adultery job and uncovers a conspiracy over the city's water, and something far worse; the most perfect screenplay ever taught." },
      { title: 'Body Heat', year: 1981, director: 'Kasdan', cast: 'William Hurt, Kathleen Turner, Richard Crenna', blurb: 'During a Florida heatwave, a not-too-bright lawyer falls for a married woman who wants her husband gone; sweat-soaked neo-noir where you can guess the trap and still enjoy it closing.' },
      { title: 'Lawrence of Arabia', year: 1962, director: 'Lean', cast: "Peter O'Toole, Alec Guinness, Omar Sharif", blurb: 'T.E. Lawrence unites Arab tribes against the Ottomans and loses himself in the role; the desert epic whose 70mm vistas made the sun itself the antagonist.' },
      { title: 'The Wages of Fear', year: 1953, director: 'Clouzot', cast: 'Yves Montand, Charles Vanel, Peter van Eyck', blurb: 'Four desperate men stranded in a South American oil town take a job driving trucks of nitroglycerin over mountain roads; two hours of the purest suspense ever filmed.' },
      { title: 'In the Heat of the Night', year: 1967, director: 'Jewison', cast: 'Sidney Poitier, Rod Steiger, Warren Oates', blurb: 'A Black Philadelphia homicide detective passing through a Mississippi town gets arrested for a murder, then has to solve it alongside the racist police chief.' },
      { title: 'La piscine', year: 1969, director: 'Deray', cast: 'Alain Delon, Romy Schneider, Maurice Ronet', blurb: 'Two lovers idle by a Riviera pool until her old flame arrives with his teenage daughter; envy and desire warm slowly toward murder. Delon and Romy Schneider at their most beautiful.' },
      { title: 'Y tu mamá también', year: 2001, director: 'Cuarón', cast: 'Maribel Verdú, Gael García Bernal, Diego Luna', blurb: 'Two teenage boys and an unhappily married older woman road-trip to a possibly imaginary beach, while the narrator quietly notes the Mexico passing outside; sexy and then suddenly devastating.' },
      { title: 'Burning', year: 2018, director: 'Lee Chang-dong', cast: 'Yoo Ah-in, Steven Yeun, Jeon Jong-seo', blurb: 'A delivery-job drifter reconnects with a childhood friend, who then vanishes after introducing her rich, bored new boyfriend, a man who claims he burns greenhouses; slow Korean menace with an ambiguous core.' },
      { title: 'A Bigger Splash', year: 2015, director: 'Guadagnino', cast: 'Tilda Swinton, Matthias Schoenaerts, Ralph Fiennes', blurb: 'A rock star resting her voice on a Sicilian island has her retreat invaded by an exuberant old flame and his newly discovered daughter; sun, jealousy and one body in the pool.' },
      { title: 'The Talented Mr. Ripley', year: 1999, director: 'Minghella', cast: 'Matt Damon, Gwyneth Paltrow, Jude Law', blurb: 'Sent to Italy to retrieve a playboy heir, a poor young man decides to become him instead, killing his way into the borrowed life; gorgeous and increasingly suffocating.' },
      { title: 'Spring Breakers', year: 2012, director: 'Korine', cast: 'James Franco, Selena Gomez, Vanessa Hudgens', blurb: 'Four college girls rob a diner to fund a Florida spring break, get bailed out of jail by a cornrowed gangster-rapper, and slide into armed robbery; a neon fever dream, not the comedy it looks like.' },
      { title: 'Wake in Fright', year: 1971, director: 'Kotcheff', cast: 'Donald Pleasence, Gary Bond, Chips Rafferty', blurb: 'A schoolteacher stranded in an outback mining town is destroyed by beer, gambling and relentless male hospitality over one lost weekend; horror without a single monster.' },
      { title: 'The Swimmer', year: 1968, director: 'Perry', cast: 'Burt Lancaster, Janet Landgard, Janice Rule', blurb: "A tanned suburban man decides to swim home across the county through his neighbors' pools, and with each pool his confident story about his life falls further apart." },
      { title: 'Sexy Beast', year: 2000, director: 'Glazer', cast: 'Ray Winstone, Ben Kingsley, Ian McShane', blurb: 'A safecracker retired to sun-drunk Spain is visited by Don Logan, the most terrifying man in British film, who will not take no to one last job; Kingsley plays him like a coiled snake.' },
      { title: 'Stranger by the Lake', year: 2013, director: 'Guiraudie', cast: "Pierre Deladonchamps, Christophe Paou, Patrick d'Assumçao", blurb: 'At a lakeside cruising spot, a man witnesses a drowning that was no accident, and keeps returning to the killer anyway; desire and danger with no music and no way out.' },
      { title: "L'Avventura", year: 1960, director: 'Antonioni', cast: 'Monica Vitti, Gabriele Ferzetti, Lea Massari', blurb: 'A woman vanishes during a yacht trip to a barren island; her lover and best friend search, then drift into an affair and slowly stop looking. The scandal of Cannes 1960, now a cornerstone.' },
      { title: 'Stromboli', year: 1950, director: 'Rossellini', cast: 'Ingrid Bergman, Mario Vitale, Renzo Cesana', blurb: 'A Lithuanian refugee marries an Italian fisherman to escape a camp and finds herself trapped on his brutal volcanic island; Rossellini and Ingrid Bergman, ending on an ambiguous miracle.' },
      { title: 'Killer of Sheep', year: 1978, director: 'Burnett', cast: 'Henry G. Sanders, Kaycee Moore, Charles Bracy', blurb: 'A slaughterhouse worker in 1970s Watts drifts through insomnia, family and small neighborhood moments; shot for nothing on weekends, now preserved as an American classic.' },
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
      { title: 'The Tree of Life', year: 2011, director: 'Malick', cast: 'Brad Pitt, Jessica Chastain, Hunter McCracken', blurb: "A Texas boyhood in the 1950s, a stern father and a grace-filled mother, framed inside nothing less than the creation of the universe; Malick's most ambitious film, Palme d'Or winner." },
      { title: 'Days of Heaven', year: 1978, director: 'Malick', cast: 'Richard Gere, Brooke Adams, Sam Shepard', blurb: 'Two lovers posing as siblings work the Texas wheat harvest, and she marries the dying farmer for his money; a simple tragedy shot almost entirely at magic hour.' },
      { title: 'First Cow', year: 2019, director: 'Reichardt', cast: 'John Magaro, Orion Lee, Toby Jones', blurb: "In 1820s Oregon, a gentle cook and a Chinese immigrant build a business on biscuits made with milk stolen nightly from the territory's only cow; a friendship story where the suspense is tenderness." },
      { title: 'Embrace of the Serpent', year: 2015, director: 'Guerra', cast: 'Nilbio Torres, Antonio Bolívar, Jan Bijvoet', blurb: "An Amazonian shaman, last of his people, guides two Western explorers decades apart in search of a sacred plant; shot in black and white from the forest's point of view." },
      { title: 'Aguirre, the Wrath of God', year: 1972, director: 'Herzog', cast: 'Klaus Kinski, Helena Rojo, Del Negro', blurb: 'A conquistador expedition rafts down the Amazon in search of El Dorado while its mad lieutenant seizes command; Herzog, Kinski, real jungle, real madness.' },
      { title: 'Fitzcarraldo', year: 1982, director: 'Herzog', cast: 'Klaus Kinski, Claudia Cardinale, José Lewgoy', blurb: 'An opera-obsessed dreamer schemes to build an opera house in the Amazon, which requires hauling a full-size steamship over a mountain; Herzog actually did it, with no effects.' },
      { title: 'Walkabout', year: 1971, director: 'Roeg', cast: 'Jenny Agutter, Luc Roeg, David Gulpilil', blurb: 'Abandoned in the Australian outback, two city children survive only because a young Aboriginal man on his ritual walkabout guides them; beautiful, strange and quietly tragic.' },
      { title: 'Picnic at Hanging Rock', year: 1975, director: 'Weir', cast: 'Rachel Roberts, Vivean Gray, Helen Morse', blurb: "On Valentine's Day 1900, Australian schoolgirls climb a volcanic rock formation and three never come back; a mystery that refuses solution and lingers like a dream." },
      { title: 'The Revenant', year: 2015, director: 'Iñárritu', cast: 'Leonardo DiCaprio, Tom Hardy, Domhnall Gleeson', blurb: 'Mauled by a bear and left for dead by his fur-trapping party, a frontiersman crawls through the winter wilderness for revenge; brutal survival shot in real cold and natural light.' },
      { title: 'Into the Wild', year: 2007, director: 'Penn', cast: 'Emile Hirsch, Marcia Gay Harden, William Hurt', blurb: 'A gifted graduate donates his savings, cuts off his family and hitchhikes to Alaska to live off the land; the true story of Christopher McCandless, generous to both his dream and its cost.' },
      { title: 'Dersu Uzala', year: 1975, director: 'Kurosawa', cast: 'Yuriy Solomin, Maksim Munzuk, Mikhail Bychkov', blurb: "A Russian survey team in the Siberian taiga is saved repeatedly by Dersu, an aging Goldi hunter who reads the wilderness like text; Kurosawa's ode to a vanishing way of living." },
      { title: 'Princess Mononoke', year: 1997, director: 'Miyazaki', cast: 'Yoji Matsuda, Yuriko Ishida, Yuko Tanaka', blurb: "A cursed prince lands between an iron-making town of outcasts and the wolf-raised girl defending the forest gods it is destroying; Miyazaki's epic where every side has its reasons." },
      { title: 'Spring, Summer, Fall, Winter… and Spring', year: 2003, director: 'Kim Ki-duk', cast: 'Oh Young-soo, Kim Ki-duk, Kim Young-min', blurb: 'On a monastery floating on a mountain lake, a boy grows into a man, sins, and returns, across five seasons; Buddhist parable as landscape painting.' },
      { title: 'Honeyland', year: 2019, director: 'Stefanov & Kotevska', cast: 'Hatidzhe Muratova, Nazife Muratova, Hussein Sam', blurb: 'The last wild beekeeper in the Macedonian mountains lives by one rule, take half, leave half, until a chaotic family moves in next door and breaks it; a documentary with the shape of a fable.' },
      { title: 'Close to Eden / Urga', year: 1991, director: 'Mikhalkov', cast: 'Badema, Bayaertu, Vladimir Gostyukhin', blurb: 'A Mongolian herdsman living the old steppe life befriends a stranded Russian truck driver, then rides to town for condoms and comes back changed; warm, funny and elegiac.' },
      { title: 'Tulpan', year: 2008, director: 'Dvortsevoy', cast: 'Askhat Kuchencherekov, Samal Yeslyamova, Tulepbergen Baisakalov', blurb: 'A young sailor returns to the Kazakh steppe dreaming of a yurt, a flock and a wife, but the only eligible girl rejects his ears; deadpan comedy amid real dust storms and lambing.' },
      { title: 'The Story of the Weeping Camel', year: 2003, director: 'Davaa & Falorni', cast: 'Janchiv Ayurzana, Chimed Ohin, Amgaabazar Gonson', blurb: "A Gobi desert family's camel rejects her newborn calf, so they send for a musician whose ritual might move her to accept it; a documentary of astonishing patience." },
      { title: 'Microcosmos', year: 1996, director: 'Nuridsany & Pérennou', cast: 'Jacques Perrin', blurb: "Insects in a French meadow filmed at their own scale, where a rainstorm is a catastrophe and a dung beetle's stuck load is an epic; no narration needed." },
      { title: 'Free Solo', year: 2018, director: 'Chin & Vasarhelyi', cast: 'Alex Honnold, Tommy Caldwell, Jimmy Chin', blurb: "Alex Honnold prepares to climb El Capitan's 900-meter face alone and without a rope, while his girlfriend and the filmmakers weigh what it means to point cameras at it; palms sweat, guaranteed." },
      { title: "Meek's Cutoff", year: 2010, director: 'Reichardt', cast: 'Michelle Williams, Bruce Greenwood, Will Patton', blurb: 'An 1845 wagon party lost on the Oregon high desert runs low on water and trust in the guide who led them there, then captures a Cayuse man who may or may not be leading them to it.' },
      { title: 'The Bear', year: 1988, director: 'Annaud', cast: 'Tchéky Karyo, Bart the Bear, Douce the Bear', blurb: "An orphaned bear cub attaches itself to a huge wounded male while hunters track them through the Alps; told almost wordlessly from the animals' side." },
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
      { title: 'Breathless', year: 1960, director: 'Godard', cast: 'Jean-Paul Belmondo, Jean Seberg, Daniel Boulanger', blurb: 'A small-time car thief who models himself on Bogart hides out with an American student in Paris after shooting a policeman; the jump-cut manifesto that announced the New Wave.' },
      { title: 'Pierrot le Fou', year: 1965, director: 'Godard', cast: 'Jean-Paul Belmondo, Anna Karina, Graziella Galvani', blurb: 'A bored husband runs off with the babysitter, who happens to be tangled with gunrunners, into a primary-colored crime spree south; Godard at his most romantic and unhinged.' },
      { title: 'Jules and Jim', year: 1962, director: 'Truffaut', cast: 'Jeanne Moreau, Oskar Werner, Henri Serre', blurb: "Two best friends love the same mercurial woman across twenty years and a world war; the New Wave's most famous love triangle, joyous until it is not." },
      { title: 'Shoot the Piano Player', year: 1960, director: 'Truffaut', cast: 'Charles Aznavour, Marie Dubois, Nicole Berger', blurb: 'A once-famous concert pianist hides as a honky-tonk player in a Paris bar until his brothers drag him back into gangster trouble; noir, comedy and heartbreak shuffled together.' },
      { title: 'Cléo from 5 to 7', year: 1962, director: 'Varda', cast: 'Corinne Marchand, Antoine Bourseiller, Dominique Davray', blurb: 'A pampered pop singer waits two hours for biopsy results, drifting through Paris as her fear strips away her vanity; told in near real time.' },
      { title: 'Le Bonheur', year: 1965, director: 'Varda', cast: 'Jean-Claude Drouot, Claire Drouot, Olivier Drouot', blurb: 'A carpenter loves his wife, loves his children, and then also loves a postmistress, and sees no problem; sunlit, scored to Mozart, and one of the most quietly merciless films ever made.' },
      { title: 'Last Year at Marienbad', year: 1961, director: 'Resnais', cast: 'Delphine Seyrig, Giorgio Albertazzi, Sacha Pitoëff', blurb: 'In a vast baroque hotel, a man insists to a woman that they met and loved last year; she denies it; the film takes both sides. A gorgeous puzzle with no bottom.' },
      { title: 'Hiroshima mon amour', year: 1959, director: 'Resnais', cast: 'Emmanuelle Riva, Eiji Okada, Stella Dassas', blurb: 'A French actress and a Japanese architect spend a night in Hiroshima trading memories of war, hers of a shaved head in Nevers, his of the bomb; Resnais fused love story and documentary.' },
      { title: 'The Umbrellas of Cherbourg', year: 1964, director: 'Demy', cast: 'Catherine Deneuve, Nino Castelnuovo, Anne Vernon', blurb: "A garage mechanic and a shop girl are separated by the Algerian war; every single line is sung, the colors are candy, and the ending is one of cinema's great heartbreaks." },
      { title: 'The Young Girls of Rochefort', year: 1967, director: 'Demy', cast: 'Catherine Deneuve, Françoise Dorléac, Jacques Perrin', blurb: "Twin sisters dream of Paris while a fair sets up in their pastel port town; one weekend of musical numbers and near-missed connections, Demy's sunniest film." },
      { title: 'Au Hasard Balthazar', year: 1966, director: 'Bresson', cast: 'Anne Wiazemsky, Walter Green, François Lafarge', blurb: "The life of a donkey, passed from owner to owner, kind and cruel, in parallel with the girl who first loved him; Bresson's austere style makes it shattering." },
      { title: 'Belle de Jour', year: 1967, director: 'Buñuel', cast: 'Catherine Deneuve, Jean Sorel, Michel Piccoli', blurb: "A frigid, respectable doctor's wife secretly spends her afternoons working in a Paris brothel; Buñuel folds fantasy and reality together until neither label holds." },
      { title: "My Night at Maud's", year: 1969, director: 'Rohmer', cast: 'Jean-Louis Trintignant, Françoise Fabian, Marie-Christine Barrault', blurb: 'A cautious Catholic engineer, resolved to marry a blonde stranger he has seen at mass, is snowed in overnight with the brilliant, freethinking Maud; nothing but talk, completely gripping.' },
      { title: 'Playtime', year: 1967, director: 'Tati', cast: 'Jacques Tati, Barbara Dennek, Rita Maiden', blurb: "Tati's Monsieur Hulot and a group of American tourists wander a glass-and-steel Paris built full-scale for the film; sight gags staged across every corner of the frame. It bankrupted him." },
      { title: 'Mouchette', year: 1967, director: 'Bresson', cast: 'Nadine Nortier, Jean-Claude Guilbert, Marie Cardinal', blurb: 'A poor rural teenager, bullied at school and burdened at home, moves through a short chain of small cruelties; Bresson at his most stern, with an ending that stops the breath.' },
      { title: 'Z', year: 1969, director: 'Costa-Gavras', cast: 'Yves Montand, Irene Papas, Jean-Louis Trintignant', blurb: 'After a leftist politician is assassinated at a rally, a stubborn magistrate follows the evidence into the military government itself; a political thriller that plays like a race.' },
      { title: 'Les Bonnes Femmes', year: 1960, director: 'Chabrol', cast: 'Bernadette Lafont, Clotilde Joano, Stéphane Audran', blurb: "Four Paris shopgirls dream past their dead-end days toward romance; Chabrol watches the city's predators circle with cold clarity." },
      { title: 'Les Biches', year: 1968, director: 'Chabrol', cast: 'Stéphane Audran, Jacqueline Sassard, Jean-Louis Trintignant', blurb: "A wealthy woman picks up a young street artist, takes her to St. Tropez, and the games of desire and possession slowly tighten; the film that opened Chabrol's great period." },
      { title: 'Le Feu Follet', year: 1963, director: 'Malle', cast: 'Maurice Ronet, Léna Skerla, Yvonne Clech', blurb: 'A recovering alcoholic checks out of his clinic and spends two days visiting old friends in Paris, deciding whether any of it is reason enough to stay alive; lucid and devastating.' },
      { title: 'The Suitor', year: 1962, director: 'Étaix', cast: 'France Arnel, Laurence Lignières, Claude Massot', blurb: "Ordered by his parents to find a wife, a sheltered young man studies romance like an engineering problem; near-silent physical comedy from Tati's true heir." },
      { title: 'A Man and a Woman', year: 1966, director: 'Lelouch', cast: 'Anouk Aimée, Jean-Louis Trintignant, Pierre Barouh', blurb: "A widowed script girl and a widowed race-car driver meet at their children's boarding school and circle toward love; the theme tune conquered the world, the Palme d'Or followed." },
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
      { title: 'Back to the Future', year: 1985, director: 'Zemeckis', cast: 'Michael J. Fox, Christopher Lloyd, Crispin Glover', blurb: "A teenager accidentally drives a plutonium-powered DeLorean back to 1955, derails his parents' first meeting, and must make his mother fall for his father instead of him; the perfect script." },
      { title: 'The Terminator', year: 1984, director: 'Cameron', cast: 'Arnold Schwarzenegger, Michael Biehn, Linda Hamilton', blurb: 'An unstoppable cyborg is sent back from a machine-ruled future to kill the woman whose unborn son will lead the human resistance; lean, relentless, and still scary.' },
      { title: 'Terminator 2: Judgment Day', year: 1991, director: 'Cameron', cast: 'Arnold Schwarzenegger, Linda Hamilton, Edward Furlong', blurb: "The killer machine from the first film returns reprogrammed as a boy's protector, hunted by a shape-shifting upgrade; the rare sequel that outgrew its original." },
      { title: '12 Monkeys', year: 1995, director: 'Gilliam', cast: 'Bruce Willis, Madeleine Stowe, Brad Pitt', blurb: 'A convict from a plague-ruined future is sent back to trace the outbreak, but keeps landing in the wrong year and doubting his own mind; built around one childhood memory at an airport.' },
      { title: 'Primer', year: 2004, director: 'Carruth', cast: 'Shane Carruth, David Sullivan, Casey Gooden', blurb: 'Two engineers discover time travel inside a garage startup and immediately begin using it against each other; famously made for around seven thousand dollars, and famously demanding a second viewing.' },
      { title: 'Donnie Darko', year: 2001, director: 'Kelly', cast: 'Jake Gyllenhaal, Jena Malone, James Duval', blurb: 'A sleepwalking suburban teenager survives a freak accident and starts receiving instructions from a man in a rabbit suit counting down to the end of the world; a cult object of endless interpretation.' },
      { title: 'Looper', year: 2012, director: 'Johnson', cast: 'Joseph Gordon-Levitt, Bruce Willis, Emily Blunt', blurb: 'In a future where the mob disposes of bodies by sending them thirty years back to contracted killers, one looper fails to kill his own older self; a tight thriller that plays fair with its rules.' },
      { title: 'Edge of Tomorrow', year: 2014, director: 'Liman', cast: 'Tom Cruise, Emily Blunt, Brendan Gleeson', blurb: 'A PR officer with no combat training dies on an alien-war beach and wakes up the previous morning, again and again, leveling up each loop; the video-game structure done right.' },
      { title: 'Groundhog Day', year: 1993, director: 'Ramis', cast: 'Bill Murray, Andie MacDowell, Chris Elliott', blurb: 'A contemptuous weatherman gets stuck living the same small-town February 2nd forever, cycling through despair, hedonism and, eventually, decency; the loop film every other one cites.' },
      { title: 'Interstellar', year: 2014, director: 'Nolan', cast: 'Matthew McConaughey, Anne Hathaway, Michael Caine', blurb: "As blight strangles Earth, a pilot leaves his daughter behind to search for a new home through a wormhole, where hours cost decades; Nolan's biggest swing at heart and physics at once." },
      { title: 'Source Code', year: 2011, director: 'Jones', cast: 'Jake Gyllenhaal, Michelle Monaghan, Vera Farmiga', blurb: "A soldier wakes in another man's body aboard a commuter train that explodes in eight minutes, and is sent back into those eight minutes until he finds the bomber." },
      { title: 'About Time', year: 2013, director: 'Curtis', cast: 'Domhnall Gleeson, Rachel McAdams, Bill Nighy', blurb: 'The men in one family can revisit their own past; the hero uses it first to find love, then learns what the gift is actually for; a romcom that turns into a father-son tearjerker.' },
      { title: 'Midnight in Paris', year: 2011, director: 'Allen', cast: 'Owen Wilson, Rachel McAdams, Kathy Bates', blurb: 'A nostalgic screenwriter on holiday finds that at midnight a vintage car carries him to the Paris of Hemingway and Fitzgerald; a charming argument about golden-age thinking.' },
      { title: 'Time Bandits', year: 1981, director: 'Gilliam', cast: 'Craig Warnock, David Rappaport, Kenny Baker', blurb: "A boy joins six dwarves who have stolen a map of time's holes, looting their way past Napoleon, Agamemnon and Evil itself; Gilliam's anarchic children's film that adults keep." },
      { title: 'Your Name', year: 2016, director: 'Shinkai', cast: 'Ryunosuke Kamiki, Mone Kamishiraishi, Ryo Narita', blurb: "A Tokyo boy and a small-town girl wake up in each other's bodies, build a life across the swaps, then discover the distance between them is stranger than geography; a phenomenon in Japan." },
      { title: 'The Girl Who Leapt Through Time', year: 2006, director: 'Hosoda', cast: 'Riisa Naka, Takuya Ishida, Mitsutaka Itakura', blurb: 'A schoolgirl gains the power to leap back through her day and spends it dodging embarrassments, until the counter on her arm runs low; small stakes, real feeling.' },
      { title: 'Timecrimes', year: 2007, director: 'Vigalondo', cast: 'Karra Elejalde, Candela Fernández, Bárbara Goenaga', blurb: 'A man watching a woman through binoculars stumbles into a machine that sends him one hour back, and must manage three overlapping versions of himself; a Spanish loop wound watch-tight.' },
      { title: 'Hi, Mom', year: 2021, director: 'Jia Ling', cast: 'Jia Ling, Zhang Xiaofei, Shen Teng', blurb: "Grieving her mother's sudden death, a woman falls back to 1981 and befriends her as a young co-worker, scheming to give her a better life; a Chinese box-office phenomenon that earns its tears." },
      { title: 'Predestination', year: 2014, director: 'Spierig', cast: 'Ethan Hawke, Sarah Snook, Noah Taylor', blurb: "A temporal agent's last assignment, told through a stranger's life story in a bar, folds in on itself until every role is accounted for; the tightest paradox plot ever filmed." },
      { title: 'Time After Time', year: 1979, director: 'Meyer', cast: 'Malcolm McDowell, David Warner, Mary Steenburgen', blurb: 'H.G. Wells builds a working time machine, Jack the Ripper steals it, and Wells chases him into 1979 San Francisco, where a bank clerk mistakes the Victorian for a charming eccentric.' },
      { title: 'Tenet', year: 2020, director: 'Nolan', cast: 'John David Washington, Robert Pattinson, Elizabeth Debicki', blurb: 'A CIA operative learns some objects and people move backwards through time and follows them into a cold-war plot around inverted entropy; Nolan at maximum, best not decoded on first watch.' },
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
      { title: 'Roma', year: 2018, director: 'Cuarón', cast: 'Yalitza Aparicio, Marina de Tavira, Diego Cortina Autrey', blurb: 'A year in the life of a middle-class Mexico City family and Cleo, the indigenous live-in nanny who holds it together; Cuarón rebuilt his childhood street and shot it himself in black and white.' },
      { title: 'Amarcord', year: 1973, director: 'Fellini', cast: 'Pupella Maggio, Armando Brancia, Magali Noël', blurb: 'A year in a 1930s Adriatic town under fascism, remembered as carnival: the town beauty, the fog, the peacock in the snow; Fellini turning his boyhood into myth.' },
      { title: '8½', year: 1963, director: 'Fellini', cast: 'Marcello Mastroianni, Claudia Cardinale, Anouk Aimée', blurb: 'A famous director hides in a spa town, besieged by producers, wives and mistresses, unable to start his next film; the definitive movie about creative block, made while Fellini had it.' },
      { title: 'The 400 Blows', year: 1959, director: 'Truffaut', cast: 'Jean-Pierre Léaud, Claire Maurier, Albert Rémy', blurb: "A neglected Paris twelve-year-old skips school, steals a typewriter and lands in a reform institution; Truffaut's own childhood, ending on cinema's most famous freeze frame." },
      { title: 'Mirror', year: 1975, director: 'Tarkovsky', cast: 'Margarita Terekhova, Ignat Daniltsev, Larisa Tarkovskaya', blurb: "A dying poet's memories, his mother, wartime evacuation, newsreels and dreams flow together without plot; Tarkovsky's most personal film, structured like remembering actually feels." },
      { title: 'Wild Strawberries', year: 1957, director: 'Bergman', cast: 'Victor Sjöström, Bibi Andersson, Ingrid Thulin', blurb: "An elderly professor drives across Sweden to receive an honorary degree, revisiting in dreams and memories the coldness that shaped his life; Bergman's warmest masterpiece." },
      { title: 'All That Jazz', year: 1979, director: 'Fosse', cast: 'Roy Scheider, Jessica Lange, Ann Reinking', blurb: 'A pill-driven director-choreographer juggles a Broadway show, a film edit, women and heart disease, staging his own decline as a musical; Fosse made it about himself and then it came true.' },
      { title: 'Cinema Paradiso', year: 1988, director: 'Tornatore', cast: 'Philippe Noiret, Jacques Perrin, Marco Leonardi', blurb: 'A famous director remembers the Sicilian village cinema where the projectionist became his second father; the love letter to moviegoing itself, censored kisses and all.' },
      { title: 'Annie Hall', year: 1977, director: 'Allen', cast: 'Diane Keaton, Woody Allen, Tony Roberts', blurb: 'A neurotic New York comedian autopsies his failed relationship with an aspiring singer, breaking the fourth wall, timeline and format to figure out where it went; the romcom template since.' },
      { title: 'Pain and Glory', year: 2019, director: 'Almodóvar', cast: 'Antonio Banderas, Asier Etxeandia, Leonardo Sbaraglia', blurb: 'An ailing film director in Madrid, unable to work, drifts into memories of his childhood and a reunion with an old lover; Banderas plays a barely veiled Almodóvar.' },
      { title: 'The Hand of God', year: 2021, director: 'Sorrentino', cast: 'Filippo Scotti, Toni Servillo, Teresa Saponangelo', blurb: "A Naples teenager in the 1980s lives for Maradona's arrival, until a family tragedy, the one the title refers to, knocks his life onto the path of filmmaking; Sorrentino's own story." },
      { title: 'Belfast', year: 2021, director: 'Branagh', cast: 'Jude Hill, Jamie Dornan, Caitríona Balfe', blurb: "A nine-year-old's Belfast street becomes a barricaded front line of the Troubles while his family debates leaving; Branagh's childhood in black and white, buoyed by Van Morrison." },
      { title: 'The Fabelmans', year: 2022, director: 'Spielberg', cast: 'Michelle Williams, Paul Dano, Seth Rogen', blurb: "A boy falls in love with making movies and then, editing home footage, discovers his mother's secret; Spielberg finally filming the family story under all his others." },
      { title: 'Persepolis', year: 2007, director: 'Satrapi & Paronnaud', cast: 'Chiara Mastroianni, Danielle Darrieux, Catherine Deneuve', blurb: "A outspoken girl grows up through the Iranian revolution and war, is sent alone to Europe, and returns a stranger; Marjane Satrapi's graphic memoir animated in stark ink." },
      { title: 'Distant Voices, Still Lives', year: 1988, director: 'Davies', cast: 'Freda Dowie, Pete Postlethwaite, Angela Walsh', blurb: 'A working-class Liverpool family in the 1940s and 50s, ruled by a violent father, remembered as a album of pub singalongs, weddings and bruises; memory arranged by song rather than dates.' },
      { title: 'A Time to Live and a Time to Die', year: 1985, director: 'Hou Hsiao-hsien', cast: 'Yu An-shun, Tien Feng, Mei Fang', blurb: "A family displaced from mainland China raises its children in small-town Taiwan, the grandmother still trying to walk home; Hou's autobiographical masterpiece of drift between generations." },
      { title: 'The Spirit of the Beehive', year: 1973, director: 'Erice', cast: 'Ana Torrent, Fernando Fernán Gómez, Teresa Gimpera', blurb: "In a silent village after Spain's civil war, a small girl sees Frankenstein at a traveling cinema and goes looking for the spirit; childhood wonder as quiet resistance to Franco's Spain." },
      { title: 'The Beaches of Agnès', year: 2008, director: 'Varda', cast: 'Agnès Varda, André Lubrano, Blaise Fournier', blurb: 'At eighty, Agnès Varda walks back through her own life with mirrors on beaches, reconstructed sets and old friends; a self-portrait as playful as anything she ever made.' },
      { title: 'The Souvenir', year: 2019, director: 'Hogg', cast: 'Honor Swinton Byrne, Tom Burke, Tilda Swinton', blurb: 'A sheltered film student in 1980s London falls into a consuming relationship with a cultured older man concealing an addiction; Joanna Hogg restaging her own youth with unnerving honesty.' },
      { title: 'Aftersun', year: 2022, director: 'Wells', cast: 'Paul Mescal, Frankie Corio, Brooklyn Toulson', blurb: 'A woman replays a childhood package holiday in Turkey with her young, loving, quietly drowning father, searching the camcorder footage for what she missed; devastating by stealth.' },
      { title: 'The Diving Bell and the Butterfly', year: 2007, director: 'Schnabel', cast: 'Mathieu Amalric, Emmanuelle Seigner, Marie-Josée Croze', blurb: 'Elle editor Jean-Dominique Bauby, paralyzed by a stroke at forty-three, dictates a memoir letter by letter with his one working eyelid; filmed largely from inside his gaze.' },
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
      { title: 'Closely Watched Trains', year: 1966, director: 'Menzel', cast: 'Václav Neckář, Jitka Scoffin, Vladimír Valenta', blurb: 'A shy apprentice at a sleepy Czech station during the Occupation is preoccupied with losing his virginity until history hands him a package; comic, tender, then quietly devastating. It won the Oscar.' },
      { title: 'Loves of a Blonde', year: 1965, director: 'Forman', cast: 'Hana Brejchová, Vladimír Pucholt, Vladimír Menšík', blurb: "A girl from a factory town of women falls for a visiting pianist and shows up at his family's Prague flat; Forman's bittersweet comedy of small hopes and awkward parents." },
      { title: 'Daisies', year: 1966, director: 'Chytilová', cast: 'Jitka Cerhová, Ivana Karbanová, Helena Anýžová', blurb: 'Two young women named Marie decide the world is spoiled and set about spoiling themselves, wrecking dinners, suitors and a state banquet; anarchic collage cinema the regime banned.' },
      { title: 'The Shop on Main Street', year: 1965, director: 'Kadár & Klos', cast: 'Ida Kamińska, Jozef Kroner, František Zvarík', blurb: "In wartime Slovakia, an easygoing carpenter is made 'aryan controller' of an old deaf Jewish widow's button shop, and she thinks he is her assistant; comedy curdles into tragedy. An Oscar winner." },
      { title: 'Ashes and Diamonds', year: 1958, director: 'Wajda', cast: 'Zbigniew Cybulski, Ewa Krzyżewska, Wacław Zastrzeżynski', blurb: 'On the last day of the war, a young Polish resistance fighter is ordered to assassinate a communist official, and hesitates for one night of doubt and love.' },
      { title: 'Knife in the Water', year: 1962, director: 'Polanski', cast: 'Leon Niemczyk, Jolanta Umecka, Zygmunt Malanowicz', blurb: "A quarreling couple pick up a young hitchhiker and take him sailing overnight; three people, one yacht, one knife. Polanski's debut and still a masterclass in tension." },
      { title: 'A Short Film About Killing', year: 1988, director: 'Kieślowski', cast: 'Mirosław Baka, Krzysztof Globisz, Jan Tesarz', blurb: 'A drifting young man murders a taxi driver without reason; the state then kills him with procedure; both acts filmed with the same unbearable attention. It helped end the Polish death penalty.' },
      { title: 'The Round-Up', year: 1966, director: 'Jancsó', cast: 'Zoltán Latinovits, János Görbe, Tibor Molnár', blurb: 'After a crushed uprising, Hungarian authorities herd suspects into a plains stockade and break them with informers, promises and geometry; oppression rendered as choreography.' },
      { title: 'Mephisto', year: 1981, director: 'Szabó', cast: 'Klaus Maria Brandauer, Krystyna Janda, Ildikó Bánsági', blurb: 'A brilliant German actor keeps rationalizing each accommodation with the Nazi state as his career soars, until he belongs to them entirely; an Oscar winner about the price of the spotlight.' },
      { title: 'Sátántangó', year: 1994, director: 'Tarr', cast: 'Mihály Víg, Putyi Horváth, Székely B. Miklós', blurb: 'A collective farm rots in rain and mud until a charismatic man they thought dead returns with a plan; seven hours of long takes that admirers describe as hypnosis rather than duration.' },
      { title: 'Andrei Rublev', year: 1966, director: 'Tarkovsky', cast: 'Anatoliy Solonitsyn, Ivan Lapikov, Mykola Hrynko', blurb: "Russia's greatest icon painter wanders a medieval landscape of raids, plagues and cruelty, losing his faith in art until a boy casting a giant bell restores it; shelved for years by Soviet censors." },
      { title: 'Come and See', year: 1985, director: 'Klimov', cast: 'Aleksei Kravchenko, Olga Mironova, Liubomiras Laucevičius', blurb: 'A Belarusian village boy joins the partisans and witnesses, at closer and closer range, what the German army did to his country; often called the most harrowing war film ever made.' },
      { title: 'The Cranes Are Flying', year: 1957, director: 'Kalatozov', cast: 'Tatyana Samoylova, Aleksey Batalov, Vasili Merkuryev', blurb: "A Moscow couple is torn apart by the war, he to the front, she into a disastrous marriage; the swooping camerawork electrified world cinema and won the Palme d'Or." },
      { title: 'The Color of Pomegranates', year: 1969, director: 'Parajanov', cast: 'Spartak Bagashvili, Sofiko Chiaureli, Medea Japaridze', blurb: 'The life of an Armenian poet told not as story but as living icons: tableaux of books, wool, pomegranates and blood; banned, recut, and like nothing else ever filmed.' },
      { title: 'The Forest of the Hanged', year: 1965, director: 'Ciulei', cast: 'Victor Rebengiuc, Anna Széles, Ștefan Ciubotărașu', blurb: 'A Romanian officer in the Austro-Hungarian army, ordered to fight his own people, walks toward a crisis of conscience under the gallows of the title; the great Romanian film of its era.' },
      { title: 'Silent Wedding', year: 2008, director: 'Mălăele', cast: 'Meda Andreea Victor, Alexandru Potocean, Valentin Teodosiu', blurb: "A Romanian village throws a wedding the night Stalin's death is announced and all celebration is forbidden, so the party continues in total silence; comic until the tanks arrive." },
      { title: 'The Tied Up Balloon', year: 1967, director: 'Zhelyazkova', cast: 'Grigor Vachkov, Georgi Kaloyanchev, Georgi Partsalev', blurb: 'A huge stray balloon drifts over a Bulgarian village and the peasants chase, worship and fight it; an absurdist parable the regime understood perfectly, and banned.' },
      { title: 'Iconostasis', year: 1969, director: 'Hristov', blurb: "A master icon carver in Ottoman-era Bulgaria is torn between sacred tradition and his own hands' ambition; a meditation on art and faith drawn from a classic novel." },
      { title: 'Time of the Gypsies', year: 1988, director: 'Kusturica', cast: 'Davor Dujmović, Borivoje Todorović, Ljubica Adžović', blurb: "A Romani boy with telekinetic gifts leaves his grandmother's village with a gangster who trades in children, dreaming of returning rich; Kusturica's sprawling, magical tragedy." },
      { title: 'W.R.: Mysteries of the Organism', year: 1971, director: 'Makavejev', cast: 'Milena Dravić, Ivica Vidović, Jagoda Kaloper', blurb: 'A collage on psychoanalyst Wilhelm Reich, sexual liberation and state socialism, spliced with a Yugoslav love story that ends in decapitation; banned at home for sixteen years.' },
      { title: "The Firemen's Ball", year: 1967, director: 'Forman', cast: 'Jan Vostrčil, Josef Šebánek, František Debelka', blurb: "A small-town fire brigade's annual ball collapses in real time: the raffle prizes are stolen, the beauty contest revolts, a house burns down; the satire that got Forman exiled after 1968." },
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
      { title: 'Bend It Like Beckham', year: 2002, director: 'Chadha', cast: 'Parminder Nagra, Keira Knightley, Jonathan Rhys Meyers', blurb: "A London Sikh teenager secretly joins a women's football team against her parents' plans for her; the crowd-pleaser that launched Keira Knightley and a thousand girls' teams." },
      { title: 'Looking for Eric', year: 2009, director: 'Loach', cast: 'Steve Evets, Éric Cantona, Stephanie Bishop', blurb: "A depressed Manchester postman starts receiving life coaching from an imaginary Eric Cantona, playing himself and quoting his own aphorisms; Loach's warmest film." },
      { title: 'Offside', year: 2006, director: 'Panahi', cast: 'Sima Mobarak-Shahi, Shayesteh Irani, Ayda Sadeqi', blurb: 'Iranian women disguise themselves as boys to sneak into a World Cup qualifier and are penned by young soldiers just outside the stadium; shot guerrilla-style at the real match.' },
      { title: 'Escape to Victory', year: 1981, director: 'Huston', cast: 'Sylvester Stallone, Michael Caine, Max von Sydow', blurb: "Allied POWs agree to play a Nazi propaganda football match in occupied Paris, planning to escape at halftime; Caine, Stallone in goal, and Pelé's overhead kick. Preposterous and beloved." },
      { title: 'The Damned United', year: 2009, director: 'Hooper', cast: 'Michael Sheen, Timothy Spall, Colm Meaney', blurb: "The true story of Brian Clough's 44 days managing Leeds United, the champion team he had spent years publicly despising; a sports film about ego, rivalry and one broken friendship." },
      { title: 'Diego Maradona', year: 2019, director: 'Kapadia', cast: 'Diego Maradona, Pelé, Dalma Maradona', blurb: "Assembled from 500 hours of archive: Maradona's years at Napoli, from god to scapegoat, as the city, the Camorra and his own appetites close in." },
      { title: 'The Miracle of Bern', year: 2003, director: 'Wortmann', cast: 'Louis Klamroth, Peter Lohmeyer, Johanna Gastdorf', blurb: "A boy's POW father returns broken from a Soviet camp as West Germany improbably marches to the 1954 World Cup final; the tournament that let a country feel something again." },
      { title: 'Shaolin Soccer', year: 2001, director: 'Chow', cast: 'Stephen Chow, Richard Ng Man-Tat, Zhao Wei', blurb: 'A down-and-out kung fu devotee recruits his former Shaolin brothers to apply their superhuman skills to football; cartoon physics, flying bicycle kicks, pure joy.' },
      { title: 'The Two Escobars', year: 2010, director: 'Zimbalist', cast: 'Andrés Escobar, Pablo Escobar, María Ester Escobar', blurb: "Pablo Escobar's cartel money built Colombian football's golden generation; captain Andrés Escobar's own-goal at the 1994 World Cup got him murdered. One country, two Escobars, one documentary." },
      { title: 'Raging Bull', year: 1980, director: 'Scorsese', cast: 'Robert De Niro, Cathy Moriarty, Joe Pesci', blurb: "Boxer Jake LaMotta batters his way to the middleweight title while destroying his brother, his marriage and himself; Scorsese and De Niro's black-and-white masterpiece about rage with nowhere to go." },
      { title: 'Rocky', year: 1976, director: 'Avildsen', cast: 'Sylvester Stallone, Talia Shire, Burt Young', blurb: 'A Philadelphia club fighter and debt collector gets a freak title shot against the champion and asks only to go the distance; the underdog original, written by its unknown star.' },
      { title: 'When We Were Kings', year: 1996, director: 'Gast', cast: 'Muhammad Ali, George Foreman, Don King', blurb: 'The 1974 Rumble in the Jungle: Ali, huge underdog against Foreman in Zaire, the rope-a-dope, and the music festival around it; twenty years in the editing, an Oscar at the end.' },
      { title: 'Senna', year: 2010, director: 'Kapadia', cast: 'Ayrton Senna, Alain Prost, Frank Williams', blurb: "Ayrton Senna's decade in Formula 1, his war with Prost and with the sport's politics, cut entirely from race footage and home video into something like Greek tragedy." },
      { title: 'Rush', year: 2013, director: 'Howard', cast: 'Chris Hemsworth, Daniel Brühl, Olivia Wilde', blurb: 'Playboy James Hunt and calculating Niki Lauda push their 1976 title fight to the edge, through the crash that burned Lauda and the comeback 42 days later; the rare racing film that honors both men.' },
      { title: 'The Wrestler', year: 2008, director: 'Aronofsky', cast: 'Mickey Rourke, Marisa Tomei, Evan Rachel Wood', blurb: 'A broken-down 1980s wrestling star, living in a trailer and working deli counters, gets one more shot at the spotlight that ruined him; Mickey Rourke playing painfully close to home.' },
      { title: 'Moneyball', year: 2011, director: 'Miller', cast: 'Brad Pitt, Jonah Hill, Philip Seymour Hoffman', blurb: "The cash-poor Oakland A's ditch scouts' instincts for an economist's spreadsheet and change baseball forever; a sports movie where the action is arguments in offices, and it works." },
      { title: 'Hoosiers', year: 1986, director: 'Anspaugh', cast: 'Gene Hackman, Barbara Hershey, Dennis Hopper', blurb: 'A disgraced coach and the town drunk lead a tiny Indiana high school to the state basketball final; the small-town sports myth, played straight and earned.' },
      { title: 'I, Tonya', year: 2017, director: 'Gillespie', cast: 'Margot Robbie, Sebastian Stan, Allison Janney', blurb: "Figure skater Tonya Harding's life from abusive childhood to the Nancy Kerrigan attack, told through contradictory to-camera interviews that keep correcting each other." },
      { title: 'Borg vs. McEnroe', year: 2017, director: 'Metz', cast: 'Sverrir Gudnason, Shia LaBeouf, Stellan Skarsgård', blurb: 'The ice-cold Swede chasing a fifth straight Wimbledon and the combustible New Yorker who cannot lose meet in the 1980 final; a portrait of two kinds of pressure.' },
      { title: 'Lagaan', year: 2001, director: 'Gowariker', cast: 'Aamir Khan, Gracy Singh, Rachel Shelley', blurb: "Drought-struck Indian villagers accept a British officer's wager: beat his men at cricket, a game they have never played, and pay no tax for three years; a four-hour musical epic that flies by." },
      { title: 'Million Dollar Baby', year: 2004, director: 'Eastwood', cast: 'Clint Eastwood, Hilary Swank, Morgan Freeman', blurb: "A waitress in her thirties talks a crusty trainer into taking her on and rises fast through women's boxing, until the story becomes something else entirely; bring reserves." },
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
      { title: 'Pride', year: 2014, director: 'Warchus', cast: 'George MacKay, Ben Schnetzer, Freddie Fox', blurb: 'In 1984, London gay and lesbian activists raise money for striking Welsh miners, who are not sure they want it; a true story that builds to unions marching at Pride, and earns every tear.' },
      { title: 'Orpheus', year: 1950, director: 'Cocteau', cast: 'Jean Marais, François Périer, María Casares', blurb: "The Orpheus myth in postwar Paris: a famous poet follows a princess who is Death through mirrors into the underworld; Cocteau's poetry with radio cars and rubber gloves." },
      { title: 'Portrait of a Lady on Fire', year: 2019, director: 'Sciamma', cast: 'Noémie Merlant, Adèle Haenel, Luàna Bajrami', blurb: 'On a Brittany island, a painter is hired to secretly portray a woman promised into marriage, and the watching becomes mutual; a love story built entirely on the exchanged gaze.' },
      { title: 'Brokeback Mountain', year: 2005, director: 'Lee', cast: 'Heath Ledger, Jake Gyllenhaal, Michelle Williams', blurb: 'Two young ranch hands fall into a love neither can name during a summer herding sheep, then spend twenty years meeting in stolen weeks while their marriages pay the price.' },
      { title: 'Carol', year: 2015, director: 'Haynes', cast: 'Cate Blanchett, Rooney Mara, Kyle Chandler', blurb: "In 1952 New York, a young shop clerk and an elegant suburban wife begin a affair that the wife's divorce lawyers will use against her; longing conducted through glances and gloves." },
      { title: 'Moonlight', year: 2016, director: 'Jenkins', cast: 'Trevante Rhodes, André Holland, Janelle Monáe', blurb: 'A poor Black kid in Miami grows up in three chapters, child, teenager, hardened adult, shaped by a crack-addicted mother, an unlikely mentor and one boy on a beach; Best Picture winner.' },
      { title: 'Call Me by Your Name', year: 2017, director: 'Guadagnino', cast: 'Timothée Chalamet, Armie Hammer, Michael Stuhlbarg', blurb: "In a sun-drunk Italian summer, a seventeen-year-old falls for the American graduate student staying at his family's villa; ends on one of the great father speeches and a long-held closeup." },
      { title: 'My Own Private Idaho', year: 1991, director: 'Van Sant', cast: 'River Phoenix, Keanu Reeves, James Russo', blurb: "A narcoleptic street hustler searching for his mother drifts through Portland and Rome with the mayor's slumming son, in a road movie spliced with Shakespeare's Henry IV; River Phoenix's defining role." },
      { title: 'Milk', year: 2008, director: 'Van Sant', cast: 'Sean Penn, Emile Hirsch, Josh Brolin', blurb: 'Harvey Milk moves to San Francisco, builds a movement out of Castro Street, becomes the first openly gay elected official in California, and is assassinated by a fellow supervisor.' },
      { title: 'Paris Is Burning', year: 1990, director: 'Livingston', cast: 'Pepper LaBeija, Octavia St. Laurent, Venus Xtravaganza', blurb: "Harlem's Black and Latino ballroom scene of the late 1980s: the houses, the categories, the invented families, and the dreams of members the era would not let live long." },
      { title: 'Happy Together', year: 1997, director: 'Wong Kar-wai', cast: 'Leslie Cheung, Tony Leung Chiu-wai, Chang Chen', blurb: "Two men from Hong Kong strand themselves in Buenos Aires, breaking up and starting over in cycles neither can escape; Wong Kar-wai's most bruising film about being far from home." },
      { title: 'The Handmaiden', year: 2016, director: 'Park Chan-wook', cast: 'Kim Min-hee, Kim Tae-ri, Ha Jung-woo', blurb: 'A pickpocket is planted as handmaiden to a Japanese heiress to help a conman steal her fortune, but the women have plans of their own; a triple-crossing gothic told three times over.' },
      { title: 'Maurice', year: 1987, director: 'Ivory', cast: 'James Wilby, Hugh Grant, Rupert Graves', blurb: 'Two Cambridge men fall in love in Edwardian England, where it is a crime; one chooses respectability, the other risks everything; Forster kept the novel unpublished in his lifetime for its happy ending.' },
      { title: 'A Single Man', year: 2009, director: 'Ford', cast: 'Colin Firth, Julianne Moore, Nicholas Hoult', blurb: "On the day he has decided will be his last, a grieving English professor in 1962 Los Angeles moves through his routine noticing everything; Colin Firth's finest hour." },
      { title: 'The Birdcage', year: 1996, director: 'Nichols', cast: 'Robin Williams, Gene Hackman, Nathan Lane', blurb: "A gay Miami club owner and his drag-star partner play straight for one dinner because their son is marrying a senator's daughter; farce machinery in perfect working order." },
      { title: 'Fox and His Friends', year: 1975, director: 'Fassbinder', cast: 'Rainer Werner Fassbinder, Peter Chatel, Karlheinz Böhm', blurb: "A working-class carnival performer wins the lottery and is politely, systematically devoured by his elegant new boyfriend's circle; Fassbinder cast himself as the victim." },
      { title: 'Sebastiane', year: 1976, director: 'Jarman', cast: 'Leonardo Treviglio, Barney James, Neil Kennedy', blurb: "Roman soldiers at a desert outpost turn on the devout Sebastian, whose martyrdom becomes indistinguishable from desire; dialogue entirely in Latin, Jarman's radical debut." },
      { title: 'Death in Venice', year: 1971, director: 'Visconti', cast: 'Dirk Bogarde, Björn Andrésen, Romolo Valli', blurb: "An ailing composer at a Lido hotel becomes fixated on a beautiful Polish boy as cholera spreads through Venice; Mahler on the soundtrack, dye running down a dying man's face." },
      { title: 'The Way He Looks', year: 2014, director: 'Ribeiro', cast: 'Ghilherme Lobo, Fábio Audi, Tess Amorim', blurb: 'A blind Brazilian teenager chafing against his overprotective mother falls for the new boy at school; a first-love story of unusual gentleness.' },
      { title: 'Tomboy', year: 2011, director: 'Sciamma', cast: 'Zoé Héran, Malonn Lévana, Jeanne Disson', blurb: 'New to the neighborhood, a ten-year-old spends the summer as Mikael, until school looms and the adults intervene; small, precise and ahead of its moment.' },
      { title: 'All About My Mother', year: 1999, director: 'Almodóvar', cast: 'Cecilia Roth, Marisa Paredes, Candela Peña', blurb: "After her son is killed, a Madrid nurse returns to Barcelona among actresses, trans sex workers and pregnant nuns to find his father; Almodóvar's Oscar-winning melodrama of chosen family." },
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
      { title: 'Children of Men', year: 2006, director: 'Cuarón', cast: 'Clive Owen, Clare-Hope Ashitey, Chiwetel Ejiofor', blurb: 'In 2027, no child has been born for eighteen years; a burnt-out bureaucrat must smuggle a miraculously pregnant refugee to the coast. Its single-take car ambush and street battle rewrote action cinema.' },
      { title: 'Rope', year: 1948, director: 'Hitchcock', cast: 'James Stewart, John Dall, Farley Granger', blurb: 'Two students murder a classmate to prove their superiority, hide the body in a chest, and host a dinner party on top of it; Hitchcock staged it as one continuous take with hidden cuts.' },
      { title: 'Russian Ark', year: 2002, director: 'Sokurov', cast: 'Sergey Dreyden, Mariya Kuznetsova, Leonid Mozgovoy', blurb: 'An invisible narrator drifts through the Hermitage and three hundred years of Russian history, ending in a vast czarist ball; one real 96-minute Steadicam take, two thousand costumed extras, no cuts.' },
      { title: '1917', year: 2019, director: 'Mendes', cast: 'George MacKay, Dean-Charles Chapman, Mark Strong', blurb: "Two British soldiers cross No Man's Land with an order that will stop 1,600 men walking into a trap; staged and stitched to play as a single unbroken shot." },
      { title: 'Birdman', year: 2014, director: 'Iñárritu', cast: 'Michael Keaton, Emma Stone, Zach Galifianakis', blurb: 'A washed-up superhero actor stakes everything on a Broadway play while his ego literally talks back; edited to appear as one continuous backstage take. It won Best Picture.' },
      { title: 'Touch of Evil', year: 1958, director: 'Welles', cast: 'Charlton Heston, Janet Leigh, Orson Welles', blurb: 'A Mexican narcotics agent honeymooning on the border collides with a corrupt American cop over a car bombing; opens with the crane shot every film school studies.' },
      { title: 'Goodfellas', year: 1990, director: 'Scorsese', cast: 'Robert De Niro, Ray Liotta, Joe Pesci', blurb: 'Thirty years inside the New York mob, narrated by the man who loved every minute until it ate him; the Copacabana entrance, one take through the kitchen, is the whole seduction in miniature.' },
      { title: 'The Player', year: 1992, director: 'Altman', cast: 'Tim Robbins, Greta Scacchi, Fred Ward', blurb: 'A studio executive being blackmailed by a rejected writer kills the wrong man and keeps rising; opens with an eight-minute take that name-checks famous long takes while performing one.' },
      { title: 'Boogie Nights', year: 1997, director: 'P.T. Anderson', cast: 'Mark Wahlberg, Burt Reynolds, Julianne Moore', blurb: "A San Fernando Valley dishwasher becomes a porn star in the industry's 1970s golden age, then the eighties arrive; enters its world through one glorious poolside tracking shot." },
      { title: 'Magnolia', year: 1999, director: 'P.T. Anderson', cast: 'Tom Cruise, Philip Baker Hall, Philip Seymour Hoffman', blurb: 'Nine lives across one San Fernando Valley day, dying fathers, quiz kids, a misogynist guru, spiral toward coincidence and a biblical downpour; three hours at full emotional volume.' },
      { title: 'Atonement', year: 2007, director: 'Joe Wright', cast: 'James McAvoy, Keira Knightley, Saoirse Ronan', blurb: "A child's lie about what she saw destroys two lovers on the eve of war; its five-minute Steadicam crawl along the Dunkirk beach is among the most famous single shots ever attempted." },
      { title: 'Police, Adjective', year: 2009, director: 'Porumboiu', cast: 'Dragoș Bucur, Vlad Ivanov, Ion Stoica', blurb: 'A young Romanian cop tails a teenager sharing hash and stalls on conscience, until his chief opens a dictionary and defines his duty at him; deadpan, patient, quietly furious.' },
      { title: 'The Sacrifice', year: 1986, director: 'Tarkovsky', cast: 'Erland Josephson, Susan Fleetwood, Allan Edwall', blurb: "As nuclear war breaks over the radio, a retired intellectual offers God everything he has, including his home and his silence, to undo it; Tarkovsky's final film, with a six-minute burning-house take." },
      { title: 'Oldboy', year: 2003, director: 'Park Chan-wook', cast: 'Choi Min-sik, Yoo Ji-tae, Kang Hye-jung', blurb: 'Imprisoned in a private cell for fifteen years without explanation, then released, a man gets five days to find out why; the one-take corridor hammer fight is its signature, the ending its scar.' },
      { title: 'Elephant', year: 2003, director: 'Van Sant', cast: 'Alex Frost, Eric Deulen, John Robinson', blurb: "An ordinary high-school day tracked in long gliding hallway shots, the same minutes crossing from student to student, drifting toward a shooting; Van Sant's Palme d'Or winner after Columbine." },
      { title: 'Hard Boiled', year: 1992, director: 'Woo', cast: 'Chow Yun-Fat, Tony Leung Chiu-wai, Anthony Wong', blurb: "A tea-house shootout introduces a cop who loses his partner and goes into a gun-runners' hospital fortress; contains a legendary minutes-long single-take battle across two floors." },
      { title: 'Werckmeister Harmonies', year: 2000, director: 'Tarr', cast: 'Lars Rudolph, Peter Fitz, Hanna Schygulla', blurb: 'A circus truck hauls a whale carcass into a frozen Hungarian town and unrest follows; thirty-nine long takes of eerie, gathering menace, with an asylum raid that empties the soul.' },
      { title: 'The Passenger', year: 1975, director: 'Antonioni', cast: 'Jack Nicholson, Maria Schneider, Jenny Runacre', blurb: "A worn-out reporter in the Sahara swaps identities with a dead arms dealer and inherits the man's appointments; ends on a seven-minute shot through a window grate that critics still argue about." },
      { title: 'Weekend', year: 1967, director: 'Godard', cast: 'Mireille Darc, Jean Yanne, Jean-Pierre Kalfon', blurb: 'A scheming bourgeois couple drive into a countryside collapsing into apocalypse and cannibal revolutionaries; built around an eight-minute tracking shot along one endless traffic jam.' },
      { title: 'Le Trou', year: 1960, director: 'Becker', cast: 'Michel Constantin, Jean Keraudy, Philippe Leroy', blurb: 'Four Paris cellmates cut, dig and crawl toward escape with a new arrival they are not sure they can trust; the digging happens in unbroken real-time takes that make you hold your breath.' },
      { title: 'Victoria', year: 2015, director: 'Schipper', cast: 'Laia Costa, Frederick Lau, Franz Rogowski', blurb: 'A Spanish woman in Berlin falls in with four charming strangers whose favor for a gangster becomes a bank robbery; one real 138-minute take across twenty-two locations, no hidden cuts.' },
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
      { title: 'Atlantics', year: 2019, director: 'Mati Diop', cast: 'Mame Bineta Sane, Amadou Mbow, Ibrahima Traore', blurb: 'In Dakar, construction workers unpaid for months set out to sea for Spain; the women they left behind begin speaking with voices that are not theirs. A ghost story and a love story at once.' },
      { title: 'Black Girl', year: 1966, director: 'Sembène', cast: 'Mbissine Thérèse Diop, Anne-Marie Jelinek, Robert Fontaine', blurb: 'A young Senegalese woman hired by a French couple as a nanny finds herself their maid and their trophy on the Riviera; the film that announced African cinema to the world.' },
      { title: 'Xala', year: 1975, director: 'Sembène', cast: 'Thierno Leye, Myriam Niang, Seune Samb', blurb: "A Dakar businessman celebrating his third marriage is struck impotent by a curse; Sembène's satire of a postcolonial elite that has changed the flags but kept the masters' manners." },
      { title: 'Touki Bouki', year: 1973, director: 'Mambéty', cast: 'Magaye Niang, Myriam Niang, Christoph Colomb', blurb: 'A cowherd with a longhorn-mounted motorcycle and a student girlfriend scheme and dream their way toward a boat to Paris; the avant-garde road movie of African cinema.' },
      { title: 'Hyenas', year: 1992, director: 'Mambéty', cast: 'Djibril Diop Mambéty, Mansour Diouf, Ami Diakhate', blurb: 'A fabulously rich woman returns to the poor town that once cast her out pregnant, offering fortunes for the death of the man who betrayed her; a parable of what money does to community.' },
      { title: 'Yeelen', year: 1987, director: 'Cissé', cast: 'Issiaka Kane, Balla Moussa Keita, Aoua Sangare', blurb: 'A young man carrying dangerous knowledge flees across ancient Mali pursued by his own sorcerer father; Bambara cosmology told with the weight of myth.' },
      { title: 'Timbuktu', year: 2014, director: 'Sissako', cast: 'Ibrahim Ahmed, Toulou Kiki, Layla Walet Mohamed', blurb: "Under jihadist occupation, Timbuktu's residents negotiate absurd bans on music and football until a cattle herder's accident collides with the new law; grief delivered with unexpected grace." },
      { title: 'Bamako', year: 2006, director: 'Sissako', cast: 'Aïssa Maïga, Tiécoura Traoré, Maimouna Hélène Diarra', blurb: 'In a Bamako courtyard, a full trial is staged with real lawyers: African civil society versus the World Bank and IMF, while ordinary life flows around the hearing.' },
      { title: 'Tilai', year: 1990, director: 'Ouedraogo', cast: 'Rasmané Ouédraogo, Ina Cissé, Roukietou Barry', blurb: "Returning from a long absence, a man finds his father has married the woman promised to him; their forbidden love breaks the village's moral law and the family with it." },
      { title: 'A Screaming Man', year: 2010, director: 'Haroun', cast: "Youssouf Djaoro, Diouc Koma, Emile Abossolo M'bo", blurb: 'A hotel pool attendant in Chad, demoted in favor of his son, makes a quiet, terrible choice as civil war closes in; a father-son tragedy in a country running out of room.' },
      { title: 'Lingui', year: 2021, director: 'Haroun', cast: 'Achouackh Abakar Souleymane, Rihane Khalil Alio, Youssouf Djaoro', blurb: 'In Chad, where abortion is a crime and a sin, a single mother discovers her fifteen-year-old is pregnant and refuses to accept the ruin prescribed for her; a story of female solidarity.' },
      { title: 'Chronicle of the Years of Fire', year: 1975, director: 'Lakhdar-Hamina', cast: 'Yorgo Voyagis, Leila Shenna, Mohammed Lakhdar-Hamina', blurb: "Algeria's long road to revolution followed through one peasant's life, from famine and dispossession to armed uprising; the only African film ever to win the Palme d'Or." },
      { title: 'Tsotsi', year: 2005, director: 'Hood', cast: 'Presley Chweneyagae, Jerry Mofokeng, Terry Pheto', blurb: 'A Johannesburg gang leader carjacks a woman and discovers a baby on the back seat; keeping it cracks him open; an Oscar winner for best foreign film.' },
      { title: 'Cairo Station', year: 1958, director: 'Chahine', cast: 'Farid Shawqy, Hind Rostom, Youssef Chahine', blurb: "A lame newspaper seller at Cairo's central station nurses an obsession with a beautiful lemonade vendor that tips into violence; Chahine cast himself in Egyptian cinema's boldest film." },
      { title: 'Buud Yam', year: 1997, director: 'Kaboré', cast: 'Serge Yanogo, Amssatou Maïga, Colette Kaboré', blurb: "In precolonial Burkina Faso, a young man distrusted by his village must journey through strange lands to find a healer for his dying sister; a quest tale and the country's best-loved classic." },
      { title: 'Ali Zaoua', year: 2000, director: 'Ayouch', cast: 'Mounïm Kbab, Abdelhak Zhayra, Hicham Moussoune', blurb: "When gang violence kills the smallest of them, three Casablanca street kids resolve to bury their friend like a prince; brutal reality shot through with children's mythology." },
      { title: 'Faya Dayi', year: 2021, director: 'Beshir', cast: 'Mohammed Arif, Hashim Abdi, Biniam Yonas', blurb: 'In the Ethiopian highlands, where the khat trade has swallowed the economy and the young chew to escape, a documentary drifts between harvests and dreams in hypnotic black and white.' },
      { title: 'Difret', year: 2014, director: 'Mehari', cast: 'Meron Getnet, Tizita Hagere, Haregewine Assefa', blurb: 'A young Ethiopian lawyer defends a fourteen-year-old who shot the man who abducted her for marriage, a custom the court is being asked to end; from a landmark real case.' },
      { title: 'Lamb', year: 2015, director: 'Zeleke', cast: 'Rediat Amare, Kidist Siyum, Wolela Assefa', blurb: "Sent to relatives after his mother's death, an Ethiopian boy refuses to let his beloved sheep be slaughtered for the feast; the first Ethiopian film ever selected at Cannes." },
      { title: 'The Man Who Sold His Skin', year: 2020, director: 'Ben Hania', cast: 'Yahya Mahayni, Dea Liane, Koen De Bouw', blurb: 'A Syrian refugee lets a famous artist tattoo a Schengen visa across his back, becoming a living artwork that can travel where he cannot; a sharp fable about borders and the art market.' },
      { title: 'The Battle of Algiers', year: 1966, director: 'Pontecorvo', cast: 'Brahim Hadjadj, Mohamed Ben Kassen, Yacef Saâdi', blurb: "The FLN's urban insurgency and the French paratroopers sent to crush it, restaged in the real Casbah with non-professionals so convincingly it opens with a disclaimer; still screened as a manual." },
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
      { title: "Bridget Jones's Diary", year: 2001, director: 'Maguire', cast: 'Renée Zellweger, Colin Firth, Hugh Grant', blurb: 'A London thirtysomething resolves to fix her life via diary and lands between a caddish boss and a standoffish barrister; Renée Zellweger made the mess immortal.' },
      { title: 'Notting Hill', year: 1999, director: 'Michell', cast: 'Julia Roberts, Hugh Grant, Gina McKee', blurb: "A divorced London bookseller spills orange juice on the world's most famous actress and somehow keeps seeing her; charm calibrated to the decimal, with the flatmate of the era." },
      { title: 'Love Actually', year: 2003, director: 'Curtis', cast: 'Hugh Grant, Alan Rickman, Emma Thompson', blurb: 'Nine intertwined London love stories in the five weeks before Christmas, from Downing Street to a school pageant; the ensemble Christmas romcom every December argument is about.' },
      { title: 'Amélie', year: 2001, director: 'Jeunet', cast: 'Audrey Tautou, Mathieu Kassovitz, Rufus', blurb: 'A shy Montmartre waitress secretly engineers happiness for everyone around her while dodging her own; whimsical, green-tinted, and the reason a generation moved to Paris.' },
      { title: 'Legally Blonde', year: 2001, director: 'Luketic', cast: 'Reese Witherspoon, Luke Wilson, Selma Blair', blurb: 'Dumped for not being serious, a sorority president follows her ex to Harvard Law out of spite and stays on merit; the rare comedy whose message landed as hard as its jokes.' },
      { title: 'The Holiday', year: 2006, director: 'Meyers', cast: 'Cameron Diaz, Kate Winslet, Jude Law', blurb: "A London journalist and an L.A. trailer-maker, both freshly heartbroken, swap houses for Christmas and find replacements on each other's continents; peak comfort cinema." },
      { title: "Something's Gotta Give", year: 2003, director: 'Meyers', cast: 'Jack Nicholson, Diane Keaton, Keanu Reeves', blurb: "A sixty-something playboy has a heart attack at his young girlfriend's beach house and falls, against every instinct, for her playwright mother; Keaton and Nicholson sparring as adults." },
      { title: 'The Devil Wears Prada', year: 2006, director: 'Frankel', cast: 'Meryl Streep, Anne Hathaway, Emily Blunt', blurb: "An aspiring journalist takes a job as assistant to fashion's most terrifying editor and starts becoming someone her friends do not recognize; Streep rules it in a whisper." },
      { title: 'Miss Congeniality', year: 2000, director: 'Petrie', cast: 'Sandra Bullock, Benjamin Bratt, Heather Burns', blurb: 'A graceless FBI agent goes undercover as a beauty-pageant contestant to stop a bomber; Sandra Bullock falling over in an evening gown, elevated to art.' },
      { title: 'How to Lose a Guy in 10 Days', year: 2003, director: 'Petrie', cast: 'Kate Hudson, Matthew McConaughey, Adam Goldberg', blurb: 'She is writing a column about driving a man away in ten days; he has bet he can make any woman fall for him in the same window; the formula at its most gleaming.' },
      { title: 'Two Weeks Notice', year: 2002, director: 'Lawrence', cast: 'Sandra Bullock, Hugh Grant, Dana Ivey', blurb: 'A crusading lawyer quits working for her impossible billionaire boss, who then cannot function through her notice period; Bullock and Grant doing screwball at half speed.' },
      { title: 'Music and Lyrics', year: 2007, director: 'Lawrence', cast: 'Drew Barrymore, Hugh Grant, Brad Garrett', blurb: 'A washed-up eighties pop idol has three days to write a hit for a teen superstar, and his plant lady turns out to be the lyricist; opens with a flawless fake 80s video.' },
      { title: 'Hitch', year: 2005, director: 'Tennant', cast: 'Will Smith, Eva Mendes, Kevin James', blurb: "A professional date doctor who makes awkward men presentable falls for a gossip columnist and finds none of his own techniques work; Will Smith's smoothest star turn." },
      { title: 'Sweet Home Alabama', year: 2002, director: 'Tennant', cast: 'Reese Witherspoon, Josh Lucas, Patrick Dempsey', blurb: "A rising New York designer engaged to the mayor's son must first fly home to Alabama and divorce the husband she never mentioned; the culture-clash romcom done sweetest." },
      { title: '13 Going on 30', year: 2004, director: 'Waters', cast: 'Jennifer Garner, Mark Ruffalo, Judy Greer', blurb: 'A thirteen-year-old wishes herself grown and wakes at thirty with the career, the closet and none of the memories, discovering who she became; Jennifer Garner sells every beat.' },
      { title: 'About a Boy', year: 2002, director: 'Weitz', cast: 'Hugh Grant, Nicholas Hoult, Toni Collette', blurb: 'A rich London idler invents a son to date single mothers and instead acquires an odd, bullied twelve-year-old who keeps showing up; the Hugh Grant performance with an actual arc.' },
      { title: 'My Sassy Girl', year: 2001, director: 'Kwak', cast: 'Gianna Jun, Cha Tae-hyun, Kim In-mun', blurb: 'A hapless engineering student rescues a drunk girl on the subway and is conscripted into her chaotic, bossy, secretly grieving orbit; the Korean romcom that conquered Asia.' },
      { title: 'The Wedding Planner', year: 2001, director: 'Shankman', cast: 'Jennifer Lopez, Matthew McConaughey, Justin Chambers', blurb: "San Francisco's most controlled wedding planner is rescued from a runaway dumpster by a charming doctor, who turns out to be her biggest client's groom." },
      { title: 'Definitely, Maybe', year: 2008, director: 'Brooks', cast: 'Ryan Reynolds, Abigail Breslin, Elizabeth Banks', blurb: 'Amid his divorce, a father tells his daughter the story of his three great loves with the names changed, and she has to guess which one is her mother; sturdier than its premise sounds.' },
      { title: 'The Proposal', year: 2009, director: 'Fletcher', cast: 'Sandra Bullock, Ryan Reynolds, Malin Akerman', blurb: 'A feared Canadian editor facing deportation announces a sudden engagement to her put-upon assistant, and his Alaska family hosts the charade; Bullock and Reynolds, peak bicker.' },
      { title: 'Bridget Jones: The Edge of Reason', year: 2004, director: 'Kidron', cast: 'Renée Zellweger, Colin Firth, Hugh Grant', blurb: 'Bridget, finally coupled, invents new catastrophes: jealousy over a leggy colleague, a ski disaster and a Thai prison stint; more of the diary, played broader.' },
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
      { title: 'Pride & Prejudice', year: 2005, director: 'Joe Wright', cast: 'Keira Knightley, Matthew Macfadyen, Brenda Blethyn', blurb: "Elizabeth Bennet and Mr. Darcy misjudge each other across muddy fields and candlelit halls; Joe Wright's dawn-lit, hand-flexing version made Austen swoon-worthy for a new generation." },
      { title: 'Sense and Sensibility', year: 1995, director: 'Lee', cast: 'Emma Thompson, Kate Winslet, Alan Rickman', blurb: 'Two sisters, one all prudence and one all passion, navigate reduced circumstances and unreliable suitors; Emma Thompson won an Oscar for the script and should have for the performance.' },
      { title: 'Anna Karenina', year: 2012, director: 'Joe Wright', cast: 'Keira Knightley, Jude Law, Aaron Taylor-Johnson', blurb: "Tolstoy's doomed affair staged almost entirely inside a decaying theatre, society as literal performance; a divisive, gorgeous gamble with Knightley at its center." },
      { title: 'Wuthering Heights', year: 1939, director: 'Wyler', cast: 'Merle Oberon, Laurence Olivier, David Niven', blurb: "Heathcliff and Cathy's destructive bond on the Yorkshire moors, in the Hollywood-gothic version with Laurence Olivier; it trims the novel's second half and burnishes the doom." },
      { title: 'Jane Eyre', year: 2011, director: 'Fukunaga', cast: 'Mia Wasikowska, Michael Fassbender, Jamie Bell', blurb: "A governess with an iron sense of self falls for her brooding employer, whose house holds a secret; Fukunaga's version restores the gothic chill with Wasikowska and Fassbender." },
      { title: 'Great Expectations', year: 1946, director: 'Lean', cast: 'John Mills, Valerie Hobson, Tony Wager', blurb: "An orphan raised by a blacksmith is made a gentleman by a mystery benefactor, and misreads everything; David Lean's version, from the marsh opening onward, remains the definitive Dickens on film." },
      { title: 'Oliver Twist', year: 1948, director: 'Lean', cast: 'John Howard Davies, Robert Newton, Alec Guinness', blurb: "The workhouse orphan who asked for more falls in with Fagin's pickpockets in Lean's shadow-drenched London; controversial then for Guinness's Fagin, unmatched since for atmosphere." },
      { title: 'The Three Musketeers', year: 1973, director: 'Lester', cast: 'Michael York, Oliver Reed, Richard Chamberlain', blurb: "D'Artagnan joins the king's musketeers amid diamond intrigues; Lester's version plays the swashbuckling as rowdy slapstick with real swords, and the cast is absurdly deep." },
      { title: 'The Count of Monte Cristo', year: 2002, director: 'Reynolds', cast: 'Jim Caviezel, Guy Pearce, Richard Harris', blurb: 'Betrayed into an island prison, Edmond Dantès escapes, finds a fortune and re-enters society as an instrument of patient revenge; the sturdy modern version of the ultimate payback novel.' },
      { title: 'Frankenstein', year: 2025, director: 'del Toro', cast: 'Oscar Isaac, Jacob Elordi, Christoph Waltz', blurb: "Del Toro's lifelong dream project: Victor Frankenstein and his creature locked in a gothic tragedy of fathers and abandonment, mourning where others put lightning bolts." },
      { title: 'Lady Macbeth', year: 2016, director: 'Oldroyd', cast: 'Florence Pugh, Cosmo Jarvis, Paul Hilton', blurb: "Sold into marriage to a cold Northern industrialist, a young woman takes a lover and then removes, one by one, everything in her way; Leskov's novella stripped to the bone, with Florence Pugh's breakout." },
      { title: 'The Trial', year: 1962, director: 'Welles', cast: 'Anthony Perkins, Romy Schneider, Orson Welles', blurb: "Josef K. wakes under arrest for a crime no one will name, and the process swallows him; Welles built Kafka's nightmare in a derelict Paris railway station and called it his best film." },
      { title: 'A Room with a View', year: 1985, director: 'Ivory', cast: 'Helena Bonham Carter, Julian Sands, Maggie Smith', blurb: "A proper English girl kissed in a Florentine barley field must choose between passion and a fiancé made entirely of opinions; Merchant Ivory's sunniest film." },
      { title: 'Howards End', year: 1992, director: 'Ivory', cast: 'Emma Thompson, Helena Bonham Carter, Anthony Hopkins', blurb: "The idealist Schlegel sisters entangle with the wealthy, careless Wilcoxes over a house that stands for England itself; Forster's social web given full Merchant Ivory weight." },
      { title: 'The Age of Innocence', year: 1993, director: 'Scorsese', cast: 'Daniel Day-Lewis, Michelle Pfeiffer, Winona Ryder', blurb: 'A New York lawyer engaged to a perfect bride falls for her scandalous cousin, and Gilded Age society closes around them without one raised voice; Scorsese called it his most violent film.' },
      { title: 'Tess', year: 1979, director: 'Polanski', cast: 'Nastassja Kinski, Peter Firth, Leigh Lawson', blurb: "A poor girl sent to claim kinship with a rich family is ruined by one man and failed by the better one she loves; Hardy's tragedy filmed by Polanski with terrible patience." },
      { title: 'White Nights', year: 1957, director: 'Visconti', cast: 'Maria Schell, Marcello Mastroianni, Jean Marais', blurb: "A lonely clerk meets a woman on a canal bridge who is waiting for a lover who promised to return; Visconti stages Dostoevsky's four nights on dreamlike studio sets swirling with fog." },
      { title: 'Madame Bovary', year: 1991, director: 'Chabrol', cast: 'Isabelle Huppert, Jean-François Balmer, Christophe Malavoy', blurb: "A doctor's wife in provincial Normandy chases the passion novels promised her through affairs and debt; Chabrol observes Flaubert's heroine with cool exactness, Huppert in the lead." },
      { title: 'The Hunchback of Notre Dame', year: 1956, director: 'Delannoy', cast: 'Gina Lollobrigida, Anthony Quinn, Alain Cuny', blurb: 'The deaf bell-ringer of Notre Dame, the street dancer Esmeralda, and the archdeacon whose desire destroys them all; the French version with Anthony Quinn and Gina Lollobrigida.' },
      { title: 'Barry Lyndon', year: 1975, director: 'Kubrick', cast: "Ryan O'Neal, Marisa Berenson, Patrick Magee", blurb: "An Irish chancer duels, deserts and marries his way into the English aristocracy, then loses it all; Kubrick shot Thackeray's novel like moving paintings, by candlelight." },
      { title: 'Hamlet', year: 1996, director: 'Branagh', cast: 'Kenneth Branagh, Derek Jacobi, Kate Winslet', blurb: 'Branagh films the complete, uncut text in 70mm, a four-hour Hamlet in a bright mirrored Elsinore with an all-star cast down to the smallest role; the maximal version.' },
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
      { title: 'Norma Rae', year: 1979, director: 'Martin Ritt', cast: 'Sally Field, Ron Leibman, Beau Bridges', blurb: "A Southern textile-mill worker with two kids and no illusions risks everything to unionize her plant; the moment she climbs on a table with a UNION sign is labor cinema's defining image." },
      { title: 'Modern Times', year: 1936, director: 'Chaplin', cast: 'Charlie Chaplin, Paulette Goddard, Henry Bergman', blurb: "Chaplin's Tramp is swallowed by the assembly line, literally through the gears, then drifts with an orphan through strikes and shantytowns; slapstick with a furious spine." },
      { title: 'The Grapes of Wrath', year: 1940, director: 'Ford', cast: 'Henry Fonda, Jane Darwell, John Carradine', blurb: "Evicted by the Dust Bowl, the Joad family drives west on the promise of California work that keeps receding; Ford's version of Steinbeck ends angrier than Hollywood usually allowed." },
      { title: 'On the Waterfront', year: 1954, director: 'Kazan', cast: 'Marlon Brando, Eva Marie Saint, Karl Malden', blurb: "A dockworker who could have been a contender is asked to testify against the mob-run union that owns the waterfront and killed his conscience once already; Brando's defining performance." },
      { title: 'Salt of the Earth', year: 1954, director: 'Biberman', cast: 'Rosaura Revueltas, Juan Chacón, Will Geer', blurb: 'Striking zinc miners in New Mexico are legally barred from picketing, so their wives take the line; made by blacklisted filmmakers with real miners, and suppressed for years.' },
      { title: 'The Organizer', year: 1963, director: 'Monicelli', cast: 'Marcello Mastroianni, Renato Salvatori, Gabriella Giorgelli', blurb: 'A threadbare professor arrives in 1890s Turin and helps textile-mill workers mount their first strike; Mastroianni, shabby and magnificent, in a film both warm and clear-eyed about the cost.' },
      { title: 'Blue Collar', year: 1978, director: 'Schrader', cast: 'Richard Pryor, Harvey Keitel, Yaphet Kotto', blurb: "Three Detroit auto workers, squeezed from every side, rob their own union local and find its books hide worse; Schrader's furious debut about how solidarity gets broken." },
      { title: '9 to 5', year: 1980, director: 'Higgins', cast: 'Jane Fonda, Lily Tomlin, Dolly Parton', blurb: 'Three secretaries, pushed past the limit by a lying, sexist boss, end up holding him captive while they quietly fix the office; Fonda, Tomlin and Parton in a revenge fantasy that stuck.' },
      { title: 'Matewan', year: 1987, director: 'Sayles', cast: 'Chris Cooper, James Earl Jones, Mary McDonnell', blurb: 'A union organizer arrives in a 1920 West Virginia coal town where the company owns everything and has imported Black and Italian strikebreakers; it builds, on history, to the Matewan massacre.' },
      { title: 'Roger & Me', year: 1989, director: 'Moore', cast: 'Michael Moore, Rhonda Britton, Fred Ross', blurb: "After GM closes its Flint plants, Michael Moore spends years trying to get chairman Roger Smith to visit the town his decisions gutted; the film that invented Moore's ambush style." },
      { title: 'The Full Monty', year: 1997, director: 'Cattaneo', cast: 'Robert Carlyle, Mark Addy, Wim Snape', blurb: 'Six unemployed Sheffield steelworkers, out of options and pride, decide to out-strip the Chippendales for one night only; a comedy that never forgets why they need the money.' },
      { title: 'Office Space', year: 1999, director: 'Judge', cast: 'Ron Livingston, Jennifer Aniston, David Herman', blurb: 'A cubicle drone freed by hypnosis simply stops caring, and thrives, while his friends face the layoffs; TPS reports, a red stapler, and the printer scene: the cult film of white-collar futility.' },
      { title: 'I, Daniel Blake', year: 2016, director: 'Loach', cast: 'Dave Johns, Hayley Squires, Briana Shann', blurb: "A Newcastle carpenter recovering from a heart attack is ruled fit to work by the benefits system and ground through its forms and sanctions; Loach's Palme d'Or-winning indictment." },
      { title: 'Sorry to Bother You', year: 2018, director: 'Riley', cast: 'LaKeith Stanfield, Tessa Thompson, Jermaine Fowler', blurb: 'A Black Oakland telemarketer discovers his white voice and rockets up the corporate tower while his friends unionize below; a satire that keeps escalating past every guess.' },
      { title: 'Harlan County U.S.A.', year: 1976, director: 'Kopple', cast: 'Norman Yarborough, Houston Elmore, Phil Sparks', blurb: "Kentucky coal miners strike against Duke Power while the company's gun thugs circle; Kopple's crew stayed through the guns, and the camera gets attacked on screen." },
      { title: 'Daens', year: 1992, director: 'Coninx', cast: 'Jan Decleir, Gérard Desarthe, Antje De Boeck', blurb: 'A priest in 1890s Flanders sides with the starving mill workers of Aalst against factory owners and his own church hierarchy; based on a real figure Belgium still argues about.' },
      { title: 'Brassed Off', year: 1996, director: 'Herman', cast: 'Ewan McGregor, Tara Fitzgerald, Pete Postlethwaite', blurb: "As their colliery faces closure, Yorkshire miners keep the town's brass band playing toward a national final; a comedy that turns, by the end, into an open political eulogy." },
      { title: 'Human Resources', year: 1999, director: 'Cantet', cast: 'Jalil Lespert, Jean-Claude Vallod, Didier Emile-Woldemard', blurb: 'A business student returns to his hometown factory to intern in management and discovers his own father is on the redundancy list he is helping prepare.' },
      { title: 'Made in Dagenham', year: 2010, director: 'Cole', cast: 'Sally Hawkins, Bob Hoskins, Miranda Richardson', blurb: "In 1968, the women who sew Ford's car seats walk out for equal pay and end up changing British law; a crowd-pleaser built on a real strike." },
      { title: 'Two Days, One Night', year: 2014, director: 'Dardenne', cast: 'Marion Cotillard, Fabrizio Rongione, Catherine Salée', blurb: 'Over one weekend, a woman recovering from depression must visit sixteen colleagues and ask each to give up a bonus so she can keep her job; Cotillard makes every doorstep a battle.' },
      { title: 'Tout va bien', year: 1972, director: 'Godard', cast: 'Yves Montand, Jane Fonda, Vittorio Caprioli', blurb: "A strike locks a film director and his journalist wife inside a sausage factory, and the film keeps dismantling its own storytelling; Godard's return to commercial cinema, on his terms." },
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
      { title: 'Bicycle Thieves', year: 1948, director: 'De Sica', cast: 'Lamberto Maggiorani, Enzo Staiola, Lianella Carell', blurb: 'In postwar Rome, a man finally lands a job that requires a bicycle, and it is stolen on his first day; he and his small son search the city as desperation closes in.' },
      { title: 'Rome, Open City', year: 1945, director: 'Rossellini', cast: 'Aldo Fabrizi, Marcello Pagliero, Harry Feist', blurb: 'A resistance leader, a priest and a pregnant widow live and die under the German occupation of Rome; shot in the actual ruined city months after liberation.' },
      { title: 'Paisan', year: 1946, director: 'Rossellini', cast: 'Carmela Sazio, Robert Van Loon, Benjamin Emanuel', blurb: 'Six stories climb the boot of Italy alongside the Allied liberation, from Sicily to the Po marshes, tracking soldiers and civilians who mostly cannot understand each other.' },
      { title: 'Umberto D.', year: 1952, director: 'De Sica', cast: 'Carlo Battisti, Napoleone the Dog, Maria Pia Casilio', blurb: "A retired civil servant with a small dog and a smaller pension slides toward eviction while trying to keep his dignity; De Sica's bleakest, tenderest film." },
      { title: 'Ossessione', year: 1943, director: 'Visconti', cast: 'Clara Calamai, Massimo Girotti, Dhia Cristiani', blurb: "A drifter and an innkeeper's wife fall into lust and plot her husband's death; The Postman Always Rings Twice transplanted to the Po delta, and the movement's dark seed." },
      { title: 'La Terra Trema', year: 1948, director: 'Visconti', cast: 'Antonio Arcidiacono, Giuseppe Arcidiacono, Venera Bonaccorso', blurb: 'A Sicilian fishing family mortgages everything to escape the wholesalers who fix the prices, and the sea and the market punish them; acted entirely by villagers in their own dialect.' },
      { title: 'La Strada', year: 1954, director: 'Fellini', cast: 'Giulietta Masina, Anthony Quinn, Richard Basehart', blurb: "A simple-hearted young woman is sold to a brutish traveling strongman as assistant and wife; Fellini's fable of cruelty and grace, with Giulietta Masina's unforgettable face." },
      { title: 'Nights of Cabiria', year: 1957, director: 'Fellini', cast: 'Giulietta Masina, François Périer, Franca Marzi', blurb: 'A proud Roman streetwalker keeps trusting men and being robbed by them, and keeps walking anyway; ends on the most generous final smile in cinema.' },
      { title: 'Bitter Rice', year: 1949, director: 'De Santis', cast: 'Doris Dowling, Silvana Mangano, Vittorio Gassman', blurb: 'Seasonal workers in the northern rice paddies harbor two thieves on the run; neorealism crossed with pulp melodrama, and a star-making role for Silvana Mangano.' },
      { title: 'Il Posto', year: 1961, director: 'Olmi', cast: 'Loredana Detto, Sandro Panseri, Corrado Aprile', blurb: 'A shy boy from the Milan suburbs sits exams and interviews for a lifetime clerkship, wanders the city, and glimpses the desk waiting at the end of it all; gentle and quietly chilling.' },
      { title: 'The Tree of Wooden Clogs', year: 1978, director: 'Olmi', cast: 'Luigi Ornaghi, Francesca Moriggi, Omar Brignoli', blurb: 'Four peasant families share a Lombardy farmstead through one year of births, harvests and small injustices; three patient hours acted by real farmers in dialect.' },
      { title: 'Accattone', year: 1961, director: 'Pasolini', cast: 'Franco Citti, Franca Pasut, Silvana Corsini', blurb: "A Roman pimp who has never worked drifts between women, hunger and petty theft in the borgate; Pasolini's debut gave the slums a doomed, sacred grandeur." },
      { title: 'Mamma Roma', year: 1962, director: 'Pasolini', cast: 'Anna Magnani, Ettore Garofolo, Franco Citti', blurb: 'A former prostitute claws her way to a market stall and an apartment to give her teenage son a respectable life, and the past keeps its grip; Anna Magnani at full force.' },
      { title: 'Salvatore Giuliano', year: 1962, director: 'Rosi', cast: 'Salvo Randone, Frank Wolff, Pippo Agusta', blurb: "The bandit's bullet-riddled body opens the film, and Sicily is reconstructed around the corpse: police, press, Mafia and politics each with a version; the investigation as film form." },
      { title: 'Il Grido', year: 1957, director: 'Antonioni', cast: 'Steve Cochran, Alida Valli, Dorian Gray', blurb: 'Left by the woman he built his life around, a sugar-refinery worker drifts along the Po with his small daughter, trying and failing to start over; neorealism turning inward.' },
      { title: 'In the Name of the Law', year: 1949, director: 'Germi', cast: 'Massimo Girotti, Jone Salinas, Camillo Mastrocinque', blurb: 'A young judge posted to a Sicilian town finds the Mafia running everything and every witness silent; an early, sharp look at what the postwar state was up against.' },
      { title: 'Without Pity', year: 1948, director: 'Lattuada', cast: 'Carla Del Poggio, John Kitzmiller, Pierre Claudé', blurb: 'A Black American GI and a desperate Italian woman fall in love in the smuggling underworld of postwar Livorno, where every exit is closed to them; a rare interracial romance for its era.' },
      { title: 'To Live in Peace', year: 1947, director: 'Zampa', cast: 'Aldo Fabrizi, Gar Moore, Mirella Monti', blurb: 'An Italian farm family hides two escaped American POWs, one Black, as the front approaches and the village drunk celebrates peace early; comedy and war grief in one held breath.' },
      { title: 'Two Pennyworth of Hope', year: 1952, director: 'Castellani', cast: 'Maria Fiore, Vincenzo Musolino, Filomena Russo', blurb: "A jobless veteran in a village under Vesuvius hustles at a dozen trades while courting a fireworks-maker's daughter against both families; neorealism at its sunniest." },
      { title: 'Banditi a Orgosolo', year: 1961, director: 'De Seta', cast: 'Michele Cossu, Peppeddu Cuccu, Vittorina Pisano', blurb: 'A Sardinian shepherd wrongly suspected after a police raid takes his flock into the mountains and is made an outlaw by suspicion itself; shot with real shepherds of Orgosolo.' },
      { title: 'Hands Over the City', year: 1963, director: 'Rosi', cast: 'Rod Steiger, Salvo Randone, Guido Alberti', blurb: 'A Naples building collapse exposes the alliance of developers and councilmen rezoning the city for profit; Rosi names the mechanism outright, and the film still plays as current affairs.' },
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
