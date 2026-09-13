'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  Lock,
  Share2,
  Check,
  Maximize2,
  Minimize2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ToolItem } from '@/lib/tools-data';
import { AdSlot } from './AdSlot';

interface ToolPageClientProps {
  tool: ToolItem;
  children: React.ReactNode;
  relatedTools: ToolItem[];
}

export function ToolPageClient({ tool, children, relatedTools }: ToolPageClientProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`transition-all duration-300 ${
        isFocusMode ? 'max-w-[96vw] mx-auto px-2 py-4' : 'max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8'
      }`}
    >
      {/* Breadcrumbs & Utility Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={`/#cat-${tool.category}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            {tool.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
            {tool.name}
          </span>
        </nav>

        <div className="flex items-center gap-2">
          {/* Focus Mode Button */}
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-xs"
            title={isFocusMode ? 'Exit Wide Focus Mode' : 'Enter Wide Focus Mode'}
          >
            {isFocusMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Normal View</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Wide Mode</span>
              </>
            )}
          </button>

          {/* Share / Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-xs"
            title="Copy direct tool URL"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Share Tool</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Header Info Banner */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 px-3 py-1 text-xs font-semibold border border-blue-200/50 dark:border-blue-800/50">
            {tool.categoryName}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 px-3 py-1 text-xs font-semibold border border-emerald-200/50 dark:border-emerald-800/50">
            <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            100% In-Browser Privacy
          </span>
          {tool.badge && (
            <span className="rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 px-3 py-1 text-xs font-medium">
              {tool.badge}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {tool.name}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          {tool.shortDescription}
        </p>
      </div>

      {/* Ad slot (Cleanly hidden unless configured) */}
      <AdSlot position="header" />

      {/* Primary Tool Container */}
      <motion.section
        layout
        id={`tool-${tool.id}`}
        className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 p-4 sm:p-8 shadow-sm backdrop-blur-md transition-shadow hover:shadow-md"
      >
        {/* Subtle accent glow line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-blue-600/40 to-indigo-500/20" />
        {children}
      </motion.section>

      {/* In-content ad slot (cleanly hidden unless configured) */}
      <AdSlot position="in-content" />

      {/* Informational Columns */}
      {!isFocusMode && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          <div className="lg:col-span-2 space-y-8">
            {/* Detailed Description */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-3">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                About {tool.name}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {tool.longDescription}
              </p>
            </div>

            {/* How-To Steps */}
            {tool.howToSteps && tool.howToSteps.length > 0 && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  How to Use {tool.name}
                </h2>
                <div className="space-y-4">
                  {tool.howToSteps.map((step) => (
                    <div key={step.step} className="flex items-start gap-4">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 font-mono text-xs font-bold text-white shadow-xs">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                          {step.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy & Hardware Security FAQ Card */}
            <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Zero Server Upload Privacy Guarantee</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                This utility runs strictly within your browser sandbox via modern Web APIs (Canvas, Web Workers,
                and Web Crypto). No image bytes, text strings, or credentials are transmitted over the internet or saved to an external database.
              </p>
            </div>
          </div>

          {/* Sidebar: Features and Related Tools */}
          <div className="space-y-6">
            {tool.features && tool.features.length > 0 && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
                  Key Capabilities
                </h3>
                <ul className="space-y-2.5">
                  {tool.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Related Tools</span>
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                </h3>
                <div className="space-y-2.5">
                  {relatedTools.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/tools/${rel.slug}`}
                      className="group block rounded-xl border border-slate-100 dark:border-slate-800/70 p-3 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                          {rel.name}
                        </span>
                        <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                        {rel.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar Ad Slot */}
            <AdSlot position="sidebar" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
