/* ============================================================
   Pagefinch — 404 Not Found | script.js
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


  /* ----- Rescue search: live-filter the link grid + highlight matches ----- */
  var searchForm = $("[data-util='rescue-search']");
  var input = $("#rescueInput");
  var clearBtn = $("[data-clear]");
  var cards = $$(".link-card");
  var counter = $("[data-count]");
  var empty = $("[data-empty]");
  var emptyQ = $("[data-q]");
  var total = cards.length;

  function unmark(card) {
    $$("mark", card).forEach(function (m) {
      var parent = m.parentNode;
      if (!parent) { return; }
      parent.replaceChild(doc.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }

  function markIn(el, q) {
    var text = el.textContent;
    var idx = text.toLowerCase().indexOf(q);
    if (idx === -1) { return; }
    var frag = doc.createDocumentFragment();
    frag.appendChild(doc.createTextNode(text.slice(0, idx)));
    var m = doc.createElement("mark");
    m.textContent = text.slice(idx, idx + q.length);
    frag.appendChild(m);
    frag.appendChild(doc.createTextNode(text.slice(idx + q.length)));
    el.textContent = "";
    el.appendChild(frag);
  }

  function applyFilter() {
    if (!input) { return; }
    var q = input.value.trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      unmark(card);
      var tags = (card.getAttribute("data-tags") || "").toLowerCase();
      var copy = card.textContent.toLowerCase();
      var hit = !q || tags.indexOf(q) !== -1 || copy.indexOf(q) !== -1;
      card.classList.toggle("hide", !hit);
      if (hit) {
        shown += 1;
        if (q) {
          var strong = $("strong", card);
          var em = $("em", card);
          if (strong) { markIn(strong, q); }
          if (em) { markIn(em, q); }
        }
      }
    });
    if (clearBtn) { clearBtn.hidden = !q; }
    if (counter) {
      counter.textContent = q
        ? "Showing " + shown + " of " + total + " destinations for \u201C" + input.value.trim() + "\u201D"
        : "Showing all " + total + " destinations";
    }
    if (empty) {
      empty.hidden = shown !== 0;
      if (emptyQ) { emptyQ.textContent = input.value.trim(); }
    }
  }

  if (searchForm && input) {
    on(searchForm, "submit", function (e) { e.preventDefault(); applyFilter(); });
    on(input, "input", applyFilter);
    on(clearBtn, "click", function () {
      input.value = "";
      applyFilter();
      input.focus();
    });
  }

})();
