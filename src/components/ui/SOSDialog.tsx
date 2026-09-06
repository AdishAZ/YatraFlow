import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { DemoStore } from '@/lib/demoState';
import type { DemoEmergency } from '@/lib/demoState';

interface SOSDialogProps {
  isOpen: boolean;
  onClose: () => void;
  location?: string;
}

export function SOSDialog({ isOpen, onClose, location = 'Current Location' }: SOSDialogProps) {
  const [step, setStep] = useState<'confirm' | 'processing' | 'activated'>('confirm');
  const [emergency, setEmergency] = useState<DemoEmergency | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep('confirm');
      setEmergency(null);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    setStep('processing');
    setTimeout(() => {
      const sos = DemoStore.triggerSOS(location);
      setEmergency(sos);
      setStep('activated');
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1050]" onClick={step === 'activated' ? onClose : undefined} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[1050] flex items-center justify-center p-4"
          >
            <div className="bg-[#0E1A2B] border border-red-500/30 rounded-2xl shadow-[0_0_60px_rgba(239,68,68,0.2)] w-full max-w-md overflow-hidden text-white">

              {step === 'confirm' && (
                <>
                  <div className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500/50 mx-auto flex items-center justify-center">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-wider">Confirm Emergency</h2>
                    <p className="text-sm text-slate-400">This will activate an SOS alert and dispatch the nearest available response team.</p>
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <MapPin className="w-3.5 h-3.5" /> {location}
                    </div>
                  </div>
                  <div className="p-5 border-t border-white/10 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 text-slate-400 font-mono text-[11px] uppercase tracking-widest hover:bg-white/5 transition-colors">
                      Cancel
                    </button>
                    <button onClick={handleConfirm} className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-red-500/30 transition-colors animate-pulse">
                      Activate SOS
                    </button>
                  </div>
                </>
              )}

              {step === 'processing' && (
                <div className="p-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full border-2 border-red-500/50 mx-auto flex items-center justify-center animate-spin">
                    <div className="w-12 h-12 rounded-full border-t-2 border-red-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold uppercase tracking-wider text-red-400">Activating Emergency</h2>
                    <p className="text-xs font-mono text-slate-500 mt-2 tracking-widest">Identifying nearest response units...</p>
                  </div>
                </div>
              )}

              {step === 'activated' && emergency && (
                <>
                  <div className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-500 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-wider text-red-400">SOS Activated</h2>
                    <div className="text-xs font-mono text-slate-400 tracking-widest">{emergency.id} • {emergency.timestamp}</div>
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-white bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                      <MapPin className="w-3.5 h-3.5 text-red-400" /> {emergency.location}
                    </div>
                  </div>

                  {/* Nearest Resources */}
                  <div className="px-8 pb-4">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3 block">Nearest Response Units</label>
                    <div className="space-y-2">
                      {emergency.nearestResources.map((r, i) => (
                        <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="flex items-center gap-3">
                            <Shield className="w-4 h-4 text-blue-400" />
                            <div>
                              <div className="text-xs font-bold text-white">{r.id}</div>
                              <div className="text-[10px] font-mono text-slate-400">{r.distance}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span className="text-xs font-mono text-emerald-400 font-bold">ETA {r.eta}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="px-8 pb-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg text-center">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Response Initiated — Resources En Route</span>
                    </div>
                  </div>

                  <div className="p-5 border-t border-white/10">
                    <button onClick={onClose} className="w-full py-3 rounded-xl border border-white/10 text-slate-400 font-mono text-[11px] uppercase tracking-widest hover:bg-white/5 transition-colors">
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
