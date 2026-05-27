/* Isabella Fontaine — Creative Director · portfolio interactions
   Template: template-15-creative-director (variant V4, editorial resume)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-15-creative-director', owner: 'Isabella Fontaine' };

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

  /* --- Case index expand / collapse --- */
  var caseHeads = Array.prototype.slice.call(document.querySelectorAll('.case-head'));
  caseHeads.forEach(function (head) {
    head.addEventListener('click', function () {
      var expanded = head.getAttribute('aria-expanded') === 'true';
      var id = head.getAttribute('aria-controls');
      var detail = id ? document.getElementById(id) : null;
      head.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      var caseItem = head.closest ? head.closest('.case-item') : null;
      if (caseItem) { caseItem.classList.toggle('is-open', !expanded); }
      if (detail) { detail.hidden = expanded; }
    });
  });

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
   Release 2 — case-study page + link wiring · template-15-creative-director
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
  var OWNER = "Isabella Fontaine";
  var CASES = [
    {
      "t": "“Doors Open” — National Theatre season",
      "tags": [
        "Culture",
        "Campaign"
      ],
      "lede": "Season identity that turned ticket stubs into collectible posters; subscriptions up 22%.",
      "client": "National Theatre",
      "year": "2025",
      "duration": "4 months",
      "ov1": "A season campaign for a theatre fighting the idea that it is not for everyone. \"Doors Open\" put the building’s backstage life on the posters.",
      "ov2": "Real prop-makers, wig rooms and fly towers shot at work — the season’s shows announced through the hands that build them. Box office followed.",
      "ch": "The institution wanted its stars; the strategy needed its staff. Winning that argument — politely, with research — was the campaign.",
      "met": [
        [
          "23",
          "%",
          "First-time booker increase"
        ],
        [
          "6",
          "",
          "Shows in the season campaign"
        ],
        [
          "48",
          "",
          "Sheet sites across the city"
        ]
      ],
      "figs": [
        [
          "#0E0E0C",
          "#5A5A50",
          "The brief, annotated and argued with"
        ],
        [
          "#3A3A34",
          "#C8C8BE",
          "Organising idea on one card"
        ],
        [
          "#23231F",
          "#8A8A7E",
          "Casting wall — craft partners shortlist"
        ]
      ],
      "q": [
        "The campaign made the building feel like ours to give. Crew bring their families to see their posters.",
        "Deborah Ainsley",
        "Marketing Director, National Theatre"
      ]
    },
    {
      "t": "Maison Lumen rebrand",
      "tags": [
        "Identity",
        "Luxury"
      ],
      "lede": "A 90-year-old candle house given a wordmark, voice and retail world that finally match the scent.",
      "client": "Maison Lumen",
      "year": "2024",
      "duration": "8 months",
      "ov1": "A heritage lighting house with a catalogue brand and a museum’s archive. The rebrand recast Lumen as what it is: a century of working with shadow.",
      "ov2": "New wordmark cut from their 1923 ledger hand, a shadow-first art direction, and packaging that unboxes like an eclipse. Wholesale doubled.",
      "ch": "Luxury rebrands fail by polishing away the oddness. We kept the archive’s strangeness and made it the system.",
      "met": [
        [
          "2",
          "x",
          "Wholesale accounts post-launch"
        ],
        [
          "100",
          "",
          "Years of archive mined"
        ],
        [
          "1",
          "",
          "Design grand prix"
        ]
      ],
      "figs": [
        [
          "#3A3A34",
          "#C8C8BE",
          "Press check, campaign week minus two"
        ],
        [
          "#23231F",
          "#8A8A7E",
          "The 48-sheet in the wild, day one"
        ],
        [
          "#0E0E0C",
          "#B9B9AB",
          "Ticket stub — the smallest touchpoint"
        ]
      ],
      "q": [
        "Isabella found our brand in our own basement. The eclipse box made buyers gasp in a trade hall.",
        "Mathilde Renard",
        "CEO, Maison Lumen"
      ]
    },
    {
      "t": "“Eat the Seasons” — Borough Markets",
      "tags": [
        "Campaign",
        "Food"
      ],
      "lede": "Twelve months of produce-led OOH shot by four photographers; won the grocer two design awards.",
      "client": "Borough Markets Collective",
      "year": "2023",
      "duration": "3 months",
      "ov1": "\"Eat the Seasons\" turned five city markets into one campaign without flattening them. The idea: the calendar is the menu.",
      "ov2": "Twelve poster editions, one per month, typeset around what is actually on the stalls — designed to be collected, stolen and framed.",
      "ch": "Five market boards, five opinions about typography. A shared system with monthly local variation kept every board proud and the campaign whole.",
      "met": [
        [
          "12",
          "",
          "Monthly poster editions"
        ],
        [
          "5",
          "",
          "Markets under one idea"
        ],
        [
          "17",
          "%",
          "Footfall lift year-on-year"
        ]
      ],
      "figs": [
        [
          "#23231F",
          "#8A8A7E",
          "The brief, annotated and argued with"
        ],
        [
          "#0E0E0C",
          "#B9B9AB",
          "Organising idea on one card"
        ],
        [
          "#2E2E28",
          "#D6D6C8",
          "Casting wall — craft partners shortlist"
        ]
      ],
      "q": [
        "Stallholders ask for next month’s poster before we print it. People frame the campaign in their kitchens.",
        "George Okafor",
        "Chair, Borough Markets Collective"
      ]
    },
    {
      "t": "Veloce Cycles launch film",
      "tags": [
        "Film",
        "Launch"
      ],
      "lede": "A 90-second film with no product shot until second 81. Pre-orders sold out the first run.",
      "client": "Veloce Cycles",
      "year": "2024",
      "duration": "10 weeks",
      "ov1": "An Italian bike marque launching its first e-bike to an audience that considers batteries cheating. The film leaned in: \"Effort, optional.\"",
      "ov2": "A three-minute launch film shot on the Stelvio — one rider, one grandmother, same summit. I directed the idea through script, edit and grade.",
      "ch": "The risk was tone: wink too hard and you insult the heritage buyer; too soft and the e-bike apologises for existing. The grandmother carried it.",
      "met": [
        [
          "3",
          "",
          "Minute launch film"
        ],
        [
          "5",
          "M",
          "Organic views, launch month"
        ],
        [
          "140",
          "%",
          "Of pre-order target hit"
        ]
      ],
      "figs": [
        [
          "#0E0E0C",
          "#B9B9AB",
          "Press check, campaign week minus two"
        ],
        [
          "#2E2E28",
          "#D6D6C8",
          "The 48-sheet in the wild, day one"
        ],
        [
          "#191916",
          "#A2A294",
          "Ticket stub — the smallest touchpoint"
        ]
      ],
      "q": [
        "The film let our purists laugh instead of sneer. Dealers played it on loop and sold out the first run.",
        "Stefano Veloce",
        "Brand Director, Veloce Cycles"
      ]
    },
    {
      "t": "Civic identity: Port of Rhyl",
      "tags": [
        "Identity",
        "Civic"
      ],
      "lede": "Wayfinding, flag and typeface for a regenerating harbour town — designed with its residents.",
      "client": "Port of Rhyl",
      "year": "2022",
      "duration": "6 months",
      "ov1": "A working port town commissioning its first civic identity — for residents, not tourists. The system is built from the harbour’s own signal flags.",
      "ov2": "A flag-based identity any council printer can reproduce: two inks, stencil-cut letterforms, and rules generous enough for the swimming club and the freight office alike.",
      "ch": "Civic identity dies by committee or by consultancy gloss. We ran open studios in the library — the town argued, contributed and finally owned it.",
      "met": [
        [
          "2",
          "",
          "Inks, reproducible anywhere"
        ],
        [
          "14",
          "",
          "Open studio sessions held"
        ],
        [
          "40",
          "+",
          "Local groups using the system"
        ]
      ],
      "figs": [
        [
          "#2E2E28",
          "#D6D6C8",
          "The brief, annotated and argued with"
        ],
        [
          "#191916",
          "#A2A294",
          "Organising idea on one card"
        ],
        [
          "#0E0E0C",
          "#5A5A50",
          "Casting wall — craft partners shortlist"
        ]
      ],
      "q": [
        "First identity work that didn’t feel done to us. The swimming club flies the flag system unironically.",
        "Cllr. Eleri Wynn",
        "Port of Rhyl Council"
      ]
    },
    {
      "t": "“Unfinished” gallery campaign",
      "tags": [
        "Culture",
        "Print"
      ],
      "lede": "Posters that shipped deliberately incomplete; visitors drew the rest. Attendance record broken.",
      "client": "Whitmore Gallery",
      "year": "2023",
      "duration": "7 weeks",
      "ov1": "A gallery’s show of abandoned masterworks needed a campaign about incompleteness. \"Unfinished\" let the campaign stop mid-sentence too.",
      "ov2": "Posters that end mid-word, a catalogue with blank final plates, ads that cut to black early. The city completed the sentences on social media.",
      "ch": "The craft was knowing where to stop: each piece breaks off exactly where curiosity peaks — a typographic cliff edge, measured in user tests.",
      "met": [
        [
          "30",
          "%",
          "Above attendance forecast"
        ],
        [
          "9",
          "",
          "Poster executions, all unfinished"
        ],
        [
          "1",
          "",
          "Outdoor craft award"
        ]
      ],
      "figs": [
        [
          "#191916",
          "#A2A294",
          "Press check, campaign week minus two"
        ],
        [
          "#0E0E0C",
          "#5A5A50",
          "The 48-sheet in the wild, day one"
        ],
        [
          "#3A3A34",
          "#C8C8BE",
          "Ticket stub — the smallest touchpoint"
        ]
      ],
      "q": [
        "The campaign was the first exhibit. Visitors arrived already in on the idea — the posters did the curating.",
        "Tessa Whitmore",
        "Director, Whitmore Gallery"
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
  put('data-case-kicker', 'Case study · ' + "Creative Director" + ' · ' + data.year);
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
