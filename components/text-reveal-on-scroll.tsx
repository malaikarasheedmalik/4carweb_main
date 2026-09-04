'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { textWordVariant, viewportOnce } from '@/lib/animations';
import { cn } from '@/lib/utils';

type TextRevealOnScrollProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
};

export function TextRevealOnScroll({
  text,
  className,
  wordClassName,
  as: Tag = 'p',
}: TextRevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(' ');

  return (
    <div ref={ref}>
      <motion.div
        className={cn('flex flex-wrap', className)}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
        }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={textWordVariant}
            className={cn('inline-block mr-[0.3em]', wordClassName)}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
