# Isabella Fontaine — Creative Director Portfolio Template

A pure HTML/CSS/JS portfolio template for a creative director, styled as an editorial, serif-led resume with a numbered case index and experience table.

## Pages
- `index.html` — full single-page portfolio (hero, about, work, experience, contact).
- `about.html` — full bio, skills, experience timeline, tools, awards and availability.
- `work.html` — complete project grid with tag filters, plus the working approach.
- `contact.html` — validated contact form, copyable email, socials and a short FAQ.
- `project.html` — individual case-study page (reads `?p=` 0–5).

## Features

- Semantic HTML5 (header / nav / main / section / footer, exactly one `h1`)
- Fully responsive: breakpoints at 960px and 640px, fluid type via `clamp()`
- No frameworks, no CDNs, no web fonts, no images — gradients and inline SVG only
- JavaScript interactions:
  - Mobile navigation toggle with `aria-expanded` state and Escape-to-close
  - Expandable numbered case list built as an accessible accordion
  - Copy-email-to-clipboard button with execCommand fallback and live status
  - Count-up statistics triggered on scroll (eased, requestAnimationFrame)
- Extras included: Tool-stack wall, Availability badge
- Full-release polish: inline-SVG favicon + `theme-color`, skip link, sticky-header scroll state, scrollspy nav with `aria-current`, scroll-reveal sections and a back-to-top button
- Conversion extras: pulsing availability badge, count-up stats band, project hover overlays, a pre-footer “Let’s work together” CTA banner and a multi-column footer with an inline-SVG social row and auto-updated copyright year
- Keyboard friendly: visible `:focus-visible` styles and labelled icon buttons

## Sections

- Sticky navbar with mobile menu
- Centered editorial hero
- Two-column about + practice areas
- Numbered case index with expandable details
- Experience table
- Pull quotes / notes of record
- Contact CTA with copy-to-clipboard email
- Count-up stats band
- Pre-footer CTA banner
- Multi-column footer with social icon row

## How to Use

Open `index.html` in any modern browser — it works straight from the file system
(double-click it, or drag it into a browser window). No build step, no server,
no dependencies. Edit the text directly in `index.html`, then adjust colors and
spacing in `style.css`.

## Customization

All theming lives in CSS custom properties at the top of `style.css`:

- `--bg`, `--surface` — page and card background colors
- `--text`, `--muted` — primary and secondary text colors
- `--accent`, `--accent2` — brand accent colors (buttons, links, highlights)
- `--border`, `--soft` — hairlines and tinted fills
- `--hero-a`, `--hero-b` — gradient stops for the avatar, thumbnails and bars
- `--radius` — global corner radius (currently 0px)
- `--font-head`, `--font-body` — system font stacks for headings and body text
- `--pad-section`, `--speed` — section rhythm and transition speed

Project cards, skills, timeline entries and testimonials are plain HTML blocks —
duplicate or delete them freely; every script feature is null-safe.

---

Part of a 100-template library of dependency-free website templates.
No external dependencies: everything renders offline from these four files.
