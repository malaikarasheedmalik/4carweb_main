'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type WaveTextProps = {
  text: string;
  className?: string;
  charClassName?: string;
  speed?: number;
};

export function WaveText({
  text,
  className,
  charClassName,
  speed = 0.5,
}: WaveTextProps) {
  return (
    <span className={cn('inline-flex', className)}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className={cn('inline-block', char === ' ' ? 'mr-[0.25em]' : '', charClassName)}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            delay: i * 0.05,
            ease: 'easeInOut',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
