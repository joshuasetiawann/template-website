# Vioma — Verify Email Page Template

An app-frame email-verification screen for Vioma, a fictional journaling app, with six auto-advancing code boxes, paste support and a cooldown-guarded resend button.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- App-frame chrome (S4) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Six OTP inputs (`data-util="otp"`): digits only, auto-advance on entry, Backspace walks left and clears, arrow keys navigate, full-code paste distributes characters
- Verify button stays disabled until all six digits exist; incomplete submits shake the row with an aria-live error
- Success swap to a verified state after a short accepted beat
- Resend button locks for 30 seconds and counts itself down ("Resend in 29s…")
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Compact brand header with step indicator chip
2. Browser-style app frame (traffic dots + padlocked URL pill)
3. Animated envelope art with sealed-check badge and sparks
4. OTP fieldset with dash separator and live status line
5. Verified success state with continue CTA
6. Resend/cooldown row, alternate links, demo hint, mini footer with auto-year

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--accent` (#8B5CF6) / `--accent-deep` (#7C3AED) violet pair
- `--chrome` (#F4F1FB) frame chrome tint
- `--accent-soft` (#EDE9FE) focus halo + chips
- `--font-mono` for code digits and the URL pill
- `--radius` (14px) input rounding

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
