/* ════════════════════════════════════════════════
   FILM GRAIN — injects #grain div, styled by extras.css
   Zero canvas/pixel cost: SVG feTurbulence + CSS animation
════════════════════════════════════════════════ */
(function initGrain() {
  const el = document.createElement('div');
  el.id = 'grain';
  document.body.appendChild(el);
})();
