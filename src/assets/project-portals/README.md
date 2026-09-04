# Project portal loops

Each featured project has four related assets:

- a landscape still used as the video poster and reduced-motion fallback;
- a portrait still for the same job on narrow screens;
- a 1600 × 1000 landscape MP4;
- a 780 × 1600 portrait MP4.

The videos are silent six-second H.264 loops at 24 fps. Frame A is the original
portal artwork. The files in `keyframes/` are generated next states, or frame B.
Each clip moves from A to B during its first half, then uses B as the starting
frame for the return transition to A. This makes the final loop boundary exact
instead of asking a generated frame to approximate its starting composition.

The page loads one MP4 for the active project and viewport. It pauses the loop
when the card leaves the viewport or the document is hidden. Visitors who
prefer reduced motion receive the matching still instead.
