import { Link, useLocation } from 'react-router-dom';
import { m, useReducedMotion } from 'motion/react';
import { VIEWS } from '../lib/nav';
import { navKeyFor } from '../lib/deck';
import { useDeck, directionBetween } from '../lib/useDeck';
import { SPRING_SNAP, INSTANT } from '../lib/motion';

export function NavPill() {
  const { slide } = useDeck();
  const location = useLocation();
  const reduce = useReducedMotion();
  const activeKey = navKeyFor(slide);

  return (
    <nav className="navpill" aria-label="Sections">
      <div className="navpill-list">
        {VIEWS.map((v) => {
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
