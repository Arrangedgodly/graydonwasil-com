import { useState } from 'react';
import { EXPERIMENTS } from '../data/projects';

export function ExperimentsSlide() {
  const [selectedId, setSelectedId] = useState(EXPERIMENTS[0].id);
  const selected = EXPERIMENTS.find((experiment) => experiment.id === selectedId) ?? EXPERIMENTS[0];

  return (
    <div className="experiments-slide">
      <div className="experiments-heading">
        <h2 className="disp">Experiments</h2>
        <p>Small interactive builds, made quickly and curiously with AI-assisted tools.</p>
      </div>

      <div className="experiments-index">
        <div className="experiments-list" aria-label="Experiments">
        {EXPERIMENTS.map((experiment) => (
          <button
            type="button"
            key={experiment.id}
            data-on={experiment.id === selected.id ? '1' : '0'}
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
