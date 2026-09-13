'use client';

import React, { useState } from 'react';
import { Percent, Copy, Check, CheckCircle, Calculator, TrendingUp, TrendingDown } from 'lucide-react';

export function PercentageCalculatorTool() {
  // Scenario 1: What is X% of Y?
  const [s1X, setS1X] = useState<string>('15');
  const [s1Y, setS1Y] = useState<string>('200');

  // Scenario 2: X is what percent of Y?
  const [s2X, setS2X] = useState<string>('45');
  const [s2Y, setS2Y] = useState<string>('150');

  // Scenario 3: Percentage Change from X to Y
  const [s3X, setS3X] = useState<string>('80');
  const [s3Y, setS3Y] = useState<string>('100');

  // Scenario 4: Discount Calculator
  const [price, setPrice] = useState<string>('120');
  const [discountPercent, setDiscountPercent] = useState<string>('20');

  const [copiedKey, setCopiedKey] = useState<string>('');

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  // Calculations
  const r1 = (() => {
    const x = parseFloat(s1X);
    const y = parseFloat(s1Y);
    if (isNaN(x) || isNaN(y)) return '0';
    return ((x / 100) * y).toFixed(2).replace(/\.00$/, '');
  })();

  const r2 = (() => {
    const x = parseFloat(s2X);
    const y = parseFloat(s2Y);
    if (isNaN(x) || isNaN(y) || y === 0) return '0%';
    return `${((x / y) * 100).toFixed(2).replace(/\.00$/, '')}%`;
  })();

  const { r3, isIncrease } = (() => {
    const x = parseFloat(s3X);
    const y = parseFloat(s3Y);
    if (isNaN(x) || isNaN(y) || x === 0) return { r3: '0%', isIncrease: true };
    const diff = y - x;
    const pct = (diff / Math.abs(x)) * 100;
    return {
      r3: `${Math.abs(pct).toFixed(2).replace(/\.00$/, '')}%`,
      isIncrease: diff >= 0,
    };
  })();

  const { finalPrice, amountSaved } = (() => {
    const p = parseFloat(price);
    const d = parseFloat(discountPercent);
    if (isNaN(p) || isNaN(d)) return { finalPrice: '0', amountSaved: '0' };
    const saved = (p * d) / 100;
    const final = Math.max(0, p - saved);
    return {
      finalPrice: final.toFixed(2),
      amountSaved: saved.toFixed(2),
    };
  })();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Precision Financial Math:</strong> Real-time percentage proportions, delta change ratios, and discount computations.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scenario 1: What is X% of Y? */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            What is X% of Y?
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">What is</span>
            <input
              type="number"
              value={s1X}
              onChange={(e) => setS1X(e.target.value)}
              className="w-20 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-center font-mono text-sm text-slate-900 dark:text-white"
            />
            <span className="text-xs text-slate-500">% of</span>
            <input
              type="number"
              value={s1Y}
              onChange={(e) => setS1Y(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-center font-mono text-sm text-slate-900 dark:text-white"
            />
            <span className="text-xs text-slate-500">?</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <span className="text-xs font-semibold text-blue-900 dark:text-blue-300">Result</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-blue-600 dark:text-blue-400">{r1}</span>
              <button onClick={() => copyVal(r1, 's1')} className="text-blue-600 hover:text-blue-700">
                {copiedKey === 's1' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Scenario 2: X is what percent of Y? */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            X is what percent of Y?
          </h3>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={s2X}
              onChange={(e) => setS2X(e.target.value)}
              className="w-24 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-center font-mono text-sm text-slate-900 dark:text-white"
            />
            <span className="text-xs text-slate-500">is what % of</span>
            <input
              type="number"
              value={s2Y}
              onChange={(e) => setS2Y(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-center font-mono text-sm text-slate-900 dark:text-white"
            />
            <span className="text-xs text-slate-500">?</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60">
            <span className="text-xs font-semibold text-blue-900 dark:text-blue-300">Percentage</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-blue-600 dark:text-blue-400">{r2}</span>
              <button onClick={() => copyVal(r2, 's2')} className="text-blue-600 hover:text-blue-700">
                {copiedKey === 's2' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Scenario 3: Percentage Increase / Decrease */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Percentage Change (Increase / Decrease)
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">From</span>
            <input
              type="number"
              value={s3X}
              onChange={(e) => setS3X(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-center font-mono text-sm text-slate-900 dark:text-white"
            />
            <span className="text-xs text-slate-500">to</span>
            <input
              type="number"
              value={s3Y}
              onChange={(e) => setS3Y(e.target.value)}
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-center font-mono text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div
            className={`flex items-center justify-between p-3 rounded-xl border ${
              isIncrease
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
            }`}
          >
            <div className="flex items-center gap-1.5 text-xs font-bold">
              {isIncrease ? (
                <>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 dark:text-emerald-300">Increase</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-rose-600" />
                  <span className="text-rose-700 dark:text-rose-300">Decrease</span>
                </>
              )}
            </div>
            <span
              className={`font-mono text-xl font-bold ${
                isIncrease ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {isIncrease ? `+${r3}` : `-${r3}`}
            </span>
          </div>
        </div>

        {/* Scenario 4: Discount Price Calculator */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Discount & Savings
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-semibold">Original Price ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 font-mono text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 uppercase font-semibold">Discount (%)</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 font-mono text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="text-slate-500 text-[10px]">Final Price</span>
              <div className="font-mono text-base font-bold text-slate-900 dark:text-white">${finalPrice}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800">
              <span className="text-emerald-700 dark:text-emerald-300 text-[10px]">You Save</span>
              <div className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">${amountSaved}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
