'use client';

import React, { useState } from 'react';
import { Copy, Check, Download, RefreshCw, CheckCircle, Code } from 'lucide-react';

const SAMPLE_CSS = `/* Global Button Styling */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #2563eb;
  color: #ffffff;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  background-color: #1d4ed8;
  transform: translateY(-1px);
}
`;

export function CssMinifierTool() {
  const [inputCss, setInputCss] = useState<string>(SAMPLE_CSS);
  const [outputCss, setOutputCss] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const minify = (css: string) => {
    let min = css
      .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
      .replace(/\s+/g, ' ') // collapse multiple whitespaces
      .replace(/\s*([\{\}\:\;\,])\s*/g, '$1') // remove spaces around brackets and colons
      .replace(/;}/g, '}') // remove trailing semicolon
      .trim();
    setOutputCss(min);
  };

  const beautify = (css: string) => {
    let clean = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
    let formatted = '';
    let indent = 0;

    for (let i = 0; i < clean.length; i++) {
      const char = clean[i];
      if (char === '{') {
        formatted += ' {\n';
        indent++;
        formatted += '  '.repeat(indent);
      } else if (char === '}') {
        formatted += '\n';
        indent = Math.max(0, indent - 1);
        formatted += '  '.repeat(indent) + '}\n\n';
      } else if (char === ';') {
        formatted += ';\n' + '  '.repeat(indent);
      } else {
        formatted += char;
      }
    }
    setOutputCss(formatted.trim());
  };

  React.useEffect(() => {
    minify(inputCss);
  }, []);

  const origSize = new Blob([inputCss]).size;
  const newSize = new Blob([outputCss]).size;
  const savings = origSize > 0 && newSize < origSize ? Math.round(((origSize - newSize) / origSize) * 100) : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([outputCss], { type: 'text/css' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'style.min.css';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Client-Side AST Compression:</strong> Strip comments, redundant whitespace, and optimize stylesheet byte payload.</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => minify(inputCss)}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
          >
            Minify CSS
          </button>
          <button
            onClick={() => beautify(inputCss)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Beautify / Format
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-2.5 py-1 text-xs font-bold">
            {savings}% Saved ({origSize} B → {newSize} B)
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 px-3.5 py-2 text-xs font-semibold hover:bg-blue-100 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>

      {/* Editor view */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Raw Input CSS
          </label>
          <textarea
            rows={12}
            value={inputCss}
            onChange={(e) => {
              setInputCss(e.target.value);
              minify(e.target.value);
            }}
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Processed CSS Result
          </label>
          <textarea
            readOnly
            rows={12}
            value={outputCss}
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 select-all"
          />
        </div>
      </div>
    </div>
  );
}
