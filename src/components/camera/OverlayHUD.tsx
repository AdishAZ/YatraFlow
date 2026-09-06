import { useEffect, useState } from 'react';
import { useCameraState } from '../../hooks/useCameraState';
import { ArrowUp, ArrowDown, Minus, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

export function OverlayHUD({ cameraId }: { cameraId: string }) {
  const state = useCameraState(cameraId);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!state) return null;

  const { camera, metrics, scenario } = state;
  const timeString = new Date(now).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  
  const secondsAgo = Math.floor((now - state.timestamp) / 1000);

  const getOperationalStatus = (risk: string) => {
    switch (risk) {
      case 'CRITICAL': return { label: 'Restricted Zone', color: 'text-red-500 border-red-500 bg-red-500/10' };
      case 'HIGH': return { label: 'Queue Growing', color: 'text-orange-500 border-orange-500 bg-orange-500/10' };
      case 'MEDIUM': return { label: 'Controlled Entry', color: 'text-yellow-500 border-yellow-500 bg-yellow-500/10' };
      default: return { label: 'Normal Operations', color: 'text-emerald-500 border-emerald-500 bg-emerald-500/10' };
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'increasing') return <ArrowUp className="w-3 h-3 text-red-500" />;
    if (trend === 'decreasing') return <ArrowDown className="w-3 h-3 text-emerald-500" />;
    return <Minus className="w-3 h-3 text-slate-400" />;
  };

  const status = getOperationalStatus(metrics.risk);
  const isNetworkDelay = secondsAgo > 5;
  const isOffline = secondsAgo > 15;
  
  // Convert primary overlay to a special tag color
  let specialTagColor = 'bg-blue-500/20 border-blue-500/50 text-blue-400';
  if (scenario.primaryOverlay?.color === '#A855F7') specialTagColor = 'bg-purple-500/20 border-purple-500/50 text-purple-400';
  if (scenario.primaryOverlay?.color === '#EF4444') specialTagColor = 'bg-red-500/20 border-red-500/50 text-red-400';
  if (scenario.primaryOverlay?.color === '#F97316') specialTagColor = 'bg-orange-500/20 border-orange-500/50 text-orange-400';
  if (scenario.primaryOverlay?.color === '#EAB308') specialTagColor = 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 bg-gradient-to-b from-black/40 via-transparent to-black/60">
      {/* TOP Section */}
      <div className="flex justify-between items-start">
        {/* TOP LEFT */}
        <div className="flex flex-col gap-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-[pulse_2s_ease-in-out_infinite] shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
            <span className="font-mono font-bold text-white uppercase text-[11px] tracking-widest bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">LIVE</span>
            <span className="font-mono text-white/80 uppercase text-[11px] tracking-widest bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm">
              {timeString}
            </span>
          </div>
          <div className="font-bold text-lg tracking-wide text-white/95 leading-tight">{camera.name}</div>
          <div className="font-mono text-[11px] tracking-widest text-slate-300 uppercase leading-none">{camera.id}</div>
        </div>

        {/* TOP RIGHT */}
        <div className="flex flex-col gap-2 items-end drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2">
            {scenario.primaryOverlay && (
              <span className={`font-mono font-bold uppercase text-[10px] tracking-widest px-2 py-0.5 rounded border backdrop-blur-md ${specialTagColor}`}>
                {scenario.primaryOverlay.type}
              </span>
            )}
            <span className="font-mono font-bold uppercase text-[10px] tracking-widest bg-black/50 px-2 py-0.5 rounded backdrop-blur-md text-slate-300 flex items-center gap-1.5">
              {isOffline ? <ShieldAlert className="w-3 h-3 text-red-500"/> : isNetworkDelay ? <Activity className="w-3 h-3 text-orange-500"/> : <CheckCircle2 className="w-3 h-3 text-emerald-500"/>}
              {isOffline ? 'OFFLINE' : isNetworkDelay ? 'DELAY' : 'HEALTHY'}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM Section */}
      <div className="flex justify-between items-end">
        {/* BOTTOM LEFT */}
        <div className="flex flex-col gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {/* Operational Status */}
          <div className={`px-3 py-1.5 border-l-[3px] backdrop-blur-md shadow-xl uppercase font-mono tracking-widest w-fit bg-black/40 ${status.color}`}>
            <span className="text-[9px] text-white/60 mb-0.5 block tracking-widest">STATUS</span>
            <span className="text-sm font-bold tracking-wider">{status.label}</span>
          </div>

          {/* Resources */}
          <div className="flex items-center gap-2 mt-1">
            {scenario.resources.police > 0 && (
              <div className="bg-black/50 border border-blue-500/30 text-blue-100 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md flex items-center gap-1.5 tracking-widest">
                👮 {scenario.resources.police}
              </div>
            )}
            {scenario.resources.medical > 0 && (
              <div className="bg-black/50 border border-teal-500/30 text-teal-100 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md flex items-center gap-1.5 tracking-widest">
                🚑 {scenario.resources.medical}
              </div>
            )}
            {scenario.resources.volunteers > 0 && (
              <div className="bg-black/50 border border-emerald-500/30 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md flex items-center gap-1.5 tracking-widest">
                🦺 {scenario.resources.volunteers}
              </div>
            )}
            {scenario.resources.barricades > 0 && (
              <div className="bg-black/50 border border-orange-500/30 text-orange-100 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md flex items-center gap-1.5 tracking-widest">
                🚧 {scenario.resources.barricades}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM RIGHT - Compact Metrics Panel */}
        <div className="bg-black/60 border border-white/10 backdrop-blur-md rounded-lg p-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-[11px] font-mono tracking-widest items-center">
            
            <div className="text-slate-400">OCCUPANCY</div>
            <div className="text-left font-bold text-white text-[13px]">{Math.round(metrics.density)}%</div>

            <div className="text-slate-400">QUEUE</div>
            <div className="text-left font-bold text-white text-[13px]">{Math.round(metrics.queueTime)} MIN</div>

            <div className="text-slate-400">FLOW</div>
            <div className="text-left font-bold text-[13px] text-white">
              <span className={metrics.flowRate < 1.0 ? 'text-orange-400' : 'text-emerald-400'}>
                {metrics.flowRate < 1.0 ? 'RESTRICTED' : 'STABLE'}
              </span>
            </div>

            <div className="text-slate-400">TREND</div>
            <div className="text-left flex justify-start items-center gap-1.5 font-bold text-[13px] text-white">
              {getTrendIcon(metrics.trend)}
              <span className="capitalize">{metrics.trend}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
