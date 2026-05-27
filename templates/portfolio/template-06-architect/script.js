/* Tomas Reyes — Architect · portfolio interactions
   Template: template-06-architect (variant V4, editorial resume)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-06-architect', owner: 'Tomas Reyes' };

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
   Release 2 — case-study page + link wiring · template-06-architect
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
  var OWNER = "Tomas Reyes";
  var CASES = [
    {
      "t": "Silo Cultural Hall, Valparaíso",
      "tags": [
        "Civic",
        "Reuse"
      ],
      "lede": "1920s grain silo converted to a 400-seat hall; new timber roof rides on the original concrete drum.",
      "client": "Municipalidad de Valparaíso",
      "year": "2024",
      "duration": "3 years",
      "ov1": "A decommissioned grain silo above the port, recast as a cultural hall without erasing its industrial bones. We led design from competition to opening.",
      "ov2": "The concrete bins became stacked galleries; a new timber crown holds the performance room. Eighty percent of the original structure remains in service.",
      "ch": "Heritage rules, seismic codes and a community that loved the ruin as it was — every move had to satisfy all three without splitting the difference.",
      "met": [
        [
          "80",
          "%",
          "Original structure retained"
        ],
        [
          "1200",
          "",
          "Seat performance hall"
        ],
        [
          "3",
          "",
          "Years from competition to opening"
        ]
      ],
      "figs": [
        [
          "#B9B9AE",
          "#52524A",
          "Site survey sketchbook, first week"
        ],
        [
          "#CFCFC2",
          "#6E6E62",
          "Card massing studies on the bench"
        ],
        [
          "#A8A89B",
          "#3B3B33",
          "1:20 section through the key junction"
        ]
      ],
      "q": [
        "Tomas convinced us the silo could stay itself and still become ours. The hall feels inevitable now — the highest compliment.",
        "Carmen Olivares",
        "Cultural Director, Valparaíso"
      ]
    },
    {
      "t": "Casa Ladera",
      "tags": [
        "Residential",
        "New build"
      ],
      "lede": "Hillside house in three stepped volumes; cross-ventilation replaces air conditioning entirely.",
      "client": "Private client",
      "year": "2023",
      "duration": "20 months",
      "ov1": "A family house on a forty-degree coastal slope the previous architects declared unbuildable without a fortress wall. We disagreed politely.",
      "ov2": "Casa Ladera steps down the hill in three terraces, each room half a level from the next, with the roof of one becoming the garden of the other.",
      "ch": "The slope was the client’s budget and the design’s engine: cut-and-fill had to balance on site, because every truckload off the hill cost a window.",
      "met": [
        [
          "40",
          "°",
          "Slope gradient managed"
        ],
        [
          "3",
          "",
          "Stepped terraces"
        ],
        [
          "0",
          "",
          "Soil trucked off site"
        ]
      ],
      "figs": [
        [
          "#CFCFC2",
          "#6E6E62",
          "Material samples board as approved"
        ],
        [
          "#A8A89B",
          "#3B3B33",
          "Site visit photograph, structure topped out"
        ],
        [
          "#C4C4B4",
          "#5C5C50",
          "Opening day, southern courtyard"
        ]
      ],
      "q": [
        "We live diagonally now — every room owns a different horizon. Guests refuse to leave the middle terrace.",
        "Valentina Reyes-Morales",
        "Client, Casa Ladera"
      ]
    },
    {
      "t": "Mercado Norte renewal",
      "tags": [
        "Civic",
        "Heritage"
      ],
      "lede": "Market hall restoration: 60 stalls kept trading through four phases of construction.",
      "client": "Ciudad de Antofagasta",
      "year": "2025",
      "duration": "2 years",
      "ov1": "A 1920s market hall, half-empty and leaking, that the city wanted demolished and the stallholders wanted saved. The renewal kept both honest.",
      "ov2": "We repaired the timber roof with visible new members, reorganised stalls around three light wells, and added a mezzanine of kitchens for the next generation.",
      "ch": "The market never closed. Construction was choreographed in fortnight phases so that no stallholder lost more than ten trading days across two years.",
      "met": [
        [
          "92",
          "",
          "Stalls retained through works"
        ],
        [
          "10",
          "",
          "Max trading days lost per stall"
        ],
        [
          "60",
          "%",
          "Footfall increase post-opening"
        ]
      ],
      "figs": [
        [
          "#A8A89B",
          "#3B3B33",
          "Site survey sketchbook, first week"
        ],
        [
          "#C4C4B4",
          "#5C5C50",
          "Card massing studies on the bench"
        ],
        [
          "#D6D6C8",
          "#7A7A6C",
          "1:20 section through the key junction"
        ]
      ],
      "q": [
        "They rebuilt the market around our crates and customers. My fish counter never missed a Friday.",
        "Jorge Maldonado",
        "Stallholders’ Association Chair, Mercado Norte"
      ]
    },
    {
      "t": "Patio School extension",
      "tags": [
        "Civic",
        "Timber"
      ],
      "lede": "CLT classroom wing wrapped around two existing courtyards; built in one school summer.",
      "client": "Escuela Patio Verde",
      "year": "2022",
      "duration": "14 months",
      "ov1": "A primary school needed four classrooms and had a car park’s worth of land. The extension is a timber court that teaches as much as it shelters.",
      "ov2": "Cross-laminated timber, left exposed and labelled — children trace the loads with their hands. The court roof harvests winter sun and summer shade.",
      "ch": "School budgets forgive nothing. Prefabrication meant the structure went up in the winter holidays — children left for break and returned to a building.",
      "met": [
        [
          "4",
          "",
          "Classrooms added"
        ],
        [
          "6",
          "",
          "Weeks of on-site assembly"
        ],
        [
          "35",
          "%",
          "Below regional cost benchmark"
        ]
      ],
      "figs": [
        [
          "#C4C4B4",
          "#5C5C50",
          "Material samples board as approved"
        ],
        [
          "#D6D6C8",
          "#7A7A6C",
          "Site visit photograph, structure topped out"
        ],
        [
          "#B0B0A2",
          "#42423A",
          "Opening day, southern courtyard"
        ]
      ],
      "q": [
        "The building is our most patient teacher. The timber frame is the first thing the children draw when asked about school.",
        "Daniela Fuentes",
        "Headteacher, Patio School"
      ]
    },
    {
      "t": "Twin Courtyard Houses",
      "tags": [
        "Residential",
        "Reuse"
      ],
      "lede": "A divided 1940s villa rebuilt as two homes sharing a garden wall and a rainwater cistern.",
      "client": "Private clients (two families)",
      "year": "2021",
      "duration": "22 months",
      "ov1": "Two sisters, one inherited lot, and a brief to live close but not together. Twin houses share a wall, a cistern and a lemon court — nothing else.",
      "ov2": "Each house reuses brick from the demolished parental home; the shared wall is a metre of thermal mass and diplomacy that keeps both households genial.",
      "ch": "Reused brick fails tests on paper. We graded and re-fired three thousand bricks with a local yard to get the structural sign-off the design needed.",
      "met": [
        [
          "2",
          "",
          "Houses, one shared wall"
        ],
        [
          "3000",
          "",
          "Bricks reclaimed and re-fired"
        ],
        [
          "45",
          "%",
          "Embodied carbon saved"
        ]
      ],
      "figs": [
        [
          "#D6D6C8",
          "#7A7A6C",
          "Site survey sketchbook, first week"
        ],
        [
          "#B0B0A2",
          "#42423A",
          "Card massing studies on the bench"
        ],
        [
          "#B9B9AE",
          "#52524A",
          "1:20 section through the key junction"
        ]
      ],
      "q": [
        "We wanted closeness with a hinge in it. The courtyard hears both kitchens and belongs to neither — exactly right.",
        "Paula & Andrea Vidal",
        "Clients, Twin Courtyard Houses"
      ]
    },
    {
      "t": "Riverfront masterplan study",
      "tags": [
        "Masterplan",
        "Research"
      ],
      "lede": "Flood-tolerant public edge for 2km of riverbank; commissioned study now in municipal review.",
      "client": "Gobierno Regional",
      "year": "2025",
      "duration": "9 months",
      "ov1": "A research commission: what should two kilometres of fenced riverfront become when the freight rail finally moves? We mapped the possible.",
      "ov2": "The study proposes a flood-tolerant park armature with development held back from the water — drawings, hydrology models and a phasing book the region can fund in stages.",
      "ch": "Masterplans die as posters. Ours is written as a sequence of fundable five-year moves, each useful even if the next never happens.",
      "met": [
        [
          "2",
          "km",
          "Riverfront studied"
        ],
        [
          "5",
          "",
          "Fundable phases defined"
        ],
        [
          "14",
          "",
          "Public workshops held"
        ]
      ],
      "figs": [
        [
          "#B0B0A2",
          "#42423A",
          "Material samples board as approved"
        ],
        [
          "#B9B9AE",
          "#52524A",
          "Site visit photograph, structure topped out"
        ],
        [
          "#CFCFC2",
          "#6E6E62",
          "Opening day, southern courtyard"
        ]
      ],
      "q": [
        "The first study in a decade that treats the river as a budget line, not a watercolour. Phase one is already funded.",
        "Ignacio Herrera",
        "Regional Planning Director"
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
  put('data-case-kicker', 'Case study · ' + "Principal Architect" + ' · ' + data.year);
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
