import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FILTERS, PROJECTS, type Project } from '../data/projects';
import { Shot } from '../components/Shot';
import { useIsMobile } from '../lib/useIsMobile';

function cardThumb(p: Project, isMobile: boolean) {
  const first = p.gallery?.variants[0];
  if (first) {
    return {
      imageKey: `${p.id}-variant-${first.key}${isMobile ? '-mobile' : ''}`,
      label: first.label,
      alt: first.label,
    };
  }
  return { imageKey: `${p.id}-1`, label: p.shots[0].split(' — ')[0], alt: p.shots[0] };
}

export function Work() {
  const [filter, setFilter] = useState('All');
  const isMobile = useIsMobile();
  const visible = PROJECTS.filter((p) => filter === 'All' || p.tags.includes(filter));

  const resultNote =
    filter === 'All'
      ? 'Three projects, all live. Every one started as a problem in my own week.'
      : `${visible.length} of 3 tagged "${filter}" — the rest are dimmed, not gone.`;

  return (
    <section className="pane" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h2 className="sr-only">Work</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between', flex: 'none' }}>
        <p style={{ margin: 0, fontSize: 15, lineHeight: '22px', color: 'color-mix(in srgb, var(--color-text) 70%, transparent)' }}>
          {resultNote}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {FILTERS.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                className="chip"
                onClick={() => setFilter(f)}
                style={{
                  background: on ? 'var(--color-accent)' : 'transparent',
                  borderColor: on ? 'var(--color-accent)' : 'var(--color-divider)',
                  color: on ? 'var(--color-bg)' : 'var(--color-text)',
                }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid3">
        {PROJECTS.map((p) => {
          const shown = visible.includes(p);
          const thumb = cardThumb(p, isMobile);
          return (
            <Link key={p.id} to={`/work/${p.id}`} className="pcard" style={{ opacity: shown ? 1 : 0.3 }}>
              <Shot imageKey={thumb.imageKey} label={thumb.label} alt={thumb.alt} style={{ borderBottom: '1px solid var(--color-divider)' }} />
              <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 10, flex: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="mono" style={{ color: 'var(--color-accent-700)' }}>{p.num}</span>
                  <span className="mono" style={{ color: 'color-mix(in srgb, var(--color-text) 66%, transparent)' }}>{p.year}</span>
                </div>
                <h3 className="pt" style={{ fontSize: 'clamp(19px,1.6vw,24px)' }}>{p.title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: '21px', color: 'color-mix(in srgb, var(--color-text) 80%, transparent)' }}>
                  {p.tagline}
                </p>
                <span className="open mono" style={{ alignSelf: 'flex-start', marginTop: 2, border: '1px solid var(--color-accent)', color: 'var(--color-accent-700)', padding: '6px 12px' }}>
                  Open project →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
