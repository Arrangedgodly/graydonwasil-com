import { Placeholder } from '../components/Placeholder';

const CURRENTLY = [
  'Improving Rhymepage',
  'Learning what a sourdough starter actually wants',
  'Hanging out with my son as much as possible',
  'Waiting on Enter the Gungeon 2',
];

export function About() {
  return (
    <section className="pane">
      <div className="split">
        <figure className="blueprint duotone" style={{ margin: 0, height: '100%', minHeight: 0 }}>
          <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
          <Placeholder label={'photo — graydon\ndrop an image here'} style={{ height: '100%', minHeight: 220 }} />
        </figure>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(8px,1.4vh,16px)' }}>
          <h2 className="disp" style={{ fontSize: 'clamp(21px,min(3.2vw,4.8vh),42px)' }}>
            <span className="line">I got here by</span>
            <span className="line">refusing to do it</span>
            <span className="line">by hand twice.</span>
          </h2>
          <p style={{ margin: 0, fontSize: 'clamp(13px,min(1.1vw,1.9vh),15.5px)', lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 84%, transparent)' }}>
            The first thing I ever built was a spreadsheet that got out of hand. Then a Max device, because I
            wanted a delay that behaved a specific way. Then a whole site, because a collection had outgrown
            a notes app. Each one taught me enough to start the next.
          </p>
          <p style={{ margin: 0, fontSize: 'clamp(13px,min(1.1vw,1.9vh),15.5px)', lineHeight: 1.5, color: 'color-mix(in srgb, var(--color-text) 84%, transparent)' }}>
            By day I'm a senior online banker — where I learned that software people trust is software that's
            boring in exactly the right places.
          </p>
          <div className="blueprint" style={{ padding: 'clamp(10px,1.6vh,18px) 20px' }}>
            <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
            <span className="mono" style={{ color: 'var(--color-accent-700)', display: 'block', marginBottom: 10 }}>
              Currently
            </span>
            <div style={{ display: 'grid', gap: 'clamp(4px,.8vh,8px)', fontSize: 'clamp(12.5px,min(1.05vw,1.75vh),15px)', lineHeight: 1.4 }}>
              {CURRENTLY.map((c, i) => (
                <div key={c} style={{ display: 'flex', gap: 12 }}>
                  <span className="mono" style={{ color: 'color-mix(in srgb, var(--color-text) 45%, transparent)' }}>
                    {'0' + (i + 1)}
                  </span>
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
