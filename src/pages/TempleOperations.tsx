import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, AlertTriangle, Video, Shield, MapPin, Activity, Clock, Radio, 
  CheckCircle2, ChevronRight, Map, ExternalLink, Siren
} from 'lucide-react';
import { useOperational } from '@/context/OperationalContext';
import { TEMPLE_ZONES } from '@/lib/data';
import { cn } from '@/lib/utils';
import { showToast } from '@/components/ui/Toast';
import { useNavigate } from 'react-router-dom';
import { useDemoState } from '@/hooks/useDemoState';

export default function TempleOperations() {
  const { selectedTemple, templeInfo, templeCameras, openCamera } = useOperational();
  const navigate = useNavigate();

  const zones = TEMPLE_ZONES.filter(z => z.templeId === selectedTemple);

  // Aggregate KPIs
  const totalVisitors = zones.reduce((acc, z) => acc + z.visitors, 0);
  const avgDensity = Math.round(zones.reduce((acc, z) => acc + z.density, 0) / (zones.length || 1));
  const totalCameras = templeCameras.length;
  
  const { resources } = useDemoState();
  
  const templeResources = resources.filter(r => r.templeId === selectedTemple);
  const polCount = templeResources.filter(r => r.type === 'Police').length;
  const volCount = templeResources.filter(r => r.type === 'Volunteer').length;
  const medCount = templeResources.filter(r => r.type === 'Medical').length;
  const fireCount = templeResources.filter(r => r.type === 'Fire').length;
  const sdrfCount = templeResources.filter(r => r.type === 'SDRF').length;

  const criticalAlerts = zones.filter(z => z.density > 85).length;
  const warningAlerts = zones.filter(z => z.density > 70 && z.density <= 85).length;

  return (
    <div className="space-y-6 pb-12 bg-[#F8F8F5] min-h-screen relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0" />

      <div className="relative z-10 space-y-6">
        
        {/* 1. HERO OPERATIONS HEADER */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-card-sm flex flex-col xl:flex-row xl:items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-black text-[#0E1A2B] uppercase tracking-tight flex items-center gap-3">
              {templeInfo.name} Digital Twin Operations
            </h1>
            <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-wider">
              {templeInfo.district} District • Real-time Operations Monitoring
            </p>
            
            <div className="flex gap-6 mt-6 border-t border-slate-100 pt-4">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Current Phase</div>
                <div className="text-sm font-bold text-saffron-600">Sandhya Maha Aarti</div>
              </div>
              <div className="w-px bg-slate-100"></div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Security In-charge</div>
                <div className="text-sm font-bold text-[#0E1A2B]">{templeInfo.policeIncharge}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 xl:max-w-md justify-start xl:justify-end content-start">
            <div className="px-3 py-1.5 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-bold text-green-700 uppercase tracking-wider">Temple Status — OPEN</span>
            </div>
            <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              👥 Current Pilgrims — {totalVisitors.toLocaleString()}
            </div>
            <div className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              🎥 CCTV Online — {totalCameras}/{totalCameras}
            </div>
            <div className="px-3 py-1.5 bg-red-50 border border-red-100 rounded-lg text-[11px] font-bold text-red-600 uppercase tracking-wider">
              ⚠ Active Alerts — {criticalAlerts + warningAlerts}
            </div>
            <div className="px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-[11px] font-bold text-blue-600 uppercase tracking-wider">
              📍 Operational Zones — {zones.length}
            </div>
          </div>
        </div>

        {/* 2. KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {/* Pilgrims */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Current Zone Pilgrims</div>
            <div className="text-4xl font-black text-[#0E1A2B] tracking-tighter">{totalVisitors.toLocaleString()}</div>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">▲ +4.2% vs last hour</span>
              <span className="flex items-center gap-1 text-[9px] font-bold text-green-600 uppercase tracking-wider bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100 shrink-0">
                <span className="live-dot shrink-0" />Live
              </span>
            </div>
          </motion.div>

          {/* Average Sector Density */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Average Sector Density</div>
              <div className="text-xl font-black text-slate-800 uppercase">Status: <span className={avgDensity > 80 ? 'text-red-500' : avgDensity > 60 ? 'text-amber-500' : 'text-green-500'}>{avgDensity > 80 ? 'Critical' : avgDensity > 60 ? 'Moderate' : 'Normal'}</span></div>
            </div>
            <div className="relative w-16 h-16 shrink-0">
              <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={avgDensity > 80 ? '#EF4444' : avgDensity > 60 ? '#F59E0B' : '#10B981'} strokeWidth="3" strokeDasharray={`${avgDensity}, 100`} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-black text-[#0E1A2B]">{avgDensity}%</div>
            </div>
          </motion.div>

          {/* Active SOP Alerts */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Active SOP Alerts</div>
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex justify-between items-center bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5" /> Critical</span>
                <span className="text-lg font-black text-red-700">{criticalAlerts}</span>
              </div>
              <div className="flex justify-between items-center bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-2"><AlertTriangle className="w-3.5 h-3.5" /> Warning</span>
                <span className="text-lg font-black text-amber-700">{warningAlerts}</span>
              </div>
            </div>
          </motion.div>

          {/* Active CCTV Feeds */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Active CCTV</div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-black text-[#0E1A2B] tracking-tighter">{totalCameras}/{totalCameras}</div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="flex items-center gap-1.5 text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50 px-2 py-1 rounded-md border border-green-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Online 100%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Main Grid: Zones and Protocol Panel */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Left: Zone Digital Twin Cards */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black text-[#0E1A2B] uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-saffron-500" />
                Digital Twin Zone Cards
              </h2>
              <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider">
                <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-md">{zones.length - criticalAlerts - warningAlerts} Normal</span>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-1 rounded-md">{warningAlerts} Busy</span>
                <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-1 rounded-md">{criticalAlerts} Critical</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {zones.map((zone, idx) => {
                const zoneCam = templeCameras.find(c => c.name.toLowerCase().includes(zone.name.toLowerCase())) || templeCameras[idx % templeCameras.length];
                const isCritical = zone.density > 85;
                const isBusy = zone.density > 70 && !isCritical;
                
                const borderColor = isCritical ? 'border-red-400' : isBusy ? 'border-amber-400' : 'border-green-400';
                const bgColor = isCritical ? 'bg-red-50' : isBusy ? 'bg-amber-50' : 'bg-green-50';
                const badgeColor = isCritical ? 'bg-red-500' : isBusy ? 'bg-amber-500' : 'bg-green-500';

                return (
                  <motion.div
                    key={zone.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      "bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden border-2",
                      borderColor
                    )}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4 items-center">
                          {/* Mini Map Thumbnail */}
                          <div className="w-12 h-12 bg-slate-100 rounded-lg relative overflow-hidden shrink-0 border border-slate-200">
                            <img src={templeInfo.imageUrl} className="w-full h-full object-cover opacity-60 grayscale" alt="Map" />
                            <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full animate-pulse shadow-sm", badgeColor)} />
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{zone.id}</div>
                            <div className="text-sm font-black text-[#0E1A2B] uppercase tracking-tight">{zone.name}</div>
                          </div>
                        </div>
                        <span className={cn(
                          'text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1.5 border',
                          isCritical ? 'bg-red-100 text-red-700 border-red-200' :
                          isBusy ? 'bg-amber-100 text-amber-700 border-amber-200' :
                          'bg-green-100 text-green-700 border-green-200'
                        )}>
                          <span className={cn("w-1.5 h-1.5 rounded-full", badgeColor)} />
                          {isCritical ? 'Critical' : isBusy ? 'Busy' : 'Normal'}
                        </span>
                      </div>

                      {/* Density Visualization */}
                      <div className="mb-5">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          <span>Density</span>
                          <span className="text-[#0E1A2B]">{zone.density}%</span>
                        </div>
                        <div className="flex gap-1 h-2">
                          {[...Array(20)].map((_, i) => (
                            <div key={i} className={cn(
                              "flex-1 rounded-sm", 
                              i < (zone.density / 5) ? badgeColor : 'bg-slate-100'
                            )} />
                          ))}
                        </div>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-4 gap-2 text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pilgrims</div>
                          <div className="text-sm font-black text-[#0E1A2B]">{zone.visitors.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Volunteers</div>
                          <div className="text-sm font-black text-[#0E1A2B]">{zone.volunteers}</div>
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Barricades</div>
                          <div className="text-sm font-black text-[#0E1A2B]">{zone.barricades}</div>
                        </div>
                        <div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cameras</div>
                          <div className="text-sm font-black text-[#0E1A2B]">{(idx % 5) + 3}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className={cn("p-3 border-t flex flex-col gap-2", bgColor, borderColor.replace('border-', 'border-t-'))}>
                      <button
                        onClick={() => openCamera(zoneCam)}
                        className="w-full py-2.5 bg-[#0E1A2B] hover:bg-slate-800 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest flex items-center justify-between px-4 transition-colors shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Video className="w-3.5 h-3.5 text-saffron-500" />
                          <span>🎥 Live Camera | {zoneCam.id}</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-400">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                          ONLINE
                        </div>
                      </button>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => { navigate('/'); showToast('Opening GIS Command Map', 'info'); }} className="py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors">
                          <Map className="w-3 h-3" /> Open GIS
                        </button>
                        <button onClick={() => showToast(`Zone: ${zone.name} — ${zone.visitors} visitors, ${zone.cameras} cameras`, 'info')} className="py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors">
                          <ExternalLink className="w-3 h-3" /> Zone Detail
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Aarti Protocols & Command Directives */}
          <div className="space-y-6">
            
            {/* Aarti Protocol Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-sm font-black text-[#0E1A2B] uppercase tracking-widest flex items-center gap-2 mb-6">
                <Clock className="w-4 h-4 text-saffron-500" />
                Aarti Protocol Timeline
              </h2>
              
              <div className="relative pl-4 space-y-6 before:absolute before:inset-y-2 before:left-[7px] before:w-px before:bg-slate-200">
                {templeInfo.aartis.map((aarti, idx) => {
                  const isCurrent = aarti.status === 'Current';
                  const isCompleted = aarti.status === 'Completed';
                  
                  return (
                    <div key={idx} className="relative">
                      <div className={cn(
                        "absolute -left-[23px] top-1 w-3 h-3 rounded-full border-2 bg-white",
                        isCurrent ? "border-saffron-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" : 
                        isCompleted ? "border-green-500 bg-green-500" : "border-slate-300"
                      )}>
                        {isCompleted && <CheckCircle2 className="w-3 h-3 text-white absolute -top-[1.5px] -left-[1.5px]" />}
                      </div>
                      <div className={cn("flex justify-between items-center", isCurrent ? "opacity-100" : "opacity-60")}>
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{aarti.time}</div>
                          <div className={cn("text-sm font-bold uppercase tracking-tight", isCurrent ? "text-saffron-600" : "text-[#0E1A2B]")}>{aarti.name}</div>
                        </div>
                        <span className={cn(
                          "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md",
                          isCurrent ? "bg-saffron-50 text-saffron-700 border border-saffron-200" :
                          isCompleted ? "bg-slate-100 text-slate-500" : "bg-transparent text-slate-400"
                        )}>
                          {isCurrent ? '🟠 Current' : isCompleted ? '✔ Completed' : '○ Upcoming'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Resource Summary */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Current Deployment</div>
                <div className="grid grid-cols-5 gap-2 text-center">
                  <div className="bg-blue-50 border border-blue-100 p-2 rounded-lg"><div className="text-xs font-black text-blue-700">{polCount}</div><div className="text-[8px] font-bold text-blue-600 uppercase tracking-widest mt-1">Pol</div></div>
                  <div className="bg-green-50 border border-green-100 p-2 rounded-lg"><div className="text-xs font-black text-green-700">{volCount}</div><div className="text-[8px] font-bold text-green-600 uppercase tracking-widest mt-1">Vol</div></div>
                  <div className="bg-red-50 border border-red-100 p-2 rounded-lg"><div className="text-xs font-black text-red-700">{medCount}</div><div className="text-[8px] font-bold text-red-600 uppercase tracking-widest mt-1">Med</div></div>
                  <div className="bg-orange-50 border border-orange-100 p-2 rounded-lg"><div className="text-xs font-black text-orange-700">{fireCount}</div><div className="text-[8px] font-bold text-orange-600 uppercase tracking-widest mt-1">Fire</div></div>
                  <div className="bg-slate-100 border border-slate-200 p-2 rounded-lg"><div className="text-xs font-black text-slate-700">{sdrfCount}</div><div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1">RRT</div></div>
                </div>
              </div>
            </div>

            {/* GSDMA Directive */}
            <div className="bg-white rounded-2xl border border-red-200 shadow-[0_4px_20px_-4px_rgba(220,38,38,0.1)] overflow-hidden">
              <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Siren className="w-5 h-5 text-red-600 animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-black text-red-700 uppercase tracking-tight">GSDMA Operational Directive</div>
                  <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-0.5">Emergency Command Protocol</div>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Priority</div>
                    <div className="text-xs font-black text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 inline-block mt-1">HIGH</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Issued</div>
                    <div className="text-xs font-bold text-[#0E1A2B] mt-1">12:42 AM</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Radio Channel</div>
                    <div className="text-xs font-bold text-saffron-600 mt-1 flex items-center gap-1"><Radio className="w-3 h-3" /> VHF-4</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Acknowledged</div>
                    <div className="text-xs font-bold text-green-600 mt-1">27 / 34 Officers</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Required Action</div>
                  <p className="text-xs font-semibold text-[#0E1A2B] leading-relaxed">
                    Maintain active radio communication during Sandhya Maha Aarti transition. Clear VIP corridor immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Congestion Ranking */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Most Congested Zones</h3>
              <div className="space-y-3">
                {zones.sort((a,b) => b.density - a.density).slice(0, 4).map((z, i) => (
                  <div key={z.id} className="flex items-center justify-between bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-slate-400">{i+1}</div>
                      <div className="text-xs font-bold text-[#0E1A2B] uppercase">{z.name}</div>
                    </div>
                    <div className={cn(
                      "text-xs font-black px-2 py-0.5 rounded",
                      z.density > 85 ? "text-red-700 bg-red-100" : z.density > 70 ? "text-amber-700 bg-amber-100" : "text-green-700 bg-green-100"
                    )}>{z.density}%</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
