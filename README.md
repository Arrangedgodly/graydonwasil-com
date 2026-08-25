# graydonwasil.com

Personal site — Vite + React + TypeScript + react-router. A fun showcase for
three shipped projects, not a hiring portfolio.

## Develop

```bash
npm install
npm run dev
```

`npm run build` typechecks and builds. `npm run lint` runs oxlint.

## Design

Dark-first, with a light toggle. Tokens live in `src/styles/theme.css`: the
bare `:root` block is the dark palette and the site's default, and
`:root[data-theme="light"]` overrides it. `index.html` stamps the stored
choice on `<html>` before first paint so there is no flash.

The colour ramps **invert** relative to a conventional light system — on dark
grounds `--color-*-100` is the deepest value and `--color-*-900` the
brightest. That keeps rules like `.tag-accent` ("quiet ground, loud text")
and `.btn-primary` ("loud ground, quiet text") correct in both themes with no
theme-specific component overrides.

`src/styles/app.css` holds layout. The document scrolls and the chrome does
not: content is centred on the true viewport centre, capped at
`--measure-wide` (1120px), with running text capped much shorter at
`--measure-text` (65ch). **Nothing sizes itself from leftover viewport
height** — that was what stretched the media in the previous design.

## Structure

- `src/data/projects.ts` — the three project write-ups. Each declares three
  capture slots (`hero`, `shot-2`, `shot-3`). Add a project here and it gets
  an exhibit on the home page and a detail route automatically.
- `src/pages/` — `Home` (hero + the three exhibits), `ProjectDetail`,
  `About` (with the toolkit folded in), `Contact`.
- `src/components/Shell.tsx` — fixed chrome: name mark, nav pill, footer,
  plus the ← / → / Esc keyboard navigation.
- `src/components/NavPill.tsx` — the floating nav. Its active indicator is
  measured off the live DOM, so it stays aligned through font swaps and
  resizes.
- `src/lib/images.ts` — `resolveShot` maps a project and slot to a filename,
  preferring the theme-paired capture and degrading to older ones. See
  `src/assets/screenshots/README.md`.
- `src/lib/useTheme.ts` — reads `data-theme` off `<html>` as its source of
  truth rather than keeping a second copy.

## Routes

`/` · `/about` · `/contact` · `/projects/:slug`. `/work` and `/toolkit`
redirect to `/` and `/about`; anything unmatched redirects to `/`.

## Contact form

`src/pages/Contact.tsx` posts to `VITE_CONTACT_ENDPOINT` (see `.env.example`).
With no endpoint configured it opens the visitor's mail client with the
message pre-filled — functional either way, but a real endpoint (e.g. a
[Formspree](https://formspree.io) form URL) delivers without leaving the
page. Set it in a local `.env` and again in your host's environment
variables.

## Deploy — Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to
   Git**, select the repo.
3. Framework preset **Vite**, build command `npm run build`, output `dist`.
4. Add `VITE_CONTACT_ENDPOINT` under environment variables if you are using a
   form backend.
5. Deploy, then add `graydonwasil.com` as a custom domain.

## Not done yet

- The reshoot — see `src/assets/screenshots/SHOT-LIST.md`. Until it lands,
  Rhymepage and Arranged Godly have no phone captures and render as thin
  strips on mobile, and the About photo is a placeholder.
- Motion: the shared-element open from exhibit to detail, the theme wipe,
  page transitions.
- Touch swipe between projects and sections.
- Open Graph / Twitter card images (currently text-only).
- `robots.txt` / sitemap.
