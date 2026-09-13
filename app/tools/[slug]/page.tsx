import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { TOOLS_DATA, ToolItem } from '@/lib/tools-data';
import { ToolPageClient } from '@/components/ToolPageClient';

// Import all 26 client-side tools
import { ImageCompressorTool } from '@/components/tools/ImageCompressorTool';
import { ImageConverterTool } from '@/components/tools/ImageConverterTool';
import { ImageResizerTool } from '@/components/tools/ImageResizerTool';
import { ImageToBase64Tool } from '@/components/tools/ImageToBase64Tool';
import { FaviconGeneratorTool } from '@/components/tools/FaviconGeneratorTool';
import { MemeGeneratorTool } from '@/components/tools/MemeGeneratorTool';
import { JsonFormatterTool } from '@/components/tools/JsonFormatterTool';
import { JsonCsvConverterTool } from '@/components/tools/JsonCsvConverterTool';
import { Base64Tool } from '@/components/tools/Base64Tool';
import { RegexTesterTool } from '@/components/tools/RegexTesterTool';
import { MarkdownEditorTool } from '@/components/tools/MarkdownEditorTool';
import { HashGeneratorTool } from '@/components/tools/HashGeneratorTool';
import { UuidGeneratorTool } from '@/components/tools/UuidGeneratorTool';
import { TimestampConverterTool } from '@/components/tools/TimestampConverterTool';
import { UrlEncoderDecoderTool } from '@/components/tools/UrlEncoderDecoderTool';
import { ColorPaletteTool } from '@/components/tools/ColorPaletteTool';
import { CssMinifierTool } from '@/components/tools/CssMinifierTool';
import { LoremIpsumTool } from '@/components/tools/LoremIpsumTool';
import { WordCounterTool } from '@/components/tools/WordCounterTool';
import { TextCaseConverterTool } from '@/components/tools/TextCaseConverterTool';
import { DuplicateLineRemoverTool } from '@/components/tools/DuplicateLineRemoverTool';
import { PasswordGeneratorTool } from '@/components/tools/PasswordGeneratorTool';
import { UnitConverterTool } from '@/components/tools/UnitConverterTool';
import { AgeCalculatorTool } from '@/components/tools/AgeCalculatorTool';
import { BmiCalculatorTool } from '@/components/tools/BmiCalculatorTool';
import { PercentageCalculatorTool } from '@/components/tools/PercentageCalculatorTool';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOOLS_DATA.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS_DATA.find((t) => t.slug === slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | WebTools Privacy Suite',
      description: 'The requested client-side utility does not exist.',
    };
  }

  return {
    title: `${tool.metaTitle} | WebTools`,
    description: tool.metaDescription,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.metaTitle} | WebTools`,
      description: tool.metaDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = TOOLS_DATA.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  // Related tools in the same category
  const relatedTools = TOOLS_DATA.filter(
    (t) => t.category === tool.category && t.id !== tool.id
  ).slice(0, 4);

  // Render matching tool component
  const renderToolComponent = () => {
    switch (tool.id) {
      case 'image-compressor':
        return <ImageCompressorTool />;
      case 'image-converter':
        return <ImageConverterTool />;
      case 'image-resizer':
        return <ImageResizerTool />;
      case 'image-to-base64':
        return <ImageToBase64Tool />;
      case 'favicon-generator':
        return <FaviconGeneratorTool />;
      case 'meme-generator':
        return <MemeGeneratorTool />;
      case 'json-formatter':
        return <JsonFormatterTool />;
      case 'json-csv-converter':
        return <JsonCsvConverterTool />;
      case 'base64-encoder-decoder':
        return <Base64Tool />;
      case 'regex-tester':
        return <RegexTesterTool />;
      case 'markdown-editor':
        return <MarkdownEditorTool />;
      case 'hash-generator':
        return <HashGeneratorTool />;
      case 'uuid-generator':
        return <UuidGeneratorTool />;
      case 'timestamp-converter':
        return <TimestampConverterTool />;
      case 'url-encoder-decoder':
        return <UrlEncoderDecoderTool />;
      case 'color-palette-gradient':
        return <ColorPaletteTool />;
      case 'css-minifier':
        return <CssMinifierTool />;
      case 'lorem-ipsum-generator':
        return <LoremIpsumTool />;
      case 'word-counter':
        return <WordCounterTool />;
      case 'text-case-converter':
        return <TextCaseConverterTool />;
      case 'duplicate-line-remover':
        return <DuplicateLineRemoverTool />;
      case 'password-generator':
        return <PasswordGeneratorTool />;
      case 'unit-converter':
        return <UnitConverterTool />;
      case 'age-calculator':
        return <AgeCalculatorTool />;
      case 'bmi-calculator':
        return <BmiCalculatorTool />;
      case 'percentage-calculator':
        return <PercentageCalculatorTool />;
      default:
        return (
          <div className="p-8 text-center text-slate-500">
            Tool implementation is loading...
          </div>
        );
    }
  };

  // Structured Data Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.shortDescription,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any modern browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="min-h-screen py-6">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ToolPageClient tool={tool} relatedTools={relatedTools}>
        {renderToolComponent()}
      </ToolPageClient>
    </div>
  );
}
