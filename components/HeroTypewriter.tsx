'use client';

import React, { useState, useEffect } from 'react';

const PHRASES = [
  'Zero Server Uploads',
  'Zero Data Collection',
  '100% In-Browser',
  'Zero API Keys Needed',
  'Private & Instant',
] as const;

export function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState<string>(PHRASES[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetPhrase = PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText.length > 0) {
        // Deleting speed: snappy 40ms per character
        timer = setTimeout(() => {
          setCurrentText((prev) => prev.slice(0, -1));
        }, 40);
      } else {
        // Pause briefly after complete deletion before typing next phrase
        timer = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }, 380);
      }
    } else {
      if (currentText !== targetPhrase) {
        // Typing speed: natural 75ms per character
        timer = setTimeout(() => {
          setCurrentText(targetPhrase.slice(0, currentText.length + 1));
        }, 75);
      } else {
        // Pause for 2.2s after completing the phrase to let the user read it
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <span className="inline-grid grid-cols-1 grid-rows-1 text-left align-baseline max-w-full">
      {/* Invisible ghost phrases: reserves exact width and line height for the longest phrase to prevent CLS */}
      {PHRASES.map((phrase) => (
        <span
          key={phrase}
          className="col-start-1 row-start-1 invisible select-none pointer-events-none opacity-0 whitespace-nowrap"
          aria-hidden="true"
        >
          {phrase}
        </span>
      ))}

      {/* Accessible screen reader announcement */}
      <span className="sr-only">
        Zero Server Uploads, Zero Data Collection, 100% In-Browser, Zero API Keys Needed, Private & Instant
      </span>

      {/* Visible typing element with blinking cursor */}
      <span
        aria-hidden="true"
        className="col-start-1 row-start-1 inline-flex items-baseline whitespace-nowrap"
      >
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 dark:from-blue-400 dark:via-indigo-400 dark:to-sky-300 bg-clip-text text-transparent">
          {currentText}
          {/* Zero-width space preserves font metrics and baseline even when currentText is empty */}
          &#8203;
        </span>
        <span
          className="inline-block ml-1 w-[2.5px] sm:w-[3.5px] h-[0.82em] bg-blue-600 dark:bg-blue-400 align-baseline animate-typewriter-cursor rounded-xs"
          aria-hidden="true"
        />
      </span>
    </span>
  );
}
