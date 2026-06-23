/* Goldenhour Studio — Tanning & Glow Studio | template-07-tanning-studio interactions
   Shared vanilla-JS module across all pages of this template.
   Dependency-free, framework-free, file://-safe. Every selector is null-guarded. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var BRAND = "Goldenhour Studio";
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

  /* ----- Scroll-reveal (reduced-motion safe) ----- */
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

  /* ----- Services preview / menu chip filter ----- */
  var menuWrap = $("[data-menu]");
  if (menuWrap) {
    var mChips = $all(".chip[data-filter]", menuWrap);
    var groups = $all("[data-group]", menuWrap);
    var applyMenu = function (key) {
      groups.forEach(function (g) {
        var show = key === "all" || g.getAttribute("data-group") === key;
        g.classList.toggle("hide", !show);
      });
    };
    mChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        mChips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle("is-active", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        });
        applyMenu(chip.getAttribute("data-filter") || "all");
      });
    });
  }

  /* ----- Helpers for forms ----- */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function fieldOf(input) {
    var n = input;
    while (n && !(n.classList && n.classList.contains("f-field"))) { n = n.parentNode; }
    return n;
  }
  function validateField(input) {
    var field = fieldOf(input);
    var err = field ? field.querySelector(".field-err") : null;
    var rule = input.getAttribute("data-req");
    var opt = input.getAttribute("data-opt");
    var val = (input.value || "").trim();
    var good = true;
    if (rule === "email") { good = emailRe.test(val); }
    else if (rule === "sel") { good = val.length > 0 && val.indexOf("Choose") === -1 && val.indexOf("Select") === -1; }
    else if (rule === "date") { good = val.length > 0; }
    else if (rule) { good = val.length >= parseInt(rule, 10); }
    else if (opt === "phone" && val.length) { good = val.replace(/\D/g, "").length >= 7; }
    if (field) { field.classList.toggle("bad", !good); }
    if (err) { err.hidden = good; }
    return good;
  }

  /* ----- Generic enquiry / contact form ----- */
  function wireForm(form) {
    if (!form) { return; }
    var statusEl = $("[data-form-status]", form);
    var watched = $all("[data-req], [data-opt]", form);
    watched.forEach(function (input) {
      input.addEventListener("input", function () {
        var f = fieldOf(input);
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
        if (statusEl) { statusEl.textContent = "Please fix the highlighted fields and try again."; statusEl.classList.remove("ok"); statusEl.classList.add("bad"); }
        if (firstBad && firstBad.focus) { firstBad.focus(); }
        return;
      }
      var okMsg = form.getAttribute("data-ok") || "Thanks — we've received your details and will be in touch shortly.";
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
  $all("[data-enquiry], [data-contact]").forEach(wireForm);

  /* ----- Booking widget: validate + success SUMMARY ----- */
  $all("[data-book]").forEach(function (form) {
    var statusEl = $("[data-form-status]", form);
    var summary = $("[data-book-summary]", form);
    var watched = $all("[data-req], [data-opt]", form);
    watched.forEach(function (input) {
      input.addEventListener("input", function () {
        var f = fieldOf(input);
        if (f && f.classList.contains("bad")) { validateField(input); }
      });
      input.addEventListener("blur", function () { if ((input.value || "").trim().length) { validateField(input); } });
    });
    var fieldVal = function (sel) { var el = $(sel, form); return el ? (el.value || "").trim() : ""; };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allGood = true, firstBad = null;
      watched.forEach(function (input) {
        var ok = validateField(input);
        if (!ok && !firstBad) { firstBad = input; }
        allGood = allGood && ok;
      });
      if (!allGood) {
        if (statusEl) { statusEl.textContent = "Please complete the highlighted fields to request your booking."; statusEl.classList.remove("ok"); statusEl.classList.add("bad"); }
        if (summary) { summary.hidden = true; }
        if (firstBad && firstBad.focus) { firstBad.focus(); }
        return;
      }
      var svc = fieldVal("[data-bk-service]");
      var date = fieldVal("[data-bk-date]");
      var time = fieldVal("[data-bk-time]");
      var who = fieldVal("[data-bk-staff]");
      var name = fieldVal("[data-bk-name]");
      if (summary) {
        var rows = "";
        var add = function (label, val) { if (val) { rows += "<div><dt>" + label + "</dt><dd>" + val.replace(/</g, "&lt;") + "</dd></div>"; } };
        add("Service", svc);
        add("Date", date);
        add("Time", time);
        add("With", who);
        add("Name", name);
        var head = "<p class=\"bk-ok-title\">✓ Request received" + (name ? ", " + name.split(" ")[0].replace(/</g, "&lt;") : "") + "!</p>";
        var foot = "<p class=\"bk-ok-foot\">This is a demo confirmation. We'll “email” you shortly to lock in your appointment at " + BRAND + ".</p>";
        summary.innerHTML = head + "<dl class=\"bk-summary-list\">" + rows + "</dl>" + foot;
        summary.hidden = false;
      }
      if (statusEl) { statusEl.textContent = ""; statusEl.classList.remove("bad"); statusEl.classList.remove("ok"); }
      var submitBtn = $("button[type='submit']", form);
      if (submitBtn) {
        var label2 = submitBtn.textContent;
        submitBtn.textContent = "Requested ✓"; submitBtn.disabled = true;
        window.setTimeout(function () { submitBtn.textContent = label2; submitBtn.disabled = false; }, 2800);
      }
      form.reset();
      if (summary && summary.scrollIntoView) { summary.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" }); }
    });
    var resetBtn = $("[data-book-reset]", form);
    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        if (summary) { summary.hidden = true; summary.innerHTML = ""; }
        if (statusEl) { statusEl.textContent = ""; statusEl.classList.remove("ok"); statusEl.classList.remove("bad"); }
        watched.forEach(function (input) { var f = fieldOf(input); if (f) { f.classList.remove("bad"); } var er = f ? f.querySelector(".field-err") : null; if (er) { er.hidden = true; } });
      });
    }
  });

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

  /* ----- Hero / CTA scroll-to-booking shortcut ----- */
  $all("[data-scrollto]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("data-scrollto");
      var target = id ? document.getElementById(id) : null;
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }
    });
  });

  /* ----- Delegated placeholder-link guard (a[href="#"]) ----- */
  document.addEventListener("click", function (e) {
    var n = e.target;
    while (n && n.tagName !== "A") { n = n.parentNode; }
    if (n && n.getAttribute && n.getAttribute("href") === "#") { e.preventDefault(); }
  });

  /* ----- Footer year via getFullYear ----- */
  $all("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ----- Back-to-top ----- */
  var toTop = $("[data-totop]");
  if (toTop) {
    var toTopTick = function () { toTop.classList.toggle("show", window.scrollY > 560); };
    window.addEventListener("scroll", toTopTick, { passive: true });
    toTopTick();
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
  }
})();
