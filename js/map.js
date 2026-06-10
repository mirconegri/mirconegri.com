/* ════════════════════════════════════════════════
   EXPERIENCE MAP — Canvas 2D, no dependencies
   Coordinate WGS84, proiezione equirettangolare
════════════════════════════════════════════════ */
(function initExpMap() {
  const canvas = document.getElementById('exp-map-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const outer = canvas.parentElement;

  /* ── Proiezione ── */
  const LON_MIN = -12, LON_MAX = 45;
  const LAT_MIN = 33,  LAT_MAX = 73;
  const PAD = { t: 36, b: 36, l: 24, r: 24 };

  function project(lon, lat) {
    const W = canvas.width, H = canvas.height;
    const x = PAD.l + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (W - PAD.l - PAD.r);
    const y = PAD.t + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (H - PAD.t - PAD.b);
    return [x, y];
  }

  /* ── Polilinee continente ── */
  const SHAPES = [
    // Penisola iberica
    [[-9,44],[-9,36],[-6,36],[-2,37],[0,38],[3,41],[3,44],[-1,44],[-4,44],[-6,44],[-9,44]],
    // Francia + BeNeLux
    [[-2,44],[3,44],[5,45],[7,44],[8,47],[7,49],[5,50],[4,51],[3,52],[5,53],[8,54],[7,55],[5,50],[2,51],[-2,49],[-2,48],[-2,44]],
    // Isole britanniche
    [[-5,50],[-4,50],[-3,52],[-4,54],[-5,55],[-4,57],[-3,58],[-2,57],[-1,55],[0,53],[1,52],[0,51],[-2,51],[-5,50]],
    [[-10,52],[-6,52],[-6,54],[-8,55],[-10,53],[-10,52]],
    // Scandinavia
    [[5,57],[8,57],[10,56],[12,56],[12,58],[14,59],[17,60],[19,61],[20,64],[25,65],[28,71],[25,71],[20,70],[15,69],[14,67],[12,64],[7,62],[5,59],[5,57]],
    // Europa centrale + Italia
    [[8,47],[13,47],[16,49],[17,51],[20,51],[22,52],[24,54],[20,54],[18,57],[15,57],[13,56],[12,56],[14,54],[13,52],[15,51],[17,50],[18,49],[17,48],[16,47],[14,46],[13,44],[12,44],[14,41],[16,38],[15,37],[13,38],[11,38],[10,40],[12,42],[13,44],[10,44],[7,44],[8,47]],
    // Balcani + Grecia
    [[16,47],[17,48],[19,46],[20,44],[18,42],[20,40],[22,37],[24,38],[26,40],[28,41],[30,41],[28,44],[26,46],[24,47],[22,48],[20,50],[18,49],[17,48]],
    [[22,37],[24,38],[26,40],[26,37],[24,36],[22,37]],
    // Paesi baltici abbozzati
    [[21,54],[22,57],[24,57],[26,59],[28,60],[28,58],[26,57],[24,55],[22,55],[21,54]],
    // Finlandia abbozzata
    [[20,60],[24,60],[26,62],[28,65],[29,69],[27,70],[25,69],[22,68],[20,65],[18,63],[20,60]],
  ];

  /* ── Pin ── */
  const PLACES = [
    { lon: 10.2118, lat: 45.5416, label: 'Brescia',  sublabel: 'Home · Scout',    color: '#7c3aed', glow: 'rgba(124,58,237,.6)' },
    { lon: 11.1212, lat: 46.0664, label: 'Trento',   sublabel: 'CS @ UniTrento',  color: '#7c3aed', glow: 'rgba(124,58,237,.6)' },
    { lon: -6.2603, lat: 53.3498, label: 'Dublino',  sublabel: '...',              color: '#06b6d4', glow: 'rgba(6,182,212,.55)' },
    { lon: 26.1025, lat: 44.4268, label: 'Bucarest', sublabel: '...',              color: '#06b6d4', glow: 'rgba(6,182,212,.55)' },
  ];

  let hovered = -1;
  let tick = 0;
  let raf;

  function resize() {
    canvas.width  = outer.clientWidth;
    canvas.height = outer.clientHeight;
  }

  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,.022)';
    ctx.lineWidth = 0.5;
    for (let lon = -10; lon <= 44; lon += 10) {
      const [x] = project(lon, 50);
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let lat = 35; lat <= 70; lat += 5) {
      const [, y] = project(0, lat);
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
    ctx.restore();
  }

  function drawShapes(alpha, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.6;
    ctx.globalAlpha = alpha;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    SHAPES.forEach(shape => {
      ctx.beginPath();
      shape.forEach(([lon, lat], i) => {
        const [x, y] = project(lon, lat);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawArcs() {
    const brescia = project(10.2118, 45.5416);
    [[- 6.2603, 53.3498], [26.1025, 44.4268]].forEach(([lon, lat]) => {
      const b = project(lon, lat);
      ctx.save();
      ctx.beginPath();
      const mx = (brescia[0] + b[0]) / 2;
      const my = (brescia[1] + b[1]) / 2 - 32;
      ctx.moveTo(brescia[0], brescia[1]);
      ctx.quadraticCurveTo(mx, my, b[0], b[1]);
      ctx.strokeStyle = 'rgba(79,70,229,.14)';
      ctx.lineWidth = 0.8;
      ctx.setLineDash([3, 6]);
      ctx.stroke();
      ctx.restore();
    });
    // Brescia-Trento
    const t = project(11.1212, 46.0664);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(brescia[0], brescia[1]); ctx.lineTo(t[0], t[1]);
    ctx.strokeStyle = 'rgba(124,58,237,.22)';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([2, 4]);
    ctx.stroke();
    ctx.restore();
  }

  function drawPin(p, idx) {
    const [x, y] = project(p.lon, p.lat);
    const isHov = hovered === idx;
    const r = isHov ? 6 : 4.5;
    const pulse = 0.5 + 0.5 * Math.sin(tick * 0.06);

    if (isHov) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 16 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = p.color;
      ctx.globalAlpha = 0.15 * pulse;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // Shadow/glow
    ctx.save();
    ctx.shadowColor = p.color;
    ctx.shadowBlur  = isHov ? 16 : 8;
    ctx.fillStyle   = p.color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Inner white ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,.55)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    if (isHov) {
      ctx.save();
      ctx.font = '500 10.5px "JetBrains Mono", monospace';
      const tw  = ctx.measureText(p.label).width;
      const tw2 = ctx.measureText(p.sublabel).width;
      const bw  = Math.max(tw, tw2) + 20;
      const bh  = 38;
      const lx  = x + 14, ly = y - 14;

      ctx.fillStyle = 'rgba(7,7,10,.92)';
      ctx.beginPath();
      ctx.roundRect(lx - 6, ly - 16, bw, bh, 6);
      ctx.fill();

      ctx.strokeStyle = 'rgba(79,70,229,.28)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.fillStyle = '#F5F7FA';
      ctx.fillText(p.label, lx, ly);

      ctx.fillStyle = '#8B93A3';
      ctx.font = '400 9.5px "JetBrains Mono", monospace';
      ctx.fillText(p.sublabel, lx, ly + 14);
      ctx.restore();
    }
  }

  function frame() {
    tick++;
    const isLight = document.documentElement.classList.contains('light-mode');
    const bg = isLight ? '#F2F0FA' : '#050507';

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    // Base shapes — quasi invisibili
    drawShapes(0.1, isLight ? '#0F172A' : '#ffffff');

    // Hover: breve pulse accent sulle linee
    if (hovered >= 0) {
      const a = 0.06 + 0.04 * Math.sin(tick * 0.05);
      drawShapes(a, isLight ? '#4f46e5' : '#4f46e5');
    }

    drawArcs();
    PLACES.forEach((p, i) => drawPin(p, i));

    raf = requestAnimationFrame(frame);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    let found = -1;
    PLACES.forEach((p, i) => {
      const [px, py] = project(p.lon, p.lat);
      if (Math.hypot(mx - px, my - py) < 18) found = i;
    });
    hovered = found;
    canvas.style.cursor = found >= 0 ? 'pointer' : 'default';
  });
  canvas.addEventListener('mouseleave', () => { hovered = -1; });

  window.addEventListener('resize', () => { resize(); });
  resize();
  frame();
})();/* ════════════════════════════════════════════════
   EXPERIENCE MAP — Leaflet + OpenStreetMap
════════════════════════════════════════════════ */
(function initMap() {
  const L = window.L;
  if (!L || !document.getElementById('exp-map')) return;

  const map = L.map('exp-map', {
    center: [46.0, 13.5],
    zoom: 5,
    zoomControl: true,
    scrollWheelZoom: false,   // evita scroll accidentale
    attributionControl: true,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map);

  // Marker personalizzato (cerchio viola coerente col design system)
  function makeIcon(color = '#7c3aed') {
    return L.divIcon({
      className: '',
      html: `<div style="
        width:14px;height:14px;border-radius:50%;
        background:${color};
        border:2px solid rgba(255,255,255,.8);
        box-shadow:0 0 0 3px ${color}44, 0 2px 8px rgba(0,0,0,.35);
      "></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
      popupAnchor: [0, -12],
    });
  }

  const places = [
    {
      latlng: [45.5416, 10.2118],
      label: 'Home',
      title: 'Brescia',
      desc: 'Città natale. Scout AGESCI da quasi 14 anni.',
      color: '#7c3aed',
    },
    {
      latlng: [46.0664, 11.1212],
      label: 'Università',
      title: 'Trento',
      desc: 'CS @ UniTrento. Residence, LaundryBot, Speck&Tech.',
      color: '#4f46e5',
    },
    {
      latlng: [53.3498, -6.2603],
      label: 'Esperienza',
      title: 'Dublino',
      desc: '...',   // ← descrivi tu
      color: '#06b6d4',
    },
    {
      latlng: [44.4268, 26.1025],
      label: 'Esperienza',
      title: 'Bucarest',
      desc: '...',   // ← descrivi tu
      color: '#06b6d4',
    },
  ];

  places.forEach(p => {
    const popup = L.popup({ maxWidth: 240, minWidth: 180 }).setContent(`
      <p class="map-popup-label">${p.label}</p>
      <p class="map-popup-title">${p.title}</p>
      <p class="map-popup-desc">${p.desc}</p>
    `);
    L.marker(p.latlng, { icon: makeIcon(p.color) })
      .addTo(map)
      .bindPopup(popup);
  });

  // Route scout: array di coordinate [lat, lng]
  // Aggiungile qui quando vuoi, es:
  // const scoutRoute = [[45.54, 10.21], [46.06, 11.12], ...];
  // L.polyline(scoutRoute, { color: '#7c3aed', weight: 2, opacity: 0.5, dashArray: '6 4' }).addTo(map);

  // Riadatta al resize
  window.addEventListener('resize', () => map.invalidateSize());
})();
