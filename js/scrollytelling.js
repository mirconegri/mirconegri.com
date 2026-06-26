/* ════════════════════════════════════════════════
   3D SCROLLYTELLING — Fly-through
   by: js/scrollytelling.js

   Stack: Three.js r128 · GSAP 3 + ScrollTrigger · GLTFLoader
   Modello: assets/house.glb

   Dipendenze CDN (aggiungere in <head> nell'ordine):
     1. three.min.js         ← già presente nel tuo index.html
     2. gsap.min.js
     3. ScrollTrigger.min.js
     4. GLTFLoader.js

   Markup necessario nel body (es. tra #hero e #about):
     <section id="fly-section"> ... </section>
     (vedi commento HTML in fondo al file)

   CSS necessario (aggiungere in extras.css o sections.css):
     (vedi commento CSS in fondo al file)
════════════════════════════════════════════════ */
(function initScrollytelling() {
  'use strict';

  /* ──────────────────────────────────────────────
     GUARD — verifica sezione, canvas e dipendenze
  ────────────────────────────────────────────── */
  const section = document.getElementById('fly-section');
  const canvas  = document.getElementById('fly-canvas');
  if (!section || !canvas) return;

  const deps = [
    [typeof THREE === 'undefined',                                  'Three.js'],
    [typeof gsap  === 'undefined',                                  'GSAP'],
    [typeof ScrollTrigger === 'undefined',                          'ScrollTrigger'],
    [typeof THREE !== 'undefined' && !THREE.GLTFLoader,             'GLTFLoader'],
  ].filter(([fail]) => fail).map(([, name]) => name);

  if (deps.length) {
    console.warn('[Fly-through] Dipendenze mancanti:', deps.join(', '));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ══════════════════════════════════════════════
     1 · RENDERER
  ══════════════════════════════════════════════ */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding      = THREE.sRGBEncoding;
  renderer.toneMapping         = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled   = true;
  renderer.shadowMap.type      = THREE.PCFSoftShadowMap;

  /* ══════════════════════════════════════════════
     2 · SCENA + CAMERA
  ══════════════════════════════════════════════ */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    65,                                   // FOV — 65° = visione umana naturale
    window.innerWidth / window.innerHeight,
    0.05,                                 // near — vicino alle pareti
    200                                   // far  — abbastanza per stanze ampie
  );
  camera.up.set(0, 1, 0);               // evita il camera roll

  /* ══════════════════════════════════════════════
     3 · LUCI
     Tre sorgenti per bilanciare indoor + outdoor:
       hemiLight → luce ambientale cielo/suolo
       sunLight  → sole principale con ombre morbide
       fillLight → rimepie le ombre dure (luce di riempimento)
  ══════════════════════════════════════════════ */
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.5);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
  sunLight.position.set(8, 12, 6);
  sunLight.castShadow = true;
  sunLight.shadow.camera.near   = 0.5;
  sunLight.shadow.camera.far    = 80;
  sunLight.shadow.camera.left   = sunLight.shadow.camera.bottom = -20;
  sunLight.shadow.camera.right  = sunLight.shadow.camera.top   =  20;
  sunLight.shadow.mapSize.set(2048, 2048);
  scene.add(sunLight);

  const fillLight = new THREE.DirectionalLight(0x8ca7d4, 0.3);
  fillLight.position.set(-6, 4, -8);
  scene.add(fillLight);

  /* ══════════════════════════════════════════════
     4 · TEMA — si sincronizza al tasto Light/Dark
     del tuo sito esistente ascoltando il click su #themeBtn
  ══════════════════════════════════════════════ */
  function applyTheme() {
    const light = document.documentElement.classList.contains('light-mode');

    scene.background = new THREE.Color(light ? 0xf0eef8 : 0x07070a);

    hemiLight.color.setHex(light ? 0xfff5e6 : 0xaaccff);
    hemiLight.groundColor.setHex(light ? 0xe8d5b7 : 0x0d1a22);
    hemiLight.intensity = light ? 0.9  : 0.35;

    sunLight.color.setHex(light ? 0xfff9f0 : 0xeeeeff);
    sunLight.intensity  = light ? 1.6  : 0.7;

    fillLight.color.setHex(light ? 0xd4c8b0 : 0x6688aa);
    fillLight.intensity = light ? 0.15 : 0.35;
  }
  applyTheme();
  document.getElementById('themeBtn')
    ?.addEventListener('click', () => setTimeout(applyTheme, 50));

  /* ══════════════════════════════════════════════
     5 · PERCORSO CAMERA — CatmullRomCurve3
     ─────────────────────────────────────────────
     ▸ Y ≈ 1.7 corrisponde all'altezza occhi (assumendo
       che 1 unit del modello = 1 metro reale).
     ▸ Questi sono waypoint PLACEHOLDER per un modello
       ipotetico. SOSTITUISCILI con le coordinate reali
       del tuo house.glb (usa il DEBUG_MODE a fondo file).
     ▸ Aggiungi quanti punti vuoi: la curva interpolerà
       automaticamente tra tutti.
     ─────────────────────────────────────────────
     Struttura consigliata per una visita a casa:
       [0] Esterno, davanti alla porta
       [1] Avvicinamento all'ingresso
       [2] Passaggio della soglia
       [3] Corridoio / Ingresso
       [4] Svolta verso il soggiorno
       [5] Ingresso soggiorno
       [6] Centro del soggiorno
       [7] Panoramica finale / punto d'uscita
  ══════════════════════════════════════════════ */
  const WAYPOINTS = [
    new THREE.Vector3(  0,  1.7,  10 ),   // 0 — esterno
    new THREE.Vector3(  0,  1.7,   5 ),   // 1 — avvicinamento porta
    new THREE.Vector3(  0,  1.7,   0.5 ), // 2 — soglia ingresso
    new THREE.Vector3(  0,  1.7,  -2 ),   // 3 — corridoio
    new THREE.Vector3(  2,  1.7,  -4 ),   // 4 — svolta destra
    new THREE.Vector3(  4,  1.7,  -6 ),   // 5 — porta soggiorno
    new THREE.Vector3(  4,  1.7, -10 ),   // 6 — dentro il soggiorno
    new THREE.Vector3(  0,  1.7, -12 ),   // 7 — panoramica finale
  ];

  /*
   * tension: controlla quanto la curva "tira" verso i waypoint.
   *   0   = curva molto morbida (si allontana dai punti)
   *   0.5 = bilanciato (default consigliato)
   *   1   = curva tesa, quasi spigolosa
   */
  const curve = new THREE.CatmullRomCurve3(WAYPOINTS, false, 'catmullrom', 0.5);

  /* Posiziona la camera al punto iniziale prima che l'utente scrolli */
  const lookAtTarget = curve.getPointAt(0.008).clone();
  camera.position.copy(curve.getPointAt(0));
  camera.lookAt(lookAtTarget);

  /* ══════════════════════════════════════════════
     6 · SCROLL — GSAP + ScrollTrigger
     ─────────────────────────────────────────────
     Il "pin" è gestito da CSS (position: sticky su #fly-pin).
     ScrollTrigger qui ha il solo compito di aggiornare
     il valore proxy.t da 0 → 1 in funzione dello scroll.
     scrub: 1.5 → la camera continua a muoversi per 1.5s
     dopo che l'utente si ferma (feel cinematografico).
  ══════════════════════════════════════════════ */
  const proxy       = { t: 0 };
  const progressBar = document.getElementById('fly-progress-bar');
  const hintEl      = document.getElementById('fly-hint');

  if (hintEl) hintEl.style.display = 'none'; // nascosto finché il modello carica

  gsap.timeline({
    scrollTrigger: {
      trigger: '#fly-section',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate(st) {
        /* barra di avanzamento sovrapposta al canvas */
        if (progressBar) progressBar.style.width = (st.progress * 100) + '%';
      },
    },
  }).to(proxy, { t: 1, ease: 'none', duration: 1 });

  /* ══════════════════════════════════════════════
     7 · CARICAMENTO GLB
     ─────────────────────────────────────────────
     NOTA DRACO: se esporti da Blender con compressione
     Draco attiva (riduce il file ~70%), aggiungi in <head>:
       <script src="https://unpkg.com/three@0.128.0/examples/js/loaders/DRACOLoader.js"></script>
     E decommenta le 3 righe "draco" qui sotto.
  ══════════════════════════════════════════════ */
  const loadingEl = document.getElementById('fly-loading');

  const gltfLoader = new THREE.GLTFLoader();

  /* const draco = new THREE.DRACOLoader();                                          */
  /* draco.setDecoderPath('https://unpkg.com/three@0.128.0/examples/js/libs/draco/'); */
  /* gltfLoader.setDRACOLoader(draco);                                                */

  gltfLoader.load(
    'assets/house.glb',

    /* onLoad ─ modello pronto */
    (gltf) => {
      gltf.scene.traverse((node) => {
        if (!node.isMesh) return;
        node.castShadow    = true;
        node.receiveShadow = true;
        /* Encoding corretto per le texture di colore */
        if (node.material?.map)          node.material.map.encoding          = THREE.sRGBEncoding;
        if (node.material?.emissiveMap)  node.material.emissiveMap.encoding  = THREE.sRGBEncoding;
      });
      scene.add(gltf.scene);

      if (loadingEl) loadingEl.style.display = 'none';
      if (hintEl)    hintEl.style.display    = 'block';
    },

    /* onProgress ─ aggiorna testo di caricamento */
    (xhr) => {
      if (loadingEl && xhr.total) {
        const pct = Math.round((xhr.loaded / xhr.total) * 100);
        loadingEl.innerHTML =
          `<span class="fly-loading-dot"></span>\u2002Caricamento modello\u2026 ${pct}%`;
      }
    },

    /* onError */
    (err) => {
      console.error('[Fly-through] Errore caricamento GLB:', err);
      if (loadingEl) {
        loadingEl.innerHTML = '\u26a0\ufe0f\u2009Aggiungi <code>assets/house.glb</code>';
        loadingEl.style.color = '#f43f5e';
      }
    }
  );

  /* ══════════════════════════════════════════════
     8 · RENDER LOOP
     ─────────────────────────────────────────────
     LOOKAHEAD: piccolo offset aggiunto a t per calcolare
     il punto "davanti" lungo la curva, usato da camera.lookAt().
     Valori:
       0.005 → sguardo quasi tangente (giri bruschi)
       0.01  → valore equilibrato (default)
       0.025 → anticipazione ampia (giri morbidissimi)
  ══════════════════════════════════════════════ */
  const LOOKAHEAD = 0.01;

  let orbitControls = null; // usato solo in DEBUG_MODE

  function updateCamera() {
    const t      = Math.max(0.0001, Math.min(proxy.t, 0.9999));
    const tLook  = Math.min(t + LOOKAHEAD, 0.9999);

    const camPos  = curve.getPointAt(t);
    const lookPos = curve.getPointAt(tLook);

    camera.position.copy(camPos);

    /* lerp(0.15): smussamento del lookAt — evita scatti
       nei punti di cambio direzione della curva */
    lookAtTarget.lerp(lookPos, 0.15);
    camera.lookAt(lookAtTarget);
  }

  (function renderLoop() {
    requestAnimationFrame(renderLoop);
    if (orbitControls) orbitControls.update(); // solo in DEBUG
    else updateCamera();
    renderer.render(scene, camera);
  })();

  /* ══════════════════════════════════════════════
     9 · RESIZE
  ══════════════════════════════════════════════ */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, { passive: true });

  /* ══════════════════════════════════════════════
     10 · DEBUG MODE
     ─────────────────────────────────────────────
     Imposta DEBUG_MODE = true, poi nel browser:
       • Naviga libero nella scena con il mouse
         (richiede OrbitControls, vedi CDN in fondo)
       • CLICCA su qualsiasi punto del modello →
         le coordinate compaiono in console, già
         formattate come THREE.Vector3 pronti da
         incollare nell'array WAYPOINTS sopra.
       • I waypoint attuali sono visibili come
         sfere arancioni; il percorso è la linea rossa.

     ✂️ Lascia DEBUG_MODE = false in produzione.
     Aggiunta CDN per OrbitControls (in <head>):
       <script src="https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
  ══════════════════════════════════════════════ */
  const DEBUG_MODE = false;

  if (DEBUG_MODE) {
    /* Traiettoria della curva (linea rossa) */
    scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(300)),
      new THREE.LineBasicMaterial({ color: 0xff3366 })
    ));

    /* Sfere sui waypoint */
    WAYPOINTS.forEach((wp, i) => {
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        new THREE.MeshBasicMaterial({ color: i === 0 ? 0x00ff88 : 0xffaa00 })
      );
      dot.position.copy(wp);
      scene.add(dot);
      console.log(`%cWaypoint[${i}]`, 'color:#ffaa00;font-weight:bold',
        `Vector3(${wp.x.toFixed(2)}, ${wp.y.toFixed(2)}, ${wp.z.toFixed(2)})`);
    });

    /* AxesHelper: X rosso, Y verde, Z blu */
    scene.add(new THREE.AxesHelper(3));

    /* OrbitControls per navigare liberamente */
    if (typeof THREE.OrbitControls !== 'undefined') {
      orbitControls = new THREE.OrbitControls(camera, canvas);
      orbitControls.enableDamping = true;
      orbitControls.dampingFactor = 0.08;
      console.log('%c[Fly-through] OrbitControls attivi.', 'color:#06b6d4');
    } else {
      console.warn('[Fly-through] DEBUG: OrbitControls non trovato. Aggiungi il CDN.');
    }

    /* Click → log coordinate in formato THREE.Vector3 */
    const _ray   = new THREE.Raycaster();
    const _mouse = new THREE.Vector2();

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      _mouse.set(
        ((e.clientX - rect.left) / rect.width)  *  2 - 1,
        ((e.clientY - rect.top)  / rect.height) * -2 + 1
      );
      _ray.setFromCamera(_mouse, camera);

      const hits = _ray.intersectObjects(scene.children, true);
      if (!hits.length) return;

      const p = hits[0].point;
      console.log(
        `%c\uD83D\uDCCD  new THREE.Vector3(${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}),`,
        'color:#7c3aed; font-weight:bold; font-family:monospace; font-size:13px'
      );

      /* Sfera rossa temporanea nel punto cliccato */
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
      );
      marker.position.copy(p);
      scene.add(marker);
    });

    console.log(
      '%c[Fly-through] DEBUG MODE ON\n%cClicca su qualsiasi punto del modello per loggare le coordinate.',
      'color:#7c3aed; font-size:14px; font-weight:bold',
      'color:#C6CDD8'
    );
  }

})();

/* ════════════════════════════════════════════════
   ▼ SNIPPET HTML — incolla nel body di index.html,
     tra il <div class="divider"></div> post-hero
     e la <section id="about">

   <section id="fly-section">
     <div id="fly-pin">
       <canvas id="fly-canvas"></canvas>
       <div id="fly-ui">
         <div id="fly-loading">
           <span class="fly-loading-dot"></span>&ensp;Inizializzazione…
         </div>
         <div id="fly-progress-wrap">
           <div id="fly-progress-bar"></div>
         </div>
         <p id="fly-hint"
            data-it="Scorri per esplorare"
            data-en="Scroll to explore">
           Scorri per esplorare
         </p>
       </div>
     </div>
   </section>

════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════
   ▼ SNIPPET CSS — incolla in extras.css
     (o in sections.css nella sezione dedicata)

   #fly-section {
     height: 400vh;        /* altezza totale scrollabile — aumenta per percorsi più lunghi */
     position: relative;
     z-index: 1;
   }

   #fly-pin {
     position: sticky;
     top: 0;
     height: 100vh;
     width: 100%;
     overflow: hidden;
     background: #07070a; /* colore di fallback prima che Three.js parta */
   }
   html.light-mode #fly-pin { background: #f0eef8; }

   #fly-canvas {
     display: block;
     width: 100%;
     height: 100%;
   }

   /* Overlay UI sovrapposto al canvas */
   #fly-ui {
     position: absolute;
     inset: 0;
     pointer-events: none;
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: flex-end;
     padding: 2rem 2rem 2.5rem;
     gap: 0.65rem;
   }

   #fly-loading {
     display: flex;
     align-items: center;
     gap: 0.5rem;
     font-family: 'JetBrains Mono', monospace;
     font-size: 0.62rem;
     letter-spacing: 0.12em;
     text-transform: uppercase;
     color: rgba(245,247,250,0.5);
   }
   .fly-loading-dot {
     width: 5px; height: 5px;
     border-radius: 50%;
     background: #7c3aed;
     animation: fly-pulse 1s ease infinite;
   }
   @keyframes fly-pulse {
     0%,100% { opacity: 1; transform: scale(1); }
     50%      { opacity: 0.2; transform: scale(0.8); }
   }

   #fly-progress-wrap {
     width: 140px;
     height: 1px;
     background: rgba(255,255,255,0.08);
     border-radius: 1px;
     overflow: hidden;
   }
   #fly-progress-bar {
     height: 100%;
     width: 0%;
     background: linear-gradient(90deg, #7c3aed, #06b6d4);
     box-shadow: 0 0 8px rgba(124,58,237,0.7);
     transition: width 0.08s linear;
   }

   #fly-hint {
     font-family: 'JetBrains Mono', monospace;
     font-size: 0.57rem;
     letter-spacing: 0.18em;
     text-transform: uppercase;
     color: rgba(245,247,250,0.28);
   }

════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════
   ▼ SNIPPET CDN <head> — nell'ordine esatto,
     DOPO il tag <script> di three.min.js esistente.

   <!-- GSAP 3 core -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

   <!-- ScrollTrigger plugin -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

   <!-- GLTFLoader (deve caricare DOPO three.min.js) -->
   <script src="https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>

   <!-- OrbitControls — solo per DEBUG_MODE, rimuovi in produzione -->
   <!-- <script src="https://unpkg.com/three@0.128.0/examples/js/controls/OrbitControls.js"></script> -->

   In fondo al <body>, insieme agli altri script:
   <script src="js/scrollytelling.js"></script>

════════════════════════════════════════════════ */
