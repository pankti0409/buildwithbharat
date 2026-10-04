import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Officer } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Drawer } from '../../components/common/Drawer';
import { useToast } from '../../context/ToastContext';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  Award,
  Search
} from 'lucide-react';

export const AdminOfficerManagement: React.FC = () => {
  const { success, error } = useToast();
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  // New Officer Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [departmentId, setDepartmentId] = useState('dept_roads');
  const [ward, setWard] = useState('Navrangpura (Ward 12)');
  const [city, setCity] = useState('Ahmedabad');

  const fetchOfficers = async () => {
    const list = await api.getOfficers();
    setOfficers(list);
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  const handleAddOfficerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      error('Missing Details', 'Please fill name and phone number');
      return;
    }

    const newOff = await api.addOfficer({
      name,
      email: email || `${name.toLowerCase().replace(' ', '.')}@amc.gov.in`,
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      departmentId,
      ward,
      city,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    });

    setOfficers((prev) => [...prev, newOff]);
    setIsAddDrawerOpen(false);
    setName('');
    setEmail('');
    setPhone('');
    success('Officer Added', `${newOff.name} assigned to ${ward}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Field Officer Directory & Workload
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage municipal field staff, ward allocations, and duty statuses
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsAddDrawerOpen(true)}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Add New Field Officer
        </Button>
      </div>

      {/* Officer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {officers.map((off) => (
          <Card key={off.id} hover className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={off.avatar}
                    alt={off.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{off.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{off.city}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  off.status === 'FIELD' 
                    ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800/40' 
                    : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                }`}>
                  {off.status}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span className="truncate">{off.ward}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{off.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Active</span>
                  <p className="font-bold text-slate-900 dark:text-white font-mono">{off.activeTasks}</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Resolved</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{off.resolvedMonth}</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px]">Accuracy</span>
                  <p className="font-bold text-sky-600 dark:text-sky-400 font-mono">{off.accuracyScore}%</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-ink-border flex items-center justify-between text-xs text-ink-muted">
              <span className="flex items-center gap-1 font-mono text-amber-700 font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                {off.streak} Day Streak
              </span>
              <span className="text-emerald-700 font-bold">Grade A+</span>
            </div>
          </Card>
        ))}
      </div>

      {/* ADD OFFICER DRAWER */}
      <Drawer
        isOpen={isAddDrawerOpen}
        onClose={() => setIsAddDrawerOpen(false)}
        title="Add New Municipal Field Officer"
        subtitle="Provision official access to field portal"
      >
        <form onSubmit={handleAddOfficerSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-ink">Officer Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Prajapati"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3.5 mt-1 rounded-xl border border-ink-border text-xs focus:ring-2 focus:ring-lavender focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink">Official Mobile (+91)</label>
            <input
              type="tel"
              required
              placeholder="98790 12345"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-11 px-3.5 mt-1 rounded-xl border border-ink-border text-xs focus:ring-2 focus:ring-lavender focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink">Official Email Address</label>
            <input
              type="email"
              placeholder="ramesh.p@amc.gov.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 mt-1 rounded-xl border border-ink-border text-xs focus:ring-2 focus:ring-lavender focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-ink">Department</label>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full h-11 px-3.5 mt-1 rounded-xl border border-ink-border text-xs focus:ring-2 focus:ring-lavender focus:outline-none bg-white"
            >
              <option value="dept_roads">Roads & Bridges Department</option>
              <option value="dept_solid_waste">Solid Waste Management</option>
              <option value="dept_water_drainage">Water Supply & Drainage</option>
              <option value="dept_streetlights">Streetlights & Electricals</option>
              <option value="dept_public_health">Public Health & Sanitation</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-ink">Assigned Municipal Ward</label>
            <select
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              className="w-full h-11 px-3.5 mt-1 rounded-xl border border-ink-border text-xs focus:ring-2 focus:ring-lavender focus:outline-none bg-white"
            >
              <option value="Navrangpura (Ward 12)">Ahmedabad - Navrangpura</option>
              <option value="Bodakdev & Vastrapur">Ahmedabad - Bodakdev</option>
              <option value="Maninagar (Ward 22)">Ahmedabad - Maninagar</option>
              <option value="Adajan & Pal (Ward 10)">Surat - Adajan</option>
              <option value="Alkapuri (Ward 7)">Vadodara - Alkapuri</option>
            </select>
          </div>

          <div className="pt-4 border-t border-ink-border flex gap-2">
            <Button variant="outline" size="md" type="button" onClick={() => setIsAddDrawerOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button variant="primary" size="md" type="submit" className="flex-1">
              Save Officer Record
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
};
