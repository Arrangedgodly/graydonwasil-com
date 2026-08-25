import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import { Shot } from '../components/Shot';
import { ProjectGallery } from '../components/ProjectGallery';
import { useStep } from '../lib/useStep';

export function ProjectDetail() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.id === slug);
  const [shot, setShot] = useState(0);
  const step = useStep();

  useEffect(() => setShot(0), [slug]);

  if (!project) return <Navigate to="/work" replace />;

  return (
    <section className="pane">
      <div className="dsplit">
        {project.gallery ? (
          <ProjectGallery key={project.id} project={project} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
            <div className="duotone detailshot" style={{ border: '1px solid var(--color-divider)' }}>
              <Shot imageKey={`${project.id}-${shot + 1}`} label={project.shots[shot]} style={{ height: '100%' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 10, flex: 'none' }}>
              {project.shots.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  className="thumb"
                  onClick={() => setShot(i)}
                  style={{ borderColor: i === shot ? 'var(--color-accent)' : 'var(--color-divider)' }}
                >
                  <Shot imageKey={`${project.id}-${i + 1}`} label={s.split(' — ')[0]} alt={s} style={{ aspectRatio: '16/9' }} />
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(7px,1.3vh,14px)', minHeight: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
            <h2 className="pt" style={{ fontSize: 'clamp(21px,min(2.6vw,4.1vh),34px)' }}>{project.title}</h2>
            <span className="mono" style={{ textTransform: 'none', color: 'var(--color-accent-700)' }}>{project.url}</span>
          </div>
          <p style={{ margin: 0, fontSize: 'clamp(13px,min(1.1vw,1.9vh),15.5px)', lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 84%, transparent)' }}>
            {project.blurb}
          </p>
          <div style={{ borderTop: '1px solid var(--color-divider)' }}>
            {project.bullets.map((b, i) => (
              <div
                key={b}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: 'clamp(4px,.85vh,9px) 0',
                  borderBottom: '1px solid color-mix(in srgb, var(--color-text) 8%, transparent)',
                  fontSize: 'clamp(12.5px,min(1.05vw,1.8vh),14.5px)',
                  lineHeight: 1.45,
                }}
              >
                <span className="mono" style={{ color: 'color-mix(in srgb, var(--color-text) 66%, transparent)' }}>
                  {'0' + (i + 1)}
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {project.stack.map((s) => (
              <span key={s} className="tag tag-outline">{s}</span>
            ))}
          </div>
          <div className="blueprint" style={{ padding: 'clamp(9px,1.5vh,16px) 16px' }}>
            <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
            <span className="mono" style={{ color: 'var(--color-accent-700)', display: 'block', marginBottom: 6 }}>
              What it taught me
            </span>
            <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(14.5px,min(1.5vw,2.5vh),20px)', lineHeight: 1.22 }}>
              {project.learned}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
            <a className="btn btn-primary" href={`https://${project.url}`} target="_blank" rel="noreferrer">
              Visit the site
            </a>
            <a className="btn btn-secondary" href="https://github.com/graydonwasil" target="_blank" rel="noreferrer">
              See the code
            </a>
            <button type="button" className="btn btn-ghost" onClick={() => step(1)}>
              Next project →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
