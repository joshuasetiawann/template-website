/* Sentinel IT — Managed IT Services | V1 (corporate-trust)
   Shared vanilla JS (null-safe, no dependencies). Behaviours:
   mobile nav, header shadow, count-up stats, scroll-reveal (reduced-motion safe),
   FAQ accordion, project/enquiry form validation + success, budget helper,
   back-to-top, delegated data-demo-link guard.
   build-seed: 4673 | role: script | brand-key: template-05-managed-it */
(function () {
  'use strict';
  function qs(s, r) { return (r || document).querySelector(s); }
  function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  var reduceMotion = false;
  try { reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  catch (e) { reduceMotion = false; }

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
        if (navToggle.focus) { navToggle.focus(); }
      }
    });
  }

  /* header shadow on scroll */
  var header = qs('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* count-up stats */
  function fmtNum(n) { return n >= 10000 ? n.toLocaleString('en-US') : String(n); }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count') || '0');
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var decimals = (String(target).split('.')[1] || '').length;
    var start = null, dur = 1600;
    function step(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      var shown = decimals ? val.toFixed(decimals) : fmtNum(Math.round(val));
      el.textContent = prefix + shown + suffix;
      if (p < 1) { window.requestAnimationFrame(step); }
    }
    window.requestAnimationFrame(step);
  }
  var counters = qsa('[data-count]');
  if (counters.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        var n = parseFloat(el.getAttribute('data-count') || '0');
        var d = (String(n).split('.')[1] || '').length;
        el.textContent = (el.getAttribute('data-prefix') || '')
          + (d ? n.toFixed(d) : fmtNum(Math.round(n)))
          + (el.getAttribute('data-suffix') || '');
      });
    } else {
      var co = new window.IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animateCount(en.target); obs.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { el.textContent = (el.getAttribute('data-prefix') || '') + '0' + (el.getAttribute('data-suffix') || ''); co.observe(el); });
    }
  }

  /* progress / meter bars */
  var bars = qsa('[data-bar]');
  if (bars.length) {
    var setBars = function () { bars.forEach(function (b) { b.style.width = (b.getAttribute('data-bar') || '0') + '%'; }); };
    if ('IntersectionObserver' in window && !reduceMotion) {
      var bo = new window.IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.style.width = (en.target.getAttribute('data-bar') || '0') + '%'; obs.unobserve(en.target); }
        });
      }, { threshold: 0.3 });
      bars.forEach(function (b) { bo.observe(b); });
    } else { setBars(); }
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

  /* project / enquiry form (contact page) */
  var pform = qs('#project-form');
  if (pform) {
    var pn = qs('#pf-name', pform), pe = qs('#pf-email', pform),
        pc = qs('#pf-company', pform), pb = qs('#pf-budget', pform),
        pm = qs('#pf-message', pform), pok = qs('#project-ok');
    function ckN() { return setErr(pn, 'err-pf-name', !pn || pn.value.trim().length < 2); }
    function ckE() { return setErr(pe, 'err-pf-email', !pe || !emailRe.test(pe.value.trim())); }
    function ckC() { return setErr(pc, 'err-pf-company', !pc || pc.value.trim().length < 2); }
    function ckB() { return setErr(pb, 'err-pf-budget', !pb || !pb.value); }
    function ckM() { return setErr(pm, 'err-pf-message', !pm || pm.value.trim().length < 10); }
    [[pn, ckN], [pe, ckE], [pc, ckC], [pm, ckM]].forEach(function (p) {
      if (p[0]) { p[0].addEventListener('input', function () { if (p[0].getAttribute('aria-invalid') === 'true') { p[1](); } }); }
    });
    if (pb) { pb.addEventListener('change', function () { if (pb.getAttribute('aria-invalid') === 'true') { ckB(); } }); }
    pform.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = ckN(); ok = ckE() && ok; ok = ckC() && ok; ok = ckB() && ok; ok = ckM() && ok;
      if (!ok) {
        var fb = qs('.field.invalid input, .field.invalid select, .field.invalid textarea', pform);
        if (fb && fb.focus) { fb.focus(); }
        if (pok) { pok.hidden = true; }
        return;
      }
      if (pok) { pok.hidden = false; if (pok.focus) { pok.focus(); } }
      pform.reset();
      qsa('.field', pform).forEach(function (f) { f.classList.remove('invalid'); });
      window.setTimeout(function () { if (pok) { pok.hidden = true; } }, 7000);
    });
  }

  /* budget helper text on contact form */
  var budgetSel = qs('#pf-budget');
  var budgetHint = qs('#budget-hint');
  if (budgetSel && budgetHint) {
    var hints = {
      'under-10k': 'A focused, single-outcome engagement — ideal for a sprint or assessment.',
      '10k-50k': 'Room for a substantial build with discovery, delivery and a handover.',
      '50k-150k': 'A multi-phase programme with dedicated specialists across the lifecycle.',
      '150k-plus': 'An enterprise engagement — let us tailor a long-term partnership.',
      'not-sure': "No problem — tell us the outcome you need and we'll shape a plan and an estimate."
    };
    var updateHint = function () {
      var v = budgetSel.value;
      budgetHint.textContent = hints[v] || 'Choose a range so we can recommend the right engagement model.';
    };
    budgetSel.addEventListener('change', updateHint);
    updateHint();
  }

  /* scroll reveal (reduced-motion safe) */
  var revealEls = qsa('.reveal, .sec-head, .svc-card, .why-card, .step, .stat, .case-card, .quote-card, .member, .value, .price-card, .info-card, .logo-chip, .tl-item');
  if (!reduceMotion && revealEls.length && 'IntersectionObserver' in window) {
    var ro = new window.IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        en.target.classList.add('in-view');
        obs.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(function (el) { el.classList.add('pre-reveal'); ro.observe(el); });
  }

  /* back to top */
  var toTop = qs('[data-totop]');
  if (toTop) {
    var tick = function () { toTop.classList.toggle('show', window.scrollY > 540); };
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    toTop.addEventListener('click', function () {
      if (reduceMotion) { window.scrollTo(0, 0); return; }
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (er) { window.scrollTo(0, 0); }
    });
  }

  /* delegated demo-link guard: placeholder links never navigate */
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-demo-link], a[href="#"]') : null;
    if (t) { e.preventDefault(); }
  });
})();
