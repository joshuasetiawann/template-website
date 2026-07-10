# Cleargrove — UX Research & Design Agency Template

Cleargrove is a minimal-studio, fully multi-page ux research & design agency website template with a services-led primary page, count-up stats, a validated project enquiry form and four complete, interlinked pages.

## Features

- Layout variant: **V4 (minimal-studio)** — pure HTML5 / CSS3 / vanilla JavaScript, no frameworks, fonts, icons or images
- Inline-SVG data-URI favicon, theme-color meta, skip link and a sticky header that gains a shadow on scroll
- Animated count-up statistics on the homepage, services and about pages (IntersectionObserver, reduced-motion safe)
- Primary `services.html`: full solution catalogue with deliverables, a how-we-work process, mini case studies, a tech-stack band, engagement-model pricing and an FAQ accordion
- Validated project / enquiry form (name, email, company, budget select, message) with inline errors, a live budget helper and a success state
- Accessible FAQ accordion, scroll-reveal that respects prefers-reduced-motion and a back-to-top button
- Mobile navigation with aria-expanded, Escape-to-close and 44px touch targets; breakpoints at 960px and 640px
- Team grid with gradient-initial avatars and demo-guarded social mini-icons (no external links ever fire)
- CSS-only hero mock, dashboards, map placeholder and decorative art — every visual is gradients, patterns or inline SVG

## Pages

- `index.html` — homepage: hero with a CSS wireframe mock, services preview, why-us benefits, count-up stats, process steps, case studies & client band, testimonials, tech-stack strip and a contact CTA
- `services.html` *(primary)* — breadcrumb, hero, the full services/solutions listing with deliverables and “what you get”, a `#process` how-we-work section, a `#cases` mini case-studies block with metrics, a tech-stack band, a `#pricing` engagement-models section and an FAQ accordion
- `about.html` — breadcrumb, hero, company story, mission & values, a `#team` grid, culture, a certifications & partners band, an `#impact` count-up stats section and a contact CTA
- `contact.html` — breadcrumb, hero, the validated project enquiry form, info cards (phone / email / address), office hours, a CSS map placeholder, a book-a-call note, a social row and an FAQ

Every navbar item leads to a real, filled page. Services, Process, Case Studies and Pricing resolve to `services.html` (and its `#process`, `#cases`, `#pricing` sections); Company and Team resolve to `about.html`; all calls-to-action resolve to `contact.html`. Demo placeholder links (socials, legal, email) carry `data-demo-link` and are guarded in JavaScript so they never navigate.

## How to Use

Open `index.html` in any modern browser — double-clicking the file is enough. There is no build step, no server and no installs; everything runs straight from the local file system.

## Customization

All theming lives in CSS custom properties at the top of `style.css`:

- `--bg`
- `--surface`
- `--ink`
- `--muted`
- `--accent`
- `--accent-2`
- `--on-accent`
- `--line`
- `--radius`
- `--font-body`
- `--font-head`
- `--pad-sec`
- `--container`

Change the palette and typography in `:root`, edit the copy in the HTML files, and adjust the `Cleargrove signature` block at the end of `style.css` for the decorative details.

## Library Note

Part of a multi-template library of hand-built static website templates, in the **technology-services** category. This template has **no external dependencies** — no frameworks, fonts, icons or images are loaded from anywhere.
