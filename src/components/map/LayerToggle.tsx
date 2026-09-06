import { cn } from '@/lib/utils';

export interface LayerState {
  heatmap: boolean;
  guards: boolean;
  cameras: boolean;
  incidents: boolean;
  zones: boolean;
  labels: boolean;
  fov: boolean;
}

interface LayerToggleProps {
  layers: LayerState;
  counts: Partial<Record<keyof LayerState, number>>;
  onToggle: (layer: keyof LayerState) => void;
}

const LAYER_DEFS: { key: keyof LayerState; label: string; icon: string; activeColor: string }[] = [
  { key: 'heatmap',   label: 'Heatmap',   icon: '🌡', activeColor: 'bg-red-500/20 border-red-500/50 text-red-300' },
  { key: 'guards',    label: 'Personnel', icon: '👮', activeColor: 'bg-blue-500/20 border-blue-500/50 text-blue-300' },
  { key: 'cameras',   label: 'CCTV',      icon: '📷', activeColor: 'bg-purple-500/20 border-purple-500/50 text-purple-300' },
  { key: 'incidents', label: 'Incidents', icon: '🚨', activeColor: 'bg-rose-500/20 border-rose-500/50 text-rose-300' },
  { key: 'zones',     label: 'Zones',     icon: '🔲', activeColor: 'bg-amber-500/20 border-amber-500/50 text-amber-300' },
  { key: 'fov',       label: 'Cam FOV',   icon: '📡', activeColor: 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300' },
  { key: 'labels',    label: 'Labels',    icon: '🏷', activeColor: 'bg-slate-500/20 border-slate-500/50 text-slate-300' },
];

export default function LayerToggle({ layers, counts, onToggle }: LayerToggleProps) {
  return (
    <div className="bg-[#0E1A2B]/90 border border-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-2 w-[140px]">
      <div className="text-[7px] font-black uppercase tracking-widest text-slate-500 mb-1.5 px-1">Map Layers</div>
      <div className="space-y-0.5">
        {LAYER_DEFS.map(def => {
          const active = layers[def.key];
          const count = counts[def.key];
          return (
            <button
              key={def.key}
              onClick={() => onToggle(def.key)}
              className={cn(
                'w-full flex items-center justify-between px-2 py-1 rounded-lg border transition-all text-left',
                active ? def.activeColor : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10 hover:text-slate-300'
              )}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] opacity-80">{def.icon}</span>
                <span className="text-[8px] font-bold tracking-wide">{def.label}</span>
              </div>
              {count !== undefined && (
                <span className={cn(
                  'text-[7px] font-black px-1.5 py-[1px] rounded-full',
                  active ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-600'
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
