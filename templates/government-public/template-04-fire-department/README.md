# Ridgemont Fire & Rescue — Fire & Rescue Service Template

24/7 fire suppression, rescue and prevention for the Ridgemont community.

A full-release, multi-page government & public website template. Every navigation item leads to a real, filled page. Built with the **Bold Emergency** design variant: High-contrast emergency red and deep navy with a Maltese-cross motif.

## Features

- Four complete pages — home, about, services and contact — fully linked
- "Find a service" with live search **and** category filtering of the service cards
- 8 public services/departments listed with descriptions and how-to-apply guidance
- Validated enquiry/request form (name, email, department, message) with inline errors and success state
- FAQ accordions, animated count-up statistics and scroll reveals (reduced-motion safe)
- Service-hours section, downloadable forms list and accessibility/language notes
- Official utility bar, mobile navigation drawer and back-to-top control
- Inline-SVG crest/seal and iconography — no images, fonts or scripts loaded from anywhere
- Accessible: skip link, one H1 per page, ARIA labels, visible focus, ≥44px targets, strong contrast
- Pure HTML5 / CSS3 / vanilla JS — no frameworks, no build step, runs straight from `file://`

## Pages

- `index.html` — homepage: hero with quick links, news strip, services preview, mission teaser, stats, programs, officials and accessibility note
- `services.html` — primary page: breadcrumb, full service listing with find-a-service search/filter, forms & downloads, service hours and FAQ
- `about.html` — mission & history, structure & departments, leadership grid, values/transparency and impact stats
- `contact.html` — validated enquiry form, info cards, office hours, map placeholder with directions, accessibility note and FAQ

## How to Use

1. Open `index.html` in any modern browser — no server or build is required.
2. Navigate between pages using the top navigation; every link resolves to a real page or section.
3. Try the find-a-service search, the FAQ accordions and the contact form validation.

## Customization

- Colors, spacing and radius are CSS custom properties in `:root` at the top of `style.css`.
- Replace the institution name, services and copy in the HTML; swap the crest letter in the favicon and `.logo-mark`.
- All interactions live in one null-safe IIFE in `script.js`; selectors are guarded so unused features are harmless.
- Demo links are marked `data-demo-link` and downloads `data-download`; wire them to real destinations as needed.

## Library note

Part of the **government-public** category of the template library — one of 20 distinct, self-contained multi-page templates (Bold Emergency variant). Content is fictional and for demonstration only.
