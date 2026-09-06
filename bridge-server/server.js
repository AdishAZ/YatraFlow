/**
 * YatraFlow Bridge Server
 * ========================
 * Local REST bridge running on port 8000.
 * - Android app (via NetworkClient.kt) posts bookings & SOS incidents here
 * - Web admin dashboard (BookingManagement, Incidents) polls here every 5s
 *
 * Endpoints:
 *   GET  /api/health          -> 200 OK (mobile probes this to verify connectivity)
 *   GET  /api/bookings        -> All bookings (static slots + mobile-submitted)
 *   POST /api/bookings        -> Submit a new booking from mobile
 *   GET  /api/incidents       -> All incidents (seed + mobile SOS)
 *   POST /api/incidents       -> Submit a new incident / SOS from mobile
 *   GET  /api/sos             -> All SOS events
 *   POST /api/sos             -> Submit SOS from mobile (alias for incidents with severity=CRITICAL)
 *   GET  /api/temples         -> Temple info (mobile uses this)
 *   GET  /api/queues          -> Queue data (mobile uses this)
 *   GET  /api/volunteers      -> Volunteers (mobile uses this)
 *   POST /api/pilgrims        -> Pilgrim registration
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ─────────────────────────────────────────────
// IN-MEMORY STATE
// ─────────────────────────────────────────────

let incidentCounter = 100;
let bookingCounter = 1000;
let sosCounter = 1;

// Mobile-submitted bookings (start empty, filled by app)
const mobileBookings = [];

// Mobile-submitted incidents/SOS (start empty, filled by app)
const mobileIncidents = [];

// Seed slot data (mirrors what the web admin shows by default)
const SEED_SLOTS = [
  { id: 'B-SOM-1', templeId: 'somnath', type: 'Aarti',   time: '06:00 AM', capacity: 1500, booked: 1480 },
  { id: 'B-SOM-2', templeId: 'somnath', type: 'Morning', time: '08:00 AM', capacity: 4000, booked: 3200 },
  { id: 'B-SOM-3', templeId: 'somnath', type: 'VIP',     time: '11:00 AM', capacity:  500, booked:  490 },
  { id: 'B-SOM-4', templeId: 'somnath', type: 'General', time: '02:00 PM', capacity: 5000, booked: 2100 },
  { id: 'B-DWK-1', templeId: 'dwarka',  type: 'Aarti',   time: '07:00 AM', capacity: 2000, booked: 2000 },
  { id: 'B-AMB-1', templeId: 'ambaji',  type: 'Morning', time: '09:00 AM', capacity: 6000, booked: 5800 },
  { id: 'B-PVG-1', templeId: 'pavagadh',type: 'Evening', time: '05:00 PM', capacity: 3000, booked: 2900 },
];

// Temple data (mobile calls /api/temples)
const TEMPLES_DATA = [
  {
    id: 'somnath', name: 'Somnath', full_name: 'Shree Somnath Jyotirlinga Temple',
    city: 'Veraval, Gujarat', active_festival: 'Maha Shivratri Mahotsav',
    daily_capacity: 75000, current_occupancy: 42000,
    emergency_contact: '+91 2876 231200 / 112',
    police_incharge: 'SP Gir Somnath', sdrf_team: 'SDRF Marine Battalion 3',
    aartis: [
      { name: 'Pratah Mangla Aarti', time: '07:00 AM', status: 'Completed' },
      { name: 'Madhyahna Shringar Aarti', time: '12:00 PM', status: 'Completed' },
      { name: 'Sandhya Maha Aarti', time: '07:00 PM', status: 'Current' },
      { name: 'Shayan Aarti', time: '09:30 PM', status: 'Upcoming' },
    ]
  },
  {
    id: 'dwarka', name: 'Dwarkadhish', full_name: 'Dwarkadhish Jagat Mandir',
    city: 'Dwarka, Gujarat', active_festival: 'Janmashtami Celebration',
    daily_capacity: 50000, current_occupancy: 28000,
    emergency_contact: '+91 2892 234099 / 112',
    police_incharge: 'SP Devbhoomi Dwarka', sdrf_team: 'SDRF River Battalion 1',
    aartis: [
      { name: 'Mangala Aarti', time: '06:30 AM', status: 'Completed' },
      { name: 'Sandhya Aarti', time: '07:00 PM', status: 'Current' },
    ]
  },
  {
    id: 'ambaji', name: 'Ambaji', full_name: 'Ambaji Mata Temple',
    city: 'Ambaji, Gujarat', active_festival: 'Bhadarvi Poonam',
    daily_capacity: 80000, current_occupancy: 51000,
    emergency_contact: '+91 2749 262111 / 112',
    police_incharge: 'SP Banaskantha', sdrf_team: 'SDRF Hill Rescue Unit',
    aartis: []
  },
  {
    id: 'pavagadh', name: 'Pavagadh', full_name: 'Kalika Mata Temple, Pavagadh',
    city: 'Pavagadh, Gujarat', active_festival: 'Navratri Mahotsav',
    daily_capacity: 30000, current_occupancy: 12000,
    emergency_contact: '+91 2676 240233 / 112',
    police_incharge: 'SP Panchmahal', sdrf_team: 'SDRF Mountain Unit',
    aartis: []
  }
];

// Queue data (mobile calls /api/queues)
const QUEUES_DATA = [
  { id: 'Q-SOM-1', temple_id: 'somnath', name: 'Garbhagriha Main Entry', category: 'General', current_pilgrims: 850, max_capacity: 1000, waiting_time_min: 45, risk: 'High', status: 'OPEN', aiRecommendations: ['Open overflow corridor B', 'Deploy 2 extra volunteers'] },
  { id: 'Q-SOM-2', temple_id: 'somnath', name: 'Digvijay Dwar VIP Lane', category: 'VIP', current_pilgrims: 120, max_capacity: 200, waiting_time_min: 10, risk: 'Normal', status: 'OPEN', aiRecommendations: [] },
  { id: 'Q-DWK-1', temple_id: 'dwarka',  name: 'Swarg Dwar Main Queue', category: 'General', current_pilgrims: 1450, max_capacity: 1800, waiting_time_min: 55, risk: 'Critical', status: 'OPEN', aiRecommendations: ['Activate overflow waiting area', 'Divert incoming traffic'] },
];

// Volunteer data (mobile calls /api/volunteers)
const VOLUNTEERS_DATA = [
  { id: 'VOL-001', temple_id: 'somnath', role: 'Crowd Marshal', team_name: 'Alpha Team', status: 'On Duty', zone: 'Gate 1 Entry', battery: 85, radio_status: 'Connected', phone: '+91 98765 00001' },
  { id: 'VOL-002', temple_id: 'somnath', role: 'First Aid', team_name: 'Medical Team', status: 'On Duty', zone: 'Sanctum Area', battery: 72, radio_status: 'Connected', phone: '+91 98765 00002' },
  { id: 'VOL-003', temple_id: 'dwarka',  role: 'Queue Manager', team_name: 'Beta Team', status: 'On Duty', zone: 'Swarg Dwar', battery: 91, radio_status: 'Connected', phone: '+91 98765 00003' },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function now() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function nowIso() {
  return new Date().toISOString();
}

// ─────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'YatraFlow Bridge', port: PORT, timestamp: nowIso() });
});

// ── TEMPLES ──────────────────────────────────
app.get('/api/temples', (req, res) => {
  res.json({ success: true, data: TEMPLES_DATA });
});

// ── QUEUES ───────────────────────────────────
app.get('/api/queues', (req, res) => {
  const { templeId } = req.query;
  const data = templeId ? QUEUES_DATA.filter(q => q.temple_id === templeId) : QUEUES_DATA;
  res.json({ success: true, data });
});

app.post('/api/queues/:id/action', (req, res) => {
  res.json({ success: true, message: 'Queue action received' });
});

// ── VOLUNTEERS ───────────────────────────────
app.get('/api/volunteers', (req, res) => {
  const { templeId } = req.query;
  const data = templeId ? VOLUNTEERS_DATA.filter(v => v.temple_id === templeId) : VOLUNTEERS_DATA;
  res.json({ success: true, data });
});

// ── PILGRIMS (registration) ───────────────────
app.post('/api/pilgrims', (req, res) => {
  const { name, templeId, phone } = req.body;
  const token = `QR-${(templeId || 'SOM').toUpperCase().slice(0,3)}-${Math.floor(Math.random() * 9000) + 1000}`;
  console.log(`[PILGRIM] Registered: ${name} | Temple: ${templeId} | Token: ${token}`);
  res.json({ success: true, token, message: 'Pilgrim registered successfully' });
});

// ── BOOKINGS ─────────────────────────────────
app.get('/api/bookings', (req, res) => {
  // Compute slot data with mobile bookings merged in
  const slots = SEED_SLOTS.map(slot => {
    // Count how many mobile bookings map to this slot
    const mobileCount = mobileBookings.filter(b =>
      b.templeId === slot.templeId && b.time === slot.time
    ).reduce((sum, b) => sum + (b.devoteeCount || 1), 0);
    return { ...slot, booked: slot.booked + mobileCount, mobileCount };
  });

  res.json({
    success: true,
    slots,
    mobileBookings,
    totalMobileBookings: mobileBookings.length
  });
});

app.post('/api/bookings', (req, res) => {
  const { temple_id, templeId, slot_time, slotTime, time, devotee_count, devoteeCount, name, pass_holder_name } = req.body;
  const booking = {
    id: `MOB-BK-${String(bookingCounter++).padStart(4, '0')}`,
    templeId: temple_id || templeId || 'somnath',
    time: slot_time || slotTime || time || 'Unknown',
    devoteeCount: devotee_count || devoteeCount || 1,
    passHolderName: pass_holder_name || name || 'Pilgrim',
    bookingRef: `TC-MOB-${Math.floor(Math.random() * 90000) + 10000}`,
    timestamp: nowIso(),
    source: 'mobile'
  };
  mobileBookings.unshift(booking);
  console.log(`[BOOKING] New mobile booking: ${booking.id} | ${booking.passHolderName} | ${booking.templeId} | ${booking.time} | ${booking.devoteeCount} devotees`);
  res.json({ success: true, booking, message: 'Booking confirmed' });
});

// ── INCIDENTS (includes SOS) ──────────────────
app.get('/api/incidents', (req, res) => {
  res.json({
    success: true,
    incidents: mobileIncidents,
    total: mobileIncidents.length
  });
});

app.post('/api/incidents', (req, res) => {
  const { temple_id, templeId, title, description, severity, location, reported_by } = req.body;
  const incident = {
    id: `MOB-INC-${String(incidentCounter++).padStart(3, '0')}`,
    templeId: temple_id || templeId || 'somnath',
    title: title || 'Mobile Emergency Alert',
    description: description || 'Alert triggered from mobile app',
    severity: severity || 'CRITICAL',
    location: location || 'Temple Campus',
    reportedBy: reported_by || 'Pilgrim Mobile App',
    status: 'Reported',
    timestamp: nowIso(),
    time: now(),
    source: 'mobile'
  };
  mobileIncidents.unshift(incident);
  console.log(`[INCIDENT] ${incident.id} | ${incident.severity} | ${incident.title} | ${incident.location}`);
  res.json({ success: true, incident, message: 'Incident created' });
});

// SOS alias
app.post('/api/sos', (req, res) => {
  req.body.title = req.body.title || `SOS-${String(sosCounter++).padStart(3, '0')}: Emergency Panic Alert`;
  req.body.severity = 'CRITICAL';
  req.body.source = 'mobile-sos';
  // Delegate to incident creation logic
  const { temple_id, templeId, title, description, severity, location, reported_by } = req.body;
  const incident = {
    id: `MOB-SOS-${String(incidentCounter++).padStart(3, '0')}`,
    templeId: temple_id || templeId || 'somnath',
    title: title,
    description: description || 'Pilgrim panic button activated',
    severity: 'CRITICAL',
    location: location || 'Temple Campus',
    reportedBy: reported_by || 'Pilgrim Mobile App (SOS)',
    status: 'Reported',
    timestamp: nowIso(),
    time: now(),
    source: 'mobile-sos'
  };
  mobileIncidents.unshift(incident);
  console.log(`[SOS] ${incident.id} | ${incident.title} | ${incident.location}`);
  res.json({ success: true, incident });
});

app.get('/api/sos', (req, res) => {
  res.json({ success: true, incidents: mobileIncidents.filter(i => i.source === 'mobile-sos') });
});

// ─────────────────────────────────────────────
// START
// ─────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   YatraFlow Bridge Server  — Running!       ║');
  console.log(`║   http://localhost:${PORT}                      ║`);
  console.log('║                                              ║');
  console.log('║   Android app → POST /api/bookings          ║');
  console.log('║   Android app → POST /api/incidents (SOS)   ║');
  console.log('║   Web admin   → GET  /api/bookings (poll)   ║');
  console.log('║   Web admin   → GET  /api/incidents (poll)  ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('');
});
