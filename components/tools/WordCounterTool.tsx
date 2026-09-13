'use client';

import React, { useState, useMemo } from 'react';
import { AlignLeft, Clock, Copy, Check, CheckCircle, BarChart3 } from 'lucide-react';

export function WordCounterTool() {
  const [text, setText] = useState<string>(
    'Client-Side Web Tools empowers users with high-speed utilities running directly in their web browser. No cloud servers are contacted, ensuring complete confidentiality for your sensitive documents and code.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, '').length;
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const sentences = trimmed ? (trimmed.match(/[.!?]+(?:\s+|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length : 0;

    // Reading & Speaking times
    const readingTimeSec = Math.ceil((words / 225) * 60);
    const speakingTimeSec = Math.ceil((words / 130) * 60);

    const formatTime = (sec: number) => {
      if (sec < 60) return `${sec}s`;
      const min = Math.floor(sec / 60);
      const remSec = sec % 60;
      return `${min}m ${remSec}s`;
    };

    // Keyword density
    const wordList = trimmed
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const freqMap: { [w: string]: number } = {};
    wordList.forEach((w) => {
      freqMap[w] = (freqMap[w] || 0) + 1;
    });

    const sortedKeywords = Object.entries(freqMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / (wordList.length || 1)) * 100).toFixed(1),
      }));

    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime: formatTime(readingTimeSec),
      speakingTime: formatTime(speakingTimeSec),
      keywords: sortedKeywords,
    };
  }, [text]);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Live Statistical Engine:</strong> Real-time word frequency analysis, reading pace calculation, and social character limits.</span>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Words</span>
          <div className="mt-1 font-mono text-2xl font-extrabold text-blue-600 dark:text-blue-400">
            {stats.words.toLocaleString()}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Characters</span>
          <div className="mt-1 font-mono text-2xl font-extrabold text-slate-900 dark:text-white">
            {stats.characters.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{stats.charactersNoSpaces} no spaces</div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sentences</span>
          <div className="mt-1 font-mono text-2xl font-extrabold text-slate-900 dark:text-white">
            {stats.sentences.toLocaleString()}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Reading Time</span>
          <div className="mt-1 font-mono text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {stats.readingTime}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">@ 225 wpm</div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm text-center col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Speaking Time</span>
          <div className="mt-1 font-mono text-xl font-bold text-purple-600 dark:text-purple-400">
            {stats.speakingTime}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">@ 130 wpm</div>
        </div>
      </div>

      {/* Editor & Actions */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Write or Paste Document
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setText('')}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Clear
            </button>
            <button
              onClick={copyText}
              className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
          </div>
        </div>

        <textarea
          rows={9}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 text-sm text-slate-900 dark:text-slate-100 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Social Media Length Checkers & Keyword Density */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social media bars */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Social Media Character Limits
          </h3>

          {[
            { platform: 'X / Twitter Post', limit: 280 },
            { platform: 'Instagram Caption', limit: 2200 },
            { platform: 'LinkedIn Post', limit: 3000 },
          ].map(({ platform, limit }) => {
            const count = stats.characters;
            const pct = Math.min(100, Math.round((count / limit) * 100));
            const isOver = count > limit;

            return (
              <div key={platform} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">{platform}</span>
                  <span className={`font-mono ${isOver ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                    {count} / {limit}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${pct}%` }}
                    className={`h-full transition-all ${isOver ? 'bg-rose-500' : 'bg-blue-600'}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Keyword Density */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            Top Keyword Density
          </div>
          {stats.keywords.length > 0 ? (
            <div className="space-y-2">
              {stats.keywords.map(({ word, count, density }) => (
                <div key={word} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800 last:border-none">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{word}</span>
                  <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
                    <span>{count}x</span>
                    <span className="w-12 text-right text-blue-600 dark:text-blue-400">{density}%</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-4 text-center">Type more words to see density statistics.</p>
          )}
        </div>
      </div>
    </div>
  );
}
