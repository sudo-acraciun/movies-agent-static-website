// The blog's posts, newest first. The /blog index lists them, and each post
// page reads its own entry for the date under its H1 and in its Article node,
// so the three places a date appears come from one value. Each post still owns
// its copy in its own page frontmatter; the title and blurb here are kept in
// sync with it by hand.

import type { PageDates } from './schema';

export type BlogPost = PageDates & { path: string; title: string; blurb: string };

export const POSTS: BlogPost[] = [
  {
    path: '/blog/i-like-movies-is-now-on-iphone',
    title: 'I Like Movies is now on iPhone',
    published: '2026-09-14',
    modified: '2026-09-14',
    blurb:
      'I Like Movies is on the App Store. The same free tracker, with your library synced across iPhone and Android and shared with your household.',
  },
  {
    path: '/blog/how-the-assistant-checks-every-title',
    title: 'The assistant that never answers from memory',
    published: '2026-09-02',
    modified: '2026-09-02',
    blurb:
      'Every film the assistant recommends is looked up, checked against what you have seen, and filtered to what you can actually stream. Here is how.',
  },
  {
    path: '/blog/how-i-built-i-like-movies',
    title: 'How I built an AI movie tracker as a solo dev',
    published: '2026-08-21',
    modified: '2026-09-14',
    blurb:
      'The build story: a solo-built movie tracker for iPhone and Android in Go, GraphQL and React Native, and the decisions that mattered.',
  },
];

/** A post's entry by its path; throws so a renamed post fails the build. */
export function blogPost(path: string): BlogPost {
  const post = POSTS.find((p) => p.path === path);
  if (!post) throw new Error(`blogPost: no entry for ${path} in src/data/blog.ts`);
  return post;
}

// Build-time only (Node), so this runs once at astro build, not per request.
export const fmtDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
