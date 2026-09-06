import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

let toastId = 0;
const toastListeners = new Set<(toast: ToastItem) => void>();

export function showToast(message: string, type: 'success' | 'warning' | 'error' | 'info' = 'success') {
  const toast: ToastItem = { id: ++toastId, message, type };
  toastListeners.forEach(fn => fn(toast));
}

const icons = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: X,
  info: Info,
};

const colors = {
  success: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400',
  warning: 'border-orange-500/50 bg-orange-500/10 text-orange-400',
  error: 'border-red-500/50 bg-red-500/10 text-red-400',
  info: 'border-blue-500/50 bg-blue-500/10 text-blue-400',
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handler = (toast: ToastItem) => {
      setToasts(prev => [...prev, toast]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 4000);
    };
    toastListeners.add(handler);
    return () => { toastListeners.delete(handler); };
  }, []);

  return createPortal(
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl font-mono text-[12px] tracking-wider uppercase ${colors[toast.type]}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="text-white">{toast.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body
  );
}
