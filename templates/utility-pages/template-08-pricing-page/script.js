/* ============================================================
   Quotaflow — Pricing | script.js
   Vanilla JavaScript in a classic IIFE — no dependencies.
   ============================================================ */
(function () {
  "use strict";

  var doc = document;
  doc.documentElement.classList.add("js");

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, ev, fn, opts) { if (el) { el.addEventListener(ev, fn, opts || false); } }

  /* ----- Footer year ----- */
  $$("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ----- Reduced-motion preference ----- */
  var prefersReduced = false;
  try { prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (err) { prefersReduced = false; }

  /* ----- Back to top ----- */
  var toTop = $("[data-totop]");
  if (toTop) {
    var onTopScroll = function () { toTop.classList.toggle("show", window.scrollY > 480); };
    window.addEventListener("scroll", onTopScroll, { passive: true });
    onTopScroll();
    on(toTop, "click", function () { window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }); });
  }


  /* ----- Billing period toggle: swap every price ----- */
  var toggleWrap = $("[data-util='billing-toggle']");
  if (toggleWrap) {
    var opts = $$(".bt-opt", toggleWrap);
    var note = $("[data-period-note]");
    var amounts = $$(".amount");
    var billNotes = $$("[data-bill-note]");
    var setPeriod = function (period) {
      var yearly = period === "yearly";
      toggleWrap.classList.toggle("year", yearly);
      opts.forEach(function (btn) {
        var onBtn = btn.getAttribute("data-period") === period;
        btn.classList.toggle("is-on", onBtn);
        btn.setAttribute("aria-pressed", onBtn ? "true" : "false");
      });
      amounts.forEach(function (el) {
        var next = yearly ? el.getAttribute("data-yearly") : el.getAttribute("data-monthly");
        if (next !== null && el.textContent !== next) {
          el.textContent = next;
          el.classList.remove("swap");
          void el.offsetWidth;
          el.classList.add("swap");
        }
      });
      billNotes.forEach(function (el) {
        el.textContent = yearly ? "per month, billed yearly" : "billed monthly";
      });
      if (note) {
        note.textContent = yearly
          ? "Billed yearly — about 20% kinder to your runway."
          : "Billed monthly. Cancel any time.";
      }
    };
    opts.forEach(function (btn) {
      on(btn, "click", function () { setPeriod(btn.getAttribute("data-period") || "monthly"); });
    });
  }

  /* ----- FAQ accordion ----- */
  $$(".faq-q").forEach(function (q) {
    on(q, "click", function () {
      var expanded = q.getAttribute("aria-expanded") === "true";
      var panel = doc.getElementById(q.getAttribute("aria-controls") || "");
      $$(".faq-q").forEach(function (other) {
        if (other === q) { return; }
        other.setAttribute("aria-expanded", "false");
        var p = doc.getElementById(other.getAttribute("aria-controls") || "");
        if (p) { p.hidden = true; }
      });
      q.setAttribute("aria-expanded", expanded ? "false" : "true");
      if (panel) { panel.hidden = expanded; }
    });
  });

})();
