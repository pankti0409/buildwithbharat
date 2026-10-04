import React from 'react';
import { clsx } from 'clsx';
import { ComplaintStatus } from '../../types';
import { useTranslation } from '../../context/LanguageContext';
import { Clock, Wrench, CheckCircle2, ShieldCheck, RotateCcw } from 'lucide-react';

interface StatusChipProps {
  status: ComplaintStatus;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  size = 'md',
  showIcon = true,
  className,
}) => {
  const { t } = useTranslation();

  const configs = {
    PENDING: {
      labelKey: 'status.PENDING',
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300',
      dot: 'bg-amber-400',
      icon: Clock,
    },
    IN_PROGRESS: {
      labelKey: 'status.IN_PROGRESS',
      bg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300',
      dot: 'bg-blue-500',
      icon: Wrench,
    },
    RESOLVED: {
      labelKey: 'status.RESOLVED',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
    },
    VERIFIED: {
      labelKey: 'status.VERIFIED',
      bg: 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60 text-purple-800 dark:text-purple-300',
      dot: 'bg-purple-500',
      icon: ShieldCheck,
    },
    REOPENED: {
      labelKey: 'status.REOPENED',
      bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300',
      dot: 'bg-rose-500',
      icon: RotateCcw,
    },
  };

  const config = configs[status] || configs.PENDING;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border shadow-2xs whitespace-nowrap transition-colors',
        config.bg,
        sizeClasses[size],
        className
      )}
    >
      {showIcon ? (
        <Icon className={clsx(size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5')} />
      ) : (
        <span className={clsx('rounded-full shrink-0 animate-pulse', config.dot, size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2')} />
      )}
      <span>{t(config.labelKey)}</span>
    </span>
  );
};
