/* William Ashford — Management Consultant · portfolio interactions
   Template: template-18-consultant (variant V2, split identity)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-18-consultant', owner: 'William Ashford' };

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
   Release 2 — case-study page + link wiring · template-18-consultant
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
  var OWNER = "William Ashford";
  var CASES = [
    {
      "t": "Throughput turnaround — Hadleigh Foods",
      "tags": [
        "Operations",
        "Manufacturing"
      ],
      "lede": "Bottleneck analysis and shift redesign lifted line output 23% with zero capex.",
      "client": "Hadleigh Foods",
      "year": "2025",
      "duration": "14 weeks",
      "ov1": "A ready-meals manufacturer at 71% OEE with a full order book — leaving margin on the line every shift. We ran the throughput turnaround.",
      "ov2": "Changeover surgery, bottleneck rebalancing and a shift handover that takes eight minutes instead of forty. No capex, just sequence.",
      "ch": "The plant had survived three consultancies and trusted none. We started on nights, fixed the smallest grievance first, and earned the floor.",
      "met": [
        [
          "11",
          "",
          "OEE points gained"
        ],
        [
          "0",
          "",
          "Capex required"
        ],
        [
          "14",
          "",
          "Weeks, diagnosis to handover"
        ]
      ],
      "figs": [
        [
          "#1E3A5F",
          "#3C6493",
          "Shop-floor diagnostic notes, week one"
        ],
        [
          "#B07A45",
          "#5C3A1A",
          "The value tree, priced and owned"
        ],
        [
          "#27496D",
          "#7A9CC4",
          "Pilot line scoreboard, week four"
        ]
      ],
      "q": [
        "They found capacity we were about to build a line for. The night shift speaks well of consultants now, which I considered impossible.",
        "Gareth Hadleigh",
        "MD, Hadleigh Foods"
      ]
    },
    {
      "t": "Pricing reset — Calder Logistics",
      "tags": [
        "Pricing",
        "Logistics"
      ],
      "lede": "Cost-to-serve model exposed 60 loss-making lanes; repriced book added 4.1 margin points.",
      "client": "Calder Logistics",
      "year": "2024",
      "duration": "10 weeks",
      "ov1": "Calder priced like its grandfather did: cost plus, plus nerves. We rebuilt pricing around value to the lane, not the average.",
      "ov2": "Lane-level pricing tiers, surcharge logic with rules instead of moods, and a deal desk that answers in hours. Quoting discipline followed.",
      "ch": "Sales feared the new floors would lose volume. The pilot proved churn stayed flat while margin rose — the sceptics presented the rollout.",
      "met": [
        [
          "340",
          "",
          "Basis points of margin gained"
        ],
        [
          "0",
          "%",
          "Volume churn change"
        ],
        [
          "4",
          "",
          "Hour deal-desk response time"
        ]
      ],
      "figs": [
        [
          "#B07A45",
          "#5C3A1A",
          "Cadence calendar on the ops wall"
        ],
        [
          "#27496D",
          "#7A9CC4",
          "Handover pack, final steering deck"
        ],
        [
          "#1E3A5F",
          "#B07A45",
          "Twelve-month follow-up — sustained"
        ]
      ],
      "q": [
        "First price rise in our history that customers accepted without a fight. The lane logic gave our sales team a spine.",
        "Diane Calder",
        "CEO, Calder Logistics"
      ]
    },
    {
      "t": "PMI: two rivals, one company",
      "tags": [
        "PMI",
        "Integration"
      ],
      "lede": "100-day integration plan for merged distributors — synergy targets hit in month nine.",
      "client": "Confidential (industrial merger)",
      "year": "2023",
      "duration": "9 months",
      "ov1": "Two regional rivals merged into one company with two of everything. We led post-merger integration: one operating model, kept promises, no drama.",
      "ov2": "Day-one stability, then synergy capture sequenced by risk: back office first, customer-facing last. Both founders still speak to each other — and to us.",
      "ch": "PMI fails on identity, not spreadsheets. The work was designing which company survives in each process — explicitly, fairly, in writing.",
      "met": [
        [
          "112",
          "%",
          "Of synergy case captured"
        ],
        [
          "9",
          "",
          "Months to one operating model"
        ],
        [
          "94",
          "%",
          "Key-staff retention through PMI"
        ]
      ],
      "figs": [
        [
          "#27496D",
          "#7A9CC4",
          "Shop-floor diagnostic notes, week one"
        ],
        [
          "#1E3A5F",
          "#B07A45",
          "The value tree, priced and owned"
        ],
        [
          "#16324F",
          "#4E7AA8",
          "Pilot line scoreboard, week four"
        ]
      ],
      "q": [
        "The integration plan respected both firms’ pride — that is why it held. We hit the synergy number without losing the people who mattered.",
        "Chair (name withheld)",
        "Merged industrial group"
      ]
    },
    {
      "t": "Family firm succession operating model",
      "tags": [
        "Operating model",
        "Governance"
      ],
      "lede": "Decision-rights charter and cadence that let the founder finally take a holiday. Two, actually.",
      "client": "Fourth-generation family firm",
      "year": "2024",
      "duration": "12 weeks",
      "ov1": "A family manufacturer where every decision waited for the founder’s grandson. Succession needed an operating model, not just a will.",
      "ov2": "We designed the governance: a real management team, decision rights in writing, and a family council that meets quarterly instead of at every crisis.",
      "ch": "The org chart was easy; the kitchen-table conversations were the engagement. Decision rights only work when the family agrees what they are not.",
      "met": [
        [
          "12",
          "",
          "Weeks to a signed model"
        ],
        [
          "30",
          "",
          "Decisions delegated from the owner"
        ],
        [
          "2",
          "",
          "Non-family executives hired"
        ]
      ],
      "figs": [
        [
          "#1E3A5F",
          "#B07A45",
          "Cadence calendar on the ops wall"
        ],
        [
          "#16324F",
          "#4E7AA8",
          "Handover pack, final steering deck"
        ],
        [
          "#33506E",
          "#C99A6B",
          "Twelve-month follow-up — sustained"
        ]
      ],
      "q": [
        "William gave us the structure to disagree without damage. My son runs operations now — and I let him.",
        "Robert Ashworth Sr.",
        "Chairman, family manufacturing firm"
      ]
    },
    {
      "t": "S&OP cadence rebuild",
      "tags": [
        "Operations",
        "Planning"
      ],
      "lede": "Monthly planning rhythm connecting sales promises to factory reality; forecast bias down 60%.",
      "client": "Hadleigh Foods",
      "year": "2023",
      "duration": "8 weeks",
      "ov1": "Forecasts lived in sales’ optimism and production’s scepticism, reconciled by shouting. We rebuilt the S&OP cadence from the data up.",
      "ov2": "One demand number, agreed monthly with documented assumptions; supply scenarios pre-built; an executive meeting that decides in fifty minutes.",
      "ch": "The old meeting reviewed the past for two hours. The new cadence argues about the future — that culture shift was the project.",
      "met": [
        [
          "50",
          "",
          "Minute monthly exec S&OP"
        ],
        [
          "18",
          "%",
          "Forecast accuracy improvement"
        ],
        [
          "25",
          "%",
          "Less finished-goods inventory"
        ]
      ],
      "figs": [
        [
          "#16324F",
          "#4E7AA8",
          "Shop-floor diagnostic notes, week one"
        ],
        [
          "#33506E",
          "#C99A6B",
          "The value tree, priced and owned"
        ],
        [
          "#1E3A5F",
          "#3C6493",
          "Pilot line scoreboard, week four"
        ]
      ],
      "q": [
        "S&OP went from our worst meeting to our most useful one. We argue about decisions now, not about whose number is right.",
        "Priya Patel",
        "Supply Chain Director, Hadleigh"
      ]
    },
    {
      "t": "Procurement quick-scan programme",
      "tags": [
        "Cost",
        "Sourcing"
      ],
      "lede": "Six-week category scans across 3 firms; average 7% addressable-spend saving, verified by finance.",
      "client": "Mid-market portfolio company",
      "year": "2025",
      "duration": "6 weeks",
      "ov1": "A PE-backed manufacturer needed cost out fast without scarring the business. The procurement quick-scan finds money others negotiate past.",
      "ov2": "Six weeks, top 40 categories: price benchmarks, demand challenge and three renegotiations we led personally. Savings banked, not promised.",
      "ch": "Quick-scans get sold as magic. Ours works because we challenge demand before price — half the saving was buying less, not buying cheaper.",
      "met": [
        [
          "6",
          "",
          "Weeks, scan to banked savings"
        ],
        [
          "7",
          "%",
          "Addressable spend saved"
        ],
        [
          "40",
          "",
          "Categories examined"
        ]
      ],
      "figs": [
        [
          "#33506E",
          "#C99A6B",
          "Cadence calendar on the ops wall"
        ],
        [
          "#1E3A5F",
          "#3C6493",
          "Handover pack, final steering deck"
        ],
        [
          "#B07A45",
          "#5C3A1A",
          "Twelve-month follow-up — sustained"
        ]
      ],
      "q": [
        "Savings landed in the P&L before the final readout. The demand challenge found money our last three negotiations missed.",
        "Victoria Lam",
        "Operating Partner, Meridian Capital"
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
  put('data-case-kicker', 'Case study · ' + "Managing Consultant" + ' · ' + data.year);
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
