'use client';

import React, { useState } from 'react';
import { Type, Copy, Check, CheckCircle, ArrowRightLeft } from 'lucide-react';

export function TextCaseConverterTool() {
  const [input, setInput] = useState<string>('Client-Side Web Tools: fast, private, and 100% in-browser.');
  const [copiedKey, setCopiedKey] = useState<string>('');

  const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const toSentenceCase = (str: string) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const toCamelCase = (str: string) => {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, (c) => c.toLowerCase());
  };

  const toPascalCase = (str: string) => {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[a-z]/, (c) => c.toUpperCase());
  };

  const toSnakeCase = (str: string) => {
    return str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      ?.map((x) => x.toLowerCase())
      .join('_') || '';
  };

  const toKebabCase = (str: string) => {
    return str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      ?.map((x) => x.toLowerCase())
      .join('-') || '';
  };

  const toAlternatingCase = (str: string) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      result += i % 2 === 0 ? str[i].toLowerCase() : str[i].toUpperCase();
    }
    return result;
  };

  const toReverseText = (str: string) => {
    return str.split('').reverse().join('');
  };

  const CASES = [
    { key: 'upper', name: 'UPPERCASE', transform: (s: string) => s.toUpperCase() },
    { key: 'lower', name: 'lowercase', transform: (s: string) => s.toLowerCase() },
    { key: 'title', name: 'Title Case', transform: toTitleCase },
    { key: 'sentence', name: 'Sentence case', transform: toSentenceCase },
    { key: 'camel', name: 'camelCase', transform: toCamelCase },
    { key: 'pascal', name: 'PascalCase', transform: toPascalCase },
    { key: 'snake', name: 'snake_case', transform: toSnakeCase },
    { key: 'kebab', name: 'kebab-case', transform: toKebabCase },
    { key: 'constant', name: 'CONSTANT_CASE', transform: (s: string) => toSnakeCase(s).toUpperCase() },
    { key: 'alternating', name: 'aLtErNaTiNg cAsE', transform: toAlternatingCase },
    { key: 'reverse', name: 'esreveR txeT', transform: toReverseText },
  ];

  const copyVal = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Real-Time String Transmutation:</strong> Transform variable naming conventions, legal case styles, and formatting with zero latency.</span>
      </div>

      {/* Input Text Box */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Source Text
        </label>
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert case..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid of Converted Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CASES.map(({ key, name, transform }) => {
          const transformed = input ? transform(input) : '';

          return (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{name}</span>
                <button
                  onClick={() => copyVal(transformed, key)}
                  disabled={!transformed}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline disabled:opacity-40"
                >
                  {copiedKey === key ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === key ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-2.5 font-mono text-xs text-slate-700 dark:text-slate-300 select-all break-all max-h-24 overflow-y-auto border border-slate-200/60 dark:border-slate-800">
                {transformed || <span className="text-slate-400 italic">Output preview...</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
