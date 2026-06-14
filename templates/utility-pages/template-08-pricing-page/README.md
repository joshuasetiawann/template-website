# Quotaflow — Pricing Page Template

A clean SaaS pricing page for Quotaflow, a fictional API-metering service, with a monthly/yearly billing switch, three tiers, a full comparison table and a pricing FAQ.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Long-form document (S5) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Billing toggle (`data-util="billing-toggle"`) slides a thumb, swaps every price via `data-monthly`/`data-yearly` and updates the billed-how notes (aria-pressed + aria-live)
- FAQ accordion — one panel open at a time, `aria-expanded`/`aria-controls` kept in sync, animated chevron
- Back-to-top button appears after scrolling (reduced-motion aware smooth scroll)
- Price swap micro-animation on every toggle
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Sticky translucent header with anchor nav
2. Hero with billing toggle and live note
3. Three plan cards — Growth wears the "Most popular" ribbon
4. Scrollable feature-comparison table (keyboard focusable region)
5. Five-question pricing FAQ accordion
6. Gradient final CTA card and footer with auto-year

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--accent` (#2563EB) / `--accent-deep` (#1D4ED8) SaaS blues
- `--surface-2` (#F7F9FE) section tint
- `--container` (1120px) page width
- `--radius-lg` (20px) card rounding
- `--border` hairline color used across table and cards

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
