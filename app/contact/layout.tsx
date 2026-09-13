import React from 'react';
import type { Metadata } from 'next';
import { getAbsoluteUrl } from '@/lib/site';

const contactUrl = getAbsoluteUrl('/contact');

export const metadata: Metadata = {
  title: 'Contact Us - Client-Side Web Tools Support & Feedback',
  description: 'Get in touch with the Client-Side Web Tools team for feature requests, bug reports, questions, and feedback.',
  alternates: {
    canonical: contactUrl,
  },
  openGraph: {
    title: 'Contact Us - Client-Side Web Tools',
    description: 'Get in touch with the Client-Side Web Tools team for feature requests, bug reports, questions, and feedback.',
    url: contactUrl,
    type: 'website',
    siteName: 'Client-Side Web Tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Client-Side Web Tools',
    description: 'Get in touch with the Client-Side Web Tools team.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
