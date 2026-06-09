/* template-20-senior-fitness — interaction layer · build 20/20 */
(function () {
  "use strict";

  var doc = document;
  var reduce = false;
  try {
    reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) { reduce = false; }

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function on(el, ev, fn) { if (el) { el.addEventListener(ev, fn); } }

  /* ---------------------------------------------------------- mobile nav */
  function initNav() {
    var toggle = $(".nav-toggle");
    var menu = $("#navmenu");
    if (!toggle || !menu) { return; }
    function close() {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    }
    on(toggle, "click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      menu.classList.toggle("is-open", !open);
    });
    $all(".nav-link, .nav-cta", menu).forEach(function (a) { on(a, "click", close); });
    on(doc, "keydown", function (e) { if (e.key === "Escape") { close(); } });
    on(doc, "click", function (e) {
      if (menu.classList.contains("is-open") &&
          !menu.contains(e.target) && !toggle.contains(e.target)) { close(); }
    });
  }

  /* ------------------------------------------------------ header scroll state */
  function initHeaderState() {
    var header = $("header[id='top']");
    if (!header) { return; }
    var tick = function () { header.classList.toggle("is-stuck", window.scrollY > 8); };
    tick();
    on(window, "scroll", tick, { passive: true });
  }

  /* ----------------------------------------------------------- back to top */
  function initToTop() {
    var btn = $("[data-totop]");
    if (!btn) { return; }
    var tick = function () { btn.classList.toggle("is-visible", window.scrollY > 480); };
    tick();
    on(window, "scroll", tick, { passive: true });
    on(btn, "click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ---------------------------------------------------------- footer year */
  function initYear() {
    $all("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ------------------------------------------------------ reveal on scroll */
  function initReveal() {
    var items = $all("[data-reveal]");
    if (!items.length) { return; }
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var el = en.target;
          var delay = Math.min(($all("[data-reveal]", el.parentNode).indexOf(el) % 6) * 70, 360);
          el.style.transitionDelay = delay + "ms";
          el.classList.add("is-in");
          io.unobserve(el);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------------ scrollspy */
  function initSpy() {
    var links = $all(".nav-menu .nav-link").filter(function (a) {
      var h = a.getAttribute("href") || "";
      return h.charAt(0) === "#" && h.length > 1;
    });
    if (!links.length || !("IntersectionObserver" in window)) { return; }
    var map = {};
    var sections = [];
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var sec = doc.getElementById(id);
      if (sec) { map[id] = a; sections.push(sec); }
    });
    if (!sections.length) { return; }
    var current = null;
    function setCurrent(id) {
      if (current === id) { return; }
      current = id;
      links.forEach(function (a) {
        var on = a.getAttribute("href").slice(1) === id;
        if (on) { a.setAttribute("aria-current", "true"); }
        else { a.removeAttribute("aria-current"); }
      });
    }
    var io = new IntersectionObserver(function (entries) {
      var best = null;
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          if (!best || en.intersectionRatio > best.intersectionRatio) { best = en; }
        }
      });
      if (best) { setCurrent(best.target.id); }
    }, { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] });
    sections.forEach(function (s) { io.observe(s); });
  }

  /* ------------------------------------------------------------- count-up */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = target + suffix; return; }
    var start = null, dur = 1500;
    function step(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.textContent = val + suffix;
      if (p < 1) { requestAnimationFrame(step); }
      else { el.textContent = target + suffix; }
    }
    requestAnimationFrame(step);
  }
  function initCounts() {
    var nums = $all("[data-count]");
    if (!nums.length) { return; }
    if (!("IntersectionObserver" in window)) { nums.forEach(animateCount); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animateCount(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (el) { io.observe(el); });
  }

  /* --------------------------------------------------------- bar fills (v1) */
  function initBars() {
    var panel = $("[data-bars]");
    if (!panel) { return; }
    var fills = $all(".bar-fill", panel);
    function run() {
      fills.forEach(function (f) {
        var pct = parseInt(f.getAttribute("data-bar"), 10) || 0;
        f.style.width = pct + "%";
      });
    }
    if (!("IntersectionObserver" in window) || reduce) { run(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(panel);
  }

  /* ------------------------------------------------ schedule: day tabs */
  function initSchedTabs() {
    var wrap = $("[data-schedule][data-mode='tabs']");
    if (!wrap) { return; }
    var tabs = $all(".sched-tab", wrap);
    var panels = $all(".sched-day", wrap);
    function select(i) {
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.setAttribute("tabindex", on ? "0" : "-1");
      });
      panels.forEach(function (p, j) { p.hidden = i !== j; });
    }
    tabs.forEach(function (t, i) {
      t.setAttribute("tabindex", i === 0 ? "0" : "-1");
      on(t, "click", function () { select(i); });
      on(t, "keydown", function (e) {
        var idx = -1;
        if (e.key === "ArrowRight") { idx = (i + 1) % tabs.length; }
        else if (e.key === "ArrowLeft") { idx = (i - 1 + tabs.length) % tabs.length; }
        else if (e.key === "Home") { idx = 0; }
        else if (e.key === "End") { idx = tabs.length - 1; }
        if (idx >= 0) { e.preventDefault(); select(idx); tabs[idx].focus(); }
      });
    });
  }

  /* ------------------------------------------- schedule: day filter (list) */
  function initDayFilter() {
    var wrap = $("[data-schedule][data-mode='list']");
    if (!wrap) { return; }
    var chips = $all("[data-day-filter]", wrap);
    var days = $all(".journal-day", wrap);
    chips.forEach(function (c) {
      on(c, "click", function () {
        var key = c.getAttribute("data-day-filter");
        chips.forEach(function (x) {
          var on = x === c;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-pressed", on ? "true" : "false");
        });
        days.forEach(function (d) {
          d.hidden = !(key === "all" || d.getAttribute("data-day") === key);
        });
      });
    });
  }

  /* ------------------------------------------ schedule: day highlight (grid) */
  function initGridFilter() {
    var wrap = $("[data-schedule][data-mode='grid']");
    if (!wrap) { return; }
    var chips = $all("[data-day-filter]", wrap);
    var cols = $all(".gcol", wrap);
    chips.forEach(function (c) {
      on(c, "click", function () {
        var key = c.getAttribute("data-day-filter");
        chips.forEach(function (x) {
          var on = x === c;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-pressed", on ? "true" : "false");
        });
        cols.forEach(function (col) {
          var match = key === "all" || col.getAttribute("data-day") === key;
          col.classList.toggle("is-dim", !(key === "all") && !match);
          col.classList.toggle("is-hi", !(key === "all") && match);
        });
      });
    });
  }

  /* ----------------------------------------- schedule: category filter (v5) */
  function initCatFilter() {
    var wrap = $("[data-schedule][data-mode='filter']");
    if (!wrap) { return; }
    var chips = $all("[data-cat-filter]", wrap);
    var rows = $all(".wrow", wrap);
    chips.forEach(function (c) {
      on(c, "click", function () {
        var key = c.getAttribute("data-cat-filter");
        chips.forEach(function (x) {
          var on = x === c;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-pressed", on ? "true" : "false");
        });
        rows.forEach(function (r) {
          r.classList.toggle("is-hidden", !(key === "all" || r.getAttribute("data-cat") === key));
        });
      });
    });
  }

  /* ---------------------------------------------- programs: genre filter (v4) */
  function initGenreFilter() {
    var chips = $all("[data-genre-filter]");
    if (!chips.length) { return; }
    var cards = $all(".prog-card[data-genre]");
    chips.forEach(function (c) {
      on(c, "click", function () {
        var key = c.getAttribute("data-genre-filter");
        chips.forEach(function (x) {
          var on = x === c;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-pressed", on ? "true" : "false");
        });
        cards.forEach(function (card) {
          card.style.display = (key === "all" || card.getAttribute("data-genre") === key) ? "" : "none";
        });
      });
    });
  }

  /* --------------------------------------------------------- FAQ accordion */
  function initFaq() {
    var btns = $all(".faq-btn");
    if (!btns.length) { return; }
    btns.forEach(function (btn) {
      var panel = doc.getElementById(btn.getAttribute("aria-controls"));
      on(btn, "click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        if (panel) { panel.hidden = open; }
      });
    });
  }

  /* ------------------------------------------------------ generic carousel */
  function initCarousel(boxSel, slideSel, prevSel, nextSel, countSel, dotSel) {
    var box = $(boxSel);
    if (!box) { return; }
    var slides = $all(slideSel, box);
    if (!slides.length) { return; }
    var dots = dotSel ? $all(dotSel, box) : [];
    var i = 0;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, j) { s.hidden = j !== i; });
      dots.forEach(function (d, j) {
        d.classList.toggle("is-active", j === i);
        if (j === i) { d.setAttribute("aria-current", "true"); }
        else { d.removeAttribute("aria-current"); }
      });
      var cnt = $(countSel, box);
      if (cnt) { cnt.textContent = (i + 1) + " / " + slides.length; }
    }
    on($(prevSel, box), "click", function () { show(i - 1); });
    on($(nextSel, box), "click", function () { show(i + 1); });
    dots.forEach(function (d, j) { on(d, "click", function () { show(j); }); });
    show(0);
  }

  /* ----------------------------------------------------- breath exercise (v2) */
  function initBreath() {
    var ring = $("[data-breath]");
    var btn = $("[data-breath-toggle]");
    if (!ring || !btn) { return; }
    var word = $("[data-breath-word]", ring) || $("[data-breath-word]");
    var running = false, timer = null, phase = 0;
    var seq = [["Breathe in", 4000, "inhale"], ["Hold", 4000, ""], ["Breathe out", 4000, "exhale"], ["Hold", 2000, ""]];
    function stepPhase() {
      var s = seq[phase % seq.length];
      if (word) { word.textContent = s[0]; }
      ring.classList.remove("inhale", "exhale");
      if (s[2]) { ring.classList.add(s[2]); }
      phase++;
      timer = window.setTimeout(stepPhase, s[1]);
    }
    function stop() {
      running = false;
      btn.setAttribute("aria-pressed", "false");
      btn.textContent = "Begin one minute";
      if (timer) { window.clearTimeout(timer); }
      ring.classList.remove("inhale", "exhale");
      if (word) { word.textContent = "Begin"; }
    }
    on(btn, "click", function () {
      if (running) { stop(); return; }
      running = true; phase = 0;
      btn.setAttribute("aria-pressed", "true");
      btn.textContent = "Stop";
      stepPhase();
      window.setTimeout(function () { if (running) { stop(); } }, 60000);
    });
  }

  /* ------------------------------------------------------- plate ring (v2) */
  function initPlate() {
    var ring = $("[data-plate-ring]");
    if (!ring) { return; }
    var btns = $all("[data-plate]");
    var readout = $("[data-plate-readout]", ring);
    var descs = $all("[data-plate-desc]");
    function apply(btn) {
      var parts = (btn.getAttribute("data-plate") || "0,0,0").split(",").map(Number);
      var idx = parseInt(btn.getAttribute("data-plate-idx"), 10) || 0;
      var a = parts[0], b = parts[1];
      ring.style.background = "conic-gradient(var(--accent) 0 " + a + "%, var(--accent-2) " + a +
        "% " + (a + b) + "%, color-mix(in srgb,var(--ink) 30%,var(--surface)) " + (a + b) + "% 100%)";
      if (readout) { readout.textContent = parts.join(" / "); }
      btns.forEach(function (x) {
        var on = x === btn;
        x.classList.toggle("is-active", on);
        x.setAttribute("aria-pressed", on ? "true" : "false");
      });
      descs.forEach(function (d) { d.hidden = parseInt(d.getAttribute("data-plate-desc"), 10) !== idx; });
    }
    btns.forEach(function (b) { on(b, "click", function () { apply(b); }); });
  }

  /* ------------------------------------------- generic chip picker / intent */
  function initPickers() {
    [["pick", ".pick-out"], ["intent", ".intent-out"], ["pick", null]].forEach(function () {});
    // pick (clinics) + intent (meditation) share the same chip->desc pattern
    [
      { chip: "[data-pick]", desc: "[data-pick-desc]", attr: "data-pick", dattr: "data-pick-desc" },
      { chip: "[data-intent]", desc: "[data-intent-desc]", attr: "data-intent", dattr: "data-intent-desc", halo: true }
    ].forEach(function (cfg) {
      var chips = $all(cfg.chip);
      if (!chips.length) { return; }
      var descs = $all(cfg.desc);
      var halo = cfg.halo ? $("[data-halo]") : null;
      chips.forEach(function (c) {
        on(c, "click", function () {
          var idx = parseInt(c.getAttribute(cfg.attr), 10) || 0;
          chips.forEach(function (x) {
            var on = x === c;
            x.classList.toggle("is-active", on);
            x.setAttribute("aria-pressed", on ? "true" : "false");
          });
          descs.forEach(function (d) { d.hidden = parseInt(d.getAttribute(cfg.dattr), 10) !== idx; });
          if (halo) {
            halo.style.transform = "scale(" + (1 + idx * 0.12) + ")";
          }
        });
      });
    });
  }

  /* ------------------------------------------------------ method steps (v4) */
  function initMethod() {
    var list = $("[data-method]");
    if (!list) { return; }
    var btns = $all("[data-step-btn]", list);
    var texts = $all(".step-text", list);
    var steps = $all(".step", list);
    var nextBtn = $("[data-step-next]");
    var cur = 0;
    function show(i) {
      cur = (i + btns.length) % btns.length;
      btns.forEach(function (b, j) {
        b.setAttribute("aria-pressed", j === cur ? "true" : "false");
      });
      steps.forEach(function (s, j) { s.classList.toggle("is-active", j === cur); });
      texts.forEach(function (t, j) { t.hidden = j !== cur; });
    }
    btns.forEach(function (b, i) { on(b, "click", function () { show(i); }); });
    on(nextBtn, "click", function () { show(cur + 1); });
    show(0);
  }

  /* ----------------------------------------------------------- EQ beat (v1) */
  function initEq() {
    var box = $("[data-eq]");
    var toggle = $("[data-eq-toggle]");
    if (!box) { return; }
    var on0 = true;
    if (reduce) { box.classList.add("eq-paused"); on0 = false; }
    function set(state) {
      on0 = state;
      box.classList.toggle("eq-paused", !state);
      if (toggle) {
        toggle.setAttribute("aria-pressed", state ? "true" : "false");
        toggle.textContent = state ? "Pause the beat" : "Resume the beat";
      }
    }
    set(on0);
    on(toggle, "click", function () { set(!on0); });
  }

  /* --------------------------------------------------------- countdown (v1) */
  function initCountdown() {
    var wrap = $("[data-countdown]");
    if (!wrap) { return; }
    var ahead = parseInt(wrap.getAttribute("data-days-ahead"), 10) || 14;
    var target = new Date();
    target.setDate(target.getDate() + ahead);
    target.setHours(19, 0, 0, 0);
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function tick() {
      var diff = Math.max(0, target - new Date());
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      var map = { days: d, hours: h, mins: m, secs: s };
      Object.keys(map).forEach(function (k) {
        var el = $("[data-cd-" + k + "]", wrap);
        if (el) { el.textContent = pad(map[k]); }
      });
    }
    tick();
    window.setInterval(tick, 1000);
  }

  /* ------------------------------------------------------ pace calc (v5) */
  function initPace() {
    var panel = $("[data-pace]");
    if (!panel) { return; }
    var go = $("[data-pace-go]", panel);
    var out = $("[data-pace-out]", panel);
    on(go, "click", function () {
      var dist = parseFloat(($("#pc-dist") || {}).value);
      var min = parseInt(($("#pc-min") || {}).value, 10);
      var sec = parseInt(($("#pc-sec") || {}).value, 10) || 0;
      if (!dist || dist <= 0 || isNaN(min)) {
        if (out) { out.textContent = "Pop in a distance and a time and we'll sort your group."; }
        return;
      }
      var totalSec = min * 60 + sec;
      var perKm = totalSec / dist;
      var pm = Math.floor(perKm / 60);
      var ps = Math.round(perKm % 60);
      var group;
      if (perKm < 300) { group = "the Cheetahs (sub-5:00/km) — front of the pack"; }
      else if (perKm < 360) { group = "the Hares (5:00–6:00/km) — our biggest bunch"; }
      else if (perKm < 420) { group = "the Striders (6:00–7:00/km) — chatty and steady"; }
      else { group = "the Trailblazers (7:00/km+) — run-walk friendly, no one left behind"; }
      if (out) {
        out.textContent = "That's about " + pm + ":" + (ps < 10 ? "0" : "") + ps +
          " /km — you'd love " + group + ".";
      }
    });
  }

  /* ----------------------------------------------------- before/after (v5) */
  function initBeforeAfter() {
    var range = $("[data-ba-range]");
    var after = $("[data-ba-after]");
    if (!range || !after) { return; }
    function apply() {
      var v = parseInt(range.value, 10);
      after.style.opacity = (0.25 + (v / 100) * 0.75).toFixed(2);
      after.style.transform = "translateY(" + ((100 - v) * 0.08) + "px)";
    }
    on(range, "input", apply);
    apply();
  }

  /* --------------------------------------------------- font-size toggle (v5) */
  function initFontSize() {
    var btn = $("[data-fontsize]");
    if (!btn) { return; }
    on(btn, "click", function () {
      var on = doc.body.classList.toggle("bigtype");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.textContent = on ? "Standard text size" : "Larger text, please";
    });
  }

  /* --------------------------------------------------------- form validation */
  function initForm() {
    var form = $("#trial-form");
    if (!form) { return; }
    var ok = $("#form-ok", form);
    function setErr(field, input, show) {
      if (field) { field.classList.toggle("is-invalid", show); }
      var err = field ? $(".ferr", field) : null;
      if (err) { err.hidden = !show; }
      if (input) { input.setAttribute("aria-invalid", show ? "true" : "false"); }
      return !show;
    }
    function fieldOf(input) { return input ? input.closest(".field") : null; }
    function validName() {
      var i = $("#tf-name", form);
      return setErr(fieldOf(i), i, !i || i.value.trim().length < 2);
    }
    function validEmail() {
      var i = $("#tf-email", form);
      var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return setErr(fieldOf(i), i, !i || !re.test(i.value.trim()));
    }
    function validPhone() {
      var i = $("#tf-phone", form);
      if (!i || !i.value.trim()) { return setErr(fieldOf(i), i, false); }
      var digits = i.value.replace(/\D/g, "");
      return setErr(fieldOf(i), i, digits.length < 7);
    }
    function validInterest() {
      var i = $("#tf-interest", form);
      return setErr(fieldOf(i), i, !i || !i.value);
    }
    [["#tf-name", "input", validName], ["#tf-email", "input", validEmail],
     ["#tf-phone", "input", validPhone], ["#tf-interest", "change", validInterest]
    ].forEach(function (pair) {
      var el = $(pair[0], form);
      on(el, "blur", pair[2]);
      on(el, pair[1], function () {
        var fld = fieldOf(el);
        if (fld && fld.classList.contains("is-invalid")) { pair[2](); }
      });
    });
    on(form, "submit", function (e) {
      e.preventDefault();
      var results = [validName(), validEmail(), validPhone(), validInterest()];
      var allOk = results.every(Boolean);
      if (allOk) {
        if (ok) { ok.hidden = false; }
        form.reset();
        if (ok && ok.scrollIntoView) { ok.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); }
        $all(".field.is-invalid", form).forEach(function (f) { f.classList.remove("is-invalid"); });
      } else {
        if (ok) { ok.hidden = true; }
        var firstBad = $(".field.is-invalid input, .field.is-invalid select", form);
        if (firstBad && firstBad.focus) { firstBad.focus(); }
      }
    });
  }

  /* ------------------------------------------- placeholder link guard (#) */
  function initLinkGuard() {
    on(doc, "click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href="#"]') : null;
      if (a) { e.preventDefault(); }
    });
  }

  /* ----------------------------------------------------------------- boot */
  function boot() {
    initNav();
    initHeaderState();
    initToTop();
    initYear();
    initReveal();
    initSpy();
    initCounts();
    initBars();
    initSchedTabs();
    initDayFilter();
    initGridFilter();
    initCatFilter();
    initGenreFilter();
    initFaq();
    initCarousel("[data-wod]", "[data-wod-slide]", "[data-wod-prev]", "[data-wod-next]", "[data-wod-count]", null);
    initCarousel("[data-rituals]", "[data-rit-slide]", "[data-rit-prev]", "[data-rit-next]", null, "[data-rit-dot]");
    initBreath();
    initPlate();
    initPickers();
    initMethod();
    initEq();
    initCountdown();
    initPace();
    initBeforeAfter();
    initFontSize();
    initForm();
    initLinkGuard();
  }

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

/* === HF page-extension behaviour (about/pricing/contact) === */
(function () {
  "use strict";
  var doc = document;
  function ready(fn){ if(doc.readyState==="loading"){doc.addEventListener("DOMContentLoaded",fn);}else{fn();} }
  ready(function () {
    // Ensure any [data-reveal] elements on these pages are shown even if the
    // template's IntersectionObserver pass ran before they mattered (null-safe).
    try {
      var els = doc.querySelectorAll(".pgx-tm[data-reveal], .pgx-mission[data-reveal]");
      if (els && els.length && !("IntersectionObserver" in window)) {
        Array.prototype.forEach.call(els, function (el) { el.classList.add("is-in"); });
      }
    } catch (e) {}
    // Smooth-scroll for in-page contact anchors (e.g. CTA -> #book), respecting reduced motion.
    try {
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      Array.prototype.forEach.call(doc.querySelectorAll('a[href^="#"]'), function (a) {
        var id = a.getAttribute("href");
        if (!id || id === "#" || a.hasAttribute("data-demo-link")) { return; }
        var target = null;
        try { target = doc.querySelector(id); } catch (e) { return; }
        if (!target) { return; }
        a.addEventListener("click", function (ev) {
          ev.preventDefault();
          target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        });
      });
    } catch (e) {}
  });
})();
