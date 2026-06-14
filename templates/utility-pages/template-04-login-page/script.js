/* ============================================================
   Lumenstack — Login | script.js
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

  /* ----- Safe localStorage (private windows may throw) ----- */
  function storeGet(key) { try { return window.localStorage.getItem(key); } catch (err) { return null; } }
  function storeSet(key, val) { try { window.localStorage.setItem(key, val); } catch (err) { /* storage unavailable */ } }


  /* ----- Delegated demo-link guard (social sign-in placeholders) ----- */
  on(doc, "click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href="#"]') : null;
    if (a) {
      e.preventDefault();
      var provider = a.getAttribute("title") || "That provider";
      var label = $("[data-demo-flash]");
      if (label) {
        label.textContent = provider + " sign-in is a demo in this template.";
        label.hidden = false;
      }
    }
  });

  /* ----- Show / hide password ----- */
  var pwInput = $("#loginPassword");
  var peekBtn = $("[data-peek]");
  if (pwInput && peekBtn) {
    var eyeOpen = $(".eye-open", peekBtn);
    var eyeShut = $(".eye-shut", peekBtn);
    on(peekBtn, "click", function () {
      var showing = pwInput.type === "text";
      pwInput.type = showing ? "password" : "text";
      peekBtn.setAttribute("aria-pressed", showing ? "false" : "true");
      peekBtn.setAttribute("aria-label", showing ? "Show password" : "Hide password");
      if (eyeOpen) { eyeOpen.hidden = !showing; }
      if (eyeShut) { eyeShut.hidden = showing; }
      pwInput.focus();
    });
  }

  /* ----- Remember-me: prefill email on return visits ----- */
  var emailInput = $("#loginEmail");
  var remember = $("[data-remember]");
  var saved = storeGet("lumenstack-login-email");
  if (saved && emailInput && remember) {
    emailInput.value = saved;
    remember.checked = true;
  }

  /* ----- Validation + submit ----- */
  var form = $("[data-util='login-form']");
  if (form) {
    var submitBtn = $("[data-submit]", form);
    on(form, "submit", function (e) {
      e.preventDefault();
      var ok = true;
      var email = emailInput ? emailInput.value.trim() : "";
      var pass = pwInput ? pwInput.value : "";
      if (!validEmail(email)) {
        setFieldError(emailInput, email ? "That does not look like a valid email address." : "Enter the email you signed up with.");
        ok = false;
      }
      if (pass.length < 8) {
        setFieldError(pwInput, pass ? "Passwords are at least 8 characters." : "Enter your password.");
        ok = false;
      }
      if (!ok) {
        var firstBad = $(".field.invalid .input", form);
        if (firstBad) { firstBad.focus(); }
        return;
      }
      if (remember && remember.checked) { storeSet("lumenstack-login-email", email); }
      if (submitBtn) {
        submitBtn.classList.add("busy");
        submitBtn.setAttribute("disabled", "");
      }
      window.setTimeout(function () {
        var done = $("[data-done]");
        var who = $("[data-who]");
        if (who) { who.textContent = email.split("@")[0]; }
        form.hidden = true;
        var soc = $(".socials");
        var div = $(".divider");
        var head = $(".form-head");
        if (soc) { soc.hidden = true; }
        if (div) { div.hidden = true; }
        if (head) { head.hidden = true; }
        if (done) { done.hidden = false; }
      }, 900);
    });
    [emailInput, pwInput].forEach(function (inp) {
      on(inp, "input", function () { clearFieldError(inp); });
    });
  }

})();
