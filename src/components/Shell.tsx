import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { NavPill } from './NavPill';
import { Footer } from './Footer';
import { useViewMeta } from '../lib/useViewMeta';
import { useStep } from '../lib/useStep';

export function Shell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { inDetail } = useViewMeta();
  const step = useStep();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === 'Escape' && inDetail) {
        navigate('/');
        return;
      }
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inDetail, navigate, step]);

  // The document scrolls now, so a route change has to return to the top —
  // otherwise you land halfway down the next page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="shell">
      <Link to="/" className="namemark" aria-label="Graydon Wasil — home">
        <span className="namemark-full">Graydon Wasil</span>
        <span className="namemark-short" aria-hidden="true">GW</span>
      </Link>

      <NavPill />

      <main className="page">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
