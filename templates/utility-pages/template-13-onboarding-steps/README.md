# Driftbase — Get Started Page Template

A four-step onboarding wizard for Driftbase, a fictional team workspace, framed in a browser-style app chrome with step dots, a progress bar and a finish state.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- App-frame chrome (S4) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Multi-step wizard (`data-util="onboarding"`): Continue/Back navigation across four panels with a sliding transition
- Live progress: numbered step pips mark active/done states and a gradient bar fills from 25% to 100%
- Per-step validation — name/role, workspace name, at least one focus area, and an optional but format-checked invite email
- Dynamic summary on the last step plus a confetti-free celebratory finish screen that greets the user by first name
- “Skip setup” shortcut jumps straight to the finish state; footer year via `getFullYear()`

## Sections & States

1. Step 1 — profile: name + role select
2. Step 2 — workspace: prefixed name field + team-size radio cards
3. Step 3 — focus: multi-select checkbox grid (requires one)
4. Step 4 — invite: optional email + live setup summary
5. Finish screen with success badge and dashboard CTA
6. States: default / focus / invalid field / disabled-less nav / finished

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#F2F7FD) sky canvas with dotted overlay
- `--accent` (#0EA5E9) / `--accent-2` (#0369A1) sky-blue pair
- `--ok` / `--err` state colors
- `--radius` (14px) / `--radius-lg` (22px) rounding
- `--shadow` elevation for the app frame

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
