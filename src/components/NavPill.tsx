import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { VIEWS } from '../lib/nav';
import { useViewMeta } from '../lib/useViewMeta';

/* The active indicator is measured off the live DOM rather than derived from
 * index arithmetic, so it stays correct when label widths change — a font
 * swapping in, a viewport resize, or a label being edited. Stage 5 can swap
 * this for a Motion layoutId; the markup is already shaped for it. */

export function NavPill() {
  const { view } = useViewMeta();
  const listRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector<HTMLElement>('[data-on="1"]');
      if (active) setInd({ left: active.offsetLeft, width: active.offsetWidth });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [view.path]);

  // Webfonts land after first paint and change label widths, so re-measure once
  // they are ready rather than leaving the indicator on stale numbers.
  useEffect(() => {
    let cancelled = false;
    document.fonts?.ready.then(() => {
      const list = listRef.current;
      if (cancelled || !list) return;
      const active = list.querySelector<HTMLElement>('[data-on="1"]');
      if (active) setInd({ left: active.offsetLeft, width: active.offsetWidth });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <nav className="navpill" aria-label="Sections">
      <div className="navpill-list" ref={listRef}>
        <span
          className="navpill-ind"
          aria-hidden="true"
          style={ind ? { left: ind.left, width: ind.width, opacity: 1 } : undefined}
        />
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
              {v.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
