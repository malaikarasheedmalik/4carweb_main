'use client';

import { useMemo } from 'react';

type ParticleBackgroundProps = {
  count?: number;
  className?: string;
};

export function ParticleBackground({ count = 30, className = '' }: ParticleBackgroundProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      dur: 8 + Math.random() * 12,
      delay: Math.random() * -10,
      tx: (Math.random() - 0.5) * 80,
      ty: -(40 + Math.random() * 80),
      opacity: 0.2 + Math.random() * 0.4,
    }));
  }, [count]);

  return (
    <div className="particle-field">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--tx': `${p.tx}px`,
            '--ty': `${p.ty}px`,
            opacity: p.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
