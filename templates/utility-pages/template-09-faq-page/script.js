/* ============================================================
   Willowbox — FAQ | script.js
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

  /* ----- Back to top ----- */
  var toTop = $("[data-totop]");
  if (toTop) {
    var onTopScroll = function () { toTop.classList.toggle("show", window.scrollY > 480); };
    window.addEventListener("scroll", onTopScroll, { passive: true });
    onTopScroll();
    on(toTop, "click", function () { window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" }); });
  }


  /* ----- FAQ: accordion + live search with highlight + category chips ----- */
  var items = $$(".faq-item");
  var searchForm = $("[data-util='faq-search']");
  var input = $("#faqSearch");
  var clearBtn = $("[data-clear]");
  var chips = $$(".chip");
  var resultNote = $("[data-result]");
  var emptyBox = $("[data-empty]");
  var emptyQ = $("[data-q]");
  var activeCat = "all";

  /* store original strings once so highlights never compound */
  items.forEach(function (item) {
    var q = $(".q-text", item);
    var a = $(".a-text", item);
    if (q) { q.setAttribute("data-raw", q.textContent); }
    if (a) { a.setAttribute("data-raw", a.textContent); }
  });

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function highlight(el, query) {
    if (!el) { return false; }
    var raw = el.getAttribute("data-raw") || "";
    if (!query) { el.textContent = raw; return false; }
    var low = raw.toLowerCase();
    var ql = query.toLowerCase();
    var idx = low.indexOf(ql);
    if (idx === -1) { el.textContent = raw; return false; }
    var out = "";
    var from = 0;
    while (idx !== -1) {
      out += escapeHtml(raw.slice(from, idx)) + "<mark>" + escapeHtml(raw.slice(idx, idx + query.length)) + "</mark>";
      from = idx + query.length;
      idx = low.indexOf(ql, from);
    }
    out += escapeHtml(raw.slice(from));
    el.innerHTML = out;
    return true;
  }

  function setOpen(item, open) {
    var btn = $(".faq-q", item);
    var panel = $(".faq-a", item);
    item.classList.toggle("open", open);
    if (btn) { btn.setAttribute("aria-expanded", open ? "true" : "false"); }
    if (panel) { panel.hidden = !open; }
  }

  function applyFilter() {
    var query = input ? input.value.trim() : "";
    var shown = 0;
    items.forEach(function (item) {
      var qEl = $(".q-text", item);
      var aEl = $(".a-text", item);
      var inCat = activeCat === "all" || item.getAttribute("data-cat") === activeCat;
      var qHit = highlight(qEl, query);
      var aHit = highlight(aEl, query);
      var hit = inCat && (!query || qHit || aHit);
      item.classList.toggle("hide", !hit);
      if (hit) {
        shown += 1;
        if (query && aHit && !qHit) { setOpen(item, true); }
      }
    });
    if (clearBtn) { clearBtn.hidden = !query; }
    if (resultNote) {
      var catLabel = activeCat === "all" ? "" : " in \u201C" + activeCat + "\u201D";
      resultNote.textContent = query
        ? "Showing " + shown + " of " + items.length + " questions for \u201C" + query + "\u201D" + catLabel
        : (activeCat === "all" ? "Showing all " + items.length + " questions" : "Showing " + shown + " questions" + catLabel);
    }
    if (emptyBox) {
      emptyBox.hidden = shown !== 0;
      if (emptyQ) { emptyQ.textContent = query || "that filter"; }
    }
  }

  items.forEach(function (item) {
    var btn = $(".faq-q", item);
    on(btn, "click", function () {
      setOpen(item, !item.classList.contains("open"));
    });
  });

  if (searchForm) { on(searchForm, "submit", function (e) { e.preventDefault(); }); }
  on(input, "input", applyFilter);
  on(clearBtn, "click", function () {
    if (input) { input.value = ""; input.focus(); }
    applyFilter();
  });

  chips.forEach(function (chip) {
    on(chip, "click", function () {
      activeCat = chip.getAttribute("data-chip") || "all";
      chips.forEach(function (c) {
        var onChip = c === chip;
        c.classList.toggle("is-on", onChip);
        c.setAttribute("aria-pressed", onChip ? "true" : "false");
      });
      applyFilter();
    });
  });

})();
