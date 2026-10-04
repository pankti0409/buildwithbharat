import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { ProfileModal } from '../../components/common/ProfileModal';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  Table, 
  BarChart3, 
  ShieldAlert, 
  Users, 
  PhoneCall, 
  Globe2
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, role } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const navItems = [
    { path: '/admin', label: 'Command Overview', icon: LayoutDashboard },
    { path: '/admin/complaints', label: 'Master Table & Inspector', icon: Table },
    { path: '/admin/departments', label: 'Department Ranking', icon: BarChart3 },
    { path: '/admin/heatmap', label: 'City Heatmap', icon: Globe2 },
    { path: '/admin/fraud', label: 'Fraud & Integrity', icon: ShieldAlert },
    { path: '/admin/officers', label: 'Officer Roster', icon: Users },
    { path: '/admin/ivr', label: 'Voice IVR Monitor', icon: PhoneCall },
  ];

  const isActive = (p: string) => {
    if (p === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(p);
  };

  return (
    <div className="min-h-screen bg-canvas dark:bg-canvas-dark transition-colors">
      {/* Top Admin Command Sub-Header */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-16 sm:top-20 z-30 shadow-2xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center border border-slate-200 dark:border-slate-700">
                <ShieldCheck className="w-5 h-5 text-slate-800 dark:text-slate-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                    Municipal Administration Command Center
                  </h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800/40">
                    OPERATIONAL
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {role === 'admin' ? user?.name || 'Commissioner S. Mehta (IAS)' : 'Commissioner S. Mehta (IAS)'} • Gujarat Municipal Grid
                </p>
              </div>
            </div>

            {/* Right cluster: Live System Counter & IAS Credential */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-bold shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors cursor-pointer"
                title="View IAS Master Credential & Command Settings"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-white dark:text-slate-900" />
                <span>IAS Credential</span>
              </button>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-mono font-semibold border border-slate-200 dark:border-slate-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>38 Wards Active</span>
              </div>
            </div>
          </div>

          {/* Sub Navigation Bar */}
          <div className="flex items-center gap-1 pt-1 overflow-x-auto">
            {navItems.map((tab) => {
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

      {/* Admin Content Area */}
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
