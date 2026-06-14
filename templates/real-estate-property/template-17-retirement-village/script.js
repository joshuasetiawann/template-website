/* Willowbrook Village — Retirement Living in the Cotswolds | property-site interactions (vanilla JS, dependency-free) */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var BRAND = "Willowbrook Village";
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ----- Mobile navigation drawer ----- */
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
      var t = e.target;
      while (t && t !== navMenu && t.tagName !== "A") { t = t.parentNode; }
      if (t && t.tagName === "A") { closeNav(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeNav(); }
    });
  }

  /* ----- Header scroll state ----- */
  var header = $(".site-header");
  if (header) {
    var headerTick = function () {
      header.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", headerTick, { passive: true });
    headerTick();
  }

  /* ----- Scrollspy (aria-current via IntersectionObserver) ----- */
  var spyLinks = $all(".nav-links a[href^='#']");
  var spyPairs = [];
  spyLinks.forEach(function (link) {
    var href = link.getAttribute("href");
    var sec = href && href.length > 1 ? document.getElementById(href.slice(1)) : null;
    if (sec) { spyPairs.push({ link: link, sec: sec }); }
  });
  if (spyPairs.length && "IntersectionObserver" in window) {
    var spyObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        spyPairs.forEach(function (p) {
          if (p.sec === entry.target) {
            spyPairs.forEach(function (q) { q.link.removeAttribute("aria-current"); });
            p.link.setAttribute("aria-current", "true");
          }
        });
      });
    }, { rootMargin: "-32% 0px -58% 0px" });
    spyPairs.forEach(function (p) { spyObs.observe(p.sec); });
  }

  /* ----- Staggered scroll-reveal (hidden state applied by JS via html.js) ----- */
  var revealEls = $all(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ----- Live listing filter (type / price-band chips) ----- */
  var listWrap = $("[data-listings]");
  if (listWrap) {
    var chips = $all(".chip[data-filter]", listWrap);
    var cards = $all("[data-cat]", listWrap);
    var countEl = $("[data-count]", listWrap);
    var applyFilter = function (chip) {
      var key = chip.getAttribute("data-filter") || "all";
      var min = chip.hasAttribute("data-min") ? parseFloat(chip.getAttribute("data-min")) : null;
      var max = chip.hasAttribute("data-max") ? parseFloat(chip.getAttribute("data-max")) : null;
      var shown = 0;
      cards.forEach(function (card) {
        var ok;
        if (key === "all") {
          ok = true;
        } else if (min !== null && max !== null) {
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

  /* ----- Hero search scrolls to listings ----- */
  var searchForm = $("[data-searchform]");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var target = document.getElementById("listings");
      if (target) {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    });
  }

  /* ----- Count-up statistics ----- */
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
    if (reduceMotion) {
      el.textContent = prefix + formatNum(target, decimals) + suffix;
      return;
    }
    var duration = 1500;
    var startTime = null;
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
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { countObs.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ----- Enquiry form validation ----- */
  var enqForm = $("[data-enquiry]");
  if (enqForm) {
    var statusEl = $("[data-form-status]", enqForm);
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var validateField = function (input) {
      var field = input.closest(".f-field");
      var err = field ? field.querySelector(".field-err") : null;
      var rule = input.getAttribute("data-req");
      var opt = input.getAttribute("data-opt");
      var val = input.value.trim();
      var good = true;
      if (rule === "email") {
        good = emailRe.test(val);
      } else if (rule) {
        good = val.length >= parseInt(rule, 10);
      } else if (opt === "phone" && val.length) {
        good = val.replace(/\D/g, "").length >= 7;
      }
      if (field) { field.classList.toggle("bad", !good); }
      if (err) { err.hidden = good; }
      return good;
    };
    var watched = $all("[data-req], [data-opt]", enqForm);
    watched.forEach(function (input) {
      input.addEventListener("input", function () {
        if (input.closest(".f-field") && input.closest(".f-field").classList.contains("bad")) {
          validateField(input);
        }
      });
      input.addEventListener("blur", function () {
        if (input.value.trim().length) { validateField(input); }
      });
    });
    enqForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var allGood = true;
      var firstBad = null;
      watched.forEach(function (input) {
        var ok = validateField(input);
        if (!ok && !firstBad) { firstBad = input; }
        allGood = allGood && ok;
      });
      if (!allGood) {
        if (statusEl) {
          statusEl.textContent = "Please fix the highlighted fields and try again.";
          statusEl.classList.remove("ok");
          statusEl.classList.add("bad");
        }
        if (firstBad) { firstBad.focus(); }
        return;
      }
      if (statusEl) {
        statusEl.textContent = "Thanks — your enquiry is in. We'll be in touch shortly.";
        statusEl.classList.remove("bad");
        statusEl.classList.add("ok");
      }
      enqForm.reset();
      var submitBtn = $("button[type='submit']", enqForm);
      if (submitBtn) {
        var label = submitBtn.textContent;
        submitBtn.textContent = "Sent ✓";
        submitBtn.disabled = true;
        window.setTimeout(function () {
          submitBtn.textContent = label;
          submitBtn.disabled = false;
        }, 2600);
      }
    });
  }

  /* ----- Property detail page: gallery + ?p= hydration ----- */
  var galMain = $("[data-gallery-main]");
  var galThumbs = $all("[data-thumb]");
  var propData = (typeof window.__PROP__ !== "undefined") ? window.__PROP__ : null;
  var galGrads = (typeof window.__GAL__ !== "undefined") ? window.__GAL__ : [];

  function getParam(name) {
    var q = window.location.search;
    if (!q || q.charAt(0) !== "?") { return null; }
    var pairs = q.slice(1).split("&");
    for (var i = 0; i < pairs.length; i++) {
      var kv = pairs[i].split("=");
      if (decodeURIComponent(kv[0]) === name) {
        return decodeURIComponent(kv[1] || "");
      }
    }
    return null;
  }

  function swapMainGrad(grad) {
    if (!galMain || !grad) { return; }
    for (var k = 0; k < galGrads.length; k++) {
      galMain.classList.remove(galGrads[k]);
    }
    galMain.classList.add(grad);
  }

  /* gallery thumb swap (works regardless of ?p=) */
  if (galMain && galThumbs.length) {
    galThumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        galThumbs.forEach(function (t) {
          t.classList.remove("is-active");
          t.removeAttribute("aria-current");
        });
        thumb.classList.add("is-active");
        thumb.setAttribute("aria-current", "true");
        var grads = thumb.className.split(/\s+/).filter(function (c) {
          return /^g\d+$/.test(c);
        });
        if (grads.length) { swapMainGrad(grads[0]); }
      });
    });
  }

  function setText(sel, value) {
    var el = $(sel);
    if (el && value != null) { el.textContent = value; }
  }

  /* hydrate detail from ?p= (falls back to index 0 when absent / out of range) */
  if (propData && propData.length) {
    var idx = parseInt(getParam("p"), 10);
    if (isNaN(idx) || idx < 0 || idx >= propData.length) { idx = 0; }
    var item = propData[idx];

    if (document.title.indexOf(item.name) === -1) {
      document.title = item.name + " — " + BRAND;
    }
    setText("[data-prop-name]", item.name);
    setText("[data-prop-crumb]", item.name);
    setText("[data-prop-price]", item.price);
    setText("[data-prop-per]", item.per || "");
    setText("[data-prop-maptag]", item.loc);
    var locEl = $("[data-prop-loc] span");
    if (locEl) { locEl.textContent = item.loc; }
    var badgeEl = $("[data-prop-badge]");
    if (badgeEl) {
      badgeEl.textContent = item.badge;
      badgeEl.className = "pg-badge " + (item.bcls || "b-a");
    }

    /* main + thumbs reflect this listing: thumb[0] = listing gradient, the rest
       distinct alternates so every thumbnail offers a different view to swap to. */
    if (galMain && item.g) {
      swapMainGrad(item.g);
      var pool = [];
      var seed = ["g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8"];
      pool.push(item.g);
      for (var gi = 0; gi < seed.length && pool.length < galThumbs.length; gi++) {
        if (pool.indexOf(seed[(gi + idx) % seed.length]) === -1) {
          pool.push(seed[(gi + idx) % seed.length]);
        }
      }
      galThumbs.forEach(function (thumb, ti) {
        var keep = thumb.className.split(/\s+/).filter(function (c) { return !/^g\d+$/.test(c); });
        thumb.className = keep.join(" ") + " " + (pool[ti] || seed[ti % seed.length]);
      });
    }

    /* fact row */
    var factEls = $all("[data-factrow] [data-fact]");
    if (item.facts) {
      factEls.forEach(function (el, i) {
        if (item.facts[i] && item.facts[i][1] != null) { el.textContent = item.facts[i][1]; }
      });
    }
    /* floor legend mirrors first three facts when present */
    if (item.facts && item.facts.length >= 3) {
      setText("[data-floor-beds]", item.facts[0][1]);
      setText("[data-floor-baths]", item.facts[1][1]);
      setText("[data-floor-area]", item.facts[2][1]);
    }

    /* description */
    if (item.desc) {
      var descWrap = $("[data-prop-desc]");
      if (descWrap) {
        var parts = String(item.desc).split("||");
        descWrap.innerHTML = "";
        parts.forEach(function (p) {
          var node = document.createElement("p");
          node.textContent = p.trim();
          descWrap.appendChild(node);
        });
      }
    }

    /* amenities */
    if (item.amen) {
      var amenWrap = $("[data-prop-amen]");
      if (amenWrap) {
        amenWrap.innerHTML = "";
        item.amen.forEach(function (a) {
          var li = document.createElement("li");
          li.innerHTML = amenWrap.getAttribute("data-tick") || "";
          var span = document.createElement("span");
          span.textContent = a;
          li.appendChild(makeTick());
          li.appendChild(span);
          amenWrap.appendChild(li);
        });
      }
    }

    /* nearby points */
    if (item.nearby) {
      var nearEls = $all("[data-prop-near] [data-near]");
      nearEls.forEach(function (el, i) {
        if (item.nearby[i] && item.nearby[i][1] != null) { el.textContent = item.nearby[i][1]; }
      });
    }

    /* Feed this property's price into the calculator, but only when the listing
       carries a genuine total price within the calculator's own min/max range
       (skips per-unit rates such as $/sqft, leaving a sensible default). */
    if (typeof window.__CALC__ !== "undefined" && window.__CALC__ && item.pricev) {
      var cp = document.getElementById("calcPrice");
      if (cp) {
        var cmin = parseFloat(cp.getAttribute("min") || "0");
        var cmax = parseFloat(cp.getAttribute("max") || "Infinity");
        if (item.pricev >= cmin && item.pricev <= cmax) {
          cp.value = item.pricev;
          if (typeof window.dispatchInput === "function") { window.dispatchInput(cp); }
        }
      }
    }
  }

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

  /* ----- Placeholder links: one delegated guard for a[href="#"] ----- */
  document.addEventListener("click", function (e) {
    var t = e.target;
    while (t && t.tagName !== "A") { t = t.parentNode; }
    if (t && t.getAttribute && t.getAttribute("href") === "#") {
      e.preventDefault();
    }
  });

  /* ----- Footer year ----- */
  $all("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ----- Back-to-top ----- */
  var toTop = $("[data-totop]");
  if (toTop) {
    var toTopTick = function () {
      toTop.classList.toggle("show", window.scrollY > 620);
    };
    window.addEventListener("scroll", toTopTick, { passive: true });
    toTopTick();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }


  /* ----- pgx: listings page sort + empty-state (null-safe, appended) ----- */
  (function () {
    var grid = document.querySelector(".pgx-listings .listing-grid")
            || document.querySelector("[data-listings] .listing-grid");
    var sortSel = document.querySelector("[data-listsort]");
    var emptyNote = document.querySelector("[data-empty]");
    var listWrap = document.querySelector("[data-listings]");

    function cardName(card) {
      var a = card.querySelector(".card-title a, .card-title, h3 a, h3");
      return a ? (a.textContent || "").trim().toLowerCase() : "";
    }
    function cardPrice(card) {
      return parseFloat(card.getAttribute("data-price") || "0") || 0;
    }
    function visibleCards() {
      if (!grid) { return []; }
      return Array.prototype.slice.call(grid.children).filter(function (c) {
        return c.nodeType === 1 && c.classList.contains("card");
      });
    }
    function applySort() {
      if (!grid || !sortSel) { return; }
      var mode = sortSel.value;
      var cards = visibleCards();
      // remember original order once
      cards.forEach(function (c, i) {
        if (c.getAttribute("data-ord") === null) { c.setAttribute("data-ord", String(i)); }
      });
      cards.sort(function (a, b) {
        if (mode === "low") { return cardPrice(a) - cardPrice(b); }
        if (mode === "high") { return cardPrice(b) - cardPrice(a); }
        if (mode === "az") { return cardName(a) < cardName(b) ? -1 : (cardName(a) > cardName(b) ? 1 : 0); }
        return parseInt(a.getAttribute("data-ord") || "0", 10) - parseInt(b.getAttribute("data-ord") || "0", 10);
      });
      cards.forEach(function (c) { grid.appendChild(c); });
    }
    function refreshEmpty() {
      if (!grid || !emptyNote) { return; }
      var anyVisible = visibleCards().some(function (c) { return !c.classList.contains("hide"); });
      emptyNote.hidden = anyVisible;
    }
    if (sortSel && grid) {
      sortSel.addEventListener("change", applySort);
    }
    if (listWrap && emptyNote) {
      // re-check the empty state after any chip click (existing filter runs first)
      var cb = listWrap.querySelector(".chipbar");
      if (cb) {
        cb.addEventListener("click", function () { window.setTimeout(refreshEmpty, 0); });
      }
      refreshEmpty();
    }
  })();

})();
