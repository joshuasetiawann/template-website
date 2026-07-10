# Sentinel Home Security — Home Security Template

Sentinel Home Security is a complete, four-page home security website template — a premium-home design with a full services listing, an interactive quote/booking widget, transparent pricing and a validated contact flow, all in pure HTML, CSS and vanilla JavaScript.

## Features

- Layout variant: **V3 (premium-home)** — pure HTML5 / CSS3 / vanilla JavaScript, with no frameworks, web fonts, icon libraries or external images
- Inline-SVG data-URI favicon, theme-color meta, skip link and a sticky header with a live "call now" link and quote CTA
- Interactive quote / booking widget (`data-quote`): service picker, preferred date, address & details, name and email with full inline validation and a success state
- Animated count-up statistics and scroll-reveal that both respect `prefers-reduced-motion`
- Full services listing with "what's included" checklists and transparent "from" pricing, plus a dedicated `#pricing` section
- Accessible FAQ accordion (`aria-expanded` / `aria-controls`), guarantees grid and a "why us" trust section
- Crew / team grid with gradient-initial avatars and demo-guarded social mini-icons that never navigate
- Service-area bands, a pure-CSS map placeholder, opening hours and a 24/7 emergency line
- Mobile navigation with `aria-expanded`, Escape-to-close and 44px+ touch targets; breakpoints at 960px and 640px
- Back-to-top control, breadcrumb trails and `aria-current="page"` on the active nav item

## Pages

- `index.html` — homepage: hero with trust badges and a compact quote form, services preview, about teaser, why-us, count-up stats, process steps, work gallery strip, star testimonials, service-area note and a call-to-action band
- `services.html` — the primary page: breadcrumb, hero, the full Home Security services listing (Smart Alarm Systems, Security Cameras & Video, 24/7 Professional Monitoring and more), a free-quote booking widget, service-area band, an `#pricing` section, guarantees, why-us and an FAQ accordion
- `about.html` — breadcrumb, hero, the company story, values, the full crew grid, a licenses & certifications band, an `#gallery` of work and an `#impact` count-up stats section
- `contact.html` — breadcrumb, hero, a validated quote/booking form, phone/email/address info cards, opening hours with a 24/7 emergency line, a CSS map placeholder with service areas, a social row and an FAQ

Every navbar item leads to a real, filled page; placeholder links (socials, legal) carry `data-demo-link` and are guarded in JavaScript so they never navigate.

## How to Use

Open `index.html` in any modern browser — double-clicking the file is enough. There is no build step, no server and no installation; everything runs directly from the local file system.

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

Change the palette and typography in `:root`, edit the copy in the HTML files, swap the inline-SVG icons, and adjust the signature block at the end of `style.css` for the decorative details.

## Library Note

Part of a multi-category library of hand-built static website templates. This template has **no external dependencies** — no frameworks, fonts, icons or images are loaded from anywhere, and it works fully offline.
