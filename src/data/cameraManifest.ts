export type SimulationProfileName = 'MorningRush' | 'NormalOperations' | 'VIPArrival' | 'ClosingTime' | 'FestivalPeak' | 'MedicalEmergency' | 'VehicleCongestion';

export interface CameraManifestEntry {
  id: string;
  name: string;
  location: string;
  zone: string;
  orientation: string;
  status: 'Online' | 'Offline' | 'Degraded';
  videoPath: string;
  simulationProfile: SimulationProfileName;
}

export const CAMERA_MANIFEST: CameraManifestEntry[] = [
  // Somnath
  { id: 'CAM-SOM-01', name: 'North Gate', location: 'Somnath Entry', zone: 'Entry', orientation: 'North', status: 'Online', videoPath: '/vid01.mp4', simulationProfile: 'MorningRush' },
  { id: 'CAM-SOM-02', name: 'Security Check', location: 'Digvijay Dwar', zone: 'Security', orientation: 'South', status: 'Online', videoPath: '/vid02.mp4', simulationProfile: 'NormalOperations' },
  { id: 'CAM-SOM-03', name: 'VIP Gate', location: 'Protocol Corridor', zone: 'VIP', orientation: 'East', status: 'Online', videoPath: '/vid03.mp4', simulationProfile: 'VIPArrival' },
  { id: 'CAM-SOM-04', name: 'Main Mandap', location: 'Garbhagriha', zone: 'Sanctum', orientation: 'Center', status: 'Online', videoPath: '/vid04.mp4', simulationProfile: 'FestivalPeak' },
  { id: 'CAM-SOM-05', name: 'Temple Exit', location: 'Sagar Darshan', zone: 'Exit', orientation: 'West', status: 'Online', videoPath: '/vid05.mp4', simulationProfile: 'ClosingTime' },
  { id: 'CAM-SOM-06', name: 'Parking Lot B', location: 'Vehicle Hub', zone: 'Parking', orientation: 'North', status: 'Online', videoPath: '/vid06.mp4', simulationProfile: 'VehicleCongestion' },
  // Dwarka
  { id: 'CAM-DWK-01', name: 'Moksha Dwar', location: 'North Entry', zone: 'Entry', orientation: 'North', status: 'Online', videoPath: '/vid01.mp4', simulationProfile: 'MorningRush' },
  { id: 'CAM-DWK-02', name: 'Bazaar Scanner', location: 'Market Route', zone: 'Security', orientation: 'East', status: 'Online', videoPath: '/vid02.mp4', simulationProfile: 'NormalOperations' },
  { id: 'CAM-DWK-03', name: 'Sharda Peeth Gate', location: 'VIP Access', zone: 'VIP', orientation: 'West', status: 'Online', videoPath: '/vid03.mp4', simulationProfile: 'VIPArrival' },
  { id: 'CAM-DWK-04', name: 'Jagat Mandir', location: 'Core Sanctum', zone: 'Sanctum', orientation: 'Center', status: 'Online', videoPath: '/vid04.mp4', simulationProfile: 'FestivalPeak' },
  { id: 'CAM-DWK-05', name: '56 Steps Descent', location: 'Gomti Ghat', zone: 'Exit', orientation: 'South', status: 'Online', videoPath: '/vid05.mp4', simulationProfile: 'MedicalEmergency' },
  { id: 'CAM-DWK-06', name: 'Gomti Parking', location: 'South Lot', zone: 'Parking', orientation: 'South', status: 'Online', videoPath: '/vid06.mp4', simulationProfile: 'VehicleCongestion' },
  // Ambaji
  { id: 'CAM-AMB-01', name: 'Shakti Dwar', location: 'Main Entrance', zone: 'Entry', orientation: 'North', status: 'Online', videoPath: '/vid01.mp4', simulationProfile: 'MorningRush' },
  { id: 'CAM-AMB-02', name: 'Baggage Scanner', location: 'Chachar Chowk', zone: 'Security', orientation: 'East', status: 'Online', videoPath: '/vid02.mp4', simulationProfile: 'NormalOperations' },
  { id: 'CAM-AMB-03', name: 'Trust Wing VIP', location: 'Admin Gate', zone: 'VIP', orientation: 'West', status: 'Online', videoPath: '/vid03.mp4', simulationProfile: 'VIPArrival' },
  { id: 'CAM-AMB-04', name: 'Visoyantra Darshan', location: 'Sanctum', zone: 'Sanctum', orientation: 'Center', status: 'Online', videoPath: '/vid04.mp4', simulationProfile: 'FestivalPeak' },
  { id: 'CAM-AMB-05', name: 'Ropeway Base', location: 'Gabbar Hill', zone: 'Exit', orientation: 'South', status: 'Online', videoPath: '/vid05.mp4', simulationProfile: 'ClosingTime' },
  { id: 'CAM-AMB-06', name: 'Central Parking', location: 'Multi-Level', zone: 'Parking', orientation: 'North', status: 'Online', videoPath: '/vid06.mp4', simulationProfile: 'VehicleCongestion' },
  // Pavagadh
  { id: 'CAM-PVG-01', name: 'Machi Base Gate', location: 'Hill Entrance', zone: 'Entry', orientation: 'North', status: 'Online', videoPath: '/vid01.mp4', simulationProfile: 'MorningRush' },
  { id: 'CAM-PVG-02', name: 'Ropeway Security', location: 'Lower Terminal', zone: 'Security', orientation: 'East', status: 'Online', videoPath: '/vid02.mp4', simulationProfile: 'NormalOperations' },
  { id: 'CAM-PVG-03', name: 'Helipad Access', location: 'VIP Route', zone: 'VIP', orientation: 'West', status: 'Online', videoPath: '/vid03.mp4', simulationProfile: 'VIPArrival' },
  { id: 'CAM-PVG-04', name: 'Mahakali Summit', location: 'Peak Sanctum', zone: 'Sanctum', orientation: 'Center', status: 'Online', videoPath: '/vid04.mp4', simulationProfile: 'FestivalPeak' },
  { id: 'CAM-PVG-05', name: 'Heritage Steps', location: 'Dudhia Talav', zone: 'Exit', orientation: 'South', status: 'Online', videoPath: '/vid05.mp4', simulationProfile: 'MedicalEmergency' },
  { id: 'CAM-PVG-06', name: 'Champaner Staging', location: 'Heavy Bus Yard', zone: 'Parking', orientation: 'North', status: 'Online', videoPath: '/vid06.mp4', simulationProfile: 'VehicleCongestion' },
];
