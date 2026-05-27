/* Marcus Oyelaran — Data Analyst · portfolio interactions
   Template: template-10-data-analyst (variant V1, minimal type)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-10-data-analyst', owner: 'Marcus Oyelaran' };

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
   Release 2 — case-study page + link wiring · template-10-data-analyst
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
  var OWNER = "Marcus Oyelaran";
  var CASES = [
    {
      "t": "Fleet utilisation dashboard",
      "tags": [
        "Dashboards",
        "Logistics"
      ],
      "lede": "Live utilisation and idle-time views for 800 vehicles; surfaced £1.2M of recoverable capacity.",
      "client": "Northgate Logistics",
      "year": "2025",
      "duration": "10 weeks",
      "ov1": "Northgate ran 400 trucks on instinct and a wall of spreadsheets. I built the utilisation dashboard the depot managers actually open at 6am.",
      "ov2": "Live load factors, dead-leg miles and idle hours by depot, with drill-downs that answer the follow-up question before it is asked.",
      "ch": "The first version was ignored — too many charts. The redesign cut it to five numbers and a map, and adoption followed within a month.",
      "met": [
        [
          "400",
          "",
          "Trucks tracked live"
        ],
        [
          "17",
          "%",
          "Dead-leg miles reduced"
        ],
        [
          "9",
          "",
          "Depots on the morning dashboard"
        ]
      ],
      "figs": [
        [
          "#0D9488",
          "#2DD4BF",
          "Lineage map of the metrics layer"
        ],
        [
          "#155E75",
          "#22D3EE",
          "Null census from the data audit"
        ],
        [
          "#0F766E",
          "#5EEAD4",
          "Experiment design doc, pre-registered"
        ]
      ],
      "q": [
        "The 6am huddle now starts with Marcus’s screen instead of arguments. We found two routes that should never have existed.",
        "Janet Okoro",
        "Ops Director, Northgate"
      ]
    },
    {
      "t": "Churn early-warning model",
      "tags": [
        "Modeling",
        "Retail"
      ],
      "lede": "Subscription churn flags 30 days out at 0.81 AUC, wired straight into the CRM team’s queue.",
      "client": "Bramble & Co Retail",
      "year": "2024",
      "duration": "12 weeks",
      "ov1": "Churn announced itself only at renewal. I built an early-warning model that flags at-risk accounts ninety days out, with reasons attached.",
      "ov2": "Gradient boosting on usage decay, support tone and invoice friction — but shipped as a ranked call list with the \"why\" beside every name.",
      "ch": "A score nobody can explain gets ignored. Every flag ships with its top three drivers in plain English — that, not the AUC, drove adoption.",
      "met": [
        [
          "90",
          "",
          "Days of early warning"
        ],
        [
          "23",
          "%",
          "Churn reduction in pilot"
        ],
        [
          "78",
          "%",
          "Precision at the top decile"
        ]
      ],
      "figs": [
        [
          "#155E75",
          "#22D3EE",
          "The dashboard, Monday 7am state"
        ],
        [
          "#0F766E",
          "#5EEAD4",
          "Forecast vs actuals, week twelve"
        ],
        [
          "#0D9488",
          "#155E75",
          "The one-slide readout that ended the debate"
        ]
      ],
      "q": [
        "The call list paid for the project in the first quarter. Account managers stopped calling it \"the algorithm\" and started calling it Monday.",
        "Sophie Aldridge",
        "Customer Director, Bramble & Co"
      ]
    },
    {
      "t": "Pricing experiment readouts",
      "tags": [
        "Experiments",
        "Retail"
      ],
      "lede": "Standardised A/B readout template adopted org-wide; decision time per test fell from 9 days to 2.",
      "client": "Bramble & Co Retail",
      "year": "2024",
      "duration": "8 weeks",
      "ov1": "Pricing changes shipped on opinion and anecdote. I designed the experiment framework and ran the first three pricing tests end to end.",
      "ov2": "Pre-registered designs, holdout regions, and readouts that state the revenue effect with intervals a CFO can take to the board.",
      "ch": "The hard part was killing the peeking habit: dashboards mid-test were read-only by design, and every test declared its stopping rule up front.",
      "met": [
        [
          "3",
          "",
          "Pricing experiments run"
        ],
        [
          "6",
          "%",
          "Margin lift adopted"
        ],
        [
          "0",
          "",
          "Tests stopped early"
        ]
      ],
      "figs": [
        [
          "#0F766E",
          "#5EEAD4",
          "Lineage map of the metrics layer"
        ],
        [
          "#0D9488",
          "#155E75",
          "Null census from the data audit"
        ],
        [
          "#0B7A70",
          "#99F6E4",
          "Experiment design doc, pre-registered"
        ]
      ],
      "q": [
        "First pricing decision in years that nobody relitigated. The pre-registration discipline changed how we argue.",
        "David Chen",
        "CFO, Bramble & Co"
      ]
    },
    {
      "t": "Warehouse demand forecast",
      "tags": [
        "Forecasting",
        "Logistics"
      ],
      "lede": "SKU-level weekly forecasts (MAPE 11%) that cut overtime spend during peak season by 18%.",
      "client": "Northgate Logistics",
      "year": "2023",
      "duration": "14 weeks",
      "ov1": "Warehouse staffing chased yesterday’s volumes. I built a demand forecast that plans shifts two weeks out, by site and shift block.",
      "ov2": "A seasonal model with holiday and promo regressors, retrained nightly, published straight into the rota tool — no analyst in the loop on Mondays.",
      "ch": "Forecasts earn trust through their misses: every week the model publishes its own error against actuals, which is why planners still believe it.",
      "met": [
        [
          "8",
          "%",
          "Forecast error (MAPE)"
        ],
        [
          "2",
          "",
          "Weeks of staffing lead time"
        ],
        [
          "30",
          "%",
          "Less overtime spend"
        ]
      ],
      "figs": [
        [
          "#0D9488",
          "#155E75",
          "The dashboard, Monday 7am state"
        ],
        [
          "#0B7A70",
          "#99F6E4",
          "Forecast vs actuals, week twelve"
        ],
        [
          "#117C74",
          "#67E8F9",
          "The one-slide readout that ended the debate"
        ]
      ],
      "q": [
        "We stopped paying for panic. The rota writes itself within tolerance and the model owns its mistakes publicly.",
        "Janet Okoro",
        "Ops Director, Northgate"
      ]
    },
    {
      "t": "Metrics layer migration",
      "tags": [
        "Modeling",
        "Infrastructure"
      ],
      "lede": "Moved 140 ad-hoc reports onto 28 governed dbt models; ‘which number is right’ tickets down 70%.",
      "client": "Bramble & Co Retail",
      "year": "2023",
      "duration": "5 months",
      "ov1": "Five teams, five definitions of \"active customer\". I led the migration to a governed metrics layer with tested, documented definitions.",
      "ov2": "Eighty core metrics moved into dbt with tests and owners; the BI tool now reads one source of truth, and \"whose number is right\" meetings ended.",
      "ch": "Migrations fail on the long tail. We deprecated 300 legacy reports by publishing usage stats and letting the silence make the case.",
      "met": [
        [
          "80",
          "",
          "Governed core metrics"
        ],
        [
          "300",
          "",
          "Legacy reports retired"
        ],
        [
          "5",
          "",
          "Teams on one source of truth"
        ]
      ],
      "figs": [
        [
          "#0B7A70",
          "#99F6E4",
          "Lineage map of the metrics layer"
        ],
        [
          "#117C74",
          "#67E8F9",
          "Null census from the data audit"
        ],
        [
          "#0D9488",
          "#2DD4BF",
          "Experiment design doc, pre-registered"
        ]
      ],
      "q": [
        "The metrics layer ended a civil war I had stopped noticing we were fighting. Forecasts finally reconcile with finance.",
        "Priya Shah",
        "VP Data, Bramble & Co"
      ]
    },
    {
      "t": "Exec Monday briefing pack",
      "tags": [
        "Dashboards",
        "Storytelling"
      ],
      "lede": "Auto-generated weekly narrative with charts that answer the question before the follow-up email.",
      "client": "Northgate Logistics",
      "year": "2025",
      "duration": "Ongoing",
      "ov1": "Executives got forty dashboards and no narrative. The Monday briefing pack is six pages: what moved, why, and what we recommend.",
      "ov2": "Auto-generated numbers, hand-written sentences. Each page is one decision area with a headline, a chart and an action — archived so calls are auditable.",
      "ch": "The discipline is editorial, not technical: saying less, ranking what matters, and putting our necks out with a recommendation every single week.",
      "met": [
        [
          "6",
          "",
          "Pages, never more"
        ],
        [
          "52",
          "",
          "Briefings shipped and archived"
        ],
        [
          "15",
          "",
          "Minutes of exec reading time"
        ]
      ],
      "figs": [
        [
          "#117C74",
          "#67E8F9",
          "The dashboard, Monday 7am state"
        ],
        [
          "#0D9488",
          "#2DD4BF",
          "Forecast vs actuals, week twelve"
        ],
        [
          "#155E75",
          "#22D3EE",
          "The one-slide readout that ended the debate"
        ]
      ],
      "q": [
        "It is the only attachment I read before the meeting. The recommendations are wrong sometimes — visibly, accountably, usefully.",
        "Richard Mbeki",
        "CEO, Northgate"
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
  put('data-case-kicker', 'Case study · ' + "Senior Data Analyst" + ' · ' + data.year);
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
