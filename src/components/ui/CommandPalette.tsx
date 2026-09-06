import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Activity, Users, Settings, Building2, Calendar, Map, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COMMANDS = [
  { id: 'c1', label: 'Go to Dashboard', icon: Activity, path: '/' },
  { id: 'c2', label: 'Go to Temple Operations', icon: Building2, path: '/temple-operations' },
  { id: 'c3', label: 'Go to Pilgrim Management', icon: Users, path: '/pilgrims' },
  { id: 'c4', label: 'Go to Bookings', icon: Calendar, path: '/bookings' },
  { id: 'c5', label: 'Go to Crowd Monitoring', icon: Activity, path: '/crowd' },
  { id: 'c6', label: 'Go to GIS Map', icon: Map, path: '/map' },
  { id: 'c7', label: 'Go to Incidents', icon: AlertTriangle, path: '/incidents' },
  { id: 'c8', label: 'Go to Reports', icon: FileText, path: '/reports' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleExecute = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setQuery('');
  };

  useEffect(() => {
    const handleNavigation = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter' && filteredCommands[activeIndex]) {
        e.preventDefault();
        handleExecute(filteredCommands[activeIndex].path);
      }
    };
    document.addEventListener('keydown', handleNavigation);
    return () => document.removeEventListener('keydown', handleNavigation);
  }, [isOpen, activeIndex, filteredCommands]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-border">
              <Search className="w-5 h-5 text-secondary mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search... (Ctrl+K)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-secondary/70 text-base"
              />
              <div className="flex items-center gap-1 text-[10px] font-mono text-secondary bg-background px-1.5 py-0.5 rounded border border-border">
                ESC
              </div>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto py-2">
              {filteredCommands.length === 0 ? (
                <div className="px-4 py-8 text-center text-secondary text-sm">
                  No commands found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <button
                    key={cmd.id}
                    onClick={() => handleExecute(cmd.path)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full flex items-center px-4 py-2.5 text-sm transition-colors ${
                      activeIndex === idx ? 'bg-primary/20 text-white' : 'text-secondary hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <cmd.icon className={`w-4 h-4 mr-3 ${activeIndex === idx ? 'text-primary' : 'text-secondary'}`} />
                    {cmd.label}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export { CommandPalette };
