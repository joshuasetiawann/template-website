/* Tidewell Aquafarm — Sustainable Aquaculture | template-07-fishery-aquaculture interactions (vanilla JS, dependency-free, file://-safe) */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var BRAND = "Tidewell Aquafarm";
  var TEMPLATE = "template-07-fishery-aquaculture · Sustainable Aquaculture";
  var MOTIF = "fish";
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
      var node = e.target;
      while (node && node !== navMenu && node.tagName !== "A") { node = node.parentNode; }
      if (node && node.tagName === "A") { closeNav(); }
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
  function formatNum(num, decimals) {
    var str = num.toFixed(decimals);
    var parts = str.split(".");
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
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + formatNum(target * eased, decimals) + suffix;
      if (progress < 1) { window.requestAnimationFrame(tick); }
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

  /* ----- Hero search scrolls to product grid ----- */
  var searchForm = $("[data-searchform]");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var target = document.getElementById("products-grid") || document.getElementById("products") ||
                   document.getElementById("preview") || document.getElementById("main");
      if (target) { target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }
    });
  }

  /* ----- Live product filter (chips) + "Showing N" ----- */
  var listWrap = $("[data-listings]");
  if (listWrap) {
    var chips = $all(".chip[data-filter]", listWrap);
    var cards = $all("[data-cat]", listWrap);
    var countEl = $("[data-count]", listWrap);
    var emptyEl = $("[data-empty]", listWrap);
    var applyFilter = function (chip) {
      var key = chip.getAttribute("data-filter") || "all";
      var shown = 0;
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-cat") || "").split(" ");
        var ok = (key === "all") || cats.indexOf(key) !== -1;
        card.classList.toggle("hide", !ok);
        if (ok) { shown++; card.classList.add("visible"); }
      });
      if (countEl) { countEl.textContent = "Showing " + shown + " of " + cards.length; }
      if (emptyEl) { emptyEl.hidden = shown > 0; }
    };
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (other) {
          var on = other === chip;
          other.classList.toggle("is-active", on);
          other.setAttribute("aria-pressed", on ? "true" : "false");
        });
        applyFilter(chip);
      });
    });
  }

  /* ----- Sort the product grid ----- */
  (function () {
    var grid = $("[data-listings] .prod-grid") || $("[data-prodgrid]");
    var sortSel = $("[data-listsort]");
    function cardName(card) {
      var el = card.querySelector(".card-title");
      return el ? (el.textContent || "").trim().toLowerCase() : "";
    }
    function cardPrice(card) { return parseFloat(card.getAttribute("data-price") || "0") || 0; }
    function applySort() {
      if (!grid || !sortSel) { return; }
      var mode = sortSel.value;
      var items = Array.prototype.slice.call(grid.children).filter(function (c) {
        return c.nodeType === 1 && c.classList.contains("card");
      });
      items.forEach(function (c, i) { if (c.getAttribute("data-ord") === null) { c.setAttribute("data-ord", String(i)); } });
      items.sort(function (a, b) {
        if (mode === "low") { return cardPrice(a) - cardPrice(b); }
        if (mode === "high") { return cardPrice(b) - cardPrice(a); }
        if (mode === "az") { return cardName(a) < cardName(b) ? -1 : (cardName(a) > cardName(b) ? 1 : 0); }
        return parseInt(a.getAttribute("data-ord") || "0", 10) - parseInt(b.getAttribute("data-ord") || "0", 10);
      });
      items.forEach(function (c) { grid.appendChild(c); });
    }
    if (sortSel && grid) { sortSel.addEventListener("change", applySort); }
  })();

  /* ----- Order / ROI / finance estimator (optional, guarded) ----- */
  function money(num) {
    var rounded = Math.round(num);
    var str = String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (rounded < 0 ? "-" : "") + "$" + str;
  }
  var calcBox = $("[data-calc]");
  if (calcBox) {
    var qtyIn = document.getElementById("calcQty");
    var weeksIn = document.getElementById("calcWeeks");
    var weeksOut = document.getElementById("calcWeeksOut");
    var unitEl = $("[data-calc-unit]", calcBox);
    var totalEl = $("[data-calc-total]", calcBox);
    var saveEl = $("[data-calc-save]", calcBox);
    var barEl = $("[data-calc-bar]", calcBox);
    var unitPrice = parseFloat(calcBox.getAttribute("data-unit") || "20");
    var recalc = function () {
      var qty = Math.min(Math.max(parseInt((qtyIn && qtyIn.value) || "1", 10) || 1, 1), 20);
      var weeks = Math.min(Math.max(parseInt((weeksIn && weeksIn.value) || "12", 10) || 1, 1), 52);
      var gross = unitPrice * qty * weeks;
      var save = gross * 0.1;
      if (weeksOut) { weeksOut.textContent = weeks + " wk" + (weeks === 1 ? "" : "s"); }
      if (unitEl) { unitEl.textContent = money(unitPrice * qty) + "/wk"; }
      if (totalEl) { totalEl.textContent = money(gross - save); }
      if (saveEl) { saveEl.textContent = money(save); }
      if (barEl) { barEl.style.width = Math.max(8, Math.min(100, Math.round(weeks / 52 * 100))) + "%"; }
    };
    [qtyIn, weeksIn].forEach(function (input) {
      if (input) { input.addEventListener("input", recalc); input.addEventListener("change", recalc); }
    });
    recalc();
  }

  /* ----- Form validation (enquiry / wholesale / contact) ----- */
  function wireForm(form) {
    if (!form) { return; }
    var statusEl = $("[data-form-status]", form);
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var validateField = function (input) {
      var field = input.closest(".f-field");
      var err = field ? field.querySelector(".field-err") : null;
      var rule = input.getAttribute("data-req");
      var opt = input.getAttribute("data-opt");
      var val = input.value.trim();
      var good = true;
      if (rule === "email") { good = emailRe.test(val); }
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
        var field = input.closest(".f-field");
        if (field && field.classList.contains("bad")) { validateField(input); }
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
      var okMsg = form.getAttribute("data-ok") || ("Thanks — we've received your details and will be in touch shortly.");
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
  $all("[data-enquiry], [data-wholesale], [data-contact]").forEach(wireForm);

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

  /* ----- Add-to-order / subscribe toast ----- */
  var toast = $("[data-toast]");
  if (toast) {
    var toastTimer = null;
    var showToast = function (msg) {
      var label = $("[data-toast-msg]", toast);
      if (label && msg) { label.textContent = msg; }
      toast.classList.add("show");
      if (toastTimer) { window.clearTimeout(toastTimer); }
      toastTimer = window.setTimeout(function () { toast.classList.remove("show"); }, 2400);
    };
    $all("[data-order-add]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.getAttribute("data-order-add") || "Item";
        showToast(name + " added to your order");
      });
    });
  }

  /* ----- Delegated placeholder-link guard (single handler) ----- */
  document.addEventListener("click", function (e) {
    var node = e.target;
    while (node && node.tagName !== "A") { node = node.parentNode; }
    if (node && node.getAttribute && node.getAttribute("href") === "#") { e.preventDefault(); }
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

  /* signature 7: template-07-fishery-aquaculture · Sustainable Aquaculture */
  if (window.console && false) { console.log(BRAND, TEMPLATE, MOTIF); }
})();
