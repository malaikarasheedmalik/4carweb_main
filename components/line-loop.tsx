'use client';

import { useEffect, useState } from 'react';

type Line = { text: string; className: string };

export function LineLoop({ lines }: { lines: Line[] }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState<'showing' | 'holding' | 'hiding'>('showing');

  useEffect(() => {
    const delay = phase === 'showing' ? 750 : phase === 'holding' ? 2500 : 650;
    const timer = window.setTimeout(() => {
      if (phase === 'showing') {
        if (visibleLines < lines.length) setVisibleLines((count) => count + 1);
        else setPhase('holding');
      } else if (phase === 'holding') {
        setPhase('hiding');
      } else if (visibleLines > 0) {
        setVisibleLines((count) => count - 1);
      } else {
        setPhase('showing');
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [lines.length, phase, visibleLines]);

  return (
    <span className="line-loop" aria-label={lines.map((line) => line.text).join(' ')}>
      <span className="line-loop-placeholder" aria-hidden="true">
        {lines.map((line) => <span key={line.text} className={line.className}>{line.text}</span>)}
      </span>
      <span className="line-loop-current" aria-hidden="true">
        {lines.slice(0, visibleLines).map((line) => <span key={line.text} className={`${line.className} line-loop-line`}>{line.text}</span>)}
      </span>
    </span>
  );
}
