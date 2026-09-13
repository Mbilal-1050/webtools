'use client';

import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import { Upload, Download, Copy, Check, Layers, CheckCircle, Archive } from 'lucide-react';

interface IconSpec {
  size: number;
  name: string;
  label: string;
  url: string;
}

export function FaviconGeneratorTool() {
  const [sourceUrl, setSourceUrl] = useState<string>('');
  const [icons, setIcons] = useState<IconSpec[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const SIZES = [
    { size: 16, name: 'favicon-16x16.png', label: '16x16 (Standard Browser Tab)' },
    { size: 32, name: 'favicon-32x32.png', label: '32x32 (Retina Desktop Tab)' },
    { size: 48, name: 'favicon-48x48.png', label: '48x48 (Windows Shortcut)' },
    { size: 64, name: 'favicon-64x64.png', label: '64x64 (High-Res Browser UI)' },
    { size: 180, name: 'apple-touch-icon.png', label: '180x180 (Apple iOS Home Screen)' },
    { size: 192, name: 'android-chrome-192x192.png', label: '192x192 (Android PWA Icon)' },
    { size: 512, name: 'android-chrome-512x512.png', label: '512x512 (PWA Splash Screen)' },
  ];

  const handleFile = (uploadedFile: File) => {
    if (!uploadedFile.type.startsWith('image/')) return;
    const url = URL.createObjectURL(uploadedFile);
    setSourceUrl(url);
    generateAllIcons(url);
  };

  const generateAllIcons = (url: string) => {
    setIsGenerating(true);
    const img = new Image();
    img.onload = () => {
      const generated: IconSpec[] = [];
      let completedCount = 0;

      SIZES.forEach((spec) => {
        const canvas = document.createElement('canvas');
        canvas.width = spec.size;
        canvas.height = spec.size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, spec.size, spec.size);

          canvas.toBlob((blob) => {
            if (blob) {
              const iconUrl = URL.createObjectURL(blob);
              generated.push({
                size: spec.size,
                name: spec.name,
                label: spec.label,
                url: iconUrl,
              });
            }
            completedCount++;
            if (completedCount === SIZES.length) {
              // Sort by size ascending
              generated.sort((a, b) => a.size - b.size);
              setIcons(generated);
              setIsGenerating(false);
            }
          }, 'image/png');
        }
      });
    };
    img.src = url;
  };

  const downloadAllAsZip = async () => {
    if (icons.length === 0) return;
    const zip = new JSZip();

    // Fetch and append each icon to ZIP
    for (const icon of icons) {
      const response = await fetch(icon.url);
      const blob = await response.blob();
      zip.file(icon.name, blob);
    }

    // Append standard HTML readme snippet
    zip.file(
      'html_snippet.html',
      `<!-- Copy and paste into your website's <head> -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`
    );

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(zipBlob);
    link.download = 'favicon_package.zip';
    link.click();
  };

  const htmlHeadTags = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Client-Side Icon Generator:</strong> Generates multi-density web, iOS, and PWA icon packs with instant in-browser ZIP packaging.</span>
      </div>

      {!sourceUrl ? (
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
            <Layers className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Upload Master Logo or Square Image
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            A square SVG or PNG of at least 512x512 works best
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top action header */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Generated {icons.length} Icon Specifications
              </h3>
              <p className="text-xs text-slate-500">
                Ready for modern desktop tabs, Apple Touch icons, and Android PWA manifests.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSourceUrl('');
                  setIcons([]);
                }}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Upload New
              </button>
              <button
                onClick={downloadAllAsZip}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition active:scale-95"
              >
                <Archive className="w-4 h-4" />
                Download All as ZIP
              </button>
            </div>
          </div>

          {/* Grid of icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {icons.map((icon) => (
              <div
                key={icon.size}
                className="flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
                    <img
                      src={icon.url}
                      alt={icon.name}
                      style={{ width: Math.min(icon.size, 40), height: Math.min(icon.size, 40) }}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{icon.name}</div>
                    <div className="text-[11px] text-slate-500">{icon.label}</div>
                  </div>
                </div>
                <a
                  href={icon.url}
                  download={icon.name}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600"
                  title={`Download ${icon.name}`}
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* HTML Code Snippet */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                HTML Header Code Snippet (Paste into &lt;head&gt;)
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(htmlHeadTags);
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="flex items-center gap-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 px-3 py-1.5 text-xs font-medium hover:bg-blue-100 transition"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCode ? 'Copied HTML' : 'Copy HTML'}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 font-mono text-xs text-blue-300">
              <code>{htmlHeadTags}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
