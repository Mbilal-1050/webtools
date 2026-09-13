'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, CheckCircle, ArrowRightLeft } from 'lucide-react';

export function ImageConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [targetFormat, setTargetFormat] = useState<'png' | 'jpeg' | 'webp' | 'bmp'>('webp');
  const [quality, setQuality] = useState<number>(85);
  const [convertedUrl, setConvertedUrl] = useState<string>('');
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (uploadedFile: File) => {
    if (!uploadedFile.type.startsWith('image/')) return;
    setFile(uploadedFile);
    const url = URL.createObjectURL(uploadedFile);
    setPreviewUrl(url);
    runConversion(url, targetFormat, quality, uploadedFile.name);
  };

  const runConversion = (sourceUrl: string, format: string, q: number, _name: string) => {
    setIsConverting(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsConverting(false);
        return;
      }

      if (format === 'jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, img.width, img.height);
      }

      ctx.drawImage(img, 0, 0);

      const mimeType =
        format === 'png'
          ? 'image/png'
          : format === 'jpeg'
          ? 'image/jpeg'
          : format === 'webp'
          ? 'image/webp'
          : 'image/bmp';

      canvas.toBlob(
        (blob) => {
          if (blob) {
            setConvertedUrl(URL.createObjectURL(blob));
            setConvertedSize(blob.size);
          }
          setIsConverting(false);
        },
        mimeType,
        q / 100
      );
    };
    img.src = sourceUrl;
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>100% In-Browser Conversion:</strong> HTML5 2D Canvas renders your image directly into your target raster format. Zero server uploads.</span>
      </div>

      {!previewUrl ? (
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
            <ArrowRightLeft className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Select Any Image to Convert
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Convert PNG, JPG, WebP, GIF, or BMP into modern formats
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Convert To Format:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['webp', 'png', 'jpeg', 'bmp'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => {
                      setTargetFormat(fmt);
                      if (previewUrl && file) runConversion(previewUrl, fmt, quality, file.name);
                    }}
                    className={`rounded-xl py-2 text-xs font-bold uppercase transition ${
                      targetFormat === fmt
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {fmt === 'jpeg' ? 'JPG' : fmt}
                  </button>
                ))}
              </div>
            </div>

            {(targetFormat === 'webp' || targetFormat === 'jpeg') && (
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  <span>Compression Quality:</span>
                  <span className="font-mono text-blue-600">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={quality}
                  onChange={(e) => {
                    const q = Number(e.target.value);
                    setQuality(q);
                    if (previewUrl && file) runConversion(previewUrl, targetFormat, q, file.name);
                  }}
                  className="w-full accent-blue-600"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Original Image ({file && formatBytes(file.size)})
              </div>
              <div className="flex items-center justify-center min-h-[220px] max-h-[280px] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50 p-2">
                <img src={previewUrl} alt="Original" className="max-h-[240px] object-contain rounded-lg" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Converted ({targetFormat.toUpperCase()})
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-700 dark:text-slate-300">
                    {formatBytes(convertedSize)}
                  </span>
                </div>
                <div className="flex items-center justify-center min-h-[220px] max-h-[280px] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50 p-2">
                  {isConverting ? (
                    <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                  ) : (
                    <img src={convertedUrl} alt="Converted" className="max-h-[240px] object-contain rounded-lg" />
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    setFile(null);
                    setPreviewUrl('');
                    setConvertedUrl('');
                  }}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Convert Another
                </button>
                <a
                  href={convertedUrl}
                  download={`converted_${file?.name.split('.')[0] || 'image'}.${targetFormat === 'jpeg' ? 'jpg' : targetFormat}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download .{targetFormat.toUpperCase()}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
