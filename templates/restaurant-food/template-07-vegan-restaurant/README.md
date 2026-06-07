# Rootline Kitchen — Plant-Based Restaurant Template

Rootline Kitchen is a leafy plant-based restaurant template with a chip-filtered bowl menu, grower sourcing band, booking form and organic shapes.

## Pages

- **`index.html`** — homepage: hero, in-page menu preview, story, gallery, reviews and the reservation/order form.
- **`menu.html`** — the full menu: breadcrumb, chef&rsquo;s note, 4 expanded categories with dietary badges, a chef&rsquo;s-specials band, drinks and desserts, a set-menu/package block, an hours strip and a call-to-action back to the homepage form. Reuses the same `style.css` and `script.js`.
- **`about.html`** — about page: breadcrumb, story, philosophy, gallery strip, team, awards/press, guest reviews, a count-up stats band and a call-to-action to the contact page. Reuses the same `style.css` and `script.js`.
- **`contact.html`** — contact page: breadcrumb, a JS-validated reservation/enquiry form (inline errors + success), contact info cards, opening hours, a CSS map placeholder with getting-there notes and a social row. Reuses the same `style.css` and `script.js`.

## Features

- Layout: **V4 fresh light — pastel rounded look, chip-filtered menu card grid and playful shapes**
- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, fonts, CDNs or build step; works from `file://`
- Chip-filtered menu with 12 dishes across 4 categories ($ pricing)
- Reservation form (name, email, date, guests) with inline error states and a success message (browser-side only)
- Release polish: skip link, scrollspy navigation (`aria-current`), header scroll state, staggered scroll-reveal that respects `prefers-reduced-motion`, and a back-to-top button
- Inline-SVG favicon and `theme-color`; all imagery is CSS gradients/patterns plus inline SVG
- Micro-interactions: hover lift on cards and buttons, pressed `scale(.97)` state, animated nav underlines
- Hours list that highlights the current day, plus a styled CSS map placeholder
- Footer with quick links, hours, contact, five inline-SVG social icons and an auto-updating year
- Responsive at ~960px and ~640px with a mobile nav toggle (44px+ touch targets)
- Category chips filter the dish grid live, with an empty-state message

## Sections

- Hero — Vegetables, cooked like they're the main event.
- Our story — Imani Okafor
- Menu (Bowls / Plates / Small Bites / Sweets)
- Feature band
- Gallery strip (gradient + SVG tiles)
- Guest reviews
- Reservation form
- Hours & location with map placeholder
- Footer with socials and auto-year

## How to Use

1. Download or copy this template folder (`index.html`, `style.css`, `script.js`).
2. Open `index.html` in any modern browser — no server or build step required.
3. Edit the text directly in `index.html`; every section is plain semantic markup.

## Customization

- **Colors:** tweak the CSS custom properties at the top of `style.css` (`--bg`, `--accent`, `--accent2`, `--line`, `--radius`).
- **Menu:** items live in the section marked `data-menu`; copy a row/card, keep the `data-cat` value in sync with its category chip.
- **Form:** field rules are driven by `data-validate` attributes (`name`, `email`, `date`, `guests`, `address`) in `script.js`.
- **Hours and contact:** update the hours list (`data-hours`), the footer columns and the map card address.
- **Typography:** swap the system font stacks in `--font-head` / `--font-body`.

---

Part of the **Restaurant & Food** category in the template library — one of 20 hand-built restaurant concepts, each with its own palette, layout variant and content.
