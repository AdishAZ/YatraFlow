import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Stethoscope, Users, Flame, Radio, ChevronRight, MapPin } from 'lucide-react';
import { DemoStore } from '@/lib/demoState';
import type { ResourceType } from '@/lib/demoState';
import { showToast } from './Toast';

interface DispatchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultZone?: string;
  incidentId?: string;
}

const RESOURCE_TYPES: { type: ResourceType; icon: typeof Shield; color: string }[] = [
  { type: 'Police', icon: Shield, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  { type: 'Medical', icon: Stethoscope, color: 'text-teal-400 border-teal-500/30 bg-teal-500/10' },
  { type: 'Volunteer', icon: Users, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
  { type: 'Fire', icon: Flame, color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
  { type: 'SDRF', icon: Radio, color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
];

export function DispatchDrawer({ isOpen, onClose, defaultZone = '', incidentId }: DispatchDrawerProps) {
  const [selectedType, setSelectedType] = useState<ResourceType>('Police');
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [zone, setZone] = useState(defaultZone);

  const availableResources = DemoStore.getAvailableResourcesByType(selectedType);

  const handleDispatch = () => {
    if (!selectedResource || !zone) return;
    DemoStore.dispatchResource(selectedResource, zone, incidentId);
    const res = DemoStore.getState().resources.find(r => r.id === selectedResource);
    showToast(`${selectedResource} dispatched to ${zone}`, 'success');
    setSelectedResource(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1050]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[400px] bg-[#0E1A2B] border-l border-slate-700 shadow-2xl z-[1050] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#152336]">
              <div>
                <h2 className="text-sm font-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  Dispatch Resource
                </h2>
                {incidentId && <span className="text-[10px] font-mono text-slate-400 tracking-widest">Incident: {incidentId}</span>}
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Resource Type Selector */}
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">Resource Type</label>
                <div className="grid grid-cols-5 gap-2">
                  {RESOURCE_TYPES.map(rt => (
                    <button
                      key={rt.type}
                      onClick={() => { setSelectedType(rt.type); setSelectedResource(null); }}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-[9px] font-mono uppercase tracking-widest transition-all ${
                        selectedType === rt.type ? rt.color + ' ring-1 ring-white/20' : 'border-white/10 text-slate-500 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <rt.icon className="w-4 h-4" />
                      {rt.type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zone Input */}
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">Deploy To Zone</label>
                <input
                  value={zone}
                  onChange={e => setZone(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50"
                  placeholder="e.g. North Gate"
                />
              </div>

              {/* Available Resources */}
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">
                  Available Units ({availableResources.length})
                </label>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {availableResources.length === 0 ? (
                    <div className="text-center py-6 text-slate-500 text-xs font-mono uppercase tracking-widest">No available units</div>
                  ) : (
                    availableResources.map(r => (
                      <button
                        key={r.id}
                        onClick={() => setSelectedResource(r.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                          selectedResource === r.id
                            ? 'border-emerald-500/50 bg-emerald-500/10 ring-1 ring-emerald-500/20'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold text-white">{r.id}</div>
                          <div className="text-[10px] font-mono text-slate-400">{r.label}</div>
                          <div className="text-[10px] font-mono text-slate-500 mt-0.5">Currently: {r.zone}</div>
                        </div>
                        <div className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                          READY
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-white/10 bg-[#152336]">
              <button
                onClick={handleDispatch}
                disabled={!selectedResource || !zone}
                className="w-full py-3 rounded-xl font-mono text-[11px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30"
              >
                <ChevronRight className="w-4 h-4" />
                Dispatch Selected Unit
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
