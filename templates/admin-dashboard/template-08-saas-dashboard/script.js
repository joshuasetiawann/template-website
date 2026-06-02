/* Orbitly — saas dashboard interactions (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var doc = document;
  var body = doc.body;
  var redraws = [];
  function qs(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }
  function el(tag, cls) { var n = doc.createElement(tag); if (cls) n.className = cls; return n; }

  /* ----- Off-canvas sidebar (mobile) ----- */
  var sidebar = qs('#sidebar');
  var overlay = qs('#overlay');
  var navToggle = qs('#navToggle');
  function setSidebar(open) {
    body.classList.toggle('sidebar-open', open);
    if (navToggle) navToggle.setAttribute('aria-expanded', String(open));
  }
  if (navToggle && sidebar) {
    navToggle.addEventListener('click', function () {
      setSidebar(!body.classList.contains('sidebar-open'));
    });
  }
  if (overlay) overlay.addEventListener('click', function () { setSidebar(false); });

  /* ----- Dropdown menus (notifications / profile) ----- */
  var menuBtns = qsa('[data-menu-toggle]');
  function closeMenus(except) {
    menuBtns.forEach(function (btn) {
      if (btn === except) return;
      var panel = doc.getElementById(btn.getAttribute('aria-controls') || '');
      if (panel) panel.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  }
  menuBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var panel = doc.getElementById(btn.getAttribute('aria-controls') || '');
      if (!panel) return;
      var willOpen = !panel.classList.contains('open');
      closeMenus(btn);
      panel.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
    });
  });
  doc.addEventListener('click', function (e) {
    if (!(e.target.closest && e.target.closest('.dropdown'))) closeMenus(null);
  });
  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeMenus(null); setSidebar(false); }
  });

  /* ----- Theme toggle ----- */
  var themeBtn = qs('#themeToggle');
  if (themeBtn) {
    var rootEl = doc.documentElement;
    var THEME_KEY = 'template-08-saas-dashboard-theme';
    try {
      if (localStorage.getItem(THEME_KEY) === '1') rootEl.classList.add('theme-light');
    } catch (err) { /* storage unavailable */ }
    themeBtn.setAttribute('aria-pressed', String(rootEl.classList.contains('theme-light')));
    themeBtn.addEventListener('click', function () {
      var on = rootEl.classList.toggle('theme-light');
      themeBtn.setAttribute('aria-pressed', String(on));
      try { localStorage.setItem(THEME_KEY, on ? '1' : '0'); } catch (err) { /* ignore */ }
    });
  }

  /* ----- Animated stat counters ----- */
  function fmtNum(n, dec) {
    return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  qsa('[data-count]').forEach(function (node) {
    var target = parseFloat(node.getAttribute('data-count'));
    if (isNaN(target)) return;
    var dec = parseInt(node.getAttribute('data-dec') || '0', 10);
    var prefix = node.getAttribute('data-prefix') || '';
    var suffix = node.getAttribute('data-suffix') || '';
    var start = null;
    var DUR = 950;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / DUR, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      node.textContent = prefix + fmtNum(target * eased, dec) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  /* ----- Animated bar chart ----- */
  function renderBars(holderId, data, opts) {
    var holder = doc.getElementById(holderId);
    if (!holder) return;
    opts = opts || {};
    var max = opts.max || 0;
    if (!max) {
      data.forEach(function (d) {
        (d.values || [d.value]).forEach(function (v) { if (v > max) max = v; });
      });
    }
    holder.innerHTML = '';
    var bars = [];
    data.forEach(function (d) {
      var col = el('div', 'bar-col');
      var stack = el('div', 'bar-stack');
      (d.values || [d.value]).forEach(function (v, i) {
        var bar = el('div', 'bar' + (i > 0 ? ' b2' : ''));
        if (opts.tips !== false && i === 0) {
          var tip = el('span', 'tip');
          tip.textContent = (opts.prefix || '') + v + (opts.suffix || '');
          bar.appendChild(tip);
        }
        bar.setAttribute('data-h', String(Math.round(v / max * 100)));
        bar.setAttribute('data-lb', d.label);
        bar.setAttribute('data-val', (opts.prefix || '') + v + (opts.suffix || ''));
        stack.appendChild(bar);
        bars.push(bar);
      });
      var lbl = el('span', 'bar-label');
      lbl.textContent = d.label;
      col.appendChild(stack);
      col.appendChild(lbl);
      holder.appendChild(col);
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        bars.forEach(function (b) {
          b.style.height = b.getAttribute('data-h') + '%';
          b.classList.add('grown');
        });
      });
    });
  }

  /* ----- Conic-gradient donut sweep ----- */
  function renderDonut(elId, segments, opts) {
    var node = doc.getElementById(elId);
    if (!node) return;
    opts = opts || {};
    var total = 0;
    segments.forEach(function (s) { total += s.value; });
    if (!total) return;
    var start = null;
    var DUR = opts.dur || 1050;
    function paint(p) {
      var acc = 0;
      var stops = [];
      segments.forEach(function (s) {
        var a0 = acc / total * 360 * p;
        acc += s.value;
        var a1 = acc / total * 360 * p;
        stops.push(s.color + ' ' + a0.toFixed(2) + 'deg ' + a1.toFixed(2) + 'deg');
      });
      stops.push('var(--surface-2) ' + (360 * p).toFixed(2) + 'deg 360deg');
      node.style.background = 'conic-gradient(' + stops.join(', ') + ')';
    }
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / DUR, 1);
      paint(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ----- Goal gauge sweep ----- */
  function renderGauge(holderId, frac, display) {
    var path = doc.getElementById(holderId + '-path');
    if (!path) return;
    var len = path.getTotalLength();
    path.style.strokeDasharray = len + ' ' + len;
    path.style.strokeDashoffset = String(len);
    var numEl = doc.getElementById(holderId + '-num');
    var start = null;
    var DUR = 1100;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / DUR, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      path.style.strokeDashoffset = String(len * (1 - frac * eased));
      if (numEl && display) numEl.textContent = display(eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ----- Chart data (Orbitly sample dataset) ----- */
  var MRR = [{"label": "Nov", "values": [14.2, 4.1]}, {"label": "Dec", "values": [12.8, 5.2]}, {"label": "Jan", "values": [16.4, 3.8]}, {"label": "Feb", "values": [15.1, 4.6]}, {"label": "Mar", "values": [18.2, 3.2]}, {"label": "Apr", "values": [17.6, 4.0]}, {"label": "May", "values": [19.8, 2.9]}, {"label": "Jun", "values": [21.4, 2.4]}];
  renderBars('mrrBars', MRR, {"prefix": "$", "suffix": "k"});
  var PLANS = [{"label": "Scale", "value": 54.2, "color": "#8B5CF6"}, {"label": "Growth", "value": 38.9, "color": "#C4B5FD"}, {"label": "Starter", "value": 22.4, "color": "#34D08C"}, {"label": "Legacy", "value": 12.9, "color": "#5BA0F2"}];
  renderDonut('planDonut', PLANS);
  renderGauge('arrGauge', 0.78, function (p) { return Math.round(78 * p) + '%'; });


  /* ----- Orbitly release upgrades: year, shimmer, reveal, pagination, export, tooltips ----- */
  /* ----- Reports view charts (rendered lazily on first show) ----- */
  window.__renderReports = function () {
    renderDonut('repChartA', [{"label": "Enterprise", "value": 64, "color": "var(--accent)"}, {"label": "Business", "value": 24, "color": "var(--accent-2)"}, {"label": "Pro", "value": 12, "color": "#F472B6"}]);
    renderBars('repChartB', [{"label": "Jan", "value": 44}, {"label": "Feb", "value": 47}, {"label": "Mar", "value": 49}, {"label": "Apr", "value": 52}, {"label": "May", "value": 54}, {"label": "Jun", "value": 57}], {"prefix": "$", "suffix": "k"});
    if (typeof redraws !== "undefined" && redraws.push) {
      redraws.push(function () { if (window.__reportsShown) window.__renderReports(); });
    }
    window.__reportsShown = true;
  };


  /* ----- List view search (filters rows; pagination re-pages filtered set) ----- */
  (function () {
    var input = qs('[data-list-search]');
    var table = doc.getElementById('listTable');
    var foot = qs('[data-pagination][data-table="listTable"]');
    var empty = qs('[data-list-empty]');
    if (!input || !table) return;
    var tbody = qs('tbody', table);
    var rows = tbody ? qsa('tr', tbody) : [];
    input.addEventListener('input', function () {
      var q = (input.value || '').toLowerCase().replace(/^\s+|\s+$/g, '');
      var shown = 0;
      rows.forEach(function (r) {
        var hit = !q || (r.textContent || '').toLowerCase().indexOf(q) !== -1;
        r.setAttribute('data-filtered', hit ? '0' : '1');
        if (hit) shown += 1;
      });
      if (empty) { if (shown === 0) empty.removeAttribute('hidden'); else empty.setAttribute('hidden', ''); }
      if (foot && foot._repage) foot._repage();
    });
  }());

  /* ----- Generic segmented preference controls (visual only) ----- */
  qsa('[data-pref-seg]').forEach(function (b) {
    b.addEventListener('click', function () {
      var grp = b.parentNode;
      if (!grp) return;
      Array.prototype.slice.call(grp.querySelectorAll('[data-pref-seg]')).forEach(function (x) {
        x.setAttribute('aria-pressed', String(x === b));
      });
    });
  });

  /* ----- Settings appearance theme control (syncs with header toggle) ----- */
  (function () {
    var seg = qs('[data-theme-seg]');
    var root = doc.documentElement;
    var headBtn = qs('#themeToggle');
    var KEY = 'template-08-saas-dashboard-theme';
    var CLS = 'theme-light';        /* class the header toggle flips */
    var ON_MODE = 'light';    /* mode that class represents */
    function classOn() { return root.classList.contains(CLS); }
    function syncSeg() {
      if (!seg) return;
      var mode = classOn() ? ON_MODE : (ON_MODE === 'dark' ? 'light' : 'dark');
      qsa('button', seg).forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-set') === mode));
      });
    }
    function apply(mode) {
      var on = (mode === ON_MODE);
      root.classList.toggle(CLS, on);
      try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) { /* ignore */ }
      if (headBtn) headBtn.setAttribute('aria-pressed', String(on));
      syncSeg();
    }
    if (seg) {
      qsa('button', seg).forEach(function (b) {
        b.addEventListener('click', function () { apply(b.getAttribute('data-theme-set')); });
      });
    }
    if (headBtn) headBtn.addEventListener('click', function () { setTimeout(syncSeg, 0); });
    syncSeg();
  }());
  var motionOK = true;
  try { motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (err) { motionOK = true; }

  qsa('[data-year]').forEach(function (n) { n.textContent = String(new Date().getFullYear()); });

  /* skeleton shimmer that resolves into the count-up / chart draw */
  (function () {
    if (!motionOK) return;
    var skels = qsa('.stat-card');
    var holder = qs('#mrrBars');
    if (holder) skels.push(holder);
    if (!skels.length) return;
    skels.forEach(function (n) { n.classList.add('skel'); });
    setTimeout(function () {
      skels.forEach(function (n) { n.classList.add('skel-fade'); });
      setTimeout(function () {
        skels.forEach(function (n) { n.classList.remove('skel'); n.classList.remove('skel-fade'); });
      }, 260);
    }, 380);
  }());

  /* scroll-reveal (JS-applied class so content stays visible without JS) */
  (function () {
    if (!motionOK || !('IntersectionObserver' in window)) return;
    var targets = qsa('main .card');
    if (!targets.length) return;
    body.classList.add('js-reveal');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -4% 0px' });
    targets.forEach(function (n, i) {
      n.classList.add('rv');
      n.style.transitionDelay = (i % 4) * 55 + 'ms';
      io.observe(n);
    });
    setTimeout(function () {
      targets.forEach(function (n) { n.style.transitionDelay = ''; });
    }, 1800);
  }());

  /* client-side table pagination (per [data-pagination] block, multi-view safe) */
  qsa('[data-pagination]').forEach(function (foot) {
    var tid = foot.getAttribute('data-table');
    var table = tid ? doc.getElementById(tid) : qs('#dataTable');
    if (!foot || !table) return;
    var size = parseInt(foot.getAttribute('data-page-size') || '5', 10);
    var noun = foot.getAttribute('data-noun') || 'rows';
    var info = qs('[data-page-info]', foot);
    var prev = qs('[data-page-prev]', foot);
    var next = qs('[data-page-next]', foot);
    var nums = qs('[data-page-nums]', foot);
    var page = 1;
    function activeBody() {
      var bodies = qsa('tbody', table);
      for (var i = 0; i < bodies.length; i += 1) {
        if (!bodies[i].hidden) return bodies[i];
      }
      return bodies[0] || null;
    }
    function visRows() {
      var tb = activeBody();
      if (!tb) return [];
      return qsa('tr', tb).filter(function (r) { return r.getAttribute('data-filtered') !== '1'; });
    }
    function render() {
      var rows = visRows();
      var total = rows.length;
      var pages = Math.max(1, Math.ceil(total / size));
      if (page > pages) page = pages;
      if (page < 1) page = 1;
      var from = (page - 1) * size;
      var to = Math.min(from + size, total);
      var vis = 0;
      rows.forEach(function (r, i) {
        if (i >= from && i < to) {
          r.removeAttribute('hidden');
          vis += 1;
          r.classList.toggle('alt-row', vis % 2 === 0);
        } else {
          r.setAttribute('hidden', '');
          r.classList.remove('alt-row');
        }
      });
      if (info) info.textContent = 'Showing ' + (total ? from + 1 : 0) + '–' + to + ' of ' + total + ' ' + noun;
      if (prev) prev.disabled = page <= 1;
      if (next) next.disabled = page >= pages;
      if (nums) {
        nums.innerHTML = '';
        for (var p = 1; p <= pages; p += 1) {
          (function (pp) {
            var b = doc.createElement('button');
            b.type = 'button';
            b.textContent = String(pp);
            b.setAttribute('aria-label', 'Page ' + pp);
            if (pp === page) {
              b.className = 'on';
              b.setAttribute('aria-current', 'page');
            }
            b.addEventListener('click', function () { page = pp; render(); });
            nums.appendChild(b);
          }(p));
        }
      }
    }
    if (prev) prev.addEventListener('click', function () { page -= 1; render(); });
    if (next) next.addEventListener('click', function () { page += 1; render(); });
    qsa('.tab-btn').forEach(function (b) {
      b.addEventListener('click', function () { page = 1; render(); });
    });
    foot._repage = function () { page = 1; render(); };
    render();
  });

  /* CSV export from the table DOM (all rows, every page; per-view scoped) */
  (function () {
    function cellText(node) {
      var out = '';
      function walk(n) {
        var i;
        if (n.nodeType === 3) { out += n.nodeValue; return; }
        if (n.nodeType !== 1) return;
        if (n.getAttribute && n.getAttribute('aria-hidden') === 'true') return;
        for (i = 0; i < n.childNodes.length; i += 1) walk(n.childNodes[i]);
        out += ' ';
      }
      walk(node);
      return out.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
    }
    function esc(c) {
      return '"' + cellText(c).replace(/"/g, '""') + '"';
    }
    function tableFor(btn) {
      var tid = btn.getAttribute('data-table');
      if (tid) { var byId = doc.getElementById(tid); if (byId) return byId; }
      var panel = btn.closest ? btn.closest('[data-view-panel]') : null;
      var t = panel ? qs('table', panel) : null;
      return t || qs('#dataTable');
    }
    qsa('[data-export]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var table = tableFor(btn);
        if (!table) return;
        var skip = [];
        qsa('thead th', table).forEach(function (th, i) {
          if (/^actions?$/i.test((th.textContent || '').replace(/^\s+|\s+$/g, ''))) skip.push(i);
        });
        var lines = [];
        qsa('tr', table).forEach(function (tr) {
          var out = [];
          qsa('th, td', tr).forEach(function (c, i) {
            if (skip.indexOf(i) !== -1) return;
            if (c.querySelector && c.querySelector('.row-actions')) return;
            out.push(esc(c));
          });
          if (out.length) lines.push(out.join(','));
        });
        var blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
        var url = URL.createObjectURL(blob);
        var a = doc.createElement('a');
        a.href = url;
        a.download = btn.getAttribute('data-export') || 'export.csv';
        body.appendChild(a);
        a.click();
        body.removeChild(a);
        setTimeout(function () { URL.revokeObjectURL(url); }, 600);
      });
    });
  }());

  /* custom chart tooltip */
  var tipNode = el('div', 'chart-tip');
  tipNode.setAttribute('aria-hidden', 'true');
  body.appendChild(tipNode);
  function tipMove(x, y) {
    var w = tipNode.offsetWidth || 90;
    var h = tipNode.offsetHeight || 44;
    var vw = window.innerWidth || 1280;
    var nx = x + 14;
    if (nx + w > vw - 8) nx = x - w - 14;
    if (nx < 8) nx = 8;
    var ny = y - h - 12;
    if (ny < 8) ny = y + 18;
    tipNode.style.left = nx + 'px';
    tipNode.style.top = ny + 'px';
  }
  function tipShow(label, value, x, y) {
    tipNode.innerHTML = '';
    var l = el('span', 'ct-l');
    l.textContent = label;
    var v = el('span', 'ct-v');
    v.textContent = value;
    tipNode.appendChild(l);
    tipNode.appendChild(v);
    tipNode.classList.add('show');
    tipMove(x, y);
  }
  function tipHide() { tipNode.classList.remove('show'); }
  var TIP_SEL = '.bar[data-lb], .pt[data-lb], .combo-bar, .hbar-row';
  doc.addEventListener('mousemove', function (e) {
    if (tipNode.classList.contains('show')) tipMove(e.clientX, e.clientY);
  });
  doc.addEventListener('mouseover', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var n = t.closest(TIP_SEL);
    if (!n) return;
    if (n.className && String(n.className).indexOf('combo-bar') !== -1) {
      var ti = n.getAttribute('title');
      if (ti) { n.setAttribute('data-tip', ti); n.removeAttribute('title'); }
      var dt = n.getAttribute('data-tip') || '';
      var ix = dt.indexOf(':');
      tipShow(ix > 0 ? dt.slice(0, ix) : '', ix > 0 ? dt.slice(ix + 1).replace(/^\s+/, '') : dt, e.clientX, e.clientY);
    } else if (n.className && String(n.className).indexOf('hbar-row') !== -1) {
      var lb = qs('.lbl', n);
      var vv = qs('.val', n);
      tipShow(lb ? lb.textContent : '', vv ? vv.textContent : '', e.clientX, e.clientY);
    } else {
      tipShow(n.getAttribute('data-lb') || '', n.getAttribute('data-val') || '', e.clientX, e.clientY);
    }
  });
  doc.addEventListener('mouseout', function (e) {
    if (e.target && e.target.closest && e.target.closest(TIP_SEL)) tipHide();
  });
  function attachDonutTip(node, getSegs, fmt) {
    if (!node) return;
    node.addEventListener('mousemove', function (e) {
      var r = node.getBoundingClientRect();
      var cx = r.left + r.width / 2;
      var cy = r.top + r.height / 2;
      var dx = e.clientX - cx;
      var dy = e.clientY - cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var rad = r.width / 2;
      if (dist < rad * 0.34 || dist > rad * 1.04) { tipHide(); return; }
      var ang = Math.atan2(dx, -dy) * 180 / Math.PI;
      if (ang < 0) ang += 360;
      var segs = getSegs() || [];
      var total = 0;
      segs.forEach(function (s) { total += s.value; });
      if (!total) return;
      var acc = 0;
      for (var i = 0; i < segs.length; i += 1) {
        acc += segs[i].value / total * 360;
        if (ang <= acc) { tipShow(segs[i].label, fmt(segs[i]), e.clientX, e.clientY); return; }
      }
      tipHide();
    });
    node.addEventListener('mouseleave', function () { tipHide(); });
  }
  attachDonutTip(qs('#planDonut'), function () { return PLANS; }, function (s) { return '$' + s.value + 'k MRR'; });


  /* date-range chips */
  qsa('[data-rangegroup]').forEach(function (grp) {
    qsa('[data-rng]', grp).forEach(function (b) {
      b.addEventListener('click', function () {
        qsa('[data-rng]', grp).forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        applyRange(b.getAttribute('data-rng') || 'a');
      });
    });
  });

  function applyRange(k) {
    renderBars('mrrBars', k === 'b' ? MRR.slice(4) : MRR, {"prefix": "$", "suffix": "k"});
  }


  /* ----- Reveal animations + responsive redraw ----- */
  requestAnimationFrame(function () { body.classList.add('ready'); });
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      redraws.forEach(function (fn) { fn(); });
    }, 170);
  });
})();

/* demo-link-guard: dead "#" links do not jump */
document.addEventListener("click",function(e){var t=e.target.closest?e.target.closest('a[href="#"]'):null;if(t){e.preventDefault();}});


/* ============================================================
   In-page view router (Overview / List / Reports / Settings)
   Hash-driven, file://-safe, no dependencies, null-safe.
   ============================================================ */
(function () {
  'use strict';
  var doc = document;
  var body = doc.body;
  function qs(s, c) { return (c || doc).querySelector(s); }
  function qsa(s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); }
  var VIEWS = ['overview', 'list', 'reports', 'settings'];
  var panels = {};
  VIEWS.forEach(function (v) { panels[v] = qs('[data-view-panel="' + v + '"]'); });
  var links = qsa('[data-view]');
  var crumbEl = qs('[data-crumbs]');
  var ctxEl = qs('[data-view-ctx]');
  var reportsReady = false;

  function titleFor(v) {
    var l = null;
    links.forEach(function (a) { if (!l && a.getAttribute('data-view') === v) l = a; });
    var panel = panels[v];
    var h2 = panel ? qs('h2', panel) : null;
    if (v === 'overview') {
      var h1 = qs('h1');
      return h1 ? (h1.textContent || '').trim() : 'Overview';
    }
    return h2 ? (h2.textContent || '').trim() : v;
  }

  function setCrumb(v) {
    if (!crumbEl) return;
    var here = qs('.crumb-here', crumbEl);
    if (here) here.textContent = titleFor(v);
    var base = crumbEl.getAttribute('data-crumbs') || '';
    var head = base.split('/').slice(0, -1).map(function (s) { return s.trim(); }).join(' / ');
    crumbEl.setAttribute('data-crumbs-current', (head ? head + ' / ' : '') + titleFor(v));
  }

  function closeSidebar() {
    if (body.classList.contains('sidebar-open')) {
      body.classList.remove('sidebar-open');
      var nt = qs('#navToggle');
      if (nt) nt.setAttribute('aria-expanded', 'false');
    }
  }

  function show(v, opts) {
    if (VIEWS.indexOf(v) === -1) v = 'overview';
    VIEWS.forEach(function (name) {
      var p = panels[name];
      if (!p) return;
      if (name === v) p.removeAttribute('hidden');
      else p.setAttribute('hidden', '');
    });
    links.forEach(function (a) {
      var on = a.getAttribute('data-view') === v;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    setCrumb(v);
    if (ctxEl) ctxEl.textContent = titleFor(v);
    if (v === 'reports' && !reportsReady) {
      reportsReady = true;
      if (typeof window.__renderReports === 'function') {
        try { window.__renderReports(); } catch (e) { /* no-op */ }
      }
    }
    if (v === 'list' && typeof window.__syncListView === 'function') {
      try { window.__syncListView(); } catch (e) { /* no-op */ }
    }
    if (opts && opts.scroll) {
      try { window.scrollTo(0, 0); } catch (e) { /* no-op */ }
    }
  }

  function viewFromHash() {
    var h = (location.hash || '').replace(/^#\/?/, '').toLowerCase();
    h = h.split(/[?&]/)[0];
    return VIEWS.indexOf(h) !== -1 ? h : 'overview';
  }

  window.addEventListener('hashchange', function () {
    show(viewFromHash(), { scroll: true });
    closeSidebar();
  });

  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var v = a.getAttribute('data-view');
      if (VIEWS.indexOf(v) === -1) return;
      e.preventDefault();
      var target = '#/' + v;
      if (location.hash !== target) {
        location.hash = target; /* triggers hashchange -> show() */
      } else {
        show(v, { scroll: true });
      }
      closeSidebar();
    });
  });

  /* "View all" widget links + report links inside Overview */
  qsa('[data-goto]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var v = a.getAttribute('data-goto');
      if (VIEWS.indexOf(v) === -1) v = 'overview';
      if (location.hash !== '#/' + v) location.hash = '#/' + v;
      else show(v, { scroll: true });
    });
  });

  /* initial route (supports hard reload onto #/settings etc.) */
  show(viewFromHash(), { scroll: false });

  /* ----- Settings: profile form validation + inline success ----- */
  (function () {
    var form = qs('[data-settings-form]');
    if (!form) return;
    var nameI = qs('[name="profileName"]', form);
    var emailI = qs('[name="profileEmail"]', form);
    var note = qs('[data-form-note]', form);
    function rowOf(input) { return input ? input.closest('.form-row') : null; }
    function setErr(input, msg) {
      var row = rowOf(input);
      if (!row) return;
      row.classList.add('invalid');
      var e = qs('.field-err', row);
      if (e) e.textContent = msg;
    }
    function clearErr(input) {
      var row = rowOf(input);
      if (row) row.classList.remove('invalid');
    }
    [nameI, emailI].forEach(function (i) {
      if (i) i.addEventListener('input', function () { clearErr(i); if (note) note.classList.remove('show'); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      if (nameI) {
        if (!(nameI.value || '').trim()) { setErr(nameI, 'Please enter your name.'); ok = false; }
        else clearErr(nameI);
      }
      if (emailI) {
        var v = (emailI.value || '').trim();
        if (!v) { setErr(emailI, 'Please enter your email.'); ok = false; }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { setErr(emailI, 'Enter a valid email address.'); ok = false; }
        else clearErr(emailI);
      }
      if (ok && note) {
        note.classList.add('show');
        setTimeout(function () { note.classList.remove('show'); }, 3200);
      }
    });
  }());

  /* ----- Preference toggle switches ----- */
  qsa('.switch').forEach(function (sw) {
    sw.addEventListener('click', function () {
      var on = sw.getAttribute('aria-pressed') === 'true';
      sw.setAttribute('aria-pressed', String(!on));
    });
    sw.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
        e.preventDefault();
        sw.click();
      }
    });
  });

  /* ----- Demo toast for danger-zone / placeholder actions ----- */
  var toast = null, toastTimer = null;
  function showToast(msg) {
    if (!toast) {
      toast = doc.createElement('div');
      toast.className = 'demo-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      body.appendChild(toast);
    }
    toast.innerHTML = '<svg class="ic" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg><span>' + msg + '</span>';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }
  qsa('[data-demo-link]').forEach(function (n) {
    if (!n.closest('[data-view-panel="settings"]')) return;
    n.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('Demo only — no changes were made.');
    });
  });
}());
