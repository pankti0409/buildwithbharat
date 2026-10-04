import React from 'react';
import { TimelineEvent } from '../../types';
import { StatusChip } from './StatusChip';
import { Clock, CheckCircle2, User, Bot, Wrench, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ events, className }) => {
  const getActorIcon = (role: string) => {
    switch (role) {
      case 'SYSTEM':
        return <Bot className="w-3.5 h-3.5 text-lavender-dark" />;
      case 'officer':
        return <Wrench className="w-3.5 h-3.5 text-sky-dark" />;
      case 'citizen':
        return <User className="w-3.5 h-3.5 text-emerald-700" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-ink-muted" />;
    }
  };

  const formatTime = (ts: string) => {
    try {
      const d = new Date(ts);
      return d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return ts;
    }
  };

  return (
    <div className={clsx('relative pl-6 space-y-6', className)}>
      {/* Vertical Track Line */}
      <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-ink-border" />

      {events.map((event, idx) => (
        <div key={event.id || idx} className="relative flex items-start gap-4 group">
          {/* Node Dot */}
          <div className="absolute -left-6 mt-1 w-5 h-5 rounded-full bg-white border-2 border-lavender flex items-center justify-center shadow-xs z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-lavender-dark" />
          </div>

          <div className="flex-1 bg-white/70 border border-ink-border/70 rounded-2xl p-4 shadow-2xs hover:bg-white transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <StatusChip status={event.status} size="sm" />
                <h4 className="text-sm font-bold text-ink">{event.title}</h4>
              </div>
              <span className="text-xs font-mono text-ink-muted">{formatTime(event.timestamp)}</span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {event.description}
            </p>

            <div className="mt-3 pt-2.5 border-t border-ink-border/40 flex items-center justify-between text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-md bg-ink-light flex items-center justify-center">
                  {getActorIcon(event.role)}
                </span>
                <span className="font-medium text-ink-secondary">{event.actor}</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-ink-light">
                  {event.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
