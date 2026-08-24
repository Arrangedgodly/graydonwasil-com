import type { CSSProperties } from 'react';
import { getShotImage } from '../lib/images';
import { Placeholder } from './Placeholder';

export function Shot({
  imageKey,
  label,
  alt = label,
  className = '',
  style,
}: {
  imageKey: string;
  label: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const src = getShotImage(imageKey);
  if (!src) return <Placeholder label={label} className={className} style={style} />;

  return (
    <div className={`ph ${className}`.trim()} style={{ ...style, overflow: 'hidden' }}>
      <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
}
