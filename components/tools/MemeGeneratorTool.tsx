'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Type, CheckCircle, Smile } from 'lucide-react';

export function MemeGeneratorTool() {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [topText, setTopText] = useState<string>('WHEN THE CLIENT-SIDE TOOL');
  const [bottomText, setBottomText] = useState<string>('RUNS IN 2 MILLISECONDS');
  const [fontSize, setFontSize] = useState<number>(36);
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [uppercase, setUppercase] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Starter template
  useEffect(() => {
    // Generate a default high-contrast canvas backdrop
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 450;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createLinearGradient(0, 0, 600, 450);
      grad.addColorStop(0, '#1e293b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 450);

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, 580, 430);

      setImageSrc(canvas.toDataURL());
    }
  }, []);

  // Draw meme whenever text or settings change
  useEffect(() => {
    if (!imageSrc) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Typography settings
      ctx.fillStyle = textColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.font = `900 ${fontSize}px Impact, -apple-system, sans-serif`;

      const tText = uppercase ? topText.toUpperCase() : topText;
      const bText = uppercase ? bottomText.toUpperCase() : bottomText;

      // Top text
      if (tText) {
        ctx.strokeText(tText, canvas.width / 2, 20);
        ctx.fillText(tText, canvas.width / 2, 20);
      }

      // Bottom text
      if (bText) {
        ctx.textBaseline = 'bottom';
        ctx.strokeText(bText, canvas.width / 2, canvas.height - 20);
        ctx.fillText(bText, canvas.width / 2, canvas.height - 20);
      }
    };
    img.src = imageSrc;
  }, [imageSrc, topText, bottomText, fontSize, textColor, strokeColor, strokeWidth, uppercase]);

  const handleUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'meme.png';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>100% Watermark-Free:</strong> Create memes in real-time with HTML5 canvas text overlay. No subscriptions, logos, or server uploads.</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-5 space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Top Text
            </label>
            <input
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="Top Punchline..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Bottom Text
            </label>
            <input
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="Bottom Punchline..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Font Size:</span>
                <span className="font-mono text-blue-600">{fontSize}px</span>
              </div>
              <input
                type="range"
                min="18"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                <span>Outline Stroke:</span>
                <span className="font-mono text-blue-600">{strokeWidth}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-slate-300"
                />
                <span className="font-mono text-xs">{textColor}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Stroke Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-slate-300"
                />
                <span className="font-mono text-xs">{strokeColor}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded border-slate-300 text-blue-600"
              />
              Force ALL-CAPS Style
            </label>
          </div>

          <div className="pt-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleUpload(e.target.files[0]);
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Upload className="w-4 h-4 text-blue-600" />
              Upload Your Own Photo
            </button>
          </div>
        </div>

        {/* Live Canvas Preview Panel */}
        <div className="lg:col-span-7 flex flex-col items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="w-full flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Live WYSIWYG Canvas Preview
            </span>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              Download Meme (PNG)
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center w-full min-h-[340px] max-h-[480px] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/40 p-2">
            <canvas ref={canvasRef} className="max-h-[440px] max-w-full object-contain rounded-lg shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
