/* ════════════════════════════════════════════════
   COMMAND PALETTE — ⌘K / Ctrl+K
   Requires: extras.css · #paletteBtn in navbar
   Exposes:  window.openCommandPalette()
════════════════════════════════════════════════ */
(function initPalette() {

  /* ── Helper: safe HTML escape ── */
  function esc(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ── Commands definition ──────────────────────
     group    : section header label
     icon     : emoji shown left of label
     label    : display text (also searched)
     tags     : extra search terms (Italian etc.)
     keepOpen : true → palette stays open after action
     action   : what to do on select
  ─────────────────────────────────────────────── */
  const COMMANDS = [
    /* Navigate */
    {
      group: 'Navigate', icon: '👤',
      label: 'About me', tags: 'su di me chi sono about',
      action() { scroll('#about'); }
    },
    {
      group: 'Navigate', icon: '💻',
      label: 'Projects', tags: 'progetti cose costruito',
      action() { scroll('#projects'); }
    },
    {
      group: 'Navigate', icon: '🎓',
      label: 'Education', tags: 'formazione percorso studi università',
      action() { scroll('#education'); }
    },
    {
      group: 'Navigate', icon: '⚜️',
      label: 'Volunteer', tags: 'volontariato scout oltre codice',
      action() { scroll('#volunteer'); }
    },
    {
      group: 'Navigate', icon: '✉️',
      label: 'Contact', tags: 'contatti scrivimi mettiamoci',
      action() { scroll('#contact'); }
    },
    {
      group: 'Navigate', icon: '🗺️',
      label: 'Places', tags: 'luoghi mappa dove stato map',
      action() { scroll('#map-section'); }
    },
    {
      group: 'Navigate', icon: '📋',
      label: 'Changelog', tags: 'versioni sito nel tempo history',
      action() { scroll('#changelog'); }
    },
    {
      group: 'Navigate', icon: '⬆️',
      label: 'Back to top', tags: 'torna su inizio home',
      action() { window.scrollTo({ top: 0, behavior: 'smooth' }); close(); }
    },

    /* Actions */
    {
      group: 'Actions', icon: '🌓',
      label: 'Toggle theme', tags: 'dark light mode tema chiaro scuro',
      keepOpen: true,
      action() { document.getElementById('themeBtn')?.click(); }
    },
    {
      group: 'Actions', icon: '🌐',
      label: 'Toggle language', tags: 'lingua italiano english it en',
      keepOpen: true,
      action() { document.getElementById('langBtn')?.click(); }
    },
    {
      group: 'Actions', icon: '📋',
      label: 'Copy email', tags: 'copia email gmail contatto',
      action() { document.getElementById('copy-email-btn')?.click(); close(); }
    },

    /* Links */
    {
      group: 'Links', icon: '🐙',
      label: 'GitHub profile', tags: 'github repo codice',
      action() { window.open('https://github.com/mirconegri', '_blank'); }
    },
    {
      group: 'Links', icon: '🔗',
      label: 'LinkedIn profile', tags: 'linkedin lavoro professionale',
      action() { window.open('https://linkedin.com/in/mirconegri', '_blank'); }
    },
    {
      group: 'Links', icon: '✈️',
      label: 'Telegram', tags: 'telegram messaggi chat',
      action() { window.open('https://t.me/mirco_ne', '_blank'); }
    },
    {
      group: 'Links', icon: '📄',
      label: 'Download CV', tags: 'curriculum vitae scarica pdf',
      action() { window.open('assets/CV_Mirco_Negri.pdf', '_blank'); }
    },
    {
      group: 'Links', icon: '🔒',
      label: 'Privacy Policy', tags: 'privacy gdpr politica',
      action() { window.open('privacy.html', '_blank'); }
    },

    /* Projects */
    {
      group: 'Projects', icon: '🤖',
      label: 'LaundryBot', tags: 'telegram python bot lavatrice',
      action() { window.open('https://github.com/mirconegri/laundrybot', '_blank'); }
    },
    {
      group: 'Projects', icon: '🎬',
      label: 'MovieRecommender', tags: 'film tmdb python tkinter',
      action() { window.open('https://github.com/mirconegri/movierecommender', '_blank'); }
    },
    {
      group: 'Projects', icon: '🏕️',
      label: 'ScoutMealPlanner', tags: 'scout campo menu spesa python',
      action() { window.open('https://github.com/mirconegri/scoutmealplanner', '_blank'); }
    },
    {
      group: 'Projects', icon: '🎧',
      label: 'Carnival Effects', tags: 'dj audio canvas web carnevale',
      action() { window.open('https://github.com/mirconegri/carnivalvisualeffects', '_blank'); }
    },
    {
      group: 'Projects', icon: '🍅',
      label: 'Pomodoro Gravity Cube', tags: 'arduino timer produttività legno',
      action() { window.open('https://github.com/mirconegri/pomodorogravitycube', '_blank'); }
    },
    {
      group: 'Projects', icon: '📚',
      label: 'UniArchive', tags: 'appunti università latex note',
      action() { window.open('https://github.com/mirconegri/university', '_blank'); }
    },
    {
      group: 'Projects', icon: '🌐',
      label: 'mirconegri.com source', tags: 'sito web portfolio three.js',
      action() { window.open('https://github.com/mirconegri/mirconegri.com', '_blank'); }
    },
  ];

  /* ── State ── */
  let isOpen   = false;
  let selected = 0;
  let filtered = [...COMMANDS];

  /* ── Build DOM ── */
  const overlay = document.createElement('div');
  overlay.id = 'cp-overlay';
  overlay.innerHTML = `
    <div id="cp-panel">
      <div id="cp-search-row">
        <i class="fa-solid fa-magnifying-glass" id="cp-search-icon"></i>
        <input id="cp-input" type="text"
               placeholder="Search commands, projects, links…"
               autocomplete="off" spellcheck="false" />
        <span id="cp-esc-badge">ESC</span>
      </div>
      <div id="cp-list"></div>
      <div id="cp-footer">
        <span><kbd>↑↓</kbd> navigate</span>
        <span><kbd>↵</kbd> select</span>
        <span><kbd>ESC</kbd> close</span>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = document.getElementById('cp-input');
  const list  = document.getElementById('cp-list');

  /* ── Fuzzy match: all query chars appear in order ── */
  function fuzzy(cmd, query) {
    if (!query) return true;
    const src = (cmd.label + ' ' + cmd.group + ' ' + (cmd.tags || '')).toLowerCase();
    const q   = query.toLowerCase();
    /* Fast substring shortcut */
    if (src.includes(q)) return true;
    /* Character-order fuzzy */
    let si = 0;
    for (const ch of q) {
      si = src.indexOf(ch, si);
      if (si === -1) return false;
      si++;
    }
    return true;
  }

  /* ── Highlight matching chars in label ── */
  function highlight(label, query) {
    if (!query) return esc(label);
    const q = query.toLowerCase();
    let result = '';
    let qi = 0;
    for (const ch of label) {
      if (qi < q.length && ch.toLowerCase() === q[qi]) {
        result += `<mark>${esc(ch)}</mark>`;
        qi++;
      } else {
        result += esc(ch);
      }
    }
    return result;
  }

  /* ── Render filtered list ── */
  function render(query = '') {
    filtered = COMMANDS.filter(c => fuzzy(c, query));

    /* Clamp selection */
    if (filtered.length === 0) selected = 0;
    else selected = Math.max(0, Math.min(selected, filtered.length - 1));

    if (filtered.length === 0) {
      list.innerHTML = `<div class="cp-empty">No results for "${esc(query)}"</div>`;
      return;
    }

    /* Group */
    const groups = new Map();
    filtered.forEach(c => {
      if (!groups.has(c.group)) groups.set(c.group, []);
      groups.get(c.group).push(c);
    });

    let html     = '';
    let globalIdx = 0;

    for (const [groupName, cmds] of groups) {
      html += `<div class="cp-group-label">${esc(groupName)}</div>`;
      for (const cmd of cmds) {
        const active = globalIdx === selected;
        html += `
          <div class="cp-item${active ? ' active' : ''}" data-idx="${globalIdx}">
            <span class="cp-item-icon">${cmd.icon}</span>
            <span class="cp-item-label">${highlight(cmd.label, query)}</span>
          </div>`;
        globalIdx++;
      }
    }

    list.innerHTML = html;

    /* Scroll active item into view */
    list.querySelector('.active')?.scrollIntoView({ block: 'nearest' });

    /* Item interactions */
    list.querySelectorAll('.cp-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        selected = +el.dataset.idx;
        list.querySelectorAll('.cp-item').forEach((item, i) => {
          item.classList.toggle('active', i === selected);
        });
      });
      el.addEventListener('click', () => execute(filtered[+el.dataset.idx]));
    });
  }

  /* ── Execute a command ── */
  function execute(cmd) {
    if (!cmd) return;
    cmd.action();
    if (!cmd.keepOpen) close();
  }

  /* ── Open / Close ── */
  function open() {
    isOpen = true;
    selected = 0;
    input.value = '';
    overlay.classList.add('open');
    render('');
    requestAnimationFrame(() => input.focus());
  }

  function close() {
    isOpen = false;
    overlay.classList.remove('open');
    input.blur();
  }

  /* ── Scroll helper (accounts for fixed navbar) ── */
  function scroll(selector) {
    const el = document.querySelector(selector);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    close();
  }

  /* ── Keyboard: open shortcut ── */
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      isOpen ? close() : open();
      return;
    }
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        close();
        break;
      case 'ArrowDown':
      case 'Tab':
        e.preventDefault();
        selected = (selected + 1) % filtered.length;
        render(input.value);
        break;
      case 'ArrowUp':
        e.preventDefault();
        selected = (selected - 1 + filtered.length) % filtered.length;
        render(input.value);
        break;
      case 'Enter':
        e.preventDefault();
        execute(filtered[selected]);
        break;
    }
  });

  /* ── Search input ── */
  input.addEventListener('input', () => {
    selected = 0;
    render(input.value);
  });

  /* ── Click outside to close ── */
  overlay.addEventListener('click', e => {
    if (e.target === overlay) close();
  });

  /* ── Wire up ⌘K navbar button ── */
  document.getElementById('paletteBtn')?.addEventListener('click', open);

  /* ── Global accessor ── */
  window.openCommandPalette = open;

})();
