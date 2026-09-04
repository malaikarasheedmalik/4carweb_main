'use client';

import { useMemo } from 'react';

type FloatingOrbsProps = {
  count?: number;
  colors?: string[];
  className?: string;
};

export function FloatingOrbs({
  count = 5,
  colors = ['hsl(174 72% 40% / 0.12)', 'hsl(222 47% 11% / 0.08)', 'hsl(174 70% 48% / 0.1)'],
  className = '',
}: FloatingOrbsProps) {
  const orbs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      size: 200 + Math.random() * 300,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      dur: 15 + Math.random() * 10,
      delay: Math.random() * -5,
    }));
  }, [count, colors]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-3xl animate-float-slow"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            left: orb.left,
            top: orb.top,
            animationDuration: `${orb.dur}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
