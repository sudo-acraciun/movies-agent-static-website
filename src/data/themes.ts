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
  /** TMDB id, provenance for the baked poster (resolved out-of-band). */
  tmdbId?: number;
  /** Baked TMDB poster URL (w342). */
  posterPath?: string;
  /** IMDb rating (one decimal), from the prod movies table. */
  imdbRating?: number;
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
  /** CSS object-position for the hero crop (e.g. 'center 30%'), judged per
   *  image against the actual still. */
  heroPosition?: string;
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
    slug: 'modern-black-and-white-films',
    title: 'Modern black-and-white films: 21 picks from The Artist to The Lighthouse',
    metaDescription:
      '21 modern films, most of them shot in black and white long after color took over, from The Artist, Ida and Cold War to Nebraska, The Lighthouse and Mank, curated as a weekly collection.',
    h1: 'Modern black-and-white films: 21 picks',
    weekOf: '2026-10-16',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/bYimqNnizPUCnL5HOdoCW02IGmH.jpg',
    heroPosition: 'center 15%',
    intro: [
      "Long after color became the default, a new generation of directors kept choosing black and white on purpose: to evoke a period, to hold a story at a distance, or to borrow the gravity of early cinema. This collection follows that choice around the world, from The Artist's silent-era homage and Paweł Pawlikowski's Polish elegies Ida and Cold War to Joel Coen's stage-bare The Tragedy of Macbeth.",
      "These 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of October 16, 2026, featuring The Artist. Most are in black and white, and the list closes with Woody Allen's Manhattan from 1979, made when black and white was already a deliberate choice.",
    ],
    items: [
      { title: 'The Artist', year: 2011, tmdbId: 74643, posterPath: 'https://image.tmdb.org/t/p/w342/xYMYV8lMIeQMymuNPBvq3hOnqXw.jpg', imdbRating: 7.8, director: 'Hazanavicius', cast: 'Jean Dujardin, Bérénice Bejo, John Goodman', blurb: 'A silent-movie star in 1927 Hollywood refuses to accept talking pictures while the young dancer he helped discover becomes a sound-era star; an almost entirely silent film that won the Oscar for Best Picture.' },
      { title: 'Cold War', year: 2018, tmdbId: 440298, posterPath: 'https://image.tmdb.org/t/p/w342/6rbS8oPIgUMhQgIX8oGVTtlNgLR.jpg', imdbRating: 7.5, director: 'Pawlikowski', cast: 'Joanna Kulig, Tomasz Kot, Borys Szyc', blurb: 'A pianist and a singer from a Polish folk ensemble fall in love in postwar Poland and keep finding and losing each other across borders for fifteen years; it won Paweł Pawlikowski Best Director at Cannes.' },
      { title: 'Ida', year: 2013, tmdbId: 209274, posterPath: 'https://image.tmdb.org/t/p/w342/gkZzErWo7Hc3dAsQhRs5HZ2MJYc.jpg', imdbRating: 7.4, director: 'Pawlikowski', cast: 'Agata Trzebuchowska, Agata Kulesza, Dawid Ogrodnik', blurb: 'A novice nun in 1960s Poland learns from her only relative, a hard-drinking judge, that she was born Jewish, and the two set out to find where her parents are buried; winner of the Oscar for Best Foreign Language Film.' },
      { title: 'Aferim!', year: 2015, tmdbId: 319993, posterPath: 'https://image.tmdb.org/t/p/w342/fQyRszfnlXPFqQSWlqvdDDo42Ze.jpg', imdbRating: 7.6, director: 'Jude', cast: 'Teodor Corban, Mihai Comănoiu, Toma Cuzin', blurb: "In 1835 Wallachia a constable and his teenage son ride across the countryside hunting a runaway Roma slave for a nobleman; Radu Jude's darkly comic western about Romania's history of slavery." },
      { title: 'Tabu', year: 2012, tmdbId: 93858, posterPath: 'https://image.tmdb.org/t/p/w342/mtr1ztUkJs6jsYdzK3gBLsuffr4.jpg', imdbRating: 7.3, director: 'Gomes', cast: 'Teresa Madruga, Laura Soveral, Ana Moreira', blurb: "In present-day Lisbon an elderly woman's neighbors piece together her past, and the film's second half flashes back, almost without dialogue, to a forbidden love affair in colonial Africa." },
      { title: 'Nebraska', year: 2013, tmdbId: 129670, posterPath: 'https://image.tmdb.org/t/p/w342/o1t2Mw18EEBnl8v4Nby3PFjxnM1.jpg', imdbRating: 7.7, director: 'Payne', cast: 'Bruce Dern, Will Forte, June Squibb', blurb: "An aging Montana man convinced a sweepstakes letter has made him a millionaire sets out to collect in Lincoln, Nebraska, and his son agrees to drive him; Alexander Payne's dry family road movie." },
      { title: 'The Lighthouse', year: 2019, tmdbId: 503919, posterPath: 'https://image.tmdb.org/t/p/w342/dwXmOYJVM1VIkkSXHY5zYSaLJLC.jpg', imdbRating: 7.4, director: 'Eggers', cast: 'Robert Pattinson, Willem Dafoe, Valeriia Karaman', blurb: 'Two keepers on a remote New England lighthouse island in the 1890s are stranded by a storm and slide into drink, rivalry and madness; shot in a nearly square frame.' },
      { title: 'The Tragedy of Macbeth', year: 2021, tmdbId: 591538, posterPath: 'https://image.tmdb.org/t/p/w342/tDNJEhcLbX3jIk3BMCur9pCdaVD.jpg', imdbRating: 7.1, director: 'Coen', cast: 'Denzel Washington, Frances McDormand, Alex Hassell', blurb: "Shakespeare's Scottish general, urged on by his wife, murders his king for the crown and is consumed by guilt; Joel Coen stages it on bare, angular sets with Denzel Washington and Frances McDormand." },
      { title: 'Mank', year: 2020, tmdbId: 614560, posterPath: 'https://image.tmdb.org/t/p/w342/4yzTcAtvzyZLLto4z04xobUK9el.jpg', imdbRating: 6.8, director: 'Fincher', cast: 'Gary Oldman, Amanda Seyfried, Lily Collins', blurb: 'Screenwriter Herman J. Mankiewicz, laid up with a broken leg in 1940, races to finish the script of Citizen Kane while looking back on the Hollywood power players who inspired it.' },
      { title: 'Passing', year: 2021, tmdbId: 541524, posterPath: 'https://image.tmdb.org/t/p/w342/t4tYUT1oSWOP6XKZBoclPAG96KP.jpg', imdbRating: 6.6, director: 'Hall', cast: 'Tessa Thompson, Ruth Negga, André Holland', blurb: "Two Black women who grew up together meet again in 1920s New York, one of them now living as white and married to a racist; Rebecca Hall's first film as director, from Nella Larsen's novel." },
      { title: "C'mon C'mon", year: 2021, tmdbId: 632617, posterPath: 'https://image.tmdb.org/t/p/w342/1oOyJsdcJnnE7cl9bZdUQvBjKNH.jpg', imdbRating: 7.3, director: 'Mills', cast: 'Joaquin Phoenix, Gaby Hoffmann, Woody Norman', blurb: 'A radio journalist recording interviews with children across America ends up looking after his young nephew for weeks, and the two slowly learn how to talk to each other.' },
      { title: 'Anomalisa', year: 2015, tmdbId: 291270, posterPath: 'https://image.tmdb.org/t/p/w342/4DJ1zNr4Y6q7zQ27goEYla46VdO.jpg', imdbRating: 7.2, director: 'Kaufman & Johnson', cast: 'David Thewlis, Jennifer Jason Leigh, Tom Noonan', blurb: 'A customer-service author on a business trip to Cincinnati hears everyone around him speak in the same voice until he meets one woman who sounds different; a stop-motion drama for adults written by Charlie Kaufman.' },
      { title: 'Computer Chess', year: 2013, tmdbId: 158743, posterPath: 'https://image.tmdb.org/t/p/w342/sjmzVdWkgB46ZXrNCflC9aorzog.jpg', imdbRating: 6.2, director: 'Bujalski', cast: 'Patrick Riester, Myles Paige, James Curry', blurb: 'Programmers gather in a drab hotel for an early-1980s weekend tournament where chess programs play each other, while a self-help group shares the building; shot on vintage black-and-white video cameras.' },
      { title: 'A Field in England', year: 2013, tmdbId: 179111, posterPath: 'https://image.tmdb.org/t/p/w342/dKhMJr8yoHVyvxyUiAeIn2hKVdL.jpg', imdbRating: 6.2, director: 'Wheatley', cast: 'Reece Shearsmith, Michael Smiley, Richard Glover', blurb: "Deserters fleeing a battle of the English Civil War are forced by an alchemist to dig for treasure in a field, helped along by mushrooms; Ben Wheatley's psychedelic period film." },
      { title: 'Hard to Be a God', year: 2013, tmdbId: 110402, posterPath: 'https://image.tmdb.org/t/p/w342/4lITcslPpm8NjTJyuVGMEwKvHcM.jpg', imdbRating: 6.5, director: 'German', cast: 'Leonid Yarmolnik, Yuriy Tsurilo, Natalya Moteva', blurb: "Scientists from Earth watch over a planet stuck in its own Middle Ages, and one of them, living there as a nobleman, is forbidden to intervene; Aleksei German's nearly three-hour vision of mud and cruelty." },
      { title: 'The Happiest Day in the Life of Olli Mäki', year: 2016, tmdbId: 392807, posterPath: 'https://image.tmdb.org/t/p/w342/hFqz2dP3MYDml6hXWU2vaRN6Lf3.jpg', imdbRating: 7.2, director: 'Kuosmanen', cast: 'Jarkko Lahti, Oona Airola, Eero Milonoff', blurb: 'In 1962 a Finnish boxer from a small town trains for a world featherweight title fight in Helsinki just as he falls in love; based on a real fight, and winner of Un Certain Regard at Cannes.' },
      { title: 'Stations of the Cross', year: 2014, tmdbId: 254721, posterPath: 'https://image.tmdb.org/t/p/w342/gJgvoCG1GtGibgjg8ABBIVExZ0F.jpg', imdbRating: 7.4, director: 'Brüggemann', cast: 'Lea van Acken, Franziska Weisz, Florian Stetter', blurb: 'A 14-year-old girl from a strict Catholic family prepares for her confirmation and tries to live her faith without compromise, told in fourteen fixed-camera scenes named after the Stations of the Cross.' },
      { title: 'Much Ado About Nothing', year: 2012, tmdbId: 91739, posterPath: 'https://image.tmdb.org/t/p/w342/kDUEegV4P8odhUTjHE2e2kWMZo3.jpg', imdbRating: 7, director: 'Whedon', cast: 'Amy Acker, Alexis Denisof, Nathan Fillion', blurb: "Shakespeare's comedy of the sparring lovers Beatrice and Benedick and a wedding wrecked by slander, moved to a modern California house; Joss Whedon shot it at his own home in twelve days." },
      { title: 'Frantz', year: 2016, tmdbId: 377263, posterPath: 'https://image.tmdb.org/t/p/w342/cL77uNb2BB8eXjYl9JIrWXCM8so.jpg', imdbRating: 7.5, director: 'Ozon', cast: 'Pierre Niney, Paula Beer, Ernst Stötzner', blurb: "In a German town after the First World War, a young woman mourning her fiancé meets a Frenchman who leaves flowers on his grave and says he knew him; François Ozon moves between black and white and color." },
      { title: 'The Mountain', year: 2018, tmdbId: 503742, posterPath: 'https://image.tmdb.org/t/p/w342/aAxdavwqxmE49zvz2936WQtKvDY.jpg', imdbRating: 5.5, director: 'Alverson', cast: 'Tye Sheridan, Jeff Goldblum, Hannah Gross', blurb: "In the 1950s a withdrawn young man whose mother is in an asylum goes on the road with a doctor who performs lobotomies at institutions around the country; Rick Alverson's bleak drama." },
      { title: 'Manhattan', year: 1979, tmdbId: 696, posterPath: 'https://image.tmdb.org/t/p/w342/k4eT3EvfxW1L9Wmt04UqJqCvCR6.jpg', imdbRating: 7.8, director: 'Allen', cast: 'Woody Allen, Diane Keaton, Michael Murphy', blurb: "A twice-divorced New York TV writer dating a 17-year-old student falls for his best friend's mistress; Woody Allen's black-and-white portrait of the city, set to Gershwin." },
    ],
    appNote:
      'Several of these films are hard to come across by chance. Add the collection to your watchlist in I Like Movies, tick each one off as you see it, and rate it so the app learns which corners of world cinema you keep coming back to. A new themed collection arrives in the Discover tab every Friday.',
    faqs: [
      {
        q: 'Why do modern directors still shoot in black and white?',
        a: [
          'Directors give different reasons. Some recreate the look of the era a film is set in (The Artist, Mank, Cold War); others use it to strip a story down to faces and landscapes (Nebraska, Ida) or to make the past feel remote and strange (The Lighthouse, A Field in England).',
        ],
      },
      {
        q: 'What are the best modern black-and-white movies?',
        a: [
          'Three have the strongest records: The Artist won the Oscar for Best Picture, Ida won the Oscar for Best Foreign Language Film, and Cold War won Paweł Pawlikowski the Best Director prize at Cannes. From there, Nebraska, The Lighthouse and Frantz show how differently directors use it.',
        ],
      },
    ],
  },
  {
    slug: 'film-noir',
    title: 'Film noir: 21 essential films from The Third Man to Brick',
    metaDescription:
      '21 essential film noir and neo-noir titles, from The Third Man, Double Indemnity and The Maltese Falcon to Le Samouraï, Mulholland Drive and Brick, curated as a weekly collection.',
    h1: 'Film noir: 21 essential films',
    weekOf: '2026-10-09',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/rLLhOCgAjuvlKmjUqVb7P1UAbUI.jpg',
    heroPosition: 'center 10%',
    intro: [
      "Film noir is the name French critics gave, just after the war, to the dark American crime films of the 1940s: venetian-blind shadows, cynical narrators, doomed men and dangerous women. This collection runs from the Hollywood classics (Double Indemnity, The Maltese Falcon, Out of the Past) through Melville's Paris gangsters and Kurosawa's Tokyo to the neo-noir of L.A. Confidential, Mulholland Drive and Memento.",
      "These 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of October 9, 2026, featuring The Third Man. The spread runs from John Huston's The Maltese Falcon in 1941 to Rian Johnson's Brick, a hardboiled detective story moved into a California high school.",
    ],
    items: [
      { title: 'The Third Man', year: 1949, tmdbId: 1092, posterPath: 'https://image.tmdb.org/t/p/w342/vqnFHTx1phgTAsLfxZoejSbMVHA.jpg', imdbRating: 8.1, director: 'Reed', cast: 'Joseph Cotten, Alida Valli, Trevor Howard', blurb: 'A writer of pulp westerns arrives in bombed-out postwar Vienna to work for his friend Harry Lime and learns Lime has just died, in circumstances that do not add up; Graham Greene wrote it, Orson Welles lurks in the shadows.' },
      { title: 'Double Indemnity', year: 1944, tmdbId: 996, posterPath: 'https://image.tmdb.org/t/p/w342/rVNYZZgfhwqVMMWlBmxOfWqnwCj.jpg', imdbRating: 8.3, director: 'Wilder', cast: 'Fred MacMurray, Barbara Stanwyck, Edward G. Robinson', blurb: "An insurance salesman falls for a married woman and helps her kill her husband for the payout, then watches the perfect plan come apart; Billy Wilder and Raymond Chandler adapting James M. Cain." },
      { title: 'Sunset Boulevard', year: 1950, tmdbId: 599, posterPath: 'https://image.tmdb.org/t/p/w342/zt8aQ6ksqK6p1AopC5zVTDS9pKT.jpg', imdbRating: 8.4, director: 'Wilder', cast: 'William Holden, Gloria Swanson, Erich von Stroheim', blurb: 'A broke screenwriter hiding from repo men ends up in the decaying mansion of a forgotten silent-film star who is planning her comeback; the story is told by a narrator who is already dead.' },
      { title: 'The Maltese Falcon', year: 1941, tmdbId: 963, posterPath: 'https://image.tmdb.org/t/p/w342/bf4o6Uzw5wqLjdKwRuiDrN1xyvl.jpg', imdbRating: 7.9, director: 'Huston', cast: 'Humphrey Bogart, Mary Astor, Gladys George', blurb: "After his partner is shot, San Francisco private eye Sam Spade is caught between liars and killers all hunting a jeweled statuette; John Huston's first film as director, with Humphrey Bogart." },
      { title: 'The Asphalt Jungle', year: 1950, tmdbId: 16958, posterPath: 'https://image.tmdb.org/t/p/w342/8xsUnT0P2fJWQv9jGDhs3i9Zx2l.jpg', imdbRating: 7.8, director: 'Huston', cast: 'Sterling Hayden, Louis Calhern, Jean Hagen', blurb: 'A criminal mastermind fresh out of prison recruits a safecracker, a driver and a hired muscle for one jewel robbery, and each man has a weakness that unravels it; an early model for the heist film.' },
      { title: 'Out of the Past', year: 1947, tmdbId: 678, posterPath: 'https://image.tmdb.org/t/p/w342/lnUK6Cg5ARM0qaq0B5SG20VAM0h.jpg', imdbRating: 8, director: 'Tourneur', cast: 'Robert Mitchum, Jane Greer, Kirk Douglas', blurb: "A small-town gas station owner is pulled back into the past he fled: a job tracking down a gangster's runaway lover that ended with him falling for her; noir at its most fatalistic." },
      { title: 'The Big Sleep', year: 1946, tmdbId: 910, posterPath: 'https://image.tmdb.org/t/p/w342/lraHo9D8c0YWfxsKqT5P5sVqMKN.jpg', imdbRating: 7.9, director: 'Hawks', cast: 'Humphrey Bogart, Lauren Bacall, John Ridgely', blurb: "Private detective Philip Marlowe is hired by a dying general over his daughter's gambling debts and walks into blackmail and murder; a famously tangled plot carried by Bogart and Bacall's banter." },
      { title: 'Sweet Smell of Success', year: 1957, tmdbId: 976, posterPath: 'https://image.tmdb.org/t/p/w342/akzvV8JasNrgEl5iAP9K6zPHGJe.jpg', imdbRating: 8, director: 'Mackendrick', cast: 'Burt Lancaster, Tony Curtis, Susan Harrison', blurb: "A desperate New York press agent does whatever a powerful gossip columnist asks, including wrecking the columnist's sister's romance with a jazz guitarist; a night-time Manhattan of favors and smears." },
      { title: 'The Night of the Hunter', year: 1955, tmdbId: 3112, posterPath: 'https://image.tmdb.org/t/p/w342/rBka0nFWiHxabHRLr0KfIA8Yiaq.jpg', imdbRating: 8, director: 'Laughton', cast: 'Robert Mitchum, Shelley Winters, Lillian Gish', blurb: "A self-appointed preacher with LOVE and HATE tattooed on his knuckles marries a widow to find the money her executed husband hid, and her two children run; Charles Laughton's only film as director." },
      { title: 'Kiss Me Deadly', year: 1955, tmdbId: 18030, posterPath: 'https://image.tmdb.org/t/p/w342/z7me91nrpWLHY1mZOB2v20cK0zY.jpg', imdbRating: 7.5, director: 'Aldrich', cast: 'Ralph Meeker, Albert Dekker, Paul Stewart', blurb: 'Private eye Mike Hammer picks up a terrified hitchhiker on a dark highway, and her murder leads him to a box everyone wants and nobody should open; a Cold War noir with an apocalyptic ending.' },
      { title: 'The Killing', year: 1956, tmdbId: 247, posterPath: 'https://image.tmdb.org/t/p/w342/A6VzUPcADZGYdGHlVdWvpMNDF5d.jpg', imdbRating: 7.9, director: 'Kubrick', cast: 'Sterling Hayden, Coleen Gray, Vince Edwards', blurb: "An ex-convict plans one last job, robbing a racetrack's cash room during a big race, with a crew of small-time men, and the film follows the heist out of order, minute by minute; the young Stanley Kubrick's breakthrough." },
      { title: 'L.A. Confidential', year: 1997, tmdbId: 2118, posterPath: 'https://image.tmdb.org/t/p/w342/lWCgf5sD5FpMljjpkRhcC8pXcch.jpg', imdbRating: 8.2, director: 'Hanson', cast: 'Kevin Spacey, Russell Crowe, Guy Pearce', blurb: "Three very different 1950s Los Angeles cops, a by-the-book climber, a brutal enforcer and a celebrity detective, circle a coffee-shop massacre that leads back into their own department; adapted from James Ellroy." },
      { title: 'Mulholland Drive', year: 2001, tmdbId: 1018, posterPath: 'https://image.tmdb.org/t/p/w342/x7A59t6ySylr1L7aubOQEA480vM.jpg', imdbRating: 7.9, director: 'Lynch', cast: 'Naomi Watts, Laura Harring, Justin Theroux', blurb: "An aspiring actress arrives in Los Angeles and finds a woman with amnesia hiding in her aunt's apartment, and the two set out to learn who she is; David Lynch's dream-logic Hollywood mystery." },
      { title: 'Memento', year: 2000, tmdbId: 77, posterPath: 'https://image.tmdb.org/t/p/w342/nzlv62aC0octS5AklAiWpXLX9Z0.jpg', imdbRating: 8.4, director: 'Nolan', cast: 'Guy Pearce, Carrie-Anne Moss, Joe Pantoliano', blurb: "A man who cannot form new memories hunts his wife's killer with Polaroids, notes and tattoos, and the story runs backward so you share his confusion; Christopher Nolan's breakthrough." },
      { title: 'Le Samouraï', year: 1967, tmdbId: 5511, posterPath: 'https://image.tmdb.org/t/p/w342/5Fa6o5nfUPEatQ9b3OwEvdEdR7T.jpg', imdbRating: 8, director: 'Melville', cast: 'Alain Delon, François Périer, Nathalie Delon', blurb: 'A solitary contract killer in Paris carries out a hit behind a carefully built alibi and finds both the police and his employers closing in; Alain Delon in a trench coat and fedora, saying almost nothing.' },
      { title: 'Bob le Flambeur', year: 1956, tmdbId: 26030, posterPath: 'https://image.tmdb.org/t/p/w342/3CIfIDtD1I1rYY3ooaya8iZHlD8.jpg', imdbRating: 7.6, director: 'Melville', cast: 'Roger Duchesne, Isabelle Corey, Daniel Cauchy', blurb: 'An aging Montmartre gambler, broke after a losing streak, plans to rob the Deauville casino on the night its safe holds a fortune; often cited as a forerunner of the French New Wave.' },
      { title: 'Stray Dog', year: 1949, tmdbId: 30368, posterPath: 'https://image.tmdb.org/t/p/w342/riBzUgeYawBDi2q9PjARjHrQM7Z.jpg', imdbRating: 7.8, director: 'Kurosawa', cast: 'Toshirō Mifune, Takashi Shimura, Keiko Awaji', blurb: "A rookie Tokyo detective has his pistol stolen on a crowded bus and searches the city's postwar underworld through a summer heatwave as the gun turns up in crimes; Kurosawa's police procedural." },
      { title: 'Detour', year: 1945, tmdbId: 20367, posterPath: 'https://image.tmdb.org/t/p/w342/gJb9HRAs1V4bA0VKsWpT6mhv2RT.jpg', imdbRating: 7.3, director: 'Ulmer', cast: 'Tom Neal, Ann Savage, Claudia Drake', blurb: "A nightclub pianist hitchhikes across America to join his girlfriend in Los Angeles, and a stranger's sudden death, then a worse passenger, trap him; a B-movie shot on a tiny budget at a poverty-row studio." },
      { title: 'The Long Goodbye', year: 1973, tmdbId: 1847, posterPath: 'https://image.tmdb.org/t/p/w342/16Gu0Vg7tBdoRxg1NJDwlTKx1hG.jpg', imdbRating: 7.5, director: 'Altman', cast: 'Elliott Gould, Nina van Pallandt, Sterling Hayden', blurb: "Philip Marlowe drives a friend to Mexico and is then accused of helping him escape a murder charge, in a laid-back 1970s Los Angeles; Elliott Gould plays Chandler's detective as a mumbling misfit." },
      { title: 'Brick', year: 2005, tmdbId: 9270, posterPath: 'https://image.tmdb.org/t/p/w342/5WVk8JpNIxepn4fpZzQeCumkOL5.jpg', imdbRating: 7.1, director: 'Johnson', cast: "Joseph Gordon-Levitt, Nora Zehetner, Matt O'Leary", blurb: "A loner at a California high school digs into what happened to his ex-girlfriend and talks his way through the school's drug ring in hardboiled slang; Rian Johnson's first feature." },
      { title: 'In a Lonely Place', year: 1950, tmdbId: 17057, posterPath: 'https://image.tmdb.org/t/p/w342/jBlYBQdDGqE0RdhEvuEdyqNOkcb.jpg', imdbRating: 7.9, director: 'Ray', cast: 'Humphrey Bogart, Gloria Grahame, Frank Lovejoy', blurb: 'A volatile Hollywood screenwriter becomes the suspect in a young woman\'s murder, and the neighbor who gives him an alibi falls in love with him, then starts to doubt him; Humphrey Bogart and Gloria Grahame.' },
    ],
    appNote:
      'Noir rewards watching in a run, when the shadows, voice-overs and double-crosses start to echo each other. Save this collection to your watchlist in I Like Movies, mark each film as you see it, and rate it so the app learns whether you lean toward the 1940s originals or the modern reinventions. Every Friday the Discover tab gets a new themed collection.',
    faqs: [
      {
        q: 'What makes a movie a film noir?',
        a: [
          'Film noir describes a style and a mood more than a strict genre: crime stories with low-key, high-contrast lighting, cynical or trapped heroes, femmes fatales, and often a flashback told in voice-over. French critics coined the term in 1946 for the American crime films of the war years; most classic noirs date from 1941 to the late 1950s, and later films in the tradition are called neo-noir.',
        ],
      },
      {
        q: 'Where do I start with film noir?',
        a: [
          'Double Indemnity and The Maltese Falcon are the classic entry points, and Out of the Past is noir at its most fatalistic. For a European angle, try The Third Man and Le Samouraï; for modern neo-noir, L.A. Confidential, then Brick if you want the genre\'s slang in an unexpected setting.',
        ],
      },
    ],
  },
  {
    slug: 'horror-movie-marathon',
    title: 'Horror movie marathon: 21 films for October, from Alien to The Substance',
    metaDescription:
      '21 horror films for an October marathon, from Alien, The Fly and Jaws to The Host, The Babadook and The Substance, curated as a weekly collection for Hooptober.',
    h1: 'Horror movie marathon: 21 films for October',
    weekOf: '2026-10-02',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/3BNbh8ODH68JRLEc4YveMHuTcH1.jpg',
    heroPosition: 'center 25%',
    intro: [
      "October is horror month for a lot of film fans, and Hooptober, the informal challenge of watching a run of horror films across the month, often 31 of them, is how many of them mark it. This collection goes past the usual suspects: Scott's Alien and Cronenberg's The Fly next to Bong Joon-ho's The Host, Jennifer Kent's The Babadook and Coralie Fargeat's The Substance.",
      'These 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of October 2, 2026, featuring Alien, timed for the start of Hooptober. The spread runs from a 1935 Universal sequel to 2024 body horror, through Japanese ghost stories, a Persian-language vampire western, a wartime Tehran haunting and an Australian mock documentary.',
    ],
    items: [
      { title: 'Alien', year: 1979, tmdbId: 348, posterPath: 'https://image.tmdb.org/t/p/w342/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg', imdbRating: 8.2, director: 'Scott', cast: 'Tom Skerritt, Sigourney Weaver, Veronica Cartwright', blurb: "The crew of a commercial space tug answers a distress signal on a dead planet and brings back something that hunts them through the ship; the film that made Sigourney Weaver's Ripley an icon." },
      { title: 'The Fly', year: 1986, tmdbId: 9426, posterPath: 'https://image.tmdb.org/t/p/w342/8gZWMhJHRvaXdXsNhERtqNHYpH3.jpg', imdbRating: 7.6, director: 'Cronenberg', cast: 'Jeff Goldblum, Geena Davis, John Getz', blurb: 'A scientist tests his teleportation pods on himself without noticing a housefly inside, and his body begins a slow, grotesque transformation; Cronenberg turns body horror into a tragic love story.' },
      { title: 'Jaws', year: 1975, tmdbId: 578, posterPath: 'https://image.tmdb.org/t/p/w342/lxM6kqilAdpdhqUl2biYp5frUxE.jpg', imdbRating: 8.1, director: 'Spielberg', cast: 'Roy Scheider, Robert Shaw, Richard Dreyfuss', blurb: 'A great white shark preys on swimmers off a New England resort island, and the police chief, an oceanographer and a grizzled shark hunter go out to kill it; the first summer blockbuster.' },
      { title: 'Dawn of the Dead', year: 1978, tmdbId: 923, posterPath: 'https://image.tmdb.org/t/p/w342/70MY8H0bLMvXf8ED2SgVMPhDVVM.jpg', imdbRating: 7.5, director: 'Romero', cast: 'David Emge, Ken Foree, Scott H. Reiniger', blurb: "As the dead rise across America, four survivors barricade themselves inside a suburban shopping mall and briefly live the consumer dream; Romero's gory zombie sequel doubles as satire." },
      { title: 'The Evil Dead', year: 1981, tmdbId: 764, posterPath: 'https://image.tmdb.org/t/p/w342/54C1qdaiSijIU5NeNb4WsPJdNkG.jpg', imdbRating: 7.3, director: 'Raimi', cast: 'Bruce Campbell, Ellen Sandweiss, Richard DeManincor', blurb: "Five college friends at a remote cabin in the woods play a tape of ancient incantations and wake demons that possess them one by one; Sam Raimi's frantic, gleefully gory low-budget debut." },
      { title: 'A Nightmare on Elm Street', year: 1984, tmdbId: 377, posterPath: 'https://image.tmdb.org/t/p/w342/wGTpGGRMZmyFCcrY2YoxVTIBlli.jpg', imdbRating: 7.4, director: 'Craven', cast: 'Heather Langenkamp, Johnny Depp, Robert Englund', blurb: 'Teenagers on one suburban street are stalked and killed in their dreams by a burned man with bladed fingers, so staying awake becomes survival; the film that introduced Freddy Krueger and Johnny Depp.' },
      { title: 'Hellraiser', year: 1987, tmdbId: 9003, posterPath: 'https://image.tmdb.org/t/p/w342/3Z0oPHyLnk3Vx6ZMC1MiVwIrKhO.jpg', imdbRating: 6.9, director: 'Barker', cast: 'Andrew Robinson, Clare Higgins, Ashley Laurence', blurb: 'A puzzle box summons the Cenobites, and the man who escaped their realm needs the blood his lover lures home to rebuild his body; Clive Barker directing his own novella.' },
      { title: 'Bride of Frankenstein', year: 1935, tmdbId: 229, posterPath: 'https://image.tmdb.org/t/p/w342/5241zUwe7rC17MNc2QpCBKKdp1N.jpg', imdbRating: 7.8, director: 'Whale', cast: 'Boris Karloff, Colin Clive, Valerie Hobson', blurb: "Dr. Pretorius pressures Henry Frankenstein into building a mate for the Monster, who has learned to speak and longs for a friend; James Whale's witty, tender sequel to his own 1931 film." },
      { title: 'Ring', year: 1998, tmdbId: 2671, posterPath: 'https://image.tmdb.org/t/p/w342/1YINof6kN5yRdePEbcU5360ejoq.jpg', imdbRating: 7.1, director: 'Nakata', cast: 'Nanako Matsushima, Hiroyuki Sanada, Rikiya Ôtaka', blurb: 'A journalist looking into her niece\'s sudden death finds a cursed videotape that kills its viewers seven days after they watch it; the Japanese ghost story that carried J-horror abroad.' },
      { title: 'The Host', year: 2006, tmdbId: 1255, posterPath: 'https://image.tmdb.org/t/p/w342/dEDLY3KeghKFzks5nTDWdigVikr.jpg', imdbRating: 7.1, director: 'Bong Joon-ho', cast: 'Song Kang-ho, Byun Hee-bong, Park Hae-il', blurb: "A creature born of chemicals dumped into Seoul's Han River snatches a young girl, and her bumbling family sets out to rescue her; a monster movie that is equal parts comedy and political satire." },
      { title: '28 Days Later', year: 2002, tmdbId: 170, posterPath: 'https://image.tmdb.org/t/p/w342/sQckQRt17VaWbo39GIu0TMOiszq.jpg', imdbRating: 7.2, director: 'Boyle', cast: 'Cillian Murphy, Naomie Harris, Brendan Gleeson', blurb: 'A bicycle courier wakes from a coma in an empty London, four weeks after a rage virus has turned most of Britain into frenzied killers; Danny Boyle shot the apocalypse on digital video.' },
      { title: 'The Babadook', year: 2014, tmdbId: 242224, posterPath: 'https://image.tmdb.org/t/p/w342/qt3fqapeo94TfvMyld8P7gkpXLz.jpg', imdbRating: 6.5, director: 'Kent', cast: 'Essie Davis, Noah Wiseman, Hayley McElhinney', blurb: "A widowed mother, worn down by grief and her difficult young son, reads him a sinister pop-up book that will not stay gone; Jennifer Kent's debut about grief that refuses to leave the house." },
      { title: 'It Follows', year: 2015, tmdbId: 270303, posterPath: 'https://image.tmdb.org/t/p/w342/iwnQ1JH1wdWrGYkgWySptJ5284A.jpg', imdbRating: 6.6, director: 'Mitchell', cast: 'Maika Monroe, Keir Gilchrist, Daniel Zovatto', blurb: 'After a sexual encounter, a teenager is pursued by a slow, shape-shifting presence that only she can see and that walks straight toward her wherever she goes; dread built on patience and a synth score.' },
      { title: 'The Descent', year: 2005, tmdbId: 9392, posterPath: 'https://image.tmdb.org/t/p/w342/mxFPI4KYBk5ri9cPteIS8jiDFgj.jpg', imdbRating: 7, director: 'Marshall', cast: 'Shauna Macdonald, Natalie Mendoza, Alex Reid', blurb: 'Six women on a caving trip in the Appalachians end up trapped in an uncharted cave system and discover they are not alone down there; claustrophobia first, then the creatures.' },
      { title: 'The Substance', year: 2024, tmdbId: 933260, posterPath: 'https://image.tmdb.org/t/p/w342/lqoMzCcZYEFK729d6qzt349fB4o.jpg', imdbRating: 7.1, director: 'Fargeat', cast: 'Demi Moore, Margaret Qualley, Dennis Quaid', blurb: "A fading TV fitness star injects a black-market serum that splits off a younger, better version of herself, with strict rules for sharing one life; Coralie Fargeat's body horror satire starring Demi Moore." },
      { title: 'A Girl Walks Home Alone at Night', year: 2014, tmdbId: 252171, posterPath: 'https://image.tmdb.org/t/p/w342/cd2rCE1nun7CESjBI8PGNEof1tb.jpg', imdbRating: 6.8, director: 'Amirpour', cast: 'Sheila Vand, Arash Marandi, Marshall Manesh', blurb: 'In a desolate Iranian ghost town called Bad City, a lonely vampire in a chador stalks the men who prey on others; a black-and-white, Persian-language vampire western shot in California.' },
      { title: 'Under the Shadow', year: 2016, tmdbId: 375012, posterPath: 'https://image.tmdb.org/t/p/w342/bsHpzc7mVbJfZBaD0EISJkm3f3H.jpg', imdbRating: 6.5, director: 'Anvari', cast: 'Narges Rashidi, Avin Manshadi, Bobby Naderi', blurb: 'In 1988 Tehran, during the War of the Cities, a mother and her young daughter are haunted by a djinn as missile strikes empty their apartment building; Babak Anvari\'s debut.' },
      { title: 'Saint Maud', year: 2020, tmdbId: 575776, posterPath: 'https://image.tmdb.org/t/p/w342/ArNYeeDFLVye7JpqLElYdbE6fOa.jpg', imdbRating: 6.5, director: 'Glass', cast: 'Morfydd Clark, Jennifer Ehle, Lily Frazer', blurb: 'A newly devout young nurse becomes convinced she must save the soul of her dying patient, a former dancer, and her faith curdles into something dangerous; Rose Glass\'s debut.' },
      { title: 'His House', year: 2020, tmdbId: 575774, posterPath: 'https://image.tmdb.org/t/p/w342/s6XxJEe4ovVTMgmGmKeO87OFANU.jpg', imdbRating: 6.4, director: 'Weekes', cast: 'Ṣọpẹ́ Dìrísù, Wunmi Mosaku, Malaika Wakoli-Abigaba', blurb: 'A refugee couple who fled war in South Sudan are granted probationary asylum in an English town, and the run-down house they are given holds something that followed them; Remi Weekes\' debut.' },
      { title: 'Kill List', year: 2011, tmdbId: 74725, posterPath: 'https://image.tmdb.org/t/p/w342/qwT2I3ons0oD58jIppKmd4qLtvB.jpg', imdbRating: 6.2, director: 'Wheatley', cast: 'Neil Maskell, MyAnna Buring, Harry Simpson', blurb: "An ex-soldier turned contract killer, short of money, takes one more job with a list of targets, and the work turns stranger and darker with every name; Ben Wheatley's genre-switching nightmare." },
      { title: 'Lake Mungo', year: 2009, tmdbId: 27374, posterPath: 'https://image.tmdb.org/t/p/w342/5IaGu8r0t6bBaydkR6z9l9tJsCg.jpg', imdbRating: 6.1, director: 'Anderson', cast: 'Rosie Traynor, David Pledger, Martin Sharpe', blurb: 'An Australian family starts recording strange happenings at home after their teenage daughter drowns, and the footage uncovers secrets she kept; a mock documentary about grief, built on stillness.' },
    ],
    appNote:
      'Thirty-one days is a lot of films to keep straight. Save this collection to your watchlist in I Like Movies, tick each film off as you watch it, and rate it so the app learns which kind of horror works for you. Every Friday the Discover tab gets a new themed collection.',
    faqs: [
      {
        q: 'What horror movies should I watch for Hooptober?',
        a: [
          'Hooptober has no official list: the challenge is simply to watch a run of horror films through October, often 31. A balanced start is one classic (Bride of Frankenstein, Alien), one modern debut (The Babadook, Saint Maud, His House) and one film from outside Hollywood (Ring, The Host, Under the Shadow).',
        ],
      },
      {
        q: 'Is Alien a horror film or science fiction?',
        a: [
          'Both. It is set on a spaceship, but its structure is a horror film: a small crew trapped in a confined space and picked off one by one by a creature they barely see. Its sequel, Aliens (1986), leans further into action.',
        ],
      },
    ],
  },
  {
    slug: 'western-movies',
    title: 'Western movies: 21 essential films from Stagecoach to Hell or High Water',
    metaDescription:
      "21 essential westerns, from John Ford's Stagecoach and The Searchers to Leone's The Good, the Bad and the Ugly, Unforgiven, No Country for Old Men and Hell or High Water, curated as a weekly collection.",
    h1: 'Western movies: 21 essential films',
    weekOf: '2026-09-25',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/lk0aGHigkfxh1vH547EkOiIOVKL.jpg',
    heroPosition: 'center 5%',
    intro: [
      "The western is the genre America built its myths on and the one the rest of the world took apart. This collection follows it from John Ford's Monument Valley (Stagecoach, The Searchers) and Howard Hawks to Sergio Leone's Italian westerns, the bloodier revisionism of Sam Peckinpah and Robert Altman, and modern heirs from the Coen brothers to Australia's The Proposition.",
      "These 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of September 25, 2026, featuring The Good, the Bad and the Ugly. There are two films each from Leone, Ford, Peckinpah, Hawks, the Coens and Clint Eastwood as director, and one Italian outlier: Sergio Corbucci's snowbound The Great Silence.",
    ],
    items: [
      { title: 'The Good, the Bad and the Ugly', year: 1966, tmdbId: 429, posterPath: 'https://image.tmdb.org/t/p/w342/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg', imdbRating: 8.8, director: 'Leone', cast: 'Clint Eastwood, Eli Wallach, Lee Van Cleef', blurb: "Three gunmen, a bounty hunter, a hired killer and a Mexican bandit, race each other across the Civil War Southwest to a fortune in Confederate gold buried in a grave; Clint Eastwood, with Ennio Morricone's score." },
      { title: 'Once Upon a Time in the West', year: 1968, tmdbId: 335, posterPath: 'https://image.tmdb.org/t/p/w342/qbYgqOczabWNn2XKwgMtVrntD6P.jpg', imdbRating: 8.5, director: 'Leone', cast: 'Claudia Cardinale, Henry Fonda, Jason Robards', blurb: "A former prostitute arrives to join her new husband and finds him and his children murdered by a railroad baron's hired gun, while a harmonica-playing stranger has his own score to settle; Henry Fonda cast against type as the villain." },
      { title: 'The Searchers', year: 1956, tmdbId: 3114, posterPath: 'https://image.tmdb.org/t/p/w342/jLBmgW0epNzJ1N9uzaVCjbyT94v.jpg', imdbRating: 7.8, director: 'Ford', cast: 'John Wayne, Jeffrey Hunter, Vera Miles', blurb: "A Civil War veteran spends years hunting the Comanche who killed his brother's family and kidnapped his niece, and the search turns into an obsession; John Wayne in John Ford's most debated western." },
      { title: 'Stagecoach', year: 1939, tmdbId: 995, posterPath: 'https://image.tmdb.org/t/p/w342/zgMnfnwWZ3nkx4t0bUDEKtW24O8.jpg', imdbRating: 7.8, director: 'Ford', cast: 'Claire Trevor, John Wayne, George Bancroft', blurb: 'Nine strangers, among them an outlaw, a gambler, a drunken doctor and a woman run out of town, share a stagecoach through Apache territory; the film that made John Wayne a star and took Ford to Monument Valley.' },
      { title: 'The Wild Bunch', year: 1969, tmdbId: 576, posterPath: 'https://image.tmdb.org/t/p/w342/8j9yEC3xjy1PJDSizIbaxcHaSph.jpg', imdbRating: 7.9, director: 'Peckinpah', cast: 'William Holden, Ernest Borgnine, Robert Ryan', blurb: "An aging gang of outlaws in 1913 Texas takes one last job across the border for a Mexican general as the West they knew disappears; Sam Peckinpah's violent, elegiac western, famous for its slow-motion shootouts." },
      { title: 'Pat Garrett & Billy the Kid', year: 1973, tmdbId: 11577, posterPath: 'https://image.tmdb.org/t/p/w342/vRDvPypWsjGs7spo7G5bz1cSacC.jpg', imdbRating: 7.2, director: 'Peckinpah', cast: 'James Coburn, Kris Kristofferson, Richard Jaeckel', blurb: "Lawman Pat Garrett is hired to hunt down his old friend Billy the Kid in 1881 New Mexico; Kris Kristofferson plays Billy, and Bob Dylan appears in a small role and wrote the soundtrack, including 'Knockin' on Heaven's Door'." },
      { title: 'No Country for Old Men', year: 2007, tmdbId: 6977, posterPath: 'https://image.tmdb.org/t/p/w342/6d5XOczc226jECq0LIX0siKtgHR.jpg', imdbRating: 8.2, director: 'Coen', cast: 'Javier Bardem, Tommy Lee Jones, Josh Brolin', blurb: "A Texas hunter takes a case of drug money from a desert shootout and is pursued by a remorseless killer with a cattle gun, while an aging sheriff trails them both; the Coen brothers' Cormac McCarthy adaptation won Best Picture." },
      { title: 'True Grit', year: 2010, tmdbId: 44264, posterPath: 'https://image.tmdb.org/t/p/w342/tCrB8pcjadZjsDk7rleGJaIv78k.jpg', imdbRating: 7.6, director: 'Coen', cast: 'Jeff Bridges, Hailee Steinfeld, Matt Damon', blurb: "A determined 14-year-old hires a hard-drinking U.S. marshal to track down her father's killer in Indian Territory; the Coen brothers' version of Charles Portis's novel, with Jeff Bridges and Hailee Steinfeld." },
      { title: 'High Noon', year: 1952, tmdbId: 288, posterPath: 'https://image.tmdb.org/t/p/w342/qETSMQ4IXBSAS409Z9OL0ppXWTW.jpg', imdbRating: 7.9, director: 'Zinnemann', cast: 'Gary Cooper, Thomas Mitchell, Lloyd Bridges', blurb: 'On his wedding day, a small-town marshal learns that a killer he sent to prison is arriving on the noon train, and the townspeople refuse to help him; told in close to real time, with Gary Cooper.' },
      { title: 'Shane', year: 1953, tmdbId: 3110, posterPath: 'https://image.tmdb.org/t/p/w342/svr5ADpjXTCOQv8hmuJnB7I14Qv.jpg', imdbRating: 7.6, director: 'Stevens', cast: 'Alan Ladd, Jean Arthur, Van Heflin', blurb: "A weary gunfighter takes work with a homesteading family in Wyoming and is drawn into their fight with a cattle baron, watched by the young son who idolizes him; Alan Ladd in George Stevens's classic." },
      { title: 'Unforgiven', year: 1992, tmdbId: 33, posterPath: 'https://image.tmdb.org/t/p/w342/54roTwbX9fltg85zjsmrooXAs12.jpg', imdbRating: 8.2, director: 'Eastwood', cast: 'Clint Eastwood, Gene Hackman, Morgan Freeman', blurb: "A retired killer turned struggling pig farmer takes one last bounty, on two cowboys who cut up a prostitute, and runs into a brutal sheriff; Clint Eastwood's dark look at western violence won Best Picture." },
      { title: 'The Hateful Eight', year: 2015, tmdbId: 273248, posterPath: 'https://image.tmdb.org/t/p/w342/jIywvdPjia2t3eKYbjVTcwBQlG8.jpg', imdbRating: 7.8, director: 'Tarantino', cast: 'Samuel L. Jackson, Kurt Russell, Jennifer Jason Leigh', blurb: "A blizzard traps a bounty hunter, his prisoner and a room of strangers in a Wyoming stagecoach stop after the Civil War, and someone among them is not who they claim; Quentin Tarantino's chamber western, shot in 70mm." },
      { title: 'Red River', year: 1948, tmdbId: 3089, posterPath: 'https://image.tmdb.org/t/p/w342/jyNTsAzrIWB441OtvfbgKtx1kFS.jpg', imdbRating: 7.7, director: 'Hawks', cast: 'John Wayne, Montgomery Clift, Joanne Dru', blurb: "A tyrannical rancher drives his herd north from Texas along the Chisholm Trail, and his adopted son rebels against him; John Wayne and Montgomery Clift in Howard Hawks's cattle-drive epic." },
      { title: 'Rio Bravo', year: 1959, tmdbId: 301, posterPath: 'https://image.tmdb.org/t/p/w342/4gI4KKmoi0d3yfsF71YU3S0I5t8.jpg', imdbRating: 8, director: 'Hawks', cast: 'John Wayne, Dean Martin, Ricky Nelson', blurb: "A sheriff holds a rich rancher's murderous brother in his jail until the U.S. marshal arrives, helped only by a drunken deputy, a limping old man and a young gunslinger; John Wayne, Dean Martin and Ricky Nelson." },
      { title: 'McCabe & Mrs. Miller', year: 1971, tmdbId: 29005, posterPath: 'https://image.tmdb.org/t/p/w342/oR839yRsFAiQHwJ78hdKZYjEBg8.jpg', imdbRating: 7.6, director: 'Altman', cast: 'Warren Beatty, Julie Christie, René Auberjonois', blurb: "A small-time gambler opens a brothel with an ambitious madam in a muddy Pacific Northwest mining town, until a mining company wants to buy him out; Robert Altman's anti-western, set to Leonard Cohen songs." },
      { title: 'The Assassination of Jesse James by the Coward Robert Ford', year: 2007, tmdbId: 4512, posterPath: 'https://image.tmdb.org/t/p/w342/xMKn6EQS7eR5ubhPJbw5pQSBZMw.jpg', imdbRating: 7.5, director: 'Dominik', cast: 'Brad Pitt, Casey Affleck, Sam Rockwell', blurb: "In 1881 a young admirer joins the gang of the aging, paranoid outlaw Jesse James and comes to resent the man he idolized; Brad Pitt and Casey Affleck in Andrew Dominik's slow, elegiac western." },
      { title: 'The Proposition', year: 2005, tmdbId: 16608, posterPath: 'https://image.tmdb.org/t/p/w342/bbSHSJuO5XjrIKMh6QXXLTg3Yzr.jpg', imdbRating: 7.3, director: 'Hillcoat', cast: 'Guy Pearce, Ray Winstone, Danny Huston', blurb: 'In the 1880s Australian outback, a police captain gives a captured outlaw nine days to find and kill his older brother, or his younger brother hangs; written by Nick Cave.' },
      { title: 'Hell or High Water', year: 2016, tmdbId: 338766, posterPath: 'https://image.tmdb.org/t/p/w342/ljRRxqy2aXIkIBXLmOVifcOR021.jpg', imdbRating: 7.6, director: 'Mackenzie', cast: 'Jeff Bridges, Chris Pine, Ben Foster', blurb: 'Two brothers rob branches of the bank that is foreclosing on their family ranch in West Texas, chased by a Texas Ranger close to retirement; Jeff Bridges, Chris Pine and Ben Foster in a modern-day western.' },
      { title: 'Dead Man', year: 1995, tmdbId: 922, posterPath: 'https://image.tmdb.org/t/p/w342/jX3wGBVoYoAY3IixBpwYk1fjT4z.jpg', imdbRating: 7.5, director: 'Jarmusch', cast: 'Johnny Depp, Gary Farmer, Crispin Glover', blurb: 'A mild accountant from Cleveland heads west for a job, becomes a wanted man with a bullet near his heart, and is guided by a Native American who believes he is the poet William Blake; Johnny Depp, shot in black and white with a Neil Young score.' },
      { title: 'The Great Silence', year: 1968, tmdbId: 9028, posterPath: 'https://image.tmdb.org/t/p/w342/3kpxS7SZMyYSXvhDnmxQXOOxiTM.jpg', imdbRating: 7.7, director: 'Corbucci', cast: 'Jean-Louis Trintignant, Klaus Kinski, Frank Wolff', blurb: "In a snowbound Utah town, a mute gunfighter defends outlaws and a widow against a gang of bounty hunters led by a sadistic killer; Sergio Corbucci's bleak Italian western, with Klaus Kinski." },
      { title: 'The Outlaw Josey Wales', year: 1976, tmdbId: 10747, posterPath: 'https://image.tmdb.org/t/p/w342/92BZIFPbyCPNhExyFScxA3xF1dy.jpg', imdbRating: 7.451, director: 'Eastwood', cast: 'Clint Eastwood, Chief Dan George, Sondra Locke', blurb: 'A Missouri farmer whose family is murdered by Union militiamen joins the Confederate guerrillas, refuses to surrender after the war and gathers a makeshift family as he flees; directed by and starring Clint Eastwood.' },
    ],
    appNote:
      "Westerns reward watching across the decades, from Ford's optimism to Peckinpah's blood and the Coens' dust. Save this collection to your watchlist in I Like Movies, mark each film as you watch it, and rate it so the app learns which era of the West you like best. A new themed collection lands in the Discover tab every Friday.",
    faqs: [
      {
        q: 'What are the best western movies to start with?',
        a: [
          "Stagecoach and The Searchers for John Ford's classic West, The Good, the Bad and the Ugly for Sergio Leone's Italian westerns, and Unforgiven for the genre looking back at itself. If you prefer newer films, No Country for Old Men and Hell or High Water carry the western's landscape and codes into modern settings.",
        ],
      },
      {
        q: 'What is a spaghetti western?',
        a: [
          "A western made by Italian filmmakers, mostly in the 1960s and early 1970s and often shot in Spain. Sergio Leone defined the style, often with Clint Eastwood and always with Ennio Morricone's music; Sergio Corbucci's The Great Silence is one of its darkest.",
        ],
      },
    ],
  },
  {
    slug: 'latin-american-cinema',
    title: 'Latin American cinema: 21 essential films from Los Olvidados to Birds of Passage',
    metaDescription:
      "21 essential Latin American films from Mexico, Brazil, Argentina, Chile, Cuba and Colombia, from Los Olvidados and City of God to Pan's Labyrinth, Wild Tales and Silent Light.",
    h1: 'Latin American cinema: 21 essential films',
    weekOf: '2026-09-18',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/uvitbjFU4JqvMwIkMWHp69bmUzG.jpg',
    heroPosition: 'center 10%',
    intro: [
      "Mexico's \"Three Amigos\" (Guillermo del Toro, Alejandro González Iñárritu and Alfonso Cuarón), Brazil's Cinema Novo and its heirs, Argentina's New Wave, Chile's reckoning with the Pinochet years: this collection maps seventy years of Latin American film, from Luis Buñuel's Mexico City street children in Los Olvidados (1950) to the Wayuu crime saga Birds of Passage (2018).",
      "These 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of September 18, 2026, featuring City of God, during Hispanic Heritage Month. Alongside the famous titles it reaches for harder-to-find ones: Glauber Rocha's Black God, White Devil, Tomás Gutiérrez Alea's Memories of Underdevelopment and Carlos Reygadas's Silent Light.",
    ],
    items: [
      { title: 'City of God', year: 2002, tmdbId: 598, posterPath: 'https://image.tmdb.org/t/p/w342/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg', imdbRating: 8.6, director: 'Meirelles', cast: 'Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen', blurb: 'Two boys grow up in a Rio de Janeiro favela from the 1960s to the 1980s, one becoming a photographer and the other a feared drug lord; many of its young actors were cast from the favelas themselves.' },
      { title: "Pan's Labyrinth", year: 2006, tmdbId: 1417, posterPath: 'https://image.tmdb.org/t/p/w342/7wb2Ldp0oAx1lcZvffq9RfWoI2h.jpg', imdbRating: 8.2, director: 'del Toro', cast: 'Ivana Baquero, Sergi López, Maribel Verdú', blurb: "In 1944 Spain, the young stepdaughter of a brutal Francoist captain escapes into a fairy-tale underworld where a faun sets her three tasks; Guillermo del Toro's dark fable won three Oscars." },
      { title: 'Cronos', year: 1993, tmdbId: 11655, posterPath: 'https://image.tmdb.org/t/p/w342/tQqIA8bDN7v1LmHjJg7Qh9BKCLa.jpg', imdbRating: 6.7, director: 'del Toro', cast: 'Federico Luppi, Ron Perlman, Claudio Brook', blurb: "An elderly antiques dealer in Mexico City finds a 16th-century clockwork device that grants eternal life at a vampiric cost, and a dying industrialist wants it; Guillermo del Toro's first feature." },
      { title: 'Amores perros', year: 2000, tmdbId: 55, posterPath: 'https://image.tmdb.org/t/p/w342/1lX74fPZsBoOyyE5fWL5xT7k9sV.jpg', imdbRating: 8, director: 'Iñárritu', cast: 'Emilio Echevarría, Gael García Bernal, Goya Toledo', blurb: "A car crash in Mexico City links three stories: a young man who enters his dog in dogfights, a model whose career is wrecked, and a hitman who lives with stray dogs; Alejandro González Iñárritu's first feature." },
      { title: 'Babel', year: 2006, tmdbId: 1164, posterPath: 'https://image.tmdb.org/t/p/w342/bZByZbvU7u14WjoUJERqCRW9saN.jpg', imdbRating: 7.5, director: 'Iñárritu', cast: 'Brad Pitt, Rinko Kikuchi, Adriana Barraza', blurb: "A rifle shot in the Moroccan desert sets off linked crises for an American couple on holiday, a Mexican nanny in California and a deaf teenager in Tokyo; Iñárritu's drama across three continents." },
      { title: 'Sólo con Tu Pareja', year: 1991, tmdbId: 49971, posterPath: 'https://image.tmdb.org/t/p/w342/pprKQ637rH8ClRMS75VnRtUCiL9.jpg', imdbRating: 6.8, director: 'Cuarón', cast: 'Daniel Giménez Cacho, Claudia Ramírez, Luis de Icaza', blurb: "A womanizing Mexico City copywriter is falsely told by a vengeful nurse that he has AIDS, just as he falls for his neighbor, a flight attendant; Alfonso Cuarón's first feature, a dark sex comedy." },
      { title: 'Central Station', year: 1998, tmdbId: 666, posterPath: 'https://image.tmdb.org/t/p/w342/zJvp7XjQ2LhPbDVYhFXyucs40vR.jpg', imdbRating: 8, director: 'Salles', cast: 'Fernanda Montenegro, Vinícius de Oliveira, Marília Pêra', blurb: "A cynical retired teacher who writes letters for illiterate people at Rio's central station reluctantly takes a boy across Brazil to find the father he has never met; Fernanda Montenegro was nominated for Best Actress." },
      { title: 'The Motorcycle Diaries', year: 2004, tmdbId: 1653, posterPath: 'https://image.tmdb.org/t/p/w342/qz2aBYT8CAiJYvX4fRZpJ5G0Oz1.jpg', imdbRating: 7.7, director: 'Salles', cast: 'Gael García Bernal, Rodrigo de la Serna, Mercedes Morán', blurb: 'In 1952 a young medical student, Ernesto Guevara, and his friend Alberto Granado cross South America on an old motorcycle, a journey that changes how he sees the continent; Gael García Bernal plays the future Che.' },
      { title: 'Wild Tales', year: 2014, tmdbId: 265195, posterPath: 'https://image.tmdb.org/t/p/w342/vmeCDuWJ6B2cqi9f3QFyIwRKqFV.jpg', imdbRating: 8.1, director: 'Szifron', cast: 'Ricardo Darín, Leonardo Sbaraglia, Érica Rivas', blurb: "Six standalone stories of ordinary Argentines pushed past breaking point, from road rage on a desert highway to a wedding that goes spectacularly wrong; Damián Szifron's black comedy." },
      { title: 'The Secret in Their Eyes', year: 2009, tmdbId: 25376, posterPath: 'https://image.tmdb.org/t/p/w342/dkeAwfZzwL3WvToydE3CXiY80E0.jpg', imdbRating: 8.2, director: 'Campanella', cast: 'Ricardo Darín, Soledad Villamil, Pablo Rago', blurb: 'A retired Buenos Aires court investigator writes a novel about a 1974 rape and murder case he never let go of, and the colleague he loved; winner of the Oscar for Best Foreign Language Film.' },
      { title: 'The Headless Woman', year: 2008, tmdbId: 8898, posterPath: 'https://image.tmdb.org/t/p/w342/qzDfJLfKQZY9D6zpaadFiugtphK.jpg', imdbRating: 6.5, director: 'Martel', cast: 'María Onetto, Claudia Cantero, César Bordón', blurb: "A wealthy dentist in northern Argentina hits something with her car on a lonely road and drives on, then drifts through the following days unsure whether she killed a dog or a boy; Lucrecia Martel's unsettling drama." },
      { title: 'Memories of Underdevelopment', year: 1968, tmdbId: 47576, posterPath: 'https://image.tmdb.org/t/p/w342/av7zEHpOyzmm86VPRa68zOLaBqf.jpg', imdbRating: 7.6, director: 'Alea', cast: 'Sergio Corrieri, Daisy Granados, Eslinda Núñez', blurb: 'A bourgeois writer stays in Havana after his family flees to Miami following the revolution, and watches the new Cuba with detachment and unease; Tomás Gutiérrez Alea mixes fiction with documentary footage.' },
      { title: 'Black God White Devil', year: 1964, tmdbId: 67612, posterPath: 'https://image.tmdb.org/t/p/w342/keNDV8nbgVLiCUyzObisEDxdAI4.jpg', imdbRating: 7.2, director: 'Rocha', cast: 'Geraldo del Rey, Yoná Magalhães, Othon Bastos', blurb: "In Brazil's drought-stricken northeast, a cowherd who kills his boss follows first a messianic preacher and then a bandit, hunted by a hired killer of both; Glauber Rocha's landmark of the Cinema Novo movement." },
      { title: 'Los Olvidados', year: 1950, tmdbId: 800, posterPath: 'https://image.tmdb.org/t/p/w342/cDCvmYoyqFg4CuSMtGMvCpfOIEw.jpg', imdbRating: 8.2, director: 'Buñuel', cast: 'Estela Inda, Miguel Inclán, Alfonso Mejía', blurb: "A gang of street children in the slums of Mexico City drifts into theft and violence, led by a teenager escaped from reform school; Luis Buñuel's unsentimental drama, with one famous dream sequence." },
      { title: 'Tony Manero', year: 2008, tmdbId: 33774, posterPath: 'https://image.tmdb.org/t/p/w342/moNodAj8wcthRY6jqhyIz99KBvB.jpg', imdbRating: 6.8, director: 'Larraín', cast: 'Alfredo Castro, Amparo Noguera, Paola Lattus', blurb: "In 1978 Santiago, under Pinochet, a middle-aged man obsessed with John Travolta's character in Saturday Night Fever will kill to win a TV lookalike contest; Pablo Larraín's bleak portrait of a country numbed by dictatorship." },
      { title: 'No', year: 2012, tmdbId: 110398, posterPath: 'https://image.tmdb.org/t/p/w342/Aqp4PH27zI4Uqqag41y2gXwmXma.jpg', imdbRating: 7.4, director: 'Larraín', cast: 'Gael García Bernal, Alfredo Castro, Néstor Cantillana', blurb: "An advertising man is hired by the opposition for Chile's 1988 referendum on Pinochet's rule and sells the 'No' vote like a soft drink; Gael García Bernal, shot on 1980s video cameras to blend with archive footage." },
      { title: 'Vidas Secas', year: 1963, tmdbId: 836, posterPath: 'https://image.tmdb.org/t/p/w342/bBb4GiCZul2W6hhV8sbbnBnlhuE.jpg', imdbRating: 7.5, director: 'Pereira dos Santos', cast: 'Átila Iório, Maria Ribeiro, Baleia', blurb: "A family of drifters, their dog Baleia among them, crosses the drought-stricken backlands of Brazil's northeast looking for work and somewhere to stay; Nelson Pereira dos Santos's spare Cinema Novo drama." },
      { title: 'Silent Light', year: 2007, tmdbId: 2012, posterPath: 'https://image.tmdb.org/t/p/w342/cxYo82e0JT5u7an0VRF9J8h6V5B.jpg', imdbRating: 7.2, director: 'Reygadas', cast: 'Cornelio Wall, Miriam Toews, Maria Pankratz', blurb: 'In a Mennonite farming community in northern Mexico, a married father falls in love with another woman, and his faith offers no way out; Carlos Reygadas cast Mennonites speaking their own Plautdietsch.' },
      { title: 'Birds of Passage', year: 2018, tmdbId: 438146, posterPath: 'https://image.tmdb.org/t/p/w342/fUXD9HrnDqZKnw6p1iZnyeQYShd.jpg', imdbRating: 7.5, director: 'Guerra & Gallego', cast: 'José Acosta, Carmiña Martínez, Natalia Reyes', blurb: 'In 1970s Colombia, a Wayuu family grows rich selling marijuana to Americans, and tradition, honor and the drug trade tear them apart; from Ciro Guerra and Cristina Gallego, the team behind Embrace of the Serpent.' },
      { title: 'Nostalgia for the Light', year: 2010, tmdbId: 72721, posterPath: 'https://image.tmdb.org/t/p/w342/j8NsCokx3dveFDL1YAvJPWHkrDx.jpg', imdbRating: 7.6, director: 'Guzmán', cast: 'Gaspar Galaz, Lautaro Núñez, Luís Henríquez', blurb: "In Chile's Atacama Desert, astronomers search the sky for the origins of the universe while women search the ground for the remains of relatives killed under Pinochet; Patricio Guzmán's documentary essay." },
      { title: 'The Holy Mountain', year: 1973, tmdbId: 8327, posterPath: 'https://image.tmdb.org/t/p/w342/oaOyrFD4ZyZZwjO8wc4b12XHcgZ.jpg', imdbRating: 7.7, director: 'Jodorowsky', cast: 'Alejandro Jodorowsky, Horacio Salinas, Zamira Saunders', blurb: "A Christ-like thief joins an alchemist and seven powerful, corrupt figures on a quest to the summit of a sacred mountain to gain immortality; Alejandro Jodorowsky's surreal, provocative spectacle, shot in Mexico." },
    ],
    appNote:
      "Several of these films are hard to come across by chance, especially the older Brazilian and Cuban titles. Save the collection to your watchlist in I Like Movies, mark each film as you see it, and rate it so the app learns which corner of the continent's cinema you want more of. Every Friday the Discover tab gets a new themed collection.",
    faqs: [
      {
        q: 'Where should I start with Latin American cinema?',
        a: [
          "City of God, Amores perros and Pan's Labyrinth are the usual entry points, and all three come from the boom of the 2000s. From there, The Secret in Their Eyes and Wild Tales show Argentina, Central Station and Vidas Secas show Brazil, and No shows Chile.",
        ],
      },
      {
        q: 'Who are the Three Amigos of Mexican cinema?',
        a: [
          "Guillermo del Toro, Alejandro González Iñárritu and Alfonso Cuarón, three Mexican directors and friends who all went on to win the Oscar for Best Director. This collection includes del Toro's Cronos and Pan's Labyrinth, Iñárritu's Amores perros and Babel, and Cuarón's first feature, Sólo con Tu Pareja.",
        ],
      },
    ],
  },
  {
    slug: 'tiff-audience-favorites',
    title: 'TIFF audience favorites: 21 films from Chariots of Fire to Past Lives',
    metaDescription:
      "21 films tied to the Toronto International Film Festival's audience award, from Chariots of Fire and The Princess Bride to 12 Years a Slave and Nomadland, plus three 2023 favorites.",
    h1: 'TIFF audience favorites: 21 films',
    weekOf: '2026-09-11',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/7HR38hMBl23lf38MAN63y4pKsHz.jpg',
    heroPosition: 'center 40%',
    intro: [
      "The Toronto International Film Festival's best-known prize is voted by its audience, and the People's Choice Award has become one of the most reliable early signs of an Oscar run. Eighteen of these 21 films won it, from Chariots of Fire in 1981 to Nomadland in 2020; three 2023 favorites, Past Lives, Anatomy of a Fall and The Holdovers, complete the list.",
      "These 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of September 11, 2026, featuring Past Lives and timed for the festival. Seven of the People's Choice winners here went on to win the Oscar for Best Picture.",
    ],
    items: [
      { title: 'Past Lives', year: 2023, tmdbId: 666277, posterPath: 'https://image.tmdb.org/t/p/w342/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg', imdbRating: 7.8, director: 'Song', cast: 'Greta Lee, Teo Yoo, John Magaro', blurb: "Two childhood friends, separated when her family emigrates from Seoul, meet again in New York twenty-four years later, when she is married; Celine Song's debut about the lives we might have lived." },
      { title: 'Slumdog Millionaire', year: 2008, tmdbId: 12405, posterPath: 'https://image.tmdb.org/t/p/w342/5leCCi7ZF0CawAfM5Qo2ECKPprc.jpg', imdbRating: 8, director: 'Boyle', cast: 'Dev Patel, Freida Pinto, Madhur Mittal', blurb: "A young man from the Mumbai slums, one question away from winning India's Who Wants to Be a Millionaire?, is accused of cheating, and each answer flashes back to how he learned it; winner of eight Oscars including Best Picture." },
      { title: "The King's Speech", year: 2010, tmdbId: 45269, posterPath: 'https://image.tmdb.org/t/p/w342/pVNKXVQFukBaCz6ML7GH3kiPlQP.jpg', imdbRating: 8, director: 'Hooper', cast: 'Colin Firth, Geoffrey Rush, Helena Bonham Carter', blurb: 'The future King George VI works with an unconventional Australian speech therapist to master his stammer as Britain heads toward war; Colin Firth won Best Actor and the film won Best Picture.' },
      { title: '12 Years a Slave', year: 2013, tmdbId: 76203, posterPath: 'https://image.tmdb.org/t/p/w342/xdANQijuNrJaw1HA61rDccME4Tm.jpg', imdbRating: 8.1, director: 'McQueen', cast: "Chiwetel Ejiofor, Michael Fassbender, Lupita Nyong'o", blurb: "Solomon Northup, a free Black man from New York, is kidnapped in 1841 and sold into slavery in Louisiana; Steve McQueen's film of Northup's memoir won Best Picture." },
      { title: 'Three Billboards Outside Ebbing, Missouri', year: 2017, tmdbId: 359940, posterPath: 'https://image.tmdb.org/t/p/w342/bRYLt8fV82tdVoDppSFTZIcJiLN.jpg', imdbRating: 8.1, director: 'McDonagh', cast: 'Frances McDormand, Woody Harrelson, Sam Rockwell', blurb: "A mother rents three billboards outside her small town to call out the police chief over her daughter's unsolved murder, and the town turns against her; Frances McDormand won Best Actress." },
      { title: 'Green Book', year: 2018, tmdbId: 490132, posterPath: 'https://image.tmdb.org/t/p/w342/7BsvSuDQuoqhWmU2fL7W2GOcZHU.jpg', imdbRating: 8.2, director: 'Farrelly', cast: 'Viggo Mortensen, Mahershala Ali, Linda Cardellini', blurb: 'In 1962 a Bronx bouncer is hired to drive the Black classical pianist Don Shirley on a concert tour through the segregated South, guided by the Green Book travel guide; winner of Best Picture.' },
      { title: 'Jojo Rabbit', year: 2019, tmdbId: 515001, posterPath: 'https://image.tmdb.org/t/p/w342/1mqL7VG4Ix8wmxwypmCA1HTHBky.jpg', imdbRating: 7.9, director: 'Waititi', cast: 'Roman Griffin Davis, Thomasin McKenzie, Scarlett Johansson', blurb: "A lonely boy in the Hitler Youth, whose imaginary friend is a buffoonish Adolf Hitler, discovers his mother is hiding a Jewish girl in their home; Taika Waititi's satire won the Oscar for Adapted Screenplay." },
      { title: 'Nomadland', year: 2020, tmdbId: 581734, posterPath: 'https://image.tmdb.org/t/p/w342/8Vc5EOUEIF1EUXuX9eLFf7BvN3P.jpg', imdbRating: 7.161, director: 'Zhao', cast: 'Frances McDormand, David Strathairn, Linda May', blurb: 'After losing her job and her husband, a woman in her sixties takes to the road in a van, working seasonal jobs across the American West among real-life nomads; Chloé Zhao won Best Director and the film Best Picture.' },
      { title: 'Chariots of Fire', year: 1981, tmdbId: 9443, posterPath: 'https://image.tmdb.org/t/p/w342/qnRaum8k0HqGRml2i7OawFqUtEb.jpg', imdbRating: 7.1, director: 'Hudson', cast: 'Ben Cross, Ian Charleson, Cheryl Campbell', blurb: "Two British runners, a devout Scottish missionary and a Jewish Cambridge student driven to beat prejudice, compete at the 1924 Paris Olympics; Vangelis's synthesizer score became one of the most famous film themes." },
      { title: 'The Princess Bride', year: 1987, tmdbId: 2493, posterPath: 'https://image.tmdb.org/t/p/w342/2FC9L9MrjBoGHYjYZjdWQdopVYb.jpg', imdbRating: 8, director: 'Reiner', cast: 'Cary Elwes, Robin Wright, Mandy Patinkin', blurb: "A grandfather reads his sick grandson the story of a farm boy turned pirate who must rescue his true love from an evil prince, with sword fights, a giant and a six-fingered man along the way; Rob Reiner's fairy-tale comedy." },
      { title: 'Anatomy of a Fall', year: 2023, tmdbId: 915935, posterPath: 'https://image.tmdb.org/t/p/w342/1ho0d4LNZw3Y0voeKmSvPSgJOJ2.jpg', imdbRating: 7.6, director: 'Triet', cast: 'Sandra Hüller, Swann Arlaud, Milo Machado-Graner', blurb: "When a writer's husband is found dead below their chalet in the French Alps, she is put on trial and their visually impaired son becomes the key witness; Justine Triet's courtroom drama won the Palme d'Or." },
      { title: 'Hotel Rwanda', year: 2004, tmdbId: 205, posterPath: 'https://image.tmdb.org/t/p/w342/p3pHw85UMZPegfMZBA6dZ06yarm.jpg', imdbRating: 8.1, director: 'George', cast: 'Don Cheadle, Sophie Okonedo, Nick Nolte', blurb: 'During the 1994 Rwandan genocide, a hotel manager in Kigali shelters more than a thousand refugees inside his hotel; Don Cheadle as Paul Rusesabagina.' },
      { title: 'The Holdovers', year: 2023, tmdbId: 840430, posterPath: 'https://image.tmdb.org/t/p/w342/VHSzNBTwxV8vh7wylo7O9CLdac.jpg', imdbRating: 7.9, director: 'Payne', cast: "Paul Giamatti, Dominic Sessa, Da'Vine Joy Randolph", blurb: "Over Christmas 1970 at a New England boarding school, a cranky classics teacher is stuck minding a student with nowhere to go, alongside the school's grieving head cook; Da'Vine Joy Randolph won Best Supporting Actress." },
      { title: 'Silver Linings Playbook', year: 2012, tmdbId: 82693, posterPath: 'https://image.tmdb.org/t/p/w342/fhHB1uvfFKKFbj6bTKE8xdtsjKi.jpg', imdbRating: 7.7, director: 'Russell', cast: 'Bradley Cooper, Jennifer Lawrence, Robert De Niro', blurb: 'A former teacher out of a psychiatric hospital moves back in with his parents and strikes a deal with a young widow: she helps him reach his estranged wife if he partners her in a dance competition; Jennifer Lawrence won Best Actress.' },
      { title: 'Precious', year: 2009, tmdbId: 25793, posterPath: 'https://image.tmdb.org/t/p/w342/d4ltLIDbvZskSwbzXqi0Hfv5ma4.jpg', imdbRating: 7.3, director: 'Daniels', cast: "Gabourey Sidibe, Mo'Nique, Paula Patton", blurb: "In 1987 Harlem, a pregnant, illiterate teenager abused by her mother gets a chance at an alternative school; Mo'Nique won Best Supporting Actress." },
      { title: 'The Imitation Game', year: 2014, tmdbId: 205596, posterPath: 'https://image.tmdb.org/t/p/w342/zSqJ1qFq8NXFfi7JeIYMlzyR0dx.jpg', imdbRating: 8, director: 'Tyldum', cast: 'Benedict Cumberbatch, Keira Knightley, Matthew Goode', blurb: "Mathematician Alan Turing leads the wartime team at Bletchley Park trying to break Germany's Enigma code while hiding that he is gay; Benedict Cumberbatch in a film that won the Oscar for Adapted Screenplay." },
      { title: 'Room', year: 2015, tmdbId: 264644, posterPath: 'https://image.tmdb.org/t/p/w342/2hHDMeYyZjbGWn0BeNH1cTMxuM7.jpg', imdbRating: 8.1, director: 'Abrahamson', cast: 'Brie Larson, Jacob Tremblay, Joan Allen', blurb: 'A five-year-old boy has spent his whole life in one locked shed with his mother, held captive by her kidnapper, until she plans their escape; Brie Larson won Best Actress.' },
      { title: 'Where Do We Go Now?', year: 2011, tmdbId: 77461, posterPath: 'https://image.tmdb.org/t/p/w342/crYsh9vt7ujWoI4o91bfclYp7WM.jpg', imdbRating: 7.4, director: 'Labaki', cast: 'Claude Msawbaa, Leyla Hakim, Nadine Labaki', blurb: "In an isolated Lebanese village, Christian and Muslim women scheme to keep their husbands and sons from fighting each other as sectarian violence flares nearby; Nadine Labaki's comedy-drama, with songs." },
      { title: 'Crouching Tiger, Hidden Dragon', year: 2000, tmdbId: 146, posterPath: 'https://image.tmdb.org/t/p/w342/iNDVBFNz4XyYzM9Lwip6atSTFqf.jpg', imdbRating: 7.9, director: 'Ang Lee', cast: 'Chow Yun-Fat, Michelle Yeoh, Zhang Ziyi', blurb: "A legendary sword is stolen in Qing-dynasty China, and two warriors who have never declared their love track the young noblewoman behind the theft; Ang Lee's martial-arts film won the Oscar for Best Foreign Language Film." },
      { title: 'Life Is Beautiful', year: 1998, tmdbId: 637, posterPath: 'https://image.tmdb.org/t/p/w342/74hLDKjD5aGYOotO6esUVaeISa2.jpg', imdbRating: 8.439, director: 'Benigni', cast: 'Roberto Benigni, Nicoletta Braschi, Giorgio Cantarini', blurb: 'A Jewish bookseller in 1930s Italy uses his imagination to shield his young son from the horror of a Nazi concentration camp, convincing him it is all a game; Roberto Benigni won Best Actor.' },
      { title: 'American Beauty', year: 1999, tmdbId: 14, posterPath: 'https://image.tmdb.org/t/p/w342/wby9315QzVKdW9BonAefg8jGTTb.jpg', imdbRating: 8.3, director: 'Mendes', cast: 'Kevin Spacey, Annette Bening, Thora Birch', blurb: "A suburban father in a midlife crisis quits his job, takes up weightlifting and becomes infatuated with his daughter's friend while his family comes apart; Sam Mendes's debut won Best Picture." },
    ],
    appNote:
      'Festival favorites pile up fast on a watchlist. Save this collection in I Like Movies, mark each film as you see it, and rate it so the app learns which kind of prestige film actually works for you. A new themed collection arrives in the Discover tab every Friday.',
    faqs: [
      {
        q: "What is the TIFF People's Choice Award?",
        a: [
          "It is the Toronto International Film Festival's best-known prize, chosen by audience vote. Because the festival runs in September, just as awards season starts, its winner is often an early Oscar contender: Slumdog Millionaire, The King's Speech, 12 Years a Slave, Green Book and Nomadland all won it before winning Best Picture.",
        ],
      },
      {
        q: "Which TIFF People's Choice winners won Best Picture?",
        a: [
          "Among the films here, seven: Chariots of Fire, American Beauty, Slumdog Millionaire, The King's Speech, 12 Years a Slave, Green Book and Nomadland.",
        ],
      },
    ],
  },
  {
    slug: 'movie-musicals',
    title: "Movie musicals: 21 essential films from Singin' in the Rain to La La Land",
    metaDescription:
      "21 essential movie musicals, from Singin' in the Rain, The Wizard of Oz and West Side Story to Cabaret, Moulin Rouge!, Once and La La Land, curated as a weekly collection.",
    h1: 'Movie musicals: 21 essential films',
    weekOf: '2026-09-04',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/6qOyw4yfzbzTp5YsCX26C28Do0S.jpg',
    heroPosition: 'center 25%',
    intro: [
      "A movie musical stops the story so its characters can sing what they cannot say. This collection spans the form: MGM's Technicolor classics (Singin' in the Rain, Meet Me in St. Louis, An American in Paris), Broadway adaptations from My Fair Lady to Chicago, the rock operas and cult favorites of the 1970s, a Hindi epic, and Damien Chazelle's La La Land.",
      "These 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of September 4, 2026, featuring Singin' in the Rain. The list runs from The Wizard of Oz in 1939 to Bradley Cooper's A Star Is Born in 2018, with Disney's The Lion King along the way.",
    ],
    items: [
      { title: "Singin' in the Rain", year: 1952, tmdbId: 872, posterPath: 'https://image.tmdb.org/t/p/w342/671EPwBsHGHBk0cdOeZqmOK0XB3.jpg', imdbRating: 8.3, director: 'Donen & Kelly', cast: "Gene Kelly, Donald O'Connor, Debbie Reynolds", blurb: "As Hollywood switches to talking pictures in 1927, a silent star, his wisecracking pal and a young chorus girl try to rescue a disastrous first talkie; the title number, danced in a downpour, is Gene Kelly's signature." },
      { title: 'The Wizard of Oz', year: 1939, tmdbId: 630, posterPath: 'https://image.tmdb.org/t/p/w342/uCC3j4pV9eOZwzDUWp2ilbcTf1f.jpg', imdbRating: 8.1, director: 'Fleming', cast: 'Judy Garland, Ray Bolger, Jack Haley', blurb: "A Kansas farm girl is carried by a tornado to the land of Oz and follows the yellow brick road with a scarecrow, a tin man and a cowardly lion to find her way home; Judy Garland sings 'Over the Rainbow'." },
      { title: 'An American in Paris', year: 1951, tmdbId: 2769, posterPath: 'https://image.tmdb.org/t/p/w342/lyDXkvG53ldz6Cf7dbjJl7TaoP5.jpg', imdbRating: 7.1, director: 'Minnelli', cast: 'Gene Kelly, Leslie Caron, Oscar Levant', blurb: 'An American ex-soldier painting in postwar Paris falls for a young French woman already promised to someone else; it ends with a long ballet set to Gershwin, and it won the Oscar for Best Picture.' },
      { title: 'Meet Me in St. Louis', year: 1944, tmdbId: 909, posterPath: 'https://image.tmdb.org/t/p/w342/ekVeUvG81pidsv2LMtWf5yYcNbq.jpg', imdbRating: 7.5, director: 'Minnelli', cast: "Judy Garland, Margaret O'Brien, Mary Astor", blurb: "Over one year in 1903 St. Louis, a family's four daughters fall in and out of love as the city prepares for the World's Fair, and a move to New York threatens it all; Judy Garland introduced 'Have Yourself a Merry Little Christmas'." },
      { title: 'A Star Is Born', year: 2018, tmdbId: 332562, posterPath: 'https://image.tmdb.org/t/p/w342/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg', imdbRating: 7.6, director: 'Cooper', cast: 'Lady Gaga, Bradley Cooper, Sam Elliott', blurb: "A hard-drinking country-rock star discovers a singer-songwriter in a drag bar and helps launch her career as his own falls apart; Bradley Cooper's directing debut, with Lady Gaga, and the fourth film of the story." },
      { title: 'My Fair Lady', year: 1964, tmdbId: 11113, posterPath: 'https://image.tmdb.org/t/p/w342/bTXVc29lGSNclf94VIZ49W4gGKl.jpg', imdbRating: 7.7, director: 'Cukor', cast: 'Audrey Hepburn, Rex Harrison, Stanley Holloway', blurb: "A phonetics professor bets he can pass off a Cockney flower seller as a duchess by teaching her to speak 'properly'; Audrey Hepburn and Rex Harrison in Lerner and Loewe's musical of Shaw's Pygmalion, winner of Best Picture." },
      { title: 'West Side Story', year: 1961, tmdbId: 1725, posterPath: 'https://image.tmdb.org/t/p/w342/nzCMu6D5q60i2bVrIQ0DxlRSgCZ.jpg', imdbRating: 7.6, director: 'Wise & Robbins', cast: 'Natalie Wood, Richard Beymer, Russ Tamblyn', blurb: "Romeo and Juliet moved to the rival street gangs of New York's Upper West Side, where a former Jet falls for the sister of the Sharks' leader; Leonard Bernstein's score, Jerome Robbins's choreography, and ten Oscars." },
      { title: 'The Sound of Music', year: 1965, tmdbId: 15121, posterPath: 'https://image.tmdb.org/t/p/w342/c6CrUZypAsBCaRWX0M3RVRDbhNS.jpg', imdbRating: 8.1, director: 'Wise', cast: 'Julie Andrews, Christopher Plummer, Eleanor Parker', blurb: "A postulant who does not fit in at her Salzburg abbey becomes governess to a widowed naval captain's seven children as the Nazis annex Austria; Julie Andrews in the Rodgers and Hammerstein musical, shot on location." },
      { title: 'Cabaret', year: 1972, tmdbId: 10784, posterPath: 'https://image.tmdb.org/t/p/w342/fMhOeJ2TvuY46iYGmsowhgRXfnr.jpg', imdbRating: 7.8, director: 'Fosse', cast: 'Liza Minnelli, Michael York, Helmut Griem', blurb: "In 1931 Berlin, an American singer at the seedy Kit Kat Club and a British writer begin an affair as the Nazis rise outside; Liza Minnelli and Joel Grey, with almost every song performed on the club's stage." },
      { title: 'School of Rock', year: 2003, tmdbId: 1584, posterPath: 'https://image.tmdb.org/t/p/w342/zXLXaepIBvFVLU25DH3wv4IPSbe.jpg', imdbRating: 7.2, director: 'Linklater', cast: 'Jack Black, Joan Cusack, Mike White', blurb: 'A broke rock guitarist poses as a substitute teacher at a prep school and secretly turns his fifth-grade class into a rock band; Jack Black, with a cast of kids who play their own instruments.' },
      { title: 'Mughal-e-Azam', year: 1960, tmdbId: 44519, posterPath: 'https://image.tmdb.org/t/p/w342/lKfNZUh9CRp1EHjxgNGtrbvm55.jpg', imdbRating: 8.1, director: 'K. Asif', cast: 'Dilip Kumar, Prithviraj Kapoor, Madhubala', blurb: "A Mughal prince falls for a court dancer, and his father, the emperor Akbar, will go to war with his own son to stop the marriage; K. Asif's lavish Hindi epic, more than a decade in the making." },
      { title: 'La La Land', year: 2016, tmdbId: 313369, posterPath: 'https://image.tmdb.org/t/p/w342/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg', imdbRating: 8, director: 'Chazelle', cast: 'Ryan Gosling, Emma Stone, John Legend', blurb: "A jazz pianist and an aspiring actress fall in love in Los Angeles while chasing careers that start pulling them in different directions; Ryan Gosling and Emma Stone in Damien Chazelle's tribute to old Hollywood musicals." },
      { title: 'Moulin Rouge!', year: 2001, tmdbId: 824, posterPath: 'https://image.tmdb.org/t/p/w342/2kjM5CUZRIU5yOANUowrbJcRL9L.jpg', imdbRating: 7.6, director: 'Luhrmann', cast: 'Ewan McGregor, Nicole Kidman, John Leguizamo', blurb: "A penniless English poet falls for the star courtesan of the Moulin Rouge in 1899 Paris while a jealous duke funds the club's new show; Baz Luhrmann sets the story to pop songs from Elton John to Nirvana." },
      { title: 'The Rocky Horror Picture Show', year: 1975, tmdbId: 36685, posterPath: 'https://image.tmdb.org/t/p/w342/3pyE6ZqDbuJi7zrNzzQzcKTWdmN.jpg', imdbRating: 7.4, director: 'Sharman', cast: 'Tim Curry, Susan Sarandon, Barry Bostwick', blurb: 'A newly engaged couple with a flat tire seek help at a castle where a mad scientist from another planet is about to unveil his creation; the cult musical whose fans still dress up and talk back at midnight screenings.' },
      { title: 'The Blues Brothers', year: 1980, tmdbId: 525, posterPath: 'https://image.tmdb.org/t/p/w342/b0hq1d2d7FIvRGNLewKLm79JNTK.jpg', imdbRating: 7.9, director: 'Landis', cast: 'John Belushi, Dan Aykroyd, James Brown', blurb: 'Two brothers fresh out of prison set out to raise $5,000 for the Catholic orphanage that raised them by getting their old band back together, wrecking half of Chicago on the way; with James Brown, Aretha Franklin and Ray Charles.' },
      { title: 'Jesus Christ Superstar', year: 1973, tmdbId: 12545, posterPath: 'https://image.tmdb.org/t/p/w342/2NQgIjHxYyMJZWeUFH5cuKhN4nh.jpg', imdbRating: 7.4, director: 'Jewison', cast: 'Ted Neeley, Carl Anderson, Yvonne Elliman', blurb: "The last week of Jesus's life, seen largely through the eyes of Judas, staged as a rock opera by a troupe of young performers who arrive by bus in the desert; Andrew Lloyd Webber and Tim Rice's songs." },
      { title: 'Chicago', year: 2002, tmdbId: 1574, posterPath: 'https://image.tmdb.org/t/p/w342/3ED8cWCXY9zkx77Sd0N5qMbsdDP.jpg', imdbRating: 7.2, director: 'Marshall', cast: 'Renée Zellweger, Catherine Zeta-Jones, Richard Gere', blurb: "In 1920s Chicago, a would-be singer who shot her lover and a vaudeville star accused of double murder compete for headlines and a slick lawyer's attention; the numbers play out in the heroine's imagination, and it won Best Picture." },
      { title: 'Once', year: 2007, tmdbId: 5723, posterPath: 'https://image.tmdb.org/t/p/w342/7nW363kSYRCkr4VGOMvuSGwtzKs.jpg', imdbRating: 7.8, director: 'Carney', cast: 'Glen Hansard, Markéta Irglová, Hugh Walsh', blurb: "A Dublin street musician and a Czech immigrant who sells flowers spend a week writing and recording songs together; made on a tiny budget, it won the Oscar for Best Original Song with 'Falling Slowly'." },
      { title: 'Hedwig and the Angry Inch', year: 2001, tmdbId: 13403, posterPath: 'https://image.tmdb.org/t/p/w342/jafIFAW8sHQkzWPGoMDR4892dFI.jpg', imdbRating: 7.7, director: 'Mitchell', cast: 'John Cameron Mitchell, Miriam Shor, Stephen Trask', blurb: 'An East German rock singer left with a botched gender-reassignment surgery tours chain restaurants with her band, telling her life story and shadowing the former lover who stole her songs; John Cameron Mitchell, from his own stage show.' },
      { title: 'The Lion King', year: 1994, tmdbId: 8587, posterPath: 'https://image.tmdb.org/t/p/w342/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg', imdbRating: 8.5, director: 'Allers & Minkoff', cast: 'Matthew Broderick, Moira Kelly, Jeremy Irons', blurb: "A lion cub flees his kingdom after his uncle murders his father and lets the cub believe he was to blame, then must return as an adult to reclaim his place; Disney's animated musical, with songs by Elton John and Tim Rice." },
      { title: 'Grease', year: 1978, tmdbId: 621, posterPath: 'https://image.tmdb.org/t/p/w342/2rM7fQKpb7cs1Iq7IBqub9LFDzJ.jpg', imdbRating: 7.367, director: 'Kleiser', cast: 'Olivia Newton-John, John Travolta, Stockard Channing', blurb: 'A greaser and a wholesome Australian transfer student who fell for each other over the summer try again at Rydell High, where their cliques get in the way; John Travolta and Olivia Newton-John.' },
    ],
    appNote:
      'Musicals are easy to start and hard to stop. Save the collection to your watchlist in I Like Movies, tick each film off as you go, and rate it so the app learns whether you lean toward golden-age MGM or rock opera. Every Friday the Discover tab gets a new themed collection.',
    faqs: [
      {
        q: 'What are the best movie musicals of all time?',
        a: [
          "There is no single list, but a few appear on nearly all of them: Singin' in the Rain, The Wizard of Oz, West Side Story and The Sound of Music. Five films here won the Oscar for Best Picture: An American in Paris, West Side Story, My Fair Lady, The Sound of Music and Chicago.",
        ],
      },
      {
        q: "Where should I start with musicals if I usually don't like them?",
        a: [
          'Pick one where the songs have a reason to happen: Cabaret keeps almost every number on its nightclub stage, Once is about two musicians writing songs, and School of Rock and The Blues Brothers are comedies first. They ease you in before the classics.',
        ],
      },
    ],
  },
  {
    slug: 'mafia-cinema',
    title: 'Mafia cinema: 21 essential films from The Godfather to Gomorrah',
    metaDescription:
      '21 essential mafia and gangster films, from The Godfather and Once Upon a Time in America to Election, New World and Gomorrah, curated as a weekly collection.',
    h1: 'Mafia cinema: 21 essential films',
    weekOf: '2026-08-28',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/ejdD20cdHNFAYAN2DlqPToXKyzx.jpg',
    heroPosition: 'center 35%',
    intro: [
      "No genre has given cinema a deeper mythology of capital and family: Coppola's olive oil and operas, Scorsese's wiseguys, Leone's dynasties remembered through opium smoke, Garrone's Camorra stripped of every last piece of glamour.",
      'This collection of 21 films runs as the weekly theme in the I Like Movies Discover tab for the week of August 28, 2026, featuring The Godfather. It deliberately leaves America too: Hong Kong (Election), Korea (New World), Japan (Battles Without Honor and Humanity) and Italy\'s own reckonings (Gomorrah, Il Divo).',
    ],
    items: [
      { title: 'The Godfather', year: 1972, tmdbId: 238, posterPath: 'https://image.tmdb.org/t/p/w342/3bhkrj58Vtu7enYsRolD1fZdja1.jpg', imdbRating: 9.2, director: 'Coppola', cast: 'Marlon Brando, Al Pacino, James Caan', blurb: "An aging don's youngest son, the one meant to stay clean, is pulled into the family business by an assassination attempt; the standard against which American cinema measures itself." },
      { title: 'The Godfather Part II', year: 1974, tmdbId: 240, posterPath: 'https://image.tmdb.org/t/p/w342/sSuQTCZwqKrNBNIsksO9IAUoWP9.jpg', imdbRating: 9, director: 'Coppola', cast: 'Al Pacino, Robert Duvall, Diane Keaton', blurb: 'Michael consolidates the empire and loses everything human in it, while flashbacks trace his father\'s rise from Sicilian orphan to Don; the argument-ending sequel.' },
      { title: 'Casino', year: 1995, tmdbId: 524, posterPath: 'https://image.tmdb.org/t/p/w342/gziIkUSnYuj9ChCi8qOu2ZunpSC.jpg', imdbRating: 8.2, director: 'Scorsese', cast: 'Robert De Niro, Sharon Stone, Joe Pesci', blurb: 'A handicapper runs a Las Vegas casino for the mob while his enforcer friend and his hustler wife burn it all down; a glittering, brutal autopsy of how the mob lost Vegas.' },
      { title: 'The Irishman', year: 2019, tmdbId: 398978, posterPath: 'https://image.tmdb.org/t/p/w342/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg', imdbRating: 7.8, director: 'Scorsese', cast: 'Robert De Niro, Al Pacino, Joe Pesci', blurb: "A truck driver becomes a mob hitman and Jimmy Hoffa's confidant across five decades, narrated from a nursing home; three and a half hours about what loyalty leaves you with." },
      { title: 'Once Upon a Time in America', year: 1984, tmdbId: 311, posterPath: 'https://image.tmdb.org/t/p/w342/i0enkzsL5dPeneWnjl1fCWm6L7k.jpg', imdbRating: 8.3, director: 'Leone', cast: 'Robert De Niro, James Woods, Elizabeth McGovern', blurb: 'Jewish gangsters rise from the Lower East Side through Prohibition, remembered in an opium haze by the survivor who betrayed them; Leone\'s four-hour farewell to cinema.' },
      { title: 'Scarface', year: 1983, tmdbId: 111, posterPath: 'https://image.tmdb.org/t/p/w342/iQ5ztdjvteGeboxtmRdXEChJOHh.jpg', imdbRating: 8.3, director: 'De Palma', cast: 'Al Pacino, Steven Bauer, Michelle Pfeiffer', blurb: "A Cuban refugee claws his way to the top of Miami's cocaine trade and machine-guns his way out of it; operatic excess that became hip-hop's favorite film." },
      { title: 'The Untouchables', year: 1987, tmdbId: 117, posterPath: 'https://image.tmdb.org/t/p/w342/tPq0R4jTO4Ey8ZspFaWK9wGA4Ls.jpg', imdbRating: 7.8, director: 'De Palma', cast: 'Kevin Costner, Sean Connery, Robert De Niro', blurb: "Eliot Ness assembles a small incorruptible team to bring down Al Capone in Prohibition Chicago; Connery's Oscar, Morricone's score, the station-steps shootout." },
      { title: 'Donnie Brasco', year: 1997, tmdbId: 9366, posterPath: 'https://image.tmdb.org/t/p/w342/xtKLvpOfARi1XVm8u2FTdhY5Piq.jpg', imdbRating: 7.7, director: 'Newell', cast: 'Johnny Depp, Al Pacino, Michael Madsen', blurb: 'An FBI agent infiltrates the Bonanno family so deeply that betraying his aging mob mentor starts to feel like the real crime; from a true infiltration.' },
      { title: 'A Bronx Tale', year: 1993, tmdbId: 1607, posterPath: 'https://image.tmdb.org/t/p/w342/sDbO6LmLYtyqAoFTPpRcMgPSCEO.jpg', imdbRating: 7.8, director: 'De Niro', cast: 'Robert De Niro, Chazz Palminteri, Lillo Brancato', blurb: "A bus driver's son grows up torn between his honest father and the neighborhood boss who half-adopts him; De Niro directing Chazz Palminteri's own childhood." },
      { title: "Miller's Crossing", year: 1990, tmdbId: 379, posterPath: 'https://image.tmdb.org/t/p/w342/mbFUr8hTOzrBCgAekAVRiXYgj2H.jpg', imdbRating: 7.7, director: 'Coen', cast: 'Gabriel Byrne, Marcia Gay Harden, John Turturro', blurb: 'A gang war over one doomed bookie forces a fixer to play both bosses against each other; the Coens\' dense, double-crossing gangster noir.' },
      { title: 'Eastern Promises', year: 2007, tmdbId: 2252, posterPath: 'https://image.tmdb.org/t/p/w342/nLwv1pxRCRZucQaqs6oPkq7HH3K.jpg', imdbRating: 7.6, director: 'Cronenberg', cast: 'Viggo Mortensen, Naomi Watts, Vincent Cassel', blurb: "A London midwife holding a dead girl's diary crosses the Russian mob, whose tattooed driver is not what he seems; contains the legendary bathhouse fight." },
      { title: 'Gomorrah', year: 2008, tmdbId: 8882, posterPath: 'https://image.tmdb.org/t/p/w342/3XcCTqSovFZE5GRebJmh1kHwziw.jpg', imdbRating: 7, director: 'Garrone', cast: 'Toni Servillo, Gianfelice Imparato, Maria Nazionale', blurb: "Five threads inside Naples' Camorra, from toxic-waste dumping to teenage soldiers, with every scrap of gangster glamour removed; the book's author still lives under guard." },
      { title: 'The Long Good Friday', year: 1980, tmdbId: 14807, posterPath: 'https://image.tmdb.org/t/p/w342/pXS667me5Jfoj1b0xuxgjEMKunF.jpg', imdbRating: 7.5, director: 'Mackenzie', cast: 'Bob Hoskins, Helen Mirren, Dave King', blurb: 'A London gang lord about to go legitimate with American money watches his empire get bombed apart over one Good Friday; Bob Hoskins\' star-making slow burn.' },
      { title: 'The Public Enemy', year: 1931, tmdbId: 17687, posterPath: 'https://image.tmdb.org/t/p/w342/vVxdaRMprQO2DM4AFyJ6C4qZSFO.jpg', imdbRating: 7.6, director: 'Wellman', cast: 'James Cagney, Jean Harlow, Edward Woods', blurb: 'A street kid rises through Prohibition bootlegging, a grapefruit meets a face, and the ending is one of the genre\'s coldest; the 1931 template.' },
      { title: 'Atlantic City', year: 1980, tmdbId: 23954, posterPath: 'https://image.tmdb.org/t/p/w342/t7COhy9HkznR0gcdhTNwtHmBN31.jpg', imdbRating: 7.3, director: 'Malle', cast: 'Burt Lancaster, Susan Sarandon, Kate Reid', blurb: 'An aging numbers runner who never mattered gets one real chance at crime and romance as old Atlantic City is demolished around him; Burt Lancaster\'s late masterpiece.' },
      { title: 'Election', year: 2005, tmdbId: 18747, posterPath: 'https://image.tmdb.org/t/p/w342/js9w4pQNJq9si5AlwdvojBfC9Ml.jpg', imdbRating: 7.1, director: 'Johnnie To', cast: 'Simon Yam, Tony Leung Ka-fai, Louis Koo', blurb: 'Triad bosses maneuver over the election of a new chairman, and the society\'s ancient baton becomes worth killing for; Hong Kong\'s cold, procedural answer to The Godfather.' },
      { title: 'New World', year: 2013, tmdbId: 165213, posterPath: 'https://image.tmdb.org/t/p/w342/v6wvLIF2X9juSXsBb5Ch6tU2LOK.jpg', imdbRating: 7.5, director: 'Park Hoon-jung', cast: 'Lee Jung-jae, Choi Min-sik, Hwang Jung-min', blurb: 'A police mole rises so high in a Korean crime conglomerate that both sides prepare to burn him; a succession thriller with an ending people argue about for days.' },
      { title: 'Battles Without Honor and Humanity', year: 1973, tmdbId: 34326, posterPath: 'https://image.tmdb.org/t/p/w342/qQmEEj5B3bTQI8Dq8u4zq80Z7JL.jpg', imdbRating: 7.4, director: 'Fukasaku', cast: 'Bunta Sugawara, Hiroki Matsukata, Kunie Tanaka', blurb: 'Yakuza factions in postwar Hiroshima betray each other in semi-documentary sprawl; the film that demolished Japan\'s honorable-gangster myth.' },
      { title: 'Il Divo', year: 2008, tmdbId: 8832, posterPath: 'https://image.tmdb.org/t/p/w342/vhvn9FYhDn8hVjFibiQuFVtDzgx.jpg', imdbRating: 7.2, director: 'Sorrentino', cast: 'Toni Servillo, Anna Bonaiuto, Giulio Bosetti', blurb: 'A surreal portrait of Giulio Andreotti, seven-time Italian prime minister, and the web of Mafia trials and murders around him; Sorrentino at his most electric.' },
      { title: 'King of New York', year: 1990, tmdbId: 9558, posterPath: 'https://image.tmdb.org/t/p/w342/1MyH4MJAJZJbb6wDVeOc2bTECtK.jpg', imdbRating: 6.9, director: 'Ferrara', cast: 'Christopher Walken, David Caruso, Laurence Fishburne', blurb: 'A drug lord fresh out of prison sets about funding a hospital with cocaine money while detectives decide the law is not enough; Christopher Walken at his most elegantly reptilian.' },
      { title: 'The Krays', year: 1990, tmdbId: 21344, posterPath: 'https://image.tmdb.org/t/p/w342/e7GqmnQJRWXYs8Y8uXma6p7Amcw.jpg', imdbRating: 6, director: 'Medak', cast: 'Gary Kemp, Martin Kemp, Billie Whitelaw', blurb: "Twin brothers rule London's East End through the sixties with matching suits and psychotic tempers; the true story of Ronnie and Reggie Kray." },
    ],
    appNote:
      'Half of these are three-hour commitments, and a watchlist turns the canon into a plan. Keep the collection in I Like Movies, mark films as you go, and rate them so your recommendations learn your taste. A new themed collection lands in the Discover tab every Friday.',
    faqs: [
      {
        q: 'What should I watch after The Godfather films?',
        a: [
          'Once Upon a Time in America for the elegy, Casino for the machinery of the business, and Gomorrah for the corrective: what organized crime looks like with the myth removed.',
        ],
      },
      {
        q: 'Is Scarface a remake?',
        a: [
          "Yes, of Howard Hawks' 1932 gangster classic, relocated from Prohibition Chicago to cocaine-era Miami. De Palma's version was savaged on release and canonized later.",
        ],
      },
    ],
  },
  {
    slug: 'female-auteurs',
    title: '21 essential films by female directors, from The Piano to Jeanne Dielman',
    metaDescription:
      '21 essential films by female directors, from The Piano and Jeanne Dielman to Beau Travail, Lost in Translation and Toni Erdmann, curated as a weekly collection.',
    h1: '21 essential films by female directors',
    weekOf: '2026-08-21',
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/c2O99arhWcuLexMHiuRfSuDMpYm.jpg',
    heroPosition: 'center 40%',
    intro: [
      'Auteur theory was never about gender, and these directors proved it: Chantal Akerman making three hours of housework the most radical film of its decade, Varda wandering with her camera, Campion\'s pianos, Ramsay filming grief like a wound that will not close. In 2022, Sight and Sound\'s critics\' poll crowned Jeanne Dielman the greatest film ever made.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of August 21, 2026, featuring The Piano. It carries two films each from Campion, Ramsay and Bigelow, who was the only woman to win the Best Director Oscar until Chloé Zhao in 2021.',
    ],
    items: [
      { title: 'The Piano', year: 1993, tmdbId: 713, posterPath: 'https://image.tmdb.org/t/p/w342/rx8RKXn8OtuS6lqloYsjyrGOUp4.jpg', imdbRating: 7.5, director: 'Campion', cast: 'Holly Hunter, Harvey Keitel, Sam Neill', blurb: 'A mute Scottish bride arrives in colonial New Zealand with her daughter and her piano, and starts a dangerous bargain to win the instrument back, key by key.' },
      { title: 'The Power of the Dog', year: 2021, tmdbId: 600583, posterPath: 'https://image.tmdb.org/t/p/w342/kEy48iCzGnp0ao1cZbNeWR6yIhC.jpg', imdbRating: 6.8, director: 'Campion', cast: 'Benedict Cumberbatch, Kodi Smit-McPhee, Kirsten Dunst', blurb: "On a 1920s Montana ranch, a brilliant, cruel cattleman wages psychological war on his brother's new wife and her gentle son, until the film reveals who is really hunting whom." },
      { title: 'Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles', year: 1975, tmdbId: 44012, posterPath: 'https://image.tmdb.org/t/p/w342/fqfSu8Y1YSVFkoCJyiTXI6woYma.jpg', imdbRating: 7.4, director: 'Akerman', cast: 'Delphine Seyrig, Jan Decorte, Henri Storck', blurb: 'Three days in the life of a widowed mother, shown in near real time: cooking, errands, and quiet routine, filmed so precisely that the smallest crack in it lands like a thunderclap.' },
      { title: 'Vagabond', year: 1985, tmdbId: 44018, posterPath: 'https://image.tmdb.org/t/p/w342/2KFfwiPct1hwqi9dkKqoom0BenC.jpg', imdbRating: 7.6, director: 'Varda', cast: 'Sandrine Bonnaire, Macha Méril, Yolande Moreau', blurb: 'A young woman is found frozen in a ditch in the south of France, and the film traces her last weeks on the road through the people who met her and mostly failed her.' },
      { title: 'We Need to Talk About Kevin', year: 2011, tmdbId: 71859, posterPath: 'https://image.tmdb.org/t/p/w342/AtdYbs1SqYwFOLyi2v6ldVTawbn.jpg', imdbRating: 7.4, director: 'Ramsay', cast: 'Tilda Swinton, John C. Reilly, Ezra Miller', blurb: 'After her son commits a school massacre, a mother replays his childhood in fragments, asking whether he was born wrong or whether she failed to love him.' },
      { title: 'You Were Never Really Here', year: 2017, tmdbId: 398181, posterPath: 'https://image.tmdb.org/t/p/w342/nx4lUyQNEzJowcF55VAP0TQEaX0.jpg', imdbRating: 6.7, director: 'Ramsay', cast: 'Joaquin Phoenix, Judith Roberts, Ekaterina Samsonov', blurb: 'A traumatized veteran who rescues trafficked children with a hammer takes a job that goes wrong; a hitman thriller compressed into pure nerves and almost no violence shown on screen.' },
      { title: 'The Hurt Locker', year: 2008, tmdbId: 12162, posterPath: 'https://image.tmdb.org/t/p/w342/io2dfBJhasvGbgkCX9cCGVOiA99.jpg', imdbRating: 7.5, director: 'Bigelow', cast: 'Jeremy Renner, Anthony Mackie, Brian Geraghty', blurb: 'An American bomb-disposal technician in Baghdad takes risks his teammates cannot understand, because defusing bombs is the only thing that makes him feel alive.' },
      { title: 'Zero Dark Thirty', year: 2012, tmdbId: 97630, posterPath: 'https://image.tmdb.org/t/p/w342/wNSdSSxowM3WIqmPJNg3RagYbwP.jpg', imdbRating: 7.4, director: 'Bigelow', cast: 'Jessica Chastain, Jason Clarke, Joel Edgerton', blurb: 'A young CIA analyst spends a decade obsessively tracking Osama bin Laden, through torture rooms, dead ends and bureaucracy, to a night-vision raid told with documentary cool.' },
      { title: 'Lost in Translation', year: 2003, tmdbId: 153, posterPath: 'https://image.tmdb.org/t/p/w342/3jCLmYDIIiSMPujbwygNpqdpM8N.jpg', imdbRating: 7.7, director: 'Sofia Coppola', cast: 'Bill Murray, Scarlett Johansson, Giovanni Ribisi', blurb: 'A fading movie star and a newlywed young woman, both stranded in a Tokyo hotel, strike up a short friendship that hovers just short of romance.' },
      { title: 'Lady Bird', year: 2017, tmdbId: 391713, posterPath: 'https://image.tmdb.org/t/p/w342/gl66K7zRdtNYGrxyS2YDUP5ASZd.jpg', imdbRating: 7.4, director: 'Gerwig', cast: 'Saoirse Ronan, Laurie Metcalf, Tracy Letts', blurb: 'A restless Catholic-school senior in Sacramento fights with her mother, tries on identities and dreams of escaping to New York; funny, specific and forgiving to everyone.' },
      { title: 'Beau Travail', year: 1999, tmdbId: 14626, posterPath: 'https://image.tmdb.org/t/p/w342/5ySa1aQaT7kMcAbKwlS1HXxp2hM.jpg', imdbRating: 7.1, director: 'Denis', cast: 'Denis Lavant, Michel Subor, Grégoire Colin', blurb: 'A French Foreign Legion sergeant in Djibouti is consumed by jealousy of a beautiful young recruit; military drills become choreography, and the final dance scene is legendary.' },
      { title: 'Toni Erdmann', year: 2016, tmdbId: 374475, posterPath: 'https://image.tmdb.org/t/p/w342/v3gf7T8hb8aYv05X2jHmxJQWPZr.jpg', imdbRating: 7.3, director: 'Ade', cast: 'Sandra Hüller, Peter Simonischek, Michael Wittenborn', blurb: 'A retired prankster father, worried his corporate-consultant daughter has forgotten how to live, invades her Bucharest work life wearing false teeth and a wig; a nearly three-hour German comedy that earns it.' },
      { title: 'Fish Tank', year: 2009, tmdbId: 24469, posterPath: 'https://image.tmdb.org/t/p/w342/rI3MKBDsWzQHi9PWDAMKkgmYcff.jpg', imdbRating: 7.3, director: 'Arnold', cast: 'Katie Jarvis, Michael Fassbender, Kierston Wareing', blurb: "A volatile fifteen-year-old on an Essex council estate dreams of dancing, then gets dangerously entangled with her mother's charming new boyfriend." },
      { title: 'Daughters of the Dust', year: 1991, tmdbId: 68427, posterPath: 'https://image.tmdb.org/t/p/w342/sk5qednzLeDZMIhto6Oa9QFKOon.jpg', imdbRating: 6.6, director: 'Dash', cast: 'Cora Lee Day, Alva Rogers, Barbara O. Jones', blurb: 'In 1902, a Gullah family on a South Carolina sea island gathers before migrating north, weighing the old ways against the new; told in images that move like memory rather than plot.' },
      { title: 'Salaam Bombay!', year: 1988, tmdbId: 45129, posterPath: 'https://image.tmdb.org/t/p/w342/405GFXA7NKwVxqP9WHD5RaKZ84C.jpg', imdbRating: 7.9, director: 'Nair', cast: 'Shafiq Syed, Hansa Vithal, Chanda Sharma', blurb: "A boy abandoned by his family survives among Bombay's street children, tea stalls and brothels, played by real street kids the production trained." },
      { title: 'Wendy and Lucy', year: 2008, tmdbId: 8942, posterPath: 'https://image.tmdb.org/t/p/w342/cVtF8SW4zMbculTXD52RDvmQAAR.jpg', imdbRating: 7.1, director: 'Reichardt', cast: 'Michelle Williams, Wally Dalton, Larry Fessenden', blurb: 'A young woman driving to Alaska for work is stranded in Oregon when her car dies and her dog disappears; a small, devastating film about being one setback from the edge.' },
      { title: 'Orlando', year: 1992, tmdbId: 9300, posterPath: 'https://image.tmdb.org/t/p/w342/seRawEs8eQ8rWfkBm6QC39EQEAU.jpg', imdbRating: 7.1, director: 'Potter', cast: 'Tilda Swinton, Billy Zane, Lothaire Bluteau', blurb: "Tilda Swinton plays a nobleman who lives four hundred years and wakes up one morning as a woman; Virginia Woolf's gender-hopping fantasy made playful and gorgeous." },
      { title: 'Seven Beauties', year: 1975, tmdbId: 37550, posterPath: 'https://image.tmdb.org/t/p/w342/i0ZLApe4mIQWopELhEPxOQziDBh.jpg', imdbRating: 7.7, director: 'Wertmüller', cast: 'Giancarlo Giannini, Fernando Rey, Shirley Stoler', blurb: 'A preening Neapolitan small-timer survives the war and a concentration camp by selling off every scrap of his dignity; a comedy that turns pitch black.' },
      { title: "Boys Don't Cry", year: 1999, tmdbId: 226, posterPath: 'https://image.tmdb.org/t/p/w342/eB505ycEhFVfMwGglIzXNUyKAIs.jpg', imdbRating: 7.5, director: 'Peirce', cast: 'Hilary Swank, Chloë Sevigny, Peter Sarsgaard', blurb: 'The true story of Brandon Teena, a young trans man building a new life in small-town Nebraska, and the friends and lovers who embraced and then betrayed him.' },
      { title: 'La Ciénaga', year: 2001, tmdbId: 58429, posterPath: 'https://image.tmdb.org/t/p/w342/fcgRKfCRudyWggyHIT9LOPgU3qW.jpg', imdbRating: 7, director: 'Martel', cast: 'Mercedes Morán, Graciela Borges, Martín Adjemián', blurb: 'Two middle-class Argentine families drift through a sweltering summer of gin, minor injuries and a filthy swimming pool, while dread gathers like the humidity.' },
      { title: 'Selma', year: 2014, tmdbId: 273895, posterPath: 'https://image.tmdb.org/t/p/w342/2QyUcitU0hrxy6B2zkyJ0EhNlqm.jpg', imdbRating: 7.4, director: 'DuVernay', cast: 'David Oyelowo, Carmen Ejogo, Tom Wilkinson', blurb: 'Martin Luther King Jr. plans the 1965 Selma-to-Montgomery voting-rights marches, negotiating with presidents, rivals and his own exhausted movement scene by scene.' },
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
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/zOO8GRa02x9o1iGOIIAJD50YcMW.jpg',
    heroPosition: 'center 40%',
    intro: [
      "Before streaming turned true crime into wallpaper, the eighties turned real cases into cinema: Michael Mann's FBI profiler lit in neon, Lumet's police corruption epics, a Berlin station kid shooting up in Christiane F., Brazil's street children in Pixote, cast from the streets and returned to them.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of August 14, 2026, featuring Manhunter, the first Hannibal Lecktor film and the stylistic blueprint for two decades of serial-killer cinema.',
    ],
    items: [
      { title: 'Manhunter', year: 1986, tmdbId: 11454, posterPath: 'https://image.tmdb.org/t/p/w342/6rb24x39vV8n5301IelC8rCPJTH.jpg', imdbRating: 7.2, director: 'Mann', cast: 'William L. Petersen, Tom Noonan, Dennis Farina', blurb: 'An FBI profiler who catches serial killers by learning to think like them is pulled back for one last case, consulting the imprisoned Dr. Lecktor; the first Hannibal film, all neon and dread.' },
      { title: 'Henry: Portrait of a Serial Killer', year: 1986, tmdbId: 10692, posterPath: 'https://image.tmdb.org/t/p/w342/diVMzTarVLgjc3jyODyhZMadfwD.jpg', imdbRating: 7, director: 'McNaughton', cast: 'Michael Rooker, Tracy Arnold, Tom Towles', blurb: 'A drifter kills without pattern or remorse while his roommate tags along; shot flat and matter-of-fact, which is exactly what makes it the most disturbing film of its kind.' },
      { title: 'At Close Range', year: 1986, tmdbId: 13715, posterPath: 'https://image.tmdb.org/t/p/w342/bOkXqMmLowHBZY9lptWi3ljOXx4.jpg', imdbRating: 6.9, director: 'Foley', cast: 'Sean Penn, Christopher Walken, Mary Stuart Masterson', blurb: 'In rural Pennsylvania, a teenager falls under the spell of his estranged father, a charming career criminal who recruits his own sons and then turns on them; based on the Johnston gang murders.' },
      { title: "River's Edge", year: 1986, tmdbId: 21309, posterPath: 'https://image.tmdb.org/t/p/w342/bT68aKa9d7zDF7Z8MaskbWBRqzb.jpg', imdbRating: 6.9, director: 'Hunter', cast: 'Crispin Glover, Keanu Reeves, Ione Skye', blurb: 'A high schooler strangles his girlfriend and shows friends the body; nobody calls the police. A portrait of teenage numbness drawn from a real 1981 California murder.' },
      { title: 'Sid and Nancy', year: 1986, tmdbId: 14924, posterPath: 'https://image.tmdb.org/t/p/w342/wHzCbMCfipDJ38GW5IyBTWDflMz.jpg', imdbRating: 7, director: 'Cox', cast: 'Gary Oldman, Chloe Webb, David Hayman', blurb: 'Sex Pistols bassist Sid Vicious and Nancy Spungen fall into a heroin-soaked love story that ends with her dead in the Chelsea Hotel and him charged with murder.' },
      { title: 'Mississippi Burning', year: 1988, tmdbId: 1632, posterPath: 'https://image.tmdb.org/t/p/w342/hTv8Bkq3W1vwKi1IWCLWQW9PNU4.jpg', imdbRating: 7.8, director: 'Parker', cast: 'Gene Hackman, Willem Dafoe, Frances McDormand', blurb: 'Two mismatched FBI agents investigate the 1964 disappearance of three civil-rights workers in a Mississippi town where everyone knows and no one talks.' },
      { title: 'The Accused', year: 1988, tmdbId: 10868, posterPath: 'https://image.tmdb.org/t/p/w342/5DlWHYb5Q65GaHYHDo6PqGOuoF1.jpg', imdbRating: 7.1, director: 'Kaplan', cast: 'Jodie Foster, Kelly McGillis, Bernie Coulson', blurb: 'After a gang rape in a bar, a working-class woman insists on prosecuting not just the rapists but the men who cheered; Jodie Foster won her first Oscar for it.' },
      { title: 'To Live and Die in L.A.', year: 1985, tmdbId: 9846, posterPath: 'https://image.tmdb.org/t/p/w342/2iW3pSihBIhXjnBQmUJ0mAiZbB5.jpg', imdbRating: 7.3, director: 'Friedkin', cast: 'William L. Petersen, Willem Dafoe, John Pankow', blurb: 'A reckless Secret Service agent will break any law to take down the counterfeiter who killed his partner; sun-bleached eighties L.A., a wrong-way freeway chase, and no heroes.' },
      { title: 'Prince of the City', year: 1981, tmdbId: 32047, posterPath: 'https://image.tmdb.org/t/p/w342/511ulkuQ46NYiwAc39rXMBIB34r.jpg', imdbRating: 7.4, director: 'Lumet', cast: 'Treat Williams, Jerry Orbach, Richard Foronjy', blurb: 'A New York narcotics detective agrees to expose corruption and swears he will never give up his partners; three hours of moral quicksand as that promise collapses.' },
      { title: 'The Falcon and the Snowman', year: 1985, tmdbId: 26578, posterPath: 'https://image.tmdb.org/t/p/w342/oDeaorrKpjzYgH1c9ePoJ3x9qvw.jpg', imdbRating: 6.8, director: 'Schlesinger', cast: 'Timothy Hutton, Sean Penn, Pat Hingle', blurb: 'Two childhood friends from comfortable California suburbs, an idealist and a drug dealer, end up selling classified satellite secrets to the Soviets; a true story.' },
      { title: 'Salvador', year: 1986, tmdbId: 6106, posterPath: 'https://image.tmdb.org/t/p/w342/c5JgUmzN7syTFy9suwoHF3vhNsN.jpg', imdbRating: 7.3, director: 'Stone', cast: 'James Woods, Jim Belushi, Michael Murphy', blurb: "A burned-out American photojournalist talks his way into El Salvador's civil war looking for a paycheck and finds death squads, a massacre, and the limits of his own cynicism." },
      { title: 'Cry Freedom', year: 1987, tmdbId: 12506, posterPath: 'https://image.tmdb.org/t/p/w342/zEONV1NAzzoQGFFgSIEs7vJzDrN.jpg', imdbRating: 7.4, director: 'Attenborough', cast: 'Kevin Kline, Denzel Washington, Penelope Wilton', blurb: 'A liberal South African editor befriends activist Steve Biko, and after Biko dies in police custody must smuggle his family out of the country to publish the truth.' },
      { title: 'Christiane F.', year: 1981, tmdbId: 9589, posterPath: 'https://image.tmdb.org/t/p/w342/d9A203jfNyPnvbCfzSqFwuwHEx7.jpg', imdbRating: 7.5, director: 'Edel', cast: 'Natja Brunckhorst, Thomas Haustein, Jens Kuphal', blurb: 'A thirteen-year-old girl in a bleak Berlin housing estate slides from discos into heroin addiction and prostitution around the Zoo station; based on her real taped testimony, with Bowie on the soundtrack.' },
      { title: 'The Killing Fields', year: 1984, tmdbId: 625, posterPath: 'https://image.tmdb.org/t/p/w342/cX6Bv7natnZwQjsV9bLL8mmWjkS.jpg', imdbRating: 7.8, director: 'Joffé', cast: 'Sam Waterston, Haing S. Ngor, John Malkovich', blurb: 'An American reporter and his Cambodian translator cover the Khmer Rouge takeover; when the Americans evacuate, the translator is left behind in the genocide.' },
      { title: 'Star 80', year: 1983, tmdbId: 30707, posterPath: 'https://image.tmdb.org/t/p/w342/b2SkA02fXbZYnV1qjOIQprjXloF.jpg', imdbRating: 6.8, director: 'Fosse', cast: 'Mariel Hemingway, Eric Roberts, Cliff Robertson', blurb: "The short life of Playmate Dorothy Stratten and the controlling, small-time hustler husband who murdered her when she outgrew him; Bob Fosse's coldest, final film." },
      { title: 'Dance with a Stranger', year: 1985, tmdbId: 40913, posterPath: 'https://image.tmdb.org/t/p/w342/nwAXFN8qHnfaeeGx1a0OMqmCwcD.jpg', imdbRating: 6.6, director: 'Newell', cast: 'Miranda Richardson, Rupert Everett, Ian Holm', blurb: 'The affair between nightclub hostess Ruth Ellis and a careless upper-class racing driver, and the shooting that made her the last woman hanged in Britain.' },
      { title: 'Marianne and Juliane', year: 1981, tmdbId: 42142, posterPath: 'https://image.tmdb.org/t/p/w342/lOPTepFzMlwJzupQDPe481hI0sN.jpg', imdbRating: 7.3, director: 'von Trotta', cast: 'Jutta Lampe, Barbara Sukowa, Ina Robinski', blurb: "Two German sisters fight for change, one as a journalist, one as an imprisoned terrorist; West Germany's armed decade seen from inside one family." },
      { title: 'Pixote', year: 1981, tmdbId: 42148, posterPath: 'https://image.tmdb.org/t/p/w342/zaBtclnYKv2JkgRDQ7OiFtWHm4e.jpg', imdbRating: 7.9, director: 'Babenco', cast: 'Fernando Ramos da Silva, Jorge Julião, Gilberto Moura', blurb: "A ten-year-old drifts through Brazil's reformatories and streets into robbery and worse, played by a real street kid; one of the most harrowing films ever made about childhood." },
      { title: 'A Cry in the Dark', year: 1988, tmdbId: 35119, posterPath: 'https://image.tmdb.org/t/p/w342/auyoK8OZh1sZldjJfy9RGzS6crV.jpg', imdbRating: 6.9, director: 'Schepisi', cast: 'Meryl Streep, Sam Neill, Bruce Myles', blurb: 'A dingo takes a baby from a campsite, and Australia decides the mother did it; Meryl Streep in a true story about how media and public opinion convict before courts do.' },
      { title: 'Buster', year: 1988, tmdbId: 24782, posterPath: 'https://image.tmdb.org/t/p/w342/oNiyCIkbO0SdiKejdgXFaMqW1UE.jpg', imdbRating: 5.9, director: 'Green', cast: 'Phil Collins, Julie Walters, Larry Lamb', blurb: 'Small-time London crook Buster Edwards helps pull off the 1963 Great Train Robbery, then finds life on the run with his wife harder than the crime; Phil Collins plays the lead.' },
      { title: 'Prick Up Your Ears', year: 1987, tmdbId: 27857, posterPath: 'https://image.tmdb.org/t/p/w342/yLrWxmqPqAQFjyefJtYjoaDxGpi.jpg', imdbRating: 6.7, director: 'Frears', cast: 'Gary Oldman, Alfred Molina, Vanessa Redgrave', blurb: 'The rise of playwright Joe Orton through 1960s London, and the lover and collaborator who, eclipsed and humiliated, finally murdered him.' },
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
    heroPosition: 'center 22%',
    intro: [
      "Half of world cinema's grammar was written in Japan: Kurosawa's weather and motion, Ozu's still rooms and family seasons, Mizoguchi's ghosts gliding through long takes. Then come the inheritors, Kore-eda's makeshift families, Hamaguchi's conversations, and the anime masters Kon and Otomo.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of August 7, 2026, featuring Seven Samurai. It pairs each master's peaks where the two-per-director cap allows and makes room for the disreputable geniuses: Suzuki's hitman pop art, Kitano's deadpan gangsters, Imamura's pigs.",
    ],
    items: [
      { title: 'Seven Samurai', year: 1954, tmdbId: 346, posterPath: 'https://image.tmdb.org/t/p/w342/lOMGc8bnSwQhS4XyE1S99uH8NXf.jpg', imdbRating: 8.6, director: 'Kurosawa', cast: 'Toshirō Mifune, Takashi Shimura, Yoshio Inaba', blurb: 'A poor village hires seven masterless samurai to defend it from bandits; three and a half hours of recruitment, preparation and battle that invented the team-up movie.' },
      { title: 'Rashomon', year: 1950, tmdbId: 548, posterPath: 'https://image.tmdb.org/t/p/w342/ijWibsAU1iBcCD8tuIZfTmDzMVE.jpg', imdbRating: 8.1, director: 'Kurosawa', cast: 'Toshirō Mifune, Machiko Kyō, Takashi Shimura', blurb: 'A samurai is dead in a forest; the bandit, the wife, a woodcutter and the dead man himself all tell contradictory versions. The film that made unreliable narration a structure.' },
      { title: 'Tokyo Story', year: 1953, tmdbId: 18148, posterPath: 'https://image.tmdb.org/t/p/w342/g2YbTYKpY7N2yDSk7BfXZ18I5QV.jpg', imdbRating: 8.1, director: 'Ozu', cast: 'Chishū Ryū, Chieko Higashiyama, Setsuko Hara', blurb: 'An elderly couple travel to Tokyo to visit their grown children, who are too busy for them; almost nothing happens, and it is regularly voted one of the greatest films ever made.' },
      { title: 'Late Spring', year: 1949, tmdbId: 20530, posterPath: 'https://image.tmdb.org/t/p/w342/iNtRSY2AGjW1VDXDR79bKsNUdus.jpg', imdbRating: 8.2, director: 'Ozu', cast: 'Chishū Ryū, Setsuko Hara, Yumeji Tsukioka', blurb: "A devoted daughter lives happily with her widowed father until everyone insists she must marry; Ozu's gentlest, saddest study of letting go." },
      { title: 'Ugetsu', year: 1953, tmdbId: 14696, posterPath: 'https://image.tmdb.org/t/p/w342/r8RiuKTIYIJBjczBVsfeP5C00CJ.jpg', imdbRating: 8.1, director: 'Mizoguchi', cast: 'Machiko Kyō, Mitsuko Mito, Kinuyo Tanaka', blurb: 'In civil-war Japan, two potters chase profit and glory across the lines, and one is seduced by a ghost; a ghost story told with heartbreaking calm.' },
      { title: 'Sansho the Bailiff', year: 1954, tmdbId: 20532, posterPath: 'https://image.tmdb.org/t/p/w342/cOBsWxFtEoqXIPx4JZP5E7g1WEo.jpg', imdbRating: 8.4, director: 'Mizoguchi', cast: 'Kinuyo Tanaka, Yoshiaki Hanayagi, Kyōko Kagawa', blurb: "A governor's family is torn apart and sold, the children into slavery under a brutal bailiff; a medieval tale of endurance shaped into pure sorrow." },
      { title: 'Harakiri', year: 1962, tmdbId: 14537, posterPath: 'https://image.tmdb.org/t/p/w342/3nPwMd3KviJWaHzG9fZCqlwWMas.jpg', imdbRating: 8.6, director: 'Kobayashi', cast: 'Tatsuya Nakadai, Akira Ishihama, Shima Iwashita', blurb: "A ronin requests permission to commit ritual suicide in a clan's courtyard, then tells the story that explains why; a revenge tragedy that dismantles the samurai code piece by piece." },
      { title: 'Woman in the Dunes', year: 1964, tmdbId: 16672, posterPath: 'https://image.tmdb.org/t/p/w342/xiBr3bIT2xpbuIKo5bLK7ebP4O1.jpg', imdbRating: 8.4, director: 'Teshigahara', cast: 'Eiji Okada, Kyôko Kishida, Kōji Mitsui', blurb: 'An entomologist misses his bus and is trapped by villagers in a sandpit with a widow, shoveling sand to survive; an erotic, existential parable that feels like no other film.' },
      { title: 'Floating Clouds', year: 1955, tmdbId: 77285, posterPath: 'https://image.tmdb.org/t/p/w342/6nMSSTPvNG9vfyHqIXafWg6RHgU.jpg', imdbRating: 7.6, director: 'Naruse', cast: 'Hideko Takamine, Masayuki Mori, Mariko Okada', blurb: "A woman and a married man who had an affair in wartime Indochina keep finding and failing each other in ruined postwar Tokyo; Naruse's bleak masterpiece of attachment." },
      { title: 'The Burmese Harp', year: 1956, tmdbId: 33319, posterPath: 'https://image.tmdb.org/t/p/w342/zTKpylld64pjRYgRMK9GN6Jo2bA.jpg', imdbRating: 8, director: 'Ichikawa', cast: 'Rentaro Mikuni, Shōji Yasui, Jun Hamamura', blurb: "After Japan's surrender, a soldier-musician stays behind in Burma, disguised as a monk, to bury the countless dead his army left; a war film about mourning rather than battle." },
      { title: 'In the Realm of the Senses', year: 1976, tmdbId: 5879, posterPath: 'https://image.tmdb.org/t/p/w342/AiFQbgjgSXWPfbi9iIYT39iXWMW.jpg', imdbRating: 6.6, director: 'Oshima', cast: 'Eiko Matsuda, Tatsuya Fuji, Aoi Nakajima', blurb: 'The true 1936 case of Sada Abe: an affair between a maid and her employer spirals into total erotic obsession; explicit, notorious, and dead serious about where desire ends.' },
      { title: 'Spirited Away', year: 2001, tmdbId: 129, posterPath: 'https://image.tmdb.org/t/p/w342/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg', imdbRating: 8.6, director: 'Miyazaki', cast: 'Rumi Hiiragi, Miyu Irino, Mari Natsuki', blurb: "A ten-year-old girl must work in a bathhouse for gods and spirits to free her parents, who have been turned into pigs; Miyazaki's Oscar winner and the studio's most beloved film." },
      { title: 'Shoplifters', year: 2018, tmdbId: 505192, posterPath: 'https://image.tmdb.org/t/p/w342/4nfRUOv3LX5zLn98WS1WqVBk9E9.jpg', imdbRating: 7.9, director: 'Kore-eda', cast: 'Lily Franky, Sakura Ando, Mayu Matsuoka', blurb: "A Tokyo family that survives on petty theft takes in a neglected little girl, and the film slowly reveals what actually binds them; a Palme d'Or winner about chosen family." },
      { title: 'Drive My Car', year: 2021, tmdbId: 758866, posterPath: 'https://image.tmdb.org/t/p/w342/znXps7wPyYq8UDCfeyO2vfEIeRS.jpg', imdbRating: 7.5, director: 'Hamaguchi', cast: 'Hidetoshi Nishijima, Toko Miura, Masaki Okada', blurb: "A widowed theater actor directing Uncle Vanya is assigned a quiet young chauffeur, and their long drives unspool grief, guilt and his wife's secrets; three hours that fly." },
      { title: 'Onibaba', year: 1964, tmdbId: 3763, posterPath: 'https://image.tmdb.org/t/p/w342/xyPLG53OodhJtvfQEfcmC43l16O.jpg', imdbRating: 7.8, director: 'Shindô', cast: 'Nobuko Otowa, Jitsuko Yoshimura, Kei Satō', blurb: 'In war-torn medieval Japan, a mother and daughter-in-law survive by killing stray samurai and selling their armor, until a demon mask enters the reeds; primal horror.' },
      { title: 'Branded to Kill', year: 1967, tmdbId: 17905, posterPath: 'https://image.tmdb.org/t/p/w342/asiSCq1SFrCV4gy7PJzw8c3m0yL.jpg', imdbRating: 7.2, director: 'Suzuki', cast: 'Joe Shishido, Kōji Nanbara, Isao Tamagawa', blurb: "Japan's No. 3 hitman, aroused by the smell of boiling rice, botches a job and becomes the target of the mysterious No. 1; a yakuza thriller as deranged pop art. It got its director fired." },
      { title: 'Sonatine', year: 1993, tmdbId: 7500, posterPath: 'https://image.tmdb.org/t/p/w342/mX9E4fEuG17L2e7bZmhBc0XdRbw.jpg', imdbRating: 7.4, director: 'Kitano', cast: 'Takeshi Kitano, Aya Kokumai, Tetsu Watanabe', blurb: "A weary Tokyo yakuza sent to Okinawa on a suspicious errand waits out a gang war on a beach, playing children's games between sudden bursts of violence; deadpan and fatalistic." },
      { title: 'Perfect Blue', year: 1997, tmdbId: 10494, posterPath: 'https://image.tmdb.org/t/p/w342/6WTiOCfDPP8XV4jqfloiVWf7KHq.jpg', imdbRating: 8, director: 'Kon', cast: 'Junko Iwao, Rica Matsumoto, Shiho Niiyama', blurb: 'A pop idol quits music for acting and is stalked, as her sense of self splinters between roles, fans and a double; the anime psycho-thriller Aronofsky openly borrowed from.' },
      { title: 'Akira', year: 1988, tmdbId: 149, posterPath: 'https://image.tmdb.org/t/p/w342/neZ0ykEsPqxamsX6o5QNUFILQrz.jpg', imdbRating: 8, director: 'Otomo', cast: 'Mitsuo Iwata, Nozomu Sasaki, Mami Koyama', blurb: 'In Neo-Tokyo, a biker gang member develops uncontrollable psychic powers while his friend tries to stop him and the state that made him; the film that broke anime worldwide.' },
      { title: 'Pigs and Battleships', year: 1961, tmdbId: 31104, posterPath: 'https://image.tmdb.org/t/p/w342/u7fbMQSE5OMKYKOXbSAp5WOJRBj.jpg', imdbRating: 7.4, director: 'Imamura', cast: 'Hiroyuki Nagato, Jitsuko Yoshimura, Masao Mishima', blurb: "Around a U.S. naval base in Yokosuka, small-time hoods run a pig-farming racket; Imamura's raucous, unsentimental portrait of Japan scavenging in America's shadow." },
      { title: 'Tampopo', year: 1985, tmdbId: 11830, posterPath: 'https://image.tmdb.org/t/p/w342/ArYdSuX3zY9fMsE4LqmBl7xJq5R.jpg', imdbRating: 7.9, director: 'Itami', cast: 'Tsutomu Yamazaki, Nobuko Miyamoto, Ken Watanabe', blurb: 'A truck driver helps a widow turn her failing noodle shop into the perfect ramen joint, in a comedy that keeps wandering off into sketches about food, sex and death; a self-declared ramen western.' },
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
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/qdicnsyN21cWeXkRzPXq7139fY4.jpg',
    heroPosition: 'center 45%',
    intro: [
      'Non-fiction cinema has its own canon: Wiseman walking his camera into American institutions, Chris Marker writing essays in images, the Maysles brothers finding Beckett in a Long Island mansion, Joshua Oppenheimer asking killers to re-stage their crimes for the camera.',
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 31, 2026, featuring Hoop Dreams, five years in the lives of two Chicago basketball hopefuls and still the bar for longitudinal documentary. Vertov's Man with a Movie Camera, from 1929, is the oldest film in any of these weekly collections.",
    ],
    items: [
      { title: 'Hoop Dreams', year: 1994, tmdbId: 14275, posterPath: 'https://image.tmdb.org/t/p/w342/gLzHl2XBtVwycl8DxdOXRHPm8G3.jpg', imdbRating: 8.3, director: 'James', cast: 'William Gates, Arthur Agee, Gene Pingatore', blurb: 'Five years in the lives of two Black teenagers from Chicago recruited into a white suburban basketball powerhouse; about sport, class, race and family, and still the bar for longitudinal documentary.' },
      { title: 'The Act of Killing', year: 2012, tmdbId: 123678, posterPath: 'https://image.tmdb.org/t/p/w342/sp5B7Tz5ttsgOLnIlCP5uEhtesI.jpg', imdbRating: 8.2, director: 'Oppenheimer', cast: 'Anwar Congo, Herman Koto, Syamsul Arifin', blurb: "Aging leaders of Indonesia's 1965 death squads, still celebrated at home, happily re-enact their murders in the styles of their favorite Hollywood genres, until one of them begins to break." },
      { title: 'The Look of Silence', year: 2014, tmdbId: 267480, posterPath: 'https://image.tmdb.org/t/p/w342/7TakQLT8gyzIMG8hX8RLTd5qROQ.jpg', imdbRating: 8.2, director: 'Oppenheimer', cast: 'Adi Rukun, M.Y. Basrun, Amir Hasan', blurb: "An optometrist whose brother was murdered in Indonesia's massacres fits the killers with glasses and quietly asks them to describe what they did; the companion to The Act of Killing." },
      { title: 'Sans Soleil', year: 1983, tmdbId: 1563, posterPath: 'https://image.tmdb.org/t/p/w342/2ZmVbnecEeGoZCimxMhpY0Nz7eh.jpg', imdbRating: 7.7, director: 'Marker', cast: 'Florence Delay, Amílcar Cabral, Arielle Dombasle', blurb: "A fictional cameraman's letters read over footage from Japan, Guinea-Bissau and San Francisco become an essay on memory, images and time; the peak of the essay film." },
      { title: 'Grey Gardens', year: 1975, tmdbId: 17346, posterPath: 'https://image.tmdb.org/t/p/w342/jb6o66HE1duy0L7MJzEZXvrrsux.jpg', imdbRating: 7.3, director: 'Maysles', cast: 'Edith Bouvier Beale, Edith Ewing Bouvier Beale, Brooks Hyers', blurb: 'A reclusive mother and daughter, aunt and cousin of Jackie Onassis, bicker and perform for the camera in their decaying Long Island mansion; endlessly quotable and quietly tragic.' },
      { title: 'Salesman', year: 1968, tmdbId: 27375, posterPath: 'https://image.tmdb.org/t/p/w342/gQhe7uWygmAiQ6HNA7Jeys4wdbk.jpg', imdbRating: 7.2, director: 'Maysles', cast: 'Paul Brennan, Charles McDevitt, James Baker', blurb: 'Four door-to-door Bible salesmen work New England and Florida, and one of them slowly comes apart as the pitches stop landing; the Maysles brothers finding Death of a Salesman in real life.' },
      { title: 'Titicut Follies', year: 1967, tmdbId: 41212, posterPath: 'https://image.tmdb.org/t/p/w342/hAJOSqWB4FeVV7yi0fRSYFoCwvM.jpg', imdbRating: 7.7, director: 'Wiseman', blurb: 'Inside a Massachusetts hospital for the criminally insane: force-feedings, taunting guards, an annual talent show; suppressed by the state for decades.' },
      { title: 'High School', year: 1968, tmdbId: 60315, posterPath: 'https://image.tmdb.org/t/p/w342/d3R2ELJJJtsdC722O63BVLmcxSe.jpg', imdbRating: 7.5, director: 'Wiseman', blurb: "Wiseman's camera sits in a Philadelphia high school's classrooms and offices, no narration, no interviews, and lets the institution reveal how it manufactures obedience." },
      { title: 'Shoah', year: 1985, tmdbId: 42044, posterPath: 'https://image.tmdb.org/t/p/w342/yvwF7dfSCybFcBOklUzKpE46bHM.jpg', imdbRating: 8.7, director: 'Lanzmann', cast: 'Claude Lanzmann, Simon Srebnik, Michael Podchlebnik', blurb: 'Nine and a half hours of testimony about the Holocaust, from survivors, bystanders and perpetrators, with no archive footage at all; a monument built entirely from memory.' },
      { title: 'The Sorrow and the Pity', year: 1969, tmdbId: 128062, posterPath: 'https://image.tmdb.org/t/p/w342/e2U7S6kmiwsvq0vgiuKSYWOBFKM.jpg', imdbRating: 8.1, director: 'Ophüls', blurb: 'Four hours on one French town under the Occupation that demolished the myth that everyone resisted; interviews with collaborators, resisters and those in between.' },
      { title: 'The Thin Blue Line', year: 1988, tmdbId: 14285, posterPath: 'https://image.tmdb.org/t/p/w342/4w4BJk3l8y9gYwPPLRs6uPHOmGL.jpg', imdbRating: 7.9, director: 'Morris', cast: 'Randall Adams, David Harris, Gus Rose', blurb: 'A re-investigation of a Dallas cop killing, with stylized re-enactments and a Philip Glass score, that actually got an innocent man off death row.' },
      { title: 'F for Fake', year: 1973, tmdbId: 43003, posterPath: 'https://image.tmdb.org/t/p/w342/fVeIDxS73CrosoeVOaefQuCUGZg.jpg', imdbRating: 7.7, director: 'Welles', cast: 'Orson Welles, Oja Kodar, Elmyr de Hory', blurb: 'Orson Welles spins the stories of an art forger and his fraudulent biographer into a playful essay about authorship and lies, and pulls one final trick on the audience.' },
      { title: 'Stop Making Sense', year: 1984, tmdbId: 24128, posterPath: 'https://image.tmdb.org/t/p/w342/utNpurUe1MMjEaHqvpkfxgfpSnV.jpg', imdbRating: 8.7, director: 'Demme', cast: 'David Byrne, Chris Frantz, Jerry Harrison', blurb: 'A Talking Heads concert that begins with David Byrne alone with a boombox and builds the band member by member, up to the giant suit; widely rated the best concert film ever staged.' },
      { title: 'Man with a Movie Camera', year: 1929, tmdbId: 26317, posterPath: 'https://image.tmdb.org/t/p/w342/vJgAdgJWX54v0oXfIvhwjlZnmgn.jpg', imdbRating: 8.3, director: 'Vertov', cast: 'Mikhail Kaufman', blurb: 'A day in the Soviet city assembled from every technique the camera had in 1929: split screens, superimpositions, freeze frames; a silent film that still feels fast.' },
      { title: "Hearts of Darkness: A Filmmaker's Apocalypse", year: 1991, tmdbId: 4539, posterPath: 'https://image.tmdb.org/t/p/w342/nVMCtL3r2nj4fySihDDvamaVkfx.jpg', imdbRating: 8.1, director: 'Bahr & Hickenlooper', cast: 'Francis Ford Coppola, Eleanor Coppola, John Milius', blurb: "The making of Apocalypse Now, from typhoons and a lead actor's heart attack to Coppola gambling his sanity and fortune; the definitive film about filmmaking as madness." },
      { title: 'Crumb', year: 1994, tmdbId: 26564, posterPath: 'https://image.tmdb.org/t/p/w342/9ocTHdBCJdwJ65Tubg3lYlfMxEY.jpg', imdbRating: 7.5, director: 'Zwigoff', cast: 'Robert Crumb, Aline Kominsky, Charles Crumb', blurb: 'A portrait of underground cartoonist Robert Crumb, his obsessions, and the brilliant, damaged brothers who never escaped the family he did; uncomfortable and unforgettable.' },
      { title: 'Faces Places', year: 2017, tmdbId: 451995, posterPath: 'https://image.tmdb.org/t/p/w342/1NX6NTj9FiiJwEgRUmEifSzE7Na.jpg', imdbRating: 7.8, director: 'Varda & JR', cast: 'Agnès Varda, JR, Patricia Mercier', blurb: 'Agnès Varda, in her late eighties, road-trips through rural France with the young photographer JR, pasting giant portraits of the people they meet onto barns and trains.' },
      { title: 'Searching for Sugar Man', year: 2012, tmdbId: 84334, posterPath: 'https://image.tmdb.org/t/p/w342/ucM98HuBHSWmn44oiE83hIDc6VB.jpg', imdbRating: 8.2, director: 'Bendjelloul', cast: 'Stephen Segerman, Rodriguez, Regan Rodriguez', blurb: 'Two South Africans hunt for the fate of Rodriguez, a forgotten Detroit singer who, unknown to himself, had become bigger than Elvis in apartheid-era South Africa.' },
      { title: "Don't Look Back", year: 1967, tmdbId: 135, posterPath: 'https://image.tmdb.org/t/p/w342/2kd5XfH2MhFlChq7DkjxWBLoYPF.jpg', imdbRating: 7.4, director: 'Pennebaker', cast: 'Bob Dylan, Albert Grossman, Bob Neuwirth', blurb: "Bob Dylan's 1965 tour of England, caught backstage being brilliant and cruel in equal measure, opening with the famous cue-card scene for Subterranean Homesick Blues." },
      { title: 'Capturing the Friedmans', year: 2003, tmdbId: 2260, posterPath: 'https://image.tmdb.org/t/p/w342/429t6nh7M8cg29CtgXAjvwWe1Dv.jpg', imdbRating: 7.6, director: 'Jarecki', cast: 'Arnold Friedman, Elaine Friedman, David Friedman', blurb: 'A Long Island family films its own disintegration as the father and youngest son face child-abuse charges; the home videos leave you genuinely unsure what happened.' },
      { title: 'Hearts and Minds', year: 1974, tmdbId: 42449, posterPath: 'https://image.tmdb.org/t/p/w342/yXnpP2RAZbG3DQufUGcOM5hU4cF.jpg', imdbRating: 7.7, director: 'Davis', cast: 'Clark Clifford, John Foster Dulles, Georges Bidault', blurb: 'The Vietnam War argued through the words of the generals, politicians and soldiers who ran it, cut against what the cameras actually saw; it won the Oscar and caused a scandal.' },
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
    heroPosition: 'center 30%',
    intro: [
      'Cinema has a subgenre nobody names: the heatwave film, where the temperature climbs until people crack. Spike Lee turned the hottest day in Bed-Stuy into American cinema\'s great pressure cooker; Australia contributed an outback nightmare; the French contributed a swimming pool.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 24, 2026, at peak summer, featuring Do the Right Thing. Noir (Body Heat, Chinatown), war (Apocalypse Now) and slow-burn Korean menace (Burning) all sweat together here.',
    ],
    items: [
      { title: 'Do the Right Thing', year: 1989, tmdbId: 925, posterPath: 'https://image.tmdb.org/t/p/w342/63rmSDPahrH7C1gEFYzRuIBAN9W.jpg', imdbRating: 7.9, director: 'Spike Lee', cast: 'Danny Aiello, Ossie Davis, Ruby Dee', blurb: "On the hottest day of the summer, tensions on one Brooklyn block between an Italian-American pizzeria and its Black neighborhood build hour by hour toward explosion; Spike Lee's masterpiece." },
      { title: 'Apocalypse Now', year: 1979, tmdbId: 28, posterPath: 'https://image.tmdb.org/t/p/w342/gQB8Y5RCMkv2zwzFHbUJX3kAhvA.jpg', imdbRating: 8.4, director: 'Coppola', cast: 'Martin Sheen, Marlon Brando, Frederic Forrest', blurb: 'An army captain is sent up a Vietnamese river to assassinate a decorated colonel who has gone insane and built his own kingdom in the jungle; war film as fever dream.' },
      { title: 'Dog Day Afternoon', year: 1975, tmdbId: 968, posterPath: 'https://image.tmdb.org/t/p/w342/mavrhr0ig2aCRR8d48yaxtD5aMQ.jpg', imdbRating: 8, director: 'Lumet', cast: 'Al Pacino, John Cazale, Charles Durning', blurb: 'A Brooklyn bank robbery goes wrong in the first five minutes and becomes a sweltering all-day hostage standoff and media circus; Pacino at his most desperate and human, from a true story.' },
      { title: 'Chinatown', year: 1974, tmdbId: 829, posterPath: 'https://image.tmdb.org/t/p/w342/kZRSP3FmOcq0xnBulqpUQngJUXY.jpg', imdbRating: 8.1, director: 'Polanski', cast: 'Jack Nicholson, Faye Dunaway, John Huston', blurb: "A 1930s Los Angeles private eye takes a routine adultery job and uncovers a conspiracy over the city's water, and something far worse; the most perfect screenplay ever taught." },
      { title: 'Body Heat', year: 1981, tmdbId: 14412, posterPath: 'https://image.tmdb.org/t/p/w342/5LipPcaW1J9IjAP7TOTesw8OcMS.jpg', imdbRating: 7.4, director: 'Kasdan', cast: 'William Hurt, Kathleen Turner, Richard Crenna', blurb: 'During a Florida heatwave, a not-too-bright lawyer falls for a married woman who wants her husband gone; sweat-soaked neo-noir where you can guess the trap and still enjoy it closing.' },
      { title: 'Lawrence of Arabia', year: 1962, tmdbId: 947, posterPath: 'https://image.tmdb.org/t/p/w342/AiAm0EtDvyGqNpVoieRw4u65vD1.jpg', imdbRating: 8.3, director: 'Lean', cast: "Peter O'Toole, Alec Guinness, Omar Sharif", blurb: 'T.E. Lawrence unites Arab tribes against the Ottomans and loses himself in the role; the desert epic whose 70mm vistas made the sun itself the antagonist.' },
      { title: 'The Wages of Fear', year: 1953, tmdbId: 204, posterPath: 'https://image.tmdb.org/t/p/w342/sNOvIp4X0fmCMfgEs2ww5IyMgFm.jpg', imdbRating: 8.1, director: 'Clouzot', cast: 'Yves Montand, Charles Vanel, Peter van Eyck', blurb: 'Four desperate men stranded in a South American oil town take a job driving trucks of nitroglycerin over mountain roads; two hours of the purest suspense ever filmed.' },
      { title: 'In the Heat of the Night', year: 1967, tmdbId: 10633, posterPath: 'https://image.tmdb.org/t/p/w342/qFpfALhprXmOAbA5upTNupZw8rq.jpg', imdbRating: 7.9, director: 'Jewison', cast: 'Sidney Poitier, Rod Steiger, Warren Oates', blurb: 'A Black Philadelphia homicide detective passing through a Mississippi town gets arrested for a murder, then has to solve it alongside the racist police chief.' },
      { title: 'La piscine', year: 1969, tmdbId: 4946, posterPath: 'https://image.tmdb.org/t/p/w342/pIR9bZM0bN1TwM1tppP7wZ2eJrL.jpg', imdbRating: 7.1, director: 'Deray', cast: 'Alain Delon, Romy Schneider, Maurice Ronet', blurb: 'Two lovers idle by a Riviera pool until her old flame arrives with his teenage daughter; envy and desire warm slowly toward murder. Delon and Romy Schneider at their most beautiful.' },
      { title: 'Y tu mamá también', year: 2001, tmdbId: 1391, posterPath: 'https://image.tmdb.org/t/p/w342/aj3rqjab8jfc2fWmcS3H3c5qbur.jpg', imdbRating: 7.7, director: 'Cuarón', cast: 'Maribel Verdú, Gael García Bernal, Diego Luna', blurb: 'Two teenage boys and an unhappily married older woman road-trip to a possibly imaginary beach, while the narrator quietly notes the Mexico passing outside; sexy and then suddenly devastating.' },
      { title: 'Burning', year: 2018, tmdbId: 491584, posterPath: 'https://image.tmdb.org/t/p/w342/kXiF80o74fE9gf3Utf9moAI7ar0.jpg', imdbRating: 7.4, director: 'Lee Chang-dong', cast: 'Yoo Ah-in, Steven Yeun, Jeon Jong-seo', blurb: 'A delivery-job drifter reconnects with a childhood friend, who then vanishes after introducing her rich, bored new boyfriend, a man who claims he burns greenhouses; slow Korean menace with an ambiguous core.' },
      { title: 'A Bigger Splash', year: 2015, tmdbId: 324807, posterPath: 'https://image.tmdb.org/t/p/w342/hQ8vLJyws0tAYbBmzpTKbjdNHKI.jpg', imdbRating: 6.4, director: 'Guadagnino', cast: 'Tilda Swinton, Matthias Schoenaerts, Ralph Fiennes', blurb: 'A rock star resting her voice on a Sicilian island has her retreat invaded by an exuberant old flame and his newly discovered daughter; sun, jealousy and one body in the pool.' },
      { title: 'The Talented Mr. Ripley', year: 1999, tmdbId: 1213, posterPath: 'https://image.tmdb.org/t/p/w342/6ojHgqtIR41O2qLKa7LFUVj0cZa.jpg', imdbRating: 7.4, director: 'Minghella', cast: 'Matt Damon, Gwyneth Paltrow, Jude Law', blurb: 'Sent to Italy to retrieve a playboy heir, a poor young man decides to become him instead, killing his way into the borrowed life; gorgeous and increasingly suffocating.' },
      { title: 'Spring Breakers', year: 2012, tmdbId: 122081, posterPath: 'https://image.tmdb.org/t/p/w342/9tyPnyEkL44qbAliM9jMRWc6bjg.jpg', imdbRating: 5.3, director: 'Korine', cast: 'James Franco, Selena Gomez, Vanessa Hudgens', blurb: 'Four college girls rob a diner to fund a Florida spring break, get bailed out of jail by a cornrowed gangster-rapper, and slide into armed robbery; a neon fever dream, not the comedy it looks like.' },
      { title: 'Wake in Fright', year: 1971, tmdbId: 26405, posterPath: 'https://image.tmdb.org/t/p/w342/5XwMDn2acQZ3CHuJ3EDXLg348G3.jpg', imdbRating: 7.5, director: 'Kotcheff', cast: 'Donald Pleasence, Gary Bond, Chips Rafferty', blurb: 'A schoolteacher stranded in an outback mining town is destroyed by beer, gambling and relentless male hospitality over one lost weekend; horror without a single monster.' },
      { title: 'The Swimmer', year: 1968, tmdbId: 33564, posterPath: 'https://image.tmdb.org/t/p/w342/urzLPHVno21hv2Ti7CwQuoQAUAI.jpg', imdbRating: 7.6, director: 'Perry', cast: 'Burt Lancaster, Janet Landgard, Janice Rule', blurb: "A tanned suburban man decides to swim home across the county through his neighbors' pools, and with each pool his confident story about his life falls further apart." },
      { title: 'Sexy Beast', year: 2000, tmdbId: 11826, posterPath: 'https://image.tmdb.org/t/p/w342/xTfCZTzhgHNAR1pf5D49WH4buI5.jpg', imdbRating: 7, director: 'Glazer', cast: 'Ray Winstone, Ben Kingsley, Ian McShane', blurb: 'A safecracker retired to sun-drunk Spain is visited by Don Logan, the most terrifying man in British film, who will not take no to one last job; Kingsley plays him like a coiled snake.' },
      { title: 'Stranger by the Lake', year: 2013, tmdbId: 186992, posterPath: 'https://image.tmdb.org/t/p/w342/ug6IbPt19J8YIW9vh87Xw9FOTaJ.jpg', imdbRating: 6.9, director: 'Guiraudie', cast: "Pierre Deladonchamps, Christophe Paou, Patrick d'Assumçao", blurb: 'At a lakeside cruising spot, a man witnesses a drowning that was no accident, and keeps returning to the killer anyway; desire and danger with no music and no way out.' },
      { title: "L'Avventura", year: 1960, tmdbId: 5165, posterPath: 'https://image.tmdb.org/t/p/w342/7kUXAS8K7Ihw1T1mhARjnLuMVk3.jpg', imdbRating: 7.7, director: 'Antonioni', cast: 'Monica Vitti, Gabriele Ferzetti, Lea Massari', blurb: 'A woman vanishes during a yacht trip to a barren island; her lover and best friend search, then drift into an affair and slowly stop looking. The scandal of Cannes 1960, now a cornerstone.' },
      { title: 'Stromboli', year: 1950, tmdbId: 4173, posterPath: 'https://image.tmdb.org/t/p/w342/tsyyzGSspKsawHocchfokskwbeM.jpg', imdbRating: 7.2, director: 'Rossellini', cast: 'Ingrid Bergman, Mario Vitale, Renzo Cesana', blurb: 'A Lithuanian refugee marries an Italian fisherman to escape a camp and finds herself trapped on his brutal volcanic island; Rossellini and Ingrid Bergman, ending on an ambiguous miracle.' },
      { title: 'Killer of Sheep', year: 1978, tmdbId: 27432, posterPath: 'https://image.tmdb.org/t/p/w342/z1CqJKI6gmdAMprD1NOYSCHVXEv.jpg', imdbRating: 6.5, director: 'Burnett', cast: 'Henry G. Sanders, Kaycee Moore, Charles Bracy', blurb: 'A slaughterhouse worker in 1970s Watts drifts through insomnia, family and small neighborhood moments; shot for nothing on weekends, now preserved as an American classic.' },
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
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/krDjqWqLAewVYiU8fDQLHO7gPmf.jpg',
    heroPosition: 'center 45%',
    intro: [
      "Some directors film landscapes as backdrops; these film them as protagonists. Malick's prairies at magic hour, Herzog dragging a real steamship over a hill because the jungle demanded it, Reichardt's Oregon rivers, the Macedonian mountains where one woman keeps wild bees.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 17, 2026, featuring The Tree of Life. Documentary and fiction mix freely: Honeyland and Free Solo sit beside the forest gods of Princess Mononoke and Kurosawa\'s Siberian taiga.',
    ],
    items: [
      { title: 'The Tree of Life', year: 2011, tmdbId: 8967, posterPath: 'https://image.tmdb.org/t/p/w342/l8cwuB5WJSoj4uMAsnzuHBOMaSJ.jpg', imdbRating: 6.8, director: 'Malick', cast: 'Brad Pitt, Jessica Chastain, Hunter McCracken', blurb: "A Texas boyhood in the 1950s, a stern father and a grace-filled mother, framed inside nothing less than the creation of the universe; Malick's most ambitious film, Palme d'Or winner." },
      { title: 'Days of Heaven', year: 1978, tmdbId: 16642, posterPath: 'https://image.tmdb.org/t/p/w342/rwxTYjOZmX2rGhz7avLe1qsjNqe.jpg', imdbRating: 7.7, director: 'Malick', cast: 'Richard Gere, Brooke Adams, Sam Shepard', blurb: 'Two lovers posing as siblings work the Texas wheat harvest, and she marries the dying farmer for his money; a simple tragedy shot almost entirely at magic hour.' },
      { title: 'First Cow', year: 2019, tmdbId: 558582, posterPath: 'https://image.tmdb.org/t/p/w342/yS41crZ1i0fFxCQbuL7I1Y1VBwm.jpg', imdbRating: 7, director: 'Reichardt', cast: 'John Magaro, Orion Lee, Toby Jones', blurb: "In 1820s Oregon, a gentle cook and a Chinese immigrant build a business on biscuits made with milk stolen nightly from the territory's only cow; a friendship story where the suspense is tenderness." },
      { title: 'Embrace of the Serpent', year: 2015, tmdbId: 336808, posterPath: 'https://image.tmdb.org/t/p/w342/t3Lmw8jvm7tpik0lSkub8hU4oRW.jpg', imdbRating: 7.8, director: 'Guerra', cast: 'Nilbio Torres, Antonio Bolívar, Jan Bijvoet', blurb: "An Amazonian shaman, last of his people, guides two Western explorers decades apart in search of a sacred plant; shot in black and white from the forest's point of view." },
      { title: 'Aguirre, the Wrath of God', year: 1972, tmdbId: 2000, posterPath: 'https://image.tmdb.org/t/p/w342/zU1FLiGJw3m3iFrakwA0SzFvIPV.jpg', imdbRating: 7.8, director: 'Herzog', cast: 'Klaus Kinski, Helena Rojo, Del Negro', blurb: 'A conquistador expedition rafts down the Amazon in search of El Dorado while its mad lieutenant seizes command; Herzog, Kinski, real jungle, real madness.' },
      { title: 'Fitzcarraldo', year: 1982, tmdbId: 9343, posterPath: 'https://image.tmdb.org/t/p/w342/oBCnYEKcg1rMhr5JjDnrRpilvDd.jpg', imdbRating: 7.9, director: 'Herzog', cast: 'Klaus Kinski, Claudia Cardinale, José Lewgoy', blurb: 'An opera-obsessed dreamer schemes to build an opera house in the Amazon, which requires hauling a full-size steamship over a mountain; Herzog actually did it, with no effects.' },
      { title: 'Walkabout', year: 1971, tmdbId: 36040, posterPath: 'https://image.tmdb.org/t/p/w342/24vooYt5StgtgcQObVr1GHuM5gy.jpg', imdbRating: 7.6, director: 'Roeg', cast: 'Jenny Agutter, Luc Roeg, David Gulpilil', blurb: 'Abandoned in the Australian outback, two city children survive only because a young Aboriginal man on his ritual walkabout guides them; beautiful, strange and quietly tragic.' },
      { title: 'Picnic at Hanging Rock', year: 1975, tmdbId: 11020, posterPath: 'https://image.tmdb.org/t/p/w342/7BAXwmFN4pZDNb9N6kzmAAwdssi.jpg', imdbRating: 7.4, director: 'Weir', cast: 'Rachel Roberts, Vivean Gray, Helen Morse', blurb: "On Valentine's Day 1900, Australian schoolgirls climb a volcanic rock formation and three never come back; a mystery that refuses solution and lingers like a dream." },
      { title: 'The Revenant', year: 2015, tmdbId: 281957, posterPath: 'https://image.tmdb.org/t/p/w342/ji3ecJphATlVgWNY0B0RVXZizdf.jpg', imdbRating: 8, director: 'Iñárritu', cast: 'Leonardo DiCaprio, Tom Hardy, Domhnall Gleeson', blurb: 'Mauled by a bear and left for dead by his fur-trapping party, a frontiersman crawls through the winter wilderness for revenge; brutal survival shot in real cold and natural light.' },
      { title: 'Into the Wild', year: 2007, tmdbId: 5915, posterPath: 'https://image.tmdb.org/t/p/w342/jnLnLYP5pGDfri04gxtAqAvkHMw.jpg', imdbRating: 8, director: 'Penn', cast: 'Emile Hirsch, Marcia Gay Harden, William Hurt', blurb: 'A gifted graduate donates his savings, cuts off his family and hitchhikes to Alaska to live off the land; the true story of Christopher McCandless, generous to both his dream and its cost.' },
      { title: 'Dersu Uzala', year: 1975, tmdbId: 9764, posterPath: 'https://image.tmdb.org/t/p/w342/bIOrDQ3Gg68k3qJAnRU7nIZr0BW.jpg', imdbRating: 8.2, director: 'Kurosawa', cast: 'Yuriy Solomin, Maksim Munzuk, Mikhail Bychkov', blurb: "A Russian survey team in the Siberian taiga is saved repeatedly by Dersu, an aging Goldi hunter who reads the wilderness like text; Kurosawa's ode to a vanishing way of living." },
      { title: 'Princess Mononoke', year: 1997, tmdbId: 128, posterPath: 'https://image.tmdb.org/t/p/w342/cMYCDADoLKLbB83g4WnJegaZimC.jpg', imdbRating: 8.3, director: 'Miyazaki', cast: 'Yoji Matsuda, Yuriko Ishida, Yuko Tanaka', blurb: "A cursed prince lands between an iron-making town of outcasts and the wolf-raised girl defending the forest gods it is destroying; Miyazaki's epic where every side has its reasons." },
      { title: 'Spring, Summer, Fall, Winter… and Spring', year: 2003, tmdbId: 113, posterPath: 'https://image.tmdb.org/t/p/w342/6SQQ5REuAz7k0FMQ9mSCT40T2LN.jpg', imdbRating: 8, director: 'Kim Ki-duk', cast: 'Oh Young-soo, Kim Ki-duk, Kim Young-min', blurb: 'On a monastery floating on a mountain lake, a boy grows into a man, sins, and returns, across five seasons; Buddhist parable as landscape painting.' },
      { title: 'Honeyland', year: 2019, tmdbId: 566213, posterPath: 'https://image.tmdb.org/t/p/w342/3IxGhQEzLWOxkZlcNMAIiYlOT8D.jpg', imdbRating: 8, director: 'Stefanov & Kotevska', cast: 'Hatidzhe Muratova, Nazife Muratova, Hussein Sam', blurb: 'The last wild beekeeper in the Macedonian mountains lives by one rule, take half, leave half, until a chaotic family moves in next door and breaks it; a documentary with the shape of a fable.' },
      { title: 'Close to Eden / Urga', year: 1991, tmdbId: 36346, posterPath: 'https://image.tmdb.org/t/p/w342/zYenMsWvXEfjm95kkKmnBspylqc.jpg', imdbRating: 7.6, director: 'Mikhalkov', cast: 'Badema, Bayaertu, Vladimir Gostyukhin', blurb: 'A Mongolian herdsman living the old steppe life befriends a stranded Russian truck driver, then rides to town for condoms and comes back changed; warm, funny and elegiac.' },
      { title: 'Tulpan', year: 2008, tmdbId: 8939, posterPath: 'https://image.tmdb.org/t/p/w342/p6LMvGgoL5pEDJtUJuuFPt9SCDP.jpg', imdbRating: 6.3, director: 'Dvortsevoy', cast: 'Askhat Kuchencherekov, Samal Yeslyamova, Tulepbergen Baisakalov', blurb: 'A young sailor returns to the Kazakh steppe dreaming of a yurt, a flock and a wife, but the only eligible girl rejects his ears; deadpan comedy amid real dust storms and lambing.' },
      { title: 'The Story of the Weeping Camel', year: 2003, tmdbId: 1114, posterPath: 'https://image.tmdb.org/t/p/w342/c3SAAO5hNJqLWLlJr9TZ6CQ8eGI.jpg', imdbRating: 7.1, director: 'Davaa & Falorni', cast: 'Janchiv Ayurzana, Chimed Ohin, Amgaabazar Gonson', blurb: "A Gobi desert family's camel rejects her newborn calf, so they send for a musician whose ritual might move her to accept it; a documentary of astonishing patience." },
      { title: 'Microcosmos', year: 1996, tmdbId: 9305, posterPath: 'https://image.tmdb.org/t/p/w342/OPoiGrzNr5FWoczXH5Gs1cReec.jpg', imdbRating: 7.9, director: 'Nuridsany & Pérennou', cast: 'Jacques Perrin', blurb: "Insects in a French meadow filmed at their own scale, where a rainstorm is a catastrophe and a dung beetle's stuck load is an epic; no narration needed." },
      { title: 'Free Solo', year: 2018, tmdbId: 515042, posterPath: 'https://image.tmdb.org/t/p/w342/v4QfYZMACODlWul9doN9RxE99ag.jpg', imdbRating: 8.1, director: 'Chin & Vasarhelyi', cast: 'Alex Honnold, Tommy Caldwell, Jimmy Chin', blurb: "Alex Honnold prepares to climb El Capitan's 900-meter face alone and without a rope, while his girlfriend and the filmmakers weigh what it means to point cameras at it; palms sweat, guaranteed." },
      { title: "Meek's Cutoff", year: 2010, tmdbId: 57120, posterPath: 'https://image.tmdb.org/t/p/w342/oc28NmVqLx0x8epu3Ih3LvX4zE9.jpg', imdbRating: 6.5, director: 'Reichardt', cast: 'Michelle Williams, Bruce Greenwood, Will Patton', blurb: 'An 1845 wagon party lost on the Oregon high desert runs low on water and trust in the guide who led them there, then captures a Cayuse man who may or may not be leading them to it.' },
      { title: 'The Bear', year: 1988, tmdbId: 2383, posterPath: 'https://image.tmdb.org/t/p/w342/ry4A1Y2udvqyDlVHLtSeP1u9qwJ.jpg', imdbRating: 7.7, director: 'Annaud', cast: 'Tchéky Karyo, Bart the Bear, Douce the Bear', blurb: "An orphaned bear cub attaches itself to a huge wounded male while hunters track them through the Alps; told almost wordlessly from the animals' side." },
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
    heroPosition: 'center 40%',
    intro: [
      "In 1960s Paris, Godard, Truffaut and Varda ripped the camera off the dolly and ran into the street, and world cinema never recovered. Around the New Wave proper stood giants who were never quite in it: Bresson's asceticism, Tati's choreographed modernity, Demy's candy-colored heartbreak.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 10, 2026, around Bastille Day, featuring Breathless. Two films each from Godard, Truffaut, Varda, Resnais, Demy, Bresson and Chabrol map the decade\'s range.',
    ],
    items: [
      { title: 'Breathless', year: 1960, tmdbId: 269, posterPath: 'https://image.tmdb.org/t/p/w342/9Wx0Wdn2EOqeCZU4SP6tlS3LOml.jpg', imdbRating: 7.6, director: 'Godard', cast: 'Jean-Paul Belmondo, Jean Seberg, Daniel Boulanger', blurb: 'A small-time car thief who models himself on Bogart hides out with an American student in Paris after shooting a policeman; the jump-cut manifesto that announced the New Wave.' },
      { title: 'Pierrot le Fou', year: 1965, tmdbId: 2786, posterPath: 'https://image.tmdb.org/t/p/w342/i124H6iQB4CawrgFW9aZaZs7OBO.jpg', imdbRating: 7.4, director: 'Godard', cast: 'Jean-Paul Belmondo, Anna Karina, Graziella Galvani', blurb: 'A bored husband runs off with the babysitter, who happens to be tangled with gunrunners, into a primary-colored crime spree south; Godard at his most romantic and unhinged.' },
      { title: 'Jules and Jim', year: 1962, tmdbId: 1628, posterPath: 'https://image.tmdb.org/t/p/w342/kuFjZlcZhQFDtIjuI3GQJjsQG03.jpg', imdbRating: 7.7, director: 'Truffaut', cast: 'Jeanne Moreau, Oskar Werner, Henri Serre', blurb: "Two best friends love the same mercurial woman across twenty years and a world war; the New Wave's most famous love triangle, joyous until it is not." },
      { title: 'Shoot the Piano Player', year: 1960, tmdbId: 1818, posterPath: 'https://image.tmdb.org/t/p/w342/6UhMIZaaoe2HUU7sEIwYpuYgugh.jpg', imdbRating: 7.4, director: 'Truffaut', cast: 'Charles Aznavour, Marie Dubois, Nicole Berger', blurb: 'A once-famous concert pianist hides as a honky-tonk player in a Paris bar until his brothers drag him back into gangster trouble; noir, comedy and heartbreak shuffled together.' },
      { title: 'Cléo from 5 to 7', year: 1962, tmdbId: 499, posterPath: 'https://image.tmdb.org/t/p/w342/oelBStY4xpguaplRv15P3Za7Xsr.jpg', imdbRating: 7.8, director: 'Varda', cast: 'Corinne Marchand, Antoine Bourseiller, Dominique Davray', blurb: 'A pampered pop singer waits two hours for biopsy results, drifting through Paris as her fear strips away her vanity; told in near real time.' },
      { title: 'Le Bonheur', year: 1965, tmdbId: 53023, posterPath: 'https://image.tmdb.org/t/p/w342/nNW4ewpsqxEQQoHXv4PAUsFuDmd.jpg', imdbRating: 7.6, director: 'Varda', cast: 'Jean-Claude Drouot, Claire Drouot, Olivier Drouot', blurb: 'A carpenter loves his wife, loves his children, and then also loves a postmistress, and sees no problem; sunlit, scored to Mozart, and one of the most quietly merciless films ever made.' },
      { title: 'Last Year at Marienbad', year: 1961, tmdbId: 4024, posterPath: 'https://image.tmdb.org/t/p/w342/syIJCqiSkGRJTlyaBtyI5jqPtE7.jpg', imdbRating: 7.6, director: 'Resnais', cast: 'Delphine Seyrig, Giorgio Albertazzi, Sacha Pitoëff', blurb: 'In a vast baroque hotel, a man insists to a woman that they met and loved last year; she denies it; the film takes both sides. A gorgeous puzzle with no bottom.' },
      { title: 'Hiroshima mon amour', year: 1959, tmdbId: 5544, posterPath: 'https://image.tmdb.org/t/p/w342/zieczjWnvalaxwX5EQASEx0on5f.jpg', imdbRating: 7.8, director: 'Resnais', cast: 'Emmanuelle Riva, Eiji Okada, Stella Dassas', blurb: 'A French actress and a Japanese architect spend a night in Hiroshima trading memories of war, hers of a shaved head in Nevers, his of the bomb; Resnais fused love story and documentary.' },
      { title: 'The Umbrellas of Cherbourg', year: 1964, tmdbId: 5967, posterPath: 'https://image.tmdb.org/t/p/w342/tAgTf64XKK5ir7w5C7dnB53jWWG.jpg', imdbRating: 7.8, director: 'Demy', cast: 'Catherine Deneuve, Nino Castelnuovo, Anne Vernon', blurb: "A garage mechanic and a shop girl are separated by the Algerian war; every single line is sung, the colors are candy, and the ending is one of cinema's great heartbreaks." },
      { title: 'The Young Girls of Rochefort', year: 1967, tmdbId: 2433, posterPath: 'https://image.tmdb.org/t/p/w342/jtxhyGaYhurH6KsjvP1jV3dDypz.jpg', imdbRating: 7.7, director: 'Demy', cast: 'Catherine Deneuve, Françoise Dorléac, Jacques Perrin', blurb: "Twin sisters dream of Paris while a fair sets up in their pastel port town; one weekend of musical numbers and near-missed connections, Demy's sunniest film." },
      { title: 'Au Hasard Balthazar', year: 1966, tmdbId: 20108, posterPath: 'https://image.tmdb.org/t/p/w342/lkLO1HDzzaXpTXtAgnGpVqIQkvF.jpg', imdbRating: 7.7, director: 'Bresson', cast: 'Anne Wiazemsky, Walter Green, François Lafarge', blurb: "The life of a donkey, passed from owner to owner, kind and cruel, in parallel with the girl who first loved him; Bresson's austere style makes it shattering." },
      { title: 'Belle de Jour', year: 1967, tmdbId: 649, posterPath: 'https://image.tmdb.org/t/p/w342/iUAFECovwPA0cVV9bo4uNGLJSGL.jpg', imdbRating: 7.6, director: 'Buñuel', cast: 'Catherine Deneuve, Jean Sorel, Michel Piccoli', blurb: "A frigid, respectable doctor's wife secretly spends her afternoons working in a Paris brothel; Buñuel folds fantasy and reality together until neither label holds." },
      { title: "My Night at Maud's", year: 1969, tmdbId: 48831, posterPath: 'https://image.tmdb.org/t/p/w342/9usKgth3ROn4LwPQ7tTvxKnpBGL.jpg', imdbRating: 7.8, director: 'Rohmer', cast: 'Jean-Louis Trintignant, Françoise Fabian, Marie-Christine Barrault', blurb: 'A cautious Catholic engineer, resolved to marry a blonde stranger he has seen at mass, is snowed in overnight with the brilliant, freethinking Maud; nothing but talk, completely gripping.' },
      { title: 'Playtime', year: 1967, tmdbId: 10227, posterPath: 'https://image.tmdb.org/t/p/w342/kQOrS0DLUXYsqPMedM2G6NJcJBq.jpg', imdbRating: 7.8, director: 'Tati', cast: 'Jacques Tati, Barbara Dennek, Rita Maiden', blurb: "Tati's Monsieur Hulot and a group of American tourists wander a glass-and-steel Paris built full-scale for the film; sight gags staged across every corner of the frame. It bankrupted him." },
      { title: 'Mouchette', year: 1967, tmdbId: 1561, posterPath: 'https://image.tmdb.org/t/p/w342/cITZsSQ7VG122xQ0xAN3NHZF0OH.jpg', imdbRating: 7.7, director: 'Bresson', cast: 'Nadine Nortier, Jean-Claude Guilbert, Marie Cardinal', blurb: 'A poor rural teenager, bullied at school and burdened at home, moves through a short chain of small cruelties; Bresson at his most stern, with an ending that stops the breath.' },
      { title: 'Z', year: 1969, tmdbId: 2721, posterPath: 'https://image.tmdb.org/t/p/w342/dFAJyFNgvOv24f2RQyI9KDxjGr3.jpg', imdbRating: 7.8, director: 'Costa-Gavras', cast: 'Yves Montand, Irene Papas, Jean-Louis Trintignant', blurb: 'After a leftist politician is assassinated at a rally, a stubborn magistrate follows the evidence into the military government itself; a political thriller that plays like a race.' },
      { title: 'Les Bonnes Femmes', year: 1960, tmdbId: 27419, posterPath: 'https://image.tmdb.org/t/p/w342/9KV6RqMfnHmyrqK7phsH6lEQa52.jpg', imdbRating: 7.2, director: 'Chabrol', cast: 'Bernadette Lafont, Clotilde Joano, Stéphane Audran', blurb: "Four Paris shopgirls dream past their dead-end days toward romance; Chabrol watches the city's predators circle with cold clarity." },
      { title: 'Les Biches', year: 1968, tmdbId: 1787, posterPath: 'https://image.tmdb.org/t/p/w342/aso44GAzBFgw7q4FtbHVHbvJxos.jpg', imdbRating: 6.9, director: 'Chabrol', cast: 'Stéphane Audran, Jacqueline Sassard, Jean-Louis Trintignant', blurb: "A wealthy woman picks up a young street artist, takes her to St. Tropez, and the games of desire and possession slowly tighten; the film that opened Chabrol's great period." },
      { title: 'Le Feu Follet', year: 1963, tmdbId: 2593, posterPath: 'https://image.tmdb.org/t/p/w342/9iHsReoh2VuHihDmNXgLXCi18rR.jpg', imdbRating: 7.8, director: 'Malle', cast: 'Maurice Ronet, Léna Skerla, Yvonne Clech', blurb: 'A recovering alcoholic checks out of his clinic and spends two days visiting old friends in Paris, deciding whether any of it is reason enough to stay alive; lucid and devastating.' },
      { title: 'The Suitor', year: 1962, tmdbId: 67556, posterPath: 'https://image.tmdb.org/t/p/w342/ld8Ig3n6CR5hH8g62nQuWl8E68w.jpg', imdbRating: 7.2, director: 'Étaix', cast: 'France Arnel, Laurence Lignières, Claude Massot', blurb: "Ordered by his parents to find a wife, a sheltered young man studies romance like an engineering problem; near-silent physical comedy from Tati's true heir." },
      { title: 'A Man and a Woman', year: 1966, tmdbId: 42726, posterPath: 'https://image.tmdb.org/t/p/w342/boDZQiubhyhksN8fcgM4sXZ2btW.jpg', imdbRating: 7.4, director: 'Lelouch', cast: 'Anouk Aimée, Jean-Louis Trintignant, Pierre Barouh', blurb: "A widowed script girl and a widowed race-car driver meet at their children's boarding school and circle toward love; the theme tune conquered the world, the Palme d'Or followed." },
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
    heroPosition: 'center 28%',
    intro: [
      "Time travel is the genre where cinema invents its own physics: paradoxes, butterfly effects, second chances. It fits every budget, with Zemeckis's DeLorean and Nolan's wormholes at one end and Shane Carruth's garage experiment, famously made for around seven thousand dollars, at the other.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 3, 2026, featuring Back to the Future. Anime carries two of the best entries (Your Name, The Girl Who Leapt Through Time), and Hi, Mom, a Chinese box-office phenomenon, is the deep cut most Western viewers miss.',
    ],
    items: [
      { title: 'Back to the Future', year: 1985, tmdbId: 105, posterPath: 'https://image.tmdb.org/t/p/w342/vN5B5WgYscRGcQpVhHl6p9DDTP0.jpg', imdbRating: 8.5, director: 'Zemeckis', cast: 'Michael J. Fox, Christopher Lloyd, Crispin Glover', blurb: "A teenager accidentally drives a plutonium-powered DeLorean back to 1955, derails his parents' first meeting, and must make his mother fall for his father instead of him; the perfect script." },
      { title: 'The Terminator', year: 1984, tmdbId: 218, posterPath: 'https://image.tmdb.org/t/p/w342/qvktm0BHcnmDpul4Hz01GIazWPr.jpg', imdbRating: 8.1, director: 'Cameron', cast: 'Arnold Schwarzenegger, Michael Biehn, Linda Hamilton', blurb: 'An unstoppable cyborg is sent back from a machine-ruled future to kill the woman whose unborn son will lead the human resistance; lean, relentless, and still scary.' },
      { title: 'Terminator 2: Judgment Day', year: 1991, tmdbId: 280, posterPath: 'https://image.tmdb.org/t/p/w342/jFTVD4XoWQTcg7wdyJKa8PEds5q.jpg', imdbRating: 8.6, director: 'Cameron', cast: 'Arnold Schwarzenegger, Linda Hamilton, Edward Furlong', blurb: "The killer machine from the first film returns reprogrammed as a boy's protector, hunted by a shape-shifting upgrade; the rare sequel that outgrew its original." },
      { title: '12 Monkeys', year: 1995, tmdbId: 63, posterPath: 'https://image.tmdb.org/t/p/w342/gt3iyguaCIw8DpQZI1LIN5TohM2.jpg', imdbRating: 8, director: 'Gilliam', cast: 'Bruce Willis, Madeleine Stowe, Brad Pitt', blurb: 'A convict from a plague-ruined future is sent back to trace the outbreak, but keeps landing in the wrong year and doubting his own mind; built around one childhood memory at an airport.' },
      { title: 'Primer', year: 2004, tmdbId: 14337, posterPath: 'https://image.tmdb.org/t/p/w342/xEoq2WmDzpzxhkHEsmOYOg6BPg6.jpg', imdbRating: 6.7, director: 'Carruth', cast: 'Shane Carruth, David Sullivan, Casey Gooden', blurb: 'Two engineers discover time travel inside a garage startup and immediately begin using it against each other; famously made for around seven thousand dollars, and famously demanding a second viewing.' },
      { title: 'Donnie Darko', year: 2001, tmdbId: 141, posterPath: 'https://image.tmdb.org/t/p/w342/j2AtZFsflxiluaNtajMTI0Avm8C.jpg', imdbRating: 8, director: 'Kelly', cast: 'Jake Gyllenhaal, Jena Malone, James Duval', blurb: 'A sleepwalking suburban teenager survives a freak accident and starts receiving instructions from a man in a rabbit suit counting down to the end of the world; a cult object of endless interpretation.' },
      { title: 'Looper', year: 2012, tmdbId: 59967, posterPath: 'https://image.tmdb.org/t/p/w342/sNjL6SqErDBE8OUZlrDLkexfsCj.jpg', imdbRating: 7.4, director: 'Johnson', cast: 'Joseph Gordon-Levitt, Bruce Willis, Emily Blunt', blurb: 'In a future where the mob disposes of bodies by sending them thirty years back to contracted killers, one looper fails to kill his own older self; a tight thriller that plays fair with its rules.' },
      { title: 'Edge of Tomorrow', year: 2014, tmdbId: 137113, posterPath: 'https://image.tmdb.org/t/p/w342/nBM9MMa2WCwvMG4IJ3eiGUdbPe6.jpg', imdbRating: 7.9, director: 'Liman', cast: 'Tom Cruise, Emily Blunt, Brendan Gleeson', blurb: 'A PR officer with no combat training dies on an alien-war beach and wakes up the previous morning, again and again, leveling up each loop; the video-game structure done right.' },
      { title: 'Groundhog Day', year: 1993, tmdbId: 137, posterPath: 'https://image.tmdb.org/t/p/w342/gCgt1WARPZaXnq523ySQEUKinCs.jpg', imdbRating: 8, director: 'Ramis', cast: 'Bill Murray, Andie MacDowell, Chris Elliott', blurb: 'A contemptuous weatherman gets stuck living the same small-town February 2nd forever, cycling through despair, hedonism and, eventually, decency; the loop film every other one cites.' },
      { title: 'Interstellar', year: 2014, tmdbId: 157336, posterPath: 'https://image.tmdb.org/t/p/w342/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg', imdbRating: 8.7, director: 'Nolan', cast: 'Matthew McConaughey, Anne Hathaway, Michael Caine', blurb: "As blight strangles Earth, a pilot leaves his daughter behind to search for a new home through a wormhole, where hours cost decades; Nolan's biggest swing at heart and physics at once." },
      { title: 'Source Code', year: 2011, tmdbId: 45612, posterPath: 'https://image.tmdb.org/t/p/w342/nTr0lvAzeQmUjgSgDEHTJpnrxTz.jpg', imdbRating: 7.5, director: 'Jones', cast: 'Jake Gyllenhaal, Michelle Monaghan, Vera Farmiga', blurb: "A soldier wakes in another man's body aboard a commuter train that explodes in eight minutes, and is sent back into those eight minutes until he finds the bomber." },
      { title: 'About Time', year: 2013, tmdbId: 122906, posterPath: 'https://image.tmdb.org/t/p/w342/ls6zswrOZVhCXQBh96DlbnLBajM.jpg', imdbRating: 7.8, director: 'Curtis', cast: 'Domhnall Gleeson, Rachel McAdams, Bill Nighy', blurb: 'The men in one family can revisit their own past; the hero uses it first to find love, then learns what the gift is actually for; a romcom that turns into a father-son tearjerker.' },
      { title: 'Midnight in Paris', year: 2011, tmdbId: 59436, posterPath: 'https://image.tmdb.org/t/p/w342/4wBG5kbfagTQclETblPRRGihk0I.jpg', imdbRating: 7.6, director: 'Allen', cast: 'Owen Wilson, Rachel McAdams, Kathy Bates', blurb: 'A nostalgic screenwriter on holiday finds that at midnight a vintage car carries him to the Paris of Hemingway and Fitzgerald; a charming argument about golden-age thinking.' },
      { title: 'Time Bandits', year: 1981, tmdbId: 36819, posterPath: 'https://image.tmdb.org/t/p/w342/4VZtpwdhHQSa4LUkvujyGAHb1hG.jpg', imdbRating: 6.9, director: 'Gilliam', cast: 'Craig Warnock, David Rappaport, Kenny Baker', blurb: "A boy joins six dwarves who have stolen a map of time's holes, looting their way past Napoleon, Agamemnon and Evil itself; Gilliam's anarchic children's film that adults keep." },
      { title: 'Your Name', year: 2016, tmdbId: 372058, posterPath: 'https://image.tmdb.org/t/p/w342/vfJFJPepRKapMd5G2ro7klIRysq.jpg', imdbRating: 8.4, director: 'Shinkai', cast: 'Ryunosuke Kamiki, Mone Kamishiraishi, Ryo Narita', blurb: "A Tokyo boy and a small-town girl wake up in each other's bodies, build a life across the swaps, then discover the distance between them is stranger than geography; a phenomenon in Japan." },
      { title: 'The Girl Who Leapt Through Time', year: 2006, tmdbId: 14069, posterPath: 'https://image.tmdb.org/t/p/w342/fmK92C7HGu6sK0axItlQ0YsO9qR.jpg', imdbRating: 7.6, director: 'Hosoda', cast: 'Riisa Naka, Takuya Ishida, Mitsutaka Itakura', blurb: 'A schoolgirl gains the power to leap back through her day and spends it dodging embarrassments, until the counter on her arm runs low; small stakes, real feeling.' },
      { title: 'Timecrimes', year: 2007, tmdbId: 14139, posterPath: 'https://image.tmdb.org/t/p/w342/zdxQRP7mzczMJBwKnv8MCPRq7rQ.jpg', imdbRating: 7.1, director: 'Vigalondo', cast: 'Karra Elejalde, Candela Fernández, Bárbara Goenaga', blurb: 'A man watching a woman through binoculars stumbles into a machine that sends him one hour back, and must manage three overlapping versions of himself; a Spanish loop wound watch-tight.' },
      { title: 'Hi, Mom', year: 2021, tmdbId: 758891, posterPath: 'https://image.tmdb.org/t/p/w342/31W7qLEMqQKgdCeCtV9EbVi3bwG.jpg', imdbRating: 6.9, director: 'Jia Ling', cast: 'Jia Ling, Zhang Xiaofei, Shen Teng', blurb: "Grieving her mother's sudden death, a woman falls back to 1981 and befriends her as a young co-worker, scheming to give her a better life; a Chinese box-office phenomenon that earns its tears." },
      { title: 'Predestination', year: 2014, tmdbId: 206487, posterPath: 'https://image.tmdb.org/t/p/w342/38Xr1JnV1ZcLQ55zmdSp6n475cZ.jpg', imdbRating: 7.4, director: 'Spierig', cast: 'Ethan Hawke, Sarah Snook, Noah Taylor', blurb: "A temporal agent's last assignment, told through a stranger's life story in a bar, folds in on itself until every role is accounted for; the tightest paradox plot ever filmed." },
      { title: 'Time After Time', year: 1979, tmdbId: 24750, posterPath: 'https://image.tmdb.org/t/p/w342/A4SXZxQempzTUReRlQiFaYc6KaC.jpg', imdbRating: 7, director: 'Meyer', cast: 'Malcolm McDowell, David Warner, Mary Steenburgen', blurb: 'H.G. Wells builds a working time machine, Jack the Ripper steals it, and Wells chases him into 1979 San Francisco, where a bank clerk mistakes the Victorian for a charming eccentric.' },
      { title: 'Tenet', year: 2020, tmdbId: 577922, posterPath: 'https://image.tmdb.org/t/p/w342/aCIFMriQh8rvhxpN1IWGgvH0Tlg.jpg', imdbRating: 7.2, director: 'Nolan', cast: 'John David Washington, Robert Pattinson, Elizabeth Debicki', blurb: 'A CIA operative learns some objects and people move backwards through time and follows them into a cold-war plot around inverted entropy; Nolan at maximum, best not decoded on first watch.' },
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
    heroPosition: 'center 40%',
    intro: [
      'When a director turns the camera on their own life, the result carries a rawness no biopic reaches: Cuarón rebuilding his childhood home tile by tile, Truffaut sending his delinquent double running to the sea, Fellini turning memory into a circus.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of June 26, 2026, featuring Roma. It stretches the form from straight memoir (Belfast, The Fabelmans) to essay (The Beaches of Agnès) to fiction one heartbeat away from confession (Aftersun, The Souvenir).',
    ],
    items: [
      { title: 'Roma', year: 2018, tmdbId: 426426, posterPath: 'https://image.tmdb.org/t/p/w342/dtIIyQyALk57ko5bjac7hi01YQ.jpg', imdbRating: 7.6, director: 'Cuarón', cast: 'Yalitza Aparicio, Marina de Tavira, Diego Cortina Autrey', blurb: 'A year in the life of a middle-class Mexico City family and Cleo, the indigenous live-in nanny who holds it together; Cuarón rebuilt his childhood street and shot it himself in black and white.' },
      { title: 'Amarcord', year: 1973, tmdbId: 7857, posterPath: 'https://image.tmdb.org/t/p/w342/kS7i093sQpkLTawUEdgf4HVOHSc.jpg', imdbRating: 7.8, director: 'Fellini', cast: 'Pupella Maggio, Armando Brancia, Magali Noël', blurb: 'A year in a 1930s Adriatic town under fascism, remembered as carnival: the town beauty, the fog, the peacock in the snow; Fellini turning his boyhood into myth.' },
      { title: '8½', year: 1963, tmdbId: 422, posterPath: 'https://image.tmdb.org/t/p/w342/23VIf7zNxAgaXwIlvzd3IvOd9sY.jpg', imdbRating: 8.1, director: 'Fellini', cast: 'Marcello Mastroianni, Claudia Cardinale, Anouk Aimée', blurb: 'A famous director hides in a spa town, besieged by producers, wives and mistresses, unable to start his next film; the definitive movie about creative block, made while Fellini had it.' },
      { title: 'The 400 Blows', year: 1959, tmdbId: 147, posterPath: 'https://image.tmdb.org/t/p/w342/12PuU23kkDLvTd0nb8hMlE3oShB.jpg', imdbRating: 8, director: 'Truffaut', cast: 'Jean-Pierre Léaud, Claire Maurier, Albert Rémy', blurb: "A neglected Paris twelve-year-old skips school, steals a typewriter and lands in a reform institution; Truffaut's own childhood, ending on cinema's most famous freeze frame." },
      { title: 'Mirror', year: 1975, tmdbId: 1396, posterPath: 'https://image.tmdb.org/t/p/w342/AttDP5OEsMxtHPPN7Z92p2Ntnmd.jpg', imdbRating: 8, director: 'Tarkovsky', cast: 'Margarita Terekhova, Ignat Daniltsev, Larisa Tarkovskaya', blurb: "A dying poet's memories, his mother, wartime evacuation, newsreels and dreams flow together without plot; Tarkovsky's most personal film, structured like remembering actually feels." },
      { title: 'Wild Strawberries', year: 1957, tmdbId: 614, posterPath: 'https://image.tmdb.org/t/p/w342/iyTD2QnySNMPUPE3IedZQipSWfz.jpg', imdbRating: 8.1, director: 'Bergman', cast: 'Victor Sjöström, Bibi Andersson, Ingrid Thulin', blurb: "An elderly professor drives across Sweden to receive an honorary degree, revisiting in dreams and memories the coldness that shaped his life; Bergman's warmest masterpiece." },
      { title: 'All That Jazz', year: 1979, tmdbId: 16858, posterPath: 'https://image.tmdb.org/t/p/w342/culCEdj4srLljefgn4XKd6k3C5t.jpg', imdbRating: 7.8, director: 'Fosse', cast: 'Roy Scheider, Jessica Lange, Ann Reinking', blurb: 'A pill-driven director-choreographer juggles a Broadway show, a film edit, women and heart disease, staging his own decline as a musical; Fosse made it about himself and then it came true.' },
      { title: 'Cinema Paradiso', year: 1988, tmdbId: 11216, posterPath: 'https://image.tmdb.org/t/p/w342/9JhfVOveaY00o8njQu2Xrp4YWud.jpg', imdbRating: 8.5, director: 'Tornatore', cast: 'Philippe Noiret, Jacques Perrin, Marco Leonardi', blurb: 'A famous director remembers the Sicilian village cinema where the projectionist became his second father; the love letter to moviegoing itself, censored kisses and all.' },
      { title: 'Annie Hall', year: 1977, tmdbId: 703, posterPath: 'https://image.tmdb.org/t/p/w342/dEtjPywhDbAXYjoFfhBC4U9unU7.jpg', imdbRating: 7.9, director: 'Allen', cast: 'Diane Keaton, Woody Allen, Tony Roberts', blurb: 'A neurotic New York comedian autopsies his failed relationship with an aspiring singer, breaking the fourth wall, timeline and format to figure out where it went; the romcom template since.' },
      { title: 'Pain and Glory', year: 2019, tmdbId: 519010, posterPath: 'https://image.tmdb.org/t/p/w342/cMlueArJXXwZbeLpb4NhC3pxmBk.jpg', imdbRating: 7.5, director: 'Almodóvar', cast: 'Antonio Banderas, Asier Etxeandia, Leonardo Sbaraglia', blurb: 'An ailing film director in Madrid, unable to work, drifts into memories of his childhood and a reunion with an old lover; Banderas plays a barely veiled Almodóvar.' },
      { title: 'The Hand of God', year: 2021, tmdbId: 722778, posterPath: 'https://image.tmdb.org/t/p/w342/kreVxr5moB7K52IGGV1BGAn6nq1.jpg', imdbRating: 7.3, director: 'Sorrentino', cast: 'Filippo Scotti, Toni Servillo, Teresa Saponangelo', blurb: "A Naples teenager in the 1980s lives for Maradona's arrival, until a family tragedy, the one the title refers to, knocks his life onto the path of filmmaking; Sorrentino's own story." },
      { title: 'Belfast', year: 2021, tmdbId: 777270, posterPath: 'https://image.tmdb.org/t/p/w342/3mInLZyPOVLsZRsBwNHi3UJXXnm.jpg', imdbRating: 7.2, director: 'Branagh', cast: 'Jude Hill, Jamie Dornan, Caitríona Balfe', blurb: "A nine-year-old's Belfast street becomes a barricaded front line of the Troubles while his family debates leaving; Branagh's childhood in black and white, buoyed by Van Morrison." },
      { title: 'The Fabelmans', year: 2022, tmdbId: 804095, posterPath: 'https://image.tmdb.org/t/p/w342/h7llKkqkkJtJrTOaDLuVeUYDQ7I.jpg', imdbRating: 7.5, director: 'Spielberg', cast: 'Michelle Williams, Paul Dano, Seth Rogen', blurb: "A boy falls in love with making movies and then, editing home footage, discovers his mother's secret; Spielberg finally filming the family story under all his others." },
      { title: 'Persepolis', year: 2007, tmdbId: 2011, posterPath: 'https://image.tmdb.org/t/p/w342/aU8i2QAdTyRR1nYb36Gq51xXP8p.jpg', imdbRating: 8, director: 'Satrapi & Paronnaud', cast: 'Chiara Mastroianni, Danielle Darrieux, Catherine Deneuve', blurb: "A outspoken girl grows up through the Iranian revolution and war, is sent alone to Europe, and returns a stranger; Marjane Satrapi's graphic memoir animated in stark ink." },
      { title: 'Distant Voices, Still Lives', year: 1988, tmdbId: 41799, posterPath: 'https://image.tmdb.org/t/p/w342/7tixkjzGHY2tBh6j6L4azkx6OQc.jpg', imdbRating: 7.4, director: 'Davies', cast: 'Freda Dowie, Pete Postlethwaite, Angela Walsh', blurb: 'A working-class Liverpool family in the 1940s and 50s, ruled by a violent father, remembered as a album of pub singalongs, weddings and bruises; memory arranged by song rather than dates.' },
      { title: 'A Time to Live and a Time to Die', year: 1985, tmdbId: 45999, posterPath: 'https://image.tmdb.org/t/p/w342/7yFSUy939rX5CncqieINpajnM3q.jpg', imdbRating: 7.5, director: 'Hou Hsiao-hsien', cast: 'Yu An-shun, Tien Feng, Mei Fang', blurb: "A family displaced from mainland China raises its children in small-town Taiwan, the grandmother still trying to walk home; Hou's autobiographical masterpiece of drift between generations." },
      { title: 'The Spirit of the Beehive', year: 1973, tmdbId: 4495, posterPath: 'https://image.tmdb.org/t/p/w342/o6pUTkoCh4r6EA2dHNFKA40OmH2.jpg', imdbRating: 7.7, director: 'Erice', cast: 'Ana Torrent, Fernando Fernán Gómez, Teresa Gimpera', blurb: "In a silent village after Spain's civil war, a small girl sees Frankenstein at a traveling cinema and goes looking for the spirit; childhood wonder as quiet resistance to Franco's Spain." },
      { title: 'The Beaches of Agnès', year: 2008, tmdbId: 38879, posterPath: 'https://image.tmdb.org/t/p/w342/mqTFhLpdyMNLBvmN5KFhCOFWWIp.jpg', imdbRating: 8, director: 'Varda', cast: 'Agnès Varda, André Lubrano, Blaise Fournier', blurb: 'At eighty, Agnès Varda walks back through her own life with mirrors on beaches, reconstructed sets and old friends; a self-portrait as playful as anything she ever made.' },
      { title: 'The Souvenir', year: 2019, tmdbId: 473019, posterPath: 'https://image.tmdb.org/t/p/w342/2Nj04HsZ0lNkv07JnfBZ0bAIECn.jpg', imdbRating: 6.4, director: 'Hogg', cast: 'Honor Swinton Byrne, Tom Burke, Tilda Swinton', blurb: 'A sheltered film student in 1980s London falls into a consuming relationship with a cultured older man concealing an addiction; Joanna Hogg restaging her own youth with unnerving honesty.' },
      { title: 'Aftersun', year: 2022, tmdbId: 965150, posterPath: 'https://image.tmdb.org/t/p/w342/evKz85EKouVbIr51zy5fOtpNRPg.jpg', imdbRating: 7.6, director: 'Wells', cast: 'Paul Mescal, Frankie Corio, Brooklyn Toulson', blurb: 'A woman replays a childhood package holiday in Turkey with her young, loving, quietly drowning father, searching the camcorder footage for what she missed; devastating by stealth.' },
      { title: 'The Diving Bell and the Butterfly', year: 2007, tmdbId: 2013, posterPath: 'https://image.tmdb.org/t/p/w342/6NkJ4gnLrvLj0PZDW6sNM85JMbj.jpg', imdbRating: 7.6, director: 'Schnabel', cast: 'Mathieu Amalric, Emmanuelle Seigner, Marie-Josée Croze', blurb: 'Elle editor Jean-Dominique Bauby, paralyzed by a stroke at forty-three, dictates a memoir letter by letter with his one working eyelid; filmed largely from inside his gaze.' },
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
    heroPosition: 'center 30%',
    intro: [
      "Under state censorship, Eastern Europe's young filmmakers smuggled absurdism, sexuality and open dissent into cinemas, and some paid for it in banned films and broken careers. The Czechoslovak New Wave laughs, the Polish school mourns, and the Soviets built cathedrals of the image.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of June 19, 2026, featuring Menzel's Closely Watched Trains. Romania (The Forest of the Hanged, Silent Wedding), Bulgaria (The Tied Up Balloon, Iconostasis) and Yugoslavia widen it past the usual suspects.",
    ],
    items: [
      { title: 'Closely Watched Trains', year: 1966, tmdbId: 789, posterPath: 'https://image.tmdb.org/t/p/w342/oKiOhsSRWO6fRqxtvda8WuCiXBm.jpg', imdbRating: 7.6, director: 'Menzel', cast: 'Václav Neckář, Jitka Scoffin, Vladimír Valenta', blurb: 'A shy apprentice at a sleepy Czech station during the Occupation is preoccupied with losing his virginity until history hands him a package; comic, tender, then quietly devastating. It won the Oscar.' },
      { title: 'Loves of a Blonde', year: 1965, tmdbId: 39387, posterPath: 'https://image.tmdb.org/t/p/w342/fyRg6Qh4oN1KRfkx8Q3DFzA642P.jpg', imdbRating: 7.4, director: 'Forman', cast: 'Hana Brejchová, Vladimír Pucholt, Vladimír Menšík', blurb: "A girl from a factory town of women falls for a visiting pianist and shows up at his family's Prague flat; Forman's bittersweet comedy of small hopes and awkward parents." },
      { title: 'Daisies', year: 1966, tmdbId: 46919, posterPath: 'https://image.tmdb.org/t/p/w342/8sxMhdn3i1Pn8OlGCBBjr9rjP1y.jpg', imdbRating: 7.3, director: 'Chytilová', cast: 'Jitka Cerhová, Ivana Karbanová, Helena Anýžová', blurb: 'Two young women named Marie decide the world is spoiled and set about spoiling themselves, wrecking dinners, suitors and a state banquet; anarchic collage cinema the regime banned.' },
      { title: 'The Shop on Main Street', year: 1965, tmdbId: 25905, posterPath: 'https://image.tmdb.org/t/p/w342/pOjsOzPzYrCFsMsatKxAwYzIeCg.jpg', imdbRating: 8.2, director: 'Kadár & Klos', cast: 'Ida Kamińska, Jozef Kroner, František Zvarík', blurb: "In wartime Slovakia, an easygoing carpenter is made 'aryan controller' of an old deaf Jewish widow's button shop, and she thinks he is her assistant; comedy curdles into tragedy. An Oscar winner." },
      { title: 'Ashes and Diamonds', year: 1958, tmdbId: 5055, posterPath: 'https://image.tmdb.org/t/p/w342/nE8aqRvVnRQEqskiarnFhdJdk8g.jpg', imdbRating: 7.7, director: 'Wajda', cast: 'Zbigniew Cybulski, Ewa Krzyżewska, Wacław Zastrzeżynski', blurb: 'On the last day of the war, a young Polish resistance fighter is ordered to assassinate a communist official, and hesitates for one night of doubt and love.' },
      { title: 'Knife in the Water', year: 1962, tmdbId: 11502, posterPath: 'https://image.tmdb.org/t/p/w342/tkdeCwZhy9hzzVjZFjw0RPGWUIg.jpg', imdbRating: 7.4, director: 'Polanski', cast: 'Leon Niemczyk, Jolanta Umecka, Zygmunt Malanowicz', blurb: "A quarreling couple pick up a young hitchhiker and take him sailing overnight; three people, one yacht, one knife. Polanski's debut and still a masterclass in tension." },
      { title: 'A Short Film About Killing', year: 1988, tmdbId: 10754, posterPath: 'https://image.tmdb.org/t/p/w342/x8zenootZTTB1iEdUQA9dnEuLqv.jpg', imdbRating: 7.9, director: 'Kieślowski', cast: 'Mirosław Baka, Krzysztof Globisz, Jan Tesarz', blurb: 'A drifting young man murders a taxi driver without reason; the state then kills him with procedure; both acts filmed with the same unbearable attention. It helped end the Polish death penalty.' },
      { title: 'The Round-Up', year: 1966, tmdbId: 94663, posterPath: 'https://image.tmdb.org/t/p/w342/7dCBle7ZTLXxvXLhVP96fmyE3wA.jpg', imdbRating: 7.5, director: 'Jancsó', cast: 'Zoltán Latinovits, János Görbe, Tibor Molnár', blurb: 'After a crushed uprising, Hungarian authorities herd suspects into a plains stockade and break them with informers, promises and geometry; oppression rendered as choreography.' },
      { title: 'Mephisto', year: 1981, tmdbId: 11911, posterPath: 'https://image.tmdb.org/t/p/w342/SNJoUTU8PSxQlj3RkrwYGOQPyj.jpg', imdbRating: 7.7, director: 'Szabó', cast: 'Klaus Maria Brandauer, Krystyna Janda, Ildikó Bánsági', blurb: 'A brilliant German actor keeps rationalizing each accommodation with the Nazi state as his career soars, until he belongs to them entirely; an Oscar winner about the price of the spotlight.' },
      { title: 'Sátántangó', year: 1994, tmdbId: 31414, posterPath: 'https://image.tmdb.org/t/p/w342/y38z0v4HJ12MHiKddLEoFlvPiBt.jpg', imdbRating: 8.2, director: 'Tarr', cast: 'Mihály Víg, Putyi Horváth, Székely B. Miklós', blurb: 'A collective farm rots in rain and mud until a charismatic man they thought dead returns with a plan; seven hours of long takes that admirers describe as hypnosis rather than duration.' },
      { title: 'Andrei Rublev', year: 1966, tmdbId: 895, posterPath: 'https://image.tmdb.org/t/p/w342/jUihkn16SwPPIjuOyo6orHWUep6.jpg', imdbRating: 8, director: 'Tarkovsky', cast: 'Anatoliy Solonitsyn, Ivan Lapikov, Mykola Hrynko', blurb: "Russia's greatest icon painter wanders a medieval landscape of raids, plagues and cruelty, losing his faith in art until a boy casting a giant bell restores it; shelved for years by Soviet censors." },
      { title: 'Come and See', year: 1985, tmdbId: 25237, posterPath: 'https://image.tmdb.org/t/p/w342/qNbMsKVzigERgJUbwf8pKyZogpb.jpg', imdbRating: 8.3, director: 'Klimov', cast: 'Aleksei Kravchenko, Olga Mironova, Liubomiras Laucevičius', blurb: 'A Belarusian village boy joins the partisans and witnesses, at closer and closer range, what the German army did to his country; often called the most harrowing war film ever made.' },
      { title: 'The Cranes Are Flying', year: 1957, tmdbId: 38360, posterPath: 'https://image.tmdb.org/t/p/w342/foXYOdXEJ0rvtTDo4LLnsUnvPLB.jpg', imdbRating: 8.3, director: 'Kalatozov', cast: 'Tatyana Samoylova, Aleksey Batalov, Vasili Merkuryev', blurb: "A Moscow couple is torn apart by the war, he to the front, she into a disastrous marriage; the swooping camerawork electrified world cinema and won the Palme d'Or." },
      { title: 'The Color of Pomegranates', year: 1969, tmdbId: 26302, posterPath: 'https://image.tmdb.org/t/p/w342/rMUbQf7RgsYgQ47AFf1wpoSt4dX.jpg', imdbRating: 7.6, director: 'Parajanov', cast: 'Spartak Bagashvili, Sofiko Chiaureli, Medea Japaridze', blurb: 'The life of an Armenian poet told not as story but as living icons: tableaux of books, wool, pomegranates and blood; banned, recut, and like nothing else ever filmed.' },
      { title: 'The Forest of the Hanged', year: 1965, tmdbId: 118487, posterPath: 'https://image.tmdb.org/t/p/w342/pRFflpigFD9vSoPCcESjwGg4cjz.jpg', imdbRating: 8.1, director: 'Ciulei', cast: 'Victor Rebengiuc, Anna Széles, Ștefan Ciubotărașu', blurb: 'A Romanian officer in the Austro-Hungarian army, ordered to fight his own people, walks toward a crisis of conscience under the gallows of the title; the great Romanian film of its era.' },
      { title: 'Silent Wedding', year: 2008, tmdbId: 26752, posterPath: 'https://image.tmdb.org/t/p/w342/9lnJtOSbLtrYs7K0SRqCLUq3J6V.jpg', imdbRating: 7.8, director: 'Mălăele', cast: 'Meda Andreea Victor, Alexandru Potocean, Valentin Teodosiu', blurb: "A Romanian village throws a wedding the night Stalin's death is announced and all celebration is forbidden, so the party continues in total silence; comic until the tanks arrive." },
      { title: 'The Tied Up Balloon', year: 1967, tmdbId: 260454, posterPath: 'https://image.tmdb.org/t/p/w342/8fefVBs0Fqr6g5sdTyqcYQUv52Y.jpg', imdbRating: 7.5, director: 'Zhelyazkova', cast: 'Grigor Vachkov, Georgi Kaloyanchev, Georgi Partsalev', blurb: 'A huge stray balloon drifts over a Bulgarian village and the peasants chase, worship and fight it; an absurdist parable the regime understood perfectly, and banned.' },
      { title: 'Iconostasis', year: 1969, tmdbId: 267650, posterPath: 'https://image.tmdb.org/t/p/w342/1XmuIZ3L4Ji5JuaaL5BEqkSxjpx.jpg', imdbRating: 7.1, director: 'Hristov', blurb: "A master icon carver in Ottoman-era Bulgaria is torn between sacred tradition and his own hands' ambition; a meditation on art and faith drawn from a classic novel." },
      { title: 'Time of the Gypsies', year: 1988, tmdbId: 20123, posterPath: 'https://image.tmdb.org/t/p/w342/fF9kWNMjiXC6f4YrdVFA0ScnWgQ.jpg', imdbRating: 8.1, director: 'Kusturica', cast: 'Davor Dujmović, Borivoje Todorović, Ljubica Adžović', blurb: "A Romani boy with telekinetic gifts leaves his grandmother's village with a gangster who trades in children, dreaming of returning rich; Kusturica's sprawling, magical tragedy." },
      { title: 'W.R.: Mysteries of the Organism', year: 1971, tmdbId: 42529, posterPath: 'https://image.tmdb.org/t/p/w342/k0TNEVnIUgMIQrkcBasprdZh5Bz.jpg', imdbRating: 6.7, director: 'Makavejev', cast: 'Milena Dravić, Ivica Vidović, Jagoda Kaloper', blurb: 'A collage on psychoanalyst Wilhelm Reich, sexual liberation and state socialism, spliced with a Yugoslav love story that ends in decapitation; banned at home for sixteen years.' },
      { title: "The Firemen's Ball", year: 1967, tmdbId: 38442, posterPath: 'https://image.tmdb.org/t/p/w342/yylEjPttmTDar0o92StlrO5ghmw.jpg', imdbRating: 7.1, director: 'Forman', cast: 'Jan Vostrčil, Josef Šebánek, František Debelka', blurb: "A small-town fire brigade's annual ball collapses in real time: the raffle prizes are stolen, the beauty contest revolts, a house burns down; the satire that got Forman exiled after 1968." },
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
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/tvNuhRlpRozDgsX1zR9gQ2aHv1X.jpg',
    heroPosition: 'center 25%',
    intro: [
      "Sport on film is never really about the game; it is drama with a scoreboard. This collection ran the week the 2026 World Cup kicked off, so football leads: Loach's Cantona fable, Panahi's women locked out of a Tehran stadium, Chow's Shaolin strikers, an Allied XI escaping through a Paris crowd.",
      "It ran as the weekly theme in the I Like Movies Discover tab for the week of June 12, 2026, featuring Bend It Like Beckham. Beyond the pitch: Scorsese's ring, Kapadia's cockpit, Tonya on the ice and Lagaan's cricket match against the Raj.",
    ],
    items: [
      { title: 'Bend It Like Beckham', year: 2002, tmdbId: 455, posterPath: 'https://image.tmdb.org/t/p/w342/2dzSBmFWWqt8NbnubJKIWU21Y86.jpg', imdbRating: 6.7, director: 'Chadha', cast: 'Parminder Nagra, Keira Knightley, Jonathan Rhys Meyers', blurb: "A London Sikh teenager secretly joins a women's football team against her parents' plans for her; the crowd-pleaser that launched Keira Knightley and a thousand girls' teams." },
      { title: 'Looking for Eric', year: 2009, tmdbId: 18898, posterPath: 'https://image.tmdb.org/t/p/w342/fTHUY0E1FYMFKiQ8UDKx793LtW0.jpg', imdbRating: 7.1, director: 'Loach', cast: 'Steve Evets, Éric Cantona, Stephanie Bishop', blurb: "A depressed Manchester postman starts receiving life coaching from an imaginary Eric Cantona, playing himself and quoting his own aphorisms; Loach's warmest film." },
      { title: 'Offside', year: 2006, tmdbId: 13209, posterPath: 'https://image.tmdb.org/t/p/w342/9BDtD58nuNFyByMAoTLdFNHX5qZ.jpg', imdbRating: 7, director: 'Panahi', cast: 'Sima Mobarak-Shahi, Shayesteh Irani, Ayda Sadeqi', blurb: 'Iranian women disguise themselves as boys to sneak into a World Cup qualifier and are penned by young soldiers just outside the stadium; shot guerrilla-style at the real match.' },
      { title: 'Escape to Victory', year: 1981, tmdbId: 17360, posterPath: 'https://image.tmdb.org/t/p/w342/3j6H0dnbvjNXLK1l9nKguXw5vvO.jpg', imdbRating: 6.6, director: 'Huston', cast: 'Sylvester Stallone, Michael Caine, Max von Sydow', blurb: "Allied POWs agree to play a Nazi propaganda football match in occupied Paris, planning to escape at halftime; Caine, Stallone in goal, and Pelé's overhead kick. Preposterous and beloved." },
      { title: 'The Damned United', year: 2009, tmdbId: 21641, posterPath: 'https://image.tmdb.org/t/p/w342/ftlbCma6QoRiZgiflVmLuPKHrkq.jpg', imdbRating: 7.5, director: 'Hooper', cast: 'Michael Sheen, Timothy Spall, Colm Meaney', blurb: "The true story of Brian Clough's 44 days managing Leeds United, the champion team he had spent years publicly despising; a sports film about ego, rivalry and one broken friendship." },
      { title: 'Diego Maradona', year: 2019, tmdbId: 536841, posterPath: 'https://image.tmdb.org/t/p/w342/3eBZxi0xcXBnEYq4m4YTVf0eHWX.jpg', imdbRating: 7.7, director: 'Kapadia', cast: 'Diego Maradona, Pelé, Dalma Maradona', blurb: "Assembled from 500 hours of archive: Maradona's years at Napoli, from god to scapegoat, as the city, the Camorra and his own appetites close in." },
      { title: 'The Miracle of Bern', year: 2003, tmdbId: 1611, posterPath: 'https://image.tmdb.org/t/p/w342/ujNucP3lk3VpJAswjNBUc0DYHPT.jpg', imdbRating: 6.7, director: 'Wortmann', cast: 'Louis Klamroth, Peter Lohmeyer, Johanna Gastdorf', blurb: "A boy's POW father returns broken from a Soviet camp as West Germany improbably marches to the 1954 World Cup final; the tournament that let a country feel something again." },
      { title: 'Shaolin Soccer', year: 2001, tmdbId: 11770, posterPath: 'https://image.tmdb.org/t/p/w342/z6ZQqwoxWy9muIxwUP4K2zWw7BU.jpg', imdbRating: 7.3, director: 'Chow', cast: 'Stephen Chow, Richard Ng Man-Tat, Zhao Wei', blurb: 'A down-and-out kung fu devotee recruits his former Shaolin brothers to apply their superhuman skills to football; cartoon physics, flying bicycle kicks, pure joy.' },
      { title: 'The Two Escobars', year: 2010, tmdbId: 53190, posterPath: 'https://image.tmdb.org/t/p/w342/qYnslGb1D0JgYLQYiwPqQ2ojQDv.jpg', imdbRating: 8.1, director: 'Zimbalist', cast: 'Andrés Escobar, Pablo Escobar, María Ester Escobar', blurb: "Pablo Escobar's cartel money built Colombian football's golden generation; captain Andrés Escobar's own-goal at the 1994 World Cup got him murdered. One country, two Escobars, one documentary." },
      { title: 'Raging Bull', year: 1980, tmdbId: 1578, posterPath: 'https://image.tmdb.org/t/p/w342/1WV7WlTS8LI1L5NkCgjWT9GSW3O.jpg', imdbRating: 8.1, director: 'Scorsese', cast: 'Robert De Niro, Cathy Moriarty, Joe Pesci', blurb: "Boxer Jake LaMotta batters his way to the middleweight title while destroying his brother, his marriage and himself; Scorsese and De Niro's black-and-white masterpiece about rage with nowhere to go." },
      { title: 'Rocky', year: 1976, tmdbId: 1366, posterPath: 'https://image.tmdb.org/t/p/w342/xSI0dbKLDETwhiVUy6hGE8KXUln.jpg', imdbRating: 8.1, director: 'Avildsen', cast: 'Sylvester Stallone, Talia Shire, Burt Young', blurb: 'A Philadelphia club fighter and debt collector gets a freak title shot against the champion and asks only to go the distance; the underdog original, written by its unknown star.' },
      { title: 'When We Were Kings', year: 1996, tmdbId: 10548, posterPath: 'https://image.tmdb.org/t/p/w342/yBkZK1JZOOJ3q5Jj1H9UP9T8YuV.jpg', imdbRating: 7.9, director: 'Gast', cast: 'Muhammad Ali, George Foreman, Don King', blurb: 'The 1974 Rumble in the Jungle: Ali, huge underdog against Foreman in Zaire, the rope-a-dope, and the music festival around it; twenty years in the editing, an Oscar at the end.' },
      { title: 'Senna', year: 2010, tmdbId: 58496, posterPath: 'https://image.tmdb.org/t/p/w342/nZbLCbRoP6iJq5sr8daHQzjnzFh.jpg', imdbRating: 8.4, director: 'Kapadia', cast: 'Ayrton Senna, Alain Prost, Frank Williams', blurb: "Ayrton Senna's decade in Formula 1, his war with Prost and with the sport's politics, cut entirely from race footage and home video into something like Greek tragedy." },
      { title: 'Rush', year: 2013, tmdbId: 96721, posterPath: 'https://image.tmdb.org/t/p/w342/95BDrWmcfJDEa2WCfjmLgi67jhi.jpg', imdbRating: 8.1, director: 'Howard', cast: 'Chris Hemsworth, Daniel Brühl, Olivia Wilde', blurb: 'Playboy James Hunt and calculating Niki Lauda push their 1976 title fight to the edge, through the crash that burned Lauda and the comeback 42 days later; the rare racing film that honors both men.' },
      { title: 'The Wrestler', year: 2008, tmdbId: 12163, posterPath: 'https://image.tmdb.org/t/p/w342/7QH5p5BF582k6qHufCKjftfkqWH.jpg', imdbRating: 7.9, director: 'Aronofsky', cast: 'Mickey Rourke, Marisa Tomei, Evan Rachel Wood', blurb: 'A broken-down 1980s wrestling star, living in a trailer and working deli counters, gets one more shot at the spotlight that ruined him; Mickey Rourke playing painfully close to home.' },
      { title: 'Moneyball', year: 2011, tmdbId: 60308, posterPath: 'https://image.tmdb.org/t/p/w342/4yIQq1e6iOcaZ5rLDG3lZBP3j7a.jpg', imdbRating: 7.6, director: 'Miller', cast: 'Brad Pitt, Jonah Hill, Philip Seymour Hoffman', blurb: "The cash-poor Oakland A's ditch scouts' instincts for an economist's spreadsheet and change baseball forever; a sports movie where the action is arguments in offices, and it works." },
      { title: 'Hoosiers', year: 1986, tmdbId: 5693, posterPath: 'https://image.tmdb.org/t/p/w342/dHpjZQXEdoi1xNLubM1rPmTHJYz.jpg', imdbRating: 7.4, director: 'Anspaugh', cast: 'Gene Hackman, Barbara Hershey, Dennis Hopper', blurb: 'A disgraced coach and the town drunk lead a tiny Indiana high school to the state basketball final; the small-town sports myth, played straight and earned.' },
      { title: 'I, Tonya', year: 2017, tmdbId: 389015, posterPath: 'https://image.tmdb.org/t/p/w342/6gNXwSHxaksR1PjVZRqNapmkgj3.jpg', imdbRating: 7.5, director: 'Gillespie', cast: 'Margot Robbie, Sebastian Stan, Allison Janney', blurb: "Figure skater Tonya Harding's life from abusive childhood to the Nancy Kerrigan attack, told through contradictory to-camera interviews that keep correcting each other." },
      { title: 'Borg vs. McEnroe', year: 2017, tmdbId: 397538, posterPath: 'https://image.tmdb.org/t/p/w342/vIQqjcrSnyCqLpqwScnvFY1bpkL.jpg', imdbRating: 6.9, director: 'Metz', cast: 'Sverrir Gudnason, Shia LaBeouf, Stellan Skarsgård', blurb: 'The ice-cold Swede chasing a fifth straight Wimbledon and the combustible New Yorker who cannot lose meet in the 1980 final; a portrait of two kinds of pressure.' },
      { title: 'Lagaan', year: 2001, tmdbId: 19666, posterPath: 'https://image.tmdb.org/t/p/w342/yNX9lFRAFeNLNRIXdqZK9gYrYKa.jpg', imdbRating: 8.1, director: 'Gowariker', cast: 'Aamir Khan, Gracy Singh, Rachel Shelley', blurb: "Drought-struck Indian villagers accept a British officer's wager: beat his men at cricket, a game they have never played, and pay no tax for three years; a four-hour musical epic that flies by." },
      { title: 'Million Dollar Baby', year: 2004, tmdbId: 70, posterPath: 'https://image.tmdb.org/t/p/w342/jcfEqKdWF1zeyvECPqp3mkWLct2.jpg', imdbRating: 8, director: 'Eastwood', cast: 'Clint Eastwood, Hilary Swank, Morgan Freeman', blurb: "A waitress in her thirties talks a crusty trainer into taking her on and rises fast through women's boxing, until the story becomes something else entirely; bring reserves." },
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
    heroPosition: 'center 40%',
    intro: [
      "Queer cinema spent half a century in code, Cocteau's poetry and Visconti's glances, then burst into the open and built a canon: Wong Kar-wai's Buenos Aires exiles, Sciamma's painters, Jenkins' Miami moonlight.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of June 5, 2026, opening Pride month, featuring Matthew Warchus's Pride, the true story of London activists funding striking Welsh miners. Documentary (Paris Is Burning), melodrama (Carol), comedy (The Birdcage) and Almodóvar all get seats.",
    ],
    items: [
      { title: 'Pride', year: 2014, tmdbId: 234200, posterPath: 'https://image.tmdb.org/t/p/w342/Kc3vbqO0X4VRnjACGNoWLNQvHo.jpg', imdbRating: 7.8, director: 'Warchus', cast: 'George MacKay, Ben Schnetzer, Freddie Fox', blurb: 'In 1984, London gay and lesbian activists raise money for striking Welsh miners, who are not sure they want it; a true story that builds to unions marching at Pride, and earns every tear.' },
      { title: 'Orpheus', year: 1950, tmdbId: 4558, posterPath: 'https://image.tmdb.org/t/p/w342/diu88F9PlUsrzHApC7VCV2QkNxR.jpg', imdbRating: 7.8, director: 'Cocteau', cast: 'Jean Marais, François Périer, María Casares', blurb: "The Orpheus myth in postwar Paris: a famous poet follows a princess who is Death through mirrors into the underworld; Cocteau's poetry with radio cars and rubber gloves." },
      { title: 'Portrait of a Lady on Fire', year: 2019, tmdbId: 531428, posterPath: 'https://image.tmdb.org/t/p/w342/2LquGwEhbg3soxSCs9VNyh5VJd9.jpg', imdbRating: 8, director: 'Sciamma', cast: 'Noémie Merlant, Adèle Haenel, Luàna Bajrami', blurb: 'On a Brittany island, a painter is hired to secretly portray a woman promised into marriage, and the watching becomes mutual; a love story built entirely on the exchanged gaze.' },
      { title: 'Brokeback Mountain', year: 2005, tmdbId: 142, posterPath: 'https://image.tmdb.org/t/p/w342/aByfQOQBNa4CMFwIgq3QrqY2ZHh.jpg', imdbRating: 7.7, director: 'Lee', cast: 'Heath Ledger, Jake Gyllenhaal, Michelle Williams', blurb: 'Two young ranch hands fall into a love neither can name during a summer herding sheep, then spend twenty years meeting in stolen weeks while their marriages pay the price.' },
      { title: 'Carol', year: 2015, tmdbId: 258480, posterPath: 'https://image.tmdb.org/t/p/w342/cJeled7EyPdur6TnCA5GYg0UVna.jpg', imdbRating: 7.3, director: 'Haynes', cast: 'Cate Blanchett, Rooney Mara, Kyle Chandler', blurb: "In 1952 New York, a young shop clerk and an elegant suburban wife begin a affair that the wife's divorce lawyers will use against her; longing conducted through glances and gloves." },
      { title: 'Moonlight', year: 2016, tmdbId: 376867, posterPath: 'https://image.tmdb.org/t/p/w342/qLnfEmPrDjJfPyyddLJPkXmshkp.jpg', imdbRating: 7.4, director: 'Jenkins', cast: 'Trevante Rhodes, André Holland, Janelle Monáe', blurb: 'A poor Black kid in Miami grows up in three chapters, child, teenager, hardened adult, shaped by a crack-addicted mother, an unlikely mentor and one boy on a beach; Best Picture winner.' },
      { title: 'Call Me by Your Name', year: 2017, tmdbId: 398818, posterPath: 'https://image.tmdb.org/t/p/w342/gXiE0WveDnT0n5J4sW9TMxXF4oT.jpg', imdbRating: 7.8, director: 'Guadagnino', cast: 'Timothée Chalamet, Armie Hammer, Michael Stuhlbarg', blurb: "In a sun-drunk Italian summer, a seventeen-year-old falls for the American graduate student staying at his family's villa; ends on one of the great father speeches and a long-held closeup." },
      { title: 'My Own Private Idaho', year: 1991, tmdbId: 468, posterPath: 'https://image.tmdb.org/t/p/w342/p9TF90Pb5yg2MNb2UztzyXktMm4.jpg', imdbRating: 7, director: 'Van Sant', cast: 'River Phoenix, Keanu Reeves, James Russo', blurb: "A narcoleptic street hustler searching for his mother drifts through Portland and Rome with the mayor's slumming son, in a road movie spliced with Shakespeare's Henry IV; River Phoenix's defining role." },
      { title: 'Milk', year: 2008, tmdbId: 10139, posterPath: 'https://image.tmdb.org/t/p/w342/ot4ImF4b7QbS6XsTdMH3pWxNmX2.jpg', imdbRating: 7.5, director: 'Van Sant', cast: 'Sean Penn, Emile Hirsch, Josh Brolin', blurb: 'Harvey Milk moves to San Francisco, builds a movement out of Castro Street, becomes the first openly gay elected official in California, and is assassinated by a fellow supervisor.' },
      { title: 'Paris Is Burning', year: 1990, tmdbId: 31225, posterPath: 'https://image.tmdb.org/t/p/w342/90rCWH41mj9hjHUEy2SOHfuAOl3.jpg', imdbRating: 8, director: 'Livingston', cast: 'Pepper LaBeija, Octavia St. Laurent, Venus Xtravaganza', blurb: "Harlem's Black and Latino ballroom scene of the late 1980s: the houses, the categories, the invented families, and the dreams of members the era would not let live long." },
      { title: 'Happy Together', year: 1997, tmdbId: 18329, posterPath: 'https://image.tmdb.org/t/p/w342/kO4KjUkQOfWSBw06Bdl7m6AlEP7.jpg', imdbRating: 7.7, director: 'Wong Kar-wai', cast: 'Leslie Cheung, Tony Leung Chiu-wai, Chang Chen', blurb: "Two men from Hong Kong strand themselves in Buenos Aires, breaking up and starting over in cycles neither can escape; Wong Kar-wai's most bruising film about being far from home." },
      { title: 'The Handmaiden', year: 2016, tmdbId: 290098, posterPath: 'https://image.tmdb.org/t/p/w342/dLlH4aNHdnmf62umnInL8xPlPzw.jpg', imdbRating: 8.1, director: 'Park Chan-wook', cast: 'Kim Min-hee, Kim Tae-ri, Ha Jung-woo', blurb: 'A pickpocket is planted as handmaiden to a Japanese heiress to help a conman steal her fortune, but the women have plans of their own; a triple-crossing gothic told three times over.' },
      { title: 'Maurice', year: 1987, tmdbId: 26371, posterPath: 'https://image.tmdb.org/t/p/w342/8HhCyxxzoUqEBmVGK25Jq69LhVo.jpg', imdbRating: 7.6, director: 'Ivory', cast: 'James Wilby, Hugh Grant, Rupert Graves', blurb: 'Two Cambridge men fall in love in Edwardian England, where it is a crime; one chooses respectability, the other risks everything; Forster kept the novel unpublished in his lifetime for its happy ending.' },
      { title: 'A Single Man', year: 2009, tmdbId: 34653, posterPath: 'https://image.tmdb.org/t/p/w342/oN20MLvoLv14whAss05V3ETBu0p.jpg', imdbRating: 7.5, director: 'Ford', cast: 'Colin Firth, Julianne Moore, Nicholas Hoult', blurb: "On the day he has decided will be his last, a grieving English professor in 1962 Los Angeles moves through his routine noticing everything; Colin Firth's finest hour." },
      { title: 'The Birdcage', year: 1996, tmdbId: 11000, posterPath: 'https://image.tmdb.org/t/p/w342/4IpC35BoA5aRO0Q1DpFGJ8iKKYq.jpg', imdbRating: 7.2, director: 'Nichols', cast: 'Robin Williams, Gene Hackman, Nathan Lane', blurb: "A gay Miami club owner and his drag-star partner play straight for one dinner because their son is marrying a senator's daughter; farce machinery in perfect working order." },
      { title: 'Fox and His Friends', year: 1975, tmdbId: 42254, posterPath: 'https://image.tmdb.org/t/p/w342/uYHNK7VycMOcD9Jv5qgjIdvDwgG.jpg', imdbRating: 7.6, director: 'Fassbinder', cast: 'Rainer Werner Fassbinder, Peter Chatel, Karlheinz Böhm', blurb: "A working-class carnival performer wins the lottery and is politely, systematically devoured by his elegant new boyfriend's circle; Fassbinder cast himself as the victim." },
      { title: 'Sebastiane', year: 1976, tmdbId: 42241, posterPath: 'https://image.tmdb.org/t/p/w342/xBek1olo2OUVmK3j0NMYRvKprpA.jpg', imdbRating: 6.2, director: 'Jarman', cast: 'Leonardo Treviglio, Barney James, Neil Kennedy', blurb: "Roman soldiers at a desert outpost turn on the devout Sebastian, whose martyrdom becomes indistinguishable from desire; dialogue entirely in Latin, Jarman's radical debut." },
      { title: 'Death in Venice', year: 1971, tmdbId: 6619, posterPath: 'https://image.tmdb.org/t/p/w342/s81SuFBSqY8T5Lrn5R8ucX8LKxi.jpg', imdbRating: 7.3, director: 'Visconti', cast: 'Dirk Bogarde, Björn Andrésen, Romolo Valli', blurb: "An ailing composer at a Lido hotel becomes fixated on a beautiful Polish boy as cholera spreads through Venice; Mahler on the soundtrack, dye running down a dying man's face." },
      { title: 'The Way He Looks', year: 2014, tmdbId: 237791, posterPath: 'https://image.tmdb.org/t/p/w342/2BhhlAYwKvONGW7tr16ZhnD0sym.jpg', imdbRating: 7.9, director: 'Ribeiro', cast: 'Ghilherme Lobo, Fábio Audi, Tess Amorim', blurb: 'A blind Brazilian teenager chafing against his overprotective mother falls for the new boy at school; a first-love story of unusual gentleness.' },
      { title: 'Tomboy', year: 2011, tmdbId: 65229, posterPath: 'https://image.tmdb.org/t/p/w342/plEV1Q5u5caYASlG3pq3ON7acN7.jpg', imdbRating: 7.4, director: 'Sciamma', cast: 'Zoé Héran, Malonn Lévana, Jeanne Disson', blurb: 'New to the neighborhood, a ten-year-old spends the summer as Mikael, until school looms and the adults intervene; small, precise and ahead of its moment.' },
      { title: 'All About My Mother', year: 1999, tmdbId: 99, posterPath: 'https://image.tmdb.org/t/p/w342/hjQhzhkGYXPNM96k0mOgob6HMmn.jpg', imdbRating: 7.6, director: 'Almodóvar', cast: 'Cecilia Roth, Marisa Paredes, Candela Peña', blurb: "After her son is killed, a Madrid nurse returns to Barcelona among actresses, trans sex workers and pregnant nuns to find his father; Almodóvar's Oscar-winning melodrama of chosen family." },
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
    heroPosition: 'center 30%',
    intro: [
      "A cut is a blink, and some directors refuse to blink. The long take is cinema's highest-wire act: Hitchcock hiding reel changes in Rope, Sokurov gliding through the Hermitage in one real ninety-six-minute shot, Cuarón's camera inside a refugee bus while the world ends outside it.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of May 29, 2026, featuring Children of Men. Some entries are single takes, real (Russian Ark, Victoria) or stitched (1917, Birdman); the rest deploy the unbroken shot as a signature scene, from the Copacabana entrance in Goodfellas to the corridor fight in Oldboy.",
    ],
    items: [
      { title: 'Children of Men', year: 2006, tmdbId: 9693, posterPath: 'https://image.tmdb.org/t/p/w342/k9IAS4TehZFcKi4HVByxZNPfqex.jpg', imdbRating: 7.9, director: 'Cuarón', cast: 'Clive Owen, Clare-Hope Ashitey, Chiwetel Ejiofor', blurb: 'In 2027, no child has been born for eighteen years; a burnt-out bureaucrat must smuggle a miraculously pregnant refugee to the coast. Its single-take car ambush and street battle rewrote action cinema.' },
      { title: 'Rope', year: 1948, tmdbId: 1580, posterPath: 'https://image.tmdb.org/t/p/w342/9ar6rxLDB8kagAnXZKn6h9smscr.jpg', imdbRating: 7.9, director: 'Hitchcock', cast: 'James Stewart, John Dall, Farley Granger', blurb: 'Two students murder a classmate to prove their superiority, hide the body in a chest, and host a dinner party on top of it; Hitchcock staged it as one continuous take with hidden cuts.' },
      { title: 'Russian Ark', year: 2002, tmdbId: 16646, posterPath: 'https://image.tmdb.org/t/p/w342/dkFM8Q7J0wNpEnbtD1AcWumkShj.jpg', imdbRating: 7.2, director: 'Sokurov', cast: 'Sergey Dreyden, Mariya Kuznetsova, Leonid Mozgovoy', blurb: 'An invisible narrator drifts through the Hermitage and three hundred years of Russian history, ending in a vast czarist ball; one real 96-minute Steadicam take, two thousand costumed extras, no cuts.' },
      { title: '1917', year: 2019, tmdbId: 530915, posterPath: 'https://image.tmdb.org/t/p/w342/iZf0KyrE25z1sage4SYFLCCrMi9.jpg', imdbRating: 8.2, director: 'Mendes', cast: 'George MacKay, Dean-Charles Chapman, Mark Strong', blurb: "Two British soldiers cross No Man's Land with an order that will stop 1,600 men walking into a trap; staged and stitched to play as a single unbroken shot." },
      { title: 'Birdman', year: 2014, tmdbId: 194662, posterPath: 'https://image.tmdb.org/t/p/w342/rHUg2AuIuLSIYMYFgavVwqt1jtc.jpg', imdbRating: 7.7, director: 'Iñárritu', cast: 'Michael Keaton, Emma Stone, Zach Galifianakis', blurb: 'A washed-up superhero actor stakes everything on a Broadway play while his ego literally talks back; edited to appear as one continuous backstage take. It won Best Picture.' },
      { title: 'Touch of Evil', year: 1958, tmdbId: 1480, posterPath: 'https://image.tmdb.org/t/p/w342/1pvRgmfBaoMczIJBOi9gCOZ4FMC.jpg', imdbRating: 8, director: 'Welles', cast: 'Charlton Heston, Janet Leigh, Orson Welles', blurb: 'A Mexican narcotics agent honeymooning on the border collides with a corrupt American cop over a car bombing; opens with the crane shot every film school studies.' },
      { title: 'Goodfellas', year: 1990, tmdbId: 769, posterPath: 'https://image.tmdb.org/t/p/w342/9OkCLM73MIU2CrKZbqiT8Ln1wY2.jpg', imdbRating: 8.7, director: 'Scorsese', cast: 'Robert De Niro, Ray Liotta, Joe Pesci', blurb: 'Thirty years inside the New York mob, narrated by the man who loved every minute until it ate him; the Copacabana entrance, one take through the kitchen, is the whole seduction in miniature.' },
      { title: 'The Player', year: 1992, tmdbId: 10403, posterPath: 'https://image.tmdb.org/t/p/w342/tZ3kDut2dhFVGkWNEn9xoCHCNAx.jpg', imdbRating: 7.5, director: 'Altman', cast: 'Tim Robbins, Greta Scacchi, Fred Ward', blurb: 'A studio executive being blackmailed by a rejected writer kills the wrong man and keeps rising; opens with an eight-minute take that name-checks famous long takes while performing one.' },
      { title: 'Boogie Nights', year: 1997, tmdbId: 4995, posterPath: 'https://image.tmdb.org/t/p/w342/2hVSN9yOfoI8EUTqcVW6zCIyQ1G.jpg', imdbRating: 7.9, director: 'P.T. Anderson', cast: 'Mark Wahlberg, Burt Reynolds, Julianne Moore', blurb: "A San Fernando Valley dishwasher becomes a porn star in the industry's 1970s golden age, then the eighties arrive; enters its world through one glorious poolside tracking shot." },
      { title: 'Magnolia', year: 1999, tmdbId: 334, posterPath: 'https://image.tmdb.org/t/p/w342/tpfC325Jk6S38VTe5dDWjWtoyxr.jpg', imdbRating: 8, director: 'P.T. Anderson', cast: 'Tom Cruise, Philip Baker Hall, Philip Seymour Hoffman', blurb: 'Nine lives across one San Fernando Valley day, dying fathers, quiz kids, a misogynist guru, spiral toward coincidence and a biblical downpour; three hours at full emotional volume.' },
      { title: 'Atonement', year: 2007, tmdbId: 4347, posterPath: 'https://image.tmdb.org/t/p/w342/hMRIyBjPzxaSXWM06se3OcNjIQa.jpg', imdbRating: 7.8, director: 'Joe Wright', cast: 'James McAvoy, Keira Knightley, Saoirse Ronan', blurb: "A child's lie about what she saw destroys two lovers on the eve of war; its five-minute Steadicam crawl along the Dunkirk beach is among the most famous single shots ever attempted." },
      { title: 'Police, Adjective', year: 2009, tmdbId: 32511, posterPath: 'https://image.tmdb.org/t/p/w342/yiimBQLll8l6SXyNjder7ToilDi.jpg', imdbRating: 7, director: 'Porumboiu', cast: 'Dragoș Bucur, Vlad Ivanov, Ion Stoica', blurb: 'A young Romanian cop tails a teenager sharing hash and stalls on conscience, until his chief opens a dictionary and defines his duty at him; deadpan, patient, quietly furious.' },
      { title: 'The Sacrifice', year: 1986, tmdbId: 24657, posterPath: 'https://image.tmdb.org/t/p/w342/8JMh27z075ZHbFE85XYkdXF2QkK.jpg', imdbRating: 7.9, director: 'Tarkovsky', cast: 'Erland Josephson, Susan Fleetwood, Allan Edwall', blurb: "As nuclear war breaks over the radio, a retired intellectual offers God everything he has, including his home and his silence, to undo it; Tarkovsky's final film, with a six-minute burning-house take." },
      { title: 'Oldboy', year: 2003, tmdbId: 670, posterPath: 'https://image.tmdb.org/t/p/w342/pWDtjs568ZfOTMbURQBYuT4Qxka.jpg', imdbRating: 8.3, director: 'Park Chan-wook', cast: 'Choi Min-sik, Yoo Ji-tae, Kang Hye-jung', blurb: 'Imprisoned in a private cell for fifteen years without explanation, then released, a man gets five days to find out why; the one-take corridor hammer fight is its signature, the ending its scar.' },
      { title: 'Elephant', year: 2003, tmdbId: 1807, posterPath: 'https://image.tmdb.org/t/p/w342/1a4VU9z2hxEvugHMK7VsobB9xTX.jpg', imdbRating: 7.1, director: 'Van Sant', cast: 'Alex Frost, Eric Deulen, John Robinson', blurb: "An ordinary high-school day tracked in long gliding hallway shots, the same minutes crossing from student to student, drifting toward a shooting; Van Sant's Palme d'Or winner after Columbine." },
      { title: 'Hard Boiled', year: 1992, tmdbId: 11782, posterPath: 'https://image.tmdb.org/t/p/w342/oMqr4CGGqVlfI8DdrSelK1e9aFM.jpg', imdbRating: 7.7, director: 'Woo', cast: 'Chow Yun-Fat, Tony Leung Chiu-wai, Anthony Wong', blurb: "A tea-house shootout introduces a cop who loses his partner and goes into a gun-runners' hospital fortress; contains a legendary minutes-long single-take battle across two floors." },
      { title: 'Werckmeister Harmonies', year: 2000, tmdbId: 23160, posterPath: 'https://image.tmdb.org/t/p/w342/ix3pquGqTkCW86UbVTdRcrhGEFm.jpg', imdbRating: 7.8, director: 'Tarr', cast: 'Lars Rudolph, Peter Fitz, Hanna Schygulla', blurb: 'A circus truck hauls a whale carcass into a frozen Hungarian town and unrest follows; thirty-nine long takes of eerie, gathering menace, with an asylum raid that empties the soul.' },
      { title: 'The Passenger', year: 1975, tmdbId: 9652, posterPath: 'https://image.tmdb.org/t/p/w342/A8jYH43plz70dNmHy82zAHGTqxN.jpg', imdbRating: 7.4, director: 'Antonioni', cast: 'Jack Nicholson, Maria Schneider, Jenny Runacre', blurb: "A worn-out reporter in the Sahara swaps identities with a dead arms dealer and inherits the man's appointments; ends on a seven-minute shot through a window grate that critics still argue about." },
      { title: 'Weekend', year: 1967, tmdbId: 8075, posterPath: 'https://image.tmdb.org/t/p/w342/e9p8VdsAKXz1GoVXD36Lg5e3YKo.jpg', imdbRating: 6.9, director: 'Godard', cast: 'Mireille Darc, Jean Yanne, Jean-Pierre Kalfon', blurb: 'A scheming bourgeois couple drive into a countryside collapsing into apocalypse and cannibal revolutionaries; built around an eight-minute tracking shot along one endless traffic jam.' },
      { title: 'Le Trou', year: 1960, tmdbId: 29259, posterPath: 'https://image.tmdb.org/t/p/w342/xyZhiOz5NHVBUKlpioxjwajy7pm.jpg', imdbRating: 8.5, director: 'Becker', cast: 'Michel Constantin, Jean Keraudy, Philippe Leroy', blurb: 'Four Paris cellmates cut, dig and crawl toward escape with a new arrival they are not sure they can trust; the digging happens in unbroken real-time takes that make you hold your breath.' },
      { title: 'Victoria', year: 2015, tmdbId: 320007, posterPath: 'https://image.tmdb.org/t/p/w342/9P8QgfoMcFX7vp2Gj2cYFecHVRZ.jpg', imdbRating: 7.6, director: 'Schipper', cast: 'Laia Costa, Frederick Lau, Franz Rogowski', blurb: 'A Spanish woman in Berlin falls in with four charming strangers whose favor for a gangster becomes a bank robbery; one real 138-minute take across twenty-two locations, no hidden cuts.' },
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
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/7DlEixaKiNJyK0tHri0AEUAQrk8.jpg',
    heroPosition: 'center 30%',
    intro: [
      'From Ousmane Sembène\'s pioneering Senegalese realism to Mati Diop\'s ghosts drifting back across the Atlantic, African cinema built one of the richest bodies of work in film history while most festivals looked elsewhere. They are catching up.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of May 22, 2026, featuring Atlantics. It spans the continent: Senegal, Mali, Chad, Egypt, Ethiopia, Morocco, South Africa, Burkina Faso, Tunisia, and Algeria through The Battle of Algiers.',
    ],
    items: [
      { title: 'Atlantics', year: 2019, tmdbId: 496967, posterPath: 'https://image.tmdb.org/t/p/w342/zRnZM6HqglFK31MYyrTSQVlj1dQ.jpg', imdbRating: 6.7, director: 'Mati Diop', cast: 'Mame Bineta Sane, Amadou Mbow, Ibrahima Traore', blurb: 'In Dakar, construction workers unpaid for months set out to sea for Spain; the women they left behind begin speaking with voices that are not theirs. A ghost story and a love story at once.' },
      { title: 'Black Girl', year: 1966, tmdbId: 95597, posterPath: 'https://image.tmdb.org/t/p/w342/hYYAk9I9KkscSr8DC30KyDjzsVu.jpg', imdbRating: 7.4, director: 'Sembène', cast: 'Mbissine Thérèse Diop, Anne-Marie Jelinek, Robert Fontaine', blurb: 'A young Senegalese woman hired by a French couple as a nanny finds herself their maid and their trophy on the Riviera; the film that announced African cinema to the world.' },
      { title: 'Xala', year: 1975, tmdbId: 76636, posterPath: 'https://image.tmdb.org/t/p/w342/4bx6Wceii1OZf0e3qp4EurUFoK7.jpg', imdbRating: 6.7, director: 'Sembène', cast: 'Thierno Leye, Myriam Niang, Seune Samb', blurb: "A Dakar businessman celebrating his third marriage is struck impotent by a curse; Sembène's satire of a postcolonial elite that has changed the flags but kept the masters' manners." },
      { title: 'Touki Bouki', year: 1973, tmdbId: 77771, posterPath: 'https://image.tmdb.org/t/p/w342/kcBYKHyg9GcQqa6DWq0AuQDhtPI.jpg', imdbRating: 7, director: 'Mambéty', cast: 'Magaye Niang, Myriam Niang, Christoph Colomb', blurb: 'A cowherd with a longhorn-mounted motorcycle and a student girlfriend scheme and dream their way toward a boat to Paris; the avant-garde road movie of African cinema.' },
      { title: 'Hyenas', year: 1992, tmdbId: 124085, posterPath: 'https://image.tmdb.org/t/p/w342/or2P5W4SHTOYS40F2LifY8wm1e4.jpg', imdbRating: 7.4, director: 'Mambéty', cast: 'Djibril Diop Mambéty, Mansour Diouf, Ami Diakhate', blurb: 'A fabulously rich woman returns to the poor town that once cast her out pregnant, offering fortunes for the death of the man who betrayed her; a parable of what money does to community.' },
      { title: 'Yeelen', year: 1987, tmdbId: 71329, posterPath: 'https://image.tmdb.org/t/p/w342/xjckmcnKK6Ex6wHrVydu4F21h3t.jpg', imdbRating: 6.9, director: 'Cissé', cast: 'Issiaka Kane, Balla Moussa Keita, Aoua Sangare', blurb: 'A young man carrying dangerous knowledge flees across ancient Mali pursued by his own sorcerer father; Bambara cosmology told with the weight of myth.' },
      { title: 'Timbuktu', year: 2014, tmdbId: 265228, posterPath: 'https://image.tmdb.org/t/p/w342/tCpHpn8msgonS9HVDMkrcSZh4an.jpg', imdbRating: 7.1, director: 'Sissako', cast: 'Ibrahim Ahmed, Toulou Kiki, Layla Walet Mohamed', blurb: "Under jihadist occupation, Timbuktu's residents negotiate absurd bans on music and football until a cattle herder's accident collides with the new law; grief delivered with unexpected grace." },
      { title: 'Bamako', year: 2006, tmdbId: 62652, posterPath: 'https://image.tmdb.org/t/p/w342/5QC4URE5MKnzBwk8vNNtvMoLIxl.jpg', imdbRating: 6.7, director: 'Sissako', cast: 'Aïssa Maïga, Tiécoura Traoré, Maimouna Hélène Diarra', blurb: 'In a Bamako courtyard, a full trial is staged with real lawyers: African civil society versus the World Bank and IMF, while ordinary life flows around the hearing.' },
      { title: 'Tilai', year: 1990, tmdbId: 65482, posterPath: 'https://image.tmdb.org/t/p/w342/zj2UAI0eWxhtqX7K4HatWZmM3tH.jpg', imdbRating: 6.9, director: 'Ouedraogo', cast: 'Rasmané Ouédraogo, Ina Cissé, Roukietou Barry', blurb: "Returning from a long absence, a man finds his father has married the woman promised to him; their forbidden love breaks the village's moral law and the family with it." },
      { title: 'A Screaming Man', year: 2010, tmdbId: 57602, posterPath: 'https://image.tmdb.org/t/p/w342/q90ysGM6CQmHnUTGGU4x5TBv4hn.jpg', imdbRating: 6.7, director: 'Haroun', cast: "Youssouf Djaoro, Diouc Koma, Emile Abossolo M'bo", blurb: 'A hotel pool attendant in Chad, demoted in favor of his son, makes a quiet, terrible choice as civil war closes in; a father-son tragedy in a country running out of room.' },
      { title: 'Lingui', year: 2021, tmdbId: 820693, posterPath: 'https://image.tmdb.org/t/p/w342/5Cg39mHfs9u8UiqZJZy5uYANWgG.jpg', imdbRating: 6.8, director: 'Haroun', cast: 'Achouackh Abakar Souleymane, Rihane Khalil Alio, Youssouf Djaoro', blurb: 'In Chad, where abortion is a crime and a sin, a single mother discovers her fifteen-year-old is pregnant and refuses to accept the ruin prescribed for her; a story of female solidarity.' },
      { title: 'Chronicle of the Years of Fire', year: 1975, tmdbId: 52555, posterPath: 'https://image.tmdb.org/t/p/w342/wtx3qqdwwp3sNANYfAFXl5tKZE6.jpg', imdbRating: 7.4, director: 'Lakhdar-Hamina', cast: 'Yorgo Voyagis, Leila Shenna, Mohammed Lakhdar-Hamina', blurb: "Algeria's long road to revolution followed through one peasant's life, from famine and dispossession to armed uprising; the only African film ever to win the Palme d'Or." },
      { title: 'Tsotsi', year: 2005, tmdbId: 868, posterPath: 'https://image.tmdb.org/t/p/w342/r3ebTJFcDZ35GaKcuUQQe243z4f.jpg', imdbRating: 7.2, director: 'Hood', cast: 'Presley Chweneyagae, Jerry Mofokeng, Terry Pheto', blurb: 'A Johannesburg gang leader carjacks a woman and discovers a baby on the back seat; keeping it cracks him open; an Oscar winner for best foreign film.' },
      { title: 'Cairo Station', year: 1958, tmdbId: 47324, posterPath: 'https://image.tmdb.org/t/p/w342/zm8ET6PSfPT6pozgvjR7htaZFjy.jpg', imdbRating: 7.5, director: 'Chahine', cast: 'Farid Shawqy, Hind Rostom, Youssef Chahine', blurb: "A lame newspaper seller at Cairo's central station nurses an obsession with a beautiful lemonade vendor that tips into violence; Chahine cast himself in Egyptian cinema's boldest film." },
      { title: 'Buud Yam', year: 1997, tmdbId: 178606, posterPath: 'https://image.tmdb.org/t/p/w342/tkPj1bdp2FTVhPrJylCE47nmZhg.jpg', imdbRating: 6.8, director: 'Kaboré', cast: 'Serge Yanogo, Amssatou Maïga, Colette Kaboré', blurb: "In precolonial Burkina Faso, a young man distrusted by his village must journey through strange lands to find a healer for his dying sister; a quest tale and the country's best-loved classic." },
      { title: 'Ali Zaoua', year: 2000, tmdbId: 49167, posterPath: 'https://image.tmdb.org/t/p/w342/5Uf2zhivRpxTNI9c1MjGwjT3Szx.jpg', imdbRating: 7.3, director: 'Ayouch', cast: 'Mounïm Kbab, Abdelhak Zhayra, Hicham Moussoune', blurb: "When gang violence kills the smallest of them, three Casablanca street kids resolve to bury their friend like a prince; brutal reality shot through with children's mythology." },
      { title: 'Faya Dayi', year: 2021, tmdbId: 776551, posterPath: 'https://image.tmdb.org/t/p/w342/4rtrsTBlxaX92soR1nUMjAXUcpP.jpg', imdbRating: 6.8, director: 'Beshir', cast: 'Mohammed Arif, Hashim Abdi, Biniam Yonas', blurb: 'In the Ethiopian highlands, where the khat trade has swallowed the economy and the young chew to escape, a documentary drifts between harvests and dreams in hypnotic black and white.' },
      { title: 'Difret', year: 2014, tmdbId: 245855, posterPath: 'https://image.tmdb.org/t/p/w342/vcjdECnf9UFlSTynnll3Kyx5kKE.jpg', imdbRating: 6.9, director: 'Mehari', cast: 'Meron Getnet, Tizita Hagere, Haregewine Assefa', blurb: 'A young Ethiopian lawyer defends a fourteen-year-old who shot the man who abducted her for marriage, a custom the court is being asked to end; from a landmark real case.' },
      { title: 'Lamb', year: 2015, tmdbId: 324284, posterPath: 'https://image.tmdb.org/t/p/w342/aj0pgKR4dWlRRb1Q05JGQtwxHbj.jpg', imdbRating: 6.3, director: 'Zeleke', cast: 'Rediat Amare, Kidist Siyum, Wolela Assefa', blurb: "Sent to relatives after his mother's death, an Ethiopian boy refuses to let his beloved sheep be slaughtered for the feast; the first Ethiopian film ever selected at Cannes." },
      { title: 'The Man Who Sold His Skin', year: 2020, tmdbId: 669363, posterPath: 'https://image.tmdb.org/t/p/w342/oQyivgBwqfIp9Bu7LAssj3HQpOz.jpg', imdbRating: 6.6, director: 'Ben Hania', cast: 'Yahya Mahayni, Dea Liane, Koen De Bouw', blurb: 'A Syrian refugee lets a famous artist tattoo a Schengen visa across his back, becoming a living artwork that can travel where he cannot; a sharp fable about borders and the art market.' },
      { title: 'The Battle of Algiers', year: 1966, tmdbId: 17295, posterPath: 'https://image.tmdb.org/t/p/w342/2p3AFtOHFvP6OeVMqlnL1zLKOqL.jpg', imdbRating: 8.1, director: 'Pontecorvo', cast: 'Brahim Hadjadj, Mohamed Ben Kassen, Yacef Saâdi', blurb: "The FLN's urban insurgency and the French paratroopers sent to crush it, restaged in the real Casbah with non-professionals so convincingly it opens with a disclaimer; still screened as a manual." },
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
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/ooSOcWlwqRc9vGMAkI312Erf5uB.jpg',
    heroPosition: 'center 30%',
    intro: [
      'Somewhere between 1999 and 2009, Hollywood remembered how to write a meet-cute: Hugh Grant stammered, Sandra Bullock fell over furniture, Renée Zellweger kept a diary. The era\'s romcoms were formula, but formula executed by stars and scripts that knew exactly what they were doing.',
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of May 15, 2026, featuring Bridget Jones's Diary. Amélie and My Sassy Girl keep it from being a purely Hollywood list.",
    ],
    items: [
      { title: "Bridget Jones's Diary", year: 2001, tmdbId: 634, posterPath: 'https://image.tmdb.org/t/p/w342/olMTi7uCaec9Yr3Ar07D2SIja1G.jpg', imdbRating: 6.8, director: 'Maguire', cast: 'Renée Zellweger, Colin Firth, Hugh Grant', blurb: 'A London thirtysomething resolves to fix her life via diary and lands between a caddish boss and a standoffish barrister; Renée Zellweger made the mess immortal.' },
      { title: 'Notting Hill', year: 1999, tmdbId: 509, posterPath: 'https://image.tmdb.org/t/p/w342/hHRIf2XHeQMbyRb3HUx19SF5Ujw.jpg', imdbRating: 7.2, director: 'Michell', cast: 'Julia Roberts, Hugh Grant, Gina McKee', blurb: "A divorced London bookseller spills orange juice on the world's most famous actress and somehow keeps seeing her; charm calibrated to the decimal, with the flatmate of the era." },
      { title: 'Love Actually', year: 2003, tmdbId: 508, posterPath: 'https://image.tmdb.org/t/p/w342/7QPeVsr9rcFU9Gl90yg0gTOTpVv.jpg', imdbRating: 7.5, director: 'Curtis', cast: 'Hugh Grant, Alan Rickman, Emma Thompson', blurb: 'Nine intertwined London love stories in the five weeks before Christmas, from Downing Street to a school pageant; the ensemble Christmas romcom every December argument is about.' },
      { title: 'Amélie', year: 2001, tmdbId: 194, posterPath: 'https://image.tmdb.org/t/p/w342/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg', imdbRating: 8.3, director: 'Jeunet', cast: 'Audrey Tautou, Mathieu Kassovitz, Rufus', blurb: 'A shy Montmartre waitress secretly engineers happiness for everyone around her while dodging her own; whimsical, green-tinted, and the reason a generation moved to Paris.' },
      { title: 'Legally Blonde', year: 2001, tmdbId: 8835, posterPath: 'https://image.tmdb.org/t/p/w342/9ohlMrJHQqKhfUKh7Zr3JQqHNLZ.jpg', imdbRating: 6.5, director: 'Luketic', cast: 'Reese Witherspoon, Luke Wilson, Selma Blair', blurb: 'Dumped for not being serious, a sorority president follows her ex to Harvard Law out of spite and stays on merit; the rare comedy whose message landed as hard as its jokes.' },
      { title: 'The Holiday', year: 2006, tmdbId: 1581, posterPath: 'https://image.tmdb.org/t/p/w342/h1ITOpvJN3Tw4Sy60w2QTfYMvdd.jpg', imdbRating: 7, director: 'Meyers', cast: 'Cameron Diaz, Kate Winslet, Jude Law', blurb: "A London journalist and an L.A. trailer-maker, both freshly heartbroken, swap houses for Christmas and find replacements on each other's continents; peak comfort cinema." },
      { title: "Something's Gotta Give", year: 2003, tmdbId: 6964, posterPath: 'https://image.tmdb.org/t/p/w342/1cpdqe0SpiHzzbOLq9GDUUlZdSl.jpg', imdbRating: 6.8, director: 'Meyers', cast: 'Jack Nicholson, Diane Keaton, Keanu Reeves', blurb: "A sixty-something playboy has a heart attack at his young girlfriend's beach house and falls, against every instinct, for her playwright mother; Keaton and Nicholson sparring as adults." },
      { title: 'The Devil Wears Prada', year: 2006, tmdbId: 350, posterPath: 'https://image.tmdb.org/t/p/w342/8912AsVuS7Sj915apArUFbv6F9L.jpg', imdbRating: 7, director: 'Frankel', cast: 'Meryl Streep, Anne Hathaway, Emily Blunt', blurb: "An aspiring journalist takes a job as assistant to fashion's most terrifying editor and starts becoming someone her friends do not recognize; Streep rules it in a whisper." },
      { title: 'Miss Congeniality', year: 2000, tmdbId: 1493, posterPath: 'https://image.tmdb.org/t/p/w342/pat3vKaRlB70he4ghwTMydR4TvP.jpg', imdbRating: 6.4, director: 'Petrie', cast: 'Sandra Bullock, Benjamin Bratt, Heather Burns', blurb: 'A graceless FBI agent goes undercover as a beauty-pageant contestant to stop a bomber; Sandra Bullock falling over in an evening gown, elevated to art.' },
      { title: 'How to Lose a Guy in 10 Days', year: 2003, tmdbId: 9919, posterPath: 'https://image.tmdb.org/t/p/w342/2dlftyPz7mTYbrsPvTogyFmYd7d.jpg', imdbRating: 6.5, director: 'Petrie', cast: 'Kate Hudson, Matthew McConaughey, Adam Goldberg', blurb: 'She is writing a column about driving a man away in ten days; he has bet he can make any woman fall for him in the same window; the formula at its most gleaming.' },
      { title: 'Two Weeks Notice', year: 2002, tmdbId: 2642, posterPath: 'https://image.tmdb.org/t/p/w342/r18hSGAcxWiUysbX6nFShIZyjjP.jpg', imdbRating: 6.2, director: 'Lawrence', cast: 'Sandra Bullock, Hugh Grant, Dana Ivey', blurb: 'A crusading lawyer quits working for her impossible billionaire boss, who then cannot function through her notice period; Bullock and Grant doing screwball at half speed.' },
      { title: 'Music and Lyrics', year: 2007, tmdbId: 11172, posterPath: 'https://image.tmdb.org/t/p/w342/1WXVpnovC0EETbqcjVhy3hwIITK.jpg', imdbRating: 6.5, director: 'Lawrence', cast: 'Drew Barrymore, Hugh Grant, Brad Garrett', blurb: 'A washed-up eighties pop idol has three days to write a hit for a teen superstar, and his plant lady turns out to be the lyricist; opens with a flawless fake 80s video.' },
      { title: 'Hitch', year: 2005, tmdbId: 8488, posterPath: 'https://image.tmdb.org/t/p/w342/x3W9H3nhGQbWSlyI8Amp2F6Z6cz.jpg', imdbRating: 6.6, director: 'Tennant', cast: 'Will Smith, Eva Mendes, Kevin James', blurb: "A professional date doctor who makes awkward men presentable falls for a gossip columnist and finds none of his own techniques work; Will Smith's smoothest star turn." },
      { title: 'Sweet Home Alabama', year: 2002, tmdbId: 11529, posterPath: 'https://image.tmdb.org/t/p/w342/698cbxq0SRwCdOPG5Bwi7JDk12d.jpg', imdbRating: 6.2, director: 'Tennant', cast: 'Reese Witherspoon, Josh Lucas, Patrick Dempsey', blurb: "A rising New York designer engaged to the mayor's son must first fly home to Alabama and divorce the husband she never mentioned; the culture-clash romcom done sweetest." },
      { title: '13 Going on 30', year: 2004, tmdbId: 10096, posterPath: 'https://image.tmdb.org/t/p/w342/iNZdSIfhSCMtRILDNyhLn8UKeSG.jpg', imdbRating: 6.3, director: 'Waters', cast: 'Jennifer Garner, Mark Ruffalo, Judy Greer', blurb: 'A thirteen-year-old wishes herself grown and wakes at thirty with the career, the closet and none of the memories, discovering who she became; Jennifer Garner sells every beat.' },
      { title: 'About a Boy', year: 2002, tmdbId: 245, posterPath: 'https://image.tmdb.org/t/p/w342/qoZ1bD0q9EFqcNiEYbEigsRcNCt.jpg', imdbRating: 7.1, director: 'Weitz', cast: 'Hugh Grant, Nicholas Hoult, Toni Collette', blurb: 'A rich London idler invents a son to date single mothers and instead acquires an odd, bullied twelve-year-old who keeps showing up; the Hugh Grant performance with an actual arc.' },
      { title: 'My Sassy Girl', year: 2001, tmdbId: 11178, posterPath: 'https://image.tmdb.org/t/p/w342/i964xFDEMwZ5uaweParv8ItBfbJ.jpg', imdbRating: 7.9, director: 'Kwak', cast: 'Gianna Jun, Cha Tae-hyun, Kim In-mun', blurb: 'A hapless engineering student rescues a drunk girl on the subway and is conscripted into her chaotic, bossy, secretly grieving orbit; the Korean romcom that conquered Asia.' },
      { title: 'The Wedding Planner', year: 2001, tmdbId: 2018, posterPath: 'https://image.tmdb.org/t/p/w342/meq4bLUPcBlOG3Z5YdiWuBMlpO.jpg', imdbRating: 5.4, director: 'Shankman', cast: 'Jennifer Lopez, Matthew McConaughey, Justin Chambers', blurb: "San Francisco's most controlled wedding planner is rescued from a runaway dumpster by a charming doctor, who turns out to be her biggest client's groom." },
      { title: 'Definitely, Maybe', year: 2008, tmdbId: 8390, posterPath: 'https://image.tmdb.org/t/p/w342/7eS5RurcMyi8eVUDenaCjPGAzJ2.jpg', imdbRating: 7.1, director: 'Brooks', cast: 'Ryan Reynolds, Abigail Breslin, Elizabeth Banks', blurb: 'Amid his divorce, a father tells his daughter the story of his three great loves with the names changed, and she has to guess which one is her mother; sturdier than its premise sounds.' },
      { title: 'The Proposal', year: 2009, tmdbId: 18240, posterPath: 'https://image.tmdb.org/t/p/w342/6stnAm1wSek8ZrislwK4xGTyCnt.jpg', imdbRating: 6.8, director: 'Fletcher', cast: 'Sandra Bullock, Ryan Reynolds, Malin Akerman', blurb: 'A feared Canadian editor facing deportation announces a sudden engagement to her put-upon assistant, and his Alaska family hosts the charade; Bullock and Reynolds, peak bicker.' },
      { title: 'Bridget Jones: The Edge of Reason', year: 2004, tmdbId: 9801, posterPath: 'https://image.tmdb.org/t/p/w342/zDthRXkGnwFIWI0zWcJyS7h6lUl.jpg', imdbRating: 6.2, director: 'Kidron', cast: 'Renée Zellweger, Colin Firth, Hugh Grant', blurb: 'Bridget, finally coupled, invents new catastrophes: jealousy over a leggy colleague, a ski disaster and a Thai prison stint; more of the diary, played broader.' },
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
    heroPosition: 'center 35%',
    intro: [
      'When the source is the canon itself, Austen, the Brontës, Dickens, Dumas, Shelley, the question stops being whether the film is faithful and becomes whose reading burns brightest on screen. This collection gathers 21 answers, from David Lean\'s Dickens to Kubrick\'s Thackeray.',
      "It ran as the weekly theme in the I Like Movies Discover tab for the week of May 8, 2026, featuring Joe Wright's Pride & Prejudice. The list deliberately mixes eras: a 1939 Wuthering Heights sits next to del Toro's 2025 Frankenstein.",
    ],
    items: [
      { title: 'Pride & Prejudice', year: 2005, tmdbId: 4348, posterPath: 'https://image.tmdb.org/t/p/w342/o8UhmEbWPHmTUxP0lMuCoqNkbB3.jpg', imdbRating: 8.1, director: 'Joe Wright', cast: 'Keira Knightley, Matthew Macfadyen, Brenda Blethyn', blurb: "Elizabeth Bennet and Mr. Darcy misjudge each other across muddy fields and candlelit halls; Joe Wright's dawn-lit, hand-flexing version made Austen swoon-worthy for a new generation." },
      { title: 'Sense and Sensibility', year: 1995, tmdbId: 4584, posterPath: 'https://image.tmdb.org/t/p/w342/9YdQ73YmvInxpXZVNjEKePw9tRO.jpg', imdbRating: 7.7, director: 'Lee', cast: 'Emma Thompson, Kate Winslet, Alan Rickman', blurb: 'Two sisters, one all prudence and one all passion, navigate reduced circumstances and unreliable suitors; Emma Thompson won an Oscar for the script and should have for the performance.' },
      { title: 'Anna Karenina', year: 2012, tmdbId: 96724, posterPath: 'https://image.tmdb.org/t/p/w342/b9mvt1kKqDuveD1AJuGSkBEuagU.jpg', imdbRating: 6.6, director: 'Joe Wright', cast: 'Keira Knightley, Jude Law, Aaron Taylor-Johnson', blurb: "Tolstoy's doomed affair staged almost entirely inside a decaying theatre, society as literal performance; a divisive, gorgeous gamble with Knightley at its center." },
      { title: 'Wuthering Heights', year: 1939, tmdbId: 3084, posterPath: 'https://image.tmdb.org/t/p/w342/pwHdSzXwlUFAcYGcFutKcPcX2OW.jpg', imdbRating: 7.5, director: 'Wyler', cast: 'Merle Oberon, Laurence Olivier, David Niven', blurb: "Heathcliff and Cathy's destructive bond on the Yorkshire moors, in the Hollywood-gothic version with Laurence Olivier; it trims the novel's second half and burnishes the doom." },
      { title: 'Jane Eyre', year: 2011, tmdbId: 38684, posterPath: 'https://image.tmdb.org/t/p/w342/3Cn7D0wEaxnvm8kTta1osNu3QJv.jpg', imdbRating: 7.3, director: 'Fukunaga', cast: 'Mia Wasikowska, Michael Fassbender, Jamie Bell', blurb: "A governess with an iron sense of self falls for her brooding employer, whose house holds a secret; Fukunaga's version restores the gothic chill with Wasikowska and Fassbender." },
      { title: 'Great Expectations', year: 1946, tmdbId: 14320, posterPath: 'https://image.tmdb.org/t/p/w342/ynaFuVvW2jaG06pMV67dOhzMYfJ.jpg', imdbRating: 7.8, director: 'Lean', cast: 'John Mills, Valerie Hobson, Tony Wager', blurb: "An orphan raised by a blacksmith is made a gentleman by a mystery benefactor, and misreads everything; David Lean's version, from the marsh opening onward, remains the definitive Dickens on film." },
      { title: 'Oliver Twist', year: 1948, tmdbId: 10949, posterPath: 'https://image.tmdb.org/t/p/w342/wkMdDqXI58MuW99wi9kotC8kCVM.jpg', imdbRating: 7.8, director: 'Lean', cast: 'John Howard Davies, Robert Newton, Alec Guinness', blurb: "The workhouse orphan who asked for more falls in with Fagin's pickpockets in Lean's shadow-drenched London; controversial then for Guinness's Fagin, unmatched since for atmosphere." },
      { title: 'The Three Musketeers', year: 1973, tmdbId: 2926, posterPath: 'https://image.tmdb.org/t/p/w342/6qjW1e31k2XhcWpzGz6lgHcRt5W.jpg', imdbRating: 7.1, director: 'Lester', cast: 'Michael York, Oliver Reed, Richard Chamberlain', blurb: "D'Artagnan joins the king's musketeers amid diamond intrigues; Lester's version plays the swashbuckling as rowdy slapstick with real swords, and the cast is absurdly deep." },
      { title: 'The Count of Monte Cristo', year: 2002, tmdbId: 11362, posterPath: 'https://image.tmdb.org/t/p/w342/ifMgDAUXVQLY4DeOu3VTTi55jSP.jpg', imdbRating: 7.7, director: 'Reynolds', cast: 'Jim Caviezel, Guy Pearce, Richard Harris', blurb: 'Betrayed into an island prison, Edmond Dantès escapes, finds a fortune and re-enters society as an instrument of patient revenge; the sturdy modern version of the ultimate payback novel.' },
      { title: 'Frankenstein', year: 2025, tmdbId: 1062722, posterPath: 'https://image.tmdb.org/t/p/w342/g4JtvGlQO7DByTI6frUobqvSL3R.jpg', imdbRating: 7.4, director: 'del Toro', cast: 'Oscar Isaac, Jacob Elordi, Christoph Waltz', blurb: "Del Toro's lifelong dream project: Victor Frankenstein and his creature locked in a gothic tragedy of fathers and abandonment, mourning where others put lightning bolts." },
      { title: 'Lady Macbeth', year: 2016, tmdbId: 410117, posterPath: 'https://image.tmdb.org/t/p/w342/xWTJbhTwSTJmhLlX5xAOxPhdnXc.jpg', imdbRating: 6.8, director: 'Oldroyd', cast: 'Florence Pugh, Cosmo Jarvis, Paul Hilton', blurb: "Sold into marriage to a cold Northern industrialist, a young woman takes a lover and then removes, one by one, everything in her way; Leskov's novella stripped to the bone, with Florence Pugh's breakout." },
      { title: 'The Trial', year: 1962, tmdbId: 3009, posterPath: 'https://image.tmdb.org/t/p/w342/4qDUe5HqB8pXNplSBlsoyVjNP3r.jpg', imdbRating: 7.6, director: 'Welles', cast: 'Anthony Perkins, Romy Schneider, Orson Welles', blurb: "Josef K. wakes under arrest for a crime no one will name, and the process swallows him; Welles built Kafka's nightmare in a derelict Paris railway station and called it his best film." },
      { title: 'A Room with a View', year: 1985, tmdbId: 11257, posterPath: 'https://image.tmdb.org/t/p/w342/5xRAqywVo6tNUNQbAESGVP930la.jpg', imdbRating: 7.2, director: 'Ivory', cast: 'Helena Bonham Carter, Julian Sands, Maggie Smith', blurb: "A proper English girl kissed in a Florentine barley field must choose between passion and a fiancé made entirely of opinions; Merchant Ivory's sunniest film." },
      { title: 'Howards End', year: 1992, tmdbId: 8293, posterPath: 'https://image.tmdb.org/t/p/w342/1009nhfj28VhhQnVadtjkOacduX.jpg', imdbRating: 7.4, director: 'Ivory', cast: 'Emma Thompson, Helena Bonham Carter, Anthony Hopkins', blurb: "The idealist Schlegel sisters entangle with the wealthy, careless Wilcoxes over a house that stands for England itself; Forster's social web given full Merchant Ivory weight." },
      { title: 'The Age of Innocence', year: 1993, tmdbId: 10436, posterPath: 'https://image.tmdb.org/t/p/w342/5Tuyt26v7qNR8Cl3m7ZRx36rduf.jpg', imdbRating: 7.2, director: 'Scorsese', cast: 'Daniel Day-Lewis, Michelle Pfeiffer, Winona Ryder', blurb: 'A New York lawyer engaged to a perfect bride falls for her scandalous cousin, and Gilded Age society closes around them without one raised voice; Scorsese called it his most violent film.' },
      { title: 'Tess', year: 1979, tmdbId: 11121, posterPath: 'https://image.tmdb.org/t/p/w342/xejUFnoAVxzvU95o2jlzG2USmY.jpg', imdbRating: 7.3, director: 'Polanski', cast: 'Nastassja Kinski, Peter Firth, Leigh Lawson', blurb: "A poor girl sent to claim kinship with a rich family is ruined by one man and failed by the better one she loves; Hardy's tragedy filmed by Polanski with terrible patience." },
      { title: 'White Nights', year: 1957, tmdbId: 43231, posterPath: 'https://image.tmdb.org/t/p/w342/sAFR7LbXnPSjZGpG1ihSAN7vrfR.jpg', imdbRating: 7.5, director: 'Visconti', cast: 'Maria Schell, Marcello Mastroianni, Jean Marais', blurb: "A lonely clerk meets a woman on a canal bridge who is waiting for a lover who promised to return; Visconti stages Dostoevsky's four nights on dreamlike studio sets swirling with fog." },
      { title: 'Madame Bovary', year: 1991, tmdbId: 2528, posterPath: 'https://image.tmdb.org/t/p/w342/cBJtWAgDTCqxNJJOZjnRSh5Vxa5.jpg', imdbRating: 6.6, director: 'Chabrol', cast: 'Isabelle Huppert, Jean-François Balmer, Christophe Malavoy', blurb: "A doctor's wife in provincial Normandy chases the passion novels promised her through affairs and debt; Chabrol observes Flaubert's heroine with cool exactness, Huppert in the lead." },
      { title: 'The Hunchback of Notre Dame', year: 1956, tmdbId: 11594, posterPath: 'https://image.tmdb.org/t/p/w342/ds4pCq0GOEarBHI35bYSN2PC0KQ.jpg', imdbRating: 6.6, director: 'Delannoy', cast: 'Gina Lollobrigida, Anthony Quinn, Alain Cuny', blurb: 'The deaf bell-ringer of Notre Dame, the street dancer Esmeralda, and the archdeacon whose desire destroys them all; the French version with Anthony Quinn and Gina Lollobrigida.' },
      { title: 'Barry Lyndon', year: 1975, tmdbId: 3175, posterPath: 'https://image.tmdb.org/t/p/w342/znfLskGQnXYB2xcOGM9eInRHPAV.jpg', imdbRating: 8.1, director: 'Kubrick', cast: "Ryan O'Neal, Marisa Berenson, Patrick Magee", blurb: "An Irish chancer duels, deserts and marries his way into the English aristocracy, then loses it all; Kubrick shot Thackeray's novel like moving paintings, by candlelight." },
      { title: 'Hamlet', year: 1996, tmdbId: 10549, posterPath: 'https://image.tmdb.org/t/p/w342/ilurgUOp6SCl4cuhfjctj1qxlfZ.jpg', imdbRating: 7.3, director: 'Branagh', cast: 'Kenneth Branagh, Derek Jacobi, Kate Winslet', blurb: 'Branagh films the complete, uncut text in 70mm, a four-hour Hamlet in a bright mirrored Elsinore with an all-star cast down to the smallest role; the maximal version.' },
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
    heroPosition: 'center 40%',
    intro: [
      "Films about work rarely get called a genre, but they form one: strikes and picket lines, factory floors and call centers, the people history books forget. This collection gathers 21 of them, from Chaplin's assembly line to the Dardennes' weekend of door-knocking.",
      "It ran as the weekly theme in the I Like Movies Discover tab for the week of May 1, 2026, timed to May Day, featuring Norma Rae, Martin Ritt's story of a textile-mill union drive. The list crosses continents: Monicelli's Turin, Loach's Newcastle, Cantet's France, Boots Riley's Oakland.",
    ],
    items: [
      { title: 'Norma Rae', year: 1979, tmdbId: 40842, posterPath: 'https://image.tmdb.org/t/p/w342/6au7WBVYoKhV1jORyFSIRszb46S.jpg', imdbRating: 7.3, director: 'Martin Ritt', cast: 'Sally Field, Ron Leibman, Beau Bridges', blurb: "A Southern textile-mill worker with two kids and no illusions risks everything to unionize her plant; the moment she climbs on a table with a UNION sign is labor cinema's defining image." },
      { title: 'Modern Times', year: 1936, tmdbId: 3082, posterPath: 'https://image.tmdb.org/t/p/w342/AthaPakkuCLROdKxtRbKWclkDBK.jpg', imdbRating: 8.5, director: 'Chaplin', cast: 'Charlie Chaplin, Paulette Goddard, Henry Bergman', blurb: "Chaplin's Tramp is swallowed by the assembly line, literally through the gears, then drifts with an orphan through strikes and shantytowns; slapstick with a furious spine." },
      { title: 'The Grapes of Wrath', year: 1940, tmdbId: 596, posterPath: 'https://image.tmdb.org/t/p/w342/eUcxMVBIA0Jg8l1RGUqycrc3eIQ.jpg', imdbRating: 8.1, director: 'Ford', cast: 'Henry Fonda, Jane Darwell, John Carradine', blurb: "Evicted by the Dust Bowl, the Joad family drives west on the promise of California work that keeps receding; Ford's version of Steinbeck ends angrier than Hollywood usually allowed." },
      { title: 'On the Waterfront', year: 1954, tmdbId: 654, posterPath: 'https://image.tmdb.org/t/p/w342/d4S8LpbCyFJsh1tGgwGQSJdGzKm.jpg', imdbRating: 8.1, director: 'Kazan', cast: 'Marlon Brando, Eva Marie Saint, Karl Malden', blurb: "A dockworker who could have been a contender is asked to testify against the mob-run union that owns the waterfront and killed his conscience once already; Brando's defining performance." },
      { title: 'Salt of the Earth', year: 1954, tmdbId: 23620, posterPath: 'https://image.tmdb.org/t/p/w342/vYOH8TLzXq15alUDM5DDZXMb1LN.jpg', imdbRating: 7.3, director: 'Biberman', cast: 'Rosaura Revueltas, Juan Chacón, Will Geer', blurb: 'Striking zinc miners in New Mexico are legally barred from picketing, so their wives take the line; made by blacklisted filmmakers with real miners, and suppressed for years.' },
      { title: 'The Organizer', year: 1963, tmdbId: 51092, posterPath: 'https://image.tmdb.org/t/p/w342/4DSOr6HnkfgIH62alfH09YDkW2Q.jpg', imdbRating: 8, director: 'Monicelli', cast: 'Marcello Mastroianni, Renato Salvatori, Gabriella Giorgelli', blurb: 'A threadbare professor arrives in 1890s Turin and helps textile-mill workers mount their first strike; Mastroianni, shabby and magnificent, in a film both warm and clear-eyed about the cost.' },
      { title: 'Blue Collar', year: 1978, tmdbId: 14839, posterPath: 'https://image.tmdb.org/t/p/w342/7WBBcgzESyX1qEq9x7tg22dlORL.jpg', imdbRating: 7.5, director: 'Schrader', cast: 'Richard Pryor, Harvey Keitel, Yaphet Kotto', blurb: "Three Detroit auto workers, squeezed from every side, rob their own union local and find its books hide worse; Schrader's furious debut about how solidarity gets broken." },
      { title: '9 to 5', year: 1980, tmdbId: 19494, posterPath: 'https://image.tmdb.org/t/p/w342/wndwKY8WnSfhCUn7iSXI37dE7yo.jpg', imdbRating: 6.9, director: 'Higgins', cast: 'Jane Fonda, Lily Tomlin, Dolly Parton', blurb: 'Three secretaries, pushed past the limit by a lying, sexist boss, end up holding him captive while they quietly fix the office; Fonda, Tomlin and Parton in a revenge fantasy that stuck.' },
      { title: 'Matewan', year: 1987, tmdbId: 24276, posterPath: 'https://image.tmdb.org/t/p/w342/kdQ2MCsrsC39Ta9x05sWOb9wi5B.jpg', imdbRating: 7.9, director: 'Sayles', cast: 'Chris Cooper, James Earl Jones, Mary McDonnell', blurb: 'A union organizer arrives in a 1920 West Virginia coal town where the company owns everything and has imported Black and Italian strikebreakers; it builds, on history, to the Matewan massacre.' },
      { title: 'Roger & Me', year: 1989, tmdbId: 1779, posterPath: 'https://image.tmdb.org/t/p/w342/vSi4YK4E63geptUAxtizRUeTCFu.jpg', imdbRating: 7.5, director: 'Moore', cast: 'Michael Moore, Rhonda Britton, Fred Ross', blurb: "After GM closes its Flint plants, Michael Moore spends years trying to get chairman Roger Smith to visit the town his decisions gutted; the film that invented Moore's ambush style." },
      { title: 'The Full Monty', year: 1997, tmdbId: 9427, posterPath: 'https://image.tmdb.org/t/p/w342/fjg4EvzoLZVcZli4BwJIytJ6yjn.jpg', imdbRating: 7.2, director: 'Cattaneo', cast: 'Robert Carlyle, Mark Addy, Wim Snape', blurb: 'Six unemployed Sheffield steelworkers, out of options and pride, decide to out-strip the Chippendales for one night only; a comedy that never forgets why they need the money.' },
      { title: 'Office Space', year: 1999, tmdbId: 1542, posterPath: 'https://image.tmdb.org/t/p/w342/iEmTwOkUaLziMQCUZii5wPQBIAO.jpg', imdbRating: 7.6, director: 'Judge', cast: 'Ron Livingston, Jennifer Aniston, David Herman', blurb: 'A cubicle drone freed by hypnosis simply stops caring, and thrives, while his friends face the layoffs; TPS reports, a red stapler, and the printer scene: the cult film of white-collar futility.' },
      { title: 'I, Daniel Blake', year: 2016, tmdbId: 374473, posterPath: 'https://image.tmdb.org/t/p/w342/nu3WVABXz2W85N6JXTZOT1aWS3b.jpg', imdbRating: 7.8, director: 'Loach', cast: 'Dave Johns, Hayley Squires, Briana Shann', blurb: "A Newcastle carpenter recovering from a heart attack is ruled fit to work by the benefits system and ground through its forms and sanctions; Loach's Palme d'Or-winning indictment." },
      { title: 'Sorry to Bother You', year: 2018, tmdbId: 424781, posterPath: 'https://image.tmdb.org/t/p/w342/peTl1V04E9ppvhgvNmSX0r2ALqO.jpg', imdbRating: 6.9, director: 'Riley', cast: 'LaKeith Stanfield, Tessa Thompson, Jermaine Fowler', blurb: 'A Black Oakland telemarketer discovers his white voice and rockets up the corporate tower while his friends unionize below; a satire that keeps escalating past every guess.' },
      { title: 'Harlan County U.S.A.', year: 1976, tmdbId: 33324, posterPath: 'https://image.tmdb.org/t/p/w342/p0cyMNsoP5ap0omfhakhImBWTRw.jpg', imdbRating: 8.2, director: 'Kopple', cast: 'Norman Yarborough, Houston Elmore, Phil Sparks', blurb: "Kentucky coal miners strike against Duke Power while the company's gun thugs circle; Kopple's crew stayed through the guns, and the camera gets attacked on screen." },
      { title: 'Daens', year: 1992, tmdbId: 44103, posterPath: 'https://image.tmdb.org/t/p/w342/nUBD5dFMtnwn6mbQQrYTAzlcaLv.jpg', imdbRating: 7.5, director: 'Coninx', cast: 'Jan Decleir, Gérard Desarthe, Antje De Boeck', blurb: 'A priest in 1890s Flanders sides with the starving mill workers of Aalst against factory owners and his own church hierarchy; based on a real figure Belgium still argues about.' },
      { title: 'Brassed Off', year: 1996, tmdbId: 9450, posterPath: 'https://image.tmdb.org/t/p/w342/qS2cZYWn2jlQs4Ej5O42LVIANQB.jpg', imdbRating: 7.2, director: 'Herman', cast: 'Ewan McGregor, Tara Fitzgerald, Pete Postlethwaite', blurb: "As their colliery faces closure, Yorkshire miners keep the town's brass band playing toward a national final; a comedy that turns, by the end, into an open political eulogy." },
      { title: 'Human Resources', year: 1999, tmdbId: 46831, posterPath: 'https://image.tmdb.org/t/p/w342/i2BdbtsCeRCHhczCDEV3mFt4uF0.jpg', imdbRating: 7.3, director: 'Cantet', cast: 'Jalil Lespert, Jean-Claude Vallod, Didier Emile-Woldemard', blurb: 'A business student returns to his hometown factory to intern in management and discovers his own father is on the redundancy list he is helping prepare.' },
      { title: 'Made in Dagenham', year: 2010, tmdbId: 46138, posterPath: 'https://image.tmdb.org/t/p/w342/lcQGPxuk0fclp9UrFevI2lhDi1l.jpg', imdbRating: 7.1, director: 'Cole', cast: 'Sally Hawkins, Bob Hoskins, Miranda Richardson', blurb: "In 1968, the women who sew Ford's car seats walk out for equal pay and end up changing British law; a crowd-pleaser built on a real strike." },
      { title: 'Two Days, One Night', year: 2014, tmdbId: 221902, posterPath: 'https://image.tmdb.org/t/p/w342/2qpZZ5a5Axpk8OeCtrvNTQfJiB2.jpg', imdbRating: 7.3, director: 'Dardenne', cast: 'Marion Cotillard, Fabrizio Rongione, Catherine Salée', blurb: 'Over one weekend, a woman recovering from depression must visit sixteen colleagues and ask each to give up a bonus so she can keep her job; Cotillard makes every doorstep a battle.' },
      { title: 'Tout va bien', year: 1972, tmdbId: 8071, posterPath: 'https://image.tmdb.org/t/p/w342/6mJssZAMmziBP6tIe4vGTdNjeIA.jpg', imdbRating: 6.5, director: 'Godard', cast: 'Yves Montand, Jane Fonda, Vittorio Caprioli', blurb: "A strike locks a film director and his journalist wife inside a sausage factory, and the film keeps dismantling its own storytelling; Godard's return to commercial cinema, on his terms." },
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
    heroBackdropUrl: 'https://image.tmdb.org/t/p/w1280/nd6ItWuWGmTKhHXuxVC8kp86CmQ.jpg',
    heroPosition: 'center 30%',
    intro: [
      "After the Second World War, Italian directors took cameras out of the studios and onto broken streets, casting real people and filming the poverty around them. The movement they built, neorealism, became the school almost every modern director studied, openly or not: De Sica's fathers and sons, Rossellini's occupied Rome, Visconti's fishermen.",
      "This collection of 21 films was the first weekly theme in the I Like Movies Discover tab, for the week of April 24, 2026, featuring Bicycle Thieves. It runs from the movement's core (Rome, Open City; Umberto D.) to its edges and heirs (Il Posto, Hands Over the City).",
    ],
    items: [
      { title: 'Bicycle Thieves', year: 1948, tmdbId: 5156, posterPath: 'https://image.tmdb.org/t/p/w342/iPdVqIpmR3bRvOQJPrn4pr2KR3q.jpg', imdbRating: 8.2, director: 'De Sica', cast: 'Lamberto Maggiorani, Enzo Staiola, Lianella Carell', blurb: 'In postwar Rome, a man finally lands a job that requires a bicycle, and it is stolen on his first day; he and his small son search the city as desperation closes in.' },
      { title: 'Rome, Open City', year: 1945, tmdbId: 307, posterPath: 'https://image.tmdb.org/t/p/w342/ijGV4v8JxgbNzgEhqKdzHdaZn8a.jpg', imdbRating: 8, director: 'Rossellini', cast: 'Aldo Fabrizi, Marcello Pagliero, Harry Feist', blurb: 'A resistance leader, a priest and a pregnant widow live and die under the German occupation of Rome; shot in the actual ruined city months after liberation.' },
      { title: 'Paisan', year: 1946, tmdbId: 8429, posterPath: 'https://image.tmdb.org/t/p/w342/r5IGAFASCXmp8m51vUbER3WwVcB.jpg', imdbRating: 7.6, director: 'Rossellini', cast: 'Carmela Sazio, Robert Van Loon, Benjamin Emanuel', blurb: 'Six stories climb the boot of Italy alongside the Allied liberation, from Sicily to the Po marshes, tracking soldiers and civilians who mostly cannot understand each other.' },
      { title: 'Umberto D.', year: 1952, tmdbId: 833, posterPath: 'https://image.tmdb.org/t/p/w342/5I7SYsNQmZRZpQ2MAarIQYU9vaX.jpg', imdbRating: 8.1, director: 'De Sica', cast: 'Carlo Battisti, Napoleone the Dog, Maria Pia Casilio', blurb: "A retired civil servant with a small dog and a smaller pension slides toward eviction while trying to keep his dignity; De Sica's bleakest, tenderest film." },
      { title: 'Ossessione', year: 1943, tmdbId: 5155, posterPath: 'https://image.tmdb.org/t/p/w342/dHB6NdsOxO0dc71ciP2hsv3nTPf.jpg', imdbRating: 7.6, director: 'Visconti', cast: 'Clara Calamai, Massimo Girotti, Dhia Cristiani', blurb: "A drifter and an innkeeper's wife fall into lust and plot her husband's death; The Postman Always Rings Twice transplanted to the Po delta, and the movement's dark seed." },
      { title: 'La Terra Trema', year: 1948, tmdbId: 43445, posterPath: 'https://image.tmdb.org/t/p/w342/cVK1GmzkLkVutFT9fFt6V6CripQ.jpg', imdbRating: 7.8, director: 'Visconti', cast: 'Antonio Arcidiacono, Giuseppe Arcidiacono, Venera Bonaccorso', blurb: 'A Sicilian fishing family mortgages everything to escape the wholesalers who fix the prices, and the sea and the market punish them; acted entirely by villagers in their own dialect.' },
      { title: 'La Strada', year: 1954, tmdbId: 405, posterPath: 'https://image.tmdb.org/t/p/w342/rwjbT0zlsUDMztaCcWjlWuxaEL1.jpg', imdbRating: 8, director: 'Fellini', cast: 'Giulietta Masina, Anthony Quinn, Richard Basehart', blurb: "A simple-hearted young woman is sold to a brutish traveling strongman as assistant and wife; Fellini's fable of cruelty and grace, with Giulietta Masina's unforgettable face." },
      { title: 'Nights of Cabiria', year: 1957, tmdbId: 19426, posterPath: 'https://image.tmdb.org/t/p/w342/xF4oCG3PLNbcrtPZbqB3BtkIbKg.jpg', imdbRating: 8.1, director: 'Fellini', cast: 'Giulietta Masina, François Périer, Franca Marzi', blurb: 'A proud Roman streetwalker keeps trusting men and being robbed by them, and keeps walking anyway; ends on the most generous final smile in cinema.' },
      { title: 'Bitter Rice', year: 1949, tmdbId: 31058, posterPath: 'https://image.tmdb.org/t/p/w342/9vvbZgbkfE7urqQXRNiONmvYTtF.jpg', imdbRating: 7.6, director: 'De Santis', cast: 'Doris Dowling, Silvana Mangano, Vittorio Gassman', blurb: 'Seasonal workers in the northern rice paddies harbor two thieves on the run; neorealism crossed with pulp melodrama, and a star-making role for Silvana Mangano.' },
      { title: 'Il Posto', year: 1961, tmdbId: 31742, posterPath: 'https://image.tmdb.org/t/p/w342/wyUxfQCtcPxRzwJtFy0emtfkux8.jpg', imdbRating: 7.9, director: 'Olmi', cast: 'Loredana Detto, Sandro Panseri, Corrado Aprile', blurb: 'A shy boy from the Milan suburbs sits exams and interviews for a lifetime clerkship, wanders the city, and glimpses the desk waiting at the end of it all; gentle and quietly chilling.' },
      { title: 'The Tree of Wooden Clogs', year: 1978, tmdbId: 31542, posterPath: 'https://image.tmdb.org/t/p/w342/ld4l2XWuECX6c6lWd2BWv1olg2N.jpg', imdbRating: 7.8, director: 'Olmi', cast: 'Luigi Ornaghi, Francesca Moriggi, Omar Brignoli', blurb: 'Four peasant families share a Lombardy farmstead through one year of births, harvests and small injustices; three patient hours acted by real farmers in dialect.' },
      { title: 'Accattone', year: 1961, tmdbId: 12491, posterPath: 'https://image.tmdb.org/t/p/w342/113ts2Bmm5CZ3YJMwfCU9XGFCAf.jpg', imdbRating: 7.6, director: 'Pasolini', cast: 'Franco Citti, Franca Pasut, Silvana Corsini', blurb: "A Roman pimp who has never worked drifts between women, hunger and petty theft in the borgate; Pasolini's debut gave the slums a doomed, sacred grandeur." },
      { title: 'Mamma Roma', year: 1962, tmdbId: 47796, posterPath: 'https://image.tmdb.org/t/p/w342/kQtO9rzEhcezWl0nQlIxV2FZftt.jpg', imdbRating: 7.8, director: 'Pasolini', cast: 'Anna Magnani, Ettore Garofolo, Franco Citti', blurb: 'A former prostitute claws her way to a market stall and an apartment to give her teenage son a respectable life, and the past keeps its grip; Anna Magnani at full force.' },
      { title: 'Salvatore Giuliano', year: 1962, tmdbId: 27523, posterPath: 'https://image.tmdb.org/t/p/w342/uaFTCD0y2MEccTFyHOHj6IrwyZ.jpg', imdbRating: 7.3, director: 'Rosi', cast: 'Salvo Randone, Frank Wolff, Pippo Agusta', blurb: "The bandit's bullet-riddled body opens the film, and Sicily is reconstructed around the corpse: police, press, Mafia and politics each with a version; the investigation as film form." },
      { title: 'Il Grido', year: 1957, tmdbId: 41054, posterPath: 'https://image.tmdb.org/t/p/w342/s1o3I46VJP5mkqrBeRJnwdekcRa.jpg', imdbRating: 7.6, director: 'Antonioni', cast: 'Steve Cochran, Alida Valli, Dorian Gray', blurb: 'Left by the woman he built his life around, a sugar-refinery worker drifts along the Po with his small daughter, trying and failing to start over; neorealism turning inward.' },
      { title: 'In the Name of the Law', year: 1949, tmdbId: 195382, posterPath: 'https://image.tmdb.org/t/p/w342/zJivgprws3TOLTZSDh2qXfnIeZt.jpg', imdbRating: 7.6, director: 'Germi', cast: 'Massimo Girotti, Jone Salinas, Camillo Mastrocinque', blurb: 'A young judge posted to a Sicilian town finds the Mafia running everything and every witness silent; an early, sharp look at what the postwar state was up against.' },
      { title: 'Without Pity', year: 1948, tmdbId: 185078, posterPath: 'https://image.tmdb.org/t/p/w342/eCwNf7zp4KRyWsG7lMARLJkzm54.jpg', imdbRating: 6.6, director: 'Lattuada', cast: 'Carla Del Poggio, John Kitzmiller, Pierre Claudé', blurb: 'A Black American GI and a desperate Italian woman fall in love in the smuggling underworld of postwar Livorno, where every exit is closed to them; a rare interracial romance for its era.' },
      { title: 'To Live in Peace', year: 1947, tmdbId: 120488, posterPath: 'https://image.tmdb.org/t/p/w342/9UFla7ld3xutuV0SHpEyneyQhw1.jpg', imdbRating: 7, director: 'Zampa', cast: 'Aldo Fabrizi, Gar Moore, Mirella Monti', blurb: 'An Italian farm family hides two escaped American POWs, one Black, as the front approaches and the village drunk celebrates peace early; comedy and war grief in one held breath.' },
      { title: 'Two Pennyworth of Hope', year: 1952, tmdbId: 117478, posterPath: 'https://image.tmdb.org/t/p/w342/qTDv04Y6XbCn0uB3dxynItTaXAl.jpg', imdbRating: 7, director: 'Castellani', cast: 'Maria Fiore, Vincenzo Musolino, Filomena Russo', blurb: "A jobless veteran in a village under Vesuvius hustles at a dozen trades while courting a fireworks-maker's daughter against both families; neorealism at its sunniest." },
      { title: 'Banditi a Orgosolo', year: 1961, tmdbId: 122699, posterPath: 'https://image.tmdb.org/t/p/w342/3aQfkCI5xDIBPqfyIV4xLtcbxSP.jpg', imdbRating: 7.7, director: 'De Seta', cast: 'Michele Cossu, Peppeddu Cuccu, Vittorina Pisano', blurb: 'A Sardinian shepherd wrongly suspected after a police raid takes his flock into the mountains and is made an outlaw by suspicion itself; shot with real shepherds of Orgosolo.' },
      { title: 'Hands Over the City', year: 1963, tmdbId: 58383, posterPath: 'https://image.tmdb.org/t/p/w342/zR9uj0dtm5osrrpM7zwO5ndAtbh.jpg', imdbRating: 7.6, director: 'Rosi', cast: 'Rod Steiger, Salvo Randone, Guido Alberti', blurb: 'A Naples building collapse exposes the alliance of developers and councilmen rezoning the city for profit; Rosi names the mechanism outright, and the film still plays as current affairs.' },
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
