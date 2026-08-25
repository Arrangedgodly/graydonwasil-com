/**
 * Capture the shot list.
 *
 *   npm run capture              every outstanding shot
 *   npm run capture -- --list    what is missing, capture nothing
 *   npm run capture -- --only rhymepage
 *   npm run capture -- --force   re-take shots that already exist
 *
 * The script owns the things that are easy to get wrong — exact viewport,
 * device scale factor, filenames, and above all the light/dark pair being the
 * *same* page in the *same* state. It never reloads or navigates between a
 * pair, so the twins cannot drift.
 *
 * You own the things a script cannot know: signing in, putting real data on
 * screen, and flipping each app's own theme control. It pauses and tells you
 * exactly what it needs before every shot.
 *
 * The browser profile persists in .capture-profile/, so you sign in once and
 * later runs pick the session back up.
 */

import { chromium } from 'playwright';
import sharp from 'sharp';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'assets', 'screenshots');
const PROFILE = path.join(ROOT, '.capture-profile');

/** Matches the SHOT-LIST. 1120x560 at DPR 2 lands as 2240x1120. */
const DESKTOP = { width: 1120, height: 560 };
const MOBILE = { width: 390, height: 844 };
const DPR = 2;

const TARGETS = [
  {
    id: 'rhymepage',
    url: 'https://rhymepage.com',
    themes: {
      light: 'your best LIGHT theme of the six',
      dark: 'your best DARK theme of the six',
    },
    shots: [
      { key: 'hero', tier: 'required', brief: 'Write screen — a real verse in the editor, rhyme panel populated' },
      { key: 'shot-2', tier: 'recommended', brief: 'Teleprompter mid-playback' },
      { key: 'shot-3', tier: 'recommended', brief: 'Sync marks laid against the track' },
    ],
  },
  {
    id: 'collectible-cars',
    url: 'https://cars.arrangedgodly.com',
    themes: { light: 'light theme', dark: 'dark theme' },
    shots: [
      { key: 'hero', tier: 'required', brief: 'Catalog grid — full of castings, own/want state visible' },
      { key: 'shot-2', tier: 'recommended', brief: 'A single casting detail page' },
      { key: 'shot-3', tier: 'recommended', brief: 'The shelf — your own collection' },
    ],
  },
  {
    id: 'arranged-godly',
    url: 'https://arrangedgodly.com',
    themes: { light: 'light theme', dark: 'dark theme' },
    shots: [
      { key: 'hero', tier: 'required', brief: 'Home shelf — album cards fanned out' },
      { key: 'shot-2', tier: 'recommended', brief: 'Max for Live device cards' },
      { key: 'shot-3', tier: 'recommended', brief: 'Magic Gunden title screen' },
    ],
  },
];

const THEMES = ['light', 'dark'];

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};

const LIST_ONLY = flag('list');
const FORCE = flag('force');
const ONLY = value('only');

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
};

/** Every file the site wants, in capture order. */
function plan() {
  const rows = [];
  for (const t of TARGETS) {
    if (ONLY && t.id !== ONLY) continue;
    for (const shot of t.shots) {
      for (const theme of THEMES) {
        rows.push({ target: t, shot, theme, mobile: false, name: `${t.id}-${shot.key}-${theme}` });
      }
    }
    // Only the hero needs a phone twin.
    for (const theme of THEMES) {
      rows.push({
        target: t,
        shot: t.shots[0],
        theme,
        mobile: true,
        name: `${t.id}-hero-${theme}-mobile`,
      });
    }
  }
  return rows;
}

async function existingKeys() {
  await mkdir(OUT, { recursive: true });
  const files = await readdir(OUT);
  return new Set(
    files
      .filter((f) => /\.(webp|avif|png|jpe?g|gif)$/i.test(f))
      .map((f) => f.replace(/\.[^.]+$/, '')),
  );
}

async function save(buffer, name) {
  const file = path.join(OUT, `${name}.webp`);
  const out = await sharp(buffer).webp({ quality: 90 }).toBuffer();
  await writeFile(file, out);
  const meta = await sharp(out).metadata();
  return { file, kb: Math.round(out.length / 1024), width: meta.width, height: meta.height };
}

async function main() {
  const rows = plan();
  const have = await existingKeys();
  const todo = FORCE ? rows : rows.filter((r) => !have.has(r.name));

  console.log(`\n${c.bold('Capture kit')} ${c.dim('· ' + OUT)}`);
  console.log(`${rows.length} shots in the list, ${c.green(String(rows.length - todo.length))} already present, ${c.cyan(String(todo.length))} to take.`);

  if (!have.has('about')) {
    console.log(c.yellow('\nNote: about.webp is a photo of you, not a screenshot — this script cannot take it.'));
    console.log(c.dim('      ~1400px long edge, portrait or square. Drop it in the same folder.'));
  }

  if (LIST_ONLY || todo.length === 0) {
    if (todo.length) {
      console.log('\nOutstanding:');
      for (const r of todo) console.log(`  ${r.name}.webp   ${c.dim(r.shot.brief)}`);
    } else {
      console.log(c.green('\nNothing outstanding. '));
    }
    return;
  }

  const rl = createInterface({ input: stdin, output: stdout });
  const pause = async (msg) => {
    await rl.question(`\n${msg}\n${c.dim('   press Enter when ready (or type s to skip) › ')}`).then((a) => a.trim().toLowerCase());
  };
  const ask = async (msg) =>
    (await rl.question(`\n${msg}\n${c.dim('   Enter to capture · s to skip · q to quit › ')}`)).trim().toLowerCase();

  const taken = [];
  const skipped = [];

  // Desktop and mobile need different context options (isMobile/hasTouch), and
  // a persistent context locks the profile directory — so they run as two
  // sequential passes over the same profile rather than side by side.
  for (const isMobile of [false, true]) {
    const pending = todo.filter((r) => r.mobile === isMobile);
    if (!pending.length) continue;

    const viewport = isMobile ? MOBILE : DESKTOP;
    const context = await chromium.launchPersistentContext(PROFILE, {
      headless: false,
      viewport,
      deviceScaleFactor: DPR,
      isMobile,
      hasTouch: isMobile,
      args: ['--hide-scrollbars'],
    });

    console.log(
      `\n${c.bold(isMobile ? '── Phone pass ──' : '── Desktop pass ──')} ${c.dim(`${viewport.width}x${viewport.height} @${DPR} → ${viewport.width * DPR}x${viewport.height * DPR}`)}`,
    );

    const page = context.pages()[0] ?? (await context.newPage());

    // Group by target + shot so a light/dark pair is taken back to back on one
    // untouched page — this is what guarantees the twins line up.
    const groups = new Map();
    for (const r of pending) {
      const k = `${r.target.id}|${r.shot.key}`;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(r);
    }

    let quit = false;
    for (const [, group] of groups) {
      if (quit) break;
      const { target, shot } = group[0];

      if (page.url() !== target.url) {
        await page.goto(target.url, { waitUntil: 'domcontentloaded' }).catch(() => {});
      }

      console.log(`\n${c.bold(target.id)} ${c.dim('·')} ${c.cyan(shot.key)} ${c.dim(`(${shot.tier})`)}`);
      console.log(`  ${shot.brief}`);
      console.log(c.dim('  Sign in and set up real data if you have not already — never an empty state.'));

      for (const row of group) {
        const themeHint = target.themes[row.theme];
        const first = row === group[0];
        const instruction = first
          ? `Set up the screen above in ${c.bold(themeHint)}.`
          : `Now switch ${c.bold('only the theme')} to ${c.bold(themeHint)}. Do not scroll or change anything else.`;

        const answer = await ask(`  ${instruction}`);
        if (answer === 'q') {
          quit = true;
          break;
        }
        if (answer === 's') {
          skipped.push(row.name);
          console.log(c.dim(`  skipped ${row.name}`));
          continue;
        }

        const buffer = await page.screenshot({ type: 'png' });
        const saved = await save(buffer, row.name);
        const expected = `${viewport.width * DPR}x${viewport.height * DPR}`;
        const actual = `${saved.width}x${saved.height}`;
        const ok = actual === expected;
        console.log(
          `  ${ok ? c.green('✓') : c.yellow('!')} ${row.name}.webp  ${actual}  ${saved.kb} KB` +
            (ok ? '' : c.yellow(`  expected ${expected}`)),
        );
        taken.push(row.name);
      }
    }

    await context.close();
    if (quit) break;
  }

  rl.close();

  console.log(`\n${c.bold('Done.')} ${c.green(String(taken.length))} captured` + (skipped.length ? `, ${skipped.length} skipped` : '') + '.');
  const still = (await existingKeys());
  const missing = plan().filter((r) => !still.has(r.name));
  if (missing.length) {
    console.log(`\n${missing.length} still outstanding — run again to pick up where you left off:`);
    for (const r of missing) console.log(`  ${c.dim(r.name + '.webp')}`);
  } else {
    console.log(c.green('Every shot in the list is present.'));
  }
  if (!still.has('about')) console.log(c.yellow('Still needed: about.webp (your photo).'));
}

main().catch((err) => {
  console.error('\nCapture failed:', err.message);
  process.exit(1);
});
