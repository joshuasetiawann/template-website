# Brightrow Dental Clinic — Dental Clinic Template

Brightrow is a white-and-dental-blue clinical template with smile-curve accents, an interactive treatment price guide, weekly surgery-hours grid, team credential cards and a check-up booking form.

## Features

- Two fully built pages — a long-scrolling home page and a deep "Services & Care" page
- Class/visit schedule with a weekly hours grid with day highlighting, marked up with `data-schedule`
- A treatment cost estimator as the section's signature interaction
- Trial / booking form with live, accessible JavaScript validation
- Scrollspy navigation, scroll-reveal, animated count-ups and a back-to-top button
- Mobile-first responsive layout with an accessible slide-down nav
- Pure HTML, CSS and vanilla JS — no build step, no dependencies, runs from `file://`
- Inline-SVG icons and an inline-SVG data-URI favicon; gradients instead of image files
- Reduced-motion aware, `:focus-visible` outlines and ARIA throughout

## Sections (home page)

- Hero
- Stats / count-up band
- Programs / services grid
- Class schedule
- Trainers / practitioners
- Pricing / membership tiers
- Testimonials
- Trial / booking form
- Signature section (a treatment cost estimator)
- Full footer with hours, contact and social links

## Pages

- `index.html` — the full marketing home page with every section above.
- `programs.html` — a deep "Services & Care" page: breadcrumb, an expanded block for each program (description, who it's for, a three-step "what to expect", session length and intensity, a package mini-table and a practitioner spotlight), the complete weekly timetable, a what-to-bring checklist, an FAQ accordion and a closing call to action.
- `about.html` — an About page: breadcrumb, studio story, mission and philosophy, the full team grid, facilities and amenities, a count-up stats band and a first-visit guide.
- `pricing.html` — a Pricing & Membership page: breadcrumb, the membership tiers with full feature lists and a most-popular ribbon, optional add-ons, a plan comparison table and an FAQ accordion.
- `contact.html` — a Contact page: breadcrumb, a JavaScript-validated booking form, contact info cards, opening hours, a CSS map placeholder, first-visit info and a social row.

## How to Use

1. Open `index.html` in any modern browser — no server or build step is required.
2. Click through the navigation, the schedule day controls and the booking form to see the interactions.
3. Open `programs.html` to view the in-depth program breakdowns and full timetable.

## Customization

- **Colours & type:** edit the CSS custom properties in the `:root` block at the top of `style.css` (background, surface, ink, accent, accent-2, radius and the two font stacks).
- **Content:** all copy lives directly in `index.html` and `programs.html`; replace the brand name, classes, coaches, prices and schedule with your own.
- **Icons & favicon:** icons are inline `<svg>` elements; the favicon is an inline data-URI in each page's `<head>`.
- **Behaviour:** every interaction lives in one null-safe IIFE in `script.js`; each feature guards its own elements, so removing a section never breaks the page.

This template is part of the **Health & Fitness** category of the template library — one of twenty concept-true designs (a clinical, professional feel with trusted blue/green tones, credential badges and an insurance note) built to a shared release standard.
