const fs = require('fs');
const path = require('path');

const srvDir = 'd:/Pilgrim/src/services';
const hookDir = 'd:/Pilgrim/src/hooks';
const compDir = 'd:/Pilgrim/src/components/camera';

[srvDir, hookDir, compDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const files = {
  // SERVICES
  'src/services/DetectionStore.ts': `import { CameraState } from './types';
export class DetectionStoreImpl {
  private listeners: Set<() => void> = new Set();
  private states: Map<string, CameraState> = new Map();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  getSnapshot = (id: string) => this.states.get(id);
  getAll = () => Array.from(this.states.values());
  update = (id: string, partial: Partial<CameraState>) => {
    const prev = this.states.get(id);
    if (!prev) return;
    this.states.set(id, { ...prev, ...partial });
    this.listeners.forEach(l => l());
  };
  init = (id: string, state: CameraState) => {
    if (!this.states.has(id)) this.states.set(id, state);
  };
}
export const DetectionStore = new DetectionStoreImpl();
`,
  'src/services/CameraRegistry.ts': `import { CameraMetadata } from './types';
import { CAMERA_FEEDS } from '../lib/data';

class CameraRegistryImpl {
  private cameras: Map<string, CameraMetadata> = new Map();
  init() {
    const profiles = ['entrance', 'queue', 'parking', 'interior', 'beach', 'emergency'] as const;
    CAMERA_FEEDS.forEach((feed, i) => {
      this.cameras.set(feed.id, {
        id: feed.id, name: feed.name, zone: feed.zone,
        videoSrc: '/vid0' + ((i % 6) + 1) + '.mp4',
        lat: feed.lat, lng: feed.lng, orientation: feed.orientation,
        simulationProfile: profiles[i % profiles.length]
      });
    });
  }
  get(id: string) { return this.cameras.get(id); }
  getAll() { return Array.from(this.cameras.values()); }
}
export const CameraRegistry = new CameraRegistryImpl();
`,
  'src/services/TrackingEngine.ts': `import { BoundingBox } from './types';
export class TrackingEngineImpl {
  process(cameraId: string, dets: BoundingBox[]) { return dets; }
}
export const TrackingEngine = new TrackingEngineImpl();
`,
  'src/services/VisionEngine.ts': `import { BoundingBox, CameraMetadata } from './types';
import { TrackingEngine } from './TrackingEngine';
export class VisionEngineImpl {
  generate(cam: CameraMetadata, tick: number): BoundingBox[] {
    const dets: BoundingBox[] = [];
    const seed = cam.id.length + tick;
    if (seed % 3 === 0) {
      dets.push({ id: 'P'+(seed%100), label: 'Person', type: 'person', confidence: 88, x: (seed%80)+10, y: ((seed*2)%80)+10, width: 15, height: 35, color: '#10B981', velocity: {dx:0, dy:0} });
    }
    return TrackingEngine.process(cam.id, dets);
  }
}
export const VisionEngine = new VisionEngineImpl();
`,
  'src/services/RiskEngine.ts': `import { CameraMetrics, RiskLevel } from './types';
export class RiskEngineImpl {
  calculate(m: CameraMetrics): {score: number, level: RiskLevel, trend: 'stable'} {
    return { score: m.density, level: m.density > 80 ? 'Critical' : m.density > 60 ? 'High' : m.density > 40 ? 'Medium' : 'Normal', trend: 'stable' };
  }
}
export const RiskEngine = new RiskEngineImpl();
`,
  'src/services/AlertEngine.ts': `export class AlertEngineImpl {
  generate(score: number): string[] { return score > 80 ? ['High Density'] : []; }
}
export const AlertEngine = new AlertEngineImpl();
`,
  'src/services/HeatmapEngine.ts': `export class HeatmapEngineImpl {
  generate(id: string, density: number) { return { points: [] }; }
}
export const HeatmapEngine = new HeatmapEngineImpl();
`,
  'src/services/IncidentEngine.ts': `export class IncidentEngineImpl {
  process(id: string, alerts: string[]) {}
}
export const IncidentEngine = new IncidentEngineImpl();
`,
  'src/services/EventTimeline.ts': `import { CameraEvent } from './types';
export class EventTimelineImpl {
  events: CameraEvent[] = [];
  add(e: CameraEvent) { this.events.unshift(e); if (this.events.length > 1000) this.events.pop(); }
}
export const EventTimeline = new EventTimelineImpl();
`,
  'src/services/PlaybackService.ts': `export class PlaybackServiceImpl {
  // In a real app, this would handle caching and synchronization
}
export const PlaybackService = new PlaybackServiceImpl();
`,
  'src/services/AIOrchestrator.ts': `import { CameraRegistry } from './CameraRegistry';
import { DetectionStore } from './DetectionStore';
import { VisionEngine } from './VisionEngine';
import { RiskEngine } from './RiskEngine';
import { AlertEngine } from './AlertEngine';
import { HeatmapEngine } from './HeatmapEngine';

export class AIOrchestratorImpl {
  private tick = 0;
  private interval: any = null;

  init() {
    CameraRegistry.init();
    CameraRegistry.getAll().forEach(cam => {
      DetectionStore.init(cam.id, {
        cameraId: cam.id, timestamp: Date.now(), isOnline: true, isRecording: true, aiEnabled: true, fps: 30, resolution: '4K', health: 100,
        detections: [], metrics: { peopleCount: 0, density: 0, queueLength: 0, averageSpeed: 0, congestionIndex: 0 },
        risk: { score: 0, level: 'Normal', trend: 'stable' }, alerts: [], heatmap: { points: [] },
        aiSummary: { situation: 'Stable', action: 'None', confidence: 99 }
      });
    });
    this.start();
  }

  start() {
    if (this.interval) return;
    this.interval = setInterval(() => this.loop(), 1000);
  }

  stop() { clearInterval(this.interval); this.interval = null; }

  private loop() {
    this.tick++;
    CameraRegistry.getAll().forEach(cam => {
      const detections = VisionEngine.generate(cam, this.tick);
      const density = Math.min(100, detections.length * 5 + (this.tick % 5));
      const metrics = { peopleCount: detections.length, density, queueLength: 0, averageSpeed: 1, congestionIndex: 0 };
      const risk = RiskEngine.calculate(metrics);
      const alerts = AlertEngine.generate(risk.score);
      const heatmap = HeatmapEngine.generate(cam.id, density);

      DetectionStore.update(cam.id, {
        timestamp: Date.now(), detections, metrics, risk, alerts, heatmap
      });
    });
  }
}
export const AIOrchestrator = new AIOrchestratorImpl();
`,

  // HOOKS
  'src/hooks/useCameraState.ts': `import { useSyncExternalStore, useCallback } from 'react';
import { DetectionStore } from '../services/DetectionStore';
export function useCameraState(cameraId: string) {
  const subscribe = useCallback((l: any) => DetectionStore.subscribe(l), []);
  const getSnapshot = useCallback(() => DetectionStore.getSnapshot(cameraId), [cameraId]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
`,
  'src/hooks/useAISummary.ts': `import { useCameraState } from './useCameraState';
export function useAISummary(cameraId: string) {
  const state = useCameraState(cameraId);
  if (!state) return { situation: 'Loading...', action: 'Please wait' };
  const r = state.risk.level;
  if (r === 'Critical') return { situation: 'Critical overcrowding detected.', action: 'Deploy emergency response teams.' };
  if (r === 'High') return { situation: 'High density forming.', action: 'Monitor closely and dispatch volunteers.' };
  return { situation: 'Normal flow.', action: 'Maintain current posture.' };
}
`,
  'src/hooks/useCameraHealth.ts': `import { useCameraState } from './useCameraState';
export function useCameraHealth(cameraId: string) {
  const state = useCameraState(cameraId);
  if (!state) return { fps: 0, packetLoss: 0, status: 'Offline' };
  return { fps: state.fps, packetLoss: state.health < 90 ? 2 : 0, status: state.isOnline ? 'Online' : 'Offline' };
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join('d:/Pilgrim', filepath), content);
}
console.log('Successfully created scaffold files.');
