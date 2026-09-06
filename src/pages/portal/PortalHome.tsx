import { motion, AnimatePresence } from 'framer-motion';
import { useOperational } from '@/context/OperationalContext';
import { PORTAL_DATA } from '@/lib/portalData';
import { Navigation, Users, Clock, ArrowRight, CalendarClock, Sunrise, Sunset, Moon, Map, CloudSun, Waves, CheckCircle2, ChevronRight, Wind, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PortalHome() {
  const { templeInfo } = useOperational();
  const pData = PORTAL_DATA[templeInfo.id];
  const primaryColor = pData.theme.primary;

  return (
    <div className="pb-32 bg-slate-50 overflow-hidden">
      
      {/* Immersive Dynamic Hero Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 pt-6">
        <div className="max-w-7xl mx-auto h-[70vh] min-h-[600px] rounded-[3rem] overflow-hidden relative shadow-2xl bg-slate-900">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={templeInfo.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img 
                src={pData.hero.image} 
                alt={templeInfo.name} 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/20" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 w-full h-full flex flex-col justify-end p-8 md:p-16">
            
            {/* Top Badges in Hero */}
            <div className="absolute top-8 left-8 right-8 flex flex-wrap justify-between gap-4">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Temple is Open
              </div>
              <div className="flex gap-2">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                  <CloudSun className="w-4 h-4" /> {pData.weather.temp} {pData.weather.condition}
                </div>
                {pData.weather.extra.map((w, idx) => (
                  <div key={idx} className="hidden sm:flex bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-full text-sm font-bold items-center gap-2">
                    <Wind className="w-4 h-4" /> {w.label}: {w.value}
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              key={`text-${templeInfo.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest mb-4`}>
                Festival: {templeInfo.activeFestival}
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-lg leading-tight">
                Welcome to <br/><span className={`text-transparent bg-clip-text bg-gradient-to-r ${pData.theme.gradient}`}>{templeInfo.name}</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md font-medium">
                {pData.hero.tagline}. Plan your divine journey with live queues, dynamic campus maps, and virtual darshan booking.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/portal/planner" className={`w-full sm:w-auto px-8 py-5 bg-${primaryColor} hover:opacity-90 text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl hover:-translate-y-1`}>
                  <CalendarClock className="w-6 h-6" />
                  Plan My Visit
                </Link>
                <Link to="/portal/map" className="w-full sm:w-auto px-8 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-lg font-bold rounded-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1">
                  <Map className="w-6 h-6" />
                  Tourist Map
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Notifications Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-30">
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-4 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-red-600 uppercase tracking-widest shrink-0">
            <AlertCircle className="w-5 h-5 animate-pulse" /> Live Updates
          </div>
          <div className="flex-1 overflow-hidden relative h-6">
            <motion.div 
              key={`notif-${templeInfo.id}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-sm font-bold text-slate-700 truncate"
            >
              {pData.notifications[0]}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Status Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex items-center gap-6 group hover:border-slate-300 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Temple Crowd</div>
              <div className="text-2xl font-black text-slate-800 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" /> Low
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex items-center gap-6 group hover:border-slate-300 transition-colors">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Wait</div>
              <div className="text-3xl font-black text-slate-800">
                12 <span className="text-base font-bold text-slate-500">mins</span>
              </div>
            </div>
          </div>

          <Link to="/portal/queue" className={`bg-gradient-to-br ${pData.theme.gradient} rounded-3xl p-6 shadow-lg flex items-center justify-between group hover:-translate-y-1 transition-transform`}>
            <div>
              <div className="text-sm font-bold text-white/80 uppercase tracking-widest mb-1">Live Queues</div>
              <div className="text-2xl font-black text-white">View Status</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Temple Information & Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            key={`info-${templeInfo.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-${pData.theme.secondary} text-${primaryColor} text-xs font-bold uppercase tracking-widest`}>
              About {templeInfo.name}
            </div>
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              A Journey of Faith and Devotion
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              {pData.info.history}
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Architecture</div>
                <div className="text-sm font-bold text-slate-800">{pData.info.architecture}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Dress Code</div>
                <div className="text-sm font-bold text-slate-800">{pData.info.dressCode}</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {pData.gallery.slice(0,2).map((img, idx) => (
              <motion.div 
                key={`${templeInfo.id}-img-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                className={`rounded-[2rem] overflow-hidden shadow-lg ${idx === 1 ? 'mt-12' : ''}`}
              >
                <img src={img} alt="Temple" className="w-full h-[300px] object-cover hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">Nearby Attractions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {pData.attractions.map((attr, idx) => (
              <motion.div 
                key={`${templeInfo.id}-attr-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-2xl bg-${pData.theme.secondary} text-${primaryColor} flex items-center justify-center mb-4`}>
                  <Map className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{attr.name}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">{attr.desc}</p>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{attr.dist} Away</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Aarti Schedule Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Today's Aarti Schedule</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Experience the divine aartis. Arrive at least 30 minutes before the scheduled time to secure a good spot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-8 right-8 text-slate-300">
              <Sunrise className="w-12 h-12" />
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Morning</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Pratah Aarti</h3>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border border-slate-200">
              <CheckCircle2 className="w-4 h-4 text-slate-400" /> Completed
            </div>
          </div>

          <div className={`bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-[2rem] border-2 border-orange-200 shadow-xl shadow-orange-500/10 relative overflow-hidden group transform md:-translate-y-4`}>
            <div className={`absolute top-8 right-8 text-orange-500 group-hover:scale-110 transition-transform`}>
              <Sunset className="w-12 h-12" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse`} />
              <div className={`text-sm font-bold text-orange-600 uppercase tracking-widest`}>Active Now</div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Sandhya Aarti</h3>
            <p className="text-slate-600 text-sm font-medium mb-6">The grand evening ritual.</p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-8 right-8 text-indigo-200 group-hover:text-indigo-300 transition-colors">
              <Moon className="w-12 h-12" />
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Evening</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Shayan Aarti</h3>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider border border-indigo-100">
              <Clock className="w-4 h-4" /> Upcoming
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
