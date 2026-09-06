import { type ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  position?: 'right' | 'left';
}

export default function Drawer({ isOpen, onClose, title, children, className, position = 'right' }: DrawerProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const slideIn = {
    initial: { x: position === 'right' ? '100%' : '-100%' },
    animate: { x: 0 },
    exit: { x: position === 'right' ? '100%' : '-100%' }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            {...slideIn}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              "fixed top-0 bottom-0 z-50 w-full md:w-[500px] bg-background border-border flex flex-col shadow-2xl shadow-black",
              position === 'right' ? 'right-0 border-l' : 'left-0 border-r',
              className
            )}
          >
            {title && (
              <div className="flex items-center justify-between p-4 border-b border-border bg-surface/50">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg text-secondary hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export { Drawer };
