import { useState, useEffect } from 'react';
import { MockApi } from '../api/MockApi';
import type { CameraState } from '../api/MockApi';

export function useCameraState(cameraId: string): CameraState | undefined {
  const [state, setState] = useState<CameraState | undefined>(MockApi.getCameraState(cameraId));

  useEffect(() => {
    // Initial fetch in case it was updated right before mounting
    setState(MockApi.getCameraState(cameraId));

    // Subscribe to live drifting metrics
    const unsubscribe = MockApi.subscribeToCamera(cameraId, () => {
      setState({ ...MockApi.getCameraState(cameraId)! }); // trigger re-render
    });

    return () => unsubscribe();
  }, [cameraId]);

  return state;
}
