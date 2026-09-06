import type { SimulationProfileName } from './cameraManifest';

export interface OverlayPolygon {
  type: 'QUEUE BUILDUP' | 'HIGH DENSITY' | 'BARRICADE' | 'RESTRICTED AREA' | 'MEDICAL RESPONSE' | 'VIP ROUTE' | 'POLICE DEPLOYED' | 'ENTRY GATE' | 'EXIT GATE' | 'FLOW RESTRICTED';
  points: {x: number, y: number}[];
  color: string;
}

export interface ProfileScenario {
  description: string;
  recommendations: string[];
  events: { timeOffset: number, message: string }[];
  resources: { police: number, volunteers: number, medical: number, barricades: number };
  baseMetrics: { density: number, queueTime: number, flowRate: number, risk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' };
  primaryOverlay?: OverlayPolygon; // ONE contextual overlay
}

export const SIMULATION_PROFILES: Record<SimulationProfileName, ProfileScenario> = {
  MorningRush: {
    description: 'Heavy Entry Crowd. Queue increasing steadily.',
    recommendations: ['Open Lane B', 'Deploy 2 Volunteers', 'Continue Monitoring'],
    events: [
      { timeOffset: 0, message: 'Density Increased' },
      { timeOffset: -2, message: 'Queue Threshold Crossed' },
      { timeOffset: -5, message: 'Police Patrol Entered Zone' }
    ],
    resources: { police: 12, volunteers: 8, medical: 2, barricades: 6 },
    baseMetrics: { density: 82, queueTime: 18, flowRate: 0.8, risk: 'HIGH' },
    primaryOverlay: { type: 'QUEUE BUILDUP', points: [{x: 20, y: 60}, {x: 80, y: 60}, {x: 80, y: 90}, {x: 20, y: 90}], color: '#F97316' } // Orange
  },
  NormalOperations: {
    description: 'Security Check operating normally. Consistent flow.',
    recommendations: ['Maintain Current Posture', 'Log Routine Check'],
    events: [
      { timeOffset: -10, message: 'Scanner Shift Change' },
      { timeOffset: -15, message: 'Routine Sweep Completed' }
    ],
    resources: { police: 6, volunteers: 4, medical: 1, barricades: 4 },
    baseMetrics: { density: 35, queueTime: 5, flowRate: 1.2, risk: 'LOW' },
    primaryOverlay: { type: 'BARRICADE', points: [{x: 10, y: 85}, {x: 90, y: 85}], color: '#3B82F6' } // Blue
  },
  VIPArrival: {
    description: 'VIP Gate active. Police monitoring restricted corridor.',
    recommendations: ['Clear Corridor Alpha', 'Standby for Escort'],
    events: [
      { timeOffset: -1, message: 'VIP Convoy 2km away' },
      { timeOffset: -3, message: 'Corridor Cleared' }
    ],
    resources: { police: 24, volunteers: 2, medical: 2, barricades: 12 },
    baseMetrics: { density: 15, queueTime: 0, flowRate: 2.5, risk: 'LOW' },
    primaryOverlay: { type: 'VIP ROUTE', points: [{x: 30, y: 10}, {x: 70, y: 10}, {x: 70, y: 100}, {x: 30, y: 100}], color: '#A855F7' } // Purple
  },
  FestivalPeak: {
    description: 'Main Mandap at Very High Density. Volunteer Deployment active.',
    recommendations: ['Restrict Entry Gate 1', 'Alert SDRF Team', 'Broadcast Dispersal Message'],
    events: [
      { timeOffset: -1, message: 'Density CRITICAL Alert' },
      { timeOffset: -3, message: 'Flow Restricted to 0.4 m/s' }
    ],
    resources: { police: 18, volunteers: 24, medical: 6, barricades: 8 },
    baseMetrics: { density: 95, queueTime: 45, flowRate: 0.4, risk: 'CRITICAL' },
    primaryOverlay: { type: 'HIGH DENSITY', points: [{x: 10, y: 20}, {x: 90, y: 20}, {x: 90, y: 80}, {x: 10, y: 80}], color: '#EF4444' } // Red
  },
  ClosingTime: {
    description: 'Temple Exit. Crowd Dispersal in progress.',
    recommendations: ['Open all Exit Gates', 'Monitor Perimeter'],
    events: [
      { timeOffset: 0, message: 'Sanctum Closed' },
      { timeOffset: -5, message: 'Dispersal Started' }
    ],
    resources: { police: 8, volunteers: 12, medical: 1, barricades: 2 },
    baseMetrics: { density: 45, queueTime: 2, flowRate: 1.5, risk: 'LOW' },
    primaryOverlay: { type: 'EXIT GATE', points: [{x: 10, y: 60}, {x: 90, y: 60}, {x: 90, y: 90}, {x: 10, y: 90}], color: '#06B6D4' } // Cyan
  },
  MedicalEmergency: {
    description: 'Medical Incident Reported. Rescue team on route.',
    recommendations: ['Clear Pathway', 'Dispatch Ambulance 108'],
    events: [
      { timeOffset: 0, message: 'Medical Team Arrived' },
      { timeOffset: -4, message: 'Incident Reported' }
    ],
    resources: { police: 4, volunteers: 6, medical: 4, barricades: 0 },
    baseMetrics: { density: 60, queueTime: 12, flowRate: 0.6, risk: 'HIGH' },
    primaryOverlay: { type: 'MEDICAL RESPONSE', points: [{x: 40, y: 40}, {x: 60, y: 40}, {x: 60, y: 60}, {x: 40, y: 60}], color: '#3B82F6' } // Blue (Medical)
  },
  VehicleCongestion: {
    description: 'Parking congestion. Vehicle flow restricted.',
    recommendations: ['Divert to Overflow Lot', 'Deploy Traffic Police'],
    events: [
      { timeOffset: -2, message: 'Lot 90% Full' },
      { timeOffset: -10, message: 'Inflow Surge' }
    ],
    resources: { police: 10, volunteers: 4, medical: 0, barricades: 14 },
    baseMetrics: { density: 88, queueTime: 25, flowRate: 0.2, risk: 'HIGH' },
    primaryOverlay: { type: 'FLOW RESTRICTED', points: [{x: 20, y: 30}, {x: 80, y: 30}, {x: 80, y: 90}, {x: 20, y: 90}], color: '#EAB308' } // Yellow
  }
};
