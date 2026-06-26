/* ════════════════════════════════════════════════
   INTRO SCREEN — first-visit animated overlay
   Requires: #intro-overlay markup in index.html
             extras.css for styles
   Uses sessionStorage to skip on repeat visits.
════════════════════════════════════════════════ */
(function initIntro() {

  const overlay  = document.getElementById('intro-overlay');
  if (!overlay) return;

  /* ── Repeat visit: already hidden by CSS (.intro-seen),
        just remove the DOM node cleanly ── */
  if (sessionStorage.getItem('mn_seen')) {
    overlay.remove();
    return;
  }

  /* ── Element refs ── */
  const nameEl   = document.getElementById('intro-name');
  const barEl    = document.getElementById('intro-bar');
  const statusEl = document.getElementById('intro-status');
  const labelEl  = overlay.querySelector('.intro-site-label');
  const skipBtn  = document.getElementById('intro-skip');

  const NAME = 'Mirco Negri';
  const STATUSES = [
    'Initializing...',
    'Loading assets...',
    'Building interface...',
    'Welcome.'
  ];

  let progress   = 0;
  let charIdx    = 0;
  let exiting    = false;
  let typeTimer, barTimer;

  /* ── Exit: slide-up curtain ── */
  function exit() {
    if (exiting) return;
    exiting = true;
    clearInterval(typeTimer);
    clearInterval(barTimer);

    /* Snap everything to final state before curtain lifts */
    if (nameEl) { nameEl.textContent = NAME; nameEl.classList.add('done'); }
    if (barEl)  barEl.style.width = '100%';
    if (statusEl) statusEl.textContent = STATUSES[3];

    sessionStorage.setItem('mn_seen', '1');

    overlay.classList.add('exit');
    setTimeout(() => overlay.remove(), 750);
  }

  /* ── 1. Fade-in site label (200 ms) ── */
  setTimeout(() => labelEl && labelEl.classList.add('show'), 200);

  /* ── 2. Typing animation (starts at 500 ms) ── */
  setTimeout(() => {
    typeTimer = setInterval(() => {
      if (!nameEl) return;
      nameEl.textContent = NAME.slice(0, ++charIdx);
      if (charIdx >= NAME.length) clearInterval(typeTimer);
    }, 75);
  }, 500);

  /* ── 3. Progress bar (starts immediately) ── */
  barTimer = setInterval(() => {
    /* Non-linear fill: fast at start, slows near end */
    const step = progress < 70
      ? Math.random() * 2.2 + 0.8        /* 0.8–3 % per tick   */
      : Math.random() * 0.6 + 0.2;       /* 0.2–0.8 % near end */
    progress = Math.min(progress + step, 100);

    if (barEl) barEl.style.width = progress + '%';

    /* Status text milestones */
    if (statusEl) {
      if (progress > 15 && statusEl.textContent === STATUSES[0]) statusEl.textContent = STATUSES[1];
      if (progress > 55 && statusEl.textContent === STATUSES[1]) statusEl.textContent = STATUSES[2];
      if (progress > 90 && statusEl.textContent === STATUSES[2]) statusEl.textContent = STATUSES[3];
    }

    if (progress >= 100) {
      clearInterval(barTimer);
      setTimeout(exit, 380);
    }
  }, 28);

  /* ── 4. Skip button appears after 800 ms ── */
  setTimeout(() => skipBtn && skipBtn.classList.add('show'), 800);
  if (skipBtn) skipBtn.addEventListener('click', exit);

})();
