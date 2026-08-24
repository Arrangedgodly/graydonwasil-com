import { useEffect, useState } from 'react';
import type { Project } from '../data/projects';
import { Shot } from './Shot';
import { useIsMobile } from '../lib/useIsMobile';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

const ROTATE_MS = 2800;

function resolveKey(projectId: string, kind: 'variant' | 'action', itemKey: string, mobile: boolean) {
  return `${projectId}-${kind}-${itemKey}${mobile ? '-mobile' : ''}`;
}

export function ProjectGallery({ project }: { project: Project }) {
  const gallery = project.gallery!;
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();

  const actions = (isMobile && gallery.mobileActions) || gallery.actions;

  const [mode, setMode] = useState<'variant' | 'action'>('variant');
  const [variantIndex, setVariantIndex] = useState(0);
  const [actionIndex, setActionIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // A shorter action list on mobile can leave actionIndex pointing past the
  // end, or mid-action-viewing when the viewport crosses the breakpoint.
  useEffect(() => {
    setMode('variant');
    setActionIndex(0);
  }, [isMobile]);

  useEffect(() => {
    if (mode !== 'variant' || reducedMotion || paused) return;
    const id = setInterval(() => {
      setVariantIndex((i) => (i + 1) % gallery.variants.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [mode, reducedMotion, paused, gallery.variants.length]);

  const active = mode === 'variant' ? gallery.variants[variantIndex] : actions[actionIndex];
  const heroKey = resolveKey(project.id, mode, active.key, isMobile);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
      <div
        className="duotone detailshot"
        style={{ border: '1px solid var(--color-divider)', position: 'relative' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Shot imageKey={heroKey} label={active.label} alt={active.label} style={{ height: '100%' }} />

        <span
          className="mono"
          style={{
            position: 'absolute',
            left: 10,
            bottom: 10,
            background: 'var(--color-bg)',
            color: 'var(--color-accent-700)',
            padding: '4px 9px',
            border: '1px solid var(--color-divider)',
          }}
        >
          {active.label}
        </span>

        {mode === 'variant' ? (
          <div style={{ position: 'absolute', right: 10, bottom: 10, display: 'flex', gap: 5 }}>
            {gallery.variants.map((v, i) => (
              <button
                key={v.key}
                type="button"
                aria-label={`Show ${v.label}`}
                onClick={() => setVariantIndex(i)}
                style={{
                  width: 8,
                  height: 8,
                  padding: 0,
                  border: '1px solid var(--color-bg)',
                  background: i === variantIndex ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-bg) 55%, var(--color-text))',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        ) : (
          <button
            type="button"
            className="mono"
            onClick={() => setMode('variant')}
            style={{
              position: 'absolute',
              right: 10,
              bottom: 10,
              background: 'var(--color-bg)',
              color: 'var(--color-accent-700)',
              padding: '4px 9px',
              border: '1px solid var(--color-divider)',
              cursor: 'pointer',
            }}
          >
            ← back to overview
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 10, flex: 'none' }}>
        {actions.map((a, i) => (
          <button
            key={a.key}
            type="button"
            className="thumb"
            onClick={() => {
              setMode('action');
              setActionIndex(i);
            }}
            style={{ borderColor: mode === 'action' && i === actionIndex ? 'var(--color-accent)' : 'var(--color-divider)' }}
          >
            <Shot imageKey={resolveKey(project.id, 'action', a.key, isMobile)} label={a.label} alt={a.label} style={{ aspectRatio: '16/9' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
