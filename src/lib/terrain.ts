import { on, select } from './dom';
import { pixelRatio } from './env';
import type { CountryRings, GeoPoint } from './world-geo';
import { SHAPES } from './world-geo';

/** Journey map drawn on a 2D canvas: Natural Earth 50m outlines, no map library. */

const LON_MIN = -25;
const LON_MAX = 45;
const LAT_MIN = 34;
const LAT_MAX = 72;
const PAD = { top: 22, bottom: 22, left: 14, right: 14 };
const DPR_CAP = 2;
const PIN_RADIUS = 3.6;
const PIN_HIT_RADIUS = 15;
const ARC_LIFT = 28;

export type PlaceKind = 'home' | 'study' | 'journey';

export interface TerrainPlace {
  id: string;
  lon: number;
  lat: number;
  label: string;
  note: string;
  kind: PlaceKind;
}

export const PLACES: readonly TerrainPlace[] = [
  { id: 'castelmassa', lon: 11.3149, lat: 45.0223, label: 'Castelmassa', note: 'Hometown', kind: 'home' },
  { id: 'trento', lon: 11.1212, lat: 46.0664, label: 'Trento', note: 'BSc Computer Science', kind: 'study' },
  { id: 'dublin', lon: -6.2603, lat: 53.72, label: 'Dublin', note: 'English certificate, 2024', kind: 'study' },
  { id: 'trondheim', lon: 10.3951, lat: 63.4305, label: 'Trondheim', note: 'Erasmus, 2027', kind: 'study' },
  { id: 'palermo', lon: 13.3615, lat: 38.1157, label: 'Palermo', note: 'School trip, 2023', kind: 'journey' },
  { id: 'torino', lon: 7.6869, lat: 45.0703, label: 'Turin', note: 'School trip, 2024', kind: 'journey' },
  { id: 'barcelona', lon: 2.1686, lat: 41.3874, label: 'Barcelona', note: 'School trip, 2024', kind: 'journey' },
  { id: 'firenze', lon: 11.2558, lat: 43.7696, label: 'Florence', note: 'School trip, 2024', kind: 'journey' },
  { id: 'belfast', lon: -5.9301, lat: 54.5973, label: 'Belfast', note: 'Trip, 2024', kind: 'journey' },
  { id: 'milano', lon: 9.19, lat: 45.4642, label: 'Milan', note: 'Trip, 2024', kind: 'journey' },
  { id: 'rome', lon: 12.4964, lat: 41.9028, label: 'Rome', note: 'Trip, 2025', kind: 'journey' },
  { id: 'bucharest', lon: 26.1025, lat: 44.4268, label: 'Bucharest', note: 'Trip, 2025', kind: 'journey' },
  { id: 'brasov', lon: 25.591, lat: 45.658, label: 'Brașov', note: 'Trip, 2025', kind: 'journey' },
  { id: 'budapest', lon: 19.0402, lat: 47.4979, label: 'Budapest', note: 'Trip, 2025', kind: 'journey' },
  { id: 'venezia', lon: 12.3155, lat: 45.4408, label: 'Venice', note: 'Trip, 2025', kind: 'journey' },
  { id: 'bologna', lon: 11.3426, lat: 44.4949, label: 'Bologna', note: 'Trip, 2025', kind: 'journey' },
  { id: 'amsterdam', lon: 4.9041, lat: 52.3676, label: 'Amsterdam', note: 'Trip, 2026', kind: 'journey' },
  { id: 'bolzano', lon: 11.3548, lat: 46.4983, label: 'Bolzano', note: 'Trip, 2026', kind: 'journey' },
  { id: 'cinque-terre', lon: 9.728, lat: 44.127, label: 'Cinque Terre', note: 'Scout hike, 2022', kind: 'journey' },
  { id: 'wicklow', lon: -6.3298, lat: 52.85, label: 'Wicklow Way', note: 'Scout hike, 2023', kind: 'journey' },
  { id: 'rovereto', lon: 11.04, lat: 45.8904, label: 'Rovereto', note: 'Scout hike, 2023', kind: 'journey' },
  { id: 'sarajevo', lon: 18.4131, lat: 43.8563, label: 'Sarajevo', note: 'Scout service, 2024', kind: 'journey' },
  { id: 'tuzla', lon: 18.6735, lat: 44.5329, label: 'Tuzla', note: 'Scout service, 2024', kind: 'journey' },
  { id: 'black-forest', lon: 8.15, lat: 48.3, label: 'Black Forest', note: 'Scout hike, 2025', kind: 'journey' },
  { id: 'sondrio', lon: 9.8714, lat: 46.1708, label: 'Sondrio', note: 'Scout hike, 2025', kind: 'journey' },
  { id: 'loreto', lon: 13.6066, lat: 43.4393, label: 'Loreto', note: 'Scout service, 2026', kind: 'journey' },
];

export type Bounds = [number, number, number, number];

export interface CountryEntry {
  name: string;
  rings: CountryRings;
  bounds: Bounds;
}

export function projectPoint(lon: number, lat: number, width: number, height: number): [number, number] {
  const x = PAD.left + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (width - PAD.left - PAD.right);
  const y = PAD.top + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (height - PAD.top - PAD.bottom);
  return [x, y];
}

export function unprojectPoint(x: number, y: number, width: number, height: number): [number, number] {
  const lon = LON_MIN + ((x - PAD.left) / (width - PAD.left - PAD.right)) * (LON_MAX - LON_MIN);
  const lat = LAT_MAX - ((y - PAD.top) / (height - PAD.top - PAD.bottom)) * (LAT_MAX - LAT_MIN);
  return [lon, lat];
}

export function boundsOf(rings: CountryRings): Bounds {
  let minLon = Number.POSITIVE_INFINITY;
  let minLat = Number.POSITIVE_INFINITY;
  let maxLon = Number.NEGATIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;

  for (const ring of rings) {
    for (const [lon, lat] of ring) {
      if (lon < minLon) minLon = lon;
      if (lat < minLat) minLat = lat;
      if (lon > maxLon) maxLon = lon;
      if (lat > maxLat) maxLat = lat;
    }
  }

  return [minLon, minLat, maxLon, maxLat];
}

export function pointInRing(lon: number, lat: number, ring: readonly GeoPoint[]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function buildCountryIndex(shapes: Readonly<Record<string, CountryRings>>): CountryEntry[] {
  return Object.entries(shapes).map(([name, rings]) => ({ name, rings, bounds: boundsOf(rings) }));
}

export function countryAt(index: readonly CountryEntry[], lon: number, lat: number): string | null {
  for (const entry of index) {
    const [minLon, minLat, maxLon, maxLat] = entry.bounds;
    if (lon < minLon || lon > maxLon || lat < minLat || lat > maxLat) continue;
    for (const ring of entry.rings) {
      if (pointInRing(lon, lat, ring)) return entry.name;
    }
  }
  return null;
}

/** Index of the pin under the pointer, or -1 when the pointer misses every pin. */
export function hitPlace(
  places: readonly TerrainPlace[],
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number = PIN_HIT_RADIUS,
): number {
  let found = -1;
  places.forEach((place, index) => {
    const [px, py] = projectPoint(place.lon, place.lat, width, height);
    if (Math.hypot(x - px, y - py) <= radius) found = index;
  });
  return found;
}

interface CanvasPalette {
  ink: string;
  grid: string;
  home: string;
  study: string;
  journey: string;
  panel: string;
  panelLine: string;
}

function readPalette(): CanvasPalette {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    ink: read('--text', '#e9e7e2'),
    grid: read('--grid-line', 'rgba(233,231,226,.055)'),
    home: read('--accent', '#ff5a2c'),
    study: read('--accent-2', '#6fd3e0'),
    journey: read('--text-3', '#7e838c'),
    panel: read('--bg-elevated', '#13161a'),
    panelLine: read('--line-strong', 'rgba(233,231,226,.2)'),
  };
}

function kindColor(palette: CanvasPalette, kind: PlaceKind): string {
  if (kind === 'home') return palette.home;
  if (kind === 'study') return palette.study;
  return palette.journey;
}

export function initTerrain(): void {
  const host = select<HTMLElement>('[data-terrain]');
  const canvas = host ? select<HTMLCanvasElement>('canvas', host) : null;
  const context = canvas?.getContext('2d');
  if (!host || !canvas || !context) return;

  const index = buildCountryIndex(SHAPES);
  const home = PLACES.find((place) => place.kind === 'home') ?? PLACES[0];
  const paint = context;

  let palette = readPalette();
  let width = 1;
  let height = 1;
  let hovered = -1;
  let hoveredCountry: string | null = null;
  let elapsed = 0;
  let dirty = true;

  // Drawing happens in CSS pixels; the device ratio only widens the backing store.
  const resize = () => {
    const ratio = pixelRatio(DPR_CAP);
    width = Math.max(1, host.clientWidth);
    height = Math.max(1, host.clientHeight);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    paint.setTransform(ratio, 0, 0, ratio, 0, 0);
    dirty = true;
  };

  const drawGrid = () => {
    paint.save();
    paint.strokeStyle = palette.grid;
    paint.lineWidth = 1;
    for (let lon = -20; lon <= 40; lon += 10) {
      const [x] = projectPoint(lon, LAT_MIN, width, height);
      paint.beginPath();
      paint.moveTo(x, 0);
      paint.lineTo(x, height);
      paint.stroke();
    }
    for (let lat = 35; lat <= 70; lat += 5) {
      const [, y] = projectPoint(LON_MIN, lat, width, height);
      paint.beginPath();
      paint.moveTo(0, y);
      paint.lineTo(width, y);
      paint.stroke();
    }
    paint.restore();
  };

  const trace = (rings: CountryRings) => {
    for (const ring of rings) {
      paint.beginPath();
      ring.forEach(([lon, lat], index) => {
        const [x, y] = projectPoint(lon, lat, width, height);
        if (index === 0) paint.moveTo(x, y);
        else paint.lineTo(x, y);
      });
      paint.closePath();
      paint.fill();
      paint.stroke();
    }
  };

  const drawCountries = () => {
    for (const entry of index) {
      const active = entry.name === hoveredCountry;
      paint.save();
      paint.fillStyle = active ? palette.home : palette.ink;
      paint.strokeStyle = active ? palette.home : palette.ink;
      paint.globalAlpha = active ? 0.18 : 0.05;
      paint.lineWidth = active ? 1 : 0.6;
      trace(entry.rings);
      paint.restore();
    }
  };

  const drawArcs = () => {
    const [homeX, homeY] = projectPoint(home.lon, home.lat, width, height);
    for (const place of PLACES) {
      if (place.id === home.id) continue;
      const [x, y] = projectPoint(place.lon, place.lat, width, height);
      paint.save();
      paint.beginPath();
      paint.moveTo(homeX, homeY);
      paint.quadraticCurveTo((homeX + x) / 2, (homeY + y) / 2 - ARC_LIFT, x, y);
      paint.strokeStyle = kindColor(palette, place.kind);
      paint.globalAlpha = 0.24;
      paint.lineWidth = 0.8;
      paint.setLineDash([3, 6]);
      paint.stroke();
      paint.restore();
    }
  };

  const drawPins = () => {
    const pulse = 0.5 + 0.5 * Math.sin(elapsed * 0.06);
    PLACES.forEach((place, placeIndex) => {
      const [x, y] = projectPoint(place.lon, place.lat, width, height);
      const active = placeIndex === hovered;
      const color = kindColor(palette, place.kind);

      paint.save();
      if (active) {
        paint.beginPath();
        paint.arc(x, y, PIN_HIT_RADIUS * 0.7 + pulse * 4, 0, Math.PI * 2);
        paint.strokeStyle = color;
        paint.globalAlpha = 0.2 * pulse;
        paint.lineWidth = 1;
        paint.stroke();
      }
      paint.shadowColor = color;
      paint.shadowBlur = active ? 16 : 8;
      paint.fillStyle = color;
      paint.beginPath();
      paint.arc(x, y, active ? PIN_RADIUS + 1.4 : PIN_RADIUS, 0, Math.PI * 2);
      paint.fill();
      paint.restore();
    });
  };

  const drawTooltip = (place: TerrainPlace) => {
    const [x, y] = projectPoint(place.lon, place.lat, width, height);
    paint.save();
    paint.font = '500 10.5px "JetBrains Mono", monospace';
    const head = paint.measureText(place.label);
    paint.font = '400 9.5px "JetBrains Mono", monospace';
    const note = paint.measureText(place.note);
    const left = x + 13;
    const top = y - 12;

    paint.fillStyle = palette.panel;
    paint.strokeStyle = palette.panelLine;
    paint.lineWidth = 1;
    paint.beginPath();
    paint.roundRect(left - 5, top - 15, Math.max(head.width, note.width) + 20, 34, 2);
    paint.fill();
    paint.stroke();

    paint.fillStyle = palette.ink;
    paint.font = '500 10.5px "JetBrains Mono", monospace';
    paint.fillText(place.label, left, top);
    paint.fillStyle = palette.journey;
    paint.font = '400 9.5px "JetBrains Mono", monospace';
    paint.fillText(place.note, left, top + 13);
    paint.restore();
  };

  const draw = () => {
    paint.clearRect(0, 0, width, height);
    drawGrid();
    drawCountries();
    drawArcs();
    drawPins();
    if (hovered >= 0) drawTooltip(PLACES[hovered]);
  };

  const frame = () => {
    if (dirty) {
      draw();
      dirty = false;
    } else if (hovered >= 0) {
      elapsed += 0.6;
      draw();
    }
    requestAnimationFrame(frame);
  };

  on(canvas, 'pointermove', (event) => {
    const pointer = event as PointerEvent;
    const rect = canvas.getBoundingClientRect();
    const x = (pointer.clientX - rect.left) * (width / (rect.width || width));
    const y = (pointer.clientY - rect.top) * (height / (rect.height || height));
    hovered = hitPlace(PLACES, x, y, width, height);
    const [lon, lat] = unprojectPoint(x, y, width, height);
    hoveredCountry = hovered >= 0 ? null : countryAt(index, lon, lat);
    canvas.style.cursor = hovered >= 0 || hoveredCountry ? 'pointer' : 'default';
    dirty = true;
  });

  on(canvas, 'pointerleave', () => {
    hovered = -1;
    hoveredCountry = null;
    dirty = true;
  });

  on(document, 'mn:themechange', () => {
    palette = readPalette();
    dirty = true;
  });

  new ResizeObserver(resize).observe(host);

  resize();
  document.fonts.ready.then(() => {
    dirty = true;
  });
  requestAnimationFrame(frame);
}
