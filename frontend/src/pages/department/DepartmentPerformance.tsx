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
    { title: 'Zero Backlog Master', desc: 'Cleared 100% of pending tickets in under 24 hours.', icon: ShieldCheck, color: '#8B7CF6' },
    { title: 'Geo Precision Elite', desc: '40 consecutive resolutions within <20m of complaint pin.', icon: Target, color: '#7ED9B8' },
    { title: 'Citizen Commended', desc: 'Maintained >98% positive IVR call verification score.', icon: Star, color: '#FFE29A' },
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
      <div className="rounded-3xl bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 border border-sky/30 p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <span className="text-xs font-bold text-sky-dark uppercase tracking-widest font-mono">
              OFFICER EFFICIENCY & REPUTATION SCORE
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Officer Grade A+ • Rank #1 in Ahmedabad West
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary max-w-lg">
              Performance is computed strictly from verified geo-fence proof submissions and positive citizen IVR confirmation calls.
            </p>

            {/* Monthly Target Progress */}
            <div className="pt-3 max-w-md">
              <div className="flex justify-between text-xs font-bold text-ink mb-1">
                <span>Monthly Resolution Target</span>
                <span className="font-mono text-sky-dark">42 / 50 Resolved (84%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white border border-ink-border overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky to-blue-600 rounded-full"
                  style={{ width: '84%' }}
                />
              </div>
            </div>
          </div>

          {/* Officer Streak Card */}
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-ink-border shadow-soft text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 shadow-2xs">
              <Flame className="w-8 h-8 fill-amber-500 animate-bounce" />
            </div>
            <h3 className="text-2xl font-extrabold text-ink">19 Days</h3>
            <p className="text-xs text-ink-muted mt-0.5">Zero-SLA-Breach Streak 🔥</p>
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
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-ink">Earned Officer Honors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {officerBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <Card key={idx} hover className="p-5 bg-white border-ink-border flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs"
                  style={{ backgroundColor: `${badge.color}25`, color: badge.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink">{badge.title}</h3>
                  <p className="text-xs text-ink-secondary mt-1">{badge.desc}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Department Officer Leaderboard */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-ink flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Municipal Field Officer Rankings</span>
        </h2>

        <Card className="p-0 overflow-hidden bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-ink-border text-ink-secondary font-bold uppercase text-[10px]">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Officer</th>
                <th className="p-4">Ward</th>
                <th className="p-4">Resolved Tasks</th>
                <th className="p-4">Accuracy Score</th>
                <th className="p-4">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-border text-ink">
              {departmentLeaderboard.map((off) => (
                <tr key={off.rank} className={`hover:bg-ink-light/50 ${off.rank === 1 ? 'bg-sky-50/30 font-bold' : ''}`}>
                  <td className="p-4">
                    <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-bold ${
                      off.rank === 1 ? 'bg-amber-400 text-amber-950' : 'bg-ink-light text-ink-muted'
                    }`}>
                      {off.rank}
                    </span>
                  </td>
                  <td className="p-4 font-bold">{off.name}</td>
                  <td className="p-4 text-ink-secondary">{off.ward}</td>
                  <td className="p-4 font-mono font-bold text-emerald-700">{off.resolved}</td>
                  <td className="p-4 font-mono text-sky-dark">{off.score}</td>
                  <td className="p-4 font-mono text-amber-600">🔥 {off.streak}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};
