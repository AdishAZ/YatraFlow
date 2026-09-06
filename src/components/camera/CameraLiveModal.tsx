import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, ChevronLeft, ChevronRight, Activity, Shield, Users, Stethoscope, AlertTriangle, Camera, Server, MapPin, FileText, Radio, Siren } from 'lucide-react';
import { useOperational } from '@/context/OperationalContext';
import { TEMPLES } from '@/lib/data';
import { cn } from '@/lib/utils';
import { CameraPlayer } from './CameraPlayer';
import { useCameraState } from '@/hooks/useCameraState';
import { ResponsiveContainer, AreaChart, Area, YAxis } from 'recharts';
import { DispatchDrawer } from '@/components/ui/DispatchDrawer';
import { ExportDialog } from '@/components/ui/ExportDialog';
import { IncidentDrawer } from '@/components/ui/IncidentDrawer';
import { SOSDialog } from '@/components/ui/SOSDialog';
import { showToast } from '@/components/ui/Toast';
import { useDemoState } from '@/hooks/useDemoState';

function TelemetrySidebar({ cameraId, onAction }: { cameraId: string; onAction: (action: string) => void }) {
  const state = useCameraState(cameraId);
  if (!state) return <div className="p-4 text-slate-400 font-mono text-sm uppercase">Loading Telemetry...</div>;

  const { scenario, metrics } = state;
  const { resources } = useDemoState();
  const zoneResources = resources.filter(r => r.zone === state.camera.zone);
  const polCount = zoneResources.filter(r => r.type === 'Police').length;
  const volCount = zoneResources.filter(r => r.type === 'Volunteer').length;
  const medCount = zoneResources.filter(r => r.type === 'Medical').length;
  
  return (
    <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto bg-[#152336] text-white">
      
      {/* Action Buttons Row */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => onAction('incident-view')} className="flex items-center justify-center gap-1.5 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 py-2 rounded-lg uppercase font-bold tracking-widest text-[9px] transition-colors">
          <AlertTriangle className="w-3 h-3" /> View Incident
        </button>
        <button onClick={() => onAction('incident-create')} className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-2 rounded-lg uppercase font-bold tracking-widest text-[9px] transition-colors">
          <AlertTriangle className="w-3 h-3" /> Create Incident
        </button>
        <button onClick={() => onAction('dispatch')} className="flex items-center justify-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 py-2 rounded-lg uppercase font-bold tracking-widest text-[9px] transition-colors">
          <Radio className="w-3 h-3" /> Dispatch
        </button>
        <button onClick={() => onAction('export')} className="flex items-center justify-center gap-1.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 py-2 rounded-lg uppercase font-bold tracking-widest text-[9px] transition-colors">
          <FileText className="w-3 h-3" /> Export Report
        </button>
        <button onClick={() => onAction('gis')} className="flex items-center justify-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 py-2 rounded-lg uppercase font-bold tracking-widest text-[9px] transition-colors">
          <MapPin className="w-3 h-3" /> Open on GIS
        </button>
        <button onClick={() => onAction('sos')} className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 py-2 rounded-lg uppercase font-bold tracking-widest text-[9px] transition-colors animate-pulse">
          <Siren className="w-3 h-3" /> SOS
        </button>
      </div>

      {/* Camera Health */}
      <div className="bg-black/40 border border-slate-700 p-3 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-500" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Hardware Status</span>
        </div>
        <span className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">🟢 ONLINE</span>
      </div>

      {/* Current Situation & Recommendations */}
      <div className="bg-black/40 border border-slate-700 p-3 rounded-lg">
        <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-700 pb-1 flex justify-between items-center">
          Current Situation
          <span className="text-emerald-500 font-bold">{metrics.risk} RISK</span>
        </h4>
        <p className="text-sm text-white font-medium">{scenario.description}</p>
        
        <div className="mt-3 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded">
          <h5 className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Activity className="w-3 h-3" /> AI Actions
          </h5>
          <ul className="space-y-1">
            {scenario.recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-white flex items-start gap-1.5">
                <span className="text-emerald-500 mt-0.5 text-[8px]">▶</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Historical Trend Graphs */}
      <div className="bg-black/40 border border-slate-700 p-3 rounded-lg">
        <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-1">
          <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Occupancy Trend</h4>
          <span className="text-[10px] font-mono text-white">{Math.round(metrics.density)}% Current</span>
        </div>
        <div className="h-24 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.densityHistory.map((val, i) => ({ time: i, occupancy: val }))}>
              <defs>
                <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metrics.risk === 'CRITICAL' ? '#EF4444' : metrics.risk === 'HIGH' ? '#F97316' : '#10B981'} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={metrics.risk === 'CRITICAL' ? '#EF4444' : metrics.risk === 'HIGH' ? '#F97316' : '#10B981'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <YAxis domain={[0, 100]} hide />
              <Area 
                type="monotone" 
                dataKey="occupancy" 
                stroke={metrics.risk === 'CRITICAL' ? '#EF4444' : metrics.risk === 'HIGH' ? '#F97316' : '#10B981'} 
                fillOpacity={1} 
                fill="url(#colorOcc)" 
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between items-center">
          <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Queue Forecast</h4>
          <span className="text-xs font-bold text-orange-400">+{Math.round(metrics.queueTime * 0.15)} Min Expected</span>
        </div>
      </div>

      {/* Zone Resources */}
      <div className="bg-black/40 border border-slate-700 p-3 rounded-lg">
        <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-700 pb-1">Zone Resources</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-xs text-white">
            <Shield className="w-3.5 h-3.5 text-blue-400" /> Police: <span className="font-bold">{polCount}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white">
            <Users className="w-3.5 h-3.5 text-emerald-400" /> Volunteers: <span className="font-bold">{volCount}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white">
            <Stethoscope className="w-3.5 h-3.5 text-teal-400" /> Medical: <span className="font-bold">{medCount}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-400" /> Barricades: <span className="font-bold">{scenario.resources.barricades}</span>
          </div>
        </div>
      </div>

      {/* Incident Timeline */}
      <div className="bg-black/40 border border-slate-700 p-3 rounded-lg mt-auto">
        <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-700 pb-1">Incident Timeline</h4>
        <div className="space-y-3 mt-3">
          {scenario.events.map((evt, i) => (
            <div key={i} className="flex gap-3 items-start relative before:absolute before:left-[3px] before:top-4 before:bottom-[-12px] before:w-px before:bg-slate-700 last:before:hidden">
              <div className="w-2 h-2 rounded-full bg-slate-400 mt-1 z-10 ring-2 ring-[#152336]" />
              <div>
                <div className="text-[9px] font-mono text-slate-400">{evt.timeOffset === 0 ? 'Just Now' : `${Math.abs(evt.timeOffset)} min ago`}</div>
                <div className="text-xs text-white">{evt.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default function CameraLiveModal() {
  const { activeCamera, closeCamera, templeCameras, openCamera } = useOperational();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDispatch, setShowDispatch] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showIncident, setShowIncident] = useState(false);
  const [incidentMode, setIncidentMode] = useState<'create' | 'view'>('view');
  const [showSOS, setShowSOS] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false);
        else closeCamera();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, closeCamera]);

  if (!activeCamera) return null;

  const currentIdx = templeCameras.findIndex(c => c.id === activeCamera.id);
  const temple = TEMPLES[activeCamera.templeId];

  const handleNextCam = () => openCamera(templeCameras[(currentIdx + 1) % templeCameras.length]);
  const handlePrevCam = () => openCamera(templeCameras[(currentIdx - 1 + templeCameras.length) % templeCameras.length]);

  const handleAction = (action: string) => {
    switch (action) {
      case 'incident-view':
        setIncidentMode('view');
        setShowIncident(true);
        break;
      case 'incident-create':
        setIncidentMode('create');
        setShowIncident(true);
        break;
      case 'dispatch':
        setShowDispatch(true);
        break;
      case 'export':
        setShowExport(true);
        break;
      case 'gis':
        closeCamera();
        navigate('/');
        showToast('Navigating to GIS Command Map', 'info');
        break;
      case 'sos':
        setShowSOS(true);
        break;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'bg-[#0E1A2B] border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden text-white transition-all',
            isFullscreen ? 'fixed inset-2 z-[1000] rounded-none' : 'w-full max-w-6xl h-[88vh]'
          )}
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#152336] border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-red-500/10 border border-red-500/30">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">LIVE FEED</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white tracking-wide uppercase">{activeCamera.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 border border-slate-700 text-slate-400 font-mono tracking-widest uppercase">
                    {activeCamera.id}
                  </span>
                </div>
                <div className="text-[10px] font-bold tracking-wider text-slate-400 flex items-center gap-2 mt-0.5 uppercase">
                  <span style={{ color: temple?.color }}>{temple?.name}</span>
                  <span>•</span>
                  <span>{activeCamera.zone}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-black/40 border border-slate-700 rounded-lg">
                <button onClick={handlePrevCam} className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                <span className="text-[11px] font-mono px-2 text-slate-400">{currentIdx + 1}/{templeCameras.length}</span>
                <button onClick={handleNextCam} className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><ChevronRight className="w-4 h-4" /></button>
              </div>
              <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 rounded-lg bg-black/40 border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={closeCamera} className="p-2 rounded-lg bg-black/40 border border-slate-700 hover:bg-red-500/20 hover:text-red-500 text-slate-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Viewport Area */}
            <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden border-r border-slate-700">
              <CameraPlayer cameraId={activeCamera.id} />
            </div>

            {/* Right Tactical Sidebar */}
            <div className="w-80 bg-[#152336] flex flex-col">
              <TelemetrySidebar cameraId={activeCamera.id} onAction={handleAction} />
            </div>
          </div>
        </motion.div>

        {/* Shared Modals */}
        <DispatchDrawer isOpen={showDispatch} onClose={() => setShowDispatch(false)} defaultZone={activeCamera.zone} />
        <ExportDialog isOpen={showExport} onClose={() => setShowExport(false)} defaultContext={`Camera ${activeCamera.id} — ${activeCamera.name}`} />
        <IncidentDrawer isOpen={showIncident} onClose={() => setShowIncident(false)} mode={incidentMode} defaultLocation={activeCamera.name} defaultZone={activeCamera.zone} defaultTempleId={activeCamera.templeId} onDispatch={() => { setShowIncident(false); setShowDispatch(true); }} />
        <SOSDialog isOpen={showSOS} onClose={() => setShowSOS(false)} location={`${activeCamera.name} — ${activeCamera.zone}`} />
      </div>
    </AnimatePresence>
  );
}
