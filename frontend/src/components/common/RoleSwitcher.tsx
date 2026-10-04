import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Role } from '../../types';
import { UserCheck, Shield, Award } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSwitch = (newRole: Role) => {
    switchRole(newRole);
    if (newRole === 'citizen') navigate('/citizen');
    else if (newRole === 'officer') navigate('/department');
    else if (newRole === 'admin') navigate('/admin');
  };

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-2xs">
      <button
        onClick={() => handleSwitch('citizen')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          role === 'citizen'
            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        title="Switch to Citizen Portal"
      >
        <UserCheck className="w-3.5 h-3.5" />
        <span>Citizen</span>
      </button>

      <button
        onClick={() => handleSwitch('officer')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          role === 'officer'
            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        title="Switch to Department Officer Portal"
      >
        <Award className="w-3.5 h-3.5" />
        <span>Officer</span>
      </button>

      <button
        onClick={() => handleSwitch('admin')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          role === 'admin'
            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
        title="Switch to Municipal Admin Portal"
      >
        <Shield className="w-3.5 h-3.5" />
        <span>Admin</span>
      </button>
    </div>
  );
};
