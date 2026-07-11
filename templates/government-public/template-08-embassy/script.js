/* Embassy of Valoria — government-public template (template-08-embassy) | vanilla JS, dependency-free, file://-safe */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var BRAND = "Embassy of Valoria";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ----- Mobile navigation ----- */
  var navToggle = $(".nav-toggle");
  var navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    var closeNav = function () {
      navMenu.classList.remove("open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navMenu.addEventListener("click", function (e) {
      var n = e.target;
      while (n && n !== navMenu && n.tagName !== "A") { n = n.parentNode; }
      if (n && n.tagName === "A") { closeNav(); }
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeNav(); } });
  }

  /* ----- Header scroll state ----- */
  var header = $(".site-header");
  if (header) {
    var headerTick = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", headerTick, { passive: true });
    headerTick();
  }

  /* ----- Scroll reveal (reduced-motion safe) ----- */
  var revealEls = $all(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); revealObs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ----- Count-up stats ----- */
  function formatNum(n, decimals) {
    var s = n.toFixed(decimals);
    var parts = s.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-target") || "0");
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    if (reduceMotion) { el.textContent = prefix + formatNum(target, decimals) + suffix; return; }
    var duration = 1500, startTime = null;
    function tick(ts) {
      if (!startTime) { startTime = ts; }
      var p = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + formatNum(target * eased, decimals) + suffix;
      if (p < 1) { window.requestAnimationFrame(tick); }
    }
    window.requestAnimationFrame(tick);
  }
  var counters = $all(".stat-num[data-target]");
  if (counters.length && "IntersectionObserver" in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); countObs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObs.observe(el); });
  } else { counters.forEach(animateCount); }

  /* ----- Find-a-service search + filter (services page) — null-safe ----- */
  var svcWrap = $("[data-services]");
  if (svcWrap) {
    var searchInput = $("[data-svc-search]", svcWrap);
    var chips = $all(".chip[data-filter]", svcWrap);
    var cards = $all("[data-svc-card]", svcWrap);
    var countEl = $("[data-svc-count]", svcWrap);
    var emptyEl = $("[data-svc-empty]", svcWrap);
    var activeFilter = "all";
    var applyFilter = function () {
      var q = (searchInput && searchInput.value ? searchInput.value : "").trim().toLowerCase();
      var shown = 0;
      cards.forEach(function (card) {
        var cat = card.getAttribute("data-cat") || "";
        var text = (card.getAttribute("data-text") || "").toLowerCase();
        var okCat = activeFilter === "all" || cat === activeFilter;
        var okText = !q || text.indexOf(q) !== -1;
        var ok = okCat && okText;
        card.classList.toggle("hide", !ok);
        if (ok) { shown++; }
      });
      if (countEl) { countEl.textContent = "Showing " + shown + " of " + cards.length + " services"; }
      if (emptyEl) { emptyEl.hidden = shown > 0; }
    };
    if (searchInput) { searchInput.addEventListener("input", applyFilter); }
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        activeFilter = chip.getAttribute("data-filter") || "all";
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle("is-active", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        });
        applyFilter();
      });
    });
    applyFilter();
  }

  /* ----- Form validation (enquiry / request / contact) ----- */
  function wireForm(form) {
    if (!form) { return; }
    var statusEl = $("[data-form-status]", form);
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var validateField = function (input) {
      var field = input.closest(".f-field");
      var err = field ? field.querySelector(".field-err") : null;
      var rule = input.getAttribute("data-req");
      var opt = input.getAttribute("data-opt");
      var val = (input.value || "").trim();
      var good = true;
      if (rule === "email") { good = emailRe.test(val); }
      else if (rule === "sel") { good = val.length > 0 && val.indexOf("Select") === -1 && val.indexOf("Choose") === -1; }
      else if (rule) { good = val.length >= parseInt(rule, 10); }
      else if (opt === "phone" && val.length) { good = val.replace(/\D/g, "").length >= 7; }
      if (field) { field.classList.toggle("bad", !good); }
      if (err) { err.hidden = good; }
      return good;
    };
    var watched = $all("[data-req], [data-opt]", form);
    watched.forEach(function (input) {
      input.addEventListener("input", function () {
        var f = input.closest(".f-field");
        if (f && f.classList.contains("bad")) { validateField(input); }
      });
      input.addEventListener("blur", function () { if ((input.value || "").trim().length) { validateField(input); } });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allGood = true, firstBad = null;
      watched.forEach(function (input) {
        var ok = validateField(input);
        if (!ok && !firstBad) { firstBad = input; }
        allGood = allGood && ok;
      });
      if (!allGood) {
        if (statusEl) { statusEl.textContent = "Please correct the highlighted fields and try again."; statusEl.classList.remove("ok"); statusEl.classList.add("bad"); }
        if (firstBad) { firstBad.focus(); }
        return;
      }
      var okMsg = form.getAttribute("data-ok") || "Thank you — your request has been received. A member of our team will respond shortly.";
      if (statusEl) { statusEl.textContent = okMsg; statusEl.classList.remove("bad"); statusEl.classList.add("ok"); }
      form.reset();
      var submitBtn = $("button[type='submit']", form);
      if (submitBtn) {
        var label = submitBtn.textContent;
        submitBtn.textContent = "Sent ✓"; submitBtn.disabled = true;
        window.setTimeout(function () { submitBtn.textContent = label; submitBtn.disabled = false; }, 2600);
      }
    });
  }
  $all("[data-form]").forEach(wireForm);

  /* ----- FAQ accordion ----- */
  $all("[data-faq]").forEach(function (faq) {
    var btn = $(".faq-q", faq);
    if (!btn) { return; }
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", function () {
      var open = faq.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ----- Download / demo toast for forms list ----- */
  var toast = $("[data-toast]");
  function showToast(msg) {
    if (!toast) { return; }
    var label = $("[data-toast-msg]", toast);
    if (label && msg) { label.textContent = msg; }
    toast.classList.add("show");
    if (showToast._t) { window.clearTimeout(showToast._t); }
    showToast._t = window.setTimeout(function () { toast.classList.remove("show"); }, 2400);
  }
  $all("[data-download]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var name = btn.getAttribute("data-download") || "Document";
      showToast("Demo template: “" + name + "” would download here.");
    });
  });

  /* ----- Delegated demo-link + bare-hash guard ----- */
  document.addEventListener("click", function (e) {
    var n = e.target;
    while (n && n.tagName !== "A") { n = n.parentNode; }
    if (!n) { return; }
    var href = n.getAttribute && n.getAttribute("href");
    if (n.hasAttribute && n.hasAttribute("data-demo-link")) {
      e.preventDefault();
      var lbl = n.getAttribute("aria-label") || n.textContent || "This link";
      showToast(lbl.trim() + " is a demo link in this template.");
      return;
    }
    if (href === "#") { e.preventDefault(); }
  });

  /* ----- Footer year ----- */
  $all("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ----- Back to top ----- */
  var toTop = $("[data-totop]");
  if (toTop) {
    var toTopTick = function () { toTop.classList.toggle("show", window.scrollY > 560); };
    window.addEventListener("scroll", toTopTick, { passive: true });
    toTopTick();
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
  }
})();
