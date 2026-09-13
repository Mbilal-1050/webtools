'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Copy, Check, Calendar, CheckCircle } from 'lucide-react';

export function TimestampConverterTool() {
  const [currentEpoch, setCurrentEpoch] = useState<number>(1726000000);
  const [inputEpoch, setInputEpoch] = useState<string>('1726000000');
  const [inputDateTime, setInputDateTime] = useState<string>('2026-09-13T12:00');
  const [copiedKey, setCopiedKey] = useState<string>('');

  // Live ticking clock and initial setup
  useEffect(() => {
    const nowSec = Math.floor(Date.now() / 1000);
    setCurrentEpoch(nowSec);
    setInputEpoch(String(nowSec));
    setInputDateTime(new Date().toISOString().slice(0, 16));

    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Parse epoch input (auto detect seconds vs ms)
  const parsedDate = (() => {
    const num = Number(inputEpoch.trim());
    if (isNaN(num) || num === 0) return null;
    // If greater than 10 digits, assume milliseconds
    const ms = num > 9999999999 ? num : num * 1000;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  })();

  const formatRelative = (d: Date): string => {
    const diffSec = Math.round((d.getTime() - currentEpoch * 1000) / 1000);
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    if (Math.abs(diffSec) < 60) return rtf.format(diffSec, 'second');
    const diffMin = Math.round(diffSec / 60);
    if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
    const diffHour = Math.round(diffMin / 60);
    if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour');
    const diffDay = Math.round(diffHour / 24);
    return rtf.format(diffDay, 'day');
  };

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  const setNow = () => {
    setInputEpoch(String(Math.floor(Date.now() / 1000)));
  };

  const handleDateChange = (val: string) => {
    setInputDateTime(val);
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      setInputEpoch(String(Math.floor(d.getTime() / 1000)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Live Unix Epoch Clock:</strong> Converts timestamps across UTC, Local timezone, ISO 8601, and RFC 2822 without external time servers.</span>
      </div>

      {/* Live Current Epoch Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50/60 dark:bg-blue-950/40 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Clock className="w-5 h-5 animate-spin" style={{ animationDuration: '60s' }} />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
              Current Unix Epoch Timestamp
            </span>
            <div className="font-mono text-xl font-extrabold text-blue-600 dark:text-blue-400">
              {currentEpoch}
            </div>
          </div>
        </div>

        <button
          onClick={() => copyVal(String(currentEpoch), 'current')}
          className="flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700 transition"
        >
          {copiedKey === 'current' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedKey === 'current' ? 'Copied' : 'Copy Epoch'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timestamp to Date Form */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Epoch to Date
            </h3>
            <button
              onClick={setNow}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Use Current Time
            </button>
          </div>

          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Enter Unix Timestamp (seconds or milliseconds)
            </label>
            <input
              type="text"
              value={inputEpoch}
              onChange={(e) => setInputEpoch(e.target.value)}
              placeholder="e.g. 1726000000"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 font-mono text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {parsedDate && (
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500">Local Time:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">{parsedDate.toLocaleString()}</span>
                  <button onClick={() => copyVal(parsedDate.toLocaleString(), 'local')} className="text-slate-400 hover:text-blue-600">
                    {copiedKey === 'local' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500">UTC:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 dark:text-white">{parsedDate.toUTCString()}</span>
                  <button onClick={() => copyVal(parsedDate.toUTCString(), 'utc')} className="text-slate-400 hover:text-blue-600">
                    {copiedKey === 'utc' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500">ISO 8601:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-blue-600 dark:text-blue-400">{parsedDate.toISOString()}</span>
                  <button onClick={() => copyVal(parsedDate.toISOString(), 'iso')} className="text-slate-400 hover:text-blue-600">
                    {copiedKey === 'iso' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-500">Relative Time:</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{formatRelative(parsedDate)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Date to Timestamp Form */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Date to Unix Epoch
          </h3>

          <div>
            <label className="block text-xs text-slate-500 mb-1">
              Select Date & Time (Local)
            </label>
            <input
              type="datetime-local"
              value={inputDateTime}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Seconds (Standard Unix)</span>
                <button
                  onClick={() => copyVal(String(Math.floor(new Date(inputDateTime).getTime() / 1000)), 'sec')}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  {copiedKey === 'sec' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <div className="font-mono text-base font-bold text-blue-600 dark:text-blue-400">
                {Math.floor(new Date(inputDateTime).getTime() / 1000) || 0}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Milliseconds (JS Timestamp)</span>
                <button
                  onClick={() => copyVal(String(new Date(inputDateTime).getTime()), 'ms')}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                >
                  {copiedKey === 'ms' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>
              <div className="font-mono text-base font-bold text-blue-600 dark:text-blue-400">
                {new Date(inputDateTime).getTime() || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
