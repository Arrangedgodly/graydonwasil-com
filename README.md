# graydonwasil.com

Personal site — Vite + React + TypeScript + react-router. A fun showcase for
three shipped projects, not a hiring portfolio.

## Develop

```bash
npm install
npm run dev
```

`npm run build` typechecks and builds. `npm run lint` runs oxlint.

## The deck

**Nothing scrolls.** The shell is exactly one viewport with `overflow: hidden`,
the chrome is fixed and never moves, and slides transition in and out of a
centred stage. The site is one flat sequence:

```
Hero · Rhymepage · Collectible Cars · Arranged Godly · About · Contact
```

A wheel tick, a swipe, an arrow key and the nav pill all do the same thing —
move one index. `src/lib/deck.ts` is the single source of that order; adding a
project to `src/data/projects.ts` inserts a slide, a URL and a rail dot.

Wheel input becomes **discrete** moves rather than continuous travel, which is
what makes it snap. Trackpad momentum keeps firing after the fingers lift, so
the deck stops listening for 520ms once it commits (`useDeckDrivers.ts`).

## Fitting, not cropping

The previous design stretched its media badly, and it is worth being precise
about why: images were sized from **leftover height** and then cropped with
`object-fit: cover`. A locked viewport was never the problem.

Here every image is capped by an explicit `max-height` derived from the chrome
(`--stage-h` minus the slide's own furniture), with `width` and `height` on
`auto`. It scales to fit and never distorts or crops. At 1366×768 a 2.44:1
capture renders 1118×457 — exactly 2.44:1.

Type is fluid on both axes (`min(Xvw, Yvh)`), because a locked stage has to
survive short laptop windows as well as narrow ones.

## Design

Dark-first with a light toggle. Tokens live in `src/styles/theme.css`: the bare
`:root` block is the dark palette and the default, and `:root[data-theme="light"]`
overrides it. `index.html` stamps the stored choice before first paint.

The colour ramps **invert** relative to a conventional light system — on dark
grounds `--color-*-100` is the deepest value and `--color-*-900` the brightest.
That keeps `.tag-accent` ("quiet ground, loud text") and `.btn-primary` ("loud
ground, quiet text") correct in both themes with no per-theme overrides.

## Structure

- `src/data/projects.ts` — the three write-ups. Each declares three capture
  slots (`hero`, `shot-2`, `shot-3`).
- `src/lib/deck.ts` — slide order, URL mapping, footer notes.
- `src/components/Deck.tsx` — the stage and its slide transitions.
- `src/components/ProjectSlide.tsx` — a project as a slide: captures cycle on
  their own every 3.2s and it says almost nothing. The descriptions live in the
  deeper view.
- `src/components/DetailOverlay.tsx` — the deeper view, layered over the deck
  so closing returns you exactly where you were.
- `src/components/SwipeArea.tsx` — vertical touch swipe with an axis lock, so a
  gesture that drifts sideways is ignored.
- `src/components/Lightbox.tsx` — tap a capture to see it full height and pan
  it sideways; the only way an ultrawide is legible on a phone.
- `src/lib/images.ts` — `resolveShot` maps a project and slot to a filename,
  preferring the theme-paired capture. See `src/assets/screenshots/README.md`.
- `src/lib/useTheme.ts` — reads `data-theme` off `<html>` as its source of
  truth. Switching runs a circular wipe via the View Transitions API and
  flushes React synchronously inside it, so the captures swap to their twins
  within the same snapshot.

## Motion

`motion` (v13) via `LazyMotion` with `domMax`, in `strict` mode — every call
site uses `m`, not `motion`. `domMax` is required because `layoutId` is a layout
animation and `domAnimation` omits those. Springs live in `src/lib/motion.ts`.

Two shared `layoutId`s: the nav indicator, and the frame linking a project
slide to its deeper view. Everything respects `prefers-reduced-motion` —
springs collapse to zero duration and the theme wipe is skipped.

## Routes

Every URL renders the same shell; the path decides which slide is parked and
whether a deeper view is layered over it. `App.tsx` has no `<Route>` elements,
which is why `DetailOverlay` reads its slug from the pathname rather than
`useParams`.

```
/                          Hero
/projects/:slug            that project's slide
/projects/:slug/details    its deeper view, over the deck
/about  ·  /contact        those slides
```

Anything unmatched lands on the first slide.

## Contact form

`src/pages/Contact.tsx` posts to `VITE_CONTACT_ENDPOINT` (see `.env.example`).
With no endpoint configured it opens the visitor's mail client with the message
pre-filled — functional either way, but a real endpoint (e.g. a
[Formspree](https://formspree.io) form URL) delivers without leaving the page.

## Deploy — Cloudflare Pages

1. Push this repo to GitHub.
2. **Workers & Pages → Create → Pages → Connect to Git**, select the repo.
3. Framework preset **Vite**, build command `npm run build`, output `dist`.
4. Add `VITE_CONTACT_ENDPOINT` if you are using a form backend.
5. Deploy, then add `graydonwasil.com` as a custom domain.

## Captures

All 25 are in: three projects × three slots × two themes, a phone twin for each
hero, and the About photo. ~5.7 MB, replacing 39 MB of GIFs that carried almost
no motion.

Re-take any of them with `npm run capture` — see
`src/assets/screenshots/SHOT-LIST.md`. Shots that already exist are skipped, so
a second run only fills gaps.

## Not done yet

- Open Graph / Twitter card images (currently text-only). The project captures
  would make good source material now that they exist.
- `robots.txt` / sitemap.
- `VITE_CONTACT_ENDPOINT` is unset, so the contact form opens the visitor's
  mail client rather than delivering in-page.
