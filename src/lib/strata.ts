import * as THREE from 'three';
import { gsap } from 'gsap';
import { on, select } from './dom';
import { prefersReducedMotion } from './env';

/**
 * Three.js + Custom GLSL Organic Noise Sphere & Particle Swarm
 */

const BACKGROUND_FRAGMENT = `
float hue2rgb(float f1, float f2, float hue) {
    if (hue < 0.0)
        hue += 1.0;
    else if (hue > 1.0)
        hue -= 1.0;
    float res;
    if ((6.0 * hue) < 1.0)
        res = f1 + (f2 - f1) * 6.0 * hue;
    else if ((2.0 * hue) < 1.0)
        res = f2;
    else if ((3.0 * hue) < 2.0)
        res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;
    else
        res = f1;
    return res;
}

vec3 hsl2rgb(vec3 hsl) {
    vec3 rgb;
    
    if (hsl.y == 0.0) {
        rgb = vec3(hsl.z);
    } else {
        float f2;
        
        if (hsl.z < 0.5)
            f2 = hsl.z * (1.0 + hsl.y);
        else
            f2 = hsl.z + hsl.y - hsl.y * hsl.z;
            
        float f1 = 2.0 * hsl.z - f2;
        
        rgb.r = hue2rgb(f1, f2, hsl.x + (1.0/3.0));
        rgb.g = hue2rgb(f1, f2, hsl.x);
        rgb.b = hue2rgb(f1, f2, hsl.x - (1.0/3.0));
    }   
    return rgb;
}

vec3 random3(vec3 c) {
    float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
    vec3 r;
    r.z = fract(512.0 * j);
    j *= 0.125;
    r.x = fract(512.0 * j);
    j *= 0.125;
    r.y = fract(512.0 * j);
    return r - 0.5;
}

const float F3 = 0.3333333;
const float G3 = 0.1666667;

float simplex3d(vec3 p) {
    vec3 s = floor(p + dot(p, vec3(F3)));
    vec3 x = p - s + dot(s, vec3(G3));
    
    vec3 e = step(vec3(0.0), x - x.yzx);
    vec3 i1 = e * (1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy * (1.0 - e);
    
    vec3 x1 = x - i1 + G3;
    vec3 x2 = x - i2 + 2.0 * G3;
    vec3 x3 = x - 1.0 + 3.0 * G3;
    
    vec4 w, d;
    w.x = dot(x, x);
    w.y = dot(x1, x1);
    w.z = dot(x2, x2);
    w.w = dot(x3, x3);
    
    w = max(0.6 - w, 0.0);
    
    d.x = dot(random3(s), x);
    d.y = dot(random3(s + i1), x1);
    d.z = dot(random3(s + i2), x2);
    d.w = dot(random3(s + 1.0), x3);
    
    w *= w;
    w *= w;
    d *= w;
    
    return dot(d, vec4(52.0));
}

float hash(vec2 p) {
    return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x))));
}

varying vec2 vUv;
uniform float u_time;
uniform float u_isDark;

void main() {    
    float n = simplex3d(vec3(vUv.xy, u_time * 1.0));
    vec3 darkColor = hsl2rgb(vec3(0.0 + n * 0.1, 0.0, 0.03));
    vec3 lightColor = hsl2rgb(vec3(0.0 + n * 0.1, 0.0, 0.95));
    vec3 color = mix(lightColor, darkColor, u_isDark);
    
    float val = hash(vUv + u_time);
    gl_FragColor = vec4(color + vec3(val / 20.0), 1.0);
}
`;

const BACKGROUND_VERTEX = `
varying vec2 vUv;
uniform float u_time;

void main() {
    vec3 p = position;
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = 10.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
}
`;

const PARTICLE_FRAGMENT = `
uniform float u_progress;
uniform float u_isDark;

void main() {
    vec3 particleCol = mix(vec3(0.2, 0.2, 0.2), vec3(0.65, 0.65, 0.65), u_isDark);
    gl_FragColor = vec4(particleCol, u_progress);
}
`;

const PARTICLE_VERTEX = `
uniform float u_time;

void main() {
    vec3 p = position;
    p.y += 0.25 * (sin(p.y * 5.0 + u_time) * 0.5 + 0.5);
    p.z += 0.05 * (sin(p.y * 10.0 + u_time) * 0.5 + 0.5);
    
    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = 10.0 * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

const SPHERE_FRAGMENT = `
varying vec2 vUv;
varying vec3 v_color;
varying vec3 v_normal;

void main() {
    vec3 light = vec3(0.0);
    vec3 skyColor = vec3(1.000, 1.000, 0.547);
    vec3 groundColor = vec3(0.562, 0.275, 0.111);
    
    vec3 lightDirection = normalize(vec3(0.0, -1.0, -1.0));
    light += dot(lightDirection, v_normal);
    light = mix(skyColor, groundColor, dot(lightDirection, v_normal));
    
    gl_FragColor = vec4(light * v_color, 1.0);
}
`;

const SPHERE_VERTEX = `
varying vec2 vUv;
varying vec3 v_color;
varying vec3 v_normal;

uniform float u_time;
uniform float u_progress;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 1.0 / 7.0;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

void main() {
    vUv = uv;
    float noise = snoise(position * u_progress + u_time / 10.0);
    vec3 newPos = position * (noise + 0.7);
    v_color = hsv2rgb(vec3(noise * 0.1 + 0.03, 0.7, 0.7));
    v_normal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`;

class THREEScene {
  private canvas: HTMLCanvasElement;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private sphereMaterial: THREE.ShaderMaterial;
  private pointsMaterial: THREE.ShaderMaterial;
  private backgroundMaterial: THREE.ShaderMaterial;
  private points: THREE.Points;
  private sphere: THREE.Mesh;
  private backgroundMesh: THREE.Mesh;
  private clock: THREE.Clock;
  private isReduced: boolean;
  private targetYaw = 0;
  private targetPitch = 0;
  private currentYaw = 0;
  private currentPitch = 0;
  private isRunning = true;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.isReduced = prefersReducedMotion();

    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 10);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const isDark = document.documentElement.dataset.theme !== 'light' ? 1.0 : 0.0;

    this.sphereMaterial = new THREE.ShaderMaterial({
      vertexShader: SPHERE_VERTEX,
      fragmentShader: SPHERE_FRAGMENT,
      wireframe: false,
      uniforms: {
        u_time: { value: 0 },
        u_progress: { value: 1.0 },
      },
    });

    this.pointsMaterial = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
      wireframe: false,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      uniforms: {
        u_time: { value: 0 },
        u_progress: { value: 0.0 },
        u_isDark: { value: isDark },
      },
    });

    this.backgroundMaterial = new THREE.ShaderMaterial({
      vertexShader: BACKGROUND_VERTEX,
      fragmentShader: BACKGROUND_FRAGMENT,
      wireframe: false,
      depthWrite: false,
      uniforms: {
        u_time: { value: 0 },
        u_progress: { value: 0 },
        u_isDark: { value: isDark },
      },
    });

    // Main organic morphing sphere
    const sphereGeometry = new THREE.SphereGeometry(1, 140, 140);
    this.sphere = new THREE.Mesh(sphereGeometry, this.sphereMaterial);
    this.scene.add(this.sphere);

    // Surrounding particle swarm
    const N = 26000;
    const positions = new Float32Array(N * 3);
    const particleGeometry = new THREE.BufferGeometry();
    const inc = Math.PI * (3 - Math.sqrt(5));
    const offset = 2 / N;
    const radius = 2.0;

    for (let i = 0; i < N; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * inc;

      positions[3 * i] = radius * Math.cos(phi) * r;
      positions[3 * i + 1] = radius * y;
      positions[3 * i + 2] = radius * Math.sin(phi) * r;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.points = new THREE.Points(particleGeometry, this.pointsMaterial);
    this.scene.add(this.points);

    // Ambient noise background plane
    const bgGeometry = new THREE.PlaneGeometry(120, 80, 16);
    this.backgroundMesh = new THREE.Mesh(bgGeometry, this.backgroundMaterial);
    this.backgroundMesh.position.z = -5;
    this.scene.add(this.backgroundMesh);

    this.eventListeners();
    this.animate();
    this.render();
  }

  private animate(): void {
    if (this.isReduced) {
      this.sphereMaterial.uniforms.u_progress.value = 1.2;
      this.pointsMaterial.uniforms.u_progress.value = 0.35;
      return;
    }

    gsap.timeline({
      repeat: -1,
      yoyo: true,
    })
      .to(this.sphereMaterial.uniforms.u_progress, {
        value: 5,
        duration: 5,
        ease: 'power3.inOut',
      })
      .to(this.sphereMaterial.uniforms.u_progress, {
        value: 1,
        duration: 5,
        ease: 'power3.inOut',
      });

    gsap.to(this.pointsMaterial.uniforms.u_progress, {
      value: 0.4,
      duration: 5,
      ease: 'power3.inOut',
    });
  }

  private render = (): void => {
    if (!this.isRunning) return;

    const elapsedTime = this.clock.getElapsedTime();
    this.sphereMaterial.uniforms.u_time.value = elapsedTime;
    this.pointsMaterial.uniforms.u_time.value = elapsedTime;
    this.backgroundMaterial.uniforms.u_time.value = elapsedTime;

    // Orbital spin
    this.points.rotation.y += 0.005;

    if (!this.isReduced) {
      this.currentYaw += (this.targetYaw - this.currentYaw) * 0.05;
      this.currentPitch += (this.targetPitch - this.currentPitch) * 0.05;
      this.sphere.rotation.y = this.currentYaw + elapsedTime * 0.06;
      this.sphere.rotation.x = this.currentPitch;
      this.points.rotation.x = this.currentPitch * 0.4;
    }

    this.camera.lookAt(this.scene.position);
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.render);
  };

  private eventListeners(): void {
    on(window, 'resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });

    on(window, 'pointermove', (event) => {
      const pointer = event as PointerEvent;
      this.targetYaw = ((pointer.clientX / window.innerWidth) * 2 - 1) * 0.4;
      this.targetPitch = -((pointer.clientY / window.innerHeight) * 2 - 1) * 0.25;
    }, { passive: true });

    on(document, 'visibilitychange', () => {
      if (document.hidden) {
        this.isRunning = false;
      } else {
        this.isRunning = true;
        this.clock.start();
        requestAnimationFrame(this.render);
      }
    });

    on(document, 'mn:themechange', () => {
      const isDark = document.documentElement.dataset.theme !== 'light' ? 1.0 : 0.0;
      this.pointsMaterial.uniforms.u_isDark.value = isDark;
      this.backgroundMaterial.uniforms.u_isDark.value = isDark;
    });
  }
}

export function initStrata(): void {
  const canvas = select<HTMLCanvasElement>('[data-strata]');
  const root = document.documentElement;
  if (!canvas) return;

  try {
    new THREEScene(canvas);
    root.classList.add('strata-live');
  } catch (error) {
    console.error('Three.js scene initialization failed:', error);
    root.classList.remove('strata-live');
  }
}
