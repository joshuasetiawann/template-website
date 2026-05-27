/* Priya Raghavan — Product Designer · portfolio interactions
   Template: template-07-product-designer (variant V2, split identity)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-07-product-designer', owner: 'Priya Raghavan' };

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
   Release 2 — case-study page + link wiring · template-07-product-designer
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
  var OWNER = "Priya Raghavan";
  var CASES = [
    {
      "t": "Paisa savings app redesign",
      "tags": [
        "Fintech",
        "Mobile"
      ],
      "lede": "Round-up savings flow rebuilt for first-time investors; weekly retention up 24% post-launch.",
      "client": "Paisa",
      "year": "2025",
      "duration": "12 weeks",
      "ov1": "Paisa’s savings app served first-time savers with a screen built for traders. I led the redesign of the home and goal flows.",
      "ov2": "We rebuilt around one question — \"am I on track?\" — with goals as cards, deposits as one thumb action, and jargon translated into rupees and dates.",
      "ch": "Trust is the currency in fintech for new savers: every simplification had to be auditable, with the full ledger one tap behind the calm surface.",
      "met": [
        [
          "27",
          "%",
          "More weekly active savers"
        ],
        [
          "2",
          "x",
          "Deposit frequency"
        ],
        [
          "18",
          "",
          "Field interviews in three cities"
        ]
      ],
      "figs": [
        [
          "#F97316",
          "#FDBA74",
          "Field notes from the first study"
        ],
        [
          "#FB923C",
          "#7C2D12",
          "Hypothesis one-pager, as signed"
        ],
        [
          "#F97316",
          "#334155",
          "Flow map across the core journey"
        ]
      ],
      "q": [
        "My mother now uses the app without phoning me. That was, genuinely, the success metric I cared about.",
        "Arjun Mehta",
        "Head of Product, Paisa"
      ]
    },
    {
      "t": "Sehat telehealth triage",
      "tags": [
        "Health",
        "Mobile"
      ],
      "lede": "Symptom triage in 4 languages with voice input; cut average consult booking time to 90 seconds.",
      "client": "Sehat Health",
      "year": "2024",
      "duration": "16 weeks",
      "ov1": "A telehealth service triaging thousands of daily symptom checks. I designed the triage conversation and its escalation paths.",
      "ov2": "The flow asks plain-language questions, shows why it asks, and routes red flags to nurses in under a minute. Designed offline-first for patchy networks.",
      "ch": "A triage UI cannot be merely usable — wrong reassurance is dangerous. We tested edge cases with clinicians until the escalation logic had no quiet corners.",
      "met": [
        [
          "58",
          "%",
          "Faster nurse escalation"
        ],
        [
          "3",
          "",
          "Clinical review rounds passed"
        ],
        [
          "40",
          "%",
          "Of sessions on 2G networks"
        ]
      ],
      "figs": [
        [
          "#FB923C",
          "#7C2D12",
          "Prototype test, session four"
        ],
        [
          "#F97316",
          "#334155",
          "Token additions proposed to the system"
        ],
        [
          "#EA580C",
          "#FED7AA",
          "Launch dashboard, week six"
        ]
      ],
      "q": [
        "The escalation design caught cases our old form buried. Clinicians signed off without a single safety reservation.",
        "Dr. Farah Qureshi",
        "Medical Director, Sehat"
      ]
    },
    {
      "t": "Cart Sense — grocery UX",
      "tags": [
        "Retail",
        "Research"
      ],
      "lede": "Shop-along study with 18 households reshaped substitutions, saving 11% of abandoned orders.",
      "client": "Cart Sense",
      "year": "2023",
      "duration": "8 weeks",
      "ov1": "A grocery platform losing baskets at substitutions. I ran the research and redesigned how out-of-stock swaps are proposed and approved.",
      "ov2": "Substitutions now show side-by-side with price deltas and a one-tap approve-all for trusted swaps. The angriest support category went quiet.",
      "ch": "The data said substitutions; the interviews said betrayal. Designing for the emotion — not the inventory event — was the unlock.",
      "met": [
        [
          "34",
          "%",
          "Fewer substitution complaints"
        ],
        [
          "12",
          "",
          "Diary-study households"
        ],
        [
          "9",
          "%",
          "Basket completion lift"
        ]
      ],
      "figs": [
        [
          "#F97316",
          "#334155",
          "Field notes from the first study"
        ],
        [
          "#EA580C",
          "#FED7AA",
          "Hypothesis one-pager, as signed"
        ],
        [
          "#FF8A3C",
          "#3B2410",
          "Flow map across the core journey"
        ]
      ],
      "q": [
        "Priya reframed our nastiest metric as a trust problem and the numbers followed. Support volume tells the story.",
        "Tom Whelan",
        "COO, Cart Sense"
      ]
    },
    {
      "t": "Design tokens for OneBank",
      "tags": [
        "Fintech",
        "Systems"
      ],
      "lede": "Token architecture spanning iOS, Android and web; themes ship in hours instead of sprints.",
      "client": "OneBank",
      "year": "2024",
      "duration": "6 months",
      "ov1": "OneBank’s four product teams shipped four shades of navy. I led the token architecture for a bank-wide design language.",
      "ov2": "Semantic tokens for colour, type and motion, mapped to brand and dark themes, delivered as Figma variables and a synced JSON pipeline to code.",
      "ch": "A bank cannot break mid-migration. Tokens rolled out behind a compatibility layer with visual-diff gates on every release train.",
      "met": [
        [
          "640",
          "",
          "Semantic tokens defined"
        ],
        [
          "4",
          "",
          "Teams migrated"
        ],
        [
          "0",
          "",
          "Visual regressions shipped"
        ]
      ],
      "figs": [
        [
          "#EA580C",
          "#FED7AA",
          "Prototype test, session four"
        ],
        [
          "#FF8A3C",
          "#3B2410",
          "Token additions proposed to the system"
        ],
        [
          "#FDA452",
          "#7A3A0E",
          "Launch dashboard, week six"
        ]
      ],
      "q": [
        "The token system ended four years of navy arguments in one quarter. Audits now read like documentation.",
        "Grace Lin",
        "Design Director, OneBank"
      ]
    },
    {
      "t": "Pulse rides driver app",
      "tags": [
        "Mobility",
        "Mobile"
      ],
      "lede": "Glanceable night-mode driver UI tested in moving cars; 40% fewer mid-ride screen touches.",
      "client": "Pulse Rides",
      "year": "2022",
      "duration": "10 weeks",
      "ov1": "Drivers used Pulse’s app at arm’s length, in sunlight, between fares. I redesigned the driver home for glanceability and one-handed use.",
      "ov2": "Earnings, surge and next-step actions live in a thumb-reach band; everything else waits. Type scaled for dashboards, tested in parked cars at noon.",
      "ch": "Lab tests lie about sunlight and gloves. We tested in vehicles with real drivers — the contrast spec came from a windshield, not a guideline.",
      "met": [
        [
          "21",
          "%",
          "Fewer mid-shift support calls"
        ],
        [
          "15",
          "",
          "In-vehicle test sessions"
        ],
        [
          "19",
          "%",
          "Faster glance-to-action time"
        ]
      ],
      "figs": [
        [
          "#FF8A3C",
          "#3B2410",
          "Field notes from the first study"
        ],
        [
          "#FDA452",
          "#7A3A0E",
          "Hypothesis one-pager, as signed"
        ],
        [
          "#F97316",
          "#FDBA74",
          "Flow map across the core journey"
        ]
      ],
      "q": [
        "Drivers stopped calling about where their money went. The home screen answers before they ask.",
        "Sandeep Rao",
        "Driver Ops Lead, Pulse"
      ]
    },
    {
      "t": "Onboarding motion kit",
      "tags": [
        "Systems",
        "Motion"
      ],
      "lede": "Reusable Lottie micro-interactions with reduced-motion fallbacks baked in from day one.",
      "client": "Internal · with Loopwise motion guild",
      "year": "2023",
      "duration": "5 weeks",
      "ov1": "Onboarding flows across our suite animated like five different products. I built the motion kit that made entrances feel like one hand.",
      "ov2": "Twelve choreography patterns — reveal, progress, success — with duration and easing tokens, shipped as Figma components and CSS snippets.",
      "ch": "Motion guidelines are ignored unless they are easier than improvising. The kit won by being copy-paste faster than hand-tuning.",
      "met": [
        [
          "12",
          "",
          "Choreography patterns"
        ],
        [
          "200",
          "ms",
          "Standard entrance duration"
        ],
        [
          "5",
          "",
          "Products adopting the kit"
        ]
      ],
      "figs": [
        [
          "#FDA452",
          "#7A3A0E",
          "Prototype test, session four"
        ],
        [
          "#F97316",
          "#FDBA74",
          "Token additions proposed to the system"
        ],
        [
          "#FB923C",
          "#7C2D12",
          "Launch dashboard, week six"
        ]
      ],
      "q": [
        "Our onboarding finally moves like one product. New designers use the kit on day one because it is the lazy option — by design.",
        "Maya Lindqvist",
        "Design Systems Lead"
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
  put('data-case-kicker', 'Case study · ' + "Senior Product Designer" + ' · ' + data.year);
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
