/* Aurum & Crown — Watch Store | vanilla JS, no dependencies */
(function () {
  'use strict';
  var CONFIG = { brand: 'Aurum & Crown', currency: '$', freeShip: 0, addedNote: 'reserved in your cart', emptyNote: 'Your cart is empty — the vitrine awaits.', bagWord: 'cart', newsletterNote: 'Registered — the next Circular will reach you first.', checkoutNote: 'Demo template — checkout disabled' };

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function money(n) { return CONFIG.currency + n.toFixed(2); }

  /* ----- mobile navigation ----- */
  var navToggle = qs('[data-nav-toggle]');
  var navMenu = qs('[data-nav-menu]');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    qsa('a', navMenu).forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----- cart badge ----- */
  var badge = qs('[data-cart-count]');
  var cartQty = 0;
  function setBadge(n) {
    cartQty = n;
    if (!badge) { return; }
    badge.textContent = String(n);
    badge.classList.remove('bump');
    void badge.offsetWidth;
    badge.classList.add('bump');
  }

  /* ----- toast feedback (message + view-cart action) ----- */
  var toast = qs('[data-toast]');
  var toastMsg = qs('[data-toast-msg]');
  var toastView = qs('[data-toast-view]');
  var toastTimer = null;
  function showToast(msg, withAction) {
    if (!toast) { return; }
    if (toastMsg) { toastMsg.textContent = msg; } else { toast.textContent = msg; }
    if (toastView) { toastView.hidden = !withAction; }
    toast.classList.add('show');
    if (toastTimer) { clearTimeout(toastTimer); }
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, withAction ? 3400 : 2400);
  }
  function cartSummary() {
    if (cartQty === 0) { showToast(CONFIG.emptyNote, false); return; }
    showToast('You have ' + cartQty + (cartQty === 1 ? ' item' : ' items') + ' in your ' + CONFIG.bagWord + '.', false);
  }
  function addToCart(name) {
    setBadge(cartQty + 1);
    showToast(name + ' ' + CONFIG.addedNote, true);
  }
  var cartOpenBtn = qs('[data-cart-open]');
  if (cartOpenBtn) { cartOpenBtn.addEventListener('click', cartSummary); }
  if (toastView) { toastView.addEventListener('click', cartSummary); }

  /* ----- add-to-cart buttons ----- */
  qsa('[data-add]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var name = btn.getAttribute('data-name') || 'Item';
      var price = parseFloat(btn.getAttribute('data-price')) || 0;
      addToCart(name, price, btn.getAttribute('data-grad'));
      btn.classList.add('added');
      setTimeout(function () { btn.classList.remove('added'); }, 600);
    });
  });

  /* ----- newsletter form ----- */
  var form = qs('[data-newsletter]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = qs('input[type="email"]', form);
      var note = qs('[data-form-note]');
      if (!input || !note) { return; }
      var value = input.value.trim();
      if (!value || value.indexOf('@') === -1 || value.indexOf('.') === -1) {
        note.textContent = 'Please enter a valid email address.';
      } else {
        note.textContent = CONFIG.newsletterNote;
        input.value = '';
      }
      note.hidden = false;
    });
  }

  /* ----- category filtering ----- */
  var filterBtns = qsa('[data-filter]');
  var filterCards = qsa('[data-grid] [data-cat]');
  if (filterBtns.length && filterCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        var key = btn.getAttribute('data-filter');
        filterCards.forEach(function (card) {
          var show = key === 'all' || card.getAttribute('data-cat') === key;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ----- header scroll state + back-to-top ----- */
  var headerEl = qs('.site-header');
  var toTopBtn = qs('[data-totop]');
  function onScrollUi() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (headerEl) { headerEl.classList.toggle('is-scrolled', y > 8); }
    if (toTopBtn) { toTopBtn.classList.toggle('show', y > 600); }
  }
  window.addEventListener('scroll', onScrollUi, { passive: true });
  onScrollUi();
  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (err) { window.scrollTo(0, 0); }
    });
  }

  /* ----- auto copyright year ----- */
  qsa('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ----- scrollspy: aria-current on in-page nav links ----- */
  var spyLinks = qsa('[data-nav-menu] a[href^="#"]');
  var spyPairs = [];
  spyLinks.forEach(function (link) {
    var target = document.getElementById((link.getAttribute('href') || '').slice(1));
    if (target) { spyPairs.push({ link: link, target: target }); }
  });
  if (spyPairs.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        spyPairs.forEach(function (pair) {
          var on = pair.target === entry.target;
          pair.link.classList.toggle('is-current', on);
          if (on) { pair.link.setAttribute('aria-current', 'true'); } else { pair.link.removeAttribute('aria-current'); }
        });
      });
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });
    spyPairs.forEach(function (pair) { spy.observe(pair.target); });
  }

  /* ----- scroll reveal (class added by JS so content shows without JS) ----- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var revealEls = qsa('.section-head, .product-card, .cat-card, .testi-card, .blog-card, .look-tile, .usp, .trust-item, .stat, .fstat, .featured-visual, .featured-copy, .variant-stage, .slider, .cta-inner, .banner-b');
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        var el = entry.target;
        revealIO.unobserve(el);
        el.classList.add('is-in');
        setTimeout(function () { el.classList.remove('will-reveal', 'is-in'); el.style.transitionDelay = ''; }, 850);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -7% 0px' });
    revealEls.forEach(function (el, i) {
      el.classList.add('will-reveal');
      el.style.transitionDelay = ((i % 5) * 55) + 'ms';
      revealIO.observe(el);
    });
  }
})();

/* demo-link-guard: dead "#" links do not jump */
document.addEventListener("click",function(e){var t=e.target.closest?e.target.closest('a[href="#"]'):null;if(t){e.preventDefault();}});
/* === ecom shop/product page script === appended; fully null-safe */
(function () {
  'use strict';
  function qs(s, c) { return (c || document).querySelector(s); }
  function qsa(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- whole-card link + button stopPropagation (home + shop) ---------- */
  qsa('[data-card-link]').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('button')) { return; }
      var href = card.getAttribute('data-href');
      if (href) { window.location.href = href; }
    });
  });
  /* a click on an add-to-cart button must not bubble to the card link */
  qsa('[data-card-link] [data-add]').forEach(function (btn) {
    btn.addEventListener('click', function (e) { e.stopPropagation(); });
  });

  /* ---------- SHOP: category filter + sort + live count + empty state ---------- */
  var shopGrid = qs('[data-shop-grid]');
  if (shopGrid) {
    var shopCards = qsa('[data-cat]', shopGrid);
    var countEl = qs('[data-shop-count]');
    var emptyEl = qs('[data-shop-empty]');
    var chips = qsa('.shop-chips [data-filter]');
    var sortSel = qs('[data-shop-sort]');
    var resetBtn = qs('[data-shop-reset]');
    var activeFilter = 'all';
    shopCards.forEach(function (card, i) { card.setAttribute('data-i', String(i)); });

    function visibleCount() {
      var n = 0;
      shopCards.forEach(function (c) { if (!c.classList.contains('is-hidden')) { n += 1; } });
      return n;
    }
    function updateCount() {
      var n = visibleCount();
      if (countEl) { countEl.textContent = 'Showing ' + n + ' product' + (n === 1 ? '' : 's'); }
      if (emptyEl) { emptyEl.hidden = n !== 0; }
    }
    function applyFilter(key) {
      activeFilter = key;
      shopCards.forEach(function (card) {
        var show = key === 'all' || card.getAttribute('data-cat') === key;
        card.classList.toggle('is-hidden', !show);
      });
      updateCount();
    }
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
        chip.classList.add('is-active');
        chip.setAttribute('aria-pressed', 'true');
        applyFilter(chip.getAttribute('data-filter') || 'all');
      });
    });
    function sortGrid(mode) {
      var list = qsa('[data-cat]', shopGrid);
      list.sort(function (a, b) {
        if (mode === 'price-asc' || mode === 'price-desc') {
          var pa = parseFloat(a.getAttribute('data-price')) || 0;
          var pb = parseFloat(b.getAttribute('data-price')) || 0;
          return mode === 'price-asc' ? pa - pb : pb - pa;
        }
        if (mode === 'name') {
          return (a.getAttribute('data-name') || '').localeCompare(b.getAttribute('data-name') || '');
        }
        return (parseInt(a.getAttribute('data-i'), 10) || 0) - (parseInt(b.getAttribute('data-i'), 10) || 0);
      });
      list.forEach(function (card) { shopGrid.appendChild(card); });
    }
    if (sortSel) {
      sortSel.addEventListener('change', function () { sortGrid(sortSel.value); });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        chips.forEach(function (c) {
          var on = (c.getAttribute('data-filter') === 'all');
          c.classList.toggle('is-active', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        applyFilter('all');
      });
    }
    updateCount();
  }

  /* ---------- PRODUCT DETAIL ---------- */
  var pdpMain = qs('[data-pdp-main]');
  var products = window.PDP_PRODUCTS || [];
  if (pdpMain || qs('.pdp-page')) {
    var currency = window.PDP_CURRENCY || '$';
    var skuPrefix = window.PDP_SKU || 'SKU';
    var addLabel = window.PDP_ADD_LABEL || 'Add to Cart';

    function money(n) {
      var f = parseFloat(n);
      if (isNaN(f)) { return currency + n; }
      return currency + (f === Math.round(f) ? String(Math.round(f)) : f.toFixed(2));
    }
    function starsHtml(rating) {
      var full = Math.round(parseFloat(rating) || 0);
      var on = '<svg class="st" viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4l-5.8 3 1.1-6.4L2.6 9.4l6.5-.9z"/></svg>';
      var off = '<svg class="st st-off" viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true"><path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4L12 17.4l-5.8 3 1.1-6.4L2.6 9.4l6.5-.9z"/></svg>';
      var out = '';
      for (var i = 0; i < 5; i++) { out += i < full ? on : off; }
      return out;
    }

    /* read ?p= and resolve product (fallback to index 0) */
    var pIndex = 0;
    try {
      var sp = new URLSearchParams(window.location.search);
      var raw = sp.get('p');
      if (raw !== null) {
        var n = parseInt(raw, 10);
        if (!isNaN(n) && n >= 0 && n < products.length) { pIndex = n; }
      }
    } catch (err) { pIndex = 0; }
    var prod = products[pIndex] || products[0] || null;

    /* render the chosen product into the (server-rendered) PDP shell */
    if (prod) {
      var visEl = qs('[data-pdp-vis]');
      var titleEl = qs('[data-pdp-title]');
      var catEl = qs('[data-pdp-cat]');
      var priceEl = qs('[data-pdp-price]');
      var descEl = qs('[data-pdp-desc]');
      var starsEl = qs('[data-pdp-stars]');
      var rcountEl = qs('[data-pdp-rcount]');
      var skuEl = qs('[data-pdp-sku]');
      var badgeEl = qs('[data-pdp-badge]');
      var addBtn = qs('[data-pdp-add]');
      var crumbCur = qs('.crumbs li[aria-current="page"]');
      if (visEl) { visEl.textContent = prod.vis; }
      if (titleEl) { titleEl.textContent = prod.name; }
      if (catEl) { catEl.textContent = prod.catLabel || prod.cat || ''; }
      if (priceEl) { priceEl.textContent = money(prod.price); }
      if (descEl) { descEl.textContent = (prod.meta ? prod.meta + ' — ' : '') + 'a considered addition to the range, made to be used, kept and enjoyed.'; }
      if (starsEl) { starsEl.innerHTML = starsHtml(prod.rating); starsEl.setAttribute('aria-label', 'Rated ' + prod.rating + ' out of 5'); }
      if (rcountEl) { rcountEl.textContent = prod.rating + ' · ' + prod.rcount + ' reviews'; }
      if (skuEl) { skuEl.textContent = skuPrefix + '-' + String(1001 + pIndex); }
      if (crumbCur) { crumbCur.textContent = prod.name; }
      if (document.title.indexOf('Product') === 0) { document.title = prod.name + ' — ' + document.title.split(' — ').slice(1).join(' — '); }
      if (badgeEl) {
        if (prod.badge) { badgeEl.textContent = prod.badge; badgeEl.hidden = false; }
        else { badgeEl.hidden = true; }
      }
      if (pdpMain && prod.grad) { pdpMain.style.setProperty('--g', prod.grad); }
      if (addBtn) {
        addBtn.setAttribute('data-name', prod.name);
        addBtn.setAttribute('data-price', String(prod.price));
        if (prod.grad) { addBtn.setAttribute('data-grad', prod.grad); }
        addBtn.setAttribute('aria-label', 'Add ' + prod.name + ' to cart');
      }
      /* thumbnails: assign palette grads + main vis, wire swap */
      var thumbs = qsa('[data-pdp-thumb]');
      var palette = [];
      products.forEach(function (pp) { if (pp.grad && palette.indexOf(pp.grad) === -1) { palette.push(pp.grad); } });
      thumbs.forEach(function (th, i) {
        var g = i === 0 ? (prod.grad || palette[0]) : (palette[i % palette.length] || prod.grad);
        th.setAttribute('data-grad', g);
        th.style.setProperty('--g', g);
        var tv = qs('[data-pdp-thumb-vis]', th);
        if (tv) { tv.textContent = prod.vis; }
      });
    }

    /* gallery thumbnail swap */
    var galleryVis = qs('[data-pdp-vis]');
    qsa('[data-pdp-thumb]').forEach(function (th) {
      th.addEventListener('click', function () {
        qsa('[data-pdp-thumb]').forEach(function (t) { t.classList.remove('is-active'); t.removeAttribute('aria-current'); });
        th.classList.add('is-active');
        th.setAttribute('aria-current', 'true');
        var g = th.getAttribute('data-grad');
        if (pdpMain && g) { pdpMain.style.setProperty('--g', g); }
        if (galleryVis) {
          galleryVis.classList.add('swap');
          setTimeout(function () { galleryVis.classList.remove('swap'); }, 220);
        }
      });
    });

    /* option chips (per group: single active) */
    qsa('.pdp-opt').forEach(function (group) {
      var optBtns = qsa('[data-opt]', group);
      optBtns.forEach(function (b) {
        b.addEventListener('click', function () {
          optBtns.forEach(function (o) { o.classList.remove('is-active'); o.setAttribute('aria-pressed', 'false'); });
          b.classList.add('is-active');
          b.setAttribute('aria-pressed', 'true');
        });
      });
    });

    /* quantity stepper */
    var qtyVal = qs('[data-qty-val]');
    var qtyDec = qs('[data-qty-dec]');
    var qtyInc = qs('[data-qty-inc]');
    function getQty() { return Math.max(1, parseInt((qtyVal && qtyVal.textContent) || '1', 10) || 1); }
    function setQty(n) { if (qtyVal) { qtyVal.textContent = String(Math.max(1, n)); } }
    if (qtyDec) { qtyDec.addEventListener('click', function () { setQty(getQty() - 1); }); }
    if (qtyInc) { qtyInc.addEventListener('click', function () { setQty(getQty() + 1); }); }

    /* PDP add-to-cart honours the quantity stepper.
       The existing [data-add] handler adds 1 per click; here we add the extra
       (qty-1) by dispatching guarded synthetic clicks on the same button. */
    var pdpAdd = qs('[data-pdp-add]');
    if (pdpAdd) {
      var bulkGuard = false;
      pdpAdd.addEventListener('click', function () {
        if (bulkGuard) { return; }
        var extra = getQty() - 1;
        if (extra <= 0) { return; }
        bulkGuard = true;
        for (var i = 0; i < extra; i++) { pdpAdd.click(); }
        bulkGuard = false;
      });
    }

    /* tabs */
    var tabBtns = qsa('.tab-btn');
    var panels = qsa('.tab-panel');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.getAttribute('data-tab');
        tabBtns.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        panels.forEach(function (p) {
          var on = p.getAttribute('data-panel') === key;
          p.classList.toggle('is-active', on);
          p.hidden = !on;
        });
      });
    });

    /* related products: pre-rendered server-side (so their [data-add] buttons
       are bound by the base script at load). Here we just choose 4 to show,
       excluding the current product, and order them right after it. */
    var relatedWrap = qs('[data-pdp-related]');
    if (relatedWrap) {
      var relCards = qsa('[data-rel-index]', relatedWrap);
      var shownRel = 0;
      var total = relCards.length;
      relCards.forEach(function (c) { c.classList.add('is-hidden'); });
      for (var j = 1; j <= total && shownRel < 4; j++) {
        var k = (pIndex + j) % total;
        var card = relCards[k];
        if (!card || k === pIndex) { continue; }
        card.classList.remove('is-hidden');
        relatedWrap.appendChild(card); /* reorder into view sequence */
        shownRel += 1;
      }
    }
  }
})();

/* === ecom info pages (about + contact) === appended; fully null-safe, no console errors */
(function () {
  'use strict';
  function qs(s, c) { return (c || document).querySelector(s); }
  function qsa(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- contact form: inline validation + success ---------- */
  var cform = qs('[data-contact-form]');
  if (cform) {
    var success = qs('[data-contact-success]', cform);
    var fields = [
      { name: 'name', el: qs('#cf-name', cform) },
      { name: 'email', el: qs('#cf-email', cform) },
      { name: 'subject', el: qs('#cf-subject', cform) },
      { name: 'message', el: qs('#cf-message', cform) }
    ];
    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function fieldError(f) {
      if (!f.el) { return false; }
      var v = (f.el.value || '').trim();
      if (!v) { return true; }
      if (f.name === 'email' && !validEmail(v)) { return true; }
      return false;
    }
    function setFieldState(f) {
      if (!f.el) { return; }
      var wrap = f.el.closest('.ec-field');
      var err = wrap ? qs('[data-error-for="' + f.name + '"]', wrap) : null;
      var bad = fieldError(f);
      if (wrap) { wrap.classList.toggle('is-invalid', bad); }
      if (err) { err.hidden = !bad; }
      f.el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      return bad;
    }
    fields.forEach(function (f) {
      if (!f.el) { return; }
      f.el.addEventListener('blur', function () { setFieldState(f); });
      f.el.addEventListener('input', function () {
        var wrap = f.el.closest('.ec-field');
        if (wrap && wrap.classList.contains('is-invalid')) { setFieldState(f); }
      });
    });
    cform.addEventListener('submit', function (e) {
      e.preventDefault();
      var anyBad = false;
      var firstBad = null;
      fields.forEach(function (f) {
        var bad = setFieldState(f);
        if (bad && !firstBad) { firstBad = f.el; }
        anyBad = anyBad || bad;
      });
      if (success) { success.hidden = true; }
      if (anyBad) {
        if (firstBad && firstBad.focus) { firstBad.focus(); }
        return;
      }
      if (success) { success.hidden = false; }
      cform.reset();
      fields.forEach(function (f) {
        if (!f.el) { return; }
        var wrap = f.el.closest('.ec-field');
        if (wrap) { wrap.classList.remove('is-invalid'); }
        f.el.setAttribute('aria-invalid', 'false');
      });
    });
  }

  /* ---------- stats count-up (reduced-motion + IO safe) ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var countEls = qsa('[data-countup]');
  function parseTarget(raw) {
    var num = parseFloat((raw || '').replace(/[^0-9.]/g, ''));
    return isNaN(num) ? null : num;
  }
  function parts(raw) {
    // split into prefix + numeric token + suffix; only animatable if it round-trips
    // and the suffix has no further digits (so values like "1/3" stay static).
    var str = String(raw);
    var match = str.match(/^([^0-9]*)([0-9][0-9.,]*)(.*)$/);
    if (!match) { return null; }
    if (match[1] + match[2] + match[3] !== str) { return null; }
    if (/[0-9]/.test(match[3])) { return null; }
    return match;
  }
  function fmt(match, value, target) {
    var numStr = match[2];
    var dec = (numStr.indexOf('.') !== -1) ? (numStr.split('.')[1] || '').length : 0;
    var shown = (value >= target) ? numStr : value.toFixed(dec);
    return match[1] + shown + match[3];
  }
  function runCount(el) {
    var raw = el.getAttribute('data-countup');
    var seg = parts(raw);
    if (!seg) { el.textContent = raw; return; }
    var target = parseFloat(seg[2].replace(/,/g, ''));
    if (isNaN(target)) { el.textContent = raw; return; }
    if (reduce || !window.requestAnimationFrame) { el.textContent = raw; return; }
    var start = null;
    var dur = 1100;
    function step(ts) {
      if (start === null) { start = ts; }
      var p = Math.min(1, (ts - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(seg, target * eased, target);
      if (p < 1) { window.requestAnimationFrame(step); }
      else { el.textContent = raw; }
    }
    window.requestAnimationFrame(step);
  }
  if (countEls.length) {
    if ('IntersectionObserver' in window && !reduce) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) { return; }
          cio.unobserve(en.target);
          runCount(en.target);
        });
      }, { threshold: 0.4 });
      countEls.forEach(function (el) { cio.observe(el); });
    } else {
      countEls.forEach(function (el) { el.textContent = el.getAttribute('data-countup'); });
    }
  }

  /* ---------- scroll reveal for info-page blocks (JS adds hiding class => no-JS shows content) ---------- */
  var revealEls = qsa('.ec-reveal');
  if (revealEls.length && !reduce && 'IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        var el = en.target;
        rio.unobserve(el);
        el.classList.add('is-in');
        setTimeout(function () { el.classList.remove('will-reveal', 'is-in'); el.style.transitionDelay = ''; }, 850);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el, i) {
      el.classList.add('will-reveal');
      el.style.transitionDelay = ((i % 5) * 55) + 'ms';
      rio.observe(el);
    });
  }
})();
/* === end ecom info pages js === */
