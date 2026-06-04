# Stillpoint — Health & Wellness Blog Template

Stillpoint is a multi-page health & wellness blog template built as a minimal essay (centered reading column, large serif, list-style index, reading-progress bar), with a full home page and a matching article reading view.

## Features

- Two linked pages (`index.html` + `article.html`) sharing one stylesheet and one script
- Responsive masthead navigation with an accessible mobile toggle and header scroll state
- Lead/hero post, a filterable grid of essays, a numbered trending list and a newsletter sign-up
- Live category filtering, client-side newsletter validation and a back-to-top control
- Article view reads `?p=` from a posts array to render any story (defaults to the first)
- Key-takeaways callout block in the article body, author bio, prev/next pager and three related cards on every article
- Scroll-reveal animations (reduced-motion safe), scrollspy navigation and an inline-SVG favicon
- Pure HTML5, CSS3 and vanilla JavaScript — no build step, no dependencies, opens from `file://`

## Sections

- **Masthead / navigation** — brand mark plus jump links: Essays, Most read, About, The Stretch
- **Hero** — the featured essay with category, byline, read time and calls to action
- **Grid** — at least nine story cards with gradient covers, tags, excerpts and bylines
- **Trending** — a numbered list of the most-read pieces
- **About the editor** — a short blurb introducing Maren Holloway
- **Newsletter** — an email sign-up with inline validation messages
- **Footer** — brand summary, quick links, topics (Movement, Nutrition, Sleep, Mindfulness, Habits) and social icons

## Pages

- **`index.html`** — the home page: hero, category chips, story grid, trending, editor blurb, newsletter and footer.
- **`article.html`** — the reading view: breadcrumb, post hero, rich body (pull quote, subheadings, figure, styled list and a concept block), author bio, pager and related stories. Append `?p=0`–`?p=11` to open a specific story; with no parameter it shows the first.
- **`articles.html`** — the full archive: breadcrumb, hero, a searchable grid of every article with live category-chip and keyword filtering, plus a trending sidebar. Each card opens `article.html?p=N`.
- **`about.html`** — the publication page: breadcrumb, hero, masthead story, editorial mission, a contributors grid, how-we-work steps, stats and a call to action to contact.
- **`contact.html`** — the contact page: breadcrumb, hero, a JS-validated contact form, pitch/submission info, contact cards, a `#subscribe` newsletter block with email validation, a social row and a short FAQ.

## How to Use

1. Open `index.html` in any modern browser — no server required.
2. Click any story card to open `article.html?p=N` for that story.
3. Use the category chips to filter the grid and the newsletter box to test validation.
4. Edit the copy directly in the HTML, or regenerate from the source data.

## Customization

- **Colors & type** — every theme value lives in the `:root` custom properties at the top of `style.css` (accent is `#4C8C6E`). Change them once to retheme both pages.
- **Layout** — spacing, headings and container width use `clamp()` and a single `--container` token.
- **Content** — story titles, excerpts and bylines live in the markup; the article posts array sits in the `#posts-data` script tag in `article.html`.
- **Icons** — covers and accents are inline SVG and gradients, so there are no image files to manage.

---

Part of the Template Library — Blog & Magazine collection. Free to use and adapt for personal and commercial projects.
