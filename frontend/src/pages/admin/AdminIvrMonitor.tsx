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
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Twilio Voice Hotline & IVR Monitor (1800-TARK)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Real-time logs of telephone calls from feature phone citizens, speech-to-text transcripts, and keypad responses
        </p>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/50 shadow-xs">
          <span className="text-[10px] font-bold text-purple-800 dark:text-purple-300 uppercase font-mono">
            TOTAL CALLS THIS WEEK
          </span>
          <h3 className="text-2xl font-extrabold text-purple-950 dark:text-purple-100 mt-1">1,180 Calls</h3>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-0.5">88% in Gujarati • 12% in English/Hindi</p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 shadow-xs">
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase font-mono">
            POSITIVE RESOLUTION CONFIRMATION
          </span>
          <h3 className="text-2xl font-extrabold text-emerald-950 dark:text-emerald-100 mt-1">96.2%</h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">Citizens confirmed repair on Keypress 1</p>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 shadow-xs">
          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase font-mono">
            AUTO-REOPEN TRIGGERED
          </span>
          <h3 className="text-2xl font-extrabold text-amber-950 dark:text-amber-100 mt-1">3.8%</h3>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-0.5">Citizens rejected claim on Keypress 2</p>
        </div>
      </div>

      {/* Live Audio & Transcript Feed */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <span>Real-time Voice Stream Transcripts</span>
        </h2>

        <div className="space-y-3">
          {logs.map((log) => {
            const isPlaying = playingId === log.id;

            return (
              <Card
                key={log.id}
                className="p-5 flex flex-col space-y-3 shadow-xs hover:shadow-card-hover transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">{log.callerPhone}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium">
                      {log.ward}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-mono border border-purple-200 dark:border-purple-800/40">
                      {log.language === 'gu' ? 'ગુજરાતી' : 'English'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-500" />
                      {log.duration}
                    </span>
                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Audio Player Strip */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <button
                    onClick={() => togglePlayAudio(log.id)}
                    className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-emerald-400 dark:text-emerald-600" /> : <Play className="w-4 h-4" />}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {isPlaying ? '▶ Playing Audio Recording (1800-TARK)' : 'Telephony Audio Recording'}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">{log.audioDuration}s</span>
                    </div>

                    {/* Waveform Bar simulation */}
                    <div className="flex items-center gap-0.5 h-4">
                      {[30, 60, 45, 80, 100, 50, 70, 90, 40, 60, 85, 95, 30, 65, 80, 45, 55, 75, 90, 40, 30].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-full transition-all duration-300 ${
                            isPlaying ? 'bg-purple-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
                  <p className="text-slate-900 dark:text-white font-semibold">Gujarati Call Transcript:</p>
                  <p className="text-slate-600 dark:text-slate-300 font-gujarati italic">
                    "{log.transcriptGu}"
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <b>Summary:</b> {log.transcriptEn}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
