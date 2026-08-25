import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'dark' | 'light';

export interface WipeOrigin {
  x: number;
  y: number;
}

const KEY = 'gw-theme';

/* The site is dark-first: dark is the default and the intended presentation,
 * and an explicit light choice persists. index.html stamps data-theme on
 * <html> before first paint, so this module reads the DOM as its source of
 * truth rather than keeping a second copy that could disagree with it. */

const listeners = new Set<() => void>();

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Private browsing — the choice just will not survive a reload.
  }
  // Keep the mobile browser chrome in step with the page.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#eef3f5' : '#0a0e11');
  listeners.forEach((fn) => fn());
}

/* Flipping the theme also flips every project screenshot to its twin, and that
 * swap is React state — so the view transition has to snapshot *after* React
 * has re-rendered, hence flushSync. Without it the wipe reveals the new
 * palette over the old screenshots and they pop in a frame later. */
export function setTheme(theme: Theme, origin?: WipeOrigin) {
  const doc = document as ViewTransitionDocument;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || typeof doc.startViewTransition !== 'function') {
    applyTheme(theme);
    return;
  }

  const transition = doc.startViewTransition(() => {
    flushSync(() => applyTheme(theme));
  });

  transition.ready
    .then(() => {
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? window.innerHeight / 2;
      // Radius out to the furthest corner, so the circle clears the viewport.
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );

      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 520,
          easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      );
    })
    .catch(() => {
      // A transition can be skipped (a second click mid-wipe). The theme is
      // already applied by then, so there is nothing to recover.
    });
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'dark' as Theme);
  return {
    theme,
    isDark: theme === 'dark',
    toggle: (origin?: WipeOrigin) => setTheme(theme === 'dark' ? 'light' : 'dark', origin),
    setTheme,
  };
}
