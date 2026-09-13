'use client';

import React, { useState, useEffect } from 'react';
import { KeyRound, Copy, Check, RefreshCw, CheckCircle, ShieldCheck, AlertTriangle } from 'lucide-react';

export function PasswordGeneratorTool() {
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(true);
  const [bulkCount, setBulkCount] = useState<number>(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const generatePasswords = () => {
    let charset = '';
    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lower = 'abcdefghijklmnopqrstuvwxyz';
    let numbers = '0123456789';
    let symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (excludeAmbiguous) {
      upper = upper.replace(/[IO]/g, '');
      lower = lower.replace(/[lo]/g, '');
      numbers = numbers.replace(/[01]/g, '');
    }

    if (includeUpper) charset += upper;
    if (includeLower) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (!charset) {
      setPasswords(['Select at least one character type']);
      return;
    }

    const generated: string[] = [];
    const array = new Uint32Array(length);

    for (let b = 0; b < bulkCount; b++) {
      crypto.getRandomValues(array);
      let pwd = '';
      for (let i = 0; i < length; i++) {
        pwd += charset[array[i] % charset.length];
      }
      generated.push(pwd);
    }

    setPasswords(generated);
  };

  useEffect(() => {
    generatePasswords();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous, bulkCount]);

  // Calculate NIST Entropy (bits = length * log2(poolSize))
  const poolSize =
    (includeUpper ? (excludeAmbiguous ? 24 : 26) : 0) +
    (includeLower ? (excludeAmbiguous ? 24 : 26) : 0) +
    (includeNumbers ? (excludeAmbiguous ? 8 : 10) : 0) +
    (includeSymbols ? 29 : 0);

  const entropyBits = poolSize > 0 ? Math.round(length * (Math.log(poolSize) / Math.log(2))) : 0;

  const strengthAssessment = (() => {
    if (entropyBits < 40) return { label: 'Very Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (entropyBits < 60) return { label: 'Weak', color: 'bg-amber-500', text: 'text-amber-600' };
    if (entropyBits < 80) return { label: 'Fair / Good', color: 'bg-blue-500', text: 'text-blue-600' };
    if (entropyBits < 100) return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
    return { label: 'Ultra High Security', color: 'bg-emerald-600', text: 'text-emerald-700 dark:text-emerald-400' };
  })();

  const copyPassword = (pwd: string, idx: number) => {
    navigator.clipboard.writeText(pwd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Web Crypto CSPRNG:</strong> Cryptographically secure pseudo-random number generation. Your keys are never cached or logged.</span>
      </div>

      {/* Main Password Banner (Primary) */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Generated Password</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${strengthAssessment.text}`}>
              {strengthAssessment.label} ({entropyBits} bits entropy)
            </span>
          </div>
        </div>

        {/* Password Display Box */}
        <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-800">
          <div className="font-mono text-lg sm:text-xl font-bold tracking-wider text-blue-600 dark:text-blue-400 break-all select-all">
            {passwords[0]}
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => generatePasswords()}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-blue-600 transition"
              title="Generate new password"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              onClick={() => copyPassword(passwords[0], 0)}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700 shadow-sm transition active:scale-95"
            >
              {copiedIdx === 0 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedIdx === 0 ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Strength Progress Bar */}
        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            style={{ width: `${Math.min(100, (entropyBits / 128) * 100)}%` }}
            className={`h-full transition-all duration-300 ${strengthAssessment.color}`}
          />
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Length & Bulk */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Length & Count
          </h3>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              <span>Password Length:</span>
              <span className="font-mono text-blue-600 font-bold">{length} characters</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>8 (Basic)</span>
              <span>16 (Recommended)</span>
              <span>32 (High)</span>
              <span>64 (Max)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Generate in Bulk (Multi-token list)
            </label>
            <select
              value={bulkCount}
              onChange={(e) => setBulkCount(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white"
            >
              <option value={1}>1 Password</option>
              <option value={3}>3 Passwords</option>
              <option value={5}>5 Passwords</option>
              <option value={10}>10 Passwords</option>
            </select>
          </div>
        </div>

        {/* Character Rules */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Character Sets & Rules
          </h3>

          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="rounded border-slate-300 text-blue-600"
            />
            Uppercase Letters (A-Z)
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLower}
              onChange={(e) => setIncludeLower(e.target.checked)}
              className="rounded border-slate-300 text-blue-600"
            />
            Lowercase Letters (a-z)
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="rounded border-slate-300 text-blue-600"
            />
            Numbers (0-9)
          </label>

          <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="rounded border-slate-300 text-blue-600"
            />
            Symbols (!@#$%^&*...)
          </label>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              Exclude Ambiguous Characters (1, l, I, 0, O)
            </label>
          </div>
        </div>
      </div>

      {/* Bulk Results Table if count > 1 */}
      {bulkCount > 1 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Bulk Passwords ({bulkCount})
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {passwords.map((pwd, idx) => (
              <div key={idx} className="flex items-center justify-between py-2">
                <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 select-all">
                  {pwd}
                </span>
                <button
                  onClick={() => copyPassword(pwd, idx)}
                  className="text-slate-400 hover:text-blue-600 p-1"
                >
                  {copiedIdx === idx ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
