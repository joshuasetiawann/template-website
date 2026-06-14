# Willowbrook Village — Retirement Village Community Template

Willowbrook Village offers independent cottages and apartments plus assisted living in the Cotswolds, with landscaped gardens, a wellness spa, restaurant and on-site care as needs change.

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
- Stats band
- Listings grid with live chip filtering
- Featured spotlight
- Amenities / why-us
- About the agent / developer
- Process steps
- Testimonials
- Enquiry form (JS validation)
- Location & map placeholder

## Pages
- `index.html` — the main listing-driven landing page (variant V4).
- `property.html` — the single-property detail page; open it directly or via any listing card (`property.html?p=N`).
- `listings.html` — the full browse-all page: every listing with live chip filtering, sorting and a result count.
- `about.html` — the story, team, process, stats and reviews behind Willowbrook Village.
- `contact.html` — a JS-validated enquiry form with office details, opening hours and a map placeholder.

## How to Use
1. Open `index.html` in any modern browser — no build step, server or internet connection is required.
2. Click any listing card to open `property.html` for that property; the detail page also renders fully on its own.
3. Edit text and prices directly in the HTML, or restyle via the tokens in `style.css`.

## Customization
- All colours, spacing and radii are defined as CSS custom properties in the `:root` block of `style.css` — change the accent there to retheme the whole site.
- Listing content lives in one place: edit the `window.__PROP__` array at the bottom of `property.html` and the matching cards in `index.html` to swap in your own properties.

---
Part of the multi-page website template library. This is the **template-17-retirement-village** template in the real-estate-property category — a listing-driven property site, distinct from the library's landing-page and company-profile real-estate templates.
