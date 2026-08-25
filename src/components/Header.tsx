import { Link } from 'react-router-dom';
import { useViewMeta } from '../lib/useViewMeta';

export function Header() {
  const { crumbNum, crumbTitle, inDetail, hint } = useViewMeta();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px clamp(20px,3.2vw,44px)',
        borderBottom: '1px solid var(--color-divider)',
        flex: 'none',
      }}
    >
      <span className="mono" style={{ color: 'var(--color-accent-700)' }}>{crumbNum}</span>
      <span
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: '.09em',
          textTransform: 'uppercase',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {crumbTitle}
      </span>
      {inDetail && (
        <Link to="/work" className="btn btn-secondary" style={{ padding: '5px 12px', minHeight: 44 }}>
          ← All work
        </Link>
      )}
      <span className="mono" style={{ color: 'color-mix(in srgb, var(--color-text) 66%, transparent)' }}>
        {hint}
      </span>
    </header>
  );
}
