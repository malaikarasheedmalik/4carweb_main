'use client';

import { useEffect, useState } from 'react';

export function WordLoop({ text = 'Professional Car Repair Services', className = '' }: { text?: string; className?: string }) {
  const words = text.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const [phase, setPhase] = useState<'writing' | 'holding' | 'deleting'>('writing');

  useEffect(() => {
    const delay = phase === 'writing' ? 520 : phase === 'holding' ? 2200 : 360;
    const timer = window.setTimeout(() => {
      if (phase === 'writing') {
        if (visibleWords < words.length) setVisibleWords((count) => count + 1);
        else setPhase('holding');
      } else if (phase === 'holding') {
        setPhase('deleting');
      } else if (visibleWords > 0) {
        setVisibleWords((count) => count - 1);
      } else {
        setPhase('writing');
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [phase, visibleWords]);

  return (
    <span className={`word-loop ${className}`} aria-label={text}>
      <span className="word-loop-placeholder" aria-hidden="true">{words.join(' ')}</span>
      <span className="word-loop-current" aria-hidden="true">
        {words.slice(0, visibleWords).map((word, index) => (
          <span className="word-loop-word" key={`${word}-${index}`}>{word}</span>
        ))}
        <span className="word-loop-caret" />
      </span>
    </span>
  );
}
