import { useState } from 'react';
import { useSidebar } from './AppLayout';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map,
  Video,
  ListOrdered,
  Building2,
  Car,
  Users,
  AlertTriangle,
  UserCheck,
  Bot,
  BarChart3,
  CalendarCheck,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Shield,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useOperational } from '@/context/OperationalContext';

interface NavSection {
  title: string;
  items: {
    path: string;
    icon: any;
    label: string;
    badge?: string;
  }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'COMMAND',
    items: [
      { path: '/', icon: Map, label: 'GIS Command Map', badge: 'ICCC' },
      { path: '/dashboard', icon: LayoutDashboard, label: 'State Dashboard' },
      { path: '/temple-operations', icon: Building2, label: 'Temple Operations' },
      { path: '/queue', icon: ListOrdered, label: 'Queue Operations' },
    ],
  },
  {
    title: 'SURVEILLANCE',
    items: [
      { path: '/crowd', icon: Video, label: 'CCTV Surveillance' },
      { path: '/volunteers', icon: Users, label: 'Tactical Resources' },
      { path: '/incidents', icon: AlertTriangle, label: 'Incident Command' },
    ],
  },
  {
    title: 'INTELLIGENCE',
    items: [
      { path: '/ai-copilot', icon: Bot, label: 'AI Copilot' },
      { path: '/analytics', icon: BarChart3, label: 'Analytics & Forecast' },
      { path: '/reports', icon: FileText, label: 'Operations Audit' },
    ],
  },
  {
    title: 'ADMIN',
    items: [
      { path: '/pilgrims', icon: UserCheck, label: 'Pilgrim Registry' },
      { path: '/bookings', icon: CalendarCheck, label: 'Slot Allocations' },
      { path: '/parking', icon: Car, label: 'Parking Grid' },
    ],
  },
];

export default function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar();
  const location = useLocation();
  const { missionStatus, setMissionStatus } = useOperational();
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col bg-white dark:bg-[#0B1221] border-r border-slate-200 dark:border-slate-800"
    >
      {/* Logo & Header */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-100 dark:border-slate-800 flex-shrink-0 bg-white dark:bg-[#0B1221]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-saffron-500 to-saffron-600 flex items-center justify-center flex-shrink-0 shadow-saffron-sm">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <div className="text-sm font-bold tracking-wide text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="text-gradient">YatraFlow</span>
                <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-md bg-saffron-50 dark:bg-saffron-500/20 text-saffron-600 dark:text-saffron-400 uppercase font-bold tracking-widest border border-saffron-200 dark:border-saffron-500/30">OPS</span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 tracking-wider uppercase font-medium">
                Govt. of Gujarat · ICCC
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-0.5">
            {!collapsed && (
              <div className="px-3 py-1.5 text-[9px] font-bold text-slate-400 tracking-[0.15em] uppercase">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200 group relative',
                    isActive
                      ? 'bg-saffron-50 text-saffron-600 font-semibold dark:bg-saffron-500/20 dark:text-saffron-400'
                      : 'text-slate-500 hover:text-bharat-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-bharat-400 dark:hover:bg-slate-800/50'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-saffron-500 rounded-r-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <item.icon
                    className={cn(
                      'w-[18px] h-[18px] flex-shrink-0 transition-colors',
                      isActive ? 'text-saffron-500 dark:text-saffron-400' : 'text-slate-400 group-hover:text-bharat-500 dark:group-hover:text-bharat-400'
                    )}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap"
                      >
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded-md bg-saffron-100 text-saffron-700 font-mono font-bold tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* OPCON Selector */}
      {!collapsed && (
        <div className="px-3 pb-2 border-t border-slate-100 dark:border-slate-800 pt-3 relative">
          <button
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
            className={cn(
              'flex items-center justify-between w-full px-3 py-2 rounded-lg border text-[11px] font-black uppercase tracking-wider transition-all',
              missionStatus === 'NOMINAL'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400'
                : missionStatus === 'ELEVATED'
                ? 'bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400'
                : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400'
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'w-2 h-2 rounded-full',
                  missionStatus === 'NOMINAL' ? 'bg-emerald-500' : missionStatus === 'ELEVATED' ? 'bg-orange-500' : 'bg-red-500 animate-pulse'
                )}
              />
              <span>OPCON: {missionStatus.substring(0, 3)}</span>
            </div>
            <ChevronDown className="w-3 h-3 opacity-50" />
          </button>
          
          {statusDropdownOpen && (
            <div className="absolute left-3 right-3 bottom-full mb-2 bg-white dark:bg-[#121E33] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 z-50">
              {['NOMINAL', 'ELEVATED', 'CRITICAL'].map((status) => (
                <button
                  key={status}
                  onClick={() => { setMissionStatus(status as any); setStatusDropdownOpen(false); }}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-lg text-[11px] font-black transition-colors",
                    status === 'NOMINAL' ? "text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10" : 
                    status === 'ELEVATED' ? "text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-500/10" : "text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                  )}
                >
                  OPCON: {status}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Portal Link */}
      {!collapsed && (
        <div className="px-3 pb-2 pt-1">
          <a
            href="/portal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium text-bharat-600 dark:text-bharat-400 hover:text-white hover:bg-bharat-500 transition-all shadow-sm border border-bharat-100 dark:border-bharat-900/50"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Open Citizen Portal
          </a>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-11 border-t border-slate-100 text-slate-400 hover:text-saffron-600 transition-colors bg-slate-50"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.aside>
  );
}
