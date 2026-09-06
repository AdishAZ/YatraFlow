import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, UserCheck, Clock, AlertTriangle, 
  HeartHandshake, Car, Activity, Brain,
  ChevronRight, Zap, RefreshCcw, FileText, Download, Maximize, AlertCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

import { 
  STATEWIDE_KPIS, TEMPLE_KPIS, ACTIVITY_FEED, HOURLY_FOOTFALL, TEMPLES 
} from '@/lib/data';
import { cn } from '@/lib/utils';
import MetricCard from '@/components/ui/MetricCard';
import TempleStatusCard from '@/components/ui/TempleStatusCard';
import { ExportDialog } from '@/components/ui/ExportDialog';
import { showToast } from '@/components/ui/Toast';
import { useDemoState } from '@/hooks/useDemoState';
import { useOperational } from '@/context/OperationalContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { actions, incidents, resources } = useDemoState();
  const { selectedTemple, globalMetrics, templeInfo } = useOperational();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const activeTempleKPI = TEMPLE_KPIS.find(t => t.templeId === selectedTemple) || TEMPLE_KPIS[0];
  const activeIncidentsCount = incidents.filter(i => i.templeId === selectedTemple && i.status !== 'Resolved').length;
  const criticalIncidentsCount = incidents.filter(i => i.templeId === selectedTemple && i.severity === 'Critical' && i.status !== 'Resolved').length;
  const activeVolunteersCount = resources.filter(r => r.templeId === selectedTemple).length;
  const activeAlertsCount = actions.getActiveAlertCount(); // Simplified for now
  
  const filteredActivityFeed = ACTIVITY_FEED.filter(a => a.templeId === selectedTemple);
  
  const [showExport, setShowExport] = useState(false);
  const [activeTimespan, setActiveTimespan] = useState('Today');
  const [dismissedRecs, setDismissedRecs] = useState<number[]>([]);
  const [refreshTick, setRefreshTick] = useState(0);

  const [statusMsgIdx, setStatusMsgIdx] = useState(0);
  const statusMsgs = [
    "🟢 All temples operating normally",
    "🟠 Queue increasing near Dwarka Main Gate",
    "🔴 Medical response dispatched at Ambaji",
    "🔵 Weather improving at Somnath Coast"
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const statusTimer = setInterval(() => {
      setStatusMsgIdx(prev => (prev + 1) % statusMsgs.length);
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full pb-10 relative">
      
      {/* Quick Actions Floating Toolbar */}
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/95 backdrop-blur-xl border border-slate-200 shadow-card-sm rounded-xl p-1.5 z-10">
        <button onClick={() => { setRefreshTick(prev => prev + 1); showToast('Dashboard refreshed', 'success'); }} className="p-2 text-slate-400 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg transition-colors"><RefreshCcw className="w-4 h-4" /></button>
        <button onClick={() => setShowExport(true)} className="p-2 text-slate-400 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg transition-colors"><FileText className="w-4 h-4" /></button>
        <button onClick={() => setShowExport(true)} className="p-2 text-slate-400 hover:text-saffron-600 hover:bg-saffron-50 rounded-lg transition-colors"><Download className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-slate-200 mx-1"></div>
        <button onClick={() => document.documentElement.requestFullscreen().catch(() => {})} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><Maximize className="w-4 h-4" /></button>
      </div>

      {/* Rotating Status Strip */}
      <div className="w-full max-w-2xl mx-auto h-10 relative overflow-hidden flex justify-center -mb-2">
        <AnimatePresence mode="wait">
          <motion.div 
            key={statusMsgIdx}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bg-white border border-slate-200 shadow-sm rounded-full px-5 py-1.5 text-xs font-bold text-slate-700 tracking-wide"
          >
            {statusMsgs[statusMsgIdx]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-black tracking-tight text-[#0E1A2B] flex items-center gap-3">
            {templeInfo.name} Command Center
          </h1>
          <p className="text-xl font-medium text-slate-500 mt-1">
            {templeInfo.fullName}
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-right">
          <div className="flex items-center justify-end gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live Data</span>
          </div>
          <div className="text-2xl font-mono font-black text-[#0E1A2B]">
            {currentTime.toLocaleTimeString('en-IN')}
          </div>
        </motion.div>
      </div>

      {/* Row 1 - Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <MetricCard
          title="Today's Pilgrims"
          value={activeTempleKPI.todayVisitors}
          icon={Users}
          trend={{ value: 14.2, label: 'vs last week' }}
          variant="primary"
          color="text-blue-500"
        />
        <MetricCard
          title="Currently Inside"
          value={globalMetrics.visitors}
          icon={UserCheck}
          live
          color="text-green-600"
          variant="primary"
        />
        <MetricCard
          title="Average Queue"
          value={globalMetrics.waitTime}
          suffix="min"
          icon={Clock}
          color="text-amber-500"
          trend={{ value: -5.4, label: '' }}
          variant="primary"
        />
        <MetricCard
          title="Incidents"
          value={activeIncidentsCount}
          suffix={`${criticalIncidentsCount} Critical`}
          icon={AlertTriangle}
          color="text-red-600"
          trend={{ value: 2.1, label: '' }}
          variant="primary"
        />
      </div>

      {/* Row 2 - Secondary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <MetricCard
          title="Active Volunteers"
          value={activeVolunteersCount}
          icon={HeartHandshake}
          color="text-green-600"
          variant="secondary"
        />
        <MetricCard
          title="Parking Occupancy"
          value={activeTempleKPI.parkingOccupancy}
          suffix="%"
          icon={Car}
          color="text-blue-500"
          trend={{ value: 4.8, label: '' }}
          variant="secondary"
        />
        <MetricCard
          title="Medical Alerts"
          value={activeAlertsCount}
          icon={Activity}
          color="text-red-500"
          variant="secondary"
        />
        <MetricCard
          title="AI Risk Level"
          value={activeTempleKPI.aiRiskLevel}
          icon={Brain}
          color="text-saffron-500"
          variant="secondary"
        />
      </div>

      {/* Row 2 - Four Temple Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {TEMPLE_KPIS.map((kpi, index) => (
          <TempleStatusCard key={kpi.templeId} kpi={kpi} index={index} />
        ))}
      </div>

      {/* Row 3 - Activity Feed & Hourly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Activity Feed (Timeline) */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 shadow-card-sm flex flex-col h-[420px]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Activity Timeline</h2>
            <button onClick={() => navigate('/reports')} className="text-[10px] font-bold text-saffron-600 hover:text-saffron-700 bg-saffron-50 px-3 py-1.5 rounded-full flex items-center">
              View All <ChevronRight className="w-3 h-3 ml-1" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 relative custom-scrollbar">
            {/* Vertical Line */}
            <div className="absolute top-2 bottom-2 left-3 w-0.5 bg-slate-100 z-0"></div>
            
            <div className="space-y-6 relative z-10">
              {filteredActivityFeed.length > 0 ? filteredActivityFeed.map((activity, i) => (
                <div key={activity.id} className="flex gap-4 items-start group">
                  <div className="mt-1 bg-white p-1 rounded-full">
                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: TEMPLES[activity.templeId].color }} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{TEMPLES[activity.templeId].name}</span>
                      <span className="text-[10px] font-bold text-slate-400">{activity.time}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#0E1A2B] leading-snug group-hover:text-saffron-600 transition-colors">{activity.message}</p>
                  </div>
                </div>
              )) : (
                <div className="text-sm text-slate-400 text-center mt-10">No recent activity</div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Hourly Trend Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 shadow-card-sm lg:col-span-2 flex flex-col h-[420px]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Visitor Trend</h2>
            <div className="flex gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
              {['Today', 'Yesterday', 'Week', 'Month'].map(span => (
                <button 
                  key={span} 
                  onClick={() => setActiveTimespan(span)}
                  className={cn(
                  "px-3 py-1 text-[10px] font-bold rounded-md transition-colors",
                  activeTimespan === span ? "bg-white shadow-sm text-slate-800" : "text-slate-400 hover:text-slate-600"
                )}>
                  {span}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeTimespan === 'Today' ? HOURLY_FOOTFALL : activeTimespan === 'Yesterday' ? HOURLY_FOOTFALL.map(d => ({...d, somnath: d.somnath * 0.9, dwarka: d.dwarka * 0.95, ambaji: d.ambaji * 0.85, pavagadh: d.pavagadh * 1.1})) : activeTimespan === 'Week' ? HOURLY_FOOTFALL.map(d => ({...d, somnath: d.somnath * 7, dwarka: d.dwarka * 7, ambaji: d.ambaji * 7, pavagadh: d.pavagadh * 7})) : HOURLY_FOOTFALL.map(d => ({...d, somnath: d.somnath * 30, dwarka: d.dwarka * 30, ambaji: d.ambaji * 30, pavagadh: d.pavagadh * 30}))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSomnath" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={TEMPLES.somnath.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={TEMPLES.somnath.color} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDwarka" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={TEMPLES.dwarka.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={TEMPLES.dwarka.color} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAmbaji" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={TEMPLES.ambaji.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={TEMPLES.ambaji.color} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPavagadh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={TEMPLES.pavagadh.color} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={TEMPLES.pavagadh.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="hour" stroke="#94A3B8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: 12, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#0E1A2B', fontWeight: 700 }}
                  labelStyle={{ color: '#64748B', fontWeight: 600, marginBottom: 4 }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 10, color: '#475569' }} />
                <Area type="monotone" dataKey="somnath" name="Somnath" stroke={TEMPLES.somnath.color} strokeWidth={2} fillOpacity={1} fill="url(#colorSomnath)" />
                <Area type="monotone" dataKey="dwarka" name="Dwarka" stroke={TEMPLES.dwarka.color} strokeWidth={2} fillOpacity={1} fill="url(#colorDwarka)" />
                <Area type="monotone" dataKey="ambaji" name="Ambaji" stroke={TEMPLES.ambaji.color} strokeWidth={2} fillOpacity={1} fill="url(#colorAmbaji)" />
                <Area type="monotone" dataKey="pavagadh" name="Pavagadh" stroke={TEMPLES.pavagadh.color} strokeWidth={2} fillOpacity={1} fill="url(#colorPavagadh)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Row 4 - AI Insights & Emergency Readiness */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-4">
        
        {/* AI Recommendations */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 shadow-card-sm flex flex-col"
        >
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-6">
            <Brain className="w-4 h-4 text-saffron-500" /> AI Command Recommendations
          </h2>
          <div className="space-y-4">
            {[
              { t: 'Deploy 8 additional volunteers to Ambaji Gabbar Hill path', conf: '96%', imp: '18% Queue Reduction', prio: 'High' },
              { t: 'Divert Somnath Parking Lot B overflow to Lot D', conf: '89%', imp: 'Prevent gridlock', prio: 'Medium' },
              { t: 'Dispatch Medical Team to Dwarka Gomti Ghat', conf: '99%', imp: 'Emergency Response', prio: 'Critical' }
            ].map((rec, idx) => {
              if (dismissedRecs.includes(idx)) return null;
              return (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex gap-3">
                  <div className="bg-white p-2 rounded-xl shadow-sm h-min">
                    <Zap className={cn("w-4 h-4", rec.prio === 'Critical' ? 'text-red-500' : 'text-saffron-500')} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0E1A2B] leading-tight mb-1">{rec.t}</div>
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">Conf: {rec.conf}</span>
                      <span>Impact: {rec.imp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => { showToast('Recommendation approved', 'success'); setDismissedRecs(prev => [...prev, idx]); }} className="px-4 py-1.5 bg-[#0E1A2B] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-slate-800 transition-colors shadow-sm">Approve</button>
                  <button onClick={() => setDismissedRecs(prev => [...prev, idx])} className="px-4 py-1.5 bg-white text-slate-500 border border-slate-200 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-slate-50 transition-colors">Dismiss</button>
                </div>
              </div>
            )})}
          </div>
        </motion.div>

        {/* Emergency Readiness */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white border border-slate-200 rounded-3xl p-6 shadow-card-sm flex flex-col"
        >
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-6">
            <AlertCircle className="w-4 h-4 text-red-500" /> Emergency Readiness Matrix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {[
              { name: 'Somnath', matrix: ['g', 'g', 'g', 'g', 'g'] },
              { name: 'Dwarka', matrix: ['g', 'y', 'g', 'g', 'g'] },
              { name: 'Ambaji', matrix: ['y', 'g', 'r', 'y', 'g'] },
              { name: 'Pavagadh', matrix: ['g', 'g', 'g', 'g', 'g'] }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col gap-3 justify-center">
                <div className="font-black text-slate-800 flex justify-between items-center">
                  {item.name}
                  <span className={cn('text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md border bg-white', item.matrix.includes('r') ? 'text-red-600 border-red-200' : item.matrix.includes('y') ? 'text-amber-600 border-amber-200' : 'text-green-600 border-green-200')}>
                    {item.matrix.includes('r') ? 'Critical' : item.matrix.includes('y') ? 'Elevated' : 'Nominal'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn("w-2.5 h-2.5 rounded-full shadow-sm", item.matrix[0] === 'g' ? 'bg-green-500' : item.matrix[0] === 'y' ? 'bg-amber-500' : 'bg-red-500')} />
                    Pol
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn("w-2.5 h-2.5 rounded-full shadow-sm", item.matrix[1] === 'g' ? 'bg-green-500' : item.matrix[1] === 'y' ? 'bg-amber-500' : 'bg-red-500')} />
                    Med
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn("w-2.5 h-2.5 rounded-full shadow-sm", item.matrix[2] === 'g' ? 'bg-green-500' : item.matrix[2] === 'y' ? 'bg-amber-500' : 'bg-red-500')} />
                    Fire
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn("w-2.5 h-2.5 rounded-full shadow-sm", item.matrix[3] === 'g' ? 'bg-green-500' : item.matrix[3] === 'y' ? 'bg-amber-500' : 'bg-red-500')} />
                    Vol
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn("w-2.5 h-2.5 rounded-full shadow-sm", item.matrix[4] === 'g' ? 'bg-green-500' : item.matrix[4] === 'y' ? 'bg-amber-500' : 'bg-red-500')} />
                    Com
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
      <ExportDialog isOpen={showExport} onClose={() => setShowExport(false)} />
    </div>
  );
}
