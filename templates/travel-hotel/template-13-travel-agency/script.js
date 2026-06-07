/* ============================================================
   Wayfare & Co. - Travel Agency
   template-13-travel-agency (variant V2)
   Vanilla JS, no dependencies: mobile nav, header state,
   scrollspy, scroll-reveal, booking validation, FAQ accordion,
   back-to-top and scroll progress. Shared across both pages.
   ============================================================ */
(function () {
  'use strict';

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }
  var reduceMotion = !!(window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches);

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
        if (navToggle.focus) { navToggle.focus(); }
      }
    });
  }

  /* ---------- header scroll state ---------- */
  var header = qs('.site-header');
  function onHeaderScroll() {
    if (header) { header.classList.toggle('scrolled', window.scrollY > 8); }
  }
  window.addEventListener('scroll', onHeaderScroll, { passive: true });
  onHeaderScroll();

  /* ---------- footer year(s) ---------- */
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

  /* ---------- scrollspy (aria-current via IntersectionObserver) ---------- */
  var spyLinks = qsa('.nav-link[data-spy]');
  var spyMap = {};
  spyLinks.forEach(function (link) {
    var href = link.getAttribute('href') || '';
    var hashAt = href.indexOf('#');
    var id = hashAt >= 0 ? href.slice(hashAt + 1) : '';
    var sec = id ? document.getElementById(id) : null;
    if (sec) { spyMap[id] = link; }
  });
  var spyIds = Object.keys(spyMap);
  if ('IntersectionObserver' in window && spyIds.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        spyLinks.forEach(function (l) {
          if (l.getAttribute('aria-current') !== 'page') {
            l.removeAttribute('aria-current');
          }
        });
        var link = spyMap[entry.target.id];
        if (link && link.getAttribute('aria-current') !== 'page') {
          link.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    spyIds.forEach(function (id) {
      var node = document.getElementById(id);
      if (node) { spy.observe(node); }
    });
  }

  /* ---------- staggered scroll-reveal (reduced-motion safe) ---------- */
  var revealEls = qsa('[data-reveal]');
  function revealNow(el) {
    if (el && !el.classList.contains('is-in')) { el.classList.add('is-in'); }
  }
  if (revealEls.length && 'IntersectionObserver' in window && !reduceMotion) {
    revealEls.forEach(function (el) {
      var parent = el.parentElement;
      var sibs = parent ? qsa(':scope > [data-reveal]', parent) : [el];
      var idx = sibs.indexOf(el);
      el.style.transitionDelay = (Math.max(idx, 0) % 6) * 60 + 'ms';
      el.classList.add('js-reveal');
    });
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          revealNow(entry.target);
          revealIO.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    revealEls.forEach(function (el) { revealIO.observe(el); });
    /* safety net: never leave content hidden. Reveal anything in/above the
       viewport on load, and force-reveal everything after a short grace. */
    var sweep = function () {
      var vh = window.innerHeight || 0;
      revealEls.forEach(function (el) {
        if (el.classList.contains('is-in')) { return; }
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.94) { revealNow(el); revealIO.unobserve(el); }
      });
    };
    window.addEventListener('load', sweep);
    sweep();
    window.setTimeout(function () {
      revealEls.forEach(function (el) { revealNow(el); });
    }, 1400);
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- booking / enquiry widget ---------- */
  var booking = qs('[data-booking]');
  if (booking) {
    var success = qs('[data-success]', booking);
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    var today = new Date();
    var todayStr = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());
    qsa('input[type="date"]', booking).forEach(function (di) { di.min = todayStr; });

    function fieldWrap(input) {
      return input.closest ? input.closest('.field') : null;
    }
    function errFor(input) {
      return input.id ? qs('#err-' + input.id) : null;
    }
    function fails(kind, value, input) {
      var v = (value || '').trim();
      if (kind === 'name') { return v.length < 2; }
      if (kind === 'email') { return !emailRe.test(v); }
      if (kind === 'date') { return v === ''; }
      if (kind === 'select') { return v === ''; }
      if (kind === 'dateout') {
        if (v === '') { return true; }
        var inEl = booking ? qs('[data-validate="date"]', booking) : null;
        if (inEl && inEl.value && v <= inEl.value) { return true; }
        return false;
      }
      return false;
    }
    function check(input) {
      var kind = input.getAttribute('data-validate');
      var bad = fails(kind, input.value, input);
      var wrap = fieldWrap(input);
      var err = errFor(input);
      if (wrap) { wrap.classList.toggle('invalid', bad); }
      if (err) {
        if (bad) { err.removeAttribute('hidden'); } else { err.setAttribute('hidden', ''); }
      }
      input.setAttribute('aria-invalid', bad ? 'true' : 'false');
      return !bad;
    }
    var fields = qsa('[data-validate]', booking);
    fields.forEach(function (input) {
      var ev = (input.tagName === 'SELECT' || input.type === 'date') ? 'change' : 'input';
      input.addEventListener(ev, function () {
        check(input);
        if (success && !success.hasAttribute('hidden')) {
          success.setAttribute('hidden', '');
        }
      });
    });
    booking.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;
      fields.forEach(function (input) {
        var good = check(input);
        if (!good && !firstBad) { firstBad = input; }
        ok = ok && good;
      });
      if (!ok) {
        if (success) { success.setAttribute('hidden', ''); }
        if (firstBad && firstBad.focus) { firstBad.focus(); }
        return;
      }
      if (success) {
        success.removeAttribute('hidden');
        if (success.focus) { success.focus(); }
      }
      booking.reset();
      fields.forEach(function (input) {
        input.setAttribute('aria-invalid', 'false');
        var wrap = fieldWrap(input);
        if (wrap) { wrap.classList.remove('invalid'); }
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  qsa('[data-accordion] .acc-trigger').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var ctrl = btn.getAttribute('aria-controls');
      var panel = ctrl ? document.getElementById(ctrl) : null;
      if (!panel) {
        var host = btn.parentElement;
        panel = host ? host.nextElementSibling : btn.nextElementSibling;
      }
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (panel) {
        if (open) { panel.setAttribute('hidden', ''); }
        else { panel.removeAttribute('hidden'); }
      }
    });
  });

  /* ---------- delegated placeholder-link guard ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var a = t && t.closest ? t.closest('a[href="#"]') : null;
    if (a) { e.preventDefault(); }
  });

  /* ---------- scroll-progress hairline ---------- */
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

})();

/* ===== TH new pages additions ===== */

/* ============================================================
   New-page behaviours: stat count-up, gallery filter, contact
   form validation. Appended; all null-safe, no dependencies.
   ============================================================ */
(function () {
  'use strict';
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---------- stat count-up ---------- */
  var counters = qsa('[data-count]');
  if (counters.length) {
    var runCount = function (el) {
      if (el.getAttribute('data-counted') === '1') { return; }
      el.setAttribute('data-counted', '1');
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) { return; }
      if (reduceMotion) { el.textContent = target.toLocaleString(); return; }
      var dur = 1400, start = null;
      var step = function (ts) {
        if (start === null) { start = ts; }
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString();
        if (p < 1) { window.requestAnimationFrame(step); }
        else { el.textContent = target.toLocaleString(); }
      };
      window.requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var cIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { runCount(e.target); cIO.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { cIO.observe(el); });
    } else {
      counters.forEach(runCount);
    }
  }

  /* ---------- gallery filter ---------- */
  var galWrap = qs('[data-gallery]');
  var galGrid = qs('[data-gallery-grid]');
  if (galWrap && galGrid) {
    var chips = qsa('.chip', galWrap);
    var items = qsa('.gal-item', galGrid);
    var empty = qs('[data-gallery-empty]');
    var apply = function (filter) {
      var shown = 0;
      items.forEach(function (it) {
        var cat = it.getAttribute('data-cat');
        var match = (filter === 'all' || cat === filter);
        it.classList.toggle('is-hidden', !match);
        if (match) { shown++; }
      });
      if (empty) {
        if (shown === 0) { empty.removeAttribute('hidden'); }
        else { empty.setAttribute('hidden', ''); }
      }
    };
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
        chip.classList.add('is-active');
        chip.setAttribute('aria-pressed', 'true');
        apply(chip.getAttribute('data-filter') || 'all');
      });
    });
  }

  /* ---------- contact enquiry form validation ---------- */
  var cform = qs('[data-contact]');
  if (cform) {
    var success = qs('[data-success]', cform);
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    var today = new Date();
    var todayStr = today.getFullYear() + '-' + pad(today.getMonth() + 1) + '-' + pad(today.getDate());
    qsa('input[type="date"]', cform).forEach(function (di) { di.min = todayStr; });

    var fieldWrap = function (input) { return input.closest ? input.closest('.field') : null; };
    var errFor = function (input) { return input.id ? qs('#err-' + input.id) : null; };
    var fails = function (kind, value) {
      var v = (value || '').trim();
      if (kind === 'name') { return v.length < 2; }
      if (kind === 'email') { return !emailRe.test(v); }
      if (kind === 'date') { return v === ''; }
      if (kind === 'select') { return v === ''; }
      if (kind === 'message') { return v.length < 10; }
      return false;
    };
    var check = function (input) {
      var kind = input.getAttribute('data-validate');
      var bad = fails(kind, input.value);
      var wrap = fieldWrap(input), err = errFor(input);
      if (wrap) { wrap.classList.toggle('invalid', bad); }
      if (err) { if (bad) { err.removeAttribute('hidden'); } else { err.setAttribute('hidden', ''); } }
      input.setAttribute('aria-invalid', bad ? 'true' : 'false');
      return !bad;
    };
    var fields = qsa('[data-validate]', cform);
    fields.forEach(function (input) {
      var ev = (input.tagName === 'SELECT' || input.type === 'date') ? 'change' : 'input';
      input.addEventListener(ev, function () {
        check(input);
        if (success && !success.hasAttribute('hidden')) { success.setAttribute('hidden', ''); }
      });
    });
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, firstBad = null;
      fields.forEach(function (input) {
        var good = check(input);
        if (!good && !firstBad) { firstBad = input; }
        ok = ok && good;
      });
      if (!ok) {
        if (success) { success.setAttribute('hidden', ''); }
        if (firstBad && firstBad.focus) { firstBad.focus(); }
        return;
      }
      if (success) { success.removeAttribute('hidden'); if (success.focus) { success.focus(); } }
      cform.reset();
      fields.forEach(function (input) {
        input.setAttribute('aria-invalid', 'false');
        var wrap = fieldWrap(input);
        if (wrap) { wrap.classList.remove('invalid'); }
      });
    });
  }
})();
