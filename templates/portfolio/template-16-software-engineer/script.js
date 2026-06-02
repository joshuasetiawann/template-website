/* Rohan Mehta — Software Engineer · portfolio interactions
   Template: template-16-software-engineer (variant V5, bento playful)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-16-software-engineer', owner: 'Rohan Mehta' };

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

  /* --- Dark / light theme toggle --- */
  var themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    var applyTheme = function (darkMode) {
      document.body.classList.toggle('theme-dark', darkMode);
      themeBtn.setAttribute('aria-pressed', darkMode ? 'true' : 'false');
      themeBtn.setAttribute('aria-label', darkMode ? 'Switch to light mode' : 'Switch to dark mode');
    };
    var stored = null;
    try { stored = window.localStorage.getItem('theme:' + SITE.slug); } catch (err) { stored = null; }
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(stored !== null ? stored === 'dark' : !!prefersDark);
    themeBtn.addEventListener('click', function () {
      var darkMode = !document.body.classList.contains('theme-dark');
      applyTheme(darkMode);
      try { window.localStorage.setItem('theme:' + SITE.slug, darkMode ? 'dark' : 'light'); } catch (err) { /* private mode */ }
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
})();


/* ============================================================
   Release 2 — case-study page + link wiring · template-16-software-engineer
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
  var OWNER = "Rohan Mehta";
  var CASES = [
    {
      "t": "Event pipeline rebuild",
      "tags": [
        "Systems",
        "Go"
      ],
      "lede": "Kafka-based pipeline handling 40k events/sec with exactly-once semantics; p99 latency cut 8x.",
      "client": "Lumeris Payments",
      "year": "2024",
      "duration": "7 months",
      "ov1": "Lumeris’s event pipeline was a nightly batch pretending to be real-time. I led the rebuild to a Kafka-based system handling 40k events per second.",
      "ov2": "Exactly-once semantics where they matter, idempotent consumers everywhere else, and failure drills that prove the guarantees instead of asserting them.",
      "ch": "The migration ran shadow for six weeks — same events, both systems, diffed nightly. We cut over the day the diff stayed empty for a week.",
      "met": [
        [
          "40",
          "k",
          "Events per second sustained"
        ],
        [
          "8",
          "x",
          "p99 latency improvement"
        ],
        [
          "6",
          "",
          "Weeks of shadow traffic first"
        ]
      ],
      "figs": [
        [
          "#10B981",
          "#065F46",
          "Architecture sketch from the design doc"
        ],
        [
          "#334155",
          "#10B981",
          "Load test — before the rebuild"
        ],
        [
          "#0EA5E9",
          "#0C4A6E",
          "Trace waterfall, p99 after cutover"
        ]
      ],
      "q": [
        "The pipeline rebuild is why our SLA conversations got boring. Eight months later nobody remembers the batch era — the highest praise.",
        "Sofia Ramirez",
        "VP Engineering, Lumeris"
      ]
    },
    {
      "t": "Payments idempotency layer",
      "tags": [
        "Systems",
        "API"
      ],
      "lede": "Idempotency-key service that ended duplicate-charge incidents — zero in 18 months since.",
      "client": "Lumeris Payments",
      "year": "2023",
      "duration": "4 months",
      "ov1": "Duplicate charges were rare, unreproducible and reputation-burning. I designed the idempotency layer that ended them: every mutation, one key, one outcome.",
      "ov2": "A keyed request-journal service in front of money movement, with conflict semantics the product teams could reason about — and a chaos suite that retries everything, twice.",
      "ch": "The hard part was the long tail: clients that retry creatively. The chaos suite replays production retry storms against every release candidate.",
      "met": [
        [
          "0",
          "",
          "Duplicate charges in 18 months"
        ],
        [
          "120",
          "ms",
          "p99 added latency budget kept"
        ],
        [
          "14",
          "",
          "Services behind the layer"
        ]
      ],
      "figs": [
        [
          "#334155",
          "#10B981",
          "The feature-flag rollout plan"
        ],
        [
          "#0EA5E9",
          "#0C4A6E",
          "On-call dashboard, a quiet week"
        ],
        [
          "#059669",
          "#D1FAE5",
          "The deletion PR — best diff of the project"
        ]
      ],
      "q": [
        "We went from apologising for duplicates to forgetting they were possible. The chaos suite catches what code review cannot.",
        "James Park",
        "Head of Payments, Lumeris"
      ]
    },
    {
      "t": "`shipctl` deploy CLI",
      "tags": [
        "Tooling",
        "Open source"
      ],
      "lede": "Open-source CLI wrapping our deploy pipeline; 1.4k stars and adopted by three other orgs.",
      "client": "Open source",
      "year": "2023",
      "duration": "Nights & weekends",
      "ov1": "Our deploy pipeline was powerful and unusable. shipctl wraps it in a CLI with the three commands engineers actually want: ship, status, rollback.",
      "ov2": "Sensible defaults, dry-run everywhere, and error messages that name the fix. 1.4k stars later, three other orgs run it in production.",
      "ch": "CLI design is API design with worse error budgets. Half the work was deleting flags — every removed option made the tool more trusted.",
      "met": [
        [
          "1400",
          "+",
          "GitHub stars"
        ],
        [
          "3",
          "",
          "Commands that matter"
        ],
        [
          "4",
          "",
          "Orgs running it in production"
        ]
      ],
      "figs": [
        [
          "#0EA5E9",
          "#0C4A6E",
          "Architecture sketch from the design doc"
        ],
        [
          "#059669",
          "#D1FAE5",
          "Load test — before the rebuild"
        ],
        [
          "#10B981",
          "#1E293B",
          "Trace waterfall, p99 after cutover"
        ]
      ],
      "q": [
        "shipctl made our deploys boring enough that juniors run them on Fridays. The rollback UX is the best I have used.",
        "Elena Vostrikova",
        "SRE Lead, Cartwheel Logistics"
      ]
    },
    {
      "t": "Query plan visualiser",
      "tags": [
        "Tooling",
        "Postgres"
      ],
      "lede": "Web tool that renders EXPLAIN output humans can read; now part of our onboarding curriculum.",
      "client": "Internal tooling",
      "year": "2024",
      "duration": "6 weeks",
      "ov1": "EXPLAIN output is where query optimisation goes to be misunderstood. The visualiser renders plans as annotated trees humans can argue about.",
      "ov2": "Paste a plan, get the story: which node eats the time, what the planner expected versus got, and the index hint that would change its mind.",
      "ch": "The teaching problem was bigger than the parsing problem: the tool explains its annotations, which is why it became onboarding curriculum.",
      "met": [
        [
          "2",
          "k",
          "Plans visualised in year one"
        ],
        [
          "30",
          "%",
          "Drop in slow-query escalations"
        ],
        [
          "1",
          "",
          "Onboarding module built on it"
        ]
      ],
      "figs": [
        [
          "#059669",
          "#D1FAE5",
          "The feature-flag rollout plan"
        ],
        [
          "#10B981",
          "#1E293B",
          "On-call dashboard, a quiet week"
        ],
        [
          "#22D3EE",
          "#155E75",
          "The deletion PR — best diff of the project"
        ]
      ],
      "q": [
        "New engineers learn the planner from the tool instead of from outages. Our worst query got found by an intern in week two.",
        "Marcus Oyelaran",
        "Data Lead, BlueFin Analytics"
      ]
    },
    {
      "t": "On-call load balancer",
      "tags": [
        "SRE",
        "Systems"
      ],
      "lede": "Alert routing by service ownership and recent toil; pages per engineer down 45%.",
      "client": "Lumeris Payments",
      "year": "2025",
      "duration": "8 weeks",
      "ov1": "On-call load was lopsided: two engineers ate half the pages. I built routing that weighs service ownership and recent toil before paging anyone.",
      "ov2": "Alerts route by ownership map, recent page history and business hours across time zones — with a fairness report the team reviews monthly.",
      "ch": "The sociotechnical part was the work: agreeing what \"fair\" means in writing, then encoding it, beat any clever scheduling algorithm.",
      "met": [
        [
          "45",
          "%",
          "Fewer pages per engineer"
        ],
        [
          "0",
          "",
          "3am pages for non-owners"
        ],
        [
          "12",
          "",
          "Services on fair routing"
        ]
      ],
      "figs": [
        [
          "#10B981",
          "#1E293B",
          "Architecture sketch from the design doc"
        ],
        [
          "#22D3EE",
          "#155E75",
          "Load test — before the rebuild"
        ],
        [
          "#10B981",
          "#065F46",
          "Trace waterfall, p99 after cutover"
        ]
      ],
      "q": [
        "First quarter ever where on-call retro had no grievances. The fairness report ended arguments we had monthly for years.",
        "Aiden Walsh",
        "SRE Manager, Lumeris"
      ]
    },
    {
      "t": "Homelab GitOps setup",
      "tags": [
        "Infra",
        "Open source"
      ],
      "lede": "Three-node k3s cluster, fully declarative, documented as a public template repo.",
      "client": "Homelab · public template",
      "year": "2022",
      "duration": "Ongoing",
      "ov1": "My homelab is where work ideas go to fail safely first. Three k3s nodes, fully declarative, rebuilt from a git repo in twenty minutes.",
      "ov2": "GitOps end to end: sealed secrets, renovate-driven upgrades, and monitoring that pages my phone — gently. Published as a template repo others fork.",
      "ch": "The discipline is the point: no kubectl apply by hand, ever. If the repo cannot rebuild it, it does not exist.",
      "met": [
        [
          "3",
          "",
          "Nodes, fully declarative"
        ],
        [
          "20",
          "",
          "Minutes to rebuild from git"
        ],
        [
          "600",
          "+",
          "Template repo forks"
        ]
      ],
      "figs": [
        [
          "#22D3EE",
          "#155E75",
          "The feature-flag rollout plan"
        ],
        [
          "#10B981",
          "#065F46",
          "On-call dashboard, a quiet week"
        ],
        [
          "#334155",
          "#10B981",
          "The deletion PR — best diff of the project"
        ]
      ],
      "q": [
        "I rebuilt my entire homelab from Rohan’s template in an afternoon. The README anticipates every mistake I made.",
        "Chris Tanner",
        "Platform Engineer & forker"
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
  put('data-case-kicker', 'Case study · ' + "Staff Software Engineer" + ' · ' + data.year);
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
