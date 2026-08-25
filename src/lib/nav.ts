export interface ViewDef {
  path: string;
  label: string;
  num: string;
}

/* Three destinations. Home carries the hero and the project exhibits, so
 * "Work" is what the visitor is actually being sent to. */
export const VIEWS: ViewDef[] = [
  { path: '/', label: 'Work', num: '01' },
  { path: '/about', label: 'About', num: '02' },
  { path: '/contact', label: 'Contact', num: '03' },
];

export const FOOT: Record<string, string> = {
  '/': 'Three projects, all live. Every one started as a problem in my own week.',
  '/about': 'The short version: I build the tool the hobby was missing.',
  '/contact': 'Straight to my inbox. I read everything.',
};

export const DETAIL_FOOT = 'Esc goes back. Arrows move between projects.';
