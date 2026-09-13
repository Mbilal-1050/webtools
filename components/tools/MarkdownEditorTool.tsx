'use client';

import React, { useState } from 'react';
import { Bold, Italic, Strikethrough, Heading1, Heading2, List, ListOrdered, Code, Quote, Link as LinkIcon, Download, Copy, Check, CheckCircle } from 'lucide-react';

const SAMPLE_MARKDOWN = `# Client-Side Web Tools
A high-performance suite of **100% browser-native** utilities.

## Core Advantages
* **Privacy First**: Zero server uploads.
* **Instant Speed**: Hardware-accelerated execution.
* **Offline Capable**: Full PWA compatibility.

### Code Sample
\`\`\`typescript
const double = (n: number) => n * 2;
console.log(double(21)); // 42
\`\`\`

> "Craftsmanship is doing it right when no one is looking."

Feel free to edit this text or write your own documentation!`;

export function MarkdownEditorTool() {
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MARKDOWN);
  const [copied, setCopied] = useState<string>('');

  // Lightweight robust markdown to HTML converter for client-side execution
  const parseMarkdown = (md: string): string => {
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks
    html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre class="bg-slate-900 text-blue-300 p-4 rounded-xl overflow-x-auto my-3 font-mono text-xs"><code>$2</code></pre>');
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>');
    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 dark:text-white mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-slate-900 dark:text-white mt-5 mb-2 border-b border-slate-200 dark:border-slate-800 pb-1">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 mb-3">$1</h1>');
    // Blockquote
    html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-1 my-3 text-slate-600 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-900/40 rounded-r-lg">$1</blockquote>');
    // Bold & italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/~~(.*?)~~/g, '<del class="line-through text-slate-400">$1</del>');
    // Unordered lists
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc text-slate-700 dark:text-slate-300">$1</li>');
    // Ordered lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 dark:text-slate-300">$1</li>');
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 underline font-medium" target="_blank" rel="noopener noreferrer">$1</a>');
    // Paragraphs
    html = html.replace(/\n\n/g, '<p class="my-2 text-slate-700 dark:text-slate-300 leading-relaxed"></p>');

    return html;
  };

  const insertSyntax = (before: string, after: string = '') => {
    setMarkdown((prev) => prev + `\n${before}Your Text${after}`);
  };

  const wordsCount = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  const charsCount = markdown.length;

  const copyContent = (type: 'md' | 'html') => {
    const text = type === 'md' ? markdown : parseMarkdown(markdown);
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const downloadFile = (type: 'md' | 'html') => {
    const text = type === 'md' ? markdown : parseMarkdown(markdown);
    const mime = type === 'md' ? 'text/markdown' : 'text/html';
    const blob = new Blob([text], { type: mime });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `document.${type}`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-3 text-xs text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span><strong>Real-Time Markdown Preview:</strong> Write, format, and preview GitHub Flavored Markdown with instant HTML compilation.</span>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-sm">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => insertSyntax('**', '**')}
            title="Bold"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('*', '*')}
            title="Italic"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('~~', '~~')}
            title="Strikethrough"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          <span className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
          <button
            onClick={() => insertSyntax('# ')}
            title="Heading 1"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('## ')}
            title="Heading 2"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <span className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
          <button
            onClick={() => insertSyntax('* ')}
            title="Bullet List"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('1. ')}
            title="Numbered List"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('> ')}
            title="Blockquote"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('```typescript\n', '\n```')}
            title="Code Block"
            className="p-1.5 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => copyContent('md')}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {copied === 'md' ? 'Copied MD!' : 'Copy Markdown'}
          </button>
          <button
            onClick={() => copyContent('html')}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {copied === 'html' ? 'Copied HTML!' : 'Copy HTML'}
          </button>
          <button
            onClick={() => downloadFile('md')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 text-white px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-700"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </button>
        </div>
      </div>

      {/* Editor & Preview Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Markdown Source</span>
            <span className="text-[11px] font-mono text-slate-400">{wordsCount} words • {charsCount} chars</span>
          </div>
          <textarea
            rows={18}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
            className="w-full flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4 font-mono text-xs text-slate-900 dark:text-slate-100 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            Rendered HTML Output
          </span>
          <div
            className="w-full flex-1 min-h-[350px] rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-5 text-sm overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>
      </div>
    </div>
  );
}
