import MasterplanEngine from '@/components/map/MasterplanEngine';
import IndiaMap from '@/components/map/IndiaMap';
import { motion, AnimatePresence } from 'framer-motion';
import { useOperational } from '@/context/OperationalContext';
import { Navigation, MapPin, Search, Compass } from 'lucide-react';

export default function PortalMap() {
  const { selectedTemple, templeInfo } = useOperational();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
      
      {/* Top Section: Header & Mini India Map */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pilgrim <span className="text-saffron-500">GIS Engine</span>
          </h1>
          <p className="text-slate-600 font-medium max-w-xl">
            Interactive digital twin of the {templeInfo.name} campus. Locate amenities, track queue times, and find your way with precision.
          </p>
          
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-4 rounded-2xl shadow-portal-card border border-slate-200">
              <div className="w-10 h-10 rounded-full bg-saffron-50 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-saffron-600" />
              </div>
              <div className="font-bold text-slate-900">42+ POIs</div>
              <div className="text-xs text-slate-500">Mapped on campus</div>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-portal-card border border-slate-200">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                <Navigation className="w-5 h-5 text-blue-600" />
              </div>
              <div className="font-bold text-slate-900">Live Routing</div>
              <div className="text-xs text-slate-500">Avoid congestion</div>
            </div>
          </div>
        </div>
        
        {/* Mini India Map */}
        <div className="w-full md:w-[400px] h-[300px] rounded-3xl overflow-hidden shadow-card-md border-4 border-white flex-shrink-0 relative">
          <IndiaMap />
        </div>
      </div>

      {/* Official Masterplan GIS */}
      <div className="w-full h-[65vh] min-h-[500px] bg-white rounded-3xl shadow-card-lg border border-slate-200 overflow-hidden relative group">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTemple}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <MasterplanEngine mode="public" />
          </motion.div>
        </AnimatePresence>
        
        {/* Floating Search in Portal */}
        <div className="absolute top-6 left-6 z-[400]">
          <div className="bg-white/95 backdrop-blur shadow-card-md rounded-2xl p-2 flex items-center gap-2 border border-slate-200 w-72">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input 
              type="text" 
              placeholder="Search amenities..." 
              className="bg-transparent border-none outline-none text-sm font-medium text-slate-900 w-full placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Navigation Cards (Bottom) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {[
          { title: 'Queue Status', desc: 'Check live wait times', color: 'bg-orange-50 text-orange-600' },
          { title: 'Parking', desc: 'Find available slots', color: 'bg-blue-50 text-blue-600' },
          { title: 'Facilities', desc: 'Washrooms & Lockers', color: 'bg-green-50 text-green-600' },
          { title: 'Emergency', desc: 'Medical & Police support', color: 'bg-red-50 text-red-600' },
        ].map(card => (
          <button key={card.title} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-portal-card hover:shadow-portal-hover transition-all text-left flex flex-col gap-2 group hover:-translate-y-1">
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">{card.title}</div>
              <div className="text-xs text-slate-500 font-medium">{card.desc}</div>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
