/* Pulse Avenue - Nightclub | V4
   Shared vanilla JS (null-safe): mobile nav, fake audio player + EQ,
   events city/month filter, newsletter + booking validation, accordion,
   count-up stats, scroll-reveal, back-to-top, demo-link guard.
   seed:7017 */
(function () {
  'use strict';
  function qs(s, r) { return (r || document).querySelector(s); }
  function qsa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function on(el, ev, fn, opt) { if (el) { el.addEventListener(ev, fn, opt || false); } }

  var reduceMotion = false;
  try { reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  catch (e) { reduceMotion = false; }

  /* footer year */
  qsa('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* mobile nav */
  var navToggle = qs('.nav-toggle');
  var navMenu = qs('.nav-menu');
  if (navToggle && navMenu) {
    on(navToggle, 'click', function () {
      var open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    qsa('a', navMenu).forEach(function (a) {
      on(a, 'click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    on(document, 'keydown', function (e) {
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
    on(window, 'scroll', onScroll, { passive: true });
    onScroll();
  }

  /* fake audio player: play/pause toggle + EQ animation (CSS-driven, null-safe) */
  qsa('[data-player]').forEach(function (player) {
    var btn = qs('.player-btn', player);
    var stateLabel = qs('.player-state', player);
    if (!btn) { return; }
    var playing = false;
    function setState(p) {
      playing = p;
      player.classList.toggle('is-playing', playing);
      btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      btn.setAttribute('aria-label', playing ? 'Pause preview' : 'Play preview');
      if (stateLabel) { stateLabel.textContent = playing ? 'Now playing' : 'Paused'; }
    }
    setState(false);
    on(btn, 'click', function () { setState(!playing); });
  });

  /* events filter: city + month chips narrow the show list */
  var showList = qs('[data-shows]');
  if (showList) {
    var shows = qsa('.show', showList);
    var cityChips = qsa('.chip[data-city]');
    var monthChips = qsa('.chip[data-month]');
    var noRes = qs('[data-no-results]');
    var state = { city: 'all', month: 'all' };
    function applyFilter() {
      var visible = 0;
      shows.forEach(function (s) {
        var c = s.getAttribute('data-city') || '';
        var m = s.getAttribute('data-month') || '';
        var matchC = (state.city === 'all') || (c === state.city);
        var matchM = (state.month === 'all') || (m === state.month);
        var show = matchC && matchM;
        s.classList.toggle('is-hidden', !show);
        if (show) { visible++; }
      });
      if (noRes) { noRes.classList.toggle('is-hidden', visible !== 0); }
    }
    function wire(chips, key) {
      chips.forEach(function (chip) {
        on(chip, 'click', function () {
          chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
          chip.setAttribute('aria-pressed', 'true');
          state[key] = chip.getAttribute('data-' + key) || 'all';
          applyFilter();
        });
      });
    }
    wire(cityChips, 'city');
    wire(monthChips, 'month');
    applyFilter();
  }

  /* count-up stats */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count') || '0');
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var decimals = (String(target).indexOf('.') >= 0) ? 1 : 0;
    var start = null, dur = 1500;
    function fmt(n) {
      if (decimals) { return n.toFixed(1); }
      return n >= 10000 ? Math.round(n).toLocaleString('en-US') : String(Math.round(n));
    }
    function step(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(target * eased) + suffix;
      if (p < 1) { window.requestAnimationFrame(step); }
    }
    window.requestAnimationFrame(step);
  }
  var counters = qsa('.count');
  if (counters.length) {
    if (reduceMotion) {
      counters.forEach(function (el) {
        var n = parseFloat(el.getAttribute('data-count') || '0');
        var s = el.getAttribute('data-suffix') || '';
        var pf = el.getAttribute('data-prefix') || '';
        var d = (String(n).indexOf('.') >= 0) ? n.toFixed(1) : (n >= 10000 ? Math.round(n).toLocaleString('en-US') : String(Math.round(n)));
        el.textContent = pf + d + s;
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

  /* generic validated form helper */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setErr(input, errId, bad) {
    var err = qs('#' + errId);
    var wrap = input ? (input.closest ? input.closest('.field') : null) : null;
    if (err) { err.hidden = !bad; }
    if (wrap) { wrap.classList.toggle('invalid', bad); }
    if (input) { input.setAttribute('aria-invalid', bad ? 'true' : 'false'); }
    return !bad;
  }

  /* newsletter form */
  var news = qs('#news-form');
  if (news) {
    var nemail = qs('#news-email', news);
    var nok = qs('#news-ok');
    var checkNews = function () { return setErr(nemail, 'err-news', !nemail || !emailRe.test(nemail.value.trim())); };
    if (nemail) { on(nemail, 'input', function () { if (nemail.getAttribute('aria-invalid') === 'true') { checkNews(); } }); }
    on(news, 'submit', function (e) {
      e.preventDefault();
      if (!checkNews()) { if (nok) { nok.hidden = true; } if (nemail) { nemail.focus(); } return; }
      if (nok) { nok.hidden = false; }
      news.reset();
      window.setTimeout(function () { if (nok) { nok.hidden = true; } }, 6000);
    });
  }

  /* booking / enquiry form (events + contact pages) */
  qsa('[data-booking]').forEach(function (form) {
    var fn = qs('.bk-name', form), fe = qs('.bk-email', form), ft = qs('.bk-type', form),
        fd = qs('.bk-date', form), fm = qs('.bk-msg', form), fok = qs('.bk-ok', form);
    function ckN() { return setErr(fn, fn ? fn.getAttribute('data-err') : '', !fn || fn.value.trim().length < 2); }
    function ckE() { return setErr(fe, fe ? fe.getAttribute('data-err') : '', !fe || !emailRe.test(fe.value.trim())); }
    function ckT() { return setErr(ft, ft ? ft.getAttribute('data-err') : '', !ft || !ft.value); }
    function ckD() { return setErr(fd, fd ? fd.getAttribute('data-err') : '', !fd || !fd.value); }
    function ckM() { return setErr(fm, fm ? fm.getAttribute('data-err') : '', !fm || fm.value.trim().length < 10); }
    [[fn, ckN], [fe, ckE], [ft, ckT], [fd, ckD], [fm, ckM]].forEach(function (p) {
      if (p[0]) {
        var evt = (p[0].tagName === 'SELECT') ? 'change' : 'input';
        on(p[0], evt, function () { if (p[0].getAttribute('aria-invalid') === 'true') { p[1](); } });
      }
    });
    on(form, 'submit', function (e) {
      e.preventDefault();
      var ok = ckN(); ok = ckE() && ok; ok = ckT() && ok; ok = ckD() && ok; ok = ckM() && ok;
      if (!ok) {
        var fb = qs('.field.invalid input, .field.invalid textarea, .field.invalid select', form);
        if (fb) { fb.focus(); }
        if (fok) { fok.hidden = true; }
        return;
      }
      if (fok) { fok.hidden = false; }
      form.reset();
      qsa('.field', form).forEach(function (f) { f.classList.remove('invalid'); });
      window.setTimeout(function () { if (fok) { fok.hidden = true; } }, 7000);
    });
  });

  /* accordion */
  qsa('.acc-btn').forEach(function (btn) {
    on(btn, 'click', function () {
      var panel = qs('#' + btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (panel) { panel.hidden = open; }
    });
  });

  /* scroll reveal */
  var revealEls = qsa('.sec-head, .card, .member, .quote, .tl-item, .stat, .show, .info-card, .past-item, .media-tile, .acc, .player');
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
    on(window, 'scroll', tick, { passive: true });
    tick();
    on(toTop, 'click', function () {
      if (reduceMotion) { window.scrollTo(0, 0); return; }
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (er) { window.scrollTo(0, 0); }
    });
  }

  /* delegated demo-link guard: placeholder links never navigate */
  on(document, 'click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-demo-link], a[href="#"]') : null;
    if (t) { e.preventDefault(); }
  });
})();
