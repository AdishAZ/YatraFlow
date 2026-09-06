import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertTriangle, Radio, Activity, PhoneCall, Wifi, ShieldAlert, Crosshair, MapPin, Users, Clock, Car, Stethoscope, ChevronLeft, ChevronRight, Timer, UserCheck, Shield, CheckCircle, Siren, TriangleAlert, X, Volume2, UserPlus } from 'lucide-react';
import MasterplanEngine from '@/components/map/MasterplanEngine';
import LayerToggle, { type LayerState } from '@/components/map/LayerToggle';
import IndiaMap from '@/components/map/IndiaMap';
import { useOperational } from '@/context/OperationalContext';
import { useDemoState } from '@/hooks/useDemoState';
import { cn } from '@/lib/utils';
import { scenarioEngine } from '@/lib/scenarioEngine';
import { DemoStore } from '@/lib/demoState';
import type { DemoIncident, DemoAlert, DemoResource } from '@/lib/demoState';

// ─── elapsed time ───
function elapsedSince(t: string): string {
  const m = t.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return '?m';
  let h = parseInt(m[1]); const min = parseInt(m[2]);
  if (m[3].toUpperCase() === 'PM' && h !== 12) h += 12;
  if (m[3].toUpperCase() === 'AM' && h === 12) h = 0;
  const diff = Math.max(0, Math.floor((Date.now() - new Date(new Date().toDateString()).setHours(h, min, 0, 0)) / 60000));
  return diff > 60 ? `${Math.floor(diff/60)}h${diff%60}m` : `${diff}m`;
}

// ─── severity config ───
const SEV = {
  Critical: { border: 'border-l-red-500', bg: 'bg-red-500/8', text: 'text-red-400', badge: 'text-red-300 bg-red-500/20 border-red-500/40', dot: 'bg-red-500' },
  High:     { border: 'border-l-orange-500', bg: 'bg-orange-500/5', text: 'text-orange-400', badge: 'text-orange-300 bg-orange-500/20 border-orange-500/40', dot: 'bg-orange-500' },
  Medium:   { border: 'border-l-amber-500', bg: 'bg-amber-500/5', text: 'text-amber-400', badge: 'text-amber-300 bg-amber-500/20 border-amber-500/40', dot: 'bg-amber-400' },
  Low:      { border: 'border-l-slate-500', bg: '', text: 'text-slate-400', badge: 'text-slate-400 bg-slate-500/20 border-slate-500/30', dot: 'bg-slate-500' },
} as const;

// ─── Mini Toast ───
interface ToastItem { id: number; msg: string; type: 'success'|'error'|'info'|'warn' }
let _toastId = 0;

function ToastStack({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: number) => void }) {
  return (
    <div className="absolute bottom-20 left-4 z-[900] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[11px] font-bold text-white shadow-2xl pointer-events-auto max-w-[280px]",
              t.type === 'success' ? 'bg-emerald-800/95 border border-emerald-500/40' :
              t.type === 'error'   ? 'bg-red-800/95 border border-red-500/40' :
              t.type === 'warn'    ? 'bg-amber-800/95 border border-amber-500/40' :
              'bg-[#0e1a2b]/95 border border-white/15'
            )}
          >
            {t.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
            {t.type === 'error'   && <X className="w-4 h-4 text-red-400 shrink-0" />}
            {t.type === 'warn'    && <TriangleAlert className="w-4 h-4 text-amber-400 shrink-0" />}
            {t.type === 'info'    && <Wifi className="w-4 h-4 text-blue-400 shrink-0" />}
            <span className="flex-1 leading-snug">{t.msg}</span>
            <button onClick={() => onDismiss(t.id)} className="ml-1 opacity-50 hover:opacity-100 transition-opacity shrink-0">
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Radio Comms Modal ───
function RadioModal({ target, onClose }: { target: { name: string; channel: string; type: string }; onClose: () => void }) {
  const [transmitting, setTransmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSend = () => {
    if (!msg.trim()) return;
    setTransmitting(true);
    setTimeout(() => { setTransmitting(false); setMsg(''); }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[800] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="relative z-10 w-[340px] bg-[#0a1520] border border-blue-500/30 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.15)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20 bg-blue-950/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Radio className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-blue-400 leading-none">Radio Comms</div>
              <div className="text-[13px] font-bold text-white leading-tight">{target.name}</div>
            </div>
          </div>
          <button onClick={onClose} className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Channel info */}
        <div className="px-4 py-3 border-b border-white/5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-[8px] text-slate-500 uppercase tracking-wider mb-0.5">Channel</div>
              <div className="text-[13px] font-black text-blue-300">{target.channel}</div>
            </div>
            <div>
              <div className="text-[8px] text-slate-500 uppercase tracking-wider mb-0.5">Type</div>
              <div className="text-[13px] font-black text-white">{target.type}</div>
            </div>
            <div>
              <div className="text-[8px] text-slate-500 uppercase tracking-wider mb-0.5">Status</div>
              <div className="flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-400">LIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message input */}
        <div className="p-4 flex flex-col gap-3">
          <textarea
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder="Type message... (or tap PTT to speak)"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-[11px] text-white placeholder-slate-600 resize-none outline-none focus:border-blue-500/40 transition-colors"
          />
          <div className="flex gap-2">
            <button
              onMouseDown={() => setTransmitting(true)}
              onMouseUp={() => setTransmitting(false)}
              onMouseLeave={() => setTransmitting(false)}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 border",
                transmitting
                  ? "bg-red-500 border-red-400 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] scale-95"
                  : "bg-white/5 border-white/10 text-slate-300 hover:border-blue-500/40 hover:text-blue-300"
              )}
            >
              <Volume2 className="w-3.5 h-3.5" />
              {transmitting ? 'TRANSMITTING...' : 'Hold to PTT'}
            </button>
            <button
              onClick={handleSend}
              disabled={!msg.trim()}
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-[10px] font-black uppercase tracking-wider text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" /> Send
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Broadcast Modal ───
function BroadcastModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [countdown, setCountdown] = useState(3);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!confirmed) return;
    if (countdown <= 0) { onConfirm(); onClose(); return; }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [confirmed, countdown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[800] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.88 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.88 }}
        onClick={e => e.stopPropagation()}
        className="relative z-10 w-[360px] bg-[#0a1520] border border-red-500/40 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(239,68,68,0.2)]"
      >
        <div className="px-5 py-4 border-b border-red-500/20 bg-red-950/20 flex items-center gap-3">
          <Siren className="w-5 h-5 text-red-400 animate-pulse" />
          <div>
            <div className="text-[9px] font-black uppercase tracking-widest text-red-400">Emergency Protocol</div>
            <div className="text-[14px] font-black text-white">All-Units Broadcast</div>
          </div>
        </div>
        <div className="p-5">
          <div className="text-[11px] text-slate-300 leading-relaxed mb-4">
            This will broadcast an <span className="text-red-300 font-bold">emergency alert</span> to all deployed units, 
            command posts, and trigger a system-wide notification. This action is logged.
          </div>
          {!confirmed ? (
            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-wider text-slate-300 transition-colors">
                Cancel
              </button>
              <button
                onClick={() => setConfirmed(true)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-[10px] font-black uppercase tracking-wider text-white transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-red-900/30"
              >
                <Radio className="w-3.5 h-3.5" /> Confirm Broadcast
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="text-5xl font-black text-red-400 tabular-nums animate-pulse">{countdown}</div>
              <div className="text-[11px] text-slate-400">Broadcasting in {countdown}s...</div>
              <button onClick={onClose} className="text-[10px] text-slate-500 hover:text-slate-300 transition-colors underline">Cancel</button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ═══════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════
export default function GISMap() {
  const { selectedTemple, globalMetrics, setMissionStatus, missionStatus, activeCameraId } = useOperational();
  const { incidents, resources, alerts: activeAlerts } = useDemoState();

  const [isLoading, setIsLoading] = useState(true);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [searchTarget, setSearchTarget] = useState<{x: number; y: number} | null>(null);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [selectedGuard, setSelectedGuard] = useState<any | null>(null);

  // Toast system
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toast = useCallback((msg: string, type: ToastItem['type'] = 'info') => {
    const id = ++_toastId;
    setToasts(t => [...t.slice(-3), { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4000);
  }, []);
  const dismissToast = useCallback((id: number) => setToasts(t => t.filter(x => x.id !== id)), []);

  // Modal states
  const [radioTarget, setRadioTarget] = useState<{ name: string; channel: string; type: string } | null>(null);
  const [showBroadcast, setShowBroadcast] = useState(false);

  const [activeLayers, setActiveLayers] = useState<LayerState>({
    heatmap: true, guards: true, cameras: true,
    incidents: true, zones: true, labels: true, fov: false,
  });
  const toggleLayer = (layer: keyof LayerState) =>
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));

  const loadingMsgs = ['Establishing secure link...', 'Decrypting geospatial data...', 'Syncing live unit positions...', 'Calibrating AI threat models...', 'Map ready.'];
  useEffect(() => {
    setIsLoading(true); setLoadingMsgIdx(0);
    const iv = setInterval(() => setLoadingMsgIdx(i => {
      if (i < loadingMsgs.length - 1) return i + 1;
      clearInterval(iv); setTimeout(() => setIsLoading(false), 200); return i;
    }), 150);
    return () => clearInterval(iv);
  }, [selectedTemple]);

  const activeIncidents = useMemo(() => incidents.filter((i: DemoIncident) => i.status !== 'Resolved'), [incidents]);
  const deployedResources = useMemo(() => resources.filter((r: DemoResource) => r.status === 'Deployed' || r.status === 'En Route'), [resources]);
  const availableResources = useMemo(() => resources.filter((r: DemoResource) => r.status === 'Available'), [resources]);
  const templeIncidents = useMemo(() => activeIncidents.filter((i: DemoIncident) => i.templeId === selectedTemple), [activeIncidents, selectedTemple]);
  const criticalCount = useMemo(() => templeIncidents.filter((i: DemoIncident) => i.severity === 'Critical').length, [templeIncidents]);
  const hasCritical = criticalCount > 0;

  const demoIncidentPins = useMemo(() => {
    if (selectedTemple === 'dwarka') {
      return activeIncidents.filter((i: DemoIncident) => i.templeId === 'dwarka')
        .map((i: DemoIncident, idx: number) => ({ id: i.id, title: i.title, severity: i.severity, x: 682 + idx*20, y: 262 + idx*20 }));
    }
    return activeIncidents.filter((i: DemoIncident) => i.templeId === 'somnath')
      .map((i: DemoIncident, idx: number) => ({ id: i.id, title: i.title, severity: i.severity, x: 749 + idx*30, y: 970 + idx*20 }));
  }, [selectedTemple, activeIncidents]);

  const [scenario, setScenario] = useState(scenarioEngine.getCurrent());
  useEffect(() => { const u = scenarioEngine.subscribe(s => setScenario(s)); return u; }, []);

  // ─── Actions ───
  const handleDispatchToIncident = useCallback((inc: DemoIncident) => {
    const available = DemoStore.getAvailableResourcesByType('Police');
    const medAvail = DemoStore.getAvailableResourcesByType('Medical');
    const unit = available[0] || medAvail[0] || availableResources[0];
    if (!unit) { toast('No available units to dispatch!', 'error'); return; }
    DemoStore.dispatchResource(unit.id, inc.zone, inc.id);
    DemoStore.acknowledgeIncident(inc.id);
    DemoStore.addAlert({ message: `${unit.id} dispatched to ${inc.zone}`, severity: 'High' });
    toast(`${unit.label} dispatched to ${inc.zone}`, 'success');
  }, [availableResources, toast]);

  const handleDispatchGuard = useCallback((guard: any) => {
    if (!guard) return;
    toast(`${guard.name} — En Route to assignment`, 'success');
  }, [toast]);

  const handleOpenRadio = useCallback((name: string, channel: string, type: string) => {
    setRadioTarget({ name, channel, type });
  }, []);

  const handleResolveIncident = useCallback((inc: DemoIncident) => {
    DemoStore.resolveIncident(inc.id);
    toast(`Incident ${inc.id} marked as Resolved`, 'success');
    setSelectedIncident(null);
  }, [toast]);

  const handleEscalate = useCallback((inc: DemoIncident) => {
    DemoStore.escalateIncident(inc.id);
    toast(`${inc.id} escalated to CRITICAL`, 'warn');
  }, [toast]);

  const handleBroadcastConfirm = useCallback(() => {
    DemoStore.addAlert({ message: 'ALL-UNITS EMERGENCY BROADCAST — High Alert Active', severity: 'Critical' });
    DemoStore.addAlert({ message: 'Command orders: maximum vigilance, report to stations', severity: 'Critical' });
    setMissionStatus('CRITICAL');
    toast('Emergency broadcast transmitted to all units', 'error');
  }, [toast, setMissionStatus]);

  const handleIncidentClick = useCallback((inc: DemoIncident, pins: typeof demoIncidentPins) => {
    setSelectedIncident(id => id === inc.id ? null : inc.id);
  }, []);

  const handleDismissAlert = useCallback((id: string) => {
    DemoStore.dismissAlert(id);
  }, []);

  const cycleOpcon = useCallback(() => {
    if (missionStatus === 'NOMINAL') { setMissionStatus('ELEVATED'); toast('OPCON elevated to ELEVATED', 'warn'); }
    else if (missionStatus === 'ELEVATED') { setMissionStatus('CRITICAL'); toast('OPCON escalated to CRITICAL', 'error'); }
    else { setMissionStatus('NOMINAL'); toast('OPCON returned to NOMINAL', 'success'); }
  }, [missionStatus, setMissionStatus, toast]);

  return (
    <div className="-m-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)] flex text-slate-800 bg-[#080c12] overflow-hidden">

      {/* ── MODALS ── */}
      <AnimatePresence>
        {radioTarget && <RadioModal target={radioTarget} onClose={() => setRadioTarget(null)} />}
        {showBroadcast && <BroadcastModal onClose={() => setShowBroadcast(false)} onConfirm={handleBroadcastConfirm} />}
      </AnimatePresence>

      {/* ================================================================ */}
      {/* COLLAPSIBLE LEFT COMMAND RAIL                                    */}
      {/* ================================================================ */}
      <motion.div
        className="flex-shrink-0 flex flex-col relative z-10"
        style={{ background: 'linear-gradient(180deg, #0a1118 0%, #080c12 100%)' }}
        animate={{ width: panelCollapsed ? 52 : 308 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Critical alert stripe */}
        <AnimatePresence>
          {hasCritical && !panelCollapsed && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden shrink-0">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/15 border-b border-red-500/30">
                <Siren className="w-3 h-3 text-red-400 animate-pulse shrink-0" />
                <span className="text-[8px] font-black uppercase tracking-[0.15em] text-red-400">
                  {criticalCount} Critical — Immediate Response Required
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse tab */}
        <button
          onClick={() => setPanelCollapsed(!panelCollapsed)}
          className="absolute -right-0 top-1/2 -translate-y-1/2 translate-x-full z-20 w-5 h-16 bg-[#0E1A2B] border border-l-0 border-white/8 rounded-r-lg flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-[#14243a] transition-all"
        >
          {panelCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        {/* ── COLLAPSED RAIL ── */}
        {panelCollapsed && (
          <div className="flex flex-col items-center gap-3 pt-3 px-2">
            {[
              { icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10', badge: null, tip: 'Units' },
              { icon: AlertTriangle, color: 'text-red-400', bg: hasCritical ? 'bg-red-500/20' : 'bg-red-500/10', badge: templeIncidents.length || null, tip: 'Incidents' },
              { icon: Wifi, color: 'text-emerald-400', bg: 'bg-emerald-500/10', badge: activeAlerts.length > 0 ? activeAlerts.length : null, tip: 'Alerts' },
              { icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/10', badge: null, tip: 'Units' },
            ].map(({ icon: Icon, color, bg, badge }, i) => (
              <div key={i} className="relative">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", bg)}>
                  <Icon className={cn("w-4 h-4", color)} />
                </div>
                {badge !== null && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center leading-none">{badge}</span>}
              </div>
            ))}
            <div className="w-6 h-px bg-white/8 my-1" />
            <button onClick={() => setShowBroadcast(true)} className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {/* ── EXPANDED PANEL ── */}
        {!panelCollapsed && (
          <div className="flex flex-col h-full overflow-hidden">

            {/* Scenario / Status strip */}
            <AnimatePresence mode="wait">
              {scenario ? (
                <motion.div key={scenario.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className={cn("shrink-0 px-4 py-2.5 border-b flex items-center gap-2",
                    scenario.severity === 'critical' ? 'bg-red-950/60 border-red-500/30' :
                    scenario.severity === 'high' ? 'bg-amber-950/60 border-amber-500/30' : 'bg-[#0a1520] border-white/8'
                  )}>
                  <span className={cn("w-2 h-2 rounded-full animate-pulse shrink-0", scenario.severity === 'critical' ? 'bg-red-400' : scenario.severity === 'high' ? 'bg-amber-400' : 'bg-blue-400')} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[7px] font-black uppercase tracking-[0.15em] text-slate-500 mb-0.5">Live Scenario</div>
                    <div className="text-[11px] font-bold text-white truncate">{scenario.label}</div>
                  </div>
                </motion.div>
              ) : (
                <div className="shrink-0 px-4 py-2.5 border-b border-white/5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <div>
                    <div className="text-[7px] font-black uppercase tracking-[0.15em] text-slate-500 mb-0.5">Operations</div>
                    <div className="text-[11px] font-bold text-emerald-400">Nominal — All Systems Green</div>
                  </div>
                  <button onClick={cycleOpcon} className="ml-auto text-[7px] font-black uppercase tracking-wider text-slate-600 hover:text-slate-300 transition-colors border border-white/8 rounded px-1.5 py-0.5">
                    OPCON
                  </button>
                </div>
              )}
            </AnimatePresence>

            {/* Stats row */}
            <div className="shrink-0 grid grid-cols-4 border-b border-white/5">
              {[
                { val: deployedResources.length, label: 'Deployed', color: 'text-amber-400' },
                { val: availableResources.length, label: 'Available', color: 'text-emerald-400' },
                { val: templeIncidents.length, label: 'Incidents', color: hasCritical ? 'text-red-400' : 'text-white' },
                { val: activeAlerts.length, label: 'Alerts', color: 'text-orange-400' },
              ].map(({ val, label, color }, i) => (
                <div key={i} className={cn("flex flex-col items-center justify-center py-3 gap-0.5", i < 3 && "border-r border-white/5")}>
                  <motion.div key={val} initial={{ scale: 0.8 }} animate={{ scale: 1 }} className={cn("text-2xl font-black leading-none tabular-nums", color)}>{val}</motion.div>
                  <div className="text-[7px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
                </div>
              ))}
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto hidden-scrollbar flex flex-col">

              {/* Incidents header */}
              <div className="flex items-center justify-between px-3 pt-3 pb-1.5 shrink-0">
                <span className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-500 flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3 text-red-400" /> Active Incidents
                </span>
                {templeIncidents.length > 0 && (
                  <span className={cn("text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none", hasCritical ? "bg-red-500/20 text-red-400" : "bg-white/8 text-slate-400")}>
                    {templeIncidents.length}
                  </span>
                )}
              </div>

              {/* Incident cards */}
              <div className="flex flex-col gap-px px-2 shrink-0">
                {templeIncidents.slice(0, 5).map((inc: DemoIncident) => {
                  const s = SEV[inc.severity] ?? SEV.Medium;
                  const isSelected = selectedIncident === inc.id;
                  const isCritical = inc.severity === 'Critical';
                  return (
                    <div key={inc.id}
                      onClick={() => handleIncidentClick(inc, demoIncidentPins)}
                      className={cn(
                        "rounded-lg border-l-[3px] px-3 py-2.5 cursor-pointer transition-all duration-200 select-none",
                        s.border, s.bg,
                        isSelected ? "ring-1 ring-white/10" : "hover:bg-white/4",
                        isCritical && "shadow-[0_0_12px_rgba(239,68,68,0.12)]"
                      )}>
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            {isCritical && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0 animate-pulse", s.dot)} />}
                            <div className="text-[11px] font-bold text-white leading-tight truncate">{inc.title}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-0.5 text-[8px] text-slate-500"><MapPin className="w-2.5 h-2.5" />{inc.zone}</span>
                            <span className="flex items-center gap-0.5 text-[8px] text-amber-400/80"><Timer className="w-2.5 h-2.5" />{elapsedSince(inc.detectedAt)}</span>
                          </div>
                        </div>
                        <span className={cn("shrink-0 text-[7px] font-black px-1.5 py-0.5 rounded border leading-none mt-0.5", s.badge)}>{inc.severity}</span>
                      </div>

                      {/* Expandable action area */}
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                            <div className="pt-2.5 mt-2 border-t border-white/8">
                              {/* Assigned resources */}
                              {inc.assignedResources.length > 0 ? (
                                <div className="flex flex-wrap gap-1 mb-2.5">
                                  {inc.assignedResources.map((r: string) => (
                                    <span key={r} className="text-[8px] font-bold px-1.5 py-0.5 bg-blue-500/15 border border-blue-500/25 text-blue-300 rounded">{r}</span>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-[8px] text-amber-400 mb-2.5 flex items-center gap-1 font-bold">
                                  <TriangleAlert className="w-2.5 h-2.5" /> Unassigned — no unit responding
                                </div>
                              )}
                              {/* Recommendation */}
                              {inc.recommendation && (
                                <div className="text-[8px] text-slate-500 mb-2.5 italic leading-snug border-l-2 border-white/10 pl-2">{inc.recommendation}</div>
                              )}
                              {/* Action buttons */}
                              <div className="grid grid-cols-2 gap-1.5">
                                <button onClick={e => { e.stopPropagation(); handleDispatchToIncident(inc); }} className="py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-[9px] font-bold text-white transition-colors flex items-center justify-center gap-1">
                                  <UserPlus className="w-2.5 h-2.5" /> Dispatch Unit
                                </button>
                                <button onClick={e => { e.stopPropagation(); handleOpenRadio(inc.id, 'CH-OPS', 'Incident'); }} className="py-1.5 bg-white/8 hover:bg-white/12 border border-white/8 rounded-lg text-[9px] font-bold text-white transition-colors flex items-center justify-center gap-1">
                                  <Radio className="w-2.5 h-2.5" /> Radio
                                </button>
                                <button onClick={e => { e.stopPropagation(); handleEscalate(inc); }} className="py-1.5 bg-red-900/40 hover:bg-red-900/60 border border-red-500/20 rounded-lg text-[9px] font-bold text-red-400 transition-colors flex items-center justify-center gap-1">
                                  <TriangleAlert className="w-2.5 h-2.5" /> Escalate
                                </button>
                                <button onClick={e => { e.stopPropagation(); handleResolveIncident(inc); }} className="py-1.5 bg-emerald-900/30 hover:bg-emerald-900/50 border border-emerald-500/20 rounded-lg text-[9px] font-bold text-emerald-400 transition-colors flex items-center justify-center gap-1">
                                  <CheckCircle className="w-2.5 h-2.5" /> Resolve
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {templeIncidents.length === 0 && (
                  <div className="flex flex-col items-center py-5 gap-1.5">
                    <Shield className="w-6 h-6 text-emerald-500/40" />
                    <div className="text-[9px] text-slate-600 font-bold">All Clear — No Active Incidents</div>
                  </div>
                )}
              </div>

              {/* Selected guard */}
              <AnimatePresence>
                {selectedGuard && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    className="shrink-0 mx-2 mt-2 bg-blue-950/40 border border-blue-500/25 rounded-xl p-3 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
                    <div className="flex items-start justify-between relative z-10 mb-2">
                      <div>
                        <div className="text-[7px] font-black uppercase tracking-[0.15em] text-blue-400 mb-0.5">Selected Unit</div>
                        <div className="text-[13px] font-black leading-tight">{selectedGuard.name}</div>
                        <div className="text-[9px] text-slate-400">{selectedGuard.type} &middot; {selectedGuard.zone}</div>
                      </div>
                      <button onClick={() => setSelectedGuard(null)} className="w-5 h-5 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors shrink-0 mt-0.5">
                        <X className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>
                    <div className="flex gap-1.5 relative z-10">
                      <button onClick={() => handleDispatchGuard(selectedGuard)} className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-[9px] font-bold transition-colors flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3" /> Dispatch
                      </button>
                      <button onClick={() => handleOpenRadio(selectedGuard.name, selectedGuard.radio || 'CH-1', selectedGuard.type)} className="flex-1 py-1.5 bg-white/8 hover:bg-white/15 rounded-lg text-[9px] font-bold transition-colors flex items-center justify-center gap-1 border border-white/8">
                        <PhoneCall className="w-3 h-3" /> Radio
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Alerts */}
              <div className="shrink-0 mt-3">
                <div className="flex items-center justify-between px-3 pb-1.5">
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] text-slate-500 flex items-center gap-1.5">
                    <Wifi className="w-3 h-3 text-emerald-400" /> Live Alerts
                  </span>
                  <button onClick={() => activeAlerts.forEach((a: DemoAlert) => DemoStore.dismissAlert(a.id))} className="text-[7px] text-slate-600 hover:text-slate-400 transition-colors font-bold uppercase tracking-wider">
                    Dismiss all
                  </button>
                </div>
                <div className="flex flex-col gap-px px-2">
                  {activeAlerts.slice(0, 5).map((alt: DemoAlert) => {
                    const s = SEV[alt.severity] ?? SEV.Medium;
                    return (
                      <div key={alt.id} className={cn("rounded-lg border-l-[3px] px-3 py-2 group", s.border, s.bg)}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <div className={cn("text-[7px] font-black uppercase tracking-[0.12em] mb-0.5", s.text)}>{alt.severity}</div>
                            <div className="text-[9px] font-semibold text-slate-200 leading-snug">{alt.message}</div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <div className="text-[7px] text-slate-600">{alt.timestamp}</div>
                            <button onClick={() => handleDismissAlert(alt.id)} className="opacity-0 group-hover:opacity-100 transition-opacity w-4 h-4 rounded flex items-center justify-center bg-white/5 hover:bg-white/10">
                              <X className="w-2.5 h-2.5 text-slate-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 min-h-4" />
            </div>

            {/* Emergency Broadcast */}
            <div className="shrink-0 p-3 border-t border-white/5">
              <button
                onClick={() => setShowBroadcast(true)}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
              >
                <Radio className="w-3.5 h-3.5" /> Emergency Broadcast
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* ================================================================ */}
      {/* MAIN MAP AREA                                                    */}
      {/* ================================================================ */}
      <div className="flex-1 flex flex-col gap-2 min-w-0 p-3 pl-2 relative">

        {/* In-map toasts */}
        <ToastStack toasts={toasts} onDismiss={dismissToast} />

        {/* MAP VIEWPORT */}
        <div className="flex-1 rounded-xl overflow-hidden relative min-h-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          <AnimatePresence mode="popLayout">
            <motion.div key={selectedTemple} initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="absolute inset-0">
              <MasterplanEngine
                mode="admin"
                searchTarget={searchTarget}
                activeLayers={activeLayers}
                scenario={scenario}
                demoIncidents={demoIncidentPins}
                onGuardClick={setSelectedGuard}
              />
            </motion.div>
          </AnimatePresence>

          {/* Loading overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[600] bg-[#080c12]/95 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center gap-5">
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 rounded-full border border-amber-500/15" />
                    <div className="absolute inset-0 rounded-full border border-transparent border-t-amber-500 animate-[spin_1.5s_linear_infinite]" />
                    <div className="absolute inset-2 rounded-full border border-transparent border-t-amber-400/50 animate-[spin_2.5s_linear_infinite_reverse]" />
                  </div>
                  <div className="text-white font-mono text-xs tracking-[0.25em] uppercase opacity-70 animate-pulse">{loadingMsgs[loadingMsgIdx]}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top-right: minimap */}
          {!activeCameraId && (
            <div className="absolute top-3 right-3 z-[400] pointer-events-auto">
              <div className="w-[200px] h-[200px] bg-white/92 rounded-xl shadow-2xl border border-black/10 overflow-hidden ring-4 ring-[#0E1A2B]/50 transition-all duration-300">
                <IndiaMap />
              </div>
            </div>
          )}

          {/* Bottom-right: map layers */}
          {!activeCameraId && (
            <div className="absolute bottom-3 right-3 z-[400] pointer-events-auto scale-90 origin-bottom-right transition-all duration-300">
              <LayerToggle layers={activeLayers} counts={{ guards: 15, cameras: 12, incidents: demoIncidentPins.length, zones: 5, heatmap: 15 }} onToggle={toggleLayer} />
            </div>
          )}

          {/* Top-center: scenario pill */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[400] pointer-events-none">
            <AnimatePresence mode="wait">
              {scenario && (
                <motion.div key={scenario.id} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  className={cn('rounded-full px-4 py-1.5 border text-white text-[11px] font-bold shadow-2xl whitespace-nowrap flex items-center gap-2 backdrop-blur-xl',
                    scenario.severity === 'critical' ? 'bg-red-900/85 border-red-500/50' :
                    scenario.severity === 'high' ? 'bg-orange-900/85 border-orange-500/50' :
                    'bg-[#0E1A2B]/85 border-white/15'
                  )}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />{scenario.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── BOTTOM ANALYTICS DOCK ── */}
        <div className="shrink-0 h-[68px] bg-[#0a1118] rounded-xl flex items-center px-2 gap-1.5 border border-white/5">
          {[
            { label: 'Pilgrims Today', icon: Users, value: `${(globalMetrics.visitors/1000).toFixed(1)}K`, sub: '+8% today', bg: 'bg-blue-500/8 border-blue-500/15', vc: 'text-blue-300' },
            { label: 'Queue Wait', icon: Clock, value: `${globalMetrics.waitTime}m`, sub: globalMetrics.waitTime > 45 ? 'HIGH' : 'Normal', bg: globalMetrics.waitTime > 45 ? 'bg-orange-500/12 border-orange-500/25' : 'bg-white/4 border-white/8', vc: globalMetrics.waitTime > 45 ? 'text-orange-300' : 'text-white' },
            { label: 'Crowd Level', icon: Activity, value: `${globalMetrics.crowdLevel}%`, sub: globalMetrics.crowdLevel > 85 ? 'CRITICAL' : 'Elevated', bg: globalMetrics.crowdLevel > 85 ? 'bg-red-500/15 border-red-500/30' : 'bg-orange-500/10 border-orange-500/20', vc: globalMetrics.crowdLevel > 85 ? 'text-red-300' : 'text-orange-300', pulse: globalMetrics.crowdLevel > 85 },
            { label: 'Active Incidents', icon: AlertTriangle, value: String(activeIncidents.length), sub: hasCritical ? `${criticalCount} CRITICAL` : 'All assigned', bg: hasCritical ? 'bg-red-500/15 border-red-500/30' : activeIncidents.length > 0 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/8 border-emerald-500/15', vc: hasCritical ? 'text-red-300' : activeIncidents.length > 0 ? 'text-amber-300' : 'text-emerald-400', pulse: hasCritical },
          ].map((m, i) => (
            <div key={i} className={cn("flex-1 h-[52px] rounded-lg border flex items-center gap-3 px-3 transition-all duration-500", m.bg)}>
              <m.icon className={cn("w-4 h-4 shrink-0 opacity-70", m.vc)} />
              <div className="flex-1 min-w-0">
                <div className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.1em] leading-none mb-1 truncate">{m.label}</div>
                <div className="flex items-baseline gap-2">
                  <motion.span key={m.value} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("text-[17px] font-black leading-none tabular-nums", m.vc)}>{m.value}</motion.span>
                  {'pulse' in m && m.pulse && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shrink-0" />}
                  <span className="text-[8px] text-slate-500 font-bold leading-none hidden xl:block">{m.sub}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="w-px h-10 bg-white/8 shrink-0 mx-1" />
          {[
            { label: 'Parking', value: '85%', icon: Car, col: 'text-indigo-400' },
            { label: 'Medical', value: String(incidents.filter((i: DemoIncident) => i.type === 'Medical Emergency').length), icon: Stethoscope, col: 'text-rose-400' },
            { label: 'Police', value: String(resources.filter((r: DemoResource) => r.type === 'Police' && r.status === 'Deployed').length), icon: Shield, col: 'text-sky-400' },
            { label: 'AI Conf.', value: `${globalMetrics.aiConfidence}%`, icon: Crosshair, col: 'text-violet-400' },
          ].map((m, i) => (
            <div key={i} className="flex flex-col items-center justify-center px-2 shrink-0 gap-0.5">
              <m.icon className={cn("w-3.5 h-3.5 opacity-60", m.col)} />
              <motion.div key={m.value} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("text-[14px] font-black leading-none tabular-nums", m.col)}>{m.value}</motion.div>
              <div className="text-[7px] text-slate-600 font-bold uppercase tracking-[0.08em]">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
