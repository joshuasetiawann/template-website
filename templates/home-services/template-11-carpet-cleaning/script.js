/* PureFiber Carpet Care — home-services shared script (V2)
   One null-safe vanilla-JS IIFE: mobile nav, header shadow, count-up stats,
   quote/booking form validation + success, FAQ accordion, scroll-reveal,
   back-to-top and a delegated demo-link guard. Every selector is guarded.
   slug:template-11-carpet-cleaning seed:196623 */
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
  function fmt(n) { return n >= 10000 ? n.toLocaleString('en-US') : String(n); }
  function animateCount(el) {
    var raw = el.getAttribute('data-count') || '0';
    var isFloat = raw.indexOf('.') !== -1;
    var target = isFloat ? parseFloat(raw) : parseInt(raw, 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var start = null, dur = 1500;
    function render(val) {
      var out = isFloat ? val.toFixed(1) : fmt(Math.round(val));
      el.textContent = out + suffix;
    }
    function step(ts) {
      if (start === null) { start = ts; }
      var prog = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - prog, 3);
      render(target * eased);
      if (prog < 1) { window.requestAnimationFrame(step); }
    }
    window.requestAnimationFrame(step);
  }
  var counters = qsa('.count');
  if (counters.length) {
    if (reduceMotion) {
      counters.forEach(function (el) {
        var raw = el.getAttribute('data-count') || '0';
        var suffix = el.getAttribute('data-suffix') || '';
        var isF = raw.indexOf('.') !== -1;
        el.textContent = (isF ? parseFloat(raw).toFixed(1) : fmt(parseInt(raw, 10))) + suffix;
      });
    } else if ('IntersectionObserver' in window) {
      var co = new window.IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { animateCount(en.target); obs.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { el.textContent = '0'; co.observe(el); });
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---- form validation helpers ---- */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setErr(input, errId, bad) {
    var err = qs('#' + errId);
    var wrap = input && input.closest ? input.closest('.field') : null;
    if (err) { err.hidden = !bad; }
    if (wrap) { wrap.classList.toggle('invalid', bad); }
    if (input) { input.setAttribute('aria-invalid', bad ? 'true' : 'false'); }
    return !bad;
  }

  /* quote / booking forms (data-quote) — service, date, [address], name, email */
  qsa('form[data-quote]').forEach(function (form) {
    var fid = form.id;
    var fService = qs('#' + fid + '-service', form);
    var fDate = qs('#' + fid + '-date', form);
    var fAddress = qs('#' + fid + '-address', form);
    var fName = qs('#' + fid + '-name', form);
    var fEmail = qs('#' + fid + '-email', form);
    var okMsg = qs('#' + fid + '-ok');

    function ckService() { return setErr(fService, fid + '-err-service', !fService || fService.value === ''); }
    function ckDate() { return setErr(fDate, fid + '-err-date', !fDate || fDate.value === ''); }
    function ckAddress() { return !fAddress || setErr(fAddress, fid + '-err-address', fAddress.value.trim().length < 10); }
    function ckName() { return setErr(fName, fid + '-err-name', !fName || fName.value.trim().length < 2); }
    function ckEmail() { return setErr(fEmail, fid + '-err-email', !fEmail || !emailRe.test(fEmail.value.trim())); }

    var pairs = [[fService, ckService], [fDate, ckDate], [fAddress, ckAddress], [fName, ckName], [fEmail, ckEmail]];
    pairs.forEach(function (pr) {
      if (!pr[0]) { return; }
      var ev = (pr[0].tagName === 'SELECT' || pr[0].type === 'date') ? 'change' : 'input';
      pr[0].addEventListener(ev, function () {
        if (pr[0].getAttribute('aria-invalid') === 'true') { pr[1](); }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = ckService();
      ok = ckDate() && ok;
      ok = ckAddress() && ok;
      ok = ckName() && ok;
      ok = ckEmail() && ok;
      if (!ok) {
        if (okMsg) { okMsg.hidden = true; }
        var firstBad = qs('.field.invalid input, .field.invalid select, .field.invalid textarea', form);
        if (firstBad && firstBad.focus) { firstBad.focus(); }
        return;
      }
      if (okMsg) { okMsg.hidden = false; }
      form.reset();
      qsa('.field', form).forEach(function (f) { f.classList.remove('invalid'); });
      qsa('[aria-invalid]', form).forEach(function (i) { i.setAttribute('aria-invalid', 'false'); });
      if (okMsg && okMsg.scrollIntoView && !reduceMotion) {
        try { okMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (er) {}
      }
      window.setTimeout(function () { if (okMsg) { okMsg.hidden = true; } }, 8000);
    });
  });

  /* FAQ accordion */
  qsa('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = qs('#' + btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (panel) { panel.hidden = open; }
    });
  });

  /* scroll reveal */
  var revealEls = qsa('.sec-head, .svc-card, .why-card, .step, .tcard, .member, .value, .guar, .plan, .info-card, .service-row, .cert-seal, .gtile, .area-chip, .trust-pt');
  if (!reduceMotion && revealEls.length && 'IntersectionObserver' in window) {
    var ro = new window.IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        en.target.classList.add('in-view');
        obs.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { el.classList.add('pre-reveal'); ro.observe(el); });
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

  /* delegated demo-link guard: '#' / data-demo-link placeholders never navigate */
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-demo-link], a[href="#"]') : null;
    if (t) { e.preventDefault(); }
  });
})();
