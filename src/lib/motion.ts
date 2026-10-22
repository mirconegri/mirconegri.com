import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { on, select, selectAll } from './dom';
import { clamp, prefersReducedMotion } from './env';
import { activeSectionIndex, rectsOf, sheets } from './sections';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_DURATION = 0.85;
const REVEAL_SHIFT = 22;

/** Lenis keeps the scroll from jumping, GSAP reveals each sheet as it arrives. */
export function initMotion(): void {
  const reduced = prefersReducedMotion();
  const progress = select<HTMLElement>('[data-nav-progress]');
  const navLinks = selectAll<HTMLAnchorElement>('[data-palette-nav]');
  const sections = sheets();
  let activeIndex = -1;

  const syncProgress = () => {
    const span = document.documentElement.scrollHeight - window.innerHeight;
    const value = span > 0 ? clamp(window.scrollY / span, 0, 1) : 0;
    progress?.style.setProperty('--progress', value.toFixed(4));
  };

  const syncActive = () => {
    if (sections.length === 0) return;
    const index = activeSectionIndex(rectsOf(sections), window.innerHeight / 2);
    if (index === activeIndex) return;
    activeIndex = index;
    const current = sections[index]?.id;
    for (const link of navLinks) {
      if (current && link.hash === `#${current}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    document.dispatchEvent(new CustomEvent('mn:sectionchange', { detail: index }));
  };

  on(window, 'scroll', () => {
    syncProgress();
    syncActive();
  }, { passive: true });
  syncProgress();
  syncActive();

  let lenis: Lenis | null = null;
  if (!reduced) {
    lenis = new Lenis({ duration: 1.05, touchMultiplier: 1.6 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    on(window, 'load', () => ScrollTrigger.refresh());
  }

  on(document, 'click', (event) => {
    const link = (event.target as Element | null)?.closest('a[href^="#"]');
    if (!(link instanceof HTMLAnchorElement)) return;
    const destination = document.querySelector(link.hash);
    if (!(destination instanceof HTMLElement)) return;
    event.preventDefault();
    if (lenis) {
      const offset = -(select<HTMLElement>('.nav')?.offsetHeight ?? 0) - 8;
      lenis.scrollTo(destination, { offset, duration: 1.1 });
    } else {
      destination.scrollIntoView({ block: 'start' });
    }
  });

  const reveals = selectAll<HTMLElement>('[data-reveal]');
  if (reduced) {
    for (const element of reveals) {
      element.style.opacity = '1';
      element.style.clipPath = 'none';
    }
    return;
  }

  for (const element of reveals) {
    const mask = element.dataset.reveal === 'mask';
    const hidden = { opacity: 0, y: mask ? 0 : REVEAL_SHIFT, clipPath: mask ? 'inset(0 0 100% 0)' : 'none' };
    const shown = { opacity: 1, y: 0, clipPath: mask ? 'inset(0 0 0% 0)' : 'none' };
    gsap.fromTo(element, hidden, {
      ...shown,
      duration: REVEAL_DURATION,
      ease: 'expo.out',
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
    });
  }
}
