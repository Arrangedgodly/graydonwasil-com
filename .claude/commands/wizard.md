---
description: Walk through deploying graydonwasil.com to Cloudflare Pages, step by step
---

You are walking the user through deploying this repo (a Vite + React portfolio
site) to Cloudflare at graydonwasil.com. This is a guided, interactive
process — most of the steps happen in the user's GitHub/Cloudflare accounts,
which you cannot act inside directly, so your job is to do everything you
*can* do from the CLI, and clearly hand off everything you can't with exact
instructions, then wait for the user to confirm before moving on.

Go stage by stage. Don't dump all stages at once — finish one, confirm it
worked, then move to the next. Re-check actual state (git remote, `gh auth
status`, file contents, live URL) rather than assuming a previous run of this
wizard finished cleanly; someone may run `/wizard` again after stopping
halfway.

## Stage 1 — Get the code on GitHub

1. Run `git remote -v`. If a remote already exists, confirm it points
   somewhere sensible and skip to Stage 2.
2. Check `gh auth status`. If `gh` isn't installed, winget has it
   (`winget install --id GitHub.cli -e`) — ask before installing anything.
3. If not authenticated, run `gh auth login --hostname github.com
   --git-protocol https --web` in the background (it blocks waiting for
   browser approval — a device code and URL print to its output file; relay
   both to the user and pick the task back up once it completes, don't poll).
4. Once authenticated, ask public vs. private, then
   `gh repo create <name> --public|--private --source=. --remote=origin --push`.
5. Confirm `git log --oneline -1` matches `git log origin/main --oneline -1`.

## Stage 2 — Deploy to Cloudflare

Entirely dashboard-driven — walk the user through it:

1. dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**
   → select the repo from Stage 1.
2. Build settings: Framework preset **Vite**, build command `npm run build`,
   output directory `dist`.
3. Deploy.

**Known gotcha:** on current Cloudflare accounts this deploys as a Worker
with static assets, not classic Pages — the live URL is
`<project>.<account>.workers.dev`, not `*.pages.dev`, and as of a 2025
security change that workers.dev route is **disabled by default**. If the
user says the URL looks "disabled," send them to the project's **Domains**
tab (or Settings → Domains & Routes) to toggle it on — first have them check
the **Deployments** tab shows the latest build as Success, since enabling a
failed deployment's route just serves an error.

Once live, verify yourself: fetch the homepage, and check a nested route
(e.g. `/work/<project-id>`) actually renders instead of 404ing — confirms
the SPA fallback is working. A stale-looking result in the embedded browser
can be leftover console/network history from an earlier navigation in the
same tab; open a fresh tab before concluding something's actually broken.

## Stage 3 — Contact form endpoint (optional)

The form works via a `mailto:` fallback with no setup — ask whether the user
wants a real backend now or wants to skip this.

If yes: guide creating a free endpoint (Formspree is the path of least
resistance — sign up, create a form, copy the endpoint URL, e.g.
`https://formspree.io/f/xxxxxxxx`). Then:
- Set `VITE_CONTACT_ENDPOINT` in a local `.env` (gitignored) so `npm run dev`
  matches production.
- Add the same variable in the Cloudflare project's **build-time**
  environment variables (not a runtime secret — Vite bakes `VITE_*` vars into
  the bundle at build time), then trigger a redeploy so it takes effect.

## Stage 4 — Custom domain

1. In the Worker/Pages project: **Domains → Add Custom Domain** →
   `graydonwasil.com` (and `www.graydonwasil.com` if wanted).
2. If the domain's zone is already on Cloudflare, this auto-provisions DNS
   and SSL — no manual record editing. If not, Cloudflare prompts to add it
   as a zone first, which means updating nameservers at the registrar; lay
   out exactly what changes and confirm before the user does it.

**Known gotcha:** if an *older* Worker or Pages project already holds this
hostname as its custom domain (a previous deploy attempt, or a pre-existing
site), the new domain binding can silently not take effect and the old site
keeps serving. If the live domain doesn't match what was just deployed, have
the user check **Workers & Pages** for any other project with this hostname
under its Domains tab, and remove it there.

3. Once resolved, verify in a fresh browser tab (see the stale-cache note in
   Stage 2) and check the response headers show `server: cloudflare` and the
   HTML matches the current build's asset hashes (`dist/index.html` after a
   local build).

## Stage 5 — Real project photography

Screenshots and the About photo are optional and don't block anything above.
`src/components/Shot.tsx` renders a real `<img>` the moment a matching file
exists in `src/assets/screenshots/`, falling back to the diagonal-hatch
placeholder otherwise — see that folder's `README.md` for the exact filename
keys (`rhymepage-1`, `cars-2`, `about`, etc.). Walk the user through:

1. Take or find the images.
2. Save them into `src/assets/screenshots/` with the matching key names.
3. Rebuild (`npm run build`) to confirm they're picked up, then commit and
   push — Cloudflare redeploys automatically on push once Stage 1/2 are done.

## Stage 6 — Wrap-up

Remind the user what's still open per the README's "Not done yet" list
(Open Graph/Twitter card images, `robots.txt` / sitemap) — none of this
blocks deployment.
