import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useOperational } from '@/context/OperationalContext';
import { 
  ComposedChart, AreaChart, Area, BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend
} from 'recharts';
import { BrainCircuit, Info, AlertTriangle, ShieldAlert, Activity, Users, Map } from 'lucide-react';
import { ChartCard } from '@/components/ui/ChartCard';
import { cn } from '@/lib/utils';
import { showToast } from '@/components/ui/Toast';
import { QUEUE_PREDICTION, INCIDENT_TREND } from '@/lib/data';

const COLORS = {
  Somnath: '#F97316',
  Dwarka: '#3B82F6',
  Ambaji: '#22C55E',
  Pavagadh: '#A855F7'
};

const AXIS_TICK_PROPS = { fill: '#9CA3AF', fontSize: 11 };

// AI Data Mocks
const FORECAST_DATA = [
  { time: '06:00', actual: 1200, predicted: 1250, lower: 1100, upper: 1400 },
  { time: '09:00', actual: 3200, predicted: 3100, lower: 2800, upper: 3400 },
  { time: '12:00', actual: 2700, predicted: 2800, lower: 2500, upper: 3100 },
  { time: '15:00', actual: null, predicted: 3500, lower: 3100, upper: 3900 },
  { time: '18:00', actual: null, predicted: 4800, lower: 4200, upper: 5400 },
  { time: '21:00', actual: null, predicted: 2100, lower: 1800, upper: 2400 },
];

const RESOURCE_DATA = [
  { name: 'Security', Somnath: 85, Dwarka: 65, Ambaji: 98, Pavagadh: 55 },
  { name: 'Medical', Somnath: 60, Dwarka: 45, Ambaji: 92, Pavagadh: 40 },
  { name: 'Volunteers', Somnath: 75, Dwarka: 80, Ambaji: 100, Pavagadh: 60 },
  { name: 'Transport', Somnath: 90, Dwarka: 70, Ambaji: 85, Pavagadh: 50 },
  { name: 'Sanitation', Somnath: 70, Dwarka: 60, Ambaji: 80, Pavagadh: 45 },
];

const CustomAITooltip = ({ active, payload, label, customText }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-card-lg rounded-lg p-3 min-w-[220px]">
        <div className="flex items-center gap-2 mb-2 border-b border-border/60 pb-2">
          <BrainCircuit className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs font-bold text-text uppercase tracking-wider">AI Prediction • {label}</span>
        </div>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center text-sm">
              <span className="text-secondary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                {entry.name}
              </span>
              <span className="font-mono text-text font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-2 border-t border-border/40 text-[10px] text-secondary/80 flex items-start gap-1.5 leading-tight bg-primary/5 p-2 rounded">
          <Info className="w-3 h-3 shrink-0 mt-0.5 text-primary" />
          <span>{customText || '94% confidence based on historical patterns and current telemetry.'}</span>
        </div>
      </div>
    );
  }
  return null;
};

// Heatmap Component
const IncidentHeatmap = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['8A', '10A', '12P', '2P', '4P', '6P', '8P'];
  
  // Generating deterministic mock data for the heatmap
  const getIntensity = (d: number, h: number) => {
    let risk = (Math.sin(d) + Math.cos(h)) * 50 + 50;
    if (d === 5 || d === 6) risk += 30; // Weekend surge
    if (h === 4 || h === 5) risk += 40; // Evening aarti surge
    return Math.min(100, Math.max(0, risk));
  };

  const getColor = (intensity: number) => {
    if (intensity < 30) return 'bg-surface border-border';
    if (intensity < 60) return 'bg-warning/20 border-warning/50 text-warning';
    if (intensity < 80) return 'bg-orange-500/30 border-orange-500/60 text-orange-400';
    return 'bg-critical/30 border-critical/60 text-critical font-bold shadow-[0_0_10px_rgba(239,68,68,0.4)]';
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex w-full mb-1">
          <div className="w-10"></div>
          {hours.map(h => <div key={h} className="flex-1 text-center text-[10px] text-secondary">{h}</div>)}
        </div>
        {days.map((day, dIdx) => (
          <div key={day} className="flex w-full items-center gap-1 mb-1 flex-1">
            <div className="w-10 text-[10px] text-secondary text-right pr-2">{day}</div>
            {hours.map((hour, hIdx) => {
              const intensity = getIntensity(dIdx, hIdx);
              return (
                <div 
                  key={`${day}-${hour}`} 
                  className={cn(
                    "flex-1 h-full min-h-[28px] rounded-sm border flex items-center justify-center text-[9px] transition-all hover:scale-110 cursor-pointer relative group",
                    getColor(intensity)
                  )}
                >
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity z-10 absolute bg-card px-2 py-1 rounded shadow-lg border border-border whitespace-nowrap top-full mt-1">
                    Risk Score: {Math.round(intensity)}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] text-secondary border-t border-border pt-3">
        <div className="flex items-center gap-2">
          <span>Low Risk</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-surface border border-border"></div>
            <div className="w-3 h-3 rounded-sm bg-warning/20 border border-warning/50"></div>
            <div className="w-3 h-3 rounded-sm bg-orange-500/30 border border-orange-500/60"></div>
            <div className="w-3 h-3 rounded-sm bg-critical/30 border border-critical/60"></div>
          </div>
          <span>High Risk</span>
        </div>
        <span className="flex items-center gap-1">
          <BrainCircuit className="w-3 h-3 text-primary" /> Powered by YatraFlow AI
        </span>
      </div>
    </div>
  );
};

export default function Analytics() {
  const { selectedTemple, templeInfo } = useOperational();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0E1A2B] flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-primary" />
            AI Intelligence Center
          </h1>
          <p className="text-sm text-secondary mt-1">Predictive analytics and deep learning insights for {templeInfo.fullName}.</p>
        </div>
      </div>

      {/* Top Banner for Alerts */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-critical/20 via-card to-card border border-critical/30 rounded-xl p-4 flex items-start gap-4"
      >
        <div className="bg-critical/20 p-2 rounded-full">
          <AlertTriangle className="w-5 h-5 text-critical" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-critical">AI Predictive Alert: Ambaji Temple</h3>
          <p className="text-xs text-secondary mt-1">
            Machine learning models forecast a <strong className="text-text">310% crowd surge</strong> at Gabbar Hill Path between 17:00–19:00 IST today. Current volunteer deployment is insufficient by 42 personnel.
          </p>
        </div>
        <button onClick={() => showToast('Resolution Plan: Deploy 42 additional volunteers to Gabbar Hill Path by 16:30 IST. Activate overflow corridors and PA announcements.', 'warning')} className="px-3 py-1.5 bg-critical/10 hover:bg-critical/20 text-critical text-xs font-semibold rounded border border-critical/30 transition-colors">
          View Resolution Plan
        </button>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <ChartCard title="Global Visitor Forecast (Next 24H)" action={<span className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded">Live Model Active</span>}>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={FORECAST_DATA} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="time" tick={AXIS_TICK_PROPS} axisLine={false} tickLine={false} />
                  <YAxis tick={AXIS_TICK_PROPS} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomAITooltip customText="Shaded area represents 95% confidence interval for projected footfall."/>} />
                  <Legend />
                  
                  {/* Confidence Interval */}
                  <Area 
                    type="monotone" dataKey="upper" stroke="none" fill="url(#colorConfidence)" name="Upper Bound"
                  />
                  <Area 
                    type="monotone" dataKey="lower" stroke="none" fill="#FFFDF8" name="Lower Bound"
                  />
                  
                  {/* Actual vs Predicted */}
                  <Line type="monotone" dataKey="predicted" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name="AI Predicted" dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="actual" stroke="#F97316" strokeWidth={3} name="Actual Count" dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard title="Incident Risk Spatial Heatmap" className="h-[380px]">
            <div className="h-full w-full py-2">
              <IncidentHeatmap />
            </div>
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard title="AI Resource Optimization Matrix" className="h-[380px]">
             <div className="h-[280px] w-full relative">
              {/* Overlay Alert for Ambaji */}
              <div className="absolute top-0 right-0 bg-card/80 backdrop-blur border border-border p-2 rounded text-[10px] z-10 max-w-[120px]">
                <strong className="text-critical block mb-1">Ambaji Alert</strong>
                Volunteers and Security are over-leveraged (&gt;95%).
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={RESOURCE_DATA}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <RechartsTooltip contentStyle={{ background: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px', boxShadow: '0 4px 16px -4px rgba(0,0,0,0.08)' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Radar name="Somnath" dataKey="Somnath" stroke={COLORS.Somnath} fill={COLORS.Somnath} fillOpacity={0.3} />
                  <Radar name="Ambaji" dataKey="Ambaji" stroke={COLORS.Ambaji} fill={COLORS.Ambaji} fillOpacity={0.5} strokeWidth={2} />
                  <Radar name="Dwarka" dataKey="Dwarka" stroke={COLORS.Dwarka} fill={COLORS.Dwarka} fillOpacity={0.1} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard title="Predictive Queue Wait Times (Next 6 Hrs)">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={QUEUE_PREDICTION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="time" tick={AXIS_TICK_PROPS} axisLine={false} tickLine={false} />
                  <YAxis tick={AXIS_TICK_PROPS} axisLine={false} tickLine={false} />
                  <RechartsTooltip content={<CustomAITooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" name="Actual Wait (min)" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: '#0E1A2B', strokeWidth: 2 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="predicted" name="AI Predicted" stroke="#F97316" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ChartCard title="Historical Anomaly Detection">
            <div className="h-[280px] w-full relative">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={INCIDENT_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="day" tick={AXIS_TICK_PROPS} axisLine={false} tickLine={false} />
                  <YAxis tick={AXIS_TICK_PROPS} axisLine={false} tickLine={false} />
                  <RechartsTooltip contentStyle={{ background: '#0E1A2B', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC' }} cursor={{ fill: '#1E293B' }} />
                  <Legend />
                  <Bar dataKey="crowd" name="Crowd Surge" stackId="a" fill="#F97316" />
                  <Bar dataKey="medical" name="Medical Emergency" stackId="a" fill="#EF4444" />
                  <Bar dataKey="queue" name="Queue Choke" stackId="a" fill="#3B82F6" />
                  <Bar dataKey="security" name="Security Breach" stackId="a" fill="#A855F7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
