import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lavender ${
        theme === 'dark'
          ? 'bg-surface-darkMuted border-surface-darkBorder text-amber-300 hover:bg-surface-darkBorder shadow-2xs'
          : 'bg-white border-ink-border text-ink-secondary hover:text-ink hover:bg-ink-light shadow-2xs'
      } ${className}`}
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
      ) : (
        <Moon className="w-4 h-4 text-lavender-dark" />
      )}
    </button>
  );
};
