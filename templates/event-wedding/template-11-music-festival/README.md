# Solstice Sound 2026 — Music Festival Template

Solstice Sound 2026 is a bold festive, single-page music festival template with a live countdown, a lineup wall, a schedule, gallery, venue map and a validated RSVP form.

## Features

- Variant: **Festive bold — dark gradient hero, ticket-shaped cards, a lineup/agenda and a marquee**
- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, fonts, CDNs or build step; runs straight from `file://`
- Tabbed, keyboard-accessible schedule with multiple tracks
- Scalable lineup wall plus featured-act cards
- Ticket-style pricing cards with a copyable promo code
- Gallery strip that opens an accessible lightbox
- CSS map placeholder with a directions note
- FAQ accordion (`aria-expanded` toggles)
- Live countdown to Friday–Sunday, 14–16 August 2026 (days / hours / minutes / seconds, updated every second)
- Validated registration form with an attendance choice, guest-count select, inline error messages and a success state (browser-side only)
- Release polish: skip link, sticky header scroll state, scrollspy navigation (`aria-current`), staggered scroll-reveal that respects `prefers-reduced-motion`, and a back-to-top button
- Inline-SVG favicon and `theme-color`; all imagery is CSS gradients / patterns plus inline SVG
- Accessible: one `<h1>`, semantic landmarks, `aria-label` icon buttons, `aria-expanded` toggles and `:focus-visible` rings
- Responsive at ~960px and ~640px with a mobile nav toggle and 44px+ touch targets

## Pages

- `index.html` — single-page overview with the live countdown, story, schedule, gallery, venue and RSVP
- `details.html` — full story, schedule/rundown, venue, what-to-know and FAQ (the destination for Story / Schedule / Venue / FAQ)
- `gallery.html` — expanded photo grid with lightbox, a highlights strip and an RSVP call to action
- `rsvp.html` — the full validated RSVP form, gifts / tickets, a before-you-reply note and contact

## Sections
- Hero with names/event, date, venue and a live countdown
- Lineup wall + featured acts
- Schedule (tabbed tracks)
- Gallery strip (with lightbox)
- Venue / location with CSS map placeholder
- RSVP / registration form (validated)
- tickets
- FAQ accordion
- Full footer (event info, quick links, contact, social icons, auto-updating year)

## How to Use

1. Copy this template folder (`index.html`, `style.css`, `script.js`).
2. Open `index.html` in any modern browser — no server or build step required.
3. Edit the text directly in `index.html`; every section is plain semantic markup.
4. **Change the countdown date:** open `script.js`, find the `live countdown` block near the top, and edit the ISO date string in `new Date('2026-08-14T16:00:00')` to your event's date and local time. The days/hours/minutes/seconds update automatically.

## Customization

- **Colors:** tweak the CSS custom properties under `:root` at the top of `style.css` (`--bg`, `--accent`, `--accent-2`, `--line`, `--radius`).
- **Schedule:** switch the tabbed tracks in the section marked `data-tabs`
- **Form:** field rules live in `script.js` (the `RSVP / registration form` block); each field group carries a `data-field` type used for validation.
- **Gallery:** tiles are CSS-gradient `art-1`…`art-6` classes — swap the gradients in `style.css` or change the `data-cap` labels in `index.html`.
- **Typography:** swap the system font stacks in `--font-head` / `--font-body`.

---

Part of the **Event & Wedding** category in the template library — one of 20 hand-built event concepts, each with its own palette, layout variant and content.
