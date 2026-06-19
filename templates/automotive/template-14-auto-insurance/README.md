# SafeLane Auto Insurance — Auto Insurance Template

A reassuring auto-insurance template with coverage plans, an instant quote widget, transparent pricing and an FAQ.

## Features

- Booking / quote widget with field validation and success message
- Grouped service menu with clear pricing and durations
- Pricing packages and an accordion FAQ
- Form validation on the booking and contact forms
- Count-up stats and scroll-reveal animations
- Variant V2 design language with a unique palette and typography
- Responsive layout with a mobile navigation drawer and ≥44px touch targets
- Accessible: skip link, single H1 per page, aria labels, :focus-visible, reduced-motion support
- Pure HTML5/CSS3/vanilla JS — no frameworks, no CDNs, no external assets; works from file://

## Pages

- index.html — homepage (hero booking/quote widget, services grid, stats, reviews, CTA)
- services.html — full grouped service menu, booking widget, pricing packages and FAQ
- about.html — story, values, team, facilities and impact stats
- contact.html — validated enquiry form, info cards, hours and map

## How to Use

1. Open `index.html` in any modern browser — no build step or server required.
2. Every navigation item links to a real, fully built page: Home, Services, Pricing, About, Why us, Reviews, Contact.
3. Edit text and prices directly in the HTML; the design tokens live at the top of `style.css`.

## Customization

- Colours, radii, fonts and gradients are CSS custom properties in `:root` — change `--accent` to rebrand instantly.
- Vehicle/service/product data lives inline in the HTML (and the `window.__VEH__` array on the vehicle page).
- Swap the inline-SVG favicon and logo mark in the `<head>` and header to match your brand.

## Library note

Part of the **Automotive** category in the multi-page template library. Like every template in the library, this is a full release: each navbar item leads to a real, filled page. All content is placeholder/demo data using invented brand and model names.
