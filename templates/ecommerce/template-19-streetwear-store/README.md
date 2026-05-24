# Static Youth — Streetwear Store Template

Static Youth prints limited-run streetwear in-house — when a drop sells out, it is gone for good.

## Features

- Layout variant: **editorial** — pure HTML5/CSS3/vanilla JS, no dependencies
- Slide-in mini-cart drawer: line items, quantity +/− steppers that update line and grand totals, remove buttons, and an animated free-shipping progress bar; closes on overlay click or Esc
- Animated cart count badge on every add-to-cart action
- CSS marquee strip and horizontally scrollable category chips that filter the grid
- Asymmetric editorial grid with cards spanning rows and columns
- Product cards with inline-SVG star ratings, review counts (`data-rating`) and merchandising badges
- Trust/USP bar with inline SVG icons (shipping, returns, secure payment, support)
- Scroll-aware sticky header, scrollspy nav with `aria-current`, and IntersectionObserver scroll-reveal (reduced-motion safe)
- Inline SVG favicon + theme-color meta, skip-to-content link, and a back-to-top button
- Full-release footer: quick links, support links, social icon row, payment-method pills and an auto-updating copyright year
- Mobile navigation toggle with aria-expanded state
- Newsletter form with inline JS validation and success message
- 9 products with concept-specific names, prices and gradient/SVG artwork (no image files)
- Responsive at ~960px and ~640px breakpoints, :focus-visible styles, ≥44px touch targets, reduced-motion support

## Sections

1. Hero
2. Marquee strip
3. Trust / USP bar
4. Scrollable category chips
5. Lookbook grid
6. Product grid
7. Featured product
8. Pull quote
9. Newsletter CTA
10. Multi-column footer


## Pages

This template ships as a small multi-page store — all five pages share `style.css` and `script.js`:

- **index.html** — homepage: hero, product grid, featured product, reviews and newsletter.
- **shop.html** — full catalog with a Home / Shop breadcrumb, category filter chips, a price/name sort `<select>`, a live "Showing N products" count and an empty-filter state.
- **product.html** — product detail with an image gallery (thumbnail swap), option chips, a quantity stepper, Details / Shipping &amp; Returns / Reviews tabs and a related-products row. Reads `?p=` to pick the product and falls back to the first item when opened with no parameters.
- **about.html** — brand story page: hero with a Home / About breadcrumb, atelier/story narrative, a values grid, a materials &amp; sustainability note, a lookbook strip, press/reviews with star ratings, an animated count-up stats band and a call-to-action into the shop.
- **contact.html** — contact page: hero with a Home / Contact breadcrumb, a JS-validated message form (name/email/subject/message with inline errors and a success state), email/phone/address support cards, store hours, a shipping &amp; returns summary, a CSS map placeholder, a short FAQ and a social row.

Add-to-cart works identically across all five pages (same badge and cart drawer), and the navigation "Shop" link plus the home product cards link the pages together.

## How to Use

Open `index.html` in any modern browser — no build step, server or install required (works from `file://`).
Keep `index.html`, `style.css` and `script.js` in the same folder.

## Customization

All design tokens live in the `:root` block at the top of `style.css`:

- `--bg`, `--surface`, `--text`, `--muted` — base palette
- `--accent` (#FFD400), `--accent-2` (#111111), `--accent-ink` — brand colors
- `--radius`, `--radius-sm` — corner rounding (currently 0px)
- `--font-display`, `--font-body` — system font stacks
- `--container` — page max-width (1180px)
- `--tile-ink`, `--line`, `--shadow`, plus per-template decorative tokens

Products are plain `<article>` blocks — duplicate one, change the name, price, `data-cat` and the `--g` gradient to add items.

## Library

Part of a 100-template library of dependency-free website templates. No frameworks, no CDNs, no external fonts, icons or images — everything is hand-rolled HTML, CSS and vanilla JavaScript.
