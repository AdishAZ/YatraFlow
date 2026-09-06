// ============================================================
// YatraFlow — GIS Digital Twin 2.0 (SVH26008)
// Government of Gujarat · Integrated Command & Control Centre (ICCC)
// Somnath · Dwarkadhish · Ambaji · Pavagadh
// ============================================================

export type TempleId = 'somnath' | 'dwarka' | 'ambaji' | 'pavagadh';

export interface TempleInfo { imageUrl?: string;
  id: TempleId;
  name: string;
  fullName: string;
  city: string;
  district: string;
  type: string;
  deity: string;
  lat: number;
  lng: number;
  zoom: number; // Default operational campus zoom = 17 (~600m radius)
  color: string;
  activeFestival: string;
  festivals: string[];
  aartis: { name: string; time: string; status: 'Completed' | 'Current' | 'Upcoming' }[];
  emergencyContact: string;
  policeIncharge: string;
  sdrfTeam: string;
  dailyCapacity: number;
  elevationMeters: number;
}

export const TEMPLES: Record<TempleId, TempleInfo> = {
  somnath: {
    id: 'somnath',
    name: 'Somnath',
    fullName: 'Shree Somnath Jyotirlinga Temple',
    city: 'Prabhas Patan, Veraval',
    district: 'Gir Somnath',
    type: 'First among Twelve Holy Jyotirlingas',
    deity: 'Lord Shiva (Someshwar Mahadev)',
    lat: 20.8880,
    lng: 70.4012,
    zoom: 18,
    color: '#F97316',
    imageUrl: '/Somnath.jpeg',
    activeFestival: 'Maha Shivratri Mahotsav',
    festivals: ['Maha Shivratri', 'Shravan Month', 'Kartik Purnima', 'Somnath Foundation Day'],
    aartis: [
      { name: 'Pratah Mangla Aarti', time: '07:00 AM', status: 'Completed' },
      { name: 'Madhyahna Shringar Aarti', time: '12:00 PM', status: 'Completed' },
      { name: 'Sandhya Maha Aarti', time: '07:00 PM', status: 'Current' },
      { name: 'Shayan Aarti & Deepdarshan', time: '09:30 PM', status: 'Upcoming' },
    ],
    emergencyContact: '+91 2876 231200 / Control: 112',
    policeIncharge: 'SP Gir Somnath (Cmd. S. V. Jadeja)',
    sdrfTeam: 'SDRF Marine & Coastal Battalion 3',
    dailyCapacity: 75000,
    elevationMeters: 8,
  },
  dwarka: {
    id: 'dwarka',
    name: 'Dwarka',
    fullName: 'Shree Dwarkadhish Jagat Mandir',
    city: 'Dwarka',
    district: 'Devbhumi Dwarka',
    type: 'Char Dham Pilgrimage Holy Shrine & Mokshapuri',
    deity: 'Lord Krishna (Dwarkadhish / King of Dwarka)',
    lat: 22.2378,
    lng: 68.9678,
    zoom: 18,
    color: '#3B82F6',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Dwarakadheesh_Temple%2C_2014.jpg',
    activeFestival: 'Shree Krishna Janmashtami',
    festivals: ['Janmashtami', 'Holi (Phuldol Mahotsav)', 'Annakut Mahotsav', 'Kartik Purnima'],
    aartis: [
      { name: 'Mangla Aarti & Snan', time: '06:30 AM', status: 'Completed' },
      { name: 'Shringar & Gwal Bhog', time: '10:30 AM', status: 'Completed' },
      { name: 'Sandhya Aarti & Bhog', time: '07:30 PM', status: 'Current' },
      { name: 'Shayan Aarti & Dhwajaji', time: '08:30 PM', status: 'Upcoming' },
    ],
    emergencyContact: '+91 2892 234080 / Control: 112',
    policeIncharge: 'DySP Dwarka Sub-division (Cmd. R. K. Mehta)',
    sdrfTeam: 'SDRF River & Ghat Rescue Unit 1',
    dailyCapacity: 60000,
    elevationMeters: 12,
  },
  ambaji: {
    id: 'ambaji',
    name: 'Ambaji',
    fullName: 'Shree Arasuri Ambaji Mata Devasthan',
    city: 'Ambaji (Arasur Hills)',
    district: 'Banaskantha',
    type: 'Major 51 Shakti Peeth (Hridaya Peeth)',
    deity: 'Maa Amba (Arasuri Ambaji Visoyantra)',
    lat: 24.3312,
    lng: 72.8522,
    zoom: 18,
    color: '#22C55E',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG/1280px-Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG',
    activeFestival: 'Bhadarvi Poonam Maha Mela',
    festivals: ['Bhadarvi Poonam', 'Navratri Mahotsav', 'Chaitra Navratri', 'Diwali Annakut'],
    aartis: [
      { name: 'Pratah Mangla Aarti', time: '07:30 AM', status: 'Completed' },
      { name: 'Rajbhog & Thaal', time: '12:30 PM', status: 'Completed' },
      { name: 'Sandhya Maha Aarti', time: '07:00 PM', status: 'Current' },
      { name: 'Shayan Darshan', time: '09:00 PM', status: 'Upcoming' },
    ],
    emergencyContact: '+91 2749 262136 / Control: 112',
    policeIncharge: 'SP Banaskantha Command Center (Cmd. P. N. Patel)',
    sdrfTeam: 'SDRF Mountain & Ropeway Rescue Unit 4',
    dailyCapacity: 95000,
    elevationMeters: 480,
  },
  pavagadh: {
    id: 'pavagadh',
    name: 'Pavagadh',
    fullName: 'Maa Mahakalika Temple (Pavagadh Hill)',
    city: 'Champaner-Pavagadh',
    district: 'Panchmahal',
    type: 'Shakti Peeth & UNESCO World Heritage Cultural Landscape',
    deity: 'Goddess Mahakali (Kalika Mata)',
    lat: 22.4632,
    lng: 73.5204,
    zoom: 18,
    color: '#A855F7',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Kalika_Mata_Temple%2C_Pavagarh.jpg/1280px-Kalika_Mata_Temple%2C_Pavagarh.jpg',
    activeFestival: 'Chaitra Navratri Mela',
    festivals: ['Chaitra Navratri', 'Ashwin Navratri', 'Mahakali Jayanti', 'Kartik Punam Mela'],
    aartis: [
      { name: 'Mangla Aarti (Summit)', time: '06:00 AM', status: 'Completed' },
      { name: 'Bhog Aarti (Sanctum)', time: '12:00 PM', status: 'Completed' },
      { name: 'Sandhya Aarti (Deepmala)', time: '06:45 PM', status: 'Current' },
      { name: 'Maha Shayan Aarti', time: '08:15 PM', status: 'Upcoming' },
    ],
    emergencyContact: '+91 2676 245630 / Control: 112',
    policeIncharge: 'SP Panchmahal Tactical Unit (Cmd. D. K. Solanki)',
    sdrfTeam: 'SDRF High-Altitude Cliff Rescue Squadron',
    dailyCapacity: 50000,
    elevationMeters: 762,
  },
};

export const TEMPLE_LIST = Object.values(TEMPLES);

// ============================================================
// DIGITAL TWIN GEOGRAPHIC INFRASTRUCTURE (LOD 1, 2, 3, 4)
// ============================================================

export type InfrastructureType =
  | 'main_gate'
  | 'vip_gate'
  | 'exit_gate'
  | 'temple_core'
  | 'police_control'
  | 'medical_camp'
  | 'parking'
  | 'volunteer_post'
  | 'lost_found'
  | 'cloak_room'
  | 'shoe_deposit'
  | 'food_court'
  | 'public_plaza'
  | 'ropeway_station'
  | 'bus_stand'
  | 'ghat'
  | 'security_scanner'
  | 'water_station'
  | 'holding_area'
  | 'barricade';

export interface DigitalTwinInfrastructure {
  id: string;
  templeId: TempleId;
  name: string;
  type: InfrastructureType;
  lat: number;
  lng: number;
  description: string;
  status: 'Operational' | 'Congested' | 'High Alert' | 'Active';
  lodLevel: 1 | 2 | 3 | 4; // 1: z<=15, 2: z=16-17, 3: z=18, 4: z>=19
  capacity?: string;
  leadOfficer?: string;
  activeVolunteers?: number;
  activePolice?: number;
}

export const DIGITAL_TWIN_INFRASTRUCTURE: DigitalTwinInfrastructure[] = [
  // --- SOMNATH (Prabhas Patan, Gir Somnath) ---
  { id: 'INF-SOM-01', templeId: 'somnath', name: 'Digvijay Dwar (North Grand Portal)', type: 'main_gate', lat: 20.8893, lng: 70.4015, description: 'Primary security screening, metal detector gates & baggage X-ray', status: 'Operational', lodLevel: 1, leadOfficer: 'Insp. R. V. Zala (GSDMA Post 1)', activePolice: 8, activeVolunteers: 14 },
  { id: 'INF-SOM-02', templeId: 'somnath', name: 'VIP Protocol Gate & Dignitary Lounge', type: 'vip_gate', lat: 20.8882, lng: 70.4022, description: 'Designated protocol corridor for state dignitaries and elderly assistance buggies', status: 'Operational', lodLevel: 2, leadOfficer: 'DSP Protocol Lead K. Jadeja', activePolice: 4, activeVolunteers: 4 },
  { id: 'INF-SOM-03', templeId: 'somnath', name: 'Somnath Garbhagriha & Nandi Mandap', type: 'temple_core', lat: 20.8880, lng: 70.4012, description: 'Inner Jyotirlinga Sanctum with dual queue discharge channels', status: 'Congested', lodLevel: 1, capacity: '850 Pilgrims / Batch', activePolice: 12, activeVolunteers: 20 },
  { id: 'INF-SOM-04', templeId: 'somnath', name: 'Sagar Darshan Sea Front Exit Promenade', type: 'exit_gate', lat: 20.8872, lng: 70.4010, description: 'One-way coastal exit walkway leading to Arabian Sea promenade', status: 'Operational', lodLevel: 1, activePolice: 4, activeVolunteers: 6 },
  { id: 'INF-SOM-05', templeId: 'somnath', name: 'Prabhas Patan Police Control Point (CP Alpha)', type: 'police_control', lat: 20.8895, lng: 70.4012, description: '24/7 GSDMA Tactical Command Post with VHF radio tower & CCTV uplink', status: 'Active', lodLevel: 2, leadOfficer: 'SP S. V. Jadeja (Cmd)', activePolice: 16 },
  { id: 'INF-SOM-06', templeId: 'somnath', name: '108 Emergency Medical Base (Digvijay Post)', type: 'medical_camp', lat: 20.8889, lng: 70.4018, description: '4 ICU beds, cardiac defibrillator, 3 BLS ambulances on standby', status: 'Operational', lodLevel: 2, leadOfficer: 'Dr. Hardik Bhatt (MD)', activeVolunteers: 4 },
  { id: 'INF-SOM-07', templeId: 'somnath', name: 'Prabhas Patan Heavy Bus Parking Lot A', type: 'parking', lat: 20.8910, lng: 70.4035, description: '500 Heavy bus bays with automated ANPR barrier gates', status: 'Operational', lodLevel: 1, capacity: '500 Buses', activePolice: 6 },
  { id: 'INF-SOM-08', templeId: 'somnath', name: 'Somnath Trust Parking Lot B (Cars / EV Hub)', type: 'parking', lat: 20.8898, lng: 70.4005, description: '600 Car bays, 24 DC Fast Chargers, solar canopy', status: 'Operational', lodLevel: 1, capacity: '600 Vehicles', activePolice: 4 },
  { id: 'INF-SOM-09', templeId: 'somnath', name: 'Central Cloak Room & Digital RFID Locker Plaza', type: 'cloak_room', lat: 20.8888, lng: 70.4014, description: '3,000 Electronic RFID luggage lockers & mobile safe deposit', status: 'Operational', lodLevel: 3, activeVolunteers: 8 },
  { id: 'INF-SOM-10', templeId: 'somnath', name: 'Free Shoe Deposit Counter & Washing Bay', type: 'shoe_deposit', lat: 20.8890, lng: 70.4013, description: 'Organized token-based shoe holding for 15,000 pairs simultaneously', status: 'Operational', lodLevel: 3, activeVolunteers: 10 },
  { id: 'INF-SOM-11', templeId: 'somnath', name: 'Somnath Bhojanalaya & Mahaprasad Hall', type: 'food_court', lat: 20.8885, lng: 70.4026, description: 'Trust-managed Mahaprasad hall serving 4,000 meals/hr', status: 'Operational', lodLevel: 3, activeVolunteers: 12 },
  { id: 'INF-SOM-12', templeId: 'somnath', name: 'Sardar Patel Public Plaza & Light Show Area', type: 'public_plaza', lat: 20.8875, lng: 70.4018, description: 'Open sea-facing gathering plaza with 3,000 amphitheatre seating', status: 'Operational', lodLevel: 2 },
  { id: 'INF-SOM-13', templeId: 'somnath', name: 'Child Safety & Lost-Found Assistance Booth', type: 'lost_found', lat: 20.8891, lng: 70.4011, description: 'AI facial re-identification & biometric lost child reunion center', status: 'Active', lodLevel: 2, leadOfficer: 'Vol. Chief K. Dave', activeVolunteers: 4 },
  { id: 'INF-SOM-14', templeId: 'somnath', name: 'Triveni Sangam Holy Ghats & Snan Kund', type: 'ghat', lat: 20.8865, lng: 70.4140, description: 'Confluence of Hiran, Kapila & Saraswati Rivers with SDRF life guards', status: 'Operational', lodLevel: 1, activePolice: 8 },
  { id: 'INF-SOM-15', templeId: 'somnath', name: 'Digvijay Entry Metal Detector & X-Ray Scanner Bay', type: 'security_scanner', lat: 20.8892, lng: 70.4014, description: '4x Dual-view X-Ray baggage scanner & DFMD metal detector portals', status: 'Active', lodLevel: 4, activePolice: 6 },
  { id: 'INF-SOM-16', templeId: 'somnath', name: 'Prabhas Patan Bus Drop-off Staging Bay', type: 'bus_stand', lat: 20.8925, lng: 70.4040, description: 'Dedicated bus passenger staging and shuttle disembarkation area', status: 'Operational', lodLevel: 2, activeVolunteers: 6 },
  { id: 'INF-SOM-17', templeId: 'somnath', name: 'Cold RO Drinking Water & ORS Station 1', type: 'water_station', lat: 20.8887, lng: 70.4015, description: 'Chilled RO filtration & electrolyte distribution post', status: 'Operational', lodLevel: 4, activeVolunteers: 2 },
  { id: 'INF-SOM-18', templeId: 'somnath', name: 'Aarti Pre-Release Holding Enclosure (Bay Alpha)', type: 'holding_area', lat: 20.8884, lng: 70.4014, description: 'Controlled 800-person holding corridor for Aarti batches', status: 'Congested', lodLevel: 3, activePolice: 6 },
  { id: 'INF-SOM-19', templeId: 'somnath', name: 'Mojo Heavy Crowd Barricade Line Sector 1', type: 'barricade', lat: 20.8886, lng: 70.4013, description: 'Interlocking steel barricades regulating queue snake formation', status: 'Active', lodLevel: 4, activePolice: 4 },

  // --- DWARKADHISH (Dwarka, Devbhumi Dwarka) ---
  { id: 'INF-DWK-01', templeId: 'dwarka', name: 'Moksha Dwar (North Main Entry from Bazaar)', type: 'main_gate', lat: 22.2386, lng: 68.9680, description: 'Main pedestrian portal with 6 queue holding barricade lines', status: 'Operational', lodLevel: 1, leadOfficer: 'Insp. M. B. Vala', activePolice: 10, activeVolunteers: 15 },
  { id: 'INF-DWK-02', templeId: 'dwarka', name: 'Swarg Dwar (56 Steps South Exit to Gomti)', type: 'exit_gate', lat: 22.2371, lng: 68.9677, description: 'Historic 56 marble steps egress descending towards sacred Gomti River', status: 'Congested', lodLevel: 1, activePolice: 8, activeVolunteers: 12 },
  { id: 'INF-DWK-03', templeId: 'dwarka', name: 'Jagat Mandir Core Sanctum (Sabha Mandap & Nij Mandir)', type: 'temple_core', lat: 22.2378, lng: 68.9678, description: '7-storey temple spire sanctum housing Lord Dwarkadhish idol', status: 'High Alert', lodLevel: 1, capacity: '1,200 Devotees / Turn', activePolice: 14, activeVolunteers: 18 },
  { id: 'INF-DWK-04', templeId: 'dwarka', name: 'VIP Entry Gate (Eastern Sharda Peeth)', type: 'vip_gate', lat: 22.2380, lng: 68.9685, description: 'Protocol access lane adjacent to Adi Shankaracharya Sharda Peeth', status: 'Operational', lodLevel: 2, activePolice: 4, activeVolunteers: 4 },
  { id: 'INF-DWK-05', templeId: 'dwarka', name: 'Gomti Ghat & Sudama Setu Suspension Bridge', type: 'ghat', lat: 22.2360, lng: 68.9665, description: 'Pedestrian suspension bridge spanning Gomti to Panchtirthi beach', status: 'Operational', lodLevel: 1, leadOfficer: 'SDRF River Patrol Chief', activePolice: 6 },
  { id: 'INF-DWK-06', templeId: 'dwarka', name: 'Dwarka GSRTC Central Bus Stand & Transit Hub', type: 'bus_stand', lat: 22.2425, lng: 68.9710, description: 'Inter-district express transit terminal & taxi stand', status: 'Operational', lodLevel: 1, activePolice: 4 },
  { id: 'INF-DWK-07', templeId: 'dwarka', name: 'Temple Market & Bhadkeshwar Concourse', type: 'public_plaza', lat: 22.2390, lng: 68.9685, description: 'Historic pilgrim bazaar street with religious articles and sweet shops', status: 'Operational', lodLevel: 2 },
  { id: 'INF-DWK-08', templeId: 'dwarka', name: 'Gomti South Tourist Parking Facility', type: 'parking', lat: 22.2355, lng: 68.9650, description: 'Open parking lot for 800 four-wheelers & tourist coaches', status: 'Operational', lodLevel: 1, capacity: '800 Vehicles', activePolice: 4 },
  { id: 'INF-DWK-09', templeId: 'dwarka', name: 'Dwarka Police Station & QRF Camp (Chowk CP)', type: 'police_control', lat: 22.2388, lng: 68.9681, description: 'Central security command with drone surveillance launchpad', status: 'Active', lodLevel: 2, activePolice: 14 },
  { id: 'INF-DWK-10', templeId: 'dwarka', name: '108 Emergency Medical Post (Gomti Steps Base)', type: 'medical_camp', lat: 22.2368, lng: 68.9672, description: 'Emergency heatstroke treatment and mobile hydration dispensary', status: 'Operational', lodLevel: 2, activeVolunteers: 4 },
  { id: 'INF-DWK-11', templeId: 'dwarka', name: 'Moksha Security X-Ray & DFMD Inspection Portal', type: 'security_scanner', lat: 22.2384, lng: 68.9679, description: 'Multi-lane baggage scanner and physical security frisker booths', status: 'Active', lodLevel: 4, activePolice: 6 },
  { id: 'INF-DWK-12', templeId: 'dwarka', name: 'Gomti Ghat Pilgrim Hydration & Water Kiosk', type: 'water_station', lat: 22.2366, lng: 68.9670, description: 'Free clean water dispensing unit for bathers and elderly devotees', status: 'Operational', lodLevel: 4, activeVolunteers: 2 },

  // --- AMBAJI (Banaskantha) ---
  { id: 'INF-AMB-01', templeId: 'ambaji', name: 'Shakti Dwar & Chachar Chowk (Main Temple Entrance)', type: 'main_gate', lat: 24.3315, lng: 72.8520, description: 'Grand ornate marble portal opening to the vast ceremonial courtyard', status: 'Congested', lodLevel: 1, leadOfficer: 'Insp. P. D. Joshi', activePolice: 14, activeVolunteers: 22 },
  { id: 'INF-AMB-02', templeId: 'ambaji', name: 'Visoyantra Sanctum & Golden Kalash Shikhara', type: 'temple_core', lat: 24.3312, lng: 72.8522, description: 'Holy Garbhagriha with sacred Kurma-shaped Visoyantra darshan', status: 'High Alert', lodLevel: 1, capacity: '1,500 Devotees / Batch', activePolice: 12, activeVolunteers: 18 },
  { id: 'INF-AMB-03', templeId: 'ambaji', name: 'VIP Darshan Gate No. 3 (Trust Administrative Wing)', type: 'vip_gate', lat: 24.3310, lng: 72.8528, description: 'Regulated protocol access with automated digital QR token validator', status: 'Operational', lodLevel: 2, activePolice: 4, activeVolunteers: 4 },
  { id: 'INF-AMB-04', templeId: 'ambaji', name: 'Gabbar Hill Ropeway Base Terminal (Udan Khatola)', type: 'ropeway_station', lat: 24.3160, lng: 72.8250, description: 'Continuous bi-cable passenger ropeway ascending to Gabbar Peak (4 m/s)', status: 'Operational', lodLevel: 1, capacity: '1,200 Passengers / Hour', activePolice: 6, activeVolunteers: 12 },
  { id: 'INF-AMB-05', templeId: 'ambaji', name: 'Gabbar Hill Summit Plaza (Akhand Jyot Temple)', type: 'temple_core', lat: 24.3145, lng: 72.8220, description: 'Hilltop Shakti Peeth shrine reached by ropeway or 999 stone steps', status: 'Operational', lodLevel: 1, activePolice: 8, activeVolunteers: 10 },
  { id: 'INF-AMB-06', templeId: 'ambaji', name: 'Yatri Bhavan Mega Complex & Annakshetra', type: 'food_court', lat: 24.3325, lng: 72.8540, description: 'Government pilgrimage rest complex with 5,000 capacity free dining hall', status: 'Operational', lodLevel: 2, activeVolunteers: 15 },
  { id: 'INF-AMB-07', templeId: 'ambaji', name: 'Ambaji Central Multi-level Parking Zone A', type: 'parking', lat: 24.3340, lng: 72.8510, description: 'GSRTC interstate terminal with multi-tier parking for 1,200 vehicles', status: 'Operational', lodLevel: 1, capacity: '1,200 Vehicles', activePolice: 6 },
  { id: 'INF-AMB-08', templeId: 'ambaji', name: 'Banaskantha Red Cross Medical Emergency Base', type: 'medical_camp', lat: 24.3320, lng: 72.8530, description: 'Full field trauma unit with oxygen supply and 4 emergency ambulances', status: 'Active', lodLevel: 2, activeVolunteers: 6 },
  { id: 'INF-AMB-09', templeId: 'ambaji', name: 'Chachar Chowk Central Holding Compound', type: 'holding_area', lat: 24.3311, lng: 72.8520, description: 'Spacious marble courtyard holding bay with overhead rain canopy', status: 'Operational', lodLevel: 3, activePolice: 8 },
  { id: 'INF-AMB-10', templeId: 'ambaji', name: 'Shakti Dwar Security Baggage Scanner Hub', type: 'security_scanner', lat: 24.3314, lng: 72.8519, description: 'High-speed baggage inspection tunnel with dual operator screens', status: 'Active', lodLevel: 4, activePolice: 4 },

  // --- PAVAGADH (Panchmahal) ---
  { id: 'INF-PVG-01', templeId: 'pavagadh', name: 'Machi Plateau Bus Depot & Base Gate', type: 'main_gate', lat: 22.4590, lng: 73.5320, description: 'Intermediate hill plateau where road transport terminates and ascent begins', status: 'Operational', lodLevel: 1, leadOfficer: 'Insp. G. K. Rathwa', activePolice: 10, activeVolunteers: 16 },
  { id: 'INF-PVG-02', templeId: 'pavagadh', name: 'Lower Ropeway Station (Udan Khatola Machi Terminal)', type: 'ropeway_station', lat: 22.4600, lng: 73.5290, description: 'High-speed mono-cable gondola climbing 762m elevation to summit', status: 'Operational', lodLevel: 1, capacity: '1,400 Passengers / Hour', activePolice: 6, activeVolunteers: 12 },
  { id: 'INF-PVG-03', templeId: 'pavagadh', name: 'Upper Ropeway Station (Summit Terminal & Ridge)', type: 'ropeway_station', lat: 22.4625, lng: 73.5215, description: 'Upper cable car debarkation point connecting to summit stair trail', status: 'Congested', lodLevel: 1, activePolice: 8, activeVolunteers: 10 },
  { id: 'INF-PVG-04', templeId: 'pavagadh', name: 'Maa Mahakali Temple (Cliff Peak Sanctum & Shikhara)', type: 'temple_core', lat: 22.4632, lng: 73.5204, description: 'Historic hilltop Shakti Peeth atop the volcanic cliff of Pavagadh', status: 'High Alert', lodLevel: 1, capacity: '600 Devotees / Batch', activePolice: 12, activeVolunteers: 14 },
  { id: 'INF-PVG-05', templeId: 'pavagadh', name: 'VIP / Emergency Helipad Route & Ridge Trail', type: 'vip_gate', lat: 22.4615, lng: 73.5230, description: 'Direct mountain ridge corridor reserved for rescue stretchers & state officials', status: 'Operational', lodLevel: 2, activePolice: 4 },
  { id: 'INF-PVG-06', templeId: 'pavagadh', name: 'Manchi Foothills Tourist Parking Complex', type: 'parking', lat: 22.4580, lng: 73.5350, description: 'Staging ground parking for 1,500 private cars and heavy buses', status: 'Operational', lodLevel: 1, capacity: '1,500 Vehicles', activePolice: 6 },
  { id: 'INF-PVG-07', templeId: 'pavagadh', name: 'SDRF High-Altitude Mountain Rescue Post (Machi)', type: 'police_control', lat: 22.4605, lng: 73.5260, description: 'Specialized cliff evacuation unit with motorized winch carts & rescue drones', status: 'Active', lodLevel: 2, activePolice: 12 },
  { id: 'INF-PVG-08', templeId: 'pavagadh', name: '108 Mountain Medical Aid Outpost (Summit)', type: 'medical_camp', lat: 22.4628, lng: 73.5208, description: 'High-altitude oxygen bar and emergency medical stabilization clinic', status: 'Operational', lodLevel: 2, activeVolunteers: 4 },
  { id: 'INF-PVG-09', templeId: 'pavagadh', name: 'Machi Base Camp ORS & Water Hub', type: 'water_station', lat: 22.4595, lng: 73.5310, description: 'Emergency rehydration and glucose water dispensary before steep climb', status: 'Operational', lodLevel: 4, activeVolunteers: 2 },
  { id: 'INF-PVG-10', templeId: 'pavagadh', name: 'Summit Entry Security Checkpoint & DFMD', type: 'security_scanner', lat: 22.4630, lng: 73.5206, description: 'Single-file metal detector and baggage safety inspection post', status: 'Active', lodLevel: 4, activePolice: 4 },
];

export const MAP_MARKERS = DIGITAL_TWIN_INFRASTRUCTURE;

// ============================================================
// DIGITAL TWIN ROADS, QUEUE CORRIDORS & EVACUATION PATHS
// ============================================================

export interface DigitalTwinRoute {
  id: string;
  templeId: TempleId;
  name: string;
  type: 'road' | 'pathway' | 'evacuation' | 'ropeway' | 'vip';
  direction: 'inflow' | 'outflow' | 'bidirectional' | 'evac';
  color: string;
  width: number;
  dashArray?: string;
  coordinates: [number, number][];
  description: string;
  flowRatePerMin: number;
  occupancyPct: number;
  lodLevel: 1 | 2 | 3;
}

export const DIGITAL_TWIN_ROUTES: DigitalTwinRoute[] = [
  // --- SOMNATH ROUTES ---
  { id: 'ROUTE-SOM-01', templeId: 'somnath', name: 'Digvijay Dwar North Approach Highway', type: 'road', direction: 'inflow', color: '#60A5FA', width: 5, coordinates: [[20.8930, 70.4045], [20.8910, 70.4035], [20.8898, 70.4020], [20.8893, 70.4015]], description: 'Main vehicular access corridor from Veraval Highway to Somnath Plaza', flowRatePerMin: 120, occupancyPct: 78, lodLevel: 1 },
  { id: 'ROUTE-SOM-02', templeId: 'somnath', name: 'Digvijay Inflow Barricaded Queue Concourse', type: 'pathway', direction: 'inflow', color: '#10B981', width: 4, dashArray: '6, 6', coordinates: [[20.8893, 70.4015], [20.8888, 70.4014], [20.8884, 70.4013], [20.8880, 70.4012]], description: 'Barricaded one-way pedestrian queue line into Garbhagriha', flowRatePerMin: 45, occupancyPct: 89, lodLevel: 1 },
  { id: 'ROUTE-SOM-03', templeId: 'somnath', name: 'Sagar Darshan Seafront Promenade Exit', type: 'pathway', direction: 'outflow', color: '#34D399', width: 4, coordinates: [[20.8880, 70.4012], [20.8875, 70.4010], [20.8872, 70.4010], [20.8870, 70.4018], [20.8875, 70.4025]], description: 'Scenic seafront discharge promenade with sea-breeze dispersal corridor', flowRatePerMin: 55, occupancyPct: 52, lodLevel: 1 },
  { id: 'ROUTE-SOM-04', templeId: 'somnath', name: 'Emergency Coastal Evacuation Highway', type: 'evacuation', direction: 'evac', color: '#EF4444', width: 4, dashArray: '5, 5', coordinates: [[20.8880, 70.4012], [20.8878, 70.4022], [20.8885, 70.4040], [20.8895, 70.4055]], description: 'Designated rapid egress route for ambulances to Veraval Civil Hospital', flowRatePerMin: 0, occupancyPct: 5, lodLevel: 1 },
  { id: 'ROUTE-SOM-05', templeId: 'somnath', name: 'VIP Dignitary Protocol Electric Buggy Lane', type: 'vip', direction: 'bidirectional', color: '#A855F7', width: 3.5, coordinates: [[20.8898, 70.4005], [20.8890, 70.4015], [20.8882, 70.4022], [20.8880, 70.4012]], description: 'Segregated lane for senior citizens and protocol dignitaries', flowRatePerMin: 18, occupancyPct: 35, lodLevel: 2 },
  { id: 'ROUTE-SOM-06', templeId: 'somnath', name: 'Triveni Sangam East Access Road', type: 'road', direction: 'bidirectional', color: '#60A5FA', width: 3.5, coordinates: [[20.8893, 70.4015], [20.8885, 70.4060], [20.8875, 70.4100], [20.8865, 70.4140]], description: 'Connects Somnath Main Plaza to Triveni Sangam Ghats', flowRatePerMin: 80, occupancyPct: 62, lodLevel: 2 },

  // --- DWARKA ROUTES ---
  { id: 'ROUTE-DWK-01', templeId: 'dwarka', name: 'Bhadkeshwar Market Access Road', type: 'road', direction: 'inflow', color: '#60A5FA', width: 5, coordinates: [[22.2430, 68.9720], [22.2405, 68.9695], [22.2388, 68.9681], [22.2386, 68.9680]], description: 'Main arterial road from Dwarka Bus Stand to Moksha Dwar Chowk', flowRatePerMin: 95, occupancyPct: 75, lodLevel: 1 },
  { id: 'ROUTE-DWK-02', templeId: 'dwarka', name: 'Moksha to Sanctum Inflow Queue Corridors', type: 'pathway', direction: 'inflow', color: '#10B981', width: 4, dashArray: '6, 6', coordinates: [[22.2386, 68.9680], [22.2382, 68.9679], [22.2378, 68.9678]], description: 'North gate inbound queue passing through security metal detectors', flowRatePerMin: 40, occupancyPct: 93, lodLevel: 1 },
  { id: 'ROUTE-DWK-03', templeId: 'dwarka', name: '56 Steps Swarg Dwar Descent to Gomti', type: 'pathway', direction: 'outflow', color: '#34D399', width: 4, coordinates: [[22.2378, 68.9678], [22.2375, 68.9677], [22.2371, 68.9677], [22.2365, 68.9672], [22.2360, 68.9665]], description: 'Steep historic marble staircase exiting to Gomti Ghat and Sudama Setu', flowRatePerMin: 50, occupancyPct: 70, lodLevel: 1 },
  { id: 'ROUTE-DWK-04', templeId: 'dwarka', name: 'North Bazaar Emergency Medical Corridor', type: 'evacuation', direction: 'evac', color: '#EF4444', width: 4, dashArray: '5, 5', coordinates: [[22.2378, 68.9678], [22.2385, 68.9685], [22.2400, 68.9700], [22.2420, 68.9720]], description: 'Clear corridor connecting Jagat Mandir East to NH-51 Express Highway', flowRatePerMin: 0, occupancyPct: 10, lodLevel: 1 },

  // --- AMBAJI ROUTES ---
  { id: 'ROUTE-AMB-01', templeId: 'ambaji', name: 'Abu Road State Highway Corridor', type: 'road', direction: 'inflow', color: '#60A5FA', width: 5, coordinates: [[24.3380, 72.8500], [24.3340, 72.8510], [24.3325, 72.8518], [24.3315, 72.8520]], description: 'High-capacity dual carriageway entering Ambaji pilgrim hub', flowRatePerMin: 150, occupancyPct: 82, lodLevel: 1 },
  { id: 'ROUTE-AMB-02', templeId: 'ambaji', name: 'Chachar Chowk Inflow Concourse Queue', type: 'pathway', direction: 'inflow', color: '#10B981', width: 4, dashArray: '6, 6', coordinates: [[24.3315, 72.8520], [24.3313, 72.8521], [24.3312, 72.8522]], description: 'Grand ceremonial courtyard holding queues for sanctum darshan', flowRatePerMin: 60, occupancyPct: 87, lodLevel: 1 },
  { id: 'ROUTE-AMB-03', templeId: 'ambaji', name: 'Gabbar Hill Udan Khatola Ropeway Cableway', type: 'ropeway', direction: 'bidirectional', color: '#F59E0B', width: 4, dashArray: '8, 4', coordinates: [[24.3160, 72.8250], [24.3155, 72.8235], [24.3145, 72.8220]], description: 'Bi-cable aerial passenger ropeway carrying 1,200 devotees/hr up Gabbar Hill', flowRatePerMin: 20, occupancyPct: 88, lodLevel: 1 },
  { id: 'ROUTE-AMB-04', templeId: 'ambaji', name: 'Gabbar Hill 999 Steps Pilgrim Stair Trail', type: 'pathway', direction: 'bidirectional', color: '#34D399', width: 3, coordinates: [[24.3165, 72.8255], [24.3158, 72.8240], [24.3150, 72.8230], [24.3145, 72.8220]], description: 'Traditional pedestrian stone staircase up the Gabbar rock face', flowRatePerMin: 25, occupancyPct: 65, lodLevel: 2 },

  // --- PAVAGADH ROUTES ---
  { id: 'ROUTE-PVG-01', templeId: 'pavagadh', name: 'Champaner to Machi Ghat Winding Road', type: 'road', direction: 'inflow', color: '#60A5FA', width: 5, coordinates: [[22.4550, 73.5420], [22.4570, 73.5380], [22.4580, 73.5350], [22.4590, 73.5320]], description: 'Steep hill road with 11 hairpin turns managed by SDRF checkpoints', flowRatePerMin: 60, occupancyPct: 70, lodLevel: 1 },
  { id: 'ROUTE-PVG-02', templeId: 'pavagadh', name: 'Udan Khatola Aerial Cableway (Machi to Summit)', type: 'ropeway', direction: 'bidirectional', color: '#F59E0B', width: 4, dashArray: '8, 4', coordinates: [[22.4600, 73.5290], [22.4612, 73.5250], [22.4625, 73.5215]], description: 'Mono-cable ropeway ascending 292 meters vertical rise in 6 minutes', flowRatePerMin: 25, occupancyPct: 87, lodLevel: 1 },
  { id: 'ROUTE-PVG-03', templeId: 'pavagadh', name: 'Historical 2,000 Steps Trail via Dudhia Talav', type: 'pathway', direction: 'bidirectional', color: '#34D399', width: 3, coordinates: [[22.4590, 73.5320], [22.4600, 73.5280], [22.4610, 73.5245], [22.4620, 73.5225], [22.4632, 73.5204]], description: 'Heritage pedestrian stone steps climbing through medieval gates & Dudhia lake', flowRatePerMin: 35, occupancyPct: 60, lodLevel: 2 },
  { id: 'ROUTE-PVG-04', templeId: 'pavagadh', name: 'Summit Cliff Emergency Winch & Air-Evac Trail', type: 'evacuation', direction: 'evac', color: '#EF4444', width: 4, dashArray: '5, 5', coordinates: [[22.4632, 73.5204], [22.4625, 73.5215], [22.4615, 73.5230], [22.4605, 73.5260]], description: 'Specialized mountain evacuation trail equipped with stretcher trolley wire', flowRatePerMin: 0, occupancyPct: 5, lodLevel: 1 },
];

// ============================================================
// DIGITAL TWIN OPERATIONAL ZONES (POLYGONS WITH TELEMETRY)
// ============================================================

export interface DigitalTwinZone {
  id: string;
  templeId: TempleId;
  name: string;
  code: string;
  color: string;
  density: number;
  visitors: number;
  capacity: number;
  coordinates: [number, number][];
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  camerasCount: number;
  volunteersCount: number;
  policeCount: number;
  medicalCount: number;
  pred15m: number; // predicted density %
  pred30m: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  lodLevel: 1 | 2 | 3;
}

export const DIGITAL_TWIN_ZONES: DigitalTwinZone[] = [
  // --- SOMNATH ZONES ---
  { id: 'ZONE-SOM-1', templeId: 'somnath', name: 'Garbhagriha & Nandi Mandap Core', code: 'SEC-CORE-01', color: '#EF4444', density: 91, visitors: 3200, capacity: 3500, coordinates: [[20.8883, 70.4009], [20.8883, 70.4015], [20.8877, 70.4015], [20.8877, 70.4009]], riskLevel: 'Critical', camerasCount: 8, volunteersCount: 20, policeCount: 12, medicalCount: 4, pred15m: 94, pred30m: 88, trend: 'increasing', lodLevel: 1 },
  { id: 'ZONE-SOM-2', templeId: 'somnath', name: 'Digvijay Dwar Holding Bay & Plaza', code: 'INFLOW-BAY-02', color: '#F59E0B', density: 88, visitors: 4500, capacity: 5000, coordinates: [[20.8896, 70.4011], [20.8896, 70.4018], [20.8889, 70.4018], [20.8889, 70.4011]], riskLevel: 'High', camerasCount: 6, volunteersCount: 14, policeCount: 8, medicalCount: 2, pred15m: 90, pred30m: 92, trend: 'increasing', lodLevel: 1 },
  { id: 'ZONE-SOM-3', templeId: 'somnath', name: 'Sagar Darshan Seafront Public Area', code: 'COAST-PLAZA-03', color: '#10B981', density: 52, visitors: 2100, capacity: 4000, coordinates: [[20.8876, 70.4005], [20.8876, 70.4022], [20.8868, 70.4022], [20.8868, 70.4005]], riskLevel: 'Low', camerasCount: 4, volunteersCount: 8, policeCount: 4, medicalCount: 2, pred15m: 54, pred30m: 50, trend: 'stable', lodLevel: 1 },
  { id: 'ZONE-SOM-4', templeId: 'somnath', name: 'Prabhas Patan Heavy Bus Parking Zone', code: 'PARK-HEAVY-04', color: '#3B82F6', density: 81, visitors: 1600, capacity: 2000, coordinates: [[20.8916, 70.4030], [20.8916, 70.4042], [20.8904, 70.4042], [20.8904, 70.4030]], riskLevel: 'Medium', camerasCount: 4, volunteersCount: 6, policeCount: 6, medicalCount: 1, pred15m: 85, pred30m: 78, trend: 'stable', lodLevel: 2 },

  // --- DWARKA ZONES ---
  { id: 'ZONE-DWK-1', templeId: 'dwarka', name: 'Jagat Mandir Core Sanctum Zone', code: 'CORE-DWK-01', color: '#EF4444', density: 93, visitors: 2800, capacity: 3000, coordinates: [[22.2381, 68.9675], [22.2381, 68.9682], [22.2374, 68.9682], [22.2374, 68.9675]], riskLevel: 'Critical', camerasCount: 7, volunteersCount: 18, policeCount: 14, medicalCount: 4, pred15m: 95, pred30m: 90, trend: 'increasing', lodLevel: 1 },
  { id: 'ZONE-DWK-2', templeId: 'dwarka', name: 'Moksha Dwar Bazaar Queue Concourse', code: 'MOKSHA-IN-02', color: '#F59E0B', density: 78, visitors: 3600, capacity: 4500, coordinates: [[22.2392, 68.9677], [22.2392, 68.9686], [22.2383, 68.9686], [22.2383, 68.9677]], riskLevel: 'High', camerasCount: 5, volunteersCount: 15, policeCount: 10, medicalCount: 2, pred15m: 82, pred30m: 80, trend: 'increasing', lodLevel: 1 },
  { id: 'ZONE-DWK-3', templeId: 'dwarka', name: 'Gomti Ghat & Sudama Setu Riverfront', code: 'GHAT-DWK-03', color: '#3B82F6', density: 67, visitors: 5400, capacity: 8000, coordinates: [[22.2370, 68.9658], [22.2370, 68.9675], [22.2355, 68.9675], [22.2355, 68.9658]], riskLevel: 'Medium', camerasCount: 6, volunteersCount: 25, policeCount: 12, medicalCount: 3, pred15m: 70, pred30m: 65, trend: 'stable', lodLevel: 1 },

  // --- AMBAJI ZONES ---
  { id: 'ZONE-AMB-1', templeId: 'ambaji', name: 'Chachar Chowk & Sanctum Core', code: 'CORE-AMB-01', color: '#EF4444', density: 87, visitors: 4800, capacity: 5500, coordinates: [[24.3318, 72.8517], [24.3318, 72.8526], [24.3308, 72.8526], [24.3308, 72.8517]], riskLevel: 'Critical', camerasCount: 8, volunteersCount: 18, policeCount: 15, medicalCount: 3, pred15m: 91, pred30m: 89, trend: 'increasing', lodLevel: 1 },
  { id: 'ZONE-AMB-2', templeId: 'ambaji', name: 'Gabbar Hill Ropeway Transit Zone', code: 'GABBAR-ROP-02', color: '#F59E0B', density: 88, visitors: 6200, capacity: 7000, coordinates: [[24.3168, 72.8215], [24.3168, 72.8260], [24.3140, 72.8260], [24.3140, 72.8215]], riskLevel: 'High', camerasCount: 12, volunteersCount: 40, policeCount: 20, medicalCount: 8, pred15m: 90, pred30m: 85, trend: 'stable', lodLevel: 1 },

  // --- PAVAGADH ZONES ---
  { id: 'ZONE-PVG-1', templeId: 'pavagadh', name: 'Mahakali Cliff Summit High-Risk Zone', code: 'SUMMIT-PVG-01', color: '#EF4444', density: 87, visitors: 3500, capacity: 4000, coordinates: [[22.4638, 73.5198], [22.4638, 73.5210], [22.4626, 73.5210], [22.4626, 73.5198]], riskLevel: 'Critical', camerasCount: 6, volunteersCount: 14, policeCount: 12, medicalCount: 4, pred15m: 90, pred30m: 84, trend: 'increasing', lodLevel: 1 },
  { id: 'ZONE-PVG-2', templeId: 'pavagadh', name: 'Machi Plateau Staging & Transit Base', code: 'MACHI-BASE-02', color: '#10B981', density: 60, visitors: 2800, capacity: 4500, coordinates: [[22.4605, 73.5280], [22.4605, 73.5355], [22.4575, 73.5355], [22.4575, 73.5280]], riskLevel: 'Medium', camerasCount: 8, volunteersCount: 16, policeCount: 10, medicalCount: 3, pred15m: 65, pred30m: 60, trend: 'stable', lodLevel: 1 },
];

// ============================================================
// SIMULATED SURVEILLANCE NETWORK WITH FOV CONES (30 CAMERAS PER TEMPLE)
// ============================================================

export type CameraType = 'PTZ' | 'Fixed' | 'Thermal' | 'ANPR' | 'Dome';

export interface CameraFeed {
  id: string;
  templeId: TempleId;
  name: string;
  zone: string;
  type: CameraType;
  orientation: string;
  orientationDeg: number;
  fovAngle: number;
  fovRadiusMeters: number;
  status: 'Online' | 'Degraded';
  fps: number;
  health: number;
  aiEnabled: boolean;
  lat: number;
  lng: number;
  peopleCount: number;
  density: number;
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  resolution: string;
  lodLevel: 1 | 2 | 3 | 4;
  streamUrl?: string;
  flowRate: number;
  queueCount: number;
  aiConfidence: number;
}

// 30 Cameras per Temple with exact operational placement & FOV angles
export const CAMERA_FEEDS: CameraFeed[] = [
  // --- SOMNATH (30 Cameras) ---
  { id: 'CAM-SOM-01', templeId: 'somnath', name: 'Digvijay Dwar Main North Gate Entry PTZ', zone: 'Digvijay Dwar', type: 'PTZ', orientation: '180° S', orientationDeg: 180, fovAngle: 90, fovRadiusMeters: 45, status: 'Online', fps: 30, health: 99, aiEnabled: true, lat: 20.8893, lng: 70.4015, peopleCount: 142, density: 88, risk: 'High', resolution: '4K UHD (3840x2160)', lodLevel: 1, flowRate: 48, queueCount: 220, aiConfidence: 99 },
  { id: 'CAM-SOM-02', templeId: 'somnath', name: 'Digvijay Security Metal Detector 1-4', zone: 'Digvijay Dwar', type: 'Fixed', orientation: '210° SW', orientationDeg: 210, fovAngle: 75, fovRadiusMeters: 25, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8891, lng: 70.4014, peopleCount: 88, density: 74, risk: 'Medium', resolution: '4K UHD', lodLevel: 2, flowRate: 35, queueCount: 110, aiConfidence: 98 },
  { id: 'CAM-SOM-03', templeId: 'somnath', name: 'VIP Protocol Gate Entry Corridor', zone: 'VIP Dwar Corridor', type: 'Dome', orientation: '270° W', orientationDeg: 270, fovAngle: 80, fovRadiusMeters: 30, status: 'Online', fps: 29, health: 98, aiEnabled: true, lat: 20.8882, lng: 70.4022, peopleCount: 24, density: 35, risk: 'Low', resolution: '4K UHD', lodLevel: 1, flowRate: 12, queueCount: 15, aiConfidence: 99 },
  { id: 'CAM-SOM-04', templeId: 'somnath', name: 'Nandi Mandap Core Sanctum Assembly', zone: 'Garbhagriha Core Sanctum', type: 'Dome', orientation: '0° N', orientationDeg: 0, fovAngle: 110, fovRadiusMeters: 35, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8880, lng: 70.4012, peopleCount: 165, density: 92, risk: 'Critical', resolution: '4K UHD', lodLevel: 1, flowRate: 52, queueCount: 310, aiConfidence: 99 },
  { id: 'CAM-SOM-05', templeId: 'somnath', name: 'Garbhagriha Jyotirlinga Darshan Line Alpha', zone: 'Garbhagriha Core Sanctum', type: 'Fixed', orientation: '90° E', orientationDeg: 90, fovAngle: 70, fovRadiusMeters: 20, status: 'Online', fps: 30, health: 99, aiEnabled: true, lat: 20.8879, lng: 70.4011, peopleCount: 94, density: 89, risk: 'High', resolution: '4K UHD', lodLevel: 2, flowRate: 38, queueCount: 140, aiConfidence: 98 },
  { id: 'CAM-SOM-06', templeId: 'somnath', name: 'Sagar Darshan Exit Promenade One-Way', zone: 'Sagar Darshan Promenade', type: 'Fixed', orientation: '160° SSE', orientationDeg: 160, fovAngle: 85, fovRadiusMeters: 40, status: 'Online', fps: 30, health: 97, aiEnabled: true, lat: 20.8872, lng: 70.4010, peopleCount: 68, density: 48, risk: 'Low', resolution: '4K UHD', lodLevel: 1, flowRate: 42, queueCount: 0, aiConfidence: 97 },
  { id: 'CAM-SOM-07', templeId: 'somnath', name: 'Arabian Sea Front Coastal Security Thermal', zone: 'Sea Front Security', type: 'Thermal', orientation: '225° SW', orientationDeg: 225, fovAngle: 120, fovRadiusMeters: 80, status: 'Online', fps: 28, health: 100, aiEnabled: true, lat: 20.8868, lng: 70.4005, peopleCount: 18, density: 20, risk: 'Low', resolution: 'Thermal 1080p', lodLevel: 2, flowRate: 5, queueCount: 0, aiConfidence: 96 },
  { id: 'CAM-SOM-08', templeId: 'somnath', name: 'Prabhas Patan Parking Lot A Heavy Inflow ANPR', zone: 'Parking Lot A', type: 'ANPR', orientation: '180° S', orientationDeg: 180, fovAngle: 60, fovRadiusMeters: 35, status: 'Online', fps: 30, health: 99, aiEnabled: true, lat: 20.8910, lng: 70.4035, peopleCount: 42, density: 81, risk: 'High', resolution: '4K ANPR', lodLevel: 1, flowRate: 18, queueCount: 45, aiConfidence: 99 },
  { id: 'CAM-SOM-09', templeId: 'somnath', name: 'Trust Parking Lot B EV Hub & Shuttle Bay', zone: 'Parking Lot B', type: 'PTZ', orientation: '90° E', orientationDeg: 90, fovAngle: 90, fovRadiusMeters: 40, status: 'Online', fps: 30, health: 98, aiEnabled: true, lat: 20.8898, lng: 70.4005, peopleCount: 55, density: 76, risk: 'Medium', resolution: '4K UHD', lodLevel: 2, flowRate: 22, queueCount: 30, aiConfidence: 98 },
  { id: 'CAM-SOM-10', templeId: 'somnath', name: 'Central Cloak Room & Digital Locker Counter', zone: 'Cloak Room Plaza', type: 'Fixed', orientation: '135° SE', orientationDeg: 135, fovAngle: 75, fovRadiusMeters: 25, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8888, lng: 70.4014, peopleCount: 78, density: 68, risk: 'Medium', resolution: '4K UHD', lodLevel: 2, flowRate: 30, queueCount: 85, aiConfidence: 98 },
  { id: 'CAM-SOM-11', templeId: 'somnath', name: 'Free Shoe Deposit & Washing Area', zone: 'Shoe Deposit', type: 'Fixed', orientation: '180° S', orientationDeg: 180, fovAngle: 80, fovRadiusMeters: 25, status: 'Online', fps: 30, health: 99, aiEnabled: true, lat: 20.8890, lng: 70.4013, peopleCount: 110, density: 79, risk: 'High', resolution: '4K UHD', lodLevel: 2, flowRate: 40, queueCount: 120, aiConfidence: 99 },
  { id: 'CAM-SOM-12', templeId: 'somnath', name: '108 Emergency Medical Post & Ambulance Bay', zone: 'Medical Base', type: 'Fixed', orientation: '270° W', orientationDeg: 270, fovAngle: 80, fovRadiusMeters: 30, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8889, lng: 70.4018, peopleCount: 14, density: 22, risk: 'Low', resolution: '4K UHD', lodLevel: 2, flowRate: 4, queueCount: 2, aiConfidence: 99 },
  { id: 'CAM-SOM-13', templeId: 'somnath', name: 'Somnath Mahaprasad Bhojanalaya Hall Inflow', zone: 'Food Court Plaza', type: 'Dome', orientation: '0° N', orientationDeg: 0, fovAngle: 100, fovRadiusMeters: 30, status: 'Online', fps: 29, health: 96, aiEnabled: true, lat: 20.8885, lng: 70.4026, peopleCount: 125, density: 72, risk: 'Medium', resolution: '4K UHD', lodLevel: 2, flowRate: 45, queueCount: 90, aiConfidence: 97 },
  { id: 'CAM-SOM-14', templeId: 'somnath', name: 'Sardar Patel Statue Public Gathering Plaza', zone: 'Public Plaza', type: 'PTZ', orientation: '45° NE', orientationDeg: 45, fovAngle: 110, fovRadiusMeters: 50, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8875, lng: 70.4018, peopleCount: 88, density: 50, risk: 'Low', resolution: '4K UHD', lodLevel: 2, flowRate: 25, queueCount: 0, aiConfidence: 98 },
  { id: 'CAM-SOM-15', templeId: 'somnath', name: 'Lost Child & Missing Persons Booth AI Recognition', zone: 'Lost & Found', type: 'Fixed', orientation: '180° S', orientationDeg: 180, fovAngle: 65, fovRadiusMeters: 20, status: 'Online', fps: 30, health: 99, aiEnabled: true, lat: 20.8891, lng: 70.4011, peopleCount: 12, density: 18, risk: 'Low', resolution: '4K Face-AI', lodLevel: 3, flowRate: 2, queueCount: 0, aiConfidence: 99 },
  { id: 'CAM-SOM-16', templeId: 'somnath', name: 'GSDMA Incident Command Post Alpha', zone: 'Police CP', type: 'Dome', orientation: '90° E', orientationDeg: 90, fovAngle: 90, fovRadiusMeters: 25, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8895, lng: 70.4012, peopleCount: 16, density: 25, risk: 'Low', resolution: '4K UHD', lodLevel: 3, flowRate: 0, queueCount: 0, aiConfidence: 100 },
  { id: 'CAM-SOM-17', templeId: 'somnath', name: 'Triveni Sangam Ghat Snan Concourse 1', zone: 'Triveni Sangam', type: 'PTZ', orientation: '135° SE', orientationDeg: 135, fovAngle: 100, fovRadiusMeters: 60, status: 'Online', fps: 28, health: 97, aiEnabled: true, lat: 20.8865, lng: 70.4140, peopleCount: 190, density: 85, risk: 'High', resolution: '4K UHD', lodLevel: 2, flowRate: 35, queueCount: 0, aiConfidence: 98 },
  { id: 'CAM-SOM-18', templeId: 'somnath', name: 'Triveni Sangam River Confluence Water Level Sensor', zone: 'Triveni Sangam', type: 'Fixed', orientation: '180° S', orientationDeg: 180, fovAngle: 80, fovRadiusMeters: 50, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8860, lng: 70.4145, peopleCount: 45, density: 30, risk: 'Low', resolution: '1080p Stream', lodLevel: 3, flowRate: 10, queueCount: 0, aiConfidence: 97 },
  { id: 'CAM-SOM-19', templeId: 'somnath', name: 'Veraval Highway Bus Drop-off Concourse', zone: 'Bus Drop-off', type: 'ANPR', orientation: '210° SW', orientationDeg: 210, fovAngle: 75, fovRadiusMeters: 40, status: 'Online', fps: 30, health: 99, aiEnabled: true, lat: 20.8925, lng: 70.4040, peopleCount: 95, density: 65, risk: 'Medium', resolution: '4K ANPR', lodLevel: 2, flowRate: 28, queueCount: 60, aiConfidence: 98 },
  { id: 'CAM-SOM-20', templeId: 'somnath', name: 'Emergency Evacuation Coastal Road Gate', zone: 'Emergency Exit', type: 'Fixed', orientation: '45° NE', orientationDeg: 45, fovAngle: 90, fovRadiusMeters: 35, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8885, lng: 70.4040, peopleCount: 8, density: 12, risk: 'Low', resolution: '4K UHD', lodLevel: 3, flowRate: 0, queueCount: 0, aiConfidence: 99 },
  { id: 'CAM-SOM-21', templeId: 'somnath', name: 'Temple Market Corridor & Souvenir Arcade', zone: 'Marketplace', type: 'Dome', orientation: '180° S', orientationDeg: 180, fovAngle: 85, fovRadiusMeters: 30, status: 'Online', fps: 30, health: 98, aiEnabled: true, lat: 20.8896, lng: 70.4025, peopleCount: 130, density: 78, risk: 'Medium', resolution: '4K UHD', lodLevel: 2, flowRate: 32, queueCount: 0, aiConfidence: 97 },
  { id: 'CAM-SOM-22', templeId: 'somnath', name: 'Queue Holding Barricade Sector 1', zone: 'Queue Corridors', type: 'Fixed', orientation: '180° S', orientationDeg: 180, fovAngle: 70, fovRadiusMeters: 25, status: 'Online', fps: 30, health: 99, aiEnabled: true, lat: 20.8887, lng: 70.4013, peopleCount: 155, density: 90, risk: 'High', resolution: '4K UHD', lodLevel: 3, flowRate: 45, queueCount: 180, aiConfidence: 99 },
  { id: 'CAM-SOM-23', templeId: 'somnath', name: 'Queue Holding Barricade Sector 2 (Aarti Release)', zone: 'Queue Corridors', type: 'Fixed', orientation: '180° S', orientationDeg: 180, fovAngle: 70, fovRadiusMeters: 25, status: 'Online', fps: 30, health: 99, aiEnabled: true, lat: 20.8884, lng: 70.4013, peopleCount: 172, density: 94, risk: 'Critical', resolution: '4K UHD', lodLevel: 3, flowRate: 50, queueCount: 240, aiConfidence: 99 },
  { id: 'CAM-SOM-24', templeId: 'somnath', name: 'Senior Citizen Electric Buggy Track', zone: 'VIP Dwar Corridor', type: 'Fixed', orientation: '270° W', orientationDeg: 270, fovAngle: 80, fovRadiusMeters: 30, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8881, lng: 70.4018, peopleCount: 30, density: 40, risk: 'Low', resolution: '4K UHD', lodLevel: 3, flowRate: 15, queueCount: 20, aiConfidence: 98 },
  { id: 'CAM-SOM-25', templeId: 'somnath', name: 'Sound & Light Show Amphitheatre Exit', zone: 'Public Plaza', type: 'PTZ', orientation: '315° NW', orientationDeg: 315, fovAngle: 100, fovRadiusMeters: 40, status: 'Online', fps: 30, health: 98, aiEnabled: true, lat: 20.8872, lng: 70.4022, peopleCount: 45, density: 35, risk: 'Low', resolution: '4K UHD', lodLevel: 3, flowRate: 20, queueCount: 0, aiConfidence: 98 },
  { id: 'CAM-SOM-26', templeId: 'somnath', name: 'Digvijay East Perimeter Wall Patrol', zone: 'Digvijay Dwar', type: 'Fixed', orientation: '90° E', orientationDeg: 90, fovAngle: 80, fovRadiusMeters: 35, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8894, lng: 70.4022, peopleCount: 22, density: 28, risk: 'Low', resolution: '4K UHD', lodLevel: 3, flowRate: 6, queueCount: 0, aiConfidence: 99 },
  { id: 'CAM-SOM-27', templeId: 'somnath', name: 'Security Baggage Scanner Screening Bay 2', zone: 'Security Checkpoint', type: 'Fixed', orientation: '210° SW', orientationDeg: 210, fovAngle: 75, fovRadiusMeters: 20, status: 'Online', fps: 30, health: 99, aiEnabled: true, lat: 20.8892, lng: 70.4016, peopleCount: 82, density: 70, risk: 'Medium', resolution: '4K UHD', lodLevel: 3, flowRate: 35, queueCount: 95, aiConfidence: 99 },
  { id: 'CAM-SOM-28', templeId: 'somnath', name: 'Volunteer Station Bravo Dispatch Post', zone: 'Volunteer Post', type: 'Dome', orientation: '0° N', orientationDeg: 0, fovAngle: 90, fovRadiusMeters: 25, status: 'Online', fps: 30, health: 100, aiEnabled: true, lat: 20.8886, lng: 70.4017, peopleCount: 18, density: 30, risk: 'Low', resolution: '4K UHD', lodLevel: 3, flowRate: 8, queueCount: 0, aiConfidence: 99 },
  { id: 'CAM-SOM-29', templeId: 'somnath', name: 'Arabian Sea Coast High-Tide Warning Post', zone: 'Sea Front Security', type: 'Thermal', orientation: '270° W', orientationDeg: 270, fovAngle: 110, fovRadiusMeters: 70, status: 'Online', fps: 29, health: 96, aiEnabled: true, lat: 20.8870, lng: 70.4002, peopleCount: 10, density: 15, risk: 'Low', resolution: 'Thermal 1080p', lodLevel: 3, flowRate: 3, queueCount: 0, aiConfidence: 98 },
  { id: 'CAM-SOM-30', templeId: 'somnath', name: 'Prabhas Patan Heavy Vehicle Buffer Area', zone: 'Parking Lot A', type: 'PTZ', orientation: '0° N', orientationDeg: 0, fovAngle: 90, fovRadiusMeters: 45, status: 'Online', fps: 30, health: 99, aiEnabled: true, lat: 20.8918, lng: 70.4042, peopleCount: 35, density: 60, risk: 'Medium', resolution: '4K UHD', lodLevel: 3, flowRate: 15, queueCount: 25, aiConfidence: 98 },

  // --- DWARKA (30 Cameras) ---
  ...Array.from({ length: 30 }).map((_, i) => {
    const camIndex = i + 1;
    const names = [
      'Moksha Dwar North Main Entry PTZ', 'Moksha Inbound Security Scanner 1', 'Moksha Queue Holding Barricade 1', 'Jagat Mandir Sabha Mandap High Dome', 'Nij Mandir Sanctum Darshan Line',
      'Swarg Dwar 56 Steps Upper Landing', 'Swarg Dwar 56 Steps Middle Flight', 'Swarg Dwar Gomti Exit Portal', 'Sudama Setu Suspension Bridge Entry', 'Sudama Setu Middle Span Patrol',
      'Gomti Riverfront Ghat Snan Kund 1', 'Gomti Riverfront Ghat Snan Kund 2', 'VIP Sharda Peeth East Entrance', 'Dwarka GSRTC Bus Stand Arrival Platform', 'Dwarka Bus Stand Departure Queue',
      'Gomti South Tourist Parking ANPR', 'Gomti South Parking Bus Bay Sector', 'Bhadkeshwar Market Bazaar Lane 1', 'Bhadkeshwar Market Bazaar Lane 2', 'Moksha Chowk Police Control Room CP',
      '108 Emergency Medical Post Gomti Base', 'Dwarka Trust Prasad Distribution Counter', 'Clock Tower Footfall Density Scanner', 'Lost Child & Helpdesk Center Dwarka', 'Emergency North Evacuation Route NH-51',
      'Chakratirth Beach Marine Security', 'Panchtirthi Pilgrim Island Crossing', 'Temple Treasury & Gold Dome Perimeter', 'Dwarka Volunteer Coordination Post 1', 'Dwarka Volunteer Coordination Post 2'
    ];
    const types: CameraType[] = ['PTZ', 'Fixed', 'Fixed', 'Dome', 'Fixed', 'Fixed', 'Fixed', 'Fixed', 'PTZ', 'Fixed', 'PTZ', 'Fixed', 'Dome', 'ANPR', 'Fixed', 'ANPR', 'Fixed', 'Fixed', 'Fixed', 'Dome', 'Fixed', 'Fixed', 'Fixed', 'Fixed', 'PTZ', 'Thermal', 'Fixed', 'Dome', 'Fixed', 'Fixed'];
    const risks: ('Low' | 'Medium' | 'High' | 'Critical')[] = ['High', 'Medium', 'High', 'Critical', 'Critical', 'High', 'High', 'Medium', 'Medium', 'Low', 'High', 'Medium', 'Low', 'Medium', 'Medium', 'High', 'Medium', 'Medium', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low'];
    const lods: (1 | 2 | 3)[] = [1, 2, 2, 1, 1, 1, 2, 1, 1, 2, 2, 3, 1, 1, 2, 1, 2, 2, 3, 2, 2, 3, 3, 3, 2, 3, 3, 3, 3, 3];
    const baseLat = 22.2378;
    const baseLng = 68.9678;
    const offsetLat = (Math.sin(i * 1.3) * 0.0035);
    const offsetLng = (Math.cos(i * 1.3) * 0.0035);

    return {
      id: `CAM-DWK-${camIndex < 10 ? '0' + camIndex : camIndex}`,
      templeId: 'dwarka' as TempleId,
      name: names[i],
      zone: i < 5 ? 'Jagat Mandir Core' : i < 10 ? 'Swarg Dwar & Gomti' : i < 15 ? 'Bus Stand & Transit' : i < 20 ? 'Bazaar & Parking' : 'Perimeter & Security',
      type: types[i],
      orientation: `${Math.round((i * 45) % 360)}°`,
      orientationDeg: Math.round((i * 45) % 360),
      fovAngle: 85,
      fovRadiusMeters: 35,
      status: 'Online' as const,
      fps: 30,
      health: 98 + (i % 3),
      aiEnabled: true,
      lat: Number((baseLat + offsetLat).toFixed(4)),
      lng: Number((baseLng + offsetLng).toFixed(4)),
      peopleCount: 40 + Math.round(Math.abs(Math.sin(i)) * 120),
      density: 45 + Math.round(Math.abs(Math.cos(i)) * 48),
      risk: risks[i],
      resolution: types[i] === 'ANPR' ? '4K ANPR' : types[i] === 'Thermal' ? 'Thermal 1080p' : '4K UHD',
      lodLevel: lods[i],
      flowRate: 20 + Math.round(Math.abs(Math.sin(i * 2)) * 30),
      queueCount: Math.round(Math.abs(Math.cos(i * 2)) * 150),
      aiConfidence: 98,
    };
  }),

  // --- AMBAJI (30 Cameras) ---
  ...Array.from({ length: 30 }).map((_, i) => {
    const camIndex = i + 1;
    const names = [
      'Shakti Dwar Main Entrance Gate PTZ', 'Chachar Chowk Grand Courtyard 360', 'Visoyantra Holy Sanctum Darshan Line', 'VIP Gate 3 Trust Administrative Wing', 'Chachar Chowk Emergency Egress Portal',
      'Gabbar Hill Ropeway Lower Boarding Station', 'Gabbar Ropeway Cableway Span Tower 2', 'Gabbar Hill Summit Akhand Jyot Platform', 'Gabbar 999 Steps Lower Trail Base', 'Gabbar 999 Steps Mid-Hill Rest Pavilion',
      'Yatri Bhavan Annakshetra Mega Dining Hall', 'Yatri Bhavan Residential Complex Gate', 'Ambaji Central Bus Stand Terminal Platform', 'Ambaji Central Parking Zone A ANPR Entry', 'Gabbar Foothills Parking Zone B ANPR',
      'Red Cross Medical Trauma Center Base', 'Chachar Chowk Central Police Command CP', 'Kamakshi Mandir Satellite Concourse', 'Mansarovar Kund Snan & Parikrama Path', 'Ambaji Bazaar Pilgrim Souvenir Concourse',
      'SDRF Mountain Rescue Response Post', 'Prasadam Peda Packing & Sale Counter', 'Lost & Found Child Tracking Terminal', 'Abu Road Inbound Traffic Screening Post', 'State Highway Bypass Vehicle Buffer Zone',
      'Chachar Chowk Queue Holding Pen Sector A', 'Chachar Chowk Queue Holding Pen Sector B', 'Sanctum Shikhara Gold Kalash High Cam', 'Volunteer Headquarters Dispatch Unit 1', 'Volunteer Headquarters Dispatch Unit 2'
    ];
    const types: CameraType[] = ['PTZ', 'Dome', 'Fixed', 'Dome', 'Fixed', 'PTZ', 'Fixed', 'PTZ', 'Fixed', 'Fixed', 'Dome', 'Fixed', 'ANPR', 'ANPR', 'ANPR', 'Fixed', 'Dome', 'Fixed', 'Fixed', 'Fixed', 'PTZ', 'Fixed', 'Fixed', 'ANPR', 'Fixed', 'Fixed', 'Fixed', 'PTZ', 'Fixed', 'Fixed'];
    const risks: ('Low' | 'Medium' | 'High' | 'Critical')[] = ['High', 'Critical', 'Critical', 'Medium', 'High', 'High', 'Medium', 'Critical', 'High', 'Medium', 'Medium', 'Low', 'High', 'High', 'Medium', 'Low', 'Low', 'Low', 'Low', 'Medium', 'Low', 'Low', 'Low', 'Medium', 'Low', 'High', 'High', 'Low', 'Low', 'Low'];
    const lods: (1 | 2 | 3)[] = [1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 1, 2, 2, 2, 3, 3, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3];
    const baseLat = 24.3312;
    const baseLng = 72.8522;
    const offsetLat = (Math.sin(i * 1.5) * 0.004);
    const offsetLng = (Math.cos(i * 1.5) * 0.004);

    return {
      id: `CAM-AMB-${camIndex < 10 ? '0' + camIndex : camIndex}`,
      templeId: 'ambaji' as TempleId,
      name: names[i],
      zone: i < 5 ? 'Chachar Chowk & Sanctum' : i < 10 ? 'Gabbar Hill & Ropeway' : i < 15 ? 'Yatri Bhavan & Parking' : i < 20 ? 'Bazaar & Medical' : 'Traffic & Perimeters',
      type: types[i],
      orientation: `${Math.round((i * 45) % 360)}°`,
      orientationDeg: Math.round((i * 45) % 360),
      fovAngle: 85,
      fovRadiusMeters: 35,
      status: 'Online' as const,
      fps: 30,
      health: 97 + (i % 4),
      aiEnabled: true,
      lat: Number((baseLat + offsetLat).toFixed(4)),
      lng: Number((baseLng + offsetLng).toFixed(4)),
      peopleCount: 50 + Math.round(Math.abs(Math.sin(i * 1.8)) * 140),
      density: 50 + Math.round(Math.abs(Math.cos(i * 1.8)) * 45),
      risk: risks[i],
      resolution: types[i] === 'ANPR' ? '4K ANPR' : '4K UHD',
      lodLevel: lods[i],
      flowRate: 30 + Math.round(Math.abs(Math.sin(i * 2)) * 35),
      queueCount: Math.round(Math.abs(Math.cos(i * 2)) * 200),
      aiConfidence: 99,
    };
  }),

  // --- PAVAGADH (30 Cameras) ---
  ...Array.from({ length: 30 }).map((_, i) => {
    const camIndex = i + 1;
    const names = [
      'Maa Mahakali Cliff Summit Sanctum PTZ', 'Mahakali Peak Shikhara & Flag Post', 'Summit Queue Holding Barricade Line 1', 'Summit Queue Holding Barricade Line 2', 'Upper Ropeway Station Debarkation Concourse',
      'Upper Ropeway Machinery & Safety Monitor', 'Lower Ropeway Machi Boarding Terminal PTZ', 'Machi Ropeway Queue Hall Inflow', 'Machi Bus Depot Passenger Staging Area', 'Machi Foothills Parking Lot ANPR Barrier',
      'Historical Steps Dudhia Talav Rest Post', 'Historical Steps Medico-Triage Point', 'SDRF Mountain Winch Cable Rescue Post', 'VIP Helipad Emergency Mountain Landing Track', 'Champaner Base Highway Screening Checkpoint',
      'Machi 108 Emergency Medical Clinic', 'Summit 108 High-Altitude Oxygen Clinic', 'Machi Police Control Post Headquarters', 'Dudhia Lake Water Level Sensor & Perimeter', 'Pavagadh Cliff Face Rockfall Thermal Camera',
      'Machi Food Stall & Refreshment Area', 'Historical Gate 1 (Atak Gate) Pedestrian Pass', 'Historical Gate 2 (Budhiya Gate) Choke Point', 'Historical Gate 3 (Sadan Shah Gate) Scanner', 'Volunteer Mountain Patrol Station Alpha',
      'Volunteer Mountain Patrol Station Beta', 'Lost Child & Tracking Assistance Booth Machi', 'Emergency Mountain Stretcher Egress Track', 'Champaner Heavy Bus Buffer Staging Yard', 'Pavagadh Mountain Peak Weather Station Cam'
    ];
    const types: CameraType[] = ['PTZ', 'Fixed', 'Fixed', 'Fixed', 'PTZ', 'Fixed', 'PTZ', 'Fixed', 'ANPR', 'ANPR', 'Fixed', 'Fixed', 'PTZ', 'Fixed', 'ANPR', 'Fixed', 'Fixed', 'Dome', 'Thermal', 'Thermal', 'Fixed', 'Fixed', 'Fixed', 'Fixed', 'Fixed', 'Fixed', 'Fixed', 'Fixed', 'PTZ', 'Fixed'];
    const risks: ('Low' | 'Medium' | 'High' | 'Critical')[] = ['Critical', 'High', 'Critical', 'Critical', 'High', 'Medium', 'High', 'High', 'Medium', 'Medium', 'Medium', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low', 'Medium', 'High', 'Medium', 'Low', 'Low', 'Low', 'Low', 'Low', 'Low'];
    const lods: (1 | 2 | 3)[] = [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
    const baseLat = 22.4632;
    const baseLng = 73.5204;
    const offsetLat = (Math.sin(i * 1.2) * 0.005);
    const offsetLng = (Math.cos(i * 1.2) * 0.006);

    return {
      id: `CAM-PVG-${camIndex < 10 ? '0' + camIndex : camIndex}`,
      templeId: 'pavagadh' as TempleId,
      name: names[i],
      zone: i < 5 ? 'Mahakali Summit Peak' : i < 10 ? 'Ropeway & Machi Base' : i < 15 ? 'Mountain Trail & Rescue' : i < 20 ? 'Medical & Police' : 'Gates & Logistics',
      type: types[i],
      orientation: `${Math.round((i * 45) % 360)}°`,
      orientationDeg: Math.round((i * 45) % 360),
      fovAngle: 85,
      fovRadiusMeters: 35,
      status: 'Online' as const,
      fps: 30,
      health: 98 + (i % 3),
      aiEnabled: true,
      lat: Number((baseLat + offsetLat).toFixed(4)),
      lng: Number((baseLng + offsetLng).toFixed(4)),
      peopleCount: 35 + Math.round(Math.abs(Math.sin(i * 1.4)) * 130),
      density: 40 + Math.round(Math.abs(Math.cos(i * 1.4)) * 50),
      risk: risks[i],
      resolution: types[i] === 'ANPR' ? '4K ANPR' : types[i] === 'Thermal' ? 'Thermal 1080p' : '4K UHD',
      lodLevel: lods[i],
      flowRate: 18 + Math.round(Math.abs(Math.sin(i * 2)) * 25),
      queueCount: Math.round(Math.abs(Math.cos(i * 2)) * 140),
      aiConfidence: 98,
    };
  }),
];

// ============================================================
// DIGITAL TWIN DISPATCHABLE VOLUNTEER ROSTER
// ============================================================

export interface DigitalTwinVolunteer {
  id: string;
  templeId: TempleId;
  name: string;
  role: string;
  status: 'Standby' | 'Dispatched' | 'Arrived' | 'On Patrol';
  lat: number;
  lng: number;
  assignedZone: string;
  contact: string;
  batteryPct: number;
  radioChannel: string;
}

export const DIGITAL_TWIN_VOLUNTEERS: DigitalTwinVolunteer[] = [
  { id: 'VOL-SOM-01', templeId: 'somnath', name: 'Jayeshbhai Joshi', role: 'Queue Marshal Lead', status: 'On Patrol', lat: 20.8893, lng: 70.4015, assignedZone: 'Digvijay Dwar', contact: '+91 98250 11420', batteryPct: 94, radioChannel: 'Ch 1 (Inflow)' },
  { id: 'VOL-SOM-02', templeId: 'somnath', name: 'Pooja Trivedi', role: 'Medical Triage Escort', status: 'Arrived', lat: 20.8880, lng: 70.4012, assignedZone: 'Garbhagriha Sanctum', contact: '+91 98250 22341', batteryPct: 88, radioChannel: 'Ch 3 (Medical)' },
  { id: 'VOL-SOM-03', templeId: 'somnath', name: 'Nikhil Parmar', role: 'Elderly Buggy Assist', status: 'Dispatched', lat: 20.8882, lng: 70.4022, assignedZone: 'VIP Promenade', contact: '+91 98250 33452', batteryPct: 76, radioChannel: 'Ch 2 (Protocol)' },
  { id: 'VOL-SOM-04', templeId: 'somnath', name: 'Bhavik Solanki', role: 'Crowd Pulse Marshal', status: 'Standby', lat: 20.8895, lng: 70.4012, assignedZone: 'Police CP Alpha', contact: '+91 98250 44563', batteryPct: 98, radioChannel: 'Ch 1 (Inflow)' },

  { id: 'VOL-DWK-01', templeId: 'dwarka', name: 'Hardik Ahir', role: 'Moksha Queue Marshal', status: 'On Patrol', lat: 22.2386, lng: 68.9680, assignedZone: 'Moksha Dwar', contact: '+91 98250 55674', batteryPct: 82, radioChannel: 'Ch 1 (North)' },
  { id: 'VOL-DWK-02', templeId: 'dwarka', name: 'Meera Trivedi', role: 'Gomti Ghat Safety Escort', status: 'Arrived', lat: 22.2371, lng: 68.9677, assignedZone: 'Swarg Dwar 56 Steps', contact: '+91 98250 66785', batteryPct: 90, radioChannel: 'Ch 4 (Ghats)' },

  { id: 'VOL-AMB-01', templeId: 'ambaji', name: 'Kishan Barot', role: 'Chachar Chowk QRF Liaison', status: 'On Patrol', lat: 24.3315, lng: 72.8520, assignedZone: 'Chachar Chowk', contact: '+91 98250 77896', batteryPct: 85, radioChannel: 'Ch 1 (Courtyard)' },
  { id: 'VOL-AMB-02', templeId: 'ambaji', name: 'Divya Raval', role: 'Ropeway Dispatcher', status: 'On Patrol', lat: 24.3160, lng: 72.8250, assignedZone: 'Gabbar Ropeway Base', contact: '+91 98250 88907', batteryPct: 92, radioChannel: 'Ch 2 (Ropeway)' },

  { id: 'VOL-PVG-01', templeId: 'pavagadh', name: 'Mehul Rathod', role: 'Machi Water Logistics', status: 'Standby', lat: 22.4590, lng: 73.5320, assignedZone: 'Machi Base', contact: '+91 98250 99018', batteryPct: 91, radioChannel: 'Ch 1 (Base)' },
  { id: 'VOL-PVG-02', templeId: 'pavagadh', name: 'Alpesh Zala', role: 'Cliff Rescue Volunteer', status: 'On Patrol', lat: 22.4632, lng: 73.5204, assignedZone: 'Summit Peak', contact: '+91 98250 10129', batteryPct: 78, radioChannel: 'Ch 5 (SDRF)' },
];

// ============================================================
// DIGITAL TWIN LIVE INCIDENT LAYER
// ============================================================

export interface DigitalTwinIncident {
  id: string;
  templeId: TempleId;
  title: string;
  type: 'Medical' | 'Lost Child' | 'Fire / Hazard' | 'Crowd Choke' | 'Traffic' | 'Security';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Reported' | 'Dispatched' | 'On Scene' | 'Resolved';
  lat: number;
  lng: number;
  location: string;
  time: string;
  assignedTeam: string;
  etaMinutes: number;
  sopSteps: string[];
}

export const DIGITAL_TWIN_INCIDENTS: DigitalTwinIncident[] = [
  { id: 'INC-SOM-901', templeId: 'somnath', title: 'Surge Compression at Digvijay Dwar Gate 2', type: 'Crowd Choke', priority: 'High', status: 'On Scene', lat: 20.8893, lng: 70.4015, location: 'Digvijay Dwar Holding Bay', time: '11:25 AM', assignedTeam: 'QRF Alpha & Vol Group 1', etaMinutes: 2, sopSteps: ['Deploy temporary holding barricades', 'Pulse entry every 90s', 'Activate loudspeaker crowd guidance', 'Coordinate with Parking Lot B shuttle'] },
  { id: 'INC-SOM-902', templeId: 'somnath', title: 'Elderly Devotee Heat Exhaustion near Seafront', type: 'Medical', priority: 'Medium', status: 'Dispatched', lat: 20.8872, lng: 70.4010, location: 'Sagar Darshan Exit Promenade', time: '11:32 AM', assignedTeam: '108 Ambulance Unit 2', etaMinutes: 4, sopSteps: ['Administer oral rehydration electrolytes', 'Deploy wheelchair buggy to medical post', 'Inform family coordinator'] },
  { id: 'INC-DWK-901', templeId: 'dwarka', title: 'Chokepoint Bottleneck at 56-Steps Swarg Dwar', type: 'Crowd Choke', priority: 'Critical', status: 'On Scene', lat: 22.2371, lng: 68.9677, location: 'Swarg Dwar Descent Steps', time: '11:10 AM', assignedTeam: 'Dwarka Police QRF (8 Officers)', etaMinutes: 1, sopSteps: ['Halt inbound sanctum discharge for 3 minutes', 'Regulate stair descent in batches of 30', 'Clear landing concourse near Gomti'] },
  { id: 'INC-AMB-901', templeId: 'ambaji', title: 'Ropeway Boarding Chokepoint Gate 2', type: 'Crowd Choke', priority: 'Critical', status: 'Dispatched', lat: 24.3160, lng: 72.8250, location: 'Gabbar Ropeway Station 2', time: '11:40 AM', assignedTeam: 'SDRF Mountain Rescue Unit', etaMinutes: 3, sopSteps: ['Throttle lower boarding carousel to 3.8 m/s', 'Divert secondary queue to Hill Step trail', 'Issue GSDMA SMS advisory'] },
  { id: 'INC-PVG-901', templeId: 'pavagadh', title: 'Unattended Bag near Machi Ropeway Entrance', type: 'Security', priority: 'Low', status: 'Resolved', lat: 22.4600, lng: 73.5290, location: 'Machi Bus Stand', time: '10:15 AM', assignedTeam: 'BDDS Tactical Unit', etaMinutes: 0, sopSteps: ['Cordon off 50m radius', 'X-ray scanner scan (Negative/Prasad items)', 'Log resolution in GSDMA portal'] },
];

// ============================================================
// DIGITAL TWIN PARKING LOTS (SMART PARKING MATRIX)
// ============================================================

export interface DigitalTwinParkingLot {
  id: string;
  templeId: TempleId;
  name: string;
  category: 'Heavy Bus & Coach' | 'Cars & Light Vehicles' | 'Multi-Level Hub';
  totalCapacity: number;
  occupied: number;
  available: number;
  vehicleQueue: number;
  avgSearchTimeMin: number;
  entryRatePerMin: number;
  exitRatePerMin: number;
  aiRecommendation: string;
  lat: number;
  lng: number;
  lodLevel: 1 | 2 | 3;
}

export const DIGITAL_TWIN_PARKING_LOTS: DigitalTwinParkingLot[] = [
  // Somnath Parking
  { id: 'PARK-SOM-A', templeId: 'somnath', name: 'Prabhas Patan Heavy Bus Parking Lot A', category: 'Heavy Bus & Coach', totalCapacity: 500, occupied: 410, available: 90, vehicleQueue: 8, avgSearchTimeMin: 4.5, entryRatePerMin: 6, exitRatePerMin: 4, aiRecommendation: 'Divert upcoming tourist buses to Overflow Ground C.', lat: 20.8910, lng: 70.4035, lodLevel: 1 },
  { id: 'PARK-SOM-B', templeId: 'somnath', name: 'Somnath Trust Parking Lot B (Cars & EV Hub)', category: 'Cars & Light Vehicles', totalCapacity: 600, occupied: 460, available: 140, vehicleQueue: 5, avgSearchTimeMin: 2.8, entryRatePerMin: 12, exitRatePerMin: 9, aiRecommendation: '24 DC Fast chargers available. Nominal flow.', lat: 20.8898, lng: 70.4005, lodLevel: 1 },
  { id: 'PARK-SOM-C', templeId: 'somnath', name: 'Triveni Sangam East Overflow Parking Ground', category: 'Cars & Light Vehicles', totalCapacity: 400, occupied: 180, available: 220, vehicleQueue: 0, avgSearchTimeMin: 1.5, entryRatePerMin: 4, exitRatePerMin: 3, aiRecommendation: 'Shuttle buggies active for transfers to Somnath core.', lat: 20.8870, lng: 70.4130, lodLevel: 2 },

  // Dwarka Parking
  { id: 'PARK-DWK-A', templeId: 'dwarka', name: 'Gomti Ghat South Tourist Parking Facility', category: 'Cars & Light Vehicles', totalCapacity: 800, occupied: 630, available: 170, vehicleQueue: 12, avgSearchTimeMin: 6.0, entryRatePerMin: 10, exitRatePerMin: 7, aiRecommendation: 'Direct overflow vehicles across Sudama Setu link.', lat: 22.2355, lng: 68.9650, lodLevel: 1 },
  { id: 'PARK-DWK-B', templeId: 'dwarka', name: 'Dwarka GSRTC Bus Stand Transit Depot Yard', category: 'Heavy Bus & Coach', totalCapacity: 350, occupied: 240, available: 110, vehicleQueue: 3, avgSearchTimeMin: 3.2, entryRatePerMin: 5, exitRatePerMin: 4, aiRecommendation: 'Transit depot operates at 68% capacity.', lat: 22.2425, lng: 68.9710, lodLevel: 1 },

  // Ambaji Parking
  { id: 'PARK-AMB-A', templeId: 'ambaji', name: 'Ambaji Central Multi-Level Parking Zone A', category: 'Multi-Level Hub', totalCapacity: 1200, occupied: 1080, available: 120, vehicleQueue: 22, avgSearchTimeMin: 8.5, entryRatePerMin: 18, exitRatePerMin: 11, aiRecommendation: 'CRITICAL: Open overflow Zone B at Gabbar Foothills.', lat: 24.3340, lng: 72.8510, lodLevel: 1 },
  { id: 'PARK-AMB-B', templeId: 'ambaji', name: 'Gabbar Foothills Tourist Parking Zone B', category: 'Heavy Bus & Coach', totalCapacity: 800, occupied: 580, available: 220, vehicleQueue: 6, avgSearchTimeMin: 3.5, entryRatePerMin: 8, exitRatePerMin: 6, aiRecommendation: 'Ropeway shuttle connectivity active.', lat: 24.3175, lng: 72.8265, lodLevel: 2 },

  // Pavagadh Parking
  { id: 'PARK-PVG-A', templeId: 'pavagadh', name: 'Machi Plateau Hilltop Shuttle Staging Lot', category: 'Cars & Light Vehicles', totalCapacity: 600, occupied: 410, available: 190, vehicleQueue: 7, avgSearchTimeMin: 4.0, entryRatePerMin: 6, exitRatePerMin: 5, aiRecommendation: 'Hold private vehicles at Champaner if Machi reaches 90%.', lat: 22.4580, lng: 73.5350, lodLevel: 1 },
  { id: 'PARK-PVG-B', templeId: 'pavagadh', name: 'Champaner Foothills Heavy Bus Staging Ground', category: 'Heavy Bus & Coach', totalCapacity: 900, occupied: 510, available: 390, vehicleQueue: 2, avgSearchTimeMin: 2.0, entryRatePerMin: 7, exitRatePerMin: 6, aiRecommendation: 'Hill shuttle bus fleet operating on 8-min headway.', lat: 22.4550, lng: 73.5420, lodLevel: 2 },
];

// ============================================================
// OPERATIONAL TIMELINE & HISTORICAL REPLAY EVENTS
// ============================================================

export interface OperationalTimelineEvent {
  id: string;
  time: string;
  title: string;
  type: 'surge' | 'police' | 'holding' | 'medical' | 'clearance';
  description: string;
  templeId: TempleId;
  affectedZone: string;
}

export const OPERATIONAL_TIMELINE_EVENTS: OperationalTimelineEvent[] = [
  { id: 'EVT-01', time: '07:00 AM', title: 'Pratah Mangla Aarti Inflow Surge', type: 'surge', description: 'Digvijay Dwar inflow jumped to 140 p/min. Holding Bay 1 activated.', templeId: 'somnath', affectedZone: 'Digvijay Dwar' },
  { id: 'EVT-02', time: '07:15 AM', title: 'Police QRF Deployment Alpha', type: 'police', description: 'SP Jadeja deployed 8 tactical marshals to Nandi Mandap corridor.', templeId: 'somnath', affectedZone: 'Garbhagriha Sanctum' },
  { id: 'EVT-03', time: '07:30 AM', title: 'Holding Bay 2 Pulse Release', type: 'holding', description: 'Holding Bay 2 released 400 devotees in 90-second synchronized pulse.', templeId: 'somnath', affectedZone: 'Digvijay Dwar' },
  { id: 'EVT-04', time: '07:45 AM', title: '108 Medical Unit Dispatched', type: 'medical', description: 'Elderly pilgrim assisted with wheelchair at Sagar Darshan exit.', templeId: 'somnath', affectedZone: 'Sagar Darshan' },
  { id: 'EVT-05', time: '08:00 AM', title: 'Sanctum Congestion Cleared to Nominal', type: 'clearance', description: 'Garbhagriha density normalized to 68%. All corridors green.', templeId: 'somnath', affectedZone: 'Garbhagriha Sanctum' },
  { id: 'EVT-06', time: 'LIVE', title: 'Sandhya Aarti Pre-Staging Active', type: 'surge', description: 'Current monitoring active. Next major surge projected at 06:45 PM.', templeId: 'somnath', affectedZone: 'All Zones' },
];

// ============================================================
// REST OF UNIFIED DATASETS (COMPATIBILITY WITH ALL MODULES)
// ============================================================

export interface UnifiedQueueGate {
  id: string;
  templeId: TempleId;
  name: string;
  category: 'General' | 'VIP' | 'Aarti' | 'Senior Citizens' | 'Differently Abled' | 'Emergency';
  currentPilgrims: number;
  maxCapacity: number;
  waitingTimeMin: number;
  dischargeRatePerMin: number;
  risk: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedCameraId: string;
  volunteerCount: number;
  policeOfficers: number;
  aiSOPAction: string;
  nextAartiReleaseTime: string;
}

export const UNIFIED_QUEUES: Record<TempleId, UnifiedQueueGate[]> = {
  somnath: [
    { id: 'Q-SOM-01', templeId: 'somnath', name: 'Digvijay Dwar General Queue Line A', category: 'General', currentPilgrims: 2450, maxCapacity: 2800, waitingTimeMin: 35, dischargeRatePerMin: 45, risk: 'High', assignedCameraId: 'CAM-SOM-01', volunteerCount: 14, policeOfficers: 6, aiSOPAction: 'Pulse release holding bay 2 every 90s to prevent Nandi Mandap compression.', nextAartiReleaseTime: '06:45 PM (Sandhya Aarti)' },
    { id: 'Q-SOM-02', templeId: 'somnath', name: 'VIP Dwar & State Protocol Lane', category: 'VIP', currentPilgrims: 120, maxCapacity: 400, waitingTimeMin: 8, dischargeRatePerMin: 20, risk: 'Low', assignedCameraId: 'CAM-SOM-03', volunteerCount: 4, policeOfficers: 4, aiSOPAction: 'Protocol flow nominal. Maintain escort buffer for State Guest delegation.', nextAartiReleaseTime: '06:55 PM' },
    { id: 'Q-SOM-03', templeId: 'somnath', name: 'Sandhya Maha Aarti Special Darshan Line', category: 'Aarti', currentPilgrims: 890, maxCapacity: 1000, waitingTimeMin: 45, dischargeRatePerMin: 30, risk: 'Critical', assignedCameraId: 'CAM-SOM-23', volunteerCount: 18, policeOfficers: 8, aiSOPAction: 'Aarti hall 92% capacity. Halt inbound queue at Digvijay barrier 3 until Aarti conclude.', nextAartiReleaseTime: '07:00 PM (LIVE)' },
    { id: 'Q-SOM-04', templeId: 'somnath', name: 'Senior Citizen & Wheelchair Express Lane', category: 'Senior Citizens', currentPilgrims: 160, maxCapacity: 350, waitingTimeMin: 12, dischargeRatePerMin: 15, risk: 'Low', assignedCameraId: 'CAM-SOM-24', volunteerCount: 8, policeOfficers: 2, aiSOPAction: 'Deploy 2 additional electric shuttles to Sagar Darshan ramp.', nextAartiReleaseTime: '06:45 PM' },
    { id: 'Q-SOM-05', templeId: 'somnath', name: 'Divyangjan Differently-Abled Ramp Lane', category: 'Differently Abled', currentPilgrims: 45, maxCapacity: 150, waitingTimeMin: 5, dischargeRatePerMin: 10, risk: 'Low', assignedCameraId: 'CAM-SOM-12', volunteerCount: 6, policeOfficers: 2, aiSOPAction: 'Ramp and wheelchair lift operating nominally.', nextAartiReleaseTime: 'Continuous' },
    { id: 'Q-SOM-06', templeId: 'somnath', name: 'Emergency Medical & QRF Transit Corridor', category: 'Emergency', currentPilgrims: 0, maxCapacity: 100, waitingTimeMin: 0, dischargeRatePerMin: 60, risk: 'Low', assignedCameraId: 'CAM-SOM-20', volunteerCount: 4, policeOfficers: 6, aiSOPAction: 'Corridor 100% sterile. Ready for immediate patient transit to 108 base.', nextAartiReleaseTime: 'Always Clear' },
  ],
  dwarka: [
    { id: 'Q-DWK-01', templeId: 'dwarka', name: 'Moksha Dwar North General Inflow Queue', category: 'General', currentPilgrims: 1850, maxCapacity: 2200, waitingTimeMin: 28, dischargeRatePerMin: 40, risk: 'High', assignedCameraId: 'CAM-DWK-01', volunteerCount: 12, policeOfficers: 5, aiSOPAction: 'Open auxiliary queue switchback in Moksha Bazaar courtyard.', nextAartiReleaseTime: '07:30 PM (Sandhya Aarti)' },
    { id: 'Q-DWK-02', templeId: 'dwarka', name: 'Swarg Dwar 56-Steps Egress Line', category: 'General', currentPilgrims: 1200, maxCapacity: 1400, waitingTimeMin: 18, dischargeRatePerMin: 50, risk: 'Medium', assignedCameraId: 'CAM-DWK-06', volunteerCount: 10, policeOfficers: 4, aiSOPAction: 'Regulate step descent rate to prevent pile-up near Gomti base.', nextAartiReleaseTime: 'Continuous Egress' },
    { id: 'Q-DWK-03', templeId: 'dwarka', name: 'Sharda Peeth VIP Entry Lane', category: 'VIP', currentPilgrims: 75, maxCapacity: 250, waitingTimeMin: 6, dischargeRatePerMin: 15, risk: 'Low', assignedCameraId: 'CAM-DWK-13', volunteerCount: 4, policeOfficers: 3, aiSOPAction: 'Maintain steady VIP batching of 15 devotees per 2 minutes.', nextAartiReleaseTime: '07:20 PM' },
    { id: 'Q-DWK-04', templeId: 'dwarka', name: 'Sudama Setu Senior Pilgrim Express', category: 'Senior Citizens', currentPilgrims: 110, maxCapacity: 300, waitingTimeMin: 10, dischargeRatePerMin: 12, risk: 'Low', assignedCameraId: 'CAM-DWK-09', volunteerCount: 6, policeOfficers: 2, aiSOPAction: 'Wheelchair assistance active across Gomti river span.', nextAartiReleaseTime: '07:15 PM' },
  ],
  ambaji: [
    { id: 'Q-AMB-01', templeId: 'ambaji', name: 'Chachar Chowk Main Courtyard Queue 1', category: 'General', currentPilgrims: 3800, maxCapacity: 4200, waitingTimeMin: 50, dischargeRatePerMin: 60, risk: 'Critical', assignedCameraId: 'CAM-AMB-01', volunteerCount: 22, policeOfficers: 10, aiSOPAction: 'Activate Chachar holding pen 3. Distribute drinking water sachets.', nextAartiReleaseTime: '07:00 PM (Sandhya Aarti)' },
    { id: 'Q-AMB-02', templeId: 'ambaji', name: 'Gabbar Hill Ropeway Boarding Queue', category: 'General', currentPilgrims: 1150, maxCapacity: 1300, waitingTimeMin: 35, dischargeRatePerMin: 25, risk: 'High', assignedCameraId: 'CAM-AMB-06', volunteerCount: 10, policeOfficers: 4, aiSOPAction: 'Ropeway speed synchronized at 4.2 m/s. Divert fit pilgrims to 999 step route.', nextAartiReleaseTime: 'Continuous' },
    { id: 'Q-AMB-03', templeId: 'ambaji', name: 'Yatri Bhavan VIP Darshan Pass Line', category: 'VIP', currentPilgrims: 180, maxCapacity: 500, waitingTimeMin: 10, dischargeRatePerMin: 20, risk: 'Low', assignedCameraId: 'CAM-AMB-04', volunteerCount: 6, policeOfficers: 4, aiSOPAction: 'QR pass scan latency: 0.8s. Operations optimal.', nextAartiReleaseTime: '06:50 PM' },
  ],
  pavagadh: [
    { id: 'Q-PVG-01', templeId: 'pavagadh', name: 'Maa Mahakali Cliff Summit Sanctum Queue', category: 'General', currentPilgrims: 1950, maxCapacity: 2100, waitingTimeMin: 40, dischargeRatePerMin: 35, risk: 'Critical', assignedCameraId: 'CAM-PVG-01', volunteerCount: 16, policeOfficers: 8, aiSOPAction: 'Summit ridge at 93% capacity. Restrict upper ropeway discharge rate.', nextAartiReleaseTime: '06:45 PM (Deepmala Aarti)' },
    { id: 'Q-PVG-02', templeId: 'pavagadh', name: 'Machi Udan Khatola Lower Ropeway Queue', category: 'General', currentPilgrims: 1200, maxCapacity: 1500, waitingTimeMin: 30, dischargeRatePerMin: 28, risk: 'High', assignedCameraId: 'CAM-PVG-07', volunteerCount: 12, policeOfficers: 5, aiSOPAction: 'Regulate cabin batching to 6 passengers per gondola.', nextAartiReleaseTime: 'Continuous' },
    { id: 'Q-PVG-03', templeId: 'pavagadh', name: 'Dudhia Talav Intermediate Rest Pavilion Line', category: 'Senior Citizens', currentPilgrims: 210, maxCapacity: 600, waitingTimeMin: 15, dischargeRatePerMin: 20, risk: 'Low', assignedCameraId: 'CAM-PVG-11', volunteerCount: 8, policeOfficers: 3, aiSOPAction: 'Hydration and glucose station fully stocked.', nextAartiReleaseTime: 'Continuous' },
  ],
};

export interface ParkingSlot {
  slotId: string;
  type: 'standard' | 'ev' | 'vip' | 'disabled' | 'bus';
  status: 'available' | 'occupied';
  vehiclePlate?: string;
  occupiedDurationMin?: number;
}

export interface ParkingLotFacility {
  id: string;
  templeId: TempleId;
  name: string;
  category: 'Heavy Bus & Coach' | 'Cars & Light Vehicles' | 'Multi-Level Hub';
  totalSlots: number;
  occupiedSlots: number;
  evSlots: number;
  vipSlots: number;
  disabledSlots: number;
  distanceToSanctum: string;
  status: 'Nominal' | 'Near Full' | 'Full' | 'Overflow Triggered';
  assignedCameraId: string;
  slots: ParkingSlot[];
}

function generateSlots(count: number, occRate: number, prefix: string): ParkingSlot[] {
  return Array.from({ length: count }).map((_, i) => {
    const isOccupied = Math.random() < occRate;
    const isEv = i < 4;
    const isVip = i >= 4 && i < 8;
    const isDisabled = i >= 8 && i < 11;
    const type = isEv ? 'ev' : isVip ? 'vip' : isDisabled ? 'disabled' : 'standard';

    return {
      slotId: `${prefix}-${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
      type,
      status: isOccupied ? 'occupied' : 'available',
      vehiclePlate: isOccupied ? `GJ-${11 + (i % 20)} AB ${1000 + i * 77}` : undefined,
      occupiedDurationMin: isOccupied ? 25 + (i * 11) % 180 : undefined,
    };
  });
}

export const PARKING_FACILITIES: Record<TempleId, ParkingLotFacility[]> = {
  somnath: [
    { id: 'PARK-SOM-01', templeId: 'somnath', name: 'Prabhas Patan Main Parking Lot A (Buses / Heavy)', category: 'Heavy Bus & Coach', totalSlots: 48, occupiedSlots: 41, evSlots: 4, vipSlots: 4, disabledSlots: 3, distanceToSanctum: '450m (Shuttle Available)', status: 'Near Full', assignedCameraId: 'CAM-SOM-08', slots: generateSlots(48, 0.85, 'BAY-A') },
    { id: 'PARK-SOM-02', templeId: 'somnath', name: 'Somnath Trust Parking Lot B (Cars / EV Station)', category: 'Cars & Light Vehicles', totalSlots: 60, occupiedSlots: 46, evSlots: 6, vipSlots: 4, disabledSlots: 4, distanceToSanctum: '250m (Pedestrian Promenade)', status: 'Nominal', assignedCameraId: 'CAM-SOM-09', slots: generateSlots(60, 0.76, 'BAY-B') },
    { id: 'PARK-SOM-03', templeId: 'somnath', name: 'Triveni Sangam Pilgrim Overflow Ground', category: 'Cars & Light Vehicles', totalSlots: 36, occupiedSlots: 18, evSlots: 2, vipSlots: 2, disabledSlots: 2, distanceToSanctum: '1.2 km (Electric Buggy Route)', status: 'Nominal', assignedCameraId: 'CAM-SOM-30', slots: generateSlots(36, 0.50, 'BAY-C') },
  ],
  dwarka: [
    { id: 'PARK-DWK-01', templeId: 'dwarka', name: 'Gomti Ghat South Tourist Parking Facility', category: 'Cars & Light Vehicles', totalSlots: 48, occupiedSlots: 38, evSlots: 4, vipSlots: 4, disabledSlots: 3, distanceToSanctum: '300m via Sudama Setu', status: 'Near Full', assignedCameraId: 'CAM-DWK-16', slots: generateSlots(48, 0.79, 'BAY-G') },
    { id: 'PARK-DWK-02', templeId: 'dwarka', name: 'Dwarka GSRTC Bus Stand Depot Yard', category: 'Heavy Bus & Coach', totalSlots: 36, occupiedSlots: 24, evSlots: 2, vipSlots: 2, disabledSlots: 2, distanceToSanctum: '600m via Bazaar Road', status: 'Nominal', assignedCameraId: 'CAM-DWK-17', slots: generateSlots(36, 0.66, 'BAY-D') },
  ],
  ambaji: [
    { id: 'PARK-AMB-01', templeId: 'ambaji', name: 'Ambaji Central Multi-Level Parking Zone A', category: 'Multi-Level Hub', totalSlots: 60, occupiedSlots: 54, evSlots: 6, vipSlots: 4, disabledSlots: 4, distanceToSanctum: '200m via Chachar Concourse', status: 'Overflow Triggered', assignedCameraId: 'CAM-AMB-14', slots: generateSlots(60, 0.90, 'BAY-Z') },
    { id: 'PARK-AMB-02', templeId: 'ambaji', name: 'Gabbar Foothills Tourist Parking Zone B', category: 'Heavy Bus & Coach', totalSlots: 48, occupiedSlots: 36, evSlots: 4, vipSlots: 4, disabledSlots: 3, distanceToSanctum: '4.0 km (Gabbar Ropeway Base)', status: 'Near Full', assignedCameraId: 'CAM-AMB-15', slots: generateSlots(48, 0.75, 'BAY-F') },
  ],
  pavagadh: [
    { id: 'PARK-PVG-01', templeId: 'pavagadh', name: 'Machi Plateau Hilltop Shuttle Staging Lot', category: 'Cars & Light Vehicles', totalSlots: 48, occupiedSlots: 32, evSlots: 4, vipSlots: 4, disabledSlots: 3, distanceToSanctum: 'Ropeway Ascent to Summit', status: 'Nominal', assignedCameraId: 'CAM-PVG-10', slots: generateSlots(48, 0.66, 'BAY-M') },
    { id: 'PARK-PVG-02', templeId: 'pavagadh', name: 'Champaner Foothills Heavy Bus Staging Ground', category: 'Heavy Bus & Coach', totalSlots: 48, occupiedSlots: 28, evSlots: 4, vipSlots: 2, disabledSlots: 2, distanceToSanctum: '5.5 km (Hill Shuttle Required)', status: 'Nominal', assignedCameraId: 'CAM-PVG-29', slots: generateSlots(48, 0.58, 'BAY-C') },
  ],
};

export interface CVPipelineStep {
  id: string;
  step: number;
  name: string;
  subtitle: string;
  latencyMs: number;
  accuracy: string;
  status: 'optimal' | 'warning' | 'error';
  details?: string;
}

export const CV_PIPELINE_STEPS: CVPipelineStep[] = [
  { id: 'cv-1', step: 1, name: 'Live Camera RTSP Feed', subtitle: '4K H.265 / 30 FPS Ingestion', latencyMs: 12, accuracy: 'Zero Frame Loss', status: 'optimal', details: 'Direct RTSP over UDP ingestion from GSDMA fiber ring' },
  { id: 'cv-2', step: 2, name: 'YOLOv8x Edge Detection', subtitle: 'People, Vehicles, Bags, Hazards', latencyMs: 24, accuracy: '99.4% mAP50', status: 'optimal', details: 'TensorRT FP16 acceleration running on Jetson AGX Orin' },
  { id: 'cv-3', step: 3, name: 'DeepSORT Trajectory Tracking', subtitle: 'Cross-camera Re-ID Vectors', latencyMs: 18, accuracy: '98.2% MOTA', status: 'optimal', details: 'Cosine distance tracking with Kalmar velocity estimation' },
  { id: 'cv-4', step: 4, name: 'Optical Flow Crowd Count', subtitle: 'Bidirectional Gate Flow (p/s)', latencyMs: 15, accuracy: '99.1% Inflow Count', status: 'optimal', details: 'Lucas-Kanade dense optical flow at boundary gate trips' },
  { id: 'cv-5', step: 5, name: 'Density Field Estimation', subtitle: 'Heatmap Density (p/m²)', latencyMs: 22, accuracy: '0.04 Error Margin', status: 'optimal', details: 'Gaussian kernel density surface computed at 100ms interval' },
  { id: 'cv-6', step: 6, name: 'Chokepoint Risk Scoring', subtitle: 'Threshold Surge & Velocity Drop', latencyMs: 14, accuracy: 'Real-time Risk Matrix', status: 'optimal', details: 'Weighted multi-factor score: density + velocity drop + turbulence' },
  { id: 'cv-7', step: 7, name: 'Predictive Queue Modeling', subtitle: '30-Min Lookahead Wait Times', latencyMs: 38, accuracy: '96.8% Confidence', status: 'optimal', details: 'LSTM neural network trained on historical Gujarat pilgrimage footfalls' },
  { id: 'cv-8', step: 8, name: 'Automated GSDMA SOP Alert', subtitle: 'Volunteer & Police Radio Dispatch', latencyMs: 29, accuracy: 'Action Dispatched', status: 'optimal', details: 'Direct trigger into police VHF radio and volunteer app notification' },
];

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
  { id: 'INC-SOM-901', title: 'Surge at Digvijay Dwar Entry Holding Bay', templeId: 'somnath', location: 'Digvijay Dwar Holding Bay', zone: 'Digvijay Dwar', type: 'Crowd Surge', priority: 'High', severity: 'High', status: 'In Progress', time: '11:25 AM', assignedTo: 'QRF Team Alpha', assignedTeam: 'QRF Team Alpha (8 Officers)', sopSteps: ['Deploy temporary holding barricades', 'Pulse entry every 90s', 'Activate loudspeaker crowd guidance', 'Coordinate with Parking Lot B shuttle'] },
  { id: 'INC-DWK-902', title: 'Elderly Pilgrim Dehydration near Gomti Steps', templeId: 'dwarka', location: 'Gomti Ghat Steps', zone: 'Gomti Ghat', type: 'Medical Emergency', priority: 'Medium', severity: 'Medium', status: 'In Progress', time: '11:10 AM', assignedTo: '108 Medical Unit 3', assignedTeam: '108 Ambulance Unit 3', sopSteps: ['Administer oral rehydration electrolytes', 'Deploy wheelchair buggy to medical post', 'Inform family coordinator'] },
  { id: 'INC-AMB-903', title: 'Ropeway Boarding Chokepoint Gate 2', templeId: 'ambaji', location: 'Gabbar Ropeway Station 2', zone: 'Gabbar Hill Ropeway Path', type: 'Queue Choke', priority: 'Critical', severity: 'Critical', status: 'Open', time: '11:40 AM', assignedTo: 'SDRF Ropeway Unit', assignedTeam: 'SDRF Ropeway Unit (12 Personnel)', sopSteps: ['Throttle lower boarding carousel to 3.8 m/s', 'Divert secondary queue to Hill Step trail', 'Issue GSDMA SMS advisory'] },
  { id: 'INC-PVG-904', title: 'Unattended Package at Machi Bus Depot', templeId: 'pavagadh', location: 'Machi Bus Stand', zone: 'Machi Base', type: 'Security', priority: 'Low', severity: 'Low', status: 'Resolved', time: '10:15 AM', assignedTo: 'BDDS Squad', assignedTeam: 'Bomb Detection & Disposal Squad', sopSteps: ['Cordon off 50m radius', 'X-ray scanner scan (Negative/Prasad items)', 'Log resolution in GSDMA portal'] },
];

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

export interface ReportRow {
  date: string;
  templeId: TempleId;
  temple: string;
  visitors: number;
  peakHour: string;
  maxQueue: number;
  incidents: number;
  parkingPeak: number;
  aiRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  revenue: number;
  resolvedPct: number;
  darshanSlotsBooked: number;
}

export const REPORT_DATA: ReportRow[] = [
  { date: '2026-08-01', templeId: 'somnath', temple: 'Somnath', visitors: 48200, peakHour: '18:00 - 19:30', maxQueue: 42, incidents: 3, parkingPeak: 81, aiRisk: 'High', revenue: 482000, resolvedPct: 100, darshanSlotsBooked: 1480 },
  { date: '2026-08-01', templeId: 'dwarka', temple: 'Dwarka', visitors: 36500, peakHour: '07:00 - 08:30', maxQueue: 28, incidents: 2, parkingPeak: 70, aiRisk: 'Medium', revenue: 365000, resolvedPct: 100, darshanSlotsBooked: 2000 },
  { date: '2026-08-01', templeId: 'ambaji', temple: 'Ambaji', visitors: 62000, peakHour: '09:00 - 11:00', maxQueue: 50, incidents: 5, parkingPeak: 92, aiRisk: 'Critical', revenue: 620000, resolvedPct: 80, darshanSlotsBooked: 5800 },
  { date: '2026-08-01', templeId: 'pavagadh', temple: 'Pavagadh', visitors: 28400, peakHour: '16:00 - 18:00', maxQueue: 40, incidents: 1, parkingPeak: 68, aiRisk: 'Low', revenue: 284000, resolvedPct: 100, darshanSlotsBooked: 2900 },
];

export const AI_CHAT_MESSAGES = [
  { id: 'MSG-1', role: 'assistant', sender: 'ai', content: 'Good morning Commander. YatraFlow AI Copilot is monitoring Somnath, Dwarka, Ambaji, and Pavagadh edge feeds. Current risk index across Gujarat is NOMINAL, with a moderate surge developing at Ambaji Chachar Chowk.', text: 'Good morning Commander. YatraFlow AI Copilot is monitoring Somnath, Dwarka, Ambaji, and Pavagadh edge feeds. Current risk index across Gujarat is NOMINAL, with a moderate surge developing at Ambaji Chachar Chowk.', timestamp: '11:00 AM', time: '11:00 AM' },
  { id: 'MSG-2', role: 'user', sender: 'user', content: 'What is the projected surge for Somnath during the 07:00 PM Sandhya Maha Aarti?', text: 'What is the projected surge for Somnath during the 07:00 PM Sandhya Maha Aarti?', timestamp: '11:02 AM', time: '11:02 AM' },
  { id: 'MSG-3', role: 'assistant', sender: 'ai', content: 'Simulation forecast indicates a peak inflow of 4,200 devotees between 06:30 PM and 07:15 PM at Somnath. Recommend activating Holding Bay 2, pre-staging 8 QRF officers at Digvijay Dwar, and throttling Parking Lot B bus departures.', text: 'Simulation forecast indicates a peak inflow of 4,200 devotees between 06:30 PM and 07:15 PM at Somnath. Recommend activating Holding Bay 2, pre-staging 8 QRF officers at Digvijay Dwar, and throttling Parking Lot B bus departures.', timestamp: '11:03 AM', time: '11:03 AM' },
];

export const AI_SUGGESTED_ACTIONS = [
  { id: 'ACT-1', title: 'Activate Somnath Holding Bay 2', priority: 'High', description: 'Prevents Garbhagriha corridor choke before Sandhya Aarti.' },
  { id: 'ACT-2', title: 'Deploy Electric Shuttles at Dwarka Gomti', priority: 'Medium', description: 'Assists 120 senior citizens currently queuing at Sudama Setu.' },
  { id: 'ACT-3', title: 'Synchronize Ambaji Ropeway to 4.2 m/s', priority: 'High', description: 'Increases uphill clearance rate by 340 passengers/hour.' },
];

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
  { templeId: 'somnath', name: 'Somnath', todayVisitors: 48200, dailyFootfall: 48200, currentVisitors: 8400, avgQueueTime: 28, avgWaitMin: 28, crowdDensity: 76, densityPct: 76, parkingOccupancy: 81, parkingOccupancyPct: 81, openIncidents: 1, activeIncidents: 1, aiRiskLevel: 'Moderate', status: 'Elevated', temperature: 31, weather: 'Clear', sparkline: [30, 42, 55, 68, 76, 72, 80, 84] },
  { templeId: 'dwarka', name: 'Dwarka', todayVisitors: 36500, dailyFootfall: 36500, currentVisitors: 6200, avgQueueTime: 22, avgWaitMin: 22, crowdDensity: 68, densityPct: 68, parkingOccupancy: 70, parkingOccupancyPct: 70, openIncidents: 1, activeIncidents: 1, aiRiskLevel: 'Low', status: 'Nominal', temperature: 30, weather: 'Breezy', sparkline: [22, 28, 40, 52, 60, 68, 65, 62] },
  { templeId: 'ambaji', name: 'Ambaji', todayVisitors: 62000, dailyFootfall: 62000, currentVisitors: 11400, avgQueueTime: 45, avgWaitMin: 45, crowdDensity: 88, densityPct: 88, parkingOccupancy: 92, parkingOccupancyPct: 92, openIncidents: 2, activeIncidents: 2, aiRiskLevel: 'Critical', status: 'Critical', temperature: 28, weather: 'Cloudy', sparkline: [40, 55, 70, 82, 88, 92, 90, 88] },
  { templeId: 'pavagadh', name: 'Pavagadh', todayVisitors: 28400, dailyFootfall: 28400, currentVisitors: 4800, avgQueueTime: 32, avgWaitMin: 32, crowdDensity: 62, densityPct: 62, parkingOccupancy: 68, parkingOccupancyPct: 68, openIncidents: 0, activeIncidents: 0, aiRiskLevel: 'Low', status: 'Nominal', temperature: 29, weather: 'Sunny', sparkline: [15, 25, 38, 48, 55, 62, 58, 60] },
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
