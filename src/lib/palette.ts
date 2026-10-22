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

/** Subsequence match: returns 0 when any query character is missing, in order. */
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

export function rankEntries(entries: readonly PaletteEntry[], query: string): RankedEntry[] {
  return entries
    .map((entry) => ({
      ...entry,
      score: Math.max(fuzzyScore(query, entry.label), fuzzyScore(query, entry.group) * GROUP_WEIGHT),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
}

/** Reads the searchable index straight from the markup, so content has one source. */
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
  let cursor = 0;

  const run = (entry: RankedEntry) => {
    close();
    if (entry.action === 'navigate') {
      select<HTMLElement>(entry.value)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (entry.action === 'external') {
      window.open(entry.value, '_blank', 'noopener');
      return;
    }
    if (entry.action === 'theme') {
      select<HTMLButtonElement>('[data-theme-toggle]')?.click();
      return;
    }
    if (entry.action === 'language') {
      select<HTMLButtonElement>('[data-lang-toggle]')?.click();
      return;
    }
    void navigator.clipboard?.writeText(entry.value);
  };

  const paint = () => {
    list.replaceChildren();
    visible.forEach((entry, index) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'palette-item';
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', String(index === cursor));
      item.innerHTML = `<span class="row-index">${entry.group}</span><span class="row-name">${entry.label}</span><span class="row-meta">${entry.hint}</span>`;
      item.addEventListener('click', () => run(entry));
      item.addEventListener('pointermove', () => {
        cursor = index;
        paint();
      });
      list.append(item);
    });
    if (empty) empty.hidden = visible.length > 0;
  };

  const search = () => {
    visible = rankEntries(entries, input.value).slice(0, MAX_VISIBLE);
    cursor = 0;
    paint();
  };

  const open = () => {
    root.hidden = false;
    search();
    input.focus();
    input.select();
  };

  const close = () => {
    root.hidden = true;
    input.value = '';
  };

  if (trigger) on(trigger, 'click', open);
  on(input, 'input', search);
  on(input, 'keydown', (event) => {
    const key = (event as KeyboardEvent).key;
    if (key === 'ArrowDown') {
      event.preventDefault();
      cursor = Math.min(cursor + 1, visible.length - 1);
      paint();
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      cursor = Math.max(cursor - 1, 0);
      paint();
    } else if (key === 'Enter' && visible[cursor]) {
      event.preventDefault();
      run(visible[cursor]);
    }
  });

  on(root, 'click', (event) => {
    if (event.target === root) close();
  });

  on(document, 'keydown', (event) => {
    const keyboard = event as KeyboardEvent;
    if (keyboard.key.toLowerCase() === 'k' && (keyboard.metaKey || keyboard.ctrlKey)) {
      keyboard.preventDefault();
      if (root.hidden) open();
      else close();
      return;
    }
    if (keyboard.key === 'Escape' && !root.hidden) close();
  });
}
