# Production log

## E1

Status: awaiting approval.

Outcome: introduce a data-driven Experiments collection as one deck
destination without changing the established featured-project flow.

Changed: `src/data/projects.ts`, `src/lib/deck.ts`, `src/lib/useDeckDrivers.ts`,
`src/components/NavPill.tsx`, `src/components/Deck.tsx`,
`src/components/ExperimentsSlide.tsx`, and `src/styles/app.css`.

Validation: `tsc -b`, Vite production build, and oxlint passed. The Impeccable
detector returned an empty finding list. Headless Chrome could not create
screenshots in this host because its GPU process failed, so the live
Experiments route was opened in Codex for review instead.

Follow-up: E2 replaces the intentional live-build preview panels with cropped
project screenshots and completes the visual QA pass. No user-approved
deviation from the product behavior.

Change request: paused E1 approval after the user reported that the rail traps
the deck wheel. Added the throwaway `/prototype/experiments?variant=a` route
with three alternatives. The prototype is not production code and must not be
promoted directly.

Decision: the user selected the index-strip prototype. Replaced the production
rail with that selection pattern, removed the wheel interception, and removed
the throwaway route and components. Re-ran TypeScript, Vite build, oxlint, and
the design detector. All passed; the detector returned no findings.

Approval: received. E1 is complete. E2 is active.

## E2

Status: awaiting approval.

Added public repository captures for Thread Art, Biome Generator, Traffic,
and Karaoke to the selected-panel view. LOOM and Terrarium have no existing
image assets in their repositories and remain text-led for now.

Validation: TypeScript build, Vite production build, oxlint, and the design
detector all passed. The detector returned no findings.

Revision: increased the mobile preview image to up to 32vh so the experiment
remains the visual focus, matching the scale of featured-project imagery. A
short-viewport rule reduces it only on phones under 700px tall to prevent
clipping. TypeScript build, Vite production build, oxlint, and the design
detector passed; the detector returned no findings.

Revision: the user supplied six PNG captures and requested that they replace
the repository sources. All six now live in `src/assets/experiments` and are
bundled locally. Each is 1312 × 820. TypeScript build, Vite production build,
oxlint, and the design detector passed again; the detector returned no
findings.

Revision: changed the selected panel from a narrow side-by-side composition to
a top-to-bottom flow. Images now scale from their natural aspect ratio within
the panel, followed by project details and actions. TypeScript build, Vite
production build, oxlint, and the design detector passed; the detector returned
no findings.

Revision: grouped the Experiments heading and index into one vertically
centered composition, reduced their separation, and keeps the subline on one
line at desktop widths. Updated the footer hint to describe the selected-panel
interaction. TypeScript build, Vite production build, oxlint, and the design
detector passed; the detector returned no findings.

## E3

Status: awaiting approval.

Reworked the mobile treatment into a compact two-column chooser with 44px
touch targets. The selected preview now uses less vertical space, keeps the
image legible, and retains the primary project and source controls in the
thumb-friendly lower portion of the panel. The selected state is exposed with
`aria-pressed`.

Validation: TypeScript build, Vite production build, oxlint, and the design
detector all passed. The detector returned no findings.
