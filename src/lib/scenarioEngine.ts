// ============================================================
// SCENARIO ENGINE — Temple Pilgrimage Live Simulation
// Drives realistic crowd/security events on the GIS map
// ============================================================

export type ScenarioType =
  | 'aarti_rush'
  | 'vip_movement'
  | 'lost_child'
  | 'medical_emergency'
  | 'crowd_surge'
  | 'parking_full'
  | 'queue_choke'
  | 'fire_alarm'
  | 'drone_patrol'
  | 'weather_alert'
  | 'normal_ops';

export interface ActiveScenario {
  id: string;
  type: ScenarioType;
  label: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'info';
  affectedZones: string[];
  heatmapBoost: Record<string, 'critical' | 'high' | 'medium' | 'low'>;
  guardRelocations: { guardId: string; x: number; y: number }[];
  startedAt: number;
  duration: number; // ms
}

const SCENARIOS: Omit<ActiveScenario, 'id' | 'startedAt'>[] = [
  {
    type: 'aarti_rush',
    label: 'Sandhya Aarti Rush',
    description: 'Sandhya Maha Aarti begins in 15 min. Pilgrim surge at Main Gate and Inner Sanctum.',
    severity: 'high',
    affectedZones: ['Temple Core', 'North Gate', 'Inner Sanctum Queue'],
    heatmapBoost: { 'H-01': 'critical', 'H-02': 'critical', 'H-03': 'critical', 'H-04': 'high' },
    guardRelocations: [
      { guardId: 'G-POL-05', x: 590, y: 590 },
      { guardId: 'G-POL-06', x: 540, y: 650 },
      { guardId: 'G-VOL-01', x: 500, y: 870 },
    ],
    duration: 45000,
  },
  {
    type: 'vip_movement',
    label: 'VIP Convoy En Route',
    description: 'VIP convoy approaching Somnath. Corridor Alpha cleared. Police escort active.',
    severity: 'medium',
    affectedZones: ['VIP Gate', 'North Gate'],
    heatmapBoost: {},
    guardRelocations: [
      { guardId: 'G-POL-01', x: 390, y: 780 },
      { guardId: 'G-POL-02', x: 430, y: 730 },
      { guardId: 'G-POL-03', x: 310, y: 730 },
    ],
    duration: 30000,
  },
  {
    type: 'lost_child',
    label: 'Lost Child — Search Active',
    description: 'Child reported missing near Digvijay Dwar. CCTV backtrack and volunteer search underway.',
    severity: 'high',
    affectedZones: ['North Gate'],
    heatmapBoost: { 'H-01': 'high' },
    guardRelocations: [
      { guardId: 'G-VOL-03', x: 460, y: 800 },
      { guardId: 'G-POL-09', x: 450, y: 830 },
    ],
    duration: 35000,
  },
  {
    type: 'medical_emergency',
    label: 'Medical Emergency — Main Mandap',
    description: 'Elderly pilgrim collapsed. Paramedic team dispatched. Route cleared.',
    severity: 'critical',
    affectedZones: ['Main Mandap'],
    heatmapBoost: {},
    guardRelocations: [
      { guardId: 'G-MED-01', x: 610, y: 560 },
      { guardId: 'G-VOL-02', x: 620, y: 590 },
    ],
    duration: 40000,
  },
  {
    type: 'crowd_surge',
    label: 'Crowd Surge Alert',
    description: 'Density threshold breached at North Holding Bay (94%). Overflow barriers activated.',
    severity: 'critical',
    affectedZones: ['North Gate', 'North Holding Bay'],
    heatmapBoost: { 'H-06': 'critical', 'H-01': 'critical', 'H-07': 'high' },
    guardRelocations: [
      { guardId: 'G-POL-04', x: 475, y: 840 },
      { guardId: 'G-POL-07', x: 405, y: 870 },
    ],
    duration: 50000,
  },
  {
    type: 'parking_full',
    label: 'Parking Lot B — Full',
    description: 'Parking Lot B at 97% capacity. Diversion to new parking activated.',
    severity: 'medium',
    affectedZones: ['Parking Lot B', 'New Parking'],
    heatmapBoost: { 'H-12': 'critical' },
    guardRelocations: [
      { guardId: 'G-FIRE-01', x: 1580, y: 680 },
    ],
    duration: 60000,
  },
  {
    type: 'queue_choke',
    label: 'Queue Choke — Inner Sanctum',
    description: 'Queue at Inner Sanctum has grown to 800m. Crowd flow reduced to batch entry.',
    severity: 'high',
    affectedZones: ['Inner Sanctum Queue'],
    heatmapBoost: { 'H-04': 'critical', 'H-03': 'high' },
    guardRelocations: [
      { guardId: 'G-VOL-01', x: 550, y: 910 },
    ],
    duration: 40000,
  },
  {
    type: 'fire_alarm',
    label: 'Fire Alarm — Parking Lot B',
    description: 'Fire alarm triggered at Parking Lot B. SDRF and Fire Tender mobilised. Area cleared.',
    severity: 'critical',
    affectedZones: ['Parking Lot B', 'Emergency Assembly'],
    heatmapBoost: { 'H-12': 'critical' },
    guardRelocations: [
      { guardId: 'G-SDRF-01', x: 1550, y: 720 },
      { guardId: 'G-FIRE-01', x: 1520, y: 740 },
    ],
    duration: 50000,
  },
  {
    type: 'weather_alert',
    label: 'Strong Wind Advisory',
    description: 'Coastal wind speed 45 km/h. Beach access restricted. Pilgrims directed inland.',
    severity: 'medium',
    affectedZones: ['Beach Promenade'],
    heatmapBoost: {},
    guardRelocations: [
      { guardId: 'G-POL-05', x: 700, y: 400 },
    ],
    duration: 55000,
  },
  {
    type: 'normal_ops',
    label: 'Normal Operations',
    description: 'All zones nominal. Crowd flow steady. Temple operational.',
    severity: 'info',
    affectedZones: [],
    heatmapBoost: {},
    guardRelocations: [],
    duration: 20000,
  },
];

let scenarioIndex = 0;
let listeners: ((scenario: ActiveScenario | null) => void)[] = [];
let currentScenario: ActiveScenario | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;

function nextScenario() {
  const def = SCENARIOS[scenarioIndex % SCENARIOS.length];
  scenarioIndex++;

  const scenario: ActiveScenario = {
    ...def,
    id: `SC-${Date.now()}`,
    startedAt: Date.now(),
  };

  currentScenario = scenario;
  listeners.forEach(fn => fn(scenario));

  timer = setTimeout(() => {
    nextScenario();
  }, scenario.duration);
}

export const scenarioEngine = {
  start() {
    if (timer) return;
    nextScenario();
  },

  stop() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    currentScenario = null;
    listeners.forEach(fn => fn(null));
  },

  subscribe(fn: (scenario: ActiveScenario | null) => void) {
    listeners.push(fn);
    if (currentScenario) fn(currentScenario);
    return () => {
      listeners = listeners.filter(l => l !== fn);
    };
  },

  getCurrent() {
    return currentScenario;
  },
};
