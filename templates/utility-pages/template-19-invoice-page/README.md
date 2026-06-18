# Cobalt & Quill — Invoice Page Template

A crisp, print-ready invoice for Cobalt & Quill, a fictional design studio, with itemized line items, a running totals box, a status pill and copy-number plus print/PDF actions.

## Features

- Pure HTML5 / CSS3 / vanilla JavaScript — no frameworks, webfonts, CDNs or build step
- Opens directly from the filesystem (file:// safe) with zero external requests
- Long-form document (S5) shell, responsive at ~960px and ~640px, no horizontal scroll
- Semantic landmarks, exactly one h1, labelled controls, :focus-visible rings and reduced-motion support
- All imagery is CSS gradients/patterns and inline SVG — no image files

### JavaScript behaviors

- Itemized table (`data-util="invoice"`) with quantity, rate and amount, and a totals box covering subtotal, discount, tax, deposit and balance due
- Status pill (partially paid / paid / overdue variants documented in CSS) and a prominent amount-due figure
- Copy invoice-number button with clipboard + legacy fallback and a toast confirmation
- Print / Save-PDF button (`window.print()`) backed by a dedicated `@media print` stylesheet that hides chrome and preserves the brand color block
- Balance figures kept in sync defensively; footer year via `getFullYear()`

## Sections & States

1. Toolbar: copy number + print actions
2. Invoice header: from-address, number, status pill
3. Meta row: billed-to, issue/due dates, amount due
4. Line-items table with descriptions
5. Notes/payment + totals box (subtotal → balance due)
6. States: partially-paid (default) / paid / overdue / print layout

## How to Use

Double-click `index.html` (or drop it onto any modern browser) — no server, package
manager or build step needed. All copy lives in `index.html`, the design in
`style.css` and the interactions in `script.js`.

## Customization

The design is driven by CSS custom properties declared in `:root` at the top of `style.css`:

- `--bg` (#EEF2F7) / `--surface` white sheet
- `--accent` (#13335C) navy + `--accent-2` (#1E4F8A)
- `--ok` / `--warn` / `--err` status colors
- `--radius` (10px) / `--radius-lg` (16px) rounding
- `--font-mono` for tabular figures

Change those few tokens to re-skin the whole page consistently.

## Library

Part of the Utility Pages category of a hand-tuned, dependency-free HTML/CSS/JS
template library — every template works offline with zero external requests.
