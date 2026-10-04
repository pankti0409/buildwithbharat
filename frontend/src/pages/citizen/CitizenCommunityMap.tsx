import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../services/api';
import { Complaint, Category } from '../../types';
import { MapComponent } from '../../components/common/MapComponent';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusChip } from '../../components/common/StatusChip';
import { Drawer } from '../../components/common/Drawer';
import { 
  MapPin, 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  Filter, 
  Layers, 
  Sparkles,
  Search
} from 'lucide-react';

export const CitizenCommunityMap: React.FC = () => {
  const { user, updateUserXp } = useAuth();
  const { t, language } = useTranslation();
  const { success } = useToast();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [radiusMeters, setRadiusMeters] = useState<number>(2000);
  const [categoryFilter, setCategoryFilter] = useState<Category | 'ALL'>('ALL');
  const [newComment, setNewComment] = useState('');

  const userCoords = {
    lat: 23.0378,
    lng: 72.5621,
    accuracyMeters: 4.2,
    address: 'Navrangpura, Ahmedabad',
    ward: 'Navrangpura (Ward 12)',
    zone: 'West Zone',
    city: 'Ahmedabad',
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await api.getComplaints();
      setComplaints(data);
    };
    fetch();
  }, []);

  const filteredComplaints = complaints.filter((c) => {
    if (categoryFilter !== 'ALL' && c.category !== categoryFilter) return false;
    return true;
  });

  const handleUpvote = async (c: Complaint) => {
    const updated = await api.upvoteComplaint(c.id, user?.id || 'anon');
    setComplaints((prev) => prev.map((item) => (item.id === c.id ? updated : item)));
    if (selectedComplaint?.id === c.id) {
      setSelectedComplaint(updated);
    }
    if (updated.hasUpvoted) {
      updateUserXp(15);
      success('Upvoted (+15 XP)', 'Civic priority boosted');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint || !newComment.trim()) return;

    const updated = await api.addComment(selectedComplaint.id, {
      userId: user?.id || 'anon',
      userName: user?.name || 'Aarav Patel',
      text: newComment,
    });

    setComplaints((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setSelectedComplaint(updated);
    setNewComment('');
    updateUserXp(5);
    success('Comment Posted (+5 XP)', 'Thank you for community feedback');
  };

  return (
    <div className="space-y-4">
      {/* Header with Radius & Category Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Community Live Map</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time municipal radar with GPS verified pins & community validation
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Radius Selector */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs">
            <span className="px-2 text-slate-500 dark:text-slate-400 font-semibold">Radius:</span>
            {[500, 1000, 2000, 5000].map((r) => (
              <button
                key={r}
                onClick={() => setRadiusMeters(r)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                  radiusMeters === r 
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {r < 1000 ? `${r}m` : `${r / 1000}km`}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as any)}
            className="h-9 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 focus:outline-none shadow-xs"
          >
            <option value="ALL">All Categories</option>
            <option value="ROADS_POTHOLES">Roads & Potholes</option>
            <option value="SOLID_WASTE">Solid Waste</option>
            <option value="WATER_DRAINAGE">Water & Drainage</option>
            <option value="STREETLIGHTS">Streetlights</option>
            <option value="PUBLIC_HEALTH">Public Health</option>
          </select>
        </div>
      </div>

      {/* Main Interactive Map */}
      <div className="relative">
        <MapComponent
          complaints={filteredComplaints}
          center={[userCoords.lat, userCoords.lng]}
          zoom={13}
          radiusCircleMeters={radiusMeters}
          userLocation={userCoords}
          selectedComplaintId={selectedComplaint?.id}
          onSelectComplaint={(c) => setSelectedComplaint(c)}
          className="h-[560px]"
        />

        {/* Floating Quick Count Badge */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{filteredComplaints.length} Grievances Active in Range</span>
        </div>
      </div>

      {/* Community Detail & Comment Drawer */}
      <Drawer
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        title={selectedComplaint?.title || 'Complaint'}
        subtitle={selectedComplaint?.ticketNumber}
      >
        {selectedComplaint && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <StatusChip status={selectedComplaint.status} size="md" />
              <button
                onClick={() => handleUpvote(selectedComplaint)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                  selectedComplaint.hasUpvoted
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${selectedComplaint.hasUpvoted ? 'fill-current' : ''}`} />
                <span>{selectedComplaint.upvotes} Upvotes</span>
              </button>
            </div>

            {/* Photo & GPS */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-16/9">
              <img
                src={selectedComplaint.photoBeforeUrl}
                alt={selectedComplaint.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md text-white rounded-lg text-[10px] font-mono">
                {selectedComplaint.complaintLocation.address}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'gu' ? selectedComplaint.descriptionGu : selectedComplaint.description}
            </p>

            {/* Read-Only Notice */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400">
              🔒 <b>Civic Integrity Rule:</b> You can upvote and comment on community reports, but original grievance telemetry cannot be altered by third parties.
            </div>

            {/* Comments Section */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                <span>Community Discussion ({selectedComplaint.comments?.length || 0})</span>
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedComplaint.comments?.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No comments yet. Be the first to share an update!</p>
                ) : (
                  selectedComplaint.comments?.map((cm) => (
                    <div key={cm.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                        <span>{cm.userName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{new Date(cm.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">{cm.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add neighborhood insight..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 h-9 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
                />
                <Button variant="primary" size="sm" type="submit" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  Post
                </Button>
              </form>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
