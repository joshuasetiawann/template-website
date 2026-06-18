/* ============================================================
   Voltloop — Download the App | script.js
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


  /* ----- Platform tabs (iOS / Android) ----- */
  var root = $("[data-util='app-download']");
  var tabs = $$("[data-tab]");
  var panels = $$("[data-panel]");
  function selectTab(key) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-tab") === key;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(function (p) {
      var on = p.getAttribute("data-panel") === key;
      p.hidden = !on;
      p.classList.toggle("is-current", on);
    });
  }
  tabs.forEach(function (t, i) {
    on(t, "click", function () { selectTab(t.getAttribute("data-tab")); });
    on(t, "keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        var dir = e.key === "ArrowRight" ? 1 : -1;
        var next = tabs[(i + dir + tabs.length) % tabs.length];
        if (next) { next.focus(); selectTab(next.getAttribute("data-tab")); }
      }
    });
  });

  /* ----- Auto-pick platform from UA (best effort, harmless fallback) ----- */
  (function () {
    if (!root) { return; }
    var ua = "";
    try { ua = String(navigator.userAgent || ""); } catch (err) { ua = ""; }
    if (/Android/i.test(ua)) { selectTab("android"); }
  })();

})();
