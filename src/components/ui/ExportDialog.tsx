import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, ChevronRight } from 'lucide-react';
import { DemoStore } from '@/lib/demoState';
import { showToast } from './Toast';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultContext?: string;
}

const EXPORT_OPTIONS = [
  { id: 'daily', label: 'Daily Operations Summary', description: 'Full operational report for the current day' },
  { id: 'incident', label: 'Active Incident Report', description: 'Details of all open incidents and response status' },
  { id: 'camera', label: 'Camera Surveillance Report', description: 'CCTV feed status and zone analytics' },
  { id: 'resource', label: 'Resource Deployment Report', description: 'Current personnel deployment and availability' },
];

const FORMAT_OPTIONS = ['PDF', 'CSV', 'TXT'] as const;

export function ExportDialog({ isOpen, onClose, defaultContext = 'General' }: ExportDialogProps) {
  const [selectedExport, setSelectedExport] = useState('daily');
  const [selectedFormat, setSelectedFormat] = useState<string>('TXT');

  const handleExport = () => {
    const option = EXPORT_OPTIONS.find(o => o.id === selectedExport);
    DemoStore.generateExport(
      `${option?.label || 'Report'} (${selectedFormat})`,
      defaultContext
    );
    showToast(`${option?.label} generated and downloaded`, 'success');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1050]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[1050] flex items-center justify-center p-4"
          >
            <div className="bg-[#0E1A2B] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden text-white">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#152336]">
                <h2 className="text-sm font-mono uppercase tracking-widest font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  Export Operational Report
                </h2>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {/* Report Type */}
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">Report Type</label>
                  <div className="space-y-2">
                    {EXPORT_OPTIONS.map(opt => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedExport(opt.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          selectedExport === opt.id
                            ? 'border-blue-500/50 bg-blue-500/10 ring-1 ring-blue-500/20'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{opt.label}</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">{opt.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format */}
                <div>
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 block">Format</label>
                  <div className="flex gap-2">
                    {FORMAT_OPTIONS.map(fmt => (
                      <button
                        key={fmt}
                        onClick={() => setSelectedFormat(fmt)}
                        className={`px-4 py-2 rounded-lg border font-mono text-[11px] uppercase tracking-widest font-bold transition-all ${
                          selectedFormat === fmt
                            ? 'border-blue-500/50 bg-blue-500/10 text-blue-400'
                            : 'border-white/10 text-slate-500 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-white/10 bg-[#152336] flex gap-3">
                <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-slate-400 font-mono text-[11px] uppercase tracking-widest hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="flex-1 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/50 text-blue-400 font-mono text-[11px] uppercase tracking-widest font-bold hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  Generate Report
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
