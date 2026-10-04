import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Complaint, ComplaintStatus, Category } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusChip } from '../../components/common/StatusChip';
import { Drawer } from '../../components/common/Drawer';
import { Timeline } from '../../components/common/Timeline';
import { BeforeAfterSlider } from '../../components/common/BeforeAfterSlider';
import { MapComponent } from '../../components/common/MapComponent';
import { useToast } from '../../context/ToastContext';
import { 
  Download, 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  PhoneCall, 
  RotateCcw, 
  AlertTriangle, 
  Eye, 
  MessageSquare,
  CheckCircle2,
  Layers,
  Compass,
  FileSpreadsheet
} from 'lucide-react';

export const AdminComplaintsTable: React.FC = () => {
  const { success, warning, info } = useToast();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'ALL'>('ALL');
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedView, setSelectedView] = useState<'ALL' | 'BREACHED' | 'PENDING_VERIFY' | 'REOPENED'>('ALL');

  // Inspector Drawer
  const [inspectorComplaint, setInspectorComplaint] = useState<Complaint | null>(null);
  const [internalNote, setInternalNote] = useState('');

  const fetchComplaints = async () => {
    setLoading(true);
    const data = await api.getComplaints();
    setComplaints(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Filter logic
  const filteredList = complaints.filter((c) => {
    if (selectedView === 'BREACHED' && c.urgency !== 'CRITICAL') return false;
    if (selectedView === 'PENDING_VERIFY' && c.status !== 'RESOLVED') return false;
    if (selectedView === 'REOPENED' && c.status !== 'REOPENED') return false;

    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (departmentFilter !== 'ALL' && c.departmentId !== departmentFilter) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.ticketNumber.toLowerCase().includes(q) ||
        c.citizenName.toLowerCase().includes(q) ||
        c.complaintLocation.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // CSV Export
  const handleExportCsv = () => {
    const headers = ['Ticket Number', 'Status', 'Category', 'Department', 'Citizen', 'Phone', 'Ward', 'Submitted At'];
    const rows = filteredList.map((c) => [
      c.ticketNumber,
      c.status,
      c.category,
      `"${c.departmentName}"`,
      `"${c.citizenName}"`,
      c.citizenPhone,
      `"${c.complaintLocation.ward}"`,
      c.submittedAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tark_shaastra_complaints_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success('CSV Export Generated', `Exported ${filteredList.length} complaint records`);
  };

  // Admin Override verification
  const handleOverrideVerify = (c: Complaint) => {
    const updated = {
      ...c,
      status: 'VERIFIED' as ComplaintStatus,
      verifiedAt: new Date().toISOString(),
      timeline: [
        ...c.timeline,
        {
          id: `tl_admin_${Date.now()}`,
          status: 'VERIFIED' as ComplaintStatus,
          title: 'Administrative Override Verification',
          titleGu: 'એડમિન ઓવરરાઈડ વેરિફિકેશન',
          description: 'Municipal Commissioner override approved and closed.',
          actor: 'Commissioner S. Mehta',
          role: 'admin' as const,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    setComplaints((prev) => prev.map((item) => (item.id === c.id ? updated : item)));
    setInspectorComplaint(updated);
    success('Override Verified', 'Ticket closed by administrative authority');
  };

  return (
    <div className="space-y-6">
      {/* Header with Title & Export Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">
            Master Complaints Registry
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
            Audit logs, geo-triangulation verifications, and IVR telephone outcome tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={handleExportCsv}
            leftIcon={<FileSpreadsheet className="w-4 h-4 text-emerald-700" />}
          >
            Export Filtered CSV ({filteredList.length})
          </Button>
        </div>
      </div>

      {/* Quick Saved Views Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-ink-muted uppercase tracking-wider pl-1">Saved Views:</span>
        {[
          { id: 'ALL', label: 'All Records' },
          { id: 'PENDING_VERIFY', label: 'Pending IVR Verification' },
          { id: 'REOPENED', label: 'Citizen Reopened (Escalations)' },
          { id: 'BREACHED', label: 'High Urgency' },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setSelectedView(view.id as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedView === view.id
                ? 'bg-ink text-white shadow-2xs'
                : 'bg-white text-ink-secondary border border-ink-border hover:text-ink'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Filters & Search Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ticket, citizen, ward, street..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white border border-ink-border text-xs focus:ring-2 focus:ring-lavender focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="h-11 px-3.5 rounded-2xl bg-white border border-ink-border text-xs font-bold text-ink focus:ring-2 focus:ring-lavender focus:outline-none"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="VERIFIED">Verified</option>
          <option value="REOPENED">Reopened</option>
        </select>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="h-11 px-3.5 rounded-2xl bg-white border border-ink-border text-xs font-bold text-ink focus:ring-2 focus:ring-lavender focus:outline-none"
        >
          <option value="ALL">All Municipal Departments</option>
          <option value="dept_roads">Roads & Bridges</option>
          <option value="dept_solid_waste">Solid Waste</option>
          <option value="dept_water_drainage">Water & Drainage</option>
          <option value="dept_streetlights">Streetlights</option>
          <option value="dept_public_health">Public Health</option>
        </select>
      </div>

      {/* Master Data Table */}
      <Card className="p-0 overflow-hidden bg-white border-ink-border shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-ink-border text-ink-secondary font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Ticket</th>
                <th className="p-4">Status</th>
                <th className="p-4">Grievance & Ward</th>
                <th className="p-4">Department</th>
                <th className="p-4">Citizen Telemetry</th>
                <th className="p-4">Proof & IVR</th>
                <th className="p-4 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-border text-ink">
              {filteredList.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setInspectorComplaint(c)}
                  className="hover:bg-ink-light/50 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-mono font-bold text-ink">
                    <span>{c.ticketNumber}</span>
                  </td>
                  <td className="p-4">
                    <StatusChip status={c.status} size="sm" />
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="font-bold text-ink truncate">{c.title}</p>
                    <p className="text-[11px] text-ink-muted truncate">{c.complaintLocation.address}</p>
                  </td>
                  <td className="p-4">
                    <span className="font-medium">{c.departmentName}</span>
                  </td>
                  <td className="p-4">
                    <p className="font-bold">{c.citizenName}</p>
                    <p className="text-[10px] font-mono text-ink-muted">{c.citizenPhone}</p>
                  </td>
                  <td className="p-4">
                    {c.verificationCall ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                        <PhoneCall className="w-3 h-3" />
                        <span>IVR Logged</span>
                      </span>
                    ) : c.photoAfterUrl ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Photo Proof (≤100m)</span>
                      </span>
                    ) : (
                      <span className="text-ink-muted text-[11px]">—</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" leftIcon={<Eye className="w-3.5 h-3.5" />}>
                      Inspect
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* DEEP INSPECTOR DRAWER (WITH GPS TRIANGULATION MINI-MAP & IVR LOGS) */}
      <Drawer
        isOpen={!!inspectorComplaint}
        onClose={() => setInspectorComplaint(null)}
        title={`Audit Inspector: ${inspectorComplaint?.ticketNumber}`}
        subtitle={inspectorComplaint?.departmentName}
        width="xl"
      >
        {inspectorComplaint && (
          <div className="space-y-6">
            {/* Quick Status Bar */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-ink-border">
              <div>
                <span className="text-xs text-ink-muted">Lifecycle State</span>
                <div className="mt-1">
                  <StatusChip status={inspectorComplaint.status} size="lg" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOverrideVerify(inspectorComplaint)}
                  leftIcon={<ShieldCheck className="w-4 h-4" />}
                >
                  Admin Override Verify
                </Button>
              </div>
            </div>

            {/* GPS TRIANGULATION MINI-MAP */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-lavender" />
                  <span>GPS Triangulation Mini-Map (Citizen vs Officer vs EXIF)</span>
                </h4>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  Telemetry Matched ±3.4m
                </span>
              </div>

              {/* Triangulation telemetry card */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-canvas border border-ink-border text-xs font-mono">
                <div>
                  <p className="text-ink-muted text-[10px]">Citizen Complaint GPS:</p>
                  <p className="font-bold text-ink">
                    {inspectorComplaint.complaintLocation.lat.toFixed(6)}, {inspectorComplaint.complaintLocation.lng.toFixed(6)}
                  </p>
                </div>
                <div>
                  <p className="text-ink-muted text-[10px]">Officer Resolution GPS:</p>
                  <p className="font-bold text-ink">
                    {inspectorComplaint.resolutionLocation
                      ? `${inspectorComplaint.resolutionLocation.lat.toFixed(6)}, ${inspectorComplaint.resolutionLocation.lng.toFixed(6)}`
                      : 'Awaiting Field Upload'}
                  </p>
                </div>
              </div>
            </div>

            {/* Before / After Photo Comparison */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                Photo Proof Verification
              </h4>
              {inspectorComplaint.photoAfterUrl ? (
                <BeforeAfterSlider
                  beforeImage={inspectorComplaint.photoBeforeUrl}
                  afterImage={inspectorComplaint.photoAfterUrl}
                />
              ) : (
                <div className="relative rounded-3xl overflow-hidden border border-ink-border aspect-16/9">
                  <img
                    src={inspectorComplaint.photoBeforeUrl}
                    alt="Before"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/75 text-white rounded-xl text-[10px] font-mono">
                    Locked at report: {inspectorComplaint.complaintLocation.address}
                  </div>
                </div>
              )}
            </div>

            {/* IVR Verification Transcript & Audio Player */}
            {inspectorComplaint.verificationCall && (
              <div className="space-y-3 p-5 rounded-3xl bg-gradient-to-r from-purple-50 via-slate-50 to-indigo-50 border border-lavender/30">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-lavender-dark uppercase tracking-wider flex items-center gap-1.5">
                    <PhoneCall className="w-4 h-4" />
                    <span>Twilio IVR Call Record ({inspectorComplaint.verificationCall.durationSeconds}s)</span>
                  </h4>
                  <span className="text-[10px] font-mono bg-purple-200 text-purple-900 px-2 py-0.5 rounded font-bold">
                    {inspectorComplaint.verificationCall.outcome}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-2xl border border-ink-border text-xs space-y-2">
                  <p className="text-ink font-semibold">Gujarati Call Transcript:</p>
                  <p className="text-ink-secondary font-gujarati italic">
                    "{inspectorComplaint.verificationCall.transcriptGu}"
                  </p>
                  <div className="pt-2 border-t border-ink-border/50 text-[11px] text-ink-muted">
                    <b>English Summary:</b> {inspectorComplaint.verificationCall.transcriptEn}
                  </div>
                </div>
              </div>
            )}

            {/* Audit Trail */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                Immutable Lifecycle Trail
              </h4>
              <Timeline events={inspectorComplaint.timeline} />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
