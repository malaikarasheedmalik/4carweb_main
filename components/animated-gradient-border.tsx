'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type AnimatedGradientBorderProps = {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
  speed?: number;
};

export function AnimatedGradientBorder({
  children,
  className,
  borderRadius = '1rem',
  speed = 3,
}: AnimatedGradientBorderProps) {
  return (
    <div className={cn('relative', className)} style={{ borderRadius }}>
      <motion.div
        className="absolute -inset-[2px]"
        style={{
          borderRadius,
          background: `conic-gradient(from var(--ab-angle, 0deg), hsl(174 72% 40%), hsl(174 70% 48%), hsl(222 47% 11%), hsl(174 65% 33%), hsl(174 72% 40%))`,
          backgroundSize: '100% 100%',
        }}
        animate={{ '--ab-angle': ['0deg', '360deg'] } as any}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      />
      <div
        className="relative"
        style={{ borderRadius: `calc(${borderRadius} - 2px)` }}
      >
        {children}
      </div>
    </div>
  );
}
