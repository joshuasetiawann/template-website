# PartHub Auto Parts — Auto Parts Store Template

An auto-parts retail template with a filterable parts catalogue, add-to-quote toast and clean product browsing.

## Features

- Live product filtering by category with result count
- Sort by price and name
- Add-to-quote toast notification
- Form validation on the contact form
- Count-up stats and scroll-reveal animations
- Variant V2 design language with a unique palette and typography
- Responsive layout with a mobile navigation drawer and ≥44px touch targets
- Accessible: skip link, single H1 per page, aria labels, :focus-visible, reduced-motion support
- Pure HTML5/CSS3/vanilla JS — no frameworks, no CDNs, no external assets; works from file://

## Pages

- index.html — homepage (hero search, best-sellers grid + filter, stats, reviews, CTA)
- shop.html — full parts catalogue with filter chips, sort and add-to-quote
- about.html — story, values, team, facilities and impact stats
- contact.html — validated enquiry form, info cards, hours and map

## How to Use

1. Open `index.html` in any modern browser — no build step or server required.
2. Every navigation item links to a real, fully built page: Home, Shop, About, Why us, Reviews, Contact.
3. Edit text and prices directly in the HTML; the design tokens live at the top of `style.css`.

## Customization

- Colours, radii, fonts and gradients are CSS custom properties in `:root` — change `--accent` to rebrand instantly.
- Vehicle/service/product data lives inline in the HTML (and the `window.__VEH__` array on the vehicle page).
- Swap the inline-SVG favicon and logo mark in the `<head>` and header to match your brand.

## Library note

Part of the **Automotive** category in the multi-page template library. Like every template in the library, this is a full release: each navbar item leads to a real, filled page. All content is placeholder/demo data using invented brand and model names.
