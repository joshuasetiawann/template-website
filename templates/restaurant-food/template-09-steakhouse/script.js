/* ==========================================================
   Emberline Chophouse — Dry-Aged Steakhouse
   template-09-steakhouse (layout V3)
   Vanilla JS: mobile nav, menu tabs, form validation,
   scrollspy, scroll-reveal, back-to-top, scroll progress
   ========================================================== */
(function () {
  'use strict';

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile navigation ---------- */
  var navToggle = qs('.nav-toggle');
  var navMenu = qs('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    qsa('a', navMenu).forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* ---------- header scroll state ---------- */
  var header = qs('.site-header');
  function onHeaderScroll() {
    if (header) { header.classList.toggle('scrolled', window.scrollY > 10); }
  }
  window.addEventListener('scroll', onHeaderScroll, { passive: true });
  onHeaderScroll();

  /* ---------- footer year ---------- */
  qsa('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- back to top ---------- */
  var toTop = qs('[data-totop]');
  if (toTop) {
    var onTopScroll = function () {
      toTop.classList.toggle('show', window.scrollY > 560);
    };
    window.addEventListener('scroll', onTopScroll, { passive: true });
    onTopScroll();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- scrollspy (aria-current) ---------- */
  var spyLinks = qsa('.nav-link[href^="#"]');
  var spyMap = {};
  spyLinks.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var sec = id ? document.getElementById(id) : null;
    if (sec) { spyMap[id] = link; }
  });
  var spyIds = Object.keys(spyMap);
  if ('IntersectionObserver' in window && spyIds.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        spyLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
        var link = spyMap[entry.target.id];
        if (link) { link.setAttribute('aria-current', 'true'); }
      });
    }, { rootMargin: '-38% 0px -56% 0px', threshold: 0 });
    spyIds.forEach(function (id) { spy.observe(document.getElementById(id)); });
  }

  /* ---------- staggered scroll-reveal ---------- */
  var revealEls = qsa('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window && !reduceMotion) {
    revealEls.forEach(function (el) {
      var sibs = el.parentElement ? qsa(':scope > [data-reveal]', el.parentElement) : [el];
      var idx = sibs.indexOf(el);
      el.style.transitionDelay = (Math.max(idx, 0) % 8) * 70 + 'ms';
      el.classList.add('js-reveal');
    });
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------- hours: highlight today ---------- */
  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var idnDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var todayName = dayNames[new Date().getDay()];
  var todayIdn = idnDays[new Date().getDay()];
  qsa('[data-hours] li').forEach(function (row) {
    var label = row.firstElementChild ? row.firstElementChild.textContent : '';
    if (label.indexOf(todayName) === 0 || label.indexOf(todayIdn) === 0) {
      row.classList.add('is-today');
    }
  });

  /* ---------- menu tabs ---------- */
  var tabs = qsa('[data-tab]');
  var panels = qsa('[data-panel]');
  if (tabs.length && panels.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('data-tab');
        tabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach(function (p) {
          var show = p.getAttribute('data-panel') === id;
          if (show) { p.removeAttribute('hidden'); } else { p.setAttribute('hidden', ''); }
        });
      });
    });
  }

  /* ---------- form validation ---------- */
  var form = qs('#main-form');
  if (form) {
    var success = qs('#form-success', form);
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var dateInput = qs('input[type="date"]', form);
    if (dateInput) {
      var now = new Date();
      var pad = function (n) { return n < 10 ? '0' + n : String(n); };
      dateInput.min = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
    }

    function ruleFails(kind, value) {
      var v = value.trim();
      if (kind === 'name') { return v.length < 2; }
      if (kind === 'email') { return !emailRe.test(v); }
      if (kind === 'date') { return v === ''; }
      if (kind === 'guests') { return v === ''; }
      if (kind === 'address') { return v.length < 8; }
      if (kind === 'note') { return v.length < 4; }
      return false;
    }

    function checkField(input) {
      var kind = input.getAttribute('data-validate');
      var bad = ruleFails(kind, input.value || '');
      var wrap = input.closest ? input.closest('.field') : null;
      var err = qs('#err-' + input.id);
      if (wrap) { wrap.classList.toggle('invalid', bad); }
      if (err) { if (bad) { err.removeAttribute('hidden'); } else { err.setAttribute('hidden', ''); } }
      input.setAttribute('aria-invalid', bad ? 'true' : 'false');
      return !bad;
    }

    var fields = qsa('[data-validate]', form);
    fields.forEach(function (input) {
      var evt = input.tagName === 'SELECT' || input.type === 'date' ? 'change' : 'input';
      input.addEventListener(evt, function () { checkField(input); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allOk = true;
      var firstBad = null;
      fields.forEach(function (input) {
        var ok = checkField(input);
        if (!ok && !firstBad) { firstBad = input; }
        allOk = allOk && ok;
      });
      if (!allOk) {
        if (success) { success.setAttribute('hidden', ''); }
        if (firstBad) { firstBad.focus(); }
        return;
      }
      if (success) { success.removeAttribute('hidden'); }
      form.reset();
      fields.forEach(function (input) {
        input.setAttribute('aria-invalid', 'false');
        var wrap = input.closest ? input.closest('.field') : null;
        if (wrap) { wrap.classList.remove('invalid'); }
      });
    });
  }

  /* ---------- scroll progress hairline ---------- */
  var progress = qs('[data-progress]');
  if (progress) {
    var onProgress = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)) + '%';
    };
    window.addEventListener('scroll', onProgress, { passive: true });
    window.addEventListener('resize', onProgress);
    onProgress();
  }

  /* ---------- menu-page: sticky category nav ---------- */
  (function () {
    var catnav = document.querySelector('[data-mp-catnav]');
    if (!catnav) { return; }

    /* reveal-safety: on the full-menu page, make sure any data-reveal element
       that is already in or above the viewport on load (e.g. when arriving on a
       deep #menu-... anchor) is shown immediately rather than stuck hidden.
       Complements the shared scroll-reveal observer; fully null-safe. */
    function revealInView() {
      var els = document.querySelectorAll('[data-reveal].js-reveal');
      var vh = window.innerHeight || document.documentElement.clientHeight;
      Array.prototype.forEach.call(els, function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.96) { el.classList.add('is-in'); }
      });
    }
    function revealHashTarget() {
      var h = window.location.hash;
      if (!h || h.length < 2) { return; }
      var t = document.getElementById(h.slice(1));
      if (!t) { return; }
      if (t.classList && t.classList.contains('js-reveal')) { t.classList.add('is-in'); }
      var inner = t.querySelectorAll ? t.querySelectorAll('[data-reveal].js-reveal') : [];
      Array.prototype.forEach.call(inner, function (el) { el.classList.add('is-in'); });
    }
    // run after the shared reveal script has tagged js-reveal (it runs at parse).
    revealHashTarget();
    revealInView();
    window.setTimeout(function () { revealHashTarget(); revealInView(); }, 60);
    window.addEventListener('load', function () { revealHashTarget(); revealInView(); });
    window.addEventListener('hashchange', revealHashTarget);

    var jumps = Array.prototype.slice.call(catnav.querySelectorAll('.mp-jump'));
    if (!jumps.length) { return; }
    var map = {};
    jumps.forEach(function (a) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#') { return; }
      var id = href.slice(1);
      var sec = id ? document.getElementById(id) : null;
      if (sec) { map[id] = a; }
    });
    var ids = Object.keys(map);
    if (!ids.length) { return; }
    function clearCurrent() {
      jumps.forEach(function (a) { a.classList.remove('is-current'); });
    }
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) { return; }
          clearCurrent();
          var a = map[entry.target.id];
          if (a) {
            a.classList.add('is-current');
            if (a.scrollIntoView) {
              try { a.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) {}
            }
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
      ids.forEach(function (id) { obs.observe(document.getElementById(id)); });
    }
    jumps.forEach(function (a) {
      a.addEventListener('click', function () {
        clearCurrent();
        a.classList.add('is-current');
      });
    });
  })();

})();

/* ==========================================================
   About page count-up stats (added) — null-safe, reduced-motion aware
   ========================================================== */
(function () {
  'use strict';
  var els = document.querySelectorAll('.ab-count[data-count]');
  if (!els.length) { return; }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function run(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) { return; }
    if (reduce || !('requestAnimationFrame' in window)) {
      el.textContent = String(target);
      return;
    }
    var dur = 1100, start = null;
    function step(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) { window.requestAnimationFrame(step); }
      else { el.textContent = String(target); }
    }
    window.requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          run(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(els, run);
  }
})();
