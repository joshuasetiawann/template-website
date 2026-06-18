# Mintcrate — Thank You Page Template

A mint-fresh order thank-you card for Mintcrate, a fictional eco home-goods shop, with a confetti burst, copyable order number and a packed-to-delivered timeline.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Centered card (S1) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Lightweight JS confetti burst (~80 CSS-animated pieces, auto-cleaned, skipped entirely under prefers-reduced-motion)
- Copy-order-number button with clipboard fallback and toast confirmation
- Pulsing "current step" dot on the delivery timeline
- Check-mark badge pops in with a spring curve
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Header with continue-shopping pill
2. Confirmation card (`data-util="order-confirmation"`): check badge, headline, email echo
3. Dashed order-number strip with copy button
4. Four-step delivery timeline (ordered → delivered)
5. Order summary: three items, subtotal/shipping/credit/total
6. Track + receipt CTAs, address-edit note, three "while you wait" cards, footer with auto-year

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#F0FAF5) mint page
- `--accent` (#16A34A) / `--accent-deep` (#15803D) green pair
- `--gold` (#EAB308) confetti partner color
- `--radius-lg` (26px) friendly rounding
- `--font-mono` for the order number

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
