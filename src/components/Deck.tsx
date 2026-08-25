import { AnimatePresence, m, useReducedMotion, type Variants } from 'motion/react';
import { useDeck } from '../lib/useDeck';
import { useWheelNav } from '../lib/useDeckDrivers';
import { ProjectSlide } from './ProjectSlide';
import { ProgressRail } from './ProgressRail';
import { Hero } from '../pages/Hero';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';

/* Slides enter from the direction the deck is travelling and leave the
 * opposite way, so a move reads as the content having scrolled past even
 * though nothing scrolls. */
const TRAVEL = 56;

const variants: Variants = {
  enter: (direction: number) => ({ opacity: 0, y: direction > 0 ? TRAVEL : -TRAVEL }),
  center: { opacity: 1, y: 0 },
  exit: (direction: number) => ({ opacity: 0, y: direction > 0 ? -TRAVEL : TRAVEL }),
};

export function Deck() {
  const { slide, direction, go, index, count, goTo } = useDeck();
  const reduce = useReducedMotion();

  useWheelNav(go);

  return (
    <div className="deck">
      <ProgressRail index={index} count={count} goTo={goTo} />

      <AnimatePresence custom={direction} initial={false}>
        <m.section
          key={slide.key}
          className="stage"
          custom={direction}
          variants={reduce ? undefined : variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={
            reduce ? { duration: 0 } : { duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }
          }
          aria-label={slide.label}
        >
          {slide.kind === 'hero' && <Hero />}
          {slide.kind === 'project' && slide.project && <ProjectSlide project={slide.project} />}
          {slide.kind === 'about' && <About />}
          {slide.kind === 'contact' && <Contact />}
        </m.section>
      </AnimatePresence>
    </div>
  );
}
