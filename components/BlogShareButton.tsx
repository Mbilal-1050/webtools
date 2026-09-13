'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

export function BlogShareButton({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : `https://ais-pre-vrbqudsrlwcp7gonld62ep-473876566031.asia-east1.run.app/blog/${slug}`;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Fallback silently
      }
    }
  };

  return (
    <button
      id={`btn-share-${slug}`}
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 shadow-2xs transition"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-emerald-600">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Guide</span>
        </>
      )}
    </button>
  );
}
