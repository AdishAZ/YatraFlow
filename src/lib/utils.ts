import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000) {
    return n.toLocaleString('en-IN');
  }
  return n.toString();
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

// Bharat Design System — Status Colors
export function getStatusColor(status?: string): string {
  if (!status) return 'text-secondary';
  switch (status.toLowerCase()) {
    case 'low':
    case 'active':
    case 'online':
    case 'resolved':
    case 'available':
      return 'text-bharat-500';
    case 'medium':
    case 'moderate':
    case 'break':
    case 'assigned':
      return 'text-saffron-500';
    case 'high':
    case 'critical':
    case 'offline':
    case 'reported':
    case 'overflow':
      return 'text-critical';
    default:
      return 'text-secondary';
  }
}

export function getStatusBg(status?: string): string {
  if (!status) return 'bg-secondary/10 text-secondary border-secondary/20';
  switch (status.toLowerCase()) {
    case 'low':
    case 'active':
    case 'online':
    case 'resolved':
      return 'bg-bharat-500/10 text-bharat-500 border-bharat-500/20';
    case 'medium':
    case 'moderate':
    case 'break':
    case 'assigned':
      return 'bg-saffron-500/10 text-saffron-500 border-saffron-500/20';
    case 'high':
    case 'critical':
    case 'offline':
    case 'overflow':
      return 'bg-critical/10 text-critical border-critical/20';
    case 'info':
    case 'in progress':
      return 'bg-info/10 text-info border-info/20';
    default:
      return 'bg-secondary/10 text-secondary border-secondary/20';
  }
}

export function getRiskColor(risk?: string): string {
  if (!risk) return '#94A3B8';
  switch (risk.toLowerCase()) {
    case 'low': return '#16A34A';
    case 'medium': case 'moderate': return '#F97316';
    case 'high': return '#EF4444';
    case 'critical': return '#DC2626';
    default: return '#94A3B8';
  }
}
