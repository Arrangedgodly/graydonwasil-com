import { useState } from 'react';
import { m, useReducedMotion } from 'motion/react';
import type { Project } from '../data/projects';
import { Shot } from './Shot';
import { resolveShot, sharedShotId } from '../lib/images';
import { useTheme } from '../lib/useTheme';
import { useIsMobile } from '../lib/useIsMobile';
import { SPRING_OPEN, INSTANT } from '../lib/motion';

/* No auto-rotation. The old version cycled six captures on a 2.8s timer,
 * which fought the quiet ground and moved the page under the reader; the
 * theme-paired captures now follow the site's own theme toggle instead. */

export function ProjectGallery({ project }: { project: Project }) {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  // ProjectDetail passes key={project.id}, so switching projects remounts this
  // component and useState resets on its own — no effect needed.
  const [active, setActive] = useState(0);

  const shot = project.shots[active] ?? project.shots[0];

  return (
    <div className="gallery">
      {/* Same layoutId as this project's exhibit on the home page: opening the
          project moves that frame here rather than cutting to a new image. */}
      <m.figure
        layoutId={sharedShotId(project)}
        className="gallery-hero blueprint duotone"
        transition={reduce ? INSTANT : SPRING_OPEN}
      >
        <i className="corner tl" />
        <i className="corner tr" />
        <i className="corner bl" />
        <i className="corner br" />
        <Shot
          imageKey={resolveShot(project, shot.key, theme, isMobile)}
          label={`${project.title} — ${shot.label}`}
          alt={`${project.title} — ${shot.label}`}
          natural
          loading="eager"
        />
        <figcaption className="mono gallery-caption">{shot.label}</figcaption>
      </m.figure>

      {project.shots.length > 1 && (
        <div className="gallery-thumbs" role="group" aria-label={`${project.title} screenshots`}>
          {project.shots.map((s, i) => (
            <button
              key={s.key}
              type="button"
              className="thumb"
              data-on={i === active ? '1' : '0'}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => setActive(i)}
            >
              <Shot
                imageKey={resolveShot(project, s.key, theme, isMobile)}
                label={s.label}
                alt=""
                natural
              />
              <span className="mono thumb-label">{s.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
