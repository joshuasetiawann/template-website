/* Jae-won Park — Video Editor · portfolio interactions
   Template: template-04-video-editor (variant V5, bento playful)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-04-video-editor', owner: 'Jae-won Park' };

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
   Release 2 — case-study page + link wiring · template-04-video-editor
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
  var OWNER = "Jae-won Park";
  var CASES = [
    {
      "t": "“Steel & Steam” brand film",
      "tags": [
        "Brand",
        "Color"
      ],
      "lede": "4-minute foundry film for a heritage knife maker; 6M organic views and one very happy blacksmith.",
      "client": "Hyosung Forge",
      "year": "2025",
      "duration": "5 weeks",
      "ov1": "A heritage steelworks wanted a brand film that felt like the foundry sounds — percussive, hot, precise. I cut and graded the three-minute hero film.",
      "ov2": "We built the rhythm from the factory itself: hammer hits became the click track, and the grade pushed teal shadows against furnace orange.",
      "ch": "Sixty hours of footage and no script — the structure had to be found in the material, then defended against a committee that wanted everything in.",
      "met": [
        [
          "3",
          "",
          "Minute hero film"
        ],
        [
          "60",
          "",
          "Hours of rushes logged"
        ],
        [
          "8",
          "",
          "Cutdowns delivered"
        ]
      ],
      "figs": [
        [
          "#FF4757",
          "#7A1320",
          "Selects timeline, day two"
        ],
        [
          "#FFB02E",
          "#7A4A05",
          "Paper edit beside the assembly"
        ],
        [
          "#FF6B57",
          "#3A0E14",
          "Grade suite — before and after split"
        ]
      ],
      "q": [
        "The film sounds like our floor and looks better than our brochures ever did. The board approved it on first viewing.",
        "Min-ji Seo",
        "Brand Director, Hyosung Forge"
      ]
    },
    {
      "t": "Han River — feature doc",
      "tags": [
        "Documentary",
        "Edit"
      ],
      "lede": "82-minute documentary cut from 190 hours of footage; premiered at two festivals in 2025.",
      "client": "Docu-collective Hangang",
      "year": "2024",
      "duration": "7 months",
      "ov1": "A feature documentary following four lives along the Han River across one year. I was lead editor, shaping 140 hours into 84 minutes.",
      "ov2": "Four storylines braided by season, with the river as the only narrator. We cut the festival version and the broadcast hour from one master timeline.",
      "ch": "Four protagonists, no voiceover, one river: keeping the audience oriented without captions doing the storytelling took five full restructures.",
      "met": [
        [
          "140",
          "",
          "Hours of rushes"
        ],
        [
          "84",
          "",
          "Minute festival cut"
        ],
        [
          "3",
          "",
          "Festival selections"
        ]
      ],
      "figs": [
        [
          "#FFB02E",
          "#7A4A05",
          "Sound design session for the final mix"
        ],
        [
          "#FF6B57",
          "#3A0E14",
          "Title frame from the delivered master"
        ],
        [
          "#FF4757",
          "#2B2F6B",
          "Versioning grid for all deliverables"
        ]
      ],
      "q": [
        "Jae-won found the film we hoped we had shot. The restructure of act two saved the entire project.",
        "Park Soo-ah",
        "Director, Hangang Collective"
      ]
    },
    {
      "t": "Volt e-bike launch campaign",
      "tags": [
        "Brand",
        "Social"
      ],
      "lede": "Hero film plus 14 cutdowns in 9:16, 1:1 and 16:9 — one grade, one rhythm, every platform.",
      "client": "Volt Mobility",
      "year": "2025",
      "duration": "4 weeks",
      "ov1": "An e-bike launch across paid social, retail screens and a sixty-second anchor film. I owned the edit and the versioning matrix.",
      "ov2": "One shoot became twenty-three deliverables: the anchor cut, vertical recuts with re-staged pacing, and silent loops that still sell the product.",
      "ch": "Social cutdowns die when they are just crops. Each ratio got its own edit logic — hooks re-ordered, supers rewritten, pace per platform.",
      "met": [
        [
          "23",
          "",
          "Deliverables from one shoot"
        ],
        [
          "6",
          "",
          "Aspect ratios mastered"
        ],
        [
          "40",
          "M",
          "Campaign impressions"
        ]
      ],
      "figs": [
        [
          "#FF6B57",
          "#3A0E14",
          "Selects timeline, day two"
        ],
        [
          "#FF4757",
          "#2B2F6B",
          "Paper edit beside the assembly"
        ],
        [
          "#E8333F",
          "#1A1D24",
          "Grade suite — before and after split"
        ]
      ],
      "q": [
        "Every cutdown felt designed for its feed, not exported to it. Paid performance beat the last launch by half again.",
        "Lena Fischer",
        "Head of Marketing, Volt Mobility"
      ]
    },
    {
      "t": "“Low Orbit” title sequence",
      "tags": [
        "Titles",
        "Motion"
      ],
      "lede": "Sci-fi podcast title sequence: kinetic type, scanline textures, and a 4-bar loop that never tires.",
      "client": "Studio Antumbra",
      "year": "2023",
      "duration": "6 weeks",
      "ov1": "A streaming sci-fi series needed a title sequence: ninety seconds establishing a world of orbital debris and analogue radios.",
      "ov2": "I edited and finished the sequence — typography drifting in parallax against archive NASA textures, cut to a pulse that syncs with the score’s telemetry blips.",
      "ch": "Titles must survive being watched forty times. The cut hides micro-variations so episode ten still rewards attention.",
      "met": [
        [
          "90",
          "",
          "Seconds of title sequence"
        ],
        [
          "10",
          "",
          "Episodes aired with it"
        ],
        [
          "1",
          "",
          "Festival title-design award"
        ]
      ],
      "figs": [
        [
          "#FF4757",
          "#2B2F6B",
          "Sound design session for the final mix"
        ],
        [
          "#E8333F",
          "#1A1D24",
          "Title frame from the delivered master"
        ],
        [
          "#FF8E3C",
          "#5A2208",
          "Versioning grid for all deliverables"
        ]
      ],
      "q": [
        "Viewers stopped skipping the intro — the platform metrics actually show it. That is the whole brief, achieved.",
        "Tomas Lindqvist",
        "Showrunner, Low Orbit"
      ]
    },
    {
      "t": "Resonance concert recap",
      "tags": [
        "Music",
        "Edit"
      ],
      "lede": "11-camera festival multicam cut to a single continuous crescendo; delivered in 48 hours.",
      "client": "Resonance Festival",
      "year": "2024",
      "duration": "10 days",
      "ov1": "Three stages, two nights, one recap film due before ticket sales opened for next year. I cut the ninety-second aftermovie and ten artist verticals.",
      "ov2": "The edit syncs crowd physics to the headline track’s build — drone passes on the drops, faces in the breakdowns, no logos until the last card.",
      "ch": "Ten days from final encore to delivery. The select-and-assembly system was built before the festival gates opened.",
      "met": [
        [
          "90",
          "",
          "Second aftermovie"
        ],
        [
          "10",
          "",
          "Artist verticals shipped"
        ],
        [
          "38",
          "%",
          "Early-bird sales lift"
        ]
      ],
      "figs": [
        [
          "#E8333F",
          "#1A1D24",
          "Selects timeline, day two"
        ],
        [
          "#FF8E3C",
          "#5A2208",
          "Paper edit beside the assembly"
        ],
        [
          "#FF4757",
          "#7A1320",
          "Grade suite — before and after split"
        ]
      ],
      "q": [
        "The aftermovie sold next year’s festival in a weekend. The verticals carried our artists’ announcements for a month.",
        "Karim Benali",
        "Festival Director, Resonance"
      ]
    },
    {
      "t": "Maker docs series (8 eps)",
      "tags": [
        "Documentary",
        "Social"
      ],
      "lede": "Eight 6-minute craftsman portraits; consistent grade and structure so the series binge-watches.",
      "client": "Workshop Stories",
      "year": "2023",
      "duration": "4 months",
      "ov1": "An eight-episode documentary series on craftspeople — potters, luthiers, a neon bender — each episode cut for broadcast half-hour and social.",
      "ov2": "I edited all eight, building a series grammar: cold open on hands, one mistake per episode kept in, end cards in the maker’s handwriting.",
      "ch": "Eight different crafts had to feel like one series without flattening the makers into a format. The grammar bent for every episode, deliberately.",
      "met": [
        [
          "8",
          "",
          "Episodes delivered"
        ],
        [
          "30",
          "",
          "Minute broadcast format"
        ],
        [
          "2",
          "M",
          "Cross-platform views"
        ]
      ],
      "figs": [
        [
          "#FF8E3C",
          "#5A2208",
          "Sound design session for the final mix"
        ],
        [
          "#FF4757",
          "#7A1320",
          "Title frame from the delivered master"
        ],
        [
          "#FFB02E",
          "#7A4A05",
          "Versioning grid for all deliverables"
        ]
      ],
      "q": [
        "The series rhythm is unmistakably one voice, yet every maker says their episode feels personal. That balance is the editor’s craft.",
        "Hannah Cho",
        "Commissioning Editor, Channel Atlas"
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
  put('data-case-kicker', 'Case study · ' + "Lead Editor & Colourist" + ' · ' + data.year);
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
