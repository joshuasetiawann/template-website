/* ============================================================
   Cobalt & Quill — Invoice | script.js
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


  /* ----- Copy invoice number ----- */
  var invNumEl = $("[data-inv-number]");
  var invNumber = invNumEl ? invNumEl.textContent.trim() : "";
  on($("[data-copy-inv]"), "click", function () {
    if (!invNumber) { return; }
    copyText(invNumber, "Invoice " + invNumber + " copied to clipboard");
  });

  /* ----- Print ----- */
  on($("[data-print]"), "click", function () { window.print(); });

  /* ----- Keep the two "balance due" figures in sync (defensive) ----- */
  var dueMain = $("[data-amount-due]");
  var dueMirror = $("[data-due-mirror]");
  if (dueMain && dueMirror && dueMirror.textContent !== dueMain.textContent) {
    dueMirror.textContent = dueMain.textContent;
  }

  /* ----- Ctrl/Cmd+P routed through our handler (harmless enhancement) ----- */
  on(document, "keydown", function (e) {
    var key = (e.key || "").toLowerCase();
    if ((e.ctrlKey || e.metaKey) && key === "p") {
      // let the native dialog open; nothing to block, just ensure layout is print-ready
    }
  });

})();
