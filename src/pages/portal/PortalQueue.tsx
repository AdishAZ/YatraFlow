import { useOperational } from '@/context/OperationalContext';
import { Users, Car, MapPin, Clock, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PortalQueue() {
  const { templeInfo } = useOperational();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 min-h-[calc(100vh-80px)]">
      
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Live Queue Status</h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
          Check live crowd levels and parking availability at {templeInfo.name} before you arrive to ensure a smooth darshan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Darshan Queues */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-orange-500" /> Darshan Lines
          </h2>
          <div className="space-y-4">
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-white border-2 border-emerald-100 rounded-3xl p-6 shadow-xl shadow-emerald-500/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">General Darshan (Gate 1)</h3>
                    <div className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Fast Moving
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Wait Time</div>
                  <div className="text-2xl font-black text-slate-900">12<span className="text-sm font-bold text-slate-500 ml-1">min</span></div>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '25%' }} />
              </div>
              <div className="text-xs font-medium text-slate-500 flex justify-between">
                <span>Current Length: Short</span>
                <span>Max Capacity: 5,000</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-white border-2 border-amber-100 rounded-3xl p-6 shadow-xl shadow-amber-500/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Ticket className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">VIP Darshan (Gate 2)</h3>
                    <div className="text-sm font-bold text-amber-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" /> Moderate
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Wait Time</div>
                  <div className="text-2xl font-black text-slate-900">25<span className="text-sm font-bold text-slate-500 ml-1">min</span></div>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }} />
              </div>
              <div className="text-xs font-medium text-slate-500 flex justify-between">
                <span>Passes Required</span>
                <span>Pre-booking mandatory</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Senior Citizen / Divyang</h3>
                    <div className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" /> Priority Access
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Wait Time</div>
                  <div className="text-2xl font-black text-slate-900">5<span className="text-sm font-bold text-slate-500 ml-1">min</span></div>
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">Wheelchairs available at Gate 3 Help Desk.</p>
            </motion.div>

          </div>
        </div>

        {/* Parking Availability */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Car className="w-6 h-6 text-blue-500" /> Live Parking
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white border-2 border-emerald-100 rounded-3xl p-6 shadow-lg shadow-emerald-500/5">
              <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Available
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Zone A (North)</h3>
              <div className="text-sm text-slate-500 font-medium mb-4">Nearest to Main Gate</div>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-black text-slate-900">420<span className="text-sm font-bold text-slate-400 ml-1">spots</span></div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">68% Empty</div>
              </div>
            </div>

            <div className="bg-white border-2 border-red-100 rounded-3xl p-6 shadow-lg shadow-red-500/5">
              <div className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Full
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Zone B (South)</h3>
              <div className="text-sm text-slate-500 font-medium mb-4">VIP & Pre-booked only</div>
              <div className="flex justify-between items-end">
                <div className="text-3xl font-black text-slate-400">0<span className="text-sm font-bold text-slate-400 ml-1">spots</span></div>
                <div className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md">100% Full</div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm col-span-1 sm:col-span-2">
              <div className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Filling Fast
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">Remote Parking (Zone C)</h3>
                  <div className="text-sm text-slate-500 font-medium">Free E-Rickshaw shuttle to temple available every 5 mins.</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl font-black text-slate-900">185<span className="text-sm font-bold text-slate-400 ml-1">spots</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
