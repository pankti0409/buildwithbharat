import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { ProfileModal } from '../../components/common/ProfileModal';
import { 
  Home, 
  PlusCircle, 
  FileText, 
  Map, 
  Award, 
  HelpCircle, 
  Flame, 
  PhoneCall, 
  ShieldCheck,
  Camera,
  Plus,
  Settings,
  QrCode,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const CitizenLayout: React.FC = () => {
  const { user, role, switchRole } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileTab, setProfileTab] = useState<'CARD' | 'SETTINGS' | 'BADGES' | 'ROLES'>('CARD');

  const navItems = [
    { path: '/citizen', label: 'Home', icon: Home },
    { path: '/citizen/report', label: 'Report Issue', icon: Camera, isAction: true },
    { path: '/citizen/complaints', label: 'My Reports', icon: FileText },
    { path: '/citizen/map', label: 'Live Map', icon: Map },
    { path: '/citizen/rewards', label: 'Rewards', icon: Award },
    { path: '/citizen/help', label: 'Voice Help', icon: HelpCircle },
  ];

  const isActive = (p: string) => {
    if (p === '/citizen') return location.pathname === '/citizen';
    return location.pathname.startsWith(p);
  };

  const openProfileModal = (tab: 'CARD' | 'SETTINGS' | 'BADGES' | 'ROLES' = 'CARD') => {
    setProfileTab(tab);
    setProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-canvas dark:bg-canvas-dark flex flex-col md:flex-row pb-20 md:pb-0 transition-colors">
      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 sticky top-16 sm:top-20 h-[calc(100vh-80px)]">
        {/* User Civic Karma Card */}
        {user && (
          <div 
            onClick={() => openProfileModal('CARD')}
            className="p-3.5 mb-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 cursor-pointer transition-all group"
            title="Click to view Digital Civic ID Card & Settings"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                Citizen ID Pass
              </span>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white flex items-center gap-1">
                <QrCode className="w-3 h-3" />
                <span>View Card</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shadow-2xs group-hover:border-slate-400 dark:group-hover:border-slate-500 transition-colors"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {user.name}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="flex items-center text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 px-1.5 py-0.5 rounded">
                    <Flame className="w-3 h-3 text-amber-600 fill-amber-500 mr-1" />
                    {user.xp} XP
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Lvl {user.level}</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 truncate flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>{user.ward}</span>
            </p>
          </div>
        )}

        {/* Navigation items */}
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-xs'
                    : item.isAction
                    ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-white dark:text-slate-950' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.isAction && !active && (
                  <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-slate-900 dark:bg-white text-white dark:text-slate-950">
                    + New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Emergency IVR Hotline Quick Button */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => navigate('/citizen/help')}
            className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-left hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>Voice Hotline 1800</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Keypad Dial 1800-TARK-78</p>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 flex justify-around items-center shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[44px] px-1 rounded-xl transition-colors ${
                item.isAction
                  ? 'text-white'
                  : active
                  ? 'text-slate-900 dark:text-white font-bold'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {item.isAction ? (
                <div className="w-9 h-9 -mt-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-md border-2 border-white dark:border-slate-900">
                  <Icon className="w-4 h-4" />
                </div>
              ) : (
                <Icon className="w-4 h-4" />
              )}
              <span className={`text-[10px] mt-0.5 ${active ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Universal Profile & Settings Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        defaultTab={profileTab}
      />
    </div>
  );
};

