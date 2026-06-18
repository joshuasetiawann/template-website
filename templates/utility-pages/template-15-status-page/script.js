/* ============================================================
   Northpeak — System Status | script.js
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

  /* ----- Field validation helpers ----- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validEmail(v) { return EMAIL_RE.test(String(v || "").trim()); }
  function fieldWrap(input) { return input && input.closest ? input.closest(".field") : null; }
  function setFieldError(input, msg) {
    var wrap = fieldWrap(input);
    if (!wrap) { return; }
    wrap.classList.add("invalid");
    var note = wrap.querySelector("[data-err]");
    if (note) { note.textContent = msg; note.hidden = false; }
    input.setAttribute("aria-invalid", "true");
  }
  function clearFieldError(input) {
    var wrap = fieldWrap(input);
    if (!wrap) { return; }
    wrap.classList.remove("invalid");
    var note = wrap.querySelector("[data-err]");
    if (note) { note.hidden = true; }
    input.removeAttribute("aria-invalid");
  }


  /* ----- Live "updated at" ticker ----- */
  var statusEl = $("[data-util='status']");
  var updatedEl = $("[data-updated]");
  var startTs = Date.now();
  function relTime() {
    var secs = Math.floor((Date.now() - startTs) / 1000);
    if (secs < 2) { return "just now"; }
    if (secs < 60) { return secs + " seconds ago"; }
    var mins = Math.floor(secs / 60);
    return mins + (mins === 1 ? " minute ago" : " minutes ago");
  }
  if (updatedEl) {
    window.setInterval(function () { updatedEl.textContent = relTime(); }, 1000);
  }

  /* ----- Live metric jitter (deterministic-ish wander) ----- */
  var metrics = {
    latency: { el: $("[data-metric='latency']"), base: 128, spread: 22, fmt: function (n) { return String(Math.round(n)); } },
    rpm: { el: $("[data-metric='rpm']"), base: 42910, spread: 1800, fmt: function (n) { return Math.round(n).toLocaleString("en-US"); } },
    err: { el: $("[data-metric='err']"), base: 0.02, spread: 0.03, fmt: function (n) { return Math.max(0, n).toFixed(2); } }
  };
  function jitter() {
    Object.keys(metrics).forEach(function (k) {
      var m = metrics[k];
      if (!m.el) { return; }
      var v = m.base + (Math.random() - 0.5) * m.spread;
      m.el.textContent = m.fmt(v);
    });
    $$(".spark").forEach(function (sp) {
      $$("span", sp).forEach(function (b) {
        var low = sp.classList.contains("spark-low");
        var h = low ? (8 + Math.random() * 18) : (38 + Math.random() * 50);
        b.style.height = h.toFixed(0) + "%";
      });
    });
  }
  window.setInterval(jitter, 3200);

  /* ----- Subscribe panel toggle ----- */
  var subToggle = $("[data-sub-toggle]");
  var subCard = $("[data-sub-card]");
  on(subToggle, "click", function () {
    if (!subCard) { return; }
    var open = subCard.hidden;
    subCard.hidden = !open;
    subToggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      var f = $("#subEmail", subCard);
      if (f) { try { f.focus({ preventScroll: false }); } catch (err) { f.focus(); } }
    }
  });

  /* ----- Subscribe form ----- */
  var subForm = $("[data-sub-form]");
  if (subForm) {
    var subEmail = $("#subEmail", subForm);
    var subNote = $("[data-sub-note]");
    on(subForm, "submit", function (e) {
      e.preventDefault();
      var v = subEmail ? subEmail.value.trim() : "";
      if (!validEmail(v)) { setFieldError(subEmail, "Enter a valid email to subscribe."); if (subEmail) { subEmail.focus(); } return; }
      if (subNote) { subNote.textContent = "Subscribed \u2713 status alerts will go to " + v + "."; subNote.classList.add("is-ok"); }
      subForm.reset();
    });
    on(subEmail, "input", function () { clearFieldError(subEmail); });
  }

})();
