import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, Sparkles, Heart } from 'lucide-react';
import { useTranslation } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
                Tark Shaastra (તર્ક શાસ્ત્ર)
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              An AI-powered municipal grievance verification engine ensuring zero phantom resolutions, GPS geo-fenced proofs, and automated IVR voice confirmation for every citizen across Gujarat.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200/80 dark:border-slate-700/80">
              <PhoneCall className="w-3.5 h-3.5 text-amber-600" />
              <span>Voice Hotline for Keypad Phones: 1800-TARK-78</span>
            </div>
          </div>

          {/* Col 2: Portals */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Portals</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/citizen" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Citizen Grievance Portal
                </Link>
              </li>
              <li>
                <Link to="/citizen/report" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Report with GPS Camera
                </Link>
              </li>
              <li>
                <Link to="/citizen/map" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Live Ward Heatmap
                </Link>
              </li>
              <li>
                <Link to="/department" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Department Work Queue
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Municipal Command Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Smart Governance */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Governance Tech</h4>
            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>AI Vision Categorization</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>≤100m Geo-Fence Locks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Twilio Gujarati IVR</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>500m Deduplication</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <p>© 2026 Tark Shaastra. Built for Gujarat Smart Municipal Governance.</p>
            <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built for citizens with care</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
