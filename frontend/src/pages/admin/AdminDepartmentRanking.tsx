import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Department } from '../../types';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { BarChart3, TrendingUp, Clock, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminDepartmentRanking: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const d = await api.getDepartments();
      setDepartments(d);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Department Performance & SLA League Table
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Comparative analysis of turnaround speed, citizen satisfaction, and reopen rates across municipal wings
        </p>
      </div>

      {/* Grid of Department Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, idx) => (
          <Card key={dept.id} hover className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center shadow-xs">
                  #{idx + 1}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                  Grade A
                </span>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-2xs"
                  style={{ backgroundColor: dept.color }}
                >
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{dept.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{dept.headName}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Avg Speed:</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{dept.avgResolutionHours} hrs</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">SLA Benchmark:</span>
                  <p className="font-bold text-slate-900 dark:text-white font-mono">{dept.slaHours} hrs</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Resolved Count:</span>
                  <p className="font-bold text-slate-900 dark:text-white font-mono">{dept.resolvedCount} issues</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Citizen Reopen %:</span>
                  <p className="font-bold text-amber-600 dark:text-amber-400 font-mono">{dept.reopenRate}%</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Backlog: {dept.activeCount} tasks</span>
              <span className="text-purple-600 dark:text-purple-400 font-bold">100% Geo-Compliant</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
