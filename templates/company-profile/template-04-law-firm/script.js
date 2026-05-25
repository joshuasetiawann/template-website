/* ==========================================================
   Hartwell & Crane LLP — Corporate & Disputes Law Firm
   Template: template-04-law-firm (V4 dark premium)
   Vanilla JS: mobile nav, validated contact form, count-up stats, accordion
   ========================================================== */
(function () {
  'use strict';

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---- mobile navigation ---- */
  var navToggle = qs('.nav-toggle');
  var navMenu = qs('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    qsa('.nav-menu a').forEach(function (link) {
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

  /* ---- header shadow on scroll ---- */
  var header = qs('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 12);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- footer year ---- */
  var yearEl = qs('#year');
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }

  /* ---- contact form validation ---- */
  var form = qs('#contact-form');
  if (form) {
    var nameIn = qs('#cf-name', form);
    var emailIn = qs('#cf-email', form);
    var msgIn = qs('#cf-msg', form);
    var okMsg = qs('#form-ok', form);
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setErr(input, errId, bad) {
      var err = qs('#' + errId);
      var wrap = input ? input.closest('.field') : null;
      if (err) { err.hidden = !bad; }
      if (wrap) { wrap.classList.toggle('invalid', bad); }
      if (input) { input.setAttribute('aria-invalid', bad ? 'true' : 'false'); }
      return !bad;
    }

    function checkName() { return setErr(nameIn, 'err-name', !nameIn || nameIn.value.trim().length < 2); }
    function checkEmail() { return setErr(emailIn, 'err-email', !emailIn || !emailRe.test(emailIn.value.trim())); }
    function checkMsg() { return setErr(msgIn, 'err-msg', !msgIn || msgIn.value.trim().length < 10); }

    [[nameIn, checkName], [emailIn, checkEmail], [msgIn, checkMsg]].forEach(function (pair) {
      if (pair[0]) { pair[0].addEventListener('input', pair[1]); }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = checkName();
      valid = checkEmail() && valid;
      valid = checkMsg() && valid;
      if (!valid) {
        var firstBad = qs('.field.invalid input, .field.invalid textarea', form);
        if (firstBad) { firstBad.focus(); }
        if (okMsg) { okMsg.hidden = true; }
        return;
      }
      if (okMsg) { okMsg.hidden = false; }
      form.reset();
      qsa('.field', form).forEach(function (f) { f.classList.remove('invalid'); });
      window.setTimeout(function () { if (okMsg) { okMsg.hidden = true; } }, 7000);
    });
  }

  /* ---- count-up stats (IntersectionObserver) ---- */
  var counters = qsa('.count');
  if (counters.length) {
    var animate = function (el) {
      var target = parseInt(el.getAttribute('data-count') || '0', 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var start = null;
      var dur = 1400;
      var step = function (ts) {
        if (start === null) { start = ts; }
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased)) + suffix;
        if (p < 1) { window.requestAnimationFrame(step); }
      };
      window.requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var seen = new window.IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { el.textContent = '0'; seen.observe(el); });
    } else {
      counters.forEach(animate);
    }
  }

  /* ---- accordions (services / FAQ) ---- */
  var accBtns = qsa('.acc-btn');
  if (accBtns.length) {
    accBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = qs('#' + btn.getAttribute('aria-controls'));
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        if (panel) { panel.hidden = open; }
      });
    });
  }


  /* ---- release upgrade: footer year, scrollspy, reveal, back-to-top ---- */
  var reduceMotion = false;
  try {
    reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (motionErr) { reduceMotion = false; }

  qsa('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* scrollspy: highlight the nav link of the section in view */
  var spyLinks = qsa('.nav-menu .nav-link[href^="#"]');
  var spyPairs = [];
  spyLinks.forEach(function (link) {
    var id = (link.getAttribute('href') || '').slice(1);
    var sec = id ? document.getElementById(id) : null;
    if (sec) { spyPairs.push({ link: link, sec: sec }); }
  });
  if (spyPairs.length && 'IntersectionObserver' in window) {
    var spy = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        spyLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
        spyPairs.forEach(function (p) {
          if (p.sec === entry.target) { p.link.setAttribute('aria-current', 'true'); }
        });
      });
    }, { rootMargin: '-40% 0px -52% 0px', threshold: 0 });
    spyPairs.forEach(function (p) { spy.observe(p.sec); });
  }

  /* scroll-reveal: hidden state applied by JS so content shows without JS */
  var revealEls = qsa('.sec-head, .svc-card, .why-item, .tm-card, .tm-row, .qt-card, .stat, .work-card, .cert-seal, .cert-pill, .contact-card, .hours-card, .map-ph, .faq-item');
  if (!reduceMotion && revealEls.length && 'IntersectionObserver' in window) {
    var ioReveal = new window.IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        el.classList.add('in-view');
        window.setTimeout(function () {
          el.classList.remove('pre-reveal');
          el.classList.remove('in-view');
          el.style.transitionDelay = '';
        }, 900);
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    revealEls.forEach(function (el, i) {
      el.classList.add('pre-reveal');
      el.style.transitionDelay = ((i % 4) * 70) + 'ms';
      ioReveal.observe(el);
    });
  }

  /* back to top */
  var toTop = qs('[data-totop]');
  if (toTop) {
    var toTopTick = function () {
      toTop.classList.toggle('show', window.scrollY > 600);
    };
    window.addEventListener('scroll', toTopTick, { passive: true });
    toTopTick();
    toTop.addEventListener('click', function () {
      if (reduceMotion) {
        window.scrollTo(0, 0);
        return;
      }
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (scrollErr) { window.scrollTo(0, 0); }
    });
  }

})();

/* ---- v2: services & results page · demo-link etiquette (both pages) ---- */
(function () {
  'use strict';
  /* Placeholder social links carry data-demo-link; in chambers we do not
     navigate to nowhere — the click is acknowledged and quietly declined. */
  document.addEventListener('click', function (e) {
    var demo = e.target && e.target.closest ? e.target.closest('[data-demo-link]') : null;
    if (demo) { e.preventDefault(); }
  });
})();

/* demo-link-guard: dead "#" links do not jump */
document.addEventListener("click",function(e){var t=e.target.closest?e.target.closest('a[href="#"]'):null;if(t){e.preventDefault();}});

/* === company-profile sub-pages: subject-field guard (contact.html) === */
(function () {
  'use strict';
  var form = document.getElementById('contact-form');
  if (!form) { return; }
  var subject = document.getElementById('cf-subject');
  if (!subject) { return; }
  function checkSubject() {
    var bad = !subject.value;
    var err = document.getElementById('err-subject');
    var wrap = subject.closest ? subject.closest('.field') : null;
    if (err) { err.hidden = !bad; }
    if (wrap) { wrap.classList.toggle('invalid', bad); }
    subject.setAttribute('aria-invalid', bad ? 'true' : 'false');
    return !bad;
  }
  subject.addEventListener('change', checkSubject);
  /* Capture-phase guard: when subject is empty, block the native submit handler
     (so no false success), but first trigger the native field validators via an
     'input' event so name/email/message errors still show together. */
  form.addEventListener('submit', function (e) {
    if (!checkSubject()) {
      e.preventDefault();
      if (e.stopImmediatePropagation) { e.stopImmediatePropagation(); }
      ['cf-name', 'cf-email', 'cf-msg'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
          try { el.dispatchEvent(new Event('input', { bubbles: true })); }
          catch (evErr) {
            var ev = document.createEvent('Event');
            ev.initEvent('input', true, true);
            el.dispatchEvent(ev);
          }
        }
      });
      var ok = document.getElementById('form-ok');
      if (ok) { ok.hidden = true; }
      subject.focus();
    }
  }, true);
})();

