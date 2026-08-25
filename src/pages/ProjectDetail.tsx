import { Link, Navigate, useParams } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { ProjectGallery } from '../components/ProjectGallery';
import { useStep } from '../lib/useStep';

export function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.id === slug);
  const step = useStep();

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="pane">
      <section className="detail-head">
        <div className="detail-heading">
          <span className="mono detail-num">{project.num}</span>
          <h1 className="pt detail-title">{project.title}</h1>
        </div>
        <a
          className="mono detail-url"
          href={`https://${project.url}`}
          target="_blank"
          rel="noreferrer"
        >
          {project.url}
        </a>
      </section>

      <ProjectGallery key={project.id} project={project} />

      <section className="detail-body">
        <div className="detail-main">
          <p className="prose-lead">{project.blurb}</p>
          <ul className="rulelist">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <aside className="detail-side">
          <div className="block">
            <h2 className="mono block-label">Built with</h2>
            <div className="tagrun">
              {project.stack.map((s) => (
                <span key={s} className="tag tag-outline">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="block">
            <h2 className="mono block-label">What it taught me</h2>
            <p className="learned">{project.learned}</p>
          </div>
        </aside>
      </section>

      <section className="detail-actions">
        <a className="btn btn-primary" href={`https://${project.url}`} target="_blank" rel="noreferrer">
          Visit the site
        </a>
        <a
          className="btn btn-secondary"
          href="https://github.com/graydonwasil"
          target="_blank"
          rel="noreferrer"
        >
          See the code
        </a>
        <button type="button" className="btn btn-ghost" onClick={() => step(1)}>
          Next project &rarr;
        </button>
        <Link className="btn btn-ghost detail-back" to="/">
          &larr; All work
        </Link>
      </section>
    </div>
  );
}
