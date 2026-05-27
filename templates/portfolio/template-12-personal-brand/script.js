/* Adrian Volkov — Brand Strategist & Speaker · portfolio interactions
   Template: template-12-personal-brand (variant V3, dark showcase)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-12-personal-brand', owner: 'Adrian Volkov' };

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

  /* --- Project quick-view modal --- */
  var modal = document.getElementById('project-modal');
  if (modal) {
    var modalTitle = modal.querySelector('#modal-title');
    var modalBlurb = modal.querySelector('.modal-blurb');
    var modalTags = modal.querySelector('.modal-tags');
    var modalArt = modal.querySelector('.modal-art');
    var modalClose = modal.querySelector('.modal-close');
    var modalOverlay = modal.querySelector('.modal-overlay');
    var lastFocus = null;
    var openModal = function (btn) {
      lastFocus = btn;
      if (modalTitle) { modalTitle.textContent = btn.getAttribute('data-title') || ''; }
      if (modalBlurb) { modalBlurb.textContent = btn.getAttribute('data-blurb') || ''; }
      if (modalTags) { modalTags.textContent = btn.getAttribute('data-tags') || ''; }
      if (modalArt) {
        modalArt.style.backgroundImage = 'linear-gradient(135deg,' +
          (btn.getAttribute('data-g1') || '#444') + ',' + (btn.getAttribute('data-g2') || '#111') + ')';
      }
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (modalClose) { modalClose.focus(); }
    };
    var closeModal = function () {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus) { lastFocus.focus(); }
    };
    Array.prototype.slice.call(document.querySelectorAll('.quick-view')).forEach(function (btn) {
      btn.addEventListener('click', function () { openModal(btn); });
    });
    if (modalClose) { modalClose.addEventListener('click', closeModal); }
    if (modalOverlay) { modalOverlay.addEventListener('click', closeModal); }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) { closeModal(); }
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
   Release 2 — case-study page + link wiring · template-12-personal-brand
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

  /* Quick-view modal: aim the primary CTA at the matching case study */
  var caseModal = document.getElementById('project-modal');
  if (caseModal) {
    var caseModalCta = caseModal.querySelector('.modal-cta');
    if (caseModalCta) {
      Array.prototype.slice.call(document.querySelectorAll('.quick-view')).forEach(function (btn, fallbackIdx) {
        btn.addEventListener('click', function () {
          var n = btn.getAttribute('data-index');
          caseModalCta.setAttribute('href', 'project.html?p=' + (n === null ? String(fallbackIdx) : n));
        });
      });
    }
  }

  /* Case-study renderer: reads ?p= (0-5), falls back to project 0 */
  var caseRoot = document.querySelector('[data-case-page]');
  if (!caseRoot) { return; }
  var OWNER = "Adrian Volkov";
  var CASES = [
    {
      "t": "“The Patient Contrarian” keynote",
      "tags": [
        "Keynote",
        "Narrative"
      ],
      "lede": "Signature talk built for a fintech founder — delivered 19 times, including two industry main stages.",
      "client": "Keynote · 14 stages",
      "year": "2025",
      "duration": "Season",
      "ov1": "The Patient Contrarian argues that the best founders are slow on purpose — contrarian in conviction, patient in proof. Fourteen stages booked it in a year.",
      "ov2": "The talk runs 38 minutes, no slides for the first ten. It has been rebuilt three times as the argument sharpened against audience pushback.",
      "ch": "A keynote earns its fee in the Q&A. The talk had to survive hostile questions from operators who lived the counter-examples.",
      "met": [
        [
          "14",
          "",
          "Stages in twelve months"
        ],
        [
          "38",
          "",
          "Minutes, no notes"
        ],
        [
          "92",
          "",
          "NPS across post-event surveys"
        ]
      ],
      "figs": [
        [
          "#D9A441",
          "#5C420F",
          "Argument map for the keynote"
        ],
        [
          "#3E6B5E",
          "#0F2622",
          "Rehearsal room, run-through four"
        ],
        [
          "#C08F2C",
          "#2A1F08",
          "Marked-up manuscript page"
        ]
      ],
      "q": [
        "Our hardest-to-impress audience gave him the only standing ovation of the conference. The Q&A was better than most keynotes.",
        "Sandra Liu",
        "Programme Chair, Founders Assembly"
      ]
    },
    {
      "t": "Founder book: “Unscalable”",
      "tags": [
        "Ghostwriting",
        "Books"
      ],
      "lede": "14 months from voice memos to hardcover; 60k copies and a second print run in month three.",
      "client": "Verlag & Holt (publisher)",
      "year": "2024",
      "duration": "14 months",
      "ov1": "Unscalable is a founder’s book about the things that should never be automated. I ghostwrote it from 40 hours of interviews and a decade of board notes.",
      "ov2": "The founder’s voice survives the editing — colleagues say the book \"sounds like him on a good day\". Three printings in the first year.",
      "ch": "Ghostwriting is ventriloquism with integrity: every anecdote verified, every claim the founder could defend on a podcast without me in the room.",
      "met": [
        [
          "40",
          "",
          "Interview hours distilled"
        ],
        [
          "3",
          "",
          "Printings in year one"
        ],
        [
          "11",
          "",
          "Languages licensed"
        ]
      ],
      "figs": [
        [
          "#3E6B5E",
          "#0F2622",
          "Green room notes before the main stage"
        ],
        [
          "#C08F2C",
          "#2A1F08",
          "The slide everyone photographs"
        ],
        [
          "#B58428",
          "#143630",
          "Signing line, books gone by noon"
        ]
      ],
      "q": [
        "Adrian wrote the book I kept failing to write. My co-founder read it and said \"finally, you make sense\".",
        "Erik Johansson",
        "Founder (name withheld by request)"
      ]
    },
    {
      "t": "Category narrative for Meridian AI",
      "tags": [
        "Narrative",
        "Advisory"
      ],
      "lede": "Repositioned the CEO from “another AI founder” to the regulation-first voice journalists call first.",
      "client": "Meridian AI",
      "year": "2025",
      "duration": "10 weeks",
      "ov1": "Meridian had breakthrough research and a commodity narrative. I built the category story that made their patience legible to the market.",
      "ov2": "A narrative architecture — the claim, the enemy, the proof ladder — deployed across the keynote circuit, the homepage and the Series C deck.",
      "ch": "AI narratives age in weeks. The story had to be specific enough to win now and durable enough to survive the next model release.",
      "met": [
        [
          "1",
          "",
          "Narrative across all surfaces"
        ],
        [
          "120",
          "M",
          "Series C raised on the story"
        ],
        [
          "6",
          "",
          "Tier-one features unprompted"
        ]
      ],
      "figs": [
        [
          "#C08F2C",
          "#2A1F08",
          "Argument map for the keynote"
        ],
        [
          "#B58428",
          "#143630",
          "Rehearsal room, run-through four"
        ],
        [
          "#E0B45C",
          "#3E2D0C",
          "Marked-up manuscript page"
        ]
      ],
      "q": [
        "Investors started repeating our framing back to us in diligence. That is when I knew the narrative had won.",
        "Dr. Amara Osei",
        "CEO, Meridian AI"
      ]
    },
    {
      "t": "LinkedIn operating system",
      "tags": [
        "Media",
        "Positioning"
      ],
      "lede": "A 90-day cadence that took a quiet CTO to 80k followers without a single engagement-bait post.",
      "client": "Own platform",
      "year": "2023",
      "duration": "Ongoing",
      "ov1": "The LinkedIn operating system is exactly that: a weekly publishing discipline that turned a feed into a referral engine for counsel work.",
      "ov2": "Three formats on rotation, written in batches, never outsourced. The audience compounds: every keynote and book buyer traces back to the feed.",
      "ch": "The discipline is saying no: no engagement bait, no borrowed takes, no posting on days with nothing to say. Scarcity is the brand.",
      "met": [
        [
          "90",
          "k",
          "Followers, organically built"
        ],
        [
          "3",
          "",
          "Formats on weekly rotation"
        ],
        [
          "70",
          "%",
          "Of inbound traced to the feed"
        ]
      ],
      "figs": [
        [
          "#B58428",
          "#143630",
          "Green room notes before the main stage"
        ],
        [
          "#E0B45C",
          "#3E2D0C",
          "The slide everyone photographs"
        ],
        [
          "#D9A441",
          "#1D4038",
          "Signing line, books gone by noon"
        ]
      ],
      "q": [
        "His feed is the only one our partners forward without comment. The restraint is the signal.",
        "Claire Fontaine",
        "Managing Partner, Atlas Ventures"
      ]
    },
    {
      "t": "IPO communications counsel",
      "tags": [
        "Advisory",
        "Narrative"
      ],
      "lede": "Roadshow story, analyst-day talk track and the unsexy Q&A drilling that kept it on message.",
      "client": "Pre-IPO fintech",
      "year": "2024",
      "duration": "9 months",
      "ov1": "A fintech preparing to list needed its story to survive scrutiny it had never faced. I counselled the executive team through the narrative build.",
      "ov2": "Message architecture, objection drills and a no-surprises discipline: every claim in the roadshow pre-rebutted in the appendix.",
      "ch": "IPO communications is the art of being boring on purpose. The win was subtracting every sentence the CFO could not defend under oath.",
      "met": [
        [
          "9",
          "",
          "Months of counsel"
        ],
        [
          "200",
          "+",
          "Objections drilled pre-roadshow"
        ],
        [
          "0",
          "",
          "Narrative corrections post-listing"
        ]
      ],
      "figs": [
        [
          "#E0B45C",
          "#3E2D0C",
          "Argument map for the keynote"
        ],
        [
          "#D9A441",
          "#1D4038",
          "Rehearsal room, run-through four"
        ],
        [
          "#D9A441",
          "#5C420F",
          "Marked-up manuscript page"
        ]
      ],
      "q": [
        "Adrian removed every sentence we would have regretted. The roadshow had no surprises because he had already asked the hostile questions.",
        "Miriam Goldberg",
        "CFO (pre-IPO client)"
      ]
    },
    {
      "t": "“Second Mountain” podcast tour",
      "tags": [
        "Media",
        "Keynote"
      ],
      "lede": "Curated 12-show tour with prepared throughlines; produced 9 inbound enterprise leads.",
      "client": "Podcast circuit",
      "year": "2023",
      "duration": "6 months",
      "ov1": "Second Mountain was a deliberate tour: twenty podcasts in six months, one argument, no repeated anecdotes — a book launch without a book.",
      "ov2": "Each appearance was prepped like testimony: host research, tailored openings, and a different supporting story per show so superfans hear no reruns.",
      "ch": "Podcast tours blur into noise. Treating each show as a distinct audience — not a syndication — is why the tour converted instead of just reaching.",
      "met": [
        [
          "20",
          "",
          "Shows in six months"
        ],
        [
          "0",
          "",
          "Repeated anecdotes"
        ],
        [
          "12",
          "k",
          "Newsletter signups attributed"
        ]
      ],
      "figs": [
        [
          "#D9A441",
          "#1D4038",
          "Green room notes before the main stage"
        ],
        [
          "#D9A441",
          "#5C420F",
          "The slide everyone photographs"
        ],
        [
          "#3E6B5E",
          "#0F2622",
          "Signing line, books gone by noon"
        ]
      ],
      "q": [
        "Most guests promote; Adrian argued. Our audience still quotes that episode a year later.",
        "Ben Castellano",
        "Host, The Long Game podcast"
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
  put('data-case-kicker', 'Case study · ' + "Brand Strategist & Speaker" + ' · ' + data.year);
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
