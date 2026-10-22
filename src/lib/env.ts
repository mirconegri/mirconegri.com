/** Environment probes and numeric helpers shared by the runtime modules. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

/** Frame-rate independent approach towards a target value. */
export function damp(current: number, target: number, smoothing: number, delta: number): number {
  return lerp(current, target, 1 - Math.exp(-smoothing * delta));
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Null when the browser cannot create a WebGL2 context. */
export function createWebGL2(canvas: HTMLCanvasElement): WebGL2RenderingContext | null {
  try {
    return canvas.getContext('webgl2', { antialias: false, alpha: true });
  } catch {
    return null;
  }
}

export function pixelRatio(cap: number): number {
  return Math.min(window.devicePixelRatio || 1, cap);
}
