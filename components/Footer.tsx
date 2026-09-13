'use client';

import React from 'react';
import Link from 'next/link';
import { AdSlot } from './AdSlot';
import { CATEGORIES, TOOLS_DATA } from '@/lib/tools-data';
import { Wrench, Shield, Lock, Cpu, Globe, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Pre-footer AdSlot */}
        <AdSlot position="footer" />

        {/* Value Proposition Row */}
        <div className="my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 border-y border-slate-200/80 dark:border-slate-800/80 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">100% Private</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Files and inputs never leave your browser.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Client-Side Speed</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Hardware accelerated by Canvas & Web Crypto.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">Zero Signup & Free</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">No account required, no usage limits.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">PWA & Offline Ready</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Install to your device and use without internet.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                Client-Side Web Tools
              </span>
            </Link>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              A comprehensive suite of browser-native developer, image, text, and everyday calculation tools designed for speed, zero server latency, and uncompromising client-side privacy.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All 26 tools operational & ready offline</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Categories
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/#cat-${cat.id}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Popular Tools
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {TOOLS_DATA.filter((t) => t.popular).slice(0, 5).map((tool) => (
                <li key={tool.id}>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Trust & Legal
            </h3>
            <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-8 gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            &copy; {currentYear} Client-Side Web Tools. Free forever. No API keys, no accounts, 100% in-browser execution.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/privacy-policy" className="hover:underline">
              GDPR & CCPA Compliant
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:underline">
              Security Guarantee
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
