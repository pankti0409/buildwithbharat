import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { Complaint, ComplaintStatus } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusChip } from '../../components/common/StatusChip';
import { Timeline } from '../../components/common/Timeline';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import { BeforeAfterSlider } from '../../components/common/BeforeAfterSlider';
import { Skeleton } from '../../components/common/Skeleton';
import { EmptyState } from '../../components/common/EmptyState';
import { 
  FileText, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  PhoneCall, 
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const CitizenMyComplaints: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useTranslation();
  const { success, error } = useToast();
  const location = useLocation();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'ACTIVE' | 'RESOLVED'>('ALL');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Reopen Modal
  const [reopenModalOpen, setReopenModalOpen] = useState(false);
  const [reopenReason, setReopenReason] = useState('');
  const [isReopening, setIsReopening] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      const list = await api.getComplaints();
      setComplaints(list);

      // Check if URL has ?id=xxx
      const params = new URLSearchParams(location.search);
      const queryId = params.get('id');
      if (queryId) {
        const found = list.find((c) => c.id === queryId);
        if (found) setSelectedComplaint(found);
      }
      setLoading(false);
    };
    fetchComplaints();
  }, [location.search]);

  const filteredList = complaints.filter((c) => {
    if (activeFilter === 'ACTIVE') return c.status === 'PENDING' || c.status === 'IN_PROGRESS' || c.status === 'REOPENED';
    if (activeFilter === 'RESOLVED') return c.status === 'RESOLVED' || c.status === 'VERIFIED';
    return true;
  });

  const handleReopenSubmit = async () => {
    if (!selectedComplaint) return;
    if (!reopenReason.trim()) {
      error('Reason required', 'Please provide a brief reason why the issue is still unresolved');
      return;
    }

    setIsReopening(true);
    try {
      const updated = await api.reopenComplaint(selectedComplaint.id, reopenReason);
      setComplaints((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setSelectedComplaint(updated);
      setIsReopening(false);
      setReopenModalOpen(false);
      setReopenReason('');
      success('Complaint Reopened', 'Escalated to Ward Superintendent for re-inspection');
    } catch {
      setIsReopening(false);
      error('Failed to reopen complaint', 'Please try again');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">My Grievance Reports</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track status, inspect before/after proofs, and verify resolutions
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          {(['ALL', 'ACTIVE', 'RESOLVED'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                activeFilter === filter
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List */}
      {loading ? (
        <div className="space-y-3">
          <Skeleton height={100} />
          <Skeleton height={100} />
          <Skeleton height={100} />
        </div>
      ) : filteredList.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Grievances Found"
          description="You haven't reported any civic complaints under this filter yet."
        />
      ) : (
        <div className="space-y-3">
          {filteredList.map((c) => (
            <Card
              key={c.id}
              hover
              onClick={() => setSelectedComplaint(c)}
              className="cursor-pointer bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={c.photoBeforeUrl}
                  alt={c.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700 shadow-2xs"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusChip status={c.status} size="sm" />
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{c.ticketNumber}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">• {c.departmentName}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                    {language === 'gu' ? c.titleGu : c.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{c.complaintLocation.address}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100 dark:border-slate-800">
                {c.status === 'RESOLVED' && (
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Proof Ready</span>
                  </span>
                )}
                <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                  Track
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Complaint Inspector Drawer */}
      <Drawer
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        title={selectedComplaint?.ticketNumber || 'Grievance Details'}
        subtitle={selectedComplaint?.departmentName}
        width="lg"
      >
        {selectedComplaint && (
          <div className="space-y-6">
            {/* Status & Category */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-ink-border shadow-xs">
              <div>
                <p className="text-xs text-ink-muted">Current Lifecycle Status</p>
                <div className="mt-1">
                  <StatusChip status={selectedComplaint.status} size="lg" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-muted">Department</p>
                <p className="text-xs font-bold text-ink mt-1">{selectedComplaint.departmentName}</p>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-ink">
                {language === 'gu' ? selectedComplaint.titleGu : selectedComplaint.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                {language === 'gu' ? selectedComplaint.descriptionGu : selectedComplaint.description}
              </p>
              <p className="text-xs text-ink-muted font-mono flex items-center gap-1.5 pt-1">
                <MapPin className="w-3.5 h-3.5 text-lavender" />
                <span>{selectedComplaint.complaintLocation.address}</span>
              </p>
            </div>

            {/* Before / After Slider Comparison (If resolved photo is available) */}
            {selectedComplaint.photoAfterUrl ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                    Interactive Proof Comparison
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    Geo-fence: {selectedComplaint.geoFenceDistanceMeters}m (Pass)
                  </span>
                </div>
                <BeforeAfterSlider
                  beforeImage={selectedComplaint.photoBeforeUrl}
                  afterImage={selectedComplaint.photoAfterUrl}
                />
                {selectedComplaint.resolutionRemarks && (
                  <div className="p-3 rounded-2xl bg-white border border-ink-border text-xs text-ink-secondary">
                    <b className="text-ink">Officer Resolution Note:</b> {selectedComplaint.resolutionRemarks}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                  Initial Evidence Photo
                </h4>
                <div className="relative rounded-3xl overflow-hidden border border-ink-border aspect-16/9">
                  <img
                    src={selectedComplaint.photoBeforeUrl}
                    alt={selectedComplaint.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/75 text-white rounded text-[10px] font-mono">
                    Locked at report time ±{selectedComplaint.complaintLocation.accuracyMeters}m
                  </div>
                </div>
              </div>
            )}

            {/* Reopen Action Button (If citizen feels issue isn't resolved) */}
            {(selectedComplaint.status === 'RESOLVED' || selectedComplaint.status === 'VERIFIED') && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-rose-950">Dissatisfied with the resolution?</h4>
                    <p className="text-[11px] text-rose-800">You can reopen this complaint for mandatory re-inspection.</p>
                  </div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => setReopenModalOpen(true)}
                    leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                  >
                    Reopen Issue
                  </Button>
                </div>
              </div>
            )}

            {/* Audit Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
                Full Grievance Audit Trail
              </h4>
              <Timeline events={selectedComplaint.timeline} />
            </div>
          </div>
        )}
      </Drawer>

      {/* Reopen Modal */}
      <Modal
        isOpen={reopenModalOpen}
        onClose={() => setReopenModalOpen(false)}
        title="Reopen Grievance Ticket"
        subtitle="Escalate back to the department work queue"
      >
        <div className="space-y-4">
          <p className="text-xs text-ink-secondary">
            Please explain what was missed during the initial repair. This feedback will be attached directly to the officer's performance record.
          </p>

          <div>
            <label className="text-xs font-bold text-ink">Reason for Reopening</label>
            <textarea
              rows={3}
              placeholder="e.g. Only 2 of the 8 streetlights were fixed, the remaining are still dark."
              value={reopenReason}
              onChange={(e) => setReopenReason(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-ink-border text-xs focus:ring-2 focus:ring-rose focus:outline-none"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2 border-t border-ink-border">
            <Button variant="outline" size="md" onClick={() => setReopenModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="md"
              isLoading={isReopening}
              onClick={handleReopenSubmit}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Confirm Reopen Ticket
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
