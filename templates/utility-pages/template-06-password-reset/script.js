/* ============================================================
   Keyhaven — Password Reset | script.js
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


  /* ----- Two-step reset flow ----- */
  var flow = $("[data-util='reset-flow']");
  var requestPanel = $("[data-panel='request']");
  var sentPanel = $("[data-panel='sent']");
  var form = $("[data-reset]");
  var emailInput = $("#resetEmail");
  var dots = {
    one: $("[data-step-dot='1']"),
    two: $("[data-step-dot='2']")
  };

  function showSent(address) {
    var sentTo = $("[data-sent-to]");
    if (sentTo) { sentTo.textContent = address; }
    if (requestPanel) { requestPanel.hidden = true; }
    if (sentPanel) { sentPanel.hidden = false; }
    if (dots.one) { dots.one.classList.remove("is-current"); dots.one.classList.add("is-done"); }
    if (dots.two) { dots.two.classList.add("is-current"); }
    var resend = $("[data-resend]");
    if (resend) { resend.focus(); }
  }

  function showRequest() {
    if (sentPanel) { sentPanel.hidden = true; }
    if (requestPanel) { requestPanel.hidden = false; }
    if (dots.one) { dots.one.classList.add("is-current"); dots.one.classList.remove("is-done"); }
    if (dots.two) { dots.two.classList.remove("is-current"); }
    var note = $("[data-resent-note]");
    if (note) { note.hidden = true; }
    if (emailInput) { emailInput.focus(); emailInput.select(); }
  }

  if (flow && form) {
    on(form, "submit", function (e) {
      e.preventDefault();
      var val = emailInput ? emailInput.value.trim() : "";
      if (!validEmail(val)) {
        setFieldError(emailInput, val ? "That address looks incomplete — check the domain." : "Enter the email linked to your vault.");
        if (emailInput) { emailInput.focus(); }
        return;
      }
      showSent(val);
    });
    on(emailInput, "input", function () { clearFieldError(emailInput); });
    on($("[data-change]"), "click", showRequest);
    on($("[data-resend]"), "click", function () {
      var note = $("[data-resent-note]");
      if (note) {
        note.hidden = false;
        window.setTimeout(function () { note.hidden = true; }, 4000);
      }
    });
  }

})();
