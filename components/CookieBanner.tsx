'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie, Shield, Check, X } from 'lucide-react';

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);
  const [adConsent, setAdConsent] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({ necessary: true, analytics: true, advertising: true, date: new Date().toISOString() })
    );
    setShow(false);
  };

  const handleDeclineNonEssential = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({ necessary: true, analytics: false, advertising: false, date: new Date().toISOString() })
    );
    setShow(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        necessary: true,
        analytics: analyticsConsent,
        advertising: adConsent,
        date: new Date().toISOString(),
      })
    );
    setShowPreferences(false);
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      <div
        id="cookie-consent-banner"
        className="fixed bottom-0 inset-x-0 z-40 p-4 sm:p-6 transition-all duration-300 pointer-events-auto"
      >
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-4 sm:p-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                <Cookie className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Privacy & Cookie Preferences</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-normal text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                    <Shield className="w-3 h-3" />
                    Client-Side Execution
                  </span>
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  We use cookies and local storage to remember your tool preferences (such as dark mode) and to support relevant, non-intrusive advertising that keeps these tools 100% free. Your tool files and calculations never leave your browser.{' '}
                  <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                    Read Privacy Policy
                  </Link>.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 self-end md:self-center">
              <button
                id="btn-cookie-settings"
                onClick={() => setShowPreferences(true)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Customize
              </button>
              <button
                id="btn-cookie-decline"
                onClick={handleDeclineNonEssential}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Essential Only
              </button>
              <button
                id="btn-cookie-accept"
                onClick={handleAcceptAll}
                className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-blue-700 transition"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPreferences && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-6 shadow-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Cookie className="h-4 w-4 text-blue-600" />
                Customize Cookie Consent
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-start justify-between gap-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 p-3.5">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">Strictly Necessary Cookies</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Essential for website accessibility, theme preference caching, and security. Cannot be disabled.
                  </div>
                </div>
                <span className="rounded-full bg-slate-200 dark:bg-slate-700 px-2.5 py-1 text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                  Always Active
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 p-3.5">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">Analytics Cookies</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Helps us understand how visitors interact with tools anonymously to improve performance.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex items-start justify-between gap-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 p-3.5">
                <div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">Advertising & Sponsorship Cookies</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Used by authorized partners to serve contextual, non-intrusive advertisements.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={adConsent}
                  onChange={(e) => setAdConsent(e.target.checked)}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800 pt-4">
              <button
                onClick={() => setShowPreferences(false)}
                className="rounded-xl px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
              >
                <Check className="h-4 w-4" />
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
