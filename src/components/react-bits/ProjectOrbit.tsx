import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export interface ProjectSatellite {
  id: string;
  index: string;
  name: string;
  emoji: string;
  typeEn: string;
  typeIt: string;
  descEn: string;
  descIt: string;
  meta: string;
  url: string;
  color: string;
  shape: 'washing-drum' | 'phone-slab' | 'lightning-octa' | 'lens-ring' | 'folded-sheet' | 'dials-cube' | 'tent-pyramid' | 'film-reel' | 'disco-ball' | 'dice-cube' | 'book-stack' | 'chart-wedge' | 'paper-layers' | 'qr-tile' | 'globe-ring';
}

const ALL_PROJECTS: ProjectSatellite[] = [
  {
    id: 'laundrybot',
    index: '01',
    name: 'LaundryBot',
    emoji: '🧺',
    typeEn: 'Automation & Fair Queue Algorithm',
    typeIt: 'Automazione & Algoritmo di coda equa',
    descEn: 'Telegram bot that replaced the paper washing-machine sheet in my student residence.',
    descIt: 'Bot Telegram che ha sostituito il foglio delle prenotazioni delle lavatrici nello studentato.',
    meta: 'Python · Telegram API',
    url: 'https://github.com/mirconegri/laundrybot',
    color: 'hsl(28, 90%, 65%)',
    shape: 'washing-drum',
  },
  {
    id: 'lifeos',
    index: '02',
    name: 'LifeOS',
    emoji: '📱',
    typeEn: 'Offline Mobile Operating System',
    typeIt: 'Sistema operativo personale Android',
    descEn: 'Personal dashboard for Android: finances, exams, tasks, habits. Entirely offline, zero account.',
    descIt: 'Dashboard personale per Android: finanze, esami, abitudini e statistiche. Tutto offline.',
    meta: 'React Native · Expo · SQLite',
    url: 'https://github.com/mirconegri/LifeOsApp',
    color: 'hsl(192, 85%, 62%)',
    shape: 'phone-slab',
  },
  {
    id: 'tepo',
    index: '03',
    name: 'TEPO',
    emoji: '⚡',
    typeEn: 'Energy Decision Support System',
    typeIt: 'Supporto decisionale riqualificazione energetica',
    descEn: 'Decision support system that ranks energy-efficiency investments across the buildings of Trento.',
    descIt: 'Sistema di supporto che ordina gli investimenti di efficienza energetica per il Comune di Trento.',
    meta: 'Python · Optimisation',
    url: 'https://github.com/mirconegri/tepo',
    color: 'hsl(142, 75%, 62%)',
    shape: 'lightning-octa',
  },
  {
    id: 'quality-inspector',
    index: '04',
    name: 'Quality Inspector',
    emoji: '👁️',
    typeEn: 'Computer Vision & Real-Time Inspection',
    typeIt: 'Visione artificiale per controllo qualità',
    descEn: 'Real-time visual inspection pipeline for mechanical parts driven by custom YOLO and OpenCV.',
    descIt: 'Pipeline di ispezione visiva in tempo reale per componenti meccanici tramite YOLO e OpenCV.',
    meta: 'Python · YOLO · OpenCV',
    url: 'https://github.com/mirconegri/DesktopQualityInspector',
    color: 'hsl(340, 85%, 68%)',
    shape: 'lens-ring',
  },
  {
    id: 'receipt-scanner',
    index: '05',
    name: 'Receipt Scanner',
    emoji: '🧾',
    typeEn: 'On-Device OCR & Local Filing',
    typeIt: 'App mobile OCR & Archiviazione locale',
    descEn: 'Privacy-first mobile app that reads paper receipts with on-device OCR into SQLite.',
    descIt: 'App mobile privacy-first che legge scontrini con OCR on-device e li archivia in SQLite.',
    meta: 'React Native · ML Kit',
    url: 'https://github.com/mirconegri/receipt-scanner',
    color: 'hsl(48, 90%, 62%)',
    shape: 'folded-sheet',
  },
  {
    id: 'openrouter-widget',
    index: '06',
    name: 'OpenRouter Widget',
    emoji: '🎛️',
    typeEn: 'Nothing OS Native Home Widget',
    typeIt: 'Widget nativo Android stile Nothing OS',
    descEn: 'Native Android widget showing live OpenRouter credit balance and API key usage.',
    descIt: 'Widget Android nativo in stile Nothing OS che mostra in tempo reale credito e chiavi API.',
    meta: 'Kotlin · Android',
    url: 'https://github.com/mirconegri/openrouter-widget',
    color: 'hsl(215, 88%, 68%)',
    shape: 'dials-cube',
  },
  {
    id: 'scoutmealplanner',
    index: '07',
    name: 'ScoutMealPlanner',
    emoji: '⛺',
    typeEn: 'Camp Logistics & Menu Calculator',
    typeIt: 'Pianificatore menu & Spesa per campi scout',
    descEn: 'Builds complete camp menus and matching shopping lists from attendee headcount and days.',
    descIt: 'Genera menu e lista della spesa per campi scout a partire dal numero di persone e giorni.',
    meta: 'Python · CLI',
    url: 'https://github.com/mirconegri/scoutmealplanner',
    color: 'hsl(165, 80%, 60%)',
    shape: 'tent-pyramid',
  },
  {
    id: 'movierecommender',
    index: '08',
    name: 'MovieRecommender',
    emoji: '🎬',
    typeEn: 'Desktop Movie Discovery App',
    typeIt: 'Applicazione desktop raccomandazione film',
    descEn: 'Desktop application that suggests films from the TMDb catalogue, written in Python with Tkinter.',
    descIt: 'Applicazione desktop che suggerisce film dal catalogo TMDb, scritta in Python con Tkinter.',
    meta: 'Python · Tkinter · TMDb',
    url: 'https://github.com/mirconegri/movierecommender',
    color: 'hsl(280, 80%, 68%)',
    shape: 'film-reel',
  },
  {
    id: 'carnival-effects',
    index: '09',
    name: 'Carnival Effects',
    emoji: '🪩',
    typeEn: 'Audio-Reactive Party Visualizer',
    typeIt: 'Visualizzatore web audio-reattivo',
    descEn: 'Audio-reactive web visualiser projected behind a live DJ set at my residence Carnival party.',
    descIt: 'Visualizzatore web audio-reattivo proiettato dietro un DJ set per la festa di Carnevale.',
    meta: 'Web Audio · Canvas API',
    url: 'https://github.com/mirconegri/carnivalvisualeffects',
    color: 'hsl(315, 90%, 68%)',
    shape: 'disco-ball',
  },
  {
    id: 'pomodoro-cube',
    index: '10',
    name: 'Pomodoro Gravity Cube',
    emoji: '⏳',
    typeEn: 'Physical Microcontroller Timer',
    typeIt: 'Timer fisico a gravità con Arduino',
    descEn: 'A focus timer you flip like an hourglass, built with Arduino in a hand-cut wooden enclosure.',
    descIt: 'Un timer di concentrazione che si capovolge come una clessidra, fatto con Arduino in legno.',
    meta: 'Arduino · C++',
    url: 'https://github.com/mirconegri/pomodorogravitycube',
    color: 'hsl(32, 90%, 62%)',
    shape: 'dice-cube',
  },
  {
    id: 'uni-archive',
    index: '11',
    name: 'UniArchive',
    emoji: '📚',
    typeEn: 'Open University LaTeX Knowledge Base',
    typeIt: 'Archivio universitario aperto in LaTeX',
    descEn: 'Structured, shared university notes in LaTeX. Knowledge should be open and readable.',
    descIt: 'Appunti universitari strutturati e condivisi in LaTeX per la comunità studentesca.',
    meta: 'LaTeX · GitHub',
    url: 'https://github.com/mirconegri/university',
    color: 'hsl(12, 85%, 65%)',
    shape: 'book-stack',
  },
  {
    id: 'quant-rotator',
    index: '12',
    name: 'Quant-Tech-Rotator',
    emoji: '📈',
    typeEn: 'Automated Quantitative Momentum Trading',
    typeIt: 'Script di trading quantitativo automatizzato',
    descEn: 'Automated trading script running a cross-sectional momentum strategy on US tech stocks.',
    descIt: 'Strategia cross-sectional momentum automatizzata sui titoli tech USA tramite API Alpaca.',
    meta: 'Python · Alpaca API',
    url: 'https://github.com/mirconegri/Quant-Tech-Rotator',
    color: 'hsl(110, 75%, 62%)',
    shape: 'chart-wedge',
  },
  {
    id: 'pdf-merger',
    index: '13',
    name: 'PdfMerger',
    emoji: '📑',
    typeEn: 'Document Processing Utility',
    typeIt: 'Utility per unione documenti PDF',
    descEn: 'Fast and reliable utility that merges multiple PDF documents into a single cohesive file.',
    descIt: 'Piccola utility rapida che unisce più documenti PDF in un unico file.',
    meta: 'Python · CLI',
    url: 'https://github.com/mirconegri/pdfmerger',
    color: 'hsl(198, 80%, 65%)',
    shape: 'paper-layers',
  },
  {
    id: 'qr-generator',
    index: '14',
    name: 'QR Generator',
    emoji: '⬛',
    typeEn: 'Barcode & QR Matrix Generator',
    typeIt: 'Generatore di codici QR da terminale',
    descEn: 'CLI script that turns strings and URLs into customized, high-contrast QR codes.',
    descIt: 'Script CLI che trasforma stringhe o URL in codici QR pronti alla stampa.',
    meta: 'Python · CLI',
    url: 'https://github.com/mirconegri/qrgenerator',
    color: 'hsl(260, 70%, 72%)',
    shape: 'qr-tile',
  },
  {
    id: 'mirconegri-com',
    index: '15',
    name: 'mirconegri.com',
    emoji: '🌐',
    typeEn: 'Interactive Portfolio & WebGL Engine',
    typeIt: 'Portfolio personale & Motore WebGL',
    descEn: 'Self-hosted portfolio: WebGL2 custom shaders, interactive 3D solar system, GSAP motion.',
    descIt: 'Sito personale: shader procedurali, sistema solare 3D interattivo, animazioni GSAP.',
    meta: 'Three.js · Vite · TS',
    url: 'https://github.com/mirconegri/mirconegri.com',
    color: 'hsl(18, 92%, 62%)',
    shape: 'globe-ring',
  },
];

/** Creates a high-res GitHub Octocat logo texture on a circular badge */
function createGitHubTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Dark metallic obsidian base
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, 512, 512);

    // Glowing rim gradient
    const grad = ctx.createRadialGradient(256, 256, 120, 256, 256, 250);
    grad.addColorStop(0, 'rgba(255, 90, 44, 0.25)');
    grad.addColorStop(0.7, 'rgba(111, 211, 224, 0.15)');
    grad.addColorStop(1, 'rgba(13, 17, 23, 0.95)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(256, 256, 240, 0, Math.PI * 2);
    ctx.fill();

    // Outer border ring
    ctx.strokeStyle = '#6fd3e0';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(256, 256, 230, 0, Math.PI * 2);
    ctx.stroke();

    // GitHub Octocat silhouette
    ctx.save();
    ctx.translate(256, 256);
    ctx.scale(16, 16);
    ctx.translate(-12, -12);
    ctx.fillStyle = '#ffffff';

    const pathData =
      'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z';

    if (typeof Path2D !== 'undefined') {
      const p2d = new Path2D(pathData);
      ctx.fill(p2d);
    }
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Generates customized 3D meshes shaped like the project's emoji/concept */
function createEmojiInspiredMesh(shape: ProjectSatellite['shape'], color: THREE.Color): THREE.Object3D {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    metalness: 0.2,
    roughness: 0.45,
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0,
  });

  switch (shape) {
    case 'washing-drum': {
      // 🧺 Basket / washing drum: barrel torus + inner cylinder
      const torus = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.22, 10, 20), mat);
      const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.5, 12), mat);
      group.add(torus, inner);
      break;
    }
    case 'phone-slab': {
      // 📱 Smartphone / tablet slab
      const slab = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.1, 0.16), mat);
      group.add(slab);
      break;
    }
    case 'lightning-octa': {
      // ⚡ Energy octahedron
      const octa = new THREE.Mesh(new THREE.OctahedronGeometry(0.75), mat);
      group.add(octa);
      break;
    }
    case 'lens-ring': {
      // 👁️ Inspection lens ring + optic sphere
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.16, 10, 22), mat);
      const lens = new THREE.Mesh(new THREE.SphereGeometry(0.38, 12, 12), mat);
      group.add(ring, lens);
      break;
    }
    case 'folded-sheet': {
      // 🧾 Paper receipt folded prism
      const sheet = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.5, 0.1), mat);
      sheet.rotation.z = 0.4;
      group.add(sheet);
      break;
    }
    case 'dials-cube': {
      // 🎛️ Dodecahedron widget
      const dodeca = new THREE.Mesh(new THREE.DodecahedronGeometry(0.7), mat);
      group.add(dodeca);
      break;
    }
    case 'tent-pyramid': {
      // ⛺ Scout camp tent
      const tent = new THREE.Mesh(new THREE.ConeGeometry(0.7, 0.95, 4), mat);
      tent.rotation.y = Math.PI / 4;
      group.add(tent);
      break;
    }
    case 'film-reel': {
      // 🎬 Film reel disc
      const reel = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 0.25, 16), mat);
      group.add(reel);
      break;
    }
    case 'disco-ball': {
      // 🪩 Sparkling disco ball icosahedron
      const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 1), mat);
      group.add(ball);
      break;
    }
    case 'dice-cube': {
      // ⏳ / 🎲 Physical timer cube
      const cube = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.72), mat);
      group.add(cube);
      break;
    }
    case 'book-stack': {
      // 📚 Stack of university books
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.2, 0.65), mat);
      const b2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.6), mat);
      b2.position.y = 0.22;
      b2.rotation.y = 0.25;
      group.add(b1, b2);
      break;
    }
    case 'chart-wedge': {
      // 📈 Momentum chart wedge
      const wedge = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.75, 0.9, 3), mat);
      group.add(wedge);
      break;
    }
    case 'paper-layers': {
      // 📑 Layered PDF document sheets
      const p1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.85, 0.12), mat);
      group.add(p1);
      break;
    }
    case 'qr-tile': {
      // ⬛ Beveled QR matrix tile
      const tile = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.2), mat);
      group.add(tile);
      break;
    }
    default: {
      // 🌐 Web globe with planetary ring
      const globe = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), mat);
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.68, 0.92, 28), mat);
      ring.rotation.x = Math.PI / 2.3;
      group.add(globe, ring);
      break;
    }
  }

  return group;
}

export default function ProjectOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeProject, setActiveProject] = useState<ProjectSatellite | null>(null);
  const [activeRadius, setActiveRadius] = useState<number>(0);
  const [activeSpeed, setActiveSpeed] = useState<number>(0);
  const [isGlitching, setIsGlitching] = useState<boolean>(false);

  const unfocusRef = useRef<() => void>(() => {});
  const isItalian = typeof document !== 'undefined' && document.documentElement.lang === 'it';

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;
    let isOrbitingPaused = false;
    let hoveredMesh: THREE.Mesh | null = null;
    let focusedMesh: THREE.Mesh | null = null;

    const width = container.clientWidth || window.innerWidth;
    const height = Math.max(400, Math.min(560, width * 0.46));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x080b12, 35, 95);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const defaultCameraPosition = new THREE.Vector3(14, 12, 36);
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
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x141b2d, 1.4);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfff3e6, 1.6);
    dirLight.position.set(50, 70, 40);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x6fd3e0, 1.1);
    rimLight.position.set(-40, 25, -40);
    scene.add(rimLight);

    // Warm core point light inside GitHub central planet
    const coreLight = new THREE.PointLight(0xff6a3d, 2.8, 55, 1.8);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    // Distant Starfield
    const starGeom = new THREE.BufferGeometry();
    const starCoords: number[] = [];
    for (let i = 0; i < 320; i++) {
      starCoords.push(
        (Math.random() - 0.5) * 240,
        (Math.random() - 0.5) * 180,
        (Math.random() - 0.5) * 240
      );
    }
    starGeom.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.38,
      transparent: true,
      opacity: 0.65,
    });
    const starField = new THREE.Points(starGeom, starMat);
    scene.add(starField);

    // ==========================================
    // CENTRAL PLANET: GITHUB LOGO PLANET
    // ==========================================
    const gitHubGroup = new THREE.Group();
    scene.add(gitHubGroup);

    // Central Obsidian Sphere Core
    const corePlanetGeom = new THREE.SphereGeometry(3.2, 28, 28);
    const corePlanetMat = new THREE.MeshStandardMaterial({
      color: 0x0f1522,
      metalness: 0.45,
      roughness: 0.35,
      emissive: 0x060c18,
      emissiveIntensity: 0.4,
    });
    const coreSphere = new THREE.Mesh(corePlanetGeom, corePlanetMat);
    gitHubGroup.add(coreSphere);

    // Double-Sided Medallion with GitHub Logo Texture
    const ghTexture = createGitHubTexture();
    const medallionGeom = new THREE.CylinderGeometry(2.7, 2.7, 0.4, 32);
    const medallionSideMat = new THREE.MeshStandardMaterial({
      color: 0x1f2738,
      metalness: 0.8,
      roughness: 0.25,
    });
    const medallionFaceMat = new THREE.MeshBasicMaterial({
      map: ghTexture,
      transparent: true,
    });

    const medallion = new THREE.Mesh(medallionGeom, [
      medallionSideMat,
      medallionFaceMat,
      medallionFaceMat,
    ]);
    medallion.rotation.x = Math.PI / 2;
    gitHubGroup.add(medallion);

    // Outer luminous equatorial orbit ring for GitHub core
    const ghRingGeom = new THREE.RingGeometry(3.6, 4.0, 48);
    const ghRingMat = new THREE.MeshBasicMaterial({
      color: 0x6fd3e0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ghRing = new THREE.Mesh(ghRingGeom, ghRingMat);
    ghRing.rotation.x = Math.PI / 2.2;
    gitHubGroup.add(ghRing);

    // ==========================================
    // ALL 15 ORBITING SATELLITE PLANETS
    // ==========================================
    const moons: Array<{
      group: THREE.Group;
      hitMesh: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
      project: ProjectSatellite;
      materials: THREE.MeshStandardMaterial[];
    }> = [];

    const hitObjects: THREE.Mesh[] = [];

    ALL_PROJECTS.forEach((proj, i) => {
      const color = new THREE.Color(proj.color);
      const moonGroup = new THREE.Group();

      // Custom shape inspired by the project's emoji
      const visualShape = createEmojiInspiredMesh(proj.shape, color);
      moonGroup.add(visualShape);

      // Collect all child materials for emissive hover glow
      const materials: THREE.MeshStandardMaterial[] = [];
      visualShape.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (m) materials.push(m);
        }
      });

      // ENLARGED INVISIBLE HITBOX (radius 1.8 units) for effortless hovering & clicking
      const hitGeom = new THREE.SphereGeometry(1.8, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeom, hitMat);
      hitMesh.userData = { projectIndex: i };
      moonGroup.add(hitMesh);
      hitObjects.push(hitMesh);

      // Orbital parameters (spaced harmoniously across radii 6.8 to 23.5)
      const radius = 6.8 + i * 1.15;
      // Constant, calm, slow orbital speed
      const speed = 0.0014 + (i % 4) * 0.0003;
      const angle = (i * (Math.PI * 2)) / ALL_PROJECTS.length;
      const yElevation = Math.sin(i * 1.6) * 1.4;

      moonGroup.position.set(Math.cos(angle) * radius, yElevation, Math.sin(angle) * radius);
      scene.add(moonGroup);

      // Fine orbital path ring
      const ringGeom = new THREE.BufferGeometry();
      const ringPoints: number[] = [];
      const segments = 64;
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        ringPoints.push(Math.cos(theta) * radius, yElevation, Math.sin(theta) * radius);
      }
      ringGeom.setAttribute('position', new THREE.Float32BufferAttribute(ringPoints, 3));
      const ringMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.08,
      });
      const ring = new THREE.Line(ringGeom, ringMat);
      scene.add(ring);

      moons.push({
        group: moonGroup,
        hitMesh,
        radius,
        speed,
        angle,
        project: proj,
        materials,
      });
    });

    // ==========================================
    // INTERACTION & CAMERA FOCUS
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const triggerGlitch = () => {
      setIsGlitching(true);
      const rAnim = document.querySelector('#rAnim') as SVGAnimateElement | null;
      const gAnim = document.querySelector('#gAnim') as SVGAnimateElement | null;
      const bAnim = document.querySelector('#bAnim') as SVGAnimateElement | null;
      rAnim?.beginElement?.();
      gAnim?.beginElement?.();
      bAnim?.beginElement?.();
      setTimeout(() => setIsGlitching(false), 350);
    };

    const unfocus = () => {
      // Zoom out smoothly directly back to default overview
      gsap.to(camera.position, {
        x: defaultCameraPosition.x,
        y: defaultCameraPosition.y,
        z: defaultCameraPosition.z,
        duration: 1.25,
        ease: 'power2.inOut',
      });
      gsap.to(lookTarget, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.25,
        ease: 'power2.inOut',
      });

      if (focusedMesh) {
        const found = moons.find((m) => m.hitMesh === focusedMesh);
        if (found) {
          found.materials.forEach((mat) => {
            gsap.to(mat.emissive, { r: 0, g: 0, b: 0, duration: 0.3 });
          });
        }
      }

      focusedMesh = null;
      isOrbitingPaused = false;
      setActiveProject(null);
    };

    unfocusRef.current = unfocus;

    const focusMoon = (hitMesh: THREE.Mesh | null) => {
      if (!hitMesh || focusedMesh === hitMesh) {
        unfocus();
      } else {
        // Clear previous focus emissive
        if (focusedMesh) {
          const prev = moons.find((m) => m.hitMesh === focusedMesh);
          prev?.materials.forEach((mat) => {
            gsap.to(mat.emissive, { r: 0, g: 0, b: 0, duration: 0.2 });
          });
        }

        focusedMesh = hitMesh;
        isOrbitingPaused = true;

        const found = moons.find((m) => m.hitMesh === hitMesh);
        if (!found) return;

        // Glow the newly focused planet
        found.materials.forEach((mat) => {
          gsap.to(mat.emissive, {
            r: mat.color.r * 1.4,
            g: mat.color.g * 1.4,
            b: mat.color.b * 1.4,
            duration: 0.35,
          });
        });

        // Compute camera docking position
        const targetPos = found.group.position.clone();
        const dir = targetPos.clone().normalize();
        const camTarget = new THREE.Vector3(
          targetPos.x + dir.x * 4.2 + 1.2,
          targetPos.y + 2.2,
          targetPos.z + dir.z * 4.2 + 1.6
        );

        gsap.to(camera.position, {
          x: camTarget.x,
          y: camTarget.y,
          z: camTarget.z,
          duration: 1.35,
          ease: 'power2.inOut',
        });
        gsap.to(lookTarget, {
          x: targetPos.x,
          y: targetPos.y,
          z: targetPos.z,
          duration: 1.35,
          ease: 'power2.inOut',
        });

        setActiveProject(found.project);
        setActiveRadius(found.radius);
        setActiveSpeed(found.speed);
        triggerGlitch();
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(hitObjects);

      if (hits.length > 0) {
        const target = hits[0].object as THREE.Mesh;
        if (hoveredMesh && hoveredMesh !== target && hoveredMesh !== focusedMesh) {
          const prev = moons.find((m) => m.hitMesh === hoveredMesh);
          prev?.materials.forEach((mat) => {
            gsap.to(mat.emissive, { r: 0, g: 0, b: 0, duration: 0.2 });
          });
        }

        hoveredMesh = target;
        if (hoveredMesh !== focusedMesh) {
          const current = moons.find((m) => m.hitMesh === hoveredMesh);
          current?.materials.forEach((mat) => {
            gsap.to(mat.emissive, {
              r: mat.color.r,
              g: mat.color.g,
              b: mat.color.b,
              duration: 0.25,
            });
          });
        }
      } else if (hoveredMesh && hoveredMesh !== focusedMesh) {
        const prev = moons.find((m) => m.hitMesh === hoveredMesh);
        prev?.materials.forEach((mat) => {
          gsap.to(mat.emissive, { r: 0, g: 0, b: 0, duration: 0.2 });
        });
        hoveredMesh = null;
      }
    };

    const onPointerLeave = () => {
      if (hoveredMesh && hoveredMesh !== focusedMesh) {
        const prev = moons.find((m) => m.hitMesh === hoveredMesh);
        prev?.materials.forEach((mat) => {
          gsap.to(mat.emissive, { r: 0, g: 0, b: 0, duration: 0.2 });
        });
        hoveredMesh = null;
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(hitObjects);
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
      const h = Math.max(400, Math.min(560, w * 0.46));
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // ==========================================
    // ANIMATION LOOP (CONSTANT SLOW SPEED)
    // ==========================================
    const loop = () => {
      animId = requestAnimationFrame(loop);

      // Rotate GitHub Central Planet
      gitHubGroup.rotation.y += 0.0035;

      // Rotate each satellite around GitHub at CONSTANT, SLOW, STEADY speed
      if (!isOrbitingPaused) {
        moons.forEach((moon) => {
          moon.angle += moon.speed;
          moon.group.position.x = Math.cos(moon.angle) * moon.radius;
          moon.group.position.z = Math.sin(moon.angle) * moon.radius;
          moon.group.rotation.y += 0.012;
          moon.group.rotation.x += 0.006;
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
            ? 'Sistema Solare dei Progetti • Clicca un pianeta per agganciare la visuale'
            : 'Projects Solar System • Click any planet to dock camera'}
        </span>
      </div>

      <canvas ref={canvasRef} className="orbit-canvas" />

      {/* Glitch-filtered HUD Moon Info Card */}
      {activeProject && (
        <div className={`orbit-hud ${isGlitching ? 'is-glitching' : ''}`}>
          <div className="orbit-hud-header">
            <h3 className="orbit-hud-title">
              {activeProject.emoji} {activeProject.name}
            </h3>
            <span className="orbit-hud-badge">#{activeProject.index}</span>
          </div>

          <div className="orbit-hud-divider" />

          <p className="orbit-hud-info">
            <strong>{isItalian ? 'Tipo:' : 'Type:'}</strong>{' '}
            <span>{isItalian ? activeProject.typeIt : activeProject.typeEn}</span>
          </p>

          <p className="orbit-hud-info">
            <strong>{isItalian ? 'Stack:' : 'Stack:'}</strong>{' '}
            <span>{activeProject.meta}</span>
          </p>

          <p className="orbit-hud-info">
            <strong>{isItalian ? 'Orbita:' : 'Orbit:'}</strong>{' '}
            <span>{activeRadius.toFixed(1)} AU · {activeSpeed.toFixed(4)} rad/s</span>
          </p>

          <p className="orbit-hud-desc">
            {isItalian ? activeProject.descIt : activeProject.descEn}
          </p>

          <div className="orbit-hud-actions">
            <a href={activeProject.url} target="_blank" rel="noopener" className="btn btn--sm">
              <span>{isItalian ? 'Apri su GitHub' : 'Open on GitHub'}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <button
              type="button"
              className="chip chip--reset"
              onClick={() => unfocusRef.current()}
            >
              {isItalian ? 'Chiudi visuale' : 'Close view'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
