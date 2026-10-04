import React from 'react';
import { useTranslation } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="inline-flex items-center bg-ink-light/80 p-1 rounded-2xl border border-ink-border">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all duration-200 ${
          language === 'en'
            ? 'bg-white text-ink shadow-2xs'
            : 'text-ink-secondary hover:text-ink'
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLanguage('gu')}
        className={`px-2.5 py-1 rounded-xl text-xs font-bold font-gujarati transition-all duration-200 ${
          language === 'gu'
            ? 'bg-white text-ink shadow-2xs'
            : 'text-ink-secondary hover:text-ink'
        }`}
      >
        ગુજરાતી
      </button>
    </div>
  );
};
