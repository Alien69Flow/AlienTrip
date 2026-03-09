import { useEffect, useRef } from "react";

interface Location {
  id: string;
  lat: number;
  lng: number;
  price: number;
  title: string;
}

interface MapViewProps {
  locations: Location[];
  onMarkerClick?: (id: string) => void;
  className?: string;
}

// Para evitar problemas de tipos con leaflet si no está instalado como paquete npm full
declare global {
  interface Window {
    L: any;
  }
}

export const MapView = ({ locations, onMarkerClick, className }: MapViewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Si no está Leaflet cargado en window, no hacemos nada aún
    if (!window.L || !mapRef.current) return;

    if (!mapInstanceRef.current) {
      // Inicializar mapa centrado en el primer punto o Madrid por defecto
      const center = locations.length > 0 ? [locations[0].lat, locations[0].lng] : [40.4168, -3.7038];
      
      mapInstanceRef.current = window.L.map(mapRef.current).setView(center, 12);
      
      // Añadir tiles estilo oscuro/moderno para encajar con el tema
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Limpiar markers anteriores
    map.eachLayer((layer: any) => {
      if (layer instanceof window.L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Añadir markers personalizados estilo "price tag"
    const bounds = window.L.latLngBounds();
    let hasPoints = false;

    locations.forEach((loc) => {
      hasPoints = true;
      const customIcon = window.L.divIcon({
        className: 'custom-map-marker',
        html: `<div class="bg-primary text-primary-foreground font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white text-sm transform -translate-y-1/2 -translate-x-1/2 hover:scale-110 transition-transform cursor-pointer">${loc.price}€</div>`,
        iconSize: [0, 0],
        iconAnchor: [0, 0]
      });

      const marker = window.L.marker([loc.lat, loc.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${loc.title}</b><br>${loc.price}€`);

      if (onMarkerClick) {
        marker.on('click', () => onMarkerClick(loc.id));
      }

      bounds.extend([loc.lat, loc.lng]);
    });

    if (hasPoints) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      // Opcional: limpieza al desmontar si es necesario
    };
  }, [locations, onMarkerClick]);

  return (
    <div className={`w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-border ${className}`}>
      <div ref={mapRef} className="w-full h-full z-0 relative bg-muted" />
    </div>
  );
};
