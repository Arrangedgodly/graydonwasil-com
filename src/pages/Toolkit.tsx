interface Skill {
  title: string;
  body: string;
  tags: string[];
}

const SKILLS: Skill[] = [
  {
    title: 'Front of house',
    body: "JavaScript, React, HTML and CSS written by hand. I care more about the thing feeling fast and reading clearly than about which framework got it there.",
    tags: ['JavaScript', 'React', 'CSS'],
  },
  {
    title: 'Data & APIs',
    body: "Schemas, queries, auth, third-party APIs. Years in online banking taught me to treat other people's records as sacred and their sessions as fragile.",
    tags: ['SQL', 'REST', 'Auth'],
  },
  {
    title: 'Odd corners',
    body: 'Max for Live, Web Audio, game loops, sourdough hydration math. The strange corners are usually where the interesting problems are hiding.',
    tags: ['Max for Live', 'Web Audio', 'Game loops'],
  },
];

export function Toolkit() {
  return (
    <section className="pane" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,2vh,26px)' }}>
      <p style={{ margin: 0, fontSize: 'clamp(13.5px,min(1.4vw,2.1vh),19px)', lineHeight: 1.45, maxWidth: '70ch' }}>
        Self-taught, project by project. Nothing on this list is here because I read about it — it's here
        because something I wanted didn't exist yet.
      </p>
      <div className="grid3" style={{ alignItems: 'stretch' }}>
        {SKILLS.map((s) => (
          <div key={s.title} className="blueprint" style={{ padding: 'clamp(12px,1.9vh,22px)', display: 'flex', flexDirection: 'column', gap: 'clamp(7px,1.2vh,12px)' }}>
            <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
            <h3 className="pt" style={{ fontSize: 'clamp(16px,min(1.6vw,2.7vh),23px)' }}>{s.title}</h3>
            <p style={{ margin: 0, fontSize: 'clamp(12.5px,min(1.05vw,1.75vh),14.5px)', lineHeight: 1.45, color: 'color-mix(in srgb, var(--color-text) 80%, transparent)' }}>
              {s.body}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 'auto' }}>
              {s.tags.map((t) => (
                <span key={t} className="tag tag-outline">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
