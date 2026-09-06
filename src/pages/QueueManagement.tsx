import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ListOrdered, Users, Clock, AlertTriangle, Zap, Activity,
  Filter, TrendingUp, TrendingDown, Minus, ArrowUpRight,
  Check, Map, ExternalLink
} from 'lucide-react';
import { useOperational } from '@/context/OperationalContext';
import { UNIFIED_QUEUES } from '@/lib/data';
import { cn } from '@/lib/utils';
import { showToast } from '@/components/ui/Toast';
import { useNavigate } from 'react-router-dom';

type QueueCategoryFilter = 'All' | 'VIP' | 'General' | 'Aarti' | 'Senior Citizens' | 'Differently Abled' | 'Emergency';

const TICK_INTERVAL = 3000;

export default function QueueManagement() {
  const { selectedTemple, templeInfo, openCamera } = useOperational();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<QueueCategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [tick, setTick] = useState(0);
  const [dismissedAiRec, setDismissedAiRec] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), TICK_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const queues = useMemo(() => UNIFIED_QUEUES[selectedTemple] || [], [selectedTemple]);

  const filteredQueues = useMemo(() => {
    return queues.filter((q) => {
      const matchesCategory = activeCategory === 'All' || q.category === activeCategory;
      const matchesSearch = q.name.toLowerCase().includes(searchQuery.toLowerCase()) || q.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [queues, activeCategory, searchQuery]);

  const totalInQueue = queues.reduce((sum, q) => sum + q.currentPilgrims, 0);
  const avgWaitTime = queues.length > 0 ? Math.round(queues.reduce((sum, q) => sum + q.waitingTimeMin, 0) / queues.length) : 0;
  const criticalGatesCount = queues.filter(q => q.risk === 'Critical' || q.risk === 'High').length;
  const totalDischargeRate = queues.reduce((sum, q) => sum + q.dischargeRatePerMin, 0);

  const categories: QueueCategoryFilter[] = [
    'All', 'General', 'VIP', 'Aarti', 'Senior Citizens', 'Differently Abled', 'Emergency',
  ];

  const renderSparkline = (trend: 'up' | 'down' | 'stable') => (
    <svg className="w-12 h-4 transition-all duration-1000" viewBox="0 0 48 16" fill="none">
      {trend === 'up' && <path d="M2 14 L12 10 L22 12 L36 4 L46 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
      {trend === 'down' && <path d="M2 2 L12 6 L22 4 L36 12 L46 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
      {trend === 'stable' && <path d="M2 8 L12 7 L22 9 L36 8 L46 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
    </svg>
  );

  return (
    <div className="space-y-6 pb-12 bg-[#F8F8F5] min-h-screen relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0" />

      <div className="relative z-10 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-slate-200 p-5 rounded-xl shadow-card-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-[#0E1A2B] flex items-center gap-2 uppercase tracking-tight">
                <ListOrdered className="w-5 h-5 text-saffron-500" />
                {templeInfo.name} Unified Queue Command
              </h1>
              <span className="text-[10px] px-2 py-1 rounded bg-green-50 border border-green-200 text-green-700 font-mono font-bold tracking-widest uppercase">
                {queues.length} Active Gates
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-bold tracking-wider uppercase">
              Live Choke Monitoring · AI Traffic Prediction · Dynamic SOPs
            </p>
          </div>
        </div>

        {/* TOP KPI SECTION - Operational Widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Queued', value: totalInQueue.toLocaleString(), icon: Users, trend: 'up', val: '+6%', color: 'text-saffron-500' },
            { title: 'Avg Wait Time', value: `${avgWaitTime} min`, icon: Clock, trend: 'stable', val: '0%', color: 'text-emerald-500' },
            { title: 'Throughput', value: `${totalDischargeRate} p/m`, icon: Zap, trend: 'up', val: '+12%', color: 'text-blue-500' },
            { title: 'Overflow Gates', value: criticalGatesCount, icon: AlertTriangle, trend: 'down', val: '-1', color: 'text-red-500' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between h-[110px]">
              <div className="flex justify-between items-start">
                <div className="text-[11px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <kpi.icon className={cn("w-3.5 h-3.5", kpi.color)} /> {kpi.title}
                </div>
                <div className="text-[9px] font-bold text-emerald-600 uppercase flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> LIVE
                </div>
              </div>
              <div className="flex items-end justify-between mt-auto">
                <div className="text-[28px] font-black text-[#0E1A2B] tracking-tighter transition-all duration-500">{kpi.value}</div>
                <div className="flex flex-col items-end gap-1.5">
                  <div className={cn(
                    "flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded border",
                    kpi.trend === 'up' && kpi.title === 'Overflow Gates' ? "text-red-700 bg-red-50 border-red-200" :
                    kpi.trend === 'down' && kpi.title === 'Overflow Gates' ? "text-emerald-700 bg-emerald-50 border-emerald-200" :
                    kpi.trend === 'up' ? "text-emerald-700 bg-emerald-50 border-emerald-200" :
                    kpi.trend === 'down' ? "text-red-700 bg-red-50 border-red-200" : "text-slate-600 bg-slate-50 border-slate-200"
                  )}>
                    {kpi.trend === 'up' ? <TrendingUp className="w-2.5 h-2.5"/> : kpi.trend === 'down' ? <TrendingDown className="w-2.5 h-2.5"/> : <Minus className="w-2.5 h-2.5"/>}
                    {kpi.val}
                  </div>
                  <div className={cn("hidden lg:block", kpi.trend === 'up' && kpi.title === 'Overflow Gates' ? 'text-red-500' : kpi.trend === 'down' && kpi.title === 'Overflow Gates' ? 'text-emerald-500' : kpi.trend === 'up' ? 'text-emerald-500' : kpi.trend === 'down' ? 'text-red-500' : 'text-slate-500')}>
                    {renderSparkline(kpi.trend as any)}
                  </div>
                </div>
              </div>
              <div className="text-[9px] text-slate-400 uppercase font-mono mt-2 text-right tracking-widest transition-all">
                Updated {tick % 3 + 1} sec ago
              </div>
            </div>
          ))}
        </div>

        {/* Unified Category Filter Pills */}
        <div className="flex items-center justify-between gap-4 bg-white border border-slate-200 px-4 py-3 rounded-xl flex-wrap shadow-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-saffron-500" /> Filter:
            </span>
            {categories.map((cat) => {
              const count = cat === 'All' ? queues.length : queues.filter(q => q.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 border',
                    activeCategory === cat
                      ? 'bg-saffron-50 border-saffron-300 text-saffron-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  )}
                >
                  <span>{cat}</span>
                  <span className={cn('font-mono text-[10px]', activeCategory === cat ? 'text-saffron-600' : 'text-slate-400')}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
          <input
            type="text"
            placeholder="Filter gate name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-3 py-2 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500 w-56 font-mono"
          />
        </div>

        {/* Queue Gate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredQueues.map((gate, index) => {
              const occupancyPct = Math.round((gate.currentPilgrims / gate.maxCapacity) * 100);
              const isCritical = gate.risk === 'Critical';
              const isHigh = gate.risk === 'High';
              const isMedium = gate.risk === 'Medium';
              
              // Left border accents (Light Theme)
              const leftBorder = isCritical ? 'border-l-red-500 shadow-[-4px_0_15px_-5px_rgba(220,38,38,0.2)]' : 
                                 isHigh ? 'border-l-orange-500' : 
                                 isMedium ? 'border-l-amber-500' : 
                                 'border-l-green-500';
                                 
              const riskColorClass = isCritical ? 'text-red-700 bg-red-50 border border-red-200' : 
                                     isHigh ? 'text-orange-700 bg-orange-50 border border-orange-200' : 
                                     isMedium ? 'text-amber-700 bg-amber-50 border border-amber-200' : 
                                     'text-emerald-700 bg-emerald-50 border border-emerald-200';
                                     
              const barColor = occupancyPct > 90 ? '#ef4444' : occupancyPct > 70 ? '#f97316' : occupancyPct > 50 ? '#f59e0b' : '#10b981';

              return (
                <motion.div
                  key={gate.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'bg-white p-5 rounded-xl border-y border-r border-l-[3px] flex flex-col justify-between space-y-5 transition-all border-y-slate-200 border-r-slate-200 shadow-sm hover:shadow-md',
                    leftBorder
                  )}
                >
                  {/* 1. Header: Type, ID, Risk */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[11px] px-2 py-0.5 rounded-sm bg-slate-100 border border-slate-200 text-slate-500 font-mono font-bold uppercase tracking-wider">
                          {gate.category}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono font-bold">
                          {gate.id}
                        </span>
                      </div>
                      <h3 className="text-[18px] font-black text-[#0E1A2B] uppercase tracking-tight truncate max-w-[200px]">
                        {gate.name}
                      </h3>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className={cn('text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded', riskColorClass)}>
                        {gate.risk}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isCritical ? "bg-red-500" : isHigh ? "bg-orange-500" : "bg-emerald-500")}/> LIVE
                      </span>
                    </div>
                  </div>

                  {/* 2. Gate Status & Crowd Heat */}
                  <div className="flex gap-3">
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Gate</span>
                      <span className="text-[11px] font-black text-emerald-600 uppercase">OPEN</span>
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Crowd</span>
                      <span className="text-[11px] font-black text-orange-600 uppercase flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/> GROWING</span>
                    </div>
                  </div>

                  {/* 3. Occupancy Segmented Bar (Thicker) */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Occupancy</span>
                      <span className="text-[18px] font-black text-[#0E1A2B] leading-none transition-all duration-500">{occupancyPct}%</span>
                    </div>
                    <div className="flex gap-0.5 h-3">
                      {[...Array(20)].map((_, i) => (
                        <motion.div 
                          key={i} 
                          initial={false}
                          animate={{ backgroundColor: i < Math.round((occupancyPct / 100) * 20) ? barColor : '#F1F5F9' }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="flex-1 rounded-[1px]" 
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[11px] font-mono text-slate-500 tracking-wider">{gate.currentPilgrims} / {gate.maxCapacity} People</span>
                      <span className="text-[11px] font-mono text-slate-500 tracking-wider">{Math.round(gate.currentPilgrims * 0.4)}m Queue</span>
                    </div>
                  </div>

                  {/* 4. Live Metrics Grid */}
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg p-3">
                    <div className="flex-1">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Wait</div>
                      <div className="text-[28px] font-black text-[#0E1A2B] leading-none">{gate.waitingTimeMin} <span className="text-[12px] font-bold text-slate-400">MIN</span></div>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="flex-1 pl-4">
                      <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Throughput</div>
                      <div className="text-[28px] font-black text-emerald-600 leading-none">{gate.dischargeRatePerMin} <span className="text-[12px] font-bold text-emerald-600/70">P/M</span></div>
                    </div>
                  </div>

                  {/* 5. Forecast & Prediction */}
                  <div className="flex items-center justify-between bg-slate-100 rounded-lg p-3 border border-slate-200">
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Next 30 Min Forecast</div>
                      <div className="flex items-center gap-3">
                        <div className="text-[13px] font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">
                          ▲ +18%
                        </div>
                        <div className="text-[13px] font-bold text-[#0E1A2B] uppercase tracking-wider">
                          Wait: 39 Min
                        </div>
                      </div>
                    </div>
                    <div className={cn("w-12 h-4", isCritical ? 'text-red-500' : 'text-orange-500')}>
                       {renderSparkline(isCritical ? 'up' : 'stable')}
                    </div>
                  </div>

                  {/* 6. AI Decision Support Module */}
                  <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-1.5 text-[12px] font-black text-blue-700 uppercase tracking-widest">
                        <Zap className="w-4 h-4" /> AI Recommendation
                      </div>
                      <div className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">CONF: 96%</div>
                    </div>
                    <div className="space-y-2 mb-4 pl-1">
                      <div className="flex items-center gap-2 text-[12px] font-bold text-slate-700 uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Open Adjacent Gate C
                      </div>
                      <div className="flex items-center gap-2 text-[12px] font-bold text-slate-700 uppercase tracking-wider">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Deploy 4 Barricades
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-blue-200">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                        Impact: <span className="text-emerald-600">▼ Queue -18%</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => { showToast('AI recommendation approved — deploying barricades', 'success'); setDismissedAiRec(true); }} className="px-3 py-1.5 bg-[#0E1A2B] hover:bg-slate-800 text-white text-[11px] font-black uppercase tracking-widest rounded transition-colors">
                          Approve
                        </button>
                        <button onClick={() => { showToast('Recommendation rejected', 'warning'); setDismissedAiRec(true); }} className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-[11px] font-bold uppercase tracking-widest rounded transition-colors">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 7. Resource Strip (Pills) & Camera Module */}
                  <div className="space-y-4 pt-2 border-t border-slate-200">
                    <div className="flex gap-2 justify-between">
                      <div className="flex-1 bg-slate-50 border border-slate-200 text-[12px] font-mono text-slate-500 rounded px-2 py-1 flex items-center justify-center gap-1.5">
                        👮 <span className="text-[#0E1A2B] font-bold">{gate.policeOfficers || 4}</span>
                      </div>
                      <div className="flex-1 bg-slate-50 border border-slate-200 text-[12px] font-mono text-slate-500 rounded px-2 py-1 flex items-center justify-center gap-1.5">
                        🙋 <span className="text-[#0E1A2B] font-bold">{gate.volunteerCount}</span>
                      </div>
                      <div className="flex-1 bg-slate-50 border border-slate-200 text-[12px] font-mono text-slate-500 rounded px-2 py-1 flex items-center justify-center gap-1.5">
                        🚑 <span className="text-[#0E1A2B] font-bold">2</span>
                      </div>
                      <div className="flex-1 bg-slate-50 border border-slate-200 text-[12px] font-mono text-slate-500 rounded px-2 py-1 flex items-center justify-center gap-1.5">
                        🚧 <span className="text-[#0E1A2B] font-bold">12</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openCamera(gate.assignedCameraId)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-[#0E1A2B] rounded hover:bg-slate-800 transition-all group shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[12px] font-bold text-white font-mono uppercase tracking-wider">CAM-{gate.assignedCameraId}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <span>1080P</span>
                        <span>30 FPS</span>
                        <span className="text-emerald-400">ONLINE</span>
                      </div>
                    </button>

                    <div className="flex gap-2">
                      <button onClick={() => { navigate('/'); showToast('Opening GIS Command Map', 'info'); }} className="flex-1 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded text-[11px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                        <Map className="w-3.5 h-3.5 text-slate-400" /> Open GIS
                      </button>
                      <button onClick={() => showToast(`Zone detail: ${gate.name} — ${gate.currentPilgrims} pilgrims, ${gate.waitingTimeMin}m wait`, 'info')} className="flex-1 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded text-[11px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" /> Zone Detail
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Live Event Timeline */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm mt-8">
          <h2 className="text-[12px] font-black text-[#0E1A2B] uppercase tracking-widest flex items-center gap-2 mb-5">
            <Activity className="w-4 h-4 text-saffron-500" /> Live Operational Event Feed
          </h2>
          <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {[
              { time: '12:42', text: 'Queue Normalized at Dwarka Main', color: 'bg-emerald-500', shadow: 'shadow-emerald-200' },
              { time: '12:40', text: 'Overflow Detected at Gate C', color: 'bg-red-500', shadow: 'shadow-red-200' },
              { time: '12:37', text: 'Police Detachment Deployed', color: 'bg-blue-500', shadow: 'shadow-blue-200' },
              { time: '12:35', text: 'Gate B Manually Opened', color: 'bg-orange-500', shadow: 'shadow-orange-200' },
            ].map((event, i) => (
              <div key={i} className="flex-1 min-w-[220px] flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg">
                <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", event.color, `shadow-[0_0_8px_var(--tw-shadow-color)]`, event.shadow)} />
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{event.time} IST</div>
                  <div className="text-[12px] font-bold text-[#0E1A2B]">{event.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
