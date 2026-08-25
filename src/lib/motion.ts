import type { Transition } from 'motion/react';

/* Shared spring presets, so the nav indicator and the project open read as
 * the same piece of physics rather than two unrelated animations. */

export const SPRING_SNAP: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
  mass: 0.7,
};

/* The project open travels the distance between the exhibit's document
 * position and the hero's, because opening a project also resets the scroll —
 * Motion measures layout in document space, so that reset becomes travel.
 * Clicking the third exhibit therefore moves the frame most of a page. Kept
 * deliberately stiff so a long sweep resolves quickly instead of drifting. */
export const SPRING_OPEN: Transition = {
  type: 'spring',
  stiffness: 360,
  damping: 38,
  mass: 0.8,
};

export const INSTANT: Transition = { duration: 0 };
