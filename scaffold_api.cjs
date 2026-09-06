const fs = require('fs');
const path = require('path');

const configDir = 'd:/Pilgrim/src/config';
const apiDir = 'd:/Pilgrim/src/api';
const hookDir = 'd:/Pilgrim/src/hooks';

if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });

const files = {
  // CONFIG
  'src/config/appConfig.ts': `export const appConfig = {
  dataSourceMode: 'simulation', // 'simulation' | 'production'
  backendUrl: 'http://localhost:8000',
};
`,

  // API
  'src/api/DataSource.ts': `import { CameraState } from '../types/camera';
export interface IDataSource {
  getCameraState(cameraId: string): CameraState | undefined;
  subscribeToCamera(cameraId: string, callback: () => void): () => void;
}
`,
  'src/api/SimulationDataSource.ts': `import { IDataSource } from './DataSource';
import { DetectionStore } from '../services/DetectionStore';
import { CameraState } from '../types/camera';

class SimulationDataSourceImpl implements IDataSource {
  getCameraState(cameraId: string): CameraState | undefined {
    return DetectionStore.getSnapshot(cameraId);
  }
  subscribeToCamera(cameraId: string, callback: () => void): () => void {
    return DetectionStore.subscribe(callback);
  }
}
export const SimulationDataSource = new SimulationDataSourceImpl();
`,
  'src/api/index.ts': `import { appConfig } from '../config/appConfig';
import { IDataSource } from './DataSource';
import { SimulationDataSource } from './SimulationDataSource';

// Export the active data source based on config
export const ActiveDataSource: IDataSource = appConfig.dataSourceMode === 'simulation' 
  ? SimulationDataSource 
  : SimulationDataSource; // Fallback to simulation if prod isn't implemented yet
`,

  // HOOKS
  'src/hooks/useCameraState.ts': `import { useSyncExternalStore, useCallback } from 'react';
import { ActiveDataSource } from '../api';

export function useCameraState(cameraId: string) {
  const subscribe = useCallback((l: any) => ActiveDataSource.subscribeToCamera(cameraId, l), [cameraId]);
  const getSnapshot = useCallback(() => ActiveDataSource.getCameraState(cameraId), [cameraId]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
`
};

for (const [filepath, content] of Object.entries(files)) {
  fs.writeFileSync(path.join('d:/Pilgrim', filepath), content);
}
console.log('Successfully created DataSource abstractions and hooks.');
