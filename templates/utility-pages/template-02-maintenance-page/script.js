/* ============================================================
   Bolt & Beam — Maintenance | script.js
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


  /* ----- Progress easing: nudge the bar forward a little on load ----- */
  var fill = $("[data-fill]");
  var pctEl = $("[data-pct]");
  var bar = $(".progress");
  if (fill && pctEl && bar) {
    var pct = 72;
    var nudge = function () {
      if (pct >= 76) { return; }
      pct += 1;
      fill.style.width = pct + "%";
      pctEl.textContent = pct + "%";
      bar.setAttribute("aria-valuenow", String(pct));
      window.setTimeout(nudge, 9000);
    };
    window.setTimeout(nudge, 4000);
  }

  /* ----- Notify form ----- */
  var form = $("[data-notify]");
  if (form) {
    var emailInput = $("#notifyEmail", form);
    on(form, "submit", function (e) {
      e.preventDefault();
      var val = emailInput ? emailInput.value.trim() : "";
      if (!validEmail(val)) {
        setFieldError(emailInput, val ? "Hmm, that email looks off — check for typos." : "Add your email so we know where to knock.");
        if (emailInput) { emailInput.focus(); }
        return;
      }
      var done = $("[data-done]");
      var sentTo = $("[data-sent-to]");
      if (sentTo) { sentTo.textContent = val; }
      form.hidden = true;
      if (done) { done.hidden = false; }
    });
    on(emailInput, "input", function () { clearFieldError(emailInput); });
  }

})();
