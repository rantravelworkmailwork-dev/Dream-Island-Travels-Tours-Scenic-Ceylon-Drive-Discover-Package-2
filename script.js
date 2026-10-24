document.addEventListener("DOMContentLoaded", function () {
  // Initialize map container safely
  const mapElement = document.getElementById("sri-lanka-map");
  if (!mapElement) return;

  const map = L.map("sri-lanka-map", {
    scrollWheelZoom: false // Prevents accidental scrolling on mobile
  }).setView([7.5, 80.5], 8);

  // Clean English-Only Map (Esri - Free, No API Key, No Watermarks)
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
  }).addTo(map);

  // Route pins matching the exact 14-day itinerary
  const routeStops = [
    {
      day: "Day 1 (Jan 06)",
      title: "Negombo",
      coords: [7.2083, 79.8358],
      desc: "Airport arrival, private chauffeur meet & greet, transfer to Negombo for relaxation."
    },
    {
      day: "Days 2 – 4 (Jan 07 – 09)",
      title: "Sigiriya & Habarana Region",
      coords: [8.0339, 80.7533],
      desc: "Dambulla Cave Temple, Golden Temple, Habarana elephant safari, village tour, cultural show, Sigiriya Rock Fortress & Polonnaruwa."
    },
    {
      day: "Days 5 – 6 (Jan 10 – 11)",
      title: "Kandy",
      coords: [7.2906, 80.6337],
      desc: "Matale Spice Garden, Temple of the Tooth Relic & Peradeniya Botanical Garden."
    },
    {
      day: "Day 7 (Jan 12)",
      title: "Nuwara Eliya",
      coords: [6.9497, 80.7891],
      desc: "Scenic drive via tea factory, plantation & Ramboda Falls."
    },
    {
      day: "Days 8 – 9 (Jan 13 – 14)",
      title: "Ella",
      coords: [6.8667, 81.0467],
      desc: "Scenic train journey from Nuwara Eliya, Little Adam's Peak & Nine Arch Bridge."
    },
    {
      day: "Day 10 (Jan 15)",
      title: "Yala",
      coords: [6.3117, 81.3433],
      desc: "Travel from Ella via Ravana Falls to Yala."
    },
    {
      day: "Days 11 – 12 (Jan 16 – 17)",
      title: "Galle & Koggala",
      coords: [6.0535, 80.2210],
      desc: "Early morning Yala safari, coastal drive to Galle, sea turtle hatchery, Koggala lagoon boat ride & Galle Fort walk."
    },
    {
      day: "Days 13 – 14 (Jan 18 – 19)",
      title: "Colombo & Departure",
      coords: [6.9271, 79.8612],
      desc: "Drive from Galle to Colombo, city tour and departure airport transfer."
    }
  ];

  const routeCoords = [];

  // Add Custom Numbered Markers & Popups
  routeStops.forEach((stop, index) => {
    routeCoords.push(stop.coords);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Jost', sans-serif; padding: 4px; max-width: 220px;">
        <span style="background:#0284c7; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${stop.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a; font-size: 14px;">${stop.title}</h6>
        <p style="font-size:12px; margin-top:4px; color:#1e293b; line-height: 1.4;">${stop.desc}</p>
      </div>
    `;

    L.marker(stop.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Draw Dashed Route Line Connecting the Destinations
  const polyline = L.polyline(routeCoords, {
    color: '#a8843f',
    weight: 4,
    opacity: 0.9,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View to show all Pins cleanly
  const fitMapBounds = () => {
    const isMobile = window.innerWidth < 768;
    const paddingVal = isMobile ? [15, 15] : [35, 35];
    map.fitBounds(polyline.getBounds(), { padding: paddingVal });
  };

  fitMapBounds();

  // Recalculate on screen resize or orientation change
  window.addEventListener('resize', () => {
    map.invalidateSize();
    fitMapBounds();
  });
});