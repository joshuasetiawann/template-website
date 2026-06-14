# Lumenstack — Login Page Template

A split-panel login page for Lumenstack, a fictional team-knowledge workspace, pairing an indigo glass showcase panel with a focused white sign-in form.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Split panel (S2) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Inline validation for email format and password length with per-field error notes and focus management
- Show/hide password toggle (`aria-pressed` + swapped eye icons)
- "Remember this device" checkbox prefills the email on return visits via guarded localStorage
- Animated submit: spinner state, then a success swap with a loading shimmer bar
- Social-style sign-in buttons (Google / GitHub look-alikes, `href="#"`)
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Indigo art panel: brand, headline, glass testimonial + floating result card, stat row, compliance footnote
2. Form pane (`data-util="login-form"`): heading + trial link
3. Social buttons and a labelled divider
4. Email + password fields with icons, forgot-password link, remember-me and SSO chip
5. Primary submit with busy spinner → signed-in success state
6. Mini footer with auto-year and legal links

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--panel` (#1E1B4B) indigo showcase side
- `--accent` (#4F46E5) buttons, links and focus rings
- `--accent-soft` (#EEEDFD) focus glow + chips
- `--border`, `--radius` (12px) input language
- `--shadow` card elevation

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
