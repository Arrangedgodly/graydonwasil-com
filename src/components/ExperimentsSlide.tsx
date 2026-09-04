import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent, type RefObject } from 'react';
import { EXPERIMENTS, type Experiment } from '../data/projects';
import { applyExperimentPalette, clearExperimentPalette, setExperimentPaletteEngaged } from '../lib/experimentPalette';
import { useDeck } from '../lib/useDeck';
import { useTheme } from '../lib/useTheme';

type ExperimentOrder = 'curated' | 'alphabetical' | 'newest';

const ORDER_LABELS: Record<ExperimentOrder, string> = {
  curated: 'Curated',
  alphabetical: 'A-Z',
  newest: 'Newest',
};

function ExperimentCard({ experiment, index, count, cardRef }: {
  experiment: Experiment;
  index: number;
  count: number;
  cardRef: RefObject<HTMLElement | null>;
}) {
  const titleId = `experiment-${experiment.id}-title`;

  return (
    <article
      ref={cardRef}
      className="experiment-card"
      data-project={experiment.id}
      aria-labelledby={titleId}
      tabIndex={0}
      onPointerEnter={() => setExperimentPaletteEngaged(true)}
      onPointerLeave={() => setExperimentPaletteEngaged(false)}
      onFocusCapture={() => setExperimentPaletteEngaged(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setExperimentPaletteEngaged(false);
        }
      }}
    >
      <div className="experiment-card-meta mono">
        <span className="experiment-card-kicker">{experiment.tags.join(' / ')}</span>
        <span className="experiment-card-index">{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
      </div>

      <div className="experiment-card-copy">
        <h3 className="experiment-card-title disp" id={titleId}>{experiment.title}</h3>
        <p>{experiment.description}</p>
        <div className="experiment-card-actions">
          <a className="btn btn-primary" href={experiment.url} target="_blank" rel="noreferrer">Try it ↗</a>
          {experiment.sourceUrl && <a className="experiment-card-source mono" href={experiment.sourceUrl} target="_blank" rel="noreferrer">Browse source ↗</a>}
        </div>
      </div>

      <div className="experiment-card-media" aria-hidden="true">
        {experiment.thumbnail ? (
          <img src={experiment.thumbnail} alt="" />
        ) : (
          <div className="experiment-card-mark">{experiment.title.slice(0, 1)}</div>
        )}
      </div>
    </article>
  );
}

export function ExperimentsSlide() {
  const [selectedId, setSelectedId] = useState(EXPERIMENTS[0].id);
  const [order, setOrder] = useState<ExperimentOrder>('curated');
  const [direction, setDirection] = useState<1 | -1>(1);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const wheelAccumulation = useRef(0);
  const wheelLocked = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const cardRef = useRef<HTMLElement>(null);
  const { go } = useDeck();
  const { theme } = useTheme();
  const visibleExperiments = useMemo(() => {
    if (order === 'curated') return EXPERIMENTS;
    return [...EXPERIMENTS].sort((a, b) => (
      order === 'alphabetical'
        ? a.title.localeCompare(b.title)
        : b.createdAt.localeCompare(a.createdAt) || a.title.localeCompare(b.title)
    ));
  }, [order]);
  const selectedIndex = Math.max(0, visibleExperiments.findIndex((experiment) => experiment.id === selectedId));
  const selected = visibleExperiments[selectedIndex] ?? visibleExperiments[0];

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;
    applyExperimentPalette(card, theme);
    return clearExperimentPalette;
  }, [selected.id, theme]);

  const selectIndex = useCallback((index: number) => {
    const next = visibleExperiments[index];
    if (!next || next.id === selected.id) return;
    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedId(next.id);
  }, [selected.id, selectedIndex, visibleExperiments]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return undefined;

    const onWheel = (event: WheelEvent) => {
      const step: 1 | -1 = event.deltaY > 0 ? 1 : -1;
      const nextIndex = selectedIndex + step;

      // At either end, leave the gesture alone so the main deck continues to
      // the neighbouring section. Everywhere else, this small deck owns it.
      if (nextIndex < 0 || nextIndex >= visibleExperiments.length) {
        // The first boundary gesture after a card change is usually leftover
        // trackpad momentum. Keep it in this surface; a fresh gesture exits.
        if (wheelLocked.current) event.preventDefault();
        return;
      }

      event.preventDefault();
      if (wheelLocked.current) return;
      wheelAccumulation.current += event.deltaY;
      // The card browser is denser than the page deck, so it gets a
      // shorter momentum hold after each committed card change.
      if (Math.abs(wheelAccumulation.current) < 60) return;

      wheelAccumulation.current = 0;
      wheelLocked.current = true;
      selectIndex(nextIndex);
      window.setTimeout(() => { wheelLocked.current = false; }, 180);
    };

    surface.addEventListener('wheel', onWheel, { passive: false });
    return () => surface.removeEventListener('wheel', onWheel);
  }, [selectIndex, selectedIndex, visibleExperiments.length]);

  const ownTouchStart = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') return;
    touchStartY.current = event.clientY;
    event.stopPropagation();
  };

  const ownTouchMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' && touchStartY.current !== null) event.stopPropagation();
  };

  const ownTouchEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' || touchStartY.current === null) return;

    const travel = event.clientY - touchStartY.current;
    touchStartY.current = null;
    event.stopPropagation();
    if (Math.abs(travel) < 70) return;

    const step: 1 | -1 = travel < 0 ? 1 : -1;
    const nextIndex = selectedIndex + step;
    if (nextIndex >= 0 && nextIndex < visibleExperiments.length) {
      selectIndex(nextIndex);
      return;
    }
    go(step);
  };

  return (
    <div
      className="experiments-slide experiments-showcase-slide"
      ref={surfaceRef}
      onPointerDownCapture={ownTouchStart}
      onPointerMoveCapture={ownTouchMove}
      onPointerUpCapture={ownTouchEnd}
      onPointerCancelCapture={() => { touchStartY.current = null; }}
    >
      <div className="experiments-heading">
        <div className="experiments-heading-row">
          <h2 className="disp">Experiments</h2>
        </div>
        <p>I use small AI builds to test ideas and see what breaks.</p>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Experiment {selectedIndex + 1} of {visibleExperiments.length}: {selected.title}
      </p>

      <div className="experiments-showcase" data-direction={direction > 0 ? 'down' : 'up'}>
        <div className="experiments-controls">
          <label className="experiments-order mono">
            <span>Order</span>
            <select className="input" value={order} onChange={(event) => setOrder(event.target.value as ExperimentOrder)}>
              {Object.entries(ORDER_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className="experiments-picker mono">
            <span>Jump to</span>
            <select
              className="input"
              value={selected.id}
              onChange={(event) => selectIndex(visibleExperiments.findIndex((item) => item.id === event.target.value))}
            >
              {visibleExperiments.map((experiment) => (
                <option key={experiment.id} value={experiment.id}>{experiment.title}</option>
              ))}
            </select>
          </label>
        </div>
        <ExperimentCard
          key={selected.id}
          experiment={selected}
          index={selectedIndex}
          count={visibleExperiments.length}
          cardRef={cardRef}
        />
      </div>
    </div>
  );
}
