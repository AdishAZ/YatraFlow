import type { RiskLevel } from './risk';
import type { BoundingBox, PolygonZone } from './detection';
export interface CameraMetrics { peopleCount: number; density: number; queueLength: number; averageSpeed: number; congestionIndex: number; }
export interface CameraState { 
  cameraId: string; 
  timestamp: number; 
  isOnline: boolean; 
  isRecording: boolean; 
  aiEnabled: boolean; 
  fps: number; 
  resolution: string; 
  health: number; 
  detections: BoundingBox[]; 
  polygons: PolygonZone[];
  metrics: CameraMetrics; 
  risk: { score: number; level: RiskLevel; trend: 'rising'|'falling'|'stable' }; 
  alerts: string[]; 
  heatmap: { points: {x:number, y:number, intensity:number}[] }; 
}
