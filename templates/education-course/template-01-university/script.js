/* ============================================================
   Whitford University -- University
   template-01-university (V1)
   Vanilla JS: mobile nav, header scroll state, scrollspy, scroll-reveal, count-up stats, accordion, enroll validation, back-to-top, testimonial slider, read-more toggle
   ============================================================ */
(function () {
  'use strict';
  var d = document;
  function qs(s, r) { return (r || d).querySelector(s); }
  function qsa(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }
  var reduceMotion = false;
  try {
    reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  } catch (mErr) { reduceMotion = false; }
  var hasIO = 'IntersectionObserver' in window;

  /* ---- mobile navigation ---- */
  var navToggle = qs('.nav-toggle');
  var navMenu = qs('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      d.body.classList.toggle('nav-open', open);
    });
    qsa('a', navMenu).forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        d.body.classList.remove('nav-open');
      });
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        d.body.classList.remove('nav-open');
        navToggle.focus();
      }
    });
  }

  /* ---- header scroll state ---- */
  var header = qs('.site-header');
  if (header) {
    var headTick = function () {
      header.classList.toggle('scrolled', window.scrollY > 14);
    };
    window.addEventListener('scroll', headTick, { passive: true });
    headTick();
  }

  /* ---- footer year ---- */
  qsa('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- scrollspy (aria-current) ---- */
  var spyLinks = qsa('.nav-menu a[href^="#"]').filter(function (l) {
    return !l.classList.contains('nav-cta');
  });
  var spyPairs = [];
  spyLinks.forEach(function (link) {
    var id = (link.getAttribute('href') || '').slice(1);
    var sec = id ? d.getElementById(id) : null;
    if (sec) { spyPairs.push({ link: link, sec: sec }); }
  });
  if (spyPairs.length && hasIO) {
    var spy = new window.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        spyLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
        spyPairs.forEach(function (p) {
          if (p.sec === entry.target) { p.link.setAttribute('aria-current', 'true'); }
        });
      });
    }, { rootMargin: '-38% 0px -54% 0px', threshold: 0 });
    spyPairs.forEach(function (p) { spy.observe(p.sec); });
  }

  /* ---- staggered scroll-reveal (JS-applied hidden state) ---- */
  var revealEls = qsa('[data-reveal]');
  if (revealEls.length && hasIO && !reduceMotion) {
    var ioReveal = new window.IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        el.classList.add('rv-in');
        window.setTimeout(function () {
          el.classList.remove('rv');
          el.classList.remove('rv-in');
          el.style.transitionDelay = '';
        }, 950);
        obs.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el, i) {
      el.classList.add('rv');
      el.style.transitionDelay = ((i % 4) * 80) + 'ms';
      ioReveal.observe(el);
    });
  }

  /* ---- count-up stats ---- */
  var counters = qsa('[data-count]');
  if (counters.length) {
    var animateCount = function (el) {
      var target = parseFloat(el.getAttribute('data-count') || '0');
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      var dec = (String(el.getAttribute('data-count')).split('.')[1] || '').length;
      if (reduceMotion) { el.textContent = prefix + target.toFixed(dec) + suffix; return; }
      var start = null;
      var dur = 1500;
      var step = function (ts) {
        if (start === null) { start = ts; }
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (target * eased).toFixed(dec) + suffix;
        if (p < 1) { window.requestAnimationFrame(step); }
      };
      window.requestAnimationFrame(step);
    };
    if (hasIO) {
      var ioCount = new window.IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) {
        el.textContent = (el.getAttribute('data-prefix') || '') + '0' + (el.getAttribute('data-suffix') || '');
        ioCount.observe(el);
      });
    } else {
      counters.forEach(animateCount);
    }
  }

  /* ---- accordion (curriculum / FAQ) ---- */
  qsa('[data-accordion]').forEach(function (acc) {
    var accBtns = qsa('[data-acc]', acc);
    accBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wasOpen = btn.getAttribute('aria-expanded') === 'true';
        if (acc.hasAttribute('data-single')) {
          accBtns.forEach(function (b) {
            if (b === btn) { return; }
            b.setAttribute('aria-expanded', 'false');
            var pp = d.getElementById(b.getAttribute('aria-controls') || '');
            if (pp) { pp.hidden = true; }
            var pit = b.closest('.acc-item');
            if (pit) { pit.classList.remove('open'); }
          });
        }
        btn.setAttribute('aria-expanded', wasOpen ? 'false' : 'true');
        var panel = d.getElementById(btn.getAttribute('aria-controls') || '');
        if (panel) { panel.hidden = wasOpen; }
        var item = btn.closest('.acc-item');
        if (item) { item.classList.toggle('open', !wasOpen); }
      });
    });
  });

  /* ---- enrollment form validation ---- */
  var enroll = qs('[data-enroll]');
  if (enroll) {
    var fName = qs('[data-f-name]', enroll);
    var fEmail = qs('[data-f-email]', enroll);
    var fProg = qs('[data-f-prog]', enroll);
    var okBox = qs('[data-success]', enroll);
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var setBad = function (input, bad) {
      if (!input) { return true; }
      var f = input.closest('.field');
      if (f) {
        f.classList.toggle('invalid', !!bad);
        var msg = qs('.ferr', f);
        if (msg) { msg.hidden = !bad; }
      }
      input.setAttribute('aria-invalid', bad ? 'true' : 'false');
      return !bad;
    };
    var vName = function () { return setBad(fName, !fName || fName.value.trim().length < 2); };
    var vEmail = function () { return setBad(fEmail, !fEmail || !emailRe.test(fEmail.value.trim())); };
    var vProg = function () { return setBad(fProg, !fProg || fProg.value === ''); };
    if (fName) { fName.addEventListener('input', vName); }
    if (fEmail) { fEmail.addEventListener('input', vEmail); }
    if (fProg) { fProg.addEventListener('change', vProg); }
    enroll.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = vName();
      ok = vEmail() && ok;
      ok = vProg() && ok;
      if (!ok) {
        if (okBox) { okBox.hidden = true; }
        var firstBad = qs('.field.invalid input, .field.invalid select, .field.invalid textarea', enroll);
        if (firstBad) { firstBad.focus(); }
        return;
      }
      if (okBox) { okBox.hidden = false; }
      enroll.reset();
      qsa('.field', enroll).forEach(function (f) { f.classList.remove('invalid'); });
      qsa('[aria-invalid]', enroll).forEach(function (i) { i.setAttribute('aria-invalid', 'false'); });
      window.setTimeout(function () { if (okBox) { okBox.hidden = true; } }, 9000);
    });
  }

  /* ---- testimonial slider ---- */
  var slider = qs('[data-slider]');
  if (slider) {
    var slides = qsa('.tslide', slider);
    var slPrev = qs('[data-prev]', slider);
    var slNext = qs('[data-next]', slider);
    var slCount = qs('[data-slide-n]', slider);
    var slIdx = 0;
    var showSlide = function (i) {
      if (!slides.length) { return; }
      slIdx = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) {
        s.classList.toggle('active', j === slIdx);
        s.setAttribute('aria-hidden', j === slIdx ? 'false' : 'true');
      });
      if (slCount) { slCount.textContent = (slIdx + 1) + ' / ' + slides.length; }
    };
    if (slPrev) { slPrev.addEventListener('click', function () { showSlide(slIdx - 1); }); }
    if (slNext) { slNext.addEventListener('click', function () { showSlide(slIdx + 1); }); }
    showSlide(0);
  }

  /* ---- story read-more toggle ---- */
  var moreBtn = qs('[data-more-btn]');
  var moreBox = qs('[data-more]');
  if (moreBtn && moreBox) {
    moreBtn.addEventListener('click', function () {
      var opened = moreBox.hidden;
      moreBox.hidden = !opened;
      moreBtn.setAttribute('aria-expanded', opened ? 'true' : 'false');
      var lbl = qs('.more-label', moreBtn);
      if (lbl) { lbl.textContent = opened ? (moreBtn.getAttribute('data-less') || 'Show less') : (moreBtn.getAttribute('data-more-label') || 'Read more'); }
    });
  }

  /* ---- back to top ---- */
  var toTop = qs('[data-totop]');
  if (toTop) {
    var topTick = function () {
      toTop.classList.toggle('show', window.scrollY > 560);
    };
    window.addEventListener('scroll', topTick, { passive: true });
    topTick();
    toTop.addEventListener('click', function () {
      if (reduceMotion) { window.scrollTo(0, 0); return; }
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (sErr) { window.scrollTo(0, 0); }
    });
  }
})();

/* ============================================================
   Inner pages (about / faculty / admissions) — shared behaviours
   Self-contained, null-safe; reuses existing reveal/accordion/form
   handlers above. Adds a delegated demo-link handler so placeholder
   profile links never navigate. No console output, file://-safe.
   ============================================================ */
(function () {
  'use strict';
  var d = document;
  /* delegated demo-link handler: any href="#"/empty link flagged data-demo-link
     is a styled placeholder and must not jump the page. */
  d.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) { return; }
    var link = t.closest('a[data-demo-link]');
    if (!link) { return; }
    var href = link.getAttribute('href');
    if (href === null || href === '' || href === '#') {
      e.preventDefault();
    }
  });
})();
