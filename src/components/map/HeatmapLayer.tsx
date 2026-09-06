import { Circle } from 'react-leaflet';
import L from 'leaflet';

interface HeatPoint {
  id: string;
  x: number;
  y: number;
  intensity: 'critical' | 'high' | 'medium' | 'low';
  label?: string;
}

interface HeatmapLayerProps {
  points: HeatPoint[];
  overrides?: Record<string, 'critical' | 'high' | 'medium' | 'low'>;
}

// Adjusted radius to map units (pixels on CRS.Simple)
const INTENSITY_CONFIG = {
  critical: { color: '#DC2626', fillColor: '#EF4444', radius: 180, fillOpacity: 0.35, weight: 2, opacity: 0.6 },
  high:     { color: '#EA580C', fillColor: '#FB923C', radius: 130, fillOpacity: 0.28, weight: 1, opacity: 0.5 },
  medium:   { color: '#D97706', fillColor: '#FCD34D', radius: 90, fillOpacity: 0.20, weight: 1, opacity: 0.4 },
  low:      { color: '#16A34A', fillColor: '#4ADE80', radius: 60, fillOpacity: 0.12, weight: 0, opacity: 0.25 },
};

export default function HeatmapLayer({ points, overrides = {} }: HeatmapLayerProps) {
  return (
    <>
      {points.map(pt => {
        const effectiveIntensity = overrides[pt.id] || pt.intensity;
        const cfg = INTENSITY_CONFIG[effectiveIntensity];
        return (
          <Circle
            key={pt.id}
            center={[pt.y, pt.x] as L.LatLngExpression}
            radius={cfg.radius}
            pathOptions={{
              color: cfg.color,
              fillColor: cfg.fillColor,
              fillOpacity: cfg.fillOpacity,
              weight: cfg.weight,
              opacity: cfg.opacity,
            }}
          />
        );
      })}
    </>
  );
}
