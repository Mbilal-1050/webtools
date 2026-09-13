/**
 * Site configuration and canonical URL helpers.
 * Ensures metadata, OpenGraph tags, sitemaps, and robots.txt point to
 * the production domain (webtools-five-neon.vercel.app) or a configured custom domain.
 */

export const PRODUCTION_DOMAIN = 'webtools-five-neon.vercel.app';
export const DEFAULT_SITE_URL = `https://${PRODUCTION_DOMAIN}`;

/**
 * Returns the canonical base URL for the application.
 * Hierarchy:
 * 1. NEXT_PUBLIC_SITE_URL or SITE_URL environment variable (custom domain)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (Vercel automatic production deployment)
 * 3. Default production URL: https://webtools-five-neon.vercel.app
 */
export function getSiteUrl(): string {
  // Check for custom domain or explicit production URL override
  const customUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (customUrl && !customUrl.includes('ais-pre-') && !customUrl.includes('ais-dev-')) {
    const formatted = customUrl.startsWith('http://') || customUrl.startsWith('https://')
      ? customUrl
      : `https://${customUrl}`;
    return formatted.replace(/\/+$/, '');
  }

  // Check for Vercel production deployment variable
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) {
    const formatted = vercelProd.startsWith('http://') || vercelProd.startsWith('https://')
      ? vercelProd
      : `https://${vercelProd}`;
    return formatted.replace(/\/+$/, '');
  }

  return DEFAULT_SITE_URL;
}

/**
 * Helper to construct absolute canonical URLs.
 * Example: getAbsoluteUrl('/tools/image-compressor')
 * Returns: 'https://webtools-five-neon.vercel.app/tools/image-compressor'
 */
export function getAbsoluteUrl(path: string = '/'): string {
  const base = getSiteUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
