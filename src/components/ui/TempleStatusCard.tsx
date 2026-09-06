import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Car, AlertTriangle, ExternalLink } from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils';
import { TEMPLES, type TempleId } from '@/lib/data';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useOperational } from '@/context/OperationalContext';

export interface TempleStatusCardKPI {
  templeId: TempleId;
  todayVisitors: number;
  avgQueueTime: number;
  parkingOccupancy: number;
  openIncidents: number;
  temperature: number;
  weather: string;
  crowdDensity: number;
  aiRiskLevel: string;
  sparkline?: number[];
}

interface TempleStatusCardProps {
  kpi: TempleStatusCardKPI;
  index: number;
}

export default function TempleStatusCard({ kpi, index }: TempleStatusCardProps) {
  const temple = TEMPLES[kpi.templeId];
  const sparkline = kpi.sparkline || [20, 35, 45, 60, 55, 70, 65, 80];
  const sparkData = sparkline.map((v, i) => ({ v, i }));
  const navigate = useNavigate();
  const { setSelectedTemple } = useOperational();

  const handleOpenGIS = () => {
    setSelectedTemple(kpi.templeId);
    navigate('/');
  };

  const getRiskBadge = (density: number) => {
    if (density > 85) return 'bg-red-50 text-red-700 border-red-200 animate-pulse';
    if (density > 65) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-green-50 text-green-700 border-green-200';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card-base relative overflow-hidden p-0 flex flex-col group border border-slate-200 shadow-card-sm hover:shadow-card-lg bg-white rounded-3xl cursor-pointer"
      onClick={handleOpenGIS}
    >
      {/* Top Banner & Thumbnail */}
      <div className="relative h-28 w-full overflow-hidden shrink-0 bg-slate-100">
        <img src={temple?.imageUrl} alt={temple?.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">{temple?.name}</h3>
            <div className="flex items-center gap-1 mt-0.5 text-white/80">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">{temple?.city}, {temple?.district}</span>
            </div>
          </div>
          <div className={cn('px-2.5 py-0.5 rounded-md text-[10px] font-bold border backdrop-blur-md uppercase tracking-wider', getRiskBadge(kpi.crowdDensity))}>
            {kpi.crowdDensity > 85 ? 'Critical' : kpi.crowdDensity > 65 ? 'Moderate' : 'Low Crowd'}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-5 flex-1">
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-slate-500">
              <Users className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Visitors Today</span>
            </div>
            <div className="text-xl font-black text-[#0E1A2B]">{formatNumber(kpi.todayVisitors)}</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-slate-500">
              <Clock className="w-3.5 h-3.5 text-saffron-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Queue Time</span>
            </div>
            <div className="text-xl font-black text-[#0E1A2B]">{kpi.avgQueueTime}<span className="text-xs font-bold text-slate-400 ml-1">min</span></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-slate-500">
              <Car className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Parking</span>
            </div>
            <div className="text-xl font-black text-[#0E1A2B]">{kpi.parkingOccupancy}<span className="text-xs font-bold text-slate-400 ml-1">%</span></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-slate-500">
              <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Incidents</span>
            </div>
            <div className="text-xl font-black text-[#0E1A2B]">{kpi.openIncidents}</div>
          </div>
        </div>

        {/* Footer (Trend + Button) */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
          <div className="w-24 h-8 opacity-70">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id={`spark-${kpi.templeId}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={temple?.color || '#3B82F6'} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={temple?.color || '#3B82F6'} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke={temple?.color || '#3B82F6'} strokeWidth={2} fill={`url(#spark-${kpi.templeId})`} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleOpenGIS(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-saffron-50 text-saffron-600 hover:bg-saffron-100 transition-colors text-[11px] font-bold uppercase tracking-wider"
          >
            Open Live GIS
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
