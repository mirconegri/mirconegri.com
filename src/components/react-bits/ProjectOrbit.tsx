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

/** Generates rich, multi-part, multi-colored 3D models corresponding to each project's emoji */
function createEmojiInspiredMesh(shape: ProjectSatellite['shape'], _color: THREE.Color): THREE.Object3D {
  const group = new THREE.Group();

  switch (shape) {
    case 'washing-drum': {
      // 🧺 LaundryBot: Detailed 3D Washing Machine with chrome porthole & control panel
      const cabinetMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.1, roughness: 0.3 });
      const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.95, 0.8), cabinetMat);
      
      const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.3, roughness: 0.4 });
      const panel = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.2, 0.05), panelMat);
      panel.position.set(0, 0.36, 0.41);
      
      const dialMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
      const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.06, 16), dialMat);
      dial.rotation.x = Math.PI / 2;
      dial.position.set(-0.25, 0.36, 0.44);

      const doorRingMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.85, roughness: 0.15 });
      const doorRing = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.05, 12, 28), doorRingMat);
      doorRing.position.set(0, -0.1, 0.41);

      const glassMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.7, roughness: 0.1 });
      const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.02, 24), glassMat);
      glass.rotation.x = Math.PI / 2;
      glass.position.set(0, -0.1, 0.41);

      const clothesMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.6 });
      const clothes = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.06, 8, 16), clothesMat);
      clothes.position.set(0, -0.1, 0.38);

      group.add(cabinet, panel, dial, doorRing, glass, clothes);
      break;
    }

    case 'phone-slab': {
      // 📱 LifeOS: Sleek 3D Smartphone with glossy screen, glowing UI widgets, and camera bump
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.2 });
      const phoneBody = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.18, 0.08), frameMat);

      const screenMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.1, metalness: 0.1 });
      const screen = new THREE.Mesh(new THREE.BoxGeometry(0.56, 1.1, 0.01), screenMat);
      screen.position.z = 0.041;

      // Glowing app widgets on screen
      const w1Mat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 0.4 });
      const widget1 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.01), w1Mat);
      widget1.position.set(-0.12, 0.32, 0.047);

      const w2Mat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x8b5cf6, emissiveIntensity: 0.4 });
      const widget2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.01), w2Mat);
      widget2.position.set(0.12, 0.32, 0.047);

      const w3Mat = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.3 });
      const widget3 = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.16, 0.01), w3Mat);
      widget3.position.set(0, 0.06, 0.047);

      const cameraBump = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.03), frameMat);
      cameraBump.position.set(-0.14, 0.42, -0.05);

      group.add(phoneBody, screen, widget1, widget2, widget3, cameraBump);
      break;
    }

    case 'lightning-octa': {
      // ⚡ TEPO: Extruded 3D Zigzag Lightning Bolt in radiant electric gold
      const shape2D = new THREE.Shape();
      shape2D.moveTo(0, 0.85);
      shape2D.lineTo(0.38, 0.12);
      shape2D.lineTo(0.08, 0.12);
      shape2D.lineTo(0.32, -0.85);
      shape2D.lineTo(-0.28, -0.05);
      shape2D.lineTo(0.02, -0.05);
      shape2D.closePath();

      const boltGeom = new THREE.ExtrudeGeometry(shape2D, {
        depth: 0.22,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.03,
        bevelSegments: 2,
      });
      const boltMat = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0xeab308,
        emissiveIntensity: 0.65,
        metalness: 0.2,
        roughness: 0.25,
      });
      const bolt = new THREE.Mesh(boltGeom, boltMat);
      bolt.position.set(0, 0, -0.11);

      // Orbiting energy halo spark
      const haloMat = new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.6 });
      const halo = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.03, 6, 24), haloMat);
      halo.rotation.x = Math.PI / 2.5;

      group.add(bolt, halo);
      break;
    }

    case 'lens-ring': {
      // 👁️ Quality Inspector: 3D Eyeball with White Sclera, Crimson Iris, Black Pupil & Cybernetic Lens
      const scleraMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.15, metalness: 0.05 });
      const eyeball = new THREE.Mesh(new THREE.SphereGeometry(0.52, 24, 24), scleraMat);

      const irisMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.2, metalness: 0.4 });
      const iris = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.04, 32), irisMat);
      iris.rotation.x = Math.PI / 2;
      iris.position.set(0, 0, 0.46);

      const pupilMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.1 });
      const pupil = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 24), pupilMat);
      pupil.rotation.x = Math.PI / 2;
      pupil.position.set(0, 0, 0.47);

      // Metallic robotic aperture ring
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.2 });
      const lensRing = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.035, 8, 32), lensMat);

      group.add(eyeball, iris, pupil, lensRing);
      break;
    }

    case 'folded-sheet': {
      // 🧾 Receipt Scanner: 3D Folded Paper Receipt with Barcode lines and Scanner Beam
      const paperMat = new THREE.MeshStandardMaterial({ color: 0xfefefe, roughness: 0.5 });
      const receipt = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.95, 0.03), paperMat);

      // Angled top folded paper tab
      const foldTab = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.24, 0.03), paperMat);
      foldTab.position.set(0, 0.56, 0.06);
      foldTab.rotation.x = 0.4;

      // Dark barcode printed lines
      const lineMat = new THREE.MeshBasicMaterial({ color: 0x334155 });
      for (let i = 0; i < 4; i++) {
        const line = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.035, 0.01), lineMat);
        line.position.set(0, 0.2 - i * 0.14, 0.02);
        group.add(line);
      }

      // Glowing laser scan line
      const laserMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
      const laser = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.02, 0.02), laserMat);
      laser.position.set(0, -0.05, 0.04);

      group.add(receipt, foldTab, laser);
      break;
    }

    case 'dials-cube': {
      // 🎛️ OpenRouter Widget: 3D Audio Console with Knobs, Fader Sliders & Status LEDs
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.4, roughness: 0.3 });
      const consoleBody = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.82, 0.2), bodyMat);

      // Rotary knobs
      const knobMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.2 });
      const knobColors = [0x38bdf8, 0xf59e0b, 0xef4444];
      for (let i = 0; i < 3; i++) {
        const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 16), knobMat);
        knob.rotation.x = Math.PI / 2;
        knob.position.set(-0.25 + i * 0.25, 0.2, 0.12);

        const ledMat = new THREE.MeshBasicMaterial({ color: knobColors[i] });
        const led = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), ledMat);
        led.position.set(-0.25 + i * 0.25, 0.32, 0.11);
        group.add(knob, led);
      }

      // Vertical slider tracks
      const faderMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
      for (let i = 0; i < 2; i++) {
        const track = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.32, 0.03), faderMat);
        track.position.set(-0.16 + i * 0.32, -0.18, 0.1);

        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.06), knobMat);
        cap.position.set(-0.16 + i * 0.32, -0.22 + i * 0.12, 0.12);
        group.add(track, cap);
      }

      group.add(consoleBody);
      break;
    }

    case 'tent-pyramid': {
      // ⛺ ScoutMealPlanner: 3D Forest Scout Tent with Wooden Ridgepole and Glowing Campfire
      const tentMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.6 });
      const tent = new THREE.Mesh(new THREE.ConeGeometry(0.68, 0.88, 4), tentMat);
      tent.rotation.y = Math.PI / 4;

      const doorMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
      const door = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.6, 4), doorMat);
      door.rotation.y = Math.PI / 4;
      door.position.set(0, -0.15, 0.02);

      const poleMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.98), poleMat);
      pole.rotation.x = Math.PI / 2;
      pole.position.set(0, 0.42, 0);

      // Mini glowing campfire in front
      const fireMat = new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0xf97316, emissiveIntensity: 0.8 });
      const fire = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12), fireMat);
      fire.position.set(0, -0.32, 0.55);

      const logMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.9 });
      const log1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.04, 0.04), logMat);
      log1.rotation.y = 0.6;
      log1.position.set(0, -0.4, 0.55);

      group.add(tent, door, pole, fire, log1);
      break;
    }

    case 'film-reel': {
      // 🎬 MovieRecommender: 3D Hollywood Clapperboard with Black/White Zebra Stripes
      const slateMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
      const slate = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.65, 0.05), slateMat);

      const clapperMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
      const clapper = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.16, 0.06), clapperMat);
      clapper.position.set(0.04, 0.4, 0.02);
      clapper.rotation.z = 0.18;

      // Diagonal zebra stripes on the clapper stick
      const stripeMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
      for (let i = 0; i < 4; i++) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.15, 0.07), stripeMat);
        stripe.position.set(-0.3 + i * 0.2, 0.4, 0.02);
        stripe.rotation.z = 0.45;
        group.add(stripe);
      }

      // White chalk text lines on the slate
      const textMat = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
      const line1 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.03, 0.06), textMat);
      line1.position.set(0, 0.12, 0.01);
      const line2 = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.03, 0.06), textMat);
      line2.position.set(0, -0.06, 0.01);

      group.add(slate, clapper, line1, line2);
      break;
    }

    case 'disco-ball': {
      // 🪩 Carnival Effects: Faceted 3D Mirror Disco Ball with Pure Chrome Reflection & Sparkles
      const mirrorMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        flatShading: true,
        metalness: 0.96,
        roughness: 0.08,
      });
      const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.58, 2), mirrorMat);

      const capMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 6, 16), capMat);
      ring.position.set(0, 0.62, 0);

      // Colorful sparkles orbiting the mirror ball
      const sparkColors = [0xec4899, 0x06b6d4, 0xeab308];
      sparkColors.forEach((sc, idx) => {
        const sm = new THREE.MeshBasicMaterial({ color: sc });
        const sp = new THREE.Mesh(new THREE.OctahedronGeometry(0.06), sm);
        const theta = (idx * Math.PI * 2) / 3;
        sp.position.set(Math.cos(theta) * 0.78, Math.sin(theta) * 0.25, Math.sin(theta) * 0.78);
        group.add(sp);
      });

      group.add(ball, ring);
      break;
    }

    case 'dice-cube': {
      // ⏳ Pomodoro Gravity Cube: 3D Transparent Glass Hourglass with Wooden Caps & Golden Sand
      const glassMat = new THREE.MeshStandardMaterial({
        color: 0xe0f2fe,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1,
      });
      const topBulb = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.42, 16), glassMat);
      topBulb.rotation.x = Math.PI;
      topBulb.position.set(0, 0.22, 0);

      const bottomBulb = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.42, 16), glassMat);
      bottomBulb.position.set(0, -0.22, 0);

      const sandMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.6 });
      const sand = new THREE.Mesh(new THREE.ConeGeometry(0.26, 0.26, 14), sandMat);
      sand.position.set(0, -0.28, 0);

      const woodMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.7 });
      const topPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.07, 8), woodMat);
      topPlate.position.set(0, 0.45, 0);
      const bottomPlate = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.07, 8), woodMat);
      bottomPlate.position.set(0, -0.45, 0);

      const pillarMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.7 });
      for (let i = 0; i < 3; i++) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.88), pillarMat);
        const ang = (i * Math.PI * 2) / 3;
        pillar.position.set(Math.cos(ang) * 0.32, 0, Math.sin(ang) * 0.32);
        group.add(pillar);
      }

      group.add(topBulb, bottomBulb, sand, topPlate, bottomPlate);
      break;
    }

    case 'book-stack': {
      // 📚 UniArchive: 3D Stack of Hardcover University Books in Navy, Crimson & Green
      const pageMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
      
      // Bottom navy book
      const b1Cover = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.18, 0.72), new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3 }));
      const b1Pages = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.14, 0.68), pageMat);
      b1Pages.position.set(0.03, 0, 0);
      const book1 = new THREE.Group();
      book1.add(b1Cover, b1Pages);
      book1.position.y = -0.2;

      // Middle crimson book
      const b2Cover = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.17, 0.65), new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.3 }));
      const b2Pages = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.13, 0.61), pageMat);
      b2Pages.position.set(0.03, 0, 0);
      const book2 = new THREE.Group();
      book2.add(b2Cover, b2Pages);
      book2.rotation.y = 0.18;

      // Top forest green book
      const b3Cover = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.16, 0.58), new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.3 }));
      const b3Pages = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.12, 0.54), pageMat);
      b3Pages.position.set(0.03, 0, 0);
      const book3 = new THREE.Group();
      book3.add(b3Cover, b3Pages);
      book3.position.y = 0.2;
      book3.rotation.y = -0.12;

      // Gold ribbon bookmark hanging from top book
      const ribMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
      const ribbon = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.22, 0.02), ribMat);
      ribbon.position.set(0.38, 0.12, 0.1);

      group.add(book1, book2, book3, ribbon);
      break;
    }

    case 'chart-wedge': {
      // 📈 Quant-Tech-Rotator: 3D Stock Market Growth Chart with 3 Ascending Green Bars & Trajectory Arrow
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });
      const baseGrid = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.65), baseMat);

      const bar1Mat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.2 });
      const bar1 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.28, 0.18), bar1Mat);
      bar1.position.set(-0.28, 0.17, 0);

      const bar2Mat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.2 });
      const bar2 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.52, 0.18), bar2Mat);
      bar2.position.set(0, 0.29, 0);

      const bar3Mat = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.2, emissive: 0x22c55e, emissiveIntensity: 0.2 });
      const bar3 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.82, 0.18), bar3Mat);
      bar3.position.set(0.28, 0.44, 0);

      // Ascending trajectory arrow
      const arrowMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.6 });
      const arrowShaft = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.04, 0.04), arrowMat);
      arrowShaft.position.set(0, 0.44, 0.16);
      arrowShaft.rotation.z = 0.42;

      const arrowHead = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.2, 8), arrowMat);
      arrowHead.position.set(0.38, 0.62, 0.16);
      arrowHead.rotation.z = -1.15;

      group.add(baseGrid, bar1, bar2, bar3, arrowShaft, arrowHead);
      break;
    }

    case 'paper-layers': {
      // 📑 PdfMerger: Two 3D Document Pages with Paperclip
      const p1Mat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
      const page1 = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.95, 0.03), p1Mat);

      const p2Mat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 });
      const page2 = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.95, 0.03), p2Mat);
      page2.position.set(0.08, -0.06, -0.04);
      page2.rotation.z = -0.12;

      const clipMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
      const clip = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 6, 20), clipMat);
      clip.position.set(-0.2, 0.48, 0.02);

      group.add(page1, page2, clip);
      break;
    }

    case 'qr-tile': {
      // ⬛ QR Generator: 3D Beveled White Plate with Raised Black QR Corner Alignment Squares
      const tileMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
      const tile = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.88, 0.08), tileMat);

      const blockMat = new THREE.MeshStandardMaterial({ color: 0x020617, roughness: 0.3 });
      
      // 3 Outer corner squares
      const corners = [
        [-0.26, 0.26],
        [0.26, 0.26],
        [-0.26, -0.26]
      ];
      corners.forEach(([cx, cy]) => {
        const outer = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.04), blockMat);
        outer.position.set(cx, cy, 0.05);
        const innerHole = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.05), tileMat);
        innerHole.position.set(cx, cy, 0.055);
        const centerDot = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.06), blockMat);
        centerDot.position.set(cx, cy, 0.06);
        group.add(outer, innerHole, centerDot);
      });

      // Data bit blocks
      const dataBits = [
        [0.08, -0.18], [0.22, -0.12], [0.26, -0.28], [0, 0], [0.12, 0.06]
      ];
      dataBits.forEach(([bx, by]) => {
        const bit = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.04), blockMat);
        bit.position.set(bx, by, 0.05);
        group.add(bit);
      });

      group.add(tile);
      break;
    }

    default: {
      // 🌐 mirconegri.com: Blue-and-Green 3D Terrestrial Globe with Network Orbit Ring & Satellite
      const oceanMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3, metalness: 0.1 });
      const globe = new THREE.Mesh(new THREE.SphereGeometry(0.52, 24, 24), oceanMat);

      // Elevated continent landmasses
      const landMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });
      const cont1 = new THREE.Mesh(new THREE.SphereGeometry(0.53, 12, 12, 0, Math.PI * 0.7, 0, Math.PI * 0.6), landMat);
      const cont2 = new THREE.Mesh(new THREE.SphereGeometry(0.53, 12, 12, Math.PI, Math.PI * 0.6, Math.PI * 0.3, Math.PI * 0.5), landMat);

      // Metallic meridian orbit ring
      const ringMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.2 });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.03, 8, 36), ringMat);
      ring.rotation.x = Math.PI / 2.3;

      // Orbiting mini communications satellite
      const satMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.5 });
      const satellite = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), satMat);
      satellite.position.set(0.78, 0, 0);
      ring.add(satellite);

      group.add(globe, cont1, cont2, ring);
      break;
    }
  }

  return group;
}

function DesktopProjectOrbit({ isItalian }: { isItalian: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeProject, setActiveProject] = useState<ProjectSatellite | null>(null);
  const [activeRadius, setActiveRadius] = useState<number>(0);
  const [activeSpeed, setActiveSpeed] = useState<number>(0);
  const [isGlitching, setIsGlitching] = useState<boolean>(false);

  const unfocusRef = useRef<() => void>(() => {});
// using passed isItalian prop

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;
    let isOrbitingPaused = false;
    let hoveredMesh: THREE.Mesh | null = null;
    let focusedMesh: THREE.Mesh | null = null;

    const width = container.clientWidth || window.innerWidth;
    const isMobile = width < 768;
    const height = Math.max(340, Math.min(560, isMobile ? 360 : width * 0.46));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x080b12, 35, 95);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const defaultCameraPosition = new THREE.Vector3(isMobile ? 12 : 14, isMobile ? 14 : 12, isMobile ? 50 : 36);
    camera.position.copy(defaultCameraPosition);
    const lookTarget = new THREE.Vector3(0, 0, 0);
    camera.lookAt(lookTarget);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));

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
    const corePlanetGeom = new THREE.SphereGeometry(2.65, 32, 32);
    const corePlanetMat = new THREE.MeshStandardMaterial({
      color: 0x0d121c,
      metalness: 0.6,
      roughness: 0.3,
      emissive: 0x060d1a,
      emissiveIntensity: 0.5,
    });
    const coreSphere = new THREE.Mesh(corePlanetGeom, corePlanetMat);
    gitHubGroup.add(coreSphere);

    // Prominent GitHub Logo Crest Medallion (radius 3.0 exceeds 2.65 sphere so it sits prominently on front & back)
    const ghTexture = createGitHubTexture();
    const medallionGeom = new THREE.CylinderGeometry(2.95, 2.95, 0.35, 48);
    const medallionSideMat = new THREE.MeshStandardMaterial({
      color: 0x1a2334,
      metalness: 0.85,
      roughness: 0.2,
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

    // Primary luminous equatorial neon cyan planetary ring
    const ghRingGeom = new THREE.RingGeometry(3.4, 4.3, 64);
    const ghRingMat = new THREE.MeshBasicMaterial({
      color: 0x6fd3e0,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ghRing = new THREE.Mesh(ghRingGeom, ghRingMat);
    ghRing.rotation.x = Math.PI / 2.2;
    gitHubGroup.add(ghRing);

    // Secondary angled golden-orange accent ring
    const ghRing2Geom = new THREE.RingGeometry(4.6, 4.9, 64);
    const ghRing2Mat = new THREE.MeshBasicMaterial({
      color: 0xff5a2c,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ghRing2 = new THREE.Mesh(ghRing2Geom, ghRing2Mat);
    ghRing2.rotation.x = Math.PI / 3.2;
    gitHubGroup.add(ghRing2);

    // Soft celestial core point light illuminating nearby satellites
    const ghPointLight = new THREE.PointLight(0x6fd3e0, 2.2, 35);
    gitHubGroup.add(ghPointLight);

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
          const m = (child as THREE.Mesh).material;
          if (Array.isArray(m)) {
            m.forEach((mat) => {
              if (mat instanceof THREE.MeshStandardMaterial) materials.push(mat);
            });
          } else if (m instanceof THREE.MeshStandardMaterial) {
            materials.push(m);
          }
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
      const isMob = w < 768;
      const h = Math.max(340, Math.min(560, isMob ? 360 : w * 0.46));
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMob ? 1.5 : 2));
      camera.aspect = w / h;
      if (!focusedMesh) {
        defaultCameraPosition.set(isMob ? 12 : 14, isMob ? 14 : 12, isMob ? 50 : 36);
        camera.position.copy(defaultCameraPosition);
      }
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    let isVisible = true;

    // ==========================================
    // ANIMATION LOOP (CONSTANT SLOW SPEED)
    // ==========================================
    const loop = () => {
      if (!isVisible) return;
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

    // Pause rendering when scrolled out of view to preserve mobile GPU
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animId);
        loop();
      } else {
        cancelAnimationFrame(animId);
      }
    }, { threshold: 0.05 });
    observer.observe(container);

    loop();

    return () => {
      observer.disconnect();
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


// Mobile swipeable project cards carousel using hardware-accelerated CSS scroll snap.
function MobileProjectCarousel({ isItalian }: { isItalian: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const cardWidth = (first?.offsetWidth || 280) + 12;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(ALL_PROJECTS.length - 1, index)));
  };

  const scrollToCard = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = el.children[index] as HTMLElement | null;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  return (
    <div className="mobile-orbit-container">
      <div className="mobile-orbit-header">
        <span className="mobile-orbit-badge">
          <span className="mobile-orbit-dot" />
          {isItalian ? 'Progetti interattivi' : 'Interactive projects'}
        </span>
        <span className="mobile-orbit-counter">
          {String(activeIndex + 1).padStart(2, '0')} / {ALL_PROJECTS.length}
        </span>
      </div>

      <div
        className="mobile-orbit-track"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {ALL_PROJECTS.map((proj, idx) => (
          <div
            key={proj.id}
            className={`mobile-project-card ${idx === activeIndex ? 'is-active' : ''}`}
            style={{
              '--proj-color': proj.color,
            } as React.CSSProperties}
          >
            <div className="mobile-card-top">
              <div className="mobile-card-emoji-wrap">
                <span className="mobile-card-emoji">{proj.emoji}</span>
              </div>
              <span className="mobile-card-index">#{proj.index}</span>
            </div>

            <div className="mobile-card-body">
              <h3 className="mobile-card-title">{proj.name}</h3>
              <span className="mobile-card-type">
                {isItalian ? proj.typeIt : proj.typeEn}
              </span>
              <p className="mobile-card-desc">
                {isItalian ? proj.descIt : proj.descEn}
              </p>
            </div>

            <div className="mobile-card-footer">
              <span className="mobile-card-meta">{proj.meta}</span>
              <a
                href={proj.url}
                target="_blank"
                rel="noopener"
                className="btn btn--sm mobile-card-btn"
              >
                <span>GitHub</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mobile-orbit-dots">
        {ALL_PROJECTS.map((proj, idx) => (
          <button
            key={proj.id}
            type="button"
            className={`mobile-orbit-dot-btn ${idx === activeIndex ? 'is-active' : ''}`}
            onClick={() => scrollToCard(idx)}
            aria-label={`Project ${proj.name}`}
          />
        ))}
      </div>

      <div className="mobile-orbit-hint">
        <span>{isItalian ? '← Scorri per esplorare tutti i 15 progetti →' : '← Swipe to explore all 15 projects →'}</span>
      </div>
    </div>
  );
}

// Adaptive project showcase serving touch carousel on mobile and 3D solar system on desktop.
export default function ProjectOrbit() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
  });
  const [isItalian, setIsItalian] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.lang === 'it';
  });

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    const onLang = () => {
      setIsItalian(document.documentElement.lang === 'it');
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('mn:languagechange', onLang);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mn:languagechange', onLang);
    };
  }, []);

  if (isMobile) {
    return <MobileProjectCarousel isItalian={isItalian} />;
  }

  return <DesktopProjectOrbit isItalian={isItalian} />;
}
