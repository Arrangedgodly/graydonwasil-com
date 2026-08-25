import { useRef, type ReactNode } from 'react';
import { animate, m, useMotionValue, useReducedMotion, useTransform, type PanInfo } from 'motion/react';
import { SLIDES } from '../lib/deck';
import { useDeck } from '../lib/useDeck';
import { usePointerCoarse } from '../lib/usePointerCoarse';
import { SPRING_SNAP, INSTANT } from '../lib/motion';

/** Raw vertical travel, in px, that commits the move. */
const COMMIT_PX = 70;
/** A quick flick commits on velocity even if it never travelled that far. */
const COMMIT_VELOCITY = 500;
/** The stage follows the finger at less than 1:1, so the gesture feels
 *  resisted and a stray wobble barely registers. */
const DRAG_RATIO = 0.4;
const AXIS_DEADZONE = 10;
/** How much vertical has to beat horizontal to count as a deck move. */
const AXIS_BIAS = 1.5;

/* The deck moves vertically, so the swipe does too — dragging up brings the
 * next slide in, which is the gesture people already use to scroll. */
export function SwipeArea({
  children,
  onStep,
  enabled = true,
}: {
  children: ReactNode;
  onStep: (delta: 1 | -1) => void;
  enabled?: boolean;
}) {
  const { index } = useDeck();
  const coarse = usePointerCoarse();
  const reduce = useReducedMotion();

  const y = useMotionValue(0);
  const axis = useRef<'none' | 'x' | 'y'>('none');

  const nextOpacity = useTransform(y, [-COMMIT_PX * DRAG_RATIO, -12, 0], [1, 0, 0]);
  const prevOpacity = useTransform(y, [0, 12, COMMIT_PX * DRAG_RATIO], [0, 0, 1]);

  const active = coarse && enabled;
  const next = SLIDES[index + 1];
  const prev = SLIDES[index - 1];

  const onPan = (_: PointerEvent, info: PanInfo) => {
    if (axis.current === 'none') {
      const ax = Math.abs(info.offset.x);
      const ay = Math.abs(info.offset.y);
      if (ax < AXIS_DEADZONE && ay < AXIS_DEADZONE) return;
      axis.current = ay > ax * AXIS_BIAS ? 'y' : 'x';
    }
    if (axis.current === 'y') y.set(info.offset.y * DRAG_RATIO);
  };

  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    const committed =
      axis.current === 'y' &&
      (Math.abs(info.offset.y) > COMMIT_PX || Math.abs(info.velocity.y) > COMMIT_VELOCITY);

    if (committed) onStep(info.offset.y < 0 ? 1 : -1);

    animate(y, 0, reduce ? INSTANT : SPRING_SNAP);
    axis.current = 'none';
  };

  const gestures = active ? { onPan, onPanEnd } : {};

  return (
    <>
      {active && prev && (
        <m.div className="peek peek-prev" style={{ opacity: prevOpacity }} aria-hidden="true">
          <span className="mono">&uarr; {prev.label}</span>
        </m.div>
      )}
      {active && next && (
        <m.div className="peek peek-next" style={{ opacity: nextOpacity }} aria-hidden="true">
          <span className="mono">{next.label} &darr;</span>
        </m.div>
      )}

      <m.div className="swipe" style={active ? { y } : undefined} {...gestures}>
        {children}
      </m.div>
    </>
  );
}
