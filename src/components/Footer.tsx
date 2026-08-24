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
        color: 'color-mix(in srgb, var(--color-text) 58%, transparent)',
      }}
    >
      <button type="button" className="btn btn-secondary" onClick={() => step(-1)} style={{ padding: '4px 11px' }}>
        ←
      </button>
      <button type="button" className="btn btn-secondary" onClick={() => step(1)} style={{ padding: '4px 11px' }}>
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
