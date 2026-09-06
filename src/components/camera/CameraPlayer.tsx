import { CAMERA_MANIFEST } from '../../data/cameraManifest';
import { OperationalOverlay } from './OperationalOverlay';
import { OverlayHUD } from './OverlayHUD';

export function CameraPlayer({ cameraId, showHUD = true }: { cameraId: string, showHUD?: boolean }) {
  const cam = CAMERA_MANIFEST.find(c => c.id === cameraId);
  if (!cam) return <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-500">Camera Offline</div>;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden group">
      <video
        src={cam.videoPath}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <OperationalOverlay cameraId={cameraId} />
      {showHUD && <OverlayHUD cameraId={cameraId} />}
    </div>
  );
}
