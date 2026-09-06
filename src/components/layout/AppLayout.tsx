import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect, createContext, useContext } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import CommandPalette from '../ui/CommandPalette';
import CameraLiveModal from '../camera/CameraLiveModal';
import { ToastContainer } from '../ui/Toast';
import { OperationalProvider } from '@/context/OperationalContext';
// Shared sidebar state context
export const SidebarContext = createContext({ collapsed: false, setCollapsed: (_v: boolean) => {} });
export const useSidebar = () => useContext(SidebarContext);

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // MockApi auto-initializes itself
  }, []);

  return (
    <OperationalProvider>
      <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
        <div className="flex h-screen bg-background overflow-hidden">
          {/* Subtle ambient glow for depth */}
          <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-saffron-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
          <Sidebar />
          <motion.div
            animate={{ marginLeft: collapsed ? 72 : 260 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex-1 flex flex-col h-screen relative min-w-0"
          >
            <TopBar />
            <motion.main
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex-1 p-6 overflow-y-auto min-w-0"
            >
              <Outlet />
            </motion.main>
          </motion.div>
          <CommandPalette />
          <CameraLiveModal />
          <ToastContainer />
        </div>
      </SidebarContext.Provider>
    </OperationalProvider>
  );
}
