
import mapboxgl from 'mapbox-gl';
import { Establishment } from '@/types/establishments';

// Initialiser la carte
export const initializeMap = (container: HTMLElement, center: [number, number], zoom: number) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2Y29uZ28iLCJhIjoiY2xwczk2Z3U1MDJ0eTJqbXo4OTcyeGwwMCJ9.yxO9QcJzBfHr3F_E3fXD7g';
  
  const map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/streets-v11',
    center,
    zoom
  });
  
  // Ajouter les contrôles de navigation
  map.addControl(new mapboxgl.NavigationControl());
  
  return map;
};

// Déterminer l'icône en fonction du type d'établissement
export const getMarkerIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'université':
    case 'university':
      return 'https://img.icons8.com/color/48/000000/university.png';
    case 'école':
    case 'ecole':
    case 'school':
      return 'https://img.icons8.com/color/48/000000/school.png';
    case 'institut':
    case 'institute':
      return 'https://img.icons8.com/color/48/000000/student-center.png';
    case 'centre de formation':
    case 'training center':
      return 'https://img.icons8.com/color/48/000000/training.png';
    default:
      return 'https://img.icons8.com/color/48/000000/marker.png';
  }
};

// Ajouter les établissements à la carte
export const addEstablishmentsToMap = (map: mapboxgl.Map, establishments: Establishment[]) => {
  const markers: { [id: string]: mapboxgl.Marker } = {};
  
  establishments.forEach(establishment => {
    // Créer un élément DOM pour le marqueur personnalisé
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = `url(${getMarkerIcon(establishment.type)})`;
    el.style.width = '30px';
    el.style.height = '30px';
    el.style.backgroundSize = '100%';
    
    // Créer un popup avec les infos
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <h3 style="font-weight: bold;">${establishment.name}</h3>
        <p>${establishment.address}, ${establishment.city}</p>
        <p style="color: #666; font-size: 0.9em;">${establishment.type}</p>
      `);
    
    // Ajouter le marqueur à la carte
    const marker = new mapboxgl.Marker(el)
      .setLngLat(establishment.coordinates)
      .setPopup(popup)
      .addTo(map);
    
    markers[establishment.id] = marker;
  });
  
  return markers;
};

// Centrer la carte sur un établissement sélectionné
export const flyToEstablishment = (map: mapboxgl.Map, establishment: Establishment) => {
  map.flyTo({
    center: establishment.coordinates,
    zoom: 15,
    essential: true,
    duration: 1000
  });
};
