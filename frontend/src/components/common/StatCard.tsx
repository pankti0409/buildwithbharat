import React from 'react';
import { Card } from './Card';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    label?: string;
  };
  icon: LucideIcon;
  color?: 'slate' | 'emerald' | 'sky' | 'amber' | 'rose' | 'lavender' | 'mint' | 'butter' | 'peach';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  color = 'slate',
  className,
}) => {
  const colorSchemes: Record<string, { bg: string; iconColor: string }> = {
    slate: {
      bg: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
      iconColor: 'text-slate-900 dark:text-white',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
    },
    mint: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
      iconColor: 'text-emerald-700 dark:text-emerald-400',
    },
    sky: {
      bg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/40',
      iconColor: 'text-sky-700 dark:text-sky-400',
    },
    amber: {
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      iconColor: 'text-amber-700 dark:text-amber-400',
    },
    butter: {
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      iconColor: 'text-amber-700 dark:text-amber-400',
    },
    rose: {
      bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40',
      iconColor: 'text-rose-700 dark:text-rose-400',
    },
    peach: {
      bg: 'bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800/40',
      iconColor: 'text-orange-700 dark:text-orange-400',
    },
    lavender: {
      bg: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
      iconColor: 'text-slate-900 dark:text-white',
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.slate;

  return (
    <Card hover className={clsx('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</h3>
          </div>
          {subtitle && <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{subtitle}</p>}
        </div>
        <div className={clsx('w-11 h-11 rounded-xl flex items-center justify-center border shadow-2xs shrink-0', scheme.bg)}>
          <Icon className={clsx('w-5 h-5', scheme.iconColor)} />
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs">
          <span
            className={clsx(
              'font-bold px-1.5 py-0.5 rounded inline-flex items-center gap-0.5 mr-1.5',
              trend.isPositive
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40'
            )}
          >
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
          <span className="text-slate-500 dark:text-slate-400">{trend.label || 'vs last month'}</span>
        </div>
      )}
    </Card>
  );
};
