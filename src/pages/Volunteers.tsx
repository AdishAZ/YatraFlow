import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartHandshake, UserCheck, Coffee, UserX, MapPin, Clock, Radio, Battery, 
  BatteryMedium, BatteryLow, Shield, Activity, Zap, Search, Filter, 
  Map, PhoneCall, ArrowRightLeft, Crosshair, AlertTriangle, CheckCircle2, ChevronRight, Video
} from 'lucide-react';
import { VOLUNTEERS, TEMPLES, type TempleId } from '@/lib/data';
import { cn } from '@/lib/utils';
import { showToast } from '@/components/ui/Toast';
import { DispatchDrawer } from '@/components/ui/DispatchDrawer';
import { useDemoState } from '@/hooks/useDemoState';

type ResourceCategoryFilter = 'All' | 'Police' | 'Medical' | 'Fire' | 'SDRF' | 'Volunteer' | 'Temple';

const TICK_INTERVAL = 3000;

// Utility for stable random numbers based on a seed string
const seededRandom = (seed: string, min: number, max: number) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = Math.imul(31, hash) + seed.charCodeAt(i) | 0;
  }
  const random = Math.abs(Math.sin(hash)) * 10000;
  return min + Math.floor((random - Math.floor(random)) * (max - min + 1));
};

export default function Volunteers() {
  const [selectedTemple, setSelectedTemple] = useState<TempleId | 'all'>('all');
  const [activeCategory, setActiveCategory] = useState<ResourceCategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tick, setTick] = useState(0);
  const [showDispatch, setShowDispatch] = useState(false);
  const [dispatchZone, setDispatchZone] = useState('');
  const [dismissedRecs, setDismissedRecs] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), TICK_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const { resources: demoResources } = useDemoState();

  const resources = useMemo(() => {
    return demoResources.map(r => {
      return {
        id: r.id,
        name: `Officer ${seededRandom(r.id+'ldr', 100, 999)}`,
        role: r.type,
        teamName: r.label,
        members: seededRandom(r.id+'mem', 4, 18),
        status: r.status,
        battery: seededRandom(r.id+'bat', 20, 100),
        radio: seededRandom(r.id + 'rad', 1, 100) > 5 ? 'Connected' : 'Offline',
        gps: seededRandom(r.id + 'gps', 1, 100) > 2 ? 'Locked' : 'Searching',
        camera: seededRandom(r.id + 'cam', 1, 100) > 10 ? 'Online' : 'Offline',
        missionProgress: seededRandom(r.id + 'prog', 10, 95),
        eta: seededRandom(r.id + 'eta', 1, 15),
        zone: r.zone,
        templeId: r.templeId,
        assignment: r.status === 'Deployed' || r.status === 'En Route' ? 'Active Incident Response' : 'General Patrol'
      };
    });
  }, [demoResources]);

  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const matchesTemple = selectedTemple === 'all' || r.templeId === selectedTemple;
      const matchesCategory = activeCategory === 'All' || r.role === activeCategory;
      const matchesSearch = r.teamName.toLowerCase().includes(searchQuery.toLowerCase()) || r.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTemple && matchesCategory && matchesSearch;
    });
  }, [resources, selectedTemple, activeCategory, searchQuery]);

  return (
    <div className="space-y-6 pb-12 bg-[#F8F8F5] min-h-screen relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0" />

      <div className="relative z-10 space-y-6">
        
        {/* 1. Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-slate-200 p-5 rounded-xl shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-[#0E1A2B] flex items-center gap-2 uppercase tracking-tight">
                <Shield className="w-5 h-5 text-saffron-500" />
                Tactical Resource Command
              </h1>
              <span className="text-[10px] px-2 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700 font-mono font-bold tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-bold tracking-wider uppercase">
              Real-Time Personnel Deployment & Coordination
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg p-2 flex-wrap">
            <div className="text-[10px] font-bold text-[#0E1A2B] uppercase tracking-widest px-2 border-r border-slate-200">
              <span className="text-slate-500">Total</span> 482
            </div>
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest px-2 border-r border-slate-200">
              <span className="text-slate-500">Active</span> 386
            </div>
            <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest px-2 border-r border-slate-200">
              <span className="text-slate-500">Break</span> 64
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 border-r border-slate-200">
              <span className="text-slate-500">Off</span> 32
            </div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2">
              <span className="text-slate-500">Radio</span> 98%
            </div>
          </div>
        </div>

        {/* 2. SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { title: 'Active Personnel', val: '386', sub: '▲ +12 since last hour', color: 'text-emerald-600', live: true },
            { title: 'Total Deployed', val: '482', sub: 'Sector A, B, C', color: 'text-[#0E1A2B]' },
            { title: 'On Break', val: '64', sub: '▼ -4 returning soon', color: 'text-amber-500' },
            { title: 'Off Duty', val: '32', sub: 'Shift ended', color: 'text-slate-400' },
            { title: 'Avg Battery', val: '86%', sub: 'Healthy', color: 'text-green-500' },
            { title: 'Radio Link', val: '98%', sub: '2 offline nodes', color: 'text-blue-500' },
            { title: 'Emergency', val: '4 Teams', sub: 'Standby at HQ', color: 'text-red-500', alert: true },
          ].map((kpi, i) => (
            <div key={i} className={cn("bg-white border border-slate-200 p-3 rounded-xl shadow-sm flex flex-col justify-between h-[90px]", kpi.alert && "border-red-200 bg-red-50/30")}>
              <div className="flex justify-between items-start">
                <div className="text-[9px] text-slate-500 uppercase font-bold tracking-widest leading-tight">{kpi.title}</div>
                {kpi.live && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
              </div>
              <div>
                <div className={cn("text-[20px] font-black tracking-tight", kpi.color)}>{kpi.val}</div>
                <div className={cn("text-[8px] font-bold uppercase tracking-widest mt-0.5", kpi.alert ? "text-red-500" : "text-slate-400")}>{kpi.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Layout Split */}
        <div className="flex flex-col xl:flex-row gap-6">
          
          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            
            {/* Filters */}
            <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 px-4 py-3 rounded-xl flex-wrap shadow-sm">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-2 flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-saffron-500" /> Role:
                </span>
                {['All', 'Police', 'Medical', 'Fire', 'SDRF', 'Volunteer'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as ResourceCategoryFilter)}
                    className={cn(
                      'px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all border',
                      activeCategory === cat
                        ? 'bg-[#0E1A2B] border-[#0E1A2B] text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Search Team or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-[11px] rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-saffron-500 w-48 font-mono"
              />
            </div>

            {/* Tactical Resource Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {filteredResources.map((res, index) => {
                  
                  // Status Colors
                  const statusColors: Record<string, string> = {
                    'Patrolling': 'text-blue-700 bg-blue-50 border-blue-200',
                    'Crowd Control': 'text-orange-700 bg-orange-50 border-orange-200',
                    'Escort': 'text-purple-700 bg-purple-50 border-purple-200',
                    'Medical Support': 'text-emerald-700 bg-emerald-50 border-emerald-200',
                    'Emergency': 'text-red-700 bg-red-50 border-red-200 animate-pulse',
                    'Off Duty': 'text-slate-500 bg-slate-100 border-slate-200'
                  };

                  const roleColors: Record<string, string> = {
                    'Police': 'bg-blue-600',
                    'Medical': 'bg-red-500',
                    'SDRF': 'bg-orange-600',
                    'Fire': 'bg-red-600',
                    'Volunteer': 'bg-emerald-600'
                  };

                  const isAbnormal = res.battery < 30 || res.radio === 'Offline' || res.gps === 'Searching' || res.status === 'Offline';

                  return (
                    <motion.div
                      key={res.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className={cn(
                        'bg-white border-y border-r border-l-[4px] rounded-xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow overflow-hidden',
                        isAbnormal ? 'border-l-red-500 shadow-red-100' : 'border-l-slate-300 border-y-slate-200 border-r-slate-200'
                      )}
                    >
                      {/* Top Bar: Role & Status */}
                      <div className="px-4 py-3 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                        <div className="flex gap-3 items-center">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm", roleColors[res.role] || 'bg-slate-600')}>
                            {res.role === 'Police' ? <Shield className="w-4 h-4"/> : res.role === 'Medical' ? <Activity className="w-4 h-4"/> : <UserCheck className="w-4 h-4"/>}
                          </div>
                          <div>
                            <div className="text-[14px] font-black text-[#0E1A2B] uppercase tracking-tight">{res.teamName}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{res.role} Unit · {res.members} Members</div>
                          </div>
                        </div>
                        <div className={cn('text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-widest border', statusColors[res.status] || statusColors['Off Duty'])}>
                          {res.status}
                        </div>
                      </div>

                      <div className="p-4 space-y-4">
                        {/* Team Leader & Live Location */}
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Team Leader</div>
                            <div className="text-[12px] font-bold text-[#0E1A2B] flex items-center gap-1.5">
                              {res.name} <span className="text-[9px] font-mono text-slate-400 bg-slate-100 px-1 rounded">{res.id}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 flex items-center justify-end gap-1">
                              <MapPin className="w-3 h-3 text-saffron-500" /> Current Zone
                            </div>
                            <div className="text-[12px] font-black text-[#0E1A2B]">{res.zone}</div>
                            <div className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">ETA: {res.eta} Min</div>
                          </div>
                        </div>

                        {/* Equipment Status Pills */}
                        <div className="flex gap-2 flex-wrap">
                          <div className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border flex items-center gap-1", res.battery < 30 ? "bg-red-50 text-red-600 border-red-200" : "bg-slate-50 text-slate-600 border-slate-200")}>
                            {res.battery < 30 ? <BatteryLow className="w-3 h-3"/> : <Battery className="w-3 h-3"/>} {res.battery}%
                          </div>
                          <div className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border flex items-center gap-1", res.radio === 'Connected' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-600 border-red-200")}>
                            <Radio className="w-3 h-3"/> {res.radio}
                          </div>
                          <div className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border flex items-center gap-1", res.gps === 'Locked' ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-600 border-amber-200")}>
                            <Crosshair className="w-3 h-3"/> GPS {res.gps}
                          </div>
                          <div className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded border bg-slate-50 text-slate-600 border-slate-200 flex items-center gap-1">
                            <Video className="w-3 h-3"/> Body Cam {res.camera}
                          </div>
                        </div>

                        {/* Mission Progress */}
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                          <div className="flex justify-between items-end mb-2">
                            <div>
                              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Current Mission</div>
                              <div className="text-[11px] font-bold text-[#0E1A2B]">{res.assignment}</div>
                            </div>
                            <div className="text-[12px] font-black text-saffron-600">{res.missionProgress}%</div>
                          </div>
                          {/* CSS Progress Bar */}
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-saffron-500 transition-all duration-1000" style={{ width: `${res.missionProgress}%` }} />
                          </div>
                          <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2 flex justify-between">
                            <span>Obj: Maintain Flow</span>
                            <span>Est. Comp: {100 - res.missionProgress} min</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions Footer */}
                      <div className="px-3 py-2 border-t border-slate-100 bg-slate-50/50 flex gap-2">
                        <button onClick={() => showToast(`${res.teamName} located — ${res.zone}`, 'info')} className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded text-[9px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors">
                          <MapPin className="w-3 h-3" /> Locate
                        </button>
                        <button onClick={() => showToast(`Calling ${res.name}...`, 'info')} className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded text-[9px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors">
                          <PhoneCall className="w-3 h-3" /> Call
                        </button>
                        <button onClick={() => showToast(`Radio channel open — ${res.teamName}`, 'success')} className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded text-[9px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors">
                          <Radio className="w-3 h-3" /> Radio
                        </button>
                        <button onClick={() => { setDispatchZone(res.zone); setShowDispatch(true); }} className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded text-[9px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors">
                          <ArrowRightLeft className="w-3 h-3" /> Reassign
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side: AI Recommendations & Activity Feed */}
          <div className="w-full xl:w-96 space-y-6">
            
            {/* AI Deployment Recommendations */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-[11px] font-black text-[#0E1A2B] uppercase tracking-widest flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-saffron-500" /> AI Deployment Assistant
              </h2>
              <div className="space-y-3">
                {[
                  { text: 'Deploy 6 volunteers to Digvijay Dwar', conf: '96%', imp: 'Queue -18%', color: 'blue' },
                  { text: 'Reassign Medical Team to VIP Corridor', conf: '91%', imp: 'Response Time -2m', color: 'red' },
                  { text: 'Deploy SDRF standby at Gomti Ghat', conf: '88%', imp: 'Safety Margin +40%', color: 'orange' },
                ].filter((_, i) => !dismissedRecs.includes(i)).map((rec, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="text-[11px] font-bold text-[#0E1A2B] leading-tight mb-2">{rec.text}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        Conf: {rec.conf}
                      </div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                        Impact: {rec.imp}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { showToast(`Approved: ${rec.text}`, 'success'); setDismissedRecs(prev => [...prev, i]); }} className="flex-1 py-1.5 bg-[#0E1A2B] hover:bg-slate-800 text-white rounded text-[9px] font-bold uppercase tracking-widest transition-colors">
                        Approve
                      </button>
                      <button onClick={() => { showToast('Recommendation rejected', 'warning'); setDismissedRecs(prev => [...prev, i]); }} className="flex-1 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded text-[9px] font-bold uppercase tracking-widest transition-colors">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Activity Feed */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-[400px] flex flex-col">
              <h2 className="text-[11px] font-black text-[#0E1A2B] uppercase tracking-widest flex items-center gap-2 mb-4 shrink-0">
                <Activity className="w-4 h-4 text-blue-500" /> Operational Feed
              </h2>
              <div className="flex-1 overflow-y-auto pr-2 relative custom-scrollbar">
                <div className="absolute top-2 bottom-2 left-2.5 w-[2px] bg-slate-100 z-0"></div>
                <div className="space-y-4 relative z-10">
                  {[
                    { time: '12:42', text: 'Volunteer Squad 3 reassigned to Sector B', color: 'bg-emerald-500' },
                    { time: '12:38', text: 'Medical Team Alpha dispatched to Gate 1', color: 'bg-red-500' },
                    { time: '12:34', text: 'Police Unit 7 radio reconnected', color: 'bg-blue-500' },
                    { time: '12:31', text: 'SDRF reinforcements arrived at Riverfront', color: 'bg-orange-500' },
                    { time: '12:26', text: 'Queue stabilized at Main Entry', color: 'bg-slate-400' },
                  ].map((evt, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5", evt.color, "bg-opacity-20 border border-opacity-30", evt.color.replace('bg-', 'border-'))}>
                        <div className={cn("w-2 h-2 rounded-full", evt.color)} />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{evt.time}</div>
                        <div className="text-[11px] font-bold text-[#0E1A2B] leading-tight mt-0.5">{evt.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <DispatchDrawer isOpen={showDispatch} onClose={() => setShowDispatch(false)} defaultZone={dispatchZone} />
    </div>
  );
}
