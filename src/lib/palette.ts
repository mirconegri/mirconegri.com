import { on, select, selectAll } from './dom';

export type PaletteAction = 'navigate' | 'external' | 'theme' | 'language' | 'email';

export interface PaletteEntry {
  id: string;
  group: string;
  label: string;
  hint: string;
  action: PaletteAction;
  value: string;
}

export interface RankedEntry extends PaletteEntry {
  score: number;
}

const CONSECUTIVE_BONUS = 3;
const SINGLE_BONUS = 1;
const GROUP_WEIGHT = 0.4;

// Fuzzy subsequence match returning character-order bonus scores.
export function fuzzyScore(query: string, target: string): number {
  const needle = query.trim().toLowerCase();
  if (needle.length === 0) return 1;

  const haystack = target.toLowerCase();
  let score = 0;
  let cursor = -1;

  for (const char of needle) {
    const found = haystack.indexOf(char, cursor + 1);
    if (found === -1) return 0;
    score += found === cursor + 1 ? CONSECUTIVE_BONUS : SINGLE_BONUS;
    cursor = found;
  }

  return score;
}

// Ranks command palette entries by matching query against label and group.
export function rankEntries(entries: readonly PaletteEntry[], query: string): RankedEntry[] {
  return entries
    .map((entry) => ({
      ...entry,
      score: Math.max(fuzzyScore(query, entry.label), fuzzyScore(query, entry.group) * GROUP_WEIGHT),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
}

// Scrapes searchable entries directly from authored HTML markup.
export function collectEntries(root: ParentNode): PaletteEntry[] {
  const entries: PaletteEntry[] = [];

  for (const link of selectAll<HTMLAnchorElement>('[data-palette-nav]', root)) {
    entries.push({
      id: `nav:${link.hash || link.textContent}`,
      group: 'Sections',
      label: (link.textContent ?? '').trim(),
      hint: 'Jump to section',
      action: 'navigate',
      value: link.hash,
    });
  }

  for (const link of selectAll<HTMLAnchorElement>('[data-palette-link]', root)) {
    entries.push({
      id: `link:${link.href}`,
      group: link.dataset.paletteGroup ?? 'Links',
      label: link.dataset.paletteLabel ?? (link.textContent ?? '').trim(),
      hint: link.dataset.paletteHint ?? 'Open',
      action: 'external',
      value: link.href,
    });
  }

  return entries;
}

const STATIC_ENTRIES: readonly PaletteEntry[] = [
  { id: 'cmd:theme', group: 'Actions', label: 'Toggle theme', hint: 'Dark / light', action: 'theme', value: '' },
  { id: 'cmd:lang', group: 'Actions', label: 'Switch language', hint: 'English / Italiano', action: 'language', value: '' },
  { id: 'cmd:email', group: 'Actions', label: 'Copy email address', hint: 'mirconegri06@gmail.com', action: 'email', value: 'mirconegri06@gmail.com' },
  { id: 'cmd:cv', group: 'Actions', label: 'Download CV', hint: 'PDF', action: 'external', value: 'assets/CV_Mirco_Negri.pdf' },
];

const MAX_VISIBLE = 9;

// Binds global keyboard shortcuts and search interactions for the command palette.
export function initPalette(): void {
  const root = select<HTMLElement>('[data-palette]');
  const trigger = select<HTMLButtonElement>('[data-palette-open]');
  if (!root) return;

  const input = select<HTMLInputElement>('[data-palette-input]', root);
  const list = select<HTMLElement>('[data-palette-list]', root);
  const empty = select<HTMLElement>('[data-palette-empty]', root);
  if (!input || !list) return;

  const entries = [...STATIC_ENTRIES, ...collectEntries(document)];
  let visible: RankedEntry[] = [];
  let selected = 0;

  const render = () => {
    list.innerHTML = '';
    if (visible.length === 0) {
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    visible.forEach((entry, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'palette-item';
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', String(index === selected));
      if (index === selected) button.classList.add('is-active');

      button.innerHTML = `
        <span class="palette-item-main">
          <span class="palette-item-label">${entry.label}</span>
          <span class="palette-item-group">${entry.group}</span>
        </span>
        <span class="palette-item-hint">${entry.hint}</span>
      `;

      on(button, 'pointerenter', () => {
        selected = index;
        syncSelected();
      });

      on(button, 'click', () => execute(entry));
      list.appendChild(button);
    });
  };

  const syncSelected = () => {
    const items = selectAll<HTMLElement>('.palette-item', list);
    items.forEach((item, index) => {
      const active = index === selected;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      if (active) item.scrollIntoView({ block: 'nearest' });
    });
  };

  const execute = (entry: PaletteEntry) => {
    close();
    if (entry.action === 'navigate') {
      const target = select<HTMLElement>(entry.value);
      target?.scrollIntoView({ behavior: 'smooth' });
    } else if (entry.action === 'external') {
      window.open(entry.value, '_blank', 'noopener');
    } else if (entry.action === 'theme') {
      select<HTMLButtonElement>('[data-theme-toggle]')?.click();
    } else if (entry.action === 'language') {
      select<HTMLButtonElement>('[data-lang-toggle]')?.click();
    } else if (entry.action === 'email') {
      navigator.clipboard?.writeText(entry.value);
    }
  };

  const open = () => {
    root.hidden = false;
    document.body.classList.add('palette-open');
    input.value = '';
    visible = entries.slice(0, MAX_VISIBLE).map(e => ({ ...e, score: 1 }));
    selected = 0;
    render();
    setTimeout(() => input.focus(), 10);
  };

  const close = () => {
    root.hidden = true;
    document.body.classList.remove('palette-open');
  };

  on(input, 'input', () => {
    const query = input.value.trim();
    visible = query ? rankEntries(entries, query).slice(0, MAX_VISIBLE) : entries.slice(0, MAX_VISIBLE).map(e => ({ ...e, score: 1 }));
    selected = 0;
    render();
  });

  on(input, 'keydown', (e: Event) => {
    const key = (e as KeyboardEvent).key;
    if (key === 'ArrowDown') {
      e.preventDefault();
      selected = (selected + 1) % Math.max(1, visible.length);
      syncSelected();
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      selected = (selected - 1 + visible.length) % Math.max(1, visible.length);
      syncSelected();
    } else if (key === 'Enter') {
      e.preventDefault();
      if (visible[selected]) execute(visible[selected]);
    } else if (key === 'Escape') {
      close();
    }
  });

  on(document, 'keydown', (e: Event) => {
    const ke = e as KeyboardEvent;
    if ((ke.metaKey || ke.ctrlKey) && ke.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (root.hidden) open();
      else close();
    }
  });

  if (trigger) on(trigger, 'click', open);
  on(root, 'click', (e) => {
    if (e.target === root) close();
  });
}
