// Copy for the /list/ pages: one entry per /list/<slug> page, rendered by
// ListiclePage.astro via src/pages/list/[slug].astro, and listed
// automatically on /guides.
//
// Same contract as watchOrders.ts: one source of truth, FAQs render twice
// (visible markup + FAQPage JSON-LD) and must never drift, and the visible
// list order IS the ItemList order.
//
// Editorial rules on top of the site-wide ones (no em dashes, only true
// claims): rankings are data, not taste. A ranked list sorts by TMDB user
// score (the database the app itself runs on, already attributed in the
// footer), states its as-of date in the intro, and breaks ties by release
// year, older first. Scores are fetched from the TMDB API, never guessed.
// No streaming-availability claims (region-dependent and they rot); blurbs
// are one specific descriptive sentence, never filler praise.

export type ListEntry = {
  title: string;
  year: number;
  /**
   * TMDB user score (one decimal) at the as-of date stated in the intro.
   * Present on every item of a score-ranked list; the sort controls only
   * render when the whole list carries it.
   */
  tmdbScore?: number;
  /** TMDB-verified runtime, rendered as a chip where the length IS the point. */
  runtimeMin?: number;
  /** One specific sentence. What this film is, not that it is good. */
  blurb: string;
};

export type Listicle = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string[];
  /** True renders a numbered ranking; false renders an unranked list. */
  ranked: boolean;
  /** Heading over the list itself. */
  listHeading: string;
  items: ListEntry[];
  /** One paragraph on where the app genuinely helps, rendered before the FAQ. */
  appNote: string;
  /** Optional cross-type link, appended to the "More lists" line. */
  related?: { href: string; label: string };
  faqs: { q: string; a: string[] }[];
};

export const LISTICLES: Listicle[] = [
  {
    slug: 'studio-ghibli-films-ranked',
    title: 'Every Studio Ghibli film ranked by viewer score, from Spirited Away down',
    metaDescription:
      'All 24 Studio Ghibli films ranked by TMDB user score, from Spirited Away at 8.5 to Earwig and the Witch, each with one honest sentence on what it is.',
    h1: 'Every Studio Ghibli film, ranked by viewer score',
    intro: [
      'This list ranks all 24 Studio Ghibli feature films by their TMDB user score, the community rating on The Movie Database, as of August 2026. TMDB is the same database the I Like Movies app runs on, the scores are checkable on any film\'s TMDB page, and ties are broken by release year, older first. Scores drift slowly as people keep rating, so treat a 0.1 gap as a coin flip and anything bigger as a real signal.',
      'Two housekeeping notes. Nausicaa of the Valley of the Wind predates the studio\'s founding but is counted here, as it is almost everywhere, because the same team made it and Ghibli exists because of it. And there is no watch order to worry about: every Ghibli film stands alone. The buttons above the list re-sort it if you would rather browse by date.',
    ],
    ranked: true,
    listHeading: 'The ranking',
    items: [
      {
        title: 'Spirited Away',
        year: 2001,
        tmdbScore: 8.5,
        blurb: 'A girl works in a bathhouse for gods to free her parents; the Academy Award winner and the highest-rated film the studio has made.',
      },
      {
        title: 'Grave of the Fireflies',
        year: 1988,
        tmdbScore: 8.4,
        blurb: 'Two children starve in wartime Japan. The film on this list you will only ever watch once.',
      },
      {
        title: "Howl's Moving Castle",
        year: 2004,
        tmdbScore: 8.4,
        blurb: 'A cursed hatmaker and a vain wizard in a walking house; the most romantic thing the studio made.',
      },
      {
        title: 'Princess Mononoke',
        year: 1997,
        tmdbScore: 8.3,
        blurb: "Miyazaki's hardest and angriest film, a war between industry and forest where nobody is the villain.",
      },
      {
        title: 'My Neighbor Totoro',
        year: 1988,
        tmdbScore: 8.1,
        blurb: 'Two sisters, a house in the country, a sick mother, and the gentlest film ever made about waiting.',
      },
      {
        title: 'The Tale of the Princess Kaguya',
        year: 2013,
        tmdbScore: 8.1,
        blurb: "Takahata's folk tale drawn like moving charcoal sketches; no other Ghibli film looks like it.",
      },
      {
        title: 'Castle in the Sky',
        year: 1986,
        tmdbScore: 8.0,
        blurb: "The studio's first official film: sky pirates, a floating city, and pure adventure-serial momentum.",
      },
      {
        title: 'Nausicaa of the Valley of the Wind',
        year: 1984,
        tmdbScore: 7.9,
        blurb: "The pre-Ghibli origin: a princess in a poisoned world, and half the studio's later ideas in first draft.",
      },
      {
        title: 'Whisper of the Heart',
        year: 1995,
        tmdbScore: 7.9,
        blurb: 'A junior-high writer chases a boy and a calling; the most down-to-earth film in the catalogue.',
      },
      {
        title: 'When Marnie Was There',
        year: 2014,
        tmdbScore: 7.9,
        blurb: "A lonely girl and a ghostly friendship in a seaside marsh; the studio's quietest late film.",
      },
      {
        title: "Kiki's Delivery Service",
        year: 1989,
        tmdbScore: 7.8,
        blurb: 'A young witch opens a delivery business and burns out; the truest film about work in the catalogue.',
      },
      {
        title: 'Porco Rosso',
        year: 1992,
        tmdbScore: 7.8,
        blurb: "A World War I ace cursed with a pig's face flies the Adriatic; melancholy wearing a comedy's clothes.",
      },
      {
        title: 'Ponyo',
        year: 2008,
        tmdbScore: 7.8,
        blurb: 'A goldfish decides to become a girl; pure preschool joy animated with absurd, hand-drawn extravagance.',
      },
      {
        title: 'The Wind Rises',
        year: 2013,
        tmdbScore: 7.8,
        blurb: 'A biography of a wartime aircraft designer, and Miyazaki arguing with himself about beauty and complicity.',
      },
      {
        title: 'Arrietty',
        year: 2010,
        tmdbScore: 7.7,
        blurb: 'Borrowers living under the floorboards; small-scale in every sense and lovely within it.',
      },
      {
        title: 'From Up on Poppy Hill',
        year: 2011,
        tmdbScore: 7.5,
        blurb: 'A 1963 schoolgirl romance around a condemned clubhouse; modest, warm, and better than its reputation.',
      },
      {
        title: 'Only Yesterday',
        year: 1991,
        tmdbScore: 7.4,
        blurb: "A Tokyo office worker revisits her childhood on a farm trip; Takahata's adult drama, decades ahead of its time.",
      },
      {
        title: 'The Boy and the Heron',
        year: 2023,
        tmdbScore: 7.4,
        blurb: "Miyazaki's late, strange self-portrait; more haunted and less tidy than anything before it.",
      },
      {
        title: 'Pom Poko',
        year: 1994,
        tmdbScore: 7.2,
        blurb: "Shape-shifting raccoon dogs fight suburban development; the studio's oddest film and its most direct eco-fable.",
      },
      {
        title: 'The Cat Returns',
        year: 2002,
        tmdbScore: 7.1,
        blurb: 'A girl is abducted into a kingdom of cats; a light 75-minute lark, and knowingly so.',
      },
      {
        title: 'My Neighbors the Yamadas',
        year: 1999,
        tmdbScore: 7.0,
        blurb: 'A family told in comic-strip vignettes; Takahata experimenting, charming in pieces rather than as a whole.',
      },
      {
        title: 'Tales from Earthsea',
        year: 2006,
        tmdbScore: 6.5,
        blurb: "Goro Miyazaki's debut, adapting Le Guin without her blessing; handsome and hollow.",
      },
      {
        title: 'Ocean Waves',
        year: 1993,
        tmdbScore: 6.4,
        blurb: "A made-for-TV teen love triangle by the studio's younger staff; slight, but honest about adolescence.",
      },
      {
        title: 'Earwig and the Witch',
        year: 2020,
        tmdbScore: 5.9,
        blurb: "The studio's first CG feature, and by some distance its lowest-rated film.",
      },
    ],
    appNote:
      'If a list like this turns into a watching project, I Like Movies, the free Android app behind this page, is built for exactly that: keep the films you have not seen on your watchlist, rate them as you go, and see where each one is streaming in your country before you press play.',
    faqs: [
      {
        q: 'How is this list ranked?',
        a: [
          'By TMDB user score as of August 2026, the community rating on The Movie Database, with ties broken by release year, older first. The scores are printed next to each film and checkable on TMDB; nothing here is the author\'s personal ordering.',
        ],
      },
      {
        q: 'What is the best Studio Ghibli movie?',
        a: [
          'By viewer score, Spirited Away at 8.5: it also won the Academy Award and remains the studio\'s biggest film. Grave of the Fireflies and Howl\'s Moving Castle sit just behind at 8.4.',
        ],
      },
      {
        q: 'Which Studio Ghibli film should I watch first?',
        a: [
          'My Neighbor Totoro for children or a family evening, Spirited Away for everyone else. Every Ghibli film stands alone, so nothing stops you starting anywhere; these two are simply the surest first impressions.',
        ],
      },
      {
        q: 'Do I need to watch Studio Ghibli films in order?',
        a: [
          'No. There are no sequels and no shared story anywhere in the catalogue, so release order carries no advantage. Pick by mood, not by date.',
        ],
      },
      {
        q: 'Is Nausicaa a Studio Ghibli film?',
        a: [
          'Technically no: it premiered in 1984, a year before the studio existed. In practice yes: Miyazaki directed it, the core team made it, its success funded the studio\'s founding, and it is distributed alongside the rest of the catalogue. It is counted here.',
        ],
      },
      {
        q: 'Is Grave of the Fireflies on the streaming services with the other Ghibli films?',
        a: [
          'Often not: its rights sit with a different company than the rest of the catalogue, so it is frequently missing from the platforms that carry everything else. Where it streams varies by country, so check availability where you live.',
        ],
      },
    ],
  },
  {
    slug: 'christopher-nolan-films-ranked',
    title: 'Every Christopher Nolan film ranked by viewer score',
    metaDescription:
      'All 13 Christopher Nolan films ranked by TMDB user score, from The Dark Knight and Interstellar at 8.5 through The Odyssey to Insomnia, with one honest sentence each.',
    h1: 'Every Christopher Nolan film, ranked by viewer score',
    intro: [
      'This list ranks all 13 Christopher Nolan feature films by their TMDB user score, the community rating on The Movie Database, as of August 2026. TMDB is the same database the I Like Movies app runs on, the scores are checkable on any film\'s TMDB page, and ties are broken by release year, older first. A 0.1 gap is a coin flip; a bigger one is a real signal.',
      'Nearly everything here stands alone. The one internal order that matters: the three Batman films (Batman Begins, The Dark Knight, The Dark Knight Rises) are a trilogy and should be watched in that order, wherever they sit in the ranking.',
    ],
    ranked: true,
    listHeading: 'The ranking',
    items: [
      {
        title: 'The Dark Knight',
        year: 2008,
        tmdbScore: 8.5,
        blurb: 'The middle Batman film and the reason superhero films get compared to crime epics; Heath Ledger\'s Joker is the pull, the ferry dilemma is the keeper.',
      },
      {
        title: 'Interstellar',
        year: 2014,
        tmdbScore: 8.5,
        blurb: 'A father flies through a wormhole to outrun a dying Earth; the most emotional film Nolan has made, scored by Zimmer\'s church organ.',
      },
      {
        title: 'Inception',
        year: 2010,
        tmdbScore: 8.4,
        blurb: 'A heist inside layered dreams, and the rare blockbuster whose structure is the spectacle.',
      },
      {
        title: 'Memento',
        year: 2000,
        tmdbScore: 8.2,
        blurb: 'A man with no short-term memory hunts his wife\'s killer, told backwards; the breakthrough, still the tightest script.',
      },
      {
        title: 'The Prestige',
        year: 2006,
        tmdbScore: 8.2,
        blurb: 'Two rival magicians destroy themselves over one trick; the Nolan film that rewards a second watch most.',
      },
      {
        title: 'Oppenheimer',
        year: 2023,
        tmdbScore: 8.0,
        blurb: 'Three hours inside the head of the man who built the bomb; Best Picture winner and the biggest biopic ever made.',
      },
      {
        title: 'The Odyssey',
        year: 2026,
        tmdbScore: 8.0,
        blurb: 'Homer\'s epic shot on IMAX film with Matt Damon as Odysseus; the newest entry, and its score is still settling.',
      },
      {
        title: 'The Dark Knight Rises',
        year: 2012,
        tmdbScore: 7.8,
        blurb: 'The trilogy\'s heaviest and most operatic chapter; closes the Batman story properly, which almost no trilogy manages.',
      },
      {
        title: 'Batman Begins',
        year: 2005,
        tmdbScore: 7.7,
        blurb: 'The film that rebuilt Batman as crime drama; the origin story later films are still measured against.',
      },
      {
        title: 'Dunkirk',
        year: 2017,
        tmdbScore: 7.4,
        blurb: 'The evacuation told on three interlocking clocks: an hour, a day, a week; war as pure suspense engineering, almost wordless.',
      },
      {
        title: 'Tenet',
        year: 2020,
        tmdbScore: 7.2,
        blurb: 'Espionage with time flowing both ways; the most demanding watch here, and it knows it.',
      },
      {
        title: 'Following',
        year: 1998,
        tmdbScore: 7.1,
        blurb: 'A no-budget black-and-white debut about a writer who follows strangers; 69 minutes, and the obsessions are already all there.',
      },
      {
        title: 'Insomnia',
        year: 2002,
        tmdbScore: 7.0,
        blurb: 'A sleepless detective unravels under the midnight sun; the only Nolan film from someone else\'s script, and Pacino\'s last great lead.',
      },
    ],
    appNote:
      'Working through a filmography is exactly what I Like Movies, the free Android app behind this page, is for: put the ones you have not seen on your watchlist, rate as you go, and see where each film streams in your country before you press play.',
    faqs: [
      {
        q: 'How is this list ranked?',
        a: [
          'By TMDB user score as of August 2026, the community rating on The Movie Database, with ties broken by release year, older first. The scores are printed next to each film and checkable on TMDB; nothing here is the author\'s personal ordering.',
        ],
      },
      {
        q: 'What is Christopher Nolan\'s best film?',
        a: [
          'By viewer score it is a tie at 8.5 between The Dark Knight and Interstellar, with Inception just behind at 8.4. Which of the three someone names usually says more about them than about the films.',
        ],
      },
      {
        q: 'Do Christopher Nolan\'s films need to be watched in order?',
        a: [
          'No, with one exception: Batman Begins, The Dark Knight and The Dark Knight Rises are a trilogy and belong in that order. Everything else is standalone, so a score-order or mood-order run works fine.',
        ],
      },
      {
        q: 'What is Christopher Nolan\'s newest film?',
        a: [
          'The Odyssey, released in July 2026: Homer\'s epic shot on IMAX cameras, with Matt Damon as Odysseus. Its score is newer than the rest and may drift more than the others as ratings accumulate.',
        ],
      },
    ],
  },
  {
    slug: 'great-films-under-100-minutes',
    title: 'Great films under 100 minutes for a tired weeknight',
    metaDescription:
      'Nineteen genuinely great films under 100 minutes, ranked by TMDB user score, from 12 Angry Men to Paddington, with the runtime printed next to every one.',
    h1: 'Great films under 100 minutes, ranked',
    intro: [
      'The tired-weeknight problem: it is 21:30, a three-hour epic is off the table, and everything short in the menus looks disposable. This list is the counter-evidence: nineteen films under 100 minutes, every runtime checked against TMDB, ranked by TMDB user score as of August 2026, ties broken by release year, older first.',
      'This one is a curated shortlist rather than a complete catalogue of anything, so the selection is the editorial act: a spread of moods from courtroom drama to zombie comedy, each one genuinely finishable before midnight. The buttons above the list re-sort it by date if you prefer.',
    ],
    ranked: true,
    listHeading: 'The list',
    items: [
      {
        title: '12 Angry Men',
        year: 1957,
        tmdbScore: 8.6,
        runtimeMin: 97,
        blurb: 'One jury room, one holdout, ninety-seven minutes; still the model for how much cinema fits in one room.',
      },
      {
        title: 'My Neighbor Totoro',
        year: 1988,
        tmdbScore: 8.1,
        runtimeMin: 86,
        blurb: 'Two sisters and a forest spirit; the gentlest possible landing for a frayed evening.',
      },
      {
        title: 'La Haine',
        year: 1995,
        tmdbScore: 8.1,
        runtimeMin: 98,
        blurb: 'Twenty-four hours in the Paris banlieues after a riot; furious, funny, and shot in timeless black and white.',
      },
      {
        title: 'Rashomon',
        year: 1950,
        tmdbScore: 8.0,
        runtimeMin: 88,
        blurb: 'One crime, four contradictory tellings; the film that gave unreliable narration its name.',
      },
      {
        title: 'Toy Story',
        year: 1995,
        tmdbScore: 8.0,
        runtimeMin: 81,
        blurb: 'The first all-CG feature and still one of the tightest scripts in animation.',
      },
      {
        title: 'The Iron Giant',
        year: 1999,
        tmdbScore: 8.0,
        runtimeMin: 86,
        blurb: 'A boy hides a giant robot from the Cold War; Brad Bird\'s debut, and a guaranteed lump in the throat.',
      },
      {
        title: 'Persepolis',
        year: 2007,
        tmdbScore: 7.9,
        runtimeMin: 95,
        blurb: 'Growing up through the Iranian revolution, drawn in stark animated ink; a memoir that moves like a thriller.',
      },
      {
        title: 'Stand by Me',
        year: 1986,
        tmdbScore: 7.8,
        runtimeMin: 89,
        blurb: 'Four boys walk the train tracks to find a body; the definitive film about being twelve.',
      },
      {
        title: 'Before Sunset',
        year: 2004,
        tmdbScore: 7.8,
        runtimeMin: 80,
        blurb: 'Two people talk through Paris in real time, nine years after their one night; eighty minutes, perfect ending.',
      },
      {
        title: 'Fantastic Mr. Fox',
        year: 2009,
        tmdbScore: 7.8,
        runtimeMin: 87,
        blurb: 'Wes Anderson does Roald Dahl in stop motion; dry, handsome, and over before the kettle cools.',
      },
      {
        title: 'One Cut of the Dead',
        year: 2017,
        tmdbScore: 7.6,
        runtimeMin: 96,
        blurb: 'A zombie film that appears terrible for half an hour and then becomes the most joyful film about filmmaking in years; go in blind.',
      },
      {
        title: 'Shaun of the Dead',
        year: 2004,
        tmdbScore: 7.5,
        runtimeMin: 99,
        blurb: 'A slacker fights the apocalypse with a cricket bat; the romzomcom that made Edgar Wright\'s name.',
      },
      {
        title: 'What We Do in the Shadows',
        year: 2014,
        tmdbScore: 7.5,
        runtimeMin: 86,
        blurb: 'A documentary crew follows vampire flatmates in Wellington; the highest joke-per-minute rate on this list.',
      },
      {
        title: 'This Is Spinal Tap',
        year: 1984,
        tmdbScore: 7.4,
        runtimeMin: 82,
        blurb: 'The fake rock documentary every real one now gets compared to; these go to eleven.',
      },
      {
        title: 'Airplane!',
        year: 1980,
        tmdbScore: 7.3,
        runtimeMin: 88,
        blurb: 'A gag every ten seconds for eighty-eight minutes; surely the densest comedy ever made, and stop calling me Shirley.',
      },
      {
        title: 'Run Lola Run',
        year: 1998,
        tmdbScore: 7.3,
        runtimeMin: 80,
        blurb: 'Lola has twenty minutes to find 100,000 marks, told three times; pure kinetic energy at eighty minutes.',
      },
      {
        title: 'Frances Ha',
        year: 2013,
        tmdbScore: 7.3,
        runtimeMin: 86,
        blurb: 'A dancer in New York fails upward with style; Greta Gerwig\'s calling card, light on plot and full of life.',
      },
      {
        title: 'Coherence',
        year: 2014,
        tmdbScore: 7.2,
        runtimeMin: 89,
        blurb: 'A dinner party fractures as a comet passes; micro-budget sci-fi that runs entirely on ideas.',
      },
      {
        title: 'Paddington',
        year: 2014,
        tmdbScore: 7.1,
        runtimeMin: 95,
        blurb: 'A polite bear looks for a home in London; the safest possible pick for any mixed room.',
      },
    ],
    appNote:
      'Nights like this are what the watchlist in I Like Movies, the free Android app behind this page, is for: save the ones that appeal now, and when the tired evening arrives the shortlist is already made, with streaming availability for your country shown per title.',
    related: {
      href: '/what-to-watch-together',
      label: 'how to decide what to watch together',
    },
    faqs: [
      {
        q: 'How is this list ranked?',
        a: [
          'The films are picked editorially, then ranked by TMDB user score as of August 2026, ties broken by release year, older first. Every runtime is taken from TMDB, and every film here runs under 100 minutes.',
        ],
      },
      {
        q: 'What is a good movie under 90 minutes?',
        a: [
          'From this list: Before Sunset and Run Lola Run at 80 minutes, Toy Story at 81, This Is Spinal Tap at 82, and My Neighbor Totoro, The Iron Giant, Frances Ha and What We Do in the Shadows all at 86. All of them are complete films, not padded shorts.',
        ],
      },
      {
        q: 'Which of these films are fine for kids?',
        a: [
          'My Neighbor Totoro, Toy Story, The Iron Giant, Fantastic Mr. Fox and Paddington. The rest range from teen-fine (Stand by Me) to firmly not (La Haine); check a parental guide where it matters.',
        ],
      },
      {
        q: 'Why under 100 minutes?',
        a: [
          'Because the runtime is the constraint on a weeknight: starting a 100-minute film at 21:30 still ends the evening before midnight. The cut-off is arbitrary but honest, and every runtime here is verified rather than rounded down.',
        ],
      },
    ],
  },
];
