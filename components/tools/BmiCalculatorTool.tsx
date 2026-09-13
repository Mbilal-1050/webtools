'use client';

import React, { useState, useMemo } from 'react';
import { Activity, CheckCircle, HeartPulse, Scale } from 'lucide-react';

export function BmiCalculatorTool() {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  // Metric values
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);

  // Imperial values
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(155);

  const { bmi, category, color, healthyMinKg, healthyMaxKg, healthyMinLbs, healthyMaxLbs, pointerPercent } = useMemo(() => {
    let hM = 0;
    let wKg = 0;

    if (unitSystem === 'metric') {
      hM = heightCm / 100;
      wKg = weightKg;
    } else {
      const totalInches = heightFt * 12 + heightIn;
      hM = totalInches * 0.0254;
      wKg = weightLbs * 0.45359237;
    }

    if (hM <= 0 || wKg <= 0) {
      return { bmi: 0, category: 'N/A', color: 'text-slate-400', healthyMinKg: 0, healthyMaxKg: 0, healthyMinLbs: 0, healthyMaxLbs: 0, pointerPercent: 0 };
    }

    const calculatedBmi = wKg / (hM * hM);
    const minKg = 18.5 * (hM * hM);
    const maxKg = 24.9 * (hM * hM);
    const minLbs = minKg / 0.45359237;
    const maxLbs = maxKg / 0.45359237;

    let cat = 'Normal weight';
    let col = 'text-emerald-600 dark:text-emerald-400';

    if (calculatedBmi < 18.5) {
      cat = 'Underweight';
      col = 'text-blue-600 dark:text-blue-400';
    } else if (calculatedBmi < 25) {
      cat = 'Healthy / Normal weight';
      col = 'text-emerald-600 dark:text-emerald-400';
    } else if (calculatedBmi < 30) {
      cat = 'Overweight';
      col = 'text-amber-600 dark:text-amber-400';
    } else if (calculatedBmi < 35) {
      cat = 'Obesity Class I';
      col = 'text-orange-600 dark:text-orange-400';
    } else {
      cat = 'Obesity Class II/III';
      col = 'text-rose-600 dark:text-rose-400';
    }

    // Scale from BMI 15 (0%) to 40 (100%)
    const clamped = Math.min(40, Math.max(15, calculatedBmi));
    const pct = ((clamped - 15) / (40 - 15)) * 100;

    return {
      bmi: parseFloat(calculatedBmi.toFixed(1)),
      category: cat,
      color: col,
      healthyMinKg: Math.round(minKg),
      healthyMaxKg: Math.round(maxKg),
      healthyMinLbs: Math.round(minLbs),
      healthyMaxLbs: Math.round(maxLbs),
      pointerPercent: pct,
    };
  }, [unitSystem, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>WHO Anthropometric Standard:</strong> Calculates Body Mass Index and healthy weight intervals completely in your browser.</span>
      </div>

      {/* Unit switch */}
      <div className="flex justify-center">
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`rounded-lg px-5 py-2 text-xs font-semibold transition ${
              unitSystem === 'metric' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`rounded-lg px-5 py-2 text-xs font-semibold transition ${
              unitSystem === 'imperial' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Imperial (ft, in / lbs)
          </button>
        </div>
      </div>

      {/* Input controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        {unitSystem === 'metric' ? (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Height</span>
                <span className="text-blue-600 font-mono">{heightCm} cm</span>
              </div>
              <input
                type="range"
                min="100"
                max="230"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                <span>Weight</span>
                <span className="text-blue-600 font-mono">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min="30"
                max="180"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
              />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Height (Feet & Inches)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    min="3"
                    max="7"
                    value={heightFt}
                    onChange={(e) => setHeightFt(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                    placeholder="Feet"
                  />
                  <span className="text-[10px] text-slate-400">Feet</span>
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                    placeholder="Inches"
                  />
                  <span className="text-[10px] text-slate-400">Inches</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Weight (Pounds)
              </label>
              <input
                type="number"
                min="60"
                max="400"
                value={weightLbs}
                onChange={(e) => setWeightLbs(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white"
                placeholder="Pounds"
              />
              <span className="text-[10px] text-slate-400 font-mono">{weightLbs} lbs</span>
            </div>
          </>
        )}
      </div>

      {/* Results Banner & Gauge */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Calculated BMI</span>
          <div className="font-mono text-5xl font-extrabold text-blue-600 dark:text-blue-400">
            {bmi}
          </div>
          <div className={`text-sm font-bold ${color}`}>{category}</div>
        </div>

        {/* Color Spectrum Gauge */}
        <div className="space-y-2">
          <div className="relative h-4 rounded-full overflow-hidden flex shadow-inner">
            <div className="bg-blue-500 w-[14%]" title="Underweight (<18.5)" />
            <div className="bg-emerald-500 w-[26%]" title="Normal (18.5-24.9)" />
            <div className="bg-amber-500 w-[20%]" title="Overweight (25-29.9)" />
            <div className="bg-orange-500 w-[20%]" title="Obese I (30-34.9)" />
            <div className="bg-rose-600 w-[20%]" title="Obese II/III (35+)" />
          </div>

          {/* Pointer indicator */}
          <div className="relative h-4">
            <div
              style={{ left: `${pointerPercent}%` }}
              className="absolute -top-1 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
            >
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-slate-900 dark:border-b-white" />
            </div>
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>&lt; 18.5 (Under)</span>
            <span>18.5 - 24.9 (Normal)</span>
            <span>25 - 29.9 (Over)</span>
            <span>30+ (Obese)</span>
          </div>
        </div>

        {/* Healthy weight advice target */}
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200/60 dark:border-slate-700/60 text-center text-xs text-slate-600 dark:text-slate-300">
          Target healthy weight range for your height:{' '}
          <strong className="text-emerald-600 dark:text-emerald-400">
            {unitSystem === 'metric'
              ? `${healthyMinKg} kg – ${healthyMaxKg} kg`
              : `${healthyMinLbs} lbs – ${healthyMaxLbs} lbs`}
          </strong>
        </div>
      </div>
    </div>
  );
}
