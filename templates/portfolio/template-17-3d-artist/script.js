/* Zara Nilsson — 3D Artist · portfolio interactions
   Template: template-17-3d-artist (variant V3, dark showcase)
   Vanilla JS only. Every selector is guarded — safe to delete sections. */

(function () {
  'use strict';
  var SITE = { slug: 'template-17-3d-artist', owner: 'Zara Nilsson' };

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
   Release 2 — case-study page + link wiring · template-17-3d-artist
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
  var OWNER = "Zara Nilsson";
  var CASES = [
    {
      "t": "“Glasswing” perfume film",
      "tags": [
        "Product viz",
        "Look dev"
      ],
      "lede": "Full-CG launch film with dispersion-accurate glass; client retired the photo shoot budget.",
      "client": "Atelier Cendre",
      "year": "2025",
      "duration": "8 weeks",
      "ov1": "A perfume house wanted its glass bottle filmed in ways physics would not allow. The Glasswing film is full CG that out-reals the product photography.",
      "ov2": "Procedural caustics, simulated silk collisions and a colour script that moves from dawn greys to amber. Sixty seconds, broadcast and in-store.",
      "ch": "Glass is the cruellest material in CG — every cheat shows. The breakthrough was scanning the real bottle’s imperfections and keeping them.",
      "met": [
        [
          "60",
          "",
          "Seconds of full-CG film"
        ],
        [
          "9",
          "",
          "Caustics simulation passes"
        ],
        [
          "2",
          "",
          "Luxury campaign awards"
        ]
      ],
      "figs": [
        [
          "#F472B6",
          "#7C1D4F",
          "Reference board and HDRI captures"
        ],
        [
          "#22D3EE",
          "#0E4A5C",
          "Greybox previz, camera test three"
        ],
        [
          "#E879F9",
          "#3B0764",
          "Shader graph for the hero material"
        ]
      ],
      "q": [
        "Clients assume it is photography with impossible budgets. The imperfections Zara kept are why it feels true.",
        "Hugo Lefèvre",
        "Creative Director, Atelier Cendre"
      ]
    },
    {
      "t": "Neon Tidepool environment pack",
      "tags": [
        "Real-time",
        "Environment"
      ],
      "lede": "30 modular underwater assets at 60fps on mid-range hardware; 4.9★ on the marketplace.",
      "client": "Nordlys Interactive",
      "year": "2024",
      "duration": "4 months",
      "ov1": "A bioluminescent tidepool environment pack for a stylised exploration game — sixty real-time assets that glow without melting the GPU.",
      "ov2": "Modular rock kits, anemone shaders driven by vertex animation, and emissives budgeted to a strict luminance map. Ships at 60fps on handheld.",
      "ch": "Stylised glow is a performance trap. Every emissive surface earned its draw call through profiling, not through art direction alone.",
      "met": [
        [
          "60",
          "",
          "Assets in the pack"
        ],
        [
          "60",
          "",
          "FPS on handheld target"
        ],
        [
          "4",
          "",
          "Biome variations included"
        ]
      ],
      "figs": [
        [
          "#22D3EE",
          "#0E4A5C",
          "Sim cache review, iteration nine"
        ],
        [
          "#E879F9",
          "#3B0764",
          "Clay render beside the final frame"
        ],
        [
          "#F472B6",
          "#155E75",
          "Engine profile after optimisation"
        ]
      ],
      "q": [
        "The tidepool zone became the game’s screenshot factory. Players camp there to take pictures — of our performance budget.",
        "Mira Solberg",
        "Art Director, Nordlys"
      ]
    },
    {
      "t": "Soft Machines art series",
      "tags": [
        "Art",
        "Look dev"
      ],
      "lede": "Twelve renders of impossible velvet robots; exhibited at two digital art festivals.",
      "client": "Personal work · gallery print series",
      "year": "2023",
      "duration": "10 months",
      "ov1": "Soft Machines is an art series asking what industrial robots dream of: pistons in velvet, hydraulics in blown glass, conveyor belts of silk.",
      "ov2": "Twelve large-format renders, each a single impossible material study, printed at one metre for a gallery run that sold every edition.",
      "ch": "Personal work without a deadline rots. The constraint — one machine, one impossible material, every month — kept the series alive and improving.",
      "met": [
        [
          "12",
          "",
          "Renders in the series"
        ],
        [
          "1",
          "m",
          "Print size, archival"
        ],
        [
          "100",
          "%",
          "Editions sold"
        ]
      ],
      "figs": [
        [
          "#E879F9",
          "#3B0764",
          "Reference board and HDRI captures"
        ],
        [
          "#F472B6",
          "#155E75",
          "Greybox previz, camera test three"
        ],
        [
          "#86EFAC",
          "#14532D",
          "Shader graph for the hero material"
        ]
      ],
      "q": [
        "Soft Machines stopped traffic in the gallery window. People touch the glass expecting velvet — every time.",
        "Ines Aalto",
        "Curator, Galleri Norr"
      ]
    },
    {
      "t": "Headphone hero renders — Aurel",
      "tags": [
        "Product viz",
        "Lighting"
      ],
      "lede": "Campaign stills with cloth, anodised metal and fingerprints in exactly the right places.",
      "client": "Aurel Audio",
      "year": "2024",
      "duration": "5 weeks",
      "ov1": "Aurel’s flagship headphones needed hero renders for launch — every material honest, every highlight art-directed, at print resolution.",
      "ov2": "Brushed aluminium, anodised dials and leather with real grain scans. Twenty hero frames plus a configurator set in all six colourways.",
      "ch": "Product viz is jewellery photography with infinite patience: the anisotropy on the earcup spin took more iterations than the rest combined.",
      "met": [
        [
          "20",
          "",
          "Hero frames delivered"
        ],
        [
          "6",
          "",
          "Colourways configured"
        ],
        [
          "8",
          "k",
          "Resolution for print masters"
        ]
      ],
      "figs": [
        [
          "#F472B6",
          "#155E75",
          "Sim cache review, iteration nine"
        ],
        [
          "#86EFAC",
          "#14532D",
          "Clay render beside the final frame"
        ],
        [
          "#A5B4FC",
          "#312E81",
          "Engine profile after optimisation"
        ]
      ],
      "q": [
        "Retail partners chose our renders over the photo shoot. The product team checks tolerances against Zara’s frames.",
        "Dieter Brandt",
        "Head of Product, Aurel"
      ]
    },
    {
      "t": "“Mossback” game creature",
      "tags": [
        "Game art",
        "Sculpt"
      ],
      "lede": "Hero creature from blockout to 38k-tri game-ready rig with four texture variants.",
      "client": "Mossback Studios",
      "year": "2023",
      "duration": "12 weeks",
      "ov1": "A game creature with a brief of two words: gentle tank. Mossback is a moss-covered megafauna sculpted, retopologised and rigged for real time.",
      "ov2": "ZBrush sculpt to 40k-tri game mesh, moss groom converted to cards, and blendshapes that let it emote without breaking the silhouette.",
      "ch": "The creature had to read as ancient at fifty metres and kind at two. The silhouette and the moss-sway sim carry both jobs.",
      "met": [
        [
          "40",
          "k",
          "Triangles in-game"
        ],
        [
          "30",
          "",
          "Emote blendshapes"
        ],
        [
          "1",
          "",
          "Players’ choice creature award"
        ]
      ],
      "figs": [
        [
          "#86EFAC",
          "#14532D",
          "Reference board and HDRI captures"
        ],
        [
          "#A5B4FC",
          "#312E81",
          "Greybox previz, camera test three"
        ],
        [
          "#F472B6",
          "#7C1D4F",
          "Shader graph for the hero material"
        ]
      ],
      "q": [
        "Mossback is on the box art now. Playtesters refuse to fight it — which was exactly the design brief.",
        "Sam Whitaker",
        "Game Director, Mossback Studios"
      ]
    },
    {
      "t": "Procedural crystal toolkit",
      "tags": [
        "Houdini",
        "Real-time"
      ],
      "lede": "Houdini HDA generating game-ready crystal clusters — used across three shipped titles.",
      "client": "Open tools · Houdini",
      "year": "2024",
      "duration": "6 months",
      "ov1": "Crystals appear in every brief and eat every deadline. The toolkit grows art-directable crystal formations procedurally — geology as a parameter.",
      "ov2": "Growth solver, fracture-aware shading and presets from quartz to impossible. Exports clean to engines; used in two shipped games already.",
      "ch": "Procedural tools fail when artists fight the parameters. Every control is named for what artists want, not what the solver does.",
      "met": [
        [
          "30",
          "+",
          "Artist-facing parameters"
        ],
        [
          "2",
          "",
          "Shipped games using it"
        ],
        [
          "900",
          "",
          "Downloads in six months"
        ]
      ],
      "figs": [
        [
          "#A5B4FC",
          "#312E81",
          "Sim cache review, iteration nine"
        ],
        [
          "#F472B6",
          "#7C1D4F",
          "Clay render beside the final frame"
        ],
        [
          "#22D3EE",
          "#0E4A5C",
          "Engine profile after optimisation"
        ]
      ],
      "q": [
        "The toolkit gives juniors senior-looking crystals in an afternoon. The parameter naming alone is a masterclass.",
        "Lena Okafor",
        "FX Supervisor, Polar Forge"
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
  put('data-case-kicker', 'Case study · ' + "3D Artist & Look Developer" + ' · ' + data.year);
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
