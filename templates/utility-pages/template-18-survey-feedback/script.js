/* ============================================================
   Bloomgauge — Share Feedback | script.js
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


  /* ----- Star rating (radiogroup) ----- */
  var stars = $$("[data-star]");
  var ratingWord = $("[data-rating-word]");
  var starsWrap = $("[data-stars]");
  var rating = 0;
  var WORDS = { 1: "Not great \u2014 sorry to hear it", 2: "Below par", 3: "It was OK", 4: "Pretty good!", 5: "Loved it \u2014 thank you!" };

  function paintStars(n, hot) {
    stars.forEach(function (s) {
      var v = parseInt(s.getAttribute("data-star"), 10);
      s.classList.toggle(hot ? "is-hot" : "is-on", v <= n);
      if (!hot) {
        s.classList.remove("is-hot");
        s.setAttribute("aria-checked", v === rating ? "true" : "false");
        s.tabIndex = (rating ? v === rating : v === 1) ? 0 : -1;
      }
    });
  }
  function clearHot() { stars.forEach(function (s) { s.classList.remove("is-hot"); }); }

  function setRating(n) {
    rating = n;
    if (starsWrap) { starsWrap.classList.add("rated"); }
    paintStars(rating, false);
    if (ratingWord) { ratingWord.textContent = WORDS[rating] || "Tap a star to rate"; }
    var err = $("[data-err-rating]");
    if (err) { err.hidden = true; }
  }

  stars.forEach(function (s, i) {
    var v = parseInt(s.getAttribute("data-star"), 10);
    on(s, "mouseenter", function () { paintStars(v, true); });
    on(s, "mouseleave", function () { clearHot(); });
    on(s, "click", function () { setRating(v); });
    on(s, "keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault(); var nx = Math.min(5, (rating || 0) + 1); setRating(nx); stars[nx - 1].focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault(); var pv = Math.max(1, (rating || 1) - 1); setRating(pv); stars[pv - 1].focus();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault(); setRating(v);
      }
    });
  });

  /* ----- NPS slider ----- */
  var slider = $("[data-slider]");
  var sliderOut = $("[data-slider-out]");
  var sliderTag = $("[data-slider-tag]");
  function paintSlider() {
    if (!slider) { return; }
    var v = parseInt(slider.value, 10);
    var pct = (v / 10) * 100;
    slider.style.background = "linear-gradient(90deg,var(--accent) 0%,var(--accent) " + pct + "%,var(--accent-soft) " + pct + "%)";
    if (sliderOut) { sliderOut.textContent = String(v); }
    if (sliderTag) {
      sliderTag.classList.remove("is-detractor", "is-promoter");
      var label = "Passive";
      if (v <= 6) { label = "Detractor"; sliderTag.classList.add("is-detractor"); }
      else if (v >= 9) { label = "Promoter"; sliderTag.classList.add("is-promoter"); }
      sliderTag.textContent = label;
    }
  }
  on(slider, "input", paintSlider);
  paintSlider();

  /* ----- Char counter ----- */
  var comment = $("#comment");
  var count = $("[data-count]");
  var counterEl = count ? count.closest(".counter") : null;
  on(comment, "input", function () {
    var n = comment.value.length;
    if (count) { count.textContent = String(n); }
    if (counterEl) { counterEl.classList.toggle("near", n > 440); }
  });

  /* ----- Follow-up email reveal ----- */
  var followup = $("[data-followup]");
  var emailField = $("[data-email-field]");
  on(followup, "change", function () {
    if (emailField) { emailField.hidden = !followup.checked; }
    if (followup.checked) { var f = $("#fuEmail"); if (f) { f.focus(); } }
    else { clearFieldError($("#fuEmail")); }
  });
  on($("#fuEmail"), "input", function () { clearFieldError($("#fuEmail")); });

  /* ----- Submit -> thanks ----- */
  var form = $("[data-survey]");
  var formState = $("[data-form-state]");
  var thanksState = $("[data-thanks-state]");
  if (form) {
    on(form, "submit", function (e) {
      e.preventDefault();
      var ok = true;
      if (!rating) {
        var err = $("[data-err-rating]");
        if (err) { err.hidden = false; }
        ok = false;
      }
      var fuEmail = $("#fuEmail");
      if (followup && followup.checked) {
        var v = fuEmail ? fuEmail.value.trim() : "";
        if (!validEmail(v)) { setFieldError(fuEmail, "Add a valid email or untick the box above."); ok = false; }
      }
      if (!ok) {
        form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
        var bad = $(".field.invalid input", form) || (rating ? null : stars[0]);
        if (bad) { bad.focus(); }
        return;
      }
      // thanks copy
      var copy = $("[data-thanks-copy]");
      if (copy) { copy.innerHTML = "Your <strong>" + rating + "-star</strong> rating is in. Feedback like yours is exactly how Bloomgauge grows."; }
      var emoji = $("[data-thanks-emoji]");
      if (emoji) { emoji.textContent = rating >= 4 ? "\uD83C\uDF89" : (rating === 3 ? "\uD83D\uDE4F" : "\uD83D\uDC9C"); }
      // recap pills
      var recap = $("[data-recap]");
      if (recap) {
        var bits = [];
        bits.push('<span class="recap-pill">\u2605 ' + rating + "/5</span>");
        if (slider) { bits.push('<span class="recap-pill">NPS ' + slider.value + "</span>"); }
        var topics = $$("[data-topics] input:checked").map(function (c) { return c.value; });
        topics.forEach(function (t) { bits.push('<span class="recap-pill">' + t + "</span>"); });
        recap.innerHTML = bits.join("");
      }
      if (formState) { formState.hidden = true; }
      if (thanksState) { thanksState.hidden = false; }
      var card = $("[data-util='survey']");
      if (card) { try { card.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" }); } catch (err2) {} }
    });
  }

})();
