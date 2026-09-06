import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Car, Video, Zap, UserCheck, Accessibility, AlertTriangle, Radio, CheckCircle2,
  Maximize2, Navigation, Activity, ArrowUpRight, ArrowDownRight, Clock, ShieldAlert, Cpu
} from 'lucide-react';
import { useOperational } from '@/context/OperationalContext';
import { PARKING_FACILITIES } from '@/lib/data';
import { cn } from '@/lib/utils';
import { showToast } from '@/components/ui/Toast';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Parking() {
  const { selectedTemple, templeInfo, openCamera } = useOperational();
  const [activeFacilityId, setActiveFacilityId] = useState<string | null>(null);

  const facilities = useMemo(() => {
    return (PARKING_FACILITIES[selectedTemple] || []).map(f => {
      const occPct = Math.round((f.occupiedSlots / f.totalSlots) * 100);
      let riskLevel = 0; // 0=Normal, 1=Near Full, 2=Full, 3=Overflow
      if (f.status === 'Overflow Triggered') riskLevel = 3;
      else if (occPct >= 98 || f.status === 'Full') riskLevel = 2;
      else if (occPct >= 85 || f.status === 'Near Full') riskLevel = 1;
      return { ...f, occPct, riskLevel };
    }).sort((a, b) => b.riskLevel - a.riskLevel);
  }, [selectedTemple]);

  const activeFacility = facilities.find(f => f.id === activeFacilityId) || facilities[0];

  const totalSlotsAll = facilities.reduce((sum, f) => sum + f.totalSlots, 0);
  const totalOccupiedAll = facilities.reduce((sum, f) => sum + f.occupiedSlots, 0);
  const totalAvailableAll = totalSlotsAll - totalOccupiedAll;
  const overallOccupancyPct = totalSlotsAll > 0 ? Math.round((totalOccupiedAll / totalSlotsAll) * 100) : 0;
  const totalEv = facilities.reduce((sum, f) => sum + f.evSlots, 0);
  const totalVip = facilities.reduce((sum, f) => sum + f.vipSlots, 0);

  const mockTrendData = [
    { time: '10:00', occ: 45 }, { time: '11:00', occ: 62 }, { time: '12:00', occ: 78 },
    { time: '13:00', occ: 85 }, { time: '14:00', occ: 92 }, { time: '15:00', occ: 88 },
    { time: '16:00', occ: 95 }, { time: '17:00', occ: 98 }
  ];

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden bg-[#F8F8F5] min-h-screen pb-12 font-sans relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0" />
      
      <div className="relative z-10 w-full px-4 space-y-4 pt-4">
        
        {/* TOP KPI ROW */}
        <div className="flex flex-col xl:flex-row justify-between items-stretch gap-4 bg-white border border-slate-200 p-3 xl:px-4 xl:py-2.5 rounded-xl shadow-sm">
          {/* Title */}
          <div className="flex items-center gap-3 w-full xl:w-[25%] shrink-0 xl:border-r border-slate-200 xl:pr-4">
            <Car className="w-6 h-6 text-primary shrink-0" />
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-[14px] font-black text-[#0E1A2B] uppercase tracking-tight leading-none truncate">
                  Parking Operations
                </h1>
              </div>
              <p className="text-[9px] text-slate-500 font-bold tracking-widest uppercase leading-none mt-1.5 truncate">
                ANPR matrix • Live Flow • AI Routing
              </p>
            </div>
          </div>
          
          {/* KPIs */}
          <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
            {[
              { t: 'Capacity', v: totalSlotsAll, c: 'text-[#0E1A2B]' },
              { t: 'Occupied', v: totalOccupiedAll, c: 'text-red-600' },
              { t: 'Available', v: totalAvailableAll, c: 'text-emerald-600' },
              { t: 'Sector Util', v: `${overallOccupancyPct}%`, c: overallOccupancyPct > 90 ? 'text-red-600' : 'text-[#0E1A2B]' },
              { t: 'EV Slots', v: totalEv, c: 'text-cyan-600' },
              { t: 'VIP Reserved', v: totalVip, c: 'text-purple-600' },
              { t: 'Avg Walk', v: '320m', c: 'text-slate-600' },
              { t: 'Live Cams', v: '24', c: 'text-blue-600' },
            ].map((m, i) => (
              <div key={i} className="flex flex-col justify-center min-w-0 flex-1">
                <div className="text-[8px] text-slate-400 uppercase font-bold tracking-widest leading-none mb-1 truncate">{m.t}</div>
                <div className={cn("text-[15px] font-black tracking-tight leading-none truncate", m.c)}>{m.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN LAYOUT: 28% / 1fr / 260px */}
        <div className="grid grid-cols-1 xl:grid-cols-[28%_1fr_260px] gap-4 items-start w-full">
          
          {/* LEFT: Parking Facilities (30%) */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="flex items-center gap-2 px-1">
              <ShieldAlert className="w-4 h-4 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Facilities</span>
            </div>
            
            <div className="space-y-3">
              {facilities.map((fac) => {
                const isSelected = activeFacility?.id === fac.id;
                
                const getRiskStyles = (level: number) => {
                  if (level === 3) return { bg: 'bg-red-50', border: 'border-l-red-500 border-red-200', text: 'text-red-600', bar: 'bg-red-500' };
                  if (level === 2) return { bg: 'bg-orange-50', border: 'border-l-orange-500 border-orange-200', text: 'text-orange-600', bar: 'bg-orange-500' };
                  if (level === 1) return { bg: 'bg-amber-50', border: 'border-l-amber-500 border-amber-200', text: 'text-amber-600', bar: 'bg-amber-500' };
                  return { bg: 'bg-white', border: 'border-l-emerald-500 border-slate-200', text: 'text-emerald-600', bar: 'bg-emerald-500' };
                };
                const styles = getRiskStyles(fac.riskLevel);

                return (
                  <button
                    key={fac.id}
                    onClick={() => setActiveFacilityId(fac.id)}
                    className={cn(
                      'w-full text-left p-3 rounded-xl border-y border-r border-l-[4px] transition-all relative flex flex-col gap-2',
                      isSelected ? 'shadow-md ring-1 ring-primary/20' : 'shadow-sm hover:shadow-md',
                      styles.bg, styles.border
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[12px] font-black text-[#0E1A2B] leading-none mb-1">{fac.name}</div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{fac.category}</div>
                      </div>
                      <div className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest border", 
                        fac.riskLevel >= 2 ? 'bg-red-100 border-red-200 text-red-700' : 
                        fac.riskLevel === 1 ? 'bg-amber-100 border-amber-200 text-amber-700' : 'bg-emerald-100 border-emerald-200 text-emerald-700'
                      )}>
                        {fac.status}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-bold mb-1">
                        <span className="text-[#0E1A2B]">{fac.totalSlots - fac.occupiedSlots} Avail</span>
                        <span className={styles.text}>{fac.occPct}%</span>
                      </div>
                      <div className="w-full bg-slate-200/50 rounded-full h-1.5 overflow-hidden">
                        <div className={cn("h-full transition-all", styles.bar)} style={{ width: `${Math.min(fac.occPct, 100)}%` }} />
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-200/50 pt-2 mt-1">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                        <Navigation className="w-3 h-3" /> {fac.distanceToSanctum}
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500">
                        <Clock className="w-3 h-3" /> Shuttle: 4m
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CENTER: Parking Command Panel (70% flex) */}
          {activeFacility && (
            <div className="flex flex-col gap-4 min-w-0">
              
              {/* Selected Lot Header */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-[16px] font-black text-[#0E1A2B] tracking-tight">{activeFacility.name}</h2>
                    <span className="text-[9px] px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-widest">
                      ID: {activeFacility.id}
                    </span>
                  </div>
                  <div className="flex gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Navigation className="w-3 h-3 text-primary"/> {activeFacility.distanceToSanctum}</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-primary"/> {activeFacility.occPct}% Occupied</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={() => showToast(`PA System active — broadcasting to ${activeFacility.name}`, 'success')} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#0E1A2B] text-[10px] font-bold uppercase tracking-widest rounded transition-colors flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-primary" /> PA System
                  </button>
                  <button 
                    onClick={() => openCamera(activeFacility.assignedCameraId)}
                    className="px-3 py-1.5 bg-[#0E1A2B] hover:bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest rounded transition-colors flex items-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5 text-emerald-400" /> Live Feed
                  </button>
                </div>
              </div>

              {/* Parking Matrix */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Bay Matrix</h3>
                  <div className="flex gap-3 text-[9px] font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1 text-emerald-600"><span className="w-2 h-2 bg-emerald-500 rounded-sm"/> Avail</span>
                    <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 bg-slate-300 rounded-sm"/> Occ</span>
                    <span className="flex items-center gap-1 text-cyan-600"><span className="w-2 h-2 bg-cyan-400 rounded-sm"/> EV</span>
                    <span className="flex items-center gap-1 text-purple-600"><span className="w-2 h-2 bg-purple-400 rounded-sm"/> VIP</span>
                    <span className="flex items-center gap-1 text-red-600"><span className="w-2 h-2 bg-red-500 rounded-sm animate-pulse"/> Emg</span>
                  </div>
                </div>

                <div className="grid grid-cols-12 sm:grid-cols-16 md:grid-cols-20 xl:grid-cols-24 gap-1 p-2 bg-slate-50 border border-slate-100 rounded-lg">
                  {activeFacility.slots.map((slot) => {
                    let bg = 'bg-slate-200 border-slate-300 text-slate-400';
                    let icon = null;
                    
                    if (slot.status === 'available') bg = 'bg-emerald-50 border-emerald-400 text-emerald-600';
                    else if (slot.type === 'ev') bg = 'bg-cyan-100 border-cyan-400 text-cyan-600';
                    else if (slot.type === 'vip') bg = 'bg-purple-100 border-purple-400 text-purple-600';
                    else if (slot.type === 'disabled') bg = 'bg-blue-100 border-blue-400 text-blue-600';
                    else bg = 'bg-slate-300 border-slate-400 text-slate-500'; // Standard occupied
                    
                    // Simulate emergency/police for visual density
                    if (slot.slotId.endsWith('07') && slot.status === 'occupied') {
                      bg = 'bg-red-100 border-red-500 text-red-600 animate-pulse';
                    }

                    return (
                      <div key={slot.slotId} className={cn(
                        "aspect-square border rounded-[3px] flex items-center justify-center relative group cursor-crosshair transition-colors",
                        bg
                      )}>
                        {/* Compact icon or nothing to save space */}
                        {slot.type === 'ev' && <Zap className="w-2.5 h-2.5 opacity-80" />}
                        {slot.type === 'vip' && <UserCheck className="w-2.5 h-2.5 opacity-80" />}
                        {slot.type === 'disabled' && <Accessibility className="w-2.5 h-2.5 opacity-80" />}
                        {bg.includes('red-600') && <AlertTriangle className="w-2.5 h-2.5 opacity-80" />}
                        
                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-[#0E1A2B] text-white text-[9px] p-2 rounded shadow-xl z-50 whitespace-nowrap min-w-[120px]">
                          <div className="font-bold text-primary mb-1 border-b border-slate-700 pb-1">{slot.slotId}</div>
                          <div className="flex justify-between"><span className="text-slate-400">Status:</span> <span className="font-bold">{slot.status.toUpperCase()}</span></div>
                          <div className="flex justify-between"><span className="text-slate-400">Type:</span> <span className="font-bold">{slot.type.toUpperCase()}</span></div>
                          {slot.vehiclePlate && <div className="flex justify-between mt-1"><span className="text-slate-400">Plate:</span> <span className="font-mono text-emerald-400 font-bold">{slot.vehiclePlate}</span></div>}
                          {slot.occupiedDurationMin && <div className="flex justify-between"><span className="text-slate-400">Duration:</span> <span className="font-bold">{slot.occupiedDurationMin}m</span></div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Intelligence Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Occupancy Trend */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-primary" /> Occupancy Trend
                  </h3>
                  <div className="flex-1 min-h-[120px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockTrendData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                        <Tooltip contentStyle={{ borderRadius: '4px', fontSize: '10px', padding: '4px 8px' }} />
                        <Area type="monotone" dataKey="occ" stroke="#3B82F6" strokeWidth={2} fill="url(#occGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* 2. Vehicle Flow */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" /> Vehicle Flow (1hr)
                  </h3>
                  <div className="grid grid-cols-2 gap-3 h-full pb-2">
                    <div className="bg-slate-50 border border-slate-100 p-2 rounded">
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Entries</div>
                      <div className="text-[14px] font-black text-emerald-600 flex items-center gap-1">142 <ArrowUpRight className="w-3 h-3"/></div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-2 rounded">
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Exits</div>
                      <div className="text-[14px] font-black text-slate-600 flex items-center gap-1">89 <ArrowDownRight className="w-3 h-3"/></div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-2 rounded">
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Avg Stay</div>
                      <div className="text-[14px] font-black text-[#0E1A2B]">3h 45m</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-2 rounded">
                      <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Peak Hour</div>
                      <div className="text-[14px] font-black text-[#0E1A2B]">17:00</div>
                    </div>
                  </div>
                </div>

                {/* 3. AI Recommendations */}
                <div className="bg-[#0E1A2B] rounded-xl p-4 shadow-sm border border-slate-800 text-white flex flex-col">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-primary" /> AI Actions
                  </h3>
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div className="bg-white/10 p-2.5 rounded border border-white/10">
                      <div className="text-[10px] font-bold text-white leading-tight mb-1">Open Overflow Lot B</div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">-18% Congestion</span>
                        <button onClick={() => showToast('Overflow Lot B opened — congestion reduced', 'success')} className="bg-primary hover:bg-primary/90 text-white text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest transition-colors">Approve</button>
                      </div>
                    </div>
                    <div className="bg-white/10 p-2.5 rounded border border-white/10">
                      <div className="text-[10px] font-bold text-white leading-tight mb-1">Activate Shuttle Route</div>
                      <div className="flex justify-between items-center">
                        <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">-22% Walk Dist</span>
                        <button onClick={() => showToast('Shuttle route activated — walk distance reduced', 'success')} className="bg-white/20 hover:bg-white/30 text-white text-[8px] font-bold px-2 py-1 rounded uppercase tracking-widest transition-colors">Approve</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT: Sticky Sidebar (260px) */}
          <div className="shrink-0 w-full xl:w-[260px]">
            <div className="sticky top-4 space-y-4">
              
              {/* Parking Alerts */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-500" /> Parking Alerts
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 border-b border-slate-100 pb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] font-black text-[#0E1A2B] leading-tight">Lot A Full</div>
                      <div className="text-[9px] font-medium text-slate-500 mt-0.5">Diverting traffic to Lot B</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-b border-slate-100 pb-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] font-black text-[#0E1A2B] leading-tight">Lot B 94%</div>
                      <div className="text-[9px] font-medium text-slate-500 mt-0.5">Approaching capacity limit</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 border-b border-slate-100 pb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] font-black text-[#0E1A2B] leading-tight">EV Queue Increasing</div>
                      <div className="text-[9px] font-medium text-slate-500 mt-0.5">Avg wait time 14 mins</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] font-black text-[#0E1A2B] leading-tight">Shuttle Normal</div>
                      <div className="text-[9px] font-medium text-slate-500 mt-0.5">3 vehicles active</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Camera Status */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-blue-500" /> Live Cameras
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-[#0E1A2B]">CAM-08</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                  </div>
                  <div className="bg-slate-50 border border-red-200 rounded px-2 py-1.5 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-[#0E1A2B]">CAM-12</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"/>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-[#0E1A2B]">CAM-14</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 flex justify-between items-center">
                    <span className="text-[9px] font-bold text-[#0E1A2B]">CAM-15</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                  </div>
                </div>
              </div>

              {/* Emergency Vehicles */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Emergency Vehicles
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-[10px] font-bold text-[#0E1A2B]">Police</span>
                    <span className="text-[12px] font-black text-blue-600">2</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-[10px] font-bold text-[#0E1A2B]">Ambulance</span>
                    <span className="text-[12px] font-black text-red-600">1</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-[10px] font-bold text-[#0E1A2B]">Fire</span>
                    <span className="text-[12px] font-black text-slate-400">0</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
