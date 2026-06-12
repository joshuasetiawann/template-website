# Horizon Study Abroad — Study Abroad Program Template

A two-page study abroad program website template with an admissions flow, full curriculum detail, and a warm community visual design.

## Features

- Two fully linked pages built with pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step, no external requests.
- Works straight from the file system (`file://`) — just open `index.html`.
- Responsive layout with a JavaScript mobile navigation, fluid `clamp()` spacing, and a 44px minimum touch target.
- Accessible by design: skip link, focus-visible outlines, ARIA labelling, scrollspy `aria-current`, and reduced-motion support.
- Animated count-up statistics, scroll-reveal, sticky header state, and a back-to-top control.
- A validated admissions / enrollment form with inline errors and a success message (no backend required).
- Interactive testimonial slider.
- Interactive read-more story toggle.

## Sections

The home page (`index.html`) is composed of:

- Hero with kicker, headline, and call-to-action
- Story / about
- Programs / courses grid
- Curriculum / learning path
- Faculty / instructors
- Stats band (animated count-up)
- Testimonials
- Tuition plans
- FAQ accordion
- Admissions / enrollment form
- Full site footer with brand, quick links, contact details, and social icons

## Pages

- **index.html** — the marketing home page with programs, curriculum, faculty, stats, testimonials, and the admissions form.
- **programs.html** — the “Programs & Curriculum” page: a breadcrumb, an expanded block for each program (overview, modules, learning outcomes, schedule, tuition, and entry requirements), an admissions timeline, an FAQ, and a closing call to action.
- **about.html** — the “About” page: a breadcrumb, the institution’s story and history, mission and values, campus and facilities, accreditations, an animated stats band, outcomes, and a closing call to action.
- **faculty.html** — the “Faculty” page: a breadcrumb, the full faculty grid with bios, credentials, and profile links, a departments overview, a teaching-philosophy strip, and a closing call to action.
- **admissions.html** — the “Admissions” page: a breadcrumb, a validated application form, the step-by-step process timeline, a requirements checklist, tuition and financial-aid summary, key dates, an FAQ accordion, and contact cards.

## How to Use

1. Open `index.html` in any modern browser, or serve the folder with a static host.
2. No installation, dependencies, or internet connection are required.
3. Edit the copy directly in the HTML files, then refresh the page to see your changes.

## Customization

- **Colours & type:** every colour, radius, shadow, and font is a CSS custom property declared in the `:root` block at the top of `style.css`. Change a token once and it cascades across both pages.
- **Content:** program cards, curriculum steps, faculty, tuition, and FAQ entries are plain HTML — duplicate or remove blocks to fit your school.
- **Form:** the enrollment form is front-end only; wire the `data-enroll` form’s submit handler in `script.js` to your own endpoint or email service.
- **Icons & imagery:** all graphics are inline SVG or CSS gradients, so they scale crisply and recolour with the theme tokens.

## Library

Part of the **education-course** category of the multi-template website library — one of twenty distinct school and course website templates.
