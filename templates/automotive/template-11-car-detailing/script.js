/* MirrorFinish Detailing — Car Detailing Studio | template-11-car-detailing interactions (vanilla JS, dependency-free, file://-safe) */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var BRAND = "MirrorFinish Detailing";
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

  /* ----- Hero search scrolls to grid ----- */
  var searchForm = $("[data-searchform]");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var target = document.getElementById("inventory") || document.getElementById("services") || document.getElementById("shopgrid") || document.getElementById("featured");
      if (target) { target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); }
    });
  }

  /* ----- Live grid filter (chips) ----- */
  var listWrap = $("[data-listings]");
  if (listWrap) {
    var chips = $all(".chip[data-filter]", listWrap);
    var cards = $all("[data-cat]", listWrap);
    var countEl = $("[data-count]", listWrap);
    var emptyEl = $("[data-empty]", listWrap);
    var applyFilter = function (chip) {
      var key = chip.getAttribute("data-filter") || "all";
      var min = chip.hasAttribute("data-min") ? parseFloat(chip.getAttribute("data-min")) : null;
      var max = chip.hasAttribute("data-max") ? parseFloat(chip.getAttribute("data-max")) : null;
      var shown = 0;
      cards.forEach(function (card) {
        var ok;
        if (key === "all") { ok = true; }
        else if (min !== null && max !== null) {
          var price = parseFloat(card.getAttribute("data-price") || "0");
          ok = price >= min && price <= max;
        } else {
          var cats = (card.getAttribute("data-cat") || "").split(" ");
          ok = cats.indexOf(key) !== -1;
        }
        card.classList.toggle("hide", !ok);
        if (ok) { shown++; card.classList.add("visible"); }
      });
      if (countEl) { countEl.textContent = "Showing " + shown + " of " + cards.length; }
      if (emptyEl) { emptyEl.hidden = shown > 0; }
    };
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) {
          var on = c === chip;
          c.classList.toggle("is-active", on);
          c.setAttribute("aria-pressed", on ? "true" : "false");
        });
        applyFilter(chip);
      });
    });
  }

  /* ----- Sort ----- */
  (function () {
    var grid = document.querySelector("[data-listings] .listing-grid") || document.querySelector("[data-shopgrid]");
    var sortSel = document.querySelector("[data-listsort]");
    function cardName(card) {
      var a = card.querySelector(".card-title a, .card-title, h3 a, h3, .prod-name");
      return a ? (a.textContent || "").trim().toLowerCase() : "";
    }
    function cardPrice(card) { return parseFloat(card.getAttribute("data-price") || "0") || 0; }
    function applySort() {
      if (!grid || !sortSel) { return; }
      var mode = sortSel.value;
      var cards = Array.prototype.slice.call(grid.children).filter(function (c) {
        return c.nodeType === 1 && (c.classList.contains("card") || c.classList.contains("prod-card"));
      });
      cards.forEach(function (c, i) { if (c.getAttribute("data-ord") === null) { c.setAttribute("data-ord", String(i)); } });
      cards.sort(function (a, b) {
        if (mode === "low") { return cardPrice(a) - cardPrice(b); }
        if (mode === "high") { return cardPrice(b) - cardPrice(a); }
        if (mode === "az") { return cardName(a) < cardName(b) ? -1 : (cardName(a) > cardName(b) ? 1 : 0); }
        return parseInt(a.getAttribute("data-ord") || "0", 10) - parseInt(b.getAttribute("data-ord") || "0", 10);
      });
      cards.forEach(function (c) { grid.appendChild(c); });
    }
    if (sortSel && grid) { sortSel.addEventListener("change", applySort); }
  })();

  /* ----- Finance / rate calculator ----- */
  function money(n) {
    var rounded = Math.round(n);
    var s = String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (rounded < 0 ? "-" : "") + "$" + s;
  }
  var calcBox = $("[data-calc]");
  if (calcBox) {
    var priceIn = document.getElementById("calcPrice");
    var dpIn = document.getElementById("calcDp");
    var yearsIn = document.getElementById("calcYears");
    var rateIn = document.getElementById("calcRate");
    var dpOut = document.getElementById("calcDpOut");
    var yearsOut = document.getElementById("calcYearsOut");
    var monthlyEl = $("[data-calc-monthly]", calcBox);
    var loanEl = $("[data-calc-loan]", calcBox);
    var downEl = $("[data-calc-down]", calcBox);
    var interestEl = $("[data-calc-interest]", calcBox);
    var barEl = $("[data-calc-bar]", calcBox);
    var recalc = function () {
      if (!priceIn || !dpIn || !yearsIn || !rateIn) { return; }
      var price = parseFloat(priceIn.value); if (!isFinite(price) || price < 0) { price = 0; }
      var dp = Math.min(Math.max(parseFloat(dpIn.value) || 0, 0), 95);
      var years = Math.min(Math.max(parseFloat(yearsIn.value) || 1, 1), 12);
      var rate = Math.min(Math.max(parseFloat(rateIn.value) || 0, 0), 40);
      var down = price * dp / 100;
      var principal = price - down;
      var n = years * 12;
      var r = rate / 100 / 12;
      var monthly = r > 0 ? principal * r / (1 - Math.pow(1 + r, -n)) : principal / n;
      var totalPaid = monthly * n;
      var interest = Math.max(totalPaid - principal, 0);
      if (dpOut) { dpOut.textContent = dp + "%"; }
      if (yearsOut) { yearsOut.textContent = years + " yr" + (years === 1 ? "" : "s"); }
      if (monthlyEl) { monthlyEl.textContent = money(monthly) + "/mo"; }
      if (loanEl) { loanEl.textContent = money(principal); }
      if (downEl) { downEl.textContent = money(down); }
      if (interestEl) { interestEl.textContent = money(interest); }
      if (barEl && totalPaid > 0) { barEl.style.width = Math.max(6, Math.round(principal / totalPaid * 100)) + "%"; }
    };
    [priceIn, dpIn, yearsIn, rateIn].forEach(function (input) {
      if (input) { input.addEventListener("input", recalc); input.addEventListener("change", recalc); }
    });
    window.dispatchCalc = function () { recalc(); };
    recalc();
  }

  /* ----- Form validation (enquiry / booking / contact) ----- */
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
  $all("[data-enquiry], [data-book], [data-contact]").forEach(wireForm);

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

  /* ----- Add-to-quote toast (parts shop) ----- */
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
    $all("[data-quote-add]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.getAttribute("data-quote-add") || "Item";
        showToast(name + " added to your quote");
      });
    });
  }

  /* ----- Gallery thumb swap + ?p= hydration (vehicle detail) ----- */
  var galMain = $("[data-gallery-main]");
  var galThumbs = $all("[data-thumb]");
  var vData = (typeof window.__VEH__ !== "undefined") ? window.__VEH__ : null;
  var galGrads = ["g1","g2","g3","g4","g5","g6","g7","g8"];

  function getParam(name) {
    var q = window.location.search;
    if (!q || q.charAt(0) !== "?") { return null; }
    var pairs = q.slice(1).split("&");
    for (var i = 0; i < pairs.length; i++) {
      var kv = pairs[i].split("=");
      if (decodeURIComponent(kv[0]) === name) { return decodeURIComponent(kv[1] || ""); }
    }
    return null;
  }
  function swapMainGrad(grad) {
    if (!galMain || !grad) { return; }
    galGrads.forEach(function (k) { galMain.classList.remove(k); });
    galMain.classList.add(grad);
  }
  if (galMain && galThumbs.length) {
    galThumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        galThumbs.forEach(function (tt) { tt.classList.remove("is-active"); tt.removeAttribute("aria-current"); });
        thumb.classList.add("is-active");
        thumb.setAttribute("aria-current", "true");
        var g = thumb.className.split(/\s+/).filter(function (c) { return /^g\d+$/.test(c); });
        if (g.length) { swapMainGrad(g[0]); }
      });
    });
  }
  function setText(sel, value) { var el = $(sel); if (el && value != null) { el.textContent = value; } }

  if (vData && vData.length) {
    var idx = parseInt(getParam("p"), 10);
    if (isNaN(idx) || idx < 0 || idx >= vData.length) { idx = 0; }
    var item = vData[idx];
    if (document.title.indexOf(item.name) === -1) { document.title = item.name + " — " + BRAND; }
    setText("[data-v-name]", item.name);
    setText("[data-v-crumb]", item.name);
    setText("[data-v-price]", item.price);
    setText("[data-v-per]", item.per || "");
    setText("[data-v-maptag]", item.loc);
    var badgeEl = $("[data-v-badge]");
    if (badgeEl) { badgeEl.textContent = item.badge; badgeEl.className = "pg-badge " + (item.bcls || "b-a"); }
    var subEl = $("[data-v-sub]");
    if (subEl) { subEl.textContent = (item.year ? item.year + " · " : "") + item.body + " · " + item.fuel; }

    if (galMain && item.g) {
      swapMainGrad(item.g);
      var pool = [item.g];
      for (var gi = 0; gi < galGrads.length && pool.length < galThumbs.length; gi++) {
        var cand = galGrads[(gi + idx) % galGrads.length];
        if (pool.indexOf(cand) === -1) { pool.push(cand); }
      }
      galThumbs.forEach(function (thumb, ti) {
        var keep = thumb.className.split(/\s+/).filter(function (c) { return !/^g\d+$/.test(c); });
        thumb.className = keep.join(" ") + " " + (pool[ti] || galGrads[ti % galGrads.length]);
      });
    }
    /* specs */
    if (item.specs) {
      var specEls = $all("[data-specrow] [data-spec]");
      specEls.forEach(function (el, i) { if (item.specs[i] && item.specs[i][1] != null) { el.textContent = item.specs[i][1]; } });
      var specKeys = $all("[data-specrow] [data-speck]");
      specKeys.forEach(function (el, i) { if (item.specs[i] && item.specs[i][0] != null) { el.textContent = item.specs[i][0]; } });
    }
    /* description */
    if (item.desc) {
      var descWrap = $("[data-v-desc]");
      if (descWrap) {
        descWrap.innerHTML = "";
        String(item.desc).split("||").forEach(function (p) {
          var node = document.createElement("p"); node.textContent = p.trim(); descWrap.appendChild(node);
        });
      }
    }
    /* features */
    if (item.feats) {
      var featWrap = $("[data-v-feats]");
      if (featWrap) {
        featWrap.innerHTML = "";
        item.feats.forEach(function (a) {
          var li = document.createElement("li");
          li.appendChild(makeTick());
          var span = document.createElement("span"); span.textContent = a; li.appendChild(span);
          featWrap.appendChild(li);
        });
      }
    }
    /* feed price into calculator if in range */
    if (calcBox && item.pricev) {
      var cp = document.getElementById("calcPrice");
      if (cp) {
        var cmin = parseFloat(cp.getAttribute("min") || "0");
        var cmax = parseFloat(cp.getAttribute("max") || "Infinity");
        if (item.pricev >= cmin && item.pricev <= cmax) {
          cp.value = item.pricev;
          if (typeof window.dispatchCalc === "function") { window.dispatchCalc(); }
        }
      }
    }
    /* rate block (rental/subscription) */
    if (item.pricev) {
      setText("[data-rate-base]", money(item.pricev));
    }
    /* similar cards: rewire to neighbouring indices */
    var simCards = $all("[data-sim]");
    simCards.forEach(function (card, k) {
      var j = (idx + k + 1) % vData.length;
      var s = vData[j];
      card.setAttribute("href", "vehicle.html?p=" + j);
      var tt = $(".sim-title", card); if (tt) { tt.textContent = s.name; }
      var pr = $(".sim-price", card); if (pr) { pr.textContent = s.price + (s.per || ""); }
      var lc = $(".sim-loc i", card); if (lc) { lc.textContent = s.body + " · " + s.fuel; }
      var md = $(".sim-media", card);
      if (md) { galGrads.forEach(function (gg) { md.classList.remove(gg); }); md.classList.add(s.g); }
      var bd = $(".sim-badge", card); if (bd) { bd.textContent = s.badge; bd.className = "sim-badge " + (s.bcls || "b-a"); }
    });
  }

  function money2(n) { return money(n); }
  function makeTick() {
    var ns = "http://www.w3.org/2000/svg";
    var svgEl = document.createElementNS(ns, "svg");
    svgEl.setAttribute("viewBox", "0 0 24 24");
    svgEl.setAttribute("fill", "none");
    svgEl.setAttribute("stroke", "currentColor");
    svgEl.setAttribute("stroke-width", "2.3");
    svgEl.setAttribute("stroke-linecap", "round");
    svgEl.setAttribute("stroke-linejoin", "round");
    svgEl.setAttribute("aria-hidden", "true");
    var path = document.createElementNS(ns, "path");
    path.setAttribute("d", "M4.5 12.5l5 5 10-11");
    svgEl.appendChild(path);
    return svgEl;
  }

  /* ----- Delegated placeholder-link guard ----- */
  document.addEventListener("click", function (e) {
    var n = e.target;
    while (n && n.tagName !== "A") { n = n.parentNode; }
    if (n && n.getAttribute && n.getAttribute("href") === "#") { e.preventDefault(); }
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
