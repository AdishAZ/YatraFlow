import { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Radio,
  Command,
  Sun,
  Moon,
  AlertTriangle
} from 'lucide-react';
import { useOperational } from '@/context/OperationalContext';
import { useTheme } from '@/context/ThemeContext';
import { TEMPLE_LIST, type TempleId } from '@/lib/data';
import { useDemoState } from '@/hooks/useDemoState';
import { cn } from '@/lib/utils';

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const { selectedTemple, setSelectedTemple, templeInfo, missionStatus, setMissionStatus, globalMetrics } = useOperational();
  const [time, setTime] = useState(new Date());
  const [templeDropdownOpen, setTempleDropdownOpen] = useState(false);
  const { actions } = useDemoState();
  const activeIncidents = actions.getActiveIncidentCount();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  });

  const formattedDate = time.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    timeZone: 'Asia/Kolkata',
  });

  const currentAarti = templeInfo.aartis.find(a => a.status === 'Current') || templeInfo.aartis[0];

  const liveStats = {
    isOpen: time.getHours() >= 6 && time.getHours() < 22,
    crowdLevel: `${globalMetrics.crowdLevel}%`,
    visitors: `${(globalMetrics.visitors / 1000).toFixed(1)}K`,
    aiConfidence: `${globalMetrics.aiConfidence}%`,
    weather: selectedTemple === 'somnath' ? '28°C' : selectedTemple === 'pavagadh' ? '24°C' : '30°C',
    waitTime: `${globalMetrics.waitTime}m`,
  };

  return (
    <div className="flex flex-col z-50 bg-[rgba(255,255,255,0.92)] dark:bg-[#0B1221]/95 backdrop-blur-[16px] border-b border-slate-200/80 dark:border-slate-800 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)]">
      
      {/* FIRST ROW: Global Controls */}
      <header className="h-[56px] flex items-center justify-between px-6">
        
        {/* Left Section */}
        <div className="flex items-center gap-7 flex-1 min-w-0">
          
          {/* Logo (Minimalist for TopBar) */}
          <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-[#0E1A2B] rounded-lg shadow-sm">
            <Command className="w-4 h-4 text-white" />
          </div>

          <div className="w-px h-6 bg-slate-200/80 hidden lg:block flex-shrink-0" />

          {/* Active Temple Selector */}
          <div className="relative flex-shrink-0 min-w-[200px] max-w-[280px]">
            <button
              onClick={() => setTempleDropdownOpen(!templeDropdownOpen)}
              className="flex items-center gap-2.5 py-1.5 hover:opacity-80 transition-opacity w-full text-left"
            >
              <div
                className="flex-shrink-0 w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-offset-transparent"
                style={{ backgroundColor: templeInfo.color, boxShadow: `0 0 8px ${templeInfo.color}40` }}
              />
              <div className="text-[13px] font-black text-[#0E1A2B] leading-[1.1] flex items-center gap-1.5 line-clamp-2">
                {templeInfo.fullName}
                <ChevronDown className="flex-shrink-0 w-3.5 h-3.5 text-slate-400" />
              </div>
            </button>

            {templeDropdownOpen && (
              <div className="absolute left-0 mt-3 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50">
                <div className="px-3 py-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Select Campus
                </div>
                {TEMPLE_LIST.map((temple) => (
                  <button
                    key={temple.id}
                    onClick={() => {
                      setSelectedTemple(temple.id as TempleId);
                      setTempleDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all text-left',
                      selectedTemple === temple.id
                        ? 'bg-slate-100 text-[#0E1A2B]'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: temple.color }} />
                      <span className="line-clamp-2">{temple.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-6 bg-slate-200/80 hidden lg:block flex-shrink-0" />

          {/* Current Phase */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0 whitespace-nowrap">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
            <div className="flex flex-col justify-center">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">
                Phase
              </div>
              <div className="text-[13px] font-black text-[#0E1A2B] leading-none">
                {currentAarti.name} <span className="text-slate-400 font-medium ml-1">{currentAarti.time}</span>
              </div>
            </div>
          </div>

          <div className="w-px h-6 bg-slate-200/80 hidden xl:block flex-shrink-0" />

          {/* Large Global Search */}
          <div className="relative hidden xl:block flex-1 max-w-[600px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search cameras, incidents, volunteers, pilgrims, vehicles, QR IDs..."
              className="w-full h-9 pl-10 pr-4 bg-slate-100/50 hover:bg-slate-100 border border-slate-200/60 focus:border-primary focus:bg-white rounded-lg text-[13px] font-medium text-[#0E1A2B] placeholder:text-slate-400 transition-all outline-none"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-7 pr-2 flex-shrink-0">
          
          <div className="w-px h-6 bg-slate-200/80 hidden sm:block flex-shrink-0" />

          {/* Time Block - Stacked */}
          <div className="hidden sm:flex flex-col items-end justify-center whitespace-nowrap">
            <div className="text-[13px] font-black text-[#0E1A2B] tabular-nums tracking-tight leading-none mb-1">
              {formattedTime} <span className="text-[9px] text-slate-500 font-bold uppercase ml-0.5">IST</span>
            </div>
            <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest leading-none">
              {formattedDate}
            </div>
          </div>

          <div className="w-px h-6 bg-slate-200/80 hidden lg:block flex-shrink-0" />

          {/* Commander Profile - Max 2 lines */}
          <div className="hidden lg:flex flex-col items-end cursor-pointer group whitespace-nowrap">
            <div className="text-[13px] font-black text-[#0E1A2B] leading-none mb-1 group-hover:text-primary transition-colors">
              DIG R.K. Jadeja
            </div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">
              State Mission Commander
            </div>
          </div>

          <div className="w-px h-6 bg-slate-200/80 hidden sm:block flex-shrink-0" />

          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900 flex-shrink-0" title="Toggle Dark/Light Mode">
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-900 flex-shrink-0">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
          </button>
        </div>
      </header>

      {/* SECOND ROW: Status Chips */}
      <div className="h-12 px-6 flex items-center gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar border-t border-slate-100/50 dark:border-slate-800/50 bg-white/40 dark:bg-[#080E1A]/40">
        
        {/* Highest Priority - Temple Status & Wait Time */}
        {!liveStats.isOpen ? (
          <div className="flex items-center justify-center gap-2 px-3 h-[36px] bg-red-50 text-red-600 border border-red-200/60 rounded-lg shadow-sm">
            <span className="text-[11.5px] font-black tracking-wide uppercase">Temple Closed</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 px-3 h-[36px] bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-lg shadow-sm">
            <span className="text-[11.5px] font-black tracking-wide uppercase">Temple Open</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 px-3 h-[36px] bg-red-50 text-red-600 border border-red-200/60 rounded-lg shadow-sm">
          <span className="text-[11.5px] font-black tracking-wide">⏳ {liveStats.waitTime}</span>
        </div>

        {activeIncidents > 0 && (
          <div className="flex items-center justify-center gap-2 px-3 h-[36px] bg-red-500 text-white border border-red-600 rounded-lg shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="text-[11.5px] font-black tracking-wide">{activeIncidents} Active Incidents</span>
          </div>
        )}

        {/* Medium Priority - Festival & Crowd */}
        {templeInfo.activeFestival && templeInfo.activeFestival !== 'None' && (
          <div className="flex items-center justify-center gap-2 px-3 h-[36px] bg-orange-50/70 text-orange-600 border border-orange-200/50 rounded-lg shadow-sm">
            <span className="text-[11.5px] font-black tracking-wide uppercase">{templeInfo.activeFestival}</span>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 px-3 h-[36px] bg-amber-50/70 text-amber-600 border border-amber-200/50 rounded-lg shadow-sm">
          <span className="text-[11.5px] font-black tracking-wide">🔥 Crowd {liveStats.crowdLevel}</span>
        </div>

        {/* Low Priority - Visitors, AI, Weather */}
        <div className="flex items-center justify-center gap-2 px-3 h-[36px] bg-slate-50/50 text-slate-500 border border-slate-200/40 rounded-lg shadow-sm">
          <span className="text-[11.5px] font-bold tracking-wide">👥 {liveStats.visitors}</span>
        </div>

        <div className="flex items-center justify-center gap-2 px-3 h-[36px] bg-emerald-50/40 text-emerald-600/80 border border-emerald-200/40 rounded-lg shadow-sm">
          <span className="text-[11.5px] font-bold tracking-wide">🤖 AI {liveStats.aiConfidence}</span>
        </div>

        <div className="flex items-center justify-center gap-2 px-3 h-[36px] bg-slate-50/50 text-slate-400 border border-slate-200/40 rounded-lg shadow-sm">
          <Sun className="w-3.5 h-3.5" />
          <span className="text-[11.5px] font-bold tracking-wide">{liveStats.weather}</span>
        </div>
      </div>

    </div>
  );
}
