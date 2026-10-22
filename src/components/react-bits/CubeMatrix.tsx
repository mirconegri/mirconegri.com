import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const SIZE = 6;
const COUNT = SIZE * SIZE * SIZE; // 216 cubes

const CUBE_VERTICES = new Float32Array([
  // Front
  -0.5, -0.5, -0.5,  0.5, -0.5, -0.5,  0.5,  0.5, -0.5,
  -0.5, -0.5, -0.5,  0.5,  0.5, -0.5, -0.5,  0.5, -0.5,
  // Back
   0.5, -0.5,  0.5, -0.5, -0.5,  0.5, -0.5,  0.5,  0.5,
   0.5, -0.5,  0.5, -0.5,  0.5,  0.5,  0.5,  0.5,  0.5,
  // Bottom
  -0.5, -0.5, -0.5, -0.5, -0.5,  0.5,  0.5, -0.5,  0.5,
  -0.5, -0.5, -0.5,  0.5, -0.5,  0.5,  0.5, -0.5, -0.5,
  // Top
  -0.5,  0.5,  0.5, -0.5,  0.5, -0.5,  0.5,  0.5, -0.5,
  -0.5,  0.5,  0.5,  0.5,  0.5, -0.5,  0.5,  0.5,  0.5,
  // Left
  -0.5, -0.5,  0.5, -0.5, -0.5, -0.5, -0.5,  0.5, -0.5,
  -0.5, -0.5,  0.5, -0.5,  0.5, -0.5, -0.5,  0.5,  0.5,
  // Right
   0.5, -0.5, -0.5,  0.5, -0.5,  0.5,  0.5,  0.5,  0.5,
   0.5, -0.5, -0.5,  0.5,  0.5,  0.5,  0.5,  0.5, -0.5,
]);

const CUBE_NORMALS = new Float32Array([
  // Front
  0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1,  0, 0, -1,
  // Back
  0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,   0, 0, 1,
  // Bottom
  0, -1, 0,  0, -1, 0,  0, -1, 0,  0, -1, 0,  0, -1, 0,  0, -1, 0,
  // Top
  0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,   0, 1, 0,
  // Left
  -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
  // Right
  1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,   1, 0, 0,
]);

const CUBE_UVS = new Float32Array([
  // 6 faces * 6 vertices * 2 coords
  0,0, 1,0, 1,1,  0,0, 1,1, 0,1,
  0,0, 1,0, 1,1,  0,0, 1,1, 0,1,
  0,0, 1,0, 1,1,  0,0, 1,1, 0,1,
  0,0, 1,0, 1,1,  0,0, 1,1, 0,1,
  0,0, 1,0, 1,1,  0,0, 1,1, 0,1,
  0,0, 1,0, 1,1,  0,0, 1,1, 0,1,
]);

const VERTEX_SHADER = `
precision highp float;

attribute vec3 instancePos1;
attribute vec3 instancePos2;
attribute vec3 instanceRot;
attribute vec3 instanceCol;
attribute float instanceScale;

uniform float uTime;
uniform float uExplodeOverride;
uniform float uManualExplode;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;
varying vec2 vUv;

mat4 rotX(float a) {
  float c = cos(a), s = sin(a);
  return mat4(1.0, 0.0, 0.0, 0.0,  0.0, c, -s, 0.0,  0.0, s, c, 0.0,  0.0, 0.0, 0.0, 1.0);
}

mat4 rotY(float a) {
  float c = cos(a), s = sin(a);
  return mat4(c, 0.0, s, 0.0,  0.0, 1.0, 0.0, 0.0,  -s, 0.0, c, 0.0,  0.0, 0.0, 0.0, 1.0);
}

mat4 rotZ(float a) {
  float c = cos(a), s = sin(a);
  return mat4(c, -s, 0.0, 0.0,  s, c, 0.0, 0.0,  0.0, 0.0, 1.0, 0.0,  0.0, 0.0, 0.0, 1.0);
}

void main() {
  vColor = instanceCol;
  vUv = uv;

  float autoAnim = pow(sin(uTime * 0.9) * 0.5 + 0.5, 12.0);
  float anim = mix(autoAnim, uManualExplode, uExplodeOverride);

  vec3 currentPos = mix(instancePos1, instancePos2, anim);

  mat4 model = mat4(1.0);
  model[3].xyz = currentPos;

  // Individual cube rotation
  float localSpin = uTime * 1.2 + instanceRot.x * 2.0;
  model = model * rotY(localSpin) * rotX(instanceRot.y) * rotZ(instanceRot.z);

  model[0] *= instanceScale;
  model[1] *= instanceScale;
  model[2] *= instanceScale;

  mat3 normMat = mat3(
    model[0].xyz / (instanceScale * instanceScale),
    model[1].xyz / (instanceScale * instanceScale),
    model[2].xyz / (instanceScale * instanceScale)
  );

  vNormal = normalize(normMat * normal);
  vec4 worldPos = model * vec4(position, 1.0);
  vPosition = worldPos.xyz;

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const FRAGMENT_SHADER = `
precision highp float;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;
varying vec2 vUv;

uniform vec3 lightPosition;
uniform vec3 lightColor;
uniform float lightIntensity;
uniform vec3 ambientColor;
uniform float specularPower;
uniform vec3 cameraPos;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 lightDir = normalize(lightPosition - vPosition);
  vec3 viewDir = normalize(cameraPos - vPosition);

  // Diffuse
  float diff = max(dot(normal, lightDir), 0.0);
  vec3 diffuse = lightColor * diff * lightIntensity;

  // Holographic border & hollow center
  vec2 cuv = abs(vUv - vec2(0.5));
  float centerDist = length(cuv) * 2.0;

  // Specular reflection
  vec3 reflectDir = reflect(-lightDir, normal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), specularPower);
  vec3 specular = vec3(1.0, 0.35, 0.15) * spec * lightIntensity;

  vec3 lighting = ambientColor + diffuse + specular;

  // Hollow framed cube mask
  float alpha = smoothstep(0.26, 0.32, max(cuv.x, cuv.y));
  vec3 result = vColor * (lighting * (1.0 - centerDist + 0.6)) * alpha;

  if (alpha < 0.05) discard;

  gl_FragColor = vec4(result, alpha * 0.95);
}
`;

export default function CubeMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isExploded, setIsExploded] = useState(false);
  const manualExplodeRef = useRef(0);
  const explodeOverrideRef = useRef(0);

  const isItalian = typeof document !== 'undefined' && document.documentElement.lang === 'it';

  const toggleExplosion = () => {
    const nextState = !isExploded;
    setIsExploded(nextState);
    explodeOverrideRef.current = 1.0;
    manualExplodeRef.current = nextState ? 1.0 : 0.0;
  };

  const resumeAuto = () => {
    explodeOverrideRef.current = 0.0;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const width = container.clientWidth || window.innerWidth;
    const height = Math.max(340, Math.min(460, width * 0.4));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(11, 9, 13);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Custom Instanced Geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(CUBE_VERTICES, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(CUBE_NORMALS, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(CUBE_UVS, 2));

    const pos1Data = new Float32Array(COUNT * 3);
    const pos2Data = new Float32Array(COUNT * 3);
    const rotData = new Float32Array(COUNT * 3);
    const colData = new Float32Array(COUNT * 3);
    const scaleData = new Float32Array(COUNT);

    const getGridPos = (i: number) => {
      const x = i % SIZE;
      const y = Math.floor(i / SIZE) % SIZE;
      const z = Math.floor(i / (SIZE * SIZE));
      return [(x - 2.5) * 0.95, (y - 2.5) * 0.95, (z - 2.5) * 0.95];
    };

    const getRandomPos = (p: number[]) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 3.0 + Math.random() * 4.5;
      return [
        p[0] * 1.5 + Math.cos(angle) * dist * 0.6,
        p[1] * 1.5 + (Math.random() - 0.5) * 6.0,
        p[2] * 1.5 + Math.sin(angle) * dist * 0.6,
      ];
    };

    for (let i = 0; i < COUNT; i++) {
      const p1 = getGridPos(i);
      const p2 = getRandomPos(p1);

      pos1Data[i * 3] = p1[0];
      pos1Data[i * 3 + 1] = p1[1];
      pos1Data[i * 3 + 2] = p1[2];

      pos2Data[i * 3] = p2[0];
      pos2Data[i * 3 + 1] = p2[1];
      pos2Data[i * 3 + 2] = p2[2];

      rotData[i * 3] = Math.random() * Math.PI;
      rotData[i * 3 + 1] = Math.random() * Math.PI;
      rotData[i * 3 + 2] = Math.random() * Math.PI;

      // Color scheme: warm orange, cyan, and gold accents
      const normY = (p1[1] + 2.5) / 5.0;
      const normZ = (p1[2] + 2.5) / 5.0;

      colData[i * 3] = 0.95 - normY * 0.5; // Red / orange
      colData[i * 3 + 1] = 0.35 + normZ * 0.55; // Cyan / green
      colData[i * 3 + 2] = 0.2 + normY * 0.7; // Blue

      scaleData[i] = 0.42;
    }

    geometry.setAttribute('instancePos1', new THREE.InstancedBufferAttribute(pos1Data, 3));
    geometry.setAttribute('instancePos2', new THREE.InstancedBufferAttribute(pos2Data, 3));
    geometry.setAttribute('instanceRot', new THREE.InstancedBufferAttribute(rotData, 3));
    geometry.setAttribute('instanceCol', new THREE.InstancedBufferAttribute(colData, 3));
    geometry.setAttribute('instanceScale', new THREE.InstancedBufferAttribute(scaleData, 1));

    const uniforms = {
      uTime: { value: 0 },
      uExplodeOverride: { value: 0.0 },
      uManualExplode: { value: 0.0 },
      lightPosition: { value: new THREE.Vector3(6, 8, 10) },
      lightColor: { value: new THREE.Vector3(1.0, 0.45, 0.2) },
      lightIntensity: { value: 2.2 },
      ambientColor: { value: new THREE.Vector3(0.18, 0.16, 0.24) },
      specularPower: { value: 4.0 },
      cameraPos: { value: new THREE.Vector3() },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    const instancedMesh = new THREE.InstancedMesh(geometry, material, COUNT);
    scene.add(instancedMesh);

    // Damping rotation group
    const pivot = new THREE.Group();
    scene.add(pivot);
    pivot.add(instancedMesh);

    // Mouse Controls
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += dx * 0.008;
      targetRotX += dy * 0.008;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = Math.max(340, Math.min(460, w * 0.4));
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();

    const loop = () => {
      animId = requestAnimationFrame(loop);
      const elapsed = clock.getElapsedTime();

      uniforms.uTime.value = elapsed;
      uniforms.uExplodeOverride.value = explodeOverrideRef.current;
      uniforms.uManualExplode.value = manualExplodeRef.current;

      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentRotX += (targetRotX - currentRotX) * 0.08;

      pivot.rotation.y = currentRotY + elapsed * 0.15;
      pivot.rotation.x = currentRotX + Math.sin(elapsed * 0.2) * 0.06;

      camera.lookAt(0, 0, 0);
      uniforms.cameraPos.value.copy(camera.position);

      renderer.render(scene, camera);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="cube-matrix-wrap" ref={containerRef}>
      <div className="cube-matrix-head">
        <div className="cube-matrix-label">
          <span className="cube-matrix-dot" />
          <span>
            {isItalian
              ? 'Architettura dei Dati • 216 Micro-moduli instanziati'
              : 'Data Architecture • 216 Instanced Micro-modules'}
          </span>
        </div>

        <div className="cube-matrix-actions">
          <button
            type="button"
            className={`chip chip--matrix ${isExploded ? 'is-active' : ''}`}
            onClick={toggleExplosion}
          >
            {isExploded
              ? isItalian ? 'Ricomponi 🧊' : 'Reassemble 🧊'
              : isItalian ? 'Disperdi 💥' : 'Disperse 💥'}
          </button>
          {explodeOverrideRef.current > 0 && (
            <button
              type="button"
              className="chip chip--matrix"
              onClick={resumeAuto}
            >
              {isItalian ? 'Auto ↻' : 'Auto ↻'}
            </button>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="cube-matrix-canvas" />

      <p className="cube-matrix-footnote">
        {isItalian
          ? 'Trascina per ruotare la matrice • Dalla struttura solida alla nuvola cinetica'
          : 'Drag to rotate matrix • From solid architecture to kinetic cloud'}
      </p>
    </div>
  );
}
