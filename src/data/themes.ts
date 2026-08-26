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
};

export type WeeklyTheme = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  /** ISO date of the Friday the theme went live in the app. */
  weekOf: string;
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
    intro: [
      'Auteur theory was never about gender, and these directors proved it: Chantal Akerman making three hours of housework the most radical film of its decade, Varda wandering with her camera, Campion\'s pianos, Ramsay filming grief like a wound that will not close. In 2022, Sight and Sound\'s critics\' poll crowned Jeanne Dielman the greatest film ever made.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of August 21, 2026, featuring The Piano. It carries two films each from Campion, Ramsay and Bigelow, who was the only woman to win the Best Director Oscar until Chloé Zhao in 2021.',
    ],
    items: [
      { title: 'The Piano', year: 1993, director: 'Campion' },
      { title: 'The Power of the Dog', year: 2021, director: 'Campion' },
      { title: 'Jeanne Dielman, 23, quai du Commerce, 1080 Bruxelles', year: 1975, director: 'Akerman' },
      { title: 'Vagabond', year: 1985, director: 'Varda' },
      { title: 'We Need to Talk About Kevin', year: 2011, director: 'Ramsay' },
      { title: 'You Were Never Really Here', year: 2017, director: 'Ramsay' },
      { title: 'The Hurt Locker', year: 2008, director: 'Bigelow' },
      { title: 'Zero Dark Thirty', year: 2012, director: 'Bigelow' },
      { title: 'Lost in Translation', year: 2003, director: 'Sofia Coppola' },
      { title: 'Lady Bird', year: 2017, director: 'Gerwig' },
      { title: 'Beau Travail', year: 1999, director: 'Denis' },
      { title: 'Toni Erdmann', year: 2016, director: 'Ade' },
      { title: 'Fish Tank', year: 2009, director: 'Arnold' },
      { title: 'Daughters of the Dust', year: 1991, director: 'Dash' },
      { title: 'Salaam Bombay!', year: 1988, director: 'Nair' },
      { title: 'Wendy and Lucy', year: 2008, director: 'Reichardt' },
      { title: 'Orlando', year: 1992, director: 'Potter' },
      { title: 'Seven Beauties', year: 1975, director: 'Wertmüller' },
      { title: "Boys Don't Cry", year: 1999, director: 'Peirce' },
      { title: 'La Ciénaga', year: 2001, director: 'Martel' },
      { title: 'Selma', year: 2014, director: 'DuVernay' },
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
    intro: [
      "Before streaming turned true crime into wallpaper, the eighties turned real cases into cinema: Michael Mann's FBI profiler lit in neon, Lumet's police corruption epics, a Berlin station kid shooting up in Christiane F., Brazil's street children in Pixote, cast from the streets and returned to them.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of August 14, 2026, featuring Manhunter, the first Hannibal Lecktor film and the stylistic blueprint for two decades of serial-killer cinema.',
    ],
    items: [
      { title: 'Manhunter', year: 1986, director: 'Mann' },
      { title: 'Henry: Portrait of a Serial Killer', year: 1986, director: 'McNaughton' },
      { title: 'At Close Range', year: 1986, director: 'Foley' },
      { title: "River's Edge", year: 1986, director: 'Hunter' },
      { title: 'Sid and Nancy', year: 1986, director: 'Cox' },
      { title: 'Mississippi Burning', year: 1988, director: 'Parker' },
      { title: 'The Accused', year: 1988, director: 'Kaplan' },
      { title: 'To Live and Die in L.A.', year: 1985, director: 'Friedkin' },
      { title: 'Prince of the City', year: 1981, director: 'Lumet' },
      { title: 'The Falcon and the Snowman', year: 1985, director: 'Schlesinger' },
      { title: 'Salvador', year: 1986, director: 'Stone' },
      { title: 'Cry Freedom', year: 1987, director: 'Attenborough' },
      { title: 'Christiane F.', year: 1981, director: 'Edel' },
      { title: 'The Killing Fields', year: 1984, director: 'Joffé' },
      { title: 'Star 80', year: 1983, director: 'Fosse' },
      { title: 'Dance with a Stranger', year: 1985, director: 'Newell' },
      { title: 'Marianne and Juliane', year: 1981, director: 'von Trotta' },
      { title: 'Pixote', year: 1981, director: 'Babenco' },
      { title: 'A Cry in the Dark', year: 1988, director: 'Schepisi' },
      { title: 'Buster', year: 1988, director: 'Green' },
      { title: 'Prick Up Your Ears', year: 1987, director: 'Frears' },
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
    intro: [
      "Half of world cinema's grammar was written in Japan: Kurosawa's weather and motion, Ozu's still rooms and family seasons, Mizoguchi's ghosts gliding through long takes. Then come the inheritors, Kore-eda's makeshift families, Hamaguchi's conversations, and the anime masters Kon and Otomo.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of August 7, 2026, featuring Seven Samurai. It pairs each master's peaks where the two-per-director cap allows and makes room for the disreputable geniuses: Suzuki's hitman pop art, Kitano's deadpan gangsters, Imamura's pigs.",
    ],
    items: [
      { title: 'Seven Samurai', year: 1954, director: 'Kurosawa' },
      { title: 'Rashomon', year: 1950, director: 'Kurosawa' },
      { title: 'Tokyo Story', year: 1953, director: 'Ozu' },
      { title: 'Late Spring', year: 1949, director: 'Ozu' },
      { title: 'Ugetsu', year: 1953, director: 'Mizoguchi' },
      { title: 'Sansho the Bailiff', year: 1954, director: 'Mizoguchi' },
      { title: 'Harakiri', year: 1962, director: 'Kobayashi' },
      { title: 'Woman in the Dunes', year: 1964, director: 'Teshigahara' },
      { title: 'Floating Clouds', year: 1955, director: 'Naruse' },
      { title: 'The Burmese Harp', year: 1956, director: 'Ichikawa' },
      { title: 'In the Realm of the Senses', year: 1976, director: 'Oshima' },
      { title: 'Spirited Away', year: 2001, director: 'Miyazaki' },
      { title: 'Shoplifters', year: 2018, director: 'Kore-eda' },
      { title: 'Drive My Car', year: 2021, director: 'Hamaguchi' },
      { title: 'Onibaba', year: 1964, director: 'Shindô' },
      { title: 'Branded to Kill', year: 1967, director: 'Suzuki' },
      { title: 'Sonatine', year: 1993, director: 'Kitano' },
      { title: 'Perfect Blue', year: 1997, director: 'Kon' },
      { title: 'Akira', year: 1988, director: 'Otomo' },
      { title: 'Pigs and Battleships', year: 1961, director: 'Imamura' },
      { title: 'Tampopo', year: 1985, director: 'Itami' },
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
    intro: [
      'Non-fiction cinema has its own canon: Wiseman walking his camera into American institutions, Chris Marker writing essays in images, the Maysles brothers finding Beckett in a Long Island mansion, Joshua Oppenheimer asking killers to re-stage their crimes for the camera.',
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 31, 2026, featuring Hoop Dreams, five years in the lives of two Chicago basketball hopefuls and still the bar for longitudinal documentary. Vertov's Man with a Movie Camera, from 1929, is the oldest film in any of these weekly collections.",
    ],
    items: [
      { title: 'Hoop Dreams', year: 1994, director: 'James' },
      { title: 'The Act of Killing', year: 2012, director: 'Oppenheimer' },
      { title: 'The Look of Silence', year: 2014, director: 'Oppenheimer' },
      { title: 'Sans Soleil', year: 1983, director: 'Marker' },
      { title: 'Grey Gardens', year: 1975, director: 'Maysles' },
      { title: 'Salesman', year: 1968, director: 'Maysles' },
      { title: 'Titicut Follies', year: 1967, director: 'Wiseman' },
      { title: 'High School', year: 1968, director: 'Wiseman' },
      { title: 'Shoah', year: 1985, director: 'Lanzmann' },
      { title: 'The Sorrow and the Pity', year: 1969, director: 'Ophüls' },
      { title: 'The Thin Blue Line', year: 1988, director: 'Morris' },
      { title: 'F for Fake', year: 1973, director: 'Welles' },
      { title: 'Stop Making Sense', year: 1984, director: 'Demme' },
      { title: 'Man with a Movie Camera', year: 1929, director: 'Vertov' },
      { title: "Hearts of Darkness: A Filmmaker's Apocalypse", year: 1991, director: 'Bahr & Hickenlooper' },
      { title: 'Crumb', year: 1994, director: 'Zwigoff' },
      { title: 'Faces Places', year: 2017, director: 'Varda & JR' },
      { title: 'Searching for Sugar Man', year: 2012, director: 'Bendjelloul' },
      { title: "Don't Look Back", year: 1967, director: 'Pennebaker' },
      { title: 'Capturing the Friedmans', year: 2003, director: 'Jarecki' },
      { title: 'Hearts and Minds', year: 1974, director: 'Davis' },
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
    intro: [
      'Cinema has a subgenre nobody names: the heatwave film, where the temperature climbs until people crack. Spike Lee turned the hottest day in Bed-Stuy into American cinema\'s great pressure cooker; Australia contributed an outback nightmare; the French contributed a swimming pool.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 24, 2026, at peak summer, featuring Do the Right Thing. Noir (Body Heat, Chinatown), war (Apocalypse Now) and slow-burn Korean menace (Burning) all sweat together here.',
    ],
    items: [
      { title: 'Do the Right Thing', year: 1989, director: 'Spike Lee' },
      { title: 'Apocalypse Now', year: 1979, director: 'Coppola' },
      { title: 'Dog Day Afternoon', year: 1975, director: 'Lumet' },
      { title: 'Chinatown', year: 1974, director: 'Polanski' },
      { title: 'Body Heat', year: 1981, director: 'Kasdan' },
      { title: 'Lawrence of Arabia', year: 1962, director: 'Lean' },
      { title: 'The Wages of Fear', year: 1953, director: 'Clouzot' },
      { title: 'In the Heat of the Night', year: 1967, director: 'Jewison' },
      { title: 'La piscine', year: 1969, director: 'Deray' },
      { title: 'Y tu mamá también', year: 2001, director: 'Cuarón' },
      { title: 'Burning', year: 2018, director: 'Lee Chang-dong' },
      { title: 'A Bigger Splash', year: 2015, director: 'Guadagnino' },
      { title: 'The Talented Mr. Ripley', year: 1999, director: 'Minghella' },
      { title: 'Spring Breakers', year: 2012, director: 'Korine' },
      { title: 'Wake in Fright', year: 1971, director: 'Kotcheff' },
      { title: 'The Swimmer', year: 1968, director: 'Perry' },
      { title: 'Sexy Beast', year: 2000, director: 'Glazer' },
      { title: 'Stranger by the Lake', year: 2013, director: 'Guiraudie' },
      { title: "L'Avventura", year: 1960, director: 'Antonioni' },
      { title: 'Stromboli', year: 1950, director: 'Rossellini' },
      { title: 'Killer of Sheep', year: 1978, director: 'Burnett' },
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
    intro: [
      "Some directors film landscapes as backdrops; these film them as protagonists. Malick's prairies at magic hour, Herzog dragging a real steamship over a hill because the jungle demanded it, Reichardt's Oregon rivers, the Macedonian mountains where one woman keeps wild bees.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 17, 2026, featuring The Tree of Life. Documentary and fiction mix freely: Honeyland and Free Solo sit beside the forest gods of Princess Mononoke and Kurosawa\'s Siberian taiga.',
    ],
    items: [
      { title: 'The Tree of Life', year: 2011, director: 'Malick' },
      { title: 'Days of Heaven', year: 1978, director: 'Malick' },
      { title: 'First Cow', year: 2019, director: 'Reichardt' },
      { title: 'Embrace of the Serpent', year: 2015, director: 'Guerra' },
      { title: 'Aguirre, the Wrath of God', year: 1972, director: 'Herzog' },
      { title: 'Fitzcarraldo', year: 1982, director: 'Herzog' },
      { title: 'Walkabout', year: 1971, director: 'Roeg' },
      { title: 'Picnic at Hanging Rock', year: 1975, director: 'Weir' },
      { title: 'The Revenant', year: 2015, director: 'Iñárritu' },
      { title: 'Into the Wild', year: 2007, director: 'Penn' },
      { title: 'Dersu Uzala', year: 1975, director: 'Kurosawa' },
      { title: 'Princess Mononoke', year: 1997, director: 'Miyazaki' },
      { title: 'Spring, Summer, Fall, Winter… and Spring', year: 2003, director: 'Kim Ki-duk' },
      { title: 'Honeyland', year: 2019, director: 'Stefanov & Kotevska' },
      { title: 'Close to Eden / Urga', year: 1991, director: 'Mikhalkov' },
      { title: 'Tulpan', year: 2008, director: 'Dvortsevoy' },
      { title: 'The Story of the Weeping Camel', year: 2003, director: 'Davaa & Falorni' },
      { title: 'Microcosmos', year: 1996, director: 'Nuridsany & Pérennou' },
      { title: 'Free Solo', year: 2018, director: 'Chin & Vasarhelyi' },
      { title: "Meek's Cutoff", year: 2010, director: 'Reichardt' },
      { title: 'The Bear', year: 1988, director: 'Annaud' },
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
    intro: [
      "In 1960s Paris, Godard, Truffaut and Varda ripped the camera off the dolly and ran into the street, and world cinema never recovered. Around the New Wave proper stood giants who were never quite in it: Bresson's asceticism, Tati's choreographed modernity, Demy's candy-colored heartbreak.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 10, 2026, around Bastille Day, featuring Breathless. Two films each from Godard, Truffaut, Varda, Resnais, Demy, Bresson and Chabrol map the decade\'s range.',
    ],
    items: [
      { title: 'Breathless', year: 1960, director: 'Godard' },
      { title: 'Pierrot le Fou', year: 1965, director: 'Godard' },
      { title: 'Jules and Jim', year: 1962, director: 'Truffaut' },
      { title: 'Shoot the Piano Player', year: 1960, director: 'Truffaut' },
      { title: 'Cléo from 5 to 7', year: 1962, director: 'Varda' },
      { title: 'Le Bonheur', year: 1965, director: 'Varda' },
      { title: 'Last Year at Marienbad', year: 1961, director: 'Resnais' },
      { title: 'Hiroshima mon amour', year: 1959, director: 'Resnais' },
      { title: 'The Umbrellas of Cherbourg', year: 1964, director: 'Demy' },
      { title: 'The Young Girls of Rochefort', year: 1967, director: 'Demy' },
      { title: 'Au Hasard Balthazar', year: 1966, director: 'Bresson' },
      { title: 'Belle de Jour', year: 1967, director: 'Buñuel' },
      { title: "My Night at Maud's", year: 1969, director: 'Rohmer' },
      { title: 'Playtime', year: 1967, director: 'Tati' },
      { title: 'Mouchette', year: 1967, director: 'Bresson' },
      { title: 'Z', year: 1969, director: 'Costa-Gavras' },
      { title: 'Les Bonnes Femmes', year: 1960, director: 'Chabrol' },
      { title: 'Les Biches', year: 1968, director: 'Chabrol' },
      { title: 'Le Feu Follet', year: 1963, director: 'Malle' },
      { title: 'The Suitor', year: 1962, director: 'Étaix' },
      { title: 'A Man and a Woman', year: 1966, director: 'Lelouch' },
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
    intro: [
      "Time travel is the genre where cinema invents its own physics: paradoxes, butterfly effects, second chances. It fits every budget, with Zemeckis's DeLorean and Nolan's wormholes at one end and Shane Carruth's garage experiment, famously made for around seven thousand dollars, at the other.",
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of July 3, 2026, featuring Back to the Future. Anime carries two of the best entries (Your Name, The Girl Who Leapt Through Time), and Hi, Mom, a Chinese box-office phenomenon, is the deep cut most Western viewers miss.',
    ],
    items: [
      { title: 'Back to the Future', year: 1985, director: 'Zemeckis' },
      { title: 'The Terminator', year: 1984, director: 'Cameron' },
      { title: 'Terminator 2: Judgment Day', year: 1991, director: 'Cameron' },
      { title: '12 Monkeys', year: 1995, director: 'Gilliam' },
      { title: 'Primer', year: 2004, director: 'Carruth' },
      { title: 'Donnie Darko', year: 2001, director: 'Kelly' },
      { title: 'Looper', year: 2012, director: 'Johnson' },
      { title: 'Edge of Tomorrow', year: 2014, director: 'Liman' },
      { title: 'Groundhog Day', year: 1993, director: 'Ramis' },
      { title: 'Interstellar', year: 2014, director: 'Nolan' },
      { title: 'Source Code', year: 2011, director: 'Jones' },
      { title: 'About Time', year: 2013, director: 'Curtis' },
      { title: 'Midnight in Paris', year: 2011, director: 'Allen' },
      { title: 'Time Bandits', year: 1981, director: 'Gilliam' },
      { title: 'Your Name', year: 2016, director: 'Shinkai' },
      { title: 'The Girl Who Leapt Through Time', year: 2006, director: 'Hosoda' },
      { title: 'Timecrimes', year: 2007, director: 'Vigalondo' },
      { title: 'Hi, Mom', year: 2021, director: 'Jia Ling' },
      { title: 'Predestination', year: 2014, director: 'Spierig' },
      { title: 'Time After Time', year: 1979, director: 'Meyer' },
      { title: 'Tenet', year: 2020, director: 'Nolan' },
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
    intro: [
      'When a director turns the camera on their own life, the result carries a rawness no biopic reaches: Cuarón rebuilding his childhood home tile by tile, Truffaut sending his delinquent double running to the sea, Fellini turning memory into a circus.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of June 26, 2026, featuring Roma. It stretches the form from straight memoir (Belfast, The Fabelmans) to essay (The Beaches of Agnès) to fiction one heartbeat away from confession (Aftersun, The Souvenir).',
    ],
    items: [
      { title: 'Roma', year: 2018, director: 'Cuarón' },
      { title: 'Amarcord', year: 1973, director: 'Fellini' },
      { title: '8½', year: 1963, director: 'Fellini' },
      { title: 'The 400 Blows', year: 1959, director: 'Truffaut' },
      { title: 'Mirror', year: 1975, director: 'Tarkovsky' },
      { title: 'Wild Strawberries', year: 1957, director: 'Bergman' },
      { title: 'All That Jazz', year: 1979, director: 'Fosse' },
      { title: 'Cinema Paradiso', year: 1988, director: 'Tornatore' },
      { title: 'Annie Hall', year: 1977, director: 'Allen' },
      { title: 'Pain and Glory', year: 2019, director: 'Almodóvar' },
      { title: 'The Hand of God', year: 2021, director: 'Sorrentino' },
      { title: 'Belfast', year: 2021, director: 'Branagh' },
      { title: 'The Fabelmans', year: 2022, director: 'Spielberg' },
      { title: 'Persepolis', year: 2007, director: 'Satrapi & Paronnaud' },
      { title: 'Distant Voices, Still Lives', year: 1988, director: 'Davies' },
      { title: 'A Time to Live and a Time to Die', year: 1985, director: 'Hou Hsiao-hsien' },
      { title: 'The Spirit of the Beehive', year: 1973, director: 'Erice' },
      { title: 'The Beaches of Agnès', year: 2008, director: 'Varda' },
      { title: 'The Souvenir', year: 2019, director: 'Hogg' },
      { title: 'Aftersun', year: 2022, director: 'Wells' },
      { title: 'The Diving Bell and the Butterfly', year: 2007, director: 'Schnabel' },
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
    intro: [
      "Under state censorship, Eastern Europe's young filmmakers smuggled absurdism, sexuality and open dissent into cinemas, and some paid for it in banned films and broken careers. The Czechoslovak New Wave laughs, the Polish school mourns, and the Soviets built cathedrals of the image.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of June 19, 2026, featuring Menzel's Closely Watched Trains. Romania (The Forest of the Hanged, Silent Wedding), Bulgaria (The Tied Up Balloon, Iconostasis) and Yugoslavia widen it past the usual suspects.",
    ],
    items: [
      { title: 'Closely Watched Trains', year: 1966, director: 'Menzel' },
      { title: 'Loves of a Blonde', year: 1965, director: 'Forman' },
      { title: 'Daisies', year: 1966, director: 'Chytilová' },
      { title: 'The Shop on Main Street', year: 1965, director: 'Kadár & Klos' },
      { title: 'Ashes and Diamonds', year: 1958, director: 'Wajda' },
      { title: 'Knife in the Water', year: 1962, director: 'Polanski' },
      { title: 'A Short Film About Killing', year: 1988, director: 'Kieślowski' },
      { title: 'The Round-Up', year: 1966, director: 'Jancsó' },
      { title: 'Mephisto', year: 1981, director: 'Szabó' },
      { title: 'Sátántangó', year: 1994, director: 'Tarr' },
      { title: 'Andrei Rublev', year: 1966, director: 'Tarkovsky' },
      { title: 'Come and See', year: 1985, director: 'Klimov' },
      { title: 'The Cranes Are Flying', year: 1957, director: 'Kalatozov' },
      { title: 'The Color of Pomegranates', year: 1969, director: 'Parajanov' },
      { title: 'The Forest of the Hanged', year: 1965, director: 'Ciulei' },
      { title: 'Silent Wedding', year: 2008, director: 'Mălăele' },
      { title: 'The Tied Up Balloon', year: 1967, director: 'Zhelyazkova' },
      { title: 'Iconostasis', year: 1969, director: 'Hristov' },
      { title: 'Time of the Gypsies', year: 1988, director: 'Kusturica' },
      { title: 'W.R.: Mysteries of the Organism', year: 1971, director: 'Makavejev' },
      { title: "The Firemen's Ball", year: 1967, director: 'Forman' },
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
    intro: [
      "Sport on film is never really about the game; it is drama with a scoreboard. This collection ran the week the 2026 World Cup kicked off, so football leads: Loach's Cantona fable, Panahi's women locked out of a Tehran stadium, Chow's Shaolin strikers, an Allied XI escaping through a Paris crowd.",
      "It ran as the weekly theme in the I Like Movies Discover tab for the week of June 12, 2026, featuring Bend It Like Beckham. Beyond the pitch: Scorsese's ring, Kapadia's cockpit, Tonya on the ice and Lagaan's cricket match against the Raj.",
    ],
    items: [
      { title: 'Bend It Like Beckham', year: 2002, director: 'Chadha' },
      { title: 'Looking for Eric', year: 2009, director: 'Loach' },
      { title: 'Offside', year: 2006, director: 'Panahi' },
      { title: 'Escape to Victory', year: 1981, director: 'Huston' },
      { title: 'The Damned United', year: 2009, director: 'Hooper' },
      { title: 'Diego Maradona', year: 2019, director: 'Kapadia' },
      { title: 'The Miracle of Bern', year: 2003, director: 'Wortmann' },
      { title: 'Shaolin Soccer', year: 2001, director: 'Chow' },
      { title: 'The Two Escobars', year: 2010, director: 'Zimbalist' },
      { title: 'Raging Bull', year: 1980, director: 'Scorsese' },
      { title: 'Rocky', year: 1976, director: 'Avildsen' },
      { title: 'When We Were Kings', year: 1996, director: 'Gast' },
      { title: 'Senna', year: 2010, director: 'Kapadia' },
      { title: 'Rush', year: 2013, director: 'Howard' },
      { title: 'The Wrestler', year: 2008, director: 'Aronofsky' },
      { title: 'Moneyball', year: 2011, director: 'Miller' },
      { title: 'Hoosiers', year: 1986, director: 'Anspaugh' },
      { title: 'I, Tonya', year: 2017, director: 'Gillespie' },
      { title: 'Borg vs. McEnroe', year: 2017, director: 'Metz' },
      { title: 'Lagaan', year: 2001, director: 'Gowariker' },
      { title: 'Million Dollar Baby', year: 2004, director: 'Eastwood' },
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
    intro: [
      "Queer cinema spent half a century in code, Cocteau's poetry and Visconti's glances, then burst into the open and built a canon: Wong Kar-wai's Buenos Aires exiles, Sciamma's painters, Jenkins' Miami moonlight.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of June 5, 2026, opening Pride month, featuring Matthew Warchus's Pride, the true story of London activists funding striking Welsh miners. Documentary (Paris Is Burning), melodrama (Carol), comedy (The Birdcage) and Almodóvar all get seats.",
    ],
    items: [
      { title: 'Pride', year: 2014, director: 'Warchus' },
      { title: 'Orpheus', year: 1950, director: 'Cocteau' },
      { title: 'Portrait of a Lady on Fire', year: 2019, director: 'Sciamma' },
      { title: 'Brokeback Mountain', year: 2005, director: 'Lee' },
      { title: 'Carol', year: 2015, director: 'Haynes' },
      { title: 'Moonlight', year: 2016, director: 'Jenkins' },
      { title: 'Call Me by Your Name', year: 2017, director: 'Guadagnino' },
      { title: 'My Own Private Idaho', year: 1991, director: 'Van Sant' },
      { title: 'Milk', year: 2008, director: 'Van Sant' },
      { title: 'Paris Is Burning', year: 1990, director: 'Livingston' },
      { title: 'Happy Together', year: 1997, director: 'Wong Kar-wai' },
      { title: 'The Handmaiden', year: 2016, director: 'Park Chan-wook' },
      { title: 'Maurice', year: 1987, director: 'Ivory' },
      { title: 'A Single Man', year: 2009, director: 'Ford' },
      { title: 'The Birdcage', year: 1996, director: 'Nichols' },
      { title: 'Fox and His Friends', year: 1975, director: 'Fassbinder' },
      { title: 'Sebastiane', year: 1976, director: 'Jarman' },
      { title: 'Death in Venice', year: 1971, director: 'Visconti' },
      { title: 'The Way He Looks', year: 2014, director: 'Ribeiro' },
      { title: 'Tomboy', year: 2011, director: 'Sciamma' },
      { title: 'All About My Mother', year: 1999, director: 'Almodóvar' },
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
    intro: [
      "A cut is a blink, and some directors refuse to blink. The long take is cinema's highest-wire act: Hitchcock hiding reel changes in Rope, Sokurov gliding through the Hermitage in one real ninety-six-minute shot, Cuarón's camera inside a refugee bus while the world ends outside it.",
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of May 29, 2026, featuring Children of Men. Some entries are single takes, real (Russian Ark, Victoria) or stitched (1917, Birdman); the rest deploy the unbroken shot as a signature scene, from the Copacabana entrance in Goodfellas to the corridor fight in Oldboy.",
    ],
    items: [
      { title: 'Children of Men', year: 2006, director: 'Cuarón' },
      { title: 'Rope', year: 1948, director: 'Hitchcock' },
      { title: 'Russian Ark', year: 2002, director: 'Sokurov' },
      { title: '1917', year: 2019, director: 'Mendes' },
      { title: 'Birdman', year: 2014, director: 'Iñárritu' },
      { title: 'Touch of Evil', year: 1958, director: 'Welles' },
      { title: 'Goodfellas', year: 1990, director: 'Scorsese' },
      { title: 'The Player', year: 1992, director: 'Altman' },
      { title: 'Boogie Nights', year: 1997, director: 'P.T. Anderson' },
      { title: 'Magnolia', year: 1999, director: 'P.T. Anderson' },
      { title: 'Atonement', year: 2007, director: 'Joe Wright' },
      { title: 'Police, Adjective', year: 2009, director: 'Porumboiu' },
      { title: 'The Sacrifice', year: 1986, director: 'Tarkovsky' },
      { title: 'Oldboy', year: 2003, director: 'Park Chan-wook' },
      { title: 'Elephant', year: 2003, director: 'Van Sant' },
      { title: 'Hard Boiled', year: 1992, director: 'Woo' },
      { title: 'Werckmeister Harmonies', year: 2000, director: 'Tarr' },
      { title: 'The Passenger', year: 1975, director: 'Antonioni' },
      { title: 'Weekend', year: 1967, director: 'Godard' },
      { title: 'Le Trou', year: 1960, director: 'Becker' },
      { title: 'Victoria', year: 2015, director: 'Schipper' },
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
    intro: [
      'From Ousmane Sembène\'s pioneering Senegalese realism to Mati Diop\'s ghosts drifting back across the Atlantic, African cinema built one of the richest bodies of work in film history while most festivals looked elsewhere. They are catching up.',
      'This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of May 22, 2026, featuring Atlantics. It spans the continent: Senegal, Mali, Chad, Egypt, Ethiopia, Morocco, South Africa, Burkina Faso, Tunisia, and Algeria through The Battle of Algiers.',
    ],
    items: [
      { title: 'Atlantics', year: 2019, director: 'Mati Diop' },
      { title: 'Black Girl', year: 1966, director: 'Sembène' },
      { title: 'Xala', year: 1975, director: 'Sembène' },
      { title: 'Touki Bouki', year: 1973, director: 'Mambéty' },
      { title: 'Hyenas', year: 1992, director: 'Mambéty' },
      { title: 'Yeelen', year: 1987, director: 'Cissé' },
      { title: 'Timbuktu', year: 2014, director: 'Sissako' },
      { title: 'Bamako', year: 2006, director: 'Sissako' },
      { title: 'Tilai', year: 1990, director: 'Ouedraogo' },
      { title: 'A Screaming Man', year: 2010, director: 'Haroun' },
      { title: 'Lingui', year: 2021, director: 'Haroun' },
      { title: 'Chronicle of the Years of Fire', year: 1975, director: 'Lakhdar-Hamina' },
      { title: 'Tsotsi', year: 2005, director: 'Hood' },
      { title: 'Cairo Station', year: 1958, director: 'Chahine' },
      { title: 'Buud Yam', year: 1997, director: 'Kaboré' },
      { title: 'Ali Zaoua', year: 2000, director: 'Ayouch' },
      { title: 'Faya Dayi', year: 2021, director: 'Beshir' },
      { title: 'Difret', year: 2014, director: 'Mehari' },
      { title: 'Lamb', year: 2015, director: 'Zeleke' },
      { title: 'The Man Who Sold His Skin', year: 2020, director: 'Ben Hania' },
      { title: 'The Battle of Algiers', year: 1966, director: 'Pontecorvo' },
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
    intro: [
      'Somewhere between 1999 and 2009, Hollywood remembered how to write a meet-cute: Hugh Grant stammered, Sandra Bullock fell over furniture, Renée Zellweger kept a diary. The era\'s romcoms were formula, but formula executed by stars and scripts that knew exactly what they were doing.',
      "This collection of 21 films ran as the weekly theme in the I Like Movies Discover tab for the week of May 15, 2026, featuring Bridget Jones's Diary. Amélie and My Sassy Girl keep it from being a purely Hollywood list.",
    ],
    items: [
      { title: "Bridget Jones's Diary", year: 2001, director: 'Maguire' },
      { title: 'Notting Hill', year: 1999, director: 'Michell' },
      { title: 'Love Actually', year: 2003, director: 'Curtis' },
      { title: 'Amélie', year: 2001, director: 'Jeunet' },
      { title: 'Legally Blonde', year: 2001, director: 'Luketic' },
      { title: 'The Holiday', year: 2006, director: 'Meyers' },
      { title: "Something's Gotta Give", year: 2003, director: 'Meyers' },
      { title: 'The Devil Wears Prada', year: 2006, director: 'Frankel' },
      { title: 'Miss Congeniality', year: 2000, director: 'Petrie' },
      { title: 'How to Lose a Guy in 10 Days', year: 2003, director: 'Petrie' },
      { title: 'Two Weeks Notice', year: 2002, director: 'Lawrence' },
      { title: 'Music and Lyrics', year: 2007, director: 'Lawrence' },
      { title: 'Hitch', year: 2005, director: 'Tennant' },
      { title: 'Sweet Home Alabama', year: 2002, director: 'Tennant' },
      { title: '13 Going on 30', year: 2004, director: 'Waters' },
      { title: 'About a Boy', year: 2002, director: 'Weitz' },
      { title: 'My Sassy Girl', year: 2001, director: 'Kwak' },
      { title: 'The Wedding Planner', year: 2001, director: 'Shankman' },
      { title: 'Definitely, Maybe', year: 2008, director: 'Brooks' },
      { title: 'The Proposal', year: 2009, director: 'Fletcher' },
      { title: 'Bridget Jones: The Edge of Reason', year: 2004, director: 'Kidron' },
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
    intro: [
      'When the source is the canon itself, Austen, the Brontës, Dickens, Dumas, Shelley, the question stops being whether the film is faithful and becomes whose reading burns brightest on screen. This collection gathers 21 answers, from David Lean\'s Dickens to Kubrick\'s Thackeray.',
      "It ran as the weekly theme in the I Like Movies Discover tab for the week of May 8, 2026, featuring Joe Wright's Pride & Prejudice. The list deliberately mixes eras: a 1939 Wuthering Heights sits next to del Toro's 2025 Frankenstein.",
    ],
    items: [
      { title: 'Pride & Prejudice', year: 2005, director: 'Joe Wright' },
      { title: 'Sense and Sensibility', year: 1995, director: 'Lee' },
      { title: 'Anna Karenina', year: 2012, director: 'Joe Wright' },
      { title: 'Wuthering Heights', year: 1939, director: 'Wyler' },
      { title: 'Jane Eyre', year: 2011, director: 'Fukunaga' },
      { title: 'Great Expectations', year: 1946, director: 'Lean' },
      { title: 'Oliver Twist', year: 1948, director: 'Lean' },
      { title: 'The Three Musketeers', year: 1973, director: 'Lester' },
      { title: 'The Count of Monte Cristo', year: 2002, director: 'Reynolds' },
      { title: 'Frankenstein', year: 2025, director: 'del Toro' },
      { title: 'Lady Macbeth', year: 2016, director: 'Oldroyd' },
      { title: 'The Trial', year: 1962, director: 'Welles' },
      { title: 'A Room with a View', year: 1985, director: 'Ivory' },
      { title: 'Howards End', year: 1992, director: 'Ivory' },
      { title: 'The Age of Innocence', year: 1993, director: 'Scorsese' },
      { title: 'Tess', year: 1979, director: 'Polanski' },
      { title: 'White Nights', year: 1957, director: 'Visconti' },
      { title: 'Madame Bovary', year: 1991, director: 'Chabrol' },
      { title: 'The Hunchback of Notre Dame', year: 1956, director: 'Delannoy' },
      { title: 'Barry Lyndon', year: 1975, director: 'Kubrick' },
      { title: 'Hamlet', year: 1996, director: 'Branagh' },
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
    intro: [
      "Films about work rarely get called a genre, but they form one: strikes and picket lines, factory floors and call centers, the people history books forget. This collection gathers 21 of them, from Chaplin's assembly line to the Dardennes' weekend of door-knocking.",
      "It ran as the weekly theme in the I Like Movies Discover tab for the week of May 1, 2026, timed to May Day, featuring Norma Rae, Martin Ritt's story of a textile-mill union drive. The list crosses continents: Monicelli's Turin, Loach's Newcastle, Cantet's France, Boots Riley's Oakland.",
    ],
    items: [
      { title: 'Norma Rae', year: 1979, director: 'Martin Ritt' },
      { title: 'Modern Times', year: 1936, director: 'Chaplin' },
      { title: 'The Grapes of Wrath', year: 1940, director: 'Ford' },
      { title: 'On the Waterfront', year: 1954, director: 'Kazan' },
      { title: 'Salt of the Earth', year: 1954, director: 'Biberman' },
      { title: 'The Organizer', year: 1963, director: 'Monicelli' },
      { title: 'Blue Collar', year: 1978, director: 'Schrader' },
      { title: '9 to 5', year: 1980, director: 'Higgins' },
      { title: 'Matewan', year: 1987, director: 'Sayles' },
      { title: 'Roger & Me', year: 1989, director: 'Moore' },
      { title: 'The Full Monty', year: 1997, director: 'Cattaneo' },
      { title: 'Office Space', year: 1999, director: 'Judge' },
      { title: 'I, Daniel Blake', year: 2016, director: 'Loach' },
      { title: 'Sorry to Bother You', year: 2018, director: 'Riley' },
      { title: 'Harlan County U.S.A.', year: 1976, director: 'Kopple' },
      { title: 'Daens', year: 1992, director: 'Coninx' },
      { title: 'Brassed Off', year: 1996, director: 'Herman' },
      { title: 'Human Resources', year: 1999, director: 'Cantet' },
      { title: 'Made in Dagenham', year: 2010, director: 'Cole' },
      { title: 'Two Days, One Night', year: 2014, director: 'Dardenne' },
      { title: 'Tout va bien', year: 1972, director: 'Godard' },
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
    intro: [
      "After the Second World War, Italian directors took cameras out of the studios and onto broken streets, casting real people and filming the poverty around them. The movement they built, neorealism, became the school almost every modern director studied, openly or not: De Sica's fathers and sons, Rossellini's occupied Rome, Visconti's fishermen.",
      "This collection of 21 films was the first weekly theme in the I Like Movies Discover tab, for the week of April 24, 2026, featuring Bicycle Thieves. It runs from the movement's core (Rome, Open City; Umberto D.) to its edges and heirs (Il Posto, Hands Over the City).",
    ],
    items: [
      { title: 'Bicycle Thieves', year: 1948, director: 'De Sica' },
      { title: 'Rome, Open City', year: 1945, director: 'Rossellini' },
      { title: 'Paisan', year: 1946, director: 'Rossellini' },
      { title: 'Umberto D.', year: 1952, director: 'De Sica' },
      { title: 'Ossessione', year: 1943, director: 'Visconti' },
      { title: 'La Terra Trema', year: 1948, director: 'Visconti' },
      { title: 'La Strada', year: 1954, director: 'Fellini' },
      { title: 'Nights of Cabiria', year: 1957, director: 'Fellini' },
      { title: 'Bitter Rice', year: 1949, director: 'De Santis' },
      { title: 'Il Posto', year: 1961, director: 'Olmi' },
      { title: 'The Tree of Wooden Clogs', year: 1978, director: 'Olmi' },
      { title: 'Accattone', year: 1961, director: 'Pasolini' },
      { title: 'Mamma Roma', year: 1962, director: 'Pasolini' },
      { title: 'Salvatore Giuliano', year: 1962, director: 'Rosi' },
      { title: 'Il Grido', year: 1957, director: 'Antonioni' },
      { title: 'In the Name of the Law', year: 1949, director: 'Germi' },
      { title: 'Without Pity', year: 1948, director: 'Lattuada' },
      { title: 'To Live in Peace', year: 1947, director: 'Zampa' },
      { title: 'Two Pennyworth of Hope', year: 1952, director: 'Castellani' },
      { title: 'Banditi a Orgosolo', year: 1961, director: 'De Seta' },
      { title: 'Hands Over the City', year: 1963, director: 'Rosi' },
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
