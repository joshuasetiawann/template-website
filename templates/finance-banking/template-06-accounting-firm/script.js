/* Ledgerwood & Co. — finance-banking interactions | dependency-free vanilla JS (file:// safe) */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var BRAND = "Ledgerwood & Co.";
  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- Mobile navigation ---------- */
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
      var n = e.target;
      while (n && n !== navMenu && n.tagName !== "A") { n = n.parentNode; }
      if (n && n.tagName === "A") { closeNav(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ---------- Header scroll state ---------- */
  var header = $(".site-header");
  if (header) {
    var headTick = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", headTick, { passive: true });
    headTick();
  }

  /* ---------- Scroll reveal (reduced-motion safe) ---------- */
  var revealEls = $all(".reveal");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    var revealNow = function (el) { el.classList.add("visible"); };
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { revealNow(en.target); rObs.unobserve(en.target); }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 12% 0px" });
    revealEls.forEach(function (el) { rObs.observe(el); });
    /* Reveal anything already in (or just below) the first viewport on load so no
       section ever renders blank before the user scrolls. */
    var primeReveal = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      revealEls.forEach(function (el) {
        var top = el.getBoundingClientRect().top;
        if (top < vh * 1.15) { revealNow(el); rObs.unobserve(el); }
      });
    };
    primeReveal();
    window.addEventListener("load", primeReveal);
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Count-up statistics ---------- */
  function fmtNum(n, dec) {
    var s = n.toFixed(dec);
    var parts = s.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-target") || "0");
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    if (reduceMotion) { el.textContent = prefix + fmtNum(target, dec) + suffix; return; }
    var dur = 1500, start = null;
    function step(ts) {
      if (!start) { start = ts; }
      var prog = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - prog, 3);
      el.textContent = prefix + fmtNum(target * eased, dec) + suffix;
      if (prog < 1) { window.requestAnimationFrame(step); }
    }
    window.requestAnimationFrame(step);
  }
  var counters = $all("[data-target]");
  if (counters.length && "IntersectionObserver" in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); cObs.unobserve(en.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cObs.observe(el); });
  } else {
    counters.forEach(animateCount);
  }

  /* ---------- FAQ / accordion ---------- */
  $all(".acc-btn").forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute("aria-controls") || "");
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) { panel.hidden = open; }
    });
  });

  /* ---------- Number / currency helpers ---------- */
  function money(n) {
    var r = Math.round(n);
    var s = String(Math.abs(r)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (r < 0 ? "-" : "") + "$" + s;
  }
  function money2(n) {
    var neg = n < 0;
    var s = Math.abs(n).toFixed(2);
    var parts = s.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (neg ? "-" : "") + "$" + parts.join(".");
  }
  function clampNum(v, lo, hi, dflt) {
    var n = parseFloat(v);
    if (!isFinite(n)) { n = dflt; }
    if (n < lo) { n = lo; }
    if (n > hi) { n = hi; }
    return n;
  }
  function setTxt(el, val) { if (el) { el.textContent = val; } }

  /* ---------- Calculator (concept-specific) ---------- */
  var calcBox = $("[data-calc]");
  if (calcBox) {
    var kind = calcBox.getAttribute("data-calc") || "loan";
    var out1 = $("[data-calc-headline]", calcBox);
    var sub = $("[data-calc-sub]", calcBox);
    var rowsWrap = $("[data-calc-rows]", calcBox);
    var bar = $("[data-calc-bar]", calcBox);
    var inputs = $all("input, select", calcBox);

    function rangeOut(id) { return $("[data-out='" + id + "']", calcBox); }

    function recalc() {
      var get = function (id) { var el = document.getElementById(id); return el ? el.value : null; };

      function row(k, v) { return "<div class='cr-row'><span>" + k + "</span><b>" + v + "</b></div>"; }
      function fmt6(n) { var s = n >= 1 ? n.toFixed(2) : n.toFixed(6); return s.replace(/\.?0+$/, function(m){ return m.indexOf('.')===0?'':m; }).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, ''); }

      var principal = clampNum(get("calcPrincipal"), 0, 10000000, 10000);
      var monthlyAdd = clampNum(get("calcMonthly"), 0, 200000, 250);
      var rate = clampNum(get("calcRate"), 0, 30, 6);
      var years = clampNum(get("calcYears"), 1, 60, 20);
      setTxt(rangeOut("calcRate"), rate.toFixed(1) + "%");
      setTxt(rangeOut("calcYears"), years + (years === 1 ? " yr" : " yrs"));
      var months = years * 12;
      var mr = rate / 100 / 12;
      var fv = principal * Math.pow(1 + mr, months);
      if (mr > 0) { fv += monthlyAdd * (Math.pow(1 + mr, months) - 1) / mr; }
      else { fv += monthlyAdd * months; }
      var contributed = principal + monthlyAdd * months;
      var growth = Math.max(fv - contributed, 0);
      setTxt(out1, money(fv));
      setTxt(sub, "projected value after " + years + (years === 1 ? " year" : " years"));
      if (rowsWrap) {
        rowsWrap.innerHTML =
          row("Total contributed", money(contributed)) +
          row("Investment growth", money(growth)) +
          row("Assumed return", rate.toFixed(1) + "% / yr");
      }
      if (bar && fv > 0) { bar.style.width = Math.max(6, Math.round(contributed / fv * 100)) + "%"; }

    }

    inputs.forEach(function (inp) {
      inp.addEventListener("input", recalc);
      inp.addEventListener("change", recalc);
    });
    recalc();
  }

  /* ---------- Form validation (enquiry / appointment) ---------- */
  var form = $("[data-enquiry]");
  if (form) {
    var statusEl = $("[data-form-status]", form);
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var validate = function (input) {
      var field = input.closest(".f-field");
      var err = field ? field.querySelector(".field-err") : null;
      var req = input.getAttribute("data-req");
      var opt = input.getAttribute("data-opt");
      var val = (input.value || "").trim();
      var ok = true;
      if (req === "email") { ok = emailRe.test(val); }
      else if (req === "select") { ok = val.length > 0 && val.charAt(0) !== "—" && input.selectedIndex > 0; }
      else if (req) { ok = val.length >= parseInt(req, 10); }
      else if (opt === "phone" && val.length) { ok = val.replace(/\D/g, "").length >= 7; }
      if (field) { field.classList.toggle("bad", !ok); }
      if (err) { err.hidden = ok; }
      return ok;
    };
    var watched = $all("[data-req], [data-opt]", form);
    watched.forEach(function (input) {
      input.addEventListener("blur", function () { if ((input.value || "").trim().length) { validate(input); } });
      input.addEventListener("input", function () {
        var f = input.closest(".f-field");
        if (f && f.classList.contains("bad")) { validate(input); }
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allOk = true, firstBad = null;
      watched.forEach(function (input) {
        var ok = validate(input);
        if (!ok && !firstBad) { firstBad = input; }
        allOk = allOk && ok;
      });
      if (!allOk) {
        if (statusEl) {
          statusEl.textContent = "Please fix the highlighted fields and try again.";
          statusEl.classList.remove("ok"); statusEl.classList.add("bad");
        }
        if (firstBad) { firstBad.focus(); }
        return;
      }
      if (statusEl) {
        statusEl.textContent = "Thank you — your request has reached " + BRAND + ". A specialist will be in touch shortly.";
        statusEl.classList.remove("bad"); statusEl.classList.add("ok");
      }
      form.reset();
      var btn = $("button[type='submit']", form);
      if (btn) {
        var label = btn.textContent;
        btn.textContent = "Sent ✓"; btn.disabled = true;
        window.setTimeout(function () { btn.textContent = label; btn.disabled = false; }, 2600);
      }
    });
  }

  /* ---------- Delegated demo-link guard (data-demo-link + bare #) ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target;
    while (a && a.tagName !== "A") { a = a.parentNode; }
    if (!a || !a.getAttribute) { return; }
    if (a.hasAttribute("data-demo-link") || a.getAttribute("href") === "#") {
      e.preventDefault();
      if (a.hasAttribute("data-demo-link")) {
        a.classList.add("demo-poke");
        window.setTimeout(function () { a.classList.remove("demo-poke"); }, 320);
      }
    }
  });

  /* ---------- Footer year ---------- */
  $all("[data-year]").forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Back to top ---------- */
  var toTop = $("[data-totop]");
  if (toTop) {
    var topTick = function () { toTop.classList.toggle("show", window.scrollY > 560); };
    window.addEventListener("scroll", topTick, { passive: true });
    topTick();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }
})();
