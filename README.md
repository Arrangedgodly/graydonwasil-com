# graydonwasil.com

Personal portfolio — Vite + React + TypeScript + react-router. Rebuilt from the
`Portfolio.dc.html` Claude Design preview; the "Industry" design tokens (steel
accent, Barlow Condensed/Barlow, blueprint corner-mark frames) live in
`src/styles/industry.css`, ported near-verbatim from the design project.

## Develop

```bash
npm install
npm run dev
```

## Structure

- `src/data/projects.ts` — the three project write-ups (Rhymepage, Collectible
  Cars DB, Arranged Godly). Add a project here and it appears in Work, gets a
  detail route, and is included in the filters automatically.
- `src/components/Placeholder.tsx` — the diagonal-hatch `.ph` block standing
  in for a screenshot that doesn't exist yet.
- `src/components/Shot.tsx` — renders a real photo when one exists at the
  matching key, falling back to `Placeholder` otherwise. See
  `src/assets/screenshots/README.md` for the file-naming convention — drop a
  correctly-named image in that folder and it appears on the next build, no
  code changes needed.
- `src/pages/` — one file per route (`Intro`, `Work`, `ProjectDetail`,
  `Toolkit`, `About`, `Contact`).
- `src/components/Shell.tsx` — the rail/header/footer chrome and the
  ← / → / Esc keyboard navigation, shared across every route.

## Contact form

`src/pages/Contact.tsx` posts to `VITE_CONTACT_ENDPOINT` (see `.env.example`).
With no endpoint configured it falls back to opening the visitor's mail client
with the message pre-filled — functional either way, but a real endpoint
(e.g. a [Formspree](https://formspree.io) form URL) delivers messages without
leaving the page. Set it in a local `.env` and again in your host's
environment variables before deploying.

## Deploy — Cloudflare Pages

1. Push this repo to GitHub (or GitLab).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect
   to Git**, select the repo.
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Add `VITE_CONTACT_ENDPOINT` under the project's environment variables if
   you're using a real form backend.
5. Deploy, then add `graydonwasil.com` as a custom domain on the project and
   point its DNS at Cloudflare (Pages walks you through this if the domain
   isn't already on Cloudflare's nameservers).

## Not done yet

- Real screenshots for the three projects and a photo for About — see
  `src/assets/screenshots/README.md`.
- Open Graph / Twitter card images (currently text-only cards).
- `robots.txt` / sitemap.
