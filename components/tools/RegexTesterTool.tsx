'use client';

import React, { useState, useMemo } from 'react';
import { CheckCircle, AlertCircle, Copy, Check } from 'lucide-react';

interface RegexPreset {
  name: string;
  pattern: string;
  flags: string;
  sample: string;
}

const PRESETS: RegexPreset[] = [
  {
    name: 'Email Address',
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    flags: 'g',
    sample: 'Contact support@example.com or admin@test.org for info. Invalid: user@.com',
  },
  {
    name: 'URL / Hyperlink',
    pattern: 'https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)',
    flags: 'gi',
    sample: 'Visit https://github.com or https://example.org/docs/page?id=42 for code.',
  },
  {
    name: 'IPv4 Address',
    pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b',
    flags: 'g',
    sample: 'DNS servers: 8.8.8.8 and 192.168.1.1, gateway: 10.0.0.1.',
  },
  {
    name: 'Hex Color (#fff or #ffffff)',
    pattern: '#([0-9a-fA-F]{3}){1,2}\\b',
    flags: 'g',
    sample: 'Theme colors: #2563eb (blue), #ffffff (white), #10b981 (green), and #f43.',
  },
  {
    name: 'Date (YYYY-MM-DD)',
    pattern: '(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])',
    flags: 'g',
    sample: 'Events scheduled for 2026-09-15 and 2026-12-31. Ignore 2026-99-99.',
  },
];

export function RegexTesterTool() {
  const [pattern, setPattern] = useState<string>(PRESETS[0].pattern);
  const [flags, setFlags] = useState<{ [key: string]: boolean }>({
    g: true,
    i: false,
    m: false,
    s: false,
    u: true,
  });
  const [testString, setTestString] = useState<string>(PRESETS[0].sample);
  const [copied, setCopied] = useState<boolean>(false);

  const activeFlagsString = Object.keys(flags)
    .filter((k) => flags[k])
    .join('');

  const { matches, error, highlightedHtml } = useMemo(() => {
    if (!pattern) {
      return { matches: [], error: null, highlightedHtml: testString };
    }

    try {
      const regex = new RegExp(pattern, activeFlagsString);
      const allMatches: { index: number; text: string; groups: string[] }[] = [];

      let match: RegExpExecArray | null;
      let lastIndex = 0;
      let html = '';

      if (flags.g) {
        let loopCount = 0;
        while ((match = regex.exec(testString)) !== null && loopCount < 500) {
          loopCount++;
          const matchStart = match.index;
          const matchEnd = matchStart + match[0].length;

          // Push slice before match
          html += escapeHtml(testString.slice(lastIndex, matchStart));
          // Highlight match
          html += `<mark class="bg-amber-300 dark:bg-amber-500/50 text-slate-900 dark:text-white px-0.5 rounded font-semibold">${escapeHtml(match[0])}</mark>`;
          lastIndex = matchEnd;

          allMatches.push({
            index: match.index,
            text: match[0],
            groups: match.slice(1),
          });

          if (match[0].length === 0) regex.lastIndex++;
        }
        html += escapeHtml(testString.slice(lastIndex));
      } else {
        match = regex.exec(testString);
        if (match) {
          const matchStart = match.index;
          const matchEnd = matchStart + match[0].length;
          html =
            escapeHtml(testString.slice(0, matchStart)) +
            `<mark class="bg-amber-300 dark:bg-amber-500/50 text-slate-900 dark:text-white px-0.5 rounded font-semibold">${escapeHtml(match[0])}</mark>` +
            escapeHtml(testString.slice(matchEnd));
          allMatches.push({
            index: match.index,
            text: match[0],
            groups: match.slice(1),
          });
        } else {
          html = escapeHtml(testString);
        }
      }

      return { matches: allMatches, error: null, highlightedHtml: html };
    } catch (err: any) {
      return { matches: [], error: err.message, highlightedHtml: escapeHtml(testString) };
    }
  }, [pattern, activeFlagsString, testString, flags.g]);

  function escapeHtml(str: string) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  const loadPreset = (preset: RegexPreset) => {
    setPattern(preset.pattern);
    setTestString(preset.sample);
    const newFlags: { [key: string]: boolean } = { g: false, i: false, m: false, s: false, u: true };
    for (const f of preset.flags) {
      newFlags[f] = true;
    }
    setFlags(newFlags);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Real-Time JavaScript RegExp Evaluator:</strong> Live match visualizer, capture group inspector, and common regex pattern library.</span>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Presets:</span>
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => loadPreset(preset)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition"
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Pattern & Flags Bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-lg text-slate-400">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Regular expression pattern..."
            className="flex-1 min-w-[200px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-mono text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="font-mono text-lg text-slate-400">/{activeFlagsString}</span>

          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-700 pl-3">
            {[
              { flag: 'g', label: 'global' },
              { flag: 'i', label: 'ignoreCase' },
              { flag: 'm', label: 'multiline' },
              { flag: 's', label: 'dotAll' },
            ].map(({ flag, label }) => (
              <label key={flag} className="flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flags[flag] || false}
                  onChange={(e) => setFlags({ ...flags, [flag]: e.target.checked })}
                  className="rounded border-slate-300 text-blue-600"
                />
                {flag} ({label})
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Syntax Error: {error}</span>
          </div>
        )}
      </div>

      {/* Test Corpus Input & Highlight Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Test String
          </label>
          <textarea
            rows={8}
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Type or paste sample text here to test against your regex..."
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Live Highlighted Matches ({matches.length})
            </span>
          </div>
          <div
            className="w-full flex-1 min-h-[160px] rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 overflow-y-auto whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      </div>

      {/* Matches & Capture Groups Table */}
      {matches.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
            Match Details & Capture Groups
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-3.5 py-2 w-16">#</th>
                  <th className="px-3.5 py-2">Match Value</th>
                  <th className="px-3.5 py-2 w-24">Index</th>
                  <th className="px-3.5 py-2">Capture Groups</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                {matches.slice(0, 25).map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-3.5 py-2 text-slate-400">{idx + 1}</td>
                    <td className="px-3.5 py-2 font-bold text-blue-600 dark:text-blue-400">{m.text}</td>
                    <td className="px-3.5 py-2 text-slate-500">{m.index}</td>
                    <td className="px-3.5 py-2 text-slate-600 dark:text-slate-400">
                      {m.groups.length > 0 ? (
                        m.groups.map((g, gIdx) => (
                          <span key={gIdx} className="inline-block bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded mr-1">
                            ${gIdx + 1}: {g || 'undefined'}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </td>
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
