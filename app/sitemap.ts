import type { MetadataRoute } from 'next';
import { TOOLS_DATA } from '@/lib/tools-data';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ais-pre-vrbqudsrlwcp7gonld62ep-473876566031.asia-east1.run.app';
  const currentDate = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic tool pages
  const toolRoutes: MetadataRoute.Sitemap = TOOLS_DATA.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: tool.popular ? 0.9 : 0.8,
  }));

  // Dynamic blog post pages
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.isoDate),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
