/* ============================================================
   Midnight 2027 — New Year’s Eve Gala
   template-20-new-year-party  (variant V4)
   Vanilla JS · no dependencies · file:// safe
   Features: mobile nav, live countdown, scrollspy, scroll-reveal,
             RSVP validation, tabs, accordion, back-to-top, footer year
   ============================================================ */
(function () {
  'use strict';

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function on(el, ev, fn, opt) { if (el) { el.addEventListener(ev, fn, opt || false); } }
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---------- mobile navigation ---------- */
  var navToggle = qs('.nav-toggle');
  var navMenu = qs('#nav-menu');
  if (navToggle && navMenu) {
    on(navToggle, 'click', function () {
      var open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });
    qsa('a', navMenu).forEach(function (link) {
      on(link, 'click', function () {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
    on(document, 'keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        navToggle.focus();
      }
    });
  }

  /* ---------- header scroll state ---------- */
  var header = qs('.site-header');
  function onHeaderScroll() {
    if (header) { header.classList.toggle('is-scrolled', window.scrollY > 14); }
  }
  on(window, 'scroll', onHeaderScroll, { passive: true });
  onHeaderScroll();

  /* ---------- footer year ---------- */
  qsa('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- back to top ---------- */
  var toTop = qs('[data-totop]');
  if (toTop) {
    var onTopScroll = function () { toTop.classList.toggle('is-on', window.scrollY > 620); };
    on(window, 'scroll', onTopScroll, { passive: true });
    onTopScroll();
    on(toTop, 'click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- live countdown ---------- */
  /* To change the date, edit the ISO string below (local time). */
  var countdownRoot = qs('[data-countdown]');
  if (countdownRoot) {
    var target = new Date('2026-12-31T21:00:00').getTime();
    var fields = {
      days: qs('[data-cd="days"]', countdownRoot),
      hours: qs('[data-cd="hours"]', countdownRoot),
      mins: qs('[data-cd="mins"]', countdownRoot),
      secs: qs('[data-cd="secs"]', countdownRoot)
    };
    var pad = function (n) { return (n < 10 ? '0' : '') + n; };
    var tick = function () {
      var diff = target - Date.now();
      if (diff < 0) { diff = 0; }
      var s = Math.floor(diff / 1000);
      var d = Math.floor(s / 86400);
      var h = Math.floor((s % 86400) / 3600);
      var m = Math.floor((s % 3600) / 60);
      var sec = s % 60;
      if (fields.days) { fields.days.textContent = String(d); }
      if (fields.hours) { fields.hours.textContent = pad(h); }
      if (fields.mins) { fields.mins.textContent = pad(m); }
      if (fields.secs) { fields.secs.textContent = pad(sec); }
      if (diff <= 0 && countdownRoot.getAttribute('data-done') !== '1') {
        countdownRoot.setAttribute('data-done', '1');
        var note = qs('[data-cd-note]', countdownRoot);
        if (note) { note.textContent = 'The day is here \u2014 welcome!'; }
      }
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- scrollspy (aria-current) ---------- */
  var spyLinks = qsa('.nav-link[href^="#"]');
  var spyMap = {};
  spyLinks.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    if (id && document.getElementById(id)) { spyMap[id] = link; }
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
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    spyIds.forEach(function (id) { spy.observe(document.getElementById(id)); });
  }

  /* ---------- staggered scroll-reveal ---------- */
  var revealEls = qsa('[data-reveal]');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('reveal-init'); });
      var ro = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) { return; }
          var el = entry.target;
          var sibs = qsa('[data-reveal]', el.parentNode).filter(function (n) { return n.parentNode === el.parentNode; });
          var idx = sibs.indexOf(el);
          if (idx < 0) { idx = 0; }
          setTimeout(function () { el.classList.add('is-in'); }, Math.min(idx, 6) * 80);
          obs.unobserve(el);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealEls.forEach(function (el) { ro.observe(el); });
    }
  }

  /* ---------- FAQ accordion ---------- */
  qsa('[data-accordion] .acc-trigger').forEach(function (btn) {
    on(btn, 'click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (panel) {
        if (open) { panel.hidden = true; }
        else { panel.hidden = false; }
      }
    });
  });

  /* ---------- gallery lightbox ---------- */
  var lb = qs('[data-lightbox]');
  if (lb) {
    var lbArt = qs('.lb-art', lb);
    var lbCap = qs('.lb-cap', lb);
    var lastFocus = null;
    function openLB(art, cap) {
      lastFocus = document.activeElement;
      if (lbArt) { lbArt.className = 'lb-art ' + art; }
      if (lbCap) { lbCap.textContent = cap; }
      lb.hidden = false;
      document.body.classList.add('nav-open');
      var closeBtn = qs('.lb-close', lb);
      if (closeBtn) { closeBtn.focus(); }
    }
    function closeLB() {
      lb.hidden = true;
      document.body.classList.remove('nav-open');
      if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
    }
    qsa('[data-lb-open]').forEach(function (tile) {
      on(tile, 'click', function () {
        openLB(tile.getAttribute('data-art') || 'art-1', tile.getAttribute('data-cap') || '');
      });
    });
    qsa('[data-lb-close]', lb).forEach(function (el) { on(el, 'click', closeLB); });
    on(document, 'keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) { closeLB(); } });
  }

  /* ---------- copy-to-clipboard ---------- */
  qsa('[data-copy]').forEach(function (btn) {
    on(btn, 'click', function () {
      var text = btn.getAttribute('data-copy') || '';
      var done = function () {
        var prev = btn.getAttribute('data-label') || btn.textContent;
        btn.classList.add('is-copied');
        var live = qs('.copy-live', btn.parentNode);
        if (live) { live.textContent = 'Copied to clipboard'; }
        setTimeout(function () {
          btn.classList.remove('is-copied');
          if (live) { live.textContent = ''; }
        }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (err) {}
        document.body.removeChild(ta); done();
      }
    });
  });

  /* ---------- RSVP / registration form ---------- */
  var rsvpForm = qs('[data-rsvp]');
  if (rsvpForm) {
    var fieldEls = qsa('[data-field]', rsvpForm);
    var statusBox = qs('[data-form-status]', rsvpForm);
    var successPanel = qs('[data-form-success]', rsvpForm);

    var validators = {
      text: function (v) { return v.trim().length >= 2 ? '' : 'Please enter at least 2 characters.'; },
      name: function (v) { return v.trim().length >= 2 ? '' : 'Please tell us your name.'; },
      email: function (v) {
        if (!v.trim()) { return 'An email address is required.'; }
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.';
      },
      select: function (v) { return v ? '' : 'Please choose an option.'; },
      guests: function (v) { return v ? '' : 'Please select a guest count.'; },
      attend: function (v) { return v ? '' : 'Let us know if you can attend.'; }
    };

    function fieldError(group) {
      var input = qs('input, select, textarea', group);
      if (!input) { return ''; }
      var type = group.getAttribute('data-field');
      var fn = validators[type] || validators.text;
      var required = input.hasAttribute('required') || group.getAttribute('data-required') === '1';
      if (!required && !String(input.value).trim()) { return ''; }
      return fn(String(input.value));
    }

    function showError(group, msg) {
      var input = qs('input, select, textarea', group);
      var errEl = qs('.field-err', group);
      if (msg) {
        group.classList.add('has-error');
        if (input) { input.setAttribute('aria-invalid', 'true'); }
        if (errEl) { errEl.textContent = msg; }
      } else {
        group.classList.remove('has-error');
        if (input) { input.removeAttribute('aria-invalid'); }
        if (errEl) { errEl.textContent = ''; }
      }
    }

    fieldEls.forEach(function (group) {
      var input = qs('input, select, textarea', group);
      if (!input) { return; }
      on(input, 'blur', function () { showError(group, fieldError(group)); });
      on(input, 'input', function () {
        if (group.classList.contains('has-error')) { showError(group, fieldError(group)); }
      });
    });

    on(rsvpForm, 'submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      fieldEls.forEach(function (group) {
        var msg = fieldError(group);
        showError(group, msg);
        if (msg && !firstBad) { firstBad = group; }
      });
      if (firstBad) {
        if (statusBox) { statusBox.textContent = 'Please fix the highlighted fields.'; statusBox.className = 'form-status is-error'; }
        var badInput = qs('input, select, textarea', firstBad);
        if (badInput) { badInput.focus(); }
        return;
      }
      if (statusBox) { statusBox.textContent = ''; statusBox.className = 'form-status'; }
      if (successPanel) {
        var nameInput = qs('[data-field="name"] input, [data-field="text"] input', rsvpForm);
        var who = nameInput && nameInput.value.trim() ? nameInput.value.trim().split(' ')[0] : 'there';
        var slot = qs('[data-success-name]', successPanel);
        if (slot) { slot.textContent = who; }
        successPanel.hidden = false;
        rsvpForm.classList.add('is-sent');
        successPanel.setAttribute('tabindex', '-1');
        successPanel.focus();
        var formBody = qs('[data-form-body]', rsvpForm);
        if (formBody) { formBody.hidden = true; }
      }
    });

    var resetBtn = qs('[data-form-reset]', rsvpForm);
    if (resetBtn) {
      on(resetBtn, 'click', function () {
        rsvpForm.reset();
        rsvpForm.classList.remove('is-sent');
        if (successPanel) { successPanel.hidden = true; }
        var formBody = qs('[data-form-body]', rsvpForm);
        if (formBody) { formBody.hidden = false; }
        fieldEls.forEach(function (group) { showError(group, ''); });
        var firstField = qs('[data-field] input, [data-field] select', rsvpForm);
        if (firstField) { firstField.focus(); }
      });
    }
  }

  /* ---------- placeholder link guard ---------- */
  on(document, 'click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href="#"]') : null;
    if (a) { e.preventDefault(); }
  });

})();

/* ===== EW nav-pages helpers ===== */

(function () {
  'use strict';
  // Delegated demo-link handler: any [data-demo-link] pointing at "#" or a missing
  // target is neutralised (front-end demo). Real in-page anchors still work.
  document.addEventListener('click', function (e) {
    var t = e.target;
    var a = t && t.closest ? t.closest('a[data-demo-link]') : null;
    if (!a) { return; }
    var href = a.getAttribute('href') || '';
    if (href === '#' || href === '') { e.preventDefault(); return; }
    if (href.charAt(0) === '#') {
      var id = href.slice(1);
      if (id && !document.getElementById(id) && id !== 'top') { e.preventDefault(); }
    }
  });
})();

