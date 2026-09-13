'use client';

import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, Copy, Check, Link2, CheckCircle, Table } from 'lucide-react';

export function UrlEncoderDecoderTool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [scope, setScope] = useState<'component' | 'full'>('component');
  const [input, setInput] = useState<string>('https://example.com/search?query=web tools&category=developer utilities&page=1#results');
  const [copied, setCopied] = useState<boolean>(false);

  const { output, queryParams } = useMemo(() => {
    if (!input) {
      return { output: '', queryParams: [] };
    }

    let out = '';
    const params: { key: string; value: string }[] = [];

    try {
      if (mode === 'encode') {
        if (scope === 'component') {
          out = encodeURIComponent(input);
        } else {
          out = encodeURI(input);
        }
      } else {
        if (scope === 'component') {
          out = decodeURIComponent(input);
        } else {
          out = decodeURI(input);
        }
      }

      if (input.includes('?')) {
        const queryPart = input.split('?')[1].split('#')[0];
        const searchParams = new URLSearchParams(queryPart);
        searchParams.forEach((value, key) => {
          params.push({ key, value });
        });
      }
    } catch {
      out = 'Malformed URL string';
    }

    return { output: out, queryParams: params };
  }, [input, mode, scope]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>RFC 3986 Compliant:</strong> Safely escape and parse query parameters, URI schemes, and fragments completely client-side.</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
            <button
              onClick={() => setMode('encode')}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                mode === 'encode' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Encode URL
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                mode === 'decode' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Decode URL
            </button>
          </div>

          <button
            onClick={handleSwap}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Swap
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span>Scope:</span>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value as 'component' | 'full')}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs text-slate-900 dark:text-white"
            >
              <option value="component">Component (encodeURIComponent - strict)</option>
              <option value="full">Full URL (encodeURI - keeps :// and ?)</option>
            </select>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-4 py-1.5 text-xs font-semibold hover:bg-blue-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Inputs & Outputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Input ({mode === 'encode' ? 'Raw URL or Query Param' : 'Encoded URI'})
          </label>
          <textarea
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Output Result
          </label>
          <textarea
            readOnly
            rows={8}
            value={output}
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 select-all"
          />
        </div>
      </div>

      {/* Query parameter table inspector */}
      {queryParams.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            <Table className="w-4 h-4 text-blue-600" />
            Detected Query Parameters ({queryParams.length})
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-2 w-1/3">Key</th>
                  <th className="px-4 py-2">Decoded Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                {queryParams.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-4 py-2 font-bold text-blue-600 dark:text-blue-400">{p.key}</td>
                    <td className="px-4 py-2 text-slate-700 dark:text-slate-300">{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
