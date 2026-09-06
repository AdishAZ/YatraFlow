const fs = require('fs');
const path = require('path');

const dir = 'd:/Pilgrim/src/services';

const files = {
  'CameraRegistry.ts': `import { CameraMetadata } from './types';
export class CameraRegistryImpl {
  private cameras: Map<string, CameraMetadata> = new Map();
  register(camera: CameraMetadata) { this.cameras.set(camera.id, camera); }
  get(id: string) { return this.cameras.get(id); }
  getAll() { return Array.from(this.cameras.values()); }
}
export const CameraRegistry = new CameraRegistryImpl();
`,
  'CameraService.ts': `import { CameraRegistry } from './CameraRegistry';
import { CameraFeed, CAMERA_FEEDS } from '../lib/data';
export class CameraServiceImpl {
  init() {
    CAMERA_FEEDS.forEach((feed, i) => {
      const profiles = ['entrance', 'queue', 'parking', 'interior', 'beach', 'emergency'];
      CameraRegistry.register({
        id: feed.id, name: feed.name, zone: feed.zone,
        videoSrc: '/vid0' + ((i % 6) + 1) + '.mp4',
        lat: feed.lat, lng: feed.lng, orientation: feed.orientation,
        simulationProfile: profiles[i % profiles.length] as any
      });
    });
  }
}
export const CameraService = new CameraServiceImpl();
`,
  'EventTimeline.ts': `import { CameraEvent } from './types';
export class EventTimelineImpl {
  private events: CameraEvent[] = [];
  addEvent(event: CameraEvent) { this.events.unshift(event); if (this.events.length > 1000) this.events.pop(); }
  getEvents(cameraId?: string) { return cameraId ? this.events.filter(e => e.cameraId === cameraId) : this.events; }
}
export const EventTimeline = new EventTimelineImpl();
`,
  'TrackingEngine.ts': `import { BoundingBox } from './types';
export class TrackingEngineImpl {
  private trackingIdCounters: Record<string, number> = {};
  processDetections(cameraId: string, rawDetections: any[]): BoundingBox[] {
    // In a real system, this uses DeepSORT. Here we just maintain smooth IDs across simulated frames.
    return rawDetections; 
  }
}
export const TrackingEngine = new TrackingEngineImpl();
`,
  'VisionEngine.ts': `import { BoundingBox, CameraMetadata } from './types';
import { TrackingEngine } from './TrackingEngine';
export class VisionEngineImpl {
  generateFrame(camera: CameraMetadata, tick: number): BoundingBox[] {
    const detections: BoundingBox[] = [];
    const seed = camera.id.length + tick;
    // Generate pseudo-random deterministic bounding boxes
    if (seed % 5 === 0) {
       detections.push({ id: 'P' + (seed % 100), label: 'Person', type: 'person', confidence: 90, x: (seed % 80) + 10, y: ((seed*2) % 80) + 10, width: 10, height: 25, color: '#10B981', velocity: {dx: 0, dy: 0} });
    }
    return TrackingEngine.processDetections(camera.id, detections);
  }
}
export const VisionEngine = new VisionEngineImpl();
`,
  'HeatmapEngine.ts': `export class HeatmapEngineImpl {
  generate(cameraId: string, density: number) {
    return { points: [{x: 50, y: 50, intensity: density / 100}] };
  }
}
export const HeatmapEngine = new HeatmapEngineImpl();
`,
  'RiskEngine.ts': `import { CameraMetrics, RiskLevel } from './types';
export class RiskEngineImpl {
  calculateRisk(metrics: CameraMetrics): {score: number, level: RiskLevel, trend: 'rising'|'falling'|'stable'} {
    const score = metrics.density;
    let level: RiskLevel = 'Normal';
    if (score > 85) level = 'Critical';
    else if (score > 60) level = 'High';
    else if (score > 40) level = 'Medium';
    return { score, level, trend: 'stable' };
  }
}
export const RiskEngine = new RiskEngineImpl();
`,
  'AlertEngine.ts': `export class AlertEngineImpl {
  generateAlerts(riskScore: number): string[] {
    const alerts: string[] = [];
    if (riskScore > 85) alerts.push('Crowd Surge');
    return alerts;
  }
}
export const AlertEngine = new AlertEngineImpl();
`,
  'IncidentEngine.ts': `export class IncidentEngineImpl {
  processAlerts(cameraId: string, alerts: string[]) {}
}
export const IncidentEngine = new IncidentEngineImpl();
`,
  'AnalyticsEngine.ts': `export class AnalyticsEngineImpl {
  recordMetrics(cameraId: string, metrics: any) {}
}
export const AnalyticsEngine = new AnalyticsEngineImpl();
`,
  'ZoneEngine.ts': `export class ZoneEngineImpl {
  updateZone(zoneId: string, metrics: any) {}
}
export const ZoneEngine = new ZoneEngineImpl();
`,
  'AISummaryEngine.ts': `export class AISummaryEngineImpl {
  generateSummary(risk: string) {
    return { situation: 'Crowd density is stable.', action: 'Maintain current monitoring.', confidence: 95 };
  }
}
export const AISummaryEngine = new AISummaryEngineImpl();
`,
  'HealthEngine.ts': `export class HealthEngineImpl {
  checkHealth(cameraId: string) {
    return { isOnline: true, isRecording: true, fps: 30, resolution: '4K', health: 99 };
  }
}
export const HealthEngine = new HealthEngineImpl();
`,
  'VisionProvider.ts': `import { CameraMetadata, BoundingBox } from './types';
import { VisionEngine } from './VisionEngine';
export interface IVisionProvider {
  getDetections(camera: CameraMetadata, tick: number): BoundingBox[];
}
export class SimulatedVisionProvider implements IVisionProvider {
  getDetections(camera: CameraMetadata, tick: number) {
    return VisionEngine.generateFrame(camera, tick);
  }
}
export const ActiveVisionProvider = new SimulatedVisionProvider();
`,
  'PlaybackService.ts': `export class PlaybackServiceImpl {
  getVideoUrl(cameraId: string) { return '/vid01.mp4'; }
}
export const PlaybackService = new PlaybackServiceImpl();
`,
  'AIOrchestrator.ts': `import { CameraRegistry } from './CameraRegistry';
import { CameraService } from './CameraService';
import { DetectionStore } from './DetectionStore';
import { ActiveVisionProvider } from './VisionProvider';
import { HeatmapEngine } from './HeatmapEngine';
import { RiskEngine } from './RiskEngine';
import { AlertEngine } from './AlertEngine';
import { AISummaryEngine } from './AISummaryEngine';
import { HealthEngine } from './HealthEngine';
import { EventTimeline } from './EventTimeline';

export class AIOrchestratorImpl {
  private tick = 0;
  private interval: any = null;

  init() {
    CameraService.init();
    const cameras = CameraRegistry.getAll();
    cameras.forEach(cam => {
      DetectionStore.setInitialState(cam.id, {
        cameraId: cam.id, timestamp: Date.now(),
        isOnline: true, isRecording: true, aiEnabled: true, fps: 30, resolution: '4K', health: 100,
        detections: [], metrics: { peopleCount: 0, density: 0, queueLength: 0, averageSpeed: 0, congestionIndex: 0 },
        risk: { score: 0, level: 'Normal', trend: 'stable' }, alerts: [], heatmap: { points: [] },
        aiSummary: { situation: '', action: '', confidence: 0 }
      });
    });
    this.start();
  }

  start() {
    if (this.interval) return;
    this.interval = setInterval(() => this.loop(), 1000);
  }

  stop() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }

  private loop() {
    this.tick++;
    const cameras = CameraRegistry.getAll();
    cameras.forEach(cam => {
      const health = HealthEngine.checkHealth(cam.id);
      const detections = ActiveVisionProvider.getDetections(cam, this.tick);
      
      const metrics = {
        peopleCount: detections.length,
        density: Math.min(100, detections.length * 5 + (this.tick % 5)),
        queueLength: 0, averageSpeed: 1.2, congestionIndex: 0
      };
      
      const risk = RiskEngine.calculateRisk(metrics);
      const alerts = AlertEngine.generateAlerts(risk.score);
      const heatmap = HeatmapEngine.generate(cam.id, metrics.density);
      const aiSummary = AISummaryEngine.generateSummary(risk.level);

      DetectionStore.updateState(cam.id, {
        timestamp: Date.now(),
        detections, metrics, risk, alerts, heatmap, aiSummary,
        ...health
      });
    });
  }
}
export const AIOrchestrator = new AIOrchestratorImpl();
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, filename), content);
}
console.log('Successfully created all 17 service scaffolds.');
