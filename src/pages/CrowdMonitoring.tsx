import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Cpu, Server, ShieldAlert, Activity, Wifi, HardDrive, ChevronRight } from 'lucide-react';
import { useOperational } from '@/context/OperationalContext';
import { cn } from '@/lib/utils';
import { CameraPlayer } from '@/components/camera/CameraPlayer';
import { useCameraState } from '@/hooks/useCameraState';
import { MockApi } from '@/api/MockApi';

type GridLayout = 1 | 4 | 9 | 16 | 25 | 30;

function CameraGridItem({ cameraId, onClick }: { cameraId: string, onClick: () => void }) {
  const state = useCameraState(cameraId);
  if (!state) return null;

  const isCritical = state.metrics.risk === 'CRITICAL';
  const isHigh = state.metrics.risk === 'HIGH';
  const isMedium = state.metrics.risk === 'MEDIUM';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClick}
      className={cn(
        'bg-black/40 border rounded-xl flex flex-col overflow-hidden group transition-all cursor-pointer relative h-[280px]',
        'hover:scale-[1.01] hover:z-10',
        isCritical ? 'border-red-500/50 shadow-[0_4px_24px_rgba(239,68,68,0.2)] hover:shadow-[0_4px_32px_rgba(239,68,68,0.4)]' : 
        isHigh ? 'border-orange-500/40 shadow-[0_4px_16px_rgba(249,115,22,0.1)]' :
        isMedium ? 'border-yellow-500/20 shadow-[0_4px_12px_rgba(234,179,8,0.05)]' : 'border-white/10 hover:border-white/30 shadow-lg'
      )}
    >
      <div className="absolute inset-0 transition-all duration-300 group-hover:brightness-105">
        <CameraPlayer cameraId={cameraId} showHUD={true} />
      </div>
      
      {/* Click overlay */}
      <div className="absolute inset-0 bg-transparent group-hover:bg-white/5 transition-colors z-30 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white font-mono text-[11px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-2 drop-shadow-xl">
          Inspect Camera <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function CrowdMonitoring() {
  const { templeInfo, templeCameras, openCamera } = useOperational();
  const [layout, setLayout] = useState<GridLayout>(9);
  const [showSystemStatus, setShowSystemStatus] = useState(false);
  const [tick, setTick] = useState(0);

  // Rotate insights
  const [insightIdx, setInsightIdx] = useState(0);
  const insights = [
    "North Gate occupancy increasing (+7%)",
    "Deploy 2 volunteers to Queue Zone B",
    "Temple Exit congestion cleared",
    "VIP Route operating normally",
    "Medical Unit dispatched near Main Mandap",
    "Parking occupancy reached 84%",
    "Expected congestion in 12 minutes"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTick(t => t + 1);
      setInsightIdx(i => (i + 1) % insights.length);
    }, 8000); // cycle every 8 seconds
    return () => clearInterval(timer);
  }, [insights.length]);

  // Aggregate Metrics
  const aggregate = useMemo(() => {
    let totalOcc = 0;
    let totalQueue = 0;
    let critical = 0;
    let alerts = 0;

    templeCameras.forEach(c => {
      const state = MockApi.getCameraState(c.id);
      if (state) {
        totalOcc += state.metrics.density;
        totalQueue += state.metrics.queueTime;
        if (state.metrics.risk === 'CRITICAL') critical++;
        if (state.metrics.risk === 'HIGH' || state.metrics.risk === 'CRITICAL') alerts++;
      }
    });

    const count = templeCameras.length || 1;
    return {
      avgOcc: Math.round(totalOcc / count),
      avgQueue: Math.round(totalQueue / count),
      critical,
      alerts
    };
  }, [templeCameras, tick]); 

  const getGridColsClass = () => {
    switch (layout) {
      case 1: return 'grid-cols-1';
      case 4: return 'grid-cols-1 md:grid-cols-2';
      case 9: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 16: return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 25: return 'grid-cols-2 md:grid-cols-4 lg:grid-cols-5';
      case 30: return 'grid-cols-3 md:grid-cols-5 lg:grid-cols-6';
      default: return 'grid-cols-3';
    }
  };

  return (
    <div className="space-y-8 pb-16 bg-[#0B101A] min-h-screen relative p-8 font-sans">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none z-0" />

      <div className="relative z-10 space-y-6 max-w-[1600px] mx-auto">
        
        {/* 1. Header & Surveillance Control Toolbar */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-[#131B2A] border border-white/5 p-6 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <Video className="w-5 h-5 text-emerald-500" />
              </div>
              <h1 className="text-2xl font-black text-white flex items-center gap-2 tracking-tight">
                {templeInfo.name} Command Grid
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono tracking-[0.2em] uppercase">
              Enterprise Integrated Command & Control Centre
            </p>
          </div>

          {/* Compact Live Stats (Operational Summary) */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 xl:border-l xl:border-white/10 xl:pl-8 text-[11px] font-mono tracking-widest uppercase">
            
            {/* System Group */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1">
                <div className="text-slate-500">Streams</div>
                <div className="text-lg font-bold text-white leading-none">{templeCameras.length}</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-slate-500">Online</div>
                <div className="text-lg font-bold text-emerald-500 leading-none">{templeCameras.length}</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-slate-500">Offline</div>
                <div className="text-lg font-bold text-slate-600 leading-none">0</div>
              </div>
            </div>

            <div className="w-px h-10 bg-white/5 hidden sm:block"></div>
            
            {/* Alert Group */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1">
                <div className="text-slate-500">Alerts</div>
                <div className={`text-lg font-bold leading-none ${aggregate.alerts > 0 ? 'text-orange-500' : 'text-slate-600'}`}>{aggregate.alerts}</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-slate-500">Critical</div>
                <div className={`text-lg font-bold leading-none ${aggregate.critical > 0 ? 'text-red-500' : 'text-slate-600'}`}>{aggregate.critical}</div>
              </div>
            </div>

            <div className="w-px h-10 bg-white/5 hidden sm:block"></div>
            
            {/* Metrics Group */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1">
                <div className="text-slate-500">Avg Occ</div>
                <div className="text-lg font-bold text-blue-400 leading-none">{aggregate.avgOcc}%</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-slate-500">Avg Queue</div>
                <div className="text-lg font-bold text-blue-400 leading-none">{aggregate.avgQueue}m</div>
              </div>
            </div>
            
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 flex-wrap xl:border-l xl:border-white/10 xl:pl-8">
            <button
              onClick={() => setShowSystemStatus(true)}
              className="px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 transition-all"
            >
              <Cpu className="w-4 h-4" />
              System Status
            </button>

            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-1.5 text-[11px]">
              <span className="text-slate-500 font-mono uppercase tracking-widest px-3">Grid</span>
              {([1, 4, 9, 16, 25, 30] as GridLayout[]).map((count) => (
                <button
                  key={count}
                  onClick={() => setLayout(count)}
                  className={cn(
                    'px-2.5 py-1 rounded-md font-mono font-bold transition-all',
                    layout === count ? 'bg-white/10 shadow-sm text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'
                  )}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insight Banner */}
        <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-3 rounded-xl flex items-center justify-between text-[11px] font-mono tracking-widest uppercase shadow-inner backdrop-blur-md">
          <div className="flex items-center gap-4">
            <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded flex items-center gap-2 font-bold">
              <Activity className="w-3.5 h-3.5" /> AI INSIGHTS
            </span>
            <span className="text-blue-100">
              <AnimatePresence mode="wait">
                <motion.span
                  key={insightIdx}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -2 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block"
                >
                  {insights[insightIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
          <span className="text-blue-400/50 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Last Analysis: {new Date().toLocaleTimeString('en-US', { hour12: false })}
          </span>
        </div>

        {/* Multi-Stream CCTV Matrix Grid */}
        <div className={cn('grid gap-5', getGridColsClass())}>
          {templeCameras.slice(0, layout).map((camera) => (
            <CameraGridItem 
              key={camera.id} 
              cameraId={camera.id} 
              onClick={() => openCamera(camera)} 
            />
          ))}
        </div>
      </div>

      {/* System Status Modal */}
      <AnimatePresence>
        {showSystemStatus && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-[#131B2A] border border-white/10 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden text-white"
            >
              <div className="flex justify-between items-center p-5 border-b border-white/10 bg-black/20">
                <h2 className="text-sm font-mono uppercase tracking-widest flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-500" />
                  Overall System Health
                </h2>
                <button onClick={() => setShowSystemStatus(false)} className="text-slate-400 hover:text-white transition-colors">✕</button>
              </div>
              <div className="p-6 grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 border border-white/10 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Cpu className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">AI Engine</div>
                        <div className="text-sm font-bold">Model Ready</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 border border-emerald-500/30 font-bold bg-emerald-500/10 px-2 py-1 rounded">🟢 NOMINAL</span>
                  </div>
                  <div className="bg-white/5 p-4 border border-white/10 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Video className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Camera Health</div>
                        <div className="text-sm font-bold">100% Online</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 border border-emerald-500/30 font-bold bg-emerald-500/10 px-2 py-1 rounded">🟢 NOMINAL</span>
                  </div>
                  <div className="bg-white/5 p-4 border border-white/10 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <ShieldAlert className="w-5 h-5 text-orange-500" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Active Alerts</div>
                        <div className="text-sm font-bold">{aggregate.alerts} Open Tickets</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-orange-500 border border-orange-500/30 font-bold bg-orange-500/10 px-2 py-1 rounded">🟠 MONITORING</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 border border-white/10 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Wifi className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Network Health</div>
                        <div className="text-sm font-bold">12 ms Latency</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 border border-emerald-500/30 font-bold bg-emerald-500/10 px-2 py-1 rounded">🟢 NOMINAL</span>
                  </div>
                  <div className="bg-white/5 p-4 border border-white/10 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <HardDrive className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Storage Array</div>
                        <div className="text-sm font-bold">42TB Available</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 border border-emerald-500/30 font-bold bg-emerald-500/10 px-2 py-1 rounded">🟢 NOMINAL</span>
                  </div>
                  <div className="bg-white/5 p-4 border border-white/10 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Activity className="w-5 h-5 text-emerald-500" />
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-0.5">Service Uptime</div>
                        <div className="text-sm font-bold">99.998%</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-500 border border-emerald-500/30 font-bold bg-emerald-500/10 px-2 py-1 rounded">🟢 NOMINAL</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
