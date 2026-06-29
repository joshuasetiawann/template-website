# IronFurrow Machinery — Farm Equipment Dealer Template

A practical farm-equipment dealer template with a machinery catalog, finance calculator and a built-to-work product story.

## Features

- Full machines catalogue with a JS category filter, sort and live "Showing N" count
- Build a finance plan block plus an ordering &amp; pricing section with a sample price list
- Homepage with hero, about teaser, products preview, practices, gallery, count-up stats and testimonials
- Validated enquiry / wholesale form with inline errors and a success message
- Count-up impact stats, scroll-reveal animations and tasteful micro-interactions
- Variant V4 (modern-agritech) design language with a unique palette, type and tractor motif
- Responsive layout with a mobile navigation drawer and ≥44px touch targets
- Accessible: skip link, single H1 per page, aria labels, :focus-visible, reduced-motion support
- Pure HTML5/CSS3/vanilla JS — no frameworks, no CDNs, no external assets; works from file://

## Pages

- index.html — homepage (hero, about teaser, machines preview, practices, gallery, stats, testimonials, CTA)
- products.html — full machines grid with filter chips, seasonal repayment block, ordering &amp; pricing, CTA
- about.html — farm story, values &amp; sustainability, the team, gallery, certifications and impact stats
- contact.html — validated enquiry form, info cards, farm-shop hours, map placeholder, social row and FAQ

## How to Use

1. Open `index.html` in any modern browser — no build step or server required.
2. Every navigation item leads to a real, fully built page: Machines, Our farm, Practices, Gallery, Team and Visit.
3. Edit the text, products and prices directly in the HTML; the design tokens live at the top of `style.css`.

## Customization

- Colours, radii, fonts and gradients are CSS custom properties in `:root` — change `--accent` to rebrand instantly.
- Machines data lives inline in `products.html`; each card carries `data-cat` and `data-price` for filtering and sorting.
- Swap the inline-SVG favicon and the logo mark in the `<head>` and header to match your own brand.

## Library note

Part of the **Agriculture &amp; Farming** category in the multi-page template library. Like every template in the library, this is a full release: each navbar item leads to a real, filled page. All content is placeholder/demo data using invented farm and product names.
