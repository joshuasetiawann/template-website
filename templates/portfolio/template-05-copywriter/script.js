/* Eleanor Whitfield — Copywriter · portfolio interactions
   Template: template-05-copywriter (variant V4, editorial resume)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-05-copywriter', owner: 'Eleanor Whitfield' };

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

  /* --- Case index expand / collapse --- */
  var caseHeads = Array.prototype.slice.call(document.querySelectorAll('.case-head'));
  caseHeads.forEach(function (head) {
    head.addEventListener('click', function () {
      var expanded = head.getAttribute('aria-expanded') === 'true';
      var id = head.getAttribute('aria-controls');
      var detail = id ? document.getElementById(id) : null;
      head.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      var caseItem = head.closest ? head.closest('.case-item') : null;
      if (caseItem) { caseItem.classList.toggle('is-open', !expanded); }
      if (detail) { detail.hidden = expanded; }
    });
  });

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
   Release 2 — case-study page + link wiring · template-05-copywriter
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
  var OWNER = "Eleanor Whitfield";
  var CASES = [
    {
      "t": "“Money, minus the mood” — Lark Bank",
      "tags": [
        "Campaign",
        "Finance"
      ],
      "lede": "Launch platform for a challenger bank: 1 manifesto, 40 OOH lines, and a tone guide the lawyers signed.",
      "client": "Lark Bank",
      "year": "2025",
      "duration": "8 weeks",
      "ov1": "A challenger bank launching into a category that shouts. Lark wanted to sound like the calm person at the party — I wrote the launch platform.",
      "ov2": "One manifesto, forty out-of-home lines and a tone guide the lawyers signed without a fight. \"Money, minus the mood\" led the campaign across three cities.",
      "ch": "Banking copy dies in compliance. The craft was writing lines flexible enough to clear legal and sharp enough to stop a commuter.",
      "met": [
        [
          "40",
          "",
          "OOH lines shipped"
        ],
        [
          "3",
          "",
          "Cities in the launch"
        ],
        [
          "62",
          "%",
          "Unaided recall in tracking"
        ]
      ],
      "figs": [
        [
          "#F5D547",
          "#B89308",
          "Longhand headline sheets, round one"
        ],
        [
          "#E8B33C",
          "#7A5A06",
          "The wall of forty lines, mid-cull"
        ],
        [
          "#D9C36A",
          "#5C5212",
          "Voice principles spread from the guide"
        ]
      ],
      "q": [
        "The manifesto reads like we secretly recorded our best customer. Legal asked for one change. One.",
        "Imogen Clarke",
        "CMO, Lark Bank"
      ]
    },
    {
      "t": "Naming: “Kindling” reading app",
      "tags": [
        "Naming",
        "Product"
      ],
      "lede": "312 candidates, 3 trademark rounds, one name that finally made the founders grin.",
      "client": "Kindling (with Foundry Studio)",
      "year": "2024",
      "duration": "6 weeks",
      "ov1": "A reading app needed a name that felt like the thing itself: small, warm, the start of something. I ran the naming engagement end to end.",
      "ov2": "312 candidates, three trademark rounds, twelve survivors tested with readers. \"Kindling\" cleared in every market and made the founders grin — the real test.",
      "ch": "Naming is graveyards: the best candidates are always taken. Discipline meant generating wide, killing fast and never falling in love before legal had spoken.",
      "met": [
        [
          "312",
          "",
          "Names generated"
        ],
        [
          "3",
          "",
          "Trademark rounds cleared"
        ],
        [
          "12",
          "",
          "Names taken to research"
        ]
      ],
      "figs": [
        [
          "#E8B33C",
          "#7A5A06",
          "Out-of-home mockups in situ"
        ],
        [
          "#D9C36A",
          "#5C5212",
          "Tracked-changes page, lawyer round"
        ],
        [
          "#F0CE45",
          "#8A6E00",
          "The final line, as it ran"
        ]
      ],
      "q": [
        "Every agency promises a name you will love. Eleanor delivered one we could actually own — and a rationale the board quoted back.",
        "Daniel Okafor",
        "Co-founder, Kindling"
      ]
    },
    {
      "t": "Verdant grocery voice system",
      "tags": [
        "Voice",
        "Retail"
      ],
      "lede": "Voice principles, 60 modular shelf-talkers and an error-message library with actual manners.",
      "client": "Verdant Grocers",
      "year": "2024",
      "duration": "10 weeks",
      "ov1": "A 140-store grocery chain whose signage, app and apology emails sounded like three different companies. I built the voice system.",
      "ov2": "We defined three dials — plainness, warmth, wit — and rewrote 200 real examples, from aisle signs to the dreaded substitutions email.",
      "ch": "The voice had to survive 600 sign-writers and a customer-service team on deadline. Principles got one page; examples got forty.",
      "met": [
        [
          "200",
          "",
          "Real examples rewritten"
        ],
        [
          "140",
          "",
          "Stores using the guide"
        ],
        [
          "18",
          "%",
          "Lift in email click-through"
        ]
      ],
      "figs": [
        [
          "#D9C36A",
          "#5C5212",
          "Longhand headline sheets, round one"
        ],
        [
          "#F0CE45",
          "#8A6E00",
          "The wall of forty lines, mid-cull"
        ],
        [
          "#CBB26B",
          "#46390E",
          "Voice principles spread from the guide"
        ]
      ],
      "q": [
        "Complaint replies used to take twenty minutes of agonising. Now the team writes like the brand without thinking about it.",
        "Ruth Bennett",
        "Customer Director, Verdant"
      ]
    },
    {
      "t": "“Walk it off” — Stride footwear",
      "tags": [
        "Campaign",
        "Retail"
      ],
      "lede": "Anti-hustle campaign for walking shoes; CTR doubled and the line ended up on a mural.",
      "client": "Stride Footwear",
      "year": "2023",
      "duration": "7 weeks",
      "ov1": "A running brand for people who run to feel better, not to place. \"Walk it off\" reclaimed the insult as the campaign platform.",
      "ov2": "Headlines for outdoor, retail and a sixty-second film script — all built on the truth that most runs start as a bad mood.",
      "ch": "Sports copy defaults to podium worship. The risk was tonal: celebrating the slow Sunday plod without patronising the people doing it.",
      "met": [
        [
          "28",
          "",
          "Headlines in the toolkit"
        ],
        [
          "1",
          "",
          "Film script produced"
        ],
        [
          "24",
          "%",
          "Sales lift in campaign cities"
        ]
      ],
      "figs": [
        [
          "#F0CE45",
          "#8A6E00",
          "Out-of-home mockups in situ"
        ],
        [
          "#CBB26B",
          "#46390E",
          "Tracked-changes page, lawyer round"
        ],
        [
          "#EFD98A",
          "#6E5B12",
          "The final line, as it ran"
        ]
      ],
      "q": [
        "First campaign in years where customers sent us photos of the posters. The line gave the whole brand permission to relax.",
        "Marcus Webb",
        "Brand VP, Stride"
      ]
    },
    {
      "t": "Atlas Journal essay series",
      "tags": [
        "Editorial",
        "Long-form"
      ],
      "lede": "Six 2,000-word essays on cities and memory, ghost-edited into a brand anthology.",
      "client": "Atlas Journal",
      "year": "2022",
      "duration": "6 months",
      "ov1": "A travel quarterly wanted essays, not listicles — pieces that smell of diesel and oranges. I wrote four long-form essays across two issues.",
      "ov2": "Twelve thousand words from three countries: a night train, a border-town bakery, a ferry timetable read as literature. Two pieces anthologised.",
      "ch": "Long-form is earned a paragraph at a time. The challenge was reporting depth on an essayist’s budget — every detail had to be carried home in a notebook.",
      "met": [
        [
          "12",
          "k",
          "Words published"
        ],
        [
          "4",
          "",
          "Essays across two issues"
        ],
        [
          "2",
          "",
          "Pieces anthologised"
        ]
      ],
      "figs": [
        [
          "#CBB26B",
          "#46390E",
          "Longhand headline sheets, round one"
        ],
        [
          "#EFD98A",
          "#6E5B12",
          "The wall of forty lines, mid-cull"
        ],
        [
          "#F5D547",
          "#B89308",
          "Voice principles spread from the guide"
        ]
      ],
      "q": [
        "Eleanor files copy that needs an editor only for company. Subscribers cite her essays in renewal surveys.",
        "Sofia Marchetti",
        "Editor, Atlas Journal"
      ]
    },
    {
      "t": "Onboarding copy — Pillow sleep app",
      "tags": [
        "UX copy",
        "Product"
      ],
      "lede": "Rewrote 70 screens at a 6th-grade reading level; trial-to-paid conversion rose 19%.",
      "client": "Pillow Sleep App",
      "year": "2023",
      "duration": "5 weeks",
      "ov1": "A sleep app whose onboarding read like a clinical trial. I rewrote the first-run experience — every screen, error and empty state.",
      "ov2": "The new flow asks one gentle question at a time and explains why before it asks. Completion rose, support tickets about setup halved.",
      "ch": "UX copy fails invisibly: the wrong word costs a thousand sign-ups quietly. We tested every screen variant with five-second comprehension checks.",
      "met": [
        [
          "38",
          "",
          "Screens rewritten"
        ],
        [
          "22",
          "%",
          "Onboarding completion lift"
        ],
        [
          "51",
          "%",
          "Fewer setup tickets"
        ]
      ],
      "figs": [
        [
          "#EFD98A",
          "#6E5B12",
          "Out-of-home mockups in situ"
        ],
        [
          "#F5D547",
          "#B89308",
          "Tracked-changes page, lawyer round"
        ],
        [
          "#E8B33C",
          "#7A5A06",
          "The final line, as it ran"
        ]
      ],
      "q": [
        "We thought we had a design problem. Eleanor proved it was a sentence problem — then fixed every sentence.",
        "Yuki Tanaka",
        "Head of Product, Pillow"
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
  put('data-case-kicker', 'Case study · ' + "Copywriter & voice lead" + ' · ' + data.year);
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
