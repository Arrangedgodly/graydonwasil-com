export interface Project {
  id: string;
  num: string;
  title: string;
  url: string;
  year: string;
  tagline: string;
  blurb: string;
  bullets: string[];
  stack: string[];
  tags: string[];
  learned: string;
  shots: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'rhymepage',
    num: '01',
    title: 'Rhymepage',
    url: 'rhymepage.com',
    year: '2025',
    tagline: "Write the verse, sync it to the track, run it back as a teleprompter.",
    blurb: "A lyric-writing app that knows what time it is. Draft the verse, mark each line against the audio, then hit play and watch it scroll in time — the way it will actually be performed. Rhyme, near-rhyme and syllable tooling comes from a live API underneath the editor.",
    bullets: [
      'Line-level time sync against the track',
      'Teleprompter playback that follows the beat',
      'Rhyme and syllable lookup from a live API',
      'Autosaved drafts and versions per session',
    ],
    stack: ['React', 'Web Audio', 'REST API', 'Local storage'],
    tags: ['Web app', 'Audio'],
    learned: 'Timing is a data problem long before it is an audio problem.',
    shots: [
      'editor — lyric sheet with sync marks',
      'playback — teleprompter running',
      'rhyme panel — live API results',
    ],
  },
  {
    id: 'cars',
    num: '02',
    title: 'Collectible Cars DB',
    url: 'cars.arrangedgodly.com',
    year: '2026',
    tagline: 'Every Mattel Pixar Cars casting in one place: own it, want it, rate it.',
    blurb: "A database for the Mattel Pixar Cars line, built because a collection had outgrown a notes app. Catalog what you own, build a wishlist you can actually shop from, rate castings, and see the whole run laid out — including the holes in it.",
    bullets: [
      'Full casting catalog with search and filters',
      'Own / want / rated state on every casting',
      'A shelf view of your own collection',
      'Community ratings across the whole run',
    ],
    stack: ['Database', 'Search', 'Auth', 'Image handling'],
    tags: ['Web app', 'Data'],
    learned: 'Collectors are power users. Give them real filters or they leave.',
    shots: [
      'catalog — grid with own/want state',
      'detail — a single casting',
      'shelf — my collection',
    ],
  },
  {
    id: 'ag',
    num: '03',
    title: 'Arranged Godly',
    url: 'arrangedgodly.com',
    year: 'ongoing',
    tagline: 'Music, the Max for Live devices I wrote for myself, and my first finished game.',
    blurb: "The home shelf. Original music, the Max for Live devices I built because my own sessions needed them, and Magic Gunden — the first video game I ever finished, playable right there in the page. One site holding three very different kinds of thing without apologising for it.",
    bullets: [
      'Music releases with in-page players',
      'Max for Live devices, free to download',
      'Magic Gunden, playable in the browser',
      'One shelf, three unrelated content types',
    ],
    stack: ['Max for Live', 'Game dev', 'Music', 'Static site'],
    tags: ['Audio', 'Games'],
    learned: 'A personal site is allowed to be more than one thing.',
    shots: [
      'home — the shelf',
      'devices — Max for Live downloads',
      'magic gunden — title screen',
    ],
  },
];

export const FILTERS = ['All', 'Web app', 'Audio', 'Data', 'Games'];
