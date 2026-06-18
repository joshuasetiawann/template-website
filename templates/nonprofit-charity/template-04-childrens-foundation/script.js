/* Little Lanterns Foundation — Children's Foundation | V4
   Shared vanilla JS (null-safe): mobile nav, count-up, progress/breakdown bars,
   newsletter + contact + donate validation, causes filter, donation widget,
   accordion, scroll-reveal, scrollspy, back-to-top, demo-link guard.
   seed:3130 */

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
        navToggle.focus();
      }
    });
  }

  /* header shadow */
  var header = qs('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 10); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* count-up */
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

  /* progress + breakdown bars: animate to data-pct width */
  var bars = qsa('[data-bar]');
  if (bars.length) {
    var fillBars = function () {
      bars.forEach(function (b) {
        var pct = b.getAttribute('data-bar') || '0';
        b.style.width = (reduceMotion ? pct : pct) + '%';
      });
    };
    if ('IntersectionObserver' in window && !reduceMotion) {
      var bo = new window.IntersectionObserver(function (entries, obs) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.style.width = (en.target.getAttribute('data-bar') || '0') + '%';
            obs.unobserve(en.target);
          }
        });
      }, { threshold: 0.3 });
      bars.forEach(function (b) { bo.observe(b); });
    } else { fillBars(); }
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

  /* newsletter */
  var news = qs('#news-form');
  if (news) {
    var nemail = qs('#news-email', news);
    var nok = qs('#news-ok');
    function checkNews() { return setErr(nemail, 'err-news', !nemail || !emailRe.test(nemail.value.trim())); }
    if (nemail) { nemail.addEventListener('input', function () { if (nemail.getAttribute('aria-invalid') === 'true') { checkNews(); } }); }
    news.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!checkNews()) { if (nok) { nok.hidden = true; } if (nemail) { nemail.focus(); } return; }
      if (nok) { nok.hidden = false; }
      news.reset();
      window.setTimeout(function () { if (nok) { nok.hidden = true; } }, 6000);
    });
  }

  /* contact form (about page) */
  var cform = qs('#contact-form');
  if (cform) {
    var cn = qs('#cf-name', cform), ce = qs('#cf-email', cform), cm = qs('#cf-msg', cform), cok = qs('#contact-ok', cform);
    function ckN() { return setErr(cn, 'err-cf-name', !cn || cn.value.trim().length < 2); }
    function ckE() { return setErr(ce, 'err-cf-email', !ce || !emailRe.test(ce.value.trim())); }
    function ckM() { return setErr(cm, 'err-cf-msg', !cm || cm.value.trim().length < 10); }
    [[cn, ckN], [ce, ckE], [cm, ckM]].forEach(function (p) {
      if (p[0]) { p[0].addEventListener('input', function () { if (p[0].getAttribute('aria-invalid') === 'true') { p[1](); } }); }
    });
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = ckN(); ok = ckE() && ok; ok = ckM() && ok;
      if (!ok) { var fb = qs('.field.invalid input, .field.invalid textarea', cform); if (fb) { fb.focus(); } if (cok) { cok.hidden = true; } return; }
      if (cok) { cok.hidden = false; }
      cform.reset();
      qsa('.field', cform).forEach(function (f) { f.classList.remove('invalid'); });
      window.setTimeout(function () { if (cok) { cok.hidden = true; } }, 7000);
    });
  }

  /* causes filter chips */
  var chips = qsa('.chip[data-filter]');
  var causeCards = qsa('.cause-card[data-cat]');
  if (chips.length && causeCards.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
        chip.setAttribute('aria-pressed', 'true');
        var f = chip.getAttribute('data-filter');
        causeCards.forEach(function (card) {
          var match = (f === 'all') || (card.getAttribute('data-cat') === f) || (card.getAttribute('data-region') === f);
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* donation widget */
  var widget = qs('[data-donate]');
  if (widget) {
    var amtBtns = qsa('.amount-btn', widget);
    var custom = qs('#donate-custom', widget);
    var freqBtns = qsa('.toggle button', widget);
    var sumAmount = qs('#sum-amount', widget);
    var sumFreq = qs('#sum-freq', widget);
    var sumDesignation = qs('#sum-designation', widget);
    var sumTotal = qs('#sum-total', widget);
    var impact = qs('#impact-helper-text', widget);
    var designation = qs('#donate-designation', widget);
    var state = { amount: 50, freq: 'one-time' };
    var UNIT_DIV = 40;
    var UNIT_QTY = 'care months';

    function fmtMoney(n) { return '$' + (Math.round(n)).toLocaleString('en-US'); }
    function render() {
      if (sumAmount) { sumAmount.textContent = fmtMoney(state.amount); }
      if (sumFreq) { sumFreq.textContent = state.freq === 'monthly' ? 'Monthly' : 'One-time'; }
      if (sumTotal) { sumTotal.textContent = fmtMoney(state.amount) + (state.freq === 'monthly' ? '/mo' : ''); }
      if (designation && sumDesignation) {
        var opt = designation.options[designation.selectedIndex];
        sumDesignation.textContent = opt ? opt.text : 'Where needed most';
      }
      if (impact) {
        var qty = Math.max(0, Math.round(state.amount / UNIT_DIV));
        impact.textContent = fmtMoney(state.amount) + ' provides about ' + qty + ' ' + UNIT_QTY + (state.freq === 'monthly' ? ' every month' : '') + '.';
      }
    }
    function selectAmount(v, btn) {
      state.amount = v;
      amtBtns.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      if (btn && custom) { custom.value = ''; }
      render();
    }
    amtBtns.forEach(function (b) {
      b.addEventListener('click', function () { selectAmount(parseInt(b.getAttribute('data-amount') || '0', 10), b); });
    });
    if (custom) {
      custom.addEventListener('input', function () {
        var v = parseFloat(custom.value);
        amtBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        state.amount = (!isNaN(v) && v > 0) ? v : 0;
        render();
      });
    }
    freqBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        freqBtns.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        state.freq = b.getAttribute('data-freq') || 'one-time';
        render();
      });
    });
    if (designation) { designation.addEventListener('change', render); }
    render();

    /* donate form validation + success */
    var dform = qs('#donate-form', widget);
    if (dform) {
      var dn = qs('#donor-name', dform), de = qs('#donor-email', dform);
      var dok = qs('#donate-success', widget), dpanel = qs('#donate-panel', widget);
      function ckDN() { return setErr(dn, 'err-donor-name', !dn || dn.value.trim().length < 2); }
      function ckDE() { return setErr(de, 'err-donor-email', !de || !emailRe.test(de.value.trim())); }
      function ckDA() {
        var bad = !(state.amount > 0);
        var err = qs('#err-donor-amount');
        if (err) { err.hidden = !bad; }
        return !bad;
      }
      [[dn, ckDN], [de, ckDE]].forEach(function (p) {
        if (p[0]) { p[0].addEventListener('input', function () { if (p[0].getAttribute('aria-invalid') === 'true') { p[1](); } }); }
      });
      dform.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = ckDA(); ok = ckDN() && ok; ok = ckDE() && ok;
        if (!ok) { var fb = qs('.field.invalid input', dform); if (fb) { fb.focus(); } return; }
        if (dpanel && dok) {
          var sa = qs('#success-amount', dok);
          if (sa) { sa.textContent = fmtMoney(state.amount) + (state.freq === 'monthly' ? ' each month' : ''); }
          dpanel.hidden = true;
          dok.hidden = false;
          dok.focus && dok.focus();
        }
      });
      var resetBtn = qs('#donate-reset', widget);
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          if (dpanel && dok) { dok.hidden = true; dpanel.hidden = false; }
          dform.reset();
          qsa('.field', dform).forEach(function (f) { f.classList.remove('invalid'); });
          selectAmount(50, amtBtns[1] || amtBtns[0]);
        });
      }
    }
  }

  /* accordion */
  qsa('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = qs('#' + btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (panel) { panel.hidden = open; }
    });
  });

  /* scrollspy for in-page section nav (if any local #links exist) */
  var spyLinks = qsa('.nav-menu a[href^="#"]');
  var spyPairs = [];
  spyLinks.forEach(function (l) {
    var id = (l.getAttribute('href') || '').slice(1);
    var sec = id ? document.getElementById(id) : null;
    if (sec) { spyPairs.push({ link: l, sec: sec }); }
  });
  if (spyPairs.length && 'IntersectionObserver' in window) {
    var spy = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        spyPairs.forEach(function (p) {
          if (p.sec === en.target) { p.link.setAttribute('aria-current', 'true'); }
          else if (!p.link.hasAttribute('data-keep-current')) { p.link.removeAttribute('aria-current'); }
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    spyPairs.forEach(function (p) { spy.observe(p.sec); });
  }

  /* scroll reveal */
  var revealEls = qsa('.sec-head, .card, .way, .story, .member, .value, .tl-item, .stat, .partner-seal, .info-card, .bd-row, .give-card, .cause-card, .acc');
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

  /* delegated demo-link guard: dead "#" / data-demo-link placeholders never navigate */
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('[data-demo-link], a[href="#"]') : null;
    if (t) { e.preventDefault(); }
  });
})();
