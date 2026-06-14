# Keyhaven — Password Reset Page Template

A calm, centered password-reset card for Keyhaven, a fictional password manager, that swaps from a request form to a check-your-inbox state with the address echoed back.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Centered card (S1) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Two-step state machine (`data-util="reset-flow"`): email request → sent confirmation, with the step indicator updating (current/done)
- Email validation with inline error and focus return
- "Use a different email" returns to step one with the field preselected; "Resend" shows a temporary aria-live note
- Animated lock illustration — the key turns and the shackle pops on a loop
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Compact header with back-to-sign-in link
2. Three-dot progress steps (request / inbox / new password)
3. Step 1: lock art, headline, vault-email form, security micro-note
4. Step 2: sent illustration, echoed address, resend + change-email actions, troubleshooting box
5. Trust note on link expiry under the card
6. Mini footer with auto-year

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--accent` (#4A6FA5) steel blue + `--accent-deep` (#3A5A8A)
- `--bg` (#F5F6F8) slate page
- `--accent-soft` (#E5ECF5) focus halo
- `--radius` (10px) squared corners
- `--font-display` Palatino serif headings

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
