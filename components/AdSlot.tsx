'use client';

import React, { useEffect, useState } from 'react';

export interface AdSlotProps {
  position: 'header' | 'sidebar' | 'in-content' | 'footer';
  className?: string;
}

/**
 * Production-ready AdSlot component.
 * By default, this component renders completely invisibly (null) to avoid
 * displaying placeholder boxes or hardcoded network names (e.g. "Google AdSense", "RevBid"),
 * which violates Google Publisher Policies and leads to AdSense account rejection or bans.
 *
 * When an approved AdSense client ID (NEXT_PUBLIC_ADSENSE_CLIENT_ID) or slot ID is provided
 * via environment variables, it mounts the standard <ins class="adsbygoogle"> container.
 */
export function AdSlot({ position, className = '' }: AdSlotProps) {
  const [isAdConfigured, setIsAdConfigured] = useState(false);

  useEffect(() => {
    // Check if real publisher credentials are configured
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    if (clientId && clientId.startsWith('ca-pub-')) {
      setIsAdConfigured(true);
      try {
        // Push ad if adsbygoogle script is active on the page
        const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
        if (adsbygoogle) {
          adsbygoogle.push({});
        }
      } catch {
        // Silent catch to prevent errors if ad blockers are active
      }
    }
  }, []);

  // When unconfigured, render nothing so no placeholder borders or fake labels appear
  if (!isAdConfigured) {
    return null;
  }

  // Height and max-width classes tailored by layout placement
  const placementStyles: Record<string, string> = {
    header: 'min-h-[90px] max-w-[728px] mx-auto my-4',
    sidebar: 'min-h-[250px] max-w-[300px] mx-auto my-4',
    'in-content': 'min-h-[90px] max-w-[728px] mx-auto my-6',
    footer: 'min-h-[90px] max-w-[970px] mx-auto mt-6 mb-2',
  };

  return (
    <div
      id={`ad-slot-${position}`}
      className={`relative flex flex-col items-center justify-center overflow-hidden transition-all ${placementStyles[position] || ''} ${className}`}
      aria-label="Advertisement"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || ''}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

