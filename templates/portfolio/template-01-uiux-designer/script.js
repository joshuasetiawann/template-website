/* Maya Lindqvist — UI/UX Designer · portfolio interactions
   Template: template-01-uiux-designer (variant V2, split identity)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-01-uiux-designer', owner: 'Maya Lindqvist' };

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
   Release 2 — case-study page + link wiring · template-01-uiux-designer
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
  var OWNER = "Maya Lindqvist";
  var CASES = [
    {
      "t": "Loopwise onboarding redesign",
      "tags": [
        "UX",
        "SaaS"
      ],
      "lede": "Cut activation drop-off 31% by rebuilding a 9-step signup into 3 adaptive screens with inline education.",
      "client": "Loopwise",
      "year": "2025",
      "duration": "9 weeks",
      "ov1": "Loopwise came to us with a nine-step signup that was bleeding trial users. I led design end to end — research, flows, UI and the experiment plan.",
      "ov2": "We rebuilt onboarding as three adaptive screens that teach the product while collecting only what the first session needs. Education moved inline, jargon moved out.",
      "ch": "Every team owned one of the nine steps, and each had a metric attached to it. The real work was political: proving with session recordings that fewer questions earlier meant better data later.",
      "met": [
        [
          "31",
          "%",
          "Activation drop-off cut"
        ],
        [
          "3",
          "x",
          "Faster first project setup"
        ],
        [
          "14",
          "",
          "Usability sessions run"
        ]
      ],
      "figs": [
        [
          "#7C5CFC",
          "#B49CFF",
          "Early greyscale wireframes, week two"
        ],
        [
          "#4B34C7",
          "#8F7BFF",
          "Journey map from the discovery sprint"
        ],
        [
          "#6D4DF0",
          "#C3B2FF",
          "Tested prototype, third usability round"
        ]
      ],
      "q": [
        "Maya turned a signup we were all afraid to touch into the most measured flow in the company. The data ended every argument.",
        "Jonas Berg",
        "CPO, Loopwise"
      ]
    },
    {
      "t": "Fjord design system",
      "tags": [
        "Systems",
        "UI"
      ],
      "lede": "Token-based component library spanning 4 products; shipped with usage docs and Figma variables.",
      "client": "Fjord (internal)",
      "year": "2024",
      "duration": "6 months",
      "ov1": "Four products, four button styles, one frustrated engineering org. I led the design-token workstream and the component audit that became the Fjord design system.",
      "ov2": "We shipped a token-based library with Figma variables wired to code, usage docs in Zeroheight, and a contribution model that survives team turnover.",
      "ch": "The hard part was not drawing components — it was retiring 212 rogue variants without freezing four roadmaps while we did it.",
      "met": [
        [
          "212",
          "",
          "Rogue variants retired"
        ],
        [
          "4",
          "",
          "Products on one system"
        ],
        [
          "38",
          "%",
          "Faster UI build time"
        ]
      ],
      "figs": [
        [
          "#4B34C7",
          "#8F7BFF",
          "Token sheet handed to engineering"
        ],
        [
          "#6D4DF0",
          "#C3B2FF",
          "Flow diagram for the final release"
        ],
        [
          "#5A3FE0",
          "#9D8BFF",
          "Before-and-after of the shipped screens"
        ]
      ],
      "q": [
        "The system finally made our four apps feel like one company. Adoption was the smoothest rollout we have run.",
        "Sara Holm",
        "Engineering Director, Loopwise"
      ]
    },
    {
      "t": "Kassa POS checkout flow",
      "tags": [
        "UX",
        "Research"
      ],
      "lede": "Field-tested a tablet checkout with 14 cafe owners, halving average order entry time.",
      "client": "Kassa Systems",
      "year": "2023",
      "duration": "8 weeks",
      "ov1": "Kassa’s tablet checkout was built for demos, not for a Tuesday lunch rush. I ran field research in fourteen cafes and redesigned the order-entry flow.",
      "ov2": "The new layout puts the ninety-percent path on one screen: favourites by daypart, modifiers as chips, payment one touch away. We tested on counters, not in labs.",
      "ch": "Staff use the till with wet hands, in noise, while talking to a customer. Every design decision had to survive a real queue — speed beat elegance every time.",
      "met": [
        [
          "2",
          "x",
          "Faster order entry"
        ],
        [
          "14",
          "",
          "Cafes in field tests"
        ],
        [
          "29",
          "%",
          "Fewer mis-keyed orders"
        ]
      ],
      "figs": [
        [
          "#6D4DF0",
          "#C3B2FF",
          "Early greyscale wireframes, week two"
        ],
        [
          "#5A3FE0",
          "#9D8BFF",
          "Journey map from the discovery sprint"
        ],
        [
          "#7C5CFC",
          "#5EC9F8",
          "Tested prototype, third usability round"
        ]
      ],
      "q": [
        "Order entry got so fast our baristas stopped using the shortcut cheat sheet taped to the till.",
        "Anna Keller",
        "Head of Ops, Kassa Systems"
      ]
    },
    {
      "t": "Helsedirekt patient portal",
      "tags": [
        "UI",
        "Accessibility"
      ],
      "lede": "WCAG-AA health portal redesign: legible type ramps, calmer forms, screen-reader-first navigation.",
      "client": "Helsedirekt",
      "year": "2024",
      "duration": "12 weeks",
      "ov1": "A public health portal that legally had to work for everyone — including the eighty-year-old logging in with a screen reader. I owned the accessibility redesign.",
      "ov2": "We rebuilt the type ramp, calmed the forms to one question per view, and restructured navigation landmark-first. Then we tested with assistive-tech users, twice.",
      "ch": "WCAG-AA was the floor, not the goal. The challenge was keeping clinicians’ dense workflows fast while making the patient side radically simpler.",
      "met": [
        [
          "100",
          "%",
          "WCAG-AA criteria met"
        ],
        [
          "41",
          "%",
          "Fewer form support calls"
        ],
        [
          "9",
          "",
          "Assistive-tech test users"
        ]
      ],
      "figs": [
        [
          "#5A3FE0",
          "#9D8BFF",
          "Token sheet handed to engineering"
        ],
        [
          "#7C5CFC",
          "#5EC9F8",
          "Flow diagram for the final release"
        ],
        [
          "#8A6BFF",
          "#F0A6FF",
          "Before-and-after of the shipped screens"
        ]
      ],
      "q": [
        "The audit came back clean for the first time in the portal’s history — and patients noticed before the auditors did.",
        "Ingrid Dahl",
        "Digital Services Lead, Helsedirekt"
      ]
    },
    {
      "t": "Brimstone analytics dashboards",
      "tags": [
        "SaaS",
        "UI"
      ],
      "lede": "Dense data made scannable — progressive disclosure, saved views, and a chart palette tested for color-blindness.",
      "client": "Brimstone",
      "year": "2025",
      "duration": "10 weeks",
      "ov1": "Brimstone’s analytics screens had every number and no answers. I redesigned the dashboard architecture around questions users actually ask on Monday morning.",
      "ov2": "Progressive disclosure, saved views per role, and a chart palette tested with colour-blind users. Density stayed; the squinting went.",
      "ch": "Power users wanted everything visible; new users wanted mercy. The grid had to serve both without a settings page nobody opens.",
      "met": [
        [
          "44",
          "%",
          "Faster time-to-insight"
        ],
        [
          "6",
          "",
          "Role-based saved views"
        ],
        [
          "0",
          "",
          "Contrast failures left"
        ]
      ],
      "figs": [
        [
          "#7C5CFC",
          "#5EC9F8",
          "Early greyscale wireframes, week two"
        ],
        [
          "#8A6BFF",
          "#F0A6FF",
          "Journey map from the discovery sprint"
        ],
        [
          "#7C5CFC",
          "#B49CFF",
          "Tested prototype, third usability round"
        ]
      ],
      "q": [
        "Maya made our densest screens feel calm. Churned accounts started coming back to the dashboard tab.",
        "Felix Brandt",
        "VP Product, Brimstone"
      ]
    },
    {
      "t": "Nordic mobility app concept",
      "tags": [
        "Research",
        "UX"
      ],
      "lede": "Diary study with 22 commuters turned into a multimodal route planner concept, prototyped in a week.",
      "client": "Nordic Transit Lab",
      "year": "2023",
      "duration": "5 weeks",
      "ov1": "A speculative sprint with a mobility consortium: could one app plan a commute across bike, ferry and train? I led research and concept design.",
      "ov2": "A diary study with 22 commuters became a multimodal route planner concept — prototyped, tested and pitched to the consortium board within five weeks.",
      "ch": "Concept work dies in slideware. We forced every insight into a testable prototype within days, so the board judged journeys, not posters.",
      "met": [
        [
          "22",
          "",
          "Commuter diary studies"
        ],
        [
          "5",
          "",
          "Weeks to tested concept"
        ],
        [
          "86",
          "%",
          "Task success in tests"
        ]
      ],
      "figs": [
        [
          "#8A6BFF",
          "#F0A6FF",
          "Token sheet handed to engineering"
        ],
        [
          "#7C5CFC",
          "#B49CFF",
          "Flow diagram for the final release"
        ],
        [
          "#4B34C7",
          "#8F7BFF",
          "Before-and-after of the shipped screens"
        ]
      ],
      "q": [
        "The prototype did more for our funding case than a year of strategy decks.",
        "Mikkel Sørensen",
        "Programme Lead, Nordic Transit Lab"
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
  put('data-case-kicker', 'Case study · ' + "Lead Product Designer" + ' · ' + data.year);
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
