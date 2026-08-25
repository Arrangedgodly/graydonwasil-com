import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import type { Project } from '../data/projects';
import { Shot } from './Shot';
import { resolveShot, sharedShotId } from '../lib/images';
import { detailPath } from '../lib/deck';
import { useTheme } from '../lib/useTheme';
import { useIsMobile } from '../lib/useIsMobile';
import { SPRING_OPEN, INSTANT } from '../lib/motion';

const CYCLE_MS = 3200;

/* The slide shows the project working and says almost nothing. Captures cycle
 * on their own so you can see what is inside without opening anything; the
 * descriptions that go with them live in the deeper view. */

export function ProjectSlide({ project }: { project: Project }) {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();

  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const shots = project.shots;

  useEffect(() => {
    if (reduce || paused || shots.length < 2) return;
    const id = setInterval(() => setI((v) => (v + 1) % shots.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, paused, shots.length]);

  const shot = shots[i] ?? shots[0];
  const key = resolveShot(project, shot.key, theme, isMobile);

  return (
    <div className="pslide">
      <m.figure
        layoutId={sharedShotId(project)}
        className="pslide-media blueprint duotone"
        transition={reduce ? INSTANT : SPRING_OPEN}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <i className="corner tl" />
        <i className="corner tr" />
        <i className="corner bl" />
        <i className="corner br" />

        <AnimatePresence initial={false}>
          <m.div
            key={key}
            className="pslide-frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduce ? INSTANT : { duration: 0.55, ease: 'easeInOut' }}
          >
            <Shot
              imageKey={key}
              label={`${project.title} — screenshot`}
              alt={`${project.title} — ${project.tagline}`}
              natural
              loading="eager"
            />
          </m.div>
        </AnimatePresence>

        {shots.length > 1 && (
          <div className="pslide-dots" aria-hidden="true">
            {shots.map((s, n) => (
              <span key={s.key} data-on={n === i ? '1' : '0'} />
            ))}
          </div>
        )}
      </m.figure>

      <div className="pslide-meta">
        <div className="pslide-lead">
          <span className="mono pslide-num">{project.num}</span>
          <h2 className="pt pslide-title">{project.title}</h2>
        </div>
        <p className="pslide-tagline">{project.tagline}</p>
        <div className="pslide-foot">
          <div className="tagrun">
            {project.tags.map((t) => (
              <span key={t} className="tag tag-outline">
                {t}
              </span>
            ))}
          </div>
          <Link className="btn btn-primary" to={detailPath(project.id)}>
            Open project &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
