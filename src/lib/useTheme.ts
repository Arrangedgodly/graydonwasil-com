import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

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

export function setTheme(theme: Theme) {
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

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'dark' as Theme);
  return {
    theme,
    isDark: theme === 'dark',
    toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    setTheme,
  };
}
