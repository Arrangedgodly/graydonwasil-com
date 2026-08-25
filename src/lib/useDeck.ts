import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SLIDES, clampIndex, isDetailPath, slideIndexForPath } from './deck';

/** Travel direction, carried on the navigation itself rather than inferred by
 *  comparing renders — a ref read during render is not reliable, and the
 *  direction is genuinely a property of the move, not of the destination. */
export interface DeckNavState {
  dir?: 1 | -1;
}

export function directionBetween(fromPath: string, toPath: string): 1 | -1 {
  return slideIndexForPath(toPath) >= slideIndexForPath(fromPath) ? 1 : -1;
}

export function useDeck() {
  const navigate = useNavigate();
  const location = useLocation();

  const index = slideIndexForPath(location.pathname);
  const detailOpen = isDetailPath(location.pathname);
  const direction = (location.state as DeckNavState | null)?.dir ?? 1;

  const goTo = useCallback(
    (i: number) => {
      const target = SLIDES[clampIndex(i)];
      if (!target || target.path === location.pathname) return;
      navigate(target.path, {
        state: { dir: directionBetween(location.pathname, target.path) } satisfies DeckNavState,
      });
    },
    [navigate, location.pathname],
  );

  const go = useCallback(
    (delta: 1 | -1) => {
      // A deeper view owns the gesture while it is open; moving the deck
      // underneath it would be disorienting.
      if (detailOpen) return;
      goTo(index + delta);
    },
    [detailOpen, goTo, index],
  );

  return {
    index,
    slide: SLIDES[index],
    count: SLIDES.length,
    direction,
    detailOpen,
    go,
    goTo,
    atStart: index === 0,
    atEnd: index === SLIDES.length - 1,
  };
}
