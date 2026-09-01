import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { m, useReducedMotion, type PanInfo } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { Shot } from './Shot';
import { Lightbox } from './Lightbox';
import { getShotImage, resolveShot, sharedShotId } from '../lib/images';
import { detailSlug } from '../lib/deck';
import { useTheme } from '../lib/useTheme';
import { SPRING_OPEN, INSTANT } from '../lib/motion';

/** Slow enough to read the caption before it moves on. */
const CYCLE_MS = 4200;

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
      setActive((i) => (i + step + shotCount) % shotCount);
    }
    axis.current = 'none';
  };

  useEffect(() => {
    if (reduce || userPicked || shotCount < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % shotCount), CYCLE_MS);
    return () => clearInterval(id);
  }, [reduce, userPicked, shotCount]);

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
  const heroKeyName = resolveShot(project, shot.key, theme, false);
  const heroSrc = getShotImage(heroKeyName);

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
          <Shot
            imageKey={heroKeyName}
            label={`${project.title} — ${shot.label}`}
            alt={`${project.title} — ${shot.label}`}
            natural
            loading="eager"
          />
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
                Expand
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
              Visit {project.url}
            </a>
            <a
              className="btn btn-secondary"
              href={project.sourceUrl ?? 'https://github.com/graydonwasil'}
              target="_blank"
              rel="noreferrer"
            >
              See the code
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
                  setActive(i);
                }}
              >
                <Shot
                  imageKey={resolveShot(project, s.key, theme, false)}
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

      <Link className="mono detail-close" to={`/projects/${slug}`}>
        Close &times;
      </Link>

      {expanded && heroSrc && (
        <Lightbox
          src={heroSrc}
          alt={`${project.title} — ${shot.label}`}
          caption={`${project.title} — ${shot.label}`}
          onClose={() => setExpanded(false)}
        />
      )}
    </m.div>
  );
}
