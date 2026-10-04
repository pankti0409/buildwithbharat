import React from 'react';
import { clsx } from 'clsx';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className,
  style,
  ...props
}) => {
  const variantClasses = {
    rectangular: 'rounded-2xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4 my-1',
  };

  return (
    <div
      className={clsx(
        'bg-ink-border/60 animate-pulse',
        variantClasses[variant],
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};
