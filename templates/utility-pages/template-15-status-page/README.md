# Northpeak — System Status Page Template

A dark, terminal-flavored status page for Northpeak, a fictional cloud platform, with live service pills, 90-day uptime bars, animated metrics and an incident timeline.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- App-frame chrome (S4) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Live updated-at ticker (`data-util="status"`) counting “just now → seconds/minutes ago” every second
- Five components with operational/degraded/outage pills and 90-day uptime bars (each bar carries a day-by-day tooltip)
- Animated live metrics — API latency, requests/min and error rate jitter with refreshing sparkline bars
- Collapsible subscribe panel (aria-expanded) with email validation and a success note
- Incident timeline with resolved + maintenance entries; footer year via `getFullYear()`

## Sections & States

1. Overall banner: pulsing ring, status headline and live timestamp
2. Subscribe-to-updates panel (toggled, validated)
3. Components list with status pills + uptime bars + legend
4. Live metric cards with sparklines
5. Past-incidents timeline (resolved / maintenance)
6. States: operational / degraded / outage / maintenance / subscribed

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#0E1117) terminal canvas with grid overlay
- `--accent` (#3FB950) operational green
- `--deg` (#D29922) / `--down` (#F85149) / `--info` (#58A6FF) status colors
- `--radius` (12px) / `--radius-lg` (16px) rounding
- `--font-mono` for the terminal-style numerics

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
