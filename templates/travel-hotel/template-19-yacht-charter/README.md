# Meridian Yacht Charters — Yacht Charter Template

Meridian Yacht Charters is a refined yacht-charter template with a full-bleed hero, a floating booking bar, fleet cards and a fleet-and-charters detail page.

## Features

- Layout: **V1 luxury — full-bleed hero, a floating booking bar, serif headings, large room cards and hairline framing**
- Multi-page: an `index.html` overview and a dedicated `packages.html` ("The Fleet & Charters") detail page
- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, fonts, CDNs or build step; runs from `file://`
- Booking widget (check-in / check-out dates, guests, name, email) with live validation, inline errors and a success state
- The fleet grid of six options, each linking through to its full write-up on the packages page
- Release polish: skip link, sticky header scroll state, scrollspy navigation (`aria-current` via IntersectionObserver), staggered reveal that respects `prefers-reduced-motion`, and a back-to-top button
- Packages page: breadcrumb, per-option detail blocks with stable `#pkg-n` ids, inclusion checklists, seasonal price tables, a "which is right for you" helper, policies and an FAQ accordion
- Inline-SVG data-URI favicon and `theme-color`; every image is a CSS gradient or inline SVG
- Responsive at ~960px and ~640px with a JS mobile-nav toggle and 44px+ touch targets
- Footer with quick links, contact, five inline-SVG social icons and an auto-updating year

## Sections

**index.html**

- Hero — Set your own course across the blue.
- Choose your yacht — six the fleet with prices
- Amenities — Why charter with us
- Gallery strip (CSS gradient + SVG tiles)
- Reviews with star ratings
- Booking enquiry section
- Location & getting-there with a CSS map placeholder
- CTA band and full footer

**packages.html**

- Breadcrumb and intro lead
- Six detail blocks (`#pkg-1`…`#pkg-6`): visual, full description, inclusions, occupancy/duration, price table and a "book this" link back to the booking form
- "Which is right for you" helper, policies, FAQ accordion and a closing CTA

## Pages

- `index.html` — the marketing overview and booking entry point
- `packages.html` — the full "The Fleet & Charters" detail page
- `about.html` — the property/operator story, amenities, experiences, reviews, stats and awards
- `gallery.html` — a filterable gradient/SVG photo gallery with a highlights strip
- `contact.html` — a JS-validated enquiry form, contact cards, getting-there map and policies
- `style.css` — one stylesheet shared by all five pages
- `script.js` — one vanilla-JS file shared by all five pages

## How to Use

1. Copy this template folder (`index.html`, `packages.html`, `style.css`, `script.js`).
2. Open `index.html` in any modern browser — no server or build step is required.
3. Edit the text directly in the HTML; every section is plain, semantic markup.

## Customization

- **Colors:** edit the design tokens under `:root` at the top of `style.css` (`--bg`, `--accent`, `--accent2`, `--ink`, `--line`, `--radius`).
- **The fleet:** each card lives in the section marked `id="rooms"`; its "Details" link points at the matching `#pkg-n` block in `packages.html`.
- **Booking form:** field rules are driven by `data-validate` attributes inside `[data-booking]` and handled in `script.js`.
- **Packages:** duplicate a `.pkg` block in `packages.html`, give it the next `#pkg-n` id, and add a matching card on the index page.
- **Contact & location:** update the footer columns and the map card address.
- **Typography:** swap the system font stacks in `--font-head` / `--font-body`.

---

Part of the **Travel & Hotel** category in the template library — one of 20 hand-built travel concepts, each with its own palette, layout variant and content.
