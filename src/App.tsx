import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppLayout from '@/components/layout/AppLayout';

const GISMap = lazy(() => import('@/pages/GISMap'));
const CrowdMonitoring = lazy(() => import('@/pages/CrowdMonitoring'));
const QueueManagement = lazy(() => import('@/pages/QueueManagement'));
const TempleOperations = lazy(() => import('@/pages/TempleOperations'));
const Parking = lazy(() => import('@/pages/Parking'));
const Volunteers = lazy(() => import('@/pages/Volunteers'));
const Incidents = lazy(() => import('@/pages/Incidents'));
const PilgrimManagement = lazy(() => import('@/pages/PilgrimManagement'));
const AICopilot = lazy(() => import('@/pages/AICopilot'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const BookingManagement = lazy(() => import('@/pages/BookingManagement'));
const Reports = lazy(() => import('@/pages/Reports'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));

// Portal Pages
const PortalLayout = lazy(() => import('@/components/layout/PortalLayout'));
const PortalHome = lazy(() => import('@/pages/portal/PortalHome'));
const PortalPlanner = lazy(() => import('@/pages/portal/PortalPlanner'));
const PortalMap = lazy(() => import('@/pages/portal/PortalMap'));
const PortalQueue = lazy(() => import('@/pages/portal/PortalQueue'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="flex flex-col items-center gap-5">
        {/* Ashoka Chakra inspired spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-saffron-500/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-saffron-500 animate-chakra-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-gold-400/60 animate-chakra-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }} />
          <div className="absolute inset-[18px] w-3 h-3 rounded-full bg-saffron-500/30" />
        </div>
        <div className="text-center">
          <div className="text-lg font-bold bharat-gradient tracking-wide">Darshan</div>
          <div className="text-[10px] text-secondary/50 font-medium uppercase tracking-[0.15em] mt-1">
            Government of Gujarat · ICCC
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* GIS Command Map is the primary home landing screen */}
        <Route path="/" element={<Suspense fallback={<PageLoader />}><GISMap /></Suspense>} />
        <Route path="/map" element={<Navigate to="/" replace />} />
        
        {/* Core Operations */}
        <Route path="/crowd" element={<Suspense fallback={<PageLoader />}><CrowdMonitoring /></Suspense>} />
        <Route path="/queue" element={<Suspense fallback={<PageLoader />}><QueueManagement /></Suspense>} />
        <Route path="/temple-operations" element={<Suspense fallback={<PageLoader />}><TempleOperations /></Suspense>} />
        <Route path="/dashboard" element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
        
        {/* Tactical Resources */}
        <Route path="/parking" element={<Suspense fallback={<PageLoader />}><Parking /></Suspense>} />
        <Route path="/volunteers" element={<Suspense fallback={<PageLoader />}><Volunteers /></Suspense>} />
        <Route path="/incidents" element={<Suspense fallback={<PageLoader />}><Incidents /></Suspense>} />
        <Route path="/pilgrims" element={<Suspense fallback={<PageLoader />}><PilgrimManagement /></Suspense>} />
        
        {/* Intelligence & Administration */}
        <Route path="/ai-copilot" element={<Suspense fallback={<PageLoader />}><AICopilot /></Suspense>} />
        <Route path="/analytics" element={<Suspense fallback={<PageLoader />}><Analytics /></Suspense>} />
        <Route path="/bookings" element={<Suspense fallback={<PageLoader />}><BookingManagement /></Suspense>} />
        <Route path="/reports" element={<Suspense fallback={<PageLoader />}><Reports /></Suspense>} />
      </Route>
      
      {/* Public Citizen Portal */}
      <Route path="/portal" element={<Suspense fallback={<PageLoader />}><PortalLayout /></Suspense>}>
        <Route index element={<PortalHome />} />
        <Route path="planner" element={<PortalPlanner />} />
        <Route path="map" element={<PortalMap />} />
        <Route path="queue" element={<PortalQueue />} />
      </Route>
    </Routes>
  );
}
