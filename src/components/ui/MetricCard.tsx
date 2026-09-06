import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  suffix?: string;
  color?: string;
  live?: boolean;
  variant?: 'primary' | 'secondary';
  children?: ReactNode;
  className?: string;
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  suffix,
  color = 'text-saffron-500',
  live = false,
  variant = 'secondary',
  children,
  className,
}: MetricCardProps) {
  const displayValue = typeof value === 'number' ? formatNumber(value) : value;

  const isPrimary = variant === 'primary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className={cn(
        'card-base flex flex-col justify-between bg-white overflow-hidden',
        isPrimary ? 'p-6 shadow-card-md hover:shadow-card-lg min-h-[140px]' : 'p-4 shadow-sm min-h-[100px]',
        className
      )}
    >
      <div className={cn("flex items-start justify-between min-w-0", isPrimary ? "mb-6" : "mb-3 gap-1")}>
        <div className="flex items-center gap-3 min-w-0">
          <div className={cn(
            'rounded-full flex items-center justify-center shadow-sm shrink-0', 
            color.replace('text-', 'bg-') + '/10',
            isPrimary ? 'w-10 h-10' : 'w-7 h-7 rounded-lg'
          )}>
            <Icon className={cn(color, isPrimary ? 'w-5 h-5' : 'w-3.5 h-3.5')} />
          </div>
          <div className={cn(
            "font-bold text-slate-500 uppercase tracking-widest leading-tight min-w-0",
            isPrimary ? "text-xs" : "text-[10px]"
          )}>
            {title}
          </div>
        </div>
        
        {live && (
          <span className={cn(
            "flex items-center font-bold text-green-600 uppercase tracking-wider bg-green-50 rounded-full border border-green-100 shrink-0 ml-1",
            isPrimary ? "gap-1.5 text-[10px] px-2.5 py-1" : "gap-1 text-[9px] px-1.5 py-0.5"
          )}>
            <span className="live-dot shrink-0" />
            Live
          </span>
        )}
      </div>

      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-auto min-w-0">
        <div className={cn(
          "font-black text-[#0E1A2B] tracking-tighter truncate max-w-full",
          isPrimary ? "text-4xl lg:text-[42px]" : "text-xl lg:text-2xl"
        )}>
          {displayValue}
          {suffix && <span className={cn("font-bold text-slate-400 ml-1 tracking-normal", isPrimary ? "text-sm" : "text-xs")}>{suffix}</span>}
        </div>
        
        {trend && (
          <div className={cn(
            'flex items-center font-bold rounded-full border shrink-0',
            trend.value > 0 ? 'text-green-700 bg-green-50 border-green-200' : 
            trend.value < 0 ? 'text-red-700 bg-red-50 border-red-200' : 
            'text-slate-600 bg-slate-50 border-slate-200',
            isPrimary ? "gap-1 text-xs px-2 py-1 mt-1" : "gap-0.5 text-[10px] px-1.5 py-0.5 rounded-md"
          )}>
            {trend.value > 0 ? <TrendingUp className={isPrimary ? "w-3 h-3" : "w-2.5 h-2.5"} /> : trend.value < 0 ? <TrendingDown className={isPrimary ? "w-3 h-3" : "w-2.5 h-2.5"} /> : <Minus className={isPrimary ? "w-3 h-3" : "w-2.5 h-2.5"} />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      {children}
    </motion.div>
  );
}

export { MetricCard };
