/* Skyline Hoops — Basketball Team | V1
   Shared vanilla JS (null-safe): mobile nav, header shadow, count-up stats,
   schedule day-tabs, FAQ accordion, join/booking + contact form validation,
   scroll-reveal, back-to-top, delegated demo-link guard.
   seed:3561 */
(function () {
  'use strict';
  function qs(s, r) { return (r || document).querySelector(s); }
  function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  var reduceMotion = false;
  try { reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  catch (e) { reduceMotion = false; }

  /* mark JS active so reveal hiding only applies when JS can reveal it again */
  document.documentElement.classList.add('js-on');

  /* footer year */
  qsa('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* mobile nav */
  var navToggle = qs('.nav-toggle');
  var navMenu = qs('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    qsa('a', navMenu).forEach(function (a) {
      a.addEventListener('click', function () {
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

  /* header shadow on scroll */
  var header = qs('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* count-up stats */
  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count') || '0', 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var start = null, dur = 1500;
    function fmt(n) { return n >= 10000 ? n.toLocaleString('en-US') : String(n); }
    function step(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(Math.round(target * eased)) + suffix;
      if (p < 1) { window.requestAnimationFrame(step); }
    }
    window.requestAnimationFrame(step);
  }
  var counters = qsa('.count');
  if (counters.length) {
    if (reduceMotion) {
      counters.forEach(function (el) {
        var n = parseInt(el.getAttribute('data-count') || '0', 10);
        var s = el.getAttribute('data-suffix') || '';
        var pf = el.getAttribute('data-prefix') || '';
        el.textContent = pf + (n >= 10000 ? n.toLocaleString('en-US') : String(n)) + s;
      });
    } else if ('IntersectionObserver' in window) {
      var co = new window.IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animateCount(en.target); obs.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { el.textContent = '0'; co.observe(el); });
    } else { counters.forEach(animateCount); }
  }

  /* schedule day-tabs (null-safe) */
  var sched = qs('[data-schedule]');
  if (sched) {
    var tabs = qsa('.sched-tab', sched);
    var panels = qsa('.sched-panel', sched);
    function selectDay(day) {
      tabs.forEach(function (tb) {
        var on = tb.getAttribute('data-day') === day;
        tb.setAttribute('aria-selected', on ? 'true' : 'false');
        tb.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (pn) {
        pn.hidden = pn.getAttribute('data-day-panel') !== day;
      });
    }
    tabs.forEach(function (tb, i) {
      tb.addEventListener('click', function () { selectDay(tb.getAttribute('data-day')); });
      tb.addEventListener('keydown', function (e) {
        var idx = -1;
        if (e.key === 'ArrowRight') { idx = (i + 1) % tabs.length; }
        else if (e.key === 'ArrowLeft') { idx = (i - 1 + tabs.length) % tabs.length; }
        if (idx > -1) { e.preventDefault(); tabs[idx].focus(); selectDay(tabs[idx].getAttribute('data-day')); }
      });
    });
    if (tabs.length) { selectDay(tabs[0].getAttribute('data-day')); }
  }

  /* FAQ accordion */
  qsa('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = qs('#' + btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (panel) { panel.hidden = open; }
    });
  });

  /* generic validated-form helper */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setErr(input, errId, bad) {
    var err = qs('#' + errId);
    var wrap = input ? (input.closest ? input.closest('.field') : null) : null;
    if (err) { err.hidden = !bad; }
    if (wrap) { wrap.classList.toggle('invalid', bad); }
    if (input) { input.setAttribute('aria-invalid', bad ? 'true' : 'false'); }
    return !bad;
  }

  /* join / booking / trial mini-form */
  qsa('[data-book-form]').forEach(function (form) {
    var fn = qs('[data-f="name"]', form);
    var fe = qs('[data-f="email"]', form);
    var fp = qs('[data-f="program"]', form);
    var ok = qs('[data-ok]', form);
    var nameErr = form.getAttribute('id') + '-err-name';
    var emailErr = form.getAttribute('id') + '-err-email';
    var progErr = form.getAttribute('id') + '-err-program';
    function ckN() { return setErr(fn, nameErr, !fn || fn.value.trim().length < 2); }
    function ckE() { return setErr(fe, emailErr, !fe || !emailRe.test(fe.value.trim())); }
    function ckP() { return !fp || setErr(fp, progErr, fp.value === ''); }
    [[fn, ckN], [fe, ckE], [fp, ckP]].forEach(function (pair) {
      if (pair[0]) {
        var ev = pair[0].tagName === 'SELECT' ? 'change' : 'input';
        pair[0].addEventListener(ev, function () { if (pair[0].getAttribute('aria-invalid') === 'true') { pair[1](); } });
      }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var good = ckN(); good = ckE() && good; good = ckP() && good;
      if (!good) {
        var fb = qs('.field.invalid input, .field.invalid select', form);
        if (fb) { fb.focus(); }
        if (ok) { ok.hidden = true; }
        return;
      }
      if (ok) { ok.hidden = false; }
      form.reset();
      qsa('.field', form).forEach(function (f) { f.classList.remove('invalid'); });
      window.setTimeout(function () { if (ok) { ok.hidden = true; } }, 7000);
    });
  });

  /* contact form */
  var cform = qs('#contact-form');
  if (cform) {
    var cn = qs('#cf-name', cform), ce = qs('#cf-email', cform), cm = qs('#cf-msg', cform), cok = qs('#contact-ok', cform);
    function ccN() { return setErr(cn, 'err-cf-name', !cn || cn.value.trim().length < 2); }
    function ccE() { return setErr(ce, 'err-cf-email', !ce || !emailRe.test(ce.value.trim())); }
    function ccM() { return setErr(cm, 'err-cf-msg', !cm || cm.value.trim().length < 10); }
    [[cn, ccN], [ce, ccE], [cm, ccM]].forEach(function (p) {
      if (p[0]) { p[0].addEventListener('input', function () { if (p[0].getAttribute('aria-invalid') === 'true') { p[1](); } }); }
    });
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      var good = ccN(); good = ccE() && good; good = ccM() && good;
      if (!good) { var fb = qs('.field.invalid input, .field.invalid textarea', cform); if (fb) { fb.focus(); } if (cok) { cok.hidden = true; } return; }
      if (cok) { cok.hidden = false; }
      cform.reset();
      qsa('.field', cform).forEach(function (f) { f.classList.remove('invalid'); });
      window.setTimeout(function () { if (cok) { cok.hidden = true; } }, 7000);
    });
  }

  /* newsletter form */
  var nform = qs('#news-form');
  if (nform) {
    var nemail = qs('#news-email', nform), nok = qs('#news-ok', nform);
    function ckNews() { return setErr(nemail, 'err-news', !nemail || !emailRe.test(nemail.value.trim())); }
    if (nemail) { nemail.addEventListener('input', function () { if (nemail.getAttribute('aria-invalid') === 'true') { ckNews(); } }); }
    nform.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!ckNews()) { if (nok) { nok.hidden = true; } if (nemail) { nemail.focus(); } return; }
      if (nok) { nok.hidden = false; }
      nform.reset();
      window.setTimeout(function () { if (nok) { nok.hidden = true; } }, 6000);
    });
  }

  /* scroll reveal */
  var revealEls = qsa('.sec-head, .card, .feat, .member, .quote, .tier, .fixture, .info-card, .stat, .prog-row, .acc, .booking, .split-art');
  function revealAll() { revealEls.forEach(function (el) { el.classList.add('in-view'); }); }
  if (!reduceMotion && revealEls.length && 'IntersectionObserver' in window) {
    var ro = new window.IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        en.target.classList.add('in-view');
        obs.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { el.classList.add('pre-reveal'); ro.observe(el); });
    /* safety net: if anything is still hidden after 2.6s (e.g. off-screen on a tall
       page that never scrolls), reveal it so content is never permanently invisible */
    window.setTimeout(function () {
      revealEls.forEach(function (el) {
        if (!el.classList.contains('in-view')) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 1.4) { el.classList.add('in-view'); }
        }
      });
    }, 2600);
  } else {
    revealAll();
  }

  /* back to top */
  var toTop = qs('[data-totop]');
  if (toTop) {
    var tick = function () { toTop.classList.toggle('show', window.scrollY > 560); };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    toTop.addEventListener('click', function () {
      if (reduceMotion) { window.scrollTo(0, 0); return; }
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (er) { window.scrollTo(0, 0); }
    });
  }

  /* delegated demo-link guard: dead "#" / data-demo-link placeholders never navigate */
  document.addEventListener('click', function (e) {
    var target = e.target && e.target.closest ? e.target.closest('[data-demo-link], a[href="#"]') : null;
    if (target) { e.preventDefault(); }
  });
})();
