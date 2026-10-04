import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
  padded?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  glass = false,
  padded = 'md',
  ...props
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={clsx(
        'rounded-2xl border transition-all duration-200',
        glass
          ? 'glass-card'
          : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-card',
        hover && 'hover:shadow-card-hover hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5',
        paddingClasses[padded],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
