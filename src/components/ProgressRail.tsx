import { SLIDES } from '../lib/deck';

/* A deck needs to say where you are and how much is left — without it, moving
 * blind through six slides feels like the site is losing your place. */

export function ProgressRail({
  index,
  count,
  goTo,
}: {
  index: number;
  count: number;
  goTo: (i: number) => void;
}) {
  return (
    <nav className="rail" data-slide={SLIDES[index]?.kind} aria-label="Slides">
      <span className="mono rail-count">
        {String(index + 1).padStart(2, '0')}
        <span className="rail-total"> / {String(count).padStart(2, '0')}</span>
      </span>
      <ul className="rail-dots">
        {SLIDES.map((s, i) => (
          <li key={s.key}>
            <button
              type="button"
              data-on={i === index ? '1' : '0'}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => goTo(i)}
            >
              <span className="sr-only">{s.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
