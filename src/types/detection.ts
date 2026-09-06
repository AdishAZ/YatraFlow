export type DetectionClass = 'person' | 'police' | 'volunteer' | 'medical' | 'vehicle' | 'cluster' | 'chokepoint' | 'suspicious' | 'barricade' | 'queue' | 'vip' | 'restricted' | 'other';

export interface Point {
  x: number;
  y: number;
}

export interface BoundingBox {
  id: string; // e.g., P-101
  label: string;
  confidence: number; // 0 - 100
  x: number; // Percentage 0-100
  y: number;
  width: number;
  height: number;
  color: string;
  type: DetectionClass;
  velocity?: { dx: number, dy: number }; // Direction and magnitude
  alert?: boolean; // If true, pulses red/orange
}

export interface PolygonZone {
  id: string;
  label: string;
  type: 'queue' | 'cluster' | 'restricted' | 'heatmap';
  points: Point[]; // Array of {x,y} percentages
  color: string;
  opacity: number;
  intensity?: number; // Used for heatmaps
}

export interface CameraDetections {
  boxes: BoundingBox[];
  polygons: PolygonZone[];
}
