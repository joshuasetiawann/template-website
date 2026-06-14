/* ============================================================
   Sunhatch Studio — Contact | script.js
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

  /* ----- Field validation helpers ----- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validEmail(v) { return EMAIL_RE.test(String(v || "").trim()); }
  function fieldWrap(input) { return input && input.closest ? input.closest(".field") : null; }
  function setFieldError(input, msg) {
    var wrap = fieldWrap(input);
    if (!wrap) { return; }
    wrap.classList.add("invalid");
    var note = wrap.querySelector("[data-err]");
    if (note) { note.textContent = msg; note.hidden = false; }
    input.setAttribute("aria-invalid", "true");
  }
  function clearFieldError(input) {
    var wrap = fieldWrap(input);
    if (!wrap) { return; }
    wrap.classList.remove("invalid");
    var note = wrap.querySelector("[data-err]");
    if (note) { note.hidden = true; }
    input.removeAttribute("aria-invalid");
  }


  /* ----- Contact form validation + success swap ----- */
  var card = $("[data-util='contact-form']");
  var form = $("[data-contact]");
  if (card && form) {
    var nameIn = $("#cfName");
    var emailIn = $("#cfEmail");
    var topicIn = $("#cfTopic");
    var msgIn = $("#cfMsg");
    var done = $("[data-done]", card);

    on(form, "submit", function (e) {
      e.preventDefault();
      var ok = true;
      var name = nameIn ? nameIn.value.trim() : "";
      var email = emailIn ? emailIn.value.trim() : "";
      var topic = topicIn ? topicIn.value : "";
      var msg = msgIn ? msgIn.value.trim() : "";
      if (name.length < 2) { setFieldError(nameIn, "Please add your name."); ok = false; }
      if (!validEmail(email)) { setFieldError(emailIn, email ? "That email looks mistyped." : "We need a valid email to write back."); ok = false; }
      if (!topic) { setFieldError(topicIn, "Pick the closest topic."); ok = false; }
      if (msg.length < 12) { setFieldError(msgIn, msg ? "A few more words helps us route it right." : "Tell us at least a little about the project."); ok = false; }
      if (!ok) {
        var firstBad = $(".field.invalid .input", form);
        if (firstBad) { firstBad.focus(); }
        return;
      }
      var who = $("[data-who]");
      var sentTo = $("[data-sent-to]");
      if (who) { who.textContent = name.split(" ")[0]; }
      if (sentTo) { sentTo.textContent = email; }
      form.hidden = true;
      if (done) { done.hidden = false; }
    });

    on($("[data-again]"), "click", function () {
      if (done) { done.hidden = true; }
      form.hidden = false;
      if (msgIn) { msgIn.value = ""; }
      if (nameIn) { nameIn.focus(); }
    });

    [nameIn, emailIn, msgIn].forEach(function (inp) {
      on(inp, "input", function () { clearFieldError(inp); });
    });
    on(topicIn, "change", function () { clearFieldError(topicIn); });
  }

})();
