/* ============================================================
   Fernwise — Sign Up | script.js
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


  /* ----- Live password strength meter ----- */
  var pw = $("#suPassword");
  var meter = $("[data-util='password-strength']");
  var word = $("[data-strength-word]");
  var hintEls = {
    length: $("[data-hint='length']"),
    "case": $("[data-hint='case']"),
    number: $("[data-hint='number']"),
    symbol: $("[data-hint='symbol']")
  };
  var strengthScore = 0;

  function scorePassword(v) {
    var checks = {
      length: v.length >= 8,
      "case": /[a-z]/.test(v) && /[A-Z]/.test(v),
      number: /\d/.test(v),
      symbol: /[^A-Za-z0-9\s]/.test(v)
    };
    var passed = 0;
    Object.keys(checks).forEach(function (k) {
      if (hintEls[k]) { hintEls[k].classList.toggle("ok", checks[k]); }
      if (checks[k]) { passed += 1; }
    });
    if (!v) { return 0; }
    if (!checks.length || passed <= 1) { return 1; }
    if (passed <= 3) { return 2; }
    return 3;
  }

  function paintMeter(v) {
    strengthScore = scorePassword(v);
    if (!meter) { return; }
    meter.classList.remove("is-weak", "is-fair", "is-strong");
    var label = "start typing";
    if (strengthScore === 1) { meter.classList.add("is-weak"); label = "weak"; }
    if (strengthScore === 2) { meter.classList.add("is-fair"); label = "fair"; }
    if (strengthScore === 3) { meter.classList.add("is-strong"); label = "strong"; }
    if (word) { word.textContent = label; }
  }

  on(pw, "input", function () {
    paintMeter(pw.value);
    clearFieldError(pw);
  });

  /* ----- Signup validation + success swap ----- */
  var form = $("[data-signup]");
  if (form) {
    var nameInput = $("#suName");
    var emailInput = $("#suEmail");
    var terms = $("#suTerms");
    on(form, "submit", function (e) {
      e.preventDefault();
      var ok = true;
      var name = nameInput ? nameInput.value.trim() : "";
      var email = emailInput ? emailInput.value.trim() : "";
      if (name.length < 2) { setFieldError(nameInput, "Tell us what to call you."); ok = false; }
      if (!validEmail(email)) { setFieldError(emailInput, email ? "That email looks misspelled." : "We need a valid email for watering reminders."); ok = false; }
      paintMeter(pw ? pw.value : "");
      if (strengthScore < 2) { setFieldError(pw, "Make the password at least \u201Cfair\u201D before continuing."); ok = false; }
      if (terms && !terms.checked) { setFieldError(terms, "Please accept the terms to continue."); ok = false; }
      if (!ok) {
        var firstBad = $(".field.invalid input", form);
        if (firstBad) { firstBad.focus(); }
        return;
      }
      var done = $("[data-done]");
      var who = $("[data-who]");
      var sentTo = $("[data-sent-to]");
      if (who) { who.textContent = name.split(" ")[0]; }
      if (sentTo) { sentTo.textContent = email; }
      form.hidden = true;
      if (done) { done.hidden = false; }
    });
    [nameInput, emailInput].forEach(function (inp) {
      on(inp, "input", function () { clearFieldError(inp); });
    });
    on(terms, "change", function () { clearFieldError(terms); });
  }

})();
