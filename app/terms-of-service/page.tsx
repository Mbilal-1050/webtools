import React from 'react';
import type { Metadata } from 'next';
import { FileText, Scale, ShieldAlert, Check } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';

export const metadata: Metadata = {
  title: 'Terms of Service - Client-Side Web Tools',
  description: 'Terms and conditions governing the use of Client-Side Web Tools free online utilities.',
};

export default function TermsOfServicePage() {
  const lastUpdated = 'September 2026';

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20 mb-4">
          <Scale className="w-3.5 h-3.5" />
          Legal Terms
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Last Updated: {lastUpdated}
        </p>
      </div>

      <AdSlot position="header" />

      <div className="mt-10 space-y-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            1. Agreement to Terms
          </h2>
          <p className="mt-3">
            By accessing or using <strong>Client-Side Web Tools</strong> (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            2. Permitted Use and Client-Side Operation
          </h2>
          <p className="mt-3">
            The Service provides client-side computational, conversion, image processing, and formatting tools for personal, academic, and commercial purposes. Because all software operations occur on your own hardware, you are solely responsible for:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Maintaining appropriate backups of your original files before executing transformations.</li>
            <li>Ensuring that files and content processed using our tools do not violate copyright, intellectual property, or applicable laws.</li>
            <li>Verifying the accuracy of mathematical calculations, hashes, or code conversions for mission-critical production environments.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            3. Intellectual Property Rights
          </h2>
          <p className="mt-3">
            <strong>Your Content Remains Yours:</strong> We claim zero ownership, rights, or interest in any files, code, strings, images, or assets processed through our tools. Your input and output data belong exclusively to you.
          </p>
          <p className="mt-3">
            The application interface, design system, logo, brand assets, source code, and website layout are the intellectual property of Client-Side Web Tools and are protected by applicable copyright and trademark laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            4. Disclaimer of Warranties
          </h2>
          <p className="mt-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, ACCURACY, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            5. Limitation of Liability
          </h2>
          <p className="mt-3 text-xs sm:text-sm">
            TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL CLIENT-SIDE WEB TOOLS, ITS OPERATORS, OR CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA CORRUPTION, BUSINESS INTERRUPTION, OR HARDWARE FAILURE ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            6. Modifications to the Service and Terms
          </h2>
          <p className="mt-3">
            We reserve the right to modify, enhance, or discontinue any tool or feature at any time without prior notice. We may update these Terms periodically, and your continued use of the website constitutes acceptance of any revised terms.
          </p>
        </section>
      </div>
    </div>
  );
}
