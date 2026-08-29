/** A slot in a project's gallery. `key` is the capture slot — it becomes part
 *  of the filename as `{project.id}-{key}-{light|dark}[-mobile]`, so it has to
 *  match what the shot list asks for. `hero` does double duty: it is the image
 *  on the home page exhibit and the one that opens into this detail page. */
export interface ProjectShot {
  key: 'hero' | 'shot-2' | 'shot-3';
  label: string;
}

export type ProjectCollection = 'featured' | 'experiment';

export interface Project {
  collection: 'featured';
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
  shots: ProjectShot[];
}

export interface Experiment {
  collection: 'experiment';
  id: string;
  title: string;
  url: string;
  sourceUrl?: string;
  description: string;
  tags: string[];
  /** A local, cropped screenshot added to /public/experiments when available. */
  thumbnail?: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    collection: 'featured',
    id: 'rhymepage',
    num: '01',
    title: 'Rhymepage',
    url: 'rhymepage.com',
    year: '2025',
    tagline: 'Write the verse, sync it to the track, run it back as a teleprompter.',
    blurb:
      "A lyric-writing app that knows what time it is. Draft the verse, mark each line against the audio, then hit play and watch it scroll in time — the way it will actually be performed. Rhyme, near-rhyme and syllable tooling comes from a live API underneath the editor.",
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
      { key: 'hero', label: 'The write screen' },
      { key: 'shot-2', label: 'Teleprompter playback' },
      { key: 'shot-3', label: 'Sync marks against the track' },
    ],
  },
  {
    collection: 'featured',
    id: 'collectible-cars',
    num: '02',
    title: 'Collectible Cars DB',
    url: 'cars.arrangedgodly.com',
    year: '2026',
    tagline: 'Every Mattel Pixar Cars casting in one place: own it, want it, rate it.',
    blurb:
      "A database for the Mattel Pixar Cars line, built because a collection had outgrown a notes app. Catalog what you own, build a wishlist you can actually shop from, rate castings, and see the whole run laid out — including the holes in it.",
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
      { key: 'hero', label: 'The catalog' },
      { key: 'shot-2', label: 'A single casting' },
      { key: 'shot-3', label: 'My shelf' },
    ],
  },
  {
    collection: 'featured',
    id: 'arranged-godly',
    num: '03',
    title: 'Arranged Godly',
    url: 'arrangedgodly.com',
    year: 'ongoing',
    tagline: 'Music, the Max for Live devices I wrote for myself, and my first finished game.',
    blurb:
      "The home shelf. Original music, the Max for Live devices I built because my own sessions needed them, and Magic Gunden — the first video game I ever finished, playable right there in the page. One site holding three very different kinds of thing without apologising for it.",
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
      { key: 'hero', label: 'The home shelf' },
      { key: 'shot-2', label: 'Max for Live devices' },
      { key: 'shot-3', label: 'Magic Gunden' },
    ],
  },
];

export const EXPERIMENTS: Experiment[] = [
  {
    collection: 'experiment',
    id: 'thread-art',
    title: 'Thread Art',
    url: 'https://thread.graydonwasil.com/',
    sourceUrl: 'https://github.com/arrangedgodly/thread-art',
    description: 'Turn an image into a field of woven thread.',
    tags: ['Generative', 'Browser tool'],
    thumbnail: threadArtThumbnail,
  },
  {
    collection: 'experiment',
    id: 'biome-generator',
    title: 'Biome Generator',
    url: 'https://biome.graydonwasil.com/',
    sourceUrl: 'https://github.com/arrangedgodly/biome-generator',
    description: 'Explore procedural terrain shaped by elevation and moisture.',
    tags: ['Generative', 'Interactive'],
    thumbnail: biomeGeneratorThumbnail,
  },
  {
    collection: 'experiment',
    id: 'loom',
    title: 'LOOM',
    url: 'https://loom.arrangedgodly.com/',
    sourceUrl: 'https://github.com/arrangedgodly/loom',
    description: 'Turn cellular automata into an audiovisual loom.',
    tags: ['Generative', 'Audio'],
    thumbnail: loomThumbnail,
  },
  {
    collection: 'experiment',
    id: 'traffic',
    title: 'Traffic',
    url: 'https://traffic.graydonwasil.com/',
    sourceUrl: 'https://github.com/arrangedgodly/traffic',
    description: 'Tune a traffic signal and watch the intersection respond.',
    tags: ['Simulation', 'Interactive'],
    thumbnail: trafficThumbnail,
  },
  {
    collection: 'experiment',
    id: 'terrarium',
    title: 'Terrarium',
    url: 'https://terrarium.arrangedgodly.com/',
    sourceUrl: 'https://github.com/arrangedgodly/terrarium',
    description: 'Set growing conditions and generate a digital terrarium.',
    tags: ['Simulation', 'Procedural'],
    thumbnail: terrariumThumbnail,
  },
  {
    collection: 'experiment',
    id: 'karaoke',
    title: 'Karaoke',
    url: 'https://karaoke.arrangedgodly.com/',
    sourceUrl: 'https://github.com/arrangedgodly/karaoke',
    description: 'Build a vocal chain on the fly.',
    tags: ['Sound Design', 'Music'],
    thumbnail: karaokeThumbnail,
  },
];

/** The portfolio has one content source. Slides select the collection they need. */
export const PORTFOLIO_ITEMS: Array<Project | Experiment> = [...FEATURED_PROJECTS, ...EXPERIMENTS];

export const PROJECTS = PORTFOLIO_ITEMS.filter(
  (item): item is Project => item.collection === 'featured',
);
import biomeGeneratorThumbnail from '../assets/experiments/biome-generator.png';
import karaokeThumbnail from '../assets/experiments/karaoke.png';
import loomThumbnail from '../assets/experiments/loom.png';
import terrariumThumbnail from '../assets/experiments/terrarium.png';
import threadArtThumbnail from '../assets/experiments/thread-art.png';
import trafficThumbnail from '../assets/experiments/traffic.png';
