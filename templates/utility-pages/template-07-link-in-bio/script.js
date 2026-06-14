/* ============================================================
   Riley Vox — Link in Bio | script.js
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

  /* ----- Safe localStorage (private windows may throw) ----- */
  function storeGet(key) { try { return window.localStorage.getItem(key); } catch (err) { return null; } }
  function storeSet(key, val) { try { window.localStorage.setItem(key, val); } catch (err) { /* storage unavailable */ } }


  /* ----- Theme toggle (persisted) ----- */
  var toggle = $("[data-theme-toggle]");
  var moon = toggle ? $(".ico-moon", toggle) : null;
  var sun = toggle ? $(".ico-sun", toggle) : null;

  function applyTheme(mode) {
    var light = mode === "light";
    if (light) { doc.body.setAttribute("data-theme", "light"); }
    else { doc.body.removeAttribute("data-theme"); }
    if (toggle) {
      toggle.setAttribute("aria-pressed", light ? "true" : "false");
      toggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    }
    if (moon) { moon.hidden = light; }
    if (sun) { sun.hidden = !light; }
    var meta = $("meta[name='theme-color']");
    if (meta) { meta.setAttribute("content", light ? "#F7F3FB" : "#12101A"); }
  }

  var savedTheme = storeGet("rileyvox-theme");
  if (savedTheme === "light") { applyTheme("light"); }
  on(toggle, "click", function () {
    var next = doc.body.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
    storeSet("rileyvox-theme", next);
  });

  /* ----- Copy profile link ----- */
  var PROFILE_URL = "rileyvox.fm/links";
  on($("[data-copy-profile]"), "click", function () {
    copyText(PROFILE_URL, "Profile link copied — paste it anywhere");
  });

  /* ----- Tiny press feedback on link buttons (keyboard friendly) ----- */
  $$(".link-btn").forEach(function (btn) {
    on(btn, "keydown", function (e) {
      if (e.key === " ") { e.preventDefault(); btn.click(); }
    });
  });

})();
