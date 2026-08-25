import type { Project, ProjectShot } from '../data/projects';
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

/* The pre-reshoot captures are discovered from the filesystem rather than
 * listed in projects.ts, so the data file only ever describes the shots the
 * site actually wants. When a capture whose theme is spelled into its name
 * exists, the fallback still follows the theme toggle — which previews the
 * real behaviour before the new files land. */
function legacyKeys(projectId: string, theme: Theme, mobile: boolean): string[] {
  const all = Object.keys(byKey).filter((k) => k.startsWith(`${projectId}-variant-`));
  const isMobile = (k: string) => k.endsWith('-mobile');
  const pool = mobile && all.some(isMobile) ? all.filter(isMobile) : all.filter((k) => !isMobile(k));
  const themed = pool.filter((k) => k.replace(/-mobile$/, '').endsWith(`-${theme}`));
  return (themed.length ? themed : pool).sort();
}

/* Resolves one gallery slot to a filename key:
 *
 *   {id}-{slot}-{theme}-mobile  ->  {id}-{slot}-{theme}  ->  a legacy capture
 *
 * A correctly-named capture dropped into src/assets/screenshots therefore
 * takes over on the next build with no code change. When nothing resolves,
 * the canonical name is returned so Shot renders its placeholder and the
 * missing file is obvious rather than silent. */
export function resolveShot(
  project: Project,
  slot: ProjectShot['key'],
  theme: Theme,
  mobile: boolean,
): string {
  const canonical = `${project.id}-${slot}-${theme}`;
  const candidates = mobile ? [`${canonical}-mobile`, canonical] : [canonical];
  for (const key of candidates) {
    if (byKey[key]) return key;
  }

  const legacy = legacyKeys(project.id, theme, mobile);
  if (!legacy.length) return canonical;

  const index = Math.max(0, project.shots.findIndex((s) => s.key === slot));
  return legacy[index % legacy.length];
}

export function heroKey(project: Project, theme: Theme, mobile: boolean): string {
  return resolveShot(project, 'hero', theme, mobile);
}

/** Shared layout id linking a project's home-page exhibit to its detail hero.
 *  Both ends must agree, so it lives here rather than being spelled twice. */
export function sharedShotId(project: Project): string {
  return `shot-${project.id}`;
}
