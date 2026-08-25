import { type MouseEvent } from 'react';
import { useDeck } from '../lib/useDeck';
import { slideNote } from '../lib/deck';
import { useTheme, type WipeOrigin } from '../lib/useTheme';

/* The theme wipe expands from wherever the toggle was activated. Keyboard
 * activation reports 0,0 for the pointer, so fall back to the button's own
 * centre and the circle still starts somewhere meaningful. */
function wipeOrigin(e: MouseEvent<HTMLButtonElement>): WipeOrigin {
  if (e.clientX || e.clientY) return { x: e.clientX, y: e.clientY };
  const r = e.currentTarget.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

export function Footer() {
  const { slide, go, atStart, atEnd, detailOpen } = useDeck();
  const { theme, setTheme } = useTheme();

  return (
    <footer className="footbar">
      <div className="footbar-inner">
        <div className="footsteps">
          <button
            type="button"
            className="stepbtn"
            onClick={() => go(-1)}
            disabled={atStart || detailOpen}
            aria-label="Previous slide"
          >
            &uarr;
          </button>
          <button
            type="button"
            className="stepbtn"
            onClick={() => go(1)}
            disabled={atEnd || detailOpen}
            aria-label="Next slide"
          >
            &darr;
          </button>
        </div>

        <span className="footnote mono">{slideNote(slide)}</span>

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
