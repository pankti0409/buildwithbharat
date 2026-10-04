import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showClose?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
  showClose = true,
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

  const maxWClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/60 dark:bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={clsx(
              'relative w-full bg-white dark:bg-surface-dark rounded-3xl shadow-soft-lg dark:shadow-soft-lg-dark border border-ink-border dark:border-surface-darkBorder overflow-hidden z-10 my-8 flex flex-col',
              maxWClasses[maxWidth]
            )}
          >
            {(title || showClose) && (
              <div className="px-6 py-5 border-b border-ink-border/70 dark:border-surface-darkBorder flex items-center justify-between bg-canvas/60 dark:bg-surface-darkMuted/60">
                <div>
                  {title && <h3 className="text-lg font-bold text-ink dark:text-white">{title}</h3>}
                  {subtitle && <p className="text-xs text-ink-secondary dark:text-ink-muted mt-0.5">{subtitle}</p>}
                </div>
                {showClose && (
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-ink-muted hover:text-ink dark:hover:text-white hover:bg-ink-light dark:hover:bg-surface-darkBorder transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            <div className="p-6 text-ink dark:text-white">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
