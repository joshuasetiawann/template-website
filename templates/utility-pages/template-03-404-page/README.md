# Pagefinch — 404 Not Found Page Template

A playful full-bleed 404 page for Pagefinch, a fictional notes app, starring a giant outlined 404 with a perched finch and a live link-rescue search.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Full-bleed artistic (S3) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Live search (`data-util="rescue-search"`) filters the helpful-links grid as you type and wraps matches in `<mark>` highlights
- Result counter with `aria-live` updates plus a friendly no-results state echoing the query
- Clear-search button appears only while a query is active
- Animated art: stroke-drawn coral zero, tilting fours, floating scattered shapes (reduced-motion safe)
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Compact brand header with a solid dashboard CTA
2. Giant outlined 404 art (SVG text strokes + bobbing finch)
3. Headline + explanation copy
4. Rescue search bar with offset hard-shadow styling
5. Six-card helpful-links grid (home, docs, API, billing, support, status)
6. No-results empty state and a mini footer with the error code

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--ink` (#1C1B22) outline + text color
- `--accent` (#F26B5E) coral pop
- `--accent-soft` (#FDE7E4) shadow/highlight tint
- `--font-display` condensed display stack
- `--radius-lg` (20px) card rounding

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
