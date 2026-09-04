import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, m, useReducedMotion, type PanInfo, type Variants } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { ProjectMedia, ProjectMediaThumb } from './ProjectMedia';
import { Lightbox } from './Lightbox';
import { getShotImage, resolveShot, sharedShotId } from '../lib/images';
import { detailSlug } from '../lib/deck';
import { useTheme } from '../lib/useTheme';
import { SPRING_OPEN, INSTANT } from '../lib/motion';

/** Slow enough to read the caption before it moves on. */
const CYCLE_MS = 4200;

const shotVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 16 : -16,
    clipPath: direction > 0 ? 'inset(0 0 0 14%)' : 'inset(0 14% 0 0)',
  }),
  center: { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0)' },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -10 : 10,
    clipPath: direction > 0 ? 'inset(0 14% 0 0)' : 'inset(0 0 0 14%)',
  }),
};

/* The deeper view is a layer over the deck, not another place to be. The deck
 * stays parked on this project underneath, so closing puts you back exactly
 * where you were with nothing to re-find. */

export function DetailOverlay() {
  const location = useLocation();
  const navigate = useNavigate();
  const slug = detailSlug(location.pathname);
  const { theme } = useTheme();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [shotDirection, setShotDirection] = useState<1 | -1>(1);
  const [expanded, setExpanded] = useState(false);
  // Cycling stops for good once you choose a shot yourself — an explicit pick
  // should not be overwritten a few seconds later.
  const [userPicked, setUserPicked] = useState(false);

  const project = PROJECTS.find((p) => p.id === slug);

  const close = () => navigate(`/projects/${slug}`);

  /* Thumbnails are hidden on phones, so without this the other captures are
   * unreachable. Same axis discipline as the deck: horizontal has to beat
   * vertical before the gesture counts, so a scroll that drifts sideways does
   * not change the shot. */
  const axis = useRef<'none' | 'x' | 'y'>('none');
  const shotCount = project?.shots.length ?? 0;

  const onPan = (_: PointerEvent, info: PanInfo) => {
    if (axis.current !== 'none') return;
    const ax = Math.abs(info.offset.x);
    const ay = Math.abs(info.offset.y);
    if (ax < 10 && ay < 10) return;
    axis.current = ax > ay * 1.5 ? 'x' : 'y';
  };

  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    const committed =
      axis.current === 'x' && (Math.abs(info.offset.x) > 50 || Math.abs(info.velocity.x) > 400);
    if (committed && shotCount > 1) {
      const step = info.offset.x < 0 ? 1 : -1;
      setUserPicked(true);
      setShotDirection(step);
      setActive((i) => (i + step + shotCount) % shotCount);
    }
    axis.current = 'none';
  };

  useEffect(() => {
    if (reduce || userPicked || shotCount < 2 || project?.shots[active]?.kind === 'youtube') return;
    const id = setInterval(() => {
      setShotDirection(1);
      setActive((i) => (i + 1) % shotCount);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, userPicked, shotCount, project, active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // The lightbox is a modal above this one and answers Escape first.
      if (e.key !== 'Escape') return;
      if (document.querySelector('[role="dialog"][aria-modal="true"]')) return;
      close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!project) return null;

  const shot = project.shots[active] ?? project.shots[0];
  /* Always the desktop capture here, even on a phone. The phone captures are
   * portrait — 343px wide becomes 742px tall, which cannot share a 674px stage
   * with the write-up. Landscape keeps the image small and the text readable,
   * and Expand opens it full height when you actually want to look. */
  const heroKeyName = shot.kind === 'youtube'
    ? `youtube-${shot.youtubeId}`
    : resolveShot(project, shot.key, theme, false);
  const heroSrc = shot.kind === 'image' ? getShotImage(heroKeyName) : undefined;

  return (
    <m.div
      className="detail"
      initial={reduce ? undefined : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduce ? INSTANT : { duration: 0.28 }}
    >
      <div className="detail-inner">
        <m.figure
          layoutId={sharedShotId(project)}
          className="detail-media blueprint duotone"
          transition={reduce ? INSTANT : SPRING_OPEN}
          onPan={onPan}
          onPanEnd={onPanEnd}
        >
          <i className="corner tl" />
          <i className="corner tr" />
          <i className="corner bl" />
          <i className="corner br" />
          <AnimatePresence initial={false} custom={shotDirection}>
            <m.div
              key={heroKeyName}
              className="detail-frame"
              custom={shotDirection}
              variants={shotVariants}
              initial={reduce ? false : 'enter'}
              animate="center"
              exit={reduce ? undefined : 'exit'}
              transition={reduce ? INSTANT : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectMedia
                shot={shot}
                imageKey={shot.kind === 'image' ? heroKeyName : undefined}
                title={`${project.title}, ${shot.label}`}
                alt={`${project.title}, ${shot.label}`}
                loading="eager"
              />
            </m.div>
          </AnimatePresence>
          <div className="detail-mediabar">
            <figcaption className="mono detail-caption">{shot.label}</figcaption>

            {project.shots.length > 1 && (
              <div className="detail-dots" role="group" aria-label="Screenshot">
                {project.shots.map((s, i) => (
                  <button
                    key={s.key}
                    type="button"
                    data-on={i === active ? '1' : '0'}
                    aria-current={i === active ? 'true' : undefined}
                    onClick={() => {
                      setUserPicked(true);
                      setShotDirection(i > active ? 1 : -1);
                      setActive(i);
                    }}
                  >
                    <span className="sr-only">{s.label}</span>
                  </button>
                ))}
              </div>
            )}

            {heroSrc && (
              <button type="button" className="mono detail-expand" onClick={() => setExpanded(true)}>
                View full size
              </button>
            )}
          </div>
        </m.figure>

        <div className="detail-body">
          <div className="detail-heading">
            <span className="mono detail-num">{project.num}</span>
            <h2 className="pt detail-title">{project.title}</h2>
          </div>

          <p className="detail-blurb">{project.blurb}</p>

          <ul className="rulelist detail-bullets">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <div className="tagrun">
            {project.stack.map((s) => (
              <span key={s} className="tag tag-outline">
                {s}
              </span>
            ))}
          </div>

          <p className="detail-learned">{project.learned}</p>

          <div className="detail-actions">
            <a
              className="btn btn-primary"
              href={`https://${project.url}`}
              target="_blank"
              rel="noreferrer"
            >
              Open {project.url}
            </a>
            {project.demoUrl && (
              <a
                className="btn btn-secondary"
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
              >
                {project.demoLabel ?? 'Watch demo'}
              </a>
            )}
            <a
              className="btn btn-secondary"
              href={project.sourceUrl ?? 'https://github.com/graydonwasil'}
              target="_blank"
              rel="noreferrer"
            >
              Browse source
            </a>
          </div>
        </div>

        {project.shots.length > 1 && (
          <div className="detail-thumbs" role="group" aria-label={`${project.title} screenshots`}>
            {project.shots.map((s, i) => (
              <button
                key={s.key}
                type="button"
                className="thumb"
                data-on={i === active ? '1' : '0'}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => {
                  setUserPicked(true);
                  setShotDirection(i > active ? 1 : -1);
                  setActive(i);
                }}
              >
                <ProjectMediaThumb
                  shot={s}
                  imageKey={s.kind === 'image' ? resolveShot(project, s.key, theme, false) : undefined}
                  label={s.label}
                />
                <span className="mono thumb-label">{s.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <Link className="mono detail-close" to={`/projects/${slug}`}>
        Close &times;
      </Link>

      {expanded && heroSrc && (
        <Lightbox
          src={heroSrc}
          alt={`${project.title}, ${shot.label}`}
          caption={`${project.title}, ${shot.label}`}
          onClose={() => setExpanded(false)}
        />
      )}
    </m.div>
  );
}
