'use client';

import React from 'react';
import { Lock, Cpu, Globe, Shield } from 'lucide-react';

const TRUST_BADGES = [
  {
    title: '100% Private',
    description: 'Files and inputs never leave your browser.',
    icon: Lock,
    iconBg: 'bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
  },
  {
    title: 'Client-Side Speed',
    description: 'Hardware accelerated by Canvas & Web Crypto.',
    icon: Cpu,
    iconBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
  },
  {
    title: 'Zero Signup & Free',
    description: 'No account required, no usage limits.',
    icon: Globe,
    iconBg: 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
  },
  {
    title: 'PWA & Offline Ready',
    description: 'Install to your device and use without internet.',
    icon: Shield,
    iconBg: 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
  },
] as const;

export function TrustBadges() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto text-left">
      {TRUST_BADGES.map((badge) => {
        const Icon = badge.icon;
        return (
          <div
            key={badge.title}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/70 shadow-xs backdrop-blur-xs transition hover:border-slate-300 dark:hover:border-slate-700"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${badge.iconBg}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {badge.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-0.5">
                {badge.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
