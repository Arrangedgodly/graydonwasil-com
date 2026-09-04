# Shot list — redesign capture session

Everything the rebuilt site needs, in one sitting. **15 required files, 16
recommended, 1 photo.** Drop them in this folder; they're picked up on the
next build.

## Use the script

```bash
npm run capture:setup   # once — installs Playwright and sharp, downloads Chromium
npm run capture
```

`capture:setup` installs with `--no-save` on purpose: Playwright and sharp are
capture-only tools and have no business being installed on every deploy.

It opens a real browser at the exact viewport, walks you through every shot in
order, and writes correctly-named WebP files straight into this folder. You
sign in and set up each screen; it owns the viewport, the filenames, and the
light/dark pairing.

It never reloads or navigates between a pair, so **the twins cannot drift** —
which is the one rule below that actually matters. Skip a shot with `s`, quit
with `q`, and run it again later to pick up exactly where you left off.

```bash
npm run capture -- --list              # what is still outstanding
npm run capture -- --only rhymepage    # one project
npm run capture -- --force             # re-take shots that already exist
```

Your browser profile persists in `.capture-profile/` (gitignored), so logins
survive between runs. `about.webp` is a photo of you — the script can't take
that one.

Everything below is the manual fallback, and explains what the script is doing.

## The one rule that matters most

Every capture has a **light twin and a dark twin**, and the site's theme
toggle flips between them live. For that to look like magic instead of a
bug, each pair must be the *same page, same scroll position, same data* —
only the theme differs. Capture the light one, flip the app's theme, capture
again without touching anything else.

If a pair is misaligned, the transition visibly jumps and the effect is dead.

## Capture settings

**Desktop — 2:1, exported at 2240 × 1120**

Chrome/Edge DevTools → device toolbar (Ctrl+Shift+M) → Responsive → set
**1120 × 560**, DPR **2**, then the ⋮ menu → *Capture screenshot*. That gives
you exactly 2240 × 1120 with no browser chrome in frame.

**Mobile — exported at 780 × 1688**

Same device toolbar, set **390 × 844**, DPR **2**, capture.

**Format:** WebP if your tool offers it, PNG otherwise. Aim under ~400 KB
each. Avoid JPEG — it smears UI text.

**Content:** real data, never empty states. A written verse, a populated
catalog, a real collection. Nothing that says "Lorem" or sits at zero.

## Files

`{theme}` is `light` or `dark`. Both are always required.

### Required — 13 files

| File | What's in frame |
| --- | --- |
| `rhymepage-hero-{theme}.webp` | Write screen, a real verse in the editor, rhyme panel populated |
| `rhymepage-hero-{theme}-mobile.webp` | Same screen, phone width |
| `collectible-cars-hero-{theme}.webp` | Catalog grid, full of castings, own/want state visible |
| `collectible-cars-hero-{theme}-mobile.webp` | Same screen, phone width |
| `arranged-godly-hero-{theme}.webp` | Home shelf, album cards fanned out |
| `arranged-godly-hero-{theme}-mobile.webp` | Same screen, phone width |
| `voxchain-hero-{theme}.png` | Simple view with a selected sound and effect summary |
| `about.webp` | You — see below |

**Rhymepage has six themes, not two.** Pick your best-looking light theme and
your best-looking dark theme from pastel / retro / winter / forest /
corporate / business, and shoot those two. Tell me which you chose.

### Recommended — 12 files (detail-page gallery, desktop only)

| File | What's in frame |
| --- | --- |
| `rhymepage-shot-2-{theme}.webp` | Teleprompter mid-playback |
| `rhymepage-shot-3-{theme}.webp` | Sync marks laid against the track |
| `collectible-cars-shot-2-{theme}.webp` | A single casting's detail page |
| `collectible-cars-shot-3-{theme}.webp` | The shelf — your own collection |
| `arranged-godly-shot-2-{theme}.webp` | Max for Live device cards |
| `arranged-godly-shot-3-{theme}.webp` | Magic Gunden title screen |
| `voxchain-shot-2-{theme}.png` | Advanced view with the ordered chain and effect palette |
| `voxchain-shot-3-{theme}.png` | Live signal chain workspace |

Skip these and each detail page shows its hero alone — it works, it's just
thinner.

### The About photo

`about.webp`, roughly 1400px on the long edge, portrait or square. It should
match the tone of the site — casual, a real photograph of you, not a
LinkedIn headshot. This slot currently renders a grey hatched placeholder,
which is the biggest character gap on the site.

One photo only; it doesn't need a light/dark twin.

## Why the hero does double duty

The hero file is the image that appears on the home page exhibit **and** the
one that expands into the project's detail page when you click it — it
physically morphs between the two. So the hero is the money shot for each
project. Spend your time there.

## Naming reference

```
{slug}-hero-{light|dark}[-mobile].webp
{slug}-shot-{2|3}-{light|dark}.webp
about.webp
```

Slugs are `rhymepage`, `collectible-cars`, `arranged-godly`, and `voxchain` — these match the
new URLs (`/projects/collectible-cars`) and are the filename prefix, so they
have to match exactly.

The existing `*-variant-*` and `*-action-*` GIFs are superseded by this set
and can be deleted once the new captures land.
