import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { 
  X, 
  User, 
  ShieldCheck, 
  QrCode, 
  Award, 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  LogOut, 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Download, 
  Copy, 
  Building2, 
  Shield, 
  Cpu, 
  Radio, 
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'CARD' | 'SETTINGS' | 'BADGES' | 'ROLES';
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'CARD',
}) => {
  const { user, role, logout, switchRole, updateUser } = useAuth();
  const { language, setLanguage, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const { success, info } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'CARD' | 'SETTINGS' | 'BADGES' | 'ROLES'>(defaultTab);

  // Form edit states
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [ward, setWard] = useState(user?.ward || 'Navrangpura (Ward 12)');
  
  // Notification Preferences
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [ivrSimulation, setIvrSimulation] = useState(true);
  const [highPrecisionGps, setHighPrecisionGps] = useState(true);

  if (!isOpen || !user) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      phone,
      email,
      ward,
    });
    success('Settings Updated', 'Your profile and notification preferences have been saved.');
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.id);
    info('Copied to Clipboard', `Stakeholder ID: ${user.id}`);
  };

  const handleLogout = () => {
    logout();
    onClose();
    success('Logged Out', 'You have securely signed out of your session.');
    navigate('/');
  };

  const handleRoleChange = (newRole: 'citizen' | 'officer' | 'admin') => {
    switchRole(newRole);
    success(
      `Role Switched`,
      `Active Stakeholder: ${newRole === 'citizen' ? 'Citizen' : newRole === 'officer' ? 'Field Officer' : 'Municipal Admin'}`
    );
    if (newRole === 'citizen') navigate('/citizen');
    else if (newRole === 'officer') navigate('/department');
    else if (newRole === 'admin') navigate('/admin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover border-2 border-slate-900 dark:border-white shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  {user.name}
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 uppercase">
                  {role}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{user.ward}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('CARD')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'CARD'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Digital Civic ID Card</span>
          </button>

          <button
            onClick={() => setActiveTab('SETTINGS')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'SETTINGS'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profile & Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('BADGES')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'BADGES'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Karma & Badges</span>
          </button>

          <button
            onClick={() => setActiveTab('ROLES')}
            className={`flex items-center gap-2 py-3 px-3 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'ROLES'
                ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Switch Role / Auth</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: DIGITAL CIVIC ID CARD ("Things to Card") */}
          {activeTab === 'CARD' && (
            <div className="space-y-6">
              {/* High-Tech Holographic Smart Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6 sm:p-7 shadow-xl border border-slate-700/80">
                {/* Background circuit grid watermark */}
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>

                {/* Card Top Strip */}
                <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs shadow-sm">
                      <ShieldCheck className="w-4 h-4 text-slate-950" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                        GUJARAT MUNICIPAL GOVERNANCE GRID
                      </p>
                      <h4 className="text-sm font-bold tracking-tight text-white">
                        {role === 'citizen' ? 'Citizen Proof-of-Work Digital ID' : role === 'officer' ? 'AMC Field Officer Smart Badge' : 'IAS Central Command Credential'}
                      </h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>NFC READY</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="relative z-10 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
                  {/* Photo & Chip */}
                  <div className="flex flex-col items-center sm:items-start gap-3">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-xl object-cover border-2 border-emerald-400/80 shadow-md"
                      />
                      <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-slate-950">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                      <Cpu className="w-3.5 h-3.5 text-amber-400" />
                      <span>SECURE CHIP V4.2</span>
                    </div>
                  </div>

                  {/* Stakeholder Details */}
                  <div className="sm:col-span-2 space-y-2 text-center sm:text-left">
                    <div>
                      <p className="text-[10px] font-mono text-slate-400 uppercase">Registered Name</p>
                      <h3 className="text-lg font-bold text-white tracking-tight">{user.name}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[10px] font-mono text-slate-400 uppercase">Ward & City</p>
                        <p className="font-semibold text-slate-200">{user.ward}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-slate-400 uppercase">Civic XP Level</p>
                        <p className="font-bold text-amber-400 font-mono">Level {user.level} ({user.xp} XP)</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-slate-400 uppercase">Phone / Helpline</p>
                        <p className="font-mono text-slate-200">{user.phone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-slate-400 uppercase">Stakeholder ID</p>
                        <p className="font-mono text-emerald-400 font-bold">{user.id}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Holographic Barcode */}
                <div className="relative z-10 mt-6 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-slate-300" />
                    <span>VERIFIED CIVIC BLOCKCHAIN HASH: #7F88-AMCD-2026</span>
                  </div>
                  <span className="text-emerald-400 font-bold">STATUS: ACTIVE</span>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex flex-wrap gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyId}
                  leftIcon={<Copy className="w-3.5 h-3.5" />}
                  className="flex-1"
                >
                  Copy Stakeholder ID
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => success('Card Exported', 'Digital Civic ID Card saved to offline wallet.')}
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                  className="flex-1"
                >
                  Export Wallet Pass (.PKPASS)
                </Button>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & MUNICIPAL SETTINGS */}
          {activeTab === 'SETTINGS' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Mobile (+91)</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Municipal Ward</label>
                    <select
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 dark:focus:ring-white focus:outline-none"
                    >
                      <option value="Navrangpura (Ward 12)">Ahmedabad - Navrangpura (Ward 12)</option>
                      <option value="Bodakdev & Vastrapur (Ward 14)">Ahmedabad - Bodakdev (Ward 14)</option>
                      <option value="Maninagar (Ward 22)">Ahmedabad - Maninagar (Ward 22)</option>
                      <option value="Adajan & Pal (Ward 10)">Surat - Adajan (Ward 10)</option>
                      <option value="Alkapuri (Ward 7)">Vadodara - Alkapuri (Ward 7)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notification & Governance Preferences */}
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Notification Channels & Geo-Fencing
                </h4>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">SMS Triage Updates</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive instant SMS on ticket dispatch and resolution</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsAlerts}
                      onChange={(e) => setSmsAlerts(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-900 dark:text-white focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">WhatsApp Photo Proofs</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive Before & After geotagged photos directly on WhatsApp</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={whatsappUpdates}
                      onChange={(e) => setWhatsappUpdates(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-900 dark:text-white focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">Automated Twilio IVR Verification Calls</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Trigger citizen voice call to confirm grievance satisfaction</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={ivrSimulation}
                      onChange={(e) => setIvrSimulation(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-900 dark:text-white focus:ring-0"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <div>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white">Strict Geo-Fence Precision (&le; 100m)</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Enforce satellite Haversine triangulation on camera captures</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={highPrecisionGps}
                      onChange={(e) => setHighPrecisionGps(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-900 dark:text-white focus:ring-0"
                    />
                  </label>
                </div>
              </div>

              {/* Language & Theme */}
              <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Interface Preferences
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">Language</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLanguage(language === 'en' ? 'gu' : 'en')}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-900 dark:text-white"
                    >
                      {language === 'en' ? 'English (EN)' : 'ગુજરાતી (GU)'}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isDark ? <Moon className="w-4 h-4 text-sky-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">Theme</span>
                    </div>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-900 dark:text-white"
                    >
                      {isDark ? 'Dark Mode' : 'Light Mode'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" type="submit" className="w-full">
                  Save All Settings
                </Button>
              </div>
            </form>
          )}

          {/* TAB 3: KARMA & BADGES ("Things to Card") */}
          {activeTab === 'BADGES' && (
            <div className="space-y-6">
              {/* XP Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                    <Flame className="w-6 h-6 fill-slate-950 text-slate-950" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {user.xp} Total Civic Karma XP
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Level {user.level} • {150 - (user.xp % 150)} XP to Next Civic Tier
                    </p>
                  </div>
                </div>
                <div className="text-right font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                  {user.streak} Day Streak 🔥
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>Progress to Level {user.level + 1}</span>
                  <span>{Math.round(((user.xp % 150) / 150) * 100)}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.round(((user.xp % 150) / 150) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Badges Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Unlocked Municipal Badges
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                      🦅
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Eagle Eye Sentinel</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Reported 5+ verified road & sanitation hazards with 99% accuracy</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-blue-950 text-sky-700 dark:text-sky-400 flex items-center justify-center font-bold shrink-0">
                      🛡️
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Ward Guardian</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Top 5% active civic contributor in Navrangpura Ward 12</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 flex items-center justify-center font-bold shrink-0">
                      ⚡
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Rapid Verifier</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Confirmed resolution via IVR phone prompt within 30 minutes</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold shrink-0">
                      🏆
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Civic Champion</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Earned 400+ Karma XP on Gujarat Municipal Governance Grid</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SWITCH ROLE / AUTHENTICATION */}
          {activeTab === 'ROLES' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Instant Stakeholder Portal Switching
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Citizen Role */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange('citizen')}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-32 ${
                      role === 'citizen'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <User className="w-5 h-5" />
                      {role === 'citizen' && <span className="text-[10px] font-mono font-bold">CURRENT</span>}
                    </div>
                    <div>
                      <p className="font-bold text-xs">1. Citizen Portal</p>
                      <p className={`text-[10px] ${role === 'citizen' ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                        Report & Track Grievances
                      </p>
                    </div>
                  </button>

                  {/* Officer Role */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange('officer')}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-32 ${
                      role === 'officer'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Building2 className="w-5 h-5" />
                      {role === 'officer' && <span className="text-[10px] font-mono font-bold">CURRENT</span>}
                    </div>
                    <div>
                      <p className="font-bold text-xs">2. Field Officer</p>
                      <p className={`text-[10px] ${role === 'officer' ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                        GPS Proof & Dispatch Queue
                      </p>
                    </div>
                  </button>

                  {/* Admin Role */}
                  <button
                    type="button"
                    onClick={() => handleRoleChange('admin')}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-32 ${
                      role === 'admin'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Shield className="w-5 h-5" />
                      {role === 'admin' && <span className="text-[10px] font-mono font-bold">CURRENT</span>}
                    </div>
                    <div>
                      <p className="font-bold text-xs">3. Admin Command</p>
                      <p className={`text-[10px] ${role === 'admin' ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
                        City Heatmap & Integrity
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Secure Log Out Section */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Session Security</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Sign out and clear local cached session credentials</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  leftIcon={<LogOut className="w-4 h-4 text-rose-500" />}
                  className="border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                >
                  Sign Out Session
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="font-mono text-[11px]">Tark Shaastra Governance Platform • AMC v2.4</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-900 dark:text-white hover:underline"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
