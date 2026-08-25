import { FIRST_PROJECT_PATH } from './deck';

export interface ViewDef {
  key: string;
  path: string;
  label: string;
}

/* Three entries jumping into a six-slide deck: Work lands on the first
 * project, the other two on their own slides. */
export const VIEWS: ViewDef[] = [
  { key: 'work', path: FIRST_PROJECT_PATH, label: 'Work' },
  { key: 'about', path: '/about', label: 'About' },
  { key: 'contact', path: '/contact', label: 'Contact' },
];
