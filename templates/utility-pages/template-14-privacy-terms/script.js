/* ============================================================
   Marrow & Vale — Privacy & Terms | script.js
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

  /* ----- Safe localStorage (private windows may throw) ----- */
  function storeGet(key) { try { return window.localStorage.getItem(key); } catch (err) { return null; } }
  function storeSet(key, val) { try { window.localStorage.setItem(key, val); } catch (err) { /* storage unavailable */ } }

  /* ----- Back to top ----- */
  var toTop = $("[data-totop]");
  if (toTop) {
    var onTopScroll = function () { toTop.classList.toggle("show", window.scrollY > 480); };
    window.addEventListener("scroll", onTopScroll, { passive: true });
    onTopScroll();
    on(toTop, "click", function () { window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }); });
  }


  /* ----- Scrollspy: highlight the TOC entry for the section in view ----- */
  var sections = $$(".doc-sec[id]");
  var tocLinks = $$("[data-toc]");
  var linkFor = {};
  tocLinks.forEach(function (a) { linkFor[a.getAttribute("data-toc")] = a; });

  function setCurrent(id) {
    tocLinks.forEach(function (a) {
      var on = a.getAttribute("data-toc") === id;
      if (on) { a.setAttribute("aria-current", "true"); }
      else { a.removeAttribute("aria-current"); }
    });
  }

  var spyObserver = null;
  if ("IntersectionObserver" in window && sections.length) {
    var visible = {};
    spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        visible[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0;
      });
      var bestId = null, best = -1;
      Object.keys(visible).forEach(function (id) {
        if (visible[id] > best) { best = visible[id]; bestId = id; }
      });
      if (bestId && best > 0 && linkFor[bestId]) { setCurrent(bestId); }
    }, { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.6, 1] });
    sections.forEach(function (s) { spyObserver.observe(s); });
  } else {
    // fallback: scroll handler
    var spyScroll = function () {
      var top = window.scrollY + window.innerHeight * 0.3;
      var cur = sections[0] ? sections[0].id : null;
      sections.forEach(function (s) { if (s.offsetTop <= top) { cur = s.id; } });
      if (cur) { setCurrent(cur); }
    };
    window.addEventListener("scroll", spyScroll, { passive: true });
    spyScroll();
  }

  /* ----- Smooth-focus TOC links (move focus to the section for a11y) ----- */
  tocLinks.forEach(function (a) {
    on(a, "click", function (e) {
      var id = a.getAttribute("href").slice(1);
      var sec = doc.getElementById(id);
      if (!sec) { return; }
      e.preventDefault();
      sec.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      setCurrent(id);
      window.setTimeout(function () { try { sec.focus({ preventScroll: true }); } catch (err) { sec.focus(); } }, prefersReduced ? 0 : 360);
      if (history.replaceState) { history.replaceState(null, "", "#" + id); }
    });
  });

  /* ----- Reading progress bar ----- */
  var readBar = $("[data-read-bar]");
  var readPct = $("[data-read-pct]");
  function updateRead() {
    var docEl = doc.documentElement;
    var scrollable = docEl.scrollHeight - window.innerHeight;
    var pct = scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 100;
    if (readBar) { readBar.style.width = pct + "%"; }
    if (readPct) { readPct.textContent = String(Math.round(pct)); }
  }
  window.addEventListener("scroll", updateRead, { passive: true });
  window.addEventListener("resize", updateRead);
  updateRead();

  /* ----- Print ----- */
  on($("[data-print]"), "click", function () { window.print(); });

  /* ----- Cookie consent banner (localStorage, try/catch) ----- */
  var cookieBar = $("[data-cookie]");
  var COOKIE_KEY = "mv_cookie_consent";
  if (cookieBar) {
    var saved = storeGet(COOKIE_KEY);
    if (!saved) {
      window.setTimeout(function () { cookieBar.hidden = false; }, 600);
    }
    var dismiss = function (choice) {
      storeSet(COOKIE_KEY, choice);
      cookieBar.hidden = true;
    };
    on($("[data-cookie-accept]"), "click", function () { dismiss("all"); });
    on($("[data-cookie-essential]"), "click", function () { dismiss("essential"); });
  }

})();
