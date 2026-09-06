import L from 'leaflet';

interface Guard {
  id: string;
  resourceId: string;
  name: string;
  type: 'Police' | 'Medical' | 'Volunteer' | 'Fire' | 'SDRF';
  x: number;
  y: number;
  status: 'Available' | 'Deployed' | 'En Route' | 'Offline';
  assignedIncident: string | null;
  zone: string;
  radio: string;
  heading: number;
}

const TYPE_CONFIG: Record<string, { bg: string; border: string; emoji: string; abbr: string }> = {
  Police:    { bg: '#1E3A5F', border: '#3B82F6', emoji: '👮', abbr: 'POL' },
  Medical:   { bg: '#7F1D1D', border: '#EF4444', emoji: '🚑', abbr: 'MED' },
  Volunteer: { bg: '#78350F', border: '#F59E0B', emoji: '🦺', abbr: 'VOL' },
  Fire:      { bg: '#7C2D12', border: '#F97316', emoji: '🚒', abbr: 'FIRE' },
  SDRF:      { bg: '#14532D', border: '#22C55E', emoji: '🪖', abbr: 'SDRF' },
};

const STATUS_RING: Record<string, string> = {
  Available: '#22C55E',
  Deployed:  '#F59E0B',
  'En Route': '#3B82F6',
  Offline:   '#6B7280',
};

export function createGuardIcon(guard: Guard, isSelected: boolean): L.DivIcon {
  const cfg = TYPE_CONFIG[guard.type] || TYPE_CONFIG.Police;
  const ring = STATUS_RING[guard.status] || '#6B7280';
  const pulsing = guard.status === 'Deployed' || guard.status === 'En Route';
  const scale = isSelected ? '1.35' : '1';
  const shadow = isSelected ? `0 0 0 3px ${cfg.border}44, 0 4px 20px rgba(0,0,0,0.5)` : '0 2px 10px rgba(0,0,0,0.4)';

  const html = `
    <div style="position:relative; width:32px; height:32px; transform:scale(${scale}); transition:transform 0.2s;">
      ${pulsing ? `<div style="position:absolute;inset:-6px;border-radius:50%;border:2px solid ${ring};opacity:0.5;animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite;"></div>` : ''}
      <div style="
        width:32px; height:32px; border-radius:50%;
        background:${cfg.bg};
        border:2.5px solid ${ring};
        box-shadow:${shadow};
        display:flex; align-items:center; justify-content:center;
        font-size:14px; position:relative; z-index:2;
        cursor:pointer;
      ">
        ${cfg.emoji}
      </div>
      <div style="
        position:absolute; bottom:-14px; left:50%; transform:translateX(-50%);
        background:${cfg.bg}; border:1px solid ${ring}55;
        color:white; font-size:7px; font-weight:900;
        padding:1px 4px; border-radius:3px; white-space:nowrap;
        letter-spacing:0.05em; text-transform:uppercase;
      ">${guard.name.split(' ').slice(-1)[0]}</div>
    </div>
  `;

  return L.divIcon({
    html,
    className: '',
    iconSize: [32, 46],
    iconAnchor: [16, 23],
  });
}

export type { Guard };
