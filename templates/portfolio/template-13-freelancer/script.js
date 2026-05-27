/* Nadia Haddad — Freelance Web Designer & Developer · portfolio interactions
   Template: template-13-freelancer (variant V1, minimal type)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-13-freelancer', owner: 'Nadia Haddad' };

  /* --- Mobile navigation toggle --- */
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var open = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    siteNav.addEventListener('click', function (e) {
      if (e.target && e.target.tagName === 'A') {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }

  /* --- Project tag filter --- */
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('.filter-btn'));
  var projectCards = Array.prototype.slice.call(document.querySelectorAll('.project-card'));
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = (btn.getAttribute('data-filter') || 'all').toLowerCase();
        filterBtns.forEach(function (b) {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });
        projectCards.forEach(function (card) {
          var tags = (card.getAttribute('data-tags') || '').toLowerCase();
          var show = key === 'all' || tags.indexOf(key) !== -1;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* --- Skill bars animate on scroll --- */
  var barFills = Array.prototype.slice.call(document.querySelectorAll('.bar-fill'));
  if (barFills.length) {
    var fillBar = function (el) { el.style.width = (el.getAttribute('data-val') || '0') + '%'; };
    if ('IntersectionObserver' in window) {
      var barObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            fillBar(entry.target);
            barObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.35 });
      barFills.forEach(function (el) { barObserver.observe(el); });
    } else {
      barFills.forEach(fillBar);
    }
  }

  /* --- Copy email to clipboard --- */
  var copyBtns = Array.prototype.slice.call(document.querySelectorAll('.copy-btn'));
  copyBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var email = btn.getAttribute('data-email') || '';
      var status = btn.parentElement ? btn.parentElement.querySelector('.copy-status') : null;
      var announce = function (msg) {
        if (!status) { return; }
        status.textContent = msg;
        window.setTimeout(function () { status.textContent = ''; }, 2400);
      };
      var fallbackCopy = function () {
        var area = document.createElement('textarea');
        area.value = email;
        area.setAttribute('readonly', '');
        area.style.position = 'absolute';
        area.style.left = '-9999px';
        document.body.appendChild(area);
        area.select();
        try { document.execCommand('copy'); announce('Copied!'); }
        catch (err) { announce(email); }
        document.body.removeChild(area);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(
          function () { announce('Copied!'); },
          function () { fallbackCopy(); }
        );
      } else {
        fallbackCopy();
      }
    });
  });

  /* --- Count-up statistics on scroll --- */
  var statNums = Array.prototype.slice.call(document.querySelectorAll('.stat-num'));
  if (statNums.length) {
    var animateStat = function (el) {
      var target = parseInt(el.getAttribute('data-target') || '0', 10);
      var suffix = el.getAttribute('data-suffix') || '';
      var start = null;
      var tick = function (ts) {
        if (start === null) { start = ts; }
        var p = Math.min((ts - start) / 1300, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) { window.requestAnimationFrame(tick); }
      };
      window.requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      var statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateStat(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      statNums.forEach(function (el) { statObserver.observe(el); });
    } else {
      statNums.forEach(animateStat);
    }
  }

  /* --- Sticky header scroll state --- */
  var siteHeaderEl = document.querySelector('.site-header');
  if (siteHeaderEl) {
    var headerScrollState = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      siteHeaderEl.classList.toggle('is-scrolled', y > 8);
    };
    window.addEventListener('scroll', headerScrollState, { passive: true });
    headerScrollState();
  }

  /* --- Auto-updating footer year --- */
  Array.prototype.slice.call(document.querySelectorAll('[data-year]')).forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* --- Back to top --- */
  var toTopBtn = document.querySelector('[data-totop]');
  if (toTopBtn) {
    var toTopState = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      toTopBtn.classList.toggle('is-visible', y > 600);
    };
    window.addEventListener('scroll', toTopState, { passive: true });
    toTopState();
    toTopBtn.addEventListener('click', function () {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      try { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }
      catch (err) { window.scrollTo(0, 0); }
    });
  }

  /* --- Scrollspy: aria-current on nav links --- */
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"], .panel-nav a[href^="#"]'));
  var spyMap = {};
  var spySections = [];
  spyLinks.forEach(function (link) {
    var id = (link.getAttribute('href') || '').slice(1);
    if (!id) { return; }
    var target = document.getElementById(id);
    if (!target) { return; }
    if (!spyMap[id]) { spyMap[id] = []; }
    spyMap[id].push(link);
    if (spySections.indexOf(target) === -1) { spySections.push(target); }
  });
  if (spySections.length && 'IntersectionObserver' in window) {
    var setCurrent = function (id) {
      spyLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
      (spyMap[id] || []).forEach(function (l) { l.setAttribute('aria-current', 'true'); });
    };
    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setCurrent(entry.target.id); }
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    spySections.forEach(function (s) { spyObserver.observe(s); });
    var spyTopReset = function () {
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (y < 120) { spyLinks.forEach(function (l) { l.removeAttribute('aria-current'); }); }
    };
    window.addEventListener('scroll', spyTopReset, { passive: true });
  }

  /* --- Scroll reveal (JS-applied so content shows without JS) --- */
  var reduceMotionQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var revealTargets = Array.prototype.slice.call(document.querySelectorAll(
    '.section .container > h2, .project-card, .project-row, .masonry-card, .case-item, ' +
    '.timeline-item, .quote-card, .hl-card, .pull-quote, .service-card, .blog-card, ' +
    '.stat-cell, .bento-card, .skill-cell, .tool-cell, .award-row, .bar-row, ' +
    '.learning-card, .hero-card, .cta-banner-inner'
  ));
  if (revealTargets.length && 'IntersectionObserver' in window &&
      !(reduceMotionQuery && reduceMotionQuery.matches)) {
    revealTargets.forEach(function (el) { el.classList.add('reveal-init'); });
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
    revealTargets.forEach(function (el) { revealObs.observe(el); });
  }
  void SITE; /* kept for template consistency */
})();


/* ============================================================
   Release 2 — case-study page + link wiring · template-13-freelancer
   Appended, namespaced and null-safe: every block guards its
   selectors so index.html and project.html share this file.
   ============================================================ */
(function () {
  'use strict';

  /* Social placeholder links: swallow the click, never jump the page */
  document.addEventListener('click', function (e) {
    var node = e.target;
    while (node && node !== document) {
      if (node.nodeType === 1 && node.hasAttribute && node.hasAttribute('data-demo-link')) {
        e.preventDefault();
        return;
      }
      node = node.parentNode;
    }
  });

  /* Case-study renderer: reads ?p= (0-5), falls back to project 0 */
  var caseRoot = document.querySelector('[data-case-page]');
  if (!caseRoot) { return; }
  var OWNER = "Nadia Haddad";
  var CASES = [
    {
      "t": "Bakkerij De Gouden Korst",
      "tags": [
        "Hospitality",
        "Build"
      ],
      "lede": "Bakery site with live opening hours and order form; phone orders down, pre-orders up 3x.",
      "client": "Bakkerij De Gouden Korst",
      "year": "2025",
      "duration": "3 weeks",
      "ov1": "A third-generation bakery whose only web presence was an outdated map listing. The brief: show the bread, take the orders, close the phone chaos.",
      "ov2": "A one-page site with the day’s bake, holiday-order form and pickup slots. The counter staff update the bread list from a phone in thirty seconds.",
      "ch": "The bakery’s busiest hour is the web form’s busiest hour. Order emails had to be foolproof — printed automatically next to the till.",
      "met": [
        [
          "3",
          "",
          "Weeks, brief to launch"
        ],
        [
          "120",
          "+",
          "Holiday orders, first season"
        ],
        [
          "30",
          "",
          "Seconds to update the bake list"
        ]
      ],
      "figs": [
        [
          "#16A34A",
          "#86EFAC",
          "Kitchen-table brief, first notes"
        ],
        [
          "#14532D",
          "#4ADE80",
          "Homepage sketch beside the till"
        ],
        [
          "#15803D",
          "#A7F3D0",
          "Phone test outside the shop, week two"
        ]
      ],
      "q": [
        "The Christmas stollen orders used to be a notebook nightmare. This year the printer just hummed and we baked.",
        "Willem de Groot",
        "Owner, Bakkerij De Gouden Korst"
      ]
    },
    {
      "t": "Van Dijk Family Law",
      "tags": [
        "Professional",
        "Design"
      ],
      "lede": "Calm, plain-language redesign; consultation bookings doubled within two months.",
      "client": "Van Dijk Family Law",
      "year": "2024",
      "duration": "4 weeks",
      "ov1": "A two-partner law practice that looked, online, like a directory listing from 2009. They needed gravity and approachability in equal measure.",
      "ov2": "Calm typography, plain-language service pages and a contact flow that triages urgency. The site reads like advice, not advertising.",
      "ch": "Legal sites drown in reassuring clichés. Every sentence was rewritten with the partners until it sounded like them across a desk.",
      "met": [
        [
          "4",
          "",
          "Weeks including copy rewrite"
        ],
        [
          "2",
          "x",
          "Qualified enquiries per month"
        ],
        [
          "0",
          "",
          "Stock photos used"
        ]
      ],
      "figs": [
        [
          "#14532D",
          "#4ADE80",
          "Launch-day checklist, all green"
        ],
        [
          "#15803D",
          "#A7F3D0",
          "The owner updating prices solo"
        ],
        [
          "#166534",
          "#FACC15",
          "Before & after, side by side"
        ]
      ],
      "q": [
        "Clients now arrive having read how we work. First meetings start in the middle instead of at the beginning.",
        "Mr. Pieter van Dijk",
        "Partner, Van Dijk Family Law"
      ]
    },
    {
      "t": "Atlas Physio booking site",
      "tags": [
        "Health",
        "Build"
      ],
      "lede": "Four-location physio practice with online intake forms — 60% of bookings now self-served.",
      "client": "Atlas Physio",
      "year": "2025",
      "duration": "5 weeks",
      "ov1": "A physiotherapy clinic drowning in phone bookings. The new site lets patients book, move and cancel appointments without calling.",
      "ov2": "Booking integrates with the clinic diary; reminder emails cut no-shows. Exercise pages double as homework links the physios send after sessions.",
      "ch": "Reception feared the system would book chaos. We shadowed the desk for a day and encoded their unwritten rules — buffer slots included.",
      "met": [
        [
          "70",
          "%",
          "Bookings now self-served"
        ],
        [
          "40",
          "%",
          "Fewer no-shows"
        ],
        [
          "5",
          "",
          "Weeks to a calmer reception"
        ]
      ],
      "figs": [
        [
          "#15803D",
          "#A7F3D0",
          "Kitchen-table brief, first notes"
        ],
        [
          "#166534",
          "#FACC15",
          "Homepage sketch beside the till"
        ],
        [
          "#22C55E",
          "#0F766E",
          "Phone test outside the shop, week two"
        ]
      ],
      "q": [
        "The phone finally stopped. Patients book at 11pm and reception starts the day with a clean diary.",
        "Sanne Bakker",
        "Practice Manager, Atlas Physio"
      ]
    },
    {
      "t": "Souq Spice e-commerce",
      "tags": [
        "Retail",
        "E-commerce"
      ],
      "lede": "Lightweight shop for 120 products with same-day local delivery zones baked into checkout.",
      "client": "Souq Spice",
      "year": "2023",
      "duration": "6 weeks",
      "ov1": "A family spice stall going online without losing the market-stall feel. A small e-commerce build: forty products, honest photography, fast checkout.",
      "ov2": "I designed, photographed and built the lot. The spice blends ship in the same paper twists used at the stall — the site just made the queue longer.",
      "ch": "E-commerce platforms wanted monthly fees the margins could not carry. The build keeps running costs under a crate of cardamom a month.",
      "met": [
        [
          "40",
          "",
          "Products photographed & live"
        ],
        [
          "3",
          "x",
          "Weekend revenue with online orders"
        ],
        [
          "9",
          "",
          "Euro monthly running cost"
        ]
      ],
      "figs": [
        [
          "#166534",
          "#FACC15",
          "Launch-day checklist, all green"
        ],
        [
          "#22C55E",
          "#0F766E",
          "The owner updating prices solo"
        ],
        [
          "#10B981",
          "#064E3B",
          "Before & after, side by side"
        ]
      ],
      "q": [
        "We sell to customers who moved cities and still want our ras el hanout. The site smells right, somehow.",
        "Layla Haddad",
        "Owner, Souq Spice"
      ]
    },
    {
      "t": "Harbour Yoga studio",
      "tags": [
        "Hospitality",
        "Design"
      ],
      "lede": "Schedule-first design synced to their booking tool; mobile bounce rate halved.",
      "client": "Harbour Yoga",
      "year": "2024",
      "duration": "2 weeks",
      "ov1": "A yoga studio opening in a converted boat shed needed a site before the first class — schedule, prices, and the feeling of the room.",
      "ov2": "One long page: morning light photography, the week’s schedule, and a trial-class form. Launched nine days before the opening.",
      "ch": "The studio’s calm had to survive on a phone screen at bus-stop speed. We cut until the page breathed — then cut once more.",
      "met": [
        [
          "9",
          "",
          "Days before opening, launched"
        ],
        [
          "60",
          "",
          "Trial sign-ups pre-launch"
        ],
        [
          "1",
          "",
          "Page — deliberately"
        ]
      ],
      "figs": [
        [
          "#22C55E",
          "#0F766E",
          "Kitchen-table brief, first notes"
        ],
        [
          "#10B981",
          "#064E3B",
          "Homepage sketch beside the till"
        ],
        [
          "#16A34A",
          "#86EFAC",
          "Phone test outside the shop, week two"
        ]
      ],
      "q": [
        "People arrive saying the website felt like the room. First month sold out from one page.",
        "Femke Visser",
        "Founder, Harbour Yoga"
      ]
    },
    {
      "t": "Meijer & Zoon plumbing",
      "tags": [
        "Trades",
        "Build"
      ],
      "lede": "One-page site with a giant call button and emergency-rate table. It does one job perfectly.",
      "client": "Meijer & Zoon",
      "year": "2023",
      "duration": "3 weeks",
      "ov1": "A father-and-son plumbing firm whose work came entirely by word of mouth — which stops working when the neighbourhood changes. They needed to be findable.",
      "ov2": "A no-nonsense site: services, photos of real jobs, response times and a call button that is always one thumb away. Local search finally finds them.",
      "ch": "Nobody browses plumbers for pleasure. The whole design serves one moment: water on the floor, phone in hand, thirty seconds of patience.",
      "met": [
        [
          "3",
          "",
          "Weeks, brief to live"
        ],
        [
          "2",
          "x",
          "Calls from new customers"
        ],
        [
          "1",
          "",
          "Thumb to reach the call button"
        ]
      ],
      "figs": [
        [
          "#10B981",
          "#064E3B",
          "Launch-day checklist, all green"
        ],
        [
          "#16A34A",
          "#86EFAC",
          "The owner updating prices solo"
        ],
        [
          "#14532D",
          "#4ADE80",
          "Before & after, side by side"
        ]
      ],
      "q": [
        "The young families calling now found us on their phones, not through their mothers. Sjoerd finally admits the site works.",
        "Henk Meijer",
        "Owner, Meijer & Zoon"
      ]
    }
  ];
  var total = CASES.length;
  var idx = 0;
  var search = (window.location && window.location.search) || '';
  var match = /[?&]p=(\d+)/.exec(search);
  if (match) { idx = parseInt(match[1], 10); }
  if (isNaN(idx) || idx < 0 || idx >= total) { idx = 0; }
  var data = CASES[idx];
  var put = function (attr, value) {
    var el = document.querySelector('[' + attr + ']');
    if (el && value != null) { el.textContent = value; }
  };
  put('data-case-title', data.t);
  put('data-case-crumb', data.t);
  put('data-case-kicker', 'Case study · ' + "Designer & Developer (one pair of hands)" + ' · ' + data.year);
  put('data-case-lede', data.lede);
  put('data-case-client', data.client);
  put('data-case-year', data.year);
  put('data-case-duration', data.duration);
  put('data-case-ov1', data.ov1);
  put('data-case-ov2', data.ov2);
  put('data-case-ch', data.ch);
  put('data-case-quote', data.q[0]);
  put('data-case-quote-by', data.q[1]);
  put('data-case-quote-role', '— ' + data.q[2]);
  document.title = data.t + ' — ' + OWNER;
  var chipWrap = document.querySelector('[data-case-chips]');
  if (chipWrap) {
    while (chipWrap.firstChild) { chipWrap.removeChild(chipWrap.firstChild); }
    data.tags.forEach(function (tag) {
      var li = document.createElement('li');
      li.textContent = tag;
      chipWrap.appendChild(li);
    });
  }
  Array.prototype.slice.call(document.querySelectorAll('.cs-outcomes .stat-cell')).forEach(function (cell, i) {
    var metric = data.met[i];
    if (!metric) { return; }
    var num = cell.querySelector('.stat-num');
    var label = cell.querySelector('.stat-label');
    if (num) {
      num.setAttribute('data-target', metric[0]);
      num.setAttribute('data-suffix', metric[1]);
      num.textContent = '0';
    }
    if (label) { label.textContent = metric[2]; }
  });
  Array.prototype.slice.call(document.querySelectorAll('.cs-fig')).forEach(function (fig, i) {
    var f = data.figs[i];
    if (!f) { return; }
    var thumb = fig.querySelector('.cs-fig-thumb');
    var cap = fig.querySelector('figcaption');
    if (thumb) { thumb.style.backgroundImage = 'linear-gradient(135deg,' + f[0] + ',' + f[1] + ')'; }
    if (cap) { cap.textContent = f[2]; }
  });
  var prevIdx = (idx + total - 1) % total;
  var nextIdx = (idx + 1) % total;
  var prevLink = document.querySelector('[data-case-prev]');
  var nextLink = document.querySelector('[data-case-next]');
  if (prevLink) { prevLink.setAttribute('href', 'project.html?p=' + prevIdx); }
  if (nextLink) { nextLink.setAttribute('href', 'project.html?p=' + nextIdx); }
  var prevName = document.querySelector('[data-case-prev-name]');
  var nextName = document.querySelector('[data-case-next-name]');
  if (prevName) { prevName.textContent = CASES[prevIdx].t; }
  if (nextName) { nextName.textContent = CASES[nextIdx].t; }
})();

/* demo-link-guard: dead "#" links do not jump */
document.addEventListener("click",function(e){var t=e.target.closest?e.target.closest('a[href="#"]'):null;if(t){e.preventDefault();}});

/* === pfp-pages: appended page behaviour (null-safe) === */
(function () {
  'use strict';
  /* skill bars on the new pages (namespaced, mirrors the template's bar animation) */
  var pfpBars = Array.prototype.slice.call(document.querySelectorAll('.pfp-bar-fill'));
  if (pfpBars.length) {
    var fill = function (el) { el.style.width = (el.getAttribute('data-val') || '0') + '%'; };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { fill(en.target); io.unobserve(en.target); }
        });
      }, { threshold: 0.3 });
      pfpBars.forEach(function (el) { io.observe(el); });
    } else {
      pfpBars.forEach(fill);
    }
  }

  /* work.html filter chips */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.pfp-chip'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.pfp-card'));
  var emptyMsg = document.querySelector('[data-pfp-empty]');
  if (chips.length && cards.length) {
    var applyFilter = function (f) {
      var shown = 0;
      cards.forEach(function (card) {
        var tags = (card.getAttribute('data-tags') || '').split(/\s+/);
        var show = f === 'all' || tags.indexOf(f) !== -1;
        card.classList.toggle('is-hidden', !show);
        if (show) { shown++; }
      });
      if (emptyMsg) { emptyMsg.hidden = shown !== 0; }
    };
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('is-active'); c.setAttribute('aria-pressed', 'false'); });
        chip.classList.add('is-active');
        chip.setAttribute('aria-pressed', 'true');
        applyFilter(chip.getAttribute('data-filter') || 'all');
      });
    });
  }

  /* contact.html form validation */
  var form = document.getElementById('pfp-contact-form');
  if (form) {
    var emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };
    var rules = [
      { id: 'pf-name', err: 'pf-err-name', ok: function (v) { return v.trim().length >= 2; }, msg: 'Please tell me your name.' },
      { id: 'pf-email', err: 'pf-err-email', ok: emailOk, msg: 'That email does not look right.' },
      { id: 'pf-msg', err: 'pf-err-msg', ok: function (v) { return v.trim().length >= 10; }, msg: 'A sentence or two helps me reply usefully.' }
    ];
    var validate = function (rule) {
      var input = document.getElementById(rule.id);
      var error = document.getElementById(rule.err);
      if (!input) { return true; }
      var valid = rule.ok(input.value || '');
      if (error) { error.textContent = valid ? '' : rule.msg; }
      var wrap = input.closest ? input.closest('.pfp-field') : null;
      if (wrap) { wrap.classList.toggle('has-error', !valid); }
      return valid;
    };
    rules.forEach(function (rule) {
      var input = document.getElementById(rule.id);
      if (input) { input.addEventListener('input', function () { validate(rule); }); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = rules.map(validate).every(function (v) { return v; });
      var ok = document.getElementById('pf-success');
      if (allValid) {
        if (ok) { ok.textContent = 'Thanks — your message is ready to send. (Demo form: wire it to your backend or a form service.)'; }
        form.reset();
      } else if (ok) {
        ok.textContent = '';
      }
    });
  }
})();
