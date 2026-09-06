import { type TempleId } from './data';

// ============================================================
// TEMPLE ZONES
// ============================================================
export interface ZoneData {
  id: string;
  templeId: TempleId;
  name: string;
  visitors: number;
  capacity: number;
  density: number;
  cameras: number;
  volunteers: number;
  alerts: number;
  security: number;
  medical: number;
  barricades: number;
  waterStations: number;
  restrooms: number;
}

export const TEMPLE_ZONES: ZoneData[] = [
  { id: 'Z-SOM-01', templeId: 'somnath', name: 'Digvijay Dwar Entrance', visitors: 4500, capacity: 5000, density: 90, cameras: 4, volunteers: 12, alerts: 2, security: 8, medical: 2, barricades: 20, waterStations: 4, restrooms: 2 },
  { id: 'Z-SOM-02', templeId: 'somnath', name: 'VIP Dwar Corridor', visitors: 800, capacity: 1500, density: 53, cameras: 3, volunteers: 6, alerts: 0, security: 6, medical: 1, barricades: 10, waterStations: 2, restrooms: 1 },
  { id: 'Z-SOM-03', templeId: 'somnath', name: 'Garbhagriha Core Sanctum', visitors: 3200, capacity: 3500, density: 91, cameras: 8, volunteers: 20, alerts: 1, security: 15, medical: 4, barricades: 50, waterStations: 0, restrooms: 0 },
  { id: 'Z-SOM-04', templeId: 'somnath', name: 'Sagar Darshan Exit Promenade', visitors: 2100, capacity: 4000, density: 52, cameras: 2, volunteers: 8, alerts: 0, security: 4, medical: 1, barricades: 15, waterStations: 6, restrooms: 4 },
  
  { id: 'Z-DWK-01', templeId: 'dwarka', name: 'Moksha Dwar North', visitors: 2800, capacity: 3000, density: 93, cameras: 5, volunteers: 15, alerts: 3, security: 10, medical: 2, barricades: 25, waterStations: 3, restrooms: 2 },
  { id: 'Z-DWK-02', templeId: 'dwarka', name: 'Gomti Ghat & Swarga Dwar', visitors: 5400, capacity: 8000, density: 67, cameras: 6, volunteers: 25, alerts: 1, security: 12, medical: 3, barricades: 0, waterStations: 8, restrooms: 6 },
  
  { id: 'Z-AMB-01', templeId: 'ambaji', name: 'Gabbar Hill Ropeway Path', visitors: 6200, capacity: 7000, density: 88, cameras: 12, volunteers: 40, alerts: 4, security: 20, medical: 8, barricades: 40, waterStations: 12, restrooms: 5 },
  { id: 'Z-AMB-02', templeId: 'ambaji', name: 'Chachar Chowk & Sanctum', visitors: 4800, capacity: 5500, density: 87, cameras: 8, volunteers: 18, alerts: 2, security: 15, medical: 2, barricades: 30, waterStations: 2, restrooms: 2 },
  
  { id: 'Z-PVG-01', templeId: 'pavagadh', name: 'Machi Ropeway Base', visitors: 3500, capacity: 4000, density: 87, cameras: 5, volunteers: 10, alerts: 2, security: 8, medical: 2, barricades: 15, waterStations: 4, restrooms: 4 },
  { id: 'Z-PVG-02', templeId: 'pavagadh', name: 'Kalika Summit Cliff', visitors: 1200, capacity: 2000, density: 60, cameras: 4, volunteers: 8, alerts: 0, security: 6, medical: 2, barricades: 10, waterStations: 2, restrooms: 1 },
];

// ============================================================
// BOOKINGS & SLOTS
// ============================================================
export interface BookingSlot {
  id: string;
  templeId: TempleId;
  type: 'Morning' | 'VIP' | 'Aarti' | 'General' | 'Evening';
  time: string;
  capacity: number;
  booked: number;
  prediction: number;
  aiRecommendation: string;
}

export const BOOKING_SLOTS: BookingSlot[] = [
  { id: 'B-SOM-1', templeId: 'somnath', type: 'Aarti', time: '06:00 AM', capacity: 1500, booked: 1480, prediction: 100, aiRecommendation: 'Increase barricading in corridor B' },
  { id: 'B-SOM-2', templeId: 'somnath', type: 'Morning', time: '08:00 AM', capacity: 4000, booked: 3200, prediction: 85, aiRecommendation: 'Normal operations' },
  { id: 'B-SOM-3', templeId: 'somnath', type: 'VIP', time: '11:00 AM', capacity: 500, booked: 490, prediction: 98, aiRecommendation: 'Deploy 2 extra protocol officers' },
  { id: 'B-SOM-4', templeId: 'somnath', type: 'General', time: '02:00 PM', capacity: 5000, booked: 2100, prediction: 45, aiRecommendation: 'Consolidate queues to save volunteer energy' },
  { id: 'B-DWK-1', templeId: 'dwarka', type: 'Aarti', time: '07:00 AM', capacity: 2000, booked: 2000, prediction: 110, aiRecommendation: 'Activate overflow waiting area' },
  { id: 'B-AMB-1', templeId: 'ambaji', type: 'Morning', time: '09:00 AM', capacity: 6000, booked: 5800, prediction: 96, aiRecommendation: 'Open alternate ropeway boarding lane' },
  { id: 'B-PVG-1', templeId: 'pavagadh', type: 'Evening', time: '05:00 PM', capacity: 3000, booked: 2900, prediction: 99, aiRecommendation: 'Prepare medical camp near exit' },
];

// ============================================================
// PILGRIM MANAGEMENT
// ============================================================
export interface Pilgrim {
  id: string;
  token: string;
  name: string;
  templeId: TempleId;
  zone: string;
  entryTime: string;
  category: 'General' | 'Senior Citizen' | 'Differently Abled' | 'VIP';
  status: 'Active' | 'Exited' | 'SOS' | 'Medical';
  assistance?: 'Wheelchair' | 'Escort' | 'Electric Cart';
}

export const PILGRIMS: Pilgrim[] = [
  { id: 'P-10492', token: 'QR-SOM-849', name: 'Ramesh Bhai Patel', templeId: 'somnath', zone: 'Digvijay Dwar', entryTime: '10:42 AM', category: 'General', status: 'Active' },
  { id: 'P-10493', token: 'QR-SOM-850', name: 'Kokilaben Dave', templeId: 'somnath', zone: 'Garbhagriha Core', entryTime: '09:15 AM', category: 'Senior Citizen', status: 'Medical', assistance: 'Wheelchair' },
  { id: 'P-10494', token: 'QR-DWK-211', name: 'Sanjay Sharma', templeId: 'dwarka', zone: 'Gomti Ghat', entryTime: '11:05 AM', category: 'VIP', status: 'Active', assistance: 'Escort' },
  { id: 'P-10495', token: 'QR-AMB-992', name: 'Geeta Vaghela', templeId: 'ambaji', zone: 'Gabbar Hill Path', entryTime: '08:30 AM', category: 'Differently Abled', status: 'SOS', assistance: 'Electric Cart' },
  { id: 'P-10496', token: 'QR-PVG-433', name: 'Amit Desai', templeId: 'pavagadh', zone: 'Machi Base', entryTime: '11:20 AM', category: 'General', status: 'Exited' },
];

export const LOST_FOUND = [
  { id: 'LF-882', type: 'Person', name: 'Aarav Patel (Age 7)', status: 'Missing', reported: '11:15 AM', officer: 'Insp. R. Jadeja', templeId: 'somnath' },
  { id: 'LF-883', type: 'Item', name: 'Gold Chain', status: 'Found', reported: '09:40 AM', officer: 'Vol. Kishan', templeId: 'dwarka' },
  { id: 'LF-884', type: 'Person', name: 'Manjula Ben (Age 68)', status: 'Reunited', reported: '08:10 AM', officer: 'Insp. D. Vyas', templeId: 'ambaji' },
];

export const AI_DETECTIONS = [
  { time: '11:42:05', event: 'YOLO detected crowd surge', location: 'Somnath Digvijay Corridor', severity: 'Critical' },
  { time: '11:41:12', event: 'Queue exceeded threshold', location: 'Dwarka Moksha Dwar', severity: 'High' },
  { time: '11:38:44', event: 'Medical crowd forming', location: 'Ambaji Gabbar Hill', severity: 'Medium' },
  { time: '11:35:10', event: 'Unattended baggage', location: 'Pavagadh Ropeway Base', severity: 'Critical' },
];

// ============================================================
// INCIDENTS
// ============================================================
export interface Incident {
  id: string;
  title: string;
  templeId: TempleId;
  location: string;
  zone: string;
  type: 'Crowd Surge' | 'Medical Emergency' | 'Lost Child' | 'Queue Choke' | 'Security';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Reported' | 'Open' | 'In Progress' | 'Resolved';
  time: string;
  assignedTo: string;
  assignedTeam: string;
  sopSteps: string[];
}

export const INCIDENTS: Incident[] = [
  {
    id: 'INC-SOM-901',
    title: 'Surge at Digvijay Dwar Entry Holding Bay',
    templeId: 'somnath',
    location: 'Digvijay Dwar Holding Bay',
    zone: 'Digvijay Dwar',
    type: 'Crowd Surge',
    priority: 'High',
    severity: 'High',
    status: 'In Progress',
    time: '11:25 AM',
    assignedTo: 'QRF Team Alpha',
    assignedTeam: 'QRF Team Alpha (8 Officers)',
    sopSteps: ['Deploy temporary holding barricades', 'Pulse entry every 90s', 'Activate loudspeaker crowd guidance', 'Coordinate with Parking Lot B shuttle'],
  },
  {
    id: 'INC-DWK-902',
    title: 'Elderly Pilgrim Dehydration near Gomti Steps',
    templeId: 'dwarka',
    location: 'Gomti Ghat Steps',
    zone: 'Gomti Ghat',
    type: 'Medical Emergency',
    priority: 'Medium',
    severity: 'Medium',
    status: 'In Progress',
    time: '11:10 AM',
    assignedTo: '108 Medical Unit 3',
    assignedTeam: '108 Ambulance Unit 3',
    sopSteps: ['Administer oral rehydration electrolytes', 'Deploy wheelchair buggy to medical post', 'Inform family coordinator'],
  },
  {
    id: 'INC-AMB-903',
    title: 'Ropeway Boarding Chokepoint Gate 2',
    templeId: 'ambaji',
    location: 'Gabbar Ropeway Station 2',
    zone: 'Gabbar Hill Ropeway Path',
    type: 'Queue Choke',
    priority: 'Critical',
    severity: 'Critical',
    status: 'Open',
    time: '11:40 AM',
    assignedTo: 'SDRF Ropeway Unit',
    assignedTeam: 'SDRF Ropeway Unit (12 Personnel)',
    sopSteps: ['Throttle lower boarding carousel to 3.8 m/s', 'Divert secondary queue to Hill Step trail', 'Issue GSDMA SMS advisory'],
  },
  {
    id: 'INC-PVG-904',
    title: 'Unattended Package at Machi Bus Depot',
    templeId: 'pavagadh',
    location: 'Machi Bus Stand',
    zone: 'Machi Base',
    type: 'Security',
    priority: 'Low',
    severity: 'Low',
    status: 'Resolved',
    time: '10:15 AM',
    assignedTo: 'BDDS Squad',
    assignedTeam: 'Bomb Detection & Disposal Squad',
    sopSteps: ['Cordon off 50m radius', 'X-ray scanner scan (Negative/Prasad items)', 'Log resolution in GSDMA portal'],
  },
];

// ============================================================
// VOLUNTEERS
// ============================================================
export interface Volunteer {
  id: string;
  name: string;
  templeId: TempleId;
  zone: string;
  role: 'Queue Marshal' | 'Medical Escort' | 'Language Translator' | 'Security Liaison' | 'Water Supply';
  assignment: string;
  status: 'Active' | 'On Duty' | 'Break' | 'Dispatched' | 'Off Duty';
  contact: string;
  shift: string;
  battery: number;
  avatar: string;
  radioStatus: 'Connected' | 'Standby' | 'Offline';
}

export const VOLUNTEERS: Volunteer[] = [
  { id: 'VOL-SOM-01', name: 'Jayeshbhai Joshi', templeId: 'somnath', zone: 'Digvijay Dwar', role: 'Queue Marshal', assignment: 'Gate 1 Queue Regulation', status: 'Active', contact: '+91 98250 11420', shift: 'Morning (06:00 - 14:00)', battery: 94, avatar: '', radioStatus: 'Connected' },
  { id: 'VOL-SOM-02', name: 'Pooja Trivedi', templeId: 'somnath', zone: 'Garbhagriha Core', role: 'Medical Escort', assignment: 'Sanctum Medical Assistance', status: 'Active', contact: '+91 98250 22341', shift: 'Morning (06:00 - 14:00)', battery: 88, avatar: '', radioStatus: 'Connected' },
  { id: 'VOL-DWK-01', name: 'Hardik Ahir', templeId: 'dwarka', zone: 'Moksha Dwar', role: 'Queue Marshal', assignment: 'Moksha Dwar Inflow', status: 'Dispatched', contact: '+91 98250 33452', shift: 'Morning (06:00 - 14:00)', battery: 72, avatar: '', radioStatus: 'Connected' },
  { id: 'VOL-AMB-01', name: 'Kishan Barot', templeId: 'ambaji', zone: 'Chachar Chowk', role: 'Security Liaison', assignment: 'Chachar Chowk SDRF Liaison', status: 'Active', contact: '+91 98250 44563', shift: 'Morning (06:00 - 14:00)', battery: 85, avatar: '', radioStatus: 'Connected' },
  { id: 'VOL-PVG-01', name: 'Mehul Rathod', templeId: 'pavagadh', zone: 'Machi Base', role: 'Water Supply', assignment: 'Machi Water Distribution', status: 'Active', contact: '+91 98250 55674', shift: 'Morning (06:00 - 14:00)', battery: 91, avatar: '', radioStatus: 'Standby' },
];

// ============================================================
// AI COPILOT MOCK CONVERSATION & ACTIONS
// ============================================================
export const AI_CHAT_MESSAGES = [
  {
    id: 'MSG-1',
    role: 'assistant',
    sender: 'ai',
    content: 'Good morning Commander. Darshan AI Copilot is monitoring Somnath, Dwarka, Ambaji, and Pavagadh edge feeds. Current risk index across Gujarat is NOMINAL, with a moderate surge developing at Ambaji Chachar Chowk.',
    text: 'Good morning Commander. Darshan AI Copilot is monitoring Somnath, Dwarka, Ambaji, and Pavagadh edge feeds. Current risk index across Gujarat is NOMINAL, with a moderate surge developing at Ambaji Chachar Chowk.',
    timestamp: '11:00 AM',
    time: '11:00 AM',
  },
  {
    id: 'MSG-2',
    role: 'user',
    sender: 'user',
    content: 'What is the projected surge for Somnath during the 07:00 PM Sandhya Maha Aarti?',
    text: 'What is the projected surge for Somnath during the 07:00 PM Sandhya Maha Aarti?',
    timestamp: '11:02 AM',
    time: '11:02 AM',
  },
  {
    id: 'MSG-3',
    role: 'assistant',
    sender: 'ai',
    content: 'Simulation forecast indicates a peak inflow of 4,200 devotees between 06:30 PM and 07:15 PM at Somnath. Recommend activating Holding Bay 2, pre-staging 8 QRF officers at Digvijay Dwar, and throttling Parking Lot B bus departures.',
    text: 'Simulation forecast indicates a peak inflow of 4,200 devotees between 06:30 PM and 07:15 PM at Somnath. Recommend activating Holding Bay 2, pre-staging 8 QRF officers at Digvijay Dwar, and throttling Parking Lot B bus departures.',
    timestamp: '11:03 AM',
    time: '11:03 AM',
  },
];

export const AI_SUGGESTED_ACTIONS = [
  { id: 'ACT-1', title: 'Activate Somnath Holding Bay 2', priority: 'High', description: 'Prevents Garbhagriha corridor choke before Sandhya Aarti.' },
  { id: 'ACT-2', title: 'Deploy Electric Shuttles at Dwarka Gomti', priority: 'Medium', description: 'Assists 120 senior citizens currently queuing at Sudama Setu.' },
  { id: 'ACT-3', title: 'Synchronize Ambaji Ropeway to 4.2 m/s', priority: 'High', description: 'Increases uphill clearance rate by 340 passengers/hour.' },
];

// ============================================================
// ANALYTICS & DASHBOARD METRICS
// ============================================================
export interface TempleKPI {
  templeId: TempleId;
  name: string;
  todayVisitors: number;
  dailyFootfall: number;
  currentVisitors: number;
  avgQueueTime: number;
  avgWaitMin: number;
  crowdDensity: number;
  densityPct: number;
  parkingOccupancy: number;
  parkingOccupancyPct: number;
  openIncidents: number;
  activeIncidents: number;
  aiRiskLevel: string;
  status: 'Nominal' | 'Elevated' | 'Critical';
  temperature: number;
  weather: string;
  sparkline: number[];
}

export const TEMPLE_KPIS: TempleKPI[] = [
  {
    templeId: 'somnath',
    name: 'Somnath',
    todayVisitors: 48200,
    dailyFootfall: 48200,
    currentVisitors: 8400,
    avgQueueTime: 28,
    avgWaitMin: 28,
    crowdDensity: 76,
    densityPct: 76,
    parkingOccupancy: 81,
    parkingOccupancyPct: 81,
    openIncidents: 1,
    activeIncidents: 1,
    aiRiskLevel: 'Moderate',
    status: 'Elevated',
    temperature: 31,
    weather: 'Clear',
    sparkline: [30, 42, 55, 68, 76, 72, 80, 84],
  },
  {
    templeId: 'dwarka',
    name: 'Dwarka',
    todayVisitors: 36500,
    dailyFootfall: 36500,
    currentVisitors: 6200,
    avgQueueTime: 22,
    avgWaitMin: 22,
    crowdDensity: 68,
    densityPct: 68,
    parkingOccupancy: 70,
    parkingOccupancyPct: 70,
    openIncidents: 1,
    activeIncidents: 1,
    aiRiskLevel: 'Low',
    status: 'Nominal',
    temperature: 30,
    weather: 'Breezy',
    sparkline: [22, 28, 40, 52, 60, 68, 65, 62],
  },
  {
    templeId: 'ambaji',
    name: 'Ambaji',
    todayVisitors: 62000,
    dailyFootfall: 62000,
    currentVisitors: 11400,
    avgQueueTime: 45,
    avgWaitMin: 45,
    crowdDensity: 88,
    densityPct: 88,
    parkingOccupancy: 92,
    parkingOccupancyPct: 92,
    openIncidents: 2,
    activeIncidents: 2,
    aiRiskLevel: 'Critical',
    status: 'Critical',
    temperature: 28,
    weather: 'Cloudy',
    sparkline: [40, 55, 70, 82, 88, 92, 90, 88],
  },
  {
    templeId: 'pavagadh',
    name: 'Pavagadh',
    todayVisitors: 28400,
    dailyFootfall: 28400,
    currentVisitors: 4800,
    avgQueueTime: 32,
    avgWaitMin: 32,
    crowdDensity: 62,
    densityPct: 62,
    parkingOccupancy: 68,
    parkingOccupancyPct: 68,
    openIncidents: 0,
    activeIncidents: 0,
    aiRiskLevel: 'Low',
    status: 'Nominal',
    temperature: 29,
    weather: 'Sunny',
    sparkline: [15, 25, 38, 48, 55, 62, 58, 60],
  },
];

export const STATEWIDE_KPIS = {
  todayPilgrims: 175100,
  totalDailyVisitors: 175100,
  trendVsLastWeek: 14.2,
  currentInside: 30800,
  activeInTemples: 30800,
  avgQueueTime: 31,
  avgStateWaitMin: 31,
  openIncidents: 4,
  criticalIncidents: 1,
  parkingOccupancy: 78,
  medicalAlerts: 2,
  aiRiskLevel: 'ELEVATED',
  edgeCamerasOnline: 118,
  totalEdgeCameras: 120,
  activeVolunteers: 340,
  activeIncidents: 4,
};

export const HOURLY_FOOTFALL = [
  { hour: '06:00', somnath: 1200, dwarka: 1800, ambaji: 2400, pavagadh: 900 },
  { hour: '08:00', somnath: 3400, dwarka: 2900, ambaji: 4800, pavagadh: 2100 },
  { hour: '10:00', somnath: 5600, dwarka: 4200, ambaji: 7200, pavagadh: 3800 },
  { hour: '12:00', somnath: 4800, dwarka: 3600, ambaji: 6100, pavagadh: 3200 },
  { hour: '14:00', somnath: 3100, dwarka: 2400, ambaji: 4500, pavagadh: 2000 },
  { hour: '16:00', somnath: 4900, dwarka: 3800, ambaji: 6800, pavagadh: 3400 },
  { hour: '18:00', somnath: 7200, dwarka: 5400, ambaji: 8900, pavagadh: 4600 },
  { hour: '20:00', somnath: 4500, dwarka: 3200, ambaji: 5600, pavagadh: 2200 },
];

export const QUEUE_PREDICTION = [
  { time: '12:00', actual: 42, predicted: 40, upper: 45, lower: 35 },
  { time: '13:00', actual: 38, predicted: 36, upper: 42, lower: 30 },
  { time: '14:00', actual: 28, predicted: 30, upper: 36, lower: 24 },
  { time: '15:00', actual: 32, predicted: 34, upper: 40, lower: 28 },
  { time: '16:00', actual: 45, predicted: 44, upper: 52, lower: 38 },
  { time: '17:00', actual: 58, predicted: 60, upper: 68, lower: 52 },
  { time: '18:00', actual: 72, predicted: 75, upper: 85, lower: 65 },
  { time: '19:00', actual: null, predicted: 82, upper: 95, lower: 72 },
  { time: '20:00', actual: null, predicted: 64, upper: 74, lower: 54 },
];

export const INCIDENT_TREND = [
  { day: 'Mon', crowd: 4, medical: 2, queue: 3, security: 1 },
  { day: 'Tue', crowd: 3, medical: 1, queue: 2, security: 0 },
  { day: 'Wed', crowd: 5, medical: 3, queue: 4, security: 1 },
  { day: 'Thu', crowd: 6, medical: 2, queue: 5, security: 2 },
  { day: 'Fri', crowd: 8, medical: 4, queue: 7, security: 1 },
  { day: 'Sat', crowd: 14, medical: 6, queue: 11, security: 3 },
  { day: 'Sun', crowd: 18, medical: 8, queue: 15, security: 4 },
];

export const ACTIVITY_FEED = [
  { id: 'ACT-01', templeId: 'somnath' as TempleId, message: 'Sandhya Aarti crowd surge predicted at Digvijay Dwar', text: 'Sandhya Aarti crowd surge predicted at Digvijay Dwar', time: '2 min ago', type: 'warning' },
  { id: 'ACT-02', templeId: 'ambaji' as TempleId, message: 'Ropeway queue Hall 2 opened to relieve Chachar Chowk', text: 'Ropeway queue Hall 2 opened to relieve Chachar Chowk', time: '5 min ago', type: 'info' },
  { id: 'ACT-03', templeId: 'dwarka' as TempleId, message: 'Gomti Ghat medical escort dispatched for senior citizen', text: 'Gomti Ghat medical escort dispatched for senior citizen', time: '11 min ago', type: 'medical' },
  { id: 'ACT-04', templeId: 'pavagadh' as TempleId, message: 'Machi bus parking reached 88% capacity threshold', text: 'Machi bus parking reached 88% capacity threshold', time: '18 min ago', type: 'parking' },
];
