# Brightpaw Haven — Animal Shelter & Rescue Template

Brightpaw Haven is a warm trust, multi-page animal rescue charity template with a full donation widget, count-up impact stats and four complete, interlinked pages.

## Features

- Layout variant: **V1 (warm trust)** — pure HTML5 / CSS3 / vanilla JavaScript, no frameworks, fonts or images
- Inline-SVG data-URI favicon, theme-color meta, skip link and a sticky header that gains a shadow on scroll
- Animated count-up impact stats and donation-breakdown / fundraising progress bars (IntersectionObserver)
- Interactive donation widget: preset & custom amounts, one-time / monthly toggle, cause designation and a live summary
- Dynamic "your impact" helper that recalculates as the donation amount changes (e.g. meals, wells, sessions)
- Causes filter chips that narrow the programme grid by category and region
- Validated newsletter, contact and donation forms in vanilla JS (inline errors + success states)
- Accessible accordion FAQ, scroll-reveal that respects prefers-reduced-motion, scrollspy and a back-to-top button
- Mobile navigation with aria-expanded, Escape-to-close and 44px touch targets; breakpoints at 960px and 640px
- Team / trustees grid with gradient-initial avatars and demo-guarded social mini-icons (no external links fire)

## Pages

- `index.html` — homepage: hero with donate CTA, mission intro, causes/programmes grid, count-up impact band, donation-use breakdown, ways to help, supporter stories, donate CTA band and a validated newsletter
- `about.html` — breadcrumb, hero, the full story (mission, values, milestones timeline), team & trustees grid, accreditations band, an `#impact` stats section and an `#contact` block with info cards, office hours and a validated form
- `causes.html` — breadcrumb, hero, the full causes listing with progress bars and category/region filter chips, plus a `#volunteer` get-involved section
- `donate.html` — breadcrumb, hero, the interactive donation widget (amounts, monthly toggle, designation, live summary, impact helper, validation & success), other ways to give (volunteer / fundraise / legacy), a transparency note and an FAQ accordion

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
- `--on-accent`
- `--line`
- `--radius`
- `--font-body`
- `--font-head`
- `--pad-sec`
- `--container`

Change the palette and typography in `:root`, edit the copy in the HTML files, and adjust the signature block at the end of `style.css` for the decorative details.

## Library Note

Part of a 100-template library of hand-built static website templates. This template has **no external dependencies** — no frameworks, fonts, icons or images are loaded from anywhere.
