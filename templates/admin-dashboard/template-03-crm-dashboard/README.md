# Pipeforge — CRM Dashboard Template

A full-dark CRM dashboard template with bento stat tiles, conic-gradient pipeline donut, animated bar chart, timeline feed and a light theme toggle.

Part of a 100-template library of pure HTML/CSS/JS website templates. This template uses the full-dark bento-grid layout with glowing accents.

## Features

- Client-side table pagination (`data-pagination`): Prev/Next + numbered pages with a live "Showing X–Y of Z" counter
- Export-to-CSV button (`data-export`) that builds a CSV from the table DOM and downloads it via Blob (file:// safe)
- Custom chart tooltips on hover plus date-range chips on the main chart with a working dataset swap
- Skeleton shimmer on the stat cards and main chart that resolves into the count-up / draw-in animations
- Scroll-reveal cards via IntersectionObserver (content stays visible without JS; respects prefers-reduced-motion)
- Breadcrumb trail, skip-to-content link, inline SVG favicon + theme-color meta, auto-year footer with version chip
- Off-canvas mobile sidebar with hamburger toggle, overlay and Escape-to-close
- Notifications dropdown and profile menu (close on outside click and Esc, ARIA expanded states)
- Count-up animation on every stat value
- Animated bar chart — bars grow on load from a plain JS data array
- Conic-gradient donut chart that sweeps in with requestAnimationFrame
- Dark/light theme toggle (class swap on <html>, both themes fully styled, remembered via localStorage)
- Responsive: desktop sidebar, tablet reflow at 1024px, off-canvas nav + stacked grids under 768px

## Sections / Widgets

- Sidebar navigation with grouped links and active state
- Topbar with search field, notification bell and profile chip
- 4 stat cards with deltas
- Pipeline added per month (bars chart)
- Pipeline by stage (donut chart)
- Hot opportunities — data table with 7 realistic rows, status pills and row actions
- Deal timeline — timestamped feed
- Quota attainment (progress list)

## How to Use

1. Download or copy this folder (`index.html`, `style.css`, `script.js`).
2. Open `index.html` in any modern browser — it works straight from the filesystem (`file://`), no build step or server needed.
3. Replace the sample data in `index.html` and the data arrays at the bottom of `script.js` with your own.

## Customization

The whole palette is driven by CSS custom properties defined in `:root` at the top of `style.css`:

- `--bg`, `--surface`, `--surface-2` — page and card backgrounds
- `--text`, `--muted`, `--border` — typography and hairlines
- `--accent`, `--accent-2`, `--accent-soft` — brand colors used by charts, buttons and links
- `--pos`, `--neg`, `--warn`, `--info` — status/pill colors
- `--radius`, `--radius-sm` — corner rounding
- `--font`, `--font-num`, `--sidebar-w` — type stacks and layout sizing

Chart values are plain arrays passed to small renderer functions in `script.js` (see the “Chart data” section) — edit the numbers and labels there.

## Notes

- No external dependencies: no frameworks, chart libraries, CDNs, web fonts or tracking.
- All icons are inline SVG; avatars are CSS gradient circles with initials.
- Part of a 100-template library — see the repository root for the other categories.

## Views

The sidebar now drives a four-view, hash-routed single-page shell (browser back/forward and a hard reload on `#/settings` both work):

- **Overview** (`#/overview`) — the full dashboard: stats, charts and activity.
- **Leads** (`#/list`) — a searchable, paginated, CSV-exportable table of 20 leads.
- **Pipeline reports** (`#/reports`) — two extra charts, three insight tiles and key takeaways.
- **Settings** (`#/settings`) — profile form with validation, preference toggles, an appearance block and a danger zone.
