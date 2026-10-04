import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { ProfileModal } from '../../components/common/ProfileModal';
import { 
  Building2, 
  Kanban, 
  Award, 
  Flame, 
  ShieldCheck, 
  Clock, 
  UserCheck, 
  LayoutDashboard,
  CheckCircle2,
  QrCode,
  Settings
} from 'lucide-react';

export const DepartmentLayout: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const navLinks = [
    { path: '/department', label: 'Department Overview', icon: LayoutDashboard },
    { path: '/department/queue', label: 'Work Queue (Kanban & Table)', icon: Kanban },
    { path: '/department/performance', label: 'Officer Gamification', icon: Award },
  ];

  const isActive = (p: string) => {
    if (p === '/department') return location.pathname === '/department';
    return location.pathname.startsWith(p);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Department Portal Sub-Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 sm:top-20 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-3">
            {/* Left: Department & Officer Identity */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center font-bold border border-slate-200 dark:border-slate-700">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">Roads & Bridges Department (Ahmedabad West)</h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/40">
                    ON DUTY
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Officer: <b className="text-slate-800 dark:text-slate-200">{user?.name || 'Rajesh Solanki'}</b> • Navrangpura & Stadium Wards
                </p>
              </div>
            </div>

            {/* Right: Quick Metrics Strip */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
                title="View Official Officer Smart Badge & Settings"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                <span>Officer Badge</span>
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                <Clock className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>SLA: 24h</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-bold font-mono">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                <span>19 Day Streak</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 pt-1 overflow-x-auto">
            {navLinks.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.path);

              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`flex items-center gap-2 px-3.5 py-2 border-b-2 text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'border-slate-900 dark:border-white text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/40'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Viewport */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>

      {/* Universal Profile & Settings Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        defaultTab="CARD"
      />
    </div>
  );
};
