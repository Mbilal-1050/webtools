import React from 'react';
import Link from 'next/link';
import { Wrench, ArrowLeft, Search } from 'lucide-react';
import { TOOLS_DATA } from '@/lib/tools-data';

export default function NotFound() {
  const popularTools = TOOLS_DATA.filter((t) => t.popular).slice(0, 4);

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 mb-6">
        <Wrench className="h-8 w-8 animate-bounce" />
      </div>

      <span className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400">
        404 Error
      </span>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
        Tool Page Not Found
      </h1>
      <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        The tool or page you requested could not be located. It may have been moved, or the link might be misspelled.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Homepage
        </Link>
        <Link
          href="/#all-tools"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Search className="w-4 h-4" />
          Browse All 26 Tools
        </Link>
      </div>

      {/* Suggested Popular Tools */}
      <div className="mt-16 text-left border-t border-slate-200 dark:border-slate-800 pt-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 text-center">
          Popular Tools You Might Be Looking For
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-blue-500 dark:hover:border-blue-500 transition group"
            >
              <h4 className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tool.name}
              </h4>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                {tool.shortDescription}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
