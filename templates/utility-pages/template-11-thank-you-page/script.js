/* ============================================================
   Mintcrate — Thank You | script.js
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

  /* ----- Toast ----- */
  var toastEl = $("[data-toast]");
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) { return; }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    if (toastTimer) { clearTimeout(toastTimer); }
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2400);
  }

  /* ----- Clipboard with legacy fallback ----- */
  function legacyCopy(text) {
    var ta = doc.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    doc.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = doc.execCommand("copy"); } catch (err) { ok = false; }
    doc.body.removeChild(ta);
    return ok;
  }
  function copyText(text, okMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { toast(okMsg); },
        function () { toast(legacyCopy(text) ? okMsg : "Copy blocked — select the text manually"); }
      );
    } else {
      toast(legacyCopy(text) ? okMsg : "Copy blocked — select the text manually");
    }
  }


  /* ----- Copy order id ----- */
  var orderIdEl = $("[data-order-id]");
  on($("[data-copy-order]"), "click", function () {
    var id = orderIdEl ? orderIdEl.textContent.trim() : "";
    if (id) { copyText(id, "Order number " + id + " copied"); }
  });

  /* ----- Lightweight confetti burst (reduced-motion safe) ----- */
  var layer = $("[data-confetti]");
  if (layer && !prefersReduced) {
    var COLORS = ["#22C55E", "#86EFAC", "#FDE68A", "#EAB308", "#6EE7B7", "#BBF7D0", "#F0ABFC"];
    var COUNT = 80;
    var frag = doc.createDocumentFragment();
    for (var i = 0; i < COUNT; i += 1) {
      var p = doc.createElement("span");
      var kind = i % 3;
      p.className = "confetti-piece" + (kind === 1 ? " round" : kind === 2 ? " strip" : "");
      p.style.left = (Math.random() * 100) + "vw";
      p.style.background = COLORS[i % COLORS.length];
      p.style.animationDuration = (2.6 + Math.random() * 2.4) + "s";
      p.style.animationDelay = (Math.random() * 0.9) + "s";
      p.style.setProperty("--driftX", (Math.random() * 160 - 80) + "px");
      p.style.setProperty("--spin", (360 + Math.random() * 540) + "deg");
      frag.appendChild(p);
    }
    layer.appendChild(frag);
    window.setTimeout(function () {
      if (layer.parentNode) { layer.innerHTML = ""; }
    }, 6500);
  }

})();
