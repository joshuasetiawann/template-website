# Riley Vox — Link in Bio Page Template

A glassy link-in-bio page for Riley Vox, a fictional synthwave producer, with a spinning neon avatar ring, six press-friendly link buttons and a dark/light theme switch.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Full-bleed artistic (S3) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Dark/light theme toggle (`aria-pressed`, swapped icons) persisted via guarded localStorage and synced to `theme-color`
- Copy-profile-link button with clipboard API + execCommand fallback and toast confirmation
- Link buttons with hover lift, light-sweep shine and `:active` press scale; Space key triggers them too
- Conic-gradient avatar ring spinning behind the monogram (reduced-motion safe)
- Auto-filled footer year via `getFullYear()`

## Sections & States

1. Slim header: handle + theme toggle
2. Bio card: neon-ring avatar, name, handle, bio copy
3. Copy-profile-link chip
4. Six links (`data-util="bio-links"`) with icons, subtitles and a NEW tag
5. Social icon row and booking contact
6. Mini footer with auto-year; toast element for copy feedback

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#12101A) near-black violet base (light theme overrides on `body[data-theme="light"]`)
- `--accent` (#F472B6) pink + `--accent-2` (#8B5CF6) violet gradient pair
- `--surface` glass card tint + `--border` hairlines
- `--radius` (18px) / `--radius-lg` (26px) rounded language
- `--toast-bg` / `--toast-fg` toast colors per theme

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
