import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { Complaint } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusChip } from '../../components/common/StatusChip';
import { Skeleton } from '../../components/common/Skeleton';
import { 
  Camera, 
  MapPin, 
  ThumbsUp, 
  Flame, 
  Award, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';

export const CitizenHome: React.FC = () => {
  const { user, updateUserXp } = useAuth();
  const { t, language } = useTranslation();
  const { success } = useToast();
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      const data = await api.getComplaints();
      setComplaints(data);
      setLoading(false);
    };
    fetchComplaints();
  }, []);

  const handleUpvote = async (c: Complaint, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = await api.upvoteComplaint(c.id, user?.id || 'anon');
    setComplaints((prev) => prev.map((item) => (item.id === c.id ? updated : item)));
    if (updated.hasUpvoted) {
      updateUserXp(15);
      success('Issue Upvoted (+15 XP)', `You boosted priority for ${c.ticketNumber}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Welcome & Ward Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>{user?.ward || 'Navrangpura (Ward 12), Ahmedabad'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Citizen'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Report civic issues in your neighborhood with real-time GPS telemetry and earn municipal Karma XP for every genuine verification.
            </p>
          </div>

          {/* Quick Karma Stats Chip */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center min-w-[130px]">
              <div className="flex items-center justify-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold text-lg">
                <Flame className="w-4 h-4 fill-amber-500" />
                <span>{user?.xp || 420} XP</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-0.5">
                Level {user?.level || 3} • Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Fast Action Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card
          hover
          onClick={() => navigate('/citizen/report')}
          className="cursor-pointer bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 relative overflow-hidden group shadow-xs"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                GEO-VERIFIED CAM
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Report Issue with GPS Camera
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Auto-classifies category & locks GPS watermark
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Camera className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card
          hover
          onClick={() => navigate('/citizen/map')}
          className="cursor-pointer bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 relative overflow-hidden group shadow-xs"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                WARD RADAR
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Explore Community Live Map
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                View nearby issues, upvote & track field teams
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0 border border-slate-200 dark:border-slate-700">
              <MapPin className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* 3. Nearby Grievances Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Neighborhood Grievances</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Issues reported within 2 km of your location</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/citizen/map')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            View Map Pins
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton height={200} />
            <Skeleton height={200} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complaints.slice(0, 4).map((c) => (
              <Card
                key={c.id}
                hover
                onClick={() => navigate(`/citizen/complaints?id=${c.id}`)}
                className="cursor-pointer bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <StatusChip status={c.status} size="sm" />
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{c.ticketNumber}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2.5 line-clamp-1">
                    {language === 'gu' ? c.titleGu : c.title}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {language === 'gu' ? c.descriptionGu : c.description}
                  </p>

                  {/* Photo Preview */}
                  <div className="mt-3 relative rounded-xl overflow-hidden aspect-16/9 border border-slate-200 dark:border-slate-800">
                    <img
                      src={c.photoBeforeUrl}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-slate-950/80 backdrop-blur-xs text-white rounded text-[9px] font-mono">
                      GPS ±{c.complaintLocation.accuracyMeters}m
                    </div>
                  </div>
                </div>

                {/* Footer with upvote button */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="truncate max-w-[160px]">{c.complaintLocation.address}</span>
                  <button
                    onClick={(e) => handleUpvote(c, e)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                      c.hasUpvoted
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${c.hasUpvoted ? 'fill-current' : ''}`} />
                    <span>{c.upvotes}</span>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
