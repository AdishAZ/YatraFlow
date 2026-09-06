export type RiskLevel = 'Normal' | 'Medium' | 'High' | 'Critical';
export type BoundingBoxType = 'person' | 'police' | 'volunteer' | 'medical' | 'vehicle' | 'cluster' | 'chokepoint' | 'suspicious' | 'barricade' | 'queue' | 'vip' | 'children' | 'senior' | 'wheelchair' | 'other';

export interface BoundingBox {
  id: string; // Tracking ID e.g., 'Person #128'
  label: string;
  confidence: number;
  x: number; // percentage 0-100
  y: number;
  width: number;
  height: number;
  color: string;
  type: BoundingBoxType;
  velocity: { dx: number, dy: number };
  metadata?: any;
}

export interface CameraMetrics {
  peopleCount: number;
  density: number; // 0-100
  queueLength: number;
  averageSpeed: number; // m/s
  congestionIndex: number;
}

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
  metrics: CameraMetrics;
  risk: {
    score: number; // 0-100
    level: RiskLevel;
    trend: 'rising' | 'falling' | 'stable';
  };
  alerts: string[]; // Active operational alerts
  heatmap: {
    points: {x: number, y: number, intensity: number}[];
  };
  aiSummary: {
    situation: string;
    action: string;
    confidence: number;
  };
}

export interface CameraEvent {
  id: string;
  cameraId: string;
  timestamp: number;
  type: 'alert' | 'status' | 'detection' | 'risk' | 'incident';
  message: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface CameraMetadata {
  id: string;
  name: string;
  zone: string;
  videoSrc: string; // The assigned looping video
  lat: number;
  lng: number;
  orientation: string;
  simulationProfile: 'entrance' | 'queue' | 'parking' | 'interior' | 'beach' | 'emergency';
}
