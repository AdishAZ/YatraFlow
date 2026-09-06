import { CircleMarker } from 'react-leaflet';

interface IncidentPin {
  id: string;
  title: string;
  x: number;
  y: number;
  severity: string;
}

interface IncidentPinsProps {
  incidents: IncidentPin[];
  onPinClick?: (id: string) => void;
}

const SEVERITY_COLOR: Record<string, string> = {
  Critical: '#DC2626',
  High:     '#EA580C',
  Medium:   '#D97706',
  Low:      '#16A34A',
};

// approximate zone-to-coordinate lookup for Somnath
const ZONE_COORDS: Record<string, [number, number]> = {
  'North Gate':  [840, 435],
  'VIP Gate':    [750, 380],
  'Main Mandap': [580, 610],
  'Temple Exit': [700, 560],
};

export default function IncidentPins({ incidents, onPinClick }: IncidentPinsProps) {
  return (
    <>
      {incidents.map((inc, i) => {
        const color = SEVERITY_COLOR[inc.severity] || '#6B7280';
        // spread pins slightly if coords same
        const offset = i * 15;
        const coords = ZONE_COORDS['North Gate']; // fallback
        return (
          <CircleMarker
            key={inc.id}
            center={[inc.y + offset, inc.x + offset]}
            radius={10}
            pathOptions={{ color, fillColor: color, fillOpacity: 0.9, weight: 2 }}
            eventHandlers={{ click: () => onPinClick?.(inc.id) }}
          />
        );
      })}
    </>
  );
}
