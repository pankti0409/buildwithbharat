import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Complaint, Department } from '../../types';
import { StatCard } from '../../components/common/StatCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { StatusChip } from '../../components/common/StatusChip';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  ArrowRight, 
  Layers,
  Sparkles
} from 'lucide-react';

const TREND_DATA = [
  { day: 'Mon', intake: 45, resolved: 38 },
  { day: 'Tue', intake: 52, resolved: 48 },
  { day: 'Wed', intake: 60, resolved: 58 },
  { day: 'Thu', intake: 48, resolved: 46 },
  { day: 'Fri', intake: 70, resolved: 65 },
  { day: 'Sat', intake: 35, resolved: 40 },
  { day: 'Sun', intake: 28, resolved: 32 },
];

const CATEGORY_DATA = [
  { name: 'Roads & Potholes', value: 42, color: '#8B7CF6' },
  { name: 'Solid Waste', value: 35, color: '#7ED9B8' },
  { name: 'Water & Drainage', value: 28, color: '#9CCBFF' },
  { name: 'Streetlights', value: 18, color: '#FFE29A' },
  { name: 'Public Health', value: 12, color: '#F7A1B5' },
];

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const c = await api.getComplaints();
      const d = await api.getDepartments();
      setComplaints(c);
      setDepartments(d);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">Executive Command Overview</h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
            Cross-departmental municipal analytics & proof-of-work compliance
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/fraud')}
            leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-rose" />}
          >
            Integrity Sentinel (2 Flags)
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/admin/complaints')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            All Complaints Table
          </Button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Complaints Logged"
          value="1,420"
          subtitle="Gujarat Grid"
          icon={Layers}
          color="lavender"
          trend={{ value: '+8.4%', isPositive: true, label: 'this week' }}
        />
        <StatCard
          title="Overall Resolution Rate"
          value="94.8%"
          subtitle="Target: 90%"
          icon={CheckCircle2}
          color="mint"
          trend={{ value: '+2.1%', isPositive: true }}
        />
        <StatCard
          title="Average Turnaround SLA"
          value="16.4 hrs"
          subtitle="Benchmark: 24 hrs"
          icon={Clock}
          color="sky"
          trend={{ value: '3.2h faster', isPositive: true }}
        />
        <StatCard
          title="IVR Confirmation Calls"
          value="1,180"
          subtitle="96.2% Verified on Press 1"
          icon={PhoneCall}
          color="butter"
        />
      </div>

      {/* Middle Grid: Recharts Trend Curve + Donut Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 7-Day Intake vs Resolution Trend */}
        <Card className="lg:col-span-8 p-6 bg-white border-ink-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-ink">Grievance Intake vs Resolution Speed (7-Day Curve)</h3>
              <p className="text-xs text-ink-muted">Daily comparison of citizen submissions vs verified field closures</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-lavender-dark">
                <span className="w-2.5 h-2.5 rounded-full bg-lavender" />
                Intake
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-2.5 h-2.5 rounded-full bg-mint" />
                Resolved
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIntake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B7CF6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8B7CF6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7ED9B8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7ED9B8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F2F7" vertical={false} />
                <XAxis dataKey="day" stroke="#8E8A9C" fontSize={11} tickLine={false} />
                <YAxis stroke="#8E8A9C" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E9E7F0',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="intake"
                  stroke="#8B7CF6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorIntake)"
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#7ED9B8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorResolved)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Right: Category Distribution Donut */}
        <Card className="lg:col-span-4 p-6 bg-white border-ink-border flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink">Grievance Distribution</h3>
            <p className="text-xs text-ink-muted">Breakdown by Municipal Category</p>
          </div>

          <div className="h-48 w-full relative flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DATA}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center pointer-events-none">
              <p className="text-xl font-extrabold text-ink">1,420</p>
              <p className="text-[10px] text-ink-muted uppercase">Total</p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-ink-border text-xs">
            {CATEGORY_DATA.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-ink-secondary">{item.name}</span>
                </div>
                <span className="font-bold text-ink font-mono">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid: Department SLA Ranking Leaderboard Table */}
      <Card className="p-0 overflow-hidden bg-white border-ink-border">
        <div className="p-5 border-b border-ink-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink">Department Performance & SLA Adherence</h3>
            <p className="text-xs text-ink-muted">Turnaround speed, active backlog, and citizen reopen rates</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/departments')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Full Department Matrix
          </Button>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-canvas border-b border-ink-border text-ink-secondary font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Department</th>
              <th className="p-4">Head of Dept</th>
              <th className="p-4">SLA Target</th>
              <th className="p-4">Avg Speed</th>
              <th className="p-4">Active Backlog</th>
              <th className="p-4">Reopen %</th>
              <th className="p-4">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-border text-ink">
            {departments.map((dept) => (
              <tr key={dept.id} className="hover:bg-ink-light/50 transition-colors">
                <td className="p-4 font-bold flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                  <span>{dept.name}</span>
                </td>
                <td className="p-4 text-ink-secondary">{dept.headName}</td>
                <td className="p-4 font-mono">{dept.slaHours} hrs</td>
                <td className="p-4 font-mono text-emerald-700 font-bold">{dept.avgResolutionHours} hrs</td>
                <td className="p-4 font-mono font-bold">{dept.activeCount} tasks</td>
                <td className="p-4 font-mono text-amber-700 font-bold">{dept.reopenRate}%</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Grade A
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};
