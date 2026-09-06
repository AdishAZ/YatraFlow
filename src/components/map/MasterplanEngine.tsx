import { useEffect, useState, useRef, Fragment } from 'react';
import { MapContainer, ImageOverlay, Polygon, Polyline, Marker, Popup, Tooltip, CircleMarker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useOperational } from '@/context/OperationalContext';
import { Layers, Video, Navigation, MapPin, AlertTriangle, Users, Navigation2, CheckCircle2, Save, Edit3, Copy, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createRoot } from 'react-dom/client';
import { CameraPlayer } from '../camera/CameraPlayer';
import HeatmapLayer from './HeatmapLayer';
import { createGuardIcon, type Guard } from './guardUtils';
import GuardCommandPanel from './GuardCommandPanel';
import ZoneInfoPanel from './ZoneInfoPanel';
import type { LayerState } from './LayerToggle';
import type { ActiveScenario } from '@/lib/scenarioEngine';

// ---------------------------------------------------------
// DATA INTERFACES
// ---------------------------------------------------------
export interface MapData {
  metadata: any;
  buildings: any[];
  boundaries: any[];
  roads: any[];
  pedestrian: any[];
  landmarks: any[];
  cameras: any[];
  zones: any[];
  routes: any[];
  pois: any[];
  incidents: any[];
  heatmap: any[];
  icons: any[];
  labels: any[];
  guards: Guard[];
}

// ---------------------------------------------------------
// CUSTOM ICONS (ArcGIS / ICCC Style)
// ---------------------------------------------------------
const createDivIcon = (html: string, className: string, size: [number, number] = [24, 24], anchor: [number, number] = [12, 12]) => {
  return L.divIcon({ html, className, iconSize: size, iconAnchor: anchor });
};

const getVipIcon = (vip: { emoji: string; label: string }, isDraggable: boolean) => {
  const html = `
    <div class="relative flex flex-col items-center z-[500]">
      <div class="flex items-center gap-0.5 px-2 py-1 rounded-lg shadow-xl border-2 transition-all ${isDraggable ? 'bg-purple-900 border-purple-400 cursor-grab active:cursor-grabbing scale-110' : 'bg-purple-950/90 border-purple-500/70 cursor-pointer hover:scale-105'}">
        <span style="font-size:13px;line-height:1">${vip.emoji}</span>
        <span style="font-size:8px;font-weight:900;color:#e9d5ff;letter-spacing:0.05em;white-space:nowrap;margin-left:3px;">${vip.label}</span>
      </div>
      <div class="w-0 h-0" style="border-left:4px solid transparent;border-right:4px solid transparent;border-top:5px solid ${isDraggable ? '#a855f7' : '#7c3aed'}"></div>
      ${isDraggable ? '<div style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);font-size:7px;font-weight:900;color:#a855f7;text-transform:uppercase;letter-spacing:0.1em;white-space:nowrap;background:#0a0512;padding:1px 4px;border-radius:2px;">DRAG</div>' : ''}
    </div>
  `;
  return L.divIcon({ html, className: 'vip-marker', iconSize: [90, 40], iconAnchor: [45, 40] });
};

const getCameraIcon = (cam: any) => {
  const num = cam.id.split('-').pop();
  const html = `
    <div class="relative flex flex-col items-center justify-center w-8 h-8 group z-[200]">
      
      <!-- Compact Badge -->
      <div class="flex items-center justify-center bg-white border border-slate-300 rounded-full shadow-md w-7 h-5 group-hover:border-saffron-500 group-hover:scale-110 group-hover:shadow-lg transition-all relative z-10">
        <span class="text-[9px] font-bold text-slate-800 tracking-tighter">📸${num}</span>
      </div>
      
      <!-- Hover Data Card -->
      <div class="absolute top-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white border border-slate-200 rounded-lg shadow-card-md p-2 w-32 pointer-events-none z-[250]">
        <div class="text-[9px] font-bold text-slate-900 border-b border-slate-100 pb-1 mb-1 truncate">${cam.name}</div>
        <div class="flex justify-between text-[8px] text-slate-500 mt-1"><span>Status</span> <span class="font-bold text-green-600">Online</span></div>
        <div class="flex justify-between text-[8px] text-slate-500 mt-0.5"><span>AI Detect</span> <span class="font-bold text-blue-600">${cam.peopleCount || 0}</span></div>
      </div>
    </div>
  `;
  return createDivIcon(html, 'camera-marker', [32, 32], [16, 16]);
};

const getOperationalIcon = (type: string) => {
  let bgColor = '#64748B';
  let svg = '';
  if (type === 'police') {
    bgColor = '#22C55E';
    svg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`; 
  } else if (type === 'fire') {
    bgColor = '#EF4444';
    svg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
  } else if (type === 'medical') {
    bgColor = '#EF4444';
    svg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>`;
  } else if (type === 'info') {
    bgColor = '#3B82F6';
    svg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`;
  }

  const html = `
    <div style="width: 20px; height: 20px; background-color: ${bgColor}; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white;">
      ${svg}
    </div>
  `;
  return createDivIcon(html, 'operational-icon', [20, 20], [10, 10]);
};

const getLabelIcon = (text: string, isPrimary: boolean, zoom: number) => {
  const isVisible = isPrimary || zoom > 0;
  const html = `
    <div class="relative flex flex-col items-center transition-all duration-300 group ${isVisible ? 'opacity-90 hover:opacity-100 hover:scale-105' : 'opacity-0 pointer-events-none scale-95'}" style="transform: translate(-50%, -100%); width: max-content;">
      <div class="bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm relative z-10 whitespace-nowrap">
        ${text}
      </div>
      <div class="w-px h-3 bg-slate-300"></div>
      <div class="w-1.5 h-1.5 rounded-full bg-saffron-500 -mt-0.5 relative z-10 border border-white"></div>
    </div>
  `;
  return createDivIcon(html, 'label-marker', [0, 0], [0, 0]);
};

const getPOIIcon = (type: string, isSelected: boolean) => {
  let emoji = '📍';
  if (type === 'temple') emoji = '🛕';
  if (type === 'gate') emoji = '🚪';
  if (type === 'museum') emoji = '🏛️';
  if (type === 'washroom') emoji = '🚾';
  if (type === 'medical') emoji = '➕';
  if (type === 'parking') emoji = '🅿️';
  if (type === 'info') emoji = 'ℹ️';
  if (type === 'security') emoji = '🛡️';
  if (type === 'water') emoji = '💧';

  const scale = isSelected ? 'scale(1.2)' : 'scale(1)';
  const html = `
    <div style="width: 24px; height: 24px; background-color: white; border-radius: 50%; border: 1px solid #E5E7EB; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; font-size: 12px; transform: ${scale}; transition: all 0.2s;">
      ${emoji}
    </div>
  `;
  return createDivIcon(html, 'poi-marker', [24, 24], [12, 12]);
};

const MapStateTracker = ({ onZoom }: { onZoom: (z: number) => void }) => {
  useMapEvents({
    zoomend: (e) => onZoom(e.target.getZoom())
  });
  return null;
};

const MapFlyToController = ({ target }: { target: {x: number, y: number} | null }) => {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.y, target.x], 1, { duration: 1.5, easeLinearity: 0.25 });
    }
  }, [target, map]);
  return null;
};

// ---------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------
export default function MasterplanEngine({
  mode = 'admin',
  searchTarget = null,
  activeLayers,
  scenario = null,
  demoIncidents = [],
  onGuardClick,
}: {
  mode?: 'admin' | 'public';
  searchTarget?: {x: number, y: number} | null;
  activeLayers?: LayerState;
  scenario?: ActiveScenario | null;
  demoIncidents?: { id: string; title: string; x: number; y: number; severity: string }[];
  onGuardClick?: (guard: Guard) => void;
}) {
  const { templeInfo, openCamera } = useOperational();
  const [data, setData] = useState<MapData | null>(null);
  const [editedData, setEditedData] = useState<MapData | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<any | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<any | null>(null);
  const [selectedGuard, setSelectedGuard] = useState<Guard | null>(null);
  const [selectedZone, setSelectedZone] = useState<any | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const mapRef = useRef<L.Map>(null);
  const [currentZoom, setCurrentZoom] = useState(0);

  const layers: LayerState = activeLayers || {
    heatmap: true, guards: true, cameras: true,
    incidents: true, zones: true, labels: true, fov: false,
  };
  
  const handleDragEnd = (e: any, layerType: keyof MapData, id: string) => {
    const { lat, lng } = e.target.getLatLng();
    setEditedData(prev => {
      if (!prev) return prev;
      const updatedLayer = (prev[layerType] as any[]).map(item => 
        item.id === id ? { ...item, y: Math.round(lat), x: Math.round(lng) } : item
      );
      return { ...prev, [layerType]: updatedLayer };
    });
  };


  const primaryKeywords = ['temple', 'plaza', 'entry', 'parking', 'museum', 'medical', 'security', 'beach', 'ferry', 'ghat', 'lighthouse'];

  useEffect(() => {
    const loadData = async () => {
      setData(null);
      try {
        const basePath = `/data/maps/${templeInfo.id}`;
        const fetches = [
          fetch(`${basePath}/metadata.json?t=${Date.now()}`).then(r => r.json()).catch(() => null),
          fetch(`${basePath}/buildings.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/boundaries.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/roads.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/pedestrian.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/landmarks.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/cameras.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/zones.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/routes.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/pois.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/incidents.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/heatmap.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/icons.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/labels.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
          fetch(`${basePath}/guards.json?t=${Date.now()}`).then(r => r.json()).catch(() => []),
        ];
        const [metaRes, buildRes, boundRes, roadRes, pedRes, landRes, camRes, zoneRes, routeRes, poiRes, incRes, heatRes, iconRes, labelRes, guardRes] = await Promise.all(fetches);
        if (metaRes) {
          const loadedData = {
            metadata: metaRes,
            buildings: buildRes,
            boundaries: boundRes,
            roads: roadRes,
            pedestrian: pedRes,
            landmarks: landRes,
            cameras: camRes,
            zones: zoneRes,
            routes: routeRes,
            pois: poiRes,
            incidents: incRes,
            heatmap: heatRes,
            icons: iconRes,
            labels: labelRes,
            guards: guardRes,
          };
          setData(loadedData);
          setEditedData(loadedData);
        }
      } catch (e) {
        console.error("Failed to load GIS data", e);
      }
    };
    loadData();
    setSelectedPOI(null);
  }, [templeInfo.id]);

  if (!editedData) return (
    <div className={cn("w-full h-full flex items-center justify-center font-bold tracking-widest uppercase", mode === 'admin' ? "bg-white text-saffron-600" : "bg-sandstone-50 text-saffron-600")}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-saffron-200 border-t-saffron-500 rounded-full animate-spin" />
        Loading Digital Twin...
      </div>
    </div>
  );

  const bounds: L.LatLngBoundsExpression = editedData.metadata.bounds;

  // Calculate Navigation Path for User Mode (mock finding route from Entry to selected POI)
  const entryPOI = editedData.pois.find(p => p.id === 'POI-017' || p.name.includes('Entry'));
  const navigationPath = (mode === 'public' && selectedPOI && entryPOI) 
    ? [[entryPOI.y, entryPOI.x], ...editedData.routes.find(r => r.type === 'general')?.coordinates || [], [selectedPOI.y, selectedPOI.x]]
    : null;

  return (
    <div className={cn("relative w-full h-full overflow-hidden", mode === 'admin' ? "bg-white" : "bg-slate-100")}>
      
      <MapContainer 
        crs={L.CRS.Simple} 
        bounds={bounds} 
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        minZoom={editedData.metadata.minZoom} 
        maxZoom={editedData.metadata.maxZoom}
        zoom={editedData.metadata.defaultZoom}
        center={editedData.metadata.center as L.LatLngExpression}
        className="w-full h-full z-0 outline-none"
        attributionControl={false}
      >
        {/* ==================================================== */}
        {/* BASE LAYER (Absolute Source of Truth)                */}
        {/* ==================================================== */}
        <MapStateTracker onZoom={setCurrentZoom} />
        <MapFlyToController target={searchTarget} />
        <ImageOverlay url={editedData.metadata.imageUrl} bounds={bounds} opacity={mode === 'admin' ? 0.9 : 1.0} />

        {/* LAYER 7: Text Labels (Visible in both Admin and Public) */}
        {editedData.labels && editedData.labels.map((label: any) => {
          const isPrimary = primaryKeywords.some(p => label.name.toLowerCase().includes(p));
          return (
            <Marker 
              key={`${label.id}-${isEditMode}`}
              position={[label.y, label.x]} 
              icon={getLabelIcon(label.name, isPrimary, currentZoom)} 
              interactive={isEditMode || !isPrimary}
              draggable={isEditMode}
              eventHandlers={isEditMode ? { dragend: (e) => handleDragEnd(e, 'labels', label.id) } : {}}
            />
          );
        })}

        {/* ==================================================== */}
        {/* ADMIN MODE LAYERS (ICCC)                             */}
        {/* ==================================================== */}
        {mode === 'admin' && (
          <>
            {/* HEATMAP LAYER */}
            {layers.heatmap && editedData.heatmap && (
              <>
                <HeatmapLayer
                  points={editedData.heatmap}
                  overrides={scenario?.heatmapBoost}
                />
                {isEditMode && editedData.heatmap.map((pt: any) => (
                  <Marker
                    key={`hm-edit-${pt.id}`}
                    position={[pt.y, pt.x]}
                    draggable={true}
                    eventHandlers={{ dragend: (e: any) => handleDragEnd(e, 'heatmap', pt.id) }}
                    icon={createDivIcon(
                      `<div class="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md"></div>`,
                      'heatmap-edit-handle',
                      [16, 16],
                      [8, 8]
                    )}
                  />
                ))}
              </>
            )}

            {/* ZONE POLYGONS */}
            {layers.zones && editedData.zones && editedData.zones.map((zone: any) => (
              <Polygon
                key={zone.id}
                positions={zone.polygon.map((p: number[]) => [p[1], p[0]] as L.LatLngExpression)}
                pathOptions={{
                  color: zone.color,
                  fillColor: zone.color,
                  fillOpacity: 0.08,
                  weight: 1.5,
                  opacity: 0.5,
                  dashArray: '6 4',
                }}
                eventHandlers={{
                  click: () => setSelectedZone(zone),
                }}
              />
            ))}

            {/* CAMERA FOV ARCS */}
            {layers.fov && editedData.cameras && editedData.cameras.map((cam: any) => {
              const r = 60;
              return (
                <CircleMarker
                  key={`fov-${cam.id}`}
                  center={[cam.y, cam.x]}
                  radius={r}
                  pathOptions={{ color: '#A855F7', fillColor: '#A855F7', fillOpacity: 0.07, weight: 1, opacity: 0.3, dashArray: '3 4' }}
                />
              );
            })}

            {/* CCTV CAMERAS */}
            {layers.cameras && editedData.cameras && editedData.cameras.map((cam: any) => (
              <Marker
                key={`${cam.id}-${isEditMode}`}
                position={[cam.y, cam.x]}
                icon={getCameraIcon(cam)}
                draggable={isEditMode}
                eventHandlers={{
                  ...(isEditMode ? { dragend: (e: any) => handleDragEnd(e, 'cameras', cam.id) } : { click: () => openCamera(cam.id) })
                }}
              />
            ))}

            {/* GUARD / PERSONNEL MARKERS */}
            {layers.guards && editedData.guards && editedData.guards.map((guard: Guard) => {
              // Apply scenario relocations
              let gx = guard.x;
              let gy = guard.y;
              if (scenario?.guardRelocations && !isEditMode) {
                const reloc = scenario.guardRelocations.find(r => r.guardId === guard.id);
                if (reloc) { gx = reloc.x; gy = reloc.y; }
              }
              const isSelected = selectedGuard?.id === guard.id;
              return (
                <Marker
                  key={`${guard.id}-${isSelected}-${isEditMode}`}
                  position={[gy, gx]}
                  icon={createGuardIcon(guard, isSelected)}
                  draggable={isEditMode}
                  eventHandlers={{
                    ...(isEditMode
                      ? { dragend: (e: any) => handleDragEnd(e, 'guards', guard.id) }
                      : {
                          click: () => {
                            setSelectedGuard(isSelected ? null : guard);
                            onGuardClick?.(guard);
                          }
                        })
                  }}
                />
              );
            })}


            {/* ACTIVE INCIDENT PINS (Removed per user request) */}
          </>
        )}


        {/* ==================================================== */}
        {/* PUBLIC MODE LAYERS (Tourist Portal)                  */}
        {/* ==================================================== */}
        {mode === 'public' && (
          <>
            {/* Live Queue Badge removed from map markers to be fixed in HUD */}

            {/* Navigation Path */}
            {navigationPath && (
              <Polyline 
                positions={navigationPath as L.LatLngExpression[]} 
                pathOptions={{ color: '#3B82F6', weight: 6, dashArray: '10, 15', lineCap: 'round', opacity: 0.8 }}
                className="animate-[dash_1s_linear_infinite]"
              />
            )}


          </>
        )}

      </MapContainer>

      {/* ==================================================== */}
      {/* HUD & CONTROLS                                       */}
      {/* ==================================================== */}

      {/* Guard Command Panel */}
      {mode === 'admin' && selectedGuard && (
        <GuardCommandPanel
          guard={selectedGuard}
          onClose={() => setSelectedGuard(null)}
        />
      )}

      {/* Zone Info Panel */}
      {mode === 'admin' && selectedZone && (
        <ZoneInfoPanel
          zone={selectedZone}
          guards={editedData?.guards || []}
          incidents={demoIncidents}
          onClose={() => setSelectedZone(null)}
        />
      )}
      
      {/* JSON Export Modal */}
      {showExport && isEditMode && (
        <div className="absolute inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 pointer-events-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-800 flex items-center gap-2">
                <Save className="w-5 h-5 text-saffron-500" />
                Export Edited Map Data
              </h2>
              <button onClick={() => setShowExport(false)} className="p-2 text-slate-400 hover:text-slate-600 bg-white rounded-lg shadow-sm border border-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-auto p-4 bg-slate-900">
              <pre className="text-xs font-mono text-slate-300 leading-relaxed">
                {JSON.stringify({
                  cameras: editedData?.cameras,
                  guards: editedData?.guards,
                  heatmap: editedData?.heatmap,
                  labels: editedData?.labels,
                  pois: editedData?.pois,
                  icons: editedData?.icons
                }, null, 2)}
              </pre>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <div className="text-xs text-slate-500">Copy this JSON and provide it to the AI assistant to permanently save changes.</div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify({
                    cameras: editedData?.cameras,
                    guards: editedData?.guards,
                    heatmap: editedData?.heatmap,
                    labels: editedData?.labels,
                    pois: editedData?.pois,
                    icons: editedData?.icons
                  }, null, 2));
                  alert("Copied to clipboard!");
                }}
                className="h-10 px-6 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy JSON
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Public Mode Controls / HUD */}
      {mode === 'public' && (
        <>
          {/* Unmovable Live Wait Time Badge */}
          <div className="absolute top-6 right-6 z-[400] pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 cursor-default">
              <div className="w-3 h-3 rounded-full bg-saffron-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5 leading-none">Live Wait Time</div>
                <div className="text-[15px] font-black text-slate-900 leading-none">45 - 60 Mins</div>
              </div>
            </div>
          </div>

          {/* Selected POI Navigation Card */}
          {selectedPOI && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[400] w-[90%] max-w-md">
              <div className="bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl p-5 shadow-portal-hover flex items-center justify-between gap-4 pointer-events-auto">
                <div>
                  <div className="text-[10px] font-bold text-saffron-600 uppercase tracking-widest mb-1">{selectedPOI.type}</div>
                  <div className="text-lg font-bold text-slate-900">{selectedPOI.name}</div>
                  <div className="text-sm text-slate-500">{selectedPOI.desc}</div>
                </div>
                <button className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center gap-2 shadow-lg transition-transform hover:scale-105 flex-shrink-0">
                  <Navigation2 className="w-4 h-4" />
                  Navigate
                </button>
              </div>
            </div>
          )}
        </>
      )}

      <style>{`
        .leaflet-container { background: transparent !important; }
        
        /* Admin Tooltips */
        .custom-tooltip { background: rgba(255, 255, 255, 0.95) !important; backdrop-filter: blur(8px) !important; border: 1px solid #E5E7EB !important; color: #111827 !important; border-radius: 8px !important; box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important; padding: 8px 12px !important; font-family: 'Inter', sans-serif; }
        .custom-tooltip::before { border-top-color: #E5E7EB !important; }
        
        /* Public Tooltips */
        .portal-tooltip { font-family: 'Inter', sans-serif; padding: 6px 12px !important; }
        .portal-tooltip::before { border-top-color: white !important; }
        
        /* Marker Resets */
        .camera-marker, .poi-marker, .incident-marker, .queue-badge, .label-marker { background: none; border: none; }
        
        /* Zone Glow */
        .zone-polygon-glow { filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.15)); }

        /* Animated Routes */
        .animated-route { animation: dash-flow 20s linear infinite; }
        @keyframes dash-flow { from { stroke-dashoffset: 500; } to { stroke-dashoffset: 0; } }
        
        /* Scanner line */
        @keyframes scan { 0% { top: -10%; } 100% { top: 110%; } }

        /* Guard markers */
        .guard-marker { background: none !important; border: none !important; }
        @keyframes ping { 75%, 100% { transform: scale(1.8); opacity: 0; } }
      `}</style>
    </div>
  );
}
