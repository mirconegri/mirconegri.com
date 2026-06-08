/* ════════════════════════════════════════════════
   3D WIREFRAME (Three.js icosahedron)
════════════════════════════════════════════════ */
(function init3D() {
  const container = document.getElementById('hero-3d');
  if (!container || typeof THREE === 'undefined') return;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Ho ridotto il raggio da 2 a 1.6 per farlo respirare di più
  const shape = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.6, 1),
    new THREE.MeshBasicMaterial({ color: 0x8B93A3, wireframe: true, transparent: true, opacity: 0.35 })
  );
  scene.add(shape);
  
  // Ho allontanato la camera (da 5 a 6.5) per far entrare tutta la figura
  camera.position.z = 6.5;

  let meshMouseX = 0, meshMouseY = 0;
  let meshTargetX = 0, meshTargetY = 0;
  const halfW = window.innerWidth / 2;
  const halfH = window.innerHeight / 2;

  document.addEventListener('mousemove', e => {
    meshMouseX = (e.clientX - halfW) * 0.001;
    meshMouseY = (e.clientY - halfH) * 0.001;
  });

  (function animate() {
    requestAnimationFrame(animate);
    shape.rotation.x += 0.001;
    shape.rotation.y += 0.002;
    meshTargetX = meshMouseX * 1.5;
    meshTargetY = meshMouseY * 1.5;
    shape.rotation.y += 0.05 * (meshTargetX - shape.rotation.y);
    shape.rotation.x += 0.05 * (meshTargetY - shape.rotation.x);
    renderer.render(scene, camera);
  })();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();
