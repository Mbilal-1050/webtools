'use client';

import React, { useState } from 'react';
import { Palette, Copy, Check, CheckCircle, Sliders } from 'lucide-react';

export function ColorPaletteTool() {
  const [baseHex, setBaseHex] = useState<string>('#2563eb');
  const [copiedKey, setCopiedKey] = useState<string>('');
  const [gradientAngle, setGradientAngle] = useState<number>(90);
  const [gradientStop1, setGradientStop1] = useState<string>('#2563eb');
  const [gradientStop2, setGradientStop2] = useState<string>('#9333ea');

  // Convert Hex to RGB
  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // Convert HSL back to Hex
  const hslToHex = (h: number, s: number, l: number): string => {
    h = (h % 360 + 360) % 360;
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
    } else if (120 <= h && h < 180) {
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      b = x;
    }

    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const rgb = hexToRgb(baseHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Generate Harmonies
  const complementary = hslToHex(hsl.h + 180, hsl.s, hsl.l);
  const triadic = [hslToHex(hsl.h + 120, hsl.s, hsl.l), hslToHex(hsl.h + 240, hsl.s, hsl.l)];
  const analogous = [hslToHex(hsl.h - 30, hsl.s, hsl.l), hslToHex(hsl.h + 30, hsl.s, hsl.l)];
  const monochromatic = [
    hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 25)),
    hslToHex(hsl.h, hsl.s, Math.max(20, hsl.l - 12)),
    baseHex,
    hslToHex(hsl.h, hsl.s, Math.min(85, hsl.l + 15)),
    hslToHex(hsl.h, hsl.s, Math.min(95, hsl.l + 30)),
  ];

  const copyVal = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  const gradientCss = `background: linear-gradient(${gradientAngle}deg, ${gradientStop1}, ${gradientStop2});`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Color Science & Harmonies:</strong> Optical calculations for HEX, RGB, HSL, harmonic chords, and CSS gradient generation.</span>
      </div>

      {/* Main Color Picker Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-slate-200 dark:border-slate-800" style={{ backgroundColor: baseHex }}>
          <input
            type="color"
            value={baseHex}
            onChange={(e) => setBaseHex(e.target.value)}
            className="w-16 h-16 cursor-pointer rounded-full border-4 border-white shadow-lg"
          />
          <span className="mt-3 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/40 text-white backdrop-blur-sm font-mono">
            {baseHex}
          </span>
        </div>

        <div className="md:col-span-2 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Color Values</h3>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">HEX</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase">{baseHex}</span>
              <button onClick={() => copyVal(baseHex, 'hex')} className="text-slate-400 hover:text-blue-600">
                {copiedKey === 'hex' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">RGB</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
              <button onClick={() => copyVal(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')} className="text-slate-400 hover:text-blue-600">
                {copiedKey === 'rgb' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">HSL</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">hsl({hsl.h}°, {hsl.s}%, {hsl.l}%)</span>
              <button onClick={() => copyVal(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')} className="text-slate-400 hover:text-blue-600">
                {copiedKey === 'hsl' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Harmony Palettes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            Harmonic Color Chords
          </h3>

          <div>
            <div className="text-xs text-slate-500 mb-1.5 font-medium">Complementary (180°)</div>
            <div className="flex gap-2">
              <div
                onClick={() => copyVal(baseHex, 'c1')}
                style={{ backgroundColor: baseHex }}
                className="flex-1 h-12 rounded-xl flex items-center justify-center cursor-pointer text-[10px] font-mono font-bold text-white shadow-inner"
              >
                {baseHex}
              </div>
              <div
                onClick={() => copyVal(complementary, 'c2')}
                style={{ backgroundColor: complementary }}
                className="flex-1 h-12 rounded-xl flex items-center justify-center cursor-pointer text-[10px] font-mono font-bold text-white shadow-inner"
              >
                {complementary}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 mb-1.5 font-medium">Triadic (120° & 240°)</div>
            <div className="flex gap-2">
              <div style={{ backgroundColor: baseHex }} className="flex-1 h-12 rounded-xl flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-inner">
                {baseHex}
              </div>
              <div style={{ backgroundColor: triadic[0] }} className="flex-1 h-12 rounded-xl flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-inner">
                {triadic[0]}
              </div>
              <div style={{ backgroundColor: triadic[1] }} className="flex-1 h-12 rounded-xl flex items-center justify-center text-[10px] font-mono font-bold text-white shadow-inner">
                {triadic[1]}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500 mb-1.5 font-medium">Monochromatic Tones</div>
            <div className="flex gap-1.5">
              {monochromatic.map((hex, idx) => (
                <div
                  key={idx}
                  onClick={() => copyVal(hex, `mono_${idx}`)}
                  style={{ backgroundColor: hex }}
                  title={`Click to copy ${hex}`}
                  className="flex-1 h-10 rounded-lg cursor-pointer hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        </div>

        {/* CSS Gradient Builder */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              CSS Gradient Generator
            </h3>
            <button
              onClick={() => copyVal(gradientCss, 'css_grad')}
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-semibold"
            >
              {copiedKey === 'css_grad' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedKey === 'css_grad' ? 'Copied CSS' : 'Copy CSS'}
            </button>
          </div>

          <div
            className="w-full h-24 rounded-xl shadow-inner border border-slate-200 dark:border-slate-700"
            style={{ background: `linear-gradient(${gradientAngle}deg, ${gradientStop1}, ${gradientStop2})` }}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-medium">Start Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={gradientStop1}
                  onChange={(e) => setGradientStop1(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-slate-300"
                />
                <span className="font-mono text-xs text-slate-700 dark:text-slate-300">{gradientStop1}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1 font-medium">End Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={gradientStop2}
                  onChange={(e) => setGradientStop2(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-slate-300"
                />
                <span className="font-mono text-xs text-slate-700 dark:text-slate-300">{gradientStop2}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1 font-medium">
              <span>Angle:</span>
              <span className="font-mono text-blue-600 font-bold">{gradientAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={gradientAngle}
              onChange={(e) => setGradientAngle(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 font-mono text-[11px] text-blue-300 break-all select-all">
            {gradientCss}
          </div>
        </div>
      </div>
    </div>
  );
}
