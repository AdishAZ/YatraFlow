const fs = require('fs');
const path = require('path');

const compDir = 'd:/Pilgrim/src/components/camera';

const files = {
  'AIVisionOverlay.tsx': `import { useCameraState } from '../../hooks/useCameraState';
import { AlertTriangle } from 'lucide-react';

export function AIVisionOverlay({ cameraId }: { cameraId: string }) {
  const state = useCameraState(cameraId);
  if (!state) return null;

  return (
    <div className="absolute inset-0 pointer-events-none p-2 z-10">
      {state.detections.map(det => {
        let borderColor = 'border-emerald-400';
        let bgColor = 'bg-emerald-500/10';
        let badgeColor = 'bg-emerald-500/90 text-black';
        
        if (det.type === 'police') {
          borderColor = 'border-blue-400'; bgColor = 'bg-blue-500/10'; badgeColor = 'bg-blue-500/90 text-white';
        } else if (det.type === 'chokepoint') {
          borderColor = 'border-orange-500 border-[2px]'; bgColor = 'bg-orange-500/20'; badgeColor = 'bg-orange-500 text-white';
        } else if (det.type === 'suspicious') {
          borderColor = 'border-red-500 border-[2px]'; bgColor = 'bg-red-500/20'; badgeColor = 'bg-red-600 text-white animate-pulse';
        }

        return (
          <div key={det.id} className={\`absolute border-[1.5px] \${borderColor} \${bgColor} transition-all duration-300\`} style={{ left: \`\${det.x}%\`, top: \`\${det.y}%\`, width: \`\${det.width}%\`, height: \`\${det.height}%\` }}>
            <span className={\`absolute -top-[14px] left-[-1px] \${badgeColor} text-[8px] font-black px-1 py-0.5 tracking-widest uppercase backdrop-blur-sm whitespace-nowrap flex items-center gap-1\`}>
              {det.type === 'chokepoint' || det.type === 'suspicious' ? <AlertTriangle className="w-2 h-2"/> : null}
              {det.label} {det.confidence}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
`,
  'OverlayHUD.tsx': `import { useCameraState } from '../../hooks/useCameraState';
import { CAMERA_MANIFEST } from '../../data/cameraManifest';

export function OverlayHUD({ cameraId }: { cameraId: string }) {
  const state = useCameraState(cameraId);
  const cam = CAMERA_MANIFEST.find(c => c.id === cameraId);
  if (!state || !cam) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-2">
      <div className="flex justify-between items-start">
        {/* Top Left Metadata */}
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-1.5 rounded text-[8px] font-mono text-slate-300">
          <div className="flex items-center gap-1.5 mb-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/> <span className="font-black text-white">LIVE</span></div>
          <div>{cam.id} | {state.fps} FPS | {state.resolution}</div>
          <div className="truncate w-32">{cam.name}</div>
        </div>
        {/* Top Right AI Status */}
        {state.aiEnabled && (
          <div className="bg-emerald-900/80 border border-emerald-500/50 p-1.5 rounded text-[8px] font-mono text-emerald-400 text-right">
            <div className="font-black text-emerald-300 uppercase tracking-widest">YOLO11 Active</div>
            <div>Track ID Stable</div>
          </div>
        )}
      </div>

      {/* Bottom Metrics */}
      <div className="flex justify-between items-end">
        <div className="bg-black/80 backdrop-blur-md px-1.5 py-1 rounded border border-white/10 flex flex-col items-center justify-center min-w-[36px]">
          <div className="text-[8px] uppercase text-slate-300 font-bold">Risk</div>
          <div className={\`text-[10px] font-black \${state.risk.level === 'Critical' ? 'text-red-400' : state.risk.level === 'High' ? 'text-orange-400' : state.risk.level === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}\`}>{state.risk.score}</div>
        </div>
        <div className="bg-black/80 backdrop-blur-md border border-white/10 p-1.5 rounded text-[8px] font-mono text-slate-300 text-right">
          <div>Persons: <span className="text-white ml-1">{state.metrics.peopleCount}</span></div>
          <div>Density: <span className="text-white ml-1">{state.metrics.density}%</span></div>
          <div className={\`mt-0.5 pt-0.5 border-t border-white/10 \${state.alerts.length > 0 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}\`}>
            {state.alerts.length > 0 ? state.alerts[0] : 'System Normal'}
          </div>
        </div>
      </div>
    </div>
  );
}
`,
  'CameraPlayer.tsx': `import { CAMERA_MANIFEST } from '../../data/cameraManifest';
import { AIVisionOverlay } from './AIVisionOverlay';
import { OverlayHUD } from './OverlayHUD';

export function CameraPlayer({ cameraId, showHUD = true }: { cameraId: string, showHUD?: boolean }) {
  const cam = CAMERA_MANIFEST.find(c => c.id === cameraId);
  if (!cam) return <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500">Camera Offline</div>;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden group">
      <video
        src={cam.videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <AIVisionOverlay cameraId={cameraId} />
      {showHUD && <OverlayHUD cameraId={cameraId} />}
    </div>
  );
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(compDir, filepath), content);
}
console.log('Successfully created UI components.');
