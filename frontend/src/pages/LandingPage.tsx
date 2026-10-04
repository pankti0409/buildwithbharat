import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { StatusChip } from '../components/common/StatusChip';
import { MapComponent } from '../components/common/MapComponent';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Camera, 
  PhoneCall, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  TrendingUp, 
  Users, 
  Building2, 
  Award, 
  ChevronDown,
  ChevronUp,
  Volume2,
  Activity,
  Flame,
  Clock,
  Compass
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t, language } = useTranslation();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [ivrSimulationActive, setIvrSimulationActive] = useState(false);
  const [ivrKey, setIvrKey] = useState<number | null>(null);

  const sampleMapPins = [
    {
      id: 'pin1',
      ticketNumber: 'TS-2026-0891',
      title: 'Pothole Cluster on CG Road',
      titleGu: 'સી.જી. રોડ પર ખાડા',
      description: 'Waterlogged potholes near Swastik cross road',
      descriptionGu: 'સ્વસ્તિક ચાર રસ્તા પાસે ખાડા',
      category: 'ROADS_POTHOLES' as const,
      departmentId: 'dept_roads',
      departmentName: 'Roads Department',
      status: 'IN_PROGRESS' as const,
      urgency: 'HIGH' as const,
      citizenId: 'c1',
      citizenName: 'Aarav Patel',
      citizenPhone: '+91 98795 43210',
      submittedAt: '2026-10-04T08:30:00Z',
      photoBeforeUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&auto=format&fit=crop&q=80',
      complaintLocation: {
        lat: 23.0378,
        lng: 72.5621,
        accuracyMeters: 3.5,
        address: 'CG Road, Navrangpura, Ahmedabad',
        ward: 'Navrangpura',
        zone: 'West Zone',
        city: 'Ahmedabad',
      },
      aiClassification: {
        predictedCategory: 'ROADS_POTHOLES' as const,
        confidence: 0.98,
        duplicateRiskPercentage: 0,
        detectedObjects: ['pothole'],
      },
      upvotes: 24,
      comments: [],
      timeline: [],
    },
    {
      id: 'pin2',
      ticketNumber: 'TS-2026-0887',
      title: 'Solid Waste Cleared at Vastrapur',
      titleGu: 'વસ્ત્રાપુર ખાતે કચરો સાફ',
      description: 'Cleared container station',
      descriptionGu: 'કચરાપેટી ખાલી કરાઈ',
      category: 'SOLID_WASTE' as const,
      departmentId: 'dept_solid_waste',
      departmentName: 'Solid Waste',
      status: 'RESOLVED' as const,
      urgency: 'HIGH' as const,
      citizenId: 'c2',
      citizenName: 'Bhavik Shah',
      citizenPhone: '+91 98250 11234',
      submittedAt: '2026-10-03T14:10:00Z',
      photoBeforeUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&auto=format&fit=crop&q=80',
      complaintLocation: {
        lat: 23.0354,
        lng: 72.5283,
        accuracyMeters: 4.1,
        address: 'Vastrapur Lake Road, Ahmedabad',
        ward: 'Bodakdev',
        zone: 'New West Zone',
        city: 'Ahmedabad',
      },
      aiClassification: {
        predictedCategory: 'SOLID_WASTE' as const,
        confidence: 0.99,
        duplicateRiskPercentage: 0,
        detectedObjects: ['waste'],
      },
      upvotes: 38,
      comments: [],
      timeline: [],
    },
  ];

  const faqs = [
    {
      q: 'How does Tark Shaastra guarantee that a reported issue was actually fixed?',
      a: 'Officers cannot simply close a ticket with a checkbox. The system requires an in-app photo taken strictly within a ≤100-meter geo-fence of the original GPS pin with verified EXIF timestamps, followed immediately by an automated Twilio voice call to the citizen.',
    },
    {
      q: 'What if a citizen doesn’t have a smartphone or internet?',
      a: 'Tark Shaastra includes an automated Voice Hotline on 1800-TARK-78. Keypad phone users can speak in Gujarati or Hindi, and our speech-to-text AI converts the call into a mapped grievance ticket.',
    },
    {
      q: 'How does the AI prevent duplicate complaint flooding?',
      a: 'When a citizen snaps a photo, our vision model analyzes image embeddings and GPS coordinates. If an identical problem exists within 500 meters, it suggests upvoting the existing ticket with +25 XP instead of creating duplicates.',
    },
    {
      q: 'What happens if an officer claims a repair is done, but it isn’t?',
      a: 'When the citizen receives the automated IVR call, they press "2" to reject the claim. The ticket instantly reopens, escalates to the Ward Superintendent, and marks an integrity flag against the officer’s monthly SLA score.',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas dark:bg-canvas-dark text-ink dark:text-white transition-colors">
      {/* 1. Hero Section */}
      <section className="relative pt-8 pb-20 sm:pt-14 sm:pb-24 border-b border-ink-border/60 dark:border-surface-darkBorder">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e4eee9] dark:bg-tealBrand/20 border border-tealBrand/30 text-tealBrand dark:text-teal-300 text-xs font-semibold shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-tealBrand animate-pulse" />
                <span>Built for India’s cities</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink dark:text-white leading-[1.12]">
                Better cities begin with{' '}
                <span className="text-tealBrand dark:text-teal-400 underline decoration-tealBrand/30 underline-offset-8">
                  one clear report.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-ink-secondary dark:text-ink-secondary max-w-2xl leading-relaxed">
                Tark Shaastra connects citizens and municipal teams to surface real issues, route them to the right department, and verify every resolution with mathematical care.
              </p>

              {/* Call to Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    switchRole('citizen');
                    navigate('/citizen/report');
                  }}
                  leftIcon={<Camera className="w-5 h-5" />}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Report an Issue
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    switchRole('officer');
                    navigate('/department');
                  }}
                  className="w-full sm:w-auto"
                >
                  For Municipal Teams
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-ink-secondary dark:text-ink-muted">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-tealBrand dark:text-teal-400" />
                  Verified by citizens
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-tealBrand dark:text-teal-400" />
                  Fraud-aware by design
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <PhoneCall className="w-4 h-4 text-tealBrand dark:text-teal-400" />
                  Toll-Free 1800-TARK-78
                </span>
              </div>
            </div>

            {/* Right Hero: Live Civic Pulse Interactive Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Glow Backdrop */}
                <div className="absolute -inset-4 rounded-3xl bg-[#dff4ef] dark:bg-tealBrand/10 blur-2xl pointer-events-none" />

                <Card className="relative overflow-hidden border-white/80 dark:border-surface-darkBorder bg-surface-light/90 dark:bg-surface-dark/95 p-5 shadow-xl backdrop-blur">
                  <div className="flex items-center justify-between border-b border-ink-border/50 dark:border-surface-darkBorder pb-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-xl bg-tealBrand-subtle dark:bg-tealBrand/30 text-tealBrand dark:text-teal-300">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-bold text-sm text-ink dark:text-white">Gujarat Civic Pulse</p>
                        <p className="text-[11px] text-ink-muted">Live Community Telemetry</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                        ONLINE
                      </span>
                    </div>
                  </div>

                  {/* Grid Map Preview */}
                  <div className="relative mt-4 h-56 overflow-hidden rounded-2xl bg-[#edf7f5] dark:bg-surface-darkMuted border border-tealBrand/20">
                    <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#b5d6d0_1px,transparent_1px),linear-gradient(90deg,#b5d6d0_1px,transparent_1px)] [background-size:28px_28px]" />
                    
                    {/* Live Geo Pins */}
                    <div className="absolute left-[24%] top-[34%] h-3.5 w-3.5 rounded-full border-2 border-white bg-rose-500 shadow-md animate-bounce" title="High Priority" />
                    <div className="absolute left-[52%] top-[54%] h-3.5 w-3.5 rounded-full border-2 border-white bg-amber-400 shadow-md" title="In Progress" />
                    <div className="absolute left-[72%] top-[28%] h-3.5 w-3.5 rounded-full border-2 border-white bg-tealBrand shadow-md" title="Verified" />
                    
                    <div className="absolute bottom-3 left-3 rounded-xl bg-white/95 dark:bg-surface-dark/95 px-3 py-1.5 text-xs shadow-sm border border-ink-border dark:border-surface-darkBorder">
                      <span className="font-bold text-ink dark:text-white">1,248</span> issues resolved this month
                    </div>
                  </div>

                  {/* Stat Bar */}
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-[#f5faf9] dark:bg-surface-darkMuted p-2.5 border border-tealBrand/10">
                      <p className="text-lg font-bold text-ink dark:text-white">94%</p>
                      <p className="text-[10px] text-ink-muted">verified</p>
                    </div>
                    <div className="rounded-xl bg-[#fffaf0] dark:bg-surface-darkMuted p-2.5 border border-amberBrand/20">
                      <p className="text-lg font-bold text-ink dark:text-white">16.4h</p>
                      <p className="text-[10px] text-ink-muted">avg. SLA</p>
                    </div>
                    <div className="rounded-xl bg-[#f8f4fb] dark:bg-surface-darkMuted p-2.5 border border-lavender/20">
                      <p className="text-lg font-bold text-ink dark:text-white">42.8k</p>
                      <p className="text-[10px] text-ink-muted">citizens</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 3-Step Verification Pipeline */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              A calmer way to improve your city
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              From street-level signal to city-level action.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Step 01 */}
            <Card hover className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold text-slate-400 font-mono">01</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Report clearly</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Share a photo, location, and what you see. AI helps auto-classify the department and lock GPS telemetry before it leaves your phone.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-slate-700 dark:text-slate-300 font-semibold">
                Instant AI Classification
              </div>
            </Card>

            {/* Step 02 */}
            <Card hover className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40">
                    <Activity className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold text-slate-400 font-mono">02</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Track together</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  See status changes, upvote reports nearby within 500m, and keep the signal honest with community verification.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-amber-700 dark:text-amber-300 font-semibold">
                500m Duplicate Prevention
              </div>
            </Card>

            {/* Step 03 */}
            <Card hover className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold text-slate-400 font-mono">03</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Verify resolution</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Officers close the loop with ≤100m geo-fenced proof. Twilio IVR calls the citizen in Gujarati/English so resolved truly means resolved.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 font-semibold">
                Automated IVR Call Verification
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. City Impact Metrics Strip */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <div className="text-slate-900 dark:text-white">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono">18,420</p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Issues resolved</p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <div className="text-slate-900 dark:text-white">
                <Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono">42,800</p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Active citizens</p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <div className="text-slate-900 dark:text-white">
                <Building2 className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </div>
              <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono">6</p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Departments connected</p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs">
              <div className="text-slate-900 dark:text-white">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <p className="mt-3 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono">94%</p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Resolution trust score</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Keypad Phone IVR Simulator */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left explanation */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                UNIVERSAL ACCESSIBILITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                Works on any ₹800 Feature Phone in Gujarati.
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Over 40% of citizens communicate through keypad phones. Tark Shaastra’s automated bilingual IVR hotline (1800-TARK-78) lets any citizen lodge grievances and confirm resolutions without requiring smartphones or data plans.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Bilingual Gujarati Speech-to-Ticket</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Spoken reports in Gujarati/Hindi are automatically transcribed into structured tickets.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Automated Dial-back on Repair</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Citizens press 1 on dialpad to verify resolution or 2 to auto-reopen.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Feature Phone Simulation */}
            <div className="lg:col-span-6 flex justify-center">
              <Card className="w-full max-w-md bg-slate-950 text-white border-slate-800 shadow-2xl p-6 rounded-[28px]">
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-emerald-400 font-mono space-y-2">
                  <div className="flex justify-between text-[11px] border-b border-slate-700 pb-1">
                    <span>1800-TARK-78</span>
                    <span>{ivrSimulationActive ? 'CALL ACTIVE' : 'READY'}</span>
                  </div>

                  {ivrSimulationActive ? (
                    <div className="space-y-2 pt-1">
                      <p className="text-xs text-emerald-200 font-gujarati">
                        "નમસ્તે! તમારી ફરિયાદ ઉકેલાઈ છે? હા માટે ૧, ના માટે ૨ દબાવો."
                      </p>
                      <div className="text-[10px] text-emerald-400 pt-1">
                        English: "Press 1 to verify resolution, 2 to reopen."
                      </div>
                      {ivrKey && (
                        <div className="p-1.5 bg-emerald-500/20 rounded text-center text-xs font-bold text-white">
                          You Pressed [{ivrKey}] • {ivrKey === 1 ? 'Verified (+50 XP)' : 'Reopened & Escalated'}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-4 text-center">
                      <Volume2 className="w-7 h-7 text-emerald-400 mx-auto mb-1 animate-pulse" />
                      <p className="text-xs">Toll-Free Voice Verification Engine</p>
                      <p className="text-[10px] text-slate-400">Tap below to test incoming IVR call</p>
                    </div>
                  )}
                </div>

                {/* Keypad Buttons */}
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => {
                      if (ivrSimulationActive) setIvrKey(1);
                    }}
                    className={`h-11 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-white active:scale-95 transition-transform ${
                      ivrKey === 1 ? 'ring-2 ring-emerald-400 bg-emerald-950' : ''
                    }`}
                  >
                    <span className="font-bold text-sm">1</span>
                    <span className="text-[8px] text-slate-400 font-gujarati">હા (Verify)</span>
                  </button>

                  <button
                    onClick={() => {
                      if (ivrSimulationActive) setIvrKey(2);
                    }}
                    className={`h-11 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-white active:scale-95 transition-transform ${
                      ivrKey === 2 ? 'ring-2 ring-rose-400 bg-rose-950' : ''
                    }`}
                  >
                    <span className="font-bold text-sm">2</span>
                    <span className="text-[8px] text-slate-400 font-gujarati">ના (Reopen)</span>
                  </button>

                  <button
                    className="h-11 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-white opacity-60"
                  >
                    <span className="font-bold text-sm">3</span>
                    <span className="text-[8px] text-slate-400">DEF</span>
                  </button>
                </div>

                <div className="mt-5 flex justify-center">
                  {!ivrSimulationActive ? (
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => {
                        setIvrSimulationActive(true);
                        setIvrKey(null);
                      }}
                      leftIcon={<PhoneCall className="w-4 h-4" />}
                      className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                    >
                      Test Gujarati IVR Call Flow
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIvrSimulationActive(false);
                        setIvrKey(null);
                      }}
                      className="text-slate-300 border-slate-700 hover:bg-slate-800"
                    >
                      End Voice Simulation
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Live Community Radar Map Teaser */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
                GEOSPATIAL TRANSPARENCY
              </span>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                Live Municipal Radar
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Explore verified civic signals across Ahmedabad, Surat, Vadodara, and Rajkot.
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                switchRole('citizen');
                navigate('/citizen/map');
              }}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Open Fullscreen Community Map
            </Button>
          </div>

          <MapComponent
            complaints={sampleMapPins as any}
            center={[23.0378, 72.5621]}
            zoom={13}
            className="h-[420px]"
            onSelectComplaint={(c) => {
              switchRole('citizen');
              navigate(`/citizen/complaints?id=${c.id}`);
            }}
          />
        </div>
      </section>

      {/* 6. Direct 3 Role Portal Cards */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              One Unified System, 3 Stakeholder Workspaces
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Experience the platform with 1-click demo access for each user type.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Citizen */}
            <Card hover className="flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Citizen Workspace</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Mobile-first grievance reporting with live GPS camera HUD, duplicate detection modals, upvoting, and civic karma rewards catalog.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    switchRole('citizen');
                    navigate('/citizen');
                  }}
                  className="w-full"
                >
                  Enter Citizen Portal
                </Button>
              </div>
            </Card>

            {/* Officer */}
            <Card hover className="flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Department Field Portal</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Dynamic queue management with interactive Kanban boards, map dispatching, ≤100m geo-fenced resolution camera, and Twilio IVR trigger.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    switchRole('officer');
                    navigate('/department');
                  }}
                  className="w-full"
                >
                  Enter Department Portal
                </Button>
              </div>
            </Card>

            {/* Admin */}
            <Card hover className="flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Municipal Command Center</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Executive dashboard with Recharts trends, master filterable table with CSV export, GPS triangulation inspector, and IVR logs.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    switchRole('admin');
                    navigate('/admin');
                  }}
                  className="w-full"
                >
                  Enter Admin Command
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Everything you need to know about Tark Shaastra’s verification engine.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 transition-colors shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-700 dark:text-slate-300 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Trust Banner CTA Section */}
      <section className="bg-slate-900 text-white py-16 border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Designed for trust
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Every report deserves a responsible next step.
            </h2>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-slate-300">
              Tark Shaastra uses location context, community signals, and officer verification to reduce noise without silencing anyone.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              switchRole('admin');
              navigate('/admin');
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="bg-white text-slate-900 hover:bg-slate-100 border-white"
          >
            Explore the Command Center
          </Button>
        </div>
      </section>
    </div>
  );
};
