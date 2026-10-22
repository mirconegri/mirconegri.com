import { on, select } from './dom';
import { clamp, createWebGL2, damp, pixelRatio, prefersReducedMotion } from './env';
import { activeSectionIndex, rectsOf, sheets } from './sections';

/** Kinetic 3D geometric polyhedron: single full-screen quad raymarcher. */

const DPR_CAP = 1.5;
const CAMERA_Z = 3.2;
const IDLE_YAW_SPEED = 0.12;
const POINTER_YAW = 0.45;
const POINTER_PITCH = 0.25;
const OFFSET_SMOOTHING = 3.0;
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

uniform vec2 uResolution;
uniform vec3 uInk;
uniform vec3 uAccent;
uniform vec3 uAccent2;
uniform float uOffset;
uniform float uActive;
uniform float uYaw;
uniform float uPitch;
uniform float uTime;
uniform float uIsDark;

out vec4 fragColor;

mat2 rot(float a) {
  float c = cos(a), s = sin(a);
  return mat2(c, -s, s, c);
}

// Distance to an icosahedral faceted polyhedron
float sdPolyhedron(vec3 p, float r) {
  const float phi = 1.61803398875;
  const vec3 n1 = normalize(vec3(phi, 1.0, 0.0));
  const vec3 n2 = normalize(vec3(0.0, phi, 1.0));
  const vec3 n3 = normalize(vec3(1.0, 0.0, phi));
  vec3 ap = abs(p);
  float d = dot(ap, n1);
  d = max(d, dot(ap, n2));
  d = max(d, dot(ap, n3));
  d = max(d, (ap.x + ap.y + ap.z) * 0.57735);
  return d - r;
}

// Distance to inner core
float sdCore(vec3 p, float r) {
  return length(p) - r;
}

// Scene SDF
float map(vec3 p, out float matId, out float edgeDist) {
  float ico = sdPolyhedron(p, 1.12);
  float core = sdCore(p, 0.38);

  // Approximate edge distance for wireframe glow
  const float phi = 1.61803398875;
  const vec3 n1 = normalize(vec3(phi, 1.0, 0.0));
  const vec3 n2 = normalize(vec3(0.0, phi, 1.0));
  const vec3 n3 = normalize(vec3(1.0, 0.0, phi));
  vec3 ap = abs(p);
  float d1 = dot(ap, n1);
  float d2 = dot(ap, n2);
  float d3 = dot(ap, n3);
  edgeDist = min(abs(d1 - d2), min(abs(d2 - d3), abs(d3 - d1)));

  if (ico < core) {
    matId = 1.0;
    return ico;
  } else {
    matId = 2.0;
    return core;
  }
}

vec3 calcNormal(vec3 p) {
  float dummyMat, dummyEdge;
  const vec2 e = vec2(0.002, 0.0);
  return normalize(vec3(
    map(p + e.xyy, dummyMat, dummyEdge) - map(p - e.xyy, dummyMat, dummyEdge),
    map(p + e.yxy, dummyMat, dummyEdge) - map(p - e.yxy, dummyMat, dummyEdge),
    map(p + e.yyx, dummyMat, dummyEdge) - map(p - e.yyx, dummyMat, dummyEdge)
  ));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  float aspect = uResolution.x / uResolution.y;

  vec3 ro = vec3(0.0, 0.0, ${CAMERA_Z});
  vec3 rd = normalize(vec3(uv, -1.8));

  // Kinetic rotation: mouse orientation + idle drift + scroll-driven spin
  float ry = uYaw + uTime * 0.16 + uOffset * 0.75;
  float rx = uPitch + sin(uTime * 0.22) * 0.09;

  ro.yz = rot(rx) * ro.yz;
  rd.yz = rot(rx) * rd.yz;
  ro.xz = rot(ry) * ro.xz;
  rd.xz = rot(ry) * rd.xz;

  float t = 0.0;
  float matId = 0.0;
  float hitMat = 0.0;
  float hitEdge = 0.0;
  float glowCore = 0.0;
  float glowEdge = 0.0;

  for (int i = 0; i < 54; i++) {
    vec3 p = ro + rd * t;
    float edgeD;
    float d = map(p, matId, edgeD);

    // Volumetric glow accumulation
    float dCenter = length(p) - 0.38;
    glowCore += 0.008 / (0.04 + dCenter * dCenter);
    glowEdge += 0.002 / (0.01 + edgeD * edgeD);

    if (d < 0.001) {
      hitMat = matId;
      hitEdge = edgeD;
      break;
    }
    t += d * 0.85;
    if (t > 6.5) break;
  }

  vec3 col = vec3(0.0);

  if (t < 6.5) {
    vec3 p = ro + rd * t;
    vec3 n = calcNormal(p);
    vec3 v = -rd;
    float fresnel = pow(clamp(1.0 - dot(n, v), 0.0, 1.0), 2.2);

    if (hitMat < 1.5) {
      // Outer multifaceted polyhedron
      float wire = 1.0 - smoothstep(0.0, 0.035, hitEdge);
      vec3 facetEdge = mix(uAccent, uAccent2, 0.5 + 0.5 * sin(p.y * 3.5 + uTime * 0.5));
      
      vec3 darkSurface = mix(uInk * 0.06, uAccent * 0.12, fresnel);
      vec3 lightSurface = mix(vec3(0.92), uAccent * 0.3, fresnel);
      vec3 baseSurface = mix(lightSurface, darkSurface, uIsDark);

      col = mix(baseSurface, facetEdge, wire * 0.95);
      col += facetEdge * fresnel * 0.6;
    } else {
      // Inner glowing nucleus
      col = mix(uAccent, uAccent2, 0.6 + 0.4 * sin(uTime * 1.2));
    }
  }

  // Add ambient volumetric glow
  col += uAccent * (glowCore * 0.022);
  col += mix(uAccent, uAccent2, 0.5) * (glowEdge * 0.012);

  // Soft vignette fade at edges
  vec2 screen = gl_FragCoord.xy / uResolution;
  float vignette = smoothstep(0.0, 0.12, screen.x) * smoothstep(1.0, 0.88, screen.x) *
                   smoothstep(0.0, 0.12, screen.y) * smoothstep(1.0, 0.88, screen.y);

  float alpha = clamp(length(col) * 1.35, 0.0, 0.92) * vignette;
  fragColor = vec4(col, alpha);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.error('Polyhedron shader failed to compile', gl.getShaderInfoLog(shader));
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
    console.error('Polyhedron program failed to link', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  const names = [
    'uResolution',
    'uInk',
    'uAccent',
    'uAccent2',
    'uOffset',
    'uActive',
    'uYaw',
    'uPitch',
    'uTime',
    'uIsDark',
  ];
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

  let yaw = 0;
  let pitch = 0;
  let offset = 0.0;
  let active = 0;
  let pointerX = 0;
  let pointerY = 0;
  let elapsed = 0;
  let frame = 0;
  let viewportVisible = !document.hidden;
  let sectionsVisible = true;
  let scrolling = true;

  const uploadThemeUniforms = () => {
    const styles = getComputedStyle(document.documentElement);
    const ink = parseColor(styles.getPropertyValue('--line-strong').trim() || '#e9e7e2');
    const accent = parseColor(styles.getPropertyValue('--accent').trim() || '#ff5a2c');
    const accent2 = parseColor(styles.getPropertyValue('--accent-2').trim() || '#6fd3e0');
    const isDark = document.documentElement.dataset.theme !== 'light' ? 1.0 : 0.0;

    gl.uniform3fv(built.uniforms.uInk ?? null, ink);
    gl.uniform3fv(built.uniforms.uAccent ?? null, accent);
    gl.uniform3fv(built.uniforms.uAccent2 ?? null, accent2);
    gl.uniform1f(built.uniforms.uIsDark ?? null, isDark);
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

  const coveredByOpaqueSheet = () =>
    !sectionElements.some((element) => {
      if (element.classList.contains('sheet--opaque')) return false;
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });

  const render = (delta: number) => {
    elapsed += delta;
    const targetYaw = reduced ? 0 : pointerX * POINTER_YAW + Math.sin(elapsed * IDLE_YAW_SPEED) * 0.08;
    const targetPitch = reduced ? 0 : pointerY * POINTER_PITCH;
    const targetOffset = active * 0.8;

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
    gl.uniform1f(built.uniforms.uTime ?? null, elapsed);

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

  uploadThemeUniforms();
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
    uploadThemeUniforms();
    render(0);
  });
  on(window, 'pointermove', (event) => {
    const pointer = event as PointerEvent;
    pointerX = (pointer.clientX / window.innerWidth) * 2 - 1;
    pointerY = (pointer.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });
}
