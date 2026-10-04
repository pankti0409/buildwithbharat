import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { Card } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { 
  Award, 
  Flame, 
  ShieldCheck, 
  Trophy, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Zap, 
  Star
} from 'lucide-react';

export const DepartmentPerformance: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const officerBadges = [
    { title: 'Zero Backlog Master', desc: 'Cleared 100% of pending tickets in under 24 hours.', icon: ShieldCheck, color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/40' },
    { title: 'Geo Precision Elite', desc: '40 consecutive resolutions within <20m of complaint pin.', icon: Target, color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/40' },
    { title: 'Citizen Commended', desc: 'Maintained >98% positive IVR call verification score.', icon: Star, color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/40' },
  ];

  const departmentLeaderboard = [
    { rank: 1, name: 'Rajesh Solanki (You)', ward: 'Navrangpura', resolved: 42, score: '98.4%', streak: 19 },
    { rank: 2, name: 'Kiran Parmar', ward: 'Bodakdev', resolved: 39, score: '97.1%', streak: 26 },
    { rank: 3, name: 'Hardik Shah', ward: 'Alkapuri', resolved: 34, score: '95.8%', streak: 14 },
    { rank: 4, name: 'K. R. Varma', ward: 'Adajan', resolved: 28, score: '92.5%', streak: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Officer Gamification Banner */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
              OFFICER EFFICIENCY & REPUTATION SCORE
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Officer Grade A+ • Rank #1 in Ahmedabad West
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              Performance is computed strictly from verified geo-fence proof submissions and positive citizen IVR confirmation calls.
            </p>

            {/* Monthly Target Progress */}
            <div className="pt-3 max-w-md">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Monthly Resolution Target</span>
                <span className="font-mono text-slate-900 dark:text-white">42 / 50 Resolved (84%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div
                  className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-500"
                  style={{ width: '84%' }}
                />
              </div>
            </div>
          </div>

          {/* Officer Streak Card */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 text-amber-600 flex items-center justify-center mb-2 shadow-2xs">
              <Flame className="w-6 h-6 fill-amber-500 animate-bounce" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">19 Days</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Zero-SLA-Breach Streak 🔥</p>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Resolved This Month" value="42" icon={CheckCircle2} color="mint" />
        <StatCard title="Avg Turnaround SLA" value="16.5 hrs" icon={Zap} color="sky" />
        <StatCard title="IVR Approval Rate" value="98.4%" icon={Star} color="butter" />
        <StatCard title="Geo-Accuracy Score" value="100%" icon={Target} color="lavender" />
      </div>

      {/* Officer Badges Showcase */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Earned Officer Honors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {officerBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <Card key={idx} hover className="p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-xs">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${badge.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{badge.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">{badge.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Department Officer Leaderboard */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Municipal Field Officer Rankings</span>
        </h2>

        <Card className="p-0 overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Rank</th>
                <th className="p-3.5">Officer</th>
                <th className="p-3.5">Ward</th>
                <th className="p-3.5">Resolved Tasks</th>
                <th className="p-3.5">Accuracy Score</th>
                <th className="p-3.5">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {departmentLeaderboard.map((off) => (
                <tr key={off.rank} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${off.rank === 1 ? 'bg-sky-50/20 dark:bg-sky-950/20 font-bold' : ''}`}>
                  <td className="p-3.5">
                    <span className={`w-5 h-5 rounded-md inline-flex items-center justify-center text-[10px] font-bold ${
                      off.rank === 1 ? 'bg-amber-400 text-amber-950 shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {off.rank}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">{off.name}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">{off.ward}</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-700 dark:text-emerald-400">{off.resolved}</td>
                  <td className="p-3.5 font-mono text-sky-700 dark:text-sky-400">{off.score}</td>
                  <td className="p-3.5 font-mono text-amber-600 dark:text-amber-400">🔥 {off.streak}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
