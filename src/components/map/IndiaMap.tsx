import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TEMPLE_LIST, type TempleId } from '@/lib/data';
import { useOperational } from '@/context/OperationalContext';
import 'leaflet/dist/leaflet.css';

function MapController({ selectedTemple, temples }: { selectedTemple: TempleId, temples: any[] }) {
  const map = useMap();
  useEffect(() => {
    // Invalidate size in case container size changed before leaflet initialized
    setTimeout(() => {
      map.invalidateSize();
      const temple = temples.find(t => t.id === selectedTemple);
      if (temple && temple.coordinates) {
        map.flyTo(temple.coordinates, 13, {
          duration: 3.5,
          easeLinearity: 0.25
        });
      }
    }, 100);
  }, [selectedTemple, map, temples]);
  return null;
}

const getMarkerIcon = (temple: any, isActive: boolean) => {
  const html = `
    <div class="relative flex items-center justify-center ${isActive ? 'w-16 h-16 cursor-pointer' : 'w-12 h-12 cursor-pointer'}">
      <div class="rounded-full flex items-center justify-center shadow-lg border-2 relative z-10 transition-all duration-300 ${isActive ? 'w-10 h-10 bg-gradient-to-br from-[#0E1A2B] to-[#152336] border-amber-500 scale-110 shadow-xl' : 'w-8 h-8 bg-white border-slate-200 opacity-60 hover:opacity-100 hover:scale-105 hover:border-amber-300'}">
        <span class="${isActive ? 'text-lg text-white' : 'text-sm text-slate-500'} leading-none transform -translate-y-px">🛕</span>
      </div>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'bg-transparent border-none',
    iconSize: [64, 64],
    iconAnchor: [32, 32]
  });
};

const MAP_DATA = TEMPLE_LIST.map(t => {
  let coords: [number, number] = [22.25, 71.19]; // Default Gujarat center
  if (t.id === 'somnath') coords = [20.8880, 70.4012];
  if (t.id === 'dwarka') coords = [22.2376, 68.9674];
  if (t.id === 'ambaji') coords = [24.3312, 72.8519];
  if (t.id === 'pavagadh') coords = [22.4646, 73.5222];
  return { ...t, coordinates: coords };
});

export default function IndiaMap() {
  const { selectedTemple, setSelectedTemple } = useOperational();

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#e0e7ff] rounded-2xl shadow-card-sm border border-slate-200">
      <MapContainer
        center={[22.25, 71.19]}
        zoom={6.5}
        className="w-full h-full z-0"
        zoomControl={false}
        attributionControl={false}
      >
        {/* OpenStreetMap Standard Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        <MapController selectedTemple={selectedTemple} temples={MAP_DATA} />
        
        {MAP_DATA.map(temple => (
          <Marker
            key={temple.id}
            position={temple.coordinates}
            icon={getMarkerIcon(temple, selectedTemple === temple.id)}
            eventHandlers={{
              click: () => setSelectedTemple(temple.id as TempleId)
            }}
          >
            <Tooltip 
              direction="top" 
              offset={[0, -20]} 
              opacity={1} 
              permanent={selectedTemple === temple.id}
              className="bg-white border-0 shadow-card-sm text-slate-900 font-bold px-3 py-1.5 rounded-lg"
            >
              {temple.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

    </div>
  );
}
