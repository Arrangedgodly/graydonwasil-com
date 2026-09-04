---
name: Graydon Wasil
description: A dark-first working console for inspecting software, decisions, and real project evidence.
colors:
  canvas: "#0a0e11"
  panel: "#121a20"
  ink: "#e2edf1"
  signal-cyan: "#2fd9ef"
  signal-cyan-hover: "#71e8f7"
  instrument-blue: "#4fb8e8"
  divider: "color-mix(in srgb, #7ed6e8 17%, transparent)"
  light-canvas: "#eef3f5"
  light-panel: "#ffffff"
  light-ink: "#0d1619"
  light-signal-cyan: "#097586"
  light-signal-cyan-hover: "#075f70"
  light-instrument-blue: "#1a6590"
  light-divider: "color-mix(in srgb, #0d4a57 18%, transparent)"
typography:
  display:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(34px, min(7vw, 11vh), 104px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(24px, min(3.4vw, 5.2vh), 46px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "0.005em"
  title:
    fontFamily: "Barlow Condensed, system-ui, sans-serif"
    fontSize: "clamp(19px, min(2.2vw, 3.4vh), 30px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "0.03em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.06em"
rounded:
  square: "0px"
  sm: "2px"
  md: "4px"
  lg: "7px"
spacing:
  step-1: "3.4px"
  step-2: "6.8px"
  step-3: "10.2px"
  step-4: "13.6px"
  step-6: "20.4px"
  step-8: "27.2px"
components:
  button-primary:
    backgroundColor: "{colors.signal-cyan}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.square}"
    padding: "6.8px 12.24px"
    size: "14px"
  button-primary-hover:
    backgroundColor: "{colors.signal-cyan-hover}"
    textColor: "{colors.canvas}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "6.8px 12.24px"
    size: "14px"
  input-field:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "8px 11px"
    size: "14px"
    height: "36px"
  tag-outline:
    backgroundColor: "transparent"
    textColor: "{colors.signal-cyan}"
    rounded: "{rounded.square}"
    padding: "3px 10px"
    size: "11px"
  navigation-item:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "0 clamp(13px, 2vw, 19px)"
    size: "13px"
    height: "44px"
  bordered-card:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "{spacing.step-3}"
---

# Design System: Graydon Wasil

## Overview

**Creative North Star: "The Working Console"**

The portfolio behaves like a working console for inspecting real software. It is dark-first, compact, and engineered around screenshots, project facts, and direct controls. The chrome stays quiet so the work can carry the page, while cyan signals show position, selection, and the next useful action.

The system is focused, engineered, direct, and quietly personal. It borrows the clarity of audio equipment and developer tools without pretending to be a terminal. Avoid glossy agency presentation, soft generic SaaS styling, and decorative retro-computer effects that do not explain state or support an action.

**Key Characteristics:**

- Full-viewport deck with persistent navigation and a fixed status bar.
- Dark blue-black grounds with sparse cyan and blue signals.
- Condensed uppercase display type paired with plain body copy and monospaced readouts.
- Square controls, fine dividers, restrained glass, and real project imagery.
- Short, physical-feeling state changes with a complete reduced-motion path.

## Colors

The palette reads like a dim workbench with illuminated status marks. Dark mode is the default. Light mode keeps the same cool hue family and restores body-text contrast instead of merely inverting the page.

### Primary

- **Signal Cyan** (`#2fd9ef`): Marks the active slide, selected option, primary action, focus outline, and other live state in the default dark theme.
- **Light Signal Cyan** (`#097586`): Replaces Signal Cyan on the light canvas. This darker value keeps small links and control labels readable.
- **Signal Cyan Hover** (`#71e8f7`) and **Light Signal Cyan Hover** (`#075f70`): Strengthen interactive text and primary-button feedback within their matching themes.

### Secondary

- **Instrument Blue** (`#4fb8e8`) and **Light Instrument Blue** (`#1a6590`): Support secondary accent work and themed tonal variation. They do not compete with the active cyan signal.

### Neutral

- **Console Canvas** (`#0a0e11`): The default page ground and the quiet text color inside filled cyan controls.
- **Console Panel** (`#121a20`): The opaque field and panel ground under interactive content.
- **Console Ink** (`#e2edf1`): Primary text and high-contrast control content on dark surfaces.
- **Circuit Divider** (`color-mix(in srgb, #7ed6e8 17%, transparent)`): Fine structural lines around controls, frames, and glass chrome.
- **Light Canvas** (`#eef3f5`), **Light Panel** (`#ffffff`), and **Light Ink** (`#0d1619`): The corresponding cool paper, panel, and text roles in light mode.
- **Light Circuit Divider** (`color-mix(in srgb, #0d4a57 18%, transparent)`): Preserves the same low-contrast structure on the light canvas.

### Named Rules

**The Signal Means State Rule.** Cyan identifies an active state, a focus target, or a useful action. Do not spread it across passive decoration.

**The Evidence Keeps Its Color Rule.** Project screenshots stay in their original color. The surrounding interface is restrained enough to let them stand out without a duotone treatment.

**The Experiment Owns Its Exhibit Rule.** An experiment card may use its own background, type, and ink colors, but that palette stays inside the card. Persistent navigation and page chrome remain part of the main system.

## Typography

**Display Font:** Barlow Condensed with `system-ui` and `sans-serif` fallbacks

**Body Font:** Barlow with `system-ui` and `sans-serif` fallbacks
**Label/Mono Font:** JetBrains Mono with `ui-monospace`, Menlo, Consolas, and `monospace` fallbacks

**Character:** Barlow Condensed makes headings feel direct and space-efficient without copying a terminal. Barlow keeps explanations readable, while JetBrains Mono turns counts, labels, and system hints into instrumentation.

### Hierarchy

- **Display** (600, `0.96`): Uppercase hero statements use `clamp(34px, min(7vw, 11vh), 104px)`. Split deliberate phrases into visible lines and balance them against project imagery.
- **Headline** (600, `0.96`): Major slide headings such as About and Contact use `clamp(24px, min(3.4vw, 5.2vh), 46px)`.
- **Title** (600, `1.12`): Project names, detail headings, and strong component titles use `clamp(19px, min(2.2vw, 3.4vh), 30px)`.
- **Body** (400, `15px`, `1.55`): Explanations and project context. Keep running text within `65ch`; tighter slide copy scales down to `12.5px` when viewport height is constrained.
- **Label** (400, `11px`, `0.06em`, uppercase): Counts, navigation notes, metadata, and small operating instructions.

### Named Rules

**The Display Earns Its Size Rule.** Reserve oversized condensed type for the visitor's current subject. Supporting copy stays smaller and carries the detail.

**The Readout Has a Job Rule.** Monospaced uppercase text reports state, order, metadata, or an instruction. Do not use it as a blanket technical texture.

## Layout

The shell is one viewport high and does not document-scroll. Fixed navigation occupies a responsive top reserve (`clamp(70px, 9vh, 94px)`), and the status bar occupies a bottom reserve (`clamp(62px, 8vh, 84px)`). Each route mounts into the remaining stage. Horizontal gutters use `clamp(16px, 4vw, 32px)`, full content stops at `1120px`, and body copy stops at `65ch`.

Featured project slides stack a contained screenshot over a compact metadata block. Deeper project views use a `7fr / 5fr` media-to-copy grid. About and Contact use two columns, while experiment exhibits use a two-column card with copy and media treated as one artifact.

At `760px` and below, two-column layouts collapse to one column. The side progress rail steps out of the experiment view, navigation padding tightens, and touch controls retain at least `44px` of height. Short mobile viewports at `700px` or less reduce experiment spacing and media height instead of hiding actions. Media always keeps its intrinsic proportions; explicit height budgets prevent cropping and distortion.

**The Chrome Owns Its Space Rule.** Size every view inside the top and bottom reserves. Do not let content disappear under fixed navigation.

**The Image Keeps Its Shape Rule.** Use `width: auto`, `height: auto`, and a viewport-aware `max-height` for screenshots and portraits. Never stretch or crop evidence merely to fill leftover space.

## Elevation & Depth

The system is structurally layered. Most content is flat and separated by tone, a one-pixel divider, or spacing. Glass and shadow belong to persistent navigation, floating menus, and modal-like views where the interface must sit above project content. The dark theme uses firmer black shadows; the light theme uses lower-opacity blue-black shadows. Screenshot cards may lift on interaction, but ordinary text panels do not float by default.

### Shadow Vocabulary

- **Edge Lift:** Dark mode uses `box-shadow: 0 1px 2px rgb(0 0 0 / 0.45)`. Light mode uses `box-shadow: 0 1px 2px rgb(13 40 48 / 0.12)`. This provides a small separation for compact elevated controls.
- **Chrome Lift:** Dark mode uses `box-shadow: 0 4px 14px rgb(0 0 0 / 0.5)`. Light mode uses `box-shadow: 0 4px 14px rgb(13 40 48 / 0.13)`. Use it for persistent navigation over changing page content.
- **Overlay Lift:** Dark mode uses `box-shadow: 0 18px 44px rgb(0 0 0 / 0.55)`. Light mode uses `box-shadow: 0 18px 44px rgb(13 40 48 / 0.16)`. Use it for menus and views that must read as a separate layer.
- **Exhibit Lift:** Experiment cards use `box-shadow: 0 16px 36px color-mix(in srgb, #000 26%, transparent)` when their individual visual world needs to read like a mounted exhibit.

### Named Rules

**The Flat Until Layered Rule.** A surface stays flat unless navigation, focus, or containment requires visible depth.

**The Glass Marks Chrome Rule.** Use the `16px` backdrop blur for persistent controls and overlays. Do not apply glass to ordinary body sections or project copy.

## Shapes

The interface is square by default. Buttons, fields, tags, cards, navigation, image frames, and selection marks use hard corners (`0px`) and one-pixel borders. Small radius tokens (`2px`, `4px`, and `7px`) exist for exceptional content but do not define the portfolio chrome.

Project media uses thin blueprint frames. The four `11px` corner marks are reserved for featured screenshots and detail media, where they identify a piece of project evidence. Do not repeat them on ordinary panels. Filled circles and pill shapes are absent from the main control language; the progress rail uses small square indicators instead.

**The Square Is the Default Rule.** New interface controls begin at `0px` radius. A rounded shape needs a content-specific reason.

## Components

Components feel precise and tactile. They are compact at rest, clear on hover and focus, and move by only a few pixels when pressed.

### Buttons

- **Shape:** Square with a one-pixel border (`0px` radius), condensed text (`14px`, 600), and compact padding (`6.8px 12.24px`). Coarse-pointer contexts raise the minimum height to `44px`.
- **Primary:** Signal Cyan ground with Console Canvas text. Hover moves to the stronger cyan tone; active state shifts down `1px` and scales to `0.985`.
- **Secondary:** Transparent ground with a Circuit Divider border. Hover adds a `12%` cyan wash and promotes the border to Signal Cyan.
- **Ghost:** No visible border at rest. Use for low-emphasis inline actions, with a cyan wash on hover.
- **Focus:** Every control receives a `2px` Signal Cyan outline with a `2px` offset unless the component deliberately aligns its focus border to its own edge.

### Chips

- **Style:** Tags use `11px` type, `3px 10px` padding, square corners, and either a quiet tonal fill or a one-pixel Signal Cyan outline.
- **State:** Tags describe project media and tools. They do not behave like decorative badges or replace explicit selection controls.

### Cards / Containers

- **Corner Style:** Square (`0px`).
- **Background:** General cards are transparent with a Circuit Divider border. Glass panels use the theme's translucent panel color and `16px` blur.
- **Shadow Strategy:** General content remains flat. Navigation and menus use Chrome Lift or Overlay Lift. Experiment exhibits use their own contained shadow.
- **Internal Padding:** General cards use `10.2px`; large form and exhibit panels scale from `14px` to `38px` according to available space.

### Inputs / Fields

- **Style:** Opaque Console Panel ground, Console Ink text, one-pixel Circuit Divider border, square corners, `8px 11px` padding, and a `36px` minimum height.
- **Focus:** The border becomes Signal Cyan and the global `2px` outline sits flush to the field edge.
- **Placeholder:** Use a `42%` mix of Console Ink so guidance remains subordinate to entered text.

### Navigation

- **Primary navigation:** A centered glass bar with `4px` internal padding, a one-pixel Circuit Divider border, and Chrome Lift. Items use condensed uppercase `13px` text, `44px` minimum height, and responsive horizontal padding.
- **Active state:** A thin Signal Cyan border and `16%` cyan wash slide behind the current item. The label itself becomes Signal Cyan.
- **Status bar:** Previous and next controls occupy `44px` squares. The center readout states what the current view expects, while the theme toggle keeps its selected state visible.
- **Progress rail:** Small square markers show deck position. The active square fills with Signal Cyan and scales to `1.5`.

### Blueprint Media Frame

Featured screenshots sit inside a one-pixel frame with four crosshair corner marks. The image remains uncropped, dots report alternate shots, and detail mode adds a labeled full-size action. This frame is the recurring signature for project evidence.

### Experiment Exhibit

Each experiment receives a contained poster-like card with its own background, ink, type accent, and geometric mark. The card may become more colorful than the portfolio around it, but its metadata, action hierarchy, media treatment, responsive behavior, and restrained motion still follow the system.

**The Press Is Small Rule.** Active feedback moves a control by `1px` or scales it by a few percent. Never turn a routine click into a decorative animation.

## Do's and Don'ts

### Do:

- **Do** use Signal Cyan to identify active, focused, and actionable states.
- **Do** keep project screenshots in their original color and intrinsic proportions.
- **Do** reserve large condensed headings for the current subject and keep explanations within `65ch`.
- **Do** budget every slide between the fixed top and bottom chrome.
- **Do** preserve `44px` touch targets and the reduced-motion path on every interactive control.
- **Do** let an experiment's visual identity live inside its exhibit card while the outer chrome remains stable.

### Don't:

- **Don't** soften the interface into generic rounded SaaS cards, floating pills, or oversized empty panels.
- **Don't** imitate a terminal with decorative code, scan lines, green-on-black clichés, or controls that do not report real state.
- **Don't** use gradients as ambient decoration. Existing gradients solve a concrete job such as image legibility, placeholder hatching, or an experiment-specific mark.
- **Don't** add glass or shadow to ordinary content that already has enough separation from spacing and dividers.
- **Don't** crop screenshots, hide actions under the fixed footer, or remove specific copy merely to make a layout easier.
- **Don't** make cyan common enough that the visitor can no longer tell what is selected or clickable.
