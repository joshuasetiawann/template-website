# Thicket Post — Unsubscribe Page Template

A gentle unsubscribe page for the Thicket Post, a fictional newsletter, with optional reason radios, a feedback counter, lighter-cadence offers and a confirm → undo flow.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Centered card (S1) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Reason radio group (`data-util="unsubscribe"`) that reveals a feedback textarea once a reason is picked
- Live character counter (0/280) that highlights as it nears the limit
- Alt-preference chips — “Switch to monthly” / “Pause 30 days” — with toasts, offered before unsubscribing
- Confirm → done state swap that echoes the chosen reason, plus a one-click Undo that resubscribes and resets the form
- Toasts for every soft action; footer year via `getFullYear()`

## Sections & States

1. Header with envelope brand mark
2. Confirm card: animated envelope, address echo, reason radios
3. Revealed feedback textarea with counter
4. Lighter-cadence chip offers
5. Done state with reason echo + Undo/resubscribe
6. States: default / reason-picked / submitted / undone

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#F7F5F2) warm gray with dotted overlay
- `--accent` (#F26B5E) coral + `--accent-2` (#D8503F)
- `--ok` (#3FA66A) for the done badge
- `--radius` (14px) / `--radius-lg` (24px) rounding
- `--toast-bg` / `--toast-fg` toast palette

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
