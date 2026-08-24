import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Rail } from './Rail';
import { Header } from './Header';
import { Footer } from './Footer';
import { useViewMeta } from '../lib/useViewMeta';
import { useStep } from '../lib/useStep';

export function Shell() {
  const navigate = useNavigate();
  const { inDetail } = useViewMeta();
  const step = useStep();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key === 'Escape' && inDetail) {
        navigate('/work');
        return;
      }
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inDetail, navigate, step]);

  return (
    <div className="shell">
      <Rail />
      <main className="main">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
