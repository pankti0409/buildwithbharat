import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { CIVIC_BADGES, CIVIC_REWARDS } from '../../services/api';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  Gift, 
  Eye, 
  PhoneCall, 
  Zap, 
  Lock
} from 'lucide-react';

export const CitizenRewards: React.FC = () => {
  const { user, updateUserXp } = useAuth();
  const { t, language } = useTranslation();
  const { success, error } = useToast();

  const [rewards, setRewards] = useState(CIVIC_REWARDS);

  const leaderboard = [
    { rank: 1, name: 'Aarav Patel (You)', ward: 'Navrangpura', xp: user?.xp || 420, badges: 3, avatar: user?.avatar },
    { rank: 2, name: 'Bhavik Shah', ward: 'Bodakdev', xp: 380, badges: 2, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
    { rank: 3, name: 'Priya Joshi', ward: 'Satellite', xp: 310, badges: 2, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
    { rank: 4, name: 'Devansh Desai', ward: 'Alkapuri', xp: 260, badges: 1, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80' },
  ];

  const handleClaimReward = (rewId: string, cost: number) => {
    if ((user?.xp || 0) < cost) {
      error('Insufficient Karma XP', `You need ${cost - (user?.xp || 0)} more XP to redeem this voucher`);
      return;
    }

    updateUserXp(-cost);
    setRewards((prev) => prev.map((r) => (r.id === rewId ? { ...r, claimed: true } : r)));
    success('Voucher Claimed!', 'Your digital QR coupon has been saved to your profile.');

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0F172A', '#059669', '#0284C7', '#D97706'],
    });
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Eye':
        return <Eye className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Karma Header Banner */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
              CIVIC KARMA & GAMIFICATION
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Level {user?.level || 3} • Ward Champion
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed">
              Earn XP by submitting GPS-accurate reports, answering IVR verification calls, and upvoting community priorities.
            </p>

            {/* Level XP Progress bar */}
            <div className="pt-3 max-w-md">
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Current Progress</span>
                <span className="font-mono text-slate-900 dark:text-white">{user?.xp || 420} / 600 XP to Level 4</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div
                  className="h-full bg-slate-900 dark:bg-white rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, ((user?.xp || 420) % 150) / 1.5)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Big Streak Card */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 text-amber-600 flex items-center justify-center mb-2 shadow-2xs">
              <Flame className="w-6 h-6 fill-amber-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{user?.streak || 6} Days</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Active Civic Streak 🔥</p>
          </div>
        </div>
      </div>

      {/* 2. Civic Badges Showcase */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Unlocked Civic Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {CIVIC_BADGES.map((badge) => {
            const isUnlocked = badge.unlockedAt;
            return (
              <Card
                key={badge.id}
                hover
                className={`p-5 flex flex-col justify-between border ${
                  isUnlocked ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 opacity-70'
                }`}
              >
                <div>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 shadow-2xs border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {getBadgeIcon(badge.icon)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {language === 'gu' ? badge.titleGu : badge.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {language === 'gu' ? badge.descriptionGu : badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  {isUnlocked ? (
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{badge.progressPercentage}% In Progress</span>
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 3. Municipal Rewards Catalog */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Redeem Municipal Rewards</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Exchange Karma XP for transit and city benefits</p>
          </div>
          <span className="text-xs font-semibold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/40 px-3 py-1 rounded-lg font-mono">
            Available: {user?.xp || 420} XP
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rewards.map((reward) => (
            <Card key={reward.id} hover className="overflow-hidden p-0 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs">
              <div>
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="w-full h-36 object-cover"
                />
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                    {reward.partnerName}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                    {language === 'gu' ? reward.titleGu : reward.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Button
                  variant={reward.claimed ? 'outline' : 'primary'}
                  size="md"
                  disabled={reward.claimed}
                  onClick={() => handleClaimReward(reward.id, reward.costXp)}
                  className="w-full text-xs"
                >
                  {reward.claimed ? '✓ Voucher Claimed' : `Redeem for ${reward.costXp} XP`}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. Ward Citizen Leaderboard */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Navrangpura Ward Leaderboard</span>
        </h2>

        <Card className="p-0 overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {leaderboard.map((item) => (
              <div
                key={item.rank}
                className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                  item.rank === 1 ? 'bg-amber-50/30 dark:bg-amber-950/20' : ''
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                    item.rank === 1
                      ? 'bg-amber-400 text-amber-950 shadow-xs'
                      : item.rank === 2
                      ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {item.rank}
                  </span>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.ward} Ward</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-right">
                  <div className="text-xs sm:text-sm font-bold text-amber-700 dark:text-amber-400 font-mono">
                    {item.xp} XP
                  </div>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-semibold border border-slate-200 dark:border-slate-700">
                    {item.badges} Badges
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
