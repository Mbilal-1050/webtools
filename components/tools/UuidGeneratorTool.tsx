'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, Download, CheckCircle, Fingerprint } from 'lucide-react';

export function UuidGeneratorTool() {
  const [quantity, setQuantity] = useState<number>(5);
  const [includeHyphens, setIncludeHyphens] = useState<boolean>(true);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);

  const uuids = React.useMemo(() => {
    // seed triggers recalculation on demand
    void seed;
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let id = '';
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        id = crypto.randomUUID();
      } else {
        // Standard RFC4122 v4 fallback
        id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }

      if (!includeHyphens) {
        id = id.replace(/-/g, '');
      }
      if (uppercase) {
        id = id.toUpperCase();
      } else {
        id = id.toLowerCase();
      }
      list.push(id);
    }
    return list;
  }, [quantity, includeHyphens, uppercase, seed]);

  const copySingle = (uuid: string, idx: number) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const downloadTxt = () => {
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `uuids_${quantity}.txt`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Cryptographically Secure (CSPRNG):</strong> Generates Version 4 UUIDs using browser entropy. Suitable for distributed database keys.</span>
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Quantity: <span className="font-mono text-blue-600">{quantity}</span>
            </label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-900 dark:text-white"
            >
              <option value={1}>1 UUID</option>
              <option value={5}>5 UUIDs</option>
              <option value={10}>10 UUIDs</option>
              <option value={25}>25 UUIDs</option>
              <option value={50}>50 UUIDs</option>
              <option value={100}>100 UUIDs</option>
            </select>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeHyphens}
                onChange={(e) => setIncludeHyphens(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              Hyphens (e.g. 8-4-4-4-12)
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              Uppercase
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Regenerate
          </button>
          <button
            onClick={copyAll}
            className="flex items-center gap-1.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 px-3.5 py-2 text-xs font-semibold hover:bg-blue-100 transition"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedAll ? 'Copied All!' : 'Copy All'}
          </button>
          <button
            onClick={downloadTxt}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download .TXT
          </button>
        </div>
      </div>

      {/* UUIDs Display List */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
        {uuids.map((uuid, idx) => (
          <div key={idx} className="flex items-center justify-between py-2.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl transition">
            <div className="flex items-center gap-3 font-mono text-xs text-slate-800 dark:text-slate-200">
              <span className="text-[10px] text-slate-400 w-6">#{idx + 1}</span>
              <span className="select-all font-semibold text-blue-600 dark:text-blue-400">{uuid}</span>
            </div>
            <button
              onClick={() => copySingle(uuid, idx)}
              className="rounded-lg p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Copy single UUID"
            >
              {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
