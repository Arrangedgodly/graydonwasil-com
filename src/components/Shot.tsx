import type { CSSProperties } from 'react';
import { getShotImage } from '../lib/images';
import { Placeholder } from './Placeholder';

export function Shot({
  imageKey,
  label,
  alt = label,
  className = '',
  style,
  natural = false,
  loading = 'lazy',
}: {
  imageKey: string;
  label: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /** Render at the file's own aspect ratio instead of cropping to fill the box.
   *  Screenshots are ultrawide and inconsistent between projects, so cropping
   *  them to a container's leftover height is what produced the stretched
   *  proportions this redesign exists to fix. */
  natural?: boolean;
  loading?: 'lazy' | 'eager';
}) {
  const src = getShotImage(imageKey);
  if (!src) {
    return (
      <Placeholder
        label={label}
        className={className}
        style={natural ? { aspectRatio: '2 / 1', ...style } : style}
      />
    );
  }

  if (natural) {
    return (
      <img
        className={className || undefined}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        style={{ width: '100%', height: 'auto', display: 'block', ...style }}
      />
    );
  }

  return (
    <div className={`ph ${className}`.trim()} style={{ ...style, overflow: 'hidden' }}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}
