import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: 'md' | 'lg' | 'xl' | 'full';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'lg',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const widthClasses = {
    md: 'max-w-md',
    lg: 'max-w-xl',
    xl: 'max-w-3xl',
    full: 'max-w-5xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/60 dark:bg-black/80 backdrop-blur-xs"
          />

          {/* Drawer Slide */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className={`relative w-full ${widthClasses[width]} bg-canvas dark:bg-surface-dark h-full shadow-2xl border-l border-ink-border dark:border-surface-darkBorder z-10 flex flex-col`}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-ink-border/80 dark:border-surface-darkBorder bg-white/90 dark:bg-surface-darkMuted/90 backdrop-blur-md flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-lg font-bold text-ink dark:text-white">{title}</h3>
                {subtitle && <p className="text-xs text-ink-secondary dark:text-ink-muted mt-0.5">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-ink-secondary dark:text-ink-muted hover:text-ink dark:hover:text-white hover:bg-ink-light dark:hover:bg-surface-darkBorder transition-colors"
                aria-label="Close drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
