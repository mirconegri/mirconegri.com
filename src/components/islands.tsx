import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { selectAll, watchMedia } from '../lib/dom';
import AnimatedContent from './react-bits/AnimatedContent';
import CountUp from './react-bits/CountUp';
import DotGrid from './react-bits/DotGrid';
import Magnet from './react-bits/Magnet';
import SplitText from './react-bits/SplitText';
import SpotlightCard from './react-bits/SpotlightCard';
import ProjectOrbit from './react-bits/ProjectOrbit';

type Lang = 'en' | 'it';
type Theme = 'dark' | 'light';

function currentLang(): Lang {
  return document.documentElement.lang === 'it' ? 'it' : 'en';
}

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

// React hook tracking active language.
function useLanguage(): Lang {
  const [lang, setLang] = useState(currentLang);
  useEffect(() => {
    const listener = () => setLang(currentLang());
    document.addEventListener('mn:languagechange', listener);
    return () => document.removeEventListener('mn:languagechange', listener);
  }, []);
  return lang;
}

// React hook tracking active theme.
function useTheme(): Theme {
  const [theme, setTheme] = useState(currentTheme);
  useEffect(() => {
    const listener = () => setTheme(currentTheme());
    document.addEventListener('mn:themechange', listener);
    return () => document.removeEventListener('mn:themechange', listener);
  }, []);
  return theme;
}

// React hook tracking reduced motion preference.
function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => watchMedia('(prefers-reduced-motion: reduce)', setReduced), []);
  return reduced;
}

// Reads a design token value and updates on theme changes.
function useToken(name: string): string {
  const read = () => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [value, setValue] = useState(read);
  useEffect(() => {
    const listener = () => setValue(read());
    document.addEventListener('mn:themechange', listener);
    return () => document.removeEventListener('mn:themechange', listener);
  }, [name]);
  return value;
}

// Extracts localized text from data-text-it or data-text-en dataset attributes.
function pick(host: HTMLElement, key: string, lang: Lang): string {
  return host.dataset[`${key}${lang === 'it' ? 'It' : 'En'}`] ?? '';
}

// Memoizes HTML to keep React from rewriting server-rendered nodes.
function useMarkup(html: string): ReactNode {
  return useMemo(() => <div dangerouslySetInnerHTML={{ __html: html }} />, [html]);
}

// Hero title with staggered character reveal.
function HeroName({ host }: { host: HTMLElement }) {
  const lang = useLanguage();
  const reduced = useReducedMotion();
  const text = pick(host, 'text', lang) || host.textContent?.trim() || '';
  const className = host.className || 'hero-name';

  if (reduced) return <h1 className={className}>{text}</h1>;

  return (
    <SplitText
      className={className}
      text={text}
      tag="h1"
      splitType="chars"
      effect="rise"
      trigger="load"
      delay={0.12}
      duration={1.1}
      staggerFrom="start"
      textAlign="left"
    />
  );
}

interface StatEntry {
  value: number;
  suffix: string;
  label: string;
}

// Parses numeric counters from data-stat attributes.
function readStats(host: HTMLElement, lang: Lang): StatEntry[] {
  return selectAll<HTMLElement>('[data-stat]', host).map((item) => ({
    value: Number(item.dataset.value ?? 0),
    suffix: item.dataset.suffix ?? '',
    label: item.dataset[lang === 'it' ? 'labelIt' : 'labelEn'] ?? '',
  }));
}

// Animated stats section with ease-out count up.
function Stats({ host }: { host: HTMLElement }) {
  const lang = useLanguage();
  const reduced = useReducedMotion();
  const entries = useMemo(() => readStats(host, lang), [host, lang]);

  return (
    <ul className={host.className || 'stats'}>
      {entries.map((entry) => (
        <li className="stat" key={entry.label}>
          <span className="stat-value">
            <CountUp to={entry.value} suffix={entry.suffix} duration={reduced ? 0 : 1.5} easing="expo" trigger="view" />
          </span>
          <span className="label">{entry.label}</span>
        </li>
      ))}
    </ul>
  );
}

// Magnetic search icon button.
function PaletteMagnet({ host }: { host: HTMLElement }) {
  const reduced = useReducedMotion();
  return (
    <Magnet
      disabled={reduced}
      padding={90}
      magnetStrength={5}
      tilt={0}
      scale={1.06}
      wrapperClassName="magnet"
      innerClassName="magnet-inner"
    >
      <button type="button" className="icon-btn" data-palette-open aria-label={host.dataset.label ?? 'Search'}>
        <span aria-hidden="true">⌘K</span>
      </button>
    </Magnet>
  );
}

// Vertical prose block with staggered fade-in.
function AboutProse({ html, className }: { html: string; className: string }) {
  const reduced = useReducedMotion();
  const markup = useMarkup(html);

  if (reduced) return <div className={className}>{markup}</div>;

  return (
    <AnimatedContent
      className={className}
      distance={26}
      direction="vertical"
      duration={0.85}
      ease="expo.out"
      threshold={0.18}
      stagger={0.1}
      staggerFrom="start"
    >
      {markup}
    </AnimatedContent>
  );
}

// Interactive spotlight contact card with cursor flare.
function ContactCard({ html, className }: { html: string; className: string }) {
  const theme = useTheme();
  const reduced = useReducedMotion();
  const markup = useMarkup(html);

  return (
    <SpotlightCard
      className={className}
      theme={theme}
      shape="beam"
      intensity={0.45}
      spotlightSize={0.6}
      softness={0.5}
      proximity={300}
      smoothing={0.12}
      ambient={!reduced}
      flare={!reduced}
      grain={0.06}
    >
      {markup}
    </SpotlightCard>
  );
}

// Interactive WebGL interactive dot grid canvas.
function ContactGrid({ paused }: { paused: boolean }) {
  const base = useToken('--text');
  const active = useToken('--accent');

  return (
    <DotGrid
      className="contact-grid"
      dotSize={3}
      gap={24}
      baseColor={base}
      activeColor={active}
      proximity={150}
      strength={4}
      glow={0.6}
      opacity={0.6}
      fade={0.35}
      intro={!paused}
      paused={paused}
    />
  );
}

// Mount helper for individual island containers.
function mount(selector: string, render: (host: HTMLElement) => ReactNode): void {
  for (const host of selectAll<HTMLElement>(selector)) {
    createRoot(host).render(render(host));
  }
}

// Mounts interactive React islands into static HTML hosts.
export function initIslands(): void {
  mount('[data-island="hero-name"]', (host) => <HeroName host={host} />);
  mount('[data-island="stats"]', (host) => <Stats host={host} />);
  mount('[data-island="magnet"]', (host) => <PaletteMagnet host={host} />);
  mount('[data-island="about"]', (host) => <AboutProse html={host.innerHTML} className={host.className || 'prose'} />);
  mount('[data-island="contact-card"]', (host) => (
    <ContactCard html={host.innerHTML} className={host.className || 'contact-card'} />
  ));
  mount('[data-island="project-orbit"]', () => <ProjectOrbit />);
  mount('[data-island="contact-grid"]', () => (
    <ContactGrid paused={window.matchMedia('(prefers-reduced-motion: reduce)').matches} />
  ));
}
