'use client';

import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check, CheckCircle, Calculator } from 'lucide-react';

type UnitCategory = 'length' | 'weight' | 'temp' | 'digital' | 'time';

interface UnitDef {
  id: string;
  name: string;
  ratio: number; // Ratio relative to base unit
}

const CATEGORY_UNITS: Record<
  UnitCategory,
  { name: string; base: string; units: UnitDef[] }
> = {
  length: {
    name: 'Length & Distance',
    base: 'm',
    units: [
      { id: 'm', name: 'Meters (m)', ratio: 1 },
      { id: 'km', name: 'Kilometers (km)', ratio: 1000 },
      { id: 'cm', name: 'Centimeters (cm)', ratio: 0.01 },
      { id: 'mm', name: 'Millimeters (mm)', ratio: 0.001 },
      { id: 'mi', name: 'Miles (mi)', ratio: 1609.344 },
      { id: 'yd', name: 'Yards (yd)', ratio: 0.9144 },
      { id: 'ft', name: 'Feet (ft)', ratio: 0.3048 },
      { id: 'in', name: 'Inches (in)', ratio: 0.0254 },
    ],
  },
  weight: {
    name: 'Weight & Mass',
    base: 'kg',
    units: [
      { id: 'kg', name: 'Kilograms (kg)', ratio: 1 },
      { id: 'g', name: 'Grams (g)', ratio: 0.001 },
      { id: 'mg', name: 'Milligrams (mg)', ratio: 0.000001 },
      { id: 'lb', name: 'Pounds (lbs)', ratio: 0.45359237 },
      { id: 'oz', name: 'Ounces (oz)', ratio: 0.02834952 },
      { id: 'ton', name: 'Metric Tons (t)', ratio: 1000 },
    ],
  },
  temp: {
    name: 'Temperature',
    base: 'c',
    units: [
      { id: 'c', name: 'Celsius (°C)', ratio: 1 },
      { id: 'f', name: 'Fahrenheit (°F)', ratio: 1 },
      { id: 'k', name: 'Kelvin (K)', ratio: 1 },
    ],
  },
  digital: {
    name: 'Digital Data Storage',
    base: 'b',
    units: [
      { id: 'b', name: 'Bytes (B)', ratio: 1 },
      { id: 'kb', name: 'Kilobytes (KB)', ratio: 1024 },
      { id: 'mb', name: 'Megabytes (MB)', ratio: 1048576 },
      { id: 'gb', name: 'Gigabytes (GB)', ratio: 1073741824 },
      { id: 'tb', name: 'Terabytes (TB)', ratio: 1099511627776 },
    ],
  },
  time: {
    name: 'Time Duration',
    base: 's',
    units: [
      { id: 's', name: 'Seconds (s)', ratio: 1 },
      { id: 'min', name: 'Minutes (min)', ratio: 60 },
      { id: 'h', name: 'Hours (hr)', ratio: 3600 },
      { id: 'd', name: 'Days (d)', ratio: 86400 },
      { id: 'w', name: 'Weeks (wk)', ratio: 604800 },
      { id: 'y', name: 'Years (yr - 365d)', ratio: 31536000 },
    ],
  },
};

export function UnitConverterTool() {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [inputValue, setInputValue] = useState<string>('100');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCategoryChange = (cat: UnitCategory) => {
    setCategory(cat);
    const catData = CATEGORY_UNITS[cat];
    setFromUnit(catData.units[0].id);
    setToUnit(catData.units[1].id);
  };

  const calculateConversion = (): string => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '0';

    if (category === 'temp') {
      if (fromUnit === toUnit) return val.toString();
      // Temperature special logic
      let celsius = val;
      if (fromUnit === 'f') celsius = ((val - 32) * 5) / 9;
      else if (fromUnit === 'k') celsius = val - 273.15;

      let result = celsius;
      if (toUnit === 'f') result = (celsius * 9) / 5 + 32;
      else if (toUnit === 'k') result = celsius + 273.15;

      return parseFloat(result.toFixed(4)).toString();
    }

    const currentCat = CATEGORY_UNITS[category];
    const uFrom = currentCat.units.find((u) => u.id === fromUnit);
    const uTo = currentCat.units.find((u) => u.id === toUnit);

    if (!uFrom || !uTo) return '0';

    // Convert to base unit then to target unit
    const baseVal = val * uFrom.ratio;
    const targetVal = baseVal / uTo.ratio;

    if (Math.abs(targetVal) < 0.0001 && targetVal !== 0) {
      return targetVal.toExponential(4);
    }
    return parseFloat(targetVal.toFixed(6)).toString();
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const result = calculateConversion();

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentUnits = CATEGORY_UNITS[category].units;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Precision Scientific Math Engine:</strong> Instant metric, imperial, thermodynamic, and binary byte conversions.</span>
      </div>

      {/* Category selector pills */}
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(CATEGORY_UNITS) as UnitCategory[]).map((catKey) => (
          <button
            key={catKey}
            onClick={() => handleCategoryChange(catKey)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
              category === catKey
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {CATEGORY_UNITS[catKey].name}
          </button>
        ))}
      </div>

      {/* Main Conversion Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
          {/* FROM */}
          <div className="sm:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">From</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 font-mono text-lg font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white"
            >
              {currentUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* SWAP BUTTON */}
          <div className="flex justify-center sm:col-span-1">
            <button
              onClick={swapUnits}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 transition"
              title="Swap units"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* TO */}
          <div className="sm:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">To</label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-semibold"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="w-full rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/30 px-4 py-2.5 font-mono text-lg font-bold text-blue-600 dark:text-blue-400 overflow-x-auto select-all">
              {result}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs text-slate-900 dark:text-white"
            >
              {currentUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Multi-Unit Reference Table */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Equivalent in all {CATEGORY_UNITS[category].name} units
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {currentUnits.map((u) => {
              const val = parseFloat(inputValue);
              let converted = '0';
              if (!isNaN(val)) {
                if (category === 'temp') {
                  let celsius = val;
                  if (fromUnit === 'f') celsius = ((val - 32) * 5) / 9;
                  else if (fromUnit === 'k') celsius = val - 273.15;
                  let res = celsius;
                  if (u.id === 'f') res = (celsius * 9) / 5 + 32;
                  else if (u.id === 'k') res = celsius + 273.15;
                  converted = parseFloat(res.toFixed(2)).toString();
                } else {
                  const uFrom = currentUnits.find((x) => x.id === fromUnit);
                  if (uFrom) {
                    const baseVal = val * uFrom.ratio;
                    const tVal = baseVal / u.ratio;
                    converted = parseFloat(tVal.toFixed(4)).toString();
                  }
                }
              }

              return (
                <div key={u.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="text-[10px] text-slate-500 font-medium">{u.name}</div>
                  <div className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {converted}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
