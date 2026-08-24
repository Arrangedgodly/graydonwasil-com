const files = import.meta.glob<{ default: string }>(
  '/src/assets/screenshots/*.{png,jpg,jpeg,webp,gif}',
  { eager: true },
);

const byKey: Record<string, string> = {};
for (const path in files) {
  const key = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  byKey[key] = files[path].default;
}

export function getShotImage(key: string): string | undefined {
  return byKey[key];
}
