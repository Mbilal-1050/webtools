'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Lock,
  Cpu,
  Layers,
  Image as ImageIcon,
  Code,
  Type,
  Calculator,
  HardDrive,
  GlobeLock,
  CheckCircle2,
  XCircle,
  Command,
  Flame,
  LayoutGrid,
  Filter,
} from 'lucide-react';
import { TOOLS_DATA, ToolCategory, ToolItem } from '@/lib/tools-data';
import { AdSlot } from '@/components/AdSlot';
import { HeroTypewriter } from '@/components/HeroTypewriter';
import { TrustBadges } from '@/components/TrustBadges';

interface CategoryConfig {
  id: ToolCategory;
  name: string;
  description: string;
  icon: React.ElementType;
  accent: {
    badge: string;
    iconBg: string;
    iconColor: string;
    border: string;
  };
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Compress, convert, resize, crop, and generate meme graphics directly in your browser using HTML5 Canvas.',
    icon: ImageIcon,
    accent: {
      badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/40',
      iconBg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-200/60 dark:border-emerald-800/40',
    },
  },
  {
    id: 'developer',
    name: 'Developer & Code',
    description: 'JSON formatters, regex analyzers, cryptographic hashes, UUID generators, and code minifiers.',
    icon: Code,
    accent: {
      badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/40',
      iconBg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
      iconColor: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200/60 dark:border-blue-800/40',
    },
  },
  {
    id: 'text',
    name: 'Text & Content',
    description: 'Markdown editors, case transformers, duplicate line strippers, and Lorem Ipsum generators.',
    icon: Type,
    accent: {
      badge: 'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border-violet-200/50 dark:border-violet-800/40',
      iconBg: 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300',
      iconColor: 'text-violet-600 dark:text-violet-400',
      border: 'border-violet-200/60 dark:border-violet-800/40',
    },
  },
  {
    id: 'utility',
    name: 'Everyday Utilities',
    description: 'Word counters, password entropy generators, BMI calculators, unit converters, and age counters.',
    icon: Calculator,
    accent: {
      badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/40',
      iconBg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
      iconColor: 'text-amber-600 dark:text-amber-400',
      border: 'border-amber-200/60 dark:border-amber-800/40',
    },
  },
];

type ViewMode = 'grouped' | 'all' | ToolCategory;

const POPULAR_TOOL_IDS = [
  'image-compressor',
  'json-formatter',
  'favicon-generator',
  'regex-tester',
  'password-generator',
  'base64-encoder-decoder',
];

export default function HomePage() {
  const router = useRouter();
  // Category-grouped view is the default as requested
  const [activeTab, setActiveTab] = useState<ViewMode>('grouped');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut listener: Pressing '/' focuses the search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter tools based on search query (case-insensitive, partial matching against name, description, category, and keywords)
  const matchesSearch = React.useCallback(
    (tool: ToolItem) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        (tool.longDescription && tool.longDescription.toLowerCase().includes(q)) ||
        tool.category.toLowerCase().includes(q) ||
        tool.categoryName.toLowerCase().includes(q) ||
        (tool.keywords && tool.keywords.some((k) => k.toLowerCase().includes(q)))
      );
    },
    [searchQuery]
  );

  const handleSelectTool = (slug: string) => {
    setIsSearchFocused(false);
    router.push(`/tools/${slug}`);
  };

  const handleSelectSuggestion = (term: string) => {
    setSearchQuery(term);
    setIsSearchFocused(true);
    setSelectedResultIndex(0);
    searchInputRef.current?.focus();
  };

  // Grouped tools by category (with search applied)
  const groupedTools = useMemo(() => {
    return CATEGORY_CONFIGS.map((config) => {
      const allCategoryTools = TOOLS_DATA.filter((t) => t.category === config.id);
      const matchingCategoryTools = allCategoryTools.filter(matchesSearch);
      return {
        config,
        totalCount: allCategoryTools.length,
        tools: matchingCategoryTools,
      };
    });
  }, [matchesSearch]);

  // Flat list of all matching tools (sorted by query relevance so direct title/keyword matches rank first)
  const flatMatchingTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return TOOLS_DATA;

    const getScore = (tool: ToolItem) => {
      const name = tool.name.toLowerCase();
      if (name === q) return 100;
      if (name.startsWith(q)) return 80;
      if (name.includes(q)) return 60;
      if (tool.slug.includes(q)) return 50;
      if (tool.keywords.some((k) => k.toLowerCase().startsWith(q))) return 40;
      if (tool.keywords.some((k) => k.toLowerCase().includes(q))) return 30;
      if (tool.categoryName.toLowerCase().includes(q)) return 20;
      if (tool.shortDescription.toLowerCase().includes(q)) return 10;
      return 1;
    };

    return TOOLS_DATA.filter(matchesSearch).sort((a, b) => getScore(b) - getScore(a));
  }, [matchesSearch, searchQuery]);

  // Overall count of matching tools
  const totalMatchingCount = flatMatchingTools.length;

  // Featured tools for quick launcher
  const popularTools = useMemo(() => {
    return TOOLS_DATA.filter((t) => POPULAR_TOOL_IDS.includes(t.id));
  }, []);

  // Category badge colors
  const getCategoryStyles = (category: ToolCategory) => {
    switch (category) {
      case 'image':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/40';
      case 'developer':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/40';
      case 'text':
        return 'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border-violet-200/50 dark:border-violet-800/40';
      case 'utility':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/40';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const getCategoryIcon = (category: ToolCategory) => {
    switch (category) {
      case 'image':
        return ImageIcon;
      case 'developer':
        return Code;
      case 'text':
        return Type;
      case 'utility':
        return Calculator;
      default:
        return Code;
    }
  };

  // Reusable tool card component
  const renderToolCard = (tool: ToolItem, index: number) => (
    <motion.div
      key={tool.id}
      id={`card-${tool.id}`}
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.15) }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link
        id={`tool-link-${tool.id}`}
        href={`/tools/${tool.slug}`}
        className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 p-6 shadow-xs hover:border-blue-300 dark:hover:border-blue-700/80 hover:shadow-md transition-all duration-200"
      >
        {/* Subtle top edge glow on hover */}
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-transparent via-blue-500/0 group-hover:via-blue-500/60 to-transparent transition-all duration-300" />

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold border ${getCategoryStyles(
                tool.category
              )}`}
            >
              {tool.categoryName}
            </span>

            {tool.badge ? (
              <span className="rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 px-2 py-0.5 text-[10px] font-medium">
                {tool.badge}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                <Lock className="w-2.5 h-2.5" />
                Client-Side
              </span>
            )}
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              {tool.name}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
              {tool.shortDescription}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <span>Launch Tool</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition duration-150" />
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 py-16 sm:py-24">
        {/* Subtle radial ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          {/* Animated Privacy Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200/80 dark:border-emerald-800/80 bg-emerald-50/90 dark:bg-emerald-950/60 px-4 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 shadow-xs backdrop-blur-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Lock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>100% In-Browser Privacy • Zero Files or Data Transmitted</span>
          </motion.div>

          {/* Heading with smooth motion */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]"
          >
            High-Speed Web Tools.{' '}
            <HeroTypewriter />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            A high-performance suite of 26 browser-native utilities for developers, designers, and creators.
            Executed instantly via Canvas, Web Workers, and Web Crypto.
          </motion.p>

          {/* Search Input Bar with Interactive Results Dropdown */}
          <motion.div
            ref={searchContainerRef}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="max-w-2xl mx-auto relative pt-2 z-40"
          >
            <div className="group relative flex items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-md backdrop-blur-md transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 dark:focus-within:ring-blue-400/10">
              <Search className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 ml-4 shrink-0 transition-colors" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                  setSelectedResultIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (flatMatchingTools.length > 0) {
                      setSelectedResultIndex((prev) => (prev + 1) % flatMatchingTools.length);
                    }
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (flatMatchingTools.length > 0) {
                      setSelectedResultIndex((prev) => (prev - 1 + flatMatchingTools.length) % flatMatchingTools.length);
                    }
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (flatMatchingTools.length > 0) {
                      const targetTool = flatMatchingTools[selectedResultIndex] || flatMatchingTools[0];
                      if (targetTool) {
                        handleSelectTool(targetTool.slug);
                      }
                    }
                  } else if (e.key === 'Escape') {
                    setIsSearchFocused(false);
                    searchInputRef.current?.blur();
                  }
                }}
                placeholder="Search all 26 tools (e.g. compress, json, password, favicon)..."
                className="w-full bg-transparent px-4 py-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <div className="flex items-center gap-2 mr-3 shrink-0">
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      searchInputRef.current?.focus();
                      setIsSearchFocused(false);
                    }}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    Clear
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    /
                  </kbd>
                )}
              </div>
            </div>

            {/* Results Dropdown Menu */}
            <AnimatePresence>
              {isSearchFocused && searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.99 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl backdrop-blur-xl overflow-hidden text-left"
                >
                  {flatMatchingTools.length > 0 ? (
                    <div>
                      {/* Dropdown Header */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/90 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800/80 text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          Found {flatMatchingTools.length} {flatMatchingTools.length === 1 ? 'tool' : 'tools'} matching &quot;{searchQuery}&quot;
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-slate-400">
                          <span><kbd className="px-1 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-[10px] font-mono">↑</kbd><kbd className="px-1 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-[10px] font-mono">↓</kbd> navigate</span>
                          <span>·</span>
                          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-[10px] font-mono">↵</kbd> open</span>
                          <span>·</span>
                          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-[10px] font-mono">Esc</kbd> dismiss</span>
                        </span>
                      </div>

                      {/* Dropdown Results List */}
                      <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
                        {flatMatchingTools.map((tool, idx) => {
                          const isSelected = idx === selectedResultIndex;
                          const Icon = getCategoryIcon(tool.category);
                          return (
                            <div
                              key={tool.id}
                              id={`search-result-${tool.slug}`}
                              onClick={() => handleSelectTool(tool.slug)}
                              onMouseEnter={() => setSelectedResultIndex(idx)}
                              className={`flex items-center justify-between gap-3 px-4 py-3 cursor-pointer transition ${
                                isSelected
                                  ? 'bg-blue-50/90 dark:bg-blue-950/60 text-blue-950 dark:text-blue-100'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                                    tool.category === 'image'
                                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300'
                                      : tool.category === 'developer'
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                      : tool.category === 'text'
                                      ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300'
                                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                                  }`}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                      {tool.name}
                                    </span>
                                    <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                      {tool.categoryName}
                                    </span>
                                    {tool.popular && (
                                      <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                                        Popular
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                    {tool.shortDescription}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span
                                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition ${
                                    isSelected
                                      ? 'bg-blue-600 text-white shadow-xs'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                                  }`}
                                >
                                  <span>Open</span>
                                  <ArrowRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Dropdown Footer */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/60 dark:bg-slate-800/40 border-t border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-500">
                        <span>Showing {flatMatchingTools.length} {flatMatchingTools.length === 1 ? 'tool' : 'tools'}</span>
                        <a
                          href="#all-tools"
                          onClick={() => setIsSearchFocused(false)}
                          className="font-medium text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Scroll to catalog view</span>
                          <span>↓</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    /* Fallback: No tools found message */
                    <div className="p-6 text-center space-y-3">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <Search className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          No tools found matching &quot;{searchQuery}&quot;
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                          We couldn&apos;t find any utility matching your query. Try searching for{' '}
                          <button
                            type="button"
                            onClick={() => handleSelectSuggestion('compress')}
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
                          >
                            compress
                          </button>
                          ,{' '}
                          <button
                            type="button"
                            onClick={() => handleSelectSuggestion('json')}
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
                          >
                            json
                          </button>
                          ,{' '}
                          <button
                            type="button"
                            onClick={() => handleSelectSuggestion('password')}
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
                          >
                            password
                          </button>
                          , or{' '}
                          <button
                            type="button"
                            onClick={() => handleSelectSuggestion('favicon')}
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
                          >
                            favicon
                          </button>
                          .
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          searchInputRef.current?.focus();
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                      >
                        Clear search
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Keyword Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-400">Quick suggestions:</span>
              {['Compress Image', 'JSON Formatter', 'Favicon', 'Regex', 'Password', 'Base64'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSelectSuggestion(term)}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 px-2 py-0.5 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </motion.div>

          {/* 4-Feature Trust Badges Grid (100% Private, Client-Side Speed, Zero Signup & Free, PWA & Offline Ready) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="pt-6"
          >
            <TrustBadges />
          </motion.div>
        </div>
      </section>

      {/* Ad Space (Completely hidden unless valid client ID is present) */}
      <AdSlot position="header" />

      {/* Main Tools Showcase */}
      <div id="all-tools" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
        {/* Section Header & View Selection Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
                <span>Browse All Utilities</span>
                <span className="text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 border border-blue-200/50 dark:border-blue-800/50">
                  {totalMatchingCount} Tools
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Every utility runs 100% locally in your browser with zero network latency.
              </p>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear search filter
              </button>
            )}
          </div>

          {/* View Modes & Categories Tabs Bar */}
          <div className="relative flex flex-wrap items-center gap-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-3">
            {/* 1. Grouped by Category (Default) */}
            <button
              id="tab-grouped-view"
              onClick={() => setActiveTab('grouped')}
              className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === 'grouped'
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {activeTab === 'grouped' && (
                <motion.div
                  layoutId="active-view-tab"
                  className="absolute inset-0 rounded-xl bg-blue-600 shadow-sm shadow-blue-500/20"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Grouped by Category</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    activeTab === 'grouped'
                      ? 'bg-blue-700/90 text-white'
                      : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {TOOLS_DATA.length}
                </span>
              </span>
            </button>

            {/* 2. All Tools (Ungrouped flat grid option) */}
            <button
              id="tab-all-ungrouped"
              onClick={() => setActiveTab('all')}
              className={`relative flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              {activeTab === 'all' && (
                <motion.div
                  layoutId="active-view-tab"
                  className="absolute inset-0 rounded-xl bg-blue-600 shadow-sm shadow-blue-500/20"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Tools (Flat Grid)</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    activeTab === 'all'
                      ? 'bg-blue-700/90 text-white'
                      : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {TOOLS_DATA.length}
                </span>
              </span>
            </button>

            {/* Divider */}
            <div className="hidden sm:block h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

            {/* Individual Category Filter Tabs */}
            {CATEGORY_CONFIGS.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              const count = TOOLS_DATA.filter((t) => t.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  id={`tab-cat-${cat.id}`}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-view-tab"
                      className="absolute inset-0 rounded-xl bg-blue-600 shadow-sm shadow-blue-500/20"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.name}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        isActive
                          ? 'bg-blue-700/90 text-white'
                          : 'bg-slate-200/70 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Empty State (when search returns 0 items) */}
        {totalMatchingCount === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center space-y-3"
          >
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              No tools matched &quot;{searchQuery}&quot;
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try searching with different terms or reset your filters to view all 26 utilities.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('grouped');
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-2"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}

        {/* VIEW 1: CATEGORY-GROUPED VIEW (Default Layout Requested) */}
        {activeTab === 'grouped' && totalMatchingCount > 0 && (
          <div className="space-y-12 sm:space-y-16">
            {groupedTools.map((group) => {
              const { config, tools, totalCount } = group;
              const Icon = config.icon;

              // If filtering by search, skip empty categories
              if (searchQuery.trim() !== '' && tools.length === 0) {
                return null;
              }

              return (
                <section
                  key={config.id}
                  id={`cat-${config.id}`}
                  className="scroll-mt-24 space-y-5"
                >
                  {/* Category Section Header Banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex items-start sm:items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.accent.iconBg} shadow-xs`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            {config.name}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${config.accent.badge}`}
                          >
                            {searchQuery.trim()
                              ? `${tools.length} of ${totalCount} Tools`
                              : `${totalCount} Tools`}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1 sm:line-clamp-none max-w-2xl">
                          {config.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-800/40 px-2.5 py-1 rounded-lg">
                        <Lock className="w-3 h-3" />
                        100% In-Browser
                      </span>
                    </div>
                  </div>

                  {/* Grid with cards belonging strictly to this category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <AnimatePresence mode="popLayout">
                      {tools.map((tool, index) => renderToolCard(tool, index))}
                    </AnimatePresence>
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* VIEW 2: UNGROUPED FLAT GRID (Available as "All Tools" tab option) */}
        {activeTab === 'all' && totalMatchingCount > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Showing all {flatMatchingTools.length} utilities in a single flat grid
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {flatMatchingTools.map((tool, index) => renderToolCard(tool, index))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* VIEW 3: SINGLE CATEGORY FILTERED VIEW */}
        {activeTab !== 'grouped' && activeTab !== 'all' && totalMatchingCount > 0 && (
          <div className="space-y-6">
            {(() => {
              const currentCategoryConfig = CATEGORY_CONFIGS.find((c) => c.id === activeTab);
              const singleCatTools = TOOLS_DATA.filter((t) => t.category === activeTab).filter(
                matchesSearch
              );
              const Icon = currentCategoryConfig?.icon || Layers;

              return (
                <section id={`cat-${activeTab}`} className="scroll-mt-24 space-y-6">
                  {currentCategoryConfig && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${currentCategoryConfig.accent.iconBg} shadow-xs`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2.5">
                            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                              {currentCategoryConfig.name}
                            </h3>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${currentCategoryConfig.accent.badge}`}
                            >
                              {singleCatTools.length} Tools
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {currentCategoryConfig.description}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab('grouped')}
                        className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline self-start sm:self-auto"
                      >
                        ← Back to Grouped View
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <AnimatePresence mode="popLayout">
                      {singleCatTools.map((tool, index) => renderToolCard(tool, index))}
                    </AnimatePresence>
                  </div>
                </section>
              );
            })()}
          </div>
        )}

        {/* In-content Ad Slot (Completely hidden unless valid client ID is present) */}
        <AdSlot position="in-content" />

        {/* Most Popular Quick Launcher Carousel/Grid */}
        {activeTab === 'grouped' && searchQuery === '' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Popular Developer & Image Utilities
                </h2>
              </div>
              <span className="text-xs text-slate-400 hidden sm:inline">Top daily utilities</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularTools.map((tool) => (
                <Link
                  key={tool.id}
                  id={`popular-tool-${tool.id}`}
                  href={`/tools/${tool.slug}`}
                  className="group rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xs transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                      {tool.name}
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {tool.shortDescription}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Architecture Comparison: Cloud Server vs 100% In-Browser */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xs space-y-8"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Architectural Advantage</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Why 100% Client-Side Architecture Matters
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard web converter tools silently upload your confidential PDFs, code tokens, customer data, and high-res imagery to remote cloud servers. Here is how our browser sandbox architecture compares:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Cloud Tools Box */}
            <div className="p-6 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-4">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
                <XCircle className="w-5 h-5" />
                <span>Traditional Cloud Converters</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Files uploaded to remote servers, risking data leaks and surveillance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Strict 5MB–10MB upload limits behind paywalls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Slow network latency on large files and poor cellular connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Requires persistent internet connection; fails offline completely</span>
                </li>
              </ul>
            </div>

            {/* Our Client-Side Tools Box */}
            <div className="p-6 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Our Browser-Native Tools</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Zero uploads: files process entirely in local RAM via Web Workers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>No artificial file size limits or paywalled export features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>0ms network delay: instant conversions powered by your hardware</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                  <span>Installable PWA that functions seamlessly offline without internet</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
              <GlobeLock className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                Zero-Knowledge Privacy
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Images, text, and keys never touch a server database or third-party storage bucket.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
              <Cpu className="w-5 h-5 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                Hardware Acceleration
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Processes files directly with your GPU and multi-core CPU using Web Workers and Canvas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1.5">
              <HardDrive className="w-5 h-5 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                Installable Offline PWA
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Install to your desktop dock or home screen to use during flights, commutes, or outages.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Footer Ad Space (Completely hidden unless valid client ID is present) */}
        <AdSlot position="footer" />
      </div>
    </div>
  );
}
