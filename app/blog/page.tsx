import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS, BlogPost } from '@/lib/blog-data';
import { AdSlot } from '@/components/AdSlot';
import { getAbsoluteUrl } from '@/lib/site';
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Search,
} from 'lucide-react';

const blogUrl = getAbsoluteUrl('/blog');

export const metadata: Metadata = {
  title: 'Technical Guides & Web Tool Tutorials | Client-Side Web Tools Blog',
  description:
    'In-depth developer guides, compression mechanics, cryptography explanations, and performance tutorials for modern web development.',
  alternates: {
    canonical: blogUrl,
  },
  openGraph: {
    title: 'Technical Guides & Web Tool Tutorials | Client-Side Web Tools Blog',
    description:
      'In-depth developer guides, compression mechanics, cryptography explanations, and performance tutorials for modern web development.',
    type: 'website',
    url: blogUrl,
    siteName: 'Client-Side Web Tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Guides & Web Tool Tutorials',
    description:
      'In-depth developer guides, compression mechanics, cryptography explanations, and performance tutorials for modern web development.',
  },
};

export default function BlogIndexPage() {
  const featuredPost = BLOG_POSTS[0];
  const remainingPosts = BLOG_POSTS.slice(1);

  const getCategoryStyles = (category: string) => {
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

  return (
    <div className="min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 dark:border-blue-800/80 bg-blue-50/80 dark:bg-blue-950/60 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Engineering Guides & Insights</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Knowledge Base & Practical Guides
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Deep dives into browser performance, cryptography, image quantization, regex engines, and client-side web architecture.
          </p>
        </div>

        {/* Ad Space */}
        <AdSlot position="header" />

        {/* Featured Post Card */}
        {featuredPost && (
          <section className="relative overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
              {/* Cover Image */}
              <div className="lg:col-span-7 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`rounded-lg px-3 py-1 text-xs font-bold border backdrop-blur-md shadow-xs ${getCategoryStyles(
                      featuredPost.category
                    )}`}
                  >
                    {featuredPost.categoryName}
                  </span>
                </div>
              </div>

              {/* Featured Post Content */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Author info & Read button */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden bg-slate-200">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">
                        {featuredPost.author.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {featuredPost.author.role}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-xs transition"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section Heading for All Posts */}
        <div className="space-y-2 pt-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Latest Technical Articles
          </h2>
          <p className="text-xs text-slate-500">
            Written by developers to help you build faster, cleaner, and more secure web experiences.
          </p>
        </div>

        {/* Remaining Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {remainingPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all"
            >
              <div className="space-y-4">
                {/* Post Cover */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block h-48 sm:h-52 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`rounded-lg px-2.5 py-0.5 text-[11px] font-bold border backdrop-blur-md shadow-xs ${getCategoryStyles(
                        post.category
                      )}`}
                    >
                      {post.categoryName}
                    </span>
                  </div>
                </Link>

                {/* Metadata & Title */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author and Read CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative h-7 w-7 rounded-full overflow-hidden bg-slate-200">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {post.author.name}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Ad Space */}
        <AdSlot position="footer" />

        {/* Back to Tools Promotion Banner */}
        <div className="rounded-3xl border border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-blue-50/60 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-blue-950/30 p-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
              <Zap className="h-6 w-6" />
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Looking for Fast, 100% In-Browser Utilities?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Test and run all 26 developer, image, text, and calculation tools directly in your browser with zero latency and zero data transfer.
          </p>
          <div className="pt-2">
            <Link
              href="/#all-tools"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-semibold shadow-sm transition"
            >
              <span>Explore All 26 Free Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
