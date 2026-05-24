/* Mindgrid — AI Tool | landing page interactions (vanilla JS, no dependencies) */

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var SITE = {
    brand: "Mindgrid",
    successMsg: "Thanks — you are on the list!",
    successBtn: "You\'re in \u2713",
    submitLabel: "Join"
  };

  function each(list, fn) {
    Array.prototype.forEach.call(list, fn);
  }

  /* ----- Mobile navigation ----- */
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var open = navMenu.classList.toggle("open");
      navToggle.classList.toggle("is-open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navMenu.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.tagName === "A") {
        navMenu.classList.remove("open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- Sticky header shadow ----- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ----- FAQ accordion ----- */
  var faqItems = document.querySelectorAll(".faq-item");
  each(faqItems, function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    if (!btn || !panel) { return; }
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      each(faqItems, function (other) {
        var ob = other.querySelector(".faq-q");
        var op = other.querySelector(".faq-a");
        if (ob && op && ob !== btn) {
          ob.setAttribute("aria-expanded", "false");
          op.style.maxHeight = "";
          other.classList.remove("open");
        }
      });
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      item.classList.toggle("open", !expanded);
      panel.style.maxHeight = expanded ? "" : panel.scrollHeight + "px";
    });
  });

  /* ----- Reveal on scroll ----- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      each(entries, function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    each(revealEls, function (el) { revealObs.observe(el); });
  } else {
    each(revealEls, function (el) { el.classList.add("visible"); });
  }

  /* ----- Before / after switch ----- */
  var cmpRoot = document.querySelector("[data-compare]");
  if (cmpRoot) {
    var cmpButtons = cmpRoot.querySelectorAll(".cmp-btn");
    var cmpPanes = cmpRoot.querySelectorAll(".compare-pane");
    each(cmpButtons, function (btn, i) {
      btn.addEventListener("click", function () {
        each(cmpButtons, function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        each(cmpPanes, function (pane, j) {
          pane.classList.toggle("is-active", i === j);
        });
      });
    });
  }

  /* ----- Marquee: duplicate the set for a seamless loop ----- */
  each(document.querySelectorAll(".marquee-track"), function (track) {
    var set = track.querySelector(".marquee-set");
    if (!set || track.children.length > 1) { return; }
    var clone = set.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
  });

  /* ----- Release polish: footer year ----- */
  var rlYearEls = document.querySelectorAll("[data-year]");
  for (var rlY = 0; rlY < rlYearEls.length; rlY++) {
    rlYearEls[rlY].textContent = String(new Date().getFullYear());
  }

  /* ----- Scrollspy: mark the nav link of the section in view ----- */
  var rlSpyLinks = document.querySelectorAll(".nav-links a[href^='#']");
  var rlSpyPairs = [];
  for (var rlI = 0; rlI < rlSpyLinks.length; rlI++) {
    var rlHref = rlSpyLinks[rlI].getAttribute("href");
    var rlSec = rlHref && rlHref.length > 1 ? document.getElementById(rlHref.slice(1)) : null;
    if (rlSec) { rlSpyPairs.push({ link: rlSpyLinks[rlI], sec: rlSec }); }
  }
  if (rlSpyPairs.length && "IntersectionObserver" in window) {
    var rlSpyObs = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) { continue; }
        for (var j = 0; j < rlSpyPairs.length; j++) {
          if (rlSpyPairs[j].sec !== entries[i].target) { continue; }
          for (var k = 0; k < rlSpyPairs.length; k++) { rlSpyPairs[k].link.removeAttribute("aria-current"); }
          rlSpyPairs[j].link.setAttribute("aria-current", "true");
        }
      }
    }, { rootMargin: "-35% 0px -55% 0px" });
    for (var rlS = 0; rlS < rlSpyPairs.length; rlS++) { rlSpyObs.observe(rlSpyPairs[rlS].sec); }
  }

  /* ----- Back-to-top button ----- */
  var rlToTop = document.querySelector("[data-totop]");
  if (rlToTop) {
    var rlToTopTick = function () {
      rlToTop.classList.toggle("show", window.scrollY > 600);
    };
    window.addEventListener("scroll", rlToTopTick, { passive: true });
    rlToTopTick();
    rlToTop.addEventListener("click", function () {
      var rlReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: rlReduce ? "auto" : "smooth" });
    });
  }

  /* ----- Dismissible announcement bar (dismissal persists) ----- */
  var rlAnnounce = document.querySelector("[data-announce]");
  if (rlAnnounce) {
    var rlAnnKey = "mindgrid-announce-dismissed";
    var rlAnnSaved = null;
    try { rlAnnSaved = window.localStorage.getItem(rlAnnKey); } catch (rlErr) { rlAnnSaved = null; }
    if (rlAnnSaved === "1") {
      if (rlAnnounce.parentNode) { rlAnnounce.parentNode.removeChild(rlAnnounce); }
    } else {
      rlAnnounce.removeAttribute("hidden");
      var rlAnnClose = rlAnnounce.querySelector("[data-announce-close]");
      if (rlAnnClose) {
        rlAnnClose.addEventListener("click", function () {
          rlAnnounce.classList.add("is-closing");
          window.setTimeout(function () {
            if (rlAnnounce.parentNode) { rlAnnounce.parentNode.removeChild(rlAnnounce); }
          }, 220);
          try { window.localStorage.setItem(rlAnnKey, "1"); } catch (rlErr2) {}
        });
      }
    }
  }

})();

/* ===== Sub-pages (Features / Pricing / Contact) — appended, namespaced, null-safe ===== */
(function () {
  "use strict";
  function lpEach(list, fn) { Array.prototype.forEach.call(list, fn); }

  /* Demo placeholder links: prevent navigation on href="#" marked data-demo-link */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[data-demo-link]") : null;
    if (a) { e.preventDefault(); }
  });

  /* Contact form validation (inline errors + success) */
  var lpForm = document.querySelector("[data-contact-form]");
  if (lpForm) {
    var lpSuccess = lpForm.querySelector("[data-form-success]");
    var lpEmailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var lpSetErr = function (field, msg) {
      if (!field) { return; }
      var wrap = field.closest(".field");
      var err = wrap ? wrap.querySelector(".field-err") : null;
      if (wrap) { wrap.classList.toggle("invalid", !!msg); }
      if (err) { err.textContent = msg || ""; }
    };
    var lpValidate = function () {
      var ok = true;
      var name = lpForm.querySelector("#cf-name");
      var email = lpForm.querySelector("#cf-email");
      var message = lpForm.querySelector("#cf-message");
      if (name && !name.value.trim()) { lpSetErr(name, "Please enter your name."); ok = false; } else { lpSetErr(name, ""); }
      if (email && !lpEmailRe.test(email.value.trim())) { lpSetErr(email, "Enter a valid email address."); ok = false; } else { lpSetErr(email, ""); }
      if (message && message.value.trim().length < 10) { lpSetErr(message, "A few more words, please (10+ characters)."); ok = false; } else { lpSetErr(message, ""); }
      return ok;
    };
    lpForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (lpValidate()) {
        if (lpSuccess) { lpSuccess.hidden = false; }
        var btn = lpForm.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = "Sent ✓"; }
        lpForm.reset();
      } else if (lpSuccess) {
        lpSuccess.hidden = true;
      }
    });
    lpEach(lpForm.querySelectorAll("input,textarea,select"), function (el) {
      el.addEventListener("input", function () {
        var wrap = el.closest(".field");
        if (wrap && wrap.classList.contains("invalid")) { lpValidate(); }
      });
    });
  }
  /* Pricing monthly/annual toggle (only on pages whose template lacks the homepage toggle) */
  var lpBillBar = document.querySelector("[data-lpbill]");
  if (lpBillBar) {
    var lpBillBtns = lpBillBar.querySelectorAll(".bill-btn");
    var lpBillNote = lpBillBar.querySelector(".bill-note");
    lpEach(lpBillBtns, function (btn) {
      btn.addEventListener("click", function () {
        var period = btn.getAttribute("data-bill");
        if (!period) { return; }
        lpEach(lpBillBtns, function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        lpEach(document.querySelectorAll(".amount"), function (amt) {
          var val = amt.getAttribute("data-" + period);
          if (val) { amt.textContent = val; }
        });
        if (lpBillNote) {
          var note = lpBillNote.getAttribute("data-" + period);
          if (note) { lpBillNote.textContent = note; }
        }
      });
    });
  }

})();
