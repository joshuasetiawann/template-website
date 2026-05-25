# Alder Gate College — Independent College & Sixth Form Company Profile Template

Alder Gate College is a collegiate education profile template with banner-shaped accents, tabbed academic pathways and an admissions-style enquiry form.

## Features

- Layout variant: **V2 modern overlay** — pure HTML5 / CSS3 / vanilla JavaScript
- Release polish: inline-SVG favicon + theme-color meta, skip link, scrollspy nav (`aria-current`) and a scrolled header state
- IntersectionObserver scroll-reveal with stagger that respects `prefers-reduced-motion` (content never hidden without JS)
- Back-to-top button, hover-lift buttons and cards, `:focus-visible` rings and 44px mobile touch targets
- Certifications band (`data-certs`), office-hours block (`data-hours`) and stylized map placeholder with floating address card
- Team social mini-icons, client testimonials and a five-icon social footer with auto-year copyright
- Mobile navigation toggle with aria-expanded state and Escape-to-close
- Contact form validation in vanilla JS: preventDefault, inline field errors, success message
- Sticky header that gains a shadow on scroll
- Count-up statistics powered by IntersectionObserver
- Tabbed services switcher with aria-selected states
- Filterable portfolio grid with active-button state
- Responsive layout with breakpoints at 960px and 640px
- Gradient avatar tiles with initials instead of photos — zero image files
- Decorative visuals built from CSS gradients and inline SVG only

## Pages

- `index.html` — the one-page college profile (hero, story, academic pathways, why-us, family team, portfolio, testimonials, certifications, admissions enquiry form)
- `services.html` — academic programmes in depth: each pathway as an anchored block with what's included and outcomes, plus results and an enquiry CTA
<!-- pages: about/team/contact added -->
- `about.html` — full company story page: breadcrumb, hero, expanded multi-paragraph history, mission and values cards, a dated milestones timeline, why-choose-us reasons, a stats band and a CTA to `contact.html`
- `team.html` — leadership page: breadcrumb, hero, a grid of named people (gradient-initial avatars, roles, bios and demo-guarded social mini-icons), a culture strip, a "join us" careers section with open roles and a CTA to `contact.html`
- `contact.html` — contact page: breadcrumb, hero, a JS-validated enquiry form (name, email, subject, message with inline errors and a success state), contact-info cards, an office-hours block, a CSS map placeholder, a short FAQ accordion and a social row

## Sections

1. Sticky navbar with mobile toggle and top contact bar
1. Hero (V2 modern overlay layout)
1. About / story
1. Stats counters
1. Services
1. Why choose us
1. Team
1. Portfolio / case studies / clients
1. CTA strip
1. Contact section with JS-validated form
1. Footer with link columns and social buttons

## How to Use

Open `index.html` in any modern browser — double-clicking the file is enough. No build step,
no server, no package install; everything works from the local file system.

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

Change the palette and typography in `:root`, swap the text in `index.html`, and adjust the
"signature touches" block at the end of `style.css` for the decorative details.

## Library Note

Part of a 100-template library of hand-built static website templates. This template has **no
external dependencies** — no frameworks, fonts, icons or images are loaded from anywhere.
