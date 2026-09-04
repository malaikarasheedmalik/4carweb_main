'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function CinematicImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-2%', '2%']);

  return (
    <div ref={ref} className={`cinematic-image group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-premium-lg ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-6%]">
        <div className="cinematic-media absolute inset-0">
          <Image src={src} alt={alt} fill className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </motion.div>
      <div className="cinematic-overlay pointer-events-none absolute inset-0" />
      <div className="cinematic-shimmer pointer-events-none absolute inset-0" />
    </div>
  );
}
