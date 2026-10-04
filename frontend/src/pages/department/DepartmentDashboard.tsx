import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import { api } from '../../services/api';
import { Complaint } from '../../types';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusChip } from '../../components/common/StatusChip';
import { MapComponent } from '../../components/common/MapComponent';
import { Skeleton } from '../../components/common/Skeleton';
import { 
  Inbox, 
  Wrench, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Clock, 
  AlertTriangle,
  Kanban
} from 'lucide-react';

export const DepartmentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t, language } = useTranslation();
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await api.getComplaints();
      setComplaints(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const pendingCount = complaints.filter((c) => c.status === 'PENDING').length;
  const inProgressCount = complaints.filter((c) => c.status === 'IN_PROGRESS').length;
  const resolvedCount = complaints.filter((c) => c.status === 'RESOLVED' || c.status === 'VERIFIED').length;

  return (
    <div className="space-y-6">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">
            Field Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
            Real-time monitoring of road & infrastructure tasks across Navrangpura Ward 12
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/department/queue')}
          leftIcon={<Kanban className="w-4 h-4" />}
          className="bg-sky-dark hover:bg-sky-dark/90"
        >
          Open Interactive Work Queue
        </Button>
      </div>

      {/* KPI Stat Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Pending Queue"
          value={pendingCount}
          subtitle="Awaiting field start"
          icon={Inbox}
          color="butter"
          trend={{ value: '3 new', isPositive: true, label: 'today' }}
        />

        <StatCard
          title="Field Teams Active"
          value={inProgressCount}
          subtitle="Currently under repair"
          icon={Wrench}
          color="sky"
        />

        <StatCard
          title="Resolved This Month"
          value="42"
          subtitle="98.4% Geo-verified"
          icon={CheckCircle2}
          color="mint"
          trend={{ value: '+14%', isPositive: true, label: 'vs last month' }}
        />

        <StatCard
          title="SLA Adherence Rate"
          value="97.2%"
          subtitle="Avg TAT: 16.5 hrs"
          icon={ShieldCheck}
          color="lavender"
        />
      </div>

      {/* Main Grid: Map of Field Tickets + Urgent Dispatch Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Field Map */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-ink flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-dark" />
              <span>Assigned Ward Tickets Geolocation</span>
            </h3>
            <span className="text-xs text-ink-muted">Navrangpura & Stadium Wards</span>
          </div>

          <MapComponent
            complaints={complaints}
            center={[23.0378, 72.5621]}
            zoom={13}
            className="h-[440px]"
            onSelectComplaint={(c) => navigate(`/department/queue?id=${c.id}`)}
          />
        </div>

        {/* Right: Urgent Dispatch List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-ink flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Priority Dispatch Queue</span>
            </h3>
            <span className="text-xs text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-mono font-bold">
              HIGH URGENCY
            </span>
          </div>

          <div className="space-y-2.5 max-h-[440px] overflow-y-auto">
            {complaints.filter((c) => c.status !== 'VERIFIED').slice(0, 4).map((c) => (
              <Card
                key={c.id}
                hover
                onClick={() => navigate(`/department/queue?id=${c.id}`)}
                className="p-3.5 bg-white border-ink-border cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <StatusChip status={c.status} size="sm" />
                  <span className="text-[10px] font-mono text-ink-muted">{c.ticketNumber}</span>
                </div>

                <h4 className="text-xs font-bold text-ink line-clamp-1">
                  {language === 'gu' ? c.titleGu : c.title}
                </h4>

                <p className="text-[11px] text-ink-secondary flex items-center gap-1 line-clamp-1">
                  <MapPin className="w-3 h-3 text-lavender shrink-0" />
                  <span>{c.complaintLocation.address}</span>
                </p>

                <div className="pt-2 border-t border-ink-border/60 flex items-center justify-between text-[10px] text-ink-muted">
                  <span className="text-amber-800 font-semibold">SLA: 18h remaining</span>
                  <span className="text-sky-dark font-bold">Take Action →</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
