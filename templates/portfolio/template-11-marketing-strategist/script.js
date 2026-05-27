/* Camille Dubois — Marketing Strategist · portfolio interactions
   Template: template-11-marketing-strategist (variant V2, split identity)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-11-marketing-strategist', owner: 'Camille Dubois' };

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

  /* --- Contact form validation --- */
  var form = document.getElementById('contact-form');
  if (form) {
    var emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); };
    var rules = [
      { id: 'cf-name', err: 'err-name', ok: function (v) { return v.trim().length >= 2; }, msg: 'Please tell me your name.' },
      { id: 'cf-email', err: 'err-email', ok: emailOk, msg: 'That email does not look right.' },
      { id: 'cf-msg', err: 'err-msg', ok: function (v) { return v.trim().length >= 10; }, msg: 'A sentence or two helps me reply usefully.' }
    ];
    var validateField = function (rule) {
      var input = document.getElementById(rule.id);
      var error = document.getElementById(rule.err);
      if (!input) { return true; }
      var valid = rule.ok(input.value || '');
      if (error) { error.textContent = valid ? '' : rule.msg; }
      var wrap = input.closest ? input.closest('.form-field') : null;
      if (wrap) { wrap.classList.toggle('has-error', !valid); }
      return valid;
    };
    rules.forEach(function (rule) {
      var input = document.getElementById(rule.id);
      if (input) { input.addEventListener('input', function () { validateField(rule); }); }
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var allValid = rules.map(validateField).every(function (v) { return v; });
      var success = document.getElementById('form-success');
      if (allValid) {
        if (success) { success.textContent = 'Thanks — your message is ready to send. (Demo form: wire it to your backend or a form service.)'; }
        form.reset();
      } else if (success) {
        success.textContent = '';
      }
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
  void SITE; /* kept for template consistency */
})();


/* ============================================================
   Release 2 — case-study page + link wiring · template-11-marketing-strategist
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
  var OWNER = "Camille Dubois";
  var CASES = [
    {
      "t": "Repositioning Cartepro B2B",
      "tags": [
        "Positioning",
        "B2B"
      ],
      "lede": "From “expense cards” to “spend autopilot” — pipeline per campaign up 3.1x in two quarters.",
      "client": "Cartepro",
      "year": "2025",
      "duration": "12 weeks",
      "ov1": "Cartepro sold expense cards as \"the cheapest\" in a market racing to free. I led the repositioning to an operations story: close the books in a day.",
      "ov2": "New narrative, new pricing page, new sales deck — and a rebuilt demo that opens on the month-end close instead of the card.",
      "ch": "Repositioning means disappointing someone. We walked away from the SMB discount-hunters, and the pipeline got smaller before it got better.",
      "met": [
        [
          "46",
          "%",
          "Win-rate lift vs incumbents"
        ],
        [
          "2",
          "x",
          "Average contract value"
        ],
        [
          "1",
          "",
          "Quarter to pipeline recovery"
        ]
      ],
      "figs": [
        [
          "#D6336C",
          "#F783AC",
          "Win-loss interview synthesis wall"
        ],
        [
          "#1B2440",
          "#5C6BC0",
          "The positioning statement, as signed"
        ],
        [
          "#C2255C",
          "#FAA2C1",
          "Budget model — brand vs performance split"
        ]
      ],
      "q": [
        "Camille made us stop selling plastic and start selling the close. Deals changed shape within a quarter.",
        "Antoine Leclerc",
        "CEO, Cartepro"
      ]
    },
    {
      "t": "Launch GTM: Maison Verte EU",
      "tags": [
        "Launch",
        "Retail"
      ],
      "lede": "Five-country go-to-market for a D2C furniture brand; €4.2M first-year revenue, CAC 28% under plan.",
      "client": "Maison Verte",
      "year": "2024",
      "duration": "16 weeks",
      "ov1": "A French organic skincare house entering four EU markets at once. I built the go-to-market: sequencing, channel strategy and launch narrative.",
      "ov2": "We launched Germany first as the proof market, with pharmacy partnerships before paid media — earned trust as the acquisition channel.",
      "ch": "Four markets wanted four launches. The discipline was sequencing: one playbook, proven then localised, instead of four simultaneous experiments.",
      "met": [
        [
          "4",
          "",
          "Markets launched in 12 months"
        ],
        [
          "130",
          "%",
          "Of year-one revenue target"
        ],
        [
          "60",
          "",
          "Pharmacy partnerships signed"
        ]
      ],
      "figs": [
        [
          "#1B2440",
          "#5C6BC0",
          "Lifecycle map across the funnel"
        ],
        [
          "#C2255C",
          "#FAA2C1",
          "Holdout readout, quarter two"
        ],
        [
          "#A61E4D",
          "#FCC2D7",
          "Board slide: the category, renamed"
        ]
      ],
      "q": [
        "The sequencing felt slow and proved fast. Germany paid for the other three launches.",
        "Margaux Rousseau",
        "Founder, Maison Verte"
      ]
    },
    {
      "t": "Lifecycle revenue program",
      "tags": [
        "CRM",
        "B2C"
      ],
      "lede": "Welcome-to-winback journey rebuilt around purchase intent signals; email revenue share 11% → 24%.",
      "client": "Subscription client (b2c)",
      "year": "2024",
      "duration": "6 months",
      "ov1": "Acquisition was funded; the leaky middle was not. I designed the lifecycle revenue program — onboarding, winback and the unsexy emails in between.",
      "ov2": "Forty-one lifecycle moments mapped, twelve rebuilt, each with a control group. The winback flow alone repaid the engagement.",
      "ch": "Lifecycle work dies as \"email batch and blast\". Every moment got a job description: what behaviour changes, measured against whom.",
      "met": [
        [
          "41",
          "",
          "Lifecycle moments mapped"
        ],
        [
          "28",
          "%",
          "Churn-cohort revenue recovered"
        ],
        [
          "12",
          "",
          "Flows rebuilt with controls"
        ]
      ],
      "figs": [
        [
          "#C2255C",
          "#FAA2C1",
          "Win-loss interview synthesis wall"
        ],
        [
          "#A61E4D",
          "#FCC2D7",
          "The positioning statement, as signed"
        ],
        [
          "#D6336C",
          "#1B2440",
          "Budget model — brand vs performance split"
        ]
      ],
      "q": [
        "The winback flow recovered more revenue than our entire paid social budget produced. Embarrassing, then liberating.",
        "Tom Veld",
        "Growth Director (B2C client)"
      ]
    },
    {
      "t": "Brand + performance budget model",
      "tags": [
        "Analytics",
        "Strategy"
      ],
      "lede": "Marketing-mix model that ended the brand-vs-performance argument with a spreadsheet, not a meeting.",
      "client": "Cartepro",
      "year": "2023",
      "duration": "8 weeks",
      "ov1": "Brand and performance teams fought over one budget with two scoreboards. I built the model that funds them as one system.",
      "ov2": "A simple, auditable budget model: floor for brand, payback ceilings for performance, and a shared dashboard where both see the same truth.",
      "ch": "The fight was never about money — it was about measurement theatre. Agreeing what we would not measure was the breakthrough.",
      "met": [
        [
          "70",
          "/30",
          "Agreed budget split"
        ],
        [
          "22",
          "%",
          "Blended CAC improvement"
        ],
        [
          "1",
          "",
          "Scoreboard, finally shared"
        ]
      ],
      "figs": [
        [
          "#A61E4D",
          "#FCC2D7",
          "Lifecycle map across the funnel"
        ],
        [
          "#D6336C",
          "#1B2440",
          "Holdout readout, quarter two"
        ],
        [
          "#E64980",
          "#862E9C",
          "Board slide: the category, renamed"
        ]
      ],
      "q": [
        "First budget cycle in memory without a turf war. The model survived contact with the CFO unedited.",
        "Antoine Leclerc",
        "CEO, Cartepro"
      ]
    },
    {
      "t": "Category creation: “quiet software”",
      "tags": [
        "Positioning",
        "SaaS"
      ],
      "lede": "Narrative, analyst briefings and a manifesto site that 40+ publications picked up unprompted.",
      "client": "Studio Logiciel",
      "year": "2025",
      "duration": "10 weeks",
      "ov1": "A calm-software startup competing in a noisy productivity category. We did not fight for the category — we named a new one: quiet software.",
      "ov2": "Manifesto, founder talk track, analyst briefings and a launch essay that the community spread for us. The phrase now appears in competitor decks.",
      "ch": "Category creation fails when it is just a slogan. We backed the name with a buyer’s checklist that quietly disqualifies the loud incumbents.",
      "met": [
        [
          "9",
          "",
          "Analyst briefings run"
        ],
        [
          "40",
          "k",
          "Essay reads in launch month"
        ],
        [
          "3",
          "",
          "Competitors using our phrase"
        ]
      ],
      "figs": [
        [
          "#D6336C",
          "#1B2440",
          "Win-loss interview synthesis wall"
        ],
        [
          "#E64980",
          "#862E9C",
          "The positioning statement, as signed"
        ],
        [
          "#D6336C",
          "#F783AC",
          "Budget model — brand vs performance split"
        ]
      ],
      "q": [
        "We stopped losing comparisons we should never have entered. The category is the moat now.",
        "Lina Berg",
        "CEO, Studio Logiciel"
      ]
    },
    {
      "t": "Pricing page experiments",
      "tags": [
        "Experiments",
        "SaaS"
      ],
      "lede": "Nine-test pricing program: +17% trial-to-paid, plus the write-up the CFO framed.",
      "client": "Studio Logiciel",
      "year": "2025",
      "duration": "6 weeks",
      "ov1": "The pricing page converted visitors who were already convinced and lost everyone else. I ran the experiment program that rebuilt it.",
      "ov2": "Five tests in six weeks: anchoring order, plan naming, the annual toggle, social proof placement and the FAQ that answers the fear, not the feature.",
      "ch": "Pricing tests tangle with revenue recognition fast. Finance sat in the design reviews so every variant was bookable before it was buildable.",
      "met": [
        [
          "5",
          "",
          "Experiments in six weeks"
        ],
        [
          "31",
          "%",
          "Trial-to-paid conversion lift"
        ],
        [
          "0",
          "",
          "Refund-rate increase"
        ]
      ],
      "figs": [
        [
          "#E64980",
          "#862E9C",
          "Lifecycle map across the funnel"
        ],
        [
          "#D6336C",
          "#F783AC",
          "Holdout readout, quarter two"
        ],
        [
          "#1B2440",
          "#5C6BC0",
          "Board slide: the category, renamed"
        ]
      ],
      "q": [
        "The pricing page finally answers the question buyers were actually asking. The annual toggle test alone funded the quarter.",
        "Lina Berg",
        "CEO, Studio Logiciel"
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
  put('data-case-kicker', 'Case study · ' + "Marketing Strategist" + ' · ' + data.year);
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
