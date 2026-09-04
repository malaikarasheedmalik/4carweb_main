'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: 'low' | 'medium' | 'high';
};

export function GlowCard({
  children,
  className,
  glowColor = 'hsl(174 72% 40%)',
  intensity = 'medium',
}: GlowCardProps) {
  const shadowMap = {
    low: `0 0 15px ${glowColor} / 0.15`,
    medium: `0 0 30px ${glowColor} / 0.25`,
    high: `0 0 40px ${glowColor} / 0.35, 0 0 80px ${glowColor} / 0.15`,
  };

  return (
    <motion.div
      className={cn('relative rounded-2xl', className)}
      whileHover={{
        boxShadow: shadowMap[intensity],
        y: -4,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
