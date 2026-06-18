/* ============================================================
   Driftbase — Get Started | script.js
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


  /* ----- Onboarding wizard ----- */
  var wiz = $("[data-wiz]");
  var panels = $$("[data-panel]");
  var pips = $$("[data-pip]");
  var bar = $("[data-bar]");
  var backBtn = $("[data-back]");
  var nextBtn = $("[data-next]");
  var finishBtn = $("[data-finish]");
  var TOTAL = panels.length;
  var current = 1;

  function showStep(n) {
    current = Math.min(Math.max(n, 1), TOTAL);
    panels.forEach(function (p) {
      var idx = parseInt(p.getAttribute("data-panel"), 10);
      var active = idx === current;
      p.hidden = !active;
      p.classList.toggle("is-current", active);
    });
    pips.forEach(function (pip) {
      var idx = parseInt(pip.getAttribute("data-pip"), 10);
      pip.classList.toggle("is-active", idx === current);
      pip.classList.toggle("is-done", idx < current);
    });
    if (bar) { bar.style.width = (current / TOTAL * 100) + "%"; }
    if (backBtn) { backBtn.hidden = current === 1; }
    var last = current === TOTAL;
    if (nextBtn) { nextBtn.hidden = last; }
    if (finishBtn) { finishBtn.hidden = !last; }
    if (last) { buildSummary(); }
    var firstInput = $(".panel.is-current .input, .panel.is-current input", wiz);
    if (firstInput && firstInput.type !== "checkbox" && firstInput.type !== "radio") {
      try { firstInput.focus({ preventScroll: true }); } catch (err) { firstInput.focus(); }
    }
  }

  function validateStep(n) {
    var ok = true;
    if (n === 1) {
      var nm = $("#obName"); var role = $("#obRole");
      if (nm && nm.value.trim().length < 2) { setFieldError(nm, "We\u2019d love to know your name."); ok = false; }
      if (role && !role.value) { setFieldError(role, "Pick the closest match so we can tailor things."); ok = false; }
    } else if (n === 2) {
      var ws = $("#obWs");
      if (ws && ws.value.trim().length < 2) { setFieldError(ws, "Give your workspace a short name."); ok = false; }
    } else if (n === 3) {
      var checked = $$("[data-focus] input:checked");
      var ferr = $("[data-focus-err]");
      if (checked.length === 0) { if (ferr) { ferr.hidden = false; } ok = false; }
      else if (ferr) { ferr.hidden = true; }
    } else if (n === 4) {
      var inv = $("#obInvite");
      var v = inv ? inv.value.trim() : "";
      if (v && !validEmail(v)) { setFieldError(inv, "That email looks off \u2014 or leave it blank to skip."); ok = false; }
    }
    if (!ok) {
      var bad = $(".panel.is-current .field.invalid .input, .panel.is-current .field.invalid input", wiz);
      if (bad) { bad.focus(); }
    }
    return ok;
  }

  function buildSummary() {
    var box = $("[data-summary]");
    if (!box) { return; }
    var nm = ($("#obName") || {}).value || "";
    var ws = ($("#obWs") || {}).value || "";
    var foci = $$("[data-focus] input:checked").map(function (c) { return c.value; });
    var bits = [];
    if (nm.trim()) { bits.push("<strong>" + nm.trim().replace(/</g, "&lt;") + "</strong>"); }
    if (ws.trim()) { bits.push("workspace <strong>" + ws.trim().replace(/</g, "&lt;") + "</strong>"); }
    if (foci.length) { bits.push("focused on <strong>" + foci.length + "</strong> area" + (foci.length > 1 ? "s" : "")); }
    box.innerHTML = bits.length ? "Ready to create " + bits.join(", ") + "." : "";
  }

  on(nextBtn, "click", function () {
    if (validateStep(current)) { showStep(current + 1); }
  });
  on(backBtn, "click", function () { showStep(current - 1); });

  if (wiz) {
    on(wiz, "submit", function (e) {
      e.preventDefault();
      if (!validateStep(current)) { return; }
      var nameVal = (($("#obName") || {}).value || "").trim().split(" ")[0] || "friend";
      var fn = $("[data-finish-name]");
      if (fn) { fn.textContent = nameVal; }
      wiz.hidden = true;
      var stepsEl = $("[data-steps]");
      var barEl = $(".bar");
      var headEl = $(".wizard-head");
      [stepsEl, barEl, headEl].forEach(function (el) { if (el) { el.style.display = "none"; } });
      var fin = $("[data-finish-screen]");
      if (fin) { fin.hidden = false; }
    });
    // clear errors on edit
    $$(".input", wiz).forEach(function (inp) {
      on(inp, "input", function () { clearFieldError(inp); });
      on(inp, "change", function () { clearFieldError(inp); });
    });
    $$("[data-focus] input").forEach(function (c) {
      on(c, "change", function () { var e = $("[data-focus-err]"); if (e) { e.hidden = true; } });
    });
  }

  /* ----- Skip-all jumps to finish ----- */
  on($("[data-skip-all]"), "click", function () {
    if (!wiz) { return; }
    var fn = $("[data-finish-name]");
    var nm = (($("#obName") || {}).value || "").trim().split(" ")[0];
    if (fn) { fn.textContent = nm || "there"; }
    wiz.hidden = true;
    [$("[data-steps]"), $(".bar"), $(".wizard-head")].forEach(function (el) { if (el) { el.style.display = "none"; } });
    var fin = $("[data-finish-screen]");
    if (fin) { fin.hidden = false; }
  });

  showStep(1);

})();
