export interface ViewDef {
  path: string;
  label: string;
  num: string;
}

export const VIEWS: ViewDef[] = [
  { path: '/', label: 'Intro', num: '01' },
  { path: '/work', label: 'Work', num: '02' },
  { path: '/toolkit', label: 'Toolkit', num: '03' },
  { path: '/about', label: 'About', num: '04' },
  { path: '/contact', label: 'Contact', num: '05' },
];

export const FOOT: Record<string, string> = {
  '/': "Pick a section, or step through with the arrow keys.",
  '/work': 'Click any project to open it. Filters dim the rest, they never hide it.',
  '/toolkit': 'Everything on these cards was learned inside a project, not before one.',
  '/about': 'The short version: I build the tool the hobby was missing.',
  '/contact': 'Straight to my inbox. I read everything.',
};
