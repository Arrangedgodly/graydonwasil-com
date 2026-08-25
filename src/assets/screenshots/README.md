# Screenshots

Drop a correctly-named image in here and it appears on the next build — no
code changes needed. **[SHOT-LIST.md](SHOT-LIST.md) is the document to work
from when capturing**; this file just explains how the naming resolves.

## Naming

```
{project.id}-{slot}-{light|dark}[-mobile].{ext}
about.{ext}
```

`project.id` is the slug from `src/data/projects.ts` — `rhymepage`,
`collectible-cars`, `arranged-godly` — which is also the URL segment, so the
two cannot drift apart.

`slot` is one of `hero`, `shot-2`, `shot-3`, declared per project in the
`shots` array. `hero` does double duty: it is the image on the home page
exhibit *and* the one that opens into the detail page.

Accepted extensions: `.webp`, `.avif`, `.png`, `.jpg`, `.jpeg`, `.gif`.
Files with no extension are invisible to the glob.

## Light and dark are a pair, not an option

Every capture needs both. The site's theme toggle swaps each screenshot to
its twin, so a pair must be the same page, same scroll position and same data
— only the theme differs. A misaligned pair makes the transition visibly
jump. See SHOT-LIST.md for capture settings.

## Resolution order

`resolveShot` in `src/lib/images.ts` tries, in order:

1. `{id}-{slot}-{theme}-mobile` (narrow viewports only)
2. `{id}-{slot}-{theme}`
3. a legacy `{id}-variant-*` capture, discovered from the folder itself
4. nothing — `Shot` renders the diagonal-hatch placeholder, so a missing file
   is obvious rather than silent

Step 3 exists only so the site keeps showing something until the reshoot
lands, and it still follows the theme toggle where the old filenames happen
to carry `-light` / `-dark`.

## Legacy captures, pending deletion

The `*-variant-*` and `*-action-*` GIFs predate this scheme and are superseded
by the shot list. They are ~39 MB across 35 files and carry very little
motion — the 24 `variant` files are 1–5 frames each, which is to say they are
still images stored as GIFs. Delete them once the new captures are in.

Seven files in this folder have **no extension** (`still_desktop_*`, and a
duplicate wishlist take). They were left over from an earlier pass, are
invisible to the glob, and can go at any time.
