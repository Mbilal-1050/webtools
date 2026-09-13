'use client';

import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check, CheckCircle, AlertCircle } from 'lucide-react';

export function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState<string>('Hello, World! 🚀 Secure client-side Base64.');
  const [output, setOutput] = useState<string>('');
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Full UTF-8 safe encoding
  const utf8ToBase64 = (str: string, isUrlSafe: boolean): string => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    let b64 = btoa(binary);
    if (isUrlSafe) {
      b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return b64;
  };

  // Full UTF-8 safe decoding
  const base64ToUtf8 = (b64: string): string => {
    let standardB64 = b64.replace(/-/g, '+').replace(/_/g, '/');
    while (standardB64.length % 4 !== 0) {
      standardB64 += '=';
    }
    const binary = atob(standardB64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  };

  const processText = (text: string, currentMode: 'encode' | 'decode', isUrlSafe: boolean) => {
    if (!text) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      if (currentMode === 'encode') {
        setOutput(utf8ToBase64(text, isUrlSafe));
        setError(null);
      } else {
        setOutput(base64ToUtf8(text.trim()));
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Invalid Base64 sequence');
    }
  };

  React.useEffect(() => {
    processText(input, mode, urlSafe);
  }, [input, mode, urlSafe]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    setInput(output);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>UTF-8 Unicode Safe:</strong> Encodes and decodes emojis, international character sets, and URL-Safe Base64 tokens entirely in-browser.</span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
            <button
              onClick={() => setMode('encode')}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                mode === 'encode' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Encode to Base64
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                mode === 'decode' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Decode from Base64
            </button>
          </div>

          <button
            onClick={handleSwap}
            title="Swap input & output"
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Swap
          </button>
        </div>

        <div className="flex items-center gap-4">
          {mode === 'encode' && (
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={urlSafe}
                onChange={(e) => setUrlSafe(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              URL-Safe Base64 (- and _)
            </label>
          )}

          <button
            onClick={handleCopy}
            disabled={!output}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-4 py-1.5 text-xs font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Output'}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3 text-xs text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/60">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Input ({mode === 'encode' ? 'Raw Text' : 'Base64'})
            </span>
            <span className="text-[11px] font-mono text-slate-400">{input.length} chars</span>
          </div>
          <textarea
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste content here..."
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Output ({mode === 'encode' ? 'Base64' : 'Decoded Text'})
            </span>
            <span className="text-[11px] font-mono text-slate-400">{output.length} chars</span>
          </div>
          <textarea
            readOnly
            rows={10}
            value={output}
            placeholder="Output appears here instantly..."
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 select-all"
          />
        </div>
      </div>
    </div>
  );
}
