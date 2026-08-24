# Screenshots

Drop image files in here named to match a key below. Any file matching a key
is picked up automatically on the next build — no code changes needed.

## Simple projects (none currently — pattern still available for new projects)

Three shots each, plus one About photo. Any of `.png` / `.jpg` / `.jpeg` /
`.webp` / `.gif`.

| File | Where it shows up |
| --- | --- |
| `{project.id}-1` / `-2` / `-3` | Detail page — main image + two thumbnails (also the Work card thumbnail) |
| `about` | The About page photo |

Example: `about.jpg`. Aim for roughly 1600px on the long edge — these render
inside boxes with `object-fit: cover`, so exact aspect ratio doesn't matter
much, but very large source files slow the site down for no visual benefit.
Every current project (Rhymepage, Collectible Cars DB, Arranged Godly) has
graduated to a `gallery` below.

## Richer projects with a `gallery` in `src/data/projects.ts` (Rhymepage, Collectible Cars DB, Arranged Godly)

A project with a `gallery` entry gets an auto-rotating hero (ambient stills —
e.g. the same screen across castings/color themes) plus click-to-play action
clips, instead of the simple 3-shot pattern above. Files are keyed as:

```
{project.id}-variant-{key}[-mobile].{ext}
{project.id}-action-{key}[-mobile].{ext}
```

`key` values come from the `gallery.variants` / `gallery.actions` /
`gallery.mobileActions` arrays in `projects.ts`. The `-mobile` suffix is
optional per file — add it for a viewport-specific capture (the site swaps
to it automatically under the ~1000px breakpoint); omit it and the same file
serves both.

For Rhymepage — variants are the Write screen across its six built-in themes
(no mobile captures yet, desktop files serve both):

| File | Shows |
| --- | --- |
| `rhymepage-variant-pastel` / `-retro` / `-winter` / `-forest` / `-corporate` / `-business` | Write screen + rhyme panel, one per theme |
| `rhymepage-action-rhyme-suggestions` | Typing a line, rhyme panel populating live |
| `rhymepage-action-theme-switching` | Cycling through the theme picker |
| `rhymepage-action-sync-playback` | Marking sync points, then teleprompter playback |

For Cars:

| File | Shows |
| --- | --- |
| `cars-variant-cruz-light[.gif]` / `-dark` | Cruz Ramirez, light/dark theme |
| `cars-variant-dinoco-light` / `-dark` | Dinoco, light/dark theme |
| `cars-variant-mcqueen-light` / `-dark` | Lightning McQueen, light/dark theme |
| `cars-action-search-filter-sort` | Desktop-only action clip |
| `cars-action-wishlist-toggle` | Own/want toggle demo |
| `cars-action-theme-switching` | Theme-switch demo |

Every one of the Cars files above also has a `-mobile` variant in use.

For Arranged Godly — variants are three different screens (home shelf, Max
for Live devices, Magic Gunden) each in light and dark, since the site has a
simple light/dark toggle rather than a multi-theme picker:

| File | Shows |
| --- | --- |
| `ag-variant-home-light` / `-dark` | Home splash, album cards fanned out |
| `ag-variant-max-light` / `-dark` | Max for Live floating device cards |
| `ag-variant-gunden-light` / `-dark` | Magic Gunden title screen |
| `ag-action-album-browse` | Dragging the badge to fan through album covers |
| `ag-action-devices-scroll` | Parallax sweep across the Max for Live cards |
| `ag-action-game-launch` | Title screen → game loading transition |

`ag-action-game-launch` only captures the launch transition, not gameplay —
the embedded itch.io WebGL build wouldn't progress past its own loading
screen in the capture environment. Worth re-capturing with a real gameplay
clip if that's ever convenient.

Large GIFs (the theme-switching and album-browse clips are several MB) only
download when actually shown — the hero swaps a single `<img src>`, so the
other clips never fetch until clicked. Still worth trimming/compressing at
the source if you re-export these; nothing in this repo currently does that
automatically.

Two captures were left unused on purpose and can be deleted whenever: an
earlier, differently-cropped desktop "still" pass (superseded by the
`still2` pass, since renamed to `cars-variant-*`) and a duplicate take of the
wishlist-toggle desktop clip.
