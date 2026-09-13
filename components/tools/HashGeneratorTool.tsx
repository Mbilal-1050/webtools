'use client';

import React, { useState, useEffect } from 'react';
import { Hash, Copy, Check, CheckCircle, ShieldCheck } from 'lucide-react';

export function HashGeneratorTool() {
  const [inputText, setInputText] = useState<string>('The quick brown fox jumps over the lazy dog');
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string>('');
  const [hashes, setHashes] = useState<{ [algo: string]: string }>({
    md5: '',
    sha1: '',
    sha256: '',
    sha384: '',
    sha512: '',
  });

  // Standard pure JS MD5 calculation
  const computeMd5 = (string: string): string => {
    function md5cycle(x: any, k: any) {
      let a = x[0], b = x[1], c = x[2], d = x[3];
      a = ff(a, b, c, d, k[0], 7, -680876936);
      d = ff(d, a, b, c, k[1], 12, -389564586);
      c = ff(c, d, a, b, k[2], 17, 606105819);
      b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897);
      d = ff(d, a, b, c, k[5], 12, 1200080426);
      c = ff(c, d, a, b, k[6], 17, -1473231341);
      b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416);
      d = ff(d, a, b, c, k[9], 12, -1958414417);
      c = ff(c, d, a, b, k[10], 17, -42063);
      b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682);
      d = ff(d, a, b, c, k[13], 12, -40341101);
      c = ff(c, d, a, b, k[14], 17, -1502002290);
      b = ff(b, c, d, a, k[15], 22, 1236535329);

      a = gg(a, b, c, d, k[1], 5, -165796510);
      d = gg(d, a, b, c, k[6], 9, -1069501632);
      c = gg(c, d, a, b, k[11], 14, 643717713);
      b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691);
      d = gg(d, a, b, c, k[10], 9, 38016083);
      c = gg(c, d, a, b, k[15], 14, -660478335);
      b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438);
      d = gg(d, a, b, c, k[14], 9, -1019803690);
      c = gg(c, d, a, b, k[3], 14, -187363961);
      b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467);
      d = gg(d, a, b, c, k[2], 9, -51403784);
      c = gg(c, d, a, b, k[7], 14, 1735328473);
      b = gg(b, c, d, a, k[12], 20, -1926607734);

      a = hh(a, b, c, d, k[5], 4, -378558);
      d = hh(d, a, b, c, k[8], 11, -2022574463);
      c = hh(c, d, a, b, k[11], 16, 1839030562);
      b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060);
      d = hh(d, a, b, c, k[4], 11, 1272893353);
      c = hh(c, d, a, b, k[7], 16, -155497632);
      b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174);
      d = hh(d, a, b, c, k[0], 11, -358537222);
      c = hh(c, d, a, b, k[3], 16, -722521979);
      b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487);
      d = hh(d, a, b, c, k[12], 11, -421815835);
      c = hh(c, d, a, b, k[15], 16, 530742520);
      b = hh(b, c, d, a, k[2], 23, -995338651);

      a = ii(a, b, c, d, k[0], 6, -198630844);
      d = ii(d, a, b, c, k[7], 10, 1126891415);
      c = ii(c, d, a, b, k[14], 15, -1416354905);
      b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571);
      d = ii(d, a, b, c, k[3], 10, -1894986606);
      c = ii(c, d, a, b, k[10], 15, -1051523);
      b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359);
      d = ii(d, a, b, c, k[15], 10, -30611744);
      c = ii(c, d, a, b, k[6], 15, -1560198380);
      b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070);
      d = ii(d, a, b, c, k[11], 10, -1120210379);
      c = ii(c, d, a, b, k[2], 15, 718787259);
      b = ii(b, c, d, a, k[9], 21, -343485551);

      x[0] = add32(a, x[0]);
      x[1] = add32(b, x[1]);
      x[2] = add32(c, x[2]);
      x[3] = add32(d, x[3]);
    }

    function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
      a = add32(add32(a, q), add32(x, t));
      return add32((a << s) | (a >>> (32 - s)), b);
    }
    function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn((b & c) | (~b & d), a, b, x, s, t);
    }
    function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn((b & d) | (c & ~d), a, b, x, s, t);
    }
    function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    function add32(a: number, b: number) {
      return (a + b) & 0xffffffff;
    }

    const n = string.length;
    const state = [1732584193, -271733879, -1732584194, 271733878];
    let i;
    for (i = 64; i <= string.length; i += 64) {
      const tail = string.substring(i - 64, i);
      const words = [];
      for (let j = 0; j < 64; j += 4) {
        words.push(
          tail.charCodeAt(j) +
            (tail.charCodeAt(j + 1) << 8) +
            (tail.charCodeAt(j + 2) << 16) +
            (tail.charCodeAt(j + 3) << 24)
        );
      }
      md5cycle(state, words);
    }

    const tail = string.substring(i - 64);
    const words = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let j = 0; j < tail.length; j++) {
      words[j >> 2] |= tail.charCodeAt(j) << ((j % 4) << 3);
    }
    words[tail.length >> 2] |= 0x80 << ((tail.length % 4) << 3);
    if (tail.length > 55) {
      md5cycle(state, words);
      for (let j = 0; j < 16; j++) words[j] = 0;
    }
    words[14] = n * 8;
    md5cycle(state, words);

    let hex = '';
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        const b = (state[j] >> (k * 8)) & 0xff;
        hex += (b < 16 ? '0' : '') + b.toString(16);
      }
    }
    return hex;
  };

  // Web Crypto SHA computation
  const computeSha = async (algo: string, text: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algo, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    const runHashes = async () => {
      try {
        const md5Val = computeMd5(inputText);
        const [sha1Val, sha256Val, sha384Val, sha512Val] = await Promise.all([
          computeSha('SHA-1', inputText),
          computeSha('SHA-256', inputText),
          computeSha('SHA-384', inputText),
          computeSha('SHA-512', inputText),
        ]);

        setHashes({
          md5: md5Val,
          sha1: sha1Val,
          sha256: sha256Val,
          sha384: sha384Val,
          sha512: sha512Val,
        });
      } catch (err) {
        console.error('Hash calculation error', err);
      }
    };

    runHashes();
  }, [inputText]);

  const copyHash = (algo: string, value: string) => {
    const val = uppercase ? value.toUpperCase() : value.toLowerCase();
    navigator.clipboard.writeText(val);
    setCopiedKey(algo);
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const HASH_CONFIGS = [
    { key: 'sha256', label: 'SHA-256 (NIST Secure Standard)', bits: 256, recommended: true },
    { key: 'sha512', label: 'SHA-512 (High Security)', bits: 512, recommended: true },
    { key: 'sha384', label: 'SHA-384', bits: 384, recommended: false },
    { key: 'sha1', label: 'SHA-1 (Legacy Checksums Only)', bits: 160, recommended: false },
    { key: 'md5', label: 'MD5 (Legacy File Verification)', bits: 128, recommended: false },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Web Cryptography Subsystem:</strong> Uses browser native <code>crypto.subtle</code> for hardware-speed hashing. Zero server latency.</span>
      </div>

      {/* Input area */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Input Plaintext String
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded border-slate-300 text-blue-600"
            />
            UPPERCASE Hex Output
          </label>
        </div>
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Generated Hashes List */}
      <div className="space-y-3">
        {HASH_CONFIGS.map(({ key, label, bits, recommended }) => {
          const rawVal = hashes[key] || '';
          const displayVal = uppercase ? rawVal.toUpperCase() : rawVal.toLowerCase();

          return (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{label}</span>
                  {recommended && (
                    <span className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 px-2 py-0.5 text-[10px] font-semibold">
                      Recommended
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 font-mono">({bits} bits)</span>
                </div>
                <button
                  onClick={() => copyHash(key, rawVal)}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 text-xs font-medium hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition"
                >
                  {copiedKey === key ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedKey === key ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3 font-mono text-xs text-blue-600 dark:text-blue-400 break-all select-all border border-slate-200/60 dark:border-slate-800">
                {displayVal || 'Computing...'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
