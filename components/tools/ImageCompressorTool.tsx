'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, RefreshCw, Sliders, Image as ImageIcon, CheckCircle, ArrowRight } from 'lucide-react';

export function ImageCompressorTool() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [compressedUrl, setCompressedUrl] = useState<string>('');
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(75);
  const [maxWidth, setMaxWidth] = useState<number>(1920);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setOriginalFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height });
      setMaxWidth(Math.min(img.width, 1920));
      compressImage(img, file.size, 75, Math.min(img.width, 1920), 'image/jpeg');
    };
    img.src = url;
  };

  const compressImage = (
    img: HTMLImageElement,
    _origSize: number,
    qVal: number,
    maxW: number,
    fmt: 'image/jpeg' | 'image/webp' | 'image/png'
  ) => {
    setIsProcessing(true);
    let targetWidth = img.width;
    let targetHeight = img.height;

    if (maxW > 0 && targetWidth > maxW) {
      const ratio = maxW / targetWidth;
      targetWidth = maxW;
      targetHeight = Math.round(targetHeight * ratio);
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsProcessing(false);
      return;
    }

    // Fill white background for JPEG
    if (fmt === 'image/jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const compUrl = URL.createObjectURL(blob);
          setCompressedUrl(compUrl);
          setCompressedSize(blob.size);
        }
        setIsProcessing(false);
      },
      fmt,
      qVal / 100
    );
  };

  const recompress = (newQuality: number, newMaxWidth: number, newFormat: 'image/jpeg' | 'image/webp' | 'image/png') => {
    if (!originalUrl || !originalFile) return;
    const img = new Image();
    img.onload = () => {
      compressImage(img, originalFile.size, newQuality, newMaxWidth, newFormat);
    };
    img.src = originalUrl;
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const savingsPercent =
    originalFile && compressedSize > 0
      ? Math.max(0, Math.round(((originalFile.size - compressedSize) / originalFile.size) * 100))
      : 0;

  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner */}
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>100% Client-Side:</strong> Your photo is processed locally inside your browser memory. Nothing is uploaded to any server.</span>
      </div>

      {!originalUrl ? (
        /* Upload Drag & Drop Zone */
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 p-12 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 group-hover:scale-110 transition">
            <Upload className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Choose an Image or Drag & Drop Here
          </h3>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            Supports JPEG, PNG, and WebP (up to 50MB)
          </p>
        </div>
      ) : (
        /* Active Compression Studio */
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            {/* Quality Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-600" />
                  Compression Quality:
                </span>
                <span className="font-mono text-blue-600 dark:text-blue-400">{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                step="5"
                value={quality}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setQuality(val);
                  recompress(val, maxWidth, outputFormat);
                }}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Smaller File</span>
                <span>Balanced</span>
                <span>High Quality</span>
              </div>
            </div>

            {/* Max Width Resize */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Max Width: <span className="font-mono text-blue-600 dark:text-blue-400">{maxWidth}px</span>
              </label>
              <select
                value={maxWidth}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMaxWidth(val);
                  recompress(quality, val, outputFormat);
                }}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={originalDimensions.width}>Original ({originalDimensions.width}px)</option>
                <option value={1920}>Full HD (1920px)</option>
                <option value={1280}>HD (1280px)</option>
                <option value={800}>Web Medium (800px)</option>
                <option value={500}>Thumbnail (500px)</option>
              </select>
            </div>

            {/* Format Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Output Format:
              </label>
              <select
                value={outputFormat}
                onChange={(e) => {
                  const fmt = e.target.value as 'image/jpeg' | 'image/webp' | 'image/png';
                  setOutputFormat(fmt);
                  recompress(quality, maxWidth, fmt);
                }}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="image/jpeg">JPEG (Best for Photos)</option>
                <option value="image/webp">WebP (Smallest File Size)</option>
                <option value="image/png">PNG (Lossless / Transparent)</option>
              </select>
            </div>
          </div>

          {/* Results Comparison Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Original File</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                  {originalFile && formatBytes(originalFile.size)}
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center min-h-[220px] max-h-[300px] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50 p-2">
                <img src={originalUrl} alt="Original preview" className="max-h-[260px] object-contain rounded-lg" />
              </div>
              <div className="mt-3 text-[11px] text-slate-500 text-center font-mono">
                {originalDimensions.width} x {originalDimensions.height} px • {originalFile?.type}
              </div>
            </div>

            {/* Compressed Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Optimized Result
                </span>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 text-[11px] font-bold">
                    -{savingsPercent}% Saved
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                    {formatBytes(compressedSize)}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center min-h-[220px] max-h-[300px] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50 p-2 relative">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-2 text-xs text-slate-500">
                    <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
                    <span>Compressing image...</span>
                  </div>
                ) : (
                  <img src={compressedUrl} alt="Compressed preview" className="max-h-[260px] object-contain rounded-lg" />
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() => {
                    setOriginalFile(null);
                    setOriginalUrl('');
                    setCompressedUrl('');
                  }}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Upload Another
                </button>
                <a
                  href={compressedUrl}
                  download={`compressed_${originalFile?.name.split('.')[0] || 'image'}.${outputFormat === 'image/webp' ? 'webp' : outputFormat === 'image/png' ? 'png' : 'jpg'}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition active:scale-95"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download ({formatBytes(compressedSize)})
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
