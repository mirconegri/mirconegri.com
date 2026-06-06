/* ════════════════════════════════════════════════
   UI — navbar, theme, language, mobile menu,
         scroll progress, reveal, card tilt
════════════════════════════════════════════════ */

/* ── Scroll progress bar ── */
const prog = document.getElementById('prog');
window.addEventListener('scroll', () => {
  const st = document.documentElement.scrollTop;
  const sh = document.documentElement.scrollHeight - window.innerHeight;
  prog.style.width = (sh > 0 ? st / sh * 100 : 0) + '%';
}, { passive: true });

/* ── Navbar hide/show on scroll ── */
const nav = document.getElementById('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 30);
  nav.classList.toggle('hide', y > lastY && y > 100);
  lastY = y;
}, { passive: true });

/* ── Theme toggle ── */
document.getElementById('themeBtn').addEventListener('click', () => {
  document.documentElement.classList.toggle('light-mode');
  const isLight = document.documentElement.classList.contains('light-mode');
  document.getElementById('themeBtn').innerHTML = isLight
    ? '<i class="fa-solid fa-moon"></i>'
    : '<i class="fa-solid fa-sun"></i>';
});

/* ── Language toggle ── */
let currentLang = 'it';
document.getElementById('langBtn').addEventListener('click', () => {
  currentLang = currentLang === 'it' ? 'en' : 'it';
  document.getElementById('langBtn').textContent = currentLang.toUpperCase();
  document.querySelectorAll('[data-it]').forEach(el => {
    el.innerHTML = el.getAttribute('data-' + currentLang);
  });
});

/* ── Mobile menu ── */
document.getElementById('mbtn').addEventListener('click', () => {
  document.getElementById('mmenu').classList.toggle('hidden');
});
document.querySelectorAll('#mmenu .nav-a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('mmenu').classList.add('hidden'))
);

/* ── Reveal on scroll ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('vis'));

/* ── Card 3D tilt ── */
if (window.matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.pcard:not(.pcard-ghost), .vcard, .cert-item').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x*4}deg) rotateX(${-y*4}deg) translateZ(2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1), background .25s';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .1s, background .25s';
    });
  });
}
