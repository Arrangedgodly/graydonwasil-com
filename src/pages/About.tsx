import { Shot } from '../components/Shot';

const CURRENTLY = [
  'Improving Rhymepage',
  'Learning what a sourdough starter actually wants',
  'Hanging out with my son as much as possible',
  'Waiting on Enter the Gungeon 2',
];

/* Folded down from three skill cards into one strip. Grouping the tags keeps
 * the shape of the old categories without asking anyone to read a matrix. */
const TOOLS = [
  'JavaScript',
  'React',
  'CSS',
  'SQL',
  'REST',
  'Auth',
  'Max for Live',
  'Web Audio',
  'Game loops',
];

export function About() {
  return (
    <div className="pane">
      <section className="hero hero--sub">
        <h1 className="disp hero-title">
          <span className="line">I got here by</span>
          <span className="line">refusing to do it</span>
          <span className="line">by hand twice.</span>
        </h1>
      </section>

      <section className="about-split">
        <figure className="about-photo">
          <Shot
            imageKey="about"
            label={'photo — graydon\ndrop an image here'}
            alt="Graydon Wasil"
            style={{ aspectRatio: '4 / 5' }}
          />
        </figure>

        <div className="prose">
          <p>
            The first thing I ever built was a spreadsheet that got out of hand. Then a Max device,
            because I wanted a delay that behaved a specific way. Then a whole site, because a
            collection had outgrown a notes app. Each one taught me enough to start the next.
          </p>
          <p>
            By day I&rsquo;m a senior online banker &mdash; where I learned that software people trust
            is software that&rsquo;s boring in exactly the right places.
          </p>
        </div>
      </section>

      <section className="block">
        <h2 className="mono block-label">Currently</h2>
        <ul className="rulelist">
          {CURRENTLY.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="block">
        <h2 className="mono block-label">What I work with</h2>
        <p className="prose-lead">
          Self-taught, project by project. Nothing here is on the list because I read about it
          &mdash; it&rsquo;s here because something I wanted didn&rsquo;t exist yet.
        </p>
        <div className="tagrun">
          {TOOLS.map((t) => (
            <span key={t} className="tag tag-outline">
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
