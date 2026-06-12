# Belgrave Estates — Luxury Homes Showcase Template

Belgrave Estates presents an exclusive collection of luxury homes, oceanfront villas and private estates across Los Angeles and the California coast.

## Features
- Five fully responsive, file://-safe pages built with pure HTML5, CSS3 and dependency-free vanilla JavaScript
- Listing-driven layout: a filterable listings grid on the home page and a data-driven detail page
- Live chip filtering of listings by type and price band
- Property detail page reads `?p=` from a shared JS listings array (defaults to the first listing) with image-swap gallery, floor-plan line drawing, amenities checklist, location block and similar listings
- Enquiry forms with inline JavaScript validation and an accessible status message
- Release layer: skip link, scroll-aware header, scrollspy, staggered reveal-on-scroll (reduced-motion safe), back-to-top control and a full footer
- Accessible by design: one `<h1>` per page, ARIA labelling, `:focus-visible` styles and 44px+ touch targets
- Inline-SVG imagery and gradients only — no external assets, fonts or scripts

## Sections
- Listings grid with live chip filtering
- Featured spotlight
- Gallery
- About the agent / developer
- Amenities / why-us
- Stats band
- Testimonials
- Enquiry form (JS validation)
- Location & map placeholder

## Pages
- `index.html` — the main listing-driven landing page (variant V2).
- `property.html` — the single-property detail page; open it directly or via any listing card (`property.html?p=N`).
- `listings.html` — the full browse-all page: every listing with live chip filtering, sorting and a result count.
- `about.html` — the story, team, process, stats and reviews behind Belgrave Estates.
- `contact.html` — a JS-validated enquiry form with office details, opening hours and a map placeholder.

## How to Use
1. Open `index.html` in any modern browser — no build step, server or internet connection is required.
2. Click any listing card to open `property.html` for that property; the detail page also renders fully on its own.
3. Edit text and prices directly in the HTML, or restyle via the tokens in `style.css`.

## Customization
- All colours, spacing and radii are defined as CSS custom properties in the `:root` block of `style.css` — change the accent there to retheme the whole site.
- Listing content lives in one place: edit the `window.__PROP__` array at the bottom of `property.html` and the matching cards in `index.html` to swap in your own properties.

---
Part of the multi-page website template library. This is the **template-02-luxury-homes** template in the real-estate-property category — a listing-driven property site, distinct from the library's landing-page and company-profile real-estate templates.
