# Screenshots

Drop a correctly-named image in here and it appears on the next build — no code
changes needed. **[SHOT-LIST.md](SHOT-LIST.md) is the document to work from**,
and `npm run capture` walks it for you.

## Naming

```
{project.id}-{slot}-{light|dark}[-mobile].{ext}
about.{ext}
```

`project.id` is the slug from `src/data/projects.ts` — `rhymepage`,
`collectible-cars`, `arranged-godly` — which is also the URL segment, so the
two cannot drift apart.

`slot` is one of `hero`, `shot-2`, `shot-3`, declared per project in the
`shots` array. `hero` does double duty: it is the image on the project's slide
*and* the one that opens into the deeper view.

Accepted extensions: `.webp`, `.avif`, `.png`, `.jpg`, `.jpeg`. Files with no
extension are invisible to the glob.

## Light and dark are a pair, not an option

Every capture needs both. The site's theme toggle swaps each screenshot to its
twin, so a pair must be the same page, same scroll position and same data —
only the theme differs. A misaligned pair makes the transition visibly jump.

`npm run capture` guarantees this by holding one page still across both halves
of a pair; all you do is flip the app's own theme control when it asks.

## Resolution order

`resolveShot` in `src/lib/images.ts` tries:

1. `{id}-{slot}-{theme}-mobile` — narrow viewports, when that capture exists
2. `{id}-{slot}-{theme}`

Most projects currently have only a phone hero. Any correctly named mobile
capture takes priority, including `shot-2` and `shot-3`; otherwise that slot
falls through to its desktop file. When nothing matches, the canonical name is
returned so `Shot` renders the diagonal-hatch placeholder and the gap is
obvious rather than silent.

## Current set

31 files, ~6.1 MB: three projects with complete themed galleries, VOXCHAIN's
current still captures, a phone twin for the first three heroes, and
`about.webp`. VOXCHAIN uses its YouTube explanation as gallery item one, then
Simple view and Advanced view. The old Live signal chain still is no longer in
the gallery.
