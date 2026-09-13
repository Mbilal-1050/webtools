'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, CheckCircle, Trash2, ArrowUpDown } from 'lucide-react';

export function DuplicateLineRemoverTool() {
  const [inputText, setInputText] = useState<string>(
    `apple\nbanana\norange\napple\nApple\nbanana\ngrape\n\nwatermelon\norange\nstrawberry`
  );
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [trimWhitespace, setTrimWhitespace] = useState<boolean>(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [copied, setCopied] = useState<boolean>(false);

  const { outputText, originalCount, cleanCount, duplicatesRemoved } = useMemo(() => {
    const rawLines = inputText.split('\n');
    const origCount = rawLines.length;

    let lines = rawLines.map((line) => (trimWhitespace ? line.trim() : line));

    if (removeEmptyLines) {
      lines = lines.filter((line) => line.length > 0);
    }

    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      }
    }

    if (sortOrder === 'asc') {
      uniqueLines.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    } else if (sortOrder === 'desc') {
      uniqueLines.sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));
    }

    const output = uniqueLines.join('\n');
    const duplicates = origCount - uniqueLines.length;

    return {
      outputText: output,
      originalCount: origCount,
      cleanCount: uniqueLines.length,
      duplicatesRemoved: Math.max(0, duplicates),
    };
  }, [inputText, caseSensitive, trimWhitespace, removeEmptyLines, sortOrder]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'deduplicated_lines.txt';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Client-Side Deduplication:</strong> Clean and sort lists, emails, keywords, and datasets in memory with zero cloud transfer.</span>
      </div>

      {/* Status Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Original Lines</span>
          <div className="mt-1 font-mono text-xl font-bold text-slate-800 dark:text-slate-200">{originalCount}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Unique Lines</span>
          <div className="mt-1 font-mono text-xl font-bold text-blue-600 dark:text-blue-400">{cleanCount}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Removed</span>
          <div className="mt-1 font-mono text-xl font-bold text-rose-600 dark:text-rose-400">{duplicatesRemoved}</div>
        </div>
      </div>

      {/* Options Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded border-slate-300 text-blue-600"
            />
            Case Sensitive
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={trimWhitespace}
              onChange={(e) => setTrimWhitespace(e.target.checked)}
              className="rounded border-slate-300 text-blue-600"
            />
            Trim Whitespace
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={removeEmptyLines}
              onChange={(e) => setRemoveEmptyLines(e.target.checked)}
              className="rounded border-slate-300 text-blue-600"
            />
            Remove Empty Lines
          </label>

          <div className="flex items-center gap-2">
            <span>Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-xs text-slate-900 dark:text-white"
            >
              <option value="none">Original Order</option>
              <option value="asc">Alphabetical (A-Z)</option>
              <option value="desc">Reverse (Z-A)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-4 py-1.5 text-xs font-semibold hover:bg-blue-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Clean'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download .txt
          </button>
        </div>
      </div>

      {/* Split Textareas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Raw Input Lines
          </label>
          <textarea
            rows={12}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Deduplicated & Cleaned Output
          </label>
          <textarea
            readOnly
            rows={12}
            value={outputText}
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 select-all"
          />
        </div>
      </div>
    </div>
  );
}
