import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { EXPERIMENTS, type Experiment } from '../data/projects';
import { useDeck } from '../lib/useDeck';

type ExperimentOrder = 'curated' | 'alphabetical' | 'newest';

const ORDER_LABELS: Record<ExperimentOrder, string> = {
  curated: 'Curated',
  alphabetical: 'A-Z',
  newest: 'Newest',
};

function nextOrder(order: ExperimentOrder): ExperimentOrder {
  if (order === 'curated') return 'alphabetical';
  if (order === 'alphabetical') return 'newest';
  return 'curated';
}

function StackCard({ experiment, index, depth, onSelect }: {
  experiment: Experiment;
  index: number;
  depth: 0 | 1 | 2;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className="experiment-stack-card"
      data-depth={depth}
      data-project={experiment.id}
      onClick={onSelect}
      aria-current={depth === 0 ? 'true' : undefined}
    >
      <span className="experiment-stack-kicker mono">{experiment.tags.join(' / ')}</span>
      <span className="experiment-stack-title disp">{experiment.title}</span>
      <span className="experiment-stack-index mono">{String(index + 1).padStart(2, '0')}</span>
    </button>
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
  const { go } = useDeck();
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
      // Keep the nested stack in step with the site-wide deck navigation.
      if (Math.abs(wheelAccumulation.current) < 60) return;

      wheelAccumulation.current = 0;
      wheelLocked.current = true;
      selectIndex(nextIndex);
      window.setTimeout(() => { wheelLocked.current = false; }, 520);
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
      className="experiments-slide experiments-stack-slide"
      ref={surfaceRef}
      onPointerDownCapture={ownTouchStart}
      onPointerMoveCapture={ownTouchMove}
      onPointerUpCapture={ownTouchEnd}
      onPointerCancelCapture={() => { touchStartY.current = null; }}
    >
      <div className="experiments-heading">
        <div className="experiments-heading-row">
          <h2 className="disp">Experiments</h2>
          <button
            type="button"
            className="experiments-sort mono"
            onClick={() => setOrder(nextOrder(order))}
            aria-label={`Order experiments by ${ORDER_LABELS[nextOrder(order)]}`}
          >
            Order: {ORDER_LABELS[order]}
          </button>
        </div>
        <p>Scroll through small interactive builds, made quickly and curiously with AI-assisted tools.</p>
      </div>

      <div className="experiments-stack-layout" data-direction={direction > 0 ? 'down' : 'up'}>
        <div className="experiments-stack" key={selected.id} aria-label="Experiment stack">
          {([0, 1, 2] as const).map((depth) => {
            const index = selectedIndex + depth;
            const experiment = visibleExperiments[index];
            return experiment && <StackCard
              key={experiment.id}
              experiment={experiment}
              index={index}
              depth={depth}
              onSelect={() => selectIndex(index)}
            />;
          })}
        </div>

        <section className="experiment-detail blueprint">
          {selected.thumbnail ? (
            <img src={selected.thumbnail} alt="" />
          ) : (
            <div className="experiment-detail-mark" aria-hidden="true">{selected.title.slice(0, 1)}</div>
          )}
          <div className="experiment-detail-copy">
            <h3 className="disp">{selected.title}</h3>
            <p>{selected.description}</p>
            <div className="tagrun">
              {selected.tags.map((tag) => <span className="tag tag-outline" key={tag}>{tag}</span>)}
            </div>
            <div className="experiment-detail-actions">
              <a className="btn btn-primary" href={selected.url} target="_blank" rel="noreferrer">Open experiment ↗</a>
              {selected.sourceUrl && <a className="experiment-source mono" href={selected.sourceUrl} target="_blank" rel="noreferrer">Source ↗</a>}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
