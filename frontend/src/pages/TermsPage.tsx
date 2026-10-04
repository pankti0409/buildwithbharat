import React from 'react';
import { Card } from '../components/common/Card';
import { FileText, ShieldAlert, Award, Scale } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tealBrand-subtle dark:bg-tealBrand/20 text-tealBrand dark:text-teal-300 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Municipal Citizen Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink dark:text-white">
          Terms of Use & Civic Code of Conduct
        </h1>
        <p className="text-xs text-ink-muted font-mono">
          Last Updated: October 2026 • Validated across Gujarat Municipal Corporations
        </p>
      </div>

      <Card className="p-6 sm:p-8 space-y-6 bg-white dark:bg-surface-dark border-ink-border dark:border-surface-darkBorder leading-relaxed text-sm text-ink-secondary dark:text-ink-secondary">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-ink dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-tealBrand dark:text-teal-400" />
            <span>1. Citizen Reporting Responsibilities</span>
          </h2>
          <p>
            Citizens agree to submit genuine civic grievances with unaltered photos captured at the physical site of the incident. Submitting deliberately fabricated, spam, or malicious reports may result in Karma XP deductions, temporary suspension, or civic review.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-ink-border/60 dark:border-surface-darkBorder">
          <h2 className="text-base font-bold text-ink dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-500" />
            <span>2. Department Officer SLA & Geo-Fence Rules</span>
          </h2>
          <p>
            Field officers and contractors must strictly adhere to the <b>≤100-meter geo-fence verification mandate</b>. Resolution photos attempted beyond this threshold are automatically rejected by the platform and flagged in the municipal vigilance sentinel.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-ink-border/60 dark:border-surface-darkBorder">
          <h2 className="text-base font-bold text-ink dark:text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amberBrand" />
            <span>3. Karma Rewards & Municipal Vouchers</span>
          </h2>
          <p>
            Karma points earned through verified reporting, upvoting, and prompt IVR verification calls are non-transferable and can be redeemed strictly for participating municipal partner vouchers (Metro recharge coupons, property tax rebates, and municipal nursery saplings).
          </p>
        </section>
      </Card>
    </div>
  );
};
