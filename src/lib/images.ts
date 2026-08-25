import type { Project, ProjectShot } from '../data/projects';
import type { Theme } from './useTheme';

const files = import.meta.glob<{ default: string }>(
  '/src/assets/screenshots/*.{png,jpg,jpeg,webp,avif}',
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

/* Resolves one gallery slot to a filename key:
 *
 *   {id}-{slot}-{theme}-mobile   on narrow viewports, when that capture exists
 *   {id}-{slot}-{theme}          otherwise
 *
 * Only the hero is captured for phones, so shot-2 and shot-3 fall through to
 * their desktop file by design. The canonical name is returned even when
 * nothing matches, so Shot renders its placeholder and a missing capture is
 * obvious rather than silent. */
export function resolveShot(
  project: Project,
  slot: ProjectShot['key'],
  theme: Theme,
  mobile: boolean,
): string {
  const canonical = `${project.id}-${slot}-${theme}`;
  if (mobile && byKey[`${canonical}-mobile`]) return `${canonical}-mobile`;
  return canonical;
}

export function heroKey(project: Project, theme: Theme, mobile: boolean): string {
  return resolveShot(project, 'hero', theme, mobile);
}

/** Shared layout id linking a project's slide to its deeper view. Both ends
 *  must agree, so it lives here rather than being spelled twice. */
export function sharedShotId(project: Project): string {
  return `shot-${project.id}`;
}
