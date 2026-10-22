import { on, select } from './dom';

export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'mn:theme';

export interface StorageLike {
  getItem(key: string): string | null;
}

export function isTheme(value: unknown): value is Theme {
  return value === 'dark' || value === 'light';
}

export function readStoredTheme(storage: StorageLike): Theme | null {
  const raw = storage.getItem(THEME_STORAGE_KEY);
  return isTheme(raw) ? raw : null;
}

/** A stored choice wins; otherwise the operating system preference decides. */
export function resolveInitialTheme(storage: StorageLike, prefersLight: boolean): Theme {
  return readStoredTheme(storage) ?? (prefersLight ? 'light' : 'dark');
}

export function otherTheme(theme: Theme): Theme {
  return theme === 'dark' ? 'light' : 'dark';
}

export function applyTheme(root: HTMLElement, theme: Theme): void {
  root.dataset.theme = theme;
  const meta = select<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#08090b' : '#f3f1ec';
}

/** Resolves the theme the inline head script already applied, then wires the toggle. */
export function initTheme(): Theme {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = isTheme(document.documentElement.dataset.theme)
    ? (document.documentElement.dataset.theme as Theme)
    : resolveInitialTheme(localStorage, prefersLight);

  applyTheme(document.documentElement, initial);

  const button = select<HTMLButtonElement>('[data-theme-toggle]');
  if (button) {
    const sync = () => button.setAttribute('aria-label', `Switch to ${otherTheme(document.documentElement.dataset.theme as Theme)} theme`);
    sync();
    on(button, 'click', () => {
      const next = otherTheme(document.documentElement.dataset.theme as Theme);
      localStorage.setItem(THEME_STORAGE_KEY, next);
      applyTheme(document.documentElement, next);
      sync();
      document.dispatchEvent(new CustomEvent('mn:themechange', { detail: next }));
    });
  }

  return initial;
}
