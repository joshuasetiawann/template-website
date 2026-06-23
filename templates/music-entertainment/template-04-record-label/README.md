# Goldgroove Records — Record Label Template

Goldgroove Records is a full multi-page record label website template in the "vinyl retro" style (V2), with a fake audio player, a filterable releases & events listing and four complete, interlinked pages.

## Features

- Layout variant: **V2 (vinyl retro)** — pure HTML5 / CSS3 / vanilla JavaScript, with no frameworks, fonts or images loaded from anywhere
- Inline-SVG data-URI favicon, `theme-color` meta, a skip link and a sticky header that gains a shadow on scroll
- A fake audio player with a play / pause toggle and animated equalizer bars (CSS-driven, fully null-safe)
- A full releases & events listing with date, venue, city and sold-out / few-left status badges, narrowed by a city and month filter
- Validated booking / enquiry form (event type, date, message) and a validated newsletter sign-up, with inline errors and success states
- Count-up statistics, an accessible FAQ accordion and scroll-reveal that respects `prefers-reduced-motion`
- Members / roster grid with gradient-initial avatars and demo-guarded social mini-icons (no external links ever fire)
- Mobile navigation with `aria-expanded`, Escape-to-close and 44px+ touch targets; breakpoints at 960px and 640px
- One shared, guarded vanilla-JS file and a single `:root` token block for effortless theming

## Pages

- `index.html` — homepage: hero, about teaser, a listen section with the fake audio player and releases & events / releases, an upcoming-events preview, a media strip, press testimonials with stars and a validated newsletter
- `about.html` — breadcrumb, hero, the full story, the line-up / roster grid, a milestones timeline, an `#impact` count-up stats band, an `#gallery` media section and press quotes
- `events.html` — the primary page: breadcrumb, hero, the complete upcoming listing with city / month filters and ticket links, recent past dates and a validated booking / private-events enquiry form
- `contact.html` — breadcrumb, hero, the validated enquiry form, booking / management info cards, a social row, a press note and an FAQ accordion

Every navbar item leads to a real, filled page; demo placeholder links (socials, legal, sold-out shows) carry `data-demo-link` and are guarded in JS so they never navigate.

## How to Use

Open `index.html` in any modern browser — double-clicking the file is enough. There is no build step, no server and no installs; everything runs straight from the local file system.

## Customization

All theming lives in CSS custom properties at the top of `style.css`:

- `--bg`
- `--surface`
- `--ink`
- `--muted`
- `--accent`
- `--accent-2`
- `--on-accent`
- `--line`
- `--radius`
- `--font-body`
- `--font-head`
- `--pad-sec`
- `--container`

Change the palette and typography in `:root`, edit the copy in the HTML files, swap the events, roster and press content, and adjust the signature block at the end of `style.css` for the decorative details.

## Library Note

Part of a multi-category library of hand-built static website templates. This template has **no external dependencies** — no frameworks, fonts, icons or images are loaded from anywhere.
