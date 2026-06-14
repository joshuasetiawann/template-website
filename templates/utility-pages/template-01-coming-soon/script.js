/* ============================================================
   Nebulift — Coming Soon | script.js
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


  /* ----- Live countdown ----- */
  var cd = $("[data-util='countdown']");
  if (cd) {
    var target = new Date(cd.getAttribute("data-target") || "2026-10-24T09:00:00").getTime();
    var nums = {
      days: $("[data-cd='days']", cd),
      hours: $("[data-cd='hours']", cd),
      minutes: $("[data-cd='minutes']", cd),
      seconds: $("[data-cd='seconds']", cd)
    };
    var pad = function (n) { return n < 10 ? "0" + n : String(n); };
    var setNum = function (el, v) { if (el && el.textContent !== v) { el.textContent = v; } };
    var tick = function () {
      var diff = target - Date.now();
      if (isNaN(diff)) { return; }
      if (diff <= 0) {
        cd.classList.add("is-live");
        setNum(nums.days, "00"); setNum(nums.hours, "00");
        setNum(nums.minutes, "00"); setNum(nums.seconds, "00");
        cd.setAttribute("aria-label", "Nebulift is live now");
        return;
      }
      var s = Math.floor(diff / 1000);
      setNum(nums.days, pad(Math.floor(s / 86400)));
      setNum(nums.hours, pad(Math.floor(s % 86400 / 3600)));
      setNum(nums.minutes, pad(Math.floor(s % 3600 / 60)));
      setNum(nums.seconds, pad(s % 60));
    };
    tick();
    window.setInterval(tick, 1000);
  }

  /* ----- Notify form ----- */
  var notifyForm = $("[data-notify]");
  if (notifyForm) {
    var emailInput = $("#notifyEmail", notifyForm);
    var wrap = notifyForm.closest(".notify");
    on(notifyForm, "submit", function (e) {
      e.preventDefault();
      var val = emailInput ? emailInput.value.trim() : "";
      if (!validEmail(val)) {
        setFieldError(emailInput, val ? "That address does not look right — double-check the domain." : "Please enter your email address first.");
        if (wrap) {
          wrap.classList.remove("shake");
          void wrap.offsetWidth;
          wrap.classList.add("shake");
        }
        if (emailInput) { emailInput.focus(); }
        return;
      }
      var done = $("[data-done]");
      var sentTo = $("[data-sent-to]");
      if (sentTo) { sentTo.textContent = val; }
      notifyForm.hidden = true;
      if (done) { done.hidden = false; }
    });
    on(emailInput, "input", function () { clearFieldError(emailInput); });
  }

})();
