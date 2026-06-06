/* ════════════════════════════════════════════════
   MOUSE ORB — follows cursor with lerp smoothing
════════════════════════════════════════════════ */
(function initOrb() {
  const orb = document.getElementById('mouse-orb');
  let orbX = window.innerWidth / 2, orbY = window.innerHeight / 2;
  let orbTargetX = orbX, orbTargetY = orbY;

  if (!window.matchMedia('(hover:hover)').matches) return;

  document.addEventListener('mousemove', e => {
    orbTargetX = e.clientX;
    orbTargetY = e.clientY;
  });

  (function animOrb() {
    orbX += (orbTargetX - orbX) * 0.15;
    orbY += (orbTargetY - orbY) * 0.15;
    orb.style.left = orbX + 'px';
    orb.style.top  = orbY + 'px';
    requestAnimationFrame(animOrb);
  })();
})();
