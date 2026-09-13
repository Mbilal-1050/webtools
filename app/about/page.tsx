import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Cpu, Lock, CheckCircle2, Heart, ArrowRight } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { getAbsoluteUrl } from '@/lib/site';

const aboutUrl = getAbsoluteUrl('/about');

export const metadata: Metadata = {
  title: 'About Us - Client-Side Web Tools & Privacy Philosophy',
  description: 'Learn about our mission to provide 100% client-side, browser-native utility tools that respect user privacy with zero server uploads.',
  alternates: {
    canonical: aboutUrl,
  },
  openGraph: {
    title: 'About Us - Client-Side Web Tools & Privacy Philosophy',
    description: 'Learn about our mission to provide 100% client-side, browser-native utility tools that respect user privacy with zero server uploads.',
    url: aboutUrl,
    type: 'website',
    siteName: 'Client-Side Web Tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Client-Side Web Tools',
    description: 'Learn about our mission to provide 100% client-side, browser-native utility tools that respect user privacy.',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20 mb-4">
          <Shield className="w-3.5 h-3.5" />
          Our Mission & Architecture
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Free, Powerful Tools That Never Upload Your Data
        </h1>
        <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We built Client-Side Web Tools to solve a fundamental problem in modern internet utilities: the unnecessary surrender of personal privacy for everyday tasks.
        </p>
      </div>

      <AdSlot position="header" />

      {/* Main Content Article */}
      <div className="mt-10 space-y-10 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Who We Are and Why We Built This
          </h2>
          <p className="mt-4">
            Client-Side Web Tools was founded by software engineers and open-web advocates who grew exhausted watching traditional web utilities force users through mandatory account sign-ups, excessive advertising paywalls, and undisclosed server-side data harvesting.
          </p>
          <p className="mt-3">
            Every day, millions of creators, developers, students, and professionals need to compress an image, inspect a JSON response, format a spreadsheet, hash a string, or calculate an age. On most legacy websites, doing so means uploading confidential company documents, proprietary API tokens, or personal family photos to remote cloud servers where they can be intercepted, cached, or logged.
          </p>
          <p className="mt-3">
            We asked a simple question: <span className="font-semibold text-slate-900 dark:text-white">With modern web browsers possessing desktop-grade graphics pipelines and hardware-accelerated cryptographic primitives, why should simple tools ever need a backend server?</span>
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-4">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Zero Server Uploads</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              When you use our Image Compressor, JSON Formatter, or Password Generator, the processing is performed entirely by JavaScript running on your device CPU/GPU. Your files are read into local browser memory via standard HTML5 File APIs and discarded immediately when you close the tab.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mb-4">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Instant Hardware Speed</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              By removing network upload and download bottlenecks, our tools execute instantaneously. A 10MB image does not need to traverse a slow internet uplink to be resized; your browser hardware renders the new raster in milliseconds.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Our Core Guarantees to You
          </h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">No Account or Registration Required:</strong> You will never be asked to enter an email address, create a password, or verify a phone number just to use our utilities.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">No Hidden Paywalls:</strong> All 26 tools are fully featured with no arbitrary limitations, watermark stamps, or subscription tiers.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Progressive Web App (PWA) Offline Support:</strong> You can install this website directly to your desktop or mobile home screen to utilize our tool suite completely offline during flights or commutes.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Ethical, Transparent Monetization:</strong> We sustain hosting and development through non-intrusive, privacy-compliant advertising partners. We never sell user data or engage in deceptive click patterns.
              </div>
            </div>
          </div>
        </section>

        <AdSlot position="in-content" />

        <div className="text-center pt-4">
          <Link
            href="/#all-tools"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition"
          >
            Explore All 26 Free Tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
