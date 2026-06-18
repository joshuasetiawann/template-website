# Marrow & Vale — Privacy & Terms Page Template

A long-form combined privacy policy and terms page for Marrow & Vale, a fictional writing platform, with a sticky scrollspy table of contents, reading progress and a cookie-consent banner.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Long-form document (S5) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Sticky table of contents (`data-util="legal-doc"`) with IntersectionObserver scrollspy that sets `aria-current` on the active section
- Reading-progress bar and live “% read” counter tied to scroll position
- Cookie-consent banner persisted to `localStorage` in a try/catch (degrades gracefully in private windows)
- Print button (`window.print()`) with a dedicated print stylesheet that hides chrome and prints the document cleanly
- Back-to-top button on this long page; footer year via `getFullYear()`

## Sections & States

1. Sticky brand header with section jump links
2. Document hero: version/effective-date meta, lede, print action
3. Sticky TOC with scrollspy + reading progress
4. Eleven numbered legal sections (intro → contact)
5. Cookie banner (Accept all / Essential only)
6. States: active TOC item / scrolled (back-to-top shown) / consent stored

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#FAF7F1) paper with ruled-line overlay
- `--accent` (#1C1814) ink + `--gold` (#B08D57)
- `--font-display` / `--font-body` serif and `--font-ui` sans pairing
- `--radius` (10px) / `--radius-lg` (16px) rounding
- `--rule` hairline color between sections

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
