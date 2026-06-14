# Nebulift — Coming Soon Page Template

A full-bleed, aurora-lit coming-soon page for Nebulift, a fictional pocket-planetarium app, with a live launch countdown over an animated starfield.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Full-bleed artistic (S3) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Live countdown to the 2026-10-24 launch date — days/hours/minutes/seconds tick every second and flip to a "live" state at zero
- Email notify form with inline validation, shake feedback on errors and a success swap that echoes the address back
- Animated background art: drifting aurora ribbons, twinkling starfield layers and a periodic comet streak (all CSS)
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Compact brand header with animated underline links
2. Hero: launch badge, gradient headline, lead copy
3. Countdown widget (`data-util="countdown"`) in glass cells
4. Notify form → success state with checkmark pop
5. Three "sneak peek" feature cards
6. Mini footer with auto-year and inline links

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#0B0F1A) deep-space backdrop
- `--accent` (#8B7CF6) violet and `--accent-2` (#2DD4BF) teal aurora pair
- `--surface` / `--border` glass-card tints
- `--radius` (16px) / `--radius-lg` (24px) rounding
- `--font-display` / `--font-mono` type pair (spaced caps + tabular digits)

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
