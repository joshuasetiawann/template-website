# Sunhatch Studio — Contact Page Template

A postcard-themed contact page for Sunhatch Studio, a fictional food-brand design studio, with a validated enquiry form beside info cards, a CSS map and studio hours.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Split panel (S2) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Full form validation (name, email, topic select, minimum message length) with per-field error notes and focus on the first invalid field
- Success swap: the postcard flips to a "sent" state echoing the first name and email, with a send-another reset
- Custom-styled select with CSS chevron; textarea kept resizable
- Bouncing map pin on a pure-CSS street map; ruled-line postcard background with stamp and postmark
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Header with animated-underline nav (aria-current on Contact)
2. Intro block with eyebrow + headline
3. Postcard form card (`data-util="contact-form"`): name/email row, topic select, message, send CTA
4. Sent success state with stamp-in badge
5. Info cards (email / phone / address), map placeholder, studio-hours table
6. Mini footer with auto-year

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--accent` (#EA580C) / `--accent-deep` (#C2410C) orange pair
- `--accent-soft` (#FDEADD) stamp + focus tint
- `--bg` (#F6F8FA) cool light page for contrast
- `--radius-lg` (20px) postcard rounding
- `--font-display` Trebuchet display voice

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
