import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { OfflineIndicator } from '@/components/OfflineIndicator';

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Client-Side Web Tools - Fast, Private & 100% In-Browser',
  description: 'Fast, private, 100% browser-based developer, image, text, and calculation tools running entirely client-side without data leaving your device.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'WebTools',
  },
  openGraph: {
    title: 'Client-Side Web Tools - Fast, Private & 100% In-Browser',
    description: 'Fast, private, 100% browser-based developer, image, text, and calculation tools running entirely client-side without data leaving your device.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client-Side Web Tools',
    description: '100% client-side privacy-first web utilities.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-500 selection:text-white transition-colors duration-200">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieBanner />
          <OfflineIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}

