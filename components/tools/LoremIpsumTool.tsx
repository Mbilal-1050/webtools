'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, CheckCircle, Download } from 'lucide-react';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip',
  'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
  'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export function LoremIpsumTool() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words' | 'lists'>('paragraphs');
  const [count, setCount] = useState<number>(3);
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
  const [wrapHtml, setWrapHtml] = useState<boolean>(false);
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generateSentence = (forceStart = false) => {
    const len = Math.floor(Math.random() * 8) + 8;
    const words: string[] = [];
    if (forceStart) {
      words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
    }
    while (words.length < len) {
      const w = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
      words.push(w);
    }
    // Capitalize first
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = (forceStart = false) => {
    const sCount = Math.floor(Math.random() * 3) + 4;
    const sentences: string[] = [];
    for (let i = 0; i < sCount; i++) {
      sentences.push(generateSentence(forceStart && i === 0));
    }
    return sentences.join(' ');
  };

  const generate = () => {
    let result = '';
    if (type === 'paragraphs') {
      const paras: string[] = [];
      for (let i = 0; i < count; i++) {
        const p = generateParagraph(startWithLorem && i === 0);
        paras.push(wrapHtml ? `<p>${p}</p>` : p);
      }
      result = paras.join('\n\n');
    } else if (type === 'sentences') {
      const sents: string[] = [];
      for (let i = 0; i < count; i++) {
        const s = generateSentence(startWithLorem && i === 0);
        sents.push(wrapHtml ? `<p>${s}</p>` : s);
      }
      result = sents.join(' ');
    } else if (type === 'words') {
      const words: string[] = [];
      if (startWithLorem) {
        words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
      }
      while (words.length < count) {
        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
      }
      result = words.slice(0, count).join(' ');
      if (wrapHtml) result = `<p>${result}</p>`;
    } else if (type === 'lists') {
      const items: string[] = [];
      for (let i = 0; i < count; i++) {
        const item = generateSentence(startWithLorem && i === 0).replace('.', '');
        items.push(wrapHtml ? `  <li>${item}</li>` : `• ${item}`);
      }
      result = wrapHtml ? `<ul>\n${items.join('\n')}\n</ul>` : items.join('\n');
    }
    setOutput(result);
  };

  useEffect(() => {
    generate();
  }, [type, count, startWithLorem, wrapHtml]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadText = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `lorem_ipsum_${type}.txt`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Client-Side Placeholder Text:</strong> Generate classic Cicero Latin typography text with configurable units and HTML tag wrappers.</span>
      </div>

      {/* Control bar */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Unit Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
              <option value="lists">List Items</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Quantity: <span className="font-mono text-blue-600">{count}</span>
            </label>
            <input
              type="range"
              min="1"
              max="25"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full accent-blue-600 mt-2"
            />
          </div>

          <div className="flex flex-col justify-end space-y-2">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              Start with &ldquo;Lorem ipsum...&rdquo;
            </label>
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={wrapHtml}
                onChange={(e) => setWrapHtml(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              Wrap in HTML tags (&lt;p&gt; or &lt;li&gt;)
            </label>
          </div>

          <div className="flex items-end justify-end gap-2">
            <button
              onClick={generate}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Regenerate
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-4 py-2 text-xs font-semibold hover:bg-blue-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      {/* Output preview */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Generated Text ({output.trim().split(/\s+/).length} words • {output.length} characters)
          </span>
          <button
            onClick={downloadText}
            className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            Download Text
          </button>
        </div>
        <textarea
          readOnly
          rows={12}
          value={output}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 font-serif text-sm text-slate-900 dark:text-slate-100 leading-relaxed select-all"
        />
      </div>
    </div>
  );
}
