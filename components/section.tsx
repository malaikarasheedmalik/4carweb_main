'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { fadeUp, viewportOnce } from '@/lib/animations';
import { WordLoop } from '@/components/word-loop';
import { GradientText } from '@/components/gradient-text';

type Crumb = { label: string; href?: string };

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  animateSubtitle = false,
  animateTitle = false,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  animateSubtitle?: boolean;
  animateTitle?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-burgundy text-offwhite">
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute -right-16 -top-16 h-64 w-64 animate-float rounded-full bg-terracotta/15 blur-3xl" />
      <div className="absolute -bottom-24 -left-10 h-72 w-72 animate-float-slow rounded-full bg-beige/10 blur-3xl" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        {breadcrumbs && (
          <motion.nav
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-beige"
          >
            {breadcrumbs.map((c, i) => (
              <span key={c.label} className="flex items-center gap-1.5 animate-slide-blur-in" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}>
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-terracotta">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-offwhite">{c.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3 text-beige/60" />}
              </span>
            ))}
          </motion.nav>
        )}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.05 }}
          className={`font-display text-4xl font-bold leading-tight text-balance sm:text-5xl ${animateTitle ? 'subtitle-slide-in' : ''}`}
        >
          <WordLoop text={title} />
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.12 }}
            className={`mt-4 max-w-2xl text-base leading-relaxed text-offwhite/80 sm:text-lg ${animateSubtitle ? 'subtitle-slide-in' : ''}`}
          >
            <WordLoop text={subtitle} className="text-base leading-relaxed text-offwhite/80 sm:text-lg" />
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          <span className="inline-block h-px w-8 bg-terracotta/40" />
          {eyebrow}
          <span className="inline-block h-px w-8 bg-terracotta/40" />
        </span>
      )}
      <h2 className="mt-2 font-display text-3xl font-bold text-burgundy sm:text-4xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base leading-relaxed text-warmgray">{subtitle}</p>
      )}
    </motion.div>
  );
}
