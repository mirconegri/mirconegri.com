import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import fontData from '../../assets/helvetiker_bold.typeface.json';

export type MaterialPreset = 'chrome' | 'gold' | 'copper' | 'aluminum' | 'titanium' | 'pearl' | 'diamond' | 'car-paint';

interface PresetConfig {
  roughness: number;
  anisotropy: number;
  ior: number;
  clearcoat: number;
  dispersion: number;
  metalColor: [number, number, number];
}

export const MATERIAL_PRESETS: Record<MaterialPreset, PresetConfig> = {
  chrome: {
    roughness: 0.05,
    anisotropy: 0.15,
    ior: 2.95,
    clearcoat: 0.2,
    dispersion: 0.08,
    metalColor: [0.95, 0.95, 0.98],
  },
  gold: {
    roughness: 0.1,
    anisotropy: 0.2,
    ior: 0.47,
    clearcoat: 0.2,
    dispersion: 0.06,
    metalColor: [1.0, 0.766, 0.336],
  },
  copper: {
    roughness: 0.15,
    anisotropy: 0.2,
    ior: 0.46,
    clearcoat: 0.15,
    dispersion: 0.07,
    metalColor: [0.955, 0.637, 0.538],
  },
  aluminum: {
    roughness: 0.1,
    anisotropy: 0.8,
    ior: 1.39,
    clearcoat: 0.0,
    dispersion: 0.05,
    metalColor: [0.913, 0.921, 0.925],
  },
  titanium: {
    roughness: 0.2,
    anisotropy: 0.3,
    ior: 2.16,
    clearcoat: 0.1,
    dispersion: 0.05,
    metalColor: [0.542, 0.497, 0.449],
  },
  pearl: {
    roughness: 0.3,
    anisotropy: 0.0,
    ior: 1.7,
    clearcoat: 0.8,
    dispersion: 0.15,
    metalColor: [0.95, 0.95, 0.98],
  },
  diamond: {
    roughness: 0.01,
    anisotropy: 0.0,
    ior: 2.417,
    clearcoat: 1.0,
    dispersion: 0.25,
    metalColor: [0.98, 0.98, 1.0],
  },
  'car-paint': {
    roughness: 0.2,
    anisotropy: 0.0,
    ior: 1.5,
    clearcoat: 1.0,
    dispersion: 0.02,
    metalColor: [0.1, 0.1, 0.5],
  },
};

const VERTEX_SHADER = `
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying vec2 vUv;
varying vec3 vTangent;
varying vec3 vBitangent;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec3 objectTangent = vec3(1.0, 0.0, 0.0);
    vTangent = normalize(normalMatrix * objectTangent);
    vBitangent = cross(vNormal, vTangent);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * mvPosition;
}
`;

const FRAGMENT_SHADER = `
uniform float time;
uniform vec2 mousePosition;
uniform float roughness;
uniform float anisotropy;
uniform float ior;
uniform float clearcoat;
uniform float dispersion;
uniform vec3 metalColor;
uniform vec3 lightTemperature;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying vec2 vUv;
varying vec3 vTangent;
varying vec3 vBitangent;

vec3 fresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

float distributionGGX(vec3 N, vec3 H, float roughnessVal) {
    float a = roughnessVal * roughnessVal;
    float a2 = a * a;
    float NdotH = max(dot(N, H), 0.0);
    float NdotH2 = NdotH * NdotH;
    float num = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = 3.14159265359 * denom * denom;
    return num / denom;
}

float distributionAnisotropicGGX(vec3 N, vec3 H, vec3 T, vec3 B, float roughnessVal, float aniso) {
    float roughnessT = roughnessVal * (1.0 + aniso);
    float roughnessB = roughnessVal * (1.0 - aniso);
    float dotTH = dot(T, H);
    float dotBH = dot(B, H);
    float dotNH = dot(N, H);
    float a2 = roughnessT * roughnessB;
    float d = dotTH * dotTH / (roughnessT * roughnessT) + 
             dotBH * dotBH / (roughnessB * roughnessB) + 
             dotNH * dotNH;
    return 1.0 / (3.14159265359 * roughnessT * roughnessB * d * d);
}

float geometrySchlickGGX(float NdotV, float roughnessVal) {
    float r = (roughnessVal + 1.0);
    float k = (r * r) / 8.0;
    float num = NdotV;
    float denom = NdotV * (1.0 - k) + k;
    return num / denom;
}

float geometrySmith(vec3 N, vec3 V, vec3 L, float roughnessVal) {
    float NdotV = max(dot(N, V), 0.0);
    float NdotL = max(dot(N, L), 0.0);
    float ggx2 = geometrySchlickGGX(NdotV, roughnessVal);
    float ggx1 = geometrySchlickGGX(NdotL, roughnessVal);
    return ggx1 * ggx2;
}

void main() {
    vec3 normal = normalize(vNormal);
    vec3 tangent = normalize(vTangent);
    vec3 bitangent = normalize(vBitangent);
    vec3 viewDir = normalize(vViewPosition);

    vec3 lightPos1 = vec3(
        (mousePosition.x - 0.5) * 12.0,
        (mousePosition.y - 0.5) * 12.0,
        6.0
    );
    vec3 lightPos2 = vec3(-4.0, 4.0, 5.0);
    vec3 lightPos3 = vec3(4.0, -4.0, 5.0);

    vec3 color = vec3(0.0);
    vec3 lights[3];
    lights[0] = lightPos1;
    lights[1] = lightPos2;
    lights[2] = lightPos3;

    vec3 lightColors[3];
    lightColors[0] = lightTemperature;
    lightColors[1] = vec3(0.55, 0.55, 0.75) * lightTemperature;
    lightColors[2] = vec3(0.75, 0.55, 0.55) * lightTemperature;

    for (int i = 0; i < 3; i++) {
        vec3 lightDir = normalize(lights[i] - vWorldPosition);
        vec3 halfwayDir = normalize(lightDir + viewDir);

        float n1 = 1.0;
        float n2 = ior;
        float F0_scalar = pow((n1 - n2) / (n1 + n2), 2.0);
        vec3 F0 = mix(vec3(F0_scalar), metalColor, 0.95);

        float D = distributionAnisotropicGGX(normal, halfwayDir, tangent, bitangent, roughness, anisotropy);
        float G = geometrySmith(normal, viewDir, lightDir, roughness);
        vec3 F = fresnelSchlick(max(dot(halfwayDir, viewDir), 0.0), F0);

        vec3 numerator = D * G * F;
        float denominator = 4.0 * max(dot(normal, viewDir), 0.0) * max(dot(normal, lightDir), 0.0) + 0.0001;
        vec3 specular = numerator / denominator;

        float NdotL = max(dot(normal, lightDir), 0.0);
        color += specular * lightColors[i] * NdotL;
    }

    if (clearcoat > 0.0) {
        vec3 clearcoatNormal = normal;
        float clearcoatRoughness = 0.04;

        for (int i = 0; i < 1; i++) {
            vec3 lightDir = normalize(lights[i] - vWorldPosition);
            vec3 halfwayDir = normalize(lightDir + viewDir);

            float D = distributionGGX(clearcoatNormal, halfwayDir, clearcoatRoughness);
            float G = geometrySmith(clearcoatNormal, viewDir, lightDir, clearcoatRoughness);
            vec3 F = fresnelSchlick(max(dot(halfwayDir, viewDir), 0.0), vec3(0.04));

            vec3 clearcoatSpecular = D * G * F / (4.0 * max(dot(clearcoatNormal, viewDir), 0.0) * max(dot(clearcoatNormal, lightDir), 0.0) + 0.0001);
            float NdotL = max(dot(clearcoatNormal, lightDir), 0.0);

            color += clearcoatSpecular * clearcoat * NdotL * lightTemperature;
        }
    }

    float edgeFactor = pow(1.0 - abs(dot(normal, viewDir)), 2.0);
    vec3 dispersionColor = vec3(
        sin(edgeFactor * 3.14159 * 2.0),
        sin(edgeFactor * 3.14159 * 2.0 + 2.094),
        sin(edgeFactor * 3.14159 * 2.0 + 4.189)
    ) * dispersion;

    color += dispersionColor * edgeFactor;
    color += metalColor * 0.04 * lightTemperature;
    color = color / (color + vec3(1.0));
    color = pow(color, vec3(1.0 / 2.2));

    gl_FragColor = vec4(color, 1.0);
}
`;

interface MetallicTextProps {
  text: string;
  defaultPreset?: MaterialPreset;
  showPresets?: boolean;
  className?: string;
}

export default function MetallicText({
  text = 'Mirco Negri',
  defaultPreset = 'chrome',
  showPresets = true,
  className = '',
}: MetallicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPreset, setCurrentPreset] = useState<MaterialPreset>(defaultPreset);

  const uniformsRef = useRef<{
    time: { value: number };
    mousePosition: { value: THREE.Vector2 };
    roughness: { value: number };
    anisotropy: { value: number };
    ior: { value: number };
    clearcoat: { value: number };
    dispersion: { value: number };
    metalColor: { value: THREE.Vector3 };
    lightTemperature: { value: THREE.Vector3 };
  }>({
    time: { value: 0 },
    mousePosition: { value: new THREE.Vector2(0.5, 0.5) },
    roughness: { value: MATERIAL_PRESETS[defaultPreset].roughness },
    anisotropy: { value: MATERIAL_PRESETS[defaultPreset].anisotropy },
    ior: { value: MATERIAL_PRESETS[defaultPreset].ior },
    clearcoat: { value: MATERIAL_PRESETS[defaultPreset].clearcoat },
    dispersion: { value: MATERIAL_PRESETS[defaultPreset].dispersion },
    metalColor: { value: new THREE.Vector3(...MATERIAL_PRESETS[defaultPreset].metalColor) },
    lightTemperature: { value: new THREE.Vector3(1, 1, 1) },
  });

  const updatePreset = (presetName: MaterialPreset) => {
    setCurrentPreset(presetName);
    const p = MATERIAL_PRESETS[presetName];
    if (!p) return;
    const u = uniformsRef.current;
    u.roughness.value = p.roughness;
    u.anisotropy.value = p.anisotropy;
    u.ior.value = p.ior;
    u.clearcoat.value = p.clearcoat;
    u.dispersion.value = p.dispersion;
    u.metalColor.value.set(...p.metalColor);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;
    let textMesh: THREE.Mesh | null = null;
    let targetRotX = 0;
    let targetRotY = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const material = new THREE.ShaderMaterial({
      uniforms: uniformsRef.current,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });

    try {
      const loader = new FontLoader();
      const font = loader.parse(fontData);

      const geometry = new TextGeometry(text, {
        font,
        size: 1.25,
        depth: 0.22,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.035,
        bevelSize: 0.025,
        bevelSegments: 2,
      });

      geometry.center();
      geometry.computeVertexNormals();

      textMesh = new THREE.Mesh(geometry, material);
      scene.add(textMesh);
    } catch (e) {
      console.error('Failed to create TextGeometry:', e);
    }

    const fit = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = Math.max(120, Math.min(240, width * 0.26));
      renderer.setSize(width, height);
      camera.aspect = width / height;

      // Adjust camera distance so text scales comfortably
      if (textMesh) {
        textMesh.geometry.computeBoundingBox();
        const box = textMesh.geometry.boundingBox;
        if (box) {
          const textWidth = box.max.x - box.min.x;
          const targetDist = Math.max(6.0, (textWidth / (2 * Math.tan((camera.fov * Math.PI) / 360))) * (1.1 / camera.aspect));
          camera.position.z = Math.min(targetDist, 14.0);
        }
      }

      camera.updateProjectionMatrix();
    };

    fit();
    window.addEventListener('resize', fit);

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = 1.0 - (e.clientY - rect.top) / rect.height;
      uniformsRef.current.mousePosition.value.set(px, py);

      targetRotY = ((e.clientX - (rect.left + rect.width / 2)) / rect.width) * 0.35;
      targetRotX = -((e.clientY - (rect.top + rect.height / 2)) / rect.height) * 0.25;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const clock = new THREE.Clock();

    const loop = () => {
      animId = requestAnimationFrame(loop);
      uniformsRef.current.time.value = clock.getElapsedTime();

      if (textMesh) {
        textMesh.rotation.x += (targetRotX - textMesh.rotation.x) * 0.08;
        textMesh.rotation.y += (targetRotY - textMesh.rotation.y) * 0.08;
      }

      renderer.render(scene, camera);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', fit);
      window.removeEventListener('pointermove', handlePointerMove);
      if (textMesh) {
        textMesh.geometry.dispose();
      }
      material.dispose();
      renderer.dispose();
    };
  }, [text]);

  return (
    <div className={`metallic-text-wrap ${className}`} ref={containerRef}>
      <h1 className="sr-only">{text}</h1>
      <canvas ref={canvasRef} className="metallic-text-canvas" aria-hidden="true" />
      {showPresets && (
        <div className="metallic-presets" role="radiogroup" aria-label="Finitura metallo">
          {(['chrome', 'gold', 'titanium', 'copper', 'diamond'] as MaterialPreset[]).map((p) => (
            <button
              key={p}
              type="button"
              className={`chip chip--preset ${currentPreset === p ? 'is-active' : ''}`}
              onClick={() => updatePreset(p)}
              aria-pressed={currentPreset === p}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
