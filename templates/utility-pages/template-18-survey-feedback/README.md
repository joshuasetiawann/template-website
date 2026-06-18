# Bloomgauge — Share Feedback Page Template

A playful feedback survey for Bloomgauge, a fictional analytics product, with an interactive star rating, an NPS range slider, topic chips, a counted comment box and a thank-you recap.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Centered card (S1) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Interactive 5-star rating (`data-util="survey"`) as an accessible radiogroup with hover preview and full arrow-key control
- NPS range slider with a live value bubble and a Detractor/Passive/Promoter tag that recolors as you drag
- Character-counted comment box (0/500) plus selectable topic chips
- Conditional follow-up email field with validation, and a celebratory thank-you state that recaps the rating, NPS and topics as pills
- Required-rating validation with a shake animation; footer year via `getFullYear()`

## Sections & States

1. Header with survey-length badge
2. Star-rating block (required, live word)
3. NPS slider block with sentiment tag
4. Topic chips + counted comment
5. Follow-up email opt-in (reveals field)
6. Thank-you state with recap pills
7. States: default / hover / rated / invalid (shake) / submitted

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#F5F3FA) lavender with dotted overlay
- `--accent` (#6D5BA6) violet + `--accent-2` (#54448A)
- `--star` (#F5B544) rating gold
- `--ok` / `--err` sentiment colors
- `--radius` (14px) / `--radius-lg` (26px) rounding

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
