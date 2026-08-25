import { Link } from 'react-router-dom';
import { VIEWS } from '../lib/nav';
import { useViewMeta } from '../lib/useViewMeta';

export function Rail() {
  const { view } = useViewMeta();

  return (
    <aside className="rail">
      <div className="railtop">
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: 'clamp(24px,2vw,34px)',
            lineHeight: 0.98,
            letterSpacing: '.03em',
            textTransform: 'uppercase',
            margin: '0 0 10px',
            whiteSpace: 'nowrap',
          }}
        >
          Graydon <span className="railbreak">Wasil</span>
        </h1>
        <p
          className="railblock"
          style={{
            margin: 0,
            fontSize: '14.5px',
            lineHeight: '22px',
            color: 'color-mix(in srgb, var(--color-text) 78%, transparent)',
          }}
        >
          I turn the things I can't stop thinking about into small, working software.
        </p>
      </div>

      <nav className="railnav">
        {VIEWS.map((v) => (
          <Link key={v.path} to={v.path} className="navitem" data-on={view.path === v.path ? '1' : '0'}>
            <span className="mono" style={{ color: 'color-mix(in srgb, var(--color-text) 66%, transparent)' }}>
              {v.num}
            </span>
            {v.label}
          </Link>
        ))}
      </nav>

      <div className="railblock" style={{ marginTop: 'auto' }}>
        <span className="mono" style={{ color: 'var(--color-accent-700)', display: 'block', marginBottom: 10 }}>
          Reach me
        </span>
        <div style={{ display: 'grid', gap: 6 }} className="mono">
          <a href="mailto:hello@graydonwasil.com" style={{ textTransform: 'none' }}>hello@graydonwasil.com</a>
          <a href="https://github.com/graydonwasil" target="_blank" rel="noreferrer" style={{ textTransform: 'none' }}>github.com/graydonwasil</a>
        </div>
        <Link to="/contact" className="btn btn-primary" style={{ marginTop: 16, width: '100%' }}>
          Get in touch
        </Link>
      </div>
    </aside>
  );
}
