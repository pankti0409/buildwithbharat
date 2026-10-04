import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './Button';
import { ProfileModal } from './ProfileModal';
import { 
  ShieldCheck, 
  MapPin, 
  Camera, 
  FileText, 
  Map, 
  Award, 
  HelpCircle, 
  Flame, 
  Menu, 
  X, 
  LogOut, 
  Settings, 
  QrCode, 
  ChevronDown, 
  HardHat, 
  Shield, 
  User,
  LayoutDashboard, 
  Kanban, 
  Table, 
  BarChart3, 
  Globe2, 
  ShieldAlert, 
  Users, 
  PhoneCall,
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileTab, setProfileTab] = useState<'CARD' | 'SETTINGS' | 'BADGES' | 'ROLES'>('CARD');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const openProfile = (tab: 'CARD' | 'SETTINGS' | 'BADGES' | 'ROLES' = 'CARD') => {
    setProfileTab(tab);
    setProfileModalOpen(true);
    setUserDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/auth');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Brand Identity with consistent sleek styling across all identities */}
            <Link
              to={role === 'citizen' ? '/citizen' : role === 'officer' ? '/department' : role === 'admin' ? '/admin' : '/'}
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-xs group-hover:bg-slate-800 dark:group-hover:bg-slate-100 transition-colors">
                <ShieldCheck className="w-5 h-5 text-white dark:text-slate-900" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                    Tark Shaastra
                  </span>
                  {user && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      {role === 'citizen' ? 'Citizen' : role === 'officer' ? 'Field Officer' : 'Admin Command'}
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-gujarati text-slate-500 dark:text-slate-400 -mt-0.5">
                  {role === 'citizen'
                    ? 'નાગરિક પોર્ટલ • અમદાવાદ'
                    : role === 'officer'
                    ? 'ક્ષેત્રિય ઈજનેર • માર્ગ અને પુલ વિભાગ'
                    : role === 'admin'
                    ? 'મ્યુનિસિપલ વહીવટી કમાન્ડ સેન્ટર'
                    : 'તર્ક શાસ્ત્ર • પબ્લિક ગ્રીવન્સ'}
                </p>
              </div>
            </Link>

            {/* Center: Strict Role Navigation with uniform active & resting styling */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
              {/* Citizen Navigation */}
              {user && role === 'citizen' && (
                <>
                  <Link
                    to="/citizen"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/citizen'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/citizen/report"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      location.pathname === '/citizen/report'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 text-slate-500" />
                    <span>Report Issue</span>
                  </Link>
                  <Link
                    to="/citizen/complaints"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/citizen/complaints'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    My Reports
                  </Link>
                  <Link
                    to="/citizen/map"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/citizen/map'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Ward Map
                  </Link>
                  <Link
                    to="/citizen/rewards"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/citizen/rewards'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Rewards & XP
                  </Link>
                  <Link
                    to="/citizen/help"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/citizen/help'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Voice Help
                  </Link>
                </>
              )}

              {/* Department Officer Navigation */}
              {user && role === 'officer' && (
                <>
                  <Link
                    to="/department"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/department'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Department Overview
                  </Link>
                  <Link
                    to="/department/queue"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/department/queue'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Work Queue (Kanban & Table)
                  </Link>
                  <Link
                    to="/department/performance"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/department/performance'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Officer Performance
                  </Link>
                </>
              )}

              {/* Admin Navigation */}
              {user && role === 'admin' && (
                <>
                  <Link
                    to="/admin"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/admin'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Command Overview
                  </Link>
                  <Link
                    to="/admin/complaints"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/admin/complaints'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Master Table
                  </Link>
                  <Link
                    to="/admin/departments"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/admin/departments'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Departments
                  </Link>
                  <Link
                    to="/admin/heatmap"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/admin/heatmap'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Heatmap
                  </Link>
                  <Link
                    to="/admin/fraud"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/admin/fraud'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Fraud Sentinel
                  </Link>
                  <Link
                    to="/admin/ivr"
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      location.pathname === '/admin/ivr'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    IVR Monitor
                  </Link>
                </>
              )}

              {/* Public/Unauthenticated Links */}
              {!user && (
                <>
                  <Link
                    to="/"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Home
                  </Link>
                  <Link
                    to="/auth?role=citizen"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Citizen Portal
                  </Link>
                  <Link
                    to="/auth?role=officer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Department Portal
                  </Link>
                  <Link
                    to="/auth?role=admin"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Admin Command
                  </Link>
                </>
              )}
            </nav>

            {/* Right: Controls & User Profile with cohesive slate tones */}
            <div className="hidden sm:flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />

              {user ? (
                <div className="relative pl-2 border-l border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  {role === 'citizen' && (
                    <button
                      onClick={() => openProfile('BADGES')}
                      title="View Karma XP & Badges"
                      className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 px-2 py-1 rounded-lg text-xs font-semibold font-mono hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
                    >
                      <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      <span>{user.xp} XP</span>
                    </button>
                  )}

                  {/* Profile Menu Trigger */}
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 p-1 pl-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs transition-all cursor-pointer group text-left"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {user.name.split(' ')[0]}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">{role}</p>
                      </div>
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-7 h-7 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors mr-1" />
                    </button>

                    {/* Clean User Dropdown */}
                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                        <div className="p-2 border-b border-slate-100 dark:border-slate-700">
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email || user.ward}</p>
                        </div>

                        <div className="py-1 space-y-0.5">
                          <button
                            onClick={() => openProfile('CARD')}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                          >
                            <QrCode className="w-4 h-4 text-slate-500" />
                            <span>Digital ID Pass</span>
                          </button>

                          <button
                            onClick={() => openProfile('SETTINGS')}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                          >
                            <Settings className="w-4 h-4 text-slate-500" />
                            <span>Account Settings</span>
                          </button>
                        </div>

                        <div className="pt-1 border-t border-slate-100 dark:border-slate-700">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  Portal Sign In
                </Button>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-white"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl space-y-4 animate-in slide-in-from-top-2">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-mono">{role}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-rose-600">
                    Log Out
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="primary" size="md" onClick={() => { setMobileMenuOpen(false); navigate('/auth'); }} className="w-full">
                Portal Sign In
              </Button>
            )}
          </div>
        )}
      </header>

      {/* Universal Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        defaultTab={profileTab}
      />
    </>
  );
};
