/* ════════════════════════════════════════════════
   AURORA CANVAS — animated gradient blobs
════════════════════════════════════════════════ */
(function aurora() {
  const canvas = document.getElementById('aurora-canvas');
  const ctx    = canvas.getContext('2d');
  let W, H;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const blobs = [
    { x:.15, y:.25, r:.95, colorA:'#c0305a', colorB:'#b84000', speed:.00108, phase:0,   drift:.00072 },
    { x:.80, y:.20, r:.90, colorA:'#5a3aed', colorB:'#3a20c0', speed:.00078, phase:2.1, drift:.00054 },
    { x:.50, y:.70, r:1.05,colorA:'#2244cc', colorB:'#5500bb', speed:.00090, phase:4.3, drift:.00066 },
    { x:.85, y:.75, r:.85, colorA:'#aa0077', colorB:'#7700bb', speed:.00060, phase:1.2, drift:.00048 },
    { x:.20, y:.75, r:.80, colorA:'#0055aa', colorB:'#3300cc', speed:.00120, phase:3.5, drift:.00084 },
  ];

  function hexToRgb(hex) {
    return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
  }
  function lerp(a,b,v) { return a+(b-a)*v }

  function drawBlob(blob, time, isLight) {
    const px = blob.x + Math.sin(time * blob.speed + blob.phase * 1000) * 0.18
                      + Math.cos(time * blob.drift + blob.phase * 1.3)  * 0.10;
    const py = blob.y + Math.cos(time * blob.speed + blob.phase * 1000) * 0.14
                      + Math.sin(time * blob.drift + blob.phase * 0.7 + 2) * 0.08;
    const rad = blob.r * (isLight ? 1.8 : 1.0) * Math.min(W,H) * (1 + 0.05 * Math.sin(time * 0.0007 + blob.phase));
    const mix = (Math.sin(time * 0.0004 + blob.phase) + 1) / 2;
    const cA  = hexToRgb(blob.colorA), cB = hexToRgb(blob.colorB);
    const r   = Math.round(lerp(cA[0],cB[0],mix));
    const g   = Math.round(lerp(cA[1],cB[1],mix));
    const b   = Math.round(lerp(cA[2],cB[2],mix));

    const grad = ctx.createRadialGradient(px*W, py*H, 0, px*W, py*H, rad);
    if (isLight) {
      grad.addColorStop(0,    `rgba(${r},${g},${b},0.55)`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},0.30)`);
      grad.addColorStop(0.7,  `rgba(${r},${g},${b},0.12)`);
      grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);
    } else {
      grad.addColorStop(0,    `rgba(${r},${g},${b},0.35)`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},0.18)`);
      grad.addColorStop(0.7,  `rgba(${r},${g},${b},0.08)`);
      grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px*W, py*H, rad, 0, Math.PI*2);
    ctx.fill();
  }

  function frame(ts) {
    ctx.clearRect(0, 0, W, H);
    const isLight = document.documentElement.classList.contains('light-mode');
    if (isLight) {
      ctx.fillStyle = '#F0EEF8';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'multiply';
    } else {
      ctx.globalCompositeOperation = 'screen';
    }
    blobs.forEach(b => drawBlob(b, ts, isLight));
    ctx.globalCompositeOperation = 'source-over';
    const vig = ctx.createRadialGradient(W/2,H/2,H*.1,W/2,H/2,H*.9);
    if (isLight) {
      vig.addColorStop(0, 'rgba(240,238,248,0)');
      vig.addColorStop(1, 'rgba(220,216,240,0.55)');
    } else {
      vig.addColorStop(0, 'rgba(7,7,10,0)');
      vig.addColorStop(1, 'rgba(7,7,10,0.35)');
    }
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
