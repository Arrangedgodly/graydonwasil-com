import { Link } from 'react-router-dom';

export function Intro() {
  return (
    <section className="pane" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'safe center', gap: 'clamp(10px,2.2vh,32px)' }}>
      <h2 className="disp" style={{ fontSize: 'clamp(28px,min(6.2vw,8.2vh),82px)' }}>
        <span className="line">I build software</span>
        <span className="line">for the things I'm</span>
        <span className="line">already into.</span>
      </h2>
      <p style={{ fontSize: 'clamp(13.5px,min(1.25vw,2.1vh),18px)', lineHeight: 1.55, margin: 0, maxWidth: '62ch', color: 'color-mix(in srgb, var(--color-text) 84%, transparent)' }}>
        Lyrics, records, die-cast cars, video games. I take an ordinary week's obsessions and build the tool
        each one was missing — then put it on the internet and keep it running. Three of those are live right
        now.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/work" className="btn btn-primary">See the work →</Link>
        <Link to="/about" className="btn btn-secondary">Who I am</Link>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', borderTop: '1px solid var(--color-divider)', borderBottom: '1px solid var(--color-divider)' }}>
        <Stat label="Live projects" value="Three, all shipped" />
        <Stat label="Day job" value="Senior online banker" />
        <Stat label="Taught by" value="Building the thing" />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span className="mono" style={{ color: 'var(--color-accent-700)', display: 'block', marginBottom: 5 }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 'clamp(16px,min(1.9vw,2.9vh),28px)' }}>{value}</span>
    </div>
  );
}
