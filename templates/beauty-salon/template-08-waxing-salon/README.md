# Smooth Society — Waxing Salon Template

A welcoming waxing salon delivering fast, gentle, fuss-free smoothness for everyone.

A four-page, fully responsive waxing salon website template built with pure HTML5, CSS3 and vanilla JavaScript — no frameworks, no build step, no external assets. Styled in the **modern-rounded** variant.

## Features

- **Real multi-page site** — every navigation item leads to a genuine, fully-populated page.
- **Service menu & booking** — a complete, categorised treatment menu with durations and prices, plus a validated booking widget (service, date, time, technician and contact) that shows a confirmation summary.
- **Packages, memberships & FAQ** — bundle pricing, an `#pricing` section and an accessible FAQ accordion.
- **Team, gallery, story & impact stats** — a full technician line-up, CSS/SVG gallery tiles, salon story and an animated count-up statistics band.
- **Accessible by design** — skip link, single `<h1>` per page, `aria-current`, `aria-expanded`, visible focus rings, reduced-motion support and 44px+ touch targets.
- **Self-contained** — inline-SVG favicon, CSS gradient imagery, a single shared null-safe `script.js`, and it all runs straight from the filesystem (`file://`).

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Homepage — hero, intro, service preview, gallery, team, pricing teaser, reviews and a quick booking form. |
| `services.html` | Primary page — full service menu, online booking widget, packages, `#pricing` and FAQ. |
| `about.html` | Salon story, philosophy, gallery, full team grid, facilities and an impact stats band. |
| `contact.html` | Validated enquiry form, contact cards, opening hours, a CSS map placeholder and directions. |

## How to use

1. Open `index.html` in any modern browser — no server required.
2. Navigate between the four pages using the menu; the booking and enquiry forms are fully interactive.
3. Deploy by uploading the folder to any static host (or just keep it local).

## Customization

- **Colours & type** — edit the CSS custom properties in the `:root` block at the top of `style.css` (`--accent`, `--accent-2`, `--bg`, `--surface`, fonts and radii).
- **Content** — all copy lives directly in the HTML; replace the brand name, services, prices and team details with your own.
- **Services & prices** — update the service items in `services.html` (and the preview cards on `index.html`).
- **Booking & forms** — the shared `script.js` handles validation; adjust labels and options in the markup.

---

Part of the **Beauty &amp; Salon** category in the TemplateHub library of pure HTML/CSS/JS website templates.
