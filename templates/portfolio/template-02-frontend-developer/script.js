/* Devon Carter — Frontend Developer · portfolio interactions
   Template: template-02-frontend-developer (variant V1, minimal type)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-02-frontend-developer', owner: 'Devon Carter' };

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
   Release 2 — case-study page + link wiring · template-02-frontend-developer
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
  var OWNER = "Devon Carter";
  var CASES = [
    {
      "t": "Ledgerline component kit",
      "tags": [
        "React",
        "Systems"
      ],
      "lede": "42 accessible React components powering a fintech suite; visual-regression tested, tree-shakeable, 28kb core.",
      "client": "Ledgerline",
      "year": "2025",
      "duration": "7 months",
      "ov1": "Ledgerline’s four web apps each carried their own button, modal and table implementations. I led the build of one accessible component kit to replace them all.",
      "ov2": "Forty-two components, tree-shakeable to a 28kb core, with visual-regression coverage and docs written for engineers in a hurry.",
      "ch": "The kit had to win adoption on merit — no mandate. That meant migration codemods, office hours, and components that were simply easier than copy-paste.",
      "met": [
        [
          "42",
          "",
          "Components shipped"
        ],
        [
          "28",
          "kb",
          "Tree-shaken core size"
        ],
        [
          "4",
          "",
          "Apps fully migrated"
        ]
      ],
      "figs": [
        [
          "#2563EB",
          "#60A5FA",
          "Flamegraph before the rebuild"
        ],
        [
          "#0EA5E9",
          "#67E8F9",
          "Bundle analysis, week one vs launch"
        ],
        [
          "#1D4ED8",
          "#93C5FD",
          "Storybook page for the core kit"
        ]
      ],
      "q": [
        "Engineers migrated voluntarily — that never happens. The codemods and docs made the kit the path of least resistance.",
        "Mei Tanaka",
        "Engineering Manager, Ledgerline"
      ]
    },
    {
      "t": "`perf-lens` CLI",
      "tags": [
        "Tooling",
        "Open source"
      ],
      "lede": "Open-source CLI that diffs Lighthouse runs across branches and fails CI on Web Vitals regressions.",
      "client": "Open source",
      "year": "2024",
      "duration": "Nights & weekends",
      "ov1": "CI never caught the slow creep of regressions, only the cliffs. perf-lens diffs Lighthouse runs across branches and fails the build when Web Vitals slip.",
      "ov2": "It runs three samples per branch, compares medians with confidence thresholds, and prints the diff in plain English a reviewer can act on.",
      "ch": "Perf numbers are noisy in CI containers. Getting the false-positive rate low enough that teams trusted a red build took most of the work.",
      "met": [
        [
          "3",
          "",
          "Samples per comparison"
        ],
        [
          "120",
          "+",
          "Repos running it in CI"
        ],
        [
          "0",
          "",
          "Runtime dependencies"
        ]
      ],
      "figs": [
        [
          "#0EA5E9",
          "#67E8F9",
          "CI run with the a11y gate green"
        ],
        [
          "#1D4ED8",
          "#93C5FD",
          "Web Vitals dashboard after rollout"
        ],
        [
          "#3B82F6",
          "#A5B4FC",
          "The deleted-code diffstat, framed"
        ]
      ],
      "q": [
        "We stopped arguing about whether a PR was slower. The bot answers before the review starts.",
        "Priya Nair",
        "Staff Engineer, Brightcart"
      ]
    },
    {
      "t": "Transit board PWA",
      "tags": [
        "Vanilla JS",
        "Performance"
      ],
      "lede": "Offline-first departure board in 14kb of vanilla JS; first paint under 0.6s on a throttled 3G profile.",
      "client": "Civic side project",
      "year": "2023",
      "duration": "6 weeks",
      "ov1": "My neighbourhood’s bus stop screens went dark, so I built a departure board that any old tablet could run from a bookmark — offline included.",
      "ov2": "Fourteen kilobytes of vanilla JS: a service worker, cached schedules with live overlays, and a layout readable from across a waiting room.",
      "ch": "The budget was the brief: first paint under 600ms on throttled 3G, on hardware most frameworks refuse to boot on.",
      "met": [
        [
          "14",
          "kb",
          "Total JavaScript shipped"
        ],
        [
          "600",
          "ms",
          "First paint on 3G"
        ],
        [
          "100",
          "",
          "Lighthouse performance score"
        ]
      ],
      "figs": [
        [
          "#1D4ED8",
          "#93C5FD",
          "Flamegraph before the rebuild"
        ],
        [
          "#3B82F6",
          "#A5B4FC",
          "Bundle analysis, week one vs launch"
        ],
        [
          "#2563EB",
          "#34D399",
          "Storybook page for the core kit"
        ]
      ],
      "q": [
        "It loads faster than the official app on a tablet we found in a drawer. The depot asked if they could keep it.",
        "Dana Whitfield",
        "Transit Ops Volunteer, Eastside Link"
      ]
    },
    {
      "t": "Markdown slide engine",
      "tags": [
        "Open source",
        "Vanilla JS"
      ],
      "lede": "Zero-dependency presentation engine: markdown in, keyboard-navigable deck out, themable with CSS variables.",
      "client": "Open source",
      "year": "2023",
      "duration": "3 months",
      "ov1": "Conference season, and every deck tool wanted an account and a CDN. I wrote a presentation engine that turns plain markdown into a keyboard-navigable deck.",
      "ov2": "Zero dependencies, themable with CSS variables, printable to PDF, and small enough to read in one sitting — the whole engine is a single file.",
      "ch": "Doing speaker notes, hash-routing and resilient live-reload without a single package while keeping the file under a thousand lines was the sport of it.",
      "met": [
        [
          "0",
          "",
          "Dependencies"
        ],
        [
          "1",
          "",
          "File to deploy"
        ],
        [
          "900",
          "+",
          "GitHub stars"
        ]
      ],
      "figs": [
        [
          "#3B82F6",
          "#A5B4FC",
          "CI run with the a11y gate green"
        ],
        [
          "#2563EB",
          "#34D399",
          "Web Vitals dashboard after rollout"
        ],
        [
          "#0B3FA8",
          "#5EA0F8",
          "The deleted-code diffstat, framed"
        ]
      ],
      "q": [
        "I teach with it because students can read the entire source and understand their own slides.",
        "Prof. Leo Anders",
        "CS Department, Georgia Tech"
      ]
    },
    {
      "t": "Checkout A/B platform UI",
      "tags": [
        "React",
        "Performance"
      ],
      "lede": "Experiment-driven checkout that lifted conversion 12% while cutting JS payload 38%.",
      "client": "Brightcart",
      "year": "2022",
      "duration": "5 months",
      "ov1": "Checkout was Brightcart’s most valuable page and its heaviest. I rebuilt the UI as an experiment platform so every change shipped as a measured test.",
      "ov2": "We cut the JavaScript payload 38% while adding variant slots, then ran twelve A/B tests in two quarters instead of the usual three.",
      "ch": "Experimentation usually adds weight. The trick was an islands setup where variants hydrate only the component under test.",
      "met": [
        [
          "12",
          "%",
          "Conversion lift, holdout-verified"
        ],
        [
          "38",
          "%",
          "JS payload removed"
        ],
        [
          "12",
          "",
          "Tests run in two quarters"
        ]
      ],
      "figs": [
        [
          "#2563EB",
          "#34D399",
          "Flamegraph before the rebuild"
        ],
        [
          "#0B3FA8",
          "#5EA0F8",
          "Bundle analysis, week one vs launch"
        ],
        [
          "#2563EB",
          "#60A5FA",
          "Storybook page for the core kit"
        ]
      ],
      "q": [
        "The checkout got faster and smarter at the same time. Finance now quotes the holdout numbers in board decks.",
        "Omar Haddad",
        "Director of Growth, Brightcart"
      ]
    },
    {
      "t": "a11y-snapshot test suite",
      "tags": [
        "Tooling",
        "Systems"
      ],
      "lede": "Playwright harness that snapshots accessibility trees, catching regressions designers can read.",
      "client": "Ledgerline",
      "year": "2024",
      "duration": "4 months",
      "ov1": "Accessibility regressions kept arriving silently. I built a Playwright harness that snapshots the accessibility tree per component and diffs it in CI.",
      "ov2": "Failures print as readable trees with the offending ARIA highlighted — designers triage screenshots, engineers get the failing selector.",
      "ch": "Accessibility trees churn legitimately. Encoding which changes matter — and which are noise — is what made the suite trusted instead of muted.",
      "met": [
        [
          "300",
          "+",
          "Snapshots in the suite"
        ],
        [
          "17",
          "",
          "Regressions caught pre-release"
        ],
        [
          "0",
          "",
          "Suppressed checks"
        ]
      ],
      "figs": [
        [
          "#0B3FA8",
          "#5EA0F8",
          "CI run with the a11y gate green"
        ],
        [
          "#2563EB",
          "#60A5FA",
          "Web Vitals dashboard after rollout"
        ],
        [
          "#0EA5E9",
          "#67E8F9",
          "The deleted-code diffstat, framed"
        ]
      ],
      "q": [
        "It catches the regressions our audits used to find a quarter too late. The suite pays for itself monthly.",
        "Mei Tanaka",
        "Engineering Manager, Ledgerline"
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
  put('data-case-kicker', 'Case study · ' + "Senior Frontend Engineer" + ' · ' + data.year);
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
