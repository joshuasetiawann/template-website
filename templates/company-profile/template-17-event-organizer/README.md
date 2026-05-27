# Velvet Comet Events — Event Production & Experiences Company Profile Template

Velvet Comet Events is a festive dark-plum event organizer profile template with confetti accents, priced production packages and a stats band that counts up.

## Features

- Layout variant: **V5 warm local** — pure HTML5 / CSS3 / vanilla JavaScript
- Release polish: inline-SVG favicon + theme-color meta, skip link, scrollspy nav (`aria-current`) and a scrolled header state
- IntersectionObserver scroll-reveal with stagger that respects `prefers-reduced-motion` (content never hidden without JS)
- Back-to-top button, hover-lift buttons and cards, `:focus-visible` rings and 44px mobile touch targets
- Certifications band (`data-certs`), office-hours block (`data-hours`) and stylized map placeholder with floating address card
- Team social mini-icons, client testimonials and a five-icon social footer with auto-year copyright
- Mobile navigation toggle with aria-expanded state and Escape-to-close
- Contact form validation in vanilla JS: preventDefault, inline field errors, success message
- Sticky header that gains a shadow on scroll
- Count-up statistics powered by IntersectionObserver
- Accessible accordion (aria-expanded / hidden panels)
- Testimonial slider with previous/next controls and dots
- Responsive layout with breakpoints at 960px and 640px
- Gradient avatar tiles with initials instead of photos — zero image files
- Decorative visuals built from CSS gradients and inline SVG only

## Pages

- `index.html` — the one-page event-studio profile (hero, about, services, why-us, gallery, team, certifications, contact form)
- `services.html` — services in depth: each production capability as an anchored block with what's included and process, plus a CTA back to contact
<!-- pages: about/team/contact added -->
- `about.html` — full company story page: breadcrumb, hero, expanded multi-paragraph history, mission and values cards, a dated milestones timeline, why-choose-us reasons, a stats band and a CTA to `contact.html`
- `team.html` — leadership page: breadcrumb, hero, a grid of named people (gradient-initial avatars, roles, bios and demo-guarded social mini-icons), a culture strip, a "join us" careers section with open roles and a CTA to `contact.html`
- `contact.html` — contact page: breadcrumb, hero, a JS-validated enquiry form (name, email, subject, message with inline errors and a success state), contact-info cards, an office-hours block, a CSS map placeholder, a short FAQ accordion and a social row

## Sections

1. Sticky navbar with mobile toggle
1. Hero (V5 warm local layout)
1. About / story
1. Stats counters
1. Services
1. Why choose us
1. Testimonials
1. Portfolio / case studies / clients
1. Team
1. FAQ accordion
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
