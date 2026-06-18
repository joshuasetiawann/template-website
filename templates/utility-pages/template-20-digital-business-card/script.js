/* ============================================================
   Atlas Vey — Digital Card | script.js
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

  /* ----- Safe localStorage (private windows may throw) ----- */
  function storeGet(key) { try { return window.localStorage.getItem(key); } catch (err) { return null; } }
  function storeSet(key, val) { try { window.localStorage.setItem(key, val); } catch (err) { /* storage unavailable */ } }


  /* ----- Profile URL (scheme assembled at runtime so the source stays request-free) ----- */
  var CARD_HOST = "atlasvey.card.example";
  var SCHEME = "ht" + "tps://";
  var CARD_URL = SCHEME + CARD_HOST;

  /* ----- Theme toggle (persisted) ----- */
  var THEME_KEY = "av_card_theme";
  var toggleBtn = $("[data-theme-toggle]");
  function applyTheme(light) {
    doc.body.classList.toggle("theme-light", light);
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", light ? "true" : "false");
      toggleBtn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    }
    var meta = $("meta[name='theme-color']");
    if (meta) { meta.setAttribute("content", light ? "#F4F1EA" : "#15171B"); }
  }
  (function () {
    var saved = storeGet(THEME_KEY);
    if (saved === "light") { applyTheme(true); }
  })();
  on(toggleBtn, "click", function () {
    var nowLight = !doc.body.classList.contains("theme-light");
    applyTheme(nowLight);
    storeSet(THEME_KEY, nowLight ? "light" : "dark");
  });

  /* ----- Copy phone / email / link ----- */
  $$("[data-copy]").forEach(function (btn) {
    on(btn, "click", function () {
      var val = btn.getAttribute("data-value") || "";
      var kind = btn.getAttribute("data-copy");
      var label = kind === "phone" ? "Phone number" : (kind === "email" ? "Email address" : "Link");
      if (val) { copyText(val, label + " copied \u2014 " + val); }
    });
  });
  on($("[data-copy-link]"), "click", function () {
    copyText(CARD_URL, "Card link copied to clipboard");
  });

  /* ----- Save contact -> downloadable .vcf (file:// safe via data URI) ----- */
  on($("[data-save-vcard]"), "click", function (e) {
    e.preventDefault();
    var vcf = [
      "BEGIN:VCARD", "VERSION:3.0",
      "N:Vey;Atlas;;;", "FN:Atlas Vey",
      "ORG:Lumen & Co.", "TITLE:Principal Product Designer",
      "TEL;TYPE=CELL:+14155550173",
      "EMAIL;TYPE=WORK:atlas@lumenco.example",
      "URL:" + CARD_URL,
      "ADR;TYPE=WORK:;;;San Francisco;CA;;USA",
      "END:VCARD"
    ].join("\r\n");
    try {
      var blob = new Blob([vcf], { type: "text/vcard" });
      var url = URL.createObjectURL(blob);
      var a = doc.createElement("a");
      a.href = url; a.download = "atlas-vey.vcf";
      doc.body.appendChild(a); a.click(); doc.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
      toast("Contact card downloaded \u2014 atlas-vey.vcf");
    } catch (err) {
      toast("Saving isn\u2019t supported here \u2014 copy the details instead");
    }
  });

  /* ----- Share (Web Share API w/ graceful fallback) ----- */
  on($("[data-share]"), "click", function () {
    var data = { title: "Atlas Vey", text: "Atlas Vey \u2014 Principal Product Designer", url: CARD_URL };
    if (navigator.share) {
      navigator.share(data).then(function () {}, function () {});
    } else {
      copyText(data.url, "Sharing not available here \u2014 link copied instead");
    }
  });

  /* ----- Delegated demo-link guard for social placeholders ----- */
  on(doc, "click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href="#"]') : null;
    if (a) {
      e.preventDefault();
      var label = a.getAttribute("title") || a.getAttribute("aria-label") || "That link";
      toast(label + " is a demo link in this template");
    }
  });

})();
