import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (title: string, options?: { message?: string; type?: ToastType; duration?: number }) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toast = (
    title: string,
    options?: { message?: string; type?: ToastType; duration?: number }
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      title,
      message: options?.message,
      type: options?.type || 'info',
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, options?.duration || 4000);
  };

  const success = (title: string, message?: string) => toast(title, { message, type: 'success' });
  const error = (title: string, message?: string) => toast(title, { message, type: 'error' });
  const warning = (title: string, message?: string) => toast(title, { message, type: 'warning' });
  const info = (title: string, message?: string) => toast(title, { message, type: 'info' });

  return (
    <ToastContext.Provider value={{ toast, success, error, warning, info }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`pointer-events-auto p-4 rounded-2xl shadow-soft-lg border flex items-start gap-3 backdrop-blur-md ${
                t.type === 'success'
                  ? 'bg-emerald-50/95 border-emerald-200 text-emerald-950'
                  : t.type === 'error'
                  ? 'bg-rose-50/95 border-rose-200 text-rose-950'
                  : t.type === 'warning'
                  ? 'bg-amber-50/95 border-amber-200 text-amber-950'
                  : 'bg-lavender-light/95 border-lavender/30 text-ink'
              }`}
            >
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
              {t.type === 'error' && <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
              {t.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-lavender-dark shrink-0 mt-0.5" />}
              <div className="flex-1 text-sm">
                <div className="font-semibold">{t.title}</div>
                {t.message && <div className="text-xs opacity-80 mt-0.5">{t.message}</div>}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-ink-muted hover:text-ink transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
