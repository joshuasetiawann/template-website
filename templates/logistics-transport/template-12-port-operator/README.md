# Harborgate Terminals — Port & Terminal Operator Template

A modern deepwater container terminal — fast vessel turnarounds, deep berths and seamless gate flow.

## Features

- Real-time tracking widget on the home page — enter a number and watch a live status timeline (picked up → in transit → out for delivery → delivered)
- Instant quote estimator on the services page (origin, destination, type, weight, speed → live price) with validation and a request CTA
- Full services listing (8 services) with coverage, pricing and per-service quote links
- Indicative pricing tiers, an FAQ accordion and a stylised coverage/network map
- Count-up statistics for TEU handled, coverage and fleet on the home and about pages
- Validated quote/enquiry form on the contact page with a 24/7 hotline and info cards
- Variant V3 design language (industrial-freight) with a unique palette, type and motif
- Responsive layout with a mobile navigation drawer and ≥44px touch targets
- Accessible: skip link, single H1 per page, ARIA labels, :focus-visible, reduced-motion support
- Pure HTML5/CSS3/vanilla JS — no frameworks, no CDNs, no external assets; works from file://

## Pages

- index.html — homepage: hero with live tracking, services preview, about teaser, why-us, stats, how-it-works, testimonials, partners
- services.html — full service listing, instant quote estimator, coverage band, pricing, FAQ and CTA
- about.html — company story, mission, leadership team, fleet/network, certifications and impact stats
- contact.html — validated quote/enquiry form, info cards, hotline, hours, coverage map and FAQ

## How to Use

1. Open `index.html` in any modern browser — no build step or server required.
2. Every navigation item links to a real, filled page: Home, Services, Track (home tracking widget), Pricing, Coverage, About and Contact.
3. Edit text, prices and routes directly in the HTML; the design tokens live at the top of `style.css`.

## Customization

- Colours, radii, fonts and gradients are CSS custom properties in `:root` — change `--accent` to rebrand instantly.
- Service, team, fleet and FAQ content is plain inline HTML — search the service name (e.g. "Container Stevedoring") to find and edit it.
- Swap the inline-SVG favicon and logo mark in the `<head>` and header to match your brand.
- The tracking timeline and quote estimator are driven by the shared, dependency-free `script.js`.

## Library note

Part of the **Logistics & Transport** category in the multi-page template library. Like every template in the library, this is a full release: each navbar item leads to a real, filled page. All content is placeholder/demo data using invented brand names, services, routes and prices.
