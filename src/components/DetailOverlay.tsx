import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { m, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { Shot } from './Shot';
import { Lightbox } from './Lightbox';
import { getShotImage, resolveShot, sharedShotId } from '../lib/images';
import { detailSlug } from '../lib/deck';
import { useTheme } from '../lib/useTheme';
import { useIsMobile } from '../lib/useIsMobile';
import { SPRING_OPEN, INSTANT } from '../lib/motion';

/* The deeper view is a layer over the deck, not another place to be. The deck
 * stays parked on this project underneath, so closing puts you back exactly
 * where you were with nothing to re-find. */

export function DetailOverlay() {
  const location = useLocation();
  const navigate = useNavigate();
  const slug = detailSlug(location.pathname);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const project = PROJECTS.find((p) => p.id === slug);

  const close = () => navigate(`/projects/${slug}`);

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
  const heroKeyName = resolveShot(project, shot.key, theme, isMobile);
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
          <figcaption className="mono detail-caption">{shot.label}</figcaption>
          {heroSrc && (
            <button type="button" className="mono detail-expand" onClick={() => setExpanded(true)}>
              Expand
            </button>
          )}
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
              href="https://github.com/graydonwasil"
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
