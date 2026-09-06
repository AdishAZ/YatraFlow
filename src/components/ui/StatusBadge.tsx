import { cn, getStatusBg } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

export default function StatusBadge({ status, size = 'sm', dot = true, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      'status-badge border inline-flex items-center',
      getStatusBg(status),
      size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
      className,
    )}>
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full mr-1.5',
          !status ? 'bg-secondary'
          : status.toLowerCase() === 'low' || status.toLowerCase() === 'active' || status.toLowerCase() === 'online' || status.toLowerCase() === 'resolved' || status.toLowerCase() === 'available'
            ? 'bg-success'
            : status.toLowerCase() === 'medium' || status.toLowerCase() === 'moderate' || status.toLowerCase() === 'break' || status.toLowerCase() === 'assigned' || status.toLowerCase() === 'filling'
            ? 'bg-warning'
            : status.toLowerCase() === 'high' || status.toLowerCase() === 'critical' || status.toLowerCase() === 'offline' || status.toLowerCase() === 'overflow' || status.toLowerCase() === 'near full' || status.toLowerCase() === 'full' || status.toLowerCase() === 'reported' || status.toLowerCase() === 'lag'
            ? 'bg-critical'
            : status.toLowerCase() === 'in progress' || status.toLowerCase() === 'info'
            ? 'bg-info'
            : 'bg-secondary'
        )} />
      )}
      {status}
    </span>
  );
}

export { StatusBadge };
