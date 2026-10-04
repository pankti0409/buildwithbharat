import React, { useState } from 'react';
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
  Sparkles,
  Smartphone,
  MapPin,
  Flame,
  KeyRound,
  Fingerprint,
  Building
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { role, login, switchRole } = useAuth();
  const { t } = useTranslation();
  const { success, error } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRoleParam = searchParams.get('role') as Role;
  const [selectedRole, setSelectedRole] = useState<Role>(
    initialRoleParam && ['citizen', 'officer', 'admin'].includes(initialRoleParam)
      ? initialRoleParam
      : role || 'citizen'
  );

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
    consentGps: true,
    consentIvr: true,
  });

  // Login form states for each role
  const [officerDept, setOfficerDept] = useState('dept_roads');
  const [officerBadgeId, setOfficerBadgeId] = useState('AMC-ENG-8842');
  const [adminSecurityPin, setAdminSecurityPin] = useState('9900');

  const handleRoleLogin = (r: Role) => {
    login(r);
    success(
      `Authenticated as ${r === 'citizen' ? 'Citizen' : r === 'officer' ? 'Field Officer' : 'Municipal Administrator'}`,
      `Entering ${r.toUpperCase()} secure portal`
    );
    if (r === 'citizen') navigate('/citizen');
    else if (r === 'officer') navigate('/department');
    else if (r === 'admin') navigate('/admin');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regStep === 1) {
      if (!regData.name || !regData.phone) {
        error('Missing Fields', 'Please fill your name and phone number');
        return;
      }
      setRegStep(2);
      success('OTP Sent', `Verification code sent to +91 ${regData.phone} (Use Demo OTP: 8842)`);
    } else if (regStep === 2) {
      if (regData.otp !== '8842' && regData.otp.length < 4) {
        error('Invalid OTP', 'Please enter 4-digit code (use 8842)');
        return;
      }
      setRegStep(3);
    } else {
      login('citizen', {
        name: regData.name,
        phone: `+91 ${regData.phone}`,
        email: regData.email,
        ward: regData.ward,
        city: regData.city,
      });
      success('Account Created! (+100 XP)', 'Welcome to Tark Shaastra Citizen Portal');
      navigate('/citizen');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-8 mesh-gradient-subtle">
      <div className="w-full max-w-2xl">
        {/* Main Authentication Card */}
        <Card className="shadow-soft-lg dark:shadow-soft-lg-dark bg-white/95 dark:bg-surface-dark border-ink-border dark:border-surface-darkBorder p-6 sm:p-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink dark:text-white tracking-tight">
              Tark Shaastra Universal Access
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary dark:text-ink-secondary">
              Select your municipal stakeholder profile to access your dedicated workspace
            </p>
          </div>

          {/* 3 Dedicated Role Login Switcher Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 mb-8">
            {/* Citizen Tab */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('citizen');
                setActiveTab('LOGIN');
              }}
              className={`p-3 rounded-lg flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                selectedRole === 'citizen'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>1. Citizen</span>
            </button>

            {/* Officer Tab */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('officer');
                setActiveTab('LOGIN');
              }}
              className={`p-3 rounded-lg flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                selectedRole === 'officer'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>2. Field Officer</span>
            </button>

            {/* Admin Tab */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('admin');
                setActiveTab('LOGIN');
              }}
              className={`p-3 rounded-lg flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all ${
                selectedRole === 'admin'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Shield className="w-4 h-4 text-slate-900 dark:text-white" />
              <span>3. Admin Center</span>
            </button>
          </div>

          {/* ROLE 1: DEDICATED CITIZEN LOGIN / REGISTRATION */}
          {selectedRole === 'citizen' && (
            <div className="space-y-6">
              {/* Citizen Tab Switcher */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900/80 p-1 border border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('LOGIN')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'LOGIN'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Citizen Sign In
                </button>
                <button
                  onClick={() => setActiveTab('REGISTER')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'REGISTER'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  New Registration (+100 XP)
                </button>
              </div>

              {activeTab === 'LOGIN' ? (
                <div className="space-y-4">
                  {/* Preset Citizen Profile Box */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                        alt="Citizen"
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-ink dark:text-white">Aarav Patel (Navrangpura Ward 12)</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">+91 98795 43210 • 420 Karma XP</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-bold">
                      VERIFIED CITIZEN
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink dark:text-white">Citizen Mobile / Email</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        defaultValue="+91 98795 43210"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-ink dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink dark:text-white">Passcode / OTP</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        defaultValue="••••••••"
                        className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-ink dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleRoleLogin('citizen')}
                    className="w-full shadow-sm"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Enter Citizen Portal (1-Click Demo)
                  </Button>
                </div>
              ) : (
                /* Registration Step Form */
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white">Step {regStep} of 3</span>
                    <span>{regStep === 1 ? 'Personal Info' : regStep === 2 ? 'Mobile OTP' : 'Ward & Permissions'}</span>
                  </div>

                  {regStep === 1 && (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-ink dark:text-white">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aarav Patel"
                          value={regData.name}
                          onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                          className="w-full h-11 px-3.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-ink dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-ink dark:text-white">Mobile (+91)</label>
                        <input
                          type="tel"
                          required
                          placeholder="98795 43210"
                          value={regData.phone}
                          onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                          className="w-full h-11 px-3.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-ink dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                        />
                      </div>
                      <Button variant="primary" size="lg" type="submit" className="w-full mt-2">
                        Continue to OTP
                      </Button>
                    </div>
                  )}

                  {regStep === 2 && (
                    <div className="space-y-3 text-center">
                      <Smartphone className="w-8 h-8 text-emerald-500 mx-auto" />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Enter demo OTP <b className="text-slate-900 dark:text-white">8842</b> sent to +91 {regData.phone}
                      </p>
                      <input
                        type="text"
                        maxLength={4}
                        autoFocus
                        value={regData.otp}
                        onChange={(e) => setRegData({ ...regData, otp: e.target.value })}
                        placeholder="8842"
                        className="w-36 h-12 text-center text-lg font-mono font-bold mx-auto rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-ink dark:text-white focus:outline-none"
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
                        <label className="text-xs font-bold text-ink dark:text-white">Select Municipal Ward</label>
                        <select
                          value={regData.ward}
                          onChange={(e) => setRegData({ ...regData, ward: e.target.value })}
                          className="w-full h-11 px-3.5 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-ink dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
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

          {/* ROLE 2: DEDICATED FIELD OFFICER LOGIN */}
          {selectedRole === 'officer' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                    alt="Officer"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-ink dark:text-white">Rajesh Solanki (Junior Engineer)</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Roads & Bridges Dept • Navrangpura</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-400 font-bold">
                  BADGE AMC-8842
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink dark:text-white">Municipal Department</label>
                <select
                  value={officerDept}
                  onChange={(e) => setOfficerDept(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-ink dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                >
                  <option value="dept_roads">Roads & Bridges Department (Ahmedabad)</option>
                  <option value="dept_solid_waste">Solid Waste Management</option>
                  <option value="dept_water_drainage">Water Supply & Drainage</option>
                  <option value="dept_streetlights">Streetlights & Electricals</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink dark:text-white">Official Officer ID / Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    defaultValue="rajesh.solanki@amc.gov.in"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-ink dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink dark:text-white">Field Access PIN</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-ink dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => handleRoleLogin('officer')}
                className="w-full shadow-sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to Department Work Queue
              </Button>
            </div>
          )}

          {/* ROLE 3: DEDICATED MUNICIPAL ADMIN LOGIN */}
          {selectedRole === 'admin' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
                    alt="Admin"
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-ink dark:text-white">Commissioner S. Mehta (IAS)</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Central Municipal Governance Command</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-white font-bold">
                  ROOT ADMIN
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink dark:text-white">Command Center Portal</label>
                <input
                  type="text"
                  disabled
                  value="Gujarat Municipal Grid Central HQ (All Wards)"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 text-xs font-bold text-ink dark:text-white cursor-not-allowed opacity-80"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink dark:text-white">Administrator Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    defaultValue="commissioner@amc.gov.in"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-ink dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-ink dark:text-white">IAS Master Security Key</label>
                <div className="relative">
                  <Fingerprint className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    defaultValue="••••••••"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-ink dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => handleRoleLogin('admin')}
                className="w-full shadow-sm"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Access Municipal Command Center
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
