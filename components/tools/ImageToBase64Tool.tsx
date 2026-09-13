'use client';

import React, { useState, useRef } from 'react';
import { Upload, Copy, Check, Code, FileText, CheckCircle } from 'lucide-react';

export function ImageToBase64Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [dataUri, setDataUri] = useState<string>('');
  const [rawBase64, setRawBase64] = useState<string>('');
  const [copiedFormat, setCopiedFormat] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (uploadedFile: File) => {
    if (!uploadedFile.type.startsWith('image/')) return;
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setDataUri(result);
      const parts = result.split(',');
      setRawBase64(parts[1] || '');
    };
    reader.readAsDataURL(uploadedFile);
  };

  const copyToClipboard = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => setCopiedFormat(''), 2500);
  };

  const htmlImgTag = `<img src="${dataUri}" alt="${file?.name || 'Embedded Graphic'}" />`;
  const cssBackground = `background-image: url("${dataUri}");`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Client-Side FileReader API:</strong> Converts your image directly into standard RFC 2397 Data URIs without internet transfers.</span>
      </div>

      {!dataUri ? (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 group-hover:scale-110 transition">
            <Code className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Upload Image to Convert to Base64
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Supports SVG, PNG, JPEG, WebP, GIF, and ICO
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File summary bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <img src={dataUri} alt="Preview" className="h-10 w-10 object-contain rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{file?.name}</div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {file?.type} • Original: {file && (file.size / 1024).toFixed(1)} KB • Base64 Length: {rawBase64.length.toLocaleString()} chars
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setDataUri('');
                setRawBase64('');
              }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Upload Another
            </button>
          </div>

          {/* Formats Grid */}
          <div className="space-y-4">
            {/* Format 1: Data URI */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Data URI (RFC 2397 format)
                </span>
                <button
                  onClick={() => copyToClipboard(dataUri, 'uri')}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 px-3 py-1.5 text-xs font-medium hover:bg-blue-100 transition"
                >
                  {copiedFormat === 'uri' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedFormat === 'uri' ? 'Copied Data URI' : 'Copy Data URI'}
                </button>
              </div>
              <textarea
                readOnly
                rows={3}
                value={dataUri}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 font-mono text-[11px] text-slate-700 dark:text-slate-300 select-all"
              />
            </div>

            {/* Format 2: HTML <img> tag */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  HTML &lt;img&gt; Snippet
                </span>
                <button
                  onClick={() => copyToClipboard(htmlImgTag, 'html')}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 px-3 py-1.5 text-xs font-medium hover:bg-blue-100 transition"
                >
                  {copiedFormat === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedFormat === 'html' ? 'Copied HTML' : 'Copy HTML Tag'}
                </button>
              </div>
              <textarea
                readOnly
                rows={2}
                value={htmlImgTag}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 font-mono text-[11px] text-slate-700 dark:text-slate-300 select-all"
              />
            </div>

            {/* Format 3: CSS Background Snippet */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  CSS background-image
                </span>
                <button
                  onClick={() => copyToClipboard(cssBackground, 'css')}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 px-3 py-1.5 text-xs font-medium hover:bg-blue-100 transition"
                >
                  {copiedFormat === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedFormat === 'css' ? 'Copied CSS' : 'Copy CSS Snippet'}
                </button>
              </div>
              <textarea
                readOnly
                rows={2}
                value={cssBackground}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 font-mono text-[11px] text-slate-700 dark:text-slate-300 select-all"
              />
            </div>

            {/* Format 4: Raw Base64 string only */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Raw Base64 Payload Only
                </span>
                <button
                  onClick={() => copyToClipboard(rawBase64, 'raw')}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 px-3 py-1.5 text-xs font-medium hover:bg-blue-100 transition"
                >
                  {copiedFormat === 'raw' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedFormat === 'raw' ? 'Copied Raw' : 'Copy Raw String'}
                </button>
              </div>
              <textarea
                readOnly
                rows={2}
                value={rawBase64}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3 font-mono text-[11px] text-slate-700 dark:text-slate-300 select-all"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
