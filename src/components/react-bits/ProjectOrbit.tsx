import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ProjectSatellite {
  id: string;
  name: string;
  typeEn: string;
  typeIt: string;
  descEn: string;
  descIt: string;
  meta: string;
  url: string;
  geometryType: 'sphere' | 'dodeca' | 'octa' | 'box' | 'cone' | 'icosa';
  color: string;
}

const PROJECTS_DATA: ProjectSatellite[] = [
  {
    id: 'laundrybot',
    name: 'LaundryBot',
    typeEn: 'Automation & Queue Algorithm',
    typeIt: 'Automazione & Algoritmo di coda',
    descEn: 'Replaced the paper washing-machine sheet in my student residence with a fair digital queue.',
    descIt: 'Ha sostituito il foglio di prenotazione delle lavatrici nello studentato con una coda equa.',
    meta: 'Python · Telegram API',
    url: 'https://github.com/mirconegri/laundrybot',
    geometryType: 'sphere',
    color: 'hsl(28, 85%, 68%)',
  },
  {
    id: 'lifeos',
    name: 'LifeOS',
    typeEn: 'Mobile Operating System',
    typeIt: 'Sistema operativo mobile',
    descEn: 'Personal dashboard for Android: finances, exams, habits, and stats. 100% offline.',
    descIt: 'Dashboard personale per Android: finanze, esami, abitudini e statistiche. Tutto offline.',
    meta: 'React Native · SQLite',
    url: 'https://github.com/mirconegri/LifeOsApp',
    geometryType: 'box',
    color: 'hsl(190, 80%, 65%)',
  },
  {
    id: 'tepo',
    name: 'TEPO',
    typeEn: 'Decision Support System',
    typeIt: 'Supporto decisionale',
    descEn: 'Ranks energy-efficiency investments across the buildings of the Municipality of Trento.',
    descIt: 'Ordina gli investimenti di riqualificazione energetica per il Comune di Trento.',
    meta: 'Python · Optimisation',
    url: 'https://github.com/mirconegri/tepo',
    geometryType: 'octa',
    color: 'hsl(140, 70%, 65%)',
  },
  {
    id: 'quality-inspector',
    name: 'Quality Inspector',
    typeEn: 'Computer Vision & AI',
    typeIt: 'Visione artificiale & AI',
    descEn: 'Real-time visual inspection pipeline for mechanical parts with custom YOLO and OpenCV.',
    descIt: 'Ispezione visiva in tempo reale per componenti meccanici tramite YOLO e OpenCV.',
    meta: 'Python · YOLO · OpenCV',
    url: 'https://github.com/mirconegri/DesktopQualityInspector',
    geometryType: 'dodeca',
    color: 'hsl(340, 80%, 70%)',
  },
  {
    id: 'receipt-scanner',
    name: 'Receipt Scanner',
    typeEn: 'OCR & Local Database',
    typeIt: 'OCR & Database locale',
    descEn: 'Privacy-first mobile app that reads paper receipts with on-device OCR into SQLite.',
    descIt: 'Legge gli scontrini cartacei tramite OCR on-device e li cataloga su SQLite locale.',
    meta: 'React Native · ML Kit',
    url: 'https://github.com/mirconegri/receipt-scanner',
    geometryType: 'cone',
    color: 'hsl(45, 85%, 65%)',
  },
  {
    id: 'openrouter-widget',
    name: 'OpenRouter Widget',
    typeEn: 'Android Native Widget',
    typeIt: 'Widget nativo Android',
    descEn: 'Nothing OS styled home-screen widget showing live API credit and key usage.',
    descIt: 'Widget in stile Nothing OS che mostra in tempo reale credito e consumo chiavi API.',
    meta: 'Kotlin · Android',
    url: 'https://github.com/mirconegri/openrouter-widget',
    geometryType: 'icosa',
    color: 'hsl(215, 85%, 70%)',
  },
  {
    id: 'scoutmealplanner',
    name: 'ScoutMealPlanner',
    typeEn: 'Web Tool & Logistics',
    typeIt: 'Web tool & Logistica',
    descEn: 'Calculates complete camp menus and shopping lists from attendee headcount and days.',
    descIt: 'Genera menu e lista della spesa per campi scout in base al numero di partecipanti.',
    meta: 'TypeScript · Astro',
    url: 'https://github.com/mirconegri/scoutmealplanner',
    geometryType: 'sphere',
    color: 'hsl(160, 75%, 65%)',
  },
  {
    id: 'mirconegri-com',
    name: 'mirconegri.com',
    typeEn: 'WebGL & Island Architecture',
    typeIt: 'WebGL & Architettura a isole',
    descEn: 'Self-hosted portfolio: WebGL custom shaders, Three.js anisotropic chrome, GSAP motion.',
    descIt: 'Portfolio personale: shader WebGL, Three.js metallico anisotropo, movimento GSAP.',
    meta: 'TypeScript · Three.js · Vite',
    url: 'https://github.com/mirconegri/mirconegri.com',
    geometryType: 'dodeca',
    color: 'hsl(15, 90%, 65%)',
  },
];

export default function ProjectOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeProject, setActiveProject] = useState<ProjectSatellite | null>(null);
  const [activeRadius, setActiveRadius] = useState<number>(0);
  const [activeSpeed, setActiveSpeed] = useState<number>(0);
  const [isGlitching, setIsGlitching] = useState<boolean>(false);

  const isItalian = typeof document !== 'undefined' && document.documentElement.lang === 'it';

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;
    let orbitSpeedFactor = 1.0;
    let isOrbitingPaused = false;
    let hoveredMoonMesh: THREE.Mesh | null = null;
    let focusedMoonMesh: THREE.Mesh | null = null;

    const width = container.clientWidth || window.innerWidth;
    const height = Math.max(380, Math.min(540, width * 0.45));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0c0e14, 25, 75);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const defaultCameraPosition = new THREE.Vector3(12, 10, 32);
    camera.position.copy(defaultCameraPosition);
    const lookTarget = new THREE.Vector3(0, 0, 0);
    camera.lookAt(lookTarget);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1a2035, 1.2);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.4);
    dirLight.position.set(40, 60, 30);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x6fd3e0, 0.8);
    backLight.position.set(-30, 20, -30);
    scene.add(backLight);

    const pointLight = new THREE.PointLight(0xff5a2c, 2.0, 40, 2);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starPositions: number[] = [];
    for (let i = 0; i < 280; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 160,
        (Math.random() - 0.5) * 200
      );
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.4,
      transparent: true,
      opacity: 0.65,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Central Core Planet
    const planetGeometry = new THREE.SphereGeometry(3.6, 9, 9);
    const planetMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f3442,
      flatShading: true,
      metalness: 0.2,
      roughness: 0.6,
      emissive: 0x0f202a,
      emissiveIntensity: 0.3,
    });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // Orbiting Satellites
    const moons: Array<{
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
      project: ProjectSatellite;
    }> = [];

    const getGeometry = (type: ProjectSatellite['geometryType']) => {
      switch (type) {
        case 'dodeca':
          return new THREE.DodecahedronGeometry(0.7);
        case 'octa':
          return new THREE.OctahedronGeometry(0.7);
        case 'box':
          return new THREE.BoxGeometry(0.75, 0.75, 0.75);
        case 'cone':
          return new THREE.ConeGeometry(0.55, 1.0, 7);
        case 'icosa':
          return new THREE.IcosahedronGeometry(0.7);
        case 'sphere':
        default:
          return new THREE.SphereGeometry(0.65, 7, 7);
      }
    };

    PROJECTS_DATA.forEach((proj, i) => {
      const geom = getGeometry(proj.geometryType);
      const color = new THREE.Color(proj.color);
      const mat = new THREE.MeshStandardMaterial({
        color,
        flatShading: true,
        metalness: 0.15,
        roughness: 0.5,
        emissive: new THREE.Color(0x000000),
        emissiveIntensity: 0,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.userData = { project: proj };

      const radius = 6.8 + i * 1.35;
      const speed = 0.004 + (i % 3) * 0.002 + 0.002;
      const angle = (i * (Math.PI * 2)) / PROJECTS_DATA.length;

      mesh.position.set(Math.cos(angle) * radius, (Math.sin(i * 1.5) * 1.2), Math.sin(angle) * radius);
      scene.add(mesh);

      // Subtle orbital guide ring
      const ringGeom = new THREE.BufferGeometry();
      const ringPoints: number[] = [];
      const segments = 64;
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        ringPoints.push(Math.cos(theta) * radius, (Math.sin(i * 1.5) * 1.2), Math.sin(theta) * radius);
      }
      ringGeom.setAttribute('position', new THREE.Float32BufferAttribute(ringPoints, 3));
      const ringMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.07,
      });
      const ring = new THREE.Line(ringGeom, ringMat);
      scene.add(ring);

      moons.push({ mesh, radius, speed, angle, project: proj });
    });

    // Raycasting for Hover & Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      orbitSpeedFactor = 0.35;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(moons.map((m) => m.mesh));

      if (hits.length > 0) {
        const target = hits[0].object as THREE.Mesh;
        if (hoveredMoonMesh && hoveredMoonMesh !== target && hoveredMoonMesh !== focusedMoonMesh) {
          const mat = hoveredMoonMesh.material as THREE.MeshStandardMaterial;
          gsap.to(mat.emissive, { r: 0, g: 0, b: 0, duration: 0.25 });
        }
        hoveredMoonMesh = target;
        if (hoveredMoonMesh !== focusedMoonMesh) {
          const mat = hoveredMoonMesh.material as THREE.MeshStandardMaterial;
          gsap.to(mat.emissive, {
            r: mat.color.r,
            g: mat.color.g,
            b: mat.color.b,
            duration: 0.25,
          });
        }
      } else if (hoveredMoonMesh && hoveredMoonMesh !== focusedMoonMesh) {
        const mat = hoveredMoonMesh.material as THREE.MeshStandardMaterial;
        gsap.to(mat.emissive, { r: 0, g: 0, b: 0, duration: 0.25 });
        hoveredMoonMesh = null;
      }
    };

    const onPointerLeave = () => {
      orbitSpeedFactor = 1.0;
      if (hoveredMoonMesh && hoveredMoonMesh !== focusedMoonMesh) {
        const mat = hoveredMoonMesh.material as THREE.MeshStandardMaterial;
        gsap.to(mat.emissive, { r: 0, g: 0, b: 0, duration: 0.25 });
        hoveredMoonMesh = null;
      }
    };

    const triggerGlitchFilter = () => {
      setIsGlitching(true);
      const rAnim = document.querySelector('#rAnim') as SVGAnimateElement | null;
      const gAnim = document.querySelector('#gAnim') as SVGAnimateElement | null;
      const bAnim = document.querySelector('#bAnim') as SVGAnimateElement | null;
      rAnim?.beginElement?.();
      gAnim?.beginElement?.();
      bAnim?.beginElement?.();
      setTimeout(() => setIsGlitching(false), 380);
    };

    const focusMoon = (mesh: THREE.Mesh | null) => {
      if (!mesh || focusedMoonMesh === mesh) {
        // Zoom out to overview
        gsap.to(camera.position, {
          x: defaultCameraPosition.x,
          y: defaultCameraPosition.y,
          z: defaultCameraPosition.z,
          duration: 1.2,
          ease: 'power2.inOut',
        });
        gsap.to(lookTarget, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        });

        if (focusedMoonMesh) {
          const mat = focusedMoonMesh.material as THREE.MeshStandardMaterial;
          gsap.to(mat.emissive, { r: 0, g: 0, b: 0, duration: 0.3 });
        }

        focusedMoonMesh = null;
        isOrbitingPaused = false;
        setActiveProject(null);
      } else {
        // Focus on selected moon
        if (focusedMoonMesh) {
          const mat = focusedMoonMesh.material as THREE.MeshStandardMaterial;
          gsap.to(mat.emissive, { r: 0, g: 0, b: 0, duration: 0.2 });
        }

        focusedMoonMesh = mesh;
        isOrbitingPaused = true;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        gsap.to(mat.emissive, {
          r: mat.color.r * 1.2,
          g: mat.color.g * 1.2,
          b: mat.color.b * 1.2,
          duration: 0.3,
        });

        const target = mesh.position.clone();
        const dir = target.clone().normalize();
        const camTarget = new THREE.Vector3(
          target.x + dir.x * 4.5 + 1.5,
          target.y + 2.5,
          target.z + dir.z * 4.5 + 2.0
        );

        gsap.to(camera.position, {
          x: camTarget.x,
          y: camTarget.y,
          z: camTarget.z,
          duration: 1.3,
          ease: 'power2.inOut',
        });
        gsap.to(lookTarget, {
          x: target.x,
          y: target.y,
          z: target.z,
          duration: 1.3,
          ease: 'power2.inOut',
        });

        const found = moons.find((m) => m.mesh === mesh);
        if (found) {
          setActiveProject(found.project);
          setActiveRadius(found.radius);
          setActiveSpeed(found.speed);
          triggerGlitchFilter();
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(moons.map((m) => m.mesh));
      if (hits.length > 0) {
        focusMoon(hits[0].object as THREE.Mesh);
      }
    };

    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('click', onClick);

    // Resize
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = Math.max(380, Math.min(540, w * 0.45));
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    const loop = () => {
      animId = requestAnimationFrame(loop);

      planet.rotation.y += 0.0018;

      if (!isOrbitingPaused) {
        moons.forEach((moon) => {
          moon.angle += moon.speed * orbitSpeedFactor;
          moon.mesh.position.x = Math.cos(moon.angle) * moon.radius;
          moon.mesh.position.z = Math.sin(moon.angle) * moon.radius;
          moon.mesh.rotation.y += 0.015;
          moon.mesh.rotation.x += 0.008;
        });
      }

      camera.lookAt(lookTarget);
      renderer.render(scene, camera);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('click', onClick);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="orbit-viewport-wrap" ref={containerRef}>
      {/* Hidden SVG chromatic glitch filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="glitch" x="0" y="0">
            <feColorMatrix in="SourceGraphic" mode="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
            <feOffset in="r" result="r">
              <animate id="rAnim" attributeName="dx" attributeType="XML" values="0; -6; 0; -14; -2; -4; 0; -3; 0" dur="0.2s" repeatCount="1" />
            </feOffset>
            <feColorMatrix in="SourceGraphic" mode="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g" />
            <feOffset in="g" result="g">
              <animate id="gAnim" attributeName="dx" attributeType="XML" values="0; 0; 0; -4; 0; 7; 0; -1; 0" dur="0.16s" repeatCount="1" />
            </feOffset>
            <feColorMatrix in="SourceGraphic" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b" />
            <feOffset in="b" result="b">
              <animate id="bAnim" attributeName="dx" attributeType="XML" values="0; 4; -1; 5; 0; 2; 0; 12; 0" dur="0.32s" repeatCount="1" />
            </feOffset>
            <feBlend in="r" in2="g" mode="screen" result="blend" />
            <feBlend in="blend" in2="b" mode="screen" result="blend" />
          </filter>
        </defs>
      </svg>

      <div className="orbit-cue">
        <span className="orbit-cue-dot" />
        <span>
          {isItalian
            ? 'Esploratore Orbitale • Clicca un satellite per agganciare la visuale'
            : 'Orbital Explorer • Click any satellite to dock camera'}
        </span>
      </div>

      <canvas ref={canvasRef} className="orbit-canvas" />

      {/* Glitch-filtered HUD Moon Info Card */}
      {activeProject && (
        <div className={`orbit-hud ${isGlitching ? 'is-glitching' : ''}`}>
          <div className="orbit-hud-header">
            <h3 className="orbit-hud-title">🪐 {activeProject.name}</h3>
            <span className="orbit-hud-badge">{activeProject.meta}</span>
          </div>

          <div className="orbit-hud-divider" />

          <p className="orbit-hud-info">
            <strong>{isItalian ? 'Tipo:' : 'Type:'}</strong>{' '}
            <span>{isItalian ? activeProject.typeIt : activeProject.typeEn}</span>
          </p>

          <p className="orbit-hud-info">
            <strong>{isItalian ? 'Orbita:' : 'Radius:'}</strong>{' '}
            <span>{activeRadius.toFixed(2)} AU · {activeSpeed.toFixed(4)} rad/s</span>
          </p>

          <p className="orbit-hud-desc">
            {isItalian ? activeProject.descIt : activeProject.descEn}
          </p>

          <div className="orbit-hud-actions">
            <a href={activeProject.url} target="_blank" rel="noopener" className="btn btn--sm">
              <span>{isItalian ? 'Vedi su GitHub' : 'View on GitHub'}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              className="chip chip--reset"
              onClick={() => {
                setActiveProject(null);
                const clickEvent = new MouseEvent('click', { clientX: 0, clientY: 0 });
                canvasRef.current?.dispatchEvent(clickEvent);
              }}
            >
              {isItalian ? 'Chiudi visuale' : 'Reset view'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
