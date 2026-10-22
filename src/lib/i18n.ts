import { on, select, selectAll } from './dom';

export type Lang = 'en' | 'it';

export const LANG_STORAGE_KEY = 'mn:lang';
export const DEFAULT_LANG: Lang = 'en';

export interface StorageLike {
  getItem(key: string): string | null;
}

export function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'it';
}

export function readStoredLang(storage: StorageLike): Lang | null {
  const raw = storage.getItem(LANG_STORAGE_KEY);
  return isLang(raw) ? raw : null;
}

/** A stored choice wins; otherwise the browser locale decides. */
export function resolveInitialLang(storage: StorageLike, navigatorLanguage: string): Lang {
  return readStoredLang(storage) ?? (navigatorLanguage.toLowerCase().startsWith('it') ? 'it' : DEFAULT_LANG);
}

// Both locales are authored inside this repository, so the markup is trusted.
export function localizedMarkup(element: Element, lang: Lang): string | null {
  return element.getAttribute(`data-${lang}`);
}

export function localizedPlaceholder(element: Element, lang: Lang): string | null {
  return element.getAttribute(`data-ph-${lang}`);
}

/** Swaps every translated node under root and returns how many were applied. */
export function applyLanguage(root: ParentNode, lang: Lang): number {
  let applied = 0;

  for (const element of selectAll<HTMLElement>('[data-en], [data-it]', root)) {
    const markup = localizedMarkup(element, lang);
    if (markup !== null) {
      element.innerHTML = markup;
      applied += 1;
    }
  }

  for (const field of selectAll<HTMLInputElement | HTMLTextAreaElement>('[data-ph-en], [data-ph-it]', root)) {
    const placeholder = localizedPlaceholder(field, lang);
    if (placeholder !== null) {
      field.placeholder = placeholder;
      applied += 1;
    }
  }

  return applied;
}

export function initLanguage(): Lang {
  const stored = readStoredLang(localStorage);
  const initial = stored ?? (document.documentElement.lang.startsWith('it') ? 'it' : DEFAULT_LANG);

  document.documentElement.lang = initial;
  applyLanguage(document, initial);

  const button = select<HTMLButtonElement>('[data-lang-toggle]');
  if (button) {
    const sync = () => {
      const active = document.documentElement.lang as Lang;
      button.textContent = active === 'en' ? 'IT' : 'EN';
      button.setAttribute('aria-label', active === 'en' ? 'Passa all’italiano' : 'Switch to English');
    };
    sync();
    on(button, 'click', () => {
      const next: Lang = document.documentElement.lang === 'en' ? 'it' : 'en';
      localStorage.setItem(LANG_STORAGE_KEY, next);
      document.documentElement.lang = next;
      applyLanguage(document, next);
      sync();
      document.dispatchEvent(new CustomEvent('mn:languagechange', { detail: next }));
    });
  }

  return initial;
}
