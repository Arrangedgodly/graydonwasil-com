import { useRef, type ReactNode } from 'react';
import { animate, m, useMotionValue, useReducedMotion, useTransform, type PanInfo } from 'motion/react';
import { useStep, useStepTargets } from '../lib/useStep';
import { usePointerCoarse } from '../lib/usePointerCoarse';
import { SPRING_SNAP, INSTANT } from '../lib/motion';

/** Raw horizontal travel, in px, that commits the navigation. */
const COMMIT_PX = 70;
/** A quick flick commits on velocity even if it never travelled that far. */
const COMMIT_VELOCITY = 500;
/** The page follows the finger at less than 1:1 so the gesture feels resisted
 *  and a stray horizontal wobble during a vertical scroll barely registers. */
const DRAG_RATIO = 0.45;
/** Movement before the gesture commits to an axis. */
const AXIS_DEADZONE = 10;
/** How much horizontal has to beat vertical to count as a swipe rather than a
 *  scroll that drifted sideways. */
const AXIS_BIAS = 1.5;

export function SwipeArea({ children }: { children: ReactNode }) {
  const step = useStep();
  const { next, prev } = useStepTargets();
  const coarse = usePointerCoarse();
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const axis = useRef<'none' | 'x' | 'y'>('none');

  // Ranges are in dragged pixels, which are already damped by DRAG_RATIO.
  const nextOpacity = useTransform(x, [-COMMIT_PX * DRAG_RATIO, -14, 0], [1, 0, 0]);
  const prevOpacity = useTransform(x, [0, 14, COMMIT_PX * DRAG_RATIO], [0, 0, 1]);

  const onPan = (_: PointerEvent, info: PanInfo) => {
    if (axis.current === 'none') {
      const ax = Math.abs(info.offset.x);
      const ay = Math.abs(info.offset.y);
      if (ax < AXIS_DEADZONE && ay < AXIS_DEADZONE) return;
      axis.current = ax > ay * AXIS_BIAS ? 'x' : 'y';
    }
    if (axis.current === 'x') x.set(info.offset.x * DRAG_RATIO);
  };

  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    const committed =
      axis.current === 'x' &&
      (Math.abs(info.offset.x) > COMMIT_PX || Math.abs(info.velocity.x) > COMMIT_VELOCITY);

    if (committed) step(info.offset.x < 0 ? 1 : -1);

    animate(x, 0, reduce ? INSTANT : SPRING_SNAP);
    axis.current = 'none';
  };

  const gestures = coarse ? { onPan, onPanEnd } : {};

  return (
    <>
      {coarse && (
        <>
          <m.div className="peek peek-prev" style={{ opacity: prevOpacity }} aria-hidden="true">
            <span className="mono">&larr; {prev}</span>
          </m.div>
          <m.div className="peek peek-next" style={{ opacity: nextOpacity }} aria-hidden="true">
            <span className="mono">{next} &rarr;</span>
          </m.div>
        </>
      )}

      <m.main className="page" style={coarse ? { x } : undefined} {...gestures}>
        {children}
      </m.main>
    </>
  );
}
