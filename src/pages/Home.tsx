import { Link } from 'react-router-dom';
import { PROJECTS, type Project } from '../data/projects';
import { Shot } from '../components/Shot';
import { heroKey } from '../lib/images';
import { useTheme } from '../lib/useTheme';
import { useIsMobile } from '../lib/useIsMobile';

export function Home() {
  return (
    <>
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
    </>
  );
}

function Exhibit({ project, eager }: { project: Project; eager: boolean }) {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const key = heroKey(project, theme, isMobile);

  return (
    <Link to={`/projects/${project.id}`} className="exhibit">
      <figure className="exhibit-frame blueprint duotone">
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
      </figure>

      <div className="exhibit-meta">
        <span className="mono exhibit-num">{project.num}</span>
        <h2 className="pt exhibit-title">{project.title}</h2>
        <p className="exhibit-tagline">{project.tagline}</p>
        <div className="exhibit-tags">
          {project.tags.map((t) => (
            <span key={t} className="tag tag-outline">
              {t}
            </span>
          ))}
          <span className="mono exhibit-year">{project.year}</span>
        </div>
        <span className="open mono exhibit-open">Open project &rarr;</span>
      </div>
    </Link>
  );
}
