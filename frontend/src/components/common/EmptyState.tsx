import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div className={`p-8 sm:p-12 text-center rounded-3xl border border-dashed border-ink-border bg-white/50 backdrop-blur-xs flex flex-col items-center justify-center ${className || ''}`}>
      <div className="w-16 h-16 rounded-3xl bg-lavender-light/80 text-lavender-dark flex items-center justify-center mb-4 shadow-xs">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-ink mb-1">{title}</h3>
      <p className="text-sm text-ink-secondary max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
