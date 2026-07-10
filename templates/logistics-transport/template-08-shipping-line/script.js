/* BlueHaul Lines — Container Shipping Line | template-08-shipping-line interactions (vanilla JS, dependency-free, file://-safe) */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var BRAND = "BlueHaul Lines";
  var TRACK_PREFIX = "BHL";
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
    var headerTick = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    window.addEventListener("scroll", headerTick, { passive: true });
    headerTick();
  }

  /* ----- Scroll-reveal ----- */
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

  /* ----- Tracking widget (fake status timeline) ----- */
  var trackBox = $("[data-track]");
  if (trackBox) {
    var trackInput = $("[data-track-input]", trackBox);
    var trackResult = $("[data-track-result]", trackBox);
    var trackErr = $("[data-track-err]", trackBox);
    var trackRefEl = $("[data-track-ref]", trackBox);
    var trackEtaEl = $("[data-track-eta]", trackBox);
    var steps = $all(".tl-step", trackBox);
    var hashStr = function (str) {
      var h = 0, i;
      for (i = 0; i < str.length; i++) { h = ((h << 5) - h + str.charCodeAt(i)) | 0; }
      return Math.abs(h);
    };
    var pad2 = function (n) { return (n < 10 ? "0" : "") + n; };
    var applyTrack = function (raw) {
      var val = (raw || "").trim();
      if (val.length < 4) {
        if (trackErr) { trackErr.hidden = false; }
        if (trackResult) { trackResult.hidden = true; }
        return false;
      }
      if (trackErr) { trackErr.hidden = true; }
      var ref = val.toUpperCase();
      if (ref.indexOf(TRACK_PREFIX) !== 0) { ref = TRACK_PREFIX + "-" + ref.replace(/[^A-Z0-9]/g, "").slice(0, 9); }
      var h = hashStr(ref);
      var active = h % steps.length;            /* 0..len-1 current step */
      var baseH = 8 + (h % 9);                   /* base hour for timeline */
      steps.forEach(function (step, i) {
        step.classList.remove("done", "current", "pending");
        var timeEl = $(".tl-time", step);
        if (i < active) {
          step.classList.add("done");
          if (timeEl) { timeEl.textContent = "Today " + pad2(baseH + i) + ":" + pad2((h + i * 13) % 60); }
        } else if (i === active) {
          step.classList.add("current");
          if (timeEl) { timeEl.textContent = "Today " + pad2(baseH + i) + ":" + pad2((h + i * 13) % 60) + " · in progress"; }
        } else {
          step.classList.add("pending");
          if (timeEl) { timeEl.textContent = "Estimated " + pad2((baseH + i) % 24) + ":00"; }
        }
      });
      if (trackRefEl) { trackRefEl.textContent = ref; }
      var stateEl = $("[data-track-state]", trackBox);
      var labels = steps.map(function (s) { var tt = $(".tl-title", s); return tt ? tt.textContent : ""; });
      if (stateEl) { stateEl.textContent = labels[active] || "In transit"; }
      if (trackEtaEl) {
        var etaH = (baseH + steps.length) % 24;
        trackEtaEl.textContent = active >= steps.length - 1 ? "Delivered" : ("ETA today " + pad2(etaH) + ":00");
      }
      if (trackResult) { trackResult.hidden = false; }
      return true;
    };
    var trackForm = $("[data-track-form]", trackBox) || trackBox.querySelector("form");
    if (trackForm) {
      trackForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = applyTrack(trackInput ? trackInput.value : "");
        if (ok && trackResult && !reduceMotion) { trackResult.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
      });
    }
    var sampleBtn = $("[data-track-sample]", trackBox);
    if (sampleBtn && trackInput) {
      sampleBtn.addEventListener("click", function () {
        trackInput.value = TRACK_PREFIX + "-7" + (Math.floor(Math.random() * 9000) + 1000);
        applyTrack(trackInput.value);
      });
    }
  }

  /* ----- Quote / booking widget (instant estimate) ----- */
  function money(n) {
    var rounded = Math.round(n);
    var s = String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (rounded < 0 ? "-" : "") + "$" + s;
  }
  var quoteBox = $("[data-quote]");
  if (quoteBox) {
    var qOrigin = $("[data-q-origin]", quoteBox);
    var qDest = $("[data-q-dest]", quoteBox);
    var qType = $("[data-q-type]", quoteBox);
    var qWeight = $("[data-q-weight]", quoteBox);
    var qSpeed = $("[data-q-speed]", quoteBox);
    var qStatus = $("[data-q-status]", quoteBox);
    var qResult = $("[data-q-result]", quoteBox);
    var qEmpty = $("[data-q-empty]", quoteBox);
    var qAmount = $("[data-q-amount]", quoteBox);
    var qBase = $("[data-q-base]", quoteBox);
    var qHandling = $("[data-q-handling]", quoteBox);
    var qSpeedRow = $("[data-q-speedfee]", quoteBox);
    var qEta = $("[data-q-eta]", quoteBox);
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var validateQ = function (input) {
      if (!input) { return true; }
      var field = input.closest(".f-field");
      var err = field ? field.querySelector(".field-err") : null;
      var val = (input.value || "").trim();
      var good = true;
      var rule = input.getAttribute("data-req");
      if (rule === "sel") { good = val.length > 0 && val.indexOf("Choose") === -1 && val.indexOf("Select") === -1; }
      else if (rule === "email") { good = emailRe.test(val); }
      else if (rule) { good = val.length >= parseInt(rule, 10); }
      if (field) { field.classList.toggle("bad", !good); }
      if (err) { err.hidden = good; }
      return good;
    };
    var qWatched = $all("[data-req]", quoteBox);
    qWatched.forEach(function (input) {
      input.addEventListener("input", function () {
        var f = input.closest(".f-field");
        if (f && f.classList.contains("bad")) { validateQ(input); }
      });
      input.addEventListener("blur", function () { if ((input.value || "").trim().length) { validateQ(input); } });
    });
    var computeQuote = function () {
      var typeMul = qType ? (parseFloat(qType.options[qType.selectedIndex].getAttribute("data-mul") || "1")) : 1;
      var weight = qWeight ? Math.max(parseFloat(qWeight.value) || 0, 0) : 0;
      var speedFee = qSpeed ? (parseFloat(qSpeed.options[qSpeed.selectedIndex].getAttribute("data-fee") || "0")) : 0;
      var speedEta = qSpeed ? (qSpeed.options[qSpeed.selectedIndex].getAttribute("data-eta") || "2–3 days") : "2–3 days";
      var base = 9 + weight * 1.4 * typeMul;
      var handling = base * 0.18;
      var total = base + handling + speedFee;
      if (qBase) { qBase.textContent = money(base); }
      if (qHandling) { qHandling.textContent = money(handling); }
      if (qSpeedRow) { qSpeedRow.textContent = money(speedFee); }
      if (qAmount) { qAmount.textContent = money(total); }
      if (qEta) { qEta.textContent = speedEta; }
    };
    [qType, qWeight, qSpeed].forEach(function (el) {
      if (el) { el.addEventListener("input", computeQuote); el.addEventListener("change", computeQuote); }
    });
    quoteBox.addEventListener("submit", function (e) {
      e.preventDefault();
      var allGood = true, firstBad = null;
      qWatched.forEach(function (input) {
        var ok = validateQ(input);
        if (!ok && !firstBad) { firstBad = input; }
        allGood = allGood && ok;
      });
      if (!allGood) {
        if (qStatus) { qStatus.textContent = "Please complete the highlighted fields to get your estimate."; qStatus.classList.remove("ok"); qStatus.classList.add("bad"); }
        if (firstBad) { firstBad.focus(); }
        return;
      }
      computeQuote();
      if (qEmpty) { qEmpty.hidden = true; }
      if (qResult) { qResult.hidden = false; }
      var oTxt = qOrigin ? (qOrigin.value || "origin").trim() : "origin";
      var dTxt = qDest ? (qDest.value || "destination").trim() : "destination";
      if (qStatus) { qStatus.textContent = "Instant estimate ready for " + oTxt + " → " + dTxt + ". Request it below to confirm."; qStatus.classList.remove("bad"); qStatus.classList.add("ok"); }
      if (qResult && !reduceMotion) { qResult.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
    });
    computeQuote();
  }

  /* ----- Form validation (contact / enquiry) ----- */
  function wireForm(form) {
    if (!form) { return; }
    var statusEl = $("[data-form-status]", form);
    var emailRe2 = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var validateField = function (input) {
      var field = input.closest(".f-field");
      var err = field ? field.querySelector(".field-err") : null;
      var rule = input.getAttribute("data-req");
      var opt = input.getAttribute("data-opt");
      var val = input.value.trim();
      var good = true;
      if (rule === "email") { good = emailRe2.test(val); }
      else if (rule === "sel") { good = val.length > 0 && val.indexOf("Choose") === -1 && val.indexOf("Select") === -1; }
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
      input.addEventListener("blur", function () { if (input.value.trim().length) { validateField(input); } });
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
        if (firstBad) { firstBad.focus(); }
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
  $all("[data-contact], [data-enquiry]").forEach(wireForm);

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

  /* ----- Delegated demo-link guard (placeholder links) ----- */
  document.addEventListener("click", function (e) {
    var n = e.target;
    while (n && n.tagName !== "A") { n = n.parentNode; }
    if (!n) { return; }
    if (n.hasAttribute && n.hasAttribute("data-demo-link")) { e.preventDefault(); return; }
    if (n.getAttribute && n.getAttribute("href") === "#") { e.preventDefault(); }
  });

  /* ----- Footer year ----- */
  $all("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ----- Back-to-top ----- */
  var toTop = $("[data-totop]");
  if (toTop) {
    var toTopTick = function () { toTop.classList.toggle("show", window.scrollY > 600); };
    window.addEventListener("scroll", toTopTick, { passive: true });
    toTopTick();
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
  }
})();
