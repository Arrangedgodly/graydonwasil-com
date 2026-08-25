import { Link } from 'react-router-dom';
import { m, useReducedMotion } from 'motion/react';
import { PROJECTS, type Project } from '../data/projects';
import { Shot } from '../components/Shot';
import { heroKey, sharedShotId } from '../lib/images';
import { useTheme } from '../lib/useTheme';
import { useIsMobile } from '../lib/useIsMobile';
import { SPRING_OPEN, INSTANT } from '../lib/motion';

export function Home() {
  return (
    <div className="pane">
      <section className="hero">
        <h1 className="disp hero-title">
          <span className="line">I build software</span>
          <span className="line">for the things I&rsquo;m</span>
          <span className="line">already into.</span>
        </h1>
        <p className="lede">
          Lyrics, records, die-cast cars, video games. I take an ordinary week&rsquo;s obsessions and
          build the tool each one was missing &mdash; then put it on the internet and keep it running.
        </p>
      </section>

      <section className="exhibits" aria-label="Projects">
        {PROJECTS.map((p, i) => (
          <Exhibit key={p.id} project={p} eager={i === 0} />
        ))}
      </section>
    </div>
  );
}

function Exhibit({ project, eager }: { project: Project; eager: boolean }) {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const reduce = useReducedMotion();
  const key = heroKey(project, theme, isMobile);

  return (
    <Link to={`/projects/${project.id}`} className="exhibit">
      {/* Shares a layoutId with the detail page hero, so this frame is the
          element that travels when the project opens. The hover lift lives on
          Motion rather than in CSS — a CSS transform on a layout-animated
          element skews the measurements the morph depends on. */}
      <m.figure
        layoutId={sharedShotId(project)}
        className="exhibit-frame blueprint duotone"
        whileHover={reduce ? undefined : { y: -4 }}
        transition={reduce ? INSTANT : SPRING_OPEN}
      >
        <i className="corner tl" />
        <i className="corner tr" />
        <i className="corner bl" />
        <i className="corner br" />
        <Shot
          imageKey={key}
          label={`${project.title} — screenshot`}
          alt={`${project.title} — ${project.tagline}`}
          natural
          loading={eager ? 'eager' : 'lazy'}
        />
      </m.figure>

      <div className="exhibit-meta">
        <div className="exhibit-lead">
          <div className="exhibit-heading">
            <span className="mono exhibit-num">{project.num}</span>
            <h2 className="pt exhibit-title">{project.title}</h2>
          </div>
          <p className="exhibit-tagline">{project.tagline}</p>
        </div>

        <div className="exhibit-side">
          <div className="exhibit-tags">
            {project.tags.map((t) => (
              <span key={t} className="tag tag-outline">
                {t}
              </span>
            ))}
          </div>
          <span className="mono exhibit-year">{project.year}</span>
          <span className="open mono exhibit-open">Open project &rarr;</span>
        </div>
      </div>
    </Link>
  );
}
