import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Role } from '../types';
import { 
  ShieldCheck, 
  User, 
  Building2, 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Lock, 
  Smartphone, 
  HardHat, 
  Fingerprint, 
  ArrowLeft,
  KeyRound
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { role, login } = useAuth();
  const { t } = useTranslation();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const roleParam = searchParams.get('role') as Role;
  const [selectedRole, setSelectedRole] = useState<Role | null>(
    roleParam && ['citizen', 'officer', 'admin'].includes(roleParam) ? roleParam : null
  );

  useEffect(() => {
    if (roleParam && ['citizen', 'officer', 'admin'].includes(roleParam)) {
      setSelectedRole(roleParam);
    }
  }, [roleParam]);

  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  // Citizen Multi-step Registration State
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);
  const [regData, setRegData] = useState({
    name: '',
    phone: '',
    otp: '',
    email: '',
    ward: 'Navrangpura (Ward 12)',
    city: 'Ahmedabad',
  });

  // Login form states
  const [officerDept, setOfficerDept] = useState('dept_roads');
  const [officerEmail, setOfficerEmail] = useState('rajesh.solanki@amc.gov.in');
  const [adminEmail, setAdminEmail] = useState('commissioner@amc.gov.in');

  const handleSelectRole = (r: Role) => {
    setSelectedRole(r);
    setSearchParams({ role: r });
    setActiveTab('LOGIN');
  };

  const handleRoleLogin = (r: Role) => {
    login(r);
    success(
      `Authenticated as ${r === 'citizen' ? 'Citizen' : r === 'officer' ? 'Field Officer' : 'Municipal Administrator'}`,
      `Entering ${r.toUpperCase()} workspace`
    );
    if (r === 'citizen') navigate('/citizen');
    else if (r === 'officer') navigate('/department');
    else if (r === 'admin') navigate('/admin');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regStep === 1) {
      if (!regData.name || !regData.phone) {
        error('Missing Fields', 'Please enter your full name and phone number');
        return;
      }
      setRegStep(2);
      success('OTP Sent', `Verification code sent to +91 ${regData.phone} (Use Demo OTP: 8842)`);
    } else if (regStep === 2) {
      if (regData.otp !== '8842' && regData.otp.length < 4) {
        error('Invalid OTP', 'Please enter 4-digit verification code (use 8842)');
        return;
      }
      setRegStep(3);
    } else {
      login('citizen', {
        name: regData.name,
        phone: `+91 ${regData.phone}`,
        email: regData.email || `${regData.name.toLowerCase().replace(/\s+/g, '.')}@gujarat.in`,
        ward: regData.ward,
        city: regData.city,
      });
      success('Account Created! (+100 XP)', 'Welcome to Tark Shaastra Citizen Portal');
      navigate('/citizen');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-canvas dark:bg-canvas-dark text-ink dark:text-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center transition-colors">
      <div className="w-full max-w-4xl space-y-6">
        {/* VIEW A: PORTAL SELECTION GATEWAY HUB */}
        {!selectedRole ? (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-slate-900 dark:text-white" />
                <span>Unified Municipal Access Gateway</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Select Your Stakeholder Portal
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Tark Shaastra provides dedicated, isolated workspaces tailored specifically for citizens, field engineering teams, and city administrators.
              </p>
            </div>

            {/* 3 Harmoniously Styled Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. Citizen Portal Card */}
              <div
                onClick={() => handleSelectRole('citizen')}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white flex items-center justify-center font-bold border border-slate-200 dark:border-slate-600">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                      Public Access
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                      Citizen Portal
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      Lodge GPS-verified civic reports, upvote neighborhood issues, track resolution timelines, and earn municipal Karma XP rewards.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Sign In / Register</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* 2. Department Officer Portal Card */}
              <div
                onClick={() => handleSelectRole('officer')}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white flex items-center justify-center font-bold border border-slate-200 dark:border-slate-600">
                    <HardHat className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                      Field Engineers & Staff
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                      Department Officer Portal
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      Action assigned ward tickets, manage Kanban work queues, upload ≤100m geo-fenced repair proof, and trigger automated IVR calls.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Officer Authentication</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* 3. Municipal Admin Command Card */}
              <div
                onClick={() => handleSelectRole('admin')}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white flex items-center justify-center font-bold border border-slate-200 dark:border-slate-600">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                      City Leadership & IAS
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                      Admin Command Center
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      Cross-department SLA leaderboard, city heatmaps, anti-fraud telemetry inspector, officer rosters, and Twilio voice analytics.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Command Center Access</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW B: DEDICATED ROLE LOGIN INTERFACE */
          <div className="max-w-xl mx-auto w-full animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Top Navigation Back to Gateway */}
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Portal Selection</span>
              </button>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <button
                  type="button"
                  onClick={() => handleSelectRole('citizen')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    selectedRole === 'citizen'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Citizen
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectRole('officer')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    selectedRole === 'officer'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Officer
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectRole('admin')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    selectedRole === 'admin'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* DEDICATED AUTH CARD */}
            <Card className="p-6 sm:p-8 bg-white dark:bg-slate-800/95 border-slate-200 dark:border-slate-700 shadow-card">
              {/* Role 1: Citizen Login & Registration */}
              {selectedRole === 'citizen' && (
                <div className="space-y-6">
                  {/* Citizen Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white flex items-center justify-center font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Citizen Civic Portal</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Sign in with mobile number or register a new civic account</p>
                    </div>
                  </div>

                  {/* Sign In vs Register Tabs */}
                  <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab('LOGIN')}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        activeTab === 'LOGIN'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      Citizen Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('REGISTER')}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        activeTab === 'REGISTER'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      New Registration (+100 XP)
                    </button>
                  </div>

                  {activeTab === 'LOGIN' ? (
                    <div className="space-y-4">
                      {/* Preset Citizen Profile Box */}
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                            alt="Aarav Patel"
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Aarav Patel</h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">Navrangpura Ward 12 • 420 Karma XP</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
                          VERIFIED
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-900 dark:text-white">Registered Mobile Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            defaultValue="+91 98795 43210"
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-900 dark:text-white">Citizen Passcode / OTP</label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="password"
                            defaultValue="••••••••"
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        size="lg"
                        onClick={() => handleRoleLogin('citizen')}
                        className="w-full shadow-xs"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Enter Citizen Workspace (1-Click Demo)
                      </Button>
                    </div>
                  ) : (
                    /* Multi-step Citizen Registration */
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-bold text-slate-900 dark:text-white">Step {regStep} of 3</span>
                        <span>{regStep === 1 ? 'Personal Details' : regStep === 2 ? 'Verify Mobile OTP' : 'Ward Selection'}</span>
                      </div>

                      {regStep === 1 && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs font-bold text-slate-900 dark:text-white">Full Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Aarav Patel"
                              value={regData.name}
                              onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                              className="w-full h-11 px-3.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-bold text-slate-900 dark:text-white">Mobile (+91)</label>
                            <input
                              type="tel"
                              required
                              placeholder="98795 43210"
                              value={regData.phone}
                              onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                              className="w-full h-11 px-3.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                            />
                          </div>
                          <Button variant="primary" size="lg" type="submit" className="w-full mt-2">
                            Continue to OTP
                          </Button>
                        </div>
                      )}

                      {regStep === 2 && (
                        <div className="space-y-3 text-center">
                          <Smartphone className="w-8 h-8 text-slate-900 dark:text-white mx-auto" />
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            Enter demo verification OTP <b className="text-slate-900 dark:text-white font-mono">8842</b> sent to +91 {regData.phone}
                          </p>
                          <input
                            type="text"
                            maxLength={4}
                            autoFocus
                            value={regData.otp}
                            onChange={(e) => setRegData({ ...regData, otp: e.target.value })}
                            placeholder="8842"
                            className="w-36 h-12 text-center text-lg font-mono font-bold mx-auto rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-white"
                          />
                          <div className="flex gap-2">
                            <Button variant="outline" size="md" type="button" onClick={() => setRegStep(1)} className="flex-1">
                              Back
                            </Button>
                            <Button variant="primary" size="md" type="submit" className="flex-1">
                              Verify OTP
                            </Button>
                          </div>
                        </div>
                      )}

                      {regStep === 3 && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-xs font-bold text-slate-900 dark:text-white">Select Municipal Ward</label>
                            <select
                              value={regData.ward}
                              onChange={(e) => setRegData({ ...regData, ward: e.target.value })}
                              className="w-full h-11 px-3.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                            >
                              <option value="Navrangpura (Ward 12)">Ahmedabad - Navrangpura</option>
                              <option value="Bodakdev & Vastrapur (Ward 14)">Ahmedabad - Bodakdev</option>
                              <option value="Maninagar (Ward 22)">Ahmedabad - Maninagar</option>
                              <option value="Adajan & Pal (Ward 10)">Surat - Adajan</option>
                              <option value="Alkapuri (Ward 7)">Vadodara - Alkapuri</option>
                            </select>
                          </div>
                          <Button variant="primary" size="lg" type="submit" className="w-full mt-2">
                            Complete Registration (+100 XP)
                          </Button>
                        </div>
                      )}
                    </form>
                  )}
                </div>
              )}

              {/* Role 2: Field Officer Login */}
              {selectedRole === 'officer' && (
                <div className="space-y-5">
                  {/* Officer Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white flex items-center justify-center font-bold">
                      <HardHat className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Department Officer Portal</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Municipal Field Engineering & Work Queue Dispatch</p>
                    </div>
                  </div>

                  {/* Preset Officer Profile Box */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                        alt="Rajesh Solanki"
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Rajesh Solanki (Junior Engineer)</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Roads & Bridges Dept • Ahmedabad West</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
                      BADGE AMC-8842
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 dark:text-white">Municipal Department</label>
                    <select
                      value={officerDept}
                      onChange={(e) => setOfficerDept(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                    >
                      <option value="dept_roads">Roads & Bridges Department</option>
                      <option value="dept_solid_waste">Solid Waste Management</option>
                      <option value="dept_water_drainage">Water Supply & Drainage</option>
                      <option value="dept_streetlights">Streetlights & Electricals</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 dark:text-white">Official Officer Email / Badge ID</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={officerEmail}
                        onChange={(e) => setOfficerEmail(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 dark:text-white">Field Access PIN</label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        defaultValue="••••••••"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleRoleLogin('officer')}
                    className="w-full shadow-xs"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Sign In to Department Work Queue (1-Click Demo)
                  </Button>
                </div>
              )}

              {/* Role 3: Municipal Admin Login */}
              {selectedRole === 'admin' && (
                <div className="space-y-5">
                  {/* Admin Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white flex items-center justify-center font-bold">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Municipal Command Center</h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400">City Administration, IAS Oversight & Cross-Ward Grid</p>
                    </div>
                  </div>

                  {/* Preset Admin Profile Box */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
                        alt="Commissioner S. Mehta"
                        className="w-10 h-10 rounded-xl object-cover border border-slate-300 dark:border-slate-600"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Commissioner S. Mehta (IAS)</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">Central Municipal Governance Command</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
                      ROOT ADMIN
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 dark:text-white">Command Authority Hub</label>
                    <input
                      type="text"
                      disabled
                      value="Gujarat Municipal Grid Central HQ (All 38 Wards)"
                      className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white cursor-not-allowed opacity-80"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 dark:text-white">Administrator Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-900 dark:text-white">IAS Master Security Key / 2FA</label>
                    <div className="relative">
                      <Fingerprint className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        defaultValue="••••••••"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleRoleLogin('admin')}
                    className="w-full shadow-xs"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Access Municipal Command Center (1-Click Demo)
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
