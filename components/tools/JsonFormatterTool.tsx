'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, RefreshCw, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

const SAMPLE_JSON = `{
  "product": "Client-Side Web Tools",
  "version": "2.5.0",
  "privacy": {
    "serverUploads": false,
    "hardwareAccelerated": true,
    "storage": "localStorage"
  },
  "supportedCategories": [
    "Image & Media",
    "Developer Utilities",
    "Text & Writing",
    "Math & Everyday Calculators"
  ],
  "stats": {
    "toolsCount": 26,
    "speedMs": 1.4,
    "activeUsers": 45000
  }
}`;

export function JsonFormatterTool() {
  const [input, setInput] = useState<string>(SAMPLE_JSON);
  const [indent, setIndent] = useState<number | 'tab' | 0>(2);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [stats, setStats] = useState<{ keys: number; size: number }>({ keys: 7, size: SAMPLE_JSON.length });

  const formatJson = (text: string, space: number | 'tab' | 0) => {
    if (!text.trim()) {
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(text);
      setError(null);

      // Count total keys recursively
      const countKeys = (obj: any): number => {
        if (typeof obj !== 'object' || obj === null) return 0;
        let count = Array.isArray(obj) ? 0 : Object.keys(obj).length;
        for (const k in obj) {
          count += countKeys(obj[k]);
        }
        return count;
      };

      setStats({
        keys: countKeys(parsed),
        size: text.length,
      });

      const indentVal = space === 'tab' ? '\t' : space;
      const formatted = JSON.stringify(parsed, null, indentVal);
      setInput(formatted);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([input], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formatted.json';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>V8 Native JSON Engine:</strong> Safe for proprietary API payloads, config tokens, and database dumps. Zero server transmission.</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Indentation:</span>
          <button
            onClick={() => {
              setIndent(2);
              formatJson(input, 2);
            }}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
              indent === 2
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            2 Spaces
          </button>
          <button
            onClick={() => {
              setIndent(4);
              formatJson(input, 4);
            }}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
              indent === 4
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            4 Spaces
          </button>
          <button
            onClick={() => {
              setIndent('tab');
              formatJson(input, 'tab');
            }}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
              indent === 'tab'
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            Tab
          </button>
          <button
            onClick={() => {
              setIndent(0);
              formatJson(input, 0);
            }}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition ${
              indent === 0
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            Minify (1 Line)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setInput(SAMPLE_JSON);
              formatJson(SAMPLE_JSON, 2);
            }}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100"
          >
            Reset Sample
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-100 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={downloadJson}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>

      {/* Error alert if syntax invalid */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span className="font-mono">{error}</span>
        </div>
      )}

      {/* Editor & telemetry container */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3">
        <textarea
          rows={16}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            try {
              JSON.parse(e.target.value);
              setError(null);
            } catch (err: any) {
              setError(err.message);
            }
          }}
          placeholder="Paste raw JSON here..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 font-mono text-xs text-slate-900 dark:text-slate-100 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
          spellCheck={false}
        />

        <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 font-mono">
            <span>Size: {input.length.toLocaleString()} characters ({Math.round(input.length / 1024 * 10) / 10} KB)</span>
            <span>Keys parsed: {stats.keys}</span>
          </div>
          <div>
            {!error ? (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" /> Valid JSON
              </span>
            ) : (
              <span className="text-rose-600 font-semibold">Invalid JSON</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
