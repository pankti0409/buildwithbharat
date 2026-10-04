import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { RoleSwitcher } from './RoleSwitcher';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './Button';
import { ProfileModal } from './ProfileModal';
import { 
  ShieldCheck, 
  MapPin, 
  PlusCircle, 
  LayoutDashboard, 
  Award, 
  PhoneCall, 
  Menu, 
  X,
  User,
  LogOut,
  Flame,
  Settings,
  QrCode,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, role, logout } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileDefaultTab, setProfileDefaultTab] = useState<'CARD' | 'SETTINGS' | 'BADGES' | 'ROLES'>('CARD');

  const openProfile = (tab: 'CARD' | 'SETTINGS' | 'BADGES' | 'ROLES' = 'CARD') => {
    setProfileDefaultTab(tab);
    setProfileModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-sm group-hover:bg-slate-800 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                    Tark Shaastra
                  </span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider font-mono">
                    Civic AI
                  </span>
                </div>
                <p className="text-[11px] font-gujarati text-slate-500 dark:text-slate-400 -mt-0.5">તર્ક શાસ્ત્ર • પબ્લિક ગ્રીવન્સ</p>
              </div>
            </Link>

            {/* Center Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              <Link
                to="/citizen"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  location.pathname.startsWith('/citizen')
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Citizen Portal
              </Link>

              <Link
                to="/department"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  location.pathname.startsWith('/department')
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Department Queue
              </Link>

              <Link
                to="/admin"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Admin Command
              </Link>
            </nav>

            {/* Right Action Cluster */}
            <div className="hidden lg:flex items-center gap-2.5">
              <RoleSwitcher />
              <LanguageSwitcher />
              <ThemeToggle />

              {user ? (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                  {role === 'citizen' && (
                    <button
                      onClick={() => openProfile('BADGES')}
                      title="View Karma XP & Badges"
                      className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 px-2 py-1 rounded-lg text-xs font-semibold font-mono hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors cursor-pointer"
                    >
                      <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      <span>{user.xp} XP</span>
                    </button>
                  )}

                  {/* Profile & Settings Trigger Pill */}
                  <button
                    onClick={() => openProfile('CARD')}
                    className="flex items-center gap-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 p-1 pl-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs transition-all cursor-pointer group text-left"
                    title="Open Profile, Settings & Digital ID Card"
                  >
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {user.name}
                        </p>
                        <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">{role}</p>
                    </div>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-lg object-cover border border-slate-200 dark:border-slate-700 group-hover:border-emerald-500 transition-colors"
                    />
                  </button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  {t('nav.login')}
                </Button>
              )}
            </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-2xl bg-white dark:bg-surface-darkMuted border border-ink-border dark:border-surface-darkBorder flex items-center justify-center text-ink dark:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl space-y-4 animate-in slide-in-from-top-2">
          <div className="pt-2">
            <RoleSwitcher />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Link
              to="/citizen"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            >
              Citizen
            </Link>
            <Link
              to="/department"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            >
              Officer
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold"
            >
              Admin
            </Link>
          </div>

          {user && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div 
                onClick={() => {
                  setMobileMenuOpen(false);
                  openProfile('CARD');
                }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{user.ward}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-white font-bold">
                  {user.xp} XP
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openProfile('SETTINGS');
                  }}
                  leftIcon={<Settings className="w-3.5 h-3.5" />}
                  className="w-full"
                >
                  Settings
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openProfile('CARD');
                  }}
                  leftIcon={<QrCode className="w-3.5 h-3.5" />}
                  className="w-full"
                >
                  Digital ID
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>

    {/* Universal Profile & Settings Modal */}
    <ProfileModal
      isOpen={profileModalOpen}
      onClose={() => setProfileModalOpen(false)}
      defaultTab={profileDefaultTab}
    />
  </>
  );
};
