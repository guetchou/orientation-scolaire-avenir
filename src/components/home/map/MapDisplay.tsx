
import { useEffect, useRef } from "react";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Neighborhood } from "../types/establishments";

interface MapDisplayProps {
  neighborhoods: Neighborhood[];
  getMarkerIcon: (type?: string) => string;
}

export const MapDisplay = ({ neighborhoods, getMarkerIcon }: MapDisplayProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    console.log("Initializing map...");
    
    const center: LngLatLike = [15.2832, -4.2699];

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2Vzc25ndWllIiwiYSI6ImNscnlwbWVzZjE2dDQya3BjOGxqZnJtbXIifQ.2pKV0_5V6KhqHPUY-rMYBw';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: center,
      zoom: 12,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      "top-right"
    );

    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    neighborhoods.forEach((neighborhood) => {
      const coordinates: LngLatLike = neighborhood.coordinates || [15.2832, -4.2699];
      
      const markerEl = document.createElement("div");
      markerEl.className = "custom-marker";
      markerEl.innerHTML = `
        <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white transform hover:scale-110 transition-transform">
          ${getMarkerIcon(neighborhood.type)}
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<div class="p-2">
          <h3 class="font-semibold text-lg">${neighborhood.name}</h3>
          <p class="text-sm text-gray-600">${neighborhood.city}</p>
          <p class="text-sm mt-2">${neighborhood.description}</p>
        </div>`
      );

      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [neighborhoods, getMarkerIcon]);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg mb-8">
      <div ref={mapContainer} className="w-full h-[600px]" />
    </div>
  );
};
