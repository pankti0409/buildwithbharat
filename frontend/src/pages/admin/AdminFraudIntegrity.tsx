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
        <h1 className="text-2xl font-extrabold text-ink tracking-tight">
          Integrity & Fraud Sentinel
        </h1>
        <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
          Automated heuristic detection of geo-fence bypass attempts, photo recycling, and abnormal closure speeds
        </p>
      </div>

      {/* Sentinel Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-rose-50/50 border-rose-200">
          <span className="text-[10px] font-bold text-rose-800 uppercase font-mono">GEO-FENCE BREACHES</span>
          <h3 className="text-2xl font-extrabold text-rose-950 mt-1">1 Detected</h3>
          <p className="text-xs text-rose-800 mt-1">Resolution attempted &gt; 500m from site</p>
        </Card>

        <Card className="p-5 bg-amber-50/50 border-amber-200">
          <span className="text-[10px] font-bold text-amber-800 uppercase font-mono">REPEATED REOPENS</span>
          <h3 className="text-2xl font-extrabold text-amber-950 mt-1">1 Flagged</h3>
          <p className="text-xs text-amber-800 mt-1">Citizen pressed [2] on IVR multiple times</p>
        </Card>

        <Card className="p-5 bg-emerald-50/50 border-emerald-200">
          <span className="text-[10px] font-bold text-emerald-800 uppercase font-mono">ZERO PHOTO DUPLICATION</span>
          <h3 className="text-2xl font-extrabold text-emerald-950 mt-1">100% Genuine</h3>
          <p className="text-xs text-emerald-800 mt-1">EXIF hash verification active</p>
        </Card>
      </div>

      {/* Flagged Alerts List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-ink">Active Suspicious Resolution Incidents</h2>

        {alerts.length === 0 ? (
          <Card className="p-12 text-center text-ink-muted">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-ink">All Integrity Audits Passed</p>
            <p className="text-xs text-ink-muted">No suspicious resolutions detected across municipal wards.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card
                key={alert.id}
                className="p-5 bg-white border-ink-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-ink">{alert.ticketNumber}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono ${
                        alert.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-xs text-ink-secondary">{alert.description}</p>
                    <p className="text-[11px] text-ink-muted">
                      Officer: <b className="text-ink">{alert.officerName}</b> • {alert.departmentName}
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
