import { useCameraState } from '../../hooks/useCameraState';
import type { OverlayPolygon } from '../../data/simulationProfiles';

function PolygonLayer({ poly }: { poly: OverlayPolygon }) {
  if (poly.points.length === 0) return null;
  const pointsStr = poly.points.map(p => `${p.x}%,${p.y}%`).join(' ');
  
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id={`hatch-${poly.color.replace('#', '')}`} patternUnits="userSpaceOnUse" width="6" height="6">
            <path d="M-1,1 l2,-2 M0,6 l6,-6 M5,7 l2,-2" style={{ stroke: poly.color, strokeWidth: 1.5, opacity: 0.5 }} />
          </pattern>
        </defs>
        <polygon 
          points={pointsStr} 
          fill={`url(#hatch-${poly.color.replace('#', '')})`}
          stroke={poly.color} 
          strokeWidth="2" 
          strokeOpacity="0.8"
        />
      </svg>
    </div>
  );
}

export function OperationalOverlay({ cameraId }: { cameraId: string }) {
  const state = useCameraState(cameraId);
  if (!state) return null;

  const { primaryOverlay } = state.scenario;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {primaryOverlay && <PolygonLayer poly={primaryOverlay} />}
    </div>
  );
}
