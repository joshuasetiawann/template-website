# Willowbox — FAQ Page Template

A friendly serif FAQ page for Willowbox, a fictional craft-box subscription, with live search that highlights matches inside a 12-question accordion plus category chips.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Long-form document (S5) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Live FAQ search (`data-util="faq-search"`) filters questions and answers as you type and wraps every match in `<mark>` (originals cached so highlights never stack)
- Answers that match a query auto-expand so the highlighted text is visible
- Category chips (All / Shipping / Boxes / Billing / Account) combine with the search query; `aria-pressed` tracked
- Accordion items toggle independently with `aria-expanded` + `aria-controls`
- Result counter (`aria-live`) and a no-results state echoing the query; back-to-top button on scroll
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Header with brand, links and join CTA
2. Hero: stitched divider, headline, search bar, category chips, live result note
3. Twelve-item FAQ accordion tagged by category
4. No-results empty state
5. "Still stuck?" teal contact card
6. Mini footer with auto-year; floating back-to-top

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#FBF7F0) cream paper
- `--accent` (#0D9488) / `--accent-deep` (#0B7C72) teal pair
- `--mark` (#FCE9B8) highlight color
- `--font-display` Georgia serif voice
- `--radius` (16px) card rounding

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
