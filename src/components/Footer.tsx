import { useViewMeta } from '../lib/useViewMeta';
import { useStep } from '../lib/useStep';

export function Footer() {
  const { footNote, pageCount } = useViewMeta();
  const step = useStep();

  return (
    <footer
      style={{
        flex: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '10px clamp(20px,3.2vw,44px)',
        borderTop: '1px solid var(--color-divider)',
        fontSize: 12,
        color: 'color-mix(in srgb, var(--color-text) 66%, transparent)',
      }}
    >
      <button type="button" className="btn btn-secondary" onClick={() => step(-1)} style={{ minWidth: 44, minHeight: 44 }}>
        ←
      </button>
      <button type="button" className="btn btn-secondary" onClick={() => step(1)} style={{ minWidth: 44, minHeight: 44 }}>
        →
      </button>
      <span
        className="mono"
        style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        {footNote}
      </span>
      <span className="mono">{pageCount}</span>
    </footer>
  );
}
