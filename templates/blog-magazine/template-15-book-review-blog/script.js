/* ==========================================================================
   The Marginalia Review — Book Review Blog · script.js
   Template: template-15-book-review-blog (variant v3)
   Vanilla JS, IIFE, null-safe: every block checks its elements first,
   so sections can be deleted without breaking the rest.
   ========================================================================== */

(function () {
  'use strict';

  var SITE = { slug: 'template-15-book-review-blog', brand: 'The Marginalia Review', noun: 'reviews', listen: false };
  var prefersReduced = false;
  try {
    prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) { prefersReduced = false; }

  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* --- Mobile navigation toggle --- */
  var navToggle = qs('.nav-toggle');
  var siteNav = qs('#site-nav');
  if (navToggle && siteNav) {
    var closeNav = function () {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    };
    navToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    siteNav.addEventListener('click', function (e) {
      var target = e.target;
      if (target && target.tagName === 'A') { closeNav(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* --- Header scroll state (>8px: shadow + tighter padding) --- */
  var header = qs('[data-header]');
  if (header) {
    var setHeaderState = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });
  }

  /* --- Scrollspy: aria-current on header nav links --- */
  var spyLinks = qsa('.site-nav a[href^="#"]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var spyMap = {};
    var spyTargets = [];
    spyLinks.forEach(function (link) {
      var id = link.getAttribute('href').slice(1);
      var el = document.getElementById(id);
      if (el && el.tagName === 'SECTION') {
        spyMap[id] = link;
        spyTargets.push(el);
      }
    });
    var setCurrent = function (id) {
      spyLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
      if (id && spyMap[id]) { spyMap[id].setAttribute('aria-current', 'true'); }
    };
    if (spyTargets.length) {
      var spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { setCurrent(entry.target.id); }
        });
      }, { rootMargin: '-38% 0px -56% 0px', threshold: 0 });
      spyTargets.forEach(function (el) { spyObserver.observe(el); });
    }
  }

  /* --- Staggered scroll reveal (content stays visible without JS) --- */
  var revealEls = qsa('[data-reveal]');
  if (revealEls.length && !prefersReduced && 'IntersectionObserver' in window) {
    var groups = {};
    revealEls.forEach(function (el, i) {
      el.classList.add('js-reveal');
      var parent = el.parentNode;
      var key = parent ? (parent.className || 'root') : 'root';
      groups[key] = (groups[key] || 0) + 1;
      el.style.transitionDelay = (((groups[key] - 1) % 6) * 70) + 'ms';
      void i;
    });
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
    /* Safety net: anything still hidden after load settles gets shown. */
    window.setTimeout(function () {
      qsa('.js-reveal:not(.in-view)').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('in-view');
        }
      });
    }, 1400);
  }

  /* --- Category chips: live grid filtering --- */
  var chipRow = qs('.chip-row');
  var grid = qs('[data-grid]');
  if (chipRow && grid) {
    var chips = qsa('.chip', chipRow);
    var cards = qsa('[data-cat]', grid);
    var countNote = qs('[data-count]');
    var applyFilter = function (slug) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = slug === 'all' || card.getAttribute('data-cat') === slug;
        if (match) {
          card.removeAttribute('hidden');
          shown += 1;
        } else {
          card.setAttribute('hidden', '');
        }
      });
      if (countNote) {
        countNote.textContent = slug === 'all'
          ? 'Showing all ' + cards.length + ' ' + SITE.noun
          : 'Showing ' + shown + ' of ' + cards.length + ' ' + SITE.noun;
      }
    };
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) {
          c.classList.remove('is-active');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('is-active');
        chip.setAttribute('aria-pressed', 'true');
        applyFilter(chip.getAttribute('data-filter') || 'all');
      });
    });
  }

  /* --- Sidebar tag chips: small toggle interaction --- */
  qsa('[data-tag]').forEach(function (tag) {
    tag.addEventListener('click', function () {
      tag.classList.toggle('is-on');
    });
  });

  /* --- Newsletter signup validation --- */
  var newsForm = qs('[data-newsletter]');
  if (newsForm) {
    var emailInput = qs('input[type="email"]', newsForm);
    var formMsg = qs('[data-form-msg]', newsForm);
    var emailOk = function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    };
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!emailInput || !formMsg) { return; }
      var value = emailInput.value.trim();
      if (!value) {
        formMsg.textContent = 'Please enter your email address first.';
        formMsg.className = 'form-msg is-error';
        emailInput.focus();
      } else if (!emailOk(value)) {
        formMsg.textContent = 'That does not look like a valid email address.';
        formMsg.className = 'form-msg is-error';
        emailInput.focus();
      } else {
        formMsg.textContent = 'Shelved! The Flyleaf arrives with the next fortnight\'s post.';
        formMsg.className = 'form-msg is-ok';
        newsForm.reset();
      }
    });
  }

  /* --- Back to top (hidden until 600px of scroll) --- */
  var toTop = qs('[data-totop]');
  if (toTop) {
    var setToTop = function () {
      toTop.classList.toggle('is-visible', window.scrollY > 600);
    };
    setToTop();
    window.addEventListener('scroll', setToTop, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  /* --- Footer year --- */
  qsa('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* --- Placeholder links: prevent jump for any bare href="#" --- */
  document.addEventListener('click', function (e) {
    var a = (e.target && e.target.closest) ? e.target.closest('a[href="#"]') : null;
    if (a) { e.preventDefault(); }
  });

  /* --- Article view: read ?p= and render the matching post (file://-safe) --- */
  var artBody = qs('[data-art-body]');
  var dataTag = document.getElementById('posts-data');
  if (artBody && dataTag) {
    var posts = [];
    try { posts = JSON.parse(dataTag.textContent || '[]'); } catch (err2) { posts = []; }
    if (posts.length) {
      var idx = 0;
      try {
        var sp = new URLSearchParams(window.location.search);
        var raw = parseInt(sp.get('p'), 10);
        if (!isNaN(raw) && raw >= 0 && raw < posts.length) { idx = raw; }
      } catch (err3) { idx = 0; }
      var post = posts[idx];
      var setText = function (sel, value) {
        qsa(sel).forEach(function (el) { el.textContent = value; });
      };
      var readWord = SITE.listen ? ' min listen' : ' min read';
      setText('[data-art-title]', post.t);
      setText('[data-bc-title]', post.t);
      setText('[data-art-excerpt]', post.x);
      setText('[data-art-cat]', post.c);
      setText('[data-bc-cat]', post.c);
      setText('[data-art-author]', post.a);
      setText('[data-art-author2]', post.a);
      setText('[data-art-avatar]', post.ai);
      setText('[data-art-avatar2]', post.ai);
      setText('[data-art-read]', post.r + readWord);
      setText('[data-ap-title]', post.t);
      qsa('[data-art-iso]').forEach(function (el) {
        el.textContent = post.d;
        el.setAttribute('datetime', post.iso);
      });
      if (post.t) { document.title = post.t + ' \u2014 ' + SITE.brand; }
      qsa('[data-art-cover]').forEach(function (el) {
        el.className = el.className.replace(/cov-\d/, 'cov-' + (idx % 5));
      });
      var nth = function (n) { return ((n % posts.length) + posts.length) % posts.length; };
      var relGrid = qs('[data-rel-grid]');
      if (relGrid) {
        qsa('[data-rel]', relGrid).forEach(function (card, k) {
          var j = nth(idx + k + 1);
          var rp = posts[j];
          var link = qs('.rel-link', card);
          if (link) { link.setAttribute('href', 'article.html?p=' + j); }
          var ct = qs('[data-rel-cat]', card); if (ct) { ct.textContent = rp.c; }
          var tt = qs('[data-rel-title]', card); if (tt) { tt.textContent = rp.t; }
          var rr = qs('[data-rel-read]', card); if (rr) { rr.textContent = rp.r + ' min read'; }
          var cov = qs('.rel-cover', card);
          if (cov) { cov.className = cov.className.replace(/cov-\d/, 'cov-' + (j % 5)); }
        });
      }
      var prev = posts[nth(idx - 1)];
      var next = posts[nth(idx + 1)];
      var pp = qs('[data-pager-prev]');
      if (pp) {
        pp.setAttribute('href', 'article.html?p=' + nth(idx - 1));
        var ppt = qs('[data-pp-title]', pp); if (ppt) { ppt.textContent = prev.t; }
      }
      var pn = qs('[data-pager-next]');
      if (pn) {
        pn.setAttribute('href', 'article.html?p=' + nth(idx + 1));
        var pnt = qs('[data-pn-title]', pn); if (pnt) { pnt.textContent = next.t; }
      }
    }
  }

  /* --- Reading progress bar (variant V3) --- */
  var progress = qs('[data-progress]');
  if (!progress) {
    progress = document.createElement('div');
    progress.className = 'progress-bar';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);
  }
  if (progress) {
    var setProgress = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)).toFixed(2) + '%';
    };
    setProgress();
    window.addEventListener('scroll', setProgress, { passive: true });
    window.addEventListener('resize', setProgress);
  }

})();

/* BM-SUBPAGES-APPEND v1 */
/* ==========================================================================
   Sub-pages (articles / about / contact) — namespaced bm* behaviours.
   Self-contained IIFE; every block guards its elements, so this is safe to
   append to any template script and runs only where the markup exists.
   ========================================================================== */
(function () {
  'use strict';

  function bmQs(sel, root) { return (root || document).querySelector(sel); }
  function bmQsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* --- Delegated demo links: never navigate, never error (file://-safe) --- */
  document.addEventListener('click', function (e) {
    var a = (e.target && e.target.closest) ? e.target.closest('a[data-demo-link], a[href="#"]') : null;
    if (a) { e.preventDefault(); }
  });

  /* --- Archive page: combined category-chip + live search filtering --- */
  var bmGrid = bmQs('[data-bm-grid]');
  if (bmGrid) {
    var bmCards = bmQsa('.bm-card', bmGrid);
    var bmChipRow = bmQs('.chip-row');
    var bmChips = bmChipRow ? bmQsa('.chip', bmChipRow) : [];
    var bmSearch = bmQs('[data-bm-search]');
    var bmCount = bmQs('[data-bm-count]');
    var bmEmpty = bmQs('[data-bm-empty]');
    var bmNoun = bmGrid.getAttribute('data-noun') || 'articles';
    var bmActiveCat = 'all';

    var bmTextOf = function (card) {
      // title (data attr) + visible text, lowercased once and cached
      if (card.__bmText) { return card.__bmText; }
      var t = (card.getAttribute('data-title') || '') + ' ' + (card.textContent || '');
      card.__bmText = t.toLowerCase();
      return card.__bmText;
    };

    var bmApply = function () {
      var q = bmSearch ? bmSearch.value.trim().toLowerCase() : '';
      var shown = 0;
      bmCards.forEach(function (card) {
        var catOk = bmActiveCat === 'all' || card.getAttribute('data-cat') === bmActiveCat;
        var textOk = !q || bmTextOf(card).indexOf(q) !== -1;
        if (catOk && textOk) {
          card.removeAttribute('hidden');
          shown += 1;
        } else {
          card.setAttribute('hidden', '');
        }
      });
      if (bmCount) {
        if (bmActiveCat === 'all' && !q) {
          bmCount.textContent = 'Showing all ' + bmCards.length + ' ' + bmNoun;
        } else {
          bmCount.textContent = 'Showing ' + shown + ' of ' + bmCards.length + ' ' + bmNoun;
        }
      }
      if (bmEmpty) {
        if (shown === 0) { bmEmpty.removeAttribute('hidden'); }
        else { bmEmpty.setAttribute('hidden', ''); }
      }
    };

    bmChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        bmChips.forEach(function (c) {
          c.classList.remove('is-active');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('is-active');
        chip.setAttribute('aria-pressed', 'true');
        bmActiveCat = chip.getAttribute('data-filter') || 'all';
        bmApply();
      });
    });

    if (bmSearch) {
      bmSearch.addEventListener('input', bmApply);
      bmSearch.addEventListener('search', bmApply);
    }
    bmApply();
  }

  /* --- Contact form: inline validation + success message --- */
  var bmForm = bmQs('[data-bm-form]');
  if (bmForm) {
    var bmStatus = bmQs('[data-bm-status]', bmForm);
    var bmEmailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    var bmFieldOf = function (input) {
      return input && input.closest ? input.closest('.bm-field') : null;
    };
    var bmSetError = function (input, msg) {
      var field = bmFieldOf(input);
      var errId = input.getAttribute('id');
      var errEl = errId ? bmQs('[data-err-for="' + errId + '"]', bmForm) : null;
      if (field) { field.classList.add('is-invalid'); }
      if (errEl) { errEl.textContent = msg; }
      if (input) { input.setAttribute('aria-invalid', 'true'); }
    };
    var bmClearError = function (input) {
      var field = bmFieldOf(input);
      var errId = input.getAttribute('id');
      var errEl = errId ? bmQs('[data-err-for="' + errId + '"]', bmForm) : null;
      if (field) { field.classList.remove('is-invalid'); }
      if (errEl) { errEl.textContent = ''; }
      if (input) { input.removeAttribute('aria-invalid'); }
    };

    var bmValidate = function () {
      var ok = true;
      var first = null;
      var name = bmQs('#bm-name', bmForm);
      var email = bmQs('#bm-email', bmForm);
      var topic = bmQs('#bm-topic', bmForm);
      var message = bmQs('#bm-message', bmForm);

      if (name) {
        if (!name.value.trim()) { bmSetError(name, 'Please enter your name.'); ok = false; first = first || name; }
        else { bmClearError(name); }
      }
      if (email) {
        var ev = email.value.trim();
        if (!ev) { bmSetError(email, 'Please enter your email address.'); ok = false; first = first || email; }
        else if (!bmEmailRe.test(ev)) { bmSetError(email, 'That does not look like a valid email address.'); ok = false; first = first || email; }
        else { bmClearError(email); }
      }
      if (topic) {
        if (!topic.value) { bmSetError(topic, 'Please choose a topic.'); ok = false; first = first || topic; }
        else { bmClearError(topic); }
      }
      if (message) {
        if (message.value.trim().length < 10) { bmSetError(message, 'Please write at least a sentence (10 characters).'); ok = false; first = first || message; }
        else { bmClearError(message); }
      }
      return { ok: ok, first: first };
    };

    bmQsa('input, select, textarea', bmForm).forEach(function (el) {
      el.addEventListener('input', function () { bmClearError(el); if (bmStatus) { bmStatus.textContent = ''; bmStatus.className = 'bm-form-status'; } });
      el.addEventListener('change', function () { bmClearError(el); });
    });

    bmForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var res = bmValidate();
      if (!res.ok) {
        if (bmStatus) { bmStatus.textContent = 'Please fix the highlighted fields and try again.'; bmStatus.className = 'bm-form-status is-error'; }
        if (res.first && res.first.focus) { res.first.focus(); }
        return;
      }
      if (bmStatus) {
        bmStatus.textContent = 'Thanks — your message has been sent. We will be in touch soon.';
        bmStatus.className = 'bm-form-status is-ok';
      }
      bmForm.reset();
    });
  }

})();
