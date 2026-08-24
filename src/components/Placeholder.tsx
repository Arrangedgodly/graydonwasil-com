import type { CSSProperties } from 'react';

export function Placeholder({
  label,
  className = '',
  style,
}: {
  label: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`ph ${className}`.trim()} style={style}>
      <span>{label}</span>
    </div>
  );
}
