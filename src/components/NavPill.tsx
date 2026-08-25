import { Link } from 'react-router-dom';
import { m, useReducedMotion } from 'motion/react';
import { VIEWS } from '../lib/nav';
import { useViewMeta } from '../lib/useViewMeta';
import { SPRING_SNAP, INSTANT } from '../lib/motion';

/* The indicator renders inside whichever item is active and carries a shared
 * layoutId, so Motion morphs it between items — position and width — without
 * anything measuring the DOM by hand. */

export function NavPill() {
  const { view } = useViewMeta();
  const reduce = useReducedMotion();

  return (
    <nav className="navpill" aria-label="Sections">
      <div className="navpill-list">
        {VIEWS.map((v) => {
          const on = view.path === v.path;
          return (
            <Link
              key={v.path}
              to={v.path}
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
