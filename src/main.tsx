import { initIslands } from './components/islands';
import { initContact } from './lib/contact';
import { initLanguage } from './lib/i18n';
import { initMotion } from './lib/motion';
import { initPalette } from './lib/palette';
import { initStrata } from './lib/strata';
import { initTerrain } from './lib/terrain';
import { initTheme } from './lib/theme';

/** Islands mount first so the behaviour modules bind to the rendered controls. */
function boot(): void {
  initTheme();
  initLanguage();
  initIslands();
  initPalette();
  initContact();
  initMotion();
  initStrata();
  initTerrain();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
