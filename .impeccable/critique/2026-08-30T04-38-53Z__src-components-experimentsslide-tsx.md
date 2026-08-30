---
target: /src/components/ExperimentsSlide.tsx
total_score: 18
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
timestamp: 2026-08-30T04-38-53Z
slug: src-components-experimentsslide-tsx
---
# Experiments slide critique

## Design specificity

High. The typographic stack and its project-specific treatments feel authored for this portfolio rather than like a generic card grid. It is strongest as a gallery browse experience and weaker as a direct portfolio index.

## Heuristic scores

| Heuristic | Score |
| --- | ---: |
| Visibility of system status | 2/4 |
| Match with the real world | 4/4 |
| User control and freedom | 2/4 |
| Consistency and standards | 3/4 |
| Error prevention | 2/4 |
| Recognition rather than recall | 2/4 |
| Flexibility and efficiency | n/a |
| Aesthetic and minimalist design | 3/4 |
| Error recovery | 3/4 |
| Help and documentation | n/a |

**18/32: Acceptable.**

## Strengths

- Each mini-poster draws a credible visual language from its project.
- The detailed image, copy, and actions reward selection without duplicating the stack imagery.
- The stack movement is brief and supports the portfolio's deliberate tone.

## Priority issues

1. **P1: Make position and endpoint behavior visible.** The component has the current index and list length but only displays a padded index. Show `01 / 12` and a restrained endpoint cue before handing control to the outer deck.
2. **P1: Add a recognition-first direct-selection path.** Only the current and two upcoming projects render in the stack, which makes it hard to revisit a known project after sorting. Preserve the stack, but add a compact index or expandable project picker.
3. **P1: Calm the mobile rail collision.** On a 390px-wide view, the persistent slide rail competes with the stacked exhibit. Give it a quieter placement or treatment while Experiments is active.
4. **P2: Replace the order cycle with an exposed choice.** A Curated/A-Z/Newest cycling button depends on recall. A small menu or segmented selector would make the options visible.
5. **P2: Improve active-card accessibility.** Add an announced current position and visible focus treatment; scrolling changes selection without a status update for assistive technology.

## Cognitive load and personas

The primary current-project decision is clear, but discovery, sorting, and endpoint behavior require inference. Alex, a time-poor recruiter, cannot jump to a known project. Sam, a keyboard or screen-reader user, lacks a clear selection/status path. Casey, a mobile visitor, faces dense stacked controls and unclear swipe ownership.

## Minor observations

- The heading copy can carry a compact operational hint about selecting and leaving the stack.
- Per-project type exceptions are expressive but should be contained as the collection grows.
- Clicking the already active card is a no-op despite its button affordance.
