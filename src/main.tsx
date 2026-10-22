import { initIslands } from './components/islands';
import { initContact } from './lib/contact';
import { initLanguage } from './lib/i18n';
import { initMotion } from './lib/motion';
import { initPalette } from './lib/palette';
import { initStrata } from './lib/strata';
import { initTerrain } from './lib/terrain';
import { initTheme } from './lib/theme';

// Initializes theme, language, interactive islands, and animation systems.
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
