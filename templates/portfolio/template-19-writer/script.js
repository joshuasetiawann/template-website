/* Margaret Liu — Writer & Essayist · portfolio interactions
   Template: template-19-writer (variant V1, minimal type)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-19-writer', owner: 'Margaret Liu' };

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
   Release 2 — case-study page + link wiring · template-19-writer
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
  var OWNER = "Margaret Liu";
  var CASES = [
    {
      "t": "“The Last Ferry Schedule” — essay",
      "tags": [
        "Essays",
        "Cities"
      ],
      "lede": "8,000 words on island commuters and the timetable that holds a community together. Anthologised twice.",
      "client": "Harbourline Review",
      "year": "2025",
      "duration": "4 months",
      "ov1": "An essay about the last ferry timetable of a dying island route — and what schedules mean to places that are running out of them.",
      "ov2": "Reported across three crossings and forty years of timetable archives; the essay reads the route’s decline in minutes shaved and sailings dropped.",
      "ch": "The temptation was elegy. The essay had to stay precise — grief in the data, not in the adjectives.",
      "met": [
        [
          "7",
          "k",
          "Words, final cut"
        ],
        [
          "3",
          "",
          "Crossings reported aboard"
        ],
        [
          "1",
          "",
          "National essay prize shortlist"
        ]
      ],
      "figs": [
        [
          "#7D2A3A",
          "#B85C6C",
          "Field notebook, ferry deck"
        ],
        [
          "#3F2A20",
          "#8A6A52",
          "First draft with the cull marks"
        ],
        [
          "#96334A",
          "#46141E",
          "Index cards on the corkboard"
        ]
      ],
      "q": [
        "The timetable essay did what good nonfiction does: made policy feel like weather. Readers wrote in from islands we never named.",
        "Frances Holt",
        "Editor, Harbourline Review"
      ]
    },
    {
      "t": "“Salt & Smoke” — book",
      "tags": [
        "Books",
        "Food"
      ],
      "lede": "A history of preserved fish in eleven kitchens across three coasts. Shortlisted for a food-writing prize.",
      "client": "Greywater Press",
      "year": "2023",
      "duration": "3 years",
      "ov1": "Salt & Smoke is a book about preserved fish and the North Atlantic towns that preserve themselves alongside it. Food writing as cultural history.",
      "ov2": "Three years, nine towns, one smokehouse fire narrowly survived. The book braids recipes with obituaries — the form the subject demanded.",
      "ch": "The research outgrew the book twice. The discipline was structural: each chapter anchored to one town, one technique, one family.",
      "met": [
        [
          "9",
          "",
          "Towns across three countries"
        ],
        [
          "80",
          "k",
          "Words published"
        ],
        [
          "2",
          "",
          "Food-writing awards"
        ]
      ],
      "figs": [
        [
          "#3F2A20",
          "#8A6A52",
          "Galley proof with final corrections"
        ],
        [
          "#96334A",
          "#46141E",
          "The published page, as printed"
        ],
        [
          "#7D2A3A",
          "#3F2A20",
          "Reading copy, dog-eared by tour"
        ]
      ],
      "q": [
        "Salt & Smoke made our backlist look timid. It is shelved in food, history and memoir — and sells from all three.",
        "Nora Driscoll",
        "Publisher, Greywater Press"
      ]
    },
    {
      "t": "Night market trilogy",
      "tags": [
        "Reportage",
        "Food"
      ],
      "lede": "Three linked features from Taipei, Marrakech and Oaxaca on informal economies after dark.",
      "client": "Commissioned · Meridian Quarterly",
      "year": "2024",
      "duration": "5 months",
      "ov1": "Three linked essays on night markets — Taipei, Marrakesh, Palermo — about what cities admit after dark that they deny at noon.",
      "ov2": "Reported at stall level: the trilogy follows money, smoke and rumour through three nights, and was published as a quarterly centrepiece.",
      "ch": "Three cities risked three postcards. The trilogy works because each essay argues with the previous one — the form keeps the romance honest.",
      "met": [
        [
          "3",
          "",
          "Cities, one argument"
        ],
        [
          "18",
          "k",
          "Words across the trilogy"
        ],
        [
          "1",
          "",
          "Anthology inclusion, year’s best"
        ]
      ],
      "figs": [
        [
          "#96334A",
          "#46141E",
          "Field notebook, ferry deck"
        ],
        [
          "#7D2A3A",
          "#3F2A20",
          "First draft with the cull marks"
        ],
        [
          "#A8485C",
          "#5C2230",
          "Index cards on the corkboard"
        ]
      ],
      "q": [
        "The trilogy is the piece our subscribers cite at renewal. Margaret writes hunger like a foreign correspondent.",
        "Owen Maxwell",
        "Editor, Meridian Quarterly"
      ]
    },
    {
      "t": "“Against the Open Floor Plan”",
      "tags": [
        "Criticism",
        "Cities"
      ],
      "lede": "A grumpy, well-cited argument about walls. My most-forwarded piece by a wide margin.",
      "client": "The City Ledger (column)",
      "year": "2023",
      "duration": "6 weeks",
      "ov1": "A criticism piece against the open floor plan — written from the archives of office design and the testimony of people who cannot think in them.",
      "ov2": "Part architectural history, part workplace reporting, the essay traces how a utopian idea became a cost-saving with a vocabulary.",
      "ch": "Polemic is easy; criticism is harder. Every claim about noise and attention is sourced, which is why facilities managers forwarded it anyway.",
      "met": [
        [
          "5",
          "k",
          "Words of sourced criticism"
        ],
        [
          "200",
          "+",
          "Reader letters received"
        ],
        [
          "3",
          "",
          "Syndicated reprints"
        ]
      ],
      "figs": [
        [
          "#7D2A3A",
          "#3F2A20",
          "Galley proof with final corrections"
        ],
        [
          "#A8485C",
          "#5C2230",
          "The published page, as printed"
        ],
        [
          "#6B2433",
          "#C98A96",
          "Reading copy, dog-eared by tour"
        ]
      ],
      "q": [
        "We ran it expecting argument and got confession — half our letters began \"I manage an open office and…\". That is reach.",
        "Dana Whitcombe",
        "Editor, The City Ledger"
      ]
    },
    {
      "t": "Bread Lines — column",
      "tags": [
        "Essays",
        "Food"
      ],
      "lede": "Monthly column on bakeries as civic infrastructure; 30 instalments and three marriage proposals.",
      "client": "Bread Lines · monthly column",
      "year": "2022",
      "duration": "Ongoing",
      "ov1": "A monthly column that reads cities through their bakery queues: who waits, what they carry, what the queue knows before the news does.",
      "ov2": "Thirty-one columns and counting — each one city, one queue, eight hundred words. Collected edition under discussion.",
      "ch": "A column is a promise of variation within a form. The queue conceit must surprise monthly or die — the constraint is the engine.",
      "met": [
        [
          "31",
          "",
          "Columns published"
        ],
        [
          "800",
          "",
          "Words, never more"
        ],
        [
          "1",
          "",
          "Collected edition in negotiation"
        ]
      ],
      "figs": [
        [
          "#A8485C",
          "#5C2230",
          "Field notebook, ferry deck"
        ],
        [
          "#6B2433",
          "#C98A96",
          "First draft with the cull marks"
        ],
        [
          "#7D2A3A",
          "#B85C6C",
          "Index cards on the corkboard"
        ]
      ],
      "q": [
        "Bread Lines is the page our readers turn to first. Margaret found a lens that makes every city legible.",
        "Frances Holt",
        "Editor, Harbourline Review"
      ]
    },
    {
      "t": "“Harbour Light” — novel",
      "tags": [
        "Fiction",
        "Books"
      ],
      "lede": "A novel about a ferry master’s daughter and a disappearing port town. Out spring 2027.",
      "client": "Greywater Press",
      "year": "2026",
      "duration": "4 years",
      "ov1": "Harbour Light is a novel about a lighthouse keeper’s daughter who automates her father out of his work — set in 1908, written for now.",
      "ov2": "Four years, three full drafts, one structural rescue by a ruthless editor. Out next spring; rights sold in four territories.",
      "ch": "Fiction after nonfiction meant unlearning the safety of sources. The novel only worked once the research stopped showing.",
      "met": [
        [
          "3",
          "",
          "Full drafts written"
        ],
        [
          "4",
          "",
          "Territories, rights sold"
        ],
        [
          "1908",
          "",
          "The year the novel inhabits"
        ]
      ],
      "figs": [
        [
          "#6B2433",
          "#C98A96",
          "Galley proof with final corrections"
        ],
        [
          "#7D2A3A",
          "#B85C6C",
          "The published page, as printed"
        ],
        [
          "#3F2A20",
          "#8A6A52",
          "Reading copy, dog-eared by tour"
        ]
      ],
      "q": [
        "Harbour Light reads like Margaret invented the weather. The automation argument hiding inside the love story is the trick of it.",
        "Nora Driscoll",
        "Publisher, Greywater Press"
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
  put('data-case-kicker', 'Case study · ' + "Writer & Essayist" + ' · ' + data.year);
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
