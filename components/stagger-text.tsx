'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type StaggerTextProps = {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerDelay?: number;
};

export function StaggerText({
  text,
  className,
  charClassName,
  delay = 0,
  staggerDelay = 0.03,
}: StaggerTextProps) {
  return (
    <motion.span
      className={cn('inline-flex flex-wrap', className)}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          className={cn(charClassName, char === ' ' ? 'mr-[0.25em]' : '')}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
