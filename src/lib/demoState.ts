import type { TempleId } from './data';

// ============================================================
// TYPES
// ============================================================

export type IncidentSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type IncidentStatus = 'Reported' | 'Assigned' | 'In Progress' | 'Resolved';
export type ResourceType = 'Police' | 'Medical' | 'Volunteer' | 'Fire' | 'SDRF';
export type ResourceStatus = 'Available' | 'Deployed' | 'En Route' | 'Busy' | 'Offline';

export interface DemoIncident {
  id: string;
  title: string;
  templeId: TempleId;
  location: string;
  zone: string;
  type: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  detectedAt: string;
  assignedResources: string[];
  recommendation: string;
  timeline: { time: string; message: string }[];
}

export interface DemoResource {
  id: string;
  type: ResourceType;
  label: string;
  templeId: TempleId;
  zone: string;
  status: ResourceStatus;
  assignedIncident: string | null;
  lastUpdate: string;
}

export interface DemoAlert {
  id: string;
  message: string;
  severity: IncidentSeverity;
  timestamp: string;
  dismissed: boolean;
}

export interface DemoEmergency {
  id: string;
  location: string;
  status: 'Initiated' | 'Response Dispatched' | 'Resolved';
  nearestResources: { id: string; distance: string; eta: string }[];
  timestamp: string;
}

export interface DemoExport {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export interface DemoSnapshot {
  incidents: DemoIncident[];
  resources: DemoResource[];
  alerts: DemoAlert[];
  emergencies: DemoEmergency[];
  exports: DemoExport[];
}

// ============================================================
// SEED DATA
// ============================================================

const SEED_INCIDENTS: DemoIncident[] = [
  // ── SOMNATH ──────────────────────────────────────────────────
  {
    id: 'INC-001', title: 'Crowd Surge at Entry Gateway', templeId: 'somnath',
    location: 'Main Entry Gateway', zone: 'Entry Gateway',
    type: 'Crowd Surge', severity: 'High', status: 'In Progress',
    detectedAt: '03:17 PM',
    assignedResources: ['POL-04', 'POL-07', 'MED-02'],
    recommendation: 'Open overflow corridor and deploy 2 additional volunteers',
    timeline: [
      { time: '03:17 PM', message: 'Crowd density exceeded threshold (92%)' },
      { time: '03:19 PM', message: 'Alert acknowledged by Control Room' },
      { time: '03:22 PM', message: 'POL-04 and POL-07 dispatched' },
      { time: '03:25 PM', message: 'MED-02 on standby near zone — response in progress' },
    ]
  },
  {
    id: 'INC-002', title: 'Lost Child — Visitors Plaza', templeId: 'somnath',
    location: 'Visitors Plaza Center', zone: 'Visitors Plaza',
    type: 'Lost Child', severity: 'High', status: 'Assigned',
    detectedAt: '03:05 PM',
    assignedResources: ['VOL-03', 'POL-09'],
    recommendation: 'Broadcast PA announcement and check CCTV backtrack',
    timeline: [
      { time: '03:05 PM', message: 'Parent reported 7-year-old missing' },
      { time: '03:07 PM', message: 'Incident acknowledged by Control Room' },
      { time: '03:08 PM', message: 'VOL-03 and POL-09 assigned as response team' },
    ]
  },
  {
    id: 'INC-003', title: 'Suspicious Bag Near Shoe Stand', templeId: 'somnath',
    location: 'Shoe Collection Center', zone: 'Entry Gateway',
    type: 'Security', severity: 'Medium', status: 'Reported',
    detectedAt: '03:45 PM',
    assignedResources: [],
    recommendation: 'Dispatch BDDS unit for inspection and cordon area',
    timeline: [
      { time: '03:45 PM', message: 'Bag reported abandoned by volunteer — awaiting assignment' },
    ]
  },
  {
    id: 'INC-004', title: 'Unauthorized Drone Sighting', templeId: 'somnath',
    location: 'Beachfront Park', zone: 'Beach Promenade',
    type: 'Security', severity: 'Medium', status: 'Resolved',
    detectedAt: '02:30 PM',
    assignedResources: ['POL-01', 'POL-02'],
    recommendation: 'Drone grounded and operator identified',
    timeline: [
      { time: '02:30 PM', message: 'Unidentified drone detected near Beachfront Park' },
      { time: '02:32 PM', message: 'Alert acknowledged — patrols assigned' },
      { time: '02:38 PM', message: 'Patrol units intercepted drone operator' },
      { time: '02:50 PM', message: 'Drone confiscated, operator escorted — incident resolved' },
    ]
  },

  // ── DWARKA ───────────────────────────────────────────────────
  {
    id: 'INC-005', title: 'Pilgrim Bottleneck at Moksha Dwar', templeId: 'dwarka',
    location: 'Moksha Dwar Entry', zone: 'Moksha Dwar',
    type: 'Crowd Surge', severity: 'High', status: 'In Progress',
    detectedAt: '03:10 PM',
    assignedResources: ['POL-08', 'VOL-01'],
    recommendation: 'Stagger entry batches every 5 minutes; deploy crowd control ropes',
    timeline: [
      { time: '03:10 PM', message: 'Bottleneck reported by gate marshal' },
      { time: '03:13 PM', message: 'Incident acknowledged by Control Room' },
      { time: '03:15 PM', message: 'POL-08 and VOL-01 assigned to manage flow' },
      { time: '03:20 PM', message: 'Batch entry system initiated — situation improving' },
    ]
  },
  {
    id: 'INC-006', title: 'Medical Emergency — Elderly Dehydration', templeId: 'dwarka',
    location: 'Gomti Ghat Steps', zone: 'Gomti Ghat',
    type: 'Medical Emergency', severity: 'Medium', status: 'Assigned',
    detectedAt: '02:45 PM',
    assignedResources: ['MED-05'],
    recommendation: 'Dispatch ambulance 108 and clear pathway',
    timeline: [
      { time: '02:45 PM', message: 'Pilgrim reported unwell at Gomti Steps' },
      { time: '02:47 PM', message: 'MED-05 dispatched with ORS kit' },
    ]
  },
  {
    id: 'INC-003', title: 'Ropeway Boarding Chokepoint', templeId: 'ambaji',
    location: 'Gabbar Ropeway Station 2', zone: 'Ropeway Base',
    type: 'Queue Choke', severity: 'Critical', status: 'Reported',
    detectedAt: '03:40 PM',
    assignedResources: [],
    recommendation: 'Throttle boarding speed and divert to hill steps trail',
    timeline: [
      { time: '03:40 PM', message: 'Queue length exceeded 400m at Station 2' },
    ]
  },
  {
    id: 'INC-004', title: 'Unattended Package — Machi Depot', templeId: 'pavagadh',
    location: 'Machi Bus Stand', zone: 'Machi Base',
    type: 'Security', severity: 'Low', status: 'Resolved',
    detectedAt: '01:15 PM',
    assignedResources: ['POL-12'],
    recommendation: 'Package cleared — prasad items confirmed',
    timeline: [
      { time: '01:15 PM', message: 'Package reported by volunteer' },
      { time: '01:20 PM', message: 'Area cordoned, BDDS notified' },
      { time: '01:35 PM', message: 'Package scanned — negative' },
      { time: '01:40 PM', message: 'Incident resolved' },
    ]
  },
  {
    id: 'INC-005', title: 'Lost Child — Visitors Plaza', templeId: 'somnath',
    location: 'Visitors Plaza Center', zone: 'Visitors Plaza',
    type: 'Lost Child', severity: 'High', status: 'In Progress',
    detectedAt: '03:05 PM',
    assignedResources: ['VOL-03', 'POL-09'],
    recommendation: 'Broadcast PA announcement and check CCTV backtrack',
    timeline: [
      { time: '03:05 PM', message: 'Parent reported 7-year-old missing' },
      { time: '03:08 PM', message: 'VOL-03 assigned as family liaison' },
      { time: '03:12 PM', message: 'CCTV backtrack initiated on CAM-SOM-01' },
    ]
  },
  {
    id: 'INC-006', title: 'Unauthorized Drone Sighting', templeId: 'somnath',
    location: 'Beachfront Park', zone: 'Beach Promenade',
    type: 'Security', severity: 'Medium', status: 'Assigned',
    detectedAt: '03:30 PM',
    assignedResources: ['POL-01', 'POL-02', 'POL-03'],
    recommendation: 'Deploy drone mitigation unit to Beach Promenade',
    timeline: [
      { time: '03:30 PM', message: 'Unidentified drone detected near Beachfront Park' },
      { time: '03:32 PM', message: 'Patrol units dispatched to intercept' },
    ]
  },
  {
    id: 'INC-007', title: 'Suspicious Bag Near Shoe Stand', templeId: 'somnath',
    location: 'Shoe Collection Center', zone: 'Entry Gateway',
    type: 'Security', severity: 'Medium', status: 'Reported',
    detectedAt: '03:45 PM',
    assignedResources: [],
    recommendation: 'Dispatch BDDS unit for inspection and cordon area',
    timeline: [
      { time: '03:45 PM', message: 'Bag reported abandoned by volunteer' },
    ]
  },
  {
    id: 'INC-008', title: 'Minor Stampede Risk Managed', templeId: 'somnath',
    location: 'VIP Corridor Gate', zone: 'VIP Dwar Corridor',
    type: 'Crowd Surge', severity: 'High', status: 'Resolved',
    detectedAt: '01:20 PM',
    assignedResources: ['POL-05', 'VOL-12'],
    recommendation: 'Holding area cleared, regular flow restored',
    timeline: [
      { time: '01:20 PM', message: 'Temporary surge detected at VIP check' },
      { time: '01:25 PM', message: 'Officers dispatched to manage queue' },
      { time: '01:40 PM', message: 'Crowd dispersed, normal operations resumed' },
    ]
  },
];

const SEED_RESOURCES: DemoResource[] = [
  // Police
  { id: 'POL-01', type: 'Police', label: 'Inspector R. Jadeja', templeId: 'somnath', zone: 'North Gate', status: 'Deployed', assignedIncident: 'INC-006', lastUpdate: '03:32 PM' },
  { id: 'POL-02', type: 'Police', label: 'SI K. Parmar', templeId: 'somnath', zone: 'VIP Gate', status: 'Deployed', assignedIncident: 'INC-006', lastUpdate: '03:32 PM' },
  { id: 'POL-03', type: 'Police', label: 'SI M. Rathod', templeId: 'somnath', zone: 'VIP Gate', status: 'Deployed', assignedIncident: 'INC-006', lastUpdate: '03:33 PM' },
  { id: 'POL-04', type: 'Police', label: 'ASI H. Solanki', templeId: 'somnath', zone: 'North Gate', status: 'Deployed', assignedIncident: 'INC-001', lastUpdate: '03:22 PM' },
  { id: 'POL-05', type: 'Police', label: 'Constable V. Patel', templeId: 'somnath', zone: 'Main Mandap', status: 'Available', assignedIncident: null, lastUpdate: '03:00 PM' },
  { id: 'POL-06', type: 'Police', label: 'Constable A. Shah', templeId: 'somnath', zone: 'Temple Exit', status: 'Available', assignedIncident: null, lastUpdate: '02:55 PM' },
  { id: 'POL-07', type: 'Police', label: 'ASI D. Vaghela', templeId: 'somnath', zone: 'North Gate', status: 'Deployed', assignedIncident: 'INC-001', lastUpdate: '03:22 PM' },
  { id: 'POL-08', type: 'Police', label: 'Inspector S. Desai', templeId: 'dwarka', zone: 'Moksha Dwar', status: 'Available', assignedIncident: null, lastUpdate: '03:10 PM' },
  { id: 'POL-09', type: 'Police', label: 'SI P. Joshi', templeId: 'somnath', zone: 'North Gate', status: 'Deployed', assignedIncident: 'INC-005', lastUpdate: '03:08 PM' },
  { id: 'POL-10', type: 'Police', label: 'Constable R. Bhatt', templeId: 'dwarka', zone: 'Gomti Ghat', status: 'Available', assignedIncident: null, lastUpdate: '03:05 PM' },
  { id: 'POL-11', type: 'Police', label: 'ASI G. Thakor', templeId: 'ambaji', zone: 'Ropeway Base', status: 'Available', assignedIncident: null, lastUpdate: '03:15 PM' },
  { id: 'POL-12', type: 'Police', label: 'Inspector N. Chaudhary', templeId: 'pavagadh', zone: 'Machi Base', status: 'Available', assignedIncident: null, lastUpdate: '01:40 PM' },
  // Medical
  { id: 'MED-01', type: 'Medical', label: 'Dr. S. Patel (108)', templeId: 'somnath', zone: 'Main Mandap', status: 'Available', assignedIncident: null, lastUpdate: '03:00 PM' },
  { id: 'MED-02', type: 'Medical', label: 'Paramedic Team 2', templeId: 'somnath', zone: 'North Gate', status: 'Deployed', assignedIncident: 'INC-001', lastUpdate: '03:25 PM' },
  { id: 'MED-03', type: 'Medical', label: 'Dr. A. Trivedi', templeId: 'dwarka', zone: 'Moksha Dwar', status: 'Available', assignedIncident: null, lastUpdate: '02:50 PM' },
  { id: 'MED-04', type: 'Medical', label: 'Ambulance Unit 4', templeId: 'ambaji', zone: 'Chachar Chowk', status: 'Available', assignedIncident: null, lastUpdate: '03:20 PM' },
  { id: 'MED-05', type: 'Medical', label: 'Paramedic Team 5', templeId: 'dwarka', zone: 'Gomti Ghat', status: 'Deployed', assignedIncident: 'INC-002', lastUpdate: '02:47 PM' },
  // Volunteers
  { id: 'VOL-01', type: 'Volunteer', label: 'Jayeshbhai Joshi', templeId: 'somnath', zone: 'North Gate', status: 'Available', assignedIncident: null, lastUpdate: '03:00 PM' },
  { id: 'VOL-02', type: 'Volunteer', label: 'Pooja Trivedi', templeId: 'somnath', zone: 'Main Mandap', status: 'Available', assignedIncident: null, lastUpdate: '03:05 PM' },
  { id: 'VOL-03', type: 'Volunteer', label: 'Hardik Ahir', templeId: 'somnath', zone: 'North Gate', status: 'Deployed', assignedIncident: 'INC-005', lastUpdate: '03:08 PM' },
  { id: 'VOL-04', type: 'Volunteer', label: 'Kishan Barot', templeId: 'ambaji', zone: 'Chachar Chowk', status: 'Available', assignedIncident: null, lastUpdate: '03:10 PM' },
  { id: 'VOL-05', type: 'Volunteer', label: 'Mehul Rathod', templeId: 'pavagadh', zone: 'Machi Base', status: 'Available', assignedIncident: null, lastUpdate: '03:12 PM' },
  // Fire
  { id: 'FIRE-01', type: 'Fire', label: 'Fire Tender Unit 1', templeId: 'somnath', zone: 'Parking Lot B', status: 'Available', assignedIncident: null, lastUpdate: '02:00 PM' },
  { id: 'FIRE-02', type: 'Fire', label: 'Fire Tender Unit 2', templeId: 'ambaji', zone: 'Ropeway Base', status: 'Available', assignedIncident: null, lastUpdate: '02:30 PM' },
  // SDRF
  { id: 'SDRF-01', type: 'SDRF', label: 'SDRF Team Alpha', templeId: 'somnath', zone: 'Main Mandap', status: 'Available', assignedIncident: null, lastUpdate: '03:00 PM' },
  { id: 'SDRF-02', type: 'SDRF', label: 'SDRF Team Bravo', templeId: 'ambaji', zone: 'Ropeway Base', status: 'Available', assignedIncident: null, lastUpdate: '03:10 PM' },
];

const SEED_ALERTS: DemoAlert[] = [
  { id: 'ALT-001', message: 'Crowd density at Entry Gateway exceeded 90%', severity: 'High', timestamp: '03:17 PM', dismissed: false },
  { id: 'ALT-002', message: 'Medical emergency reported at Gomti Ghat', severity: 'Medium', timestamp: '02:45 PM', dismissed: false },
  { id: 'ALT-003', message: 'Ropeway queue exceeded 400m at Ambaji', severity: 'Critical', timestamp: '03:40 PM', dismissed: false },
  { id: 'ALT-004', message: 'Unauthorized Drone sighted near Beachfront Park', severity: 'Medium', timestamp: '03:30 PM', dismissed: false },
  { id: 'ALT-005', message: 'Newly Constructed Parking at 88% capacity', severity: 'High', timestamp: '03:15 PM', dismissed: false },
  { id: 'ALT-006', message: 'Lost child reported near Visitors Plaza', severity: 'High', timestamp: '03:05 PM', dismissed: false },
];

// ============================================================
// STORE IMPLEMENTATION
// ============================================================

let nextIncidentId = 7;
let nextAlertId = 7;
let nextEmergencyId = 1;
let nextExportId = 1;

class DemoStateImpl {
  incidents: DemoIncident[] = [...SEED_INCIDENTS];
  resources: DemoResource[] = [...SEED_RESOURCES];
  alerts: DemoAlert[] = [...SEED_ALERTS];
  emergencies: DemoEmergency[] = [];
  exports: DemoExport[] = [];

  private listeners = new Set<() => void>();

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  getState(): DemoSnapshot {
    return {
      incidents: this.incidents,
      resources: this.resources,
      alerts: this.alerts,
      emergencies: this.emergencies,
      exports: this.exports,
    };
  }

  // ---- Incident Actions ----

  createIncident(partial: { title: string; templeId: TempleId; location: string; zone: string; type: string; severity: IncidentSeverity; recommendation: string }): DemoIncident {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const inc: DemoIncident = {
      id: `INC-${String(nextIncidentId++).padStart(3, '0')}`,
      ...partial,
      status: 'Reported',
      detectedAt: now,
      assignedResources: [],
      timeline: [{ time: now, message: `Incident reported: ${partial.title}` }],
    };
    this.incidents = [inc, ...this.incidents];
    this.addAlert({ message: `New incident: ${partial.title}`, severity: partial.severity });
    this.notify();
    return inc;
  }

  acknowledgeIncident(id: string) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    this.incidents = this.incidents.map(i =>
      i.id === id ? { ...i, status: 'Assigned' as IncidentStatus, timeline: [...i.timeline, { time: now, message: 'Incident acknowledged and assigned by Control Room' }] } : i
    );
    this.notify();
  }

  startIncidentProgress(id: string) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    this.incidents = this.incidents.map(i =>
      i.id === id ? { ...i, status: 'In Progress' as IncidentStatus, timeline: [...i.timeline, { time: now, message: 'Response operations started on ground' }] } : i
    );
    this.notify();
  }

  escalateIncident(id: string) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    this.incidents = this.incidents.map(i =>
      i.id === id ? { ...i, severity: 'Critical' as IncidentSeverity, timeline: [...i.timeline, { time: now, message: 'Incident escalated to CRITICAL' }] } : i
    );
    this.addAlert({ message: `Incident ${id} escalated to CRITICAL`, severity: 'Critical' });
    this.notify();
  }

  resolveIncident(id: string) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    this.incidents = this.incidents.map(i =>
      i.id === id ? { ...i, status: 'Resolved' as IncidentStatus, timeline: [...i.timeline, { time: now, message: 'Incident resolved' }] } : i
    );
    // Free assigned resources
    const inc = this.incidents.find(i => i.id === id);
    if (inc) {
      this.resources = this.resources.map(r =>
        inc.assignedResources.includes(r.id) ? { ...r, status: 'Available' as ResourceStatus, assignedIncident: null, lastUpdate: now } : r
      );
    }
    this.notify();
  }

  // ---- Resource Actions ----

  dispatchResource(resourceId: string, location: string, incidentId?: string) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    this.resources = this.resources.map(r =>
      r.id === resourceId ? { ...r, status: 'En Route' as ResourceStatus, zone: location, assignedIncident: incidentId || null, lastUpdate: now } : r
    );
    if (incidentId) {
      this.incidents = this.incidents.map(i =>
        i.id === incidentId ? { ...i, assignedResources: [...i.assignedResources, resourceId], timeline: [...i.timeline, { time: now, message: `${resourceId} dispatched to ${location}` }] } : i
      );
    }
    // Transition to Deployed after 5s
    setTimeout(() => {
      this.resources = this.resources.map(r =>
        r.id === resourceId && r.status === 'En Route' ? { ...r, status: 'Deployed' as ResourceStatus } : r
      );
      this.notify();
    }, 5000);
    this.notify();
  }

  recallResource(resourceId: string) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    this.resources = this.resources.map(r =>
      r.id === resourceId ? { ...r, status: 'Available' as ResourceStatus, assignedIncident: null, lastUpdate: now } : r
    );
    this.notify();
  }

  // ---- Alert Actions ----

  addAlert(partial: { message: string; severity: IncidentSeverity }) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    this.alerts = [
      { id: `ALT-${String(nextAlertId++).padStart(3, '0')}`, ...partial, timestamp: now, dismissed: false },
      ...this.alerts
    ];
    this.notify();
  }

  dismissAlert(id: string) {
    this.alerts = this.alerts.map(a => a.id === id ? { ...a, dismissed: true } : a);
    this.notify();
  }

  // ---- SOS ----

  triggerSOS(location: string): DemoEmergency {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const available = this.resources.filter(r => r.status === 'Available').slice(0, 3);
    const emergency: DemoEmergency = {
      id: `SOS-${String(nextEmergencyId++).padStart(3, '0')}`,
      location,
      status: 'Initiated',
      nearestResources: available.map((r, i) => ({
        id: r.id,
        distance: `${(i + 1) * 120 + Math.floor(Math.random() * 80)}m`,
        eta: `${(i + 1) * 2} min`,
      })),
      timestamp: now,
    };
    this.emergencies = [emergency, ...this.emergencies];
    this.addAlert({ message: `SOS EMERGENCY at ${location}`, severity: 'Critical' });

    // Auto-dispatch nearest resource after 3s
    setTimeout(() => {
      if (available[0]) {
        this.dispatchResource(available[0].id, location);
      }
      this.emergencies = this.emergencies.map(e =>
        e.id === emergency.id ? { ...e, status: 'Response Dispatched' } : e
      );
      this.notify();
    }, 3000);

    this.notify();
    return emergency;
  }

  // ---- Export ----

  generateExport(type: string, context: string) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const exp: DemoExport = {
      id: `EXP-${String(nextExportId++).padStart(3, '0')}`,
      type,
      description: context,
      timestamp: now,
    };
    this.exports = [exp, ...this.exports];

    // Generate and download a text report
    const reportContent = this.buildReport(type, context);
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Darshan_${type.replace(/\s+/g, '_')}_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.notify();
  }

  private buildReport(type: string, context: string): string {
    const now = new Date().toLocaleString('en-IN');
    const activeIncidents = this.incidents.filter(i => i.status !== 'Resolved');
    const deployedResources = this.resources.filter(r => r.status === 'Deployed' || r.status === 'En Route');
    const activeAlerts = this.alerts.filter(a => !a.dismissed);

    return `
════════════════════════════════════════════════════════
Darshan ICCC — OPERATIONAL REPORT
════════════════════════════════════════════════════════

Report Type:    ${type}
Context:        ${context}
Generated:      ${now}
Classification: OFFICIAL — GSDMA OPERATIONS

────────────────────────────────────────────────────────
EXECUTIVE SUMMARY
────────────────────────────────────────────────────────
Active Incidents:    ${activeIncidents.length}
Deployed Resources:  ${deployedResources.length}
Active Alerts:       ${activeAlerts.length}
Emergency SOS:       ${this.emergencies.length}

────────────────────────────────────────────────────────
ACTIVE INCIDENTS
────────────────────────────────────────────────────────
${activeIncidents.map(i => `[${i.severity.toUpperCase()}] ${i.id} — ${i.title}
  Location: ${i.location}
  Status:   ${i.status}
  Detected: ${i.detectedAt}
  Resources: ${i.assignedResources.join(', ') || 'None assigned'}
`).join('\n')}

────────────────────────────────────────────────────────
DEPLOYED RESOURCES
────────────────────────────────────────────────────────
${deployedResources.map(r => `${r.id} (${r.type}) — ${r.label}
  Zone: ${r.zone} | Status: ${r.status} | Incident: ${r.assignedIncident || 'N/A'}
`).join('\n')}

────────────────────────────────────────────────────────
ACTIVE ALERTS
────────────────────────────────────────────────────────
${activeAlerts.map(a => `[${a.severity}] ${a.message} — ${a.timestamp}`).join('\n')}

════════════════════════════════════════════════════════
END OF REPORT — Darshan ICCC
════════════════════════════════════════════════════════
`.trim();
  }

  // ---- Computed Helpers ----

  getActiveIncidentCount(): number {
    return this.incidents.filter(i => i.status !== 'Resolved').length;
  }

  getCriticalCount(): number {
    return this.incidents.filter(i => i.severity === 'Critical' && i.status !== 'Resolved').length;
  }

  getAvailableResourcesByType(type: ResourceType): DemoResource[] {
    return this.resources.filter(r => r.type === type && r.status === 'Available');
  }

  getResourcesByTemple(templeId: TempleId): DemoResource[] {
    return this.resources.filter(r => r.templeId === templeId);
  }

  getActiveAlertCount(): number {
    return this.alerts.filter(a => !a.dismissed).length;
  }
}

export const DemoStore = new DemoStateImpl();
