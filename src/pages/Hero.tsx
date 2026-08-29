import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';
import { EXPERIMENTS, PROJECTS } from '../data/projects';
import { getShotImage } from '../lib/images';
import { useTheme } from '../lib/useTheme';

export function Hero() {
  const { theme } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const interestFrames = [
    ...PROJECTS.map((project) => ({
      id: project.id,
      label: project.title,
      src: getShotImage(`${project.id}-hero-${theme}`),
    })),
    ...EXPERIMENTS.map((experiment) => ({
      id: experiment.id,
      label: experiment.title,
      src: experiment.thumbnail,
    })),
  ].filter((frame): frame is { id: string; label: string; src: string } => Boolean(frame.src));

  return (
    <div className="hero">
      <div
        className="hero-memory"
        data-motion={reduceMotion ? 'still' : 'loop'}
        aria-hidden="true"
      >
        <div className="hero-memory-track">
          {[0, 1].map((copy) => (
            <div className="hero-memory-sequence" key={copy}>
              {interestFrames.map(({ id, src, label }) => (
                <div className="hero-memory-slice" key={`${id}-${copy}`}>
                  <img src={src} alt="" decoding="async" />
                  <span className="mono">{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <h1 className="disp hero-title">
        <span className="line">I build software</span>
        <span className="line">for the things I&rsquo;m</span>
        <span className="line">already into.</span>
      </h1>
      <p className="lede">
        Lyrics, records, die-cast cars, video games. I take an ordinary week&rsquo;s obsessions and
        build the tool each one was missing &mdash; then put it on the internet and keep it running.
      </p>
      <span className="mono hero-cue" aria-hidden="true">
        Scroll, swipe or press &darr;
      </span>
    </div>
  );
}
