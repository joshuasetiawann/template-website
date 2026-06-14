# Bolt & Beam — Maintenance Page Template

A warm, centered maintenance card for Bolt & Beam, a fictional hardware store, with a shimmering progress bar, a clear ETA and an email notify form.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Centered card (S1) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Animated progress bar with a light-sweep shimmer; the percentage gently nudges forward over time (aria-valuenow kept in sync)
- "Notify me" email form with inline validation and a success swap that echoes the address
- Pulsing status pill and bobbing toolbox illustration (pure CSS + inline SVG)
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Compact brand header with a status-page pill link
2. Centered card (`data-util="maintenance"`): status pill, toolbox art, headline + reassurance copy
3. Migration progress block with shimmer fill and ETA note
4. Notify form → green success state
5. Help row (email / phone / status) and an order reassurance note
6. Mini footer with auto-year

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#FFF8EE) warm cream page
- `--accent` (#F59E0B) / `--accent-deep` (#D97706) amber pair
- `--surface`, `--border` card colors
- `--radius-lg` (30px) soft card rounding
- `--font-display` rounded display stack

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
