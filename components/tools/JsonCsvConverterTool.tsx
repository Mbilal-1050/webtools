'use client';

import React, { useState } from 'react';
import { ArrowRightLeft, Copy, Check, Download, Table, CheckCircle, AlertCircle } from 'lucide-react';

const SAMPLE_JSON = `[
  { "id": 1, "name": "John Doe", "role": "Developer", "city": "San Francisco" },
  { "id": 2, "name": "Sarah Connor", "role": "Architect", "city": "Seattle" },
  { "id": 3, "name": "Bruce Wayne", "role": "Director", "city": "Gotham" }
]`;

export function JsonCsvConverterTool() {
  const [mode, setMode] = useState<'json-to-csv' | 'csv-to-json'>('json-to-csv');
  const [inputText, setInputText] = useState<string>(SAMPLE_JSON);
  const [outputText, setOutputText] = useState<string>('');
  const [delimiter, setDelimiter] = useState<string>(',');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [previewRows, setPreviewRows] = useState<string[][]>([]);

  const convert = (text: string, currentMode: 'json-to-csv' | 'csv-to-json', delim: string) => {
    if (!text.trim()) {
      setOutputText('');
      setPreviewRows([]);
      setError(null);
      return;
    }

    try {
      if (currentMode === 'json-to-csv') {
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) {
          throw new Error('Input must be a JSON array of objects (e.g. [{ "id": 1 }])');
        }
        if (parsed.length === 0) {
          setOutputText('');
          setPreviewRows([]);
          return;
        }

        const headers = Array.from(new Set(parsed.flatMap((item) => Object.keys(item))));
        const rows: string[][] = [headers];

        const csvLines = [headers.join(delim)];

        parsed.forEach((item) => {
          const rowValues = headers.map((header) => {
            const val = item[header] !== undefined ? String(item[header]) : '';
            // Escape if contains delimiter or quotes
            if (val.includes(delim) || val.includes('"') || val.includes('\n')) {
              return `"${val.replace(/"/g, '""')}"`;
            }
            return val;
          });
          rows.push(headers.map((h) => (item[h] !== undefined ? String(item[h]) : '')));
          csvLines.push(rowValues.join(delim));
        });

        setOutputText(csvLines.join('\n'));
        setPreviewRows(rows.slice(0, 10)); // preview up to 10 rows
        setError(null);
      } else {
        // CSV to JSON
        const lines = text.trim().split(/\r?\n/);
        if (lines.length < 1) return;

        const headers = lines[0].split(delim).map((h) => h.trim().replace(/^"(.*)"$/, '$1'));
        const result: any[] = [];
        const tableRows: string[][] = [headers];

        for (let i = 1; i < lines.length; i++) {
          const rawRow = lines[i].split(delim);
          const obj: any = {};
          const rowCells: string[] = [];

          headers.forEach((header, idx) => {
            let val = rawRow[idx] !== undefined ? rawRow[idx].trim().replace(/^"(.*)"$/, '$1') : '';
            // Attempt number parse
            if (!isNaN(Number(val)) && val !== '') {
              obj[header] = Number(val);
            } else if (val.toLowerCase() === 'true') {
              obj[header] = true;
            } else if (val.toLowerCase() === 'false') {
              obj[header] = false;
            } else {
              obj[header] = val;
            }
            rowCells.push(val);
          });
          result.push(obj);
          tableRows.push(rowCells);
        }

        setOutputText(JSON.stringify(result, null, 2));
        setPreviewRows(tableRows.slice(0, 10));
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Error converting data');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const isCsv = mode === 'json-to-csv';
    const blob = new Blob([outputText], { type: isCsv ? 'text/csv' : 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = isCsv ? 'converted.csv' : 'converted.json';
    link.click();
  };

  // Run on mount or mode swap
  React.useEffect(() => {
    convert(inputText, mode, delimiter);
  }, [mode, delimiter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Client-Side Parser:</strong> Bidirectional transformation between JSON structures and CSV spreadsheets without external API calls.</span>
      </div>

      {/* Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMode('json-to-csv');
              setInputText(SAMPLE_JSON);
            }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
              mode === 'json-to-csv'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            JSON → CSV
          </button>
          <button
            onClick={() => {
              setMode('csv-to-json');
              setInputText(`id,name,role,city\n1,John Doe,Developer,San Francisco\n2,Sarah Connor,Architect,Seattle\n3,Bruce Wayne,Director,Gotham`);
            }}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
              mode === 'csv-to-json'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            CSV → JSON
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Delimiter:</span>
            <select
              value={delimiter}
              onChange={(e) => {
                setDelimiter(e.target.value);
                convert(inputText, mode, e.target.value);
              }}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs text-slate-900 dark:text-white"
            >
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="&#9;">Tab (\t)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300 px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-100"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-700"
          >
            <Download className="w-3.5 h-3.5" />
            Download
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Input ({mode === 'json-to-csv' ? 'JSON' : 'CSV'})
          </label>
          <textarea
            rows={12}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              convert(e.target.value, mode, delimiter);
            }}
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <label className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Output ({mode === 'json-to-csv' ? 'CSV' : 'JSON'})
          </label>
          <textarea
            readOnly
            rows={12}
            value={outputText}
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 select-all"
          />
        </div>
      </div>

      {/* Table Preview */}
      {previewRows.length > 1 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            <Table className="w-4 h-4 text-blue-600" />
            Live Data Table Preview (First {previewRows.length - 1} rows)
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  {previewRows[0].map((header, idx) => (
                    <th key={idx} className="px-3.5 py-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                {previewRows.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2 text-slate-700 dark:text-slate-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
