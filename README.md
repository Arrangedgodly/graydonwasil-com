# Graydon Wasil

The source for [graydonwasil.com](https://graydonwasil.com), a one-screen portfolio for shipped projects and small browser experiments.

It is built with React, TypeScript, and Vite.

## Run it locally

```bash
npm install
npm run dev
```

Vite prints the local address after it starts. Create a production build with:

```bash
npm run build
```

Run the linter with `npm run lint`.

## What is in the site

- A full-viewport deck for the featured projects, with keyboard, wheel, swipe, and navigation controls.
- Project detail views and a full-height screenshot viewer.
- An experiments gallery with curated, alphabetical, and newest-first ordering.
- Dark and light themes, with the visitor's choice saved in local storage.
- A contact form that posts to an optional endpoint or opens the visitor's email client when none is set.
- Reduced-motion support.

## Configuration

Copy `.env.example` to `.env.local` and set `VITE_CONTACT_ENDPOINT` if the contact form should submit directly to a form service:

```dotenv
VITE_CONTACT_ENDPOINT=https://example.com/your-form-endpoint
```

Leave it unset to use the email-client fallback. The endpoint receives JSON with `name`, `email`, and `message` fields.

## Content and screenshots

Featured projects and experiments live in [src/data/projects.ts](src/data/projects.ts). Add or edit records there to update the site.

Project screenshots live in [src/assets/screenshots](src/assets/screenshots). The capture helper opens each source site at the required size and writes WebP files:

```bash
npm run capture:setup
npm run capture
```

`capture:setup` installs Playwright and Sharp without saving them to `package.json`, then downloads Chromium. The capture flow uses a persistent browser profile so sign-ins can be reused. See the [screenshot guide](src/assets/screenshots/README.md) for naming rules and the required shots.

## Deployment

Build output goes to `dist`, so any static host that supports a single-page app can deploy it. For Cloudflare Pages, use `npm run build` as the build command and `dist` as the output directory. Add `VITE_CONTACT_ENDPOINT` in the host's environment settings when using a form service.

> [!NOTE]
> This app uses client-side routing. Configure the host to return `index.html` for unknown paths so direct visits to project and detail URLs work.
