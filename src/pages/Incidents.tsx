import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEMPLES } from '@/lib/data';
import type { TempleId } from '@/lib/data';
import type { DemoIncident } from '@/lib/demoState';
import { useDemoState } from '@/hooks/useDemoState';
import { useOperational } from '@/context/OperationalContext';
import { useBridgeSync } from '@/hooks/useBridgeSync';
import { IncidentDrawer } from '@/components/ui/IncidentDrawer';
import { DispatchDrawer } from '@/components/ui/DispatchDrawer';
import { showToast } from '@/components/ui/Toast';
import { 
  AlertTriangle, CheckCircle2, ChevronRight, Filter, ShieldAlert,
  Search, Shield, MapPin, Clock, Users, Activity, Crosshair, Map, Navigation,
  ChevronDown, ChevronUp, Radio, FileText, Zap, AlertCircle, Eye, RefreshCw,
  Siren, Wifi, WifiOff, Smartphone, Mic, Volume2, Maximize, Play, CheckSquare, Timer, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper for seeded random to ensure stable rendering
const seededRandom = (seed: string, min: number, max: number) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = Math.imul(31, hash) + seed.charCodeAt(i) | 0;
  }
  const random = Math.abs(Math.sin(hash)) * 10000;
  return min + Math.floor((random - Math.floor(random)) * (max - min + 1));
};

export default function Incidents() {
  const { incidents, resources, alerts, actions } = useDemoState();
  const { selectedTemple } = useOperational();
  const bridge = useBridgeSync(5000); // 🔄 poll bridge for mobile SOS
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const [showIncidentDrawer, setShowIncidentDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'view'>('create');
  const [viewIncident, setViewIncident] = useState<DemoIncident | undefined>(undefined);
  const [showDispatchDrawer, setShowDispatchDrawer] = useState(false);
  const [dispatchIncidentId, setDispatchIncidentId] = useState<string | undefined>(undefined);
  const [dispatchZone, setDispatchZone] = useState<string | undefined>(undefined);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredIncidents = useMemo(() => {
    return incidents.filter(inc => {
      const matchTemple = inc.templeId === selectedTemple;
      const matchSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) || inc.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTemple && matchSearch;
    }).map(inc => {
      const isCritical = inc.severity === 'Critical';
      const sopTotal = seededRandom(inc.id+'sop', 4, 9);
      const sopDone = inc.status === 'Resolved' ? sopTotal : inc.status === 'Reported' ? 1 : seededRandom(inc.id+'sopd', 2, sopTotal - 1);
      
      const agencies = [
        { icon: '👮', count: seededRandom(inc.id+'p', 0, 6) },
        { icon: '🚑', count: seededRandom(inc.id+'m', 0, 3) },
        { icon: '🦺', count: seededRandom(inc.id+'v', 0, 10) },
        { icon: '🚒', count: seededRandom(inc.id+'f', 0, 2) },
        { icon: '📡', count: seededRandom(inc.id+'s', 0, 1) }
      ].filter(a => a.count > 0);

      const sources = ['AI Camera', 'Volunteer', 'Police', 'Citizen App'];
      
      const hash = inc.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
      const baseSeconds = (hash % 7200) + 120;
      const elapsedSeconds = inc.status === 'Resolved' ? baseSeconds : baseSeconds + tick;
      const hours = Math.floor(elapsedSeconds / 3600);
      const mins = Math.floor((elapsedSeconds % 3600) / 60);
      const secs = elapsedSeconds % 60;
      const elapsedStr = `T+${hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      return {
        ...inc,
        sopTotal,
        sopDone,
        agencies,
        reporter: sources[seededRandom(inc.id+'src', 0, 3)],
        elapsedStr,
        elapsedSeconds,
        sopName: inc.type === 'Crowd Surge' ? 'Crowd Surge Protocol' : inc.type === 'Medical Emergency' ? 'Medical Evac Protocol' : 'Standard Response Protocol',
        eta: seededRandom(inc.id+'eta', 1, 10),
        priority: inc.severity
      };
    });
  }, [incidents, selectedTemple, searchQuery, tick]);

  const columns = [
    { id: 'Reported', label: 'Reported', color: 'bg-slate-400', emptyMsg: 'No incidents reported.' },
    { id: 'Assigned', label: 'Assigned', color: 'bg-blue-500', emptyMsg: 'No assigned incidents.' },
    { id: 'In Progress', label: 'In Progress', color: 'bg-saffron-500', emptyMsg: 'No active operations.' },
    { id: 'Resolved', label: 'Resolved', color: 'bg-emerald-600', emptyMsg: 'No resolved incidents today.' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'High': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Dynamic 24-column grid sizing
  const columnSpans = useMemo(() => {
    const spans: Record<string, number> = {};
    const emptyCols = columns.filter(c => filteredIncidents.filter(i => i.status === c.id).length === 0);
    const popCols = columns.filter(c => filteredIncidents.filter(i => i.status === c.id).length > 0);
    
    emptyCols.forEach(c => spans[c.id] = 3); // 3/24 = 12.5% (Compact)
    
    if (popCols.length > 0) {
      const idealWeights: Record<string, number> = {
        'Reported': 3,
        'Assigned': 3,
        'In Progress': 10,
        'Resolved': 8
      };
      
      let remaining = 24 - (emptyCols.length * 3);
      const totalIdeal = popCols.reduce((sum, c) => sum + idealWeights[c.id], 0);
      
      let currentSum = 0;
      popCols.forEach((c, idx) => {
        if (idx === popCols.length - 1) {
          spans[c.id] = remaining - currentSum;
        } else {
          const span = Math.max(4, Math.round((idealWeights[c.id] / totalIdeal) * remaining));
          spans[c.id] = span;
          currentSum += span;
        }
      });
    }
    return spans;
  }, [filteredIncidents]);

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden bg-[#F8F8F5] min-h-screen relative pb-12 font-sans">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0" />

      <div className="relative z-10 w-full px-4 space-y-4 pt-4">

        {/* 📱 MOBILE SOS LIVE FEED — from bridge server */}
        {(bridge.mobileIncidents.length > 0 || bridge.connected) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-red-200 rounded-xl p-3 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Siren className="w-4 h-4 text-red-600 animate-pulse" />
              <span className="text-[11px] font-black text-red-700 uppercase tracking-widest">📱 Live Mobile SOS Feed</span>
              <span className={cn(
                'ml-auto text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1',
                bridge.connected ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
              )}>
                {bridge.connected ? <><Wifi className="w-2.5 h-2.5" /> LIVE</> : <><WifiOff className="w-2.5 h-2.5" /> Offline</>}
              </span>
            </div>
            {bridge.mobileIncidents.length === 0 ? (
              <div className="text-[9px] text-slate-400 text-center py-2">
                No mobile SOS yet — waiting for pilgrim alerts...
              </div>
            ) : (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {bridge.mobileIncidents.slice(0, 6).map(inc => (
                  <div
                    key={inc.id}
                    className="shrink-0 bg-red-50 border border-red-200 rounded-lg p-2.5 min-w-[200px] max-w-[240px]"
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[8px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded uppercase">{inc.severity || 'CRITICAL'}</span>
                      <span className="text-[8px] font-mono text-slate-400 ml-auto">{inc.id}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-0.5">
                      <Smartphone className="w-2.5 h-2.5 text-blue-500 shrink-0" />
                      <div className="text-[9px] font-black text-[#0E1A2B] leading-tight truncate">{inc.title}</div>
                    </div>
                    <div className="text-[8px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-2 h-2 shrink-0" /> {inc.location}
                    </div>
                    <div className="text-[8px] text-slate-400 mt-1">{inc.time} · {inc.reportedBy}</div>
                    <div className="mt-1.5 flex gap-1">
                      <button
                        onClick={() => showToast(`Dispatching response to ${inc.location}`, 'success')}
                        className="flex-1 text-[8px] font-bold bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors"
                      >
                        Dispatch
                      </button>
                      <button
                        onClick={() => showToast(`${inc.id} acknowledged`, 'info')}
                        className="flex-1 text-[8px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded transition-colors"
                      >
                        Ack
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}


        <div className="flex flex-col xl:flex-row justify-between items-stretch gap-4 bg-white border border-slate-200 p-3 xl:px-4 xl:py-2.5 rounded-xl shadow-sm">
          
          {/* LEFT: TITLE (~35%) */}
          <div className="flex items-center gap-3 w-full xl:w-[32%] shrink-0 xl:border-r border-slate-200 xl:pr-4">
            <ShieldAlert className="w-6 h-6 text-red-600 shrink-0" />
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-[14px] font-black text-[#0E1A2B] uppercase tracking-tight leading-none truncate">
                  Incident Command Center
                </h1>
                <span className="shrink-0 text-[8px] px-1.5 py-0.5 rounded bg-red-50 border border-red-200 text-red-700 font-mono font-bold tracking-widest uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE
                </span>
              </div>
              <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase leading-none mt-1.5 truncate">
                Live Incident Lifecycle • Multi-Agency Response • SOP Tracking
              </p>
            </div>
          </div>
          
          {/* CENTER: KPIs (~45%) */}
          <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
            {[
              { t: 'Open', v: filteredIncidents.filter(i=>i.status!=='Resolved').length, c: 'text-[#0E1A2B]' },
              { t: 'Critical', v: filteredIncidents.filter(i=>i.priority==='Critical').length, c: 'text-red-600' },
              { t: 'Responders', v: resources.filter(r => r.status === 'Deployed' || r.status === 'En Route').length, c: 'text-blue-600' },
              { t: 'Avg Res', v: '3m24s', c: 'text-saffron-600' },
              { t: 'SOPs', v: '7', c: 'text-emerald-600' },
              { t: 'Closed', v: incidents.filter(i=>i.status==='Resolved').length, c: 'text-slate-500' }
            ].map((m, i) => (
              <div key={i} className="flex flex-col justify-center min-w-0 flex-1">
                <div className="text-[8px] text-slate-400 uppercase font-bold tracking-widest leading-none mb-1 truncate">{m.t}</div>
                <div className={cn("text-[15px] font-black tracking-tight leading-none truncate", m.c)}>{m.v}</div>
              </div>
            ))}
          </div>

          {/* RIGHT: FILTERS */}
          <div className="flex items-center w-full xl:w-[35%] shrink-0 xl:border-l border-slate-200 xl:pl-4">
             <div className="flex gap-2 w-full">
               <input type="text" placeholder="Search incidents..." 
                 className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-[#0E1A2B] px-2 py-1.5 outline-none placeholder:text-slate-400"
                 value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
               <button onClick={() => { setDrawerMode('create'); setShowIncidentDrawer(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-[10px] font-bold tracking-widest uppercase flex items-center gap-1 transition-colors whitespace-nowrap">
                 <Plus className="w-3.5 h-3.5" /> Create
               </button>
             </div>
          </div>
        </div>

        {/* ROW 1.5: ALERTS & TELEMETRY */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
          <div className="bg-[#0E1A2B] rounded-lg p-3 shadow-sm border border-slate-800 text-white relative overflow-hidden xl:col-span-2 flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Zap className="w-24 h-24" />
            </div>
            <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-red-500" /> Command Alerts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 relative z-10">
              {alerts.slice(0, 3).map(alt => (
                <div key={alt.id} className="bg-white/10 rounded p-2 border border-white/10">
                  <div className={cn("text-[7px] font-bold uppercase tracking-widest mb-0.5", alt.severity === 'Critical' ? 'text-red-400' : 'text-amber-400')}>{alt.severity} Priority</div>
                  <div className="text-[10px] font-black leading-tight truncate">{alt.message}</div>
                </div>
              ))}
              {alerts.length === 0 && (
                <div className="text-[10px] text-slate-400">No active alerts.</div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex flex-col justify-center">
            <h2 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Live Telemetry</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                <div className="text-[9px] font-bold text-[#0E1A2B] flex items-center gap-1.5"><ShieldAlert className="w-3 h-3 text-blue-500"/> Available Units</div>
                <div className="text-[10px] font-black text-[#0E1A2B]">{resources.filter(r => r.status === 'Available').length}</div>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-1">
                <div className="text-[9px] font-bold text-[#0E1A2B] flex items-center gap-1.5"><Radio className="w-3 h-3 text-emerald-500"/> Deployed</div>
                <div className="text-[10px] font-black text-[#0E1A2B]">{resources.filter(r => r.status === 'Deployed' || r.status === 'En Route').length}</div>
              </div>
              <div className="flex justify-between items-center pb-1 border-b sm:border-0 border-slate-100">
                <div className="text-[9px] font-bold text-[#0E1A2B] flex items-center gap-1.5"><Activity className="w-3 h-3 text-saffron-500"/> Total Incidents</div>
                <div className="text-[10px] font-black text-[#0E1A2B]">{incidents.length}</div>
              </div>
              <div className="flex justify-between items-center pb-1">
                <div className="text-[9px] font-bold text-[#0E1A2B] flex items-center gap-1.5"><FileText className="w-3 h-3 text-slate-500"/> Critical</div>
                <div className="text-[10px] font-black text-red-600">{incidents.filter(i => i.severity === 'Critical').length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: MAIN WORKSPACE */}
        <div className="flex flex-col w-full items-start">
          
          {/* DYNAMIC KANBAN GRID */}
          <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-24 gap-3">
            {columns.map(col => {
              const colIncidents = filteredIncidents.filter(i => i.status === col.id);
              const span = columnSpans[col.id] || 3;
              const isEmpty = colIncidents.length === 0;
              
              return (
                <div 
                  key={col.id} 
                  className="flex flex-col gap-2 transition-all duration-300 min-w-0"
                  style={{ gridColumn: `span ${span} / span ${span}` }}
                >
                  {/* Column Header */}
                  <div className="bg-white border border-slate-200 rounded-lg p-2 shadow-sm flex justify-between items-center sticky top-0 z-10 shrink-0 h-[36px]">
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <div className={cn("w-1.5 h-1.5 rounded-full shrink-0", col.color)} />
                      <div className="text-[10px] font-black text-[#0E1A2B] uppercase tracking-widest truncate">{col.label}</div>
                    </div>
                    {!isEmpty && (
                      <div className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[9px] font-black border border-slate-200 shrink-0 ml-2">
                        {colIncidents.length}
                      </div>
                    )}
                  </div>

                  {/* Incident Cards / Empty State */}
                  {isEmpty ? (
                    <div className="h-[90px] w-full bg-white/50 border-2 border-dashed border-slate-200 rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-slate-300 mb-1" />
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{col.emptyMsg}</div>
                    </div>
                  ) : (
                    <div className={cn(
                      "grid gap-3 w-full items-start",
                      span >= 10 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
                    )}>
                      <AnimatePresence>
                        {colIncidents.map(inc => {
                          const isExpanded = expandedIncident === inc.id;
                          const isResolved = inc.status === 'Resolved';
                          
                          return (
                            <motion.div
                              layout
                              key={inc.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={cn(
                                "bg-white border-y border-r border-l-[3px] rounded-lg shadow-sm flex flex-col overflow-hidden w-full",
                                isResolved ? "border-l-emerald-500 opacity-80 hover:opacity-100" : inc.priority === 'Critical' ? "border-l-red-500 shadow-red-100" : inc.priority === 'High' ? "border-l-orange-500" : "border-l-amber-500"
                              )}
                            >
                              {/* Header: ID, Priority, Timer (Reduced Height) */}
                              <div className="px-2.5 py-1.5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <div className="flex items-center gap-1.5">
                                  <div className="text-[9px] font-black text-[#0E1A2B] bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-sm leading-none">{inc.id}</div>
                                  <div className={cn("text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border leading-none", getPriorityColor(inc.priority))}>
                                    {inc.priority}
                                  </div>
                                </div>
                                <div className={cn("text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border shadow-inner leading-none", 
                                  isResolved ? "bg-emerald-50 text-emerald-700 border-emerald-200" : 
                                  inc.priority === 'Critical' ? "bg-red-50 text-red-700 border-red-200 animate-pulse" : 
                                  "bg-[#0E1A2B] text-white border-[#0E1A2B]"
                                )}>
                                  <Timer className="w-2.5 h-2.5"/> {inc.elapsedStr}
                                </div>
                              </div>

                              {/* Core Info */}
                              <div className="p-2.5 space-y-2.5">
                                <div>
                                  <h3 className="text-[12px] font-black text-[#0E1A2B] leading-tight mb-1 truncate">{inc.title}</h3>
                                  <div className="flex flex-wrap gap-1.5 text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                                    <span className="flex items-center gap-1 text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded"><Activity className="w-2.5 h-2.5"/> {inc.type}</span>
                                    <span className="flex items-center gap-1 bg-slate-50 px-1.5 py-0.5 rounded"><MapPin className="w-2.5 h-2.5 text-saffron-500"/> {inc.location}</span>
                                  </div>
                                </div>

                                {/* Live Response Status */}
                                {inc.agencies.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5">
                                    {inc.agencies.map((a, i) => (
                                      <div key={i} className="text-[9px] font-bold text-[#0E1A2B] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-full flex items-center gap-1 leading-none shadow-sm">
                                        {a.icon} ×{a.count}
                                      </div>
                                    ))}
                                  </div>
                                )}

                                {/* SOP Progress */}
                                <div className="bg-slate-50 border border-slate-200 rounded p-2">
                                  <div className="flex justify-between items-end mb-1">
                                    <div>
                                      <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-0.5">SOP: {inc.sopName}</div>
                                      <div className="text-[9px] font-bold text-[#0E1A2B] leading-none">{inc.sopDone} / {inc.sopTotal} Steps</div>
                                    </div>
                                    <div className="text-[9px] font-black text-saffron-600 leading-none">{Math.round((inc.sopDone/inc.sopTotal)*100)}%</div>
                                  </div>
                                  <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden flex">
                                    {Array.from({length: inc.sopTotal}).map((_, i) => (
                                      <div key={i} className={cn("h-full border-r border-white/50 last:border-0", i < inc.sopDone ? "bg-saffron-500" : "bg-transparent")} style={{width: `${100/inc.sopTotal}%`}}/>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Timeline Expansion */}
                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="overflow-hidden bg-slate-50 border-t border-slate-100">
                                    <div className="p-2.5 space-y-2">
                                      <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Activity className="w-2.5 h-2.5"/> Timeline</div>
                                      {[
                                        {t: '11:25', msg: 'AI detected surge'},
                                        {t: '11:27', msg: 'Police notified'},
                                        {t: '11:29', msg: 'Barricade deployed'}
                                      ].map((tl, i) => (
                                        <div key={i} className="flex gap-1.5 items-start">
                                          <div className="text-[8px] font-bold text-slate-400 w-6 pt-0.5 leading-none">{tl.t}</div>
                                          <div className="w-1.5 h-1.5 rounded-full bg-saffron-500 mt-0.5 shrink-0"/>
                                          <div className="text-[9px] font-bold text-[#0E1A2B] leading-tight">{tl.msg}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              {/* Action Buttons (Wrapped) */}
                              <div className="px-2 py-1.5 border-t border-slate-100 bg-slate-50/50 flex flex-wrap gap-1.5 justify-between items-center">
                                <div className="flex flex-wrap gap-1.5 flex-1">
                                  <button onClick={() => { setViewIncident(inc as any); setDrawerMode('view'); setShowIncidentDrawer(true); }} className="px-1.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded text-[8px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1 transition-colors leading-none">
                                    <Crosshair className="w-2.5 h-2.5" /> Inspect
                                  </button>
                                  <button onClick={() => { setDispatchIncidentId(inc.id); setDispatchZone(inc.zone); setShowDispatchDrawer(true); }} className="px-1.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded text-[8px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1 transition-colors leading-none">
                                    <Navigation className="w-2.5 h-2.5" /> Dispatch
                                  </button>
                                  {inc.status === 'Reported' && (
                                    <button onClick={() => { actions.acknowledgeIncident(inc.id); showToast(`Assigned ${inc.id}`, 'success'); }} className="px-1.5 py-1 bg-white border border-blue-200 hover:bg-blue-50 rounded text-[8px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1 transition-colors leading-none">
                                      <CheckCircle2 className="w-2.5 h-2.5" /> Assign
                                    </button>
                                  )}
                                  {inc.status === 'Assigned' && (
                                    <button onClick={() => { actions.startIncidentProgress(inc.id); showToast(`Started ${inc.id}`, 'success'); }} className="px-1.5 py-1 bg-white border border-amber-200 hover:bg-amber-50 rounded text-[8px] font-bold text-amber-600 uppercase tracking-widest flex items-center gap-1 transition-colors leading-none">
                                      <Play className="w-2.5 h-2.5" /> Start
                                    </button>
                                  )}
                                  {inc.status === 'In Progress' && (
                                    <button onClick={() => { actions.resolveIncident(inc.id); showToast(`Resolved ${inc.id}`, 'success'); }} className="px-1.5 py-1 bg-white border border-emerald-200 hover:bg-emerald-50 rounded text-[8px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1 transition-colors leading-none">
                                      <CheckSquare className="w-2.5 h-2.5" /> Resolve
                                    </button>
                                  )}
                                  {!isResolved && inc.severity !== 'Critical' && (
                                    <button onClick={() => { actions.escalateIncident(inc.id); showToast(`Escalated ${inc.id}`, 'warning'); }} className="px-1.5 py-1 bg-white border border-red-200 hover:bg-red-50 rounded text-[8px] font-bold text-red-600 uppercase tracking-widest flex items-center gap-1 transition-colors leading-none">
                                      <AlertTriangle className="w-2.5 h-2.5" /> Escalate
                                    </button>
                                  )}
                                </div>
                                <button onClick={() => setExpandedIncident(isExpanded ? null : inc.id)} className="p-1 rounded text-slate-400 hover:text-[#0E1A2B] hover:bg-slate-100 transition-colors shrink-0">
                                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5"/> : <ChevronDown className="w-3.5 h-3.5"/>}
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <IncidentDrawer 
        isOpen={showIncidentDrawer} 
        onClose={() => { setShowIncidentDrawer(false); setViewIncident(undefined); }} 
        mode={drawerMode} 
        incident={viewIncident} 
        onDispatch={() => { setShowIncidentDrawer(false); setDispatchIncidentId(viewIncident?.id); setDispatchZone(viewIncident?.zone); setShowDispatchDrawer(true); }}
      />
      <DispatchDrawer 
        isOpen={showDispatchDrawer} 
        onClose={() => { setShowDispatchDrawer(false); setDispatchIncidentId(undefined); setDispatchZone(undefined); }} 
        defaultZone={dispatchZone} 
        incidentId={dispatchIncidentId} 
      />
    </div>
  );
}
