import React, { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import { TEMPLES, CAMERA_FEEDS, type TempleId, type TempleInfo, type CameraFeed } from '@/lib/data';

interface OperationalContextType {
  selectedTemple: TempleId;
  setSelectedTemple: (id: TempleId) => void;
  templeInfo: TempleInfo;
  templeCameras: CameraFeed[];
  activeCamera: CameraFeed | null;
  activeCameraId: string | null;
  openCamera: (cameraOrId: CameraFeed | string) => void;
  closeCamera: () => void;
  missionStatus: 'NOMINAL' | 'ELEVATED' | 'CRITICAL';
  setMissionStatus: (status: 'NOMINAL' | 'ELEVATED' | 'CRITICAL') => void;
  globalMetrics: GlobalMetrics;
}

const OperationalContext = createContext<OperationalContextType | undefined>(undefined);

export interface GlobalMetrics {
  crowdLevel: number;
  visitors: number;
  aiConfidence: number;
  waitTime: number;
}

export function OperationalProvider({ children }: { children: ReactNode }) {
  const [selectedTemple, setSelectedTemple] = useState<TempleId>('somnath');
  const [activeCamera, setActiveCamera] = useState<CameraFeed | null>(null);
  const [missionStatus, setMissionStatus] = useState<'NOMINAL' | 'ELEVATED' | 'CRITICAL'>('NOMINAL');

  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics>({
    crowdLevel: 85,
    visitors: 42500,
    aiConfidence: 98,
    waitTime: 45
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setGlobalMetrics(prev => ({
        crowdLevel: Math.max(10, Math.min(100, prev.crowdLevel + (Math.random() > 0.5 ? 1 : -1))),
        visitors: Math.max(1000, prev.visitors + Math.floor(Math.random() * 21) - 10),
        aiConfidence: Math.max(90, Math.min(99, prev.aiConfidence + (Math.random() > 0.7 ? 1 : -1))),
        waitTime: Math.max(5, Math.min(180, prev.waitTime + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const templeInfo = useMemo(() => TEMPLES[selectedTemple], [selectedTemple]);

  const templeCameras = useMemo(() => {
    return CAMERA_FEEDS.filter(c => c.templeId === selectedTemple);
  }, [selectedTemple]);

  const openCamera = (cameraOrId: CameraFeed | string) => {
    if (typeof cameraOrId === 'string') {
      const found = CAMERA_FEEDS.find(c => c.id === cameraOrId || c.name.toLowerCase().includes(cameraOrId.toLowerCase()));
      if (found) {
        setActiveCamera(found);
      } else {
        // Fallback to first camera of current temple
        setActiveCamera(templeCameras[0] || CAMERA_FEEDS[0]);
      }
    } else {
      setActiveCamera(cameraOrId);
    }
  };

  const closeCamera = () => {
    setActiveCamera(null);
  };

  return (
    <OperationalContext.Provider
      value={{
        selectedTemple,
        setSelectedTemple,
        templeInfo,
        templeCameras,
        activeCamera,
        activeCameraId: activeCamera?.id || null,
        openCamera,
        closeCamera,
        missionStatus,
        setMissionStatus,
        globalMetrics
      }}
    >
      {children}
    </OperationalContext.Provider>
  );
}

export function useOperational() {
  const context = useContext(OperationalContext);
  if (!context) {
    throw new Error('useOperational must be used within an OperationalProvider');
  }
  return context;
}
