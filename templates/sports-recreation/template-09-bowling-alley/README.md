# Strike Avenue Bowl — Bowling Alley Template

A multi-page bowling alley & family entertainment template (V5) with a full sessions listing, a JS day-tab weekly schedule, membership tiers and a validated session booking — four complete, interlinked pages.

## Features

- Layout variant: **V5 community-friendly (warm, rounded)** — pure HTML5 / CSS3 / vanilla JavaScript, no frameworks, fonts or images
- Inline-SVG data-URI favicon, theme-color meta, skip link and a sticky header that gains a shadow on scroll
- Full sessions listing with level, audience, schedule and price, plus a weekly schedule with interactive day-tabs
- Membership tiers with feature checklists and an `#pricing` section
- Animated count-up statistics (IntersectionObserver) and scroll-reveal that respects prefers-reduced-motion
- Validated session booking and contact / newsletter forms in vanilla JS (inline errors + success states)
- Accessible FAQ accordion, keyboard-navigable schedule tabs and a back-to-top button
- Mobile navigation with aria-expanded, Escape-to-close and 44px touch targets; breakpoints at 960px and 640px
- Our Team grid with gradient-initial avatars and demo-guarded social mini-icons (no external links fire)

## Pages

- `index.html` — homepage: energetic hero, club teaser, sessions preview, facilities, our team preview, membership pricing teaser, upcoming timetable, count-up stats, testimonials and a join CTA
- `programs.html` — the primary page: breadcrumb, hero, the full sessions listing, a weekly `#schedule` with day-tabs, membership tiers at `#pricing`, a session booking mini-form, an FAQ accordion and a CTA to contact
- `about.html` — breadcrumb, hero, the club story, mission, the full our team grid at `#team`, facilities, an `#impact` count-up stats section and a CTA to contact
- `contact.html` — breadcrumb, hero, a validated session booking form, info cards (phone / email / address), opening hours, a CSS map placeholder with getting-there notes, a social row and an FAQ

Every navbar item leads to a real, filled page; demo placeholder links (socials, legal) carry `data-demo-link` and are guarded in JS so they never navigate.

## How to Use

Open `index.html` in any modern browser — double-clicking the file is enough. No build step, no server and no installs; everything runs from the local file system.

## Customization

All theming lives in CSS custom properties at the top of `style.css`:

- `--bg`
- `--surface`
- `--ink`
- `--muted`
- `--accent`
- `--accent-2`
- `--accent-d`
- `--on-accent`
- `--line`
- `--radius`
- `--font-body`
- `--font-head`
- `--pad-sec`
- `--container`

Change the palette and typography in `:root`, edit the copy in the HTML files, and adjust the signature block at the end of `style.css` for the decorative details.

## Library Note

Part of a multi-template library of hand-built static website templates. This template has **no external dependencies** — no frameworks, fonts, icons or images are loaded from anywhere.
