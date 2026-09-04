'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Industry } from '@/lib/nexora-data';
import { fadeUp } from '@/lib/nexora-animations';

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-navy shadow-premium"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={industry.image}
          alt={industry.imageAlt}
          fill
          className="object-cover opacity-70 transition-all duration-700 ease-smooth group-hover:scale-110 group-hover:opacity-50"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
      </div>
      <div className="relative -mt-20 p-6">
        <h3 className="font-display text-xl font-bold text-white">{industry.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{industry.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-semibold text-teal">{industry.roles}+ open roles</span>
          <Link
            href={`/industries#${industry.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-teal"
          >
            Explore
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
