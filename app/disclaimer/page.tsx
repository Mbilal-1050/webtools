import React from 'react';
import type { Metadata } from 'next';
import { AlertTriangle, Info, CheckCircle, Shield } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Disclaimer - Client-Side Web Tools',
  description: 'Important disclaimers regarding the accuracy of calculations, conversions, health metrics, and client-side processing.',
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20 mb-4">
          <AlertTriangle className="w-3.5 h-3.5" />
          Technical & Legal Notice
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Disclaimer
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Important disclosures regarding calculations, file processing, and health metrics
        </p>
      </div>

      <AdSlot position="header" />

      <div className="mt-10 space-y-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-600" />
            1. General Information Disclaimer
          </h2>
          <p className="mt-3">
            All tools, utilities, calculators, formatters, and generators provided on <strong>Client-Side Web Tools</strong> are offered for general informational, educational, and developer convenience purposes only. While we test our mathematical algorithms and parsers against industry specifications (RFCs, SI standards, NIST guidelines), we make no representations or warranties regarding mathematical infallibility or suitability for specialized engineering tasks.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            2. Health & Medical Disclaimer (BMI Calculator)
          </h2>
          <div className="mt-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 p-4 border border-amber-200 dark:border-amber-900/50">
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
              The Body Mass Index (BMI) Calculator provides statistical approximations based on standard World Health Organization (WHO) population formulas. It is <strong>NOT</strong> medical advice, diagnosis, or treatment. BMI does not evaluate body fat percentage, muscular distribution, bone density, or individual cardiovascular health. Always consult a licensed medical professional or physician for health evaluations.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            3. Cryptography & Security Notice (Hash & Password Generators)
          </h2>
          <p className="mt-3">
            Our Hash Generator supports legacy algorithms (such as MD5 and SHA-1) purely for file integrity verification against legacy checksums. We explicitly remind users that MD5 and SHA-1 are cryptographically vulnerable to collision attacks and should never be used for digital signatures or password storage. SHA-256 or stronger algorithms should always be preferred.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            4. File Processing & Data Loss Safeguards
          </h2>
          <p className="mt-3">
            Because image compression, resizing, and file conversions occur directly inside your browser memory, hardware crashes, low device memory, or accidental tab closures can interrupt active jobs. We strongly recommend always retaining original unedited copies of any critical media files before processing.
          </p>
        </section>
      </div>
    </div>
  );
}
