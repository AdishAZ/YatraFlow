import { CAMERA_MANIFEST } from '../data/cameraManifest';
import type { CameraManifestEntry } from '../data/cameraManifest';
import { SIMULATION_PROFILES } from '../data/simulationProfiles';
import type { ProfileScenario } from '../data/simulationProfiles';

export interface CameraMetrics {
  density: number;
  queueTime: number;
  flowRate: number;
  risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  trend: 'increasing' | 'decreasing' | 'stable';
  densityHistory: number[]; // 20 data points for graph
}

export interface CameraState {
  camera: CameraManifestEntry;
  scenario: ProfileScenario;
  metrics: CameraMetrics;
  timestamp: number;
}

class MockApiImpl {
  private states: Map<string, CameraState> = new Map();
  private listeners: Set<(id: string) => void> = new Set();
  private interval: any = null;

  constructor() {
    this.init();
    this.startDrift();
  }

  private init() {
    CAMERA_MANIFEST.forEach(cam => {
      const scenario = SIMULATION_PROFILES[cam.simulationProfile];
      
      // Seed initial history
      const history = [];
      let val = scenario.baseMetrics.density;
      for (let i = 0; i < 20; i++) {
        history.push(val);
        val += (Math.random() > 0.5 ? 1 : -1);
      }

      this.states.set(cam.id, {
        camera: cam,
        scenario,
        metrics: { 
          ...scenario.baseMetrics, 
          trend: 'stable',
          densityHistory: history
        },
        timestamp: Date.now()
      });
    });
  }

  private startDrift() {
    this.interval = setInterval(() => {
      this.states.forEach((state, id) => {
        const oldDensity = state.metrics.density;
        
        // Drift density +/- 1%
        let newDensity = oldDensity + (Math.random() > 0.5 ? 1 : -1);
        newDensity = Math.max(0, Math.min(100, newDensity));

        // Determine trend
        let newTrend: 'increasing' | 'decreasing' | 'stable' = 'stable';
        if (newDensity > oldDensity) newTrend = 'increasing';
        else if (newDensity < oldDensity) newTrend = 'decreasing';

        // Update history
        const newHistory = [...state.metrics.densityHistory.slice(1), newDensity];

        // Drift queue time +/- 1 min (mostly stable)
        let newQueue = state.metrics.queueTime;
        if (Math.random() > 0.8) {
          newQueue += (Math.random() > 0.5 ? 1 : -1);
          newQueue = Math.max(0, newQueue);
        }

        // Determine Risk based on density
        let newRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
        if (newDensity > 90) newRisk = 'CRITICAL';
        else if (newDensity > 75) newRisk = 'HIGH';
        else if (newDensity > 50) newRisk = 'MEDIUM';

        state.metrics = {
          ...state.metrics,
          density: newDensity,
          queueTime: newQueue,
          risk: newRisk,
          trend: newTrend,
          densityHistory: newHistory
        };
        state.timestamp = Date.now();

        this.notifyListeners(id);
      });
    }, 3000); // Drift every 3 seconds to feel live but not chaotic
  }

  private notifyListeners(id: string) {
    this.listeners.forEach(listener => listener(id));
  }

  // API Methods
  getCameraState(cameraId: string): CameraState | undefined {
    return this.states.get(cameraId);
  }

  subscribeToCamera(cameraId: string, callback: () => void): () => void {
    const wrapped = (id: string) => {
      if (id === cameraId) callback();
    };
    this.listeners.add(wrapped);
    return () => this.listeners.delete(wrapped);
  }
}

export const MockApi = new MockApiImpl();
