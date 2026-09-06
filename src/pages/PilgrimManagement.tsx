import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserCircle, Activity, HeartPulse, SearchCode, PhoneCall, Filter, ArrowRight, UserMinus } from 'lucide-react';
import { PILGRIMS, LOST_FOUND, TEMPLES } from '@/lib/data';
import { cn } from '@/lib/utils';
import StatusBadge from '@/components/ui/StatusBadge';
import MetricCard from '@/components/ui/MetricCard';
import { showToast } from '@/components/ui/Toast';
import { DispatchDrawer } from '@/components/ui/DispatchDrawer';

export default function PilgrimManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDispatch, setShowDispatch] = useState(false);
  const [dispatchZone, setDispatchZone] = useState('');

  const filteredPilgrims = PILGRIMS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.token.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = PILGRIMS.filter(p => p.status === 'Active').length;
  const medicalCount = PILGRIMS.filter(p => p.status === 'Medical' || p.status === 'SOS').length;
  const specialAssistance = PILGRIMS.filter(p => p.assistance).length;

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-[#0E1A2B] tracking-tight">Pilgrim Management</h1>
        <p className="text-sm text-slate-500 mt-1 font-medium tracking-wide">Live tracking, special assistance, and incident management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Active Pilgrims (Tracked)"
          value={activeCount}
          icon={UserCircle}
          color="text-success"
          live
        />
        <MetricCard
          title="Medical / SOS Cases"
          value={medicalCount}
          icon={HeartPulse}
          color="text-critical"
          live
        />
        <MetricCard
          title="Special Assistance Required"
          value={specialAssistance}
          icon={Activity}
          color="text-warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Pilgrim Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 m-0">
              <SearchCode className="w-4 h-4 text-saffron-500" /> Live Pilgrim Directory
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search name or QR token..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-[#0E1A2B] text-sm font-medium rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-saffron-500/50 w-full md:w-64"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-bold">Pilgrim ID</th>
                    <th className="px-4 py-3 font-bold">Name & Category</th>
                    <th className="px-4 py-3 font-bold">Location</th>
                    <th className="px-4 py-3 font-bold">Entry Time</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPilgrims.map((p, idx) => (
                    <motion.tr 
                      key={p.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-surface/30 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{p.token}</td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-[#0E1A2B]">{p.name}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                          {p.category}
                          {p.assistance && (
                            <span className="text-amber-600 bg-amber-50 border border-amber-200 px-1 py-0.5 rounded">
                              {p.assistance}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-[#0E1A2B] font-medium">{p.zone}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{TEMPLES[p.templeId].name}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-xs">{p.entryTime}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={p.status} />
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => showToast(`${p.name} — ${p.zone}, ${p.category}, Entry: ${p.entryTime}`, 'info')} className="text-saffron-600 hover:text-saffron-700 bg-saffron-50 hover:bg-saffron-100 rounded p-1.5 transition-colors" title="View Details">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                  {filteredPilgrims.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-secondary">
                        No pilgrims found matching search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Lost & Found + Medical */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <UserMinus className="w-4 h-4 text-orange-500" /> Lost & Found
            </h2>
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-0 divide-y divide-slate-100">
              {LOST_FOUND.map((lf, idx) => (
                <div key={lf.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-[#0E1A2B] flex items-center gap-2 text-sm">
                      {lf.name}
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                        {lf.type}
                      </span>
                    </div>
                    <StatusBadge status={lf.status} />
                  </div>
                  <div className="flex justify-between items-end mt-3 text-xs">
                    <div className="text-slate-500 font-medium">
                      <div className="mb-1">Reported: <span className="font-mono text-xs">{lf.reported}</span></div>
                      <div>Officer: {lf.officer}</div>
                    </div>
                    <button onClick={() => showToast(`Contacting ${lf.officer}...`, 'info')} className="flex items-center gap-1.5 text-saffron-600 hover:text-saffron-700 bg-saffron-50 hover:bg-saffron-100 px-2 py-1 rounded transition-colors font-bold uppercase tracking-wider text-[10px]">
                      <PhoneCall className="w-3 h-3" /> Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <HeartPulse className="w-4 h-4 text-red-500" /> Medical Requests
            </h2>
            <div className="bg-white border border-red-200 shadow-sm rounded-xl p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-bold text-[#0E1A2B] uppercase tracking-wide">Active Requests</div>
                <div className="bg-red-50 text-red-600 border border-red-200 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">
                  {PILGRIMS.filter(p => p.status === 'Medical' || p.status === 'SOS').length} Pending
                </div>
              </div>
              
              <div className="space-y-3">
                {PILGRIMS.filter(p => p.status === 'Medical' || p.status === 'SOS').map(p => (
                  <div key={p.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-bold text-[#0E1A2B]">{p.name}</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">{p.zone}, {TEMPLES[p.templeId].name}</div>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => { setDispatchZone(p.zone); setShowDispatch(true); }} className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded py-1.5 text-[10px] uppercase tracking-widest font-bold transition-colors">
                        Dispatch Unit
                      </button>
                      <button onClick={() => showToast(`${p.name} — ${p.category}, ${p.assistance || 'No special assistance'}, Zone: ${p.zone}`, 'info')} className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 rounded py-1.5 text-[10px] uppercase tracking-widest font-bold text-slate-600 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DispatchDrawer isOpen={showDispatch} onClose={() => setShowDispatch(false)} defaultZone={dispatchZone} />
    </div>
  );
}
