# Screenshots

Drop image files in here named to match a project id and shot number, or
`about` for the About page photo. Any file matching a key below is picked up
automatically on the next build — no code changes needed.

| File (any of .png / .jpg / .jpeg / .webp) | Where it shows up |
| --- | --- |
| `rhymepage-1` | Rhymepage detail — main image + thumbnail 1 (also the Work card thumbnail) |
| `rhymepage-2` | Rhymepage detail — thumbnail 2 |
| `rhymepage-3` | Rhymepage detail — thumbnail 3 |
| `cars-1` / `cars-2` / `cars-3` | Collectible Cars DB — same pattern |
| `ag-1` / `ag-2` / `ag-3` | Arranged Godly — same pattern |
| `about` | The About page photo |

Example: `rhymepage-1.png`, `about.jpg`.

Aim for roughly 1600px on the long edge — these render inside boxes with
`object-fit: cover`, so exact aspect ratio doesn't matter much, but very
large source files will slow the site down for no visual benefit.
