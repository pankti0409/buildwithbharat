import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { Category, GPSLocation, Complaint } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { GpsCamera } from '../../components/common/GpsCamera';
import { Modal } from '../../components/common/Modal';
import confetti from 'canvas-confetti';
import { 
  Camera, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Hammer, 
  Trash2, 
  Droplets, 
  Lightbulb, 
  HeartPulse, 
  Building, 
  TreePine,
  ArrowRight,
  RotateCcw,
  Flame,
  ThumbsUp
} from 'lucide-react';

const CATEGORY_TILES: { id: Category; labelKey: string; icon: React.FC<{ className?: string }>; color: string }[] = [
  { id: 'ROADS_POTHOLES', labelKey: 'cat.ROADS_POTHOLES', icon: Hammer, color: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700' },
  { id: 'SOLID_WASTE', labelKey: 'cat.SOLID_WASTE', icon: Trash2, color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40' },
  { id: 'WATER_DRAINAGE', labelKey: 'cat.WATER_DRAINAGE', icon: Droplets, color: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/40' },
  { id: 'STREETLIGHTS', labelKey: 'cat.STREETLIGHTS', icon: Lightbulb, color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/40' },
  { id: 'PUBLIC_HEALTH', labelKey: 'cat.PUBLIC_HEALTH', icon: HeartPulse, color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/40' },
  { id: 'ENCROACHMENT', labelKey: 'cat.ENCROACHMENT', icon: Building, color: 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800/40' },
  { id: 'PARKS_TREES', labelKey: 'cat.PARKS_TREES', icon: TreePine, color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40' },
];

export const CitizenReport: React.FC = () => {
  const { user, updateUserXp } = useAuth();
  const { t, language } = useTranslation();
  const { success, error } = useToast();
  const navigate = useNavigate();

  // Wizard state: 1: Category -> 2: Camera HUD -> 3: AI Review -> 4: Success Confetti
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>('ROADS_POTHOLES');
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [capturedLocation, setCapturedLocation] = useState<GPSLocation | null>(null);

  // AI Classification Preview
  const [aiConfidence, setAiConfidence] = useState(98);
  const [detectedTags, setDetectedTags] = useState<string[]>(['asphalt breakage', 'depth ~12cm', 'traffic hazard']);

  // Duplicate Detection State (409 Simulation)
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [existingDuplicates, setExistingDuplicates] = useState<Complaint[]>([]);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdTicketNumber, setCreatedTicketNumber] = useState('');

  // Step 1: Category Selected -> Open Camera
  const handleSelectCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setCameraActive(true);
    setStep(2);
  };

  // Step 2: Camera Capture Callback
  const handleCapturePhoto = async (photoDataUrl: string, location: GPSLocation) => {
    setCapturedPhoto(photoDataUrl);
    setCapturedLocation(location);
    setCameraActive(false);

    // Auto-fill default realistic titles based on category
    if (selectedCategory === 'ROADS_POTHOLES') {
      setTitle('Pothole and broken asphalt near roadway');
      setDescription('Deep pothole causing vehicle imbalance. Needs urgent patch repair.');
      setDetectedTags(['asphalt fracture', 'cavity depth 14cm', 'two-wheeler risk']);
    } else if (selectedCategory === 'SOLID_WASTE') {
      setTitle('Overflowing waste container');
      setDescription('Garbage container not cleared. Spilling onto the main footpath.');
      setDetectedTags(['overflowing bin', 'solid municipal waste', 'odor hazard']);
    } else {
      setTitle(`Municipal issue in ${location.ward}`);
      setDescription('Observed civic defect requiring municipal department attention.');
      setDetectedTags(['civic anomaly', 'geo-tagged surface']);
    }

    // Check for nearby duplicates within 500m (409 simulation)
    const duplicates = await api.findNearbyDuplicates(location.lat, location.lng, selectedCategory, 500);
    if (duplicates.length > 0) {
      setExistingDuplicates(duplicates);
      setDuplicateModalOpen(true);
    } else {
      setStep(3);
    }
  };

  // Upvote duplicate instead of filing new
  const handleUpvoteDuplicate = async (dup: Complaint) => {
    await api.upvoteComplaint(dup.id, user?.id || 'anon');
    updateUserXp(25);
    setDuplicateModalOpen(false);
    success('Duplicate Upvoted (+25 XP)', `You boosted priority for existing ticket ${dup.ticketNumber}`);
    navigate('/citizen/complaints');
  };

  // Step 3: Final Submission
  const handleSubmitReport = async () => {
    if (!capturedPhoto || !capturedLocation) {
      error('Photo Required', 'Please take a GPS verified photo first');
      return;
    }

    setIsSubmitting(true);
    try {
      const deptId = selectedCategory === 'ROADS_POTHOLES' ? 'dept_roads' : selectedCategory === 'SOLID_WASTE' ? 'dept_solid_waste' : 'dept_water_drainage';
      const deptName = selectedCategory === 'ROADS_POTHOLES' ? 'Roads & Bridges Department' : selectedCategory === 'SOLID_WASTE' ? 'Solid Waste Management' : 'Water Supply & Drainage';

      const newComplaint = await api.createComplaint({
        title: title || 'Reported Civic Grievance',
        titleGu: 'નોંધાયેલ મ્યુનિસિપલ ફરિયાદ',
        description: description || 'Civic defect reported by citizen.',
        descriptionGu: 'નાગરિક દ્વારા નોંધાયેલ ફરિયાદ.',
        category: selectedCategory,
        departmentId: deptId,
        departmentName: deptName,
        photoBeforeUrl: capturedPhoto,
        location: capturedLocation,
        citizenId: user?.id || 'usr_citizen_01',
        citizenName: user?.name || 'Aarav Patel',
        citizenPhone: user?.phone || '+91 98795 43210',
      });

      setCreatedTicketNumber(newComplaint.ticketNumber);
      updateUserXp(50);
      setIsSubmitting(false);
      setStep(4);

      // Trigger Confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0F172A', '#059669', '#0284C7', '#D97706'],
      });
    } catch (err) {
      setIsSubmitting(false);
      error('Failed to submit grievance', 'Please try again');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Step Header */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
          GEO-FENCED SUBMISSION
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          {step === 1 && '1. Select Grievance Category'}
          {step === 2 && '2. Locking GPS Telemetry & Photo'}
          {step === 3 && '3. Review AI Classification & Submit'}
          {step === 4 && 'Grievance Successfully Lodged 🎉'}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Every report includes hardcoded latitude/longitude telemetry to prevent false alarms.
        </p>
      </div>

      {/* Step 1: Category Tiles Grid */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATEGORY_TILES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card
                  key={cat.id}
                  hover
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`cursor-pointer p-4 text-center border flex flex-col items-center justify-center min-h-[120px] transition-all active:scale-95 shadow-xs ${
                    selectedCategory === cat.id 
                      ? 'border-slate-900 dark:border-white bg-slate-50 dark:bg-slate-800/80 shadow-sm' 
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 border ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {t(cat.labelKey)}
                  </span>
                </Card>
              );
            })}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center text-xs text-slate-600 dark:text-slate-400">
            Selecting a category will automatically open the high-precision GPS camera viewfinder.
          </div>
        </div>
      )}

      {/* Step 2: Camera Viewfinder Fullscreen Trigger */}
      {cameraActive && (
        <GpsCamera
          onCapture={handleCapturePhoto}
          onCancel={() => {
            setCameraActive(false);
            setStep(1);
          }}
        />
      )}

      {/* Step 3: AI Classification & Review Form */}
      {step === 3 && (
        <div className="space-y-6">
          {/* AI Vision Confidence Card */}
          <Card className="bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 p-5 shadow-xs">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-900 dark:text-white font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>AI Vision Classification</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Categorized as: {t(`cat.${selectedCategory}`)}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Confidence Score: <b className="text-emerald-700 dark:text-emerald-400">{aiConfidence}% High Accuracy</b>
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold uppercase font-mono border border-emerald-200 dark:border-emerald-800/40">
                VERIFIED
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {detectedTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Card>

          {/* Captured GPS Photo Preview with Telemetry Badge */}
          {capturedPhoto && capturedLocation && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-16/10">
              <img
                src={capturedPhoto}
                alt="Captured proof"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <button
                  type="button"
                  onClick={() => setCameraActive(true)}
                  className="px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-black transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake</span>
                </button>
              </div>

              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/85 backdrop-blur-md text-white text-xs font-mono space-y-0.5">
                <div className="flex items-center justify-between text-slate-200">
                  <span className="font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    {capturedLocation.lat.toFixed(6)}° N, {capturedLocation.lng.toFixed(6)}° E
                  </span>
                  <span className="text-emerald-400">±{capturedLocation.accuracyMeters}m Locked</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">{capturedLocation.address}</div>
              </div>
            </div>
          )}

          {/* Title & Description Fields */}
          <div className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div>
              <label className="text-xs font-bold text-slate-900 dark:text-white">Grievance Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-10 px-3 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 dark:text-white">Detailed Description / Landmarks</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
              <span>
                Once resolved, our automated Gujarati IVR will call your phone (+91 {user?.phone}) to confirm the fix before closing the ticket.
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                onClick={handleSubmitReport}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="flex-1"
              >
                Submit Grievance (+50 XP)
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Success Screen with Karma Points Award */}
      {step === 4 && (
        <Card className="text-center p-8 sm:p-12 space-y-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded-md">
              TICKET #{createdTicketNumber}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Grievance Successfully Lodged
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your grievance has been auto-allocated to the relevant field team. You will receive an automated IVR verification call when repair work is completed.
            </p>
          </div>

          {/* Reward Points Box */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/40 max-w-sm mx-auto flex items-center justify-center gap-3">
            <Flame className="w-5 h-5 text-amber-600 fill-amber-500" />
            <div className="text-left">
              <p className="text-xs font-bold text-amber-900 dark:text-amber-300">+50 Civic Karma XP Earned</p>
              <p className="text-[10px] text-amber-700 dark:text-amber-400">Use points for Metro and Municipal vouchers</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setStep(1);
                setCapturedPhoto(null);
                setCapturedLocation(null);
              }}
            >
              Report Another Issue
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/citizen/complaints')}
            >
              Track in My Complaints
            </Button>
          </div>
        </Card>
      )}

      {/* Duplicate Detection 409 Modal */}
      <Modal
        isOpen={duplicateModalOpen}
        onClose={() => {
          setDuplicateModalOpen(false);
          setStep(3);
        }}
        title="Similar Grievance Found Nearby (409 Duplicate Guard)"
        subtitle="An identical issue was already reported within 500 meters"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            To prevent overloading department work queues, you can upvote this existing complaint instead of filing a duplicate. You will still receive <b className="text-amber-700 dark:text-amber-400">+25 Karma XP</b> and resolution alerts.
          </p>

          {existingDuplicates.map((dup) => (
            <div key={dup.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{dup.ticketNumber}</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 px-2 py-0.5 rounded">
                  Active
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{dup.title}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{dup.complaintLocation.address}</p>
              {dup.photoBeforeUrl && (
                <img
                  src={dup.photoBeforeUrl}
                  alt={dup.title}
                  className="w-full h-24 object-cover rounded-lg mt-1 border border-slate-200 dark:border-slate-700"
                />
              )}

              <Button
                variant="primary"
                size="sm"
                onClick={() => handleUpvoteDuplicate(dup)}
                leftIcon={<ThumbsUp className="w-3.5 h-3.5" />}
                className="w-full mt-2 text-xs"
              >
                Upvote Existing Ticket (+25 XP)
              </Button>
            </div>
          ))}

          <div className="pt-2 flex justify-between gap-2 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDuplicateModalOpen(false);
                setStep(3);
              }}
              className="w-full"
            >
              File as New Issue Anyway
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
