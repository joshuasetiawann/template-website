# Voltloop — Download the App Page Template

An app-download landing page for Voltloop, a fictional city-mobility app, with platform tabs, store buttons, an inline-SVG QR placeholder and a glowing CSS phone mock-up.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Split panel (S2) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Platform tabs (`data-util="app-download"`): iOS / Android tablist with arrow-key support and aria-selected state
- Each panel shows a store button, a crisp inline-SVG QR-code placeholder and per-platform requirements
- Best-effort platform auto-detection from the user agent, with iOS as a safe default
- Animated CSS phone mock-up: live transit map with a moving vehicle, route lines and an arrivals card — pure CSS/SVG
- Footer year via `getFullYear()`; the store/footer demo links are inert placeholders

## Sections & States

1. Copy pane: rating chip, headline, lead, platform tabs
2. Store panels (iOS / Android) with QR + requirements
3. Feature bullet list
4. Art pane: glowing phone mock with animated map
5. States: active tab / hover-lift store button / reduced-motion

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#0B0B0F) black canvas
- `--accent` (#C6F432) lime + `--accent-2` (#9BE000)
- `--surface` / `--surface-2` panel tints
- `--radius` (16px) / `--radius-lg` (26px) and the phone’s 42px rounding
- `--font-display` condensed type for headings

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
