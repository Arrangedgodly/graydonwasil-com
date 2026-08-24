# Screenshots

Drop image files in here named to match a key below. Any file matching a key
is picked up automatically on the next build — no code changes needed.

## Simple projects (Rhymepage, Arranged Godly)

Three shots each, plus one About photo. Any of `.png` / `.jpg` / `.jpeg` /
`.webp` / `.gif`.

| File | Where it shows up |
| --- | --- |
| `rhymepage-1` | Rhymepage detail — main image + thumbnail 1 (also the Work card thumbnail) |
| `rhymepage-2` | Rhymepage detail — thumbnail 2 |
| `rhymepage-3` | Rhymepage detail — thumbnail 3 |
| `ag-1` / `ag-2` / `ag-3` | Arranged Godly — same pattern |
| `about` | The About page photo |

Example: `rhymepage-1.png`, `about.jpg`. Aim for roughly 1600px on the long
edge — these render inside boxes with `object-fit: cover`, so exact aspect
ratio doesn't matter much, but very large source files slow the site down
for no visual benefit.

## Richer projects with a `gallery` in `src/data/projects.ts` (Collectible Cars DB)

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
serves both. For Cars specifically:

| File | Shows |
| --- | --- |
| `cars-variant-cruz-light[.gif]` / `-dark` | Cruz Ramirez, light/dark theme |
| `cars-variant-dinoco-light` / `-dark` | Dinoco, light/dark theme |
| `cars-variant-mcqueen-light` / `-dark` | Lightning McQueen, light/dark theme |
| `cars-action-search-filter-sort` | Desktop-only action clip |
| `cars-action-wishlist-toggle` | Own/want toggle demo |
| `cars-action-theme-switching` | Theme-switch demo |

Every one of the above also has a `-mobile` variant in use.

Large GIFs (the theme-switching clip is ~5MB) only download when actually
shown — the hero swaps a single `<img src>`, so the other clips never fetch
until clicked. Still worth trimming/compressing at the source if you re-export
these; nothing in this repo currently does that automatically.

Two captures were left unused on purpose and can be deleted whenever: an
earlier, differently-cropped desktop "still" pass (superseded by the
`still2` pass, since renamed to `cars-variant-*`) and a duplicate take of the
wishlist-toggle desktop clip.
