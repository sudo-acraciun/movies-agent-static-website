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
  /** TMDB id, provenance for the baked poster (resolved out-of-band, never guessed). */
  tmdbId?: number;
  /** Baked TMDB poster URL (w342). */
  posterPath?: string;
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
  /** Top-ranked film's TMDB backdrop (w1280), rendered as the page hero. */
  heroBackdrop?: string;
  /** CSS object-position for the hero crop (e.g. 'center 20%'), judged per
   *  image: one film's backdrop frames its subject differently from another's. */
  heroPosition?: string;
  /** One paragraph on where the app genuinely helps, rendered before the FAQ. */
  appNote: string;
  /** Optional cross-type link, rendered on the browse line under "More lists". */
  related?: { href: string; label: string };
  faqs: { q: string; a: string[] }[];
};

export const LISTICLES: Listicle[] = [
  {
    slug: 'best-horror-movies-hooptober',
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/kJMLPj5enrZti8udTVeULlM70mz.jpg',
    heroPosition: 'center 40%',
    title: 'The best horror films to watch this Hooptober, ranked by viewer score',
    metaDescription:
      'Twenty-one horror films to marathon this Hooptober, ranked by TMDB user score from Alien at 8.2 down to Lake Mungo at 6.1, each with one plain sentence on what it is.',
    h1: 'The best horror films to watch this Hooptober, ranked',
    intro: [
      'This list ranks 21 horror films to marathon through October by their TMDB user score, the community rating on The Movie Database, as of September 2026. TMDB is the same database the I Like Movies app runs on, every score is checkable on a film\'s TMDB page, and ties are broken by release year, older first. Treat a 0.1 gap as a coin flip and anything wider as a real signal.',
      'Hooptober is the informal October challenge that spread through film communities: watch a run of horror films across the month, with many people aiming for 31. This is a curated cross-section rather than a complete catalogue, so the selection is the editorial act, a spread of eras and subgenres from a 1935 Universal classic to 2024 body horror, from Japanese ghost stories to found-footage dread. The buttons above the list re-sort it by date if you would rather browse chronologically.',
    ],
    ranked: true,
    listHeading: 'The ranking',
    items: [
      {
        title: 'Alien',
        year: 1979,
        tmdbId: 348,
        posterPath: 'https://image.tmdb.org/t/p/w342/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg',
        tmdbScore: 8.2,
        blurb: 'A commercial towing crew answers a distress call and brings something aboard; Ridley Scott\'s haunted-house film set in deep space.',
      },
      {
        title: 'Jaws',
        year: 1975,
        tmdbId: 578,
        posterPath: 'https://image.tmdb.org/t/p/w342/lxM6kqilAdpdhqUl2biYp5frUxE.jpg',
        tmdbScore: 7.7,
        blurb: 'A great white shark shuts down a beach town over a holiday weekend; the film that invented the summer blockbuster and a fear of open water.',
      },
      {
        title: 'Bride of Frankenstein',
        year: 1935,
        tmdbId: 229,
        posterPath: 'https://image.tmdb.org/t/p/w342/5241zUwe7rC17MNc2QpCBKKdp1N.jpg',
        tmdbScore: 7.5,
        blurb: 'James Whale gives the monster a mate and a heart; the rare sequel often held to surpass the original.',
      },
      {
        title: 'Dawn of the Dead',
        year: 1978,
        tmdbId: 923,
        posterPath: 'https://image.tmdb.org/t/p/w342/70MY8H0bLMvXf8ED2SgVMPhDVVM.jpg',
        tmdbScore: 7.5,
        blurb: 'Survivors barricade themselves inside a shopping mall as the dead rise; Romero\'s zombie satire of American consumption.',
      },
      {
        title: 'A Nightmare on Elm Street',
        year: 1984,
        tmdbId: 377,
        posterPath: 'https://image.tmdb.org/t/p/w342/tI0RQFYevX97NSdDSYmn0Z19i3r.jpg',
        tmdbScore: 7.4,
        blurb: 'A burned killer hunts teenagers inside their dreams, where dying asleep means dying for real; Wes Craven\'s sharpest premise.',
      },
      {
        title: 'The Fly',
        year: 1986,
        tmdbId: 9426,
        posterPath: 'https://image.tmdb.org/t/p/w342/8gZWMhJHRvaXdXsNhERtqNHYpH3.jpg',
        tmdbScore: 7.4,
        blurb: 'A scientist tests a teleporter on himself and slowly turns into something else; Cronenberg\'s body horror told as a love story.',
      },
      {
        title: 'The Evil Dead',
        year: 1981,
        tmdbId: 764,
        posterPath: 'https://image.tmdb.org/t/p/w342/54C1qdaiSijIU5NeNb4WsPJdNkG.jpg',
        tmdbScore: 7.3,
        blurb: 'Five friends read aloud from a book of the dead in a remote cabin; Sam Raimi\'s ferocious low-budget debut.',
      },
      {
        title: '28 Days Later',
        year: 2002,
        tmdbId: 170,
        posterPath: 'https://image.tmdb.org/t/p/w342/sQckQRt17VaWbo39GIu0TMOiszq.jpg',
        tmdbScore: 7.2,
        blurb: 'A man wakes from a coma into a London emptied by a rage virus; the film that taught zombies to run.',
      },
      {
        title: 'Ringu',
        year: 1998,
        tmdbId: 2671,
        posterPath: 'https://image.tmdb.org/t/p/w342/1YINof6kN5yRdePEbcU5360ejoq.jpg',
        tmdbScore: 7.1,
        blurb: 'A cursed videotape kills whoever watches it within seven days; the Japanese film that launched the J-horror wave.',
      },
      {
        title: 'The Substance',
        year: 2024,
        tmdbId: 933260,
        posterPath: 'https://image.tmdb.org/t/p/w342/lqoMzCcZYEFK729d6qzt349fB4o.jpg',
        tmdbScore: 7.1,
        blurb: 'A fading star injects a black-market drug that spawns a younger version of herself; Coralie Fargeat\'s satire of the beauty industry.',
      },
      {
        title: 'The Descent',
        year: 2005,
        tmdbId: 9392,
        posterPath: 'https://image.tmdb.org/t/p/w342/mxFPI4KYBk5ri9cPteIS8jiDFgj.jpg',
        tmdbScore: 7.0,
        blurb: 'Six women on a caving trip get lost underground and find they are not alone; a survival horror that bites well before the creatures appear.',
      },
      {
        title: 'The Host',
        year: 2006,
        tmdbId: 1255,
        posterPath: 'https://image.tmdb.org/t/p/w342/dEDLY3KeghKFzks5nTDWdigVikr.jpg',
        tmdbScore: 7.0,
        blurb: 'A river creature drags a girl into the sewers and her chaotic family sets out to get her back; Bong Joon-ho\'s Korean monster movie.',
      },
      {
        title: 'Hellraiser',
        year: 1987,
        tmdbId: 9003,
        posterPath: 'https://image.tmdb.org/t/p/w342/3Z0oPHyLnk3Vx6ZMC1MiVwIrKhO.jpg',
        tmdbScore: 6.9,
        blurb: 'A puzzle box summons beings who cannot separate pleasure from pain; Clive Barker filming his own novella.',
      },
      {
        title: 'A Girl Walks Home Alone at Night',
        year: 2014,
        tmdbId: 252171,
        posterPath: 'https://image.tmdb.org/t/p/w342/cd2rCE1nun7CESjBI8PGNEof1tb.jpg',
        tmdbScore: 6.8,
        blurb: 'A skateboarding vampire drifts through an Iranian ghost town; Ana Lily Amirpour\'s black-and-white debut, in Persian.',
      },
      {
        title: 'It Follows',
        year: 2015,
        tmdbId: 270303,
        posterPath: 'https://image.tmdb.org/t/p/w342/iwnQ1JH1wdWrGYkgWySptJ5284A.jpg',
        tmdbScore: 6.6,
        blurb: 'A curse passed on through sex takes the form of someone walking slowly toward you; David Robert Mitchell\'s suburban nightmare.',
      },
      {
        title: 'The Babadook',
        year: 2014,
        tmdbId: 242224,
        posterPath: 'https://image.tmdb.org/t/p/w342/qt3fqapeo94TfvMyld8P7gkpXLz.jpg',
        tmdbScore: 6.5,
        blurb: 'A grieving mother and her son are stalked by a figure from a pop-up book; Jennifer Kent\'s debut about grief in monster form.',
      },
      {
        title: 'Under the Shadow',
        year: 2016,
        tmdbId: 375012,
        posterPath: 'https://image.tmdb.org/t/p/w342/bsHpzc7mVbJfZBaD0EISJkm3f3H.jpg',
        tmdbScore: 6.5,
        blurb: 'A mother and daughter are haunted during the missile strikes of the Iran-Iraq war; Babak Anvari\'s horror set in 1980s Tehran, in Persian.',
      },
      {
        title: 'Saint Maud',
        year: 2020,
        tmdbId: 575776,
        posterPath: 'https://image.tmdb.org/t/p/w342/ArNYeeDFLVye7JpqLElYdbE6fOa.jpg',
        tmdbScore: 6.5,
        blurb: 'A live-in nurse becomes convinced God has charged her with saving her patient\'s soul; Rose Glass\'s debut on faith and isolation.',
      },
      {
        title: 'His House',
        year: 2020,
        tmdbId: 575774,
        posterPath: 'https://image.tmdb.org/t/p/w342/s6XxJEe4ovVTMgmGmKeO87OFANU.jpg',
        tmdbScore: 6.4,
        blurb: 'A refugee couple is housed in a crumbling English home that will not let their past rest; Remi Weekes\'s debut.',
      },
      {
        title: 'Kill List',
        year: 2011,
        tmdbId: 74725,
        posterPath: 'https://image.tmdb.org/t/p/w342/qwT2I3ons0oD58jIppKmd4qLtvB.jpg',
        tmdbScore: 6.2,
        blurb: 'A former soldier takes a contract-killing job that curdles into something far stranger; Ben Wheatley\'s genre-shifting descent.',
      },
      {
        title: 'Lake Mungo',
        year: 2009,
        tmdbId: 27374,
        posterPath: 'https://image.tmdb.org/t/p/w342/g0zCELYfBfSv8TOGC13buABVN53.jpg',
        tmdbScore: 6.1,
        blurb: 'An Australian family probes their drowned daughter\'s afterlife in a faux documentary; a patient, aching ghost story.',
      },
    ],
    appNote:
      'Turning a list like this into an October project is exactly what I Like Movies, the free iPhone and Android app behind this page, is built for: keep the ones you have not seen on your watchlist, rate each film as you go, and see where it is streaming in your country before you press play.',
    faqs: [
      {
        q: 'How is this list ranked?',
        a: [
          'By TMDB user score as of September 2026, the community rating on The Movie Database, with ties broken by release year, older first. The films are chosen editorially for a spread of eras and subgenres, then ordered by score; the numbers are printed next to each title and checkable on TMDB.',
        ],
      },
      {
        q: 'What is Hooptober?',
        a: [
          'Hooptober is an informal horror-movie challenge that runs through October: watch a set run of horror films across the month, with many people aiming for 31. There is no official rulebook, so this list works as a starting shelf whether you are going for one film a night or just a few good scares.',
        ],
      },
      {
        q: 'What is the best horror movie to watch this October?',
        a: [
          'By viewer score on this list it is Alien at 8.2, then Jaws at 7.7. If you want the older canon, Bride of Frankenstein and Dawn of the Dead sit at 7.5, and A Nightmare on Elm Street and The Fly at 7.4.',
        ],
      },
      {
        q: 'Which of these are good for someone new to horror?',
        a: [
          'The canonical older entries like Alien and Jaws, and the slow-burn films like The Babadook and It Follows, are gentler starting points than the harsher entries such as Kill List or the claustrophobia of The Descent. Check a content guide where it matters.',
        ],
      },
      {
        q: 'Where can I stream these films?',
        a: [
          'Availability changes constantly and depends on where you live, so this list makes no streaming claims. The I Like Movies app shows where each title is streaming in your own country, which is the fastest way to turn the list into a plan.',
        ],
      },
    ],
  },
  {
    slug: 'studio-ghibli-films-ranked',
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/6oaL4DP75yABrd5EbC4H2zq5ghc.jpg',
    heroPosition: 'center 30%',
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
        tmdbId: 129,
        posterPath: 'https://image.tmdb.org/t/p/w342/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
        tmdbScore: 8.5,
        blurb: 'A girl works in a bathhouse for gods to free her parents; the Academy Award winner and the highest-rated film the studio has made.',
      },
      {
        title: 'Grave of the Fireflies',
        year: 1988,
        tmdbId: 12477,
        posterPath: 'https://image.tmdb.org/t/p/w342/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg',
        tmdbScore: 8.4,
        blurb: 'Two children starve in wartime Japan. The film on this list you will only ever watch once.',
      },
      {
        title: "Howl's Moving Castle",
        year: 2004,
        tmdbId: 4935,
        posterPath: 'https://image.tmdb.org/t/p/w342/13kOl2v0nD2OLbVSHnHk8GUFEhO.jpg',
        tmdbScore: 8.4,
        blurb: 'A cursed hatmaker and a vain wizard in a walking house; the most romantic thing the studio made.',
      },
      {
        title: 'Princess Mononoke',
        year: 1997,
        tmdbId: 128,
        posterPath: 'https://image.tmdb.org/t/p/w342/cMYCDADoLKLbB83g4WnJegaZimC.jpg',
        tmdbScore: 8.3,
        blurb: "Miyazaki's hardest and angriest film, a war between industry and forest where nobody is the villain.",
      },
      {
        title: 'My Neighbor Totoro',
        year: 1988,
        tmdbId: 8392,
        posterPath: 'https://image.tmdb.org/t/p/w342/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg',
        tmdbScore: 8.1,
        blurb: 'Two sisters, a house in the country, a sick mother, and the gentlest film ever made about waiting.',
      },
      {
        title: 'The Tale of the Princess Kaguya',
        year: 2013,
        tmdbId: 149871,
        posterPath: 'https://image.tmdb.org/t/p/w342/cQidJuA546OSSXKWXoiCeINDxuj.jpg',
        tmdbScore: 8.1,
        blurb: "Takahata's folk tale drawn like moving charcoal sketches; no other Ghibli film looks like it.",
      },
      {
        title: 'Castle in the Sky',
        year: 1986,
        tmdbId: 10515,
        posterPath: 'https://image.tmdb.org/t/p/w342/41XxSsJc5OrulP0m7TrrUeO2hoz.jpg',
        tmdbScore: 8.0,
        blurb: "The studio's first official film: sky pirates, a floating city, and pure adventure-serial momentum.",
      },
      {
        title: 'Nausicaa of the Valley of the Wind',
        year: 1984,
        tmdbId: 81,
        posterPath: 'https://image.tmdb.org/t/p/w342/tcrkfB8SRPQCgwI88hQScua6nxh.jpg',
        tmdbScore: 7.9,
        blurb: "The pre-Ghibli origin: a princess in a poisoned world, and half the studio's later ideas in first draft.",
      },
      {
        title: 'Whisper of the Heart',
        year: 1995,
        tmdbId: 37797,
        posterPath: 'https://image.tmdb.org/t/p/w342/5FROLD8zpWFs9ja7aYho1uOMJHg.jpg',
        tmdbScore: 7.9,
        blurb: 'A junior-high writer chases a boy and a calling; the most down-to-earth film in the catalogue.',
      },
      {
        title: 'When Marnie Was There',
        year: 2014,
        tmdbId: 242828,
        posterPath: 'https://image.tmdb.org/t/p/w342/vug1dvDI1tSa60Z8qjCuUE7ntkO.jpg',
        tmdbScore: 7.9,
        blurb: "A lonely girl and a ghostly friendship in a seaside marsh; the studio's quietest late film.",
      },
      {
        title: "Kiki's Delivery Service",
        year: 1989,
        tmdbId: 16859,
        posterPath: 'https://image.tmdb.org/t/p/w342/Aufa4YdZIv4AXpR9rznwVA5SEfd.jpg',
        tmdbScore: 7.8,
        blurb: 'A young witch opens a delivery business and burns out; the truest film about work in the catalogue.',
      },
      {
        title: 'Porco Rosso',
        year: 1992,
        tmdbId: 11621,
        posterPath: 'https://image.tmdb.org/t/p/w342/8mIvSvnVBApfORL9N6S38Q7wD6A.jpg',
        tmdbScore: 7.8,
        blurb: "A World War I ace cursed with a pig's face flies the Adriatic; melancholy wearing a comedy's clothes.",
      },
      {
        title: 'Ponyo',
        year: 2008,
        tmdbId: 12429,
        posterPath: 'https://image.tmdb.org/t/p/w342/yp8vEZflGynlEylxEesbYasc06i.jpg',
        tmdbScore: 7.8,
        blurb: 'A goldfish decides to become a girl; pure preschool joy animated with absurd, hand-drawn extravagance.',
      },
      {
        title: 'The Wind Rises',
        year: 2013,
        tmdbId: 149870,
        posterPath: 'https://image.tmdb.org/t/p/w342/jfwSexzlIzaOgxP9A8bTA6t8YYb.jpg',
        tmdbScore: 7.8,
        blurb: 'A biography of a wartime aircraft designer, and Miyazaki arguing with himself about beauty and complicity.',
      },
      {
        title: 'Arrietty',
        year: 2010,
        tmdbId: 51739,
        posterPath: 'https://image.tmdb.org/t/p/w342/3lSRaSjDp2nkXMQkzzjpRi3035O.jpg',
        tmdbScore: 7.7,
        blurb: 'Borrowers living under the floorboards; small-scale in every sense and lovely within it.',
      },
      {
        title: 'From Up on Poppy Hill',
        year: 2011,
        tmdbId: 83389,
        posterPath: 'https://image.tmdb.org/t/p/w342/rRLYX4RZIyloHSJwvZKAhphAjiB.jpg',
        tmdbScore: 7.5,
        blurb: 'A 1963 schoolgirl romance around a condemned clubhouse; modest, warm, and better than its reputation.',
      },
      {
        title: 'Only Yesterday',
        year: 1991,
        tmdbId: 15080,
        posterPath: 'https://image.tmdb.org/t/p/w342/tOSnFE9e82iH3ZAzSTtuOkBsabJ.jpg',
        tmdbScore: 7.4,
        blurb: "A Tokyo office worker revisits her childhood on a farm trip; Takahata's adult drama, decades ahead of its time.",
      },
      {
        title: 'The Boy and the Heron',
        year: 2023,
        tmdbId: 508883,
        posterPath: 'https://image.tmdb.org/t/p/w342/f4oZTcfGrVTXKTWg157AwikXqmP.jpg',
        tmdbScore: 7.4,
        blurb: "Miyazaki's late, strange self-portrait; more haunted and less tidy than anything before it.",
      },
      {
        title: 'Pom Poko',
        year: 1994,
        tmdbId: 15283,
        posterPath: 'https://image.tmdb.org/t/p/w342/gyoJmFf24MOUc4TTu97sd0cHIQF.jpg',
        tmdbScore: 7.2,
        blurb: "Shape-shifting raccoon dogs fight suburban development; the studio's oddest film and its most direct eco-fable.",
      },
      {
        title: 'The Cat Returns',
        year: 2002,
        tmdbId: 15370,
        posterPath: 'https://image.tmdb.org/t/p/w342/pqyY7IEWkCWNZ7EuRStQaJITEta.jpg',
        tmdbScore: 7.1,
        blurb: 'A girl is abducted into a kingdom of cats; a light 75-minute lark, and knowingly so.',
      },
      {
        title: 'My Neighbors the Yamadas',
        year: 1999,
        tmdbId: 16198,
        posterPath: 'https://image.tmdb.org/t/p/w342/nj0ijnOozQtu52r0ncut769G1FX.jpg',
        tmdbScore: 7.0,
        blurb: 'A family told in comic-strip vignettes; Takahata experimenting, charming in pieces rather than as a whole.',
      },
      {
        title: 'Tales from Earthsea',
        year: 2006,
        tmdbId: 37933,
        posterPath: 'https://image.tmdb.org/t/p/w342/y0VnJt4eRPMjA1hpJ8f1EFoVaSf.jpg',
        tmdbScore: 6.5,
        blurb: "Goro Miyazaki's debut, adapting Le Guin without her blessing; handsome and hollow.",
      },
      {
        title: 'Ocean Waves',
        year: 1993,
        tmdbId: 21057,
        posterPath: 'https://image.tmdb.org/t/p/w342/fSR1LLMIJZ6WcQEkM82yKy4F9vQ.jpg',
        tmdbScore: 6.4,
        blurb: "A made-for-TV teen love triangle by the studio's younger staff; slight, but honest about adolescence.",
      },
      {
        title: 'Earwig and the Witch',
        year: 2020,
        tmdbId: 683127,
        posterPath: 'https://image.tmdb.org/t/p/w342/9oK820JieICOcfUhI6mkpFrcA9m.jpg',
        tmdbScore: 5.9,
        blurb: "The studio's first CG feature, and by some distance its lowest-rated film.",
      },
    ],
    appNote:
      'If a list like this turns into a watching project, I Like Movies, the free iPhone and Android app behind this page, is built for exactly that: keep the films you have not seen on your watchlist, rate them as you go, and see where each one is streaming in your country before you press play.',
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/9FE5eD92WfVCiivM9Pq9GVSrlWk.jpg',
    heroPosition: 'center 15%',
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
        tmdbId: 155,
        posterPath: 'https://image.tmdb.org/t/p/w342/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
        tmdbScore: 8.5,
        blurb: 'The middle Batman film and the reason superhero films get compared to crime epics; Heath Ledger\'s Joker is the pull, the ferry dilemma is the keeper.',
      },
      {
        title: 'Interstellar',
        year: 2014,
        tmdbId: 157336,
        posterPath: 'https://image.tmdb.org/t/p/w342/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg',
        tmdbScore: 8.5,
        blurb: 'A father flies through a wormhole to outrun a dying Earth; the most emotional film Nolan has made, scored by Zimmer\'s church organ.',
      },
      {
        title: 'Inception',
        year: 2010,
        tmdbId: 27205,
        posterPath: 'https://image.tmdb.org/t/p/w342/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg',
        tmdbScore: 8.4,
        blurb: 'A heist inside layered dreams, and the rare blockbuster whose structure is the spectacle.',
      },
      {
        title: 'Memento',
        year: 2000,
        tmdbId: 77,
        posterPath: 'https://image.tmdb.org/t/p/w342/nzlv62aC0octS5AklAiWpXLX9Z0.jpg',
        tmdbScore: 8.2,
        blurb: 'A man with no short-term memory hunts his wife\'s killer, told backwards; the breakthrough, still the tightest script.',
      },
      {
        title: 'The Prestige',
        year: 2006,
        tmdbId: 1124,
        posterPath: 'https://image.tmdb.org/t/p/w342/Ag2B2KHKQPukjH7WutmgnnSNurZ.jpg',
        tmdbScore: 8.2,
        blurb: 'Two rival magicians destroy themselves over one trick; the Nolan film that rewards a second watch most.',
      },
      {
        title: 'Oppenheimer',
        year: 2023,
        tmdbId: 872585,
        posterPath: 'https://image.tmdb.org/t/p/w342/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
        tmdbScore: 8.0,
        blurb: 'Three hours inside the head of the man who built the bomb; Best Picture winner and the biggest biopic ever made.',
      },
      {
        title: 'The Odyssey',
        year: 2026,
        tmdbId: 1368337,
        posterPath: 'https://image.tmdb.org/t/p/w342/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg',
        tmdbScore: 8.0,
        blurb: 'Homer\'s epic shot on IMAX film with Matt Damon as Odysseus; the newest entry, and its score is still settling.',
      },
      {
        title: 'The Dark Knight Rises',
        year: 2012,
        tmdbId: 49026,
        posterPath: 'https://image.tmdb.org/t/p/w342/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg',
        tmdbScore: 7.8,
        blurb: 'The trilogy\'s heaviest and most operatic chapter; closes the Batman story properly, which almost no trilogy manages.',
      },
      {
        title: 'Batman Begins',
        year: 2005,
        tmdbId: 272,
        posterPath: 'https://image.tmdb.org/t/p/w342/sPX89Td70IDDjVr85jdSBb4rWGr.jpg',
        tmdbScore: 7.7,
        blurb: 'The film that rebuilt Batman as crime drama; the origin story later films are still measured against.',
      },
      {
        title: 'Dunkirk',
        year: 2017,
        tmdbId: 374720,
        posterPath: 'https://image.tmdb.org/t/p/w342/b4Oe15CGLL61Ped0RAS9JpqdmCt.jpg',
        tmdbScore: 7.4,
        blurb: 'The evacuation told on three interlocking clocks: an hour, a day, a week; war as pure suspense engineering, almost wordless.',
      },
      {
        title: 'Tenet',
        year: 2020,
        tmdbId: 577922,
        posterPath: 'https://image.tmdb.org/t/p/w342/aCIFMriQh8rvhxpN1IWGgvH0Tlg.jpg',
        tmdbScore: 7.2,
        blurb: 'Espionage with time flowing both ways; the most demanding watch here, and it knows it.',
      },
      {
        title: 'Following',
        year: 1998,
        tmdbId: 11660,
        posterPath: 'https://image.tmdb.org/t/p/w342/3bX6VVSMf0dvzk5pMT4ALG5A92d.jpg',
        tmdbScore: 7.1,
        blurb: 'A no-budget black-and-white debut about a writer who follows strangers; 69 minutes, and the obsessions are already all there.',
      },
      {
        title: 'Insomnia',
        year: 2002,
        tmdbId: 320,
        posterPath: 'https://image.tmdb.org/t/p/w342/riVXh3EimGO0y5dgQxEWPRy5Itg.jpg',
        tmdbScore: 7.0,
        blurb: 'A sleepless detective unravels under the midnight sun; the only Nolan film from someone else\'s script, and Pacino\'s last great lead.',
      },
    ],
    appNote:
      'Working through a filmography is exactly what I Like Movies, the free iPhone and Android app behind this page, is for: put the ones you have not seen on your watchlist, rate as you go, and see where each film streams in your country before you press play.',
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
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/qqHQsStV6exghCM7zbObuYBiYxw.jpg',
    heroPosition: 'center 20%',
    title: 'Great films under 100 minutes for a tired weeknight',
    metaDescription:
      'Twenty-one genuinely great films under 100 minutes, ranked by TMDB user score, from 12 Angry Men to Paddington, with the runtime printed next to every one.',
    h1: 'Great films under 100 minutes, ranked',
    intro: [
      'The tired-weeknight problem: it is 21:30, a three-hour epic is off the table, and everything short in the menus looks disposable. This list is the counter-evidence: twenty-one films under 100 minutes, every runtime checked against TMDB, ranked by TMDB user score as of August 2026, ties broken by release year, older first.',
      'This one is a curated shortlist rather than a complete catalogue of anything, so the selection is the editorial act: a spread of moods from courtroom drama to zombie comedy, each one genuinely finishable before midnight. The buttons above the list re-sort it by date if you prefer.',
    ],
    ranked: true,
    listHeading: 'The list',
    items: [
      {
        title: '12 Angry Men',
        year: 1957,
        tmdbId: 389,
        posterPath: 'https://image.tmdb.org/t/p/w342/zhG3vKWyDRaZYoaww1UVAi29T9h.jpg',
        tmdbScore: 8.6,
        runtimeMin: 97,
        blurb: 'One jury room, one holdout, ninety-seven minutes; still the model for how much cinema fits in one room.',
      },
      {
        title: 'Modern Times',
        year: 1936,
        tmdbId: 3082,
        posterPath: 'https://image.tmdb.org/t/p/w342/AthaPakkuCLROdKxtRbKWclkDBK.jpg',
        tmdbScore: 8.3,
        runtimeMin: 87,
        blurb: 'A factory worker cracks under the machine age and drifts through the Depression with a homeless young woman; Chaplin\'s last outing as the Tramp, and his last silent film.',
      },
      {
        title: 'My Neighbor Totoro',
        year: 1988,
        tmdbId: 8392,
        posterPath: 'https://image.tmdb.org/t/p/w342/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg',
        tmdbScore: 8.1,
        runtimeMin: 86,
        blurb: 'Two sisters and a forest spirit; the gentlest possible landing for a frayed evening.',
      },
      {
        title: 'La Haine',
        year: 1995,
        tmdbId: 406,
        posterPath: 'https://image.tmdb.org/t/p/w342/hY4exng4s29RzDbtQInjx9MA3PZ.jpg',
        tmdbScore: 8.1,
        runtimeMin: 98,
        blurb: 'Twenty-four hours in the Paris banlieues after a riot; furious, funny, and shot in timeless black and white.',
      },
      {
        title: 'WALL-E',
        year: 2008,
        tmdbId: 10681,
        posterPath: 'https://image.tmdb.org/t/p/w342/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg',
        tmdbScore: 8.1,
        runtimeMin: 98,
        blurb: 'A lone waste-compacting robot left to tidy an abandoned Earth falls for a sleek visiting probe and follows her across the galaxy; Pixar\'s near-wordless first act is its boldest.',
      },
      {
        title: 'Rashomon',
        year: 1950,
        tmdbId: 548,
        posterPath: 'https://image.tmdb.org/t/p/w342/ijWibsAU1iBcCD8tuIZfTmDzMVE.jpg',
        tmdbScore: 8.0,
        runtimeMin: 88,
        blurb: 'One crime, four contradictory tellings; the film that gave unreliable narration its name.',
      },
      {
        title: 'Toy Story',
        year: 1995,
        tmdbId: 862,
        posterPath: 'https://image.tmdb.org/t/p/w342/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg',
        tmdbScore: 8.0,
        runtimeMin: 81,
        blurb: 'The first all-CG feature and still one of the tightest scripts in animation.',
      },
      {
        title: 'The Iron Giant',
        year: 1999,
        tmdbId: 10386,
        posterPath: 'https://image.tmdb.org/t/p/w342/k1Cv5CHJvqGWK1xJDUJz8DojFEy.jpg',
        tmdbScore: 8.0,
        runtimeMin: 86,
        blurb: 'A boy hides a giant robot from the Cold War; Brad Bird\'s debut, and a guaranteed lump in the throat.',
      },
      {
        title: 'Persepolis',
        year: 2007,
        tmdbId: 2011,
        posterPath: 'https://image.tmdb.org/t/p/w342/aU8i2QAdTyRR1nYb36Gq51xXP8p.jpg',
        tmdbScore: 7.9,
        runtimeMin: 95,
        blurb: 'Growing up through the Iranian revolution, drawn in stark animated ink; a memoir that moves like a thriller.',
      },
      {
        title: 'Stand by Me',
        year: 1986,
        tmdbId: 235,
        posterPath: 'https://image.tmdb.org/t/p/w342/vz0w9BSehcqjDcJOjRaCk7fgJe7.jpg',
        tmdbScore: 7.8,
        runtimeMin: 89,
        blurb: 'Four boys walk the train tracks to find a body; the definitive film about being twelve.',
      },
      {
        title: 'Before Sunset',
        year: 2004,
        tmdbId: 80,
        posterPath: 'https://image.tmdb.org/t/p/w342/4sW5XH9ZfYXpvFzev00S1IGAEbg.jpg',
        tmdbScore: 7.8,
        runtimeMin: 80,
        blurb: 'Two people talk through Paris in real time, nine years after their one night; eighty minutes, perfect ending.',
      },
      {
        title: 'Fantastic Mr. Fox',
        year: 2009,
        tmdbId: 10315,
        posterPath: 'https://image.tmdb.org/t/p/w342/bOVr292mwn3jxr1e0NmUPM1rcjo.jpg',
        tmdbScore: 7.8,
        runtimeMin: 87,
        blurb: 'Wes Anderson does Roald Dahl in stop motion; dry, handsome, and over before the kettle cools.',
      },
      {
        title: 'One Cut of the Dead',
        year: 2017,
        tmdbId: 513434,
        posterPath: 'https://image.tmdb.org/t/p/w342/rws34k2bqYVo2B5MkhKAbV8925j.jpg',
        tmdbScore: 7.6,
        runtimeMin: 96,
        blurb: 'A zombie film that appears terrible for half an hour and then becomes the most joyful film about filmmaking in years; go in blind.',
      },
      {
        title: 'Shaun of the Dead',
        year: 2004,
        tmdbId: 747,
        posterPath: 'https://image.tmdb.org/t/p/w342/dgXPhzNJH8HFTBjXPB177yNx6RI.jpg',
        tmdbScore: 7.5,
        runtimeMin: 99,
        blurb: 'A slacker fights the apocalypse with a cricket bat; the romzomcom that made Edgar Wright\'s name.',
      },
      {
        title: 'What We Do in the Shadows',
        year: 2014,
        tmdbId: 246741,
        posterPath: 'https://image.tmdb.org/t/p/w342/a2rD3i3DBMeYbA34rBv6z3B9S3a.jpg',
        tmdbScore: 7.5,
        runtimeMin: 86,
        blurb: 'A documentary crew follows vampire flatmates in Wellington; the highest joke-per-minute rate on this list.',
      },
      {
        title: 'This Is Spinal Tap',
        year: 1984,
        tmdbId: 11031,
        posterPath: 'https://image.tmdb.org/t/p/w342/b3lllDltoBws5uKZzBYVSjpjjJx.jpg',
        tmdbScore: 7.4,
        runtimeMin: 82,
        blurb: 'The fake rock documentary every real one now gets compared to; these go to eleven.',
      },
      {
        title: 'Airplane!',
        year: 1980,
        tmdbId: 813,
        posterPath: 'https://image.tmdb.org/t/p/w342/7Q3efxd3AF1vQjlSxnlerSA7RzN.jpg',
        tmdbScore: 7.3,
        runtimeMin: 88,
        blurb: 'A gag every ten seconds for eighty-eight minutes; surely the densest comedy ever made, and stop calling me Shirley.',
      },
      {
        title: 'Run Lola Run',
        year: 1998,
        tmdbId: 104,
        posterPath: 'https://image.tmdb.org/t/p/w342/v0giIi4bTILVhNhJajet3WWY3FA.jpg',
        tmdbScore: 7.3,
        runtimeMin: 80,
        blurb: 'Lola has twenty minutes to find 100,000 marks, told three times; pure kinetic energy at eighty minutes.',
      },
      {
        title: 'Frances Ha',
        year: 2013,
        tmdbId: 121986,
        posterPath: 'https://image.tmdb.org/t/p/w342/jrq1NoKvsxWCcffVOjegiYwloFN.jpg',
        tmdbScore: 7.3,
        runtimeMin: 86,
        blurb: 'A dancer in New York fails upward with style; Greta Gerwig\'s calling card, light on plot and full of life.',
      },
      {
        title: 'Coherence',
        year: 2014,
        tmdbId: 220289,
        posterPath: 'https://image.tmdb.org/t/p/w342/ezUtb9m5DeLwL2gxi4gktzNCvQv.jpg',
        tmdbScore: 7.2,
        runtimeMin: 89,
        blurb: 'A dinner party fractures as a comet passes; micro-budget sci-fi that runs entirely on ideas.',
      },
      {
        title: 'Paddington',
        year: 2014,
        tmdbId: 116149,
        posterPath: 'https://image.tmdb.org/t/p/w342/wpchRGhRhvhtU083PfX2yixXtiw.jpg',
        tmdbScore: 7.1,
        runtimeMin: 95,
        blurb: 'A polite bear looks for a home in London; the safest possible pick for any mixed room.',
      },
    ],
    appNote:
      'Nights like this are what the watchlist in I Like Movies, the free iPhone and Android app behind this page, is for: save the ones that appeal now, and when the tired evening arrives the shortlist is already made, with streaming availability for your country shown per title.',
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
  {
    slug: 'best-dutch-films',
    heroBackdrop: 'https://image.tmdb.org/t/p/w1280/gcXbxHjkUwLV4HrE2oJcbP7UGTA.jpg',
    heroPosition: 'center 45%',
    title: 'The best Dutch films to watch, ranked by viewer score',
    metaDescription:
      'Fifteen notable Dutch films ranked by TMDB user score, from The Vanishing and Black Book at 7.4 down to Riphagen at 6.5, each with one plain sentence on what it is.',
    h1: 'The best Dutch films, ranked',
    intro: [
      "This list ranks 15 notable Dutch films by their TMDB user score, the community rating on The Movie Database, as of September 2026. TMDB is the same database the I Like Movies app runs on, every score is checkable on a film's TMDB page, and ties are broken by release year, older first. Treat a 0.1 gap as a coin flip and anything wider as a real signal. TMDB scores run a little below IMDb, so read them against each other, not against IMDb.",
      'Dutch cinema is small and travels less than it should, so this is a curated cross-section of the films that did travel: three winners of the Academy Award for Best Foreign Language Film, the Dutch period of Paul Verhoeven before he left for Hollywood, and the wartime dramas the country keeps returning to. It is a starting shelf rather than a full history. The buttons above the list re-sort it by date if you would rather browse chronologically.',
    ],
    ranked: true,
    listHeading: 'The ranking',
    items: [
      {
        title: 'The Vanishing',
        year: 1988,
        tmdbId: 8740,
        posterPath: 'https://image.tmdb.org/t/p/w342/eE5bbuRJluooG2MjEAsLEYyuJoa.jpg',
        tmdbScore: 7.4,
        blurb: "A man whose girlfriend vanished at a motorway rest stop accepts a meeting with her abductor to find out what happened; George Sluizer's original, made before his own Hollywood remake.",
      },
      {
        title: 'Simon',
        year: 2004,
        tmdbId: 33440,
        posterPath: 'https://image.tmdb.org/t/p/w342/3zRr8prAWZ0mp2nBLrnd8IlB0Bl.jpg',
        tmdbScore: 7.4,
        blurb: "A gay dentist recalls his long friendship with Simon, a straight, terminally ill soft-drug dealer; Eddy Terstall's warm, matter-of-fact Amsterdam drama.",
      },
      {
        title: 'Black Book',
        year: 2006,
        tmdbId: 9075,
        posterPath: 'https://image.tmdb.org/t/p/w342/vZaYDWa3IqTNKsHCsUr72J4zTJ6.jpg',
        tmdbScore: 7.4,
        blurb: "A Jewish singer infiltrates the regional Gestapo for the resistance in the last months of the war; Paul Verhoeven's return to the Netherlands after two decades in Hollywood.",
      },
      {
        title: 'Character',
        year: 1997,
        tmdbId: 17139,
        posterPath: 'https://image.tmdb.org/t/p/w342/v7TWGTZ6fNkY72IyoiVIcnlwniU.jpg',
        tmdbScore: 7.3,
        blurb: "A young lawyer is questioned over the death of the ruthless bailiff who was his estranged father; Mike van Diem's period drama, winner of the Academy Award for Best Foreign Language Film.",
      },
      {
        title: 'Soldier of Orange',
        year: 1977,
        tmdbId: 633,
        posterPath: 'https://image.tmdb.org/t/p/w342/kdlk0cz97i8Fyb1ZFpp9tokHxGD.jpg',
        tmdbScore: 7.1,
        blurb: "Dutch students take diverging paths through the occupation, from resistance to collaboration; Verhoeven's breakthrough, drawn from Erik Hazelhoff Roelfzema's wartime memoir.",
      },
      {
        title: 'Suskind',
        year: 2012,
        tmdbId: 84057,
        posterPath: 'https://image.tmdb.org/t/p/w342/gUTHRtIkXpRbQb6dCVCGnd81I5g.jpg',
        tmdbScore: 7.0,
        blurb: "A Jewish administrator running Amsterdam's deportation theatre smuggles children to safety while trying to shield his own family; a wartime drama based on the real Walter Suskind.",
      },
      {
        title: 'The Northerners',
        year: 1992,
        tmdbId: 5899,
        posterPath: 'https://image.tmdb.org/t/p/w342/urIKSwOoTez21y0kIkRRu0oSrgJ.jpg',
        tmdbScore: 6.9,
        blurb: "Life curdles among the residents of a single unfinished street on the edge of a forest in 1960; Alex van Warmerdam's deadpan comedy of Dutch suburbia.",
      },
      {
        title: "Antonia's Line",
        year: 1995,
        tmdbId: 880,
        posterPath: 'https://image.tmdb.org/t/p/w342/nUCVi6bBIL7LGC61nYaCqikAhIA.jpg',
        tmdbScore: 6.9,
        blurb: "A matriarch returns to her village after the war and raises four generations of women on her own terms; Marleen Gorris's film, winner of the Academy Award for Best Foreign Language Film.",
      },
      {
        title: 'Turkish Delight',
        year: 1973,
        tmdbId: 21035,
        posterPath: 'https://image.tmdb.org/t/p/w342/eqnlXShKgQbF3prxU6XYrC53z6F.jpg',
        tmdbScore: 6.8,
        blurb: "A sculptor looks back on his consuming, doomed affair with a free-spirited young woman; Verhoeven's explicit early hit, once voted the best Dutch film of the century.",
      },
      {
        title: 'The Assault',
        year: 1986,
        tmdbId: 2753,
        posterPath: 'https://image.tmdb.org/t/p/w342/wvklfVmpr4i5BexkvytKtpfu7DM.jpg',
        tmdbScore: 6.8,
        blurb: "A man spends forty years trying to understand the wartime night a collaborator was shot outside his family's house and the Germans razed it; Fons Rademakers's film, winner of the Academy Award for Best Foreign Language Film.",
      },
      {
        title: 'The Fourth Man',
        year: 1983,
        tmdbId: 29140,
        posterPath: 'https://image.tmdb.org/t/p/w342/iO7pYvGHcxekOqmQKsY4qeSygAi.jpg',
        tmdbScore: 6.7,
        blurb: "A bisexual writer suspects the glamorous woman he has taken up with has already buried three husbands; Verhoeven's Hitchcockian thriller of premonition and desire.",
      },
      {
        title: 'Winter in Wartime',
        year: 2008,
        tmdbId: 16564,
        posterPath: 'https://image.tmdb.org/t/p/w342/xwPAQjLoIqqAAGRZ5ke5j7OpKSH.jpg',
        tmdbScore: 6.7,
        blurb: "A boy in the occupied countryside hides a wounded British airman and learns how little he understands the adults around him; Martin Koolhoven's coming-of-age war film.",
      },
      {
        title: 'The Resistance Banker',
        year: 2018,
        tmdbId: 497916,
        posterPath: 'https://image.tmdb.org/t/p/w342/sqAJF2muVamUQfmGmrRK9w8s1KS.jpg',
        tmdbScore: 6.7,
        blurb: "Two brothers secretly bankroll the Dutch resistance by running a fraudulent bank under the occupation's nose; Joram Lursen's fact-based wartime thriller.",
      },
      {
        title: 'Borgman',
        year: 2013,
        tmdbId: 186929,
        posterPath: 'https://image.tmdb.org/t/p/w342/kasPhXDk4BI4FUS3ku5Y4GrgBJY.jpg',
        tmdbScore: 6.5,
        blurb: "A vagrant talks his way into a wealthy family's home and quietly dismantles their lives; Alex van Warmerdam's unexplained home-invasion parable, in competition at Cannes.",
      },
      {
        title: 'Riphagen',
        year: 2016,
        tmdbId: 400387,
        posterPath: 'https://image.tmdb.org/t/p/w342/u8OWkOvW6p31QsmQ4j32ZphPL24.jpg',
        tmdbScore: 6.5,
        blurb: 'A Dutch con man poses as a resistance ally to rob and betray the Jews he claims to be hiding; a fact-based occupation thriller built around one real collaborator.',
      },
    ],
    appNote:
      'The I Like Movies app is where a list like this becomes a plan: add any of these to a watchlist, mark the ones you have already seen, and rate them on a five star scale so the app learns which corner of Dutch cinema is yours. It shows where each title is streaming in your own country, and it tracks films and series in one place.',
    faqs: [
      {
        q: 'How is this list ranked?',
        a: [
          "By TMDB user score as of September 2026, the community rating on The Movie Database, with ties broken by release year, older first. The films are chosen editorially for a spread of eras and directors, then ordered by score, and every number is checkable on the film's TMDB page. Dutch films collect far fewer votes than Hollywood ones, so treat close scores as roughly equal.",
        ],
      },
      {
        q: 'What is the best Dutch film?',
        a: [
          "By viewer score on this list three titles sit together at the top on 7.4: The Vanishing, Simon and Black Book. Three other entries won the Academy Award for Best Foreign Language Film: Character, Antonia's Line and The Assault. Which is best depends on what you want from an evening.",
        ],
      },
      {
        q: 'Where should someone start with Dutch cinema?',
        a: [
          'The Vanishing for a quiet dread thriller, Black Book for a wartime epic, and Turkish Delight or Soldier of Orange for Paul Verhoeven before he left for Hollywood. Borgman is the way into the stranger, arthouse side.',
        ],
      },
      {
        q: 'Are these films in Dutch?',
        a: [
          'Most are in Dutch, with a few partly in German or English where the story crosses a border. Subtitle availability depends on where you watch, so this list makes no subtitle or streaming claims.',
        ],
      },
      {
        q: 'Where can I stream these films?',
        a: [
          'Availability changes constantly and depends on where you live, so this list makes no streaming claims. The I Like Movies app shows where each title is streaming in your own country, which is the fastest way to turn the list into a plan.',
        ],
      },
    ],
  },
];
