import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { api, getDistanceMeters } from '../../services/api';
import { Complaint, ComplaintStatus, GPSLocation } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusChip } from '../../components/common/StatusChip';
import { Drawer } from '../../components/common/Drawer';
import { Modal } from '../../components/common/Modal';
import { GpsCamera } from '../../components/common/GpsCamera';
import { IvrSimulator } from '../../components/common/IvrSimulator';
import { BeforeAfterSlider } from '../../components/common/BeforeAfterSlider';
import { Timeline } from '../../components/common/Timeline';
import { 
  Kanban, 
  Table, 
  Wrench, 
  CheckCircle2, 
  Camera, 
  MapPin, 
  PhoneCall, 
  AlertCircle, 
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Search
} from 'lucide-react';

export const DepartmentQueue: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useTranslation();
  const { success, error, warning } = useToast();
  const location = useLocation();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [viewMode, setViewMode] = useState<'KANBAN' | 'TABLE'>('KANBAN');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  // Proof-of-Resolution Flow States
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedResolutionPhoto, setCapturedResolutionPhoto] = useState<string | null>(null);
  const [capturedResolutionLocation, setCapturedResolutionLocation] = useState<GPSLocation | null>(null);
  const [geoDistance, setGeoDistance] = useState<number | null>(null);
  const [geoPassed, setGeoPassed] = useState<boolean>(true);
  const [remarks, setRemarks] = useState('');
  const [isSubmittingResolution, setIsSubmittingResolution] = useState(false);

  // IVR Verification Simulator Flow
  const [ivrModalOpen, setIvrModalOpen] = useState(false);

  const fetchComplaints = async () => {
    const list = await api.getComplaints();
    setComplaints(list);

    const params = new URLSearchParams(location.search);
    const queryId = params.get('id');
    if (queryId) {
      const found = list.find((c) => c.id === queryId);
      if (found) setSelectedComplaint(found);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [location.search]);

  // Actions
  const handleStartWork = async (c: Complaint) => {
    try {
      const updated = await api.startWork(c.id, user?.id || 'off_roads_01', user?.name || 'Rajesh Solanki');
      setComplaints((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setSelectedComplaint(updated);
      success('Work Commenced', `Status changed to IN_PROGRESS for ${c.ticketNumber}`);
    } catch {
      error('Error', 'Could not update status');
    }
  };

  const handleOpenResolveFlow = (c: Complaint) => {
    setSelectedComplaint(c);
    setCapturedResolutionPhoto(null);
    setCapturedResolutionLocation(null);
    setGeoDistance(null);
    setGeoPassed(true);
    setRemarks('');
    setResolveModalOpen(true);
  };

  const handleResolutionPhotoCaptured = (photo: string, loc: GPSLocation) => {
    setCameraActive(false);
    setCapturedResolutionPhoto(photo);
    setCapturedResolutionLocation(loc);

    if (selectedComplaint) {
      const dist = getDistanceMeters(
        selectedComplaint.complaintLocation.lat,
        selectedComplaint.complaintLocation.lng,
        loc.lat,
        loc.lng
      );
      setGeoDistance(dist);
      setGeoPassed(dist <= 100);
      if (dist > 100) {
        warning('Geo-fence Warning', `Resolution photo is ${dist}m away from complaint location (>100m maximum allowed)`);
      }
    }
  };

  const handleSubmitProofOfResolution = async () => {
    if (!selectedComplaint || !capturedResolutionPhoto || !capturedResolutionLocation) {
      error('Missing Proof', 'Please capture resolution photo using GPS camera');
      return;
    }

    if (!geoPassed) {
      error('Geo-Fence Violation', `Distance is ${geoDistance}m. Must be within ≤100m to prevent fraudulent closures.`);
      return;
    }

    setIsSubmittingResolution(true);
    try {
      const res = await api.resolveComplaint(selectedComplaint.id, {
        officerId: user?.id || 'off_roads_01',
        officerName: user?.name || 'Rajesh Solanki',
        photoAfterUrl: capturedResolutionPhoto,
        remarks: remarks || 'Repaired and restored as per municipal standards.',
        resolutionLocation: capturedResolutionLocation,
      });

      setComplaints((prev) => prev.map((item) => (item.id === res.complaint.id ? res.complaint : item)));
      setSelectedComplaint(res.complaint);
      setIsSubmittingResolution(false);
      setResolveModalOpen(false);
      success('Resolution Proof Uploaded!', 'Now triggering automated Gujarati IVR verification call to citizen.');

      // Open IVR Call Simulator
      setTimeout(() => {
        setIvrModalOpen(true);
      }, 500);
    } catch {
      setIsSubmittingResolution(false);
      error('Error', 'Failed to upload resolution proof');
    }
  };

  const handleIvrCallOutcome = async (outcome: 'VERIFIED_PRESSED_1' | 'REOPENED_PRESSED_2') => {
    if (!selectedComplaint) return;
    const updated = await api.triggerIvrSimulation(selectedComplaint.id, outcome);
    setComplaints((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setSelectedComplaint(updated);
    setIvrModalOpen(false);

    if (outcome === 'VERIFIED_PRESSED_1') {
      success('Ticket Verified by Citizen! (Press 1)', 'Resolution locked into municipal database.');
    } else {
      warning('Ticket Auto-Reopened by Citizen (Press 2)', 'Returned to work queue with urgent escalation.');
    }
  };

  const filteredComplaints = complaints.filter((c) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.ticketNumber.toLowerCase().includes(q) ||
        c.complaintLocation.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const kanbanColumns: { status: ComplaintStatus; title: string; color: string }[] = [
    { status: 'PENDING', title: 'New Pending', color: 'border-amber-300 bg-amber-50/40' },
    { status: 'IN_PROGRESS', title: 'In Progress (Active Work)', color: 'border-blue-300 bg-blue-50/40' },
    { status: 'RESOLVED', title: 'Resolved (Awaiting IVR)', color: 'border-emerald-300 bg-emerald-50/40' },
    { status: 'VERIFIED', title: 'Citizen Verified', color: 'border-purple-300 bg-purple-50/40' },
    { status: 'REOPENED', title: 'Reopened / Flagged', color: 'border-rose-300 bg-rose-50/40' },
  ];

  return (
    <div className="space-y-6">
      {/* Search & View Switcher Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ticket number, road, or issue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none shadow-xs"
          />
        </div>

        {/* View Toggle */}
        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <button
            onClick={() => setViewMode('KANBAN')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'KANBAN' 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode('TABLE')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'TABLE' 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Data Table</span>
          </button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'KANBAN' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
          {kanbanColumns.map((col) => {
            const colComplaints = filteredComplaints.filter((c) => c.status === col.status);
            return (
              <div
                key={col.status}
                className="p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3 min-w-[240px]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{col.title}</h3>
                  <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-[11px] font-mono font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-2xs">
                    {colComplaints.length}
                  </span>
                </div>

                {/* Cards in Column */}
                <div className="space-y-2.5">
                  {colComplaints.length === 0 ? (
                    <div className="p-4 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-dashed border-slate-200 dark:border-slate-700 text-center text-[11px] text-slate-400">
                      No tickets
                    </div>
                  ) : (
                    colComplaints.map((c) => (
                      <Card
                        key={c.id}
                        hover
                        onClick={() => setSelectedComplaint(c)}
                        className="p-3.5 cursor-pointer space-y-2 shadow-xs hover:shadow-card-hover"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{c.ticketNumber}</span>
                          <span className="text-[10px] text-amber-700 dark:text-amber-400 font-bold font-mono">{c.urgency}</span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                          {language === 'gu' ? c.titleGu : c.title}
                        </h4>

                        <div className="relative rounded-xl overflow-hidden aspect-16/9">
                          <img
                            src={c.photoBeforeUrl}
                            alt={c.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-purple-500 shrink-0" />
                          <span>{c.complaintLocation.address}</span>
                        </p>

                        {/* Card Action Shortcuts */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-1.5">
                          {c.status === 'PENDING' && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartWork(c);
                              }}
                              className="w-full text-[11px] h-8"
                            >
                              Start Work
                            </Button>
                          )}

                          {c.status === 'IN_PROGRESS' && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenResolveFlow(c);
                              }}
                              className="w-full text-[11px] h-8"
                            >
                              Resolve Issue
                            </Button>
                          )}
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DATA TABLE VIEW */}
      {viewMode === 'TABLE' && (
        <Card className="p-0 overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4">Ticket</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Title & Location</th>
                  <th className="p-4">Citizen</th>
                  <th className="p-4">SLA</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-900 dark:text-slate-100">
                {filteredComplaints.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedComplaint(c)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{c.ticketNumber}</td>
                    <td className="p-4">
                      <StatusChip status={c.status} size="sm" />
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{c.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.complaintLocation.address}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-slate-900 dark:text-white">{c.citizenName}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{c.citizenPhone}</p>
                    </td>
                    <td className="p-4 font-mono text-emerald-600 dark:text-emerald-400 font-bold">18h remaining</td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      {c.status === 'PENDING' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleStartWork(c)}
                          className="text-xs h-8"
                        >
                          Start Work
                        </Button>
                      )}
                      {c.status === 'IN_PROGRESS' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleOpenResolveFlow(c)}
                          className="text-xs h-8"
                        >
                          Resolve
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* COMPLAINT DETAIL & ACTION DRAWER */}
      <Drawer
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        title={selectedComplaint?.ticketNumber || 'Complaint Details'}
        subtitle={selectedComplaint?.departmentName}
        width="lg"
      >
        {selectedComplaint && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Ticket Status</span>
                <div className="mt-1">
                  <StatusChip status={selectedComplaint.status} size="md" />
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400">Assigned Officer</span>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  {selectedComplaint.assignedOfficerName || 'Unassigned'}
                </p>
              </div>
            </div>

            {/* Quick Actions Strip */}
            <div className="flex gap-2">
              {selectedComplaint.status === 'PENDING' && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleStartWork(selectedComplaint)}
                  leftIcon={<Wrench className="w-4 h-4" />}
                  className="w-full"
                >
                  Start Work (Mark In-Progress)
                </Button>
              )}

              {selectedComplaint.status === 'IN_PROGRESS' && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleOpenResolveFlow(selectedComplaint)}
                  leftIcon={<Camera className="w-4 h-4" />}
                  className="w-full"
                >
                  Upload Geo-Fenced Resolution Proof
                </Button>
              )}

              {selectedComplaint.status === 'RESOLVED' && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setIvrModalOpen(true)}
                  leftIcon={<PhoneCall className="w-4 h-4" />}
                  className="w-full"
                >
                  Simulate Citizen Verification Call
                </Button>
              )}
            </div>

            {/* Photo & GPS */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Initial Complaint Photo & GPS
              </h4>
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-16/9">
                <img
                  src={selectedComplaint.photoBeforeUrl}
                  alt={selectedComplaint.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-slate-950/80 text-white rounded-lg text-[10px] font-mono">
                  {selectedComplaint.complaintLocation.lat.toFixed(6)}° N, {selectedComplaint.complaintLocation.lng.toFixed(6)}° E
                </div>
              </div>
            </div>

            {/* After resolution photo if exists */}
            {selectedComplaint.photoAfterUrl && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Field Resolution Proof
                </h4>
                <BeforeAfterSlider
                  beforeImage={selectedComplaint.photoBeforeUrl}
                  afterImage={selectedComplaint.photoAfterUrl}
                />
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Lifecycle Timeline
              </h4>
              <Timeline events={selectedComplaint.timeline} />
            </div>
          </div>
        )}
      </Drawer>

      {/* PROOF OF RESOLUTION MODAL WITH STRICT GEO-FENCE CHECK (<=100m) */}
      <Modal
        isOpen={resolveModalOpen}
        onClose={() => setResolveModalOpen(false)}
        title="Proof-of-Resolution Upload"
        subtitle="Mandatory live GPS camera & ≤100m geo-fence lock"
        maxWidth="lg"
      >
        <div className="space-y-5">
          {/* Geo-fence explanation banner */}
          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-950 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-sky-dark shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Automated Geo-Fence & EXIF Validation</p>
              <p className="text-[11px] text-sky-800 mt-0.5">
                The resolution photo must be taken within 100 meters of the original complaint pin ({selectedComplaint?.complaintLocation.lat.toFixed(4)}, {selectedComplaint?.complaintLocation.lng.toFixed(4)}).
              </p>
            </div>
          </div>

          {/* Camera Capture Section */}
          {capturedResolutionPhoto ? (
            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden border border-ink-border aspect-16/10">
                <img
                  src={capturedResolutionPhoto}
                  alt="Resolution proof"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setCameraActive(true)}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5 hover:bg-black/90"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Photo</span>
                </button>
              </div>

              {/* Geo-fence Calculation Feedback Pill */}
              <div
                className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-mono font-bold ${
                  geoPassed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${geoPassed ? 'text-emerald-600' : 'text-rose-600'}`} />
                  <span>
                    Distance from Pin: <b>{geoDistance} meters</b>
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold ${
                  geoPassed ? 'bg-emerald-200 text-emerald-950' : 'bg-rose-200 text-rose-950'
                }`}>
                  {geoPassed ? '✓ GEO-FENCE PASSED (≤100m)' : '✕ BLOCKED (>100m)'}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl border-2 border-dashed border-ink-border text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-lavender-light text-lavender-dark flex items-center justify-center mx-auto">
                <Camera className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-ink">Take Geo-Tagged Resolution Photo</h4>
              <p className="text-xs text-ink-secondary max-w-xs mx-auto">
                Click below to launch the camera viewfinder with real-time location telemetry.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => setCameraActive(true)}
                leftIcon={<Camera className="w-4 h-4" />}
                className="bg-sky-dark"
              >
                Launch Field Camera
              </Button>
            </div>
          )}

          {/* Resolution Remarks */}
          <div>
            <label className="text-xs font-bold text-ink">Officer Resolution Remarks</label>
            <textarea
              rows={2}
              placeholder="e.g. Cleared 2.4 tonnes of debris and patched road surface with hot asphalt."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full p-3 mt-1 rounded-xl border border-ink-border text-xs focus:ring-2 focus:ring-sky-dark focus:outline-none"
            />
          </div>

          <div className="flex gap-2 justify-end pt-3 border-t border-ink-border">
            <Button variant="outline" size="md" onClick={() => setResolveModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="mint"
              size="md"
              disabled={!capturedResolutionPhoto || !geoPassed}
              isLoading={isSubmittingResolution}
              onClick={handleSubmitProofOfResolution}
              leftIcon={<CheckCircle2 className="w-4 h-4" />}
            >
              Submit Proof & Trigger IVR Call
            </Button>
          </div>
        </div>
      </Modal>

      {/* CAMERA VIEWFINDER OVERLAY */}
      {cameraActive && (
        <GpsCamera
          targetLocation={selectedComplaint?.complaintLocation}
          onCapture={handleResolutionPhotoCaptured}
          onCancel={() => setCameraActive(false)}
        />
      )}

      {/* AUTOMATED IVR VERIFICATION SIMULATOR MODAL */}
      <Modal
        isOpen={ivrModalOpen}
        onClose={() => setIvrModalOpen(false)}
        title="Automated Citizen IVR Verification"
        subtitle="Citizen will confirm or reject the repair via telephone"
        maxWidth="lg"
      >
        {selectedComplaint && (
          <div className="space-y-4">
            <IvrSimulator
              complaintTitle={selectedComplaint.title}
              ticketNumber={selectedComplaint.ticketNumber}
              citizenPhone={selectedComplaint.citizenPhone}
              onCallCompleted={handleIvrCallOutcome}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};
