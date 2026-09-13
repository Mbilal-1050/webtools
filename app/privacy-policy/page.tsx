import React from 'react';
import type { Metadata } from 'next';
import { Shield, Lock, EyeOff, Cookie, ServerOff, FileCheck } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { getAbsoluteUrl } from '@/lib/site';

const privacyUrl = getAbsoluteUrl('/privacy-policy');

export const metadata: Metadata = {
  title: 'Privacy Policy - Client-Side Web Tools',
  description: 'Comprehensive privacy policy outlining our client-side processing architecture, cookie usage, third-party advertising policies, and user data rights.',
  alternates: {
    canonical: privacyUrl,
  },
  openGraph: {
    title: 'Privacy Policy - Client-Side Web Tools',
    description: 'Comprehensive privacy policy outlining our client-side processing architecture, cookie usage, third-party advertising policies, and user data rights.',
    url: privacyUrl,
    type: 'website',
    siteName: 'Client-Side Web Tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Client-Side Web Tools',
    description: 'Comprehensive privacy policy outlining our client-side architecture and data protection.',
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 2026';

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20 mb-4">
          <Shield className="w-3.5 h-3.5" />
          Data Protection & Privacy
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Last Updated: {lastUpdated} • Effective Immediately
        </p>
      </div>

      <AdSlot position="header" />

      <div className="mt-10 space-y-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-sm text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ServerOff className="h-5 w-5 text-blue-600" />
            1. Fundamental Architecture: 100% Client-Side Processing
          </h2>
          <p className="mt-3">
            At <strong>Client-Side Web Tools</strong>, the confidentiality and sovereignty of your data is the bedrock of our service. Unlike traditional web services, our tools are engineered to execute exclusively within your local web browser sandbox using modern standard HTML5, Canvas, Web Cryptography, and ECMAScript APIs.
          </p>
          <div className="mt-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 p-4 border border-blue-200 dark:border-blue-900/60">
            <strong className="text-blue-950 dark:text-blue-200 block text-sm font-semibold mb-1">
              The Client-Side Guarantee:
            </strong>
            <p className="text-xs sm:text-sm text-blue-900/90 dark:text-blue-300 leading-relaxed">
              When you compress images, format JSON, hash passwords, test regular expressions, or convert units on our website, <strong>your files and data never leave your computer or mobile device</strong>. No image rasters, text payloads, cryptographic secrets, or calculation variables are ever transmitted to or stored on our servers.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-600" />
            2. Information We Do NOT Collect
          </h2>
          <p className="mt-3">
            Because our core utilities run client-side, we explicitly do not collect, process, or store:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Any images, photos, or graphic files imported into our Image tools.</li>
            <li>Any JSON files, code snippets, SQL dumps, or spreadsheet documents.</li>
            <li>Any passwords, passphrases, or entropy tokens generated via our Password utility.</li>
            <li>Any personal dates of birth, health biometrics, or heights/weights entered in calculators.</li>
            <li>User account credentials, names, telephone numbers, or physical mailing addresses.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cookie className="h-5 w-5 text-blue-600" />
            3. Cookies, Web Storage, and Local Persistence
          </h2>
          <p className="mt-3">
            We utilize standard browser Web Storage (<code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono">localStorage</code>) strictly for storing your user experience preferences, such as:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
            <li>Your chosen visual theme preference (Light mode or Dark mode).</li>
            <li>Your cookie consent acknowledgment status.</li>
            <li>Your locally starred / favorite tools for quick access.</li>
          </ul>
          <p className="mt-3">
            Local storage keys are confined strictly to your own browser and are not readable by third-party origins or uploaded to remote databases.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <EyeOff className="h-5 w-5 text-blue-600" />
            4. Third-Party Advertising & Cookie Disclosures
          </h2>
          <p className="mt-3">
            To keep all 26 tools completely free and accessible without paywalls or subscriptions, we display advertisements provided by third-party advertising partners, including Google and authorized ad networks.
          </p>
          <p className="mt-3">
            These advertising networks may use cookies, web beacons, and related tracking technologies to serve non-personalized or personalized ads based on a user&apos;s prior visits to this website or other internet websites.
          </p>
          <div className="mt-4 space-y-2 text-xs sm:text-sm">
            <p>
              • <strong>Google DART Cookie:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
            </p>
            <p>
              • <strong>Opting Out:</strong> Users may opt out of personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings page</a>. Alternatively, you can opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">aboutads.info</a>.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-blue-600" />
            5. GDPR and CCPA Compliance & User Rights
          </h2>
          <p className="mt-3">
            Under the European General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), individuals have specific rights regarding their personal information:
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li><strong>Right to Know / Access:</strong> You have the right to know what personal data is processed. Because we operate 100% client-side without storing user accounts or logs, we possess no personally identifiable database records regarding your identity.</li>
            <li><strong>Right to Deletion:</strong> You can clear all cached preferences (theme, cookie choices) at any moment by clearing your browser site data or cookies for this domain.</li>
            <li><strong>Do Not Sell My Personal Information:</strong> We do not sell personal data. You may control advertising cookie consent directly through our in-app cookie preference settings banner.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            6. Contact Us Regarding Privacy
          </h2>
          <p className="mt-3">
            If you have questions or concerns about our privacy practices, please contact us at <a href="mailto:support@clienttools.local" className="text-blue-600 underline font-medium">support@clienttools.local</a> or submit a query through our <a href="/contact" className="text-blue-600 underline font-medium">Contact Form</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
