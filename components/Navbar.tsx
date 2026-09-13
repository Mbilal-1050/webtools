'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeProvider';
import { PWAInstallButton } from './PWAInstallButton';
import {
  Wrench,
  Sun,
  Moon,
  Search,
  Menu,
  X,
  ShieldCheck,
  Zap,
  ChevronDown,
} from 'lucide-react';
import { CATEGORIES, TOOLS_DATA } from '@/lib/tools-data';

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Close search on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTools = searchQuery.trim()
    ? TOOLS_DATA.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none"
              aria-label="Client-Side Web Tools Home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white shadow-sm shadow-blue-500/25 group-hover:scale-105 transition">
                <Wrench className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                  WebTools
                  <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    100% Client
                  </span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 hidden sm:inline">
                  Zero Server Uploads
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/#all-tools"
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
              >
                All Tools ({TOOLS_DATA.length})
              </Link>
              <div className="relative group">
                <button
                  className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
                >
                  Categories
                  <ChevronDown className="w-3 h-3 text-slate-400 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block pt-2 w-64">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl backdrop-blur-md">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/#cat-${cat.id}`}
                        className="block rounded-lg px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 transition"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href="/blog"
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  pathname?.startsWith('/blog')
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  pathname === '/about'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  pathname === '/contact'
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Action Icons: Search trigger, PWA, Dark Mode, Mobile menu */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button */}
            <button
              id="btn-quick-search"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition"
              aria-label="Search Tools"
            >
              <Search className="h-3.5 w-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden sm:inline-block rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                /
              </kbd>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton variant="compact" />

            {/* Dark / Light Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Dark Mode"
              title="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400 transition-transform rotate-0" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700 transition-transform rotate-0" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 md:hidden hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-5 space-y-3"
            >
              <div className="space-y-1">
                <Link
                  href="/#all-tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  All Tools ({TOOLS_DATA.length})
                </Link>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/#cat-${cat.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    • {cat.name}
                  </Link>
                ))}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800" />
                <Link
                  href="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  Technical Blog & Guides
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  About Us & Privacy Philosophy
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  Contact & Support
                </Link>
                <Link
                  href="/privacy-policy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-xs text-slate-500 dark:text-slate-400"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms-of-service"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-xs text-slate-500 dark:text-slate-400"
                >
                  Terms of Service
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Quick Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <Search className="h-5 w-5 text-slate-400 mr-3" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search by tool name, format, or keyword (e.g., compress, json, regex)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-3 space-y-1">
                {searchQuery.trim() === '' ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    Type a keyword to quickly launch any of the {TOOLS_DATA.length} browser-native tools.
                  </div>
                ) : filteredTools.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-500">
                    No matching tools found for &quot;{searchQuery}&quot;.
                  </div>
                ) : (
                  filteredTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.slug}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center justify-between rounded-xl p-2.5 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
                          <Zap className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {tool.name}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">
                            {tool.shortDescription}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {tool.categoryName}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
