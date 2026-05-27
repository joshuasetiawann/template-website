/* Theo Okafor — Design & CS Student · portfolio interactions
   Template: template-14-student-portfolio (variant V5, bento playful)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-14-student-portfolio', owner: 'Theo Okafor' };

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
   Release 2 — case-study page + link wiring · template-14-student-portfolio
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
  var OWNER = "Theo Okafor";
  var CASES = [
    {
      "t": "CampusEats food-share app",
      "tags": [
        "Hackathon",
        "Design"
      ],
      "lede": "24-hour hackathon winner — matches surplus canteen food with hungry students. 1st of 42 teams.",
      "client": "Hackathon → campus pilot",
      "year": "2025",
      "duration": "36 hours + a term",
      "ov1": "CampusEats started as a 36-hour hackathon entry: end-of-day food from campus cafés matched to students within walking distance.",
      "ov2": "We won the sustainability track, then spent a term making it real — two cafés, pickup windows, and a points system the union sponsors.",
      "ch": "The hackathon version matched perfectly and worked never. Making pickup actually happen — humans, timings, unsold trays — was the real project.",
      "met": [
        [
          "36",
          "",
          "Hours to the winning demo"
        ],
        [
          "2",
          "",
          "Cafés in the live pilot"
        ],
        [
          "340",
          "",
          "Meals saved in term one"
        ]
      ],
      "figs": [
        [
          "#3B82F6",
          "#93C5FD",
          "Whiteboard from the first night"
        ],
        [
          "#FDE047",
          "#B45309",
          "Paper prototype, library café test"
        ],
        [
          "#60A5FA",
          "#1E3A8A",
          "The bug board at 2am"
        ]
      ],
      "q": [
        "Most hackathon winners vanish. Theo’s team turned theirs into something our cafés actually use on Fridays.",
        "Dr. Helen Croft",
        "Sustainability Lead, MMU"
      ]
    },
    {
      "t": "Revision Roulette",
      "tags": [
        "Web app",
        "Code"
      ],
      "lede": "Spaced-repetition quiz site used by 300 coursemates before exams; my first real users and bug reports.",
      "client": "Personal project",
      "year": "2024",
      "duration": "6 weeks",
      "ov1": "Revision Roulette gamifies the worst part of exam season: starting. It deals random ten-minute revision tasks from your own notes.",
      "ov2": "Built with vanilla JS and spaced-repetition logic; your deck improves as you rate questions. 400 students used it during January exams.",
      "ch": "The hard problem was psychological, not technical: the app had to make starting feel smaller, so the wheel, the timer and the streak all conspire.",
      "met": [
        [
          "400",
          "",
          "Users in exam month"
        ],
        [
          "10",
          "",
          "Minute task format"
        ],
        [
          "68",
          "%",
          "Of sessions beat the timer"
        ]
      ],
      "figs": [
        [
          "#FDE047",
          "#B45309",
          "Demo day setup, ten minutes before"
        ],
        [
          "#60A5FA",
          "#1E3A8A",
          "User test notes, brutally honest"
        ],
        [
          "#34D399",
          "#065F46",
          "Final presentation slide that landed"
        ]
      ],
      "q": [
        "I used it for my own physiology revision. The roulette is silly and that is exactly why it works.",
        "Priya Sharma",
        "Final-year student & beta tester"
      ]
    },
    {
      "t": "Library wayfinding study",
      "tags": [
        "Coursework",
        "Research"
      ],
      "lede": "Observed 40 students getting lost, then prototyped signage that cut wrong turns by half.",
      "client": "Coursework · HCI module",
      "year": "2024",
      "duration": "8 weeks",
      "ov1": "Our library’s wayfinding failed exactly when it mattered: exam season, new students, silent floors. My study mapped where people actually get lost.",
      "ov2": "Shadowing, desire-line mapping and a signage prototype tested over two weeks. The library adopted two of the three recommendations.",
      "ch": "Observing without interfering is harder than it sounds — the moment people notice a clipboard, they stop getting lost honestly.",
      "met": [
        [
          "60",
          "",
          "Wayfinding journeys shadowed"
        ],
        [
          "2",
          "",
          "Recommendations adopted"
        ],
        [
          "85",
          "",
          "Coursework mark"
        ]
      ],
      "figs": [
        [
          "#60A5FA",
          "#1E3A8A",
          "Whiteboard from the first night"
        ],
        [
          "#34D399",
          "#065F46",
          "Paper prototype, library café test"
        ],
        [
          "#A78BFA",
          "#4C1D95",
          "The bug board at 2am"
        ]
      ],
      "q": [
        "Rigorous fieldwork and recommendations we could fund. The third-floor signage change came straight from this study.",
        "Margaret Ellis",
        "Head Librarian, MMU"
      ]
    },
    {
      "t": "Pixel Pet desk companion",
      "tags": [
        "Hardware",
        "Code"
      ],
      "lede": "Arduino creature that judges my posture. Hackathon crowd favourite, mild back improvement.",
      "client": "Personal project",
      "year": "2025",
      "duration": "One summer",
      "ov1": "Pixel Pet is a desk companion on an ESP32 and a 64×64 LED matrix: it reacts to my calendar, sulks during deadlines and celebrates merged PRs.",
      "ov2": "Hardware, firmware and a tiny web config UI — my first project soldered as well as coded. Build log published; three strangers have built one.",
      "ch": "Animating personality in 4,096 pixels taught me more about motion design than any tutorial — every frame must earn its byte.",
      "met": [
        [
          "64",
          "",
          "Pixel grid, full of moods"
        ],
        [
          "3",
          "",
          "Strangers built their own"
        ],
        [
          "14",
          "",
          "Animations in firmware"
        ]
      ],
      "figs": [
        [
          "#34D399",
          "#065F46",
          "Demo day setup, ten minutes before"
        ],
        [
          "#A78BFA",
          "#4C1D95",
          "User test notes, brutally honest"
        ],
        [
          "#F472B6",
          "#9D174D",
          "Final presentation slide that landed"
        ]
      ],
      "q": [
        "Theo’s build log reads like a maker twice his age. The deadline-sulk animation is painfully accurate.",
        "Jamie Liu",
        "Maker Society President"
      ]
    },
    {
      "t": "Design society rebrand",
      "tags": [
        "Design",
        "Branding"
      ],
      "lede": "New identity and template kit for MMU Design Society — membership up 60% this year.",
      "client": "Design Society",
      "year": "2024",
      "duration": "5 weeks",
      "ov1": "The design society’s identity was a decade of inconsistent posters. I led the rebrand: logo system, poster grid and a template kit anyone can use.",
      "ov2": "The system is deliberately loose — a fixed grid and two inks, infinite posters. Committee members with zero design training now ship decent posters.",
      "ch": "The brand had to survive its users. Templates beat guidelines: we shipped editable files, not a PDF nobody reads.",
      "met": [
        [
          "1",
          "",
          "Grid, infinite posters"
        ],
        [
          "30",
          "+",
          "Posters shipped by members"
        ],
        [
          "2",
          "",
          "Inks, total"
        ]
      ],
      "figs": [
        [
          "#A78BFA",
          "#4C1D95",
          "Whiteboard from the first night"
        ],
        [
          "#F472B6",
          "#9D174D",
          "Paper prototype, library café test"
        ],
        [
          "#3B82F6",
          "#93C5FD",
          "The bug board at 2am"
        ]
      ],
      "q": [
        "First year ever that our freshers’ fair stall looked like one society. The templates did what three handover documents never could.",
        "Aisha Begum",
        "Design Society Chair"
      ]
    },
    {
      "t": "Bus or Nah?",
      "tags": [
        "Web app",
        "Hackathon"
      ],
      "lede": "One-button site answering whether to sprint for the 143. Locally famous for a week.",
      "client": "Hackathon project",
      "year": "2023",
      "duration": "24 hours",
      "ov1": "Bus or Nah answers the only transit question students ask: leave now or finish your coffee? Live arrivals, walking time, one verdict.",
      "ov2": "A 24-hour hack built on the open transit API — it answers in under a second with YES, NAH or RUN. Still running; still right.",
      "ch": "The joke interface hides real engineering: cached predictions, walking-time estimates and graceful failure when the API inevitably dies.",
      "met": [
        [
          "24",
          "",
          "Hours to build"
        ],
        [
          "1",
          "",
          "Second to a verdict"
        ],
        [
          "500",
          "+",
          "Weekly users at the union"
        ]
      ],
      "figs": [
        [
          "#F472B6",
          "#9D174D",
          "Demo day setup, ten minutes before"
        ],
        [
          "#3B82F6",
          "#93C5FD",
          "User test notes, brutally honest"
        ],
        [
          "#FDE047",
          "#B45309",
          "Final presentation slide that landed"
        ]
      ],
      "q": [
        "The most-used thing to come out of our hackathon, including the winners. RUN mode has saved me twice this week.",
        "Marcus Oyelaran",
        "Hackathon judge"
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
  put('data-case-kicker', 'Case study · ' + "Design & CS student (project lead)" + ' · ' + data.year);
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
