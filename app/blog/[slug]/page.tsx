import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Markdown from 'react-markdown';
import { BLOG_POSTS, getBlogPostBySlug, getRelatedBlogPosts } from '@/lib/blog-data';
import { BlogShareButton } from '@/components/BlogShareButton';
import { AdSlot } from '@/components/AdSlot';
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronRight,
  Lock,
  Sparkles,
  Zap,
  Wrench,
  BookOpen,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Guide Not Found | Client-Side Web Tools',
    };
  }

  const url = `https://ais-pre-vrbqudsrlwcp7gonld62ep-473876566031.asia-east1.run.app/blog/${post.slug}`;

  return {
    title: `${post.title} | Client-Side Web Tools Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: 'article',
      publishedTime: post.isoDate,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 2);

  // Structured Data Schema (JSON-LD) for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Client-Side Web Tools',
      logo: {
        '@type': 'ImageObject',
        url: 'https://picsum.photos/seed/toolmaster-logo/192/192',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://ais-pre-vrbqudsrlwcp7gonld62ep-473876566031.asia-east1.run.app/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
  };

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
    <article className="min-h-screen py-10 sm:py-14">
      {/* Inject JSON-LD structured data for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 dark:text-slate-200 truncate max-w-xs sm:max-w-md font-medium">
            {post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-lg px-2.5 py-1 text-xs font-bold border shadow-2xs ${getCategoryStyles(
                post.category
              )}`}
            >
              {post.categoryName}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author and Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-2xs">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {post.author.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {post.author.role}
                </div>
              </div>
            </div>

            <BlogShareButton title={post.title} slug={post.slug} />
          </div>
        </header>

        {/* Featured Hero Cover Image */}
        <div className="relative h-64 sm:h-96 w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xs border border-slate-200/70 dark:border-slate-800">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Ad Space */}
        <AdSlot position="header" />

        {/* Prominent "Try This Tool" Highlight Callout Box (Top CTA) */}
        <aside
          id="cta-try-this-tool"
          aria-label="Related Tool Quick Launch"
          className="rounded-2xl border-2 border-blue-500/30 dark:border-blue-500/40 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-blue-50/70 dark:from-blue-950/40 dark:via-indigo-950/30 dark:to-blue-950/40 p-5 sm:p-6 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white shadow-2xs">
                  <Wrench className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  Interactive Browser Tool
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 px-2 py-0.2 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                  <Lock className="w-2.5 h-2.5" /> 100% Client-Side
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {post.relatedTool.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl">
                {post.relatedTool.shortDescription}
              </p>
            </div>

            <Link
              id="btn-try-tool-top"
              href={`/tools/${post.relatedTool.slug}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-bold shadow-sm hover:shadow transition transform hover:-translate-y-0.5"
            >
              <span>{post.relatedTool.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </aside>

        {/* Main Article Body Rendered via React-Markdown */}
        <div className="markdown-body">
          <Markdown
            components={{
              h2: ({ ...props }) => (
                <h2
                  className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80 tracking-tight"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-3 tracking-tight"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p
                  className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed my-4"
                  {...props}
                />
              ),
              ul: ({ ...props }) => (
                <ul
                  className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 my-4 pl-2"
                  {...props}
                />
              ),
              ol: ({ ...props }) => (
                <ol
                  className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 my-4 pl-2"
                  {...props}
                />
              ),
              li: ({ ...props }) => <li className="leading-relaxed" {...props} />,
              blockquote: ({ ...props }) => (
                <blockquote
                  className="border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 p-4 rounded-r-xl my-6 text-xs sm:text-sm italic text-slate-700 dark:text-slate-300"
                  {...props}
                />
              ),
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match && !String(children).includes('\n');
                if (isInline) {
                  return (
                    <code
                      className="rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <pre className="overflow-x-auto rounded-2xl bg-slate-900 dark:bg-slate-950 p-4 font-mono text-xs text-slate-200 border border-slate-800 my-6 shadow-inner">
                    <code {...props}>{children}</code>
                  </pre>
                );
              },
              table: ({ ...props }) => (
                <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 dark:border-slate-800">
                  <table
                    className="w-full text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    {...props}
                  />
                </div>
              ),
              th: ({ ...props }) => (
                <th
                  className="bg-slate-100 dark:bg-slate-800/80 p-3 font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700"
                  {...props}
                />
              ),
              td: ({ ...props }) => (
                <td className="p-3 border-b border-slate-100 dark:border-slate-800/50" {...props} />
              ),
              hr: ({ ...props }) => (
                <hr className="my-8 border-slate-200/80 dark:border-slate-800/80" {...props} />
              ),
              strong: ({ ...props }) => (
                <strong className="font-bold text-slate-900 dark:text-white" {...props} />
              ),
            }}
          >
            {post.content}
          </Markdown>
        </div>

        {/* In-content Ad Slot */}
        <AdSlot position="in-content" />

        {/* Secondary Bottom CTA Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Ready to put this into practice?</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Use the Free Client-Side {post.relatedTool.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {post.relatedTool.shortDescription} No downloads, no subscriptions, and your data stays 100% confidential in local RAM.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              id="btn-try-tool-bottom"
              href={`/tools/${post.relatedTool.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-bold shadow-sm transition"
            >
              <span>Launch {post.relatedTool.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/#all-tools"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
            >
              <span>View All 26 Utilities</span>
            </Link>
          </div>
        </div>

        {/* Author Bio Card */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 rounded-full overflow-hidden bg-slate-200 shadow-xs">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Written by {post.author.name}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
              {post.author.role}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Specializing in client-side architectures, browser memory optimizations, cryptography standards, and high-performance Web APIs.
            </p>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Related Engineering Guides</span>
              </h2>
              <Link
                href="/blog"
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 hover:border-blue-300 dark:hover:border-blue-700/80 hover:shadow-sm transition space-y-3"
                >
                  <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={related.coverImage}
                      alt={related.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>{related.publishedAt}</span>
                    <span>•</span>
                    <span>{related.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer Ad Space */}
        <AdSlot position="footer" />
      </div>
    </article>
  );
}
