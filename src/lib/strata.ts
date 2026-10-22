import { on, select } from './dom';
import { clamp, createWebGL2, damp, pixelRatio, prefersReducedMotion } from './env';
import { activeSectionIndex, rectsOf, sheets } from './sections';

/** Vertical drill core: one full screen quad, one draw call, no geometry to load. */

const LAYER_COUNT = 28;
const UNIFORM_SLOTS = 32;
const DPR_CAP = 1.5;
const LAYER_DENSITY = 3.4;
const CAMERA_Z = 2.95;
const FOV = 0.62;
const IDLE_YAW_SPEED = 0.08;
const POINTER_YAW = 0.34;
const POINTER_PITCH = 0.1;
const OFFSET_SMOOTHING = 3.2;
const CANVAS_STRENGTH = 0.9;
const VISIBILITY_INTERVAL = 8;

const VERTEX_SHADER = `#version 300 es
precision highp float;

void main() {
  vec2 corner = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

const float LAYERS = ${LAYER_COUNT}.0;
const vec3 BOX = vec3(1.0, 2.6, 0.5);
const float FOV = ${FOV};

uniform vec2 uResolution;
uniform vec3 uLayers[${UNIFORM_SLOTS}];
uniform vec3 uInk;
uniform vec3 uAccent;
uniform float uOffset;
uniform float uActive;
uniform float uYaw;
uniform float uPitch;
uniform float uDensity;

out vec4 fragColor;

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.y;
  float aspect = uResolution.x / uResolution.y;

  vec3 ro = vec3(0.0, 0.0, ${CAMERA_Z});
  vec3 rd = vec3(uv.x * FOV * aspect, uv.y * FOV, -1.0);

  float cy = cos(uYaw);
  float sy = sin(uYaw);
  rd = vec3(rd.x * cy - rd.z * sy, rd.y, rd.x * sy + rd.z * cy);

  float cp = cos(uPitch);
  float sp = sin(uPitch);
  rd = vec3(rd.x, rd.y * cp - rd.z * sp, rd.y * sp + rd.z * cp);
  rd = normalize(rd);

  vec3 near = (-BOX - ro) / rd;
  vec3 far = (BOX - ro) / rd;
  vec3 entry = min(near, far);
  vec3 exit = max(near, far);

  float start = max(max(entry.x, entry.y), entry.z);
  float end = min(min(exit.x, exit.y), exit.z);
  if (end < max(start, 0.0)) {
    fragColor = vec4(0.0);
    return;
  }

  vec3 point = ro + rd * (start > 0.0 ? start : end);

  float layer = point.y * uDensity + uOffset;
  float wobble = sin(point.x * 5.5 + floor(layer) * 1.9) * 0.05
               + sin(point.x * 12.0 + floor(layer) * 0.7) * 0.022;
  layer += wobble;

  float index = floor(layer);
  vec3 colour = uLayers[int(mod(index, LAYERS))];

  bool front = entry.z >= entry.x && entry.z >= entry.y;
  colour *= front ? 1.0 : 0.55;
  colour *= clamp(1.0 - (length(point - ro) - 2.45) * 0.3, 0.5, 1.0);

  float boundary = 0.5 - abs(fract(layer) - 0.5);
  float line = 1.0 - smoothstep(0.0, 0.014, boundary);
  colour = mix(colour, uInk, line * (front ? 0.42 : 0.22));

  float focus = 1.0 - smoothstep(0.0, 1.4, abs(index - uActive));
  colour += uAccent * focus * 0.4;

  float fade = smoothstep(1.0, 0.5, abs(uv.y)) * smoothstep(aspect, aspect * 0.6, abs(uv.x));
  float alpha = fade * ${CANVAS_STRENGTH};

  fragColor = vec4(colour * alpha, alpha);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.error('Strata shader failed to compile', gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

interface Program {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
}

function buildProgram(gl: WebGL2RenderingContext): Program | null {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Strata program failed to link', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  const names = ['uResolution', 'uLayers[0]', 'uInk', 'uAccent', 'uOffset', 'uActive', 'uYaw', 'uPitch', 'uDensity'];
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  for (const name of names) uniforms[name] = gl.getUniformLocation(program, name);

  return { program, uniforms };
}

export function parseColor(value: string): [number, number, number] {
  const text = value.trim();
  const short = text.match(/^#([0-9a-f]{3})$/i);
  if (short) {
    return [0, 1, 2].map((i) => Number.parseInt(short[1][i].repeat(2), 16) / 255) as [number, number, number];
  }
  const long = text.match(/^#([0-9a-f]{6})/i);
  if (long) {
    return [0, 2, 4].map((i) => Number.parseInt(long[1].slice(i, i + 2), 16) / 255) as [number, number, number];
  }
  const channels = text.match(/-?\d*\.?\d+/g);
  if (channels && channels.length >= 3) {
    const [r, g, b] = channels.slice(0, 3).map(Number);
    return [clamp(r / 255, 0, 1), clamp(g / 255, 0, 1), clamp(b / 255, 0, 1)];
  }
  return [0, 0, 0];
}

export function mixColor(from: readonly [number, number, number], to: readonly [number, number, number], amount: number): [number, number, number] {
  const t = clamp(amount, 0, 1);
  return [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t, from[2] + (to[2] - from[2]) * t];
}

export interface StrataColors {
  rock: string;
  deep: string;
  accent: string;
  accent2: string;
}

/** Deterministic banding, so the same theme always draws the same core. */
export function buildLayerPalette(colors: StrataColors, count: number): Float32Array {
  const rock = parseColor(colors.rock);
  const deep = parseColor(colors.deep);
  const accent = parseColor(colors.accent);
  const accent2 = parseColor(colors.accent2);
  const palette = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const position = count <= 1 ? 0 : index / (count - 1);
    const wave = 0.5 + 0.5 * Math.sin(position * Math.PI * 2.4);
    const noise = Math.abs(Math.sin(index * 12.9898) * 43758.5453) % 1;
    const base = mixColor(deep, rock, 0.4 + noise * 0.5);
    const tint = wave >= 0.5 ? accent : accent2;
    const amount = Math.abs(wave - 0.5) * 2 * 0.3;
    const [r, g, b] = mixColor(base, tint, amount);
    palette[index * 3] = r;
    palette[index * 3 + 1] = g;
    palette[index * 3 + 2] = b;
  }

  return palette;
}

function readColors(): StrataColors {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    rock: read('--text-3', '#7e838c'),
    deep: read('--bg-inset', '#050608'),
    accent: read('--accent', '#ff5a2c'),
    accent2: read('--accent-2', '#6fd3e0'),
  };
}

export function initStrata(): void {
  const canvas = select<HTMLCanvasElement>('[data-strata]');
  const root = document.documentElement;
  if (!canvas) return;

  const gl = createWebGL2(canvas);
  const built = gl ? buildProgram(gl) : null;
  if (!gl || !built) {
    root.classList.remove('strata-live');
    return;
  }

  root.classList.add('strata-live');

  gl.bindVertexArray(gl.createVertexArray());
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.useProgram(built.program);

  const reduced = prefersReducedMotion();
  const sectionElements = sheets();
  const density = LAYER_DENSITY;
  const palette = { data: buildLayerPalette(readColors(), LAYER_COUNT) };

  let yaw = 0;
  let pitch = 0;
  let offset = 0.5;
  let active = 0;
  let pointerX = 0;
  let pointerY = 0;
  let elapsed = 0;
  let frame = 0;
  let viewportVisible = !document.hidden;
  let sectionsVisible = true;
  let scrolling = true;

  const uploadPalette = () => {
    palette.data = buildLayerPalette(readColors(), LAYER_COUNT);
    gl.uniform3fv(built.uniforms['uLayers[0]'] ?? null, palette.data);
    const styles = getComputedStyle(document.documentElement);
    gl.uniform3fv(built.uniforms.uInk ?? null, parseColor(styles.getPropertyValue('--line-strong').trim() || '#e9e7e2'));
    gl.uniform3fv(built.uniforms.uAccent ?? null, parseColor(styles.getPropertyValue('--accent').trim() || '#ff5a2c'));
  };

  const resize = () => {
    const ratio = pixelRatio(DPR_CAP);
    const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width === width && canvas.height === height) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    gl.uniform2f(built.uniforms.uResolution ?? null, width, height);
  };

  const updateSectionState = () => {
    if (!scrolling || sectionElements.length === 0) return;
    scrolling = false;
    const index = activeSectionIndex(rectsOf(sectionElements), window.innerHeight / 2);
    active = index;
  };

  // The core sample only needs frames while a translucent sheet is on screen.
  const coveredByOpaqueSheet = () =>
    !sectionElements.some((element) => {
      if (element.classList.contains('sheet--opaque')) return false;
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });

  const render = (delta: number) => {
    elapsed += delta;
    const targetYaw = reduced ? 0 : pointerX * POINTER_YAW + Math.sin(elapsed * IDLE_YAW_SPEED) * 0.06;
    const targetPitch = reduced ? 0 : pointerY * POINTER_PITCH;
    const targetOffset = active + 0.5;

    if (reduced) {
      yaw = targetYaw;
      pitch = targetPitch;
      offset = targetOffset;
    } else {
      yaw = damp(yaw, targetYaw, 3, delta);
      pitch = damp(pitch, targetPitch, 3, delta);
      offset = damp(offset, targetOffset, OFFSET_SMOOTHING, delta);
    }

    gl.uniform1f(built.uniforms.uOffset ?? null, offset);
    gl.uniform1f(built.uniforms.uActive ?? null, active);
    gl.uniform1f(built.uniforms.uYaw ?? null, yaw);
    gl.uniform1f(built.uniforms.uPitch ?? null, pitch);
    gl.uniform1f(built.uniforms.uDensity ?? null, density);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  let previous = performance.now();
  const loop = (time: number) => {
    const delta = Math.min(Math.max((time - previous) / 1000, 0), 0.05);
    previous = time;
    frame += 1;

    if (frame % VISIBILITY_INTERVAL === 0) sectionsVisible = !coveredByOpaqueSheet();
    if (viewportVisible && sectionsVisible) {
      updateSectionState();
      render(delta);
    }

    requestAnimationFrame(loop);
  };

  uploadPalette();
  resize();
  render(0);
  requestAnimationFrame(loop);

  on(window, 'resize', () => {
    resize();
    render(0);
  });
  on(document, 'scroll', () => {
    scrolling = true;
  }, { passive: true });
  on(document, 'visibilitychange', () => {
    viewportVisible = !document.hidden;
  });
  on(document, 'mn:themechange', () => {
    uploadPalette();
    render(0);
  });
  on(window, 'pointermove', (event) => {
    const pointer = event as PointerEvent;
    pointerX = (pointer.clientX / window.innerWidth) * 2 - 1;
    pointerY = (pointer.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });
}
