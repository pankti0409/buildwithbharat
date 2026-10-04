import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Complaint } from '../../types';
import { MapComponent } from '../../components/common/MapComponent';
import { Card } from '../../components/common/Card';
import { Globe2, Flame, MapPin, Layers, Info } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink tracking-tight">Geospatial Grievance Heatmap</h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
            Geographic density analysis for infrastructure budget allocation & preventative maintenance
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex bg-white p-1 rounded-2xl border border-ink-border shadow-2xs">
          {(['Ahmedabad', 'Vadodara', 'Surat', 'Rajkot'] as const).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCity === city
                  ? 'bg-ink text-white shadow-2xs'
                  : 'text-ink-secondary hover:text-ink'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Container */}
      <div className="relative">
        <MapComponent
          complaints={complaints}
          center={cityCoordinates[selectedCity]}
          zoom={13}
          className="h-[620px]"
        />

        {/* Overlay Density Card */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-ink-border shadow-soft max-w-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-ink">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>Hotspot Cluster: {selectedCity}</span>
          </div>
          <p className="text-[11px] text-ink-secondary leading-relaxed">
            High concentration detected in west municipal zones around commercial arteries.
          </p>
          <div className="pt-2 border-t border-ink-border flex justify-between text-[10px] font-mono text-ink-muted">
            <span>Accuracy: ±3.4m</span>
            <span className="text-emerald-700 font-bold">100% Geo-tagged</span>
          </div>
        </div>
      </div>
    </div>
  );
};
