# Atlas Vey — Digital Card Page Template

A premium digital business card for Atlas Vey, a fictional product designer, with tap-to-copy contact details, a downloadable vCard, a QR placeholder, share buttons and a dark/light theme toggle.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Full-bleed artistic (S3) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Tap-to-copy phone and email buttons (`data-util="vcard"`) with clipboard + legacy fallback and toast confirmations
- Save-contact button that builds a real vCard (.vcf) and downloads it via a data blob — works straight from file://
- Dark/light theme toggle persisted to localStorage, with aria-pressed and a live theme-color meta update
- Share button using the Web Share API with a copy-link fallback, plus an inline-SVG QR-code placeholder
- Social buttons are inert `href="#"` placeholders handled by one delegated preventDefault listener; footer year via `getFullYear()`

## Sections & States

1. Full-bleed animated backdrop (orbs, sheen, grid)
2. Header with brand + theme toggle
3. vCard: cover, spinning gold avatar ring, verified tick
4. Identity (name, role, org, tagline)
5. Copy phone / email, Save contact, QR tile
6. Social row + Share / Copy-link
7. States: dark / light theme / copied / shared / demo-link

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#15171B) charcoal + light-theme override class
- `--accent` (#C9A227) gold + `--accent-2` (#E6C455)
- `--surface` glass tints with backdrop blur
- `--radius` (14px) / `--radius-lg` (26px) rounding
- `--font-display` Didone serif for the name

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
