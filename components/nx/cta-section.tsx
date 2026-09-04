'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { business, images } from '@/lib/nexora-data';
import { fadeUp, viewportOnce } from '@/lib/nexora-animations';

export function CtaSection({
  title = "Let's build your exceptional team",
  subtitle = "Whether you are hiring or looking for your next role, we are ready to help. Get in touch today and let's start the conversation.",
  primaryLabel = 'Hire Talent',
  primaryHref = '/employers',
  secondaryLabel = 'Find a Job',
  secondaryHref = '/jobs',
}: {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <div className="absolute inset-0">
        <Image
          src={images.ctaBg}
          alt={images.ctaAlt}
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal backdrop-blur"
        >
          <Building2 className="h-3.5 w-3.5" />
          {business.tagline}
        </motion.span>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.08 }}
          className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl text-balance"
        >
          {title}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.16 }}
          className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg"
        >
          {subtitle}
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.24 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-xl bg-teal px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-teal-dark hover:shadow-glow"
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/10"
          >
            {secondaryLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
