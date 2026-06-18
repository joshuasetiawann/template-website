/* ============================================================
   Thicket Post — Unsubscribe | script.js
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

  /* ----- Toast ----- */
  var toastEl = $("[data-toast]");
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) { return; }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    if (toastTimer) { clearTimeout(toastTimer); }
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2400);
  }


  /* ----- Reveal feedback textarea when "Something else" / any reason picked ----- */
  var form = $("[data-unsub]");
  var feedback = $("[data-feedback]");
  var reasons = $$("[data-reasons] input");
  reasons.forEach(function (r) {
    on(r, "change", function () {
      if (feedback) { feedback.hidden = false; }
    });
  });

  /* ----- Char counter ----- */
  var msg = $("#unsubMsg");
  var count = $("[data-count]");
  var counterEl = count ? count.closest(".counter") : null;
  on(msg, "input", function () {
    var n = msg.value.length;
    if (count) { count.textContent = String(n); }
    if (counterEl) { counterEl.classList.toggle("near", n > 240); }
  });

  /* ----- Alt-preference chips (mutually exclusive feel) ----- */
  var downgradeChip = $("[data-downgrade]");
  var pauseChip = $("[data-pause]");
  var chips = [downgradeChip, pauseChip];
  chips.forEach(function (c) {
    if (!c) { return; }
    on(c, "click", function () {
      var was = c.classList.contains("is-picked");
      chips.forEach(function (o) { if (o) { o.classList.remove("is-picked"); } });
      if (!was) { c.classList.add("is-picked"); }
      var msgPick = c === downgradeChip
        ? "Switched to a monthly digest \u2014 you\u2019ll stay subscribed"
        : "Paused for 30 days \u2014 we\u2019ll resume gently";
      toast(was ? "Preference cleared" : msgPick);
    });
  });

  /* ----- Reason label map ----- */
  var REASONS = {
    "too-often": "You told us emails came too often.",
    "not-relevant": "You told us the content wasn\u2019t relevant.",
    "never-signed": "You told us you never signed up \u2014 sorry about that.",
    "temporary": "You just needed a break \u2014 we\u2019ll be here.",
    "other": "Thanks for the extra feedback."
  };

  /* ----- Submit -> done state ----- */
  var confirmState = $("[data-confirm]");
  var doneState = $("[data-done]");
  if (form) {
    on(form, "submit", function (e) {
      e.preventDefault();
      var picked = $("[data-reasons] input:checked");
      var note = $("[data-done-reason]");
      if (note) {
        if (picked && REASONS[picked.value]) { note.textContent = REASONS[picked.value]; note.hidden = false; }
        else { note.hidden = true; }
      }
      if (confirmState) { confirmState.hidden = true; }
      if (doneState) { doneState.hidden = false; }
      var card = $("[data-util='unsubscribe']");
      if (card) { try { card.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" }); } catch (err) {} }
    });
  }

  /* ----- Undo / resubscribe ----- */
  on($("[data-undo]"), "click", function () {
    if (doneState) { doneState.hidden = true; }
    if (confirmState) { confirmState.hidden = false; }
    // reset selections
    reasons.forEach(function (r) { r.checked = false; });
    chips.forEach(function (c) { if (c) { c.classList.remove("is-picked"); } });
    if (feedback) { feedback.hidden = true; }
    if (msg) { msg.value = ""; }
    if (count) { count.textContent = "0"; }
    if (counterEl) { counterEl.classList.remove("near"); }
    toast("Welcome back \u2014 you\u2019re subscribed again \u2713");
  });

})();
