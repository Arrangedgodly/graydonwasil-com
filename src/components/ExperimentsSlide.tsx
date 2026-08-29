import { useMemo, useState } from 'react';
import { EXPERIMENTS } from '../data/projects';

type ExperimentOrder = 'curated' | 'alphabetical' | 'newest';

const ORDER_LABELS: Record<ExperimentOrder, string> = {
  curated: 'Curated',
  alphabetical: 'A–Z',
  newest: 'Newest',
};

function nextOrder(order: ExperimentOrder): ExperimentOrder {
  if (order === 'curated') return 'alphabetical';
  if (order === 'alphabetical') return 'newest';
  return 'curated';
}

export function ExperimentsSlide() {
  const [selectedId, setSelectedId] = useState(EXPERIMENTS[0].id);
  const [order, setOrder] = useState<ExperimentOrder>('curated');
  const visibleExperiments = useMemo(() => {
    if (order === 'curated') return EXPERIMENTS;
    return [...EXPERIMENTS].sort((a, b) => (
      order === 'alphabetical'
        ? a.title.localeCompare(b.title)
        : b.createdAt.localeCompare(a.createdAt) || a.title.localeCompare(b.title)
    ));
  }, [order]);
  const selected = EXPERIMENTS.find((experiment) => experiment.id === selectedId) ?? EXPERIMENTS[0];

  return (
    <div className="experiments-slide">
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
        <p>Small interactive builds, made quickly and curiously with AI-assisted tools.</p>
      </div>

      <div className="experiments-index">
        <select
          className="experiments-mobile-select input"
          value={selected.id}
          onChange={(event) => setSelectedId(event.target.value)}
          aria-label="Choose an experiment"
        >
          {visibleExperiments.map((experiment) => <option key={experiment.id} value={experiment.id}>{experiment.title}</option>)}
        </select>
        <div className="experiments-list" aria-label="Experiments">
        {visibleExperiments.map((experiment) => (
          <button
            type="button"
            key={experiment.id}
            data-on={experiment.id === selected.id ? '1' : '0'}
            aria-pressed={experiment.id === selected.id}
            onClick={() => setSelectedId(experiment.id)}
          >
            <span className="pt">{experiment.title}</span>
            <span className="mono">View</span>
          </button>
        ))}
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
