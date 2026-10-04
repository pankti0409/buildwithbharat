import React from 'react';
import { Card } from '../components/common/Card';
import { ShieldCheck, Lock, MapPin, PhoneCall, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tealBrand-subtle dark:bg-tealBrand/20 text-tealBrand dark:text-teal-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Municipal Data Governance Charter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink dark:text-white">
          Privacy Policy & Telemetry Protection
        </h1>
        <p className="text-xs text-ink-muted font-mono">
          Last Updated: October 2026 • Compliant with Digital Personal Data Protection (DPDP) Act 2023
        </p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 bg-white dark:bg-surface-dark border-ink-border dark:border-surface-darkBorder leading-relaxed text-sm text-ink-secondary dark:text-ink-secondary">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-ink dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-tealBrand dark:text-teal-400" />
            <span>1. Scope & Civic Purpose</span>
          </h2>
          <p>
            Tark Shaastra ("The Platform") is deployed for municipal grievance verification. We collect only minimal required telemetry to confirm genuine infrastructure defects, prevent fraudulent ticket closures, and coordinate field resolutions across Gujarat municipal corporations.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-ink-border/60 dark:border-surface-darkBorder">
          <h2 className="text-base font-bold text-ink dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-tealBrand dark:text-teal-400" />
            <span>2. GPS Telemetry & EXIF Data Usage</span>
          </h2>
          <p>
            When a citizen captures a grievance photo or an officer submits proof-of-work:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ink-secondary dark:text-ink-muted">
            <li>Precise coordinates (Latitude, Longitude, Altitude, Accuracy radius) are locked at capture time.</li>
            <li>GPS data is strictly used for the <b>≤100m Geo-Fence</b> validation engine and public community maps.</li>
            <li>No continuous background GPS tracking is ever conducted on citizens.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-ink-border/60 dark:border-surface-darkBorder">
          <h2 className="text-base font-bold text-ink dark:text-white flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-tealBrand dark:text-teal-400" />
            <span>3. Twilio IVR & Voice Call Recordings</span>
          </h2>
          <p>
            For telephone confirmation calls (1800-TARK-78):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ink-secondary dark:text-ink-muted">
            <li>Audio prompts are delivered in Gujarati, Hindi, or English based on user profile preferences.</li>
            <li>Keypad responses (Press 1 to verify, Press 2 to reopen) are recorded directly into the municipal audit ledger.</li>
            <li>Speech-to-text transcripts are generated solely for issue routing and SLA compliance audits.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-ink-border/60 dark:border-surface-darkBorder">
          <h2 className="text-base font-bold text-ink dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-tealBrand dark:text-teal-400" />
            <span>4. Data Retention & Citizen Rights</span>
          </h2>
          <p>
            Citizen profiles, Karma XP records, and grievance histories are stored securely in municipal data centers. Citizens retain the right to download their report logs, update notification settings, or request anonymization under municipal governance protocols.
          </p>
        </section>
      </Card>
    </div>
  );
};
