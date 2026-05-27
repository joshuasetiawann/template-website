/* Sofia Marchetti — Photographer · portfolio interactions
   Template: template-03-photographer (variant V3, dark showcase)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-03-photographer', owner: 'Sofia Marchetti' };

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

  /* --- Project quick-view modal --- */
  var modal = document.getElementById('project-modal');
  if (modal) {
    var modalTitle = modal.querySelector('#modal-title');
    var modalBlurb = modal.querySelector('.modal-blurb');
    var modalTags = modal.querySelector('.modal-tags');
    var modalArt = modal.querySelector('.modal-art');
    var modalClose = modal.querySelector('.modal-close');
    var modalOverlay = modal.querySelector('.modal-overlay');
    var lastFocus = null;
    var openModal = function (btn) {
      lastFocus = btn;
      if (modalTitle) { modalTitle.textContent = btn.getAttribute('data-title') || ''; }
      if (modalBlurb) { modalBlurb.textContent = btn.getAttribute('data-blurb') || ''; }
      if (modalTags) { modalTags.textContent = btn.getAttribute('data-tags') || ''; }
      if (modalArt) {
        modalArt.style.backgroundImage = 'linear-gradient(135deg,' +
          (btn.getAttribute('data-g1') || '#444') + ',' + (btn.getAttribute('data-g2') || '#111') + ')';
      }
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (modalClose) { modalClose.focus(); }
    };
    var closeModal = function () {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus) { lastFocus.focus(); }
    };
    Array.prototype.slice.call(document.querySelectorAll('.quick-view')).forEach(function (btn) {
      btn.addEventListener('click', function () { openModal(btn); });
    });
    if (modalClose) { modalClose.addEventListener('click', closeModal); }
    if (modalOverlay) { modalOverlay.addEventListener('click', closeModal); }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) { closeModal(); }
    });
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
   Release 2 — case-study page + link wiring · template-03-photographer
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

  /* Quick-view modal: aim the primary CTA at the matching case study */
  var caseModal = document.getElementById('project-modal');
  if (caseModal) {
    var caseModalCta = caseModal.querySelector('.modal-cta');
    if (caseModalCta) {
      Array.prototype.slice.call(document.querySelectorAll('.quick-view')).forEach(function (btn, fallbackIdx) {
        btn.addEventListener('click', function () {
          var n = btn.getAttribute('data-index');
          caseModalCta.setAttribute('href', 'project.html?p=' + (n === null ? String(fallbackIdx) : n));
        });
      });
    }
  }

  /* Case-study renderer: reads ?p= (0-5), falls back to project 0 */
  var caseRoot = document.querySelector('[data-case-page]');
  if (!caseRoot) { return; }
  var OWNER = "Sofia Marchetti";
  var CASES = [
    {
      "t": "Salt Roads — Sicilian coast series",
      "tags": [
        "Documentary",
        "Travel"
      ],
      "lede": "Eighteen months following salt harvesters in Trapani; 40-image essay, exhibited in Palermo and Arles.",
      "client": "Self-initiated · Galleria Sale",
      "year": "2024",
      "duration": "18 months",
      "ov1": "Eighteen months on the Trapani salt flats, following the harvesters through a full season — flood, evaporation, harvest, rest.",
      "ov2": "The essay runs to forty frames: labour at dawn, the geometry of the pans, salt mountains against weather. Shot on medium format, printed at one metre.",
      "ch": "Trust was the project. The harvesters had been photographed before, badly, in a hurry. The first month produced no usable frames on purpose.",
      "met": [
        [
          "40",
          "",
          "Frames in the final essay"
        ],
        [
          "18",
          "",
          "Months on the flats"
        ],
        [
          "2",
          "",
          "Exhibitions: Palermo & Arles"
        ]
      ],
      "figs": [
        [
          "#C9B896",
          "#3A2F1E",
          "Contact sheet from the first week"
        ],
        [
          "#4A4742",
          "#16140F",
          "Work print wall during the edit"
        ],
        [
          "#6E6557",
          "#23201B",
          "Location notebook with light timings"
        ]
      ],
      "q": [
        "Sofia photographed the work the way the harvesters describe it themselves — slow, exact, and without pity.",
        "Elena Fabbri",
        "Photo Editor, Meridiana"
      ]
    },
    {
      "t": "Night Shift portraits",
      "tags": [
        "Portrait",
        "Editorial"
      ],
      "lede": "Bakers, nurses and tram drivers photographed at 4am with one light and a thermos of coffee.",
      "client": "Meridiana Magazine",
      "year": "2023",
      "duration": "6 weeks",
      "ov1": "A commission about the people who keep a city running while it sleeps: bakers, nurses, tram drivers, photographed at the hour their shift owns.",
      "ov2": "One light, one stand, a thermos of coffee. Twenty-two portraits at 4am, each made in the sitter’s own workplace, published as a twelve-page feature.",
      "ch": "At 4am nobody wants a production. The discipline was a ten-minute setup and leaving before the bread proved or the ward round began.",
      "met": [
        [
          "22",
          "",
          "Portraits at 4am"
        ],
        [
          "12",
          "",
          "Pages in the printed feature"
        ],
        [
          "1",
          "",
          "Light used throughout"
        ]
      ],
      "figs": [
        [
          "#4A4742",
          "#16140F",
          "Press check for the printed edit"
        ],
        [
          "#6E6557",
          "#23201B",
          "Final sequence pinned for the book"
        ],
        [
          "#8A5A36",
          "#211208",
          "Exhibition install, opening night"
        ]
      ],
      "q": [
        "The series made the night shift visible to the day city. Our readers wrote in about it for a month.",
        "Elena Fabbri",
        "Photo Editor, Meridiana"
      ]
    },
    {
      "t": "Concrete Quiet",
      "tags": [
        "Architecture",
        "Series"
      ],
      "lede": "Brutalist housing estates across four countries, shot in fog to flatten time out of the frame.",
      "client": "Self-initiated",
      "year": "2022",
      "duration": "2 years",
      "ov1": "Brutalist housing estates in four countries, photographed only in fog — the weather that flattens decades out of concrete.",
      "ov2": "The series reads as one continuous estate. No people, no cars where I could wait them out, the same grey rendering Belgrade and Sheffield as neighbours.",
      "ch": "Fog is not on schedule. The project meant years of forecast-watching and dawn trains taken on two hours’ notice.",
      "met": [
        [
          "4",
          "",
          "Countries photographed"
        ],
        [
          "31",
          "",
          "Estates in the series"
        ],
        [
          "9",
          "",
          "Frames sold as editions"
        ]
      ],
      "figs": [
        [
          "#6E6557",
          "#23201B",
          "Contact sheet from the first week"
        ],
        [
          "#8A5A36",
          "#211208",
          "Work print wall during the edit"
        ],
        [
          "#5C5246",
          "#171310",
          "Location notebook with light timings"
        ]
      ],
      "q": [
        "Concrete Quiet hangs in our reading room — visitors assume it is one city. That is exactly the point.",
        "Dr. Anneke Vos",
        "Curator, Architecture Archive Rotterdam"
      ]
    },
    {
      "t": "La Festa — village August",
      "tags": [
        "Documentary",
        "Film"
      ],
      "lede": "One village festival on Portra 400, ten summers running. The grandmothers now request prints.",
      "client": "Self-initiated · printed by Laboratorio Nove",
      "year": "2025",
      "duration": "10 summers",
      "ov1": "The same village festival every August for ten years, on Portra 400 — processions, card tables, the band that never rehearses.",
      "ov2": "What began as a homesick visit became a decade-long document. The grandmothers now pose less and request prints more, which is how you know it is working.",
      "ch": "Returning is the method and the risk: each summer the village changes a little, and the edit has to hold a decade together without nostalgia doing the work.",
      "met": [
        [
          "10",
          "",
          "Summers photographed"
        ],
        [
          "300",
          "+",
          "Rolls of Portra shot"
        ],
        [
          "60",
          "",
          "Prints gifted to the village"
        ]
      ],
      "figs": [
        [
          "#8A5A36",
          "#211208",
          "Press check for the printed edit"
        ],
        [
          "#5C5246",
          "#171310",
          "Final sequence pinned for the book"
        ],
        [
          "#7E8A8F",
          "#1B2326",
          "Exhibition install, opening night"
        ]
      ],
      "q": [
        "She is the only photographer the grandmothers approve of. The prints hang next to the wedding photos.",
        "Don Marco Esposito",
        "Parish of San Leonardo"
      ]
    },
    {
      "t": "Maker hands commission",
      "tags": [
        "Editorial",
        "Commercial"
      ],
      "lede": "Craft campaign for a heritage leather house: 60 close-quarter frames of tools, wax and repetition.",
      "client": "Maison Verre",
      "year": "2024",
      "duration": "3 weeks",
      "ov1": "A heritage leather house wanted its craft shown without varnish. The commission: sixty frames of hands, tools, wax and repetition.",
      "ov2": "Shot close and quiet over three weeks in the atelier — no sets, no styling, the benches exactly as the artisans left them at lunch.",
      "ch": "Luxury clients usually want gloss. The work was convincing the brand that scuffed benches and burnished thumbs were the luxury.",
      "met": [
        [
          "60",
          "",
          "Frames delivered"
        ],
        [
          "3",
          "",
          "Weeks in the atelier"
        ],
        [
          "5",
          "",
          "Markets running the campaign"
        ]
      ],
      "figs": [
        [
          "#5C5246",
          "#171310",
          "Contact sheet from the first week"
        ],
        [
          "#7E8A8F",
          "#1B2326",
          "Work print wall during the edit"
        ],
        [
          "#C9B896",
          "#3A2F1E",
          "Location notebook with light timings"
        ]
      ],
      "q": [
        "She photographed our craftspeople like they were landscapes. Sales still uses every frame, two collections later.",
        "Henri Lacroix",
        "Brand Director, Maison Verre"
      ]
    },
    {
      "t": "Alpine weather diary",
      "tags": [
        "Travel",
        "Series"
      ],
      "lede": "A year of the same ridge in changing weather — published as a 96-page risograph zine.",
      "client": "Self-initiated · riso zine",
      "year": "2023",
      "duration": "12 months",
      "ov1": "One alpine ridge, photographed through a full year of weather — the same composition surrendered to fog, föhn wind, first snow.",
      "ov2": "The diary became a 96-page risograph zine in three spot colours, sequenced by atmosphere rather than calendar. It sold out its first print run.",
      "ch": "Repetition without monotony was the test: the frame never moves, so the weather has to carry the whole narrative arc.",
      "met": [
        [
          "96",
          "",
          "Pages in the zine"
        ],
        [
          "52",
          "",
          "Climbs up the same trail"
        ],
        [
          "2",
          "",
          "Print runs sold out"
        ]
      ],
      "figs": [
        [
          "#7E8A8F",
          "#1B2326",
          "Press check for the printed edit"
        ],
        [
          "#C9B896",
          "#3A2F1E",
          "Final sequence pinned for the book"
        ],
        [
          "#4A4742",
          "#16140F",
          "Exhibition install, opening night"
        ]
      ],
      "q": [
        "A year of one mountain, and somehow it reads like a thriller. The zine table emptied by Saturday noon.",
        "Petra Lindgren",
        "Organiser, Nordic Photobook Fair"
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
  put('data-case-kicker', 'Case study · ' + "Photographer & series editor" + ' · ' + data.year);
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
