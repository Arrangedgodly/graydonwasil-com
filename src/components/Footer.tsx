import { useEffect, useState, type MouseEvent } from 'react';
import { useViewMeta } from '../lib/useViewMeta';
import { useStep } from '../lib/useStep';
import { useTheme, type WipeOrigin } from '../lib/useTheme';

/* Fixed chrome costs vertical space permanently, which matters most on short
 * laptop windows — so the bar retreats while you are reading downward and
 * comes back the moment you scroll up looking for it. */
function useHideOnScrollDown(threshold = 120) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - last;
        // Ignore sub-pixel jitter and rubber-banding past the top.
        if (Math.abs(delta) > 4) {
          setHidden(y > threshold && delta > 0);
          last = y;
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return hidden;
}

/* The theme wipe expands from wherever the toggle was activated. Keyboard
 * activation reports 0,0 for the pointer, so fall back to the button's own
 * centre and the circle still starts somewhere meaningful. */
function wipeOrigin(e: MouseEvent<HTMLButtonElement>): WipeOrigin {
  if (e.clientX || e.clientY) return { x: e.clientX, y: e.clientY };
  const r = e.currentTarget.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

export function Footer() {
  const { footNote, inDetail } = useViewMeta();
  const step = useStep();
  const hidden = useHideOnScrollDown();
  const { theme, setTheme } = useTheme();

  return (
    <footer className="footbar" data-hidden={hidden ? '1' : '0'}>
      <div className="footbar-inner">
        <div className="footsteps">
          <button
            type="button"
            className="stepbtn"
            onClick={() => step(-1)}
            aria-label={inDetail ? 'Previous project' : 'Previous section'}
          >
            &#8592;
          </button>
          <button
            type="button"
            className="stepbtn"
            onClick={() => step(1)}
            aria-label={inDetail ? 'Next project' : 'Next section'}
          >
            &#8594;
          </button>
        </div>

        <span className="footnote mono">{footNote}</span>

        <div className="themetoggle" role="group" aria-label="Colour theme">
          <button
            type="button"
            className="mono"
            data-on={theme === 'dark' ? '1' : '0'}
            aria-pressed={theme === 'dark'}
            onClick={(e) => setTheme('dark', wipeOrigin(e))}
          >
            Dark
          </button>
          <button
            type="button"
            className="mono"
            data-on={theme === 'light' ? '1' : '0'}
            aria-pressed={theme === 'light'}
            onClick={(e) => setTheme('light', wipeOrigin(e))}
          >
            Light
          </button>
        </div>
      </div>
    </footer>
  );
}
