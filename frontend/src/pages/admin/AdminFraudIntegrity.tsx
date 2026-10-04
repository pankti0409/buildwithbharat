import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FraudAlert } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { 
  ShieldAlert, 
  AlertTriangle, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search,
  Eye
} from 'lucide-react';

export const AdminFraudIntegrity: React.FC = () => {
  const { success, info } = useToast();
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await api.getFraudAlerts();
      setAlerts(data);
    };
    fetch();
  }, []);

  const handleResolveAlert = (id: string, action: 'DISMISSED' | 'FLAGGED') => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    success('Alert Processed', `Integrity flag marked as ${action}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Integrity & Fraud Sentinel
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Automated heuristic detection of geo-fence bypass attempts, photo recycling, and abnormal closure speeds
        </p>
      </div>

      {/* Sentinel Highlights (Pastel & Clean) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/50 shadow-xs">
          <span className="text-[10px] font-bold text-rose-800 dark:text-rose-300 uppercase font-mono">GEO-FENCE BREACHES</span>
          <h3 className="text-2xl font-extrabold text-rose-950 dark:text-rose-100 mt-1">1 Detected</h3>
          <p className="text-xs text-rose-700 dark:text-rose-300 mt-1">Resolution attempted &gt; 500m from site</p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 shadow-xs">
          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase font-mono">REPEATED REOPENS</span>
          <h3 className="text-2xl font-extrabold text-amber-950 dark:text-amber-100 mt-1">1 Flagged</h3>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">Citizen pressed [2] on IVR multiple times</p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 shadow-xs">
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase font-mono">ZERO PHOTO DUPLICATION</span>
          <h3 className="text-2xl font-extrabold text-emerald-950 dark:text-emerald-100 mt-1">100% Genuine</h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">EXIF hash verification active</p>
        </div>
      </div>

      {/* Flagged Alerts List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Active Suspicious Resolution Incidents</h2>

        {alerts.length === 0 ? (
          <Card className="p-12 text-center text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-900 dark:text-white">All Integrity Audits Passed</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">No suspicious resolutions detected across municipal wards.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40'
                      : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{alert.ticketNumber}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                        alert.severity === 'CRITICAL' 
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300' 
                          : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                      }`}>
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{alert.description}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Officer: <b className="text-slate-800 dark:text-slate-200">{alert.officerName}</b> • {alert.departmentName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolveAlert(alert.id, 'DISMISSED')}
                  >
                    Dismiss Flag
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleResolveAlert(alert.id, 'FLAGGED')}
                  >
                    Escalate to Vigilance
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
