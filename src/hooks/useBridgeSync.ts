/**
 * useBridgeSync
 * ==============
 * Polls the YatraFlow Bridge Server (localhost:8000) at a configurable
 * interval and returns the latest data. Handles errors gracefully so the
 * web app still works even if the bridge server is not running.
 */
import { useState, useEffect, useCallback } from 'react';

export interface MobileBooking {
  id: string;
  templeId: string;
  time: string;
  devoteeCount: number;
  passHolderName: string;
  bookingRef: string;
  timestamp: string;
  source: 'mobile';
}

export interface MobileIncident {
  id: string;
  templeId: string;
  title: string;
  description: string;
  severity: string;
  location: string;
  reportedBy: string;
  status: string;
  timestamp: string;
  time: string;
  source: 'mobile' | 'mobile-sos';
}

export interface BridgeBookingSlot {
  id: string;
  templeId: 'somnath' | 'dwarka' | 'ambaji' | 'pavagadh';
  type: string;
  time: string;
  capacity: number;
  booked: number;
  mobileCount: number;
  aiRecommendation?: string;
}

export interface BridgeState {
  connected: boolean;
  mobileBookings: MobileBooking[];
  slots: BridgeBookingSlot[];
  mobileIncidents: MobileIncident[];
  totalMobileBookings: number;
  lastSynced: Date | null;
}

// Use the live localtunnel URL for syncing with deployed Vercel frontend
const BRIDGE_URL = 'https://yatraflow-bridge-server-2026.loca.lt';
const DEFAULT_STATE: BridgeState = {
  connected: false,
  mobileBookings: [],
  slots: [],
  mobileIncidents: [],
  totalMobileBookings: 0,
  lastSynced: null,
};

export function useBridgeSync(intervalMs = 5000): BridgeState {
  const [state, setState] = useState<BridgeState>(DEFAULT_STATE);

  const fetchAll = useCallback(async () => {
    try {
      const [bookingsRes, incidentsRes] = await Promise.all([
        fetch(`${BRIDGE_URL}/api/bookings`, { headers: { 'Bypass-Tunnel-Reminder': 'true' } }).catch(() => null),
        fetch(`${BRIDGE_URL}/api/incidents`, { headers: { 'Bypass-Tunnel-Reminder': 'true' } }).catch(() => null),
      ]);

      if (!bookingsRes?.ok && !incidentsRes?.ok) {
        setState(prev => ({ ...prev, connected: false }));
        return;
      }

      const bookingsData = bookingsRes?.ok ? await bookingsRes.json() : null;
      const incidentsData = incidentsRes?.ok ? await incidentsRes.json() : null;

      setState({
        connected: true,
        mobileBookings: bookingsData?.mobileBookings ?? [],
        slots: bookingsData?.slots ?? [],
        totalMobileBookings: bookingsData?.totalMobileBookings ?? 0,
        mobileIncidents: incidentsData?.incidents ?? [],
        lastSynced: new Date(),
      });
    } catch {
      setState(prev => ({ ...prev, connected: false }));
    }
  }, []);

  useEffect(() => {
    fetchAll(); // Initial fetch immediately
    const timer = setInterval(fetchAll, intervalMs);
    return () => clearInterval(timer);
  }, [fetchAll, intervalMs]);

  return state;
}
