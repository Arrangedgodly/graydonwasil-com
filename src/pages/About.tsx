import { Shot } from '../components/Shot';

const CURRENTLY = [
  'Improving Rhymepage',
  'Learning what a sourdough starter actually wants',
  'Hanging out with my son as much as possible',
  'Waiting on Enter the Gungeon 2',
];

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
    <div className="aslide">
      <figure className="aslide-photo">
        <Shot
          imageKey="about"
          label={'photo — graydon\ndrop an image here'}
          alt="Graydon Wasil"
          natural
          style={{ aspectRatio: '4 / 5' }}
        />
      </figure>

      <div className="aslide-body">
        <h2 className="disp aslide-title">
          <span className="line">I got here by</span>
          <span className="line">refusing to do it</span>
          <span className="line">by hand twice.</span>
        </h2>

        <div className="prose">
          <p>
            The first thing I ever built was a spreadsheet that got out of hand. Then a Max device,
            because I wanted a delay that behaved a specific way. Then a whole site, because a
            collection had outgrown a notes app. Each one taught me enough to start the next.
          </p>
          <p>
            By day I&rsquo;m a senior online banker &mdash; where I learned that software people
            trust is software that&rsquo;s boring in exactly the right places.
          </p>
        </div>

        <div className="aslide-cols">
          <div className="block">
            <h3 className="mono block-label">Currently</h3>
            <ul className="rulelist">
              {CURRENTLY.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div className="block">
            <h3 className="mono block-label">What I work with</h3>
            <div className="tagrun">
              {TOOLS.map((t) => (
                <span key={t} className="tag tag-outline">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
