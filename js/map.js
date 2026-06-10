/* ════════════════════════════════════════════════
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
