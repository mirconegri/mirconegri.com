/* ════════════════════════════════════════════════
   3D WIREFRAME (Three.js icosahedron)
════════════════════════════════════════════════ */
(function init3D() {
  const container = document.getElementById('hero-3d');
  if (!container || typeof THREE === 'undefined') return;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  // Sfondo trasparente per far vedere l'aurora sotto
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Manteniamo le proporzioni originarie
  const shape = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2, 1),
    new THREE.MeshBasicMaterial({ color: 0x8B93A3, wireframe: true, transparent: true, opacity: 0.35 })
  );
  scene.add(shape);
  camera.position.z = 5;

  // FIX DEFINITIVO: Scala la figura in base allo spazio verticale disponibile
  function updateSize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    
    // Aggiorna la telecamera
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);

    // Se l'altezza della finestra è inferiore a 850px (schermi schiacciati),
    // riduciamo in scala l'icosaedro. Altrimenti lo lasciamo a grandezza naturale (1).
    const scaleFactor = Math.min(1, h / 850); 
    shape.scale.set(scaleFactor, scaleFactor, scaleFactor);
  }

  // Applica subito il calcolo non appena carica la pagina
  updateSize();

  let meshMouseX = 0, meshMouseY = 0;
  let meshTargetX = 0, meshTargetY = 0;
  const halfW = window.innerWidth / 2;
  const halfH = window.innerHeight / 2;

  // Traccia il mouse per l'effetto rotazione
  document.addEventListener('mousemove', e => {
    meshMouseX = (e.clientX - halfW) * 0.001;
    meshMouseY = (e.clientY - halfH) * 0.001;
  });

  // Animazione a loop
  (function animate() {
    requestAnimationFrame(animate);
    shape.rotation.x += 0.001;
    shape.rotation.y += 0.002;
    meshTargetX = meshMouseX * 1.5;
    meshTargetY = meshMouseY * 1.5;
    
    // Interpolazione fluida per seguire il mouse
    shape.rotation.y += 0.05 * (meshTargetX - shape.rotation.y);
    shape.rotation.x += 0.05 * (meshTargetY - shape.rotation.x);
    renderer.render(scene, camera);
  })();

  // Quando ridimensioni la finestra, ricalcola le scale
  window.addEventListener('resize', updateSize);
})();
