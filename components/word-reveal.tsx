'use client';

import { useEffect, useState } from 'react';

export function WordReveal({ text, className = '', delay = 0, loop = false }: { text: string; className?: string; delay?: number; loop?: boolean }) {
  const words = text.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const [phase, setPhase] = useState<'writing' | 'holding' | 'deleting'>('writing');

  useEffect(() => {
    if (loop) return;
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        setVisibleWords((count) => {
          if (phase === 'writing' && count < words.length) return count + 1;
          if (!loop && count >= words.length) {
            if (timer) window.clearInterval(timer);
            return count;
          }
          return count;
        });
      }, 75);
    }, delay);

    return () => {
      window.clearTimeout(start);
      if (timer) window.clearInterval(timer);
    };
  }, [delay, loop, phase, words.length]);

  useEffect(() => {
    if (!loop) return;
    const delayForPhase = phase === 'writing' ? 75 : phase === 'holding' ? 2300 : 45;
    const timer = window.setTimeout(() => {
      if (phase === 'writing' && visibleWords >= words.length) setPhase('holding');
      else if (phase === 'holding') setPhase('deleting');
      else if (phase === 'deleting' && visibleWords === 0) setPhase('writing');
      else if (phase === 'deleting') setVisibleWords((count) => count - 1);
    }, delayForPhase);
    return () => window.clearTimeout(timer);
  }, [loop, phase, visibleWords, words.length]);

  return (
    <span className={`word-reveal ${className}`} aria-label={text}>
      <span className="word-reveal-placeholder" aria-hidden="true">{text}</span>
      <span className="word-reveal-visible" aria-hidden="true">
        {words.slice(0, visibleWords).map((word, index) => <span key={`${word}-${index}`}>{word}{index < visibleWords - 1 ? ' ' : ''}</span>)}
      </span>
    </span>
  );
}
