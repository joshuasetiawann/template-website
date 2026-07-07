/* template-08-aquarium-shop — AbyssReef Aquatics interaction layer · build 08/20 */
/* Pure vanilla JS, null-safe, file:// friendly. No dependencies. */
(function () {
  "use strict";
  var doc = document;
  var SIG = "template-08-aquarium-shop";

  var reduce = false;
  try {
    reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) { reduce = false; }

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, ev, fn, opts) { if (el) { el.addEventListener(ev, fn, opts || false); } }

  /* ---------- current year ---------- */
  function initYear() {
    var now = new Date();
    $all("[data-year]").forEach(function (el) { el.textContent = now.getFullYear(); });
  }

  /* ---------- mobile nav ---------- */
  function initNav() {
    var toggle = $(".nav-toggle");
    var menu = $("#navmenu");
    if (!toggle || !menu) { return; }
    function close() { toggle.setAttribute("aria-expanded", "false"); menu.classList.remove("is-open"); }
    on(toggle, "click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      menu.classList.toggle("is-open", !open);
    });
    $all("a", menu).forEach(function (a) { on(a, "click", close); });
    on(doc, "keydown", function (e) { if (e.key === "Escape") { close(); } });
    on(doc, "click", function (e) {
      if (menu.classList.contains("is-open") && !menu.contains(e.target) && !toggle.contains(e.target)) { close(); }
    });
  }

  /* ---------- sticky header state ---------- */
  function initHeader() {
    var header = $(".topbar");
    if (!header) { return; }
    var tick = function () { header.classList.toggle("is-stuck", (window.scrollY || 0) > 8); };
    tick();
    on(window, "scroll", tick, { passive: true });
  }

  /* ---------- back to top ---------- */
  function initToTop() {
    var btn = $("[data-totop]");
    if (!btn) { return; }
    var tick = function () { btn.classList.toggle("is-visible", (window.scrollY || 0) > 420); };
    tick();
    on(window, "scroll", tick, { passive: true });
    on(btn, "click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  }

  /* ---------- scroll reveal ---------- */
  function initReveal() {
    var items = $all("[data-reveal]");
    if (!items.length) { return; }
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- count-up stats ---------- */
  function initCount() {
    var nums = $all("[data-count]");
    if (!nums.length) { return; }
    function run(el) {
      var raw = el.getAttribute("data-count");
      var target = parseFloat(raw.replace(/[^0-9.]/g, ""));
      if (isNaN(target)) { el.textContent = raw; return; }
      var prefix = el.getAttribute("data-prefix") || "";
      var suffix = el.getAttribute("data-suffix") || "";
      if (reduce) { el.textContent = prefix + raw + suffix; return; }
      var start = null, dur = 1400;
      function step(ts) {
        if (start === null) { start = ts; }
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target * eased;
        var out = (target % 1 !== 0) ? val.toFixed(1) : Math.round(val).toLocaleString();
        el.textContent = prefix + out + suffix;
        if (p < 1) { requestAnimationFrame(step); } else { el.textContent = prefix + raw + suffix; }
      }
      requestAnimationFrame(step);
    }
    if (!("IntersectionObserver" in window)) { nums.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    var qs = $all(".faq-q");
    if (!qs.length) { return; }
    qs.forEach(function (q) {
      on(q, "click", function () {
        var open = q.getAttribute("aria-expanded") === "true";
        q.setAttribute("aria-expanded", open ? "false" : "true");
        var panel = doc.getElementById(q.getAttribute("aria-controls"));
        if (panel) { panel.hidden = open; }
      });
    });
  }

  /* ---------- product / shop filter ---------- */
  function initFilter() {
    var bar = $("[data-filter]");
    if (!bar) { return; }
    var items = $all("[data-cat]");
    var btns = $all(".filter-btn", bar);
    on(bar, "click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) { return; }
      var cat = btn.getAttribute("data-cat-filter");
      btns.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      items.forEach(function (it) {
        var match = cat === "All" || it.getAttribute("data-cat") === cat;
        it.hidden = !match;
      });
    });
  }

  /* ---------- delegated demo-link handler (single) ---------- */
  function initDemoLinks() {
    on(doc, "click", function (e) {
      var a = e.target.closest("[data-demo-link]");
      if (!a) { return; }
      e.preventDefault();
      var note = $("[data-demo-note]");
      if (note) {
        note.textContent = "This is a demo link — connect it to your own page when you customise the template.";
        note.hidden = false;
        window.clearTimeout(note._t);
        note._t = window.setTimeout(function () { note.hidden = true; }, 3600);
      }
    });
  }

  /* ---------- booking / quote widget ---------- */
  function initBooker() {
    var form = $("[data-book]");
    if (!form) { return; }
    var success = $("[data-book-success]");

    function setError(field, msg) {
      var wrap = field.closest(".field");
      if (!wrap) { return; }
      wrap.classList.toggle("invalid", !!msg);
      var err = $(".err", wrap);
      if (err && msg) { err.textContent = msg; }
    }
    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    on(form, "submit", function (e) {
      e.preventDefault();
      var ok = true;
      var fields = $all("[required]", form);
      fields.forEach(function (f) {
        var val = (f.value || "").trim();
        if (!val) { setError(f, "This field is required."); ok = false; }
        else if (f.type === "email" && !isEmail(val)) { setError(f, "Please enter a valid email address."); ok = false; }
        else { setError(f, ""); }
      });
      if (!ok) {
        var firstBad = $(".field.invalid input, .field.invalid select, .field.invalid textarea", form);
        if (firstBad) { firstBad.focus(); }
        return;
      }
      if (success) {
        var get = function (n) { var el = form.elements[n]; return el ? el.value : ""; };
        var svc = get("service");
        var summary = $("[data-book-summary]");
        if (summary) {
          var parts = [];
          if (svc) { parts.push("<strong>Service:</strong> " + svc); }
          if (get("pettype")) { parts.push("<strong>Pet:</strong> " + get("pettype")); }
          if (get("date")) { parts.push("<strong>Date:</strong> " + get("date")); }
          if (get("time")) { parts.push("<strong>Time:</strong> " + get("time")); }
          if (get("owner")) { parts.push("<strong>Owner:</strong> " + get("owner")); }
          if (get("email")) { parts.push("<strong>Confirmation to:</strong> " + get("email")); }
          summary.innerHTML = parts.join("<br>");
        }
        success.hidden = false;
        try { success.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); } catch (e2) {}
        form.reset();
      }
    });

    on(form, "input", function (e) {
      var f = e.target;
      if (f && f.closest && f.closest(".field.invalid")) {
        if ((f.value || "").trim()) { setError(f, ""); }
      }
    });
  }

  /* ---------- contact form validation ---------- */
  function initContactForm() {
    var form = $("[data-contact]");
    if (!form) { return; }
    var success = $("[data-contact-success]");
    function setError(field, msg) {
      var wrap = field.closest(".field");
      if (!wrap) { return; }
      wrap.classList.toggle("invalid", !!msg);
      var err = $(".err", wrap);
      if (err && msg) { err.textContent = msg; }
    }
    function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    on(form, "submit", function (e) {
      e.preventDefault();
      var ok = true;
      $all("[required]", form).forEach(function (f) {
        var val = (f.value || "").trim();
        if (!val) { setError(f, "This field is required."); ok = false; }
        else if (f.type === "email" && !isEmail(val)) { setError(f, "Please enter a valid email address."); ok = false; }
        else { setError(f, ""); }
      });
      if (!ok) { var fb = $(".field.invalid input, .field.invalid textarea", form); if (fb) { fb.focus(); } return; }
      if (success) { success.hidden = false; try { success.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); } catch (e3) {} form.reset(); }
    });
    on(form, "input", function (e) {
      var f = e.target;
      if (f && f.closest && f.closest(".field.invalid") && (f.value || "").trim()) { setError(f, ""); }
    });
  }

  /* ---------- quick quote (insurance) ---------- */
  function initQuote() {
    var form = $("[data-quote]");
    if (!form) { return; }
    var out = $("[data-quote-out]");
    var table = {
      "Dog": 1.0, "Cat": 0.78, "Rabbit": 0.55, "Bird": 0.6, "Reptile": 0.5, "Other": 0.7
    };
    on(form, "submit", function (e) {
      e.preventDefault();
      var pet = form.elements["pettype"] ? form.elements["pettype"].value : "Dog";
      var ageEl = form.elements["age"];
      var age = ageEl ? parseInt(ageEl.value, 10) : 0;
      var levelEl = form.elements["level"];
      var level = levelEl ? levelEl.value : "Essential";
      if (!ageEl || isNaN(age) || age < 0) {
        var w = ageEl ? ageEl.closest(".field") : null;
        if (w) { w.classList.add("invalid"); }
        return;
      }
      var base = 9;
      var mult = table[pet] || 0.8;
      var lvlMult = level === "Premier" ? 2.4 : (level === "Lifetime" ? 1.7 : 1.0);
      var ageAdd = Math.max(0, age - 4) * 1.6;
      var monthly = (base + ageAdd) * mult * lvlMult;
      if (out) {
        out.innerHTML = "<strong>Estimated premium:</strong> £" + monthly.toFixed(2) + "/month for a " + age + "-year-old " + pet.toLowerCase() + " on " + level + " cover. This is an indicative figure — request a full quote to confirm.";
        out.hidden = false;
      }
    });
  }

  function ready(fn) {
    if (doc.readyState === "loading") { doc.addEventListener("DOMContentLoaded", fn); } else { fn(); }
  }

  ready(function () {
    initYear();
    initNav();
    initHeader();
    initToTop();
    initReveal();
    initCount();
    initFaq();
    initFilter();
    initDemoLinks();
    initBooker();
    initContactForm();
    initQuote();
  });
})();
