import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Clock, MapPin, Users, ChevronRight, CheckCircle2, Shield } from 'lucide-react';
import { DemoStore } from '@/lib/demoState';
import type { DemoIncident, IncidentSeverity } from '@/lib/demoState';
import type { TempleId } from '@/lib/data';
import { showToast } from './Toast';

interface IncidentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'view';
  incident?: DemoIncident | null;
  defaultLocation?: string;
  defaultZone?: string;
  defaultTempleId?: TempleId;
  onDispatch?: () => void;
}

const SEVERITY_COLORS: Record<string, string> = {
  Critical: 'text-red-500 bg-red-500/10 border-red-500/30',
  High: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
  Medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
  Low: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
};

const STATUS_COLORS: Record<string, string> = {
  Reported: 'text-red-400 bg-red-500/10',
  Assigned: 'text-orange-400 bg-orange-500/10',
  'In Progress': 'text-blue-400 bg-blue-500/10',
  Resolved: 'text-emerald-400 bg-emerald-500/10',
};

export function IncidentDrawer({ isOpen, onClose, mode, incident, defaultLocation = '', defaultZone = '', defaultTempleId = 'somnath', onDispatch }: IncidentDrawerProps) {
  const [title, setTitle] = useState('');
  const [severity, setSeverity] = useState<IncidentSeverity>('Medium');
  const [type, setType] = useState('Crowd Surge');
  const [location, setLocation] = useState(defaultLocation);

  const handleCreate = () => {
    if (!title.trim()) return;
    DemoStore.createIncident({
      title,
      templeId: defaultTempleId,
      location: location || defaultLocation,
      zone: defaultZone,
      type,
      severity,
      recommendation: 'Assess situation and deploy nearest available resources',
    });
    showToast(`Incident created: ${title}`, 'warning');
    setTitle('');
    onClose();
  };

  const handleAcknowledge = () => {
    if (!incident) return;
    DemoStore.acknowledgeIncident(incident.id);
    showToast(`${incident.id} acknowledged`, 'success');
  };

  const handleEscalate = () => {
    if (!incident) return;
    DemoStore.escalateIncident(incident.id);
    showToast(`${incident.id} escalated to CRITICAL`, 'error');
  };

  const handleResolve = () => {
    if (!incident) return;
    DemoStore.resolveIncident(incident.id);
    showToast(`${incident.id} resolved`, 'success');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1050]" onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[460px] bg-[#0E1A2B] border-l border-white/10 z-[1050] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#152336]">
              <h2 className="text-sm font-mono uppercase tracking-widest text-white font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                {mode === 'create' ? 'Create Incident' : 'Incident Details'}
              </h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {mode === 'create' ? (
                <>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">Incident Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50" placeholder="e.g. Crowd Surge at North Gate" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50" placeholder="e.g. North Gate Holding Bay" />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">Incident Type</label>
                    <div className="flex flex-wrap gap-2">
                      {['Crowd Surge', 'Medical Emergency', 'Lost Child', 'Queue Choke', 'Security', 'VIP Movement'].map(t => (
                        <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] uppercase tracking-widest transition-all ${type === t ? 'border-orange-500/50 bg-orange-500/10 text-orange-400' : 'border-white/10 text-slate-500 hover:text-white'}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">Severity</label>
                    <div className="flex gap-2">
                      {(['Low', 'Medium', 'High', 'Critical'] as IncidentSeverity[]).map(s => (
                        <button key={s} onClick={() => setSeverity(s)} className={`flex-1 py-2 rounded-lg border font-mono text-[10px] uppercase tracking-widest font-bold transition-all ${severity === s ? SEVERITY_COLORS[s] : 'border-white/10 text-slate-500 hover:text-white'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : incident ? (
                <>
                  {/* View Mode */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-bold text-white">{incident.title}</div>
                      <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase mt-1">{incident.id}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg border font-mono text-[10px] uppercase tracking-widest font-bold ${SEVERITY_COLORS[incident.severity]}`}>
                      {incident.severity}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Status</div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${STATUS_COLORS[incident.status] || ''}`}>{incident.status}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Detected</div>
                      <div className="text-xs font-bold text-white flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" />{incident.detectedAt}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Location</div>
                      <div className="text-xs font-bold text-white flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" />{incident.location}</div>
                    </div>
                    <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Resources</div>
                      <div className="text-xs font-bold text-white flex items-center gap-1"><Users className="w-3 h-3 text-slate-400" />{incident.assignedResources.length} assigned</div>
                    </div>
                  </div>

                  {/* Assigned Resources */}
                  {incident.assignedResources.length > 0 && (
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">Assigned Resources</label>
                      <div className="flex flex-wrap gap-2">
                        {incident.assignedResources.map(rId => (
                          <span key={rId} className="px-2.5 py-1 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold uppercase tracking-widest">
                            <Shield className="w-3 h-3 inline mr-1" />{rId}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendation */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg">
                    <div className="text-[9px] font-mono text-emerald-500 uppercase tracking-widest mb-1">AI Recommendation</div>
                    <div className="text-xs text-white">{incident.recommendation}</div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-3 block">Incident Timeline</label>
                    <div className="space-y-3">
                      {incident.timeline.map((evt, i) => (
                        <div key={i} className="flex gap-3 items-start relative before:absolute before:left-[3px] before:top-4 before:bottom-[-12px] before:w-px before:bg-slate-700 last:before:hidden">
                          <div className="w-2 h-2 rounded-full bg-slate-400 mt-1 z-10 ring-2 ring-[#0E1A2B]" />
                          <div>
                            <div className="text-[9px] font-mono text-slate-500">{evt.time}</div>
                            <div className="text-xs text-white">{evt.message}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  {incident.status !== 'Resolved' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">Actions</label>
                      <div className="grid grid-cols-2 gap-2">
                        {incident.status === 'Reported' && (
                          <button onClick={handleAcknowledge} className="py-2.5 rounded-xl border border-blue-500/50 bg-blue-500/10 text-blue-400 font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-blue-500/20 transition-colors flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Acknowledge
                          </button>
                        )}
                        <button onClick={() => { onClose(); onDispatch?.(); }} className="py-2.5 rounded-xl border border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5" /> Dispatch
                        </button>
                        <button onClick={handleEscalate} className="py-2.5 rounded-xl border border-red-500/50 bg-red-500/10 text-red-400 font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-red-500/20 transition-colors flex items-center justify-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> Escalate
                        </button>
                        <button onClick={handleResolve} className="py-2.5 rounded-xl border border-slate-500/50 bg-slate-500/10 text-slate-400 font-mono text-[10px] uppercase tracking-widest font-bold hover:bg-slate-500/20 transition-colors flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            {/* Footer for create mode */}
            {mode === 'create' && (
              <div className="p-5 border-t border-white/10 bg-[#152336]">
                <button onClick={handleCreate} disabled={!title.trim()} className="w-full py-3 rounded-xl font-mono text-[11px] uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed bg-orange-500/20 border border-orange-500/50 text-orange-400 hover:bg-orange-500/30">
                  <AlertTriangle className="w-4 h-4" /> Create Incident
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
