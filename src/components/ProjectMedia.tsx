import type { ProjectShot } from '../data/projects';
import { Shot } from './Shot';

export function ProjectMedia({
  shot,
  imageKey,
  title,
  alt,
  loading = 'lazy',
}: {
  shot: ProjectShot;
  imageKey?: string;
  title: string;
  alt: string;
  loading?: 'lazy' | 'eager';
}) {
  if (shot.kind === 'youtube') {
    return (
      <div className="project-youtube">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${shot.youtubeId}?rel=0`}
          title={title}
          loading={loading}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <Shot
      imageKey={imageKey ?? ''}
      label={title}
      alt={alt}
      natural
      loading={loading}
    />
  );
}

export function ProjectMediaThumb({
  shot,
  imageKey,
  label,
}: {
  shot: ProjectShot;
  imageKey?: string;
  label: string;
}) {
  if (shot.kind === 'youtube') {
    return (
      <span className="project-youtube-thumb" aria-hidden="true">
        <img
          src={`https://i.ytimg.com/vi/${shot.youtubeId}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="project-youtube-play">Play</span>
      </span>
    );
  }

  return <Shot imageKey={imageKey ?? ''} label={label} alt="" natural />;
}
