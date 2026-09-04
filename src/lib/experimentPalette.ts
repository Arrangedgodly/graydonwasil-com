import type { Theme } from './useTheme';

const AMBIENT_PROPERTIES = [
  '--color-accent',
  '--color-accent-2',
  '--color-divider',
  '--color-accent-100',
  '--color-accent-200',
  '--color-accent-700',
  '--color-accent-800',
  '--color-accent-900',
] as const;

function rgbToHsl(color: string) {
  const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length < 3) return null;

  const [red, green, blue] = channels.map((channel) => channel / 255);
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const lightness = (maximum + minimum) / 2;
  const delta = maximum - minimum;

  if (delta === 0) return { hue: 210, saturation: 0 };

  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;
  if (maximum === red) hue = 60 * (((green - blue) / delta) % 6);
  if (maximum === green) hue = 60 * ((blue - red) / delta + 2);
  if (maximum === blue) hue = 60 * ((red - green) / delta + 4);

  return {
    hue: hue < 0 ? hue + 360 : hue,
    saturation: saturation * 100,
  };
}

function hsl(hue: number, saturation: number, lightness: number) {
  return `hsl(${Math.round(hue)} ${Math.round(saturation)}% ${lightness}%)`;
}

/**
 * Reads the experiment card's real foreground color and rotates it toward its
 * complement. The 165-degree offset keeps the portfolio chrome related to the
 * project without copying the card's own palette exactly.
 */
export function applyExperimentPalette(card: HTMLElement, theme: Theme) {
  const source = rgbToHsl(getComputedStyle(card).color);
  if (!source) return;

  const root = document.documentElement;
  const hue = (source.hue + 165) % 360;
  const secondHue = (hue + 24) % 360;
  const saturation = Math.min(82, Math.max(52, source.saturation * 0.9));
  const accent = hsl(hue, saturation, theme === 'dark' ? 64 : 34);
  const accentStrong = hsl(hue, saturation, theme === 'dark' ? 70 : 27);

  root.dataset.experimentPalette = 'true';
  root.style.setProperty('--color-accent', accent);
  root.style.setProperty('--color-accent-2', hsl(secondHue, saturation * 0.82, theme === 'dark' ? 68 : 32));
  root.style.setProperty('--color-divider', `color-mix(in srgb, ${accent} 24%, transparent)`);
  root.style.setProperty('--color-accent-100', `color-mix(in srgb, ${accent} 10%, var(--color-bg))`);
  root.style.setProperty('--color-accent-200', `color-mix(in srgb, ${accent} 18%, var(--color-bg))`);
  root.style.setProperty('--color-accent-700', accentStrong);
  root.style.setProperty('--color-accent-800', hsl(hue, saturation, theme === 'dark' ? 79 : 22));
  root.style.setProperty('--color-accent-900', hsl(hue, saturation, theme === 'dark' ? 88 : 16));
}

export function setExperimentPaletteEngaged(engaged: boolean) {
  if (engaged) document.documentElement.dataset.experimentEngaged = 'true';
  else delete document.documentElement.dataset.experimentEngaged;
}

export function clearExperimentPalette() {
  const root = document.documentElement;
  delete root.dataset.experimentPalette;
  delete root.dataset.experimentEngaged;
  AMBIENT_PROPERTIES.forEach((property) => root.style.removeProperty(property));
}
