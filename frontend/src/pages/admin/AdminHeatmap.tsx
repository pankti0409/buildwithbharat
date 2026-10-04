import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Complaint } from '../../types';
import { MapComponent } from '../../components/common/MapComponent';
import { Card } from '../../components/common/Card';
import { Globe2, Flame, MapPin, Layers, Info, ShieldCheck } from 'lucide-react';

export const AdminHeatmap: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedCity, setSelectedCity] = useState<'Ahmedabad' | 'Vadodara' | 'Surat' | 'Rajkot'>('Ahmedabad');

  useEffect(() => {
    const fetch = async () => {
      const data = await api.getComplaints();
      setComplaints(data);
    };
    fetch();
  }, []);

  const cityCoordinates: Record<string, [number, number]> = {
    Ahmedabad: [23.0378, 72.5621],
    Vadodara: [22.3107, 73.1812],
    Surat: [21.1959, 72.7933],
    Rajkot: [22.2982, 70.7963],
  };

  const cityStats: Record<string, { hotspots: number; density: string; speed: string; compliance: string }> = {
    Ahmedabad: { hotspots: 14, density: 'High (West Zone)', speed: '16.4 hrs', compliance: '98.4%' },
    Vadodara: { hotspots: 8, density: 'Moderate (Alkapuri)', speed: '14.2 hrs', compliance: '99.1%' },
    Surat: { hotspots: 11, density: 'High (Adajan/Pal)', speed: '18.1 hrs', compliance: '97.8%' },
    Rajkot: { hotspots: 6, density: 'Low (Yagnik Rd)', speed: '12.8 hrs', compliance: '99.5%' },
  };

  const currentStats = cityStats[selectedCity];

  return (
    <div className="space-y-6">
      {/* Header & City Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Geospatial Grievance Heatmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Geographic density telemetry for preventative maintenance & budget allocation
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {(['Ahmedabad', 'Vadodara', 'Surat', 'Rajkot'] as const).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCity === city
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Pastel Telemetry Summary Strip (Clean & Organized, No Overlapping) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-xs">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>Active Hotspots</span>
          </div>
          <p className="text-2xl font-extrabold text-amber-950 dark:text-amber-100 mt-1 font-mono">{currentStats.hotspots} Clusters</p>
          <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">{currentStats.density}</p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/50 shadow-xs">
          <div className="flex items-center gap-2 text-sky-900 dark:text-sky-300 font-bold text-xs">
            <MapPin className="w-4 h-4 text-sky-600" />
            <span>GPS Triangulation</span>
          </div>
          <p className="text-2xl font-extrabold text-sky-950 dark:text-sky-100 mt-1 font-mono">&plusmn; 3.4m</p>
          <p className="text-[11px] text-sky-800 dark:text-sky-300 mt-0.5">High satellite fix precision</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Geo-Fence Compliance</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 dark:text-emerald-100 mt-1 font-mono">{currentStats.compliance}</p>
          <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5">&le;100m verified repair proof</p>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/50 shadow-xs">
          <div className="flex items-center gap-2 text-purple-900 dark:text-purple-300 font-bold text-xs">
            <Layers className="w-4 h-4 text-purple-600" />
            <span>Mean Resolution SLA</span>
          </div>
          <p className="text-2xl font-extrabold text-purple-950 dark:text-purple-100 mt-1 font-mono">{currentStats.speed}</p>
          <p className="text-[11px] text-purple-800 dark:text-purple-300 mt-0.5">Automated dispatch active</p>
        </div>
      </div>

      {/* Full Map Canvas with Clean Border & Rounded Corners */}
      <Card className="p-0 overflow-hidden border-slate-200 dark:border-slate-800 shadow-card">
        <MapComponent
          complaints={complaints}
          center={cityCoordinates[selectedCity]}
          zoom={13}
          className="h-[560px]"
        />
      </Card>
    </div>
  );
};
