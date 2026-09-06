import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Radio, Zap, X, Navigation, RotateCcw, PhoneCall, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showToast } from '@/components/ui/Toast';
import type { Guard } from './guardUtils';

const TYPE_STYLE: Record<string, { badge: string; pill: string }> = {
  Police:    { badge: 'bg-blue-900/80 border-blue-500/50 text-blue-100', pill: 'bg-blue-500 text-white' },
  Medical:   { badge: 'bg-red-900/80 border-red-500/50 text-red-100',   pill: 'bg-red-500 text-white' },
  Volunteer: { badge: 'bg-amber-900/80 border-amber-500/50 text-amber-100', pill: 'bg-amber-500 text-white' },
  Fire:      { badge: 'bg-orange-900/80 border-orange-500/50 text-orange-100', pill: 'bg-orange-500 text-white' },
  SDRF:      { badge: 'bg-green-900/80 border-green-500/50 text-green-100',    pill: 'bg-green-500 text-white' },
};

const STATUS_COLOR: Record<string, string> = {
  Available: 'text-emerald-400',
  Deployed: 'text-amber-400',
  'En Route': 'text-blue-400',
  Offline: 'text-slate-500',
};

interface GuardCommandPanelProps {
  guard: Guard | null;
  onClose: () => void;
}

export default function GuardCommandPanel({ guard, onClose }: GuardCommandPanelProps) {
  const [dispatching, setDispatching] = useState(false);

  if (!guard) return null;

  const styles = TYPE_STYLE[guard.type] || TYPE_STYLE.Police;

  const handleDispatch = (action: string) => {
    setDispatching(true);
    setTimeout(() => {
      setDispatching(false);
      showToast(`${action} → ${guard.name}`, 'success');
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        key={guard.id}
        initial={{ opacity: 0, x: -20, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -20, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="absolute top-4 left-4 z-[500] w-[270px] pointer-events-auto"
      >
        <div className={cn('rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden', styles.badge)}>
          {/* Header */}
          <div className="flex items-start justify-between p-3 pb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={cn('text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded', styles.pill)}>
                  {guard.type}
                </span>
                <span className={cn('text-[9px] font-bold', STATUS_COLOR[guard.status])}>
                  ● {guard.status}
                </span>
              </div>
              <div className="text-[13px] font-black leading-tight truncate">{guard.name}</div>
              <div className="text-[10px] opacity-70 mt-0.5">{guard.zone}</div>
            </div>
            <button onClick={onClose} className="shrink-0 ml-2 p-1 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Info Grid */}
          <div className="mx-3 mb-2 grid grid-cols-2 gap-1.5">
            <div className="bg-black/20 rounded-lg p-2">
              <div className="text-[8px] font-bold opacity-50 uppercase tracking-wider mb-0.5">Radio</div>
              <div className="flex items-center gap-1 text-[11px] font-black">
                <Radio className="w-3 h-3" /> {guard.radio}
              </div>
            </div>
            <div className="bg-black/20 rounded-lg p-2">
              <div className="text-[8px] font-bold opacity-50 uppercase tracking-wider mb-0.5">Unit ID</div>
              <div className="text-[11px] font-black font-mono">{guard.resourceId}</div>
            </div>
          </div>

          {/* Assigned Incident */}
          {guard.assignedIncident && (
            <div className="mx-3 mb-2 bg-red-500/20 border border-red-500/30 rounded-lg p-2 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <div>
                <div className="text-[8px] font-bold opacity-60 uppercase tracking-wider">Assigned</div>
                <div className="text-[11px] font-black">{guard.assignedIncident}</div>
              </div>
            </div>
          )}

          {!guard.assignedIncident && (
            <div className="mx-3 mb-2 bg-emerald-500/15 border border-emerald-500/25 rounded-lg p-2 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <div className="text-[10px] font-bold text-emerald-300">Unit available for deployment</div>
            </div>
          )}

          {/* Actions */}
          <div className="p-3 pt-1 space-y-1.5">
            <div className="text-[8px] font-bold opacity-50 uppercase tracking-wider mb-1">Quick Commands</div>
            <button
              onClick={() => handleDispatch('Dispatch to nearest incident')}
              disabled={dispatching}
              className="w-full flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold transition-colors"
            >
              <Zap className="w-3 h-3 text-amber-400" />
              Dispatch to Nearest Incident
            </button>
            <button
              onClick={() => handleDispatch('Zone reassignment initiated')}
              disabled={dispatching}
              className="w-full flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-blue-400" />
              Reassign Zone
            </button>
            <button
              onClick={() => handleDispatch('PA Broadcast initiated')}
              disabled={dispatching}
              className="w-full flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold transition-colors"
            >
              <Navigation className="w-3 h-3 text-purple-400" />
              PA Broadcast
            </button>
            <button
              onClick={() => handleDispatch('Radio call initiated')}
              disabled={dispatching}
              className="w-full flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              Open Radio Channel
            </button>
          </div>

          {dispatching && (
            <div className="mx-3 mb-3 text-center text-[9px] font-bold text-amber-400 animate-pulse uppercase tracking-wider">
              Transmitting command...
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
