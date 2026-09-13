'use client';

import React, { useState, useRef } from 'react';
import { Upload, Download, RotateCw, FlipHorizontal, FlipVertical, CheckCircle, Lock, Unlock } from 'lucide-react';

export function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [origDimensions, setOrigDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [resizedUrl, setResizedUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (uploadedFile: File) => {
    if (!uploadedFile.type.startsWith('image/')) return;
    setFile(uploadedFile);
    const url = URL.createObjectURL(uploadedFile);
    setImageUrl(url);

    const img = new Image();
    img.onload = () => {
      setOrigDimensions({ width: img.width, height: img.height });
      setWidth(img.width);
      setHeight(img.height);
      setAspectRatio(img.width / img.height);
      renderTransform(img, img.width, img.height, 0, false, false);
    };
    img.src = url;
  };

  const renderTransform = (
    img: HTMLImageElement,
    targetW: number,
    targetH: number,
    rot: number,
    fH: boolean,
    fV: boolean
  ) => {
    const canvas = document.createElement('canvas');
    const isRotated90 = rot === 90 || rot === 270;
    canvas.width = isRotated90 ? targetH : targetW;
    canvas.height = isRotated90 ? targetW : targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rot * Math.PI) / 180);
    ctx.scale(fH ? -1 : 1, fV ? -1 : 1);
    ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
    ctx.restore();

    canvas.toBlob((blob) => {
      if (blob) setResizedUrl(URL.createObjectURL(blob));
    }, 'image/png');
  };

  const updateWidth = (w: number) => {
    setWidth(w);
    let h = height;
    if (lockAspect && aspectRatio > 0) {
      h = Math.round(w / aspectRatio);
      setHeight(h);
    }
    applyChanges(w, h, rotation, flipH, flipV);
  };

  const updateHeight = (h: number) => {
    setHeight(h);
    let w = width;
    if (lockAspect && aspectRatio > 0) {
      w = Math.round(h * aspectRatio);
      setWidth(w);
    }
    applyChanges(w, h, rotation, flipH, flipV);
  };

  const applyChanges = (w: number, h: number, rot: number, fH: boolean, fV: boolean) => {
    if (!imageUrl) return;
    const img = new Image();
    img.onload = () => renderTransform(img, w, h, rot, fH, fV);
    img.src = imageUrl;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Bicubic Canvas Resizing:</strong> Scale dimensions, lock aspect ratios, and rotate photos directly in your browser.</span>
      </div>

      {!imageUrl ? (
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
            <Upload className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Upload Image to Resize & Rotate
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Supports PNG, JPEG, WebP, and SVG
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Width (pixels)
              </label>
              <input
                type="number"
                min="10"
                max="10000"
                value={width}
                onChange={(e) => updateWidth(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Height (pixels)
              </label>
              <input
                type="number"
                min="10"
                max="10000"
                value={height}
                onChange={(e) => updateHeight(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setLockAspect(!lockAspect)}
                className={`w-full flex items-center justify-center gap-2 rounded-xl border py-2 text-xs font-semibold transition ${
                  lockAspect
                    ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {lockAspect ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                {lockAspect ? 'Aspect Ratio Locked' : 'Aspect Unlocked'}
              </button>
            </div>

            <div className="flex items-end gap-2">
              <button
                title="Rotate 90 deg"
                onClick={() => {
                  const newRot = (rotation + 90) % 360;
                  setRotation(newRot);
                  applyChanges(width, height, newRot, flipH, flipV);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <RotateCw className="w-3.5 h-3.5" />
                90°
              </button>
              <button
                title="Flip Horizontal"
                onClick={() => {
                  const newF = !flipH;
                  setFlipH(newF);
                  applyChanges(width, height, rotation, newF, flipV);
                }}
                className={`p-2 rounded-xl border ${flipH ? 'bg-blue-100 border-blue-400 text-blue-600' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
              >
                <FlipHorizontal className="w-4 h-4" />
              </button>
              <button
                title="Flip Vertical"
                onClick={() => {
                  const newF = !flipV;
                  setFlipV(newF);
                  applyChanges(width, height, rotation, flipH, newF);
                }}
                className={`p-2 rounded-xl border ${flipV ? 'bg-blue-100 border-blue-400 text-blue-600' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
              >
                <FlipVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scale presets */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Quick Scale:</span>
            {[25, 50, 75, 100, 150, 200].map((pct) => (
              <button
                key={pct}
                onClick={() => {
                  const newW = Math.round((origDimensions.width * pct) / 100);
                  const newH = Math.round((origDimensions.height * pct) / 100);
                  setWidth(newW);
                  setHeight(newH);
                  applyChanges(newW, newH, rotation, flipH, flipV);
                }}
                className="rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600"
              >
                {pct}%
              </button>
            ))}
          </div>

          {/* Preview & Download */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Output Dimension: {width} x {height} px (Original: {origDimensions.width} x {origDimensions.height} px)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setFile(null);
                    setImageUrl('');
                    setResizedUrl('');
                  }}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  New Image
                </button>
                <a
                  href={resizedUrl}
                  download={`resized_${width}x${height}_${file?.name || 'image.png'}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-semibold text-white shadow-sm transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Resized Image
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center min-h-[300px] max-h-[450px] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/40 p-4">
              <img src={resizedUrl || imageUrl} alt="Resized preview" className="max-h-[400px] object-contain rounded-lg shadow-sm" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
