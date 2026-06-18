/* ============================================================
   Vioma — Verify Email | script.js
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


  /* ----- OTP inputs: auto-advance, backspace, arrows, paste ----- */
  var form = $("[data-util='otp']");
  var row = $("[data-otp-row]");
  var inputs = row ? $$(".otp-input", row) : [];
  var verifyBtn = $("[data-verify]");
  var msg = $("[data-otp-msg]");

  function code() {
    return inputs.map(function (i) { return i.value; }).join("");
  }

  function refresh() {
    var full = code().length === inputs.length;
    inputs.forEach(function (inp) { inp.classList.toggle("filled", inp.value !== ""); });
    if (row) {
      row.classList.toggle("complete", full);
      row.classList.remove("error");
    }
    if (verifyBtn) {
      if (full) { verifyBtn.removeAttribute("disabled"); }
      else { verifyBtn.setAttribute("disabled", ""); }
    }
    if (msg && msg.classList.contains("is-err")) {
      msg.textContent = "";
      msg.classList.remove("is-err");
    }
  }

  inputs.forEach(function (inp, idx) {
    on(inp, "input", function () {
      var v = inp.value.replace(/\D/g, "");
      inp.value = v.slice(-1);
      if (inp.value && idx < inputs.length - 1) { inputs[idx + 1].focus(); inputs[idx + 1].select(); }
      refresh();
      if (code().length === inputs.length && verifyBtn) { verifyBtn.focus(); }
    });
    on(inp, "keydown", function (e) {
      if (e.key === "Backspace" && !inp.value && idx > 0) {
        inputs[idx - 1].focus();
        inputs[idx - 1].value = "";
        refresh();
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && idx > 0) {
        inputs[idx - 1].focus(); e.preventDefault();
      } else if (e.key === "ArrowRight" && idx < inputs.length - 1) {
        inputs[idx + 1].focus(); e.preventDefault();
      }
    });
    on(inp, "paste", function (e) {
      var data = (e.clipboardData ? e.clipboardData.getData("text") : "").replace(/\D/g, "");
      if (!data) { return; }
      e.preventDefault();
      var chars = data.slice(0, inputs.length).split("");
      chars.forEach(function (ch, i) { if (inputs[i]) { inputs[i].value = ch; } });
      var next = Math.min(chars.length, inputs.length - 1);
      inputs[next].focus();
      refresh();
    });
    on(inp, "focus", function () { inp.select(); });
  });

  if (form) {
    on(form, "submit", function (e) {
      e.preventDefault();
      var v = code();
      if (v.length < inputs.length) {
        if (row) { row.classList.add("error"); }
        if (msg) { msg.textContent = "Enter all six digits first."; msg.classList.add("is-err"); }
        return;
      }
      if (msg) { msg.textContent = "Code accepted \u2713"; msg.classList.remove("is-err"); msg.classList.add("is-ok"); }
      window.setTimeout(function () {
        form.hidden = true;
        var doneBox = $("[data-verified]");
        if (doneBox) { doneBox.hidden = false; }
        var hint = $(".demo-hint");
        if (hint) { hint.hidden = true; }
      }, 500);
    });
  }

  /* ----- Resend with 30s cooldown countdown ----- */
  var resend = $("[data-resend]");
  var cooldownTimer = null;
  function startCooldown(secs) {
    if (!resend) { return; }
    var left = secs;
    resend.setAttribute("disabled", "");
    resend.textContent = "Resend in " + left + "s";
    cooldownTimer = window.setInterval(function () {
      left -= 1;
      if (left <= 0) {
        window.clearInterval(cooldownTimer);
        resend.removeAttribute("disabled");
        resend.textContent = "Resend code";
        return;
      }
      resend.textContent = "Resend in " + left + "s";
    }, 1000);
  }
  on(resend, "click", function () {
    if (resend.hasAttribute("disabled")) { return; }
    if (msg) {
      msg.textContent = "A fresh code is on its way to noor@inkwell.blog";
      msg.classList.remove("is-err", "is-ok");
    }
    startCooldown(30);
    if (inputs[0]) { inputs[0].focus(); }
  });

})();
