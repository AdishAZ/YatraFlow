import { useState, useEffect } from 'react';
import { DemoStore } from '../lib/demoState';
import type { DemoSnapshot } from '../lib/demoState';

export function useDemoState(): DemoSnapshot & { actions: typeof DemoStore } {
  const [state, setState] = useState<DemoSnapshot>(DemoStore.getState());

  useEffect(() => {
    return DemoStore.subscribe(() => setState(DemoStore.getState()));
  }, []);

  return { ...state, actions: DemoStore };
}
