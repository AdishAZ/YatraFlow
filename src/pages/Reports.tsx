import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, FileText, FileSpreadsheet, ChevronDown, ChevronUp, 
  ChevronLeft, ChevronRight, Calendar, FileJson
} from 'lucide-react';
import { REPORT_DATA, TEMPLES, TEMPLE_LIST, type TempleId } from '@/lib/data';
import { formatNumber, cn } from '@/lib/utils';
import StatusBadge from '@/components/ui/StatusBadge';
import { ExportDialog } from '@/components/ui/ExportDialog';
import { showToast } from '@/components/ui/Toast';

export default function Reports() {
  const [selectedTemple, setSelectedTemple] = useState<TempleId | 'all'>('all');
  const [reportType, setReportType] = useState('Daily Operations');
  const [showExport, setShowExport] = useState(false);
  
  type SortField = 'date' | 'temple' | 'visitors' | 'maxQueue' | 'incidents' | 'parkingPeak' | 'revenue';
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const handleCsvExport = (ext = 'csv') => {
    const headers = ['Date', 'Temple', 'Visitors', 'Peak Hour', 'Max Queue', 'Incidents', 'Parking Peak', 'AI Risk', 'Revenue'];
    const rows = REPORT_DATA.map(r => 
      [r.date, r.temple, r.visitors, r.peakHour, r.maxQueue, r.incidents, r.parkingPeak, r.aiRisk, r.revenue].join(',')
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `report.${ext}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported report as ${ext.toUpperCase()}`, 'success');
  };

  const filteredAndSortedData = useMemo(() => {
    let data = REPORT_DATA.filter(
      (row) => selectedTemple === 'all' || row.templeId === selectedTemple
    );
    
    data = [...data].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      } else {
        return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
      }
    });
    
    return data;
  }, [selectedTemple, sortField, sortDir]);

  const totalPages = Math.ceil(filteredAndSortedData.length / rowsPerPage);
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // totals
  const totalVisitors = filteredAndSortedData.reduce((acc, row) => acc + row.visitors, 0);
  const avgMaxQueue = filteredAndSortedData.reduce((acc, row) => acc + row.maxQueue, 0) / (filteredAndSortedData.length || 1);
  const totalIncidents = filteredAndSortedData.reduce((acc, row) => acc + row.incidents, 0);
  const totalRevenue = filteredAndSortedData.reduce((acc, row) => acc + row.revenue, 0);
  const avgParking = filteredAndSortedData.reduce((acc, row) => acc + row.parkingPeak, 0) / (filteredAndSortedData.length || 1);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 text-slate-900"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Operations Reports</h1>
          <p className="text-secondary mt-1 text-sm">Comprehensive data export and analysis</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowExport(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium">
            <FileText className="w-4 h-4" />
            PDF
          </button>
          <button onClick={() => handleCsvExport('csv')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 transition-colors text-sm font-medium">
            <FileSpreadsheet className="w-4 h-4" />
            CSV
          </button>
          <button onClick={() => handleCsvExport('xls')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-colors text-sm font-medium">
            <FileJson className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="card-base p-4 flex flex-col lg:flex-row gap-4 justify-between items-center">
        <div className="flex gap-4 items-center w-full lg:w-auto">
          <div className="relative">
            <select 
              className="appearance-none bg-surface border border-border rounded-lg pl-4 pr-10 py-2 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              value={selectedTemple}
              onChange={(e) => setSelectedTemple(e.target.value as any)}
            >
              <option value="all">All Temples</option>
              {TEMPLE_LIST.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          
          <div className="relative">
            <select 
              className="appearance-none bg-surface border border-border rounded-lg pl-4 pr-10 py-2 text-text focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option>Daily Operations</option>
              <option>Incident Log</option>
              <option>Volunteer Attendance</option>
              <option>Parking Revenue</option>
              <option>Crowd Analysis</option>
            </select>
            <ChevronDown className="w-4 h-4 text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm text-secondary">
          <Calendar className="w-4 h-4" />
          <span>30 Jul 2026 — 01 Aug 2026</span>
        </div>
      </div>
      
      {/* Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface text-secondary text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:text-text" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-1">Date {sortField === 'date' && (sortDir === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />)}</div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-text" onClick={() => handleSort('temple')}>
                  <div className="flex items-center gap-1">Temple {sortField === 'temple' && (sortDir === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />)}</div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-text text-right" onClick={() => handleSort('visitors')}>
                  <div className="flex items-center justify-end gap-1">Visitors {sortField === 'visitors' && (sortDir === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />)}</div>
                </th>
                <th className="px-6 py-4 text-center">Peak Hour</th>
                <th className="px-6 py-4 cursor-pointer hover:text-text text-right" onClick={() => handleSort('maxQueue')}>
                  <div className="flex items-center justify-end gap-1">Max Queue (min) {sortField === 'maxQueue' && (sortDir === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />)}</div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-text text-center" onClick={() => handleSort('incidents')}>
                  <div className="flex items-center justify-center gap-1">Incidents {sortField === 'incidents' && (sortDir === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />)}</div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:text-text text-right" onClick={() => handleSort('parkingPeak')}>
                  <div className="flex items-center justify-end gap-1">Parking Peak (%) {sortField === 'parkingPeak' && (sortDir === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />)}</div>
                </th>
                <th className="px-6 py-4 text-center">AI Risk</th>
                <th className="px-6 py-4 cursor-pointer hover:text-text text-right" onClick={() => handleSort('revenue')}>
                  <div className="flex items-center justify-end gap-1">Revenue (₹) {sortField === 'revenue' && (sortDir === 'desc' ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />)}</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedData.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-card' : 'bg-surface/30'}>
                  <td className="px-6 py-4 text-secondary">{row.date}</td>
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: TEMPLES[row.templeId]?.color || '#3B82F6' }}></span>
                    {row.temple}
                  </td>
                  <td className="px-6 py-4 text-right font-mono">{formatNumber(row.visitors)}</td>
                  <td className="px-6 py-4 text-center text-secondary">{row.peakHour}</td>
                  <td className="px-6 py-4 text-right font-mono">{row.maxQueue}</td>
                  <td className="px-6 py-4 text-center font-mono">
                    <span className={row.incidents > 0 ? "text-warning" : "text-secondary"}>{row.incidents}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono">{row.parkingPeak}%</td>
                  <td className="px-6 py-4 flex justify-center">
                    <StatusBadge status={row.aiRisk} size="sm" dot />
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-success">
                    ₹{formatNumber(row.revenue)}
                  </td>
                </tr>
              ))}
              
              {/* Summary Row */}
              <tr className="bg-surface font-semibold border-t-2 border-border">
                <td className="px-6 py-4" colSpan={2}>Average / Total</td>
                <td className="px-6 py-4 text-right font-mono">{formatNumber(totalVisitors)}</td>
                <td className="px-6 py-4 text-center text-secondary">-</td>
                <td className="px-6 py-4 text-right font-mono">{Math.round(avgMaxQueue)}</td>
                <td className="px-6 py-4 text-center font-mono">{totalIncidents}</td>
                <td className="px-6 py-4 text-right font-mono">{Math.round(avgParking)}%</td>
                <td className="px-6 py-4 text-center">-</td>
                <td className="px-6 py-4 text-right font-mono text-success">
                  ₹{formatNumber(totalRevenue)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <span className="text-sm text-secondary">
            Showing {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} records
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-surface border border-border text-secondary hover:text-text transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 rounded bg-surface border border-border text-secondary hover:text-text transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <ExportDialog isOpen={showExport} onClose={() => setShowExport(false)} />
    </motion.div>
  );
}
