import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, AlertTriangle, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showToast } from '@/components/ui/Toast';
import type { Guard } from './guardUtils';

interface Zone {
  id: string;
  name: string;
  type: string;
  color: string;
}

interface ZoneInfoPanelProps {
  zone: Zone | null;
  guards: Guard[];
  incidents: { id: string; title: string; severity: string }[];
  onClose: () => void;
}

const ZONE_DENSITY: Record<string, { level: string; color: string; pct: number }> = {
  core:      { level: 'High', color: 'text-red-400', pct: 87 },
  queue:     { level: 'High', color: 'text-orange-400', pct: 79 },
  visitor:   { level: 'Medium', color: 'text-amber-400', pct: 62 },
  emergency: { level: 'Low', color: 'text-emerald-400', pct: 5 },
  museum:    { level: 'Low', color: 'text-blue-400', pct: 31 },
};

export default function ZoneInfoPanel({ zone, guards, incidents, onClose }: ZoneInfoPanelProps) {
  if (!zone) return null;

  const density = ZONE_DENSITY[zone.type] || { level: 'Unknown', color: 'text-slate-400', pct: 0 };
  const zoneGuards = guards.filter(g => g.zone === zone.name || zone.name.toLowerCase().includes(g.zone.toLowerCase().split(' ')[0]));
  const zoneIncidents = incidents.filter(inc => inc.title.toLowerCase().includes(zone.name.toLowerCase().split(' ')[0]));

  return (
    <AnimatePresence>
      <motion.div
        key={zone.id}
        initial={{ opacity: 0, y: 12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute bottom-24 left-4 z-[500] w-[260px] pointer-events-auto"
      >
        <div className="bg-[#0E1A2B]/95 border border-slate-700/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden text-white">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: zone.color }} />
              <span className="text-[11px] font-black uppercase tracking-widest">{zone.name}</span>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>

          <div className="p-3 space-y-3">
            {/* Density */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] font-bold opacity-50 uppercase tracking-wider">Crowd Density</span>
                <span className={cn('text-[10px] font-black', density.color)}>{density.level} ({density.pct}%)</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${density.pct}%`, backgroundColor: zone.color }}
                />
              </div>
            </div>

            {/* Guards */}
            <div>
              <div className="text-[9px] font-bold opacity-50 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Personnel ({zoneGuards.length})
              </div>
              {zoneGuards.length > 0 ? (
                <div className="space-y-1">
                  {zoneGuards.slice(0, 4).map(g => (
                    <div key={g.id} className="flex items-center justify-between bg-white/5 rounded-lg px-2 py-1">
                      <span className="text-[9px] font-bold truncate">{g.name.split(' ').slice(-1)[0]}</span>
                      <span className={cn('text-[8px] font-bold', g.status === 'Deployed' ? 'text-amber-400' : 'text-emerald-400')}>
                        {g.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[9px] text-slate-500">No personnel assigned</div>
              )}
            </div>

            {/* Incidents */}
            {zoneIncidents.length > 0 && (
              <div>
                <div className="text-[9px] font-bold opacity-50 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-red-400" /> Active Incidents
                </div>
                {zoneIncidents.map(inc => (
                  <div key={inc.id} className="flex items-center gap-2 bg-red-900/20 border border-red-500/20 rounded-lg px-2 py-1">
                    <span className="text-[8px] font-mono text-red-400">{inc.id}</span>
                    <span className="text-[9px] font-bold truncate">{inc.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Dispatch */}
            <button
              onClick={() => showToast(`Dispatch request sent to ${zone.name}`, 'success')}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-[10px] font-bold transition-colors"
            >
              <Zap className="w-3 h-3" />
              Quick Dispatch to Zone
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
