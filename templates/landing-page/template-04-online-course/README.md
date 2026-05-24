# Inkwell Academy — Online Course Landing Page Template

A complete, dependency-free landing page template for Inkwell Academy, a fictional online course brand, styled as an editorial, typography-led narrative layout.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, fonts, CDNs or build step
- Fully responsive (breakpoints at ~960px and ~640px) with a mobile nav drawer
- Semantic landmarks, one h1, labelled icon buttons, :focus-visible styles
- CSS-only imagery: gradients, patterns and inline SVG (no external images)
- Release polish: inline SVG favicon, `theme-color`, skip link, back-to-top button and auto-updating footer year
- Dismissible announcement bar (close persists via localStorage) and scrollspy nav with `aria-current`
- Testimonials with gradient avatar initials and 5-star SVG ratings; hero glow shapes and tinted section rhythm
- Text-mark logo strip for instant social proof
- Pricing cards with reassurance microcopy under every call to action

### JavaScript interactions

- Mobile navigation toggle (aria-expanded synced)
- FAQ accordion with smooth max-height animation and aria-expanded
- Sticky header elevation on scroll
- Reveal-on-scroll animations via IntersectionObserver (reduced-motion safe)
- Email signup validation: preventDefault, regex check, inline error and success states

## Sections

1. Sticky navbar with logo + CTA
2. Hero (editorial, typography-led narrative layout)
3. Narrative problem-to-solution prose
4. How-it-works steps
5. Numbered feature list
6. Benefit split with gradient figure
7. Pull-quote testimonials
8. Pricing
9. FAQ accordion
10. Final call-to-action
11. Footer with link columns and social icon buttons

## Pages

- `index.html` — the Inkwell Academy landing page (all sections in-page).
- `features.html` — deep feature breakdown, how-it-works, use cases and a why-us comparison.
- `pricing.html` — plans with a monthly/annual toggle, add-ons, a full comparison table, testimonials and FAQ.
- `contact.html` — a validated contact form, sales vs support cards, offices and a short FAQ.

The primary navigation links to these real pages; the homepage keeps its in-page section scroll.

## How to Use

Open `index.html` in any modern browser — double-clicking the file works (file:// safe).
No server, package manager or build step is required. Edit the copy directly in
`index.html`; all styling lives in `style.css` and behavior in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#FBF7F0) and `--surface` / `--surface-2` — page and card backgrounds
- `--text` (#22311F) and `--muted` — type colors
- `--accent` (#1D5C42) and `--accent-2` (#D9A441) — brand colors used by buttons, links and gradients
- `--accent-soft`, `--border`, `--shadow` — tints, hairlines and elevation
- `--radius` (6px) / `--radius-lg` — corner rounding across all components
- `--container` (1120px) — page max-width
- `--font-display` / `--font-body` — system font stacks (no webfont downloads)

Change those few variables to re-skin the entire page consistently.

## Library

Part of a 100-template library of hand-tuned, dependency-free HTML/CSS/JS website
templates. Every template in the library works offline with zero external requests.
