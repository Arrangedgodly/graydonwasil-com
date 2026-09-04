import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import type { Project } from '../data/projects';
import { ProjectMedia } from './ProjectMedia';
import { ProjectScene } from './ProjectScene';
import { getShotImage, resolveShot, sharedShotId } from '../lib/images';
import { detailPath } from '../lib/deck';
import { useTheme, type Theme } from '../lib/useTheme';
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

  /* Only the hero is captured for phones. Cycling the rest there would swing
   * the frame between a tall phone screenshot and wide desktop ones every few
   * seconds, so on mobile we show just the shots that have their own capture.
   * Add mobile twins for the others later and cycling resumes on its own. */
  const shots = isMobile
    ? project.shots.filter(
        (s) => s.kind === 'youtube' || resolveShot(project, s.key, theme, true).endsWith('-mobile'),
      )
    : project.shots;
  const activeShotKind = shots[i]?.kind;

  useEffect(() => {
    if (reduce || paused || shots.length < 2 || activeShotKind === 'youtube') return;
    const id = setInterval(() => setI((v) => (v + 1) % shots.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, paused, shots.length, activeShotKind]);

  /* Decode this project's other-theme captures while the browser is idle. The
   * theme flip swaps every screenshot inside a flushSync, and decoding a
   * 589 KB WebP at that moment is a large part of why the wipe stutters on a
   * phone. Doing it ahead of time makes the swap free. */
  useEffect(() => {
    const other: Theme = theme === 'dark' ? 'light' : 'dark';
    const run = () => {
      for (const s of shots) {
        if (s.kind === 'youtube') continue;
        const src = getShotImage(resolveShot(project, s.key, other, isMobile));
        if (!src) continue;
        const img = new Image();
        img.src = src;
        img.decode?.().catch(() => {});
      }
    };
    const hasIdle = typeof window.requestIdleCallback === 'function';
    const handle = hasIdle ? window.requestIdleCallback(run) : window.setTimeout(run, 300);
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, [project, theme, isMobile, shots]);

  const shot = shots[i] ?? shots[0] ?? project.shots[0];
  const key = shot.kind === 'youtube'
    ? `youtube-${shot.youtubeId}`
    : resolveShot(project, shot.key, theme, isMobile);
  const activeShotIndex = Math.max(0, shots.indexOf(shot));
  const titleId = `project-${project.id}-title`;

  return (
    <div className="pslide" data-project={project.id}>
      <article className="pslide-card" aria-labelledby={titleId}>
        <div className="pslide-instrument mono" aria-label={`Featured project ${project.num} of 04, ${project.year}`}>
          <span>Featured project</span>
          <span>Case {project.num} / 04</span>
          <span>{project.year}</span>
        </div>

        <div className="pslide-exhibit">
          <ProjectScene projectId={project.id} reducedMotion={Boolean(reduce)} />

          <m.figure
            layoutId={sharedShotId(project)}
            className="pslide-media blueprint duotone"
            transition={reduce ? INSTANT : SPRING_OPEN}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
            }}
          >
            <i className="corner tl" />
            <i className="corner tr" />
            <i className="corner bl" />
            <i className="corner br" />

            <AnimatePresence initial={false}>
              <m.div
                key={key}
                className="pslide-frame"
                initial={reduce ? undefined : { opacity: 0, x: 14, clipPath: 'inset(0 0 0 18%)' }}
                animate={{ opacity: 1, x: 0, clipPath: 'inset(0 0 0 0)' }}
                exit={reduce ? undefined : { opacity: 0, x: -10, clipPath: 'inset(0 18% 0 0)' }}
                transition={reduce ? INSTANT : { duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectMedia
                  shot={shot}
                  imageKey={shot.kind === 'image' ? key : undefined}
                  title={`${project.title}, ${shot.label}`}
                  alt={`${project.title}. ${project.tagline}`}
                  loading="eager"
                />
              </m.div>
            </AnimatePresence>

            <figcaption className="pslide-signal mono">
              <span className="pslide-shot-name"><i aria-hidden="true" />{shot.label}</span>
              <span>{String(activeShotIndex + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}</span>
            </figcaption>
          </m.figure>
        </div>

        {shots.length > 1 && (
          <div
            className="pslide-shotstrip"
            aria-label={`${project.title} screens`}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
            }}
          >
            {shots.map((candidate, n) => (
              <button
                key={candidate.key}
                type="button"
                className="pslide-shot mono"
                aria-pressed={n === activeShotIndex}
                onClick={() => setI(n)}
              >
                <span>{String(n + 1).padStart(2, '0')}</span>
                {candidate.label}
              </button>
            ))}
          </div>
        )}

        <div className="pslide-meta">
          <div className="pslide-lead">
            <span className="pslide-num" aria-hidden="true">{project.num}</span>
            <h2 className="pt pslide-title" id={titleId}>{project.title}</h2>
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
              How I built it &rarr;
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
