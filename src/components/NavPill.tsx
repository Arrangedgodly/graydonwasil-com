import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { m, useReducedMotion } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { VIEWS } from '../lib/nav';
import { navKeyFor } from '../lib/deck';
import { useDeck, directionBetween } from '../lib/useDeck';
import { SPRING_SNAP, INSTANT } from '../lib/motion';

export function NavPill() {
  const { slide } = useDeck();
  const location = useLocation();
  const reduce = useReducedMotion();
  const activeKey = navKeyFor(slide);

  const [menuOpen, setMenuOpen] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  /* Work opens a list rather than jumping to whichever project happens to be
   * first — three projects is few enough that picking one directly beats
   * landing on a default and stepping from there. */
  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!slotRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setMenuOpen(false);
      }
    };
    // A wheel gesture closes the menu rather than moving the deck behind it,
    // so one gesture has one effect.
    const onWheel = () => setMenuOpen(false);

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', onWheel);
    };
  }, [menuOpen]);

  return (
    <nav className="navpill" aria-label="Sections" data-menu-open={menuOpen ? 'true' : undefined}>
      <div className="navpill-list">
        <div className="navpill-slot" ref={slotRef}>
          <button
            type="button"
            className="navpill-item"
            data-on={activeKey === 'work' ? '1' : '0'}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {activeKey === 'work' && (
              <m.span
                layoutId="navpill-indicator"
                className="navpill-ind"
                aria-hidden="true"
                transition={reduce ? INSTANT : SPRING_SNAP}
              />
            )}
            <span className="navpill-label">Work</span>
            <span className="navpill-caret" aria-hidden="true" data-open={menuOpen ? '1' : '0'}>
              &#9662;
            </span>
          </button>

          {menuOpen && (
            <m.ul
              className="navmenu"
              initial={reduce ? undefined : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? INSTANT : { duration: 0.16 }}
            >
              {PROJECTS.map((p) => {
                const path = `/projects/${p.id}`;
                const current = slide.key === p.id;
                return (
                  <li key={p.id}>
                    <Link
                      to={path}
                      state={{ dir: directionBetween(location.pathname, path) }}
                      onClick={() => setMenuOpen(false)}
                      data-on={current ? '1' : '0'}
                      aria-current={current ? 'true' : undefined}
                    >
                      <span className="mono navmenu-num">{p.num}</span>
                      <span className="navmenu-title">{p.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  to="/experiments"
                  state={{ dir: directionBetween(location.pathname, '/experiments') }}
                  onClick={() => setMenuOpen(false)}
                  data-on={slide.kind === 'experiments' ? '1' : '0'}
                  aria-current={slide.kind === 'experiments' ? 'true' : undefined}
                >
                  <span className="mono navmenu-num">+</span>
                  <span className="navmenu-title">Experiments</span>
                </Link>
              </li>
            </m.ul>
          )}
        </div>

        {VIEWS.filter((v) => v.key !== 'work').map((v) => {
          const on = activeKey === v.key;
          return (
            <Link
              key={v.key}
              to={v.path}
              state={{ dir: directionBetween(location.pathname, v.path) }}
              className="navpill-item"
              data-on={on ? '1' : '0'}
              aria-current={on ? 'page' : undefined}
            >
              {on && (
                <m.span
                  layoutId="navpill-indicator"
                  className="navpill-ind"
                  aria-hidden="true"
                  transition={reduce ? INSTANT : SPRING_SNAP}
                />
              )}
              <span className="navpill-label">{v.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
