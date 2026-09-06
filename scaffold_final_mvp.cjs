const fs = require('fs');
const path = require('path');

const dirs = [
  'src/types',
  'src/data',
  'src/services',
  'src/api',
  'src/hooks',
  'src/components/camera'
];

dirs.forEach(d => {
  const p = path.join('d:/Pilgrim', d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

const files = {
  // TYPES
  'src/types/risk.ts': `export type RiskLevel = 'Normal' | 'Medium' | 'High' | 'Critical';\n`,
  'src/types/detection.ts': `export type BoundingBoxType = 'person' | 'police' | 'volunteer' | 'medical' | 'vehicle' | 'cluster' | 'chokepoint' | 'suspicious' | 'barricade' | 'queue' | 'vip' | 'children' | 'senior' | 'wheelchair' | 'other';
export interface BoundingBox { id: string; label: string; confidence: number; x: number; y: number; width: number; height: number; color: string; type: BoundingBoxType; velocity: { dx: number, dy: number }; }
`,
  'src/types/camera.ts': `import { RiskLevel } from './risk';
import { BoundingBox } from './detection';
export interface CameraMetrics { peopleCount: number; density: number; queueLength: number; averageSpeed: number; congestionIndex: number; }
export interface CameraState { cameraId: string; timestamp: number; isOnline: boolean; isRecording: boolean; aiEnabled: boolean; fps: number; resolution: string; health: number; detections: BoundingBox[]; metrics: CameraMetrics; risk: { score: number; level: RiskLevel; trend: 'rising'|'falling'|'stable' }; alerts: string[]; heatmap: { points: {x:number, y:number, intensity:number}[] }; }
`,
  'src/types/timeline.ts': `export interface CameraEvent { id: string; cameraId: string; timestamp: number; type: 'alert' | 'status' | 'detection' | 'risk' | 'incident'; message: string; severity: 'info' | 'warning' | 'critical'; }\n`,
  
  // DATA
  'src/data/simulationProfiles.ts': `export type SimulationProfileName = 'MorningRush' | 'HeavyQueue' | 'ParkingNormal' | 'InteriorCalm';
export interface ProfilePhase { startSec: number; endSec: number; baseDensity: number; events: string[]; }
export const SIMULATION_PROFILES: Record<SimulationProfileName, ProfilePhase[]> = {
  MorningRush: [ { startSec: 0, endSec: 20, baseDensity: 40, events: [] }, { startSec: 20, endSec: 45, baseDensity: 65, events: ['Queue Growing'] }, { startSec: 45, endSec: 9999, baseDensity: 85, events: ['Police Arrives', 'High Risk'] } ],
  HeavyQueue: [ { startSec: 0, endSec: 30, baseDensity: 80, events: ['Heavy Crowd'] }, { startSec: 30, endSec: 9999, baseDensity: 95, events: ['Medical Event'] } ],
  ParkingNormal: [ { startSec: 0, endSec: 9999, baseDensity: 20, events: ['Vehicle Movement'] } ],
  InteriorCalm: [ { startSec: 0, endSec: 9999, baseDensity: 30, events: [] } ]
};
`,
  'src/data/cameraManifest.ts': `import { CAMERA_FEEDS } from '../lib/data';
import { SimulationProfileName } from './simulationProfiles';
export interface StaticCamera { id: string; name: string; zone: string; lat: number; lng: number; orientation: string; videoSrc: string; profile: SimulationProfileName; }
const profiles: SimulationProfileName[] = ['MorningRush', 'HeavyQueue', 'ParkingNormal', 'InteriorCalm'];
export const CAMERA_MANIFEST: StaticCamera[] = CAMERA_FEEDS.map((feed, i) => ({
  ...feed, videoSrc: '/vid0' + ((i % 6) + 1) + '.mp4', profile: profiles[i % profiles.length]
}));
`,

  // SERVICES
  'src/services/DetectionStore.ts': `import { CameraState } from '../types/camera';
export class DetectionStoreImpl {
  private listeners: Set<() => void> = new Set();
  private states: Map<string, CameraState> = new Map();
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => this.listeners.delete(listener); };
  getSnapshot = (id: string) => this.states.get(id);
  update = (id: string, partial: Partial<CameraState>) => { const prev = this.states.get(id); if (prev) { this.states.set(id, { ...prev, ...partial }); this.listeners.forEach(l => l()); } };
  init = (id: string, state: CameraState) => { if (!this.states.has(id)) this.states.set(id, state); };
}
export const DetectionStore = new DetectionStoreImpl();
`,
  'src/api/MockApi.ts': `import { DetectionStore } from '../services/DetectionStore';
export const MockApi = {
  getCameraState: (id: string) => DetectionStore.getSnapshot(id),
  subscribeToCamera: (id: string, callback: () => void) => DetectionStore.subscribe(callback)
};
`,
  'src/hooks/useCameraState.ts': `import { useSyncExternalStore, useCallback } from 'react';
import { MockApi } from '../api/MockApi';
export function useCameraState(cameraId: string) {
  const subscribe = useCallback((l: any) => MockApi.subscribeToCamera(cameraId, l), [cameraId]);
  const getSnapshot = useCallback(() => MockApi.getCameraState(cameraId), [cameraId]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
`,
  
  'src/services/VisionEngine.ts': `import { StaticCamera } from '../data/cameraManifest';
import { BoundingBox } from '../types/detection';
import { SIMULATION_PROFILES } from '../data/simulationProfiles';
export const VisionEngine = {
  generate: (cam: StaticCamera, elapsedSec: number): BoundingBox[] => {
    const profile = SIMULATION_PROFILES[cam.profile];
    const phase = profile.find(p => elapsedSec >= p.startSec && elapsedSec < p.endSec) || profile[profile.length - 1];
    const dets: BoundingBox[] = [];
    const seed = cam.id.length + Math.floor(elapsedSec);
    const count = Math.floor(phase.baseDensity / 10);
    for(let i=0; i<count; i++) {
      dets.push({ id: 'P'+i, label: 'Person', type: 'person', confidence: 88, x: (seed*i)%80+10, y: (seed*i*2)%80+10, width: 10, height: 25, color: '#10B981', velocity: {dx:0, dy:0} });
    }
    return dets;
  }
};
`,
  'src/services/AIOrchestrator.ts': `import { CAMERA_MANIFEST } from '../data/cameraManifest';
import { DetectionStore } from './DetectionStore';
import { VisionEngine } from './VisionEngine';

export class AIOrchestratorImpl {
  private startTime = Date.now();
  private interval: any = null;

  init() {
    CAMERA_MANIFEST.forEach(cam => {
      DetectionStore.init(cam.id, {
        cameraId: cam.id, timestamp: Date.now(), isOnline: true, isRecording: true, aiEnabled: true, fps: 30, resolution: '4K', health: 100,
        detections: [], metrics: { peopleCount: 0, density: 0, queueLength: 0, averageSpeed: 0, congestionIndex: 0 },
        risk: { score: 0, level: 'Normal', trend: 'stable' }, alerts: [], heatmap: { points: [] }
      });
    });
    this.start();
  }

  start() { if (!this.interval) this.interval = setInterval(() => this.loop(), 1000); }
  stop() { clearInterval(this.interval); this.interval = null; }

  private loop() {
    const elapsedSec = (Date.now() - this.startTime) / 1000;
    CAMERA_MANIFEST.forEach(cam => {
      const detections = VisionEngine.generate(cam, elapsedSec);
      const density = Math.min(100, detections.length * 10);
      const riskLevel = density > 80 ? 'Critical' : density > 60 ? 'High' : density > 40 ? 'Medium' : 'Normal';
      DetectionStore.update(cam.id, {
        timestamp: Date.now(), detections, 
        metrics: { peopleCount: detections.length, density, queueLength: 0, averageSpeed: 1, congestionIndex: 0 },
        risk: { score: density, level: riskLevel as any, trend: 'stable' }
      });
    });
  }
}
export const AIOrchestrator = new AIOrchestratorImpl();
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join('d:/Pilgrim', filepath), content);
}
console.log('Successfully created all final MVP scaffold files.');
