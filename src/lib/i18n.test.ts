import { describe, expect, it } from 'vitest';
import { isLang, resolveInitialLang } from './i18n';

describe('i18n', () => {
  it('validates supported languages', () => {
    expect(isLang('en')).toBe(true);
    expect(isLang('it')).toBe(true);
    expect(isLang('fr')).toBe(false);
    expect(isLang(null)).toBe(false);
  });

  it('resolves initial language from storage or navigator', () => {
    const mockStorage = {
      getItem: (key: string) => (key === 'mn:lang' ? 'it' : null),
    };
    expect(resolveInitialLang(mockStorage, 'en-US')).toBe('it');

    const emptyStorage = { getItem: () => null };
    expect(resolveInitialLang(emptyStorage, 'it-IT')).toBe('it');
    expect(resolveInitialLang(emptyStorage, 'en-GB')).toBe('en');
    expect(resolveInitialLang(emptyStorage, 'de-DE')).toBe('en');
  });
});
