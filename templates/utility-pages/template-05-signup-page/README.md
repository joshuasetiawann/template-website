# Fernwise — Sign Up Page Template

A split-panel signup page for Fernwise, a fictional plant-care companion, with a live password-strength meter beside an emerald leaf-pattern showcase.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Split panel (S2) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Live password-strength meter (`data-util="password-strength"`): weak/fair/strong segments, color-coded label and four requirement hints that tick as you type
- Full-form validation (name, email, password strength, terms) with per-field errors and focus on the first problem
- Success swap that greets the user by first name and echoes the confirmation address
- Custom animated checkbox and a swaying CSS fern with floating care chips
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Brand header with leaf logomark
2. Signup form: name, email, password + strength meter, terms checkbox, primary CTA
3. Success state with sprouting leaf badge
4. Emerald art panel: tiled leaf pattern, potted-fern illustration, three benefit rows, customer quote
5. Mini footer with auto-year

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--accent` (#0E9F6E) / `--accent-deep` (#0B7A55) emerald pair
- `--weak` / `--fair` / `--strong` meter colors
- `--accent-soft` (#E2F6EC) focus glow
- `--font-display` Georgia serif for headings
- `--radius` (14px) input rounding

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
