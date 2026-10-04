import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { IvrMonitorItem } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { 
  PhoneCall, 
  Volume2, 
  Play, 
  Pause, 
  Globe, 
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  Search,
  Sparkles
} from 'lucide-react';

export const AdminIvrMonitor: React.FC = () => {
  const [logs, setLogs] = useState<IvrMonitorItem[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await api.getIvrLogs();
      setLogs(data);
    };
    fetch();
  }, []);

  const togglePlayAudio = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setTimeout(() => {
        setPlayingId(null);
      }, 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-ink tracking-tight">
          Twilio Voice Hotline & IVR Monitor (1800-TARK)
        </h1>
        <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
          Real-time logs of telephone calls from feature phone citizens, speech-to-text transcripts, and keypad responses
        </p>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-purple-50/60 border-lavender/30">
          <span className="text-[10px] font-bold text-lavender-dark uppercase font-mono">
            TOTAL CALLS THIS WEEK
          </span>
          <h3 className="text-2xl font-extrabold text-ink mt-1">1,180 Calls</h3>
          <p className="text-xs text-ink-secondary mt-0.5">88% in Gujarati • 12% in English/Hindi</p>
        </Card>

        <Card className="p-5 bg-emerald-50/60 border-mint/30">
          <span className="text-[10px] font-bold text-emerald-800 uppercase font-mono">
            POSITIVE RESOLUTION CONFIRMATION
          </span>
          <h3 className="text-2xl font-extrabold text-emerald-950 mt-1">96.2%</h3>
          <p className="text-xs text-emerald-800 mt-0.5">Citizens confirmed repair on Keypress 1</p>
        </Card>

        <Card className="p-5 bg-amber-50/60 border-amber-200">
          <span className="text-[10px] font-bold text-amber-800 uppercase font-mono">
            AUTO-REOPEN TRIGGERED
          </span>
          <h3 className="text-2xl font-extrabold text-amber-950 mt-1">3.8%</h3>
          <p className="text-xs text-amber-800 mt-0.5">Citizens rejected claim on Keypress 2</p>
        </Card>
      </div>

      {/* Live Audio & Transcript Feed */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-ink flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-lavender" />
          <span>Real-time Voice Stream Transcripts</span>
        </h2>

        <div className="space-y-3">
          {logs.map((log) => {
            const isPlaying = playingId === log.id;

            return (
              <Card
                key={log.id}
                className="p-5 bg-white border-ink-border flex flex-col space-y-3 shadow-2xs hover:shadow-soft transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-ink">{log.callerPhone}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-canvas border border-ink-border text-ink-muted">
                      {log.ward}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-lavender-light text-lavender-dark font-mono">
                      {log.language === 'gu' ? 'ગુજરાતી' : 'English'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-ink-muted font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-lavender" />
                      {log.duration}
                    </span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Audio Player Strip */}
                <div className="p-3.5 rounded-2xl bg-canvas border border-ink-border flex items-center gap-3">
                  <button
                    onClick={() => togglePlayAudio(log.id)}
                    className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center shrink-0 hover:bg-slate-800 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4" />}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="font-bold text-ink">
                        {isPlaying ? '▶ Playing Audio Recording (1800-TARK)' : 'Telephony Audio Recording'}
                      </span>
                      <span className="text-ink-muted">{log.audioDuration}s</span>
                    </div>

                    {/* Waveform Bar simulation */}
                    <div className="flex items-center gap-0.5 h-4">
                      {[30, 60, 45, 80, 100, 50, 70, 90, 40, 60, 85, 95, 30, 65, 80, 45, 55, 75, 90, 40, 30].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            isPlaying ? 'bg-lavender animate-pulse' : 'bg-ink-border'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Transcripts in Gujarati & English */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-ink-border/80 space-y-1">
                    <p className="font-bold text-ink flex items-center gap-1">
                      <Globe className="w-3 h-3 text-lavender" />
                      <span className="font-gujarati">ગુજરાતી ઓડિયો ટ્રાન્સક્રિપ્ટ</span>
                    </p>
                    <p className="text-ink-secondary font-gujarati italic leading-relaxed">
                      "{log.transcriptGu}"
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-ink-border/80 space-y-1">
                    <p className="font-bold text-ink flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>AI Translated English Summary</span>
                    </p>
                    <p className="text-ink-secondary leading-relaxed">
                      {log.summaryEn}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
