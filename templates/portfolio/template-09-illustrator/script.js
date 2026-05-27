/* Hana Sato — Illustrator · portfolio interactions
   Template: template-09-illustrator (variant V4, editorial resume)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-09-illustrator', owner: 'Hana Sato' };

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
   Release 2 — case-study page + link wiring · template-09-illustrator
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
  var OWNER = "Hana Sato";
  var CASES = [
    {
      "t": "“The Umbrella Office” picture book",
      "tags": [
        "Books",
        "Character"
      ],
      "lede": "40-page picture book about a lost-and-found for weather; rights sold in three languages.",
      "client": "Tonbo Books",
      "year": "2024",
      "duration": "9 months",
      "ov1": "A picture book about an office where everyone repairs umbrellas and nobody asks why it rains indoors. I wrote and illustrated all 32 pages.",
      "ov2": "Forty character studies became a cast of seven; the palette is rain-grey with one stubborn yellow. The book is in its third printing.",
      "ch": "Picture books are sequenced like films: every page-turn is a cut. The hardest spread took eleven full redraws to earn its silence.",
      "met": [
        [
          "32",
          "",
          "Pages illustrated"
        ],
        [
          "3",
          "",
          "Printings to date"
        ],
        [
          "2",
          "",
          "Children’s book award shortlists"
        ]
      ],
      "figs": [
        [
          "#F6C9D4",
          "#E76F8E",
          "Sketchbook page from the research walk"
        ],
        [
          "#FDE9A8",
          "#E8B33C",
          "Thumbnail sheet, all forty stagings"
        ],
        [
          "#BFE0F2",
          "#7FB5D5",
          "Line drawing on the light table"
        ]
      ],
      "q": [
        "The Umbrella Office is the book children pull off our shelf themselves. The yellow umbrella page is held together with tape — the best review.",
        "Aiko Tanabe",
        "Editor, Tonbo Books"
      ]
    },
    {
      "t": "Yuzu soda can series",
      "tags": [
        "Packaging",
        "Pattern"
      ],
      "lede": "Four seasonal cans with wraparound fruit-market scenes; the summer can sold out twice.",
      "client": "Yuzu Soda Co.",
      "year": "2025",
      "duration": "8 weeks",
      "ov1": "A citrus soda launching in four flavours wanted cans that feel like a station kiosk in July. I illustrated the full series.",
      "ov2": "Each flavour is a tiny landscape wrapped around the can — the yuzu grove, the sea wall, the festival night — connecting into one panorama when shelved.",
      "ch": "A can is seen for half a second from a metre away. Every illustration had to read at shelf distance and reward the close look at the desk.",
      "met": [
        [
          "4",
          "",
          "Can designs in the series"
        ],
        [
          "1",
          "",
          "Connecting shelf panorama"
        ],
        [
          "200",
          "k",
          "Cans in the first run"
        ]
      ],
      "figs": [
        [
          "#FDE9A8",
          "#E8B33C",
          "Colour separations for the riso drum"
        ],
        [
          "#BFE0F2",
          "#7FB5D5",
          "Press check proof with notes"
        ],
        [
          "#CDE8D2",
          "#74AD84",
          "Printed piece, first copy off the press"
        ]
      ],
      "q": [
        "Shops display the cans in panorama order without being asked. The shelf does our advertising now.",
        "Kenta Mori",
        "Founder, Yuzu Soda Co."
      ]
    },
    {
      "t": "Weekend Almanac column art",
      "tags": [
        "Editorial",
        "Spot art"
      ],
      "lede": "Weekly spot illustrations for a Sunday culture column — 104 drawings and counting.",
      "client": "Weekend Almanac",
      "year": "2023",
      "duration": "Ongoing",
      "ov1": "A weekly column about small city pleasures needs one spot illustration every Thursday. I have drawn it for three years and counting.",
      "ov2": "A hundred and fifty spots so far: the last train home, a shared bench, the bakery queue. One image, one colour plus black, every single week.",
      "ch": "The constraint is the craft: same column width, new idea, every week, no repeats. The archive is the portfolio I never planned.",
      "met": [
        [
          "150",
          "+",
          "Spot illustrations published"
        ],
        [
          "3",
          "",
          "Years without missing a week"
        ],
        [
          "1",
          "",
          "Collected zine of reader favourites"
        ]
      ],
      "figs": [
        [
          "#BFE0F2",
          "#7FB5D5",
          "Sketchbook page from the research walk"
        ],
        [
          "#CDE8D2",
          "#74AD84",
          "Thumbnail sheet, all forty stagings"
        ],
        [
          "#F8D8C0",
          "#D98A56",
          "Line drawing on the light table"
        ]
      ],
      "q": [
        "Readers tell us they check the illustration before the headline. Hana’s spots are the column’s second byline.",
        "Naomi Fujii",
        "Editor, Weekend Almanac"
      ]
    },
    {
      "t": "Hometown Station mural",
      "tags": [
        "Mural",
        "Community"
      ],
      "lede": "28-meter station mural of neighborhood life, painted with twelve very patient volunteers.",
      "client": "Hometown Station Committee",
      "year": "2022",
      "duration": "4 months",
      "ov1": "My hometown station got a forty-metre underpass wall and a grant. The mural shows the town’s day from first train to last, at walking pace.",
      "ov2": "Painted with six local volunteers over a summer — commuters appear in it, the noodle shop owner appears in it, and the 6:12 express appears twice.",
      "ch": "A mural is read at three speeds: running for a train, strolling, and standing still. The composition had to work at all three.",
      "met": [
        [
          "40",
          "m",
          "Mural length"
        ],
        [
          "6",
          "",
          "Volunteer painters trained"
        ],
        [
          "1",
          "",
          "Town festival held at the wall"
        ]
      ],
      "figs": [
        [
          "#CDE8D2",
          "#74AD84",
          "Colour separations for the riso drum"
        ],
        [
          "#F8D8C0",
          "#D98A56",
          "Press check proof with notes"
        ],
        [
          "#E9D5F4",
          "#A878C8",
          "Printed piece, first copy off the press"
        ]
      ],
      "q": [
        "The underpass went from the place you hurry through to the place you show visitors. The station feels owned now.",
        "Hiroshi Yamada",
        "Station Committee Chair"
      ]
    },
    {
      "t": "Tea house brand characters",
      "tags": [
        "Character",
        "Packaging"
      ],
      "lede": "A family of round tea spirits for a Kyoto tea house — cups, bags, and one mascot costume.",
      "client": "Kumo Tea House",
      "year": "2024",
      "duration": "10 weeks",
      "ov1": "A family tea house expanding to retail needed characters for its blends — not mascots, but small spirits with manners. I drew the set of eight.",
      "ov2": "Each character embodies its blend’s temperament: the roasted hojicha bear naps, the first-flush sencha crane will not sit down. Packaging, stamps and a loyalty card followed.",
      "ch": "The family vetoed anything cute-for-cute’s-sake. Every character had to survive the grandmother’s question: \"but is it true of the tea?\"",
      "met": [
        [
          "8",
          "",
          "Blend characters created"
        ],
        [
          "30",
          "%",
          "Retail sales lift, first quarter"
        ],
        [
          "3",
          "",
          "Generations who approved them"
        ]
      ],
      "figs": [
        [
          "#F8D8C0",
          "#D98A56",
          "Sketchbook page from the research walk"
        ],
        [
          "#E9D5F4",
          "#A878C8",
          "Thumbnail sheet, all forty stagings"
        ],
        [
          "#F6C9D4",
          "#E76F8E",
          "Line drawing on the light table"
        ]
      ],
      "q": [
        "The hojicha bear is now on our family altar at New Year. Hana drew our teas more honestly than we describe them.",
        "Sachiko Kumo",
        "Owner, Kumo Tea House"
      ]
    },
    {
      "t": "“Paper Seasons” riso zine",
      "tags": [
        "Print",
        "Pattern"
      ],
      "lede": "Self-published two-color risograph zine of seasonal patterns; 500 copies, gone in a month.",
      "client": "Self-published",
      "year": "2023",
      "duration": "5 months",
      "ov1": "Paper Seasons is a risograph zine of pattern work — four chapters, one per season, printed in three inks on paper that suits each.",
      "ov2": "The patterns come from walks: plum rain puddles, persimmon nets, first-frost windows. 600 copies, folded and stapled at my kitchen table.",
      "ch": "Riso misregistration is the medium’s handwriting. Designing patterns that welcome the slip — instead of fighting it — was the whole education.",
      "met": [
        [
          "600",
          "",
          "Copies hand-finished"
        ],
        [
          "3",
          "",
          "Riso inks per season"
        ],
        [
          "2",
          "",
          "Art-book fairs sold out"
        ]
      ],
      "figs": [
        [
          "#E9D5F4",
          "#A878C8",
          "Colour separations for the riso drum"
        ],
        [
          "#F6C9D4",
          "#E76F8E",
          "Press check proof with notes"
        ],
        [
          "#FDE9A8",
          "#E8B33C",
          "Printed piece, first copy off the press"
        ]
      ],
      "q": [
        "Paper Seasons is our shop’s most re-ordered zine. Customers buy the spring chapter and return for winter.",
        "Marie Dubois",
        "Buyer, Papeterie Nuage"
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
  put('data-case-kicker', 'Case study · ' + "Illustrator" + ' · ' + data.year);
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
