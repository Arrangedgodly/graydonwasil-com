import type { Project } from '../data/projects';
import type { Theme } from './useTheme';

const files = import.meta.glob<{ default: string }>(
  '/src/assets/screenshots/*.{png,jpg,jpeg,webp,avif,gif}',
  { eager: true },
);

const byKey: Record<string, string> = {};
for (const path in files) {
  const key = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  byKey[key] = files[path].default;
}

export function getShotImage(key: string): string | undefined {
  return byKey[key];
}

/* Resolves the image for a project's exhibit, preferring the new theme-paired
 * hero capture and degrading gracefully while the reshoot is outstanding:
 *
 *   {id}-hero-{theme}-mobile  ->  {id}-hero-{theme}  ->  first gallery variant
 *
 * That ordering means a correctly-named capture dropped into the screenshots
 * folder takes over on the next build with no code change, and the site keeps
 * showing something in the meantime. */
export function heroKey(project: Project, theme: Theme, mobile: boolean): string {
  const candidates = [
    mobile ? `${project.id}-hero-${theme}-mobile` : null,
    `${project.id}-hero-${theme}`,
  ].filter((k): k is string => k !== null);

  for (const key of candidates) {
    if (byKey[key]) return key;
  }

  const first = project.gallery?.variants[0];
  if (first) {
    const variant = `${project.id}-variant-${first.key}${mobile ? '-mobile' : ''}`;
    return byKey[variant] ? variant : `${project.id}-variant-${first.key}`;
  }
  return `${project.id}-1`;
}
