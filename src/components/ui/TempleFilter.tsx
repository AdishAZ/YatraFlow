import type { TempleId } from '@/lib/data';
import { TEMPLE_LIST } from '@/lib/data';
import { cn } from '@/lib/utils';

interface TempleFilterProps {
  selected: TempleId | 'all';
  onChange: (id: TempleId | 'all') => void;
}

export default function TempleFilter({ selected, onChange }: TempleFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange('all')}
        className={cn(
          'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all border',
          selected === 'all'
            ? 'bg-primary/10 text-primary border-primary/30'
            : 'bg-card text-secondary border-border hover:text-white hover:border-primary/20'
        )}
      >
        All Temples
      </button>
      {TEMPLE_LIST.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all border flex items-center gap-1.5',
            selected === t.id
              ? 'border-opacity-30 bg-opacity-10'
              : 'bg-card text-secondary border-border hover:text-white hover:border-primary/20'
          )}
          style={selected === t.id ? {
            backgroundColor: `${t.color}15`,
            borderColor: `${t.color}50`,
            color: t.color,
          } : undefined}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: t.color }}
          />
          {t.name}
        </button>
      ))}
    </div>
  );
}

export { TempleFilter };
