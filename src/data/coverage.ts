// Press coverage: one entry per piece written about the app. /press lists all
// of them; the homepage's "Featured by" band links every outlet and repeats the
// Rich on Tech line, so an edit here changes both pages.
//
// Coverage quotes one short line per piece, attributed and linked to the
// source: a quotation of that size for reference sits inside quotation right
// (NL Auteurswet art. 15a; fair use elsewhere). Courtesy permission requests
// went to the Rich on Tech and Bug.hr writers on 2026-09-04; a "no" removes
// the line, not the link. The homepage repeats an existing line, never a new one.

export type Coverage = { quote: string; outlet: string; piece: string; url: string; note?: string };

export const COVERAGE: Coverage[] = [
  {
    quote: 'This might be my new favorite movie tracking app.',
    outlet: 'Rich on Tech',
    piece: 'newsletter, 22 August 2026',
    url: 'https://richontech.tv/p/the-best-way-to-stop-a-scam-is-to',
  },
  {
    quote:
      'This is where I Like Movies steps in: a personal catalogue of films and TV series that can recommend what is worth watching next, from your own profile and collection.',
    outlet: 'Bug.hr',
    piece: 'App dana, 26 August 2026',
    url: 'https://www.bug.hr/appdana/i-like-movies-osobni-mobilni-filmski-dnevnik-s-prilagodjenim-preporukama-62291',
    note: 'translated from Croatian',
  },
  {
    quote:
      'After too many meals where the food went cold while he and his partner picked a film, Alex Crăciun built I Like Movies.',
    outlet: 'start-up.ro',
    piece: 'interview, 28 October 2026',
    url: 'https://start-up.ro/ce-film-vedem-pana-nu-se-raceste-mancarea-un-roman-din-olanda-a-creat-i-like-movies-aplicatia-care-cauta-raspunsul-cu-ai/',
    note: 'translated from Romanian',
  },
];
