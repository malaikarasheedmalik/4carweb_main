'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  colors?: string[];
};

export function GradientText({
  children,
  className,
  animate = true,
  colors = ['hsl(174 72% 40%)', 'hsl(174 70% 48%)', 'hsl(174 65% 33%)', 'hsl(174 72% 40%)'],
}: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-clip-text text-transparent',
        animate && 'animate-text-gradient bg-[length:400%_400%]',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${colors.join(', ')})`,
        backgroundSize: animate ? '400% 400%' : undefined,
      }}
    >
      {children}
    </span>
  );
}
